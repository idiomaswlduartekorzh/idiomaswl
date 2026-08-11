import { ESSAY_TYPES, type EssayTypeId } from '../introduccion/introduction-data';

/**
 * Identificar el tipo de ensayo: los enunciados y lo que dice cada opción equivocada.
 *
 * LO QUE SE MIDIÓ ANTES DE REESCRIBIR
 *
 *   · Las cinco primeras respuestas bajaban la rejilla en escalera —posiciones 0,1,2,3,4—,
 *     así que se acertaban sin leer el enunciado.
 *   · Cinco de las nueve pistas imprimían el nombre del tipo correcto. El segundo intento
 *     era gratis y valía un punto.
 *   · No había feedback por opción: eligieras lo que eligieras, salía el mismo párrafo.
 *   · Veinte menciones de banda en pantalla (del tipo «este error te deja en tal banda»).
 *
 * POR QUÉ LOS CINCO BOTONES NO SE BARAJAN
 *
 * En el resto del curso las opciones son textos distintos en cada ejercicio y hay que
 * barajarlas. Aquí no: son siempre las mismas cinco categorías. Moverlas de sitio cada vez
 * obliga a releer cinco etiquetas conocidas y no enseña nada. Lo que sí delataba era el
 * ORDEN DE LAS PREGUNTAS, y eso es lo que se ha roto: `check:ielts-task2` mide que la
 * respuesta correcta no suba ni baje en escalera y que las cinco posiciones salgan lo mismo.
 *
 * LAS PISTAS NO NOMBRAN EL TIPO
 *
 * Una pista dice DÓNDE mirar, nunca qué contestar. Si la dice, el segundo intento no es un
 * intento. El guardián comprueba que ninguna pista contenga el nombre de su respuesta.
 */

export type TypeDrill = {
  id: string;
  prompt: string;
  /** La frase del enunciado que decide el tipo. Solo se muestra al cerrar la pregunta. */
  instruction: string;
  answer: EssayTypeId;
  /** Los enunciados que se leen mal a menudo. Sale del dato, no del número de pregunta. */
  tricky: boolean;
  /** Dónde mirar. Nunca nombra el tipo. */
  hint: string;
  /** Por qué ese es el tipo, y qué obliga a hacer. */
  why: string;
  /** Por qué falla CADA una de las otras cuatro, en ESTE enunciado. */
  wrong: Record<EssayTypeId, string>;
};

const label = (id: EssayTypeId) => ESSAY_TYPES.find((type) => type.id === id)!.shortLabel;

/** Las cinco categorías, en el orden en que se pintan. Estable a propósito. */
export const TYPE_OPTIONS = ESSAY_TYPES.map((type) => ({ id: type.id, label: type.shortLabel }));

