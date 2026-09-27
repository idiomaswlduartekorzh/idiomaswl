import type { DiagnosticBankRecord } from '../types.ts';

export const ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATE_VERSION = 'en-reading-advanced-original-draft-1';
const ENGLISH_DIAGNOSTIC_ADVANCED_READING_REVISED_VERSION = 'en-reading-advanced-original-draft-2';
const ENGLISH_DIAGNOSTIC_ADVANCED_READING_SECOND_REVISED_VERSION = 'en-reading-advanced-original-draft-3';

const REVISED_ITEM_CONTENT_VERSIONS = new Map<string, string>([
  ['en-c1-reading-02-q1', 'draft-2'],
  ['en-c1-reading-04-q2', 'draft-3'],
  ['en-c1-reading-05-q1', 'draft-2'],
  ['en-c1-reading-06-q2', 'draft-3'],
  ['en-c2-reading-01-q1', 'draft-3'],
  ['en-c2-reading-01-q2', 'draft-3'],
  ['en-c2-reading-02-q1', 'draft-3'],
  ['en-c2-reading-03-q1', 'draft-2'],
  ['en-c2-reading-03-q2', 'draft-3'],
  ['en-c2-reading-04-q1', 'draft-3'],
  ['en-c2-reading-06-q1', 'draft-2'],
]);

type Question = {
  subdomain: 'main-idea' | 'detail' | 'inference' | 'purpose' | 'structure' | 'meaning-in-context';
  prompt: string;
  options: readonly [string, string, string];
  correctIndex: 0 | 1 | 2;
  rationale: string;
  distractorRationales: readonly [string, string];
};

type Testlet = {
  level: 'C1' | 'C2';
  slug: string;
  title: string;
  text: string;
  questions: readonly [Question, Question];
};

