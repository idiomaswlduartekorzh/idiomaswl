import type { MockExam } from './types';
import { TOEFL_CTW_SET17_V2 } from '@/data/toefl/complete-the-words-sets-16-20';
import { toToeflCompleteWordsQuestion } from './toefl-complete-words-adapter';
import { TOEFL_READING_SET17_V2 } from '@/data/toefl/reading-sets-16-20';
import { toToeflReadingQuestion } from './toefl-reading-adapter';
import { TOEFL_BUILD_SENTENCE_SET17_V2 } from '@/data/toefl/build-sentence-sets-16-20';
import { toToeflBuildSentenceQuestion } from './toefl-build-sentence-adapter';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Audios bajo /audio/toefl/set-17/ — pendientes (ver checklist de medios).

const mock: MockExam = {
  id: 'set-17',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 17 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1,
      skill: 'reading',
      title: 'Reading — Complete the Words',
      instructions: TOEFL_CTW_SET17_V2.instructions,
      questions: [toToeflCompleteWordsQuestion(TOEFL_CTW_SET17_V2, 1)],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Laundry notice)',
      instructions: 'Read the notice and answer the questions.',
      passage: `SHARED LAUNDRY ROOM — RULES FOR RESIDENTS\n\n• The laundry room is open from 7:00 a.m. to 11:00 p.m. daily.\n• Each washing machine takes coins or the laundry app.\n• Please remove your clothes promptly when the cycle ends so others can use the machine.\n• Do not leave the room while dyeing or bleaching clothes.\n• Report broken machines to the building manager using the form by the door. Do NOT attempt to repair them yourself.`,
      passageTitle: 'Laundry notice',
      questions: [
        { type: 'mcq', id: 't17-r-dl1', part: 2, text: 'How can residents pay for the machines?', options: ['With a bank transfer', 'They are free.', 'Only with cash', 'With coins or the laundry app'], answer: 3 },
        { type: 'mcq', id: 't17-r-dl2', part: 2, text: 'What should residents do when a cycle ends?', options: ['Remove their clothes promptly so others can use the machine', 'Start another cycle', 'Turn off the lights', 'Leave the clothes for a day'], answer: 0 },
        { type: 'mcq', id: 't17-r-dl3', part: 2, text: 'What should a resident do if a machine is broken?', options: ['Repair it themselves', 'Report it to the building manager using the form by the door', 'Ignore it', 'Use a different building'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Volunteer email)',
      instructions: 'Read the email and answer the questions.',
      passage: `From: Green City Project\nTo: New volunteers\nSubject: Welcome and first steps\n\nHello and welcome,\n\nThank you for signing up to volunteer with the Green City Project. Our next tree-planting event is on Sunday, March 9, from 9:00 a.m. to 1:00 p.m. in Hillside Park.\n\nPlease wear old clothes and sturdy shoes, and bring a water bottle. We will provide gloves, tools, and a light snack. No experience is needed — our team leaders will show you what to do. If it rains heavily, the event will be postponed; we will email you by 7:00 a.m. that day. We look forward to greening the city with you!`,
      passageTitle: 'Volunteer email',
      questions: [
        { type: 'mcq', id: 't17-r-dl4', part: 3, text: 'What should volunteers bring?', options: ['A tent', 'Their own tools and gloves', 'Old clothes, sturdy shoes, and a water bottle', 'A snack for everyone'], answer: 2 },
        { type: 'mcq', id: 't17-r-dl5', part: 3, text: 'What happens if it rains heavily?', options: ['Volunteers must bring umbrellas.', 'The event moves indoors.', 'The event continues as normal.', 'The event will be postponed, and volunteers will be emailed by 7:00 a.m.'], answer: 3 },
      ],
    },
    {
      part: 4,
      skill: 'reading',
      title: 'Reading — Read an Academic Passage',
      instructions: TOEFL_READING_SET17_V2.academic.instructions,
      sectionNote: 'Las preguntas 1–5 reproducen familias oficiales de selección única. La pregunta 6 es práctica complementaria WeLearn.',
      passage: TOEFL_READING_SET17_V2.academic.text,
      passageTitle: TOEFL_READING_SET17_V2.academic.title,
      questions: TOEFL_READING_SET17_V2.academic.items.map((item) =>
        toToeflReadingQuestion(TOEFL_READING_SET17_V2.objectId, item, 4)),
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't17-l-cr1', part: 5, audioUrl: '/audio/toefl/set-17/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['It\'s on the ground floor, near the exit.', 'No, I don\'t like dancing.', 'The rice is ready.', 'She left this afternoon.'], answer: 0 },
        { type: 'mcq', id: 't17-l-cr2', part: 5, audioUrl: '/audio/toefl/set-17/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['Yes, he is a chef.', 'It is nine meters tall.', 'Sure, I\'ll meet you at the library at four.', 'The gate is locked.'], answer: 2 },
        { type: 'mcq', id: 't17-l-cr3', part: 5, audioUrl: '/audio/toefl/set-17/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['He arrives on Tuesday.', 'It costs five dollars.', 'You can find the form on the noticeboard.', 'The tea is cold.'], answer: 2 },
        { type: 'mcq', id: 't17-l-cr4', part: 5, audioUrl: '/audio/toefl/set-17/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['No problem — I\'ll email the slides to everyone.', 'The bus was crowded.', 'No, I have not been there.', 'It is made of wood.'], answer: 0 },
        { type: 'mcq', id: 't17-l-cr5', part: 5, audioUrl: '/audio/toefl/set-17/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['Yes, my sister had a baby girl!', 'The store is far.', 'She teaches geography.', 'It is quite cheap.'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between two students. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-17/conversation.mp3',
      transcript: `MAN: Did you sign up for the volunteer tutoring program? The one where we help local high-school students with math and science.\n\nWOMAN: I saw the poster but I wasn't sure. I want to, but I'm worried I'm not qualified. I'm only a second-year student myself.\n\nMAN: That's exactly what I thought at first. But they said you don't need to be an expert — you just need to be a year or two ahead of the students, which we definitely are. And there's a short training session before you start.\n\nWOMAN: Oh, that's reassuring. What's the time commitment?\n\nMAN: Two hours a week, on a day that fits your schedule. You meet the same student each week, so you build a relationship and can really track their progress.\n\nWOMAN: I like that. I think I'd find it rewarding, actually. Helping someone understand something you once struggled with yourself.\n\nMAN: Exactly. And honestly, it helps you too. Explaining a concept to someone else is one of the best ways to make sure you really understand it. I've heard people say they got better grades in their own courses after tutoring.\n\nWOMAN: That's a good point. Okay, I'm convinced. Where do I sign up?\n\nMAN: There's a link on the student services page. The deadline is Friday, so don't leave it too long.`,
      questions: [
        { type: 'mcq', id: 't17-l-cv1', part: 6, text: 'What is the man encouraging the woman to do?', options: ['Move to a new dorm', 'Take an extra class', 'Sign up for a volunteer tutoring program', 'Join a sports team'], answer: 2 },
        { type: 'mcq', id: 't17-l-cv2', part: 6, text: 'Why is the woman hesitant at first?', options: ['She dislikes teaching.', 'She is moving away.', 'She has no free time.', 'She is worried she is not qualified.'], answer: 3 },
        { type: 'mcq', id: 't17-l-cv3', part: 6, text: 'How much time does the program require?', options: ['Two hours a week', 'One full weekend', 'Every evening', 'Ten hours a week'], answer: 0 },
        { type: 'mcq', id: 't17-l-cv4', part: 6, text: 'According to the man, how does tutoring help the tutor?', options: ['It pays well.', 'Explaining a concept to someone else helps you understand it better yourself.', 'It requires no effort.', 'It replaces studying.'], answer: 1 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-17/announcement.mp3',
      transcript: `Good morning. This is an announcement for all students living in university housing. Next Tuesday, the water supply to buildings A, B, and C will be switched off temporarily for essential maintenance to the pipes. The shut-off will last from nine a.m. until approximately two p.m.\n\nDuring this time, there will be no running water in these buildings — no showers, no toilets, and no drinking water from the taps. We strongly recommend filling a few bottles of water the night before, and planning to shower earlier in the morning or later in the afternoon. Temporary toilets will be available in the courtyard between buildings B and C. We understand this is inconvenient, and we've scheduled it for the middle of the day to affect as few people as possible. Buildings D and E are not affected. Thank you for your cooperation.`,
      questions: [
        { type: 'mcq', id: 't17-l-an1', part: 7, text: 'What is the announcement about?', options: ['A change in rent', 'A power cut', 'A temporary water shut-off for pipe maintenance', 'A fire drill'], answer: 2 },
        { type: 'mcq', id: 't17-l-an2', part: 7, text: 'What does the announcement recommend students do?', options: ['Call a plumber', 'Move to another building permanently', 'Leave the building for the day', 'Fill some water bottles the night before and plan showers around the shut-off'], answer: 3 },
        { type: 'mcq', id: 't17-l-an3', part: 7, text: 'Which buildings are NOT affected?', options: ['D and E', 'B and C', 'All buildings are affected.', 'A and B'], answer: 0 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-17/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to talk about a surprising discovery in plant science: the ways in which trees communicate and cooperate with one another. For a long time, we pictured a forest as a collection of individual trees, each competing with its neighbors for sunlight, water, and nutrients. That picture isn't wrong, but it's incomplete. Beneath the forest floor, something remarkable is going on.\n\nThe key players are fungi. The roots of most trees are connected to networks of fungthreads in the soil, in a partnership called a mycorrhiza. The fungi help the tree absorb water and nutrients from the soil, and in return, the tree gives the fungi sugars it makes through photosynthesis. But here's the fascinating part: because these fungal networks connect the roots of many different trees, they can act as a kind of underground channel linking the whole forest. Some scientists have nicknamed this the "wood wide web."\n\nExperiments using tiny amounts of harmless radioactive tracers have shown that trees can actually transfer carbon and nutrients to one another through this network. In some cases, a large, well-established tree will send resources to smaller, shaded seedlings nearby — often its own offspring. There's even evidence that when a tree is dying, it may release its stored resources into the network, effectively passing them on to its neighbors.\n\nNow, I want to add a note of caution here, because this area is exciting but also debated. Some researchers argue that the popular image of trees "talking" and "sharing" out of cooperation may overstate what the evidence shows — the fungi, after all, may be moving resources for their own benefit, not the trees'. So while the underground networks are real and important, we should be careful not to romanticize them. What's certain is this: a forest is not simply a crowd of isolated competitors. It's an interconnected system, and understanding those connections is changing how we think about ecology and forest conservation.`,
      questions: [
        { type: 'mcq', id: 't17-l-at1', part: 8, text: 'What is the main topic of the lecture?', options: ['How trees compete for sunlight', 'How trees communicate and cooperate through underground fungal networks', 'How to plant a forest', 'Why forests are disappearing'], answer: 1 },
        { type: 'mcq', id: 't17-l-at2', part: 8, text: 'What is a "mycorrhiza"?', options: ['A kind of seed', 'A type of tree', 'A partnership between tree roots and fungi in the soil', 'A disease of trees'], answer: 2 },
        { type: 'mcq', id: 't17-l-at3', part: 8, text: 'What have experiments with radioactive tracers shown?', options: ['Fungi kill trees.', 'Trees move from place to place.', 'Trees do not interact.', 'Trees can transfer carbon and nutrients to one another through the fungal network.'], answer: 3 },
        { type: 'mcq', id: 't17-l-at4', part: 8, text: 'What note of caution does the professor add?', options: ['That the popular image of trees "sharing" out of cooperation may overstate the evidence, since fungi may act for their own benefit', 'That trees never share resources', 'That the research has been disproven', 'That the networks are not real'], answer: 0 },
        { type: 'mcq', id: 't17-l-at5', part: 8, text: 'What does the professor say is certain?', options: ['A forest is a crowd of isolated competitors.', 'A forest is an interconnected system, and understanding the connections is changing ecology.', 'Fungi are harmful to forests.', 'Trees cannot survive together.'], answer: 1 },
      ],
    },
    {
      part: 9,
      skill: 'writing',
      title: 'Writing — Build a Sentence',
      instructions: 'Read the first speaker. Arrange the fragments to make a grammatical and contextually appropriate reply. One fragment is not used.',
      sectionNote: TOEFL_BUILD_SENTENCE_SET17_V2.interactionDisclosure,
      questions: TOEFL_BUILD_SENTENCE_SET17_V2.items.map((item) =>
        toToeflBuildSentenceQuestion(TOEFL_BUILD_SENTENCE_SET17_V2.objectId, item, 9)),
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email.',
      questions: [
        { type: 'write', id: 't17-w-email', part: 10, taskNumber: 1, stimulusLabel: 'Write an Email',
          stimulus: `Situation: You booked a table at a restaurant for a group of six to celebrate a friend's birthday, but two more people now want to come. You want to ask if the booking can be changed to eight people.\n\nWrite an email to the restaurant.`,
          text: 'In your email: explain the situation, make your request clearly, and keep a polite tone. Write as much as you can in complete sentences.',
          minWords: 0, timeLimitSeconds: 420, minimumWordsPolicy: 'none-published', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response.',
      questions: [
        { type: 'write', id: 't17-w-disc', part: 11, taskNumber: 2, stimulusLabel: 'Write for an Academic Discussion',
          stimulus: `Your professor is teaching a class on the arts. Write a post responding to the professor's question. Contribute your own opinion and reasons, and add to the discussion.\n\nProfessor Meyer: Some governments spend public money to support the arts, such as museums, theatres, and concerts. Others argue this money should be spent on things like healthcare and education instead. Should governments fund the arts? Why or why not?\n\nStudent (Sofia): I think governments should fund the arts. They enrich people's lives, preserve culture, and attract tourists who bring money to the economy. For example, a free public museum in my city introduced thousands of children to art who would otherwise never have had the chance to visit one.\n\nStudent (Ahmed): I disagree. With limited budgets, essentials like hospitals and schools should come first. The arts can be supported by private donations. For example, a hospital in my region recently had to postpone equipment upgrades, which makes funding a theater instead hard to justify.`,
          text: 'Write a response of at least 100 words. State your position clearly, give reasons and an example, and refer to a classmate\'s point where relevant.',
          minWords: 100, timeLimitSeconds: 600, minimumWordsPolicy: 'recommended-100', evaluationDisclosure: 'Feedback local WeLearn; la respuesta se guarda como not_evaluated y no produce banda ni score ETS.' },
      ],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't17-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-17/repeat-1.mp3', targetSentence: 'The cafe is around the corner.' },
        { type: 'repeat', id: 't17-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-17/repeat-2.mp3', targetSentence: 'She wrote a letter and posted it the next day.' },
        { type: 'repeat', id: 't17-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-17/repeat-3.mp3', targetSentence: 'The museum offered free entry to students on weekdays.' },
        { type: 'repeat', id: 't17-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-17/repeat-4.mp3', targetSentence: 'The report recommended that the school should reduce the size of its classes.' },
        { type: 'repeat', id: 't17-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-17/repeat-5.mp3', targetSentence: 'Although the experiment failed the first time, the researchers learned enough to succeed on their second attempt.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't17-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, describe a hobby you would like to try in the future. What is it, and why does it appeal to you?' },
        { type: 'speak', id: 't17-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to spend their holidays relaxing, while others prefer to be active and explore. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't17-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your university can spend money on either free online learning resources or more in-person tutoring. Which would you recommend, and why? Explain how it would benefit students.' },
        { type: 'speak', id: 't17-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might the way people pay for goods change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
