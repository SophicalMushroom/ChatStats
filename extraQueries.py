from sqlalchemy import create_engine

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
  for result in engine.execute(query):
    print(result)
  connection.close()


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
  for result in engine.execute(query):
    print(result)
  connection.close()


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
  for result in engine.execute(query):
    print(result)
  connection.close()


sql = """
  select sender_name, Sum((length(content)-length(replace(content," ","")))+1 )
from Messages
where content is not null
group by sender_name
"""
