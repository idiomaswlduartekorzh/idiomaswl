import type { GuidedAdvancedLesson } from './advanced-guided-topics.ts'
import { guidedQuestion as q } from './advanced-guided-helpers.ts'

const EVIDENCE_QUESTIONS = [
  q('zero-purpose', 'Main purpose', 'What is the reading mainly designed to distinguish?',
    ['Economic growth from cooperation across every possible market', 'Objective scarcity versus a general gain-as-loss belief', 'Political disagreement from all measurable resource constraints', 'Personal generosity from strategic bargaining between organised groups'], 1,
    'The reading separates genuinely fixed allocations from a general zero-sum interpretation of social relations.', 'purpose-overreach',
    ['Cooperation does not create growth in every setting.', '', 'Political conflict can involve real constraints.', 'Generosity is not the central distinction.']),
  q('zero-definition', 'Definition', 'When is a situation structurally zero-sum?',
    ['When participants strongly believe that compromise is impossible', 'When resources are scarce enough to create emotional conflict', 'When one side begins with more bargaining power than another', 'When one participant’s gain exactly equals another participant’s loss'], 3,
    'A zero-sum structure has a fixed total, so gains and losses balance exactly.', 'belief-as-structure',
    ['Belief does not determine the payoff structure.', 'Scarcity alone does not establish a fixed total.', 'Unequal power can occur in zero- or non-zero-sum settings.', '']),
  q('zero-belief', 'Concept distinction', 'What is belief in a zero-sum game?',
    ['A general expectation that social gains require others’ losses', 'A mathematical proof that a specific resource cannot expand', 'A temporary negotiation tactic used only in formal markets', 'A preference for equal outcomes after every social exchange'], 0,
    'The construct describes a broad antagonistic belief about how social relations work.', 'construct-confusion',
    ['', 'A worldview is different from a mathematical proof.', 'The belief extends beyond formal negotiation.', 'Equal outcomes do not define zero-sum belief.']),
  q('zero-politics', 'Evidence', 'What did the political studies most directly examine?',
    ['Whether one ideology always produces lower economic growth', 'Whether political knowledge removes antagonistic social beliefs', 'How zero-sum belief varies across issues and ideologies', 'How elected officials divide one fixed national budget annually'], 2,
    'The studies examined associations between ideology, issue position and zero-sum thinking rather than proving one universal partisan pattern.', 'design-substitution',
    ['The studies did not test universal growth effects.', 'Knowledge was not shown to remove the belief.', '', 'A specific annual budget is not the measured worldview.']),
  q('zero-domain', 'Inference', 'Why can one person appear zero-sum on one issue but not another?',
    ['The scale changes its definition for each political ideology', 'Perceived scarcity and group position vary across domains', 'People cannot hold a stable belief across different situations', 'Researchers assign respondents to opposing answers at random'], 1,
    'Issue-specific threat and perceived group advantage can change which gain feels like a loss.', 'trait-only-assumption',
    ['The construct remains conceptually stable.', '', 'General beliefs and domain sensitivity can coexist.', 'Responses are measured, not randomly assigned.']),
  q('zero-scarcity', 'Scope', 'Which claim about scarcity is best supported?',
    ['Scarcity automatically turns every relationship into a fixed-sum game', 'Perceived scarcity matters only when resources are objectively abundant', 'Resource limits disappear once both sides communicate openly', 'Real constraints can exist without fixing every relevant outcome'], 3,
    'A limited resource can coexist with negotiable timing, risk, information or future value.', 'scarcity-equals-zero-sum',
    ['Scarcity can create trade-offs without fixing total value.', 'Perceived scarcity can matter under real constraints too.', 'Communication cannot eliminate physical limits.', '']),
  q('zero-not-naive', 'Counterargument', 'Why does the writer reject “everything is positive-sum”?',
    ['Some allocations genuinely create direct opposing payoffs', 'Cooperation has never increased value in measured settings', 'Conflict always prevents participants from discovering alternatives', 'Any unequal outcome proves that one side has been exploited'], 0,
    'Elections, single prizes and some fixed budgets contain real distributive conflict.', 'optimism-overreach',
    ['', 'The reading preserves value creation as a real possibility.', 'Conflict can coexist with negotiated alternatives.', 'Unequal outcomes do not alone reveal the payoff structure.']),
  q('zero-expand', 'Application', 'Which move most directly tests whether value can expand?',
    ['Demand an equal split before discussing different priorities', 'Hide the strongest alternative from the other participant', 'Ask which interests differ in timing, risk or flexibility', 'Assume every stated position represents a non-negotiable need'], 2,
    'Differences in interests can support trades that improve outcomes without pretending scarcity is absent.', 'position-interest-confusion',
    ['Equal division does not reveal additional dimensions.', 'Concealment can prevent joint problem discovery.', '', 'Positions may conceal flexible underlying interests.']),
  q('zero-language', 'Language analysis', 'What does the phrase “their gain is our loss” often leave unspecified?',
    ['Whether the speakers belong to legally recognised organisations', 'Which resource, mechanism and comparison create the loss', 'Whether both groups use equally emotional vocabulary', 'Which side first introduced competitive language publicly'], 1,
    'A testable claim must identify the resource, pathway, affected group and comparison point.', 'mechanism-missing',
    ['Legal status does not define the causal mechanism.', '', 'Emotional symmetry does not specify the payoff.', 'Who spoke first does not establish the structure.']),
  q('zero-negotiation', 'Transfer', 'Two departments want the same room at the same time. What is fixed first?',
    ['Every future benefit that either department could obtain', 'The amount of status associated with receiving the room', 'The quality of work each team will produce that month', 'Use of that room during that particular time slot'], 3,
    'The immediate slot is rival, while timing, equipment or future access may open additional dimensions.', 'scope-expansion',
    ['Future benefits are not fixed by this conflict.', 'Status meaning is interpreted rather than physically fixed.', 'Monthly output depends on many other conditions.', '']),
  q('zero-test', 'Practical protocol', 'What should be identified before searching for cooperation?',
    ['The exact resource and time horizon that may be fixed', 'The personality type most likely to concede first', 'The side whose moral language sounds more generous', 'The compromise that divides every item into equal halves'], 0,
    'A clear resource and time horizon prevent false optimism and false zero-sum generalisation.', 'structure-undefined',
    ['', 'Personality does not define the payoff structure.', 'Moral tone does not identify constraints.', 'Equal halves may ignore different interests.']),
  q('zero-conclusion', 'Best conclusion', 'Which conclusion best preserves the evidence and limits?',
    ['Zero-sum belief proves that a person misunderstands every conflict', 'Positive-sum language resolves disputes even without changing incentives', 'Test the fixed constraint before assuming either rivalry or expansion', 'Group conflict is mainly produced by inaccurate economic information'], 2,
    'The lesson recommends identifying the actual constraint and then testing additional dimensions.', 'binary-slogan',
    ['A general belief does not diagnose every judgment.', 'Language alone cannot change incompatible incentives.', '', 'Conflict can arise from values, power and real distribution.']),
]

