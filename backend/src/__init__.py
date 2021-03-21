from flask import Flask
from flask_restful import Api
from flask_caching import Cache
from config import config
import pymongo

app = Flask(__name__)
if config["debugMode"]:
  from flask_cors import CORS
  CORS(app)
cache = Cache(config=config["cacheConfig"])
cache.init_app(app)
api = Api(app)

client = pymongo.MongoClient(config["dbConfig"]["connectionStr"])
dbCon = client[config["dbConfig"]["dbName"]]
