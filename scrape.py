from bs4 import BeautifulSoup
import urllib.request
import csv

row = ['url', 'robot', 'builder', 'type', 'job', 'team', 'hometown', 'sponsors',
       'career_stats', '2019_stats', '2018_stats', '2017_stats', '2016_stats', '2015_stats', 'match_history']
year = 2019
links = []
baseUrl = 'https://battlebots.com/robots/'
outputfile = 'output/robot-data.csv'

with open(outputfile, 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(row)

while year > 2014:
    url = baseUrl + str(year) + '-season-robots/'
    body = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(body, 'html.parser')
    results = soup.find_all(class_='gallery')
    for result in results:
        try:
            botLink = result['href']
            linkRow = {'year': str(year), 'link': botLink}
            links.append(linkRow)
        except:
            print('Could not get href from ' + str(result))
    print(links)
    year = year - 1

for link in links:
    pass
