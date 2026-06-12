import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 02
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Viajes y transporte
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-02',
  examSlug: 'icfes',
  title: 'Mock 2 · Viajes y transporte',
  subtitle: 'Saber 11 · Componente de Inglés · 45 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [

    // ── PARTE 1 ── Avisos e instrucciones (preguntas 1–5) ────────────────────
    {
      part: 1,
      title: 'Parte 1 — Avisos e instrucciones',
      sectionStyle: 'notices-grid',
      exampleStimulus: 'WELCOME ABOARD\nPlease fasten your seatbelt.\nThank you for flying with us.',
      exampleText: 'Where would you see this notice?',
      exampleAnswer: 'A',
      instructions:
        'The following notices give information about different places. Read each notice carefully and answer questions 1 to 5.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'NO TRANSIT WITHOUT VISA\nPassengers travelling beyond this point\nmust present a valid visa.\nPlease have your documents ready.',
          text: 'What does this notice tell passengers?',
          options: [
            'They need to buy a ticket before continuing.',
            'They must show a visa to pass through this point.',
            'They should collect their luggage here.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'MIND THE GAP\nPlease take care when boarding\nand alighting from the train.\nStand clear of the doors.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At an airport departure gate',
            'On a train platform',
            'Inside a taxi or private car',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'CHECKOUT: 12:00 PM\nLate checkout is subject to an additional charge.\nPlease contact reception if you require more time.',
          text: 'What is the purpose of this notice?',
          options: [
            'To inform guests about the time they must leave their room',
            'To advertise a discount on room prices',
            'To remind guests to pay their bill at the restaurant',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PHOTOGRAPHY ALLOWED WITHOUT FLASH\nPlease respect other visitors.\nDo not touch the exhibits.',
          text: 'Which of these is permitted according to the notice?',
          options: [
            'Taking photos using a camera flash',
            'Touching the objects on display',
            'Taking photos without using a flash',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'ROAD CLOSED\nDETOUR AHEAD\nFollow the signs to the alternative route.\nWe apologise for any inconvenience.',
          text: 'What does this sign tell drivers?',
          options: [
            'The road is open but under repair',
            'Drivers must follow a different route because the road is blocked',
            'The speed limit on this road has been reduced',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 2 ── Vocabulario: cuadrícula de emparejamiento (preguntas 6–10) ─
    {
      part: 2,
      title: 'Parte 2 — Vocabulario',
      sectionStyle: 'matching-grid',
      topic: 'Transport',
      exampleText: 'A person who travels on a bus, train, or plane but does not drive it.',
      exampleAnswer: 'passenger',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'The moment when a plane, train, or bus reaches its destination.',
          options: ['arrival', 'departure', 'journey', 'luggage', 'platform', 'ticket', 'vehicle'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'The bags and suitcases that a traveller takes on a trip.',
          options: ['arrival', 'departure', 'journey', 'luggage', 'platform', 'ticket', 'vehicle'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'A raised area beside a railway track where passengers wait and board trains.',
          options: ['arrival', 'departure', 'journey', 'luggage', 'platform', 'ticket', 'vehicle'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'A piece of paper or card that gives you the right to travel on a bus, train, or plane.',
          options: ['arrival', 'departure', 'journey', 'luggage', 'platform', 'ticket', 'vehicle'],
          answer: 5,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'Any machine with an engine used for transporting people or goods on land.',
          options: ['arrival', 'departure', 'journey', 'luggage', 'platform', 'ticket', 'vehicle'],
          answer: 6,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'Is this the right bus to the city centre?',
      exampleOptions: ['Yes, get on board.', 'I take the train.', 'Buses are slow.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: 'My train leaves in ten minutes!',
          text: '',
          options: ['Hurry up then.', 'That is too late.', 'I missed mine.'],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: 'I lost my suitcase at the airport.',
          text: '',
          options: ['Try the bus instead.', 'What colour is it?', 'You should fly more.'],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'Do you know how to get to the city centre?',
          text: '',
          options: ['I live far away.', 'It is very crowded.', 'Yes, take bus number 5.'],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: 'The flight has been delayed by two hours.',
          text: '',
          options: ["Let's get a coffee then.", 'I prefer trains anyway.', 'I am not surprised.'],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: "I can't find my passport!",
          text: '',
          options: ['Passports are expensive.', 'Check your bag again.', 'You do not need one.'],
          answer: 1,
        },
      ],
    },

    // ── PARTE 4 ── Completar el texto (preguntas 16–23) ──────────────────────
    {
      part: 4,
      title: 'Parte 4 — Completar el texto',
      sectionStyle: 'cloze-text',
      instructions:
        'Read the text below. Choose the word (A, B, C, or D) that best fits each blank (questions 16 to 23).',
      passage:
        "Every Sunday, Bogotá holds one of its most (16) ___ community events: the Ciclovía. For several hours, the city closes over 120 (17) ___ of roads to motor vehicles. Thousands of (18) ___ and individuals take to the streets on bicycles, skateboards, and on foot. The event is completely (19) ___ to the public, meaning anyone can participate without paying. Participants use the opportunity to (20) ___, enjoy the fresh air, and connect with their neighbours. Along the route, it is possible to (21) ___ bicycles if you do not own one. The streets remain (22) ___ to cars until early afternoon, when the roads return to normal. The Ciclovía has become a symbol of the (23) ___, showing that Bogotá is much more than a busy metropolis.",
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['popular', 'ordinary', 'expensive', 'private'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['metres', 'kilometres', 'streets', 'blocks'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['tourists', 'drivers', 'families', 'workers'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['open', 'free', 'safe', 'easy'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['sleep', 'exercise', 'study', 'drive'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['buy', 'repair', 'rent', 'sell'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['open', 'closed', 'empty', 'narrow'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['country', 'city', 'region', 'neighbourhood'],
          answer: 1,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'Budget Travel Tips for Students',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        "BUDGET TRAVEL TIPS FOR STUDENTS\n\nTravelling on a limited budget is challenging, but many students do it successfully every year. With a little planning, it is possible to visit new places without spending a lot of money.\n\nThe first step is to book transport and accommodation as early as possible. Prices for flights and buses are often much cheaper if you buy tickets weeks or even months in advance. Travelling during off-peak seasons, such as autumn or early spring, also helps reduce costs significantly.\n\nWhen it comes to accommodation, there are several affordable options. Youth hostels are one of the most popular choices because they offer shared dormitory rooms at low prices. Many hostels also organise social activities, making it easy to meet other travellers.\n\nEating cheaply while travelling is another important skill. Visiting local markets and cooking your own meals, where possible, can save a great deal of money compared to eating in restaurants every day. Street food is also a wonderful and inexpensive way to try the local cuisine.\n\nFinally, it is a good idea to research free or low-cost attractions before you arrive. Many museums and galleries offer free entry on certain days of the week. Walking tours, parks, and public beaches are also excellent ways to explore a city without spending anything.\n\nWith the right attitude and some careful preparation, travelling as a student can be one of the most rewarding experiences of your life.",
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main purpose of this text?',
          options: [
            'To warn students about the dangers of travelling alone',
            'To give advice on how students can travel without spending much money',
            'To advertise cheap flights and hotels for young people',
            'To describe the best destinations for student travel in the world',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'According to the text, when is it cheapest to buy transport tickets?',
          options: [
            'On the day of travel',
            'One week before departure',
            'Several weeks or months in advance',
            'During the summer holiday season',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'Why are youth hostels recommended in the text?',
          options: [
            'They provide private rooms with luxury facilities.',
            'They are located only in city centres.',
            'They offer cheap shared rooms and social activities.',
            'They serve free meals to guests every morning.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'The phrase "off-peak seasons" in paragraph 2 most likely means:',
          options: [
            'times of the year when the weather is very warm',
            'periods that are less busy and often less expensive',
            'weeks when public transport does not operate',
            'holidays when all attractions are closed',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'What does the text suggest about eating cheaply while travelling?',
          options: [
            'Students should only eat at fast-food restaurants.',
            'Cooking your own food and eating street food can save money.',
            'It is impossible to eat well on a student budget.',
            'Restaurants in tourist areas always offer student discounts.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'Which of the following is mentioned as a free or low-cost activity?',
          options: [
            'Taking guided tours by car',
            'Visiting theme parks and water parks',
            'Walking tours and visiting public parks',
            'Attending concerts and live shows',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which statement BEST summarises the text?',
          options: [
            'Travelling is too expensive for most students and should be avoided.',
            'Students can travel affordably by planning ahead and making smart choices.',
            'The best student travel experiences are always in Europe.',
            'Students must choose between comfort and saving money when they travel.',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 6 ── Comprensión: texto largo (preguntas 31–35) ────────────────
    {
      part: 6,
      title: 'Parte 6 — Comprensión de lectura: texto largo',
      sectionStyle: 'reading',
      passageTitle: 'How Air Travel Changed the World',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        "HOW AIR TRAVEL CHANGED THE WORLD\n\nIn the early twentieth century, crossing the Atlantic Ocean by ship took about a week. Today, the same journey by aeroplane takes fewer than eight hours. This dramatic change in travel time is just one example of how air travel has transformed the way people live, work, and connect with each other.\n\nCommercial aviation began in the 1920s, though early flights were slow, uncomfortable, and available only to the very wealthy. The real revolution came after the Second World War, when new jet engine technology made it possible to carry more passengers at higher speeds. By the 1960s and 1970s, the introduction of wide-body aircraft — such as the Boeing 747 — made flying affordable for the middle classes for the first time.\n\nThe economic impact of air travel has been enormous. Tourism became a global industry, with millions of people each year visiting countries they could never have reached by land or sea. International trade also grew rapidly, as goods that could not survive long sea journeys — fresh food, electronic components, and medical supplies — could now be transported in hours.\n\nHowever, air travel also brings serious problems. Aircraft engines produce large amounts of carbon dioxide and other greenhouse gases, making aviation one of the most significant contributors to climate change. As concerns about the environment have grown, scientists and engineers have been working to develop cleaner and more fuel-efficient aircraft. Several airlines are already testing planes powered partly by sustainable fuels.\n\nDespite these challenges, the demand for air travel continues to grow, particularly in Asia and Latin America, where a growing middle class is travelling internationally for the first time. How the industry manages this growth while reducing its environmental impact will be one of the great questions of the coming decades.",
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'According to paragraph 1, what does the comparison between a ship and a plane crossing the Atlantic show?',
          options: [
            'Ships are still more comfortable than aeroplanes for long journeys.',
            'Air travel has dramatically reduced the time needed for long journeys.',
            'The Atlantic Ocean is too dangerous for ships today.',
            'Few people travelled internationally before the invention of the aeroplane.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'What made air travel affordable for ordinary people for the first time?',
          options: [
            'The invention of the first aeroplane in the early 1900s',
            'Government programmes to subsidise airline tickets',
            'The introduction of wide-body aircraft in the 1960s and 1970s',
            'Increased competition between airlines after the Second World War',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'The text mentions "fresh food, electronic components, and medical supplies" as examples of:',
          options: [
            'products that are produced only in one country',
            'goods that benefit from fast air transport because they cannot survive long journeys',
            'items that are too heavy to transport by air',
            'products that are banned on commercial flights',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'What environmental problem caused by air travel is mentioned in the text?',
          options: [
            'Noise pollution around airports',
            'Water contamination from aircraft fuel',
            'Production of large amounts of greenhouse gases',
            'Destruction of forests to build new airports',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the final paragraph?',
          options: [
            'The number of people flying will decrease in Asia and Latin America.',
            'The aviation industry does not care about its environmental impact.',
            'The growth of air travel is slowing down globally.',
            'Balancing the growth of air travel with environmental concerns is a major future challenge.',
          ],
          answer: 3,
        },
      ],
    },

    // ── PARTE 7 ── Texto de opinión/argumento (preguntas 36–45) ──────────────
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      sectionStyle: 'reading',
      passageTitle: 'Is Tourism Always Good for a Country?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        "IS TOURISM ALWAYS GOOD FOR A COUNTRY?\n\nEvery year, hundreds of millions of people travel abroad for pleasure. Tourism is often described as one of the world's most important industries, generating trillions of dollars and supporting millions of jobs. But is tourism always beneficial for the countries that receive visitors? The answer, as with most complex questions, is not simple.\n\nThe economic arguments in favour of tourism are powerful. When tourists arrive in a country, they spend money on hotels, restaurants, tours, and souvenirs. This creates employment for local people and generates tax revenue for governments. In some countries — particularly small island nations and developing economies — tourism can represent the largest source of national income. Without it, many communities would struggle to survive financially.\n\nTourism also has cultural benefits. When visitors travel to a new country, they often become interested in its history, traditions, and local way of life. This interest can help preserve ancient sites, local crafts, and traditional festivals that might otherwise disappear. Moreover, interaction between people of different nationalities can promote mutual understanding and reduce prejudice.\n\nHowever, critics argue that mass tourism brings serious disadvantages. Popular destinations often suffer from overcrowding, which damages the natural environment and reduces the quality of life for local residents. The beautiful beaches of Cartagena, the historic streets of cities such as Florence, and the fragile ecosystems of the Galápagos Islands have all been affected by too many visitors.\n\nFurthermore, the economic benefits of tourism are not always shared equally. In many destinations, large international hotel chains take most of the profit, while local businesses and workers receive only a small share. This form of economic inequality is sometimes called 'tourism leakage.'\n\nFinally, tourism can threaten local culture rather than protect it. When a destination becomes too popular, authentic traditions are sometimes replaced by performances designed to entertain tourists. Local people may feel pressure to change their lifestyle or abandon their customs to meet visitors' expectations.\n\nThe challenge for governments and communities is to find a balance — to welcome visitors and benefit from their spending without sacrificing the environment, the culture, or the wellbeing of local people. Sustainable tourism, which aims to minimise negative impacts and maximise benefits, may offer the best path forward.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main purpose of this text?',
          options: [
            'To encourage more people to travel internationally',
            'To explain the history of tourism as an industry',
            'To present different views on whether tourism benefits countries',
            'To argue that all tourism should be stopped immediately',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, how does tourism help governments?',
          options: [
            'It allows governments to reduce spending on education.',
            'It generates tax revenue that governments can use.',
            'It forces governments to build better roads and airports.',
            'It gives governments control over local businesses.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'The word "preserve" in paragraph 3 most likely means:',
          options: [
            'to destroy or remove',
            'to study and document carefully',
            'to keep something from being lost or damaged',
            'to advertise and promote widely',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'Which of the following is given as an example of a place damaged by overcrowding?',
          options: [
            'The streets of Bogotá',
            'The beaches of Cartagena',
            'The rainforests of the Amazon',
            'The ruins of Machu Picchu',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: "What does 'tourism leakage' refer to in paragraph 5?",
          options: [
            'The problem of tourists leaving rubbish in natural areas',
            'The loss of tourists to competing destinations',
            'A situation where tourism money does not stay in the local economy',
            'Water and energy wasted by large hotels',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'According to paragraph 6, how can tourism threaten local culture?',
          options: [
            'Tourists bring foreign diseases that affect local communities.',
            'Local traditions may be replaced by performances aimed at entertaining visitors.',
            'Tourism causes young people to leave their home communities.',
            'International tourists do not respect local laws and customs.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'The phrase "mutual understanding" in paragraph 3 most likely means:',
          options: [
            'a financial agreement between two countries',
            'a feeling of respect and knowledge shared between different groups of people',
            'a law that protects the rights of tourists',
            'an organisation that promotes international travel',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'What does the author suggest is the key challenge for governments?',
          options: [
            'Increasing the number of tourists visiting each year',
            'Banning international hotel chains from operating in their country',
            'Finding a balance between the benefits and the negative effects of tourism',
            'Building more airports and hotels to welcome visitors',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: "What is the author's overall attitude towards tourism?",
          options: [
            'Entirely negative — tourism causes more harm than good',
            'Entirely positive — tourism should be promoted everywhere',
            'Balanced — tourism has real benefits but also serious problems',
            'Neutral — the author presents only statistics without any view',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: 'Which statement BEST summarises the final paragraph?',
          options: [
            'Governments should close their borders to tourists to protect their culture.',
            'Sustainable tourism is one approach that tries to balance growth with responsibility.',
            'The economic benefits of tourism always outweigh the cultural and environmental costs.',
            'Local communities have no power to control the effects of tourism.',
          ],
          answer: 1,
        },
      ],
    },
  ],
};

export default mock;
