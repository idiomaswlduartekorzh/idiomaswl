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
}

export interface GrammarMistake {
  wrong: string;
  right: string;
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
  intro: string[];     // párrafos de explicación
  table: GrammarTable | null;
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
      'En inglés hay dos tipos de artículos: los indefinidos "a" y "an" (equivalen a "un/una") y el definido "the" (equivale a "el/la/los/las"). La diferencia entre "a" y "an" no depende de la letra escrita, sino del SONIDO con que empieza la palabra siguiente.',
      'Usa "a" antes de un sonido consonántico (a dog, a car) y "an" antes de un sonido vocálico (an apple, an hour). Usa "the" cuando hablas de algo específico, ya mencionado o único en su contexto (the sun, the door).',
    ],
    table: {
      caption: 'Cuándo usar cada artículo',
      headers: ['Artículo', 'Cuándo se usa', 'Ejemplo'],
      rows: [
        ['a', 'Antes de sonido consonántico, primera mención', 'a book, a university (suena "yu")'],
        ['an', 'Antes de sonido vocálico', 'an egg, an hour (la "h" es muda)'],
        ['the', 'Algo específico, único o ya mencionado', 'the moon, the teacher'],
        ['— (sin artículo)', 'Plurales/incontables en sentido general', 'I like music, dogs are nice'],
      ],
    },
    examples: [
      { en: 'I have a dog and an old car.', es: 'Tengo un perro y un carro viejo.' },
      { en: 'She is an engineer.', es: 'Ella es ingeniera.' },
      { en: 'The sun is very bright today.', es: 'El sol está muy brillante hoy.' },
      { en: 'I need an umbrella because of the rain.', es: 'Necesito un paraguas por la lluvia.' },
      { en: 'He is a student at the university.', es: 'Él es estudiante en la universidad.' },
    ],
    commonMistakes: [
      { wrong: 'I have an dog.', right: 'I have a dog.', note: '"dog" empieza con sonido consonántico → a.' },
      { wrong: 'She is a engineer.', right: 'She is an engineer.', note: '"engineer" empieza con sonido vocálico → an.' },
      { wrong: 'I am a university student. → "an university"', right: 'a university', note: '"university" suena "yu-", consonántico → a.' },
    ],
    tip: 'Truco: "an" va antes de SONIDO vocal, no de letra vocal. "An hour" (la h es muda), pero "a university" (suena "yu").',
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
      'El verbo "to be" significa "ser" Y "estar" — en inglés es un solo verbo para los dos. Es el verbo más importante del A1: se usa para nombre, nacionalidad, edad, profesión, estados de ánimo y descripciones.',
      'Tiene tres formas en presente: "am" (solo con I), "is" (con he, she, it y sujetos en singular) y "are" (con you, we, they y sujetos en plural). En el habla diaria casi siempre se contrae: I am → I\'m, she is → she\'s, they are → they\'re.',
    ],
    table: {
      caption: 'Conjugación de "to be" en presente',
      headers: ['Sujeto', 'Forma', 'Contracción', 'Ejemplo'],
      rows: [
        ['I', 'am', "I'm", "I'm a student"],
        ['You', 'are', "you're", "you're kind"],
        ['He / She / It', 'is', "he's / she's / it's", "she's happy"],
        ['We', 'are', "we're", "we're from Colombia"],
        ['They', 'are', "they're", "they're friends"],
      ],
    },
    examples: [
      { en: "I'm a teacher.", es: 'Soy profesor/a.' },
      { en: 'She is very kind.', es: 'Ella es muy amable.' },
      { en: 'We are from Colombia.', es: 'Somos de Colombia.' },
      { en: "He isn't at home.", es: 'Él no está en casa.' },
      { en: 'Are you happy?', es: '¿Estás feliz?' },
    ],
    commonMistakes: [
      { wrong: 'I have 20 years.', right: 'I am 20 years old.', note: 'La edad se dice con "to be", no con "have": I am... years old.' },
      { wrong: 'She is have hungry.', right: 'She is hungry.', note: 'No mezcles dos verbos. Solo "is".' },
      { wrong: 'They is friends.', right: 'They are friends.', note: 'Con they/we/you → are.' },
    ],
    tip: 'Nemotecnia: "I am" = solo yo. "He/She/It is" = singular tercera persona. "We/You/They are" = todo lo demás plural.',
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
      'El present simple describe rutinas, hábitos y verdades generales (I work, she studies). La regla más importante para hispanohablantes: con he, she, it el verbo lleva una -s al final (he works).',
      'Para el negativo usamos don\'t (I/you/we/they) y doesn\'t (he/she/it) + el verbo en forma base. Importante: cuando aparece "doesn\'t", el verbo PIERDE la -s (She doesn\'t work, no "doesn\'t works").',
    ],
    table: {
      caption: 'Present simple — afirmativo y negativo',
      headers: ['Sujeto', 'Afirmativo', 'Negativo'],
      rows: [
        ['I / you / we / they', 'work', "don't work"],
        ['he / she / it', 'works (+s)', "doesn't work"],
      ],
    },
    examples: [
      { en: 'I work in a bank.', es: 'Trabajo en un banco.' },
      { en: 'She works in a bank.', es: 'Ella trabaja en un banco. (+s)' },
      { en: "They don't eat meat.", es: 'Ellos no comen carne.' },
      { en: "He doesn't speak French.", es: 'Él no habla francés.' },
      { en: 'The sun rises in the east.', es: 'El sol sale por el este.' },
    ],
    commonMistakes: [
      { wrong: 'She work here.', right: 'She works here.', note: 'Con he/she/it el verbo lleva -s.' },
      { wrong: "He doesn't works.", right: "He doesn't work.", note: 'Con doesn\'t el verbo va en forma base, sin -s.' },
      { wrong: "I doesn't like it.", right: "I don't like it.", note: 'Con I → don\'t, no doesn\'t.' },
    ],
    tip: '"Doesn\'t" ya incluye la negación — el verbo vuelve a su forma base. No digas "She doesn\'t plays" sino "She doesn\'t play".',
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