export const TYPE_DRILLS: TypeDrill[] = [
  {
    id: 'obesity',
    prompt:
      'Obesity rates have risen sharply in many developed countries over the past three decades. What are the main causes of this trend, and what actions can governments and individuals take to reverse it?',
    instruction: 'What are the main causes …? What actions can be taken …?',
    answer: 'problem-solution',
    tricky: false,
    hint: 'Ignore the topic for a moment. Read only the two questions at the end, and say what each one asks you to produce: an explanation, or a course of action?',
    why: 'One question asks for causes, the other for actions. That pairing is what decides it. It also sets the hardest requirement in this type: every action you propose in Body 2 has to answer a cause you named in Body 1.',
    wrong: {
      opinion: 'Nothing here asks whether you agree with anything. You are asked what is causing the rise and what should be done — two explanations, not a position.',
      discussion: 'No second view is offered. A discussion prompt puts two rival beliefs in front of you — “some people… others…”. This one states a fact and asks two questions about it.',
      'advantages-disadvantages': 'Rising obesity has no upside to set against the downside. There are no two sides here to weigh, only a diagnosis and a response.',
      'direct-questions': 'The nearest wrong answer, and worth getting exactly right: there are two questions, but the second asks for actions. When question two asks what should be done you are proposing solutions; when it asks whether something is good or worrying, you are evaluating.',
      'problem-solution': '',
    },
  },
  {
    id: 'internet',
    prompt:
      'Many people believe the internet has made communication easier. Others argue it has reduced the quality of human relationships. To what extent do you agree or disagree?',
    instruction: 'To what extent do you agree or disagree?',
    answer: 'opinion',
    tricky: false,
    hint: 'Two beliefs appear before the question, but they are context. Read the final sentence on its own and ask who is being told to decide.',
    why: 'The final instruction asks for your position and nothing else. The two beliefs are the background: you are not obliged to treat them equally. Your answer has to be visible in the introduction and still visible in every paragraph after it.',
    wrong: {
      discussion: 'This is the trap the prompt is built on. Two views appear, so it looks like a discussion — but the words “discuss both views” are not there. You are asked how far you agree, which means you have to come down somewhere.',
      'problem-solution': 'Nothing is framed as a problem and no measures are requested. Nobody asks what should be done about the internet.',
      'advantages-disadvantages': 'You are not asked to list benefits and drawbacks, nor whether one side outweighs the other. You are asked how far you accept a claim.',
      'direct-questions': 'There is one question, and it is an agree-or-disagree question. Direct-question prompts ask two different things — typically why something happens and what you make of it.',
      opinion: '',
    },
  },
  {
    id: 'urbanisation',
    prompt:
      'An increasing number of people are leaving rural areas to live in cities. Why is this happening? Do you think this is a positive or negative development?',
    instruction: 'Why is this happening? Do you think this is a positive or negative development?',
    answer: 'direct-questions',
    tricky: false,
    hint: 'There are two questions. Say what each one asks you to produce — and be exact about the second one, because everything turns on it.',
    why: 'Question one asks for causes, question two for your evaluation. Two separate demands, each needing its own body paragraph and its own visible answer. Answering one well and the other in a sentence is what costs marks here.',
    wrong: {
      'problem-solution': 'The commonest slip, and an understandable one: the first question really does ask for causes. But the second asks whether the trend is positive or negative, not what should be done. No measures are requested anywhere in the prompt.',
      opinion: 'The second question does want a judgement, but there is no single proposition to agree or disagree with, and the first question is not about opinion at all.',
      discussion: 'No two views are offered. Nobody in this prompt believes anything: a fact is stated and two questions follow.',
      'advantages-disadvantages': 'On its own, “positive or negative” can be answered by weighing both sides. But it is not the only question here — the prompt first asks why the trend is happening, and a causes paragraph is not an advantages paragraph.',
      'direct-questions': '',
    },
  },
  {
    id: 'outdoors',
    prompt:
      'Some people believe children should spend more time outdoors developing social skills. Others feel that structured indoor learning environments are more beneficial. Discuss both views and give your own opinion.',
    instruction: 'Discuss both views and give your own opinion.',
    answer: 'discussion',
    tricky: false,
    hint: 'The final sentence names, in order, everything the essay must contain. Count the separate things it asks for.',
    why: 'The instruction asks for three things: the first view, the second view, and your own opinion. Two of the three are already in the prompt; the third is yours, and it has to be stated, not implied in the last line.',
    wrong: {
      opinion: 'You do owe an opinion here — but not only an opinion. Both views have to be developed first, and an essay that argues one side and ignores the other has left out half the task.',
      'problem-solution': 'Nothing is described as a problem and no measures are requested. Two beliefs about children are being compared.',
      'advantages-disadvantages': 'The two views are what people believe, not the upside and downside of one thing. You are asked what each group thinks and why.',
      'direct-questions': 'There is one instruction, not two questions. “Discuss both views and give your own opinion” is a single, standard instruction.',
      discussion: '',
    },
  },
  {
    id: 'online-study',
    prompt:
      'In many countries, more people are choosing to study online rather than attending traditional classes. Do the advantages of this development outweigh the disadvantages?',
    instruction: 'Do the advantages … outweigh the disadvantages?',
    answer: 'advantages-disadvantages',
    tricky: false,
    hint: 'The question can be answered yes or no. Ask what two things are being compared, and whether you are allowed to leave the comparison open.',
    why: 'Both sides have to appear, and the word “outweigh” forces a verdict on which is heavier. An essay that lists benefits, lists drawbacks and stops has answered a question that was not asked.',
    wrong: {
      opinion: 'A reasonable guess, because a judgement is required. But the judgement is specifically about which side is heavier, and both sides have to be developed before you can deliver it. An opinion essay does not owe the other side equal treatment; this one does.',
      discussion: 'No groups of people are quoted. What is being compared are the benefits and drawbacks of one development, not two rival beliefs.',
      'problem-solution': 'No solutions are requested. Studying online is not framed as a problem to be fixed.',
      'direct-questions': 'There is one question here, not two. A direct-question prompt asks two different things — typically why something happens and what you make of it.',
      'advantages-disadvantages': '',
    },
  },
  {
    id: 'nuclear',
    prompt:
      'While some experts believe nuclear energy is the only viable solution to climate change, others argue that renewable sources are sufficient and safer. To what extent do you agree with the view that nuclear energy is essential?',
    instruction: 'To what extent do you agree with the view that …?',
    answer: 'opinion',
    tricky: true,
    hint: 'Two expert camps appear before the question. Cover them with your hand and read only what comes after the full stop.',
    why: 'The instruction singles out one claim — that nuclear energy is essential — and asks how far you accept it. The two camps are scenery. Your thesis has to land on that one proposition and stay on it.',
    wrong: {
      discussion: 'This is exactly the trap. Two named camps make it look like a discussion, but “discuss both views” never appears. You are asked how far you agree with one of them, which is a different job.',
      'advantages-disadvantages': 'Nothing asks you to weigh benefits against drawbacks. You are asked about a claim, not about a balance.',
      'problem-solution': 'Climate change is the backdrop, not the task. Neither causes nor measures are requested.',
      'direct-questions': 'There is a single question at the end, and it asks how far you agree.',
      opinion: '',
    },
  },
  {
    id: 'air-quality',
    prompt:
      'In many cities, air quality has deteriorated significantly due to rising traffic levels and industrial activity. What problems does poor air quality cause for urban residents, and what measures could local authorities implement to address these issues?',
    instruction: 'What problems does this cause? What measures could be implemented?',
    answer: 'problem-solution',
    tricky: true,
    hint: 'Two questions again. Notice that the first one is not asking for causes — read what it actually asks for. Then check what the second one wants.',
    why: 'Problems and measures is the same pairing as causes and solutions: something is diagnosed, something is proposed to answer it. Note that the causes are handed to you in the prompt — traffic and industry — so your first paragraph is about consequences, not causes.',
    wrong: {
      'direct-questions': 'The nearest wrong answer. There are two questions, but the second asks for measures — an action — not for your evaluation. Had it asked whether the situation is worrying, this would be a different type.',
      opinion: 'Nothing asks whether you agree. Two things are requested and neither of them is a position.',
      discussion: 'No two views are offered. A cause is stated as fact and two questions follow.',
      'advantages-disadvantages': 'Deteriorating air quality has no advantage to set against it.',
      'problem-solution': '',
    },
  },
  {
    id: 'science-decline',
    prompt:
      'The number of young people studying science and technology subjects at university has declined significantly in many countries. What are the causes of this trend, and do you think this is a worrying development?',
    instruction: 'What are the causes …? Do you think this is a worrying development?',
    answer: 'direct-questions',
    tricky: true,
    hint: 'The first question is easy to place. Everything depends on the second: does it ask you to do something about the trend, or to judge it?',
    why: 'Causes, and then a judgement. The second question asks whether the decline is worrying, so nothing in this essay is about what should be done. Proposing measures here answers a question nobody asked.',
    wrong: {
      'problem-solution': 'The single most common misreading of this prompt, and the word “causes” is what triggers it. Read on: the second question asks whether the trend is worrying, not what measures should be taken. No solutions are requested.',
      opinion: 'The second question does want your view, but the first asks for causes, and there is no single proposition to agree or disagree with.',
      discussion: 'Nobody is quoted holding a view. A trend is reported and two questions follow.',
      'advantages-disadvantages': '“Worrying or not” is a judgement about a trend, not a weighing of benefits against drawbacks — and in any case it is only half of what is asked.',
      'direct-questions': '',
    },
  },
  {
    id: 'four-day-week',
    prompt:
      'A growing number of companies allow their employees to work a four-day week on full pay. What are the advantages and disadvantages of this development?',
    instruction: 'What are the advantages and disadvantages?',
    answer: 'advantages-disadvantages',
    tricky: true,
    hint: 'The instruction names exactly what to produce. The useful question is what it does not ask for — compare it word by word with the version you saw earlier that contained “outweigh”.',
    why: 'Both sides, developed. No verdict is requested: “outweigh” is absent, so an essay that announces which side wins has answered a different question. This is the mirror image of the trap in the outweigh version, and it catches students who learned only one of the two.',
    wrong: {
      opinion: 'No proposition is offered and nothing asks whether you agree. Deciding which side wins would be answering a question this prompt did not ask.',
      discussion: 'No groups of people are quoted. You are describing two sides of one development, not two rival beliefs.',
      'problem-solution': 'Nothing is framed as a problem and no measures are requested.',
      'direct-questions': 'One instruction, and it names both halves of a single task. Direct-question prompts ask two different things.',
      'advantages-disadvantages': '',
    },
  },
  {
    id: 'growth-environment',
    prompt:
      'Some people argue that governments should prioritise economic growth above all else. Others believe that environmental protection must take precedence over development. Discuss both views and give your own opinion.',
    instruction: 'Discuss both views and give your own opinion.',
    answer: 'discussion',
    tricky: false,
    hint: 'The instruction is explicit here. The only real decision left is how much of the essay each of its demands deserves.',
    why: 'Both views, developed to a comparable depth, and then your own judgement. The failure that costs most in this type is not missing a view — it is a conclusion that says both sides have merit and stops there.',
    wrong: {
      opinion: 'An opinion is required, but not on its own. Arguing only for growth or only for the environment leaves both stated views undeveloped.',
      'advantages-disadvantages': 'The two positions are what people believe, not the upside and downside of one policy.',
      'problem-solution': 'No measures are requested. Two beliefs about priorities are being compared.',
      'direct-questions': 'One instruction, not two questions. “Discuss both views and give your own opinion” is a single standard instruction, however many clauses it contains.',
      discussion: '',
    },
  },
];

