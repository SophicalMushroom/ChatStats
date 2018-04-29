import unicodedata
import pandas as pd
import matplotlib.dates as dates


def find_between(string, first, last):
    '''extract text in between two specified markers'''
    try:
        start = string.index(first) + len(first)
        end = string.index(last, start)
        return string[start:end]
    except ValueError:
        return ""


def str2numdate(datestring):
    '''convert string representation of a date to YYYY-MM-DD
    'Apr 28, 2018 4:20pm' --> '2018-02-14'
    '''
    num = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    cal = {'': 0, 'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'June': 6,
           'July': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12}

    datestring = datestring.split(' ')
    datestring[0] = cal[datestring[0]]
    after = []

    after.append(str(datestring[2]) + '-')

    if str(datestring[0]) in num:
        after.append('0' + str(datestring[0]) + '-')
    else:
        after.append(str(datestring[0]) + '-')

    if str(datestring[1]).strip(',') in num:
        after.append('0' + str(datestring[1]).strip(','))
    else:
        after.append(str(datestring[1]).strip(','))

    return''.join(after)


#-----get raw message data from file-----
with open('C:/Users/ditta/Desktop/messages/UTSCCMSClassof2021_b599914f0f/message.html', 'r', encoding='utf-8') as f:
    lines = f.read()

#-----Remove non-utf-8 chars-----
normalized = unicodedata.normalize('NFKD', lines).encode('ascii', 'ignore')
decoded_text = normalized.decode('utf-8')

#-----split into list of messages with their metadata-----
decoded_text = decoded_text.split(
    '</div><div class="pam _3-95 _2pi0 _2lej uiBoxWhite noborder">')
del decoded_text[0]

metadata = {
    'users': [],
    'date': [],
    'messages': [],
}

#-----Parse raw data into dictionary-----
# filter tags for images, videos, attachments
filters = ['<img src=', '<p><video src=', '<p><a href=']

# for each message append a new entry containing user,
# date, message to metadata dict
for message in decoded_text:

    # get user that sent the message
    metadata['users'].append(find_between(
        message, '<div class="_3-96 _2pio _2lek _2lel">', '</div>'))

    # convert date to something readable
    rawDate = find_between(message, '<div class="_3-94 _2lem">', '</div>')
    #datenum = dates.datestr2num(str2numdate(rawDate))
    dateReadable = str2numdate(rawDate)
    metadata['date'].append(dateReadable)

    # extract message
    messageText = (find_between(
        message, '<div class="_3-96 _2let"><div><div>', '</div>'))

    metadata['messages'].append(messageText)

#-----convert to panda dataframe-----
dataFrame = pd.DataFrame(metadata)
# save parsed data to csv file
dataFrame.to_csv('metadata.csv')
