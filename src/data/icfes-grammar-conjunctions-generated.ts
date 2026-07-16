import type {
  IcfesGrammarConjunctionQuestion,
  IcfesGrammarConjunctionSkill,
} from './icfes-grammar-conjunctions';

type Level = 1 | 2 | 3 | 4 | 5;
type DraftQuestion = Omit<IcfesGrammarConjunctionQuestion, 'id' | 'answer'> & {
  options: [string, string, string, string];
};

type Row = readonly [
  before: string,
  correct: string,
  after: string,
  distractors: readonly [string, string, string],
  hint: string,
  followUpDrill: string,
  explanation?: string,
];

interface RowConfig {
  skill: IcfesGrammarConjunctionSkill;
  level: Level;
  focus: string;
  question: string;
  miniRule: string;
  strategy: string;
  teacherPrompt: string;
  explanation: (correct: string, before: string, after: string) => string;
}

const ID_PREFIX: Record<IcfesGrammarConjunctionSkill, string> = {
  subjectVerbAgreement: 'AGR',
  verbTense: 'TEN',
  articlesDeterminers: 'ART',
  prepositions: 'PRE',
  pronounsQuantifiers: 'PRQ',
  comparativesModals: 'CMP',
  conjunctions: 'CON',
  clozeCohesion: 'CLO',
};

const START_INDEX: Record<IcfesGrammarConjunctionSkill, number> = {
  subjectVerbAgreement: 7,
  verbTense: 9,
  articlesDeterminers: 7,
  prepositions: 7,
  pronounsQuantifiers: 7,
  comparativesModals: 7,
  conjunctions: 11,
  clozeCohesion: 9,
};

const TARGET_COUNT: Record<IcfesGrammarConjunctionSkill, number> = {
  subjectVerbAgreement: 54,
  verbTense: 72,
  articlesDeterminers: 54,
  prepositions: 54,
  pronounsQuantifiers: 54,
  comparativesModals: 54,
  conjunctions: 90,
  clozeCohesion: 72,
};

function appendRows(target: DraftQuestion[], config: RowConfig, rows: readonly Row[]) {
  rows.forEach(([before, correct, after, distractors, hint, followUpDrill, explanation]) => {
    target.push({
      skill: config.skill,
      level: config.level,
      focus: config.focus,
      before,
      target: '___',
      after,
      question: config.question,
      options: [correct, distractors[0], distractors[1], distractors[2]],
      hint,
      explanation: explanation ?? config.explanation(correct, before, after),
      miniRule: config.miniRule,
      strategy: config.strategy,
      teacherPrompt: config.teacherPrompt,
      followUpDrill,
    });
  });
}

function finalize(skill: IcfesGrammarConjunctionSkill, drafts: DraftQuestion[]) {
  const target = TARGET_COUNT[skill];
  if (drafts.length < target) {
    throw new Error(`Not enough generated ${skill} questions: ${drafts.length}/${target}`);
  }

  return drafts.slice(0, target).map((draft, index) => ({
    id: `GC-${ID_PREFIX[skill]}-${String(START_INDEX[skill] + index).padStart(2, '0')}`,
    answer: 0,
    ...draft,
  }));
}

function buildSubjectVerbAgreementQuestions() {
  const questions: DraftQuestion[] = [];

  appendRows(
    questions,
    {
      skill: 'subjectVerbAgreement',
      level: 1,
      focus: 'present simple third person',
      question: 'Choose the option that completes the sentence.',
      miniRule: 'In present simple, he, she, it and singular nouns usually need -s or -es.',
      strategy: 'Find the subject before choosing the verb form.',
      teacherPrompt: 'Ask the student to replace the subject with he, she or it.',
      explanation: (correct) => `${correct} agrees with a singular subject in present simple.`,
    },
    [
      ['The app ', 'tracks', ' student progress every week.', ['track', 'tracking', 'tracked'], 'The app is one thing.', 'The app ___ each score. Students choose tracks.'],
      ['A careful reader ', 'checks', ' the sentence before answering.', ['check', 'checking', 'checked'], 'A careful reader is singular.', 'A careful reader ___ the context. Students choose checks.'],
      ['My cousin ', 'studies', ' English on Saturday mornings.', ['study', 'studying', 'studied'], 'My cousin is one person.', 'My cousin ___ vocabulary. Students choose studies.'],
      ['The platform ', 'gives', ' feedback after a mistake.', ['give', 'giving', 'gave'], 'The platform is singular.', 'The platform ___ hints. Students choose gives.'],
      ['This strategy ', 'helps', ' students avoid fast guesses.', ['help', 'helping', 'helped'], 'This strategy is singular.', 'This strategy ___ with grammar. Students choose helps.'],
      ['The library ', 'opens', ' early during exam week.', ['open', 'opening', 'opened'], 'The library is singular.', 'The library ___ at seven. Students choose opens.'],
      ['One student ', 'writes', ' the rule in her notebook.', ['write', 'writing', 'wrote'], 'One student means singular.', 'One student ___ the answer. Students choose writes.'],
      ['The grammar exercise ', 'targets', ' common ICFES errors.', ['target', 'targeting', 'targeted'], 'The exercise is singular.', 'The exercise ___ connectors. Students choose targets.'],
      ['Nobody in the group ', 'knows', ' the answer yet.', ['know', 'knowing', 'known'], 'Nobody is treated as singular.', 'Nobody ___ the rule. Students choose knows.'],
      ['Everybody ', 'needs', ' a clear reason for the answer.', ['need', 'needing', 'needed'], 'Everybody is singular.', 'Everybody ___ practice. Students choose needs.'],
      ['The course ', 'starts', ' with a diagnostic quiz.', ['start', 'starting', 'started'], 'The course is singular.', 'The course ___ today. Students choose starts.'],
      ['A strong explanation ', 'shows', ' why the option works.', ['show', 'showing', 'showed'], 'Explanation is singular.', 'The explanation ___ the rule. Students choose shows.'],
    ]
  );

  appendRows(
    questions,
    {
      skill: 'subjectVerbAgreement',
      level: 1,
      focus: 'plural subject',
      question: 'Choose the option that completes the sentence.',
      miniRule: 'Plural subjects use the base verb in present simple.',
      strategy: 'Replace the subject with they to test the verb.',
      teacherPrompt: 'Ask whether the subject means one person or more than one.',
      explanation: (correct) => `${correct} is the base verb form used with a plural subject.`,
    },
    [
      ['The students ', 'compare', ' the four options carefully.', ['compares', 'comparing', 'compared'], 'Students means more than one.', 'The students ___ answers. Students choose compare.'],
      ['My classmates ', 'practice', ' grammar after school.', ['practices', 'practicing', 'practiced'], 'Classmates is plural.', 'My classmates ___ together. Students choose practice.'],
      ['The questions ', 'cover', ' several grammar patterns.', ['covers', 'covering', 'covered'], 'Questions is plural.', 'The questions ___ connectors. Students choose cover.'],
      ['Teachers and students ', 'use', ' the report in class.', ['uses', 'using', 'used'], 'Two groups make a plural subject.', 'Teachers and students ___ examples. Students choose use.'],
      ['The explanations ', 'make', ' the answers clearer.', ['makes', 'making', 'made'], 'Explanations is plural.', 'The explanations ___ sense. Students choose make.'],
      ['Many learners ', 'confuse', ' much and many at first.', ['confuses', 'confusing', 'confused'], 'Many learners is plural.', 'Many learners ___ articles. Students choose confuse.'],
      ['The options ', 'seem', ' similar without context.', ['seems', 'seeming', 'seemed'], 'Options is plural.', 'The options ___ easy. Students choose seem.'],
      ['Several schools ', 'offer', ' extra ICFES practice.', ['offers', 'offering', 'offered'], 'Several schools is plural.', 'Several schools ___ classes. Students choose offer.'],
      ['Ana and Luis ', 'review', ' their mistakes together.', ['reviews', 'reviewing', 'reviewed'], 'Ana and Luis are two people.', 'Ana and Luis ___ notes. Students choose review.'],
      ['The results ', 'show', ' the weakest skill.', ['shows', 'showing', 'showed'], 'Results is plural.', 'The results ___ progress. Students choose show.'],
    ]
  );

  appendRows(
    questions,
    {
      skill: 'subjectVerbAgreement',
      level: 2,
      focus: 'head noun agreement',
      question: 'Choose the option that completes the sentence.',
      miniRule: 'The verb agrees with the head noun, not with the nearest noun in a phrase.',
      strategy: 'Cross out the prepositional phrase and reread the subject.',
      teacherPrompt: 'Ask the student to identify the main noun before the phrase with of.',
      explanation: (correct) => `${correct} agrees with the main noun of the subject.`,
    },
    [
      ['The box of markers ', 'is', ' on the teacher desk.', ['are', 'be', 'were'], 'The main noun is box.', 'The box of books ___ heavy. Students choose is.'],
      ['The pages of the booklet ', 'are', ' easy to read.', ['is', 'be', 'was'], 'The main noun is pages.', 'The pages of the guide ___ useful. Students choose are.'],
      ['The list of connectors ', 'is', ' on the board.', ['are', 'be', 'were'], 'The main noun is list.', 'The list of verbs ___ short. Students choose is.'],
      ['The groups of students ', 'are', ' ready to begin.', ['is', 'be', 'was'], 'The main noun is groups.', 'The groups of readers ___ active. Students choose are.'],
      ['The answer to both questions ', 'is', ' the same.', ['are', 'be', 'were'], 'The main noun is answer.', 'The answer to the examples ___ clear. Students choose is.'],
      ['The examples in the lesson ', 'are', ' connected to the test.', ['is', 'be', 'was'], 'The main noun is examples.', 'The examples in the chart ___ helpful. Students choose are.'],
      ['The reason for the mistakes ', 'is', ' usually speed.', ['are', 'be', 'were'], 'The main noun is reason.', 'The reason for the errors ___ simple. Students choose is.'],
      ['The notes from my classmates ', 'are', ' in my folder.', ['is', 'be', 'was'], 'The main noun is notes.', 'The notes from class ___ clear. Students choose are.'],
      ['The title of the articles ', 'is', ' confusing.', ['are', 'be', 'were'], 'The main noun is title.', 'The title of the texts ___ long. Students choose is.'],
      ['The keys to the exercises ', 'are', ' at the end.', ['is', 'be', 'was'], 'The main noun is keys.', 'The keys to the tasks ___ here. Students choose are.'],
    ]
  );

  appendRows(
    questions,
    {
      skill: 'subjectVerbAgreement',
      level: 3,
      focus: 'indefinite subjects',
      question: 'Choose the option that completes the sentence.',
      miniRule: 'Each, every, everybody, nobody and one of usually take singular verbs.',
      strategy: 'If the subject selects one item at a time, test a singular verb.',
      teacherPrompt: 'Ask whether the sentence talks about the group together or each member individually.',
      explanation: (correct) => `${correct} fits because the subject is treated as singular.`,
    },
    [
      ['Each of the examples ', 'has', ' a short explanation.', ['have', 'having', 'are'], 'Each focuses on one example at a time.', 'Each of the questions ___ a clue. Students choose has.'],
      ['Every answer ', 'needs', ' evidence from the sentence.', ['need', 'needing', 'needed'], 'Every answer is singular.', 'Every option ___ a reason. Students choose needs.'],
      ['One of the students ', 'asks', ' for another example.', ['ask', 'asking', 'asked'], 'One of means one student.', 'One of the teachers ___ a question. Students choose asks.'],
      ['Neither of the options ', 'matches', ' the context.', ['match', 'matching', 'matched'], 'Neither means not one of two.', 'Neither answer ___ the text. Students choose matches.'],
      ['Either of the routes ', 'takes', ' about twenty minutes.', ['take', 'taking', 'taken'], 'Either refers to one route at a time.', 'Either option ___ practice. Students choose takes.'],
      ['Everyone in the classroom ', 'wants', ' more examples.', ['want', 'wanting', 'wanted'], 'Everyone is singular.', 'Everyone ___ feedback. Students choose wants.'],
      ['Someone from the group ', 'explains', ' the rule aloud.', ['explain', 'explaining', 'explained'], 'Someone is singular.', 'Someone ___ the answer. Students choose explains.'],
      ['No one in the team ', 'forgets', ' the strategy now.', ['forget', 'forgetting', 'forgot'], 'No one is singular.', 'No one ___ the clue. Students choose forgets.'],
      ['Each participant ', 'receives', ' a different sentence.', ['receive', 'receiving', 'received'], 'Each participant is singular.', 'Each participant ___ a card. Students choose receives.'],
      ['Every practice session ', 'includes', ' a review of errors.', ['include', 'including', 'included'], 'Every session is singular.', 'Every session ___ feedback. Students choose includes.'],
      ['One of the rules ', 'appears', ' twice in the quiz.', ['appear', 'appearing', 'appeared'], 'One of the rules means one rule.', 'One of the clues ___ again. Students choose appears.'],
      ['Neither student ', 'understands', ' the connector yet.', ['understand', 'understanding', 'understood'], 'Neither student is singular.', 'Neither student ___ the rule. Students choose understands.'],
    ]
  );

  appendRows(
    questions,
    {
      skill: 'subjectVerbAgreement',
      level: 4,
      focus: 'uncountable and there is/are',
      question: 'Choose the option that completes the sentence.',
      miniRule: 'Uncountable nouns often take singular verbs; there is/are agrees with the noun after it.',
      strategy: 'Check if the noun can be counted in English, not in Spanish.',
      teacherPrompt: 'Ask students to list uncountable school words such as information, advice and homework.',
      explanation: (correct) => `${correct} matches the number of the noun that controls the verb.`,
    },
    [
      ['The information in the chart ', 'is', ' important.', ['are', 'be', 'were'], 'Information is uncountable.', 'The information ___ useful. Students choose is.'],
      ['The homework for tomorrow ', 'is', ' not difficult.', ['are', 'be', 'were'], 'Homework is uncountable.', 'The homework ___ short. Students choose is.'],
      ['The advice from the teacher ', 'helps', ' before the test.', ['help', 'helping', 'helped'], 'Advice is uncountable and singular.', 'The advice ___ students. Students choose helps.'],
      ['There ', 'are', ' four connectors in the paragraph.', ['is', 'be', 'was'], 'Connectors is plural.', 'There ___ many answers. Students choose are.'],
      ['There ', 'is', ' one clue before the blank.', ['are', 'be', 'were'], 'One clue is singular.', 'There ___ one reason. Students choose is.'],
      ['The equipment in the lab ', 'is', ' new.', ['are', 'be', 'were'], 'Equipment is uncountable.', 'The equipment ___ expensive. Students choose is.'],
      ['The news about the exam ', 'was', ' posted yesterday.', ['were', 'be', 'are'], 'News is singular in English.', 'The news ___ surprising. Students choose was.'],
      ['There ', 'are', ' several mistakes to review.', ['is', 'be', 'was'], 'Several mistakes is plural.', 'There ___ three examples. Students choose are.'],
      ['The vocabulary in these texts ', 'comes', ' from daily situations.', ['come', 'coming', 'came'], 'Vocabulary is singular here.', 'The vocabulary ___ from school topics. Students choose comes.'],
      ['The furniture in the classroom ', 'looks', ' old.', ['look', 'looking', 'looked'], 'Furniture is uncountable.', 'The furniture ___ comfortable. Students choose looks.'],
    ]
  );

  return finalize('subjectVerbAgreement', questions);
}

