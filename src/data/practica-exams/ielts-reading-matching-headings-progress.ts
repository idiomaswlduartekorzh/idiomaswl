export type MatchingHeadingsErrorCode =
  | 'detail-not-main-idea'
  | 'keyword-match'
  | 'wrong-paragraph-function'
  | 'too-broad'
  | 'unsupported-claim';

export type MatchingHeadingsOption = {
  id: string;
  text: string;
};

export type MatchingHeadingsParagraph = {
  id: string;
  label: string;
  text: string;
  answerHeadingId: string;
  functionLabel: string;
  evidence: string;
  closestDistractorId: string;
  distractorFailure: string;
  errorCode: MatchingHeadingsErrorCode;
};

export type MatchingHeadingsTrainingPassage = {
  id: string;
  title: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceNote: string;
  headings: MatchingHeadingsOption[];
  paragraphs: MatchingHeadingsParagraph[];
};

export type MatchingHeadingsLevel = {
  id: string;
  title: string;
  focus: string;
  instruction: string;
  passageIds: string[];
  questionIds?: string[];
  masteryScore: number;
};

export const MATCHING_HEADINGS_STORAGE_KEY = 'welearn:ielts-reading:matching-headings:v2';
export const MATCHING_HEADINGS_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:matching-headings:v1';

