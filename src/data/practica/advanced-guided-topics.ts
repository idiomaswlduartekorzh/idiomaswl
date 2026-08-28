import { DUNNING_KRUGER_GUIDED_LESSON } from './advanced-guided-dunning.ts'
import { FRAMING_GUIDED_LESSON } from './advanced-guided-framing.ts'
import { FIRMNESS_GUIDED_LESSON } from './advanced-guided-firmness.ts'
import { CONFIRMATION_BIAS_GUIDED_LESSON } from './advanced-guided-confirmation.ts'
import { HYPERGAMY_GUIDED_LESSON } from './advanced-guided-hypergamy.ts'
import { ZERO_SUM_GUIDED_LESSON } from './advanced-guided-zero-sum.ts'
import { guidedQuestion as q } from './advanced-guided-helpers.ts'

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
  category: 'Phrasal verbs' | 'Useful language' | 'Adjectives' | 'Nouns'
  term: string
  partOfSpeech: string
  meaning: string
  collocation: string
  example: string
}

export interface GuidedOpeningStatement {
  id: string
  text: string
}

export interface GuidedListeningTrack {
  id: 'audio-a' | 'audio-b'
  eyebrow: string
  title: string
  speaker: string
  function: string
  duration: string
  audioSrc: string
  transcript: string
  questions: GuidedChoiceQuestion[]
}

export interface GuidedPlannedListeningTrack extends Omit<GuidedListeningTrack, 'audioSrc' | 'duration'> {
  estimatedDuration: string
}

export type GuidedListeningLab =
  | {
      status: 'not-produced'
      relationship: 'complement + scenario' | 'contrast + application'
      plannedTracks: [GuidedPlannedListeningTrack, GuidedPlannedListeningTrack]
      integrationPrompt: string
    }
  | {
      status: 'produced'
      relationship: 'complement + scenario' | 'contrast + application'
      tracks: [GuidedListeningTrack, GuidedListeningTrack]
      integrationPrompt: string
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
  openingStatements: {
    title: string
    instruction: string
    statements: GuidedOpeningStatement[]
  }
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
  listeningLab: GuidedListeningLab
  synthesis: {
    prompt: string
    checklist: string[]
  }
}

export const GUIDED_ADVANCED_PHASES = [
  { id: 'claims', label: 'Starting claims', shortLabel: 'Choose', minutes: '4' },
  { id: 'discussion', label: 'Discussion and first voice note', shortLabel: 'Discuss', minutes: '20' },
  { id: 'vocabulary', label: 'Language preview', shortLabel: 'Words', minutes: '14' },
  { id: 'reading', label: 'Active reading', shortLabel: 'Read', minutes: '28' },
  { id: 'retrieval', label: 'What did you understand?', shortLabel: 'Retrieve', minutes: '10' },
  { id: 'listening', label: 'Dual listening lab', shortLabel: 'Listen', minutes: '24' },
  { id: 'ielts', label: 'Evidence practice', shortLabel: 'Practice', minutes: '24' },
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
      { text: 'No, affect can still carry useful information', feedback: 'The writer gives affect a useful role while limiting what it can establish.' },
      { text: 'Yes, measured risk makes affect entirely useless', feedback: 'This reverses the writer’s explicit refusal to treat emotion as useless.' },
      { text: 'Not given, the writer avoids that comparison', feedback: 'The writer directly discusses useful emotional information, so the view is stated.' },
      { text: 'Only true when decisions involve time pressure', feedback: 'This adds a condition the statement does not contain.' },
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
      { text: 'the level of objective danger', feedback: 'The experiment measured people’s judgments, not danger itself.' },
      { text: 'the objectively measured probability', feedback: 'This changes perception into an objective value.' },
      { text: 'their level of perceived risk', feedback: 'This is the construct used in the passage.' },
      { text: 'their level of emotional intelligence', feedback: 'That construct is not part of the claim or study.' },
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
  q('affect-frequency', 'Numerical representation', 'Why can “twenty out of one hundred” feel different from “twenty per cent”?',
    ['The frequency can create a more concrete mental image', 'The percentage always reports a smaller objective probability', 'The two formats necessarily use different source populations', 'The frequency removes emotional evaluation from the decision'], 0,
    'Equivalent formats can differ in vividness even when the numerical value stays constant.', 'format-as-quantity',
    ['', 'Twenty per cent and twenty per hundred are equal.', 'They can describe the same population.', 'Concrete imagery may increase rather than remove affect.']),
  q('affect-spillover', 'Application', 'What would best test emotional spillover in the audition scenario?',
    ['Ask only whether Casey normally enjoys theatrical performances', 'Compare audition judgments after unrelated positive and negative feedback', 'Measure acting ability after Casey receives the audition result', 'Replace the audition with another examination of the same subject'], 1,
    'Manipulating unrelated feedback before the audition judgment can test whether mood crosses between decisions.', 'causal-test-missed',
    ['General enjoyment does not isolate the current mood.', '', 'That sequence occurs after the judgment of interest.', 'A related examination would not test cross-domain spillover.']),
  q('affect-protocol', 'Procedure', 'Which step most directly separates one global feeling into inspectable claims?',
    ['Wait until the feeling disappears before gathering evidence', 'Choose the numerical frame that produces least anxiety', 'List benefits and risks separately with evidence for each', 'Ask a confident friend to make the final decision instead'], 2,
    'Separate columns prevent one evaluation from silently answering both risk and benefit questions.', 'global-evaluation-intact',
    ['Delay alone does not identify the inputs.', 'Low anxiety does not guarantee accurate framing.', '', 'Delegation can transfer rather than inspect the shortcut.']),
  q('affect-update', 'Best conclusion', 'What should make an affect-based judgment more credible?',
    ['The reaction becomes stronger each time it is remembered', 'Several friends report an equally intense emotional response', 'The decision is made quickly enough to preserve intuition', 'Independent evidence supports the specific claim the feeling suggests'], 3,
    'A feeling gains evidential relevance when independent information supports the particular risk or benefit claim.', 'intensity-as-evidence',
    ['Repeated intensity can reflect rehearsal.', 'Shared reaction does not establish the external claim.', 'Speed may strengthen reliance on one global evaluation.', '']),
]

