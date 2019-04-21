# April 20 2019
import sys
sys.path.insert(0, 'C:/Users/ditta/OneDrive/Python Projects/ChatStats')
from utils.cleanData import cleanText
import pandas as pd
import pickle
from sqlalchemy import create_engine
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer

# ---INCORPORATE EMOJI REACTIONS INTO MESSAGES---
# convert emoji reactions to words then add to corresponding message
# since niave bayes assumes iid variables placement of words dont matter
convert = {':thumbsup:': ' good', ':thumbsdown:': ' bad', ':joy:': ' happy',
           ':heart_eyes:': ' love', ':angry:': ' angry',
           ':disappointed_relieved:': ' sad', ':astonished:': ' surprised'}

engine = create_engine('sqlite:///../ParsedData.db', echo=False)
connection = engine.connect()
query1 = """
  SELECT messageIdx,content
  FROM Messages
  WHERE content IS NOT NULL
  """
query2 = """
  SELECT messageIdx, reaction
  FROM Reactions
  """
messages = pd.read_sql_query(query1, connection)
reactions = pd.read_sql_query(query2, connection)
'''
# add converted emojiword to corresponding message in messages dataframe
for index, row in reactions.iterrows():
  messages.loc[messages["messageIdx"] == row[
      'messageIdx'], "content"] += convert[row['reaction']]
'''
# ---RUN SENTIMENT CLASSIFIER ON ALL MESSAGES---
# Load in trained model
with open("../MultinomialNB_Sklearn_Accuracy76.pkl", "rb") as file:
  temp = pickle.load(file)
  classifier = temp[0]
  vectorizer = temp[1]
# convert all messages into vector
messages["content"] = messages["content"].apply(cleanText)
xInput = messages["content"].values

# run pred on all messages
pred = classifier.predict_proba(vectorizer.transform(xInput))
# classifier.predict(vectorizer.transform(['My dog is so cute']))
# convert probabilities into labels
classPred = []
for classProbs in pred:
  if classProbs[0] > 0.60:
    classPred.append("Negative")
  elif classProbs[0] < 0.40:
    classPred.append("Positive")
  else:
    classPred.append("Neutral")
# write dataframe to database
pred = pd.DataFrame(classPred, columns=["Sentiment"])
messages = pd.concat([messages, pred], axis=1, join='inner')
messages[["messageIdx", "content", "Sentiment"]].to_sql(
    "Sentiments", con=connection, if_exists="replace")
connection.close()
