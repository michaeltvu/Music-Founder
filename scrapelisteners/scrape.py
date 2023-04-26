import requests
from bs4 import BeautifulSoup
from pprint import pprint
import json

url = 'https://open.spotify.com/artist/5L15t6I0PQS9SBXbiklPEN'

data = requests.get(url)

my_data = {}

html = BeautifulSoup(data.content.decode('utf-8'), 'html.parser')
artists = html.select('.ovtJYocZljdWcU1FLBL5')

# print(type(html))
# print(html)
print(artists[0].get_text())

# def cleanName(name):
#     return(name.replace("/", ""))

# my_data = {}
# for i in range(0, len(artists), 4):
#     my_data[cleanName(artists[i+1].get_text())] = [int(artists[i+2].get_text().replace(',', '')), int(artists[i+3].get_text().replace(',', ''))]