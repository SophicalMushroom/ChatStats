from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from ..utils.cleanData import cleanText
import pickle

# ---INCORPORATE EMOJI REACTIONS INTO MESSAGES---
# convert emoji reactions to words then add to corresponding message
# since niave bayes assumes iid variables placement of words dont matter
convert = {'👍': ' good', '👎': ' bad', '😆':  ' happy',
           '😍': ' love', '😠': ' angry', '😢': ' sad',
           '😮': ' surprised'}


def loadClassifierModel(path):
  # Load in trained model
  with open(path, "rb") as file:
    temp = pickle.load(file)
    classifier = temp[0]
    vectorizer = temp[1]
  return classifier, vectorizer


def predictSentiment(messageObj, classifier, vectorizer):

  messageText = cleanText(messageObj["content"])
  # convert emoji to words and append to message text
  try:
    for reaction in messageObj["reactions"]:
      messageText += convert[reaction["reaction"]]
  except KeyError:
    pass

  predProbablity = classifier.predict(vectorizer.transform([messageText]))

  # convert probabilities into labels
  if predProbablity > 0.60:
    # positve
    return 1
  elif predProbablity < 0.40:
    # negative
    return -1
  else:
    # neutral
    return 0


if __name__ == '__main__':
  classifier, vectorizer = loadClassifierModel()
  print(predictSentiment(
      {"content": "My dog is so cute", "reactions": [{"reaction": "😍"}]},
      classifier, vectorizer))
