from Robots import Robots


class Season:
    def __init__(self, url):
        self.url = url
    
    def getRobots(self, year):
        R = Robots(year)
        pass