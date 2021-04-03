from src import api, app
from config import config
from src.resources.home import Home
from src.resources.rawData import RawData
from src.resources.chats import Chats, Chat
from src.resources.messages import Messages, Message

# define all endpoints
api.add_resource(Home, "/")
api.add_resource(RawData, config["baseURL"]+"/rawdata")
api.add_resource(Chats, config["baseURL"]+"/chats")
api.add_resource(Chat, config["baseURL"]+"/chats/<string:chatid>")
api.add_resource(Messages, config["baseURL"]+"/chats/<string:chatid>/messages")
api.add_resource(Message, config["baseURL"] +
                 "/chats/<string:chatid>/messages/<string:msgid>")


if __name__ == "__main__":
  app.run(debug=config["debugMode"])
