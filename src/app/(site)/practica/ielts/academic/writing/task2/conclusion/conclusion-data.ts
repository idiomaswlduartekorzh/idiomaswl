import type { EssayTypeId } from '../introduccion/introduction-data';
import { BODY_ONE_LESSONS, type BodyBlockTone } from '../body-1/body-one-data';

export type ConclusionBlock = { label: string; tone: BodyBlockTone; purpose: string; text: string };
export type ConclusionExample = { title: string; prompt: string; conclusionJob: string; blocks: ConclusionBlock[]; commonMistake: string };
export type ConclusionLesson = {
  id: EssayTypeId; shortLabel: string; label: string; signal: string; function: string;
  planningQuestion: string; trap: string; architecture: Array<Omit<ConclusionBlock, 'text'>>; examples: ConclusionExample[];
};

const architectures: Record<EssayTypeId, Array<Omit<ConclusionBlock, 'text'>>> = {
  opinion: [
    { label: 'Restated position', tone: 'claim', purpose: 'Restates the same degree of agreement without copying the thesis.' },
    { label: 'Reason synthesis', tone: 'development', purpose: 'Combines the two developed reasons without listing every detail.' },
  ],
  discussion: [
    { label: 'View synthesis', tone: 'contrast', purpose: 'Brings the two views into one accurate comparison.' },
    { label: 'Final judgement', tone: 'claim', purpose: 'Restates the writer\'s opinion and the criterion behind it.' },
  ],
  'problem-solution': [
    { label: 'Problem synthesis', tone: 'development', purpose: 'Compresses the main cause or problem established in the essay.' },
    { label: 'Matched response', tone: 'link', purpose: 'Restates the solution that directly addresses that diagnosis.' },
  ],
  'advantages-disadvantages': [
    { label: 'Balance restatement', tone: 'contrast', purpose: 'Acknowledges the significant side or drawback accurately.' },
    { label: 'Overall judgement', tone: 'claim', purpose: 'Preserves the exact outweigh or balanced judgement from the thesis.' },
  ],
  'direct-questions': [
    { label: 'Answer 1 synthesis', tone: 'development', purpose: 'Restates the answer to the first direct question.' },
    { label: 'Answer 2 synthesis', tone: 'claim', purpose: 'Restates the answer or judgement required by the second question.' },
  ],
};

const conclusions: Record<EssayTypeId, Array<[string, string]>> = {
  opinion: [
    ['Overall, excessive academic pressure is more likely to weaken learning than to strengthen it.', 'Reducing constant grade anxiety would protect durable understanding and independent motivation while preserving meaningful academic standards.'],
    ['In conclusion, public transport should receive priority over further road expansion in crowded cities.', 'Shared networks use limited urban space more efficiently and provide essential access to residents who cannot depend on a private car.'],
    ['Overall, I support removing or substantially reducing tuition fees for academically qualified students.', 'Wider access can prevent income from excluding capable applicants, while targeted public funding can keep the policy financially workable.'],
    ['In conclusion, home working is beneficial for employees whose roles do not require continuous physical presence.', 'The time recovered from commuting and the greater control over concentrated work make a qualified remote model preferable to a universal office requirement.'],
    ['Overall, advertising directed at children should face strict restrictions.', 'Young audiences are unusually vulnerable because they may neither recognise persuasion nor evaluate promotional claims with adult scepticism.'],
  ],
  discussion: [
    ['In conclusion, daily homework can reinforce recent learning, whereas excessive assignments can reduce rest and thoughtful engagement.', 'Purposeful but limited practice therefore offers a stronger balance than either a compulsory heavy workload or no independent work at all.'],
    ['Overall, unrestricted car access can support deliveries and some mobility needs, but it also reduces safety and usable public space.', 'Carefully managed car-free centres are preferable because exemptions and accessible transport can protect essential access without preserving general traffic.'],
    ['In conclusion, admission fees can support museum conservation, while free access broadens their educational value.', 'A mixed system of targeted charges and protected free entry is therefore more convincing than applying one universal rule to every visitor.'],
    ['Overall, early specialisation can help students with a clear demanding goal, whereas a broad curriculum protects options for those still developing their interests.', 'For most teenagers, breadth should come first because premature choices may close valuable academic and career routes.'],
    ['In conclusion, artificial intelligence can improve speed and consistency, but it can also reproduce bias through decisions that are difficult to challenge.', 'Its benefits outweigh its risks only when accountable human review remains central to consequential uses.'],
  ],
  'problem-solution': [
    ['In conclusion, congestion is driven largely by car-dependent planning and the absence of credible alternatives.', 'Cities should therefore expand reliable public transport before using pricing measures to reduce unnecessary peak-time driving.'],
    ['Overall, household food waste often begins with excessive purchasing and poor storage decisions.', 'Realistic meal planning, portion control and clearer use-by information can directly interrupt this avoidable cycle.'],
    ['In conclusion, young adults leave rural communities when skilled work and essential services are concentrated elsewhere.', 'Investment in digital infrastructure, regional training and dependable transport is needed to make remaining locally a viable choice.'],
    ['Overall, childhood inactivity is reinforced when movement is infrequent, narrow or inaccessible during the school day.', 'Schools can respond by embedding regular active breaks and varied non-competitive activities into normal routines.'],
    ['In conclusion, plastic packaging persists because convenient alternatives are limited and consumer demand remains weak.', 'Businesses must provide refillable options while shoppers support them, since lasting reduction requires supply and demand to change together.'],
  ],
  'advantages-disadvantages': [
    ['In conclusion, home working can reduce informal contact, but this drawback can be limited through planned collaboration.', 'Its wider gains in flexibility and focused work therefore outweigh the manageable costs for suitable roles.'],
    ['Overall, tourism can generate valuable income while placing serious pressure on housing, infrastructure and the environment.', 'Its advantages outweigh the disadvantages only where regulation ensures that residents do not bear disproportionate costs.'],
    ['In conclusion, digital textbooks may create distraction and unequal access, yet schools can address both through managed devices and offline materials.', 'Their searchable, adaptable content consequently offers greater educational benefits when access is properly supported.'],
    ['Overall, living abroad provides substantial personal and professional opportunities, although isolation and practical insecurity can be significant.', 'The experience is beneficial when migrants have the preparation and support needed to manage those pressures.'],
    ['In conclusion, online shopping can weaken physical retail and local employment, but many businesses can adapt through combined digital and in-person services.', 'The convenience and wider choice for consumers therefore outweigh the disruption when local transition is actively supported.'],
  ],
  'direct-questions': [
    ['In conclusion, more people live alone because economic pressures and changing values have delayed or reduced shared households.', 'This can be positive when independence is supported by strong social connections, but harmful when autonomy becomes unwanted isolation.'],
    ['Overall, social media attracts users through speed, convenience and participation in shared networks.', 'Its information should nevertheless be trusted only after the original source, date and supporting evidence have been independently checked.'],
    ['In conclusion, workers change careers more frequently because labour markets and personal priorities evolve throughout adult life.', 'Such mobility is generally beneficial when it is purposeful and supported by realistic retraining rather than repeated instability.'],
    ['Overall, historic buildings matter because they preserve cultural memory and contribute to a distinctive shared environment.', 'Their maintenance should be financed jointly by public authorities, private users and the visitors or businesses that benefit from them.'],
    ['In conclusion, people increasingly buy second-hand goods to reduce costs and avoid unnecessary consumption.', 'This is a positive development because it extends product life and broadens access, provided safety and quality can be checked.'],
  ],
};

