import type { MockExam } from './types';
import { TOEFL_CTW_SET4_V2 } from '@/data/toefl/complete-the-words-sets-2-5';
import { TOEFL_READING_SET4_V2 } from '@/data/toefl/reading-sets-2-5';
import { TOEFL_BUILD_SENTENCE_SET4_V2 } from '@/data/toefl/build-sentence-sets-2-5';
import { toToeflBuildSentenceQuestion } from './toefl-build-sentence-adapter';
import { toToeflReadingQuestion } from './toefl-reading-adapter';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Migrado del formato antiguo (era stub Writing-only) al formato 2026 completo. Audios bajo /audio/toefl/set-4/.

const mock: MockExam = {
  id: 'set-4',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 4 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: TOEFL_CTW_SET4_V2.id, part: 1, qRange: [1, 10],
          objectId: TOEFL_CTW_SET4_V2.objectId,
          contentVersion: String(TOEFL_CTW_SET4_V2.version),
          serverScoring: 'toefl-complete-words',
          alignment: 'official-family-pilot',
          instructions: TOEFL_CTW_SET4_V2.instructions,
          template: TOEFL_CTW_SET4_V2.template,
          blanks: TOEFL_CTW_SET4_V2.blanks.map((blank) => ({ ...blank })),
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Parking notice)',
      instructions: 'Read the notice and answer the questions.',
      passage: `CITY CENTER CAR PARK — INFORMATION\n\n• Open 24 hours. Height limit: 2.0 meters.\n• First 30 minutes free; then $2 per hour, up to a daily maximum of $15.\n• Pay at the machines before returning to your car; keep your ticket.\n• Lost tickets are charged the daily maximum.\n• Disabled parking spaces are on Level 1, near the lift. Electric-vehicle charging is on Level 2.`,
      passageTitle: 'Parking notice',
      questions: [
        { type: 'mcq', id: 't4-r-dl1', part: 2, text: 'How long can you park for free?', options: ['One hour', 'The first 30 minutes', 'All day', 'There is no free period.'], answer: 1 },
        { type: 'mcq', id: 't4-r-dl2', part: 2, text: 'What happens if you lose your ticket?', options: ['You get a warning only.', 'Parking is free.', 'You are charged the daily maximum.', 'You must wait until the next day.'], answer: 2 },
        { type: 'mcq', id: 't4-r-dl3', part: 2, text: 'Where is electric-vehicle charging located?', options: ['Near the entrance', 'It is not available.', 'Level 1', 'Level 2'], answer: 3 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Club email)',
      instructions: 'Read the email and answer the questions.',
      passage: `From: University Film Club\nTo: Members\nSubject: This week's screening\n\nHi everyone,\n\nThis Thursday we're showing a classic science-fiction film in Lecture Theatre 2, starting at 7:00 p.m. Doors open at 6:45. Entry is free for members; non-members pay $2 at the door, which also lets them join the club.\n\nAfter the film, we'll have a short discussion for anyone who wants to stay — it usually lasts about half an hour. Free popcorn will be available while it lasts. If you'd like to suggest a film for a future screening, reply to this email with your idea. See you Thursday!`,
      passageTitle: 'Club email',
      questions: [
        { type: 'mcq', id: 't4-r-dl4', part: 3, text: 'What do non-members pay at the door?', options: ['$2, which also lets them join the club', '$7', 'A membership fee of $20', 'Nothing'], answer: 0 },
        { type: 'mcq', id: 't4-r-dl5', part: 3, text: 'What happens after the film?', options: ['Everyone must leave immediately.', 'There is a short optional discussion of about half an hour.', 'A second film is shown.', 'The room is cleaned.'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: TOEFL_READING_SET4_V2.academic.instructions,
      sectionNote: 'Las preguntas 1–5 forman Academic Passage. La selección múltiple final es práctica complementaria WeLearn.',
      passage: TOEFL_READING_SET4_V2.academic.text,
      passageTitle: TOEFL_READING_SET4_V2.academic.title,
      questions: TOEFL_READING_SET4_V2.academic.items.map((item) =>
        toToeflReadingQuestion(TOEFL_READING_SET4_V2.objectId, item, 4)),
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't4-l-cr1', part: 5, audioUrl: '/audio/toefl/set-4/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['The soup is ready.', 'She left this afternoon.', 'It\'s at the end of the hall, on the left.', 'No, I don\'t like running.'], answer: 2 },
        { type: 'mcq', id: 't4-l-cr2', part: 5, audioUrl: '/audio/toefl/set-4/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['Sure, I can give you a ride to the airport.', 'The window is broken.', 'Yes, she is a lawyer.', 'It is seven meters wide.'], answer: 0 },
        { type: 'mcq', id: 't4-l-cr3', part: 5, audioUrl: '/audio/toefl/set-4/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['The opening hours are listed on the door.', 'The bread is warm.', 'He arrives on Monday.', 'It costs four dollars.'], answer: 0 },
        { type: 'mcq', id: 't4-l-cr4', part: 5, audioUrl: '/audio/toefl/set-4/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['No, I have not tried it.', 'It is made of clay.', 'Of course — I\'ll help you carry it upstairs.', 'The bus was empty.'], answer: 2 },
        { type: 'mcq', id: 't4-l-cr5', part: 5, audioUrl: '/audio/toefl/set-4/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['She teaches history.', 'It is quite cheap.', 'Yes, I got a place on the team!', 'The library is far.'], answer: 2 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between a student and a librarian. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-4/conversation.mp3',
      transcript: `STUDENT: Hi, I borrowed a book last month, and I just realized it's overdue. I'm really sorry — I completely lost track of time.\n\nLIBRARIAN: No problem, it happens all the time. Let me check your account. Okay, yes, it's about two weeks overdue. There's a small fine — ten cents a day, so that's one dollar forty.\n\nSTUDENT: Oh, that's not as bad as I feared. Can I pay it now?\n\nLIBRARIAN: You can, but actually, let me mention something. If you're a first-time offender — and I can see this is your first overdue book — we can waive the fine this once. It's a policy we have to encourage students to keep using the library rather than avoiding it out of guilt.\n\nSTUDENT: Really? That's very kind. Thank you.\n\nLIBRARIAN: You're welcome. Just try to return things on time in future. One tip: you can renew a book online up to three times, as long as no one else has requested it. So if you need more time, renew it before the due date rather than letting it go overdue.\n\nSTUDENT: I didn't know I could renew online. That's really useful. Actually, could I renew this same book? I haven't finished it.\n\nLIBRARIAN: Let me check... yes, no one's waiting for it, so I'll renew it for you now. That gives you another three weeks.`,
      questions: [
        { type: 'mcq', id: 't4-l-cv1', part: 6, text: 'Why does the student apologize at the start?', options: ['Her borrowed book is overdue.', 'She damaged the book.', 'She was talking loudly.', 'She lost the book.'], answer: 0 },
        { type: 'mcq', id: 't4-l-cv2', part: 6, text: 'What does the librarian offer to do about the fine?', options: ['Double it', 'Waive it this once, since it is the student\'s first overdue book', 'Report the student', 'Ban the student from the library'], answer: 1 },
        { type: 'mcq', id: 't4-l-cv3', part: 6, text: 'What tip does the librarian give for the future?', options: ['Return books a day early', 'Never borrow books', 'Renew a book online before the due date if more time is needed', 'Always pay the fine'], answer: 2 },
        { type: 'mcq', id: 't4-l-cv4', part: 6, text: 'What does the librarian do for the student at the end?', options: ['Orders a new copy', 'Cancels the account', 'Charges the fine', 'Renews the same book, giving another three weeks'], answer: 3 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-4/announcement.mp3',
      transcript: `Good morning, everyone. This is an announcement about the university's new bike-repair station, which opens this week near the main entrance. As part of our effort to encourage cycling, the station provides free tools that any student or staff member can use to make basic repairs to their bicycle — things like pumping up tires, adjusting brakes, or tightening a loose seat.\n\nThe tools are attached to the stand with cables, so they stay available for everyone; please don't remove them. There's also a free air pump. If you're not sure how to fix something, we've put up a simple illustrated guide, and there are short video tutorials linked by a code you can scan with your phone. For more serious repairs, the guide lists local bike shops that offer a student discount. We hope this makes cycling to campus easier and cheaper for everyone. Remember to always lock your bike in the designated racks. Thank you.`,
      questions: [
        { type: 'mcq', id: 't4-l-an1', part: 7, text: 'What is the announcement about?', options: ['A new free bike-repair station', 'A cycling competition', 'A ban on bicycles', 'A new car park'], answer: 0 },
        { type: 'mcq', id: 't4-l-an2', part: 7, text: 'Why are the tools attached with cables?', options: ['To make them look nice', 'So they stay available for everyone and are not removed', 'To charge them with electricity', 'To measure how often they are used'], answer: 1 },
        { type: 'mcq', id: 't4-l-an3', part: 7, text: 'What is provided for more serious repairs?', options: ['Nothing', 'A free mechanic', 'A list of local bike shops that offer a student discount', 'Free replacement bikes'], answer: 2 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-4/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to discuss a striking idea about how we make decisions. We like to think of ourselves as rational — that we carefully weigh the evidence and choose the best option. But decades of research in psychology suggest that much of our thinking relies on mental shortcuts, which psychologists call "heuristics." These shortcuts are usually helpful, letting us make quick judgments without exhausting effort. But they can also lead us into systematic errors, or "biases."\n\nLet me give you one well-known example: the availability heuristic. This is our tendency to judge how likely something is by how easily examples come to mind. If examples are easy to recall, we assume the thing is common; if they're hard to recall, we assume it's rare. Often this works fine. But it can badly mislead us. For instance, after seeing dramatic news coverage of a plane crash, many people overestimate the danger of flying, even though, statistically, flying is far safer than driving. The vivid, memorable images of the crash are "available" in memory, so the risk feels bigger than it is.\n\nWhy do we have these shortcuts if they can mislead us? The answer is that for most of human history, and in most everyday situations, they serve us well. Quick, "good enough" judgments were often more valuable than slow, perfect calculations — especially when a fast decision could mean survival. The shortcuts are the product of a mind built for efficiency, not for statistical accuracy.\n\nThe practical value of understanding heuristics is this: once you know about a bias, you can sometimes correct for it. If you catch yourself judging a risk based on a scary headline, you can pause and ask, "What do the actual numbers say?" You won't eliminate these biases — they're too deeply built in — but awareness gives you a chance to override them when the stakes are high. In short, knowing how your mind takes shortcuts is the first step toward thinking more clearly.`,
      questions: [
        { type: 'mcq', id: 't4-l-at1', part: 8, text: 'What are "heuristics," as the professor describes them?', options: ['A type of memory loss', 'Mathematical formulas', 'Perfectly rational calculations', 'Mental shortcuts that allow quick judgments but can lead to systematic errors'], answer: 3 },
        { type: 'mcq', id: 't4-l-at2', part: 8, text: 'What is the "availability heuristic"?', options: ['Always choosing the cheapest option', 'Ignoring all evidence', 'Counting exact probabilities', 'Judging how likely something is by how easily examples come to mind'], answer: 3 },
        { type: 'mcq', id: 't4-l-at3', part: 8, text: 'Why do many people overestimate the danger of flying after a plane crash?', options: ['Flying really is very dangerous.', 'Vivid images of the crash are easily recalled, making the risk feel bigger than it is.', 'Planes are slower than cars.', 'They dislike airports.'], answer: 1 },
        { type: 'mcq', id: 't4-l-at4', part: 8, text: 'According to the professor, why do we have these mental shortcuts?', options: ['They have no purpose.', 'They are always perfectly accurate.', 'For most situations they serve us well, since quick "good enough" judgments were often more valuable than slow, perfect ones.', 'They were invented recently.'], answer: 2 },
        { type: 'mcq', id: 't4-l-at5', part: 8, text: 'What practical value does understanding heuristics have?', options: ['It makes decisions slower and worse.', 'It has no practical value.', 'It removes all biases forever.', 'Awareness gives you a chance to pause, check the actual numbers, and override a bias when the stakes are high.'], answer: 3 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Read the first speaker. Arrange the fragments to make a grammatical and contextually appropriate reply. One fragment is not used.',
      sectionNote: TOEFL_BUILD_SENTENCE_SET4_V2.interactionDisclosure,
      questions: TOEFL_BUILD_SENTENCE_SET4_V2.items.map((item) =>
        toToeflBuildSentenceQuestion(TOEFL_BUILD_SENTENCE_SET4_V2.objectId, item, 9)),
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't4-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You are a member of a sports club. You have injured your ankle and cannot take part for about a month. You want to ask whether your membership can be paused so you do not pay for the weeks you will miss.\n\nWrite an email to the sports club office.`,
          text: 'In your email: explain your situation, make your request clearly, and keep a polite tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't4-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on learning. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Grant: Some people believe that making mistakes is one of the best ways to learn, while others think mistakes should be avoided as much as possible. What is your view, and why?\n\nStudent (Priya): I think making mistakes is essential to learning. When we get something wrong and understand why, the lesson sticks with us far better than simply being told the right answer. For example, I once solved a math problem incorrectly for weeks, but the moment I finally understood my error, I never made that mistake again.\n\nStudent (Marco): I partly agree, but too many mistakes can be discouraging and waste time. It is better to learn from clear examples first and make mistakes carefully. For example, when I was learning to drive, repeating the same mistake over and over just made me more nervous instead of helping me improve.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't4-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-4/repeat-1.mp3', targetSentence: 'The meeting starts at ten.' },
        { type: 'repeat', id: 't4-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-4/repeat-2.mp3', targetSentence: 'He washed the car and cleaned the windows.' },
        { type: 'repeat', id: 't4-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-4/repeat-3.mp3', targetSentence: 'The nurse reminded the patient to take the medicine twice a day.' },
        { type: 'repeat', id: 't4-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-4/repeat-4.mp3', targetSentence: 'The committee agreed that the festival should be held in the town square this year.' },
        { type: 'repeat', id: 't4-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-4/repeat-5.mp3', targetSentence: 'Once the software update had been installed, the computers ran faster and crashed far less often.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't4-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe a journey or trip you enjoyed. Where did you go, and what made it enjoyable?' },
        { type: 'speak', id: 't4-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to buy new things, while others prefer to repair or reuse what they have. Which are you, and why? Give reasons and an example.' },
        { type: 'speak', id: 't4-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your university can spend money on either more scholarships for students or better sports facilities. Which would you recommend, and why? Explain how it would benefit students.' },
        { type: 'speak', id: 't4-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might the way people work and earn a living change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
