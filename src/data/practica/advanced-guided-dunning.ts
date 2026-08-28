import type { GuidedAdvancedLesson, GuidedChoiceQuestion } from './advanced-guided-topics'

const DUNNING_IELTS_QUESTIONS: GuidedChoiceQuestion[] = [
  {
    id: 'dk-main-purpose',
    family: 'Main purpose',
    prompt: 'What is the main purpose of the reading?',
    options: [
      { text: 'To reject all research on confidence and competence', feedback: 'The reading preserves a narrower empirical question instead of rejecting the research.' },
      { text: 'To separate a measured finding from its viral interpretation', feedback: 'The text repeatedly distinguishes the studies, the statistical dispute and the popular meme.' },
      { text: 'To prove that experts consistently underestimate their performance', feedback: 'No universal claim about experts is established by the evidence discussed.' },
      { text: 'To explain why confidence should disappear during formal training', feedback: 'The practical goal is better calibration, not the removal of confidence.' },
    ],
    answer: 1,
    evidence: 'The reading distinguishes task-specific calibration evidence from the later mountain-shaped story.',
    errorCode: 'purpose-overstatement',
  },
  {
    id: 'dk-original-measure',
    family: 'Factual detail',
    prompt: 'What did the original studies compare most directly?',
    options: [
      { text: 'Career confidence with professional promotion over several years', feedback: 'The studies used bounded tasks rather than longitudinal career outcomes.' },
      { text: 'General intelligence with confidence across unrelated life decisions', feedback: 'The measures concerned particular performances and judgments within domains.' },
      { text: 'Novice anxiety with expert humility during classroom instruction', feedback: 'The familiar novice-to-expert journey was not the original research design.' },
      { text: 'Task performance with estimates of relative task performance', feedback: 'This captures the central comparison made in the original studies.' },
    ],
    answer: 3,
    evidence: 'Participants completed bounded tasks and estimated both their scores and relative standing.',
    errorCode: 'design-substitution',
  },
  {
    id: 'dk-calibration-confidence',
    family: 'Concept distinction',
    prompt: 'Which statement best distinguishes confidence from calibration?',
    options: [
      { text: 'Confidence is a judgment; calibration compares judgments with outcomes', feedback: 'This preserves the distinction between a belief strength and its observed accuracy.' },
      { text: 'Confidence measures skill; calibration measures only emotional restraint', feedback: 'Confidence is not itself a direct measure of skill, and calibration is not restraint.' },
      { text: 'Confidence belongs to novices; calibration belongs only to experts', feedback: 'Both novices and experts can display stronger or weaker calibration.' },
      { text: 'Confidence predicts success; calibration prevents every future mistake', feedback: 'Neither relationship is guaranteed in the broad form stated here.' },
    ],
    answer: 0,
    evidence: 'A highly confident judgment can be well calibrated when outcomes repeatedly support it.',
    errorCode: 'construct-conflation',
  },
  {
    id: 'dk-double-burden',
    family: 'Theory identification',
    prompt: 'What does the proposed double burden mean?',
    options: [
      { text: 'Weak performers receive fewer chances and harsher classroom evaluations', feedback: 'The theory concerns performance and self-evaluation, not institutional opportunity.' },
      { text: 'Experts solve harder tasks and report lower confidence afterward', feedback: 'The proposal focuses on knowledge missing among weaker performers.' },
      { text: 'Missing skill can impair performance and recognition of errors', feedback: 'The same domain knowledge may support both doing and monitoring the task.' },
      { text: 'Noisy scores lower performance and confidence by equal amounts', feedback: 'That describes a measurement claim, not the metacognitive proposal.' },
    ],
    answer: 2,
    evidence: 'Some knowledge needed to answer correctly may also be needed to recognize an incorrect answer.',
    errorCode: 'theory-method-confusion',
  },
  {
    id: 'dk-regression',
    family: 'Statistical reasoning',
    prompt: 'Why can regression toward the mean matter here?',
    options: [
      { text: 'It makes every second score higher than every first score', feedback: 'Regression does not guarantee a rise for every participant or measurement.' },
      { text: 'It proves self-estimates contain no useful information about skill', feedback: 'A statistical artifact can contribute without making estimates entirely useless.' },
      { text: 'It forces confidence ratings to match the population average exactly', feedback: 'Ratings may cluster inward without becoming identical to the average.' },
      { text: 'It can reduce apparent extremity after noisy group selection', feedback: 'Selecting groups on an imperfect extreme score can exaggerate later gaps.' },
    ],
    answer: 3,
    evidence: 'An extreme observed score partly shaped by noise tends to be followed by a less extreme measure.',
    errorCode: 'statistical-mechanism',
  },
  {
    id: 'dk-domain',
    family: 'Scope',
    prompt: 'Which claim respects the domain-specific limit?',
    options: [
      { text: 'Poor grammar performance proves weak judgment in every domain', feedback: 'A bounded task cannot support a global diagnosis of a person.' },
      { text: 'Grammar knowledge may support both answers and error detection', feedback: 'The claim remains tied to the measured domain and proposed mechanism.' },
      { text: 'General confidence always transfers unchanged across separate activities', feedback: 'The reading warns against assuming broad transfer from one task.' },
      { text: 'One incorrect answer reveals a stable metacognitive personality trait', feedback: 'A single result cannot establish a stable global trait.' },
    ],
    answer: 1,
    evidence: 'The defensible claim concerns calibration inside a particular task or knowledge domain.',
    errorCode: 'domain-inflation',
  },
  {
    id: 'dk-replication',
    family: 'Research synthesis',
    prompt: 'How should the later studies be interpreted together?',
    options: [
      { text: 'They jointly restore the viral mountain as a universal law', feedback: 'Neither study validates the popular curve or a universal developmental path.' },
      { text: 'They show that measurement cannot influence any calibration result', feedback: 'Measurement choices remain central to the disagreement between studies.' },
      { text: 'They leave a smaller effect plausible while disputing its size', feedback: 'This preserves both the null-like analysis and the later small significant result.' },
      { text: 'They establish that low performers never evaluate themselves accurately', feedback: 'The evidence concerns average tendencies, not every individual judgment.' },
    ],
    answer: 2,
    evidence: 'One analysis found no distinctive nonlinear effect; a later study reported a small significant one.',
    errorCode: 'replication-polarization',
  },
  {
    id: 'dk-meme-problem',
    family: 'Inference',
    prompt: 'Why is the viral mountain especially misleading?',
    options: [
      { text: 'It implies a learning trajectory the studies never measured', feedback: 'The curve presents a developmental sequence that the cross-sectional tasks did not test.' },
      { text: 'It uses percentages rather than reporting every individual score', feedback: 'Percentages are not the central problem identified in the reading.' },
      { text: 'It contains too few labels for advanced statistical interpretation', feedback: 'Adding labels would not repair the unsupported developmental story.' },
      { text: 'It compares confidence with outcomes from several separate countries', feedback: 'The original studies did not use the international design described here.' },
    ],
    answer: 0,
    evidence: 'The popular curve depicts confidence rising and falling across expertise, which the original design did not observe.',
    errorCode: 'visual-story-as-data',
  },
  {
    id: 'dk-falsifiability',
    family: 'Application',
    prompt: 'Which use of the concept is most falsifiable?',
    options: [
      { text: 'Calling disagreement proof that another person lacks self-awareness', feedback: 'That claim treats disagreement as self-confirming evidence and resists correction.' },
      { text: 'Recording forecasts and comparing confidence with later results', feedback: 'This produces observable predictions that can confirm or challenge self-assessment.' },
      { text: 'Assuming quiet speakers possess greater competence than confident speakers', feedback: 'Speaking style alone does not provide a calibrated competence measure.' },
      { text: 'Treating every surprising error as evidence of global incompetence', feedback: 'One error does not support a stable diagnosis across domains.' },
    ],
    answer: 1,
    evidence: 'A prediction-confidence record can be tested against repeated diagnostic outcomes.',
    errorCode: 'self-sealing-claim',
  },
  {
    id: 'dk-best-evidence',
    family: 'Evidence evaluation',
    prompt: 'Which result would most strengthen a metacognitive explanation?',
    options: [
      { text: 'Targeted training improves performance and later error recognition', feedback: 'Improvement in both doing and monitoring supports a shared skill-based mechanism.' },
      { text: 'A popular diagram receives more shares than a research table', feedback: 'Popularity provides no evidence about the proposed cognitive mechanism.' },
      { text: 'Participants prefer simple labels during an unrelated discussion task', feedback: 'Preference for labels does not connect skill with self-monitoring.' },
      { text: 'Average confidence remains stable across two noisy measurement sessions', feedback: 'Stable confidence alone does not show improved recognition of errors.' },
    ],
    answer: 0,
    evidence: 'If instruction improves both performance and monitoring, the proposed shared knowledge becomes more plausible.',
    errorCode: 'evidence-relevance',
  },
  {
    id: 'dk-cautious-conclusion',
    family: 'Best conclusion',
    prompt: 'Which conclusion is best calibrated to the evidence?',
    options: [
      { text: 'The effect explains why confident people usually lack competence', feedback: 'This turns task-level averages into a broad diagnosis of confident people.' },
      { text: 'The effect disappears whenever researchers remove all statistical noise', feedback: 'No measurement removes all noise, and later results remain mixed.' },
      { text: 'The meme is inaccurate, so self-evaluation requires no further study', feedback: 'Rejecting the meme does not erase the empirical question about calibration.' },
      { text: 'Some low performers may miscalibrate, with causes still contested', feedback: 'The modal wording preserves the possible pattern and its unresolved mechanism.' },
    ],
    answer: 3,
    evidence: 'The literature supports a bounded question about magnitude and mechanism, not a universal social law.',
    errorCode: 'certainty-inflation',
  },
  {
    id: 'dk-transfer',
    family: 'Transfer',
    prompt: 'A manager calls a confident applicant incompetent. What is missing?',
    options: [
      { text: 'A memorable curve showing how confidence changes with age', feedback: 'The viral curve would add a story, not diagnostic evidence about this applicant.' },
      { text: 'A personality label explaining the applicant across every context', feedback: 'A global label would repeat the same scope error.' },
      { text: 'A domain-relevant task and a comparison with actual performance', feedback: 'The claim requires measured competence and calibration within the relevant domain.' },
      { text: 'A lower confidence rating from another equally confident applicant', feedback: 'Comparing speaking confidence does not establish competence or calibration.' },
    ],
    answer: 2,
    evidence: 'Confidence becomes evidence about calibration only when compared with relevant outcomes.',
    errorCode: 'missing-measurement',
  },
]

