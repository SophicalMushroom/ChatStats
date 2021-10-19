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
### Facebook Export Schema
```
{ 
  _id:,
  chatName:<string>,
  sender_name: <string>,
  timestamp_ms: <int>,
  is_unsent: <bool>,
  content: <string>,
  type: <string> Generic || Share || Unsubscribed || Subscribe || Call,
  users: [ // users that have been removed
           {
             name: <string>
           }
         ],
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
},
```

### MongoDB Schema
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
  type: <string> Generic || Link || Video || Photo || Gif || Unsubscribed || Subscribe || Call,
  users:(usersRemoved) [
        {
          name: <string>
        }
      ],
  isUnsent: <bool>,
},
```

