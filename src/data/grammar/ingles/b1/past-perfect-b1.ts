import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'past-perfect-b1',
  order: '02',
  color: '#dc2626',
  category: 'Verbs',
  level: 'B1',
  title: 'Past Perfect en Inglés B1',
  shortTitle: 'Past Perfect',
  metaTitle: 'Past Perfect B1 — Had + Participio para el pasado del pasado',
  description:
    'El past perfect (had + participio) expresa una acción que ocurrió antes de otro momento o acción en el pasado. Es esencial para narrar eventos en el orden correcto y para estructuras como reported speech, conditionals tipo 3 y el uso de "already", "just", "never" y "by the time".',
  lead: 'Aprende el past perfect para indicar cuál de dos eventos pasados ocurrió primero, y úsalo con "when", "after", "by the time" y "already".',
  outcomes: [
    'Forma el past perfect con had + participio pasado para todos los sujetos',
    'Indica cuál de dos eventos pasados ocurrió primero',
    'Usa correctly: already, just, never, yet, by the time con past perfect',
    'Combina past perfect y past simple en narrativas para secuenciar eventos',
  ],

  guide: {
    goal: 'Usar el past perfect para establecer que una acción ocurrió antes de otra acción pasada.',
    model: 'When she arrived, I had already eaten. / He hadn\'t seen the film before we talked about it.',
    formula: 'Subject + had (not) + past participle',
    decisions: [
      'Had es el mismo para todos los sujetos: I/you/he/she/it/we/they had + participio.',
      'Usa past perfect para la acción que ocurrió PRIMERO — past simple para la que ocurrió DESPUÉS.',
      'Con "when": "When I arrived, the party had already started." (la fiesta empezó antes de llegar).',
      'Con "by the time": "By the time we left, it had stopped raining." (paró antes de salir).',
      'Con "after": "After she had studied for weeks, she took the exam." (estudió, luego el examen).',
      'Adverbios comunes: already (ya), just (acabar de), never (nunca), yet (todavía — en negativas/preguntas).',
    ],
    table: [
      ['Estructura', 'Ejemplo', 'Significado'],
      ['had + participio', 'I had finished my homework.', 'Acción completada antes de otra'],
      ['hadn\'t + participio', 'She hadn\'t eaten anything.', 'Negativa: acción no realizada antes'],
      ['Had + sujeto + participio?', 'Had they met before?', 'Pregunta sobre el pasado anterior'],
    ],
    mistakes: [
      '"When I arrived, they already left" ❌ → "they had already left" ✓ — usa past perfect para la acción anterior.',
      '"She had went to the store" ❌ → "She had gone to the store" ✓ — recuerda usar el participio pasado, no el past simple.',
      '"I had never been there before, so I was nervous" — esta frase ✓ es correcta, "never" va entre had y el participio.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el past perfect y cuándo se usa?',
      paragraphs: [
        'El past perfect expresa el "pasado del pasado" — una acción que ya estaba completada antes de otro punto en el tiempo o antes de otra acción pasada. Se forma con had (igual para todos los sujetos) más el participio pasado del verbo.',
        'Piénsalo como una "máquina del tiempo": cuando ya estás narrando en el pasado y necesitas retroceder aún más, usas past perfect. "When the film started, we had already bought the popcorn." El popcorn lo compraste antes de que empezara la película.',
      ],
    },
    {
      heading: 'Participios irregulares más importantes',
      paragraphs: [
        'Para el past perfect necesitas dominar los participios irregulares más frecuentes. Los regulares son fáciles: add + -ed (work → worked). Los irregulares requieren memorización.',
        'Los más usados: go → gone, see → seen, eat → eaten, write → written, take → taken, give → given, make → made, have → had, come → come, become → become, buy → bought, think → thought.',
      ],
      table: [
        ['Infinitivo', 'Past Simple', 'Past Participle'],
        ['go', 'went', 'gone'],
        ['see', 'saw', 'seen'],
        ['eat', 'ate', 'eaten'],
        ['write', 'wrote', 'written'],
        ['take', 'took', 'taken'],
      ],
    },
    {
      heading: 'Conectores clave con past perfect',
      paragraphs: [
        '"By the time" es el conector más característico del past perfect: "By the time I arrived, everyone had left." Significa "para cuando llegué, todos ya se habían ido."',
        '"After" también introduce el past perfect: "After she had checked everything twice, she submitted the report." Y "before": "I had never tried sushi before I went to Japan."',
      ],
    },
    {
      heading: 'Already, just, never y yet con past perfect',
      paragraphs: [
        'Estos adverbios van entre had y el participio: "I had already eaten." / "She had just left." / "They had never been abroad." / "Had you finished yet?"',
        '"Already" confirma que algo pasó antes de lo esperado. "Just" indica que acababa de ocurrir. "Never" expresa experiencias no tenidas hasta ese momento pasado. "Yet" en negativas y preguntas indica si algo había ocurrido o no.',
      ],
    },
    {
      heading: 'Past perfect vs past simple: ¿cómo elegir?',
      paragraphs: [
        'Si solo hablas de un evento en el pasado, usa past simple: "I ate at 7." Si mencionas dos eventos pasados y necesitas aclarar cuál ocurrió primero, el anterior lleva past perfect y el posterior lleva past simple.',
        'A veces "after" o "before" ya aclaran el orden, y el past perfect no es obligatorio: "After I ate, I watched TV." Pero si el orden no es obvio por el contexto, el past perfect es necesario para evitar confusión.',
      ],
    },
    {
      heading: '¿Cómo se forma el past perfect en inglés?',
      paragraphs: [
        'Con "had" + participio pasado, igual para todas las personas: "I had finished", "she had gone". Contracción: \'d ("I\'d finished"). Negativo: hadn\'t + participio; pregunta: "Had you finished?".',
      ],
    },
    {
      heading: '¿Cuándo se usa el past perfect?',
      paragraphs: [
        'Para una acción anterior a otra acción pasada: "When I arrived, they had already left" (se fueron ANTES de que yo llegara). Equivale al pluscuamperfecto español ("habían salido"). Suele aparecer con "before", "after", "already", "just".',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre past perfect y past simple?',
      paragraphs: [
        'El past simple narra hechos en orden ("I arrived and they left"); el past perfect marca lo que ya había pasado ANTES ("When I arrived, they had left" = ya se habían ido). El past perfect ordena dos pasados: el "pasado del pasado".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Past perfect para secuenciar dos eventos pasados, con énfasis en conectores temporales.',
    graphicPrompt: 'Línea de tiempo con dos puntos: evento A (past perfect) ocurre antes que evento B (past simple).',
    scene: [
      ['By the time we arrived, the show had already started.', 'Para cuando llegamos, el espectáculo ya había comenzado.'],
      ['She had studied for months before she took the exam.', 'Había estudiado durante meses antes de hacer el examen.'],
      ['I hadn\'t eaten anything, so I was very hungry.', 'No había comido nada, así que tenía mucha hambre.'],
      ['Had you ever visited Colombia before last year?', '¿Habías visitado Colombia antes del año pasado?'],
      ['After they had signed the contract, they celebrated.', 'Después de haber firmado el contrato, celebraron.'],
      ['When I woke up, the rain had stopped.', 'Cuando me desperté, la lluvia había parado.'],
      ['He had never seen snow before he moved to Canada.', 'Nunca había visto nieve antes de mudarse a Canadá.'],
      ['She had just left when you called.', 'Acababa de salir cuando llamaste.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['go', 'see', 'eat', 'finish', 'start', 'arrive', 'leave', 'study', 'take', 'make'],
    reviewFocus: ['had + past participle', 'irregular participles', 'by the time / already / never'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el past perfect',
        tag: 'Opción múltiple',
        intro: 'Elige la opción de past perfect correcta para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Llegando tarde a la fiesta',
            lines: [['', 'When we got to the party, most people ___ already ___.']],
            options: ['had / left', 'have / left', 'did / leave', 'were / leaving'],
            answer: 'had / left',
            explain: 'Had + left (participio de leave). "Already" va entre had y el participio.',
          },
          {
            scene: 'El examen de conducir',
            lines: [['', 'She passed the test because she ___ for weeks.']],
            options: ['had practised', 'has practised', 'practised', 'was practising'],
            answer: 'had practised',
            explain: 'Had + practised. El entrenamiento ocurrió antes de pasar el examen.',
          },
          {
            scene: 'Una primera vez',
            lines: [['', 'I ___ never ___ Thai food before that night.']],
            options: ['had / eaten', 'have / eaten', 'did / eat', 'was / eating'],
            answer: 'had / eaten',
            explain: 'Had + eaten (participio de eat). "Never" va entre had y el participio.',
          },
          {
            scene: 'El vuelo',
            lines: [['', 'By the time we reached the airport, the plane ___.']],
            options: ['had taken off', 'has taken off', 'took off', 'was taking off'],
            answer: 'had taken off',
            explain: 'Had + taken off. "By the time" introduce el past perfect para la acción que ya había ocurrido.',
          },
          {
            scene: 'El libro prestado',
            lines: [['', '___ you read the book before he lent it to you?']],
            options: ['Had', 'Have', 'Did', 'Were'],
            answer: 'Had',
            explain: 'Pregunta en past perfect: Had + sujeto + participio? → "Had you read the book?"',
          },
          {
            scene: 'Una sorpresa',
            lines: [['', 'When I opened the fridge, someone ___ all the cake.']],
            options: ['had eaten', 'has eaten', 'ate', 'was eating'],
            answer: 'had eaten',
            explain: 'Had + eaten. La acción de comer ocurrió antes de abrir el refrigerador.',
          },
          {
            scene: 'El informe de trabajo',
            lines: [['', 'She ___ just ___ the report when her boss asked for it.']],
            options: ['had / finished', 'has / finished', 'did / finish', 'was / finishing'],
            answer: 'had / finished',
            explain: 'Had + just + finished. "Just" expresa que acababa de terminar justo antes.',
          },
          {
            scene: 'La película',
            lines: [['', 'I didn\'t enjoy the film because I ___ the book and knew the ending.']],
            options: ['had read', 'have read', 'read', 'was reading'],
            answer: 'had read',
            explain: 'Had + read (participio de read, se pronuncia /rɛd/). Leer el libro ocurrió antes de ver la película.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Causa y efecto en el pasado',
        tag: '2 espacios',
        intro: 'Completa con past perfect y past simple para mostrar qué ocurrió primero.',
        type: 'dual',
        items: [
          {
            scene: 'El malentendido',
            lines: [['', 'She [[0]] (not / hear) the news, so she [[1]] (be) very surprised.']],
            blanks: [
              { options: ['hadn\'t heard', 'didn\'t hear', 'hasn\'t heard', 'wasn\'t hearing'], answer: 'hadn\'t heard', explain: 'Hadn\'t heard: no haber escuchado antes es la razón de la sorpresa → past perfect negativo.' },
              { options: ['was', 'had been', 'is', 'were'], answer: 'was', explain: 'Was: la sorpresa es la reacción/consecuencia → past simple.' },
            ],
          },
          {
            scene: 'El trabajo entregado',
            lines: [['', 'By the time the deadline [[0]] (arrive), the team [[1]] (complete) the project.']],
            blanks: [
              { options: ['arrived', 'had arrived', 'was arriving', 'arrives'], answer: 'arrived', explain: 'Arrived: la fecha límite llegar es la referencia temporal posterior → past simple.' },
              { options: ['had completed', 'completed', 'has completed', 'were completing'], answer: 'had completed', explain: 'Had completed: el proyecto estaba terminado antes de la fecha límite → past perfect.' },
            ],
          },
          {
            scene: 'El restaurante lleno',
            lines: [['', 'When we [[0]] (arrive) at the restaurant, it was full because we [[1]] (not / book) a table.']],
            blanks: [
              { options: ['arrived', 'had arrived', 'were arriving', 'arrive'], answer: 'arrived', explain: 'Arrived: la llegada es el punto de referencia → past simple.' },
              { options: ['hadn\'t booked', 'didn\'t book', 'haven\'t booked', 'weren\'t booking'], answer: 'hadn\'t booked', explain: 'Hadn\'t booked: no reservar mesa es la causa → past perfect negativo.' },
            ],
          },
          {
            scene: 'Un viaje de estudios',
            lines: [['', 'After she [[0]] (study) abroad for a year, her English [[1]] (improve) dramatically.']],
            blanks: [
              { options: ['had studied', 'studied', 'has studied', 'was studying'], answer: 'had studied', explain: 'Had studied: estudiar en el extranjero ocurrió primero → past perfect con "after".' },
              { options: ['improved', 'had improved', 'was improving', 'improves'], answer: 'improved', explain: 'Improved: la mejora es la consecuencia posterior → past simple.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La historia de Ana',
        tag: 'Texto guiado',
        intro: 'Elige la forma verbal correcta (past perfect o past simple) para completar la historia.',
        type: 'guidedText',
        scene: 'Elige la forma correcta para completar esta narrativa.',
        text: 'Ana was nervous on the day of her job interview. By that morning, she [[0]] (prepare) her answers carefully and [[1]] (choose) her best outfit the night before. When she arrived at the office, she realized she [[2]] (forget) to bring her portfolio. Fortunately, the receptionist [[3]] (already / send) the documents by email. The interview [[4]] (go) well because Ana [[5]] (research) the company thoroughly. By the time she [[6]] (leave), she felt confident she would get the job.',
        blanks: [
          { options: ['had prepared', 'prepared', 'has prepared', 'was preparing'], answer: 'had prepared', explain: 'Had prepared: la preparación ocurrió antes de la mañana del día → past perfect.' },
          { options: ['had chosen', 'chose', 'has chosen', 'was choosing'], answer: 'had chosen', explain: 'Had chosen: elegir el outfit ocurrió la noche anterior → past perfect.' },
          { options: ['had forgotten', 'forgot', 'has forgotten', 'was forgetting'], answer: 'had forgotten', explain: 'Had forgotten: olvidar el portfolio ocurrió antes de darse cuenta → past perfect.' },
          { options: ['had already sent', 'already sent', 'has already sent', 'was already sending'], answer: 'had already sent', explain: 'Had already sent: enviar por email ocurrió antes del momento presente en la historia → past perfect.' },
          { options: ['went', 'had gone', 'goes', 'was going'], answer: 'went', explain: 'Went: describir cómo fue la entrevista es un hecho pasado simple → past simple.' },
          { options: ['had researched', 'researched', 'has researched', 'was researching'], answer: 'had researched', explain: 'Had researched: investigar la empresa ocurrió antes de la entrevista → past perfect.' },
          { options: ['left', 'had left', 'was leaving', 'leaves'], answer: 'left', explain: 'Left: en "by the time she left" es la referencia temporal posterior → past simple.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta (past perfect o past simple) de cada verbo.',
        type: 'freeText',
        scene: 'Completa con past perfect o past simple según el contexto.',
        text: 'Last weekend was interesting. On Saturday I [[0]] (visit) a friend who I [[1]] (not see) for five years. She [[2]] (move) to a new city and [[3]] (start) a new job. By the time I [[4]] (leave) her house, it was almost midnight.',
        blanks: [
          { answer: 'visited', accepted: ['visited'], explain: 'Visited: acción principal del pasado → past simple.' },
          { answer: 'hadn\'t seen', accepted: ['hadn\'t seen', 'had not seen'], explain: 'Hadn\'t seen: la experiencia de no ver a alguien ocurrió antes de la visita → past perfect negativo.' },
          { answer: 'had moved', accepted: ['had moved'], explain: 'Had moved: mudarse ocurrió antes de la visita → past perfect.' },
          { answer: 'had started', accepted: ['had started'], explain: 'Had started: empezar el trabajo ocurrió antes de la visita → past perfect.' },
          { answer: 'left', accepted: ['left'], explain: 'Left: en "by the time I left" el dejar es la referencia posterior → past simple.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando past perfect para indicar qué ocurrió primero.',
        type: 'write',
        items: [
          {
            scene: 'Antes de empezar',
            prompt: 'Describe algo que habías hecho antes de empezar este curso/trabajo (usa: I had already...).',
            answer: 'I had already studied some English before I started this course.',
            accepted: ['had already', 'had studied', 'had learned', 'had taken', 'had worked', 'had lived', 'had visited', 'had read'],
            explain: 'Ejemplo: I had already learned basic grammar before I joined this class.',
          },
          {
            scene: 'Una llegada tarde',
            prompt: 'Describe una situación en la que llegaste tarde y algo ya había pasado (usa: When I arrived, ... had already...).',
            answer: 'When I arrived at the cinema, the film had already started.',
            accepted: ['when i arrived', 'when i got there', 'when we arrived', 'when she arrived', 'had already', 'had finished', 'had left', 'had started', 'had ended'],
            explain: 'Ejemplo: When I arrived at the meeting, everyone had already left.',
          },
          {
            scene: 'Una primera experiencia',
            prompt: 'Describe algo que nunca habías hecho antes de un momento específico del pasado (usa: I had never... before...).',
            answer: 'I had never tried Korean food before I visited Seoul.',
            accepted: ['had never', 'before i', 'before she', 'before he', 'before we', 'before they'],
            explain: 'Ejemplo: I had never spoken in public before that day. / She had never flown before her trip to Europe.',
          },
          {
            scene: 'La razón de algo',
            prompt: 'Explica por qué alguien se sentía cansado/feliz/nervioso (usa past perfect para dar la razón).',
            answer: 'She was exhausted because she had worked for twelve hours without a break.',
            accepted: ['because he had', 'because she had', 'because i had', 'because they had', 'because we had'],
            explain: 'Ejemplo: He was happy because he had just received good news. / They were tired because they had been traveling all day.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Antes de hoy',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones usando past perfect sobre experiencias pasadas anteriores a otro evento.',
        type: 'write',
        items: [
          {
            scene: 'Tu experiencia',
            prompt: 'Escribe algo que habías logrado antes de cumplir 18 (o antes de un año importante de tu vida).',
            answer: 'By the time I was 18, I had already learned to drive and finished school.',
            accepted: ['by the time', 'before i turned', 'before i was', 'had already', 'had learned', 'had finished', 'had started', 'had traveled', 'had won'],
            explain: 'Usa: By the time I was [edad], I had already [logro]. Ej: By the time I was 20, I had already moved to another city.',
          },
          {
            scene: 'Tu experiencia',
            prompt: 'Describe algo que nunca habías experimentado antes de un momento específico de tu vida.',
            answer: 'I had never lived alone before I started university.',
            accepted: ['had never', 'never had', 'before i', 'before she', 'before he'],
            explain: 'Usa: I had never [experiencia] before [momento]. Ej: I had never felt so confident before that day.',
          },
          {
            scene: 'Tu experiencia',
            prompt: 'Explica por qué estabas feliz, nervioso o sorprendido en un momento del pasado (usa past perfect para la razón).',
            answer: 'I was so nervous at the interview because I hadn\'t prepared enough.',
            accepted: ['because i had', 'because she had', 'because he had', 'because we had', 'because they had', 'hadn\'t', 'had already', 'had just'],
            explain: 'Usa: I was [emoción] because I had [razón]. Ej: She was excited because she had received a job offer.',
          },
        ],
      },
    ],
  },
}

export default topic
