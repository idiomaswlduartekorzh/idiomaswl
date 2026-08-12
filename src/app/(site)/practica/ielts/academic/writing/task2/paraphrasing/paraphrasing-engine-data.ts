/**
 * Los doce ejercicios del motor de paráfrasis, mezclando las cinco técnicas.
 *
 * NINGUNA FRASE DE AQUÍ APARECE EN LAS LECCIONES
 *
 * En agosto de 2026 se auditaron las ocho unidades de Task 1 y las ocho tenían el mismo
 * defecto: la lección imprimía la respuesta modelo y el motor preguntaba por ella. Medido,
 * entre el 8 % y el 91 % de las respuestas del motor estaban contenidas en el texto de su
 * propia lección. Aquí las doce frases son nuevas y la compuerta `check:ielts-task2` lo mide
 * por solapamiento de palabras con carga.
 *
 * Tres de estas frases hubo que cambiarlas después de escribirlas, porque la compuerta las
 * pilló: la del atasco de tráfico compartía el 75 % con la lección de orden de palabras, la
 * del uso del coche el 80 %, y la de la política popular el 100 % —estaba literalmente en el
 * ejercicio de reconocimiento de estructura—. A ojo las tres parecían nuevas.
 *
 * POR QUÉ TRES NIVELES DISTINTOS Y NO TRES TANDAS DE LO MISMO
 *
 * Cada nivel entrena algo que los otros dos no:
 *
 *   1. NOMBRAR la técnica. Ver la reescritura y decir qué se movió. Sin esto, parafrasear es
 *      cambiar palabras al azar hasta que la frase parezca distinta.
 *   2. ELEGIR la mejor. Cuatro paráfrasis plausibles; la buena mueve todo y no cambia nada.
 *      Los tres fallos son los tres que ocurren de verdad: mover poco, subir la fuerza de la
 *      afirmación, y bajar el registro.
 *   3. DIAGNOSTICAR el fallo. Se da una paráfrasis rota y se pregunta qué se rompió. Es lo
 *      que hace falta para revisar el propio borrador, y no se entrena produciendo.
 *
 * LOS DISTRACTORES SON LARGOS A PROPÓSITO
 *
 * La primera versión de este banco tenía la respuesta correcta como la más larga en 11 de los
 * 12 ejercicios, y en cuatro sacaba entre 9 y 13 palabras al siguiente: se acertaba por
 * silueta, sin leer. La corrección fue desarrollar los distractores, nunca acortar la
 * correcta —recortar la buena le quita la precisión que se está enseñando—, y cada distractor
 * creció explicando el error que representa.
 */

export type EngineDrill = {
  level: 1 | 2 | 3;
  title: string;
  original: string;
  /** La reescritura que hay que juzgar. Los niveles 1 y 3 la tienen; el 2 la pide. */
  rewrite?: string;
  question: string;
  options: { text: string; why: string }[];
  /** Índice tal y como está escrito; la posición en pantalla la reparte `placeOption`. */
  correct: number;
};

