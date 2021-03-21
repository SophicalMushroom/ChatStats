from src import api, app
from config import config
from src.resources.home import Home
from src.resources.rawData import RawData

# define all endpoints
api.add_resource(Home, "/")
api.add_resource(RawData, config["baseURL"]+"/rawdata")


if __name__ == "__main__":
  app.run(debug=config["debugMode"])
