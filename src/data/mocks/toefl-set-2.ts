import type { MockExam } from './types';

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
          type: 'wordcomplete', id: 't2-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is writing to a professor to ask for a reference.',
          template: `Dear Professor Blake,\n\nI am applying for a summer {{1}} at a local research lab, and the application requires a {{2}} from a teacher. As I really enjoyed your biology {{3}} and did well in it, I was hoping you might be willing to {{4}} me. The {{5}} for the application is the end of the month. Please let me know if you would be {{6}} to help.\n\nThank you very much,\nRafael`,
          blanks: [
            { num: 1, prefix: 'intern', answer: 'internship' },
            { num: 2, prefix: 'ref', answer: 'reference' },
            { num: 3, prefix: 'cou', answer: 'course' },
            { num: 4, prefix: 'rec', answer: 'recommend' },
            { num: 5, prefix: 'dead', answer: 'deadline' },
            { num: 6, prefix: 'wil', answer: 'willing' },
          ],
        },
        {
          type: 'wordcomplete', id: 't2-r-cw2', part: 1, qRange: [7, 12],
          instructions: 'The following is from an article about penguins.',
          template: `Penguins are birds that cannot {{1}}, but they are excellent swimmers. Their wings have become {{2}} that help them move quickly through the water in search of fish. Most penguins live in the southern half of the world, and some survive in extremely {{3}} conditions. To keep warm, they have a thick layer of {{4}} under their skin and huddle together in large {{5}}. Sadly, climate change is now threatening the {{6}} where many penguins live.`,
          blanks: [
            { num: 1, prefix: 'fl', answer: 'fly' },
            { num: 2, prefix: 'fli', answer: 'flippers' },
            { num: 3, prefix: 'co', answer: 'cold' },
            { num: 4, prefix: 'fa', answer: 'fat' },
            { num: 5, prefix: 'gro', answer: 'groups' },
            { num: 6, prefix: 'hab', answer: 'habitats' },
          ],
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
      instructions: 'Read the passage and answer questions.',
      passage: `Few objects in daily life seem as simple as a mirror, yet the story of how humans learned to make good mirrors is a surprisingly long and revealing one. For most of history, seeing a clear reflection of oneself was a rare experience. Early humans could glimpse themselves only in still water or in polished stones, and these reflections were dim and distorted.\n\nThe first manufactured mirrors, made thousands of years ago, were sheets of polished metal such as bronze, copper, or silver. These could produce a recognizable reflection, but they had serious drawbacks: the images were dark, the metal tarnished and needed constant polishing, and large mirrors were extremely expensive. For much of human history, therefore, a good mirror was a luxury owned only by the wealthy.\n\nThe breakthrough came with glass. Glassmakers discovered that a thin layer of reflective metal applied to the back of a sheet of glass produced a far brighter and clearer image than polished metal alone, while the glass protected the metal from tarnishing. In the sixteenth century, Venetian craftsmen perfected a method using a coating of tin and mercury, and Venice became famous—and rich—for its mirrors. These were still costly, and the process was dangerous, since mercury is highly toxic. But the quality was unprecedented.\n\nThe true democratization of the mirror came in the nineteenth century, when a German chemist developed a process for coating glass with a thin layer of silver using relatively safe chemicals. This method was cheaper, safer, and produced excellent mirrors that could be manufactured on a large scale. For the first time, ordinary people could own a clear mirror. Historians have noted that the spread of affordable mirrors may have subtly changed human self-perception: when people could easily and regularly see themselves as others see them, it likely affected everything from fashion to the very sense of individual identity. A humble object, it turns out, quietly reshaped how humans understand themselves.`,
      passageTitle: 'A Short History of the Mirror',
      questions: [
        { type: 'mcq', id: 't2-r-ap1', part: 4, text: 'How did early humans see their reflections?', options: ['In manufactured glass mirrors', 'Only in still water or polished stones, dimly and with distortion', 'In photographs', 'They could not see reflections at all.'], answer: 1 },
        { type: 'mcq', id: 't2-r-ap2', part: 4, text: 'What were the drawbacks of early metal mirrors?', options: ['They were too cheap to be valued.', 'They were too light.', 'The images were dark, the metal tarnished, and large ones were very expensive.', 'They broke too easily.'], answer: 2 },
        { type: 'mcq', id: 't2-r-ap3', part: 4, text: 'Why did glass produce a better mirror than polished metal alone?', options: ['Glass never breaks.', 'Glass is a metal.', 'Glass is heavier.', 'A thin layer of reflective metal behind glass gave a brighter, clearer image, and the glass protected the metal from tarnishing.'], answer: 3 },
        { type: 'mcq', id: 't2-r-ap4', part: 4, text: 'What made mirrors affordable to ordinary people in the nineteenth century?', options: ['A German chemist\'s process for coating glass with silver using relatively safe chemicals', 'Polished bronze', 'Cheaper water', 'Venetian tin-and-mercury coating'], answer: 0 },
        { type: 'mcq', id: 't2-r-ap5', part: 4, text: 'What broader effect did affordable mirrors have, according to the passage?', options: ['They had no effect on people.', 'They may have changed human self-perception, affecting fashion and the sense of individual identity.', 'They made people dislike their appearance.', 'They ended the use of glass.'], answer: 1 },
        { type: 'multiselect', id: 't2-r-ap6', part: 4, qRange: [6, 6], text: 'Select the TWO statements supported by the passage.', options: [
          { letter: 'A', text: 'Early manufactured mirrors were made of polished metal such as bronze or silver.' },
          { letter: 'B', text: 'Good mirrors were cheap and common throughout history.' },
          { letter: 'C', text: 'A nineteenth-century silvering process made clear mirrors affordable for ordinary people.' },
          { letter: 'D', text: 'Glass mirrors were invented before metal mirrors.' },
        ], selectCount: 2, answers: ['A', 'C'] },
      ],
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
      instructions: 'Put the words in the correct order to make a grammatical sentence.',
      questions: [
        { type: 'sentencebuild', id: 't2-w-bs1', part: 9, tiles: ['She', 'volunteers', 'at', 'a shelter', 'on weekends'], answer: ['She', 'volunteers', 'at', 'a shelter', 'on weekends'] },
        { type: 'sentencebuild', id: 't2-w-bs2', part: 9, tiles: ['the window', 'you', 'open', 'Could', 'a little'], answer: ['Could', 'you', 'open', 'the window', 'a little'] },
        { type: 'sentencebuild', id: 't2-w-bs3', part: 9, tiles: ['gave', 'The advice', 'you', 'me', 'was', 'helpful'], answer: ['The advice', 'you', 'gave', 'me', 'was', 'helpful'] },
        { type: 'sentencebuild', id: 't2-w-bs4', part: 9, tiles: ['ready,', 'is', 'When', 'we\'ll', 'the taxi', 'leave'], answer: ['When', 'the taxi', 'is', 'ready,', 'we\'ll', 'leave'] },
        { type: 'sentencebuild', id: 't2-w-bs5', part: 9, tiles: ['is', 'This model', 'the older one', 'than', 'lighter'], answer: ['This model', 'is', 'lighter', 'than', 'the older one'] },
        { type: 'sentencebuild', id: 't2-w-bs6', part: 9, tiles: ['the phone,', 'Answering', 'she', 'the good news', 'heard'], answer: ['Answering', 'the phone,', 'she', 'heard', 'the good news'] },
      ],
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't2-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You ordered a birthday cake from a bakery for this Saturday, but you now need it for Friday instead. You want to ask whether the date can be changed and confirm the details of your order.\n\nWrite an email to the bakery.`,
          text: 'In your email: explain the change you need, confirm your order details, and keep a polite tone. Write approximately 80–120 words.',
          minWords: 80 },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't2-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on society. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Owens: Some people think that volunteering should be a required part of every student's education, while others believe it should remain a personal choice. What is your view, and why?\n\nStudent (Amara): I think it should be required. Volunteering builds empathy, teaches responsibility, and connects students with their communities.\n\nStudent (Kenji): I disagree. Volunteering only has real value when it comes from genuine willingness. If it is forced, students may do it half-heartedly, and it loses its meaning.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100 },
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
