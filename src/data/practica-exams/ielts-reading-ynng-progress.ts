import { IELTS_YNNG_PRACTICE_SETS } from './seo-catalog.ts';

export type YnngAnswer = 'YES' | 'NO' | 'NOT GIVEN';
export type YnngErrorCode = 'attribution-shift' | 'stance-direction' | 'stance-strength' | 'scope-or-quantifier' | 'silence-misclassified' | 'outside-knowledge';
export type YnngDecision = { id: string; statement: string; answer: YnngAnswer; evidence: string; explanation: string; trap: string; errorCode: YnngErrorCode };
export type YnngTrainingPassage = { id: string; title: string; paragraphs: Array<{ id: string; label: string; text: string }>; sourceUrl: string; sourceNote: string; decisions: YnngDecision[] };
export type YnngLevel = { id: string; title: string; focus: string; instruction: string; passageIds: string[]; decisionIds?: string[]; masteryScore: number };

export const YNNG_STORAGE_KEY = 'welearn:ielts-reading:yes-no-not-given:v2';
export const YNNG_LEGACY_STORAGE_KEY = 'welearn:ielts-reading:yes-no-not-given:v1';
export const YNNG_GUIDED_PASSAGE_ID = 'ynng-station-art';
export const YNNG_INDEPENDENT_PASSAGE_ID = 'ynng-remote-work';
export const YNNG_OPTIONS: YnngAnswer[] = ['YES', 'NO', 'NOT GIVEN'];

function splitParagraphs(id: string, passage: string) { return passage.split(/\n\n+/).map((text, index) => ({ id: `${id}-p${index + 1}`, label: `Paragraph ${String.fromCharCode(65 + index)}`, text })); }

const sourceMeta: Record<string, { sourceUrl: string; sourceNote: string }> = {
  'ynng-station-art': { sourceUrl: 'https://www.arts.gov/impact/creative-placemaking', sourceNote: 'WeLearn editorial training passage informed by public creative-placemaking themes. The source informs the topic; it does not endorse the writer position or certify the questions.' },
  'ynng-remote-work': { sourceUrl: 'https://www.oecd.org/en/topics/sub-issues/teleworking.html', sourceNote: 'WeLearn editorial training passage informed by OECD teleworking analysis. It is not an OECD opinion piece or an official IELTS item.' },
  'ynng-school-uniforms': { sourceUrl: 'https://www.unicef.org/reports/guidance-gender-responsive-education-systems', sourceNote: 'WeLearn editorial training passage about fair school policy. The linked guidance supplies context, not the passage wording or answer key.' },
};

const selectedLegacyIds: Record<string, string[]> = {
  'ynng-station-art': ['ynng-station-art-01', 'ynng-station-art-02', 'ynng-station-art-04', 'ynng-station-art-05', 'ynng-station-art-08'],
  'ynng-remote-work': ['ynng-remote-work-01', 'ynng-remote-work-03', 'ynng-remote-work-04', 'ynng-remote-work-05', 'ynng-remote-work-06'],
  'ynng-school-uniforms': ['ynng-uniforms-01', 'ynng-uniforms-02', 'ynng-uniforms-03', 'ynng-uniforms-05', 'ynng-uniforms-07'],
};
const evidence: Record<string, string> = {
  'ynng-station-art-01': 'the strongest argument for station art is not that it decorates a journey. In my view, it gives a public system a visible connection to the neighborhoods it serves',
  'ynng-station-art-02': 'This does not mean that every station should become a gallery.',
  'ynng-station-art-04': 'A modest project developed with community groups may do more for public trust than an expensive installation chosen by distant planners.',
  'ynng-station-art-05': 'The writer describes a condition in which budgets replace accessibility work but gives no view that this usually occurs.',
  'ynng-station-art-08': 'The writer says art should not pretend to solve operational failures but states no policy of removing all art from affected stations.',
  'ynng-remote-work-01': 'I think this conclusion is too neat.',
  'ynng-remote-work-03': 'The writer accepts that focused tasks can be completed at home but gives no overall productivity ranking.',
  'ynng-remote-work-04': 'entirely optional attendance can create another problem',
  'ynng-remote-work-05': 'they should not rescue office districts by protecting old habits',
  'ynng-remote-work-06': 'Clinics and classrooms are examples of possible uses; the writer never ranks them above shops.',
  'ynng-uniforms-01': 'Debates about school uniforms often become strangely absolute. ... neither is strong enough on its own.',
  'ynng-uniforms-02': 'A uniform is therefore a partial tool, not a complete answer to inequality.',
  'ynng-uniforms-03': 'Young people express identity through language, friendships, interests and choices outside school.',
  'ynng-uniforms-05': 'The writer names a single supplier as one possible cost condition but gives no view about how many schools use one.',
  'ynng-uniforms-07': 'A good policy should be flexible where identity or affordability is at stake',
};
const legacyErrors: Record<string, YnngErrorCode> = {
  'ynng-station-art-01': 'attribution-shift', 'ynng-station-art-02': 'scope-or-quantifier', 'ynng-station-art-04': 'stance-strength', 'ynng-station-art-05': 'silence-misclassified', 'ynng-station-art-08': 'outside-knowledge',
  'ynng-remote-work-01': 'stance-direction', 'ynng-remote-work-03': 'silence-misclassified', 'ynng-remote-work-04': 'stance-strength', 'ynng-remote-work-05': 'stance-direction', 'ynng-remote-work-06': 'outside-knowledge',
  'ynng-uniforms-01': 'attribution-shift', 'ynng-uniforms-02': 'scope-or-quantifier', 'ynng-uniforms-03': 'stance-direction', 'ynng-uniforms-05': 'silence-misclassified', 'ynng-uniforms-07': 'stance-strength',
};

