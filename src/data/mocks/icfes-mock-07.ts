import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 07
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Tecnología e internet
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-07',
  examSlug: 'icfes',
  title: 'Mock 7 · Tecnología e internet',
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
            'COMPUTER LAB\nLOG OUT WHEN YOU FINISH — DO NOT LEAVE SESSIONS OPEN\nFailure to comply may result in loss of access.',
          text: 'What does this notice tell users to do?',
          options: [
            'Turn off all the computers when they leave',
            'Close their account when they finish using the lab',
            'Sign out of the computer after they have finished',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PHONE STORE\nALL PHONES ON DISPLAY ARE LOCKED — ASK STAFF FOR ASSISTANCE\nThank you for your patience.',
          text: 'What should customers do if they want to look at a phone?',
          options: [
            'Unlock the phone themselves',
            'Ask a member of staff for help',
            'Read the instruction manual next to the phone',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'LIBRARY\nNO FOOD OR DRINKS NEAR THE COMPUTERS\nHelp us keep the equipment in good condition.',
          text: 'What is the purpose of this notice?',
          options: [
            'To remind people to eat before entering the library',
            'To protect the computer equipment from damage',
            'To encourage people to use the library café area',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'SCHOOL\nMOBILE PHONES MUST BE KEPT IN BAGS DURING CLASS\nStudents who break this rule will lose their phone for the day.',
          text: 'Where would you most likely see this notice?',
          options: [
            'In a shopping centre',
            'In a school classroom',
            'At a train station',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'OFFICE\nDO NOT SHARE YOUR PASSWORD WITH ANYONE\nIf you think your account has been compromised, contact IT immediately.',
          text: 'What is the main message of this notice?',
          options: [
            'Staff should create new passwords every week',
            'Staff should keep their passwords private and secure',
            'Staff should ask IT for a new password each month',
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
      topic: 'Technology',
      exampleText: 'To copy data or a file from the internet to your device.',
      exampleAnswer: 'download',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'The flat surface of a device, such as a phone or computer, where images and text are displayed.',
          options: ['battery', 'cable', 'keyboard', 'password', 'screen', 'software', 'storage'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'A set of keys arranged in rows that you press to type text or commands into a computer.',
          options: ['battery', 'cable', 'keyboard', 'password', 'screen', 'software', 'storage'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'A device inside a phone or laptop that stores electrical energy and powers it when unplugged.',
          options: ['battery', 'cable', 'keyboard', 'password', 'screen', 'software', 'storage'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'Programs and applications that are installed on a computer or device and make it function.',
          options: ['battery', 'cable', 'keyboard', 'password', 'screen', 'software', 'storage'],
          answer: 5,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'A secret word or combination of characters used to access a protected account or device.',
          options: ['battery', 'cable', 'keyboard', 'password', 'screen', 'software', 'storage'],
          answer: 3,
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
          stimulus: 'My phone battery dies every afternoon.',
          text: '',
          options: [
            'You should charge it more often.',
            'Batteries are very expensive.',
            'Buy a completely new phone.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: "I can't remember my email password.",
          text: '',
          options: [
            'Create a completely new email account.',
            'Passwords are unnecessary these days.',
            'Try resetting it online.',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: "There's no Wi-Fi signal in this area.",
          text: '',
          options: [
            'I never use Wi-Fi anyway.',
            'We can use mobile data instead.',
            'The internet is overrated.',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: 'My computer crashed and I lost all my work.',
          text: '',
          options: [
            'You should save your files more often.',
            'Computers always break down eventually.',
            'That work was not important anyway.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'I spend four hours a day on social media.',
          text: '',
          options: [
            'I spend even more than that.',
            'Social media is very important.',
            'That might be too much time.',
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
        "Mobile (16) ___ have changed the way people communicate. In the 1990s, they were large and heavy, and were used only for voice (17) ___. By the 2000s, they had become smaller and started to include basic (18) ___ access. Today, smartphones include high-quality (19) ___ and allow users to do almost anything, from banking to watching films. They have become extremely (20) ___ among people of all ages. One of the biggest concerns about modern phones is the time people spend on (21) ___ media. Many young people find it difficult to imagine life without these devices. They connect people across the (22) ___ and have transformed healthcare, education, and business. As (23) ___ continues to develop, future phones will be even more powerful than today's.",
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['phones', 'screens', 'cables', 'keyboards'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['travel', 'messages', 'communication', 'connection'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['radio', 'internet', 'television', 'newspaper'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['radios', 'printers', 'batteries', 'cameras'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['rare', 'popular', 'complicated', 'expensive'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['social', 'digital', 'online', 'public'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['city', 'school', 'world', 'office'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['science', 'fashion', 'art', 'technology'],
          answer: 3,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'Coding Classes in Colombian Schools',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        "CODING CLASSES IN COLOMBIAN SCHOOLS\n\nIn 2022, the Colombian government announced a national initiative to introduce coding and programming classes in secondary schools across the country. The programme, called Código Colombia, aims to prepare young people for the digital economy by giving them the skills needed to work in technology-related fields.\n\nAs part of the initiative, the Ministry of Education partnered with several technology companies to provide training for teachers. Over twelve thousand teachers from public schools participated in workshops where they learned how to teach basic programming languages such as Scratch and Python. The government also provided computers and tablets to schools in rural and lower-income areas, where access to technology has historically been limited.\n\nStudents who have participated in the programme report that they enjoy learning to code. Many say that programming makes them think more creatively and helps them solve problems in new ways. Some students have already created their own simple applications and websites.\n\nExperts believe that digital skills will be essential in the job market of the future. According to recent data, Colombia will need hundreds of thousands of technology professionals in the next decade. Programmes like Código Colombia are seen as a crucial step in meeting this demand and reducing the gap between Colombia's digital capacity and that of more technologically developed countries.",
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main goal of the Código Colombia programme?',
          options: [
            'To teach students how to use social media safely',
            'To prepare young people with skills for the digital economy',
            'To replace all traditional subjects with computer science',
            'To help Colombian schools buy new computers',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'How were teachers prepared to teach coding?',
          options: [
            'They studied at universities for two years.',
            'They learned through online videos independently.',
            'They attended workshops organised with technology companies.',
            'They were replaced by professional programmers.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'Why were computers and tablets provided to rural schools in particular?',
          options: [
            'Rural schools have more students than city schools.',
            'Rural students are more interested in technology.',
            'Access to technology in those areas has traditionally been limited.',
            'The government wanted to test new equipment in rural areas first.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'According to paragraph 3, how has coding affected students?',
          options: [
            'It has made them more interested in maths and science.',
            'It has helped them think more creatively and solve problems.',
            'It has reduced the time they spend on social media.',
            'It has encouraged them to study abroad.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'The word "crucial" in the final paragraph most likely means:',
          options: [
            'interesting but not necessary',
            'extremely important',
            'difficult to achieve',
            'well known and popular',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'What does the text say about Colombia\'s future technology workforce?',
          options: [
            'Colombia already has enough technology professionals.',
            'Colombia will need hundreds of thousands more technology workers.',
            'Most Colombian students are not interested in technology jobs.',
            'Colombia plans to hire technology experts from other countries.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which of the following is NOT mentioned in the text?',
          options: [
            'The names of programming languages taught in the programme',
            'The number of teachers who received training',
            'How much money the government spent on the programme',
            'The types of projects students have already created',
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
      passageTitle: 'Artificial Intelligence in Education',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        "ARTIFICIAL INTELLIGENCE IN EDUCATION\n\nArtificial intelligence, commonly known as AI, is beginning to transform education in ways that were impossible to imagine just a decade ago. From personalised learning platforms to automated marking systems, AI tools are being introduced in schools and universities around the world — and Colombia is no exception.\n\nOne of the most promising applications of AI in education is the development of adaptive learning software. These programmes analyse a student's performance in real time and adjust the difficulty and type of content accordingly. If a student struggles with a particular grammar rule or mathematical concept, the platform will provide additional practice exercises automatically. This means that students can learn at their own pace, without having to wait for a teacher to notice their difficulties.\n\nTeachers, however, have mixed feelings about AI in the classroom. Many appreciate that automated tools can save time on administrative tasks such as grading routine exercises, freeing them to focus on more meaningful activities with their students. Others worry that an over-reliance on AI could reduce the human connection that is central to effective teaching. They argue that no algorithm can replace the empathy, creativity, and experience that a skilled teacher brings to the classroom.\n\nPrivacy is another concern. AI learning platforms collect large amounts of data about students — their strengths, weaknesses, habits, and progress. Questions remain about who owns this data, how it is stored, and whether it could be misused in the future.\n\nDespite these concerns, most education experts agree that AI is here to stay. The challenge is not whether to use it, but how to use it wisely — in ways that support teachers rather than replace them, and that protect students' rights and wellbeing.",
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'What is the main idea of the text?',
          options: [
            'AI has already replaced most teachers in Colombian schools.',
            'AI in education offers benefits but also raises important concerns.',
            'Students learn better when they use AI instead of textbooks.',
            'AI is too expensive for most schools to use effectively.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'How does adaptive learning software help students?',
          options: [
            'It allows students to choose the subjects they want to study.',
            'It connects students with private tutors around the world.',
            'It adjusts content and difficulty based on each student\'s performance.',
            'It sends reports about student progress directly to parents.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'According to paragraph 3, what do some teachers worry about regarding AI?',
          options: [
            'AI tools are too difficult for most teachers to learn to use.',
            'Over-reliance on AI could reduce the human connection in teaching.',
            'AI programmes make students less willing to study independently.',
            'AI systems cost schools too much money to maintain.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'What privacy concern does the text mention?',
          options: [
            'AI platforms share student data with other students.',
            'Students\' personal photos are stored without permission.',
            'Questions remain about who owns student data and how it is used.',
            'AI systems give teachers access to students\' private messages.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the final paragraph about the author\'s view?',
          options: [
            'AI should be removed from all schools immediately.',
            'AI can be beneficial in education if it is used thoughtfully.',
            'Teachers should be replaced by AI as quickly as possible.',
            'The risks of AI in education are too great to ignore.',
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
      passageTitle: 'Is Technology Making Us Less Social?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        "IS TECHNOLOGY MAKING US LESS SOCIAL?\n\nA few decades ago, the idea of spending an entire evening at home, communicating with dozens of people from around the world without leaving your sofa, would have seemed extraordinary. Today, it is completely normal. The rise of smartphones, social media, and instant messaging has transformed how we interact — but has it made us more social, or less?\n\nSome people argue that technology has made us more connected than ever before. Social media platforms allow people to maintain friendships across great distances. Messaging apps let families separated by migration keep in close contact. Online communities bring together people who share interests or experiences, giving a sense of belonging to individuals who might feel isolated in their local environment. For many, especially those who are shy, technology provides a safer and less intimidating space to communicate.\n\nCritics, however, point to a different reality. While we may be sending more messages than ever, many researchers argue that the quality of our social interactions has declined. Face-to-face conversations require active listening, empathy, and the reading of body language — skills that are not exercised when we type short messages or post images online. Studies have found that heavy social media users often report feeling lonely and disconnected, despite spending hours interacting online.\n\nThere is also the issue of phubbing — the habit of looking at your phone while in the company of other people. Research shows that even the visible presence of a smartphone on a dinner table reduces the quality of the conversation, as people are distracted by the device.\n\nThe truth is probably more nuanced than either side admits. Technology can enrich our social lives when it is used to complement face-to-face relationships, but it becomes harmful when it begins to substitute them. Like most tools, its value depends entirely on how we choose to use it.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What central question does this text explore?',
          options: [
            'How smartphones were designed and developed',
            'Whether technology has made people more or less social',
            'Which social media platform is the most popular',
            'How messaging apps have changed the business world',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, what is one way technology helps families?',
          options: [
            'It allows families to save money on travel.',
            'It helps families separated by migration stay in close contact.',
            'It enables families to watch television together online.',
            'It gives families access to cheaper healthcare services.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'The word "intimidating" in paragraph 2 most likely means:',
          options: [
            'boring and repetitive',
            'expensive and difficult to access',
            'making someone feel nervous or afraid',
            'requiring a lot of technical skill',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'What argument do critics make about the quality of online social interactions?',
          options: [
            'Online interactions are more honest than face-to-face ones.',
            'Online messages are more creative than verbal conversations.',
            'The quality of interactions has declined even though the quantity has increased.',
            'Online communication is only effective for professional relationships.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'According to paragraph 3, which skills are NOT exercised when we type messages online?',
          options: [
            'Reading, writing, and spelling',
            'Active listening, empathy, and reading body language',
            'Logical thinking and problem-solving',
            'Creativity and imagination',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'What does the term "phubbing" refer to?',
          options: [
            'Sending rude messages to other people online',
            'Using a phone to record conversations without permission',
            'Looking at your phone while in the company of other people',
            'Spending too many hours playing games on a smartphone',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'According to the research mentioned in paragraph 4, what effect does a phone on the table have?',
          options: [
            'People talk more because they feel more relaxed.',
            'People argue more about topics they have read online.',
            'The quality of the conversation is reduced.',
            'People finish their meals faster than usual.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'The word "nuanced" in the final paragraph most likely means:',
          options: [
            'completely wrong and based on false data',
            'more complex and less extreme than it first appears',
            'very simple and easy for everyone to understand',
            'based on scientific research and evidence',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: "According to the author, when does technology become harmful to social life?",
          options: [
            'When it is used by children under the age of twelve',
            'When it is used in schools and workplaces',
            'When it substitutes face-to-face relationships rather than complementing them',
            'When people spend more than two hours a day using it',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: "Which statement BEST summarises the author's conclusion?",
          options: [
            'Technology is making society far less social and should be restricted.',
            'The impact of technology on social life depends on how people use it.',
            'Social media is always harmful and should be avoided completely.',
            'Face-to-face communication is no longer necessary in the modern world.',
          ],
          answer: 1,
        },
      ],
    },
  ],
};

export default mock;