function buildVerbTenseQuestions() {
  const questions: DraftQuestion[] = [];

  appendRows(questions, {
    skill: 'verbTense',
    level: 1,
    focus: 'past simple markers',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Finished past time expressions usually need past simple.',
    strategy: 'Circle the time marker before choosing the verb.',
    teacherPrompt: 'Ask which word shows that the action is finished.',
    explanation: (correct) => `${correct} is past simple and matches the finished time expression.`,
  }, [
    ['The group ', 'finished', ' the poster yesterday.', ['finish', 'finishes', 'finishing'], 'Yesterday points to the past.', 'Yesterday we ___ early. Students choose finished.'],
    ['Camila ', 'visited', ' the library last Friday.', ['visits', 'visit', 'visiting'], 'Last Friday is finished time.', 'Last week she ___ the museum. Students choose visited.'],
    ['They ', 'answered', ' all the questions two hours ago.', ['answer', 'answers', 'answering'], 'Ago points to a finished past action.', 'Two days ago, they ___ the task. Students choose answered.'],
    ['The teacher ', 'explained', ' the rule in the previous class.', ['explains', 'explain', 'explaining'], 'Previous class points to the past.', 'In the last class, he ___ the rule. Students choose explained.'],
    ['We ', 'reviewed', ' connectors before the quiz.', ['review', 'reviews', 'reviewing'], 'The action happened before the quiz.', 'Before the exam, we ___ notes. Students choose reviewed.'],
    ['My brother ', 'studied', ' at night during vacation.', ['studies', 'study', 'studying'], 'The context describes a past period.', 'During vacation, he ___ daily. Students choose studied.'],
    ['The school ', 'organized', ' a practice test in March.', ['organizes', 'organize', 'organizing'], 'In March is a finished time here.', 'Last month, the school ___ a test. Students choose organized.'],
    ['Ana ', 'chose', ' the correct option after rereading.', ['chooses', 'choose', 'choosing'], 'The action is complete in the past.', 'Yesterday Ana ___ option C. Students choose chose.'],
  ]);

  appendRows(questions, {
    skill: 'verbTense',
    level: 2,
    focus: 'present perfect',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Present perfect uses has/have + past participle.',
    strategy: 'When you see has or have before the blank, test the participle form.',
    teacherPrompt: 'Ask whether the action connects past experience with the present.',
    explanation: (correct) => `${correct} is the past participle needed after has or have.`,
  }, [
    ['Laura has ', 'practiced', ' English since January.', ['practice', 'practices', 'practicing'], 'Has needs a past participle.', 'She has ___ for months. Students choose practiced.'],
    ['The students have ', 'completed', ' three grammar sessions.', ['complete', 'completes', 'completing'], 'Have needs a past participle.', 'They have ___ the lesson. Students choose completed.'],
    ['Our teacher has ', 'given', ' us extra examples.', ['give', 'gives', 'giving'], 'Given is the participle of give.', 'She has ___ feedback. Students choose given.'],
    ['I have ', 'seen', ' this connector before.', ['see', 'saw', 'seeing'], 'Seen is the participle of see.', 'I have ___ that word. Students choose seen.'],
    ['The class has ', 'read', ' two short texts today.', ['reads', 'reading', 'reader'], 'Read can be the past participle.', 'The class has ___ the paragraph. Students choose read.'],
    ['They have ', 'made', ' fewer mistakes this week.', ['make', 'makes', 'making'], 'Made is the participle of make.', 'They have ___ progress. Students choose made.'],
    ['Daniel has ', 'written', ' a list of confusing words.', ['write', 'wrote', 'writing'], 'Written is the participle of write.', 'Daniel has ___ notes. Students choose written.'],
    ['We have ', 'learned', ' several rules for cloze questions.', ['learn', 'learns', 'learning'], 'Have learned is present perfect.', 'We have ___ a strategy. Students choose learned.'],
  ]);

  appendRows(questions, {
    skill: 'verbTense',
    level: 2,
    focus: 'past continuous',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Past continuous uses was/were + -ing for an action in progress in the past.',
    strategy: 'Find the shorter past action that interrupts the background action.',
    teacherPrompt: 'Ask students to identify which action was already happening.',
    explanation: (correct) => `${correct} shows an action in progress when another past action happened.`,
  }, [
    ['When the bell rang, we ', 'were reading', ' the last paragraph.', ['read', 'have read', 'reads'], 'The reading was in progress.', 'When she arrived, we ___ the text. Students choose were reading.'],
    ['While I ', 'was studying', ' connectors, my phone rang.', ['study', 'studied', 'have studied'], 'While introduces an action in progress.', 'While I ___, the teacher called. Students choose was studying.'],
    ['The students ', 'were comparing', ' options when time ended.', ['compare', 'compared', 'have compared'], 'The comparison was happening then.', 'They ___ answers when class ended. Students choose were comparing.'],
    ['Ana ', 'was writing', ' her explanation when the teacher asked.', ['writes', 'wrote', 'has written'], 'Writing was in progress.', 'Ana ___ notes when I arrived. Students choose was writing.'],
    ['We ', 'were checking', ' the context when we found the clue.', ['check', 'checked', 'have checked'], 'Checking was the background action.', 'We ___ grammar when the bell rang. Students choose were checking.'],
    ['The group ', 'was discussing', ' the answer when I joined.', ['discuss', 'discussed', 'has discussed'], 'The group is singular here.', 'The group ___ the rule. Students choose was discussing.'],
    ['Carlos ', 'was looking', ' for the subject when he noticed the verb.', ['looks', 'looked', 'has looked'], 'Looking was in progress.', 'Carlos ___ for clues. Students choose was looking.'],
    ['They ', 'were listening', ' to the explanation when the internet failed.', ['listen', 'listened', 'have listened'], 'The listening was interrupted.', 'They ___ carefully. Students choose were listening.'],
  ]);

  appendRows(questions, {
    skill: 'verbTense',
    level: 3,
    focus: 'past perfect',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Past perfect uses had + past participle for the earlier past action.',
    strategy: 'When two past actions appear, decide which happened first.',
    teacherPrompt: 'Draw a simple timeline with the earlier event on the left.',
    explanation: (correct) => `${correct} marks the action that happened before another past moment.`,
  }, [
    ['By the time class started, they ', 'had finished', ' the warm-up.', ['finish', 'finished', 'have finished'], 'The warm-up happened first.', 'By noon, they ___ the task. Students choose had finished.'],
    ['When I opened the document, Ana ', 'had corrected', ' the mistakes.', ['corrects', 'corrected', 'has corrected'], 'The correction happened before opening.', 'When I arrived, she ___ the answer. Students choose had corrected.'],
    ['Before the quiz began, we ', 'had reviewed', ' all connectors.', ['review', 'reviewed', 'have reviewed'], 'Review happened before the quiz.', 'Before the test, we ___ notes. Students choose had reviewed.'],
    ['The teacher noticed that Luis ', 'had chosen', ' the wrong tense.', ['chooses', 'chose', 'has chosen'], 'Choosing happened before the teacher noticed.', 'She saw that he ___ option A. Students choose had chosen.'],
    ['By Friday, the group ', 'had practiced', ' every grammar topic.', ['practice', 'practiced', 'has practiced'], 'Practice was complete by Friday.', 'By Monday, we ___ cloze. Students choose had practiced.'],
    ['When the results arrived, I ', 'had already checked', ' my answers.', ['already check', 'already checked', 'have already checked'], 'Already supports past perfect here.', 'When she called, I ___ the text. Students choose had already checked.'],
    ['Before she explained the rule, students ', 'had made', ' the same error.', ['make', 'made', 'have made'], 'The error came before the explanation.', 'Before feedback, they ___ mistakes. Students choose had made.'],
    ['The session was easier because we ', 'had learned', ' the pattern earlier.', ['learn', 'learned', 'have learned'], 'Learning happened before the session.', 'The task was clear because we ___ the rule. Students choose had learned.'],
  ]);

  appendRows(questions, {
    skill: 'verbTense',
    level: 2,
    focus: 'future plans',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Be going to + base verb expresses a planned future action.',
    strategy: 'Use the time expression to decide whether the action is future.',
    teacherPrompt: 'Ask whether the plan already exists.',
    explanation: (correct) => `${correct} expresses a future plan.`,
  }, [
    ['Tomorrow, our class ', 'is going to review', ' connectors.', ['reviewed', 'has reviewed', 'review'], 'Tomorrow points to the future.', 'Tomorrow, we ___ grammar. Students choose are going to review.'],
    ['Next week, the school ', 'is going to offer', ' an ICFES workshop.', ['offered', 'offers', 'has offered'], 'Next week points to a plan.', 'Next week, the school ___ a quiz. Students choose is going to offer.'],
    ['This afternoon, Ana ', 'is going to practice', ' cloze questions.', ['practiced', 'practices', 'has practiced'], 'This afternoon is future in this context.', 'Tonight, Ana ___ verbs. Students choose is going to practice.'],
    ['On Saturday, we ', 'are going to take', ' a longer session.', ['took', 'take', 'have taken'], 'On Saturday points to a future plan.', 'On Sunday, we ___ a test. Students choose are going to take.'],
    ['After lunch, the teacher ', 'is going to explain', ' passive voice.', ['explained', 'explains', 'has explained'], 'After lunch points to a plan.', 'Later, she ___ the rule. Students choose is going to explain.'],
    ['In the next class, students ', 'are going to compare', ' their answers.', ['compared', 'compare', 'have compared'], 'In the next class is future.', 'Tomorrow, they ___ options. Students choose are going to compare.'],
    ['Tonight, Carlos ', 'is going to study', ' irregular verbs.', ['studied', 'studies', 'has studied'], 'Tonight points to a plan.', 'Tonight, Carlos ___ tenses. Students choose is going to study.'],
    ['Before the exam, we ', 'are going to repeat', ' the weakest skill.', ['repeated', 'repeat', 'have repeated'], 'Before the exam indicates a future plan.', 'Before class, we ___ errors. Students choose are going to repeat.'],
  ]);

  appendRows(questions, {
    skill: 'verbTense',
    level: 3,
    focus: 'first conditional',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use if + present simple, will + base verb for real future conditions.',
    strategy: 'Do not put will in the if-clause in this pattern.',
    teacherPrompt: 'Ask students to divide condition and result.',
    explanation: (correct) => `${correct} fits the result clause of a real future condition.`,
  }, [
    ['If you read the context first, you ', 'will avoid', ' many mistakes.', ['avoid', 'avoided', 'would avoided'], 'The result is future and possible.', 'If we practice, we ___ improve. Students choose will.'],
    ['If Ana reviews tonight, she ', 'will feel', ' more confident.', ['felt', 'feels', 'would felt'], 'This is a real future result.', 'If Ana studies, she ___ improve. Students choose will.'],
    ['If the class starts early, we ', 'will have', ' time for feedback.', ['had', 'have', 'would had'], 'The result depends on a future condition.', 'If class starts, we ___ practice. Students choose will have.'],
    ['If students compare options, they ', 'will notice', ' the connector.', ['noticed', 'notice', 'would noticed'], 'The result is likely in the future.', 'If they compare, they ___ see clues. Students choose will notice.'],
    ['If you choose too fast, you ', 'will miss', ' the subject.', ['missed', 'misses', 'would missed'], 'This warns about a future result.', 'If you rush, you ___ miss clues. Students choose will.'],
    ['If the teacher gives examples, learners ', 'will understand', ' the pattern.', ['understood', 'understand', 'would understood'], 'The result is future.', 'If she explains, they ___ understand. Students choose will.'],
    ['If we finish early, we ', 'will repeat', ' the difficult questions.', ['repeated', 'repeat', 'would repeated'], 'Finish is the condition; repeat is the result.', 'If we finish, we ___ review. Students choose will.'],
    ['If the app detects an error, it ', 'will add', ' a reinforcement item.', ['added', 'adds', 'would added'], 'The system result is future.', 'If it detects an error, it ___ help. Students choose will add.'],
  ]);

  appendRows(questions, {
    skill: 'verbTense',
    level: 3,
    focus: 'passive voice',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Passive voice uses be + past participle.',
    strategy: 'If the subject receives the action, test a passive form.',
    teacherPrompt: 'Ask whether the subject does the action or receives it.',
    explanation: (correct) => `${correct} is passive voice and shows that the subject receives the action.`,
  }, [
    ['The answers ', 'were checked', ' by the teacher.', ['checked', 'check', 'are checking'], 'The answers receive the action.', 'The tests ___ by the teacher. Students choose were checked.'],
    ['The guide ', 'was written', ' for Saber 11 students.', ['wrote', 'writes', 'is writing'], 'The guide received the writing.', 'The report ___ last week. Students choose was written.'],
    ['The results ', 'were published', ' on the platform.', ['published', 'publish', 'are publishing'], 'The results receive the action.', 'The scores ___ online. Students choose were published.'],
    ['The exercise ', 'is designed', ' to detect grammar errors.', ['designs', 'designed', 'is designing'], 'The exercise receives the design.', 'The activity ___ for practice. Students choose is designed.'],
    ['The questions ', 'are organized', ' by skill.', ['organize', 'organized', 'are organizing'], 'The questions receive the organization.', 'The examples ___ by level. Students choose are organized.'],
    ['The paragraph ', 'was taken', ' from a school context.', ['took', 'takes', 'is taking'], 'The paragraph receives the action.', 'The text ___ from a lesson. Students choose was taken.'],
    ['The mistakes ', 'are reviewed', ' at the end.', ['review', 'reviewed', 'are reviewing'], 'The mistakes receive review.', 'The errors ___ after class. Students choose are reviewed.'],
    ['The rule ', 'is explained', ' after each answer.', ['explains', 'explained', 'is explaining'], 'The rule receives the explanation.', 'The rule ___ clearly. Students choose is explained.'],
  ]);

  appendRows(questions, {
    skill: 'verbTense',
    level: 4,
    focus: 'reported speech',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'After a past reporting verb, present forms often shift one step back.',
    strategy: 'Check said, told or explained before choosing the tense.',
    teacherPrompt: 'Ask students to say the direct quote, then report it.',
    explanation: (correct) => `${correct} fits reported speech after a past reporting verb.`,
  }, [
    ['She said she ', 'was', ' ready for the test.', ['is', 'be', 'has'], 'Said is in the past.', 'She said she ___ tired. Students choose was.'],
    ['He told me he ', 'had', ' a question.', ['has', 'have', 'having'], 'Told is in the past.', 'He told me he ___ homework. Students choose had.'],
    ['The teacher explained that the answer ', 'depended', ' on the context.', ['depends', 'depend', 'has depended'], 'Explained is past.', 'She explained it ___ on context. Students choose depended.'],
    ['Ana said she ', 'needed', ' more practice.', ['needs', 'need', 'has needed'], 'Said causes a backshift.', 'Ana said she ___ help. Students choose needed.'],
    ['They told us they ', 'were', ' comparing options.', ['are', 'be', 'have'], 'Told is past.', 'They told us they ___ ready. Students choose were.'],
    ['Carlos said he ', 'could', ' identify the subject.', ['can', 'will can', 'has can'], 'Can often shifts to could.', 'He said he ___ help. Students choose could.'],
    ['The student said the question ', 'was', ' confusing.', ['is', 'be', 'has'], 'Said is past.', 'The student said it ___ difficult. Students choose was.'],
    ['The coach told them they ', 'would', ' improve with practice.', ['will', 'can', 'have'], 'Will often shifts to would.', 'She said they ___ improve. Students choose would.'],
  ]);

  appendRows(questions, {
    skill: 'verbTense',
    level: 2,
    focus: 'present continuous',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Present continuous uses am/is/are + -ing for actions happening now.',
    strategy: 'Look for now, right now, at the moment or a current action.',
    teacherPrompt: 'Ask what is happening at this moment.',
    explanation: (correct) => `${correct} describes an action in progress now.`,
  }, [
    ['Right now, the students ', 'are solving', ' a cloze exercise.', ['solve', 'solved', 'have solved'], 'Right now points to an action in progress.', 'Right now, they ___ questions. Students choose are solving.'],
    ['At the moment, Ana ', 'is checking', ' her answer.', ['checks', 'checked', 'has checked'], 'At the moment points to now.', 'Ana ___ the context now. Students choose is checking.'],
    ['Listen, the teacher ', 'is explaining', ' the difference.', ['explains', 'explained', 'has explained'], 'Listen suggests something happening now.', 'The teacher ___ now. Students choose is explaining.'],
    ['Today, we ', 'are practicing', ' grammar more intensely.', ['practice', 'practiced', 'have practiced'], 'The action is ongoing today.', 'Today we ___ connectors. Students choose are practicing.'],
    ['The class ', 'is working', ' on prepositions this week.', ['works', 'worked', 'has worked'], 'This week describes an ongoing temporary activity.', 'The class ___ on grammar. Students choose is working.'],
    ['I ', 'am trying', ' to find the subject first.', ['try', 'tried', 'have tried'], 'The action is happening now.', 'I ___ to read carefully. Students choose am trying.'],
    ['The app ', 'is adding', ' a reinforcement question now.', ['adds', 'added', 'has added'], 'Now points to present continuous.', 'The app ___ feedback now. Students choose is adding.'],
    ['Students ', 'are discussing', ' why option C is wrong.', ['discuss', 'discussed', 'have discussed'], 'The discussion is happening now.', 'Students ___ answers now. Students choose are discussing.'],
  ]);

  return finalize('verbTense', questions);
}

