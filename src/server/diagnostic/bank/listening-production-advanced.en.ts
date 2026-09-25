import type { CefrLevel } from '../../../lib/diagnostic/types.ts';
import type {
  DiagnosticListeningProductionBrief,
  ListeningSubdomain,
} from './listening-production-lower.en.ts';

export const ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_VERSION = 'en-listening-original-advanced-production-1';

type AdvancedLevel = Extract<CefrLevel, 'C1' | 'C2'>;

interface AdvancedQuestion {
  subdomain: ListeningSubdomain;
  prompt: string;
  options: readonly [string, string, string];
  correctIndex: 0 | 1 | 2;
  rationale: string;
  distractorRationales: readonly [string, string];
}

interface AdvancedBriefSource {
  level: AdvancedLevel;
  delivery: string;
  turns: DiagnosticListeningProductionBrief['recording']['turns'];
  questions: readonly [AdvancedQuestion, AdvancedQuestion];
}

const sources: readonly AdvancedBriefSource[] = [
  {
    level: 'C1',
    delivery: 'Public-policy podcast with a precise, reflective expert voice; preserve qualifications and the contrast between visible and systemic interventions.',
    turns: [{
      speaker: 'narrator',
      text: 'Cities often respond to extreme heat by announcing tree-planting targets, because a number is easy to communicate and a row of young trees is highly visible. Yet a target measured only in trees planted can reward the wrong behaviour. A sapling placed where it cannot reach maturity contributes little shade, and a species selected without regard to water demand may become a liability during drought. More useful programmes begin with the experience they want to change: the temperature along a child’s walk to school, for example, or the heat retained overnight in a dense neighbourhood. That shifts attention from planting ceremonies to canopy survival, soil volume and long-term maintenance. It also exposes a distributional problem. Districts with wide pavements and active residents often secure new greenery first, while hotter areas with less public space require costlier redesign. None of this makes tree targets pointless. They can mobilise budgets and permit public scrutiny. But the headline figure should be treated as an input, not the result. A credible heat strategy reports where shade is created, who benefits, how conditions change over time and what happens when trees fail. Otherwise, apparent progress may simply record good intentions at the moment of planting.',
    }],
    questions: [
      { subdomain: 'main-idea', prompt: 'What is the speaker’s central argument?', options: ['Tree-planting totals should be judged through durable, distributed cooling outcomes', 'Cities should replace tree programmes with artificial shade in every district', 'Residents should be solely responsible for maintaining new urban trees'], correctIndex: 0, rationale: 'The speaker accepts targets as inputs but argues that survival, location, beneficiaries and actual cooling are the meaningful outcomes.', distractorRationales: ['Artificial shade is not proposed as a universal replacement.', 'The speaker emphasises programme design and maintenance, not transferring responsibility to residents.'] },
      { subdomain: 'speaker-intent', prompt: 'Why does the speaker mention a child’s walk to school?', options: ['To claim that schools own most suitable planting land', 'To illustrate an outcome-focused way to define the problem', 'To suggest that children are more interested in planting ceremonies'], correctIndex: 1, rationale: 'The example reframes the objective around a concrete human experience rather than a count of planted trees.', distractorRationales: ['Land ownership is not part of the example.', 'Ceremonies are criticised as visible inputs, not linked to children’s preferences.'] },
    ],
  },
  {
    level: 'C1',
    delivery: 'Oral-history interview; two mature voices, with the interviewee correcting the premise politely and pausing before the final qualification.',
    turns: [
      { speaker: 'speaker-a', text: 'People describe the harbour protest as a spontaneous reaction to the factory closure. Is that how you remember it?' },
      { speaker: 'speaker-b', text: 'Spontaneous makes it sound as though everyone woke up angry on Tuesday and marched by lunchtime. The closure was the trigger, certainly, but networks were already there. Parents had organised around air quality; fishing crews had challenged access restrictions; the union had a phone tree. Those groups did not always agree, yet they knew how to contact one another.' },
      { speaker: 'speaker-a', text: 'But the photographs show an unusually broad crowd.' },
      { speaker: 'speaker-b', text: 'They do, and that breadth mattered. What photographs cannot show is how temporary some alliances were. One campaign wanted public ownership of the site, another wanted tourism, and many workers simply wanted wages secured. We agreed on stopping demolition before agreeing on an alternative—if we ever did.' },
      { speaker: 'speaker-a', text: 'Did later accounts simplify that tension?' },
      { speaker: 'speaker-b', text: 'Naturally. Anniversaries prefer a single purpose and a clear victory. The protest did delay demolition, which created room for negotiation. Calling that a complete victory, however, hides the compromises and the people whose proposals disappeared from the final plan. I am not saying the photographs lie. I am saying unity in a moment is not the same thing as consensus over time.' },
    ],
    questions: [
      { subdomain: 'inference', prompt: 'What does the interviewee imply about the protest’s apparent spontaneity?', options: ['The factory closure had been secretly planned by campaigners', 'Most participants had never engaged in local organising', 'Existing networks enabled a rapid response to a new trigger'], correctIndex: 2, rationale: 'The closure prompted action, but prior campaigns, union contacts and established relationships made rapid mobilisation possible.', distractorRationales: ['No claim is made that campaigners planned the closure.', 'Several groups had substantial organising experience.'] },
      { subdomain: 'main-idea', prompt: 'What distinction is most important to the interviewee?', options: ['Momentary coalition versus lasting agreement', 'Photographic evidence versus written evidence', 'Tourism employment versus factory employment'], correctIndex: 0, rationale: 'The interviewee repeatedly distinguishes cooperation to delay demolition from consensus about the site’s future.', distractorRationales: ['The point is not a hierarchy between evidence formats.', 'Different economic proposals illustrate disagreement but are not the central conceptual distinction.'] },
    ],
  },
  {
    level: 'C1',
    delivery: 'Research seminar exchange; the presenter is careful, and the questioner presses on causal interpretation without hostility.',
    turns: [
      { speaker: 'speaker-a', text: 'You found that employees who chose hybrid schedules reported higher job satisfaction. How did you separate the effect of location from the effect of having a choice?' },
      { speaker: 'speaker-b', text: 'We could not separate them completely in the observational phase. People selecting hybrid work differed from office-based colleagues in role, seniority and commuting distance. We adjusted for measured differences, but unmeasured preferences may remain.' },
      { speaker: 'speaker-a', text: 'Then why describe the result as evidence for hybrid work?' },
      { speaker: 'speaker-b', text: 'I describe it as evidence about hybrid arrangements, not proof that two days at home causes satisfaction. Our second phase offers a stronger comparison: three departments changed scheduling rules at different times, and satisfaction rose most where teams negotiated shared office days. It barely moved where individuals chose days independently.' },
      { speaker: 'speaker-a', text: 'Could supportive managers have both negotiated well and improved morale by other means?' },
      { speaker: 'speaker-b', text: 'Yes. Manager behaviour is a plausible pathway and a possible confounder. We are analysing meeting loads and response patterns, but no statistical adjustment will turn this into a randomised trial. The practical signal is narrower: coordination appears relevant, so organisations should evaluate the social design of hybrid work rather than copying a numerical attendance rule.' },
    ],
    questions: [
      { subdomain: 'inference', prompt: 'Why does the presenter treat the first phase cautiously?', options: ['Job satisfaction was measured only after employees resigned', 'People choosing different arrangements may differ in relevant unseen ways', 'The study included no employees working from an office'], correctIndex: 1, rationale: 'Self-selection and unmeasured preferences limit the ability to attribute satisfaction differences causally to work location.', distractorRationales: ['Resignation is not part of the described measurement.', 'Office-based colleagues form a comparison group.'] },
      { subdomain: 'speaker-intent', prompt: 'What practical conclusion does the presenter defend?', options: ['Every team should adopt exactly two remote days', 'Randomised trials are unnecessary for workplace policy', 'Organisations should examine coordination, not imitate a simple quota'], correctIndex: 2, rationale: 'The final recommendation is deliberately narrow and focuses on the social organisation of hybrid work rather than a universal attendance number.', distractorRationales: ['The speaker explicitly resists copying a numerical rule.', 'The limits of a non-randomised design are acknowledged, not dismissed.'] },
    ],
  },
  {
    level: 'C1',
    delivery: 'Editorial meeting with restrained disagreement; three positions are compressed into two voices, so mark reported viewpoints clearly.',
    turns: [
      { speaker: 'speaker-a', text: 'The headline says the river restoration has failed because salmon numbers fell this year. The data are correct, but I think the framing outruns them.' },
      { speaker: 'speaker-b', text: 'Readers need a clear result. The project promised ecological recovery, and fewer salmon looks like the opposite.' },
      { speaker: 'speaker-a', text: 'Only if one year represents the trend. Juvenile fish increased upstream, while adult returns fell across the whole region after unusually warm sea conditions. The local project could be helping one stage of the life cycle without overcoming losses elsewhere.' },
      { speaker: 'speaker-b', text: 'So you want a headline that says nothing can be concluded?' },
      { speaker: 'speaker-a', text: 'No. We can say the headline indicator worsened despite promising local signs. That tension is the story. The restoration team also selected salmon as its public symbol, so scrutiny is fair. But the article should distinguish whether the intervention was badly implemented, whether its benefits need longer to appear, or whether external conditions overwhelmed them.' },
      { speaker: 'speaker-b', text: 'The editor will ask whether that is too cautious.' },
      { speaker: 'speaker-a', text: 'Caution is not vagueness if we specify the competing explanations and the evidence needed to tell them apart. Let’s ask for five-year comparison data and independent measurements of water temperature before publication.' },
    ],
    questions: [
      { subdomain: 'main-idea', prompt: 'What framing does the first speaker advocate?', options: ['Report the negative headline measure alongside evidence that complicates its interpretation', 'Avoid discussing salmon because the restoration team chose that symbol', 'Present regional sea temperatures as proof that the project succeeded'], correctIndex: 0, rationale: 'The proposed story preserves the decline as news while explaining local gains, regional conditions and unresolved causal alternatives.', distractorRationales: ['The speaker says public scrutiny of the salmon measure is fair.', 'External conditions complicate attribution but do not prove local success.'] },
      { subdomain: 'speaker-intent', prompt: 'Why does the first speaker call caution “not vagueness”?', options: ['To postpone the article until the project is complete', 'To argue that explicit uncertainty can still be precise and testable', 'To reassure the editor that the original headline is accurate'], correctIndex: 1, rationale: 'The speaker proposes named explanations and specific additional evidence, making uncertainty informative rather than evasive.', distractorRationales: ['The speaker requests evidence before publication but does not require project completion.', 'The original headline is criticised for going beyond the data.'] },
    ],
  },
  {
    level: 'C1',
    delivery: 'Arts review for radio, with controlled irony in the middle and a warmer tone in the final assessment.',
    turns: [{
      speaker: 'narrator',
      text: 'The new production of The Tempest opens with an arresting image: the audience enters to find the actors already sweeping sand from a flooded stage. For ten minutes, the labour is absorbing. It turns the storm from a theatrical effect into a condition the characters must continually manage. The difficulty comes when the production insists on explaining its own metaphor. Projected captions announce themes the image has already conveyed, and an added speech tells us—twice—that power resembles control over the weather. Such guidance underestimates both the audience and the actors, whose physical relationships communicate far more subtly. Yet the evening recovers after the interval. The captions disappear, scenes are allowed to breathe, and the same water that had represented threat becomes playful without pretending the threat has vanished. Most impressive is the decision not to grant Prospero a grand moment of renunciation. He relinquishes authority while helping the others clear the stage, an action modest enough to feel earned. The production is therefore less coherent than its publicity claims, but more interesting than a tidy concept would have been. Its failures come from excessive certainty; its successes emerge when image, movement and ambiguity are trusted.',
    }],
    questions: [
      { subdomain: 'inference', prompt: 'What does the reviewer see as the production’s main weakness?', options: ['Its central visual idea is too difficult to recognise', 'Its actors lack the physical skill to sustain the staging', 'It repeatedly explains meanings that the performance already conveys'], correctIndex: 2, rationale: 'The reviewer objects to captions and added speech that spell out a metaphor already communicated by image and acting.', distractorRationales: ['The opening image is described as arresting and clear.', 'The actors’ physical relationships are praised as subtle.'] },
      { subdomain: 'main-idea', prompt: 'How does the reviewer assess the production overall?', options: ['Uneven, but strongest when it permits ambiguity', 'Consistently successful because its concept is tidy', 'Visually impressive but emotionally empty throughout'], correctIndex: 0, rationale: 'The review criticises over-explanation yet praises the later restraint and concludes that uncertainty produces the best moments.', distractorRationales: ['Its incoherence and excessive certainty are explicitly criticised.', 'The later scenes and Prospero’s modest action carry emotional and thematic force.'] },
    ],
  },
  {
    level: 'C1',
    delivery: 'Science communication workshop; alternate a pragmatic trainer voice with a participant who asks a genuine, sceptical question.',
    turns: [
      { speaker: 'speaker-a', text: 'When explaining risk, people often replace a probability with a verbal label such as unlikely. That feels accessible, but listeners attach very different numbers to the same word.' },
      { speaker: 'speaker-b', text: 'Would giving a precise percentage solve that?' },
      { speaker: 'speaker-a', text: 'It solves one ambiguity and can create another. A figure like twelve point three per cent may imply a degree of measurement precision the evidence cannot support. We recommend a rounded frequency—roughly twelve people in a hundred—alongside the main uncertainties and a relevant comparison.' },
      { speaker: 'speaker-b', text: 'Comparisons can manipulate perception too. Saying a risk doubled sounds dramatic even if it rose from one case to two.' },
      { speaker: 'speaker-a', text: 'Exactly. Give both the baseline and the change. Also test whether the comparison helps a decision. Comparing a rare side effect with the chance of being struck by lightning may be memorable but useless if the listener is deciding between two treatments.' },
      { speaker: 'speaker-b', text: 'So there is no neutral format?' },
      { speaker: 'speaker-a', text: 'No format is neutral in the sense of being interpretation-free. That is not permission to choose whichever framing produces the desired response. It is a reason to present consistent denominators, disclose uncertainty and show absolute as well as relative differences. Transparency is a design discipline, not the absence of design.' },
    ],
    questions: [
      { subdomain: 'detail', prompt: 'Why can a highly precise percentage be misleading?', options: ['Listeners cannot compare percentages with frequencies', 'It may suggest stronger measurement certainty than exists', 'It always makes small risks appear larger'], correctIndex: 1, rationale: 'The trainer warns that decimal precision can overstate how precisely the underlying evidence supports the estimate.', distractorRationales: ['The workshop recommends using frequencies but does not say comparison is impossible.', 'The criticism concerns false precision, not an inevitable directional bias.'] },
      { subdomain: 'speaker-intent', prompt: 'What does the trainer mean by calling transparency a “design discipline”?', options: ['Risk communication should avoid every deliberate formatting choice', 'Communicators may select any frame if they disclose it later', 'Responsible presentation requires deliberate, consistent choices that expose uncertainty'], correctIndex: 2, rationale: 'The phrase rejects the idea of a neutral, undesigned format while requiring consistent denominators, uncertainty and absolute differences.', distractorRationales: ['The speaker says all formats involve interpretation.', 'Disclosure does not justify manipulative framing.'] },
    ],
  },
  {
    level: 'C2',
    delivery: 'High-level philosophy lecture, intellectually dense but orally natural; use phrasing and pauses to mark concessions and reformulations.',
    turns: [{
      speaker: 'narrator',
      text: 'We tend to describe expertise as possession: the expert has knowledge that the novice lacks. That is true, but incomplete in a revealing way. In uncertain environments, expertise may consist less in carrying more answers than in recognising which question the situation will bear. A novice sees conflicting measurements and asks which one is correct. An expert may first ask whether the instruments are measuring the same phenomenon, at the same scale, for the same purpose. This can look like hesitation, particularly to institutions that summon experts in order to eliminate doubt. Yet the expert’s refusal to collapse distinct questions is often the most valuable contribution. There is, however, an opposite danger. Specialists can turn every decision into an invitation for further research, shielding themselves from the costs of action. Intellectual humility then becomes indistinguishable from institutional caution. The remedy is not to demand false certainty, but to separate uncertainty about facts from disagreement about values and tolerance for risk. Evidence may tell us that several outcomes remain plausible; it cannot decide unaided which possible loss a community should accept. Expertise earns authority by clarifying that boundary, not by pretending the boundary disappears. Nor does democratic judgement make specialised knowledge optional. The difficult relationship is reciprocal: experts must expose the structure and limits of their claims, while decision-makers must own the choices that evidence cannot settle.',
    }],
    questions: [
      { subdomain: 'main-idea', prompt: 'How does the speaker ultimately define responsible expertise?', options: ['As clarifying what evidence can establish while distinguishing the choices it cannot make', 'As withholding advice until all plausible outcomes have been researched', 'As translating political preferences into apparently objective measurements'], correctIndex: 0, rationale: 'The lecture presents expertise as identifying proper questions, limits and factual uncertainty while leaving value and risk choices visibly accountable.', distractorRationales: ['Endless deferral is criticised as institutional caution disguised as humility.', 'The speaker argues against concealing value choices as factual conclusions.'] },
      { subdomain: 'inference', prompt: 'Why can expert hesitation be especially misunderstood by institutions?', options: ['Institutions generally lack access to measurement instruments', 'They may expect expertise to remove uncertainty rather than organise it', 'They prefer value disputes to be decided democratically'], correctIndex: 1, rationale: 'Institutions are said to summon experts to eliminate doubt, so careful differentiation can be mistaken for indecision.', distractorRationales: ['Instrument access is not the institutional problem described.', 'The lecture argues that institutions must own value choices, but this does not explain the misunderstanding of hesitation.'] },
    ],
  },
  {
    level: 'C2',
    delivery: 'Contract negotiation between experienced professionals; maintain politeness while making the strategic implications of each concession audible.',
    turns: [
      { speaker: 'speaker-a', text: 'Your revised licence permits us to use the dataset for three years, but any model trained during that period must be deleted when the licence expires. That makes the final year almost unusable.' },
      { speaker: 'speaker-b', text: 'The deletion clause prevents an indefinite benefit from a time-limited fee. We cannot verify what remains embedded in a model once raw access ends.' },
      { speaker: 'speaker-a', text: 'We could preserve auditability without pretending a trained system is simply another copy of the data. What if models may be retained, but not updated or deployed for new clients after expiry?' },
      { speaker: 'speaker-b', text: '“New clients” is difficult to police. A product may serve an existing client in a new market. I would rather distinguish internal evaluation from commercial operation.' },
      { speaker: 'speaker-a', text: 'That leaves us paying to build something we may never operate. Suppose deployment rights continue for models listed in a signed register before expiry, subject to annual performance and privacy audits. No unregistered derivative model survives.' },
      { speaker: 'speaker-b', text: 'Potentially, if the register records architecture and training date without disclosing your proprietary code. We would also need a remedy if an audit identifies memorisation of protected records.' },
      { speaker: 'speaker-a', text: 'Suspension while we investigate, followed by deletion only if remediation fails?' },
      { speaker: 'speaker-b', text: 'Yes, with a defined investigation window. That converts an absolute restriction into a controllable continuing obligation, which I can take back to our board.' },
    ],
    questions: [
      { subdomain: 'discourse-tracking', prompt: 'How does the proposed solution evolve?', options: ['From a three-year licence to permanent access to raw data', 'From annual audits to unrestricted deployment for existing clients', 'From deleting all models to allowing registered models under continuing safeguards'], correctIndex: 2, rationale: 'The parties replace blanket deletion with a register, limited continuation, audits and conditional suspension or deletion.', distractorRationales: ['Raw-data access is never proposed as permanent.', 'Ongoing audits and deployment controls are central rather than removed.'] },
      { subdomain: 'speaker-intent', prompt: 'Why does the second speaker prefer “internal evaluation” to “new clients” as a boundary?', options: ['Internal evaluation reveals more proprietary code', 'Client categories can shift in ways that make enforcement ambiguous', 'The licence fee covers only models used by existing clients'], correctIndex: 1, rationale: 'The example of an existing client entering a new market shows that client-based categories are difficult to define and police.', distractorRationales: ['The later register is designed specifically to avoid disclosure of proprietary code.', 'No fee allocation between client categories is stated.'] },
    ],
  },
  {
    level: 'C2',
    delivery: 'Historiography seminar excerpt; the lecturer should distinguish critique of a source from dismissal of it.',
    turns: [{
      speaker: 'narrator',
      text: 'The governor’s diaries have long been mined for descriptions of the drought, partly because they provide an almost daily sequence when other records are fragmentary. Their continuity is genuinely valuable. But continuity can seduce us into treating one person’s changing attention as a stable measure of events. In the first months, the governor records reservoir levels with bureaucratic precision. Later, as political criticism intensifies, he writes more about public disorder and less about water. One reading is that social conflict displaced environmental concern. Another is that the diary’s purpose changed: it became a defence intended for future readers. The absence of water figures may therefore indicate neither recovery nor neglect in the administration itself. Tax ledgers and engineers’ reports suggest monitoring continued. This does not disqualify the diary; it changes the question we ask of it. Instead of extracting a transparent chronology, we can examine how an official reclassified a material crisis as a problem of legitimacy. Even the polished passages, once dismissed as self-serving, reveal which accusations he feared would endure. A biased source is not merely a damaged window onto events. It is also evidence of the position from which the view was constructed. The historian’s task is not to choose between trust and rejection, but to explain what kind of claim each feature can sustain.',
    }],
    questions: [
      { subdomain: 'inference', prompt: 'What does the lecturer infer from the diary’s declining attention to water figures?', options: ['The drought had certainly ended by that point', 'Administrative monitoring stopped as disorder increased', 'The diary may have shifted from record-keeping toward self-defence'], correctIndex: 2, rationale: 'The lecturer treats the change in content as possible evidence that the author began writing for future political judgement.', distractorRationales: ['Other records do not support inferring recovery from silence.', 'Engineers’ reports and tax records suggest monitoring continued elsewhere.'] },
      { subdomain: 'main-idea', prompt: 'What method of source analysis does the lecturer endorse?', options: ['Match each feature of a partial source to the claims it can legitimately support', 'Reject self-interested documents in favour of numerical archives', 'Treat continuous records as neutral unless another source directly contradicts them'], correctIndex: 0, rationale: 'The conclusion replaces a binary of trust or rejection with an analysis of perspective, purpose and claim-specific evidential value.', distractorRationales: ['Self-serving passages themselves are treated as historically informative.', 'Continuity is explicitly said to create a misleading impression of stability.'] },
    ],
  },
  {
    level: 'C2',
    delivery: 'Literary criticism broadcast; confident but not reverential, with a subtle shift from apparent limitation to interpretive strength.',
    turns: [{
      speaker: 'narrator',
      text: 'At first glance, the novel’s refusal to enter Mara’s thoughts appears a curious limitation. She is the figure around whom every decision turns, yet we encounter her only through letters quoted by others, gestures observed across rooms and accounts that plainly contradict one another. Some readers have treated this as coyness: an artificial mystery sustained by withholding the one perspective that could resolve it. But resolution is precisely what the novel distrusts. Each narrator converts Mara into evidence for a private theory—of loyalty, ambition, betrayal—and the gaps expose their appetite for coherence. Even her letters resist rescue. Sentences are excerpted, dates omitted, affectionate phrases made to bear the weight of promises they may never have carried. We are not invited to assemble these fragments into the real Mara, as though sufficient attention could restore an untouched original. We are invited to notice how interpretation becomes possession. The formal absence is therefore not emptiness but pressure: it makes the reader feel the temptation to complete another person and then implicates us in it. The risk is undeniable. A character denied interiority can become merely a device for other people’s development. The novel avoids that fate only intermittently, when Mara’s actions exceed the explanations supplied for them. Those moments do not disclose who she truly is; they preserve her right not to be exhausted by the narratives surrounding her.',
    }],
    questions: [
      { subdomain: 'main-idea', prompt: 'How does the critic interpret the absence of Mara’s inner viewpoint?', options: ['As proof that the author did not fully develop the central plot', 'As an invitation to identify which narrator reports her accurately', 'As a device that exposes the urge to reduce another person to a coherent explanation'], correctIndex: 2, rationale: 'The critic argues that the withheld viewpoint implicates narrators and readers in turning fragments into possessive, totalising interpretations.', distractorRationales: ['The limitation carries a risk, but the critic identifies a deliberate formal function.', 'The novel resists the premise that one account can recover a definitive Mara.'] },
      { subdomain: 'inference', prompt: 'When does the critic think the technique is least successful?', options: ['When Mara functions only as an instrument for other characters', 'When her actions contradict the narrators’ explanations', 'When the novel refuses to reveal her definitive motives'], correctIndex: 0, rationale: 'The critic calls it a risk when denied interiority reduces Mara to a device for other people’s development.', distractorRationales: ['Actions exceeding explanation are said to help the novel avoid that risk.', 'The absence of definitive motives is central to the critic’s positive interpretation.'] },
    ],
  },
  {
    level: 'C2',
    delivery: 'Environmental methods panel; speakers overlap conceptually but not acoustically, and the final answer should sound like a synthesis rather than a retreat.',
    turns: [
      { speaker: 'speaker-a', text: 'Your population estimate for the marsh bird is lower than last year’s. Is the species declining?' },
      { speaker: 'speaker-b', text: 'The observations are lower. The population may be lower too, but detection changed. Heavy rain reduced access to three sites, and new vegetation made birds harder to see at two others.' },
      { speaker: 'speaker-a', text: 'You adjusted for detectability in the model.' },
      { speaker: 'speaker-b', text: 'We did, using repeated visits and call-recording data. But adjustments depend on assumptions about how detection varies. The acoustic recorders captured more calls than expected in inaccessible areas, which pulls the estimate upward, while visual counts pull it downward.' },
      { speaker: 'speaker-a', text: 'Does combining methods resolve the discrepancy?' },
      { speaker: 'speaker-b', text: 'It characterises it. A call does not map neatly to an individual, and visible birds are not a random sample. The methods have different biases; agreement would reassure us, but disagreement is also information.' },
      { speaker: 'speaker-a', text: 'What can conservation managers act on now?' },
      { speaker: 'speaker-b', text: 'They should not wait for a perfect population number. Breeding habitat at the accessible sites has deteriorated, and restoring water levels is justified across every plausible estimate. What should remain provisional is the claim that the intervention has already reversed a population decline. We can act under uncertainty without pretending the uncertainty has been solved.' },
    ],
    questions: [
      { subdomain: 'inference', prompt: 'What does the researcher mean by saying combined methods “characterise” the discrepancy?', options: ['They identify one method as entirely reliable', 'They reveal the direction and sources of uncertainty without eliminating them', 'They convert calls and sightings into directly equivalent counts'], correctIndex: 1, rationale: 'Each method exposes different biases, so their disagreement helps describe uncertainty even though it cannot deliver a single unquestionable count.', distractorRationales: ['Neither method is granted complete authority.', 'The researcher explicitly says calls do not map neatly to individuals.'] },
      { subdomain: 'speaker-intent', prompt: 'Why does the researcher support habitat restoration now?', options: ['The model proves the bird population has recovered', 'Managers have already removed every source of detection bias', 'The action is warranted across the credible range of population estimates'], correctIndex: 2, rationale: 'Habitat deterioration is established and restoration remains justified under all plausible estimates, even while the trend claim stays provisional.', distractorRationales: ['Recovery is explicitly not yet established.', 'Detection biases remain central to the uncertainty.'] },
    ],
  },
  {
    level: 'C2',
    delivery: 'Media ethics seminar; the lecturer should convey that the two criticised positions are mirror images, not simple opposites.',
    turns: [{
      speaker: 'narrator',
      text: 'Debates about anonymous sources often polarise around trust. One camp treats anonymity as contamination: if readers cannot inspect the speaker’s identity, the claim is presumed weak. The other treats anonymity as a seal of authenticity, as though personal risk guarantees truth. Both positions confuse information about a source’s situation with verification of what the source says. A whistle-blower may have excellent access and powerful incentives to disclose, while also selecting facts to damage a rival. An official spokesperson may be named and still strategically incomplete. The relevant editorial question is not whether anonymity is virtuous, but what additional work it requires. Can documents corroborate the account? Does the source distinguish observation from hearsay? Is the promised protection broader than necessary? Editors must also consider how anonymity is described. Phrases such as “a source close to the decision” can manufacture an aura of authority while concealing how indirect the knowledge is. Yet excessive explanation may expose the person by narrowing the field. Responsible publication therefore involves a double disclosure: enough about proximity and motive for readers to judge the claim, and enough restraint to honour a defensible promise of safety. This balance cannot be reduced to a universal formula. Precisely because readers cannot perform the usual identity checks, the newsroom must make its verification process more visible—not its source more identifiable.',
    }],
    questions: [
      { subdomain: 'discourse-tracking', prompt: 'How are the two opening positions related?', options: ['Both mistake anonymity itself for evidence about truthfulness', 'Both demand that every confidential source be publicly identified', 'Both privilege official spokespeople over documentary evidence'], correctIndex: 0, rationale: 'One treats anonymity as automatic weakness and the other as automatic authenticity; both bypass verification of the actual claim.', distractorRationales: ['Only the first position tends toward rejecting anonymity, and even it is described as presumption rather than a disclosure rule.', 'Official spokespeople are used to show that named status does not guarantee completeness.'] },
      { subdomain: 'main-idea', prompt: 'What standard does the lecturer advocate?', options: ['Describe anonymous sources so precisely that readers can identify them', 'Pair source protection with stronger corroboration and transparent verification', 'Publish anonymous allegations only when the source has no personal motive'], correctIndex: 1, rationale: 'The lecturer calls for corroboration, careful description of access and motive, and visibility of the newsroom’s process without exposing identity.', distractorRationales: ['Overly precise description may breach the protection being promised.', 'Mixed motives are expected and must be evaluated rather than treated as an absolute bar.'] },
    ],
  },
];