const legacyPassages: YnngTrainingPassage[] = IELTS_YNNG_PRACTICE_SETS.map((set) => ({
  id: set.id,
  title: set.passageTitle,
  paragraphs: splitParagraphs(set.id, set.passage),
  ...sourceMeta[set.id],
  decisions: set.questions.filter((question) => selectedLegacyIds[set.id].includes(question.id)).map((question) => ({ id: question.id, statement: question.statement, answer: question.answer as YnngAnswer, evidence: evidence[question.id], explanation: question.explanation, trap: question.trap, errorCode: legacyErrors[question.id] })),
}));

function authoredPassage(input: Omit<YnngTrainingPassage, 'paragraphs'> & { passage: string }): YnngTrainingPassage { const { passage, ...rest } = input; return { ...rest, paragraphs: splitParagraphs(rest.id, passage) }; }

const coolingStreets = authoredPassage({
  id: 'ynng-cooling-streets', title: 'Who should city shade serve?', sourceUrl: 'https://www.epa.gov/heatislands/using-trees-and-vegetation-reduce-heat-islands', sourceNote: 'WeLearn editorial training passage grounded in EPA heat-island context. Its recommendations are a constructed writer position, not EPA policy.',
  passage: `Cities often present shade projects as beautification, but I believe their first purpose should be protection from heat. A decorative tree in an empty plaza may look impressive; a continuous shaded route to a bus stop can change whether an older resident can travel safely in summer.\n\nThis does not make appearance irrelevant. Well-designed shade can improve a street while reducing exposure, and ugly temporary structures may lose public support. Nevertheless, visual appeal should be tested after the route serves the people who face the greatest heat risk.\n\nSome planners prefer to count new trees. I would count usable shade at the hottest hour instead. A young tree may take years to cover a pavement, while an awning can work immediately. The sensible programme will use both rather than pretending one material suits every street.\n\nCities should also publish maintenance responsibilities before announcing a target. I am less interested in a large planting promise than in a smaller plan that keeps trees alive, repairs covers and explains who residents should contact when shade disappears.`,
  decisions: [
    { id: 'ynng-cooling-01', statement: 'The writer believes heat protection should be the primary aim of urban shade projects.', answer: 'YES', evidence: 'I believe their first purpose should be protection from heat.', explanation: 'The statement preserves the writer’s explicit priority.', trap: 'Beautification is discussed, but it is not ranked first.', errorCode: 'stance-strength' },
    { id: 'ynng-cooling-02', statement: 'The writer thinks visual design has no value in a shade programme.', answer: 'NO', evidence: 'This does not make appearance irrelevant.', explanation: 'The writer explicitly keeps appearance relevant while ranking protection first.', trap: 'A lower priority is not the same as zero value.', errorCode: 'stance-direction' },
    { id: 'ynng-cooling-03', statement: 'The writer recommends measuring usable shade during the hottest part of the day.', answer: 'YES', evidence: 'I would count usable shade at the hottest hour instead.', explanation: 'The measurement recommendation is direct.', trap: 'The writer contrasts this measure with simply counting trees.', errorCode: 'attribution-shift' },
    { id: 'ynng-cooling-04', statement: 'The writer believes awnings are cheaper than planting trees.', answer: 'NOT GIVEN', evidence: 'The writer compares how quickly awnings and young trees provide cover, but gives no cost view.', explanation: 'Speed is evaluated; relative price is not.', trap: 'Do not convert a timing comparison into an unstated cost preference.', errorCode: 'silence-misclassified' },
    { id: 'ynng-cooling-05', statement: 'The writer prefers a maintained smaller plan to a large unsupported promise.', answer: 'YES', evidence: 'I am less interested in a large planting promise than in a smaller plan that keeps trees alive', explanation: 'The writer states this preference explicitly.', trap: 'The comparison concerns credible maintenance, not opposition to ambitious targets in general.', errorCode: 'stance-strength' },
  ],
});

