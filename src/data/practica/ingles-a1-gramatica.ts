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
      'Los pronombres personales sujeto (I, you, he, she, it, we, they) reemplazan al nombre de quien hace la acción. Son la columna vertebral de cualquier frase, porque en inglés el sujeto es OBLIGATORIO: donde el español dice "trabajo aquí" sin pronombre, el inglés exige "I work here".',
      'La diferencia que más cuesta al hispanohablante está en la tercera persona del singular, que tiene tres pronombres según la naturaleza del sujeto: "he" para personas masculinas, "she" para personas femeninas e "it" para cosas, animales y el clima. El español no tiene un "it" neutro, así que hay que entrenar el reflejo de no decir "he/she" para objetos.',
      'A favor del estudiante: "you" es invariable. Una sola palabra sirve para tú, usted, vosotros y ustedes —singular y plural, formal e informal—, así que tienes un problema menos que en español.',
    ],
    sections: [
      {
        heading: 'El sujeto NO se omite (ni cuando no hay sujeto real)',
        body: [
          'Toda oración inglesa necesita un sujeto expreso. Por eso, aunque no haya un "actor" real, el inglés usa un sujeto de relleno: "it" para el clima, la hora y la distancia (It is raining, It is 7 o\'clock, It is far), y "there" para la existencia (There is a problem).',
          'Este es uno de los errores más marcados del hispanohablante: omitir el sujeto ("Is raining", "Is cold") porque en español sí se puede. En inglés nunca.',
        ],
      },
      {
        heading: 'he, she, it: el reto del "it"',
        body: [
          '"he" y "she" se reservan para personas (y a veces mascotas, cuando sabemos el sexo). Para cosas, animales en general y el clima se usa siempre "it": "Where is my phone? It is on the table." No te dejes arrastrar por el género gramatical español: "la mesa" no es "she", es "it".',
        ],
      },
      {
        heading: 'you sirve para todo',
        body: [
          '"you" no distingue número ni formalidad: es tú, usted, vosotros y ustedes a la vez. Si necesitas dejar claro que hablas a varias personas, de forma coloquial se dice "you guys" o "you all", pero el pronombre sigue siendo "you".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Los siete pronombres sujeto',
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
      {
        caption: 'Sujetos "de relleno" (obligatorios en inglés)',
        headers: ['Situación', 'Sujeto', 'Ejemplo'],
        rows: [
          ['Clima', 'it', 'It is raining.'],
          ['Hora', 'it', "It is 8 o'clock."],
          ['Distancia', 'it', 'It is far.'],
          ['Existencia (hay)', 'there', 'There is a problem.'],
        ],
      },
    ],
    examples: [
      { en: 'Maria is from Spain. She is from Spain.', es: 'María es de España. Ella es de España.' },
      { en: 'The book is new. It is new.', es: 'El libro es nuevo. Es nuevo.', note: 'Una cosa → "it", no he/she.' },
      { en: 'Tom and I are friends. We are friends.', es: 'Tom y yo somos amigos. Somos amigos.' },
      { en: 'My parents work a lot. They work a lot.', es: 'Mis padres trabajan mucho. Trabajan mucho.' },
      { en: 'It is cold and dark outside.', es: 'Afuera hace frío y está oscuro.', note: 'El clima va con "it".' },
      { en: "It's 8 o'clock.", es: 'Son las 8.', note: 'La hora va con "it", no con "they".' },
      { en: 'You are always welcome here.', es: 'Siempre eres / son bienvenido(s) aquí.', note: '"you" = tú, usted y ustedes.' },
    ],
    contrast: [
      { es: 'Trabajo aquí.', en: 'I work here.', note: 'El sujeto no se puede omitir; "I" es obligatorio.' },
      { es: 'Está lloviendo.', en: 'It is raining.', note: 'El clima exige el sujeto "it".' },
      { es: 'Son las cinco.', en: 'It is five o\'clock.', note: 'La hora usa "it", en singular.' },
      { es: 'El libro es nuevo.', en: 'It is new.', note: 'Las cosas son "it", sin importar el género del español.' },
      { es: 'Tom y yo somos amigos.', en: 'Tom and I are friends.', note: 'Como sujeto se usa "I", nunca "me".' },
    ],
    commonMistakes: [
      { wrong: 'Is raining.', right: 'It is raining.', note: 'El sujeto es obligatorio: el clima lleva "it".' },
      { wrong: 'The dog? He is big. (cosa neutra)', right: 'It is big.', note: 'Animales/objetos en general → "it".' },
      { wrong: 'Me and Tom are friends.', right: 'Tom and I are friends.', note: 'Como sujeto se usa "I", no "me".' },
      { wrong: 'My mother, she is a doctor.', right: 'My mother is a doctor.', note: 'No repitas sujeto + pronombre. Elige uno.' },
      { wrong: 'The table is old, she is...', right: 'The table is old, it is...', note: 'Las cosas son "it" aunque en español sean femeninas.' },
    ],
    tip: 'Regla de hierro: toda oración inglesa necesita sujeto. Para cosas, animales y el clima, ese sujeto es "it". Y "you" es una sola palabra para tú, usted y ustedes.',
    questions: [
      { s: 'Maria is from Spain. ___ is from Spain.', opts: ['He', 'She', 'It', 'They'], a: 1, fb: '"She" — Maria es mujer.' },
      { s: 'Tom and I are friends. ___ are friends.', opts: ['We', 'They', 'You', 'It'], a: 0, fb: '"We" — cuando yo estoy incluido en el grupo.' },
      { s: 'The book is on the table. ___ is on the table.', opts: ['He', 'She', 'It', 'They'], a: 2, fb: '"It" — para cosas y objetos usamos "it".' },
      { s: 'My parents work hard. ___ work hard.', opts: ['We', 'They', 'You', 'It'], a: 1, fb: '"They" — para grupos de personas (sin yo).' },
      { s: 'John lives in London. ___ lives in London.', opts: ['He', 'She', 'It', 'They'], a: 0, fb: '"He" — John es un hombre.' },
      { s: '___ is raining. (clima)', opts: ['He', 'She', 'It', 'They'], a: 2, fb: '"It is raining" — el clima siempre lleva "it".' },
      { s: 'The car is fast. ___ is fast.', opts: ['He', 'She', 'It', 'They'], a: 2, fb: '"It" — para objetos como el carro.' },
      { s: 'My sister and I love music. ___ love music.', opts: ['We', 'They', 'You', 'It'], a: 0, fb: '"We" — yo + mi hermana = nosotros.' },
      { s: "___ is 9 o'clock. (hora)", opts: ['He', 'It', 'They'], a: 1, fb: 'La hora va con "it".' },
      { s: 'Where is my phone? ___ is on the table.', opts: ['He', 'She', 'It'], a: 2, fb: 'Una cosa → "it".' },
      { s: '___ are my best friend.', opts: ['You', 'It', 'He'], a: 0, fb: '"You" = tú / usted.' },
      { s: '___ is raining a lot today. (clima)', opts: ['He', 'It', 'They'], a: 1, fb: 'El clima va con "it".' },
      { s: '¿Cuál oración es CORRECTA?', opts: ['Work here every day.', 'I work here every day.', 'Working here every day.'], a: 1, fb: 'El sujeto "I" es obligatorio en inglés.' },
      { s: '¿Cómo se dice "Tom y yo somos amigos"?', opts: ['Me and Tom are friends.', 'Tom and I are friends.', 'Tom and me is friends.'], a: 1, fb: 'Como sujeto → "I": "Tom and I are friends".' },
      { s: 'My mother ___ a teacher. (sin repetir el sujeto)', opts: ['she is', 'is', 'it is'], a: 1, fb: 'No repitas sujeto + pronombre: "My mother is a teacher".' },
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
      'Los adjetivos posesivos (my, your, his, her, its, our, their) dicen de quién es algo y van SIEMPRE delante del sustantivo: my house, your name, her car. Nunca cambian por número ni género del objeto: se dice "my book" y "my books" igual.',
      'La trampa estrella para el hispanohablante: "his" y "her" dependen del DUEÑO, no del objeto. "His car" es el carro de un hombre; "her car", el de una mujer. Como el español "su" no marca el género del poseedor, el cerebro no tiene ese reflejo y hay que construirlo a propósito.',
      'Dos confusiones más que vamos a separar: "its" (posesivo, sin apóstrofo) frente a "it\'s" (= it is); y el adjetivo posesivo (my, va pegado a un sustantivo) frente al pronombre posesivo (mine, va solo). Aquí trabajamos los adjetivos.',
    ],
    sections: [
      {
        heading: 'his o her: mira al DUEÑO, no al objeto',
        body: [
          'La regla de oro: el posesivo concuerda con quien posee. "Anna loves her brother" (Anna es mujer → her); "Peter loves his sister" (Peter es hombre → his). Fíjate en que el objeto poseído (brother, sister) no influye para nada.',
          'Por eso "his sister" y "her brother" son perfectamente normales: el género del posesivo es el del dueño, aunque el sustantivo sea del otro sexo.',
        ],
      },
      {
        heading: "its no es lo mismo que it's",
        body: [
          '"its" es el posesivo de "it" (la cosa/el animal y su... ): "The dog loves its bed." NO lleva apóstrofo. "it\'s", con apóstrofo, es la contracción de "it is" (o "it has"): "It\'s cold."',
          'Truco infalible: si puedes sustituir por "it is", entonces es "it\'s" con apóstrofo. Si indica posesión, es "its" sin apóstrofo.',
        ],
      },
      {
        heading: "Otra forma de posesión: el genitivo 's",
        body: [
          'Para personas, además del posesivo existe el genitivo con \'s: "Peter\'s car" = el carro de Peter. "His car" y "Peter\'s car" expresan lo mismo según uses el pronombre o el nombre. Ojo: el orden es poseedor + \'s + objeto (al revés del español "el carro DE Peter").',
        ],
      },
    ],
    table: null,
    tables: [
      {
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
      {
        caption: 'El posesivo depende del dueño',
        headers: ['Dueño', 'Posesivo', 'Ejemplo'],
        rows: [
          ['un hombre', 'his', 'his sister, his car'],
          ['una mujer', 'her', 'her brother, her car'],
          ['una cosa / animal', 'its', 'its tail, its color'],
        ],
      },
    ],
    examples: [
      { en: 'My name is Ana.', es: 'Mi nombre es Ana.' },
      { en: 'Peter loves his sister and Anna loves her brother.', es: 'Peter quiere a su hermana y Anna a su hermano.', note: 'El posesivo marca el género del DUEÑO, no del objeto.' },
      { en: 'Our house is small.', es: 'Nuestra casa es pequeña.' },
      { en: 'The dog loves its bed.', es: 'Al perro le encanta su cama.', note: '"its" sin apóstrofo (posesión).' },
      { en: 'They visit their grandparents on Sunday.', es: 'Visitan a sus abuelos el domingo.' },
      { en: "This is Peter's car.", es: 'Este es el carro de Peter.', note: "Genitivo: poseedor + 's." },
      { en: 'Is this your phone?', es: '¿Es este tu teléfono?' },
    ],
    contrast: [
      { es: 'Su carro (de él).', en: 'His car.', note: 'El posesivo marca el género del dueño.' },
      { es: 'Su carro (de ella).', en: 'Her car.', note: 'Misma cosa, distinto dueño → distinto posesivo.' },
      { es: 'Su color (de la cosa).', en: 'Its color.', note: 'Posesivo de "it", sin apóstrofo.' },
      { es: 'El carro de Pedro.', en: "Peter's car.", note: "Genitivo 's: el orden se invierte respecto al español." },
      { es: 'Mis libros.', en: 'My books.', note: 'El posesivo no cambia con el plural.' },
    ],
    commonMistakes: [
      { wrong: 'Anna loves his brother. (Anna = mujer)', right: 'Anna loves her brother.', note: 'El dueño (Anna) es mujer → "her".' },
      { wrong: "It's color is red.", right: 'Its color is red.', note: '"its" posesivo no lleva apóstrofo. "it\'s" = it is.' },
      { wrong: 'The car of Peter.', right: "Peter's car.", note: 'Para personas se usa el genitivo \'s, no "of".' },
      { wrong: 'My brothers car. (singular poseído)', right: "My brother's car.", note: 'El genitivo necesita apóstrofo: brother\'s.' },
      { wrong: 'Their is happy.', right: 'They are happy.', note: 'No confundas "their" (posesivo) con "they\'re" (they are).' },
    ],
    tip: '"His" o "her" dependen de quién POSEE, no del objeto: el carro de Pedro es "his car". Y recuerda: "its" sin apóstrofo es posesión; "it\'s" con apóstrofo es "it is".',
    questions: [
      { s: 'This is ___ name. (de mí)', opts: ['my', 'your', 'his', 'her'], a: 0, fb: '"my" = mi (de mí).' },
      { s: 'Peter loves ___ dog. (el perro de Peter)', opts: ['her', 'his', 'its', 'your'], a: 1, fb: 'Peter es hombre → "his".' },
      { s: 'Anna calls ___ mother every day.', opts: ['his', 'her', 'its', 'our'], a: 1, fb: 'Anna es mujer → "her".' },
      { s: 'We clean ___ house on Saturdays.', opts: ['our', 'their', 'your', 'my'], a: 0, fb: '"we" → "our" (nuestra).' },
      { s: 'The cat is in ___ basket.', opts: ["it's", 'its', 'his', 'her'], a: 1, fb: '"its" posesivo, sin apóstrofo.' },
      { s: 'What is ___ phone number? (de ti)', opts: ['my', 'your', 'his', 'their'], a: 1, fb: '"your" = tu/su (de ti).' },
      { s: 'They sell ___ old furniture.', opts: ['our', 'your', 'their', 'his'], a: 2, fb: '"they" → "their".' },
      { s: 'My sister and I love ___ grandparents.', opts: ['my', 'our', 'their', 'her'], a: 1, fb: 'Mi hermana y yo = we → "our".' },
      { s: 'Anna calls ___ brother every day. (Anna = mujer)', opts: ['his', 'her', 'its', 'their'], a: 1, fb: 'El dueño (Anna) es mujer → "her".' },
      { s: 'Peter cleans ___ car on Sundays. (Peter = hombre)', opts: ['her', 'his', 'its', 'our'], a: 1, fb: 'El dueño (Peter) es hombre → "his".' },
      { s: 'The cat is sleeping in ___ basket.', opts: ["it's", 'its', 'his'], a: 1, fb: '"its" posesivo, sin apóstrofo.' },
      { s: 'We love ___ new house.', opts: ['our', 'their', 'your'], a: 0, fb: 'we → "our".' },
      { s: '¿Cuál oración es CORRECTA?', opts: ['Its a nice day.', "It's a nice day.", 'Its nice day today.'], a: 1, fb: '"It\'s" = it is (lleva apóstrofo).' },
      { s: '¿Cómo se dice "el carro de Peter"?', opts: ['the car of Peter', "Peter's car", 'Peter car'], a: 1, fb: "Para personas se usa el genitivo: \"Peter's car\"." },
      { s: '¿Cómo se dice "el carro de ella"?', opts: ['his car', 'her car', 'its car'], a: 1, fb: 'Dueña mujer → "her car".' },
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
      'Los demostrativos (this, that, these, those) sirven para señalar a qué nos referimos, y lo hacen combinando DOS criterios a la vez: la distancia (cerca o lejos) y el número (uno o varios). Equivalen a este, ese, estos y esos.',
      'Distancia: "this/these" para algo CERCA (aquí); "that/those" para algo LEJOS (allí). Número: "this/that" para uno (singular); "these/those" para varios (plural). Cruzando los dos ejes salen exactamente las cuatro palabras.',
      'Truco de memoria: las formas plurales these/those llevan una "s" final, igual que el plural inglés. Además, los demostrativos tienen usos muy frecuentes que conviene conocer desde el principio: presentar a alguien ("This is my friend Ana") o identificarte al teléfono ("Hello, this is Ana").',
    ],
    sections: [
      {
        heading: 'Los dos ejes: distancia y número',
        body: [
          'Piensa en una rejilla de 2×2: this = cerca + singular; these = cerca + plural; that = lejos + singular; those = lejos + plural. El error número uno del hispanohablante es olvidar el número y decir "this shoes" (zapatos es plural → "these shoes").',
          'El número lo manda el sustantivo: si va en plural, el demostrativo también. "this book" → "these books".',
        ],
      },
      {
        heading: 'Demostrativo + sustantivo concuerdan',
        body: [
          'Cuando el demostrativo acompaña a un sustantivo, los dos deben coincidir en número: "this car / these cars", "that house / those houses". Cuando va solo (sin sustantivo), igual: "This is mine" / "These are mine".',
        ],
      },
      {
        heading: 'Usos especiales (muy frecuentes)',
        body: [
          'Para presentar a alguien se usa "this": "This is my friend Ana." Al teléfono, para decir quién habla: "Hello, this is Ana." Con expresiones de tiempo: "these days" (estos días). Y "that" sirve para retomar algo ya mencionado: "That\'s a good idea."',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Distancia × número',
        headers: ['', 'Cerca (aquí)', 'Lejos (allí)'],
        rows: [
          ['Singular (uno)', 'this (este/esta)', 'that (ese/aquel)'],
          ['Plural (varios)', 'these (estos/estas)', 'those (esos/aquellos)'],
        ],
      },
      {
        caption: 'Con sustantivo (deben concordar)',
        headers: ['Demostrativo', 'Singular', 'Plural'],
        rows: [
          ['cerca', 'this book', 'these books'],
          ['lejos', 'that car', 'those cars'],
        ],
      },
    ],
    examples: [
      { en: 'This is my phone.', es: 'Este es mi teléfono. (cerca)' },
      { en: 'That is your house over there.', es: 'Esa es tu casa allá. (lejos)' },
      { en: 'These shoes are new.', es: 'Estos zapatos son nuevos.', note: '"shoes" plural → these.' },
      { en: 'Those mountains are beautiful.', es: 'Esas montañas son hermosas. (lejos, plural)' },
      { en: 'Hello, this is Ana.', es: 'Hola, soy Ana.', note: 'Al teléfono o al presentarte → "this is".' },
      { en: "That's a great idea!", es: '¡Esa es una gran idea!', note: '"that" retoma algo ya dicho.' },
      { en: 'I am very busy these days.', es: 'Estoy muy ocupado estos días.', note: '"these days" = en esta época.' },
    ],
    contrast: [
      { es: 'Este teléfono.', en: 'this phone', note: 'Cerca + singular → this.' },
      { es: 'Esos pájaros (allá).', en: 'those birds', note: 'Lejos + plural → those.' },
      { es: 'Estos zapatos.', en: 'these shoes', note: '"shoes" es plural → these, nunca "this".' },
      { es: 'Soy Ana. (al teléfono)', en: 'This is Ana.', note: 'El inglés usa "this is", no "I am".' },
      { es: 'Eso es buena idea.', en: "That's a good idea.", note: '"that" para algo recién mencionado.' },
    ],
    commonMistakes: [
      { wrong: 'This shoes are nice.', right: 'These shoes are nice.', note: '"shoes" es plural → these/those.' },
      { wrong: 'Look at that birds.', right: 'Look at those birds.', note: 'Plural y lejos → those.' },
      { wrong: 'These is my friend.', right: 'This is my friend.', note: 'Una persona (singular, cerca) → this.' },
      { wrong: 'I am Ana. (al teléfono)', right: 'This is Ana.', note: 'Al teléfono el inglés usa "this is", no "I am".' },
      { wrong: 'These car is fast.', right: 'This car is fast.', note: '"car" es singular → this.' },
    ],
    tip: 'Regla rápida: this/these = aquí cerca; that/those = allá lejos. Y la "s" de these/those te recuerda el plural. El número lo manda el sustantivo.',
    questions: [
      { s: '___ is my pen. (cerca, singular)', opts: ['This', 'That', 'These', 'Those'], a: 0, fb: 'Cerca + singular → "this".' },
      { s: '___ shoes are dirty. (cerca, plural)', opts: ['This', 'That', 'These', 'Those'], a: 2, fb: 'Cerca + plural → "these".' },
      { s: 'Look at ___ stars in the sky. (lejos, plural)', opts: ['this', 'that', 'these', 'those'], a: 3, fb: 'Lejos + plural → "those".' },
      { s: '___ is your bag over there. (lejos, singular)', opts: ['This', 'That', 'These', 'Those'], a: 1, fb: 'Lejos + singular → "that".' },
      { s: '___ apples here are fresh.', opts: ['This', 'That', 'These', 'Those'], a: 2, fb: '"apples" plural + here → "these".' },
      { s: 'Who is ___ man next to you?', opts: ['this', 'that', 'these', 'those'], a: 0, fb: 'Singular + cerca → "this".' },
      { s: '___ houses across the river are old.', opts: ['This', 'That', 'These', 'Those'], a: 3, fb: 'Plural + lejos → "those".' },
      { s: 'I like ___ song. (la que suena ahora)', opts: ['this', 'these', 'those', 'that'], a: 0, fb: 'Algo presente/cercano, singular → "this".' },
      { s: '___ car is very fast. (cerca, singular)', opts: ['This', 'These', 'Those'], a: 0, fb: 'Cerca + singular → "this".' },
      { s: 'Hello, ___ Ana speaking. (al teléfono)', opts: ['I am', 'this is', 'these are'], a: 1, fb: 'Al teléfono → "this is".' },
      { s: '___ is a great idea! (algo recién dicho)', opts: ['These', 'That', 'Those'], a: 1, fb: '"That" retoma algo ya mencionado.' },
      { s: 'I am very busy ___ days.', opts: ['this', 'these', 'that'], a: 1, fb: '"these days" = en esta época.' },
      { s: 'Are ___ your keys? (cerca, plural)', opts: ['this', 'these', 'that'], a: 1, fb: 'Cerca + plural → "these".' },
      { s: '¿Cuál oración es CORRECTA?', opts: ['This shoes are new.', 'These shoes are new.', 'That shoes are new.'], a: 1, fb: '"shoes" es plural → "these".' },
      { s: '¿Cómo se dice "esos carros (allá)"?', opts: ['that cars', 'those cars', 'these cars'], a: 1, fb: 'Lejos + plural → "those cars".' },
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
      'La mayoría de los sustantivos forman el plural añadiendo -s: book → books. Es la regla por defecto y la que más usarás. Pero según cómo termine la palabra hay variantes de escritura, y existe un grupo de plurales irregulares que se aprenden uno a uno.',
      'Las variantes de escritura son pocas y se memorizan rápido: -es tras s, sh, ch, x, z (box → boxes); consonante + y → -ies (city → cities); vocal + y solo añade -s (boy → boys); y muchas palabras en -f/-fe cambian a -ves (knife → knives).',
      'Para el hispanohablante hay un detalle clave que casi nadie enseña: existen sustantivos INCONTABLES que no tienen plural (information, advice, furniture, money). Decir "informations" o "advices" es un error muy marcado; se dice "some information", "a piece of advice".',
    ],
    sections: [
      {
        heading: 'Las reglas de escritura',
        body: [
          'Regla general: + s (cat → cats). Tras s, sh, ch, x, z: + es (bus → buses, watch → watches); algunos en -o también (tomato → tomatoes, potato → potatoes). Consonante + y: la y cambia a -ies (baby → babies). Vocal + y: solo + s (day → days, boy → boys).',
          'Un grupo grande termina en -f o -fe y cambia a -ves: knife → knives, wife → wives, leaf → leaves, life → lives.',
        ],
      },
      {
        heading: 'Plurales irregulares (memorizar)',
        body: [
          'No siguen ninguna regla y hay que aprenderlos: man → men, woman → women, child → children, foot → feet, tooth → teeth, mouse → mice, person → people. Algunos no cambian: fish → fish, sheep → sheep.',
        ],
      },
      {
        heading: 'Incontables: no tienen plural',
        body: [
          'Palabras como information, advice, furniture, money, bread o water son incontables: no llevan -s y no admiten "a/an". No se dice "an information" ni "two informations"; se dice "some information" o "a piece of information / advice".',
          'Es uno de los errores más frecuentes del hispanohablante, porque en español sí decimos "informaciones" o "consejos".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Reglas de escritura del plural',
        headers: ['Terminación', 'Regla', 'Ejemplo'],
        rows: [
          ['general', '+ s', 'book → books'],
          ['s, sh, ch, x, z', '+ es', 'box → boxes, watch → watches'],
          ['consonante + y', 'y → ies', 'city → cities'],
          ['vocal + y', '+ s', 'boy → boys'],
          ['-f / -fe', 'f → ves', 'knife → knives, leaf → leaves'],
        ],
      },
      {
        caption: 'Irregulares más comunes',
        headers: ['Singular', 'Plural', 'Singular', 'Plural'],
        rows: [
          ['man', 'men', 'foot', 'feet'],
          ['woman', 'women', 'tooth', 'teeth'],
          ['child', 'children', 'mouse', 'mice'],
          ['person', 'people', 'fish', 'fish'],
        ],
      },
    ],
    examples: [
      { en: 'one book → two books', es: 'un libro → dos libros' },
      { en: 'one box → three boxes', es: 'una caja → tres cajas', note: 'termina en x → +es.' },
      { en: 'one city → many cities', es: 'una ciudad → muchas ciudades', note: 'consonante + y → ies.' },
      { en: 'one knife → two knives', es: 'un cuchillo → dos cuchillos', note: '-fe → -ves.' },
      { en: 'one child → five children', es: 'un niño → cinco niños', note: 'irregular.' },
      { en: 'I need some information.', es: 'Necesito (algo de) información.', note: 'incontable: sin -s, sin "an".' },
      { en: 'There are two people here.', es: 'Hay dos personas aquí.', note: 'plural de person → people.' },
    ],
    contrast: [
      { es: 'informaciones', en: 'information (incontable)', note: 'No tiene plural. Se dice "some information".' },
      { es: 'consejos', en: 'advice (incontable)', note: 'Sin -s. "A piece of advice" para uno solo.' },
      { es: 'muebles', en: 'furniture (incontable)', note: 'Sin plural; para uno: "a piece of furniture".' },
      { es: 'dos personas', en: 'two people', note: 'El plural natural de "person" es "people".' },
      { es: 'dos ciudades', en: 'two cities', note: 'consonante + y → ies.' },
    ],
    commonMistakes: [
      { wrong: 'two childs', right: 'two children', note: 'Plural irregular: child → children.' },
      { wrong: 'three citys', right: 'three cities', note: 'Consonante + y → ies.' },
      { wrong: 'two informations', right: 'some information', note: '"information" es incontable: no tiene plural.' },
      { wrong: 'two persons (cotidiano)', right: 'two people', note: 'El plural natural de "person" es "people".' },
      { wrong: 'two knifes', right: 'two knives', note: '-fe cambia a -ves: knife → knives.' },
    ],
    tip: 'Vocal + y solo añade -s (boys, days); consonante + y cambia a -ies (cities, babies). Y cuidado con los incontables: "information", "advice" y "furniture" NUNCA llevan -s.',
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
      { s: 'One knife — two ___.', opts: ['knifes', 'knives', 'knifs'], a: 1, fb: '-fe → -ves: "knives".' },
      { s: 'One woman — three ___.', opts: ['womans', 'women', 'womens'], a: 1, fb: 'Irregular: woman → women.' },
      { s: 'One mouse — two ___.', opts: ['mouses', 'mice', 'mouse'], a: 1, fb: 'Irregular: mouse → mice.' },
      { s: 'I need some ___ about the course.', opts: ['informations', 'information', 'informationes'], a: 1, fb: '"information" es incontable: no tiene plural.' },
      { s: 'She gave me good ___.', opts: ['advices', 'advice', 'advise'], a: 1, fb: '"advice" es incontable, sin -s.' },
      { s: '¿Cuál oración es CORRECTA?', opts: ['There are two persons.', 'There are two people.', 'There are two peoples.'], a: 1, fb: 'El plural de "person" es "people".' },
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
      '"There is" y "there are" expresan existencia: sirven para decir que "hay" algo en algún lugar. Es una de las estructuras más rentables del A1, porque la usas para describir tu casa, tu ciudad, una foto o cualquier escena.',
      'La elección depende de lo que viene DESPUÉS, no de un sujeto: singular o incontable → "there is"; plural → "there are". "There is a book", "There are two books", "There is some milk".',
      'La gran trampa del hispanohablante: en español "hay" es invariable y muchos lo traducen con "have" o "it has". En inglés NUNCA se usa "have" para "hay": es siempre "there is/are". (Y si necesitas el pasado, es "there was / there were".)',
    ],
    sections: [
      {
        heading: 'Lo que manda es lo que sigue',
        body: [
          'Mira el sustantivo que viene justo después: singular o incontable → "there is" (There is a problem / There is some water); plural → "there are" (There are five chairs).',
          'En una lista, concuerda con el PRIMER elemento: "There is a sofa and two chairs" (concuerda con "a sofa"); "There are two chairs and a sofa" (concuerda con "two chairs").',
        ],
      },
      {
        heading: 'Negativo, pregunta y some/any',
        body: [
          'Negativo: there isn\'t / there aren\'t, normalmente con "any": "There isn\'t any milk." Pregunta: se invierte → "Is there a bank nearby?", "Are there any seats?". Respuesta corta: "Yes, there is" / "No, there isn\'t".',
          'Regla de some/any: "some" en afirmativas (There are some apples), "any" en negativas y preguntas (There aren\'t any apples / Are there any apples?).',
        ],
      },
      {
        heading: 'Contracción y pasado',
        body: [
          'En el habla, "there is" se contrae a "there\'s" (There\'s a problem). Para el plural, al escribir se mantiene "there are".',
          'El pasado existe y funciona igual: "there was" (singular) y "there were" (plural): "There was a party" / "There were many people".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'There is / there are',
        headers: ['Forma', 'Singular / incontable', 'Plural'],
        rows: [
          ['Afirmativa', 'There is a chair', 'There are two chairs'],
          ['Negativa', "There isn't any milk", "There aren't any chairs"],
          ['Pregunta', 'Is there a chair?', 'Are there any chairs?'],
          ['Pasado', 'There was a party', 'There were many people'],
        ],
      },
      {
        caption: 'some o any',
        headers: ['Tipo de oración', 'Se usa', 'Ejemplo'],
        rows: [
          ['Afirmativa', 'some', 'There are some apples.'],
          ['Negativa', 'any', "There aren't any apples."],
          ['Pregunta', 'any', 'Are there any apples?'],
        ],
      },
    ],
    examples: [
      { en: 'There is a book on the table.', es: 'Hay un libro en la mesa.' },
      { en: 'There are three windows in the room.', es: 'Hay tres ventanas en la habitación.' },
      { en: "There isn't any milk in the fridge.", es: 'No hay leche en el refrigerador.', note: 'incontable + negativa → there is + any.' },
      { en: 'Are there any students here?', es: '¿Hay estudiantes aquí?', note: 'pregunta plural → are there + any.' },
      { en: "There's a sofa and two chairs.", es: 'Hay un sofá y dos sillas.', note: 'concuerda con el primer elemento (a sofa).' },
      { en: 'There were many people at the party.', es: 'Había mucha gente en la fiesta.', note: 'pasado plural → there were.' },
      { en: 'Yes, there is. / No, there isn\'t.', es: 'Sí (lo hay). / No (no lo hay).', note: 'respuesta corta.' },
    ],
    contrast: [
      { es: 'Hay un problema.', en: 'There is a problem.', note: '"hay" → there is, nunca "have".' },
      { es: 'Hay mucha gente.', en: 'There are many people.', note: '"people" es plural → there are.' },
      { es: 'No hay leche.', en: "There isn't any milk.", note: 'incontable + negativa → there is + any.' },
      { es: '¿Hay un banco cerca?', en: 'Is there a bank nearby?', note: 'la pregunta invierte el orden.' },
      { es: 'Había dos sillas.', en: 'There were two chairs.', note: 'pasado plural → there were.' },
    ],
    commonMistakes: [
      { wrong: 'There are a problem.', right: 'There is a problem.', note: 'Singular → there is.' },
      { wrong: 'It has many people.', right: 'There are many people.', note: 'Para "hay" se usa there is/are, no "have".' },
      { wrong: 'There is two cats.', right: 'There are two cats.', note: 'Plural (two cats) → there are.' },
      { wrong: 'There are any chairs. (afirmativa)', right: 'There are some chairs.', note: 'En afirmativa se usa "some", no "any".' },
      { wrong: 'Have a book on the table.', right: 'There is a book on the table.', note: 'Existencia → there is, no "have".' },
    ],
    tip: 'Para decir "hay" NO uses "have": es there is/are. Mira lo que viene después: singular/incontable → there is; plural → there are. Y recuerda some (afirmativa) vs any (negativa/pregunta).',
    questions: [
      { s: '___ a cat on the sofa.', opts: ['There is', 'There are', 'It is'], a: 0, fb: 'Singular (a cat) → "there is".' },
      { s: '___ four people in my family.', opts: ['There is', 'There are', 'It has'], a: 1, fb: 'Plural (four people) → "there are".' },
      { s: '___ any sugar in my coffee.', opts: ["There isn't", "There aren't", 'It is not'], a: 0, fb: 'Incontable/singular → "there isn\'t".' },
      { s: '___ two bedrooms in the house.', opts: ['There is', 'There are', 'There be'], a: 1, fb: 'Plural (two bedrooms) → "there are".' },
      { s: '___ there a bank near here?', opts: ['Is', 'Are', 'Be'], a: 0, fb: 'Pregunta singular → "Is there...?".' },
      { s: '___ there any apples?', opts: ['Is', 'Are', 'Have'], a: 1, fb: 'Pregunta plural → "Are there...?".' },
      { s: '___ a problem with the wifi.', opts: ['There is', 'There are', 'They are'], a: 0, fb: '"a problem" singular → "there is".' },
      { s: '___ many cars in the street.', opts: ['There is', 'There are', 'It is'], a: 1, fb: 'Plural (many cars) → "there are".' },
      { s: 'There are ___ apples in the bowl. (afirmativa)', opts: ['any', 'some', 'a'], a: 1, fb: 'Afirmativa → "some".' },
      { s: '___ any sugar in the coffee? (pregunta)', opts: ['Is there', 'Are there', 'There is'], a: 0, fb: 'Incontable → "Is there...?".' },
      { s: '"Is there a bank nearby?" — "Yes, ___."', opts: ['there is', 'it is', 'there are'], a: 0, fb: 'Respuesta corta → "there is".' },
      { s: '___ many people at the party yesterday. (pasado)', opts: ['There was', 'There were', 'There are'], a: 1, fb: 'Pasado plural → "there were".' },
      { s: '___ a sofa and two chairs in the room.', opts: ['There is', 'There are', 'It is'], a: 0, fb: 'Concuerda con el primer elemento (a sofa) → "there is".' },
      { s: '¿Cuál oración es CORRECTA?', opts: ['It has a problem.', 'There is a problem.', 'Have a problem.'], a: 1, fb: 'Existencia → "there is", no "have".' },
      { s: '¿Cómo se dice "Hay tres sillas"?', opts: ['It has three chairs.', 'There are three chairs.', 'There is three chairs.'], a: 1, fb: 'Plural → "there are three chairs".' },
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
      'Para expresar posesión —cosas, familia, características físicas, relaciones— el inglés tiene dos formas que significan exactamente lo mismo, "tener": "have got" (muy frecuente en inglés británico y en el habla) y "have" a secas (más neutro y americano). "I have got a car" = "I have a car".',
      'Con he, she, it cambian a "has got" / "has". Las contracciones son muy comunes y conviene reconocerlas: I\'ve got, she\'s got, they\'ve got.',
      'La diferencia técnica que más confunde: "have got" forma el negativo y la pregunta SIN "do" (haven\'t got / Have you got...?), mientras que "have" a secas SÍ usa "do" (don\'t have / Do you have...?). Mezclar las dos ("Do you have got?") es un error muy típico.',
    ],
    sections: [
      {
        heading: 'Dos formas, un mismo significado',
        body: [
          '"have got" suena más informal/británico; "have" es más neutro y habitual en inglés americano. En afirmativa son intercambiables: "I\'ve got a sister" = "I have a sister".',
          'Consejo práctico: elige una de las dos y sé coherente dentro de la misma oración. No mezcles las construcciones.',
        ],
      },
      {
        heading: "Negativo y pregunta: cuidado con el 'do'",
        body: [
          'Con "have got": el negativo es haven\'t got / hasn\'t got y la pregunta invierte el auxiliar: "Have you got a car?", "Has she got time?" (SIN "do").',
          'Con "have" a secas: el negativo usa don\'t/doesn\'t have y la pregunta usa do/does: "I don\'t have a car", "Do you have a car?". Lo que NUNCA existe es la mezcla "Do you have got...?".',
        ],
      },
      {
        heading: 'No sirve para acciones ni para la edad',
        body: [
          '"have got" expresa posesión y estados, no acciones. Para acciones cotidianas (desayunar, ducharse) se usa "have" normal: "I have breakfast", "I have a shower" — nunca "I have got breakfast".',
          'Y la edad, como siempre, va con "to be": "I\'m 25", no "I have got 25".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'have got / has got',
        headers: ['Sujeto', 'Afirmativa', 'Negativa', 'Pregunta'],
        rows: [
          ['I / you / we / they', "have got ('ve got)", "haven't got", 'Have you got...?'],
          ['he / she / it', "has got ('s got)", "hasn't got", 'Has she got...?'],
        ],
      },
      {
        caption: 'have got vs have (mismo significado)',
        headers: ['', 'have got', 'have (con do)'],
        rows: [
          ['Afirmativa', "I've got a car", 'I have a car'],
          ['Negativa', "I haven't got a car", "I don't have a car"],
          ['Pregunta', 'Have you got a car?', 'Do you have a car?'],
        ],
      },
    ],
    examples: [
      { en: "I've got two brothers.", es: 'Tengo dos hermanos.' },
      { en: 'She has got brown eyes.', es: 'Ella tiene ojos marrones.', note: 'he/she/it → has got.' },
      { en: "We haven't got a car.", es: 'No tenemos carro.', note: 'negativo sin "do".' },
      { en: 'Have you got a pen?', es: '¿Tienes un bolígrafo?', note: 'pregunta sin "do".' },
      { en: 'Do you have a car?', es: '¿Tienes carro?', note: 'misma idea con "have" + do.' },
      { en: 'I have breakfast at 7.', es: 'Desayuno a las 7.', note: 'acción → "have", no "have got".' },
      { en: "I'm 25 years old.", es: 'Tengo 25 años.', note: 'la edad va con "to be".' },
    ],
    contrast: [
      { es: 'Tengo dos hermanos.', en: "I've got two brothers. / I have two brothers.", note: 'Dos formas equivalentes.' },
      { es: '¿Tienes carro?', en: 'Have you got a car? / Do you have a car?', note: '"have got" sin do; "have" con do.' },
      { es: 'Ella tiene ojos marrones.', en: 'She has got brown eyes.', note: 'he/she/it → has.' },
      { es: 'Tengo 25 años.', en: "I'm 25.", note: 'la edad va con "to be", no con have.' },
      { es: 'Desayuno a las 7.', en: 'I have breakfast at 7.', note: 'acción → "have" normal, no "have got".' },
    ],
    commonMistakes: [
      { wrong: 'She have got a dog.', right: 'She has got a dog.', note: 'Con he/she/it → has got.' },
      { wrong: 'I have got 25 years.', right: "I'm 25 (years old).", note: 'La edad se dice con "to be", no con "have".' },
      { wrong: 'Do you have got a car?', right: 'Have you got a car? / Do you have a car?', note: 'No mezcles "do" con "have got".' },
      { wrong: "She doesn't have got time.", right: "She hasn't got time. / She doesn't have time.", note: 'Elige una construcción, no las dos.' },
      { wrong: 'I have got breakfast every day.', right: 'I have breakfast every day.', note: 'Acción cotidiana → "have", no "have got".' },
    ],
    tip: '"have got" y "have" significan lo mismo (tener). Con he/she/it usa "has". Y elige una construcción: "have got" va SIN do; "have" va CON do. Nunca "Do you have got?".',
    questions: [
      { s: 'I ___ got two sisters.', opts: ['have', 'has', 'am'], a: 0, fb: 'Con I → "have got".' },
      { s: 'She ___ got blue eyes.', opts: ['have', 'has', 'is'], a: 1, fb: 'Con she → "has got".' },
      { s: 'We ___ got a big house.', opts: ['have', 'has', 'are'], a: 0, fb: 'Con we → "have got".' },
      { s: 'He ___ got a new phone.', opts: ['have', 'has', 'have got'], a: 1, fb: 'Con he → "has got".' },
      { s: '___ you got a pen?', opts: ['Have', 'Has', 'Do'], a: 0, fb: 'Pregunta con you → "Have you got...?".' },
      { s: 'They ___ got any money. (negativo)', opts: ["haven't", "hasn't", "aren't"], a: 0, fb: 'Con they → "haven\'t got".' },
      { s: 'My dog ___ got long ears.', opts: ['have', 'has', 'is'], a: 1, fb: '"dog" = it → "has got".' },
      { s: '___ she got brothers?', opts: ['Have', 'Has', 'Do'], a: 1, fb: 'Pregunta con she → "Has she got...?".' },
      { s: 'Do you ___ a car? (con "do")', opts: ['have', 'have got', 'has'], a: 0, fb: 'Con "do" se usa "have" a secas.' },
      { s: 'She ___ time today. (negativo, con have got)', opts: ["haven't got", "hasn't got", "doesn't got"], a: 1, fb: 'he/she/it → "hasn\'t got".' },
      { s: 'I ___ breakfast at 8. (acción)', opts: ['have got', 'have', 'has'], a: 1, fb: 'Acción cotidiana → "have", no "have got".' },
      { s: 'We ___ got a big garden.', opts: ['have', 'has', 'are'], a: 0, fb: 'we → "have got".' },
      { s: '¿Cuál oración es CORRECTA?', opts: ['Do you have got a pen?', 'Have you got a pen?', 'Do you has a pen?'], a: 1, fb: '"have got" va SIN "do".' },
      { s: '¿Cómo se dice "No tengo tiempo"?', opts: ["I haven't got time.", "I don't have got time.", 'I not have time.'], a: 0, fb: '"I haven\'t got time" o "I don\'t have time".' },
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
      'Para hacer preguntas en present simple necesitas un auxiliar al principio: "do" (con I, you, we, they) o "does" (con he, she, it), seguido del sujeto y el verbo en su forma base: "Do you work?", "Does she work?".',
      'La regla de oro es la misma que en el negativo: cuando aparece "does", el verbo PIERDE la -s (la -s se la lleva el "does"). Se dice "Does she work?", nunca "Does she works?".',
      'Dos cosas que el hispanohablante suele olvidar: la pregunta SIEMPRE necesita do/does —no basta con la entonación como en español ("¿hablas inglés?")—, y las preguntas con palabra interrogativa colocan esa palabra primero: "Where do you live?".',
    ],
    sections: [
      {
        heading: 'El auxiliar do/does y la -s que desaparece',
        body: [
          'Estructura: do/does + sujeto + verbo en forma base. La -s de la tercera persona aparece solo UNA vez en toda la pregunta: dentro de "does", no en el verbo. "Does he play football?" (play sin -s).',
          'Es el reflejo del negativo "doesn\'t": el auxiliar carga con la marca de tercera persona y el verbo se queda limpio.',
        ],
      },
      {
        heading: 'Respuestas cortas',
        body: [
          'Las respuestas cortas reutilizan el auxiliar, no el verbo: "Do you like coffee?" → "Yes, I do" / "No, I don\'t". "Does she drive?" → "Yes, she does" / "No, she doesn\'t".',
          'En un examen oral, no respondas solo "Yes": completa con el auxiliar ("Yes, I do").',
        ],
      },
      {
        heading: 'Preguntas con palabra interrogativa (wh-)',
        body: [
          'Estructura: wh- (where, what, when, how, why) + do/does + sujeto + verbo: "Where do you work?", "What does she want?", "When do they arrive?".',
          'Excepción importante: cuando la palabra interrogativa ES el sujeto (who, what), NO se usa do/does y el verbo lleva su -s normal: "Who lives here?", "What happens next?".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Preguntas y respuestas cortas',
        headers: ['Auxiliar', 'Pregunta', 'Respuesta corta'],
        rows: [
          ['do', 'Do you like coffee?', "Yes, I do / No, I don't"],
          ['does', 'Does he live here?', "Yes, he does / No, he doesn't"],
        ],
      },
      {
        caption: 'Preguntas con wh-',
        headers: ['Estructura', 'Ejemplo', 'Nota'],
        rows: [
          ['wh- + do/does + sujeto + verbo', 'Where do you live?', 'verbo en forma base'],
          ['wh- + does + sujeto + verbo', 'What does she want?', 'does → verbo sin -s'],
          ['who/what como sujeto (sin do)', 'Who lives here?', 'el verbo lleva -s'],
        ],
      },
    ],
    examples: [
      { en: 'Do you speak English?', es: '¿Hablas inglés?', note: 'la pregunta necesita "do".' },
      { en: 'Does she work on Sundays?', es: '¿Ella trabaja los domingos?', note: 'does + verbo base.' },
      { en: 'Where do they live?', es: '¿Dónde viven ellos?', note: 'wh- + do + sujeto + verbo.' },
      { en: 'What does he want?', es: '¿Qué quiere él?' },
      { en: 'Who lives in this house?', es: '¿Quién vive en esta casa?', note: 'who = sujeto → sin "do", verbo con -s.' },
      { en: "Yes, I do. / No, she doesn't.", es: 'Sí. / No.', note: 'respuesta corta con el auxiliar.' },
    ],
    contrast: [
      { es: '¿Hablas inglés?', en: 'Do you speak English?', note: 'necesita "do", no solo entonación.' },
      { es: '¿Ella trabaja aquí?', en: 'Does she work here?', note: 'does + verbo base (sin -s).' },
      { es: '¿Dónde vives?', en: 'Where do you live?', note: 'wh- + do + sujeto + verbo.' },
      { es: '¿Qué quiere ella?', en: 'What does she want?', note: 'la -s la lleva "does".' },
      { es: '¿Quién vive aquí?', en: 'Who lives here?', note: 'who como sujeto → sin "do".' },
    ],
    commonMistakes: [
      { wrong: 'Does she works here?', right: 'Does she work here?', note: 'Con "does" el verbo va sin -s.' },
      { wrong: 'You like coffee? (sin auxiliar)', right: 'Do you like coffee?', note: 'La pregunta necesita do/does.' },
      { wrong: 'Do he live here?', right: 'Does he live here?', note: 'Con he/she/it → does.' },
      { wrong: 'Where you live?', right: 'Where do you live?', note: 'Las preguntas wh- también necesitan do/does.' },
      { wrong: 'Who does live here?', right: 'Who lives here?', note: 'Cuando "who" es el sujeto, no se usa do.' },
    ],
    tip: 'En la pregunta, la -s de tercera persona se la lleva el "does": "Does she work?" (work sin s). Y toda pregunta necesita do/does, salvo cuando who/what es el propio sujeto.',
    questions: [
      { s: '___ you like pizza?', opts: ['Do', 'Does', 'Are'], a: 0, fb: 'Con you → "Do".' },
      { s: '___ she live in Bogotá?', opts: ['Do', 'Does', 'Is'], a: 1, fb: 'Con she → "Does".' },
      { s: 'Does he ___ to school by bus?', opts: ['go', 'goes', 'going'], a: 0, fb: 'Con "does", el verbo va sin -s → "go".' },
      { s: '___ they speak Spanish?', opts: ['Do', 'Does', 'Are'], a: 0, fb: 'Con they → "Do".' },
      { s: 'Where ___ your parents work?', opts: ['do', 'does', 'is'], a: 0, fb: 'Con your parents (plural) → "do".' },
      { s: 'Does it ___ in winter here?', opts: ['rains', 'rain', 'raining'], a: 1, fb: 'Con "does", forma base → "rain".' },
      { s: '"Do you study English?" — "Yes, I ___."', opts: ['do', 'does', 'am'], a: 0, fb: 'Respuesta corta con I → "Yes, I do".' },
      { s: '"Does she cook?" — "No, she ___."', opts: ["don't", "doesn't", "isn't"], a: 1, fb: 'Respuesta corta con she → "No, she doesn\'t".' },
      { s: 'Where ___ she work?', opts: ['do', 'does', 'is'], a: 1, fb: 'Con she → "does".' },
      { s: 'Who ___ in this house? (who = sujeto)', opts: ['do live', 'does live', 'lives'], a: 2, fb: 'who como sujeto → sin "do", verbo con -s: "lives".' },
      { s: 'What ___ you want for dinner?', opts: ['do', 'does', 'are'], a: 0, fb: 'Con you → "do".' },
      { s: 'Does it ___ here in winter?', opts: ['rains', 'rain', 'raining'], a: 1, fb: 'Con "does", verbo en forma base → "rain".' },
      { s: '"Do they speak Spanish?" — "Yes, they ___."', opts: ['do', 'does', 'are'], a: 0, fb: 'Respuesta corta → "Yes, they do".' },
      { s: '¿Cuál pregunta es CORRECTA?', opts: ['Does she works here?', 'Does she work here?', 'Do she work here?'], a: 1, fb: '"does" + verbo en forma base.' },
      { s: '¿Cómo se dice "¿Dónde vives?"?', opts: ['Where you live?', 'Where do you live?', 'Where lives you?'], a: 1, fb: '"Where do you live?".' },
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
      'Los adverbios de frecuencia dicen cada cuánto ocurre algo, en una escala que va de "always" (siempre, 100%) a "never" (nunca, 0%). Son imprescindibles para describir rutinas y costumbres, así que aparecen constantemente en el A1.',
      'La regla más importante —y la que más se falla— es la POSICIÓN: el adverbio va ANTES del verbo principal (I always read) pero DESPUÉS del verbo "to be" (She is always late). Es una sola regla con dos caras.',
      'Trampa contrastiva: "never" ya es negativo por sí mismo. En español usamos doble negación ("no fumo nunca"), pero en inglés "never" NO se combina con "don\'t": se dice "I never smoke", no "I don\'t never smoke".',
    ],
    sections: [
      {
        heading: 'La escala de frecuencia',
        body: [
          'De mayor a menor: always (siempre) > usually (normalmente) > often (a menudo) > sometimes (a veces) > rarely / seldom (rara vez) > never (nunca). Conviene aprenderla como una recta, de 100% a 0%.',
        ],
      },
      {
        heading: 'Posición: la regla de oro',
        body: [
          'Con un verbo normal, el adverbio va justo ANTES: "I usually get up early", "She often travels". Con el verbo "to be", va justo DESPUÉS: "I am usually tired", "He is never late".',
          'Si hay un auxiliar o un modal (can, do, have), el adverbio se mete después del primer auxiliar: "I can never sleep", "I have always wanted to travel".',
        ],
      },
      {
        heading: 'Frecuencia al principio o al final',
        body: [
          '"sometimes", "usually" y "often" también pueden ir al principio de la frase para dar énfasis: "Sometimes I cook at home."',
          'Las expresiones de frecuencia con "every / once / twice" van al FINAL: "every day", "twice a week", "once a month". "I go to the gym twice a week."',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'Escala de frecuencia',
        headers: ['Adverbio', 'Significado', 'Frecuencia'],
        rows: [
          ['always', 'siempre', '100%'],
          ['usually', 'normalmente', '~90%'],
          ['often', 'a menudo', '~70%'],
          ['sometimes', 'a veces', '~50%'],
          ['rarely / seldom', 'rara vez', '~10%'],
          ['never', 'nunca', '0%'],
        ],
      },
      {
        caption: '¿Dónde se coloca?',
        headers: ['Tipo de verbo', 'Posición', 'Ejemplo'],
        rows: [
          ['verbo normal', 'antes del verbo', 'I always read'],
          ['verbo "to be"', 'después del verbo', 'I am always tired'],
          ['auxiliar / modal', 'después del auxiliar', 'I can never sleep'],
          ['every / twice a...', 'al final', 'I read every day'],
        ],
      },
    ],
    examples: [
      { en: 'I always brush my teeth.', es: 'Siempre me cepillo los dientes.', note: 'antes del verbo principal.' },
      { en: 'She usually arrives early.', es: 'Ella normalmente llega temprano.' },
      { en: 'He is never late.', es: 'Él nunca llega tarde.', note: 'después de "to be".' },
      { en: 'Sometimes I cook at home.', es: 'A veces cocino en casa.', note: '"sometimes" también va al principio.' },
      { en: 'I go to the gym twice a week.', es: 'Voy al gimnasio dos veces por semana.', note: '"twice a week" va al final.' },
      { en: 'I can never sleep on planes.', es: 'Nunca puedo dormir en los aviones.', note: 'después del modal "can".' },
    ],
    contrast: [
      { es: 'Siempre me cepillo los dientes.', en: 'I always brush my teeth.', note: 'antes del verbo principal.' },
      { es: 'Ella siempre está feliz.', en: 'She is always happy.', note: 'después de "to be".' },
      { es: 'Nunca fumo.', en: 'I never smoke.', note: '"never" ya es negativo; sin "don\'t".' },
      { es: 'A veces cocino.', en: 'Sometimes I cook. / I sometimes cook.', note: '"sometimes" admite también el inicio.' },
      { es: 'Voy dos veces por semana.', en: 'I go twice a week.', note: 'la expresión "twice a week" va al final.' },
    ],
    commonMistakes: [
      { wrong: 'I brush always my teeth.', right: 'I always brush my teeth.', note: 'El adverbio va antes del verbo principal.' },
      { wrong: 'She always is happy.', right: 'She is always happy.', note: 'Con "to be" el adverbio va después.' },
      { wrong: "I don't never smoke.", right: 'I never smoke.', note: '"never" ya es negativo; no se combina con "don\'t".' },
      { wrong: 'I go usually to work by bus.', right: 'I usually go to work by bus.', note: 'El adverbio va antes del verbo, no después.' },
      { wrong: 'I read twice a week books.', right: 'I read books twice a week.', note: '"twice a week" va al final de la frase.' },
    ],
    tip: 'Posición: ANTES del verbo normal (I never eat) pero DESPUÉS de "to be" (I am never sad). Y "never" ya es negativo: no lo juntes con "don\'t".',
    questions: [
      { s: 'I ___ drink coffee in the morning. (100%)', opts: ['always', 'never', 'rarely'], a: 0, fb: '100% → "always".' },
      { s: 'She is ___ tired after work.', opts: ['often tired', 'tired often', 'often'], a: 0, fb: 'Con "is", el adverbio va después: "is often".' },
      { s: 'They ___ go to the gym. (a veces)', opts: ['sometimes', 'always', 'never'], a: 0, fb: 'A veces → "sometimes".' },
      { s: 'He ___ eats meat. He is vegetarian. (0%)', opts: ['always', 'usually', 'never'], a: 2, fb: 'Vegetariano → "never" (0%).' },
      { s: 'We ___ watch TV at night.', opts: ['watch usually', 'usually watch', 'usually'], a: 1, fb: 'Antes del verbo: "usually watch".' },
      { s: 'I am ___ late for class.', opts: ['never', 'go never', 'never go'], a: 0, fb: 'Después de "am": "am never".' },
      { s: 'My dad ___ cooks on Sundays. (~70%)', opts: ['never', 'often', 'rarely'], a: 1, fb: '~70% → "often".' },
      { s: 'Where do you ___ go on holiday?', opts: ['usually', 'are', 'usual'], a: 0, fb: '"usually" — adverbio de frecuencia.' },
      { s: 'I go to the gym ___.', opts: ['twice a week', 'a week twice', 'week twice a'], a: 0, fb: '"twice a week" va al final.' },
      { s: "I ___ sleep on planes. (con 'can')", opts: ['never can', 'can never', 'can not never'], a: 1, fb: 'Después del modal: "can never".' },
      { s: 'She ___ goes out; she prefers home. (~10%)', opts: ['always', 'rarely', 'often'], a: 1, fb: '~10% → "rarely".' },
      { s: 'He has ___ wanted to visit Japan.', opts: ['always', 'not always', 'always not'], a: 0, fb: 'Después del auxiliar "has": "has always".' },
      { s: '¿Cuál oración es CORRECTA?', opts: ["I don't never eat meat.", 'I never eat meat.', 'I never not eat meat.'], a: 1, fb: '"never" ya es negativo: no se junta con "don\'t".' },
      { s: '¿Cómo se dice "A veces cocino"?', opts: ['I cook sometimes home.', 'Sometimes I cook.', 'I home sometimes cook.'], a: 1, fb: '"Sometimes I cook" / "I sometimes cook".' },
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
      'El present continuous describe lo que está pasando AHORA, en este preciso momento: "I am reading". Se forma con el verbo "to be" (am/is/are) + el verbo principal con la terminación -ing.',
      'Es una estructura de dos piezas que el hispanohablante tiende a romper: no olvides el "to be" (no "I reading") NI la terminación -ing (no "I am read"). Las dos partes son obligatorias.',
      'La gran diferencia con el present simple: el simple es para rutinas y hábitos (I work every day) y el continuous para lo que ocurre justo ahora o de forma temporal (I am working now). Te avisan marcadores como now, right now, at the moment, today, Look!, Listen!.',
    ],
    sections: [
      {
        heading: 'La fórmula: to be + verbo-ing',
        body: [
          'Afirmativo: sujeto + am/is/are + verbo-ing ("She is cooking"). Negativo: am/is/are + not ("They aren\'t sleeping"). Pregunta: se invierte el "to be" ("Are you working?", "What is she doing?").',
          'El "to be" cambia según el sujeto (am/is/are), pero el verbo-ing nunca cambia.',
        ],
      },
      {
        heading: 'Reglas de ortografía del -ing',
        body: [
          'La mayoría solo añade -ing: read → reading, play → playing. Los verbos terminados en -e muda pierden la e: make → making, write → writing, come → coming.',
          'Los verbos cortos con el patrón consonante-vocal-consonante doblan la última consonante: run → running, sit → sitting, swim → swimming, get → getting.',
        ],
      },
      {
        heading: 'Continuous vs. simple, y los verbos de estado',
        body: [
          'Continuous = ahora o temporal: "I am living in Bogotá this year". Simple = rutina o permanente: "I live in Bogotá". El marcador temporal te guía.',
          'Importante: los verbos de estado (like, love, want, need, know, understand, have = posesión) normalmente NO se usan en continuous. Se dice "I want a coffee", no "I am wanting a coffee".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'to be + verbo-ing',
        headers: ['Sujeto', 'to be', 'Ejemplo'],
        rows: [
          ['I', 'am', 'I am eating'],
          ['he / she / it', 'is', 'she is eating'],
          ['you / we / they', 'are', 'they are eating'],
        ],
      },
      {
        caption: 'Ortografía del -ing',
        headers: ['Tipo de verbo', 'Regla', 'Ejemplo'],
        rows: [
          ['general', '+ ing', 'read → reading'],
          ['-e muda', 'quita la e + ing', 'make → making'],
          ['corto C-V-C', 'dobla la consonante', 'run → running, sit → sitting'],
        ],
      },
    ],
    examples: [
      { en: 'I am studying right now.', es: 'Estoy estudiando ahora mismo.', note: 'now → continuous.' },
      { en: 'She is making dinner.', es: 'Ella está haciendo la cena.', note: 'make → making (pierde la -e).' },
      { en: 'The children are running in the park.', es: 'Los niños están corriendo en el parque.', note: 'run → running (dobla la n).' },
      { en: "They aren't sleeping.", es: 'Ellos no están durmiendo.', note: 'negativo: aren\'t + -ing.' },
      { en: 'What are you doing?', es: '¿Qué estás haciendo?', note: 'pregunta: invierte el "to be".' },
      { en: 'I want a coffee.', es: 'Quiero un café.', note: 'verbo de estado: NO va en continuous.' },
    ],
    contrast: [
      { es: 'Estoy estudiando.', en: 'I am studying.', note: 'to be + -ing (acción ahora).' },
      { es: 'Trabajo en un banco. (rutina)', en: 'I work in a bank.', note: 'rutina → present simple, no continuous.' },
      { es: '¿Qué estás haciendo?', en: 'What are you doing?', note: 'la pregunta invierte el "to be".' },
      { es: 'Quiero un café.', en: 'I want a coffee.', note: 'verbos de estado no van en continuous (no "I am wanting").' },
      { es: 'Este año vivo en Bogotá. (temporal)', en: 'I am living in Bogotá this year.', note: 'situación temporal → continuous.' },
    ],
    commonMistakes: [
      { wrong: 'I reading a book.', right: 'I am reading a book.', note: 'No olvides el verbo "to be" (am/is/are).' },
      { wrong: 'She is read.', right: 'She is reading.', note: 'El verbo principal lleva -ing.' },
      { wrong: 'They is working.', right: 'They are working.', note: 'Con they → are.' },
      { wrong: 'He is runing.', right: 'He is running.', note: 'Verbo corto C-V-C: dobla la consonante (running).' },
      { wrong: 'I am wanting a coffee.', right: 'I want a coffee.', note: 'Los verbos de estado (want, like, know) no van en continuous.' },
    ],
    tip: 'Fórmula: to be (am/is/are) + verbo-ing. Úsalo para "ahora" (I am writing now); para rutinas, present simple. Y ojo con la ortografía: make→making, run→running.',
    questions: [
      { s: 'I ___ watching TV right now.', opts: ['am', 'is', 'are'], a: 0, fb: 'Con I → "am".' },
      { s: 'She is ___ a letter.', opts: ['write', 'writing', 'writes'], a: 1, fb: 'Verbo principal con -ing → "writing".' },
      { s: 'They ___ playing football.', opts: ['am', 'is', 'are'], a: 2, fb: 'Con they → "are".' },
      { s: 'Look! It ___ raining.', opts: ['am', 'is', 'are'], a: 1, fb: 'Con it → "is".' },
      { s: 'We are ___ dinner now.', opts: ['have', 'having', 'has'], a: 1, fb: '"having" — verbo con -ing.' },
      { s: 'What ___ you doing?', opts: ['am', 'is', 'are'], a: 2, fb: 'Con you → "are".' },
      { s: 'He ___ not listening to me.', opts: ['am', 'is', 'are'], a: 1, fb: 'Con he → "is" (is not = isn\'t).' },
      { s: 'I usually walk, but today I ___ taking the bus.', opts: ['am', 'is', 'do'], a: 0, fb: '"today / now" → continuous: "I am taking".' },
      { s: 'She is ___ dinner now. (make)', opts: ['makeing', 'making', 'makking'], a: 1, fb: 'make → making (pierde la -e).' },
      { s: 'The dog is ___ in the garden. (run)', opts: ['runing', 'running', 'runs'], a: 1, fb: 'run → running (dobla la consonante).' },
      { s: 'We ___ to music right now.', opts: ['listen', 'are listening', 'listens'], a: 1, fb: '"right now" → continuous: "are listening".' },
      { s: 'Listen! Someone ___ the piano.', opts: ['plays', 'is playing', 'play'], a: 1, fb: '"Listen!" → ahora → "is playing".' },
      { s: 'I ___ a coffee. (estado: want)', opts: ['am wanting', 'want', 'wants'], a: 1, fb: 'Verbo de estado → "want", no continuous.' },
      { s: '¿Cuál oración es CORRECTA?', opts: ['I reading now.', 'I am reading now.', 'I am read now.'], a: 1, fb: '"to be" + verbo-ing.' },
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
      '"Can" es un verbo modal que cubre varios significados con una sola palabra: habilidad ("saber/poder hacer algo": I can swim), permiso (You can go), peticiones (Can you help me?) y ofrecimientos (Can I help you?).',
      'Es de los temas más fáciles porque "can" es INVARIABLE: no cambia con he/she/it (siempre "can", sin -s) y va seguido del verbo en su forma base, SIN "to". El negativo es "cannot" (en una palabra) o su contracción "can\'t".',
      'El hispanohablante comete dos errores por interferencia: ponerle una -s ("she cans") y meterle "to" ("I can to swim"). Ninguno de los dos existe: es simplemente "she can swim".',
    ],
    sections: [
      {
        heading: 'Los usos de "can"',
        body: [
          'Habilidad: "I can drive" (sé/puedo conducir). Permiso: "You can use my phone" (puedes usar mi teléfono). Petición: "Can you open the window?" (¿puedes abrir la ventana?). Ofrecimiento: "Can I help you?" (¿te ayudo?).',
          'En el A1 los dos usos más frecuentes son la habilidad y el permiso.',
        ],
      },
      {
        heading: 'Invariable: sin -s y sin "to"',
        body: [
          '"can" y "can\'t" son iguales para todos los sujetos, y el verbo que sigue va siempre en forma base: "She can swim", "They can come". El negativo es "can\'t" y la pregunta pone "Can" al principio: "Can you swim?".',
          'Como es modal, no usa "do/does": el negativo es "can\'t" (no "doesn\'t can") y la pregunta es "Can you...?" (no "Do you can...?"). Respuestas cortas: "Yes, I can" / "No, I can\'t".',
        ],
      },
      {
        heading: '"can" para habilidad = "saber" en español',
        body: [
          'Para habilidades aprendidas, el inglés usa "can" donde el español usa "saber": "I can swim" se traduce mejor como "sé nadar" que como "puedo nadar". "She can cook" = "ella sabe cocinar".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: "can / can't",
        headers: ['Forma', 'Estructura', 'Ejemplo'],
        rows: [
          ['Afirmativa', 'sujeto + can + verbo', 'I can drive'],
          ['Negativa', "sujeto + can't + verbo", "she can't drive"],
          ['Pregunta', 'Can + sujeto + verbo?', 'Can you drive?'],
          ['Respuesta corta', "Yes, I can / No, I can't", '—'],
        ],
      },
      {
        caption: 'Los usos de "can"',
        headers: ['Uso', 'Ejemplo', 'Traducción'],
        rows: [
          ['Habilidad', 'I can swim.', 'Sé nadar.'],
          ['Permiso', 'You can go now.', 'Puedes irte ya.'],
          ['Petición', 'Can you help me?', '¿Puedes ayudarme?'],
          ['Ofrecimiento', 'Can I help you?', '¿Te ayudo?'],
        ],
      },
    ],
    examples: [
      { en: 'I can speak two languages.', es: 'Sé hablar dos idiomas.', note: 'habilidad → "can" = saber.' },
      { en: "He can't come tonight.", es: 'Él no puede venir esta noche.', note: 'negativo: can\'t + verbo base.' },
      { en: 'Can you help me, please?', es: '¿Puedes ayudarme, por favor?', note: 'petición.' },
      { en: 'You can use my phone.', es: 'Puedes usar mi teléfono.', note: 'permiso.' },
      { en: 'She can swim very well.', es: 'Ella sabe nadar muy bien.', note: '"can" invariable (sin -s).' },
      { en: "Yes, I can. / No, I can't.", es: 'Sí (puedo). / No (no puedo).', note: 'respuesta corta.' },
    ],
    contrast: [
      { es: 'Sé nadar.', en: 'I can swim.', note: 'la habilidad usa "can" (donde el español usa "saber").' },
      { es: '¿Puedes ayudarme?', en: 'Can you help me?', note: 'petición con "Can" al inicio.' },
      { es: 'No puede venir.', en: "He can't come.", note: 'can\'t + verbo base, sin "do".' },
      { es: '¿Puedo usar tu teléfono?', en: 'Can I use your phone?', note: 'permiso.' },
      { es: 'Ella sabe conducir.', en: 'She can drive.', note: '"can" es igual para todos: sin -s.' },
    ],
    commonMistakes: [
      { wrong: 'She cans swim.', right: 'She can swim.', note: '"can" nunca lleva -s.' },
      { wrong: 'I can to drive.', right: 'I can drive.', note: 'Después de "can", el verbo va sin "to".' },
      { wrong: 'He can speaks English.', right: 'He can speak English.', note: 'El verbo tras "can" va en forma base.' },
      { wrong: 'Do you can swim?', right: 'Can you swim?', note: '"can" no usa "do": la pregunta es "Can you...?".' },
      { wrong: "She doesn't can drive.", right: "She can't drive.", note: 'El negativo de "can" es "can\'t", no "doesn\'t can".' },
    ],
    tip: '"Can" es invariable: nunca lleva -s y nunca usa "to" ni "do". She can swim (no "cans", no "can to swim", no "does she can?").',
    questions: [
      { s: 'I ___ swim very well.', opts: ['can', 'cans', 'can to'], a: 0, fb: '"can" + verbo base.' },
      { s: 'She ___ play the guitar. (negativo)', opts: ["can't", "cann't", "doesn't can"], a: 0, fb: 'Negativo → "can\'t".' },
      { s: 'He can ___ three languages.', opts: ['speaks', 'speak', 'to speak'], a: 1, fb: 'Después de can → forma base "speak".' },
      { s: '___ you help me?', opts: ['Can', 'Do', 'Are'], a: 0, fb: 'Petición → "Can you...?".' },
      { s: 'Birds ___ fly.', opts: ['can', 'cans', 'can to'], a: 0, fb: '"can" es igual para todos.' },
      { s: '"Can you cook?" — "Yes, I ___."', opts: ['can', 'do', 'am'], a: 0, fb: 'Respuesta corta → "Yes, I can".' },
      { s: 'We ___ go to the party. We are busy. (negativo)', opts: ["can't", 'can', "don't can"], a: 0, fb: 'No podemos → "can\'t".' },
      { s: 'My sister ___ drive a car.', opts: ['can', 'cans', 'is can'], a: 0, fb: 'Con she → igual "can".' },
      { s: 'You ___ use my computer. (permiso)', opts: ['can', 'cans', 'can to'], a: 0, fb: 'Permiso → "can".' },
      { s: '___ I help you? (ofrecimiento)', opts: ['Do', 'Can', 'Am'], a: 1, fb: 'Ofrecimiento → "Can I help you?".' },
      { s: 'We ___ go to the party; we are free.', opts: ['can', "can't", 'cans'], a: 0, fb: 'Podemos → "can".' },
      { s: '¿Cuál pregunta es CORRECTA?', opts: ['Do you can swim?', 'Can you swim?', 'Are you can swim?'], a: 1, fb: '"can" no usa "do".' },
      { s: '¿Cuál oración es CORRECTA?', opts: ["She doesn't can drive.", "She can't drive.", 'She not can drive.'], a: 1, fb: 'El negativo de "can" es "can\'t".' },
      { s: '¿Cómo se dice "Sé conducir"?', opts: ['I can to drive.', 'I can drive.', 'I cans drive.'], a: 1, fb: '"I can drive" (sin "to", sin -s).' },
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
      'Las preposiciones de lugar dicen DÓNDE está algo. Las tres básicas, y las que más usarás, son "in" (dentro de), "on" (sobre / en contacto con una superficie) y "under" (debajo de).',
      'A su alrededor hay un grupo de preposiciones de posición muy útiles en el A1: next to (al lado de), behind (detrás de), in front of (delante de), between (entre dos cosas) y near (cerca de). Se colocan antes del lugar: "The cat is under the table".',
      'La gran dificultad para el hispanohablante es "in" vs "on", porque el español usa "en" para las dos. "On the table" (sobre, en contacto) frente a "in the box" (dentro). Aprende a separar ese único "en" en dos ideas.',
    ],
    sections: [
      {
        heading: 'Las tres clave: in, on, under',
        body: [
          '"in" = dentro de un espacio cerrado o delimitado: in the room, in the box, in the car, in my pocket. "on" = en contacto con una superficie: on the table, on the wall, on the floor, on the ceiling. "under" = debajo: under the bed.',
          'El truco mental: el español "en" se reparte entre "in" (dentro) y "on" (encima). Pregúntate si algo está DENTRO o ENCIMA.',
        ],
      },
      {
        heading: 'Posición relativa',
        body: [
          'Para situar una cosa respecto a otra: next to (al lado de), behind (detrás de), in front of (delante de), between (entre dos), near (cerca de). Ojo con dos formas fijas: es "next TO" (con to) e "in front OF" (con of).',
        ],
      },
      {
        heading: 'in / on con transporte (caso idiomático)',
        body: [
          'Con medios de transporte hay una norma fija que conviene memorizar: "on" para transporte donde puedes ir de pie o es público (on the bus, on the train, on a plane, on a bike), e "in" para coches y taxis (in the car, in a taxi).',
        ],
      },
    ],
    table: null,
    tables: [
      {
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
          ['near', 'cerca de', 'near the station'],
        ],
      },
      {
        caption: 'El "en" español se reparte: in vs on',
        headers: ['Idea', 'Preposición', 'Ejemplo'],
        rows: [
          ['dentro de', 'in', 'in the box, in the car'],
          ['sobre una superficie', 'on', 'on the table, on the wall'],
          ['transporte público / bici', 'on', 'on the bus, on a bike'],
          ['coche / taxi', 'in', 'in the car, in a taxi'],
        ],
      },
    ],
    examples: [
      { en: 'The keys are on the table.', es: 'Las llaves están sobre la mesa.', note: 'superficie → on.' },
      { en: 'My bag is in the car.', es: 'Mi bolsa está dentro del carro.', note: 'dentro → in.' },
      { en: 'The cat is under the chair.', es: 'El gato está debajo de la silla.' },
      { en: 'The bank is next to the school.', es: 'El banco está al lado de la escuela.', note: 'siempre "next TO".' },
      { en: 'There is a picture on the wall.', es: 'Hay un cuadro en la pared.', note: 'pared → on (en contacto).' },
      { en: 'I am on the bus right now.', es: 'Estoy en el bus ahora mismo.', note: 'transporte público → on.' },
    ],
    contrast: [
      { es: 'en la mesa (sobre)', en: 'on the table', note: 'superficie → on.' },
      { es: 'en la caja (dentro)', en: 'in the box', note: 'dentro → in.' },
      { es: 'al lado de la puerta', en: 'next to the door', note: 'forma fija: "next TO".' },
      { es: 'en el bus', en: 'on the bus', note: 'transporte público → on.' },
      { es: 'en el carro', en: 'in the car', note: 'coche → in.' },
    ],
    commonMistakes: [
      { wrong: 'The book is in the table.', right: 'The book is on the table.', note: 'Sobre una superficie → on, no in.' },
      { wrong: 'She is on the kitchen.', right: 'She is in the kitchen.', note: 'Dentro de un espacio → in.' },
      { wrong: 'The dog is next the door.', right: 'The dog is next to the door.', note: 'Es "next TO".' },
      { wrong: 'I am in the bus.', right: 'I am on the bus.', note: 'Transporte público → on.' },
      { wrong: 'The lamp is in front the sofa.', right: 'The lamp is in front of the sofa.', note: 'Es "in front OF".' },
    ],
    tip: 'in = dentro (in the room), on = sobre una superficie (on the wall), under = debajo. El "en" español se parte en in/on. Y memoriza: on the bus, pero in the car.',
    questions: [
      { s: 'The pen is ___ the table.', opts: ['on', 'in', 'under'], a: 0, fb: 'Sobre la superficie → "on".' },
      { s: 'The milk is ___ the fridge.', opts: ['on', 'in', 'next'], a: 1, fb: 'Dentro → "in".' },
      { s: 'The ball is ___ the bed. (debajo)', opts: ['on', 'in', 'under'], a: 2, fb: 'Debajo → "under".' },
      { s: 'The car is ___ to the house. (al lado)', opts: ['next', 'in', 'on'], a: 0, fb: '"next to" = al lado de.' },
      { s: 'The dog is ___ the sofa. (detrás)', opts: ['behind', 'on', 'in'], a: 0, fb: 'Detrás → "behind".' },
      { s: 'The bank is ___ of the park. (delante)', opts: ['behind', 'in front', 'under'], a: 1, fb: 'Delante → "in front of".' },
      { s: 'The cat sits ___ the two boxes. (entre)', opts: ['between', 'on', 'in'], a: 0, fb: 'Entre dos → "between".' },
      { s: 'My phone is ___ my pocket.', opts: ['on', 'in', 'under'], a: 1, fb: 'Dentro del bolsillo → "in".' },
      { s: 'There is a park ___ my house. (cerca)', opts: ['near', 'under', 'on'], a: 0, fb: 'Cerca → "near".' },
      { s: 'I am ___ the bus to work.', opts: ['in', 'on', 'at'], a: 1, fb: 'Transporte público → "on the bus".' },
      { s: 'She is waiting ___ the car.', opts: ['in', 'on', 'at'], a: 0, fb: 'Coche → "in the car".' },
      { s: 'The picture is ___ the wall.', opts: ['in', 'on', 'under'], a: 1, fb: 'Pared → "on" (en contacto).' },
      { s: 'The lamp is ___ the sofa. (delante)', opts: ['in front the', 'in front of', 'front of'], a: 1, fb: 'Es "in front OF the sofa".' },
      { s: '¿Cómo se dice "al lado de la puerta"?', opts: ['next the door', 'next to the door', 'near to the door'], a: 1, fb: '"next to the door".' },
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
      'Las preposiciones "in", "on" y "at" también se usan con el tiempo, y cada una tiene su territorio. Es de los temas que más confunde, porque el español reparte "a/en/el" de otra manera, pero con tres reglas y un puñado de excepciones se domina.',
      'La regla base va de lo PEQUEÑO a lo GRANDE: "at" para horas y momentos puntuales (at 7 o\'clock, at noon); "on" para días y fechas (on Monday, on May 5th); "in" para periodos largos: partes del día, meses, estaciones y años (in the morning, in July, in 2025).',
      'Truco visual: imagina un zoom de tiempo. "at" es un punto exacto en el reloj; "on" es una casilla del calendario (un día); "in" es un bloque grande. Cuanto más amplio el periodo, más "grande" la preposición.',
    ],
    sections: [
      {
        heading: 'at = momentos puntuales',
        body: [
          'Se usa con horas (at 6, at 9:30) y con momentos concretos del día: at noon (mediodía), at midnight (medianoche), at the moment. También en algunas expresiones fijas: at the weekend (inglés británico), at Christmas, at Easter.',
        ],
      },
      {
        heading: 'on = días y fechas',
        body: [
          'Se usa con días de la semana (on Monday), fechas (on May 5th), días especiales (on my birthday, on Christmas Day) y con una parte de un día concreto: "on Monday morning", "on Friday night".',
        ],
      },
      {
        heading: 'in = periodos largos (y la excepción "at night")',
        body: [
          'Se usa con partes del día (in the morning, in the afternoon, in the evening), meses (in July), estaciones (in summer), años (in 2025) y siglos.',
          'La excepción más famosa que debes memorizar: "at night", no "in the night". Curiosamente, las demás partes del día sí van con "in".',
        ],
      },
    ],
    table: null,
    tables: [
      {
        caption: 'in / on / at con el tiempo',
        headers: ['Preposición', 'Se usa con', 'Ejemplos'],
        rows: [
          ['at', 'horas, momentos puntuales', "at 8:00, at noon, at midnight"],
          ['on', 'días y fechas', 'on Monday, on my birthday, on May 5th'],
          ['in', 'partes del día, meses, estaciones, años', 'in the morning, in July, in summer, in 2025'],
        ],
      },
      {
        caption: 'Excepciones y casos a memorizar',
        headers: ['Expresión', 'Preposición', 'Nota'],
        rows: [
          ['at night', 'at', 'aunque las demás partes del día usan "in"'],
          ['in the morning / afternoon', 'in', 'partes del día → in'],
          ['on Monday morning', 'on', 'día concreto + parte → on'],
          ['at the weekend (UK)', 'at', 'en inglés americano: "on the weekend"'],
        ],
      },
    ],
    examples: [
      { en: "The class starts at 9 o'clock.", es: 'La clase empieza a las 9 en punto.', note: 'hora → at.' },
      { en: 'I was born on April 12th.', es: 'Nací el 12 de abril.', note: 'fecha → on.' },
      { en: 'We travel in December.', es: 'Viajamos en diciembre.', note: 'mes → in.' },
      { en: 'She studies in the afternoon.', es: 'Ella estudia por la tarde.', note: 'parte del día → in.' },
      { en: 'The stars shine at night.', es: 'Las estrellas brillan de noche.', note: 'excepción famosa → at night.' },
      { en: 'We have a meeting on Monday morning.', es: 'Tenemos una reunión el lunes por la mañana.', note: 'día concreto + parte → on.' },
    ],
    contrast: [
      { es: 'a las 5', en: "at 5 o'clock", note: 'hora → at.' },
      { es: 'el lunes', en: 'on Monday', note: 'día → on.' },
      { es: 'en julio', en: 'in July', note: 'mes → in.' },
      { es: 'por la mañana', en: 'in the morning', note: 'parte del día → in.' },
      { es: 'por la noche', en: 'at night', note: 'excepción: con "at", no "in".' },
    ],
    commonMistakes: [
      { wrong: "I get up in 6 o'clock.", right: "I get up at 6 o'clock.", note: 'Con horas → at.' },
      { wrong: 'My birthday is in Monday.', right: 'My birthday is on Monday.', note: 'Con días → on.' },
      { wrong: 'See you on the morning.', right: 'See you in the morning.', note: 'Partes del día → in.' },
      { wrong: 'I read in the night.', right: 'I read at night.', note: 'Excepción: "at night".' },
      { wrong: 'My birthday is at July.', right: 'My birthday is in July.', note: 'Con meses → in.' },
    ],
    tip: 'at = horas (at 5), on = días (on Friday), in = lo grande (in June, in 2025). Cuanto más amplio el periodo, más "grande" la preposición. Excepción famosa: "at night".',
    questions: [
      { s: 'The meeting is ___ 3 PM.', opts: ['at', 'on', 'in'], a: 0, fb: 'Hora → "at".' },
      { s: 'I have class ___ Monday.', opts: ['at', 'on', 'in'], a: 1, fb: 'Día → "on".' },
      { s: 'My birthday is ___ July.', opts: ['at', 'on', 'in'], a: 2, fb: 'Mes → "in".' },
      { s: 'We wake up early ___ the morning.', opts: ['at', 'on', 'in'], a: 2, fb: 'Parte del día → "in the morning".' },
      { s: 'The stars shine ___ night.', opts: ['at', 'on', 'in'], a: 0, fb: 'Excepción: "at night".' },
      { s: 'She was born ___ 2010.', opts: ['at', 'on', 'in'], a: 2, fb: 'Año → "in".' },
      { s: 'The shop closes ___ midnight.', opts: ['at', 'on', 'in'], a: 0, fb: 'Momento puntual → "at midnight".' },
      { s: 'I visit my family ___ Christmas Day.', opts: ['at', 'on', 'in'], a: 1, fb: 'Día específico → "on Christmas Day".' },
      { s: 'We go to the beach ___ summer.', opts: ['at', 'on', 'in'], a: 2, fb: 'Estación → "in summer".' },
      { s: 'She was born ___ 1998.', opts: ['at', 'on', 'in'], a: 2, fb: 'Año → "in 1998".' },
      { s: "I can't sleep ___ night.", opts: ['at', 'on', 'in'], a: 0, fb: 'Excepción famosa → "at night".' },
      { s: 'The party is ___ Friday evening.', opts: ['at', 'on', 'in'], a: 1, fb: 'Día concreto + parte → "on Friday evening".' },
      { s: 'Leaves fall ___ autumn.', opts: ['at', 'on', 'in'], a: 2, fb: 'Estación → "in autumn".' },
      { s: '¿Cuál oración es CORRECTA?', opts: ['I study in the night.', 'I study at night.', 'I study on night.'], a: 1, fb: 'Excepción: "at night".' },
      { s: '¿Cómo se dice "a las 8 en punto"?', opts: ["in 8 o'clock", "at 8 o'clock", "on 8 o'clock"], a: 1, fb: 'La hora va con "at".' },
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
