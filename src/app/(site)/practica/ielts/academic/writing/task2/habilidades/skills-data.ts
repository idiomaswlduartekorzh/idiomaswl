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

  {
    slug: 'explanation-and-development',
    label: 'Explanation and development',
    spanishName: 'Explicar y desarrollar una idea',
    seoTitle: 'Desarrollar una idea en un ensayo en inglés: la diferencia entre lista y cadena',
    seoDescription: 'Cómo desarrollar un argumento en inglés en vez de acumular afirmaciones. La cadena de consecuencias, con ejemplos, ejercicio guiado y ejercicios corregidos.',
    job: 'it takes one claim and follows it, instead of stating four claims and following none',
    whenToUse: 'Inside every body paragraph, in both tasks. It is the single largest difference between a mid-band response and a strong one, and it is invisible to the writer because four true statements feel richer than one developed argument.',
    tone: 'development',
    practisedIn: { label: 'Body paragraphs', href: '/practica/ielts/academic/writing/task2/parrafos-cuerpo' },
    explainer: {
      definition: 'Development is following one claim through its consequences, so that a paragraph reasons rather than accumulates.',
      sections: [
        {
          heading: 'A list and a chain look the same length',
          body: [
            'Four sentences stating four things about a topic can all be true, well written and correctly linked, and still show nothing. What they demonstrate is that the writer knows several facts. A chain — because of this, which means that, which in turn produces this — demonstrates that the writer can reason, and reasoning is what the criterion means by development. The two occupy identical space on the page, which is why the weaker one survives rereading: nothing about it looks wrong.',
            'The mechanism is a question you ask after each sentence: so what follows from that? Answering it produces the next sentence. Answering “what else is true about this topic?” instead produces a list, and the difference between the two questions is the whole skill. Writers who list are not being lazy; they are answering the wrong question, and usually the more natural one.',
            'The vocabulary that carries a chain is small and specific: “this stems from”, “which in turn”, “consequently”, “the implication is that”. What kills a chain is the word that adds instead: every “and also” is a place where a consequence could have gone, and a paragraph with two of them has almost certainly stopped developing anything.',
          ],
          points: [
            { term: 'Ask “so what follows?”', detail: 'Not “what else is true?”. The first question produces a chain, the second a list.' },
            { term: 'One idea, five sentences', detail: 'Better than five ideas with one sentence each — and the same length.' },
            { term: 'Three or four links', detail: 'A chain has a natural end. The fourth link is usually the one you cannot defend.' },
            { term: '“And also” is the warning sign', detail: 'Two in a paragraph and the paragraph is accumulating rather than reasoning.' },
          ],
        },
      ],
      cost: 'This is where a response stalls at mid-band without anything looking wrong. Everything in the paragraph is true, nothing is reasoned, and no amount of vocabulary or grammar work moves the score — because what is missing is not language. It also wastes the words: a paragraph of assertions uses the same space as a developed one and demonstrates less.',
      limits: 'A chain can be extended too far. Three or four links is the natural length, and the last one is typically the step you cannot support — “which in turn will transform the economy” is where a good paragraph goes to overreach. Development also cannot rescue a topic sentence that names two ideas: the paragraph has been given permission to drift before development begins.',
    },
    examples: [
      { sentence: 'Investment in public transport eases congestion. As fewer private vehicles compete for road space, journey times fall for everyone, which in turn makes the network more attractive to the drivers who remain.', doing: 'As … which in turn', why: 'One claim followed for three steps, and no new idea introduced anywhere. Everything after the first sentence is a consequence of it — which is the test.' },
      { sentence: 'The shortage stems from decades of under-building rather than from recent demand, and it is therefore unlikely to ease without a sustained programme of construction.', doing: 'stems from … rather than · therefore', why: 'The cause is named, a rival cause is ruled out, and a consequence is drawn from the diagnosis. Three moves in one sentence, and each one follows from the last.' },
    ],
    mistakes: [
      { wrong: 'Public transport is cheap. It is also environmentally friendly. And also it reduces traffic. Many cities have good systems.', why: 'Four claims and no development. Every sentence starts a new idea, so none is followed, and two “also”s mark where consequences should have been.', right: 'Public transport is cheaper per journey, which puts it within reach of households that would otherwise be priced out of commuting altogether.' },
      { wrong: 'Cycling improves health, which improves productivity, which grows the economy, which funds better healthcare.', why: 'Four links, and the last two are unsupported. A chain has a natural end, and this one passed it two steps ago.', right: 'Cycling improves health, which reduces the burden of preventable illness on employers.' },
    ],
    guided: {
      brief: 'Your claim: “Free museum entry benefits the visitors who are least likely to return.”',
      goal: 'Follow it for three steps, without introducing a second idea.',
      steps: [
        { instruction: 'Ask “so what follows?” once', hint: 'Not what else is true about museums. What follows from THIS claim? One sentence.', minWords: 10, placeholder: 'Because entry is free, …', model: 'Because there is no cost to a short visit, a first-time visitor can leave after twenty minutes without feeling they wasted money.', why: 'This is a consequence, not a second benefit. “Museums are also educational” would have been true and would have started the list.' },
        { instruction: 'Ask it again', hint: 'Now what follows from the sentence you just wrote? Stay on the same thread.', minWords: 10, placeholder: 'That in turn means …', model: 'That lowers the barrier to a second visit, since the first one carried no risk of disappointment.', why: 'Second link, same thread. Notice the paragraph is getting more specific rather than broader, which is what following a chain feels like.' },
        { instruction: 'Write the paragraph, and stop at three links', hint: 'Join the claim and both consequences. Then check: is there a fourth link you could not defend? Do not write it.', minWords: 20, placeholder: 'Free museum entry benefits …', model: 'Free museum entry benefits the visitors least likely to return. Because a short visit costs nothing, a first-time visitor can leave after twenty minutes without feeling they wasted money, which lowers the barrier to coming back.', why: 'Three links and it stops. “Which in turn raises national cultural literacy” would have been the fourth, and it is the one a reader would question.' },
      ],
      result: 'Free museum entry benefits the visitors least likely to return. Because a short visit costs nothing, a first-time visitor can leave after twenty minutes without feeling they wasted money, which lowers the barrier to coming back.',
    },
    drills: [
      { stem: 'Which sentence develops “remote work reduces commuting costs” rather than listing?', correct: 0, options: [
        { text: 'That saving is largest for the lowest-paid, who spend the greatest share of income on transport.', why: 'Correct. It follows from the claim and makes it more specific, which is what a second link does.' },
        { text: 'Remote work also improves the work–life balance of a great many office employees.', why: 'A second benefit, not a consequence of the first. This is where a paragraph becomes a list.' },
        { text: 'Many companies across several different sectors have adopted remote work since 2020.', why: 'A fact about the topic. Nothing in it follows from the claim.' },
        { text: 'Commuting remains expensive in most of the large cities right across the developed world.', why: 'It restates the premise rather than drawing anything from it.' },
      ]},
      { stem: 'You have written three links in your chain. What is the risk of adding a fourth?', correct: 0, options: [
        { text: 'The fourth is usually the step you cannot defend.', why: 'Correct. Chains overreach at the end, and one unsupported link invites doubt about the three before it.' },
        { text: 'The paragraph will become too long for the word count.', why: 'Length is not the problem; a fourth sentence is affordable. What it costs is credibility.' },
        { text: 'The examiner will not follow more than three steps.', why: 'Readers follow chains fine. The issue is whether the last step is supported.' },
        { text: 'None — more development is always better.', why: 'Development has a natural end, and past it the paragraph is asserting rather than reasoning.' },
      ]},
      { stem: 'Which question produces development?', correct: 0, options: [
        { text: 'So what follows from that?', why: 'Correct. It forces the next sentence to depend on the last one, which is what a chain is.' },
        { text: 'What else is true about this topic?', why: 'The more natural question, and the one that produces a list of true statements.' },
        { text: 'What is another advantage I could mention?', why: 'It adds an item. Every item added is a consequence not drawn.' },
        { text: 'How can I say this in more academic language?', why: 'A vocabulary question. It improves the sentence and does not develop the idea.' },
      ]},
    ],
  },

  {
    slug: 'examples-and-evidence',
    label: 'Examples and evidence',
    spanishName: 'Ejemplos y evidencia',
    seoTitle: 'Poner ejemplos en un ensayo IELTS sin inventar fuentes ni estadísticas',
    seoDescription: 'Cómo apoyar una idea en IELTS Writing con ejemplos que ilustran sin inventar estudios ni porcentajes. Con ejemplos resueltos, guiado y ejercicios corregidos.',
    job: 'it makes an abstract claim concrete, without pretending to a source you do not have',
    whenToUse: 'Once per body paragraph, after the claim has been explained. It is also where the most self-inflicted damage in Task 2 happens, because inventing a statistic feels like rigour while you are doing it.',
    tone: 'evidence',
    practisedIn: { label: 'Body paragraphs', href: '/practica/ielts/academic/writing/task2/parrafos-cuerpo' },
    explainer: {
      definition: 'An example shows an abstract claim in operation. It illustrates; it does not prove, and no wording will make it prove.',
      sections: [
        {
          heading: 'You have no sources, and you are not expected to',
          body: [
            'The exam gives you no reading material and no data. Every citation in a Task 2 response is therefore either general knowledge or invention, and examiners read a great many of the second kind. “A recent study found that 73% of employees…” is a fabricated fact; it reads as rigour to the person writing it and as fabrication to the person marking it, and once a reader has seen one, every other claim in the essay is read with suspicion.',
            'What an example can legitimately do is make the abstract visible. A claim about congestion charging becomes checkable when a reader can picture central London; a claim about ageing populations becomes concrete when Japan is named. That is genuinely useful — a reader who has seen the claim in operation understands it better — and it requires no source at all, because you are pointing at something widely known rather than citing a measurement.',
            'The line between the two is the verb. “A case in point is” and “this can be seen in” illustrate. “Studies have proven” and “research shows that 68%” claim a measurement. The first pair costs nothing and the second buys a risk you did not need.',
          ],
          points: [
            { term: 'Illustrate, do not cite', detail: '“A case in point is” needs no source. “A 2019 study found” needs one you do not have.' },
            { term: 'No invented figures', detail: 'A percentage with no source is fabricated, and hedging it makes it worse rather than safer.' },
            { term: 'General knowledge is fine', detail: 'Naming London, Japan or the pandemic is pointing at something known, not citing a measurement.' },
            { term: 'One per paragraph', detail: 'A paragraph that is mostly example has stopped arguing and started describing.' },
          ],
        },
      ],
      cost: 'An invented statistic damages beyond its own sentence: it puts every other claim under suspicion, including the ones that were solid. And a paragraph with no example at all leaves an abstract claim abstract — the criterion asks for ideas that are extended and supported, and an unillustrated claim has been asserted twice rather than supported once.',
      limits: 'An example cannot carry the argument. If the paragraph is mostly example, the reasoning was never written and the case rests on one anecdote. It must also actually be a case of your claim: an example that illustrates something adjacent is worse than none, because the reader now has to work out what it was for and concludes you did not.',
    },
    examples: [
      { sentence: 'A case in point is central London, where traffic entering the charging zone fell in the first year of the scheme.', doing: 'A case in point is', why: 'Concrete, widely known, and it needs no citation. Adding “by 18%” would have turned a safe illustration into an invented measurement.' },
      { sentence: 'This can be seen in countries with ageing populations, where the ratio of workers to retirees has shifted within a single generation.', doing: 'This can be seen in', why: 'It points at a well-known pattern without naming a study or a number. The reader can verify the shape of the claim from general knowledge, which is all an example needs.' },
    ],
    mistakes: [
      { wrong: 'Studies have proven that 68% of commuters would switch to rail if services improved.', why: 'Two fabrications: a study you cannot cite and a figure you invented. Research also indicates rather than proves.', right: 'Commuters are widely reported to be willing to switch where services are reliable.' },
      { wrong: 'For example, my cousin stopped driving to work after the charge was introduced.', why: 'A single personal anecdote is not an example of a general claim, and Task 2 is not a personal essay.', right: 'For example, cities that have introduced charges report measurable falls in central traffic.' },
    ],
    guided: {
      brief: 'Your claim: “Public libraries reach readers that commercial provision does not.”',
      goal: 'Support it with an example that illustrates — and stays defensible.',
      steps: [
        { instruction: 'Name a concrete case', hint: 'Something widely known. No percentages, no studies, nothing you would have to cite.', minWords: 8, placeholder: 'A case in point is …', model: 'A case in point is the role libraries play for people without home internet access.', why: 'Widely known, verifiable from general knowledge, and it needs no source. That is the whole standard an example has to meet.' },
        { instruction: 'Say what it shows, and what it does not', hint: 'One sentence. Naming the limit of your own example is what separates illustration from an overclaim.', minWords: 8, placeholder: 'This shows … although …', model: 'This shows the gap commercial provision leaves, although it does not establish how large that gap is.', why: 'Conceding the limit costs one clause and removes the objection a reader was about to make. It also signals that you know the difference between illustrating and proving.' },
        { instruction: 'Write claim and example together', hint: 'Claim, then example, then the limit. Check no number has crept in.', minWords: 18, placeholder: 'Public libraries reach readers …', model: 'Public libraries reach readers that commercial provision does not. A case in point is the role they play for people without home internet access, which shows the gap the market leaves even if it does not measure it.', why: 'Illustration doing exactly its job, with its own limit named. No study, no percentage, and nothing a reader could challenge as fabricated.' },
      ],
      result: 'Public libraries reach readers that commercial provision does not. A case in point is the role they play for people without home internet access, which shows the gap the market leaves even if it does not measure it.',
    },
    drills: [
      { stem: 'Which support is safe in a Task 2 response?', correct: 0, options: [
        { text: 'A case in point is the congestion charge introduced in central London.', why: 'Correct. Widely known, needs no citation, and it illustrates rather than claiming a measurement.' },
        { text: 'A 2021 study found that 64% of residents supported the scheme.', why: 'An invented study and an invented figure. You have neither, and the exam expects neither.' },
        { text: 'My friend who lives there says it made a big difference.', why: 'A personal anecdote. It is not evidence of a general claim and the register is conversational.' },
        { text: 'Everybody knows that congestion charges work.', why: 'It invents a consensus in place of the example the paragraph needed.' },
      ]},
      { stem: 'Why is an invented percentage worse than no example at all?', correct: 0, options: [
        { text: 'It puts every other claim in the essay under suspicion.', why: 'Correct. Once a reader has seen one fabrication, the solid claims are read with the same doubt.' },
        { text: 'It uses words that could have gone elsewhere.', why: 'Length is not the issue; a fabricated fact is a credibility problem, not an economy one.' },
        { text: 'It is grammatically more complex and risks errors.', why: 'The grammar is usually fine. That is exactly why it survives a proofread.' },
        { text: 'Examiners are not allowed to accept statistics.', why: 'There is no such rule. The problem is that the statistic is not real.' },
      ]},
      { stem: 'Your paragraph is two-thirds example. What is wrong?', correct: 0, options: [
        { text: 'The reasoning was never written; the case rests on one anecdote.', why: 'Correct. An example illustrates an argument, and here there is no argument for it to illustrate.' },
        { text: 'Nothing at all, provided the example itself is accurate and relevant.', why: 'An accurate example still cannot do the work of the reasoning it was meant to support.' },
        { text: 'The example should have come first, before the claim it illustrates.', why: 'An example before the claim illustrates nothing yet, which is a different problem.' },
        { text: 'It needs a second example alongside the first one to balance it.', why: 'That doubles the description and leaves the argument exactly as unwritten.' },
      ]},
    ],
  },

  {
    slug: 'contrast-and-concession',
    label: 'Contrast and concession',
    spanishName: 'Contraste y concesión',
    seoTitle: 'Contraste y concesión en un ensayo en inglés: conceder sin perder la postura',
    seoDescription: 'Cómo admitir el punto contrario en inglés y seguir defendiendo tu postura. Although, admittedly, nevertheless: el orden correcto, con guiado y ejercicios.',
    job: 'it admits what is true in the opposing view and then explains why your position survives it',
    whenToUse: 'At least once in every essay, and by definition throughout a discussion essay. It is the difference between an argument that has considered the other side and one that has not noticed there is one.',
    tone: 'contrast',
    practisedIn: { label: 'Build Body 2', href: '/practica/ielts/academic/writing/task2/body-2' },
    explainer: {
      definition: 'Concession grants what is true in the objection to your position, and then shows why the position holds anyway.',
      sections: [
        {
          heading: 'Conceding is what makes a position look examined',
          body: [
            'The instinct is that admitting a point against you gives away ground, and the opposite is true for a specific reason: a reader who can think of an obvious objection and does not see you address it concludes you did not think of it. Naming the objection, granting what is genuinely true in it, and then explaining why your position survives is what distinguishes an argument from an assertion — and it is precisely what a “discuss both views” instruction is checking for.',
            'The order is fixed and it is where this goes wrong. Concede first, reverse second. A concession that arrives after your conclusion reads as a retraction of it, because readers take the last thing they read as your view. “Restriction is justified. Admittedly, it penalises rural drivers.” ends on the objection and leaves the reader unsure what you actually think.',
            'The grammar has one recurring trap, and it is a direct carry-over: Spanish allows “aunque… pero”, English does not. “Although the scheme was expensive, but it went ahead” announces one relationship twice. One word, one relationship — and the same goes for “despite” and “although”, which take different things after them: a noun and a clause respectively.',
          ],
          points: [
            { term: 'Concede, then reverse', detail: 'The order is fixed. Ending on the objection reads as changing your mind.' },
            { term: 'Grant something real', detail: 'Conceding a point nobody would make is padding. Concede the objection a reader would raise.' },
            { term: 'Never “although … but”', detail: 'One relationship, one word. The doubled marker comes straight from “aunque … pero”.' },
            { term: 'Noun or clause', detail: '“Despite the cost” takes a noun; “although it was expensive” takes a clause. “Despite it was expensive” is neither.' },
          ],
        },
      ],
      cost: 'An essay with no concession reads as unexamined, and in a discussion essay it fails the instruction outright — half the task was to consider the other view. Conceding in the wrong order costs differently and just as much: the paragraph ends on the objection, so the reader takes that as your position and your conclusion then appears to contradict the body.',
      limits: 'Concession has a floor and a ceiling. Conceding the central claim of your own position leaves nothing to argue, and conceding in every paragraph produces an essay whose position is invisible — which is the failure the skill was supposed to prevent. One well-chosen concession per essay, or one per body paragraph at most, is what a considered argument looks like.',
    },
    examples: [
      { sentence: 'Admittedly, such a policy falls hardest on households with no realistic alternative to driving. Nevertheless, targeted exemptions can address that without abandoning the restriction.', doing: 'Admittedly … Nevertheless', why: 'The strong version of the objection is granted first, and the reversal answers it specifically rather than dismissing it. The paragraph ends on the position, which is where the reader is left.' },
      { sentence: 'While free entry undoubtedly reduces a museum’s independent income, that shortfall is smaller than the public value of the visits it enables.', doing: 'While … undoubtedly', why: 'A concession and a reversal in one sentence. “Undoubtedly” is spent on the objection, which makes granting it look genuine rather than grudging.' },
    ],
    mistakes: [
      { wrong: 'Although the scheme was expensive, but it went ahead anyway.', why: 'One relationship announced twice. English uses “although” or “but”, never both — a direct carry-over from “aunque … pero”.', right: 'Although the scheme was expensive, it went ahead anyway.' },
      { wrong: 'Restriction is clearly justified. Admittedly, it penalises drivers with no alternative.', why: 'The order is reversed, so the paragraph ends on the objection. Readers take the last thing they read as your position.', right: 'Admittedly, restriction penalises drivers with no alternative. It is nevertheless justified where alternatives exist.' },
    ],
    guided: {
      brief: 'Your position: museums should be free. The obvious objection: free entry costs money that has to come from somewhere.',
      goal: 'Concede it and survive it — in that order, with one marker.',
      steps: [
        { instruction: 'State the objection at its strongest', hint: 'Do not weaken it. A concession to a soft version of the objection convinces nobody.', minWords: 8, placeholder: 'Free entry does …', model: 'Free entry removes a reliable income stream at a time when public funding is already contested.', why: 'Granting the strong version is what makes the reversal worth reading. A reader who can think of this and does not see it named assumes you could not answer it.' },
        { instruction: 'Answer it specifically', hint: 'Do not dismiss it — answer the point you just made. One sentence.', minWords: 10, placeholder: 'That shortfall can be …', model: 'That shortfall is smaller than it appears, since charging deters precisely the visitors whose attendance justifies public funding in the first place.', why: 'The reversal engages with the objection rather than changing the subject, which is what makes the concession look genuine rather than rhetorical.' },
        { instruction: 'Join them, and check the order and the markers', hint: 'Concession first. One marker for one relationship — confirm you have not written “although … but”.', minWords: 18, placeholder: 'Admittedly, …', model: 'Admittedly, free entry removes a reliable income stream at a time when public funding is already contested. That shortfall is nevertheless smaller than it appears, since charging deters precisely the visitors whose attendance justifies the funding.', why: 'Concession, then reversal, ending on the position. Two markers doing two different jobs, and no doubled connector anywhere.' },
      ],
      result: 'Admittedly, free entry removes a reliable income stream at a time when public funding is already contested. That shortfall is nevertheless smaller than it appears, since charging deters precisely the visitors whose attendance justifies the funding.',
    },
    drills: [
      { stem: 'Which version concedes correctly?', correct: 0, options: [
        { text: 'Admittedly, the policy is costly. It nevertheless delivers benefits that outweigh the expense.', why: 'Correct. Concession first, reversal second, and the paragraph ends on the position.' },
        { text: 'The policy delivers real benefits for everyone. Admittedly, it is extremely costly.', why: 'The order is reversed, so the reader is left holding the objection as your final word.' },
        { text: 'Although the policy is undeniably costly, but it delivers real benefits.', why: 'One relationship announced twice — the carry-over from “aunque … pero”.' },
        { text: 'The policy is genuinely costly and it also delivers real benefits.', why: '“And” flattens the tension: nothing has been conceded because nothing was set against anything.' },
      ]},
      { stem: '______ the high cost, the scheme was approved.', correct: 0, options: [
        { text: 'Despite', why: 'Correct. “Despite” takes a noun phrase, and “the high cost” is one.' },
        { text: 'Although', why: '“Although” takes a clause with its own verb, not a bare noun phrase.' },
        { text: 'Despite of', why: 'The phrase is “in spite of” or “despite”. “Despite of” mixes the two.' },
        { text: 'Even', why: '“Even” alone is not a concessive connector; the form is “even though” and it takes a clause.' },
      ]},
      { stem: 'Your essay concedes something in every paragraph. What is the risk?', correct: 0, options: [
        { text: 'The position becomes invisible, which is what concession was meant to protect.', why: 'Correct. One or two well-chosen concessions show judgement; constant conceding shows none.' },
        { text: 'The essay will end up considerably too long for the word count.', why: 'Length is not the issue — a concession is a clause.' },
        { text: 'The examiner will conclude that you agree entirely with the prompt.', why: 'Worse than that: they will not be able to tell what you think at all.' },
        { text: 'None at all — considering every possible objection is always stronger.', why: 'An essay that agrees with everyone has taken no position, and Task Response is assessed on having one.' },
      ]},
    ],
  },

  {
    slug: 'sentence-types',
    label: 'Sentence types',
    spanishName: 'Tipos de oración',
    seoTitle: 'Tipos de oración en inglés: simple, compuesta y compleja, y cuándo usar cada una',
    seoDescription: 'Cómo variar la estructura de las frases en inglés con un propósito, no por variar. Oración simple, compuesta y compleja, con guiado y ejercicios corregidos.',
    job: 'it varies the shape of your sentences for a reason, instead of writing every sentence the same way',
    whenToUse: 'Throughout both tasks. Grammatical Range is assessed on whether you can handle different structures accurately — not on whether every sentence is long, which is the misreading that produces most of the errors in this area.',
    tone: 'claim',
    practisedIn: { label: 'Build the introduction', href: '/practica/ielts/academic/writing/task2/introduccion' },
    explainer: {
      definition: 'Sentence variety means choosing simple, compound or complex structures according to what the sentence has to do — not alternating them to look varied.',
      sections: [
        {
          heading: 'Range is not length',
          body: [
            'The criterion asks for a range of structures used accurately, and it is read as “write longer sentences” more often than any other instruction in the exam. The result is predictable: writers stack subordinate clauses onto sentences that were working, and the errors they introduce cost more than the range they gained. A response of accurate simple and compound sentences scores better than one of ambitious complex sentences with agreement errors in them.',
            'Each shape does something the others cannot. A simple sentence lands a point — it is the right structure for a thesis, and for the sentence you most want the reader to remember. A compound sentence balances two things of equal weight. A complex sentence subordinates: it says explicitly that one part matters more than the other, which is why it is the natural shape for a concession or a cause.',
            'The practical consequence is that variety follows from function. If your paragraph has a claim, a reason, a concession and a consequence, the sentences will vary on their own, because those four jobs do not fit the same shape. Variety pursued directly — long, short, long, short — produces sentences whose form has nothing to do with their content, and readers feel that even when they cannot name it.',
          ],
          points: [
            { term: 'Simple = emphasis', detail: 'One clause, no subordination. The right shape for a thesis and for the line you want remembered.' },
            { term: 'Compound = balance', detail: 'Two independent clauses joined by “and”, “but”, “so”. Equal weight on both sides.' },
            { term: 'Complex = hierarchy', detail: 'One clause subordinated to another. It says which half matters more, which is why concessions take this shape.' },
            { term: 'Accuracy first', detail: 'An accurate simple sentence beats an ambitious complex one with an agreement error in it.' },
          ],
        },
      ],
      cost: 'A response written entirely in one shape reads as monotonous and caps Grammatical Range regardless of how accurate it is. Pursuing variety for its own sake costs the other way: subordinate clauses added to sentences that did not need them introduce errors into paragraphs that had none, and they usually arrive in the last five minutes when there is no time to check them.',
      limits: 'Sentence variety cannot rescue an idea that is not there — a badly reasoned paragraph in beautifully varied sentences is still a badly reasoned paragraph. And a short sentence is not a defect: replacing a clear short one with a long one at the last minute is the most reliable way to add an error to a paragraph that was already correct.',
    },
    examples: [
      { sentence: 'Restriction works. It works because the alternative — pricing by fuel duty — spreads the cost across drivers who have no way to avoid it, whereas a zone charge falls on a choice.', doing: 'simple, then complex', why: 'The short sentence lands the claim and the long one explains it. The contrast in length is doing work: the reader knows which of the two sentences is the point.' },
      { sentence: 'Although the scheme raised costs for some households, it reduced them for the majority, and the net effect was a fall in average spending.', doing: 'complex + compound', why: 'The subordinate clause concedes, the main clause reverses, and the compound half adds a balanced consequence. Three jobs, three shapes, one sentence.' },
    ],
    mistakes: [
      { wrong: 'Although the scheme, which was introduced in 2003 and which had been debated for years, raised costs, it worked.', why: 'Two relative clauses stacked inside a concession. The structure is technically correct and the reader has lost the sentence by the time the main clause arrives.', right: 'The scheme, debated for years before its introduction in 2003, raised costs — and it worked.' },
      { wrong: 'Public transport is cheap. Public transport is clean. Public transport is reliable.', why: 'Three simple sentences with identical shape and subject. Accurate, and it caps the range criterion by itself.', right: 'Public transport is cheap and clean, and where it is reliable it competes directly with the car.' },
    ],
    guided: {
      brief: 'You have three things to say: (a) free entry works; (b) it costs money; (c) the cost is smaller than the benefit.',
      goal: 'Give each one the shape its job needs — without adding a clause you do not need.',
      steps: [
        { instruction: 'Write (a) as a simple sentence', hint: 'One clause. This is the point you want remembered, so give it the shape that lands.', minWords: 4, placeholder: 'Free entry works.', model: 'Free entry works.', why: 'Three words. A subordinate clause here would bury the claim the whole paragraph exists to make — which is exactly what happens when variety is pursued for its own sake.' },
        { instruction: 'Combine (b) and (c) into a complex sentence', hint: 'One of them matters more. Subordinate the other, and say which you subordinated and why.', minWords: 10, placeholder: 'Although it costs …', model: 'Although free entry does remove an income stream, the shortfall is smaller than the public value of the visits it enables.', why: 'The cost is subordinated because the point is the comparison, not the cost. The shape is saying which half matters, and it says it before the reader gets to the end.' },
        { instruction: 'Put them together and check for clauses you do not need', hint: 'Read both sentences. Is there a subordinate clause that adds nothing? Say which you would cut, or confirm there is none.', minWords: 12, placeholder: 'Free entry works. Although …', model: 'Free entry works. Although it does remove an income stream, the shortfall is smaller than the public value of the visits it enables. Nothing here can be cut without losing content.', why: 'Two sentences, two shapes, and both shapes chosen by function. Variety arrived on its own because the two sentences have different jobs.' },
      ],
      result: 'Free entry works. Although it does remove an income stream, the shortfall is smaller than the public value of the visits it enables.',
    },
    drills: [
      { stem: 'Which sentence shape suits a thesis statement best?', correct: 0, options: [
        { text: 'A simple sentence, because the claim should land rather than be qualified.', why: 'Correct. One clause, no subordination — the shape that makes a position memorable.' },
        { text: 'A complex sentence carrying two subordinate clauses, in order to show grammatical range.', why: 'Range pursued at the expense of function. The claim gets buried in the qualifications.' },
        { text: 'A compound sentence, so that both sides of the claim get equal weight.', why: 'Equal weight is the opposite of what a thesis needs: it should commit to one side.' },
        { text: 'Whichever one is longest, since Grammatical Range rewards structural complexity.', why: 'The criterion rewards range used accurately, not length. This is the misreading that causes most errors here.' },
      ]},
      { stem: 'You add a subordinate clause to a correct short sentence with two minutes left. What is the likely result?', correct: 0, options: [
        { text: 'An error introduced into a paragraph that did not have one.', why: 'Correct. This is the most reliable way to damage a correct paragraph, and it happens under time pressure.' },
        { text: 'A higher Grammatical Range score for the extra complexity.', why: 'Range is assessed on accurate use. An error in the new clause costs more than the structure gains.' },
        { text: 'No change, since the meaning is the same.', why: 'The meaning may be, and the risk is not: the new clause has not been checked.' },
        { text: 'Better cohesion between the sentences.', why: 'Subordination inside one sentence does not connect it to the next one.' },
      ]},
      { stem: 'Why does variety usually arrive on its own in a well-planned paragraph?', correct: 0, options: [
        { text: 'A claim, a reason and a concession do not fit the same shape.', why: 'Correct. Different jobs take different structures, so variety follows from function rather than from effort.' },
        { text: 'Because most writers naturally alternate between long and short sentences as they write.', why: 'Alternating by length produces shapes unrelated to content, which readers notice without naming it.' },
        { text: 'Because the grammar of English forces a writer into different structures.', why: 'It does not. A whole paragraph can be written in one shape, and many are.' },
        { text: 'Because reaching the word count requires longer sentences sooner or later.', why: 'Word count can be met with any structure. Length and range are different things.' },
      ]},
    ],
  },

  {
    slug: 'critical-final-review',
    label: 'Critical final review',
    spanishName: 'La revisión final crítica',
    seoTitle: 'Revisar un ensayo IELTS en cinco minutos: qué mirar y en qué orden',
    seoDescription: 'Qué revisar al final de un ensayo de IELTS y en qué orden: la instrucción, la postura, la lógica y las palabras. Con ejercicio guiado y ejercicios corregidos.',
    job: 'it checks the four things that can still be fixed, in the order that finds the expensive problems first',
    whenToUse: 'The last five minutes of both tasks. What makes it a skill rather than a habit is the order: checking spelling first and the instruction last means finding the fatal problem when there is no time left to fix it.',
    tone: 'review',
    practisedIn: { label: 'Final review', href: '/practica/ielts/academic/writing/task2/revision-final' },
    explainer: {
      definition: 'A final review checks four things in descending order of cost: did you answer the question, is your position visible, does the reasoning hold, and are the words right.',
      sections: [
        {
          heading: 'The order is the skill',
          body: [
            'Almost everybody reviews, and almost everybody reviews in the wrong order. Reading through for spelling and grammar is what feels productive, so it happens first, and it consumes the minutes in which a real problem could still have been fixed. The expensive failures are structural — answering a different question, losing your position, a body paragraph that argues against your thesis — and they can only be repaired if you find them while there is time.',
            'So the order runs from most to least expensive. First: reread the instruction and check you answered that one, not the one you expected. “To what extent do you agree” asks for a position; discussing both views without giving one is a different task. Second: is the position visible in the introduction, both bodies and the conclusion? Third: does each paragraph support it, or has one drifted? Only then, fourth: the words.',
            'The other half of the skill is knowing what cannot be fixed. With five minutes left, restructuring produces a response that is half old and half new, and the seam is more visible than the problem. Adding a new idea produces a claim with no development behind it. What is available is a word swap, a deleted sentence, and a repaired position statement — and those are worth more than they sound.',
          ],
          points: [
            { term: '1 · The instruction', detail: 'Did you answer the question asked, or the one you expected? Most expensive failure, and it takes twenty seconds to check.' },
            { term: '2 · The position', detail: 'Visible in the introduction, both bodies and the conclusion? A drift here costs across the whole response.' },
            { term: '3 · The logic', detail: 'Does every paragraph support the thesis? A drifted paragraph can often be fixed with one sentence.' },
            { term: '4 · The words', detail: 'Vague, overclaimed, informal, repeated. Last, because it is the cheapest to fix and the least costly to miss.' },
          ],
        },
      ],
      cost: 'Reviewing in the wrong order means the expensive problems are found last or not at all, and Task Response failures are the ones no amount of language work compensates for. Not reviewing at all leaves free marks on the table: register leaks and vague words cluster in the final paragraph, written fastest, which is the last thing the examiner reads.',
      limits: 'A review cannot restructure. With five minutes left, moving a paragraph or rewriting a topic sentence leaves a visible seam, and adding a new idea produces an undeveloped claim. It also cannot rescue a response that answered the wrong question — if that is what you find, the honest move is to repair the position statement and the conclusion, not to rewrite the body you no longer have time for.',
    },
    examples: [
      { sentence: 'Check the instruction, then the position, then the logic, then the words — in that order, because that is the order of what they cost.', doing: 'the order itself', why: 'The sequence is the content of this skill. Any other order spends the available minutes on the cheapest problems and finds the expensive ones when it is too late to act.' },
      { sentence: 'With two minutes left, the writer replaced four vague words and expanded two contractions, and left the structure alone.', doing: 'word swaps, no restructuring', why: 'This is what the last two minutes can actually buy. The temptation is to fix the paragraph that felt weak, and that is the change most likely to make things worse.' },
    ],
    mistakes: [
      { wrong: 'With five minutes left, the writer reread the whole essay checking spelling and grammar.', why: 'The cheapest check done first, using the minutes in which a structural problem could still have been repaired. It feels productive, which is why it is the default.', right: 'With five minutes left, the writer reread the instruction, then checked the position appeared in all four paragraphs.' },
      { wrong: 'With three minutes left, the writer rewrote the topic sentence of Body 2 and added a new example.', why: 'Restructuring leaves a seam, and a new example arrives with no development behind it. Neither is repairable in the time available.', right: 'With three minutes left, the writer deleted a sentence that drifted and swapped three vague words.' },
    ],
    guided: {
      brief: 'You have finished. Five minutes left. Prompt was: “Some people think university should be free. To what extent do you agree or disagree?” Your introduction says: “This essay will discuss the arguments on both sides.”',
      goal: 'Review in the right order, and fix what can actually be fixed.',
      steps: [
        { instruction: 'Check the instruction first', hint: 'Reread the prompt and your introduction. Do they match? Write what you find.', minWords: 10, placeholder: 'The prompt asks … my introduction says …', model: 'The prompt asks to what extent I agree, which requires a position. My introduction only promises to discuss both sides, so I answered a different question.', why: 'Twenty seconds, and it found the most expensive problem in the response. Left until last, this would have been discovered with no time to act on it.' },
        { instruction: 'Decide what is repairable in five minutes', hint: 'You cannot rewrite the body. What CAN you change so the essay answers the question?', minWords: 10, placeholder: 'I can fix … but I cannot …', model: 'I can rewrite the introduction’s last sentence and the conclusion to state a position. I cannot restructure the bodies, and they do lean one way already.', why: 'Naming what is out of reach is what stops the panic rewrite. Two sentences can make an essay answer the question; a half-rewritten body makes it worse.' },
        { instruction: 'Write the repaired position sentence', hint: 'One sentence for the introduction, at a strength the existing bodies support.', minWords: 12, placeholder: 'This essay will argue that …', model: 'This essay will argue that free tuition is justified for undergraduate study, though not for repeat or postgraduate courses.', why: 'The position now matches what the bodies already argue, so the essay answers the question without a single body paragraph being touched. That is the whole of what five minutes buys.' },
      ],
      result: 'This essay will argue that free tuition is justified for undergraduate study, though not for repeat or postgraduate courses.',
    },
    drills: [
      { stem: 'With five minutes left, what should you check first?', correct: 0, options: [
        { text: 'Whether you answered the question that was actually asked.', why: 'Correct. It is the most expensive failure and the fastest to check — and the only one that becomes unfixable if found late.' },
        { text: 'The spelling and the punctuation, right through the whole response.', why: 'The cheapest check, done first, using the minutes a structural repair would have needed.' },
        { text: 'Whether the vocabulary across the response is varied enough.', why: 'Worth doing fourth. Done first, it consumes the time the position check needed.' },
        { text: 'The total word count against the minimum for the task.', why: 'Worth a glance, and it tells you nothing about whether the response works.' },
      ]},
      { stem: 'You find that Body 2 argues against your thesis. Three minutes left. What do you do?', correct: 0, options: [
        { text: 'Reframe it as a concession with one added sentence.', why: 'Correct. One sentence turns a contradiction into a considered concession, and nothing has to be rewritten.' },
        { text: 'Rewrite Body 2 to agree with the thesis.', why: 'Restructuring in three minutes leaves a seam more visible than the original problem.' },
        { text: 'Change the thesis to match Body 2.', why: 'That contradicts Body 1 and the conclusion, so it moves the problem rather than fixing it.' },
        { text: 'Delete Body 2 entirely.', why: 'It takes the response below the word count and removes half the development.' },
      ]},
      { stem: 'Which repair is realistic in the last two minutes?', correct: 0, options: [
        { text: 'Swapping four vague words and expanding the contractions.', why: 'Correct. Word swaps need no surrounding changes and cannot introduce structural problems.' },
        { text: 'Adding a third body paragraph for balance.', why: 'A new paragraph in two minutes has no development, and it costs more than the gap it fills.' },
        { text: 'Making every sentence longer and more complex.', why: 'The most reliable way to introduce a grammar error into a paragraph that had none.' },
        { text: 'Moving the conclusion before the body paragraphs.', why: 'Restructuring, and it would leave the response incoherent.' },
      ]},
    ],
  },
];
