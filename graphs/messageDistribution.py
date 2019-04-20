# April 12 2019
import matplotlib.pyplot as plt
import pandas as pd
from sqlalchemy import create_engine
import pickle
import datetime

#----initiate plots----
fig2 = plt.figure(facecolor='#07000d')
fig2.canvas.set_window_title('Message Distribution by week')
ax2 = fig2.add_subplot(1, 1, 1, facecolor='#07000d')
plt.rcParams['savefig.facecolor'] = '#07000d'

# ---Gather message count per user per week data from database---
engine = create_engine('sqlite:///../ParsedData.db', echo=False)
connection = engine.connect()
query = """
  SELECT sender_name, COUNT(*) as messageCount, date(strftime('%Y-%m-%d',
  timestamp_ms/1000, 'unixepoch', 'localtime'), 'weekday 6','-6 days' )
  as convertedDate
  FROM Messages
  GROUP BY sender_name, convertedDate
  ORDER BY messageCount DESC
  """
df = pd.read_sql_query(query, connection)  # read sql query into dataframe
connection.close()
# filter dataframe by top 10 users
with open('top10users.pkl', 'rb') as f:
  topUsers = pickle.load(f)
df = df[df['sender_name'].isin(topUsers)]

# ------Stacked Bar Plot-------

# add more depending on number of chat memebers
colors = ["#006D2C", "#31A354", "#ff0000", "#ffff66", "#0066ff", "#74C476",
          "#6600cc", '#e542f4', "#ff00ff", "#ff9999", "#660033", '#f4ac41',
          '#41ebf4', '#7cf441', '#f4cd41']


#---graph customization---
plt.ylabel('Messages', color='#ffffff')
ax2.tick_params(axis='y', colors='#ffffff')
ax2.tick_params(axis='x', colors='#ffffff')
ax2.spines['bottom'].set_color('#5998ff')
ax2.spines['left'].set_color('#5998ff')
ax2.spines['right'].set_color('#5998ff')
ax2.spines['top'].set_color('#5998ff')
ax2.grid(True, color='#ffffff', alpha=0.3, linewidth=0.4)

pivot_df = df.pivot_table(index='convertedDate', columns='sender_name',
                          values='messageCount')
pivot_df.plot.bar(stacked=True, color=colors,
                  figsize=(10, 7), ax=ax2, grid=True, alpha=0.7, linewidth=0.8,
                  edgecolor='#5998ff', rot=-65)


title_obj = plt.title('Message Distribution by week, top 10 users ' +
                      datetime.datetime.now().strftime("%B %d, %Y"))
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ffffff')
for text in plt.legend(framealpha=0, loc='best').get_texts():
  plt.setp(text, color='w')
if __name__ == '__main__':
  plt.show()
# replace #ffffff with #ABAA98