function buildArticlesDeterminersQuestions() {
  const questions: DraftQuestion[] = [];

  appendRows(questions, {
    skill: 'articlesDeterminers',
    level: 1,
    focus: 'a/an by sound',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use a before consonant sounds and an before vowel sounds.',
    strategy: 'Say the next word aloud; choose by sound, not only by spelling.',
    teacherPrompt: 'Ask students to pronounce the word after the blank.',
    explanation: (correct) => `${correct} fits the sound that begins the next word.`,
  }, [
    ['She found ', 'an', ' unusual example in the text.', ['a', 'the', 'No article'], 'Unusual begins with a vowel sound.', 'Use ___ unusual case. Students choose an.'],
    ['The teacher gave us ', 'a', ' useful strategy.', ['an', 'the', 'No article'], 'Useful begins with a /y/ sound.', 'Use ___ useful tip. Students choose a.'],
    ['They visited ', 'a', ' university near the city center.', ['an', 'the', 'No article'], 'University begins with a /y/ sound.', 'Use ___ university. Students choose a.'],
    ['I waited for ', 'an', ' hour before the class.', ['a', 'the', 'No article'], 'Hour begins with a vowel sound because h is silent.', 'Use ___ hour. Students choose an.'],
    ['The paragraph includes ', 'an', ' honest opinion.', ['a', 'the', 'No article'], 'Honest begins with a vowel sound.', 'Use ___ honest answer. Students choose an.'],
    ['We need ', 'a', ' clear reason for the answer.', ['an', 'the', 'No article'], 'Clear begins with a consonant sound.', 'Use ___ clear example. Students choose a.'],
    ['The student chose ', 'an', ' easy option first.', ['a', 'the', 'No article'], 'Easy begins with a vowel sound.', 'Use ___ easy question. Students choose an.'],
    ['It was ', 'a', ' difficult decision.', ['an', 'the', 'No article'], 'Difficult begins with a consonant sound.', 'Use ___ difficult text. Students choose a.'],
    ['The app shows ', 'an', ' individual report.', ['a', 'the', 'No article'], 'Individual begins with a vowel sound.', 'Use ___ individual score. Students choose an.'],
  ]);

  appendRows(questions, {
    skill: 'articlesDeterminers',
    level: 2,
    focus: 'the for specific reference',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use the when the listener knows exactly which noun you mean.',
    strategy: 'Ask whether the noun is general or specific in the sentence.',
    teacherPrompt: 'Ask what makes the noun identifiable.',
    explanation: (correct) => `${correct} signals a specific noun already identified by the context.`,
  }, [
    ['Please read ', 'the', ' sentence before the blank again.', ['a', 'an', 'No article'], 'The sentence is a specific one in the exercise.', 'Read ___ question again. Students choose the.'],
    ['This is ', 'the', ' same mistake we discussed yesterday.', ['a', 'an', 'No article'], 'Same usually takes the.', 'It is ___ same rule. Students choose the.'],
    ['She chose ', 'the', ' best option after comparing all four.', ['a', 'an', 'No article'], 'Best is a superlative.', 'Choose ___ best answer. Students choose the.'],
    ['The text mentions ', 'the', ' Amazon River.', ['a', 'an', 'No article'], 'River names usually take the.', '___ Magdalena River is long. Students choose The.'],
    ['They reviewed ', 'the', ' Pacific Ocean on the map.', ['a', 'an', 'No article'], 'Ocean names use the.', '___ Atlantic Ocean is large. Students choose The.'],
    ['Look at ', 'the', ' option with the connector therefore.', ['a', 'an', 'No article'], 'The option is specified by the phrase after it.', 'Check ___ answer with because. Students choose the.'],
    ['I understood ', 'the', ' rule that explains the answer.', ['a', 'an', 'No article'], 'The rule is specified by a relative clause.', 'Study ___ rule that appears here. Students choose the.'],
    ['This was ', 'the', ' most confusing part of the paragraph.', ['a', 'an', 'No article'], 'Most confusing is a superlative.', 'It is ___ most useful clue. Students choose the.'],
    ['The teacher opened ', 'the', ' document students had sent.', ['a', 'an', 'No article'], 'The document is specific.', 'Open ___ file we used. Students choose the.'],
  ]);

  appendRows(questions, {
    skill: 'articlesDeterminers',
    level: 2,
    focus: 'zero article',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use no article with general plural nouns and general uncountable nouns.',
    strategy: 'If the sentence talks about a whole category, test no article.',
    teacherPrompt: 'Ask whether the noun means one specific item or the idea in general.',
    explanation: (correct) => `${correct} is correct because the noun is used in a general sense.`,
  }, [
    ['Many students enjoy ', 'No article', ' music while studying.', ['the', 'a', 'an'], 'Music is general and uncountable here.', 'I like ___ English. Students choose no article.'],
    ['She studies ', 'No article', ' English every afternoon.', ['the', 'a', 'an'], 'School subjects usually take no article in general.', 'He studies ___ science. Students choose no article.'],
    ['Teachers need ', 'No article', ' patience during feedback.', ['the', 'a', 'an'], 'Patience is an uncountable idea.', 'Learners need ___ practice. Students choose no article.'],
    ['Children often learn from ', 'No article', ' examples.', ['the', 'a', 'an'], 'Examples is plural and general.', 'Students need ___ clues. Students choose no article.'],
    ['Good readers use ', 'No article', ' context before answering.', ['the', 'a', 'an'], 'Context is general here.', 'Use ___ evidence. Students choose no article.'],
    ['In school, ', 'No article', ' grammar helps with clear communication.', ['the', 'a', 'an'], 'Grammar is a general subject.', '___ vocabulary matters. Students choose no article.'],
    ['Some people prefer ', 'No article', ' silence when they read.', ['the', 'a', 'an'], 'Silence is general and uncountable.', 'I prefer ___ quiet. Students choose no article.'],
    ['Students compare ', 'No article', ' answers in pairs.', ['the', 'a', 'an'], 'Answers means answers in general.', 'Compare ___ options. Students choose no article.'],
    ['Practice builds ', 'No article', ' confidence.', ['the', 'a', 'an'], 'Confidence is uncountable here.', 'Practice builds ___ fluency. Students choose no article.'],
  ]);

  appendRows(questions, {
    skill: 'articlesDeterminers',
    level: 2,
    focus: 'some and any',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use some in many positive sentences and any in many negatives or questions.',
    strategy: 'Check if the sentence is positive, negative or a question.',
    teacherPrompt: 'Ask students to turn the sentence into the opposite form.',
    explanation: (correct) => `${correct} fits the sentence type and the noun after the blank.`,
  }, [
    ['There are ', 'some', ' examples at the end of the guide.', ['any', 'much', 'a'], 'This is a positive sentence with a plural noun.', 'There are ___ questions. Students choose some.'],
    ['There is not ', 'any', ' evidence for option D.', ['some', 'many', 'a few'], 'This is a negative sentence.', 'There is not ___ time. Students choose any.'],
    ['Do you have ', 'any', ' questions about the rule?', ['some', 'much', 'a'], 'This is a question.', 'Do you have ___ doubts? Students choose any.'],
    ['The teacher gave ', 'some', ' useful feedback.', ['any', 'many', 'an'], 'Positive sentence with uncountable feedback.', 'She gave ___ advice. Students choose some.'],
    ['We did not find ', 'any', ' mistakes in the first paragraph.', ['some', 'much', 'a little'], 'Negative sentence with plural noun.', 'We did not find ___ errors. Students choose any.'],
    ['Ana needs ', 'some', ' extra practice before Friday.', ['any', 'many', 'a few'], 'Positive sentence with uncountable practice.', 'Ana needs ___ help. Students choose some.'],
    ['Is there ', 'any', ' homework for tomorrow?', ['some', 'many', 'a few'], 'Question with uncountable homework.', 'Is there ___ feedback? Students choose any.'],
    ['They solved ', 'some', ' difficult items together.', ['any', 'much', 'an'], 'Positive sentence with plural countable noun.', 'They solved ___ tasks. Students choose some.'],
    ['We cannot see ', 'any', ' reason to choose C.', ['some', 'many', 'a'], 'Cannot makes the sentence negative.', 'We cannot see ___ clue. Students choose any.'],
  ]);

  appendRows(questions, {
    skill: 'articlesDeterminers',
    level: 3,
    focus: 'quantity determiners',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Many and few go with plural countable nouns; much and little go with uncountable nouns.',
    strategy: 'Decide whether the noun after the blank is countable.',
    teacherPrompt: 'Ask if students can say one, two or three before the noun.',
    explanation: (correct) => `${correct} matches the countable or uncountable noun that follows.`,
  }, [
    ['There are ', 'many', ' reasons to read the full sentence.', ['much', 'little', 'any'], 'Reasons is plural and countable.', 'There are ___ examples. Students choose many.'],
    ['We do not have ', 'much', ' time before the quiz.', ['many', 'few', 'several'], 'Time is uncountable.', 'We do not have ___ time. Students choose much.'],
    ['Only ', 'a few', ' students noticed the clue.', ['a little', 'much', 'any'], 'Students is plural countable.', 'Only ___ answers were correct. Students choose a few.'],
    ['There is ', 'a little', ' information in the title.', ['a few', 'many', 'several'], 'Information is uncountable.', 'There is ___ evidence. Students choose a little.'],
    ['The exercise has ', 'several', ' possible distractors.', ['much', 'little', 'a'], 'Distractors is plural countable.', 'It has ___ examples. Students choose several.'],
    ['The text gives ', 'little', ' evidence for that option.', ['few', 'many', 'several'], 'Evidence is uncountable.', 'It gives ___ support. Students choose little.'],
    ['We need ', 'more', ' practice with prepositions.', ['many', 'a few', 'several'], 'More works with uncountable practice.', 'We need ___ feedback. Students choose more.'],
    ['The group made ', 'fewer', ' mistakes after feedback.', ['less', 'much', 'little'], 'Mistakes are countable.', 'They made ___ errors. Students choose fewer.'],
    ['The second answer gives ', 'less', ' information than the first.', ['fewer', 'many', 'several'], 'Information is uncountable.', 'It gives ___ evidence. Students choose less.'],
  ]);

  appendRows(questions, {
    skill: 'articlesDeterminers',
    level: 3,
    focus: 'demonstratives and distributives',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'This/that are singular; these/those are plural. Each focuses on one item; every means all members of a group.',
    strategy: 'Check distance, number and whether the noun is singular or plural.',
    teacherPrompt: 'Ask students to point to one item or several items.',
    explanation: (correct) => `${correct} matches the number and meaning of the noun.`,
  }, [
    ['Look at ', 'this', ' sentence before choosing.', ['these', 'those', 'many'], 'Sentence is singular and near.', 'Look at ___ word. Students choose this.'],
    ['Look at ', 'these', ' examples on the board.', ['this', 'that', 'much'], 'Examples is plural and near.', 'Look at ___ options. Students choose these.'],
    ['In ', 'that', ' paragraph, the connector is hidden.', ['these', 'those', 'many'], 'Paragraph is singular and farther in the text.', 'In ___ line, find the subject. Students choose that.'],
    ['I disagree with ', 'those', ' answers because they ignore context.', ['that', 'this', 'much'], 'Answers is plural and farther from the speaker.', 'Check ___ sentences. Students choose those.'],
    ['Give ', 'each', ' student one sentence to analyze.', ['every', 'many', 'much'], 'Each focuses on individuals one by one.', 'Give ___ student a card. Students choose each.'],
    ['We practice ', 'every', ' week before the exam.', ['each', 'many', 'much'], 'Every refers to all weeks as a repeated pattern.', 'Practice ___ day. Students choose every.'],
    ['Can I try ', 'another', ' question after this one?', ['other', 'others', 'many'], 'Another means one more singular item.', 'Try ___ example. Students choose another.'],
    ['The ', 'other', ' options do not fit the meaning.', ['another', 'others', 'much'], 'Other describes plural options.', 'The ___ answers are wrong. Students choose other.'],
    ['Both ', 'these', ' connectors show contrast.', ['this', 'that', 'much'], 'Connectors is plural and near.', '___ examples are similar. Students choose these.'],
  ]);

  return finalize('articlesDeterminers', questions);
}

