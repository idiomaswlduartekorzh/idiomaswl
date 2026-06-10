import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 03
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Salud y cuerpo
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-03',
  examSlug: 'icfes',
  title: 'Mock 3 · Salud y cuerpo',
  subtitle: 'Saber 11 · Componente de Inglés · 45 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [

    // ── PARTE 1 ── Avisos e instrucciones (preguntas 1–5) ────────────────────
    {
      part: 1,
      title: 'Parte 1 — Avisos e instrucciones',
      sectionStyle: 'notices-grid',
      exampleStimulus: 'WASH YOUR HANDS\nBefore and after handling food.\nThank you for helping keep everyone safe.',
      exampleText: 'Where would you most likely see this sign?',
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
            'PRESCRIPTION REQUIRED FOR THIS MEDICATION\nPlease present a valid prescription\nfrom a licensed doctor.\nAsk our staff for assistance.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At a supermarket checkout',
            'At a pharmacy',
            'At a hospital reception',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PLEASE WIPE EQUIPMENT AFTER USE\nCleaning products are available\nat the front desk.\nThank you for keeping our gym clean.',
          text: 'What does this notice ask people to do?',
          options: [
            'Return the equipment to the front desk after using it',
            'Clean the equipment before and after using it',
            'Ask a member of staff to clean the equipment for them',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PATIENTS ONLY BEYOND THIS POINT\nVisitors must wait in the\ndesignated waiting area.\nThank you for your cooperation.',
          text: 'What is the purpose of this notice?',
          options: [
            'To direct visitors to the correct ward',
            'To inform visitors that they cannot go past this point',
            'To warn patients about visiting hours',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'APPOINTMENTS MUST BE CONFIRMED\n24 HOURS IN ADVANCE\nTo cancel or reschedule,\nplease call us on +57 310 000 0000.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At a dental clinic or doctor\'s surgery',
            'At a train station ticket office',
            'At a school administration office',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'NO DIVING IN SHALLOW END\nMaximum depth: 1.2 metres\nPlease read all pool rules before swimming.',
          text: 'What does this sign warn people about?',
          options: [
            'The pool will be closed for cleaning',
            'Diving is forbidden in the shallow part of the pool',
            'Children must be accompanied by an adult at all times',
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
      topic: 'Body',
      exampleText: 'The long line of small bones running down the middle of your back.',
      exampleAnswer: 'spine',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'The passage at the back of the mouth through which food and air pass.',
          options: ['ankle', 'elbow', 'knee', 'shoulder', 'throat', 'wrist', 'chest'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'The joint in the middle of your leg, where it bends.',
          options: ['ankle', 'elbow', 'knee', 'shoulder', 'throat', 'wrist', 'chest'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'The joint connecting your arm to your body at the top.',
          options: ['ankle', 'elbow', 'knee', 'shoulder', 'throat', 'wrist', 'chest'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'The joint between your hand and the lower part of your arm.',
          options: ['ankle', 'elbow', 'knee', 'shoulder', 'throat', 'wrist', 'chest'],
          answer: 5,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'The joint that connects your foot to your leg.',
          options: ['ankle', 'elbow', 'knee', 'shoulder', 'throat', 'wrist', 'chest'],
          answer: 0,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'I have an appointment with the doctor today.',
      exampleOptions: ['I hope it goes well.', 'Doctors are very busy.', 'I feel great today.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: 'I have had a headache all day.',
          text: '',
          options: ['Drink some water and rest.', 'Take a shower right away.', 'Eat more vegetables.'],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: 'My doctor says I need to exercise more.',
          text: '',
          options: ['Doctors are often wrong.', 'Exercise is always boring.', 'That is good advice.'],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'I think I am getting a cold.',
          text: '',
          options: ['You should stay warm.', 'Colds are quite fun.', 'I feel the same way.'],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: 'The hospital is very crowded today.',
          text: '',
          options: ['I love busy hospitals.', 'There must be many patients.', "Let's go tomorrow instead."],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'I forgot to take my vitamins this morning.',
          text: '',
          options: ['You can take them now.', 'Vitamins are completely useless.', 'I never take them either.'],
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
        "Colombia is a country with a great variety of (16) ___ that grow in different climates, from tropical regions to high mountain areas. Together with (17) ___, these natural foods form the basis of a healthy national diet. However, health experts are worried that many Colombians are consuming too much (18) ___ and processed food. Doctors recommend drinking at least eight glasses of (19) ___ per day to stay healthy and avoid dehydration. Nutritionists also stress the importance of eating a good (20) ___ to give the body the energy it needs to start the day well. Foods rich in (21) ___, such as chicken, beans, and eggs, help build strong muscles and support body repair. A balanced diet provides (22) ___ for daily activities and helps prevent long-term illness. Health professionals suggest eating at least three nutritious (23) ___ each day and avoiding excessive snacking between them.",
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['fruits', 'products', 'animals', 'flowers'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['salt', 'oil', 'vegetables', 'grains'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['fibre', 'sugar', 'calcium', 'starch'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['juice', 'milk', 'water', 'tea'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['lunch', 'dinner', 'snack', 'breakfast'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['fat', 'vitamin', 'protein', 'mineral'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['weight', 'appetite', 'energy', 'growth'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['meals', 'dishes', 'portions', 'servings'],
          answer: 0,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'The Benefits of Regular Exercise for Teenagers',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        "THE BENEFITS OF REGULAR EXERCISE FOR TEENAGERS\n\nDoctors and health experts agree that regular physical activity is one of the best things a teenager can do for their health. Despite this, studies show that many young people are not getting enough exercise.\n\nThe physical benefits of exercise are well known. It helps maintain a healthy weight, strengthens muscles and bones, and improves heart and lung function. Regular activity also reduces the risk of developing conditions such as type-2 diabetes and high blood pressure later in life.\n\nHowever, the mental benefits of exercise are just as important. When you exercise, your brain releases chemicals called endorphins, which create feelings of happiness and reduce stress. Many teenagers who exercise regularly report sleeping better and feeling more confident at school.\n\nSports and team activities offer additional benefits beyond physical fitness. Working with others towards a shared goal teaches teamwork, communication, and discipline. These skills are useful not only in sport but also in academic and professional life.\n\nHealth organisations recommend that teenagers do at least 60 minutes of moderate physical activity every day. This does not have to mean going to the gym — walking, cycling, dancing, and even playing with friends all count.\n\nBuilding a habit of regular exercise during the teenage years can have positive effects that last a lifetime. The earlier young people start, the greater the long-term benefits for their health and wellbeing.",
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main idea of this text?',
          options: [
            'Teenagers should join a gym to improve their fitness.',
            'Regular exercise brings many physical and mental benefits for teenagers.',
            'Schools should replace academic lessons with physical activity.',
            'Most teenagers already get enough exercise in their daily lives.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'According to paragraph 2, which of the following is a physical benefit of exercise?',
          options: [
            'Improved memory and concentration',
            'Stronger muscles and bones',
            'Better social skills and friendships',
            'Reduced feelings of stress and anxiety',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'What are endorphins, according to the text?',
          options: [
            'Medicines that doctors prescribe for teenagers',
            'Chemicals released by the brain during exercise that improve mood',
            'Vitamins found in healthy food that help concentration',
            'Hormones that are only produced during sleep',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'What benefit of team sports is mentioned in paragraph 4?',
          options: [
            'It helps teenagers win competitions at school.',
            'It reduces the amount of time spent studying.',
            'It develops teamwork and communication skills.',
            'It guarantees a career in professional sport.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'How much exercise do health organisations recommend for teenagers each day?',
          options: [
            'At least 30 minutes',
            'At least 60 minutes',
            'At least 90 minutes',
            'At least 2 hours',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'According to the text, which of the following counts as physical activity?',
          options: [
            'Playing video games with friends',
            'Studying at the library',
            'Walking and cycling',
            'Sleeping for eight hours',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'The phrase "a habit of regular exercise" in paragraph 6 suggests that:',
          options: [
            'exercise should be forced on teenagers by their parents',
            'doing exercise every day leads to long-term health benefits',
            'teenagers who do not exercise will definitely become ill',
            'exercise must always be done with a coach or trainer',
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
      passageTitle: 'A Community Health Centre in Cali',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        "A COMMUNITY HEALTH CENTRE IN CALI\n\nIn a busy neighbourhood on the eastern side of Cali, a small building with a bright green door has become one of the most important places in the community. It is the Centro de Salud Comunitario — a free health clinic that serves hundreds of local families every week.\n\nThe clinic was founded eight years ago by Dr. Adriana Solano, a doctor who grew up in the same neighbourhood and wanted to give something back to her community. At the time, the nearest public hospital was over thirty minutes away by bus, and many residents could not afford private medical care. Dr. Solano began operating from a single room with just two nurses. Today, the clinic has five consultation rooms, a small pharmacy, and a team of twelve health professionals.\n\nThe services offered are completely free for patients. They include general medical consultations, vaccinations, maternal health checks, dental screenings, and nutrition advice. Every Thursday, the clinic also offers a health education session for teenagers, covering topics such as mental health, healthy eating, and physical activity.\n\nFunding for the clinic comes from a combination of donations from local businesses and grants from the city government. Dr. Solano says that keeping the clinic running is a constant challenge, but the results make it worthwhile. 'Last year, we helped over four thousand patients,' she says. 'Many of them had never seen a doctor before.'\n\nThe clinic has become a model for other communities in the city. Several neighbourhood groups have visited to learn about the model and are working to establish similar centres in their own areas. For the residents of this eastern district of Cali, the green door represents something much more than just a health centre — it represents hope.",
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'Why did Dr. Solano decide to open the clinic?',
          options: [
            'She wanted to earn more money than she could in a private hospital.',
            'The city government asked her to set up a health centre.',
            'She wanted to provide free healthcare for her community, where access was difficult.',
            'She had failed to find a job in a public hospital.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'How has the clinic changed since it first opened?',
          options: [
            'It moved to a larger building in the city centre.',
            'It now charges a small fee for its services.',
            'It has grown from one room with two nurses to a team of twelve professionals.',
            'It stopped offering services and became a training centre for doctors.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'What do the Thursday sessions at the clinic focus on?',
          options: [
            'Training adults how to give first aid at home',
            'Teaching teenagers about health topics such as mental health and nutrition',
            'Providing vaccinations for children under five',
            'Offering free consultations for elderly patients',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: "The phrase 'keeping the clinic running is a constant challenge' suggests that:",
          options: [
            'Dr. Solano is thinking of closing the clinic soon.',
            'The clinic has too many patients and cannot help everyone.',
            'Securing enough funding to maintain the clinic is an ongoing difficulty.',
            'The clinic\'s staff are not well trained for their roles.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the final paragraph?',
          options: [
            "The clinic's model is unique and cannot be repeated elsewhere.",
            'The city government will take over the clinic in the near future.',
            'The success of the clinic has inspired other communities to create similar health centres.',
            'Dr. Solano plans to expand the clinic to other cities in Colombia.',
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
      passageTitle: "Screen Time and Its Effects on Young People's Health",
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        "SCREEN TIME AND ITS EFFECTS ON YOUNG PEOPLE'S HEALTH\n\nIn today's world, it is almost impossible to avoid screens. Smartphones, tablets, laptops, and televisions are present in nearly every home, and young people spend more time looking at them than any previous generation. While technology offers many advantages, growing concern exists about the health effects of excessive screen time on children and teenagers.\n\nPhysical health is one area that researchers have studied closely. Children who spend many hours sitting in front of screens are less likely to engage in physical activity. This sedentary lifestyle is linked to weight gain, poor posture, and weakened muscles. Eye specialists have also noted a significant increase in vision problems among young people, which many attribute to prolonged exposure to screens at close range.\n\nSleep is another area of concern. The blue light emitted by screens interferes with the production of melatonin, the hormone that signals to the body that it is time to sleep. Many teenagers admit to using their phones in bed late at night, which delays the start of sleep and reduces its quality. Insufficient sleep is associated with poor concentration, irritability, and reduced academic performance.\n\nMental health professionals are equally concerned. Several studies have found links between heavy social media use and increased rates of anxiety and depression, particularly in girls aged 11 to 16. The constant comparison with idealised images online, along with cyberbullying, can have lasting negative effects on self-esteem.\n\nHowever, it is important to recognise that not all screen time is harmful. Educational programmes, video calls with family and friends, and creative activities such as making videos or learning to code can all have genuine benefits. The key distinction is between passive screen use — simply scrolling and watching — and active, purposeful engagement with technology.\n\nExperts recommend that parents and schools work together to set clear guidelines around screen use. This includes creating screen-free times, such as during meals and one hour before bedtime, and encouraging young people to balance digital activities with outdoor play, reading, and face-to-face socialising.\n\nThe challenge is not to eliminate screens — that would be neither realistic nor desirable. The goal is to help young people develop healthy habits that allow them to benefit from technology without being harmed by it.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the central concern discussed in this text?',
          options: [
            'The cost of electronic devices for families on low incomes',
            'How excessive screen time can negatively affect young people\'s health',
            'Why teenagers prefer social media to face-to-face communication',
            'The lack of educational content available online for children',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, what physical problem is linked to too much screen time?',
          options: [
            'Hearing loss from using headphones',
            'Skin problems caused by sitting indoors',
            'Weight gain from a sedentary lifestyle',
            'Breathing difficulties from poor air quality indoors',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'What is melatonin, according to paragraph 3?',
          options: [
            'A type of blue light produced by screens',
            'A chemical found in food that improves concentration',
            'A hormone that tells the body it is time to sleep',
            'A vitamin that protects the eyes from screen damage',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'The word "sedentary" in paragraph 2 most likely means:',
          options: [
            'involving a lot of movement and physical effort',
            'involving little physical movement; mostly sitting',
            'related to studying and academic work',
            'connected to social interaction and communication',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'According to paragraph 4, which group is most affected by mental health problems linked to social media?',
          options: [
            'Boys aged 14 to 18',
            'Girls aged 11 to 16',
            'Children under the age of 10',
            'University students aged 18 to 22',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'What distinction does the author make in paragraph 5?',
          options: [
            'The difference between free and paid digital content',
            'The difference between passive screen use and active, purposeful engagement',
            'The difference between screens used for work and screens used for fun',
            'The difference between social media and educational websites',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'Which of the following is given as an example of beneficial screen use?',
          options: [
            'Watching television programmes for several hours a day',
            'Scrolling through social media feeds before sleeping',
            'Learning to code or making creative videos',
            'Playing online games with strangers',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'What do experts recommend regarding screen use before bedtime?',
          options: [
            'Teenagers should not use any screens after 6 pm.',
            'Screens should be turned off at least one hour before going to sleep.',
            'Parents should lock all devices at night using parental controls.',
            'Schools should provide information about the effects of screens.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: "What is the author's conclusion about screens?",
          options: [
            'All screens should be banned for children under 16.',
            'Technology is too harmful for young people to use safely.',
            'The goal is to help young people use technology in healthy, balanced ways.',
            'Parents are solely responsible for managing their children\'s screen time.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: 'Which statement BEST describes the overall tone of this text?',
          options: [
            'Alarming — the author believes screens are destroying young people\'s health.',
            'Dismissive — the author thinks the dangers of screens are exaggerated.',
            'Balanced — the author acknowledges both risks and benefits while calling for moderation.',
            'Optimistic — the author believes technology will solve health problems in the future.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
