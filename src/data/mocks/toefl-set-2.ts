import type { MockExam } from './types';
import { TOEFL_CTW_SET2_V2 } from '@/data/toefl/complete-the-words-sets-2-5';
import { TOEFL_READING_SET2_V2 } from '@/data/toefl/reading-sets-2-5';
import { TOEFL_BUILD_SENTENCE_SET2_V2 } from '@/data/toefl/build-sentence-sets-2-5';
import { toToeflBuildSentenceQuestion } from './toefl-build-sentence-adapter';
import { toToeflReadingQuestion } from './toefl-reading-adapter';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Migrado del formato antiguo (0–120) al formato 2026. Audios bajo /audio/toefl/set-2/.

const mock: MockExam = {
  id: 'set-2',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 2 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: TOEFL_CTW_SET2_V2.id, part: 1, qRange: [1, 10],
          objectId: TOEFL_CTW_SET2_V2.objectId,
          contentVersion: String(TOEFL_CTW_SET2_V2.version),
          serverScoring: 'toefl-complete-words',
          alignment: 'official-family-pilot',
          instructions: TOEFL_CTW_SET2_V2.instructions,
          template: TOEFL_CTW_SET2_V2.template,
          blanks: TOEFL_CTW_SET2_V2.blanks.map((blank) => ({ ...blank })),
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Gym class schedule)',
      instructions: 'Read the notice and answer the questions.',
      passage: `RIVERSIDE GYM — GROUP CLASS SCHEDULE\n\n• Yoga: Monday & Thursday, 6:00 p.m.\n• Spin (cycling): Tuesday & Friday, 7:00 a.m.\n• Pilates: Wednesday, 6:30 p.m.\n\nAll classes last 45 minutes. Booking is required and opens 48 hours before each class via the app. If you cannot attend, please cancel at least 2 hours before, or you may be charged a no-show fee. Bring your own mat for yoga and Pilates; spin bikes are provided.`,
      passageTitle: 'Class schedule',
      questions: [
        { type: 'mcq', id: 't2-r-dl1', part: 2, text: 'When is the Pilates class?', options: ['Wednesday at 6:30 p.m.', 'Friday morning', 'Thursday at 6 p.m.', 'Monday evening'], answer: 0 },
        { type: 'mcq', id: 't2-r-dl2', part: 2, text: 'When does booking open for a class?', options: ['One week before', '48 hours before', '2 hours before', 'On the day only'], answer: 1 },
        { type: 'mcq', id: 't2-r-dl3', part: 2, text: 'What must members bring for yoga and Pilates?', options: ['Nothing', 'A spin bike', 'Their own mat', 'A towel only'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Neighbor note)',
      instructions: 'Read the note and answer the questions.',
      passage: `Hi Mrs. Patel,\n\nI'm going away for two weeks starting Saturday. Would you be able to water my plants twice a week while I'm gone? There are only four pots, all on the balcony. I've left a spare key under the mat and a note about how much water each plant needs.\n\nI'd be very grateful — I'll bring you back something nice from my trip! My number is on the fridge if any problems come up.\n\nThank you,\nClara (Flat 3B)`,
      passageTitle: 'Neighbor note',
      questions: [
        { type: 'mcq', id: 't2-r-dl4', part: 3, text: 'What is Clara asking her neighbor to do?', options: ['Collect her mail', 'Look after her children', 'Feed her cat', 'Water her plants twice a week'], answer: 3 },
        { type: 'mcq', id: 't2-r-dl5', part: 3, text: 'Where has Clara left a spare key?', options: ['Under the mat', 'In the mailbox', 'At the neighbor\'s door', 'With the building manager'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: TOEFL_READING_SET2_V2.academic.instructions,
      sectionNote: 'Las preguntas 1–5 forman Academic Passage. La selección múltiple final es práctica complementaria WeLearn.',
      passage: TOEFL_READING_SET2_V2.academic.text,
      passageTitle: TOEFL_READING_SET2_V2.academic.title,
      questions: TOEFL_READING_SET2_V2.academic.items.map((item) =>
        toToeflReadingQuestion(TOEFL_READING_SET2_V2.objectId, item, 4)),
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't2-l-cr1', part: 5, audioUrl: '/audio/toefl/set-2/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['She left early.', 'It\'s in the building next to the library.', 'No, I don\'t like coffee.', 'The soup is warm.'], answer: 1 },
        { type: 'mcq', id: 't2-l-cr2', part: 5, audioUrl: '/audio/toefl/set-2/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['The window is open.', 'Yes, she is a pilot.', 'It is six meters tall.', 'Sure, I can help you move the boxes.'], answer: 3 },
        { type: 'mcq', id: 't2-l-cr3', part: 5, audioUrl: '/audio/toefl/set-2/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['The bread is fresh.', 'He arrives on Tuesday.', 'It costs nine dollars.', 'You can sign up online through the portal.'], answer: 3 },
        { type: 'mcq', id: 't2-l-cr4', part: 5, audioUrl: '/audio/toefl/set-2/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['It is made of stone.', 'No problem — I\'ll wait for you here.', 'The bus was crowded.', 'No, I have not been there.'], answer: 1 },
        { type: 'mcq', id: 't2-l-cr5', part: 5, audioUrl: '/audio/toefl/set-2/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['It is quite far.', 'Yes, I won first prize in the contest!', 'The market is closed.', 'She teaches art.'], answer: 1 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between a student and a professor. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-2/conversation.mp3',
      transcript: `STUDENT: Professor Diaz, could I talk to you about the group project? I'm having some difficulties with my group.\n\nPROFESSOR: Of course. What kind of difficulties?\n\nSTUDENT: Well, there are four of us, but two members haven't done any work at all. They miss our meetings and don't respond to messages. The other student and I have basically done everything, and it doesn't feel fair that we'll all get the same grade.\n\nPROFESSOR: I understand your frustration, and you're right to raise it. Let me ask — have you told the two members directly how you feel, in a clear but calm way?\n\nSTUDENT: Not really directly. We've sent group messages, but we haven't confronted them.\n\nPROFESSOR: I'd suggest doing that first. Sometimes people don't realize how much they're letting the group down until it's stated plainly. Send a clear message, listing what still needs doing and asking them to take specific tasks by a specific date.\n\nSTUDENT: And if they still don't help?\n\nPROFESSOR: Then come back to me with a record of your attempts — the messages, the meeting dates. For this project, each group also submits a short peer-evaluation form, where you rate each member's contribution. I take those seriously, and they can affect individual grades. So it won't necessarily be the case that everyone gets the same mark regardless of effort.\n\nSTUDENT: That's really reassuring. I'll send that clear message today and keep a record.`,
      questions: [
        { type: 'mcq', id: 't2-l-cv1', part: 6, text: 'What is the student\'s problem?', options: ['She missed the deadline.', 'She wants to change groups.', 'She does not understand the assignment.', 'Two group members are not doing any work.'], answer: 3 },
        { type: 'mcq', id: 't2-l-cv2', part: 6, text: 'What does the professor suggest the student do first?', options: ['Tell the two members directly and clearly what still needs doing, with specific tasks and deadlines', 'Do all the work herself', 'Drop the course', 'Report the members to the dean'], answer: 0 },
        { type: 'mcq', id: 't2-l-cv3', part: 6, text: 'What should the student do if the members still do not help?', options: ['Give up', 'Come back with a record of her attempts, such as messages and meeting dates', 'Complain to other students', 'Rewrite the whole project'], answer: 1 },
        { type: 'mcq', id: 't2-l-cv4', part: 6, text: 'How does the professor say individual effort will be reflected?', options: ['By a final exam only', 'It will not be.', 'Through a peer-evaluation form that can affect individual grades', 'By giving everyone the same mark'], answer: 2 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-2/announcement.mp3',
      transcript: `Good afternoon. This is an announcement about the student art competition being held by the arts department this term. The theme this year is "Home," and we invite all students, from any department, to submit an original piece of work. It can be a painting, a photograph, a drawing, or a digital design.\n\nEntries must be submitted to the arts office by the end of the third week of term. Please attach a short note — no more than fifty words — explaining what your piece means to you. A panel of staff and student judges will choose the winners, and the best works will be displayed in the main gallery for a month. There are prizes for the top three entries, including art supplies and gallery vouchers. You do not need to be an art student to enter — we especially encourage those who don't usually get the chance to show their creative side. Good luck, and we look forward to seeing your work.`,
      questions: [
        { type: 'mcq', id: 't2-l-an1', part: 7, text: 'What is the announcement about?', options: ['A change in class times', 'A gallery closing', 'A music concert', 'A student art competition with the theme "Home"'], answer: 3 },
        { type: 'mcq', id: 't2-l-an2', part: 7, text: 'What must students attach to their entry?', options: ['A short note (up to fifty words) explaining what the piece means to them', 'A photograph of themselves', 'A long essay', 'A payment'], answer: 0 },
        { type: 'mcq', id: 't2-l-an3', part: 7, text: 'Who is allowed to enter the competition?', options: ['Only art students', 'All students, from any department', 'Only staff', 'Only final-year students'], answer: 1 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-2/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to introduce a fascinating idea from psychology called the "spacing effect." It has enormous practical importance for anyone who wants to learn something — which is to say, all of you. The spacing effect describes a simple but powerful finding: we remember information much better when we study it in several short sessions spread out over time, rather than in one long session.\n\nLet me put it in concrete terms. Suppose you have six hours to prepare for an exam. You could do all six hours the night before — what students call "cramming." Or you could do one hour a day for six days. Decades of research show, quite consistently, that the spaced approach — the six separate hours — leads to far better long-term retention. Even though the total study time is identical, spreading it out dramatically improves how much you remember weeks or months later.\n\nWhy does this happen? The leading explanation involves how memories are strengthened through retrieval. Each time you return to material after a gap, your brain has to work a little harder to recall it, and that effortful retrieval strengthens the memory. When you cram, the information is still fresh from a few minutes ago, so recalling it is easy — and easy recall does little to strengthen long-term memory. A little bit of forgetting between sessions, followed by successful retrieval, is exactly what builds durable knowledge.\n\nThe practical implications are significant, and, frankly, most students ignore them. Cramming can get you through a test the next morning, because the information is briefly available. But it's remarkably inefficient for genuine, lasting learning. If you're studying a language, a science, or anything you actually want to keep, the research is clear: study a little, often, with gaps in between. Space it out. Your future self will remember far more for the same total effort.`,
      questions: [
        { type: 'mcq', id: 't2-l-at1', part: 8, text: 'What is the "spacing effect"?', options: ['A method of speed reading', 'Studying only once', 'The finding that we remember better when study is spread over several short sessions rather than one long one', 'A way to measure intelligence'], answer: 2 },
        { type: 'mcq', id: 't2-l-at2', part: 8, text: 'In the professor\'s example, which approach leads to better long-term retention?', options: ['Both are equal.', 'Neither works.', 'Six hours the night before (cramming)', 'One hour a day for six days (spaced)'], answer: 3 },
        { type: 'mcq', id: 't2-l-at3', part: 8, text: 'According to the leading explanation, why does spacing work?', options: ['Because returning after a gap requires effortful retrieval, which strengthens memory', 'Because it is more enjoyable', 'Because cramming is impossible', 'Because it uses less total time'], answer: 0 },
        { type: 'mcq', id: 't2-l-at4', part: 8, text: 'Why does cramming do little for long-term memory?', options: ['The information is too difficult.', 'The information is still fresh, so recalling it is easy, and easy recall does little to strengthen memory.', 'Students are too tired.', 'It uses too much time.'], answer: 1 },
        { type: 'mcq', id: 't2-l-at5', part: 8, text: 'What practical advice does the professor give?', options: ['Study only in long sessions.', 'Always cram the night before.', 'Study a little, often, with gaps in between, to remember more for the same total effort.', 'Never review material.'], answer: 2 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Read the first speaker. Arrange the fragments to make a grammatical and contextually appropriate reply. One fragment is not used.',
      sectionNote: TOEFL_BUILD_SENTENCE_SET2_V2.interactionDisclosure,
      questions: TOEFL_BUILD_SENTENCE_SET2_V2.items.map((item) =>
        toToeflBuildSentenceQuestion(TOEFL_BUILD_SENTENCE_SET2_V2.objectId, item, 9)),
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't2-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You ordered a birthday cake from a bakery for this Saturday, but you now need it for Friday instead. You want to ask whether the date can be changed and confirm the details of your order.\n\nWrite an email to the bakery.`,
          text: 'In your email: explain the change you need, confirm your order details, and keep a polite tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't2-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on society. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Owens: Some people think that volunteering should be a required part of every student's education, while others believe it should remain a personal choice. What is your view, and why?\n\nStudent (Amara): I think it should be required. Volunteering builds empathy, teaches responsibility, and connects students with their communities. For example, when my class volunteered at a local shelter, several students who had never considered social work discovered a genuine interest in it.\n\nStudent (Kenji): I disagree. Volunteering only has real value when it comes from genuine willingness. If it is forced, students may do it half-heartedly, and it loses its meaning. For example, a friend of mine was required to volunteer at a nursing home and resented every visit, which likely did more harm than good.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't2-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-2/repeat-1.mp3', targetSentence: 'The room is very quiet.' },
        { type: 'repeat', id: 't2-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-2/repeat-2.mp3', targetSentence: 'They planted flowers along the garden path.' },
        { type: 'repeat', id: 't2-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-2/repeat-3.mp3', targetSentence: 'The company offered discounts to its regular customers.' },
        { type: 'repeat', id: 't2-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-2/repeat-4.mp3', targetSentence: 'The guide explained that the castle had been built over five hundred years ago.' },
        { type: 'repeat', id: 't2-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-2/repeat-5.mp3', targetSentence: 'Although the weather forecast had predicted rain, the afternoon turned out to be bright and sunny.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't2-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe a possession that is important to you. What is it, and why does it matter?' },
        { type: 'speak', id: 't2-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to listen to music while they work, while others prefer silence. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't2-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your town can spend money on either a new public library or a new sports center. Which would you recommend, and why? Explain how it would benefit residents.' },
        { type: 'speak', id: 't2-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might the way people shop for food change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
