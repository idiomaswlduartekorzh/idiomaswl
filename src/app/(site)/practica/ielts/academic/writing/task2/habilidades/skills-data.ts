/**
 * Las siete habilidades transversales que solo eran una ficha.
 *
 * De las diez que anuncia el hub de Task 2, tres tenían recorrido propio —paraphrasing,
 * linking language y academic vocabulary— y siete eran fichas que enlazaban a la etapa donde
 * la habilidad se practica de paso. Para navegar eso vale; para aprender la habilidad no,
 * porque la etapa enseña a construir un párrafo y la habilidad atraviesa todos.
 *
 * «Topic sentences» es el ejemplo claro: la ficha llevaba a Body 1, donde se aprende a montar
 * el primer párrafo de cuerpo. Pero una topic sentence se escribe en Body 1, en Body 2 y en
 * cualquier párrafo de Task 1 que tenga más de una frase, y lo que decide si está bien no es
 * el párrafo: es si nombra UNA idea y si alguien podría discrepar de ella. Eso no cabe dentro
 * de la lección de una etapa sin desplazarla.
 *
 * Las siete llevan los cuatro bloques del blueprint, igual que las tres que ya lo tenían.
 */

import type { Explainer, GuidedExercise } from '../../_shared/skill-blueprint';

export type SkillExample = { sentence: string; doing: string; why: string };
export type SkillMistake = { wrong: string; why: string; right: string };
export type SkillDrill = {
  stem: string;
  options: { text: string; why: string }[];
  /** Índice tal y como está escrito; la posición la reparte `placeOption`. */
  correct: number;
};

export type TransferableSkill = {
  slug: string;
  label: string;
  spanishName: string;
  seoTitle: string;
  seoDescription: string;
  job: string;
  whenToUse: string;
  tone: 'prompt' | 'claim' | 'development' | 'contrast' | 'link' | 'evidence' | 'review';
  /** Dónde se practica dentro del curso, para que la ficha siga llevando allí. */
  practisedIn: { label: string; href: string };
  explainer: Explainer;
  examples: SkillExample[];
  mistakes: SkillMistake[];
  guided: GuidedExercise;
  drills: SkillDrill[];
};

