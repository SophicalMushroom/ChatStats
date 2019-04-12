import matplotlib.pyplot as plt
'''
Plot extra stats on an empty graph
The extra stats can be obtained from the other .py files
'''


fig = plt.figure(facecolor='#07000d')
fig.canvas.set_window_title('Extra stats')
ax1 = fig.add_subplot(1, 1, 1, facecolor='#07000d')
ax1.axis("equal")
plt.rcParams['savefig.facecolor'] = '#07000d'
plt.rcParams['text.color'] = '#ABAA98'
plt.rcParams['font.size'] = 20

totalMessages = 28818
totalDays = 181
totalChars = 894804
totalWords = 140175
uniqueWords = 33813
# for total messages look at line count in metadat.csv
w = 'Total Messages      {} \n \nMessages per day      {} \n \nTotal Characters      {} \n \nTotal Words      {} \n \nUnique words      {} \n \nWords per day      {} \n \nAvg words per message      {}'.format(
    totalMessages, totalMessages / totalDays, totalChars, totalWords, uniqueWords, totalWords / totalDays, totalWords / totalMessages)
x = [1, 2, 3, 4, 5]
y = [1, 2, 5, 2, 1]
ax1.plot(x, y, alpha=0.0)
ax1.text(1.5, 3, w)
plt.show()