const testlets: readonly Testlet[] = [
  {
    level: 'C1', slug: 'predictive-maintenance', title: 'When prevention becomes prediction',
    text: 'Factories have long serviced machinery at fixed intervals, replacing parts whether or not they showed signs of failure. Sensors now allow maintenance teams to intervene when vibration, temperature or energy use departs from an established pattern. Advocates call this predictive maintenance and point to fewer shutdowns and less unnecessary replacement. Yet the apparent precision can be misleading. A model trained on last year’s operating conditions may interpret a legitimate change in production as evidence of deterioration, while a novel fault may escape detection because the system has never encountered it. Experienced technicians therefore remain central: they decide whether an alert reflects a mechanical problem, a change in how the machine is being used or merely a faulty sensor. The technology is most valuable when it directs scarce attention, not when its probability estimates are mistaken for diagnoses.',
    questions: [
      { subdomain: 'main-idea', prompt: 'What is the author’s main claim about predictive maintenance?', options: ['It is useful as decision support but should not replace expert interpretation.', 'It eliminates unnecessary maintenance whenever enough sensors are installed.', 'It is less reliable than servicing every machine at fixed intervals.'], correctIndex: 0, rationale: 'The passage values prediction as a way to direct attention while reserving diagnosis for experienced technicians.', distractorRationales: ['The author describes both false alerts and missed novel faults.', 'The text criticises fixed schedules but does not claim predictive systems are simply worse.'] },
      { subdomain: 'inference', prompt: 'Why might a legitimate production change trigger an alert?', options: ['Technicians deliberately alter the sensor readings.', 'The model may treat unfamiliar but harmless conditions as abnormal.', 'Fixed maintenance schedules require an alert after every change.'], correctIndex: 1, rationale: 'A model based on prior conditions can classify a new operating pattern as deterioration even when the change is legitimate.', distractorRationales: ['No deliberate manipulation is suggested.', 'The alert belongs to the predictive system, not to the fixed schedule.'] },
    ],
  },
  {
    level: 'C1', slug: 'translation-policy', title: 'Translation and public participation',
    text: 'A council that translates a consultation document may believe it has made participation equally accessible. Translation is essential, but access also depends on when the version appears, how residents hear about it and whether the questions assume familiarity with administrative language. In one housing consultation, translated materials were published two weeks after the original and only online. Officials later attributed the low response from multilingual neighbourhoods to a lack of interest. Community organisers offered a different explanation: residents received less time, encountered unfamiliar procedural terms and had no opportunity to ask questions in their strongest language. The dispute matters because a technically accurate translation can still sit inside an unequal process. A better standard would evaluate not only whether words were transferred correctly, but whether each group had a comparable chance to understand the proposal, deliberate with others and influence the decision.',
    questions: [
      { subdomain: 'purpose', prompt: 'Why does the author describe the housing consultation?', options: ['To argue that late publication, rather than translation quality, caused the low response', 'To show that translated materials should be distributed through community organisers', 'To show why an accurate translation alone does not guarantee equal participation'], correctIndex: 2, rationale: 'The example demonstrates that timing, distribution and opportunities for clarification can undermine an accurate translation.', distractorRationales: ['The example identifies several unequal conditions rather than a single cause.', 'Community organisers explain the problem but are not presented as the required distribution channel.'] },
      { subdomain: 'meaning-in-context', prompt: 'What does “sit inside an unequal process” imply?', options: ['One sound component can operate within arrangements that still disadvantage people.', 'The translation was physically stored in the wrong office.', 'The original document contained more pages than the translation.'], correctIndex: 0, rationale: 'The phrase distinguishes the quality of the translated text from the fairness of the wider consultation process.', distractorRationales: ['The expression is conceptual, not spatial.', 'Document length is not the source of inequality discussed.'] },
    ],
  },
  {
    level: 'C1', slug: 'soil-restoration', title: 'The slow evidence of restored soil',
    text: 'A farming cooperative stopped deep ploughing and began planting winter cover crops to rebuild depleted soil. Within two years, photographs showed greener fields and the upper layer held more organic matter. Those results attracted funding, but researchers resisted declaring the restoration complete. Soil is not a single variable: water infiltration, microbial diversity, erosion and crop resilience may change at different rates, and a wet season can temporarily make almost any treatment look successful. The team therefore paired plots under the new system with comparable plots managed conventionally and committed to monitoring both for a decade. This design cannot remove every difference between farms, yet it makes confident stories harder to tell prematurely. The cooperative’s early gains are encouraging precisely because they have become hypotheses to test rather than proof that all relevant damage has already been reversed.',
    questions: [
      { subdomain: 'structure', prompt: 'How does the final sentence function in the argument?', options: ['It dismisses the early improvements as photographic errors.', 'It reframes promising observations as a basis for continued testing.', 'It claims that ten years of monitoring will eliminate every uncertainty.'], correctIndex: 1, rationale: 'The conclusion preserves the value of the early gains while limiting what they establish.', distractorRationales: ['The observations are called encouraging, not erroneous.', 'The passage explicitly says the design cannot remove every difference.'] },
      { subdomain: 'detail', prompt: 'Why are conventionally managed plots included?', options: ['To ensure both groups receive identical farming methods', 'To shorten the monitoring period to two years', 'To provide a comparison against changes unrelated to the new system'], correctIndex: 2, rationale: 'Comparable plots help separate the treatment’s effects from seasonal or broader changes.', distractorRationales: ['The plots deliberately use different management systems.', 'The comparison accompanies a decade-long commitment.'] },
    ],
  },
  {
    level: 'C1', slug: 'meeting-silence', title: 'Reading silence in meetings',
    text: 'Managers sometimes interpret silence in a meeting as consent, particularly when a proposal has already attracted vocal support. That interpretation is convenient, but silence can signal many things: uncertainty, strategic restraint, deference to hierarchy or simply a preference for reflecting before speaking. Inviting comments does not necessarily resolve the ambiguity if challenging a senior colleague carries an obvious social cost. Some teams use anonymous notes or ask participants to record objections before discussion begins. These techniques are not neutral cures; anonymity can remove useful context, and written responses may favour people who formulate ideas quickly. Their value lies in multiplying the routes through which disagreement can surface. A meeting becomes more informative not when everyone speaks equally often, but when the design makes it less likely that one communication style will be confused with the absence of a view.',
    questions: [
      { subdomain: 'inference', prompt: 'What assumption about open invitations to comment does the author question?', options: ['They can reveal every view regardless of status differences.', 'They always produce comments of equal length.', 'They prevent participants from reflecting before speaking.'], correctIndex: 0, rationale: 'The author notes that an invitation may not overcome the social cost of challenging a senior colleague.', distractorRationales: ['Length is not presented as the problem.', 'Reflection is one reason for silence, not something invitations necessarily prevent.'] },
      { subdomain: 'main-idea', prompt: 'Which principle best summarises the passage?', options: ['Anonymous notes can remove the social costs that silence creates.', 'Teams need multiple participation routes to interpret apparent agreement responsibly.', 'Silence usually indicates agreement when vocal support is already strong.'], correctIndex: 1, rationale: 'The passage recommends multiplying routes while acknowledging that no single technique is neutral.', distractorRationales: ['The author presents anonymity as useful but not as a neutral cure.', 'Silence is described as ambiguous even when a proposal has vocal support.'] },
    ],
  },
  {
    level: 'C1', slug: 'museum-replicas', title: 'Learning from a replica',
    text: 'Museums traditionally distinguish originals from replicas through labels, display cases and differences in lighting. Digital fabrication complicates that hierarchy. A precise copy can let visitors handle the shape of a carved object that conservation rules keep behind glass, while a reconstructed fragment may reveal how a damaged tool once functioned. Critics worry that spectacular replicas encourage visitors to overlook the uncertain choices involved in reconstruction. That risk is real when a copy is presented as self-explanatory. It diminishes, however, when the museum exposes the process: which measurements came from the surviving object, which surfaces were inferred and where specialists disagreed. Under those conditions, the replica does more than imitate an original. It becomes an argument that visitors can inspect, reminding them that historical knowledge is assembled from evidence rather than simply retrieved intact.',
    questions: [
      { subdomain: 'purpose', prompt: 'What distinction does the author make between two uses of replicas?', options: ['Physical access is the main criterion that determines a replica’s educational value.', 'Visible differences from the original make interpretive choices easier to examine.', 'Replicas can either conceal interpretive choices or make those choices examinable.'], correctIndex: 2, rationale: 'The author contrasts self-explanatory display with transparent presentation of evidence and inference.', distractorRationales: ['Handling is one possible benefit, not the main criterion in the argument.', 'The museum must expose its evidence and inferences; visible inaccuracy is not enough.'] },
      { subdomain: 'meaning-in-context', prompt: 'Calling a replica “an argument” suggests that it:', options: ['embodies claims and inferences that can be evaluated', 'should persuade visitors that the original is unnecessary', 'must reproduce every missing surface with certainty'], correctIndex: 0, rationale: 'A transparent reconstruction presents evidence-based choices open to inspection and disagreement.', distractorRationales: ['The original remains the evidential source.', 'The passage stresses uncertainty rather than total certainty.'] },
    ],
  },
  {
    level: 'C1', slug: 'forecast-language', title: 'What a forecast promises',
    text: 'Weather services increasingly attach probabilities to forecasts, yet many users still hear “a thirty per cent chance of rain” as a weak prediction that rain will occur somewhere. The percentage actually refers to a defined area, period and threshold, details that may disappear in a phone notification. Simplifying the message helps people act quickly, but it can also encourage false comparisons between forecasts produced for different regions or purposes. Some agencies now pair the number with a short impact statement, such as whether brief rain would affect travel or outdoor events. This does not remove uncertainty; it translates part of that uncertainty into consequences. The challenge is to avoid making a probabilistic forecast sound either uselessly vague or more exact than the underlying observations justify. Good communication preserves enough of the conditions behind the number for the user to know what kind of claim is being made.',
    questions: [
      { subdomain: 'detail', prompt: 'What information may be lost in a brief notification?', options: ['The name of the agency issuing the forecast', 'The area, time period and rainfall threshold behind the probability', 'All advice about travel and outdoor events'], correctIndex: 1, rationale: 'The passage explicitly identifies area, period and threshold as conditions that may disappear.', distractorRationales: ['Agency identity is not the stated loss.', 'Impact statements may add rather than remove this advice.'] },
      { subdomain: 'main-idea', prompt: 'What balance does the author advocate?', options: ['Replacing probabilities with impact statements that are easier to interpret', 'Preserving technical conditions even when the message becomes difficult to use', 'Making forecasts usable without hiding the limits of what the number means'], correctIndex: 2, rationale: 'The conclusion calls for actionable communication that preserves the conditions and uncertainty behind the probability.', distractorRationales: ['Impact statements can supplement probabilities rather than replace them.', 'The author values usability as well as the conditions behind the number.'] },
    ],
  },
  {
    level: 'C2', slug: 'institutional-memory', title: 'The convenience of institutional memory',
    text: 'Organisations often invoke institutional memory as though it were a storehouse from which settled lessons can be retrieved. The metaphor is reassuring and incomplete. Records preserve decisions unevenly: formal minutes capture what was authorised, not necessarily which alternatives were quietly excluded or which assumptions felt too obvious to document. Long-serving staff may supply those omissions, but recollection is itself reorganised by later events and by the teller’s present role. None of this makes memory useless. It changes the question from “What did the organisation learn?” to “Through which records, people and incentives has a particular account of learning survived?” A resilient institution does not merely retain more information. It keeps competing traces, notes uncertainty and makes it possible for newcomers to see where the official story is well supported and where it rests on retrospective coherence. Forgetting can then be treated not only as accidental loss but as a patterned feature of how organisations protect a usable identity.',
    questions: [
      { subdomain: 'structure', prompt: 'How does the passage develop its account of institutional memory?', options: ['It challenges a storage metaphor and proposes critically preserving different accounts.', 'It contrasts formal records with staff memories before favouring the latter as more complete.', 'It argues that institutions strengthen memory chiefly by preserving a larger volume of records.'], correctIndex: 0, rationale: 'The passage moves from critique of retrieval to a model involving competing traces, uncertainty and scrutiny.', distractorRationales: ['Both records and recollections are treated as partial and revisable.', 'The passage explicitly says resilience requires more than retaining additional information.'] },
      { subdomain: 'meaning-in-context', prompt: 'What is meant by “retrospective coherence”?', options: ['A later account that makes a disorderly past seem more coherent than it was', 'A later account that adds missing evidence to an otherwise accurate official record', 'Several independent accounts that converge on the same sequence of events'], correctIndex: 0, rationale: 'The phrase refers to reconstruction from the present that smooths over earlier uncertainty and alternatives.', distractorRationales: ['The problem is imposed order, not simply the addition of missing evidence.', 'Agreement among independent accounts is different from smoothing the past retrospectively.'] },
    ],
  },
  {
    level: 'C2', slug: 'benchmark-effects', title: 'When a benchmark becomes a target',
    text: 'A benchmark is designed to make unlike performances comparable by holding some conditions constant. Once careers or funding depend on it, however, participants reorganise their work around the measure. This is usually described as gaming, a term that implies evasion. Yet even conscientious adaptation changes what the benchmark observes. Teachers allocate time to assessed genres; hospitals refine the coding of cases; researchers choose questions likely to mature within a grant cycle. The resulting improvement may be genuine and still narrow the activity being judged. Periodically replacing the metric does not solve the problem, because instability prevents learning and simply rewards those quickest to infer the new incentives. The more defensible response is institutional modesty: treat the benchmark as evidence about selected dimensions, inspect what falls outside it and resist converting a comparative instrument into a complete definition of quality.',
    questions: [
      { subdomain: 'purpose', prompt: 'Why does the author question the label “gaming”?', options: ['It treats poorer measured outcomes as the main consequence of responding to incentives.', 'It overlooks how sincere responses to incentives can still alter what is measured.', 'It focuses on changes to the metric rather than changes to the activity being judged.'], correctIndex: 1, rationale: 'The passage argues that conscientious adaptation, not only evasion, reshapes the observed activity.', distractorRationales: ['The measured outcome may improve while the underlying activity narrows.', 'The label concerns participants’ conduct; the author’s point is that sincere adaptation also reshapes activity.'] },
      { subdomain: 'main-idea', prompt: 'What response to imperfect benchmarks does the author favour?', options: ['Changing the metric whenever participants understand it', 'Using several benchmarks and averaging them into one complete score', 'Acknowledging the measure’s limited scope and examining what it omits'], correctIndex: 2, rationale: 'The final sentence advocates institutional modesty, selected dimensions and attention to excluded activity.', distractorRationales: ['Frequent replacement is explicitly rejected.', 'No combination is said to form a complete definition of quality.'] },
    ],
  },
  {
    level: 'C2', slug: 'repair-culture', title: 'Repair as interpretation',
    text: 'Debates about repair often oppose faithful preservation to intrusive alteration, as if the original object supplied an unambiguous instruction. In practice, deciding what counts as the object already requires interpretation. Is a chair the timber selected by its maker, the form produced in the workshop, or the accumulated evidence of later use? Replacing a worn rung may restore function while erasing the traces through which historians understand ordinary life. Leaving it untouched may preserve those traces while converting a chair into an object that can no longer be used as one. Conservators do not escape this tension by doing less; non-intervention also privileges certain values and future users. The responsible question is therefore not whether interpretation can be avoided, but whether the chosen intervention states its priorities, records what it changes and remains answerable to plausible alternative understandings of the object.',
    questions: [
      { subdomain: 'inference', prompt: 'What does the chair example demonstrate?', options: ['Restoring function can preserve historical evidence more effectively than non-intervention.', 'The maker’s materials provide the most stable basis for deciding the object’s identity.', 'Function, material history and later use can support conflicting preservation choices.'], correctIndex: 2, rationale: 'The example shows that restoring use and preserving wear embody different legitimate understandings.', distractorRationales: ['Restoring function may erase traces of later use rather than preserve them.', 'The passage presents the maker’s materials as one possible value, not a privileged basis.'] },
      { subdomain: 'meaning-in-context', prompt: 'What does “answerable to” mean in the final sentence?', options: ['required to be justified against competing interpretations', 'formally authorised by the institution that owns the object', 'capable of being reversed without altering the original material'], correctIndex: 0, rationale: 'A responsible intervention must be justifiable against reasonable competing interpretations.', distractorRationales: ['Ownership or authorisation is not at issue.', 'Reversibility may matter, but it is not the phrase’s meaning here.'] },
    ],
  },
  {
    level: 'C2', slug: 'model-explanations', title: 'Explanations for whom?',
    text: 'Calls for explainable algorithms often proceed as if explanation were a property that could simply be added to a model. An engineer debugging a system, a regulator assessing discrimination and an applicant contesting a decision do not need the same account. A list of influential variables might help the engineer while telling the applicant little about what evidence could change the outcome. Conversely, a concise reason code may support an appeal but conceal interactions a regulator must inspect across thousands of cases. The demand for “an explanation” can therefore become ceremonial: an organisation supplies a technically accurate artefact and treats the obligation as discharged. Meaningful explanation begins by specifying the recipient’s task and power. It should enable a relevant action—correction, oversight or challenge—and its adequacy should be judged by whether that action becomes more informed, not by whether the system has produced an additional description of itself.',
    questions: [
      { subdomain: 'detail', prompt: 'Why might influential variables be insufficient for an applicant?', options: ['They may reveal patterns that matter mainly when a regulator compares many cases.', 'They may not show what evidence could alter or contest the decision.', 'They are designed to support an appeal rather than technical debugging.'], correctIndex: 1, rationale: 'The passage directly contrasts engineering usefulness with an applicant’s need to know how an outcome might change.', distractorRationales: ['Cross-case patterns are discussed as a regulator’s concern with concise reason codes, not the applicant’s problem with variables.', 'The passage says influential variables may help debugging and may fail to support an appeal.'] },
      { subdomain: 'main-idea', prompt: 'How should an explanation’s adequacy be assessed, according to the author?', options: ['By the amount of technical detail it contains', 'By whether one account satisfies every audience', 'By whether it enables its intended recipient to act more knowledgeably'], correctIndex: 2, rationale: 'The conclusion makes informed correction, oversight or challenge the criterion.', distractorRationales: ['More detail may still be irrelevant to the recipient’s task.', 'The passage argues that audiences require different accounts.'] },
    ],
  },
  {
    level: 'C2', slug: 'counterfactual-history', title: 'What counterfactuals can clarify',
    text: 'Counterfactual history is sometimes dismissed as fantasy because its questions concern events that did not occur. The criticism has force when alternative histories become unconstrained stories. Used carefully, however, a counterfactual can expose claims hidden inside an ordinary causal narrative. To say that a reform caused an economic recovery implies that, without the reform, recovery would have been weaker or later. Historians cannot observe that alternative directly, but they can ask whether the proposed departure is plausible, which surrounding conditions should remain fixed and what comparable cases suggest. The exercise does not manufacture certainty about an unreal past. It disciplines causal language by making its assumptions contestable. A counterfactual is strongest when the imagined change is limited, the chain of consequences is explicit and the conclusion remains proportionate to the evidence available in the world that actually occurred.',
    questions: [
      { subdomain: 'purpose', prompt: 'What defence of counterfactual reasoning does the author offer?', options: ['It predicts alternative worlds with the same certainty as observed events.', 'It makes the assumptions behind causal claims visible for examination.', 'It replaces comparison with imaginative narrative.'], correctIndex: 1, rationale: 'The central defence is that counterfactuals expose and discipline the implied alternative in causal language.', distractorRationales: ['The author explicitly denies certainty about an unreal past.', 'Comparable cases are one source of constraint.'] },
      { subdomain: 'detail', prompt: 'Which feature characterises a strong counterfactual in the passage?', options: ['It changes many conditions at once to maximise contrast.', 'It ends with a definitive claim regardless of available evidence.', 'It limits the imagined departure and states the consequence chain clearly.'], correctIndex: 2, rationale: 'The final sentence specifies a limited change, explicit consequences and a proportionate conclusion.', distractorRationales: ['Multiple simultaneous changes reduce constraint.', 'The conclusion must remain proportionate rather than definitive.'] },
    ],
  },
  {
    level: 'C2', slug: 'administrative-categories', title: 'Categories that govern',
    text: 'Administrative categories are often defended as neutral containers: a person either meets the definition or does not. But definitions distribute visibility as well as resources. A form that recognises only permanent employment may render intermittent workers statistically absent, even when their labour is economically substantial. Adding more categories can improve recognition, yet it also produces new boundaries and incentives to present complex lives in institutionally legible ways. The point is not that classification should cease; large systems cannot allocate services without some simplification. It is that categories should be treated as revisable instruments whose consequences require observation. When people repeatedly appear as exceptions, the anomaly may lie less in their lives than in the administrative lens. A mature system records where cases resist classification and uses that friction as evidence about the category, rather than merely as evidence that the case is defective.',
    questions: [
      { subdomain: 'inference', prompt: 'What does the author imply about adding categories?', options: ['It can correct omissions but cannot eliminate the effects of classification.', 'It makes administration more accurate by replacing broad categories with narrower ones.', 'It solves problems of recognition when institutions add enough categories.'], correctIndex: 0, rationale: 'More categories may improve recognition while creating new boundaries and incentives.', distractorRationales: ['New categories also produce boundaries and incentives; narrower is not automatically more accurate.', 'The passage argues that classification effects persist even as categories multiply.'] },
      { subdomain: 'structure', prompt: 'What role does the final sentence play?', options: ['It gives an example of a permanent employment contract.', 'It translates the argument into a principle for handling anomalous cases.', 'It withdraws the earlier claim that categories can be revised.'], correctIndex: 1, rationale: 'The ending operationalises the thesis: record friction and use it to evaluate the category.', distractorRationales: ['No employment example appears in that sentence.', 'It reinforces, rather than withdraws, revisability.'] },
    ],
  },
];

