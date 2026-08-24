import type { EpisodeSection } from '@/components/practica/EpisodeNotes';

export const DIGITAL_SAT_STRATEGY_MAP_PODCAST = {
  id: 'digital-sat-strategy-map',
  title: 'Your Digital SAT Strategy Map',
  description: 'An English orientation episode for understanding the adaptive test, Reading and Writing and Math domains, the 400–1600 score scale, Bluebook and the study decisions that turn a diagnostic into focused preparation.',
  duration: '22:30',
  audioSrc: '/audio/sat/strategy-map/strategic-map-for-the-digital-sat.mp3?v=20260823',
  outcomes: [
    'map the 98 questions, four timed modules and 10-minute break before test day;',
    'explain what Module 1 changes — and does not change — about the second adaptive module;',
    'read a 400–1600 result through section scores, score ranges, percentiles and personal targets;',
    'turn one Bluebook diagnostic into domain-level practice, an error log and a four-week cycle.',
  ],
  editorialTitle: 'Checked against current College Board guidance',
  editorialBody: 'Reviewed on 23 August 2026. This published cut removes an unsupported CEFR B2 equivalence, an overconfident device-recovery claim and the incorrect statement that every second-module route allows the full 200–800 section-score range. The written guide below adds the unscored pretest questions and the complete study cycle.',
} as const;

export const DIGITAL_SAT_STRATEGY_MAP_NOTES: EpisodeSection[] = [
  {
    heading: 'The SAT is not an English proficiency test',
    body: [
      'The SAT is a college-admissions assessment used primarily by institutions in the United States. It measures Reading and Writing and Math knowledge and reasoning under standardised conditions; it is not an IQ test, and a result does not measure a student’s personal worth.',
      'Universities set their own testing policies. A useful plan begins by checking whether each destination currently requires, recommends or considers the SAT and which score range is competitive. No single score guarantees admission.',
    ],
  },
  {
    heading: '98 questions across four timed modules',
    body: [
      'Reading and Writing contains 54 questions in 64 minutes: two modules of 27 questions and 32 minutes. Math contains 44 questions in 70 minutes: two modules of 22 questions and 35 minutes. A 10-minute break separates the sections.',
      'The standard active testing time is 2 hours and 14 minutes, excluding the break and administrative activity. Within the current module, students can move, change answers and mark questions for review. Once a module ends, they cannot return to it.',
    ],
  },
  {
    heading: 'What adaptive really means',
    body: [
      'The first module of each section contains a broad mixture of easy, medium and hard questions. Performance across that module determines whether the second module contains, on average, a higher- or lower-difficulty mixture. Reading and Writing and Math adapt independently.',
      'One mistake does not decide the route, and both modules contribute to the section score. College Board says a range of scores is possible through either route and that either route can meet the official benchmarks; it does not say the full 200–800 range is available through both. Trying to identify the route during the test wastes time that should go into the question on screen.',
    ],
  },
  {
    heading: 'Four questions per test do not count — but look normal',
    body: [
      'Each Reading and Writing module contains 25 scored operational questions and two unscored pretest questions. Each Math module contains 20 operational questions and two unscored pretest questions. That produces four unscored questions in each section.',
      'Pretest items help College Board evaluate questions for future exams. Candidates cannot identify them, so the rational strategy is to treat every question as scored and make the best evidence-based decision possible.',
    ],
  },
  {
    heading: 'Reading and Writing is four ways of thinking',
    body: [
      'Information and Ideas, approximately 26%, covers central ideas, inferences and textual or quantitative evidence. Craft and Structure, approximately 28%, covers words in context, text structure and purpose, and connections between texts.',
      'Standard English Conventions, approximately 26%, tests boundaries and form, structure and sense. Expression of Ideas, approximately 20%, tests transitions and rhetorical synthesis. The percentages are approximate, and every module includes questions from all four domains.',
    ],
  },
  {
    heading: 'Evidence before intuition',
    body: [
      'Short passages do not make the section superficial. The recurring decision is whether an answer performs the exact job in the question: support a conclusion, express an inference, define a word in context, explain a function, repair a sentence or achieve a rhetorical goal.',
      'A distractor can be true but irrelevant, too broad, too strong or unsupported. Before selecting it, name the task and locate the evidence. For grammar, use the sentence’s structure and the conventions of formal written Standard English rather than relying only on what sounds familiar.',
    ],
  },
  {
    heading: 'Math combines modelling, execution and interpretation',
    body: [
      'The four domains are Algebra, Advanced Math, Problem-Solving and Data Analysis, and Geometry and Trigonometry. About three quarters of Math questions are multiple choice; the remainder are student-produced responses in which candidates enter their own answer.',
      'Bluebook provides an embedded Desmos graphing calculator throughout Math, and an approved handheld calculator may also be used. A calculator can graph, compute and test relationships, but the student must still translate the problem, choose a model and answer the quantity actually requested.',
    ],
  },
  {
    heading: 'Read 400–1600 as evidence, not a label',
    body: [
      'The total score ranges from 400 to 1600. Reading and Writing and Math each range from 200 to 800, and the two section scores add to the total. Adaptive scoring considers the characteristics of the questions and the response pattern, so it is not a simple one-point-per-answer conversion.',
      'The report also includes percentiles, an estimated score range and performance information by domain. College Board’s current readiness benchmarks are 480 for Reading and Writing and 530 for Math, but a personal target should also reflect the current policies and reported ranges of the universities being considered.',
    ],
  },
  {
    heading: 'Bluebook is part of the skill set',
    body: [
      'Install Bluebook early, confirm the device requirements and complete exam setup when College Board makes it available. Learn the timer, annotation, answer eliminator, Mark for Review, Math reference sheet and calculator before the real test.',
      'Official full-length Bluebook practice tests reproduce the adaptive experience. Downloadable paper tests can support practice but are nonadaptive. If a device problem occurs during an official administration, follow the proctor’s instructions; resuming testing can require staff approval.',
    ],
  },
  {
    heading: 'A diagnostic becomes useful only after classification',
    body: [
      'Begin with one official, timed Bluebook baseline in realistic conditions. Then classify every uncertain or incorrect response by section, domain, skill and cause: content gap, reasoning error, task misread, timing problem, careless execution, unsupported assumption or tool problem.',
      'For each important mistake, record why the chosen answer looked attractive, what evidence or rule proves the correct answer and what should change next time. Several errors caused by the same punctuation rule are one trainable pattern, not several unrelated failures.',
    ],
  },
  {
    heading: 'A four-week preparation cycle',
    body: [
      'The sequence is Understand → Diagnose → Practise → Review → Retest. Four weeks is a planning model, not a guaranteed transformation; students with more time can repeat or expand each stage.',
    ],
    bullets: [
      'Week 1: learn the format, explore Bluebook, take the baseline and set a target from current university evidence.',
      'Week 2: repair the weakest Reading and Writing and Math domains with targeted, initially untimed practice and an error log.',
      'Week 3: add timed sets, practise skip-mark-return decisions and retest the recurring error patterns.',
      'Week 4: take another official adaptive test, compare it with the baseline and build the next cycle from the remaining evidence.',
    ],
  },
  {
    heading: 'The next seven actions',
    body: [
      'Learn the official structure. Download Bluebook. Complete a baseline. Classify mistakes by domain, skill and cause. Study the weakest skills. Review every error. Retest and adjust the plan.',
      'Improvement does not come from trying to outsmart the adaptive system. It comes from recognising the task, applying the right skill, making an evidence-based decision and learning systematically from each result.',
    ],
  },
];