/* ── Análisis crítico: ensayos que respondieron al enunciado equivocado ─────────────── */

export type MisreadCase = {
  id: string;
  prompt: string;
  required: EssayTypeId;
  wrote: EssayTypeId;
  /** El ensayo del estudiante, párrafo a párrafo. */
  essay: { label: string; text: string }[];
  /** Qué delata el tipo que escribió, sin nombrarlo. */
  tell: string;
  /** Qué se perdió al responder al enunciado equivocado. */
  cost: string;
  /** El párrafo que sí respondía al enunciado real. */
  fix: { label: string; text: string };
  /** Por qué NO es cada uno de los otros cuatro. */
  wrong: Record<EssayTypeId, string>;
};

export const MISREAD_CASES: MisreadCase[] = [
  {
    id: 'social-media',
    prompt:
      'Social media companies should be held legally responsible for harmful content posted on their platforms. Do you agree or disagree?',
    required: 'opinion',
    wrote: 'discussion',
    essay: [
      { label: 'Introduction', text: 'There are valid arguments both for and against holding social media companies accountable for user content. This essay will examine both perspectives.' },
      { label: 'Body 1', text: 'On one hand, social media companies profit from user engagement, so they should bear responsibility for what appears on their platforms…' },
      { label: 'Body 2', text: 'On the other hand, with billions of posts daily, full moderation is technically and financially impossible for any company…' },
      { label: 'Conclusion', text: 'In conclusion, there are compelling arguments on both sides. Whether companies should be responsible is a complex issue with no clear answer.' },
    ],
    tell: '“This essay will examine both perspectives”, then “on one hand… on the other hand”, and a conclusion that declines to decide. Every structural signal points the same way.',
    cost: 'The prompt asked whether the writer agrees. This essay never answers, and “no clear answer” is the one ending the question rules out. Everything else — the grammar, the range, the linking — is being marked on an essay that answered a question it was not asked.',
    fix: {
      label: 'What the introduction had to do',
      text: 'I firmly believe that social media companies should be held legally accountable for harmful content on their platforms. The revenue they earn from engagement makes the argument that moderation is impractical difficult to sustain.',
    },
    wrong: {
      opinion: 'An opinion essay states a position and defends it. This one opens by promising to examine both perspectives and closes saying there is no clear answer — the opposite move.',
      'problem-solution': 'No causes are diagnosed and no measures are proposed. Both body paragraphs argue about responsibility, they do not fix anything.',
      'advantages-disadvantages': 'Close, because the shape looks similar. But the two paragraphs are arguments for and against a proposition, not the benefits and drawbacks of a development.',
      'direct-questions': 'Only one question was asked, and the essay does not split into two separate answers.',
      discussion: '',
    },
  },
  {
    id: 'housing',
    prompt:
      'The cost of housing in many cities has risen sharply, making it unaffordable for young people. Why is this happening? Do you think this is a positive or negative development?',
    required: 'direct-questions',
    wrote: 'problem-solution',
    essay: [
      { label: 'Introduction', text: 'Housing affordability is a serious problem in many cities caused by several economic factors. Governments must act urgently.' },
      { label: 'Body 1', text: 'One key cause is the rise of property investment by wealthy individuals and corporations, which drives prices beyond what most people can afford…' },
      { label: 'Body 2', text: 'Governments could introduce rent controls and invest in social housing to increase supply and reduce prices for young people…' },
      { label: 'Conclusion', text: 'If these measures are adopted, the housing crisis could be resolved and young people could afford to live in cities again.' },
    ],
    tell: 'Body 1 gives a cause, Body 2 proposes measures, and the conclusion is conditional on those measures being adopted. The essay is answering a question about what should be done.',
    cost: 'Body 1 was right: the first question did ask why. Body 2 answered a question the prompt never asked. The evaluation — is this positive or negative? — is simply missing, and it was half the task.',
    fix: {
      label: 'What Body 2 had to do',
      text: 'This trend is a clearly negative development. When young people cannot afford to live near their workplaces they face longer commutes and higher living costs, and housing insecurity is closely linked to couples delaying or abandoning plans to start families — a consequence that outlasts any single housing cycle.',
    },
    wrong: {
      'direct-questions': 'That is what the prompt asked for, not what the student produced. The second question — positive or negative — is never answered anywhere in the essay.',
      opinion: 'No proposition is stated and defended. The essay diagnoses and then prescribes.',
      discussion: 'No two views are presented. Nobody in this essay disagrees with anybody.',
      'advantages-disadvantages': 'No benefits of rising housing costs are set against the drawbacks. Body 2 is a list of measures, not a list of upsides.',
      'problem-solution': '',
    },
  },
  {
    id: 'museums',
    prompt:
      'Some people think museums should be free to enter for everyone. Others believe visitors should pay for admission. Discuss both views and give your own opinion.',
    required: 'discussion',
    wrote: 'opinion',
    essay: [
      { label: 'Introduction', text: 'Museums should be free for everyone, and I strongly believe charging for entry damages the very purpose these institutions exist for.' },
      { label: 'Body 1', text: 'Free access means that families on low incomes visit at all, and repeat visits are what turn a collection into an education rather than a single day out…' },
      { label: 'Body 2', text: 'Furthermore, national collections were mostly assembled with public money, so charging the public twice for the same objects is difficult to justify…' },
      { label: 'Conclusion', text: 'For these reasons, admission to museums should remain free of charge for every visitor.' },
    ],
    tell: 'A position in the first sentence, two paragraphs of reasons for that same position, and a conclusion that repeats it. Nowhere does the second view get a paragraph of its own.',
    cost: 'The essay is well built — and that is what makes this case worth reading. The instruction asked for both views and an opinion. One view is missing entirely, so a strong essay is still capped on the criterion that asks whether the task was addressed.',
    fix: {
      label: 'What Body 2 had to do',
      text: 'Those who defend an entry fee point to the running costs a large collection carries: conservation, security and climate control continue whether or not anyone visits. Where public funding has fallen, a modest charge has in several cases been what kept the doors open at all.',
    },
    wrong: {
      discussion: 'That is what the prompt asked for, not what the student produced. The paying-visitors view is never developed — it is not even stated.',
      'problem-solution': 'Nothing is diagnosed and nothing is proposed. Both paragraphs argue for free entry.',
      'advantages-disadvantages': 'Only one side appears. There are no drawbacks of free entry anywhere in the essay.',
      'direct-questions': 'One instruction was given, and the essay does not split into answers to two questions.',
      opinion: '',
    },
  },
];

/** Para los mensajes: «Discussion», «Direct questions»… sin repetir la tabla. */
export const typeLabel = label;
