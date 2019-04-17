from sqlalchemy import create_engine
import datetime

engine = create_engine('sqlite:///ParsedData.db', echo=False)


def searchByUserDate(name="Dittam Dey", date="2019-04-11"):
  # messages a user sent on a certain day
  connection = engine.connect()
  query = """
    SELECT *
    FROM (SELECT sender_name, content, strftime("%%Y-%%m-%%d", timestamp_ms/1000,
    'unixepoch', 'localtime') as convertedDate
    FROM Messages)
    where sender_name="%s" and convertedDate="%s"
    """ % (name, date)
  return connection.execute(query)


def searchUserCountByDay(name="Dittam Dey", date="2019-04-11"):
  # number of messages a user sent on a certain day
  connection = engine.connect()
  query = """
    SELECT COUNT(*)
    FROM (SELECT sender_name, content, strftime("%%Y-%%m-%%d", timestamp_ms/1000,
    'unixepoch', 'localtime') as convertedDate
    FROM Messages)
    where sender_name="%s" and convertedDate="%s"
    """ % (name, date)
  return connection.execute(query)


def messageCountPerUserByDay():
  # get message count per user per day
  connection = engine.connect()
  query = """
    SELECT sender_name, COUNT(*) as count, strftime('%Y-%m-%d',
      timestamp_ms/1000, 'unixepoch', 'localtime') as convertedDate
    FROM Messages
    GROUP BY sender_name, convertedDate
    ORDER BY count DESC
    """ % (name, date)
  return connection.execute(query)


def wordCountByUsers():
  # return word count of each user
  connection = engine.connect()
  query = """
    SELECT sender_name,
    SUM((LENGTH(content)-LENGTH(REPLACE(content," ","")))+1) as count
    FROM Messages
    WHERE content IS NOT NULL
    GROUP BY sender_name
  """
  return connection.execute(query)


def totalWords():
  # return word count of each user
  connection = engine.connect()
  query = """
    SELECT SUM((LENGTH(content)-LENGTH(REPLACE(content," ","")))+1) as count
    FROM Messages
    WHERE content IS NOT NULL
  """
  for i in connection.execute(query):
    return i[0]


def totalMessages():
  connection = engine.connect()
  query = """
    SELECT COUNT(*) as count
    FROM Messages
    WHERE content IS NOT NULL
  """
  for i in connection.execute(query):
    return i[0]


def totalCharacters():
  connection = engine.connect()
  query = """
    SELECT SUM(LENGTH(content)) as count
    FROM Messages
    WHERE content IS NOT NULL
  """
  for i in connection.execute(query):
    return i[0]


def numUniqueWords():
  # returns number of unique words in chat after cleaning
  connection = engine.connect()
  query = """
    SELECT count(*) as count
    FROM WordCounts
  """
  for i in connection.execute(query):
    return i[0]


def totalDaysActive():
  # number of days since chat was created
  connection = engine.connect()
  query = """
    SELECT timestamp_ms
    FROM Messages
    WHERE timestamp_ms=(SELECT MIN(timestamp_ms) FROM Messages) OR
    timestamp_ms=(SELECT MAX(timestamp_ms) FROM Messages)
  """
  minmax = []
  for i in connection.execute(query):
    minmax.append(i[0])
  minmax[0] = datetime.datetime.fromtimestamp(round(minmax[0] / 1000))
  minmax[1] = datetime.datetime.fromtimestamp(round(minmax[1] / 1000))
  return (minmax[1] - minmax[0]).days
