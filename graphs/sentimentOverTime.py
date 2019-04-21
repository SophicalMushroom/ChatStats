# April 12 2019
import matplotlib.pyplot as plt
import pandas as pd
from sqlalchemy import create_engine
import pickle
import datetime

#----initiate plots----
fig2 = plt.figure(facecolor='#07000d')
fig2.canvas.set_window_title('SentimentAnalysis')
ax2 = fig2.add_subplot(1, 1, 1, facecolor='#07000d')
plt.rcParams['savefig.facecolor'] = '#07000d'

# ---Gather message count per user per week data from database---
engine = create_engine('sqlite:///../ParsedData.db', echo=False)
connection = engine.connect()
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

# ------Stacked Bar Plot-------

# add more depending on number of chat memebers
colors = ["#e11212", "#ccc6c6", "#0066ff"]


#---graph customization---
plt.ylabel('Precent of Messages', color='#ffffff')
ax2.tick_params(axis='y', colors='#ffffff')
ax2.tick_params(axis='x', colors='#ffffff')
ax2.spines['bottom'].set_color('#5998ff')
ax2.spines['left'].set_color('#5998ff')
ax2.spines['right'].set_color('#5998ff')
ax2.spines['top'].set_color('#5998ff')
ax2.grid(True, color='#ffffff', alpha=0.3, linewidth=0.4)
pivot_df = df.pivot_table(
    index='Date', columns='Sentiment', values='normalizedCount')
pivot_df.plot.bar(stacked=False, color=colors,
                  figsize=(10, 7), ax=ax2, grid=True, alpha=0.7, linewidth=0.8,
                  edgecolor='#5998ff', rot=-65)


title_obj = plt.title('Sentiment Over time ' +
                      datetime.datetime.now().strftime("%B %d, %Y"))
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ffffff')
for text in plt.legend(framealpha=0, loc='best').get_texts():
  plt.setp(text, color='w')
if __name__ == '__main__':
  plt.show()
# replace #ffffff with #ABAA98
