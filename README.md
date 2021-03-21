# Introduction 
Get statistics on your facebook group chats.
<p align="center">
<img src="https://github.com/PhilosophicalMushroom/ChatStats/blob/CLIApp/sceenshots/messageDistribution.png" width="800" height="418">
</p>

# Dependencies 
- Node.js 14.15.4
- React 16
- Python 3.8

# Setup
### Install frontend dependencies 
```
$ cd ChatStats\frontend
$ npm install
```

### Running the frontend locally
```
$ cd ChatStats\frontend
$ npm start
```

### Install backend dependencies 
```
$ cd ChatStats\backend
$ python -m venv venv
$ venv\Scripts\activate
$ pip install -r requirements.txt
```

### Running the backend locally
```
$ cd ChatStats\backend
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
  timestamp: <DateTime>,
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
  type: <string> Generic || Shared || Unsubscribed || Subscribe,
  users:(usersRemoved) [
        {
          name: <string>
        }
      ],
  isUnsent: <bool>,
},
```
