import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'preposicoes-b1',
  order: '20',
  color: '#166534',
  category: 'Estructura gramatical',
  level: 'B1',
  title: 'Preposiciones en Portugués B1',
  shortTitle: 'Preposiciones',
  metaTitle: 'Preposiciones Portugués B1 — Usos de A, EM, DE, PARA, COM, POR',
  description:
    'Las preposiciones son palabras invariables que relacionan elementos en la oración. Las principales en portugués son: a (movimiento), em (ubicación), de (posesión/origen), para (destino/propósito), com (compañía/modo), por (causa/agente/frecuencia). Las regencias de preposiciones difieren frecuentemente del español. Fundamental para precisión y naturalidad.',
  lead: 'Domina preposiciones: a, em, de, para, com, por. Diferencias con español y usos idiomáticos.',
  outcomes: [
    'Distingue usos de "a" (movimiento) vs "em" (ubicación)',
    'Usa "de" para posesión, origen, composición',
    'Diferencia "para" (destino/propósito) de "por" (causa/agente)',
    'Reconoce contracciones y usos idiomáticos de preposiciones',
  ],

  guide: {
    goal: 'Usar preposiciones correctamente para expresar relaciones espaciales, temporales y abstractas.',
    model: 'Vou a Brasil. / Estou em casa. / O livro de Paulo. / Trabalho para uma empresa. / Ele saiu com amigos. / O livro foi escrito por Machado.',
    formula: 'Preposiciones principales: A (destino/movimiento) | EM (ubicación/momento) | DE (origen/posesión) | PARA (propósito/destino) | COM (compañía/modo) | POR (causa/agente/frecuencia)',
    decisions: [
      'A: movimiento/destino ("Vou a Brasil"), pero no tiempo ("Às 3 horas", con artículo)',
      'EM: ubicación ("Estou em casa"), momento ("Em julho"), en = dentro',
      'DE: origen ("Soy de Brasil"), posesión ("El libro de Paulo"), composición ("Casa de madeira")',
      'PARA: propósito ("Estudio para ser profesor"), destino futuro ("Viajo para Brasil mañana")',
      'COM: compañía ("Voy con amigos"), modo ("Habla con paciencia")',
      'POR: causa ("Lloré por alegría"), agente pasivo ("Escrito por Machado"), aproximación ("Por 100 reales")',
      'Contracciones: ao (a+o), à (a+a), do (de+o), da (de+a), no (em+o), na (em+a), pelo (por+o), pela (por+a)',
    ],
    table: [
      ['Preposición', 'Uso principal', 'Ejemplo (traducción)'],
      ['A', 'Movimiento/destino', 'Vou a Brasil (Voy a Brasil)'],
      ['EM', 'Ubicación/momento', 'Estou em casa (Estoy en casa)'],
      ['DE', 'Origen/posesión', 'Sou de Brasil (Soy de Brasil)'],
      ['PARA', 'Propósito/destino', 'Estudo para ser professor (Estudio para ser profesor)'],
      ['COM', 'Compañía/modo', 'Vou com você (Voy contigo)'],
      ['POR', 'Causa/agente', 'Escrito por Machado (Escrito por Machado)'],
    ],
    mistakes: [
      '"Vou em Brasil" ❌ (ubicación, pero con movimiento) → "Vou a Brasil" ✓ (movimiento).',
      '"Para em casa" ❌ (ubicación con "para") → "Em casa" ✓ (ubicación con "em").',
      '"Por" vs "para": "Estudo por prazer" (Estudio por placer = causa) vs "Estudo para aprender" (Estudio para aprender = propósito).',
    ],
  },

  seo: [
    {
      heading: '¿Qué son las preposiciones y cuál es su función?',
      paragraphs: [
        'Las preposiciones son palabras invariables que conectan elementos en una oración, estableciendo relaciones espaciales, temporales, de posesión, o abstractas. En portugués, las preposiciones son fundamentales para la corrección gramatical y la naturalidad del discurso.',
        'Las seis preposiciones principales en portugués son: A, EM, DE, PARA, COM, POR. Cada una tiene usos específicos que a menudo difieren del español, lo que causa confusión para hispanohablantes.',
      ],
    },
    {
      heading: '¿Cuándo se usa la preposición "a" en portugués?',
      paragraphs: [
        '"A" se usa para expresar movimiento hacia un destino: "Vou a Portugal" (Voy a Portugal), "Viajo a São Paulo" (Viajo a São Paulo). También para dar la hora: "Às 3 horas" (A las 3 horas, contracción ao).',
        'Diferencia crucial: "A" para destino (Vou a casa = Voy a casa) vs "EM" para ubicación (Estou em casa = Estoy en casa). Movimiento requiere "a"; ubicación requiere "em".',
      ],
    },
    {
      heading: 'Preposición EM: ubicación y momento temporal',
      paragraphs: [
        '"EM" se usa para expresar dónde algo/alguien se encuentra: "Estou em casa" (Estoy en casa), "O livro está em cima da mesa" (El libro está sobre la mesa). También para expresar cuándo: "Em 2025", "Em julho", "Em uma hora".',
        '"EM" también se usa con medios de transporte: "Vou em carro" (Voy en auto), "Viajo em trem" (Viajo en tren). Equivale a "en" en español en la mayoría de los casos.',
      ],
    },
    {
      heading: 'Preposición DE: origen, posesión y composición',
      paragraphs: [
        '"DE" expresa origen: "Sou de Brasil" (Soy de Brasil), "Este vinho é da Argentina" (Este vino es de Argentina). Posesión: "O livro de Paulo" (El libro de Paulo), "A casa de meu amigo" (La casa de mi amigo). Composición: "Uma casa de madeira" (Una casa de madera).',
        'También se usa después de ciertos verbos y adjetivos: "Tenho medo de cobra" (Le tengo miedo a las serpientes), "Preciso de ajuda" (Necesito ayuda), "Estou cheio de ideias" (Estoy lleno de ideas).',
      ],
    },
    {
      heading: 'Preposición PARA: propósito y destino futuro',
      paragraphs: [
        '"PARA" expresa propósito o intención: "Estudo para ser professor" (Estudio para ser profesor), "Trabalho para ganhar dinheiro" (Trabajo para ganar dinero). También destino futuro o intencionado: "Viajo para Brasil amanhã" (Viajo a Brasil mañana).',
        'Diferencia con "por": "Por" expresa causa (resultado de); "para" expresa propósito (intención hacia). "Estudo por prazer" (Estudio porque me gusta, causa) vs "Estudo para aprender" (Estudio con el objetivo de aprender, propósito).',
      ],
    },
    {
      heading: 'Preposición COM: compañía y modo',
      paragraphs: [
        '"COM" expresa compañía: "Vou com você" (Voy contigo), "Eles trabalham com os colegas" (Ellos trabajan con los colegas). Modo o manera: "Ela fala com paciência" (Habla con paciencia), "Comemos com prazer" (Comemos con placer).',
        'Contracción: "comigo" (con + mí), "contigo" (con + ti), "consigo" (con + sí). Ejemplos: "Vem comigo" (Ven conmigo), "Ele fala consigo mesmo" (Habla consigo mismo).',
      ],
    },
    {
      heading: '¿Cuándo se usa la preposición "por" en portugués?',
      paragraphs: [
        '"POR" expresa causa: "Chorrei por alegria" (Lloré de alegría), "Parou por cansaço" (Paró por cansancio). Agente en voz pasiva: "O livro foi escrito por Machado" (El libro fue escrito por Machado). Aproximación: "Custa por 100 reais" (Cuesta alrededor de 100 reales).',
        'También frecuencia: "Viajo por avião" (Viajo en avión, literalmente "por medio de avión"), "Saio por ali" (Salgo por ahí, dirección/camino).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Preposiciones: A (movimiento), EM (ubicación), DE (origen), PARA (propósito), COM (compañía), POR (causa).',
    graphicPrompt: 'Tabla de preposiciones con ejemplos de uso y contracciones comunes.',
    scene: [
      ['Vou a Brasil em julho.', 'Voy a Brasil en julio.'],
      ['Estou em casa agora.', 'Estoy en casa ahora.'],
      ['O livro de Paulo está em cima da mesa.', 'El libro de Paulo está sobre la mesa.'],
      ['Trabalho para uma empresa grande.', 'Trabajo para una empresa grande.'],
      ['Ela saiu com seus amigos.', 'Ella salió con sus amigas.'],
      ['O poema foi escrito por Fernando Pessoa.', 'El poema fue escrito por Fernando Pessoa.'],
      ['Você precisa de ajuda?', '¿Necesitas ayuda?'],
      ['Vou a pé; você vai em carro.', 'Voy a pie; tú vas en auto.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['a vs em', 'para vs por', 'de', 'con', 'contracciones'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Selecciona la preposición correcta',
        tag: 'Múltipla escolha',
        intro: 'Completa con la preposición apropiada.',
        type: 'choice',
        items: [
          {
            scene: 'A: movimiento',
            lines: [['', 'Vou ___ Brasil.']],
            options: ['em', 'a', 'de', 'para'],
            answer: 'a',
            explain: 'Movimiento: Vou a Brasil.',
          },
          {
            scene: 'EM: ubicación',
            lines: [['', 'Estou ___ casa.']],
            options: ['a', 'em', 'de', 'para'],
            answer: 'em',
            explain: 'Ubicación: Estou em casa.',
          },
          {
            scene: 'DE: origen/posesión',
            lines: [['', 'Sou ___ Brasil.']],
            options: ['a', 'em', 'de', 'para'],
            answer: 'de',
            explain: 'Origen: Sou de Brasil.',
          },
          {
            scene: 'PARA: propósito',
            lines: [['', 'Estudo ___ ser professor.']],
            options: ['por', 'em', 'de', 'para'],
            answer: 'para',
            explain: 'Propósito: Estudo para ser professor.',
          },
          {
            scene: 'COM: compañía',
            lines: [['', 'Vou ___ você.']],
            options: ['a', 'em', 'de', 'com'],
            answer: 'com',
            explain: 'Compañía: Vou com você.',
          },
          {
            scene: 'POR: causa',
            lines: [['', 'Chorrei ___ alegria.']],
            options: ['por', 'para', 'de', 'em'],
            answer: 'por',
            explain: 'Causa: Chorrei por alegria.',
          },
          {
            scene: 'Contracción: ao',
            lines: [['', 'Cheguei ___ aeroporto.']],
            options: ['a o', 'ao', 'em o', 'no'],
            answer: 'ao',
            explain: 'Contracción a+o: ao.',
          },
          {
            scene: 'Contracción: no',
            lines: [['', 'O livro está ___ quarto.']],
            options: ['em o', 'no', 'a o', 'ao'],
            answer: 'no',
            explain: 'Contracción em+o: no.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Preposiciones en contexto',
        tag: '2 decisiones',
        intro: 'Completa frases con dos preposiciones diferentes.',
        type: 'dual',
        items: [
          {
            scene: 'A vs EM',
            lines: [['', "Vou [[0]] Brasil e fico [[1]] São Paulo."]],
            blanks: [
              { options: ['a', 'em', 'de'], answer: 'a', explain: 'Movimiento: Vou a Brasil.' },
              { options: ['a', 'em', 'de'], answer: 'em', explain: 'Ubicación: fico em São Paulo.' },
            ],
          },
          {
            scene: 'PARA vs POR',
            lines: [['', "Trabalho [[0]] ganhar dinheiro. Mas estudo [[1]] prazer."]],
            blanks: [
              { options: ['por', 'para', 'de'], answer: 'para', explain: 'Propósito: Trabalho para ganhar.' },
              { options: ['por', 'para', 'de'], answer: 'por', explain: 'Causa: Estudo por prazer.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Narrativa con preposiciones',
        tag: 'Texto guiado',
        intro: 'Completa una narrativa con preposiciones.',
        type: 'guidedText',
        scene: 'Historia de viaje y ubicación.',
        text: 'Vou [[0]] Brasil em julho. Fico [[1]] São Paulo [[2]] três semanas. Vou [[3]] meu amigo Paulo e viajo [[4]] ele. O hotel está [[5]] centro da cidade. Vou [[6]] avião e volto [[7]] ônibus. Trabalho [[8]] uma empresa [[9]] lá.',
        blanks: [
          { options: ['a', 'em', 'de'], answer: 'a', explain: 'A: movimiento.' },
          { options: ['a', 'em', 'de'], answer: 'em', explain: 'EM: ubicación.' },
          { options: ['por', 'para', 'de'], answer: 'por', explain: 'POR: tiempo/duración.' },
          { options: ['a', 'em', 'de'], answer: 'a', explain: 'A: movimiento.' },
          { options: ['com', 'para', 'de'], answer: 'com', explain: 'COM: compañía.' },
          { options: ['a', 'em', 'de'], answer: 'em', explain: 'EM: ubicación.' },
          { options: ['em', 'a', 'de'], answer: 'em', explain: 'EM: medio de transporte.' },
          { options: ['em', 'a', 'de'], answer: 'em', explain: 'EM: medio de transporte.' },
          { options: ['a', 'em', 'para'], answer: 'para', explain: 'PARA: destino/propósito.' },
          { options: ['a', 'em', 'de'], answer: 'de', explain: 'DE: ubicación/origen de empresa.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escritura con preposiciones',
        tag: 'Texto libre',
        intro: 'Escribe sobre tus planes con múltiples preposiciones.',
        type: 'freeText',
        scene: 'Descripción personal de viajes y trabajo.',
        text: '1. [[0]] (Voy a Portugal). 2. [[1]] (Trabajo para aprender). 3. [[2]] (Con mis amigos). 4. [[3]] (De vacaciones).',
        blanks: [
          { answer: 'Vou a Portugal', accepted: ['Vou a Portugal'], explain: 'A: movimiento.' },
          { answer: 'Trabalho para aprender', accepted: ['para', 'aprender'], explain: 'PARA: propósito.' },
          { answer: 'Com meus amigos', accepted: ['Com'], explain: 'COM: compañía.' },
          { answer: 'De férias', accepted: ['De'], explain: 'DE: posesión/tipo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción de narración',
        tag: 'Producción',
        intro: 'Escribe un párrafo usando 4+ preposiciones diferentes.',
        type: 'write',
        items: [
          {
            scene: 'Descripción de viaje',
            prompt: 'Escribe sobre un viaje que hiciste: a dónde fuiste, con quién, en qué medio, dónde te quedaste, para qué (propósito).',
            answer: 'Fui a Brasil com meus amigos em avião. Fiquei em um hotel no Rio de Janeiro por duas semanas. Viajei para conhecer a cultura.',
            accepted: ['a', 'com', 'em', 'para', 'de', 'preposições'],
            explain: 'Múltiples preposiciones en contexto narrativo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de diferencias A vs EM',
        tag: 'Análise',
        intro: 'Explica la diferencia fundamental entre "a" y "em".',
        type: 'write',
        items: [
          {
            scene: 'Conceptualización',
            prompt: '¿Por qué "Vou a casa" (Voy a casa) pero "Estou em casa" (Estoy en casa)? Explica la diferencia.',
            answer: '"A" indica movimiento/destino; "em" indica ubicación/permanencia. "Vou a" = tengo intención de ir hacia. "Estou em" = ya me encuentro en ese lugar. Diferencia de movimiento vs reposo.',
            accepted: ['movimiento', 'ubicación', 'destino', 'permanencia'],
            explain: 'Diferencia conceptual: "a" para destino, "em" para estado.',
          },
        ],
      },
    ],
  },
}

export default topic
