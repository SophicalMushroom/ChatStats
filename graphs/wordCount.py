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
fig.canvas.set_window_title('Word Count')
ax3 = fig.add_subplot(1, 1, 1, facecolor='#07000d')
ax3.axis("equal")
plt.rcParams['savefig.facecolor'] = '#07000d'
plt.rcParams['text.color'] = '#ABAA98'
plt.rcParams['font.size'] = 14


engine = create_engine('sqlite:///ParsedData.db', echo=False)
connection = engine.connect()
# ---get all messages from database---
query = """
  SELECT *
  FROM Messages
  WHERE content IS NOT NULL
  """
wordCount = {}
results = connection.execute(query)
# for each message tokenize then record count of each word in message
for message in results:
  tokenized = cleanText(message["content"]).split(" ")
  for word in set(tokenized):
    if word in wordCount:
      wordCount[word] += tokenized.count(word)
    elif word != "":
      wordCount[word] = tokenized.count(word)

# ---convert to dataframe and write to WordCounts table---
connection.close()
connection = engine.connect()
wordFrame = pd.Series(wordCount, name="count")
wordFrame = wordFrame.to_frame()
wordFrame["words"] = wordFrame.index
wordFrame = wordFrame.sort_values(by=['count'])
wordFrame = wordFrame.reset_index(drop=True)
try:
  wordFrame.to_sql("WordCounts", con=connection, if_exists="fail")
except:
  pass
# generate label text
wordsLabel = wordFrame["words"].tolist()[:-15:-1]
counts = wordFrame["count"].tolist()[:-15:-1]
for i in range(len(wordsLabel)):
  wordsLabel[i] = '{: <8} {: >5}'.format(wordsLabel[i], counts[i])

# add more if more words than top 15
colors = ['#b3daff', '#99ceff', '#80c1ff', '#66b5ff', '#4da9ff',
          '#339cff', '#1a90ff', '#0084ff', '#0077e6', '#0069cc', '#005cb3',
          '#004f99', '#004280', '#003566', '#00284d']

# plot pie chart
wedges, texts = ax3.pie(counts, startangle=90,
                        labels=wordFrame["words"].tolist()[:-15:-1],
                        colors=colors)

#------graph customization------
for w in wedges:
  w.set_linewidth(3)
  w.set_edgecolor('#07000d')

plt.legend(facecolor='#07000d', labels=wordsLabel,
           loc='upper right', bbox_to_anchor=(0.25, 1.0))

title_obj = plt.title('Most Used Words ' +
                      datetime.datetime.now().strftime("%B %d, %Y"))
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ABAA98')


if __name__ == '__main__':
  engine = create_engine('sqlite:///../ParsedData.db', echo=False)
  plt.show()
