import type { GuidedAdvancedLesson } from './advanced-guided-topics.ts'
import { guidedQuestion as q } from './advanced-guided-helpers.ts'

const EVIDENCE_QUESTIONS = [
  q('confirm-purpose', 'Main purpose', 'What is the reading mainly designed to explain?',
    ['Why confident people refuse all evidence that challenges them', 'How belief shapes search, interpretation and later memory', 'Why social media created a completely new reasoning failure', 'How scientific training permanently removes motivated judgment'], 1,
    'The reading separates three stages through which a tentative belief can influence later evidence handling.', 'purpose-overstatement',
    ['Confidence is neither necessary nor sufficient for the pattern.', '', 'The cited research predates social media.', 'Training can improve procedure without guaranteeing immunity.']),
  q('confirm-wason', 'Factual detail', 'What made the classic number-sequence task diagnostic?',
    ['Participants received different hidden rules for every proposed sequence', 'The correct answer depended on remembering the initial numbers exactly', 'Participants had to estimate how many other people shared their rule', 'Confirming examples could fit both a narrow and a broader rule'], 3,
    'A sequence consistent with “numbers increasing by two” also fit the broader rule “numbers increasing.”', 'task-misread',
    ['The experiment used one rule within the task.', 'Memory for the initial sequence was not the critical mechanism.', 'Social agreement was not the measured problem.', '']),
  q('confirm-test', 'Concept distinction', 'Which test is most diagnostic for “all remote workers are less productive”?',
    ['A remote team outperforming a comparable office team', 'A story describing one remote worker who missed a deadline', 'A survey asking managers whether remote work feels efficient', 'A list of companies that recently adopted office mandates'], 0,
    'A well-matched counterexample directly tests whether the universal claim can survive.', 'confirmatory-test',
    ['', 'One compatible failure does not distinguish rival explanations.', 'Manager impressions do not directly measure productivity.', 'Policy adoption does not establish the causal claim.']),
  q('confirm-interpret', 'Mechanism', 'What is biased assimilation?',
    ['Forgetting every source encountered before forming an opinion', 'Choosing only sources that use familiar vocabulary and examples', 'Evaluating mixed evidence more favourably when it supports prior views', 'Changing a belief whenever a new study uses a larger sample'], 2,
    'Biased assimilation concerns asymmetric evaluation of evidence according to whether it supports an existing position.', 'mechanism-confusion',
    ['Memory loss is not the defining mechanism.', 'Familiarity can matter but does not define the construct.', '', 'Larger samples do not automatically produce belief reversal.']),
  q('confirm-search', 'Inference', 'Why is “look for opposing evidence” an incomplete instruction?',
    ['Opposing evidence is normally less accurate than supporting evidence', 'A person may search broadly yet judge contrary evidence asymmetrically', 'Search engines prevent users from locating genuinely mixed results', 'Only domain experts can recognise evidence that challenges a claim'], 1,
    'Search diversity does not correct biased interpretation, source standards or memory by itself.', 'single-stage-solution',
    ['Contrary evidence is not assumed to be weaker.', '', 'The claim is about evaluation as well as availability.', 'Non-experts can use explicit comparison procedures.']),
  q('confirm-memory', 'Scope', 'What does the reading claim about memory?',
    ['People intentionally erase every fact that causes discomfort', 'Memory records all evidence accurately but hides some retrieval', 'Contrary information cannot enter long-term memory at all', 'Recall can favour belief-consistent material under some conditions'], 3,
    'The reading makes a conditional claim about selective recall, not deliberate erasure or total exclusion.', 'memory-universalised',
    ['The process need not be conscious.', 'Encoding and retrieval are not described as complete.', 'Contrary information can be remembered.', '']),
  q('confirm-not-lie', 'Counterargument', 'Why does the writer say the bias is not simply dishonesty?',
    ['The standards can shift before a person notices the asymmetry', 'Dishonest people are unable to understand statistical evidence', 'A sincere belief always produces an accurate interpretation', 'Only public statements can reveal biased reasoning processes'], 0,
    'Confirmation bias can operate through sincere but uneven testing and evaluation.', 'bias-as-lying',
    ['', 'Dishonesty is not linked to statistical inability.', 'Sincerity does not establish accuracy.', 'Private search and interpretation can also be biased.']),
  q('confirm-protocol', 'Application', 'What should be written before collecting new evidence?',
    ['A persuasive summary defending the preferred explanation', 'A list of people likely to agree with the conclusion', 'A rival prediction and a condition for updating', 'A final confidence score that cannot later be revised'], 2,
    'Precommitting to rival predictions and update conditions makes later asymmetry easier to detect.', 'post-hoc-standard',
    ['Persuasion before testing strengthens commitment.', 'Agreement is not diagnostic evidence.', '', 'Confidence should remain revisable.']),
  q('confirm-polarise', 'Inference', 'How can the same mixed evidence increase disagreement?',
    ['Each group receives a completely different set of studies', 'Each group can privilege the study supporting its prior view', 'Mixed evidence contains no information relevant to either view', 'Participants are instructed to reach opposite conclusions beforehand'], 1,
    'Asymmetric evaluation can make each side leave the same evidence more committed to its starting position.', 'exposure-as-agreement',
    ['The classic design exposed groups to the same mixed evidence.', '', 'The evidence may be relevant yet inconclusive.', 'Prior positions existed, but opposite answers were not assigned.']),
  q('confirm-redteam', 'Application', 'What makes a red-team review genuinely useful?',
    ['The critic uses harsher language than the original author', 'The team removes every claim that produces disagreement', 'The most senior reviewer decides which evidence is credible', 'The review tests the claim against an explicit rival explanation'], 3,
    'A structured rival and shared standards make criticism diagnostic rather than merely adversarial.', 'criticism-as-diagnostic',
    ['Tone does not determine diagnostic value.', 'Disagreement can reveal useful uncertainty.', 'Seniority does not replace transparent criteria.', '']),
  q('confirm-transfer', 'Transfer', 'A doctor suspects diagnosis X. Which next step best reduces confirmatory testing?',
    ['List findings expected under X and under its strongest alternative', 'Order only the test most commonly associated with diagnosis X', 'Search for case reports in which diagnosis X was confirmed', 'Ask the patient whether diagnosis X sounds plausible to them'], 0,
    'Comparing predicted observations under rival diagnoses creates a diagnostic test rather than a compatibility check.', 'rival-absent',
    ['', 'A familiar test may still fit several diagnoses.', 'Confirmed cases do not test the current alternative.', 'Plausibility to the patient is not a differential test.']),
  q('confirm-conclusion', 'Best conclusion', 'Which conclusion best preserves the reading’s limits?',
    ['Every stable belief is evidence that confirmation bias occurred', 'Exposure to disagreement guarantees a more accurate final belief', 'Better procedures reduce asymmetry without promising complete neutrality', 'People should suspend judgment until all relevant evidence is available'], 2,
    'Explicit rivals, shared standards and update rules improve testing but do not remove every influence.', 'debiasing-guarantee',
    ['Stability can follow strong evidence.', 'Disagreement can polarise when evaluation is asymmetric.', '', 'Decisions often must be made under incomplete evidence.']),
]

