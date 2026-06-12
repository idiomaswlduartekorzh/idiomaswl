import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 18
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Rutinas y vida diaria
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-18',
  examSlug: 'icfes',
  title: 'Mock 18 · Rutinas y vida diaria',
  subtitle: 'Saber 11 · Componente de Inglés · 45 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [

    // ── PARTE 1 ── Avisos e instrucciones (preguntas 1–5) ────────────────────
    {
      part: 1,
      title: 'Parte 1 — Avisos e instrucciones',
      sectionStyle: 'notices-grid',
      exampleStimulus: 'OPEN 24 HOURS\nWe never close.',
      exampleText: 'What does this sign tell customers?',
      exampleAnswer: 'B',
      instructions:
        'The following notices give information about different places. Read each notice carefully and answer questions 1 to 5.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'OFFICE OPEN MONDAY TO FRIDAY\n8:00 AM – 5:00 PM\nClosed on public holidays.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At a government office or business',
            'At a hospital',
            'At a school',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PLEASE QUEUE HERE AND WAIT FOR THE NEXT AVAILABLE CASHIER.\nThank you for your patience.',
          text: 'What is the purpose of this notice?',
          options: [
            'To ask customers to leave the shop',
            'To tell customers to wait in an orderly line',
            'To announce a special sale',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'RUBBISH MUST BE PLACED IN THE DESIGNATED BINS.\nDo not leave bags on the pavement.',
          text: 'What is the purpose of this notice?',
          options: [
            'To warn people about dangerous animals in the area',
            'To advertise a local cleaning service',
            'To remind people to dispose of rubbish correctly',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'LIBRARY CLOSES AT 9:00 PM ON WEEKDAYS.\nWeekend hours: 10:00 AM – 6:00 PM.',
          text: 'What does this notice tell you?',
          options: [
            'The library has different opening hours on weekdays and weekends',
            'The library is only open on weekends',
            'The library opens at 9:00 PM on weekdays',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'SMOKING IS NOT PERMITTED WITHIN 5 METRES OF THIS BUILDING.\nThank you for respecting our policy.',
          text: 'Where would you most likely see this sign?',
          options: [
            'Near the entrance of a building',
            'Inside a restaurant',
            'At a private garden',
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
      topic: 'Daily Life',
      exampleText:
        'A set of actions that someone does regularly in the same order each day.',
      exampleAnswer: 'routine',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'The device that makes a sound at a set time to wake you up in the morning.',
          options: ['alarm', 'commute', 'deadline', 'errand', 'habit', 'schedule', 'workout'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'The regular journey you make between your home and your workplace or school.',
          options: ['alarm', 'commute', 'deadline', 'errand', 'habit', 'schedule', 'workout'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'The latest time or date by which a piece of work or task must be finished.',
          options: ['alarm', 'commute', 'deadline', 'errand', 'habit', 'schedule', 'workout'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'Something you do regularly without thinking, often because you have always done it.',
          options: ['alarm', 'commute', 'deadline', 'errand', 'habit', 'schedule', 'workout'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'A plan that shows what activities or events will happen and at what time.',
          options: ['alarm', 'commute', 'deadline', 'errand', 'habit', 'schedule', 'workout'],
          answer: 5,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'I always feel tired in the morning.',
      exampleOptions: ["Me too — mornings are hard.", 'I never sleep.', 'Tired is good.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: 'I always wake up late on school days.',
          text: '',
          options: [
            'You should set your alarm earlier.',
            'School starts too early for everyone.',
            'Late is better than never.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: 'My commute takes over an hour every day.',
          text: '',
          options: [
            'An hour is really nothing at all.',
            'That must be very tiring for you.',
            'You should find a new city to live in.',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: "I haven't had breakfast today.",
          text: '',
          options: [
            'Skipping breakfast is completely fine.',
            'Dinner is by far the best meal.',
            'You should try to eat something — it gives you energy.',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: "I can't sleep because I'm thinking about my homework.",
          text: '',
          options: [
            'Try to finish it early next time so you can relax.',
            'Homework is not that important anyway.',
            'I never sleep well either.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: 'I try to exercise three times a week.',
          text: '',
          options: [
            'Three times sounds like too much effort.',
            'Exercise is not really necessary.',
            "That's a great habit to have.",
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
        'Good students know that the way they (16) ___ is just as important as how long they sit at their desk. First, it is essential to manage your (17) ___ wisely. Instead of studying for many hours without stopping, it is better to take short breaks. Writing (18) ___ in class also helps, because putting information in your own words makes it easier to remember. It is equally important to (19) ___ on one subject at a time rather than trying to do everything at once. After studying, taking regular (20) ___ allows your brain to rest and process what you have learned. Before an exam, always (21) ___ your key points by reading through your notes again. Setting clear (22) ___ for each study session helps you stay motivated and measure your progress. Students who follow these steps consistently tend to achieve better (23) ___ in their exams.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['write', 'read', 'think', 'study'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['money', 'energy', 'time', 'space'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['lists', 'notes', 'tests', 'words'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['focus', 'work', 'depend', 'rely'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['meals', 'walks', 'breaks', 'naps'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['copy', 'check', 'review', 'repeat'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['grades', 'goals', 'habits', 'rules'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['results', 'scores', 'marks', 'grades'],
          answer: 0,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'Why Teenagers Need More Sleep',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        'WHY TEENAGERS NEED MORE SLEEP\n\nMany parents struggle to get their teenage children out of bed in the morning. They often think their children are simply being lazy. However, scientists have discovered that there is a biological reason why teenagers feel tired in the mornings and want to stay up later at night.\n\nDuring adolescence, the brain changes the time at which it releases melatonin, the chemical that makes us feel sleepy. This shift means that teenagers naturally feel alert later in the evening and tired later in the morning. As a result, going to bed at 10 PM can feel impossible for many teenagers, even if they try.\n\nDespite this, most schools still start early in the morning. Research has shown that teenagers who regularly sleep fewer than eight hours a night perform worse in tests, have more difficulty concentrating, and are more likely to feel anxious or depressed.\n\nSome schools in the United States have experimented with later start times. In these schools, students reported feeling more rested, and their academic results improved significantly. Teachers also noticed that students were more engaged during lessons.\n\nExperts recommend that teenagers get between eight and ten hours of sleep each night. They suggest keeping a regular sleep schedule, avoiding screens before bedtime, and making the bedroom dark and quiet. Parents can support their teenagers by understanding the science behind these sleep patterns rather than simply telling them to go to bed earlier.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is the main idea of this text?',
          options: [
            'Teenagers are lazy and do not want to go to school.',
            'There is a scientific reason why teenagers need more sleep and later wake times.',
            'Parents should let their children choose their own bedtimes.',
            'Schools should be replaced by online learning.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'According to the text, what does melatonin do?',
          options: [
            'It helps the brain concentrate during lessons.',
            'It controls how much teenagers eat at night.',
            'It is the chemical that makes us feel sleepy.',
            'It increases the energy levels of young people.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'What problem do teenagers face if they sleep fewer than eight hours?',
          options: [
            'They become more interested in their phones.',
            'They perform worse in tests and have trouble concentrating.',
            'They stop eating breakfast in the morning.',
            'They fall asleep during sports activities.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'What happened in schools that started later in the morning?',
          options: [
            'Students arrived late and lessons were cancelled.',
            'Teachers had to work longer hours each day.',
            'Students felt more rested and their academic results improved.',
            'Parents complained about the new schedule.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'The word "alert" in paragraph 2 most likely means:',
          options: [
            'worried and anxious',
            'awake and mentally active',
            'bored and uninterested',
            'hungry and restless',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'How many hours of sleep do experts recommend for teenagers?',
          options: [
            'Between six and seven hours',
            'Exactly eight hours',
            'Between eight and ten hours',
            'More than ten hours',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'What advice does the text give to parents?',
          options: [
            'Tell their teenagers to go to bed earlier every night.',
            'Understand the science of sleep patterns rather than simply blaming laziness.',
            'Buy their teenagers special alarm clocks.',
            'Contact the school to ask for later start times.',
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
      passageTitle: 'Time Management Skills for Students',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        'TIME MANAGEMENT SKILLS FOR STUDENTS\n\nOne of the most valuable skills a student can develop is the ability to manage time effectively. Many students feel overwhelmed by the amount of work they have to do, but in most cases the problem is not the amount of work — it is the lack of a clear plan.\n\nThe first step to better time management is making a weekly plan. At the start of each week, students should write down all the tasks they need to complete, including homework assignments, revision sessions, and any other commitments. By seeing all their responsibilities laid out clearly, students can decide what is most urgent and plan when to do each task.\n\nAnother important strategy is learning to avoid distractions. Many students sit down to study but spend most of their time looking at their phones or watching videos online. Experts recommend putting the phone in another room or using apps that block social media during study sessions. Even thirty minutes of focused study can be more productive than three hours of half-hearted effort.\n\nBreaking large tasks into smaller steps is also very helpful. When a student has a big project to finish, the size of the task can feel discouraging. However, dividing it into smaller parts — for example, researching one day, planning the next, and writing the day after — makes it feel much more manageable.\n\nFinally, students should learn to recognise when they are most productive. Some people concentrate best in the morning, while others work better in the afternoon or evening. Scheduling the most demanding tasks during peak concentration times can make a significant difference to the quality of work produced.\n\nStudents who develop these habits early in their school career are far better prepared not only for their exams, but also for university and the world of work.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'According to the text, what is usually the real cause of students feeling overwhelmed?',
          options: [
            'They have too much homework given by their teachers.',
            'They do not have a clear plan for managing their work.',
            'Their schools do not teach time management skills.',
            'They spend too much money on entertainment.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'What does the text recommend as the first step to better time management?',
          options: [
            'Buying a new notebook and pen',
            'Asking teachers to give less homework',
            'Making a weekly plan of all tasks and commitments',
            'Waking up earlier each morning',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'The phrase "half-hearted effort" in paragraph 3 most likely means:',
          options: [
            'working very hard for a long time',
            'studying alone without any help',
            'doing something without full attention or commitment',
            'finishing a task just before the deadline',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'What benefit does breaking a large task into smaller steps provide?',
          options: [
            'It allows students to finish their work faster.',
            'It makes the task feel less overwhelming and more manageable.',
            'It helps students avoid making mistakes.',
            'It gives students more free time.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What can be inferred from the final paragraph?',
          options: [
            'Time management is only useful for preparing for school exams.',
            'Students who manage their time well are better prepared for future challenges.',
            'Universities teach students all the time management skills they need.',
            'Time management is a natural talent — you are born with it.',
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
      passageTitle: 'Is Multitasking Good or Bad for Productivity?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        'IS MULTITASKING GOOD OR BAD FOR PRODUCTIVITY?\n\nIn today\'s fast-paced world, multitasking is often seen as a desirable skill. People who can answer emails while attending a meeting, or cook dinner while helping their children with homework, are sometimes admired for their ability to "do it all." But is multitasking really as effective as it seems?\n\nThe scientific evidence suggests not. Research conducted at Stanford University found that people who regularly multitask are actually less efficient than those who focus on one task at a time. When we switch between tasks, our brains need a brief period to "reset" and redirect attention. This switching cost adds up over time and reduces overall output. In simple terms, doing two things at once does not mean you finish two tasks in half the time — it often means you do both tasks poorly.\n\nThere is also a significant impact on quality. Studies have shown that divided attention leads to more errors. A student who writes an essay while listening to music with lyrics, for example, is more likely to make grammatical mistakes and produce less coherent arguments than one who works in silence. The brain simply cannot process two language tasks at the same time without one suffering.\n\nSome argue that certain types of multitasking are harmless or even beneficial. Listening to instrumental music while doing maths, for instance, does not seem to harm performance and may even improve mood. Similarly, taking short breaks to stretch or make a drink between tasks can increase focus when returning to work. These activities are not true multitasking but rather complementary habits.\n\nThe modern workplace and school environment often pressure people to respond to messages immediately and to manage several projects at once. Experts suggest that this "always-on" culture is contributing to rising levels of stress and burnout, particularly among young people.\n\nThe conclusion of most researchers is clear: for tasks that require thought, creativity, or accuracy, single-tasking is almost always more productive than multitasking. Learning to give full attention to one thing at a time — and resisting the temptation to check a phone or switch between browser tabs — is a skill worth developing at any age.',
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main argument of this text?',
          options: [
            'Multitasking is an essential skill for success in modern life.',
            'Multitasking is generally less productive than focusing on one task at a time.',
            'Schools should teach students how to multitask more effectively.',
            'Technology is the main cause of poor concentration among young people.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, what is a "switching cost"?',
          options: [
            'The money spent on buying multiple devices',
            'The time the brain needs to refocus when moving between tasks',
            'The cost of using different apps on a smartphone',
            'The energy lost when changing jobs frequently',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'What example does the text use to show that divided attention reduces quality?',
          options: [
            'A student watching television while eating breakfast',
            'A teacher preparing lessons while attending a meeting',
            'A student writing an essay while listening to music with lyrics',
            'A worker answering emails during a phone call',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'According to the text, which of the following is NOT considered true multitasking?',
          options: [
            'Writing an essay while chatting with friends online',
            'Answering emails while attending a meeting',
            'Taking a short break to stretch between tasks',
            'Cooking dinner while helping children with homework',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'The word "coherent" in paragraph 3 most likely means:',
          options: [
            'very long and detailed',
            'clearly organised and logical',
            'creative and imaginative',
            'difficult to understand',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'What does the text say about the modern workplace and school environment?',
          options: [
            'They have introduced policies to limit multitasking.',
            'They reward people who can focus on a single task.',
            'They pressure people to respond quickly and manage several projects at once.',
            'They have solved the problem of stress by improving technology.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'The phrase "always-on" culture in paragraph 5 refers to:',
          options: [
            'a culture that values physical exercise at all times',
            'an expectation that people are constantly available and responsive',
            'the habit of leaving electronic devices on overnight',
            'a school policy that requires students to attend every lesson',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'According to the research mentioned, who is more efficient?',
          options: [
            'People who can manage many tasks at the same time',
            'People who work quickly without checking for mistakes',
            'People who focus on completing one task at a time',
            'People who use technology to organise their schedule',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: "What is the author's final recommendation?",
          options: [
            'Stop using phones and social media completely.',
            'Learn to give full attention to one task at a time.',
            'Ask employers and schools to reduce workloads.',
            'Use instrumental music to improve concentration.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: "Which statement BEST summarises the author's overall position?",
          options: [
            'Multitasking is a useful skill that everyone should develop.',
            'The negative effects of multitasking only affect young people.',
            'For quality work, single-tasking is more effective than multitasking.',
            'Technology companies are responsible for the rise in multitasking.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