const AFFECT_AUDIO_A_QUESTIONS = [
  q('affect-a-claim', 'Main claim', 'What is Dr Brooks’s central claim about affect?',
    ['Affect prevents people from understanding numerical probability', 'One evaluation can influence both risk and benefit judgments', 'Positive feelings reliably identify the safest available option', 'Emotional reactions matter only when time pressure is present'], 1,
    'A shared positive or negative evaluation may feed two judgments that should be examined separately.', 'claim-reduction',
    ['Numerical understanding is not ruled out.', '', 'Positive evaluation does not establish safety.', 'Time pressure can strengthen rather than create the process.']),
  q('affect-a-design', 'Evidence', 'What made the benefit-information manipulation informative?',
    ['It replaced every technology with an unfamiliar product', 'It measured objective accidents before and after the message', 'It instructed participants to suppress emotional reactions', 'It changed perceived risk without adding safety evidence'], 3,
    'A cross-effect from benefit information to risk judgment supports a shared evaluative input.', 'design-misread',
    ['The task did not depend on complete unfamiliarity.', 'The study measured judgments rather than accident rates.', 'Suppression was not the manipulation.', '']),
  q('affect-a-limit', 'Limitation', 'Which limitation does the speaker explicitly preserve?',
    ['A feeling can carry relevant information without estimating probability', 'Measured risk is always more important than personal values', 'Experts do not use affect when making rapid judgments', 'An experimental average predicts every individual decision'], 0,
    'Affect may signal urgency, learned patterns or values even when it is not a probability estimate.', 'emotion-as-noise',
    ['', 'Different questions require different kinds of information.', 'Expertise can shape rather than remove affect.', 'The speaker rejects individual diagnosis from an average.']),
  q('affect-a-tool', 'Procedure', 'What practical procedure does the speaker recommend?',
    ['Remove all emotional words from the available descriptions', 'Choose the option associated with the calmest current mood', 'Name the feeling, trace its source and separate estimates', 'Delay the decision until no emotional response remains'], 2,
    'The procedure makes source, relevance, risk and benefit separately inspectable.', 'procedure-substitution',
    ['Words are only one source of affect.', 'Calmness does not establish relevance.', '', 'Emotion-free judgment is neither required nor promised.']),
]

