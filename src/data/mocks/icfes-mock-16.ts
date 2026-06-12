import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 16
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Colombia y América Latina
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-16',
  examSlug: 'icfes',
  title: 'Mock 16 · Colombia y América Latina',
  subtitle: 'Saber 11 · Componente de Inglés · 45 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [

    // ── PARTE 1 ── Avisos e instrucciones (preguntas 1–5) ────────────────────
    {
      part: 1,
      title: 'Parte 1 — Avisos e instrucciones',
      sectionStyle: 'notices-grid',
      exampleStimulus: 'BUS STOP\nPlease stand behind the line.\nThank you.',
      exampleText: 'Where could you see this sign?',
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
            'ALL VISITORS MUST REGISTER AT THE ENTRANCE\nPlease present your identification document.\nThank you for helping us protect this natural area.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At a national park or nature reserve',
            'In a hospital emergency room',
            'At a city bus terminal',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'GUIDED TOURS DEPART EVERY HOUR\nMeet your guide at the main lobby.\nNext tour: 11:00 AM.',
          text: 'What is the purpose of this notice?',
          options: [
            'To advertise a new museum exhibit',
            'To inform visitors about how to join a guided tour',
            'To warn visitors about dangerous areas in the museum',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'ALL TRAVELLERS MUST PRESENT VALID DOCUMENTATION\nPassports and national ID cards accepted.\nNo travel without authorisation.',
          text: 'Where would you find this notice?',
          options: [
            'At a tourist information centre',
            'At a hotel reception',
            'At a border crossing or immigration point',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PHOTOGRAPHY WELCOME\nYou are free to take photos throughout the building.\nPlease be respectful of other visitors.',
          text: 'What does this notice tell visitors?',
          options: [
            'Taking photos is not allowed in the building',
            'They can take photos but should be considerate of others',
            'Photography is only allowed in certain rooms',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'FREE MAPS AVAILABLE\nPlease take one from the stand at the entrance.\nMaps are also available in English, French, and Portuguese.',
          text: 'What is the main purpose of this notice?',
          options: [
            'To charge visitors a fee for maps of the area',
            'To tell visitors where they can pick up a free map',
            'To advertise a new tourist attraction nearby',
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
      topic: 'Colombia',
      exampleText: 'A public event that celebrates the culture, music, food, or traditions of a community.',
      exampleAnswer: 'festival',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'The main city where a country\'s government is located.',
          options: ['border', 'capital', 'currency', 'export', 'landmark', 'region', 'republic'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'A large area of a country that has its own particular characteristics or identity.',
          options: ['border', 'capital', 'currency', 'export', 'landmark', 'region', 'republic'],
          answer: 5,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'A product or good that is sold and sent to another country.',
          options: ['border', 'capital', 'currency', 'export', 'landmark', 'region', 'republic'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'A well-known building, monument, or natural feature that is famous and easy to recognise.',
          options: ['border', 'capital', 'currency', 'export', 'landmark', 'region', 'republic'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'The system of money used in a country, such as coins and banknotes.',
          options: ['border', 'capital', 'currency', 'export', 'landmark', 'region', 'republic'],
          answer: 2,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'I am planning a trip to Bogotá.',
      exampleOptions: ['Take warm clothes.', 'I prefer the coast.', 'Bogotá is too expensive.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: 'Have you ever visited Cartagena?',
          text: '',
          options: [
            "Yes, it's beautiful — the old city is amazing.",
            'Cartagena is too far from everything.',
            'I prefer to stay in Bogotá.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: 'Colombian coffee is famous all over the world.',
          text: '',
          options: [
            'I prefer to drink tea.',
            'Yes, it is considered some of the best quality.',
            'Coffee is not good for your health.',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'What is the best way to travel between cities in Colombia?',
          text: '',
          options: [
            'You should always use a private car.',
            'I always travel by plane.',
            'Buses are usually comfortable and very affordable.',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: 'I want to learn more about indigenous Colombian culture.',
          text: '',
          options: [
            'There are many excellent museums and cultural centres to visit.',
            'That part of history is not very important.',
            'Indigenous cultures are all very similar.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: "It's Carnival season in Barranquilla!",
          text: '',
          options: [
            'Carnivals are far too noisy for me.',
            "That's one of the biggest and most vibrant festivals in Latin America.",
            "I don't know that city at all.",
          ],
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
        "Cartagena de Indias is one of the most (22) ___ cities in Colombia and a UNESCO World Heritage Site. The (16) ___ was founded by Spanish colonists in 1533 and quickly became one of the most important (23) ___ on the Caribbean coast of South America. Today, Cartagena is celebrated for its rich (17) ___ and its beautiful (20) ___ architecture, particularly in the walled old town known as the Ciudad Amurallada. Visitors come from all over the world to explore its colourful streets, enjoy its white-sand (18) ___, and learn about its Afro-Colombian (21) ___. The city also attracts millions of (19) ___ every year who are drawn by its warm climate, exceptional food, and lively arts scene.",
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['city', 'town', 'village', 'settlement'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['geography', 'history', 'economy', 'language'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['mountains', 'forests', 'beaches', 'rivers'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['students', 'tourists', 'merchants', 'workers'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['modern', 'ancient', 'colonial', 'industrial'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['religion', 'language', 'sports', 'culture'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['forgotten', 'isolated', 'famous', 'remote'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['schools', 'ports', 'farms', 'markets'],
          answer: 1,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'Colombian Coffee: From Farm to Cup',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        "COLOMBIAN COFFEE: FROM FARM TO CUP\n\nColombia is one of the world's leading producers of coffee, and the drink is deeply woven into the country's identity. The country's mountainous landscape, tropical climate, and fertile volcanic soils create ideal conditions for growing high-quality Arabica coffee beans. The main coffee-growing areas are located in the Andes region, in a zone known as the 'Coffee Cultural Landscape', which was declared a UNESCO World Heritage Site in 2011.\n\nMost Colombian coffee is grown by small family farms called 'fincas'. Farmers pick the coffee cherries by hand, which allows them to select only the ripest fruit and ensures high quality. After picking, the beans are processed, dried in the sun, and then sorted before being exported to markets around the world.\n\nThe Colombian coffee industry provides employment for around 540,000 farming families, and the sector contributes significantly to the national economy. However, farmers face increasing challenges. Climate change is affecting rainfall patterns and temperatures in the coffee-growing regions, making it harder to predict growing seasons. Falling global prices for coffee also put pressure on farmers' incomes.\n\nDespite these challenges, Colombian coffee continues to be recognised internationally for its mild flavour, balanced acidity, and rich aroma. The famous character Juan Valdez, created in the 1950s as a symbol of Colombian coffee, is still recognised by consumers around the world today.",
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'Why is Colombia well-suited to growing coffee?',
          options: [
            'Because it has a very cold climate with frequent snowfall.',
            'Because it has mountains, a tropical climate, and fertile volcanic soils.',
            'Because it has large flat plains ideal for industrial farming.',
            'Because it receives government subsidies for coffee production.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: "What is the 'Coffee Cultural Landscape'?",
          options: [
            'A museum in Bogotá dedicated to the history of coffee.',
            'A brand name used to market Colombian coffee internationally.',
            'A UNESCO-recognised coffee-growing region in the Colombian Andes.',
            'A government programme to support coffee farmers.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'Why do farmers pick coffee cherries by hand?',
          options: [
            'Because machines are too expensive for small family farms.',
            'Because it is a tradition that has been practised for centuries.',
            'Because hand-picking allows them to select only the ripest fruit.',
            'Because the terrain is too steep for machinery.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: "The word 'acidity' in the final paragraph most likely refers to:",
          options: [
            'the level of bitterness in a cup of coffee.',
            'the sharpness or brightness of the taste.',
            'the colour of the coffee beans after drying.',
            'the amount of caffeine in each cup.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'What is one challenge facing Colombian coffee farmers today?',
          options: [
            'A shortage of workers willing to pick coffee by hand.',
            'Competition from Colombian tea and cacao industries.',
            'Climate change affecting rainfall and temperatures in growing regions.',
            'A lack of international interest in Colombian coffee.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'Approximately how many families depend on the Colombian coffee industry?',
          options: [
            'Around 100,000 families',
            'Around 540,000 families',
            'Around one million families',
            'Around five million families',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which of the following is NOT mentioned as a quality of Colombian coffee?',
          options: [
            'Its mild flavour',
            'Its balanced acidity',
            'Its rich aroma',
            'Its very strong caffeine content',
          ],
          answer: 3,
        },
      ],
    },

    // ── PARTE 6 ── Comprensión: texto largo (preguntas 31–35) ────────────────
    {
      part: 6,
      title: 'Parte 6 — Comprensión de lectura: texto largo',
      sectionStyle: 'reading',
      passageTitle: 'The Diversity of Colombian Regions',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        "THE DIVERSITY OF COLOMBIAN REGIONS\n\nColombia is often described as a country of contrasts. Despite its relatively small size compared to other South American nations, it contains an extraordinary variety of landscapes, climates, cultures, and ecosystems. This diversity is one of its greatest strengths and one of the reasons it continues to attract visitors from across the world.\n\nThe Andean region, which runs through the centre of the country, is home to the majority of Colombia's population and its three largest cities: Bogotá, Medellín, and Cali. This region is characterised by fertile valleys, coffee plantations, and cool mountain temperatures. It is also the economic and political heart of the country.\n\nIn contrast, the Caribbean coast — home to cities such as Barranquilla, Cartagena, and Santa Marta — offers a very different experience. The region has a warm, tropical climate, white-sand beaches, and a vibrant cultural identity strongly influenced by African, indigenous, and European traditions. The famous Barranquilla Carnival, one of the largest in the world, takes place here every year.\n\nThe Amazon and Orinoco regions occupy the eastern part of the country and contain vast areas of tropical rainforest that are among the most biodiverse on the planet. These regions are home to hundreds of indigenous communities who have maintained their languages, traditions, and knowledge of the natural world for thousands of years.\n\nFinally, the Pacific coast remains one of the least visited but most ecologically rich regions of Colombia. Its rainforests and ocean waters are home to an extraordinary range of wildlife, including humpback whales that migrate to the warm waters every year to give birth.\n\nUnderstanding and celebrating this diversity is essential not only for tourism, but for national identity and the preservation of Colombia's unique natural and cultural heritage.",
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: "What is the main idea of this text?",
          options: [
            "Colombia's diversity of landscapes and cultures is one of its most important characteristics.",
            'The Andean region is the only part of Colombia worth visiting.',
            "Colombia's economy depends entirely on tourism and coffee exports.",
            'The Amazon region is the most important part of Colombia.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'Which region is described as the economic and political heart of Colombia?',
          options: [
            'The Caribbean coast',
            'The Amazon region',
            'The Andean region',
            'The Pacific coast',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'What cultural influences are mentioned in connection with the Caribbean coast?',
          options: [
            'Asian, European, and North American',
            'African, indigenous, and European',
            'Andean, Caribbean, and Amazonian',
            'Spanish, Portuguese, and French',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'What does the text say about the Amazon and Orinoco regions?',
          options: [
            'They are heavily urbanised and home to large modern cities.',
            'They contain some of the most biodiverse tropical forests on the planet.',
            'They are the most visited tourist destinations in Colombia.',
            'They have a cold climate similar to the Andean region.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the final paragraph about Colombia\'s regional diversity?',
          options: [
            'The Colombian government plans to close some regions to tourists.',
            'Regional diversity should be preserved as part of Colombia\'s identity and heritage.',
            'Most Colombians are unaware of the diversity of their own country.',
            'The most important region is the one with the most tourists.',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 7 ── Texto de opinión (preguntas 36–45) ────────────────────────
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      sectionStyle: 'reading',
      passageTitle: 'Should Colombia Invest More in Tourism?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        "SHOULD COLOMBIA INVEST MORE IN TOURISM?\n\nIn recent years, Colombia has worked hard to improve its international image and attract more visitors. The country's extraordinary natural beauty, biodiversity, cultural richness, and warm hospitality make it a destination with enormous potential. However, opinions differ on whether tourism should be a major national priority, and on how it should be developed.\n\nSupporers of tourism investment argue that the economic benefits are clear. The tourism sector creates employment, brings foreign currency into the country, and stimulates the development of local businesses such as hotels, restaurants, and transport services. In less-developed regions like the Pacific coast and parts of the Amazon, tourism could provide income for communities that currently lack economic opportunities. Advocates also point out that tourism raises awareness of Colombia's natural and cultural heritage, which can encourage conservation.\n\nHowever, critics of large-scale tourism warn that poorly managed growth can damage the very things that attract visitors in the first place. Overtourism — the phenomenon where too many visitors arrive in a place that cannot support them — has already caused problems in some popular destinations around the world, leading to environmental damage, rising living costs for local residents, and the loss of authentic cultural identity.\n\nIn Colombia specifically, there are concerns about the impact of tourism on fragile ecosystems such as the Cocora Valley and the Tayrona National Park. Communities near these areas have reported increased waste, damage to trails, and pressure on water supplies. Some indigenous communities have also expressed discomfort with visitors entering their territories without adequate cultural sensitivity training.\n\nA more balanced approach would prioritise sustainable tourism — development that generates economic benefits while actively protecting the environment and respecting local communities. This means investing in education and training for tourism workers, setting visitor limits in sensitive areas, and ensuring that local communities receive a fair share of the economic gains.\n\nColombia has a genuine opportunity to become a world leader in sustainable tourism. But this will only happen if investment is accompanied by strong regulation, community participation, and a long-term vision that values nature and culture as much as profit.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the central argument this text explores?',
          options: [
            'Whether Colombia should become the most visited country in South America',
            'How Colombian tourism can compete with other Latin American countries',
            'Whether investing more in tourism is the right priority for Colombia',
            'Why tourists prefer Colombia over other travel destinations',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, how could tourism benefit less-developed regions?',
          options: [
            'By attracting large foreign companies to build factories.',
            'By providing income and employment where few opportunities currently exist.',
            'By replacing traditional industries such as farming.',
            'By encouraging people from cities to move to rural areas.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: "The word 'overtourism' in paragraph 3 most likely means:",
          options: [
            'tourism that only benefits wealthy travellers',
            'travel organised by international agencies',
            'a situation where too many visitors cause damage to a destination',
            'tourism that promotes environmental conservation',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'What specific problems have communities near Colombian natural parks reported?',
          options: [
            'Lack of government investment in local infrastructure.',
            'Increased waste, trail damage, and pressure on water supplies.',
            'Conflict between local businesses and international hotel chains.',
            'A reduction in the number of tourists visiting each year.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: "The phrase 'cultural sensitivity training' in paragraph 4 most likely means:",
          options: [
            'courses that teach tourists a foreign language.',
            'education that helps visitors understand and respect local customs.',
            'training that teaches local communities to adapt to tourists.',
            'programmes that teach people how to take better travel photographs.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: "What does the author mean by 'sustainable tourism' in paragraph 5?",
          options: [
            'Tourism that focuses exclusively on protecting the natural environment.',
            'Tourism that benefits the economy while protecting nature and respecting communities.',
            'Tourism designed only for wealthy international visitors.',
            'Tourism that reduces the number of visitors to a country.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'According to paragraph 2, what is one benefit of tourism besides economic growth?',
          options: [
            'It reduces the need for other industries such as agriculture.',
            'It encourages conservation by raising awareness of natural and cultural heritage.',
            'It attracts international investors to build large infrastructure projects.',
            'It reduces inequality between cities and rural areas.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: "What is the author's overall position in this text?",
          options: [
            'Colombia should stop investing in tourism and focus on other industries.',
            'Tourism is the most important economic sector in Colombia.',
            'Colombia should develop sustainable tourism carefully, with regulation and community involvement.',
            'The problems of overtourism make tourism investment too risky for Colombia.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: 'What concern do some indigenous communities have about tourism?',
          options: [
            'They want to earn more money from visitors to their territories.',
            'They are worried that tourists do not spend enough time in their communities.',
            'They are uncomfortable with visitors entering without adequate cultural awareness.',
            'They want the government to build better roads to reach their territories.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: 'Which statement BEST summarises the message of the final paragraph?',
          options: [
            'Colombia should focus on international marketing to attract more tourists immediately.',
            'The opportunity to develop world-class tourism exists only if it is done responsibly.',
            'Tourism in Colombia will never succeed without foreign investment.',
            'The government should hand all tourism decisions to local communities.',
          ],
          answer: 1,
        },
      ],
    },
  ],
};

export default mock;