export const ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES: readonly DiagnosticBankRecord[] = testlets.flatMap((testlet, testletIndex) => {
  const ordinal = (testletIndex % 6) + 1;
  const stimulusId = `en-${testlet.level.toLowerCase()}-reading-${String(ordinal).padStart(2, '0')}`;
  return testlet.questions.map((question, questionIndex): DiagnosticBankRecord => {
    const id = `${stimulusId}-q${questionIndex + 1}`;
    const contentVersion = REVISED_ITEM_CONTENT_VERSIONS.get(id) ?? 'draft-1';
    const optionIds = question.options.map((_, optionIndex) => `${id}-o${optionIndex + 1}`);
    const distractorIndexes = [0, 1, 2].filter((optionIndex) => optionIndex !== question.correctIndex);
    return {
      publicItem: {
        id, contentVersion, language: 'en', skill: 'reading', subdomain: question.subdomain,
        levelCandidate: testlet.level, prompt: question.prompt,
        stimulus: { kind: 'text', stimulusId, title: testlet.title, body: testlet.text },
        response: { kind: 'single-choice', optionIds },
        displayOptions: question.options.map((text, optionIndex) => ({ id: optionIds[optionIndex], text })),
      },
      status: 'reserved', exposure: 'reserved', review: { status: 'draft' },
      scoring: { kind: 'single-choice', optionId: optionIds[question.correctIndex] },
      rationale: {
        key: question.rationale,
        distractors: Object.fromEntries(distractorIndexes.map((optionIndex, rationaleIndex) => [
          optionIds[optionIndex], question.distractorRationales[rationaleIndex],
        ])),
      },
      source: {
        kind: 'welearn-original',
        reference: `${contentVersion === 'draft-1'
          ? ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATE_VERSION
          : contentVersion === 'draft-2'
            ? ENGLISH_DIAGNOSTIC_ADVANCED_READING_REVISED_VERSION
            : ENGLISH_DIAGNOSTIC_ADVANCED_READING_SECOND_REVISED_VERSION}:${testlet.slug}`,
      },
      levelRange: [testlet.level, testlet.level],
      warnings: ['PENDING_INDEPENDENT_LINGUISTIC_REVIEW', 'PENDING_PILOT_CALIBRATION'],
    };
  });
});
