import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'gerunds-infinitives-b1',
  order: '11',
  color: '#dc2626',
  category: 'Verbs',
  level: 'B1',
  title: 'Gerundios e Infinitivos en Inglés B1',
  shortTitle: 'Gerundios e Infinitivos',
  metaTitle: 'Gerundios e Infinitivos B1 — Verbs + -ing vs to + infinitive en inglés',
  description:
    'En B1 debes dominar qué verbos van seguidos de gerundio (-ing) y cuáles van seguidos de infinitivo (to + verb). Algunos verbos cambian de significado según la forma que les sigue. Esta distinción es fundamental para el IELTS, Cambridge B1 y el examen TOEFL.',
  lead: 'Aprende cuándo usar gerundio y cuándo usar infinitivo para expresarte con precisión en inglés B1.',
  outcomes: [
    'Identificas los verbos que van seguidos de gerundio (enjoy, avoid, finish, keep, suggest)',
    'Identificas los verbos que van seguidos de infinitivo (want, hope, plan, decide, promise)',
    'Usas el gerundio como sujeto de la oración y después de preposiciones',
    'Distingues el cambio de significado en stop, remember y try con gerundio vs infinitivo',
  ],

  guide: {
    goal: 'Elegir entre gerundio (-ing) e infinitivo (to + verb) según el verbo principal de la oración.',
    model: 'I enjoy swimming. / I decided to swim. / Stop talking! / I stopped to talk to her.',
    formula: 'Verb + -ing (gerund) OR Verb + to + infinitive',
    decisions: [
      'Verbos + gerundio: enjoy, avoid, finish, keep, suggest, consider, practise, miss, risk, can\'t stand, mind',
      'Verbos + infinitivo: want, hope, plan, decide, need, agree, promise, refuse, offer, manage, seem, appear',
      'Gerundio como sujeto: "Swimming is good for your health." — el gerundio actua como sustantivo.',
      'Gerundio después de preposición: "I\'m interested in learning French." / "Thank you for coming."',
      'stop + gerundio = dejar de hacer algo; stop + infinitivo = parar para hacer otra cosa',
      'remember + gerundio = recordar algo del pasado; remember + infinitivo = no olvidar hacer algo',
      'try + gerundio = experimentar algo para ver si funciona; try + infinitivo = intentar con esfuerzo',
    ],
    table: [
      ['Categoría', 'Verbo principal', 'Ejemplo'],
      ['Verbo + gerundio', 'enjoy / avoid / keep', 'She enjoys cooking Italian food.'],
      ['Verbo + infinitivo', 'want / decide / hope', 'He decided to study medicine.'],
    ],
    mistakes: [
      '"I enjoy to swim" ❌ → "I enjoy swimming" ✓ — enjoy siempre va con gerundio.',
      '"She suggested to go" ❌ → "She suggested going" ✓ — suggest siempre va con gerundio.',
      '"I want studying" ❌ → "I want to study" ✓ — want siempre va con infinitivo.',
    ],
  },

  seo: [
    {
      heading: '¿Gerundio o infinitivo? La regla esencial del inglés B1',
      paragraphs: [
        'Una de las decisiones más frecuentes en inglés B1 es elegir entre el gerundio (verbo + -ing) y el infinitivo (to + verbo). No existe una regla gramatical única que cubra todos los casos: debes aprender qué verbos van con cada forma.',
        'La buena noticia es que los verbos más frecuentes en examen (IELTS, Cambridge, TOEFL) pertenecen a grupos claros. Con práctica constante, la elección se vuelve intuitiva.',
      ],
    },
    {
      heading: 'Verbos que siempre van con gerundio',
      paragraphs: [
        'Los siguientes verbos siempre van seguidos de gerundio en inglés: enjoy (disfrutar), avoid (evitar), finish (terminar), keep (seguir haciendo), suggest (sugerir), consider (considerar), practise (practicar), miss (extrañar), risk (arriesgar), mind (importar), can\'t stand (no soportar).',
        'Ejemplos en contexto: "I really enjoy learning new languages." / "She avoided making eye contact." / "They finished writing the report at midnight." / "Keep practising your pronunciation every day."',
      ],
      table: [
        ['Verbo', 'Ejemplo', 'Traducción'],
        ['enjoy', 'I enjoy listening to podcasts.', 'Disfruto escuchar podcasts.'],
        ['avoid', 'Avoid making mistakes under pressure.', 'Evita cometer errores bajo presión.'],
        ['finish', 'Did you finish reading the article?', '¿Terminaste de leer el artículo?'],
        ['keep', 'Keep studying even when it\'s hard.', 'Sigue estudiando aunque sea difícil.'],
        ['suggest', 'She suggested taking a break.', 'Ella sugirió tomar un descanso.'],
      ],
    },
    {
      heading: 'Verbos que siempre van con infinitivo',
      paragraphs: [
        'Estos verbos siempre van seguidos de to + infinitivo: want (querer), hope (esperar), plan (planear), decide (decidir), need (necesitar), agree (estar de acuerdo), promise (prometer), refuse (negarse), offer (ofrecer), manage (lograr), seem (parecer), appear (parecer), afford (poder costear).',
        'Ejemplos: "I want to improve my English before the IELTS." / "She decided to move to Canada." / "They managed to finish the project on time." / "He refused to sign the contract."',
      ],
    },
    {
      heading: 'Gerundio como sujeto y después de preposiciones',
      paragraphs: [
        'El gerundio funciona como sustantivo y puede ser el sujeto de una oración: "Swimming is great exercise." / "Learning a new language takes time." / "Eating well is important for your health."',
        'Después de preposición, el inglés SIEMPRE usa gerundio, nunca infinitivo. Ejemplos frecuentes: interested in doing, good at speaking, worried about making, thank you for coming, instead of going, before leaving, after finishing.',
      ],
    },
    {
      heading: 'Stop, remember y try: verbos con doble forma',
      paragraphs: [
        'Estos tres verbos cambian de significado según la forma que les sigue. Stop + gerundio = dejar de hacer algo: "She stopped smoking last year." Stop + infinitivo = parar para hacer algo diferente: "He stopped to check his phone." (paró lo que hacía para revisar el teléfono).',
        'Remember + gerundio = recordar algo que ya ocurrió: "I remember meeting him at the conference." Remember + infinitivo = no olvidar hacer algo en el futuro: "Remember to send the email." Try + gerundio = experimentar algo como solución: "Try drinking more water if you have headaches." Try + infinitivo = esforzarse para lograr algo: "I tried to open the jar but couldn\'t."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Gerundios e infinitivos: verbos clave que rigen cada forma y cambios de significado en stop/remember/try.',
    graphicPrompt: 'Tabla dividida en dos columnas: verbos + -ing a la izquierda, verbos + to a la derecha.',
    scene: [
      ['I enjoy working from home on Fridays.', 'Disfruto trabajar desde casa los viernes.'],
      ['She decided to apply for the scholarship.', 'Ella decidió solicitar la beca.'],
      ['Keep practising — you\'re making great progress!', 'Sigue practicando, estás progresando mucho.'],
      ['I forgot to call my professor. He was waiting.', 'Olvidé llamar a mi profesor. Él estaba esperando.'],
      ['Stop talking and listen carefully!', '¡Deja de hablar y escucha con atención!'],
      ['He stopped to read the sign on the door.', 'Paró para leer el letrero en la puerta.'],
      ['Thank you for helping me with the application.', 'Gracias por ayudarme con la solicitud.'],
      ['She managed to pass the IELTS on her first try.', 'Logró pasar el IELTS en su primer intento.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['enjoy', 'avoid', 'finish', 'keep', 'decide', 'want', 'manage', 'stop', 'remember', 'try'],
    reviewFocus: ['verbs + gerund', 'verbs + infinitive', 'gerund as subject', 'preposition + gerund', 'stop/remember/try'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige si el verbo subrayado va seguido de gerundio o infinitivo.',
        type: 'choice',
        items: [
          {
            scene: 'Decisión de carrera',
            lines: [['', 'She decided ___ medicine at university.']],
            options: ['to study', 'studying', 'study', 'studied'],
            answer: 'to study',
            explain: 'decide siempre va seguido de to + infinitivo: decided to study.',
          },
          {
            scene: 'Hábito de estudio',
            lines: [['', 'I enjoy ___ podcasts in English on my way to work.']],
            options: ['listening to', 'to listen to', 'listen', 'listened to'],
            answer: 'listening to',
            explain: 'enjoy siempre va con gerundio: enjoy listening to.',
          },
          {
            scene: 'Consejo de salud',
            lines: [['', 'The doctor suggested ___ more water every day.']],
            options: ['drinking', 'to drink', 'drink', 'drank'],
            answer: 'drinking',
            explain: 'suggest siempre va con gerundio: suggested drinking.',
          },
          {
            scene: 'Una promesa',
            lines: [['David:', 'Did you promise ___ early?']],
            options: ['to arrive', 'arriving', 'arrive', 'arrived'],
            answer: 'to arrive',
            explain: 'promise siempre va con to + infinitivo: promised to arrive.',
          },
          {
            scene: 'Actitud negativa',
            lines: [['', 'He refused ___ the new terms of the contract.']],
            options: ['to accept', 'accepting', 'accept', 'accepted'],
            answer: 'to accept',
            explain: 'refuse siempre va con to + infinitivo: refused to accept.',
          },
          {
            scene: 'Ruta al trabajo',
            lines: [['', '___ to work by bike saves money and keeps you fit.']],
            options: ['Cycling', 'To cycle', 'Cycle', 'Cycled'],
            answer: 'Cycling',
            explain: 'Cuando el verbo es el sujeto de la oración, se usa gerundio como sustantivo: Cycling saves money.',
          },
          {
            scene: 'Interés personal',
            lines: [['', 'Are you interested in ___ a second language?']],
            options: ['learning', 'to learn', 'learn', 'learned'],
            answer: 'learning',
            explain: 'Después de preposición (in) siempre va gerundio: interested in learning.',
          },
          {
            scene: 'Un recuerdo',
            lines: [['', 'I remember ___ her at the conference in Bogotá last year.']],
            options: ['meeting', 'to meet', 'meet', 'met'],
            answer: 'meeting',
            explain: 'remember + gerundio = recordar algo del pasado: I remember meeting her (ya ocurrió).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos formas en contexto',
        tag: '2 espacios',
        intro: 'Completa con la forma correcta del verbo entre paréntesis.',
        type: 'dual',
        items: [
          {
            scene: 'Planes de verano',
            lines: [['', 'She plans [[0]] (travel) to Korea and hopes [[1]] (improve) her Korean there.']],
            blanks: [
              { options: ['to travel', 'travelling', 'travel', 'traveled'], answer: 'to travel', explain: 'plan siempre va con to + infinitivo: plans to travel.' },
              { options: ['to improve', 'improving', 'improve', 'improved'], answer: 'to improve', explain: 'hope siempre va con to + infinitivo: hopes to improve.' },
            ],
          },
          {
            scene: 'Buen hábito',
            lines: [['', 'I\'ve finished [[0]] (write) my essay, so I can keep [[1]] (review) my notes.']],
            blanks: [
              { options: ['writing', 'to write', 'write', 'written'], answer: 'writing', explain: 'finish siempre va con gerundio: finished writing.' },
              { options: ['reviewing', 'to review', 'review', 'reviewed'], answer: 'reviewing', explain: 'keep siempre va con gerundio: keep reviewing.' },
            ],
          },
          {
            scene: 'Difícil tarea',
            lines: [['', 'He managed [[0]] (pass) the exam despite avoiding [[1]] (study) during the week.']],
            blanks: [
              { options: ['to pass', 'passing', 'pass', 'passed'], answer: 'to pass', explain: 'manage siempre va con to + infinitivo: managed to pass.' },
              { options: ['studying', 'to study', 'study', 'studied'], answer: 'studying', explain: 'avoid siempre va con gerundio: avoiding studying.' },
            ],
          },
          {
            scene: 'Recordatorio',
            lines: [['', 'Remember [[0]] (lock) the door, and don\'t forget [[1]] (send) the report.']],
            blanks: [
              { options: ['to lock', 'locking', 'lock', 'locked'], answer: 'to lock', explain: 'remember + infinitivo = no olvidar hacer algo en el futuro: Remember to lock.' },
              { options: ['to send', 'sending', 'send', 'sent'], answer: 'to send', explain: 'forget + infinitivo = olvidar hacer algo (futuro): don\'t forget to send.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La historia de Ana',
        tag: 'Texto guiado',
        intro: 'Completa con la forma correcta del verbo indicado (gerundio o infinitivo).',
        type: 'guidedText',
        scene: 'Elige la forma correcta del verbo para completar la historia.',
        text: 'Ana always enjoyed [[0]] (learn) new things, so she decided [[1]] (take) an English course online. She kept [[2]] (practise) every day after work. At first, she avoided [[3]] (speak) in class because she was nervous, but she managed [[4]] (overcome) her fear. She remembers [[5]] (make) many mistakes at the beginning. Now she\'s considering [[6]] (apply) for a job abroad.',
        blanks: [
          { options: ['learning', 'to learn', 'learn', 'learned'], answer: 'learning', explain: 'enjoy + gerundio: enjoyed learning.' },
          { options: ['to take', 'taking', 'take', 'took'], answer: 'to take', explain: 'decide + infinitivo: decided to take.' },
          { options: ['practising', 'to practise', 'practise', 'practised'], answer: 'practising', explain: 'keep + gerundio: kept practising.' },
          { options: ['speaking', 'to speak', 'speak', 'spoke'], answer: 'speaking', explain: 'avoid + gerundio: avoided speaking.' },
          { options: ['to overcome', 'overcoming', 'overcome', 'overcame'], answer: 'to overcome', explain: 'manage + infinitivo: managed to overcome.' },
          { options: ['making', 'to make', 'make', 'made'], answer: 'making', explain: 'remember + gerundio = recordar algo del pasado: remembers making (ya ocurrió).' },
          { options: ['applying', 'to apply', 'apply', 'applied'], answer: 'applying', explain: 'consider + gerundio: considering applying.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la forma correcta',
        tag: 'Texto libre',
        intro: 'Escribe el verbo en su forma correcta (gerundio o infinitivo) según el contexto.',
        type: 'freeText',
        scene: 'Completa el párrafo con la forma verbal correcta.',
        text: 'My friend David loves [[0]] (travel) and plans [[1]] (visit) eight countries this year. He suggested [[2]] (join) him in Colombia for two weeks. I would love to go, but I can\'t afford [[3]] (take) so many days off work. I\'ll keep [[4]] (save) money until I can.',
        blanks: [
          { answer: 'travelling', accepted: ['travelling', 'traveling'], explain: 'love + gerundio: loves travelling.' },
          { answer: 'to visit', accepted: ['to visit'], explain: 'plan + infinitivo: plans to visit.' },
          { answer: 'joining', accepted: ['joining'], explain: 'suggest + gerundio: suggested joining.' },
          { answer: 'to take', accepted: ['to take'], explain: 'afford + infinitivo: can\'t afford to take.' },
          { answer: 'saving', accepted: ['saving'], explain: 'keep + gerundio: keep saving.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando el verbo indicado con gerundio o infinitivo.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina de idiomas',
            prompt: 'Describe algo que disfrutas hacer para practicar inglés (usa enjoy + gerundio).',
            answer: 'I enjoy listening to English podcasts while I commute.',
            accepted: ['enjoy listening', 'enjoy watching', 'enjoy reading', 'enjoy speaking', 'enjoy writing', 'enjoy practising'],
            explain: 'Usa: I enjoy + verbo-ing. Ejemplo: I enjoy watching series in English with subtitles.',
          },
          {
            scene: 'Un plan concreto',
            prompt: 'Menciona algo que has decidido hacer para mejorar tu inglés este año (usa decide + infinitivo).',
            answer: 'I decided to take an IELTS preparation course.',
            accepted: ['decided to take', 'decided to study', 'decided to practise', 'decided to join', 'decided to read', 'decided to watch'],
            explain: 'Usa: I decided to + infinitivo. Ejemplo: I decided to study at least one hour every day.',
          },
          {
            scene: 'Diferencia de significado',
            prompt: 'Escribe dos oraciones con STOP: una con gerundio (dejar de hacer algo) y otra con infinitivo (parar para hacer algo).',
            answer: 'She stopped using her phone at night. / He stopped to buy coffee on his way to work.',
            accepted: ['stopped using', 'stopped talking', 'stopped smoking', 'stopped to buy', 'stopped to check', 'stopped to rest', 'stopped to help'],
            explain: 'Stop + -ing = dejar de hacer algo. Stop + to = parar para hacer otra cosa.',
          },
          {
            scene: 'Consejo útil',
            prompt: 'Da un consejo usando TRY + gerundio (probar algo como solución) para alguien que tiene dificultad para dormir.',
            answer: 'Try drinking chamomile tea before bed.',
            accepted: ['try drinking', 'try reading', 'try listening', 'try avoiding', 'try turning off', 'try meditating'],
            explain: 'Try + -ing = probar algo para ver si funciona como solución.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu experiencia con los idiomas',
        tag: 'Producción libre',
        intro: 'Escribe sobre tu experiencia aprendiendo idiomas usando gerundios e infinitivos.',
        type: 'write',
        items: [
          {
            scene: 'Lo que disfrutas',
            prompt: 'Menciona dos cosas que disfrutas y dos que evitas cuando estudias inglés (enjoy/avoid + gerundio).',
            answer: 'I enjoy watching films in English and reading short stories. I avoid translating every word and memorising long lists.',
            accepted: ['enjoy watching', 'enjoy listening', 'enjoy reading', 'avoid translating', 'avoid memorising', 'avoid looking up every word'],
            explain: 'Usa: I enjoy + -ing / I avoid + -ing. Recuerda: ambos van con gerundio.',
          },
          {
            scene: 'Tus planes',
            prompt: 'Describe dos cosas que planeas o esperas hacer con tu inglés en el futuro (plan/hope + infinitivo).',
            answer: 'I plan to take the IELTS next year. I hope to get a score of 7.0 or higher.',
            accepted: ['plan to take', 'plan to study', 'hope to pass', 'hope to work', 'hope to travel', 'plan to move', 'plan to apply'],
            explain: 'Usa: I plan to + infinitivo / I hope to + infinitivo.',
          },
          {
            scene: 'Un recuerdo de aprendizaje',
            prompt: 'Recuerda algo divertido o difícil que te pasó aprendiendo inglés (usa remember + gerundio para el pasado).',
            answer: 'I remember making a funny mistake in my first English class. I said "I am embarrassed" meaning "I am pregnant"!',
            accepted: ['remember making', 'remember feeling', 'remember struggling', 'remember not understanding', 'remember trying'],
            explain: 'remember + -ing = recordar algo que ya ocurrió en el pasado.',
          },
        ],
      },
    ],
  },
}

export default topic
