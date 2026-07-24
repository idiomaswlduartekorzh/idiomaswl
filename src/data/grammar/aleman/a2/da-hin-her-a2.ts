import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'da-hin-her-a2',
  order: '19',
  color: '#c9a900',
  category: 'Vocabulario',
  level: 'A2',
  title: 'Adverbios locales y da-Komposita en alemán A2: hin, her y da-',
  shortTitle: 'Hin / Her / Da-Komposita',
  metaTitle: 'Adverbios locales en alemán A2 — hin, her y composiciones con da-',
  description:
    'Los adverbios hin y her indican dirección: hin = alejarse del hablante, her = acercarse al hablante. Los da-Komposita (damit, dafür, darüber...) reemplazan a preposición + pronombre para referirse a cosas o ideas ya mencionadas.',
  lead: 'Hin o her, dafür o davon: el sistema de adverbios direccionales del alemán.',
  outcomes: [
    'Distinguir hin (hacia allá) de her (hacia aquí)',
    'Usar wohin y woher para preguntar por destino y origen',
    'Formar y usar da-Komposita: damit, dafür, davon, darüber, dazu',
    'Reemplazar "con eso", "sobre eso", "para eso" con la forma da- correcta',
  ],

  guide: {
    goal: 'Usar hin/her y los da-Komposita correctamente en contextos de movimiento y referencia.',
    model: 'Wohin gehst du? — Ich gehe dorthin. / Woher kommst du? — Ich komme von dort her. / Das ist gut. Ich bin damit zufrieden.',
    formula: 'hin = movimiento alejándose | her = movimiento acercándose | da- + Präposition = referencia a cosa/idea',
    decisions: [
      'hin: el movimiento va LEJOS del hablante — Geh hin! / Ich fahre dahin.',
      'her: el movimiento VIENE HACIA el hablante — Komm her! / Er kommt hierher.',
      'wohin = ¿adónde? (destino) | woher = ¿de dónde? (origen)',
      'da-Komposita se forman con da- + Präposition: da+mit=damit, da+für=dafür, da+von=davon, da+rüber=darüber, da+zu=dazu',
      'Si la preposición empieza por vocal, se inserta -r-: da+an=daran, da+auf=darauf, da+in=darin, da+über=darüber',
    ],
    table: [
      ['Präposition', 'da-Kompositum', 'Beispiel'],
      ['mit', 'damit', 'Ich bin damit einverstanden.'],
      ['für', 'dafür', 'Ich bin dafür.'],
      ['von', 'davon', 'Ich habe davon gehört.'],
      ['über', 'darüber', 'Wir reden darüber.'],
      ['an', 'daran', 'Ich denke daran.'],
      ['auf', 'darauf', 'Ich warte darauf.'],
    ],
    mistakes: [
      '"Ich bin mit das zufrieden" ❌ → "Ich bin damit zufrieden" ✓ — Para cosas se usa da-Kompositum, no preposición + "das".',
      '"Woher gehst du?" ❌ → "Wohin gehst du?" ✓ — woher pregunta por origen, wohin por destino.',
      '"daüber" ❌ → "darüber" ✓ — Antes de vocal se inserta -r-: da+über = darüber.',
    ],
  },

  seo: [
    {
      heading: 'Hin y her: la dirección del movimiento',
      paragraphs: [
        '"Hin" indica movimiento que se aleja del hablante: "Geh hin!" (¡Ve allá!), "Ich fahre dahin" (voy hacia allá). "Her" indica movimiento que se acerca al hablante: "Komm her!" (¡Ven aquí!), "Er kommt hierher" (viene hacia aquí).',
        '"Wohin gehst du?" (¿Adónde vas?) se usa para preguntar el destino. "Woher kommst du?" (¿De dónde vienes?) para preguntar el origen.',
      ],
    },
    {
      heading: 'Da-Komposita: referencia a cosas con preposición',
      paragraphs: [
        'Cuando necesitas referirte a una cosa o idea ya mencionada usando una preposición, en alemán no puedes decir "con eso" usando simplemente "mit das". En su lugar, usas el da-Kompositum: damit, dafür, davon, darüber, etc.',
        'La regla de la r: si la preposición comienza por vocal (an, auf, in, über, unter...), se añade una r entre da- y la preposición: daran, darauf, darin, darüber, darunter.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Hin/her para dirección; da-Komposita para referencia a cosas.',
    graphicPrompt: 'Dos personas: una se aleja (hin) y otra se acerca (her), con globos de diálogo.',
    scene: [
      ['Wohin gehst du? — Ich gehe dorthin.', '¿Adónde vas? — Voy hacia allá.'],
      ['Komm bitte her!', '¡Ven aquí, por favor!'],
      ['Ich bin damit einverstanden.', 'Estoy de acuerdo con eso.'],
      ['Hast du daran gedacht?', '¿Pensaste en eso?'],
      ['Wir reden darüber morgen.', 'Hablaremos de eso mañana.'],
      ['Ich warte darauf.', 'Estoy esperando eso.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['hin vs her', 'da-Komposita', 'da+r+Vokal'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Hin o her',
        tag: 'Opción múltiple',
        intro: 'Selecciona hin o her según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Tu amigo está lejos y le llamas.',
            lines: [['Tú', 'Komm bitte ___!']],
            options: ['her', 'hin', 'dort', 'wohin'],
            answer: 'her',
            explain: '"her" = movimiento hacia el hablante. ¡Ven (hacia mí)!',
          },
          {
            scene: 'Señalas un lugar lejano y le dices a alguien que vaya.',
            lines: [['Tú', 'Geh bitte ___!']],
            options: ['hin', 'her', 'hier', 'woher'],
            answer: 'hin',
            explain: '"hin" = movimiento alejándose del hablante.',
          },
          {
            scene: 'Preguntando el destino.',
            lines: [['', '___ fährst du?']],
            options: ['Wohin', 'Woher', 'Dort', 'Hier'],
            answer: 'Wohin',
            explain: '"Wohin" pregunta por el destino (¿adónde?).',
          },
          {
            scene: 'Preguntando la procedencia.',
            lines: [['', '___ kommst du?']],
            options: ['Woher', 'Wohin', 'Daher', 'Dahin'],
            answer: 'Woher',
            explain: '"Woher" pregunta por el origen (¿de dónde?).',
          },
          {
            scene: 'Describiendo que alguien viene hacia ti.',
            lines: [['', 'Er läuft ___. Er kommt zu mir.']],
            options: ['hierher', 'dorthin', 'wohin', 'hin'],
            answer: 'hierher',
            explain: '"hierher" = hacia aquí, hacia el hablante.',
          },
          {
            scene: 'Enviando a alguien a otro lugar.',
            lines: [['', 'Ich fahre ___. Ich gehe weg von hier.']],
            options: ['dorthin', 'hierher', 'woher', 'daher'],
            answer: 'dorthin',
            explain: '"dorthin" = hacia allá, alejándose del hablante.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Forma el da-Kompositum correcto',
        tag: '2 espacios',
        intro: 'Elige el da-Kompositum apropiado o sus partes.',
        type: 'dual',
        items: [
          {
            scene: 'Respondiendo sobre un tema del que ya se habló.',
            lines: [['', 'Wir sprachen gestern [[0]] und ich denke noch [[1]].']],
            blanks: [
              { options: ['darüber', 'dafür', 'damit', 'davon'], answer: 'darüber', explain: '"über" + cosa = darüber (über + r + über).' },
              { options: ['daran', 'darüber', 'damit', 'dafür'], answer: 'daran', explain: '"an" + cosa = daran (an empieza por vocal → dar+an).' },
            ],
          },
          {
            scene: 'Sobre un proyecto nuevo.',
            lines: [['', 'Das neue Projekt ist gut. Ich bin [[0]] einverstanden und freue mich [[1]].']],
            blanks: [
              { options: ['damit', 'dafür', 'davon', 'daran'], answer: 'damit', explain: '"mit etwas einverstanden" → damit.' },
              { options: ['darauf', 'dafür', 'davon', 'dazu'], answer: 'darauf', explain: '"sich freuen auf etwas" → darauf.' },
            ],
          },
          {
            scene: 'Sobre una noticia escuchada.',
            lines: [['', 'Ich habe [[0]] gehört. Was denkst du [[1]]?']],
            blanks: [
              { options: ['davon', 'dafür', 'damit', 'daran'], answer: 'davon', explain: '"hören von etwas" → davon.' },
              { options: ['darüber', 'damit', 'dafür', 'davon'], answer: 'darüber', explain: '"denken über etwas" → darüber.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Hin, her y da-Komposita en texto',
        tag: 'Texto guiado',
        intro: 'Elige la opción correcta en cada espacio.',
        type: 'guidedText',
        scene: 'Conversación sobre un viaje y planes.',
        text: '— [[0]] fährst du nächste Woche? — Ich fahre nach Berlin. — [[1]] kennst du jemanden? — Ja, ich habe [[2]] gehört, dass Berlin toll ist. Ich freue mich [[3]]! — Komm mal [[4]], bevor du reist.',
        blanks: [
          { options: ['Wohin', 'Woher', 'Dorthin', 'Hierher'], answer: 'Wohin', explain: '"Wohin" pregunta por el destino.' },
          { options: ['Woher', 'Wohin', 'Davon', 'Daran'], answer: 'Woher', explain: '"Woher" pregunta de dónde conoces a alguien.' },
          { options: ['davon', 'dafür', 'damit', 'daran'], answer: 'davon', explain: '"hören von etwas" → davon.' },
          { options: ['darauf', 'dafür', 'damit', 'daran'], answer: 'darauf', explain: '"sich freuen auf" → darauf.' },
          { options: ['her', 'hin', 'daher', 'dahin'], answer: 'her', explain: '"Komm her" = ven hacia mí.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el da-Kompositum',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el da-Kompositum correcto para cada preposición.',
        type: 'freeText',
        scene: 'Respondiendo preguntas sobre ideas mencionadas.',
        text: 'Ich denke [[0]] (an das). / Ich bin [[1]] (mit dem) einverstanden. / Hast du [[2]] (von dem) gehört? / Wir warten [[3]] (auf das). / Er redet [[4]] (über das) nicht.',
        blanks: [
          { answer: 'daran', explain: 'an + vocal → daran.' },
          { answer: 'damit', explain: 'mit → damit.' },
          { answer: 'davon', explain: 'von → davon.' },
          { answer: 'darauf', explain: 'auf + vocal → darauf.' },
          { answer: 'darüber', explain: 'über + vocal → darüber.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Completa con hin, her o da-Kompositum',
        tag: 'Escritura guiada',
        intro: 'Escribe la palabra correcta para completar la oración.',
        type: 'write',
        items: [
          {
            scene: 'Quieres que tu amigo venga hacia ti. ¿Qué dices?',
            prompt: 'Komm bitte ___!',
            answer: 'Komm bitte her!',
            accepted: ['Komm her!'],
            explain: '"her" porque el movimiento es hacia el hablante.',
          },
          {
            scene: 'Alguien habla de sus vacaciones. Dices que has oído cosas buenas (de eso).',
            prompt: 'Ich habe viel Gutes ___ gehört. (von den Ferien)',
            answer: 'Ich habe viel Gutes davon gehört.',
            accepted: ['davon gehört'],
            explain: '"hören von + cosa" → davon.',
          },
          {
            scene: 'Tu jefe propone un plan nuevo. Dices que estás de acuerdo (con eso).',
            prompt: 'Ich bin ___ einverstanden. (mit dem Plan)',
            answer: 'Ich bin damit einverstanden.',
            accepted: ['damit einverstanden'],
            explain: '"einverstanden mit + cosa" → damit.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe libremente con hin/her y da-Komposita',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales usando hin/her o da-Komposita.',
        type: 'write',
        items: [
          {
            scene: 'Escribe una pregunta y respuesta con wohin/woher.',
            prompt: 'Crea un mini-diálogo con wohin o woher.',
            answer: 'Wohin gehst du? — Ich gehe dorthin, in die Stadt.',
            accepted: [
              'Woher kommst du? — Ich komme aus Kolumbien.',
              'Wohin fährt der Zug? — Er fährt nach Hamburg.',
            ],
            explain: '"Wohin" para destino, "Woher" para origen. Respuesta con hin/her o con una dirección.',
          },
          {
            scene: 'Refiere una cosa mencionada usando un da-Kompositum.',
            prompt: 'Escribe una oración con damit, dafür, darüber, daran o davon.',
            answer: 'Das ist ein guter Plan. Ich bin dafür!',
            accepted: [
              'Wir reden morgen darüber.',
              'Ich habe davon nichts gewusst.',
              'Ich denke oft daran.',
            ],
            explain: 'da-Komposita reemplazan preposición + pronombre para cosas.',
          },
        ],
      },
    ],
  },
}

export default topic