export const MATCHING_HEADINGS_PASSAGES: MatchingHeadingsTrainingPassage[] = [
  {
    id: 'cooling-city-blocks',
    title: 'Cooling a city block',
    sourceTitle: 'US EPA — Heat Island Effect resources',
    sourceUrl: 'https://www.epa.gov/heatislands',
    sourceNote: 'Original WeLearn passage grounded in EPA explanations of heat islands, vegetation and cool roofs.',
    headings: [
      { id: 'i', text: 'Mapping the problem before choosing a response' },
      { id: 'ii', text: 'The physical origins of uneven urban warming' },
      { id: 'iii', text: 'Two cooling services provided by vegetation' },
      { id: 'iv', text: 'A winter cost that makes reflective roofs useless' },
      { id: 'v', text: 'A targeted intervention at the top of a property' },
      { id: 'vi', text: 'A new habitat designed mainly for city wildlife' },
      { id: 'vii', text: 'Using a local combination instead of one universal fix' },
    ],
    paragraphs: [
      {
        id: 'cooling-a', label: 'Paragraph A', answerHeadingId: 'ii', functionLabel: 'Explain a cause',
        text: 'A city does not heat evenly. Dark roofs, roads and other developed surfaces absorb and hold more solar energy than many rural surfaces. Buildings can also slow the release of heat after sunset. The result is a temperature difference both between city and countryside and between neighbourhoods inside the same city.',
        evidence: 'The paragraph explains how built surfaces produce the temperature difference; every sentence develops the cause.',
        closestDistractorId: 'i', distractorFailure: 'Mapping is not discussed yet. The paragraph explains the physical cause, not how officials locate it.', errorCode: 'wrong-paragraph-function',
      },
      {
        id: 'cooling-b', label: 'Paragraph B', answerHeadingId: 'iii', functionLabel: 'Describe two mechanisms',
        text: 'Trees and other vegetation cool streets in two connected ways. Their leaves shade walls and pavements, so those surfaces receive less direct sunlight. Plants also release water through evapotranspiration, a process that uses heat from the surrounding air. The benefit therefore comes from both shade and evaporation, not from greenery as decoration.',
        evidence: 'Shade and evapotranspiration are the two mechanisms repeated across the paragraph.',
        closestDistractorId: 'vi', distractorFailure: 'Wildlife is not mentioned. A heading about habitat would use the topic word “vegetation” but miss the cooling function.', errorCode: 'keyword-match',
      },
      {
        id: 'cooling-c', label: 'Paragraph C', answerHeadingId: 'v', functionLabel: 'Present an alternative',
        text: 'Where planting space is scarce, a building owner can change the roof surface. A cool roof reflects more sunlight and releases absorbed heat more effectively than a conventional roof. This can reduce roof and indoor temperatures without rebuilding the entire property, although the result depends on climate, insulation and roof design.',
        evidence: 'The paragraph centres on a targeted roof-surface change as an alternative to major reconstruction.',
        closestDistractorId: 'iv', distractorFailure: 'The paragraph mentions conditions, but it never says winter costs make the method useless.', errorCode: 'unsupported-claim',
      },
      {
        id: 'cooling-d', label: 'Paragraph D', answerHeadingId: 'i', functionLabel: 'Explain a planning step',
        text: 'Before spending money, planners need to know where heat exposure and missing shade overlap. A canopy survey can show which streets lack trees, while surface and building data reveal where a roof programme may have the greatest effect. A citywide average is less useful than a map that identifies blocks with different needs.',
        evidence: 'Surveying and mapping come before investment and determine where each intervention belongs.',
        closestDistractorId: 'vii', distractorFailure: 'The final policy may use several measures, but this paragraph is specifically about diagnosis before selection.', errorCode: 'too-broad',
      },
      {
        id: 'cooling-e', label: 'Paragraph E', answerHeadingId: 'vii', functionLabel: 'Evaluate and combine',
        text: 'No single measure fits every block. Young trees need water and long-term care; green roofs can cost more to install; reflective roofs work differently across climates and building types. A practical heat plan therefore combines methods according to local space, budget and maintenance capacity, then checks whether the intended neighbourhoods actually benefit.',
        evidence: 'The paragraph compares limitations and concludes that a locally chosen combination is required.',
        closestDistractorId: 'iv', distractorFailure: 'One roof-related limitation is only a detail. The conclusion concerns a portfolio of methods.', errorCode: 'detail-not-main-idea',
      },
    ],
  },
  {
    id: 'mangroves-after-storms',
    title: 'Restoring mangroves after storms',
    sourceTitle: 'NOAA — Mangrove restoration in Puerto Rico',
    sourceUrl: 'https://coast.noaa.gov/states/stories/mangrove-restoration.html',
    sourceNote: 'Original WeLearn passage grounded in NOAA reporting on restoration, coastal protection and community partnerships.',
    headings: [
      { id: 'vi', text: 'A flexible coastal defence created by nature' },
      { id: 'ii', text: 'Repairing water movement before replanting' },
      { id: 'iii', text: 'Ecological repair builds workforce capability' },
      { id: 'iv', text: 'The damage that turned concern into action' },
      { id: 'v', text: 'Why restoration has a wider purpose' },
      { id: 'i', text: 'Why engineered coastal walls always fail' },
      { id: 'vii', text: 'Judging success only by the number of planted trees' },
    ],
    paragraphs: [
      {
        id: 'mangrove-a', label: 'Paragraph A', answerHeadingId: 'iv', functionLabel: 'Give the trigger',
        text: 'Mangrove decline was already a concern in parts of Puerto Rico, but consecutive hurricanes made the risk impossible to ignore. Damaged forests left coastal communities with less natural protection and weakened habitat. The storms did not create every problem; they transformed a gradual loss into an urgent restoration programme.',
        evidence: 'The hurricanes are presented as the event that changed a long-term concern into action.',
        closestDistractorId: 'vi', distractorFailure: 'Protection is the wider reason for restoration, but this paragraph explains what triggered the programme.', errorCode: 'wrong-paragraph-function',
      },
      {
        id: 'mangrove-b', label: 'Paragraph B', answerHeadingId: 'vi', functionLabel: 'Explain a protective mechanism',
        text: 'A healthy mangrove forest does more than occupy the shoreline. Dense roots interrupt moving water and reduce wave energy, while branches and leaves help break the force of wind. The forest is therefore a flexible natural barrier that can lessen erosion, flooding and storm damage for areas behind it.',
        evidence: 'Roots, branches and leaves are explained as parts of one protective barrier.',
        closestDistractorId: 'i', distractorFailure: 'The paragraph explains a natural defence but makes no absolute comparison with engineered walls.', errorCode: 'unsupported-claim',
      },
      {
        id: 'mangrove-c', label: 'Paragraph C', answerHeadingId: 'ii', functionLabel: 'Describe a sequence',
        text: 'Planting seedlings is not always the first useful step. Roads, debris or altered channels may prevent tides from reaching damaged ground in the right pattern. Restoration teams can begin by reopening water routes and improving site conditions. New trees then have a better chance to establish rather than being placed into a system that still cannot support them.',
        evidence: 'The sequence is explicit: restore water flow and site conditions, then plant.',
        closestDistractorId: 'vii', distractorFailure: 'The paragraph questions planting-first logic, but it does not propose tree counts as the measure of success.', errorCode: 'detail-not-main-idea',
      },
      {
        id: 'mangrove-d', label: 'Paragraph D', answerHeadingId: 'iii', functionLabel: 'Add a social co-benefit',
        text: 'The project also depends on people who live near the restoration area. Local labourers and volunteers can clear channels, plant trees and monitor recovery. When young participants receive training and paid experience, environmental work becomes a route into employment as well as a way to rebuild the coast.',
        evidence: 'Every sentence connects restoration tasks with training, work and local participation.',
        closestDistractorId: 'v', distractorFailure: 'This is one benefit beyond protection, but the paragraph focuses specifically on skills and employment.', errorCode: 'too-broad',
      },
      {
        id: 'mangrove-e', label: 'Paragraph E', answerHeadingId: 'v', functionLabel: 'Broaden the evaluation',
        text: 'Storm protection is only one reason to recover a mangrove forest. The habitat can support fish and birds, store coastal carbon and contribute to recreation and tourism. Evaluation should therefore examine ecological and community outcomes over time, rather than treating the shoreline as a single-purpose defence structure.',
        evidence: 'The paragraph lists ecological and community benefits beyond the central storm-protection purpose.',
        closestDistractorId: 'vii', distractorFailure: 'The last sentence rejects single-purpose evaluation, but it does not focus on counting planted trees.', errorCode: 'keyword-match',
      },
    ],
  },
  {
    id: 'sleep-builds-memory',
    title: 'What sleep does to a new memory',
    sourceTitle: 'NIMH — How the Brain Creates New Memories While Maintaining Old Ones',
    sourceUrl: 'https://www.nimh.nih.gov/news/science-updates/2025/how-the-brain-creates-new-memories-while-maintaining-old-ones',
    sourceNote: 'Original WeLearn passage grounded in current NIMH explanations of sleep, memory reactivation and separation between newer and older memories.',
    headings: [
      { id: 'i', text: 'An active process hidden inside a resting body' },
      { id: 'ii', text: 'A single sleep schedule suitable for every learner' },
      { id: 'iii', text: 'Preparing the brain before information arrives' },
      { id: 'iv', text: 'Why lost sleep affects more than recall' },
      { id: 'v', text: 'Strengthening information after it is learned' },
      { id: 'vi', text: 'Replacing study time with longer sleep' },
      { id: 'vii', text: 'How alternating activation prevents interference' },
    ],
    paragraphs: [
      {
        id: 'sleep-a', label: 'Paragraph A', answerHeadingId: 'i', functionLabel: 'Correct a misconception',
        text: 'Sleep looks passive from the outside, yet the sleeping brain remains busy. It cycles through different states and continues to process information gathered while a person was awake. Researchers therefore treat sleep as part of learning itself, not simply as an empty interval between two periods of study.',
        evidence: 'The contrast between outward rest and active internal processing controls the whole paragraph.',
        closestDistractorId: 'vi', distractorFailure: 'The paragraph makes sleep part of learning; it never recommends replacing study with sleep.', errorCode: 'unsupported-claim',
      },
      {
        id: 'sleep-b', label: 'Paragraph B', answerHeadingId: 'iii', functionLabel: 'Explain preparation',
        text: 'Sleep before a lesson matters because an exhausted brain is less ready to encode new material. Adequate rest supports attention and the first formation of memories. In this sense, preparation for tomorrow’s learning begins the previous night, before the learner opens a book or enters a classroom.',
        evidence: 'The paragraph is about readiness before learning, not what happens to a memory afterward.',
        closestDistractorId: 'v', distractorFailure: 'Strengthening after learning is a related process, but the time relationship here is explicitly before the lesson.', errorCode: 'wrong-paragraph-function',
      },
      {
        id: 'sleep-c', label: 'Paragraph C', answerHeadingId: 'v', functionLabel: 'Explain consolidation',
        text: 'Sleep after learning has a different job. Newly formed memories are reactivated and stabilised, making them less likely to disappear. New information may also become linked with older knowledge. The learner is not adding more notes during the night; the brain is reorganising what has already been encountered.',
        evidence: 'Reactivation, stabilisation and linking all describe the strengthening of existing new information.',
        closestDistractorId: 'iii', distractorFailure: 'This paragraph concerns a memory after it exists, not the brain’s readiness to receive it.', errorCode: 'keyword-match',
      },
      {
        id: 'sleep-d', label: 'Paragraph D', answerHeadingId: 'vii', functionLabel: 'Describe a research explanation',
        text: 'A further puzzle is how the brain protects old memories while adding new ones. Research suggests that different patterns within sleep may reactivate newer and older information at separate moments. This separation could reduce interference, preventing yesterday’s learning from being overwritten by today’s experience.',
        evidence: 'The paragraph centres on avoiding interference between old and new memories.',
        closestDistractorId: 'i', distractorFailure: 'Brain activity during sleep is the general topic, but the specific paragraph function is explaining memory separation.', errorCode: 'too-broad',
      },
      {
        id: 'sleep-e', label: 'Paragraph E', answerHeadingId: 'iv', functionLabel: 'Broaden the consequence',
        text: 'Insufficient sleep can weaken attention, judgement and the ability to process information as well as later recall. That does not produce one perfect bedtime for every person, nor does it turn sleep into a substitute for practice. It does show why a learning plan that ignores rest is incomplete.',
        evidence: 'The paragraph broadens the cost from memory to attention, judgement and processing.',
        closestDistractorId: 'ii', distractorFailure: 'The paragraph explicitly rejects one universal schedule.', errorCode: 'unsupported-claim',
      },
    ],
  },
  {
    id: 'citizens-do-science',
    title: 'When the public joins a research team',
    sourceTitle: 'NASA Science — Citizen Science Projects',
    sourceUrl: 'https://science.nasa.gov/citizen-science/',
    sourceNote: 'Original WeLearn passage grounded in NASA descriptions of volunteer projects, tools, collaboration and publications.',
    headings: [
      { id: 'i', text: 'Making mass contributions comparable' },
      { id: 'ii', text: 'Scale through distributed public participation' },
      { id: 'iii', text: 'Why volunteers must already be professional scientists' },
      { id: 'iv', text: 'Different tools for different kinds of participation' },
      { id: 'v', text: 'Results for both research and participants' },
      { id: 'vi', text: 'A competition between people and algorithms' },
      { id: 'vii', text: 'A partnership between manual insight and software' },
    ],
    paragraphs: [
      {
        id: 'citizen-a', label: 'Paragraph A', answerHeadingId: 'ii', functionLabel: 'Define the contribution',
        text: 'Some research questions require more observations than one small team can collect or inspect. Citizen-science projects divide that work among many volunteers. A single report may be modest, but thousands of reports can reveal patterns across a wide area or help researchers examine an enormous image archive.',
        evidence: 'The main contrast is between one small contribution and the research capacity created by many contributions.',
        closestDistractorId: 'v', distractorFailure: 'Participant benefits are not discussed; the paragraph defines how distributed work expands capacity.', errorCode: 'wrong-paragraph-function',
      },
      {
        id: 'citizen-b', label: 'Paragraph B', answerHeadingId: 'iv', functionLabel: 'Show variation',
        text: 'Participation does not always require a laboratory. One project may ask people to classify galaxy images on a laptop, while another uses a phone to report rain or snow. Some tasks need a telescope or specialist knowledge, but many are designed for beginners using devices they already own.',
        evidence: 'The paragraph compares tools and entry requirements across several forms of participation.',
        closestDistractorId: 'iii', distractorFailure: 'The paragraph says the opposite: many tasks are designed for beginners.', errorCode: 'unsupported-claim',
      },
      {
        id: 'citizen-c', label: 'Paragraph C', answerHeadingId: 'i', functionLabel: 'Explain quality control',
        text: 'A large volunteer group is useful only if observations can be compared. Projects therefore provide instructions, examples and fixed reporting categories. Researchers may repeat checks, compare several classifications or flag unusual entries for review. The shared method reduces variation without pretending that every observation will be perfect.',
        evidence: 'Training, fixed categories and repeat checks all serve one purpose: comparable, reliable data.',
        closestDistractorId: 'ii', distractorFailure: 'Scale is already established; this paragraph explains how quality is protected within that scale.', errorCode: 'too-broad',
      },
      {
        id: 'citizen-d', label: 'Paragraph D', answerHeadingId: 'vii', functionLabel: 'Explain a partnership',
        text: 'Computers can scan large datasets quickly, but they do not always recognise an unexpected shape or subtle visual pattern. Volunteers can verify an algorithm’s suggestions or label examples that improve later automated searches. In that arrangement, human judgement and computation perform different parts of the same investigation.',
        evidence: 'The final sentence explicitly defines complementary roles for people and algorithms.',
        closestDistractorId: 'vi', distractorFailure: 'There is no competition or winner; the paragraph describes collaboration.', errorCode: 'keyword-match',
      },
      {
        id: 'citizen-e', label: 'Paragraph E', answerHeadingId: 'v', functionLabel: 'Evaluate wider outcomes',
        text: 'The clearest outcome is useful evidence for science, and volunteers have even become co-authors of research publications. Participation can also build observation skills and a closer understanding of how scientific claims are tested. These benefits do not remove the need for project design and expert review, but they broaden who can contribute to discovery.',
        evidence: 'The paragraph balances research outputs with learning and participation outcomes.',
        closestDistractorId: 'ii', distractorFailure: 'Collective capacity is one part of the programme, but the paragraph evaluates multiple results.', errorCode: 'too-broad',
      },
    ],
  },
  {
    id: 'keeping-seeds-useful',
    title: 'Keeping a seed collection useful',
    sourceTitle: 'USDA ARS — Plant Genetic Resources',
    sourceUrl: 'https://www.ars.usda.gov/crop-production-and-protection/plant-genetic-resources-genomics-and-genetic-improvement/',
    sourceNote: 'Original WeLearn passage grounded in the USDA mission to safeguard and use plant genetic resources and associated information.',
    headings: [
      { id: 'i', text: 'Why documentation matters' },
      { id: 'ii', text: 'Why every seed should be frozen in the same way' },
      { id: 'iii', text: 'Restoring a weakened sample' },
      { id: 'iv', text: 'Protecting diversity as a resource for the future' },
      { id: 'v', text: 'Replacing traditional crops with one modern variety' },
      { id: 'vi', text: 'Preservation needs continuing supervision' },
      { id: 'vii', text: 'Why safeguarding is incomplete without distribution' },
    ],
    paragraphs: [
      {
        id: 'seed-a', label: 'Paragraph A', answerHeadingId: 'iv', functionLabel: 'State the purpose',
        text: 'A seed collection protects options that agriculture may need later. A variety that is uncommon today could contain a useful response to drought, disease or a changing climate. Preserving genetic diversity is therefore not nostalgia; it is a way to keep biological choices available for future research and crop improvement.',
        evidence: 'The whole paragraph explains why diversity is preserved for future use.',
        closestDistractorId: 'v', distractorFailure: 'The collection preserves alternatives rather than replacing them with one variety.', errorCode: 'unsupported-claim',
      },
      {
        id: 'seed-b', label: 'Paragraph B', answerHeadingId: 'i', functionLabel: 'Explain documentation',
        text: 'The seed alone is not enough. A useful record identifies what the sample is, where it came from and which characteristics have been observed. Without reliable information, two packets may be confused or a valuable trait may remain invisible. Data turns stored material into a resource that another researcher can understand.',
        evidence: 'Every sentence explains why identity, origin and trait records matter.',
        closestDistractorId: 'vii', distractorFailure: 'Use is the eventual goal, but this paragraph focuses on the documentation that makes use possible.', errorCode: 'too-broad',
      },
      {
        id: 'seed-c', label: 'Paragraph C', answerHeadingId: 'vi', functionLabel: 'Correct a storage misconception',
        text: 'Storage is not a one-time act of placing packets in a cold room. Staff control moisture and temperature, inspect containers and test samples at planned intervals. Different species may also require different conditions. Long-term preservation depends on continued monitoring, not on assuming that cold storage has stopped every form of change.',
        evidence: 'The repeated contrast is between passive storage and active monitoring.',
        closestDistractorId: 'ii', distractorFailure: 'The paragraph explicitly says species may require different conditions.', errorCode: 'unsupported-claim',
      },
      {
        id: 'seed-d', label: 'Paragraph D', answerHeadingId: 'iii', functionLabel: 'Describe a maintenance response',
        text: 'Tests sometimes show that too few seeds in a sample will still grow. Curators then plant part of the remaining stock under controlled conditions and collect a fresh generation of seed. This regeneration must be managed carefully so that the renewed sample continues to represent the original material.',
        evidence: 'Falling viability triggers controlled growing and the collection of fresh seed.',
        closestDistractorId: 'vi', distractorFailure: 'Monitoring identifies the problem, but the paragraph’s main function is the regeneration response.', errorCode: 'detail-not-main-idea',
      },
      {
        id: 'seed-e', label: 'Paragraph E', answerHeadingId: 'vii', functionLabel: 'Connect preservation to access',
        text: 'A well-protected collection has limited public value if no one can study it. Clear catalogues and responsible distribution allow plant breeders and researchers to request material, compare traits and develop new knowledge. Safeguarding and use are therefore connected goals: access gives preservation a practical purpose.',
        evidence: 'The conclusion explicitly links protection with access and research use.',
        closestDistractorId: 'i', distractorFailure: 'Catalogues are mentioned as a tool, but the paragraph’s purpose is broader access and use.', errorCode: 'detail-not-main-idea',
      },
    ],
  },
  {
    id: 'night-trains-cross-borders',
    title: 'Rebuilding cross-border night rail',
    sourceTitle: 'European Commission and EU Agency for Railways — Cross-border rail',
    sourceUrl: 'https://transport.ec.europa.eu/news-events/news/connecting-europe-train-10-eu-pilot-services-boost-cross-border-rail-2023-01-31_en',
    sourceNote: 'Original WeLearn passage grounded in EU pilot-service reporting and ERA information about sleeper-train authorisation.',
    headings: [
      { id: 'i', text: 'Rolling stock enables—but cannot guarantee—growth' },
      { id: 'ii', text: 'Why every proposed route is already profitable' },
      { id: 'iii', text: 'Renewed demand becomes a set of practical trials' },
      { id: 'iv', text: 'Why buying a connected journey remains difficult' },
      { id: 'v', text: 'Replacing all daytime rail with sleeper services' },
      { id: 'vi', text: 'Operational incompatibilities across national networks' },
      { id: 'vii', text: 'Promise constrained by interdependent requirements' },
    ],
    paragraphs: [
      {
        id: 'rail-a', label: 'Paragraph A', answerHeadingId: 'iii', functionLabel: 'Move from trend to experiment',
        text: 'Interest in long-distance rail has revived as travellers and governments look for alternatives to some flights and car journeys. Announcements alone do not create a network, so European institutions selected pilot services to test new or improved cross-border links. The trials turn broad demand into routes that operators can evaluate in practice.',
        evidence: 'The paragraph moves from renewed interest to concrete pilot routes.',
        closestDistractorId: 'ii', distractorFailure: 'A pilot tests viability; it does not prove that every route is already profitable.', errorCode: 'unsupported-claim',
      },
      {
        id: 'rail-b', label: 'Paragraph B', answerHeadingId: 'i', functionLabel: 'Describe an enabling condition',
        text: 'A service cannot expand without suitable trains. New sleeper coaches need authorisation, modern safety systems and equipment that works across the intended network. The arrival of a new generation of authorised vehicles removes one important obstacle, although rolling stock by itself cannot solve timetabling, ticketing or infrastructure problems.',
        evidence: 'Suitable, authorised vehicles are presented as necessary but not sufficient.',
        closestDistractorId: 'vi', distractorFailure: 'Several system barriers are named, but the paragraph focuses on rolling stock as one enabling condition.', errorCode: 'detail-not-main-idea',
      },
      {
        id: 'rail-c', label: 'Paragraph C', answerHeadingId: 'vi', functionLabel: 'Explain structural obstacles',
        text: 'Cross-border rail joins networks with different operating rules, capacity pressures and technical arrangements. A route may need coordinated train paths, compatible systems and cooperation among infrastructure managers in several countries. These boundaries are less visible to passengers than a national border, but they can determine whether a timetable is workable.',
        evidence: 'The paragraph develops operational and technical barriers created by crossing multiple systems.',
        closestDistractorId: 'iv', distractorFailure: 'Passengers are mentioned, but booking is not the obstacle under discussion.', errorCode: 'keyword-match',
      },
      {
        id: 'rail-d', label: 'Paragraph D', answerHeadingId: 'iv', functionLabel: 'Present a user-facing barrier',
        text: 'Even when the tracks connect, the sales journey may not. A trip involving several operators can be difficult to compare or buy as one itinerary, and separate tickets may complicate information and passenger protection when disruption occurs. Better booking connections are therefore part of the rail project, not a minor addition after trains begin to run.',
        evidence: 'The paragraph focuses on fragmented comparison, purchase and protection for the passenger.',
        closestDistractorId: 'vi', distractorFailure: 'Cross-border barriers are the broad topic, but this paragraph isolates the booking experience.', errorCode: 'too-broad',
      },
      {
        id: 'rail-e', label: 'Paragraph E', answerHeadingId: 'vii', functionLabel: 'Give a conditional evaluation',
        text: 'A night train can turn travel time into sleeping time and offer an alternative to an early flight where rail links are strong. That promise is conditional: the route still needs suitable vehicles, usable departure times, reliable connections and enough demand. The revival will depend on how those elements work together, not on the appeal of overnight travel alone.',
        evidence: 'The paragraph evaluates night rail positively but makes success depend on several conditions.',
        closestDistractorId: 'ii', distractorFailure: 'The paragraph explicitly refuses to assume universal profitability or demand.', errorCode: 'unsupported-claim',
      },
    ],
  },
];

