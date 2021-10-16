import sys
from datetime import datetime
from utils.scrape.Season import Season
from utils.scrape.Db import Db

BASE_URL = "//battlebots.com/"

before_year = int(sys.argv[1]) if len(
    sys.argv) > 1 else int(datetime.now().strftime("%Y"))
after_year = 2015 # TODO: change after initial scrape is completed so only future seasons/matches are added in as they air

if __name__ == "__main__":
    current_year = after_year

    while current_year <= before_year:
        if current_year != 2017:
            url = '{root}{season}-robots'.format(
                root=BASE_URL,
                season=f'{current_year}-season' if current_year > 2016 else f'season-{current_year - (after_year - 1)}'
            )
            
        S = Season(url)
        S.getRobots(current_year)
    
        current_year += 1
