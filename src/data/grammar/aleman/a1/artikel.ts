import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'artikel',
  order: '04',
  color: '#b45309',
  category: 'Nomen',
  level: 'A1',
  title: 'Die Artikel im Deutschen A1',
  shortTitle: 'Artikel',
  metaTitle: 'Artikel Deutsch A1 — der, die, das, ein, eine, kein',
  description:
    'El alemán tiene tres géneros (masculino/femenino/neutro) y dos tipos de artículo: definido (der/die/das) e indefinido (ein/eine/ein). El género gramatical debe memorizarse con cada sustantivo, pues no sigue reglas perfectamente predecibles.',
  lead: 'Tres géneros, dos artículos: der (m), die (f), das (n) — definidos; ein/eine/ein — indefinidos. El género del alemán debe aprenderse con cada palabra.',
  outcomes: ['Usa der/die/das correctamente', 'Usa ein/eine/ein', 'Reconoce el género gramatical'],

  guide: {
    goal: 'Usar los artículos definidos e indefinidos del alemán en tres géneros.',
    model: 'Der Mann, die Frau, das Kind. / Ein Tisch, eine Lampe, ein Buch.',
    formula: 'Artículo (género) + sustantivo',
    decisions: [
      'Género masculino (der): der Mann, der Tisch, der Hund',
      'Género femenino (die): die Frau, die Lampe, die Stadt',
      'Género neutro (das): das Kind, das Buch, das Haus',
      'Plural → siempre "die" (todos los géneros): die Männer, die Frauen, die Kinder',
      'Indefinido: ein (m/n) / eine (f): ein Mann, eine Frau, ein Kind',
    ],
    table: [
      ['', 'Masculino', 'Femenino'],
      ['Definido', 'der', 'die'],
      ['Indefinido', 'ein', 'eine'],
      ['Negación', 'kein', 'keine'],
    ],
    mistakes: [
      'No existe "eine" para neutro: "ein Kind" no "eine Kind"',
      'El plural siempre usa "die", independientemente del género',
      'El género no se deduce de la semántica: das Mädchen (la chica) es neutro',
    ],
  },

  seo: [
    {
      heading: '¿Cuáles son los géneros del alemán?',
      paragraphs: [
        'El alemán tiene tres géneros gramaticales: masculino (der), femenino (die) y neutro (das). El artículo definido refleja este género directamente. Al contrario del español (solo masculino/femenino), en alemán hay que memorizar un tercer género: das Haus (la casa, neutro), das Auto (el coche, neutro), das Kind (el niño, neutro).',
        'La regla de oro: aprende siempre el sustantivo con su artículo: no "Tisch" sino "der Tisch"; no "Lampe" sino "die Lampe"; no "Buch" sino "das Buch". Esto es esencial porque el artículo cambia en los casos gramaticales (Nominativ, Akkusativ, Dativ).',
      ],
    },
    {
      heading: '¿Cómo son los artículos definidos en alemán (der, die, das)?',
      paragraphs: [
        'Der (masculino): der Mann (el hombre), der Tisch (la mesa), der Hund (el perro). Die (femenino): die Frau (la mujer), die Lampe (la lámpara), die Stadt (la ciudad). Das (neutro): das Kind (el niño), das Buch (el libro), das Haus (la casa).',
        'El plural de todos los géneros usa "die": die Männer (los hombres), die Frauen (las mujeres), die Kinder (los niños). Así que "die" puede ser femenino singular O plural de cualquier género — el contexto aclara.',
      ],
    },
    {
      heading: '¿Cómo son los artículos indefinidos en alemán (ein, eine)?',
      paragraphs: [
        '"Ein" para masculino y neutro: ein Mann (un hombre), ein Kind (un niño). "Eine" solo para femenino: eine Frau (una mujer), eine Stadt (una ciudad). No existe artículo indefinido plural en alemán — se omite o se usa "einige" (algunos).',
        'Para la negación: kein (masculino/neutro) y keine (femenino/plural): kein Mann, keine Frau, kein Kind, keine Kinder. Este kein/keine reemplaza al "no tengo un/una" del español.',
      ],
    },
    {
      heading: 'Patrones útiles para adivinar el género',
      paragraphs: [
        'Aunque no hay reglas perfectas, algunos patrones ayudan: Masculino (der): días, meses, estaciones, -er/-ismus/-ling (der Lehrer, der Kommunismus, der Frühling). Femenino (die): -ung/-keit/-heit/-ion/-tät/-schaft (die Wohnung, die Freiheit, die Nation). Neutro (das): -chen/-lein (diminutivos), -ment/-um/-tum (das Mädchen, das Instrument, das Museum).',
        'Pero hay muchas excepciones — la mejor estrategia es memorizar cada sustantivo con su artículo desde el primer día.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Tres géneros alemanes: der/die/das definidos y ein/eine indefinidos.',
    graphicPrompt: 'Tabla de artículos con ejemplos y patrones de género.',
    scene: [
      ['der (masc.)', 'der Tisch, der Hund, der Mann'],
      ['die (fem.)', 'die Lampe, die Frau, die Stadt'],
      ['das (neut.)', 'das Kind, das Buch, das Haus'],
      ['die (plural)', 'die Tische, die Frauen, die Kinder'],
      ['ein/eine/ein', 'ein Mann, eine Frau, ein Kind'],
      ['kein/keine', 'kein Auto, keine Zeit, kein Geld'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['3 géneros', 'ein vs eine', 'plural = die'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige el artículo definido correcto (der/die/das).',
        type: 'choice',
        items: [
          { scene: 'Describiendo personas', lines: [['', '___ Mann ist groß. (el hombre)']], options: ['Der', 'Die', 'Das', 'Ein'], answer: 'Der', explain: '"Mann" = masculino → "der Mann".' },
          { scene: 'Describiendo personas', lines: [['', '___ Frau ist nett. (la mujer)']], options: ['Die', 'Der', 'Das', 'Eine'], answer: 'Die', explain: '"Frau" = femenino → "die Frau".' },
          { scene: 'Hablando de niños', lines: [['', '___ Kind spielt draußen. (el niño)']], options: ['Das', 'Der', 'Die', 'Ein'], answer: 'Das', explain: '"Kind" = neutro → "das Kind".' },
          { scene: 'En la biblioteca', lines: [['', 'Ich lese ___ Buch. (el libro)']], options: ['das', 'der', 'die', 'ein'], answer: 'das', explain: '"Buch" = neutro → "das Buch".' },
          { scene: 'Hablando de la ciudad', lines: [['', '___ Stadt ist sehr schön. (la ciudad)']], options: ['Die', 'Der', 'Das', 'Eine'], answer: 'Die', explain: '"Stadt" = femenino (-t... a memorizar o terminación -ung sería -ung; Stadt es irregular).' },
          { scene: 'Presentando una mascota', lines: [['', '___ Hund heißt Bello. (el perro)']], options: ['Der', 'Die', 'Das', 'Ein'], answer: 'Der', explain: '"Hund" = masculino → "der Hund".' },
          { scene: 'En el parque', lines: [['', '___ Kinder spielen zusammen. (los niños, plural)']], options: ['Die', 'Der', 'Das', 'Eine'], answer: 'Die', explain: 'Plural siempre → "die". "Die Kinder".' },
          { scene: 'Presentándose', lines: [['', 'Ich habe ___ Schwester. (una hermana)']], options: ['eine', 'ein', 'der', 'die'], answer: 'eine', explain: '"Schwester" = femenino → artículo indefinido "eine Schwester".' },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa con artículo definido e indefinido.',
        type: 'dual',
        items: [
          {
            scene: 'En casa, hablando de muebles',
            lines: [['', '[[0]] Tisch ist kaputt. Kaufen wir [[1]] neuen Tisch?']],
            blanks: [
              { options: ['Der', 'Die', 'Das', 'Ein'], answer: 'Der', explain: '"Tisch" = masculino → "der Tisch".' },
              { options: ['einen', 'ein', 'eine', 'der'], answer: 'einen', explain: '"Tisch" masculino en acusativo (nach kaufen) → "einen". (Akkusativ: der → einen)' },
            ],
          },
          {
            scene: 'En la biblioteca',
            lines: [['', '[[0]] Buch ist interessant. Hast du [[1]] Buch?']],
            blanks: [
              { options: ['Das', 'Der', 'Die', 'Ein'], answer: 'Das', explain: '"Buch" = neutro → "das Buch".' },
              { options: ['ein', 'eine', 'einen', 'das'], answer: 'ein', explain: '"Buch" neutro indefinido → "ein Buch".' },
            ],
          },
          {
            scene: 'Hablando de mascotas',
            lines: [['', '[[0]] Katze schläft. Hast du [[1]] Katze?']],
            blanks: [
              { options: ['Die', 'Der', 'Das', 'Eine'], answer: 'Die', explain: '"Katze" = femenino → "die Katze".' },
              { options: ['eine', 'ein', 'einen', 'die'], answer: 'eine', explain: '"Katze" femenino indefinido → "eine Katze".' },
            ],
          },
          {
            scene: 'Hablando de transporte',
            lines: [['', 'Ich habe [[0]] Auto, aber [[1]] Auto ist sehr alt.']],
            blanks: [
              { options: ['ein', 'eine', 'einen', 'das'], answer: 'ein', explain: '"Auto" = neutro indefinido → "ein Auto".' },
              { options: ['das', 'der', 'die', 'ein'], answer: 'das', explain: 'Ya conocido → artículo definido "das Auto".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa con der/die/das/ein/eine.',
        type: 'guidedText',
        scene: 'Completa con der/die/das/ein/eine.',
        text: '[[0]] Wohnung ist sehr schön. Es gibt [[1]] großes Wohnzimmer, [[2]] Küche und zwei Schlafzimmer. [[3]] Küche hat [[4]] modernen Herd. Im Wohnzimmer steht [[5]] großer Tisch. [[6]] Wohnung liegt im dritten Stock.',
        blanks: [
          { options: ['Die', 'Der', 'Das', 'Eine'], answer: 'Die', explain: '"Wohnung" = femenino (-ung) → "die Wohnung".' },
          { options: ['ein', 'eine', 'einen', 'das'], answer: 'ein', explain: '"Wohnzimmer" = neutro → "ein Wohnzimmer".' },
          { options: ['eine', 'ein', 'der', 'die'], answer: 'eine', explain: '"Küche" = femenino → "eine Küche".' },
          { options: ['Die', 'Der', 'Das', 'Eine'], answer: 'Die', explain: '"Die Küche" — ya conocida, artículo definido.' },
          { options: ['einen', 'ein', 'eine', 'der'], answer: 'einen', explain: '"Herd" (der Herd) en acusativo → "einen modernen Herd".' },
          { options: ['ein', 'eine', 'einen', 'das'], answer: 'ein', explain: '"Tisch" = masculino, indefinido → en acusativo "einen", pero aquí "ein großer Tisch" nominativo.' },
          { options: ['Die', 'Der', 'Das', 'Eine'], answer: 'Die', explain: '"Die Wohnung" — artículo definido, ya mencionada.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Elige der, die, das, ein, eine o kein/keine.',
        type: 'freeText',
        scene: 'Elige der, die, das, ein, eine o kein/keine.',
        text: 'In meiner Stadt gibt es [[0]] Museum, [[1]] Universität und [[2]] großen Park. [[3]] Park ist sehr schön. Leider gibt es [[4]] Strand — wir sind nicht am Meer.',
        blanks: [
          { answer: 'ein', accepted: ['ein'], explain: '"Museum" = neutro → "ein Museum".' },
          { answer: 'eine', accepted: ['eine'], explain: '"Universität" = femenino (-tät) → "eine Universität".' },
          { answer: 'einen', accepted: ['einen', 'ein'], explain: '"Park" = masculino en acusativo (nach "gibt es") → "einen Park".' },
          { answer: 'Der', accepted: ['der', 'Der'], explain: '"Der Park" — ya mencionado, artículo definido.' },
          { answer: 'keinen', accepted: ['keinen', 'kein'], explain: '"Strand" = masculino negado → "keinen Strand".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones usando artículos correctos.',
        type: 'write',
        items: [
          {
            scene: 'Describiendo tu ciudad',
            prompt: 'Describe algo que hay en tu ciudad usando "es gibt ein/eine/einen...".',
            answer: 'In meiner Stadt gibt es ein Museum und eine Universität.',
            accepted: ['es gibt ein', 'es gibt eine', 'es gibt einen'],
            explain: 'Ejemplo: Es gibt einen Park, eine Kirche und ein Rathaus.',
          },
          {
            scene: 'En tu habitación',
            prompt: 'Describe un objeto de tu habitación con der/die/das.',
            answer: 'Der Tisch ist aus Holz.',
            accepted: ['der ', 'die ', 'das '],
            explain: 'Ejemplo: Das Buch liegt auf dem Tisch. / Die Lampe ist kaputt.',
          },
          {
            scene: 'Hablando de posesiones',
            prompt: 'Di que tienes algo (ein/eine) y después especifícalo (der/die/das).',
            answer: 'Ich habe ein Fahrrad. Das Fahrrad ist neu.',
            accepted: ['ein ', 'eine ', 'das ', 'der ', 'die '],
            explain: 'Primero: indefinido (ein/eine). Luego: definido (der/die/das). Ejemplo: Ich habe eine Katze. Die Katze ist schwarz.',
          },
          {
            scene: 'Hablando de lo que no tienes',
            prompt: 'Di algo que NO tienes usando kein/keine.',
            answer: 'Ich habe kein Auto und keinen Hund.',
            accepted: ['kein ', 'keine ', 'keinen '],
            explain: 'Negación: kein + neutro/masculino, keine + femenino/plural. Ejemplo: Ich habe keine Geschwister.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikative Aufgabe',
        tag: 'Producción',
        intro: 'Describe tu habitación con artículos correctos.',
        type: 'write',
        items: [
          {
            scene: 'Describiendo tu habitación',
            prompt: 'Presenta tu habitación usando "ein/eine/ein" para 2-3 objetos.',
            answer: 'In meinem Zimmer gibt es ein Bett, einen Schreibtisch und eine Lampe.',
            accepted: ['ein ', 'eine ', 'einen '],
            explain: 'Ejemplo: Ich habe ein Bett, eine Lampe und einen Tisch in meinem Zimmer.',
          },
          {
            scene: 'Describiendo objetos concretos',
            prompt: 'Describe uno de esos objetos con el artículo definido.',
            answer: 'Der Schreibtisch ist groß und aus Holz.',
            accepted: ['der ', 'die ', 'das '],
            explain: 'Usa "der/die/das" para el objeto ya mencionado. Ejemplo: Das Bett ist sehr bequem.',
          },
          {
            scene: 'Lo que falta en tu habitación',
            prompt: 'Di qué NO hay en tu habitación usando kein/keine.',
            answer: 'Leider gibt es kein Fenster und keine Klimaanlage.',
            accepted: ['kein ', 'keine ', 'keinen '],
            explain: 'Ejemplo: Ich habe kein Sofa in meinem Zimmer. / Es gibt keine Klimaanlage.',
          },
        ],
      },
    ],
  },
}

export default topic