const AUDIO_A_QUESTIONS = [
  q('confirm-a-definition', 'Main claim', 'How does Dr Okafor define the central problem?',
    ['People deliberately hide every fact that weakens their identity', 'Beliefs can influence several stages of evidence processing', 'Online algorithms cause all modern forms of selective reasoning', 'Memory is the only stage at which confirmation bias operates'], 1,
    'The speaker distinguishes search, interpretation and memory rather than reducing the bias to one act.', 'definition-reduction',
    ['The process can be sincere and partly unnoticed.', '', 'Algorithms may amplify but did not create the pattern.', 'Search and interpretation are also discussed.']),
  q('confirm-a-wason', 'Evidence', 'What does the number-sequence example demonstrate?',
    ['Broad rules are impossible to discover through examples', 'Participants cannot remember more than three numbers reliably', 'Every confirming case provides strong evidence for one hypothesis', 'Compatible examples may fail to distinguish rival hypotheses'], 3,
    'A confirming sequence can fit both the learner’s narrow rule and the experimenter’s broader rule.', 'compatibility-as-diagnosis',
    ['The broad rule can be found through discriminating tests.', 'Memory capacity is not the relevant result.', 'Compatibility does not identify which rule generated the case.', '']),
  q('confirm-a-limit', 'Limitation', 'Which limitation does the speaker explicitly retain?',
    ['Preference for supporting evidence can sometimes be rational', 'Contrary evidence should always receive greater weight', 'Strong beliefs necessarily produce stronger reasoning errors', 'Formal science prevents uneven evaluation from occurring'], 0,
    'Search can rationally follow prior probability, expertise or information value; asymmetry is not automatically bias.', 'rational-search-ignored',
    ['', 'The goal is equal standards, not reversed favouritism.', 'The relationship is not stated as necessary.', 'Scientific procedures reduce but do not abolish bias.']),
  q('confirm-a-tool', 'Practical tool', 'What does Dr Okafor recommend before searching?',
    ['Collect as many sources as possible without ranking them', 'Choose the conclusion that requires the fewest future tests', 'Write a rival prediction and an update condition', 'Ask another person to make the decision instead'], 2,
    'A pre-specified rival and update rule reveal whether later standards move with the preferred answer.', 'tool-substitution',
    ['Quantity alone does not correct asymmetric evaluation.', 'Ease of testing does not determine truth.', '', 'Delegation can transfer rather than solve the asymmetry.']),
]

