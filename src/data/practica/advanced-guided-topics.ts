export type GuidedEvidenceClass = 'empirical' | 'contested-social' | 'normative'

export type DiscussionQuestionKind =
  | 'experience'
  | 'pattern'
  | 'mechanism'
  | 'exception'
  | 'concept'
  | 'evidence'

export type ReadingBlockRole =
  | 'definition'
  | 'evidence'
  | 'example'
  | 'counterargument'
  | 'application'
  | 'scope-limit'

export interface GuidedDiscussionQuestion {
  id: string
  kind: DiscussionQuestionKind
  prompt: string
  teacherIntent: string
  followUps: string[]
}

export interface GuidedRecordingPrompt {
  id: 'baseline' | 'post-reading' | 'final'
  label: string
  targetSeconds: string
  prompt: string
  privacyNote: string
}

export interface GuidedReadingBlock {
  id: string
  role: ReadingBlockRole
  heading: string
  paragraphs: string[]
  prediction?: string
  pausePrompt?: string
  glossaryTerms: string[]
}

export interface GuidedVocabularyItem {
  term: string
  partOfSpeech: string
  meaning: string
  collocation: string
  example: string
}

export interface GuidedChoiceQuestion {
  id: string
  family: string
  prompt: string
  options: Array<{
    text: string
    feedback: string
  }>
  answer: number
  evidence: string
  errorCode: string
}

export interface GuidedAdvancedLesson {
  kind: 'guided-v3'
  slug: string
  sequence: number
  breadcrumbTitle: string
  title: string
  subtitle: string
  objective: string
  level: 'B2–C1'
  evidenceClass: GuidedEvidenceClass
  guidedMinutes: number
  selfStudyMinutes: number
  centralQuestion: string
  discussion: {
    targetMinutes: number
    questions: GuidedDiscussionQuestion[]
  }
  recordings: {
    baseline: GuidedRecordingPrompt
    postReading: GuidedRecordingPrompt
    final: GuidedRecordingPrompt
  }
  reading: {
    title: string
    dek: string
    blocks: GuidedReadingBlock[]
    argumentMap: Array<{ label: string; text: string }>
    sources: Array<{ label: string; href: string }>
  }
  vocabulary: GuidedVocabularyItem[]
  ieltsPractice: {
    title: string
    instruction: string
    questions: GuidedChoiceQuestion[]
  }
  listeningLab: {
    status: 'not-produced'
    relationship: 'complement + scenario'
    audioAFunction: string
    audioBFunction: string
    integrationPrompt: string
  }
  synthesis: {
    prompt: string
    checklist: string[]
  }
}

export const GUIDED_ADVANCED_PHASES = [
  { id: 'discussion', label: 'Discussion', shortLabel: 'Discuss', minutes: '20' },
  { id: 'baseline', label: 'First voice note', shortLabel: 'Voice I', minutes: '4' },
  { id: 'reading', label: 'Active reading', shortLabel: 'Read', minutes: '28' },
  { id: 'retrieval', label: 'What did you understand?', shortLabel: 'Retrieve', minutes: '10' },
  { id: 'vocabulary', label: 'Precision vocabulary', shortLabel: 'Words', minutes: '8' },
  { id: 'ielts', label: 'IELTS challenge', shortLabel: 'IELTS', minutes: '18' },
  { id: 'listening', label: 'Dual listening lab', shortLabel: 'Listen', minutes: '20' },
  { id: 'synthesis', label: 'Synthesis and return', shortLabel: 'Return', minutes: '12' },
] as const

