import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'personalpronomen',
  order: '01',
  color: '#c9a900',
  category: 'Pronomen',
  level: 'A1',
  title: 'Personalpronomen im Deutschen A1',
  shortTitle: 'Personalpronomen',
  metaTitle: 'Personalpronomen Deutsch A1 — ich, du, er, sie, es, wir, ihr, Sie',
  description:
    'Los pronombres personales del alemán (ich, du, er, sie, es, wir, ihr, Sie) son similares al español con dos diferencias clave: "es" (tercera persona neutra) y la distinción formal "Sie" (usted/ustedes, siempre con mayúscula). En alemán, como en francés, el sujeto es obligatorio.',
  lead: 'Aprende los pronombres del alemán: ich, du, er, sie, es, wir, ihr, Sie. Clave: "es" para el neutro y "Sie" con mayúscula para el tratamiento formal.',
  outcomes: ['Usa los 8 pronombres personales', 'Distingue du/Sie (informal/formal)', 'Usa er/sie/es según el género gramatical'],

  guide: {
    goal: 'Identificar y usar correctamente los pronombres personales del alemán.',
    model: 'Ich bin Student. / Er ist Arzt. / Sie sind Lehrerin (Usted es profesora).',
    formula: 'Pronombre sujeto + verbo conjugado',
    decisions: [
      'ich/du/er/sie/es/wir/ihr/sie (ellos) — 7 pronombres + Sie (formal)',
      '"Sie" con mayúscula = usted/ustedes (singular y plural formal)',
      '"sie" con minúscula = ella / ellas',
      '"es" para sustantivos neutros: das Kind → es, das Haus → es',
      'No hay "on" como en francés — "man" es el equivalente impersonal (nivel B1)',
    ],
    table: [
      ['Pronombre', 'Español', 'Nota'],
      ['ich', 'yo', ''],
      ['du', 'tú', 'Informal'],
      ['er / sie / es', 'él / ella / ello', '"es" para neutros'],
      ['wir', 'nosotros', ''],
      ['ihr', 'vosotros', 'Informal plural'],
      ['sie', 'ellos/ellas', 'Minúscula'],
      ['Sie', 'usted/ustedes', 'Mayúscula, siempre formal'],
    ],
    mistakes: [
      '"Sie" con mayúscula ≠ "sie" con minúscula. La mayúscula es la cortesía formal.',
      '"es" no es solo "neutro abstracto" — también reemplaza sustantivos neutros: das Kind → es',
      'A diferencia del inglés, en alemán "sie" puede ser ella (singular) o ellas (plural).',
    ],
  },

  seo: [
    {
      heading: '¿Cuáles son los pronombres personales del alemán?',
      paragraphs: [
        'El alemán tiene los siguientes pronombres personales sujeto: ich (yo), du (tú), er (él), sie (ella), es (ello/neutro), wir (nosotros), ihr (vosotros informal), sie (ellos/ellas). A estos se añade Sie con mayúscula, el pronombre de cortesía formal equivalente a "usted/ustedes" en español.',
        'El alemán es una lengua con género gramatical ternario: masculino (der), femenino (die) y neutro (das). Por eso existe el pronombre "es" para sustantivos neutros, algo que no tiene equivalente directo en español moderno.',
      ],
    },
    {
      heading: '¿Cuándo se usa du y cuándo Sie en alemán?',
      paragraphs: [
        '"Du" es el tuteo — se usa con amigos, familia, niños, compañeros de la misma edad y en contextos informales. "Sie" con mayúscula es el tratamiento formal, equivalente al "usted" español, y se usa con personas mayores, desconocidos, superiores jerárquicos y en contextos profesionales.',
        '"Sie" (formal) usa la misma conjugación verbal que "sie" (ellos/ellas) — la tercera persona plural. Esto puede parecer confuso al principio, pero el contexto siempre aclara el significado.',
      ],
    },
    {
      heading: '¿Cómo funciona el género de er/sie/es en alemán?',
      paragraphs: [
        '"Er" reemplaza a sustantivos masculinos (der Mann, der Tisch → er), "sie" reemplaza a femeninos (die Frau, die Tür → sie), y "es" reemplaza a neutros (das Kind, das Haus, das Buch → es).',
        'El género gramatical del alemán no siempre coincide con el sexo biológico: das Mädchen (la chica) es neutro, así que se reemplaza por "es" — algo que sorprende a los hispanohablantes.',
      ],
    },
    {
      heading: 'Ihr: vosotros informal',
      paragraphs: [
        '"Ihr" es el plural informal de "du": cuando hablas con un grupo de amigos, usas "ihr". "Ihr" no debe confundirse con "ihr" como posesivo (su/sus de ella) — la conjugación diferente siempre aclara.',
        'El plural formal es "Sie" con mayúscula, igual que el singular formal. La forma verbal también es la misma (conjuga como "sie plural").',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Pronombres personales alemanes con énfasis en Sie formal y er/sie/es.',
    graphicPrompt: 'Tabla de pronombres con ejemplos de uso cotidiano.',
    scene: [
      ['ich', 'Ich bin Lehrer. — Soy profesor.'],
      ['du', 'Du bist nett ! — ¡Eres amable! (informal)'],
      ['er / sie / es', 'Er ist Arzt. / Sie ist Ärztin. / Es ist schön.'],
      ['wir', 'Wir wohnen in Berlin. — Vivimos en Berlín.'],
      ['ihr', 'Ihr seid müde. — Estáis cansados. (plural informal)'],
      ['sie (pl.)', 'Sie arbeiten viel. — Ellos trabajan mucho.'],
      ['Sie (formal)', 'Sie sind Herr Müller? — ¿Es usted el señor Müller?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['Sie formal vs sie informal', 'er/sie/es según género', 'du vs Sie'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Wähle das richtige Pronomen (elige el pronombre correcto).',
        type: 'choice',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ bin aus Spanien. (yo)']],
            options: ['Ich', 'Du', 'Er', 'Wir'],
            answer: 'Ich',
            explain: '"Ich" = yo. Siempre minúscula salvo al inicio de oración.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ bist sehr nett ! (tú, informal)']],
            options: ['Du', 'Sie', 'Ihr', 'Er'],
            answer: 'Du',
            explain: '"Du" = tú informal.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Das Kind spielt — ___ ist glücklich.']],
            options: ['es', 'er', 'sie', 'du'],
            answer: 'es',
            explain: '"Das Kind" es neutro (das) → pronombre "es".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ wohnen zusammen in München. (nosotros)']],
            options: ['Wir', 'Ihr', 'Sie', 'Du'],
            answer: 'Wir',
            explain: '"Wir" = nosotros.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ sind Herr Schmidt ? (usted, formal)']],
            options: ['Sie', 'sie', 'Du', 'Ihr'],
            answer: 'Sie',
            explain: '"Sie" con mayúscula = usted/ustedes (formal).',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Die Lehrerin erklärt gut — ___ ist sehr klar.']],
            options: ['sie', 'er', 'es', 'du'],
            answer: 'sie',
            explain: '"Die Lehrerin" es femenino (die) → pronombre "sie" (ella).',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ seid alle müde ! (vosotros, grupo informal)']],
            options: ['Ihr', 'Sie', 'Wir', 'Du'],
            answer: 'Ihr',
            explain: '"Ihr" = vosotros informal (plural de "du").',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Marco und Pedro — ___ arbeiten in Hamburg.']],
            options: ['sie', 'Sie', 'er', 'wir'],
            answer: 'sie',
            explain: '"Marco und Pedro" = plural masculino o mixto → "sie" (ellos), con minúscula.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Pronombre + verbo',
        tag: '2 espacios',
        intro: 'Completa el pronombre y la forma verbal.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] Lehrerin. (ella / ser)']],
            blanks: [
              { options: ['Sie', 'Er', 'Es', 'Ich'], answer: 'Sie', explain: '"Sie" (ella, minúscula) para una mujer.' },
              { options: ['ist', 'bin', 'sind', 'bist'], answer: 'ist', explain: '"Sie" (ella) → "ist" (es/está).' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] in Berlin. (nosotros / vivir: wohnen)']],
            blanks: [
              { options: ['Wir', 'Ihr', 'Sie', 'Ich'], answer: 'Wir', explain: '"Wir" = nosotros.' },
              { options: ['wohnen', 'wohnt', 'wohnst', 'wohne'], answer: 'wohnen', explain: '"Wir" → "wohnen" (-en terminación).' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] sehr gut Deutsch. (usted / hablar: sprechen)']],
            blanks: [
              { options: ['Sie', 'sie', 'Du', 'Ihr'], answer: 'Sie', explain: '"Sie" con mayúscula = usted formal.' },
              { options: ['sprechen', 'sprichst', 'spricht', 'spreche'], answer: 'sprechen', explain: '"Sie" (formal) conjuga como "sie" (plural) → "sprechen".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] müde — es ist spät. (tú / ser/estar: sein)']],
            blanks: [
              { options: ['Du', 'Er', 'Ich', 'Ihr'], answer: 'Du', explain: '"Du" = tú informal.' },
              { options: ['bist', 'bin', 'ist', 'sind'], answer: 'bist', explain: '"Du" → "bist".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa con el pronombre personal correcto.',
        type: 'guidedText',
        scene: 'Completa con el pronombre personal correcto.',
        text: 'Hallo! [[0]] heiße Anna. [[1]] bin aus Österreich. Mein Freund heißt Tom — [[2]] kommt aus Deutschland. Wir haben einen Hund — [[3]] heißt Bello und [[4]] ist sehr lieb. Unsere Lehrerin Frau Müller ist streng — aber [[5]] erklärt alles sehr gut. Und ihr? Woher kommt [[6]]?',
        blanks: [
          { options: ['Ich', 'Du', 'Er', 'Sie'], answer: 'Ich', explain: 'Primera persona → "ich".' },
          { options: ['Ich', 'Du', 'Er', 'Sie'], answer: 'Ich', explain: '"Ich bin aus Österreich" — la hablante se presenta.' },
          { options: ['er', 'sie', 'es', 'du'], answer: 'er', explain: '"Tom" = masculino → "er".' },
          { options: ['er', 'sie', 'es', 'ich'], answer: 'er', explain: '"Hund" (Maskulin: der Hund) → "er".' },
          { options: ['er', 'sie', 'es', 'du'], answer: 'er', explain: 'Sigue refiriéndose a Bello (der Hund) → "er".' },
          { options: ['sie', 'er', 'es', 'du'], answer: 'sie', explain: '"Frau Müller" = femenino → "sie".' },
          { options: ['ihr', 'Sie', 'du', 'wir'], answer: 'ihr', explain: '"Ihr" en plural informal dirigiéndose al grupo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Completa con el pronombre correcto.',
        type: 'freeText',
        scene: 'Completa con el pronombre correcto.',
        text: 'Das ist Herr Weber. [[0]] ist Arzt. Das ist Frau Klein. [[1]] ist Architektin. Das Buch ist interessant. [[2]] kostet 15 Euro. Hallo! [[3]] heiße Carlos. Und du — wie heißt [[4]]?',
        blanks: [
          { answer: 'Er', accepted: ['Er', 'er'], explain: '"Herr Weber" = masculino → "er".' },
          { answer: 'Sie', accepted: ['sie', 'Sie'], explain: '"Frau Klein" = femenino → "sie".' },
          { answer: 'Es', accepted: ['Es', 'es'], explain: '"Das Buch" = neutro → "es".' },
          { answer: 'Ich', accepted: ['Ich', 'ich'], explain: 'Primera persona → "ich".' },
          { answer: 'du', accepted: ['du', 'Du'], explain: 'Pregunta informal a "du".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones con los pronombres correctos.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Preséntate: di cómo te llamas y de dónde eres con "ich".',
            answer: 'Ich heiße Carlos und ich komme aus Kolumbien.',
            accepted: ['ich heiße', 'ich komme', 'ich bin', 'ich wohne'],
            explain: 'Ejemplo: Ich heiße María. Ich bin aus Spanien.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Habla de un amigo usando "er" o "sie" y el verbo "sein" o "kommen".',
            answer: 'Mein Freund kommt aus Deutschland. Er wohnt in Berlin.',
            accepted: ['er ist', 'er kommt', 'er wohnt', 'sie ist', 'sie kommt', 'sie wohnt'],
            explain: 'Ejemplo: Meine Freundin ist Ärztin. Sie kommt aus Österreich.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Usa "wir" para decir algo que haces con otra persona.',
            answer: 'Wir wohnen zusammen in Madrid.',
            accepted: ['wir wohnen', 'wir lernen', 'wir spielen', 'wir arbeiten', 'wir kommen'],
            explain: 'Ejemplo: Wir lernen zusammen Deutsch. / Wir wohnen in der gleichen Stadt.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe una oración dirigida a alguien usando "Sie" formal.',
            answer: 'Sprechen Sie Englisch?',
            accepted: ['sie sind', 'sie haben', 'sie kommen', 'sie wohnen', 'sie sprechen', 'sie arbeiten'],
            explain: 'Ejemplo: Sind Sie Herr Müller? / Sprechen Sie Deutsch? / Kommen Sie aus Berlin?',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Preséntate a ti y a otras dos personas.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Preséntate a ti mismo con "ich".',
            answer: 'Ich heiße Ana. Ich bin Studentin.',
            accepted: ['ich heiße', 'ich bin', 'ich komme', 'ich wohne'],
            explain: 'Ejemplo: Ich heiße Pablo. Ich komme aus Mexiko. Ich bin 25 Jahre alt.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Presenta a una persona masculina con "er".',
            answer: 'Mein Bruder heißt Marco. Er ist Ingenieur.',
            accepted: ['er heißt', 'er ist', 'er kommt', 'er wohnt', 'er arbeitet'],
            explain: 'Ejemplo: Mein Freund Tom kommt aus Berlin. Er arbeitet in einem Café.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Presenta a una persona femenina con "sie".',
            answer: 'Meine Schwester heißt Luisa. Sie studiert Medizin.',
            accepted: ['sie heißt', 'sie ist', 'sie kommt', 'sie wohnt', 'sie arbeitet', 'sie studiert'],
            explain: 'Ejemplo: Meine Lehrerin heißt Frau Weber. Sie ist sehr nett.',
          },
        ],
      },
    ],
  },
}

export default topic