function buildPrepositionQuestions() {
  const questions: DraftQuestion[] = [];

  appendRows(questions, {
    skill: 'prepositions',
    level: 1,
    focus: 'time prepositions',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use at for exact times, on for days and dates, and in for months, years and longer periods.',
    strategy: 'Classify the time expression before choosing the preposition.',
    teacherPrompt: 'Ask whether the time is an hour, a day or a month/year.',
    explanation: (correct) => `${correct} is the natural preposition for this time expression.`,
  }, [
    ['The practice starts ', 'at', ' 7:30 in the morning.', ['on', 'in', 'by'], 'Exact clock times use at.', 'Class begins ___ 8:00. Students choose at.'],
    ['The exam is ', 'on', ' Monday.', ['at', 'in', 'by'], 'Days use on.', 'The quiz is ___ Friday. Students choose on.'],
    ['Many schools finish classes ', 'in', ' November.', ['at', 'on', 'by'], 'Months use in.', 'The course starts ___ March. Students choose in.'],
    ['Please send the answer ', 'by', ' noon.', ['in', 'on', 'at'], 'By means no later than.', 'Finish ___ 5:00. Students choose by.'],
    ['We practiced ', 'during', ' the break.', ['at', 'on', 'since'], 'During means throughout a period.', 'They talked ___ lunch. Students choose during.'],
    ['She has studied here ', 'since', ' 2022.', ['for', 'during', 'at'], 'Since gives the starting point.', 'He has practiced ___ January. Students choose since.'],
    ['They worked on grammar ', 'for', ' two hours.', ['since', 'during', 'on'], 'For gives duration.', 'We studied ___ ten minutes. Students choose for.'],
    ['The class meets ', 'on', ' July 15.', ['at', 'in', 'by'], 'Dates use on.', 'The event is ___ August 4. Students choose on.'],
    ['Students usually read more ', 'in', ' the evening.', ['on', 'at', 'by'], 'Parts of the day often use in.', 'I study ___ the afternoon. Students choose in.'],
  ]);

  appendRows(questions, {
    skill: 'prepositions',
    level: 2,
    focus: 'place prepositions',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use at for specific points, in for enclosed areas and on for surfaces.',
    strategy: 'Visualize the place relation before choosing.',
    teacherPrompt: 'Ask students to draw the location quickly.',
    explanation: (correct) => `${correct} describes the place relation in the sentence.`,
  }, [
    ['The answers are written ', 'on', ' the board.', ['in', 'at', 'to'], 'A board is a surface.', 'Write it ___ the board. Students choose on.'],
    ['The students are ', 'in', ' the classroom.', ['on', 'at', 'to'], 'A classroom is an enclosed place.', 'They are ___ the room. Students choose in.'],
    ['We met ', 'at', ' the school entrance.', ['in', 'on', 'to'], 'The entrance is a specific point.', 'Meet me ___ the door. Students choose at.'],
    ['The title appears ', 'at', ' the top of the page.', ['in', 'on', 'to'], 'At marks a specific position.', 'Look ___ the top. Students choose at.'],
    ['The clue is hidden ', 'in', ' the second paragraph.', ['on', 'at', 'to'], 'A paragraph contains information.', 'Find it ___ the text. Students choose in.'],
    ['There is a note ', 'on', ' the first page.', ['in', 'at', 'to'], 'A page is treated as a surface.', 'It is ___ page two. Students choose on.'],
    ['They arrived ', 'at', ' the museum before noon.', ['in', 'on', 'to'], 'Arrive at is common for buildings.', 'Arrive ___ school. Students choose at.'],
    ['We arrived ', 'in', ' Medellin at night.', ['at', 'on', 'to'], 'Arrive in is used for cities.', 'Arrive ___ Colombia. Students choose in.'],
    ['The file is saved ', 'in', ' the practice folder.', ['on', 'at', 'to'], 'A folder contains files.', 'Save it ___ the folder. Students choose in.'],
  ]);

  appendRows(questions, {
    skill: 'prepositions',
    level: 2,
    focus: 'movement prepositions',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Movement prepositions describe direction: across, through, into, out of, toward and past.',
    strategy: 'Imagine the movement from start to finish.',
    teacherPrompt: 'Ask students to gesture the movement.',
    explanation: (correct) => `${correct} matches the direction or path of movement.`,
  }, [
    ['They walked ', 'across', ' the bridge after school.', ['during', 'between', 'under'], 'Across means from one side to the other.', 'Walk ___ the street. Students choose across.'],
    ['The ball rolled ', 'under', ' the desk.', ['across', 'during', 'between'], 'Under means below something.', 'The pencil fell ___ the table. Students choose under.'],
    ['Students moved ', 'into', ' the classroom quietly.', ['on', 'at', 'between'], 'Into shows movement to the inside.', 'Go ___ the room. Students choose into.'],
    ['The teacher came ', 'out of', ' the office with the tests.', ['into', 'across', 'between'], 'Out of shows movement from inside to outside.', 'Come ___ the room. Students choose out of.'],
    ['We walked ', 'past', ' the library on our way home.', ['during', 'among', 'onto'], 'Past means going by a place.', 'Walk ___ the office. Students choose past.'],
    ['The students ran ', 'toward', ' the bus stop.', ['during', 'between', 'under'], 'Toward gives direction.', 'Move ___ the door. Students choose toward.'],
    ['The river flows ', 'through', ' the city.', ['onto', 'during', 'between'], 'Through means from one side to the other inside an area.', 'Walk ___ the tunnel. Students choose through.'],
    ['She put the paper ', 'onto', ' the desk.', ['into', 'at', 'between'], 'Onto shows movement to a surface.', 'Put it ___ the table. Students choose onto.'],
    ['The group sat ', 'between', ' two windows.', ['during', 'across', 'into'], 'Between means in the middle of two things.', 'Sit ___ Ana and Luis. Students choose between.'],
  ]);

  appendRows(questions, {
    skill: 'prepositions',
    level: 3,
    focus: 'adjective + preposition',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Many adjectives take fixed prepositions: good at, interested in, responsible for, afraid of.',
    strategy: 'Learn adjective + preposition as chunks.',
    teacherPrompt: 'Ask students to create a personal sentence with the same chunk.',
    explanation: (correct) => `${correct} completes a common adjective + preposition combination.`,
  }, [
    ['She is good ', 'at', ' identifying connectors.', ['in', 'on', 'to'], 'Good commonly goes with at.', 'I am good ___ reading. Students choose at.'],
    ['Many students are interested ', 'in', ' studying abroad.', ['on', 'at', 'of'], 'Interested goes with in.', 'She is interested ___ English. Students choose in.'],
    ['The teacher is responsible ', 'for', ' the final report.', ['of', 'on', 'at'], 'Responsible goes with for.', 'Who is responsible ___ feedback? Students choose for.'],
    ['Some learners are afraid ', 'of', ' making mistakes.', ['for', 'at', 'in'], 'Afraid goes with of.', 'Do not be afraid ___ errors. Students choose of.'],
    ['This rule is similar ', 'to', ' the one we saw yesterday.', ['with', 'than', 'as'], 'Similar goes with to.', 'This is similar ___ that. Students choose to.'],
    ['The answer is different ', 'from', ' the first option.', ['than', 'to', 'with'], 'Different from is standard.', 'This text is different ___ the last one. Students choose from.'],
    ['She was proud ', 'of', ' her progress.', ['for', 'in', 'at'], 'Proud goes with of.', 'Be proud ___ your work. Students choose of.'],
    ['The explanation is useful ', 'for', ' beginners.', ['of', 'at', 'on'], 'Useful often goes with for when naming who benefits.', 'This guide is useful ___ students. Students choose for.'],
    ['The class is familiar ', 'with', ' the format.', ['to', 'at', 'on'], 'Familiar goes with with.', 'We are familiar ___ cloze. Students choose with.'],
  ]);

  appendRows(questions, {
    skill: 'prepositions',
    level: 3,
    focus: 'verb + preposition',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Some verbs require a fixed preposition: depend on, listen to, wait for, look at.',
    strategy: 'Treat verb + preposition as vocabulary chunks.',
    teacherPrompt: 'Ask learners to reuse the chunk in a new sentence.',
    explanation: (correct) => `${correct} completes a common verb + preposition combination.`,
  }, [
    ['Students depend ', 'on', ' clear instructions.', ['in', 'at', 'of'], 'Depend takes on.', 'We depend ___ feedback. Students choose on.'],
    ['Please listen ', 'to', ' the explanation before answering.', ['at', 'on', 'for'], 'Listen takes to.', 'Listen ___ the teacher. Students choose to.'],
    ['We waited ', 'for', ' the teacher after class.', ['to', 'at', 'on'], 'Wait takes for.', 'Wait ___ the result. Students choose for.'],
    ['Look ', 'at', ' the sentence before the blank.', ['to', 'on', 'for'], 'Look at means direct your eyes to something.', 'Look ___ the options. Students choose at.'],
    ['The paragraph refers ', 'to', ' a problem in the community.', ['at', 'on', 'for'], 'Refer takes to.', 'It refers ___ the title. Students choose to.'],
    ['She apologized ', 'for', ' arriving late.', ['to', 'at', 'on'], 'Apologize for names the reason.', 'Apologize ___ the mistake. Students choose for.'],
    ['They agreed ', 'with', ' the teacher explanation.', ['to', 'at', 'on'], 'Agree with a person or idea.', 'I agree ___ that answer. Students choose with.'],
    ['The lesson focuses ', 'on', ' connectors in context.', ['in', 'at', 'of'], 'Focus takes on.', 'Focus ___ the subject. Students choose on.'],
    ['He asked ', 'for', ' another example.', ['to', 'at', 'on'], 'Ask for means request.', 'Ask ___ help. Students choose for.'],
  ]);

  appendRows(questions, {
    skill: 'prepositions',
    level: 4,
    focus: 'academic phrases',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Academic English uses common prepositional phrases such as in contrast, in addition, according to and because of.',
    strategy: 'Check if the phrase introduces source, cause, addition or contrast.',
    teacherPrompt: 'Ask what function the phrase has in the paragraph.',
    explanation: (correct) => `${correct} completes a common phrase used in academic or exam texts.`,
  }, [
    ['According ', 'to', ' the text, recycling saves money.', ['with', 'at', 'for'], 'According to introduces a source.', 'According ___ the chart. Students choose to.'],
    ['The answer is correct because ', 'of', ' the clue in line three.', ['for', 'to', 'at'], 'Because of is followed by a noun phrase.', 'Because ___ the context. Students choose of.'],
    ['In addition ', 'to', ' grammar, students need vocabulary.', ['of', 'for', 'at'], 'In addition to adds information.', 'In addition ___ practice. Students choose to.'],
    ['In contrast ', 'with', ' option A, option B keeps the meaning.', ['to', 'for', 'at'], 'In contrast with compares differences.', 'In contrast ___ the first text. Students choose with.'],
    ['The problem is related ', 'to', ' reading speed.', ['with', 'at', 'for'], 'Related takes to.', 'It is related ___ context. Students choose to.'],
    ['This paragraph is divided ', 'into', ' three short parts.', ['on', 'at', 'for'], 'Divide into parts.', 'Divide it ___ sections. Students choose into.'],
    ['The exercise is based ', 'on', ' frequent mistakes.', ['in', 'at', 'of'], 'Based on is the phrase.', 'It is based ___ evidence. Students choose on.'],
    ['Students improved as a result ', 'of', ' daily practice.', ['for', 'to', 'at'], 'As a result of introduces cause.', 'As a result ___ feedback. Students choose of.'],
    ['The rule appears ', 'in', ' the middle of the explanation.', ['on', 'at', 'to'], 'In the middle of is the phrase.', 'Find it ___ the middle. Students choose in.'],
  ]);

  return finalize('prepositions', questions);
}