const AFFECT_QUESTIONS: GuidedChoiceQuestion[] = [
  {
    id: 'affect-heading',
    family: 'Matching heading',
    prompt: 'Which heading best captures the function of “The useful speed of affect”?',
    options: [
      { text: 'A catalogue of emotions used in laboratory studies', feedback: 'The section defines a function; it does not catalogue separate emotions.' },
      { text: 'Why quick evaluation can help before it misleads', feedback: 'This preserves both functions of affect: efficient orientation and possible distortion.' },
      { text: 'Proof that fast decisions are usually inaccurate', feedback: 'The passage explicitly rejects the equation of speed with error.' },
      { text: 'How measured risk eliminates emotional reactions', feedback: 'Measured risk is a comparison point, not a method for eliminating emotion.' },
    ],
    answer: 1,
    evidence: 'Affect can provide a rapid orientation before a person has consciously listed reasons, but speed does not guarantee accuracy.',
    errorCode: 'detail-not-main-function',
  },
  {
    id: 'affect-pressure',
    family: 'Inference',
    prompt: 'What is the safest inference about time pressure from the experiments described?',
    options: [
      { text: 'It makes every participant underestimate all forms of risk.', feedback: 'The result is not universal and does not always point toward underestimation.' },
      { text: 'It prevents participants from forming separate impressions of benefit.', feedback: 'The study reports stronger coupling, not the complete disappearance of separate judgments.' },
      { text: 'It proves that deliberate reasoning is absent from rapid decisions.', feedback: 'The experiment measured judgments, not the total absence of deliberation.' },
      { text: 'It may strengthen the use of one evaluation across two judgments.', feedback: 'This is the calibrated inference supported by the reported relationship.' },
    ],
    answer: 3,
    evidence: 'Under time pressure, the inverse relationship between perceived risk and perceived benefit became stronger.',
    errorCode: 'certainty-inflation',
  },
  {
    id: 'affect-author-view',
    family: 'Yes / No / Not Given',
    prompt: 'The writer believes that a feeling is useless unless it agrees with measured risk.',
    options: [
      { text: 'No', feedback: 'The writer gives affect a useful role while limiting what it can establish.' },
      { text: 'Yes', feedback: 'This reverses the writer’s explicit refusal to treat emotion as useless.' },
      { text: 'Not Given', feedback: 'The writer directly discusses useful emotional information, so the view is stated.' },
      { text: 'Only under time pressure', feedback: 'This is not an IELTS Y/N/NG response and adds a condition the statement does not contain.' },
    ],
    answer: 0,
    evidence: 'A feeling may signal urgency, value or a learned pattern even when it does not estimate probability accurately.',
    errorCode: 'writer-view-reversed',
  },
  {
    id: 'affect-design',
    family: 'Evidence',
    prompt: 'Which observation most directly supports the claim that risk and benefit judgments can share one affective shortcut?',
    options: [
      { text: 'Participants could define risk after receiving a glossary.', feedback: 'Knowing a definition does not show that the two judgments moved together.' },
      { text: 'Some technologies had both costs and benefits in the real world.', feedback: 'A real trade-off is not evidence about the judgment mechanism.' },
      { text: 'Positive benefit information lowered perceived risk without adding safety information.', feedback: 'This cross-effect most directly supports a shared evaluative source.' },
      { text: 'Researchers asked every participant to make decisions quickly.', feedback: 'Time pressure was one condition; this claim also misstates the design.' },
    ],
    answer: 2,
    evidence: 'Information about benefits changed perceived risk even though it supplied no new safety evidence.',
    errorCode: 'method-result-confusion',
  },
  {
    id: 'affect-summary',
    family: 'Summary completion',
    prompt: 'Complete the idea: Affect can change an estimate of ______ even when the new information concerns benefits.',
    options: [
      { text: 'objective danger', feedback: 'The experiment measured people’s judgments, not danger itself.' },
      { text: 'the objective measured probability', feedback: 'Besides exceeding the intended limit, this changes perception into an objective value.' },
      { text: 'perceived risk', feedback: 'This is the exact two-word construct used in the passage.' },
      { text: 'emotional intelligence', feedback: 'That construct is not part of the claim or study.' },
    ],
    answer: 2,
    evidence: 'Benefit information could lower perceived risk without changing measured danger.',
    errorCode: 'construct-substitution',
  },
  {
    id: 'affect-purpose',
    family: 'Writer purpose',
    prompt: 'Why does the writer contrast “I dislike it” with “it is objectively dangerous”?',
    options: [
      { text: 'To distinguish an experienced evaluation from a claim about the world', feedback: 'The contrast separates internal reaction from an externally testable estimate.' },
      { text: 'To show that dislike is normally more reliable than probability', feedback: 'The passage establishes no hierarchy of reliability this broad.' },
      { text: 'To argue that danger cannot be measured without personal experience', feedback: 'The distinction makes room for measurement independent of one person’s experience.' },
      { text: 'To prove that negative language creates every perception of danger', feedback: 'The passage does not claim that all perceived danger comes from wording.' },
    ],
    answer: 0,
    evidence: 'The two sentences may feel connected, but only the second makes a claim that requires external evidence.',
    errorCode: 'purpose-topic-confusion',
  },
  {
    id: 'affect-conclusion',
    family: 'Best conclusion',
    prompt: 'Which conclusion best preserves the limits of the evidence?',
    options: [
      { text: 'Affect causes poor decisions whenever benefits and risks move in opposite directions.', feedback: 'An observed judgment pattern does not establish poor outcomes in every case.' },
      { text: 'People who report strong feelings cannot estimate numerical probability.', feedback: 'This turns a conditional tendency into a diagnosis of a group.' },
      { text: 'Removing time limits prevents affect from influencing later decisions.', feedback: 'Reduced pressure does not demonstrate the elimination of affect.' },
      { text: 'A shared evaluation may couple risk and benefit judgments in some tasks.', feedback: 'The modal language and task boundary match the evidence.' },
    ],
    answer: 3,
    evidence: 'The finding concerns average judgments in defined tasks and does not diagnose every individual decision.',
    errorCode: 'scope-overreach',
  },
  {
    id: 'affect-transfer',
    family: 'Transfer',
    prompt: 'A charity shows one vivid photograph before asking for a donation. Which response best applies the passage?',
    options: [
      { text: 'The photograph proves that the programme produces measurable benefits.', feedback: 'A reaction to one image is not evidence of programme effectiveness.' },
      { text: 'The reaction may reveal what matters, while effectiveness requires separate evidence.', feedback: 'This preserves emotional information without treating it as an impact measure.' },
      { text: 'The donor should ignore the photograph because affect always blocks sound reasoning.', feedback: 'The passage rejects the idea that affect is always useless.' },
      { text: 'Reaction intensity accurately estimates how many people the programme will help.', feedback: 'Feeling intensity and population impact are different variables.' },
    ],
    answer: 1,
    evidence: 'A feeling can be data about a present state without becoming evidence about the probability or outcome being estimated.',
    errorCode: 'reaction-as-proof',
  },
]

