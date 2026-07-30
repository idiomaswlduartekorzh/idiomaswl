import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'reflexivverben-a2',
  order: '06',
  color: '#c9a900',
  category: 'Verben',
  level: 'A2',
  title: 'Die Reflexivverben im Deutschen A2',
  shortTitle: 'Reflexivverben',
  metaTitle: 'Verbos Reflexivos en Alemán A2 — Reflexivverben',
  description:
    'Los verbos reflexivos alemanes se forman con un pronombre reflexivo (mich/dich/sich/uns/euch/sich) que indica que la acción recae sobre el mismo sujeto. Son muy frecuentes en la vida cotidiana: lavarse, vestirse, alegrarse, interesarse.',
  lead: 'Ich wasche mich, du freust dich: los verbos que se doblan sobre sí mismos.',
  outcomes: [
    'Usar los pronombres reflexivos: mich/dich/sich/uns/euch/sich',
    'Construir oraciones con verbos reflexivos frecuentes',
    'Colocar el pronombre reflexivo correctamente en la oración',
    'Distinguir verbos obligatoriamente reflexivos de los opcionales',
  ],

  guide: {
    goal: 'Usar verbos reflexivos con el pronombre correcto en oraciones cotidianas.',
    model: 'Ich wasche mich. / Du freust dich. / Sie interessiert sich für Kunst.',
    formula: 'Sujeto + verbo conjugado + Reflexivpronomen (+ complemento)',
    decisions: [
      'El pronombre reflexivo concuerda con el sujeto: ich → mich, du → dich, er/sie/es/man → sich',
      'Wir → uns, ihr → euch, sie/Sie → sich',
      'Posición: inmediatamente después del verbo conjugado: Ich wasche mich. / Wir freuen uns.',
      'En cláusulas subordinadas: después del sujeto: ..., weil ich mich wasche.',
      'Con preposición: sich interessieren für, sich freuen auf/über, sich ärgern über',
      'Algunos verbos siempre son reflexivos: sich befinden, sich irren, sich weigern',
    ],
    table: [
      ['Persona', 'Reflexivpron.', 'Ejemplo'],
      ['ich', 'mich', 'Ich wasche mich'],
      ['du', 'dich', 'Du freust dich'],
      ['er/sie/es', 'sich', 'Er zieht sich an'],
      ['wir', 'uns', 'Wir setzen uns'],
      ['ihr', 'euch', 'Ihr irrt euch'],
      ['sie/Sie', 'sich', 'Sie interessieren sich'],
    ],
    mistakes: [
      'Usar el pronombre incorrecto: INCORRECTO "Ich wasche sich" → CORRECTO "Ich wasche mich"',
      'Olvidar el pronombre reflexivo: INCORRECTO "Ich freue" → CORRECTO "Ich freue mich"',
      'Colocar el reflexivo antes del verbo: INCORRECTO "Ich mich wasche" → CORRECTO "Ich wasche mich"',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los verbos reflexivos en alemán?',
      paragraphs: [
        'Un verbo reflexivo es aquel en que el sujeto y el objeto son la misma persona o cosa. En alemán, esto se marca con un pronombre reflexivo: mich, dich, sich, uns, euch, sich. Muchos verbos de la rutina diaria son reflexivos: sich waschen (lavarse), sich anziehen (vestirse), sich setzen (sentarse), sich vorstellen (presentarse o imaginarse).',
        'Algunos verbos son siempre reflexivos (no pueden usarse sin el pronombre): sich freuen (alegrarse), sich irren (equivocarse), sich beeilen (apresurarse), sich weigern (negarse). Otros son reflexivos opcionales: "Ich wasche mich" (me lavo) o "Ich wasche das Auto" (lavo el coche).',
      ],
    },
    {
      heading: '¿Cómo son los verbos reflexivos con preposición en alemán?',
      paragraphs: [
        'Muchos verbos reflexivos llevan una preposición fija: sich interessieren für + Akk. (interesarse por), sich freuen auf + Akk. (alegrarse de/anticipar), sich freuen über + Akk. (alegrarse de), sich ärgern über + Akk. (enfadarse por), sich kümmern um + Akk. (ocuparse de), sich erinnern an + Akk. (recordar).',
        'Estas combinaciones verbo+preposición son fijas — hay que aprenderlas como unidad. "Ich freue mich auf den Urlaub" (Me alegra / tengo ganas de las vacaciones — mirando al futuro). "Ich freue mich über das Geschenk" (Me alegra el regalo — reacción ante algo ya ocurrido).',
      ],
    },
    {
      heading: '¿Dónde va el pronombre reflexivo en la oración alemana?',
      paragraphs: [
        'En una oración principal, el pronombre reflexivo va inmediatamente después del verbo conjugado: "Ich ziehe mich schnell an." Si hay un pronombre de sujeto, el reflexivo lo sigue. Si el sujeto es un sustantivo, el reflexivo va después del verbo: "Maria freut sich sehr."',
        'En oraciones subordinadas (con "weil", "dass", "wenn"), el pronombre reflexivo va después del sujeto: "Ich weiß, dass er sich oft irrt." / "Weil sie sich immer beeilt, kommt sie nie zu spät."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Reflexivverben: pronombres reflexivos por persona y posición en la oración.',
    graphicPrompt: 'Persona mirándose al espejo con pronombres reflexivos en burbujas alrededor.',
    scene: [
      ['Ich wasche mich', 'Yo me lavo'],
      ['Du ziehst dich an', 'Tú te vistes'],
      ['Er freut sich', 'Él se alegra'],
      ['Wir setzen uns', 'Nosotros nos sentamos'],
      ['Ihr beeilt euch', 'Vosotros os dais prisa'],
      ['Sie interessiert sich für Sport', 'Ella se interesa por el deporte'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['mich/dich/sich/uns/euch', 'posición tras el verbo', 'reflexivos con preposición'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre reflexivo correcto.',
        type: 'choice',
        items: [
          {
            scene: 'Rutina matutina',
            lines: [['', 'Ich wasche ___ jeden Morgen. (yo me lavo)']],
            options: ['mich', 'sich', 'dich', 'uns'],
            answer: 'mich',
            explain: '"ich" → pronombre reflexivo "mich".',
          },
          {
            scene: 'Preguntando a alguien',
            lines: [['', 'Freust du ___ auf das Konzert? (tú te alegras)']],
            options: ['dich', 'mich', 'sich', 'euch'],
            answer: 'dich',
            explain: '"du" → pronombre reflexivo "dich".',
          },
          {
            scene: 'Hablando de alguien',
            lines: [['', 'Er interessiert ___ für Musik. (él se interesa)']],
            options: ['sich', 'mich', 'dich', 'uns'],
            answer: 'sich',
            explain: '"er" → pronombre reflexivo "sich".',
          },
          {
            scene: 'Nosotros',
            lines: [['', 'Wir setzen ___ an den Tisch. (nos sentamos)']],
            options: ['uns', 'sich', 'euch', 'mich'],
            answer: 'uns',
            explain: '"wir" → pronombre reflexivo "uns".',
          },
          {
            scene: 'Presentándose',
            lines: [['', 'Darf ich ___ vorstellen? Ich bin Anna.']],
            options: ['mich', 'sich', 'dich', 'uns'],
            answer: 'mich',
            explain: '"sich vorstellen" = presentarse. ich → mich.',
          },
          {
            scene: 'Grupo de amigos',
            lines: [['', 'Ihr müsst ___ beeilen! Der Zug fährt in 10 Minuten.']],
            options: ['euch', 'uns', 'sich', 'mich'],
            answer: 'euch',
            explain: '"ihr" → pronombre reflexivo "euch".',
          },
          {
            scene: 'Hablando de ella',
            lines: [['', 'Maria ärgert ___ über das Wetter.']],
            options: ['sich', 'mich', 'dich', 'euch'],
            answer: 'sich',
            explain: '"Maria" (3ª persona) → pronombre reflexivo "sich".',
          },
          {
            scene: 'En la clase',
            lines: [['', 'Die Kinder setzen ___ auf den Boden.']],
            options: ['sich', 'uns', 'euch', 'mich'],
            answer: 'sich',
            explain: '"Die Kinder" (3ª plural) → pronombre reflexivo "sich".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa el verbo y el pronombre reflexivo.',
        type: 'dual',
        items: [
          {
            scene: 'Rutina de la mañana',
            lines: [['', 'Ich [[0]] [[1]] und dann frühstücke ich. (waschen)']],
            blanks: [
              { options: ['wasche', 'wäsche', 'waschen', 'wasch'], answer: 'wasche', explain: '"waschen" conjugado: ich wasche.' },
              { options: ['mich', 'sich', 'dich', 'uns'], answer: 'mich', explain: '"ich" → pronombre reflexivo "mich".' },
            ],
          },
          {
            scene: 'Reacción a una buena noticia',
            lines: [['', 'Wir [[0]] [[1]] sehr über die gute Nachricht. (freuen)']],
            blanks: [
              { options: ['freuen', 'freue', 'freust', 'freut'], answer: 'freuen', explain: '"freuen" conjugado: wir freuen.' },
              { options: ['uns', 'sich', 'euch', 'mich'], answer: 'uns', explain: '"wir" → pronombre reflexivo "uns".' },
            ],
          },
          {
            scene: 'Interés cultural',
            lines: [['', 'Sie [[0]] [[1]] sehr für deutsche Kultur. (interessieren)']],
            blanks: [
              { options: ['interessiert', 'interessiere', 'interessieren', 'interessierst'], answer: 'interessiert', explain: '"interessieren" 3ª sg: sie interessiert.' },
              { options: ['sich', 'mich', 'dich', 'uns'], answer: 'sich', explain: '"sie" (singular) → pronombre reflexivo "sich".' },
            ],
          },
          {
            scene: 'Preparándose para salir',
            lines: [['', 'Beeilt [[0]] [[1]]! Wir müssen gehen! (ihr)']],
            blanks: [
              { options: ['euch', 'ihr', 'sich', 'uns'], answer: 'euch', explain: '"ihr" → pronombre reflexivo "euch". Imperativo: Beeilt euch!' },
              { options: ['!', '.', ',', '?'], answer: '!', explain: 'El imperativo suele llevar signo de exclamación.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el texto sobre la rutina matutina con verbos reflexivos.',
        type: 'guidedText',
        scene: 'Max describe su rutina de la mañana.',
        text: 'Jeden Morgen stehe ich um 7 Uhr auf. Zuerst [[0]] ich [[1]] (waschen). Dann [[2]] ich [[3]] an (anziehen). Ich [[4]] [[5]] immer, wenn ich Kaffee trinke (freuen). Um 8 Uhr [[6]] ich [[7]] und fahre zur Arbeit. (beeilen)',
        blanks: [
          { options: ['wasche', 'waschen', 'wäsche', 'waschet'], answer: 'wasche', explain: '"waschen" → ich wasche.' },
          { options: ['mich', 'sich', 'dich', 'uns'], answer: 'mich', explain: '"ich" → mich.' },
          { options: ['ziehe', 'anziehe', 'ziehen', 'ziehst'], answer: 'ziehe', explain: '"anziehen" → ich ziehe ... an (verbo separable).' },
          { options: ['mich', 'sich', 'dich', 'uns'], answer: 'mich', explain: '"ich" → mich.' },
          { options: ['freue', 'freuen', 'freust', 'freut'], answer: 'freue', explain: '"freuen" → ich freue.' },
          { options: ['mich', 'sich', 'dich', 'uns'], answer: 'mich', explain: '"ich" → mich.' },
          { options: ['beeile', 'beeilen', 'beeilte', 'beeilest'], answer: 'beeile', explain: '"sich beeilen" → ich beeile.' },
          { options: ['mich', 'sich', 'dich', 'uns'], answer: 'mich', explain: '"ich" → mich.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Completa libremente con el verbo reflexivo conjugado y el pronombre.',
        type: 'freeText',
        scene: 'La familia Müller se prepara para una fiesta.',
        text: 'Die Kinder [[0]] [[1]] schnell an (anziehen). Die Mutter [[2]] [[3]] die Haare (kämmen — reflexivo). Der Vater [[4]] [[5]] über die Verspätung (ärgern). Alle [[6]] [[7]] auf die Party. (freuen)',
        blanks: [
          { answer: 'ziehen', accepted: ['ziehen'], explain: '"anziehen" → sie ziehen ... an (3ª plural).' },
          { answer: 'sich', accepted: ['sich'], explain: 'Die Kinder (3ª pl) → sich.' },
          { answer: 'kämmt', accepted: ['kämmt'], explain: '"kämmen" → sie kämmt (3ª sg). Aquí reflexivo con Dativ (die Haare), pero aceptamos Akk.' },
          { answer: 'sich', accepted: ['sich'], explain: 'Die Mutter (3ª sg) → sich.' },
          { answer: 'ärgert', accepted: ['ärgert'], explain: '"ärgern" → er ärgert (3ª sg).' },
          { answer: 'sich', accepted: ['sich'], explain: 'Der Vater (3ª sg) → sich.' },
          { answer: 'freuen', accepted: ['freuen'], explain: '"freuen" → sie freuen (3ª pl).' },
          { answer: 'sich', accepted: ['sich'], explain: 'Alle (3ª pl) → sich.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones con verbos reflexivos.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina matutina',
            prompt: 'Describe tres acciones de tu mañana usando verbos reflexivos (waschen, anziehen, beeilen).',
            answer: 'Ich wasche mich, dann ziehe ich mich an und beeile mich, weil der Bus um 8 Uhr fährt.',
            accepted: ['wasche mich', 'ziehe mich an', 'beeile mich'],
            explain: 'Los tres verbos son reflexivos: sich waschen, sich anziehen, sich beeilen.',
          },
          {
            scene: 'Intereses y alegrías',
            prompt: 'Di por qué te interesas y de qué te alegras usando "sich interessieren für" y "sich freuen über".',
            answer: 'Ich interessiere mich sehr für Sprachen. Ich freue mich über jede neue Woche.',
            accepted: ['interessiere mich für', 'freue mich über', 'freue mich auf'],
            explain: '"sich interessieren für + Akk." / "sich freuen über + Akk." (reacción) o "sich freuen auf + Akk." (anticipación).',
          },
          {
            scene: 'Presentarse formalmente',
            prompt: 'Escribe una autopresentación formal usando "sich vorstellen".',
            answer: 'Darf ich mich vorstellen? Mein Name ist Carlos, ich komme aus Kolumbien und studiere Deutsch.',
            accepted: ['mich vorstellen', 'Darf ich mich', 'ich stelle mich vor'],
            explain: '"sich vorstellen" = presentarse. "Darf ich mich vorstellen?" = ¿Me permite presentarme?',
          },
          {
            scene: 'Lo que alguien siente',
            prompt: 'Describe cómo se siente alguien usando "sich freuen", "sich ärgern" o "sich interessieren".',
            answer: 'Mein Bruder ärgert sich über die langen Wartezeiten, aber er freut sich auf den Urlaub.',
            accepted: ['sich ärgert', 'ärgert sich', 'freut sich', 'interessiert sich'],
            explain: '"sich ärgern über" = enfadarse por; "sich freuen auf" = tener ganas de algo futuro.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Describe tu rutina o tus emociones usando verbos reflexivos.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina semanal',
            prompt: 'Describe tu rutina de tres días usando al menos 4 verbos reflexivos diferentes.',
            answer: 'Montags wasche ich mich früh, ziehe mich sportlich an und beeile mich zur Arbeit. Abends erhole ich mich und freue mich auf den nächsten Tag.',
            accepted: ['wasche mich', 'ziehe mich', 'beeile mich', 'erhole mich', 'freue mich'],
            explain: 'Combina verbos reflexivos de rutina y emociones: waschen, anziehen, beeilen, erholen, freuen.',
          },
          {
            scene: 'Reacciones emocionales',
            prompt: 'Di tres cosas que te alegran, una que te molesta y una por la que te interesas.',
            answer: 'Ich freue mich über Musik, gutes Essen und Freundschaften. Ich ärgere mich manchmal über den Lärm. Ich interessiere mich für Reisen.',
            accepted: ['freue mich', 'ärgere mich', 'interessiere mich'],
            explain: '"sich freuen über" (alegrarse), "sich ärgern über" (molestarse), "sich interessieren für" (interesarse).',
          },
          {
            scene: 'Hablando de otra persona',
            prompt: 'Describe la rutina matutina de alguien que conoces usando verbos reflexivos en 3ª persona.',
            answer: 'Meine Mutter wacht um 6 Uhr auf. Sie wäscht sich, zieht sich elegant an und setzt sich zum Frühstück.',
            accepted: ['wäscht sich', 'zieht sich an', 'setzt sich', 'beeilt sich'],
            explain: '3ª persona sg: er/sie/es + sich. Los verbos irregulares cambian de vocal: waschen → wäscht.',
          },
        ],
      },
    ],
  },
}

export default topic
