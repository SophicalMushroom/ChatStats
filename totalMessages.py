import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from textwrap import wrap

# initialize plots
fig = plt.figure(facecolor='#07000d')
fig.canvas.set_window_title('Total Messages by User')
ax1 = fig.add_subplot(1, 1, 1, facecolor='#07000d')
plt.rcParams['savefig.facecolor'] = '#07000d'

# read data from parsed csv file
metaData = pd.read_csv('metadata.csv')

# generate users and message_count lists
message_count = metaData['users'].value_counts().tolist()
users = metaData['users'].value_counts().index.tolist()


def findTop(num):
    message_countc = message_count[:]
    usersc = users[:]
    out = {}
    for i in range(num):
        idx = message_countc.index(max(message_countc))
        out[usersc[idx]] = message_countc[idx]
        del usersc[idx]
        del message_countc[idx]
    return out

# find user and message count
# print(users.index('Dittam Dey'))
# print(message_count[40])

# generate indexes starting at 0 to len(users)
users_indexes = list(range(len(users)))

# wrap user names to fit graph
users = ['\n'.join(wrap(l, 8)) for l in users]
plt.xticks(users_indexes, users, rotation=-45)

# set font size for x-axis lables
for tick in ax1.xaxis.get_major_ticks():
    tick.label.set_fontsize(10)

# render y value text above each bars
for a, b in zip(users_indexes, message_count):
    plt.text(a - 0.1, b + 50, str(b), color='#ABAA98')

# -----graph customization-----
plt.ylabel('Messages', color='#ABAA98')
ax1.tick_params(axis='y', colors='#ABAA98')
ax1.tick_params(axis='x', colors='#ABAA98')
ax1.spines['bottom'].set_color('#5998ff')
ax1.spines['left'].set_color('#5998ff')
ax1.spines['right'].set_color('#5998ff')
ax1.spines['top'].set_color('#5998ff')
ax1.grid(True, color='#ABAA98', alpha=0.2, linewidth=0.4)

# plot data
ax1.bar(users_indexes, message_count,
        width=0.4, linewidth=1.8, edgecolor='#5998ff', alpha=0.6, color='#66b5ff')

title_obj = plt.title('Total Messages by User')
plt.getp(title_obj)  # print out the properties of title
plt.getp(title_obj, 'text')  # print out the 'text' property for title
plt.setp(title_obj, color='#ABAA98')
plt.show()
