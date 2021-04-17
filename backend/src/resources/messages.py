from flask import request
from flask_restful import Resource, fields, marshal, reqparse
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
from bson.errors import InvalidId
from datetime import datetime
from src import dbCon
import pymongo
import json


def formatArgs(args):
  try:

    if args["startdate"] and args["enddate"]:
      args["startdate"] = datetime.strptime(args["startdate"], "%Y%m%dT%H%M%S")
      args["enddate"] = datetime.strptime(args["enddate"], "%Y%m%dT%H%M%S")

    args["messagecount"] = True if args["messagecount"] == "true" else None
    args["groupby"] = request.args.getlist("groupby")

    return args

  except:
    raise Exception("Invalid query parameters")


def runQuery(args):
  results = []

  #  base query filter messgaes by chat_name and date
  filters = [
      {"$match": {
          "chat_name": args["chatName"],
          "date": {
              "$lte": args["enddate"],
              "$gte": args["startdate"]
          },
      }}
  ]

  if args["regex"]:
    filters[0]["$match"]["content"] = {"$regex": args["regex"]}

  # return raw messages between date range for specified chat_name
  # sorted by date from latest to oldest
  if args["messagecount"] is None and not args["groupby"]:
    filters.append({"$sort": {"date": -1}})
    filters.append({
        "$addFields": {
            "_id": {"$toString": "$_id"},
            "date": {
                "$dateToString": {
                    "format": "%Y-%m-%dT%H:%M:%S",
                    "date": "$date"
                },
            }
        }
    })

    results = dbCon["messages"].aggregate(filters)
    results = list(results)
    return results

  # return message count between date range for specified chat_name
  elif args["messagecount"] and not args["groupby"]:
    filters.append({"$count": "message_count"})
    results = dbCon["messages"].aggregate(filters)
    results = list(results)
    return results[0]["message_count"]

  # return raw messages between date range for specified chat_name
  # grouped by users, date and/or message type
  elif args["groupby"] and args["messagecount"] is None:
    groups = {}
    for i in args["groupby"]:

      if i == "users":
        groups["sender_name"] = "$sender_name"

      elif i == "messagetype":
        groups["type"] = "$type"

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

    filters.append({
        "$group": {
            "_id": groups,
            "messages": {
                "$push": "$$ROOT"
            }
        }
    })
    filters.append({
        "$addFields": {
            "messages": {
                "$map": {
                    "input": "$messages",
                    "in": {
                        "$mergeObjects": [
                            "$$this",
                            {
                                "_id": {
                                    "$toString": "$$this._id"
                                }
                            },
                            {
                                "date": {
                                    "$dateToString": {
                                        "format": "%Y-%m-%dT%H:%M:%S",
                                        "date": "$$this.date"
                                    },
                                }
                            }
                        ]
                    }
                }
            }
        }
    })

    results = dbCon["messages"].aggregate(filters)
    results = list(results)
    print(results)
    return results

  # return message count between date range for specified chat_name
  # grouped by users, date and/or message type, sorted by message count
  elif args["groupby"] and args["messagecount"]:
    groups = {}
    for i in args["groupby"]:
      if i == "users":
        groups["sender_name"] = "$sender_name"
      elif i == "messagetype":
        groups["type"] = "$type"

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
            "message_count": {
                "$sum": 1
            }
        }
        },
        {"$sort": {
            "_id.date": 1
        }}
    ])
    # filters.append({
    #     "$sort": {
    #         "message_count": -1
    #     }
    # })

    results = dbCon["messages"].aggregate(filters)
    results = list(results)
    return results


class Messages(Resource):
  """ Class representing the
  """

  def __init__(self):
    # define query string params
    self.parser = reqparse.RequestParser()
    self.parser.add_argument("groupby", type=str,
                             help="users, messagetype, {day, week, month, year}")
    self.parser.add_argument("startdate", type=str, help="YYYYMMDDThhmmss")
    self.parser.add_argument("enddate", type=str, help="YYYYMMDDThhmmss")
    self.parser.add_argument("messagecount", type=str,
                             help="Return messages counts(true) or raw messages(false)")
    self.parser.add_argument("regex", type=str,
                             help="Enter a regular expression")
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

    if args["startdate"] is not None and args["enddate"] is not None:
      results = runQuery(args)
    else:
      args["startdate"] = chat["first_message_date"]
      args["enddate"] = chat["last_message_date"]
      results = runQuery(args)

    return {"data": results}


class Message(Resource):
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
