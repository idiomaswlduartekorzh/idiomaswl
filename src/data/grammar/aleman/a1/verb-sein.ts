import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verb-sein',
  order: '02',
  color: '#1a2ecc',
  category: 'Verben',
  level: 'A1',
  title: 'Das Verb "sein" im Deutschen A1',
  shortTitle: 'Verb sein',
  metaTitle: 'Das Verb sein Deutsch A1 — bin, bist, ist, sind, seid',
  description:
    'El verbo "sein" (ser/estar) es el más fundamental del alemán. Sus formas — bin, bist, ist, sind, seid, sind — son completamente irregulares. "Sein" no distingue entre "ser" y "estar": ambas funciones se expresan con la misma forma verbal.',
  lead: 'Sein = ser/estar. Sus 6 formas son irregulares pero imprescindibles. Regla de oro: sin artículo para profesiones y nacionalidades.',
  outcomes: ['Conjuga sein en presente', 'Usa sein para identidad y descripción', 'Forma negaciones con nicht'],

  guide: {
    goal: 'Conjugar "sein" (ser/estar) en presente de indicativo para presentaciones y descripciones básicas.',
    model: 'Ich bin Student. / Er ist Arzt. / Wir sind aus Spanien.',
    formula: 'Sujeto + sein conjugado + atributo',
    decisions: [
      'Profesión sin artículo: Ich bin Lehrer. (no "ein Lehrer") → igual que en francés',
      'Nationalidad: Ich bin Spanier / Spanierin.',
      'Negación: nicht → Ich bin nicht müde. / Er ist nicht hier.',
      'Pregunta: Verbo al principio → Bist du müde? / Ist er zu Hause?',
    ],
    table: [
      ['Pronombre', 'Sein', 'Español'],
      ['ich', 'bin', 'soy / estoy'],
      ['du', 'bist', 'eres / estás'],
      ['er / sie / es', 'ist', 'es / está'],
      ['wir', 'sind', 'somos / estamos'],
      ['ihr', 'seid', 'sois / estáis'],
      ['sie / Sie', 'sind', 'son / están / es usted'],
    ],
    mistakes: [
      'Profesión SIN artículo: "Ich bin ein Arzt" ❌ → "Ich bin Arzt" ✓',
      '"Sie sind" puede ser formal (usted es) o plural (ellos son) — el contexto aclara',
      'La negación de sein es "nicht" (no "kein"): "Ich bin nicht müde".',
    ],
  },

  seo: [
    {
      heading: '¿Por qué "sein" es el verbo más importante del alemán?',
      paragraphs: [
        '"Sein" es el verbo más frecuente e irregular del alemán. Sus formas en presente — bin, bist, ist, sind, seid, sind — no siguen ningún patrón regular, así que hay que memorizarlas. Al igual que en el francés con "être", el alemán usa "sein" para expresar tanto "ser" como "estar": Ich bin müde (estoy cansado), Er ist Arzt (es médico).',
        'La buena noticia es que "sind" se usa para tres personas diferentes (wir, sie plural, Sie formal), lo que reduce el número de formas distintas a recordar.',
      ],
    },
    {
      heading: 'Conjugación completa de sein',
      paragraphs: [
        'Ich bin (yo soy/estoy), du bist (tú eres/estás), er/sie/es ist (él/ella/ello es/está), wir sind (nosotros somos/estamos), ihr seid (vosotros sois/estáis), sie/Sie sind (ellos son / usted es).',
      ],
      table: [
        ['Persona', 'Sein', 'Ejemplo'],
        ['ich', 'bin', 'Ich bin müde.'],
        ['du', 'bist', 'Du bist sehr nett.'],
        ['er/sie/es', 'ist', 'Sie ist Ärztin.'],
        ['wir', 'sind', 'Wir sind aus Berlin.'],
        ['ihr', 'seid', 'Ihr seid pünktlich!'],
        ['sie/Sie', 'sind', 'Sie sind Herr Müller?'],
      ],
    },
    {
      heading: 'Sein para profesión y nacionalidad',
      paragraphs: [
        'Con sein para expresar profesión o nacionalidad en alemán, NO se usa artículo: Ich bin Lehrer (soy profesor), Er ist Arzt (es médico), Sie ist Studentin (es/ella es estudiante). Esta es una de las diferencias más importantes con el español.',
        'Para nacionalidades: Ich bin Spanier (soy español), Sie ist Kolumbianerin (es colombiana). El femenino de las nacionalidades añade generalmente -in.',
      ],
    },
    {
      heading: 'Negación e interrogación con sein',
      paragraphs: [
        'Negación: se añade "nicht" después del verbo o al final: Ich bin nicht müde (no estoy cansado). Ich bin nicht Arzt (no soy médico). Si la negación va con un sustantivo indéfini/kein, se usa "kein/keine": Ich bin kein Arzt.',
        'Interrogación: en alemán, el verbo va al principio de la pregunta: Bist du müde? / Ist er zu Hause? / Sind Sie Herr Müller? La pregunta con "W-Wort" (Wer, Was, Wie, Wo, Warum) pone el W-Wort al principio: Wer bist du? / Wo sind wir?',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Sein: conjugación completa con énfasis en profesiones sin artículo.',
    graphicPrompt: 'Tabla de conjugación de sein con ejemplos de presentación.',
    scene: [
      ['ich bin', 'Ich bin Lehrer. — Soy profesor.'],
      ['du bist', 'Du bist sehr nett. — Eres muy amable.'],
      ['er/sie/es ist', 'Sie ist Ärztin. / Es ist kalt.'],
      ['wir sind', 'Wir sind aus Mexiko. — Somos de México.'],
      ['ihr seid', 'Ihr seid pünktlich! — ¡Sois puntuales!'],
      ['sie/Sie sind', 'Sie sind Herr Müller? — ¿Es usted el señor Müller?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['formas irregulares', 'profesión sin artículo', 'nicht para negar'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Wähle die richtige Form von "sein".',
        type: 'choice',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Ich ___ Student.']],
            options: ['bin', 'bist', 'ist', 'sind'],
            answer: 'bin',
            explain: '"Ich" → "bin". Primera persona singular de sein.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Du ___ sehr müde heute.']],
            options: ['bist', 'bin', 'ist', 'seid'],
            answer: 'bist',
            explain: '"Du" → "bist". Segunda persona singular informal.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Er ___ Arzt in Hamburg.']],
            options: ['ist', 'bist', 'sind', 'seid'],
            answer: 'ist',
            explain: '"Er" → "ist". Profesión sin artículo: "Arzt" no "ein Arzt".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Wir ___ aus Österreich.']],
            options: ['sind', 'seid', 'bin', 'ist'],
            answer: 'sind',
            explain: '"Wir" → "sind".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Ihr ___ alle sehr pünktlich !']],
            options: ['seid', 'sind', 'bist', 'ist'],
            answer: 'seid',
            explain: '"Ihr" → "seid". Segunda persona plural informal.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '___ Sie Herr Weber ? (formal)']],
            options: ['Sind', 'Seid', 'Bist', 'Ist'],
            answer: 'Sind',
            explain: '"Sie" (formal) → "sind". Verbo al inicio en pregunta.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Ich ___ nicht müde.']],
            options: ['bin', 'bist', 'ist', 'sind'],
            answer: 'bin',
            explain: 'Negación: "ich bin nicht...". "Nicht" viene después del verbo.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Das Kind ___ krank heute.']],
            options: ['ist', 'bin', 'bist', 'sind'],
            answer: 'ist',
            explain: '"Das Kind" = es → "ist".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Pronombre + sein',
        tag: '2 espacios',
        intro: 'Completa el pronombre y la forma de sein.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] Lehrerin in Berlin.']],
            blanks: [
              { options: ['Sie', 'Er', 'Ich', 'Wir'], answer: 'Sie', explain: '"Sie" (ella) para una mujer.' },
              { options: ['ist', 'bin', 'bist', 'sind'], answer: 'ist', explain: '"Sie" (ella) → "ist".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] aus Kolumbien — woher kommst du?']],
            blanks: [
              { options: ['Ich', 'Du', 'Er', 'Wir'], answer: 'Ich', explain: '"Ich" = yo.' },
              { options: ['bin', 'bist', 'ist', 'sind'], answer: 'bin', explain: '"Ich" → "bin".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] sehr glücklich heute!']],
            blanks: [
              { options: ['Wir', 'Ihr', 'Sie', 'Du'], answer: 'Wir', explain: '"Wir" para acciones conjuntas.' },
              { options: ['sind', 'seid', 'ist', 'bin'], answer: 'sind', explain: '"Wir" → "sind".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] Herr Müller? — Ja, ich bin es.']],
            blanks: [
              { options: ['Sind', 'Bist', 'Ist', 'Seid'], answer: 'Sind', explain: 'Pregunta formal: "Sind Sie...?" Verbo al principio.' },
              { options: ['Sie', 'sie', 'du', 'ihr'], answer: 'Sie', explain: '"Sie" con mayúscula = usted formal.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa con la forma correcta de sein.',
        type: 'guidedText',
        scene: 'Completa con la forma correcta de sein.',
        text: 'Ich [[0]] Anna und ich komme aus Wien. Mein Freund Tom [[1]] aus Deutschland. Wir [[2]] beide Studenten. Unsere Lehrerin [[3]] sehr streng, aber sie [[4]] auch sehr fair. Heute [[5]] wir müde — das Examen war schwer. Und ihr? [[6]] ihr auch Studenten?',
        blanks: [
          { options: ['bin', 'bist', 'ist', 'sind'], answer: 'bin', explain: '"Ich" → "bin".' },
          { options: ['ist', 'bin', 'bist', 'sind'], answer: 'ist', explain: '"Tom" (er) → "ist".' },
          { options: ['sind', 'seid', 'bin', 'ist'], answer: 'sind', explain: '"Wir" → "sind".' },
          { options: ['ist', 'bin', 'bist', 'sind'], answer: 'ist', explain: '"Unsere Lehrerin" (sie) → "ist".' },
          { options: ['ist', 'sind', 'bin', 'bist'], answer: 'ist', explain: '"Sie" (ella) → "ist".' },
          { options: ['sind', 'seid', 'bin', 'ist'], answer: 'sind', explain: '"Wir" → "sind".' },
          { options: ['Seid', 'Sind', 'Bist', 'Ist'], answer: 'Seid', explain: '"Ihr" → "seid". Pregunta con verbo al principio.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Completa con bin, bist, ist, sind o seid.',
        type: 'freeText',
        scene: 'Completa con bin, bist, ist, sind o seid.',
        text: 'Pedro [[0]] Spanier. Er [[1]] 25 Jahre alt. Seine Schwester Ana [[2]] Ärztin. Ich [[3]] sein Freund. Wir [[4]] beide aus Madrid.',
        blanks: [
          { answer: 'ist', accepted: ['ist'], explain: '"Pedro" (er) → "ist".' },
          { answer: 'ist', accepted: ['ist'], explain: '"Er" → "ist".' },
          { answer: 'ist', accepted: ['ist'], explain: '"Ana" (sie) → "ist".' },
          { answer: 'bin', accepted: ['bin'], explain: '"Ich" → "bin".' },
          { answer: 'sind', accepted: ['sind'], explain: '"Wir" → "sind".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones completas con sein.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Preséntate: di cómo te llamas, de dónde eres y qué eres (profesión/estudiante).',
            answer: 'Ich bin Carlos. Ich bin aus Spanien. Ich bin Student.',
            accepted: ['ich bin'],
            explain: 'Profesión SIN artículo: Ich bin Lehrer/Lehrerin/Student/Studentin.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di cómo está alguien hoy (müde = cansado, glücklich = feliz, krank = enfermo).',
            answer: 'Mein Freund ist heute sehr müde.',
            accepted: ['ist müde', 'ist glücklich', 'ist krank', 'ist gut', 'ist hier', 'ist nicht'],
            explain: 'Ejemplo: Er ist heute krank. / Sie ist sehr glücklich.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe una oración negativa con sein.',
            answer: 'Ich bin nicht müde.',
            accepted: ['bin nicht', 'ist nicht', 'sind nicht', 'bist nicht'],
            explain: 'Negación: sein + nicht. Ejemplo: Ich bin nicht Arzt. / Er ist nicht hier.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Haz una pregunta con sein (verbo al principio).',
            answer: 'Bist du Student?',
            accepted: ['bist du', 'ist er', 'ist sie', 'sind wir', 'sind sie', 'sind Sie', 'seid ihr'],
            explain: 'Pregunta: sein al inicio. Bist du...? / Ist er...? / Sind Sie...?',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Presenta a tu familia usando sein al menos 4 veces.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Preséntate tú con ich bin.',
            answer: 'Ich bin Ana. Ich bin Studentin aus Kolumbien.',
            accepted: ['ich bin'],
            explain: 'Ich bin + nombre/profesión/origen. Sin artículo para profesiones.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Presenta a alguien de tu familia con er/sie ist.',
            answer: 'Mein Bruder ist Ingenieur. Er ist 30 Jahre alt.',
            accepted: ['er ist', 'sie ist'],
            explain: 'Ejemplo: Meine Mutter ist Lehrerin. Sie ist sehr nett.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Habla de tu familia en conjunto con wir sind o sie sind.',
            answer: 'Wir sind eine große Familie. Wir sind alle sehr glücklich.',
            accepted: ['wir sind', 'sie sind'],
            explain: 'Ejemplo: Wir sind fünf Personen. / Sie sind alle sehr freundlich.',
          },
        ],
      },
    ],
  },
}

export default topic
