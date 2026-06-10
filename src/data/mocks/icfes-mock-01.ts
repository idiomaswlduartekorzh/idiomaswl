import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-01',
  examSlug: 'icfes',
  title: 'Mock 1 · Vida cotidiana y ciudad',
  subtitle: 'Saber 11 · Componente de Inglés · 45 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [
    // ── PARTE 1 — Avisos e instrucciones (5q, 3 opciones) ──────────────────
    {
      part: 1,
      title: 'Parte 1 — Avisos e instrucciones',
      instructions:
        'Look at the following signs and notices. Choose the place where you would most likely see each one.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PLEASE DO NOT FEED THE ANIMALS\nThank you for keeping them safe and healthy.',
          text: 'Where would you most likely see this notice?',
          options: ['In a restaurant', 'In a zoo or wildlife park', 'At a train station'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'QUIET PLEASE\nExaminations in progress.\nStudents must not be disturbed.',
          text: 'Where would you most likely see this sign?',
          options: ['In a supermarket', 'At a sports field', 'At a school or university'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'CAUTION — WET FLOOR\nPlease use the other entrance.\nCleaning in progress.',
          text: 'Where would you most likely see this sign?',
          options: [
            'In an office or shopping mall',
            'At a beach',
            'On a highway',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'DANGER — HIGH VOLTAGE\nDo not touch.\nAuthorized personnel only.',
          text: 'Where would you most likely see this sign?',
          options: [
            'Near electrical equipment or a power station',
            'In a hospital waiting room',
            'At a public swimming pool',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'SALE NOW ON!\nUp to 50% off all winter clothing.\nThis weekend only. While stocks last.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At a bus terminal',
            'In a clothing store or shopping center',
            'At a hospital',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 2 — Vocabulario: relacionar palabras (5q, banco A–G) ─────────
    {
      part: 2,
      title: 'Parte 2 — Vocabulario: relacionar palabras',
      instructions:
        'Match each description with the correct word from the box. There are two extra words you do not need to use.',
      sectionNote:
        'A. schedule   B. receipt   C. commute   D. pharmacist   E. crosswalk   F. fine   G. volunteer',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'A marked area painted on the road where pedestrians can safely cross the street.',
          options: [
            'A. schedule',
            'B. receipt',
            'C. commute',
            'D. pharmacist',
            'E. crosswalk',
            'F. fine',
            'G. volunteer',
          ],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'A document given to a customer as proof of payment after buying something.',
          options: [
            'A. schedule',
            'B. receipt',
            'C. commute',
            'D. pharmacist',
            'E. crosswalk',
            'F. fine',
            'G. volunteer',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'A trained health professional who works in a pharmacy and prepares and sells medicines.',
          options: [
            'A. schedule',
            'B. receipt',
            'C. commute',
            'D. pharmacist',
            'E. crosswalk',
            'F. fine',
            'G. volunteer',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'A list that shows the times when services such as buses, trains, or events take place.',
          options: [
            'A. schedule',
            'B. receipt',
            'C. commute',
            'D. pharmacist',
            'E. crosswalk',
            'F. fine',
            'G. volunteer',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'A sum of money that a person must pay as a punishment for breaking a rule or law.',
          options: [
            'A. schedule',
            'B. receipt',
            'C. commute',
            'D. pharmacist',
            'E. crosswalk',
            'F. fine',
            'G. volunteer',
          ],
          answer: 5,
        },
      ],
    },

    // ── PARTE 3 — Diálogos (5q, 3 opciones) ───────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      instructions:
        'Read each conversation and choose the best response to complete it.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulusStyle: 'dialog-box',
          stimulus:
            'Customer: "Excuse me, do you have this jacket in a larger size?"\nShop assistant: ________',
          text: 'What does the shop assistant say?',
          options: [
            "I'll check in the stockroom for you.",
            'The jackets are on the second floor.',
            'We accept returns within 30 days.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulusStyle: 'dialog-box',
          stimulus:
            'María: "I haven\'t seen you in ages! How have you been?"\nCarlos: "Pretty good, actually. I just started a new job."\nMaría: ________',
          text: 'What does María say next?',
          options: [
            'What time do you usually get there?',
            "That's great! What do you do now?",
            "I've been looking for a job too.",
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulusStyle: 'dialog-box',
          stimulus:
            'Receptionist: "Good morning. How can I help you?"\nPatient: "I\'d like to make an appointment with Dr. Gómez, please."\nReceptionist: ________',
          text: 'What does the receptionist say?',
          options: [
            'Are you a new or returning patient?',
            'Dr. Gómez is very experienced.',
            'Our clinic closes at 6 p.m.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulusStyle: 'dialog-box',
          stimulus:
            'Tom: "Should I bring anything to the party?"\nLisa: "Just yourself! Everything is taken care of."\nTom: ________',
          text: 'What does Tom say?',
          options: [
            'How many people are coming?',
            "That's a relief! See you there.",
            'I can bring some food if you like.',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulusStyle: 'dialog-box',
          stimulus:
            'Teacher: "Your project is due next Friday."\nStudent: "Excuse me, can we hand it in earlier if we\'re finished?"\nTeacher: ________',
          text: 'What does the teacher say?',
          options: [
            'Of course. You can submit it whenever you are ready.',
            'The project must be at least five pages long.',
            "Yes, we'll discuss the topics tomorrow.",
          ],
          answer: 0,
        },
      ],
    },

    // ── PARTE 4 — Completar el texto (cloze, 8q) ──────────────────────────
    {
      part: 4,
      title: 'Parte 4 — Completar el texto',
      instructions:
        'Read the text below. Choose the word (A, B, C or D) that best fits each blank.',
      passage:
        'The Medellín Metro is an important (1) ___ of the city\'s public transport system. It connects different parts of the city and helps thousands of people (2) ___ from one place to another every day. The metro has two lines that cross in the center of the city. To use it, passengers need to buy a prepaid card (3) ___ a station or through an app. The card can be recharged (4) ___ any of the 27 stations on the network. The metro runs (5) ___ five in the morning until eleven at night. During rush hours, trains can (6) ___ very crowded, especially between 7 and 9 in the morning. Many commuters (7) ___ to arrive earlier to avoid the crowds. The metro was created to (8) ___ the traffic problems that affected the city for many years.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (1).',
          options: ['piece', 'part', 'section', 'area'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (2).',
          options: ['travel', 'walked', 'commuted', 'move'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (3).',
          options: ['in', 'at', 'on', 'by'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (4).',
          options: ['every', 'all', 'any', 'each'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (5).',
          options: ['from', 'since', 'between', 'during'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (6).',
          options: ['be', 'become', 'get', 'turn'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (7).',
          options: ['prefer', 'want', 'plan', 'decide'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (8).',
          options: ['fix', 'avoid', 'increase', 'reduce'],
          answer: 3,
        },
      ],
    },

    // ── PARTE 5 — Texto corto: comprensión (7q) ───────────────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      instructions:
        'Read the following text and answer the questions. Choose the best option (A, B, C or D).',
      passage:
        "In recent years, urban gardening has become very popular in Bogotá. Many residents have started growing their own vegetables on rooftops, balconies, and even in small shared spaces in their neighborhoods.\n\nThe trend began as a way to access fresh food at lower costs. However, it has grown into much more than that. Community gardens have become meeting points where neighbors share seeds, exchange knowledge, and build stronger relationships. In some districts, schools have also created garden spaces to teach students about nature and healthy eating.\n\nThe city government has supported the movement by offering workshops and donating gardening materials to low-income communities. These programs aim to improve both food security and community well-being.\n\nHowever, urban gardening also presents challenges. Limited space, pollution, and water access are common problems, especially in densely populated areas. Some experts argue that without proper planning, gardens in polluted urban environments could actually make produce less safe to eat.\n\nDespite these concerns, most participants report that urban gardening has had a positive impact on their lives. They mention benefits such as reduced grocery bills, improved mental health, and a greater sense of community.",
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main topic of the text?',
          options: [
            'The history of farming in Colombia',
            'A growing trend in city gardens and its effects',
            'How the government controls food production',
            'The problems with pollution in Bogotá',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'According to the text, why did urban gardening first start in Bogotá?',
          options: [
            'To protect the local environment',
            'Because schools encouraged it as a project',
            'To access fresh food at lower prices',
            'As a government-funded initiative',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'What role have community gardens played in neighborhoods?',
          options: [
            'They have replaced traditional food markets.',
            'They have helped people connect and share knowledge.',
            'They have reduced crime rates significantly.',
            'They have created new jobs for local residents.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'What support has the city government provided to the urban gardening movement?',
          options: [
            'It built new parks with large garden areas.',
            'It reduced taxes for garden supply stores.',
            'It offered workshops and donated gardening materials.',
            'It made it compulsory for schools to create gardens.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'What is one challenge that urban gardening faces in big cities?',
          options: [
            'Too many volunteers without proper coordination',
            'Lack of public interest in growing vegetables',
            'Limited space and difficulty accessing water',
            'Very high prices for imported plant seeds',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'What concern do some experts have about urban gardens in polluted areas?',
          options: [
            'Gardens could attract insects into homes.',
            'Produce grown there might not be safe to eat.',
            'Urban gardens reduce available green spaces.',
            'Growing vegetables inside wastes too much energy.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'What does the word "densely" mean in paragraph 4?',
          options: ['Slowly', 'Recently', 'Heavily', 'Carefully'],
          answer: 2,
        },
      ],
    },

    // ── PARTE 6 — Texto largo: inferencia (5q) ────────────────────────────
    {
      part: 6,
      title: 'Parte 6 — Comprensión de lectura: texto largo',
      instructions:
        'Read the following text and answer the questions. Some answers require you to infer information from the text.',
      passage:
        "Access to technology is no longer a luxury — for many people, it is a necessity. Yet millions around the world, including many in Colombia, still lack reliable internet access and digital devices. This gap is known as the 'digital divide,' and it continues to grow as society becomes increasingly dependent on technology.\n\nIn rural areas, poor infrastructure means that internet connections are often slow or nonexistent. Even when connectivity exists, high device costs and data plans make them unaffordable for low-income families. In cities, the situation is somewhat better, but significant inequalities remain between wealthy and poor neighborhoods.\n\nEducation has been one of the areas most severely impacted. During the COVID-19 pandemic, schools across Colombia moved to online learning. Students with computers and internet access could continue their studies, while others fell behind or dropped out entirely. This widening gap threatens to deepen existing social inequalities for an entire generation.\n\nExperts argue that providing hardware and connectivity is not enough. Teachers must also receive training, and communities must develop the digital skills needed to benefit from online resources.\n\nWithout access to digital tools, people are excluded from educational opportunities, job markets, and civic participation. Bridging this gap is essential — not only for individual advancement, but for the development of society as a whole.",
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: "What is the 'digital divide,' according to the text?",
          options: [
            'The difference between digital and printed media',
            'The unequal access people have to technology',
            'The gap between cheap and expensive devices',
            'The inability of governments to regulate the internet',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'Why is internet access more difficult in rural areas?',
          options: [
            'People there prefer traditional communication methods.',
            'Governments have not passed laws to support rural connectivity.',
            'Internet infrastructure is often weak or nonexistent.',
            'Rural families cannot apply for government subsidy programs.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'What happened to students without internet access during the COVID-19 pandemic?',
          options: [
            'They were provided with free devices by the government.',
            'They studied through radio and television instead.',
            'They fell behind or left school entirely.',
            'They performed better thanks to parental support at home.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'What do experts say is needed beyond simply providing internet access?',
          options: [
            'Newer and faster devices for every student',
            'Digital skills training for people and teachers',
            'Lower subscription prices for internet services',
            'More public libraries equipped with computers',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: "What does 'bridging' this gap mean, according to the last paragraph?",
          options: [
            'Building physical roads and bridges between cities',
            'Investing in faster transport infrastructure',
            'Reducing the inequality in access to technology',
            'Connecting national governments through digital platforms',
          ],
          answer: 2,
        },
      ],
    },

    // ── PARTE 7 — Texto de opinión/argumento (10q) ────────────────────────
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      instructions:
        'Read the following opinion text and answer the questions. Choose the best option (A, B, C or D).',
      passage:
        "Over the past decade, social media has transformed the way we communicate, share information, and experience the world. Platforms like Instagram, TikTok, and YouTube have given ordinary people extraordinary tools to connect, create, and influence. But as these platforms have grown, so have concerns about their impact on society. The question many governments, educators, and citizens are now asking is: should social media be regulated — and if so, how?\n\nThose who support regulation argue that social media companies have failed to protect their users, particularly young people. Studies have linked heavy social media use to anxiety, depression, and poor sleep quality among teenagers. Additionally, misinformation spreads rapidly on these platforms, sometimes with dangerous consequences, as seen during the COVID-19 pandemic. Supporters of regulation believe that platforms should be legally required to monitor harmful content and limit addictive features.\n\nOpponents of regulation, however, warn that government control of social media could threaten freedom of expression. If governments decide what content is acceptable, they could potentially use this power to silence criticism or suppress political opposition. History offers many examples of countries where media censorship has been used as a tool of oppression.\n\nA middle ground proposed by some experts is independent oversight — a body made up of legal experts, journalists, and civil society representatives who could review complaints about social media content without direct government involvement. This approach aims to balance user protection with freedom of expression.\n\nThe debate is far from resolved. What is clear, however, is that the current situation — where a handful of private companies make decisions that affect billions of people — is increasingly difficult to justify. Whether through regulation, independent oversight, or corporate self-regulation, meaningful change is needed.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main purpose of this text?',
          options: [
            'To explain how social media platforms make money',
            'To discuss different perspectives on regulating social media',
            'To argue that social media should be banned for teenagers',
            'To describe the history of internet platforms',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'What do supporters of regulation believe platforms should do?',
          options: [
            'Stop operating for users under the age of 18',
            'Cooperate fully with government censorship teams',
            'Monitor harmful content and reduce addictive features',
            'Focus only on positive and educational content',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'According to the text, what is one effect of heavy social media use on teenagers?',
          options: [
            'It significantly reduces their interest in academic work.',
            'It makes them spend more quality time with their families.',
            'It can lead to anxiety and poor sleep quality.',
            'It makes them more responsible technology users.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'Why do those who oppose regulation worry about government control?',
          options: [
            'Regulation would make social media platforms more expensive.',
            'It could be used to silence criticism or opposition.',
            'Governments do not understand how social media algorithms work.',
            'Regulation would slow down technological progress.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'What does the word "misinformation" in paragraph 2 most likely mean?',
          options: [
            'Correct information that very few people believe',
            'Information shared at very high speed online',
            'False or inaccurate information',
            'Information that governments keep secret',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'What is the "middle ground" proposed by some experts?',
          options: [
            'Allowing social media companies to regulate themselves freely',
            'Blocking all controversial platforms in certain countries',
            'Creating an independent body to review content complaints',
            'Giving governments full authority to monitor all communications',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'What does "suppress" in paragraph 3 most likely mean?',
          options: [
            'Encourage or promote openly',
            'Publish and share widely',
            'Prevent from being seen or heard',
            'Explain clearly to the public',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: "What is the author's view of the current situation with social media?",
          options: [
            'It is working well and needs no changes.',
            'Social media companies are already doing enough to protect users.',
            'Having a few private companies control so much influence is hard to justify.',
            'Governments are already taking the right steps to address the problem.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: 'What conclusion does the author reach?',
          options: [
            'The debate will soon be resolved by international law.',
            'Corporate self-regulation is the most effective solution.',
            'Meaningful change is needed, though the best approach is still debated.',
            'Regulation is impossible without seriously limiting free expression.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: 'What would be the BEST title for this text?',
          options: [
            'Why Social Media Is Dangerous for Young People',
            'The History of Government Control of the Internet',
            'Regulating Social Media: Risks, Benefits, and Alternatives',
            'How Social Media Companies Protect Their Users',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