const AUDIO_A_QUESTIONS: GuidedChoiceQuestion[] = [
  {
    id: 'dk-a-artifact',
    family: 'Listening inference',
    prompt: 'What is Dr Shah most skeptical about?',
    options: [
      { text: 'Whether confidence can ever be measured with numerical scales', feedback: 'She questions a particular inference, not the possibility of measuring confidence.' },
      { text: 'Whether training can improve knowledge in bounded academic domains', feedback: 'Training effects are not the central target of her criticism.' },
      { text: 'Whether the classic graph uniquely identifies a cognitive deficit', feedback: 'Her argument is that several statistical processes can generate a similar pattern.' },
      { text: 'Whether participants understand instructions during laboratory research tasks', feedback: 'She does not base the critique on misunderstanding the task instructions.' },
    ],
    answer: 2,
    evidence: 'She argues that bounded ratings, noisy scores and group selection can reproduce the signature graph.',
    errorCode: 'speaker-position',
  },
  {
    id: 'dk-a-boundary',
    family: 'Listening detail',
    prompt: 'Why does the scale boundary create asymmetry?',
    options: [
      { text: 'Low scores have more upward room than downward room', feedback: 'This is the asymmetry described in the simulation argument.' },
      { text: 'High scores contain more measurement noise than low scores', feedback: 'The speaker does not claim unequal noise at different performance levels.' },
      { text: 'Low performers always choose the highest possible confidence score', feedback: 'The boundary argument does not require extreme confidence from everyone.' },
      { text: 'High performers receive longer tests than low performers receive', feedback: 'Test length is not part of the stated mechanism.' },
    ],
    answer: 0,
    evidence: 'A low observed score cannot be overestimated downward by much, but it can be overestimated upward substantially.',
    errorCode: 'mechanism-detail',
  },
  {
    id: 'dk-a-recommendation',
    family: 'Listening purpose',
    prompt: 'What design improvement does the speaker recommend?',
    options: [
      { text: 'Replace performance tests with interviews about general confidence', feedback: 'That would weaken the connection between confidence and objective performance.' },
      { text: 'Remove all uncertain participants before analysing the final sample', feedback: 'Excluding uncertainty would distort rather than improve calibration evidence.' },
      { text: 'Present only quartile plots without individual participant estimates', feedback: 'Her critique specifically warns that quartile plots can conceal distributions.' },
      { text: 'Use repeated measures and model individual calibration directly', feedback: 'Repeated, task-specific observations address several limitations she identifies.' },
    ],
    answer: 3,
    evidence: 'She recommends repeated tasks, direct calibration functions and models that preserve individual variation.',
    errorCode: 'method-recommendation',
  },
  {
    id: 'dk-a-conclusion',
    family: 'Listening conclusion',
    prompt: 'Which conclusion best represents the speaker?',
    options: [
      { text: 'Metacognitive limitations are impossible to test scientifically', feedback: 'She proposes better tests rather than declaring the construct untestable.' },
      { text: 'The famous pattern needs evidence beyond its familiar shape', feedback: 'Her central demand is evidence that distinguishes cognition from statistical structure.' },
      { text: 'Every apparent bias disappears in sufficiently large samples', feedback: 'Larger samples do not automatically resolve measurement and modelling problems.' },
      { text: 'Statistical artifacts prove participants judge themselves accurately', feedback: 'Artifacts can inflate a pattern without proving perfect self-knowledge.' },
    ],
    answer: 1,
    evidence: 'A recognizable graph is not enough unless the design rules out plausible alternative generators.',
    errorCode: 'conclusion-polarization',
  },
]

