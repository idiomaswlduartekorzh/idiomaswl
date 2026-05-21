import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-15',
  examSlug: 'icfes',
  title: 'Mock 15 · Educación y aprendizaje',
  subtitle: 'Saber 11 · Componente de Inglés · 55 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [
    {
      part: 1,
      title: 'Parte 1 — Vocabulario: relacionar palabras',
      instructions: 'Match each definition with the word that best fits it.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          text: 'The set of subjects and topics that are officially taught in a school or educational institution.',
          options: ['Curriculum', 'Timetable', 'Transcript', 'Assessment'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'Required by law or official rules; not optional.',
          options: [
            'Voluntary',
            'Compulsory',
            'Selective',
            'Recommended',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'The ability to read and write at a basic functional level.',
          options: ['Numeracy', 'Fluency', 'Literacy', 'Proficiency'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'An amount of money given to a student to help pay for their education, usually based on academic merit or financial need.',
          options: ['Allowance', 'Stipend', 'Dividend', 'Scholarship'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'To carefully examine something in order to judge its quality, value, or effectiveness.',
          options: ['Observe', 'Evaluate', 'Describe', 'Compile'],
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
          stimulus: 'Student: "Professor, I struggled with the last exam. Can you help me understand where I went wrong?"\nProfessor: _______',
          text: 'What is the most helpful response from the professor?',
          options: [
            '"Of course. Let\'s go through your answers together during my office hours."',
            '"Exams are meant to be difficult — you should study harder."',
            '"You should have paid more attention in class."',
            '"I can\'t discuss individual results with students."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Parent: "My daughter is applying for a scholarship. What documents does she need?"\nAdministrator: _______',
          text: 'What is the most relevant response from the administrator?',
          options: [
            '"We only offer scholarships to students who already graduated."',
            '"Scholarships are very competitive this year."',
            '"You should check the university\'s general website for that information."',
            '"She will need her academic transcript, a personal statement, and two reference letters."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Student A: "Are you taking any online courses this semester?"\nStudent B: "Yes, I enrolled in one about data analysis. It\'s quite challenging."\nStudent A: _______',
          text: 'What does Student A say next?',
          options: [
            '"I prefer watching videos on social media instead."',
            '"Online courses are usually much easier than regular classes."',
            '"I\'ve heard that course is very practical. Is it helping you at work?"',
            '"Data analysis is not useful unless you study engineering."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Teacher: "I\'ve noticed you haven\'t submitted the last three assignments. Is everything alright?"\nStudent: _______',
          text: 'What is the most appropriate response from the student?',
          options: [
            '"Those assignments were too difficult anyway."',
            '"I submitted them — you must have lost them."',
            '"I\'ve been dealing with some personal issues at home, but I\'ll catch up this week."',
            '"Assignments don\'t really affect my grade that much."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Colleague A: "I\'m thinking about going back to university to get a master\'s degree."\nColleague B: "That\'s a big commitment. Have you thought about how you\'ll manage it with your job?"\nColleague A: _______',
          text: 'What does Colleague A say?',
          options: [
            '"I\'ll probably quit my job and study full-time."',
            '"I haven\'t really thought about it at all."',
            '"University is not worth the investment at my age."',
            '"Yes, I\'ve looked into evening programs that let me keep working while I study."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'School librarian: "We\'re closing in ten minutes. Were you able to find what you needed?"\nStudent: _______',
          text: 'What is the most natural student response?',
          options: [
            '"Almost — could you quickly point me to the section on educational psychology?"',
            '"I\'ll just use Wikipedia instead."',
            '"Libraries are outdated. Everything is online now."',
            '"I didn\'t realize the library had a closing time."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Interviewer: "Why did you decide to become a teacher?"\nCandidate: _______',
          text: 'What is the most compelling and appropriate response?',
          options: [
            '"Teaching was the only job available when I graduated."',
            '"I\'ve always believed that good education can transform a person\'s life, and I want to be part of that."',
            '"I haven\'t really decided — I\'m still thinking about other careers."',
            '"I wanted a job with long holidays."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Student: "I don\'t understand why we have to memorize all these formulas. Can\'t we just use a calculator?"\nMath teacher: "The point isn\'t just to get the answer — it\'s to understand the process."\nStudent: _______',
          text: 'What does the student say next?',
          options: [
            '"I think memorization is more important than understanding."',
            '"Then why do we have calculators at all?"',
            '"I disagree — in real life, everyone uses technology."',
            '"I suppose that makes sense. Understanding the logic helps when problems get more complex."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Principal: "We\'re introducing a new bilingual program starting next year. All core subjects will be taught in both Spanish and English."\nTeacher: _______',
          text: 'What is the most professional teacher response?',
          options: [
            '"I don\'t think students are ready for that kind of change."',
            '"Bilingual education has never worked anywhere in the world."',
            '"That will require significant preparation. Will there be professional training for teachers?"',
            '"I prefer to teach only in Spanish — it\'s simpler."',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 3,
      title: 'Parte 3 — Texto con espacios',
      instructions: 'Read the passage and choose the word or phrase that best fits each numbered blank.',
      questions: [
        {
          type: 'mcq',
          id: 'p3q1',
          part: 3,
          stimulus: `Online Learning: Opportunities and Challenges

Online learning has become one of the fastest-growing trends in education. (1) the rapid expansion of internet access, millions of students around the world can now attend classes without leaving their homes. Platforms such as Coursera, edX, and Khan Academy (2) free or low-cost courses in almost every subject imaginable. This has (3) the way people think about formal education.

However, online learning is not without its difficulties. One of the greatest challenges is maintaining motivation. When students study independently, (4) no teacher physically present, it is easy to become distracted or fall behind. (5), many courses have very high dropout rates compared to traditional classrooms.

Another concern is the quality of interaction. While video calls and discussion forums can help, they rarely replicate the experience of face-to-face learning. Students (6) in physical classrooms tend to ask more questions and receive immediate feedback. In contrast, online learners must often (7) days for a response to a simple query.

Despite these limitations, the advantages are significant. Online courses offer flexibility — students can study (8) their own pace and schedule. If universities are to remain relevant, they (9) find ways to combine the best of both worlds: the flexibility of online learning with the engagement of in-person instruction.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (1).',
          options: ['Despite', 'Thanks to', 'Instead of', 'Due to lack of'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          stimulus: `Online Learning: Opportunities and Challenges

Online learning has become one of the fastest-growing trends in education. (1) the rapid expansion of internet access, millions of students around the world can now attend classes without leaving their homes. Platforms such as Coursera, edX, and Khan Academy (2) free or low-cost courses in almost every subject imaginable. This has (3) the way people think about formal education.

However, online learning is not without its difficulties. One of the greatest challenges is maintaining motivation. When students study independently, (4) no teacher physically present, it is easy to become distracted or fall behind. (5), many courses have very high dropout rates compared to traditional classrooms.

Another concern is the quality of interaction. While video calls and discussion forums can help, they rarely replicate the experience of face-to-face learning. Students (6) in physical classrooms tend to ask more questions and receive immediate feedback. In contrast, online learners must often (7) days for a response to a simple query.

Despite these limitations, the advantages are significant. Online courses offer flexibility — students can study (8) their own pace and schedule. If universities are to remain relevant, they (9) find ways to combine the best of both worlds: the flexibility of online learning with the engagement of in-person instruction.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (2).',
          options: [
            'offer',
            'has offered',
            'offered',
            'are offering',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          stimulus: `Online Learning: Opportunities and Challenges

Online learning has become one of the fastest-growing trends in education. (1) the rapid expansion of internet access, millions of students around the world can now attend classes without leaving their homes. Platforms such as Coursera, edX, and Khan Academy (2) free or low-cost courses in almost every subject imaginable. This has (3) the way people think about formal education.

However, online learning is not without its difficulties. One of the greatest challenges is maintaining motivation. When students study independently, (4) no teacher physically present, it is easy to become distracted or fall behind. (5), many courses have very high dropout rates compared to traditional classrooms.

Another concern is the quality of interaction. While video calls and discussion forums can help, they rarely replicate the experience of face-to-face learning. Students (6) in physical classrooms tend to ask more questions and receive immediate feedback. In contrast, online learners must often (7) days for a response to a simple query.

Despite these limitations, the advantages are significant. Online courses offer flexibility — students can study (8) their own pace and schedule. If universities are to remain relevant, they (9) find ways to combine the best of both worlds: the flexibility of online learning with the engagement of in-person instruction.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (3).',
          options: ['transformed', 'transform', 'transforming', 'been transforming'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          stimulus: `Online Learning: Opportunities and Challenges

Online learning has become one of the fastest-growing trends in education. (1) the rapid expansion of internet access, millions of students around the world can now attend classes without leaving their homes. Platforms such as Coursera, edX, and Khan Academy (2) free or low-cost courses in almost every subject imaginable. This has (3) the way people think about formal education.

However, online learning is not without its difficulties. One of the greatest challenges is maintaining motivation. When students study independently, (4) no teacher physically present, it is easy to become distracted or fall behind. (5), many courses have very high dropout rates compared to traditional classrooms.

Another concern is the quality of interaction. While video calls and discussion forums can help, they rarely replicate the experience of face-to-face learning. Students (6) in physical classrooms tend to ask more questions and receive immediate feedback. In contrast, online learners must often (7) days for a response to a simple query.

Despite these limitations, the advantages are significant. Online courses offer flexibility — students can study (8) their own pace and schedule. If universities are to remain relevant, they (9) find ways to combine the best of both worlds: the flexibility of online learning with the engagement of in-person instruction.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (4).',
          options: [
            'because of',
            'although',
            'with',
            'provided that',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          stimulus: `Online Learning: Opportunities and Challenges

Online learning has become one of the fastest-growing trends in education. (1) the rapid expansion of internet access, millions of students around the world can now attend classes without leaving their homes. Platforms such as Coursera, edX, and Khan Academy (2) free or low-cost courses in almost every subject imaginable. This has (3) the way people think about formal education.

However, online learning is not without its difficulties. One of the greatest challenges is maintaining motivation. When students study independently, (4) no teacher physically present, it is easy to become distracted or fall behind. (5), many courses have very high dropout rates compared to traditional classrooms.

Another concern is the quality of interaction. While video calls and discussion forums can help, they rarely replicate the experience of face-to-face learning. Students (6) in physical classrooms tend to ask more questions and receive immediate feedback. In contrast, online learners must often (7) days for a response to a simple query.

Despite these limitations, the advantages are significant. Online courses offer flexibility — students can study (8) their own pace and schedule. If universities are to remain relevant, they (9) find ways to combine the best of both worlds: the flexibility of online learning with the engagement of in-person instruction.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (5).',
          options: [
            'Although',
            'Therefore',
            'On the contrary',
            'As a result of this',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          stimulus: `Online Learning: Opportunities and Challenges

Online learning has become one of the fastest-growing trends in education. (1) the rapid expansion of internet access, millions of students around the world can now attend classes without leaving their homes. Platforms such as Coursera, edX, and Khan Academy (2) free or low-cost courses in almost every subject imaginable. This has (3) the way people think about formal education.

However, online learning is not without its difficulties. One of the greatest challenges is maintaining motivation. When students study independently, (4) no teacher physically present, it is easy to become distracted or fall behind. (5), many courses have very high dropout rates compared to traditional classrooms.

Another concern is the quality of interaction. While video calls and discussion forums can help, they rarely replicate the experience of face-to-face learning. Students (6) in physical classrooms tend to ask more questions and receive immediate feedback. In contrast, online learners must often (7) days for a response to a simple query.

Despite these limitations, the advantages are significant. Online courses offer flexibility — students can study (8) their own pace and schedule. If universities are to remain relevant, they (9) find ways to combine the best of both worlds: the flexibility of online learning with the engagement of in-person instruction.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (6).',
          options: ['who enrolled', 'enrolling', 'have enrolled', 'enrolled'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          stimulus: `Online Learning: Opportunities and Challenges

Online learning has become one of the fastest-growing trends in education. (1) the rapid expansion of internet access, millions of students around the world can now attend classes without leaving their homes. Platforms such as Coursera, edX, and Khan Academy (2) free or low-cost courses in almost every subject imaginable. This has (3) the way people think about formal education.

However, online learning is not without its difficulties. One of the greatest challenges is maintaining motivation. When students study independently, (4) no teacher physically present, it is easy to become distracted or fall behind. (5), many courses have very high dropout rates compared to traditional classrooms.

Another concern is the quality of interaction. While video calls and discussion forums can help, they rarely replicate the experience of face-to-face learning. Students (6) in physical classrooms tend to ask more questions and receive immediate feedback. In contrast, online learners must often (7) days for a response to a simple query.

Despite these limitations, the advantages are significant. Online courses offer flexibility — students can study (8) their own pace and schedule. If universities are to remain relevant, they (9) find ways to combine the best of both worlds: the flexibility of online learning with the engagement of in-person instruction.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (7).',
          options: ['wait', 'to wait', 'waiting', 'waited'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          stimulus: `Online Learning: Opportunities and Challenges

Online learning has become one of the fastest-growing trends in education. (1) the rapid expansion of internet access, millions of students around the world can now attend classes without leaving their homes. Platforms such as Coursera, edX, and Khan Academy (2) free or low-cost courses in almost every subject imaginable. This has (3) the way people think about formal education.

However, online learning is not without its difficulties. One of the greatest challenges is maintaining motivation. When students study independently, (4) no teacher physically present, it is easy to become distracted or fall behind. (5), many courses have very high dropout rates compared to traditional classrooms.

Another concern is the quality of interaction. While video calls and discussion forums can help, they rarely replicate the experience of face-to-face learning. Students (6) in physical classrooms tend to ask more questions and receive immediate feedback. In contrast, online learners must often (7) days for a response to a simple query.

Despite these limitations, the advantages are significant. Online courses offer flexibility — students can study (8) their own pace and schedule. If universities are to remain relevant, they (9) find ways to combine the best of both worlds: the flexibility of online learning with the engagement of in-person instruction.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (8).',
          options: [
            'for',
            'in',
            'on',
            'at',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          stimulus: `Online Learning: Opportunities and Challenges

Online learning has become one of the fastest-growing trends in education. (1) the rapid expansion of internet access, millions of students around the world can now attend classes without leaving their homes. Platforms such as Coursera, edX, and Khan Academy (2) free or low-cost courses in almost every subject imaginable. This has (3) the way people think about formal education.

However, online learning is not without its difficulties. One of the greatest challenges is maintaining motivation. When students study independently, (4) no teacher physically present, it is easy to become distracted or fall behind. (5), many courses have very high dropout rates compared to traditional classrooms.

Another concern is the quality of interaction. While video calls and discussion forums can help, they rarely replicate the experience of face-to-face learning. Students (6) in physical classrooms tend to ask more questions and receive immediate feedback. In contrast, online learners must often (7) days for a response to a simple query.

Despite these limitations, the advantages are significant. Online courses offer flexibility — students can study (8) their own pace and schedule. If universities are to remain relevant, they (9) find ways to combine the best of both worlds: the flexibility of online learning with the engagement of in-person instruction.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (9).',
          options: [
            'should',
            'would',
            'must',
            'might',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 4,
      title: 'Parte 4 — Avisos y anuncios',
      instructions: 'Read each notice carefully and answer the questions that follow.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          stimulus: `CIUDAD VERDE PUBLIC LIBRARY
— RULES FOR BORROWERS —
Maximum loan period: 3 weeks
Maximum items per card: 6 books, 2 DVDs
Renewals: up to 2 times online or in person
Overdue fines: $0.20 per day per item
Lost or damaged items must be replaced at full cost
Silence must be maintained on all floors
Mobile phones must be switched off or set to silent
Reference materials may not be taken out of the library`,
          stimulusLabel: 'Read the library notice.',
          text: 'According to the notice, what happens if a borrower damages a book?',
          options: [
            'They must pay to replace the item at its full cost.',
            'They must pay a $0.20 daily fine.',
            'They must apologize in writing to the library.',
            'They lose their library card permanently.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: `CIUDAD VERDE PUBLIC LIBRARY
— RULES FOR BORROWERS —
Maximum loan period: 3 weeks
Maximum items per card: 6 books, 2 DVDs
Renewals: up to 2 times online or in person
Overdue fines: $0.20 per day per item
Lost or damaged items must be replaced at full cost
Silence must be maintained on all floors
Mobile phones must be switched off or set to silent
Reference materials may not be taken out of the library`,
          stimulusLabel: 'Read the library notice.',
          text: 'Which of the following is NOT allowed according to the library rules?',
          options: [
            'Renewing a book a second time.',
            'Borrowing up to six books at once.',
            'Taking a reference book home.',
            'Using the phone on silent mode.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: `NATIONAL MERIT SCHOLARSHIP — APPLICATIONS NOW OPEN
Eligibility:
- Colombian nationals enrolled in Grade 11
- Minimum GPA of 4.0 (out of 5.0)
- Demonstrated financial need
Application documents:
- Academic transcript (certified copy)
- Personal essay (500–700 words)
- Letter of recommendation from a teacher
- Proof of household income
Deadline: October 31 — No late applications accepted
Awards: Full tuition + monthly living allowance
Submit all documents to: scholarships@icetex.gov.co`,
          stimulusLabel: 'Read the scholarship notice.',
          text: 'Who is eligible to apply for this scholarship?',
          options: [
            'Colombian Grade 11 students with a GPA of at least 4.0 who can demonstrate financial need.',
            'Any student currently enrolled in a Colombian university.',
            'Students from any country with a GPA above 3.5.',
            'High school graduates who completed their studies within the last two years.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: `NATIONAL MERIT SCHOLARSHIP — APPLICATIONS NOW OPEN
Eligibility:
- Colombian nationals enrolled in Grade 11
- Minimum GPA of 4.0 (out of 5.0)
- Demonstrated financial need
Application documents:
- Academic transcript (certified copy)
- Personal essay (500–700 words)
- Letter of recommendation from a teacher
- Proof of household income
Deadline: October 31 — No late applications accepted
Awards: Full tuition + monthly living allowance
Submit all documents to: scholarships@icetex.gov.co`,
          stimulusLabel: 'Read the scholarship notice.',
          text: 'What does the scholarship include for winners?',
          options: [
            'A one-time payment to cover school supplies.',
            'Free housing in a university dormitory.',
            'Partial tuition coverage only.',
            'Full tuition fees plus a monthly living allowance.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: `SEMESTER FINAL EXAMINATIONS
— IMPORTANT INSTRUCTIONS —
Date: December 8–12 | Time: As per official schedule
Arrive at least 15 minutes before your exam
Bring your student ID and exam permit — NO ENTRY WITHOUT BOTH
Permitted: pencils, pens, scientific calculator (non-programmable)
NOT permitted: mobile phones, smart watches, notes, or any printed material
Any student caught cheating will be immediately disqualified
Results posted online within 10 business days`,
          stimulusLabel: 'Read the exam instructions.',
          text: 'What is the purpose of this notice?',
          options: [
            'To announce the cancellation of final exams.',
            'To provide rules and instructions for upcoming final examinations.',
            'To inform students about the exam schedule for next semester.',
            'To explain how exam results will be calculated.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: `SEMESTER FINAL EXAMINATIONS
— IMPORTANT INSTRUCTIONS —
Date: December 8–12 | Time: As per official schedule
Arrive at least 15 minutes before your exam
Bring your student ID and exam permit — NO ENTRY WITHOUT BOTH
Permitted: pencils, pens, scientific calculator (non-programmable)
NOT permitted: mobile phones, smart watches, notes, or any printed material
Any student caught cheating will be immediately disqualified
Results posted online within 10 business days`,
          stimulusLabel: 'Read the exam instructions.',
          text: 'Which item is a student allowed to bring into the examination room?',
          options: [
            'A programmable graphing calculator.',
            'A mobile phone set to silent mode.',
            'Handwritten notes on a single index card.',
            'A non-programmable scientific calculator.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: `OPEN SCHOOL DAY — COME AND VISIT US!
Instituto Bilingüe San Marcos
Saturday, November 16 · 9:00 AM – 1:00 PM
Explore our campus, meet our teachers, and attend sample lessons!
Activities:
- School tour led by current students
- Demo classes in English, Science, and Math
- Q&A with the principal and admissions office
- Information about scholarship opportunities
All families are welcome. No registration required.
Address: Carrera 15 #42-10, Bogotá`,
          stimulusLabel: 'Read the school event flyer.',
          text: 'What is the main purpose of this event?',
          options: [
            'To hold final examinations for incoming students.',
            'To allow prospective families to explore the school and learn about admissions.',
            'To raise money for the school\'s sports program.',
            'To celebrate the end of the academic year with current students.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: `OPEN SCHOOL DAY — COME AND VISIT US!
Instituto Bilingüe San Marcos
Saturday, November 16 · 9:00 AM – 1:00 PM
Explore our campus, meet our teachers, and attend sample lessons!
Activities:
- School tour led by current students
- Demo classes in English, Science, and Math
- Q&A with the principal and admissions office
- Information about scholarship opportunities
All families are welcome. No registration required.
Address: Carrera 15 #42-10, Bogotá`,
          stimulusLabel: 'Read the school event flyer.',
          text: 'Which of the following is stated in the flyer?',
          options: [
            'A student-led campus tour is part of the activities.',
            'Families must register online before attending.',
            'The event takes place on a weekday morning.',
            'Admission interviews will be conducted on the day.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: `OPEN SCHOOL DAY — COME AND VISIT US!
Instituto Bilingüe San Marcos
Saturday, November 16 · 9:00 AM – 1:00 PM
Explore our campus, meet our teachers, and attend sample lessons!
Activities:
- School tour led by current students
- Demo classes in English, Science, and Math
- Q&A with the principal and admissions office
- Information about scholarship opportunities
All families are welcome. No registration required.
Address: Carrera 15 #42-10, Bogotá`,
          stimulusLabel: 'Read the school event flyer.',
          text: 'What can visiting families learn about at this event?',
          options: [
            'The school\'s annual exam results.',
            'Career opportunities for teachers.',
            'Scholarship possibilities at the school.',
            'How to apply for government education grants.',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 5,
      title: 'Parte 5 — Texto corto',
      instructions: 'Read the article and answer the questions that follow.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          stimulus: `Bilingual Education in Colombia: Progress and Challenges

Colombia's National Bilingual Program, launched in 2004, set an ambitious goal: to produce students with a strong command of both Spanish and English by the time they complete secondary school. Two decades later, the results have been mixed, reflecting both genuine progress and persistent structural obstacles.

In urban areas with well-funded schools, bilingual programs have produced measurable gains. Students at designated bilingual institutions show significantly higher English proficiency scores on the Saber 11 exam compared to the national average. Several private and public schools in Bogotá, Medellín, and Cali have earned international accreditation for their bilingual programs, attracting attention from researchers and educators across Latin America.

However, the rural-urban divide remains a major concern. In remote municipalities, many schools lack qualified English teachers altogether. A 2022 government report found that fewer than 30% of English teachers in rural schools met the B2 level required by national standards. Without adequate teacher preparation, the aspirations of any bilingual policy remain largely on paper.

Experts emphasize that bilingual education is most effective when it begins early and is sustained consistently throughout a student's schooling. Fragmented instruction — a few English classes per week with no integration across subjects — produces limited results. True bilingual education requires English to be the medium of instruction for content-area subjects, not just a class taught in isolation.

Despite the challenges, Colombia's commitment to bilingualism reflects a broader understanding: in an increasingly interconnected world, language skills are a key driver of individual opportunity and national competitiveness.`,
          stimulusLabel: 'Read the article.',
          text: 'What was the main goal of Colombia\'s National Bilingual Program?',
          options: [
            'To help students achieve a strong command of both Spanish and English by secondary school completion.',
            'To replace Spanish with English in all public schools.',
            'To improve English proficiency in private schools only.',
            'To earn international accreditation for all Colombian schools.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: `Bilingual Education in Colombia: Progress and Challenges

Colombia's National Bilingual Program, launched in 2004, set an ambitious goal: to produce students with a strong command of both Spanish and English by the time they complete secondary school. Two decades later, the results have been mixed, reflecting both genuine progress and persistent structural obstacles.

In urban areas with well-funded schools, bilingual programs have produced measurable gains. Students at designated bilingual institutions show significantly higher English proficiency scores on the Saber 11 exam compared to the national average. Several private and public schools in Bogotá, Medellín, and Cali have earned international accreditation for their bilingual programs, attracting attention from researchers and educators across Latin America.

However, the rural-urban divide remains a major concern. In remote municipalities, many schools lack qualified English teachers altogether. A 2022 government report found that fewer than 30% of English teachers in rural schools met the B2 level required by national standards. Without adequate teacher preparation, the aspirations of any bilingual policy remain largely on paper.

Experts emphasize that bilingual education is most effective when it begins early and is sustained consistently throughout a student's schooling. Fragmented instruction — a few English classes per week with no integration across subjects — produces limited results. True bilingual education requires English to be the medium of instruction for content-area subjects, not just a class taught in isolation.

Despite the challenges, Colombia's commitment to bilingualism reflects a broader understanding: in an increasingly interconnected world, language skills are a key driver of individual opportunity and national competitiveness.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the article, what did the 2022 government report reveal about rural schools?',
          options: [
            'All rural schools had now met national bilingual standards.',
            'Rural schools had better English results than urban ones.',
            'Rural students scored higher than average on the Saber 11 English section.',
            'More than 70% of rural English teachers did not meet required proficiency levels.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: `Bilingual Education in Colombia: Progress and Challenges

Colombia's National Bilingual Program, launched in 2004, set an ambitious goal: to produce students with a strong command of both Spanish and English by the time they complete secondary school. Two decades later, the results have been mixed, reflecting both genuine progress and persistent structural obstacles.

In urban areas with well-funded schools, bilingual programs have produced measurable gains. Students at designated bilingual institutions show significantly higher English proficiency scores on the Saber 11 exam compared to the national average. Several private and public schools in Bogotá, Medellín, and Cali have earned international accreditation for their bilingual programs, attracting attention from researchers and educators across Latin America.

However, the rural-urban divide remains a major concern. In remote municipalities, many schools lack qualified English teachers altogether. A 2022 government report found that fewer than 30% of English teachers in rural schools met the B2 level required by national standards. Without adequate teacher preparation, the aspirations of any bilingual policy remain largely on paper.

Experts emphasize that bilingual education is most effective when it begins early and is sustained consistently throughout a student's schooling. Fragmented instruction — a few English classes per week with no integration across subjects — produces limited results. True bilingual education requires English to be the medium of instruction for content-area subjects, not just a class taught in isolation.

Despite the challenges, Colombia's commitment to bilingualism reflects a broader understanding: in an increasingly interconnected world, language skills are a key driver of individual opportunity and national competitiveness.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "persistent" in the second paragraph most likely means:',
          options: [
            'Temporary and expected to disappear soon.',
            'Continuing to exist despite efforts to address them.',
            'Surprising and difficult to explain.',
            'Unimportant and largely ignored by policymakers.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: `Bilingual Education in Colombia: Progress and Challenges

Colombia's National Bilingual Program, launched in 2004, set an ambitious goal: to produce students with a strong command of both Spanish and English by the time they complete secondary school. Two decades later, the results have been mixed, reflecting both genuine progress and persistent structural obstacles.

In urban areas with well-funded schools, bilingual programs have produced measurable gains. Students at designated bilingual institutions show significantly higher English proficiency scores on the Saber 11 exam compared to the national average. Several private and public schools in Bogotá, Medellín, and Cali have earned international accreditation for their bilingual programs, attracting attention from researchers and educators across Latin America.

However, the rural-urban divide remains a major concern. In remote municipalities, many schools lack qualified English teachers altogether. A 2022 government report found that fewer than 30% of English teachers in rural schools met the B2 level required by national standards. Without adequate teacher preparation, the aspirations of any bilingual policy remain largely on paper.

Experts emphasize that bilingual education is most effective when it begins early and is sustained consistently throughout a student's schooling. Fragmented instruction — a few English classes per week with no integration across subjects — produces limited results. True bilingual education requires English to be the medium of instruction for content-area subjects, not just a class taught in isolation.

Despite the challenges, Colombia's commitment to bilingualism reflects a broader understanding: in an increasingly interconnected world, language skills are a key driver of individual opportunity and national competitiveness.`,
          stimulusLabel: 'Read the article.',
          text: 'According to experts, when is bilingual education most effective?',
          options: [
            'When it starts in secondary school and focuses on grammar.',
            'When students choose to study English voluntarily after school hours.',
            'When it starts early and is applied consistently throughout a student\'s education.',
            'When English is taught as a separate subject for at least five hours per week.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: `Bilingual Education in Colombia: Progress and Challenges

Colombia's National Bilingual Program, launched in 2004, set an ambitious goal: to produce students with a strong command of both Spanish and English by the time they complete secondary school. Two decades later, the results have been mixed, reflecting both genuine progress and persistent structural obstacles.

In urban areas with well-funded schools, bilingual programs have produced measurable gains. Students at designated bilingual institutions show significantly higher English proficiency scores on the Saber 11 exam compared to the national average. Several private and public schools in Bogotá, Medellín, and Cali have earned international accreditation for their bilingual programs, attracting attention from researchers and educators across Latin America.

However, the rural-urban divide remains a major concern. In remote municipalities, many schools lack qualified English teachers altogether. A 2022 government report found that fewer than 30% of English teachers in rural schools met the B2 level required by national standards. Without adequate teacher preparation, the aspirations of any bilingual policy remain largely on paper.

Experts emphasize that bilingual education is most effective when it begins early and is sustained consistently throughout a student's schooling. Fragmented instruction — a few English classes per week with no integration across subjects — produces limited results. True bilingual education requires English to be the medium of instruction for content-area subjects, not just a class taught in isolation.

Despite the challenges, Colombia's commitment to bilingualism reflects a broader understanding: in an increasingly interconnected world, language skills are a key driver of individual opportunity and national competitiveness.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the phrase "remain largely on paper" imply about rural bilingual education policy?',
          options: [
            'The policy has been widely implemented across all rural schools.',
            'The policy is written and documented but not effectively put into practice.',
            'Teachers in rural areas frequently request more written guidelines.',
            'The policy focuses too much on written exams and not enough on spoken English.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: `Bilingual Education in Colombia: Progress and Challenges

Colombia's National Bilingual Program, launched in 2004, set an ambitious goal: to produce students with a strong command of both Spanish and English by the time they complete secondary school. Two decades later, the results have been mixed, reflecting both genuine progress and persistent structural obstacles.

In urban areas with well-funded schools, bilingual programs have produced measurable gains. Students at designated bilingual institutions show significantly higher English proficiency scores on the Saber 11 exam compared to the national average. Several private and public schools in Bogotá, Medellín, and Cali have earned international accreditation for their bilingual programs, attracting attention from researchers and educators across Latin America.

However, the rural-urban divide remains a major concern. In remote municipalities, many schools lack qualified English teachers altogether. A 2022 government report found that fewer than 30% of English teachers in rural schools met the B2 level required by national standards. Without adequate teacher preparation, the aspirations of any bilingual policy remain largely on paper.

Experts emphasize that bilingual education is most effective when it begins early and is sustained consistently throughout a student's schooling. Fragmented instruction — a few English classes per week with no integration across subjects — produces limited results. True bilingual education requires English to be the medium of instruction for content-area subjects, not just a class taught in isolation.

Despite the challenges, Colombia's commitment to bilingualism reflects a broader understanding: in an increasingly interconnected world, language skills are a key driver of individual opportunity and national competitiveness.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the article say makes true bilingual education different from fragmented instruction?',
          options: [
            'In true bilingual education, students spend more time studying grammar rules.',
            'True bilingual education only takes place in private schools with international accreditation.',
            'True bilingual education uses English as the teaching language for content subjects, not just as an isolated class.',
            'Fragmented instruction is more effective for younger students than true bilingual programs.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: `Bilingual Education in Colombia: Progress and Challenges

Colombia's National Bilingual Program, launched in 2004, set an ambitious goal: to produce students with a strong command of both Spanish and English by the time they complete secondary school. Two decades later, the results have been mixed, reflecting both genuine progress and persistent structural obstacles.

In urban areas with well-funded schools, bilingual programs have produced measurable gains. Students at designated bilingual institutions show significantly higher English proficiency scores on the Saber 11 exam compared to the national average. Several private and public schools in Bogotá, Medellín, and Cali have earned international accreditation for their bilingual programs, attracting attention from researchers and educators across Latin America.

However, the rural-urban divide remains a major concern. In remote municipalities, many schools lack qualified English teachers altogether. A 2022 government report found that fewer than 30% of English teachers in rural schools met the B2 level required by national standards. Without adequate teacher preparation, the aspirations of any bilingual policy remain largely on paper.

Experts emphasize that bilingual education is most effective when it begins early and is sustained consistently throughout a student's schooling. Fragmented instruction — a few English classes per week with no integration across subjects — produces limited results. True bilingual education requires English to be the medium of instruction for content-area subjects, not just a class taught in isolation.

Despite the challenges, Colombia's commitment to bilingualism reflects a broader understanding: in an increasingly interconnected world, language skills are a key driver of individual opportunity and national competitiveness.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about the relationship between teacher quality and bilingual program success?',
          options: [
            'Without adequately trained teachers, bilingual education goals cannot realistically be achieved.',
            'Teacher quality is less important than the availability of technology in the classroom.',
            'Programs succeed mostly because of student effort, not teacher training.',
            'Countries with strict teacher standards tend to have lower bilingual program enrollment.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: `Bilingual Education in Colombia: Progress and Challenges

Colombia's National Bilingual Program, launched in 2004, set an ambitious goal: to produce students with a strong command of both Spanish and English by the time they complete secondary school. Two decades later, the results have been mixed, reflecting both genuine progress and persistent structural obstacles.

In urban areas with well-funded schools, bilingual programs have produced measurable gains. Students at designated bilingual institutions show significantly higher English proficiency scores on the Saber 11 exam compared to the national average. Several private and public schools in Bogotá, Medellín, and Cali have earned international accreditation for their bilingual programs, attracting attention from researchers and educators across Latin America.

However, the rural-urban divide remains a major concern. In remote municipalities, many schools lack qualified English teachers altogether. A 2022 government report found that fewer than 30% of English teachers in rural schools met the B2 level required by national standards. Without adequate teacher preparation, the aspirations of any bilingual policy remain largely on paper.

Experts emphasize that bilingual education is most effective when it begins early and is sustained consistently throughout a student's schooling. Fragmented instruction — a few English classes per week with no integration across subjects — produces limited results. True bilingual education requires English to be the medium of instruction for content-area subjects, not just a class taught in isolation.

Despite the challenges, Colombia's commitment to bilingualism reflects a broader understanding: in an increasingly interconnected world, language skills are a key driver of individual opportunity and national competitiveness.`,
          stimulusLabel: 'Read the article.',
          text: 'Which cities are specifically mentioned as having accredited bilingual programs?',
          options: [
            'Barranquilla, Cartagena, and Bucaramanga.',
            'Manizales, Pereira, and Armenia.',
            'Cúcuta, Pasto, and Ibagué.',
            'Bogotá, Medellín, and Cali.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: `Bilingual Education in Colombia: Progress and Challenges

Colombia's National Bilingual Program, launched in 2004, set an ambitious goal: to produce students with a strong command of both Spanish and English by the time they complete secondary school. Two decades later, the results have been mixed, reflecting both genuine progress and persistent structural obstacles.

In urban areas with well-funded schools, bilingual programs have produced measurable gains. Students at designated bilingual institutions show significantly higher English proficiency scores on the Saber 11 exam compared to the national average. Several private and public schools in Bogotá, Medellín, and Cali have earned international accreditation for their bilingual programs, attracting attention from researchers and educators across Latin America.

However, the rural-urban divide remains a major concern. In remote municipalities, many schools lack qualified English teachers altogether. A 2022 government report found that fewer than 30% of English teachers in rural schools met the B2 level required by national standards. Without adequate teacher preparation, the aspirations of any bilingual policy remain largely on paper.

Experts emphasize that bilingual education is most effective when it begins early and is sustained consistently throughout a student's schooling. Fragmented instruction — a few English classes per week with no integration across subjects — produces limited results. True bilingual education requires English to be the medium of instruction for content-area subjects, not just a class taught in isolation.

Despite the challenges, Colombia's commitment to bilingualism reflects a broader understanding: in an increasingly interconnected world, language skills are a key driver of individual opportunity and national competitiveness.`,
          stimulusLabel: 'Read the article.',
          text: 'Why does the article describe Colombia\'s bilingual program results as "mixed"?',
          options: [
            'Because the program has been cancelled and restarted several times.',
            'Because urban schools have completely failed while rural schools have thrived.',
            'Because some schools have succeeded while significant challenges remain in other areas.',
            'Because students perform well in reading but poorly in speaking skills.',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 6,
      title: 'Parte 6 — Texto largo: inferencia',
      instructions: 'Read the article carefully and answer the questions using inference and context.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          stimulus: `What PISA Really Tells Us About Education

Every three years, the results of the Programme for International Student Assessment — known as PISA — send governments around the world into a spiral of analysis, panic, and reform proposals. The test, administered to 15-year-olds in over 80 countries, measures performance in reading, mathematics, and science. When a country drops in the rankings, ministers call emergency meetings. When it rises, they claim credit for reforms they introduced years earlier. The ritual is predictable. But does PISA actually tell us what its advocates claim?

The test undeniably provides useful comparative data. Before PISA, there was little standardized way to compare education systems across national and cultural boundaries. Its data has revealed genuine patterns: countries with lower inequality tend to have higher average scores; teacher quality consistently emerges as the strongest predictor of student outcomes; and early childhood education has a measurable long-term impact on performance.

Yet the limitations are equally significant. PISA measures a narrow slice of what education can and should do. It captures performance in reading and numeracy, but says nothing about creativity, civic engagement, emotional resilience, or the ability to collaborate — capacities that most educators and employers consider essential in the 21st century. A country could maximize its PISA score by drilling students in test-taking strategies while starving the arts, physical education, and social development from its curriculum. Some researchers argue this is exactly what has happened in certain high-ranking countries.

There is also a cultural dimension that the rankings obscure. East Asian education systems — South Korea, Japan, Singapore, China — consistently top the PISA tables. Educators in Western countries frequently hold these systems up as models. But the same systems are often criticized domestically for excessive pressure, high rates of student burnout, and a culture of conformity that stifles independent thinking. High scores on a standardized test do not automatically translate into thriving, creative, or happy individuals.

None of this makes PISA worthless. It remains a valuable diagnostic tool — a signal that something may be wrong, or right, in a system. But treating it as the ultimate measure of educational success is a mistake that confuses the map with the territory.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main argument of this article?',
          options: [
            'PISA is a completely useless test that should be abolished.',
            'PISA provides useful data but measures too narrow a set of educational outcomes to be a definitive gauge of educational quality.',
            'East Asian countries have the best education systems in the world and others should copy them.',
            'PISA rankings are the most reliable way to identify successful education systems.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: `What PISA Really Tells Us About Education

Every three years, the results of the Programme for International Student Assessment — known as PISA — send governments around the world into a spiral of analysis, panic, and reform proposals. The test, administered to 15-year-olds in over 80 countries, measures performance in reading, mathematics, and science. When a country drops in the rankings, ministers call emergency meetings. When it rises, they claim credit for reforms they introduced years earlier. The ritual is predictable. But does PISA actually tell us what its advocates claim?

The test undeniably provides useful comparative data. Before PISA, there was little standardized way to compare education systems across national and cultural boundaries. Its data has revealed genuine patterns: countries with lower inequality tend to have higher average scores; teacher quality consistently emerges as the strongest predictor of student outcomes; and early childhood education has a measurable long-term impact on performance.

Yet the limitations are equally significant. PISA measures a narrow slice of what education can and should do. It captures performance in reading and numeracy, but says nothing about creativity, civic engagement, emotional resilience, or the ability to collaborate — capacities that most educators and employers consider essential in the 21st century. A country could maximize its PISA score by drilling students in test-taking strategies while starving the arts, physical education, and social development from its curriculum. Some researchers argue this is exactly what has happened in certain high-ranking countries.

There is also a cultural dimension that the rankings obscure. East Asian education systems — South Korea, Japan, Singapore, China — consistently top the PISA tables. Educators in Western countries frequently hold these systems up as models. But the same systems are often criticized domestically for excessive pressure, high rates of student burnout, and a culture of conformity that stifles independent thinking. High scores on a standardized test do not automatically translate into thriving, creative, or happy individuals.

None of this makes PISA worthless. It remains a valuable diagnostic tool — a signal that something may be wrong, or right, in a system. But treating it as the ultimate measure of educational success is a mistake that confuses the map with the territory.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the article, what is one benefit PISA has genuinely provided?',
          options: [
            'It has helped governments fire underperforming teachers.',
            'It has led to the elimination of standardized testing in most countries.',
            'It has proven that private schools are always better than public schools.',
            'It has given countries a standardized way to compare education systems across borders.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: `What PISA Really Tells Us About Education

Every three years, the results of the Programme for International Student Assessment — known as PISA — send governments around the world into a spiral of analysis, panic, and reform proposals. The test, administered to 15-year-olds in over 80 countries, measures performance in reading, mathematics, and science. When a country drops in the rankings, ministers call emergency meetings. When it rises, they claim credit for reforms they introduced years earlier. The ritual is predictable. But does PISA actually tell us what its advocates claim?

The test undeniably provides useful comparative data. Before PISA, there was little standardized way to compare education systems across national and cultural boundaries. Its data has revealed genuine patterns: countries with lower inequality tend to have higher average scores; teacher quality consistently emerges as the strongest predictor of student outcomes; and early childhood education has a measurable long-term impact on performance.

Yet the limitations are equally significant. PISA measures a narrow slice of what education can and should do. It captures performance in reading and numeracy, but says nothing about creativity, civic engagement, emotional resilience, or the ability to collaborate — capacities that most educators and employers consider essential in the 21st century. A country could maximize its PISA score by drilling students in test-taking strategies while starving the arts, physical education, and social development from its curriculum. Some researchers argue this is exactly what has happened in certain high-ranking countries.

There is also a cultural dimension that the rankings obscure. East Asian education systems — South Korea, Japan, Singapore, China — consistently top the PISA tables. Educators in Western countries frequently hold these systems up as models. But the same systems are often criticized domestically for excessive pressure, high rates of student burnout, and a culture of conformity that stifles independent thinking. High scores on a standardized test do not automatically translate into thriving, creative, or happy individuals.

None of this makes PISA worthless. It remains a valuable diagnostic tool — a signal that something may be wrong, or right, in a system. But treating it as the ultimate measure of educational success is a mistake that confuses the map with the territory.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "stifles" in the fourth paragraph most closely means:',
          options: [
            'Suppresses or prevents from developing.',
            'Encourages and develops.',
            'Measures and evaluates.',
            'Improves through structured training.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: `What PISA Really Tells Us About Education

Every three years, the results of the Programme for International Student Assessment — known as PISA — send governments around the world into a spiral of analysis, panic, and reform proposals. The test, administered to 15-year-olds in over 80 countries, measures performance in reading, mathematics, and science. When a country drops in the rankings, ministers call emergency meetings. When it rises, they claim credit for reforms they introduced years earlier. The ritual is predictable. But does PISA actually tell us what its advocates claim?

The test undeniably provides useful comparative data. Before PISA, there was little standardized way to compare education systems across national and cultural boundaries. Its data has revealed genuine patterns: countries with lower inequality tend to have higher average scores; teacher quality consistently emerges as the strongest predictor of student outcomes; and early childhood education has a measurable long-term impact on performance.

Yet the limitations are equally significant. PISA measures a narrow slice of what education can and should do. It captures performance in reading and numeracy, but says nothing about creativity, civic engagement, emotional resilience, or the ability to collaborate — capacities that most educators and employers consider essential in the 21st century. A country could maximize its PISA score by drilling students in test-taking strategies while starving the arts, physical education, and social development from its curriculum. Some researchers argue this is exactly what has happened in certain high-ranking countries.

There is also a cultural dimension that the rankings obscure. East Asian education systems — South Korea, Japan, Singapore, China — consistently top the PISA tables. Educators in Western countries frequently hold these systems up as models. But the same systems are often criticized domestically for excessive pressure, high rates of student burnout, and a culture of conformity that stifles independent thinking. High scores on a standardized test do not automatically translate into thriving, creative, or happy individuals.

None of this makes PISA worthless. It remains a valuable diagnostic tool — a signal that something may be wrong, or right, in a system. But treating it as the ultimate measure of educational success is a mistake that confuses the map with the territory.`,
          stimulusLabel: 'Read the article.',
          text: 'What contradiction does the author highlight about East Asian education systems?',
          options: [
            'They rank low on PISA despite receiving praise from Western educators.',
            'They have the lowest student happiness rates but also the lowest dropout rates.',
            'They score well in science but poorly in reading and mathematics.',
            'They are praised internationally but criticized in their own countries for causing student stress and limiting creativity.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: `What PISA Really Tells Us About Education

Every three years, the results of the Programme for International Student Assessment — known as PISA — send governments around the world into a spiral of analysis, panic, and reform proposals. The test, administered to 15-year-olds in over 80 countries, measures performance in reading, mathematics, and science. When a country drops in the rankings, ministers call emergency meetings. When it rises, they claim credit for reforms they introduced years earlier. The ritual is predictable. But does PISA actually tell us what its advocates claim?

The test undeniably provides useful comparative data. Before PISA, there was little standardized way to compare education systems across national and cultural boundaries. Its data has revealed genuine patterns: countries with lower inequality tend to have higher average scores; teacher quality consistently emerges as the strongest predictor of student outcomes; and early childhood education has a measurable long-term impact on performance.

Yet the limitations are equally significant. PISA measures a narrow slice of what education can and should do. It captures performance in reading and numeracy, but says nothing about creativity, civic engagement, emotional resilience, or the ability to collaborate — capacities that most educators and employers consider essential in the 21st century. A country could maximize its PISA score by drilling students in test-taking strategies while starving the arts, physical education, and social development from its curriculum. Some researchers argue this is exactly what has happened in certain high-ranking countries.

There is also a cultural dimension that the rankings obscure. East Asian education systems — South Korea, Japan, Singapore, China — consistently top the PISA tables. Educators in Western countries frequently hold these systems up as models. But the same systems are often criticized domestically for excessive pressure, high rates of student burnout, and a culture of conformity that stifles independent thinking. High scores on a standardized test do not automatically translate into thriving, creative, or happy individuals.

None of this makes PISA worthless. It remains a valuable diagnostic tool — a signal that something may be wrong, or right, in a system. But treating it as the ultimate measure of educational success is a mistake that confuses the map with the territory.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the author imply by saying PISA "confuses the map with the territory"?',
          options: [
            'Treating PISA rankings as the full picture of education confuses a limited measurement tool with the complex reality it tries to represent.',
            'PISA results are difficult to understand because they use complex geographic data.',
            'Countries in certain geographic regions always perform better on PISA due to climate differences.',
            'PISA rankings accurately represent every dimension of educational quality.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: `What PISA Really Tells Us About Education

Every three years, the results of the Programme for International Student Assessment — known as PISA — send governments around the world into a spiral of analysis, panic, and reform proposals. The test, administered to 15-year-olds in over 80 countries, measures performance in reading, mathematics, and science. When a country drops in the rankings, ministers call emergency meetings. When it rises, they claim credit for reforms they introduced years earlier. The ritual is predictable. But does PISA actually tell us what its advocates claim?

The test undeniably provides useful comparative data. Before PISA, there was little standardized way to compare education systems across national and cultural boundaries. Its data has revealed genuine patterns: countries with lower inequality tend to have higher average scores; teacher quality consistently emerges as the strongest predictor of student outcomes; and early childhood education has a measurable long-term impact on performance.

Yet the limitations are equally significant. PISA measures a narrow slice of what education can and should do. It captures performance in reading and numeracy, but says nothing about creativity, civic engagement, emotional resilience, or the ability to collaborate — capacities that most educators and employers consider essential in the 21st century. A country could maximize its PISA score by drilling students in test-taking strategies while starving the arts, physical education, and social development from its curriculum. Some researchers argue this is exactly what has happened in certain high-ranking countries.

There is also a cultural dimension that the rankings obscure. East Asian education systems — South Korea, Japan, Singapore, China — consistently top the PISA tables. Educators in Western countries frequently hold these systems up as models. But the same systems are often criticized domestically for excessive pressure, high rates of student burnout, and a culture of conformity that stifles independent thinking. High scores on a standardized test do not automatically translate into thriving, creative, or happy individuals.

None of this makes PISA worthless. It remains a valuable diagnostic tool — a signal that something may be wrong, or right, in a system. But treating it as the ultimate measure of educational success is a mistake that confuses the map with the territory.`,
          stimulusLabel: 'Read the article.',
          text: 'Which of the following would the author most likely agree with?',
          options: [
            'Governments should abandon PISA entirely and rely on national exams only.',
            'A high-ranked PISA score guarantees that a country has an excellent overall education system.',
            'Creativity and collaboration should be included in international education assessments.',
            'Teacher quality has little influence on student outcomes in standardized tests.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: `What PISA Really Tells Us About Education

Every three years, the results of the Programme for International Student Assessment — known as PISA — send governments around the world into a spiral of analysis, panic, and reform proposals. The test, administered to 15-year-olds in over 80 countries, measures performance in reading, mathematics, and science. When a country drops in the rankings, ministers call emergency meetings. When it rises, they claim credit for reforms they introduced years earlier. The ritual is predictable. But does PISA actually tell us what its advocates claim?

The test undeniably provides useful comparative data. Before PISA, there was little standardized way to compare education systems across national and cultural boundaries. Its data has revealed genuine patterns: countries with lower inequality tend to have higher average scores; teacher quality consistently emerges as the strongest predictor of student outcomes; and early childhood education has a measurable long-term impact on performance.

Yet the limitations are equally significant. PISA measures a narrow slice of what education can and should do. It captures performance in reading and numeracy, but says nothing about creativity, civic engagement, emotional resilience, or the ability to collaborate — capacities that most educators and employers consider essential in the 21st century. A country could maximize its PISA score by drilling students in test-taking strategies while starving the arts, physical education, and social development from its curriculum. Some researchers argue this is exactly what has happened in certain high-ranking countries.

There is also a cultural dimension that the rankings obscure. East Asian education systems — South Korea, Japan, Singapore, China — consistently top the PISA tables. Educators in Western countries frequently hold these systems up as models. But the same systems are often criticized domestically for excessive pressure, high rates of student burnout, and a culture of conformity that stifles independent thinking. High scores on a standardized test do not automatically translate into thriving, creative, or happy individuals.

None of this makes PISA worthless. It remains a valuable diagnostic tool — a signal that something may be wrong, or right, in a system. But treating it as the ultimate measure of educational success is a mistake that confuses the map with the territory.`,
          stimulusLabel: 'Read the article.',
          text: 'What tone does the author use throughout this article?',
          options: [
            'Optimistic and enthusiastic about PISA\'s potential.',
            'Balanced and critically analytical, acknowledging both the strengths and limitations of PISA.',
            'Dismissive and contemptuous toward all standardized testing.',
            'Neutral and purely descriptive without expressing any personal view.',
          ],
          answer: 1,
        },
      ],
    },
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      instructions: "Read the opinion text and answer the questions about the author's argument.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          stimulus: `Should University Education Be Free for Everyone?

Access to higher education has long been considered both a personal aspiration and a social good. Yet in most countries, students must take on significant debt or rely on family wealth to fund a university degree. I believe this is not only unjust but economically counterproductive — and that the case for free university education is stronger than many politicians are willing to admit.

The most compelling argument is one of equity. Education is the single most reliable pathway out of poverty, yet it is precisely the students from low-income backgrounds who are most deterred by the cost. When a teenager's choice of career is shaped primarily by tuition fees rather than by talent or ambition, society wastes enormous human potential. A working-class student who might have become a brilliant engineer or physician instead avoids university entirely. That is a loss not just for the individual, but for all of us.

Critics of free university argue that the cost would be enormous and that wealthier graduates, who earn more over their lifetimes, should contribute to the system they benefited from. This is a reasonable concern. But it conflates the question of who pays with the question of when they pay. A graduate tax — where university is free upfront but graduates contribute a percentage of their income above a certain threshold for a set number of years — can address this concern while maintaining open access. Several countries have explored versions of this model with positive results.

There is also the argument that free education would reduce institutional quality. If universities do not compete for tuition income, critics claim, standards will fall. But this assumes that market competition is the primary driver of educational quality — an assumption not supported by the evidence. Many of the world's top universities operate within heavily subsidized or publicly funded systems. Quality depends on investment, research culture, and teaching excellence, not on how much students pay at the gate.

The real question is not whether we can afford free university education, but whether we can afford not to have it. A society that systematically denies its most talented young people access to higher education based on their parents' income is a society that is failing its own future.`,
          stimulusLabel: 'Read the opinion article.',
          text: "What is the author's main position in this text?",
          options: [
            'Free university education is both fair and beneficial to society as a whole.',
            'University education should be abolished because it is too expensive.',
            'University should remain fee-paying to ensure high quality.',
            'Only students from low-income backgrounds should receive free university education.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: `Should University Education Be Free for Everyone?

Access to higher education has long been considered both a personal aspiration and a social good. Yet in most countries, students must take on significant debt or rely on family wealth to fund a university degree. I believe this is not only unjust but economically counterproductive — and that the case for free university education is stronger than many politicians are willing to admit.

The most compelling argument is one of equity. Education is the single most reliable pathway out of poverty, yet it is precisely the students from low-income backgrounds who are most deterred by the cost. When a teenager's choice of career is shaped primarily by tuition fees rather than by talent or ambition, society wastes enormous human potential. A working-class student who might have become a brilliant engineer or physician instead avoids university entirely. That is a loss not just for the individual, but for all of us.

Critics of free university argue that the cost would be enormous and that wealthier graduates, who earn more over their lifetimes, should contribute to the system they benefited from. This is a reasonable concern. But it conflates the question of who pays with the question of when they pay. A graduate tax — where university is free upfront but graduates contribute a percentage of their income above a certain threshold for a set number of years — can address this concern while maintaining open access. Several countries have explored versions of this model with positive results.

There is also the argument that free education would reduce institutional quality. If universities do not compete for tuition income, critics claim, standards will fall. But this assumes that market competition is the primary driver of educational quality — an assumption not supported by the evidence. Many of the world's top universities operate within heavily subsidized or publicly funded systems. Quality depends on investment, research culture, and teaching excellence, not on how much students pay at the gate.

The real question is not whether we can afford free university education, but whether we can afford not to have it. A society that systematically denies its most talented young people access to higher education based on their parents' income is a society that is failing its own future.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'According to the author, what is the main social cost of expensive university tuition?',
          options: [
            'It causes universities to spend more money on administration than on teaching.',
            'It prevents talented students from low-income backgrounds from accessing higher education, wasting human potential.',
            'It discourages foreign students from studying in the country.',
            'It reduces the number of available scholarships for exceptional students.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: `Should University Education Be Free for Everyone?

Access to higher education has long been considered both a personal aspiration and a social good. Yet in most countries, students must take on significant debt or rely on family wealth to fund a university degree. I believe this is not only unjust but economically counterproductive — and that the case for free university education is stronger than many politicians are willing to admit.

The most compelling argument is one of equity. Education is the single most reliable pathway out of poverty, yet it is precisely the students from low-income backgrounds who are most deterred by the cost. When a teenager's choice of career is shaped primarily by tuition fees rather than by talent or ambition, society wastes enormous human potential. A working-class student who might have become a brilliant engineer or physician instead avoids university entirely. That is a loss not just for the individual, but for all of us.

Critics of free university argue that the cost would be enormous and that wealthier graduates, who earn more over their lifetimes, should contribute to the system they benefited from. This is a reasonable concern. But it conflates the question of who pays with the question of when they pay. A graduate tax — where university is free upfront but graduates contribute a percentage of their income above a certain threshold for a set number of years — can address this concern while maintaining open access. Several countries have explored versions of this model with positive results.

There is also the argument that free education would reduce institutional quality. If universities do not compete for tuition income, critics claim, standards will fall. But this assumes that market competition is the primary driver of educational quality — an assumption not supported by the evidence. Many of the world's top universities operate within heavily subsidized or publicly funded systems. Quality depends on investment, research culture, and teaching excellence, not on how much students pay at the gate.

The real question is not whether we can afford free university education, but whether we can afford not to have it. A society that systematically denies its most talented young people access to higher education based on their parents' income is a society that is failing its own future.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the author propose as an alternative funding model?',
          options: [
            'A system where only the poorest 10% of students receive free tuition.',
            'Removing all funding from universities and making them fully private.',
            'A lottery-based scholarship system funded by private corporations.',
            'A graduate tax where university is free upfront and graduates repay based on income after a threshold.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: `Should University Education Be Free for Everyone?

Access to higher education has long been considered both a personal aspiration and a social good. Yet in most countries, students must take on significant debt or rely on family wealth to fund a university degree. I believe this is not only unjust but economically counterproductive — and that the case for free university education is stronger than many politicians are willing to admit.

The most compelling argument is one of equity. Education is the single most reliable pathway out of poverty, yet it is precisely the students from low-income backgrounds who are most deterred by the cost. When a teenager's choice of career is shaped primarily by tuition fees rather than by talent or ambition, society wastes enormous human potential. A working-class student who might have become a brilliant engineer or physician instead avoids university entirely. That is a loss not just for the individual, but for all of us.

Critics of free university argue that the cost would be enormous and that wealthier graduates, who earn more over their lifetimes, should contribute to the system they benefited from. This is a reasonable concern. But it conflates the question of who pays with the question of when they pay. A graduate tax — where university is free upfront but graduates contribute a percentage of their income above a certain threshold for a set number of years — can address this concern while maintaining open access. Several countries have explored versions of this model with positive results.

There is also the argument that free education would reduce institutional quality. If universities do not compete for tuition income, critics claim, standards will fall. But this assumes that market competition is the primary driver of educational quality — an assumption not supported by the evidence. Many of the world's top universities operate within heavily subsidized or publicly funded systems. Quality depends on investment, research culture, and teaching excellence, not on how much students pay at the gate.

The real question is not whether we can afford free university education, but whether we can afford not to have it. A society that systematically denies its most talented young people access to higher education based on their parents' income is a society that is failing its own future.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'How does the author respond to the claim that free university would reduce academic quality?',
          options: [
            'By accepting it as true and suggesting that quality standards should be lowered.',
            'By claiming that quality has never been measured accurately in any university system.',
            'By arguing that market competition is not the main driver of quality, pointing to top publicly funded universities.',
            'By proposing that private companies should manage university budgets instead of governments.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: `Should University Education Be Free for Everyone?

Access to higher education has long been considered both a personal aspiration and a social good. Yet in most countries, students must take on significant debt or rely on family wealth to fund a university degree. I believe this is not only unjust but economically counterproductive — and that the case for free university education is stronger than many politicians are willing to admit.

The most compelling argument is one of equity. Education is the single most reliable pathway out of poverty, yet it is precisely the students from low-income backgrounds who are most deterred by the cost. When a teenager's choice of career is shaped primarily by tuition fees rather than by talent or ambition, society wastes enormous human potential. A working-class student who might have become a brilliant engineer or physician instead avoids university entirely. That is a loss not just for the individual, but for all of us.

Critics of free university argue that the cost would be enormous and that wealthier graduates, who earn more over their lifetimes, should contribute to the system they benefited from. This is a reasonable concern. But it conflates the question of who pays with the question of when they pay. A graduate tax — where university is free upfront but graduates contribute a percentage of their income above a certain threshold for a set number of years — can address this concern while maintaining open access. Several countries have explored versions of this model with positive results.

There is also the argument that free education would reduce institutional quality. If universities do not compete for tuition income, critics claim, standards will fall. But this assumes that market competition is the primary driver of educational quality — an assumption not supported by the evidence. Many of the world's top universities operate within heavily subsidized or publicly funded systems. Quality depends on investment, research culture, and teaching excellence, not on how much students pay at the gate.

The real question is not whether we can afford free university education, but whether we can afford not to have it. A society that systematically denies its most talented young people access to higher education based on their parents' income is a society that is failing its own future.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The word "conflates" in the third paragraph most closely means:',
          options: [
            'Distinguishes clearly between two different ideas.',
            'Incorrectly treats two separate issues as if they were the same thing.',
            'Argues against by providing strong evidence.',
            'Exaggerates the importance of a minor detail.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: `Should University Education Be Free for Everyone?

Access to higher education has long been considered both a personal aspiration and a social good. Yet in most countries, students must take on significant debt or rely on family wealth to fund a university degree. I believe this is not only unjust but economically counterproductive — and that the case for free university education is stronger than many politicians are willing to admit.

The most compelling argument is one of equity. Education is the single most reliable pathway out of poverty, yet it is precisely the students from low-income backgrounds who are most deterred by the cost. When a teenager's choice of career is shaped primarily by tuition fees rather than by talent or ambition, society wastes enormous human potential. A working-class student who might have become a brilliant engineer or physician instead avoids university entirely. That is a loss not just for the individual, but for all of us.

Critics of free university argue that the cost would be enormous and that wealthier graduates, who earn more over their lifetimes, should contribute to the system they benefited from. This is a reasonable concern. But it conflates the question of who pays with the question of when they pay. A graduate tax — where university is free upfront but graduates contribute a percentage of their income above a certain threshold for a set number of years — can address this concern while maintaining open access. Several countries have explored versions of this model with positive results.

There is also the argument that free education would reduce institutional quality. If universities do not compete for tuition income, critics claim, standards will fall. But this assumes that market competition is the primary driver of educational quality — an assumption not supported by the evidence. Many of the world's top universities operate within heavily subsidized or publicly funded systems. Quality depends on investment, research culture, and teaching excellence, not on how much students pay at the gate.

The real question is not whether we can afford free university education, but whether we can afford not to have it. A society that systematically denies its most talented young people access to higher education based on their parents' income is a society that is failing its own future.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'Which of the following statements would the author most likely DISAGREE with?',
          options: [
            'The current system of university tuition fees serves society fairly and efficiently.',
            'Talented students from poor families are held back by the cost of university.',
            'A publicly funded university system can maintain high academic standards.',
            'Graduates who earn high salaries should contribute more to education funding.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: `Should University Education Be Free for Everyone?

Access to higher education has long been considered both a personal aspiration and a social good. Yet in most countries, students must take on significant debt or rely on family wealth to fund a university degree. I believe this is not only unjust but economically counterproductive — and that the case for free university education is stronger than many politicians are willing to admit.

The most compelling argument is one of equity. Education is the single most reliable pathway out of poverty, yet it is precisely the students from low-income backgrounds who are most deterred by the cost. When a teenager's choice of career is shaped primarily by tuition fees rather than by talent or ambition, society wastes enormous human potential. A working-class student who might have become a brilliant engineer or physician instead avoids university entirely. That is a loss not just for the individual, but for all of us.

Critics of free university argue that the cost would be enormous and that wealthier graduates, who earn more over their lifetimes, should contribute to the system they benefited from. This is a reasonable concern. But it conflates the question of who pays with the question of when they pay. A graduate tax — where university is free upfront but graduates contribute a percentage of their income above a certain threshold for a set number of years — can address this concern while maintaining open access. Several countries have explored versions of this model with positive results.

There is also the argument that free education would reduce institutional quality. If universities do not compete for tuition income, critics claim, standards will fall. But this assumes that market competition is the primary driver of educational quality — an assumption not supported by the evidence. Many of the world's top universities operate within heavily subsidized or publicly funded systems. Quality depends on investment, research culture, and teaching excellence, not on how much students pay at the gate.

The real question is not whether we can afford free university education, but whether we can afford not to have it. A society that systematically denies its most talented young people access to higher education based on their parents' income is a society that is failing its own future.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What rhetorical strategy does the author use in the final paragraph?',
          options: [
            'Statistical evidence to prove that free education lowers inequality.',
            'A personal anecdote about a student who was denied access to university.',
            'Reframing the question to emphasize the long-term cost of inaction rather than the cost of the policy.',
            'A direct appeal to emotion by describing a real case of discrimination.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
