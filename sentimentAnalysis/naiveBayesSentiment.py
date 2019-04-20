# April 20 2019
import sys
sys.path.insert(0, 'C:/Users/ditta/OneDrive/Python Projects/ChatStats')
from utils.cleanData import cleanTextRemoveStop
import pandas as pd
import numpy as np
import pickle

"""
Multinomial Bayes formula:
P(cj|d)=P(cj)Π[P(vi|cj)]
i=1,2...n    n=size of vocab
j=1,2...m    m=number of classes
cj is a class i.e. positive or negative sentiment
and vi is a word in the vocabulary

for P(vi|cj) we will use laplace smoothing with constant alpha
this will make sure probabilities don't become 0 for missing words
P(vi|cj)= (num of times wi appears in class cj + alpha)
          /(num of words in class cj + size of vocab)
"""


class MultinomialNB():

  def __init__(self, data=None, alpha=0.001):
    self.data = data
    self.alpha=alpha
    self.c = None
    self.v = None
    self.conditionalProbs = None
  
  def _generateClassProb(self):
    # calculate class probability vector
    # i.e. P(cj) the relative frequency of each class across all messages
    c = dict()
    for classes in set(self.data['Sentiment'].values):
        c[classes]=len(
          self.data[self.data["Sentiment"] == classes]) / len(self.data)
    return c

  def _generateVocab(self):
    # generate a set of unique words that appear in the enitre dataset
    v = set()
    self.data["SentimentText"].apply(lambda x: list(map(v.add, x.split(" "))))
    return v

  def _generateConditionalProbs(self):
    # calculate class conditional probablities
    # i.e. calculate: 
    # P(wi:cj)=(num of times wi appears in class cj)/(num of words in class cj)
    conditionalProbsMatrix=dict()
    for classes in self.c:
      conditionalProbsMatrix[classes]=dict()
      
      filteredData=self.data[self.data["Sentiment"]==classes]["SentimentText"]
      combined=""
      for i in filteredData.values:
        combined+=i
      idx=0
      totalWords=filteredData.apply(lambda x:len(x.split(" "))).sum()
      for word in self.v:
        wordCount=combined.count(word)
        conditionalProbsMatrix[classes][word]=(wordCount+self.alpha)/(
          totalWords+len(self.v))
        if idx%1000==0:
          print("Word: {} of {}   Class: {}".format(idx, len(self.v), classes))
        idx+=1
    return conditionalProbsMatrix
  
  def train(self):
    self.c = self._generateClassProb()
    self.v = self._generateVocab()
    self.conditionalProbs = self._generateConditionalProbs()

  def predict(self,message):
    message=cleanTextRemoveStop(message)
    print(message)
    posterior=dict()
    for classes in self.c:
      prior=self.c[classes]
      liklihood=0
      for word in message.split(" "):
        if word in self.v:
          liklihood+=self.conditionalProbs[classes][word]
      
      posterior[classes]=prior+liklihood
    
    return posterior
  
  def saveModel(self, filename):
    with open(filename, "wb") as file:
      pickle.dump([self.c, self.v, self.conditionalProbs], file)

  def loadModel(self, filename):
    with open(filename, "rb") as file:
      temp=pickle.load(file)
      self.c=temp[0]
      self.v=temp[1]
      self.conditionalProbs=temp[2]

if __name__ == '__main__':
  '''
  path = "C:/Users/ditta/Desktop/train.csv"
  data = pd.read_csv(path, encoding="latin")
  data['SentimentText'] = data['SentimentText'].apply(cleanTextRemoveStop)

  a = MultinomialNB(data, alpha=1)
  a.train()
  a.saveModel("model01alpha0001.pkl")
  '''
  a = MultinomialNB()
  a.loadModel("model01alpha0001.pkl")
