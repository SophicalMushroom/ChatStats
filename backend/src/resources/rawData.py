from flask import request
from flask_restful import Resource
from werkzeug.utils import secure_filename
from ..utils import parser
from src import dbCon
import tempfile
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
      return {"message": "{}".format(e)}, 400

    return {"message": "uploaded"}