const libraryAi = authoredPassage({
  id: 'ynng-library-ai', title: 'AI tools in public libraries', sourceUrl: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics', sourceNote: 'WeLearn editorial training passage grounded in UNESCO AI-ethics themes. It is not a UNESCO statement or a report about one library.',
  passage: `Public libraries should not reject every artificial-intelligence tool merely because commercial products have caused concern. In my view, a library is exactly the place where people should be able to examine a new system without being forced to trust it.\n\nThat opportunity requires limits. A writing assistant may help a visitor organise ideas, but it should not quietly collect personal drafts or present invented sources as reliable. Libraries ought to explain what a tool records, what it cannot verify and when a human member of staff can help.\n\nI am unconvinced by the claim that one short workshop makes a user digitally literate. Confidence after a demonstration is useful, yet real judgement develops through repeated comparison: checking a generated answer against a catalogue, tracing a quotation and noticing when fluent language hides uncertainty.\n\nFor that reason, success should not be measured only by the number of accounts created. I would rather see fewer users who can challenge a result than many users who have simply learned which button to press.`,
  decisions: [
    { id: 'ynng-library-ai-01', statement: 'The writer supports a complete ban on AI tools in public libraries.', answer: 'NO', evidence: 'Public libraries should not reject every artificial-intelligence tool', explanation: 'The writer directly rejects a universal ban.', trap: 'Concern and limits do not amount to total opposition.', errorCode: 'scope-or-quantifier' },
    { id: 'ynng-library-ai-02', statement: 'The writer believes libraries can offer a setting for critical examination of AI.', answer: 'YES', evidence: 'a library is exactly the place where people should be able to examine a new system without being forced to trust it', explanation: 'The statement preserves the writer’s stated purpose.', trap: 'The writer supports examination, not automatic acceptance.', errorCode: 'attribution-shift' },
    { id: 'ynng-library-ai-03', statement: 'The writer says every AI writing assistant stores personal drafts.', answer: 'NOT GIVEN', evidence: 'The writer says a tool should not quietly collect drafts but never claims that every assistant does so.', explanation: 'A safeguard recommendation does not establish universal current behaviour.', trap: 'Do not turn a warned-against possibility into the writer’s factual view about all tools.', errorCode: 'silence-misclassified' },
    { id: 'ynng-library-ai-04', statement: 'The writer considers one brief workshop sufficient for digital literacy.', answer: 'NO', evidence: 'I am unconvinced by the claim that one short workshop makes a user digitally literate.', explanation: 'The writer explicitly rejects sufficiency.', trap: 'The workshop may build confidence, but the writer says judgement needs repeated comparison.', errorCode: 'stance-direction' },
    { id: 'ynng-library-ai-05', statement: 'The writer values critical judgement more than high account-registration numbers.', answer: 'YES', evidence: 'I would rather see fewer users who can challenge a result than many users who have simply learned which button to press.', explanation: 'The preference is explicit.', trap: 'This is a ranking of outcomes, not a view that participation numbers never matter.', errorCode: 'stance-strength' },
  ],
});

