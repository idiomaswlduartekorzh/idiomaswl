import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'regencia-verbal-b1',
  order: '18',
  color: '#166534',
  category: 'Estructura gramatical',
  level: 'B1',
  title: 'Regencia Verbal en Portugués B1',
  shortTitle: 'Regencia Verbal',
  metaTitle: 'Regencia Verbal Portugués B1 — Verbos con Preposiciones Correctas',
  description:
    'La regencia verbal es la relación que existe entre un verbo y la preposición que lo acompaña. Cada verbo requiere una preposición específica (o ninguna). Por ejemplo: "ir a", "pensar en", "consistir en", "contar con". En portugués hay muchos verbos regidos y sus regencias son diferentes al español, lo que causa errores frecuentes. Es fundamental para sonar natural.',
  lead: 'Domina regencias verbales: verbos + preposición correcta, diferencias con el español.',
  outcomes: [
    'Identifica la preposición correcta para cada verbo',
    'Usa construcciones verbales regidas comúnmente (ir a, llegar a, consistir en)',
    'Distingue diferencias de regencia entre portugués y español',
    'Evita errores por transferencia del español a portugués',
  ],

  guide: {
    goal: 'Usar la preposición correcta con cada verbo para hablar con precisión.',
    model: 'Vou a Portugal. / Penso em você. / Consigo em trabalhar. / Lembrome de você. / Acredito em você.',
    formula: 'Verbo + preposição específica | Verbos transitivos directos (sin prep.) vs regidos (con prep.) | Preposiciones comunes: a, de, em, por, com, para',
    decisions: [
      'Ir a (ir a): "Vou a Brasil" (voy a Brasil)',
      'Llegar a (chegar a): "Cheguei a São Paulo" (llegué a São Paulo)',
      'Pensar en (pensar em): "Penso em você" (pienso en ti)',
      'Acordarse de (lembrar-se de): "Lembro-me de você" (me acuerdo de ti)',
      'Creer en (acreditar em): "Acredito em você" (creo en ti)',
      'Consistir en (consistir em): "Isso consiste em estudar" (consiste en estudiar)',
      'Contar con (contar com): "Conto com você" (cuento contigo)',
      'Insistir en (insistir em): "Insisto em ajudar" (insisto en ayudar)',
    ],
    table: [
      ['Verbo', 'Regencia en PT', 'Ejemplo (traducción)'],
      ['Ir', '+ a', 'Vou a Portugal (Voy a Portugal)'],
      ['Llegar', '+ a', 'Cheguei a casa (Llegué a casa)'],
      ['Pensar', '+ em', 'Penso em você (Pienso en ti)'],
      ['Acordarse', '+ de', 'Lembro-me de você (Me acuerdo de ti)'],
      ['Creer', '+ em', 'Acredito em Deus (Creo en Dios)'],
      ['Consistir', '+ em', 'Consiste em ajudar (Consiste en ayudar)'],
    ],
    mistakes: [
      '"Vou en Brasil" ❌ (preposición del español) → "Vou a Brasil" ✓ (preposición correcta en portugués).',
      '"Penso de você" ❌ (preposición incorrecta) → "Penso em você" ✓.',
      '"Lembro você" ❌ (sin preposición) → "Lembro-me de você" ✓ (reflexivo + preposición).',
      '"Acredito você" ❌ (directo sin preposición) → "Acredito em você" ✓ (con preposición).',
    ],
  },

  seo: [
    {
      heading: '¿Qué es la regencia verbal?',
      paragraphs: [
        'La regencia verbal es la relación obligatoria entre un verbo y la preposición (o falta de ella) que lo acompaña. Algunos verbos requieren una preposición específica; otros no necesitan ninguna. Esta es una característica muy idiosincrásica: cada idioma tiene sus propias regencias.',
        'En portugués, las regencias son diferentes al español en muchos casos, lo que causa errores frecuentes para hispanohablantes. Es uno de los aspectos más importantes de la precisión lingüística en CELPE-Bras.',
      ],
    },
    {
      heading: '¿Qué preposición rige cada verbo en portugués?',
      paragraphs: [
        'La preposición depende del verbo y hay que aprenderla con él, porque no siempre coincide con el español. Esta tabla reúne las regencias más frecuentes del B1:',
      ],
      table: [
        ['Verbo (PT)', 'Preposición', 'Ejemplo'],
        ['ir / chegar', 'a', 'Vou a Portugal.'],
        ['pensar / acreditar / confiar', 'em', 'Penso em você.'],
        ['lembrar-se / esquecer-se / gostar', 'de', 'Lembro-me de você.'],
        ['contar / sonhar / preocupar-se', 'com', 'Conto com você.'],
        ['consistir / insistir', 'em', 'Consiste em ajudar.'],
        ['depender / precisar / necessitar', 'de', 'Preciso de ajuda.'],
      ],
    },
    {
      heading: '¿Qué verbos de movimiento rigen la preposición "a"?',
      paragraphs: [
        'Verbos como ir, chegar, dirigir-se, regressar se rigen con "a" para marcar destino: "Vou a Portugal", "Cheguei a casa", "Dirijo-me a você". La trampa está en que el español a veces usa "en" con verbos de movimiento coloquiales ("me voy en el coche"), pero el portugués reserva "em" solo para la ubicación, no para el destino: "Vou a Brasil" (destino) frente a "Estou no Brasil" (ubicación). Con medios de transporte se usa "de": "Vou de carro/de avião".',
      ],
    },
    {
      heading: 'Verbos de pensamiento y emoción: regencias con "em"',
      paragraphs: [
        'Verbos como pensar, creer, confiar, insistir, se rigen con "em": "Penso em você" (Pienso en ti), "Acredito em você" (Creo en ti), "Confio em você" (Confío en ti).',
        'En español usamos "en" ("pienso en ti"); en portugués también es "em", lo que facilita la memorización. Pero atención: "acreditar" en portugués es creer/confiar, no "acreditar" como dar crédito.',
      ],
    },
    {
      heading: 'Verbos de recordación: regencias con "de"',
      paragraphs: [
        'Verbos como acordarse, recordar, olvidar se rigen con "de": "Lembro-me de você" (Me acuerdo de ti), "Esqueci de trazer os documentos" (Olvide traer los documentos).',
        'El verbo "lembrar" es reflexivo (lembrar-se) + preposición "de". "Esquecer" puede ser reflexivo (esquecer-se de) o no reflexivo pero siempre con preposición: "Esqueci de você" (Me olvide de ti).',
      ],
    },
    {
      heading: 'Verbos de depedencia y confianza: "com", "em", "a"',
      paragraphs: [
        'Contar con: "Conto com você" (Cuento contigo) — preposición "com". Depender de: "Dependo de você" (Dependo de ti) — preposición "de". Consistir en: "Consiste em ajudar" (Consiste en ayudar) — preposición "em".',
        'Estas regencias no siempre coinciden con el español: "contar con" (pt) vs "contar en" (es); "confiar en" (es) vs "confiar em" (pt). Memorización por lista es muy efectiva.',
      ],
    },
    {
      heading: '¿Qué regencias verbales cambian entre portugués y español?',
      paragraphs: [
        'Diferencias críticas: Ansiar por (pt: ansiar por) vs esperar por algo (pt: esperar por, aunque "esperar a" es también común). Enterarse de (pt: saber de, inteirar-se de). Tratar de/sobre (pt: tratar de, falar de).',
        'Otros errores comunes: "Necessito de ajuda" (Necesito ayuda, portugués usa "necessitar de"); "Aspiro a" (Aspiro a, portugués usa "aspirar a" o "aspirar por"). La inmersión en textos auténticos es la mejor forma de internalizar regencias.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Regencia verbal: verbos + preposición correcta, diferencias con español.',
    graphicPrompt: 'Tabla: verbos frecuentes con sus regencias en portugués y comparación con español.',
    scene: [
      ['Vou a Portugal.', 'Voy a Portugal.'],
      ['Penso em você todos os dias.', 'Pienso en ti todos los días.'],
      ['Lembro-me de você com saudade.', 'Me acuerdo de ti con nostalgia.'],
      ['Acredito em você.', 'Creo en ti.'],
      ['Confio em meu amigo.', 'Confío en mi amigo.'],
      ['Conto com sua ajuda.', 'Cuento con tu ayuda.'],
      ['Consigo em trabalhar duro.', 'Consigo en trabajar duro.'],
      ['Insisto em aprender português.', 'Insisto en aprender portugués.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['regencias comunes', 'preposición correcta', 'diferencias con español'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Selecciona la preposición correcta',
        tag: 'Múltipla escolha',
        intro: 'Completa con la preposición correcta según la regencia.',
        type: 'choice',
        items: [
          {
            scene: 'Movimiento: ir a',
            lines: [['', 'Vou ___ Brasil em julho.']],
            options: ['em', 'a', 'de', 'para'],
            answer: 'a',
            explain: 'Ir + a: Vou a Brasil.',
          },
          {
            scene: 'Pensamiento: pensar em',
            lines: [['', 'Penso ___ você sempre.']],
            options: ['em', 'a', 'de', 'por'],
            answer: 'em',
            explain: 'Pensar + em: Penso em você.',
          },
          {
            scene: 'Recordación: lembrar-se de',
            lines: [['', 'Lembro-me ___ você com alegria.']],
            options: ['em', 'a', 'de', 'por'],
            answer: 'de',
            explain: 'Lembrar-se + de: Lembro-me de você.',
          },
          {
            scene: 'Creencia: acreditar em',
            lines: [['', 'Acredito ___ você completamente.']],
            options: ['em', 'a', 'de', 'para'],
            answer: 'em',
            explain: 'Acreditar + em: Acredito em você.',
          },
          {
            scene: 'Confianza: confiar em',
            lines: [['', 'Confio ___ meu amigo.']],
            options: ['de', 'a', 'em', 'por'],
            answer: 'em',
            explain: 'Confiar + em: Confio em meu amigo.',
          },
          {
            scene: 'Dependencia: contar com',
            lines: [['', 'Conto ___ sua ajuda.']],
            options: ['em', 'a', 'de', 'com'],
            answer: 'com',
            explain: 'Contar + com: Conto com você.',
          },
          {
            scene: 'Composición: consistir em',
            lines: [['', 'O sucesso consiste ___ trabalhar duro.']],
            options: ['em', 'a', 'de', 'por'],
            answer: 'em',
            explain: 'Consistir + em: Consiste em trabalhar.',
          },
          {
            scene: 'Insistencia: insistir em',
            lines: [['', 'Insisto ___ aprender bem.']],
            options: ['de', 'a', 'em', 'com'],
            answer: 'em',
            explain: 'Insistir + em: Insisto em aprender.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Regencias en contexto',
        tag: '2 decisiones',
        intro: 'Completa con dos regencias verbales diferentes.',
        type: 'dual',
        items: [
          {
            scene: 'Movimiento y pensamiento',
            lines: [['', "Vou [[0]] Brasil e penso [[1]] você."]],
            blanks: [
              { options: ['em', 'a', 'de'], answer: 'a', explain: 'Ir + a: Vou a Brasil.' },
              { options: ['em', 'a', 'de'], answer: 'em', explain: 'Pensar + em: Penso em você.' },
            ],
          },
          {
            scene: 'Recordación y confianza',
            lines: [['', "Lembro-me [[0]] você e confio [[1]] você."]],
            blanks: [
              { options: ['em', 'a', 'de'], answer: 'de', explain: 'Lembrar-se + de: Lembro-me de você.' },
              { options: ['em', 'a', 'com'], answer: 'em', explain: 'Confiar + em: Confio em você.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Párrafo con múltiples regencias',
        tag: 'Texto guiado',
        intro: 'Completa un párrafo con regencias verbales.',
        type: 'guidedText',
        scene: 'Expresión de sentimientos y planes.',
        text: 'Penso [[0]] você todos os dias. Lembro-me [[1]] nossos momentos juntos. Confio [[2]] você completamente. Acredito [[3]] nosso futuro. Vou [[4]] Brasil e conto [[5]] sua companhia.',
        blanks: [
          { options: ['em', 'a', 'de'], answer: 'em', explain: 'Pensar + em.' },
          { options: ['em', 'a', 'de'], answer: 'de', explain: 'Lembrar-se + de.' },
          { options: ['de', 'em', 'a'], answer: 'em', explain: 'Confiar + em.' },
          { options: ['de', 'em', 'a'], answer: 'em', explain: 'Acreditar + em.' },
          { options: ['em', 'a', 'de'], answer: 'a', explain: 'Ir + a.' },
          { options: ['de', 'em', 'com'], answer: 'com', explain: 'Contar + com.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escritura con regencias',
        tag: 'Texto libre',
        intro: 'Escribe frases con verbos regidos.',
        type: 'freeText',
        scene: 'Expresiones de planes y sentimientos.',
        text: '1. [[0]] (Voy a Brasil). 2. [[1]] (Pienso en ti). 3. [[2]] (Me acuerdo de ti). 4. [[3]] (Creo en el futuro).',
        blanks: [
          { answer: 'Vou a Brasil', accepted: ['Vou a Brasil', 'Vou a Brasil'], explain: 'Ir + a.' },
          { answer: 'Penso em você', accepted: ['Penso em você'], explain: 'Pensar + em.' },
          { answer: 'Lembro-me de você', accepted: ['Lembro-me de você'], explain: 'Lembrar-se + de.' },
          { answer: 'Acredito no futuro', accepted: ['Acredito no futuro', 'Acredito em'], explain: 'Acreditar + em.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción de declaraciones',
        tag: 'Producción',
        intro: 'Escribe sobre alguien usando 3+ verbos regidos.',
        type: 'write',
        items: [
          {
            scene: 'Descripción relacional',
            prompt: 'Escribe sobre una persona: contar con ella, confiar en ella, pensar en ella, acordarse de ella. Usa regencias correctas.',
            answer: 'Conto com ela, confio em ela, penso nela e lembro-me dela com carinho.',
            accepted: ['regencia', 'preposição', 'com', 'em', 'de'],
            explain: 'Múltiples regencias correctas en una secuencia.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de regencia vs español',
        tag: 'Análise',
        intro: 'Explica diferencias de regencia entre portugués y español.',
        type: 'write',
        items: [
          {
            scene: 'Comparación lingüística',
            prompt: '¿Por qué en español decimos "voy en auto" pero en portugués es "vou a carro"? Explica la diferencia de regencia.',
            answer: 'En español "en" es para estar en un lugar. En portugués, "a" es para ir/llegar a un lugar. Movimiento vs ubicación: "Vou a Brasil" (me dirijo a) vs "Estou em Brasil" (me encuentro en).',
            accepted: ['regencia', 'movimiento', 'ubicación', 'preposición'],
            explain: 'Diferencia fundamental entre regencias de movimiento vs ubicación.',
          },
        ],
      },
    ],
  },
}

export default topic
