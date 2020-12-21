from django.conf import settings

import http.client
import json


class APIClient(object):

    @staticmethod
    def _get_headers():
        return {
            'content-type': "application/json",
            'x-api-key': settings.SENTINENT_API_KEY
        }

    def get_data(self, url, request):
        connection = http.client.HTTPSConnection("apis.sentient.io")
        request = json.dumps(request)
        print("Making call to sentinent", url, request)
        connection.request("POST", url, request, APIClient._get_headers())
        response = connection.getresponse()
        data = response.read()
        data = data.decode("utf-8")
        print("Raw response received", data)
        return json.loads(data)
