from flask_restful import Resource, fields, marshal
from bson.objectid import ObjectId
from bson.errors import InvalidId
from src import dbCon

chatObject = {
    "_id": fields.String,
    "chat_name": fields.String,
    "participants": fields.List(fields.Nested(
        {"name": fields.String})),
    "total_words": fields.Integer,
    "total_chars": fields.Integer,
    "total_reacts": fields.Integer,
    "total_messages": fields.Integer,
    "days_active": fields.Integer,
    "first_message_date": fields.String,
    "last_message_date": fields.String,
    "total_joins": fields.Integer,
    "total_kicks": fields.Integer
}


class Chats(Resource):
  """ Class representing the 
  """

  def __init__(self):
    # define format of the responses
    self.outputFields = {"data": fields.List(fields.Nested(chatObject))}

  def get(self):
    result = {"data": []}

    for i in dbCon["chats"].find({}):
      i["_id"] = str(i["_id"])
      i["first_message_date"] = i["first_message_date"].strftime(
          "%Y-%m-%dT%H:%M:%S.%f")
      i["last_message_date"] = i["last_message_date"].strftime(
          "%Y-%m-%dT%H:%M:%S.%f")
      result["data"].append(i)

    return marshal(result, self.outputFields), 200


class Chat(Resource):
  """ Class representing the 
  """

  def __init__(self):
    # define format of the responses
    self.outputFields = {"data": fields.Nested(chatObject)}

  def get(self, chatid):
    try:
      result = dbCon["chats"].find_one({"_id": ObjectId(chatid)})
    except InvalidId as e:
      return {"message": "Chat with ID {} not found".format(chatid)}, 404

    if result is None:
      return {"message": "Chat with ID {} not found".format(chatid)}, 404
    else:
      return marshal({"data": result}, self.outputFields), 200
