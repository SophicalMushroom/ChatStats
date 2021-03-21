from sklearn import metrics
from sklearn.cross_validation import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from naiveBayesConfusionMatrix_Sklearn import confusionMatrix
import pickle
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from utils.cleanData import cleanText
import sys

# ---Load into train/test split and clean data---
path = "C:/Users/ditta/Desktop/train.csv"

data = pd.read_csv(path, encoding="latin")
data['SentimentText'] = data['SentimentText'].apply(cleanText)

x = data["SentimentText"].values
y = data["Sentiment"].values
xTrain, xTest, yTrain, yTest = train_test_split(x, y, random_state=1)

# ---Vecotrize data and train model---
vectorizer = CountVectorizer()
trainCounts = vectorizer.fit_transform(xTrain)
testCounts = vectorizer.transform(xTest)

classifier = MultinomialNB()
classifier.fit(trainCounts, yTrain)

# ---save model---
# classifier.predict(vectorizer.transform(['My dog is so cute']))
with open("../MultinomialNB_Sklearn_Accuracy76.pkl", "wb") as file:
  pickle.dump([classifier, vectorizer], file)


# ---compute test metrics---
np.set_printoptions(precision=2)
prediction = classifier.predict(testCounts)
classNames = np.array(["Positive Sentiment", "Negative Sentiment"])
print("Accuracy: ", metrics.accuracy_score(yTest, prediction))
confusionMatrix(yTest, prediction, classes=classNames, normalize=True,
                title='Normalized Naive Bayes confusion matrix')

plt.show()
