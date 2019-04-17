# April 12 2019
import matplotlib.pyplot as plt
import pandas as pd
from sqlalchemy import create_engine
import pickle
import datetime

#----initiate plots----
fig2 = plt.figure(facecolor='#07000d')
fig2.canvas.set_window_title('Message Reaction Breakdown by User')
ax2 = fig2.add_subplot(1, 1, 1, facecolor='#07000d')
plt.rcParams['savefig.facecolor'] = '#07000d'

# ---Gather message count per user per week data from database---
engine = create_engine('sqlite:///ParsedData.db', echo=False)
connection = engine.connect()
query = """
  SELECT reactor, reaction, COUNT(*) AS count
  FROM Reactions
  GROUP BY reaction, reactor
  ORDER BY reactor
  """
df = pd.read_sql_query(query, connection)  # read sql query into dataframe
connection.close()
# filter dataframe by top 10 users
with open('top10users.pkl', 'rb') as f:
  topUsers = pickle.load(f)
df = df[df['reactor'].isin(topUsers)]

# ------Stacked Bar Plot-------

# add more depending on number of chat memebers
colors = ["#31A354", "#ff0000", "#ffff66", "#0066ff", "#6600cc", '#e542f4',
          "#f4ac41", "#006D2C", "#ff9999", "#660033", '#ff00ff', "#74C476",
          '#41ebf4', '#7cf441', '#f4cd41']

#---graph customization---
plt.ylabel('count', color='#ffffff')
ax2.tick_params(axis='y', colors='#ffffff')
ax2.tick_params(axis='x', colors='#ffffff')
ax2.spines['bottom'].set_color('#5998ff')
ax2.spines['left'].set_color('#5998ff')
ax2.spines['right'].set_color('#5998ff')
ax2.spines['top'].set_color('#5998ff')
ax2.grid(True, color='#ffffff', alpha=0.3, linewidth=0.4)

df = df.pivot_table(index='reactor', columns='reaction', values='count')
df.plot.bar(stacked=False, color=colors, width=0.7, figsize=(10, 7), ax=ax2,
            grid=True, alpha=0.7, linewidth=0.8,
            edgecolor='#5998ff', rot=-45)


title_obj = plt.title('Message Reaction Breakdown by User ' +
                      datetime.datetime.now().strftime("%B %d, %Y"))
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ffffff')
# change font color in legend
for text in plt.legend(framealpha=0, loc='best').get_texts():
  plt.setp(text, color='w')
if __name__ == '__main__':
  engine = create_engine('sqlite:///../ParsedData.db', echo=False)
  plt.show()
# replace #ffffff with #ABAA98
