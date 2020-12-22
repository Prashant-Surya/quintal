from .api_client import APIClient


class WikipediaRetriever(object):
    URL = "/microservices/utility/wikipedia/v0.1/getresults"

    def __init__(self):
        self.client = APIClient()

    def fetch_data(self, article):
        payload = {'title': article}  # 'pageid': True, 'language': False, 'filter_key': False}
        response = self.client.get_data(self.URL, payload)
        try:
            return response['results']['summary']
        except Exception as e:
            return ""

