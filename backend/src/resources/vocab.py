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
          "word":{"$nin": top1000words}
      }},
      {"$sort": {
          "count": -1
      }},
      {"$limit": args["mostused"]
       },
      {"$project": {
          "_id": 0,
          "chat_name": 0
      }}
  ]
  results = dbCon["vocab"].aggregate(filters)
  results = list(results)
  return results


def runWordsQuery(args):
  filters = [
      {"$match": {
          "chat_name": args["chatName"],
          "date": {
              "$lte": args["enddate"],
              "$gte": args["startdate"]
          },
      }},
  ]
  # return total word count of all messages between date
  if not args["groupby"]:
    filters.extend([
        {"$group": {
            "_id": None,
            "totalWordsCount": {
                "$sum": "$total_words"
            }
        }},
        {"$project": {
            "_id": 0,
            "totalWordsCount": 1
        }}
    ])

    results = dbCon["messages"].aggregate(filters)
    results = list(results)
    return results[0]["totalWordsCount"]

  # return total word count of all messages between date
  # grouped by specified fields
  elif args["groupby"]:
    groups = {}
    for i in args["groupby"]:
      if i == "users":
        groups["sender_name"] = "$sender_name"

      elif i == "day":
        groups["date"] = {"$dateToString": {
            "format": "%Y-%m-%d",
            "date": "$date"
        }}

      elif i == "week":
        groups["date"] = {"$dateToString": {
            "format": "%G-%m-%d",
            "date": {
                "$dateFromString": {
                    "dateString": {
                        "$dateToString": {
                            "format": "%G-W%V",
                            "date": "$date"
                        }},
                    "format": "%G-W%V"
                }}}}

      elif i == "month":
        groups["date"] = {"$dateToString": {
            "format": "%Y-%m-01",
            "date": "$date"
        }}

    filters.extend([
        {"$group": {
            "_id": groups,
            "totalWordsCount": {
                "$sum": "$total_words"
            }
        }},
        {"$sort": {
            "_id.date": 1
        }}
    ])

    results = dbCon["messages"].aggregate(filters)
    results = list(results)
    return results


def runCharsQuery(args):
  filters = [
      {"$match": {
          "chat_name": args["chatName"],
          "date": {
              "$lte": args["enddate"],
              "$gte": args["startdate"]
          },
      }},
  ]
  # return total char count of all messages between date
  if not args["groupby"]:
    filters.extend([
        {"$group": {
            "_id": None,
            "totalCharsCount": {
                "$sum": "$total_chars"
            }
        }},
        {"$project": {
            "_id": 0,
            "totalCharsCount": 1
        }}
    ])

    results = dbCon["messages"].aggregate(filters)
    results = list(results)
    return results[0]["totalCharsCount"]

  # return total char count of all messages between date
  # grouped by specified fields
  elif args["groupby"]:
    groups = {}
    for i in args["groupby"]:
      if i == "users":
        groups["sender_name"] = "$sender_name"

      elif i == "day":
        groups["date"] = {"$dateToString": {
            "format": "%Y-%m-%d",
            "date": "$date"
        }}

      elif i == "week":
        groups["date"] = {"$dateToString": {
            "format": "%G-%m-%d",
            "date": {
                "$dateFromString": {
                    "dateString": {
                        "$dateToString": {
                            "format": "%G-W%V",
                            "date": "$date"
                        }},
                    "format": "%G-W%V"
                }}}}

      elif i == "month":
        groups["date"] = {"$dateToString": {
            "format": "%Y-%m-01",
            "date": "$date"
        }}

    filters.extend([
        {"$group": {
            "_id": groups,
            "totalCharsCount": {
                "$sum": "$total_chars"
            }
        }},
        {"$sort": {
            "_id.date": 1
        }}
    ])

    results = dbCon["messages"].aggregate(filters)
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
      results = runWordsQuery(args)

    elif args["startdate"] is None and args["enddate"] is None:
      args["startdate"] = chat["first_message_date"]
      args["enddate"] = chat["last_message_date"]
      results = runWordsQuery(args)

    else:
      results = []

    return {"data": results}


class Chars(Resource):
  """ Class representing the 
  """

  def __init__(self):
    # define query string params
    self.parser = reqparse.RequestParser()
    self.parser.add_argument("groupby", type=str,
                             help="users, messagetype, {day, week, month, year}")
    self.parser.add_argument("startdate", type=str, help="YYYYMMDDThhmmss")
    self.parser.add_argument("enddate", type=str, help="YYYYMMDDThhmmss")

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

    if args["startdate"] is not None and args["enddate"] is not None:
      results = runCharsQuery(args)

    elif args["startdate"] is None and args["enddate"] is None:
      args["startdate"] = chat["first_message_date"]
      args["enddate"] = chat["last_message_date"]
      results = runCharsQuery(args)

    else:
      results = []

    return {"data": results}
