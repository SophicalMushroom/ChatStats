# April 16 2019
import matplotlib.pyplot as plt
from sqlalchemy import create_engine
from textwrap import wrap
import pandas as pd
import datetime
import numpy as np
import pickle

TOPUSERS = 10

# ---initialize plots---
fig1 = plt.figure(facecolor='#07000d')
fig1.canvas.set_window_title('Total Message/Character Count by User')
plt.rcParams['savefig.facecolor'] = '#07000d'

# ---Gather message count per user data from database---
engine = create_engine('sqlite:///../ParsedData.db', echo=False)
connection = engine.connect()
query1 = """
  SELECT sender_name,SUM(LENGTH(content)) as charCount,
  count(*) as messageCount
  FROM Messages
  GROUP BY sender_name
  ORDER BY messageCount DESC
  """
# ---Generate top TOPUSERS number of users, messageCount and charCount lists
# read sql query into dataframes
messageFrame = pd.read_sql_query(query1, connection)
connection.close()
users = messageFrame["sender_name"].tolist()[:TOPUSERS]
messageCount = messageFrame["messageCount"].tolist()[:TOPUSERS]
charCount = messageFrame["charCount"].tolist()[:TOPUSERS]

# export top 10 users for other scripts to use
with open('../top10users.pkl', 'wb') as f:
  pickle.dump(users, f)

# generate indexes starting at 0 to len(users)
usersIndexes = np.arange(TOPUSERS)

# wrap user names to fit graph
users = ['\n'.join(wrap(l, 8)) for l in users]

# ---plot data Message Data---
ax1 = fig1.add_subplot(2, 1, 1, facecolor='#07000d')
# render y value text above each bars
for a, b in zip(usersIndexes, messageCount):
  plt.text(a - 0.1, b + 50, str(b), color='#ffffff')
# set font size for x-axis lables
for tick in ax1.xaxis.get_major_ticks():
  tick.label.set_fontsize(10)

plt.xticks(usersIndexes, users, rotation=-45)
plt.ylabel('Messages', color='#ffffff')
ax1.tick_params(axis='y', colors='#ffffff')
ax1.tick_params(axis='x', colors='#ffffff')
ax1.spines['bottom'].set_color('#5998ff')
ax1.spines['left'].set_color('#5998ff')
ax1.spines['right'].set_color('#5998ff')
ax1.spines['top'].set_color('#5998ff')
ax1.grid(True, color='#ffffff', alpha=0.2, linewidth=0.4)
ax1.bar(usersIndexes, messageCount,
        width=0.4, linewidth=1.8, edgecolor='#5998ff', alpha=0.6,
        color='#66b5ff')

title_obj = plt.title('Total Message Count by User ' +
                      datetime.datetime.now().strftime("%B %d, %Y"))
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ffffff')

# ---plot data Character Data---
ax2 = fig1.add_subplot(2, 1, 2, facecolor='#07000d')
# render y value text above each bars
for a, b in zip(usersIndexes, charCount):
  plt.text(a - 0.1, b + 50, str(b), color='#ffffff')
# set font size for x-axis lables
for tick in ax2.xaxis.get_major_ticks():
  tick.label.set_fontsize(10)

plt.xticks(usersIndexes, users, rotation=-45)
plt.ylabel('Characters', color='#ffffff')
ax2.tick_params(axis='y', colors='#ffffff')
ax2.tick_params(axis='x', colors='#ffffff')
ax2.spines['bottom'].set_color('#5998ff')
ax2.spines['left'].set_color('#5998ff')
ax2.spines['right'].set_color('#5998ff')
ax2.spines['top'].set_color('#5998ff')
ax2.grid(True, color='#ffffff', alpha=0.2, linewidth=0.4)
ax2.bar(usersIndexes, charCount,
        width=0.4, linewidth=1.8, edgecolor='#5998ff', alpha=0.6,
        color='#66b5ff', )
title_obj = plt.title('Total Character Count by User ' +
                      datetime.datetime.now().strftime("%B %d, %Y"))
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ffffff')
if __name__ == '__main__':
  plt.show()
# replace #ffffff with #ABAA98
