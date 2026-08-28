import type { GuidedAdvancedLesson } from './advanced-guided-topics.ts'
import { guidedQuestion as q } from './advanced-guided-helpers.ts'

const EVIDENCE_QUESTIONS = [
  q('frame-purpose', 'Main purpose', 'What is the reading mainly designed to show?',
    ['All persuasive wording should be removed from public communication', 'Equivalent facts can guide attention toward different evaluations', 'Positive descriptions normally produce more accurate public decisions', 'Risk preferences remain stable when numerical outcomes stay equal'], 1,
    'The text treats framing as selective emphasis that can change evaluation without changing the underlying quantity.', 'purpose-overstatement',
    ['The reading argues that selection is unavoidable, not removable.', '', 'Positive wording is not presented as inherently accurate.', 'The classic reversal shows that preferences can move.']),
  q('frame-classic', 'Factual detail', 'What changed between the two versions of the classic disease problem?',
    ['The number of people expected to face the disease', 'The probability assigned to each available programme', 'The medical evidence supporting the uncertain programme', 'The outcome description used to present equal choices'], 3,
    'The lives-saved and lives-lost versions described mathematically equivalent outcomes.', 'design-substitution',
    ['The expected population remained six hundred people.', 'The probabilities were held constant across versions.', 'No new clinical evidence was introduced.', '']),
  q('frame-reference', 'Concept distinction', 'What is a reference point in this reading?',
    ['A baseline against which gains and losses are evaluated', 'A source that confirms the speaker has quoted correctly', 'A neutral sentence that contains no emotional emphasis', 'A numerical average calculated after the decision is made'], 0,
    'Prospect theory evaluates outcomes as gains or losses relative to a reference point.', 'construct-confusion',
    ['', 'Citation accuracy is a different use of reference.', 'No sentence is guaranteed to remove all emphasis.', 'The baseline is not defined as a later average.']),
  q('frame-denominator', 'Numerical reasoning', 'Why does the reading recommend checking the denominator?',
    ['It reveals whether every percentage was calculated by experts', 'It converts uncertain evidence into a guaranteed final outcome', 'It shows the population over which a proportion was calculated', 'It prevents relative changes from appearing in any explanation'], 2,
    'A rate becomes interpretable only when the reader can identify the population or base over which it was calculated.', 'denominator-neglect',
    ['Expert authorship does not resolve the size of the base.', 'A denominator does not remove uncertainty.', '', 'Relative change can remain useful when the base is visible.']),
  q('frame-language', 'Language analysis', 'What can passive voice do in a framed account?',
    ['Make every disputed action sound intentionally deceptive', 'Move the responsible agent into the background', 'Prove that the outcome occurred without human agency', 'Replace a relative percentage with an absolute frequency'], 1,
    'Passive voice can background an agent, although it is not automatically dishonest.', 'grammar-as-proof',
    ['A grammatical choice does not prove deceptive intent.', '', 'Backgrounding an agent does not eliminate agency.', 'Voice and numerical format are separate choices.']),
  q('frame-ethical', 'Writer view', 'Which practice best matches the reading’s ethical standard?',
    ['Choose whichever frame produces the most desirable behaviour', 'Avoid emotion whenever a decision affects other people', 'Use technical language so the audience cannot misread uncertainty', 'Preserve access to quantities, alternatives and relevant consequences'], 3,
    'Ethical framing preserves the audience’s ability to reconstruct the choice and inspect meaningful alternatives.', 'persuasion-as-ethics',
    ['Desired behaviour alone does not protect agency.', 'Emotion can convey relevant consequences.', 'Technical opacity can reduce rather than improve agency.', '']),
  q('frame-limit', 'Scope', 'Which conclusion respects the limits described in the reading?',
    ['Framing can influence choice without controlling every decision', 'Framing effects demonstrate that numerical information is useless', 'People always prefer certainty when outcomes involve human lives', 'Any emotional difference between messages proves manipulation occurred'], 0,
    'The evidence supports a conditional influence on preference, not universal control or automatic manipulation.', 'scope-inflation',
    ['', 'The lesson recommends clearer numerical representation.', 'The loss frame can shift preference toward risk.', 'Emotional difference alone does not establish intent.']),
  q('frame-defense', 'Application', 'What is the strongest first response to “ninety per cent survive”?',
    ['Reject the claim because survival language is always misleading', 'Ask whether the treatment was selected through random assignment', 'Restate both survival and mortality using the same denominator', 'Replace the percentage with a personal story about one patient'], 2,
    'Stating ninety survive and ten do not preserves the quantity while exposing complementary frames.', 'counterframe-missed',
    ['Survival language can communicate a genuine outcome.', 'Study design matters, but the immediate frame can be inspected first.', '', 'A story may add vividness without clarifying the quantity.']),
  q('frame-relative', 'Inference', 'A risk doubles from one in ten thousand to two. What should a careful reader infer?',
    ['The intervention has created a common and severe danger', 'The relative increase is large while the absolute increase is small', 'The two descriptions refer to different underlying populations', 'The absolute figure makes the relative comparison mathematically false'], 1,
    'The change is a one-hundred-per-cent relative increase and one additional case per ten thousand.', 'relative-absolute-confusion',
    ['The base rate remains very low.', '', 'Both figures can describe the same population.', 'Relative and absolute descriptions can both be true.']),
  q('frame-objection', 'Counterargument', 'Why does the writer reject the goal of eliminating every frame?',
    ['Because audiences cannot understand any unframed numerical statement', 'Because persuasive goals are more important than informational accuracy', 'Because only researchers are qualified to compare alternative descriptions', 'Because communication necessarily selects a perspective and emphasis'], 3,
    'Choosing subjects, comparisons, time horizons and denominators already gives information a point of view.', 'view-from-nowhere',
    ['People can understand numbers without a perfectly neutral form.', 'The text prioritises recoverable information over persuasion.', 'Ordinary readers can compare frames with adequate information.', '']),
  q('frame-transfer', 'Transfer', 'A company calls layoffs “workforce optimisation.” What should be checked first?',
    ['Which concrete actions and affected agents the phrase compresses', 'Whether the phrase appears in a grammatically complete sentence', 'Whether employees prefer positive language during uncertain periods', 'Which competitor has used the same phrase most frequently'], 0,
    'Nominalisation can compress an action, its agent and its consequences into an abstract label.', 'label-as-explanation',
    ['', 'Grammatical completeness does not restore missing agency.', 'Preference for tone does not reveal the underlying action.', 'Competitor usage does not clarify this event.']),
  q('frame-best', 'Best conclusion', 'Which final claim is best supported by the lesson?',
    ['A balanced message must give every possible interpretation equal space', 'A negative frame is justified whenever risk deserves public attention', 'Good framing makes its emphasis inspectable and quantities recoverable', 'Neutral wording guarantees that different audiences reach identical decisions'], 2,
    'Responsible communication allows the audience to recover quantities and compare consequential perspectives.', 'neutrality-guarantee',
    ['No message can include every possible interpretation.', 'Attention to risk does not justify hiding complementary outcomes.', '', 'Audience differences remain even with careful wording.']),
]

