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

client = pymongo.MongoClient(
    config["dbConfig"]["connectionStr"], ssl=True, ssl_cert_reqs='CERT_NONE')
dbCon = client[config["dbConfig"]["dbName"]]
with open("src/utils/top1000words.txt", "r") as file:
  top1000words = file.readlines()
  top1000words = [i.strip("\n") for i in top1000words]
  top1000words.append("")
