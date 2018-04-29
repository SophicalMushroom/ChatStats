import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
import numpy as np

#----initiate plots----
fig = plt.figure(facecolor='#07000d')
fig.canvas.set_window_title('Message Distribution by week')
ax1 = fig.add_subplot(1, 1, 1, facecolor='#07000d')
plt.rcParams['savefig.facecolor'] = '#07000d'


#------metadata to messages per day-----
def meta2messagePerDay():
    '''convert parsed data (metadata.csv) to messages per day per user and
    save it as messagesPerDay.csv'''
    meta2message = pd.read_csv(
        'metadata.csv', parse_dates=['date'], index_col='date')
    meta2message = meta2message.groupby('date').users.value_counts()
    meta2message.to_csv('messagesPerDay.csv')


#-----resample messages per day to per week-----
def messagesDay2Week():
    '''Resample messages per day per user (messagesPerDay.csv) to messages
    per week per user and save it as messagesPerWeek.csv'''
    resampledMessages = pd.read_csv(
        'messagesPerDay.csv', parse_dates=['date'], index_col='date', names=[
            "date", "users", "numMessages"])
    resampledMessages = resampledMessages.groupby('users').numMessages.resample(
        'W').sum()
    resampledMessages.to_csv('messagesPerWeek.csv')


meta2messagePerDay()
messagesDay2Week()

#------Stacked Bar Plot-------
# matplotlib.style.use('ggplot')
# read messagesPerWeek.csv
df = pd.read_csv('messagesPerWeek.csv', names=["users", "date", "numMessages"])


def findTopUsers(dictTopUsers, dataframe):
    '''(dict, DataFrame) -> DataFrame
    use findTop() in totalMessages.py to get dictTopUsers
    '''
    dfnew = pd.DataFrame(columns=['users', 'date', 'numMessages'])
    row = 0
    for i in range(len(dataframe['users'])):
        if dataframe['users'][i] in dictTopUsers:
            dfnew.loc[row] = [dataframe['users'][i], dataframe['date']
                              [i], dataframe['numMessages'][i]]
            row += 1
    return dfnew


df = findTopUsers({'Jaden Wang': 3824, 'Paolo Velarde': 3109, 'Brian Lin': 1980, 'Rikin Katyal': 1963, 'Dinoyan Ganeshalingam': 1688, 'Bryan Oladeji': 1449, 'Pearl Kong': 1389,
                   'Moe Ali': 1322, 'Chedy Sankar': 1238, 'Kevin Shen': 1176, 'Pravinthan Prabagaran': 1009, 'Daniel Wang': 969, 'Rahul Kumar Saini': 939, 'Vincent La': 910, 'Jayesh Khullar': 774}, df)


# add more depending on number of chat memebers
colors = ["#006D2C", "#31A354", "#ff0000", "#ffff66", "#74C476", "#0066ff",
          "#6600cc", "#ff00ff", "#ff9999", "#660033", '#e542f4', '#f4ac41', '#41ebf4',
          '#7cf441', '#f4cd41']


#------graph customization-------
plt.ylabel('Messages', color='#ABAA98')
ax1.tick_params(axis='y', colors='#ABAA98')
ax1.tick_params(axis='x', colors='#ABAA98')
ax1.spines['bottom'].set_color('#5998ff')
ax1.spines['left'].set_color('#5998ff')
ax1.spines['right'].set_color('#5998ff')
ax1.spines['top'].set_color('#5998ff')
ax1.grid(True, color='#ABAA98', alpha=0.3, linewidth=0.4)


pivot_df = df.pivot(index='date', columns='users', values='numMessages')
pivot_df.plot.bar(stacked=True, color=colors,
                  figsize=(10, 7), ax=ax1, grid=True, alpha=0.7, linewidth=0.8, edgecolor='#5998ff', rot=-45)


title_obj = plt.title('Message Distribution by week, top 15 users')
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ABAA98')
plt.show()
