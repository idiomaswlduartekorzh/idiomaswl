/**
 * Las cinco técnicas de paráfrasis, cada una con su propia página.
 *
 * DE DÓNDE SALE ESTO
 *
 * Del material de clase de David («Grammar and Speech tools · Paraphrasing»), que enseña la
 * paráfrasis como cinco movimientos concretos y no como «di lo mismo con otras palabras»:
 * sinónimos, orden de las palabras, forma de la palabra, voz, y estructura de la frase. Ese
 * reparto es la aportación pedagógica y se conserva entero, incluidas casi todas sus frases
 * de ejemplo.
 *
 * LO QUE SÍ SE CAMBIÓ, Y POR QUÉ
 *
 * El documento es material manuscrito de clase y su inglés tiene diecinueve fallos. No son
 * erratas menores: `guaranty` por `guarantee` (cinco veces), `Progenitors` por `parents`,
 * `Phycologists` por `Psychologists`, `ALEATORY catches` por `random searches`, `Animalistic`
 * —que significa bestial— por `animal rights activists`, `Richness` —que se dice de un sabor—
 * por `Wealth`, `in base that` por `on the basis that`, `affects dramatically the oceans` con
 * el orden del español.
 *
 * Ninguno podía publicarse. Pero casi todos son CALCOS del español, es decir, exactamente lo
 * que produce un hispanohablante cuando parafrasea. Así que no se tiraron: cada uno está
 * abajo, en la sección de errores de su técnica, con el diagnóstico y la reparación. El
 * documento aporta el método y además el corpus de errores, que es la parte difícil de
 * inventar.
 *
 * POR QUÉ CINCO PÁGINAS Y NO UNA
 *
 * Mismo criterio que las siete familias de conectores: quien busca «cambiar la voz pasiva en
 * inglés» llega a una página que va de eso y nada más, y quien viene de IELTS recorre las
 * cinco desde el hub. Cada página lleva el recorrido completo de una unidad de Task 2:
 *
 *   qué mueve → cuándo se usa → los movimientos con su nota de riesgo
 *   → ¿cuál conserva el significado? → ejemplos resueltos → los errores típicos → ejercicios
 *
 * EL RIESGO PROPIO DE ESTA HABILIDAD
 *
 * En los conectores el riesgo es la puntuación. Aquí es otro, y el propio documento lo dice
 * en su primera línea: «being careful not to alter the meaning». Por eso cada movimiento
 * lleva una etiqueta de riesgo en vez de una de registro, y por eso antes de los ejercicios
 * de producción hay uno de RECONOCIMIENTO: tres paráfrasis, solo una conserva el significado.
 * Detectar el cambio de sentido es la mitad de la habilidad y no se practica produciendo.
 */

/**
 * Qué tan seguro es un movimiento.
 *
 * `safe`  — funciona casi siempre; se puede aplicar sin pensarlo dos veces.
 * `care`  — funciona, pero arrastra algo que hay que revisar (una preposición, un número).
 * `trap`  — el sitio donde se pierde el significado. Es el que hay que leer despacio.
 */
export type Risk = 'safe' | 'care' | 'trap';

export type ParaphraseMove = {
  text: string;
  risk: Risk;
  /** Qué hace y qué hay que vigilar. Es la parte que casi nunca se enseña. */
  usage: string;
};

/**
 * La mecánica, enseñada con una frase y su reescritura.
 *
 * Mismo papel que `HowItWorks` en los conectores: la frase de partida, la de llegada, y en
 * inglés llano qué se movió entre las dos.
 */
export type HowItWorks = {
  original: string;
  rewritten: string;
  /** Qué cambió, dicho sin jerga gramatical. */
  plain: string;
};

/**
 * El ejercicio de RECONOCIMIENTO, antes del de producción.
 *
 * Se da un original y tres paráfrasis; solo una conserva el significado. Las otras dos fallan
 * por los dos motivos que de verdad ocurren: subir la fuerza de la afirmación, y perder por
 * el camino algo que el original sí decía. Practicar solo produciendo deja esto sin entrenar.
 */
export type MeaningCheck = {
  original: string;
  options: { text: string; keeps: boolean; why: string }[];
};

export type ParaphraseExample = {
  original: string;
  rewritten: string;
  /** Inventario de lo que se movió, para poder seguirlo palabra por palabra. */
  moved: string;
  why: string;
};

export type ParaphraseMistake = {
  wrong: string;
  why: string;
  right: string;
};

/**
 * Cada opción lleva SU motivo.
 *
 * Una sola explicación para las cuatro opciones fue el defecto que se encontró en los ocho
 * motores de Task 1 en agosto de 2026: quien falla no aprende por qué falló SU opción.
 */
export type ParaphraseDrill = {
  original: string;
  options: { text: string; why: string }[];
  /** Índice tal y como está escrito; la posición en pantalla la reparte `placeOption`. */
  correct: number;
};

export type ParaphraseTechnique = {
  slug: string;
  label: string;
  /** Título y descripción para buscadores, en español, que es como busca esta audiencia. */
  seoTitle: string;
  seoDescription: string;
  spanishName: string;
  /** Qué cambia y qué se queda igual, en una línea. */
  signals: string;
  whenToUse: string;
  tone: 'prompt' | 'claim' | 'development' | 'contrast' | 'link' | 'evidence' | 'review';
  howItWorks: HowItWorks;
  meaningCheck: MeaningCheck;
  moves: ParaphraseMove[];
  examples: ParaphraseExample[];
  mistakes: ParaphraseMistake[];
  drills: ParaphraseDrill[];
};

