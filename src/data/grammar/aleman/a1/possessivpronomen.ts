import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'possessivpronomen',
  order: '10',
  color: '#c9a900',
  category: 'Pronomen',
  level: 'A1',
  title: 'Possessivpronomen im Deutschen A1',
  shortTitle: 'Possessivpronomen',
  metaTitle: 'Pronombres posesivos alemán A1 — mein, dein, sein, ihr, unser, euer',
  description:
    'Los pronombres posesivos alemanes funcionan como determinantes del sustantivo y se declinan en género y número. Los más confusos para hispanohablantes son "sein" (su, de él) e "ihr" (su, de ella), que suenan iguales a pronombres personales. Además, "Ihr" (mayúscula) significa "su" de usted formal.',
  lead: 'Mein/meine, dein/deine, sein/seine, ihr/ihre... Los posesivos alemanes se declinan como "ein". La gran trampa: sein = de él, ihr = de ella, Ihr = de usted.',
  outcomes: [
    'Usas mein/meine y dein/deine correctamente según el género del sustantivo',
    'Distingues sein (de él) de ihr (de ella) e Ihr (usted formal)',
    'Declinas los posesivos en nominativo (masc/fem/neut/pl)',
  ],

  guide: {
    goal: 'Usar pronombres posesivos alemanes en nominativo singular y plural.',
    model: 'Mein Bruder, meine Schwester, mein Kind. / Sein Vater, ihre Mutter.',
    formula: 'Posesivo (género del sustantivo poseído) + Sustantivo',
    decisions: [
      'mein/meine (ich → mi/mis): mein Buch, meine Tasche, mein Haus',
      'dein/deine (du → tu/tus): dein Freund, deine Familie',
      'sein/seine (er → su, de él): sein Chef, seine Frau',
      'ihr/ihre (sie → su, de ella): ihr Mann, ihre Tochter',
      'unser/unsere (wir → nuestro/a): unser Lehrer, unsere Klasse',
      'euer/eure (ihr → vuestro/a): euer Kurs, eure Wohnung',
      'ihr/ihre (sie plural → su, de ellos): ihr Haus, ihre Kinder',
      'Ihr/Ihre (Sie formal → su, de usted): Ihr Name, Ihre Adresse',
    ],
    table: [
      ['Pronombre', 'Masculino/Neutro', 'Femenino/Plural'],
      ['ich', 'mein', 'meine'],
      ['du', 'dein', 'deine'],
      ['er/es', 'sein', 'seine'],
      ['sie (ella)', 'ihr', 'ihre'],
    ],
    mistakes: [
      '"Sein Schwester" ❌ — "Schwester" es femenino → "seine Schwester" ✓',
      'Confundir "ihr" (de ella) con "ihr" (a vosotros) — depende del contexto',
      '"Unser Klasse" ❌ — "Klasse" es femenino → "unsere Klasse" ✓',
      '"Ihr" (mayúscula) = formal usted, no de ella (minúscula)',
    ],
  },

  seo: [
    {
      heading: 'Los posesivos alemanes: declinados como "ein"',
      paragraphs: [
        'Los pronombres posesivos alemanes (mein, dein, sein, ihr, unser, euer, ihr, Ihr) se comportan como determinantes: se añaden directamente antes del sustantivo y se declinan según el género de ese sustantivo. En nominativo: mein (masculino/neutro), meine (femenino y plural).',
        'Este sistema es similar al de "ein/eine": donde pondrías "ein" pones "mein", donde pondrías "eine" pones "meine". Así: ein Bruder → mein Bruder, eine Schwester → meine Schwester, ein Kind → mein Kind, Kinder (plural) → meine Kinder.',
      ],
    },
    {
      heading: 'La trampa de sein e ihr para hispanohablantes',
      paragraphs: [
        '"Sein" significa "su" cuando el poseedor es masculino (él/es): sein Bruder (su hermano, de él), seine Mutter (su madre, de él). "Ihr" significa "su" cuando la poseedora es femenina (ella): ihr Bruder (su hermano, de ella), ihre Mutter (su madre, de ella).',
        'El problema: en español "su" es ambiguo (puede referirse a él, ella, usted, ellos). En alemán hay una palabra distinta para cada caso. Y añade confusión que "ihr" también es el pronombre personal de "vosotros" y que "Ihr" (mayúscula) es la forma de cortesía formal. El contexto y la mayúscula resuelven la ambigüedad.',
      ],
    },
    {
      heading: 'Unser y euer: los posesivos de plural informal',
      paragraphs: [
        '"Unser" (nuestro) se usa para wir: unser Lehrer (nuestro profesor), unsere Klasse (nuestra clase). "Euer" (vuestro) se usa para ihr: euer Kurs (vuestro curso), eure Wohnung (vuestra piso). Nota: euer pierde la -e- interna cuando añade terminación: euer → eure (no "euere").',
        '"Ihr" (plural, ellos/ellas) e "Ihr" (usted formal) comparten grafía excepto en la mayúscula inicial — en medio de frase, "Ihr" siempre formal y "ihr" siempre de ellos/ellas.',
      ],
    },
    {
      heading: 'Estrategia práctica: género del poseído, no del poseedor',
      paragraphs: [
        'La terminación del posesivo depende del GÉNERO DEL SUSTANTIVO POSEÍDO, no del poseedor. "Mein Bruder" (mi hermano) → masculino → mein. "Meine Schwester" (mi hermana) → femenino → meine. "Mein Kind" (mi hijo) → neutro → mein. "Meine Kinder" (mis hijos) → plural → meine.',
        'Esta regla aplica igual para sein/seine: "sein Bruder" (su hermano, de él) → masc → sein. "Seine Schwester" (su hermana, de él) → fem → seine. El posesivo siempre concuerda con lo poseído.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Posesivos alemanes: tabla completa y trampa sein/ihr/Ihr.',
    graphicPrompt: 'Tabla de posesivos con columnas para masculino/neutro y femenino/plural.',
    scene: [
      ['mein/meine (ich)', 'mein Vater, meine Mutter, mein Kind'],
      ['dein/deine (du)', 'dein Freund, deine Freundin'],
      ['sein/seine (er)', 'sein Bruder, seine Schwester ← de él'],
      ['ihr/ihre (sie)', 'ihr Mann, ihre Tochter ← de ella'],
      ['unser/unsere (wir)', 'unser Lehrer, unsere Klasse'],
      ['Ihr/Ihre (Sie formal)', 'Ihr Name, Ihre Adresse ← cortesía'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['mein=m/n, meine=f/pl', 'sein=de él, ihr=de ella', 'Ihr mayúscula=formal'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige el posesivo correcto según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Carlos habla de su madre',
            lines: [['Carlos', '___ Mutter wohnt in Bogotá. (mi madre)']],
            options: ['Meine', 'Mein', 'Deine', 'Sein'],
            answer: 'Meine',
            explain: '"Mutter" = femenino → "meine Mutter". Posesivo de ich + género femenino.',
          },
          {
            scene: 'Hugo habla del trabajo de un colega',
            lines: [['Hugo', '___ Kollege spricht fünf Sprachen. (su colega, de él)']],
            options: ['Sein', 'Ihre', 'Ihr', 'Seine'],
            answer: 'Sein',
            explain: '"Kollege" = masculino, poseedor = er → "sein Kollege". Sein + masculino = sein (sin -e).',
          },
          {
            scene: 'Ana habla de la hermana de Sara',
            lines: [['Ana', '___ Schwester lebt in Kiew. (su hermana, de ella)']],
            options: ['Ihre', 'Seine', 'Sein', 'Ihr'],
            answer: 'Ihre',
            explain: '"Schwester" = femenino, poseedora = sie (ella) → "ihre Schwester". Ihr + femenino = ihre.',
          },
          {
            scene: 'Lina habla con sus amigos',
            lines: [['Lina', '___ Kurs beginnt um 9 Uhr. (nuestro curso)']],
            options: ['Unser', 'Unsere', 'Euer', 'Ihr'],
            answer: 'Unser',
            explain: '"Kurs" = masculino, wir → "unser Kurs". Unser + masculino = unser (sin -e).',
          },
          {
            scene: 'Sara le pregunta a dos estudiantes',
            lines: [['Sara', 'Wie ist ___ Klasse? (vuestra clase)']],
            options: ['eure', 'euer', 'unser'],
            answer: 'eure',
            explain: '"Klasse" = femenino, ihr (vosotros) → "eure Klasse". Euer + femenino = eure.',
          },
          {
            scene: 'Marco presenta a su hermano',
            lines: [['Marco', 'Das ist ___ Bruder. (mi hermano)']],
            options: ['mein', 'meine', 'dein', 'sein'],
            answer: 'mein',
            explain: '"Bruder" = masculino, ich → "mein Bruder". Mein + masculino = mein (sin -e).',
          },
          {
            scene: 'Sofía pregunta por el apellido de Hugo (formal)',
            lines: [['Sofía', 'Wie ist ___ Familienname, Herr Duarte? (su apellido, formal)']],
            options: ['Ihr', 'Ihre', 'Sein', 'Dein'],
            answer: 'Ihr',
            explain: '"Familienname" = masculino, cortesía formal → "Ihr Familienname". Ihr (mayúscula) + masculino = Ihr.',
          },
          {
            scene: 'Ana habla de los hijos de una pareja',
            lines: [['Ana', '___ Kinder sind sehr nett. (sus hijos, de ellos)']],
            options: ['Ihre', 'Sein', 'Seine', 'Ihr'],
            answer: 'Ihre',
            explain: '"Kinder" = plural, sie (ellos) → "ihre Kinder". Ihr + plural = ihre.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Sein o ihre?',
        tag: '2 espacios',
        intro: 'Completa con el posesivo correcto para él y para ella.',
        type: 'dual',
        items: [
          {
            scene: 'Hugo y Sara hablan de sus familias',
            lines: [['', 'Hugo: [[0]] Vater ist Arzt. / Sara: [[1]] Vater ist Musiker.']],
            blanks: [
              { options: ['Sein', 'Ihr', 'Ihre', 'Seine'], answer: 'Sein', explain: '"Vater" = masculino, poseedor Hugo (er) → "sein Vater".' },
              { options: ['Ihr', 'Sein', 'Ihre', 'Seine'], answer: 'Ihr', explain: '"Vater" = masculino, poseedora Sara (sie) → "ihr Vater". Ihr + masculino = ihr (sin -e).' },
            ],
          },
          {
            scene: 'Hablando de Carlos y Ana',
            lines: [['', 'Carlos: [[0]] Wohnung ist klein. / Ana: [[1]] Wohnung ist groß.']],
            blanks: [
              { options: ['Seine', 'Sein', 'Ihre', 'Ihr'], answer: 'Seine', explain: '"Wohnung" = femenino, Carlos (er) → "seine Wohnung".' },
              { options: ['Ihre', 'Ihr', 'Sein', 'Seine'], answer: 'Ihre', explain: '"Wohnung" = femenino, Ana (sie) → "ihre Wohnung".' },
            ],
          },
          {
            scene: 'Marco habla de sus hermanos',
            lines: [['', '[[0]] Bruder studiert Informatik. [[1]] Schwester arbeitet als Lehrerin.']],
            blanks: [
              { options: ['Mein', 'Meine', 'Dein', 'Sein'], answer: 'Mein', explain: '"Bruder" = masculino, ich → "mein Bruder".' },
              { options: ['Meine', 'Mein', 'Deine', 'Ihre'], answer: 'Meine', explain: '"Schwester" = femenino, ich → "meine Schwester".' },
            ],
          },
          {
            scene: 'Sara habla con un grupo de estudiantes',
            lines: [['Sara', '[[0]] Hausaufgaben sind sehr gut! Und [[1]] Prüfung ist morgen.']],
            blanks: [
              { options: ['Eure', 'Euer', 'Unsere', 'Ihre'], answer: 'Eure', explain: '"Hausaufgaben" = plural, ihr (vosotros) → "eure Hausaufgaben".' },
              { options: ['Eure', 'Euer', 'Unsere', 'Ihre'], answer: 'Eure', explain: '"Prüfung" = femenino, ihr (vosotros) → "eure Prüfung".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los posesivos correctos.',
        type: 'guidedText',
        scene: 'Presentaciones en la clase de WeLearn.',
        text: 'Ich bin Carlos. [[0]] Familie lebt in Medellín. [[1]] Vater ist Ingenieur. [[2]] Mutter ist Lehrerin. Das ist Ana. [[3]] Freund heißt Pedro. [[4]] Traum ist, Deutsch perfekt zu sprechen. Wir alle lieben [[5]] Kurs bei WeLearn!',
        blanks: [
          { options: ['Meine', 'Mein', 'Seine', 'Ihre'], answer: 'Meine', explain: '"Familie" = femenino, ich → "meine Familie".' },
          { options: ['Mein', 'Meine', 'Sein', 'Ihr'], answer: 'Mein', explain: '"Vater" = masculino, ich → "mein Vater".' },
          { options: ['Meine', 'Mein', 'Seine', 'Ihre'], answer: 'Meine', explain: '"Mutter" = femenino, ich → "meine Mutter".' },
          { options: ['Ihr', 'Ihre', 'Sein', 'Dein'], answer: 'Ihr', explain: '"Freund" = masculino, poseedora Ana (sie) → "ihr Freund".' },
          { options: ['Ihr', 'Ihre', 'Sein', 'Mein'], answer: 'Ihr', explain: '"Traum" = masculino (der Traum), Ana (sie) → "ihr Traum".' },
          { options: ['unseren', 'unser', 'unsere', 'euer'], answer: 'unseren', explain: '"Kurs" = masculino, acusativo tras "lieben" → "unseren Kurs".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe el posesivo correcto de memoria.',
        type: 'freeText',
        scene: 'Lina describe a su familia y a sus compañeros.',
        text: 'Ich heiße Lina. [[0]] Bruder heißt Markus. [[1]] Freundin heißt Sofia. Sofias [[2]] Eltern leben in Madrid. Sara ist [[3]] Lehrerin. [[4]] Unterricht ist immer interessant.',
        blanks: [
          { answer: 'Mein', accepted: ['Mein', 'mein'], explain: '"Bruder" = masculino, ich → "mein Bruder".' },
          { answer: 'Meine', accepted: ['Meine', 'meine'], explain: '"Freundin" = femenino, ich → "meine Freundin".' },
          { answer: 'ihre', accepted: ['ihre', 'Ihre'], explain: '"Eltern" = plural, Sofia (sie) → "ihre Eltern".' },
          { answer: 'unsere', accepted: ['unsere', 'Unsere'], explain: '"Lehrerin" = femenino, wir → "unsere Lehrerin".' },
          { answer: 'Ihr', accepted: ['Ihr', 'ihr'], explain: '"Unterricht" = masculino, Sara (sie) → "ihr Unterricht".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones con pronombres posesivos.',
        type: 'write',
        items: [
          {
            scene: 'Habla de tu familia',
            prompt: 'Describe 3 miembros de tu familia usando mein/meine.',
            answer: 'Mein Vater ist Arzt. Meine Mutter arbeitet in einem Büro. Mein Bruder studiert.',
            accepted: ['mein ', 'meine '],
            explain: 'Masc/neutro → mein. Femenino → meine. Ejemplo: Mein Bruder, meine Schwester, mein Kind.',
          },
          {
            scene: 'Habla de un amigo o amiga',
            prompt: 'Describe a un amigo o amiga usando sein/seine o ihr/ihre (según el género del amigo).',
            answer: 'Mein Freund heißt Pedro. Seine Mutter ist Ärztin. Sein Bruder lebt in Amerika.',
            accepted: ['sein ', 'seine ', 'ihr ', 'ihre '],
            explain: 'Si el amigo es chico (er): sein/seine. Si es chica (sie): ihr/ihre.',
          },
          {
            scene: 'Hablando de lo de la clase',
            prompt: 'Di algo sobre "nuestra clase" y "nuestro profesor" usando unser/unsere.',
            answer: 'Unser Lehrer ist sehr gut. Unsere Klasse ist klein aber motiviert.',
            accepted: ['unser ', 'unsere '],
            explain: 'Unser + masculino/neutro. Unsere + femenino/plural. Ej: unser Kurs, unsere Gruppe.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Presenta a dos personas de tu vida usando posesivos.',
        type: 'write',
        items: [
          {
            scene: 'Presenta a alguien de tu familia',
            prompt: 'Escribe 3 oraciones sobre un familiar usando su nombre y posesivos correctos.',
            answer: 'Das ist mein Vater. Sein Name ist Bruno. Seine Arbeit ist sehr interessant.',
            accepted: ['mein ', 'meine ', 'sein ', 'seine ', 'ihr ', 'ihre '],
            explain: 'Primero: "das ist mein/meine..." Luego: sein/seine o ihr/ihre según género del familiar.',
          },
          {
            scene: 'Presenta a un amigo o amiga',
            prompt: 'Presenta a un amigo/a. Menciona su trabajo, su ciudad y algo de su familia.',
            answer: 'Das ist meine Freundin Ana. Ihre Stadt ist Bogotá. Ihre Mutter ist Lehrerin.',
            accepted: ['mein ', 'meine ', 'sein ', 'seine ', 'ihr ', 'ihre '],
            explain: 'Si es chica: "meine Freundin", luego "ihre..." Si es chico: "mein Freund", luego "sein/seine...".',
          },
          {
            scene: 'La clase de WeLearn',
            prompt: 'Escribe 2 oraciones sobre la clase usando "unser/unsere" y luego algo sobre lo de otro estudiante.',
            answer: 'Unser Kurs ist sehr interessant. Unsere Lehrerin ist Sara. Sein Deutsch ist schon sehr gut.',
            accepted: ['unser ', 'unsere ', 'sein ', 'seine ', 'ihr ', 'ihre '],
            explain: 'Unser/unsere para "nosotros". Luego posesivo de tercera persona para otro estudiante.',
          },
        ],
      },
    ],
  },
}

export default topic
