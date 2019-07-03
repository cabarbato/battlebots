from selenium import webdriver
import time
import csv

row = ['url', 'robot', 'builder', 'type', 'job', 'team', 'hometown', 'sponsors',
       'career_stats', '2019_stats', '2018_stats', '2017_stats', '2016_stats', '2015_stats', 'match_history']
year = 2019
driver = webdriver.Chrome()
baseUrl = 'https://battlebots.com/robots/'
outputfile = 'output/robot-data.csv'

with open(outputfile, 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(row)

while year > 2014:
    url = baseUrl + str(year) + '-season-robots/'
    driver.get(url)
    time.sleep(5)
    results = driver.find_elements_by_class_name('love-it')
    for result in results:
        result.click()
        sections = driver.find_elements_by_class_name('info-grid--item')
        print(sections)
        time.sleep(5)
        """ with open(outputfile, 'a') as csv_file:
            writer = csv.writer(csv_file)
            writer.writerow([title, artist, str(rank)]) """
        driver.back()
    year = year - 1
driver.quit()