const AUDIO_B_QUESTIONS: GuidedChoiceQuestion[] = [
  {
    id: 'dk-b-disagreement',
    family: 'Listening contrast',
    prompt: 'Where does Professor Reed differ from Dr Shah?',
    options: [
      { text: 'He rejects measurement error as irrelevant to psychological research', feedback: 'He explicitly accepts that the classic display can exaggerate the pattern.' },
      { text: 'He accepts the artifact critique but preserves a narrower mechanism', feedback: 'He agrees about inflation while defending a limited training-relevant effect.' },
      { text: 'He argues the viral mountain accurately maps every learning journey', feedback: 'He rejects the meme as strongly as the methodological critic does.' },
      { text: 'He treats confidence as a direct substitute for measured competence', feedback: 'His training method depends on comparing confidence with performance.' },
    ],
    answer: 1,
    evidence: 'He accepts statistical inflation while arguing that error detection can still require domain knowledge.',
    errorCode: 'contrast-location',
  },
  {
    id: 'dk-b-training',
    family: 'Listening application',
    prompt: 'Why does the programme require confidence forecasts?',
    options: [
      { text: 'They encourage trainees to sound decisive before receiving evidence', feedback: 'The forecasts are private records, not performances of certainty.' },
      { text: 'They replace practical tests when workplace assessment feels stressful', feedback: 'Forecasts are compared with practical outcomes rather than replacing them.' },
      { text: 'They reveal which trainees possess a generally confident personality', feedback: 'The programme avoids using confidence as a global personality diagnosis.' },
      { text: 'They make calibration visible across repeated diagnostic outcomes', feedback: 'Recorded forecasts allow confidence and accuracy to be compared over time.' },
    ],
    answer: 3,
    evidence: 'The programme stores confidence before feedback and plots it against later task performance.',
    errorCode: 'application-purpose',
  },
  {
    id: 'dk-b-feedback',
    family: 'Listening detail',
    prompt: 'What makes feedback diagnostic in the speaker’s example?',
    options: [
      { text: 'It identifies the decision rule that produced the error', feedback: 'Rule-level feedback helps trainees revise both performance and self-monitoring.' },
      { text: 'It ranks trainees publicly from most to least confident', feedback: 'Public confidence rankings would not explain why a decision failed.' },
      { text: 'It delays correction until trainees forget their original reasoning', feedback: 'The method preserves the initial forecast so it can be compared directly.' },
      { text: 'It rewards lower confidence regardless of the measured outcome', feedback: 'The target is calibration, not systematic underconfidence.' },
    ],
    answer: 0,
    evidence: 'Useful feedback names the cue or rule that should have changed the decision.',
    errorCode: 'diagnostic-feedback',
  },
  {
    id: 'dk-b-ethical-use',
    family: 'Listening implication',
    prompt: 'Which practice follows the speaker’s ethical limit?',
    options: [
      { text: 'Diagnose applicants after one confident statement in an interview', feedback: 'A single statement cannot establish domain competence or calibration.' },
      { text: 'Publish individual calibration failures to motivate the entire group', feedback: 'Public labeling conflicts with the private learning record he describes.' },
      { text: 'Use private repeated evidence to guide targeted skill development', feedback: 'This keeps the construct measurable, local and useful for learning.' },
      { text: 'Avoid confidence judgments because they inevitably create social bias', feedback: 'The speaker uses confidence data carefully rather than banning it.' },
    ],
    answer: 2,
    evidence: 'He limits the concept to private, repeated, domain-specific learning evidence.',
    errorCode: 'ethical-transfer',
  },
]

