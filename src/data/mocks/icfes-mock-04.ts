import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 04
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Escuela y educación
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-04',
  examSlug: 'icfes',
  title: 'Mock 4 · Escuela y educación',
  subtitle: 'Saber 11 · Componente de Inglés · 45 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [

    // ── PARTE 1 ── Avisos e instrucciones (preguntas 1–5) ────────────────────
    {
      part: 1,
      title: 'Parte 1 — Avisos e instrucciones',
      sectionStyle: 'notices-grid',
      exampleStimulus: 'QUIET ZONE\nPlease keep noise to a minimum.\nOthers are studying.',
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
            'BOOKS MUST BE RETURNED WITHIN 2 WEEKS\nFines will be charged for late returns.\nPlease ask at the desk if you need to renew a loan.',
          text: 'Where would you see this notice?',
          options: [
            'At a school cafeteria',
            'In a library',
            'In a classroom',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'NO ELECTRONIC DEVICES PERMITTED\nMobile phones, tablets, and smartwatches\nmust be switched off and put away.\nThank you.',
          text: 'What does this notice require students to do?',
          options: [
            'Use their devices in silent mode only',
            'Turn off and put away all electronic devices',
            'Leave their devices at the school office',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'STUDENTS MUST SHOW THEIR ID CARD TO BUY MEALS\nNo ID card, no service.\nReplacement cards available at the administration office.',
          text: 'What is the purpose of this notice?',
          options: [
            'To inform students that meals are free this week',
            'To tell students they must present their ID card when buying food',
            'To advertise new menu options in the cafeteria',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'SPORTS SHOES MUST BE WORN AT ALL TIMES\nNo sandals or bare feet in this area.\nFor your safety, please follow this rule.',
          text: 'Where would you most likely find this notice?',
          options: [
            'In a science laboratory',
            'At a school sports hall or gymnasium',
            'In the school library',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'SAVE YOUR WORK BEFORE LOGGING OUT\nUnsaved documents will be lost.\nLog out completely when you finish.',
          text: 'What does this sign warn users about?',
          options: [
            'Their work will be deleted if they do not save it before logging out',
            'They must print their work before leaving the room',
            'They are not allowed to save files on the computer',
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
      topic: 'School',
      exampleText: 'A period of about six months that makes up one half of the school year.',
      exampleAnswer: 'semester',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'A printed or digital schedule showing when each class takes place during the week.',
          options: ['assignment', 'classroom', 'dictionary', 'essay', 'laboratory', 'subject', 'timetable'],
          answer: 6,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'A piece of writing on a particular topic, usually several paragraphs long.',
          options: ['assignment', 'classroom', 'dictionary', 'essay', 'laboratory', 'subject', 'timetable'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'A room equipped with scientific equipment for experiments and practical work.',
          options: ['assignment', 'classroom', 'dictionary', 'essay', 'laboratory', 'subject', 'timetable'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'An area of knowledge taught as a course in school, such as maths or history.',
          options: ['assignment', 'classroom', 'dictionary', 'essay', 'laboratory', 'subject', 'timetable'],
          answer: 5,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'A task or piece of work that a student must complete as part of their studies.',
          options: ['assignment', 'classroom', 'dictionary', 'essay', 'laboratory', 'subject', 'timetable'],
          answer: 0,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'Did you understand the teacher\'s explanation?',
      exampleOptions: ['Yes, I got it completely.', 'Teachers work hard.', 'I prefer science.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: 'I forgot to do my homework.',
          text: '',
          options: ['You should tell the teacher.', 'I always forget mine too.', 'Homework is optional.'],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: 'The maths test is tomorrow.',
          text: '',
          options: ["Maths is my favourite subject.", "We should study tonight.", "Tests are always easy."],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'Our teacher is absent today.',
          text: '',
          options: ['She never comes to school.', 'I prefer that anyway.', 'We have a free class then.'],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: 'I got the highest mark in the class.',
          text: '',
          options: ['Congratulations!', 'That is perfectly normal.', 'I scored even higher.'],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'Can I borrow your notes from yesterday?',
          text: '',
          options: ['I lost them somewhere.', 'Of course, here they are.', 'I never take notes.'],
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
        "Colombia has made great progress in education over recent decades. Today, millions of (16) ___ attend both public and private institutions across the country. Public (17) ___ are funded by the state and offer education that is largely (18) ___ for families who cannot afford to pay. Well-qualified (19) ___ play a key role in providing quality education, especially in rural (20) ___ where resources can be limited. After completing secondary education, many young people aspire to enter (21) ___ to continue their professional training. In Colombia, secondary education lasts approximately five (22) ___, after which students take the Saber 11 exam. The (23) ___ has invested in expanding access to education, particularly through scholarship programmes for students from low-income backgrounds.",
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['students', 'children', 'parents', 'workers'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['hospitals', 'offices', 'schools', 'centres'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['expensive', 'selective', 'free', 'optional'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['teachers', 'directors', 'officers', 'advisors'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['cities', 'regions', 'districts', 'zones'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['university', 'college', 'school', 'academy'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['months', 'terms', 'semesters', 'years'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['community', 'government', 'society', 'industry'],
          answer: 1,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'Online Learning: Opportunities and Challenges',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        "ONLINE LEARNING: OPPORTUNITIES AND CHALLENGES\n\nIn recent years, online learning has become an increasingly common way for people to study. The rise of platforms that offer video lessons, interactive exercises, and live classes has made it possible for anyone with an internet connection to access high-quality education from anywhere in the world.\n\nOne of the biggest advantages of online learning is flexibility. Students can study at their own pace and at a time that suits their schedule. This is particularly useful for people who work or have family responsibilities. Instead of travelling to a physical school, learners can join a class from their bedroom or even from a café.\n\nOnline platforms also provide access to courses that might not be available locally. A student in a small town in Colombia can study the same content as a student in London or New York. This has helped reduce educational inequality in many parts of the world.\n\nHowever, online learning also presents significant challenges. Without face-to-face interaction with a teacher, some students feel isolated and find it difficult to stay motivated. Technical problems, such as slow internet connections or broken devices, can also prevent students from fully participating.\n\nFurthermore, not all students have equal access to technology. In many rural areas of Colombia and other developing countries, reliable internet connections and modern devices are not available to everyone. This digital divide risks widening the gap between students who have access to technology and those who do not.\n\nDespite these challenges, most education experts agree that online learning is here to stay. The key is to design programmes that are engaging, accessible, and combined with human support so that all students can benefit.",
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main topic of this text?',
          options: [
            'The history of computers and the internet in education',
            'The advantages and disadvantages of online learning',
            'How to choose the best online course for your career',
            'The role of teachers in modern digital classrooms',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'According to the text, why is flexibility an advantage of online learning?',
          options: [
            'Students can choose their own teachers and subjects.',
            'It allows students to take exams multiple times.',
            'Students can study at a time and pace that fits their life.',
            'Online courses are always cheaper than traditional classes.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'The text says online learning has helped "reduce educational inequality". What does this mean?',
          options: [
            'Online learning has made education more expensive for some groups.',
            'Students in different locations can now access the same educational content.',
            'Schools in cities are now better than schools in the countryside.',
            'Online platforms give students certificates that are more valuable than school diplomas.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'What is the "digital divide" mentioned in paragraph 5?',
          options: [
            'The difference in quality between online and traditional education',
            'The gap between students who understand technology and those who do not',
            'The inequality between students who have access to technology and those who do not',
            'The problem of students using technology to cheat in exams',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'Which of the following is mentioned as a challenge of online learning?',
          options: [
            'Courses that are too long and require too much reading',
            'Students feeling isolated without face-to-face interaction',
            'Teachers who are not qualified to teach online',
            'Platforms that charge very high fees for courses',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'What do education experts say about the future of online learning?',
          options: [
            'It will completely replace traditional classroom education.',
            'It is likely to continue and grow as part of education.',
            'It should only be used by university students, not school pupils.',
            'It has already failed and will disappear in the next few years.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which statement BEST summarises the text?',
          options: [
            'Online learning is perfect and should replace all traditional education.',
            'Online learning offers clear benefits but also faces real challenges, especially around access and motivation.',
            'The internet has made education unnecessary for most young people.',
            'Only students in rich countries can benefit from online learning.',
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
      passageTitle: 'A Student Exchange Programme in Colombia',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        "A STUDENT EXCHANGE PROGRAMME IN COLOMBIA\n\nEvery year, a group of Colombian secondary school students has the opportunity to spend three months living and studying abroad through the Puentes Educativos exchange programme. The programme, which has been running for twelve years, allows students aged 15 to 17 to live with a host family and attend a local school in either Canada, Germany, or Australia.\n\nThe selection process is competitive. Students must demonstrate academic achievement, a good level of English or German, and the ability to adapt to new environments. Those who are selected undergo a three-day preparation course before departure, covering topics such as cultural differences, safety, and how to communicate with their host families.\n\nParticipants in the programme report a wide range of benefits. Many say it significantly improved their language skills, as they were forced to communicate in a foreign language every day. Others highlight the personal growth that comes from living independently away from home for the first time. Several former participants have gone on to pursue international careers or university studies abroad.\n\nHost families are carefully selected and trained to provide a welcoming environment. Each student is assigned a local student as a 'school buddy' — a classmate who helps them navigate the new school system and social environment.\n\nThe programme is funded partly by the Colombian Ministry of Education and partly through a competitive scholarship process. Families who are accepted but cannot afford the travel costs may apply for additional financial support.\n\nCoordinators of the programme emphasise that the benefits extend beyond the individual students. Schools that participate often report increased interest in foreign languages, and teachers who host returning students note a positive influence on classroom discussions about global topics.",
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'What is the Puentes Educativos programme?',
          options: [
            'An online language course for Colombian students',
            'A programme that allows Colombian students to study abroad for three months',
            'A scheme that brings foreign teachers to work in Colombian schools',
            'A competition for Colombian students to win university scholarships',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'What must students demonstrate to be selected for the programme?',
          options: [
            'A good academic record, language skills, and adaptability',
            'Experience living away from their family before',
            'Permission from their school principal and parents',
            'A personal project about the country they wish to visit',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'What is the role of a "school buddy" in the programme?',
          options: [
            'A teacher who supports the student with academic work',
            'A programme coordinator who monitors the student\'s progress',
            'A local student who helps the exchange student adapt to school life',
            'A member of the host family who accompanies the student to school',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'The text says participants experience "personal growth". What does this most likely mean?',
          options: [
            'They become taller and physically stronger during the programme.',
            'They develop as individuals by facing challenges and becoming more independent.',
            'They receive formal recognition for their achievements abroad.',
            'They grow more interested in academic subjects at school.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the final paragraph?',
          options: [
            'Returning students have a positive effect on the schools they come back to.',
            'The programme is too expensive and needs more government funding.',
            'Most Colombian schools are not interested in international exchange.',
            'Foreign language learning has declined in Colombian schools.',
          ],
          answer: 0,
        },
      ],
    },

    // ── PARTE 7 ── Texto de opinión/argumento (preguntas 36–45) ──────────────
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      sectionStyle: 'reading',
      passageTitle: 'Should Mobile Phones Be Allowed in Schools?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        "SHOULD MOBILE PHONES BE ALLOWED IN SCHOOLS?\n\nThe question of whether students should be permitted to bring mobile phones to school is one that many education systems are actively debating. Attitudes vary greatly: some schools have introduced total bans, while others take a more permissive approach that allows devices to be used for educational purposes. As with most debates in education, there are strong arguments on both sides.\n\nThose in favour of allowing mobile phones in school point to the educational potential of these devices. Smartphones can be powerful learning tools — they give students instant access to dictionaries, calculators, research databases, and educational apps. When used responsibly, they can enrich lessons and help students develop digital literacy, a skill that is increasingly important in the modern workforce.\n\nProponents also argue that banning phones is unrealistic in the digital age. Young people use their devices constantly outside school, and teaching them to manage their phone use responsibly, rather than simply prohibiting it, better prepares them for adult life. Furthermore, parents often want their children to have phones for safety reasons, so that they can be contacted before and after school.\n\nHowever, opponents of allowing phones in school argue that the disadvantages clearly outweigh the benefits. Research consistently shows that the presence of a mobile phone — even when turned off — reduces a student's ability to concentrate. The temptation to check messages, browse social media, or play games is a significant distraction during lessons.\n\nThere are also concerns about cyberbullying, as phones make it easier for students to send harmful messages during the school day. Additionally, expensive devices can create visible differences in wealth among students, which can cause social tensions within classrooms.\n\nSeveral countries and regions have moved to restrict or ban phones in schools based on evidence that this improves academic performance, particularly for lower-achieving students who are most easily distracted. In France, a national ban on phones for all students under 15 was introduced in 2018, and initial studies suggested a positive effect on learning outcomes.\n\nThe evidence suggests that schools need clear, consistent policies about phone use. A complete ban may be the most effective solution for younger students, while older students might benefit from structured guidelines that teach responsible use. Ultimately, the goal must always be to create an environment where every student can learn effectively without unnecessary distraction.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main debate discussed in this text?',
          options: [
            'Whether schools should teach students how to build their own mobile phones',
            'Whether students should be allowed to have mobile phones at school',
            'Whether parents should control what their children do on their phones',
            'Whether technology companies should design phones specifically for students',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, what is one educational benefit of smartphones?',
          options: [
            'They allow teachers to communicate with students outside school hours.',
            'They provide students with instant access to dictionaries and research tools.',
            'They make it easier for schools to organise timetables and exams.',
            'They help students communicate with classmates in other countries.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'The word "proponents" in paragraph 3 most likely means:',
          options: [
            'people who are against an idea',
            'people who research a topic',
            'people who support an idea',
            'people who are neutral about an issue',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'According to paragraph 4, why can phones be harmful even when switched off?',
          options: [
            'They emit radiation that affects students\' health.',
            'Their presence alone reduces students\' ability to concentrate.',
            'They are often stolen, causing conflict between students.',
            'They prevent teachers from using electronic equipment in the classroom.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'What social problem related to phones is mentioned in paragraph 5?',
          options: [
            'Students using phones to photograph teachers without permission',
            'Phones creating visible inequality in wealth among students',
            'Students selling phones to each other during school hours',
            'Phones causing arguments between students and teachers',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'What happened in France in 2018?',
          options: [
            'The government gave all school students a free smartphone.',
            'Schools were required to use smartphones in every lesson.',
            'A national ban on phones for students under 15 was introduced.',
            'French schools adopted a policy allowing phones only in breaks.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'What does the author suggest about the effect of banning phones?',
          options: [
            'Banning phones has no measurable effect on student performance.',
            'Banning phones appears to improve academic performance, especially for weaker students.',
            'Banning phones creates conflicts between students and school authorities.',
            'Banning phones forces students to use their devices more outside school.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'The phrase "digital literacy" in paragraph 2 most likely means:',
          options: [
            'the ability to read and write using traditional methods',
            'knowing how to read digital books and e-books',
            'the ability to use digital technology effectively and responsibly',
            'a qualification students receive after completing computer science classes',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: "What is the author's conclusion about mobile phone policies in schools?",
          options: [
            'All schools everywhere should immediately ban phones for all age groups.',
            'Phones should be allowed freely because they are too useful to restrict.',
            'Schools need clear policies: bans may work for younger students, while older students may need guidelines for responsible use.',
            'The debate about phones in schools cannot be resolved because the research is unclear.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: 'Which statement BEST describes the structure of this text?',
          options: [
            'It gives only the arguments in favour of allowing phones in school.',
            'It describes a scientific experiment on the effects of phones.',
            'It presents arguments both for and against phones in school and concludes with a recommendation.',
            'It tells the personal story of a student who lost their phone at school.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