const AUDIO_A_QUESTIONS = [
  q('frame-a-claim', 'Main claim', 'What is Dr Shah’s central claim about framing?',
    ['Frames replace the numerical content of every difficult decision', 'Frames organise attention before people evaluate equal outcomes', 'Frames matter only when audiences misunderstand basic percentages', 'Frames disappear when communicators report absolute frequencies'], 1,
    'A frame changes which aspect becomes psychologically foregrounded before evaluation.', 'main-claim',
    ['The numerical content can remain unchanged.', '', 'The effect is not limited to misunderstanding.', 'Frequencies help inspection but do not remove emphasis.']),
  q('frame-a-method', 'Method', 'Why does the speaker present both disease versions?',
    ['To compare two diseases with different expected death rates', 'To show that medical experts prefer uncertain treatment plans', 'To calculate whether six hundred participants form enough evidence', 'To isolate descriptive wording while holding the outcomes constant'], 3,
    'The comparison changes the descriptive frame while preserving mathematical equivalence.', 'method-confusion',
    ['The disease and expected total remain the same.', 'Expert preferences are not the measured contrast.', 'Six hundred is the hypothetical affected population.', '']),
  q('frame-a-limit', 'Limitation', 'Which limitation does Dr Shah explicitly preserve?',
    ['A framing effect does not prove deliberate manipulation', 'A numerical equivalence cannot produce emotional differences', 'A positive frame always improves decision quality', 'A single experiment establishes every real-world mechanism'], 0,
    'Influence from wording does not by itself establish a communicator’s intention to manipulate.', 'intent-inference',
    ['', 'The example demonstrates different emotional evaluations.', 'Decision quality is not guaranteed by positive wording.', 'The speaker warns against universal extrapolation.']),
  q('frame-a-tool', 'Practical tool', 'What practical method does the speaker recommend?',
    ['Remove every adjective before making the final choice', 'Prefer the frame that produces the calmer reaction', 'Translate the message into directly matched complementary outcomes', 'Ask the communicator to provide only relative changes'], 2,
    'Matched complements such as survive and do not survive reveal equivalence and emphasis together.', 'tool-substitution',
    ['Adjectives are not the only source of framing.', 'Calmness does not establish accuracy.', '', 'Relative changes alone can hide the base rate.']),
]

