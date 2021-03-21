from flask import jsonify, request
from flask_restful import Resource, reqparse, fields, marshal
from werkzeug.utils import secure_filename
from datetime import datetime
from shutil import rmtree
from ..utils import parser
from src import dbCon
import zipfile
import os


class RawData(Resource):
  """ Class representing the /mdcmessages endpoint, returns all mdc
  messages that satisfy certain filters
  """

  def post(self):
    """
    Implements the HTTP POST method for the the /mdcmessages endpoint

    Note the filters for the mdc messages are in the request body in
    JSON format instead of being in the url query string. Limit and
    offset are still in the url query string.
    """
    try:
      cwd = os.getcwd()
      # get raw data from request
      file = request.files.getlist("uploadedFiles")[0]
      rawDataFolder = file.filename.replace(".zip", "")

      # extract and save the raw data
      file.save(secure_filename(file.filename))
      with zipfile.ZipFile(file.filename, 'r') as zipFile:
        zipFile.extractall("./")
        #  parse raw data file and update database
        parser.runParser(dbCon, rawDataFolder)

      os.remove(cwd+"/"+file.filename)
      rmtree(cwd+"/"+rawDataFolder)

    except Exception as e:  # if sql server throws any errors
      os.remove(cwd+"/"+file.filename)
      rmtree(cwd+"/"+rawDataFolder)
      return {"message": "{}".format(e)}, 400

    return {"message": "uploaded"}
