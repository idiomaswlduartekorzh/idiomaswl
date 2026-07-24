import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'forma-cortesia-a2',
  order: '15',
  color: '#009246',
  category: 'Gramática',
  level: 'A2',
  title: 'La forma di cortesia en italiano A2: Lei e i pronomi formali',
  shortTitle: 'Forma di cortesia',
  metaTitle: 'Forma de cortesía en italiano A2 — Lei, i pronomi formali e i verbi',
  description:
    'En italiano formal se usa "Lei" (con mayúscula) en lugar de "tu" para dirigirse con respeto a adultos desconocidos, clientes o superiores. Esta forma de cortesía usa los pronombres y verbos de la tercera persona singular, aunque se refiere a la segunda persona.',
  lead: '"Lei" invece di "tu": la forma di cortesia che apre porte in Italia.',
  outcomes: [
    'Usar "Lei" formal en lugar de "tu" en contextos profesionales',
    'Conjugar verbos en tercera persona singular para la forma de cortesía',
    'Usar los pronombres formales corrects (Le, La, La chiamo...)',
    'Distinguir cuándo usar "tu" y cuándo "Lei"',
  ],

  guide: {
    goal: 'Comunicarse con respeto usando la forma di cortesia con Lei en contextos formales.',
    model: 'Lei come si chiama? / Lei è italiano? / Come posso aiutarLa?',
    formula: 'Lei + verbo en 3ª persona singular (mismas formas que lui/lei)',
    decisions: [
      '"Lei" (mayúscula) = forma formal de la 2ª persona singular, equivale a "usted" en español',
      'El verbo va en 3ª persona singular: "Lei mangia" (usted come), "Lei parla" (usted habla)',
      'Pronombre objeto directo formal: La (Lei → La chiamo = la llamo/le llamo)',
      'Pronombre objeto indirecto formal: Le (Lei → Le scrivo = le escribo)',
      '"Voi" sigue siendo el plural formal en muchas regiones; "Loro" es muy formal y raro',
    ],
    table: [
      ['Pronome', 'Uso', 'Esempio'],
      ['Lei (soggetto)', 'Formal 2ª sing.', 'Lei parla italiano?'],
      ['La (oggetto diretto)', 'La llamo / La veo', 'La chiamo domani.'],
      ['Le (oggetto indiretto)', 'Le escribo / Le digo', 'Le scrivo un\'email.'],
      ['Suo/Sua (possessivo)', 'Su (de usted)', 'Qual è il Suo nome?'],
    ],
    mistakes: [
      '"Lei sei italiano?" ❌ → "Lei è italiano?" ✓ — Con "Lei" formal el verbo va en 3ª persona singular.',
      '"La tuo nome?" ❌ → "Il Suo nome?" ✓ — El posesivo formal es "Suo/Sua", no "tuo/tua".',
      '"Gli scrivo" (a ella/formal) ❌ → "Le scrivo" ✓ — El objeto indirecto formal de Lei es "Le", no "gli".',
    ],
  },

  seo: [
    {
      heading: 'De "tu" a "Lei": qué cambia en la frase',
      paragraphs: [
        'La forma de cortesía "Lei" (equivale a "usted") se usa con desconocidos, en contextos profesionales, con clientes y personas de autoridad; con amigos, familia y jóvenes se usa "tu". Lo importante: "Lei" se conjuga SIEMPRE en tercera persona del singular, y arrastra el cambio de los pronombres y posesivos. Compara las dos formas:',
      ],
      table: [
        ['Informal (tu)', 'Formal (Lei)', 'Español'],
        ['Come stai?', 'Come sta?', '¿Cómo está?'],
        ['Come ti chiami?', 'Come si chiama?', '¿Cómo se llama?'],
        ['Ti aiuto.', 'La aiuto.', 'Le ayudo.'],
        ['Ti scrivo.', 'Le scrivo.', 'Le escribo.'],
        ['il tuo nome', 'il Suo nome', 'su nombre'],
      ],
    },
    {
      heading: 'Los pronombres formales: La y Le',
      paragraphs: [
        '"La" es el pronombre de objeto directo formal: "La ringrazio" (Le agradezco). "Le" es el pronombre de objeto indirecto formal: "Le scrivo domani" (Le escribo mañana). El posesivo formal es "Suo/Sua/Suoi/Sue".',
      ],
    },
    {
      heading: '¿Cuándo se usa "Lei" en italiano?',
      paragraphs: [
        'Con personas adultas que no conoces, en el trabajo, con clientes y con figuras de autoridad. Con amigos, familia, niños y gente joven se usa "tu". "Lei" (con mayúscula al escribir) equivale al "usted" español y se conjuga en tercera persona del singular.',
      ],
    },
    {
      heading: '¿Cómo se conjuga la forma de cortesía "Lei"?',
      paragraphs: [
        'Siempre en tercera persona del singular, como "él/ella": "Lei parla italiano?" (¿usted habla italiano?), "Lei è molto gentile" (usted es muy amable). Aunque se dirija a un hombre, el verbo va en tercera persona del singular.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "La" y "Le" formales?',
      paragraphs: [
        '"La" es el objeto directo formal (a usted, sin preposición): "La ringrazio", "La chiamo domani". "Le" es el objeto indirecto formal (a usted, con "a"): "Le scrivo", "Le mando l\'email". El posesivo de cortesía es "Suo/Sua/Suoi/Sue".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Forma di cortesia: Lei + 3ª persona singular en contextos profesionales.',
    graphicPrompt: 'Un cliente en una tienda siendo atendido con formalidad por el dependiente.',
    scene: [
      ['Buongiorno, come posso aiutarLa?', 'Buenos días, ¿cómo puedo ayudarle?'],
      ['Lei come si chiama?', '¿Cómo se llama usted?'],
      ['Da dove viene, signore?', '¿De dónde es usted, señor?'],
      ['Le posso offrire qualcosa?', '¿Le puedo ofrecer algo?'],
      ['Qual è il Suo numero di telefono?', '¿Cuál es su número de teléfono?'],
      ['La ringrazio molto.', 'Le agradezco mucho.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['Lei + 3ª persona', 'La vs Le', 'Suo/Sua'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma formal correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta para la comunicación formal con "Lei".',
        type: 'choice',
        items: [
          {
            scene: 'Recepcionista del hotel preguntando el nombre.',
            lines: [['Recepcionista', 'Lei come ___ chiama?']],
            options: ['si', 'ti', 'vi', 'mi'],
            answer: 'si',
            explain: 'Con "Lei" formal, el reflexivo es "si": "Lei si chiama" (usted se llama).',
          },
          {
            scene: 'En una farmacia, el farmacéutico ofrece ayuda.',
            lines: [['Farmacista', 'Posso aiutar___?']],
            options: ['La', 'ti', 'vi', 'le'],
            answer: 'La',
            explain: '"La" es el objeto directo formal de "Lei": posso aiutarLa (puedo ayudarle).',
          },
          {
            scene: 'Pidiéndole el número a un cliente.',
            lines: [['Impiegato', 'Qual è il ___ numero?']],
            options: ['Suo', 'tuo', 'vostro', 'loro'],
            answer: 'Suo',
            explain: 'El posesivo formal para "Lei" es "Suo/Sua".',
          },
          {
            scene: 'El médico le pregunta al paciente.',
            lines: [['Dottore', 'Come ___ sente oggi?']],
            options: ['si', 'ti', 'vi', 'mi'],
            answer: 'si',
            explain: '"sentirsi" con "Lei": "Lei si sente" = usted se siente.',
          },
          {
            scene: 'Ofreciendo un café formalmente.',
            lines: [['', '___ posso offrire un caffè?']],
            options: ['Le', 'Ti', 'Vi', 'Gli'],
            answer: 'Le',
            explain: '"Le" = objeto indirecto formal: "Le offro" = le ofrezco.',
          },
          {
            scene: 'Preguntando de dónde es una persona formal.',
            lines: [['', 'Di dove ___?']],
            options: ['è', 'sei', 'siete', 'sono'],
            answer: 'è',
            explain: 'Con "Lei" formal: "Lei è" (3ª persona singular de essere).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pronombres y verbos formales',
        tag: '2 espacios',
        intro: 'Completa con el pronombre formal y la forma verbal correcta.',
        type: 'dual',
        items: [
          {
            scene: 'En una tienda, le escribes los datos al cliente.',
            lines: [['', '[[0]] scrivo un\'email. [[1]] chiamo domani.']],
            blanks: [
              { options: ['Le', 'Ti', 'Gli', 'Vi'], answer: 'Le', explain: '"Le scrivo" = objeto indirecto formal.' },
              { options: ['La', 'Ti', 'Vi', 'Gli'], answer: 'La', explain: '"La chiamo" = objeto directo formal.' },
            ],
          },
          {
            scene: 'Un empleado de banco se presenta formalmente.',
            lines: [['', 'Come [[0]] chiama, signora? — Mi chiamo Rossi. E [[1]]?']],
            blanks: [
              { options: ['si', 'ti', 'vi', 'mi'], answer: 'si', explain: '"Lei si chiama" → si (reflexivo formal).' },
              { options: ['Lei', 'tu', 'voi', 'lui'], answer: 'Lei', explain: 'Pregunta formal de devolución: "E Lei?" (¿Y usted?).' },
            ],
          },
          {
            scene: 'Confirmando los datos del cliente.',
            lines: [['', 'Il [[0]] indirizzo è Via Roma 5? — Sì, è [[1]] indirizzo corretto.']],
            blanks: [
              { options: ['Suo', 'tuo', 'vostro', 'mio'], answer: 'Suo', explain: 'Posesivo formal: "il Suo indirizzo".' },
              { options: ['il mio', 'il tuo', 'il Suo', 'il vostro'], answer: 'il mio', explain: 'El cliente responde con "il mio" (el mío).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una conversación formal',
        tag: 'Texto guiado',
        intro: 'Elige las formas correctas en esta conversación en una tienda.',
        type: 'guidedText',
        scene: 'Un cliente entra en una tienda de ropa.',
        text: 'Commesso: Buongiorno! Come posso aiutar[[0]]? Cliente: Buongiorno. Cerco una giacca. Commesso: Che taglia [[1]]? Cliente: Porto una 42. Commesso: [[2]] mostro subito alcune opzioni. Cliente: Grazie. Commesso: Come [[3]] chiama, per la tessera fedeltà? Cliente: Mi chiamo Bianchi.',
        blanks: [
          { options: ['La', 'ti', 'vi', 'gli'], answer: 'La', explain: '"aiutarLa" = ayudarle (objeto directo formal).' },
          { options: ['porta', 'porti', 'portate', 'portano'], answer: 'porta', explain: '"Lei porta" = usted lleva (3ª sing.).' },
          { options: ['Le', 'Ti', 'Vi', 'Gli'], answer: 'Le', explain: '"Le mostro" = le muestro (objeto indirecto).' },
          { options: ['si', 'ti', 'vi', 'mi'], answer: 'si', explain: '"Lei si chiama" → si (reflexivo).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la forma formal',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta para la comunicación formal.',
        type: 'freeText',
        scene: 'En un hotel, el recepcionista habla con una huésped.',
        text: 'Come [[0]] (llamarse, Lei)? / Qual è il [[1]] (posesivo formal) numero di telefono? / [[2]] (objeto indirecto, Lei) confermo la prenotazione. / Come [[3]] (sentirsi, Lei) qui? / Posso aiutar[[4]] (objeto directo, Lei)?',
        blanks: [
          { answer: 'si chiama', explain: '"Lei si chiama" = ¿cómo se llama usted?' },
          { answer: 'Suo', explain: '"Suo" = su (de usted).' },
          { answer: 'Le', explain: '"Le confermo" = le confirmo.' },
          { answer: 'si trova', explain: '"Lei si trova" = ¿cómo se encuentra/está usted?' },
          { answer: 'La', explain: '"aiutarLa" = ayudarle.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Transforma de informal a formal',
        tag: 'Escritura guiada',
        intro: 'Convierte la pregunta informal (con tu) a formal (con Lei).',
        type: 'write',
        items: [
          {
            scene: 'Informal: "Come ti chiami?" → Formal con Lei.',
            prompt: 'Come ti chiami?',
            answer: 'Come si chiama?',
            accepted: ['Come si chiama Lei?', 'Lei come si chiama?'],
            explain: '"ti chiami" → "si chiama" (3ª persona singular con Lei).',
          },
          {
            scene: 'Informal: "Di dove sei?" → Formal con Lei.',
            prompt: 'Di dove sei?',
            answer: 'Di dove è?',
            accepted: ['Lei di dove è?', 'Di dov\'è?'],
            explain: '"sei" → "è" (3ª persona singular).',
          },
          {
            scene: 'Informal: "Ti posso aiutare?" → Formal con Lei.',
            prompt: 'Ti posso aiutare?',
            answer: 'La posso aiutare?',
            accepted: ['Posso aiutarLa?', 'Posso aiutare Lei?'],
            explain: '"ti" (objeto directo informal) → "La" (objeto directo formal).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe diálogos formales',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones formales con Lei para contextos profesionales.',
        type: 'write',
        items: [
          {
            scene: 'Eres recepcionista de un hotel. Saluda y ofrece ayuda al cliente.',
            prompt: 'Escribe dos oraciones formales para recibir a un cliente.',
            answer: 'Buongiorno, benvenuto! Come posso aiutarLa?',
            accepted: [
              'Buona sera! Come si chiama, per favore?',
              'Buongiorno, signore. Come posso aiutarLa oggi?',
            ],
            explain: '"Lei" formal con verbo en 3ª persona y "La" para objeto directo.',
          },
          {
            scene: 'Quieres saber el nombre y el teléfono de un cliente nuevo.',
            prompt: 'Escribe dos preguntas formales para pedir el nombre y el teléfono.',
            answer: 'Come si chiama? Qual è il Suo numero di telefono?',
            accepted: [
              'Può dirmi il Suo nome? E il Suo numero di telefono?',
              'Mi dica il Suo nome. Qual è il Suo numero?',
            ],
            explain: 'Pronombres y posesivos formales: si (reflexivo), Suo/Sua (posesivo).',
          },
        ],
      },
    ],
  },
}

export default topic