export const AFFECT_HEURISTIC_GUIDED_LESSON: GuidedAdvancedLesson = {
  kind: 'guided-v3',
  slug: 'heuristica-del-afecto',
  sequence: 3,
  breadcrumbTitle: 'Heurística del afecto',
  title: 'When feelings become evidence',
  subtitle: 'A guided seminar about affect, risk and benefit.',
  objective:
    'You will separate a feeling from the probability it seems to describe, examine evidence and limits, and return to your first explanation with more precise language.',
  level: 'B2–C1',
  evidenceClass: 'empirical',
  guidedMinutes: 110,
  selfStudyMinutes: 65,
  centralQuestion: 'When does a feeling provide useful information, and when does it replace evidence?',
  discussion: {
    targetMinutes: 20,
    questions: [
      {
        id: 'experience',
        kind: 'experience',
        prompt: 'When has a good or bad mood changed an unrelated decision?',
        teacherIntent: 'Collect situations before introducing a theory. Students may invent a case instead of disclosing something personal.',
        followUps: ['What felt different in that moment?', 'Which part of the decision changed first?'],
      },
      {
        id: 'pattern',
        kind: 'pattern',
        prompt: 'Which parts of a decision can feelings influence: risk, benefit, trust or urgency?',
        teacherIntent: 'Separate dimensions that students may initially treat as one global impression.',
        followUps: ['Could the same feeling affect two estimates?', 'Which pair would be easiest to confuse?'],
      },
      {
        id: 'mechanism',
        kind: 'mechanism',
        prompt: 'Why might a vivid feeling become evidence in our minds?',
        teacherIntent: 'Elicit candidate mechanisms without confirming one as the answer.',
        followUps: ['Does speed make this more likely?', 'What mental work does the feeling save?'],
      },
      {
        id: 'exception',
        kind: 'exception',
        prompt: 'When can a feeling be useful information rather than noise?',
        teacherIntent: 'Prevent the oversimplification that emotion is the enemy of reason.',
        followUps: ['What might the feeling be detecting?', 'When would ignoring it be careless?'],
      },
      {
        id: 'concept',
        kind: 'concept',
        prompt: 'What is the difference between feeling unsafe and being unsafe?',
        teacherIntent: 'Prepare the distinction between perceived and measured risk.',
        followUps: ['Can both be true?', 'What kind of evidence belongs to each claim?'],
      },
      {
        id: 'evidence',
        kind: 'evidence',
        prompt: 'What evidence could tell us whether mood changed the judgment?',
        teacherIntent: 'Move from explanation to testable design and falsifiability.',
        followUps: ['What would we manipulate?', 'What would weaken your explanation?'],
      },
    ],
  },
  recordings: {
    baseline: {
      id: 'baseline',
      label: 'Your explanation before the reading',
      targetSeconds: '60–90 seconds',
      prompt: 'Explain how a current mood could affect an unrelated decision. Name two parts of the decision, add one exception and state your confidence.',
      privacyNote: 'The recording stays in this browser tab. It is not uploaded or sent to a teacher.',
    },
    postReading: {
      id: 'post-reading',
      label: 'What did you understand?',
      targetSeconds: '75–120 seconds',
      prompt: 'Explain the central claim, one piece of evidence, one limitation and one question that remains.',
      privacyNote: 'The recording stays in this browser tab. Refreshing or closing the tab removes it.',
    },
    final: {
      id: 'final',
      label: 'Return to your first explanation',
      targetSeconds: '90–120 seconds',
      prompt: 'Say what you kept or changed, which evidence made your explanation more precise, one limit and what would make you update again.',
      privacyNote: 'This pilot compares recordings on the device only. There is no teacher inbox yet.',
    },
  },
  reading: {
    title: 'When risk feels like a property of the object',
    dek: 'Affect can orient attention quickly. The problem begins when one global feeling silently answers several questions that should be examined separately.',
    blocks: [
      {
        id: 'useful-speed',
        role: 'definition',
        heading: 'The useful speed of affect',
        paragraphs: [
          'Before people can list reasons, they often experience a rapid positive or negative orientation toward an object, person or possibility. In this lesson, affect means that experienced quality of goodness or badness. It is broader than a named emotion such as anger or joy: a person may simply sense that an option feels attractive, threatening, trustworthy or wrong.',
          'This speed is not automatically a defect. Affective reactions can concentrate attention, recall earlier learning and signal that something matters. The important distinction is between “I dislike this option” and “this option is objectively dangerous.” The first reports an experience. The second estimates a property of the world and therefore needs external evidence.',
        ],
        prediction: 'Can a fast feeling be useful without being an accurate probability estimate?',
        glossaryTerms: ['affect', 'gut feeling', 'measured risk'],
      },
      {
        id: 'two-estimates',
        role: 'evidence',
        heading: 'One feeling, two estimates',
        paragraphs: [
          'Finucane and colleagues examined judgments of technologies and activities that people associated with different benefits and risks. Perceived benefit and perceived risk tended to move in opposite directions: activities that felt good were often judged as more beneficial and less risky, while activities that felt bad showed the reverse pattern. Under time pressure, this inverse relationship became stronger.',
          'A later manipulation made the mechanism easier to inspect. Information designed to increase perceived benefit could also reduce perceived risk even though it provided no new safety evidence. Risk information could similarly alter perceived benefit. One affective evaluation appeared to serve as a common input for two questions. The result concerns average judgments under defined conditions; it does not mean that every individual uses the shortcut in every decision.',
        ],
        prediction: 'Under time pressure, will risk and benefit judgments become more independent or more strongly coupled?',
        pausePrompt: 'What was manipulated, what was measured, and what remains unknown?',
        glossaryTerms: ['perceived risk', 'time pressure', 'to elicit'],
      },
      {
        id: 'statistic-image',
        role: 'example',
        heading: 'The image inside a statistic',
        paragraphs: [
          'Equivalent numerical descriptions do not always produce equivalent mental images. “Twenty per cent” can remain abstract, while “twenty people out of one hundred” can invite a person to imagine individual cases. The values are equal, yet the second format may elicit a more vivid reaction. That reaction can then influence the seriousness attached to the estimate.',
          'This is related to framing but is not identical to it. Framing asks how descriptions of the same outcome change a decision. The affect heuristic focuses on the positive or negative evaluation that becomes available and is then used as information. In a real message, both processes can operate together, which is why naming the mechanism requires care.',
        ],
        prediction: 'Would “20%” and “20 out of 100” produce the same mental image for everyone?',
        glossaryTerms: ['to elicit', 'to spill over'],
      },
      {
        id: 'not-enemy',
        role: 'counterargument',
        heading: 'Emotion is not the enemy of reason',
        paragraphs: [
          'It is tempting to respond with a simple rule: ignore feelings and calculate. That rule removes information as well as distortion. Anxiety may point to incomplete preparation; attraction may reveal a value that has not been articulated; discomfort may reflect a pattern learned through experience. The useful question is not whether emotion exists, but what question it is qualified to answer.',
          'A feeling can also spill over from another event. A disappointing exam result may make a later audition feel unusually risky even though the two tasks measure different abilities. The mood is real, and tiredness may be relevant, but the exam result does not directly estimate musical performance. Separating those propositions preserves information without allowing one reaction to govern every estimate.',
        ],
        pausePrompt: 'What useful information could a feeling carry without proving the conclusion?',
        glossaryTerms: ['to spill over', 'to disentangle', 'to override'],
      },
      {
        id: 'protocol',
        role: 'application',
        heading: 'A four-question protocol',
        paragraphs: [
          'A practical pause begins by naming the feeling as precisely as possible. Next, ask whether it began with this decision or travelled from another situation. Then evaluate benefits and risks in separate columns, attaching evidence to each claim rather than allowing one global evaluation to fill both columns.',
          'Finally, test the stability of the estimate: would it look the same tomorrow, without time pressure, or under an equivalent numerical frame? This protocol does not promise a bias-free decision. Its purpose is to make the inputs visible enough to inspect, revise and explain.',
        ],
        prediction: 'Which question in the protocol would be most useful in the audition scenario?',
        glossaryTerms: ['to disentangle', 'trade-off', 'to override'],
      },
      {
        id: 'limits',
        role: 'scope-limit',
        heading: 'Limits and better conclusions',
        paragraphs: [
          'The affect heuristic does not predict that a decision will be wrong. A favourable feeling may coincide with strong evidence, and an uneasy reaction may detect a risk that has not yet been expressed. Nor does an experimental average diagnose a particular person. Context, expertise, task design and individual differences all affect how much weight the shortcut receives.',
          'A calibrated conclusion therefore uses conditional language: affect may couple judgments of risk and benefit, especially when a rapid global evaluation is easier than separate analysis. The aim is not to become emotionless. It is to identify what the feeling contributes, what it cannot establish and what evidence would make the conclusion change.',
        ],
        pausePrompt: 'Which sentence prevents the lesson from becoming “emotion is bad”?',
        glossaryTerms: ['measured risk', 'trade-off', 'to override'],
      },
    ],
    argumentMap: [
      { label: 'Claim', text: 'One affective evaluation may guide both perceived risk and perceived benefit.' },
      { label: 'Evidence', text: 'Benefit information changed risk judgments without adding safety information.' },
      { label: 'Objection', text: 'Feelings can carry relevant learning, urgency or values.' },
      { label: 'Limit', text: 'The pattern is conditional and does not diagnose every person or decision.' },
      { label: 'Qualified conclusion', text: 'Inspect the source and relevance of affect before using it as evidence.' },
    ],
    sources: [
      { label: 'Finucane et al. (2000)', href: 'https://doi.org/10.1002/(SICI)1099-0771(200001/03)13:1%3C1::AID-BDM333%3E3.0.CO;2-S' },
      { label: 'Slovic et al. (2007)', href: 'https://doi.org/10.1016/j.ejor.2005.04.006' },
      { label: 'Zajonc (1980)', href: 'https://doi.org/10.1037/0003-066X.35.2.151' },
    ],
  },
  vocabulary: [
    { term: 'affect', partOfSpeech: 'noun', meaning: 'A quickly experienced positive or negative quality.', collocation: 'positive affect', example: 'Positive affect made the benefits easier to imagine.' },
    { term: 'gut feeling', partOfSpeech: 'noun phrase', meaning: 'An immediate judgment that is difficult to explain consciously.', collocation: 'trust a gut feeling', example: 'Her gut feeling deserved inspection, not automatic obedience.' },
    { term: 'perceived risk', partOfSpeech: 'noun phrase', meaning: 'Risk as experienced or estimated by a person.', collocation: 'lower perceived risk', example: 'The benefit message lowered perceived risk.' },
    { term: 'measured risk', partOfSpeech: 'noun phrase', meaning: 'Risk estimated using a defined method and evidence.', collocation: 'compare measured risk', example: 'Measured risk did not change when the description changed.' },
    { term: 'time pressure', partOfSpeech: 'noun phrase', meaning: 'A condition in which a decision must be made quickly.', collocation: 'under time pressure', example: 'The relationship became stronger under time pressure.' },
    { term: 'to elicit', partOfSpeech: 'verb', meaning: 'To cause or draw out a response.', collocation: 'elicit a reaction', example: 'The frequency format elicited a more vivid reaction.' },
    { term: 'to spill over', partOfSpeech: 'phrasal verb', meaning: 'To move from one situation and influence another.', collocation: 'spill over into', example: 'Her disappointment spilled over into the audition decision.' },
    { term: 'to disentangle', partOfSpeech: 'verb', meaning: 'To separate factors that have become mixed together.', collocation: 'disentangle risk from benefit', example: 'The protocol disentangles risk from benefit.' },
    { term: 'trade-off', partOfSpeech: 'noun', meaning: 'A balance in which gaining one benefit involves a cost.', collocation: 'evaluate a trade-off', example: 'The student evaluated the trade-off without hiding either side.' },
    { term: 'to override', partOfSpeech: 'verb', meaning: 'To take priority over another signal or decision.', collocation: 'override evidence', example: 'A vivid reaction should not automatically override evidence.' },
  ],
  ieltsPractice: {
    title: 'Read for claims, evidence and limits',
    instruction: 'Answer all eight questions before opening feedback. This is advanced IELTS-style practice, not a band estimate.',
    questions: AFFECT_QUESTIONS,
  },
  listeningLab: {
    status: 'not-produced',
    relationship: 'complement + scenario',
    audioAFunction: 'A researcher explains the experimental design, result and limit.',
    audioBFunction: 'Two speakers represent an audition decision affected by a previous exam result.',
    integrationPrompt: 'Explain how the situation illustrates the pattern without proving that the pattern caused the decision.',
  },
  synthesis: {
    prompt: 'A friend says: “If an opportunity feels wrong, that is all the evidence you need.” Respond using the reading, preserve one useful role for emotion, distinguish perceived from measured risk, address one objection and state what could change your advice.',
    checklist: [
      'I separated a feeling from the probability it seemed to describe.',
      'I used evidence without presenting a tendency as a universal law.',
      'I included one useful role for affect and one limitation.',
      'I stated what would make me update my conclusion.',
    ],
  },
}

export const GUIDED_ADVANCED_LESSONS: GuidedAdvancedLesson[] = [AFFECT_HEURISTIC_GUIDED_LESSON]

export function getGuidedAdvancedLesson(slug: string) {
  return GUIDED_ADVANCED_LESSONS.find((lesson) => lesson.slug === slug)
}
