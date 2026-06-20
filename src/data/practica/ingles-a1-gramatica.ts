// Currículo de Gramática — Inglés A1
// Cada tema es su propia URL indexable: /practica/ingles/a1/gramatica/<slug>
// Estructura por tema: explicación (server-rendered, SEO) + tabla + ejemplos
// + errores comunes de hispanohablantes + ejercicios interactivos.

export interface GQItem {
  s: string;        // enunciado con ___ para el espacio
  opts: string[];
  a: number;        // índice de la opción correcta
  fb: string;       // feedback
}

export interface GrammarTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface GrammarExample {
  en: string;
  es: string;
  note?: string;       // matiz opcional (registro, pronunciación, etc.)
}

export interface GrammarMistake {
  wrong: string;
  right: string;
  note: string;
}

// Sub-sección explicativa con su propio subtítulo (H3) — permite estructurar
// la lección como un profesor: forma, uso, contraste, pronunciación...
export interface GrammarSection {
  heading: string;
  body: string[];
}

// Puente contrastivo español → inglés (la firma del filólogo): muestra el
// instinto del hispanohablante y cómo se dice de verdad en inglés.
export interface GrammarContrast {
  es: string;
  en: string;
  note: string;
}

export interface GrammarTopic {
  slug: string;
  order: number;
  title: string;       // título completo
  shortTitle: string;  // para chips / índice
  icon: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  intro: string[];                  // párrafos de explicación introductoria
  sections?: GrammarSection[];      // sub-secciones explicativas (opcional)
  table: GrammarTable | null;       // tabla única (formato simple)
  tables?: GrammarTable[];          // varias tablas (si se usa, sustituye a `table`)
  contrast?: GrammarContrast[];     // contraste español → inglés (opcional)
  examples: GrammarExample[];
  commonMistakes: GrammarMistake[];
  tip: string;
  questions: GQItem[];
}

export const GRAMMAR_COLOR = '#7c3aed';

