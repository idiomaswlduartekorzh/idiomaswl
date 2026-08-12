/**
 * Vocabulario académico organizado POR FUNCIÓN: por el trabajo que la palabra hace.
 *
 * POR QUÉ POR FUNCIÓN Y NO POR TEMA
 *
 * David lo pidió así en agosto de 2026 —«vocabulario organizado mostrando la funcionalidad»—
 * y es la decisión correcta, porque el eje temático ya está cubierto y el funcional no.
 *
 * `Cambridge Vocabulary for IELTS` (Pauline Cullen, 2008) organiza sus veinte unidades por
 * TEMA: Growing up, Keeping fit, The energy crisis, The arts. Es el reparto estándar del
 * mercado y sirve para leer. No sirve para escribir: delante de un enunciado sobre coches
 * eléctricos, nadie se pregunta «¿qué palabras sé de transporte?». Se pregunta «¿cómo digo
 * que esto probablemente pasa, pero no siempre?». Eso es una FUNCIÓN, y ningún índice
 * temático la contiene.
 *
 * De ese libro se toma la cobertura, no el texto: está bajo copyright estricto y no se
 * reproduce nada. Su única tabla funcional —Unit 24, los conectores por función— es además
 * exactamente lo que ya cubren las siete familias de `linking-language`, así que aquí no se
 * repite. Estas ocho funciones son las que quedan fuera de esa tabla.
 *
 * LAS OCHO
 *
 *   matizar · afirmar · atribuir · cuantificar
 *   causar  · valorar · proponer · registro
 *
 * Conectar NO está: lo hace `linking-language`, con su propia página por familia.
 *
 * CÓMO SE MUESTRA QUE EL VOCABULARIO PRECISO PUNTÚA MÁS
 *
 * David pidió enseñar «la importancia de usar vocabulario avanzado para subir la banda». No
 * se hace con números: ninguna página del curso puede prometerle una banda a nadie, y la
 * compuerta lo impide desde que se escribió. Se hace con el campo `upgrade`, que enseña la
 * MISMA frase en versión vaga y en versión precisa, y nombra qué gana exactamente —precisión,
 * colocación, registro, rango—, que es lo que el criterio de Lexical Resource mira de verdad.
 *
 * Un número sin explicación no enseña a escribir. Ver que «is a big problem for» se convierte
 * en «poses a measurable risk to», y por qué, sí.
 *
 * EL PATRÓN IMPORTA MÁS QUE LA PALABRA
 *
 * Cada entrada lleva `pattern`: qué construcción exige. «Tend to» pide infinitivo sin «to»
 * detrás, «a significant proportion» pide «of» y plural, «ability» pide «to» y no «of». Saber
 * la palabra y no su patrón es exactamente lo que produce una frase que suena a traducción.
 */

/**
 * Qué tan segura es una palabra en manos de alguien que la acaba de aprender.
 *
 * `safe`  — se puede usar sin pensarlo dos veces.
 * `watch` — funciona, pero arrastra una trampa: una preposición, una coma, un patrón.
 * `avoid` — la que parece que sirve y no sirve. Es la entrada más útil de las tres.
 */
export type Risk = 'safe' | 'watch' | 'avoid';

export type VocabItem = {
  text: string;
  risk: Risk;
  /** La construcción que exige. Es lo que casi nunca se enseña y siempre se falla. */
  pattern: string;
};

/**
 * El comparador vago → preciso.
 *
 * Es la pieza que David pidió: que se vea POR QUÉ el vocabulario preciso puntúa más. `earns`
 * nombra lo que gana en el criterio, sin prometer ninguna banda.
 */
export type Upgrade = {
  vague: string;
  precise: string;
  /** Qué gana: precisión, colocación, registro, rango. Nunca un número. */
  earns: string[];
  why: string;
};

/**
 * El ejercicio de RECONOCIMIENTO, antes del de producción.
 *
 * Tres versiones de la misma frase; solo una hace bien el trabajo de esta función. Las otras
 * dos fallan por los dos motivos reales: pasarse y quedarse corto.
 */
export type FunctionCheck = {
  prompt: string;
  question: string;
  options: { text: string; works: boolean; why: string }[];
};

export type VocabExample = {
  sentence: string;
  /** La palabra o frase que hace el trabajo, para poder seguirla. */
  doing: string;
  why: string;
};

export type VocabMistake = { wrong: string; why: string; right: string };

/** Cada opción lleva SU motivo: una explicación para las cuatro no enseña a nadie. */
export type VocabDrill = {
  stem: string;
  options: { text: string; why: string }[];
  /** Índice tal y como está escrito; la posición la reparte `placeOption`. */
  correct: number;
};

export type VocabFunction = {
  slug: string;
  label: string;
  spanishName: string;
  seoTitle: string;
  seoDescription: string;
  /** El trabajo que hace en el ensayo, en una línea. */
  job: string;
  whenToUse: string;
  tone: 'prompt' | 'claim' | 'development' | 'contrast' | 'link' | 'evidence' | 'review';
  upgrade: Upgrade;
  check: FunctionCheck;
  words: VocabItem[];
  examples: VocabExample[];
  mistakes: VocabMistake[];
  drills: VocabDrill[];
};