const AUDIO_B_QUESTIONS = [
  q('confirm-b-claim', 'Scenario', 'What claim is the newsroom trying to test?',
    ['The new school policy caused the reported attendance increase', 'Parents generally support every stricter school attendance rule', 'The district has accurately counted all absent students', 'Reporters should publish only statistically significant findings'], 0,
    'The team is evaluating a causal claim about the policy and attendance.', 'claim-misidentified',
    ['', 'Parent support is not the central causal claim.', 'Data quality matters but is not the only question.', 'Significance is not proposed as the publication rule.']),
  q('confirm-b-rival', 'Reasoning move', 'Which rival explanation does Noor introduce?',
    ['The policy may have changed teacher attitudes toward reporting', 'Attendance gains are impossible in districts with severe weather', 'The increase may reflect a calendar and transport change', 'Parents may have misunderstood the published attendance rate'], 2,
    'Noor identifies simultaneous calendar and bus-route changes that could explain part of the increase.', 'rival-missed',
    ['Teacher reporting is not her stated alternative.', 'She does not claim gains are impossible.', '', 'Parent interpretation occurs after the measured change.']),
  q('confirm-b-standard', 'Application', 'What standard do the editors agree to apply?',
    ['Use stricter evidence only for the rival explanation', 'Publish the original story before checking other districts', 'Accept any explanation supported by one interview', 'Ask what each explanation predicts in comparable districts'], 3,
    'Both the policy claim and the rival are tested against observable comparative predictions.', 'asymmetric-standard',
    ['Unequal standards recreate the problem.', 'Premature publication increases commitment.', 'One interview is compatible with many mechanisms.', '']),
  q('confirm-b-outcome', 'Inference limit', 'What is the responsible outcome of the meeting?',
    ['The policy claim is proven false before further reporting', 'The headline is delayed while rival predictions are tested', 'The team decides causal language is never appropriate', 'The transport explanation becomes the new accepted conclusion'], 1,
    'The team preserves uncertainty and gathers evidence capable of separating the explanations.', 'rival-as-verdict',
    ['The evidence is not yet sufficient to reject the policy effect.', '', 'Causal language can be justified with stronger design.', 'A rival hypothesis is a test, not a replacement verdict.']),
]

