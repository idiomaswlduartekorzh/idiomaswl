import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'praepositionen-zeit',
  order: '16',
  color: '#c9a900',
  category: 'Präpositionen',
  level: 'A1',
  title: 'Temporale Präpositionen im Deutschen A1',
  shortTitle: 'Präpositionen Zeit',
  metaTitle: 'Preposiciones temporales alemán A1 — um, am, im, von...bis, seit',
  description:
    'Las preposiciones temporales del alemán siguen patrones claros: um para horas exactas, am para días y partes del día, im para meses y estaciones. La excepción memorable: in der Nacht (no am Nacht). Además: seit para durar desde hace, von...bis para rangos de tiempo, in para el futuro próximo.',
  lead: 'Um, am, im: tres preposiciones, tres reglas distintas. Um 8 Uhr — am Montag — im Januar. Y la excepción: in der Nacht (no am Nacht). ¡No las mezcles!',
  outcomes: [
    'Usas "um" para horas exactas, "am" para días y partes del día, "im" para meses y estaciones',
    'Recuerdas la excepción "in der Nacht" (no am Nacht)',
    'Usas "seit", "von...bis" e "in" para expresar duración, rango y futuro próximo',
  ],

  guide: {
    goal: 'Usar las preposiciones temporales correctas para hablar de horarios, días, meses y duración.',
    model: 'Der Kurs beginnt um 9 Uhr. / Am Montag lerne ich. / Im Sommer fahre ich nach Deutschland. / Seit drei Jahren lerne ich Deutsch.',
    formula: 'um + hora | am + día/parte del día | im + mes/estación | EXCEPCIÓN: in der Nacht',
    decisions: [
      'um → horas exactas: um 8 Uhr, um halb neun, um Mitternacht',
      'am → días de la semana (am Montag), partes del día (am Morgen, am Nachmittag, am Abend)',
      'im → meses (im Januar, im März) y estaciones (im Sommer, im Winter)',
      'EXCEPCIÓN → in der Nacht (de noche, no "am Nacht")',
      'von...bis → rango de tiempo: von 9 bis 17 Uhr / von Montag bis Freitag',
      'seit → desde hace (presente continuo): seit 3 Jahren, seit einem Monat',
      'in → futuro próximo: in 5 Minuten, in einer Woche, in einem Monat',
    ],
    table: [
      ['Präposition', 'Verwendung', 'Beispiel'],
      ['um', 'horas exactas', 'um 8 Uhr / um Mitternacht'],
      ['am', 'día de la semana / parte del día', 'am Montag / am Abend'],
      ['im', 'mes / estación', 'im Januar / im Sommer'],
      ['in der', 'de noche (excepción)', 'in der Nacht'],
      ['von...bis', 'rango de tiempo', 'von 9 bis 17 Uhr'],
      ['seit', 'desde hace (hasta ahora)', 'seit 3 Jahren'],
      ['in', 'futuro próximo', 'in 5 Minuten / in einer Woche'],
    ],
    mistakes: [
      '"Am Nacht" ❌ — la noche es excepción: "in der Nacht" ✓',
      '"Um Montag" ❌ — los días usan "am": "am Montag" ✓',
      '"Im 8 Uhr" ❌ — las horas usan "um": "um 8 Uhr" ✓',
    ],
  },

  seo: [
    {
      heading: 'Um, am, im: el sistema temporal del alemán',
      paragraphs: [
        'El sistema de preposiciones temporales del alemán se basa en tres preposiciones principales que corresponden a tres niveles de tiempo. "Um" se usa siempre con horas exactas: um 8 Uhr (a las 8), um halb drei (a las 2:30), um Mitternacht (a medianoche). "Am" se usa con los días de la semana y las partes del día: am Montag (el lunes), am Morgen (por la mañana), am Abend (por la tarde/noche).',
        '"Im" se usa con los meses del año y las estaciones: im Januar (en enero), im Sommer (en verano), im Herbst (en otoño). La gran excepción del sistema es "in der Nacht" — la noche no usa "am" como las otras partes del día, sino "in der" porque "Nacht" es femenino y la construcción es ligeramente diferente.',
      ],
    },
    {
      heading: 'Seit: presente con raíces en el pasado',
      paragraphs: [
        '"Seit" es una de las preposiciones más importantes del alemán y expresa una situación que comenzó en el pasado y continúa en el presente: Ich lerne seit 3 Jahren Deutsch (Llevo 3 años aprendiendo alemán / Desde hace 3 años aprendo alemán). En alemán se usa PRESENTE con seit, mientras que el español puede usar presente o pretérito imperfecto.',
        'Esto es lo contrario del inglés (que usa present perfect) y similar al español coloquial. Ejemplos: Ich wohne seit einem Jahr in Köln. / Wir sind seit 2 Monaten in Deutschland. / Nico unterrichtet seit 5 Jahren Sprachen.',
      ],
    },
    {
      heading: 'Von...bis: rangos y horarios',
      paragraphs: [
        'La expresión "von...bis" (de...a / desde...hasta) se usa para indicar rangos de tiempo: von 9 bis 17 Uhr (de 9 a 17 horas), von Montag bis Freitag (de lunes a viernes), von Januar bis März (de enero a marzo). Es muy útil para describir horarios de trabajo, cursos y eventos.',
        'También se puede usar solo "bis" para indicar el límite final: Bis wann arbeitest du? — Ich arbeite bis 18 Uhr. / Der Kurs geht von 9 bis 11 Uhr.',
      ],
    },
    {
      heading: 'In: el futuro está cerca',
      paragraphs: [
        '"In" con expresiones de tiempo indica cuánto falta para algo en el futuro: in 5 Minuten (en 5 minutos), in einer Stunde (en una hora), in einer Woche (en una semana), in einem Monat (en un mes). Es la forma más natural para hablar del futuro próximo en alemán A1.',
        'No confundir con "seit" (desde hace): Ich lerne seit einem Jahr (llevo un año aprendiendo — pasado hasta presente) vs. Ich fahre in einem Jahr nach Deutschland (dentro de un año iré a Alemania — futuro). La dirección temporal es opuesta.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Preposiciones temporales: um/am/im + excepción in der Nacht + seit/von...bis/in.',
    graphicPrompt: 'Línea del tiempo visual con um, am, im, seit, in y von...bis en su posición.',
    scene: [
      ['um (hora)', 'um 9 Uhr / um Mitternacht — a las 9 / a medianoche'],
      ['am (día/parte)', 'am Montag / am Abend — el lunes / por la noche'],
      ['im (mes/estación)', 'im Juli / im Winter — en julio / en invierno'],
      ['in der Nacht', 'in der Nacht — de noche (EXCEPCIÓN, no "am Nacht")'],
      ['seit (desde hace)', 'seit 2 Jahren — desde hace 2 años'],
      ['von...bis (rango)', 'von 9 bis 17 Uhr — de 9 a 17 horas'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['um=hora, am=día, im=mes', 'excepción: in der Nacht', 'seit = presente que empezó antes'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige la preposición temporal correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Nico habla del horario del curso',
            lines: [['Nico', 'Der Kurs beginnt ___ 9 Uhr.']],
            options: ['um', 'am', 'im', 'in'],
            answer: 'um',
            explain: '"Um" se usa con horas exactas: um 9 Uhr.',
          },
          {
            scene: 'Nora pregunta cuándo tiene clase Carlos',
            lines: [['Carlos', 'Ich habe ___ Montag Deutschkurs.']],
            options: ['am', 'um', 'im', 'seit'],
            answer: 'am',
            explain: '"Am" se usa con los días de la semana: am Montag.',
          },
          {
            scene: 'Ana habla de sus planes de verano',
            lines: [['Ana', '___ Sommer fahre ich nach Deutschland.']],
            options: ['Im', 'Am', 'Um', 'In'],
            answer: 'Im',
            explain: '"Im" se usa con las estaciones del año: im Sommer.',
          },
          {
            scene: 'Lina trabaja por la noche',
            lines: [['Lina', '___ Nacht schlafe ich nicht viel.']],
            options: ['In der', 'Am', 'Im', 'Um der'],
            answer: 'In der',
            explain: '¡Excepción! "Nacht" no usa "am" sino "in der": in der Nacht.',
          },
          {
            scene: 'Sofia lleva tiempo estudiando alemán',
            lines: [['Sofia', 'Ich lerne ___ zwei Jahren Deutsch.']],
            options: ['seit', 'von', 'am', 'in'],
            answer: 'seit',
            explain: '"Seit" expresa duración desde el pasado hasta el presente: seit zwei Jahren.',
          },
          {
            scene: 'Marco describe el horario del trabajo',
            lines: [['Marco', 'Ich arbeite ___ 8 ___ 17 Uhr.']],
            options: ['von … bis', 'von … im', 'am … bis', 'um … bis'],
            answer: 'von … bis',
            explain: '"Von...bis" para rangos de tiempo: von 8 bis 17 Uhr.',
          },
          {
            scene: 'Carlos tiene una reunión pronto',
            lines: [['Carlos', 'Das Meeting beginnt ___ 10 Minuten.']],
            options: ['in', 'seit', 'am', 'um'],
            answer: 'in',
            explain: '"In" + tiempo expresa el futuro próximo: in 10 Minuten = dentro de 10 minutos.',
          },
          {
            scene: 'Nico habla del trabajo por la mañana',
            lines: [['Nico', '___ Morgen trinke ich immer Kaffee.']],
            options: ['Am', 'Im', 'Um', 'In'],
            answer: 'Am',
            explain: '"Am" con partes del día: am Morgen (por la mañana), am Nachmittag, am Abend.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Preposición + sustantivo',
        tag: '2 espacios',
        intro: 'Completa la preposición y la palabra temporal correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Horario del curso de alemán en WeLearn',
            lines: [['Nora', 'Der Kurs ist [[0]] [[1]] bis Freitag.']],
            blanks: [
              { options: ['von', 'am', 'um', 'im'], answer: 'von', explain: '"Von...bis" para rango: von Montag bis Freitag.' },
              { options: ['Montag', 'Morgen', 'Januar', '8 Uhr'], answer: 'Montag', explain: 'El rango va de lunes (Montag) a viernes (Freitag).' },
            ],
          },
          {
            scene: 'Carlos vive en Berlín desde hace un año',
            lines: [['Carlos', 'Ich wohne [[0]] [[1]] in Berlin.']],
            blanks: [
              { options: ['seit', 'von', 'am', 'im'], answer: 'seit', explain: '"Seit" para duración hasta el presente.' },
              { options: ['einem Jahr', 'Januar', 'Montag', '9 Uhr'], answer: 'einem Jahr', explain: '"Seit einem Jahr" = desde hace un año.' },
            ],
          },
          {
            scene: 'Ana habla del invierno en Alemania',
            lines: [['Ana', '[[0]] [[1]] ist es sehr kalt in Deutschland.']],
            blanks: [
              { options: ['Im', 'Am', 'Um', 'In'], answer: 'Im', explain: '"Im" con estaciones: im Winter.' },
              { options: ['Winter', 'Abend', 'Montag', 'Nacht'], answer: 'Winter', explain: '"Im Winter" = en invierno.' },
            ],
          },
          {
            scene: 'Marco tiene que hacer algo de noche',
            lines: [['Marco', '[[0]] arbeite ich manchmal. Das ist anstrengend!']],
            blanks: [
              { options: ['In der Nacht', 'Am Nacht', 'Im Nacht', 'Nacht'], answer: 'In der Nacht', explain: '¡Excepción! De noche = "in der Nacht", nunca "am Nacht".' },
              { options: ['—', 'Nacht', 'Abend', 'Morgen'], answer: '—', explain: 'No se necesita otra palabra: "In der Nacht arbeite ich manchmal."' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Elige la preposición temporal correcta para cada hueco.',
        type: 'guidedText',
        scene: 'Nora describe la semana típica de la academia WeLearn.',
        text: 'Unsere Kurse beginnen [[0]] 9 Uhr. [[1]] Montag bis Freitag haben wir Unterricht. [[2]] Abend gibt es Konversationskurse. [[3]] Nacht machen wir nichts — das ist wichtig! [[4]] Sommer machen wir eine Intensivwoche. Ich unterrichte [[5]] fünf Jahren hier. In [[6]] Wochen beginnt ein neuer Kurs.',
        blanks: [
          { options: ['um', 'am', 'im', 'seit'], answer: 'um', explain: '"Um 9 Uhr" — horas exactas con "um".' },
          { options: ['Von', 'Am', 'Im', 'Um'], answer: 'Von', explain: '"Von Montag bis Freitag" — rango con "von...bis".' },
          { options: ['Am', 'Um', 'Im', 'In der'], answer: 'Am', explain: '"Am Abend" — partes del día con "am".' },
          { options: ['In der', 'Am', 'Im', 'Um der'], answer: 'In der', explain: '¡Excepción! "In der Nacht" — nunca "am Nacht".' },
          { options: ['Im', 'Am', 'Um', 'Von'], answer: 'Im', explain: '"Im Sommer" — estaciones con "im".' },
          { options: ['seit', 'von', 'um', 'am'], answer: 'seit', explain: '"Seit fünf Jahren" — duración hasta el presente con "seit".' },
          { options: ['zwei', 'um', 'am', 'im'], answer: 'zwei', explain: '"In zwei Wochen" — futuro próximo: "in" + número + unidad de tiempo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la preposición temporal correcta de memoria.',
        type: 'freeText',
        scene: 'Carlos habla de su rutina y sus planes.',
        text: 'Ich stehe [[0]] 7 Uhr auf. [[1]] Morgen trinke ich Kaffee. Ich lerne [[2]] drei Monaten Deutsch. [[3]] Montag habe ich eine wichtige Prüfung. Ich hoffe, [[4]] einem Monat nach Berlin zu reisen.',
        blanks: [
          { answer: 'um', accepted: ['um'], explain: '"Um 7 Uhr" — horas exactas con "um".' },
          { answer: 'Am', accepted: ['Am', 'am'], explain: '"Am Morgen" — partes del día con "am".' },
          { answer: 'seit', accepted: ['seit'], explain: '"Seit drei Monaten" — duración hasta el presente.' },
          { answer: 'Am', accepted: ['Am', 'am'], explain: '"Am Montag" — días de la semana con "am".' },
          { answer: 'in', accepted: ['in', 'In'], explain: '"In einem Monat" — futuro próximo con "in".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones completas usando preposiciones temporales.',
        type: 'write',
        items: [
          {
            scene: 'Hablando de tu horario diario',
            prompt: 'Di a qué hora te levantas, qué haces por la mañana y cuándo empiezas a trabajar/estudiar.',
            answer: 'Ich stehe um 7 Uhr auf. Am Morgen trinke ich Kaffee. Ich beginne um 9 Uhr.',
            accepted: ['um ', 'am morgen', 'am abend'],
            explain: 'Um + hora. Am Morgen / Am Abend para partes del día. Ejemplo: Ich stehe um 7 auf. Am Morgen lerne ich.',
          },
          {
            scene: 'Hablando de cuánto tiempo llevas estudiando',
            prompt: 'Di desde hace cuánto tiempo estudias alemán y cuándo quieres llegar a Alemania.',
            answer: 'Ich lerne seit sechs Monaten Deutsch. In einem Jahr möchte ich nach Deutschland reisen.',
            accepted: ['seit ', 'in einem', 'in zwei', 'in drei'],
            explain: 'Seit + duración para el presente que empezó antes. In + tiempo para el futuro próximo.',
          },
          {
            scene: 'Describiendo el horario semanal del curso',
            prompt: 'Di cuándo hay clase (días), a qué horas y en qué estación del año empezó.',
            answer: 'Der Kurs ist von Montag bis Mittwoch. Er beginnt um 18 Uhr. Im Herbst haben wir angefangen.',
            accepted: ['von … bis', 'am ', 'um ', 'im '],
            explain: 'Von...bis para rango, um para horas, am para días individuales, im para estaciones.',
          },
          {
            scene: 'Hablando de actividades nocturnas',
            prompt: 'Di qué haces de noche y por la tarde (recuerda la excepción).',
            answer: 'In der Nacht schlafe ich. Am Abend lerne ich Deutsch.',
            accepted: ['in der nacht', 'am abend', 'am nachmittag'],
            explain: '¡Excepción importante! De noche = in der Nacht (NUNCA "am Nacht"). Por la tarde = am Abend.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe tu semana ideal de aprendizaje de alemán usando todas las preposiciones.',
        type: 'write',
        items: [
          {
            scene: 'Tu horario de estudio perfecto',
            prompt: 'Escribe tu horario ideal de alemán: qué días, a qué horas y desde cuándo estudias.',
            answer: 'Am Montag und Mittwoch lerne ich Deutsch. Von 18 bis 20 Uhr habe ich Kurs. Ich lerne seit drei Monaten.',
            accepted: ['am montag', 'am dienstag', 'am mittwoch', 'am donnerstag', 'am freitag', 'von … bis', 'um ', 'seit '],
            explain: 'Usa am + día, von...bis para horario, um para horas exactas y seit para cuánto llevas.',
          },
          {
            scene: 'Planes de verano con alemán',
            prompt: 'Describe qué harás en verano (Im Sommer) y cuándo tienes tu próximo examen.',
            answer: 'Im Sommer möchte ich nach Berlin reisen. In zwei Monaten habe ich die B1-Prüfung.',
            accepted: ['im sommer', 'im winter', 'im herbst', 'im frühling', 'in einem monat', 'in zwei monaten', 'in drei wochen'],
            explain: 'Im + estación para planes estacionales. In + tiempo para el futuro próximo.',
          },
          {
            scene: 'Presentándote a un compañero nuevo',
            prompt: 'Cuéntale a un nuevo compañero desde cuándo vives en tu ciudad, cuándo llegas al centro y cuál es tu rutina de noche.',
            answer: 'Ich wohne seit zwei Jahren in Bogotá. Am Morgen komme ich um 8 an. In der Nacht lese ich immer ein Buch.',
            accepted: ['seit ', 'am morgen', 'am abend', 'um ', 'in der nacht'],
            explain: 'Seit para duración. Am Morgen / Am Abend para partes del día. In der Nacht para la noche. Um para hora exacta.',
          },
        ],
      },
    ],
  },
}

export default topic