const envelopes: Record<AdvancedLevel, {
  targetDurationSeconds: readonly [number, number];
  paceWordsPerMinute: readonly [number, number];
}> = {
  C1: { targetDurationSeconds: [76, 112], paceWordsPerMinute: [145, 165] },
  C2: { targetDurationSeconds: [86, 128], paceWordsPerMinute: [150, 175] },
};

export const ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_BRIEFS: readonly DiagnosticListeningProductionBrief[] = sources.map((source, index) => {
  const order = sources.slice(0, index).filter(candidate => candidate.level === source.level).length + 1;
  const id = `en-${source.level.toLowerCase()}-listening-original-${String(order).padStart(2, '0')}`;
  return {
    id,
    level: source.level,
    productionVersion: ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_VERSION,
    exposure: 'reserved',
    status: 'production-brief',
    benchmark: {
      source: 'aggregate-legacy-duration-profile',
      note: 'Recovered WeLearn audio informed only the aggregate delivery benchmark; the script, construct and questions are newly authored and reserved.',
    },
    recording: {
      ...envelopes[source.level],
      delivery: source.delivery,
      turns: source.turns,
    },
    questions: source.questions,
    audioArtifact: {
      mediaId: id,
      privateObjectPath: `en/reserved/${ENGLISH_DIAGNOSTIC_LISTENING_ADVANCED_PRODUCTION_VERSION}/${id}.mp3`,
      status: 'not-recorded',
      sha256: null,
      durationSeconds: null,
      transcriptReview: 'pending',
      alignmentReview: 'pending',
    },
  };
});