export const CONFIRMATION_BIAS_GUIDED_LESSON: GuidedAdvancedLesson = {
  kind: 'guided-v3', slug: 'sesgo-confirmacion', sequence: 6,
  breadcrumbTitle: 'Confirmation bias', title: 'When a hunch starts choosing the evidence',
  subtitle: 'A guided seminar on search, interpretation, memory and diagnostic tests.',
  objective: 'You will distinguish supporting evidence from discriminating evidence, test a preferred explanation against a rival and design an explicit update rule.',
  level: 'B2–C1', evidenceClass: 'empirical', guidedMinutes: 128, selfStudyMinutes: 76,
  centralQuestion: 'How can we test a belief when the belief itself helps decide what counts as evidence?',
  openingStatements: { title: 'Which statements sound most logical right now?', instruction: 'Select any claims you could defend. The cards are optional and never block the lesson.', statements: [
    { id: 'confirm-s1', text: 'Finding several supporting examples makes a hypothesis highly probable.' },
    { id: 'confirm-s2', text: 'The best test is one that different hypotheses predict differently.' },
    { id: 'confirm-s3', text: 'Reading opposing views is enough to correct confirmation bias.' },
    { id: 'confirm-s4', text: 'A sincere person can apply stricter standards to unwelcome evidence.' },
    { id: 'confirm-s5', text: 'Changing your mind quickly is always evidence of open-mindedness.' },
    { id: 'confirm-s6', text: 'An update condition should be stated before the result is known.' },
  ] },
  discussion: { targetMinutes: 20, questions: [
    { id: 'experience', kind: 'experience', prompt: 'When have you noticed evidence only after forming an opinion?', teacherIntent: 'Collect low-stakes examples before discussing identity or politics.', followUps: ['What made it noticeable?', 'What had you ignored earlier?'] },
    { id: 'pattern', kind: 'pattern', prompt: 'At which stage can a belief shape evidence: search, interpretation or memory?', teacherIntent: 'Separate mechanisms hidden under one label.', followUps: ['Which stage is easiest to observe?', 'Can they reinforce each other?'] },
    { id: 'mechanism', kind: 'mechanism', prompt: 'Why do confirming examples often feel more diagnostic than they are?', teacherIntent: 'Elicit compatibility versus discrimination.', followUps: ['What rival also predicts the example?', 'What case would separate them?'] },
    { id: 'exception', kind: 'exception', prompt: 'When is searching for supporting evidence rational rather than biased?', teacherIntent: 'Protect prior probability, expertise and information value as legitimate factors.', followUps: ['What makes the search proportionate?', 'Would standards stay equal?'] },
    { id: 'concept', kind: 'concept', prompt: 'What is the difference between an opposing opinion and disconfirming evidence?', teacherIntent: 'Prevent disagreement from being treated as automatic evidence.', followUps: ['What prediction is tested?', 'What would count as failure?'] },
    { id: 'evidence', kind: 'evidence', prompt: 'How could you detect whether your evaluation standard moved?', teacherIntent: 'Introduce precommitment and blind comparison.', followUps: ['Could labels be hidden?', 'What rule would be written first?'] },
  ] },
  recordings: {
    baseline: { id: 'baseline', label: 'Your explanation before the reading', targetSeconds: '60–90 seconds', prompt: 'Explain how a hunch could influence later evidence. Separate search from interpretation and give one exception.', privacyNote: 'The recording stays in this browser tab. It is not uploaded or sent to a teacher.' },
    postReading: { id: 'post-reading', label: 'What did you understand?', targetSeconds: '75–120 seconds', prompt: 'Explain the central mechanism, the number-sequence evidence, one limitation and one debiasing procedure.', privacyNote: 'The recording stays in this browser tab. Refreshing or closing the tab removes it.' },
    final: { id: 'final', label: 'Return to your first explanation', targetSeconds: '90–120 seconds', prompt: 'Rebuild your explanation using rival prediction, shared standard and update condition.', privacyNote: 'This comparison remains on the device. There is no teacher inbox yet.' },
  },
  vocabulary: [
    { category: 'Phrasal verbs', term: 'to seek out', partOfSpeech: 'phrasal verb', meaning: 'To deliberately search for something.', collocation: 'seek out contrary evidence', example: 'The editor sought out evidence that could weaken the claim.' },
    { category: 'Phrasal verbs', term: 'to rule out', partOfSpeech: 'phrasal verb', meaning: 'To eliminate an explanation as incompatible with evidence.', collocation: 'rule out a rival', example: 'The first test did not rule out the transport explanation.' },
    { category: 'Phrasal verbs', term: 'to latch onto', partOfSpeech: 'phrasal verb', meaning: 'To become quickly attached to an idea or detail.', collocation: 'latch onto a clue', example: 'The team latched onto the first encouraging statistic.' },
    { category: 'Phrasal verbs', term: 'to brush aside', partOfSpeech: 'phrasal verb', meaning: 'To dismiss something without adequate consideration.', collocation: 'brush aside a counterexample', example: 'They brushed aside the district that did not improve.' },
    { category: 'Phrasal verbs', term: 'to hold up', partOfSpeech: 'phrasal verb', meaning: 'To remain credible under examination.', collocation: 'hold up under scrutiny', example: 'The causal claim had to hold up under comparison.' },
    { category: 'Useful language', term: 'all else being equal', partOfSpeech: 'discourse phrase', meaning: 'Assuming other relevant conditions remain constant.', collocation: 'predict all else being equal', example: 'The policy should help comparable districts, all else being equal.' },
    { category: 'Useful language', term: 'what would change my mind', partOfSpeech: 'clause', meaning: 'A predeclared condition for revising a belief.', collocation: 'state what would change my mind', example: 'She wrote what would change her mind before searching.' },
    { category: 'Useful language', term: 'by the same standard', partOfSpeech: 'prepositional phrase', meaning: 'Using an equal criterion for competing claims.', collocation: 'judge by the same standard', example: 'Both explanations were judged by the same standard.' },
    { category: 'Useful language', term: 'rival prediction', partOfSpeech: 'noun phrase', meaning: 'An outcome expected by a competing explanation.', collocation: 'compare rival predictions', example: 'The bus change generated a rival prediction.' },
    { category: 'Useful language', term: 'diagnostic of', partOfSpeech: 'adjective phrase', meaning: 'Able to distinguish one explanation from alternatives.', collocation: 'diagnostic of causation', example: 'One successful school was not diagnostic of causation.' },
    { category: 'Adjectives', term: 'confirmatory', partOfSpeech: 'adjective', meaning: 'Seeking or supporting compatibility with a belief.', collocation: 'confirmatory search', example: 'Confirmatory search found many unsurprising examples.' },
    { category: 'Adjectives', term: 'disconfirming', partOfSpeech: 'adjective', meaning: 'Capable of counting against a hypothesis.', collocation: 'disconfirming case', example: 'A matched counterexample would be disconfirming.' },
    { category: 'Adjectives', term: 'diagnostic', partOfSpeech: 'adjective', meaning: 'Useful for distinguishing competing explanations.', collocation: 'diagnostic test', example: 'The team designed a diagnostic comparison.' },
    { category: 'Adjectives', term: 'belief-consistent', partOfSpeech: 'adjective', meaning: 'Aligned with an existing belief.', collocation: 'belief-consistent evidence', example: 'Belief-consistent studies received gentler criticism.' },
    { category: 'Adjectives', term: 'provisional', partOfSpeech: 'adjective', meaning: 'Accepted temporarily and open to revision.', collocation: 'provisional conclusion', example: 'The editor kept the causal claim provisional.' },
    { category: 'Nouns', term: 'hypothesis', partOfSpeech: 'noun', meaning: 'A proposed explanation or rule that can be tested.', collocation: 'test a hypothesis', example: 'Each hypothesis generated a different comparison.' },
    { category: 'Nouns', term: 'counterexample', partOfSpeech: 'noun', meaning: 'A case that conflicts with a general claim.', collocation: 'find a counterexample', example: 'One strong counterexample defeated the universal statement.' },
    { category: 'Nouns', term: 'biased assimilation', partOfSpeech: 'noun phrase', meaning: 'Uneven evaluation of mixed evidence according to prior belief.', collocation: 'observe biased assimilation', example: 'Both groups displayed biased assimilation of the studies.' },
    { category: 'Nouns', term: 'precommitment', partOfSpeech: 'noun', meaning: 'A rule or criterion fixed before the result is known.', collocation: 'make a precommitment', example: 'The written threshold acted as a precommitment.' },
    { category: 'Nouns', term: 'falsifiability', partOfSpeech: 'noun', meaning: 'The possibility that evidence could count against a claim.', collocation: 'preserve falsifiability', example: 'An update condition preserved falsifiability.' },
  ],
  reading: {
    title: 'When evidence enters a tilted process',
    dek: 'Confirmation bias is not one behaviour. A belief can influence what we seek, how we judge it and what later comes to mind.',
    blocks: [
      { id: 'three-stages', role: 'definition', heading: 'One label, three stages', prediction: 'Can a person search widely and still evaluate evidence unevenly?', paragraphs: ['Confirmation bias is often described as “looking for what you already believe.” That captures only one route. A provisional belief can shape search, interpretation and memory. A person may seek compatible cases, demand stronger methods from an unwelcome study or later recall the evidence that fit the preferred explanation.', 'These processes need not be conscious or dishonest. The important sign is asymmetric treatment: would the same evidence receive the same scrutiny if its conclusion were reversed?'], glossaryTerms: ['confirmatory', 'biased assimilation', 'asymmetric'] },
      { id: 'wason', role: 'evidence', heading: 'The test that confirms too easily', prediction: 'Which sequence would you propose after seeing 2–4–6?', paragraphs: ['In Wason’s number-sequence task, participants saw 2–4–6 and tried to discover the experimenter’s rule. Many proposed sequences that fit a narrow hypothesis such as “even numbers increasing by two.” Those examples also fit the broader rule “numbers increasing,” so positive feedback did little to distinguish the hypotheses.', 'A diagnostic test asks where rivals predict different outcomes. A decreasing sequence, for example, could challenge the broader increasing rule. The lesson is not that confirmation never carries information. It is that compatibility with one hypothesis may also be compatibility with many others.'], pausePrompt: 'Name one test your preferred rule predicts differently from a rival.', glossaryTerms: ['hypothesis', 'diagnostic', 'rule out'] },
      { id: 'assimilation', role: 'evidence', heading: 'The same studies, stronger disagreement', paragraphs: ['Lord, Ross and Lepper presented people with mixed studies about capital punishment. Participants tended to rate evidence supporting their prior view as more convincing and criticise opposing evidence more severely. After exposure to the same mixed material, positions could become more polarised rather than less.', 'The study does not mean all criticism of contrary evidence is biased. One study may genuinely have a weaker design. The diagnostic question is whether methods are evaluated by a stable standard or whether the standard moves with the desired conclusion.'], pausePrompt: 'How could study labels be hidden to test an asymmetric standard?', glossaryTerms: ['biased assimilation', 'polarisation', 'shared standard'] },
      { id: 'rational-search', role: 'counterargument', heading: 'Not every selective search is biased', paragraphs: ['Attention is limited. It can be rational to search where evidence is likely, to give prior probability some weight or to rely on expertise. A doctor does not begin every diagnosis by treating every disease as equally probable. Selectivity becomes problematic when alternatives that could change the decision are excluded or held to a different standard.', 'Likewise, rapidly changing a belief is not automatically open-minded. A vivid anecdote can replace one premature conclusion with another. Better reasoning is not permanent doubt; it is proportionate confidence linked to explicit evidence and revisable criteria.'], pausePrompt: 'What legitimate prior information would guide search in your example?', glossaryTerms: ['prior probability', 'proportionate', 'provisional'] },
      { id: 'procedure', role: 'application', heading: 'Build friction before the result', prediction: 'Which rule is hardest to invent after seeing the outcome?', paragraphs: ['Before searching, state the preferred hypothesis, its strongest rival and one observation each predicts differently. Write what would make confidence rise, fall or remain unchanged. Then apply the same quality criteria to supportive and contrary evidence.', 'A red team helps only when it tests a real rival rather than performing ritual disagreement. Blind evaluation, prediction logs and structured checklists can reveal moving standards. They reduce asymmetry without creating a perfectly neutral thinker.'], glossaryTerms: ['precommitment', 'rival prediction', 'red team'] },
      { id: 'limits', role: 'scope-limit', heading: 'A procedure, not an accusation', paragraphs: ['Calling another person biased rarely identifies the failed test. Stable belief can reflect strong evidence; disagreement can reflect different values or background information. A useful critique names the missing rival, unequal standard or absent update condition.', 'The calibrated conclusion is procedural: beliefs can tilt evidence processing, and explicit comparison can make the tilt easier to detect. The aim is not to remove prior beliefs. It is to stop a provisional explanation from quietly becoming the judge of every later fact.'], pausePrompt: 'Rewrite “You are biased” as a testable procedural criticism.', glossaryTerms: ['scope limit', 'update condition', 'falsifiability'] },
    ],
    argumentMap: [
      { label: 'Separate', text: 'Search, interpretation and memory are different routes.' },
      { label: 'Demonstrate', text: 'Compatible examples can fail to distinguish rival rules.' },
      { label: 'Extend', text: 'Mixed evidence may be assimilated through unequal standards.' },
      { label: 'Counter', text: 'Selective search can reflect rational priors and limited attention.' },
      { label: 'Procedure', text: 'Precommit to rivals, predictions, standards and update conditions.' },
      { label: 'Limit', text: 'A procedure reduces asymmetry but does not guarantee neutrality.' },
    ],
    sources: [
      { label: 'Wason (1960), Quarterly Journal of Experimental Psychology', href: 'https://doi.org/10.1080/17470216008416717' },
      { label: 'Lord, Ross & Lepper (1979), Journal of Personality and Social Psychology', href: 'https://doi.org/10.1037/0022-3514.37.11.2098' },
      { label: 'Nickerson (1998), Review of General Psychology', href: 'https://doi.org/10.1037/1089-2680.2.2.175' },
    ],
  },
  ieltsPractice: { title: 'Test the test, not just the conclusion', instruction: 'Answer all twelve questions before opening feedback. The set tests mechanism, diagnostic evidence, procedure and limits; it is not an IELTS band estimate.', questions: EVIDENCE_QUESTIONS },
  listeningLab: {
    status: 'not-produced', relationship: 'complement + scenario',
    plannedTracks: [
      { id: 'audio-a', eyebrow: 'Audio A · research explanation', title: 'The evidence your belief recruits', speaker: 'Dr Nia Okafor · cognitive scientist', function: 'Separates three mechanisms, explains diagnostic testing and preserves rational selective search as a boundary condition.', estimatedDuration: '3:25–3:50', questions: AUDIO_A_QUESTIONS,
        transcript: `Confirmation bias is not simply the decision to ignore an inconvenient fact. A prior belief can influence at least three stages of evidence processing. It can shape where we search, how severely we evaluate what we find and which details later come to mind. Because these stages can reinforce one another, a sincere person may experience a conclusion as increasingly obvious without noticing that the process has become asymmetric.

The classic number-sequence task gives us a clean example. Participants see two, four, six and try to infer the experimenter’s rule. Many form a narrow rule such as even numbers increasing by two. They then propose eight, ten, twelve and receive confirmation. But that sequence also fits the broader rule numbers increasing. The positive result shows compatibility; it does not distinguish the hypotheses.

A better test goes where rivals disagree. If my rule requires equal steps and yours requires only an increase, then one, four, nine separates them better than another equally spaced sequence. Diagnostic evidence is not necessarily negative evidence. It is evidence for which competing explanations generate different predictions.

We should preserve an important limit. Selective search can be rational. Attention is finite, prior probability matters and expertise can identify where information is likely to be useful. The bias is not simply that one source was consulted more than another. It appears when an alternative capable of changing the decision is excluded, or when supportive and contrary evidence face different quality standards.

My preferred intervention happens before the search. Write the favoured hypothesis, the strongest rival and one observation each predicts differently. State what would lower confidence. Then evaluate sources with the same criteria while their conclusions are hidden where possible. This procedure will not make anyone perfectly neutral. Values, prior knowledge and judgment remain. But it creates a record. If the standard moves only after an unwelcome result appears, the movement becomes visible enough to question rather than disappearing inside a confident story.`,
      },
      { id: 'audio-b', eyebrow: 'Audio B · represented decision', title: 'Hold the headline', speaker: 'Noor and Gabriel · investigative editors', function: 'Shows a newsroom replacing a preferred causal story with matched rival predictions and shared publication standards.', estimatedDuration: '3:20–3:45', questions: AUDIO_B_QUESTIONS,
        transcript: `Gabriel: Attendance rose eight per cent after the district introduced the new absence policy. I want the headline to say the policy brought students back to school.

Noor: Before we write causally, what else changed at the same time?

Gabriel: The district says nothing major. We have interviews with two principals who credit the policy.

Noor: The calendar changed, and three bus routes were redesigned after last year’s transport failures. Those are rival explanations. Principals supporting the policy does not tell us which change produced the increase.

Gabriel: We can always invent alternatives. At some point a pattern has to count as evidence.

Noor: It does count. The question is what it is diagnostic of. Let us write predictions. If the policy caused the change, schools with strong enforcement should improve more, after accounting for earlier attendance. If transport mattered, schools served by the redesigned routes should show a different pattern. If the calendar mattered, comparable districts with similar calendar changes may also improve.

Gabriel: That is a much slower story.

Noor: Slower than the headline, faster than publishing a claim we later cannot defend. We should also use the same standard. If one principal’s interview supports the policy, one driver’s interview cannot be treated as proof of transport. Both are clues, not estimates of effect.

Gabriel: Fair. We can request school-level data and compare the route changes. What would make you accept causal language?

Noor: A pattern that follows policy exposure more closely than the rivals, survives a reasonable comparison and is not explained by a reporting change. What would make you lower confidence?

Gabriel: No difference by enforcement, combined with a strong route pattern. Let us write that down before the data arrive.

Noor: Good. We are not replacing the policy story with the transport story. We are preventing the first plausible explanation from choosing every later fact. Hold the headline; keep the question.`,
      },
    ],
    integrationPrompt: 'Compare the laboratory logic with the newsroom procedure. Identify the preferred hypothesis, strongest rival, diagnostic prediction, shared standard and update condition.',
  },
  synthesis: { prompt: 'You believe a new study method caused your recent improvement. Write 180–230 words that state the hypothesis, build a serious rival, propose diagnostic evidence, preserve one rational role for prior belief and specify what would lower your confidence.', checklist: ['I separated search, interpretation and memory.', 'I distinguished compatible from diagnostic evidence.', 'I applied one standard to rival explanations.', 'I stated an update condition without pretending to be neutral.'] },
}
