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
];