const AUDIO_A_QUESTIONS = [
  q('zero-a-claim', 'Main claim', 'What is Dr Chen’s central distinction?',
    ['Zero-sum language and objective scarcity always describe the same fact', 'A fixed payoff structure differs from a general social belief', 'Political ideology determines whether resources can expand physically', 'Cooperative people rarely notice genuine distributive conflicts'], 1,
    'The speaker separates a mathematical relationship in one setting from a worldview applied across settings.', 'claim-conflation',
    ['Language may misdescribe the structure.', '', 'Ideology does not alter physical resources directly.', 'Cooperative orientation does not imply blindness to conflict.']),
  q('zero-a-evidence', 'Evidence', 'What do cross-national scales measure most directly?',
    ['Whether each national economy produces equal material outcomes', 'How often citizens win formal zero-sum games in laboratories', 'Whether respondents can calculate fixed totals correctly', 'Agreement with antagonistic beliefs about social relations'], 3,
    'The scales assess endorsement of statements suggesting that one person’s gain requires another’s loss.', 'measure-substitution',
    ['Economic equality is a separate outcome.', 'Game performance is not the measured worldview.', 'Arithmetic skill is not the target construct.', '']),
  q('zero-a-limit', 'Limitation', 'Which limitation does Dr Chen emphasise?',
    ['An association does not establish one fixed personality or cause', 'Zero-sum beliefs cannot be compared across cultural contexts', 'Objective scarcity plays no role in social interpretation', 'Issue-specific beliefs are always stronger than general beliefs'], 0,
    'Survey associations do not prove causation or diagnose an unchanging individual trait.', 'correlation-as-cause',
    ['', 'Cross-national measurement is possible with careful invariance testing.', 'The speaker preserves real scarcity as relevant.', 'The relative strength varies by setting.']),
  q('zero-a-tool', 'Application', 'What sequence does the speaker recommend?',
    ['Begin with trust-building before naming any constraint', 'Assume value expansion until negotiation completely fails', 'Define the fixed resource, then test other dimensions', 'Divide the visible resource equally before discussing interests'], 2,
    'The sequence protects against both naive optimism and premature rivalry.', 'procedure-reversed',
    ['Trust may help but does not define the structure.', 'Expansion should be tested rather than assumed.', '', 'Equal division can overlook value-creating differences.']),
]

