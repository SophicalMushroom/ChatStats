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
    'Wednesday, February 14, 2018 at 5:45pm EST' --> '2018-02-14'
    '''
    num = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    cal = {'': 0, 'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
           'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12}

    datestring = datestring.split(' ')
    datestring[1] = cal[datestring[1]]
    after = []

    after.append(str(datestring[3]) + '-')

    if str(datestring[1]) in num:
        after.append('0' + str(datestring[1]) + '-')
    else:
        after.append(str(datestring[1]) + '-')

    if str(datestring[2]).strip(',') in num:
        after.append('0' + str(datestring[2]).strip(','))
    else:
        after.append(str(datestring[2]).strip(','))

    return''.join(after)


#-----get raw message data from file-----
with open('RawData.txt', 'r', encoding='utf-8') as f:
    lines = f.read()

#-----Remove non-utf-8 chars-----
normalized = unicodedata.normalize('NFKD', lines).encode('ascii', 'ignore')
decoded_text = normalized.decode('utf-8')

#-----split into list of messages with their metadata-----
decoded_text = decoded_text.split('<div class="message">')
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
        message, '<span class="user">', '</span>'))

    # convert date to something readable
    rawDate = find_between(message, '<span class="meta">', '</span>')
    #datenum = dates.datestr2num(str2numdate(rawDate))
    dateReadable = str2numdate(rawDate)
    metadata['date'].append(dateReadable)

    messageText = (find_between(message, '</div></div><p>', '</p>'))

    for tags in filters:
        if tags in messageText:
            messageText = ' '
    # filter for when someone @user message
    if '<ul class' in messageText:
        messageText = find_between(messageText, '<p>', '<ul')

    metadata['messages'].append(messageText)

#-----convert to panda dataframe-----
dataFrame = pd.DataFrame(metadata)
# save parsed data to csv file
dataFrame.to_csv('metadata.csv')
