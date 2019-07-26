from bs4 import BeautifulSoup
import urllib.request
import random
import time
import ssl
import csv
import re

row = ['url', 'robot', 'builder', 'type', 'job', 'team', 'hometown', 'sponsors',
       'statHistory', 'matchHistory']
yearUrls = ['https://battlebots.com/season-1-robots/', 'https://battlebots.com/season-2-robots/',
            'https://battlebots.com/2018-season-robots/', 'https://battlebots.com/2019-season-robots/']
links = []
sslcontext = ssl.SSLContext()
outputfile = 'output/robot-data.csv'

with open(outputfile, 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(row)

i = 0

while i < len(yearUrls):
    linkYear = []
    url = yearUrls[i]
    try:
        body = urllib.request.urlopen(url, context=sslcontext).read()
        soup = BeautifulSoup(body, 'html.parser')
        time.sleep(random.randint(3, 7))
        results = soup.find_all(class_='grid-1-2')
        if results == []:
            results = soup.find_all(class_='more-button')
        for result in results:
            try:
                botLink = result.find("a")['href']
                linkYear.append(botLink)
            except:
                print('Could not get href from ' + str(result))
    except Exception as error:
        print(error)
    links.extend(linkYear)
    i += 1

for url in links:
    try:
        body = urllib.request.urlopen(url, context=sslcontext).read()
        soup = BeautifulSoup(body, 'html.parser')
        try:
            robotNameTag = soup.find("p", text='Robot:')
            robotNameParent = robotNameTag.find_parent('div')
            robotName = robotNameParent.find("h3").text
        except:
            robotName = 'N/A'
        try:
            robotTypeTag = soup.find("p", text='Type:')
            robotTypeParent = robotTypeTag.find_parent('div')
            robotType = robotTypeParent.find("h3").text
        except:
            robotType = 'N/A'
        try:
            builderTag = soup.find("p", text='Builder:')
            builderParent = builderTag.find_parent('div')
            builder = builderParent.find("h3").text
        except:
            builder = 'N/A'
        try:
            jobTag = soup.find("p", text='Job:')
            jobParent = jobTag.find_parent('div')
            job = jobParent.find("h3").text
        except:
            job = 'N/A'
        try:
            teamTag = soup.find("p", text='Team:')
            teamParent = teamTag.find_parent('div')
            team = teamParent.find("h3").text
        except:
            team = 'N/A'
        try:
            sponsorsTag = soup.find(text='Sponsors:')
            sponsorsParent = sponsorsTag.find_parent('div')
            sponsorsList = sponsorsParent.find_all("a")
            sponsors = []
            for sponsor in sponsorsList:
                sponsors.append(sponsor.text)
        except:
            sponsors = 'N/A'
        try:
            locationTag = soup.find("p", text='Hometown:')
            locationParent = locationTag.find_parent('div')
            location = locationParent.find("h3").text
        except:
            location = 'N/A'

        statHistory = {}
        try:
            statTable = soup.find("div", text='Stats').find_parent('table')
            statHeader = statTable.find("thead").find("tr").findAll("th")
            statHeadLen = len(statHeader)
            i = 1
            while i < statHeadLen:
                statType = statHeader[i].text
                statRows = statTable.find("tbody").findAll("tr")
                stats = {}
                try:
                    for row in statRows:
                        statKey = row.select('td')[0].get_text(strip=True)
                        statValue = row.select('td')[i].get_text(strip=True)
                        stats.update([(statKey, statValue)])
                    statHistory.update([(statType, stats)])
                except:
                    statHistory.update([(statType, 0)])
                i += 1
        except:
            statHistory = {"career": 0}
            print("Error getting Stat History")

        matchHistory = []
        try:
            matchTable = soup.find("div", text='Season').find_parent('table')
            matchRows = matchTable.find("tbody").findAll("tr")
            matchRowLen = len(matchRows)
            i = 0
            while i < matchRowLen:
                row = matchRows[i]
                matches = {}
                matchHeader = matchTable.find("thead").find("tr")
                matchHeadLen = len(matchHeader)
                l = 0
                try:
                    while l < matchHeadLen:
                        matchKey = matchHeader.select(
                            'th')[l].get_text(strip=True)
                        matchValue = row.findAll('td')[l].get_text(strip=True)
                        matches.update([(matchKey, matchValue)])
                        l += 1
                    matchHistory.append(matches)
                except:
                    matchHistory.append(0)
                i += 1
        except:
            matchHistory = {"season": 0}
            print("Error getting Match History")
        row = [url, robotName, builder, robotType, job, team,
               location, sponsors, statHistory, matchHistory]
        with open(outputfile, 'a') as csv_file:
            writer = csv.writer(csv_file)
            writer.writerow(row)
    except urllib.error.URLError as err:
        print(err)
        print("Could not open " + str(url))