export const TOPICS: GrammarTopic[] = [
  {
    slug: 'articulos-a-an-the',
    order: 1,
    title: 'Artículos en inglés: a, an y the',
    shortTitle: 'Artículos a / an / the',
    icon: '📌',
    seoTitle: 'Artículos en inglés (a, an, the): explicación, tabla y ejercicios | A1',
    seoDescription:
      'Aprende cuándo usar a, an y the en inglés con explicación clara para hispanohablantes, tabla de uso, ejemplos traducidos, errores comunes y ejercicios interactivos. Nivel A1.',
    keywords: ['a an the explicación', 'artículos en inglés', 'cuándo usar a an the', 'artículos indefinidos inglés a1'],
    intro: [
      'En inglés hay tres artículos y un caso silencioso que casi nadie enseña pero que es el que más errores causa: la ausencia de artículo. Los indefinidos "a" y "an" equivalen a "un/una"; el definido "the" equivale a "el/la/los/las"; y en muchísimos casos donde el español pone "el/la/los", el inglés NO pone nada.',
      'La regla de oro para "a" vs "an" sorprende a todos: no depende de la letra con la que se escribe la palabra, sino del SONIDO con que empieza. Por eso se dice "a university" (suena "yu-", consonántico) pero "an hour" (la h es muda, suena vocálico).',
      'En este tema vas a aprender las tres decisiones: cuándo usar a/an, cuándo usar the, y —lo más importante para el hispanohablante— cuándo no usar ningún artículo.',
    ],
    sections: [
      {
        heading: 'a o an: es cuestión de SONIDO, no de letra',
        body: [
          'Usa "a" antes de sonido consonántico (a dog, a car, a book) y "an" antes de sonido vocálico (an apple, an egg, an idea). Hasta aquí parece fácil, pero la trampa está en las palabras donde la letra y el sonido no coinciden.',
          'Casos truculentos: "a university", "a uniform", "a one-way street" (todas empiezan con sonido de consonante: "yu-", "wun-"), frente a "an hour", "an honest man", "an MBA" (la "h" es muda o la letra se lee con sonido vocálico: "em-bi-ei"). Pronúnciala mentalmente antes de decidir.',
        ],
      },
      {
        heading: "Cuándo usar 'the'",
        body: [
          'Usa "the" cuando hablas de algo concreto que el oyente puede identificar: porque es único en el mundo (the sun, the moon), porque ya se mencionó antes (I have a dog. The dog is black.), o porque el contexto lo deja claro (the book on the table, close the door).',
          'También con superlativos (the best, the biggest) y con construcciones del tipo "the + sustantivo + of..." (the capital of Colombia).',
        ],
      },
      {
        heading: 'Cuándo NO se usa artículo (el error estrella del hispanohablante)',
        body: [
          'Aquí está el 80% de los errores. Cuando hablas en sentido general de algo en plural o incontable, en inglés NO se usa artículo, aunque el español sí lo use: "Dogs are loyal" (los perros son leales), "I like music" (me gusta la música), "Money is important" (el dinero es importante).',
          'Tampoco se usa artículo con los idiomas (I speak English), con las comidas (I have breakfast), ni con lugares cuando se mencionan por su función: go to school, go to bed, go to work, go home.',
        ],
      },
      {
        heading: 'a/an con las profesiones',
        body: [
          'Un punto donde el español hace lo contrario: en inglés las profesiones SÍ llevan "a/an". "Es médica" → "She is a doctor"; "Soy ingeniero" → "I am an engineer". Omitir el artículo ("She is doctor") es un error muy marcado.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'a vs an (según el sonido)',
        headers: ['Artículo', 'Sonido inicial', 'Ejemplos', 'Casos truculentos'],
        rows: [
          ['a', 'consonántico', 'a dog, a car, a house', 'a university, a uniform, a one-way street'],
          ['an', 'vocálico', 'an apple, an egg, an idea', 'an hour, an honest man, an MBA'],
        ],
      },
      {
        caption: 'the vs. sin artículo',
        headers: ['Situación', 'Artículo', 'Ejemplo'],
        rows: [
          ['Único / ya conocido', 'the', 'the sun, the door, the best'],
          ['Plural o incontable en general', '— (nada)', 'dogs are nice, I like music'],
          ['Idiomas', '— (nada)', 'I speak English'],
          ['Lugares por su función', '— (nada)', 'go to school / bed / work / home'],
        ],
      },
    ],
    examples: [
      { en: 'I have a dog and an old car.', es: 'Tengo un perro y un carro viejo.' },
      { en: 'She is an engineer at a big company.', es: 'Ella es ingeniera en una empresa grande.', note: 'Profesión → lleva "an/a".' },
      { en: 'The sun is very bright today.', es: 'El sol está muy brillante hoy.', note: 'Único en el mundo → "the".' },
      { en: 'I need an umbrella because of the rain.', es: 'Necesito un paraguas por la lluvia.' },
      { en: 'I like music and I speak English.', es: 'Me gusta la música y hablo inglés.', note: 'Gustos generales e idiomas → sin artículo.' },
      { en: 'Dogs are loyal animals.', es: 'Los perros son animales leales.', note: 'Plural en sentido general → sin "the".' },
      { en: 'I have breakfast at 7 and go to school.', es: 'Desayuno a las 7 y voy al colegio.', note: 'Comidas y "go to school" → sin artículo.' },
      { en: 'It takes an hour by bus.', es: 'Toma una hora en bus.', note: '"hour" suena vocálico (h muda) → "an".' },
    ],
    contrast: [
      { es: 'Me gusta la música.', en: 'I like music.', note: 'En sentido general no se usa "the". "I like the music" se referiría a una música concreta.' },
      { es: 'Los perros son leales.', en: 'Dogs are loyal.', note: 'Plural general → sin artículo, aunque el español ponga "los".' },
      { es: 'Hablo español.', en: 'I speak Spanish.', note: 'Los idiomas no llevan artículo en inglés.' },
      { es: 'Es profesora.', en: 'She is a teacher.', note: 'Al revés que el español: la profesión en inglés SÍ lleva "a/an".' },
      { es: 'Voy al colegio.', en: 'I go to school.', note: 'Lugares por su función (school, work, bed, home) → sin artículo.' },
    ],
    commonMistakes: [
      { wrong: 'I like the music.', right: 'I like music.', note: 'En sentido general (gustos) no se usa "the".' },
      { wrong: 'She is teacher.', right: 'She is a teacher.', note: 'Las profesiones en inglés necesitan "a/an".' },
      { wrong: 'an university', right: 'a university', note: '"university" suena "yu-" (consonántico) → "a".' },
      { wrong: 'a hour', right: 'an hour', note: 'La "h" es muda; el sonido es vocálico → "an".' },
      { wrong: 'The dogs are nice. (en general)', right: 'Dogs are nice.', note: 'Plural genérico → sin artículo.' },
      { wrong: 'I speak the English.', right: 'I speak English.', note: 'Los idiomas no llevan artículo.' },
    ],
    tip: 'Tres reglas de oro: (1) a/an depende del SONIDO, no de la letra; (2) "the" para lo único o ya conocido; (3) NADA de artículo con plurales/incontables generales (I like music) ni con idiomas (I speak English).',
    questions: [
      { s: 'I have ___ dog.', opts: ['a', 'an', 'the'], a: 0, fb: '"A dog" — sonido consonántico (d-og). Usamos "a".' },
      { s: 'She eats ___ apple a day.', opts: ['a', 'an', 'the'], a: 1, fb: '"An apple" — sonido vocálico (a-pple). Usamos "an".' },
      { s: '___ sun is very big.', opts: ['A', 'An', 'The'], a: 2, fb: '"The sun" — hay solo un sol. Usamos "the" para cosas únicas.' },
      { s: 'He is ___ engineer.', opts: ['a', 'an', 'the'], a: 1, fb: '"An engineer" — sonido vocálico (e-ngineer). Usamos "an".' },
      { s: 'I live in ___ apartment.', opts: ['a', 'an', 'the'], a: 1, fb: '"An apartment" — sonido vocálico (a-partment).' },
      { s: '___ moon is full tonight.', opts: ['A', 'An', 'The'], a: 2, fb: '"The moon" — hay solo una luna → "the".' },
      { s: 'She is ___ teacher.', opts: ['a', 'an', 'the'], a: 0, fb: '"A teacher" — primera mención + sonido consonántico (t-eacher).' },
      { s: 'I need ___ umbrella.', opts: ['a', 'an', 'the'], a: 1, fb: '"An umbrella" — sonido vocálico (u-mbrella).' },
      { s: 'I study at ___ university.', opts: ['a', 'an', 'the'], a: 0, fb: '"A university" — suena "yu", sonido consonántico → "a".' },
      { s: '___ water in this lake is cold.', opts: ['A', 'An', 'The'], a: 2, fb: '"The water" — el agua específica de ese lago.' },
      { s: 'I like ___ music. (en general)', opts: ['the', 'a', '— (nada)'], a: 2, fb: 'Gusto general → sin artículo.' },
      { s: 'She is ___ doctor.', opts: ['a', 'the', '— (nada)'], a: 0, fb: 'Profesión → "a doctor".' },
      { s: 'I speak ___ English.', opts: ['the', 'an', '— (nada)'], a: 2, fb: 'Los idiomas no llevan artículo.' },
      { s: '___ dogs are loyal animals. (en general)', opts: ['The', 'A', '— (nada)'], a: 2, fb: 'Plural genérico → sin artículo.' },
      { s: 'It takes ___ hour by bus.', opts: ['a', 'an', 'the'], a: 1, fb: '"hour" suena vocálico (h muda) → "an".' },
      { s: '¿Cuál oración es CORRECTA?', opts: ['She is engineer.', 'She is an engineer.', 'She is a engineer.'], a: 1, fb: 'Profesión + sonido vocálico → "an engineer".' },
    ],
  },
  {
    slug: 'verbo-to-be',
    order: 2,
    title: 'Verbo "to be" en inglés: am, is, are',
    shortTitle: 'Verbo to be (am/is/are)',
    icon: '🔵',
    seoTitle: 'Verbo to be en inglés (am, is, are): explicación, conjugación y ejercicios | A1',
    seoDescription:
      'Explicación del verbo to be en inglés para principiantes: conjugación am/is/are, forma afirmativa, negativa y de pregunta, ejemplos traducidos, errores comunes y ejercicios. Nivel A1.',
    keywords: ['verbo to be explicación', 'to be en inglés', 'am is are', 'conjugación to be a1', 'verbo ser y estar en inglés'],
    intro: [
      'El verbo "to be" es el más importante de todo el A1, y también el más rentable: una sola palabra inglesa hace el trabajo de dos verbos españoles, "ser" y "estar". Con él dices quién eres, de dónde vienes, tu edad, tu profesión, cómo te sientes, cómo es algo y dónde está. Si dominas "to be", ya puedes construir tus primeras decenas de frases.',
      'Es un verbo irregular: en presente tiene tres formas distintas —am, is, are— mientras que casi todos los demás verbos ingleses tienen solo una o dos. La forma que elijas depende únicamente del sujeto, así que el primer paso es saber identificar el sujeto de la oración.',
      'Para el hispanohablante hay dos trampas desde el primer día. La primera: en inglés el sujeto y el verbo NO se pueden omitir (no existe "I student", siempre "I am a student"). La segunda: la edad, el clima y estados como el hambre se expresan con "to be", no con "tener" ni "hacer". Las dos las vamos a fijar con ejemplos y ejercicios.',
    ],
    sections: [
      {
        heading: 'Las tres formas y por qué',
        body: [
          '"am" es exclusiva del pronombre "I": es la única forma reservada a un solo sujeto. "is" se usa con la tercera persona del singular —he, she, it— y con cualquier sustantivo en singular (the coffee is hot, my brother is tall). "are" se usa con you, we, they y con cualquier sustantivo en plural (my parents are doctors).',
          'Truco práctico: si puedes sustituir el sujeto por "he/she/it", usa "is"; si puedes sustituirlo por "they", usa "are". "The dog" → "it" → is. "My friends" → "they" → are.',
        ],
      },
      {
        heading: 'Contracciones: así suena de verdad',
        body: [
          'En la conversación y en la escritura informal, el nativo casi siempre contrae el verbo: I\'m, you\'re, he\'s, she\'s, it\'s, we\'re, they\'re. No usar la contracción no es un error, pero suena artificial y "de libro".',
          'En negativo hay dos opciones: is not → isn\'t, are not → aren\'t. Para "I am not" la única contracción posible es "I\'m not" (NO existe "amn\'t"). Y ojo: "he\'s" puede significar "he is" o "he has"; lo aclara el contexto.',
        ],
      },
      {
        heading: 'Ser y estar: un solo verbo (tu gran ventaja)',
        body: [
          'En español sufres eligiendo entre "ser" y "estar"; en inglés ese problema desaparece. "Soy alto" y "estoy cansado" se dicen igual: I am tall / I am tired. Conclusión liberadora: cuando dudes entre ser y estar, en inglés siempre es "to be".',
          'El reverso de la moneda: cosas que en español dices con otros verbos, en inglés van con "to be". La edad: "tengo 20 años" → I am 20 (years old). El clima: "hace frío" → it is cold. Y estados físicos: "tengo hambre/sed/miedo" → I am hungry / thirsty / afraid.',
        ],
      },
      {
        heading: 'Preguntas y respuestas cortas',
        body: [
          'Para preguntar con "to be" basta con poner el verbo delante del sujeto: Are you ready? Is she a teacher? Am I late? No se necesita ningún auxiliar como "do".',
          'La respuesta corta reutiliza el mismo verbo: "Are you a student?" → "Yes, I am" / "No, I\'m not". "Is he your brother?" → "Yes, he is" / "No, he isn\'t". Nunca respondas solo "Yes" en un examen oral: completa con el verbo.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Forma afirmativa',
        headers: ['Sujeto', 'Forma', 'Contracción', 'Ejemplo'],
        rows: [
          ['I', 'am', "I'm", "I'm a student"],
          ['You', 'are', "you're", "you're kind"],
          ['He / She / It', 'is', "he's / she's / it's", "she's happy"],
          ['We', 'are', "we're", "we're from Colombia"],
          ['They', 'are', "they're", "they're friends"],
        ],
      },
      {
        caption: 'Forma negativa',
        headers: ['Sujeto', 'Forma', 'Contracción', 'Ejemplo'],
        rows: [
          ['I', 'am not', "I'm not", "I'm not tired"],
          ['He / She / It', 'is not', "isn't", "he isn't here"],
          ['You / We / They', 'are not', "aren't", "we aren't ready"],
        ],
      },
      {
        caption: 'Preguntas y respuestas cortas',
        headers: ['Pregunta', 'Respuesta afirmativa', 'Respuesta negativa'],
        rows: [
          ['Am I right?', 'Yes, you are.', "No, you aren't."],
          ['Is she a doctor?', 'Yes, she is.', "No, she isn't."],
          ['Are they ready?', 'Yes, they are.', "No, they aren't."],
        ],
      },
    ],
    examples: [
      { en: "I'm a teacher and she's a nurse.", es: 'Soy profesor/a y ella es enfermera.' },
      { en: 'We are from Colombia.', es: 'Somos de Colombia.' },
      { en: "He isn't at home right now.", es: 'Él no está en casa ahora mismo.', note: '"to be" también dice DÓNDE está algo (ubicación).' },
      { en: 'Are you tired?', es: '¿Estás cansado/a?', note: 'Pregunta: el verbo va delante del sujeto.' },
      { en: 'It is cold and windy today.', es: 'Hoy hace frío y viento.', note: 'El clima va con "it is", no con "hacer".' },
      { en: 'I am 25 years old.', es: 'Tengo 25 años.', note: 'La edad va con "to be", nunca con "have".' },
      { en: 'They are my best friends.', es: 'Son mis mejores amigos.' },
      { en: "Yes, she is. / No, she isn't.", es: 'Sí (lo es). / No (no lo es).', note: 'La respuesta corta reutiliza el verbo "is".' },
    ],
    contrast: [
      { es: 'Tengo 20 años.', en: 'I am 20 (years old).', note: 'La edad usa "to be", no "have". "I have 20 years" suena a que posees 20 años, no a tu edad.' },
      { es: 'Hace frío.', en: 'It is cold.', note: 'El clima usa "it is" + adjetivo. No existe un verbo "hacer" para el tiempo en inglés.' },
      { es: 'Estoy de acuerdo.', en: 'I agree.', note: '¡Cuidado! "agree" ya es un verbo. Decir "I am agree" es el error más típico del hispanohablante.' },
      { es: 'Soy alto. / Estoy cansado.', en: 'I am tall. / I am tired.', note: 'El inglés no distingue ser/estar: ambos son "to be". Una preocupación menos.' },
      { es: 'Tengo hambre.', en: 'I am hungry.', note: 'Hambre, sed y miedo son estados con "to be": I am hungry / thirsty / afraid.' },
    ],
    commonMistakes: [
      { wrong: 'I have 20 years.', right: 'I am 20 years old.', note: 'Transferencia del español "tener años". La edad en inglés se expresa con "to be".' },
      { wrong: 'I am agree with you.', right: 'I agree with you.', note: '"agree" ya es verbo; no necesita "to be". Mismo caso: "I am understand" → "I understand".' },
      { wrong: 'She nurse. / I student.', right: 'She is a nurse. / I am a student.', note: 'Nunca omitas el verbo "to be" ni el artículo "a/an" delante de la profesión.' },
      { wrong: 'They is good friends.', right: 'They are good friends.', note: 'Con they/we/you → "are". Solo he/she/it y singulares llevan "is".' },
      { wrong: 'Make cold today.', right: 'It is cold today.', note: 'El clima va con "it is" + adjetivo, no con un verbo tipo "hacer".' },
      { wrong: 'He is have hungry.', right: 'He is hungry.', note: 'No juntes dos verbos. "tener hambre" = "to be hungry".' },
    ],
    tip: 'Si dudas entre ser y estar, en inglés siempre es "to be". Y memoriza tres casos que NO usan have ni hacer: la edad (I am 20), el clima (it is cold) y el hambre (I am hungry).',
    questions: [
      { s: 'I ___ a student.', opts: ['am', 'is', 'are'], a: 0, fb: '"I am" — con "I" siempre usamos "am".' },
      { s: 'She ___ very kind.', opts: ['am', 'is', 'are'], a: 1, fb: '"She is" — con he/she/it usamos "is".' },
      { s: 'We ___ from Colombia.', opts: ['am', 'is', 'are'], a: 2, fb: '"We are" — con we/you/they usamos "are".' },
      { s: 'He ___ not at home right now.', opts: ['am', 'is', 'are'], a: 1, fb: '"He is not" — con he/she/it → is.' },
      { s: 'They ___ good friends.', opts: ['am', 'is', 'are'], a: 2, fb: '"They are" — con they → are.' },
      { s: '___ you happy?', opts: ['Am', 'Is', 'Are'], a: 2, fb: '"Are you?" — preguntas con "you" usan "are".' },
      { s: 'The coffee ___ hot.', opts: ['am', 'is', 'are'], a: 1, fb: '"Coffee is" — sujeto singular → is.' },
      { s: 'My parents ___ doctors.', opts: ['am', 'is', 'are'], a: 2, fb: '"Parents are" — sujeto plural → are.' },
      { s: 'I ___ not tired today.', opts: ['am', 'is', 'are'], a: 0, fb: '"I am not" — con "I" → am.' },
      { s: 'It ___ raining outside.', opts: ['am', 'is', 'are'], a: 1, fb: '"It is" — con it → is.' },
      { s: 'She ___ a teacher; she is a nurse. (negativo)', opts: ["isn't", "aren't", "amn't"], a: 0, fb: 'Negativo de "is" → "isn\'t". Ojo: "amn\'t" no existe.' },
      { s: 'We ___ ready yet. (negativo)', opts: ["isn't", "aren't", 'am not'], a: 1, fb: 'Con "we" → "aren\'t" (are not).' },
      { s: '"Are you a student?" — "Yes, I ___."', opts: ['am', 'is', 'are'], a: 0, fb: 'Respuesta corta con "I" → "Yes, I am".' },
      { s: '___ cold in Bogotá today. (clima)', opts: ['It is', 'I am', 'They are'], a: 0, fb: 'El clima va con "it is": "It is cold".' },
      { s: '¿Cómo se dice "Tengo 30 años"?', opts: ['I have 30 years.', 'I am 30 years old.', 'I am 30 years.'], a: 1, fb: 'La edad: "I am 30 years old" (to be + número + years old).' },
      { s: '¿Cuál oración es CORRECTA?', opts: ['I am agree with you.', 'I agree with you.', 'I am agree.'], a: 1, fb: '"agree" ya es verbo: "I agree", sin "to be".' },
    ],
  },
  {
    slug: 'pronombres-personales',
    order: 3,
    title: 'Pronombres personales en inglés (I, you, he, she, it, we, they)',
    shortTitle: 'Pronombres personales',
    icon: '👤',
    seoTitle: 'Pronombres personales en inglés: explicación, tabla y ejercicios | A1',
    seoDescription:
      'Pronombres personales sujeto en inglés (I, you, he, she, it, we, they): cuándo usar cada uno, tabla, ejemplos y ejercicios para principiantes. Nivel A1.',
    keywords: ['pronombres personales inglés', 'I you he she it we they', 'pronombres sujeto inglés a1', 'he she it explicación'],
    intro: [
      'Los pronombres personales sujeto reemplazan al nombre de la persona o cosa que hace la acción. En inglés son obligatorios: a diferencia del español, NO se puede omitir el sujeto. Siempre se dice "It is raining", nunca solo "Is raining".',
      'Ojo con la tercera persona singular: "he" para hombres, "she" para mujeres y "it" para cosas, animales y conceptos. El español no distingue "it", por eso es un error frecuente decir "he"/"she" para objetos.',
    ],
    table: {
      caption: 'Pronombres personales sujeto',
      headers: ['Pronombre', 'Uso', 'Ejemplo'],
      rows: [
        ['I', 'yo', 'I work here'],
        ['you', 'tú / usted / ustedes', 'you are right'],
        ['he', 'él (persona masculina)', 'he is tall'],
        ['she', 'ella (persona femenina)', 'she sings'],
        ['it', 'cosa, animal, clima', 'it is cold'],
        ['we', 'nosotros/as', 'we live here'],
        ['they', 'ellos/as (personas o cosas)', 'they are new'],
      ],
    },
    examples: [
      { en: 'Maria is from Spain. She is from Spain.', es: 'María es de España. Ella es de España.' },
      { en: 'The book is new. It is new.', es: 'El libro es nuevo. Él (eso) es nuevo.' },
      { en: 'Tom and I are friends. We are friends.', es: 'Tom y yo somos amigos. Nosotros somos amigos.' },
      { en: 'My parents work a lot. They work a lot.', es: 'Mis padres trabajan mucho. Ellos trabajan mucho.' },
    ],
    commonMistakes: [
      { wrong: 'Is raining.', right: 'It is raining.', note: 'En inglés el sujeto no se omite. Usa "it".' },
      { wrong: 'The dog? He is big. (para una cosa neutra)', right: 'It is big.', note: 'Para animales/objetos en general → it.' },
      { wrong: 'Me and Tom are friends.', right: 'Tom and I are friends.', note: 'Como sujeto se usa "I", no "me".' },
    ],
    tip: 'En inglés los pronombres son obligatorios — no se puede omitir el sujeto como en español. "It" sirve para cosas, animales y el clima.',
    questions: [
      { s: 'Maria is from Spain. ___ is from Spain.', opts: ['He', 'She', 'It', 'They'], a: 1, fb: '"She" — Maria es mujer.' },
      { s: 'Tom and I are friends. ___ are friends.', opts: ['We', 'They', 'You', 'It'], a: 0, fb: '"We" — cuando yo estoy incluido en el grupo.' },
      { s: 'The book is on the table. ___ is on the table.', opts: ['He', 'She', 'It', 'They'], a: 2, fb: '"It" — para cosas y objetos usamos "it".' },
      { s: 'My parents work hard. ___ work hard.', opts: ['We', 'They', 'You', 'It'], a: 1, fb: '"They" — para grupos de personas (sin yo).' },
      { s: 'John lives in London. ___ lives in London.', opts: ['He', 'She', 'It', 'They'], a: 0, fb: '"He" — John es un hombre.' },
      { s: '___ is raining. (clima)', opts: ['He', 'She', 'It', 'They'], a: 2, fb: '"It is raining" — el clima siempre lleva "it".' },
      { s: 'The car is fast. ___ is fast.', opts: ['He', 'She', 'It', 'They'], a: 2, fb: '"It" — para objetos como el carro.' },
      { s: 'My sister and I love music. ___ love music.', opts: ['We', 'They', 'You', 'It'], a: 0, fb: '"We" — yo + mi hermana = nosotros.' },
    ],
  },
  {
    slug: 'adjetivos-posesivos',
    order: 4,
    title: 'Adjetivos posesivos en inglés (my, your, his, her, its, our, their)',
    shortTitle: 'Adjetivos posesivos',
    icon: '🔑',
    seoTitle: 'Adjetivos posesivos en inglés (my, your, his, her): explicación y ejercicios | A1',
    seoDescription:
      'Adjetivos posesivos en inglés: my, your, his, her, its, our, their. Explicación, tabla con los pronombres, ejemplos traducidos, errores comunes y ejercicios. Nivel A1.',
    keywords: ['adjetivos posesivos inglés', 'my your his her', 'posesivos en inglés a1', 'his her diferencia'],
    intro: [
      'Los adjetivos posesivos indican de quién es algo y van SIEMPRE antes del sustantivo: my house, your name, her car. No cambian si el objeto es singular o plural (my book / my books).',
      'La clave para hispanohablantes: "his" y "her" dependen del DUEÑO, no del objeto. "His car" = el carro de él; "her car" = el carro de ella. En español "su" no distingue el género del dueño, por eso confunde.',
    ],
    table: {
      caption: 'Pronombre sujeto → adjetivo posesivo',
      headers: ['Sujeto', 'Posesivo', 'Ejemplo'],
      rows: [
        ['I', 'my', 'my name'],
        ['you', 'your', 'your house'],
        ['he', 'his', 'his car'],
        ['she', 'her', 'her dog'],
        ['it', 'its', 'its color'],
        ['we', 'our', 'our school'],
        ['they', 'their', 'their friends'],
      ],
    },
    examples: [
      { en: 'My name is Ana.', es: 'Mi nombre es Ana.' },
      { en: 'This is his bicycle and that is her bag.', es: 'Esta es la bicicleta de él y esa es la bolsa de ella.' },
      { en: 'Our house is small.', es: 'Nuestra casa es pequeña.' },
      { en: 'The dog loves its bed.', es: 'Al perro le encanta su cama.' },
      { en: 'They visit their grandparents on Sunday.', es: 'Visitan a sus abuelos el domingo.' },
    ],
    commonMistakes: [
      { wrong: 'She loves her car. → para un hombre: "She loves his car"', right: 'He loves his car.', note: 'El posesivo concuerda con el DUEÑO: hombre → his.' },
      { wrong: "It's color is red.", right: 'Its color is red.', note: '"its" (posesivo) no lleva apóstrofo. "it\'s" = it is.' },
      { wrong: 'My brother and me car.', right: 'My brother\'s car / our car.', note: 'Usa el posesivo correcto, no el pronombre objeto.' },
    ],
    tip: '"His" o "her" dependen de quién POSEE, no del objeto. El carro de Pedro = "his car" aunque "car" no tenga género.',
    questions: [
      { s: 'This is ___ name. (de mí)', opts: ['my', 'your', 'his', 'her'], a: 0, fb: '"my" = mi (de mí).' },
      { s: 'Peter loves ___ dog. (el perro de Peter)', opts: ['her', 'his', 'its', 'your'], a: 1, fb: 'Peter es hombre → "his".' },
      { s: 'Anna calls ___ mother every day.', opts: ['his', 'her', 'its', 'our'], a: 1, fb: 'Anna es mujer → "her".' },
      { s: 'We clean ___ house on Saturdays.', opts: ['our', 'their', 'your', 'my'], a: 0, fb: '"we" → "our" (nuestra).' },
      { s: 'The cat is in ___ basket.', opts: ["it's", 'its', 'his', 'her'], a: 1, fb: '"its" posesivo, sin apóstrofo.' },
      { s: 'What is ___ phone number? (de ti)', opts: ['my', 'your', 'his', 'their'], a: 1, fb: '"your" = tu/su (de ti).' },
      { s: 'They sell ___ old furniture.', opts: ['our', 'your', 'their', 'his'], a: 2, fb: '"they" → "their".' },
      { s: 'My sister and I love ___ grandparents.', opts: ['my', 'our', 'their', 'her'], a: 1, fb: 'Mi hermana y yo = we → "our".' },
    ],
  },
  {
    slug: 'demostrativos-this-that',
    order: 5,
    title: 'Demostrativos en inglés: this, that, these, those',
    shortTitle: 'Demostrativos this/that',
    icon: '👉',
    seoTitle: 'Demostrativos en inglés (this, that, these, those): explicación y ejercicios | A1',
    seoDescription:
      'This, that, these y those en inglés: diferencia entre cerca y lejos, singular y plural. Explicación, tabla, ejemplos y ejercicios interactivos. Nivel A1.',
    keywords: ['this that these those', 'demostrativos en inglés', 'this that diferencia', 'demostrativos inglés a1'],
    intro: [
      'Los demostrativos señalan personas o cosas según la distancia y la cantidad. "This/these" para algo CERCA; "that/those" para algo LEJOS.',
      'Además distinguen número: "this/that" son singular (una cosa) y "these/those" son plural (varias). En español equivalen a este/ese/estos/esos.',
    ],
    table: {
      caption: 'Distancia y número',
      headers: ['', 'Cerca', 'Lejos'],
      rows: [
        ['Singular', 'this (este/esta)', 'that (ese/aquel)'],
        ['Plural', 'these (estos/estas)', 'those (esos/aquellos)'],
      ],
    },
    examples: [
      { en: 'This is my phone.', es: 'Este es mi teléfono. (cerca)' },
      { en: 'That is your house over there.', es: 'Esa es tu casa allá. (lejos)' },
      { en: 'These shoes are new.', es: 'Estos zapatos son nuevos. (cerca, plural)' },
      { en: 'Those mountains are beautiful.', es: 'Esas montañas son hermosas. (lejos, plural)' },
    ],
    commonMistakes: [
      { wrong: 'This shoes are nice.', right: 'These shoes are nice.', note: '"shoes" es plural → these/those.' },
      { wrong: 'Look at that birds.', right: 'Look at those birds.', note: 'Plural y lejos → those.' },
      { wrong: 'These is my friend.', right: 'This is my friend.', note: 'Una persona (singular, cerca) → this.' },
    ],
    tip: 'Regla rápida: this/these = aquí cerca; that/those = allá lejos. Y la "s" de these/those te recuerda el plural.',
    questions: [
      { s: '___ is my pen. (cerca, singular)', opts: ['This', 'That', 'These', 'Those'], a: 0, fb: 'Cerca + singular → "this".' },
      { s: '___ shoes are dirty. (cerca, plural)', opts: ['This', 'That', 'These', 'Those'], a: 2, fb: 'Cerca + plural → "these".' },
      { s: 'Look at ___ stars in the sky. (lejos, plural)', opts: ['this', 'that', 'these', 'those'], a: 3, fb: 'Lejos + plural → "those".' },
      { s: '___ is your bag over there. (lejos, singular)', opts: ['This', 'That', 'These', 'Those'], a: 1, fb: 'Lejos + singular → "that".' },
      { s: '___ apples here are fresh.', opts: ['This', 'That', 'These', 'Those'], a: 2, fb: '"apples" plural + here → "these".' },
      { s: 'Who is ___ man next to you?', opts: ['this', 'that', 'these', 'those'], a: 0, fb: 'Singular + cerca → "this".' },
      { s: '___ houses across the river are old.', opts: ['This', 'That', 'These', 'Those'], a: 3, fb: 'Plural + lejos → "those".' },
      { s: 'I like ___ song. (la que suena ahora)', opts: ['this', 'these', 'those', 'that'], a: 0, fb: 'Algo presente/cercano, singular → "this".' },
    ],
  },
  {
    slug: 'plural-sustantivos',
    order: 6,
    title: 'El plural de los sustantivos en inglés',
    shortTitle: 'Plural de sustantivos',
    icon: '🔢',
    seoTitle: 'Plural de sustantivos en inglés: reglas, irregulares y ejercicios | A1',
    seoDescription:
      'Cómo formar el plural en inglés: reglas +s, +es, +ies y plurales irregulares (man/men, child/children). Explicación, tabla, ejemplos y ejercicios. Nivel A1.',
    keywords: ['plural en inglés', 'plural de sustantivos inglés', 'plurales irregulares inglés', 'reglas del plural a1'],
    intro: [
      'La mayoría de los sustantivos forman el plural añadiendo -s (book → books). Pero hay reglas especiales según la terminación de la palabra, y un grupo de plurales irregulares que hay que memorizar.',
      'Añade -es cuando la palabra termina en s, sh, ch, x o z (box → boxes). Cuando termina en consonante + y, cambia la y por -ies (city → cities). Si termina en vocal + y, solo añade -s (boy → boys).',
    ],
    table: {
      caption: 'Reglas para formar el plural',
      headers: ['Terminación', 'Regla', 'Ejemplo'],
      rows: [
        ['general', '+ s', 'book → books'],
        ['s, sh, ch, x, z', '+ es', 'box → boxes, watch → watches'],
        ['consonante + y', 'y → ies', 'city → cities'],
        ['vocal + y', '+ s', 'boy → boys'],
        ['irregulares', 'memorizar', 'man → men, child → children, foot → feet'],
      ],
    },
    examples: [
      { en: 'one book → two books', es: 'un libro → dos libros' },
      { en: 'one box → three boxes', es: 'una caja → tres cajas' },
      { en: 'one city → many cities', es: 'una ciudad → muchas ciudades' },
      { en: 'one child → five children', es: 'un niño → cinco niños' },
      { en: 'one tooth → all my teeth', es: 'un diente → todos mis dientes' },
    ],
    commonMistakes: [
      { wrong: 'two childs', right: 'two children', note: 'Plural irregular: child → children.' },
      { wrong: 'three citys', right: 'three cities', note: 'Consonante + y → ies.' },
      { wrong: 'two persons (informal)', right: 'two people', note: 'El plural natural de "person" es "people".' },
    ],
    tip: 'Vocal + y solo añade -s (boys, days). Consonante + y cambia y→ies (city→cities, baby→babies).',
    questions: [
      { s: 'One book — two ___.', opts: ['books', 'bookes', 'bookies'], a: 0, fb: '"Books" — regla general: solo +s.' },
      { s: 'One box — two ___.', opts: ['boxs', 'boxes', 'boxies'], a: 1, fb: '"Boxes" — termina en x → +es.' },
      { s: 'One baby — two ___.', opts: ['babys', 'babies', 'babes'], a: 1, fb: '"Babies" — consonante + y → cambia y por ies.' },
      { s: 'One man — two ___.', opts: ['mans', 'men', 'manes'], a: 1, fb: '"Men" — irregular. Man→men, woman→women.' },
      { s: 'One child — two ___.', opts: ['childs', 'childes', 'children'], a: 2, fb: '"Children" — irregular. Child→children.' },
      { s: 'One city — two ___.', opts: ['citys', 'cities', 'cityes'], a: 1, fb: '"Cities" — consonante (t) + y → ies.' },
      { s: 'One tooth — two ___.', opts: ['tooths', 'teeths', 'teeth'], a: 2, fb: '"Teeth" — irregular. Tooth→teeth, foot→feet.' },
      { s: 'One bus — two ___.', opts: ['bus', 'buss', 'buses'], a: 2, fb: '"Buses" — termina en s → +es.' },
      { s: 'One day — seven ___.', opts: ['days', 'dayes', 'daies'], a: 0, fb: 'Vocal + y → solo +s: "days".' },
    ],
  },
  {
    slug: 'there-is-there-are',
    order: 7,
    title: 'There is y there are en inglés (hay)',
    shortTitle: 'There is / there are',
    icon: '📍',
    seoTitle: 'There is / there are en inglés (hay): explicación y ejercicios | A1',
    seoDescription:
      'Cómo usar there is y there are en inglés para decir "hay". Diferencia singular/plural, forma negativa e interrogativa, ejemplos y ejercicios. Nivel A1.',
    keywords: ['there is there are', 'cómo se dice hay en inglés', 'there is there are diferencia', 'there is there are ejercicios'],
    intro: [
      'Usamos "there is" y "there are" para decir que algo EXISTE o que "hay" algo en un lugar. La elección depende de si lo que sigue es singular o plural, no del sujeto.',
      '"There is" + singular/incontable (There is a book). "There are" + plural (There are two books). En negativo se añade "not" (there isn\'t / there aren\'t) y para preguntar se invierte: Is there...? / Are there...?',
    ],
    table: {
      caption: 'There is / there are',
      headers: ['Forma', 'Singular', 'Plural'],
      rows: [
        ['Afirmativa', 'There is a chair', 'There are two chairs'],
        ['Negativa', "There isn't a chair", "There aren't chairs"],
        ['Pregunta', 'Is there a chair?', 'Are there chairs?'],
      ],
    },
    examples: [
      { en: 'There is a book on the table.', es: 'Hay un libro en la mesa.' },
      { en: 'There are three windows in the room.', es: 'Hay tres ventanas en la habitación.' },
      { en: "There isn't any milk in the fridge.", es: 'No hay leche en el refrigerador.' },
      { en: 'Are there any students here?', es: '¿Hay estudiantes aquí?' },
    ],
    commonMistakes: [
      { wrong: 'There are a problem.', right: 'There is a problem.', note: 'Singular → there is.' },
      { wrong: 'It has many people.', right: 'There are many people.', note: 'Para "hay" se usa there is/are, no "have".' },
      { wrong: 'There is two cats.', right: 'There are two cats.', note: 'Plural (two cats) → there are.' },
    ],
    tip: 'Para decir "hay" NO uses "have". Mira lo que viene después: singular → there is, plural → there are.',
    questions: [
      { s: '___ a cat on the sofa.', opts: ['There is', 'There are', 'It is'], a: 0, fb: 'Singular (a cat) → "there is".' },
      { s: '___ four people in my family.', opts: ['There is', 'There are', 'It has'], a: 1, fb: 'Plural (four people) → "there are".' },
      { s: '___ any sugar in my coffee.', opts: ["There isn't", "There aren't", 'It is not'], a: 0, fb: 'Incontable/singular → "there isn\'t".' },
      { s: '___ two bedrooms in the house.', opts: ['There is', 'There are', 'There be'], a: 1, fb: 'Plural (two bedrooms) → "there are".' },
      { s: '___ there a bank near here?', opts: ['Is', 'Are', 'Be'], a: 0, fb: 'Pregunta singular → "Is there...?".' },
      { s: '___ there any apples?', opts: ['Is', 'Are', 'Have'], a: 1, fb: 'Pregunta plural → "Are there...?".' },
      { s: '___ a problem with the wifi.', opts: ['There is', 'There are', 'They are'], a: 0, fb: '"a problem" singular → "there is".' },
      { s: '___ many cars in the street.', opts: ['There is', 'There are', 'It is'], a: 1, fb: 'Plural (many cars) → "there are".' },
    ],
  },
  {
    slug: 'have-got',
    order: 8,
    title: 'Have got / have en inglés (tener)',
    shortTitle: 'Have got (tener)',
    icon: '🎒',
    seoTitle: 'Have got y have en inglés (tener): explicación y ejercicios | A1',
    seoDescription:
      'Cómo expresar posesión en inglés con have got y have: I have got, she has got, forma negativa e interrogativa. Explicación, tabla, ejemplos y ejercicios. Nivel A1.',
    keywords: ['have got', 'have got have diferencia', 'tener en inglés', 'have has got a1'],
    intro: [
      'Para decir que tienes algo (posesión, familia, características) usamos "have got" (muy común en inglés británico) o simplemente "have". Significan lo mismo: "tener".',
      'Con he, she, it cambia a "has got" / "has". La forma corta es muy frecuente: I\'ve got, she\'s got. En negativo: haven\'t got / hasn\'t got. En pregunta: Have you got...? / Has she got...?',
    ],
    table: {
      caption: 'have got / has got',
      headers: ['Sujeto', 'Afirmativa', 'Negativa', 'Pregunta'],
      rows: [
        ['I / you / we / they', "have got ('ve got)", "haven't got", 'Have you got...?'],
        ['he / she / it', "has got ('s got)", "hasn't got", 'Has she got...?'],
      ],
    },
    examples: [
      { en: "I've got two brothers.", es: 'Tengo dos hermanos.' },
      { en: 'She has got brown eyes.', es: 'Ella tiene ojos marrones.' },
      { en: "We haven't got a car.", es: 'No tenemos carro.' },
      { en: 'Have you got a pen?', es: '¿Tienes un bolígrafo?' },
    ],
    commonMistakes: [
      { wrong: 'She have got a dog.', right: 'She has got a dog.', note: 'Con he/she/it → has got.' },
      { wrong: 'I have got 25 years.', right: "I'm 25 (years old).", note: 'La edad se dice con "to be", no con "have".' },
      { wrong: 'Do you have got a car?', right: 'Have you got a car? / Do you have a car?', note: 'No mezcles "do" con "have got".' },
    ],
    tip: '"have got" y "have" significan lo mismo (tener). Con he/she/it usa "has". La edad NO usa have: "I am 20", no "I have 20".',
    questions: [
      { s: 'I ___ got two sisters.', opts: ['have', 'has', 'am'], a: 0, fb: 'Con I → "have got".' },
      { s: 'She ___ got blue eyes.', opts: ['have', 'has', 'is'], a: 1, fb: 'Con she → "has got".' },
      { s: 'We ___ got a big house.', opts: ['have', 'has', 'are'], a: 0, fb: 'Con we → "have got".' },
      { s: 'He ___ got a new phone.', opts: ['have', 'has', 'have got'], a: 1, fb: 'Con he → "has got".' },
      { s: '___ you got a pen?', opts: ['Have', 'Has', 'Do'], a: 0, fb: 'Pregunta con you → "Have you got...?".' },
      { s: 'They ___ got any money. (negativo)', opts: ["haven't", "hasn't", "aren't"], a: 0, fb: 'Con they → "haven\'t got".' },
      { s: 'My dog ___ got long ears.', opts: ['have', 'has', 'is'], a: 1, fb: '"dog" = it → "has got".' },
      { s: '___ she got brothers?', opts: ['Have', 'Has', 'Do'], a: 1, fb: 'Pregunta con she → "Has she got...?".' },
    ],
  },
  {
    slug: 'present-simple-afirmativo-negativo',
    order: 9,
    title: 'Present simple en inglés: afirmativo y negativo',
    shortTitle: 'Present simple (afirm./neg.)',
    icon: '⏰',
    seoTitle: 'Present simple en inglés (afirmativo y negativo): explicación y ejercicios | A1',
    seoDescription:
      'El presente simple en inglés: la -s de la tercera persona, forma negativa con don\'t y doesn\'t. Explicación clara, tabla, ejemplos traducidos y ejercicios. Nivel A1.',
    keywords: ['present simple', 'presente simple inglés', 'don\'t doesn\'t', 'tercera persona s inglés', 'present simple a1'],
    intro: [
      'El present simple es el tiempo verbal con el que hablas de tu vida: rutinas, hábitos, gustos y verdades generales (I work, she studies, water boils at 100°C). Es el primer tiempo que necesitas dominar porque lo usarás en casi todas tus frases del día a día.',
      'Tiene una regla pequeña pero traicionera: con he, she, it (la tercera persona del singular) el verbo lleva una -s al final —he works, she studies—. Es la regla que más se olvida y la que más "delata" a un principiante.',
      'En negativo se usan los auxiliares don\'t (con I, you, we, they) y doesn\'t (con he, she, it) seguidos del verbo en su forma base. La clave que vamos a machacar: cuando aparece "doesn\'t", el verbo PIERDE la -s.',
    ],
    sections: [
      {
        heading: 'La -s de la tercera persona (lo que más se olvida)',
        body: [
          'Con he, she, it y cualquier sujeto singular, el verbo añade -s: I work → he works; they live → she lives. La mayoría solo añade -s, pero hay reglas de escritura: los verbos terminados en -s, -sh, -ch, -x, -o añaden -es (watch → watches, go → goes, do → does); los terminados en consonante + y cambian a -ies (study → studies, fly → flies).',
          'Para el oído: esa -s se pronuncia de tres formas —/s/ en "works", /z/ en "plays" y /ɪz/ en "watches"—, pero al escribir basta con aplicar las reglas de arriba.',
        ],
      },
      {
        heading: "El negativo: don't y doesn't",
        body: [
          'La negación necesita un auxiliar: don\'t para I/you/we/they y doesn\'t para he/she/it. Y aquí está el punto de oro: "doesn\'t" ya se lleva la -s de la tercera persona, así que el verbo vuelve a su forma base. Se dice "She doesn\'t work", nunca "She doesn\'t works".',
          'Otro reflejo a corregir: en español negamos con un simple "no + verbo" ("ella no come carne"). En inglés ese "no" suelto no funciona: necesitas doesn\'t/don\'t. "She no eat meat" → "She doesn\'t eat meat".',
        ],
      },
      {
        heading: 'Cuándo se usa (y cuándo NO)',
        body: [
          'Usa el present simple para hábitos y rutinas (I get up at 7), gustos (I like coffee), verdades y hechos (the Earth is round) y horarios (the train leaves at 9). Lo acompañan marcadores como every day, usually, always, on Mondays.',
          'NO lo uses para una acción que ocurre en este momento: eso es el present continuous. "I work here" (rutina) frente a "I am working now" (ahora mismo).',
        ],
      },
      {
        heading: 'El presente español engaña',
        body: [
          'El presente español "trabajo" corresponde a DOS formas inglesas: "I work" (en general) e "I am working" (ahora mismo). El inglés las separa y el español no, así que no traduzcas "estoy trabajando" con present simple.',
          'Regla rápida: si en la frase hay "ahora", "en este momento", "now" o "right now", casi seguro es present continuous, no present simple.',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'La -s de la tercera persona (escritura)',
        headers: ['Terminación del verbo', 'Regla', 'Ejemplo'],
        rows: [
          ['general', '+ s', 'work → works'],
          ['-s, -sh, -ch, -x, -o', '+ es', 'watch → watches, go → goes'],
          ['consonante + y', 'y → ies', 'study → studies'],
          ['vocal + y', '+ s', 'play → plays'],
        ],
      },
      {
        caption: 'Afirmativo y negativo',
        headers: ['Sujeto', 'Afirmativo', 'Negativo'],
        rows: [
          ['I / you / we / they', 'work', "don't work"],
          ['he / she / it', 'works (+s)', "doesn't work (sin -s)"],
        ],
      },
    ],
    examples: [
      { en: 'I work in a bank.', es: 'Trabajo en un banco.' },
      { en: 'She works in a bank.', es: 'Ella trabaja en un banco.', note: 'he/she/it → +s.' },
      { en: 'He watches TV every night.', es: 'Él ve la tele cada noche.', note: 'termina en -ch → +es.' },
      { en: 'My sister studies medicine.', es: 'Mi hermana estudia medicina.', note: 'consonante + y → ies.' },
      { en: "They don't eat meat.", es: 'Ellos no comen carne.' },
      { en: "He doesn't speak French.", es: 'Él no habla francés.', note: "doesn't + verbo base (sin -s)." },
      { en: 'The sun rises in the east.', es: 'El sol sale por el este.', note: 'verdad general.' },
      { en: 'Water boils at 100 °C.', es: 'El agua hierve a 100 °C.' },
    ],
    contrast: [
      { es: 'Ella trabaja en un banco.', en: 'She works in a bank.', note: 'Tercera persona del singular → el verbo lleva -s.' },
      { es: 'No como carne.', en: "I don't eat meat.", note: 'La negación necesita "don\'t"; el "no" suelto del español no basta.' },
      { es: 'Él no habla francés.', en: "He doesn't speak French.", note: '"doesn\'t" + verbo base, sin -s.' },
      { es: 'Estudio inglés los lunes.', en: 'I study English on Mondays.', note: 'Rutina con marcador "on Mondays" → present simple.' },
      { es: 'Estoy comiendo.', en: 'I am eating.', note: '¡Acción ahora mismo! NO es present simple, es present continuous.' },
    ],
    commonMistakes: [
      { wrong: 'She work here.', right: 'She works here.', note: 'Con he/she/it el verbo lleva -s.' },
      { wrong: "He doesn't works.", right: "He doesn't work.", note: 'Con "doesn\'t" el verbo va en forma base, sin -s.' },
      { wrong: "I doesn't like it.", right: "I don't like it.", note: 'Con I/you/we/they → "don\'t", no "doesn\'t".' },
      { wrong: 'She no eat meat.', right: "She doesn't eat meat.", note: 'El "no + verbo" del español no funciona; usa "doesn\'t".' },
      { wrong: 'He study English.', right: 'He studies English.', note: 'study → studies (consonante + y → ies).' },
      { wrong: 'I am work every day.', right: 'I work every day.', note: 'La rutina va en present simple, sin "am". "am work" no existe.' },
    ],
    tip: 'La -s de he/she/it es la regla más olvidada y la que más te delata. Y memoriza: en cuanto aparece don\'t/doesn\'t, el verbo SIEMPRE vuelve a su forma base (She doesn\'t work, no "works").',
    questions: [
      { s: 'She ___ to work every day.', opts: ['walk', 'walks', 'walking'], a: 1, fb: '"She walks" — con she/he/it añadimos -s.' },
      { s: 'They ___ in a big house.', opts: ['live', 'lives', 'is living'], a: 0, fb: '"They live" — con they usamos el verbo base sin -s.' },
      { s: 'He ___ not eat meat.', opts: ["don't", "doesn't", "isn't"], a: 1, fb: '"He doesn\'t" — con he/she/it usamos "doesn\'t".' },
      { s: 'I ___ play football on Saturdays.', opts: ["don't", "doesn't", 'not'], a: 0, fb: '"I don\'t" — con I/you/we/they usamos "don\'t".' },
      { s: 'The sun ___ in the east.', opts: ['rise', 'rises', 'is rising'], a: 1, fb: '"The sun rises" — sujeto singular → +s.' },
      { s: 'My brothers ___ to the gym often.', opts: ['goes', 'go', 'going'], a: 1, fb: '"Brothers go" — plural → verbo base sin -s.' },
      { s: 'She ___ speak Arabic. (negativo)', opts: ["don't", "doesn't", "isn't"], a: 1, fb: '"She doesn\'t speak" — con she → doesn\'t + verbo base.' },
      { s: 'It ___ snow in Cartagena. (negativo)', opts: ["don't", "doesn't", "isn't"], a: 1, fb: '"It doesn\'t snow" — con it → doesn\'t.' },
      { s: 'We ___ English on Mondays.', opts: ['studies', 'study', 'studys'], a: 1, fb: 'Con we → verbo base "study".' },
      { s: 'He ___ TV every evening.', opts: ['watch', 'watchs', 'watches'], a: 2, fb: 'Termina en -ch → +es: "watches".' },
      { s: 'My sister ___ medicine.', opts: ['studys', 'studies', 'study'], a: 1, fb: 'Consonante + y → ies: "studies".' },
      { s: 'Water ___ at 100 °C.', opts: ['boil', 'boils', 'is boiling'], a: 1, fb: 'Verdad general, 3ª persona → "boils".' },
      { s: 'Look! She ___ now. (acción ahora)', opts: ['runs', 'is running', 'run'], a: 1, fb: '"now" → present continuous: "is running", no present simple.' },
      { s: '¿Cuál oración es CORRECTA?', opts: ['She no eat meat.', "She doesn't eat meat.", "She don't eats meat."], a: 1, fb: 'Negación → "doesn\'t" + verbo base.' },
      { s: '¿Cómo se dice "Él no habla inglés"?', opts: ['He no speak English.', "He doesn't speak English.", "He doesn't speaks English."], a: 1, fb: '"He doesn\'t speak English" (verbo en forma base).' },
    ],
  },
  {
    slug: 'present-simple-preguntas',
    order: 10,
    title: 'Preguntas en present simple (do / does)',
    shortTitle: 'Preguntas (do/does)',
    icon: '❓',
    seoTitle: 'Preguntas en present simple en inglés (do/does): explicación y ejercicios | A1',
    seoDescription:
      'Cómo hacer preguntas en presente simple con do y does, y las respuestas cortas (Yes, I do / No, she doesn\'t). Explicación, tabla, ejemplos y ejercicios. Nivel A1.',
    keywords: ['preguntas en inglés do does', 'do does diferencia', 'present simple preguntas', 'respuestas cortas inglés a1'],
    intro: [
      'Para preguntar en presente simple usamos el auxiliar "do" (con I, you, we, they) o "does" (con he, she, it) al principio, seguido del sujeto y el verbo en forma base.',
      'Cuando usamos "does", el verbo NO lleva -s (la -s la "absorbe" el does): Does she work? — no "Does she works?". Las respuestas cortas usan el auxiliar: Yes, I do / No, she doesn\'t.',
    ],
    table: {
      caption: 'Preguntas y respuestas cortas',
      headers: ['Auxiliar', 'Pregunta', 'Respuesta corta'],
      rows: [
        ['do', 'Do you like coffee?', 'Yes, I do / No, I don\'t'],
        ['does', 'Does he live here?', 'Yes, he does / No, he doesn\'t'],
      ],
    },
    examples: [
      { en: 'Do you speak English?', es: '¿Hablas inglés?' },
      { en: 'Does she work on Sundays?', es: '¿Ella trabaja los domingos?' },
      { en: 'Where do they live?', es: '¿Dónde viven ellos?' },
      { en: 'Yes, I do. / No, he doesn\'t.', es: 'Sí. / No.' },
    ],
    commonMistakes: [
      { wrong: 'Does she works here?', right: 'Does she work here?', note: 'Con does el verbo va sin -s.' },
      { wrong: 'You like coffee? (sin auxiliar)', right: 'Do you like coffee?', note: 'Las preguntas necesitan do/does.' },
      { wrong: 'Do he live here?', right: 'Does he live here?', note: 'Con he/she/it → does.' },
    ],
    tip: 'En la pregunta, la -s de tercera persona se la lleva el "does": Does she work? (work sin s).',
    questions: [
      { s: '___ you like pizza?', opts: ['Do', 'Does', 'Are'], a: 0, fb: 'Con you → "Do".' },
      { s: '___ she live in Bogotá?', opts: ['Do', 'Does', 'Is'], a: 1, fb: 'Con she → "Does".' },
      { s: 'Does he ___ to school by bus?', opts: ['go', 'goes', 'going'], a: 0, fb: 'Con "does", el verbo va sin -s → "go".' },
      { s: '___ they speak Spanish?', opts: ['Do', 'Does', 'Are'], a: 0, fb: 'Con they → "Do".' },
      { s: 'Where ___ your parents work?', opts: ['do', 'does', 'is'], a: 0, fb: 'Con your parents (plural) → "do".' },
      { s: 'Does it ___ in winter here?', opts: ['rains', 'rain', 'raining'], a: 1, fb: 'Con "does", forma base → "rain".' },
      { s: '"Do you study English?" — "Yes, I ___."', opts: ['do', 'does', 'am'], a: 0, fb: 'Respuesta corta con I → "Yes, I do".' },
      { s: '"Does she cook?" — "No, she ___."', opts: ["don't", "doesn't", "isn't"], a: 1, fb: 'Respuesta corta con she → "No, she doesn\'t".' },
    ],
  },
  {
    slug: 'adverbios-de-frecuencia',
    order: 11,
    title: 'Adverbios de frecuencia en inglés (always, usually, never)',
    shortTitle: 'Adverbios de frecuencia',
    icon: '🔁',
    seoTitle: 'Adverbios de frecuencia en inglés (always, usually, never): explicación y ejercicios | A1',
    seoDescription:
      'Adverbios de frecuencia en inglés: always, usually, often, sometimes, never. Qué significan, dónde se colocan en la oración, ejemplos y ejercicios. Nivel A1.',
    keywords: ['adverbios de frecuencia inglés', 'always usually never', 'posición adverbios frecuencia', 'frecuencia inglés a1'],
    intro: [
      'Los adverbios de frecuencia dicen CADA CUÁNTO pasa algo: de always (siempre, 100%) a never (nunca, 0%). Son clave para hablar de rutinas.',
      'La posición es muy importante: van ANTES del verbo principal (I always read) pero DESPUÉS del verbo "to be" (She is always late).',
    ],
    table: {
      caption: 'Escala de frecuencia',
      headers: ['Adverbio', 'Significado', 'Frecuencia'],
      rows: [
        ['always', 'siempre', '100%'],
        ['usually', 'normalmente', '~90%'],
        ['often', 'a menudo', '~70%'],
        ['sometimes', 'a veces', '~50%'],
        ['rarely', 'rara vez', '~10%'],
        ['never', 'nunca', '0%'],
      ],
    },
    examples: [
      { en: 'I always brush my teeth.', es: 'Siempre me cepillo los dientes.' },
      { en: 'She usually arrives early.', es: 'Ella normalmente llega temprano.' },
      { en: 'We sometimes eat out.', es: 'A veces comemos fuera.' },
      { en: 'He is never late.', es: 'Él nunca llega tarde. (después de "is")' },
    ],
    commonMistakes: [
      { wrong: 'I brush always my teeth.', right: 'I always brush my teeth.', note: 'El adverbio va antes del verbo principal.' },
      { wrong: 'She always is happy.', right: 'She is always happy.', note: 'Con "to be" el adverbio va después.' },
      { wrong: "I don't never smoke.", right: 'I never smoke.', note: '"never" ya es negativo; no se usa con don\'t.' },
    ],
    tip: 'Posición: ANTES del verbo normal (I never eat) pero DESPUÉS de to be (I am never sad).',
    questions: [
      { s: 'I ___ drink coffee in the morning. (100%)', opts: ['always', 'never', 'rarely'], a: 0, fb: '100% → "always".' },
      { s: 'She is ___ tired after work.', opts: ['often tired', 'tired often', 'often'], a: 0, fb: 'Con "is", el adverbio va después: "is often".' },
      { s: 'They ___ go to the gym. (a veces)', opts: ['sometimes', 'always', 'never'], a: 0, fb: 'A veces → "sometimes".' },
      { s: 'He ___ eats meat. He is vegetarian. (0%)', opts: ['always', 'usually', 'never'], a: 2, fb: 'Vegetariano → "never" (0%).' },
      { s: 'We ___ watch TV at night.', opts: ['watch usually', 'usually watch', 'usually'], a: 1, fb: 'Antes del verbo: "usually watch".' },
      { s: 'I am ___ late for class.', opts: ['never', 'go never', 'never go'], a: 0, fb: 'Después de "am": "am never".' },
      { s: 'My dad ___ cooks on Sundays. (~70%)', opts: ['never', 'often', 'rarely'], a: 1, fb: '~70% → "often".' },
      { s: 'Where do you ___ go on holiday?', opts: ['usually', 'are', 'usual'], a: 0, fb: '"usually" — adverbio de frecuencia.' },
    ],
  },
  {
    slug: 'present-continuous',
    order: 12,
    title: 'Present continuous en inglés (am/is/are + -ing)',
    shortTitle: 'Present continuous',
    icon: '🏃',
    seoTitle: 'Present continuous en inglés (-ing): explicación y ejercicios | A1',
    seoDescription:
      'El presente continuo en inglés: am/is/are + verbo-ing para acciones que ocurren ahora. Diferencia con el present simple, ejemplos y ejercicios. Nivel A1.',
    keywords: ['present continuous', 'presente continuo inglés', 'am is are ing', 'present continuous vs simple', 'gerundio inglés a1'],
    intro: [
      'El present continuous describe lo que está pasando AHORA, en este momento (I am reading). Se forma con el verbo "to be" (am/is/are) + el verbo principal con -ing.',
      'La diferencia con el present simple: el simple es para rutinas (I work every day) y el continuous para lo que ocurre justo ahora (I am working now). Palabras clave: now, right now, at the moment.',
    ],
    table: {
      caption: 'to be + verbo-ing',
      headers: ['Sujeto', 'to be', 'Ejemplo'],
      rows: [
        ['I', 'am', 'I am eating'],
        ['he / she / it', 'is', 'she is eating'],
        ['you / we / they', 'are', 'they are eating'],
      ],
    },
    examples: [
      { en: 'I am studying right now.', es: 'Estoy estudiando ahora mismo.' },
      { en: 'She is cooking dinner.', es: 'Ella está cocinando la cena.' },
      { en: "They aren't sleeping.", es: 'Ellos no están durmiendo.' },
      { en: 'What are you doing?', es: '¿Qué estás haciendo?' },
    ],
    commonMistakes: [
      { wrong: 'I reading a book.', right: 'I am reading a book.', note: 'No olvides el verbo to be (am/is/are).' },
      { wrong: 'She is read.', right: 'She is reading.', note: 'El verbo principal lleva -ing.' },
      { wrong: 'They is working.', right: 'They are working.', note: 'Con they → are.' },
    ],
    tip: 'Fórmula: to be (am/is/are) + verbo-ing. Úsalo para "ahora": I am writing now. Para rutinas usa el present simple.',
    questions: [
      { s: 'I ___ watching TV right now.', opts: ['am', 'is', 'are'], a: 0, fb: 'Con I → "am".' },
      { s: 'She is ___ a letter.', opts: ['write', 'writing', 'writes'], a: 1, fb: 'Verbo principal con -ing → "writing".' },
      { s: 'They ___ playing football.', opts: ['am', 'is', 'are'], a: 2, fb: 'Con they → "are".' },
      { s: 'Look! It ___ raining.', opts: ['am', 'is', 'are'], a: 1, fb: 'Con it → "is".' },
      { s: 'We are ___ dinner now.', opts: ['have', 'having', 'has'], a: 1, fb: '"having" — verbo con -ing.' },
      { s: 'What ___ you doing?', opts: ['am', 'is', 'are'], a: 2, fb: 'Con you → "are".' },
      { s: 'He ___ not listening to me.', opts: ['am', 'is', 'are'], a: 1, fb: 'Con he → "is" (is not = isn\'t).' },
      { s: 'I usually walk, but today I ___ taking the bus.', opts: ['am', 'is', 'do'], a: 0, fb: '"today / now" → continuous: "I am taking".' },
    ],
  },
  {
    slug: 'can-cant',
    order: 13,
    title: 'Can y can\'t en inglés (poder / saber hacer)',
    shortTitle: "Can / can't",
    icon: '💪',
    seoTitle: "Can y can't en inglés: explicación, habilidad y permiso + ejercicios | A1",
    seoDescription:
      'El verbo modal can en inglés: habilidad (I can swim), permiso y peticiones. Forma negativa can\'t, preguntas y respuestas cortas. Ejemplos y ejercicios. Nivel A1.',
    keywords: ['can en inglés', "can can't", 'verbo modal can', 'can para habilidad y permiso', 'can a1'],
    intro: [
      '"Can" es un verbo modal que expresa habilidad ("saber/poder hacer algo": I can swim), permiso (You can go) y peticiones (Can you help me?).',
      'Es muy fácil de usar: NO cambia con he/she/it (siempre "can", sin -s) y va seguido del verbo en forma base, sin "to". El negativo es "cannot" / "can\'t".',
    ],
    table: {
      caption: 'can / can\'t',
      headers: ['Forma', 'Estructura', 'Ejemplo'],
      rows: [
        ['Afirmativa', 'sujeto + can + verbo', 'I can drive'],
        ['Negativa', "sujeto + can't + verbo", "she can't drive"],
        ['Pregunta', 'Can + sujeto + verbo?', 'Can you drive?'],
        ['Respuesta corta', 'Yes, I can / No, I can\'t', '—'],
      ],
    },
    examples: [
      { en: 'I can speak two languages.', es: 'Sé hablar dos idiomas.' },
      { en: "He can't come tonight.", es: 'Él no puede venir esta noche.' },
      { en: 'Can you help me, please?', es: '¿Puedes ayudarme, por favor?' },
      { en: 'She can swim very well.', es: 'Ella sabe nadar muy bien.' },
    ],
    commonMistakes: [
      { wrong: 'She cans swim.', right: 'She can swim.', note: '"can" nunca lleva -s.' },
      { wrong: 'I can to drive.', right: 'I can drive.', note: 'Después de can, el verbo va sin "to".' },
      { wrong: 'He can speaks English.', right: 'He can speak English.', note: 'El verbo después de can va en forma base.' },
    ],
    tip: '"Can" es invariable: nunca lleva -s y nunca usa "to". She can swim (no "cans", no "can to swim").',
    questions: [
      { s: 'I ___ swim very well.', opts: ['can', 'cans', 'can to'], a: 0, fb: '"can" + verbo base.' },
      { s: 'She ___ play the guitar. (negativo)', opts: ["can't", "cann't", "doesn't can"], a: 0, fb: 'Negativo → "can\'t".' },
      { s: 'He can ___ three languages.', opts: ['speaks', 'speak', 'to speak'], a: 1, fb: 'Después de can → forma base "speak".' },
      { s: '___ you help me?', opts: ['Can', 'Do', 'Are'], a: 0, fb: 'Petición → "Can you...?".' },
      { s: 'Birds ___ fly.', opts: ['can', 'cans', 'can to'], a: 0, fb: '"can" es igual para todos.' },
      { s: '"Can you cook?" — "Yes, I ___."', opts: ['can', 'do', 'am'], a: 0, fb: 'Respuesta corta → "Yes, I can".' },
      { s: 'We ___ go to the party. We are busy. (negativo)', opts: ["can't", 'can', "don't can"], a: 0, fb: 'No podemos → "can\'t".' },
      { s: 'My sister ___ drive a car.', opts: ['can', 'cans', 'is can'], a: 0, fb: 'Con she → igual "can".' },
    ],
  },
  {
    slug: 'preposiciones-de-lugar',
    order: 14,
    title: 'Preposiciones de lugar en inglés (in, on, under, next to)',
    shortTitle: 'Preposiciones de lugar',
    icon: '🧭',
    seoTitle: 'Preposiciones de lugar en inglés (in, on, under, next to): explicación y ejercicios | A1',
    seoDescription:
      'Preposiciones de lugar en inglés: in, on, under, behind, in front of, next to, between. Qué significa cada una con ejemplos y ejercicios. Nivel A1.',
    keywords: ['preposiciones de lugar inglés', 'in on under', 'in on at lugar', 'preposiciones inglés a1', 'next to behind'],
    intro: [
      'Las preposiciones de lugar dicen DÓNDE está algo. Las tres básicas son in (dentro de), on (sobre una superficie) y under (debajo de).',
      'Otras muy útiles en A1: next to (al lado de), behind (detrás de), in front of (delante de), between (entre dos cosas). Se colocan antes del lugar: The cat is under the table.',
    ],
    table: {
      caption: 'Preposiciones de lugar más comunes',
      headers: ['Preposición', 'Significado', 'Ejemplo'],
      rows: [
        ['in', 'dentro de', 'in the box'],
        ['on', 'sobre (superficie)', 'on the table'],
        ['under', 'debajo de', 'under the bed'],
        ['next to', 'al lado de', 'next to the door'],
        ['behind', 'detrás de', 'behind the sofa'],
        ['in front of', 'delante de', 'in front of the house'],
        ['between', 'entre (dos)', 'between the chairs'],
      ],
    },
    examples: [
      { en: 'The keys are on the table.', es: 'Las llaves están sobre la mesa.' },
      { en: 'The cat is under the chair.', es: 'El gato está debajo de la silla.' },
      { en: 'The bank is next to the school.', es: 'El banco está al lado de la escuela.' },
      { en: 'My bag is in the car.', es: 'Mi bolsa está dentro del carro.' },
    ],
    commonMistakes: [
      { wrong: 'The book is in the table.', right: 'The book is on the table.', note: 'Sobre una superficie → on, no in.' },
      { wrong: 'She is on the kitchen.', right: 'She is in the kitchen.', note: 'Dentro de un espacio → in.' },
      { wrong: 'The dog is next the door.', right: 'The dog is next to the door.', note: 'Es "next TO".' },
    ],
    tip: 'in = dentro (in the room), on = sobre una superficie (on the wall), under = debajo. "Next to" siempre con "to".',
    questions: [
      { s: 'The pen is ___ the table.', opts: ['on', 'in', 'under'], a: 0, fb: 'Sobre la superficie → "on".' },
      { s: 'The milk is ___ the fridge.', opts: ['on', 'in', 'next'], a: 1, fb: 'Dentro → "in".' },
      { s: 'The ball is ___ the bed. (debajo)', opts: ['on', 'in', 'under'], a: 2, fb: 'Debajo → "under".' },
      { s: 'The car is ___ to the house. (al lado)', opts: ['next', 'in', 'on'], a: 0, fb: '"next to" = al lado de.' },
      { s: 'The dog is ___ the sofa. (detrás)', opts: ['behind', 'on', 'in'], a: 0, fb: 'Detrás → "behind".' },
      { s: 'The bank is ___ of the park. (delante)', opts: ['behind', 'in front', 'under'], a: 1, fb: 'Delante → "in front of".' },
      { s: 'The cat sits ___ the two boxes. (entre)', opts: ['between', 'on', 'in'], a: 0, fb: 'Entre dos → "between".' },
      { s: 'My phone is ___ my pocket.', opts: ['on', 'in', 'under'], a: 1, fb: 'Dentro del bolsillo → "in".' },
    ],
  },
  {
    slug: 'preposiciones-de-tiempo',
    order: 15,
    title: 'Preposiciones de tiempo en inglés (in, on, at)',
    shortTitle: 'Preposiciones de tiempo',
    icon: '🕐',
    seoTitle: 'Preposiciones de tiempo en inglés (in, on, at): explicación y ejercicios | A1',
    seoDescription:
      'Cuándo usar in, on y at con el tiempo en inglés: horas, días, meses, años y partes del día. Reglas claras, tabla, ejemplos y ejercicios. Nivel A1.',
    keywords: ['in on at tiempo', 'preposiciones de tiempo inglés', 'cuándo usar in on at', 'at on in horas días a1'],
    intro: [
      'In, on y at también se usan con el tiempo, y cada una tiene su regla. Es uno de los temas que más confunde, pero con tres reglas claras se domina.',
      'Usa "at" con horas y momentos puntuales (at 7 o\'clock, at night). Usa "on" con días y fechas (on Monday, on May 5th). Usa "in" con periodos largos: meses, años, estaciones y partes del día (in July, in 2024, in the morning).',
    ],
    table: {
      caption: 'in / on / at con el tiempo',
      headers: ['Preposición', 'Se usa con', 'Ejemplos'],
      rows: [
        ['at', 'horas, momentos puntuales', "at 8:00, at noon, at night"],
        ['on', 'días y fechas', 'on Monday, on my birthday'],
        ['in', 'meses, años, estaciones, partes del día', 'in May, in 2025, in the morning'],
      ],
    },
    examples: [
      { en: 'The class starts at 9 o\'clock.', es: 'La clase empieza a las 9 en punto.' },
      { en: 'I was born on April 12th.', es: 'Nací el 12 de abril.' },
      { en: 'We travel in December.', es: 'Viajamos en diciembre.' },
      { en: 'She studies in the afternoon.', es: 'Ella estudia por la tarde.' },
    ],
    commonMistakes: [
      { wrong: 'I get up in 6 o\'clock.', right: "I get up at 6 o'clock.", note: 'Con horas → at.' },
      { wrong: 'My birthday is in Monday.', right: 'My birthday is on Monday.', note: 'Con días → on.' },
      { wrong: 'See you on the morning.', right: 'See you in the morning.', note: 'Partes del día → in (excepto "at night").' },
    ],
    tip: 'at = horas (at 5), on = días (on Friday), in = lo grande (in June, in 2025). Excepción famosa: "at night".',
    questions: [
      { s: 'The meeting is ___ 3 PM.', opts: ['at', 'on', 'in'], a: 0, fb: 'Hora → "at".' },
      { s: 'I have class ___ Monday.', opts: ['at', 'on', 'in'], a: 1, fb: 'Día → "on".' },
      { s: 'My birthday is ___ July.', opts: ['at', 'on', 'in'], a: 2, fb: 'Mes → "in".' },
      { s: 'We wake up early ___ the morning.', opts: ['at', 'on', 'in'], a: 2, fb: 'Parte del día → "in the morning".' },
      { s: 'The stars shine ___ night.', opts: ['at', 'on', 'in'], a: 0, fb: 'Excepción: "at night".' },
      { s: 'She was born ___ 2010.', opts: ['at', 'on', 'in'], a: 2, fb: 'Año → "in".' },
      { s: 'The shop closes ___ midnight.', opts: ['at', 'on', 'in'], a: 0, fb: 'Momento puntual → "at midnight".' },
      { s: 'I visit my family ___ Christmas Day.', opts: ['at', 'on', 'in'], a: 1, fb: 'Día específico → "on Christmas Day".' },
    ],
  },
];

export function getTopic(slug: string): GrammarTopic | undefined {
  return TOPICS.find(t => t.slug === slug);
}

export function getTopicNav(slug: string): { prev: GrammarTopic | null; next: GrammarTopic | null } {
  const i = TOPICS.findIndex(t => t.slug === slug);
  return {
    prev: i > 0 ? TOPICS[i - 1] : null,
    next: i >= 0 && i < TOPICS.length - 1 ? TOPICS[i + 1] : null,
  };
}
