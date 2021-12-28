from flask import request
from flask_restful import Resource, fields, marshal, reqparse
from bson.objectid import ObjectId
from bson.errors import InvalidId
from datetime import datetime
from src import dbCon
import json


def formatArgs(args):
  try:

    if args["startdate"] and args["enddate"]:
      args["startdate"] = datetime.strptime(args["startdate"], "%Y%m%dT%H%M%S")
      args["enddate"] = datetime.strptime(args["enddate"], "%Y%m%dT%H%M%S")

    args["groupby"] = request.args.getlist("groupby")

    # groupby can not be empty
    if args["groupby"] == []:
      args["groupby"] = None

    # type argument cant be empty if groupby=user is specified
    elif "user" in args["groupby"] and args["type"] is None:
      raise Exception("Invalid query parameters")

    return args

  except:
    raise Exception("Invalid query parameters")


def runReactionsQuery(args):
  filters = [
      {"$match": {
          "chat_name": args["chatName"],
          "date": {
              "$lte": args["enddate"],
              "$gte": args["startdate"]
          },
      }},
      {"$unwind": "$reactions"},
  ]

  # if no groupy is specified return total reactions count
  if args["groupby"] is None:
    filters.extend([
        {"$group": {
            "_id": None,
            "count": {
                "$sum": 1
            }
        }},
        {"$sort": {
            "count": -1
        }},
        {"$project": {
            "_id": 0
        }},
    ])

  else:
    groups = {}
    if "emojis" in args["groupby"]:
      groups["reaction"] = "$reactions.reaction"

    if "user" in args["groupby"] and args["type"] == "sent":
      groups["sender"] = "$reactions.actor"

    filters.extend([
        {"$group": {
            "_id": groups,
            "count": {
                "$sum": 1
            }
        }},
        {"$sort": {
            "count": -1
        }},
    ])

  results = dbCon["messages"].aggregate(filters)
  results = list(results)
  return results

  # return total word count of all messages between date
  # grouped by specified fields
  # elif args["groupby"]:
  #   groups = {}
  #   for i in args["groupby"]:
  #     if i == "users":
  #       groups["sender_name"] = "$sender_name"

  #   filters.extend([
  #       {"$group": {
  #           "_id": groups,
  #           "totalWordsCount": {
  #               "$sum": "$total_words"
  #           }
  #       }},
  #       {"$sort": {
  #           "_id.date": 1
  #       }}
  #   ])

  #   results = dbCon["messages"].aggregate(filters)
  #   results = list(results)
  #   return results


class Reactions(Resource):
  """ Class representing the
  """

  def __init__(self):
    # define query string params
    self.parser = reqparse.RequestParser()
    self.parser.add_argument("groupby", type=str, help="users, emojis")
    self.parser.add_argument(
        "type", type=str, help="sent, received (only applies when groupby=user is specified)")
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
      results = runReactionsQuery(args)

    elif args["startdate"] is None and args["enddate"] is None:
      args["startdate"] = chat["first_message_date"]
      args["enddate"] = chat["last_message_date"]
      results = runReactionsQuery(args)

    else:
      results = []

    return {"data": results}
