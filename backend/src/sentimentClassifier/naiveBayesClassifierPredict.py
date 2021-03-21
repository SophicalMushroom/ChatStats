from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
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


def predictSentiment(messageObj, cleanedText, classifier, vectorizer):

  # convert emoji to words and append to message text
  try:
    for reaction in messageObj["reactions"]:
      cleanedText += convert[reaction["reaction"]]
  except KeyError:
    pass

  predProbablity = classifier.predict_proba(
      vectorizer.transform([cleanedText]))

  # convert probabilities into labels
  if predProbablity[0][1] > 0.6:
    # positve
    return 1
  elif predProbablity[0][1] < 0.4:
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
