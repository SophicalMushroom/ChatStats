from src import api, app
from config import config
from src.resources.home import Home
from src.resources.rawData import RawData
from src.resources.chats import Chats, Chat
from src.resources.messages import Messages, Message
from src.resources.vocab import Words, Chars, Sentiment


# define all endpoints
api.add_resource(Home, "/")
api.add_resource(RawData, config["baseURL"]+"/rawdata")
api.add_resource(Chats, config["baseURL"]+"/chats")
api.add_resource(Chat, config["baseURL"]+"/chats/<string:chatid>")
api.add_resource(Messages, config["baseURL"]+"/chats/<string:chatid>/messages")
api.add_resource(Message, config["baseURL"] +
                 "/chats/<string:chatid>/messages/<string:msgid>")
api.add_resource(Words, config["baseURL"] +
                 "/chats/<string:chatid>/vocab/words")
api.add_resource(Chars, config["baseURL"] +
                 "/chats/<string:chatid>/vocab/chars")
api.add_resource(Sentiment, config["baseURL"] +
                 "/chats/<string:chatid>/vocab/sentiment")

if __name__ == "__main__":
  app.run(debug=config["debugMode"])