export const PARAPHRASE_TECHNIQUES: ParaphraseTechnique[] = [
  // ── 1 · Sinónimos ──────────────────────────────────────────────────────────
  {
    slug: 'synonyms',
    label: 'Synonyms',
    spanishName: 'Parafrasear con sinónimos',
    seoTitle: 'Parafrasear con sinónimos en inglés: cómo hacerlo sin cambiar el significado',
    seoDescription: 'Qué palabras se pueden sustituir al parafrasear en inglés y cuáles no. Verbos frasales, adjetivos de fuerza distinta y términos técnicos, con ejemplos y ejercicios corregidos.',
    signals: 'the words change and the claim does not',
    whenToUse: 'Reach for synonyms first, on the words that carry meaning: the nouns, the verbs, the adjectives. Leave the technical terms, the figures and the proper nouns exactly as the prompt wrote them — replacing those is not paraphrasing, it is writing about something else.',
    tone: 'prompt',
    howItWorks: {
      original: 'Parents play a fundamental role in bringing up children.',
      rewritten: 'Mothers and fathers play a crucial part in raising children.',
      plain: 'Four words moved and the sentence still makes exactly the same claim about exactly the same people. That is the whole test: if the two sentences could be true and false at different times, it is not a paraphrase.',
    },
    meaningCheck: {
      original: 'Wealth does not guarantee happiness; it is a means of meeting a need.',
      options: [
        { text: 'Affluence does not guarantee contentment; it is a way of satisfying a need.', keeps: true, why: 'Every swap holds: wealth → affluence, happiness → contentment, means → way. The claim is untouched.' },
        { text: 'Wealth never brings happiness; it only meets a basic need.', keeps: false, why: '“Does not guarantee” and “never brings” are different claims. The original leaves room for wealthy people to be happy; this version rules it out.' },
        { text: 'Richness does not guaranty happiness; it is rather a mean that can supply a need.', keeps: false, why: 'Three word errors in one line. “Richness” is used of flavour and texture, not money. “Guaranty” is a term from contract law; the verb is “guarantee”. And the noun is “a means”, which keeps its s in the singular.' },
      ],
    },
    moves: [
      { text: 'General noun → precise noun', risk: 'safe', usage: 'Swap a broad noun for a narrower one: “children” → “young people”, “cars” → “private vehicles”, “companies” → “employers”. The register rises and the meaning holds.' },
      { text: 'Phrasal verb → single verb', risk: 'safe', usage: '“bring up” → “raise”, “find out” → “discover”, “put off” → “postpone”, “cut down on” → “reduce”. The fastest way to lift a sentence, and the one examiners notice.' },
      { text: 'Empty verb + noun → one verb', risk: 'safe', usage: '“make a decision” → “decide”, “have an effect on” → “affect”, “give consideration to” → “consider”. Shorter and stronger at the same time.' },
      { text: 'Adjective → adjective of the SAME strength', risk: 'care', usage: '“important” → “significant” works. “important” → “vital” does not: you have made the claim stronger than the prompt made it, and the rest of your essay now has to defend it.' },
      { text: 'Leave technical terms alone', risk: 'trap', usage: 'Some words have no synonym in their field: “photosynthesis”, “inflation”, “the internet”, “carbon dioxide”. Repeating them is correct. Replacing them invents a different topic.' },
      { text: 'Leave figures and proper nouns alone', risk: 'trap', usage: '“54%” stays “54%”. “Japan” stays “Japan”. A percentage is not a word to be varied — rewriting it is how a response starts reporting data the prompt never gave.' },
    ],
    examples: [
      {
        original: 'Parents play a fundamental role in bringing up children, so that they become an indispensable part of society.',
        rewritten: 'Mothers and fathers play a crucial part in raising children, so that they grow into essential members of the community.',
        moved: 'parents → mothers and fathers · fundamental → crucial · bringing up → raising · indispensable → essential · society → community',
        why: 'Five swaps and not one change of claim. The one worth copying is “bring up” → “raise”: replacing a phrasal verb with a single verb is the cheapest way to lift the register of a whole sentence.',
      },
      {
        original: 'Fish consumption dramatically affects the oceans and the balance of that environment.',
        rewritten: 'Fish intake has a drastic impact on the seas and on the equilibrium of that environment.',
        moved: 'consumption → intake · dramatically affects → has a drastic impact on · oceans → seas · balance → equilibrium',
        why: 'The adverb became an adjective inside a noun phrase. When a verb resists a synonym, turn the verb into a noun and give the noun the adjective — “dramatically affects” → “has a drastic impact on”.',
      },
      {
        original: 'Bullying jeopardises children’s wellbeing and fosters negative values in our communities.',
        rewritten: 'Harassment at school threatens young people’s welfare and reinforces harmful values in our society.',
        moved: 'bullying → harassment at school · jeopardises → threatens · children’s → young people’s · wellbeing → welfare · fosters → reinforces · negative → harmful · communities → society',
        why: 'Seven swaps. Note “fosters” → “reinforces” and not “enhances”: “enhance” means to improve something, so “enhances harmful values” would say the values got better.',
      },
    ],
    mistakes: [
      {
        wrong: 'Progenitors perform a crucial role in raising children.',
        why: '“Progenitor” is a biological and genealogical term — the ancestor a line descends from. Used for the parents in a family it reads as a translation of “progenitores”, which is what it is.',
        right: 'Mothers and fathers perform a crucial role in raising children.',
      },
      {
        wrong: 'Wealth does not guaranty happiness.',
        why: '“Guaranty” is a noun from contract law: the written promise standing behind a debt. The verb, and the everyday noun, is “guarantee”. Spell-checkers accept both, which is why this one survives into final drafts.',
        right: 'Wealth does not guarantee happiness.',
      },
      {
        wrong: 'Fish consumption affects dramatically the oceans.',
        why: 'English does not allow an adverb between a verb and its object. It goes before the verb or after the object — the one position it takes in Spanish is the one position it cannot take here.',
        right: 'Fish consumption dramatically affects the oceans.',
      },
      {
        wrong: 'Aleatory catches help the police find illegal weapons.',
        why: '“Aleatory” does exist in English, and it belongs to contract law: an aleatory contract is one whose outcome depends on chance. For a search carried out at random, the word is “random”, and the fixed phrase police use is “random stop-and-search”. Finding a real English word that looks like the Spanish one is the trap, not the solution.',
        right: 'Random searches help the police find illegal weapons.',
      },
    ],
    drills: [
      {
        original: 'Governments should invest more money in public libraries.',
        correct: 0,
        options: [
          { text: 'The state ought to allocate greater funding to public libraries.', why: 'Correct. Governments → the state, invest money → allocate funding, more → greater. Same obligation, same object, higher register.' },
          { text: 'Governments must invest more money in public libraries.', why: 'One word changed, and it changed the strength. “Should” recommends; “must” obliges. A paraphrase may not raise the temperature of the claim.' },
          { text: 'Governments should invest more money in public reading rooms.', why: 'Only the last two words moved, and they moved to something narrower: a reading room is one part of a library, not a synonym for it.' },
          { text: 'It would be beneficial for public libraries to receive more governmental money.', why: 'The register drops rather than rises — “governmental money” is not an English phrase — and “it would be beneficial” waters a recommendation down to an observation.' },
        ],
      },
      {
        original: 'Working from home has become common in many industries.',
        correct: 0,
        options: [
          { text: 'Remote employment is now widespread across numerous sectors.', why: 'Correct. Three precise swaps, nothing added and nothing dropped.' },
          { text: 'Remote employment is now widespread across all sectors.', why: '“Many” became “all”. That is the most expensive word in paraphrasing: it turns a measured statement into one the writer cannot support.' },
          { text: 'Working from home has become popular in many industries.', why: '“Common” reports how often something happens; “popular” reports whether people like it. The original said nothing about whether anyone enjoys it.' },
          { text: 'Home-based labour has turned usual in a lot of industries.', why: 'Two calques. “Turn usual” is not English — the verb is “become” — and “a lot of” lowers the register instead of raising it.' },
        ],
      },
      {
        original: 'Many young people find it difficult to enter the housing market.',
        correct: 0,
        options: [
          { text: 'A large number of young adults struggle to buy their first home.', why: 'Correct. “Find it difficult” → “struggle” replaces four words with one, and “enter the housing market” → “buy their first home” says the same thing more plainly.' },
          { text: 'Many young people find it impossible to enter the housing market.', why: '“Difficult” and “impossible” are not synonyms. This rewrites the claim into one the prompt never made.' },
          { text: 'A large number of young adults struggle to enter the market of the housing.', why: 'The noun phrase was translated word by word. English compounds run the other way: “the housing market”, never “the market of the housing”.' },
          { text: 'Many youngsters find it difficult to enter the housing market.', why: 'One swap in eight words, and it lowers the register: “youngsters” is informal and faintly patronising in academic writing.' },
        ],
      },
      {
        original: 'Air pollution in large cities is a serious threat to public health.',
        correct: 0,
        options: [
          { text: 'Atmospheric contamination in major urban areas poses a grave danger to the health of the population.', why: 'Correct. Five swaps and the claim untouched. “Is a threat to” → “poses a danger to” is worth learning: the noun stays and the empty verb goes.' },
          { text: 'Air pollution in large cities is a serious threat to the public healthcare of the population.', why: '“Public health” is the condition of a population; “public healthcare” is the system that treats it. One article turns a health claim into a funding claim.' },
          { text: 'Atmospheric contamination in major urban areas is a serious threat to public health everywhere in the world.', why: 'Half the sentence is still the prompt’s, word for word — and it is the half that carries the claim.' },
          { text: 'Air pollution in large cities is a critical threat to public health across the entire country.', why: 'A single adjective moved, and it moved up. “Critical” is stronger than “serious”, and nothing else was paraphrased at all.' },
        ],
      },
    ],
  },

  // ── 2 · Orden de las palabras ──────────────────────────────────────────────
  {
    slug: 'word-order',
    label: 'Word order',
    spanishName: 'Cambiar el orden de las palabras',
    seoTitle: 'Cambiar el orden de la frase en inglés: parafrasear moviendo la información',
    seoDescription: 'Cómo mover el tiempo, el lugar y la comparación al principio de la frase en inglés sin romper la gramática. Con la coma que casi todos olvidan y ejercicios corregidos.',
    signals: 'the same information arrives in a different order',
    whenToUse: 'Use this when the prompt gives you a sentence whose key words have no good synonyms — a technical topic, a figure, a place. You cannot swap the words, so you move them instead. It is also the technique that rescues a paraphrase that has started to look like the original with two adjectives changed.',
    tone: 'development',
    howItWorks: {
      original: 'The number of stressed children in Eastern countries rose to 54% over the last ten years.',
      rewritten: 'Over the last decade, the proportion of stressed children in Eastern nations climbed to 54%.',
      plain: 'Nothing was removed and the figure did not move. The time phrase went from the end of the sentence to the front, and everything else reorganised around it. Moving one element forces the rest to shift, which is why order alone can carry a paraphrase.',
    },
    meaningCheck: {
      original: 'Successful athletes earn considerably more than professionals in any other field.',
      options: [
        { text: 'Professionals in any other field earn considerably less than successful athletes.', keeps: true, why: 'The comparison was flipped and the fact survived: same two groups, same gap, same direction. “More than” became “less than” and the two sides swapped places together.' },
        { text: 'Professionals in any other field earn considerably more than successful athletes.', keeps: false, why: 'The two sides swapped and the comparison did not. This says the opposite of the original.' },
        { text: 'Successful athletes earn considerably more than any other professional field.', keeps: false, why: 'People are now being compared with a field. Reordering must never leave the two sides of a comparison mismatched.' },
      ],
    },
    moves: [
      { text: 'Time phrase → front', risk: 'safe', usage: 'Move “in 2019”, “over the last decade”, “since the pandemic” to the start and put a comma after it. The safest reordering in English, and it fits almost any sentence.' },
      { text: 'Place phrase → front', risk: 'safe', usage: '“In rural areas, access to specialists remains limited.” Same rule, same comma. Useful when the paragraph is about the place rather than the problem.' },
      { text: 'Reported claim → “According to X”', risk: 'safe', usage: '“Psychologists argue that…” → “According to psychologists, …”. This frees the main clause to carry the finding instead of the attribution.' },
      { text: 'Flip the comparison', risk: 'care', usage: '“A earns more than B” → “B earns less than A”. The fact holds, but both sides have to swap at the same time as the adjective, or the sentence reverses.' },
      { text: 'Result → front, cause → back', risk: 'care', usage: '“Because X, Y” → “Y, because X”. Only when the new first half can stand alone as a sentence on its own.' },
      { text: 'Never move a modifier away from its noun', risk: 'trap', usage: '“Only students pay” and “Students only pay” are different sentences. English carries with position what Spanish can carry elsewhere, so a word that moves takes its meaning with it.' },
    ],
    examples: [
      {
        original: 'Random searches help the police look for illegal weapons and other substances that people may be carrying.',
        rewritten: 'People carrying illegal weapons or other substances can be found by the police through random searches.',
        moved: 'The thing being looked for moved to the front and became the subject; “help the police look for” became “can be found by the police”.',
        why: 'Fronting the object forced the passive, which is why order and voice so often travel together. Note that “random” stays: “aleatory” is a translation of “aleatorio” and in English is a narrow legal term for a contract that depends on chance.',
      },
      {
        original: 'Psychologists argue that passion in couples lasts between six months and two years, and that it can lead to break-ups if the relationship has not built stronger foundations.',
        rewritten: 'According to psychologists, a relationship that has not built stronger foundations before passion fades — roughly six months to two years — may end in a break-up.',
        moved: 'The source became a front phrase; the condition moved ahead of the result; the time span became an aside.',
        why: '“According to X” frees the main clause to carry the claim. Three elements moved and no fact was added: the six-months-to-two-years span is still the one the original gave.',
      },
      {
        original: 'Deserts offer a real opportunity to install solar panels and produce sustainable energy for future generations.',
        rewritten: 'Installing solar panels across desert land offers a genuine opportunity to produce sustainable energy for future generations.',
        moved: 'The action moved into the subject position; the place became where the action happens.',
        why: 'Turning the action into the subject is the most useful reordering in Task 2, because it lets the main verb carry the claim instead of the setting.',
      },
    ],
    mistakes: [
      {
        wrong: 'In the last decade climbed the proportion of stressed children to 54%.',
        why: 'The time phrase moved to the front and dragged the verb with it. Spanish allows verb before subject; English does not, outside a handful of fixed inversions. The subject still comes first.',
        right: 'In the last decade, the proportion of stressed children climbed to 54%.',
      },
      {
        wrong: 'Any other professional makes significantly less money when it is compared with successful athletes.',
        why: 'The comparison flipped correctly, but “it” has nothing to refer to: the professionals are plural and the pronoun is singular. Most comparisons do not need the extra clause at all.',
        right: 'Professionals in any other field make significantly less money than successful athletes.',
      },
      {
        wrong: 'Diverse triggers can cause different alternative futures.',
        why: 'This is a reordering of a different sentence. The original said that examining alternative futures is useful; this says triggers cause them. Reordering must not quietly become rewriting.',
        right: 'Examining alternative futures is valuable because it shows where particular triggers lead.',
      },
    ],
    drills: [
      {
        original: 'Air quality in the capital improved significantly after the congestion charge was introduced in 2003.',
        correct: 0,
        options: [
          { text: 'After the introduction of the congestion charge in 2003, air quality in the capital improved significantly.', why: 'Correct. The time clause moved to the front with its comma, the verb became a noun, and every fact stayed exactly where it was.' },
          { text: 'After the congestion charge was introduced in 2003 improved air quality in the capital significantly.', why: 'The comma is missing and the verb has jumped ahead of its subject. Fronting a clause in English does not invert what follows it.' },
          { text: 'After 2003, air quality in the capital improved significantly at every monitoring station.', why: 'The congestion charge disappeared. Reordering may not drop the cause — that is a summary, not a paraphrase.' },
          { text: 'Air quality in the capital improved significantly, and the congestion charge was introduced back in 2003.', why: '“And” makes the two facts independent. The original said one came after the other; this says they merely both happened.' },
        ],
      },
      {
        original: 'Private schools achieve better exam results than state schools in most regions.',
        correct: 0,
        options: [
          { text: 'In most regions, state schools achieve poorer exam results than private schools.', why: 'Correct. The place phrase went to the front and the comparison flipped, with both sides swapping so the gap runs the same way.' },
          { text: 'In most regions, private schools achieve poorer exam results than state schools.', why: 'The adjective was inverted without swapping the two sides, so the sentence now claims the opposite.' },
          { text: 'State schools achieve better exam results than private schools in most regions.', why: 'The two sides swapped and the adjective did not. Same error, opposite direction.' },
          { text: 'In most regions, state schools achieve fewer exam results than private schools.', why: 'The flip is right and the quantifier is not: results here are a level, not a count, so the word is “poorer” or “lower”, never “fewer”.' },
        ],
      },
      {
        original: 'Researchers claim that early exposure to a second language improves long-term memory.',
        correct: 0,
        options: [
          { text: 'According to researchers, long-term memory is improved by early exposure to a second language.', why: 'Correct. The source became a front phrase, freeing the main clause for the finding. The finding is still attributed — it has not become the writer’s own claim.' },
          { text: 'According to researchers, early exposure to a second language is improved by long-term memory.', why: 'The two sides of the finding swapped when the passive was formed. Memory is now the cause, which reverses the research.' },
          { text: 'Early exposure to a second language improves long-term memory in a measurable way.', why: 'The attribution vanished. A claim researchers make and a claim you make are read differently, and this version makes it yours.' },
          { text: 'Researchers, according to, claim that early exposure to a second language improves long-term memory.', why: '“According to” is a preposition and needs its object immediately after it. Split from “researchers”, it cannot function at all.' },
        ],
      },
      {
        original: 'Many commuters would use bicycles if cities built protected lanes.',
        correct: 0,
        options: [
          { text: 'If cities built protected lanes, many commuters would use bicycles.', why: 'Correct. Conditional clauses move freely between front and back; the only change is the comma, which is required when the “if” half comes first.' },
          { text: 'If many commuters used bicycles, cities would build protected lanes.', why: 'The condition and the result changed places. The original makes the lanes the cause; this makes them the consequence.' },
          { text: 'If cities built protected lanes many commuters would use bicycles.', why: 'The order is right and the comma is missing. A fronted “if” clause always takes one.' },
          { text: 'Many commuters would use bicycles, if cities built protected lanes.', why: 'Nothing moved, and a comma appeared where English does not use one — before a trailing “if” clause.' },
        ],
      },
    ],
  },

  // ── 3 · Forma de la palabra ────────────────────────────────────────────────
  {
    slug: 'word-form',
    label: 'Word form',
    spanishName: 'Cambiar la forma de la palabra',
    seoTitle: 'Cambiar la forma de la palabra en inglés: de verbo a sustantivo y de adjetivo a adverbio',
    seoDescription: 'Cómo pasar decide → decision, violent → violently o invest → investment al parafrasear en inglés, y por qué la preposición cambia con la palabra. Ejemplos y ejercicios.',
    signals: 'the same word stays, in a different grammatical shape',
    whenToUse: 'This is the technique that rescues you when a word has no usable synonym. You keep the word and change what it is — verb to noun, adjective to adverb — and the sentence has to rebuild itself around the new shape. It is also the fastest way to compress two clauses into one.',
    tone: 'claim',
    howItWorks: {
      original: 'Nowadays, crimes are becoming more violent.',
      rewritten: 'Currently, crimes are being committed more violently.',
      plain: 'The adjective “violent” became the adverb “violently”, and the sentence then needed a verb for it to modify: “are becoming” turned into “are being committed”. No synonym was found for the key word — it is the same word in a different grammatical coat.',
    },
    meaningCheck: {
      original: 'The level of crime has increased noticeably across different regions.',
      options: [
        { text: 'There has been a noticeable increase in crime across different regions.', keeps: true, why: 'The verb “increased” became the noun “increase” and brought its adverb along as an adjective: “noticeably” → “noticeable”. Same fact, same regions.' },
        { text: 'The increase in crime levels is noticeable differentially.', keeps: false, why: '“Differentially” means “in a way that differs between cases”, which is not what “across different regions” said. When an adverb has no natural form, the move is to leave the phrase as a phrase.' },
        { text: 'Crime has noticeably increased in some regions.', keeps: false, why: 'The form change was fine; a quantifier was narrowed alongside it. “Different regions” is not “some regions”.' },
      ],
    },
    moves: [
      { text: 'Verb → noun', risk: 'safe', usage: '“decide” → “the decision”, “grow” → “growth”, “introduce” → “the introduction”. The commonest move in academic English, and it usually pulls the register up with it.' },
      { text: 'Adjective → noun', risk: 'safe', usage: '“violent” → “violence”, “poor” → “poverty”, “able” → “ability”. The sentence then needs a new verb: “is becoming more violent” → “shows increasing violence”.' },
      { text: 'Adjective → adverb', risk: 'safe', usage: '“a significant increase” → “increased significantly”. This one usually shortens the sentence, which helps when the prompt is long.' },
      { text: 'Noun → verb', risk: 'care', usage: '“there was a reduction in costs” → “costs fell”. Strong and direct, but it changes what the subject of the sentence is, so check the rest of the clause still agrees with it.' },
      { text: 'The preposition travels too', risk: 'trap', usage: '“depend on” becomes “dependence on”, never “dependence of”. “Invest in” becomes “investment in”. Every form change can move a preposition, and that is where these rewrites break.' },
      { text: 'Watch the plural', risk: 'trap', usage: '“an analysis” / “several analyses”, “a criterion” / “three criteria”, “a phenomenon” / “two phenomena”. Changing a Greek or Latin noun changes its plural in a way no spell-checker will flag.' },
    ],
    examples: [
      {
        original: 'Nowadays, crimes are becoming more violent.',
        rewritten: 'Currently, crimes are being committed more violently.',
        moved: 'violent (adjective) → violently (adverb) · are becoming → are being committed',
        why: 'Once the adjective became an adverb it needed a verb of its own, and “become” could not supply one. Changing a word’s form almost always forces a second change nearby: that is the technique working, not a mistake.',
      },
      {
        original: 'Cement solidification depends on several factors related to its production, mixture and transport.',
        rewritten: 'How well cement solidifies is dependent on several production, mixture and transport factors.',
        moved: 'solidification (noun) → solidifies (verb) · depends (verb) → is dependent (adjective) · the three nouns became modifiers',
        why: 'Notice that the preposition survived the change: “depends on” became “is dependent on”, never “dependent of”. That preposition is the commonest casualty of this technique.',
      },
      {
        original: 'Technology has advanced rapidly, which has made many manual jobs unnecessary.',
        rewritten: 'Rapid technological advances have rendered many manual jobs unnecessary.',
        moved: 'advanced (verb) → advances (noun) · rapidly (adverb) → rapid (adjective) · technology (noun) → technological (adjective)',
        why: 'Three form changes in five words, and the two clauses collapsed into one. The compression is the side effect worth having: the same content in fewer words reads as control.',
      },
    ],
    mistakes: [
      {
        wrong: 'Cement production correlates to dependable factors for its solidification.',
        why: 'Two form errors in one line. “Dependable” means trustworthy; the adjective from “depend on” is “dependent”. And “correlate” takes “with”, not “to”.',
        right: 'Cement production correlates with the factors its solidification depends on.',
      },
      {
        wrong: 'The increase in crime levels is noticeable differentially.',
        why: 'The adjective “different” was forced into an adverb that means something else. Not every word has a usable form in every slot; when it does not, keep the phrase and move something else.',
        right: 'The increase in crime levels is noticeable across different regions.',
      },
      {
        wrong: 'The government made an announce about the new policy.',
        why: '“Announce” is a verb only; the noun is “announcement”. Removing a suffix is not the reverse of adding one — English noun and verb forms have to be looked up, not derived.',
        right: 'The government made an announcement about the new policy.',
      },
    ],
    drills: [
      {
        original: 'Air travel has grown rapidly, and airports have struggled to cope.',
        correct: 0,
        options: [
          { text: 'The rapid growth of air travel has left airports struggling to cope.', why: 'Correct. “Grown” became the noun “growth”, “rapidly” became the adjective “rapid”, and the two clauses joined into one.' },
          { text: 'The rapid growing of air travel has left airports struggling to cope.', why: 'English already has a noun for this — “growth”. An -ing form with “the” in front of it is exactly what this technique is meant to replace.' },
          { text: 'Air travel has grown rapid, and airports have struggled to cope.', why: 'The adjective replaced the adverb in a slot that needs an adverb. “Grow” is modified by “rapidly”; only a linking verb like “seem” takes an adjective there.' },
          { text: 'The rapid growth of air travel has left airports struggle to cope.', why: 'The form change worked and the verb after “left” did not follow it. “Leave someone doing something” takes the -ing form.' },
        ],
      },
      {
        original: 'Students who are able to think critically perform better at university.',
        correct: 0,
        options: [
          { text: 'The ability to think critically improves performance at university.', why: 'Correct. “Able” became “ability”, “perform” became “performance”, and the relative clause disappeared with them: three words shorter and one register higher.' },
          { text: 'The ability of thinking critically improves performance at university.', why: 'The form change is right and the preposition is wrong. “Ability” takes “to” plus a verb, never “of” plus an -ing form.' },
          { text: 'The capability to think critically improves the performing at university.', why: '“The performing” is not the noun; “performance” is. Half the sentence made the change and half did not.' },
          { text: 'Students able to think critically improve performance at university.', why: 'Only the relative clause was trimmed. The two words worth changing kept their original forms.' },
        ],
      },
      {
        original: 'The policy was applied inconsistently, which reduced public trust.',
        correct: 0,
        options: [
          { text: 'Inconsistent application of the policy reduced public trust.', why: 'Correct. “Applied” became “application”, “inconsistently” became “inconsistent”, and the passive clause became the subject of the sentence.' },
          { text: 'Inconsistent applying of the policy reduced public trust.', why: 'The -ing form again, where a dedicated noun exists. The word is “application”.' },
          { text: 'The inconsistent application of the policy was reduced public trust.', why: 'A stray “was”. Once the clause became a noun phrase it became the subject, and the sentence already had its verb.' },
          { text: 'The policy was applied inconsistent, which reduced public trust.', why: 'The adverb was replaced by an adjective, and “applied” needs an adverb. The one word that changed changed the wrong way.' },
        ],
      },
      {
        original: 'Cities that invest in cycling infrastructure see fewer road deaths.',
        correct: 0,
        options: [
          { text: 'Investment in cycling infrastructure is associated with fewer road deaths in cities.', why: 'Correct. “Invest” became “investment” and the relative clause went with it. Note “investment in”: the preposition travelled with the noun.' },
          { text: 'Investment of cycling infrastructure is associated with fewer road deaths in cities.', why: 'The noun is right and the preposition is not. You invest *in* something, and the noun keeps that “in”.' },
          { text: 'Investing on cycling infrastructure is associated with fewer road deaths in cities.', why: 'Two problems at once: the -ing form where “investment” exists, and “on” where the verb takes “in”.' },
          { text: 'Cities that invest in cycling infrastructure are associated with fewer road deaths.', why: 'The relative clause survived untouched. This is a rewording of the ending, not a change of word form.' },
        ],
      },
    ],
  },

  // ── 4 · Voz ────────────────────────────────────────────────────────────────
  {
    slug: 'voice',
    label: 'Voice',
    spanishName: 'Cambiar la voz: activa y pasiva',
    seoTitle: 'Voz pasiva en inglés para parafrasear: cuándo cambiarla y cuándo no',
    seoDescription: 'Cómo pasar de activa a pasiva y al revés sin perder quién hace la acción. Verbos que no admiten pasiva, la preposición que sobrevive y ejercicios corregidos.',
    signals: 'the doer and the thing done change places',
    whenToUse: 'Change the voice when you want the sentence to start with a different thing. If your paragraph is about workers, start with workers; if it is about the technology, start with the technology. The passive is not more formal than the active — it is a way of choosing what the sentence is about.',
    tone: 'contrast',
    howItWorks: {
      original: 'Technological advances have replaced workers in many workplaces.',
      rewritten: 'Workers in many workplaces have been replaced by technological advances.',
      plain: 'The object became the subject, and the old subject moved behind “by”. Nothing was added and nothing was removed — the sentence now simply begins with the people it is about. That change of starting point is the point, not the grammar.',
    },
    meaningCheck: {
      original: 'Local councils have closed dozens of youth centres since 2010.',
      options: [
        { text: 'Dozens of youth centres have been closed by local councils since 2010.', keeps: true, why: 'Same doer, same thing done, same date. Only the starting point moved.' },
        { text: 'Dozens of youth centres have closed since 2010.', keeps: false, why: 'The councils vanished. The sentence now reads as if the centres shut on their own, which removes the responsibility the original assigned.' },
        { text: 'Local councils have been closed by dozens of youth centres since 2010.', keeps: false, why: 'The two sides swapped position without swapping roles. Now the centres are shutting the councils.' },
      ],
    },
    moves: [
      { text: 'Active → passive', risk: 'safe', usage: 'Move the object to the front, add the right form of “be” plus the past participle, and put the old subject after “by”: “The council approved the plan” → “The plan was approved by the council”.' },
      { text: 'Passive → active', risk: 'safe', usage: 'The reverse move, and often the better one. Task 2 responses drift into the passive and lose their argument in it; turning one back gives the paragraph a subject again.' },
      { text: 'Keep the topic in the subject slot', risk: 'safe', usage: 'If the paragraph is about workers, every sentence in it should start with workers where possible. That is what the passive is for.' },
      { text: 'Drop the “by” phrase', risk: 'care', usage: 'When the doer is obvious or irrelevant, leave it out: “The plan was approved.” Only do it when the reader genuinely does not need to know who acted — in a responsibility argument, they do.' },
      { text: 'Intransitive verbs have no passive', risk: 'trap', usage: '“Crime rose”, “the population grew”, “the meeting happened”. There is no object to promote, so there is nothing to turn around.' },
      { text: 'Do not stack passives', risk: 'trap', usage: 'Two or three in a row and nobody is doing anything in your essay. The examiner reads that as a writer hiding, not as formality.' },
    ],
    examples: [
      {
        original: 'Technological advances have replaced workers in many workplaces.',
        rewritten: 'Workers in many workplaces have been replaced by technological advances.',
        moved: 'The object became the subject · have replaced → have been replaced · the old subject moved behind “by”',
        why: 'Worth doing when the paragraph is about workers. Note that the present perfect survives the change intact: “have been replaced”.',
      },
      {
        original: 'Random searches allow the police to find illegal weapons.',
        rewritten: 'Illegal weapons can be found by the police during random searches.',
        moved: 'The thing being looked for became the subject · allow … to find → can be found',
        why: '“Allow someone to do something” has no direct passive, so it was rewritten with a modal. When a verb resists the passive, look for the modal that carries the same meaning.',
      },
      {
        original: 'Several factors determine how well cement solidifies.',
        rewritten: 'How well cement solidifies is determined by several factors.',
        moved: 'The whole clause “how well cement solidifies” became the subject.',
        why: 'A clause can be promoted, not just a noun. This is the version to use when the paragraph is about cement rather than about the factors.',
      },
    ],
    mistakes: [
      {
        wrong: 'Workers have been substituted at their jobs by technological improvements.',
        why: '“Substitute” does not behave like “replace”. In careful English you substitute A *for* B, so this can be read as saying the workers were put in place of the technology. “Replaced by” says what was meant, without ambiguity.',
        right: 'Workers have been replaced in their jobs by technological improvements.',
      },
      {
        wrong: 'That stage ought to be taken care by civil engineers.',
        why: 'The phrase is “take care *of*”, and the preposition has to survive the change: “be taken care of by”. Two prepositions in a row look wrong and are correct.',
        right: 'That stage ought to be taken care of by civil engineers.',
      },
      {
        wrong: 'The crime rate was risen sharply after the reform.',
        why: '“Rise” takes no object, so it has no passive at all. The only sentences that can be turned around are the ones with something on the receiving end.',
        right: 'The crime rate rose sharply after the reform.',
      },
    ],
    drills: [
      {
        original: 'The government introduced a sugar tax in 2018.',
        correct: 0,
        options: [
          { text: 'A sugar tax was introduced by the government in 2018.', why: 'Correct. The object moved to the front, the verb became “was introduced”, and the doer went behind “by”. The date stayed put.' },
          { text: 'A sugar tax has been introduced by the government in 2018.', why: 'The voice is right and the tense is not. A finished year takes the past simple; the present perfect cannot sit with “in 2018”.' },
          { text: 'A sugar tax introduced the government in 2018.', why: 'The two nouns swapped and the verb never changed form. Now the tax is doing the introducing.' },
          { text: 'A sugar tax was introduced in 2018.', why: 'Grammatical, and it drops the government. In an argument about who is responsible for a policy, that is the word the sentence needed.' },
        ],
      },
      {
        original: 'Researchers at the university have questioned these findings.',
        correct: 0,
        options: [
          { text: 'These findings have been questioned by researchers at the university.', why: 'Correct. The present perfect survives as “have been questioned”, and the researchers stay visible — which matters, because who doubts a finding is part of the claim.' },
          { text: 'These findings have questioned researchers at the university.', why: 'The nouns swapped without the verb changing. Findings do not question people.' },
          { text: 'These findings were questioned by researchers at the university.', why: 'The voice change is right, and the tense slipped from present perfect to past simple, cutting the link to the present that the original had.' },
          { text: 'These findings have been questioned.', why: 'Correct English, and the researchers are gone. Here they were worth keeping: an anonymous doubt carries less weight than an attributed one.' },
        ],
      },
      {
        original: 'Poor urban planning has caused most of these traffic problems.',
        correct: 0,
        options: [
          { text: 'Most of these traffic problems have been caused by poor urban planning.', why: 'Correct. Note that the agreement moved with the subject: “problems … have been”, not “has been”. Promoting a plural object changes the verb.' },
          { text: 'Most of these traffic problems has been caused by poor urban planning.', why: 'The voice is right and the agreement is not. The new subject is plural.' },
          { text: 'Poor urban planning has been caused by most of these traffic problems.', why: 'Cause and effect swapped. The passive reverses the position of the two sides, never their roles.' },
          { text: 'Most of these traffic problems were caused for poor urban planning.', why: 'The agent takes “by”, not “for”. “For” gives a purpose, which turns the sentence into something the original never said.' },
        ],
      },
      {
        original: 'Volunteers plant thousands of trees in the city every spring.',
        correct: 0,
        options: [
          { text: 'Thousands of trees are planted in the city by volunteers every spring.', why: 'Correct. A repeated present action stays in the present simple, and the frequency phrase does not move.' },
          { text: 'Thousands of trees are planting in the city by volunteers every spring.', why: 'The -ing form makes the trees the ones doing the planting. The passive needs the past participle.' },
          { text: 'Thousands of trees have been planted in the city by volunteers every spring.', why: 'The present perfect and “every spring” pull against each other: one reports a finished total, the other a repeated habit.' },
          { text: 'In the city, volunteers plant thousands of trees every spring.', why: 'The place phrase moved to the front and the voice did not change at all. That is the word-order technique, not this one.' },
        ],
      },
    ],
  },

  // ── 5 · Estructura de la frase ─────────────────────────────────────────────
  {
    slug: 'sentence-structure',
    label: 'Sentence structure',
    spanishName: 'Cambiar la estructura de la frase',
    seoTitle: 'Unir y separar frases en inglés: parafrasear cambiando la estructura',
    seoDescription: 'Cómo juntar dos frases en una o dividir una larga en dos al parafrasear en inglés. Oraciones de relativo, participios y el comma splice, con ejercicios corregidos.',
    signals: 'the same ideas arrive as a different number of sentences',
    whenToUse: 'Use this last, once the words have moved. Joining two sentences with a subordinator, or splitting a long one at its joint, changes the shape of the information without touching a single fact — and it is the technique that makes a paraphrase stop looking like the original. Which connector to choose is a separate skill; the linking language pages cover the seven relationships.',
    tone: 'link',
    howItWorks: {
      original: 'Logging companies believe their activity has nothing to do with global warming; they insist that other industries are responsible.',
      rewritten: 'Logging companies believe their activity has nothing to do with global warming. Instead, they insist that other industries are responsible.',
      plain: 'One sentence became two, and the semicolon became a connector that names the relationship. The semicolon only said “these two belong together”; “instead” says how. Changing the shape of the information is a paraphrase, even when no word has been replaced.',
    },
    meaningCheck: {
      original: 'The scheme was expensive. It was abandoned in 2019.',
      options: [
        { text: 'The scheme, which was expensive, was abandoned in 2019.', keeps: true, why: 'Two facts, one sentence, and no claim about whether one caused the other — exactly what the original said, and exactly what it did not say.' },
        { text: 'The scheme was abandoned in 2019 because it was expensive.', keeps: false, why: 'A cause appeared. The original put the two facts side by side; this one makes the cost the reason.' },
        { text: 'Although the scheme was expensive, it was abandoned in 2019.', keeps: false, why: '“Although” claims the two facts are in tension, as though expense were a reason to keep it. That relationship was not in the original either.' },
      ],
    },
    moves: [
      { text: 'Two sentences → one, with a subordinator', risk: 'safe', usage: '“X. Y.” → “Although X, Y.” or “Because X, Y.” The second sentence loses its full stop and gains a stated relationship.' },
      { text: 'One sentence → two', risk: 'safe', usage: 'A long prompt sentence can be split at its natural joint. Shorter sentences are not simpler writing — knowing where the joint is, is the skill.' },
      { text: 'Semicolon → connector', risk: 'safe', usage: 'A semicolon says two ideas are related; a connector says how. Naming the relationship is almost always the stronger choice.' },
      { text: 'Clause → relative clause', risk: 'care', usage: '“The scheme cost £2bn. It was abandoned.” → “The scheme, which cost £2bn, was abandoned.” Watch the commas: they decide whether the clause is essential to identifying the thing.' },
      { text: 'Clause → participle phrase', risk: 'care', usage: '“Because it lacked funding, the project stalled” → “Lacking funding, the project stalled.” The participle must belong to the subject that follows, or the sentence dangles.' },
      { text: 'Do not change the relationship', risk: 'trap', usage: 'Joining with “because” when the original only said “and” adds a cause nobody claimed. The structure may change; the logic may not.' },
    ],
    examples: [
      {
        original: 'Logging companies believe their activity has nothing to do with global warming; they insist that other industries are responsible.',
        rewritten: 'Logging companies believe their activity has nothing to do with global warming. Instead, they insist that other industries are responsible.',
        moved: 'The semicolon became a full stop, and the relationship it only implied was named with “instead”.',
        why: 'The semicolon told the reader the two halves belonged together but not why. Naming the relationship is a genuine paraphrase and it is also better writing.',
      },
      {
        original: 'Animal rights activists strongly support the idea that animals should have the same rights as humans, and they consider that humans have monopolised rights and undervalue other species.',
        rewritten: 'Because they see humans as having monopolised rights and undervalued other species, animal rights activists strongly support giving animals equal rights.',
        moved: 'The second half became a fronted “because” clause; the first half became the main clause.',
        why: 'The reason moved ahead of the claim it supports, and the sentence stopped being a list. Note “animal rights activists”: “animalistic” means brutish or beast-like, and it is the calque this sentence attracts.',
      },
      {
        original: 'Gaming has changed over the last five years. Violent titles are no longer the only profitable ones. Warfare games remain the most popular.',
        rewritten: 'Although gaming has changed over the last five years, and violent titles are no longer the only profitable ones, warfare games remain the most popular.',
        moved: 'Three sentences became one, with the first two subordinated to the third.',
        why: 'The three facts were already in tension; the original just never said so. Subordination puts the emphasis on the last one, which is what an argument does and a list does not.',
      },
    ],
    mistakes: [
      {
        wrong: 'Logging companies believe their activity has nothing to do with global warming, instead, they insist that other industries are responsible.',
        why: 'A comma cannot join two complete sentences, and “instead” is not a conjunction that can rescue it. This is the comma splice, and it is the most common punctuation error in Task 2.',
        right: 'Logging companies believe their activity has nothing to do with global warming. Instead, they insist that other industries are responsible.',
      },
      {
        wrong: 'Lacking funding, the project’s deadline was missed.',
        why: 'The participle dangles. The thing lacking funding is the project, and the sentence has made the deadline its subject. A participle attaches to whatever noun comes next.',
        right: 'Lacking funding, the project missed its deadline.',
      },
      {
        wrong: 'Although the scheme was expensive, but it was abandoned in 2019.',
        why: 'One relationship, two words announcing it. English uses “although” or “but”, never both in the same sentence — a habit carried over from “aunque … pero”.',
        right: 'Although the scheme was expensive, it was abandoned in 2019.',
      },
      {
        wrong: 'Animalistic strongly support the idea of animals having the same rights as humans.',
        why: 'Two problems in one word. “Animalistic” is an adjective meaning brutish or beast-like, so it cannot be the subject of a sentence — and it describes very nearly the opposite of the people it was meant to name. They are “animal rights activists”.',
        right: 'Animal rights activists strongly support the idea of animals having the same rights as humans.',
      },
    ],
    drills: [
      {
        original: 'Public transport is heavily subsidised in the city. Fares have still risen every year since 2015.',
        correct: 0,
        options: [
          { text: 'Although public transport is heavily subsidised in the city, fares have risen every year since 2015.', why: 'Correct. Two sentences became one, and the tension already carried by “still” is now named by “although”. No fact moved.' },
          { text: 'Public transport is heavily subsidised in the city, fares have still risen every year since 2015.', why: 'The full stop became a comma and nothing took its place. Two complete sentences cannot be joined by a comma alone.' },
          { text: 'Because public transport is heavily subsidised in the city, fares have risen every year since 2015.', why: 'The subsidy is now the reason fares rose. The original implied the opposite was surprising.' },
          { text: 'Public transport is heavily subsidised in the city and fares have risen every year since 2015.', why: '“And” flattens the tension the original carried in “still”. The structure changed and the meaning thinned.' },
        ],
      },
      {
        original: 'The bridge cost far more than planned, and it opened three years late.',
        correct: 0,
        options: [
          { text: 'The bridge, which cost far more than planned, opened three years late.', why: 'Correct. The first clause became a non-defining relative clause inside the second, keeping both facts and adding no cause. The commas are what make it non-defining.' },
          { text: 'The bridge which cost far more than planned opened three years late.', why: 'Without the commas the clause becomes defining, implying there are other bridges and this is the expensive one.' },
          { text: 'The bridge, that cost far more than planned, opened three years late.', why: '“That” does not introduce a non-defining clause in careful written English. With commas, the word is “which”.' },
          { text: 'The bridge cost far more than planned because it opened three years late.', why: 'A cause was invented, and backwards: the delay is now the reason for the cost.' },
        ],
      },
      {
        original: 'Many rural schools have closed. Families with young children are leaving those areas.',
        correct: 0,
        options: [
          { text: 'As many rural schools have closed, families with young children are leaving those areas.', why: 'Correct. The two facts were already sequential, and “as” names the link the reader was going to draw anyway.' },
          { text: 'Many rural schools have closed, families with young children are leaving those areas.', why: 'Comma splice again: the comma has been asked to do a conjunction’s job.' },
          { text: 'Many rural schools have closed; however, families with young children are leaving those areas.', why: '“However” claims the second fact goes against the first. Here it follows from it.' },
          { text: 'Having closed many rural schools, families with young children are leaving those areas.', why: 'The participle dangles: as written, the families closed the schools.' },
        ],
      },
      {
        original: 'Online shopping has grown quickly. High street retailers have lost customers. Several chains have closed entirely.',
        correct: 0,
        options: [
          { text: 'As online shopping has grown quickly, high street retailers have lost customers, and several chains have closed entirely.', why: 'Correct. Three sentences became one chain, in the order the causes actually run, with nothing added or dropped.' },
          { text: 'Online shopping has grown quickly, high street retailers have lost customers, several chains have closed entirely.', why: 'Three sentences joined by two commas and nothing else. Length is not structure.' },
          { text: 'Online shopping has grown quickly, so several chains have closed entirely, and high street retailers have lost customers.', why: 'The middle step moved to the end, so the chain runs out of order: the chains closed before losing customers.' },
          { text: 'Although online shopping has grown quickly, high street retailers have lost customers and several chains have closed entirely.', why: '“Although” makes the growth and the losses contradictory. They are cause and effect.' },
        ],
      },
    ],
  },
];

export function techniqueBySlug(slug: string): ParaphraseTechnique | undefined {
  return PARAPHRASE_TECHNIQUES.find((technique) => technique.slug === slug);
}

export const RISK_LABEL: Record<Risk, string> = {
  safe: 'Safe move',
  care: 'Check as you go',
  trap: 'Where meaning breaks',
};
