from pymongo import MongoClient

class Db:
    def get_database(self, db_data):
        client = MongoClient(f"mongodb+srv://{db_data('USERNAME')}:{db_data('PASSWORD')}@{db_data('CLUSTER')}.ck7kb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        return client[db_data('DATABASE')]