import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verb-haben',
  order: '03',
  color: '#0d9488',
  category: 'Verben',
  level: 'A1',
  title: 'Das Verb "haben" im Deutschen A1',
  shortTitle: 'Verb haben',
  metaTitle: 'Das Verb haben Deutsch A1 — habe, hast, hat, haben, habt',
  description:
    'El verbo "haben" (tener) es el segundo más importante del alemán junto a "sein". Sus formas — habe, hast, hat, haben, habt, haben — son casi regulares excepto en las segundas y tercera personas. Se usa para posesión y como auxiliar en el Perfekt (pasado compuesto).',
  lead: 'Haben = tener. Casi regular, con un truco: hast/hat (du/er) pierden la -b del infinitivo. Aprende también sus expresiones idiomáticas esenciales.',
  outcomes: ['Conjuga haben en presente', 'Usa haben para posesión', 'Aplica haben + Zeit, Hunger, Durst'],

  guide: {
    goal: 'Conjugar haben (tener) en presente para posesión y expresiones básicas.',
    model: 'Ich habe ein Auto. / Sie hat Hunger. / Wir haben Zeit.',
    formula: 'Sujeto + haben conjugado + objeto en acusativo',
    decisions: [
      'habe/haben/habt son regulares; hast/hat son irregulares (sin -b-)',
      'Posesión: Ich habe ein Auto, einen Hund, eine Wohnung.',
      'Expresiones: Hunger haben (hambre), Durst (sed), Angst (miedo), Zeit (tiempo), Glück (suerte)',
      'Negación: kein(e) para sustantivos → Ich habe kein Auto. / Sie hat keine Zeit.',
    ],
    table: [
      ['Pronombre', 'Haben', 'Ejemplo'],
      ['ich', 'habe', 'Ich habe eine Katze.'],
      ['du', 'hast', 'Du hast einen Hund?'],
      ['er/sie/es', 'hat', 'Er hat Hunger.'],
      ['wir', 'haben', 'Wir haben Zeit.'],
      ['ihr', 'habt', 'Ihr habt Glück!'],
      ['sie/Sie', 'haben', 'Sie haben ein großes Haus.'],
    ],
    mistakes: [
      '"Er habt" ❌ → "Er hat" ✓ (las formas du/er/sie/es pierden -b-)',
      'Negación con sustantivos: "Ich habe kein Auto" no "Ich habe nicht ein Auto"',
      '"Ich habe 25 Jahre" ❌ — la edad en alemán: "Ich bin 25 Jahre alt" (con sein)',
    ],
  },

  seo: [
    {
      heading: 'Haben: el verbo del "tener" en alemán',
      paragraphs: [
        '"Haben" (tener) es el segundo verbo más fundamental del alemán y actúa como auxiliar en la construcción del pasado (Perfekt): Ich habe gegessen (he comido). En nivel A1, su función principal es expresar posesión.',
        'Una diferencia importante con el español: la EDAD en alemán usa "sein" (Ich bin 25 Jahre alt — tengo 25 años), no "haben". Solo expresiones como hunger, durst, angst usan "haben".',
      ],
    },
    {
      heading: 'Conjugación y las formas irregulares hast/hat',
      paragraphs: [
        'La conjugación de haben es casi regular. El patrón de "du" y "er/sie/es" pierde la -b del infinitivo: habe → hast (no "habst"), hat (no "habt" para er). Las otras formas son perfectamente regulares: haben (wir/sie/Sie), habt (ihr).',
        'Ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.',
      ],
    },
    {
      heading: 'Expresiones con haben',
      paragraphs: [
        'En alemán, muchas sensaciones usan haben: Hunger haben (tener hambre), Durst haben (tener sed), Angst haben (tener miedo), Schmerzen haben (tener dolor), Glück haben (tener suerte), Zeit haben (tener tiempo), Recht haben (tener razón).',
        'Ich habe Hunger — tengo hambre. Er hat Angst — tiene miedo. Wir haben Zeit — tenemos tiempo.',
      ],
    },
    {
      heading: 'La negación con kein/keine',
      paragraphs: [
        'Para negar posesión de sustantivos indefinidos, se usa "kein" (masculino/neutro) o "keine" (femenino/plural): Ich habe kein Auto (no tengo coche), Sie hat keine Zeit (no tiene tiempo), Wir haben keine Kinder (no tenemos hijos).',
        '"Kein" sigue el mismo patrón de declinación que "ein": kein/keine/kein en nominativo, einen/eine/ein en acusativo → keinen/keine/kein.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Haben: posesión y expresiones idiomáticas esenciales del alemán A1.',
    graphicPrompt: 'Tabla de haben con expresiones de posesión y sensaciones.',
    scene: [
      ['ich habe', 'Ich habe ein Fahrrad und eine Katze.'],
      ['du hast', 'Hast du Zeit? — ¿Tienes tiempo?'],
      ['er/sie/es hat', 'Er hat Hunger. / Sie hat Glück!'],
      ['wir haben', 'Wir haben eine große Wohnung.'],
      ['ihr habt', 'Ihr habt Recht! — ¡Tenéis razón!'],
      ['sie/Sie haben', 'Sie haben keine Zeit. — No tienen tiempo.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['hast/hat irregulares', 'kein/keine negación', 'expresiones con haben'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Wähle die richtige Form von "haben".',
        type: 'choice',
        items: [
          { scene: 'Hablando de mascotas', lines: [['', 'Ich ___ einen Hund.']], options: ['habe', 'hast', 'hat', 'habt'], answer: 'habe', explain: '"Ich" → "habe".' },
          { scene: 'Expresando sensaciones', lines: [['', 'Du ___ Hunger ?']], options: ['hast', 'habe', 'hat', 'haben'], answer: 'hast', explain: '"Du" → "hast". La -b desaparece.' },
          { scene: 'Hablando de posesiones', lines: [['', 'Sie (ella) ___ ein großes Auto.']], options: ['hat', 'hat', 'habe', 'habt'], answer: 'hat', explain: '"Sie" (ella) → "hat". La -b desaparece.' },
          { scene: 'Planificando actividades', lines: [['', 'Wir ___ keine Zeit.']], options: ['haben', 'habt', 'habe', 'hat'], answer: 'haben', explain: '"Wir" → "haben".' },
          { scene: 'Felicitando al grupo', lines: [['', 'Ihr ___ Glück heute !']], options: ['habt', 'haben', 'hast', 'hat'], answer: 'habt', explain: '"Ihr" → "habt".' },
          { scene: 'Hablando de familia', lines: [['', 'Sie (ellos) ___ drei Kinder.']], options: ['haben', 'habt', 'hast', 'hat'], answer: 'haben', explain: '"Sie" (plural) → "haben".' },
          { scene: 'Hablando de transporte', lines: [['', 'Ich ___ kein Auto.']], options: ['habe', 'hast', 'hat', 'haben'], answer: 'habe', explain: '"Ich habe kein Auto" — negación con kein.' },
          { scene: 'Conociendo a alguien', lines: [['', '___ du Geschwister ? (¿Tienes hermanos?)']], options: ['Hast', 'Haben', 'Hat', 'Habt'], answer: 'Hast', explain: 'Pregunta: verbo al principio. "Du" → "hast".' },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Pronombre + haben',
        tag: '2 espacios',
        intro: 'Completa el pronombre y la forma de haben.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] eine große Familie.']],
            blanks: [
              { options: ['Wir', 'Ihr', 'Du', 'Er'], answer: 'Wir', explain: '"Wir" para primera persona plural.' },
              { options: ['haben', 'habt', 'habe', 'hat'], answer: 'haben', explain: '"Wir" → "haben".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] Angst vor Spinnen.']],
            blanks: [
              { options: ['Er', 'Sie', 'Wir', 'Ihr'], answer: 'Er', explain: 'Contexto masculino singular → "er".' },
              { options: ['hat', 'habe', 'hast', 'haben'], answer: 'hat', explain: '"Er" → "hat".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] keine Haustiere. (nosotros)']],
            blanks: [
              { options: ['Wir', 'Sie', 'Du', 'Ich'], answer: 'Wir', explain: '"Nosotros" → "wir".' },
              { options: ['haben', 'habt', 'hat', 'habe'], answer: 'haben', explain: '"Wir" → "haben" + kein(e) para la negación.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] Durst? Hier [[1]] wir Wasser.']],
            blanks: [
              { options: ['Habt', 'Haben', 'Hast', 'Hat'], answer: 'Habt', explain: '"Ihr" implícito → "habt". Pregunta sobre el grupo.' },
              { options: ['haben', 'habt', 'hat', 'habe'], answer: 'haben', explain: '"Wir haben" — ofrecemos agua.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa con la forma correcta de haben.',
        type: 'guidedText',
        scene: 'Completa con la forma correcta de haben.',
        text: 'Familie Müller [[0]] ein schönes Haus. Herr Müller [[1]] einen Hund und eine Katze. Frau Müller [[2]] keine Haustiere — sie [[3]] Angst vor Tieren. Die Kinder [[4]] viele Spielzeuge. Ich [[5]] auch einen Hund. [[6]] ihr auch Haustiere?',
        blanks: [
          { options: ['hat', 'haben', 'habe', 'habt'], answer: 'hat', explain: '"Familie Müller" (sie, singular) → "hat".' },
          { options: ['hat', 'habe', 'habt', 'haben'], answer: 'hat', explain: '"Herr Müller" (er) → "hat".' },
          { options: ['hat', 'habe', 'habt', 'haben'], answer: 'hat', explain: '"Frau Müller" (sie) → "hat".' },
          { options: ['hat', 'habe', 'habt', 'haben'], answer: 'hat', explain: '"Sie" (ella) → "hat". "Angst haben" = tener miedo.' },
          { options: ['haben', 'hat', 'habe', 'habt'], answer: 'haben', explain: '"Die Kinder" (sie, plural) → "haben".' },
          { options: ['habe', 'hast', 'hat', 'haben'], answer: 'habe', explain: '"Ich" → "habe".' },
          { options: ['Habt', 'Haben', 'Hast', 'Hat'], answer: 'Habt', explain: '"Ihr" → "habt". Pregunta con verbo al inicio.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Completa con habe, hast, hat, haben o habt.',
        type: 'freeText',
        scene: 'Completa con habe, hast, hat, haben o habt.',
        text: 'Ich [[0]] eine kleine Wohnung. Du [[1]] ein großes Haus. Er [[2]] kein Auto. Wir [[3]] Zeit am Wochenende. [[4]] ihr Hunger?',
        blanks: [
          { answer: 'habe', accepted: ['habe'], explain: '"Ich" → "habe".' },
          { answer: 'hast', accepted: ['hast'], explain: '"Du" → "hast".' },
          { answer: 'hat', accepted: ['hat'], explain: '"Er" → "hat".' },
          { answer: 'haben', accepted: ['haben'], explain: '"Wir" → "haben".' },
          { answer: 'Habt', accepted: ['habt', 'Habt'], explain: '"Ihr" → "habt". Pregunta.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones completas con haben.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué tienes (mascota, coche, apartamento, hermanos) usando "ich habe".',
            answer: 'Ich habe einen Bruder und eine Schwester.',
            accepted: ['ich habe'],
            explain: 'Ejemplo: Ich habe ein Fahrrad. / Ich habe keine Geschwister.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di que alguien tiene hambre o sed usando haben + Hunger/Durst.',
            answer: 'Mein Bruder hat Hunger — es ist 13 Uhr!',
            accepted: ['hat hunger', 'hat durst', 'habe hunger', 'habe durst', 'haben hunger', 'haben durst'],
            explain: 'Ejemplo: Ich habe Hunger. / Sie hat Durst. / Wir haben alle Hunger.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe una frase negativa usando "kein/keine" con haben.',
            answer: 'Ich habe keine Zeit heute.',
            accepted: ['kein', 'keine'],
            explain: 'Negación con sustantivos: kein + masculino/neutro, keine + femenino/plural.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Haz una pregunta con haben (verbo al principio).',
            answer: 'Hast du Geschwister?',
            accepted: ['hast du', 'hat er', 'hat sie', 'haben sie', 'haben wir', 'habt ihr'],
            explain: 'Pregunta: haben al inicio. Hast du...? / Hat er...? / Haben Sie...?',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe lo que tú y tu familia tienen.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué tienes tú (posesión o sensación con haben).',
            answer: 'Ich habe eine kleine Wohnung und ein Fahrrad.',
            accepted: ['ich habe'],
            explain: 'Ich habe + artículo + sustantivo. Ejemplo: Ich habe viel Glück im Leben.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué tiene un familiar (er/sie hat).',
            answer: 'Meine Mutter hat ein Auto und einen Hund.',
            accepted: ['er hat', 'sie hat'],
            explain: 'Ejemplo: Mein Vater hat viel Arbeit. / Meine Schwester hat keine Zeit.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué tiene(n) o no tiene(n) un grupo (wir/sie haben).',
            answer: 'Wir haben keine Kinder aber wir haben viele Freunde.',
            accepted: ['wir haben', 'sie haben'],
            explain: 'Ejemplo: Wir haben Glück — wir sind gesund. / Sie haben kein Problem.',
          },
        ],
      },
    ],
  },
}

export default topic
