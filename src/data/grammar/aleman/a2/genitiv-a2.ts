import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'genitiv-a2',
  order: '09',
  color: '#c9a900',
  category: 'Kasus',
  level: 'A2',
  title: 'Der Genitiv: Besitz und Zugehörigkeit',
  shortTitle: 'Genitiv',
  metaTitle: 'Genitivo en alemán A2 — Posesión con Genitiv',
  description:
    'El Genitiv expresa posesión o pertenencia en alemán. Se forma con un cambio de artículo y, en masculinos y neutros, con un sufijo -(e)s en el sustantivo. También se usa con preposiciones como wegen (a causa de) y trotz (a pesar de). Los nombres propios llevan solo -s final.',
  lead: 'El caso de la posesión: Peters Buch, das Auto meines Vaters, wegen des Wetters.',
  outcomes: [
    'Formar el Genitiv con artículos definidos e indefinidos',
    'Añadir el sufijo -(e)s a sustantivos masculinos y neutros',
    'Usar wegen + Genitiv para expresar causa',
    'Reconocer el Genitiv con nombres propios (-s final)',
  ],

  guide: {
    goal: 'Expresar posesión y causa usando el Genitiv correctamente.',
    model: 'Das ist das Buch meines Vaters. / Peters Hund ist sehr groß. / Wegen des Regens bleibe ich zu Hause.',
    formula: 'Artikel (Genitiv) + Nomen (+(e)s en m/n) / Eigenname + s',
    decisions: [
      'Artículo definido Genitiv: des (m/n), der (f/pl) → das Haus des Mannes, die Tasche der Frau',
      'Artículo indefinido Genitiv: eines (m/n), einer (f) → das Auto eines Freundes, die Idee einer Kollegin',
      'Sustantivos masculinos y neutros añaden -(e)s: des Mannes, des Kindes, des Autos',
      'Sustantivos femeninos y plurales no añaden sufijo al sustantivo: der Frau, der Kinder',
      'Nombres propios: simplemente añadir -s: Peters Buch, Annas Tasche, Deutschlands Hauptstadt',
      'Preposiciones con Genitiv frecuentes en A2: wegen (a causa de), trotz (a pesar de), während (durante)',
    ],
    table: [
      ['Genus', 'Artículo definido', 'Artículo indefinido'],
      ['Maskulin', 'des Mannes', 'eines Mannes'],
      ['Feminin', 'der Frau', 'einer Frau'],
      ['Neutrum', 'des Kindes', 'eines Kindes'],
      ['Plural', 'der Kinder', '— (keiner Kinder)'],
    ],
    mistakes: [
      'Olvidar el -(e)s en masculino/neutro: INCORRECTO "das Buch des Mann" → CORRECTO "das Buch des Mannes"',
      'Añadir -(e)s en femenino: INCORRECTO "die Tasche der Fraues" → CORRECTO "die Tasche der Frau"',
      'Confundir von + Dativ (informal) con Genitiv: Ambos son usados, pero Genitiv es más formal',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el Genitiv en alemán?',
      paragraphs: [
        'El Genitiv tiene dos cambios principales: el artículo y (en masculinos y neutros) el sustantivo. El artículo definido "der" pasa a "des" en masculino y neutro, y a "der" en femenino y plural. El artículo indefinido "ein" pasa a "eines" en masculino/neutro y a "einer" en femenino.',
        'El sustantivo masculino o neutro añade -(e)s al final: "der Mann" → "des Mannes", "das Kind" → "des Kindes", "das Auto" → "des Autos". Los sustantivos femeninos y los plurales no reciben sufijo.',
      ],
    },
    {
      heading: '¿Cómo se usa el Genitiv con nombres propios en alemán?',
      paragraphs: [
        'Los nombres propios forman el Genitiv simplemente añadiendo -s: Peters Hund, Annas Buch, Berlins Mitte. En alemán, a diferencia del español, este -s genitivo nunca va entre comillas ni apostrofes — simplemente se añade al nombre.',
      ],
    },
    {
      heading: '¿Qué preposiciones rigen Genitiv en alemán?',
      paragraphs: [
        'Las preposiciones más frecuentes que rigen Genitiv en A2 son: wegen (a causa de, wegen des Wetters — a causa del tiempo), trotz (a pesar de, trotz des Regens — a pesar de la lluvia), während (durante, während der Ferien — durante las vacaciones). En el habla informal, wegen y trotz a veces se usan con Dativ.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Genitiv: des/der + sufijo -(e)s en masculinos y neutros.',
    graphicPrompt: 'Árbol genealógico con flechas de posesión mostrando los artículos genitivo.',
    scene: [
      ['Das ist das Auto meines Vaters', 'Es el coche de mi padre'],
      ['Die Tasche meiner Mutter ist neu', 'El bolso de mi madre es nuevo'],
      ['Peters Hund ist sehr groß', 'El perro de Peter es muy grande'],
      ['Wegen des Regens bleibe ich zu Hause', 'A causa de la lluvia me quedo en casa'],
      ['Das Buch des Lehrers ist interessant', 'El libro del profesor es interesante'],
      ['Trotz des Wetters gehen wir raus', 'A pesar del tiempo salimos'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['des/der Genitiv', '-(e)s Suffix', 'wegen + Genitiv'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige el artículo correcto en Genitiv.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando del coche del padre',
            lines: [['', 'Das ist das Auto ___ Vaters. (der)']],
            options: ['des', 'dem', 'den', 'der'],
            answer: 'des',
            explain: '"Vater" es masculino. Genitiv masculino: des Vaters.',
          },
          {
            scene: 'La idea de la profesora',
            lines: [['', 'Die Idee ___ Lehrerin ist gut. (die)']],
            options: ['der', 'des', 'dem', 'die'],
            answer: 'der',
            explain: '"Lehrerin" es femenino. Genitiv femenino: der Lehrerin.',
          },
          {
            scene: 'El nombre del niño',
            lines: [['', 'Der Name ___ Kindes ist Max. (das)']],
            options: ['des', 'dem', 'der', 'die'],
            answer: 'des',
            explain: '"Kind" es neutro. Genitiv neutro: des Kindes (+ -es).',
          },
          {
            scene: 'A causa de la lluvia',
            lines: [['', 'Wegen ___ Regens bleiben wir drin. (der)']],
            options: ['des', 'der', 'dem', 'den'],
            answer: 'des',
            explain: '"Regen" es masculino. wegen + Genitiv masculino: des Regens.',
          },
          {
            scene: 'Posesivo de un amigo',
            lines: [['', 'Das ist die Tasche ___ Freundes. (ein)']],
            options: ['eines', 'einen', 'einem', 'einer'],
            answer: 'eines',
            explain: '"Freund" es masculino. Genitiv masculino indefinido: eines Freundes.',
          },
          {
            scene: 'La voz de una cantante',
            lines: [['', 'Die Stimme ___ Sängerin ist wunderschön. (eine)']],
            options: ['einer', 'eines', 'einen', 'einem'],
            answer: 'einer',
            explain: '"Sängerin" es femenino. Genitiv femenino indefinido: einer Sängerin.',
          },
          {
            scene: 'Durante las vacaciones',
            lines: [['', 'Während ___ Ferien bin ich in Spanien. (die — Plural)']],
            options: ['der', 'des', 'dem', 'die'],
            answer: 'der',
            explain: '"Ferien" es plural. Genitiv plural: der Ferien.',
          },
          {
            scene: 'Posesivo de un nombre propio',
            lines: [['', "___ Buch liegt auf dem Tisch. (Anna)"]],
            options: ['Annas', 'Anna', 'Annen', 'Annaes'],
            answer: 'Annas',
            explain: 'Nombres propios forman el Genitiv añadiendo -s: Annas Buch.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa el artículo Genitiv y el sufijo del sustantivo.',
        type: 'dual',
        items: [
          {
            scene: 'El final de la historia',
            lines: [['', 'Das Ende [[0]] Geschichte[[1]] war traurig. (die Geschichte)']],
            blanks: [
              { options: ['der', 'des', 'die', 'dem'], answer: 'der', explain: '"Geschichte" es femenino. Genitiv femenino: der.' },
              { options: ['', 's', 'es', 'en'], answer: '', explain: 'Los sustantivos femeninos no llevan sufijo en Genitiv.' },
            ],
          },
          {
            scene: 'El nombre del perro',
            lines: [['', 'Der Name [[0]] Hund[[1]] ist Bello. (der Hund)']],
            blanks: [
              { options: ['des', 'der', 'dem', 'den'], answer: 'des', explain: '"Hund" es masculino. Genitiv masculino: des.' },
              { options: ['es', 's', '', 'en'], answer: 'es', explain: 'Masculinos añaden -(e)s en Genitiv: des Hundes.' },
            ],
          },
          {
            scene: 'A pesar del cansancio',
            lines: [['', 'Trotz [[0]] Müdigkeit[[1]] arbeite ich weiter. (die Müdigkeit)']],
            blanks: [
              { options: ['der', 'des', 'dem', 'die'], answer: 'der', explain: '"Müdigkeit" es femenino. trotz + Genitiv femenino: der.' },
              { options: ['', 's', 'es', 'en'], answer: '', explain: 'Sustantivos femeninos no añaden sufijo en Genitiv.' },
            ],
          },
          {
            scene: 'El color del coche',
            lines: [['', 'Die Farbe [[0]] Auto[[1]] ist rot. (das Auto)']],
            blanks: [
              { options: ['des', 'der', 'dem', 'die'], answer: 'des', explain: '"Auto" es neutro. Genitiv neutro: des.' },
              { options: ['s', 'es', '', 'en'], answer: 's', explain: 'Neutros monosílabos o con vocal final añaden -s: des Autos.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el texto con las formas correctas de Genitiv.',
        type: 'guidedText',
        scene: 'María habla de la familia de su amiga.',
        text: 'Das Haus [[0]] Familie ist sehr groß. Das Zimmer [[1]] Bruders hat ein großes Fenster. Wegen [[2]] Arbeit ist der Vater oft weg. Der Hund [[3]] Schwester heißt Bello. Das Auto [[4]] Eltern ist neu.',
        blanks: [
          { options: ['der', 'des', 'dem', 'die'], answer: 'der', explain: '"Familie" es femenino. Genitiv femenino: der Familie.' },
          { options: ['des', 'der', 'dem', 'die'], answer: 'des', explain: '"Bruder" es masculino. Genitiv masculino: des Bruders.' },
          { options: ['der', 'des', 'dem', 'die'], answer: 'der', explain: '"Arbeit" es femenino. wegen + Genitiv femenino: der Arbeit.' },
          { options: ['der', 'des', 'dem', 'die'], answer: 'der', explain: '"Schwester" es femenino. Genitiv femenino: der Schwester.' },
          { options: ['der', 'des', 'dem', 'die'], answer: 'der', explain: '"Eltern" es plural. Genitiv plural: der Eltern.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de Genitiv sin opciones.',
        type: 'freeText',
        scene: 'Luis describe la ciudad de su amigo.',
        text: 'Das ist die Hauptstadt [[0]] Landes. Die Straßen [[1]] Stadt sind sehr breit. Wegen [[2]] Wetters tragen alle Jacken. Das Museum [[3]] Königs ist bekannt. Der Park [[4]] Schule ist sehr schön.',
        blanks: [
          { answer: 'des', accepted: ['des'], explain: '"Land" es neutro. Genitiv neutro: des Landes.' },
          { answer: 'der', accepted: ['der'], explain: '"Stadt" es femenino. Genitiv femenino: der Stadt.' },
          { answer: 'des', accepted: ['des'], explain: '"Wetter" es neutro. wegen + Genitiv neutro: des Wetters.' },
          { answer: 'des', accepted: ['des'], explain: '"König" es masculino. Genitiv masculino: des Königs.' },
          { answer: 'der', accepted: ['der'], explain: '"Schule" es femenino. Genitiv femenino: der Schule.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones usando el Genitiv para expresar posesión o causa.',
        type: 'write',
        items: [
          {
            scene: 'El libro de un compañero',
            prompt: 'Di a quién pertenece un libro, usando el Genitiv (Das ist das Buch...).',
            answer: 'Das ist das Buch meines Freundes.',
            accepted: ['des Freundes', 'der Freundin', 'meines Vaters', 'meiner Mutter'],
            explain: 'Masculino/neutro: des + Nomen + -(e)s. Femenino/plural: der + Nomen.',
          },
          {
            scene: 'Expresando causa con wegen',
            prompt: 'Di la razón por la que no fuiste a clase (usa wegen + Genitiv).',
            answer: 'Wegen der Krankheit bin ich nicht zur Schule gegangen.',
            accepted: ['wegen der', 'wegen des', 'Wegen des', 'Wegen der'],
            explain: 'wegen + Genitiv: wegen der Krankheit (f), wegen des Wetters (n), wegen des Verkehrs (m).',
          },
          {
            scene: 'El nombre de alguien famoso',
            prompt: 'Di algo que le pertenece a una persona famosa usando el nombre + -s.',
            answer: 'Das ist Beethovens Musik.',
            accepted: ["Beethovens", "Mozarts", "Goethes", "Shakespeares"],
            explain: 'Nombres propios + -s genitivo: Beethovens Musik, Mozarts Symphonien, Goethes Gedichte.',
          },
          {
            scene: 'A pesar de algo',
            prompt: 'Di que hiciste algo a pesar de un obstáculo (trotz + Genitiv).',
            answer: 'Trotz des Regens gehen wir spazieren.',
            accepted: ['trotz des', 'trotz der', 'Trotz des', 'Trotz der'],
            explain: 'trotz + Genitiv: trotz des Regens (m), trotz der Müdigkeit (f), trotz des Problems (n).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Escribe sobre posesión o causas usando el Genitiv de forma natural.',
        type: 'write',
        items: [
          {
            scene: 'Describir la habitación de alguien',
            prompt: 'Escribe 2-3 oraciones sobre el cuarto de un familiar usando el Genitiv.',
            answer: 'Das Zimmer meines Bruders ist sehr groß. Die Farbe der Wände ist blau. Das Fenster des Zimmers geht auf den Garten.',
            accepted: ['meines Bruders', 'meiner Schwester', 'des Zimmers', 'der Wände'],
            explain: 'Genitiv: des + m/n con -(e)s; der + f/pl sin sufijo.',
          },
          {
            scene: 'Hablar de la ciudad de origen',
            prompt: 'Describe tu ciudad o la ciudad de un amigo usando 2-3 Genitiv.',
            answer: 'Die Straßen meiner Stadt sind sehr belebt. Das Museum der Stadt ist bekannt. Wegen des Klimas ist es immer warm.',
            accepted: ['meiner Stadt', 'des Klimas', 'der Stadt', 'wegen des'],
            explain: 'Genitiv de posesión + wegen/trotz/während + Genitiv.',
          },
          {
            scene: 'Dar explicaciones con wegen',
            prompt: 'Di tres cosas que hiciste o no hiciste hoy a causa de algo (wegen).',
            answer: 'Wegen des Regens bin ich zu Hause geblieben. Wegen der Arbeit habe ich nicht geschlafen. Wegen des Wetters trage ich eine Jacke.',
            accepted: ['wegen des', 'wegen der', 'Wegen des', 'Wegen der'],
            explain: 'wegen + Genitiv: des (m/n) oder der (f/pl).',
          },
        ],
      },
    ],
  },
}

export default topic
