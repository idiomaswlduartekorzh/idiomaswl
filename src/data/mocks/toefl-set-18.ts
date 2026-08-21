import type { MockExam } from './types';
import { TOEFL_CTW_SET18_V2 } from '@/data/toefl/complete-the-words-sets-16-20';
import { toToeflCompleteWordsQuestion } from './toefl-complete-words-adapter';
import { TOEFL_READING_SET18_V2 } from '@/data/toefl/reading-sets-16-20';
import { toToeflReadingQuestion } from './toefl-reading-adapter';
import { TOEFL_BUILD_SENTENCE_SET18_V2 } from '@/data/toefl/build-sentence-sets-16-20';
import { toToeflBuildSentenceQuestion } from './toefl-build-sentence-adapter';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-18/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-18',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 18 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1,
      skill: 'reading',
      title: 'Reading — Complete the Words',
      instructions: TOEFL_CTW_SET18_V2.instructions,
      questions: [toToeflCompleteWordsQuestion(TOEFL_CTW_SET18_V2, 1)],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Cinema notice)',
      instructions: 'Read the notice and answer the questions.',
      passage: `STARLIGHT CINEMA — TICKET INFORMATION\n\n• Standard ticket: $10. Students and seniors: $7 (please show ID).\n• Tuesdays are "Cheap Day" — all tickets $6.\n• Tickets can be booked online or bought at the box office.\n• Latecomers may not be admitted once the film has started.\n• Outside food and drink are not permitted; a snack bar is available in the lobby.`,
      passageTitle: 'Cinema notice',
      questions: [
        { type: 'mcq', id: 't18-r-dl1', part: 2, text: 'How much is a ticket on Tuesday?', options: ['Free', '$10', '$7', '$6'], answer: 3 },
        { type: 'mcq', id: 't18-r-dl2', part: 2, text: 'What do students need to get the $7 price?', options: ['A coupon', 'A membership card', 'A booking number', 'ID'], answer: 3 },
        { type: 'mcq', id: 't18-r-dl3', part: 2, text: 'What is the rule about latecomers?', options: ['They may not be admitted once the film has started.', 'They must sit at the front.', 'They can watch a later showing for free.', 'They get a discount.'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Schedule email)',
      instructions: 'Read the email and answer the questions.',
      passage: `From: Community Choir\nTo: Members\nSubject: Rehearsal schedule change\n\nDear members,\n\nBecause the church hall is unavailable next week, our Wednesday rehearsal will be held instead at the community center on Oak Road, at the usual time of 7:00 p.m.\n\nPlease bring your sheet music for the spring concert, as we will focus on the two new songs. There is free parking behind the community center, and the number 5 bus stops right outside. If you are new and unsure where to go, look for the blue doors on the left side of the building. See you all there!`,
      passageTitle: 'Schedule email',
      questions: [
        { type: 'mcq', id: 't18-r-dl4', part: 3, text: 'Why is the rehearsal location changing?', options: ['The choir is growing.', 'The church hall is unavailable next week.', 'The time has changed.', 'The concert was cancelled.'], answer: 1 },
        { type: 'mcq', id: 't18-r-dl5', part: 3, text: 'What should members bring?', options: ['A parking permit', 'A ticket', 'Their sheet music for the spring concert', 'Food to share'], answer: 2 },
      ],
    },
    {
      part: 4,
      skill: 'reading',
      title: 'Reading — Read an Academic Passage',
      instructions: TOEFL_READING_SET18_V2.academic.instructions,
      sectionNote: 'Las preguntas 1–5 reproducen familias oficiales de selección única. La pregunta 6 es práctica complementaria WeLearn.',
      passage: TOEFL_READING_SET18_V2.academic.text,
      passageTitle: TOEFL_READING_SET18_V2.academic.title,
      questions: TOEFL_READING_SET18_V2.academic.items.map((item) =>
        toToeflReadingQuestion(TOEFL_READING_SET18_V2.objectId, item, 4)),
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't18-l-cr1', part: 5, audioUrl: '/audio/toefl/set-18/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['No, I don\'t like skating.', 'The soup is ready.', 'She left early.', 'It\'s just past the fountain, on the right.'], answer: 3 },
        { type: 'mcq', id: 't18-l-cr2', part: 5, audioUrl: '/audio/toefl/set-18/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['It is five meters tall.', 'Sure, I\'ll bring my notes tomorrow.', 'The window is open.', 'Yes, she is a scientist.'], answer: 1 },
        { type: 'mcq', id: 't18-l-cr3', part: 5, audioUrl: '/audio/toefl/set-18/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['It costs eight dollars.', 'You can ask at the reception desk.', 'The coffee is fresh.', 'He arrives on Sunday.'], answer: 1 },
        { type: 'mcq', id: 't18-l-cr4', part: 5, audioUrl: '/audio/toefl/set-18/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['The bus was empty.', 'No, I have not tried it.', 'It is made of leather.', 'Of course — I\'ll save you a seat at the front.'], answer: 3 },
        { type: 'mcq', id: 't18-l-cr5', part: 5, audioUrl: '/audio/toefl/set-18/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['The market is far.', 'She teaches economics.', 'It is quite small.', 'Yes, I finished writing my first novel!'], answer: 3 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between a student and a career advisor. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-18/conversation.mp3',
      transcript: `STUDENT: Hi, I'm graduating this year and I'm feeling pretty lost about what to do next. I don't even know where to begin.\n\nADVISOR: That's completely normal, and you're in exactly the right place. Let's start simple. Do you have a general direction in mind — a field or type of work you're drawn to?\n\nSTUDENT: I studied environmental science, and I care about sustainability, but I don't know if I want to do research, policy, or work for a company. It all feels overwhelming.\n\nADVISOR: Okay, that's actually a great starting point — you have a value you care about, sustainability, and a few possible paths. Here's what I'd suggest. Rather than trying to decide everything now, do some "informational interviews." Reach out to a few people working in research, in policy, and in industry, and just ask them about their day-to-day work.\n\nSTUDENT: I hadn't thought of that. Wouldn't people be too busy to talk to a student?\n\nADVISOR: You'd be surprised. Most people are happy to spend twenty minutes talking about their career, especially with someone genuinely interested. And it's the best way to learn what a job is really like, beyond the job title. Often students rule out or discover paths they never expected.\n\nSTUDENT: That makes sense. It's a lot less pressure than trying to pick the perfect job right away.\n\nADVISOR: Exactly. Think of it as gathering information, not making a final decision. Come back after you've spoken to a few people, and we'll talk through what you learned and start narrowing things down.`,
      questions: [
        { type: 'mcq', id: 't18-l-cv1', part: 6, text: 'Why does the student come to the career advisor?', options: ['To find a part-time job', 'Because she feels lost about what to do after graduating', 'To change her major', 'To ask for a reference'], answer: 1 },
        { type: 'mcq', id: 't18-l-cv2', part: 6, text: 'What does the advisor suggest the student do?', options: ['Decide immediately', 'Apply for many jobs at once', 'Do "informational interviews" with people in different fields', 'Take another degree'], answer: 2 },
        { type: 'mcq', id: 't18-l-cv3', part: 6, text: 'What is the student worried about?', options: ['That she has no qualifications', 'That she will have to move', 'That people will be too busy to talk to a student', 'That the interviews cost money'], answer: 2 },
        { type: 'mcq', id: 't18-l-cv4', part: 6, text: 'How does the advisor describe the purpose of these interviews?', options: ['Gathering information, not making a final decision', 'Getting a job offer immediately', 'Practicing for exams', 'Making a final decision'], answer: 0 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-18/announcement.mp3',
      transcript: `Good afternoon, students. This is an announcement about the library's new extended hours during the exam period, which begins next Monday. For the three weeks of exams, the main library will stay open twenty-four hours a day, seven days a week, so you can study whenever suits you best.\n\nA few things to keep in mind. Overnight, from midnight to six a.m., only the main study floors will be open; the upper floors and the special collections will be closed. Security staff will be on site all night for your safety. Please remember to bring your student card, as you'll need to scan it to enter the building after ten p.m. Finally, we ask everyone to respect the quiet-study rules, especially at night when people are trying to concentrate. Free hot drinks will be available in the lobby from ten p.m. each night, courtesy of the student union. Good luck with your exams.`,
      questions: [
        { type: 'mcq', id: 't18-l-an1', part: 7, text: 'What is the announcement mainly about?', options: ['A new library building', 'Extended library hours during the exam period', 'A change in exam dates', 'A book sale'], answer: 1 },
        { type: 'mcq', id: 't18-l-an2', part: 7, text: 'What is true about the overnight hours?', options: ['Only staff may enter.', 'The whole library is open.', 'Only the main study floors are open from midnight to 6 a.m.', 'The library is closed overnight.'], answer: 2 },
        { type: 'mcq', id: 't18-l-an3', part: 7, text: 'What do students need to enter the building after 10 p.m.?', options: ['A password', 'A friend', 'A ticket', 'Their student card to scan'], answer: 3 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-18/academic-talk.mp3',
      transcript: `PROFESSOR: Today we're going to look at one of the most influential inventions you've probably never thought much about: the shipping container. It's just a big metal box, standardized in size, that can be lifted onto ships, trains, and trucks. It sounds unremarkable. But this simple box quietly transformed the global economy, and its story is a wonderful lesson in how sometimes the most powerful innovations aren't flashy technologies but clever standardization.\n\nBefore the shipping container, loading a cargo ship was slow, expensive, and labor-intensive. Goods arrived at the port in all shapes and sizes — barrels, sacks, crates, loose items — and armies of dockworkers had to load each item individually, packing them into the ship like a giant, awkward puzzle. This could take days, and a large fraction of shipping costs went simply to loading and unloading.\n\nThe shipping container, popularized in the nineteen fifties by an American businessman named Malcolm McLean, changed all of this. Because every container was the same standard size, goods could be packed into a container at a factory, sealed, and then moved seamlessly from truck to ship to train without ever being unpacked along the way. Cranes could load a container ship in hours rather than days. The cost of shipping goods plummeted — by some estimates, to a small fraction of what it had been.\n\nAnd here's the profound consequence: when shipping becomes cheap, distance matters less. It suddenly became economical to manufacture goods on the other side of the world and ship them to consumers. The container is a major reason why global supply chains, and the globalized economy we now take for granted, are possible at all. So the next time you see a stack of those metal boxes at a port, remember: that unglamorous standardization did more to shape the modern world than many far more celebrated inventions.`,
      questions: [
        { type: 'mcq', id: 't18-l-at1', part: 8, text: 'What is the main point of the lecture?', options: ['The standardized shipping container quietly transformed the global economy.', 'Metal boxes are expensive.', 'Ships are becoming larger.', 'Shipping is dangerous.'], answer: 0 },
        { type: 'mcq', id: 't18-l-at2', part: 8, text: 'What was loading a ship like before the shipping container?', options: ['Fast and cheap', 'Slow, expensive, and labor-intensive', 'Fully automated', 'Impossible'], answer: 1 },
        { type: 'mcq', id: 't18-l-at3', part: 8, text: 'Why did standardization make such a difference?', options: ['Ships got slower.', 'Containers were smaller.', 'Because every container was the same size, goods could move seamlessly from truck to ship to train without being unpacked.', 'Containers were made of gold.'], answer: 2 },
        { type: 'mcq', id: 't18-l-at4', part: 8, text: 'According to the professor, what happened to shipping costs?', options: ['They stayed the same.', 'They became unpredictable.', 'They rose sharply.', 'They plummeted to a small fraction of what they had been.'], answer: 3 },
        { type: 'mcq', id: 't18-l-at5', part: 8, text: 'What is the "profound consequence" the professor describes?', options: ['When shipping becomes cheap, distance matters less, making global supply chains possible.', 'Factories closed.', 'Dockworkers became richer.', 'Ships became unnecessary.'], answer: 0 },
      ],
    },
    {
      part: 9,
      skill: 'writing',
      title: 'Writing — Build a Sentence',
      instructions: 'Read the first speaker. Arrange the fragments to make a grammatical and contextually appropriate reply. One fragment is not used.',
      sectionNote: TOEFL_BUILD_SENTENCE_SET18_V2.interactionDisclosure,
      questions: TOEFL_BUILD_SENTENCE_SET18_V2.items.map((item) =>
        toToeflBuildSentenceQuestion(TOEFL_BUILD_SENTENCE_SET18_V2.objectId, item, 9)),
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't18-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You joined an online course, but the videos keep stopping and you cannot complete the lessons. You have already tried a different device and a different internet connection. You want to report the problem and ask for help.\n\nWrite an email to the course's technical support team.`,
          text: 'In your email: describe the problem and what you have already tried, make your request clearly, and keep a polite tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't18-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on education. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Tanaka: Some people believe that students learn best when they study a wide range of subjects, while others believe they should specialize early in one area. Which approach do you think is better, and why?\n\nStudent (Marco): I think a broad education is better. It helps students discover their interests and become well-rounded thinkers who can connect ideas across fields. For example, I only discovered my interest in economics after taking an elective class that had nothing to do with my intended major.\n\nStudent (Fatima): I disagree. Specializing early lets students go deeper and become truly skilled in one area, which employers often value. For example, a friend who focused entirely on engineering from an early age was able to start advanced research long before classmates with broader schedules.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't18-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-18/repeat-1.mp3', targetSentence: 'The class is on Monday.' },
        { type: 'repeat', id: 't18-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-18/repeat-2.mp3', targetSentence: 'She saved money to buy a new bicycle.' },
        { type: 'repeat', id: 't18-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-18/repeat-3.mp3', targetSentence: 'The farmers harvested the crops before the first frost.' },
        { type: 'repeat', id: 't18-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-18/repeat-4.mp3', targetSentence: 'The article argued that reading for pleasure improves writing skills over time.' },
        { type: 'repeat', id: 't18-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-18/repeat-5.mp3', targetSentence: 'When the new bridge finally opened, the journey between the two towns became much shorter and safer.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't18-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe a gift you have given someone that they really liked. What was it, and why did you choose it?' },
        { type: 'speak', id: 't18-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to keep up with the news every day, while others prefer to avoid it. Which are you, and why? Give reasons and an example.' },
        { type: 'speak', id: 't18-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your school can spend money on either an art studio or a computer lab. Which would you recommend, and why? Explain how it would benefit students.' },
        { type: 'speak', id: 't18-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might the way people travel between countries change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
