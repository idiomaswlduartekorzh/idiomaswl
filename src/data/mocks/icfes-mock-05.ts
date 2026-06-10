import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 05
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Comida y nutrición
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-05',
  examSlug: 'icfes',
  title: 'Mock 5 · Comida y nutrición',
  subtitle: 'Saber 11 · Componente de Inglés · 45 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [

    // ── PARTE 1 ── Avisos e instrucciones (preguntas 1–5) ────────────────────
    {
      part: 1,
      title: 'Parte 1 — Avisos e instrucciones',
      sectionStyle: 'notices-grid',
      exampleStimulus: 'ALLERGY INFORMATION\nThis product may contain nuts.\nPlease ask staff for full ingredient details.',
      exampleText: 'Where would you most likely see this notice?',
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
            'PLEASE WAIT TO BE SEATED\nA member of our staff will\nshow you to your table.\nThank you for your patience.',
          text: 'What does this notice ask customers to do?',
          options: [
            'Order their food at the counter',
            'Wait until a staff member takes them to their table',
            'Find a free table and sit down immediately',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'WET FLOOR — CAUTION\nCleaning in progress.\nPlease walk slowly and take care.\nWe apologise for any inconvenience.',
          text: 'What is the purpose of this notice?',
          options: [
            'To warn people that the floor is slippery and they should be careful',
            'To inform customers that the shop is closing for cleaning',
            'To tell people that a spill has occurred and needs to be reported',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'FRESHLY BAKED BREAD AVAILABLE FROM 7:00 AM\nOur products are made daily with\nlocal ingredients.\nPre-orders accepted.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At a supermarket fish counter',
            'At a bakery or bread shop',
            'At a fast-food restaurant',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PLEASE DO NOT HANDLE THE PRODUCE\nAsk a member of staff for assistance.\nThank you.',
          text: 'What does this notice tell customers?',
          options: [
            'They should weigh their own fruit and vegetables before paying',
            'They are not allowed to touch the products on display',
            'They must wash their hands before entering the market',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'TRAYS MUST BE RETURNED TO THE COUNTER\nPlease clear your table when you\nhave finished eating.\nHelp us keep the space clean for everyone.',
          text: 'What is this notice asking people to do?',
          options: [
            'Pay for their meal at the counter before eating',
            'Take their tray back to the counter when they finish eating',
            'Ask for a tray before choosing their food',
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
      topic: 'Cooking',
      exampleText: 'To cook food on a metal frame over direct heat, often outdoors.',
      exampleAnswer: 'grill',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'To remove the outer skin of a fruit or vegetable before cooking or eating it.',
          options: ['bake', 'boil', 'chop', 'fry', 'mix', 'peel', 'slice'],
          answer: 5,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'To cut food into small pieces using a knife.',
          options: ['bake', 'boil', 'chop', 'fry', 'mix', 'peel', 'slice'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'To cook food in very hot water.',
          options: ['bake', 'boil', 'chop', 'fry', 'mix', 'peel', 'slice'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'To cook food such as bread or cakes in an oven using dry heat.',
          options: ['bake', 'boil', 'chop', 'fry', 'mix', 'peel', 'slice'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'To cook food in hot oil in a pan.',
          options: ['bake', 'boil', 'chop', 'fry', 'mix', 'peel', 'slice'],
          answer: 3,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'Would you like to see the menu?',
      exampleOptions: ['Yes, please.', 'I already ate.', 'Menus are long.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: 'This soup is too salty.',
          text: '',
          options: ['Add some water to it.', 'I love salty food.', 'Ask for the menu.'],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: "I don't eat meat.",
          text: '',
          options: ['Meat is very healthy.', 'There are vegetarian options here.', 'Try the chicken dish.'],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'The restaurant is fully booked tonight.',
          text: '',
          options: ["I prefer staying home.", "Let's try another place.", 'Book a table right now.'],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: "I can't finish this portion, it's too big.",
          text: '',
          options: ['You need to eat more.', 'Order some more food.', 'Take it home in a box.'],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'Do you have any food allergies?',
          text: '',
          options: ["Yes, I'm allergic to nuts.", "I don't like vegetables.", 'Allergies are very rare.'],
          answer: 0,
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
        "The arepa is one of the most iconic foods in Colombian gastronomy. Made from ground (16) ___, this round flatbread has been a (17) ___ part of the national diet for centuries. Arepas come in many forms across the different (18) ___ of Colombia. In some areas, they are filled with (19) ___ or meat, while in others they are eaten plain. They are especially (20) ___ as a quick snack or a simple meal. The dough is usually (21) ___ on a griddle or pan over medium heat until golden on both sides. For many Colombians, arepas are the first thing they eat at (22) ___. The arepa is more than just food — it is a powerful symbol of Colombian (23) ___ and national identity.",
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['corn', 'wheat', 'rice', 'potato'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['modern', 'foreign', 'traditional', 'unusual'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['cities', 'schools', 'regions', 'markets'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['sugar', 'cheese', 'flour', 'honey'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['difficult', 'rare', 'popular', 'expensive'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['fried', 'baked', 'boiled', 'cooked'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['lunch', 'dinner', 'breakfast', 'midnight'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['economy', 'history', 'industry', 'culture'],
          answer: 3,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'Street Food Markets in Colombian Cities',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        "STREET FOOD MARKETS IN COLOMBIAN CITIES\n\nIn cities across Colombia, street food markets are lively and colourful places where locals and visitors come together to eat, socialise, and discover the country's rich culinary traditions. From the bustling markets of Bogotá to the coastal stalls of Cartagena, these spaces offer an authentic experience of Colombian food culture.\n\nThe variety of food available at these markets is remarkable. Visitors can find traditional dishes such as arepas, empanadas, chicharrón, and fresh tropical fruit that is not commonly available in other countries. Freshly squeezed juices made from exotic fruits like lulo, maracuyá, and guanábana are popular refreshments on hot days.\n\nStreet food markets also play an important economic role. Many of the vendors are small business owners who have learned their recipes from family members over several generations. For these entrepreneurs, the market is their primary source of income and an important part of their cultural identity.\n\nIn recent years, several Colombian cities have invested in transforming informal street food areas into organised market spaces with better facilities, hygiene standards, and seating. This has made markets more attractive to a wider audience, including tourists and middle-class professionals, without destroying their original character.\n\nFood tours of these markets have become increasingly popular as a way of exploring Colombian cities. Guided tours allow visitors to taste many different dishes in a single afternoon while learning about the history and ingredients behind each one. For many tourists, a visit to a local food market is one of the highlights of their trip.",
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main purpose of this text?',
          options: [
            'To compare the food in different regions of Colombia',
            'To describe the importance and character of street food markets in Colombia',
            'To give a recipe for traditional Colombian dishes',
            'To argue that street food is healthier than restaurant food',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'Which of the following is mentioned as a drink available at Colombian markets?',
          options: [
            'Hot chocolate made with milk',
            'Coffee from the Andes mountains',
            'Freshly squeezed juice from tropical fruits',
            'Cold beer from local breweries',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'According to paragraph 3, why are the markets economically important?',
          options: [
            'They attract large numbers of foreign investors to Colombian cities.',
            'They provide many street vendors with their main source of income.',
            'They reduce food prices for poor families living near city centres.',
            'They allow international food companies to sell their products locally.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'What has happened to some street food areas in recent years?',
          options: [
            'They have been closed because of hygiene concerns.',
            'They have been moved out of city centres to make space for buildings.',
            'They have been improved with better facilities while keeping their original character.',
            'They have been taken over by large restaurant chains.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'The word "vendors" in paragraph 3 most likely means:',
          options: [
            'people who buy large quantities of food from markets',
            'people who sell products in a market or on the street',
            'people who organise events and festivals in public spaces',
            'people who inspect food quality for the government',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'What do food tours of Colombian markets offer visitors?',
          options: [
            'An opportunity to cook traditional dishes with professional chefs',
            'The chance to taste various dishes and learn about their history',
            'A discount on all food and drinks purchased at the market',
            'Free transport between different markets in the city',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which of the following is NOT mentioned in the text?',
          options: [
            'The names of some tropical fruits available at markets',
            'The economic role of market vendors',
            'The price of typical street food dishes in Colombia',
            'The popularity of food tours among tourists',
          ],
          answer: 2,
        },
      ],
    },

    // ── PARTE 6 ── Comprensión: texto largo (preguntas 31–35) ────────────────
    {
      part: 6,
      title: 'Parte 6 — Comprensión de lectura: texto largo',
      sectionStyle: 'reading',
      passageTitle: 'Nutrition in School Cafeterias: A Growing Concern',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        "NUTRITION IN SCHOOL CAFETERIAS: A GROWING CONCERN\n\nHealth organisations around the world have raised concerns about the quality of food served in school cafeterias. Studies consistently show that many children and teenagers are not getting the nutrition they need during the school day, which can affect their concentration, energy levels, and long-term health.\n\nIn many schools, cafeteria menus are dominated by ultra-processed foods — items high in salt, sugar, and unhealthy fats. Fried snacks, sugary drinks, and fast food options are often cheaper and more convenient to prepare than fresh, nutritious alternatives. As a result, students who rely on the school cafeteria for their main daily meal may be consuming a diet that falls far short of recommended nutritional guidelines.\n\nThe consequences of poor nutrition at school are significant. Hungry or poorly nourished students struggle to stay alert in class. Research has found direct links between nutritional quality at lunchtime and academic performance in afternoon lessons. When students eat a balanced meal, they perform better in tests and are less likely to display behavioural problems.\n\nSeveral schools and local governments have begun to address this problem. In some cities in Colombia, school lunch programmes have been reformed to include more fresh fruit, vegetables, whole grains, and lean proteins. Nutritionists and dietitians work with kitchen staff to create menus that are both nutritious and appealing to young people. In a few schools, students are even involved in planning menus and learning basic cooking skills.\n\nEducation about nutrition is another key element. When students understand why certain foods are beneficial and how their diet affects their body and mind, they are more likely to make healthier choices — not only at school but also at home. Teachers, parents, and school administrators all have a role to play in creating a culture of healthy eating that extends beyond the cafeteria.",
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'What is the main concern described in this text?',
          options: [
            'The high cost of running school cafeterias',
            'The poor quality of nutrition in school cafeterias',
            'The lack of cafeteria space in schools',
            'The preference for fast food among teenagers',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'According to paragraph 2, why are unhealthy foods common in school cafeterias?',
          options: [
            'Students always refuse to eat healthy food at school.',
            'Schools are not allowed to serve fresh food by law.',
            'Ultra-processed foods are cheaper and easier to prepare than nutritious alternatives.',
            'Nutritious food takes too long to eat during a short lunch break.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'According to paragraph 3, what effect does a balanced meal have on students?',
          options: [
            'It makes students want to spend more time in the cafeteria.',
            'It leads to better academic performance and fewer behavioural problems.',
            'It helps students sleep better during their free periods.',
            'It reduces the time students need to finish their homework.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: "The phrase 'falls far short of' in paragraph 2 most likely means:",
          options: [
            'exceeds or goes beyond',
            'is close to but not quite at the level of',
            'is much worse than or does not meet',
            'is equal to or matches',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the final paragraph?',
          options: [
            'Nutrition education is only useful for students who are already overweight.',
            'Teaching students about nutrition can lead to healthier food choices both at school and at home.',
            'Parents have no responsibility for their children\'s eating habits.',
            'Cooking classes should replace sports in the school timetable.',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 7 ── Texto de opinión/argumento (preguntas 36–45) ──────────────
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      sectionStyle: 'reading',
      passageTitle: 'Vegetarianism: Healthy Choice or Difficult Lifestyle?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        "VEGETARIANISM: HEALTHY CHOICE OR DIFFICULT LIFESTYLE?\n\nVegetarianism — the practice of not eating meat — has been growing in popularity around the world over the past two decades. Whether driven by concern for animal welfare, environmental awareness, religious beliefs, or the desire for better health, more and more people are choosing to remove meat from their diet. But is a vegetarian diet truly healthier, and is it realistic for everyone?\n\nThe health arguments in favour of vegetarianism are well supported by research. Vegetarians tend to consume more fibre, more vitamins, and fewer saturated fats than meat-eaters. Large studies have found that vegetarians have lower rates of heart disease, type-2 diabetes, and certain types of cancer. A plant-based diet rich in fruits, vegetables, legumes, nuts, and whole grains is associated with longer and healthier lives.\n\nThe environmental case for reducing meat consumption is equally strong. Meat production — particularly beef — requires large amounts of land, water, and energy. Cattle farming is a major contributor to greenhouse gas emissions, with some estimates suggesting it is responsible for more carbon emissions than all forms of transport combined. Choosing a plant-based diet is, therefore, one of the most effective individual actions a person can take to reduce their environmental impact.\n\nHowever, critics argue that a vegetarian diet requires careful planning to avoid nutritional deficiencies. Important nutrients such as vitamin B12, iron, zinc, and omega-3 fatty acids are found primarily in animal products. Without careful attention to diet, vegetarians may develop deficiencies that lead to fatigue, weakened immunity, or other health problems. Nutritional supplements can address some of these gaps, but not everyone has access to or can afford them.\n\nThere are also social and cultural challenges. In many communities, particularly in rural Colombia and other parts of Latin America, meals are built around meat and are deeply tied to family traditions and local identity. Refusing to eat meat in these contexts can create social difficulties and feelings of exclusion.\n\nFurthermore, access to a varied and nutritious vegetarian diet depends on the availability and affordability of fresh produce. In areas where fresh vegetables, legumes, and alternative protein sources are limited or expensive, maintaining a healthy vegetarian diet can be genuinely difficult.\n\nDespite these challenges, the growing body of evidence suggests that reducing meat consumption — even if not eliminating it entirely — brings real benefits for health and the environment. The concept of 'flexitarianism', which involves mostly plant-based eating with occasional meat, may offer a more accessible and sustainable approach for many people. Ultimately, any step towards eating more plants and less processed food is a step in the right direction.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main question this text addresses?',
          options: [
            'Why is the number of vegetarian restaurants growing worldwide?',
            'Whether a vegetarian diet is healthy and whether it is realistic for everyone',
            'How to plan a balanced vegetarian diet using local ingredients',
            'Whether governments should encourage people to stop eating meat',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, what health benefit is associated with vegetarianism?',
          options: [
            'Vegetarians tend to sleep longer and feel less tired.',
            'Vegetarians have lower rates of heart disease and certain cancers.',
            'A vegetarian diet cures all types of deficiency illnesses.',
            'Vegetarians recover more quickly from injuries than meat-eaters.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'The word "deficiencies" in paragraph 4 most likely means:',
          options: [
            'an excess of certain nutrients in the body',
            'a lack of important nutrients or vitamins needed for good health',
            'a disease caused by eating too much protein',
            'a preference for one type of food over another',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'According to the text, which nutrient important for health is mainly found in animal products?',
          options: [
            'Vitamin C',
            'Calcium',
            'Fibre',
            'Vitamin B12',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'What environmental problem caused by meat production is mentioned in paragraph 3?',
          options: [
            'Excessive use of pesticides that damage water sources',
            'Deforestation caused by growing vegetables for export',
            'Significant greenhouse gas emissions from cattle farming',
            'Plastic packaging waste from processed meat products',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'What social challenge of vegetarianism is described in paragraph 5?',
          options: [
            'Vegetarians are often mocked on social media platforms.',
            'Vegetarian food is generally considered less tasty than meat dishes.',
            'In some communities, refusing to eat meat can cause social difficulties and exclusion.',
            'Schools rarely offer vegetarian options in their canteens.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'What is "flexitarianism", according to the text?',
          options: [
            'A strict form of vegetarianism that also avoids dairy products',
            'A diet that is mostly plant-based but allows occasional meat consumption',
            'A government programme encouraging people to eat less processed food',
            'A meal-planning system that rotates between different diets each week',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'According to paragraph 6, what makes it hard for some people to follow a vegetarian diet?',
          options: [
            'Vegetarian recipes are too complicated to prepare at home.',
            'Fresh vegetables and alternative proteins may be expensive or hard to find in some areas.',
            'Doctors in some regions advise against removing meat from the diet.',
            'Vegetarian food does not provide enough calories for active people.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: "What is the author's overall conclusion?",
          options: [
            'Everyone should immediately adopt a strict vegetarian diet.',
            'Vegetarianism is too difficult for most people and should not be encouraged.',
            'Reducing meat consumption and eating more plants is beneficial, even if done gradually.',
            'The evidence for vegetarianism being healthy is not strong enough to be taken seriously.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: 'Which statement BEST describes the structure of this text?',
          options: [
            'It argues strongly that vegetarianism is the only responsible dietary choice.',
            'It presents only the negative aspects of vegetarianism.',
            'It describes a personal experience of switching to a vegetarian diet.',
            'It examines both the advantages and disadvantages of vegetarianism before suggesting a balanced approach.',
          ],
          answer: 3,
        },
      ],
    },
  ],
};

export default mock;