const AUDIO_B_QUESTIONS = [
  q('zero-b-fixed', 'Scenario', 'What part of the studio dispute is genuinely fixed?',
    ['Only one team can use the main studio Tuesday morning', 'One department must lose reputation if the other records first', 'The total production value for the month cannot increase', 'Neither team can change equipment or editing arrangements'], 0,
    'The physical room and time slot cannot be used exclusively by both teams at once.', 'fixed-scope',
    ['', 'Reputation is an interpreted concern, not a fixed payoff.', 'Other arrangements may improve total value.', 'Equipment and editing are later treated as flexible.']),
  q('zero-b-interest', 'Reasoning move', 'What different interests create room for a trade?',
    ['Both teams prefer exactly the same recording conditions', 'Neither team cares when editing support becomes available', 'One needs acoustics while the other needs early editing', 'Both teams require sole access to every studio resource'], 2,
    'The teams value different dimensions, allowing a package beyond splitting the room.', 'interest-missed',
    ['Identical priorities would reduce trading space.', 'Editing timing is central to one team.', '', 'Their needs concern different resources and times.']),
  q('zero-b-package', 'Application', 'What makes the final package potentially positive-sum?',
    ['Each department receives exactly half of Tuesday morning', 'The team leaders avoid discussing status and precedent', 'The main studio is replaced by a larger permanent facility', 'Each side gains its priority through different resources'], 3,
    'The language team gets acoustics later, while marketing gets early recording plus editing support.', 'split-as-expansion',
    ['The fixed slot is not divided equally.', 'Status concerns are explicitly addressed through a rule.', 'No new permanent facility is created.', '']),
  q('zero-b-limit', 'Inference limit', 'What does the agreement not prove?',
    ['The original time-slot conflict contained a fixed element', 'Every departmental conflict can produce additional value', 'Different priorities can open more than one bargaining dimension', 'Transparent future rules can reduce status uncertainty'], 1,
    'One successful package does not establish that all conflicts contain compatible interests or expandable value.', 'single-case-universal',
    ['That fixed element remains acknowledged.', '', 'The dialogue directly demonstrates this possibility.', 'The proposed booking rule addresses future uncertainty.']),
]

