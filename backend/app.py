from src import api, app
from config import config
from src.resources.home import Home
from src.resources.rawData import RawData
from src.resources.chats import Chats, Chat

# define all endpoints
api.add_resource(Home, "/")
api.add_resource(RawData, config["baseURL"]+"/rawdata")
api.add_resource(Chats, config["baseURL"]+"/chats")
api.add_resource(Chat, config["baseURL"]+"/chats/<string:chatid>")


if __name__ == "__main__":
  app.run(debug=config["debugMode"])
