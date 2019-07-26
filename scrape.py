from bs4 import BeautifulSoup
import urllib.request
import csv
import re

row = ['url', 'robot', 'builder', 'type', 'job', 'team', 'hometown', 'sponsors',
       'statHistory', 'matchHistory']
year = 2019
links = [{'year': '2019', 'link': 'https://battlebots.com/robot/whiplash-2019/'},
         {'year': '2019', 'link': 'https://battlebots.com/robot/25345/'},
         {'year': '2019', 'link': 'https://battlebots.com/robot/yeti-2019/'}]
baseUrl = 'https://battlebots.com/robots/'
outputfile = 'output/robot-data.csv'

with open(outputfile, 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(row)

""" while year > 2014:
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
    year = year - 1 """

for link in links:
    url = link['link']
    try:
        body = urllib.request.urlopen(url).read()
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
