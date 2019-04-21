# April 12 2019
import matplotlib.pyplot as plt
import pandas as pd
from sqlalchemy import create_engine
import pickle
import datetime

#----initiate plots----
fig1 = plt.figure(facecolor='#07000d')
fig1.canvas.set_window_title('SentimentAnalysis')
plt.rcParams['savefig.facecolor'] = '#07000d'


# ---Gather message count per user per week data from database---
engine = create_engine('sqlite:///../ParsedData.db', echo=False)
connection = engine.connect()
query1 = """
  CREATE VIEW sentimentCount AS
  SELECT p2.sender_name,Sentiment,COUNT(Sentiment) AS count
  FROM Sentiments AS p1, Messages AS p2
  ON p1.messageIdx = p2.messageIdx
  GROUP BY Sentiment, sender_name;
"""
query2 = """
  CREATE VIEW normalizer AS
  SELECT COUNT(Sentiment) AS count, sender_name
  FROM Sentiments AS p1, Messages AS p2
  ON p1.messageIdx = p2.messageIdx
  GROUP BY sender_name;
  """
query3 = """
  SELECT p1.sender_name, Sentiment, ((p1.count+0.0)/p2.count) AS normalizedCount
  FROM sentimentCount AS p1, normalizer AS p2
  ON p1.sender_name=p2.sender_name;
"""
query4 = """
  DROP VIEW IF EXISTS normalizer;
"""
query5 = """
  DROP VIEW IF EXISTS sentimentCount;
"""

connection.execute(query1)
connection.execute(query2)
df = pd.read_sql_query(query3, connection)  # read sql query into dataframe
connection.execute(query4)
connection.execute(query5)


with open('../top10users.pkl', 'rb') as f:
  topUsers = pickle.load(f)
df = df[df['sender_name'].isin(topUsers)]
# ------Stacked Bar Plot-------

# add more depending on number of chat memebers
colors = ["#e11212", "#ccc6c6", "#0066ff"]


#---graph customization---
ax2 = fig1.add_subplot(2, 1, 1, facecolor='#07000d')
plt.ylabel('Precent of Messages', color='#ffffff')
ax2.tick_params(axis='y', colors='#ffffff')
ax2.tick_params(axis='x', colors='#ffffff')
ax2.spines['bottom'].set_color('#5998ff')
ax2.spines['left'].set_color('#5998ff')
ax2.spines['right'].set_color('#5998ff')
ax2.spines['top'].set_color('#5998ff')
ax2.grid(True, color='#ffffff', alpha=0.3, linewidth=0.4)
pivot_df = df.pivot_table(
    index='sender_name', columns='Sentiment', values='normalizedCount')
pivot_df.plot.bar(stacked=False, color=colors,
                  figsize=(10, 7), ax=ax2, grid=True, alpha=0.7, linewidth=0.8,
                  edgecolor='#5998ff', rot=-65)


title_obj = plt.title('Normalized Sentiment by User ' +
                      datetime.datetime.now().strftime("%B %d, %Y") + ' (Naive Bayes)')
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ffffff')
for text in plt.legend(framealpha=0, loc='best').get_texts():
  plt.setp(text, color='w')


query1 = """
  CREATE VIEW sentimentCount AS
  SELECT Sentiment,COUNT(Sentiment) AS count,
  strftime('%Y-%m',timestamp_ms/1000, 'unixepoch', 'localtime') AS Date
  FROM Sentiments AS p1, Messages AS p2
  ON p1.messageIdx = p2.messageIdx
  GROUP BY Date, Sentiment
  ORDER BY Date;
"""
query2 = """
  CREATE VIEW normalizer AS
  SELECT COUNT(Sentiment) AS count,
  strftime('%Y-%m',timestamp_ms/1000, 'unixepoch', 'localtime') AS Date
  FROM Sentiments AS p1, Messages AS p2
  ON p1.messageIdx = p2.messageIdx
  GROUP BY Date
  ORDER BY Date;
  """
query3 = """
  SELECT Sentiment, p1.Date, ((p1.count+0.0)/p2.count) AS normalizedCount
  FROM sentimentCount AS p1, normalizer AS p2
  ON p1.Date=p2.Date;
"""
query4 = """
  DROP VIEW IF EXISTS normalizer;
"""
query5 = """
  DROP VIEW IF EXISTS sentimentCount;
"""

connection.execute(query1)
connection.execute(query2)
df = pd.read_sql_query(query3, connection)  # read sql query into dataframe
connection.execute(query4)
connection.execute(query5)
connection.close()

ax1 = fig1.add_subplot(2, 1, 2, facecolor='#07000d')
plt.ylabel('Precent of Messages', color='#ffffff')
ax1.tick_params(axis='y', colors='#ffffff')
ax1.tick_params(axis='x', colors='#ffffff')
ax1.spines['bottom'].set_color('#5998ff')
ax1.spines['left'].set_color('#5998ff')
ax1.spines['right'].set_color('#5998ff')
ax1.spines['top'].set_color('#5998ff')
ax1.grid(True, color='#ffffff', alpha=0.3, linewidth=0.4)
pivot_df = df.pivot_table(
    index='Date', columns='Sentiment', values='normalizedCount')
pivot_df.plot.bar(stacked=False, color=colors,
                  figsize=(10, 7), ax=ax1, grid=True, alpha=0.7, linewidth=0.8,
                  edgecolor='#5998ff', rot=-65)


title_obj = plt.title('Normalized Sentiment Over time ' +
                      datetime.datetime.now().strftime("%B %d, %Y") + ' (Naive Bayes)')
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ffffff')
for text in plt.legend(framealpha=0, loc='best').get_texts():
  plt.setp(text, color='w')

if __name__ == '__main__':
  plt.show()
# replace #ffffff with #ABAA98
