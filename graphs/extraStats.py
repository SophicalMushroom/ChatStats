import sys
sys.path.insert(0, 'C:/Users/ditta/OneDrive/Python Projects/ChatStats')
from utils.extraQueries import *
import matplotlib.pyplot as plt
'''
Plot extra stats on an empty graph
The extra stats can be obtained from the other .py files
'''
# replace #FFFFFF with #ABAA98

fig = plt.figure(facecolor='#07000d')
fig.canvas.set_window_title('Extra stats')
ax1 = fig.add_subplot(1, 1, 1, facecolor='#07000d')
ax1.axis("equal")
plt.rcParams['savefig.facecolor'] = '#07000d'
plt.rcParams['text.color'] = '#FFFFFF'
plt.rcParams['font.size'] = 20

w = """

Total Messages              {}
\n\nMessages per day        {}
\n\nTotal Characters        {}
\n\nTotal Words             {}
\n\nUnique words            {}
\n\nWords per day           {}
\n\nAvg words per message   {}
""".format(totalMessages(), totalMessages() / totalDaysActive(), totalCharacters(),
           totalWords(), numUniqueWords(), totalWords() / totalDaysActive(),
           totalWords() / totalMessages())

x = [1, 2, 3, 4, 5]
y = [1, 2, 5, 2, 1]
ax1.plot(x, y, alpha=0.0)
ax1.text(1.5, 3, w)
plt.show()
