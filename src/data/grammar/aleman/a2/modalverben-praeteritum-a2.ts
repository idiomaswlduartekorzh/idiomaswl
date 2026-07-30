import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'modalverben-praeteritum-a2',
  order: '13',
  color: '#c9a900',
  category: 'Verben',
  level: 'A2',
  title: 'Modalverben im Präteritum',
  shortTitle: 'Modalverben Präteritum',
  metaTitle: 'Verbos modales en pasado alemán A2 — musste, konnte, wollte',
  description:
    'Los verbos modales en alemán prefieren el Präteritum (pasado simple) incluso en el habla oral, a diferencia de otros verbos que usan el Perfekt. Las formas son regulares: se añade -te a la raíz sin Umlaut: musste, durfte, konnte, wollte, sollte, mochte.',
  lead: 'El pasado de los modales: musste, durfte, konnte, wollte, sollte, mochte.',
  outcomes: [
    'Conjugar los seis verbos modales en Präteritum',
    'Eliminar el Umlaut en las formas de Präteritum',
    'Usar el infinitivo sin zu tras el modal en Präteritum',
    'Reconocer cuándo usar Präteritum de modales en vez de Perfekt',
  ],

  guide: {
    goal: 'Usar los verbos modales en Präteritum correctamente en oraciones pasadas.',
    model: 'Ich musste gestern arbeiten. / Er konnte nicht kommen. / Wir wollten ins Kino gehen.',
    formula: 'Modal (Präteritum) + ... + Infinitiv (final)',
    decisions: [
      'Los modales en Präteritum pierden el Umlaut: müssen→musste, dürfen→durfte, können→konnte, mögen→mochte',
      'wollen y sollen no tienen Umlaut en infinitivo, así que solo añaden -te: wollte, sollte',
      'La conjugación es igual para ich y er/sie/es: ich musste = er musste (sin -t adicional)',
      'wir, sie/Sie toman -ten: wir mussten, sie durften, wir wollten',
      'El infinitivo del verbo principal va al FINAL, igual que en presente: Ich musste früh aufstehen.',
      'En oral se prefiere el Präteritum de modales sobre el Perfekt: "Ich konnte nicht kommen" (mejor que "Ich habe nicht kommen können")',
    ],
    table: [
      ['Modalverb', 'Präteritum (ich/er)', 'Bedeutung'],
      ['müssen', 'musste', 'tenía que / tuve que'],
      ['dürfen', 'durfte', 'tenía permiso / pude (con permiso)'],
      ['können', 'konnte', 'podía / pude (habilidad)'],
      ['wollen', 'wollte', 'quería / quise'],
      ['sollen', 'sollte', 'debía / se suponía que'],
      ['mögen', 'mochte', 'le gustaba / solía gustar'],
    ],
    mistakes: [
      'Mantener el Umlaut en Präteritum: INCORRECTO "müsste" (= Konjunktiv II) → CORRECTO "musste"',
      'Añadir -t extra en ich/er: INCORRECTO "ich musstet" → CORRECTO "ich musste"',
      'Poner zu antes del infinitivo: INCORRECTO "Ich musste zu gehen" → CORRECTO "Ich musste gehen"',
    ],
  },

  seo: [
    {
      heading: '¿Por qué los modales usan Präteritum en vez de Perfekt?',
      paragraphs: [
        'En alemán, mientras que la mayoría de los verbos prefieren el Perfekt en el habla oral para el pasado, los verbos modales son una excepción: se usan casi siempre en su forma de Präteritum, incluso en conversación. Decir "Ich musste arbeiten" es mucho más natural que "Ich habe arbeiten müssen" (que, aunque correcto, suena muy formal o escrito).',
      ],
    },
    {
      heading: '¿Cómo son las formas de Präteritum de los modales alemanes?',
      paragraphs: [
        'La regla es simple: se añade -te a la raíz sin Umlaut, y la conjugación es igual para todas las personas excepto wir/sie/Sie (que añaden -ten). müssen → musste, dürfen → durfte, können → konnte, mögen → mochte, wollen → wollte (sin Umlaut en infinitivo), sollen → sollte (sin Umlaut en infinitivo).',
        'Atención: "müsste" (con Umlaut) es el Konjunktiv II de müssen (= debería), no el Präteritum. El Präteritum es "musste" (sin Umlaut).',
      ],
    },
    {
      heading: '¿Dónde va el infinitivo con modales en Präteritum?',
      paragraphs: [
        'La estructura es la misma que en presente: el modal conjugado va en posición 2, y el infinitivo del verbo principal va al final. "Ich musste gestern sehr früh aufstehen." En oraciones subordinadas, el modal va al final en forma de Infinitiv + modal: "weil ich früh aufstehen musste".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Modalverben Präteritum: sin Umlaut, -te suffix, infinitivo al final.',
    graphicPrompt: 'Tabla de conjugación de modales en Präteritum con ejemplos de oraciones.',
    scene: [
      ['Ich musste gestern lange arbeiten', 'Tuve que trabajar mucho ayer'],
      ['Er durfte nicht ausgehen', 'No le dejaban salir'],
      ['Wir konnten nicht schlafen', 'No pudimos dormir'],
      ['Sie wollte nach Hause gehen', 'Quería irse a casa'],
      ['Du solltest früher kommen', 'Se suponía que venías antes'],
      ['Als Kind mochte ich kein Gemüse', 'De niño no me gustaban las verduras'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['musste/durfte/konnte/wollte/sollte/mochte', 'sin Umlaut', 'Infinitiv al final'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del verbo modal en Präteritum.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de una obligación pasada',
            lines: [['', 'Ich ___ gestern sehr früh aufstehen. (müssen)']],
            options: ['musste', 'müsste', 'musstet', 'mussten'],
            answer: 'musste',
            explain: '"müssen" en Präteritum: musste (sin Umlaut). ich/er/sie/es = musste.',
          },
          {
            scene: 'No tener permiso de niño',
            lines: [['', 'Als Kind ___ ich nicht lange aufbleiben. (dürfen)']],
            options: ['durfte', 'dürfte', 'durften', 'durftest'],
            answer: 'durfte',
            explain: '"dürfen" en Präteritum: durfte (sin Umlaut). ich = durfte.',
          },
          {
            scene: 'No poder asistir',
            lines: [['', 'Er ___ nicht zum Treffen kommen. (können)']],
            options: ['konnte', 'könnte', 'konnten', 'konnt'],
            answer: 'konnte',
            explain: '"können" en Präteritum: konnte. er/sie/es = konnte (igual que ich).',
          },
          {
            scene: 'Querer ir a la fiesta',
            lines: [['', 'Wir ___ unbedingt zur Party gehen. (wollen)']],
            options: ['wollten', 'wollte', 'wollt', 'wolltest'],
            answer: 'wollten',
            explain: '"wollen" en Präteritum: wollte (ich/er), wollten (wir/sie). wir = wollten.',
          },
          {
            scene: 'Debiendo llegar temprano',
            lines: [['', 'Du ___ um 8 Uhr da sein. (sollen)']],
            options: ['solltest', 'sollte', 'sollten', 'sollt'],
            answer: 'solltest',
            explain: '"sollen" en Präteritum: du = solltest (con -st para la 2.ª persona).',
          },
          {
            scene: 'Gustos de la infancia',
            lines: [['', 'Als Kind ___ ich keine Milch. (mögen)']],
            options: ['mochte', 'möchte', 'mochten', 'mogte'],
            answer: 'mochte',
            explain: '"mögen" en Präteritum: mochte (sin Umlaut). ich = mochte.',
          },
          {
            scene: 'Obligación para toda la clase',
            lines: [['', 'Die Schüler ___ eine Prüfung schreiben. (müssen)']],
            options: ['mussten', 'musste', 'müssten', 'musstet'],
            answer: 'mussten',
            explain: '"müssen" en Präteritum: die Schüler (= sie) = mussten.',
          },
          {
            scene: 'No poder hablar alemán antes',
            lines: [['', 'Vor zwei Jahren ___ ich kein Wort Deutsch sprechen. (können)']],
            options: ['konnte', 'könnte', 'konnten', 'konnt'],
            answer: 'konnte',
            explain: '"können" en Präteritum: ich = konnte.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa el modal en Präteritum y el infinitivo al final.',
        type: 'dual',
        items: [
          {
            scene: 'Hablando de un viaje cancelado',
            lines: [['', 'Wir [[0]] leider nicht nach Berlin [[1]]. (können, fahren)']],
            blanks: [
              { options: ['konnten', 'konnte', 'könnte', 'konnt'], answer: 'konnten', explain: '"können" Präteritum: wir = konnten.' },
              { options: ['fahren', 'zu fahren', 'gefahren', 'fährt'], answer: 'fahren', explain: 'Infinitiv al final: fahren (sin zu tras modal).' },
            ],
          },
          {
            scene: 'Una obligación del pasado',
            lines: [['', 'Sie [[0]] jeden Tag um 6 Uhr [[1]]. (müssen, aufstehen)']],
            blanks: [
              { options: ['musste', 'mussten', 'müsste', 'musstest'], answer: 'musste', explain: '"müssen" Präteritum: sie (singular) = musste.' },
              { options: ['aufstehen', 'aufgestanden', 'zu aufstehen', 'aufstand'], answer: 'aufstehen', explain: 'Infinitiv al final: aufstehen (sin zu tras modal).' },
            ],
          },
          {
            scene: 'Un deseo pasado no cumplido',
            lines: [['', 'Er [[0]], aber er [[1]] nicht. (wollen/kommen, können/kommen)']],
            blanks: [
              { options: ['wollte kommen', 'wollte', 'wollen', 'wollten kommen'], answer: 'wollte kommen', explain: '"wollen" Präteritum: er wollte + Infinitiv kommen.' },
              { options: ['konnte', 'konnten', 'konnte kommen', 'könnte'], answer: 'konnte', explain: '"können" Präteritum: er konnte (nicht kommen — infinitivo implícito).' },
            ],
          },
          {
            scene: 'Permiso en la escuela',
            lines: [['', 'In der Schule [[0]] wir nicht auf dem Handy [[1]]. (dürfen, spielen)']],
            blanks: [
              { options: ['durften', 'durfte', 'dürfen', 'durftest'], answer: 'durften', explain: '"dürfen" Präteritum: wir = durften.' },
              { options: ['spielen', 'zu spielen', 'gespielt', 'spielt'], answer: 'spielen', explain: 'Infinitiv al final: spielen (sin zu).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el texto con las formas correctas de los modales en Präteritum.',
        type: 'guidedText',
        scene: 'Luisa habla de sus reglas de infancia.',
        text: 'Als ich Kind war, [[0]] ich immer früh ins Bett gehen. Ich [[1]] nicht lange fernsehen. Manchmal [[2]] ich meiner Mutter in der Küche helfen. Ich [[3]] kein Gemüse essen, aber ich [[4]] es nicht vermeiden.',
        blanks: [
          { options: ['musste', 'mussten', 'müsste', 'musstest'], answer: 'musste', explain: '"müssen" Präteritum: ich musste.' },
          { options: ['durfte', 'durften', 'dürfte', 'durft'], answer: 'durfte', explain: '"dürfen" Präteritum: ich durfte (nicht).' },
          { options: ['sollte', 'sollten', 'soll', 'solltest'], answer: 'sollte', explain: '"sollen" Präteritum: ich sollte.' },
          { options: ['mochte', 'möchte', 'mochten', 'mogte'], answer: 'mochte', explain: '"mögen" Präteritum: ich mochte (kein Gemüse).' },
          { options: ['konnte', 'konnten', 'könnte', 'konnt'], answer: 'konnte', explain: '"können" Präteritum: ich konnte (nicht vermeiden).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del modal en Präteritum sin opciones.',
        type: 'freeText',
        scene: 'Dario habla de un día complicado.',
        text: 'Gestern [[0]] ich sehr früh aufstehen. Ich [[1]] nicht frühstücken, weil keine Zeit war. Ich [[2]] schnell zur Arbeit fahren. Am Abend [[3]] ich endlich nach Hause. Ich [[4]] schon früher gehen, aber mein Chef sagte nein.',
        blanks: [
          { answer: 'musste', accepted: ['musste'], explain: '"müssen" Präteritum: ich musste.' },
          { answer: 'konnte', accepted: ['konnte', 'durfte'], explain: '"können/dürfen" Präteritum: ich konnte/durfte (nicht frühstücken).' },
          { answer: 'musste', accepted: ['musste'], explain: '"müssen" Präteritum: ich musste.' },
          { answer: 'konnte', accepted: ['konnte', 'durfte'], explain: '"können/dürfen" Präteritum: ich konnte/durfte (endlich gehen).' },
          { answer: 'wollte', accepted: ['wollte'], explain: '"wollen" Präteritum: ich wollte (gern früher gehen).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones usando verbos modales en Präteritum.',
        type: 'write',
        items: [
          {
            scene: 'Una obligación pasada',
            prompt: 'Di algo que tuviste que hacer ayer (musste + Infinitiv).',
            answer: 'Ich musste gestern lange im Büro arbeiten.',
            accepted: ['musste', 'Ich musste'],
            explain: '"müssen" Präteritum: ich musste + Infinitiv al final.',
          },
          {
            scene: 'Algo que no podías hacer de niño',
            prompt: 'Di algo que no podías hacer cuando eras niño/a (durfte nicht o konnte nicht).',
            answer: 'Als ich klein war, durfte ich nicht alleine rausgehen.',
            accepted: ['durfte nicht', 'konnte nicht', 'Als ich klein'],
            explain: '"dürfen" (permiso) o "können" (habilidad) en Präteritum + nicht.',
          },
          {
            scene: 'Algo que querías hacer pero no pudiste',
            prompt: 'Di algo que querías hacer pero no pudiste (wollte... aber konnte nicht).',
            answer: 'Ich wollte ins Kino gehen, aber ich konnte nicht.',
            accepted: ['wollte', 'konnte nicht', 'wollte ... aber'],
            explain: '"wollen" Präteritum: wollte. "können" Präteritum: konnte.',
          },
          {
            scene: 'Gustos pasados',
            prompt: 'Di algo que no te gustaba de niño/a pero ahora sí (mochte... aber jetzt mag ich).',
            answer: 'Als Kind mochte ich keinen Kaffee, aber jetzt mag ich ihn.',
            accepted: ['mochte', 'Als Kind mochte'],
            explain: '"mögen" Präteritum: mochte. Presente: mag. Nota: sin Umlaut en Präteritum.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Escribe sobre obligaciones, permisos y deseos pasados.',
        type: 'write',
        items: [
          {
            scene: 'Las reglas de tu infancia',
            prompt: 'Escribe 2-3 cosas que tenías o no tenías permiso de hacer de niño/a.',
            answer: 'Als ich jung war, musste ich jeden Abend um 21 Uhr ins Bett. Ich durfte nicht lange fernsehen. Ich sollte immer meine Hausaufgaben machen.',
            accepted: ['musste', 'durfte', 'sollte', 'konnte', 'mochte'],
            explain: 'Präteritum de modales: musste/durfte/sollte/konnte/wollte/mochte.',
          },
          {
            scene: 'Un día difícil en el pasado',
            prompt: 'Cuenta un día complicado que tuviste usando al menos 3 modales en Präteritum.',
            answer: 'Letzte Woche musste ich sehr früh aufstehen. Ich wollte mehr schlafen, aber ich konnte nicht. Ich sollte um 8 im Büro sein.',
            accepted: ['musste', 'wollte', 'konnte', 'sollte', 'durfte'],
            explain: 'Kombination de modales en Präteritum para describir un día.',
          },
          {
            scene: 'Antes y ahora',
            prompt: 'Compara algo que podías o querías de niño/a con lo de ahora (Präteritum vs. Präsens).',
            answer: 'Als ich Kind war, mochte ich kein Gemüse. Jetzt mag ich viele Gemüsesorten. Früher konnte ich nicht schwimmen, aber jetzt kann ich es gut.',
            accepted: ['mochte', 'konnte', 'wollte', 'jetzt mag', 'jetzt kann', 'jetzt will'],
            explain: 'Contraste Präteritum (mochte, konnte, wollte) con Präsens (mag, kann, will).',
          },
        ],
      },
    ],
  },
}

export default topic
