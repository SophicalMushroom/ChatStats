import matplotlib.pyplot as plt
'''
Plot extra stats on an empty graph
The extra stats can be obtained from the other .py files
'''


fig = plt.figure(facecolor='#07000d')
fig.canvas.set_window_title('Word Count')
ax1 = fig.add_subplot(1, 1, 1, facecolor='#07000d')
ax1.axis("equal")
plt.rcParams['savefig.facecolor'] = '#07000d'
plt.rcParams['text.color'] = '#ABAA98'
plt.rcParams['font.size'] = 20


w = 'Messages      14163 \n \nMessages per day      90.21 \n \nCharacters      450004 \n \nWords      73031 \n \nUnique words      18698 \n \nWords per day      608.591667 \n \nAvg words per message      5.15'
x = [1, 2, 3, 4, 5]
y = [1, 2, 5, 2, 1]
ax1.plot(x, y, alpha=0.0)
ax1.text(1.5, 3, w)
plt.show()
