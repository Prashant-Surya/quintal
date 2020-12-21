import json

from django.http import JsonResponse
from random import shuffle

from choco.sentinent import *
from .utils import process_entities


def health_check(request):
    return JsonResponse({
        'status': 'success'
    })


# Create your views here.
def generate_quiz(request):
    request_data = json.loads(request.body.decode('utf-8'))
    search_word = request_data.get('search_word')
    wiki = WikipediaRetriever()
    content = wiki.fetch_data(search_word)
    spacy = SpacyNER()
    entities = spacy.get_data(content)
    entities = process_entities(entities)
    print("Entities considered", entities)

    entity_names = list(entities.keys())

    sentences = content.split(".")

    shuffle(sentences)
    shuffle(entity_names)

    quiz_data = []

    for sentence in sentences:
        tokens = sentence.split()
        added = False
        if len(quiz_data) >= 10:
            break
        for index, token in enumerate(tokens):
            if added:
                break
            for entity in entities:
                if token in entities[entity]:
                    tokens[index] = "_____________"
                    options = list(entities[entity])[:4]
                    if token not in options:
                        options[0] = token
                    shuffle(options)
                    quiz_data.append({
                        'question': ' '.join(tokens),
                        'options': options,
                        'answer': token
                    })
                    added = True
                    break

    return JsonResponse({
        'data': quiz_data,
    })
