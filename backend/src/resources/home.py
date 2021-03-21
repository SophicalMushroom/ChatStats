from flask import make_response
from flask_restful import Resource


class Home(Resource):

  def get(self):
    return make_response("""<h1>Chat Stats Backend API</h1>""", 200)