function buildPronounsQuantifiersQuestions() {
  const questions: DraftQuestion[] = [];

  appendRows(questions, {
    skill: 'pronounsQuantifiers',
    level: 1,
    focus: 'subject and object pronouns',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use subject pronouns before verbs and object pronouns after verbs or prepositions.',
    strategy: 'Remove extra names and test the pronoun alone.',
    teacherPrompt: 'Ask whether the pronoun does the action or receives it.',
    explanation: (correct) => `${correct} has the correct role in the sentence.`,
  }, [
    ['The teacher asked Ana and ', 'me', ' to explain the answer.', ['I', 'my', 'mine'], 'After asked, use an object pronoun.', 'She invited Luis and ___. Students choose me.'],
    ['Carlos and ', 'I', ' reviewed the connectors.', ['me', 'my', 'mine'], 'The pronoun is part of the subject.', 'Ana and ___ studied. Students choose I.'],
    ['The app showed ', 'them', ' a reinforcement question.', ['they', 'their', 'theirs'], 'After showed, use an object pronoun.', 'The teacher helped ___. Students choose them.'],
    ['My sister and ', 'he', ' chose the same option.', ['him', 'his', 'he is'], 'The pronoun is part of the subject.', 'Laura and ___ answered. Students choose he.'],
    ['The explanation helped David and ', 'her', ' understand the rule.', ['she', 'hers', 'her is'], 'After helped, use an object pronoun.', 'It helped Ana and ___. Students choose her.'],
    ['Maria and ', 'they', ' are practicing cloze.', ['them', 'their', 'theirs'], 'The pronoun is part of the subject.', 'Luis and ___ practiced. Students choose they.'],
    ['The report belongs to ', 'us', '.', ['we', 'our', 'ours'], 'After to, use an object pronoun.', 'This belongs to ___. Students choose us.'],
    ['You and ', 'she', ' can compare answers.', ['her', 'hers', 'she is'], 'The pronoun is part of the subject.', 'You and ___ can start. Students choose she.'],
    ['The teacher called ', 'him', ' after class.', ['he', 'his', 'himself'], 'After called, use an object pronoun.', 'The teacher called ___. Students choose him.'],
  ]);

  appendRows(questions, {
    skill: 'pronounsQuantifiers',
    level: 1,
    focus: 'possessive forms',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'My, your, his, her, our and their need a noun; mine, yours, his, hers, ours and theirs stand alone.',
    strategy: 'Look immediately after the blank. If a noun follows, use a possessive adjective.',
    teacherPrompt: 'Ask students to compare my notebook and mine.',
    explanation: (correct) => `${correct} shows possession in the correct form.`,
  }, [
    ['This notebook is ', 'mine', '.', ['my', 'me', 'I'], 'No noun follows the blank.', 'The book is ___. Students choose mine.'],
    ['Please check ', 'your', ' answer before submitting.', ['yours', 'you', 'yourself'], 'Answer follows the blank.', 'Check ___ notes. Students choose your.'],
    ['The red folder is ', 'hers', '.', ['her', 'she', 'herself'], 'No noun follows the blank.', 'The pen is ___. Students choose hers.'],
    ['They forgot ', 'their', ' dictionaries at home.', ['there', 'they are', 'theirs'], 'Dictionaries follows the blank.', 'They brought ___ books. Students choose their.'],
    ['That classroom is ', 'ours', ' today.', ['our', 'us', 'we'], 'No noun follows the blank.', 'The room is ___. Students choose ours.'],
    ['Carlos brought ', 'his', ' laptop to class.', ['him', 'he', 'himself'], 'Laptop follows the blank.', 'He brought ___ notes. Students choose his.'],
    ['The last answer is ', 'theirs', '.', ['their', 'there', 'they'], 'No noun follows the blank.', 'The choice is ___. Students choose theirs.'],
    ['We shared ', 'our', ' strategy with the group.', ['ours', 'us', 'we'], 'Strategy follows the blank.', 'We shared ___ idea. Students choose our.'],
    ['Is this pencil ', 'yours', '?', ['your', 'you', 'yourself'], 'No noun follows the blank.', 'Is this answer ___? Students choose yours.'],
  ]);

  appendRows(questions, {
    skill: 'pronounsQuantifiers',
    level: 2,
    focus: 'reflexive pronouns',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use reflexive pronouns when the subject and object refer to the same person or people.',
    strategy: 'Ask who receives the action. If it is the same subject, use -self or -selves.',
    teacherPrompt: 'Ask students to point to the subject and the receiver.',
    explanation: (correct) => `${correct} refers back to the subject of the sentence.`,
  }, [
    ['Ana corrected ', 'herself', ' after reading the explanation.', ['her', 'she', 'hers'], 'Ana and the receiver are the same person.', 'Ana helped ___. Students choose herself.'],
    ['The students taught ', 'themselves', ' the rule with examples.', ['them', 'they', 'their'], 'The students and the learners are the same people.', 'They taught ___. Students choose themselves.'],
    ['I asked ', 'myself', ' why the connector was needed.', ['me', 'my', 'mine'], 'I and the person asked are the same.', 'I reminded ___. Students choose myself.'],
    ['Carlos blamed ', 'himself', ' for answering too fast.', ['him', 'he', 'his'], 'Carlos and the person blamed are the same.', 'Carlos corrected ___. Students choose himself.'],
    ['We prepared ', 'ourselves', ' for the practice session.', ['us', 'our', 'ours'], 'We and the people prepared are the same.', 'We helped ___. Students choose ourselves.'],
    ['The app updates ', 'itself', ' after each attempt.', ['it', 'its', 'it is'], 'The app acts on itself.', 'The system checks ___. Students choose itself.'],
    ['You should trust ', 'yourself', ' after checking the evidence.', ['you', 'your', 'yours'], 'You and the person trusted are the same.', 'Trust ___. Students choose yourself.'],
    ['They organized ', 'themselves', ' into small groups.', ['them', 'their', 'they'], 'They organized their own group.', 'They divided ___. Students choose themselves.'],
    ['The teacher introduced ', 'herself', ' before the workshop.', ['her', 'she', 'hers'], 'The teacher is the person introduced.', 'She introduced ___. Students choose herself.'],
  ]);

  appendRows(questions, {
    skill: 'pronounsQuantifiers',
    level: 3,
    focus: 'relative pronouns',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use who for people, which for things and where for places.',
    strategy: 'Identify what the blank refers to: person, thing or place.',
    teacherPrompt: 'Ask students to underline the noun before the blank.',
    explanation: (correct) => `${correct} correctly refers to the noun before the blank.`,
  }, [
    ['The student ', 'who', ' answered first explained the rule.', ['which', 'where', 'when'], 'The blank refers to a person.', 'The teacher ___ helped us. Students choose who.'],
    ['The option ', 'which', ' repeats the subject is wrong.', ['who', 'where', 'when'], 'The blank refers to a thing.', 'The answer ___ changes meaning. Students choose which.'],
    ['This is the classroom ', 'where', ' we practice ICFES.', ['who', 'which', 'when'], 'The blank refers to a place.', 'The place ___ we study. Students choose where.'],
    ['The teacher ', 'who', ' designed the exercise added hints.', ['which', 'where', 'when'], 'Teacher is a person.', 'The learner ___ asked. Students choose who.'],
    ['The paragraph ', 'which', ' contains the clue is short.', ['who', 'where', 'when'], 'Paragraph is a thing.', 'The text ___ helps. Students choose which.'],
    ['The school ', 'where', ' she studies has extra practice.', ['who', 'which', 'when'], 'School is treated as a place here.', 'The room ___ we meet. Students choose where.'],
    ['The classmates ', 'who', ' reviewed errors improved quickly.', ['which', 'where', 'when'], 'Classmates are people.', 'The students ___ practiced. Students choose who.'],
    ['The strategy ', 'which', ' works best is reading context.', ['who', 'where', 'when'], 'Strategy is a thing.', 'The rule ___ appears. Students choose which.'],
    ['The website ', 'where', ' students practice is free.', ['who', 'which', 'when'], 'Website is a place in this context.', 'The platform ___ we practice. Students choose where.'],
  ]);

  appendRows(questions, {
    skill: 'pronounsQuantifiers',
    level: 2,
    focus: 'countable and uncountable quantifiers',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Much/little go with uncountable nouns; many/few go with plural countable nouns.',
    strategy: 'Check whether the noun can be counted as separate items.',
    teacherPrompt: 'Ask if the noun can take a number before it.',
    explanation: (correct) => `${correct} matches the type of noun after the blank.`,
  }, [
    ['There are ', 'many', ' examples in the practice bank.', ['much', 'little', 'any'], 'Examples are plural countable.', 'There are ___ items. Students choose many.'],
    ['We need ', 'much', ' more practice with articles.', ['many', 'few', 'several'], 'Practice is uncountable.', 'We need ___ time. Students choose much.'],
    ['Only ', 'few', ' answers were completely wrong.', ['little', 'much', 'any'], 'Answers are countable plural.', 'Few ___ students. Students choose few.'],
    ['There is ', 'little', ' time left for guessing.', ['few', 'many', 'several'], 'Time is uncountable.', 'Little ___ evidence. Students choose little.'],
    ['She has ', 'several', ' strategies for cloze questions.', ['much', 'little', 'a'], 'Strategies are countable plural.', 'Several ___ examples. Students choose several.'],
    ['The text gives ', 'enough', ' information to answer.', ['many', 'few', 'each'], 'Enough can go before uncountable nouns.', 'Enough ___ practice. Students choose enough.'],
    ['There are not ', 'enough', ' chairs for the group.', ['much', 'little', 'each'], 'Enough can go before plural countable nouns.', 'Enough ___ examples. Students choose enough.'],
    ['She made ', 'fewer', ' errors after feedback.', ['less', 'little', 'much'], 'Errors are countable.', 'Fewer ___ mistakes. Students choose fewer.'],
    ['The second explanation has ', 'less', ' detail than the first.', ['fewer', 'many', 'several'], 'Detail is uncountable here.', 'Less ___ information. Students choose less.'],
  ]);

  appendRows(questions, {
    skill: 'pronounsQuantifiers',
    level: 3,
    focus: 'indefinite pronouns',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Indefinite pronouns such as someone, anything, everything and nobody have specific meanings and often take singular verbs.',
    strategy: 'Use the meaning of the whole sentence, not just the word after the blank.',
    teacherPrompt: 'Ask whether the sentence needs a person, thing, negative idea or complete group.',
    explanation: (correct) => `${correct} fits the meaning of the sentence.`,
  }, [
    ['The teacher asked if ', 'anyone', ' had a question.', ['anything', 'anywhere', 'any'], 'A person is needed.', 'Ask if ___ needs help. Students choose anyone.'],
    ['I could not find ', 'anything', ' wrong with option B.', ['anyone', 'anywhere', 'any'], 'A thing is needed after find.', 'I did not see ___. Students choose anything.'],
    ['After feedback, ', 'everyone', ' understood the rule.', ['everything', 'everywhere', 'every'], 'The sentence refers to people.', '___ practiced. Students choose everyone.'],
    ['The paragraph says ', 'nothing', ' about the past.', ['nobody', 'nowhere', 'none'], 'The sentence needs no thing/information.', 'It says ___. Students choose nothing.'],
    ['There is ', 'something', ' important after the blank.', ['someone', 'somewhere', 'some'], 'A thing or idea is needed.', 'There is ___ useful. Students choose something.'],
    ['We need ', 'someone', ' to explain the answer.', ['something', 'somewhere', 'some'], 'A person is needed.', 'We need ___ to help. Students choose someone.'],
    ['The students looked ', 'everywhere', ' for the missing clue.', ['everyone', 'everything', 'every'], 'A place meaning is needed.', 'They looked ___. Students choose everywhere.'],
    ['Nobody ', 'knows', ' the answer without context.', ['know', 'knowing', 'known'], 'Nobody is singular.', 'Nobody ___ why. Students choose knows.'],
    ['Everything ', 'depends', ' on the relation between ideas.', ['depend', 'depending', 'depended'], 'Everything is singular.', 'Everything ___ on context. Students choose depends.'],
  ]);

  return finalize('pronounsQuantifiers', questions);
}

function buildComparativesModalsQuestions() {
  const questions: DraftQuestion[] = [];

  appendRows(questions, {
    skill: 'comparativesModals',
    level: 2,
    focus: 'comparatives',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use comparative forms with than: -er for many short adjectives and more + adjective for longer ones.',
    strategy: 'Use than as a signal that a comparative is needed.',
    teacherPrompt: 'Ask students to identify the two things being compared.',
    explanation: (correct) => `${correct} is the correct comparative form.`,
  }, [
    ['This paragraph is ', 'longer', ' than the first one.', ['longest', 'more long', 'most long'], 'Than signals comparison.', 'This text is ___ than that one. Students choose longer.'],
    ['The cloze item is ', 'more difficult', ' than the vocabulary item.', ['most difficult', 'difficulter', 'more difficulty'], 'Difficult is a longer adjective.', 'This task is ___ difficult. Students choose more.'],
    ['Option B is ', 'clearer', ' than option C.', ['clearest', 'more clear', 'most clear'], 'Than signals comparison between two options.', 'This answer is ___ than that one. Students choose clearer.'],
    ['The second explanation is ', 'more useful', ' than the first.', ['most useful', 'usefuller', 'more use'], 'Useful takes more.', 'Feedback is ___ useful. Students choose more.'],
    ['Today, Ana feels ', 'more confident', ' than yesterday.', ['most confident', 'confidenter', 'more confidence'], 'Confident is longer.', 'She feels ___ confident. Students choose more.'],
    ['The new strategy is ', 'faster', ' than guessing.', ['fastest', 'more fast', 'most fast'], 'Fast is short.', 'This method is ___ than before. Students choose faster.'],
    ['This rule is ', 'simpler', ' than it looks.', ['simplest', 'more simple', 'most simple'], 'Than signals a comparative.', 'The idea is ___ than before. Students choose simpler.'],
    ['The final session was ', 'better', ' than the first one.', ['best', 'good', 'well'], 'Good has irregular forms.', 'This answer is ___ than mine. Students choose better.'],
    ['The second text is ', 'less formal', ' than the first.', ['least formal', 'fewer formal', 'little formal'], 'Less + adjective shows lower degree.', 'This sentence is ___ formal. Students choose less.'],
  ]);

  appendRows(questions, {
    skill: 'comparativesModals',
    level: 2,
    focus: 'superlatives',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use the + superlative when one item is above all others in a group.',
    strategy: 'Look for the, most, -est or a group of more than two.',
    teacherPrompt: 'Ask what group the item is being compared with.',
    explanation: (correct) => `${correct} is the correct superlative form.`,
  }, [
    ['This is the ', 'easiest', ' question in the set.', ['easier', 'more easy', 'easy'], 'The sentence selects one item from the whole set.', 'The ___ item is first. Students choose easiest.'],
    ['The last paragraph is the ', 'most important', ' part of the text.', ['more important', 'importanter', 'importance'], 'Most important is superlative.', 'The ___ useful clue. Students choose most.'],
    ['Option C is the ', 'best', ' answer.', ['better', 'good', 'well'], 'Best is the superlative of good.', 'The ___ option is B. Students choose best.'],
    ['This was the ', 'worst', ' mistake in the session.', ['worse', 'bad', 'badly'], 'Worst is superlative.', 'The ___ error. Students choose worst.'],
    ['The teacher chose the ', 'clearest', ' example.', ['clearer', 'more clear', 'clear'], 'The sentence selects one example.', 'The ___ explanation. Students choose clearest.'],
    ['This is the ', 'most frequent', ' error in connectors.', ['more frequent', 'frequenter', 'frequency'], 'Frequent takes most in superlative.', 'The ___ common error. Students choose most frequent.'],
    ['The shortest option is not always the ', 'safest', ' answer.', ['safer', 'more safe', 'safe'], 'Safest is superlative.', 'The ___ route. Students choose safest.'],
    ['The final review was the ', 'most helpful', ' activity.', ['more helpful', 'helpfuller', 'help'], 'Helpful takes most.', 'The ___ helpful step. Students choose most.'],
    ['For Luis, passive voice is the ', 'hardest', ' topic.', ['harder', 'more hard', 'hard'], 'Hardest is superlative.', 'The ___ part. Students choose hardest.'],
  ]);

  appendRows(questions, {
    skill: 'comparativesModals',
    level: 3,
    focus: 'as, too and enough',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Use as + adjective + as for equality, too + adjective for excess and adjective + enough for sufficiency.',
    strategy: 'Decide if the sentence shows equality, excess or sufficiency.',
    teacherPrompt: 'Ask students to paraphrase the sentence in Spanish, then return to English form.',
    explanation: (correct) => `${correct} completes the comparison or degree structure.`,
  }, [
    ['This text is ', 'as clear as', ' the previous one.', ['clearer as', 'so clear than', 'clear enough as'], 'The sentence shows equality.', 'Use as ___ as. Students choose as clear as.'],
    ['The option is ', 'too vague', ' to be correct.', ['vague enough', 'as vague', 'more vague'], 'Too means excessive.', 'The answer is ___ broad. Students choose too.'],
    ['The explanation is clear ', 'enough', ' for beginners.', ['too', 'as', 'than'], 'Enough comes after the adjective.', 'It is simple ___. Students choose enough.'],
    ['This session is not ', 'as long as', ' the full mock exam.', ['longer as', 'so long than', 'long enough as'], 'Not as...as compares equality negatively.', 'Not ___ easy ___. Students use as...as.'],
    ['The sentence is ', 'too short', ' to give enough context.', ['short enough', 'as short', 'shorter'], 'Too short means excessively short.', 'The clue is ___ weak. Students choose too.'],
    ['The paragraph is detailed ', 'enough', ' to answer.', ['too', 'as', 'than'], 'The detail is sufficient.', 'It is useful ___. Students choose enough.'],
    ['Option A is ', 'as logical as', ' option B, so read again.', ['more logical as', 'logical enough than', 'most logical as'], 'The sentence compares equality.', 'It is ___ useful ___. Students use as...as.'],
    ['The rule is ', 'too important', ' to ignore.', ['important enough', 'as important', 'more important'], 'Too important means it should not be ignored.', 'This is ___ useful to skip. Students choose too.'],
    ['The answer is not specific ', 'enough', '.', ['too', 'as', 'than'], 'Enough shows insufficient specificity in negative form.', 'It is not clear ___. Students choose enough.'],
  ]);

  appendRows(questions, {
    skill: 'comparativesModals',
    level: 1,
    focus: 'advice and obligation modals',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Should gives advice; must and have to show stronger obligation.',
    strategy: 'Identify the function: advice, rule, obligation or suggestion.',
    teacherPrompt: 'Ask whether the speaker is recommending or requiring the action.',
    explanation: (correct) => `${correct} matches the function of the sentence.`,
  }, [
    ['You ', 'should', ' read the sentence before the options.', ['might', 'would', 'can'], 'The sentence gives advice.', 'You ___ check the context. Students choose should.'],
    ['Students ', 'must', ' follow the official test rules.', ['might', 'would', 'should to'], 'Official rules show obligation.', 'You ___ obey instructions. Students choose must.'],
    ['We ', 'have to', ' finish the report today.', ['must to', 'should to', 'can to'], 'Have to expresses obligation.', 'We ___ submit it. Students choose have to.'],
    ['You ', 'should not', ' choose an answer without evidence.', ['must not to', 'can to not', 'might to not'], 'Should not gives negative advice.', 'You ___ guess. Students choose should not.'],
    ['The teacher says we ', 'must', ' bring identification.', ['might', 'would', 'can'], 'This is a requirement.', 'We ___ bring a pencil. Students choose must.'],
    ['Learners ', 'should', ' explain why other options fail.', ['must to', 'might to', 'would to'], 'The sentence recommends a strategy.', 'Learners ___ compare. Students choose should.'],
    ['We ', 'have to', ' practice more connectors before class.', ['must to', 'should to', 'can to'], 'Have to is followed by base verb.', 'We ___ review. Students choose have to.'],
    ['You ', 'must not', ' copy answers during a test.', ['do not must', 'must to not', 'might to not'], 'Must not shows prohibition.', 'You ___ cheat. Students choose must not.'],
    ['Students ', 'should', ' keep a list of repeated errors.', ['would to', 'must to', 'can to'], 'This is advice.', 'Students ___ write errors. Students choose should.'],
  ]);

  appendRows(questions, {
    skill: 'comparativesModals',
    level: 3,
    focus: 'possibility and deduction',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'May, might and could show possibility; must can show strong deduction from evidence.',
    strategy: 'Look for evidence words such as maybe, probably, I saw, or I am sure.',
    teacherPrompt: 'Ask students how certain the speaker is.',
    explanation: (correct) => `${correct} expresses the right level of certainty.`,
  }, [
    ['It ', 'might', ' rain, so bring an umbrella.', ['must', 'should to', 'can to'], 'Might shows possibility.', 'It ___ be correct. Students choose might.'],
    ['She ', 'must', ' be in class; her bag is here.', ['might not', 'cannot', 'should not'], 'The bag is strong evidence.', 'She ___ be nearby. Students choose must.'],
    ['This option ', 'could', ' be correct, but check the context.', ['must to', 'should to', 'can to'], 'Could shows possibility.', 'It ___ work. Students choose could.'],
    ['He ', 'cannot', ' be absent; I just saw him.', ['must', 'might', 'should'], 'The evidence contradicts absence.', 'It ___ be wrong if the text supports it. Students choose cannot.'],
    ['The answer ', 'may', ' depend on the previous sentence.', ['must to', 'should to', 'can to'], 'May shows possibility.', 'It ___ change. Students choose may.'],
    ['They ', 'must', ' understand the rule; they explained it clearly.', ['might not', 'cannot', 'should not'], 'Explaining clearly is strong evidence.', 'They ___ know it. Students choose must.'],
    ['Option D ', 'might not', ' fit because it changes the cause.', ['must not to', 'cannot to', 'should not to'], 'Might not shows uncertainty.', 'It ___ fit. Students choose might not.'],
    ['The text ', 'could', ' refer to a future event.', ['must to', 'would to', 'can to'], 'Could shows a possible interpretation.', 'It ___ mean this. Students choose could.'],
    ['That connector ', 'must', ' show contrast because the ideas oppose each other.', ['might not', 'cannot', 'should not'], 'The relation is strong evidence.', 'It ___ be contrast. Students choose must.'],
  ]);

  appendRows(questions, {
    skill: 'comparativesModals',
    level: 3,
    focus: 'permission and ability',
    question: 'Choose the option that completes the sentence.',
    miniRule: 'Can and be allowed to express permission; can and be able to express ability.',
    strategy: 'Use context to decide if the sentence is about permission or ability.',
    teacherPrompt: 'Ask whether the sentence means allowed to or able to.',
    explanation: (correct) => `${correct} fits the permission or ability meaning.`,
  }, [
    ['Students ', 'can', ' use scratch paper during practice.', ['can to', 'must to', 'are can'], 'Can is followed by base verb.', 'Students ___ ask questions. Students choose can.'],
    ['During the official test, students are not ', 'allowed to', ' use phones.', ['allowed', 'can to', 'must to'], 'Allowed to expresses permission.', 'They are not ___ leave. Students choose allowed to.'],
    ['After weeks of practice, Ana ', 'can', ' identify the subject quickly.', ['can to', 'is can', 'must to'], 'Can expresses ability.', 'Ana ___ solve it. Students choose can.'],
    ['We were ', 'able to', ' finish all questions on time.', ['can to', 'able', 'could to'], 'Able to is the correct phrase.', 'We were ___ answer. Students choose able to.'],
    ['You ', 'may', ' start when the teacher says so.', ['may to', 'must to', 'can to'], 'May can give formal permission.', 'You ___ begin. Students choose may.'],
    ['They could not ', 'understand', ' the paragraph without context.', ['to understand', 'understood', 'understanding'], 'Could not is followed by base verb.', 'They could not ___. Students choose understand.'],
    ['The app ', 'can', ' add more practice after mistakes.', ['can to', 'is can', 'must to'], 'Can is followed by base verb.', 'The app ___ help. Students choose can.'],
    ['Visitors are ', 'allowed to', ' enter after registration.', ['allowed', 'can to', 'must to'], 'Allowed to is the complete phrase.', 'Visitors are ___ enter. Students choose allowed to.'],
    ['With feedback, students are ', 'able to', ' explain their choices.', ['able', 'can to', 'could to'], 'Able to needs to before the verb.', 'They are ___ improve. Students choose able to.'],
  ]);

  return finalize('comparativesModals', questions);
}

