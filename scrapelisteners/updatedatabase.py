import requests
from bs4 import BeautifulSoup
from pprint import pprint
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import datetime
import time
from random import randrange
import asyncio

# Artist Dictionary and Current Date
artistdata = {}
date = datetime.datetime.now().strftime("%m-%d-%y")

# Getting HTML from Website
url = 'https://kworb.net/spotify/listeners.html'
data = requests.get(url)
html = BeautifulSoup(data.content.decode('utf-8'), 'html.parser')
artisthtml = html.select('table.sortable tbody tr td')

# Function to clean an artist's name since '/' can't be used
# def cleanName(name):
#     return(name.replace("/", "").replace("$", "").replace("#", "").replace("[]", "").replace("]", "").replace(".", ""))

def cleanName(name):
    return(name.replace("/", ""))

def randomInt(i):
    x = randrange(-i, i)
    if(x != 0):
        return x
    else:
        return randomInt(i)

# Adding artists, listeners, and daily change to artist dictionary
for i in range(0, len(artisthtml), 4):
    artistdata[cleanName(artisthtml[i+1].get_text())] = [int(artisthtml[i+2].get_text().replace(',', '')), int(artisthtml[i+3].get_text().replace(',', ''))]

# Firebase Initialization
cred = credentials.Certificate('serviceAccountKey.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

# allartistsstream = db.collection('artist-data').stream()
# allartist = []
# for doc in allartistsstream:
#     allartist.append(doc.id)

# TODO: NEED TO CHECK IF DOCUMENT DOESN'T EXISTS
# Update Firestore Database with new listeners
for artist in artistdata:
    artist_doc = db.collection('artist-data').document(artist)
    artist_doc.set({
        "daily": artistdata[artist],
        "monthly": [artistdata[artist][0], artistdata[artist][1]*randomInt(5)],
        "yearly": [artistdata[artist][0], artistdata[artist][1]*randomInt(10)]
    })
    # if artist in allartist:
    #     artist_doc.update({
    #         ('listeners.' + date): artistdata[artist]
    #     })
    #     print('Updated: ' + str(i) + ' ' + artist)
    # else:
    #     artist_doc.set({
    #         "listeners": {
    #             date: artistdata[artist]
    #         }
    #     })
    #     print('Created: ' + str(i) + ' ' + artist)
    # time.sleep(0.5) 

# test = {}

# for artist in artistdata:
#     test[artist] = {"daily": {date: artistdata[artist]}, "": {}}

# artist_doc = db.collection('artist-data').document('test')
# artist_doc.set(test)

# from sys import getsizeof
# print(1/(getsizeof(test)/(10**9)))

# print(test)

# from firebase_admin import db

# cred = credentials.Certificate('serviceAccountKey.json')
# app = firebase_admin.initialize_app(cred, {
# 	'databaseURL': 'https://musistock-3635a-default-rtdb.firebaseio.com/'
# 	})

# ref = db.reference("/artistdata/")
# ref.set(test)