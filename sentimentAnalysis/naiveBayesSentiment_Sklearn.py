# April 19 2019
import sys
sys.path.insert(0, 'C:/Users/ditta/OneDrive/Python Projects/ChatStats')
from cleanData import cleanText
import pandas as pd
import numpy as np
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn import metrics
from sklearn.cross_validation import train_test_split
from sqlalchemy import create_engine

path = "C:/Users/ditta/Desktop/train.csv"

data = pd.read_csv(path, encoding="latin")
data['SentimentText'] = data['SentimentText'].apply(cleanText)

x = data["SentimentText"].values
y = data["Sentiment"].values
xTrain, xTest, yTrain, yTest = train_test_split(x, y, random_state=1)

vectorizer = CountVectorizer()
trainCounts = vectorizer.fit_transform(xTrain)
testCounts = vectorizer.transform(xTest)

classifier = MultinomialNB()
classifier.fit(trainCounts, yTrain)

# classifier.predict(vectorizer.transform(['My dog is so cute']))
prediction = classifier.predict(testCounts)
print("Accuracy:", metrics.accuracy_score(yTest, prediction))


engine = create_engine('sqlite:///../ParsedData.db', echo=False)
connection = engine.connect()
query = """
  SELECT content
  FROM Messages
  WHERE content IS NOT NULL
  """
df = pd.read_sql_query(query, connection)

df["content"] = df["content"].apply(cleanText)
xTest = df["content"].values

prediction = classifier.predict(vectorizer.transform(xTest))

prediction = pd.DataFrame(prediction, columns=["Sentiment"])
df = pd.concat([df, prediction], axis=1, join='inner')
df.to_sql("Sentiment", con=connection, if_exists="replace")
connection.close()
