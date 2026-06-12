import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 09
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Trabajo y carrera
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-09',
  examSlug: 'icfes',
  title: 'Mock 9 · Trabajo y carrera',
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
            'OFFICE\nTHIS AREA IS FOR STAFF ONLY\nUnauthorised persons must not enter.',
          text: 'Who is allowed to enter this area?',
          options: [
            'Anyone who has an appointment',
            'Only employees who work there',
            'Visitors who sign in at reception',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'JOB CENTRE\nTAKE A NUMBER AND WAIT TO BE CALLED\nDo not approach the desk without a number.',
          text: 'What does this notice tell people to do?',
          options: [
            'Go directly to the nearest available desk',
            'Wait outside until their name is announced',
            'Take a number and wait until they are called',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'FACTORY\nSAFETY GOGGLES MUST BE WORN AT ALL TIMES\nProtective equipment is available at the entrance.',
          text: 'What is the purpose of this notice?',
          options: [
            'To inform workers about goggles available to purchase',
            'To remind workers to wear eye protection for safety',
            'To tell visitors that the factory is closed',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'RECRUITMENT AGENCY\nPLEASE BRING YOUR CV AND TWO FORMS OF ID\nAppointments without documents cannot be processed.',
          text: 'What must job seekers bring when they visit?',
          options: [
            'A reference letter and a bank statement',
            'Their CV and two forms of identification',
            'A completed application form and a photograph',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'STAFF CANTEEN\nSTAFF MUST SWIPE THEIR CARD BEFORE ENTERING\nVisitors are not permitted in this area.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At the entrance to a public café',
            'At the door of a staff dining area',
            'Outside a supermarket checkout',
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
      topic: 'Work',
      exampleText: 'When an employee is given a higher position and usually more money at work.',
      exampleAnswer: 'promotion',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'A formal meeting in which an employer asks a candidate questions to decide if they are suitable for a job.',
          options: ['applicant', 'colleague', 'contract', 'interview', 'overtime', 'resume', 'salary'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'The fixed amount of money an employee receives regularly, usually paid each month, for their work.',
          options: ['applicant', 'colleague', 'contract', 'interview', 'overtime', 'resume', 'salary'],
          answer: 6,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'A person who works in the same organisation or team as you.',
          options: ['applicant', 'colleague', 'contract', 'interview', 'overtime', 'resume', 'salary'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'A written legal agreement between an employer and employee that sets out the terms of the job.',
          options: ['applicant', 'colleague', 'contract', 'interview', 'overtime', 'resume', 'salary'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'A document that lists a person\'s education, work experience, and skills, used when applying for a job.',
          options: ['applicant', 'colleague', 'contract', 'interview', 'overtime', 'resume', 'salary'],
          answer: 5,
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
          stimulus: 'I have a job interview tomorrow morning.',
          text: '',
          options: [
            'Good luck — prepare well tonight.',
            'Interviews are very easy.',
            'I hate working too.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: 'My boss asked me to work on Saturday.',
          text: '',
          options: [
            'You should say no immediately.',
            'Bosses are always wrong.',
            'I hope they pay you extra.',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'I got a pay rise this month.',
          text: '',
          options: [
            'Pay rises are extremely rare.',
            'Congratulations — you deserve it.',
            'Money is not important in life.',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: "I don't like my new job.",
          text: '',
          options: [
            'Give it some time.',
            'Quit immediately.',
            'All jobs are the same.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'I am thinking of changing careers.',
          text: '',
          options: [
            'You should never change jobs.',
            'All careers are equal anyway.',
            'What kind of work interests you?',
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
        "Finding good (16) ___ is one of the biggest challenges for young Colombians today. Many graduates have a university degree but lack practical (17) ___. Employers often prefer candidates who have already studied at (18) ___ and completed internships, because they come with both knowledge and technical (19) ___. The average (20) ___ for entry-level positions has not kept up with the rising cost of living. Many large (21) ___ prefer to hire people who are flexible, adaptable, and willing to learn quickly. Young people who want to stand out must (22) ___ early and prepare their CV carefully. With the right attitude and preparation, there are real (23) ___ available for those who are motivated.",
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['friends', 'jobs', 'schools', 'houses'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['languages', 'opinions', 'experience', 'hobbies'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['school', 'university', 'abroad', 'home'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['skills', 'opinions', 'hobbies', 'problems'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['rent', 'salary', 'grade', 'budget'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['schools', 'hospitals', 'companies', 'families'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['study', 'travel', 'apply', 'retire'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['risks', 'problems', 'doubts', 'opportunities'],
          answer: 3,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'How to Prepare for a Job Interview',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        "HOW TO PREPARE FOR A JOB INTERVIEW\n\nA job interview is one of the most important steps in the process of finding employment. Whether you are applying for your first job or making a career change, how you prepare can make the difference between success and failure.\n\nThe first step is to research the company. Before your interview, find out what the organisation does, what its values are, and what products or services it offers. This shows the interviewer that you are genuinely interested and have made an effort to understand the role.\n\nNext, practise answering common interview questions. Questions like 'Tell me about yourself', 'What are your strengths and weaknesses?' and 'Why do you want to work here?' are asked in almost every interview. Preparing clear, honest, and specific answers to these questions will help you feel more confident on the day.\n\nYour appearance also matters. Dress professionally, arrive on time, and bring a copy of your CV. Make eye contact, speak clearly, and listen carefully to each question before answering. Small details such as a firm handshake and a polite manner can leave a very positive impression.\n\nFinally, remember that an interview is a two-way conversation. At the end, you will usually be invited to ask your own questions. Preparing one or two thoughtful questions about the role or the company shows that you are seriously interested in the position.",
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main purpose of this text?',
          options: [
            'To describe different types of jobs available in Colombia',
            'To explain how job interviews are evaluated by employers',
            'To give advice on how to prepare successfully for a job interview',
            'To tell the story of someone who found a job through an interview',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'According to paragraph 2, why should you research the company before the interview?',
          options: [
            'So you can correct the interviewer if they make a mistake',
            'So you can decide whether the company is worth working for',
            'To show the interviewer that you are genuinely interested in the role',
            'To find out whether the company has had any problems in the past',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'The phrase "common interview questions" in paragraph 3 most likely refers to:',
          options: [
            'very difficult technical questions specific to one industry',
            'questions that are frequently asked in many types of interview',
            'questions that only managers and directors are asked',
            'questions written by the government for official job applications',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'According to paragraph 4, which of the following is NOT mentioned as advice on presentation?',
          options: [
            'Dress professionally',
            'Arrive on time',
            'Memorise the company\'s history',
            'Make eye contact',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'The word "impression" in paragraph 4 most likely means:',
          options: [
            'a formal document you give the interviewer',
            'the effect you have on someone\'s opinion of you',
            'a special technique used in interviews',
            'a type of professional qualification',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'Why should you prepare your own questions for the end of the interview?',
          options: [
            'To show that you are not afraid of the interviewer',
            'Because the employer will test you on your questions',
            'To show that you are seriously interested in the position',
            'Because interviews always end early if you have no questions',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which of the following BEST describes the tone of this text?',
          options: [
            'Critical and negative about job seekers',
            'Practical and encouraging',
            'Formal and academic',
            'Informal and humorous',
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
      passageTitle: 'Working From Home: A New Way of Working',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        "WORKING FROM HOME: A NEW WAY OF WORKING\n\nBefore 2020, working from home was considered a privilege reserved for a small number of highly skilled professionals. The global pandemic changed all of this almost overnight. Millions of workers around the world — including in Colombia — suddenly found themselves working from their kitchens, bedrooms, and living rooms. Several years later, the debate about whether remote work is truly better than office work continues.\n\nProponents of remote work argue that the benefits are significant. Workers save time and money by not commuting. Many report higher levels of productivity, as they can structure their day around their most focused hours. The flexibility to work from any location has also opened opportunities for people in smaller cities and rural areas who previously could not access well-paid jobs in the capital. For parents and carers, remote work can make it easier to balance professional and personal responsibilities.\n\nHowever, critics point out that working from home is not suitable for everyone. Many workers find it difficult to separate their professional and personal lives when both happen in the same space. Social isolation is another concern — without the daily contact with colleagues that office life provides, some remote workers report feelings of loneliness and disconnection. Junior employees, in particular, may miss out on the informal learning that comes from observing and interacting with more experienced colleagues in person.\n\nCompanies have responded in different ways. Some have adopted a fully remote model, closing their physical offices altogether. Others have introduced hybrid arrangements, requiring employees to come into the office for a set number of days each week while allowing them to work remotely for the rest of the time.\n\nMost experts agree that there is no single solution that works for all organisations or all employees. The future of work will likely involve a greater variety of arrangements, with flexibility and individual choice playing a central role.",
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'What caused remote work to become widespread?',
          options: [
            'A new government law requiring people to work from home',
            'The global pandemic forced many workers to work remotely',
            'Companies discovered it was cheaper to close their offices',
            'Workers went on strike and refused to come into the office',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'According to paragraph 2, how has remote work helped people outside capital cities?',
          options: [
            'It has allowed them to move to Bogotá more easily.',
            'It has given them access to well-paid jobs they could not reach before.',
            'It has reduced the cost of living in smaller cities.',
            'It has provided them with free internet and computer equipment.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'According to paragraph 3, what specific disadvantage do junior employees face when working remotely?',
          options: [
            'They earn less money than they would in an office.',
            'They have to work longer hours from home.',
            'They may miss out on informal learning from more experienced colleagues.',
            'They are not trusted to work without supervision.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'What is a hybrid working arrangement?',
          options: [
            'Working only from home with occasional video calls',
            'Working partly in the office and partly from home',
            'Sharing an office with workers from different companies',
            'Working different hours each day depending on the project',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the final paragraph about the future of work?',
          options: [
            'All companies will eventually return to full-time office work.',
            'Remote work will completely replace traditional office environments.',
            'A single standard working model will emerge for all industries.',
            'Flexible arrangements will become more common in the future.',
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
      passageTitle: 'Is a University Degree Necessary for Success?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        "IS A UNIVERSITY DEGREE NECESSARY FOR SUCCESS?\n\nFor generations, a university degree has been considered the most reliable path to professional success. Parents in Colombia and across Latin America have sacrificed enormously to send their children to university, believing that a degree is a guarantee of a better life. But as the world of work changes rapidly, many people are beginning to ask whether this belief is still justified.\n\nThose who argue in favour of university education point to the statistics. On average, university graduates in Colombia earn significantly more than those with only secondary school qualifications. A degree provides not only specialised knowledge but also critical thinking skills, the ability to communicate clearly, and a professional network that can open doors throughout a career. For professions such as medicine, law, and engineering, a university qualification is a legal requirement — there is simply no alternative.\n\nOn the other hand, critics of the traditional model argue that the higher education system has not kept pace with the demands of the modern economy. Many graduates enter the job market with outdated knowledge, significant debts, and a lack of practical skills. Meanwhile, vocational training programmes — which teach specific technical skills such as programming, electrical work, or digital marketing — can prepare young people for well-paid employment in a fraction of the time and at a much lower cost.\n\nThe rise of entrepreneurship has further complicated the picture. Many of the most successful business people in the world, from technology pioneers to innovative small business owners, never completed a university degree. What they had instead was a clear vision, strong practical skills, and the determination to learn from experience.\n\nPerhaps the most honest answer is that success depends less on the type of qualification a person holds and more on their motivation, adaptability, and willingness to keep learning throughout their career. In a world that is changing faster than any educational institution can respond, the ability to learn continuously may matter more than any certificate on the wall.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What central question does this text address?',
          options: [
            'How Colombian universities can improve their teaching methods',
            'Whether a university degree is essential for professional success',
            'Which university subjects lead to the highest-paying jobs',
            'How parents can afford to pay for their children\'s university education',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, which of the following is a benefit of a university education?',
          options: [
            'Graduates never have to update their knowledge after studying.',
            'A degree guarantees employment in any field.',
            'University develops critical thinking and communication skills.',
            'University students earn money while they study.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'According to paragraph 2, for which professions is a university degree legally required?',
          options: [
            'Technology and digital marketing',
            'Business, finance, and accounting',
            'Medicine, law, and engineering',
            'Design, art, and music',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'The phrase "has not kept pace with" in paragraph 3 most likely means:',
          options: [
            'has become more advanced than',
            'has failed to develop at the same speed as',
            'has completely rejected the ideas of',
            'has successfully adapted to',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'According to paragraph 3, what is one advantage of vocational training over university?',
          options: [
            'Vocational training is more respected by employers.',
            'Vocational programmes prepare students in less time and at lower cost.',
            'Vocational training leads to higher salaries than university degrees.',
            'Vocational qualifications are recognised in more countries.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'What example does paragraph 4 use to support the idea that degrees are not always necessary?',
          options: [
            'Government ministers who studied at top universities',
            'Successful business people who never completed a university degree',
            'Athletes who succeeded through hard work and talent alone',
            'Teachers who trained through vocational programmes',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'The word "entrepreneurship" in paragraph 4 most likely refers to:',
          options: [
            'working as an employee in a large company',
            'studying business at a prestigious university',
            'starting and running your own business',
            'managing a government institution',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'According to the final paragraph, what quality may matter most in a rapidly changing world?',
          options: [
            'Having a degree from a well-known university',
            'The ability to earn a high salary quickly',
            'The ability to keep learning continuously',
            'Having a large professional network',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: 'What is the author\'s tone in the final paragraph?',
          options: [
            'Strongly in favour of university education',
            'Strongly opposed to university education',
            'Balanced and nuanced, offering a middle view',
            'Confused and uncertain about the topic',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: "Which statement BEST summarises the author's overall position?",
          options: [
            'A university degree is always necessary for success in Colombia.',
            'Vocational training is always better than university education.',
            'Success depends on motivation and adaptability more than on qualifications alone.',
            'The university system must be completely replaced by vocational training.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