const lessonMeta: Record<EssayTypeId, Omit<ConclusionLesson, 'id' | 'architecture' | 'examples'>> = {
  opinion: { shortLabel: 'Opinion', label: 'Opinion: preserve the same degree of agreement', signal: 'To what extent do you agree or disagree?', function: 'Restate the position and compress the two reasons that supported it.', planningQuestion: 'What exactly did I agree with, and which two reasons made that position convincing?', trap: 'Changing from complete agreement to a balanced position in the final paragraph.' },
  discussion: { shortLabel: 'Discussion', label: 'Discussion: synthesise both views and preserve your judgement', signal: 'Discuss both views and give your own opinion.', function: 'Represent both views briefly, then make the writer\'s final judgement unmistakable.', planningQuestion: 'What criterion made one view or combination more convincing?', trap: 'Saying only that both views have merit and omitting the required opinion.' },
  'problem-solution': { shortLabel: 'Problem–Solution', label: 'Problem–Solution: pair diagnosis with response', signal: 'What are the causes/problems, and what can be done?', function: 'Compress the diagnosis and restate the response that actually addresses it.', planningQuestion: 'Does my proposed response solve the cause or problem named in the first half?', trap: 'Adding a new solution that the body paragraphs never developed.' },
  'advantages-disadvantages': { shortLabel: 'Advantages–Disadvantages', label: 'Advantages–Disadvantages: maintain the same balance', signal: 'Discuss the advantages and disadvantages / Do the advantages outweigh the disadvantages?', function: 'Acknowledge the meaningful counterweight and preserve the exact overall judgement.', planningQuestion: 'Did the question require discussion only, or an explicit outweigh decision?', trap: 'Using “the advantages outweigh” when the essay never established that judgement.' },
  'direct-questions': { shortLabel: 'Direct Questions', label: 'Direct Questions: close both answers', signal: 'Two explicit questions after the topic statement.', function: 'Restate Answer 1 and Answer 2 so neither instruction disappears at the end.', planningQuestion: 'Can a reader identify my final answer to each question in one reading?', trap: 'Closing only the second question because it appeared in Body 2.' },
};

export const CONCLUSION_LESSONS: ConclusionLesson[] = BODY_ONE_LESSONS.map((source) => ({
  id: source.id,
  ...lessonMeta[source.id],
  architecture: architectures[source.id],
  examples: source.examples.map((example, index) => ({
    title: example.title,
    prompt: example.prompt,
    conclusionJob: lessonMeta[source.id].function,
    blocks: architectures[source.id].map((item, blockIndex) => ({ ...item, text: conclusions[source.id][index][blockIndex] })),
    commonMistake: lessonMeta[source.id].trap,
  })),
}));

export function conclusionText(example: ConclusionExample) {
  return example.blocks.map((block) => block.text).join(' ');
}
