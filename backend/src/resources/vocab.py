from flask import request
from flask_restful import Resource, fields, marshal, reqparse
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
from bson.errors import InvalidId
from datetime import datetime
from src import dbCon, top1000words
import pymongo
import json


def formatArgs(args):
  try:

    if args["startdate"] and args["enddate"]:
      args["startdate"] = datetime.strptime(args["startdate"], "%Y%m%dT%H%M%S")
      args["enddate"] = datetime.strptime(args["enddate"], "%Y%m%dT%H%M%S")

    args["groupby"] = request.args.getlist("groupby")

    return args

  except:
    raise Exception("Invalid query parameters")


def queryTopNWords(args):
  
  filters = [
      {"$match": {
          "chat_name": args["chatName"],
          "word":{"$nin":top1000words}
      }},
      {"$sort": {
          "count": -1
      }},
      {"$limit": args["mostused"]
       },
      {"$project": {
          "_id": 0
      }}
  ]
  results = dbCon["vocab"].aggregate(filters)
  results = list(results)
  return results


class Words(Resource):
  """ Class representing the
  """

  def __init__(self):
    # define query string params
    self.parser = reqparse.RequestParser()
    self.parser.add_argument("groupby", type=str,
                             help="users, messagetype, {day, week, month, year}")
    self.parser.add_argument("startdate", type=str, help="YYYYMMDDThhmmss")
    self.parser.add_argument("enddate", type=str, help="YYYYMMDDThhmmss")
    self.parser.add_argument(
        "mostused", type=int, help="Top n most users words")

    # define format of the responses

  def get(self, chatid):
    args = formatArgs(self.parser.parse_args())
    
    # check if chat with id "chatid" exists and get its chat_name
    try:
      chat = dbCon["chats"].find_one({"_id": ObjectId(chatid)})
    except InvalidId as e:
      return {"message": "Chat with ID {} not found".format(chatid)}, 404
    if chat is None:
      return {"message": "Chat with ID {} not found".format(chatid)}, 404

    args["chatName"], results = chat["chat_name"], None

    if args["mostused"] is not None:
      results = queryTopNWords(args)

    elif args["startdate"] is not None and args["enddate"] is not None:
      results = runQuery(args)

    elif args["startdate"] is None and args["enddate"] is None:
      args["startdate"] = chat["first_message_date"]
      args["enddate"] = chat["last_message_date"]
      results = runQuery(args)

    else:
      results = []

    return {"data": results}


class Chars(Resource):
  """ Class representing the 
  """

  def get(self, chatid, msgid):
    try:
      chat = dbCon["chats"].find_one({"_id": ObjectId(chatid)})
    except InvalidId as e:
      return {"message": "Chat with ID {} not found".format(chatid)}, 404
    if chat is None:
      return {"message": "Chat with ID {} not found".format(chatid)}, 404

    try:
      message = dbCon["messages"].find_one({"_id": ObjectId(msgid)})
    except InvalidId as e:
      return {"message": "Message with ID {} not found".format(msgid)}, 404
    if message is None:
      return {"message": "Message with ID {} not found".format(msgid)}, 404

    message["date"] = message["date"].strftime("%Y-%m-%dT%H:%M:%S.%f")
    message["_id"] = str(message["_id"])

    return {"data": message}
