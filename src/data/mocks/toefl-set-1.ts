import type {
  MockExam,
  ToeflBuildSentenceQuestion,
  ToeflReadingMultiQuestion,
  ToeflReadingSingleQuestion,
} from './types';
import { TOEFL_CTW_SET1_V3 } from '@/data/toefl/complete-the-words-set-1';
import { TOEFL_BUILD_SENTENCE_SET1, type ToeflBuildSentenceItem } from '@/data/toefl/build-sentence-set-1';
import {
  TOEFL_WRITING_CONSTRUCTED_SET1,
  type ToeflConstructedWritingTask,
} from '@/data/toefl/writing-constructed-set-1';
import {
  TOEFL_READING_SET1,
  type ToeflReadingMultiItem,
  type ToeflReadingSingleItem,
} from '@/data/toefl/reading-set-1';

// TOEFL iBT — formato oficial vigente (act. 21 enero 2026).
// Blueprint: docs/toefl-ibt-2026-official-format.md. Escala 1–6.
// Migrado del formato antiguo (0–120) al formato 2026. Audios bajo /audio/toefl/set-1/.

const [bookshopBlock, deliveryBlock] = TOEFL_READING_SET1.blocks.filter((block) => block.scope === 'daily-life');
const academicBlock = TOEFL_READING_SET1.blocks.find((block) => block.scope === 'academic')!;

function toSingleQuestion(item: ToeflReadingSingleItem, part: number): ToeflReadingSingleQuestion {
  return {
    type: 'toefl-reading-single',
    id: item.id,
    sourceItemId: item.legacyId,
    contentVersion: item.contentVersion,
    serverScoring: 'toefl-reading-set1',
    alignment: item.alignment,
    part,
    text: item.prompt,
    options: item.options,
  };
}

function toMultiQuestion(item: ToeflReadingMultiItem, part: number): ToeflReadingMultiQuestion {
  return {
    type: 'toefl-reading-multi',
    id: item.id,
    sourceItemId: item.legacyId,
    contentVersion: item.contentVersion,
    serverScoring: 'toefl-reading-set1',
    alignment: item.alignment,
    part,
    text: item.prompt,
    options: item.options,
    selectCount: item.selectCount,
  };
}

function toBuildSentenceQuestion(item: ToeflBuildSentenceItem, part: number): ToeflBuildSentenceQuestion {
  return {
    type: 'toefl-build-sentence',
    id: item.id,
    sourceItemId: item.legacyId,
    contentVersion: item.contentVersion,
    serverScoring: 'toefl-build-sentence-set1',
    alignment: item.alignment,
    part,
    context: item.context,
    replyPrefix: item.replyPrefix,
    replySuffix: item.replySuffix,
    tiles: item.tiles,
    blankCount: item.blankCount,
  };
}

function toConstructedWritingQuestion(task: ToeflConstructedWritingTask, part: number, taskNumber: 1 | 2) {
  return {
    type: 'write' as const,
    id: task.id,
    part,
    taskNumber,
    stimulusLabel: task.title,
    stimulus: task.stimulus,
    text: task.prompt,
    minWords: task.recommendedMinimumWords ?? 0,
    timeLimitSeconds: task.timeLimitSeconds,
    minimumWordsPolicy: task.recommendedMinimumWords ? 'recommended-100' as const : 'none-published' as const,
    evaluationDisclosure: TOEFL_WRITING_CONSTRUCTED_SET1.disclosure,
  };
}

