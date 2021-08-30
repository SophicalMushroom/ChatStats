# Introduction 
Analytics dashboard for Facebook group chats.


# Dependencies 
- Node.js 14.15.4
- React 16
- Python 3.8

# Setup
### Install frontend dependencies 
```
$ cd ChatStats/frontend
$ npm install
```

### Running the frontend locally
```
$ cd ChatStats/frontend
$ npm start
```

### Install backend dependencies 
```
$ cd ChatStats/backend
$ python -m venv venv
$ venv/Scripts/activate
$ pip install -r requirements.txt
```

### Running the backend locally
```
$ cd ChatStats/backend
$ python app.py
```

### Database Schema
```
chat: [DONE]
{
	_id:,
	chatName:<string>,
	firstMessageDate:<DateTime>,
	lastMessageDate:<DateTime>,
	days_active:<int>,
	participants:<list><string>,
	totalMessages:<int>,
	totalWords:<int>,
	totalCharacters:<int>,
  totalReacts:<int>,
  totalKicks:<int>,
  totalJoins:<int>
}

vocabulary: [DONE]
{
	_id:,
  chatName:<string>,
  word:<string>,
  occurrences:<int>
}

messages: [DONE]
{ 
  _id:,
  chatName:<string>,
  senderName: <string>,
  date: <DateTime>,
  totalWords:<int>,
  totalCharacters:<int>,
  sentiment:<float>,
  content: <string>,
  photos: [
            {
              uri:<string>,
            	creation_timestamp:<DateTime>
            }
          ],
  gifs: [
          {
             uri:<string>,
             creation_timestamp:<DateTime>,
             thumbnail:{
               uri:<string>
             },
          }
        ],
  videos: [
            {
              uri:<string>
            }
          ],

  share: {
        link: <string>
      },
  reactions:[
  	{
      reaction: <string>,
      actor: <string>
    },
  ],
  type: <string> Generic || Share || Unsubscribed || Subscribe || Call,
  users:(usersRemoved) [
        {
          name: <string>
        }
      ],
  isUnsent: <bool>,
},
```
# Backend Endpoints

GET /chats/{chatID}              
list of all chats and meta data for each chat



GET /chats/{chatID}/messages            
fetch all messages for this chat between date
fetch messages grouped by date, user, message type between date
fetch messages grouped by date, user, message type between date filtered by regex
fetch message count grouped by date, user, message type between date
fetch message count grouped by date, user, message type between date filtered by regex
params:
chatID: str
groupby: null, users, messagetype, {day, week, month, year}
startdate: null, str
enddate: null, str
messagecount: null, true, false
regex: null, str



GET /chats/{chatID}/messages/{msgID}
fetch meta data for this message
params:
chatID: str
msgID: str




GET /chats/{chatID}/vocab/words
fetch top n unique words and count used in chat
fetch total word count between sepcific date
fetch word count grouped by date between sepcific date
fetch word count grouped by user between date
fetch word count grouped by user, date between date
params:
chatID: str
mostused: null, int (top n words, disables all other querystring params )
groupby: null, users, {day, week, month, year}
startdate: null, str
enddate: null, str




GET /chats/{chatID}/vocab/chars
fetch total char count between sepcific date
fetch char count grouped by user between date
fetch char count grouped by user, date between date
params:
chatID: str
groupby: null, users, {day, week, month, year}
startdate: null, str
enddate: null, str




GET /chats/{chatID}/vocab/sentiment
fetch avg sentiment grouped by date between date
fetch avg setiment grouped by date, user between date
fetch number of pos/neu/neg messages grouped by date between date
fetch number of pos/neu/neg messages grouped by date, user between date
params:
chatID: str
groupby: null, users, {day, week, month, year}
startdate: null, str
enddate: null, str
messagecount: null, true, false




GET /chats/{chatID}/reactions
fetch total reacts grouped by emoji between date
fetch total reacts grouped by user between date
fetch total reacts grouped by emoji and user between date
fetch total reacts grouped by emoji and user between date (filter on one emoji)
params:
chatID: str
groupby: null, users, emoji, {day, week, month, year}
startdate: null, str
enddate: null, str




GET /chats/{chatID}/kicks
fetch total people kicked grouped by date between date 
fetch kicks received grouped by user between date
fetch kicks given grouped by user between date
params:
chatID: str
groupby: null, users, emoji, {day, week, month, year}
startdate: null, str
enddate: null, str

