import type { GuidedAdvancedLesson } from './advanced-guided-topics.ts'
import { guidedQuestion as q } from './advanced-guided-helpers.ts'

const EVIDENCE_QUESTIONS = [
  q('firm-main', 'Main purpose', 'What is the reading mainly trying to establish?',
    ['Generosity should replace self-protection in difficult relationships', 'Strength can support both self-preservation and effective help', 'Firmness is mainly a technique for winning interpersonal disputes', 'Ethical action follows one rule regardless of practical consequences'], 1,
    'The framework treats firmness and generosity as two applications of effective strength.', 'purpose-reduction',
    ['The framework rejects help that destroys the helper’s agency.', '', 'Winning a dispute is not the ethical objective.', 'Consequences and capacity are central to the framework.']),
  q('firm-strength', 'Concept distinction', 'What does strength mean inside this framework?',
    ['Physical force used to secure obedience from other people', 'Emotional certainty maintained without reconsidering any evidence', 'Social status that guarantees influence within a group', 'Effective capacity to sustain agency and carry action through'], 3,
    'Strength names the practical capacity that makes firmness and generosity effective rather than merely intended.', 'strength-as-dominance',
    ['Force over others is not the defining feature.', 'Refusal to update can be rigidity rather than strength.', 'Status does not guarantee practical capacity.', '']),
  q('firm-firmness', 'Definition', 'Which action best illustrates firmness as defined here?',
    ['Protecting conditions needed to remain an acting subject', 'Rejecting every request that creates personal inconvenience', 'Speaking forcefully enough to end all disagreement', 'Maintaining one decision after its evidence has collapsed'], 0,
    'Firmness applies strength to preserving one’s agency and continued capacity to act.', 'boundary-as-refusal',
    ['', 'A boundary is not a rule of automatic refusal.', 'Tone alone does not establish preserved agency.', 'Rigidity can survive after justification disappears.']),
  q('firm-generosity', 'Definition', 'What makes generosity more than a good intention?',
    ['It requires the recipient to express sufficient gratitude afterward', 'It distributes identical resources to every person involved', 'It aims at effective help suited to an actual need', 'It places the giver’s needs permanently below everyone else’s'], 2,
    'Generosity is evaluated through effective support, not intention alone or identical distribution.', 'intention-as-outcome',
    ['Gratitude does not determine whether help was effective.', 'Different needs can require different forms of help.', '', 'Self-erasure undermines the capacity the framework requires.']),
  q('firm-balance', 'Inference', 'Why can generosity without firmness become unstable?',
    ['The recipient will always exploit any offer of support', 'The helper may lose the capacity required to continue helping', 'Firm people never need assistance from anyone else', 'Generous action normally produces conflict inside the group'], 1,
    'If help destroys the agent’s capacity, it weakens the strength from which sustained generosity depends.', 'universal-exploitation',
    ['Exploitation is possible but not universal.', '', 'Firmness does not imply independence from all support.', 'Conflict is not the defining consequence of generosity.']),
  q('firm-equality', 'Concept distinction', 'What does need-sensitive help reject?',
    ['Any attempt to compare the needs of different people', 'The possibility of applying one public standard fairly', 'The value of explaining decisions to affected people', 'The assumption that fairness always means identical inputs'], 3,
    'The framework distinguishes equal respect from mechanically identical assistance.', 'equality-conflation',
    ['Comparison can be necessary for allocating support.', 'Shared standards can coexist with relevant adjustments.', 'Explanation is compatible with need-sensitive judgment.', '']),
  q('firm-objection', 'Counterargument', 'Which criticism does the reading take most seriously?',
    ['The framework may hide power or rationalise self-interest', 'The framework makes every act of assistance morally wrong', 'The framework cannot be expressed through practical examples', 'The framework proves that intentions never matter ethically'], 0,
    'Claims about strength and need can be used to protect privilege unless reasons, effects and power remain inspectable.', 'critique-ignored',
    ['', 'The framework explicitly values effective assistance.', 'The reading applies it to concrete boundary decisions.', 'Intentions matter but cannot substitute for effects.']),
  q('firm-protocol', 'Application', 'Which question belongs first in the proposed protocol?',
    ['Who deserves to control the final decision permanently?', 'Which response will make everyone feel equally satisfied?', 'What agency or capacity is currently at risk?', 'How can disagreement be ended with the least discussion?'], 2,
    'The protocol begins by identifying the agency, safety or capacity that may be threatened.', 'protocol-order',
    ['Permanent control is not the stated aim.', 'Equal satisfaction may be impossible and is not the criterion.', '', 'Efficient silence can conceal rather than solve the conflict.']),
  q('firm-boundary', 'Transfer', 'A teacher declines daily unpaid tutoring but offers weekly office hours. What does this illustrate?',
    ['The teacher values time more than every student’s learning', 'A boundary can preserve capacity while keeping help available', 'Generosity only counts when assistance has no personal cost', 'Firmness requires refusing the original request without alternatives'], 1,
    'The alternative protects sustainable capacity while maintaining a concrete route to assistance.', 'boundary-as-abandonment',
    ['The action preserves both teaching capacity and student support.', '', 'Effective help can involve meaningful cost.', 'The offered alternative is part of the ethical response.']),
  q('firm-update', 'Reasoning', 'What prevents firmness from turning into rigidity?',
    ['A stronger emotional commitment to the original boundary', 'A public promise never to reverse an earlier decision', 'A rule that other people must accept without explanation', 'A stated condition under which the decision would change'], 3,
    'Firmness remains answerable to reasons and should include evidence that could justify revision.', 'steadfastness-as-rigidity',
    ['Intensity does not repair weak reasons.', 'Irreversibility can preserve an error.', 'Authority alone does not supply justification.', '']),
  q('firm-scenario', 'Best response', 'A colleague asks for help during your only recovery period. Which response fits the framework?',
    ['Name the capacity at risk and offer a workable alternative', 'Accept immediately because another person’s need has priority', 'Refuse without explanation to demonstrate a stronger boundary', 'Delay the response until the colleague withdraws the request'], 0,
    'The response combines a clear limit with an effective form of support that the agent can sustain.', 'false-choice',
    ['', 'Automatic acceptance can destroy needed capacity.', 'Unexplained refusal omits the generous direction.', 'Avoidance does not clarify capacity or support.']),
  q('firm-conclusion', 'Best conclusion', 'Which conclusion best preserves the framework’s limits?',
    ['Strong people can determine other people’s needs without consultation', 'Effective outcomes make coercive methods ethically acceptable', 'The triad is a debatable lens, not a psychological law', 'Every conflict can be solved by balancing two equal obligations'], 2,
    'The lesson offers a normative framework to argue with and apply, not an empirical diagnosis or universal algorithm.', 'framework-as-law',
    ['Need-sensitive help should remain accountable to recipients.', 'Effectiveness does not erase coercion or agency.', '', 'Real obligations can conflict without a perfect balance.']),
]

