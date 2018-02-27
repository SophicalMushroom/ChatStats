import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# initialize plots
fig = plt.figure(facecolor='#07000d')
fig.canvas.set_window_title('Word Count')
ax1 = fig.add_subplot(1, 1, 1, facecolor='#07000d')
ax1.axis("equal")
plt.rcParams['savefig.facecolor'] = '#07000d'
plt.rcParams['text.color'] = '#ABAA98'
plt.rcParams['font.size'] = 14


def getWordCounts():
    '''
    generate wordCount.csv that maps words to number of times they were used
    in the chat
    '''
    metaData = pd.read_csv('metadata.csv')
    # compile every message ever sent into a string
    message_string = ''
    for message in metaData['messages']:
        message_string += str(message)

    # get total character and word counts
    charCount = len(message_string)
    message_string = message_string.split(' ')
    wordCount = len(message_string)

    # compile unique words set
    uniqueWords = set()
    for word in message_string:
        uniqueWords.add(word)

    # get the number of times each unique word appears in chat
    wordlist = []
    countlist = []
    for word in uniqueWords:
        wordlist.append(word)
        countlist.append(message_string.count(word))

    # save it as a pandas dataframe
    dataFrame = pd.DataFrame({'words': wordlist})
    dataFrame['count'] = countlist

    dataFrame.to_csv('wordCount.csv')
    return charCount, wordCount, len(uniqueWords)


def getTop10(num):
    '''(int)-> dict, list, list
    return the (num) of words used in the chat
    '''
    wordData = pd.read_csv('wordCount.csv')
    countlist = wordData['count'].tolist()
    wordlist = wordData['words'].tolist()
    topWords = []
    topCounts = []
    topDict = {}
    for i in range(num):
        max_count = max(countlist)
        max_idx = countlist.index(max_count)
        word = wordlist[max_idx]
        topDict[str(word)] = max_count
        topWords.append(word)
        topCounts.append(max_count)

        wordlist.pop(max_idx)
        countlist.pop(max_idx)

    return topDict, topWords, topCounts


def charCountPerUser():
    '''return a dictionary mapping names to total characters typed in chat'''

    dataFrame = pd.read_csv('metadata.csv')
    charcountperuser = {}

    for name in dataFrame['users']:
        if name not in charcountperuser.keys():
            charcountperuser[name] = 0

    for i in range(len(dataFrame['date'])):
        charcountperuser[dataFrame.loc[i]['users']
                         ] += len(str(dataFrame.loc[i]['messages']))
    return charcountperuser


totalChars, totalWords, uniqueWords = getWordCounts()
print('Total Characters: ' + str(totalChars))
print('Total Words: ' + str(totalWords))
print('Unique Words: ' + str(uniqueWords))
print(charCountPerUser())

dummyVar, words, counts = getTop10(10)

# generate graph labels
wordsLabel = words[:]
for i in range(len(words)):
    words[i] = '{: <8} {: >5}'.format(words[i], counts[i])

# add more if more words than top 10
colors = ['#b3daff', '#99ceff', '#80c1ff', '#66b5ff', '#4da9ff',
          '#339cff', '#1a90ff', '#0084ff', '#0077e6', '#0069cc', '#005cb3',
          '#004f99', '#004280', '#003566', '#00284d']

# plot pie chart
wedges, texts = ax1.pie(counts, startangle=90,
                        labels=wordsLabel, colors=colors)

#------graph customization------
for w in wedges:
    w.set_linewidth(3)
    w.set_edgecolor('#07000d')

plt.legend(facecolor='#07000d', labels=words,
           loc='upper right', bbox_to_anchor=(0.25, 1.0))

title_obj = plt.title('Most Used Words')
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ABAA98')

plt.show()
