from flask import request
from flask_restful import Resource
from werkzeug.utils import secure_filename
from ..utils import parser
from src import dbCon
import tempfile
import zipfile
import os


class RawData(Resource):
  """ Class representing the /RawData endpoint, upload raw chat data
  from Facebook JSON export
  """

  def post(self):
    """
    Implements the HTTP POST method for the the /rawdata endpoint

    Takes in a zip file with the format:

    myZip.zip
      |__GroupChat1
          |__message_1.json      
          |__message_2.json
          ...      
      |__GroupChat2
          |__message_1.json      
          |__message_2.json
          ...   
    """
    try:

      # get raw data from request
      file = request.files.getlist("uploadedFiles")[0]

      # create temp directory
      with tempfile.TemporaryDirectory() as tempDir:
        # save uploaded file to temp directory
        file.save(os.path.join(tempDir, secure_filename(file.filename)))
        # extract uploaded file to temp directory
        with zipfile.ZipFile(os.path.join(tempDir, file.filename), 'r') as zipFile:
          zipFile.extractall(tempDir)
          #  parse raw data file and update database
          parser.runParser(dbCon, tempDir)

    except Exception as e:  # if server throws any errors
      print(e)
      return {"message": "{}".format(e)}, 400

    return {"message": "uploaded"}
