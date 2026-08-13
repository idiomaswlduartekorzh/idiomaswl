/**
 * El vocabulario de Academic Writing Task 2, por subparte.
 *
 * Mismo criterio que Task 1: una unidad por cada cosa que hay que escribir, con el reparto que
 * ya tiene el curso, para que quien esté haciendo la etapa encuentre aquí exactamente sus
 * palabras.
 *
 * LA DIFERENCIA CON TASK 1
 *
 * En Task 1 el vocabulario describe algo que está dibujado: hay un gráfico delante y las
 * palabras tienen que corresponderse con él. En Task 2 no hay nada delante, y eso cambia el
 * riesgo entero. Aquí las palabras no pueden ser inexactas respecto a un dibujo; pueden ser
 * inexactas respecto a lo que TÚ estás afirmando —decir «must» donde querías decir «should»,
 * «proven» donde solo tenías «suggests»— y eso no lo detecta nadie mirando la hoja.
 *
 * Por eso estas cuatro unidades cargan más peso en la fuerza de la afirmación que en la
 * precisión descriptiva. Es el mismo eje que las ocho funciones transversales, aplicado al
 * sitio concreto donde cada una hace falta.
 */

import type { VocabUnit } from './vocabulary-types';

export const TASK2_UNITS: VocabUnit[] = [
  // ── 1 · La introducción ────────────────────────────────────────────────────
  {
    slug: 'task2-introduccion',
    label: 'Task 2 introduction',
    spanishName: 'Vocabulario para la introducción de Task 2',
    seoTitle: 'Vocabulario para la introducción de un ensayo IELTS: restatear y posicionarse',
    seoDescription: 'Cómo reformular el enunciado y declarar tu posición en inglés: it is often argued, this essay will contend, largely agree. Con la fuerza de cada verbo y ejercicios.',
    family: 'task2',
    job: 'it restates the prompt in your own words and says, without hedging into invisibility, where you stand',
    whenToUse: 'The first two or three sentences of every Task 2 essay. It is where the examiner decides whether you understood the question, and where most responses either copy the prompt or forget to answer it.',
    tone: 'prompt',
    explainer: {
      definition: 'A Task 2 introduction does two jobs with different vocabulary: it restates the question without reusing its words, and it commits to an answer at a strength you are prepared to defend.',
      sections: [
        {
          heading: 'Two jobs, and the second is the one that gets forgotten',
          body: [
            'Restating the prompt is the job everyone knows about. Stating a position is the one that quietly disappears, usually because the writer intends to explain their view in the body and treats the introduction as scene-setting. The result is an essay that reads as a survey of opinions with no author in it — and Task Response is assessed partly on whether a clear position is present throughout, which means it has to be visible from the opening.',
            'The vocabulary for the two jobs is genuinely different, and mixing them is what produces the vaguest introductions. Restating needs reporting language: “it is often argued that”, “some maintain that”. Positioning needs commitment language: “this essay will argue”, “I largely agree”. Using reporting verbs to state your own view — “it could be said that education is important” — produces a sentence that belongs to nobody.',
            'Strength is the other half of the problem. English gives you a full range between “I completely agree” and “I disagree to some extent”, and the one you choose is a promise about the rest of the essay. Choosing the strongest available position feels decisive and is usually a mistake: a total agreement leaves you nothing to concede, and a body paragraph that concedes anything then contradicts your own introduction.',
          ],
          points: [
            { term: 'Reporting language', detail: '“it is often argued that”, “proponents maintain that”. For the view you are about to answer — not for your own.' },
            { term: 'Commitment language', detail: '“this essay will argue”, “I largely agree that”. For your position, and it belongs in the introduction.' },
            { term: 'Strength is a promise', detail: '“Largely agree” leaves room to concede. “Completely agree” does not, and your Body 2 will need some.' },
            { term: 'No new content', detail: 'The introduction does not argue. Reasons belong in the body; putting them here empties the paragraphs that need them.' },
          ],
        },
        {
          heading: 'The register question nobody resolves',
          body: [
            'Whether to write “I” in a Task 2 essay is asked constantly and has a boring answer: it is allowed, it is common in high-scoring responses, and it is not required. What is not allowed is the mixture — an essay that opens with “In my opinion” and then switches to “it can be seen that” for the rest has changed its own voice halfway through, which is a Coherence problem.',
            'The impersonal alternatives are worth knowing regardless, because they carry a different weight. “This essay will argue that” commits without the personal frame; “there are strong grounds for” commits to the reasoning rather than to the writer. Both let you state a position at full strength while keeping the register uniformly academic.',
          ],
        },
      ],
      cost: 'An introduction with no position costs on Task Response directly, and it costs again indirectly: an essay that never committed cannot be consistent with itself, so the conclusion has nothing to restate. And a position taken at the wrong strength is worse than a weak one — a “completely agree” that the body then qualifies reads as a writer who changed their mind halfway and did not go back.',
      limits: 'The introduction does not argue and does not give reasons. Naming your two reasons here is the commonest way to leave Body 1 and Body 2 with nothing new to say, and it is often mistaken for good signposting. It also does not need a “hook”: a general opening sentence about how important the topic is adds no content, and the examiner is reading for the restatement and the position, both of which it delays.',
    },
    upgrade: {
      vague: 'Nowadays many people think that university should be free. In my opinion, I think this is a good idea because it helps students.',
      precise: 'It is frequently argued that higher education should be publicly funded. This essay will contend that free access is justified, though not without conditions.',
      earns: ['precision', 'register', 'range'],
      why: '“Nowadays many people think” is the opening every examiner reads fifty times a day, and “I think this is a good idea because it helps students” both states a position and spends Body 1’s reason on it. The precise version reports the view, commits to an answer, and signals a qualification without arguing it yet.',
    },
    groups: [
      {
        label: 'Restating the prompt',
        purpose: 'Reporting language, for the view you are about to answer.',
        entries: [
          { text: 'It is frequently argued that', risk: 'safe', pattern: 'Takes a clause. Impersonal, and it attributes the view without inventing a source.' },
          { text: 'A common view is that', risk: 'safe', pattern: 'Takes a clause. Slightly lighter than “frequently argued” and equally neutral.' },
          { text: 'Proponents of X maintain that', risk: 'safe', pattern: 'Names who holds the view, then a clause. The clearest option in a discussion essay.' },
          { text: 'There is a widespread belief that', risk: 'watch', pattern: 'Takes a clause. Only when the belief really is widespread — you cannot verify “widespread”.' },
          { text: 'Nowadays, many people think that', risk: 'avoid', pattern: 'Grammatical, and it is the single most common opening in the exam. It reports nothing that “it is argued that” does not.' },
        ],
      },
      {
        label: 'Stating your position',
        purpose: 'Commitment language. This is the sentence that must not be missing.',
        entries: [
          { text: 'This essay will argue that', risk: 'safe', pattern: 'Takes a clause. Commits at full strength without the personal frame.' },
          { text: 'I largely agree that', risk: 'safe', pattern: 'Takes a clause. “Largely” leaves room for the concession your body will need.' },
          { text: 'While X, this essay contends that Y', risk: 'safe', pattern: 'A concession clause first, then the position. Signals a qualified answer in one sentence.' },
          { text: 'There are strong grounds for', risk: 'watch', pattern: 'Takes a noun or an -ing form: “strong grounds for restricting”, never “for restrict”.' },
          { text: 'In my opinion, I think that', risk: 'avoid', pattern: 'Says the same thing twice. One or the other, never both.' },
        ],
      },
      {
        label: 'Calibrating the strength',
        purpose: 'The word you choose here is a promise about the whole essay.',
        entries: [
          { text: 'entirely / completely', risk: 'watch', pattern: 'Before the verb: “entirely agree”. Leaves you nothing to concede, so only use it if the body really concedes nothing.' },
          { text: 'largely / broadly', risk: 'safe', pattern: 'Before the verb. The safest position in most essays: committed, with room to qualify.' },
          { text: 'to a certain extent', risk: 'watch', pattern: 'Ends the clause: “I agree to a certain extent”. Useful once; a whole essay of it has no position.' },
          { text: 'while acknowledging that', risk: 'safe', pattern: 'Takes a clause. Concedes and commits in the same sentence, which is what a qualified answer looks like.' },
          { text: 'partly … but', risk: 'safe', pattern: 'Two halves, both needed. “I partly agree, but the evidence points the other way.”' },
        ],
      },
      {
        label: 'Naming the ground without arguing it',
        purpose: 'You can point at the territory. You cannot start crossing it here.',
        entries: [
          { text: 'on both economic and social grounds', risk: 'safe', pattern: 'Takes “on … grounds”. Names the kind of reason without giving the reason.' },
          { text: 'with certain reservations', risk: 'safe', pattern: 'Ends the sentence. Signals a qualification the body will supply.' },
          { text: 'though not without conditions', risk: 'safe', pattern: 'A closing phrase after a comma. Same job, slightly more formal.' },
          { text: 'for two reasons: firstly …', risk: 'avoid', pattern: 'Spends Body 1 and Body 2 in the introduction. It looks like signposting and empties the paragraphs.' },
        ],
      },
    ],
    examples: [
      { sentence: 'It is frequently argued that higher education should be publicly funded. This essay will contend that free access is justified, though not without conditions.', doing: 'It is frequently argued · This essay will contend · though not without conditions', why: 'Two sentences doing the two jobs cleanly: one reports the view, the other commits to an answer. The closing phrase promises a qualification without spending it.' },
      { sentence: 'While remote working undoubtedly offers flexibility, this essay contends that its costs to junior employees have been consistently understated.', doing: 'While … undoubtedly · this essay contends', why: 'A concession and a position in one sentence. Conceding first makes the position read as considered rather than reflexive, and it does it without giving away a body paragraph.' },
    ],
    mistakes: [
      { wrong: 'Nowadays many people think that cars should be banned in city centres. In my opinion, I think this is a good idea.', why: 'The most common opening in the exam, followed by a doubled first person. “In my opinion” and “I think” say the same thing, and neither commits to anything specific.', right: 'It is frequently argued that private cars should be excluded from city centres. This essay will argue that such a ban is justified in the largest cities.' },
      { wrong: 'I completely agree with this statement for two reasons: firstly, it saves money, and secondly, it reduces pollution.', why: 'Two problems. “Completely” leaves nothing to concede, and both body paragraphs have just been spent in the introduction.', right: 'I largely agree with this statement, on both economic and environmental grounds.' },
    ],
    guided: {
      brief: 'Prompt: “Some people believe that governments should invest in public transport rather than in new roads. To what extent do you agree or disagree?”',
      goal: 'Write a two-sentence introduction: one restating, one positioning. No reasons.',
      steps: [
        {
          instruction: 'Restate the prompt with reporting language',
          hint: 'Move every content word you can and keep it a reported view. “Some people believe” is the paper’s phrasing.',
          minWords: 10,
          placeholder: 'It is frequently argued that …',
          model: 'It is frequently argued that state funding should be directed towards public transport rather than road construction.',
          why: 'Every content word moved — governments → state, invest in → funding directed towards, new roads → road construction — and the reporting frame keeps it somebody else’s view, which is what the next sentence will answer.',
        },
        {
          instruction: 'Commit to a position, at a strength you can defend',
          hint: 'Choose your strength before your words. Will your body concede anything? If yes, do not write “completely”.',
          minWords: 8,
          placeholder: 'This essay will argue that …',
          model: 'This essay will largely support that view, while acknowledging that rural areas present a genuine exception.',
          why: '“Largely” and “while acknowledging” together promise a qualified answer, which is a promise the body can keep. “Completely agree” would have made the rural exception a contradiction.',
        },
        {
          instruction: 'Check what you have NOT written',
          hint: 'Read both sentences back. Is there a reason in them? Is there a “firstly”? Write what you would remove, or confirm there is nothing to remove.',
          minWords: 8,
          placeholder: 'There are no reasons here because …',
          model: 'There are no reasons here: the rural exception is named but not argued, so Body 2 still has something to do.',
          why: 'This step exists because the error is invisible while writing. Naming your reasons in the introduction feels like good signposting and leaves both body paragraphs repeating what the reader already read.',
        },
      ],
      result: 'It is frequently argued that state funding should be directed towards public transport rather than road construction. This essay will largely support that view, while acknowledging that rural areas present a genuine exception.',
    },
    drills: [
      {
        stem: '______ that social media has damaged face-to-face communication.',
        correct: 0,
        options: [
          { text: 'It is frequently argued', why: 'Correct. Impersonal reporting language: it attributes the view without inventing a source, and leaves you free to answer it.' },
          { text: 'Nowadays many people think', why: 'Grammatical, and it is the single most common opening in the exam. It reports nothing extra.' },
          { text: 'Everybody knows', why: 'It invents a consensus and turns a contested view into a fact — which removes the question.' },
          { text: 'In my opinion I believe', why: 'Two first-person frames doing one job, and it claims the view as yours before you have answered it.' },
        ],
      },
      {
        stem: 'Your body paragraphs will concede one exception. Which position should the introduction take?',
        correct: 0,
        options: [
          { text: 'This essay will largely agree, while acknowledging one exception.', why: 'Correct. “Largely” and “while acknowledging” both leave the room the body is going to use.' },
          { text: 'This essay will completely agree with the statement.', why: '“Completely” leaves no room, so the exception in your body will contradict your own opening.' },
          { text: 'This essay will agree to a certain extent with parts of it.', why: 'So hedged that no position is visible, and Task Response is assessed on having one.' },
          { text: 'This essay will discuss both sides of the argument.', why: 'Discussing is not answering. “To what extent do you agree” requires a position.' },
        ],
      },
      {
        stem: 'There are strong grounds ______ the sale of single-use plastics.',
        correct: 0,
        options: [
          { text: 'for restricting', why: 'Correct. “Grounds for” takes a noun or an -ing form, and “restricting” is that form.' },
          { text: 'for restrict', why: 'The preposition “for” cannot be followed by a bare infinitive.' },
          { text: 'to restrict', why: 'The fixed phrase is “grounds for”, not “grounds to”.' },
          { text: 'of restricting', why: 'The preposition is “for”. “Grounds of” means something else entirely, closer to a basis in law.' },
        ],
      },
    ],
  },

  // ── 2 · Los párrafos de cuerpo ─────────────────────────────────────────────
  {
    slug: 'task2-body',
    label: 'Body paragraphs',
    spanishName: 'Vocabulario para los párrafos de cuerpo',
    seoTitle: 'Vocabulario para los párrafos de un ensayo IELTS: topic sentence, desarrollo y ejemplos',
    seoDescription: 'Cómo abrir un párrafo, desarrollar la idea y meter un ejemplo en inglés académico. This stems from, a case in point, which in turn. Con patrón y ejercicios.',
    family: 'task2',
    job: 'it opens a paragraph with one claim, develops it into a chain, and supports it without inventing sources',
    whenToUse: 'The two or three paragraphs that carry the essay. This is where most of the words go and where most of the marks are decided, because it is the only place a reader can see whether you can develop an idea rather than assert several.',
    tone: 'development',
    explainer: {
      definition: 'A body paragraph makes one claim, explains why it holds, and shows it working. Each of those three moves has its own vocabulary, and the commonest failure is having only the first.',
      sections: [
        {
          heading: 'The difference between a list and a chain',
          body: [
            'A weak body paragraph states four things. A strong one states one thing and then follows it: because of this, which means that, which in turn produces this. The vocabulary of development is what turns the first into the second, and it is almost entirely made of linking phrases that name a consequence — “this stems from”, “as a result”, “which in turn”.',
            'The reason this matters more than it sounds is that four asserted claims can all be true and still show nothing. An examiner reading them sees a writer who knows several things about the topic. A chain shows a writer who can reason, and reasoning is what the criterion calls development. It is also cheaper: one idea followed for five sentences fills a paragraph more convincingly than five ideas that each get one.',
            'The opening sentence is what decides which of the two you get. A topic sentence that names one idea forces the rest of the paragraph to stay on it; one that names two gives you permission to drift, and the paragraph usually takes it.',
          ],
          points: [
            { term: 'Topic sentence', detail: 'One claim, and it should be arguable. If nobody could disagree with it, it is not a claim.' },
            { term: 'Development', detail: '“this stems from”, “which in turn”, “consequently”. The words that turn a claim into a chain.' },
            { term: 'Support', detail: '“a case in point”, “for instance”. Illustration, not proof — and never an invented statistic.' },
            { term: 'Return', detail: '“this suggests that”, “it follows that”. Closing the paragraph on the claim it opened with.' },
          ],
        },
        {
          heading: 'Examples: illustration, not evidence',
          body: [
            'Task 2 gives you no sources and expects none. An example is there to make an abstract claim concrete — to show what it looks like when it happens — not to prove it. That distinction decides the vocabulary: “a case in point is” and “this can be seen in” are illustration, while “studies have proven that” and “according to a 2019 report” claim a source you do not have and cannot cite.',
            'Invented statistics are the most damaging version of this, and they are common because they feel like rigour. “A recent study found that 73% of employees…” is a fabricated fact, and an examiner who has read four essays quoting four different invented percentages reads it as exactly what it is.',
          ],
        },
      ],
      cost: 'A paragraph of assertions with no development is the single most common shape in a mid-band response, and it is why the score does not move: everything in it is true, nothing in it is reasoned. And a fabricated source damages more than the sentence it sits in — it puts every other claim in the essay under suspicion.',
      limits: 'Development has a natural end. Four links in a chain is usually one too many, and the last one tends to be the one you cannot defend. Examples have a limit too: one concrete case per paragraph is normally enough, and a paragraph that is mostly example has stopped arguing. And none of this vocabulary rescues a topic sentence that names two ideas — that has to be fixed at the top.',
    },
    upgrade: {
      vague: 'Public transport is good for cities. It reduces traffic. Also it is cheaper. And it helps the environment too.',
      precise: 'Investment in public transport eases urban congestion. As fewer private vehicles compete for road space, journey times fall for everyone, which in turn makes the network more attractive to the drivers who remain.',
      earns: ['precision', 'range', 'collocation'],
      why: 'The vague version asserts three unrelated benefits in three short sentences. The precise one takes a single claim and follows it: fewer cars, faster journeys, more users. Same length, and the second one shows reasoning the first only gestured at.',
    },
    groups: [
      {
        label: 'Opening with one claim',
        purpose: 'A topic sentence that names one idea forces the paragraph to stay on it.',
        entries: [
          { text: 'The most compelling argument for X is that', risk: 'safe', pattern: 'Takes a clause. Names the claim and marks it as your strongest in one move.' },
          { text: 'A further consideration is', risk: 'safe', pattern: 'Takes a noun or a clause. Opens Body 2 without repeating “secondly”.' },
          { text: 'X is, above all, a question of', risk: 'safe', pattern: 'Takes a noun: “a question of cost”. Frames the paragraph around one dimension.' },
          { text: 'This is particularly true of', risk: 'watch', pattern: 'Takes a noun. Narrows a general claim to a case, which is a good second sentence and a weak first one.' },
          { text: 'There are many reasons why', risk: 'avoid', pattern: 'Announces a list and commits to no claim. The paragraph then has to deliver the list it promised.' },
        ],
      },
      {
        label: 'Developing into a chain',
        purpose: 'The words that turn a claim into reasoning rather than a set of assertions.',
        entries: [
          { text: 'this stems from', risk: 'safe', pattern: 'Takes a noun: “this stems from years of underinvestment”. The effect comes first, the cause after.' },
          { text: 'which in turn', risk: 'safe', pattern: 'Continues a chain inside the sentence: “journey times fall, which in turn attracts more users”.' },
          { text: 'consequently / as a result', risk: 'safe', pattern: 'Opens a sentence with a comma, or follows a semicolon. Names a consequence, so there must be one.' },
          { text: 'the implication is that', risk: 'safe', pattern: 'Takes a clause. Draws out what the previous sentence entails without claiming it as new evidence.' },
          { text: 'this is compounded by', risk: 'watch', pattern: 'Takes a noun. Means the problem is made worse by a second factor — not merely that a second factor exists.' },
          { text: 'and also, and moreover', risk: 'avoid', pattern: 'Adding is not developing. Every “and also” is a place where a consequence could have been named instead.' },
        ],
      },
      {
        label: 'Supporting with an example',
        purpose: 'Illustration. You have no sources and are expected to have none.',
        entries: [
          { text: 'a case in point is', risk: 'safe', pattern: 'Takes a noun. The most economical way to introduce a concrete case.' },
          { text: 'this can be seen in', risk: 'safe', pattern: 'Takes a noun. Points at where the claim is visible without claiming to have measured it.' },
          { text: 'for instance / for example', risk: 'safe', pattern: 'Opens the sentence with a comma, or sits mid-sentence between commas. Never “for example of”.' },
          { text: 'take X, for example', risk: 'watch', pattern: 'Slightly conversational but accepted. Commas on both sides of “for example”.' },
          { text: 'studies have proven that', risk: 'avoid', pattern: 'You have no study. Research indicates or suggests; it does not prove, and you cannot cite it here.' },
          { text: 'a recent report found that 73%', risk: 'avoid', pattern: 'An invented figure. It reads as rigour to the writer and as fabrication to the reader.' },
        ],
      },
      {
        label: 'Closing the paragraph',
        purpose: 'Returning to the claim you opened with, so the paragraph is a unit.',
        entries: [
          { text: 'this suggests that', risk: 'safe', pattern: 'Takes a clause. Draws a conclusion at a strength the paragraph has earned.' },
          { text: 'it follows that', risk: 'watch', pattern: 'Takes a clause, and claims logical necessity. Only when it really does follow.' },
          { text: 'for this reason', risk: 'safe', pattern: 'Opens the closing sentence with a comma. Points back at the chain you just built.' },
          { text: 'on balance', risk: 'watch', pattern: 'Opens with a comma. It weighs two sides, so it needs both to have appeared in the paragraph.' },
        ],
      },
    ],
    examples: [
      { sentence: 'Investment in public transport eases urban congestion. As fewer private vehicles compete for road space, journey times fall for everyone, which in turn makes the network more attractive to the drivers who remain.', doing: 'topic sentence · As … · which in turn', why: 'One claim followed for three steps. Note that no new idea is introduced: everything after the first sentence is a consequence of it, which is what development means.' },
      { sentence: 'The shortage stems from decades of underinvestment rather than from recent demand. A case in point is the rail network, where no new line was opened for thirty years.', doing: 'stems from … rather than · A case in point is', why: '“Stems from … rather than” names a cause and rules out a rival in one sentence, and the example illustrates rather than proves — no figure is invented.' },
    ],
    mistakes: [
      { wrong: 'Public transport is good. It is cheap. Also it helps the environment. And also it reduces traffic in the city.', why: 'Four assertions and no development. Every sentence starts a new idea, so none of them is followed, and “also” twice signals adding where reasoning was needed.', right: 'Public transport eases congestion, and as fewer cars compete for road space, journey times fall for everyone.' },
      { wrong: 'Studies have proven that 68% of commuters would switch if services improved.', why: 'Two fabrications. You have no study to cite, and the figure is invented. Research also indicates rather than proves.', right: 'Commuters are widely reported to be willing to switch where services are reliable.' },
    ],
    guided: {
      brief: 'Your position: cities should restrict private cars in the centre. Body 1 will argue the health case.',
      goal: 'Build one paragraph: one claim, developed into a chain, with one example. No invented figures.',
      steps: [
        {
          instruction: 'Write a topic sentence with exactly one claim',
          hint: 'One idea, and it must be arguable — if nobody could disagree, it is not a claim. Do not name two benefits.',
          minWords: 8,
          placeholder: 'The strongest case for restricting cars is …',
          model: 'The most compelling argument for restricting city-centre traffic is the measurable improvement in air quality.',
          why: 'One claim, and a contestable one. Naming both air quality and noise here would have given the paragraph permission to drift, which is what a two-idea topic sentence always does.',
        },
        {
          instruction: 'Follow it one step, then a second',
          hint: 'Do not add a new benefit. Ask instead: what follows from cleaner air? And then what follows from that?',
          minWords: 14,
          placeholder: 'As traffic falls, …',
          model: 'As traffic volumes fall, concentrations of nitrogen dioxide decline, which in turn reduces the incidence of respiratory illness among residents.',
          why: 'Two links, and no new idea. “Which in turn” is doing the work that “and also” would have failed to do — it names a consequence rather than adding an item.',
        },
        {
          instruction: 'Illustrate it, without inventing a source',
          hint: 'Name a real, general case. No percentages, no “studies have proven”, no report you cannot cite.',
          minWords: 10,
          placeholder: 'A case in point is …',
          model: 'A case in point is the network of low-emission zones now operating in several European capitals, where central air quality has improved since their introduction.',
          why: 'Concrete enough to illustrate, general enough to be defensible. An invented percentage here would have read as rigour to the writer and as fabrication to the reader.',
        },
      ],
      result: 'The most compelling argument for restricting city-centre traffic is the measurable improvement in air quality. As traffic volumes fall, concentrations of nitrogen dioxide decline, which in turn reduces the incidence of respiratory illness among residents. A case in point is the network of low-emission zones now operating in several European capitals, where central air quality has improved since their introduction.',
    },
    drills: [
      {
        stem: 'Journey times fall for everyone, ______ makes the network more attractive to remaining drivers.',
        correct: 0,
        options: [
          { text: 'which in turn', why: 'Correct. It continues the chain inside the sentence, naming a consequence of what came before.' },
          { text: 'and also', why: 'It adds an item instead of naming a consequence, which is exactly the difference between a list and a chain.' },
          { text: 'in turn which', why: 'The words are in the wrong order; the relative pronoun comes first.' },
          { text: 'that in turn it', why: 'The pronoun is doubled: “which” or “it”, not both.' },
        ],
      },
      {
        stem: 'You want to illustrate a claim in Body 1. Which opening is safe?',
        correct: 0,
        options: [
          { text: 'A case in point is the low-emission zone in central London.', why: 'Correct. It introduces a concrete case as illustration, without claiming to have measured or cited anything.' },
          { text: 'A 2019 study proved that 73% of residents supported the scheme.', why: 'An invented study and an invented figure, and research indicates rather than proves.' },
          { text: 'Everybody knows that low-emission zones work very well.', why: 'It invents a consensus in place of the example the paragraph needed.' },
          { text: 'For example of this, London has a low-emission zone.', why: '“For example” takes no “of”. The phrase that does is “an example of”.' },
        ],
      },
      {
        stem: 'The shortage ______ decades of underinvestment rather than from recent demand.',
        correct: 0,
        options: [
          { text: 'stems from', why: 'Correct. The effect is the subject and “from” introduces the cause, which is the direction this verb takes.' },
          { text: 'stems of', why: 'The verb takes “from”. “Stem of” is a noun phrase about plants.' },
          { text: 'gives rise to', why: 'Right idea, wrong direction: this verb puts the cause first, and here the subject is the effect.' },
          { text: 'is stemmed from', why: '“Stem from” is not passive. The effect does the stemming.' },
        ],
      },
    ],
  },

  // ── 3 · La conclusión ──────────────────────────────────────────────────────
  {
    slug: 'task2-conclusion',
    label: 'Task 2 conclusion',
    spanishName: 'Vocabulario para la conclusión de un ensayo',
    seoTitle: 'Vocabulario para la conclusión de un ensayo IELTS: cerrar sin repetir',
    seoDescription: 'Cómo cerrar un ensayo en inglés sin copiar la introducción: in conclusion, the evidence presented suggests, on balance. Con su patrón y ejercicios corregidos.',
    family: 'task2',
    job: 'it restates the position in different words and closes without introducing anything new',
    whenToUse: 'The last three or four sentences, written when there are five minutes left and the temptation to paste the introduction is strongest. It is short, it is predictable, and it is the paragraph most often missing entirely.',
    tone: 'review',
    explainer: {
      definition: 'A conclusion restates the position the essay argued, in words that are not the introduction’s, and stops. It adds nothing, proves nothing and introduces nobody new.',
      sections: [
        {
          heading: 'Why it is not a summary, and why copying the introduction fails',
          body: [
            'The instinct is to summarise, and the instinct produces the two failures that make conclusions worthless. The first is copying: an examiner who reads the same sentence twice, once at the top and once at the bottom, has been given no new language and no new thinking, and the words in it are counted once. The second is listing: three sentences that recap what each body paragraph said, which tells a reader who has just read them nothing they do not already know.',
            'What a conclusion is for is narrower and easier. It answers the question again, now that the reasoning is behind it, and it shows that the answer survived the argument. That is why the vocabulary is mostly about referring back — “the evidence presented”, “for the reasons outlined” — rather than about restating content. You point at what you did; you do not do it again.',
            'The paraphrasing pressure here is real and it is the reason this paragraph has its own vocabulary at all. Your position has already been stated once in your own words, so the conclusion needs a second set. This is where a writer who only knows one way to say their position runs out, and either copies or waffles.',
          ],
          points: [
            { term: 'Signal it', detail: '“In conclusion”, “To conclude”. One of them, once. Examiners look for the paragraph and a signposted one is easier to find.' },
            { term: 'Refer, do not repeat', detail: '“For the reasons outlined above”. Point at the argument instead of running it again.' },
            { term: 'Restate the position', detail: 'The same answer, different words. Not the same sentence with two adjectives changed.' },
            { term: 'Nothing new', detail: 'A new reason in the conclusion is a reason with no paragraph to support it.' },
          ],
        },
        {
          heading: 'The recommendation question',
          body: [
            'Whether to end with a recommendation depends entirely on what was asked. A problem–solution prompt invites one, and closing without it leaves the task half answered. An opinion prompt does not: “governments should therefore act immediately” at the end of an essay that was asked to what extent you agree has answered a different question, and it introduces a proposal the body never argued.',
            'When a recommendation does belong, it needs the same specificity as any proposal in a body paragraph. “Something must be done” is not a recommendation, and it is the phrase that appears when the writer knows a conclusion should feel forward-looking and has nothing concrete to put there.',
          ],
        },
      ],
      cost: 'A missing conclusion costs on Task Response, and it is the easiest mark in the whole paper to lose because the paragraph is four sentences long. A copied one costs almost as much: it produces no new language for Lexical Resource and demonstrates no new thinking. And a conclusion that introduces a fresh reason damages the essay backwards, because that reason now has no paragraph supporting it.',
      limits: 'It does not argue, does not add evidence and does not concede anything new. If the essay never took a position, no conclusion can rescue it — there is nothing to restate. And a recommendation only belongs where the prompt asked for one: appended to an opinion essay it answers a question nobody asked.',
    },
    upgrade: {
      vague: 'In conclusion, I think that public transport is better than roads because it is cheaper and better for the environment, as I said before.',
      precise: 'In conclusion, the reasons outlined above make a strong case for prioritising public transport, notwithstanding the difficulties this presents in sparsely populated regions.',
      earns: ['precision', 'register', 'range'],
      why: 'The vague version repeats both body paragraphs and then admits it with “as I said before”. The precise one points at the argument instead of re-running it, restates the position in new words, and carries the qualification the introduction promised.',
    },
    groups: [
      {
        label: 'Signalling the close',
        purpose: 'One of these, once. The examiner is looking for this paragraph.',
        entries: [
          { text: 'In conclusion,', risk: 'safe', pattern: 'Opens the paragraph with a comma. The clearest signal available and never wrong.' },
          { text: 'To conclude,', risk: 'safe', pattern: 'Same position, same comma. Slightly less common, which is its only advantage.' },
          { text: 'On balance,', risk: 'watch', pattern: 'Opens with a comma, and it promises that two sides were weighed. Only if the essay weighed them.' },
          { text: 'In summary,', risk: 'watch', pattern: 'Opens with a comma, and it promises a summary — which invites the listing this paragraph should avoid.' },
          { text: 'In a nutshell,', risk: 'avoid', pattern: 'Conversational. It signals the close and drops the register in three words.' },
        ],
      },
      {
        label: 'Referring back without repeating',
        purpose: 'Point at the argument. Do not run it again.',
        entries: [
          { text: 'for the reasons outlined above', risk: 'safe', pattern: 'Ends or opens the clause. Refers to the whole argument in five words.' },
          { text: 'the evidence presented suggests', risk: 'safe', pattern: 'Takes a clause. “Suggests” keeps the strength honest — you presented reasoning, not proof.' },
          { text: 'as this essay has shown', risk: 'watch', pattern: 'Takes a clause after a comma. “Shown” is a strong claim; “argued” is usually the safer verb.' },
          { text: 'taken together, these factors', risk: 'safe', pattern: 'Opens with a comma. Groups the body paragraphs without listing them.' },
          { text: 'as I said before / as mentioned', risk: 'avoid', pattern: 'It announces that repetition is coming, which is the one thing this paragraph must not do.' },
        ],
      },
      {
        label: 'Restating the position',
        purpose: 'The same answer in a second set of words. This is where a thin vocabulary runs out.',
        entries: [
          { text: 'remains the stronger case', risk: 'safe', pattern: 'Takes no object: “restriction remains the stronger case”. Restates a position as a verdict.' },
          { text: 'this essay has argued that', risk: 'safe', pattern: 'Takes a clause. Commits without the personal frame and without repeating the opening sentence.' },
          { text: 'the balance of argument favours', risk: 'safe', pattern: 'Takes a noun or an -ing form: “favours restricting”, never “favours to restrict”.' },
          { text: 'notwithstanding', risk: 'watch', pattern: 'Takes a noun, not a clause: “notwithstanding the difficulties”. Carries a concession in one word.' },
          { text: 'I completely agree, as I said', risk: 'avoid', pattern: 'Repeats the introduction and says so. Two failures in one clause.' },
        ],
      },
      {
        label: 'Closing forward, when the prompt asked for it',
        purpose: 'Only where a recommendation belongs — and then it must be specific.',
        entries: [
          { text: 'should this trend continue,', risk: 'safe', pattern: 'A conditional clause plus a comma. Looks forward without predicting.' },
          { text: 'the priority should therefore be', risk: 'safe', pattern: 'Takes a noun or an -ing form. Names one action, which is what a recommendation is.' },
          { text: 'until X is addressed,', risk: 'safe', pattern: 'A clause plus a comma. Ties the outcome to a condition instead of forecasting it.' },
          { text: 'something must be done', risk: 'avoid', pattern: 'Recommends nothing. It is the phrase that appears when the writer has nothing concrete left.' },
        ],
      },
    ],
    examples: [
      { sentence: 'In conclusion, the reasons outlined above make a strong case for prioritising public transport, notwithstanding the difficulties this presents in rural areas.', doing: 'In conclusion · the reasons outlined above · notwithstanding', why: 'Signalled, refers back without repeating, restates the position and carries the qualification the introduction promised — in one sentence and with no new content.' },
      { sentence: 'Taken together, these factors suggest that regulation remains the stronger case, though the balance may shift as the technology matures.', doing: 'Taken together · remains the stronger case · may shift', why: '“Taken together” groups the body paragraphs without listing them, and the closing hedge looks forward without predicting anything the essay did not argue.' },
    ],
    mistakes: [
      { wrong: 'In conclusion, as I said before, I think public transport is cheaper and better for the environment.', why: 'It announces the repetition and then delivers it, re-running both body paragraphs. Nothing here is new language and nothing is new thinking.', right: 'In conclusion, the reasons outlined above make a strong case for prioritising public transport.' },
      { wrong: 'In conclusion, governments should also invest in cycling infrastructure and reform parking charges.', why: 'Two new proposals in the last paragraph, neither argued anywhere. A conclusion cannot support a claim, so a fresh one arrives undefended.', right: 'In conclusion, the priority should therefore be sustained investment in the public network.' },
    ],
    guided: {
      brief: 'Your essay argued that city centres should restrict private cars, on health grounds and on congestion grounds, while conceding that rural areas are different. Your introduction said: “This essay will largely support that view, while acknowledging that rural areas present a genuine exception.”',
      goal: 'Write the conclusion. Three sentences at most, no new content, and not one phrase reused from the introduction.',
      steps: [
        {
          instruction: 'Signal the close and point at the argument',
          hint: 'Choose one signal. Then refer back to the reasoning without restating either body paragraph.',
          minWords: 8,
          placeholder: 'In conclusion, …',
          model: 'In conclusion, the reasons outlined above make a strong case for restricting private vehicles in urban centres.',
          why: '“The reasons outlined above” does in five words what a summary of two paragraphs would do in three sentences — and it does not repeat either of them.',
        },
        {
          instruction: 'Restate the position in words the introduction did not use',
          hint: 'Your introduction said “largely support that view”. Say the same thing differently. Check you are not reusing “largely” or “support”.',
          minWords: 7,
          placeholder: 'The balance of argument …',
          model: 'The balance of argument clearly favours restriction over unrestricted access.',
          why: 'Same position, second vocabulary. This is the sentence where an essay with only one way of stating its view has to copy, which is exactly why this paragraph needs its own words.',
        },
        {
          instruction: 'Carry the concession, and stop',
          hint: 'The introduction promised a rural exception. Honour it in one clause — and add nothing new after it.',
          minWords: 8,
          placeholder: 'notwithstanding …',
          model: 'This holds notwithstanding the genuine difficulties such a policy creates in sparsely populated regions.',
          why: '“Notwithstanding” carries a whole concession in one word, and the sentence ends the essay. Anything after this would be a new claim with no paragraph behind it.',
        },
      ],
      result: 'In conclusion, the reasons outlined above make a strong case for restricting private vehicles in urban centres. The balance of argument clearly favours restriction over unrestricted access. This holds notwithstanding the genuine difficulties such a policy creates in sparsely populated regions.',
    },
    drills: [
      {
        stem: 'In conclusion, ______ make a strong case for reform.',
        correct: 0,
        options: [
          { text: 'the reasons outlined above', why: 'Correct. It refers back to the whole argument without re-running any of it.' },
          { text: 'as I said before, my reasons', why: 'It announces repetition, which is the one move this paragraph must not make.' },
          { text: 'firstly and secondly, my points', why: 'It re-lists the body paragraphs the reader has just finished.' },
          { text: 'the reasons outlined bellow', why: 'A spelling error, and the direction is wrong: the argument is above, not below.' },
        ],
      },
      {
        stem: 'The balance of argument favours ______ the scheme in the largest cities only.',
        correct: 0,
        options: [
          { text: 'introducing', why: 'Correct. “Favour” takes a noun or an -ing form directly, with no preposition.' },
          { text: 'to introduce', why: '“Favour” does not take an infinitive. The -ing form is what follows it.' },
          { text: 'for introducing', why: 'The verb takes its object directly; “for” has nothing to do here.' },
          { text: 'that introduce', why: '“Favour” does not take a clause, so “that” leaves the sentence unfinished.' },
        ],
      },
      {
        stem: 'Your essay was asked to what extent you agree. Which closing sentence belongs?',
        correct: 0,
        options: [
          { text: 'The evidence presented suggests that the benefits outweigh the drawbacks.', why: 'Correct. It answers the question that was asked and keeps the strength to what the essay actually showed.' },
          { text: 'Governments must therefore ban all private vehicles immediately.', why: 'A recommendation the prompt never asked for, and one the body never argued.' },
          { text: 'A further reason is that cycling infrastructure is also cheaper.', why: 'A new reason in the conclusion, arriving with no paragraph to support it.' },
          { text: 'Something must be done about this problem as soon as possible.', why: 'It recommends nothing, and it appears when the writer has nothing concrete left to say.' },
        ],
      },
    ],
  },

  // ── 4 · La revisión final ──────────────────────────────────────────────────
  {
    slug: 'task2-revision',
    label: 'Final revision',
    spanishName: 'Vocabulario para la revisión final',
    seoTitle: 'Revisar un ensayo en inglés: qué palabras cambiar en los últimos cinco minutos',
    seoDescription: 'Qué buscar al revisar un ensayo de IELTS y por qué cambiarlo: palabras vagas, afirmaciones excesivas y fugas de registro. Con el reemplazo exacto y ejercicios.',
    family: 'task2',
    job: 'it names what to hunt for in the last five minutes, and what to put in its place',
    whenToUse: 'The final pass, when the essay is written and there is no time to restructure anything. Almost every fix available at that point is a word swap — which is why revision is a vocabulary skill and not only a proofreading one.',
    tone: 'review',
    explainer: {
      definition: 'Final revision is a hunt for four specific kinds of word — vague, overclaimed, informal and repeated — and a swap for each one. It is not proofreading, and it is not rewriting.',
      sections: [
        {
          heading: 'Why a word hunt, and not a re-read',
          body: [
            'With five minutes left, re-reading an essay for quality does almost nothing: you already believe what you wrote, and you will read what you meant rather than what is on the page. What does work is hunting for specific, findable things. Four words are worth more than four minutes of general anxiety, because each of them is a defect you can see without judgement and fix without rewriting anything around it.',
            'The four categories are stable across almost every response. Vague words — “thing”, “a lot of”, “good” — where a precise one was available for free. Overclaims — “always”, “never”, “prove” — that commit you to more than the essay supports. Register leaks — contractions, “kids”, an abbreviation — which are invisible while writing because they are correct English. And repetition, where the same content word carries three sentences because the alternative did not come to mind at the time.',
            'What makes this a vocabulary skill rather than a proofreading one is that finding the defect is only half the job. “Very important” is easy to spot and useless to spot if you cannot produce “significant” or “critical” on demand. The hunt is worth nothing without the replacements, which is why they are listed here in pairs.',
          ],
          points: [
            { term: 'Vague', detail: '“thing”, “stuff”, “a lot of”, “good”, “bad”, “big”. Each one is a place where a precise word cost nothing.' },
            { term: 'Overclaimed', detail: '“always”, “never”, “all”, “prove”, “completely”. One counter-example destroys any of them.' },
            { term: 'Register leak', detail: 'Contractions, abbreviations, “kids”, “a lot of”. Correct English, wrong room.' },
            { term: 'Repeated', detail: 'The same content word three times in a paragraph. Usually one swap fixes the whole run.' },
          ],
        },
        {
          heading: 'What not to do with five minutes left',
          body: [
            'Do not restructure. Moving a paragraph or rewriting a topic sentence at this stage produces a response that is half old and half new, and the seam is more visible than the problem you were fixing. Do not add a new idea either: a fresh reason arriving in the last minutes has no development behind it, and it costs more than the gap it was filling.',
            'And do not fix what is merely simple. A short, clear sentence is not a defect, and replacing it with a long one at the last moment is the most reliable way to introduce a grammar error into a paragraph that did not have one. The hunt is for defects, not for opportunities.',
          ],
        },
      ],
      cost: 'Every unrevised vague word is a free mark on Lexical Resource that was left on the table — the precise version was available and cost nothing. Every overclaim invites the counter-example an examiner will supply mentally. And register leaks cluster in the final paragraph, written fastest, which means they land on the last thing the examiner reads.',
      limits: 'Revision cannot fix structure, cannot add development and cannot rescue a missing position. If the essay never answered the question, no word swap will make it answer. And there is a floor: an essay is not improved by making every sentence longer, and the last five minutes are exactly when that instinct produces new errors.',
    },
    upgrade: {
      vague: 'This is a very big problem and governments always ignore it, which isn’t good for a lot of people.',
      precise: 'This is a significant problem, and governments have consistently overlooked it, to the detriment of a substantial proportion of the population.',
      earns: ['precision', 'register', 'range'],
      why: 'Four defects in one sentence, one of each kind: “very big” is vague, “always” is an overclaim, “isn’t” is a register leak and “a lot of” is both vague and informal. None of them needed a rewrite — each was a swap.',
    },
    groups: [
      {
        label: 'Vague words, and what to put in their place',
        purpose: 'Each one is a place where a precise word was available and free.',
        entries: [
          { text: 'thing / stuff → factor, issue, aspect', risk: 'safe', pattern: 'Choose by what it actually is: a factor causes, an issue is disputed, an aspect is one part of something larger.' },
          { text: 'a lot of → a substantial proportion of', risk: 'safe', pattern: 'Takes “of” plus the noun. Use “number” for things you count, “amount” for a mass.' },
          { text: 'good / bad → beneficial, detrimental', risk: 'safe', pattern: '“Beneficial to/for”, “detrimental to”. Always name who or what is affected.' },
          { text: 'big → significant, substantial', risk: 'safe', pattern: 'Before the noun. “Big problem” is not wrong, it just reports nothing about the problem.' },
          { text: 'very + adjective → one stronger adjective', risk: 'safe', pattern: '“Very important” → “critical”. “Very” is nearly always a word that could be spent better.' },
          { text: 'get → obtain, receive, become', risk: 'watch', pattern: 'Choose by meaning: obtain a qualification, receive support, become worse. “Get” covers all three and reports none.' },
        ],
      },
      {
        label: 'Overclaims to soften',
        purpose: 'One counter-example destroys any of these, and the examiner has one.',
        entries: [
          { text: 'always / never → typically, rarely', risk: 'safe', pattern: 'Before the verb. Reports a pattern instead of a law, and survives the exception.' },
          { text: 'all / every → most, the majority of', risk: 'safe', pattern: '“The majority of” takes a plural noun and a plural verb. Claims more than half and nothing beyond.' },
          { text: 'prove → indicate, suggest', risk: 'safe', pattern: 'Takes a clause. Research indicates; it does not prove, and you have no study to cite anyway.' },
          { text: 'completely → largely, broadly', risk: 'safe', pattern: 'Before the verb. Leaves the room your concessions need.' },
          { text: 'will → is likely to', risk: 'watch', pattern: 'Takes an infinitive. Turns a forecast into a probability, which is what the evidence usually supports.' },
        ],
      },
      {
        label: 'Register leaks',
        purpose: 'Correct English, wrong room — and they cluster in the last paragraph.',
        entries: [
          { text: 'don’t, isn’t, can’t → do not, is not, cannot', risk: 'safe', pattern: 'Write the full form. The fix costs one keystroke and is the most visible of the four categories.' },
          { text: 'e.g., i.e., etc. → for example, that is', risk: 'safe', pattern: 'Write them out. “Etc.” has no good replacement, so finish the list instead.' },
          { text: 'kids → children', risk: 'safe', pattern: 'The neutral word is shorter to think of than to justify.' },
          { text: 'sort out, deal with → resolve, address', risk: 'watch', pattern: 'Not all phrasal verbs are informal — “carry out” and “point out” are fine. These two are not.' },
          { text: 'Rhetorical questions', risk: 'avoid', pattern: 'Delete and rewrite as a statement. A question hands the argument back to the reader at the moment you should be making it.' },
        ],
      },
      {
        label: 'Repetition, and the cheapest fix',
        purpose: 'Usually one swap fixes a whole run of three sentences.',
        entries: [
          { text: 'the same noun three times', risk: 'safe', pattern: 'Replace the second occurrence with a pronoun and the third with a synonym. Do not replace all three.' },
          { text: 'also / and also', risk: 'watch', pattern: 'Two in a paragraph means ideas are being added rather than developed. Replace with a consequence.' },
          { text: 'important', risk: 'watch', pattern: 'The single most repeated adjective in Task 2. Significant, critical, central, decisive.' },
          { text: 'people', risk: 'safe', pattern: 'Name the group: residents, employers, commuters, students. It is more precise and it stops the repetition.' },
        ],
      },
    ],
    examples: [
      { sentence: 'This is a significant problem, and governments have consistently overlooked it, to the detriment of a substantial proportion of the population.', doing: 'significant · consistently · a substantial proportion of', why: 'Four swaps, no rewriting: “very big” → “significant”, “always” → “consistently”, the contraction expanded, and “a lot of people” → a proportion of a named group. The sentence structure never changed.' },
      { sentence: 'Research indicates that most commuters would switch to rail if services were reliable.', doing: 'indicates · most', why: '“Proved” became “indicates” and “all” became “most”. Both were overclaims, and both were fixed without touching anything else in the sentence.' },
    ],
    mistakes: [
      { wrong: 'Studies always prove that all young people are affected by this thing.', why: 'Three overclaims and a vague noun in nine words: “always”, “prove”, “all”, and “this thing”, which names nothing at all.', right: 'Research indicates that most young people are affected by this trend.' },
      { wrong: 'With two minutes left, the writer rewrote the topic sentence of Body 1.', why: 'Restructuring at the end produces a response that is half old and half new, and the seam is more visible than the problem. With five minutes left, the fixes available are word swaps.', right: 'With two minutes left, the writer replaced four vague words and expanded two contractions.' },
    ],
    guided: {
      brief: 'Your final paragraph reads: “In conclusion, this is a very big problem and governments always ignore it. It isn’t good for a lot of people, and studies prove that things will get worse.”',
      goal: 'Revise it in three passes — one per category. No restructuring, no new ideas.',
      steps: [
        {
          instruction: 'Pass one: hunt the vague words',
          hint: 'There are four things that name nothing: a size, a judgement, a quantity and a noun. List them with their replacements.',
          minWords: 8,
          placeholder: 'very big → …, isn’t good → …',
          model: 'very big → significant; isn’t good → detrimental; a lot of people → a substantial proportion of the population; things → conditions.',
          why: 'Four swaps and not one clause moved. “Things” is the worst of them: it names nothing, so the reader cannot check whether the claim is true.',
        },
        {
          instruction: 'Pass two: hunt the overclaims',
          hint: 'Two words commit you to more than any essay can support. One is about frequency, the other about certainty.',
          minWords: 6,
          placeholder: 'always → …, prove → …',
          model: 'always → consistently; prove → indicate. And “will get worse” → “are likely to deteriorate”.',
          why: '“Always” dies to one counter-example and “prove” claims a study you cannot cite. The third fix turns a forecast into a probability, which is what the reasoning actually supports.',
        },
        {
          instruction: 'Pass three: the register, then write the paragraph out',
          hint: 'One contraction remains. Fix it, apply all three passes, and write the finished paragraph.',
          minWords: 24,
          placeholder: 'In conclusion, this is a significant problem …',
          model: 'In conclusion, this is a significant problem, and governments have consistently overlooked it. It is detrimental to a substantial proportion of the population, and research indicates that conditions are likely to deteriorate.',
          why: 'Nine swaps in two sentences, and the structure is identical to what was there before. That is what five minutes buys: not a better essay, the same essay without the free mistakes.',
        },
      ],
      result: 'In conclusion, this is a significant problem, and governments have consistently overlooked it. It is detrimental to a substantial proportion of the population, and research indicates that conditions are likely to deteriorate.',
    },
    drills: [
      {
        stem: 'You find “studies prove that all commuters would switch”. What is the minimum fix?',
        correct: 0,
        options: [
          { text: 'Research indicates that most commuters would switch.', why: 'Correct. Two overclaims fixed with two swaps: “prove” → “indicates” and “all” → “most”. Nothing else moved.' },
          { text: 'Studies prove that the majority of commuters would switch.', why: '“All” was fixed and “prove” was not. Research indicates; it does not prove.' },
          { text: 'It is possible that some commuters might perhaps switch.', why: 'Three hedges where one swap was needed. The claim has been emptied rather than corrected.' },
          { text: 'Studies have definitely proven that all commuters would switch.', why: 'Both overclaims got stronger, and a third was added.' },
        ],
      },
      {
        stem: 'Which of these is NOT a register problem in an academic essay?',
        correct: 0,
        options: [
          { text: 'carry out a survey', why: 'Correct. Not every phrasal verb is informal: “carry out” and “point out” are standard academic English.' },
          { text: 'sort out the problem', why: 'Informal. The neutral single verb is “resolve” or “address”.' },
          { text: 'a lot of residents', why: 'Spoken English, and it reports no quantity either.' },
          { text: 'the govt didn’t act', why: 'An abbreviation and a contraction in four words.' },
        ],
      },
      {
        stem: 'With four minutes left you notice Body 2 is weaker than Body 1. What should you do?',
        correct: 0,
        options: [
          { text: 'Leave the structure alone and swap the vague and overclaimed words.', why: 'Correct. Restructuring at this point leaves a visible seam; word swaps improve the response without risking anything.' },
          { text: 'Rewrite the topic sentence of Body 2 so it matches Body 1.', why: 'Restructuring with four minutes left produces a paragraph that is half old and half new.' },
          { text: 'Add a third reason to Body 2 to give it more content.', why: 'A new reason arriving now has no development behind it, and it costs more than the gap it fills.' },
          { text: 'Make each sentence in Body 2 longer and more complex.', why: 'The most reliable way to introduce a grammar error into a paragraph that did not have one.' },
        ],
      },
    ],
  },
];
