import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'modalverben-prateritum-b1',
  order: '06',
  color: '#c9a900',
  category: 'Verben',
  level: 'B1',
  title: 'Modalverben Präteritum en Alemán B1 — Pasado de los Verbos Modales',
  shortTitle: 'Modalverben Präteritum',
  metaTitle: 'Modalverben Präteritum B1 — musste, konnte, durfte, wollte, sollte en alemán',
  description:
    'Los verbos modales en alemán forman el pasado con Präteritum, no con Perfekt. Las formas son regulares con Umlaut eliminada: musste, konnte, durfte, wollte, sollte, mochte. Son las formas más usadas para narrar situaciones del pasado.',
  lead: 'Aprende el Präteritum de los verbos modales alemanes: las 6 formas, sus significados y cómo narrar obligaciones, posibilidades y permisos en el pasado.',
  outcomes: [
    'Conjuga todos los verbos modales en Präteritum: musste, konnte, durfte, wollte, sollte, mochte',
    'Usa el Präteritum modal para narrar situaciones de pasado',
    'Combina el modal en Präteritum con el Infinitiv al final',
    'Diferencia el significado de cada modal en contextos pasados',
  ],

  guide: {
    goal: 'Narrar obligaciones, posibilidades, permisos e intenciones en el pasado usando los verbos modales en Präteritum.',
    model: 'Ich musste gestern früh aufstehen. / Er konnte nicht kommen. / Wir durften das nicht machen.',
    formula: 'Modal-Präteritum + Subjekt... + Infinitiv (am Ende)',
    decisions: [
      'Todos los modales en Präteritum son regulares (sin Umlaut): muSSTE, konNTE, duRFTE, woLLTE, soLLTE, moGHTE.',
      'La terminación es siempre -te (ich), -test (du), -te (er/sie/es), -ten (wir), -tet (ihr), -ten (sie/Sie).',
      'El Infinitiv del verbo principal va al FINAL: "Er konnte nicht schlafen." / "Wir mussten früh aufstehen."',
      'Negación: "nicht" va antes del Infinitiv: "Ich konnte ihn nicht sehen."',
      'En el habla y escritura, los modales casi siempre usan Präteritum (no Perfekt): "Ich musste" (no "Ich habe gemusst").',
      'El Perfekt de los modales se usa solo si hay verbo principal también: "Ich habe das nicht machen können/müssen."',
    ],
    table: [
      ['Modal', 'Präteritum (ich)', 'Significado pasado'],
      ['müssen', 'musste', 'tenía que, debía'],
      ['können', 'konnte', 'podía, sabía (habilidad)'],
      ['dürfen', 'durfte', 'podía (permiso), tenía permiso'],
      ['wollen', 'wollte', 'quería, tenía intención de'],
      ['sollen', 'sollte', 'debía (según otros), se suponía que'],
    ],
    mistakes: [
      '"Ich habe gemusst nach Hause gehen" ❌ → "Ich musste nach Hause gehen" ✓ — Präteritum simple, no Perfekt.',
      '"Ich konnte nicht zu kommen" ❌ → "Ich konnte nicht kommen" ✓ — sin "zu" después del modal.',
      '"Wir mussten gehen früh" ❌ → "Wir mussten früh gehen" ✓ — el Infinitiv va al FINAL de la oración.',
    ],
  },

  seo: [
    {
      heading: 'Los verbos modales en Präteritum: por qué no se usa Perfekt',
      paragraphs: [
        'En alemán, los verbos modales casi siempre forman el pasado con Präteritum, no con Perfekt. Decir "Ich habe nicht kommen gekonnt" suena muy torpe. Lo natural es: "Ich konnte nicht kommen." Esta es una de las pocas excepciones a la regla de que el Perfekt es el tiempo del pasado preferido en el habla cotidiana.',
        'El Perfekt de modales (hatte gemusst, hatte gekonnt) se reserva para oraciones donde hay otro verbo dependiente en la misma oración subordinada. En prácticamente todos los demás casos, usa el Präteritum simple.',
      ],
    },
    {
      heading: 'Las 6 formas: conjugación completa',
      paragraphs: [
        'Todos los verbos modales siguen el mismo patrón en Präteritum: base sin Umlaut + terminación -te/-test/-te/-ten/-tet/-ten. müssen → musste/musstest/musste/mussten/musstet/mussten.',
        'El mismo patrón: können → konnte(n/test); dürfen → durfte(n/test); wollen → wollte(n/test); sollen → sollte(n/test); mögen → mochte(n/test). Nota: mögen pierde la -g- y añade -chte: mochte.',
      ],
      table: [
        ['Persona', 'müssen', 'können', 'dürfen'],
        ['ich', 'musste', 'konnte', 'durfte'],
        ['du', 'musstest', 'konntest', 'durftest'],
        ['er/sie/es', 'musste', 'konnte', 'durfte'],
        ['wir/sie/Sie', 'mussten', 'konnten', 'durften'],
      ],
    },
    {
      heading: 'Matices de significado en el pasado',
      paragraphs: [
        '"musste" expresa obligación o necesidad pasada: "Ich musste heute früh aufstehen." (Tuve que levantarme temprano.) "konnte" expresa habilidad o posibilidad: "Als Kind konnte ich gut schwimmen." (De niño sabía nadar bien.)',
        '"durfte" indica permiso pasado: "Als Kind durfte ich bis 22 Uhr aufbleiben." (De niño podía quedarme hasta las 22h.) "wollte" indica intención: "Ich wollte anrufen, aber ich hatte keine Zeit." "sollte" indica obligación externa: "Ich sollte um 8 Uhr dort sein."',
      ],
    },
    {
      heading: 'Uso en narraciones y textos escritos',
      paragraphs: [
        'En textos narrativos y escritos formales, los modales en Präteritum son especialmente comunes. Los relatos de eventos pasados, noticias históricas y anécdotas personales usan modales en Präteritum con naturalidad.',
        'Ejemplo narrativo: "Als Maria jung war, wollte sie Ärztin werden. Sie musste viel studieren und konnte wenig ausgehen. Aber sie durfte nach dem Studium in die Großstadt ziehen." Este flujo narrativo con modales en Präteritum es completamente natural.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Modalverben Präteritum B1: musste, konnte, durfte, wollte, sollte — sin Umlaut, terminación -te, Infinitiv am Ende.',
    graphicPrompt: 'Línea de tiempo del pasado con globos de diálogo mostrando obligaciones, permisos y deseos del pasado.',
    scene: [
      ['Ich musste gestern sehr lange arbeiten.', 'Ayer tuve que trabajar muchísimo.'],
      ['Als Kind konnte ich gut Fußball spielen.', 'De niño sabía jugar bien al fútbol.'],
      ['Sie durfte früher nicht so spät ausgehen.', 'Antes no le permitían salir tan tarde.'],
      ['Er wollte eigentlich Arzt werden.', 'En realidad él quería hacerse médico.'],
      ['Ich sollte um 9 Uhr dort sein.', 'Se suponía que debía estar allí a las 9.'],
      ['Wir konnten das Problem nicht lösen.', 'No pudimos resolver el problema.'],
      ['Die Kinder mussten früh ins Bett.', 'Los niños tenían que irse pronto a la cama.'],
      ['Sie mochte früher keinen Kaffee.', 'Antes no le gustaba el café.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    practiceVerbs: ['müssen', 'können', 'dürfen', 'wollen', 'sollen', 'mögen'],
    reviewFocus: ['Präteritum ohne Umlaut', 'Infinitiv am Ende', 'nicht vor Infinitiv'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del modal en Präteritum.',
        type: 'choice',
        items: [
          {
            scene: 'Una obligación del pasado',
            lines: [['', 'Gestern ___ ich sehr früh aufstehen.']],
            options: ['musste', 'müsste', 'muss', 'gemusst'],
            answer: 'musste',
            explain: '"müssen" Präteritum, 1.Pers.Sing. = musste. Sin Umlaut, terminación -te.',
          },
          {
            scene: 'Una habilidad pasada',
            lines: [['', 'Als Kind ___ er sehr gut schwimmen.']],
            options: ['konnte', 'könnte', 'kann', 'gekonnt'],
            answer: 'konnte',
            explain: '"können" Präteritum = konnte. Describe habilidad pasada.',
          },
          {
            scene: 'Un permiso pasado',
            lines: [['', 'Als Schüler ___ wir in der Pause draußen spielen.']],
            options: ['durften', 'dürften', 'dürfen', 'gedurft'],
            answer: 'durften',
            explain: '"dürfen" Präteritum, 1.Pers.Pl. = durften. Permiso habitual en el pasado.',
          },
          {
            scene: 'Una intención pasada',
            lines: [['', 'Sie ___ eigentlich nach Wien fahren, aber der Zug hatte Verspätung.']],
            options: ['wollte', 'würde', 'will', 'gewollt'],
            answer: 'wollte',
            explain: '"wollen" Präteritum = wollte. Intención que no se realizó por algún obstáculo.',
          },
          {
            scene: 'Obligación externa',
            lines: [['', 'Er ___ laut der Regel bis 18 Uhr zurück sein.']],
            options: ['sollte', 'soll', 'sollen', 'gesollt'],
            answer: 'sollte',
            explain: '"sollen" Präteritum = sollte. Obligación impuesta por otros o por las reglas.',
          },
          {
            scene: 'Negación de posibilidad',
            lines: [['', 'Wir ___ leider nicht kommen, weil wir krank waren.']],
            options: ['konnten', 'könnten', 'konntest', 'können'],
            answer: 'konnten',
            explain: '"können" Präteritum Plural (wir) = konnten. Imposibilidad pasada.',
          },
          {
            scene: 'Un gusto pasado',
            lines: [['', 'Als Kind ___ sie keine Tomaten.']],
            options: ['mochte', 'möchte', 'mag', 'gemocht'],
            answer: 'mochte',
            explain: '"mögen" Präteritum = mochte. Describe gusto/preferencia pasada.',
          },
          {
            scene: 'Obligación pasada con sujeto plural',
            lines: [['', 'Die Schüler ___ alle Hausaufgaben machen.']],
            options: ['mussten', 'müssten', 'müssen', 'gemusst'],
            answer: 'mussten',
            explain: '"müssen" Präteritum Plural = mussten. Obligación pasada para todos los alumnos.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Modal y acción en el pasado',
        tag: '2 espacios',
        intro: 'Completa con el modal en Präteritum correcto y el Infinitiv al final.',
        type: 'dual',
        items: [
          {
            scene: 'Un día difícil',
            lines: [['', 'Gestern [[0]] ich bis 22 Uhr arbeiten [[1]] ich auch kochen.']],
            blanks: [
              { options: ['musste', 'müsste', 'muss', 'musste ich'], answer: 'musste', explain: '"müssen" Präteritum ich = musste. Obligación pasada.' },
              { options: ['und', 'aber', 'weil', 'obwohl'], answer: 'und', explain: 'Conjunción coordinante "und" para añadir otra acción del mismo sujeto.' },
            ],
          },
          {
            scene: 'Infancia',
            lines: [['', 'Als Kinder [[0]] wir bis 20 Uhr draußen spielen, aber wir [[1]] nicht alleine in den Park gehen.']],
            blanks: [
              { options: ['durften', 'dürften', 'durfte', 'dürfen'], answer: 'durften', explain: '"dürfen" Präteritum Plural (wir) = durften. Permiso habitual de niños.' },
              { options: ['durften … nicht', 'konnten … nicht', 'mussten … nicht', 'wollten … nicht'], answer: 'durften … nicht', explain: '"dürfen nicht" = no tener permiso. "durften nicht" = no tenían permiso.' },
            ],
          },
          {
            scene: 'Un viaje cancelado',
            lines: [['', 'Ich [[0]] nach Berlin fahren, aber ich [[1]] arbeiten.']],
            blanks: [
              { options: ['wollte', 'würde', 'will', 'wollten'], answer: 'wollte', explain: '"wollen" Präteritum ich = wollte. Quería ir pero algo lo impidió.' },
              { options: ['musste', 'müsste', 'muss', 'mussten'], answer: 'musste', explain: '"müssen" Präteritum ich = musste. La obligación impidió el viaje.' },
            ],
          },
          {
            scene: 'Reglas del colegio',
            lines: [['', 'In meiner Schule [[0]] wir Schuluniform tragen, und wir [[1]] mit dem Handy im Unterricht spielen.']],
            blanks: [
              { options: ['mussten', 'müssten', 'müssen', 'musstet'], answer: 'mussten', explain: '"müssen" Präteritum wir = mussten. Obligación pasada en la escuela.' },
              { options: ['durften nicht', 'konnten nicht', 'wollten nicht', 'sollten nicht'], answer: 'durften nicht', explain: '"dürfen nicht" = prohibición. Präteritum: durften nicht = no les estaba permitido.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'El primer día de trabajo',
        tag: 'Texto guiado',
        intro: 'Elige el modal en Präteritum correcto para el relato del primer día de trabajo de Alex.',
        type: 'guidedText',
        scene: 'Alex narra su primer día en el nuevo trabajo.',
        text: 'Alex hatte einen neuen Job. Am ersten Tag [[0]] er sehr früh aufstehen, weil das Büro weit weg war. Er [[1]] zuerst zur Rezeption gehen, um seinen Ausweis zu holen. Leider [[2]] er seinen Chef nicht sofort sprechen, weil dieser in einem Meeting war. Er [[3]] also warten. Zum Mittagessen [[4]] er allein in die Kantine gehen, weil er noch niemanden kannte. Abends war er sehr müde und [[5]] nicht mehr kochen. Er [[6]] sich einfach etwas liefern lassen.',
        blanks: [
          { options: ['musste', 'müsste', 'muss', 'wollte'], answer: 'musste', explain: '"müssen" Präteritum ich/er = musste. Obligación por la distancia.' },
          { options: ['sollte', 'musste', 'wollte', 'konnte'], answer: 'sollte', explain: '"sollen" = se le indicó hacer algo. sollte = debía (según las instrucciones).' },
          { options: ['konnte', 'könnte', 'wollte', 'durfte'], answer: 'konnte', explain: '"können" Präteritum = konnte. Imposibilidad (el jefe estaba en reunión).' },
          { options: ['musste', 'wollte', 'durfte', 'konnte'], answer: 'musste', explain: '"müssen" = obligación consecuencia: tuvo que esperar.' },
          { options: ['musste', 'durfte', 'wollte', 'sollte'], answer: 'musste', explain: '"musste" = obligación. Tuvo que ir solo porque no conocía a nadie.' },
          { options: ['wollte', 'konnte', 'musste', 'durfte'], answer: 'wollte', explain: '"wollen" Präteritum = wollte. Intención o ganas (no quería cocinar).' },
          { options: ['wollte', 'musste', 'konnte', 'durfte'], answer: 'wollte', explain: '"wollte" = quería. Optó por pedir comida a domicilio.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el Präteritum',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del modal en Präteritum según el contexto.',
        type: 'freeText',
        scene: 'Completa con la forma de Präteritum del modal indicado.',
        text: 'Als ich jung war, [[0]] (wollen – ich) Astronaut werden. Leider [[1]] (können – ich) nicht viel Mathematik lernen. Meine Eltern sagten, ich [[2]] (sollen) mehr üben. Zum Glück [[3]] (dürfen – ich) wählen, was ich studieren wollte. Am Ende [[4]] (müssen – ich) aber realistisch sein.',
        blanks: [
          { answer: 'wollte', accepted: ['wollte'], explain: '"wollen" Präteritum, ich = wollte. Intención o deseo pasado.' },
          { answer: 'konnte', accepted: ['konnte'], explain: '"können" Präteritum, ich = konnte. Habilidad o posibilidad pasada.' },
          { answer: 'sollte', accepted: ['sollte'], explain: '"sollen" Präteritum, ich = sollte. Obligación según los padres.' },
          { answer: 'durfte', accepted: ['durfte'], explain: '"dürfen" Präteritum, ich = durfte. Permiso pasado.' },
          { answer: 'musste', accepted: ['musste'], explain: '"müssen" Präteritum, ich = musste. Obligación/necesidad.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Cuenta tu pasado con modales',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando modales en Präteritum sobre tu pasado.',
        type: 'write',
        items: [
          {
            scene: 'Tu infancia',
            prompt: 'Di algo que podías hacer de niño (usa "konnte ich").',
            answer: 'Als ich klein war, konnte ich sehr gut schwimmen.',
            accepted: ['konnte'],
            explain: 'konnte = podía. Habilidad pasada. Ej: konnte ich gut singen / auf Bäume klettern.',
          },
          {
            scene: 'Una obligación de ayer',
            prompt: 'Cuenta algo que tuviste que hacer ayer usando "musste".',
            answer: 'Gestern musste ich früh aufstehen und zur Arbeit fahren.',
            accepted: ['musste'],
            explain: 'musste = tuve que. Estructura: musste + ... + Infinitiv am Ende.',
          },
          {
            scene: 'Una regla de tu escuela',
            prompt: 'Menciona algo que no estaba permitido en tu escuela (usa "durften nicht" o "durfte nicht").',
            answer: 'In meiner Schule durften wir keine Handys benutzen.',
            accepted: ['durften nicht', 'durfte nicht'],
            explain: 'durften nicht / durfte nicht = no tenían permiso. Usa durften para wir.',
          },
          {
            scene: 'Un plan que no se cumplió',
            prompt: 'Describe algo que querías hacer pero no pudiste (usa "wollte... aber konnte nicht").',
            answer: 'Ich wollte gestern Sport machen, aber ich konnte nicht.',
            accepted: ['wollte', 'konnte nicht'],
            explain: 'wollte = quería. konnte nicht = no pude. Contraste entre intención y realidad.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Mi historia con los modales',
        tag: 'Producción libre',
        intro: 'Narra una pequeña historia de tu pasado usando al menos 3 modales distintos en Präteritum.',
        type: 'write',
        items: [
          {
            scene: 'Situación pasada',
            prompt: 'Describe una situación pasada donde tuviste que hacer algo (musste).',
            answer: 'Letztes Jahr musste ich jeden Tag zwei Stunden pendeln.',
            accepted: ['musste'],
            explain: 'musste es el Präteritum de müssen. Recuerda: Infinitiv al final de la oración.',
          },
          {
            scene: 'Una posibilidad o permiso',
            prompt: 'Di algo que podías o tenías permiso de hacer en ese contexto.',
            answer: 'Zum Glück konnte ich von zu Hause aus arbeiten.',
            accepted: ['konnte', 'durfte'],
            explain: 'konnte = podía; durfte = tenía permiso. Elige el que tenga más sentido.',
          },
          {
            scene: 'Una intención',
            prompt: 'Describe algo que querías (wollte) o debías (sollte) hacer pero no hiciste.',
            answer: 'Ich wollte mehr Sport treiben, aber ich hatte keine Zeit.',
            accepted: ['wollte', 'sollte'],
            explain: 'wollte = quería. sollte = se suponía que debía. Ambos expresan intención/expectativa.',
          },
        ],
      },
    ],
  },
}

export default topic
