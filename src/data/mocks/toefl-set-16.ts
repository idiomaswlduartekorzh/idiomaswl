import type { MockExam } from './types';
import { TOEFL_CTW_SET16_V2 } from '@/data/toefl/complete-the-words-sets-16-20';
import { toToeflCompleteWordsQuestion } from './toefl-complete-words-adapter';
import { TOEFL_READING_SET16_V2 } from '@/data/toefl/reading-sets-16-20';
import { toToeflReadingQuestion } from './toefl-reading-adapter';
import { TOEFL_BUILD_SENTENCE_SET16_V2 } from '@/data/toefl/build-sentence-sets-16-20';
import { toToeflBuildSentenceQuestion } from './toefl-build-sentence-adapter';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-16/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-16',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 16 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1,
      skill: 'reading',
      title: 'Reading — Complete the Words',
      instructions: TOEFL_CTW_SET16_V2.instructions,
      questions: [toToeflCompleteWordsQuestion(TOEFL_CTW_SET16_V2, 1)],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Train station sign)',
      instructions: 'Read the sign and answer the questions.',
      passage: `CENTRAL STATION — PASSENGER INFORMATION\n\n• Tickets can be bought at machines or the ticket office (open 6:00 a.m.–10:00 p.m.).\n• Please keep your ticket until the end of your journey; inspectors may check it.\n• Bicycles are allowed on trains outside peak hours (peak: 7–9 a.m. and 5–7 p.m.).\n• Lost property: ask at the office near Platform 1.\n• For your safety, stand behind the yellow line while trains are approaching.`,
      passageTitle: 'Station sign',
      questions: [
        { type: 'mcq', id: 't16-r-dl1', part: 2, text: 'Until what time is the ticket office open?', options: ['9:00 p.m.', '10:00 p.m.', 'It is always open.', '6:00 a.m.'], answer: 1 },
        { type: 'mcq', id: 't16-r-dl2', part: 2, text: 'When are bicycles NOT allowed on trains?', options: ['At night after the final peak period has ended and trains are less crowded', 'During peak hours (7–9 a.m. and 5–7 p.m.)', 'On weekends', 'They are never allowed.'], answer: 1 },
        { type: 'mcq', id: 't16-r-dl3', part: 2, text: 'Where should a passenger go for lost property?', options: ['The café', 'Platform 2', 'The office near Platform 1', 'The ticket machines'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Refund email)',
      instructions: 'Read the email and answer the questions.',
      passage: `From: City Theatre\nTo: Ticket holder\nSubject: Performance cancelled\n\nDear ticket holder,\n\nWe regret to inform you that Saturday's performance of "The Long Road" has been cancelled because a lead actor is unwell. We are very sorry for the disappointment.\n\nYou have two options. You may exchange your ticket for the same performance next Saturday at no extra cost, or you may request a full refund. Refunds will be processed to your original payment method within five working days. To choose, simply reply to this email by Thursday. If we do not hear from you, we will automatically issue a refund.`,
      passageTitle: 'Refund email',
      questions: [
        { type: 'mcq', id: 't16-r-dl4', part: 3, text: 'Why was the performance cancelled?', options: ['Low ticket sales', 'A problem with the theatre', 'Bad weather', 'A lead actor is unwell'], answer: 3 },
        { type: 'mcq', id: 't16-r-dl5', part: 3, text: 'What happens if the ticket holder does not reply by Thursday?', options: ['A refund will be issued automatically.', 'The ticket is exchanged automatically.', 'They must call the theatre.', 'They lose their money.'], answer: 0 },
      ],
    },
    {
      part: 4,
      skill: 'reading',
      title: 'Reading — Read an Academic Passage',
      instructions: TOEFL_READING_SET16_V2.academic.instructions,
      sectionNote: 'Las preguntas 1–5 reproducen familias oficiales de selección única. La pregunta 6 es práctica complementaria WeLearn.',
      passage: TOEFL_READING_SET16_V2.academic.text,
      passageTitle: TOEFL_READING_SET16_V2.academic.title,
      questions: TOEFL_READING_SET16_V2.academic.items.map((item) =>
        toToeflReadingQuestion(TOEFL_READING_SET16_V2.objectId, item, 4)),
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't16-l-cr1', part: 5, audioUrl: '/audio/toefl/set-16/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ["She left early this morning for the station.","It's next to the pharmacy, across the street.","No, I don't usually enjoy hiking there.","The soup is still hot in the kitchen."], answer: 1 },
        { type: 'mcq', id: 't16-l-cr2', part: 5, audioUrl: '/audio/toefl/set-16/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ["The gate is closed for the evening.","Yes, she teaches at the local school.","It measures eight meters from end to end.","Sure, I can lend you my charger."], answer: 3 },
        { type: 'mcq', id: 't16-l-cr3', part: 5, audioUrl: '/audio/toefl/set-16/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ["The coffee is cold after sitting outside.","He arrives on Saturday afternoon by train.","It costs three dollars at the student shop.","Registration closes at the end of the week."], answer: 3 },
        { type: 'mcq', id: 't16-l-cr4', part: 5, audioUrl: '/audio/toefl/set-16/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ["It is made entirely from polished metal.","No problem — I'll wait for you outside.","The bus was completely full this morning.","No, I have not tried that restaurant yet."], answer: 1 },
        { type: 'mcq', id: 't16-l-cr5', part: 5, audioUrl: '/audio/toefl/set-16/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ["It is quite far from the city center.","Yes, I got accepted into the program!","The library is closed for the holiday.","She teaches drama at the secondary school."], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between a student and a professor. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-16/conversation.mp3',
      transcript: `STUDENT: Professor Alvarez, I wanted to ask about the essay topic. You gave us a list, but I was wondering if I could write about something not on it.\n\nPROFESSOR: That depends. What did you have in mind?\n\nSTUDENT: I'm really interested in how music affects memory. I read an article about it and I'd love to explore it more.\n\nPROFESSOR: That's a fascinating topic. It's certainly relevant to the course, since we've been discussing how the brain processes information. I'm happy for you to pursue it — but with one condition.\n\nSTUDENT: Of course. What's that?\n\nPROFESSOR: I want you to base your argument on research studies, not just the popular article. It's easy to find dramatic claims about music and the brain online, but many aren't well supported. Find at least three peer-reviewed studies and build your essay around what the evidence actually shows.\n\nSTUDENT: That makes sense. I don't really know how to find peer-reviewed studies, though.\n\nPROFESSOR: Start with the library's databases — not a general search engine. If you go to the library's website and look under "academic databases," you can search for scholarly articles. And if you get stuck, the research librarians are excellent at helping with exactly this.\n\nSTUDENT: Great, I'll do that. Thank you for letting me choose my own topic.\n\nPROFESSOR: My pleasure. Email me your three sources once you've found them, and I'll let you know if you're on the right track.`,
      questions: [
        { type: 'mcq', id: 't16-l-cv1', part: 6, text: 'What does the student want to do?', options: ["Transfer into a different course section","Avoid completing the assigned essay","Request additional time for the assignment","Choose an essay topic outside the provided list"], answer: 3 },
        { type: 'mcq', id: 't16-l-cv2', part: 6, text: 'What condition does the professor set?', options: ["Base the argument on at least three peer-reviewed studies","Deliver the research findings as an oral presentation","Complete the assignment together with a student group","Extend the essay far beyond the required word count"], answer: 0 },
        { type: 'mcq', id: 't16-l-cv3', part: 6, text: 'Where does the professor tell the student to find scholarly articles?', options: ["Through a standard internet search engine","In the library's academic research databases","Across several public social media platforms","Inside the professor's departmental office"], answer: 1 },
        { type: 'mcq', id: 't16-l-cv4', part: 6, text: 'What does the professor ask the student to email?', options: ["A photograph of the proposed project materials","The completed version of the research essay","Three sources for the professor to review","A receipt showing payment for database access"], answer: 2 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-16/announcement.mp3',
      transcript: `Good morning, everyone. This is an announcement about the campus health center. Starting next week, the health center will offer free flu vaccinations to all students and staff. The vaccine is strongly recommended, especially as we head into the colder months when flu spreads more easily.\n\nNo appointment is needed — simply walk in during opening hours, which are nine a.m. to five p.m., Monday through Friday. Please bring your student or staff ID card. The vaccination takes only a few minutes, and you can return to your day immediately afterward. If you have a medical condition or any concerns about the vaccine, please speak to one of our nurses first; they'll be glad to answer your questions. Protecting yourself also helps protect those around you, including classmates and family members who may be more vulnerable. Thank you.`,
      questions: [
        { type: 'mcq', id: 't16-l-an1', part: 7, text: 'What is the health center offering next week?', options: ["Complimentary lunches for students and staff","Free passes to the campus fitness center","No-cost vision tests throughout the school week","Free flu vaccinations for students and staff"], answer: 3 },
        { type: 'mcq', id: 't16-l-an2', part: 7, text: 'What do students need to do to get the vaccine?', options: ["Walk in during opening hours and bring an ID card","Pay a small administrative fee at the front desk","Obtain a written recommendation from a personal doctor","Schedule an appointment several weeks before visiting"], answer: 0 },
        { type: 'mcq', id: 't16-l-an3', part: 7, text: 'What should students with a medical condition do first?', options: ['Skip the vaccine', 'Speak to one of the nurses', 'Email the professor', 'Wait until next year'], answer: 1 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-16/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to talk about one of the most counterintuitive and powerful ideas in economics and biology alike: the tragedy of the commons. It describes what happens when many individuals, each acting in their own rational self-interest, end up destroying a shared resource that they all depend on.\n\nThe classic example, from which the idea gets its name, is a shared pasture — a "commons" — open to all the herders in a village. Each herder benefits from adding more of their own animals to graze. From any single herder's point of view, adding one more cow is clearly worthwhile: they get all the benefit of that extra cow, while the cost — a little more wear on the shared pasture — is spread across everyone. So every rational herder keeps adding animals. But if all of them follow this same logic, the pasture is overgrazed and destroyed, and everyone loses. The tragedy is that individually rational choices lead to a collectively disastrous outcome.\n\nThis pattern appears far beyond pastures. Overfishing is a textbook case: each fishing boat has an incentive to catch as much as possible, but if all boats do so, the fish stock collapses and no one can fish. The same logic applies to air pollution, traffic congestion, and the overuse of shared water supplies. In each case, the benefits of overuse are private, while the costs are shared — a recipe for depletion.\n\nSo what can be done? Scholars have identified several solutions. One is regulation: a government sets and enforces limits, such as fishing quotas. Another is privatization: dividing the shared resource so that each owner bears the full cost of overusing their portion. But there's a third solution that the political scientist Elinor Ostrom demonstrated, winning a Nobel Prize for it. She showed that communities can, and often do, manage shared resources sustainably on their own — by creating their own rules, monitoring each other, and building trust. The tragedy, in other words, is not inevitable. It's a risk we can avoid through cooperation and good institutions.`,
      questions: [
        { type: 'mcq', id: 't16-l-at1', part: 8, text: 'What does the "tragedy of the commons" describe?', options: ["A policy that regulates how governments collect taxes","A natural disaster that damages agricultural communities","Self-interested choices that collectively destroy a shared resource","A traditional method for managing privately owned farmland"], answer: 2 },
        { type: 'mcq', id: 't16-l-at2', part: 8, text: 'In the pasture example, why does each herder keep adding animals?', options: ["The shared pasture expands whenever more animals arrive","The herders want to prevent their neighbors from benefiting","Village rules require every herder to add another animal","Each herder gains the benefit while everyone shares the cost"], answer: 3 },
        { type: 'mcq', id: 't16-l-at3', part: 8, text: 'Which of the following is given as another example of the tragedy?', options: ["Catching too many fish from a shared fishery","Writing and distributing books through public libraries","Planting private gardens beside individual family homes","Building additional houses on previously developed land"], answer: 0 },
        { type: 'mcq', id: 't16-l-at4', part: 8, text: 'What did Elinor Ostrom demonstrate?', options: ["Shared resources inevitably collapse despite any intervention","Communities can manage shared resources through rules and trust","Government regulation always fails to protect common resources","Every common resource should be divided into private property"], answer: 1 },
        { type: 'mcq', id: 't16-l-at5', part: 8, text: 'What is the professor\'s overall message about the tragedy of the commons?', options: ['It is not a real problem.', 'It cannot be avoided.', 'It is a risk we can avoid through cooperation and good institutions.', 'It only affects farmers.'], answer: 2 },
      ],
    },
    {
      part: 9,
      skill: 'writing',
      title: 'Writing — Build a Sentence',
      instructions: 'Read the first speaker. Arrange the fragments to make a grammatical and contextually appropriate reply. One fragment is not used.',
      sectionNote: TOEFL_BUILD_SENTENCE_SET16_V2.interactionDisclosure,
      questions: TOEFL_BUILD_SENTENCE_SET16_V2.items.map((item) =>
        toToeflBuildSentenceQuestion(TOEFL_BUILD_SENTENCE_SET16_V2.objectId, item, 9)),
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't16-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You lent your notes to a classmate before an important exam, but they have not returned them and the exam is in two days. You want to politely ask for them back as soon as possible.\n\nWrite an email to your classmate.`,
          text: 'In your email: remind them, explain why you need the notes, and make your request clearly and politely. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't16-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on the workplace. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Dubois: Some companies have introduced a four-day working week without reducing pay, hoping to improve productivity and well-being. Do you think a four-day working week is a good idea? Why or why not?\n\nStudent (Leo): I think it's a great idea. People are often more focused and productive when they have more rest, and a shorter week improves work-life balance. For example, a company that switched to a four-day week reported that employees returned on Mondays feeling noticeably less exhausted.\n\nStudent (Amina): I'm not so sure. Some jobs, like healthcare, need people every day, and companies might just expect the same work in less time, adding stress. For example, a nurse still has to cover the same number of shifts regardless of how the office staff's schedule changes.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't16-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-16/repeat-1.mp3', targetSentence: 'The market opens early.' },
        { type: 'repeat', id: 't16-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-16/repeat-2.mp3', targetSentence: 'He borrowed a book and read it in one evening.' },
        { type: 'repeat', id: 't16-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-16/repeat-3.mp3', targetSentence: 'The company decided to open a new office in the capital.' },
        { type: 'repeat', id: 't16-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-16/repeat-4.mp3', targetSentence: 'The teacher explained that the assignment would be due at the end of the month.' },
        { type: 'repeat', id: 't16-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-16/repeat-5.mp3', targetSentence: 'Because the road was closed for repairs, the drivers had to take a much longer route home.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't16-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe something you have made or created that you are proud of. What was it, and why are you proud of it?' },
        { type: 'speak', id: 't16-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to make plans with friends in advance, while others prefer to be spontaneous. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't16-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your town can spend money to either improve public transport or build more parking spaces. Which would you recommend, and why? Explain how it would benefit residents.' },
        { type: 'speak', id: 't16-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might the jobs people do change over the next twenty years because of automation? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
