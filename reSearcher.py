# February ‎26, ‎2018
import pandas as pd
import numpy as np
import re

metaData = pd.read_csv('metadata.csv')

countdict = dict()
totalcount = 0

for row in range(len(metaData)):
    reSearch = re.search(
        "\\b[rR][eE]{2,}\\b", str(metaData.loc[row, "messages"]))
    if reSearch:
        try:
            countdict[str(metaData.loc[row, "users"])] += 1
        except KeyError:
            countdict[str(metaData.loc[row, "users"])] = 1
        totalcount += 1


countdict = sorted(countdict.items(), key=lambda kv: kv[1])
print("REEEEE count:")
for i in countdict[::-1]:
    print("{}: {}".format(i[0], i[1]))
print("Total re-Count: ", totalcount)


charPerUser = {'Sofia Ilina': 53537, 'Dittam Dey': 62854, 'Alex Andros': 62941, 'Chedy Sankar': 167544, 'Tanner Bergeron': 94435, 'Anton Kaminsky': 192169, 'Alex Greff': 54449, 'Tony Attalla': 103981, 'Ethan Dain': 468, 'Michael Cottow': 3009, 'Eric Kalantyrski': 992, 'Case Ploeg': 7443,
               'Kelson Xie': 2174, 'Spencer McMurray': 9384, 'Alexander Ursu': 50518, 'Robin Boehlen': 2076, 'Michael Rossinski': 10244, 'Jonny  Gao': 6112, 'PyBot Alpha': 1166, 'Rostyslav Kulnevsky': 5256, 'Gilbert Chui': 124, 'Sean Heselden': 80, 'Shayan Khosrov': 3822, 'Dean Husar': 26}

charPerUser = sorted(charPerUser.items(), key=lambda kv: kv[1])

print("\n\nCharacter count:")
for i in charPerUser[::-1]:
    print("{}: {}".format(i[0], i[1]))
