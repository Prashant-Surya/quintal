
def process_entities(entities):
    updated = {}
    for entity in entities:
        if len(entities[entity]) > 4:
            updated[entity] = set(entities[entity])
    return updated