# April 20 2019
import re
from nltk.corpus import stopwords


def cleanText(text):
    text = text.lower()
    text = re.sub(r"@[^\s,<.>/?;\\:'\"|}{]+", "", text)
    text = re.sub(r"https?:[^\s]+", "", text)
    text = re.sub(r"www\.[^\s]+", "", text)
    text = re.sub(r"i'm", "i am", text)
    text = re.sub(r"he's", "he is", text)
    text = re.sub(r"she's", "she is", text)
    text = re.sub(r"it's", "it is", text)
    text = re.sub(r"that's", "that is", text)
    text = re.sub(r"what's", "that is", text)
    text = re.sub(r"where's", "where is", text)
    text = re.sub(r"how's", "how is", text)
    text = re.sub(r"\'ll", " will", text)
    text = re.sub(r"\'ve", " have", text)
    text = re.sub(r"\'re", " are", text)
    text = re.sub(r"\'d", " would", text)
    text = re.sub(r"\'re", " are", text)
    text = re.sub(r"won't", "will not", text)
    text = re.sub(r"can't", "cannot", text)
    text = re.sub(r"n't", " not", text)
    text = re.sub(r"n'", "ng", text)
    text = re.sub(r"'bout", "about", text)
    text = re.sub(r"'til", "until", text)
    text = re.sub(r"\n", "", text)
    text = re.sub(r"[-().'\"’“”\"#/!%?;\\@;^&_*$:<>{}`+=~|,]", "", text)
    text = re.sub(r" +", " ", text)

    return text

def cleanTextRemoveStop(text):
    stopWords = stopwords.words('english')
    text=cleanText(text)
    return " ".join([word for word in text.split(" ") if word not in stopWords])
