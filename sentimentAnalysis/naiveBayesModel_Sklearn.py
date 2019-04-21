# April 19 2019
import sys
sys.path.insert(0, 'C:/Users/ditta/OneDrive/Python Projects/ChatStats')
from utils.cleanData import cleanText
import pandas as pd
import numpy as np
import pickle
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn import metrics
from sklearn.cross_validation import train_test_split

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

with open("../MultinomialNB_Sklearn_Accuracy76.pkl", "wb") as file:
    pickle.dump([classifier, vectorizer], file)
