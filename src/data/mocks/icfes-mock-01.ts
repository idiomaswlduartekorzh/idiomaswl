import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 01
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Basado en el formato oficial del cuadernillo ICFES
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-01',
  examSlug: 'icfes',
  title: 'Mock 1 · Lugares, personas y comunidad',
  subtitle: 'Saber 11 · Componente de Inglés · 45 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [

    // ── PARTE 1 ── Avisos e instrucciones (preguntas 1–5) ────────────────────
    // Formato real: el aviso aparece en recuadro, la pregunta pregunta
    // "¿Dónde podría usted ver este aviso?" o "¿Cuál es el propósito?"
    // 3 opciones (A, B, C). Nivel A1–A2.
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
            'SILENCE PLEASE\nMobile phones must be switched off.\nEating and drinking are not permitted in this area.',
          text: 'Where could you find this notice?',
          options: [
            'In a café or restaurant',
            'In a library or study room',
            'At a bus station',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'CLOSING DOWN SALE\nEverything must go!\nUp to 70% off all items.\nLast day: Saturday 30th.',
          text: 'What is the purpose of this notice?',
          options: [
            'To announce the opening of a new store',
            'To inform customers about a discount before the store closes',
            'To warn people that the store is full',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'VISITING HOURS: 2:00 PM – 7:00 PM\nMaximum 2 visitors per patient.\nChildren under 12 must be accompanied by an adult.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At a school entrance',
            'In a hotel lobby',
            'At a hospital or clinic',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'IN CASE OF FIRE\nDo not use the lift.\nUse the stairs.\nProceed to the nearest exit.',
          text: 'What does this notice tell you to do?',
          options: [
            'Call the building manager immediately',
            'Take the lift to leave the building faster',
            'Use the stairs and go to the nearest exit',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'KEEP OFF THE GRASS\nThis area is under maintenance.\nThank you for your cooperation.',
          text: 'Where would you most likely see this sign?',
          options: [
            'Inside a supermarket',
            'In a park or public garden',
            'At an airport',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 2 ── Vocabulario: cuadrícula de emparejamiento (preguntas 6–10) ─
    // Formato real ICFES: 8 palabras (A–H), H = ejemplo, 2 de A–G sobran.
    // options = las 7 palabras A–G (sin prefijo de letra).
    // El componente MatchingGrid las combina con exampleAnswer para la columna derecha.
    // Nivel A2.
    {
      part: 2,
      title: 'Parte 2 — Vocabulario',
      sectionStyle: 'matching-grid',
      topic: 'Health',
      exampleText: 'Some people feel this pain in the stomach area, often after eating bad food.',
      exampleAnswer: 'stomachache',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'You make this sound when something irritates the inside of your throat.',
          options: ['cough', 'fever', 'headache', 'medicine', 'rash', 'sneeze', 'wound'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'When you have this, your body temperature becomes much higher than normal.',
          options: ['cough', 'fever', 'headache', 'medicine', 'rash', 'sneeze', 'wound'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'You take this when you are ill to help your body recover and feel better.',
          options: ['cough', 'fever', 'headache', 'medicine', 'rash', 'sneeze', 'wound'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'Small red spots that appear on the skin, often caused by an allergy or insect bite.',
          options: ['cough', 'fever', 'headache', 'medicine', 'rash', 'sneeze', 'wound'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'A cut or broken area on the skin, usually caused by an accident or injury.',
          options: ['cough', 'fever', 'headache', 'medicine', 'rash', 'sneeze', 'wound'],
          answer: 6,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    // Formato real ICFES: una frase dicha por persona A → el estudiante
    // elige la mejor respuesta (A, B o C). Sin texto auxiliar de pregunta.
    // Nivel A2.
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'I think I am getting sick.',
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: "We're from London.",
          text: '',
          options: ['Not at all.', 'Yes, please.', 'How interesting.'],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: 'I hate basketball.',
          text: '',
          options: ['You are, too.', 'I do, too.', 'It can, too.'],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'I hope Andrew will get here soon.',
          text: '',
          options: ["I hope he hasn't.", 'He usually gets it.', "I'm sure he will."],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: "John's broken this plate.",
          text: '',
          options: ["It doesn't matter.", 'Here you are.', "That's very good."],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'When do you study?',
          text: '',
          options: ['At school.', 'In the evenings.', 'In the library.'],
          answer: 1,
        },
      ],
    },

    // ── PARTE 4 ── Completar el texto (preguntas 16–23) ──────────────────────
    // Formato real: texto corrido con 8 espacios numerados. 4 opciones (A–D).
    // Nivel B1. Tópico: cotidiano, contexto colombiano.
    {
      part: 4,
      title: 'Parte 4 — Completar el texto',
      instructions:
        'Read the text below. Choose the word (A, B, C, or D) that best fits each blank (questions 16 to 23).',
      passage:
        'TransMilenio is the main bus (16) ___ in Bogotá, Colombia\'s capital city. It carries over two million passengers every (17) ___, making it one of the busiest urban transport systems in the world. To use it, passengers need to buy a (18) ___ card that they can reload with money at any station. The buses travel in (19) ___ lanes that are separated from the rest of the traffic. This allows them to (20) ___ faster than regular city buses. Each station has large, covered platforms (21) ___ passengers wait for the next bus. During rush hours the system can become very (22) ___. Despite this, most commuters consider TransMilenio the (23) ___ way to travel across the city.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['service', 'system', 'network', 'route'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['moment', 'hour', 'day', 'week'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['gold', 'prepaid', 'personal', 'special'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['narrow', 'separate', 'dedicated', 'private'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['travel', 'drive', 'walk', 'ride'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['when', 'which', 'where', 'that'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['busy', 'crowded', 'noisy', 'slow'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['fast', 'quick', 'fastest', 'quicker'],
          answer: 2,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    // Formato real: texto ~220 palabras. 7 preguntas, 4 opciones (A–D).
    // Mezcla: comprensión directa, inferencia, vocabulario en contexto.
    // Nivel B1.
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        'THE INTERNATIONAL PEN PAL PROJECT\n\nEvery year, thousands of young people around the world take part in the International Pen Pal Project. The programme connects students from different countries so that they can practise foreign languages and learn about other cultures.\n\nStudents who join are matched with a partner in another country. They exchange letters or emails about their daily lives, schools, hobbies, and countries. Many participants say the experience has helped them improve their English while also making new friends.\n\nCarlos, a 16-year-old student from Cali, joined the project two years ago and was matched with a student in Canada. At first, he found it difficult to write in English. But after several months of regular correspondence, his writing improved greatly. "I feel much more confident now," he says. "My pen pal has told me a lot about life in Canada, and I have told her about Colombia."\n\nThe project is coordinated by a network of teachers in more than 40 countries. There is no cost to participate, and students can join at any time during the school year. Teachers who want to register their class can visit the project\'s official website.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main purpose of the International Pen Pal Project?',
          options: [
            'To help students win scholarships to study abroad',
            'To connect students so they can practise languages and learn about cultures',
            'To train teachers in foreign language instruction',
            'To promote international tourism among young people',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'What do students share through the project?',
          options: [
            'Books and school supplies',
            'Money and gifts from their countries',
            'Letters or emails about their lives and interests',
            'Photographs and short videos',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'How did Carlos benefit from the project?',
          options: [
            'He won a scholarship to study in Canada.',
            'His English writing improved and he became more confident.',
            'He visited his pen pal in Canada.',
            'He started working as a project coordinator.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'The phrase "regular correspondence" in paragraph 3 most likely means:',
          options: [
            'travelling frequently to visit friends abroad',
            'attending English classes every week',
            'exchanging messages consistently over a period of time',
            'having telephone conversations in English',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'How many countries are part of the project?',
          options: [
            'Fewer than 20',
            'Exactly 30',
            'More than 40',
            'More than 100',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'What should a teacher do to register their class?',
          options: [
            'Write a letter to the project headquarters',
            'Pay a registration fee',
            'Ask students to find their own pen pals',
            'Visit the project\'s official website',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which of the following is NOT mentioned as a benefit of the project?',
          options: [
            'Improving language skills',
            'Making new friends in other countries',
            'Receiving a language certificate',
            'Learning about other cultures',
          ],
          answer: 2,
        },
      ],
    },

    // ── PARTE 6 ── Comprensión: texto largo (preguntas 31–35) ────────────────
    // Formato real: texto ~320 palabras. 5 preguntas de inferencia. Nivel B1.
    {
      part: 6,
      title: 'Parte 6 — Comprensión de lectura: texto largo',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        'MAKING A DIFFERENCE: THE GREEN NEIGHBOURHOOD PROJECT\n\nWhen residents of a small community in Medellín decided they were tired of the rubbish piling up in their streets, they did not wait for the government to act. Instead, they created their own solution.\n\nThree years ago, a group of neighbours launched the Green Neighbourhood Project. The idea was simple: encourage people to separate their waste and bring recyclable materials to a central collection point every Saturday morning. At first, only about twenty families participated. Today, more than two hundred households take part regularly.\n\nThe project is run entirely by volunteers. Each week, a team of residents sorts the collected materials — plastic, glass, paper, and metal — and prepares them for collection by a local recycling company. The money the community receives is used to buy plants and materials to improve the local park.\n\nOne of the founders, Rosa Martínez, says the biggest challenge in the beginning was convincing people that their actions could make a difference. "Many people thought it was useless," she explains. "They said one person\'s rubbish couldn\'t change anything. But now they can see the results."\n\nThe project has attracted attention from other communities in the city, and several similar initiatives have started in nearby areas. Local schools have also invited Rosa and her team to give talks about environmental responsibility.\n\nThe project shows that community-led environmental action can have real and lasting results — not only for the environment, but also for the sense of pride and unity within a neighbourhood.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'What problem did the community want to solve?',
          options: [
            'Lack of green spaces in the neighbourhood',
            'The accumulation of rubbish in their streets',
            'Air pollution from nearby factories',
            'Shortage of water in the area',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'How has the project changed since it began?',
          options: [
            'It now receives funding from the city government.',
            'It has expanded to other cities in Colombia.',
            'The number of participating households has grown significantly.',
            'The collection point is now open every day.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'What does the community do with the money it receives from the recycling company?',
          options: [
            'They pay the volunteers who sort the materials.',
            'They buy plants and materials for the local park.',
            'They invest it in starting projects in other areas.',
            'They donate it to local schools.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'What was the biggest challenge the project faced at the beginning?',
          options: [
            'Finding a recycling company willing to work with them',
            'Getting permission from the local government',
            'Convincing people that individual actions could make a difference',
            'Organising enough volunteers to sort the waste',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the last two paragraphs?',
          options: [
            'The Green Neighbourhood Project is the largest recycling project in Colombia.',
            'The project\'s success has inspired similar efforts in other communities.',
            'Environmental problems in Medellín have been completely solved.',
            'The city government will soon take over management of the project.',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 7 ── Texto de opinión/argumento (preguntas 36–45) ──────────────
    // Formato real: texto ~440 palabras, argumentativo. 10 preguntas, 4 opciones.
    // Mezcla: propósito del autor, argumento, vocabulario, referencia, inferencia.
    // Nivel B1–B2.
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        'SMARTPHONES AND YOUNG PEOPLE: A QUESTION OF BALANCE\n\nIt is difficult to imagine modern life without a smartphone. These devices allow us to communicate, access information, and entertain ourselves in ways that were unimaginable just twenty years ago. Yet, as smartphones have become common among teenagers — and even younger children — debate has grown about their effects on young people\'s development, health, and social skills.\n\nThose who support teenagers having smartphones argue that the benefits are clear. A smartphone gives young people access to educational resources and communication tools, and allows them to stay in contact with family at all times. Many parents say that giving their child a smartphone makes them feel safer, as they can always reach their child. Furthermore, learning to use digital technology responsibly is an important skill in today\'s world.\n\nOn the other hand, critics point to growing research suggesting that heavy smartphone use is linked to problems such as poor concentration, sleep disturbance, and social isolation. When teenagers spend hours scrolling through social media, they often miss out on face-to-face interaction, physical activity, and creative hobbies. Some studies have also found connections between social media use and increased levels of anxiety, particularly among young girls.\n\nSchools have responded in different ways. Some have introduced complete smartphone bans during school hours, arguing that phones are a major distraction to learning. Others have chosen a more flexible approach, allowing students to use their devices for educational purposes only.\n\nExperts in child development generally agree that the key issue is not whether teenagers have smartphones, but how they use them. Setting clear rules about screen time, encouraging offline activities, and having open conversations about online experiences are all strategies that can help young people develop a healthy relationship with technology.\n\nUltimately, smartphones are neither good nor bad in themselves. Like many powerful tools, their impact depends on how, when, and for what purpose they are used.',
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main topic of this text?',
          options: [
            'How smartphones were invented and developed over time',
            'The advantages of smartphones for students at school',
            'Different views on teenagers using smartphones',
            'How governments should control smartphone use',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, why do some parents support giving smartphones to their children?',
          options: [
            'Smartphones help children complete their homework faster.',
            'Parents can always contact their children through the device.',
            'Children can earn money through social media platforms.',
            'Parents want their children to be popular among their peers.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'The word "critics" in paragraph 3 refers to:',
          options: [
            'teachers who do not allow phones in their classrooms',
            'parents who think smartphones are too expensive',
            'people who believe smartphones have negative effects on teenagers',
            'experts who study how technology companies make profit',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'According to the text, what is one negative effect of heavy smartphone use?',
          options: [
            'Teenagers forget how to study without technology.',
            'Teenagers spend too much money on applications.',
            'Teenagers may have difficulty concentrating and sleeping well.',
            'Teenagers become less interested in social media over time.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'The phrase "miss out on" in paragraph 3 most likely means:',
          options: [
            'fail to enjoy or experience something',
            'become very excited about something',
            'improve a skill through practice',
            'learn to deal with a difficulty',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'How have schools reacted to smartphone use among students?',
          options: [
            'All schools around the world have banned smartphones completely.',
            'Most schools allow students to use smartphones freely during lessons.',
            'Schools have taken different approaches to managing phone use.',
            'Schools have asked parents to buy educational smartphones only.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'What do child development experts say is the most important issue?',
          options: [
            'The age at which teenagers receive their first smartphone',
            'How teenagers use their smartphones, not simply whether they have them',
            'The total number of hours teenagers spend on social media per day',
            'Whether teenagers are allowed to use smartphones at school',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'The word "scrolling" in paragraph 3 most likely means:',
          options: [
            'downloading files from the internet',
            'moving through content on a screen',
            'sending text messages to friends',
            'searching for specific information online',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: "What is the author's conclusion about smartphones?",
          options: [
            'Smartphones are clearly more harmful than beneficial for teenagers.',
            'The debate about smartphones has no real solution.',
            'Schools should make all decisions about how teenagers use smartphones.',
            'The impact of smartphones depends on how and for what purpose they are used.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: 'Which statement BEST summarises the author\'s position?',
          options: [
            'Smartphones should be banned until teenagers are 18 years old.',
            'Smartphones are useful tools, but responsible use and clear guidelines are needed.',
            'Schools and governments are responsible for all decisions about smartphone use.',
            'The research on smartphones and teenagers is not reliable enough to act on.',
          ],
          answer: 1,
        },
      ],
    },
  ],
};

export default mock;
