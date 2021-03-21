from ..sentimentClassifier import naiveBayesClassifierPredict
from ..sentimentClassifier.naiveBayesClassifierPredict import loadClassifierModel, predictSentiment
from datetime import datetime
from functools import partial
from config import config
from src.utils.cleanData import cleanText
import pymongo
import time
import json
import csv
import os
import re


fixFBEncoding = partial(re.compile(
    rb'\\u00([\da-f]{2})').sub, lambda m: bytes.fromhex(m.group(1).decode()))


def parseChats(rawDataPath, classifier, vectorizer):
  parsedMessages, chatMetaData, vocab = [], [], []
  # for each chat for in rawDataPath
  for chat in os.listdir(rawDataPath):
    print(chat)
    totalMessages, totalWords, totalChars, totalReacts = 0, 0, 0, 0
    participants, chatVocab = set(), dict()

    # for each message_{i}.json file in rawDataPath/chat folder
    for fileName in os.listdir(os.path.join(rawDataPath, chat)):
      print("\t"+fileName)

      with open(os.path.join(rawDataPath, chat, fileName), 'rb') as binaryData:
        repaired = fixFBEncoding(binaryData.read())
      data = json.loads(repaired.decode('utf8'))

      for message in data["messages"]:
   
        # convert timestamp_ms to python datetime object
        message["date"] = datetime.strptime(datetime.fromtimestamp(
            message["timestamp_ms"] / 1000).strftime("%Y-%m-%d %H:%M:%S"),
            "%Y-%m-%d %H:%M:%S")
        del message["timestamp_ms"]
        message["chat_name"] = data["title"]

        # if message has text count words, chars and generate vocab
        if "content" in message.keys():
          cleanedText = cleanText(message["content"])
          tokenized = cleanedText.split(" ")
          message["total_words"] = len(tokenized)
          message["total_chars"] = len(message["content"])

          # generate vocabulary
          for word in tokenized:
            try:
              chatVocab[word] += 1
            except KeyError:
              chatVocab[word] = 1

          # predict message sentiment
          message["sentiment"] = predictSentiment(
              message, cleanedText, classifier, vectorizer)

        else:
          message["total_words"] = 0
          message["total_chars"] = 0

        # if message has reactions then count reactions
        if "reactions" in message.keys():
          totalReacts += len(message["reactions"])

        # update running total word/char/message count for current chat
        totalWords += message["total_words"]
        totalChars += message["total_chars"]
        totalMessages += 1

        participants.add(message["sender_name"])
        parsedMessages.append(message)

 

    vocab.extend([
        {"chat_name": data["title"],
         "word":word,
         "count":count} for word, count in chatVocab.items()])

    chatMetaData.append({
        "chat_name": data["title"],
        "participants": [{"name": i} for i in participants],
        "total_words": totalWords,
        "total_chars": totalChars,
        "total_reacts": totalReacts,
        "total_messages": totalMessages})

  return parsedMessages, chatMetaData, vocab


def updateChatMetaData(dbCon):
  for chat in dbCon["chats"].find({}):
    # find the first and last messages sent for each chat
    firstDate = dbCon["messages"].find({"chat_name": chat["chat_name"]}).sort(
        [("date", pymongo.ASCENDING)])[0]["date"]
    lastDate = dbCon["messages"].find({"chat_name": chat["chat_name"]}).sort(
        [("date", pymongo.DESCENDING)])[0]["date"]
    dateDiff = lastDate-firstDate

    # compute the total joins and kicks for each chat
    totalJoins, totalKicks = 0, 0
    joinMessages = dbCon["messages"].find(
        {"chat_name": chat["chat_name"], "type": "Subscribe"})
    kickMessages = dbCon["messages"].find(
        {"chat_name": chat["chat_name"], "type": "Unsubscribe"})

    # if len(message["users"])  is 0 add 1 cuz sean doesnt show in users list
    for message in joinMessages:
      totalJoins += 1 if len(message["users"]) == 0 else len(message["users"])
    for message in kickMessages:
      totalKicks += 1 if len(message["users"]) == 0 else len(message["users"])

    # update the "chats" collection in the database with the new fields
    dbCon["chats"].update_one({"chat_name": chat["chat_name"]}, {
        "$set": {"first_message_date": firstDate,
                 "last_message_date": lastDate,
                 "days_active": dateDiff.days,
                 "total_kicks": totalKicks,
                 "total_joins": totalJoins,
                 }})


def buildDatabase(dbCon, parsedMessages, chatMetaData, vocab):
  dbCon["messages"].delete_many({})
  dbCon["messages"].insert_many(parsedMessages)
  dbCon["chats"].delete_many({})
  dbCon["chats"].insert_many(chatMetaData)
  dbCon["vocab"].delete_many({})
  dbCon["vocab"].insert_many(vocab)


def runParser(dbCon, rawDataPath):
  start = time.time()

  classifier, vectorizer = loadClassifierModel(config["sentimentModelPath"])
  parsedMessages, chatMetaData, vocab = parseChats(
      rawDataPath, classifier, vectorizer)
  buildDatabase(dbCon, parsedMessages, chatMetaData, vocab)
  updateChatMetaData(dbCon)

  end = time.time()
  print(end-start)
