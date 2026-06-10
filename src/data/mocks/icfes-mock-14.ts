import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 14
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Clima y estaciones
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-14',
  examSlug: 'icfes',
  title: 'Mock 14 · Clima y estaciones',
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
            'EXTREME HEAT WARNING\nTemperatures above 38°C are expected today.\nDrink plenty of water and stay in the shade.',
          text: 'What is the purpose of this notice?',
          options: [
            'To warn people about dangerous heat and give safety advice',
            'To advertise a swimming pool',
            'To announce the start of a sports event',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'RED FLAG — SWIMMING IS PROHIBITED TODAY\nDangerous waves and strong currents.\nDo not enter the water.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At a public swimming pool',
            'At a beach',
            'Near a mountain river',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'ALL SLOPES CLOSED DUE TO AVALANCHE RISK\nPlease do not attempt to ski or snowboard today.\nCheck website for updates.',
          text: 'Where would you find this notice?',
          options: [
            'At a beach resort',
            'In a shopping centre',
            'At a ski resort',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'IMPORTANT\nCheck the weather forecast before setting out on the trail.\nTell someone your route and expected return time.',
          text: 'What does this notice advise people to do?',
          options: [
            'Hire a professional guide before hiking',
            'Prepare carefully and inform others of their plans',
            'Avoid hiking during the rainy season',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'WATER RESTRICTIONS IN FORCE\nDo not use garden hoses or sprinklers.\nFines apply for wasting water.',
          text: 'What is the main message of this notice?',
          options: [
            'The park will be closed for maintenance',
            'People must not waste water during the restrictions',
            'The garden is open only on weekends',
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
      topic: 'Weather',
      exampleText: 'A long period with no rain, causing water shortages and dry land.',
      exampleAnswer: 'drought',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'A bright flash of light in the sky caused by electricity during a storm.',
          options: ['blizzard', 'breeze', 'fog', 'hail', 'lightning', 'thunder', 'tornado'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'Thick cloud at ground level that makes it difficult to see clearly.',
          options: ['blizzard', 'breeze', 'fog', 'hail', 'lightning', 'thunder', 'tornado'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'A severe snowstorm with very strong winds and extremely low temperatures.',
          options: ['blizzard', 'breeze', 'fog', 'hail', 'lightning', 'thunder', 'tornado'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'The loud sound you hear in the sky during a storm, usually following a flash of light.',
          options: ['blizzard', 'breeze', 'fog', 'hail', 'lightning', 'thunder', 'tornado'],
          answer: 5,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'Small balls of ice that fall from the sky during a storm, often damaging crops and cars.',
          options: ['blizzard', 'breeze', 'fog', 'hail', 'lightning', 'thunder', 'tornado'],
          answer: 3,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'I think it is going to rain.',
      exampleOptions: ['Take an umbrella.', 'I love rain.', 'It is very cold.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: 'It is raining heavily outside.',
          text: '',
          options: [
            "Don't forget your umbrella.",
            'Rain is good for sleep.',
            'I like the sun.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: "The weather forecast says there's a storm coming.",
          text: '',
          options: [
            'Storms are very exciting.',
            'We should stay indoors then.',
            "I don't trust forecasts.",
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: "It's so hot today — over thirty degrees!",
          text: '',
          options: [
            "It's always hot here.",
            'I love this weather.',
            'Stay in the shade and drink plenty of water.',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: 'There was a flood in the next town last night.',
          text: '',
          options: [
            'I hope everyone is safe.',
            'Floods happen every year.',
            'That town is always unlucky.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'I have never seen snow before.',
          text: '',
          options: [
            'Snow is cold and dangerous.',
            'You should visit the highlands in winter.',
            'I see snow every day.',
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
        "Colombia is a country with an extraordinary variety of (16) ___ zones. Because of its geography, the (17) ___ can change dramatically from one area to another. The country is divided into several natural (18) ___: the Andean highlands, the Pacific (19) ___, the Amazon rainforest, and the Caribbean lowlands. In the high (20) ___, temperatures can drop below zero at night. Meanwhile, the tropical lowlands receive a great deal of (21) ___ throughout the year. Unlike countries in Europe or North America, Colombia does not have four (22) ___. Instead, it has wet and dry periods that directly affect (23) ___ and the daily lives of millions of people.",
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['climate', 'weather', 'season', 'wind'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['landscape', 'temperature', 'altitude', 'pressure'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['districts', 'zones', 'regions', 'sections'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['border', 'coast', 'river', 'valley'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['fields', 'forests', 'plains', 'mountains'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['snow', 'ice', 'rain', 'wind'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['climates', 'seasons', 'months', 'weathers'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['tourism', 'industry', 'agriculture', 'transport'],
          answer: 2,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'How Climate Affects Daily Life in Colombia',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        "HOW CLIMATE AFFECTS DAILY LIFE IN COLOMBIA\n\nColombia's climate plays a central role in the daily lives of its people. The country's position near the equator means that temperatures stay relatively stable throughout the year, but differences in altitude create very different living conditions across the country.\n\nIn cities like Medellín, located at around 1,500 metres above sea level, the weather is often described as 'the city of eternal spring' because temperatures rarely drop below 16°C or rise above 28°C. In contrast, Leticia, in the Amazon region, experiences a hot and humid climate all year round, with frequent afternoon rains.\n\nFor farmers, climate patterns are especially important. They need to know when the rainy season begins so they can plant their crops at the right time. Changes in rainfall, which have become less predictable in recent years, can damage harvests and affect food prices for the whole country.\n\nUrban residents are also affected. In Bogotá, located at 2,600 metres above sea level, cool temperatures mean that people need warm clothing, especially in the early mornings. During the rainy season, heavy downpours can cause traffic jams and flooding in low-lying neighbourhoods.\n\nUnderstanding weather patterns is not just useful — for many Colombians, it is essential to their work, health, and safety.",
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main idea of this text?',
          options: [
            "Colombia's climate is the same throughout the entire country.",
            'Climate affects many aspects of daily life for Colombians.',
            'Farmers are the only group affected by climate in Colombia.',
            'Colombia has the most pleasant climate in South America.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: "Why is Medellín described as 'the city of eternal spring'?",
          options: [
            'Because it has many parks and botanical gardens.',
            'Because it hosts festivals every spring.',
            'Because its temperatures are mild and pleasant throughout the year.',
            'Because it rains every day in the morning.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'How does climate affect farmers in Colombia?',
          options: [
            'They must move to different regions depending on the season.',
            'They rely on rainfall patterns to decide when to plant their crops.',
            'They only work during the dry season.',
            'They receive government money when it rains too much.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: "The word 'downpours' in paragraph 4 most likely means:",
          options: [
            'very strong winds',
            'periods of extreme heat',
            'heavy falls of rain',
            'sudden drops in temperature',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'What problem can heavy rain cause in Bogotá?',
          options: [
            'It causes power cuts across the city.',
            'It leads to traffic jams and flooding in some areas.',
            'It destroys crops outside the city.',
            'It forces schools and offices to close.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'Why do people in Bogotá need warm clothing?',
          options: [
            'Because Bogotá is in the Amazon rainforest.',
            'Because the city has a high altitude with cool temperatures.',
            'Because it snows regularly in Bogotá.',
            'Because the government recommends it for health reasons.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which of the following is NOT mentioned as a consequence of changing rainfall patterns?',
          options: [
            'Damage to harvests',
            'Higher food prices',
            'Less predictable conditions for farmers',
            'An increase in the number of tourists visiting Colombia',
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
      passageTitle: 'Natural Disasters in Colombia: Preparing Communities',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        "NATURAL DISASTERS IN COLOMBIA: PREPARING COMMUNITIES\n\nColombia's geography makes it one of the most naturally diverse countries in the world, but it also makes it vulnerable to natural disasters. Earthquakes, landslides, floods, and volcanic eruptions are all part of the country's reality. In recent decades, the government and local communities have worked together to reduce the damage caused by these events.\n\nThe city of Manizales, located in the coffee-growing Andean region, is considered a model for disaster preparedness. The city sits near an active volcano and is prone to landslides during the rainy season. To protect its residents, the local government has invested in an early warning system that monitors ground movement and rainfall levels around the clock. When dangerous conditions are detected, sirens alert the population within minutes.\n\nCommunity education is another key strategy. Schoolchildren in Manizales learn from an early age how to respond to different types of emergencies. They practise evacuation drills and are taught to identify safe areas in their homes and neighbourhoods. Community leaders also receive training so they can guide their neighbours during a crisis.\n\nDespite these efforts, experts warn that many areas of Colombia remain poorly prepared. Rural communities, in particular, often lack access to early warning systems and trained emergency personnel. Poverty also limits the ability of families to build safer homes or relocate from high-risk areas.\n\nThe challenge for Colombia is clear: as climate change increases the frequency and intensity of extreme weather events, investing in disaster preparedness is no longer optional — it is a matter of survival for millions of people.",
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'Why does Colombia face a high risk of natural disasters?',
          options: [
            'Because the country has a very large population.',
            "Because of Colombia's varied and complex geography.",
            'Because the government does not invest in safety systems.',
            'Because Colombia is located far from the equator.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'What makes Manizales a model of disaster preparedness?',
          options: [
            'It has moved all residents away from the volcano.',
            'It has an early warning system and community education programmes.',
            'It receives the most government disaster funding in Colombia.',
            'It has never experienced a natural disaster.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'What do schoolchildren in Manizales learn?',
          options: [
            'How to use scientific instruments to predict earthquakes.',
            'The history of natural disasters in Colombia.',
            'How to respond to emergencies and locate safe areas.',
            'How to build homes that withstand earthquakes.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'According to the text, why are rural communities more vulnerable?',
          options: [
            'They live in areas with more frequent volcanic eruptions.',
            'They often lack warning systems and trained emergency personnel.',
            'They refuse to follow government safety advice.',
            'They do not have enough volunteers to help in emergencies.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What does the final paragraph suggest about disaster preparedness in Colombia?',
          options: [
            'Natural disasters in Colombia will decrease in the future.',
            'The government plans to reduce spending on safety programmes.',
            'Investing in preparedness is increasingly urgent because of climate change.',
            'Colombia is already well prepared for all types of natural disasters.',
          ],
          answer: 2,
        },
      ],
    },

    // ── PARTE 7 ── Texto de opinión (preguntas 36–45) ────────────────────────
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      sectionStyle: 'reading',
      passageTitle: 'Climate Change: Whose Responsibility Is It?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        "CLIMATE CHANGE: WHOSE RESPONSIBILITY IS IT?\n\nClimate change is one of the most discussed issues of our time. Scientists agree that the planet is warming at an alarming rate, largely because of human activities such as burning fossil fuels, cutting down forests, and farming practices that release greenhouse gases. But when it comes to deciding who should take responsibility for solving this crisis, opinions differ sharply.\n\nSome people argue that governments must lead the way. They point out that individual choices — choosing to recycle or ride a bicycle — have very little impact compared to the decisions made by large industries and energy companies. Governments have the power to pass laws that force corporations to reduce their emissions, invest in clean energy, and protect natural ecosystems. Without strong political leadership, they say, meaningful change is impossible.\n\nOthers believe that every person has a moral duty to change their own behaviour. When millions of individuals choose to eat less meat, fly less, use less plastic, and support environmentally responsible companies, the combined impact is enormous. This group argues that waiting for governments to act gives people an excuse to avoid personal responsibility.\n\nA third perspective holds that the real responsibility lies with wealthy nations and large corporations, which have historically produced the most pollution. Developing countries like Colombia have contributed far less to the problem, yet they often suffer the most severe consequences — including more intense droughts, floods, and disruptions to agricultural cycles. This raises important questions of fairness and justice.\n\nThe reality is that climate change requires action at every level — from personal choices to national policies to international agreements. Focusing blame on only one group while ignoring the contributions of others is unlikely to produce the solutions the world urgently needs.\n\nThe question, then, is not simply who is responsible, but whether all those with the ability to act are willing to do so before the consequences become irreversible.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the central question this text discusses?',
          options: [
            'How quickly the planet is warming because of human activities',
            'Who should take responsibility for addressing climate change',
            'Why governments have failed to reduce greenhouse gas emissions',
            'How developing countries can benefit from international aid',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, why do supporters of government leadership say individual actions are not enough?',
          options: [
            'Because most people do not care about the environment.',
            'Because individual choices have little impact compared to industrial decisions.',
            'Because recycling and cycling are too expensive for most people.',
            'Because governments always ignore what citizens do.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: "The phrase 'combined impact' in paragraph 3 most likely means:",
          options: [
            'the damage caused by a single large corporation',
            'the total effect of many people acting together',
            'the result of one major government decision',
            'the environmental cost of travelling by air',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'According to paragraph 4, what is unfair about the current climate situation for countries like Colombia?',
          options: [
            'Wealthy nations force Colombia to pay higher environmental taxes.',
            'Colombia suffers serious climate consequences despite contributing little to the problem.',
            'Corporations in poor countries produce the most emissions.',
            'International agreements only benefit wealthy nations.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: "The word 'emissions' in paragraph 2 most likely refers to:",
          options: [
            'electricity generated by solar panels',
            'harmful gases released into the atmosphere by human activities',
            'pollution caused by plastic waste in the ocean',
            'water used in large industrial processes',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'Which group does the text say has historically caused the most pollution?',
          options: [
            'Developing nations and small businesses',
            'Individual consumers who drive and fly frequently',
            'Wealthy nations and large corporations',
            'Farmers and agricultural workers',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: "What is the author's conclusion in paragraph 5?",
          options: [
            'Only governments have the power to solve climate change.',
            'Individuals are the most important actors in fighting climate change.',
            'Action is needed at every level, from personal choices to international agreements.',
            'All blame should be placed on wealthy nations and corporations.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: "The word 'irreversible' in the final paragraph most likely means:",
          options: [
            'possible to fix with enough funding',
            'very costly to address',
            'impossible to undo or reverse',
            'difficult to measure with scientific instruments',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: 'Which of the following BEST describes the structure of this text?',
          options: [
            'It presents one argument and provides only supporting evidence.',
            'It describes the history of climate change since the industrial revolution.',
            'It examines several different viewpoints before offering a balanced conclusion.',
            'It argues that climate change is not a serious problem.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: 'Which statement would the author most likely agree with?',
          options: [
            'Climate change can be solved if every person recycles more.',
            'Governments, corporations, and individuals all need to take action on climate change.',
            'Developing countries should pay the highest cost for climate solutions.',
            'Scientific debate about climate change is still too uncertain to act on.',
          ],
          answer: 1,
        },
      ],
    },
  ],
};

export default mock;
