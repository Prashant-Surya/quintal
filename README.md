### Quintal:

#### Overview:

- Currently there's a lot of content available in the form of text, images, video and other media forms. A majority of this data is being un-used as this requires a lot of pre-processing and effort to utilize.

- As part of the quiz application we want to use the already available content to gamify the learning experience for users.

#### How does it work:
- For understanding Sentinent.io platform, we've explored NLP based services to process text content. And we'll other services when shortlisted to the prototype phase.

- When a document is provided or a url of the text based content is provided to our application, we'll analyse the content and generate a quiz completely using the provided data.

- This quiz can enhance the learning by engaging users and also collect more data about what kind of topics people are interested to learn about.

- This new data available from quiz can be fed into the system for personalized quiz sessions with minimal human intervention.

- In addition to this, we're planning to integrated Voice based services for playing the questions and options as voice for making it more gamified. 
- For NLP use cases we've used sentient.io platform.


#### Sentient.io Services to be used:

##### NLP Services:

- SpaCy NER based NLP service will be used to identify the primary entities the document is about so a quiz can be generated.

#### Utility Services:

- Wikipedia Retrieval - We’ve used this service to fetch existing content based on the search word.

#### Voice Services:
- Text-To-Speech ENG will be used to play the host for announcing questions and options.
- Automatic Speech Recognition ENG (SG) will be used for capturing user input for the quiz. This is still not integrated into the platform
