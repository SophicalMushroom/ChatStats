from sqlalchemy import create_engine

engine = create_engine('sqlite:///ParsedData.db', echo=False)
connection = engine.connect()


def searchByUserDate(name="Dittam Dey", date="2019-04-11"):
  # messages a user sent on a certain day
  query = """
    SELECT *
    FROM (SELECT sender_name, content, strftime("%%Y-%%m-%%d", timestamp_ms/1000,
    'unixepoch', 'localtime') as convertedDate
    FROM Messages)
    where sender_name="%s" and convertedDate="%s"
    """ % (name, date)
  for result in engine.execute(query):
    print(result)


def searchUserCountByDay(name="Dittam Dey", date="2019-04-11"):
  # number of messages a user sent on a certain day
  query = """
    SELECT COUNT(*)
    FROM (SELECT sender_name, content, strftime("%%Y-%%m-%%d", timestamp_ms/1000,
    'unixepoch', 'localtime') as convertedDate
    FROM Messages)
    where sender_name="%s" and convertedDate="%s"
    """ % (name, date)
  for result in engine.execute(query):
    print(result)


def messageCountPerUserByDay():
  # get message count per user per day
  query = """
    SELECT sender_name, COUNT(*) as count, strftime('%Y-%m-%d', 
      timestamp_ms/1000, 'unixepoch', 'localtime') as convertedDate
    FROM Messages
    GROUP BY sender_name, convertedDate
    ORDER BY count DESC
    """ % (name, date)
  for result in engine.execute(query):
    print(result)