const nightRail = authoredPassage({
  id: 'ynng-night-rail', title: 'A useful test for night-train policy', sourceUrl: 'https://transport.ec.europa.eu/transport-modes/rail_en', sourceNote: 'WeLearn editorial training passage grounded in European rail-policy context. The writer view and teaching questions are original training constructs.',
  passage: `Night trains attract romantic language, but nostalgia is a weak reason to fund a service. I support new routes when they solve a journey problem that daytime rail and short flights handle badly, not simply because sleeping on a train sounds appealing.\n\nA route should therefore be judged as a connected journey. A comfortable coach is of little use if the booking system hides the final local train or if a late arrival destroys the onward connection. Operators should publish one clear itinerary and accept responsibility when its parts fail.\n\nThis does not mean every city deserves a direct sleeper. Limited rolling stock should first serve corridors where distance, departure time and onward links make overnight travel genuinely useful. A short demonstration route can reveal demand, but politicians should not describe a crowded opening week as proof of permanent success.\n\nI would keep environmental claims modest too. Rail can reduce emissions on some journeys, yet the comparison depends on occupancy, electricity and the trip being replaced. Honest conditions strengthen the case for night trains; they do not weaken it.`,
  decisions: [
    { id: 'ynng-night-rail-01', statement: 'The writer believes nostalgia alone is a good basis for subsidising night trains.', answer: 'NO', evidence: 'nostalgia is a weak reason to fund a service', explanation: 'The writer directly rejects nostalgia as sufficient justification.', trap: 'An appealing experience is not the policy test the writer endorses.', errorCode: 'stance-direction' },
    { id: 'ynng-night-rail-02', statement: 'The writer thinks a night-train route should be evaluated as an end-to-end journey.', answer: 'YES', evidence: 'A route should therefore be judged as a connected journey.', explanation: 'Connected and end-to-end express the same evaluation.', trap: 'The coach alone is explicitly insufficient.', errorCode: 'attribution-shift' },
    { id: 'ynng-night-rail-03', statement: 'The writer recommends a direct sleeper service for every city.', answer: 'NO', evidence: 'This does not mean every city deserves a direct sleeper.', explanation: 'The universal recommendation is explicitly rejected.', trap: 'Support for selected new routes does not support universal provision.', errorCode: 'scope-or-quantifier' },
    { id: 'ynng-night-rail-04', statement: 'The writer believes every demonstration route should operate for at least one year.', answer: 'NOT GIVEN', evidence: 'The passage recommends a short demonstration route but states no minimum operating period.', explanation: 'The writer’s view about a one-year minimum is absent.', trap: 'Do not invent a duration rule from outside policy knowledge.', errorCode: 'outside-knowledge' },
    { id: 'ynng-night-rail-05', statement: 'The writer believes acknowledging conditions can make the environmental case more credible.', answer: 'YES', evidence: 'Honest conditions strengthen the case for night trains; they do not weaken it.', explanation: 'The statement accurately paraphrases the conclusion.', trap: 'A conditional case is not the same as rejecting environmental benefits.', errorCode: 'stance-strength' },
  ],
});

export const YNNG_PASSAGES: YnngTrainingPassage[] = [...legacyPassages, coolingStreets, libraryAi, nightRail];
const progressPassages = YNNG_PASSAGES.slice(2);
export const YNNG_LEVELS: YnngLevel[] = [
  { id: 'view-states', title: 'Separate agreement, opposition and silence', focus: 'Same view · opposing view · unstated view', instruction: 'Attribute the position to the writer before choosing Yes, No or Not Given.', passageIds: progressPassages.map((passage) => passage.id), decisionIds: progressPassages.flatMap((passage) => passage.decisions.slice(0, 2).map((decision) => decision.id)).slice(0, 4), masteryScore: 3 },
  { id: 'view-strength', title: 'Control direction, strength and scope', focus: 'Preference · recommendation · degree', instruction: 'Preserve who holds the view, its direction and how strongly it is expressed.', passageIds: progressPassages.map((passage) => passage.id), decisionIds: progressPassages.flatMap((passage) => passage.decisions.slice(2, 4).map((decision) => decision.id)).slice(0, 4), masteryScore: 3 },
  { id: 'uniforms-set', title: 'Full set · School uniforms', focus: 'Qualified writer position', instruction: 'Submit all five views before feedback opens.', passageIds: ['ynng-school-uniforms'], masteryScore: 4 },
  { id: 'shade-set', title: 'Full set · Cooling streets', focus: 'Priority versus total rejection', instruction: 'Distinguish the writer’s ranking from an absolute claim.', passageIds: ['ynng-cooling-streets'], masteryScore: 4 },
  { id: 'library-ai-set', title: 'Full set · Library AI', focus: 'Safeguards and unstated behaviour', instruction: 'Do not turn a recommendation into a claim about what every tool does.', passageIds: ['ynng-library-ai'], masteryScore: 4 },
  { id: 'night-rail-set', title: 'Transfer set · Night rail', focus: 'Conditions and policy judgement', instruction: 'Complete the unseen writer-view set and justify each label precisely.', passageIds: ['ynng-night-rail'], masteryScore: 4 },
];
export function getYnngPassage(id: string) { return YNNG_PASSAGES.find((passage) => passage.id === id); }
