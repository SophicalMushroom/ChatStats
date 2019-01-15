# February ‎26, ‎2018
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
import numpy as np

#----initiate plots----
fig = plt.figure(facecolor='#07000d')
fig.canvas.set_window_title('Message Distribution by week')
ax1 = fig.add_subplot(1, 1, 1, facecolor='#07000d')
plt.rcParams['savefig.facecolor'] = '#07000d'


#------Stacked Bar Plot-------
# matplotlib.style.use('ggplot')
# read messagesPerWeek.csv
df = pd.read_csv('messagesPerWeek.csv', names=["users", "date", "numMessages"])


#------graph customization-------
plt.ylabel('Messages', color='#ABAA98')
ax1.tick_params(axis='y', colors='#ABAA98')
ax1.tick_params(axis='x', colors='#ABAA98')
ax1.spines['bottom'].set_color('#5998ff')
ax1.spines['left'].set_color('#5998ff')
ax1.spines['right'].set_color('#5998ff')
ax1.spines['top'].set_color('#5998ff')
ax1.grid(True, color='#ABAA98', alpha=0.3, linewidth=0.4)
colors = ["#006D2C", "#ff0000", "#ffff66", "#0066ff", '#41ebf4', "#74C476", "#31A354",
          "#6600cc", '#e542f4', "#ff00ff", "#ff9999", "#660033", '#f4ac41',
          '#7cf441', '#f4cd41']

allUsers = df.users.unique()
allUsers = ['Parth Parpyani', 'Michael Cottow',
            'Tony Attalla', 'Alex Greff', 'Chedy Sankar']
idx = 0
for i in allUsers:
    tempDF = df.loc[df['users'] == i]
    plt.plot(tempDF['date'], tempDF['numMessages'], marker='o', markerfacecolor=colors[idx],
             markersize=6, color=colors[idx], linewidth=2, label=i)
    idx += 1

title_obj = plt.title('Message Distribution by week, coop plebs')
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ABAA98')
plt.legend()
plt.show()