function buildConjunctionQuestions() {
  const questions: DraftQuestion[] = [];

  appendRows(questions, {
    skill: 'conjunctions',
    level: 1,
    focus: 'cause with because',
    question: 'Choose the connector that best completes the sentence.',
    miniRule: 'Because introduces a reason or cause.',
    strategy: 'Ask why the action happened.',
    teacherPrompt: 'Ask students to answer the why question before reading options.',
    explanation: (correct) => `${correct} introduces the reason for the first idea.`,
  }, [
    ['She stayed after class ', 'because', ' she wanted feedback.', ['although', 'so', 'however'], 'The second part gives the reason.', 'She practiced ___ she had a test. Students choose because.'],
    ['We chose option A ', 'because', ' it matches the context.', ['although', 'therefore', 'but'], 'The second part explains why.', 'I answered B ___ it fits. Students choose because.'],
    ['Carlos read the text again ', 'because', ' the first answer was unclear.', ['so', 'although', 'however'], 'The reason comes after the blank.', 'He reread ___ he was unsure. Students choose because.'],
    ['The teacher paused ', 'because', ' several students looked confused.', ['although', 'therefore', 'so'], 'Confusion explains the pause.', 'She stopped ___ they had questions. Students choose because.'],
    ['Ana used a dictionary at home ', 'because', ' she wanted to learn new words.', ['but', 'although', 'therefore'], 'The second part is her reason.', 'She studied ___ she wanted progress. Students choose because.'],
    ['The group reviewed articles ', 'because', ' many mistakes came from a/an/the.', ['so', 'however', 'unless'], 'The mistakes explain the review.', 'They reviewed ___ errors repeated. Students choose because.'],
    ['I marked option D as wrong ', 'because', ' it changed the tense.', ['although', 'so', 'therefore'], 'The tense change gives the reason.', 'It is wrong ___ it changes meaning. Students choose because.'],
    ['Students need context ', 'because', ' grammar alone is not enough.', ['but', 'although', 'therefore'], 'The second idea explains why.', 'Use context ___ form is not enough. Students choose because.'],
    ['She took notes ', 'because', ' she often forgets prepositions.', ['so', 'however', 'although'], 'Forgetting explains the action.', 'She wrote it down ___ it was new. Students choose because.'],
  ]);

  appendRows(questions, {
    skill: 'conjunctions',
    level: 1,
    focus: 'result with so',
    question: 'Choose the connector that best completes the sentence.',
    miniRule: 'So introduces a result or consequence in the same sentence.',
    strategy: 'Ask what happened as a result.',
    teacherPrompt: 'Ask students to label cause and result.',
    explanation: (correct) => `${correct} introduces the result of the first idea.`,
  }, [
    ['She practiced daily, ', 'so', ' her score improved.', ['because', 'although', 'however'], 'Improvement is the result.', 'It was late, ___ we left. Students choose so.'],
    ['The question was difficult, ', 'so', ' we read it twice.', ['because', 'although', 'unless'], 'Reading twice is the result.', 'The text was hard, ___ we reread. Students choose so.'],
    ['The app found an error, ', 'so', ' it added a reinforcement item.', ['although', 'because', 'however'], 'The reinforcement is the consequence.', 'The app detected a gap, ___ it helped. Students choose so.'],
    ['The paragraph had no time marker, ', 'so', ' the tense was harder to choose.', ['because', 'although', 'unless'], 'Harder choice is the result.', 'There was no clue, ___ it was hard. Students choose so.'],
    ['Ana confused much and many, ', 'so', ' the teacher gave extra examples.', ['because', 'although', 'however'], 'Extra examples are the result.', 'She made an error, ___ we reviewed. Students choose so.'],
    ['The first option changed the meaning, ', 'so', ' we eliminated it.', ['because', 'although', 'unless'], 'Eliminating follows from the problem.', 'It changed meaning, ___ it was wrong. Students choose so.'],
    ['The students finished early, ', 'so', ' they reviewed their mistakes.', ['because', 'although', 'however'], 'Reviewing is the result.', 'They had time, ___ they reviewed. Students choose so.'],
    ['The instructions were clear, ', 'so', ' most students started quickly.', ['although', 'because', 'unless'], 'Starting quickly is the result.', 'The task was clear, ___ they began. Students choose so.'],
    ['The answer needed a contrast, ', 'so', ' however was the best choice.', ['because', 'although', 'unless'], 'Choosing however is the result.', 'It needed contrast, ___ we chose however. Students choose so.'],
  ]);

  appendRows(questions, {
    skill: 'conjunctions',
    level: 2,
    focus: 'contrast with although',
    question: 'Choose the connector that best completes the sentence.',
    miniRule: 'Although introduces a contrast between two true ideas.',
    strategy: 'If one idea is unexpected because of the other, test although.',
    teacherPrompt: 'Ask what expectation the second idea breaks.',
    explanation: (correct) => `${correct} shows contrast between the two clauses.`,
  }, [
    ['', 'Although', ' the text was short, it was difficult.', ['Because', 'So', 'Therefore'], 'Short but difficult is contrast.', '___ it was late, we continued. Students choose Although.'],
    ['', 'Although', ' Ana was nervous, she answered carefully.', ['Because', 'So', 'Therefore'], 'Nervous but careful is contrast.', '___ she was tired, she studied. Students choose Although.'],
    ['', 'Although', ' the option looked correct, it changed the meaning.', ['Because', 'So', 'Unless'], 'Looking correct contrasts with being wrong.', '___ it looked right, it failed. Students choose Although.'],
    ['', 'Although', ' students knew the rule, they forgot the context.', ['Because', 'Therefore', 'So'], 'Knowing the rule contrasts with forgetting context.', '___ they practiced, they erred. Students choose Although.'],
    ['', 'Although', ' the paragraph had many clues, Luis guessed.', ['Because', 'So', 'Therefore'], 'Many clues make guessing unexpected.', '___ clues were clear, he guessed. Students choose Although.'],
    ['', 'Although', ' the teacher gave examples, some learners were confused.', ['Because', 'So', 'Unless'], 'Examples did not prevent confusion.', '___ she explained, they asked. Students choose Although.'],
    ['', 'Although', ' the first sentence is positive, the second one gives a warning.', ['Because', 'Therefore', 'So'], 'Positive versus warning is contrast.', '___ it starts well, it warns. Students choose Although.'],
    ['', 'Although', ' he had little time, he checked every option.', ['Because', 'So', 'Therefore'], 'Little time makes checking unexpected.', '___ he was rushed, he checked. Students choose Although.'],
    ['', 'Although', ' option B uses correct grammar, it does not fit the meaning.', ['Because', 'So', 'Therefore'], 'Correct grammar contrasts with wrong meaning.', '___ grammar is correct, meaning fails. Students choose Although.'],
  ]);

  appendRows(questions, {
    skill: 'conjunctions',
    level: 2,
    focus: 'contrast with but',
    question: 'Choose the connector that best completes the sentence.',
    miniRule: 'But connects two contrasting ideas in the same sentence.',
    strategy: 'Look for a change in direction between clause one and clause two.',
    teacherPrompt: 'Ask what the reader expected after the first clause.',
    explanation: (correct) => `${correct} connects two ideas that contrast.`,
  }, [
    ['The answer looked easy, ', 'but', ' the context changed everything.', ['so', 'because', 'unless'], 'Easy contrasts with hidden difficulty.', 'It looked right, ___ it was wrong. Students choose but.'],
    ['Ana wanted to answer fast, ', 'but', ' she read the sentence again.', ['so', 'because', 'therefore'], 'Wanting speed contrasts with rereading.', 'He wanted speed, ___ he checked. Students choose but.'],
    ['The text was short, ', 'but', ' it had complex grammar.', ['so', 'because', 'unless'], 'Short contrasts with complex.', 'It was short, ___ hard. Students choose but.'],
    ['Option C had the right tense, ', 'but', ' the pronoun was wrong.', ['so', 'because', 'therefore'], 'Right tense contrasts with wrong pronoun.', 'It had tense, ___ not meaning. Students choose but.'],
    ['We reviewed the rule, ', 'but', ' we still needed more examples.', ['so', 'because', 'unless'], 'Review did not fully solve the issue.', 'We studied, ___ needed practice. Students choose but.'],
    ['The student knew the vocabulary, ', 'but', ' he missed the connector.', ['so', 'because', 'therefore'], 'Vocabulary knowledge contrasts with connector error.', 'He knew words, ___ missed logic. Students choose but.'],
    ['The app is simple, ', 'but', ' the feedback is detailed.', ['so', 'because', 'unless'], 'Simple interface contrasts with detailed feedback.', 'It is simple, ___ powerful. Students choose but.'],
    ['Some options are grammatical, ', 'but', ' only one matches the paragraph.', ['so', 'because', 'therefore'], 'Grammatical contrasts with semantically correct.', 'Many work, ___ one fits. Students choose but.'],
    ['The teacher gave a hint, ', 'but', ' Luis chose too quickly.', ['so', 'because', 'unless'], 'Hint did not prevent speed error.', 'She helped, ___ he rushed. Students choose but.'],
  ]);

  appendRows(questions, {
    skill: 'conjunctions',
    level: 3,
    focus: 'however transition',
    question: 'Choose the connector that best completes the sentence.',
    miniRule: 'However connects complete ideas and signals contrast.',
    strategy: 'Check punctuation and meaning; however often follows a period or semicolon.',
    teacherPrompt: 'Ask students to replace however with but and compare meaning.',
    explanation: (correct) => `${correct} introduces contrast between complete ideas.`,
  }, [
    ['The rule is simple; ', 'however', ', many students forget it under pressure.', ['therefore', 'because', 'so'], 'Simple rule contrasts with forgetting.', 'The text is short; ___, it is hard. Students choose however.'],
    ['The option is grammatical; ', 'however', ', it does not answer the question.', ['therefore', 'because', 'so'], 'Grammar contrasts with wrong meaning.', 'It is correct form; ___, wrong meaning. Students choose however.'],
    ['The class practiced all week; ', 'however', ', the final task was still challenging.', ['therefore', 'because', 'so'], 'Practice contrasts with difficulty.', 'We practiced; ___, it was hard. Students choose however.'],
    ['The paragraph gives a clue; ', 'however', ', it appears after the blank.', ['therefore', 'because', 'so'], 'Clue exists but placement creates difficulty.', 'There is a clue; ___, it is hidden. Students choose however.'],
    ['Ana knew the vocabulary; ', 'however', ', she missed the tense marker.', ['therefore', 'because', 'so'], 'Vocabulary knowledge contrasts with tense mistake.', 'She knew words; ___, missed grammar. Students choose however.'],
    ['The explanation was clear; ', 'however', ', some students needed another example.', ['therefore', 'because', 'so'], 'Clear explanation contrasts with need for more.', 'It was clear; ___, they asked. Students choose however.'],
    ['The answer seemed obvious; ', 'however', ', the last sentence changed the relation.', ['therefore', 'because', 'so'], 'Obvious contrasts with changed relation.', 'It seemed obvious; ___, context changed. Students choose however.'],
    ['Most options were easy to eliminate; ', 'however', ', two were very close.', ['therefore', 'because', 'so'], 'Easy elimination contrasts with close choices.', 'Most were easy; ___, two were close. Students choose however.'],
    ['The student improved in grammar; ', 'however', ', connectors remained difficult.', ['therefore', 'because', 'so'], 'Improvement contrasts with remaining weakness.', 'Grammar improved; ___, connectors did not. Students choose however.'],
  ]);

  appendRows(questions, {
    skill: 'conjunctions',
    level: 3,
    focus: 'therefore and as a result',
    question: 'Choose the connector that best completes the sentence.',
    miniRule: 'Therefore and as a result introduce a consequence after a complete idea.',
    strategy: 'Ask if the second idea follows logically from the first.',
    teacherPrompt: 'Ask students to mark cause and consequence.',
    explanation: (correct) => `${correct} introduces a logical consequence.`,
  }, [
    ['The text gives no reason for option A; ', 'therefore', ', we should eliminate it.', ['however', 'although', 'because'], 'Elimination follows from no reason.', 'No evidence; ___, eliminate it. Students choose therefore.'],
    ['The group practiced daily; ', 'as a result', ', their accuracy improved.', ['however', 'although', 'because'], 'Improvement is a consequence.', 'They practiced; ___, they improved. Students choose as a result.'],
    ['The sentence uses yesterday; ', 'therefore', ', past simple is likely.', ['however', 'although', 'because'], 'Past simple follows from yesterday.', 'It says yesterday; ___, use past. Students choose therefore.'],
    ['The subject is plural; ', 'therefore', ', the verb should not take -s.', ['however', 'although', 'because'], 'Verb choice follows from subject.', 'Subject is plural; ___, no -s. Students choose therefore.'],
    ['The connector shows contrast; ', 'as a result', ', because cannot be correct.', ['however', 'although', 'because'], 'The wrong option follows from contrast relation.', 'It is contrast; ___, cause is wrong. Students choose as a result.'],
    ['The answer changes the meaning; ', 'therefore', ', it is a distractor.', ['however', 'although', 'because'], 'Being a distractor follows from changed meaning.', 'It changes meaning; ___, reject it. Students choose therefore.'],
    ['Students read more slowly; ', 'as a result', ', they noticed more clues.', ['however', 'although', 'because'], 'Noticing clues is the consequence.', 'They slowed down; ___, saw clues. Students choose as a result.'],
    ['The noun is uncountable; ', 'therefore', ', much is better than many.', ['however', 'although', 'because'], 'Quantifier choice follows from noun type.', 'Noun is uncountable; ___, use much. Students choose therefore.'],
    ['The first clause gives a condition; ', 'therefore', ', if is a strong option.', ['however', 'although', 'because'], 'If follows from condition.', 'It is a condition; ___, choose if. Students choose therefore.'],
  ]);

  appendRows(questions, {
    skill: 'conjunctions',
    level: 2,
    focus: 'condition with if',
    question: 'Choose the connector that best completes the sentence.',
    miniRule: 'If introduces a condition.',
    strategy: 'Ask what must happen for the result to be true.',
    teacherPrompt: 'Ask students to split the condition and the result.',
    explanation: (correct) => `${correct} introduces the condition for the result.`,
  }, [
    ['', 'If', ' you read the context, the answer becomes clearer.', ['Because', 'Although', 'Therefore'], 'Reading context is the condition.', '___ you practice, you improve. Students choose If.'],
    ['', 'If', ' Ana studies tonight, she will feel prepared.', ['Although', 'So', 'However'], 'Studying is the condition.', '___ she reviews, she improves. Students choose If.'],
    ['', 'If', ' the subject is plural, do not add -s.', ['Because', 'Although', 'Therefore'], 'Plural subject is the condition.', '___ it is plural, use base verb. Students choose If.'],
    ['', 'If', ' the noun is uncountable, choose much instead of many.', ['Although', 'So', 'However'], 'Uncountable noun is the condition.', '___ it is uncountable, use much. Students choose If.'],
    ['', 'If', ' the ideas oppose each other, use a contrast connector.', ['Because', 'So', 'Therefore'], 'Opposition is the condition.', '___ ideas contrast, use however. Students choose If.'],
    ['', 'If', ' students explain their choices, feedback is stronger.', ['Although', 'So', 'However'], 'Explaining choices is the condition.', '___ they explain, they learn. Students choose If.'],
    ['', 'If', ' the sentence says ago, past simple is likely.', ['Because', 'Although', 'Therefore'], 'Ago is the condition for past simple.', '___ it says yesterday, use past. Students choose If.'],
    ['', 'If', ' option B changes the meaning, eliminate it.', ['Although', 'So', 'However'], 'Changing meaning is the condition.', '___ it changes meaning, reject it. Students choose If.'],
    ['', 'If', ' we finish early, we can review mistakes.', ['Because', 'Although', 'Therefore'], 'Finishing early is the condition.', '___ we finish, we review. Students choose If.'],
  ]);

  appendRows(questions, {
    skill: 'conjunctions',
    level: 3,
    focus: 'negative condition with unless',
    question: 'Choose the connector that best completes the sentence.',
    miniRule: 'Unless means if not.',
    strategy: 'Rewrite unless as if not to test the sentence.',
    teacherPrompt: 'Ask students to paraphrase the sentence with if not.',
    explanation: (correct) => `${correct} introduces a negative condition.`,
  }, [
    ['You will miss the clue ', 'unless', ' you read the next sentence.', ['because', 'so', 'although'], 'Unless means if you do not read.', 'You will forget ___ you practice. Students choose unless.'],
    ['Ana will not improve ', 'unless', ' she reviews her mistakes.', ['because', 'so', 'although'], 'If she does not review, she will not improve.', 'He will fail ___ he studies. Students choose unless.'],
    ['Do not choose an option ', 'unless', ' it fits the whole paragraph.', ['because', 'so', 'although'], 'Only choose if it fits.', 'Do not answer ___ you know why. Students choose unless.'],
    ['The answer is not safe ', 'unless', ' the context supports it.', ['because', 'so', 'although'], 'It is safe only if context supports it.', 'It is wrong ___ evidence supports it. Students choose unless.'],
    ['Students will keep guessing ', 'unless', ' they learn to name the relation.', ['because', 'so', 'although'], 'If they do not learn, they guess.', 'They will guess ___ they analyze. Students choose unless.'],
    ['You cannot use many ', 'unless', ' the noun is plural countable.', ['because', 'so', 'although'], 'Many works only with plural countable nouns.', 'Use many ___ noun is countable. Students choose unless.'],
    ['The group will lose time ', 'unless', ' everyone reads the instructions.', ['because', 'so', 'although'], 'If not everyone reads, time is lost.', 'We lose time ___ we plan. Students choose unless.'],
    ['Do not change the tense ', 'unless', ' the time marker requires it.', ['because', 'so', 'although'], 'Only change with a time clue.', 'Do not change it ___ needed. Students choose unless.'],
    ['The explanation will not help ', 'unless', ' students apply it immediately.', ['because', 'so', 'although'], 'It helps only if they apply it.', 'It will not work ___ we use it. Students choose unless.'],
  ]);

  appendRows(questions, {
    skill: 'conjunctions',
    level: 3,
    focus: 'while and whereas',
    question: 'Choose the connector that best completes the sentence.',
    miniRule: 'While and whereas can contrast two facts; while can also show simultaneous actions.',
    strategy: 'Decide if the relation is contrast or time.',
    teacherPrompt: 'Ask students whether both ideas happen at the same time or are being compared.',
    explanation: (correct) => `${correct} fits the contrast or simultaneous action relation.`,
  }, [
    ['Some students prefer grammar drills, ', 'whereas', ' others prefer full texts.', ['because', 'so', 'therefore'], 'The sentence contrasts two groups.', 'Some like A, ___ others like B. Students choose whereas.'],
    ['Ana checked the subject ', 'while', ' Carlos checked the connector.', ['because', 'therefore', 'unless'], 'Two actions happen at the same time.', 'She read ___ he wrote. Students choose while.'],
    ['Option A gives a cause, ', 'whereas', ' option B gives a contrast.', ['because', 'so', 'therefore'], 'The sentence compares two options.', 'A is cause, ___ B is contrast. Students choose whereas.'],
    ['The teacher explained the rule ', 'while', ' students copied examples.', ['because', 'therefore', 'unless'], 'Actions happen simultaneously.', 'She explained ___ they listened. Students choose while.'],
    ['The first paragraph is descriptive, ', 'whereas', ' the second presents a problem.', ['because', 'so', 'therefore'], 'Two paragraphs are contrasted.', 'First is easy, ___ second is hard. Students choose whereas.'],
    ['Luis looked for time markers ', 'while', ' Ana analyzed pronouns.', ['because', 'therefore', 'unless'], 'Two actions occur in parallel.', 'He checked tense ___ she checked subject. Students choose while.'],
    ['Because explains a reason, ', 'whereas', ' so explains a result.', ['because', 'therefore', 'unless'], 'Two connector functions are compared.', 'Although contrasts, ___ because causes. Students choose whereas.'],
    ['The app saved the score ', 'while', ' the student read feedback.', ['because', 'therefore', 'unless'], 'Actions happen at the same time.', 'It loaded ___ she waited. Students choose while.'],
    ['Many is countable, ', 'whereas', ' much is uncountable.', ['because', 'so', 'therefore'], 'The sentence contrasts two uses.', 'Few counts, ___ little does not. Students choose whereas.'],
  ]);

  appendRows(questions, {
    skill: 'conjunctions',
    level: 2,
    focus: 'time connectors',
    question: 'Choose the connector that best completes the sentence.',
    miniRule: 'Before, after and when order events in time.',
    strategy: 'Number the events 1 and 2 before choosing.',
    teacherPrompt: 'Ask students which action happens first.',
    explanation: (correct) => `${correct} correctly orders the two events.`,
  }, [
    ['Read the sentence ', 'before', ' you look at the options.', ['because', 'although', 'therefore'], 'Reading should happen first.', 'Check context ___ answering. Students choose before.'],
    ['We discussed errors ', 'after', ' the session ended.', ['because', 'although', 'therefore'], 'Discussion happens later.', 'Review ___ finishing. Students choose after.'],
    ['', 'When', ' the teacher arrived, students were comparing answers.', ['Because', 'Although', 'Therefore'], 'When introduces the time of the action.', '___ class started, we listened. Students choose When.'],
    ['Underline the subject ', 'before', ' choosing the verb.', ['because', 'although', 'therefore'], 'Underlining happens first.', 'Find the noun ___ choosing. Students choose before.'],
    ['Students felt confident ', 'after', ' they practiced with feedback.', ['because', 'although', 'therefore'], 'Confidence comes later.', 'They improved ___ practice. Students choose after.'],
    ['', 'When', ' a noun is uncountable, many is usually wrong.', ['Because', 'Although', 'Therefore'], 'When introduces a condition/time-like situation.', '___ it is plural, use many. Students choose When.'],
    ['Compare both clauses ', 'before', ' selecting a connector.', ['because', 'although', 'therefore'], 'Comparison should happen first.', 'Compare ideas ___ answering. Students choose before.'],
    ['The group celebrated ', 'after', ' their accuracy improved.', ['because', 'although', 'therefore'], 'Celebration comes after improvement.', 'They celebrated ___ improving. Students choose after.'],
    ['', 'When', ' the answer changes the meaning, eliminate it.', ['Because', 'Although', 'Therefore'], 'When introduces the situation.', '___ it changes meaning, reject it. Students choose When.'],
  ]);

  return finalize('conjunctions', questions);
}

