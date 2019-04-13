# April 12 2019
import matplotlib.pyplot as plt
from sqlalchemy import create_engine
from textwrap import wrap
import pickle

TOPUSERS = 10

# ---initialize plots---
fig = plt.figure(facecolor='#07000d')
fig.canvas.set_window_title('Total Messages by User')
ax1 = fig.add_subplot(1, 1, 1, facecolor='#07000d')
plt.rcParams['savefig.facecolor'] = '#07000d'

# ---Gather message count per user data from database---
engine = create_engine('sqlite:///../ParsedData.db', echo=False)
connection = engine.connect()
query = """
  SELECT sender_name,COUNT(*) as count
  FROM Messages
  GROUP BY sender_name
  ORDER BY count DESC
  """
# ---Generate top TOPUSERS number of users and messageCount lists
results = engine.execute(query)
users, messageCount, rank = [], [], 0
for result in results:
    users.append(result["sender_name"])
    messageCount.append(result["count"])
    rank += 1
    if rank == TOPUSERS:
        break

with open('../top10users.pkl', 'wb') as f:
    pickle.dump(users, f)

# generate indexes starting at 0 to len(users)
usersIndexes = list(range(TOPUSERS))

# wrap user names to fit graph
users = ['\n'.join(wrap(l, 8)) for l in users]
plt.xticks(usersIndexes, users, rotation=-45)

# set font size for x-axis lables
for tick in ax1.xaxis.get_major_ticks():
    tick.label.set_fontsize(10)

# render y value text above each bars
for a, b in zip(usersIndexes, messageCount):
    plt.text(a - 0.1, b + 50, str(b), color='#ABAA98')

# -----graph customization-----
plt.ylabel('Messages', color='#ABAA98')
ax1.tick_params(axis='y', colors='#ABAA98')
ax1.tick_params(axis='x', colors='#ABAA98')
ax1.spines['bottom'].set_color('#5998ff')
ax1.spines['left'].set_color('#5998ff')
ax1.spines['right'].set_color('#5998ff')
ax1.spines['top'].set_color('#5998ff')
ax1.grid(True, color='#ABAA98', alpha=0.2, linewidth=0.4)

# ---plot data---
ax1.bar(usersIndexes, messageCount,
        width=0.4, linewidth=1.8, edgecolor='#5998ff', alpha=0.6, color='#66b5ff')

title_obj = plt.title('Total Messages by User')
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ABAA98')
plt.show()