const AUDIO_B_QUESTIONS = [
  q('frame-b-problem', 'Scenario', 'What is the first problem Elena identifies?',
    ['The campaign hides its baseline for the reduction claim', 'The campaign includes too many negative emotional details', 'The audience already knows the exact annual pollution level', 'The council refuses to publish any numerical information'], 0,
    'A percentage reduction lacks scale until the audience can recover its baseline.', 'missing-baseline',
    ['', 'The concern is missing scale, not excess negativity.', 'The dialogue says the baseline is unavailable.', 'A percentage is published, but it is incomplete.']),
  q('frame-b-disagreement', 'Speaker relationship', 'Where do Elena and Marcus disagree most precisely?',
    ['Whether pollution creates any measurable public cost', 'Whether the campaign should contain numerical evidence', 'Whether concise framing can still preserve audience agency', 'Whether citizens are capable of comparing two descriptions'], 2,
    'Marcus defends concise messaging; Elena insists that concision still expose the baseline and complement.', 'disagreement-location',
    ['Both treat pollution as consequential.', 'Both support including meaningful quantities.', '', 'Neither claims citizens lack the capacity to compare.']),
  q('frame-b-revision', 'Application', 'Which revision do both speakers finally accept?',
    ['Replace the percentage with a photograph of visible pollution', 'State the reduction and remaining amount against one baseline', 'Remove the campaign claim until every uncertainty disappears', 'Present only the cost because losses motivate faster action'], 1,
    'The accepted version reports what falls, what remains and the common comparison point.', 'revision-choice',
    ['A photograph does not restore the missing denominator.', '', 'Responsible uncertainty does not require total silence.', 'A single loss frame preserves the original problem.']),
  q('frame-b-limit', 'Inference limit', 'What cannot be concluded from the accepted revision alone?',
    ['The message now makes its numerical comparison more transparent', 'Readers can reconstruct both sides of the reported change', 'The baseline remains visible beside the percentage reduction', 'The policy will certainly produce the promised environmental outcome'], 3,
    'Transparent framing improves inspectability but does not guarantee implementation or impact.', 'communication-as-outcome',
    ['That is a direct feature of the revision.', 'The complement is now available.', 'The shared baseline is explicitly included.', '']),
]

