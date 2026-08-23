import type { EpisodeSection } from '@/components/practica/EpisodeNotes';

export const CAMBRIDGE_B2_FIRST_PODCAST = {
  id: 'cambridge-b2-first-strategy-map',
  title: 'How to Pass Cambridge B2 First',
  description: 'An English strategy episode for understanding the four papers, five equally weighted scores, Cambridge English Scale and the practice decisions that turn a first diagnostic into focused preparation.',
  duration: '19:57',
  audioSrc: '/audio/cambridge-b2/strategy-map/how-to-pass-cambridge-b2-first.mp3?v=20260823',
  outcomes: [
    'distinguish B2 First, the historical FCE name and the separate C1 Advanced qualification;',
    'explain how four papers produce Reading, Use of English, Writing, Listening and Speaking scores;',
    'read the 122–190 reporting scale without confusing a Grade A with a C1 Advanced certificate;',
    'turn a timed diagnostic into targeted language work, controlled practice and a realistic simulation.',
  ],
  editorialTitle: 'Checked against current Cambridge guidance',
  editorialBody: 'Reviewed on 23 August 2026. A Grade A result remains a B2 First certificate stating demonstrated ability at CEFR C1; it is not a C1 Advanced certificate. The published cut also removes an invalid Key Word Transformation example and keeps the official two-to-five-word rule in the written notes below.',
} as const;

export const CAMBRIDGE_B2_FIRST_NOTES: EpisodeSection[] = [
  {
    heading: 'B2 First, FCE and “the First”',
    body: [
      'Cambridge B2 First is the current name of the qualification historically called First Certificate in English, or FCE. The old abbreviation remains common in job advertisements and language schools, but candidates should always verify the exact qualification and score an institution currently accepts.',
      'The exam targets independent English at CEFR B2. It can support study or employment applications, but no general explanation can guarantee admission, a job or immigration eligibility: the receiving organisation decides which exams, scores and result dates it accepts.',
    ],
  },
  {
    heading: 'The certificate does not expire; acceptance can',
    body: [
      'Cambridge does not place an expiry date on the certificate. A university, employer, professional body or immigration authority can still require evidence obtained within a particular period.',
      'Work backwards from the destination. Confirm the accepted qualification, minimum overall score, any component requirements and recency rule before paying for the exam.',
    ],
  },
  {
    heading: 'The complete 122–190 result map',
    body: [
      'A score of 160–172 is Grade C at B2; 173–179 is Grade B at B2. A score of 180–190 is Grade A: the candidate receives a B2 First certificate stating demonstrated ability at CEFR C1. That is not a C1 Advanced certificate and does not replace the broader C1 Advanced examination.',
      'A score of 140–159 produces a Cambridge English certificate stating demonstrated ability at B1. Scores from 122 to 139 appear on the Statement of Results but do not produce a grade, reported CEFR level or certificate; scores below 122 are not reported for this exam.',
    ],
  },
  {
    heading: 'Four papers produce five equal scores',
    body: [
      'The papers are Reading and Use of English, Writing, Listening and Speaking. The combined first paper produces two results, so the final report contains five equally weighted scores: Reading, Use of English, Writing, Listening and Speaking.',
      'The Reading score is based on Parts 1, 5, 6 and 7; the Use of English score is based on Parts 2, 3 and 4. Cambridge adds the five scores, divides by five and rounds to the nearest whole number. There is no separate minimum that must be passed in every paper.',
    ],
  },
  {
    heading: 'Reading and Use of English: 75 minutes, seven parts',
    body: [
      'Parts 1–4 test precise language control through multiple-choice cloze, open cloze, word formation and key word transformations. Parts 5–7 move through multiple-choice reading, gapped text and multiple matching. Across the paper, the recurring engines are collocation, grammar in context, paraphrase, cohesion and evidence.',
      'Part 1 contributes to the Reading score even though it has a strong lexical focus. Parts 2–4 form the reported Use of English score; Parts 5–7 join Part 1 in the reported Reading score.',
    ],
  },
  {
    heading: 'The two Part 4 rules that cannot bend',
    body: [
      'In Key Word Transformations, the second sentence must preserve the meaning of the first, include the supplied key word unchanged and complete the gap with two to five words. Candidates should count contractions according to their full form.',
      'A response can receive up to two marks, but partial credit is awarded only when the answer matches a valid scoring segment; writing an arbitrary half-answer does not guarantee a mark. The useful practice habit is to compare meaning, structure, key word and word count before moving on.',
    ],
  },
  {
    heading: 'Part 6 removes sentences, not paragraphs',
    body: [
      'The Gapped Text task removes sentences from a text. Candidates restore them by following cohesion and development across the whole passage, not by matching a repeated word beside one gap.',
      'Read both sides of every gap. Pronouns, demonstratives, contrast markers, repeated concepts and the function of the surrounding paragraph reveal whether a sentence genuinely connects the argument.',
    ],
  },
  {
    heading: 'Writing: two tasks in 80 minutes',
    body: [
      'Part 1 is a compulsory essay based on two supplied ideas plus one relevant idea of the candidate’s own. In regular B2 First, Part 2 can include an article, email or letter, review or report. Each response should normally contain 140–190 words.',
      'Writing is assessed through Content, Communicative Achievement, Organisation and Language. Connectors can strengthen Organisation when they express a real relationship between ideas; inserting formal linkers mechanically does not create a higher score.',
    ],
  },
  {
    heading: 'Listening: use the second hearing to repair',
    body: [
      'Listening lasts about 40 minutes, contains four parts and 30 questions, and every recording is played twice. The task set moves from short extracts to sentence completion, multiple matching and a longer conversation or interview.',
      'Use the first hearing to establish purpose, structure, attitude and provisional answers. Use the second to repair uncertainty, test distractors and locate exact evidence — not merely to confirm the first answer you happened to choose.',
    ],
  },
  {
    heading: 'Speaking rewards interaction, not domination',
    body: [
      'Speaking takes about 14 minutes for a pair. It moves through an interview, an individual long turn comparing photographs, a collaborative task and a broader discussion. It is normally face to face with another candidate and two examiners; one examiner may participate remotely.',
      'The criteria are Grammar and Vocabulary, Discourse Management, Pronunciation, Interactive Communication and Global Achievement. One grammar slip does not automatically fail the paper, and a British accent is not required. Candidates need intelligible speech, developed answers and visible collaboration.',
    ],
  },
  {
    heading: 'Digital and paper test the same skills',
    body: [
      'The two delivery modes follow the same format, assess the same knowledge and lead to the same qualification. They do not give every candidate identical questions. Choose after realistic practice: typing speed, screen reading, navigation and confidence transferring paper answers all affect execution.',
    ],
  },
  {
    heading: 'The preparation loop',
    body: [
      'Begin with one complete timed diagnostic, then classify the cause of every mistake instead of recording only right or wrong. Useful categories include collocation, grammar, paraphrase, distractor, cohesion, listening detail, writing criterion, interaction and time management.',
      'Repair the smallest repeated weakness before taking another full test. Targeted B2 Use of English work can rebuild language control; connector practice can support genuine cohesion; partner practice is indispensable for interactive speaking. Return to timed work only to test whether those repairs transfer.',
    ],
    bullets: [
      'Week 1: map the format, verify the required score and take the baseline diagnostic.',
      'Week 2: train the weakest Reading and Use of English task families, then retest them.',
      'Week 3: write, listen and speak under controlled conditions; review with the official criteria.',
      'Week 4: complete a realistic simulation, classify the remaining errors and compare a fresh retest with the baseline.',
    ],
  },
];
