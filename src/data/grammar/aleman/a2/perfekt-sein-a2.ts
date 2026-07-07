import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'perfekt-sein-a2',
  order: '02',
  color: '#c9a900',
  category: 'Verben',
  level: 'A2',
  title: 'Das Perfekt mit sein im Deutschen A2',
  shortTitle: 'Perfekt mit sein',
  metaTitle: 'Perfekt con sein — Alemán A2: Pasado con Verbos de Movimiento',
  description:
    'Algunos verbos forman el Perfekt con sein en lugar de haben. Son principalmente verbos de movimiento (ir de A a B) y de cambio de estado. Aprender cuáles usan sein es esencial para hablar del pasado correctamente.',
  lead: 'Verbos de movimiento y cambio de estado usan sein + Partizip II en el pasado.',
  outcomes: [
    'Identificar los verbos que usan sein como auxiliar en el Perfekt',
    'Conjugar sein (bin/bist/ist/sind/seid/sind) como auxiliar',
    'Reconocer el Partizip II de los verbos de movimiento más comunes',
    'Distinguir cuándo usar haben y cuándo usar sein',
  ],

  guide: {
    goal: 'Usar sein + Partizip II para verbos de movimiento y cambio de estado.',
    model: 'Ich bin nach Hause gegangen. / Sie ist in Berlin geblieben. / Wir sind früh aufgestanden.',
    formula: 'Sujeto + sein (conjugado) + ... + Partizip II',
    decisions: [
      'Usa sein si el verbo expresa movimiento de A a B: gehen → gegangen, kommen → gekommen, fahren → gefahren',
      'Usa sein si el verbo expresa cambio de estado: werden → geworden, aufwachen → aufgewacht, einschlafen → eingeschlafen',
      'Verbos estáticos con sein: bleiben → geblieben (quedarse), sein → gewesen (haber estado)',
      'Verbos de vuelo y carrera: fliegen → geflogen, laufen → gelaufen, rennen → gerannt',
      'El Partizip II permanece invariable (no concuerda con el sujeto)',
      'Truco: si puedes preguntar ¿adónde? o ¿qué le pasó? → probablemente sein',
    ],
    table: [
      ['Persona', 'sein', 'Ejemplo'],
      ['ich', 'bin', 'Ich bin gegangen'],
      ['du', 'bist', 'Du bist gefahren'],
      ['er/sie/es', 'ist', 'Er ist gekommen'],
      ['wir', 'sind', 'Wir sind geblieben'],
      ['ihr', 'seid', 'Ihr seid geflogen'],
      ['sie/Sie', 'sind', 'Sie sind gelaufen'],
    ],
    mistakes: [
      'Usar haben con verbos de movimiento: INCORRECTO "Ich habe gegangen" → CORRECTO "Ich bin gegangen"',
      'Confundir "sein" como auxiliar con "haben": bleiben usa sein, no haben',
      'El Partizip II NO cambia con sein: "Sie sind gegangen" (no gegangene)',
    ],
  },

  seo: [
    {
      heading: 'Qué verbos usan sein en el Perfekt',
      paragraphs: [
        'La regla principal: los verbos que expresan movimiento de un lugar a otro usan sein como auxiliar. Los más comunes son: gehen (ir a pie), kommen (venir), fahren (ir en vehículo), fliegen (volar), laufen (correr/ir a pie), rennen (correr), reisen (viajar), schwimmen (nadar).',
        'También usan sein los verbos de cambio de estado: werden (volverse/llegar a ser), aufwachen (despertar), einschlafen (quedarse dormido), sterben (morir), wachsen (crecer). Y dos verbos especiales: bleiben (quedarse) y sein (estar/haber estado → gewesen).',
      ],
    },
    {
      heading: 'Cómo distinguir haben de sein',
      paragraphs: [
        'La prueba del movimiento: ¿El verbo lleva al sujeto de un lugar A a un lugar B? Si sí → sein. "Ich bin nach Berlin gefahren" (fui en coche a Berlín). Si el verbo tiene un objeto directo → casi siempre haben: "Ich habe das Auto gefahren" (conduje el coche).',
        'Algunos verbos pueden usarse con ambos auxiliares con significado diferente: "Ich habe geschwommen" (practiqué natación) vs "Ich bin durch den Fluss geschwommen" (atravesé el río nadando). Lo importante es aprender los verbos de sein de memoria desde el principio.',
      ],
    },
    {
      heading: 'Los Partizip II de los verbos con sein',
      paragraphs: [
        'La mayoría de los verbos con sein son irregulares: gehen → gegangen, kommen → gekommen, fahren → gefahren, fliegen → geflogen, laufen → gelaufen, bleiben → geblieben, werden → geworden, sein → gewesen.',
        'Algunos son regulares: reisen → gereist, passieren → passiert (no lleva ge- porque el acento está en la raíz). Aprende estos participios de memoria — son los más frecuentes en el alemán cotidiano.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Perfekt con sein: verbos de movimiento A→B y cambio de estado.',
    graphicPrompt: 'Flecha de A a B con persona en movimiento, sein conjugado y Partizip II al final.',
    scene: [
      ['Ich bin gegangen', 'Yo he ido / fui (a pie)'],
      ['Du bist gefahren', 'Tú has ido / fuiste (en coche)'],
      ['Er ist gekommen', 'Él ha venido / vino'],
      ['Wir sind geflogen', 'Nosotros hemos volado'],
      ['Sie ist geblieben', 'Ella se ha quedado'],
      ['Es ist passiert', 'Ha sucedido / ocurrió'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['sein o haben', 'movimiento A→B', 'Partizip II al final'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige el auxiliar correcto: haben o sein.',
        type: 'choice',
        items: [
          {
            scene: 'Contando un viaje',
            lines: [['', 'Ich ___ nach München gefahren.']],
            options: ['bin', 'habe', 'ist', 'hat'],
            answer: 'bin',
            explain: '"fahren" expresa movimiento A→B → sein. Ich bin gefahren.',
          },
          {
            scene: 'Hablando de lo que comiste',
            lines: [['', 'Er ___ eine Pizza gegessen.']],
            options: ['hat', 'ist', 'habe', 'bin'],
            answer: 'hat',
            explain: '"essen" es un verbo transitivo estático → haben. Er hat gegessen.',
          },
          {
            scene: 'Describiendo la llegada',
            lines: [['', 'Sie ___ um 10 Uhr angekommen.']],
            options: ['ist', 'hat', 'bin', 'sind'],
            answer: 'ist',
            explain: '"ankommen" (llegar) es movimiento → sein. Sie ist angekommen.',
          },
          {
            scene: 'Contando sobre una carrera',
            lines: [['', 'Wir ___ sehr schnell gelaufen.']],
            options: ['sind', 'haben', 'ist', 'seid'],
            answer: 'sind',
            explain: '"laufen" (correr/ir) es movimiento → sein. Wir sind gelaufen.',
          },
          {
            scene: 'Hablando del trabajo',
            lines: [['', 'Du ___ lange gearbeitet.']],
            options: ['hast', 'bist', 'hat', 'hat'],
            answer: 'hast',
            explain: '"arbeiten" no es movimiento ni cambio de estado → haben. Du hast gearbeitet.',
          },
          {
            scene: 'Describiendo un vuelo',
            lines: [['', 'Meine Familie ___ nach Spanien geflogen.']],
            options: ['ist', 'hat', 'sind', 'habe'],
            answer: 'ist',
            explain: '"fliegen" es movimiento → sein. "Familie" es singular → ist.',
          },
          {
            scene: 'Hablando de quedarse en casa',
            lines: [['', 'Ich ___ zu Hause geblieben.']],
            options: ['bin', 'habe', 'ist', 'hat'],
            answer: 'bin',
            explain: '"bleiben" (quedarse) usa siempre sein. Ich bin geblieben.',
          },
          {
            scene: 'Un cambio de estado',
            lines: [['', 'Er ___ Arzt geworden.']],
            options: ['ist', 'hat', 'bin', 'sind'],
            answer: 'ist',
            explain: '"werden" (llegar a ser) es cambio de estado → sein. Er ist Arzt geworden.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa el auxiliar sein y el Partizip II.',
        type: 'dual',
        items: [
          {
            scene: 'Contando el viaje de María',
            lines: [['', 'Maria [[0]] gestern nach Berlin [[1]]. (fahren)']],
            blanks: [
              { options: ['ist', 'hat', 'sind', 'bin'], answer: 'ist', explain: '"fahren" → sein. Maria (3a sg) → ist.' },
              { options: ['gefahren', 'gefahrt', 'fahrt', 'gefahren'], answer: 'gefahren', explain: '"fahren" irregular: ge- + fahr + -en = gefahren.' },
            ],
          },
          {
            scene: 'Preguntando si vinieron',
            lines: [['', 'Wann [[0]] eure Freunde [[1]]? (kommen)']],
            blanks: [
              { options: ['sind', 'haben', 'ist', 'habt'], answer: 'sind', explain: '"kommen" → sein. eure Freunde (3a pl) → sind.' },
              { options: ['gekommen', 'gekommt', 'kommen', 'gekommt'], answer: 'gekommen', explain: '"kommen" irregular: ge- + komm + -en = gekommen.' },
            ],
          },
          {
            scene: 'Lo que pasó en la reunión',
            lines: [['', 'Leider [[0]] er nicht [[1]]. (kommen)']],
            blanks: [
              { options: ['ist', 'hat', 'bin', 'sind'], answer: 'ist', explain: '"kommen" → sein. er → ist.' },
              { options: ['gekommen', 'gekommt', 'kommt', 'kommen'], answer: 'gekommen', explain: '"kommen" → gekommen (irregular).' },
            ],
          },
          {
            scene: 'Hablando del viaje familiar',
            lines: [['', 'Wir [[0]] letztes Jahr nach Japan [[1]]. (fliegen)']],
            blanks: [
              { options: ['sind', 'haben', 'ist', 'seid'], answer: 'sind', explain: '"fliegen" → sein. wir → sind.' },
              { options: ['geflogen', 'geflogt', 'geflogen', 'flog'], answer: 'geflogen', explain: '"fliegen" irregular: ge- + flog + -en = geflogen.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa con sein conjugado o Partizip II según corresponda.',
        type: 'guidedText',
        scene: 'Thomas describe su fin de semana con su familia.',
        text: 'Am Samstag [[0]] wir früh [[1]] (aufstehen). Wir [[2]] zum Bahnhof [[3]] (gehen) und dann [[4]] wir nach Hamburg [[5]] (fahren). Wir [[6]] den ganzen Tag dort [[7]] (bleiben). Am Abend [[8]] wir müde nach Hause [[9]] (kommen).',
        blanks: [
          { options: ['sind', 'haben', 'ist', 'habe'], answer: 'sind', explain: '"aufstehen" → sein. wir → sind.' },
          { options: ['aufgestanden', 'aufgestanden', 'aufstand', 'aufsteht'], answer: 'aufgestanden', explain: '"aufstehen" separable + sein: auf + ge + standen = aufgestanden.' },
          { options: ['sind', 'haben', 'ist', 'habe'], answer: 'sind', explain: '"gehen" → sein. wir → sind.' },
          { options: ['gegangen', 'gegehen', 'gegangt', 'gehen'], answer: 'gegangen', explain: '"gehen" irregular: ge- + gang + -en = gegangen.' },
          { options: ['sind', 'haben', 'ist', 'habe'], answer: 'sind', explain: '"fahren" → sein. wir → sind.' },
          { options: ['gefahren', 'gefahrt', 'fahr', 'gefahren'], answer: 'gefahren', explain: '"fahren" irregular: ge- + fahr + -en = gefahren.' },
          { options: ['sind', 'haben', 'ist', 'habe'], answer: 'sind', explain: '"bleiben" → sein. wir → sind.' },
          { options: ['geblieben', 'gebliebt', 'geblieben', 'bleiben'], answer: 'geblieben', explain: '"bleiben" irregular: ge- + blieb + -en = geblieben.' },
          { options: ['sind', 'haben', 'ist', 'habe'], answer: 'sind', explain: '"kommen" → sein. wir → sind.' },
          { options: ['gekommen', 'gekommt', 'kommen', 'gekommt'], answer: 'gekommen', explain: '"kommen" irregular: ge- + komm + -en = gekommen.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Completa libremente con sein (conjugado) o haben (conjugado) + Partizip II.',
        type: 'freeText',
        scene: 'Anna describe su lunes.',
        text: 'Montag war stressig. Ich [[0]] früh [[1]] (aufwachen). Dann [[2]] ich schnell zur Schule [[3]] (laufen). Nach der Schule [[4]] ich nach Hause [[5]] (gehen).',
        blanks: [
          { answer: 'bin', accepted: ['bin'], explain: '"aufwachen" (despertarse) = cambio de estado → sein. ich → bin.' },
          { answer: 'aufgewacht', accepted: ['aufgewacht'], explain: '"aufwachen" separable: auf + ge + wach + t = aufgewacht.' },
          { answer: 'bin', accepted: ['bin'], explain: '"laufen" = movimiento → sein. ich → bin.' },
          { answer: 'gelaufen', accepted: ['gelaufen'], explain: '"laufen" irregular: ge- + lauf + -en = gelaufen.' },
          { answer: 'bin', accepted: ['bin'], explain: '"gehen" = movimiento → sein. ich → bin.' },
          { answer: 'gegangen', accepted: ['gegangen'], explain: '"gehen" irregular: ge- + gang + -en = gegangen.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones con Perfekt usando sein.',
        type: 'write',
        items: [
          {
            scene: 'Un viaje reciente',
            prompt: 'Di adónde fuiste el verano pasado usando sein + gefahren o geflogen.',
            answer: 'Letzten Sommer bin ich nach Spanien geflogen.',
            accepted: ['bin ich', 'bin ... geflogen', 'bin ... gefahren'],
            explain: 'Usa "bin" (ich) + Partizip II al final: Ich bin nach ... gefahren/geflogen.',
          },
          {
            scene: 'Llegadas y salidas',
            prompt: 'Di a qué hora llegaste a casa ayer.',
            answer: 'Gestern bin ich um 20 Uhr nach Hause gekommen.',
            accepted: ['bin ich', 'bin ... gekommen', 'bin ... angekommen'],
            explain: '"kommen" o "ankommen" → sein. Partícipio al final.',
          },
          {
            scene: 'Cambio de estado',
            prompt: 'Di en qué te has convertido o qué cambio has experimentado (werden).',
            answer: 'Ich bin müde geworden.',
            accepted: ['bin ... geworden', 'ist ... geworden'],
            explain: '"werden" expresa cambio → sein. Partizip II: geworden.',
          },
          {
            scene: 'Lo que hizo tu familia',
            prompt: 'Describe tres cosas que hizo tu familia usando sein.',
            answer: 'Meine Familie ist in den Urlaub gefahren, nach Paris geflogen und lange geblieben.',
            accepted: ['ist ... gefahren', 'ist ... geflogen', 'ist ... geblieben'],
            explain: '"Familie" es singular → ist. Verbos de movimiento → sein.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Describe un viaje o salida usando el Perfekt con sein.',
        type: 'write',
        items: [
          {
            scene: 'Tu último viaje',
            prompt: 'Escribe 2-3 oraciones sobre un viaje que hiciste (sein + Perfekt).',
            answer: 'Letzten Monat bin ich nach Berlin gefahren. Ich bin durch die Stadt gelaufen und in einem Hotel geblieben.',
            accepted: ['bin ... gefahren', 'bin ... gelaufen', 'bin ... geblieben'],
            explain: 'Los verbos de movimiento y "bleiben" usan sein: bin/bist/ist/sind + Partizip II.',
          },
          {
            scene: 'Pregunta sobre un viaje',
            prompt: 'Pregunta a alguien adónde fue (sein) y cuándo regresó.',
            answer: 'Wohin bist du gefahren? Wann bist du zurückgekommen?',
            accepted: ['bist du', 'Wohin bist', 'Wann bist'],
            explain: 'En preguntas: sein en posición 1, Partizip II al final.',
          },
          {
            scene: 'Distinción haben/sein',
            prompt: 'Escribe una oración con haben y otra con sein sobre el mismo fin de semana.',
            answer: 'Ich habe viel gegessen und bin danach nach Hause gegangen.',
            accepted: ['habe ... gegessen', 'bin ... gegangen', 'habe ... und bin'],
            explain: 'haben para acciones transitivas, sein para movimiento. Ambos en la misma oración es normal.',
          },
        ],
      },
    ],
  },
}

export default topic