export const TRANSFERABLE_SKILLS: TransferableSkill[] = [
  {
    slug: 'thesis-and-position',
    label: 'Thesis and position',
    spanishName: 'La tesis y la postura',
    seoTitle: 'Cómo escribir la tesis de un ensayo IELTS: tomar postura y sostenerla',
    seoDescription: 'Qué es una tesis en un ensayo de IELTS, con qué fuerza tomarla y cómo mantenerla visible en los cuatro párrafos. Con ejemplos, ejercicio guiado y ejercicios corregidos.',
    job: 'it states the answer to the question and keeps that answer visible from the first paragraph to the last',
    whenToUse: 'Every Task 2 essay. It is written in the introduction, defended in the body and restated in the conclusion — which is why a thesis that drifts is not one problem but three.',
    tone: 'claim',
    practisedIn: { label: 'Build the introduction', href: '/practica/ielts/academic/writing/task2/introduccion' },
    explainer: {
      definition: 'A thesis is the answer your essay gives to the question it was asked, stated at a strength you can defend across four paragraphs.',
      sections: [
        {
          heading: 'A topic is not a position',
          body: [
            'The commonest failure is not a weak thesis but an absent one. “This essay will discuss the advantages and disadvantages of remote working” announces a topic and commits to nothing, and an essay that opens that way tends to end with “there are arguments on both sides” — which answers no question that was actually asked. The test is mechanical: could a reasonable person disagree with your sentence? If not, it is a description of the territory rather than a position in it.',
            'The second failure is drift. A thesis stated at full strength in the introduction and then quietly qualified in Body 2 leaves an essay arguing against itself, and readers take the last thing they read as your view. This is why choosing the strength is a decision about the whole essay rather than about one sentence: “largely agree” buys you the room to concede that “completely agree” does not, and the concession is usually already planned before the introduction is written.',
            'What a thesis does not need is a preview of your reasons. “I agree for two reasons: firstly cost, secondly time” has spent both body paragraphs before either one exists, and it is mistaken for signposting so often that it deserves naming as the specific error it is.',
          ],
          points: [
            { term: 'Arguable, or it is not a thesis', detail: 'If nobody could disagree, you have named a topic. “Education is important” is not a position.' },
            { term: 'Strength is a promise', detail: '“Largely” leaves room to concede. “Completely” does not, and your Body 2 will need some.' },
            { term: 'Visible in all four paragraphs', detail: 'Introduction states it, bodies defend it, conclusion restates it. Missing from any of the three and it drifts.' },
            { term: 'No reasons in the thesis', detail: 'Previewing your two reasons empties the two paragraphs that were going to make them.' },
          ],
        },
      ],
      cost: 'Task Response is assessed partly on whether a clear position is present throughout, so an absent thesis costs directly and a drifting one costs twice — once where it was stated and again where it was contradicted. And an essay without a position cannot have a conclusion, because there is nothing to restate: those paragraphs end up summarising the question instead of answering it.',
      limits: 'A thesis is not an argument and cannot substitute for one: stating your position more forcefully does not support it. It also does not fit every prompt equally — a “discuss both views and give your opinion” instruction needs both the discussion and the position, and an essay that opens by committing hard often forgets to discuss the view it rejected.',
    },
    examples: [
      { sentence: 'This essay will largely support that view, while acknowledging that rural areas present a genuine exception.', doing: 'largely · while acknowledging', why: 'Committed and qualified in one sentence. “Largely” and “while acknowledging” both promise the concession the body is going to make, so the essay cannot contradict itself later.' },
      { sentence: 'While remote working undoubtedly offers flexibility, its costs to junior employees have been consistently understated.', doing: 'While … undoubtedly · consistently understated', why: 'The concession comes first and the position second, which makes the position read as considered. Note that the strong word is spent on the claim, not on the concession.' },
    ],
    mistakes: [
      { wrong: 'This essay will discuss the advantages and disadvantages of remote working.', why: 'A topic, not a position. Nobody could disagree with it, and the essay that follows has nothing to defend.', right: 'This essay will argue that the advantages of remote working outweigh its costs for most office-based roles.' },
      { wrong: 'I completely agree. However, in some cases the opposite may be true.', why: 'The thesis contradicts itself inside two sentences. “Completely” left no room, and the qualification took some anyway.', right: 'I largely agree, though the case is weaker where public transport is limited.' },
    ],
    guided: {
      brief: 'Prompt: “Some people think that all museums should be free to enter. To what extent do you agree or disagree?”',
      goal: 'Build a thesis you can defend for four paragraphs — starting from what you plan to concede.',
      steps: [
        { instruction: 'Decide what you will concede BEFORE choosing your strength', hint: 'What is the strongest objection to your view? Write it. This decides whether you can say “completely”.', minWords: 8, placeholder: 'The strongest objection is …', model: 'The strongest objection is funding: free entry has to be paid for, and specialist collections are expensive to keep.', why: 'Deciding the concession first is what fixes the strength. Done in the other order, the introduction promises more than the body can keep.' },
        { instruction: 'Choose the strength that leaves room for it', hint: 'Given that concession, which is honest: completely, largely, or partly? Say which and why.', minWords: 6, placeholder: 'I would use … because …', model: '“Largely”, because I am going to concede the funding point and “completely” would make that concession a contradiction.', why: 'The word is a promise about the whole essay. This is the sentence where a writer commits to more than they will deliver, and they do it in the first minute.' },
        { instruction: 'Write the thesis — with no reasons in it', hint: 'One sentence. Arguable, at the strength you chose, and without previewing your body paragraphs.', minWords: 12, placeholder: 'This essay will largely agree that …', model: 'This essay will largely agree that permanent collections should be free, while accepting that temporary exhibitions may reasonably charge.', why: 'Arguable, qualified, and it names no reasons — so Body 1 and Body 2 still have their work to do. Adding “for two reasons: firstly…” here would have emptied both.' },
      ],
      result: 'This essay will largely agree that permanent collections should be free, while accepting that temporary exhibitions may reasonably charge.',
    },
    drills: [
      { stem: 'Which of these is a thesis rather than a topic?', correct: 0, options: [
        { text: 'Free museum entry is justified for permanent collections but not for temporary exhibitions.', why: 'Correct. Somebody could disagree with it, which is the whole test.' },
        { text: 'This essay will discuss the advantages and disadvantages of free museum entry.', why: 'A topic. It announces the territory and commits to no position in it.' },
        { text: 'Museums are an important part of a country’s cultural life.', why: 'Nobody would disagree, so there is nothing to argue and nothing to defend.' },
        { text: 'There are many different opinions about whether museums should be free.', why: 'It reports that a debate exists. The prompt already told you that.' },
      ]},
      { stem: 'Your Body 2 will concede one significant exception. Which thesis is honest?', correct: 0, options: [
        { text: 'This essay largely agrees, with one significant qualification.', why: 'Correct. “Largely” and “one qualification” both leave the room Body 2 is going to use.' },
        { text: 'This essay completely agrees with the statement.', why: 'The concession in Body 2 will contradict this, and readers take the later one as your view.' },
        { text: 'This essay agrees to some extent with certain aspects of the statement.', why: 'So hedged that no position is visible, which is what Task Response is looking for.' },
        { text: 'This essay agrees, for two reasons: cost and access.', why: 'The strength is fine and both body paragraphs have just been spent in the introduction.' },
      ]},
      { stem: 'Where should the thesis be visible?', correct: 0, options: [
        { text: 'In the introduction, defended in both bodies, and restated in the conclusion.', why: 'Correct. A position assessed “throughout” has to appear throughout, not once at the top.' },
        { text: 'In the introduction only — repeating it later is redundant.', why: 'A position stated once and never defended is one the examiner cannot see being maintained.' },
        { text: 'In the conclusion, once the argument has led up to it.', why: 'A reader who reaches Body 2 without knowing your position cannot follow what the paragraphs are for.' },
        { text: 'In every sentence, so the reader cannot lose track of it.', why: 'That is repetition, not consistency, and it leaves no room for the reasoning.' },
      ]},
    ],
  },

  {
    slug: 'topic-sentences',
    label: 'Topic sentences',
    spanishName: 'Las frases temáticas',
    seoTitle: 'Topic sentence en inglés: cómo abrir un párrafo con una sola idea',
    seoDescription: 'Qué es una topic sentence, por qué debe contener una sola idea discutible y cómo evitar que el párrafo se disperse. Con ejemplos, guiado y ejercicios corregidos.',
    job: 'it opens a paragraph by naming the one claim that paragraph exists to support',
    whenToUse: 'The first sentence of every body paragraph, in both tasks. It is also the sentence that decides whether the paragraph will develop an idea or list several, which makes it worth more than its length suggests.',
    tone: 'development',
    practisedIn: { label: 'Build Body 1', href: '/practica/ielts/academic/writing/task2/body-1' },
    explainer: {
      definition: 'A topic sentence names the single claim a paragraph will support, and it commits the rest of the paragraph to staying on it.',
      sections: [
        {
          heading: 'One idea, or the paragraph drifts',
          body: [
            'A topic sentence that names two ideas gives the paragraph permission to wander between them, and the paragraph almost always takes it. “Public transport is cheaper and better for the environment” looks efficient and produces a paragraph that half-argues two things — which reads as a list, because it is one. Naming one idea forces every following sentence to answer to it, and that constraint is the whole point of the sentence.',
            'The second requirement is that the claim be arguable. “Many people use public transport” is a fact, and a paragraph cannot develop a fact: there is nothing to support, so the sentences that follow can only add more facts. “Public transport is underfunded relative to its usage” is contestable, and everything after it has a job.',
            'The third is that it belong to the essay. A topic sentence has to advance the thesis, not merely introduce a subject that is nearby — a paragraph that opens with a true, arguable claim your position does not need is a paragraph the examiner cannot connect to the answer.',
          ],
          points: [
            { term: 'One claim', detail: 'Two ideas in the opening sentence produce a paragraph that argues neither properly.' },
            { term: 'Arguable', detail: 'If nobody could disagree, the paragraph has nothing to develop and can only add facts.' },
            { term: 'Connected to the thesis', detail: 'It has to move your position forward, not merely be about the same topic.' },
            { term: 'First, not buried', detail: 'A claim that arrives in sentence four leaves the reader three sentences without knowing what the paragraph is for.' },
          ],
        },
      ],
      cost: 'A two-idea topic sentence costs on Coherence directly: the paragraph has no single controlling idea, which is exactly what the criterion describes. It costs again on development, because two half-argued ideas score below one properly extended — and the writer usually experiences the paragraph as richer, not thinner, which is why the error survives rereading.',
      limits: 'A topic sentence is not a summary of the paragraph, and writing it as one produces an opening that gives away the reasoning before the reasoning happens. It also does not belong in the introduction or conclusion: those paragraphs have their own jobs, and a topic sentence in the introduction is usually a thesis with the reasons attached.',
    },
    examples: [
      { sentence: 'The most compelling argument for restricting city-centre traffic is the measurable improvement in air quality.', doing: 'The most compelling argument … is', why: 'One claim, arguable, and marked as the strongest — so the paragraph beneath it knows it has to earn that description. Naming a second benefit here would have licensed the paragraph to drift.' },
      { sentence: 'Free entry matters most for the visitors least likely to come back a second time.', doing: 'matters most for', why: 'Narrow enough that the paragraph can actually support it, and contestable enough that supporting it is worth doing. A reader can disagree, which is what makes the following sentences necessary.' },
    ],
    mistakes: [
      { wrong: 'Public transport is cheaper and better for the environment.', why: 'Two ideas, so the paragraph will argue each one halfway. It reads as efficiency and produces a list.', right: 'Public transport is substantially cheaper per journey than private car use.' },
      { wrong: 'Many people in cities use public transport every day.', why: 'A fact, not a claim. Nothing follows from it, so the paragraph can only add more facts.', right: 'Public transport is underfunded relative to the number of journeys it carries.' },
    ],
    guided: {
      brief: 'Your thesis: cities should restrict private cars in the centre. You are writing Body 1 on the health case.',
      goal: 'Write a topic sentence that forces the paragraph to stay on one idea.',
      steps: [
        { instruction: 'Write the two ideas you could open with', hint: 'Air quality and noise are both health arguments. Write both — you are going to discard one.', minWords: 8, placeholder: 'Idea 1: … Idea 2: …', model: 'Idea 1: restricting traffic improves air quality. Idea 2: it reduces noise-related stress.', why: 'Seeing both written down is what makes the choice visible. Combined into one sentence they look like a richer paragraph and produce a thinner one.' },
        { instruction: 'Choose one, and make it arguable', hint: 'Pick the stronger. Then check: could somebody disagree? If not, sharpen it until they could.', minWords: 8, placeholder: 'The most compelling argument is …', model: 'The most compelling argument for restricting city-centre traffic is the measurable improvement in air quality.', why: '“Measurable” is what makes it contestable — somebody could deny the improvement is measurable, and that disagreement is what the paragraph now has to answer.' },
        { instruction: 'Check it against the thesis', hint: 'Does this sentence advance your position, or is it merely about the same topic? Write which and why.', minWords: 8, placeholder: 'It advances the thesis because …', model: 'It advances the thesis: the claim is a reason to restrict traffic, not merely a fact about traffic.', why: 'A true, arguable claim that the position does not need is a paragraph the examiner cannot connect to the answer — and it is the hardest kind of drift to notice while writing.' },
      ],
      result: 'The most compelling argument for restricting city-centre traffic is the measurable improvement in air quality.',
    },
    drills: [
      { stem: 'Which is the strongest topic sentence for a paragraph arguing that libraries deserve more funding?', correct: 0, options: [
        { text: 'Public libraries reach precisely the readers that commercial provision does not.', why: 'Correct. One claim, arguable, and it gives the paragraph something specific to support.' },
        { text: 'Public libraries are important and they are also used by many people.', why: 'Two ideas, and the second is a fact. The paragraph will half-argue one and list the other.' },
        { text: 'There are several reasons why public libraries deserve more funding.', why: 'It promises a list and names no claim, so the paragraph has to deliver the list.' },
        { text: 'Public libraries have existed in most countries for over a century.', why: 'A fact. Nothing follows from it, and the paragraph can only add more facts.' },
      ]},
      { stem: 'Your topic sentence names two benefits. What is the likely consequence?', correct: 0, options: [
        { text: 'The paragraph argues each one halfway and reads as a list.', why: 'Correct. Two ideas in the opening licenses the paragraph to move between them, and it will.' },
        { text: 'The paragraph will be more persuasive because it covers more ground.', why: 'Coverage is not development, and the criterion rewards an idea extended rather than several announced.' },
        { text: 'The examiner will credit the range of ideas.', why: 'Range of ideas is not what a body paragraph is assessed on; development of one is.' },
        { text: 'Nothing, as long as both benefits are true.', why: 'Both can be true and neither supported. Truth is not the problem here.' },
      ]},
      { stem: 'Where should the topic sentence go?', correct: 0, options: [
        { text: 'First, so every following sentence answers to it.', why: 'Correct. Its function is to constrain the paragraph, and it cannot constrain what came before it.' },
        { text: 'Last, as the conclusion the paragraph builds towards.', why: 'That leaves the reader without a controlling idea for the whole paragraph.' },
        { text: 'Second, after an example that introduces the subject.', why: 'An example before the claim is an example of nothing yet.' },
        { text: 'Anywhere, as long as the idea is clear by the end.', why: 'The reader cannot know what the paragraph is for until it arrives, which is the cohesion problem.' },
      ]},
    ],
  },
];
