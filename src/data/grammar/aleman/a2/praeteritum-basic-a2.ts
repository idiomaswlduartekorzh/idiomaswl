import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'praeteritum-basic-a2',
  order: '03',
  color: '#c9a900',
  category: 'Verben',
  level: 'A2',
  title: 'Das Präteritum (sein, haben, Modalverben) — Alemán A2',
  shortTitle: 'Präteritum básico',
  metaTitle: 'Präteritum Básico — Alemán A2: sein, haben y Verbos Modales',
  description:
    'El Präteritum es el tiempo pasado narrativo del alemán, usado en textos escritos, cuentos y noticias. En el habla cotidiana, los verbos sein, haben y los verbos modales prefieren el Präteritum sobre el Perfekt.',
  lead: 'War, hatte, musste: el pasado narrativo de sein, haben y los modales.',
  outcomes: [
    'Conjugar sein en Präteritum (war, warst, waren)',
    'Conjugar haben en Präteritum (hatte, hattest, hatten)',
    'Usar los modales en Präteritum (musste, konnte, wollte, durfte, sollte)',
    'Distinguir cuándo se usa Präteritum vs Perfekt en el habla',
  ],

  guide: {
    goal: 'Usar sein, haben y los modales en Präteritum para narrar el pasado.',
    model: 'Ich war müde. / Sie hatte keine Zeit. / Wir mussten früh aufstehen.',
    formula: 'Sujeto + verbo en Präteritum + complementos',
    decisions: [
      '"war/waren/warst" son las formas de sein en Präteritum — usadas incluso en conversación',
      '"hatte/hatten/hattest" son las formas de haben en Präteritum — preferidas al hablar',
      'Modales en Präteritum pierden la diéresis: musste, konnte, wollte, durfte, sollte, mochte',
      'Los modales en Präteritum siguen el patrón de verbos débiles: raíz + -te, -test, -te, -ten, -tet, -ten',
      'Modal + Infinitiv al final: Sie musste arbeiten. / Er konnte nicht schlafen.',
      'En textos escritos: todos los verbos pueden ir en Präteritum; en conversación, solo sein/haben/modales',
    ],
    table: [
      ['Verbo', 'Präteritum (ich)', 'Exemplo'],
      ['sein', 'war', 'Ich war zu Hause'],
      ['haben', 'hatte', 'Ich hatte Hunger'],
      ['müssen', 'musste', 'Ich musste lernen'],
      ['können', 'konnte', 'Ich konnte nicht schlafen'],
      ['wollen', 'wollte', 'Ich wollte reisen'],
      ['dürfen', 'durfte', 'Ich durfte bleiben'],
    ],
    mistakes: [
      'Usar Perfekt con sein/haben en narración oral: se prefiere "war" y "hatte" siempre',
      'No borrar la diéresis en modales: INCORRECTO "müsste" para pasado → "musste" (Konjunktiv II sería müsste)',
      'Olvidar el Infinitiv al final con modales: INCORRECTO "Er musste nicht" (sin Inf.) vs "Er musste nicht arbeiten"',
    ],
  },

  seo: [
    {
      heading: 'Cuándo usar el Präteritum en alemán',
      paragraphs: [
        'El Präteritum es el tiempo pasado que encontrarás en novelas, cuentos de hadas, noticias y textos periodísticos. En la conversación oral, la mayoría de alemanes prefieren el Perfekt para verbos ordinarios. Sin embargo, sein (→ war) y haben (→ hatte) se usan habitualmente en el Präteritum incluso en el habla cotidiana.',
        'Los verbos modales (müssen, können, wollen, dürfen, sollen, mögen) también prefieren el Präteritum en la conversación: "Ich musste gestern früh aufstehen" es más natural que "Ich habe früh aufstehen müssen".',
      ],
    },
    {
      heading: 'Conjugación de sein en Präteritum',
      paragraphs: [
        'Las formas son irregulares y hay que memorizarlas: ich war, du warst, er/sie/es war, wir waren, ihr wart, sie/Sie waren. Fíjate en que la 1ª y 3ª personas singulares son iguales: war.',
        '"War" aparece constantemente en textos y conversaciones: "Wo warst du gestern?" (¿Dónde estuviste ayer?), "Es war einmal..." (Érase una vez...), "Das war sehr schön" (Eso estuvo muy bien).',
      ],
    },
    {
      heading: 'Los verbos modales en Präteritum',
      paragraphs: [
        'Todos los modales siguen el mismo patrón en Präteritum: eliminan la diéresis y añaden las terminaciones débiles (-te, -test, -te, -ten, -tet, -ten). müssen → musste, können → konnte, wollen → wollte, dürfen → durfte, sollen → sollte, mögen → mochte.',
        'El Infinitiv del verbo principal sigue yendo al final de la oración: "Sie konnte gestern nicht kommen." / "Wir mussten das Formular ausfüllen."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Präteritum de sein/haben/modales: formas y uso en narración y habla cotidiana.',
    graphicPrompt: 'Libro abierto con formas del Präteritum y bocadillo de conversación.',
    scene: [
      ['Ich war müde', 'Yo estaba cansado/a'],
      ['Sie hatte keine Zeit', 'Ella no tenía tiempo'],
      ['Wir mussten warten', 'Tuvimos que esperar'],
      ['Er konnte nicht schlafen', 'Él no podía dormir'],
      ['Du wolltest reisen', 'Tú querías viajar'],
      ['Es war einmal...', 'Érase una vez...'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['war/waren', 'hatte/hatten', 'musste/konnte/wollte'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del Präteritum.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de ayer',
            lines: [['', 'Ich ___ gestern sehr müde. (sein)']],
            options: ['war', 'warst', 'waren', 'wäre'],
            answer: 'war',
            explain: 'ich + sein → war (Präteritum, 1ª persona singular).',
          },
          {
            scene: 'Preguntando por alguien',
            lines: [['', 'Wo ___ du gestern Abend? (sein)']],
            options: ['warst', 'war', 'waren', 'bist'],
            answer: 'warst',
            explain: 'du + sein → warst (Präteritum, 2ª persona singular).',
          },
          {
            scene: 'Contando una historia',
            lines: [['', 'Das Kind ___ sehr glücklich. (sein)']],
            options: ['war', 'warst', 'waren', 'ist'],
            answer: 'war',
            explain: 'das Kind (3ª sg) + sein → war.',
          },
          {
            scene: 'Hablando de lo que tenías',
            lines: [['', 'Ich ___ damals kein Geld. (haben)']],
            options: ['hatte', 'hattest', 'hatten', 'habe'],
            answer: 'hatte',
            explain: 'ich + haben → hatte (Präteritum).',
          },
          {
            scene: 'Obligación en el pasado',
            lines: [['', 'Sie ___ jeden Tag früh aufstehen. (müssen)']],
            options: ['musste', 'müsste', 'muss', 'mussten'],
            answer: 'musste',
            explain: 'sie (singular) + müssen → musste. Sin diéresis en Präteritum.',
          },
          {
            scene: 'Capacidad en el pasado',
            lines: [['', 'Als Kind ___ ich sehr gut schwimmen. (können)']],
            options: ['konnte', 'könnte', 'kann', 'konnten'],
            answer: 'konnte',
            explain: 'ich + können → konnte. Sin diéresis en Präteritum.',
          },
          {
            scene: 'Deseos en el pasado',
            lines: [['', 'Wir ___ einen Urlaub machen. (wollen)']],
            options: ['wollten', 'wollte', 'wollen', 'würden'],
            answer: 'wollten',
            explain: 'wir + wollen → wollten (1ª plural Präteritum).',
          },
          {
            scene: 'Permiso en el pasado',
            lines: [['', 'Als Kind ___ ich nicht lange aufbleiben. (dürfen)']],
            options: ['durfte', 'dürfte', 'darf', 'durften'],
            answer: 'durfte',
            explain: 'ich + dürfen → durfte. Sin diéresis en Präteritum.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa con la forma de Präteritum y el Infinitiv si es necesario.',
        type: 'dual',
        items: [
          {
            scene: 'Hablando del trabajo de ayer',
            lines: [['', 'Ich [[0]] gestern keine Zeit — ich [[1]] bis 20 Uhr arbeiten. (sein, müssen)']],
            blanks: [
              { options: ['hatte', 'war', 'habe', 'bin'], answer: 'hatte', explain: 'ich + haben → hatte.' },
              { options: ['musste', 'müsste', 'muss', 'müssen'], answer: 'musste', explain: 'ich + müssen → musste (Präteritum, sin diéresis).' },
            ],
          },
          {
            scene: 'Contando una historia de infancia',
            lines: [['', 'Als ich klein [[0]], [[1]] ich oft im Park spielen. (sein, dürfen)']],
            blanks: [
              { options: ['war', 'hatte', 'warst', 'wäre'], answer: 'war', explain: 'ich + sein → war.' },
              { options: ['durfte', 'dürfte', 'darf', 'durfte'], answer: 'durfte', explain: 'ich + dürfen → durfte.' },
            ],
          },
          {
            scene: 'Una reunión cancelada',
            lines: [['', 'Er [[0]] krank und [[1]] nicht kommen. (sein, können)']],
            blanks: [
              { options: ['war', 'hatte', 'ist', 'warst'], answer: 'war', explain: 'er + sein → war.' },
              { options: ['konnte', 'könnte', 'kann', 'konnten'], answer: 'konnte', explain: 'er + können → konnte.' },
            ],
          },
          {
            scene: 'Planes de vacaciones en el pasado',
            lines: [['', 'Wir [[0]] nach Italien fahren, aber wir [[1]] kein Geld. (wollen, haben)']],
            blanks: [
              { options: ['wollten', 'wollte', 'wollen', 'würden'], answer: 'wollten', explain: 'wir + wollen → wollten.' },
              { options: ['hatten', 'hatte', 'haben', 'hattet'], answer: 'hatten', explain: 'wir + haben → hatten.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el cuento con las formas correctas del Präteritum.',
        type: 'guidedText',
        scene: 'Un cuento corto: el lobo y la abuela.',
        text: 'Es [[0]] einmal ein kleines Mädchen. Es [[1]] eine rote Mütze und [[2]] immer sehr freundlich sein (sollen). Einmal [[3]] es in den Wald gehen (müssen). Der Wald [[4]] dunkel und das Mädchen [[5]] Angst. Aber es [[6]] mutig.',
        blanks: [
          { options: ['war', 'hatte', 'warst', 'waren'], answer: 'war', explain: '"Es war einmal" = Érase una vez. es (3ª sg) + sein → war.' },
          { options: ['hatte', 'war', 'hatten', 'hate'], answer: 'hatte', explain: 'es + haben → hatte.' },
          { options: ['sollte', 'sollten', 'soll', 'solltest'], answer: 'sollte', explain: 'es + sollen → sollte.' },
          { options: ['musste', 'müsste', 'muss', 'mussten'], answer: 'musste', explain: 'es + müssen → musste.' },
          { options: ['war', 'hatte', 'waren', 'ist'], answer: 'war', explain: 'Der Wald (3ª sg) + sein → war.' },
          { options: ['hatte', 'war', 'hatten', 'habe'], answer: 'hatte', explain: 'es + haben → hatte. "Angst haben" = tener miedo.' },
          { options: ['war', 'hatte', 'waren', 'ist'], answer: 'war', explain: 'es + sein → war. "Mutig sein" = ser valiente.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Completa libremente con la forma correcta del Präteritum.',
        type: 'freeText',
        scene: 'Elena recuerda sus años de estudiante.',
        text: 'Als Studentin [[0]] ich oft wenig Geld. Ich [[1]] sehr viel lernen. Die Prüfungen [[2]] schwierig. Aber ich [[3]] nicht aufgeben — ich [[4]] unbedingt meinen Abschluss machen.',
        blanks: [
          { answer: 'hatte', accepted: ['hatte'], explain: 'ich + haben → hatte.' },
          { answer: 'musste', accepted: ['musste'], explain: 'ich + müssen → musste.' },
          { answer: 'waren', accepted: ['waren'], explain: 'Die Prüfungen (plural) + sein → waren.' },
          { answer: 'wollte', accepted: ['wollte'], explain: 'ich + wollen → wollte.' },
          { answer: 'wollte', accepted: ['wollte', 'musste'], explain: 'ich + wollen → wollte (o musste si expresa obligación).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones en Präteritum.',
        type: 'write',
        items: [
          {
            scene: 'Tu infancia',
            prompt: 'Di algo que tenías o eras cuando eras niño/a (hatte / war).',
            answer: 'Als ich klein war, hatte ich einen Hund und war sehr glücklich.',
            accepted: ['war ich', 'hatte ich', 'Als ich klein war'],
            explain: '"Als ich klein war" (cuando era pequeño/a) + Präteritum en la cláusula principal.',
          },
          {
            scene: 'Obligaciones del pasado',
            prompt: 'Di algo que tenías que hacer la semana pasada (musste).',
            answer: 'Letzte Woche musste ich viel für die Prüfung lernen.',
            accepted: ['musste ich', 'musste ... lernen', 'musste ... arbeiten'],
            explain: '"musste" + Infinitiv al final: musste + ... + Infinitiv.',
          },
          {
            scene: 'Capacidades en la infancia',
            prompt: 'Di algo que podías o no podías hacer de niño/a (konnte / konnte nicht).',
            answer: 'Als Kind konnte ich sehr gut Fahrrad fahren, aber ich konnte nicht schwimmen.',
            accepted: ['konnte ich', 'konnte nicht', 'konnte ... fahren'],
            explain: '"konnte" es la forma de können en Präteritum para ich/er/sie/es.',
          },
          {
            scene: 'Una historia breve',
            prompt: 'Comienza un cuento corto con "Es war einmal..." y añade 2 oraciones más.',
            answer: 'Es war einmal ein alter Mann. Er hatte kein Haus und musste in den Wald gehen.',
            accepted: ['Es war einmal', 'hatte', 'musste'],
            explain: '"Es war einmal" = Érase una vez. Sigue con hatte y musste para continuar la narración.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Escribe sobre tus obligaciones y capacidades del pasado.',
        type: 'write',
        items: [
          {
            scene: 'Tu semana pasada',
            prompt: 'Describe tu semana pasada usando war, hatte y al menos un modal (musste/konnte/wollte).',
            answer: 'Letzte Woche war ich sehr beschäftigt. Ich hatte viele Termine und musste jeden Tag früh aufstehen. Ich konnte kaum schlafen.',
            accepted: ['war ich', 'hatte ich', 'musste', 'konnte'],
            explain: 'Combina war (sein), hatte (haben) y modales: musste/konnte/wollte.',
          },
          {
            scene: 'Habilidades de infancia',
            prompt: 'Pregunta a alguien qué podía o no podía hacer de niño/a.',
            answer: 'Was konntest du als Kind gut machen? Konntest du schwimmen?',
            accepted: ['konntest du', 'Was konntest', 'Konntest du'],
            explain: 'du + können → konntest. En pregunta, el verbo va en posición 1.',
          },
          {
            scene: 'Un relato del pasado',
            prompt: 'Cuenta qué pasó ayer usando war, hatte y un modal.',
            answer: 'Gestern war ich krank. Ich hatte Fieber und musste zu Hause bleiben.',
            accepted: ['war ich', 'hatte ich', 'musste', 'konnte'],
            explain: 'Narración cotidiana con Präteritum: war (sein), hatte (haben), musste (müssen).',
          },
        ],
      },
    ],
  },
}

export default topic