const AUDIO_A_QUESTIONS = [
  q('firm-a-thesis', 'Main claim', 'What is Professor Vega’s central interpretation of the triad?',
    ['Firmness and generosity are alternatives chosen by personality', 'Both virtues depend on an underlying effective capacity', 'Generosity is superior because it concerns more than one person', 'Strength becomes ethical whenever it produces the intended result'], 1,
    'Strength is the enabling capacity through which firmness and generosity become practically effective.', 'thesis-reduction',
    ['The two directions are not personality types.', '', 'Neither direction automatically outranks the other.', 'Intended results do not settle all ethical questions.']),
  q('firm-a-intent', 'Concept distinction', 'Why is good intention insufficient for generosity?',
    ['Intentions cannot be discussed through observable language', 'Recipients always know better than helpers what should happen', 'Any intended benefit necessarily creates an equal personal cost', 'Help must connect intention with capacity, need and effect'], 3,
    'The framework evaluates whether assistance can actually improve another person’s agency.', 'intent-effect-gap',
    ['Intentions can be stated and examined.', 'Recipient knowledge matters but is not treated as infallible.', 'No equal-cost rule appears in the framework.', '']),
  q('firm-a-risk', 'Limitation', 'What danger does the speaker identify in the language of strength?',
    ['It can be used to disguise domination or privilege', 'It makes practical outcomes impossible to evaluate', 'It requires everyone to possess identical resources', 'It eliminates the value of compassionate motivation'], 0,
    'Power can call itself strength, so reasons, affected agency and consequences must remain open to challenge.', 'power-blindness',
    ['', 'The framework explicitly evaluates practical outcomes.', 'The framework rejects mechanically identical provision.', 'Compassion can motivate action without being sufficient.']),
  q('firm-a-test', 'Practical test', 'Which test does the speaker recommend for a firm boundary?',
    ['Whether it makes the speaker appear completely independent', 'Whether it prevents all future requests of the same kind', 'Whether it protects agency while remaining open to reasons', 'Whether it produces immediate agreement from every participant'], 2,
    'A defensible boundary protects real capacity and can identify conditions for revision.', 'appearance-as-virtue',
    ['Independence of appearance is not the ethical criterion.', 'A boundary can be contextual rather than permanent.', '', 'Agreement is not guaranteed by a justified boundary.']),
]

