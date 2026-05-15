import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-03',
  examSlug: 'icfes',
  title: 'Mock 3 · Estudio y tecnología',
  subtitle: 'Saber 11 · Componente de Inglés · 55 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [
    {
      part: 1,
      title: 'Parte 1 — Vocabulario: relacionar palabras',
      instructions: 'Match each word with its correct description.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          text: 'A portable computer small enough to use on your lap, used for studying or working.',
          options: ['Printer', 'Tablet', 'Laptop', 'Monitor'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'A program or website that allows students to take courses and learn new skills over the internet.',
          options: ['Search engine', 'Online platform', 'Social network', 'Operating system'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'The ability to read and write, or more broadly, to understand and use information effectively.',
          options: ['Fluency', 'Literacy', 'Curriculum', 'Assessment'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'A document or file that proves a person has completed a course or earned a qualification.',
          options: ['Syllabus', 'Certificate', 'Transcript', 'Scholarship'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'The process of sending and receiving information between devices through wireless or wired networks.',
          options: ['Streaming', 'Connectivity', 'Navigation', 'Storage'],
          answer: 1,
        },
      ],
    },
    {
      part: 2,
      title: 'Parte 2 — Diálogos',
      instructions: 'Read each dialogue and choose the best response to complete it.',
      questions: [
        {
          type: 'dialog',
          id: 'p2q1',
          part: 2,
          stimulus: 'Student A: "I can\'t figure out how to submit my assignment on the online portal."\nStudent B: _______',
          text: 'What is the most helpful response from Student B?',
          options: [
            '"The cafeteria opens at noon."',
            '"Let me show you. You click \'Upload\' and then select your file."',
            '"My assignment was really difficult too."',
            '"The professor likes short answers."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Teacher: "For next week, I want you to research renewable energy and prepare a short presentation."\nStudent: _______',
          text: 'What is the most appropriate student response?',
          options: [
            '"Can we work in groups, or does it have to be individual?"',
            '"I don\'t have a computer at home."',
            '"Renewable energy is very popular."',
            '"The library is closed on weekends."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Parent: "Why are you on your phone during dinner?"\nTeenager: _______',
          text: 'What is the most natural response from the teenager?',
          options: [
            '"I\'m just playing a game, I\'ll put it away."',
            '"Dinner is ready in ten minutes."',
            '"Smartphones are very useful for studying."',
            '"My friend bought a new phone last week."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'IT technician: "Your laptop won\'t turn on because the battery is completely drained. Have you charged it recently?"\nUser: _______',
          text: 'What does the user say?',
          options: [
            '"I need to buy a new desk."',
            '"No, I forgot to plug it in last night. I\'ll charge it now."',
            '"The internet connection is very slow."',
            '"My printer also stopped working."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Librarian: "We now offer free access to digital textbooks through our app. Would you like help setting it up?"\nStudent: _______',
          text: 'What is the most appropriate reply?',
          options: [
            '"I prefer physical books."',
            '"Yes, please! That would save me a lot of money."',
            '"The app is too difficult to use."',
            '"I already have all my books."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Professor: "Does anyone have questions about the research paper guidelines?"\nStudent: "Yes. Should we use APA or MLA format for citations?"\nProfessor: _______',
          text: 'What does the professor say?',
          options: [
            '"The paper is due on Friday."',
            '"Please use APA format. I\'ll share a guide on the course website."',
            '"You can write about any topic you like."',
            '"The class will meet online next week."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Student: "I keep getting distracted when I study at home. I can\'t focus."\nCounselor: _______',
          text: 'What advice does the counselor give?',
          options: [
            '"You should study more hours every day."',
            '"Try turning off notifications and studying in a quiet space with no phone nearby."',
            '"Distraction is a normal part of growing up."',
            '"Your grades are not important at this stage."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Friend A: "Have you tried that new language learning app everyone is talking about?"\nFriend B: "Not yet. Is it any good?"\nFriend A: _______',
          text: 'What does Friend A say?',
          options: [
            '"Languages are difficult to learn."',
            '"It\'s great! I\'ve already learned 200 words in two weeks."',
            '"I don\'t use apps on my phone."',
            '"You should take a class instead."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Online tutor: "We\'re almost out of time. Do you understand how to solve quadratic equations now?"\nStudent: _______',
          text: 'What does the student say?',
          options: [
            '"Mathematics is not my favorite subject."',
            '"Yes, I think so. Can we do one more example to be sure?"',
            '"I have another class in ten minutes."',
            '"The formula is in chapter four."',
          ],
          answer: 1,
        },
      ],
    },
    {
      part: 3,
      title: 'Parte 3 — Completar oraciones',
      instructions: 'Choose the word or phrase that best completes each sentence.',
      questions: [
        {
          type: 'mcq',
          id: 'p3q1',
          part: 3,
          text: 'Students who _______ online courses must be self-disciplined and manage their time carefully.',
          options: ['attend', 'take', 'assist', 'watch over'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          text: 'The school _______ new tablets for all students in the science department last semester.',
          options: ['provides', 'provided', 'is providing', 'will provide'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          text: 'If you do not understand a concept, you _______ ask your teacher for clarification.',
          options: ['must', 'should', 'might', 'can'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          text: 'The new educational app is _______ to use because it has a simple and clear interface.',
          options: ['complicated', 'easy', 'boring', 'expensive'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          text: 'She has been studying French _______ three years and can now hold a basic conversation.',
          options: ['since', 'for', 'during', 'while'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          text: 'Digital tools can _______ teachers in the classroom, but they cannot replace the human connection.',
          options: ['assist', 'replace', 'ignore', 'compete'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          text: 'The university _______ a new policy requiring all students to submit assignments digitally.',
          options: ['introduced', 'introduces', 'is introduced', 'has introducing'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          text: 'Many students find it difficult to _______ between reliable and unreliable sources online.',
          options: ['separate', 'choose', 'distinguish', 'identify'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          text: 'The exam results _______ by the end of the week so students can review their performance.',
          options: ['will be published', 'published', 'are publishing', 'have published'],
          answer: 0,
        },
      ],
    },
    {
      part: 4,
      title: 'Parte 4 — Comprensión visual',
      instructions: 'Read the notice or sign and answer the questions that follow.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          stimulus: '--- SCHOOL NOTICE ---\nCOMPUTER LAB RULES\n• Book your session 24 hours in advance.\n• Maximum session time: 1 hour per student.\n• Food and drinks are NOT permitted.\n• Log out before leaving.\n• Report any technical problems to the lab assistant.',
          stimulusLabel: 'Read the computer lab notice.',
          text: 'What must students do if they notice a technical problem?',
          options: [
            'Fix it themselves before leaving.',
            'Report it to the lab assistant.',
            'Book a new session for the next day.',
            'Log out and turn off the computer.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: '--- SCHOOL NOTICE ---\nCOMPUTER LAB RULES\n• Book your session 24 hours in advance.\n• Maximum session time: 1 hour per student.\n• Food and drinks are NOT permitted.\n• Log out before leaving.\n• Report any technical problems to the lab assistant.',
          stimulusLabel: 'Read the computer lab notice.',
          text: 'How far in advance must students book their computer lab session?',
          options: [
            'One week.',
            'Two days.',
            '24 hours.',
            'One hour.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'ONLINE COURSE — ENROLLMENT OPEN\nIntroduction to Digital Marketing\nStart date: March 10\nDuration: 8 weeks\nTime commitment: 4–5 hours per week\nCost: FREE (certificate available for $29)\nLanguage: English\nRegister at: www.learnmore.edu',
          stimulusLabel: 'Read the online course advertisement.',
          text: 'What is the cost of obtaining the course certificate?',
          options: [
            'The course and certificate are both free.',
            '$29.',
            '$4–5.',
            '$8.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'ONLINE COURSE — ENROLLMENT OPEN\nIntroduction to Digital Marketing\nStart date: March 10\nDuration: 8 weeks\nTime commitment: 4–5 hours per week\nCost: FREE (certificate available for $29)\nLanguage: English\nRegister at: www.learnmore.edu',
          stimulusLabel: 'Read the online course advertisement.',
          text: 'How much time per week should students expect to dedicate to this course?',
          options: [
            '8 hours.',
            '10 hours.',
            '4 to 5 hours.',
            'Less than 1 hour.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'SCHOOL TECHNOLOGY POLICY\nPersonal devices (phones, tablets) may be used in the classroom ONLY with teacher permission.\nDevices must be on silent mode at all times.\nUsing devices for social media during class is NOT allowed.\nViolations may result in device confiscation until end of day.',
          stimulusLabel: 'Read the school technology policy.',
          text: 'Under what condition may students use personal devices in class?',
          options: [
            'Whenever they want, as long as they use them quietly.',
            'Only with the teacher\'s permission.',
            'Only for social media and communication.',
            'Never — devices are banned from classrooms.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'SCHOOL TECHNOLOGY POLICY\nPersonal devices (phones, tablets) may be used in the classroom ONLY with teacher permission.\nDevices must be on silent mode at all times.\nUsing devices for social media during class is NOT allowed.\nViolations may result in device confiscation until end of day.',
          stimulusLabel: 'Read the school technology policy.',
          text: 'What happens if a student violates the technology policy?',
          options: [
            'They are sent home immediately.',
            'Their parents are called.',
            'Their device may be taken away until the end of the day.',
            'They lose internet access for one week.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'STUDY GROUP — OPEN INVITATION\nAre you preparing for your university entrance exams?\nJoin us every Saturday, 10:00 AM – 1:00 PM\nLocation: Central Library, Room 12\nTopics: Math, Science, English\nFree to join. Bring your own study materials.\nContact: studygroup@school.edu',
          stimulusLabel: 'Read the study group flyer.',
          text: 'When does the study group meet?',
          options: [
            'Every day from 10 AM to 1 PM.',
            'On Saturdays from 10 AM to 1 PM.',
            'On weekdays at the library.',
            'Every Sunday morning.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'STUDY GROUP — OPEN INVITATION\nAre you preparing for your university entrance exams?\nJoin us every Saturday, 10:00 AM – 1:00 PM\nLocation: Central Library, Room 12\nTopics: Math, Science, English\nFree to join. Bring your own study materials.\nContact: studygroup@school.edu',
          stimulusLabel: 'Read the study group flyer.',
          text: 'What should students bring to the study group?',
          options: [
            'A registration form.',
            'Their own study materials.',
            'A signed permission letter.',
            'A laptop provided by the school.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'SOFTWARE UPDATE NOTIFICATION\nA new version of your learning management system is available.\nNew features: Improved video player, dark mode, offline access.\nUpdate required before: April 15\nStudents who do not update will lose access to course materials.\nClick "Update Now" or visit the help center for instructions.',
          stimulusLabel: 'Read the software notification.',
          text: 'What will happen to students who do not update before the deadline?',
          options: [
            'They will be automatically enrolled in a new course.',
            'They will receive a lower grade.',
            'They will lose access to course materials.',
            'Their account will be permanently deleted.',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 5,
      title: 'Parte 5 — Texto corto',
      instructions: 'Read the text and answer the questions.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          stimulus: `LinguaGo: Learn a Language for Free

LinguaGo is a free mobile application designed to help users learn a new language through short, interactive lessons. Available on iOS and Android, the app currently offers courses in 25 languages, including Spanish, English, French, Mandarin, and Portuguese.

Each daily lesson takes between five and fifteen minutes and uses a combination of listening exercises, vocabulary matching, and short writing tasks. The app tracks user progress and sends daily reminders to encourage consistency. Users who complete a lesson every day earn streak badges, which motivate them to keep going.

LinguaGo's premium plan, called LinguaGo Plus, removes advertisements and provides access to advanced grammar lessons and live conversation sessions with certified tutors. The premium plan costs $9.99 per month or $59.99 per year. However, the free version alone is considered highly effective for beginners and intermediate learners.`,
          stimulusLabel: 'Read the article.',
          text: 'What is LinguaGo primarily designed to do?',
          options: [
            'Help users find language tutors in their city.',
            'Offer professional translation services.',
            'Help users learn a new language through interactive lessons.',
            'Prepare students for official language certification exams.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: `LinguaGo: Learn a Language for Free

LinguaGo is a free mobile application designed to help users learn a new language through short, interactive lessons. Available on iOS and Android, the app currently offers courses in 25 languages, including Spanish, English, French, Mandarin, and Portuguese.

Each daily lesson takes between five and fifteen minutes and uses a combination of listening exercises, vocabulary matching, and short writing tasks. The app tracks user progress and sends daily reminders to encourage consistency. Users who complete a lesson every day earn streak badges, which motivate them to keep going.

LinguaGo's premium plan, called LinguaGo Plus, removes advertisements and provides access to advanced grammar lessons and live conversation sessions with certified tutors. The premium plan costs $9.99 per month or $59.99 per year. However, the free version alone is considered highly effective for beginners and intermediate learners.`,
          stimulusLabel: 'Read the article.',
          text: 'How long does a typical daily lesson take?',
          options: [
            'At least one hour.',
            'Exactly 15 minutes.',
            'Between 5 and 15 minutes.',
            'Between 20 and 30 minutes.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: `LinguaGo: Learn a Language for Free

LinguaGo is a free mobile application designed to help users learn a new language through short, interactive lessons. Available on iOS and Android, the app currently offers courses in 25 languages, including Spanish, English, French, Mandarin, and Portuguese.

Each daily lesson takes between five and fifteen minutes and uses a combination of listening exercises, vocabulary matching, and short writing tasks. The app tracks user progress and sends daily reminders to encourage consistency. Users who complete a lesson every day earn streak badges, which motivate them to keep going.

LinguaGo's premium plan, called LinguaGo Plus, removes advertisements and provides access to advanced grammar lessons and live conversation sessions with certified tutors. The premium plan costs $9.99 per month or $59.99 per year. However, the free version alone is considered highly effective for beginners and intermediate learners.`,
          stimulusLabel: 'Read the article.',
          text: 'What do users earn when they complete a lesson every day?',
          options: [
            'Cash rewards.',
            'Streak badges.',
            'A free premium subscription.',
            'Extra lessons.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: `LinguaGo: Learn a Language for Free

LinguaGo is a free mobile application designed to help users learn a new language through short, interactive lessons. Available on iOS and Android, the app currently offers courses in 25 languages, including Spanish, English, French, Mandarin, and Portuguese.

Each daily lesson takes between five and fifteen minutes and uses a combination of listening exercises, vocabulary matching, and short writing tasks. The app tracks user progress and sends daily reminders to encourage consistency. Users who complete a lesson every day earn streak badges, which motivate them to keep going.

LinguaGo's premium plan, called LinguaGo Plus, removes advertisements and provides access to advanced grammar lessons and live conversation sessions with certified tutors. The premium plan costs $9.99 per month or $59.99 per year. However, the free version alone is considered highly effective for beginners and intermediate learners.`,
          stimulusLabel: 'Read the article.',
          text: 'What additional feature does LinguaGo Plus offer that the free version does not?',
          options: [
            'Courses in more than 25 languages.',
            'An offline mode for studying without internet.',
            'Live conversation sessions with certified tutors.',
            'A printed certificate of completion.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: `LinguaGo: Learn a Language for Free

LinguaGo is a free mobile application designed to help users learn a new language through short, interactive lessons. Available on iOS and Android, the app currently offers courses in 25 languages, including Spanish, English, French, Mandarin, and Portuguese.

Each daily lesson takes between five and fifteen minutes and uses a combination of listening exercises, vocabulary matching, and short writing tasks. The app tracks user progress and sends daily reminders to encourage consistency. Users who complete a lesson every day earn streak badges, which motivate them to keep going.

LinguaGo's premium plan, called LinguaGo Plus, removes advertisements and provides access to advanced grammar lessons and live conversation sessions with certified tutors. The premium plan costs $9.99 per month or $59.99 per year. However, the free version alone is considered highly effective for beginners and intermediate learners.`,
          stimulusLabel: 'Read the article.',
          text: 'How much does the annual LinguaGo Plus subscription cost?',
          options: ['$9.99', '$25.00', '$59.99', '$99.99'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: `LinguaGo: Learn a Language for Free

LinguaGo is a free mobile application designed to help users learn a new language through short, interactive lessons. Available on iOS and Android, the app currently offers courses in 25 languages, including Spanish, English, French, Mandarin, and Portuguese.

Each daily lesson takes between five and fifteen minutes and uses a combination of listening exercises, vocabulary matching, and short writing tasks. The app tracks user progress and sends daily reminders to encourage consistency. Users who complete a lesson every day earn streak badges, which motivate them to keep going.

LinguaGo's premium plan, called LinguaGo Plus, removes advertisements and provides access to advanced grammar lessons and live conversation sessions with certified tutors. The premium plan costs $9.99 per month or $59.99 per year. However, the free version alone is considered highly effective for beginners and intermediate learners.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "consistency" in the text refers to:',
          options: [
            'The difficulty level of the lessons.',
            'The habit of practicing regularly without stopping.',
            'The quality of the audio in listening exercises.',
            'The number of languages available.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: `LinguaGo: Learn a Language for Free

LinguaGo is a free mobile application designed to help users learn a new language through short, interactive lessons. Available on iOS and Android, the app currently offers courses in 25 languages, including Spanish, English, French, Mandarin, and Portuguese.

Each daily lesson takes between five and fifteen minutes and uses a combination of listening exercises, vocabulary matching, and short writing tasks. The app tracks user progress and sends daily reminders to encourage consistency. Users who complete a lesson every day earn streak badges, which motivate them to keep going.

LinguaGo's premium plan, called LinguaGo Plus, removes advertisements and provides access to advanced grammar lessons and live conversation sessions with certified tutors. The premium plan costs $9.99 per month or $59.99 per year. However, the free version alone is considered highly effective for beginners and intermediate learners.`,
          stimulusLabel: 'Read the article.',
          text: 'How many languages does LinguaGo currently offer courses in?',
          options: ['5', '10', '20', '25'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: `LinguaGo: Learn a Language for Free

LinguaGo is a free mobile application designed to help users learn a new language through short, interactive lessons. Available on iOS and Android, the app currently offers courses in 25 languages, including Spanish, English, French, Mandarin, and Portuguese.

Each daily lesson takes between five and fifteen minutes and uses a combination of listening exercises, vocabulary matching, and short writing tasks. The app tracks user progress and sends daily reminders to encourage consistency. Users who complete a lesson every day earn streak badges, which motivate them to keep going.

LinguaGo's premium plan, called LinguaGo Plus, removes advertisements and provides access to advanced grammar lessons and live conversation sessions with certified tutors. The premium plan costs $9.99 per month or $59.99 per year. However, the free version alone is considered highly effective for beginners and intermediate learners.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, who is the free version of LinguaGo most suitable for?',
          options: [
            'Professional translators.',
            'Advanced speakers preparing for academic exams.',
            'Beginners and intermediate learners.',
            'Certified language teachers.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: `LinguaGo: Learn a Language for Free

LinguaGo is a free mobile application designed to help users learn a new language through short, interactive lessons. Available on iOS and Android, the app currently offers courses in 25 languages, including Spanish, English, French, Mandarin, and Portuguese.

Each daily lesson takes between five and fifteen minutes and uses a combination of listening exercises, vocabulary matching, and short writing tasks. The app tracks user progress and sends daily reminders to encourage consistency. Users who complete a lesson every day earn streak badges, which motivate them to keep going.

LinguaGo's premium plan, called LinguaGo Plus, removes advertisements and provides access to advanced grammar lessons and live conversation sessions with certified tutors. The premium plan costs $9.99 per month or $59.99 per year. However, the free version alone is considered highly effective for beginners and intermediate learners.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about the streak badge system in LinguaGo?',
          options: [
            'It is available only to premium subscribers.',
            'It is a way to reward and motivate regular study habits.',
            'It allows users to unlock additional languages.',
            'It replaces the need for daily reminders.',
          ],
          answer: 1,
        },
      ],
    },
    {
      part: 6,
      title: 'Parte 6 — Texto largo: inferencia',
      instructions: 'Read the longer text carefully and answer the questions. Use inference and context clues.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          stimulus: `How Smartphones Transformed Education

When the first iPhone was released in 2007, few people imagined that the small device in their pocket would fundamentally reshape the way the world learns. Nearly two decades later, smartphones have become one of the most powerful — and controversial — tools in education.

The benefits are substantial. Smartphones give students instant access to a near-unlimited wealth of information. A student in a remote Colombian village can watch a lecture by a professor at Harvard, practice algebra with an adaptive learning app, or collaborate on a group project in real time with classmates on the other side of the country. For learners in communities where quality teachers and textbooks are scarce, the smartphone can serve as a gateway to educational resources that would have been unthinkable a generation ago.

Language learning, in particular, has been transformed. Apps like Duolingo, Babbel, and LinguaGo have made it possible to study a foreign language during a commute, a lunch break, or a spare ten minutes between classes. Studies suggest that consistent short-session learning through apps can produce results comparable to traditional classroom instruction over time.

However, the relationship between smartphones and learning is not simple. Research consistently shows that the presence of a smartphone on a desk — even when turned face down — reduces students' cognitive capacity to concentrate. The constant pull of social media notifications, messaging apps, and entertainment platforms competes with academic focus in ways that previous generations never had to confront.

Schools around the world have responded differently. France banned smartphones in schools for all students under 15 in 2018. Other countries have introduced "phone-free" classroom policies that require students to deposit their devices in pouches at the start of class. Some educators argue that rather than banning phones, schools should teach students how to use them responsibly — developing what experts call "digital literacy."

The debate is not likely to be resolved soon. What is clear is that smartphones, like all powerful tools, are neither purely beneficial nor purely harmful. Their impact on education ultimately depends on how students, teachers, and policymakers choose to use and regulate them.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the central theme of this text?',
          options: [
            'Schools should ban smartphones from all educational settings.',
            'Smartphones have created both significant opportunities and challenges for education.',
            'Language learning apps are the most effective educational tools available.',
            'France has the best smartphone policy for schools in the world.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: `How Smartphones Transformed Education

When the first iPhone was released in 2007, few people imagined that the small device in their pocket would fundamentally reshape the way the world learns. Nearly two decades later, smartphones have become one of the most powerful — and controversial — tools in education.

The benefits are substantial. Smartphones give students instant access to a near-unlimited wealth of information. A student in a remote Colombian village can watch a lecture by a professor at Harvard, practice algebra with an adaptive learning app, or collaborate on a group project in real time with classmates on the other side of the country. For learners in communities where quality teachers and textbooks are scarce, the smartphone can serve as a gateway to educational resources that would have been unthinkable a generation ago.

Language learning, in particular, has been transformed. Apps like Duolingo, Babbel, and LinguaGo have made it possible to study a foreign language during a commute, a lunch break, or a spare ten minutes between classes. Studies suggest that consistent short-session learning through apps can produce results comparable to traditional classroom instruction over time.

However, the relationship between smartphones and learning is not simple. Research consistently shows that the presence of a smartphone on a desk — even when turned face down — reduces students' cognitive capacity to concentrate. The constant pull of social media notifications, messaging apps, and entertainment platforms competes with academic focus in ways that previous generations never had to confront.

Schools around the world have responded differently. France banned smartphones in schools for all students under 15 in 2018. Other countries have introduced "phone-free" classroom policies that require students to deposit their devices in pouches at the start of class. Some educators argue that rather than banning phones, schools should teach students how to use them responsibly — developing what experts call "digital literacy."

The debate is not likely to be resolved soon. What is clear is that smartphones, like all powerful tools, are neither purely beneficial nor purely harmful. Their impact on education ultimately depends on how students, teachers, and policymakers choose to use and regulate them.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, how can smartphones benefit students in remote areas?',
          options: [
            'By replacing their teachers with artificial intelligence.',
            'By providing access to educational resources that were previously unavailable to them.',
            'By giving them free internet connections through satellite.',
            'By allowing them to attend school from home.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: `How Smartphones Transformed Education

When the first iPhone was released in 2007, few people imagined that the small device in their pocket would fundamentally reshape the way the world learns. Nearly two decades later, smartphones have become one of the most powerful — and controversial — tools in education.

The benefits are substantial. Smartphones give students instant access to a near-unlimited wealth of information. A student in a remote Colombian village can watch a lecture by a professor at Harvard, practice algebra with an adaptive learning app, or collaborate on a group project in real time with classmates on the other side of the country. For learners in communities where quality teachers and textbooks are scarce, the smartphone can serve as a gateway to educational resources that would have been unthinkable a generation ago.

Language learning, in particular, has been transformed. Apps like Duolingo, Babbel, and LinguaGo have made it possible to study a foreign language during a commute, a lunch break, or a spare ten minutes between classes. Studies suggest that consistent short-session learning through apps can produce results comparable to traditional classroom instruction over time.

However, the relationship between smartphones and learning is not simple. Research consistently shows that the presence of a smartphone on a desk — even when turned face down — reduces students' cognitive capacity to concentrate. The constant pull of social media notifications, messaging apps, and entertainment platforms competes with academic focus in ways that previous generations never had to confront.

Schools around the world have responded differently. France banned smartphones in schools for all students under 15 in 2018. Other countries have introduced "phone-free" classroom policies that require students to deposit their devices in pouches at the start of class. Some educators argue that rather than banning phones, schools should teach students how to use them responsibly — developing what experts call "digital literacy."

The debate is not likely to be resolved soon. What is clear is that smartphones, like all powerful tools, are neither purely beneficial nor purely harmful. Their impact on education ultimately depends on how students, teachers, and policymakers choose to use and regulate them.`,
          stimulusLabel: 'Read the article.',
          text: 'What does research say about having a smartphone on a desk during study?',
          options: [
            'It has no effect on a student\'s ability to concentrate.',
            'It slightly improves focus because students feel more comfortable.',
            'It reduces cognitive capacity even when the phone is face down.',
            'It only affects concentration if the phone is turned on.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: `How Smartphones Transformed Education

When the first iPhone was released in 2007, few people imagined that the small device in their pocket would fundamentally reshape the way the world learns. Nearly two decades later, smartphones have become one of the most powerful — and controversial — tools in education.

The benefits are substantial. Smartphones give students instant access to a near-unlimited wealth of information. A student in a remote Colombian village can watch a lecture by a professor at Harvard, practice algebra with an adaptive learning app, or collaborate on a group project in real time with classmates on the other side of the country. For learners in communities where quality teachers and textbooks are scarce, the smartphone can serve as a gateway to educational resources that would have been unthinkable a generation ago.

Language learning, in particular, has been transformed. Apps like Duolingo, Babbel, and LinguaGo have made it possible to study a foreign language during a commute, a lunch break, or a spare ten minutes between classes. Studies suggest that consistent short-session learning through apps can produce results comparable to traditional classroom instruction over time.

However, the relationship between smartphones and learning is not simple. Research consistently shows that the presence of a smartphone on a desk — even when turned face down — reduces students' cognitive capacity to concentrate. The constant pull of social media notifications, messaging apps, and entertainment platforms competes with academic focus in ways that previous generations never had to confront.

Schools around the world have responded differently. France banned smartphones in schools for all students under 15 in 2018. Other countries have introduced "phone-free" classroom policies that require students to deposit their devices in pouches at the start of class. Some educators argue that rather than banning phones, schools should teach students how to use them responsibly — developing what experts call "digital literacy."

The debate is not likely to be resolved soon. What is clear is that smartphones, like all powerful tools, are neither purely beneficial nor purely harmful. Their impact on education ultimately depends on how students, teachers, and policymakers choose to use and regulate them.`,
          stimulusLabel: 'Read the article.',
          text: 'What did France do regarding smartphones in schools in 2018?',
          options: [
            'It made smartphones mandatory for all students.',
            'It banned smartphones for students under 15.',
            'It provided free smartphones to all public school students.',
            'It introduced a smartphone literacy program.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: `How Smartphones Transformed Education

When the first iPhone was released in 2007, few people imagined that the small device in their pocket would fundamentally reshape the way the world learns. Nearly two decades later, smartphones have become one of the most powerful — and controversial — tools in education.

The benefits are substantial. Smartphones give students instant access to a near-unlimited wealth of information. A student in a remote Colombian village can watch a lecture by a professor at Harvard, practice algebra with an adaptive learning app, or collaborate on a group project in real time with classmates on the other side of the country. For learners in communities where quality teachers and textbooks are scarce, the smartphone can serve as a gateway to educational resources that would have been unthinkable a generation ago.

Language learning, in particular, has been transformed. Apps like Duolingo, Babbel, and LinguaGo have made it possible to study a foreign language during a commute, a lunch break, or a spare ten minutes between classes. Studies suggest that consistent short-session learning through apps can produce results comparable to traditional classroom instruction over time.

However, the relationship between smartphones and learning is not simple. Research consistently shows that the presence of a smartphone on a desk — even when turned face down — reduces students' cognitive capacity to concentrate. The constant pull of social media notifications, messaging apps, and entertainment platforms competes with academic focus in ways that previous generations never had to confront.

Schools around the world have responded differently. France banned smartphones in schools for all students under 15 in 2018. Other countries have introduced "phone-free" classroom policies that require students to deposit their devices in pouches at the start of class. Some educators argue that rather than banning phones, schools should teach students how to use them responsibly — developing what experts call "digital literacy."

The debate is not likely to be resolved soon. What is clear is that smartphones, like all powerful tools, are neither purely beneficial nor purely harmful. Their impact on education ultimately depends on how students, teachers, and policymakers choose to use and regulate them.`,
          stimulusLabel: 'Read the article.',
          text: 'What do some educators suggest as an alternative to banning phones in schools?',
          options: [
            'Replacing all physical textbooks with smartphones.',
            'Teaching students to use their phones responsibly through digital literacy education.',
            'Allowing students to use phones only during lunch breaks.',
            'Creating a separate smartphone class as an elective subject.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: `How Smartphones Transformed Education

When the first iPhone was released in 2007, few people imagined that the small device in their pocket would fundamentally reshape the way the world learns. Nearly two decades later, smartphones have become one of the most powerful — and controversial — tools in education.

The benefits are substantial. Smartphones give students instant access to a near-unlimited wealth of information. A student in a remote Colombian village can watch a lecture by a professor at Harvard, practice algebra with an adaptive learning app, or collaborate on a group project in real time with classmates on the other side of the country. For learners in communities where quality teachers and textbooks are scarce, the smartphone can serve as a gateway to educational resources that would have been unthinkable a generation ago.

Language learning, in particular, has been transformed. Apps like Duolingo, Babbel, and LinguaGo have made it possible to study a foreign language during a commute, a lunch break, or a spare ten minutes between classes. Studies suggest that consistent short-session learning through apps can produce results comparable to traditional classroom instruction over time.

However, the relationship between smartphones and learning is not simple. Research consistently shows that the presence of a smartphone on a desk — even when turned face down — reduces students' cognitive capacity to concentrate. The constant pull of social media notifications, messaging apps, and entertainment platforms competes with academic focus in ways that previous generations never had to confront.

Schools around the world have responded differently. France banned smartphones in schools for all students under 15 in 2018. Other countries have introduced "phone-free" classroom policies that require students to deposit their devices in pouches at the start of class. Some educators argue that rather than banning phones, schools should teach students how to use them responsibly — developing what experts call "digital literacy."

The debate is not likely to be resolved soon. What is clear is that smartphones, like all powerful tools, are neither purely beneficial nor purely harmful. Their impact on education ultimately depends on how students, teachers, and policymakers choose to use and regulate them.`,
          stimulusLabel: 'Read the article.',
          text: 'The phrase "a gateway to educational resources" suggests that the smartphone:',
          options: [
            'Is a physical door that opens to a school library.',
            'Provides entry or access to learning opportunities that were previously out of reach.',
            'Is the only tool students need to complete their education.',
            'Limits the type of information students can access.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: `How Smartphones Transformed Education

When the first iPhone was released in 2007, few people imagined that the small device in their pocket would fundamentally reshape the way the world learns. Nearly two decades later, smartphones have become one of the most powerful — and controversial — tools in education.

The benefits are substantial. Smartphones give students instant access to a near-unlimited wealth of information. A student in a remote Colombian village can watch a lecture by a professor at Harvard, practice algebra with an adaptive learning app, or collaborate on a group project in real time with classmates on the other side of the country. For learners in communities where quality teachers and textbooks are scarce, the smartphone can serve as a gateway to educational resources that would have been unthinkable a generation ago.

Language learning, in particular, has been transformed. Apps like Duolingo, Babbel, and LinguaGo have made it possible to study a foreign language during a commute, a lunch break, or a spare ten minutes between classes. Studies suggest that consistent short-session learning through apps can produce results comparable to traditional classroom instruction over time.

However, the relationship between smartphones and learning is not simple. Research consistently shows that the presence of a smartphone on a desk — even when turned face down — reduces students' cognitive capacity to concentrate. The constant pull of social media notifications, messaging apps, and entertainment platforms competes with academic focus in ways that previous generations never had to confront.

Schools around the world have responded differently. France banned smartphones in schools for all students under 15 in 2018. Other countries have introduced "phone-free" classroom policies that require students to deposit their devices in pouches at the start of class. Some educators argue that rather than banning phones, schools should teach students how to use them responsibly — developing what experts call "digital literacy."

The debate is not likely to be resolved soon. What is clear is that smartphones, like all powerful tools, are neither purely beneficial nor purely harmful. Their impact on education ultimately depends on how students, teachers, and policymakers choose to use and regulate them.`,
          stimulusLabel: 'Read the article.',
          text: 'What conclusion does the author reach about smartphones in education?',
          options: [
            'They are always harmful and should be banned everywhere.',
            'Their educational value depends entirely on the app being used.',
            'Their impact depends on how they are used and regulated by students and schools.',
            'They have made traditional teachers unnecessary.',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 7,
      title: 'Parte 7 — Texto de opinion',
      instructions: "Read the opinion text and answer the questions about the author's argument.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          stimulus: `Technology in Classrooms: A Revolution or a Distraction?

Walk into any modern classroom and you are likely to see students with tablets on their desks, interactive whiteboards on the walls, and teachers using digital platforms to assign and collect work. Technology in education has become so widespread that many treat it as self-evidently good. I believe this assumption deserves serious scrutiny.

I do not deny that technology offers genuine advantages. Educational apps can adapt to individual learning paces, providing struggling students with extra practice and challenging advanced learners at the same time. Video lessons can make complex topics visual and engaging. Digital tools can connect students with experts, libraries, and peers around the globe in ways that paper and blackboards simply cannot.

But the uncritical adoption of technology in classrooms carries real risks. First, there is the distraction problem. A student with a tablet in front of them has access not only to educational content but also to games, videos, and social media. The temptation to drift off-task is constant and powerful. Second, there is the question of equity. Digital tools cost money. Schools in low-income areas often lack the devices, infrastructure, or technical support to implement technology effectively, meaning that well-funded schools benefit while others fall further behind.

Perhaps most importantly, there is the risk that we mistake the tool for the teaching. A poorly designed digital lesson is no better than a poorly designed paper worksheet. The quality of instruction — the ability of a teacher to inspire curiosity, explain difficult ideas clearly, and build relationships with students — cannot be replaced by a screen.

My view is this: technology should serve education, not define it. When used purposefully, with clear pedagogical goals and proper support for teachers and students, digital tools can be transformative. When adopted simply because they appear modern, they may do more harm than good. The classroom of the future must be built around great teaching first, and great technology second.`,
          stimulusLabel: 'Read the opinion article.',
          text: "What is the author's main argument?",
          options: [
            'Technology should be completely removed from all schools immediately.',
            'Technology is always beneficial when used in classrooms.',
            'Technology should support good teaching, not replace or define it.',
            'Only wealthy schools should have access to educational technology.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: `Technology in Classrooms: A Revolution or a Distraction?

Walk into any modern classroom and you are likely to see students with tablets on their desks, interactive whiteboards on the walls, and teachers using digital platforms to assign and collect work. Technology in education has become so widespread that many treat it as self-evidently good. I believe this assumption deserves serious scrutiny.

I do not deny that technology offers genuine advantages. Educational apps can adapt to individual learning paces, providing struggling students with extra practice and challenging advanced learners at the same time. Video lessons can make complex topics visual and engaging. Digital tools can connect students with experts, libraries, and peers around the globe in ways that paper and blackboards simply cannot.

But the uncritical adoption of technology in classrooms carries real risks. First, there is the distraction problem. A student with a tablet in front of them has access not only to educational content but also to games, videos, and social media. The temptation to drift off-task is constant and powerful. Second, there is the question of equity. Digital tools cost money. Schools in low-income areas often lack the devices, infrastructure, or technical support to implement technology effectively, meaning that well-funded schools benefit while others fall further behind.

Perhaps most importantly, there is the risk that we mistake the tool for the teaching. A poorly designed digital lesson is no better than a poorly designed paper worksheet. The quality of instruction — the ability of a teacher to inspire curiosity, explain difficult ideas clearly, and build relationships with students — cannot be replaced by a screen.

My view is this: technology should serve education, not define it. When used purposefully, with clear pedagogical goals and proper support for teachers and students, digital tools can be transformative. When adopted simply because they appear modern, they may do more harm than good. The classroom of the future must be built around great teaching first, and great technology second.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What benefit of technology does the author acknowledge?',
          options: [
            'It eliminates the need for teachers in most subjects.',
            'Apps can adapt to different learning speeds and challenge each student appropriately.',
            'It makes all students equally successful, regardless of background.',
            'Tablets are cheaper than traditional textbooks.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: `Technology in Classrooms: A Revolution or a Distraction?

Walk into any modern classroom and you are likely to see students with tablets on their desks, interactive whiteboards on the walls, and teachers using digital platforms to assign and collect work. Technology in education has become so widespread that many treat it as self-evidently good. I believe this assumption deserves serious scrutiny.

I do not deny that technology offers genuine advantages. Educational apps can adapt to individual learning paces, providing struggling students with extra practice and challenging advanced learners at the same time. Video lessons can make complex topics visual and engaging. Digital tools can connect students with experts, libraries, and peers around the globe in ways that paper and blackboards simply cannot.

But the uncritical adoption of technology in classrooms carries real risks. First, there is the distraction problem. A student with a tablet in front of them has access not only to educational content but also to games, videos, and social media. The temptation to drift off-task is constant and powerful. Second, there is the question of equity. Digital tools cost money. Schools in low-income areas often lack the devices, infrastructure, or technical support to implement technology effectively, meaning that well-funded schools benefit while others fall further behind.

Perhaps most importantly, there is the risk that we mistake the tool for the teaching. A poorly designed digital lesson is no better than a poorly designed paper worksheet. The quality of instruction — the ability of a teacher to inspire curiosity, explain difficult ideas clearly, and build relationships with students — cannot be replaced by a screen.

My view is this: technology should serve education, not define it. When used purposefully, with clear pedagogical goals and proper support for teachers and students, digital tools can be transformative. When adopted simply because they appear modern, they may do more harm than good. The classroom of the future must be built around great teaching first, and great technology second.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What equity concern does the author raise about technology in schools?',
          options: [
            'Technology companies charge schools too much for their products.',
            'Rich students use technology more efficiently than poor students.',
            'Low-income schools often lack the resources to implement technology effectively, widening the gap.',
            'Technology reduces teacher salaries in poorer schools.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: `Technology in Classrooms: A Revolution or a Distraction?

Walk into any modern classroom and you are likely to see students with tablets on their desks, interactive whiteboards on the walls, and teachers using digital platforms to assign and collect work. Technology in education has become so widespread that many treat it as self-evidently good. I believe this assumption deserves serious scrutiny.

I do not deny that technology offers genuine advantages. Educational apps can adapt to individual learning paces, providing struggling students with extra practice and challenging advanced learners at the same time. Video lessons can make complex topics visual and engaging. Digital tools can connect students with experts, libraries, and peers around the globe in ways that paper and blackboards simply cannot.

But the uncritical adoption of technology in classrooms carries real risks. First, there is the distraction problem. A student with a tablet in front of them has access not only to educational content but also to games, videos, and social media. The temptation to drift off-task is constant and powerful. Second, there is the question of equity. Digital tools cost money. Schools in low-income areas often lack the devices, infrastructure, or technical support to implement technology effectively, meaning that well-funded schools benefit while others fall further behind.

Perhaps most importantly, there is the risk that we mistake the tool for the teaching. A poorly designed digital lesson is no better than a poorly designed paper worksheet. The quality of instruction — the ability of a teacher to inspire curiosity, explain difficult ideas clearly, and build relationships with students — cannot be replaced by a screen.

My view is this: technology should serve education, not define it. When used purposefully, with clear pedagogical goals and proper support for teachers and students, digital tools can be transformative. When adopted simply because they appear modern, they may do more harm than good. The classroom of the future must be built around great teaching first, and great technology second.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the author mean by "we mistake the tool for the teaching"?',
          options: [
            'Teachers sometimes use the wrong digital tool for a lesson.',
            'Schools confuse having technology with actually providing quality education.',
            'Students learn better with physical tools than with digital ones.',
            'Technology companies pretend their products improve teaching.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: `Technology in Classrooms: A Revolution or a Distraction?

Walk into any modern classroom and you are likely to see students with tablets on their desks, interactive whiteboards on the walls, and teachers using digital platforms to assign and collect work. Technology in education has become so widespread that many treat it as self-evidently good. I believe this assumption deserves serious scrutiny.

I do not deny that technology offers genuine advantages. Educational apps can adapt to individual learning paces, providing struggling students with extra practice and challenging advanced learners at the same time. Video lessons can make complex topics visual and engaging. Digital tools can connect students with experts, libraries, and peers around the globe in ways that paper and blackboards simply cannot.

But the uncritical adoption of technology in classrooms carries real risks. First, there is the distraction problem. A student with a tablet in front of them has access not only to educational content but also to games, videos, and social media. The temptation to drift off-task is constant and powerful. Second, there is the question of equity. Digital tools cost money. Schools in low-income areas often lack the devices, infrastructure, or technical support to implement technology effectively, meaning that well-funded schools benefit while others fall further behind.

Perhaps most importantly, there is the risk that we mistake the tool for the teaching. A poorly designed digital lesson is no better than a poorly designed paper worksheet. The quality of instruction — the ability of a teacher to inspire curiosity, explain difficult ideas clearly, and build relationships with students — cannot be replaced by a screen.

My view is this: technology should serve education, not define it. When used purposefully, with clear pedagogical goals and proper support for teachers and students, digital tools can be transformative. When adopted simply because they appear modern, they may do more harm than good. The classroom of the future must be built around great teaching first, and great technology second.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'According to the author, when does technology have a truly positive impact in education?',
          options: [
            'When every student in the class has the same device.',
            'When it is used purposefully with clear goals and proper teacher support.',
            'When students choose their own apps and platforms.',
            'When schools replace all traditional textbooks with tablets.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: `Technology in Classrooms: A Revolution or a Distraction?

Walk into any modern classroom and you are likely to see students with tablets on their desks, interactive whiteboards on the walls, and teachers using digital platforms to assign and collect work. Technology in education has become so widespread that many treat it as self-evidently good. I believe this assumption deserves serious scrutiny.

I do not deny that technology offers genuine advantages. Educational apps can adapt to individual learning paces, providing struggling students with extra practice and challenging advanced learners at the same time. Video lessons can make complex topics visual and engaging. Digital tools can connect students with experts, libraries, and peers around the globe in ways that paper and blackboards simply cannot.

But the uncritical adoption of technology in classrooms carries real risks. First, there is the distraction problem. A student with a tablet in front of them has access not only to educational content but also to games, videos, and social media. The temptation to drift off-task is constant and powerful. Second, there is the question of equity. Digital tools cost money. Schools in low-income areas often lack the devices, infrastructure, or technical support to implement technology effectively, meaning that well-funded schools benefit while others fall further behind.

Perhaps most importantly, there is the risk that we mistake the tool for the teaching. A poorly designed digital lesson is no better than a poorly designed paper worksheet. The quality of instruction — the ability of a teacher to inspire curiosity, explain difficult ideas clearly, and build relationships with students — cannot be replaced by a screen.

My view is this: technology should serve education, not define it. When used purposefully, with clear pedagogical goals and proper support for teachers and students, digital tools can be transformative. When adopted simply because they appear modern, they may do more harm than good. The classroom of the future must be built around great teaching first, and great technology second.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The word "scrutiny" in the first paragraph most likely means:',
          options: [
            'Celebration.',
            'Careful examination and questioning.',
            'Immediate rejection.',
            'Public debate.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: `Technology in Classrooms: A Revolution or a Distraction?

Walk into any modern classroom and you are likely to see students with tablets on their desks, interactive whiteboards on the walls, and teachers using digital platforms to assign and collect work. Technology in education has become so widespread that many treat it as self-evidently good. I believe this assumption deserves serious scrutiny.

I do not deny that technology offers genuine advantages. Educational apps can adapt to individual learning paces, providing struggling students with extra practice and challenging advanced learners at the same time. Video lessons can make complex topics visual and engaging. Digital tools can connect students with experts, libraries, and peers around the globe in ways that paper and blackboards simply cannot.

But the uncritical adoption of technology in classrooms carries real risks. First, there is the distraction problem. A student with a tablet in front of them has access not only to educational content but also to games, videos, and social media. The temptation to drift off-task is constant and powerful. Second, there is the question of equity. Digital tools cost money. Schools in low-income areas often lack the devices, infrastructure, or technical support to implement technology effectively, meaning that well-funded schools benefit while others fall further behind.

Perhaps most importantly, there is the risk that we mistake the tool for the teaching. A poorly designed digital lesson is no better than a poorly designed paper worksheet. The quality of instruction — the ability of a teacher to inspire curiosity, explain difficult ideas clearly, and build relationships with students — cannot be replaced by a screen.

My view is this: technology should serve education, not define it. When used purposefully, with clear pedagogical goals and proper support for teachers and students, digital tools can be transformative. When adopted simply because they appear modern, they may do more harm than good. The classroom of the future must be built around great teaching first, and great technology second.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'Which statement best describes the author\'s overall position on classroom technology?',
          options: [
            'Technology is a complete failure in educational settings.',
            'Technology is always more effective than traditional methods.',
            'Technology is a valuable tool when used intentionally, but it must not overshadow quality teaching.',
            'Schools should wait another decade before introducing any digital tools.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