const mock: MockExam = {
  id: 'set-1',
  examSlug: 'toefl',
  format: 'toefl-2026',
  title: 'TOEFL iBT Set 1 (Formato 2026)',
  subtitle: 'Complete the Words · Read in Daily Life · Academic Passage · Listening · Build a Sentence · Email · Academic Discussion · Speaking',
  timeMinutes: 86,
  sections: [
    {
      part: 1, skill: 'reading', title: 'Reading — Complete the Words',
      instructions: 'Complete each word so the text makes sense. Some letters are given.',
      questions: [
        {
          type: 'wordcomplete', id: 't1-r-cw1', part: 1, qRange: [1, 6],
          instructions: 'A student is writing to a friend about the weekend.',
          template: `Hi Sara,\n\nDo you want to do something this {{1}}? The weather is supposed to be sunny, so we could go for a {{2}} in the park or visit the new art {{3}}. I've heard the current {{4}} there is really good. Afterwards we could get some {{5}} at that café you like. Let me know what you'd {{6}} to do.\n\nSee you,\nJon`,
          blanks: [
            { num: 1, prefix: 'week', answer: 'weekend' },
            { num: 2, prefix: 'wa', answer: 'walk' },
            { num: 3, prefix: 'gal', answer: 'gallery' },
            { num: 4, prefix: 'exhib', answer: 'exhibition' },
            { num: 5, prefix: 'lu', answer: 'lunch' },
            { num: 6, prefix: 'pre', answer: 'prefer' },
          ],
        },
        {
          type: 'wordcomplete', id: TOEFL_CTW_SET1_V3.id, part: 1, qRange: [7, 16],
          instructions: TOEFL_CTW_SET1_V3.instructions,
          template: TOEFL_CTW_SET1_V3.template,
          blanks: TOEFL_CTW_SET1_V3.blanks.map((blank) => ({
            id: blank.id,
            num: blank.num,
            prefix: blank.prefix,
            missingLength: blank.missingLength,
          })),
        },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Reading — Read in Daily Life (Bookshop notice)',
      instructions: bookshopBlock.instructions,
      passage: bookshopBlock.text,
      passageTitle: bookshopBlock.title,
      questions: bookshopBlock.items.map((item) => toSingleQuestion(item as ToeflReadingSingleItem, 2)),
    },
    {
      part: 3, skill: 'reading', title: 'Reading — Read in Daily Life (Delivery message)',
      instructions: deliveryBlock.instructions,
      passage: deliveryBlock.text,
      passageTitle: deliveryBlock.title,
      questions: deliveryBlock.items.map((item) => toSingleQuestion(item as ToeflReadingSingleItem, 3)),
    },
    {
      part: 4, skill: 'reading', title: 'Reading — Read an Academic Passage',
      instructions: academicBlock.instructions,
      sectionNote: 'Las preguntas 1–5 forman el piloto de la familia Academic Passage. La selección múltiple final se conserva como práctica complementaria WeLearn y no se presenta como una sexta pregunta oficial.',
      passage: academicBlock.text,
      passageTitle: academicBlock.title,
      questions: [
        ...academicBlock.items
          .filter((item): item is ToeflReadingSingleItem => item.type === 'single-select')
          .map((item) => toSingleQuestion(item, 4)),
        ...academicBlock.items
          .filter((item): item is ToeflReadingMultiItem => item.type === 'multi-select')
          .map((item) => toMultiQuestion(item, 4)),
      ],
    },
    {
      part: 5, skill: 'listening', title: 'Listening — Listen and Choose a Response',
      instructions: 'You will hear a short exchange. Choose the best response. Each audio plays once.',
      questions: [
        { type: 'mcq', id: 't1-l-cr1', part: 5, audioUrl: '/audio/toefl/set-1/listen-choose-1.mp3', text: 'Choose the best response to what you heard.', options: ['It\'s on the first floor, next to the café.', 'No, I don\'t like tennis.', 'The soup is ready.', 'She left this morning.'], answer: 0 },
        { type: 'mcq', id: 't1-l-cr2', part: 5, audioUrl: '/audio/toefl/set-1/listen-choose-2.mp3', text: 'Choose the best response to what you heard.', options: ['Yes, he is a doctor.', 'It is two meters long.', 'Sure, I\'d love to join you for dinner.', 'The gate is closed.'], answer: 2 },
        { type: 'mcq', id: 't1-l-cr3', part: 5, audioUrl: '/audio/toefl/set-1/listen-choose-3.mp3', text: 'Choose the best response to what you heard.', options: ['He arrives on Friday.', 'It costs five dollars.', 'You can borrow one from the front desk.', 'The tea is cold.'], answer: 2 },
        { type: 'mcq', id: 't1-l-cr4', part: 5, audioUrl: '/audio/toefl/set-1/listen-choose-4.mp3', text: 'Choose the best response to what you heard.', options: ['Of course — I\'ll email you the details.', 'The bus was late.', 'No, I have not read it.', 'It is made of wood.'], answer: 0 },
        { type: 'mcq', id: 't1-l-cr5', part: 5, audioUrl: '/audio/toefl/set-1/listen-choose-5.mp3', text: 'Choose the best response to what you heard.', options: ['Yes, I passed all my exams!', 'The store is far.', 'She teaches music.', 'It is quite cheap.'], answer: 0 },
      ],
    },
    {
      part: 6, skill: 'listening', title: 'Listening — Listen to a Conversation',
      instructions: 'Listen to a conversation between two students. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-1/conversation.mp3',
      transcript: `MAN: Have you decided which elective you're taking next term?\n\nWOMAN: I'm stuck between two, actually. There's "Introduction to Psychology," which sounds really interesting, and "Public Speaking," which I know I need but am kind of dreading.\n\nMAN: Why are you dreading public speaking?\n\nWOMAN: I get really nervous in front of people. But that's exactly why I feel like I should take it — I'll have to give presentations in almost every career, and I never get better by avoiding it.\n\nMAN: That's a mature way to look at it. Psychology would probably be more enjoyable, but public speaking might be more useful in the long run.\n\nWOMAN: Right. And a friend who took the public speaking course last year said the teacher is really supportive — you start with tiny, low-pressure exercises and build up gradually. It's not like you have to give a big speech on day one.\n\nMAN: That does sound less scary. Honestly, I might take it too. I could use the practice.\n\nWOMAN: You should! It'd be easier with a friend in the class. Okay, you've helped me decide — I'll sign up for public speaking. I can always take psychology another term.`,
      questions: [
        { type: 'mcq', id: 't1-l-cv1', part: 6, text: 'What decision is the woman trying to make?', options: ['What job to apply for', 'Whether to change universities', 'Which elective to take next term', 'Where to live'], answer: 2 },
        { type: 'mcq', id: 't1-l-cv2', part: 6, text: 'Why is the woman considering the public speaking course despite dreading it?', options: ['It has no exams.', 'Her friend forced her to.', 'It is the easiest course.', 'She will need presentation skills in almost any career and won\'t improve by avoiding it.'], answer: 3 },
        { type: 'mcq', id: 't1-l-cv3', part: 6, text: 'What did the woman\'s friend say about the public speaking teacher?', options: ['The teacher is supportive and starts with small, low-pressure exercises.', 'The teacher gives no feedback.', 'The teacher cancels classes often.', 'The teacher is very strict.'], answer: 0 },
        { type: 'mcq', id: 't1-l-cv4', part: 6, text: 'What does the woman decide at the end?', options: ['To take psychology', 'To sign up for public speaking', 'To take neither course', 'To wait a year'], answer: 1 },
      ],
    },
    {
      part: 7, skill: 'listening', title: 'Listening — Listen to an Announcement',
      instructions: 'Listen to an announcement. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-1/announcement.mp3',
      transcript: `Good morning, students. This is an announcement about the campus cafeteria. Starting next Monday, we are introducing a number of changes based on the feedback many of you gave in last term's survey. First, we're extending our opening hours: the cafeteria will now stay open until nine p.m. on weekdays, so those of you studying late can still get a hot meal.\n\nSecond, we're expanding our vegetarian and vegan options — there will be at least three plant-based main dishes available at every meal. Third, to reduce waste, we're switching to reusable plates and cups for anyone eating in; disposable containers will only be given to those taking food away. We'll have a small deposit system for takeaway containers, which you get back when you return them. We hope these changes make the cafeteria a better place for everyone. Thank you for your feedback — it really does make a difference.`,
      questions: [
        { type: 'mcq', id: 't1-l-an1', part: 7, text: 'What is the announcement mainly about?', options: ['A cafeteria closure', 'A new cafeteria building', 'Changes to the cafeteria based on student feedback', 'A rise in food prices'], answer: 2 },
        { type: 'mcq', id: 't1-l-an2', part: 7, text: 'What change to opening hours is mentioned?', options: ['It will open only at weekends.', 'Hours will not change.', 'The cafeteria will close earlier.', 'It will stay open until 9 p.m. on weekdays.'], answer: 3 },
        { type: 'mcq', id: 't1-l-an3', part: 7, text: 'How is the cafeteria reducing waste?', options: ['By switching to reusable plates and cups for those eating in', 'By closing early', 'By removing vegetarian options', 'By charging more for food'], answer: 0 },
      ],
    },
    {
      part: 8, skill: 'listening', title: 'Listening — Listen to an Academic Talk',
      instructions: 'Listen to part of a lecture. Then answer the questions. The audio plays once.',
      audioUrl: '/audio/toefl/set-1/academic-talk.mp3',
      transcript: `PROFESSOR: Today I want to talk about a color that changed the world — or rather, a color that was, for most of history, almost impossible to make: the color purple. Specifically, a deep reddish-purple dye known in the ancient world as Tyrian purple. Understanding its story tells us a lot about how scarcity shapes value and even politics.\n\nIn the ancient Mediterranean, this purple dye was made from the mucus of certain sea snails. And here's the astonishing part: it took thousands of snails to produce just a tiny amount of dye — by some estimates, around ten thousand snails for a single gram. The process was slow, foul-smelling, and enormously labor-intensive. As a result, purple cloth became one of the most expensive substances in the world, worth more than its weight in gold.\n\nBecause it was so costly, purple became a symbol of wealth and power. Only emperors, kings, and the very rich could afford it. In the Roman Empire, laws were even passed restricting who was allowed to wear purple — at times, only the emperor himself. This is where we get the phrase "born to the purple," meaning born into royalty. The color's meaning came almost entirely from its scarcity, not from anything about the color itself.\n\nNow, here's the twist that I find fascinating. In eighteen fifty-six, a young British chemistry student named William Perkin was trying to make an anti-malaria drug, and he accidentally created the first synthetic purple dye. Suddenly, purple could be manufactured cheaply and in large quantities. Within a few decades, this once-royal color became available to ordinary people. And this is the deeper lesson: the value of purple was never really about the color. It was about how hard it was to get. Once technology removed that difficulty, the color lost its exclusive meaning. Scarcity, not beauty, had been doing the work all along.`,
      questions: [
        { type: 'mcq', id: 't1-l-at1', part: 8, text: 'What is the main topic of the lecture?', options: ['How to paint with purple', 'The history of the color purple and how scarcity shaped its value', 'The biology of sea snails', 'Roman fashion in general'], answer: 1 },
        { type: 'mcq', id: 't1-l-at2', part: 8, text: 'How was Tyrian purple dye made in the ancient world?', options: ['From tree bark', 'From flowers', 'From the mucus of certain sea snails, requiring thousands of snails for a tiny amount', 'From a rare mineral'], answer: 2 },
        { type: 'mcq', id: 't1-l-at3', part: 8, text: 'Why did purple become a symbol of wealth and power?', options: ['Because it was the emperor\'s favorite color', 'Because it never faded', 'Because it was easy to make', 'Because it was extremely costly and scarce, so only the rich could afford it'], answer: 3 },
        { type: 'mcq', id: 't1-l-at4', part: 8, text: 'What did William Perkin accidentally create in 1856?', options: ['The first synthetic purple dye', 'A new type of snail', 'A cheaper gold', 'A cure for malaria'], answer: 0 },
        { type: 'mcq', id: 't1-l-at5', part: 8, text: 'What is the "deeper lesson" the professor draws?', options: ['Purple is the most beautiful color.', 'The value of purple came from its scarcity, not the color itself; once it was easy to make, it lost its exclusive meaning.', 'Sea snails are endangered.', 'Synthetic dyes are always better.'], answer: 1 },
      ],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Build a Sentence',
      instructions: 'Read the first speaker. Arrange the fragments to make a grammatical and contextually appropriate reply. One fragment is not used.',
      sectionNote: TOEFL_BUILD_SENTENCE_SET1.interactionDisclosure,
      questions: TOEFL_BUILD_SENTENCE_SET1.items.map((item) => toBuildSentenceQuestion(item, 9)),
    },
    {
      part: 10, skill: 'writing', title: 'Writing — Write an Email',
      instructions: 'Read the situation and write an appropriate email. Official task limit: 7 minutes.',
      sectionNote: 'The standalone T17 pilot enforces the 7-minute deadline. This fixed mock preserves the draft but does not yet claim Level C composition until T23.',
      questions: [toConstructedWritingQuestion(TOEFL_WRITING_CONSTRUCTED_SET1.tasks[0], 10, 1)],
    },
    {
      part: 11, skill: 'writing', title: 'Writing — Write for an Academic Discussion',
      instructions: 'Read the discussion and contribute your own response. Official task limit: 10 minutes.',
      sectionNote: 'The standalone T17 pilot enforces the 10-minute deadline. The recommended minimum is 100 words; feedback remains WeLearn, not an ETS score.',
      questions: [toConstructedWritingQuestion(TOEFL_WRITING_CONSTRUCTED_SET1.tasks[1], 11, 2)],
    },
    {
      part: 12, skill: 'speaking', title: 'Speaking — Listen and Repeat',
      instructions: 'Listen to each sentence and repeat it aloud with the same pronunciation, rhythm, and intonation. The sentences grow longer.',
      questions: [
        { type: 'repeat', id: 't1-s-rp1', part: 12, itemNumber: 1, audioUrl: '/audio/toefl/set-1/repeat-1.mp3', targetSentence: 'The office is closed.' },
        { type: 'repeat', id: 't1-s-rp2', part: 12, itemNumber: 2, audioUrl: '/audio/toefl/set-1/repeat-2.mp3', targetSentence: 'She made a cake for her brother\'s birthday.' },
        { type: 'repeat', id: 't1-s-rp3', part: 12, itemNumber: 3, audioUrl: '/audio/toefl/set-1/repeat-3.mp3', targetSentence: 'The workers repaired the road after the heavy rain.' },
        { type: 'repeat', id: 't1-s-rp4', part: 12, itemNumber: 4, audioUrl: '/audio/toefl/set-1/repeat-4.mp3', targetSentence: 'The professor announced that the deadline had been extended by one week.' },
        { type: 'repeat', id: 't1-s-rp5', part: 12, itemNumber: 5, audioUrl: '/audio/toefl/set-1/repeat-5.mp3', targetSentence: 'Because the tickets had sold out quickly, the band agreed to perform a second concert.' },
      ],
    },
    {
      part: 13, skill: 'speaking', title: 'Speaking — Take an Interview',
      instructions: 'Answer each interview question aloud with clear, elaborated responses. You may jot notes first.',
      questions: [
        { type: 'speak', id: 't1-s-iv1', part: 13, partNumber: 1, text: 'Interviewer: To begin, tell me about your favorite way to spend a free day. What do you do, and why do you enjoy it?' },
        { type: 'speak', id: 't1-s-iv2', part: 13, partNumber: 2, text: 'Interviewer: Some people prefer to study in the morning, while others prefer to study at night. Which do you prefer, and why? Give reasons and an example.' },
        { type: 'speak', id: 't1-s-iv3', part: 13, partNumber: 3, text: 'Interviewer: Your university can spend money on either faster internet or more comfortable study spaces. Which would you recommend, and why? Explain how it would benefit students.' },
        { type: 'speak', id: 't1-s-iv4', part: 13, partNumber: 4, text: 'Interviewer: Finally, make a prediction: how might the way people learn new skills change over the next twenty years? Explain your reasoning.' },
      ],
    },
  ],
};

export default mock;
