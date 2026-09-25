import type { CefrLevel } from '../../../lib/diagnostic/types.ts';
import type {
  DiagnosticListeningProductionBrief,
  ListeningSubdomain,
} from './listening-production-lower.en.ts';

export const ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_VERSION = 'en-listening-original-mid-production-1';

type MidLevel = Extract<CefrLevel, 'B1' | 'B2'>;

interface MidQuestion {
  subdomain: ListeningSubdomain;
  prompt: string;
  options: readonly [string, string, string];
  correctIndex: 0 | 1 | 2;
  rationale: string;
  distractorRationales: readonly [string, string];
}

interface MidBriefSource {
  level: MidLevel;
  delivery: string;
  turns: DiagnosticListeningProductionBrief['recording']['turns'];
  questions: readonly [MidQuestion, MidQuestion];
}

const sources: readonly MidBriefSource[] = [
  {
    level: 'B1',
    delivery: 'Local radio presenter, conversational but clear; contrast the road closure with the unchanged market hours.',
    turns: [{
      speaker: 'narrator',
      text: 'This weekend, the town market will stay open despite repairs on Bridge Street. Drivers cannot enter the street from Friday evening until Monday morning, but pedestrians can still use it. Stallholders will unload behind the library before eight, so shoppers may notice more vans there than usual. The market itself opens at nine on Saturday, as normal, and closes at three. Visitors are advised to use the North Road car park, which is offering free parking for the first two hours. The smaller car park beside the town hall will be reserved for residents. Organisers originally planned live music in the square, but the musicians will now perform inside the old cinema because rain is expected. All food stalls will remain outdoors under covered tents.',
    }],
    questions: [
      { subdomain: 'main-idea', prompt: 'What is the announcement mainly explaining?', options: ['How the weekend market will operate during disruption', 'Why the town market is closing permanently', 'Where stallholders can apply for new licences'], correctIndex: 0, rationale: 'The announcement explains access, parking and venue changes while confirming that the market will still open.', distractorRationales: ['The market remains open and no permanent closure is mentioned.', 'Licensing is not discussed; the library is only an unloading location.'] },
      { subdomain: 'detail', prompt: 'Where will the musicians perform?', options: ['Under the outdoor food tents', 'Inside the old cinema', 'Behind the library'], correctIndex: 1, rationale: 'Expected rain has moved the live music from the square into the old cinema.', distractorRationales: ['The covered tents are for food stalls.', 'The area behind the library is for early unloading.'] },
    ],
  },
  {
    level: 'B1',
    delivery: 'Two colleagues speaking at a natural pace; make the change of responsibility clear without exaggerated emphasis.',
    turns: [
      { speaker: 'speaker-a', text: 'Have you finished the slides for Thursday’s client meeting?' },
      { speaker: 'speaker-b', text: 'Almost. I was waiting for Priya’s sales figures, but she sent them this morning. I can add them after lunch.' },
      { speaker: 'speaker-a', text: 'Good. Martin was going to present the opening section, but his train has been cancelled. He may not arrive until eleven.' },
      { speaker: 'speaker-b', text: 'The meeting starts at ten thirty. I could introduce the project, and Martin can answer questions when he arrives.' },
      { speaker: 'speaker-a', text: 'That works. I’ll call the client to say the agenda is unchanged, although the speakers may be different. Could you also print six copies?' },
      { speaker: 'speaker-b', text: 'Yes. I’ll bring the slides and the handouts to room four before ten.' },
    ],
    questions: [
      { subdomain: 'inference', prompt: 'Why might the second speaker give the introduction?', options: ['The client requested a shorter agenda', 'The sales figures are still unavailable', 'The original presenter may arrive late'], correctIndex: 2, rationale: 'Martin was due to open the meeting but his cancelled train may make him late, so the colleague offers to introduce the project.', distractorRationales: ['The agenda remains unchanged.', 'Priya has already sent the sales figures.'] },
      { subdomain: 'speaker-intent', prompt: 'Why will the first speaker call the client?', options: ['To warn them that the presenters may change', 'To ask them to print the handouts', 'To move the meeting to another room'], correctIndex: 0, rationale: 'The call is intended to explain that different people may present even though the agenda stays the same.', distractorRationales: ['The second speaker agrees to print the copies.', 'Room four is confirmed; no room change is proposed.'] },
    ],
  },
  {
    level: 'B1',
    delivery: 'Museum audio-guide voice with clear chronological signposting and a reflective final sentence.',
    turns: [{
      speaker: 'narrator',
      text: 'When this railway station opened in 1892, it connected the farming villages north of the city with its central markets. The building had a ticket office, a waiting room and a small café, but no electricity. Gas lamps lit the platforms until the 1920s. Passenger numbers grew for several decades, then fell as families began buying cars. Regular services ended in 1968, and the building stood empty for nearly fifteen years. A local group prevented its demolition and gradually repaired the roof and windows. Today, trains no longer stop here, but the former waiting room hosts exhibitions about transport and village life. Look at the marks on the wooden floor: they were left by passengers’ luggage, not added during restoration. They remind us that an ordinary journey could once begin in this quiet room.',
    }],
    questions: [
      { subdomain: 'discourse-tracking', prompt: 'What happened after regular train services ended?', options: ['The station immediately became a museum', 'The building remained unused for many years', 'Families returned to travelling by train'], correctIndex: 1, rationale: 'The guide says the building stood empty for nearly fifteen years after services ended.', distractorRationales: ['Restoration happened only after a long empty period.', 'Growing car ownership is linked to declining rail use, not a return to trains.'] },
      { subdomain: 'speaker-intent', prompt: 'Why does the guide mention the marks on the floor?', options: ['To show that the restoration was poorly completed', 'To recommend replacing the old wooden boards', 'To connect present visitors with former passengers'], correctIndex: 2, rationale: 'The original luggage marks are used as tangible evidence of the everyday journeys that began there.', distractorRationales: ['The guide explicitly says the marks were not added during restoration.', 'The marks are valued as historical evidence, not presented as damage to remove.'] },
    ],
  },
  {
    level: 'B1',
    delivery: 'Friendly voicemail from a course coordinator; distinguish the optional workshop from the required online form.',
    turns: [{
      speaker: 'narrator',
      text: 'Hello, this message is for everyone joining next month’s photography course. We have received your deposits, so your places are confirmed. Before the first class, please complete the online form about the camera you use and the kind of photographs you enjoy taking. The form must be submitted by the eighteenth; it replaces the paper questionnaire mentioned in your welcome email. On the Saturday before the course begins, we are offering a free one-hour workshop on storing and sharing digital pictures. It is useful for beginners, but attendance is optional and it will not cover camera controls. If you would like to attend, book through the same website. The first regular class still begins on Tuesday the twenty-fifth at seven, in Studio B rather than the main lecture room.',
    }],
    questions: [
      { subdomain: 'detail', prompt: 'What must participants do by the eighteenth?', options: ['Complete an online questionnaire', 'Pay the remaining course fee', 'Attend the digital-picture workshop'], correctIndex: 0, rationale: 'All participants must submit the online form by the eighteenth.', distractorRationales: ['Only the deposits are mentioned, and they have already been received.', 'The Saturday workshop is explicitly optional.'] },
      { subdomain: 'inference', prompt: 'Which participant would benefit most from the Saturday workshop?', options: ['Someone wanting advanced camera-control practice', 'A beginner unsure how to manage digital photos', 'Someone unable to attend the Tuesday classes'], correctIndex: 1, rationale: 'The optional workshop is described as useful for beginners and focuses on storing and sharing digital pictures.', distractorRationales: ['Camera controls will not be covered.', 'The workshop does not replace the regular Tuesday course.'] },
    ],
  },
  {
    level: 'B1',
    delivery: 'Two friends discussing alternatives; natural hesitation when weighing cost against convenience.',
    turns: [
      { speaker: 'speaker-a', text: 'I checked trains for our hiking trip. The direct one leaves at six forty, which means catching the first bus to the station.' },
      { speaker: 'speaker-b', text: 'That’s early. Is there a later train?' },
      { speaker: 'speaker-a', text: 'At eight ten, but we would change trains and reach the village after midday. The visitor centre closes at one, and we need to collect the cabin key there.' },
      { speaker: 'speaker-b', text: 'Could we drive? I can borrow my sister’s car.' },
      { speaker: 'speaker-a', text: 'Possibly, though the mountain road is being repaired and the website warns of long delays. The direct train costs more, but we would arrive by nine thirty and have time for the shorter walking route before check-in.' },
      { speaker: 'speaker-b', text: 'Let’s choose that one. I’d rather lose some sleep than spend the morning worrying about the key.' },
    ],
    questions: [
      { subdomain: 'inference', prompt: 'Why is the later train unsuitable?', options: ['It does not stop near the hiking route', 'It costs more than borrowing a car', 'It may arrive too late to collect the key'], correctIndex: 2, rationale: 'The later connection arrives after midday while the visitor centre holding the key closes at one.', distractorRationales: ['Both train options concern the same destination village.', 'The higher price is associated with the direct train, not the later one.'] },
      { subdomain: 'speaker-intent', prompt: 'What does the second speaker mean by preferring to “lose some sleep”?', options: ['They agree to take the early direct train', 'They want to sleep in the borrowed car', 'They plan to stay another night in the cabin'], correctIndex: 0, rationale: 'The phrase signals acceptance of the early departure in exchange for a reliable arrival before the centre closes.', distractorRationales: ['Driving is rejected because road repairs may cause delays.', 'No extra night is discussed.'] },
    ],
  },
  {
    level: 'B1',
    delivery: 'Public-information podcast voice; keep quantities and exceptions distinct without sounding like a list.',
    turns: [{
      speaker: 'narrator',
      text: 'The city’s new food-waste collection begins next Wednesday. Every household should already have received a small kitchen container and a larger outdoor bin. Fruit and vegetable remains, cooked food, tea bags and coffee grounds can all go inside. Please do not include any packaging, even if it is marked biodegradable, because the treatment centre uses a process that cannot accept it. Collection is weekly, on the same day as your normal rubbish but usually two hours earlier. Flats above shops are the exception: residents should take their sealed bags to the shared brown bins at the end of each street. During the first month, collection crews will leave an information card if they find the wrong material. After that, contaminated bins may be left uncollected. Extra bags and replacement kitchen containers are available free from local libraries.',
    }],
    questions: [
      { subdomain: 'detail', prompt: 'What should people keep out of the food-waste bin?', options: ['Tea bags and coffee grounds', 'All forms of packaging', 'Food that has already been cooked'], correctIndex: 1, rationale: 'The announcement excludes packaging, including packaging labelled biodegradable.', distractorRationales: ['Tea bags and coffee grounds are accepted.', 'Cooked food is explicitly accepted.'] },
      { subdomain: 'discourse-tracking', prompt: 'What may happen after the first month when a bin contains the wrong material?', options: ['The household must buy a new outdoor bin', 'The library will collect it separately', 'The collection crew may leave it behind'], correctIndex: 2, rationale: 'Information cards are used during the first month; afterwards contaminated bins may not be collected.', distractorRationales: ['Replacement kitchen containers are free and unrelated to contamination.', 'Libraries distribute supplies but do not collect waste.'] },
    ],
  },
  {
    level: 'B2',
    delivery: 'Measured interview excerpt with two distinct adult voices; allow the researcher to qualify claims rather than sound promotional.',
    turns: [
      { speaker: 'speaker-a', text: 'Your study asked office workers to spend part of each day without email. Did productivity improve?' },
      { speaker: 'speaker-b', text: 'Not in a simple, uniform way. We divided volunteers into two groups. One checked email whenever they wished; the other had two scheduled periods for it. The second group completed more uninterrupted work, but some people then spent longer sorting messages during those periods. They also worried that colleagues expected immediate replies.' },
      { speaker: 'speaker-a', text: 'So scheduled email was not the solution?' },
      { speaker: 'speaker-b', text: 'It helped when whole teams agreed on response times. When only one employee changed their habits, the benefits were smaller and anxiety sometimes increased. Our strongest result was not about the number of checks; it was that shared expectations mattered. We are now testing whether a visible status message can provide the same protection without fixed schedules.' },
      { speaker: 'speaker-a', text: 'What should managers do meanwhile?' },
      { speaker: 'speaker-b', text: 'Treat this as an experiment, not a universal rule. Measure the type of work being done and ask employees how the change affects coordination as well as concentration.' },
    ],
    questions: [
      { subdomain: 'main-idea', prompt: 'What does the researcher identify as the study’s most important finding?', options: ['Team-wide expectations matter more than a single email rule', 'Employees should answer every message immediately', 'Fixed email periods always reduce the time spent on messages'], correctIndex: 0, rationale: 'The researcher explicitly calls shared expectations the strongest result and rejects a universal scheduling rule.', distractorRationales: ['Immediate replies created pressure rather than serving as a recommendation.', 'Some participants spent longer sorting messages, so the effect was not uniform.'] },
      { subdomain: 'inference', prompt: 'Why does the researcher call the change an “experiment”?', options: ['The original study did not include office workers', 'Its effects depend on work and coordination conditions', 'Managers are legally required to collect new data'], correctIndex: 1, rationale: 'The advice is conditional because concentration and coordination gains varied with team practices and work type.', distractorRationales: ['Office workers were the study population.', 'No legal requirement is mentioned.'] },
    ],
  },
  {
    level: 'B2',
    delivery: 'Natural planning meeting among two colleagues; keep corrections and concessions audible but understated.',
    turns: [
      { speaker: 'speaker-a', text: 'The neighbourhood survey closes Friday. We have plenty of responses from homeowners, but hardly any from renters under thirty.' },
      { speaker: 'speaker-b', text: 'We posted the link in the community newsletter.' },
      { speaker: 'speaker-a', text: 'That reaches people already involved in local groups. What about a short session at the technical college?' },
      { speaker: 'speaker-b', text: 'Their term ended yesterday. The sports centre is still busy in the evenings, though. We could ask visitors to scan a code while they wait at reception.' },
      { speaker: 'speaker-a', text: 'Good idea, but the full survey takes twelve minutes. People may open it and abandon it.' },
      { speaker: 'speaker-b', text: 'Then we should not pretend a shorter survey is equivalent. We could invite them to complete the full version later and collect only their contact details at the centre.' },
      { speaker: 'speaker-a', text: 'Only if they actively agree to a follow-up. Let’s prepare a separate consent screen and ask the centre manager whether staff can mention it without pressuring anyone.' },
      { speaker: 'speaker-b', text: 'I’ll draft both messages. If approval takes too long, we will report the gap rather than filling it with rushed responses.' },
    ],
    questions: [
      { subdomain: 'speaker-intent', prompt: 'Why does the second speaker reject a shorter survey?', options: ['The sports centre has no internet access', 'It would take longer to receive approval', 'Its responses would not be directly comparable'], correctIndex: 2, rationale: 'The speaker says a shortened survey should not be treated as equivalent to the full instrument.', distractorRationales: ['Visitors are expected to scan a code, so internet access is not the concern.', 'Approval is discussed for consent and staff involvement, not survey length.'] },
      { subdomain: 'inference', prompt: 'What principle guides their final decision?', options: ['Acknowledge missing representation instead of lowering data quality', 'Replace homeowner responses with younger renters', 'Require sports-centre visitors to participate immediately'], correctIndex: 0, rationale: 'They prefer reporting the sampling gap to collecting hurried or non-consensual responses that weaken comparability.', distractorRationales: ['They do not propose deleting existing responses.', 'Participation and follow-up must be voluntary.'] },
    ],
  },
  {
    level: 'B2',
    delivery: 'Documentary narration with controlled pace; distinguish historical fact, later interpretation and current uncertainty.',
    turns: [{
      speaker: 'narrator',
      text: 'For more than a century, maps showed a straight stone wall crossing this hillside. Local tradition called it the King’s Road and claimed that soldiers had built it. Yet when archaeologists opened several small trenches, they found no road surface and very few objects that could be dated. The stones were real, but most had been placed in the nineteenth century to mark the boundary between two farms. That discovery seemed to end the story. Then aerial photographs taken during a dry summer revealed a faint parallel line beneath the fields, about forty metres away. Soil samples from that line contain material from a much earlier period, although researchers still cannot say whether it was a road, a drainage channel or something else. The old name may therefore preserve a memory of an ancient route while attaching it to the wrong physical feature. The case is a useful warning: local stories can direct attention to a landscape, but they cannot substitute for evidence, and evidence itself may support several explanations.',
    }],
    questions: [
      { subdomain: 'discourse-tracking', prompt: 'How did the archaeologists’ interpretation change?', options: ['They proved that soldiers built the visible wall', 'They rejected the entire area as historically unimportant', 'They shifted attention from the visible wall to a nearby buried feature'], correctIndex: 2, rationale: 'The visible stones proved relatively recent, while aerial images and soil evidence redirected investigation to a parallel buried line.', distractorRationales: ['No military construction was demonstrated.', 'The newly detected feature kept the area archaeologically relevant.'] },
      { subdomain: 'main-idea', prompt: 'What broader point does the narrator make?', options: ['Traditional accounts are useful clues but require critical evidence', 'Aerial photography can identify every type of ancient structure', 'Farm boundaries are normally built over military roads'], correctIndex: 0, rationale: 'The conclusion balances the value of local stories as clues with the need to test and qualify them using evidence.', distractorRationales: ['The buried feature remains unidentified despite aerial evidence.', 'The account describes one boundary and does not establish a general pattern.'] },
    ],
  },
  {
    level: 'B2',
    delivery: 'Consumer-affairs programme with a calm presenter and a cautious expert; avoid sounding like personalised legal advice.',
    turns: [
      { speaker: 'speaker-a', text: 'More people are renting electronic devices instead of buying them. The monthly price looks attractive, but what should customers examine?' },
      { speaker: 'speaker-b', text: 'First, calculate the total over the minimum contract period. A low monthly fee may exceed the retail price after two years. That does not automatically make the rental poor value: repairs, insurance or upgrades may be included. The problem is assuming that every plan includes the same protection.' },
      { speaker: 'speaker-a', text: 'What about returning a damaged device?' },
      { speaker: 'speaker-b', text: 'Contracts often distinguish ordinary wear from chargeable damage, but those terms can be vague. Photograph the device when it arrives and report faults promptly. Also check who pays postage and whether an early return ends the payment obligation. Some plans accept the device back but still require the remaining fees.' },
      { speaker: 'speaker-a', text: 'Would you advise people to avoid rentals?' },
      { speaker: 'speaker-b', text: 'No. They can suit people who value predictable service or temporary access. I would advise comparing the whole package with ownership, not comparing a monthly figure with a shop price.' },
    ],
    questions: [
      { subdomain: 'detail', prompt: 'Why does the expert recommend photographing a device when it arrives?', options: ['To advertise it before the contract ends', 'To document its initial condition', 'To qualify automatically for an upgrade'], correctIndex: 1, rationale: 'A photograph provides evidence of the device’s condition before later disputes about damage or wear.', distractorRationales: ['Resale or advertising is not discussed.', 'Upgrade eligibility is not linked to photographs.'] },
      { subdomain: 'speaker-intent', prompt: 'What comparison does the expert want consumers to make?', options: ['Insurance from two different rental companies', 'The device’s current price and its future resale value', 'The total benefits and costs of renting versus owning'], correctIndex: 2, rationale: 'The expert urges listeners to compare the complete rental package and total obligation with ownership.', distractorRationales: ['Insurance is only one possible included service.', 'Future resale value is not the proposed basis for comparison.'] },
    ],
  },
  {
    level: 'B2',
    delivery: 'University podcast excerpt; the student sounds thoughtful and the tutor probes assumptions without becoming confrontational.',
    turns: [
      { speaker: 'speaker-a', text: 'Your proposal says the exhibition will recreate a 1950s living room. What do you want visitors to learn?' },
      { speaker: 'speaker-b', text: 'That domestic technology changed everyday routines. We would display a radio, sewing machine and early washing machine, with recordings of people who used them.' },
      { speaker: 'speaker-a', text: 'Whose memories do you have?' },
      { speaker: 'speaker-b', text: 'Mostly families who could afford those objects. That may give the impression that the equipment became common immediately.' },
      { speaker: 'speaker-a', text: 'Exactly. A reconstructed room can feel authoritative even when it represents a narrow experience.' },
      { speaker: 'speaker-b', text: 'We could make the limitation visible. Perhaps place the purchase price beside average weekly wages and include an empty space for an appliance many households did not own.' },
      { speaker: 'speaker-a', text: 'The empty space is interesting if visitors understand it. Test the idea before building the room. Also seek accounts from repair workers or people who shared equipment; they may reveal forms of access that ownership figures miss.' },
      { speaker: 'speaker-b', text: 'So the room becomes an argument we invite visitors to question, rather than a claim that everyone lived that way.' },
    ],
    questions: [
      { subdomain: 'inference', prompt: 'What weakness does the student recognise in the original plan?', options: ['The available memories overrepresent wealthier households', 'The recordings focus too much on repair workers', 'Visitors are already familiar with every appliance'], correctIndex: 0, rationale: 'The student notes that most contributors could afford the objects, which could falsely make ownership seem immediately widespread.', distractorRationales: ['Repair workers are suggested as a missing perspective.', 'No claim is made that visitors already know all the objects.'] },
      { subdomain: 'speaker-intent', prompt: 'Why does the tutor suggest testing the empty-space idea?', options: ['To discover whether the room is large enough', 'To check whether visitors understand what absence represents', 'To decide which appliance has the highest resale price'], correctIndex: 1, rationale: 'The visual device only works if visitors interpret the absence as evidence of unequal access.', distractorRationales: ['Physical room capacity is not the stated concern.', 'Purchase price is contextual evidence, not a resale decision.'] },
    ],
  },
  {
    level: 'B2',
    delivery: 'Policy briefing delivered clearly but without rhetorical emphasis; signal contrast through phrasing and pauses.',
    turns: [{
      speaker: 'narrator',
      text: 'When the city introduced protected cycle lanes on two central roads, early reports focused on the number of cyclists using them. Counts rose by nearly forty per cent in six months, but that figure alone did not show whether former drivers had changed transport or whether existing cyclists had simply changed routes. A follow-up survey suggests both occurred, though unevenly. Commuters living within five kilometres of the centre were most likely to replace car journeys. Those travelling farther often combined cycling with trains, but limited bicycle space on peak services remained a barrier. Shop owners initially reported fewer customers arriving by car and feared a decline in sales. Card-payment data later indicated that total spending was stable, while visits became slightly more frequent and smaller in value. These findings do not settle every dispute: two roads cannot represent the whole city, winter behaviour may differ, and businesses vary. They do, however, show why evaluating a transport scheme requires more than traffic counts taken immediately after construction.',
    }],
    questions: [
      { subdomain: 'inference', prompt: 'Why were the first cyclist counts insufficient?', options: ['They included only people travelling in winter', 'They could not show the reason for changed route use', 'They excluded cyclists living near the centre'], correctIndex: 1, rationale: 'Higher counts could reflect mode change or redistribution of existing cyclists, so the cause could not be inferred from counts alone.', distractorRationales: ['Winter is raised as a future limitation, not a feature of the early counts.', 'Nearby commuters are included in the later survey findings.'] },
      { subdomain: 'main-idea', prompt: 'What is the briefing’s central conclusion?', options: ['Protected lanes always increase retail spending', 'Train capacity is the only barrier to cycling', 'Transport changes need multiple measures and cautious interpretation'], correctIndex: 2, rationale: 'The speaker combines counts, surveys and spending data while stressing limits in scope, season and business variation.', distractorRationales: ['Spending was stable, not universally increased.', 'Train bicycle space is one barrier among several findings.'] },
    ],
  },
];

const envelopes: Record<MidLevel, {
  targetDurationSeconds: readonly [number, number];
  paceWordsPerMinute: readonly [number, number];
}> = {
  B1: { targetDurationSeconds: [48, 68], paceWordsPerMinute: [125, 145] },
  B2: { targetDurationSeconds: [65, 92], paceWordsPerMinute: [140, 160] },
};

export const ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_BRIEFS: readonly DiagnosticListeningProductionBrief[] = sources.map((source, index) => {
  const order = sources.slice(0, index).filter(candidate => candidate.level === source.level).length + 1;
  const id = `en-${source.level.toLowerCase()}-listening-original-${String(order).padStart(2, '0')}`;
  return {
    id,
    level: source.level,
    productionVersion: ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_VERSION,
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
      privateObjectPath: `en/reserved/${ENGLISH_DIAGNOSTIC_LISTENING_MID_PRODUCTION_VERSION}/${id}.mp3`,
      status: 'not-recorded',
      sha256: null,
      durationSeconds: null,
      transcriptReview: 'pending',
      alignmentReview: 'pending',
    },
  };
});
