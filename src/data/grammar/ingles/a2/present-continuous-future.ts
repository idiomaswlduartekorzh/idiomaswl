import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'present-continuous-future-a2',
  order: '20',
  color: '#dc2626',
  category: 'Futuro',
  level: 'A2',
  title: 'Present Continuous para el futuro en Inglés A2: planes concretos',
  shortTitle: 'Futuro: Present Continuous',
  metaTitle: 'Present Continuous para el Futuro en Inglés A2 — Planes y Arreglos Confirmados',
  description:
    'En inglés, el present continuous se usa para planes o citas que ya están organizados y confirmados. Aprende a distinguirlo de "will" y "going to" para hablar del futuro con precisión en situaciones reales.',
  lead: 'Habla de planes ya confirmados como lo hacen los nativos: am/is/are + -ing con referencia de tiempo futura.',
  outcomes: [
    'Usa el present continuous para planes y citas ya acordados',
    'Distingue present continuous (plan confirmado) de going to (intención) y will (espontáneo)',
    'Forma preguntas sobre planes futuros: "Are you working this weekend?"',
    'Añade expresiones de tiempo para indicar que la acción es futura, no presente',
  ],

  guide: {
    goal: 'Hablar de planes y arreglos futuros ya confirmados usando el present continuous.',
    model: "I'm meeting my doctor at 3 p.m. tomorrow. / Are you coming to the party tonight?",
    formula: 'am/is/are + verbo -ing + expresión de tiempo futuro',
    decisions: [
      'Plan ya acordado / cita en la agenda → present continuous (I\'m meeting him tomorrow.)',
      'Intención / decisión tomada sin confirmar → going to (I\'m going to study medicine.)',
      'Decisión espontánea / oferta / predicción → will (I\'ll help you.)',
      'La expresión de tiempo (tomorrow, next week, on Friday) es ESENCIAL para indicar futuro',
      'Sin expresión de tiempo → la oración se interpreta como presente (acción en progreso ahora)',
    ],
    table: [
      ['Forma', 'Estructura', 'Ejemplo'],
      ['Afirmativa', 'am/is/are + verbo -ing', "I'm meeting him tomorrow."],
      ['Negativa', "am/is/are + not + verbo -ing", "She isn't coming tonight."],
      ['Interrogativa', 'Am/Is/Are + sujeto + verbo -ing?', 'Are you working next Saturday?'],
      ['Respuesta corta', "Yes, I am. / No, I'm not.", '—'],
    ],
    mistakes: [
      '"I will meet the director tomorrow." — Correcto pero suena como decisión espontánea. "I\'m meeting the director tomorrow." comunica que ya está en la agenda.',
      '"She is flying to Lima." (sin tiempo) ❌ — Sin expresión de tiempo, suena como: está volando AHORA. Agrega "next week", "on Friday", etc.',
      '"I am going to meeting him." ❌ → "I am meeting him." ✓ — No combines "going to" con "-ing". Son estructuras separadas.',
    ],
  },

  seo: [
    {
      heading: '¿Por qué se usa el present continuous para el futuro?',
      paragraphs: [
        'En inglés existe una diferencia importante entre planes ya organizados y simples intenciones. El present continuous se usa para eventos futuros ya acordados: tiquetes comprados, citas reservadas, acuerdos con otras personas.',
        'Ejemplo: "I\'m having dinner with my team on Friday." → La cena ya está organizada. "I\'m going to have dinner with my team." → Solo es una intención, nada confirmado aún.',
      ],
    },
    {
      heading: 'Present Continuous vs Going to vs Will',
      paragraphs: [
        'Present continuous para futuro: plan ya confirmado, hay un arreglo previo. I\'m seeing the dentist at 4. (cita reservada)',
        'Going to: intención o decisión tomada, pero no necesariamente confirmada con otros. I\'m going to study medicine. (decisión personal)',
        'Will: decisión espontánea, oferta, predicción. I\'ll help you if you need it. (decisión en el momento de hablar)',
      ],
      examples: [
        ['Estructura', 'Uso principal', 'Ejemplo'],
        ['am/is/are + -ing', 'Plan confirmado / cita agendada', "I'm flying to Bogotá next Friday."],
        ['going to', 'Intención / plan sin confirmar', "I'm going to apply for that job."],
        ['will', 'Espontáneo / oferta / predicción', "Don't worry, I'll call them."],
      ],
    },
    {
      heading: 'Verbos más comunes en este uso',
      paragraphs: [
        'Los verbos más frecuentes en el present continuous para planes futuros son: meet, see, visit, have (a meeting/dinner), fly, drive, leave, arrive, start, present, travel.',
        'Siempre acompáñalos de una expresión de tiempo: tomorrow, next week, on Friday, this weekend, in two weeks, on the 15th.',
      ],
    },
    {
      heading: '¿Se puede usar el present continuous para el futuro en inglés?',
      paragraphs: [
        'Sí, para planes futuros ya organizados, con una hora o fecha concreta: "I am meeting Leo tomorrow", "We are flying to Rome on Friday". Es como el "voy a + infinitivo" español cuando el plan ya está fijado (cita, reserva, billete).',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre present continuous y "going to" para el futuro?',
      paragraphs: [
        'El present continuous se usa para planes ya organizados y concretos ("I\'m seeing the dentist at 5"). "going to" sirve para intenciones y planes en general, aunque no estén cerrados ("I\'m going to study more this year"). Ambos son válidos; el continuous suena más definitivo.',
      ],
    },
    {
      heading: '¿Cómo se habla de planes futuros ya organizados en inglés?',
      paragraphs: [
        'Con el present continuous + un marcador de tiempo futuro: "I\'m playing tennis this evening", "They\'re getting married next month". La clave es que el plan ya está acordado; sin marcador de futuro, la misma frase se entendería como acción en curso.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Present continuous para planes futuros confirmados: agenda, citas, viajes.',
    graphicPrompt: 'Una agenda semanal con planes concretos: vuelos, reuniones, cenas, visitas.',
    scene: [
      ["I'm meeting my boss at 10 tomorrow.", 'Tengo reunión con mi jefe a las 10 mañana.'],
      ["We're flying to Cartagena next Friday.", 'Volamos a Cartagena el próximo viernes.'],
      ["She's starting her new job on Monday.", 'Ella empieza su nuevo trabajo el lunes.'],
      ['Are you coming to the party tonight?', '¿Vienes a la fiesta esta noche?'],
      ["I'm not working this Saturday.", 'No trabajo este sábado.'],
      ['What are you doing next weekend?', '¿Qué haces el próximo fin de semana?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['plan confirmado vs intención', 'expresiones de tiempo futuras', 'present continuous negativo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Planes futuros confirmados',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma de present continuous correcta para el plan mencionado.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de planes para el fin de semana.',
            lines: [
              ['Amigo', 'What are you doing this Saturday?'],
              ['Tú', "I ___ my parents in Cartagena. We have the hotel reserved."],
            ],
            options: ["'m visiting", "'ll visit", 'going to visit', 'visit'],
            answer: "'m visiting",
            explain: 'Plan ya confirmado (hotel reservado) → present continuous: "I\'m visiting".',
          },
          {
            scene: 'Coordinar una reunión de trabajo.',
            lines: [
              ['Colega', 'When is the meeting?'],
              ['Jefa', 'We ___ at 10 a.m. tomorrow in the conference room.'],
            ],
            options: ["'re meeting", 'will meet', "'re going to meet", 'meet'],
            answer: "'re meeting",
            explain: 'Plan en la agenda (reunión agendada) → present continuous: "We\'re meeting".',
          },
          {
            scene: 'Hablando de viajes.',
            lines: [['Compañera', '___ you flying to Bogotá next week for the conference?']],
            options: ['Are', 'Will', 'Do', 'Have'],
            answer: 'Are',
            explain: 'Pregunta sobre plan futuro con present continuous → "Are you flying?"',
          },
          {
            scene: 'Planes de la noche.',
            lines: [
              ['Papá', 'Are you having dinner at home tonight?'],
              ['Hijo', "No, I ___ dinner with some friends from university."],
            ],
            options: ["'m having", "'ll have", 'have', "'m going to have"],
            answer: "'m having",
            explain: 'Plan de cena ya acordado con los amigos → present continuous: "I\'m having".',
          },
          {
            scene: 'Confirmando una llegada.',
            lines: [['Papá', 'When ___ your sister arriving?']],
            options: ['is', 'will', 'does', 'has'],
            answer: 'is',
            explain: 'Pregunta sobre plan de llegada → "When is she arriving?" Present continuous interrogativo.',
          },
          {
            scene: 'Negando un plan.',
            lines: [
              ['Amiga', 'Is Marco coming to the party?'],
              ['Tú', 'No, he ___. He has to work.'],
            ],
            options: ["isn't coming", "won't come", "doesn't come", "isn't going to come"],
            answer: "isn't coming",
            explain: 'Negación de plan con present continuous → "He isn\'t coming".',
          },
          {
            scene: 'Comenzando un nuevo trabajo.',
            lines: [
              ['Entrevistador', 'So, you\'re our new hire?'],
              ['Ana', 'Yes! I ___ on the 15th of next month.'],
            ],
            options: ["'m starting", 'start', 'will start', "'ll be starting"],
            answer: "'m starting",
            explain: 'Fecha de inicio ya acordada con la empresa → present continuous: "I\'m starting".',
          },
          {
            scene: 'Planes para esta noche.',
            lines: [['Tú', 'I ___ the new Spanish film tonight. Do you want to come?']],
            options: ["'m watching", 'watch', 'will watch', 'watched'],
            answer: "'m watching",
            explain: 'Plan ya organizado para esta noche → present continuous: "I\'m watching".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Construye planes futuros',
        tag: '2 espacios',
        intro: 'Completa con el present continuous correcto y la expresión de tiempo adecuada.',
        type: 'dual',
        items: [
          {
            scene: 'Hablando de una boda.',
            lines: [['', 'Lucia and Marco [[0]] married [[1]] June. They already sent the invitations.']],
            blanks: [
              { options: ['are getting', 'will get', 'get', 'are going to get'], answer: 'are getting', explain: 'Plan organizado (invitaciones ya enviadas) → present continuous: "are getting married".' },
              { options: ['next', 'in', 'on', 'at'], answer: 'next', explain: '"Next June" = el próximo mes de junio.' },
            ],
          },
          {
            scene: 'Organizando una reunión.',
            lines: [['', '[[0]] they meeting at the new branch or at the headquarters [[1]] Thursday?']],
            blanks: [
              { options: ['Are', 'Will', 'Do', 'Have'], answer: 'Are', explain: 'Pregunta sobre plan futuro → "Are they meeting?" Present continuous interrogativo.' },
              { options: ['on', 'in', 'at', 'next'], answer: 'on', explain: '"On Thursday" = el día específico → "on" + día de la semana.' },
            ],
          },
          {
            scene: 'Negando un plan de viaje.',
            lines: [['', "We [[0]] to Paris this summer. We [[1]] the tickets because they were too expensive."]],
            blanks: [
              { options: ["aren't flying", "won't fly", "don't fly", "didn't fly"], answer: "aren't flying", explain: "Negación de plan de viaje → 'aren't flying'." },
              { options: ["didn't buy", "don't buy", "aren't buying", "haven't bought"], answer: "didn't buy", explain: 'Acción pasada (razón) → past simple: "didn\'t buy".' },
            ],
          },
          {
            scene: 'Planes para mañana por la tarde.',
            lines: [['', "I [[0]] my English tutor at 4 p.m. [[1]]. Can we meet after that?"]],
            blanks: [
              { options: ["'m seeing", 'will see', 'see', 'going to see'], answer: "'m seeing", explain: "Cita ya confirmada → present continuous: 'I'm seeing'." },
              { options: ['tomorrow', 'next', 'yesterday', 'soon'], answer: 'tomorrow', explain: '"Tomorrow" indica el futuro próximo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una agenda llena',
        tag: 'Texto guiado',
        intro: 'Completa con el present continuous correcto para cada plan.',
        type: 'guidedText',
        scene: 'Felipe describe su agenda de la próxima semana.',
        text: "My week is completely full. On Monday, I [[0]] my new business partner at the airport. On Tuesday, we [[1]] a meeting with investors at 10 a.m. On Wednesday, I [[2]] to Medellín for a regional conference. I [[3]] there until Thursday. On Friday, I [[4]] from home because I need a quiet day to finish the report.",
        blanks: [
          { options: ['am meeting', 'will meet', 'met', 'going to meet'], answer: 'am meeting', explain: '"I am meeting" = cita en el aeropuerto ya coordinada.' },
          { options: ['are having', 'will have', 'had', 'going to have'], answer: 'are having', explain: '"We are having a meeting" = reunión ya agendada.' },
          { options: ['am flying', 'will fly', 'flew', 'going to fly'], answer: 'am flying', explain: '"I am flying" = tiquete ya comprado.' },
          { options: ['am staying', 'will stay', 'stayed', 'going to stay'], answer: 'am staying', explain: '"I am staying" = alojamiento ya reservado.' },
          { options: ['am working', 'will work', 'worked', 'going to work'], answer: 'am working', explain: '"I am working from home" = plan decidido para ese día.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe los planes correctamente',
        tag: 'Texto libre',
        intro: 'Escribe la forma de present continuous según el sujeto y verbo indicados.',
        type: 'freeText',
        scene: 'Los miembros de una familia hablan de sus planes para las próximas vacaciones.',
        text: "Mom: I [[0]] a big family dinner on Sunday. \nDad: We [[1]] to the coast next Saturday. \nSister: My friend and I [[2]] the national museum on Friday afternoon. \nBrother: I [[3]] to Sunday dinner. I [[4]] in a football tournament that day.",
        blanks: [
          { answer: 'am cooking', explain: '"I am cooking" = plan de cena ya decidido.' },
          { answer: 'are driving', explain: '"We are driving" = viaje al litoral ya planeado.' },
          { answer: 'are visiting', explain: '"We are visiting" = visita al museo ya organizada.' },
          { answer: "'m not coming", explain: "'I'm not coming' = negación de plan con present continuous." },
          { answer: 'am playing', explain: '"I am playing" = torneo ya confirmado.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Transforma a planes confirmados',
        tag: 'Escritura guiada',
        intro: 'Reescribe la oración usando el present continuous para indicar plan confirmado.',
        type: 'write',
        items: [
          {
            scene: 'Transforma: "I will meet the director tomorrow." → plan confirmado (cita ya acordada)',
            prompt: 'I will meet the director tomorrow.',
            answer: "I'm meeting the director tomorrow.",
            accepted: ['I am meeting the director tomorrow.'],
            explain: '"Will" suena como decisión espontánea. "I\'m meeting" comunica que la cita ya está acordada.',
          },
          {
            scene: 'Transforma en negativa: "She is flying to Lima next week." → ella no va',
            prompt: 'She is flying to Lima next week.',
            answer: "She isn't flying to Lima next week.",
            accepted: ['She is not flying to Lima next week.'],
            explain: 'Negación de present continuous: "isn\'t flying". El plan se canceló.',
          },
          {
            scene: 'Transforma en pregunta: "They are presenting the new product on Thursday."',
            prompt: 'They are presenting the new product on Thursday.',
            answer: 'Are they presenting the new product on Thursday?',
            accepted: [],
            explain: 'Pregunta de present continuous: Are + sujeto + verbo -ing?',
          },
          {
            scene: 'Agrega una expresión de tiempo para convertirlo en plan futuro: "We are having a team meeting."',
            prompt: 'We are having a team meeting.',
            answer: 'We are having a team meeting tomorrow morning.',
            accepted: [
              'We are having a team meeting next Monday.',
              'We are having a team meeting on Friday.',
              'We are having a team meeting this afternoon.',
            ],
            explain: 'Sin expresión de tiempo, suena como ahora mismo. Agrega "tomorrow", "next week", "on + día".',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tu agenda personal',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales sobre tus propios planes con present continuous.',
        type: 'write',
        items: [
          {
            scene: 'Describe 2 planes concretos que tienes para los próximos días.',
            prompt: 'Escribe 2 oraciones sobre planes ya confirmados que tienes esta semana.',
            answer: "I'm having coffee with a friend tomorrow afternoon. We're going to the cinema on Saturday evening.",
            accepted: ["I'm visiting my grandmother this weekend. My family is having a big dinner on Sunday."],
            explain: 'Usa am/is/are + -ing para cada plan. Incluye la expresión de tiempo para indicar que es futuro, no presente.',
          },
          {
            scene: 'Pregunta a alguien sobre sus planes usando present continuous.',
            prompt: 'Escribe 2 preguntas sobre planes futuros de otra persona.',
            answer: 'Are you working this weekend? What are you doing on Friday night?',
            accepted: ["Is your sister coming to the party? Are you traveling anywhere next month?"],
            explain: 'Are/Is + sujeto + verbo -ing? Para preguntar sobre planes ya organizados.',
          },
          {
            scene: 'Describe una semana muy ocupada usando 3 formas de present continuous.',
            prompt: 'Escribe 3 oraciones sobre una semana muy ocupada con diferentes planes.',
            answer: "On Monday I'm starting a new project at work. On Wednesday we're having a company dinner. On Friday I'm flying to Mexico City for a training.",
            accepted: [
              "This week I'm presenting my research on Tuesday. I'm meeting the director on Thursday. I'm attending a conference on Friday.",
            ],
            explain: 'Usa "on + día" para dar especificidad. Cada oración con un verbo diferente en present continuous y un plan distinto.',
          },
        ],
      },
    ],
  },
}

export default topic
