from .api_client import APIClient


class SpacyNER(object):
    URL = "/microservices/nlp/spacyner/v1/getpredictions"
    TEXT_LIMIT = 5000

    def __init__(self):
        self.client = APIClient()

    def get_data(self, content):
        payload = {
            "text": content[:SpacyNER.TEXT_LIMIT]
        }
        response = self.client.get_data(self.URL, payload)
        return response['results']