const AFFECT_AUDIO_B_QUESTIONS = [
  q('affect-b-trigger', 'Scenario', 'What event may have spilled over into Casey’s audition decision?',
    ['Receiving a disappointing examination result earlier that day', 'Learning that the theatre company had changed directors', 'Discovering that the audition required an unfamiliar monologue', 'Hearing another actor describe the role as highly competitive'], 0,
    'The unrelated exam result changed Casey’s mood immediately before evaluating the audition.', 'trigger-misread',
    ['', 'No director change appears in the scenario.', 'The script does not introduce an unfamiliar monologue.', 'Another actor’s warning is not part of the account.']),
  q('affect-b-distinction', 'Concept distinction', 'What distinction does Rowan ask Casey to make?',
    ['Between professional theatre and university performance standards', 'Between personal values and every form of emotional evidence', 'Between feeling incapable and evidence about acting ability', 'Between the audition deadline and the examination schedule'], 2,
    'Rowan separates a present internal state from a claim about performance in another domain.', 'state-as-capacity',
    ['The institutions are not the key distinction.', 'Values are preserved as relevant information.', '', 'Scheduling is not the mechanism under discussion.']),
  q('affect-b-plan', 'Application', 'What makes the final plan a test rather than reassurance?',
    ['Casey is told that failure at the audition is impossible', 'Rowan promises to make the application decision instead', 'The audition is postponed until the exam can be retaken', 'Casey will review evidence and reassess after rest'], 3,
    'The plan separates evidence, uses a time check and keeps the decision revisable.', 'reassurance-as-test',
    ['No outcome is guaranteed.', 'Casey retains agency over the decision.', 'The audition is not postponed.', '']),
  q('affect-b-limit', 'Inference limit', 'What cannot be concluded from Casey’s changed judgment tomorrow?',
    ['The earlier mood was relevant to the first evaluation', 'The affect heuristic alone caused the original refusal', 'Time stability provides useful information about the estimate', 'Acting evidence should be considered separately from the exam'], 1,
    'A changing judgment is consistent with spillover but does not isolate one mechanism as the sole cause.', 'illustration-as-proof',
    ['The timing makes relevance plausible.', '', 'Stability testing is part of the protocol.', 'The domains involve different abilities.']),
]