export const ENGINE_DRILLS: EngineDrill[] = [
  // ── Nivel 1 · nombrar la técnica ───────────────────────────────────────────
  {
    level: 1,
    title: 'Level 1 · Name the technique',
    original: 'Tourists damage ancient sites every summer.',
    rewrite: 'Ancient sites are damaged by tourists every summer.',
    question: 'Which technique does the work here?',
    correct: 0,
    options: [
      { text: 'Change of voice: the object became the subject, and the doer moved behind “by”.', why: 'Correct. The tourists are still doing the damage — they have simply stopped being the first thing the sentence mentions.' },
      { text: 'Synonyms: every content word was swapped for a more academic one of the same strength.', why: 'Not one word was replaced. “Tourists”, “damage”, “ancient sites” and “every summer” all survive intact into the rewrite.' },
      { text: 'Change of word form: the verb became a noun, and the sentence rebuilt itself around it.', why: '“Damage” is a verb in both versions. Nothing changed grammatical category, so nothing had to be rebuilt.' },
      { text: 'Change of word order: a phrase moved to the front of the sentence and took a comma.', why: 'No phrase was fronted and no comma appeared. The two sides swapped because the voice changed, which is a different technique with a different rule.' },
    ],
  },
  {
    level: 1,
    title: 'Level 1 · Name the technique',
    original: 'The company grew quickly after it entered the Asian market in 2015.',
    rewrite: 'After entering the Asian market in 2015, the company grew quickly.',
    question: 'Which technique does the work here?',
    correct: 0,
    options: [
      { text: 'Change of word order: the time clause moved to the front and took its comma.', why: 'Correct. The clause that was at the end is now at the start, and everything else stayed exactly as it was.' },
      { text: 'Change of voice: the sentence became passive and the doer moved into a “by” phrase at the end.', why: 'Both versions are active and there is no “by” phrase anywhere. The company is doing the growing and the entering in each one.' },
      { text: 'Synonyms: every content word was replaced with a more formal one that carries the same meaning.', why: 'Every content word is the same. “Grew”, “quickly”, “Asian market” and “2015” all survive untouched.' },
      { text: 'Change of sentence structure: two separate sentences were joined into a single one with a subordinator.', why: 'There was one sentence before and one after. The clause moved inside it; it was never a separate sentence.' },
    ],
  },
  {
    level: 1,
    title: 'Level 1 · Name the technique',
    original: 'Cheap flights have increased the number of tourists visiting the region.',
    rewrite: 'Inexpensive air travel has boosted the number of visitors to the area.',
    question: 'Which technique does the work here?',
    correct: 0,
    options: [
      { text: 'Synonyms: five content words were replaced and the structure of the sentence held.', why: 'Correct. Cheap → inexpensive, flights → air travel, increased → boosted, tourists → visitors, region → area.' },
      { text: 'Change of voice: the doer moved to a different position and the object came first.', why: 'Both versions are active, and the flights are the cause in each. Nothing changed position at all.' },
      { text: 'Change of word order: the phrases were rearranged and the time phrase went to the front.', why: 'Every phrase is exactly where it started, and there is no time phrase in either version. Only the words inside the phrases changed.' },
      { text: 'Change of word form: a verb became a noun, and the clause collapsed into a phrase.', why: '“Increased” became “boosted”, which is still a verb. Swapping a word for another of the same category is a synonym, not a form change.' },
    ],
  },
  {
    level: 1,
    title: 'Level 1 · Name the technique',
    original: 'The scheme failed, and thousands of savers lost their money.',
    rewrite: 'The failure of the scheme cost thousands of savers their money.',
    question: 'Which technique does most of the work here?',
    correct: 0,
    options: [
      { text: 'Change of word form: “failed” became the noun “failure”, joining the two clauses.', why: 'Correct. Once “fail” became a noun it could be the subject, and the second clause no longer needed to be separate.' },
      { text: 'Change of voice: the sentence became passive and the doer moved behind a “by” phrase.', why: 'Neither version is passive. “The failure … cost” is an active verb with an active subject in front of it.' },
      { text: 'Synonyms: the content words were replaced with more academic ones of the same strength.', why: '“Scheme”, “thousands”, “savers” and “money” are all still there, unchanged. Only the shape of “fail” moved.' },
      { text: 'Change of word order: the two halves swapped places and the result came first.', why: 'They are in the same order in both versions: the scheme first, the savers second.' },
    ],
  },

  // ── Nivel 2 · elegir la mejor paráfrasis ───────────────────────────────────
  {
    level: 2,
    title: 'Level 2 · Choose the strongest paraphrase',
    original: 'Some people believe that university education should be free for everyone.',
    question: 'Which version paraphrases this best?',
    correct: 0,
    options: [
      { text: 'A number of individuals argue that higher education ought to be provided at no cost to all citizens.', why: 'Correct. Every content word moved and the claim is unchanged: still a view held by some, still about universities, still about zero cost.' },
      { text: 'A number of individuals argue that higher education ought to be cheap for all citizens of the country.', why: 'Four swaps out of five hold, and then “free” became “cheap”. Free costs nothing; cheap costs something.' },
      { text: 'Everyone argues that higher education ought to be provided at no cost to all citizens of the country.', why: '“Some people” became “everyone”. The prompt reported one view among several; this reports a consensus that does not exist.' },
      { text: 'Some people believe that a university education should be made free for everyone living in the country.', why: 'Two words at the end moved. The rest is the prompt, word for word — and it is the part that carries the claim.' },
    ],
  },
  {
    level: 2,
    title: 'Level 2 · Choose the strongest paraphrase',
    original: 'Fast food advertising targets children during television programmes.',
    question: 'Which version paraphrases this best?',
    correct: 0,
    options: [
      { text: 'Junk food promotion is aimed at young audiences in the course of televised broadcasts.', why: 'Correct. Every content word moved: fast food → junk food, advertising → promotion, targets → is aimed at, children → young audiences.' },
      { text: 'Junk food promotion is aimed at all young audiences in the course of televised broadcasts.', why: 'One word was added, and it was “all”. The original said advertising targets children, not that it reaches every one of them.' },
      { text: 'Junk food ads go after kids while they are sitting in front of the telly.', why: 'The register dropped instead of rising. “Ads”, “go after”, “kids” and “telly” are conversational where the original was neutral.' },
      { text: 'Fast food advertising targets children during the television programmes shown across the whole country.', why: 'Nothing was paraphrased. Seven words of the prompt survive in order, and a phrase was added at the end instead.' },
    ],
  },
  {
    level: 2,
    title: 'Level 2 · Choose the strongest paraphrase',
    original: 'Governments have failed to protect coastal areas from rising sea levels.',
    question: 'Which version paraphrases this best?',
    correct: 0,
    options: [
      { text: 'Coastal regions have not been protected by national authorities against rising sea levels.', why: 'Correct. The voice changed so the sentence starts with the coast, and “governments” became “national authorities”. The failure is still attributed.' },
      { text: 'Coastal regions have not been protected against the steady rise in sea levels anywhere.', why: 'The governments went out with the “by” phrase — and the sentence was about their failure.' },
      { text: 'Coastal regions have been seriously damaged by the steady rise in global sea levels.', why: 'A failure to protect became damage that occurred. Those are different claims, and only one of them is in the prompt.' },
      { text: 'National authorities have failed to protect coastal regions from the rising level of the sea.', why: 'Two nouns were swapped for synonyms and nothing else moved. The verb, the structure and the voice are all the prompt’s.' },
    ],
  },
  {
    level: 2,
    title: 'Level 2 · Choose the strongest paraphrase',
    original: 'Children who read regularly develop stronger vocabularies.',
    question: 'Which version paraphrases this best?',
    correct: 0,
    options: [
      { text: 'Regular reading in childhood leads to the development of a stronger vocabulary.', why: 'Correct. “Read” became the noun “reading”, “develop” became “the development”, and the relative clause disappeared with them.' },
      { text: 'Regular reading in childhood leads to the development of a considerably bigger vocabulary.', why: 'The form changes hold, and then “stronger” became “bigger”. A strong vocabulary is precise; a big one is merely large.' },
      { text: 'Children who read every single day develop stronger vocabularies than those who do not.', why: '“Regularly” became “every single day”, which is a specific frequency the original never gave.' },
      { text: 'Children who read regularly develop a stronger vocabulary than their classmates do at school.', why: 'The relative clause and both verbs are the prompt’s. A comparison was added at the end instead of anything being paraphrased.' },
    ],
  },

  // ── Nivel 3 · diagnosticar el fallo ────────────────────────────────────────
  {
    level: 3,
    title: 'Level 3 · Diagnose the broken paraphrase',
    original: 'Many governments subsidise renewable energy projects.',
    rewrite: 'Renewable energy projects are subsidised.',
    question: 'This paraphrase is faulty. What broke?',
    correct: 0,
    options: [
      { text: 'The doer disappeared: the voice changed and the “by” phrase went with it.', why: 'Correct. Dropping the agent is legitimate when nobody needs to know who acted. Here the whole claim was about who is paying.' },
      { text: 'A cause was invented that the original sentence never claimed anywhere in its wording.', why: 'No cause appears in either version. Nothing was added here — something was removed.' },
      { text: 'The register dropped from academic English into something that reads as noticeably more conversational.', why: 'Both versions are neutral academic English. The problem is not how the rewrite sounds.' },
      { text: 'The tense changed, so the sentence now reports a finished action instead of a habit.', why: 'Both are present simple, reporting the same habitual action. The tense is the one thing that survived intact.' },
    ],
  },
  {
    level: 3,
    title: 'Level 3 · Diagnose the broken paraphrase',
    original: 'Banning single-use plastic would reduce ocean waste considerably.',
    rewrite: 'Banning single-use plastic will reduce ocean waste considerably.',
    question: 'This paraphrase is faulty. What broke?',
    correct: 0,
    options: [
      { text: 'The claim became a prediction: “would” proposes a result and “will” asserts one.', why: 'Correct. One modal, and the writer has moved from arguing a case to forecasting an outcome they now have to defend.' },
      { text: 'A synonym changed the meaning of one of the content words in the sentence.', why: 'Every content word is identical. The word that moved is a modal verb, not a content word.' },
      { text: 'The voice changed from active to passive and the doer of the action vanished.', why: 'Both versions are active, with the ban as the subject in each. No agent was ever named or lost.' },
      { text: 'A fact present in the original was dropped somewhere along the way in the rewrite.', why: 'Nothing was removed. One word was replaced by one other word, and the rest is identical.' },
    ],
  },
  {
    level: 3,
    title: 'Level 3 · Diagnose the broken paraphrase',
    original: 'Although the festival attracted record crowds, it lost money.',
    rewrite: 'The festival attracted record crowds and it lost money.',
    question: 'This paraphrase is faulty. What broke?',
    correct: 0,
    options: [
      { text: 'The relationship was flattened: “although” marked a tension and “and” removes it.', why: 'Correct. Structure may change freely in a paraphrase; the logic between the parts may not.' },
      { text: 'A fact was invented that appears nowhere in the original version of the sentence.', why: 'Both facts — the crowds and the loss — appear in each version. Neither one was added.' },
      { text: 'A word changed its grammatical category and the sentence rebuilt itself around it.', why: 'Not one word changed category. “Attracted” and “lost” are verbs in both versions, in the same positions.' },
      { text: 'The subject of the sentence changed, so the two halves are now about different things.', why: 'The festival is the subject of both halves in both versions.' },
    ],
  },
  {
    level: 3,
    title: 'Level 3 · Diagnose the broken paraphrase',
    original: 'Studies suggest that screen time affects sleep quality in teenagers.',
    rewrite: 'Screen time damages sleep quality in teenagers.',
    question: 'This paraphrase is faulty. What broke — and there are two things?',
    correct: 0,
    options: [
      { text: 'The attribution vanished, and a neutral verb became one that names a direction.', why: 'Correct. A hedged finding by researchers became the writer’s own flat assertion. Both halves of that shift cost marks.' },
      { text: 'The word order changed and the two sides of the claim swapped their positions.', why: 'The order is identical in both: screen time first, sleep quality second.' },
      { text: 'The voice changed from active to passive, so the doer is no longer visible.', why: 'Both are active. “Affects” and “damages” take the same subject in the same position.' },
      { text: 'A plural was turned into a singular, which narrows the group the claim covers.', why: '“Teenagers” is plural in both, and “screen time” is uncountable in both.' },
    ],
  },
];