export const ZERO_SUM_GUIDED_LESSON: GuidedAdvancedLesson = {
  kind: 'guided-v3', slug: 'pensamiento-suma-cero', sequence: 7,
  breadcrumbTitle: 'Zero-sum thinking', title: 'When every gain looks like somebody else’s loss',
  subtitle: 'A guided seminar on fixed resources, social beliefs and value-creating trades.',
  objective: 'You will distinguish a zero-sum structure from zero-sum belief, identify a genuinely fixed constraint and test whether other dimensions permit cooperation.',
  level: 'B2–C1', evidenceClass: 'contested-social', guidedMinutes: 128, selfStudyMinutes: 76,
  centralQuestion: 'Which part of a conflict is genuinely fixed, and which part becomes fixed only in the story we tell?',
  openingStatements: { title: 'Which statements sound most logical right now?', instruction: 'Select any claims you could defend. The cards are optional and never block the lesson.', statements: [
    { id: 'zero-s1', text: 'If two groups compete for one resource, the whole relationship is zero-sum.' },
    { id: 'zero-s2', text: 'Some gains genuinely require another person to accept a loss.' },
    { id: 'zero-s3', text: 'Cooperation can create value only when scarcity is imaginary.' },
    { id: 'zero-s4', text: 'A fixed time slot can coexist with flexible priorities around it.' },
    { id: 'zero-s5', text: 'Calling a conflict positive-sum can hide real power and distribution.' },
    { id: 'zero-s6', text: 'Before negotiating, define exactly what is fixed and for how long.' },
  ] },
  discussion: { targetMinutes: 20, questions: [
    { id: 'experience', kind: 'experience', prompt: 'When has someone else’s gain felt like a personal loss?', teacherIntent: 'Collect interpretations before deciding whether the structure was fixed.', followUps: ['Which resource seemed limited?', 'Was the comparison social or material?'] },
    { id: 'pattern', kind: 'pattern', prompt: 'Which conflicts are genuinely zero-sum, and which only contain one fixed element?', teacherIntent: 'Separate local rivalry from the total relationship.', followUps: ['What is the time horizon?', 'Could another dimension change?'] },
    { id: 'mechanism', kind: 'mechanism', prompt: 'How can threat make a broad zero-sum story more attractive?', teacherIntent: 'Elicit attention, group position and perceived scarcity without assigning one cause.', followUps: ['What becomes salient?', 'Which alternatives disappear?'] },
    { id: 'exception', kind: 'exception', prompt: 'When is cooperative language naive or even manipulative?', teacherIntent: 'Protect real distribution, power and incompatible interests.', followUps: ['Who bears the cost?', 'Can value grow but remain unfairly divided?'] },
    { id: 'concept', kind: 'concept', prompt: 'What is the difference between a fixed pie and believing life is a fixed pie?', teacherIntent: 'Separate game structure from social worldview.', followUps: ['How would each be measured?', 'Can one influence the other?'] },
    { id: 'evidence', kind: 'evidence', prompt: 'What evidence would show that a negotiation created value?', teacherIntent: 'Move from optimistic language to counterfactual outcomes.', followUps: ['Compared with which alternative?', 'Did both sides improve?'] },
  ] },
  recordings: {
    baseline: { id: 'baseline', label: 'Your explanation before the reading', targetSeconds: '60–90 seconds', prompt: 'Describe one conflict that appears zero-sum. Identify the fixed resource, one possible flexible dimension and one reason cooperation may still fail.', privacyNote: 'The recording stays in this browser tab. It is not uploaded or sent to a teacher.' },
    postReading: { id: 'post-reading', label: 'What did you understand?', targetSeconds: '75–120 seconds', prompt: 'Explain structure versus belief, one research result, one limitation and the negotiation protocol.', privacyNote: 'The recording stays in this browser tab. Refreshing or closing the tab removes it.' },
    final: { id: 'final', label: 'Return to your first explanation', targetSeconds: '90–120 seconds', prompt: 'Reanalyse your conflict using resource, time horizon, interests, distribution and one update condition.', privacyNote: 'This comparison remains on the device. There is no teacher inbox yet.' },
  },
  vocabulary: [
    { category: 'Phrasal verbs', term: 'to carve up', partOfSpeech: 'phrasal verb', meaning: 'To divide a limited resource among parties.', collocation: 'carve up a budget', example: 'The teams began by carving up one fixed time slot.' },
    { category: 'Phrasal verbs', term: 'to crowd out', partOfSpeech: 'phrasal verb', meaning: 'To reduce space or opportunity for something else.', collocation: 'crowd out cooperation', example: 'Status anxiety crowded out discussion of practical interests.' },
    { category: 'Phrasal verbs', term: 'to open up', partOfSpeech: 'phrasal verb', meaning: 'To create or reveal new possibilities.', collocation: 'open up another dimension', example: 'Editing support opened up another bargaining dimension.' },
    { category: 'Phrasal verbs', term: 'to give up', partOfSpeech: 'phrasal verb', meaning: 'To surrender a resource, position or benefit.', collocation: 'give up priority', example: 'Neither side had to give up its most important interest.' },
    { category: 'Phrasal verbs', term: 'to trade off', partOfSpeech: 'phrasal verb', meaning: 'To exchange gains on different dimensions.', collocation: 'trade off timing and access', example: 'They traded off timing against editing access.' },
    { category: 'Useful language', term: 'fixed for whom', partOfSpeech: 'question frame', meaning: 'A prompt that identifies whose options are actually constrained.', collocation: 'ask fixed for whom', example: 'The mediator asked, “Fixed for whom and for how long?”' },
    { category: 'Useful language', term: 'all else being equal', partOfSpeech: 'discourse phrase', meaning: 'Assuming other relevant conditions remain constant.', collocation: 'gain all else being equal', example: 'One side’s gain was a loss only all else being equal.' },
    { category: 'Useful language', term: 'under a fixed constraint', partOfSpeech: 'prepositional phrase', meaning: 'Within a condition that cannot currently expand.', collocation: 'decide under a fixed constraint', example: 'The room allocation remained under a fixed constraint.' },
    { category: 'Useful language', term: 'create additional value', partOfSpeech: 'verb phrase', meaning: 'To improve the total outcome through new arrangements.', collocation: 'create additional value jointly', example: 'Different priorities helped create additional value.' },
    { category: 'Useful language', term: 'distribution still matters', partOfSpeech: 'clause', meaning: 'A reminder that a larger total can remain unfairly shared.', collocation: 'admit distribution still matters', example: 'The proposal created value, but distribution still mattered.' },
    { category: 'Adjectives', term: 'fixed-sum', partOfSpeech: 'adjective', meaning: 'Having a total payoff that cannot change.', collocation: 'fixed-sum allocation', example: 'The single Tuesday slot was a fixed-sum allocation.' },
    { category: 'Adjectives', term: 'positive-sum', partOfSpeech: 'adjective', meaning: 'Allowing the total benefits to increase.', collocation: 'positive-sum exchange', example: 'Different priorities enabled a positive-sum exchange.' },
    { category: 'Adjectives', term: 'rival', partOfSpeech: 'adjective', meaning: 'Unable to be consumed simultaneously by different users.', collocation: 'rival resource', example: 'The studio was a rival resource at that time.' },
    { category: 'Adjectives', term: 'antagonistic', partOfSpeech: 'adjective', meaning: 'Interpreting interests as fundamentally opposed.', collocation: 'antagonistic worldview', example: 'The scale measured an antagonistic worldview.' },
    { category: 'Adjectives', term: 'expandable', partOfSpeech: 'adjective', meaning: 'Capable of increasing through action or redesign.', collocation: 'expandable value', example: 'Total value was expandable even though the room was not.' },
    { category: 'Nouns', term: 'payoff structure', partOfSpeech: 'noun phrase', meaning: 'The pattern linking each choice to gains and losses.', collocation: 'inspect the payoff structure', example: 'They inspected the payoff structure before negotiating.' },
    { category: 'Nouns', term: 'scarcity', partOfSpeech: 'noun', meaning: 'A condition in which a resource is limited relative to demand.', collocation: 'perceived scarcity', example: 'Perceived scarcity made every request feel threatening.' },
    { category: 'Nouns', term: 'trade-off', partOfSpeech: 'noun', meaning: 'An exchange in which gaining one outcome costs another.', collocation: 'explicit trade-off', example: 'The time slot created an explicit trade-off.' },
    { category: 'Nouns', term: 'interest', partOfSpeech: 'noun', meaning: 'An underlying need or priority beneath a stated position.', collocation: 'underlying interest', example: 'Early editing was the underlying interest.' },
    { category: 'Nouns', term: 'counterfactual', partOfSpeech: 'noun', meaning: 'The alternative outcome used for comparison.', collocation: 'compare with the counterfactual', example: 'Value creation depends on the relevant counterfactual.' },
  ],
  reading: {
    title: 'The fixed pie and the story around it',
    dek: 'Some conflicts divide a fixed resource. Zero-sum thinking begins when that local structure becomes a general explanation of social life.',
    blocks: [
      { id: 'structure', role: 'definition', heading: 'A mathematical relationship, not a mood', prediction: 'Is every scarce resource zero-sum?', paragraphs: ['A situation is structurally zero-sum when one participant’s gain exactly equals another’s loss. A single prize, one exclusive time slot or some electoral contests can have this form. Strong feelings do not create the structure, and calm language does not remove it.', 'Scarcity is related but not identical. A limited budget creates trade-offs, yet timing, risk, information or future cooperation may change the total value surrounding the allocation. Define the resource and time horizon before labelling the whole relationship.'], glossaryTerms: ['fixed-sum', 'payoff structure', 'scarcity'] },
      { id: 'belief', role: 'evidence', heading: 'When the model becomes a worldview', paragraphs: ['Researchers have measured belief in a zero-sum game as a general expectation that one person’s success comes at another’s expense. Cross-national studies treat this as an antagonistic social belief rather than proof about the actual structure of each situation.', 'Measurement across cultures requires care. Agreement with survey items can reflect economic experience, perceived threat, language and context. A scale can identify patterns without turning a person into a permanent “zero-sum type.”'], pausePrompt: 'What would a survey measure, and what could it not establish?', glossaryTerms: ['antagonistic', 'social belief', 'measurement invariance'] },
      { id: 'politics', role: 'evidence', heading: 'Threat, group position and political issues', prediction: 'Will one ideology be more zero-sum on every issue?', paragraphs: ['Davidai and Ongis found that zero-sum thinking relates to political ideology in ways that depend on the issue and perceived group position. People may see gains for a disadvantaged group as losses for an advantaged group, or treat redistribution and status as different kinds of competition.', 'The evidence is associational. It does not show that ideology alone causes the belief, nor that one political side owns it. Issue framing, group position and perceived threat can change which outcome appears fixed.'], glossaryTerms: ['group position', 'association', 'perceived threat'] },
      { id: 'real-conflict', role: 'counterargument', heading: 'Cooperation is not a magic enlargement spell', paragraphs: ['“Think positive-sum” can become as misleading as “every gain is our loss.” Some goods remain rival, some interests are incompatible and some negotiations create a larger total that power then distributes unfairly. Value creation does not erase distribution.', 'A responsible analysis preserves the fixed element. If only one team can use a studio Tuesday morning, that slot cannot be duplicated through empathy. The question is whether other resources or priorities—editing time, equipment, future access—allow a package that improves the counterfactual for both sides.'], pausePrompt: 'Which constraint remains fixed even after a good agreement?', glossaryTerms: ['rival', 'counterfactual', 'distribution'] },
      { id: 'interests', role: 'application', heading: 'Move from positions to interests', prediction: 'What might “I need Tuesday morning” conceal?', paragraphs: ['Positions state a demanded outcome. Interests explain why it matters. One team may need acoustics; another may need an early recording to begin editing. If priorities differ, the parties can trade across dimensions rather than divide one visible item mechanically.', 'This process does not guarantee agreement. Information can be private, trust can be low and a powerful party may prefer extraction over joint value. The test is empirical: compare the package with credible alternatives for each side, then inspect how the gains are distributed.'], glossaryTerms: ['position', 'interest', 'trade off'] },
      { id: 'protocol', role: 'scope-limit', heading: 'Test the pie before naming it', paragraphs: ['Begin with five questions. What exactly is fixed? For whom? For how long? Which outcomes remain flexible? What counterfactual will define improvement? This protects against treating optimistic language as evidence.', 'The calibrated conclusion is conditional. Some situations are zero-sum on a defined dimension. People can also generalise that structure beyond the evidence. Good analysis neither denies conflict nor assumes it everywhere; it locates the constraint and then tests whether value can expand around it.'], pausePrompt: 'Which question would change your opening example most?', glossaryTerms: ['time horizon', 'expandable', 'scope limit'] },
    ],
    argumentMap: [
      { label: 'Define', text: 'Zero-sum structure means gains and losses balance exactly.' },
      { label: 'Separate', text: 'A general antagonistic belief is not the structure itself.' },
      { label: 'Observe', text: 'Issue, threat and group position relate to zero-sum interpretation.' },
      { label: 'Counter', text: 'Real rivalry and unequal distribution cannot be wished away.' },
      { label: 'Expand', text: 'Different interests may create trades across other dimensions.' },
      { label: 'Limit', text: 'Define the resource, time horizon and counterfactual before concluding.' },
    ],
    sources: [
      { label: 'Różycka-Tran, Boski & Wojciszke (2015), JCCP', href: 'https://doi.org/10.1177/0022022115572226' },
      { label: 'Davidai & Ongis (2019), Science Advances', href: 'https://doi.org/10.1126/sciadv.aay3761' },
      { label: 'Różycka-Tran et al. (2018), PLOS ONE', href: 'https://doi.org/10.1371/journal.pone.0203196' },
    ],
  },
  ieltsPractice: { title: 'Locate the fixed constraint before judging the conflict', instruction: 'Answer all twelve questions before opening feedback. The set tests structure, belief, evidence, application and limits; it is not an IELTS band estimate.', questions: EVIDENCE_QUESTIONS },
  listeningLab: {
    status: 'not-produced', relationship: 'complement + scenario',
    plannedTracks: [
      { id: 'audio-a', eyebrow: 'Audio A · research explanation', title: 'A fixed payoff is not a personality', speaker: 'Dr Evelyn Chen · social psychologist', function: 'Separates objective structure from measured belief and explains what correlational evidence cannot establish.', estimatedDuration: '3:20–3:45', questions: AUDIO_A_QUESTIONS,
        transcript: `Zero-sum has a precise meaning before it becomes a social label. In a zero-sum interaction, one participant’s gain exactly equals another participant’s loss. If there is one prize and only one winner, the allocation is zero-sum on that dimension. The strength of anyone’s feelings does not change the payoff structure.

Psychologists also study belief in a zero-sum game: a broader expectation that gains in social life generally come at other people’s expense. Researchers measure agreement with antagonistic statements across relationships, groups and societies. That measure is not a test of arithmetic and it does not prove that every situation respondents face is expandable. It captures a worldview about how social exchange tends to work.

Cross-national studies find meaningful patterns, and political research suggests that zero-sum interpretation relates to ideology differently across issues and group positions. Yet these findings are associations. They do not establish one simple cause, identify one political side as permanently zero-sum or diagnose an individual from a single opinion. Economic insecurity, historical experience, perceived threat and actual distributive conflict may all contribute.

We should also resist naive optimism. Some resources are rival. An election has a winner, a particular room cannot host two exclusive events at once and a budget decision can impose real opportunity costs. Saying “let us create value” does not remove those constraints. Nor does a larger total guarantee fair distribution.

My practical sequence begins with structure. Define what is fixed, for whom and over what time horizon. Then ask whether other dimensions remain flexible: timing, risk, information, future access or priorities. Finally, compare any proposed package with a credible counterfactual for each side. If both improve, additional value may have been created around the fixed element. If one side merely renames its loss as cooperation, it has not. This sequence avoids both errors: treating every conflict as a fixed pie and treating every fixed pie as a failure of imagination.`,
      },
      { id: 'audio-b', eyebrow: 'Audio B · represented negotiation', title: 'One studio, more than one interest', speaker: 'Rina and Cole · department coordinators', function: 'Shows a genuinely rival time slot becoming one element in a larger package without denying status or distribution.', estimatedDuration: '3:15–3:40', questions: AUDIO_B_QUESTIONS,
        transcript: `Rina: The language team booked the main studio for Tuesday morning. We need its acoustics for the pronunciation series.

Cole: Marketing needs the same slot. The campaign launches Friday, and if we do not record Tuesday, editing cannot finish.

Rina: So one of us loses the room. That part is genuinely fixed.

Cole: The room is fixed, but perhaps our reasons are not identical. You need the acoustics. I need an early recording and immediate editing support. Could marketing use the smaller booth Tuesday if your editor helps us that afternoon?

Rina: Possibly. We could move our recording to Wednesday if we receive the main studio then and if your team lends us the second microphone. But I am worried this creates a precedent that marketing always displaces teaching content.

Cole: That is a status and future-access concern, not only a room concern. Let us write a booking rule: launch deadlines can trigger one exchange, but the displaced team receives priority on the next comparable slot. The rule applies in both directions.

Rina: Then the package would be marketing in the small booth Tuesday, our editor supporting your early cut, language in the main studio Wednesday with the extra microphone, and a transparent priority credit.

Cole: Exactly. Neither of us receives the original position. But you receive the acoustics and equipment that matter most, and we receive the early material and editing speed that matter most.

Rina: We should be honest about the limit. If both teams had required the main studio Tuesday for live transmission, no package would create a second room. Different interests opened space here; goodwill alone did not.

Cole: Agreed. And the distribution still matters. If your editor’s time is more valuable than the equipment loan, we should compensate the difference from our production budget.

Rina: Good. We found value around one fixed slot, then checked whether the value was shared rather than simply declared.`,
      },
    ],
    integrationPrompt: 'Use the research distinctions to analyse the studio agreement. Name the fixed element, flexible interests, counterfactual, distribution question and condition under which no positive-sum package would exist.',
  },
  synthesis: { prompt: 'Two groups claim that the other group’s success necessarily reduces their own opportunities. Write 180–230 words that define the resource and time horizon, distinguish structure from belief, test one expandable dimension and preserve a real distribution or power concern.', checklist: ['I identified a specific fixed resource.', 'I separated payoff structure from zero-sum belief.', 'I tested interests and a credible counterfactual.', 'I preserved a limit involving rivalry, power or distribution.'] },
}
