import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 06
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Medio ambiente
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-06',
  examSlug: 'icfes',
  title: 'Mock 6 · Medio ambiente',
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
            'RECYCLING CENTRE\nPLEASE SEPARATE GLASS, PAPER, AND PLASTIC\nThank you for helping us protect the environment.',
          text: 'What does this notice ask people to do?',
          options: [
            'Leave all rubbish in the same container',
            'Sort their waste into different categories',
            'Bring their recycling on specific days only',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'NATURE RESERVE\nNO LITTERING — KEEP OUR PARK CLEAN\nOffenders may be fined.',
          text: 'What is the purpose of this notice?',
          options: [
            'To announce that the park is closed for cleaning',
            'To invite people to visit the nature reserve',
            'To warn people not to throw rubbish on the ground',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'CITY PARK\nDO NOT FEED THE ANIMALS\nFeeding wildlife can harm their health and behaviour.',
          text: 'Where would you most likely see this notice?',
          options: [
            'Inside a supermarket',
            'In a public park or nature area',
            'At an international airport',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'CONSTRUCTION SITE\nHARD HAT AREA — VISITORS MUST WEAR PROTECTIVE EQUIPMENT\nNo entry without authorisation.',
          text: 'What does this notice tell visitors?',
          options: [
            'They should call before visiting the site',
            'They are not allowed to enter under any circumstances',
            'They must put on safety gear before entering',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'BEACH\nSWIMMING PROHIBITED — STRONG CURRENTS\nFor your safety, stay out of the water.',
          text: 'What is the main reason for this warning?',
          options: [
            'The sea conditions make swimming dangerous',
            'The beach is too crowded for swimming',
            'The water is polluted and not safe',
          ],
          answer: 0,
        },
      ],
    },

    // ── PARTE 2 ── Vocabulario: cuadrícula de emparejamiento (preguntas 6–10) ─
    {
      part: 2,
      title: 'Parte 2 — Vocabulario',
      sectionStyle: 'matching-grid',
      topic: 'Environment',
      exampleText: 'The typical weather conditions of a region over a long period of time.',
      exampleAnswer: 'climate',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'A large area of land covered with trees and plants, home to many species of animals.',
          options: ['drought', 'flood', 'forest', 'pollution', 'recycle', 'soil', 'wildlife'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'The presence of harmful substances in the air, water, or land that damage the environment.',
          options: ['drought', 'flood', 'forest', 'pollution', 'recycle', 'soil', 'wildlife'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'To process used materials such as paper, glass, or plastic so they can be used again.',
          options: ['drought', 'flood', 'forest', 'pollution', 'recycle', 'soil', 'wildlife'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'Wild animals, birds, and other living things that exist naturally and are not kept by humans.',
          options: ['drought', 'flood', 'forest', 'pollution', 'recycle', 'soil', 'wildlife'],
          answer: 6,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'A long period with little or no rain, causing a serious shortage of water.',
          options: ['drought', 'flood', 'forest', 'pollution', 'recycle', 'soil', 'wildlife'],
          answer: 0,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'I think I am getting sick.',
      exampleOptions: ['I am sorry.', 'I can too.', 'I need it.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: "There's so much rubbish in this river.",
          text: '',
          options: [
            'We should clean it up.',
            'Rivers are always dirty.',
            "I don't like rivers.",
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: 'My city started a recycling programme.',
          text: '',
          options: [
            'Recycling is too difficult.',
            'My city is better.',
            "That's great news.",
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'I saw a documentary about climate change last night.',
          text: '',
          options: [
            'Documentaries are boring.',
            'It really made me think.',
            "I don't watch TV.",
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: 'The park near my house was cut down to build flats.',
          text: '',
          options: [
            "That's a shame — trees are important.",
            'Flats are more useful than parks.',
            'Parks can be dangerous places.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'I want to start using a bicycle instead of a car.',
          text: '',
          options: [
            'Cars are always better.',
            'Bicycles are quite dangerous.',
            'That will help reduce pollution.',
          ],
          answer: 2,
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
        "Colombia is one of the countries in the world with the most (16) ___ resources. Its mountains, forests, and coasts provide fresh (17) ___ for millions of people. However, in many cities, the quality of (18) ___ in the rivers has fallen because of industrial and agricultural activity. As the (19) ___ grows, demand for water increases too. Experts warn that if people continue to (20) ___ water and pollute natural sources, the country could face a serious crisis. It is therefore (21) ___ that communities learn to use water wisely. Protecting the environment today means securing a better (22) ___ for the next generation. Every citizen has a responsibility to care for these natural (23) ___.",
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['water', 'mineral', 'natural', 'human'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['soil', 'air', 'rivers', 'food'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['colour', 'taste', 'clean', 'flow'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['economy', 'wildlife', 'government', 'population'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['save', 'waste', 'recycle', 'drink'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['important', 'unlikely', 'impossible', 'optional'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['past', 'future', 'climate', 'challenge'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['laws', 'ideas', 'schools', 'resources'],
          answer: 3,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'Protecting the Amazon Rainforest',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        "PROTECTING THE AMAZON RAINFOREST\n\nThe Amazon rainforest covers more than five million square kilometres across nine countries in South America. It is home to approximately ten percent of all species on Earth, including thousands of types of plants, birds, insects, and mammals that exist nowhere else in the world.\n\nHowever, the Amazon faces serious threats. Deforestation — the cutting down of trees for agriculture, cattle farming, and logging — has already destroyed large areas of the forest. Scientists estimate that around seventeen percent of the Amazon has been lost in the last fifty years. This destruction not only reduces the habitat available for wildlife but also releases large amounts of carbon dioxide into the atmosphere, contributing to global warming.\n\nConservation organisations and some governments are working to reverse this trend. In Brazil, the largest Amazon country, new laws have increased protections for indigenous communities who live in the forest and depend on it for their survival. Satellite technology is now used to monitor deforestation in real time, allowing authorities to respond more quickly to illegal activity.\n\nEducation also plays a key role. Many environmental groups run programmes in schools and communities to raise awareness about the importance of the rainforest. Experts agree that without the Amazon, the entire planet's climate would change dramatically.",
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main topic of this text?',
          options: [
            'The types of animals that live only in the Amazon',
            'The threats facing the Amazon and efforts to protect it',
            'How satellite technology works in South America',
            'The history of farming in the Amazon region',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'According to the text, what percentage of the Amazon has been lost in the last fifty years?',
          options: [
            'About ten percent',
            'About thirty percent',
            'About seventeen percent',
            'About fifty percent',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'The word "deforestation" in paragraph 2 most likely means:',
          options: [
            'planting new trees in empty areas',
            'protecting forests from fires and floods',
            'the removal of trees from a forested area',
            'the movement of animals away from their habitats',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'How does deforestation contribute to global warming?',
          options: [
            'It forces animals to move to colder regions.',
            'It releases carbon dioxide into the atmosphere.',
            'It causes rivers to dry up and reduces rainfall.',
            'It increases the use of satellite technology.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'What has Brazil done to help protect the Amazon?',
          options: [
            'It has banned all farming near the forest.',
            'It has moved indigenous communities to cities.',
            'It has increased legal protections for indigenous people in the forest.',
            'It has stopped all logging operations in South America.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'How is satellite technology used in Amazon conservation?',
          options: [
            'To count the number of animal species in the forest',
            'To predict when floods will occur in the region',
            'To communicate with indigenous communities',
            'To monitor deforestation and detect illegal activity quickly',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which of the following is NOT mentioned in the text as a cause of deforestation?',
          options: [
            'Agriculture',
            'Tourism development',
            'Cattle farming',
            'Logging',
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
      passageTitle: 'Urban Gardens: Growing Food in Colombian Cities',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        "URBAN GARDENS: GROWING FOOD IN COLOMBIAN CITIES\n\nIn recent years, a growing number of Colombian city dwellers have begun transforming unused rooftops, balconies, and community spaces into productive vegetable gardens. This movement, known as urban agriculture, has gained particular momentum in cities such as Bogotá, Medellín, and Cali, where limited access to fresh produce and concerns about food security have pushed many families to grow their own food.\n\nUrban gardens offer several advantages. Firstly, they provide families with fresh vegetables and herbs at a low cost, reducing their dependence on expensive supermarket produce. Secondly, they help improve air quality in densely populated areas by adding green spaces that absorb carbon dioxide. Thirdly, the act of gardening has been shown to reduce stress and improve the mental health of participants.\n\nHowever, urban agriculture is not without its challenges. Space is limited in most city apartments, and the lack of natural soil means that gardeners must use containers and specially prepared compost. Water usage is also a concern, particularly in areas that experience seasonal droughts.\n\nDespite these obstacles, local governments have begun to support urban gardening initiatives. In Bogotá, the city council has created a programme that distributes free seeds and gardening tools to interested residents. Workshops are held in community centres to teach basic cultivation techniques.\n\nEnvironmental experts believe that urban agriculture could play an important role in making Colombian cities more sustainable and resilient to climate change. By producing food closer to where it is consumed, cities can also reduce the carbon emissions associated with transporting food from rural areas.",
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'What is the main reason many Colombian families have started urban gardens?',
          options: [
            'They want to sell vegetables in local markets.',
            'Limited access to fresh produce and food security concerns',
            'The government requires all city residents to grow food.',
            'They have too much free space in their homes.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'According to the text, what is one benefit of urban gardens for mental health?',
          options: [
            'They provide families with a regular income.',
            'They make city apartments look more attractive.',
            'The act of gardening helps reduce stress.',
            'They allow people to exercise more frequently.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'What challenge do urban gardeners face regarding soil?',
          options: [
            'Natural soil in cities is too fertile for most vegetables.',
            'Gardeners must use containers and prepared compost instead of natural soil.',
            'The government does not allow the use of soil on balconies.',
            'Soil is too expensive to buy in Colombian cities.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: "What has Bogotá's city council done to encourage urban gardening?",
          options: [
            'It has built large public gardens in every neighbourhood.',
            'It has reduced taxes for families who grow their own food.',
            'It distributes free seeds and tools and organises workshops.',
            'It has made urban gardening compulsory for all residents.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the last paragraph about urban agriculture and climate change?',
          options: [
            'Urban gardens produce enough food to feed entire cities.',
            'Transporting food from farms causes no carbon emissions.',
            'Growing food locally can help reduce a city\'s environmental impact.',
            'Colombian cities currently produce most of their own food.',
          ],
          answer: 2,
        },
      ],
    },

    // ── PARTE 7 ── Texto de opinión/argumento (preguntas 36–45) ──────────────
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      sectionStyle: 'reading',
      passageTitle: 'Should Single-Use Plastics Be Banned?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        "SHOULD SINGLE-USE PLASTICS BE BANNED?\n\nEvery year, the world produces more than 300 million tonnes of plastic. A large proportion of this — straws, bags, cups, cutlery, and packaging — is designed to be used just once before being thrown away. Single-use plastics have become one of the most visible and damaging forms of pollution on the planet, found in oceans, rivers, and even in the food we eat. The question of whether governments should ban them entirely is one of the most pressing environmental debates of our time.\n\nThose who support a complete ban argue that single-use plastics cause irreversible harm to ecosystems. Marine animals such as turtles, dolphins, and seabirds frequently mistake plastic for food, which can cause injuries and death. Microplastics — tiny fragments that result from the breakdown of larger plastic items — have been found in drinking water, sea salt, and human blood. Supporters of a ban say that only legislation can force industries and consumers to change their behaviour quickly enough to prevent further damage.\n\nOpponents of a total ban, however, raise several practical concerns. Plastic packaging plays a crucial role in preserving food, which helps reduce food waste — itself a major environmental problem. In hospitals and healthcare settings, single-use plastic products are essential for preventing the spread of infection. Critics also point out that many alternatives, such as paper bags or glass bottles, require more energy to produce and transport than their plastic equivalents.\n\nA growing number of governments have chosen a middle path: banning the most harmful and unnecessary single-use items — such as plastic straws and cotton buds — while allowing the use of plastics in contexts where they serve a clear health or safety purpose.\n\nUltimately, tackling the plastic problem requires more than legislation alone. Investment in better recycling infrastructure, education campaigns, and the development of genuinely sustainable packaging materials are all necessary components of a long-term solution. Banning single-use plastics is an important step, but it is only one part of the answer.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main purpose of this text?',
          options: [
            'To explain how single-use plastics are manufactured',
            'To present different arguments about banning single-use plastics',
            'To describe the history of plastic production worldwide',
            'To encourage readers to stop buying plastic products immediately',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 1, what makes single-use plastics particularly damaging?',
          options: [
            'They are more expensive than reusable alternatives.',
            'They are found everywhere from oceans to the food we eat.',
            'They are difficult to manufacture in large quantities.',
            'They are only produced by a small number of companies.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'The word "irreversible" in paragraph 2 most likely means:',
          options: [
            'very slow to happen',
            'easy to control with the right laws',
            'impossible to undo',
            'limited to small coastal areas',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'According to paragraph 2, what are microplastics?',
          options: [
            'A type of plastic used only in medical devices',
            'Small plastic particles found in water, salt, and blood',
            'Plastic bags that have been recycled several times',
            'A new form of biodegradable packaging material',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'Which argument do opponents of a total ban use regarding food?',
          options: [
            'Plastic packaging helps preserve food and reduces food waste.',
            'People eat more healthily when food comes in plastic packaging.',
            'Food wrapped in plastic is cheaper for low-income families.',
            'Plastic packaging makes food easier to transport internationally.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'Why do some people argue that paper bags are not always a better alternative to plastic?',
          options: [
            'Paper bags are more likely to cause injuries.',
            'Paper bags cost much more for consumers to buy.',
            'Making and transporting paper bags can require more energy than plastic.',
            'Paper bags are not accepted in most recycling programmes.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'What approach have many governments chosen regarding single-use plastics?',
          options: [
            'A complete ban on all types of plastic products',
            'No restrictions on single-use plastics at all',
            'Banning only the most harmful items while allowing others for safety purposes',
            'Leaving all decisions to plastic manufacturing companies',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'The phrase "a middle path" in paragraph 4 most likely means:',
          options: [
            'an extreme position on an issue',
            'a solution that combines elements of two opposing views',
            'a temporary measure that will be reversed later',
            'a decision made by international organisations',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: 'According to the final paragraph, what does a long-term solution to plastic pollution require?',
          options: [
            'A global agreement to stop all plastic production immediately',
            'Only better recycling programmes in developed countries',
            'Multiple strategies including recycling, education, and new materials',
            'Individual consumers choosing to buy less plastic packaging',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: "Which statement BEST summarises the author's position?",
          options: [
            'Single-use plastics should be banned completely without exceptions.',
            'Banning plastics is unnecessary because recycling alone solves the problem.',
            'Governments should wait for better scientific evidence before acting.',
            'Banning the worst single-use plastics is a good step, but broader action is also needed.',
          ],
          answer: 3,
        },
      ],
    },
  ],
};

export default mock;