export const DUNNING_KRUGER_GUIDED_LESSON: GuidedAdvancedLesson = {
  kind: 'guided-v3',
  slug: 'dunning-kruger-sin-la-curva',
  sequence: 2,
  breadcrumbTitle: 'Dunning–Kruger without the meme',
  title: 'Confidence, competence and the graph that escaped the lab',
  subtitle: 'An advanced seminar on what the studies measured, what the meme added and how feedback can improve self-assessment.',
  objective: 'You will separate confidence from accurate self-assessment, compare psychological and statistical explanations, and make a claim that fits the evidence.',
  level: 'B2–C1',
  evidenceClass: 'empirical',
  guidedMinutes: 136,
  selfStudyMinutes: 80,
  centralQuestion: 'When does poor self-assessment come from missing knowledge, and when can the way we measure it create part of the pattern?',
  openingStatements: {
    title: 'Which claims currently seem most defensible?',
    instruction: 'Choose any statements that sound logical to you. You can select several, one or none, and continue whenever you are ready.',
    statements: [
      { id: 'confidence-evidence', text: 'A confident person is more likely to be competent.' },
      { id: 'novice-rule', text: 'Beginners are often more confident than experts.' },
      { id: 'relative-error', text: 'Some low performers misjudge how well they did.' },
      { id: 'measurement-shape', text: 'The way a study measures people can shape its graph.' },
      { id: 'expert-humility', text: 'Learning more usually makes people less certain.' },
      { id: 'feedback-calibration', text: 'Predictions and clear feedback can improve self-assessment.' },
    ],
  },
  discussion: {
    targetMinutes: 20,
    questions: [
      { id: 'confidence', kind: 'experience', prompt: 'When has confidence helped you perform, and when has it hidden an error?', teacherIntent: 'Separate the practical value of confidence from its reliability as evidence.', followUps: ['What outcome later tested the confidence?', 'Was the task familiar or new?'] },
      { id: 'coupling', kind: 'pattern', prompt: 'Should skill and confidence grow together?', teacherIntent: 'Elicit possible relationships before introducing calibration.', followUps: ['Could accurate experts remain highly confident?', 'Could an uncertain beginner still overestimate a very low score?'] },
      { id: 'recognition', kind: 'mechanism', prompt: 'What knowledge is required to recognize that your own answer is wrong?', teacherIntent: 'Prepare the double-burden explanation without treating it as established.', followUps: ['Is doing a task the same as auditing it?', 'Which classroom example makes this visible?'] },
      { id: 'graph', kind: 'concept', prompt: 'What does a smooth graph make us believe before we inspect its axes?', teacherIntent: 'Turn visual fluency into a question about research design.', followUps: ['Does the graph show individuals or averages?', 'Does it show development over time?'] },
      { id: 'alternative', kind: 'exception', prompt: 'How could the lowest-scoring group look overconfident even without a special psychological weakness?', teacherIntent: 'Invite statistical alternatives such as noise, boundaries and regression.', followUps: ['How was the group selected?', 'What happens near the edge of a scale?'] },
      { id: 'test', kind: 'evidence', prompt: 'What evidence could separate missing self-awareness from a measurement problem?', teacherIntent: 'End with falsifiability and a better design.', followUps: ['Would repeated measures help?', 'What should training change if the mechanism is real?'] },
    ],
  },
  recordings: {
    baseline: { id: 'baseline', label: 'Your explanation before the evidence', targetSeconds: '75–105 seconds', prompt: 'Explain which two opening claims you selected. Define what you think Dunning–Kruger means, give one example and state how confident you are.', privacyNote: 'This voice note stays in the current browser tab. It is never uploaded.' },
    postReading: { id: 'post-reading', label: 'Retrieve the argument', targetSeconds: '90–120 seconds', prompt: 'Without reopening the reading, explain the original finding, one metacognitive mechanism, one statistical objection and the strongest remaining question.', privacyNote: 'This recording remains local and disappears when the tab is closed or refreshed.' },
    final: { id: 'final', label: 'Return to your starting position', targetSeconds: '105–150 seconds', prompt: 'Revisit your selected claims. State what survived, what changed, how the two audio positions differ and what evidence would make you update again.', privacyNote: 'The comparison happens on your device. There is no upload or teacher inbox.' },
  },
  reading: {
    title: 'From a useful finding to a social insult',
    dek: 'The original research asked a bounded question about calibration. The viral version tells a universal story about foolish beginners. Those are not the same claim.',
    blocks: [
      { id: 'mountain', role: 'definition', heading: 'The mountain the research did not draw', prediction: 'What kind of evidence would be required to show confidence rising and falling as one person gains expertise?', paragraphs: ['Search for the Dunning–Kruger effect and you will probably meet a smooth journey: a novice climbs a peak of confidence, collapses into a valley of despair and eventually reaches a plateau of wisdom. The picture tells a satisfying moral story. A little knowledge creates arrogance; genuine expertise creates humility. Yet that curve was not published in the 1999 paper, and it does not represent the design of its four studies. It is a later illustration that combines several intuitions into one memorable shape.', 'The distinction matters because a graph silently makes claims. The viral curve suggests that absolute confidence first rises, then crashes and later recovers as skill develops. The original work asked a different question: how accurately do people at different performance levels estimate their performance? Confidence and calibration are not synonyms. An expert can be highly confident and well calibrated; a novice can be uncertain and still overestimate a very low score.'], pausePrompt: 'Which variable appears on the viral graph but was not followed over time in the studies?', glossaryTerms: ['calibration', 'confidence', 'learning trajectory'] },
      { id: 'original', role: 'evidence', heading: 'What the original studies measured', prediction: 'Would a grammar task justify a conclusion about a participant’s competence in every domain?', paragraphs: ['Kruger and Dunning recruited Cornell University students for tasks involving humour, logical reasoning and English grammar. Participants completed a task and estimated both their raw performance and their position relative to other participants. The best-known result concerns the bottom quartile. Across the studies, those participants estimated their relative standing far above where their test scores placed them. In one summary, average performance near the twelfth percentile was estimated near the sixty-second percentile.', 'The authors proposed a double burden. Weak skill could produce errors and also remove some of the knowledge needed to recognize those errors. Grammar offers an intuitive example: if you cannot identify the rule that distinguishes a correct sentence from an incorrect one, you may also lack the rule needed to audit your answer. Training in logical reasoning improved both performance and participants’ recognition of earlier limitations, which supported a metacognitive interpretation.', 'The scope must remain visible. Participants were not classified as globally incompetent people. They performed relatively poorly on particular tests in a particular sample. The claim is domain-specific: knowing little about one task may interfere with judging your performance on that task. It does not follow that a person who is mistaken in one domain lacks insight everywhere else.'], pausePrompt: 'Identify the measure, the proposed mechanism and the scope limit.', glossaryTerms: ['bottom quartile', 'metacognition', 'domain-specific'] },
      { id: 'artifact', role: 'counterargument', heading: 'How a familiar shape can emerge', prediction: 'What happens when people are grouped by one noisy extreme score?', paragraphs: ['Later critics focused on the method used to display the effect. Researchers often divide people into quartiles using an observed performance score and then compare that score with a self-estimate. Any test contains measurement error. Someone can enter the bottom group partly because the measured score was unusually low that day. A second imperfect measurement tends to be less extreme. This is regression toward the mean, and it can create the appearance that the lowest group overestimates while the highest group underestimates.', 'A second ingredient is the better-than-average effect: many people rate themselves somewhat above the midpoint. Combine noisy scores, grouping by an extreme measurement and self-ratings clustered closer to average, and a Dunning–Kruger-shaped plot can emerge even without a unique metacognitive deficit among low performers. Scale boundaries add another asymmetry: a score near zero has far more room to be overestimated than underestimated. These mechanisms do not prove that metacognition is irrelevant. They show that the classic quartile graph cannot identify the cause of the gap by itself.'], pausePrompt: 'Does an alternative generator erase the phenomenon or change what must be demonstrated?', glossaryTerms: ['regression toward the mean', 'measurement error', 'scale boundary'] },
      { id: 'dispute', role: 'scope-limit', heading: 'A dispute about magnitude', prediction: 'Can one study find almost no distinctive effect while another finds a small significant effect?', paragraphs: ['In 2020, Gilles Gignac and Marcin Zajenkowski examined self-assessed intelligence with methods designed to reduce the familiar confounds. They found an essentially linear relationship between measured and self-assessed intelligence and no statistically significant pattern showing that lower-ability participants were uniquely less accurate. Their conclusion was cautious: the proposed phenomenon might exist for some skills, but its magnitude could be much smaller than earlier presentations suggested.', 'A 2023 response used a larger, more representative dataset and related statistical tests. It reported a small but statistically significant effect. The two papers do not restore the viral mountain. Together they sharpen the live question: under which tasks, samples and measurements does poorer performance predict worse calibration, and by how much? Small but detectable is scientifically different from both universal law and nothing at all.'], pausePrompt: 'Which disagreement concerns existence, and which concerns size?', glossaryTerms: ['effect size', 'replication', 'confound'] },
      { id: 'social-label', role: 'example', heading: 'When a concept becomes a social weapon', prediction: 'What evidence is missing when confidence itself becomes the diagnosis?', paragraphs: ['In conversation, Dunning–Kruger is often used as an insult wearing a laboratory coat. A speaker diagnoses an opponent’s confidence as evidence of incompetence. The move is self-sealing: disagreement becomes proof that the other person lacks the insight to recognize being wrong. This application is difficult to falsify and ignores the measurements that gave the concept meaning.', 'A hiring panel can make the same mistake more politely. One member hears an applicant speak with certainty and assumes shallow expertise; another hears hesitation and assumes depth. Neither inference is calibrated until the applicant completes a relevant task and the panel compares forecasts with outcomes. Confidence may affect communication, but it does not become a competence measure merely because the evaluator knows the name of a bias.'], pausePrompt: 'How could the panel turn its impression into a testable claim?', glossaryTerms: ['self-sealing', 'falsifiable', 'diagnostic evidence'] },
      { id: 'mirror', role: 'application', heading: 'Turn the concept into a mirror', prediction: 'What record would allow you to measure your own calibration over time?', paragraphs: ['A disciplined use begins with yourself and a specific domain. Before making a strong claim, state your confidence, identify what competent performance would look like and choose feedback that could prove you wrong. After receiving the result, compare confidence with accuracy. Repeated comparisons create a calibration record. The lesson is not to doubt everything. It is to attach confidence to evidence, preserve uncertainty where measurement is weak and update when reality answers back.', 'Good feedback must also be diagnostic. A score says that performance was weak; it does not necessarily reveal which rule, cue or misconception produced the failure. When feedback names the mechanism of an error, learners can improve both the task and their ability to monitor it. That is a more demanding and useful interpretation of Dunning–Kruger than applying the label to someone else.'], pausePrompt: 'What would count as evidence that your calibration improved?', glossaryTerms: ['diagnostic feedback', 'to update', 'calibration record'] },
    ],
    argumentMap: [
      { label: 'Measured finding', text: 'Some low performers estimated their relative task performance too generously.' },
      { label: 'Proposed mechanism', text: 'Missing domain knowledge may impair both performance and error recognition.' },
      { label: 'Statistical objection', text: 'Noise, group selection and scale boundaries can reproduce part of the pattern.' },
      { label: 'Current dispute', text: 'Later analyses disagree about the size and distinctiveness of the remaining effect.' },
      { label: 'Responsible use', text: 'Measure repeated task-specific calibration instead of diagnosing confident people.' },
    ],
    sources: [
      { label: 'Kruger & Dunning (1999), JPSP', href: 'https://doi.org/10.1037/0022-3514.77.6.1121' },
      { label: 'Gignac & Zajenkowski (2020), Intelligence', href: 'https://doi.org/10.1016/j.intell.2020.101449' },
      { label: 'Dunkel, Nedelec & van der Linden (2023), Intelligence', href: 'https://doi.org/10.1016/j.intell.2022.101717' },
    ],
  },
  vocabulary: [
    { category: 'Phrasal verbs', term: 'zero in on', partOfSpeech: 'phrasal verb', meaning: 'To focus closely on the most relevant element.', collocation: 'zero in on a mechanism', example: 'The revised study zeroed in on calibration rather than confidence alone.' },
    { category: 'Phrasal verbs', term: 'rule out', partOfSpeech: 'phrasal verb', meaning: 'To eliminate a plausible explanation using evidence.', collocation: 'rule out an artifact', example: 'One quartile graph cannot rule out regression toward the mean.' },
    { category: 'Phrasal verbs', term: 'bear out', partOfSpeech: 'phrasal verb', meaning: 'To support a claim with later evidence or results.', collocation: 'be borne out by data', example: 'The dramatic learning curve was not borne out by the original design.' },
    { category: 'Phrasal verbs', term: 'break down', partOfSpeech: 'phrasal verb', meaning: 'To separate a complex idea into smaller parts.', collocation: 'break down a claim', example: 'The class broke down the meme into a graph, a measure and a mechanism.' },
    { category: 'Phrasal verbs', term: 'back up', partOfSpeech: 'phrasal verb', meaning: 'To support a statement with relevant evidence.', collocation: 'back up a conclusion', example: 'One confident interview answer cannot back up a claim about competence.' },
    { category: 'Useful language', term: 'to overestimate', partOfSpeech: 'verb', meaning: 'To judge an ability, amount or result as greater than it is.', collocation: 'overestimate relative performance', example: 'Some participants overestimated their position within the sample.' },
    { category: 'Useful language', term: 'to update', partOfSpeech: 'verb', meaning: 'To revise a belief after receiving relevant information.', collocation: 'update a confidence estimate', example: 'A calibrated learner updates after diagnostic feedback.' },
    { category: 'Useful language', term: 'to disentangle', partOfSpeech: 'verb', meaning: 'To separate causes or constructs that have become mixed.', collocation: 'disentangle skill from noise', example: 'Repeated measures help disentangle stable skill from measurement noise.' },
    { category: 'Useful language', term: 'to compare like with like', partOfSpeech: 'fixed expression', meaning: 'To compare things that were measured in a genuinely similar way.', collocation: 'compare like with like across tasks', example: 'A fair calibration study must compare like with like.' },
    { category: 'Useful language', term: 'the evidence suggests', partOfSpeech: 'reporting phrase', meaning: 'A cautious way to state what the available results support.', collocation: 'the evidence suggests that', example: 'The evidence suggests that the remaining effect may be smaller than the meme implies.' },
    { category: 'Adjectives', term: 'calibrated', partOfSpeech: 'adjective', meaning: 'Adjusted so expressed confidence corresponds to observed accuracy.', collocation: 'a calibrated judgment', example: 'Her confident forecast was calibrated because similar forecasts were usually correct.' },
    { category: 'Adjectives', term: 'domain-specific', partOfSpeech: 'adjective', meaning: 'Limited to a particular task, field or knowledge area.', collocation: 'domain-specific competence', example: 'Grammar performance supports a domain-specific claim, not a global diagnosis.' },
    { category: 'Adjectives', term: 'falsifiable', partOfSpeech: 'adjective', meaning: 'Capable of being tested and potentially shown to be wrong.', collocation: 'a falsifiable prediction', example: 'A recorded forecast is more falsifiable than a label applied after failure.' },
    { category: 'Adjectives', term: 'overconfident', partOfSpeech: 'adjective', meaning: 'More confident than the available evidence or performance justifies.', collocation: 'an overconfident estimate', example: 'An estimate can be overconfident without revealing a permanent personality trait.' },
    { category: 'Adjectives', term: 'misleading', partOfSpeech: 'adjective', meaning: 'Likely to create an inaccurate impression.', collocation: 'a misleading graph', example: 'The smooth mountain is memorable but misleading.' },
    { category: 'Nouns', term: 'metacognition', partOfSpeech: 'noun', meaning: 'The capacity to monitor and regulate one’s own thinking.', collocation: 'metacognitive skill', example: 'Metacognition may depend partly on the knowledge used to perform the task.' },
    { category: 'Nouns', term: 'measurement error', partOfSpeech: 'noun phrase', meaning: 'Variation introduced because a measure is an imperfect estimate.', collocation: 'account for measurement error', example: 'The analysis must account for measurement error before interpreting extreme groups.' },
    { category: 'Nouns', term: 'regression toward the mean', partOfSpeech: 'noun phrase', meaning: 'The tendency of an extreme noisy measurement to be followed by a less extreme one.', collocation: 'control for regression', example: 'Regression toward the mean can inflate the apparent gap in the bottom quartile.' },
    { category: 'Nouns', term: 'self-assessment', partOfSpeech: 'noun', meaning: 'A judgment about one’s own knowledge, skill or performance.', collocation: 'accurate self-assessment', example: 'The studies compared self-assessment with measured performance.' },
    { category: 'Nouns', term: 'feedback loop', partOfSpeech: 'noun phrase', meaning: 'A cycle in which results inform the next judgment or action.', collocation: 'create a feedback loop', example: 'Repeated forecasts and results create a useful feedback loop.' },
  ],
  ieltsPractice: {
    title: 'Read beyond the famous label',
    instruction: 'Answer all twelve questions before opening feedback. The set tests scope, method, inference and transfer; it is not an IELTS band estimate.',
    questions: DUNNING_IELTS_QUESTIONS,
  },
  listeningLab: {
    status: 'produced',
    relationship: 'contrast + application',
    tracks: [
      {
        id: 'audio-a',
        eyebrow: 'Position A · methodological critique',
        title: 'A graph is not a mechanism',
        speaker: 'Dr Lena Shah · quantitative psychologist',
        function: 'Challenges whether the familiar pattern uniquely demonstrates a metacognitive deficit.',
        duration: '3:33',
        audioSrc: '/audio/advanced-ideas/dunning-kruger/a-graph-is-not-a-mechanism.mp3',
        transcript: `When a psychological finding becomes famous, its picture often survives longer than its method. The Dunning–Kruger effect is a particularly clear example. Most people remember a curve in which confidence rises sharply among beginners, collapses after a little learning, and then recovers gradually with expertise. That curve looks explanatory. It also depicts a developmental process that the original studies did not measure. The participants were not followed from novice status to expertise. They completed bounded tasks, received scores and estimated their performance.

My concern is not that self-assessment must be accurate. It plainly is not. My concern is whether the classic analysis demonstrates a special inability among low performers to recognize their errors. Imagine that true skill is distributed continuously, that every test score contains noise and that self-ratings are imperfect but tend to remain closer to the middle of a scale. Now divide participants into quartiles using the noisy test score. The bottom group will contain genuinely weaker performers, but it will also contain people pushed downward by temporary error. Their second measure will usually look less extreme. That is regression toward the mean, not necessarily a metacognitive deficit.

Scale boundaries create another asymmetry. Someone scoring near the bottom has considerable room to overestimate but very little room to underestimate. A participant at the fifth percentile can overestimate by fifty points, yet cannot underestimate by more than five. Near the top, the geometry reverses. If researchers plot signed errors by performance quartile, that bounded structure helps produce the familiar crossing lines. Add a general tendency to rate oneself somewhat above average and the graph becomes even easier to reproduce.

None of this proves that domain knowledge plays no role in self-monitoring. It changes the burden of evidence. A graph that can arise from several generators does not identify which generator operated. To establish a distinctive metacognitive mechanism, we need designs that model individual calibration directly, preserve the continuous data and collect repeated observations across tasks. We should ask whether low performers remain less able to discriminate their correct and incorrect answers after measurement error and scale effects are represented explicitly.

Training evidence can help, but it must also be interpreted carefully. If instruction improves performance, learners may receive clearer cues about what a correct answer looks like. Their estimates may improve because knowledge changed, because the test became more familiar or because the range of possible scores shifted. A useful experiment specifies which pathway should change and measures it separately.

The practical conclusion is not that Dunning and Kruger discovered nothing. Their work made calibration an important research problem and showed why confidence cannot stand alone as proof of competence. The practical conclusion is that a recognizable shape is not a mechanism. Before using the label, ask how groups were formed, how confidence was elicited, where the scale boundaries sit and whether the result survives repeated, task-specific measurement. Statistical criticism does not make psychology disappear. It makes the psychological claim earn its place.`,
        questions: AUDIO_A_QUESTIONS,
      },
      {
        id: 'audio-b',
        eyebrow: 'Position B · qualified application',
        title: 'Keep the question, improve the feedback',
        speaker: 'Professor Marcus Reed · learning scientist',
        function: 'Accepts the statistical critique while defending a narrower role for domain knowledge and diagnostic feedback.',
        duration: '3:31',
        audioSrc: '/audio/advanced-ideas/dunning-kruger/keep-the-question-improve-the-feedback.mp3',
        transcript: `The methodological criticism is persuasive: the viral mountain is not evidence, quartile plots can exaggerate patterns, and a bounded scale can make errors look asymmetric. But none of those points settles the educational question I care about. When learners make a mistake, do they possess the knowledge required to identify why it is a mistake? In some domains, performing and monitoring share part of the same knowledge base. That narrower proposal deserves a better test rather than a social-media slogan or a statistical dismissal.

Consider a technician learning to diagnose faults in a power system. A novice may choose the wrong component and still feel satisfied because the overlooked voltage pattern is precisely the cue an expert uses to reject that diagnosis. Telling the novice to be less confident is almost useless. The learner needs the missing discrimination: under these conditions, this reading rules out that component. Once the rule becomes available, two changes may occur. Performance can improve, and the learner can become better at identifying which earlier answers were vulnerable.

In our training programme, participants make short forecasts before receiving feedback. They estimate whether an answer is correct and record confidence on a scale. Then they complete a practical test and receive feedback that names the cue or decision rule responsible for the result. We repeat this across several cases. The objective is not permanent doubt. A learner who is correct ninety per cent of the time should not speak as though every judgment were a coin toss. The objective is correspondence: confidence should rise where accuracy repeatedly supports it and fall where particular error patterns remain.

This design also changes the ethics of the concept. We do not call a trainee a Dunning–Kruger case. We do not infer global incompetence from an assertive voice. The record is private, repeated and domain-specific. It can show overconfidence, underconfidence or good calibration in a particular class of decisions. It can also show improvement. A label freezes a person; a calibration record describes a relationship that can change with knowledge and feedback.

There is still a serious measurement problem. Confidence scales differ across people, outcomes may be partly subjective and repeated testing can teach the test rather than the underlying skill. For that reason, we compare several task formats and look for transfer to new cases. We also avoid treating a small average effect as a diagnosis of each participant. Some low performers know they are struggling. Some high performers are poorly calibrated. The group pattern never substitutes for the individual evidence.

So my disagreement with a strong statistical skeptic is limited. I accept that the classic graph overstates what we know. I reject the inference that every remaining difference is therefore an artifact. Domain knowledge can plausibly support both action and error detection, and diagnostic training gives us a way to test that proposal. Keep the empirical question, remove the insult, improve the measurement and give learners feedback precise enough to change the next prediction.`,
        questions: AUDIO_B_QUESTIONS,
      },
    ],
    integrationPrompt: 'Compare the two speakers in 120–160 words. Identify one point of agreement, their precise disagreement, the different evidence each prioritizes and one study design both could accept.',
  },
  synthesis: {
    prompt: 'Return to the opening claims. Write 180–230 words explaining which claim you would now defend, which you would reject and why. Integrate the reading and both audio positions, preserve one unresolved question and propose one falsifiable calibration practice.',
    checklist: [
      'I distinguished confidence, competence and calibration.',
      'I represented both audio positions without turning either into a caricature.',
      'I included a statistical limitation and a domain-specific mechanism.',
      'I proposed evidence that could make my conclusion change.',
    ],
  },
}