export const VOCAB_FUNCTIONS: VocabFunction[] = [
  // ── 1 · Matizar ────────────────────────────────────────────────────────────
  {
    slug: 'hedging',
    label: 'Hedging',
    spanishName: 'Matizar una afirmación',
    seoTitle: 'Hedging en inglés académico: matizar una afirmación sin sonar inseguro',
    seoDescription: 'Tend to, may, is likely to, arguably: cómo bajar la fuerza de una afirmación en inglés sin vaciarla. Con el patrón gramatical de cada una y ejercicios corregidos.',
    job: 'it lowers the temperature of a claim, so you only have to defend what you actually said',
    whenToUse: 'Use a hedge whenever you are about to write something a reader could refute with one counter-example. Most Task 2 prompts invite an absolute answer, and an absolute answer is the easiest thing in the world to argue against — hedging is not weakness, it is the difference between a claim you can support and one you cannot.',
    tone: 'claim',
    upgrade: {
      vague: 'Social media causes depression in young people.',
      precise: 'Heavy social media use appears to be associated with higher rates of depression among young people.',
      earns: ['precision', 'hedging', 'collocation'],
      why: 'The first sentence claims a cause, which nobody can establish in a 250-word essay. The second reports an association and marks it as apparent — a claim you can actually defend. “Associated with” is also the phrase the research itself uses, which is what collocation means in practice.',
    },
    check: {
      prompt: 'Automation will eliminate most manufacturing jobs within a decade.',
      question: 'Which version hedges this claim without emptying it?',
      options: [
        { text: 'Automation is likely to eliminate a substantial share of manufacturing jobs over the next decade.', works: true, why: 'The prediction survives and is now presented as probable rather than certain. “A substantial share” replaces “most” with something defensible without a source.' },
        { text: 'Automation may possibly eliminate some manufacturing jobs at some point in the future.', works: false, why: 'Four hedges stacked on one claim. “May possibly”, “some” and “at some point” leave a sentence that commits to nothing, and that reads as avoidance rather than caution.' },
        { text: 'Automation eliminates manufacturing jobs.', works: false, why: 'The hedge went the wrong way. A prediction became a present-tense fact, which is a stronger claim than the original, not a weaker one.' },
      ],
    },
    words: [
      { text: 'tend to', risk: 'safe', pattern: 'tend to + bare infinitive — “costs tend to rise”, never “tend to rising”. Reports a pattern without claiming it is universal.' },
      { text: 'may / might', risk: 'safe', pattern: 'modal + bare infinitive. “May” leaves a possibility open; it does not mean “sometimes”. Never pair it with “possibly”.' },
      { text: 'is likely to', risk: 'safe', pattern: 'be likely to + infinitive. Stronger than “may”, weaker than “will”. The noun is “the likelihood of” + noun.' },
      { text: 'appears to / seems to', risk: 'safe', pattern: 'appear to + infinitive. Marks a reading of the evidence rather than the fact itself — useful when citing research.' },
      { text: 'arguably', risk: 'watch', pattern: 'Opens the sentence, or sits before an adjective: “arguably the most effective measure”. Twice in one essay and everything sounds contestable.' },
      { text: 'somewhat', risk: 'avoid', pattern: 'Weakens without informing: “somewhat problematic” says nothing about how problematic. Prefer a hedge that names the limit — “in urban areas”, “among younger workers”.' },
    ],
    examples: [
      { sentence: 'Households in the lowest income bracket tend to spend a greater proportion of their income on food.', doing: 'tend to', why: 'The pattern is reported without claiming every household follows it, so the sentence survives the one counter-example a reader will immediately think of. Note the bare infinitive.' },
      { sentence: 'Restricting car access to city centres is likely to reduce congestion, although the effect may be smaller where public transport is limited.', doing: 'is likely to … may', why: 'Two hedges doing two different jobs: one on the prediction, one on the size of the effect. That is the difference between hedging and vagueness — each marks a specific uncertainty.' },
    ],
    mistakes: [
      { wrong: 'It may possibly be somewhat likely that costs will perhaps increase.', why: 'Four hedges on one claim. Each is correct English; together they say nothing at all. One hedge per claim, and it should name what is uncertain.', right: 'Costs are likely to increase.' },
      { wrong: 'Governments tend to investing more in urban areas.', why: '“Tend to” takes a bare infinitive, not an -ing form. It is the commonest grammar error attached to the commonest hedge, because the “to” looks like a preposition and is not.', right: 'Governments tend to invest more in urban areas.' },
    ],
    drills: [
      {
        stem: 'Households on lower incomes ______ spend a greater share of their income on food.',
        correct: 0,
        options: [
          { text: 'tend to', why: 'Correct. “Tend to” plus a bare infinitive reports a pattern without claiming that every household follows it.' },
          { text: 'tend to spending', why: 'The “to” in “tend to” is part of the infinitive, not a preposition, so no -ing form can follow it.' },
          { text: 'are tending to', why: 'The continuous turns a stable pattern into a change happening right now. The sentence reports how things are, not how they are shifting.' },
          { text: 'tend for', why: 'No such pattern exists. “Tend” takes “to” plus a verb, and “tend for” is not English.' },
        ],
      },
      {
        stem: 'The prompt claims that technology has destroyed face-to-face communication. Which reply agrees in part?',
        correct: 0,
        options: [
          { text: 'Technology has arguably weakened face-to-face communication in certain settings.', why: 'Correct. “Arguably” concedes the point is contestable and “in certain settings” names the limit, so the claim is now defensible.' },
          { text: 'Technology has possibly maybe destroyed face-to-face communication in certain settings.', why: '“Possibly maybe” is one hedge too many, and “destroyed” survives untouched — the strong word was the problem.' },
          { text: 'Technology has definitely weakened face-to-face communication in every possible setting.', why: 'Both moves went the wrong way. “Definitely” and “every” make the claim harder to defend than the original.' },
          { text: 'Technology has somewhat destroyed face-to-face communication in certain modern settings.', why: '“Somewhat destroyed” is a contradiction: destruction has no degrees. The hedge was attached to a word that cannot take one.' },
        ],
      },
      {
        stem: 'You want to report a pattern you cannot attach a figure to. Which phrase does that honestly?',
        correct: 0,
        options: [
          { text: 'in many cases', why: 'Correct. It reports that the pattern is common without claiming a majority you have not measured.' },
          { text: 'in most cases', why: '“Most” is a measured claim: more than half. Without a source you cannot support it.' },
          { text: 'in every case', why: 'The strongest possible claim, and one counter-example destroys it.' },
          { text: 'in some case', why: 'Ungrammatical: the phrase is “in some cases”, plural. And “some” is so weak it reports almost nothing.' },
        ],
      },
    ],
  },

  // ── 2 · Afirmar ────────────────────────────────────────────────────────────
  {
    slug: 'asserting',
    label: 'Asserting',
    spanishName: 'Afirmar con fuerza',
    seoTitle: 'Cómo afirmar con fuerza en inglés académico sin exagerar',
    seoDescription: 'Undoubtedly, invariably, markedly, consistently: cuándo subir la fuerza de una afirmación en inglés y cuándo se vuelve en tu contra. Ejemplos y ejercicios.',
    job: 'it raises the temperature of a claim, so the reader knows which points you are prepared to stand behind',
    whenToUse: 'Use it sparingly, and only where the evidence in your own paragraph earns it. An essay that hedges everything has no position, which the Task Response criterion notices. The skill is not choosing strong words — it is choosing the two or three places in an essay where a strong word is deserved.',
    tone: 'contrast',
    upgrade: {
      vague: 'Vaccination programmes are very important for public health.',
      precise: 'Mass vaccination has been decisively effective in reducing the incidence of preventable disease.',
      earns: ['precision', 'range', 'collocation'],
      why: '“Very important” is the phrase a writer reaches for when they have not decided what the claim is. The second sentence names the effect, names its size, and uses “decisively effective” — a pairing an examiner reads as control, not as an intensifier bolted onto a vague adjective.',
    },
    check: {
      prompt: 'Some people believe that regular exercise improves mental health.',
      question: 'You want to state that you find this well established. Which version does that without overreaching?',
      options: [
        { text: 'Regular exercise has consistently been shown to improve mental health.', works: true, why: 'Strong and still accountable. “Consistently” reports a pattern across studies, and “has been shown” attributes the finding rather than asserting it out of nowhere.' },
        { text: 'Regular exercise obviously improves mental health, as everybody knows.', works: false, why: '“Obviously” and “everybody knows” assert that no argument is needed, which is the one thing an essay may never do. If it were obvious the prompt would not be asking.' },
        { text: 'Regular exercise can sometimes have a positive effect on mental health.', works: false, why: 'That is a hedge, not an assertion. You said you find this well established; this sentence says the opposite of that.' },
      ],
    },
    words: [
      { text: 'consistently', risk: 'safe', pattern: 'Before the verb or after the auxiliary: “has consistently been shown”. Claims a pattern that repeats, which is stronger than one result and weaker than a law.' },
      { text: 'markedly', risk: 'safe', pattern: 'Before the verb or the adjective: “markedly higher”, “markedly improved”. Says the difference is large enough to be visible in the data.' },
      { text: 'substantially', risk: 'safe', pattern: 'Modifies verbs and comparatives: “substantially reduce”, “substantially greater”. Never “substantially big” — it needs a comparative.' },
      { text: 'undoubtedly', risk: 'watch', pattern: 'Opens the sentence with a comma, or sits before the verb. It claims no reasonable person disagrees, which is only safe for a fact nobody contests.' },
      { text: 'invariably', risk: 'watch', pattern: 'Before the verb. It means “without a single exception”, not “usually” — one counter-example and the sentence is false.' },
      { text: 'totally / hugely / massively', risk: 'avoid', pattern: 'Conversational intensifiers. They raise volume, not precision, and they are the clearest register drop available in an academic essay.' },
    ],
    examples: [
      { sentence: 'Cities with protected cycle networks have consistently recorded lower rates of serious road injury.', doing: 'consistently', why: 'It claims a repeated pattern rather than a single result, which is a strong claim that evidence can actually support. “Recorded” keeps it to what the data shows.' },
      { sentence: 'The scheme substantially reduced peak-hour traffic, although its effect on air quality was harder to isolate.', doing: 'substantially … harder to isolate', why: 'A strong claim and an honest limit in one sentence. Asserting is more convincing when the writer visibly declines to assert the next thing.' },
    ],
    mistakes: [
      { wrong: 'This policy is invariably successful in most countries.', why: '“Invariably” means without exception and “in most countries” admits exceptions. The two halves of the sentence contradict each other.', right: 'This policy has been successful in most of the countries that have adopted it.' },
      { wrong: 'The results were hugely better than expected.', why: 'Two problems: “hugely” is conversational, and it is doing the work a precise comparison should do. Say how much better, or say “markedly”.', right: 'The results were markedly better than expected.' },
    ],
    drills: [
      {
        stem: 'Cities with protected cycle lanes have ______ recorded fewer serious road injuries.',
        correct: 0,
        options: [
          { text: 'consistently', why: 'Correct. It claims the pattern repeats across cities, which is strong and still supportable.' },
          { text: 'invariably', why: 'It claims not one exception anywhere. A single city with a different result makes the sentence false.' },
          { text: 'hugely', why: 'Conversational, and it modifies size where the sentence needs frequency. Injuries are not recorded “hugely”.' },
          { text: 'obviously', why: 'It tells the reader no evidence is needed, which is the one move an academic essay cannot make.' },
        ],
      },
      {
        stem: 'You have one paragraph of evidence behind a claim. Which opener does that evidence earn?',
        correct: 0,
        options: [
          { text: 'The evidence strongly suggests that', why: 'Correct. It commits to a direction while leaving the finding attributable to the evidence rather than to you.' },
          { text: 'It is beyond any possible doubt that', why: 'A single paragraph cannot put anything beyond doubt. The claim outruns what you have shown.' },
          { text: 'Everybody would surely agree that', why: 'An appeal to consensus instead of an argument, and the prompt exists precisely because people disagree.' },
          { text: 'It might conceivably be the case that', why: 'This throws away the evidence you have. You built a paragraph; the sentence should reflect it.' },
        ],
      },
      {
        stem: 'Rents in the capital rose ______ faster than wages over the same period.',
        correct: 0,
        options: [
          { text: 'substantially', why: 'Correct. It modifies the comparative “faster”, which is exactly the slot this adverb takes.' },
          { text: 'substantial', why: 'An adjective cannot modify “faster”. The slot needs an adverb.' },
          { text: 'very much', why: 'Conversational, and vague where a comparison invites precision.' },
          { text: 'undoubtedly', why: 'It asserts that nobody disputes the fact, which says nothing about how much faster rents rose.' },
        ],
      },
    ],
  },

  // ── 3 · Atribuir ───────────────────────────────────────────────────────────
  {
    slug: 'attributing',
    label: 'Attributing',
    spanishName: 'Atribuir una idea a alguien',
    seoTitle: 'Atribuir ideas en inglés académico: according to, research suggests, it is argued that',
    seoDescription: 'Cómo dejar claro de quién es cada idea en un ensayo en inglés sin inventar fuentes. According to, research suggests, proponents argue, con sus patrones y ejercicios.',
    job: 'it makes clear whose claim each sentence is — yours, the prompt’s, or somebody else’s',
    whenToUse: 'Every discussion essay depends on this. If the reader cannot tell which sentences report a view you are about to answer and which ones are your own position, the whole essay reads as one confused opinion — and that costs marks under Task Response before Lexical Resource is even reached.',
    tone: 'evidence',
    upgrade: {
      vague: 'People say that private cars should be banned from city centres.',
      precise: 'Advocates of car-free city centres argue that a full ban is the only measure that meaningfully reduces congestion.',
      earns: ['precision', 'range', 'register'],
      why: '“People say” names nobody, so the reader cannot weigh the claim. Naming who holds a view — advocates, critics, researchers, employers — costs four words and turns an unattributed rumour into a position you can then answer.',
    },
    check: {
      prompt: 'You want to report a view you disagree with, before answering it.',
      question: 'Which sentence attributes the view clearly without adopting it?',
      options: [
        { text: 'Critics of the policy argue that it penalises households with no alternative to driving.', works: true, why: 'The holder of the view is named, the verb “argue” marks it as a position rather than a fact, and nothing here commits you to agreeing with it.' },
        { text: 'The policy penalises households with no alternative to driving.', works: false, why: 'The attribution vanished, so this is now your claim. You were about to disagree with it.' },
        { text: 'Everybody knows the policy penalises households with no alternative to driving.', works: false, why: '“Everybody knows” both invents a consensus and turns the view into a fact. It is the opposite of attributing.' },
      ],
    },
    words: [
      { text: 'According to X,', risk: 'safe', pattern: 'Preposition plus its object, then a comma: “According to researchers, …”. Never split from the object, and never “according to me”.' },
      { text: 'Research suggests that', risk: 'safe', pattern: 'Followed by a clause. “Research” is uncountable here — “research suggests”, never “researches suggest”.' },
      { text: 'Proponents / critics argue that', risk: 'safe', pattern: 'Names who holds the view, then a clause. The cheapest way to make a discussion essay readable.' },
      { text: 'It is widely held that', risk: 'watch', pattern: 'Impersonal passive plus a clause. Useful when the view genuinely is widespread, and dishonest when it is not — you cannot verify “widely”.' },
      { text: 'be attributed to', risk: 'watch', pattern: 'Passive plus “to” plus a noun: “the fall was attributed to the new levy”. Reports somebody else’s explanation, not yours.' },
      { text: 'Studies have proven that', risk: 'avoid', pattern: 'Research does not prove; it shows, suggests, indicates. “Proven” overstates what any study can do, and examiners read it as a memorised phrase.' },
    ],
    examples: [
      { sentence: 'According to labour economists, automation displaces routine tasks rather than whole occupations.', doing: 'According to', why: 'One phrase, and the reader knows this is a reported finding rather than the writer’s hunch. The main clause is left free to carry the claim itself.' },
      { sentence: 'Supporters of the scheme argue that it funds public transport; critics counter that it charges the poorest drivers most.', doing: 'argue … counter', why: 'Two attributed positions in one sentence, and the writer has taken neither. That is what the opening of a discussion essay is supposed to do.' },
    ],
    mistakes: [
      { wrong: 'According to me, private cars should be banned from city centres.', why: '“According to” reports somebody else’s view. For your own position the phrase is “in my view” — or, better, just state it: the essay is already yours.', right: 'In my view, private cars should be banned from city centres.' },
      { wrong: 'Recent researches have proven that remote work increases productivity.', why: 'Two errors in three words. “Research” is uncountable in this sense, and studies do not prove — they indicate, suggest or show.', right: 'Recent research indicates that remote work increases productivity.' },
    ],
    drills: [
      {
        stem: '______ labour economists, automation displaces routine tasks rather than whole occupations.',
        correct: 0,
        options: [
          { text: 'According to', why: 'Correct. The preposition takes its object immediately and the comma follows the whole phrase.' },
          { text: 'According with', why: '“Accord with” exists as a verb, but the fixed phrase for reporting a source is “according to”.' },
          { text: 'According to the', why: 'The article makes it a specific named group the sentence never identifies.' },
          { text: 'In according to', why: 'Two prepositions where the phrase takes none. It is a calque of “de acuerdo con”.' },
        ],
      },
      {
        stem: 'Recent research ______ that remote workers report higher job satisfaction.',
        correct: 0,
        options: [
          { text: 'indicates', why: 'Correct. Singular agreement with uncountable “research”, and a verb that reports what a study can actually do.' },
          { text: 'indicate', why: '“Research” is uncountable in this sense, so the verb is singular.' },
          { text: 'have proven', why: 'Wrong number and an overclaim: research indicates or shows, it does not prove.' },
          { text: 'proves definitely', why: 'A study cannot prove definitely, and the adverb adds volume rather than meaning.' },
        ],
      },
      {
        stem: 'You are about to answer a view you reject. Which opening reports it without adopting it?',
        correct: 0,
        options: [
          { text: 'Opponents of the measure contend that it raises costs unfairly.', why: 'Correct. Who holds the view is named, and “contend” marks it as a contested position rather than a fact.' },
          { text: 'The measure raises costs unfairly for a great many people.', why: 'No attribution at all, so the claim is now yours — and you were about to argue against it.' },
          { text: 'It is obvious that the measure raises costs quite unfairly.', why: '“It is obvious” asserts the view instead of reporting it, and asserts it as beyond argument.' },
          { text: 'Some people say the measure raises the costs unfairly.', why: '“Some people say” names nobody, so the reader cannot weigh the view before you answer it.' },
        ],
      },
    ],
  },

  // ── 4 · Cuantificar ────────────────────────────────────────────────────────
  {
    slug: 'quantifying',
    label: 'Quantifying',
    spanishName: 'Cuantificar sin datos',
    seoTitle: 'Cuantificar en inglés académico: a significant proportion, the vast majority, a minority',
    seoDescription: 'Cómo decir cuántos en un ensayo en inglés sin inventar cifras. A significant proportion, the vast majority, a minority, negligible: patrón, concordancia y ejercicios.',
    job: 'it says how many or how much, at a level of precision you can actually defend',
    whenToUse: 'Task 2 gives you no data, so every quantity you write is your own. That is exactly why the words matter: “most”, “many” and “a lot of” are three different claims, and only one of them is usually true. Choosing the honest one is both a vocabulary skill and an argument skill.',
    tone: 'development',
    upgrade: {
      vague: 'A lot of people in cities have problems with housing costs.',
      precise: 'A substantial proportion of urban households spend more than a third of their income on rent.',
      earns: ['precision', 'range', 'register'],
      why: '“A lot of” is spoken English and reports no quantity at all. “A substantial proportion of urban households” names who, and “more than a third of their income” names what the problem actually is — the vague version has neither.',
    },
    check: {
      prompt: 'You believe this is true of clearly more than half of a group, but you have no figure.',
      question: 'Which phrase states that honestly?',
      options: [
        { text: 'the majority of', works: true, why: 'It claims more than half and nothing beyond that. Without a source, it is the strongest quantity you can support.' },
        { text: 'the overwhelming majority of', works: false, why: '“Overwhelming” claims a proportion close to all. You said clearly more than half, which is a different and much weaker statement.' },
        { text: 'a number of', works: false, why: 'It reports no proportion at all — “a number of” is true of three people. You believe it is more than half, and this hides that.' },
      ],
    },
    words: [
      { text: 'a significant proportion of', risk: 'safe', pattern: 'Followed by a plural or uncountable noun, with a singular verb: “a significant proportion of students is”. Careful — usage now accepts the plural verb too.' },
      { text: 'the majority of', risk: 'safe', pattern: 'Plural noun, plural verb: “the majority of workers report”. Means more than half, never “a lot”.' },
      { text: 'a minority of', risk: 'safe', pattern: 'Plural noun. Means fewer than half — useful for conceding a point without giving up your position.' },
      { text: 'a third / two thirds of', risk: 'safe', pattern: 'Takes “of” plus the noun, and the verb agrees with that noun. Fractions read as more considered than “many”, even without a source.' },
      { text: 'negligible', risk: 'watch', pattern: 'An adjective before a noun: “a negligible effect”. It claims the amount is too small to matter, which is a real claim your paragraph must support.' },
      { text: 'a lot of / lots of', risk: 'avoid', pattern: 'Spoken English. It states no quantity and lowers the register in the same three words — the clearest downgrade available in this function.' },
    ],
    examples: [
      { sentence: 'A significant proportion of urban households now spend more than a third of their income on rent.', doing: 'a significant proportion of … more than a third', why: 'Two quantities, neither invented: one describes how many households, the other how big the burden is. Neither claims a figure the writer does not have.' },
      { sentence: 'While a minority of employers have adopted the scheme, those that have report markedly lower turnover.', doing: 'a minority of', why: 'Conceding the small numbers up front makes the second half more convincing, not less. Quantifying honestly is an argumentative move as much as a lexical one.' },
    ],
    mistakes: [
      { wrong: 'The majority of the pollution comes from private vehicles.', why: '“The majority of” counts things; pollution is uncountable here. The word for an uncountable amount is “most”, or name the share.', right: 'Most of the pollution comes from private vehicles.' },
      { wrong: 'A lot of studies shows that exercise improves mood.', why: 'Register and agreement in one short clause. “A lot of” is conversational, and after it the plural “studies” needs “show”.', right: 'A number of studies show that exercise improves mood.' },
    ],
    drills: [
      {
        stem: '______ urban households now spend more than a third of their income on rent.',
        correct: 0,
        options: [
          { text: 'A significant proportion of', why: 'Correct. It reports a share large enough to matter without claiming a figure the writer does not have.' },
          { text: 'A lot of', why: 'Spoken English, and it reports no proportion at all.' },
          { text: 'The whole of', why: 'It claims every urban household, which one counter-example destroys.' },
          { text: 'A significant amount of', why: '“Amount” is for uncountable things. Households are counted, so the word is “number” or “proportion”.' },
        ],
      },
      {
        stem: 'The majority of workers in the survey ______ that they would not return to a daily commute.',
        correct: 0,
        options: [
          { text: 'report', why: 'Correct. “The majority of workers” takes a plural verb, because the verb agrees with the countable noun after “of”.' },
          { text: 'reports', why: 'The verb agrees with “workers”, not with “majority”. Plural noun, plural verb.' },
          { text: 'is reporting', why: 'Wrong number, and the continuous turns a survey finding into something happening as we speak.' },
          { text: 'are report', why: 'Two verbs where the sentence needs one.' },
        ],
      },
      {
        stem: 'You want to concede that few employers have adopted a scheme, before arguing it works. Which phrase?',
        correct: 0,
        options: [
          { text: 'While a minority of employers have adopted it,', why: 'Correct. It concedes the small numbers and sets up the contrast the next clause needs.' },
          { text: 'While hardly any employers have adopted it,', why: '“Hardly any” is close to none, which undercuts the argument you are about to make.' },
          { text: 'While a lot of employers have adopted it,', why: 'This says the opposite of what you meant to concede, and it lowers the register.' },
          { text: 'While a minority of employers has adopted it,', why: 'The quantifier is right and the agreement is not: “employers” is plural, so the verb is “have”.' },
        ],
      },
    ],
  },

  // ── 5 · Causar ─────────────────────────────────────────────────────────────
  {
    slug: 'causing',
    label: 'Causing',
    spanishName: 'Causa y consecuencia',
    seoTitle: 'Causa y efecto en inglés académico: stem from, give rise to, be attributable to',
    seoDescription: 'Verbos de causa y consecuencia en inglés para IELTS: stem from, give rise to, trigger, be attributable to. Con su preposición, su dirección y ejercicios corregidos.',
    job: 'it names which way the arrow points between two things',
    whenToUse: 'Problem–solution and cause–effect essays are built entirely from this function, and it is where the most expensive error in Task 2 lives: writing a causal verb when you only have a correlation, or writing it backwards. The words carry direction — get the direction wrong and the paragraph argues the opposite of what you meant.',
    tone: 'link',
    upgrade: {
      vague: 'Bad city planning makes traffic problems happen.',
      precise: 'Poorly integrated transport planning gives rise to chronic congestion on arterial routes.',
      earns: ['precision', 'collocation', 'register'],
      why: '“Makes … happen” is the construction you use when you do not know the verb. “Give rise to” is the verb, and it takes a noun directly. “Chronic congestion” and “arterial routes” then say which traffic problem, on which roads — which is what precision means here.',
    },
    check: {
      prompt: 'Two things move together in the data, but nobody has shown which one drives the other.',
      question: 'Which sentence reports that honestly?',
      options: [
        { text: 'Higher screen time is associated with poorer sleep quality among adolescents.', works: true, why: '“Associated with” reports that the two move together and claims nothing about direction — which is exactly the state of the evidence.' },
        { text: 'Higher screen time causes poorer sleep quality among adolescents.', works: false, why: 'A causal verb where only a correlation exists. This is the single most expensive vocabulary error in Task 2, because it is invisible to the writer.' },
        { text: 'Poorer sleep quality among adolescents leads to higher screen time.', works: false, why: 'The arrow was not just claimed, it was pointed the other way. Nothing in the evidence supports either direction.' },
      ],
    },
    words: [
      { text: 'stem from / arise from', risk: 'safe', pattern: 'Verb plus “from” plus a noun. The effect comes first: “the shortage stems from years of underinvestment”.' },
      { text: 'give rise to', risk: 'safe', pattern: 'Takes a noun directly, no preposition: “gives rise to congestion”. The cause comes first — the opposite direction to “stem from”.' },
      { text: 'be associated with', risk: 'safe', pattern: 'Passive plus “with” plus a noun. Claims things move together and nothing about which causes which. The honest choice when you do not know.' },
      { text: 'be attributable to', risk: 'watch', pattern: 'Passive plus “to” plus a noun. Reports somebody’s explanation of a cause, not the cause itself. Note “attributable”, never “attributed of”.' },
      { text: 'trigger', risk: 'watch', pattern: 'Takes a noun directly. Implies a sudden cause with a rapid effect, so it is wrong for slow processes like urbanisation.' },
      { text: 'due to', risk: 'avoid', pattern: 'In careful writing it follows a noun and a form of “be”: “the delay was due to funding”. Opening a sentence with it is common and still marked — use “because of” or “owing to”.' },
    ],
    examples: [
      { sentence: 'The shortage of affordable housing stems from two decades of under-building rather than from recent migration.', doing: 'stems from', why: 'The effect leads and the cause follows, which lets the sentence rule out a second cause in the same breath. Note the “from” on both sides of “rather than”.' },
      { sentence: 'Poorly integrated transport planning gives rise to congestion, which in turn raises the cost of moving goods.', doing: 'gives rise to … in turn', why: 'A chain of two steps, with the direction stated once and then continued. “In turn” is what stops the second effect reading as a second cause.' },
    ],
    mistakes: [
      { wrong: 'The rise in obesity is attributed of a more sedentary lifestyle.', why: 'The preposition is “to”, not “of”, and the adjective form is usually the better choice: “is attributable to”.', right: 'The rise in obesity is attributable to a more sedentary lifestyle.' },
      { wrong: 'Due to the population grew quickly, services came under strain.', why: '“Due to” cannot introduce a clause. It follows a noun and a form of “be”; to open a sentence about a cause, the word is “because” or “as”.', right: 'Because the population grew quickly, services came under strain.' },
    ],
    drills: [
      {
        stem: 'The housing shortage ______ two decades of under-building.',
        correct: 0,
        options: [
          { text: 'stems from', why: 'Correct. The effect is the subject and “from” introduces the cause, which is the direction this verb takes.' },
          { text: 'stems of', why: 'The verb takes “from”. “Stem of” is a noun phrase about plants.' },
          { text: 'gives rise to', why: 'Right idea, wrong direction. This verb puts the cause first, and here the subject is the effect.' },
          { text: 'is stemmed from', why: '“Stem from” is not passive. The effect does the stemming.' },
        ],
      },
      {
        stem: 'Two variables move together and no study has established which drives the other. Which verb is honest?',
        correct: 0,
        options: [
          { text: 'is associated with', why: 'Correct. It reports that the two move together and claims nothing about direction, which matches the evidence exactly.' },
          { text: 'causes', why: 'A causal claim the evidence does not support. This is the most expensive vocabulary error in Task 2.' },
          { text: 'is caused by', why: 'The same overclaim, pointing the arrow the other way. Neither direction has been shown.' },
          { text: 'triggers', why: 'Causal and sudden. It claims direction and speed, and the evidence gives neither.' },
        ],
      },
      {
        stem: 'The delay in the project was ______ a shortfall in central funding.',
        correct: 0,
        options: [
          { text: 'due to', why: 'Correct. Here “due to” follows a noun and the verb “was”, which is the position careful writing reserves for it.' },
          { text: 'due of', why: 'The phrase takes “to”. “Due of” does not exist.' },
          { text: 'because', why: '“Because” introduces a clause with its own verb, and what follows here is a noun phrase.' },
          { text: 'because to', why: 'Two words that never combine. “Because” takes a clause and “because of” takes a noun.' },
        ],
      },
    ],
  },

  // ── 6 · Valorar ────────────────────────────────────────────────────────────
  {
    slug: 'evaluating',
    label: 'Evaluating',
    spanishName: 'Valorar y juzgar',
    seoTitle: 'Vocabulario para valorar en inglés: beneficial, detrimental, counterproductive, viable',
    seoDescription: 'Cómo decir que algo es bueno o malo en un ensayo en inglés sin usar good y bad. Beneficial, detrimental, counterproductive, viable: matiz, patrón y ejercicios.',
    job: 'it says whether something is good or bad, and in what specific respect',
    whenToUse: 'Every advantages–disadvantages essay, and the conclusion of almost every other type. “Good” and “bad” are not wrong, they are empty: they judge without saying in what respect. The word you want names the dimension — beneficial to whom, detrimental to what, viable under what conditions.',
    tone: 'review',
    upgrade: {
      vague: 'Working from home is good for workers but bad for companies.',
      precise: 'Home working is beneficial for employees’ work–life balance but detrimental to the informal contact teams depend on.',
      earns: ['precision', 'range', 'collocation'],
      why: 'The vague version judges twice and explains nothing. The precise one names the respect in each case — balance for the worker, informal contact for the firm — which is the content the vague version was missing, not just better words for it.',
    },
    check: {
      prompt: 'A policy achieves the opposite of what it intended.',
      question: 'Which word says that exactly?',
      options: [
        { text: 'counterproductive', works: true, why: 'It means the measure works against its own aim, which is precisely the situation. No other word in this family carries that.' },
        { text: 'ineffective', works: false, why: 'Ineffective means it achieved nothing. This policy achieved something — the wrong thing — and that is a stronger criticism.' },
        { text: 'detrimental', works: false, why: 'Detrimental means harmful, but it says nothing about the policy’s own aim. The point here is the reversal.' },
      ],
    },
    words: [
      { text: 'beneficial', risk: 'safe', pattern: 'Takes “to” or “for” plus who benefits: “beneficial to public health”. Always name the beneficiary — otherwise it is “good” with more letters.' },
      { text: 'detrimental', risk: 'safe', pattern: 'Takes “to”, never “for”: “detrimental to air quality”. The formal opposite of beneficial, and one of the most useful adjectives in Task 2.' },
      { text: 'counterproductive', risk: 'safe', pattern: 'Predicative, after “be”: “the ban proved counterproductive”. Means it works against its own aim — not merely that it failed.' },
      { text: 'viable', risk: 'safe', pattern: 'Before a noun or after “be”: “a viable alternative”. Means it can actually work in practice, which is a different claim from “good”.' },
      { text: 'sustainable', risk: 'watch', pattern: 'Before a noun. It means capable of continuing, which is broader than environmental — “a sustainable funding model” has nothing to do with the climate.' },
      { text: 'good / bad', risk: 'avoid', pattern: 'Not wrong, but empty: they judge without naming the respect. Every use is a place where a more precise adjective would have added information for free.' },
    ],
    examples: [
      { sentence: 'Congestion charging has proved beneficial to air quality but detrimental to households with no public transport alternative.', doing: 'beneficial to … detrimental to', why: 'Both judgements name what is affected, so the sentence carries an argument rather than an opinion. Note that “detrimental” takes “to”.' },
      { sentence: 'Banning the sale outright proved counterproductive, pushing the trade into an unregulated market.', doing: 'counterproductive', why: 'One word says the ban worked against its own aim, and the participle clause then shows how. “Ineffective” would have missed the point entirely.' },
    ],
    mistakes: [
      { wrong: 'The policy was detrimental for small businesses.', why: 'The collocation is “detrimental to”. It is a small error that appears in almost every draft, because Spanish “perjudicial para” takes the other preposition.', right: 'The policy was detrimental to small businesses.' },
      { wrong: 'Public transport is very good, so more people should use it.', why: '“Very good” names no respect, so the “so” has nothing to rest on. Good how — cheaper, cleaner, faster? The conclusion needs the missing word.', right: 'Public transport is substantially cleaner per passenger, so more people should use it.' },
    ],
    drills: [
      {
        stem: 'The scheme has proved ______ to air quality in the city centre.',
        correct: 0,
        options: [
          { text: 'beneficial', why: 'Correct. It takes “to” plus what benefits, and it names the respect in which the scheme is good.' },
          { text: 'benefit', why: 'A noun where the slot needs an adjective after “proved”.' },
          { text: 'beneficiary', why: 'A beneficiary is the person who benefits, not the quality of being good for something.' },
          { text: 'good', why: 'Grammatical and empty. It judges without saying in what respect, which is the information the sentence needs.' },
        ],
      },
      {
        stem: 'A ban pushed the trade into an unregulated market, achieving the reverse of its aim. It was ______.',
        correct: 0,
        options: [
          { text: 'counterproductive', why: 'Correct. The measure worked against its own purpose, which is exactly what this word means.' },
          { text: 'ineffective', why: 'Ineffective means it achieved nothing. This ban achieved something worse than nothing.' },
          { text: 'unsustainable', why: 'That would mean it could not continue. The problem is what it did, not how long it lasted.' },
          { text: 'not very good', why: 'Conversational, and far weaker than what happened. The ban did not underperform; it backfired.' },
        ],
      },
      {
        stem: 'The measure was ______ small businesses operating on thin margins.',
        correct: 0,
        options: [
          { text: 'detrimental to', why: 'Correct. This adjective takes “to”, and the phrase names exactly who was harmed.' },
          { text: 'detrimental for', why: 'The right adjective with the wrong preposition — a direct carry-over from “perjudicial para”.' },
          { text: 'detriment to', why: '“Detriment” is the noun. After “was”, the slot needs the adjective.' },
          { text: 'bad for', why: 'Grammatical, and it drops both the register and the precision the sentence had.' },
        ],
      },
    ],
  },

  // ── 7 · Proponer ───────────────────────────────────────────────────────────
  {
    slug: 'proposing',
    label: 'Proposing',
    spanishName: 'Proponer soluciones',
    seoTitle: 'Vocabulario para proponer soluciones en inglés: implement, allocate, phase out',
    seoDescription: 'Verbos para proponer medidas en un ensayo en inglés: implement, allocate, prioritise, phase out, subsidise. Con su objeto típico, su registro y ejercicios corregidos.',
    job: 'it names what should be done, precisely enough that a reader could picture it happening',
    whenToUse: 'Every problem–solution essay ends here, and it is where most of them collapse into “the government should do something about it”. A proposal is only worth marks if the reader can see the action: who does what, to what, with what. These verbs carry that specificity in a single word.',
    tone: 'prompt',
    upgrade: {
      vague: 'The government should do something about public transport.',
      precise: 'Central government should allocate a fixed share of fuel duty to expanding suburban rail capacity.',
      earns: ['precision', 'range', 'collocation'],
      why: '“Do something about” is the phrase that marks an essay as having run out of ideas. The precise version names the actor, the mechanism, the money and the target — and none of that needed extra knowledge, only the verb “allocate” and the discipline to finish the sentence.',
    },
    check: {
      prompt: 'You want to propose that a harmful practice be ended gradually rather than at once.',
      question: 'Which verb says that?',
      options: [
        { text: 'phase out', works: true, why: 'It means to withdraw something in stages over time, which is precisely a gradual ending. One verb carries what the vague version needs a clause for.' },
        { text: 'ban', works: false, why: 'A ban is immediate and total. You proposed the opposite of that.' },
        { text: 'discourage', works: false, why: 'Discouraging leaves the practice legal and continuing. It is a much weaker proposal than the one you meant to make.' },
      ],
    },
    words: [
      { text: 'implement', risk: 'safe', pattern: 'Takes a noun: a policy, a scheme, a measure, a ban. Never a person and never an abstract noun like “improvement”.' },
      { text: 'allocate', risk: 'safe', pattern: 'allocate + resource + “to” + purpose: “allocate funding to rural clinics”. The verb that turns a wish into a proposal, because it names where the money comes from.' },
      { text: 'phase out', risk: 'safe', pattern: 'Separable phrasal verb: “phase out subsidies” or “phase them out”. Means withdraw in stages, which is a specific and often more defensible proposal than a ban.' },
      { text: 'prioritise', risk: 'safe', pattern: 'Takes a noun directly, no preposition: “prioritise preventive care”. It implies something else gets less, which is what makes it an argument.' },
      { text: 'subsidise', risk: 'watch', pattern: 'Takes a noun directly: “subsidise public transport”, never “subsidise to”. Note the spelling shifts to a “z” in American English.' },
      { text: 'should do something about', risk: 'avoid', pattern: 'It proposes nothing. Every occurrence is a place where naming the actual measure would have cost five words and earned the paragraph its marks.' },
    ],
    examples: [
      { sentence: 'Central government should allocate a fixed share of fuel duty to expanding suburban rail capacity.', doing: 'allocate … to', why: 'The actor, the source of the money and the target are all named, so a reader can picture the measure. That is the whole difference between a proposal and a wish.' },
      { sentence: 'Rather than banning the fuel outright, governments could phase out subsidies over a decade while funding alternatives.', doing: 'phase out', why: 'The verb carries the gradualness, which frees the rest of the sentence to say what happens instead. Note the contrast with “banning”, set up in the opening clause.' },
    ],
    mistakes: [
      { wrong: 'The government should implement more attention to rural areas.', why: '“Implement” takes a policy, a scheme or a measure — something with a plan behind it. Attention cannot be implemented.', right: 'The government should direct more resources to rural areas.' },
      { wrong: 'Authorities should subsidise to families with young children.', why: '“Subsidise” takes its object directly, with no preposition. The “to” is carried over from “subsidiar a”.', right: 'Authorities should subsidise families with young children.' },
    ],
    drills: [
      {
        stem: 'Central government should ______ a fixed share of fuel duty to suburban rail.',
        correct: 0,
        options: [
          { text: 'allocate', why: 'Correct. It takes a resource and a “to” phrase naming the purpose, which is what makes this a proposal rather than a wish.' },
          { text: 'implement', why: 'You implement a policy or a scheme, not a share of a tax.' },
          { text: 'allocate to', why: 'The preposition belongs before the purpose at the end, not immediately after the verb.' },
          { text: 'do something with', why: 'Conversational, and it proposes nothing at all.' },
        ],
      },
      {
        stem: 'You want to end a subsidy gradually rather than at once. Which verb carries that?',
        correct: 0,
        options: [
          { text: 'phase out', why: 'Correct. It means to withdraw in stages, so one verb does the work of a whole clause.' },
          { text: 'ban', why: 'A ban is immediate and total, which is the opposite of what you proposed.' },
          { text: 'phase off', why: 'The particle is “out”. “Phase off” is not an English phrasal verb.' },
          { text: 'cancel slowly', why: 'Grammatical and clumsy: cancelling is instantaneous, so it cannot be done slowly.' },
        ],
      },
      {
        stem: 'Authorities should ______ families on the lowest incomes.',
        correct: 0,
        options: [
          { text: 'subsidise', why: 'Correct. The verb takes its object directly, with no preposition in between.' },
          { text: 'subsidise to', why: 'The “to” is carried over from Spanish. This verb takes no preposition.' },
          { text: 'subsidy', why: 'A noun where the sentence needs a verb after “should”.' },
          { text: 'give subsidies for', why: 'Grammatical but longer and weaker, and the preposition after “subsidies” would be “to”.' },
        ],
      },
    ],
  },

  // ── 8 · Registro ───────────────────────────────────────────────────────────
  {
    slug: 'register',
    label: 'Register',
    spanishName: 'Mantener el registro académico',
    seoTitle: 'Registro académico en inglés: qué palabras no puedes usar en el IELTS',
    seoDescription: 'Contracciones, abreviaturas, phrasal verbs informales y palabras habladas que bajan el registro de un ensayo en inglés. Qué usar en su lugar, con ejercicios.',
    job: 'it keeps every sentence at the formality the task expects',
    whenToUse: 'All the time, and especially in the last paragraph, when time is short and spoken English starts leaking in. Register is the cheapest thing to fix and the easiest to lose: one “kids”, one “a lot of”, one “don’t”, and a paragraph that was otherwise controlled reads as careless.',
    tone: 'review',
    upgrade: {
      vague: 'Lots of kids these days don’t get enough exercise, which isn’t great for their health.',
      precise: 'A substantial proportion of children now take insufficient exercise, with measurable consequences for their health.',
      earns: ['register', 'precision', 'range'],
      why: 'Four separate drops in one sentence: “lots of”, “kids”, the two contractions, and “isn’t great” as a judgement. None of them is a grammar error, which is why they survive proofreading — and why the corrected version reads as a different writer.',
    },
    check: {
      prompt: 'To sum up, I reckon the govt needs to sort out this problem ASAP.',
      question: 'How many separate register problems are in that sentence?',
      options: [
        { text: 'Four: “reckon”, “govt”, “sort out” and “ASAP”.', works: true, why: 'Each one is a different kind of drop: a spoken verb, an abbreviation, an informal phrasal verb, and an initialism. The sentence is grammatical throughout, which is exactly why they are easy to miss.' },
        { text: 'One: the abbreviation “govt”.', works: false, why: 'The abbreviation is the most visible problem, not the only one. The other three are just as informal and less obvious.' },
        { text: 'None: it is grammatically correct.', works: false, why: 'Correct, and that is the trap. Register is judged separately from grammar, and nothing here is a grammar error.' },
      ],
    },
    words: [
      { text: 'Write out the full form', risk: 'safe', pattern: '“do not”, not “don’t”; “cannot”, not “can’t”. Contractions belong to speech, and the fix costs one keystroke.' },
      { text: 'Write out abbreviations', risk: 'safe', pattern: '“for example”, not “e.g.”; “that is”, not “i.e.”; “government”, not “govt”. Only universally known initialisms stay, and even those are written in full on first use.' },
      { text: 'Prefer a single verb to an informal phrasal', risk: 'safe', pattern: '“resolve”, not “sort out”; “reduce”, not “cut down on”; “tolerate”, not “put up with”. Not every phrasal verb is informal — “carry out” and “point out” are fine.' },
      { text: 'Name the group, not the crowd', risk: 'watch', pattern: '“children”, not “kids”; “people”, not “guys”; “older adults”, not “old folks”. The neutral word is almost always the shorter route as well.' },
      { text: 'Impersonal constructions', risk: 'watch', pattern: '“It is often argued that…” instead of “Lots of people say…”. Useful, but a whole essay of them hides your position, which Task Response penalises.' },
      { text: 'Exclamation marks and rhetorical questions', risk: 'avoid', pattern: 'Neither belongs in an academic response. A rhetorical question in particular hands the argument back to the reader instead of making it.' },
    ],
    examples: [
      { sentence: 'A substantial proportion of children now take insufficient exercise, with measurable consequences for their health.', doing: 'a substantial proportion · children · insufficient', why: 'The same claim as the spoken version, at the register the task expects. Nothing was added — four informal choices were simply replaced with neutral ones.' },
      { sentence: 'It is frequently argued that such measures penalise the households least able to absorb the cost.', doing: 'It is frequently argued that', why: 'The impersonal construction reports a widely held view without inventing a source. Used once it is precise; used in every paragraph it hides the writer.' },
    ],
    mistakes: [
      { wrong: 'The govt should sort out this problem ASAP, don’t you think?', why: 'Four drops and a rhetorical question. The question is the worst of them: it hands the argument to the reader at the exact moment the essay should be making it.', right: 'The government should resolve this problem without further delay.' },
      { wrong: 'This essay will talk about the pros and cons of nuclear power.', why: '“Talk about” belongs to speech, “pros and cons” is conversational, and announcing what an essay will do wastes a sentence the introduction needs for the position.', right: 'Nuclear power offers clear advantages in output, but its disadvantages in waste and cost are equally significant.' },
    ],
    drills: [
      {
        stem: 'Which version keeps the register an academic response expects?',
        correct: 0,
        options: [
          { text: 'A substantial proportion of children take insufficient exercise.', why: 'Correct. Neutral quantifier, neutral noun, no contraction, and the judgement is left for the next sentence.' },
          { text: 'Lots of kids these days don’t get enough exercise at all.', why: 'Four drops in one clause: “lots of”, “kids”, “these days” and the contraction.' },
          { text: 'A lot of children do not get enough exercise nowadays.', why: 'The contraction is gone and “a lot of” is still spoken English. Half the sentence was fixed.' },
          { text: 'Loads of young people aren’t getting enough exercise lately.', why: '“Loads of” is more informal than “lots of”, and the contraction survived untouched.' },
        ],
      },
      {
        stem: 'Which single verb replaces the informal phrasal verb in “the government should sort out the problem”?',
        correct: 0,
        options: [
          { text: 'resolve', why: 'Correct. It is the neutral single verb for exactly this meaning, and it takes the same object.' },
          { text: 'sort', why: '“Sort” without the particle means to classify things into groups, which is a different action.' },
          { text: 'fix up', why: 'Another phrasal verb, and a more informal one than the original.' },
          { text: 'deal with', why: 'Less informal than “sort out” and still conversational, and it is vaguer than “resolve”.' },
        ],
      },
      {
        stem: 'Which opening belongs in an academic response?',
        correct: 0,
        options: [
          { text: 'It is frequently argued that such measures penalise poorer households.', why: 'Correct. Impersonal, attributes the view without inventing a source, and states the claim it is about to examine.' },
          { text: 'Don’t you think such measures penalise poorer households unfairly?', why: 'A rhetorical question and a contraction. The question hands the argument back to the reader.' },
          { text: 'Everyone knows such measures penalise poorer households really badly.', why: '“Everyone knows” invents a consensus and “really badly” is spoken intensification.' },
          { text: 'In this essay I will talk about how measures penalise poorer households.', why: '“Talk about” belongs to speech, and announcing the essay’s plan wastes the sentence that should carry the position.' },
        ],
      },
    ],
  },
];

export function functionBySlug(slug: string): VocabFunction | undefined {
  return VOCAB_FUNCTIONS.find((item) => item.slug === slug);
}

export const RISK_LABEL: Record<Risk, string> = {
  safe: 'Safe to use',
  watch: 'Watch the pattern',
  avoid: 'Costs you marks',
};
