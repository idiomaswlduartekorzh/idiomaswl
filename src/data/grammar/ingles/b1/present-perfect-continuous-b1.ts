import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'present-perfect-continuous-b1',
  order: '05',
  color: '#dc2626',
  category: 'Verbs',
  level: 'B1',
  title: 'Present Perfect Continuous en Inglés B1',
  shortTitle: 'Present Perfect Continuous',
  metaTitle: 'Present Perfect Continuous B1 — Have been + -ing para acciones en progreso hasta ahora',
  description:
    'El present perfect continuous (have/has been + -ing) describe acciones que comenzaron en el pasado y todavía están en progreso, o que terminaron recientemente y tienen resultados visibles ahora. Se usa frecuentemente con for y since, y se contrasta con el present perfect simple.',
  lead: 'Aprende el present perfect continuous para expresar actividades en progreso y explicar situaciones actuales con sus causas recientes.',
  outcomes: [
    'Forma el present perfect continuous con have/has been + verbo -ing',
    'Usa for y since para expresar duración de una actividad en progreso',
    'Explica situaciones presentes con sus causas recientes usando este tiempo',
    'Distingue present perfect simple (resultado) de continuous (proceso/duración)',
  ],

  guide: {
    goal: 'Usar el present perfect continuous para actividades en progreso y para explicar situaciones presentes por sus causas.',
    model: 'I\'ve been studying all morning — I\'m exhausted. / She\'s been working here since January.',
    formula: 'Subject + have/has been + verb-ing',
    decisions: [
      'Have been con I/you/we/they — has been con he/she/it.',
      'Acción que empezó en el pasado y SIGUE en el presente: "I\'ve been learning Spanish for two years." (todavía aprendo)',
      'Acción reciente que terminó pero tiene resultado visible: "Why are your clothes wet? / Because I\'ve been running."',
      'FOR + período / SINCE + punto de inicio, igual que present perfect simple.',
      'Contraste con simple: present perfect simple enfatiza el RESULTADO o número de veces. Continuous enfatiza la DURACIÓN o el proceso.',
      'No se usa con stative verbs (know, want, need, like, etc.) — usa present perfect simple para esos.',
    ],
    table: [
      ['Tiempo', 'Énfasis', 'Ejemplo'],
      ['Present Perfect Simple', 'Resultado / veces', '"I\'ve written three emails." (están escritos)'],
      ['Present Perfect Continuous', 'Duración / proceso', '"I\'ve been writing emails." (actividad en progreso)'],
      ['Con for/since', 'Igual en ambos', '"I\'ve lived/been living here for a year."'],
    ],
    mistakes: [
      '"I\'ve been knowing her for years" ❌ → "I\'ve known her for years" ✓ — verbos estativos no usan continuous.',
      '"She has been finished the report" ❌ → "She has finished the report" ✓ — el resultado usa present perfect simple.',
      '"How long have you been wait?" ❌ → "How long have you been waiting?" ✓ — necesitas el gerundio (-ing).',
    ],
  },

  seo: [
    {
      heading: 'Qué expresa el present perfect continuous',
      paragraphs: [
        'El present perfect continuous (have/has been + -ing) se usa principalmente para dos cosas: primero, para actividades que empezaron en el pasado y continúan hasta ahora: "I\'ve been studying for this exam all week." Sigues estudiando o acabas de parar hace poco.',
        'Segundo, para explicar el estado actual a través de una causa reciente: "Why are you out of breath?" — "I\'ve been running." Ya no corres, pero el resultado es visible ahora. Este uso es muy natural en conversación.',
      ],
    },
    {
      heading: 'Cómo se diferencia del Present Perfect Simple',
      paragraphs: [
        'La diferencia clave está en el foco: ¿importa el resultado o el proceso? "I\'ve read the book" → lo terminé, el resultado importa. "I\'ve been reading the book" → enfatiza la actividad, probablemente no lo terminé todavía.',
        'Con verbos de resultado como finish, complete, write (un email específico), el present perfect simple es más natural: "I\'ve finished my homework." Con verbos de proceso o actividad como read, study, work, run, wait, cook, el continuous expresa duración: "I\'ve been working on this all day."',
      ],
      table: [
        ['Pregunta implícita', 'Tiempo verbal', 'Ejemplo'],
        ['¿Cuántas veces? / ¿Está hecho?', 'Present Perfect Simple', '"She\'s called you three times."'],
        ['¿Cuánto tiempo? / ¿En qué?', 'Present Perfect Continuous', '"She\'s been calling you all afternoon."'],
      ],
    },
    {
      heading: 'For y Since con Present Perfect Continuous',
      paragraphs: [
        'Al igual que con el present perfect simple, for y since indican duración con el continuous: "I\'ve been waiting for an hour." / "She\'s been living abroad since 2021."',
        'Una diferencia: para estados permanentes o situaciones de larga duración, el simple es más natural: "I\'ve known him for years" (no "I\'ve been knowing him"). Para actividades activas en progreso, el continuous suena más natural: "I\'ve been working on this project for months."',
      ],
    },
    {
      heading: 'Usos conversacionales del Present Perfect Continuous',
      paragraphs: [
        'En conversación, este tiempo es muy útil para explicar por qué estás cansado, sucio, de buen humor, etc.: "I\'ve been cooking all afternoon — the kitchen is a mess!" / "We\'ve been waiting for this opportunity for so long!"',
        'También aparece mucho en preguntas: "What have you been doing lately?" / "How long have you been learning English?" Son preguntas naturales y frecuentes en entrevistas, conversaciones informales y exámenes como IELTS o Cambridge.',
      ],
    },
    {
      heading: 'Errores frecuentes de hispanohablantes',
      paragraphs: [
        'El error más común es olvidar "been": "I\'ve studying" ❌ → "I\'ve been studying" ✓. Otra confusión es usar continuous para estados: "I\'ve been knowing her" ❌ → "I\'ve known her" ✓.',
        'En español no existe una forma equivalente exacta; según el contexto se puede traducir como "llevo [tiempo] + gerundio" o "he estado + gerundio". Ej: "I\'ve been waiting for 20 minutes" = "Llevo 20 minutos esperando."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Present perfect continuous para actividades en progreso y para explicar estados presentes con sus causas.',
    graphicPrompt: 'Flecha larga desde el pasado hasta NOW con actividad en progreso, luego resultado visible.',
    scene: [
      ['I\'ve been working on this presentation for hours.', 'Llevo horas trabajando en esta presentación.'],
      ['Why are you tired? — I\'ve been exercising.', '¿Por qué estás cansado? — He estado haciendo ejercicio.'],
      ['She\'s been living in Seoul since March.', 'Lleva viviendo en Seúl desde marzo.'],
      ['They\'ve been arguing all morning.', 'Han estado discutiendo toda la mañana.'],
      ['How long have you been waiting?', '¿Cuánto tiempo llevas esperando?'],
      ['I\'ve been trying to call you for an hour!', '¡Llevo una hora intentando llamarte!'],
      ['He\'s been studying Korean since he watched that drama.', 'Ha estado estudiando coreano desde que vio ese drama.'],
      ['We\'ve been saving money to travel to Japan.', 'Hemos estado ahorrando dinero para viajar a Japón.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['have been + -ing', 'for vs since', 'pp simple vs continuous', 'no stative verbs in continuous'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de present perfect continuous.',
        type: 'choice',
        items: [
          {
            scene: 'Un día agotador',
            lines: [['', 'I\'m exhausted! I ___ all day.']],
            options: ['\'ve been working', '\'ve worked', '\'m working', 'worked'],
            answer: '\'ve been working',
            explain: '\'ve been working: actividad en progreso que explica el agotamiento actual. "I\'ve worked all day" sería correcto pero menos natural para explicar un estado presente.',
          },
          {
            scene: 'Una pregunta de curiosidad',
            lines: [['', 'How long ___ English?']],
            options: ['have you been learning', 'have you learned', 'are you learning', 'did you learn'],
            answer: 'have you been learning',
            explain: 'Have you been learning: pregunta por duración de una actividad en progreso → present perfect continuous.',
          },
          {
            scene: 'Una llamada sin respuesta',
            lines: [['', 'I ___ to reach her since this morning but she doesn\'t pick up.']],
            options: ['\'ve been trying', '\'ve tried', '\'m trying', 'try'],
            answer: '\'ve been trying',
            explain: '\'ve been trying: acción repetida/continua desde esta mañana → present perfect continuous con since.',
          },
          {
            scene: 'El piso sucio',
            lines: [['Alex:', 'Why is the kitchen so messy?'], ['Sam:', 'I ___ all afternoon.']],
            options: ['\'ve been cooking', '\'ve cooked', '\'m cooking', 'cooked'],
            answer: '\'ve been cooking',
            explain: '\'ve been cooking: la cocina sucia es el resultado visible de haber cocinado → present perfect continuous explica el estado presente.',
          },
          {
            scene: 'Un proyecto largo',
            lines: [['', 'She ___ on that novel for three years!']],
            options: ['\'s been working', '\'s worked', 'is working', 'worked'],
            answer: '\'s been working',
            explain: '\'s been working: she → has been working. Actividad en progreso durante un período largo con resultado todavía incompleto.',
          },
          {
            scene: 'Una reunión larga',
            lines: [['', 'We ___ in this meeting for two hours and we haven\'t decided anything!']],
            options: ['\'ve been sitting', '\'ve sat', '\'re sitting', 'sat'],
            answer: '\'ve been sitting',
            explain: '\'ve been sitting: acción en progreso que todavía continúa → present perfect continuous.',
          },
          {
            scene: 'Ojos rojos',
            lines: [['', 'Your eyes are red. ___ ?']],
            options: ['Have you been crying', 'Did you cry', 'Are you crying', 'Have you cried'],
            answer: 'Have you been crying',
            explain: 'Have you been crying: pregunta sobre actividad reciente con resultado visible (ojos rojos) → present perfect continuous.',
          },
          {
            scene: 'La espera',
            lines: [['', 'The delivery man ___ outside for twenty minutes. Let him in!']],
            options: ['\'s been standing', '\'s stood', 'is standing', 'stood'],
            answer: '\'s been standing',
            explain: '\'s been standing: he/she/it → has been. La acción ha estado en progreso durante 20 minutos.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Causa y estado presente',
        tag: '2 espacios',
        intro: 'Completa con present perfect continuous y la partícula correcta.',
        type: 'dual',
        items: [
          {
            scene: 'El maratonista',
            lines: [['', 'I\'m completely out of breath. I [[0]] (run) [[1]] an hour.']],
            blanks: [
              { options: ['\'ve been running', '\'ve run', 'ran', '\'m running'], answer: '\'ve been running', explain: '\'ve been running: explica el estado actual (sin aliento) → present perfect continuous.' },
              { options: ['for', 'since', 'during', 'from'], answer: 'for', explain: 'For + período de tiempo (an hour).' },
            ],
          },
          {
            scene: 'Un colega curioso',
            lines: [['Colleague:', 'What [[0]] (you/do) with all those spreadsheets?'], ['You:', 'I [[0]] (analyze) our sales data [[1]] last week.']],
            blanks: [
              { options: ['have you been doing', 'have you done', 'are you doing', 'did you do'], answer: 'have you been doing', explain: 'Have you been doing: pregunta por actividad en progreso reciente → present perfect continuous.' },
              { options: ['\'ve been analyzing', '\'ve analyzed', '\'m analyzing', 'analyzed'], answer: '\'ve been analyzing', explain: '\'ve been analyzing: actividad en progreso desde la semana pasada → present perfect continuous.' },
            ],
          },
          {
            scene: 'Aprendizaje de idiomas',
            lines: [['', 'How long [[0]] (you / study) Korean? I [[1]] (learn) it since I discovered K-pop.']],
            blanks: [
              { options: ['have you been studying', 'have you studied', 'did you study', 'are you studying'], answer: 'have you been studying', explain: 'Have you been studying: pregunta por duración de actividad en progreso.' },
              { options: ['\'ve been learning', '\'ve learned', '\'m learning', 'learned'], answer: '\'ve been learning', explain: '\'ve been learning: actividad continua desde un punto de inicio específico (since I discovered K-pop).' },
            ],
          },
          {
            scene: 'El mecánico',
            lines: [['', 'The mechanic [[0]] (work) on my car [[1]] 9 this morning and it\'s still not fixed!']],
            blanks: [
              { options: ['\'s been working', '\'s worked', 'worked', 'is working'], answer: '\'s been working', explain: '\'s been working: he/she/it → has been. Actividad en progreso hasta ahora (y el coche sigue roto).' },
              { options: ['since', 'for', 'from', 'at'], answer: 'since', explain: 'Since + punto de inicio específico (9 this morning).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un mensaje de texto',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta para completar este intercambio de mensajes.',
        type: 'guidedText',
        scene: 'Elige la forma verbal correcta para este texto.',
        text: 'Message from Ana: "Hi! Sorry I missed your call. I [[0]] (prepare) for my presentation all morning. I [[1]] (just / finish) it — finally! My hands are shaking because I [[2]] (drink) too much coffee. How are you? [[3]] (you / wait) long? I [[4]] (think) about calling you back since lunchtime but [[5]] (be) too busy. Can we talk tonight? I [[6]] (really / look) forward to catching up!"',
        blanks: [
          { options: ['\'ve been preparing', '\'ve prepared', 'prepared', 'was preparing'], answer: '\'ve been preparing', explain: '\'ve been preparing: actividad en progreso toda la mañana → present perfect continuous.' },
          { options: ['\'ve just finished', '\'ve been finishing', 'just finished', '\'m just finishing'], answer: '\'ve just finished', explain: '\'ve just finished: resultado reciente completado → present perfect simple con "just".' },
          { options: ['\'ve been drinking', '\'ve drunk', 'drank', '\'m drinking'], answer: '\'ve been drinking', explain: '\'ve been drinking: actividad que explica el estado actual (manos temblorosas) → present perfect continuous.' },
          { options: ['Have you been waiting', 'Did you wait', 'Were you waiting', 'Have you waited'], answer: 'Have you been waiting', explain: 'Have you been waiting: pregunta por duración de espera → present perfect continuous.' },
          { options: ['\'ve been thinking', '\'ve thought', 'thought', 'think'], answer: '\'ve been thinking', explain: '\'ve been thinking: actividad mental en progreso desde el almuerzo → present perfect continuous.' },
          { options: ['\'ve been', 'was', '\'m', 'have been'], answer: '\'ve been', explain: '\'ve been: estado continuo hasta el presente → present perfect simple (verbo estativo be).' },
          { options: ['\'ve been really looking', '\'ve really looked', 'really look', 'am really looking'], answer: '\'ve been really looking', explain: '\'ve been looking forward to: expresión en progreso → present perfect continuous.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Simple o Continuous',
        tag: 'Texto libre',
        intro: 'Escribe present perfect simple o continuous según el énfasis indicado.',
        type: 'freeText',
        scene: 'Escribe la forma correcta (simple o continuous) para cada verbo.',
        text: 'My sister is a doctor. She [[0]] (work) at the hospital for five years now. Today she [[1]] (perform) six operations and it\'s only 3 pm! She [[2]] (study) medicine since she was in high school — she always knew what she wanted. Recently she [[3]] (research) a new treatment. She [[4]] (publish) two papers about it already.',
        blanks: [
          { answer: 'has been working', accepted: ['has been working', '\'s been working'], explain: 'Has been working: actividad en progreso durante 5 años hasta ahora → continuous enfatiza el proceso.' },
          { answer: 'has performed', accepted: ['has performed', '\'s performed'], explain: 'Has performed: número concreto de operaciones (resultado/cantidad) → simple.' },
          { answer: 'has been studying', accepted: ['has been studying', '\'s been studying', 'has studied', '\'s studied'], explain: 'Has been studying: proceso largo en progreso → continuous. (Has studied también es correcto pero less common here).' },
          { answer: 'has been researching', accepted: ['has been researching', '\'s been researching'], explain: 'Has been researching: actividad en progreso recientemente → continuous.' },
          { answer: 'has already published', accepted: ['has already published', '\'s already published'], explain: 'Has already published: resultado concreto (two papers) → simple.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones usando present perfect continuous.',
        type: 'write',
        items: [
          {
            scene: 'Explica tu estado actual',
            prompt: 'Estás cansado/a, sucio/a o de buen humor — explica por qué con present perfect continuous.',
            answer: 'I\'m exhausted because I\'ve been working on a project all day.',
            accepted: ['\'ve been working', 'i\'ve been studying', 'i\'ve been exercising', 'i\'ve been cooking', 'i\'ve been cleaning', 'i\'ve been running'],
            explain: 'Ejemplo: I\'m sweaty because I\'ve been playing football. / I\'m happy because I\'ve been talking to old friends.',
          },
          {
            scene: 'Una actividad en progreso',
            prompt: 'Describe algo que llevas haciendo desde hace tiempo con "for" o "since".',
            answer: 'I\'ve been studying English since I was in secondary school.',
            accepted: ['\'ve been studying', 'i\'ve been learning', 'i\'ve been living', 'i\'ve been working', 'i\'ve been saving', 'since', 'for'],
            explain: 'Ejemplo: I\'ve been living in this apartment for two years. / She\'s been training for the marathon since January.',
          },
          {
            scene: 'Una pregunta de curiosidad',
            prompt: 'Escribe una pregunta "How long have you been...?" sobre algo que te interesa saber de alguien.',
            answer: 'How long have you been studying languages?',
            accepted: ['how long have you been', 'how long has he been', 'how long has she been', 'how long have they been'],
            explain: 'Ejemplo: How long have you been working here? / How long has she been dating him?',
          },
          {
            scene: 'Un proceso reciente',
            prompt: 'Describe algo en lo que has estado trabajando recientemente (proyecto, curso, hobby).',
            answer: 'I\'ve been taking an online photography course for the last month.',
            accepted: ['\'ve been taking', '\'ve been working', '\'ve been studying', '\'ve been learning', '\'ve been reading', '\'ve been writing', '\'ve been practicing'],
            explain: 'Ejemplo: I\'ve been reading a really interesting book lately. / I\'ve been working on my fitness for the past few weeks.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu último mes',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre actividades en las que has estado involucrado recientemente.',
        type: 'write',
        items: [
          {
            scene: 'Tu proceso',
            prompt: 'Escribe sobre algo que llevas aprendiendo o practicando (for o since).',
            answer: 'I\'ve been practicing my English every day for the past three months.',
            accepted: ['\'ve been practicing', 'i\'ve been learning', 'i\'ve been studying', 'i\'ve been training', 'i\'ve been working on'],
            explain: 'Usa: I\'ve been [verbo -ing] for [tiempo] / since [momento]. Ej: I\'ve been taking yoga classes since the new year.',
          },
          {
            scene: 'Tu proceso',
            prompt: 'Explica por qué estás cansado/a, emocionado/a o estresado/a hoy (present perfect continuous como causa).',
            answer: 'I\'m stressed today because I\'ve been preparing for an important exam.',
            accepted: ['because i\'ve been', 'because she\'s been', 'because he\'s been', 'because we\'ve been', '\'ve been working', '\'ve been studying', '\'ve been thinking'],
            explain: 'Usa: I\'m [estado] because I\'ve been [actividad]. Ej: I\'m tired because I\'ve been commuting for three hours.',
          },
          {
            scene: 'Tu proceso',
            prompt: 'Menciona algo en lo que has estado trabajando recientemente y su resultado (combina continuous + simple).',
            answer: 'I\'ve been studying grammar a lot lately and I\'ve already improved my writing.',
            accepted: ['\'ve been', '\'ve already', '\'ve improved', '\'ve finished', '\'ve completed', '\'ve learned'],
            explain: 'Combina: I\'ve been [proceso] and I\'ve [resultado]. Ej: I\'ve been exercising regularly and I\'ve lost 3 kilos.',
          },
        ],
      },
    ],
  },
}

export default topic