export const AFFECT_HEURISTIC_GUIDED_LESSON: GuidedAdvancedLesson = {
  kind: 'guided-v3',
  slug: 'heuristica-del-afecto',
  sequence: 3,
  breadcrumbTitle: 'The affect heuristic',
  title: 'When feelings become evidence',
  subtitle: 'A guided seminar about affect, risk and benefit.',
  objective:
    'You will separate a feeling from the probability it seems to describe, examine evidence and limits, and return to your first explanation with more precise language.',
  level: 'B2–C1',
  evidenceClass: 'empirical',
  guidedMinutes: 110,
  selfStudyMinutes: 65,
  centralQuestion: 'When does a feeling provide useful information, and when does it replace evidence?',
  openingStatements: {
    title: 'Which statements sound most logical right now?',
    instruction: 'Select any claims you could defend. The cards are optional and never block the lesson.',
    statements: [
      { id: 'affect-s1', text: 'A strong feeling is evidence that the situation itself is dangerous.' },
      { id: 'affect-s2', text: 'Emotion can carry useful information without estimating probability accurately.' },
      { id: 'affect-s3', text: 'Risk and benefit should be judged separately before they are combined.' },
      { id: 'affect-s4', text: 'A mood from one event can influence an unrelated decision.' },
      { id: 'affect-s5', text: 'Deliberate reasoning is always more reliable than a rapid evaluation.' },
      { id: 'affect-s6', text: 'The source and relevance of a feeling matter more than its intensity alone.' },
    ],
  },
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
    { category: 'Nouns', term: 'affect', partOfSpeech: 'noun', meaning: 'A quickly experienced positive or negative quality.', collocation: 'positive affect', example: 'Positive affect made the benefits easier to imagine.' },
    { category: 'Nouns', term: 'gut feeling', partOfSpeech: 'noun phrase', meaning: 'An immediate judgment that is difficult to explain consciously.', collocation: 'trust a gut feeling', example: 'Her gut feeling deserved inspection, not automatic obedience.' },
    { category: 'Useful language', term: 'perceived risk', partOfSpeech: 'noun phrase', meaning: 'Risk as experienced or estimated by a person.', collocation: 'lower perceived risk', example: 'The benefit message lowered perceived risk.' },
    { category: 'Useful language', term: 'measured risk', partOfSpeech: 'noun phrase', meaning: 'Risk estimated using a defined method and evidence.', collocation: 'compare measured risk', example: 'Measured risk did not change when the description changed.' },
    { category: 'Nouns', term: 'time pressure', partOfSpeech: 'noun phrase', meaning: 'A condition in which a decision must be made quickly.', collocation: 'under time pressure', example: 'The relationship became stronger under time pressure.' },
    { category: 'Useful language', term: 'to elicit', partOfSpeech: 'verb', meaning: 'To cause or draw out a response.', collocation: 'elicit a reaction', example: 'The frequency format elicited a more vivid reaction.' },
    { category: 'Phrasal verbs', term: 'to spill over', partOfSpeech: 'phrasal verb', meaning: 'To move from one situation and influence another.', collocation: 'spill over into', example: 'Her disappointment spilled over into the audition decision.' },
    { category: 'Useful language', term: 'to disentangle', partOfSpeech: 'verb', meaning: 'To separate factors that have become mixed together.', collocation: 'disentangle risk from benefit', example: 'The protocol disentangles risk from benefit.' },
    { category: 'Nouns', term: 'trade-off', partOfSpeech: 'noun', meaning: 'A balance in which gaining one benefit involves a cost.', collocation: 'evaluate a trade-off', example: 'The student evaluated the trade-off without hiding either side.' },
    { category: 'Useful language', term: 'to override', partOfSpeech: 'verb', meaning: 'To take priority over another signal or decision.', collocation: 'override evidence', example: 'A vivid reaction should not automatically override evidence.' },
    { category: 'Phrasal verbs', term: 'to carry over', partOfSpeech: 'phrasal verb', meaning: 'To continue affecting a later situation.', collocation: 'carry over into', example: 'The disappointment carried over into the audition decision.' },
    { category: 'Phrasal verbs', term: 'to calm down', partOfSpeech: 'phrasal verb', meaning: 'To become less emotionally activated.', collocation: 'calm down before deciding', example: 'Casey calmed down before estimating the audition risk again.' },
    { category: 'Phrasal verbs', term: 'to weigh up', partOfSpeech: 'phrasal verb', meaning: 'To compare advantages, risks and evidence carefully.', collocation: 'weigh up the evidence', example: 'She weighed up benefits and risks in separate columns.' },
    { category: 'Phrasal verbs', term: 'to home in on', partOfSpeech: 'phrasal verb', meaning: 'To focus strongly on one feature.', collocation: 'home in on danger', example: 'The negative mood made Casey home in on possible failure.' },
    { category: 'Adjectives', term: 'affective', partOfSpeech: 'adjective', meaning: 'Related to experienced positive or negative feeling.', collocation: 'affective evaluation', example: 'One affective evaluation influenced two separate estimates.' },
    { category: 'Adjectives', term: 'vivid', partOfSpeech: 'adjective', meaning: 'Producing a clear and emotionally available mental image.', collocation: 'vivid representation', example: 'The frequency created a more vivid representation of harm.' },
    { category: 'Adjectives', term: 'unrelated', partOfSpeech: 'adjective', meaning: 'Not directly connected to the decision being evaluated.', collocation: 'unrelated event', example: 'An unrelated exam result changed the later judgment.' },
    { category: 'Adjectives', term: 'inspectable', partOfSpeech: 'adjective', meaning: 'Open enough for its inputs to be examined.', collocation: 'inspectable estimate', example: 'The four questions made the estimate inspectable.' },
    { category: 'Adjectives', term: 'conditional', partOfSpeech: 'adjective', meaning: 'True only under stated circumstances or limits.', collocation: 'conditional conclusion', example: 'The class defended a conditional rather than universal conclusion.' },
    { category: 'Nouns', term: 'spillover', partOfSpeech: 'noun', meaning: 'Influence that travels from one event into another judgment.', collocation: 'emotional spillover', example: 'The comparison was designed to detect emotional spillover.' },
  ],
  ieltsPractice: {
    title: 'Read for claims, evidence and limits',
    instruction: 'Answer all twelve questions before opening feedback. This is advanced IELTS-style practice, not a band estimate.',
    questions: AFFECT_QUESTIONS,
  },
  listeningLab: {
    status: 'not-produced',
    relationship: 'complement + scenario',
    plannedTracks: [
      {
        id: 'audio-a',
        eyebrow: 'Audio A · research explanation',
        title: 'One evaluation, two judgments',
        speaker: 'Dr Helen Brooks · decision scientist',
        function: 'Explains the experimental cross-effect between perceived benefit and perceived risk while preserving useful roles for emotion.',
        estimatedDuration: '3:20–3:45',
        transcript: `The affect heuristic describes a shortcut in which a positive or negative evaluation becomes information for another judgment. Suppose a technology feels beneficial and familiar. That global positive evaluation may make its risks seem lower. If the technology feels disturbing or unfamiliar, the same process can make benefits seem smaller and risks larger. One reaction begins answering two questions.

Research by Finucane and colleagues made this relationship easier to inspect. Participants judged the risks and benefits of technologies and activities. Perceived benefit and perceived risk often moved in opposite directions. Under time pressure, the inverse relationship became stronger. A later manipulation supplied information intended to change perceived benefit. Risk judgments also moved, even though the message had added no new safety evidence. Information about risk could similarly influence perceived benefit.

The cross-effect matters because it suggests a shared evaluative input. It does not show that the objective danger changed, that every participant used the shortcut or that affect necessarily produced a poor decision. An experienced feeling may carry useful information. Anxiety can signal incomplete preparation; attraction can reveal a value; discomfort can reflect patterns learned through repeated experience. What affect cannot do by itself is establish the probability of the external event it seems to describe.

Numerical representation can intensify the process. Twenty per cent and twenty people out of one hundred are equivalent, but the frequency may produce a more concrete image. That vividness can change the emotional weight attached to the estimate. Framing and affect can therefore operate together without being identical mechanisms.

For a practical decision, I use four steps. Name the feeling precisely. Ask whether it began with this decision or travelled from another event. Estimate risks and benefits separately, attaching evidence to each claim. Finally, test stability: would the estimate look similar tomorrow, without time pressure or under an equivalent numerical description? The goal is not emotional silence. It is an inspectable relationship between feeling, claim and evidence.`,
        questions: AFFECT_AUDIO_A_QUESTIONS,
      },
      {
        id: 'audio-b',
        eyebrow: 'Audio B · represented decision',
        title: 'The exam before the audition',
        speaker: 'Casey and Rowan · coaching conversation',
        function: 'Represents emotional spillover while keeping fatigue, values and genuine uncertainty inside the decision.',
        estimatedDuration: '3:15–3:40',
        transcript: `Casey: I am going to decline the audition. I failed an important exam this morning, and I clearly overestimate what I can do.

Rowan: The exam result is evidence about something. What exactly does it tell you about acting?

Casey: Not much directly. But I feel incapable, and the theatre company is selective. If I fail again, I will have wasted everyone’s time.

Rowan: Let us separate the propositions. “I feel incapable” is a true report of your present state. “I am unlikely to perform well at the audition” is a prediction about another domain. What evidence supports that prediction?

Casey: I have performed well in workshops, and the director invited me after seeing the last one. I am also tired and upset, which could affect how I prepare tonight.

Rowan: Good. The feeling is not irrelevant. It tells us that your current energy and confidence need attention. It does not automatically estimate your acting ability. Could the exam disappointment be carrying over into the risk judgment?

Casey: Probably. Before I saw the grade, the audition felt exciting. Afterward, the same invitation felt like a warning.

Rowan: Then make the estimates separately. What are the benefits of attending? What are the risks, and what evidence belongs to each one?

Casey: The benefit is experience and a real chance at the role. The risks are rejection, preparation time and performing badly because I am exhausted. None of those is the same as failing the exam.

Rowan: What test would make the decision more stable?

Casey: I will rest, review the audition material tomorrow and ask whether the evidence still supports declining. If I cannot prepare safely or the material exposes a skill gap, I can withdraw. If the fear decreases while the acting evidence remains positive, I should probably attend.

Rowan: That is not reassurance that you will succeed. It is a way to stop one painful event from answering every later question.`,
        questions: AFFECT_AUDIO_B_QUESTIONS,
      },
    ],
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

export const GUIDED_ADVANCED_LESSONS: GuidedAdvancedLesson[] = [
  FRAMING_GUIDED_LESSON,
  DUNNING_KRUGER_GUIDED_LESSON,
  AFFECT_HEURISTIC_GUIDED_LESSON,
  HYPERGAMY_GUIDED_LESSON,
  FIRMNESS_GUIDED_LESSON,
  CONFIRMATION_BIAS_GUIDED_LESSON,
  ZERO_SUM_GUIDED_LESSON,
]

export function getGuidedAdvancedLesson(slug: string) {
  return GUIDED_ADVANCED_LESSONS.find((lesson) => lesson.slug === slug)
}
