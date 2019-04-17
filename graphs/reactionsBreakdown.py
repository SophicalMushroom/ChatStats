import sys
sys.path.insert(
    0, 'C:/Users/ditta/OneDrive/Python Projects/Machine Learning Projects')
from PyChat.CleanData import cleanText
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import datetime
from sqlalchemy import create_engine
# initialize plots
fig = plt.figure(facecolor='#07000d')
fig.canvas.set_window_title('message reactions breakdown')
ax3 = fig.add_subplot(1, 1, 1, facecolor='#07000d')
ax3.axis("equal")
plt.rcParams['savefig.facecolor'] = '#07000d'
plt.rcParams['text.color'] = '#ABAA98'
plt.rcParams['font.size'] = 14

engine = create_engine('sqlite:///../ParsedData.db', echo=False)
connection = engine.connect()
# ---get all messages from database---
query = """
  SELECT reaction, COUNT(*) as count
  FROM Reactions
  GROUP BY reaction
  ORDER BY count DESC
  """
results = connection.execute(query)
reactions, counts = [], []
for reaction in results:
  reactions.append(reaction["reaction"])
  counts.append(reaction["count"])
connection.close()
# convert emojis to words for plotting
convert = {'👍': ':thumbsup:', '👎': ':thumbsdown:', '😆': ':joy:',
           '😍': ':heart_eyes:', '😠': ':angry:', '😢': ':disappointed_relieved:',
           '😮': ':astonished:'}
reactions = [convert[i] for i in reactions]
# add counts to labels
reactions = ['{: <8} {: >5}'.format(
    reactions[i], counts[i]) for i in range(len(reactions))]
# add more if more words than top 15
colors = ['#b3daff', '#99ceff', '#80c1ff', '#66b5ff', '#4da9ff',
          '#339cff', '#1a90ff', '#0084ff', '#0077e6', '#0069cc', '#005cb3',
          '#004f99', '#004280', '#003566', '#00284d']
# plot pie chart
wedges, texts = ax3.pie(counts, startangle=90, labels=reactions, colors=colors)

#------graph customization------
for w in wedges:
  w.set_linewidth(3)
  w.set_edgecolor('#07000d')

title_obj = plt.title('Message Reactions Breakdown ' +
                      datetime.datetime.now().strftime("%B %d, %Y"))
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ABAA98')


if __name__ == '__main__':
  engine = create_engine('sqlite:///../ParsedData.db', echo=False)
  plt.show()