export const MATCHING_HEADINGS_GUIDED_PASSAGE_ID = 'cooling-city-blocks';
export const MATCHING_HEADINGS_INDEPENDENT_PASSAGE_ID = 'mangroves-after-storms';

export const MATCHING_HEADINGS_LEVELS: MatchingHeadingsLevel[] = [
  {
    id: 'purpose', title: 'Name the paragraph job', focus: 'Paragraph function',
    instruction: 'Match each paragraph to the heading that captures what the writer is doing, not merely the topic.',
    passageIds: ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful', 'night-trains-cross-borders'],
    questionIds: ['sleep-a', 'citizen-a', 'seed-a', 'rail-a'], masteryScore: 3,
  },
  {
    id: 'coverage', title: 'Reject the narrow detail', focus: 'Whole-paragraph coverage',
    instruction: 'Choose the heading that covers the opening, development and conclusion of each paragraph.',
    passageIds: ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful', 'night-trains-cross-borders'],
    questionIds: ['sleep-d', 'citizen-c', 'seed-d', 'rail-b'], masteryScore: 3,
  },
  {
    id: 'paraphrase', title: 'Resist the keyword match', focus: 'Meaning over vocabulary',
    instruction: 'Ignore repeated topic words when the heading describes the wrong relationship or function.',
    passageIds: ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful', 'night-trains-cross-borders'],
    questionIds: ['sleep-c', 'citizen-d', 'seed-b', 'rail-c'], masteryScore: 3,
  },
  {
    id: 'competitors', title: 'Defeat the closest competitor', focus: 'One-best-heading control',
    instruction: 'Compare the final two headings and name the exact sentence or scope difference that separates them.',
    passageIds: ['sleep-builds-memory', 'citizens-do-science', 'keeping-seeds-useful', 'night-trains-cross-borders'],
    questionIds: ['sleep-e', 'citizen-e', 'seed-e', 'rail-e'], masteryScore: 3,
  },
  {
    id: 'sleep-passage', title: 'Full set · Sleep and memory', focus: 'Untimed passage',
    instruction: 'Map all five paragraph functions before you submit the complete set.', passageIds: ['sleep-builds-memory'], masteryScore: 4,
  },
  {
    id: 'citizen-passage', title: 'Full set · Citizen science', focus: 'Untimed passage',
    instruction: 'Complete the set without opening explanations. Each heading may be used once.', passageIds: ['citizens-do-science'], masteryScore: 4,
  },
  {
    id: 'seed-passage', title: 'Paced set · Seed collections', focus: 'Target: seven minutes',
    instruction: 'Work steadily, preserve evidence quality and submit all five decisions together.', passageIds: ['keeping-seeds-useful'], masteryScore: 4,
  },
  {
    id: 'rail-passage', title: 'Skill mastery set · Night trains', focus: 'Unseen transfer',
    instruction: 'Use the complete method independently. A score of 4/5 records WeLearn skill mastery, not IELTS exam readiness.', passageIds: ['night-trains-cross-borders'], masteryScore: 4,
  },
];

export function getMatchingHeadingsPassage(id: string) {
  return MATCHING_HEADINGS_PASSAGES.find((passage) => passage.id === id);
}

function hashDrillSeed(value: string) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Returns four auditable drill options in a deterministic but varied order.
 * The order changes between attempts and never depends on answer correctness.
 * Keeping this pure lets the content gate detect positional shortcuts before UI ships.
 */
export function getMatchingHeadingsDrillOptionIds(
  passage: MatchingHeadingsTrainingPassage,
  paragraph: MatchingHeadingsParagraph,
  attemptSeed: number,
) {
  const optionIds = [paragraph.answerHeadingId, paragraph.closestDistractorId];
  for (const heading of passage.headings) {
    if (!optionIds.includes(heading.id)) optionIds.push(heading.id);
    if (optionIds.length === 4) break;
  }

  let seed = hashDrillSeed(`${paragraph.id}:${Math.max(0, Math.trunc(attemptSeed))}`);
  const shuffled = optionIds.slice();
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const target = seed % (index + 1);
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}