const AUDIO_B_QUESTIONS = [
  q('firm-b-conflict', 'Scenario', 'What capacity is Maya trying to protect?',
    ['Her ability to complete safe clinical work consistently', 'Her authority to assign every shift without consultation', 'Her reputation for never needing help from colleagues', 'Her right to avoid all demanding work permanently'], 0,
    'Maya identifies fatigue as a threat to safe, sustainable clinical performance.', 'capacity-misread',
    ['', 'She does not control the schedule unilaterally.', 'She openly requests a shared solution.', 'She accepts demanding work within sustainable limits.']),
  q('firm-b-reframe', 'Speaker move', 'How does Jonah improve the conversation?',
    ['He proves Maya has misunderstood the staffing numbers', 'He tells Maya to accept the shift as an act of care', 'He reframes the issue as capacity plus team need', 'He removes the urgent case from the team’s responsibilities'], 2,
    'Jonah keeps the boundary visible while asking how the urgent need can still be met.', 'false-dilemma',
    ['He accepts that her fatigue is real.', 'He does not demand self-sacrifice.', '', 'The clinical need remains and requires a plan.']),
  q('firm-b-solution', 'Application', 'Which feature makes the final proposal generous?',
    ['It gives every clinician exactly the same workload immediately', 'It avoids discussing the consequences of chronic understaffing', 'It guarantees that Maya will never cover another urgent case', 'It provides effective cover while protecting future capacity'], 3,
    'The plan meets the present need and preserves sustainable clinical capacity rather than relying on silent exhaustion.', 'solution-criterion',
    ['Equal immediate workload is not the central feature.', 'The dialogue explicitly raises the structural problem.', 'The arrangement is contextual, not permanent immunity.', '']),
  q('firm-b-limit', 'Inference limit', 'What remains unresolved at the end of the dialogue?',
    ['Whether fatigue can ever affect clinical judgment', 'How the organisation will address repeated understaffing', 'Whether Jonah understands the meaning of a boundary', 'How many patients received treatment during the shift'], 1,
    'The immediate case is covered, but the structural staffing pattern still requires action.', 'local-solution-as-systemic',
    ['Both treat fatigue as relevant to safe work.', '', 'Jonah helps articulate the boundary constructively.', 'That detail is not the unresolved ethical issue.']),
]