export const FRAMING_GUIDED_LESSON: GuidedAdvancedLesson = {
  kind: 'guided-v3',
  slug: 'efecto-encuadre',
  sequence: 1,
  breadcrumbTitle: 'The framing effect',
  title: 'Equivalent facts, different choices',
  subtitle: 'A guided seminar on reference points, denominators and ethical emphasis.',
  objective: 'You will identify consequential frames, reconstruct the underlying quantities and design a message that preserves attention without hiding alternatives.',
  level: 'B2–C1',
  evidenceClass: 'empirical',
  guidedMinutes: 124,
  selfStudyMinutes: 72,
  centralQuestion: 'When does emphasis help an audience understand, and when does it quietly narrow the choice?',
  openingStatements: {
    title: 'Which statements sound most logical right now?',
    instruction: 'Select any claims you could defend. The cards are optional and never block the lesson.',
    statements: [
      { id: 'frame-s1', text: 'If two statements contain the same numbers, they should produce the same decision.' },
      { id: 'frame-s2', text: 'Every message frames reality because every message must select details.' },
      { id: 'frame-s3', text: 'Positive wording is more ethical because it reduces unnecessary fear.' },
      { id: 'frame-s4', text: 'A frame becomes suspect when the audience cannot reconstruct what it leaves out.' },
      { id: 'frame-s5', text: 'Emotional language can clarify a real consequence without distorting the evidence.' },
      { id: 'frame-s6', text: 'Showing both complementary outcomes is usually a useful first defence.' },
    ],
  },
  discussion: {
    targetMinutes: 20,
    questions: [
      { id: 'experience', kind: 'experience', prompt: 'When have two accurate descriptions led you toward different reactions?', teacherIntent: 'Collect ordinary examples before naming a cognitive mechanism.', followUps: ['Which words changed the focus?', 'Did the underlying facts change?'] },
      { id: 'pattern', kind: 'pattern', prompt: 'Which choices are especially sensitive to gains, losses or percentages?', teacherIntent: 'Elicit domains and candidate boundary conditions.', followUps: ['Does urgency strengthen the effect?', 'Would expertise change it?'] },
      { id: 'mechanism', kind: 'mechanism', prompt: 'How can a reference point make one outcome feel like a gain and another like a loss?', teacherIntent: 'Build a causal explanation rather than a vocabulary definition.', followUps: ['Who chooses the baseline?', 'Can the baseline be contested?'] },
      { id: 'exception', kind: 'exception', prompt: 'When might a strong frame improve rather than weaken understanding?', teacherIntent: 'Prevent the claim that all emphasis is manipulation.', followUps: ['What was previously invisible?', 'Could the audience still inspect alternatives?'] },
      { id: 'concept', kind: 'concept', prompt: 'What is the difference between framing a fact and changing a fact?', teacherIntent: 'Separate representation from fabrication.', followUps: ['Can omission cross that boundary?', 'What must remain recoverable?'] },
      { id: 'evidence', kind: 'evidence', prompt: 'How would you test whether wording rather than quantity moved a choice?', teacherIntent: 'Elicit controlled comparison and measurable outcomes.', followUps: ['What would stay constant?', 'What result would weaken the claim?'] },
    ],
  },
  recordings: {
    baseline: { id: 'baseline', label: 'Your explanation before the reading', targetSeconds: '60–90 seconds', prompt: 'Describe one decision that could change under a gain or loss frame. Explain the mechanism, one exception and your confidence.', privacyNote: 'The recording stays in this browser tab. It is not uploaded or sent to a teacher.' },
    postReading: { id: 'post-reading', label: 'What did you understand?', targetSeconds: '75–120 seconds', prompt: 'Explain the main claim, the classic evidence, one ethical limit and one question that remains.', privacyNote: 'The recording stays in this browser tab. Refreshing or closing the tab removes it.' },
    final: { id: 'final', label: 'Return to your first explanation', targetSeconds: '90–120 seconds', prompt: 'Compare your first view with your current view. Use reference point, denominator and one limit accurately.', privacyNote: 'This comparison remains on the device. There is no teacher inbox yet.' },
  },
  vocabulary: [
    { category: 'Phrasal verbs', term: 'to leave out', partOfSpeech: 'phrasal verb', meaning: 'To omit a relevant element.', collocation: 'leave out the baseline', example: 'The headline left out the baseline used for comparison.' },
    { category: 'Phrasal verbs', term: 'to play down', partOfSpeech: 'phrasal verb', meaning: 'To make something seem less important.', collocation: 'play down a loss', example: 'The passive sentence played down who made the decision.' },
    { category: 'Phrasal verbs', term: 'to bring out', partOfSpeech: 'phrasal verb', meaning: 'To make a feature easier to notice.', collocation: 'bring out the contrast', example: 'Absolute frequencies brought out the scale of the change.' },
    { category: 'Phrasal verbs', term: 'to add up', partOfSpeech: 'phrasal verb', meaning: 'To form a coherent numerical total.', collocation: 'figures add up', example: 'The two percentages did not add up to the stated total.' },
    { category: 'Phrasal verbs', term: 'to zero in on', partOfSpeech: 'phrasal verb', meaning: 'To focus closely on one feature.', collocation: 'zero in on losses', example: 'The message zeroed in on losses and backgrounded survival.' },
    { category: 'Useful language', term: 'all else being equal', partOfSpeech: 'discourse phrase', meaning: 'Assuming other relevant conditions stay constant.', collocation: 'compare all else being equal', example: 'All else being equal, only the description changed.' },
    { category: 'Useful language', term: 'in absolute terms', partOfSpeech: 'prepositional phrase', meaning: 'Expressed as a count or difference rather than a ratio.', collocation: 'small in absolute terms', example: 'The increase was large relatively but small in absolute terms.' },
    { category: 'Useful language', term: 'relative to', partOfSpeech: 'prepositional phrase', meaning: 'Compared with a particular baseline.', collocation: 'gain relative to baseline', example: 'The outcome felt positive relative to the earlier estimate.' },
    { category: 'Useful language', term: 'the missing denominator', partOfSpeech: 'noun phrase', meaning: 'The unstated population behind a rate.', collocation: 'recover the missing denominator', example: 'The reader could not recover the missing denominator.' },
    { category: 'Useful language', term: 'state both sides', partOfSpeech: 'verb phrase', meaning: 'To express complementary outcomes together.', collocation: 'state both sides explicitly', example: 'A careful explanation states both sides of the percentage.' },
    { category: 'Adjectives', term: 'equivalent', partOfSpeech: 'adjective', meaning: 'Equal in value despite a different form.', collocation: 'mathematically equivalent', example: 'The programmes were mathematically equivalent.' },
    { category: 'Adjectives', term: 'salient', partOfSpeech: 'adjective', meaning: 'Especially noticeable or prominent.', collocation: 'make losses salient', example: 'The mortality frame made deaths more salient.' },
    { category: 'Adjectives', term: 'complementary', partOfSpeech: 'adjective', meaning: 'Completing another part of the same whole.', collocation: 'complementary outcomes', example: 'Survival and mortality are complementary outcomes.' },
    { category: 'Adjectives', term: 'inspectable', partOfSpeech: 'adjective', meaning: 'Open enough to be examined and reconstructed.', collocation: 'inspectable claim', example: 'The revised claim made its baseline inspectable.' },
    { category: 'Adjectives', term: 'loss-framed', partOfSpeech: 'adjective', meaning: 'Presented mainly through what may be lost.', collocation: 'loss-framed option', example: 'The loss-framed option made risk more attractive.' },
    { category: 'Nouns', term: 'reference point', partOfSpeech: 'noun', meaning: 'A baseline against which outcomes are evaluated.', collocation: 'shift the reference point', example: 'A new reference point changed which outcome felt like a loss.' },
    { category: 'Nouns', term: 'denominator', partOfSpeech: 'noun', meaning: 'The population or base used in a proportion.', collocation: 'shared denominator', example: 'Both claims need the same denominator.' },
    { category: 'Nouns', term: 'nominalisation', partOfSpeech: 'noun', meaning: 'A noun form that can compress an action and its agent.', collocation: 'strategic nominalisation', example: '“Restructuring” is a nominalisation that can hide agency.' },
    { category: 'Nouns', term: 'preference reversal', partOfSpeech: 'noun phrase', meaning: 'A change in choice after an equivalent reformulation.', collocation: 'observe a preference reversal', example: 'The experiment produced a preference reversal across frames.' },
    { category: 'Nouns', term: 'base rate', partOfSpeech: 'noun', meaning: 'The underlying frequency before new evidence is considered.', collocation: 'low base rate', example: 'A doubled risk may still begin from a very low base rate.' },
  ],
  reading: {
    title: 'When the facts stay still but the choice moves',
    dek: 'Framing is a property of communication. The responsibility is to make consequential emphasis visible enough to inspect.',
    blocks: [
      { id: 'point-of-view', role: 'definition', heading: 'A choice has a point of view', prediction: 'Can a factual sentence avoid selecting any perspective?', paragraphs: ['Information does not arrive as a neutral package. A speaker chooses a subject, comparison, time horizon and denominator. “Employment reached 94%” and “unemployment remained at 6%” can describe one labour market while directing attention toward different consequences. A frame is this organisation of attention.', 'Selection is not automatically deception. A frame can reveal a neglected cost or make an abstract benefit concrete. The analytical question is whether listeners can recover the underlying quantities and see the alternatives that matter to the decision.'], glossaryTerms: ['frame', 'salient', 'reference point'] },
      { id: 'classic-reversal', role: 'evidence', heading: 'The classic preference reversal', prediction: 'Will people choose the same programme under lives-saved and lives-lost wording?', paragraphs: ['Tversky and Kahneman asked participants to imagine a disease expected to affect six hundred people. In a gain frame, one programme would save two hundred people while another offered a one-third chance of saving everyone. Most preferred certainty. In the loss frame, one programme meant four hundred deaths while the alternative offered a one-third chance that nobody would die. The outcomes were equivalent, yet preference shifted toward risk.', 'The result linked framing to prospect theory: outcomes are evaluated relative to a reference point, and losses do not feel like mirror images of gains. The study demonstrates a systematic reversal under particular conditions; it does not prove that wording controls every person or every real decision.'], pausePrompt: 'What changed, what stayed constant, and what was measured?', glossaryTerms: ['preference reversal', 'gain-framed', 'loss-framed'] },
      { id: 'grammar', role: 'example', heading: 'The grammar of emphasis', paragraphs: ['Active voice can make an agent visible: “The company removed 120 positions.” Passive voice can background that agent: “One hundred and twenty positions were eliminated.” Nominalisation compresses the action further: “the restructuring.” These forms are not inherently dishonest, but each changes what the audience notices first.', 'The same applies to time horizons and comparisons. A quarterly increase may coexist with a yearly decline. A programme can outperform last year while missing its own target. The frame becomes misleading when one true comparison is used to prevent access to another comparison required for judgment.'], pausePrompt: 'Rewrite one sentence so the agent and consequence are both visible.', glossaryTerms: ['nominalisation', 'to play down', 'inspectable'] },
      { id: 'numbers', role: 'application', heading: 'Relative risk needs an absolute home', prediction: 'Does “risk doubled” tell you whether the event is common?', paragraphs: ['A treatment that doubles a risk sounds dramatic. If the change is from one case in ten thousand to two, the relative increase is one hundred per cent and the absolute increase is one case per ten thousand. Both statements are correct; neither answers every practical question alone.', 'A useful defence is to translate percentages into frequencies, identify the denominator and state complementary outcomes. “Ninety survive and ten do not” does not remove emotion. It makes the relation between emotion and quantity easier to examine.'], glossaryTerms: ['base rate', 'denominator', 'in absolute terms'] },
      { id: 'not-trap', role: 'counterargument', heading: 'Not every frame is a trap', paragraphs: ['There is no view from nowhere. A teacher frames a historical event by choosing where the explanation begins. A doctor may use a survival frame to support action without changing the evidence. A loss frame may make a neglected danger vivid. The aim cannot be to ban emphasis.', 'A stronger ethical test asks whether the frame preserves agency. Can people reconstruct the quantity, recognise uncertainty, compare meaningful alternatives and identify who benefits from the selected description? A concise message can pass this test; a technically accurate message can fail it through strategic omission.'], pausePrompt: 'What relevant consequence could a neutral-sounding sentence hide?', glossaryTerms: ['strategic omission', 'preserve agency', 'consequential'] },
      { id: 'responsible', role: 'scope-limit', heading: 'From detection to responsible design', paragraphs: ['Detecting a frame does not reveal the communicator’s intention. Nor does emotional difference prove a decision is irrational. Values legitimately affect which consequences matter. A responsible critique therefore names the hidden comparison or missing quantity instead of merely announcing “bias.”', 'The practical sequence is simple: identify the foregrounded outcome, recover the complement, check the denominator, test another reference point and then decide whether the original emphasis still deserves priority. Good framing does not pretend to be frameless. It makes its point of view inspectable.'], pausePrompt: 'Which step would most improve a public-health headline?', glossaryTerms: ['scope limit', 'complementary', 'recoverable'] },
    ],
    argumentMap: [
      { label: 'Define', text: 'A frame organises attention through language, comparison and reference points.' },
      { label: 'Demonstrate', text: 'Equivalent disease outcomes produced a systematic preference reversal.' },
      { label: 'Inspect', text: 'Grammar, denominators and time horizons reveal what is foregrounded.' },
      { label: 'Counter', text: 'Emphasis can clarify real consequences and cannot be eliminated entirely.' },
      { label: 'Limit', text: 'Influence does not prove irrationality, manipulation or universal control.' },
      { label: 'Apply', text: 'Recover quantities and compare complementary frames before deciding.' },
    ],
    sources: [
      { label: 'Tversky & Kahneman (1981), Science', href: 'https://doi.org/10.1126/science.7455683' },
      { label: 'Kahneman & Tversky (1984), American Psychologist', href: 'https://doi.org/10.1037/0003-066X.39.4.341' },
      { label: 'Levin, Schneider & Gaeth (1998), OBHDP', href: 'https://doi.org/10.1006/obhd.1998.2804' },
    ],
  },
  ieltsPractice: { title: 'Recover the quantity behind the frame', instruction: 'Answer all twelve questions before opening feedback. The set tests definition, evidence, language and transfer; it is not an IELTS band estimate.', questions: EVIDENCE_QUESTIONS },
  listeningLab: {
    status: 'not-produced',
    relationship: 'contrast + application',
    plannedTracks: [
      {
        id: 'audio-a', eyebrow: 'Audio A · research explanation', title: 'What the frame changes', speaker: 'Dr Amira Shah · behavioural scientist', function: 'Explains the classic design, the attention mechanism and the boundary between influence and manipulation.', estimatedDuration: '3:10–3:35', questions: AUDIO_A_QUESTIONS,
        transcript: `A frame is not a decorative layer placed on top of a decision. It helps define what the decision looks like before evaluation begins. That does not mean a frame changes the underlying quantity. It means the same quantity can enter attention through different psychological reference points.

Consider the well-known disease problem. Six hundred people are expected to be affected. In one version, a certain programme saves two hundred people, while an uncertain programme offers a one-third chance that all six hundred will be saved. In a second version, the certain programme means four hundred people will die, while the uncertain programme offers a one-third chance that nobody will die. If you calculate the outcomes, the programmes are equivalent across versions. Yet the gain frame tends to make certainty attractive, while the loss frame makes risk more acceptable.

The useful finding is not that human beings cannot understand arithmetic. The participants were evaluating outcomes relative to a foregrounded reference point. Saving people feels like securing a gain; losing people makes the certain outcome feel like accepting a loss. The emotional and attentional organisation changes before the final choice is made.

Two cautions matter. First, observing a framing effect does not prove deliberate manipulation. Every explanation selects a subject, comparison and time horizon. Second, an average shift does not tell us that every individual reversed a preference. Expertise, stakes, prior beliefs and opportunities to deliberate can all change the size of the effect.

For practical decisions, I recommend a matched-description test. State the outcome and its complement with the same denominator: ninety survive; ten do not. Translate relative change into absolute frequency. Then ask which description reveals a consequence that the other one backgrounds. This does not eliminate perspective. It makes perspective available for inspection. A responsible communicator can still emphasise a genuine risk or benefit, but the audience should be able to reconstruct the numerical structure and understand what the emphasis leaves outside the foreground.`,
      },
      {
        id: 'audio-b', eyebrow: 'Audio B · applied disagreement', title: 'The percentage on the poster', speaker: 'Elena and Marcus · campaign review meeting', function: 'Stages a disagreement about whether concise persuasion can preserve numerical agency.', estimatedDuration: '3:05–3:30', questions: AUDIO_B_QUESTIONS,
        transcript: `Elena: The poster says the new policy will cut roadside pollution by forty per cent. Forty per cent of what? Last year’s peak reading, the annual average, or the level expected without the policy?

Marcus: It is the projected reduction from the current annual average. The technical report explains that. A poster cannot reproduce eighteen pages of modelling.

Elena: I am not asking for eighteen pages. I am asking for the baseline. Without it, forty per cent creates the feeling of a dramatic transformation while concealing what remains.

Marcus: But communication requires emphasis. If we lead with three concentrations, two confidence intervals and a warning about model uncertainty, most people will not understand the policy at all. Concision is not deception.

Elena: Agreed. The problem is not concision; it is whether the concise claim preserves agency. Suppose the current average is fifty units and the projection is thirty. Say that. The reduction is still forty per cent, but now a reader can see both the change and the remaining amount.

Marcus: That may work, although “thirty units” means little without a health standard.

Elena: Then add the standard in the linked explanation. The poster can say: from fifty to thirty units, against a recommended limit of twenty-five. We have one frame, but the decisive comparisons are recoverable.

Marcus: I still want the headline to foreground the improvement. People have heard years of bad news and need to know that action can work.

Elena: Foreground it. Just do not let improvement imply completion. “Forty per cent lower, with further reductions needed to reach the recommended limit.” That is persuasive because progress is real, not because the unfinished part disappears.

Marcus: I can accept that. It gives us a clear achievement, a common baseline and an honest remainder. We should also label the figure as a projection rather than an observed result.

Elena: Exactly. Better framing does not require a lifeless sentence. It requires visible quantities, an accurate time status and enough context to challenge the emphasis if the audience thinks another consequence matters more.`,
      },
    ],
    integrationPrompt: 'Compare the research explanation with the campaign dispute. Identify the mechanism, the exact ethical disagreement, the accepted revision and one outcome the revised frame still cannot guarantee.',
  },
  synthesis: {
    prompt: 'A public campaign reports that a treatment is “twice as effective” without giving baseline outcomes. Write 180–230 words that preserve the useful emphasis, recover the missing quantities, offer a complementary frame and explain what evidence could change your recommendation.',
    checklist: ['I identified the reference point and denominator.', 'I used both relative and absolute language accurately.', 'I distinguished framing influence from deliberate manipulation.', 'I preserved one useful role for emphasis and one limit.'],
  },
}