function buildClozeCohesionQuestions() {
  const questions: DraftQuestion[] = [];

  appendRows(questions, {
    skill: 'clozeCohesion',
    level: 3,
    focus: 'cloze contrast connector',
    question: 'Choose the best word for the blank.',
    miniRule: 'A cloze connector must fit the sentence before and after the blank.',
    strategy: 'Read one sentence before and one sentence after the blank.',
    teacherPrompt: 'Ask students what changes after the blank.',
    explanation: (correct) => `${correct} creates the contrast needed in the mini text.`,
  }, [
    ['Practice tests are useful. ', 'However', ', they do not replace careful feedback.', ['Because', 'Therefore', 'So'], 'The second sentence limits the first idea.', 'Replace However with Because and test meaning.'],
    ['The paragraph looks simple. ', 'However', ', the connector changes the meaning.', ['Because', 'Therefore', 'So'], 'Simple contrasts with hidden difficulty.', 'Ask why simple but difficult creates contrast.'],
    ['Many students know the rule. ', 'However', ', they forget it under pressure.', ['Because', 'Therefore', 'So'], 'Knowing contrasts with forgetting.', 'Make a sentence with however about exams.'],
    ['The answer is grammatical. ', 'However', ', it does not fit the context.', ['Because', 'Therefore', 'So'], 'Correct form contrasts with wrong context.', 'Explain why grammar alone is not enough.'],
    ['The exercise is short. ', 'However', ', it tests several skills.', ['Because', 'Therefore', 'So'], 'Short contrasts with several skills.', 'Replace with but and compare punctuation.'],
    ['The hint helps. ', 'However', ', students still need to justify the answer.', ['Because', 'Therefore', 'So'], 'Help contrasts with remaining responsibility.', 'Ask students to justify one answer.'],
    ['Option B sounds natural. ', 'However', ', it changes the time of the action.', ['Because', 'Therefore', 'So'], 'Natural sound contrasts with wrong tense.', 'Ask which word changes time.'],
    ['The first sentence gives a positive idea. ', 'However', ', the second sentence warns about a risk.', ['Because', 'Therefore', 'So'], 'Positive idea contrasts with warning.', 'Underline positive idea and warning.'],
    ['The group improved in vocabulary. ', 'However', ', grammar errors continued.', ['Because', 'Therefore', 'So'], 'Improvement contrasts with remaining errors.', 'Name the two contrasted skills.'],
  ]);

  appendRows(questions, {
    skill: 'clozeCohesion',
    level: 2,
    focus: 'cloze cause and result',
    question: 'Choose the best word for the blank.',
    miniRule: 'Because gives a cause; so gives a result.',
    strategy: 'Decide whether the blank points backward to a reason or forward to a consequence.',
    teacherPrompt: 'Ask students to mark C for cause and R for result.',
    explanation: (correct) => `${correct} fits the cause-result relation in the mini text.`,
  }, [
    ['The students read too fast, ', 'so', ' they missed the clue.', ['because', 'although', 'however'], 'Missing the clue is the result.', 'Identify cause and result in the sentence.'],
    ['Ana chose option C ', 'because', ' it explained the contrast.', ['so', 'although', 'therefore'], 'The second part gives the reason.', 'Ask why Ana chose C.'],
    ['The app detected a repeated error, ', 'so', ' it added a similar question.', ['because', 'although', 'however'], 'Adding a question is the result.', 'Make a so sentence about feedback.'],
    ['Luis reviewed articles ', 'because', ' he confused a and an.', ['so', 'although', 'therefore'], 'Confusion explains the review.', 'Ask why Luis reviewed articles.'],
    ['The text has a time marker, ', 'so', ' the tense is easier to identify.', ['because', 'although', 'however'], 'Easier tense choice is the result.', 'Find the time marker in a sample.'],
    ['Students compared options ', 'because', ' two answers looked similar.', ['so', 'although', 'therefore'], 'Similarity explains comparison.', 'Ask why comparison was necessary.'],
    ['The paragraph gives no evidence, ', 'so', ' option D is weak.', ['because', 'although', 'however'], 'Weak option follows from no evidence.', 'Show what evidence would look like.'],
    ['The teacher used examples ', 'because', ' the rule was abstract.', ['so', 'although', 'therefore'], 'Abstract rule explains the examples.', 'Ask students for a concrete example.'],
    ['The subject is plural, ', 'so', ' the verb needs the base form.', ['because', 'although', 'however'], 'Base form follows from plural subject.', 'Change the subject to singular.'],
  ]);

  appendRows(questions, {
    skill: 'clozeCohesion',
    level: 2,
    focus: 'cloze verb form',
    question: 'Choose the best word for the blank.',
    miniRule: 'In cloze, the blank may test local grammar inside a paragraph.',
    strategy: 'Find the subject that controls the verb.',
    teacherPrompt: 'Ask students to point to the subject before the blank.',
    explanation: (correct) => `${correct} agrees with the subject and context in the sentence.`,
  }, [
    ['When learners explain an answer, they ', 'improve', ' their own understanding.', ['improves', 'improving', 'improved'], 'They is plural.', 'Change they to he and adjust the verb.'],
    ['A good strategy ', 'helps', ' students avoid distractors.', ['help', 'helping', 'helped'], 'Strategy is singular.', 'Change strategy to strategies.'],
    ['The examples in the guide ', 'show', ' how connectors work.', ['shows', 'showing', 'showed'], 'Examples is plural.', 'Find the head noun.'],
    ['Each practice session ', 'includes', ' feedback at the end.', ['include', 'including', 'included'], 'Each session is singular.', 'Make another each sentence.'],
    ['The information in the report ', 'is', ' useful for teachers.', ['are', 'be', 'were'], 'Information is uncountable.', 'Name three uncountable nouns.'],
    ['Students who compare options ', 'notice', ' more clues.', ['notices', 'noticing', 'noticed'], 'Students is plural.', 'Underline the relative clause.'],
    ['The list of mistakes ', 'is', ' shorter after feedback.', ['are', 'be', 'were'], 'List is the head noun.', 'Cross out of mistakes.'],
    ['Most answers ', 'depend', ' on the sentence before the blank.', ['depends', 'depending', 'depended'], 'Answers is plural.', 'Replace answers with answer.'],
    ['One of the options ', 'changes', ' the meaning of the paragraph.', ['change', 'changing', 'changed'], 'One of means singular.', 'Make another one of sentence.'],
  ]);

  appendRows(questions, {
    skill: 'clozeCohesion',
    level: 3,
    focus: 'cloze tense markers',
    question: 'Choose the best word for the blank.',
    miniRule: 'Time markers in the text often decide the verb tense.',
    strategy: 'Find words such as yesterday, since, when, now, by the time or tomorrow.',
    teacherPrompt: 'Ask students to build a mini timeline.',
    explanation: (correct) => `${correct} fits the time marker in the mini text.`,
  }, [
    ['Last week, the class ', 'reviewed', ' passive voice.', ['reviews', 'has reviewed', 'reviewing'], 'Last week points to past simple.', 'Replace last week with every week.'],
    ['Since March, Ana has ', 'practiced', ' cloze questions.', ['practice', 'practices', 'practicing'], 'Has needs a participle.', 'Make a since sentence.'],
    ['When the teacher arrived, students ', 'were comparing', ' answers.', ['compare', 'have compared', 'compares'], 'The action was in progress.', 'Draw the interrupted action.'],
    ['By the time the quiz began, we ', 'had reviewed', ' all connectors.', ['review', 'reviewed', 'have reviewed'], 'Review happened before the quiz.', 'Mark first and second event.'],
    ['Tomorrow, students ', 'are going to take', ' a diagnostic session.', ['took', 'take', 'have taken'], 'Tomorrow points to future plan.', 'Make a tomorrow sentence.'],
    ['Right now, the app ', 'is showing', ' feedback.', ['shows', 'showed', 'has shown'], 'Right now points to present continuous.', 'Describe what is happening now.'],
    ['If we practice tonight, we ', 'will feel', ' more prepared.', ['felt', 'feel', 'would felt'], 'This is a real future condition.', 'Split condition and result.'],
    ['The report ', 'was published', ' after the workshop.', ['published', 'publishes', 'is publishing'], 'The report receives the action.', 'Ask who published it.'],
    ['She said she ', 'needed', ' another example.', ['needs', 'need', 'has needed'], 'Said is past reported speech.', 'Turn it into direct speech.'],
  ]);

  appendRows(questions, {
    skill: 'clozeCohesion',
    level: 2,
    focus: 'cloze articles and determiners',
    question: 'Choose the best word for the blank.',
    miniRule: 'Articles and determiners depend on sound, specificity and countability.',
    strategy: 'Check the noun after the blank before choosing.',
    teacherPrompt: 'Ask whether the noun is singular countable, plural or uncountable.',
    explanation: (correct) => `${correct} fits the noun and context after the blank.`,
  }, [
    ['A learner should not ignore ', 'the', ' same mistake twice.', ['a', 'an', 'No article'], 'Same usually takes the.', 'Make three phrases with the same.'],
    ['The text gives ', 'an', ' example of contrast.', ['a', 'the', 'No article'], 'Example begins with a vowel sound.', 'Say the next word aloud.'],
    ['Students need ', 'No article', ' practice, not just memorized rules.', ['the', 'a', 'an'], 'Practice is general and uncountable.', 'Name a general uncountable noun.'],
    ['There is not ', 'any', ' evidence for that answer.', ['some', 'many', 'a few'], 'Negative sentence.', 'Turn it positive with some.'],
    ['The teacher gave ', 'some', ' advice after the session.', ['any', 'many', 'a'], 'Advice is uncountable in a positive sentence.', 'Explain why many is wrong.'],
    ['This is ', 'the', ' most useful clue in the paragraph.', ['a', 'an', 'No article'], 'Most useful is superlative.', 'Find another superlative.'],
    ['Bring ', 'a', ' pencil for the practice test.', ['an', 'the', 'No article'], 'Pencil is singular countable.', 'Change pencil to pencils.'],
    ['She wrote ', 'an', ' honest explanation.', ['a', 'the', 'No article'], 'Honest begins with vowel sound.', 'Compare a house and an hour.'],
    ['Only ', 'a few', ' students noticed the pronoun reference.', ['a little', 'much', 'any'], 'Students is plural countable.', 'Contrast a few and a little.'],
  ]);

  appendRows(questions, {
    skill: 'clozeCohesion',
    level: 3,
    focus: 'cloze pronoun reference',
    question: 'Choose the best word for the blank.',
    miniRule: 'Pronouns must match the noun they replace and their role in the sentence.',
    strategy: 'Find the noun before choosing the pronoun.',
    teacherPrompt: 'Ask what the pronoun refers to.',
    explanation: (correct) => `${correct} correctly refers back to a noun in the mini text.`,
  }, [
    ['Students learn rules and use ', 'them', ' in context.', ['they', 'their', 'these'], 'Them replaces rules after the verb use.', 'Ask what them refers to.'],
    ['The teacher gave Ana feedback, and ', 'she', ' used it immediately.', ['her', 'hers', 'herself'], 'She refers to Ana as subject.', 'Replace Ana with Carlos.'],
    ['The paragraph has two ideas; ', 'they', ' contrast with each other.', ['them', 'their', 'these'], 'They refers to two ideas as subject.', 'Ask what they refers to.'],
    ['This strategy is useful because ', 'it', ' slows down guessing.', ['they', 'them', 'its'], 'It refers to this strategy.', 'Replace strategy with strategies.'],
    ['The answers are similar, but one of ', 'them', ' changes the tense.', ['they', 'their', 'these'], 'Them follows of.', 'Ask why they is wrong after of.'],
    ['Luis and Ana checked ', 'their', ' answers before submitting.', ['there', 'they are', 'them'], 'Their shows possession before answers.', 'Contrast their/there/they are.'],
    ['The app stores the score and shows ', 'it', ' at the end.', ['they', 'them', 'its'], 'It replaces the score.', 'Ask what it refers to.'],
    ['Good readers ask ', 'themselves', ' why an option is wrong.', ['them', 'they', 'their'], 'The subject and object are the same people.', 'Make a reflexive sentence.'],
    ['The rule is simple, but applying ', 'it', ' takes practice.', ['they', 'them', 'its'], 'It replaces the rule after applying.', 'Ask what applying it means.'],
  ]);

  appendRows(questions, {
    skill: 'clozeCohesion',
    level: 3,
    focus: 'cloze prepositions and chunks',
    question: 'Choose the best word for the blank.',
    miniRule: 'Cloze often tests fixed chunks such as interested in, depend on, according to and good at.',
    strategy: 'Read the word before the blank and test common chunks.',
    teacherPrompt: 'Ask students to reuse the chunk in a new sentence.',
    explanation: (correct) => `${correct} completes a common English chunk in context.`,
  }, [
    ['Some students are good ', 'at', ' finding grammar clues.', ['in', 'on', 'to'], 'Good at is the chunk.', 'Make a good at sentence.'],
    ['The answer depends ', 'on', ' the previous sentence.', ['in', 'at', 'of'], 'Depend on is the chunk.', 'Ask what the answer depends on.'],
    ['According ', 'to', ' the text, the program is free.', ['with', 'at', 'for'], 'According to introduces a source.', 'Make an according to sentence.'],
    ['The paragraph talks ', 'about', ' a school project.', ['of', 'for', 'with'], 'Talks about introduces the topic.', 'Ask what the paragraph is about.'],
    ['She is interested ', 'in', ' improving her English score.', ['on', 'at', 'of'], 'Interested in is the chunk.', 'Make an interested in sentence.'],
    ['The teacher waited ', 'for', ' students to justify the answer.', ['to', 'at', 'on'], 'Wait for is the chunk.', 'Ask what she waited for.'],
    ['This example is similar ', 'to', ' the previous one.', ['with', 'than', 'as'], 'Similar to is the chunk.', 'Compare two examples.'],
    ['The result was different ', 'from', ' what students expected.', ['than', 'to', 'with'], 'Different from is common.', 'Make a different from sentence.'],
    ['The text is divided ', 'into', ' three short parts.', ['on', 'at', 'for'], 'Divided into is the chunk.', 'Divide a paragraph into parts.'],
  ]);

  appendRows(questions, {
    skill: 'clozeCohesion',
    level: 4,
    focus: 'cloze modals and comparison',
    question: 'Choose the best word for the blank.',
    miniRule: 'Modals and comparisons must match the function of the sentence.',
    strategy: 'Identify advice, obligation, possibility, comparison or sufficiency.',
    teacherPrompt: 'Ask students to name the function before choosing.',
    explanation: (correct) => `${correct} fits the function required by the sentence.`,
  }, [
    ['Before answering, students ', 'should', ' read the whole sentence.', ['might to', 'must to', 'would to'], 'This is advice.', 'Make one more should sentence.'],
    ['The official rules say students ', 'must not', ' use phones.', ['do not must', 'must to not', 'might to not'], 'This is prohibition.', 'Name another test rule.'],
    ['This clue is ', 'more useful', ' than the first one.', ['most useful', 'usefuller', 'more use'], 'Than signals comparative.', 'Make a more...than sentence.'],
    ['The paragraph is clear ', 'enough', ' to answer.', ['too', 'as', 'than'], 'Enough shows sufficiency.', 'Contrast too and enough.'],
    ['The answer ', 'might', ' be correct, but we need evidence.', ['must to', 'should to', 'can to'], 'Might shows possibility.', 'Say how certain might is.'],
    ['The lights are on, so someone ', 'must', ' be inside.', ['might not', 'cannot', 'should not'], 'The lights are strong evidence.', 'Explain deduction must.'],
    ['This is the ', 'best', ' option because it keeps the meaning.', ['better', 'good', 'well'], 'Best is superlative.', 'Compare good, better, best.'],
    ['Option A is not specific ', 'enough', ' for the paragraph.', ['too', 'as', 'than'], 'Enough shows insufficient specificity in negative form.', 'Make a not...enough sentence.'],
    ['Students are ', 'able to', ' improve when feedback is immediate.', ['able', 'can to', 'could to'], 'Able to is the correct phrase.', 'Make an able to sentence.'],
  ]);

  return finalize('clozeCohesion', questions);
}

export const GENERATED_ICFES_GRAMMAR_CONJUNCTION_QUESTIONS: IcfesGrammarConjunctionQuestion[] = [
  ...buildSubjectVerbAgreementQuestions(),
  ...buildVerbTenseQuestions(),
  ...buildArticlesDeterminersQuestions(),
  ...buildPrepositionQuestions(),
  ...buildPronounsQuantifiersQuestions(),
  ...buildComparativesModalsQuestions(),
  ...buildConjunctionQuestions(),
  ...buildClozeCohesionQuestions(),
];
