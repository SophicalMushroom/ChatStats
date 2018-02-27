# ChatStats
Get statistics on your fackbook group chats.
<p align="center">
<img src="https://github.com/Dittam/ChatStats/blob/master/sceenshots/messageDistribution.png" width="800" height="418">
</p>


## File Info

|          File Name          |                                        Description                                       |
|:--------------------:|:------------------------------------------------------------------------------------:|
| parser.py           | Parses the raw data from FB archives to make it usable by the other scripts                                                                       |
| messageDistribution.py       | Displays a stacked bar graph showing number of messages per use per week                                               |
| totalMessages.py | Displays a bar graph that shows total messages sent by each user |
| wordCount.py           | DIsplays a pie chart that shows the top 10 used word in chat                                                                   |
| extraStats.py                | Displays any extra stats on an empty matplotlib graph                                                        |


## Steps:
Run parser.py first then run any of the other scripts

## Dependencies:
* Python 3+
* Pandas
* Matplotlib
* Numpy
