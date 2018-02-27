import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
import numpy as np

#----initiate plots----
fig = plt.figure(facecolor='#07000d')
fig.canvas.set_window_title('Message Distribution by user')
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

# add more depending on number of chat memebers
colors = ["#006D2C", "#31A354", "#ff0000", "#ffff66", "#74C476", "#0066ff",
          "#6600cc", "#ff00ff", "#ff9999", "#660033"]


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

plt.show()