export const FIRMNESS_GUIDED_LESSON: GuidedAdvancedLesson = {
  kind: 'guided-v3', slug: 'firmeza-fuerza-generosidad', sequence: 5,
  breadcrumbTitle: 'Firmness, strength and generosity',
  title: 'Firmness, strength and generosity',
  subtitle: 'A guided ethical framework for boundaries, capacity and effective help.',
  objective: 'You will distinguish force from capacity, firmness from rigidity and generosity from self-erasure, then apply the framework to a contested boundary.',
  level: 'B2–C1', evidenceClass: 'normative', guidedMinutes: 126, selfStudyMinutes: 74,
  centralQuestion: 'How can a person protect their own agency while using real capacity to support others?',
  openingStatements: { title: 'Which statements sound most logical right now?', instruction: 'Select any claims you could defend. The cards are optional and never block the lesson.', statements: [
    { id: 'firm-s1', text: 'A boundary is ethical only when it protects something more important than comfort.' },
    { id: 'firm-s2', text: 'Generosity without practical effect is still fully successful generosity.' },
    { id: 'firm-s3', text: 'Strength should mean the capacity to act, not power over another person.' },
    { id: 'firm-s4', text: 'Protecting yourself and helping others are always competing obligations.' },
    { id: 'firm-s5', text: 'A firm decision should include conditions under which it could change.' },
    { id: 'firm-s6', text: 'Fair assistance may respond to different needs with different resources.' },
  ] },
  discussion: { targetMinutes: 20, questions: [
    { id: 'experience', kind: 'experience', prompt: 'When has saying no allowed someone to help more effectively later?', teacherIntent: 'Begin with sustainable capacity rather than abstract virtue.', followUps: ['What capacity was protected?', 'Who else was affected?'] },
    { id: 'pattern', kind: 'pattern', prompt: 'Which boundaries protect agency, and which merely avoid discomfort?', teacherIntent: 'Distinguish a reasoned limit from reflexive withdrawal.', followUps: ['What evidence separates them?', 'Can one boundary do both?'] },
    { id: 'mechanism', kind: 'mechanism', prompt: 'How can lost capacity make future generosity less effective?', teacherIntent: 'Build the dependency between strength and sustained help.', followUps: ['Is recovery part of responsibility?', 'Who bears hidden costs?'] },
    { id: 'exception', kind: 'exception', prompt: 'When might generosity require accepting a serious personal cost?', teacherIntent: 'Prevent sustainability from becoming automatic self-protection.', followUps: ['How urgent is the need?', 'What alternatives exist?'] },
    { id: 'concept', kind: 'concept', prompt: 'What separates firmness from stubbornness or rigidity?', teacherIntent: 'Elicit responsiveness to reasons and update conditions.', followUps: ['Can a firm person reverse course?', 'What would justify that?'] },
    { id: 'evidence', kind: 'evidence', prompt: 'How could we judge whether an act of help was effective?', teacherIntent: 'Make normative language answerable to observable consequences.', followUps: ['Whose outcome counts?', 'Over what time period?'] },
  ] },
  recordings: {
    baseline: { id: 'baseline', label: 'Your explanation before the reading', targetSeconds: '60–90 seconds', prompt: 'Describe a conflict between a boundary and a request for help. Explain what strength, firmness and generosity would each mean.', privacyNote: 'The recording stays in this browser tab. It is not uploaded or sent to a teacher.' },
    postReading: { id: 'post-reading', label: 'What did you understand?', targetSeconds: '75–120 seconds', prompt: 'Explain the triad, one objection, one application and one unresolved question.', privacyNote: 'The recording stays in this browser tab. Refreshing or closing the tab removes it.' },
    final: { id: 'final', label: 'Return to your first explanation', targetSeconds: '90–120 seconds', prompt: 'Revisit the conflict using capacity, agency, effective help and an update condition.', privacyNote: 'This comparison remains on the device. There is no teacher inbox yet.' },
  },
  vocabulary: [
    { category: 'Phrasal verbs', term: 'to stand firm', partOfSpeech: 'phrasal verb', meaning: 'To maintain a justified position under pressure.', collocation: 'stand firm on a boundary', example: 'She stood firm while explaining what the boundary protected.' },
    { category: 'Phrasal verbs', term: 'to follow through', partOfSpeech: 'phrasal verb', meaning: 'To complete an intended action effectively.', collocation: 'follow through on support', example: 'Good intentions matter only if the team can follow through.' },
    { category: 'Phrasal verbs', term: 'to wear down', partOfSpeech: 'phrasal verb', meaning: 'To reduce strength gradually through repeated pressure.', collocation: 'wear someone down', example: 'Repeated emergency shifts wore the clinicians down.' },
    { category: 'Phrasal verbs', term: 'to step in', partOfSpeech: 'phrasal verb', meaning: 'To intervene and provide needed assistance.', collocation: 'step in temporarily', example: 'Jonah stepped in while the schedule was reorganised.' },
    { category: 'Phrasal verbs', term: 'to back down', partOfSpeech: 'phrasal verb', meaning: 'To withdraw a position after pressure or new reasons.', collocation: 'refuse to back down', example: 'Not backing down is admirable only when the reasons survive.' },
    { category: 'Useful language', term: 'capacity at risk', partOfSpeech: 'noun phrase', meaning: 'An ability that a decision may damage or exhaust.', collocation: 'identify capacity at risk', example: 'Safe clinical judgment was the capacity at risk.' },
    { category: 'Useful language', term: 'effective help', partOfSpeech: 'noun phrase', meaning: 'Assistance that can realistically improve another person’s situation.', collocation: 'offer effective help', example: 'The alternative schedule offered effective help.' },
    { category: 'Useful language', term: 'need-sensitive', partOfSpeech: 'adjective', meaning: 'Adjusted to relevant differences in need.', collocation: 'need-sensitive support', example: 'The team designed need-sensitive support rather than equal shifts.' },
    { category: 'Useful language', term: 'on those grounds', partOfSpeech: 'discourse phrase', meaning: 'For the reasons just stated.', collocation: 'refuse on those grounds', example: 'She declined the extra shift on those grounds.' },
    { category: 'Useful language', term: 'subject to revision', partOfSpeech: 'adjective phrase', meaning: 'Open to change when reasons or evidence change.', collocation: 'remain subject to revision', example: 'A firm boundary can remain subject to revision.' },
    { category: 'Adjectives', term: 'sustainable', partOfSpeech: 'adjective', meaning: 'Able to continue without destroying required capacity.', collocation: 'sustainable assistance', example: 'Weekly office hours created sustainable assistance.' },
    { category: 'Adjectives', term: 'steadfast', partOfSpeech: 'adjective', meaning: 'Reliably committed despite difficulty.', collocation: 'steadfast commitment', example: 'Her steadfast commitment still remained open to evidence.' },
    { category: 'Adjectives', term: 'rigid', partOfSpeech: 'adjective', meaning: 'Unwilling to adapt when relevant reasons change.', collocation: 'rigid refusal', example: 'A rigid refusal can resemble firmness from a distance.' },
    { category: 'Adjectives', term: 'coercive', partOfSpeech: 'adjective', meaning: 'Using pressure that undermines another person’s agency.', collocation: 'coercive demand', example: 'An effective outcome does not justify a coercive demand.' },
    { category: 'Adjectives', term: 'answerable', partOfSpeech: 'adjective', meaning: 'Required to respond to reasons, effects and criticism.', collocation: 'answerable to evidence', example: 'The boundary remained answerable to new evidence.' },
    { category: 'Nouns', term: 'agency', partOfSpeech: 'noun', meaning: 'The capacity to choose and act purposefully.', collocation: 'preserve agency', example: 'The agreement preserved each clinician’s agency.' },
    { category: 'Nouns', term: 'fortitude', partOfSpeech: 'noun', meaning: 'Strength that supports action through difficulty.', collocation: 'moral fortitude', example: 'Fortitude enabled both the refusal and the later assistance.' },
    { category: 'Nouns', term: 'firmness', partOfSpeech: 'noun', meaning: 'Strength applied to preserving one’s own agency.', collocation: 'measured firmness', example: 'Her firmness protected the conditions for safe work.' },
    { category: 'Nouns', term: 'generosity', partOfSpeech: 'noun', meaning: 'Strength applied to effective support for others.', collocation: 'effective generosity', example: 'The rota turned goodwill into effective generosity.' },
    { category: 'Nouns', term: 'self-erasure', partOfSpeech: 'noun', meaning: 'The removal of one’s own needs or agency from consideration.', collocation: 'confuse care with self-erasure', example: 'The framework refuses to confuse care with self-erasure.' },
  ],
  reading: {
    title: 'Strength in two directions',
    dek: 'This is a framework to debate, not a diagnostic law. It asks whether a person can preserve agency and make help effective at the same time.',
    blocks: [
      { id: 'triad', role: 'definition', heading: 'One capacity, two directions', prediction: 'Can self-protection and help arise from the same virtue?', paragraphs: ['In the framework developed from Spinozist language and later materialist ethics, strength or fortitude is not domination. It is effective capacity: the ability to remain an acting subject and to carry action through. Firmness applies that capacity toward preserving one’s own agency. Generosity applies it toward helping other people preserve or improve theirs.', 'The three terms therefore do not form a competition in which generosity defeats firmness. They form a dependency. A boundary without capacity may be only a wish. Help without capacity may be only an impulse. The framework evaluates how intention becomes sustainable action.'], glossaryTerms: ['fortitude', 'firmness', 'generosity'] },
      { id: 'firm-not-rigid', role: 'example', heading: 'Firm does not mean immovable', paragraphs: ['A justified boundary names what it protects: health, attention, safety, time or another condition of agency. It can withstand pressure without becoming immune to reasons. A decision that cannot state what would make it change risks becoming rigidity.', 'A teacher who cannot provide daily unpaid tutoring may offer scheduled office hours. The limit protects preparation and recovery; the alternative keeps assistance real. The example does not prove that every refusal is ethical. It shows the kind of explanation the framework requires.'], pausePrompt: 'What evidence would distinguish a protective boundary from avoidance?', glossaryTerms: ['stand firm', 'subject to revision', 'rigid'] },
      { id: 'effective', role: 'evidence', heading: 'Why effect belongs in the judgment', paragraphs: ['The framework treats generosity as more than benevolent feeling. Help must connect with another person’s actual situation and with the helper’s capacity to follow through. A grand promise that cannot be delivered may express warmth while worsening uncertainty.', 'Effectiveness does not mean the end justifies any means. Assistance that humiliates, coerces or removes the recipient’s agency can contradict the very capacity it claims to support. Outcomes, methods and the recipient’s perspective must all remain visible.'], pausePrompt: 'Who should participate in defining whether the help worked?', glossaryTerms: ['follow through', 'effective help', 'coercive'] },
      { id: 'different-needs', role: 'application', heading: 'Equal respect, different needs', prediction: 'Does fairness require giving everyone the same input?', paragraphs: ['Need-sensitive support can allocate different resources without treating people as unequal in worth. A novice may need direct instruction; an experienced colleague may need autonomy. Identical assistance can be wasteful for one person and inadequate for another.', 'This judgment is vulnerable to bias, so it needs criteria, consultation and revision. Declaring what another person needs from a position of power is not automatically generous. The recipient’s agency and the effects of the intervention are part of the evidence.'], glossaryTerms: ['need-sensitive', 'equal respect', 'agency'] },
      { id: 'objections', role: 'counterargument', heading: 'Power can borrow the language of strength', paragraphs: ['A leader may call control “firmness,” or describe protecting privilege as preserving capacity. A helper may define success without asking the person being helped. The framework does not automatically prevent these distortions.', 'Its defence must therefore be procedural as well as conceptual: name the capacity at risk, expose who bears the cost, consult affected people, compare alternatives and state an update condition. Strength becomes ethically interesting only when its application remains answerable to reasons and consequences.'], pausePrompt: 'Which phrase in the triad could most easily conceal power?', glossaryTerms: ['answerable', 'self-interest', 'power asymmetry'] },
      { id: 'protocol', role: 'scope-limit', heading: 'A framework, not an algorithm', paragraphs: ['No formula can calculate the perfect balance between self-preservation and assistance. Emergencies may justify high personal cost; chronic demands may make the same cost destructive. Obligations can conflict, evidence can remain incomplete and reasonable people can disagree.', 'Use the triad as a sequence of questions: What agency is at risk? What capacity is genuinely available? What form of help could work? Who bears hidden costs? What would make the decision change? The quality of the response lies in its reasons and effects, not in attaching a virtuous label to it.'], pausePrompt: 'Which question is missing from a conflict you know?', glossaryTerms: ['scope limit', 'hidden cost', 'update condition'] },
    ],
    argumentMap: [
      { label: 'Capacity', text: 'Strength is the effective ability to remain an agent and act.' },
      { label: 'Inward direction', text: 'Firmness protects the conditions of one’s own agency.' },
      { label: 'Outward direction', text: 'Generosity turns capacity into effective support for others.' },
      { label: 'Constraint', text: 'Neither effectiveness nor intention erases agency and method.' },
      { label: 'Objection', text: 'Power can disguise self-interest as strength or need-sensitive help.' },
      { label: 'Use', text: 'Apply the framework through reasons, effects and update conditions.' },
    ],
    sources: [
      { label: 'Gustavo Bueno, “Fortaleza, firmeza y generosidad”', href: 'https://www.filosofia.org/filomat/df468.htm' },
      { label: 'Spinoza, Ethics, Part III (Project Gutenberg)', href: 'https://www.gutenberg.org/ebooks/3800' },
      { label: 'Bueno (1999), Principles of Materialist Bioethics', href: 'https://www.filosofia.org/rev/bas/bas22505.htm' },
    ],
  },
  ieltsPractice: { title: 'Test the framework without turning it into a slogan', instruction: 'Answer all twelve questions before opening feedback. The set tests definition, objection, application and limits; it is not an IELTS band estimate.', questions: EVIDENCE_QUESTIONS },
  listeningLab: {
    status: 'not-produced', relationship: 'complement + scenario',
    plannedTracks: [
      { id: 'audio-a', eyebrow: 'Audio A · philosophical explanation', title: 'Strength in two directions', speaker: 'Professor Lucía Vega · moral philosopher', function: 'Defines the triad, distinguishes effectiveness from intention and raises the problem of power.', estimatedDuration: '3:20–3:45', questions: AUDIO_A_QUESTIONS,
        transcript: `The word strength often produces the wrong image. We imagine force, dominance or emotional hardness. In this ethical framework, strength means effective capacity: the ability to remain an acting subject and to carry a justified action through difficulty. That capacity has two directions. Applied to oneself, it appears as firmness. Applied toward another person, it appears as generosity.

Firmness is not automatic refusal. It protects the conditions under which a person can continue to think, choose and act: health, safety, attention, time or another real capacity. A firm boundary should be able to name what it protects. It should also remain open to reasons. If no possible evidence could change it, we may be looking at rigidity rather than firmness.

Generosity is not merely a warm intention. It aims at effective help. This makes the concept demanding. A promise that cannot be delivered may feel benevolent while increasing another person’s uncertainty. Assistance that ignores what the recipient needs may serve the helper’s self-image more than the recipient’s agency. We have to ask what changed, who defined success and whether the support can be sustained.

The two directions depend on the same capacity. If a person repeatedly sacrifices sleep, health or concentration, their ability to help may collapse. Yet sustainability cannot become a polite word for protecting every comfort. Emergencies can justify significant cost, and some responsibilities are genuinely demanding. The framework does not calculate the answer for us. It identifies questions that an answer must survive.

There is also a political danger. People with power can call domination firmness, or describe privilege as a capacity that must be protected. A helper can call an imposed solution generous. For that reason, the triad needs procedural tests: expose who bears the cost, consult affected people, compare alternatives and state what would justify revision. Strength becomes ethical neither because it wins nor because it achieves any intended result. It becomes ethically defensible when it preserves agency, makes help effective and remains answerable to reasons, methods and consequences.`,
      },
      { id: 'audio-b', eyebrow: 'Audio B · represented decision', title: 'The last safe shift', speaker: 'Maya and Jonah · hospital handover', function: 'Applies the triad to fatigue, an urgent staffing need and a structural problem that one generous act cannot solve.', estimatedDuration: '3:15–3:40', questions: AUDIO_B_QUESTIONS,
        transcript: `Maya: I cannot take another overnight shift tomorrow. I have covered three emergencies this week, and today I nearly entered the wrong dosage before I caught it.

Jonah: We still have an uncovered shift and an urgent case. If you say no, someone else has to absorb it.

Maya: I know. My answer is not that the case does not matter. My concentration is becoming unreliable. If I keep presenting exhaustion as commitment, I am putting patients and the team at risk.

Jonah: So the capacity you are protecting is not comfort. It is safe clinical judgment. But we still need a generous direction: how do we meet the need rather than simply moving away from it?

Maya: I can cover the first two hours while Priya travels in, and I can prepare the case notes tonight before I rest. I can also take her Saturday clinic after I recover. I cannot safely remain responsible for the full night.

Jonah: That sounds workable for this case. I will cover the middle period and call Priya. But I do not want us to treat this arrangement as proof that the staffing system works. We keep solving structural shortages through private sacrifice.

Maya: Exactly. One emergency may justify unusual cost. Repeated emergencies become a management decision. My boundary should change if the risk changes—for example, if no qualified cover exists and the patient faces immediate harm. It should not change merely because exhaustion is praised as generosity.

Jonah: Then our plan is firm and generous in separate ways. You have named the capacity at risk and a condition for revision. We have also designed actual cover instead of offering sympathy. Tomorrow we should document the repeated gaps and ask for a rota review.

Maya: Yes. The immediate need is real, and so is the future capacity of the team. If our solution saves tonight by making next week less safe, it is not strong enough.`,
      },
    ],
    integrationPrompt: 'Explain how the dialogue operationalises the philosophical framework. Identify the protected capacity, the effective help, the update condition and the structural question that remains.',
  },
  synthesis: { prompt: 'A colleague says, “If you were generous, you would say yes.” Write 180–230 words that define the three terms, answer the pressure without caricaturing the need, propose effective help and state one condition that could change your boundary.', checklist: ['I distinguished strength from dominance.', 'I separated firmness from rigidity.', 'I evaluated generosity through effect and agency.', 'I included an update condition and a power-related objection.'] },
}
