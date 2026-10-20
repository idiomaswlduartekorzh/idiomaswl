import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'alternativa-geona-b1',
  order: '09',
  color: '#c60c30',
  category: 'Alternativa y opción',
  level: 'B1',
  title: '-거나: Alternativa y Opción en Coreano B1',
  shortTitle: '-거나 (o bien, o)',
  metaTitle: '-거나 en Coreano B1 — Expresar Alternativas y Opciones',
  description:
    '-거나 conecta dos o más predicados como alternativas: «hacer X o hacer Y», «ser X o ser Y». Puede repetirse para marcar cada alternativa, pero la indiferencia depende del contexto o de expresiones como 상관없다. Con sustantivos se usa normalmente -(이)나.',
  lead: 'Domina -거나 para expresar alternativas: "o bien..., o bien..."',
  outcomes: [
    'Forma alternativas con -거나',
    'Usas -거나 repetido para enumerar varias alternativas',
    'Distingues -거나 del conector 아니면 (o, si no)',
    'Expresa opciones en contextos de decisión y preferencia',
  ],

  guide: {
    goal: 'Expresar alternativas entre dos o más opciones de forma clara y estructurada.',
    model: '차를 마시거나 커피를 마셔요. 영화를 보거나 책을 읽을 수 있어요. (Bebo té o café. Puedo ver una película o leer un libro.)',
    formula: 'Verbo/adjetivo + -거나 + segunda opción',
    decisions: [
      '-거나: une dos opciones, "o bien... o bien..."',
      'Múltiples opciones: A-거나 B-거나 C-거나 (A o B o C)',
      '-거나 puede aparecer tras cada predicado: 쉬거나 산책하거나',
      'Con verbos: 가다 → 가거나, 먹다 → 먹거나',
      'Con adjetivos: 예쁘다 → 예쁘거나, 비싸다 → 비싸거나',
      'Negación: 하지 않거나 o 못 하거나',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['V/A-거나', 'Alternativa entre predicados', '영화를 보거나 책을 읽어요'],
      ['A-거나 B-거나', 'Enumeración de alternativas', '집에서 쉬거나 산책하거나 해요'],
      ['N-(이)나', 'Alternativa entre sustantivos', '커피나 차를 마셔요'],
    ],
    mistakes: [
      'No uses V-거나 como si fuera la forma habitual para unir solo sustantivos: 커피나 차 ✓.',
      '-거나 une predicados dentro de una oración; 아니면 puede introducir una segunda alternativa completa: 영화 볼까요? 아니면 산책할까요?',
      'No confundas -거나 con -든지: -든지 enfatiza que cualquiera de las alternativas es válida o indiferente.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es -거나?',
      paragraphs: [
        '-거나 es un marcador de alternancia que expresa "o bien... o bien..." entre dos o más opciones. Se adjunta a la raíz del verbo o adjetivo: 먹다 → 먹거나, 예쁘다 → 예쁘거나.',
        'Es versátil: puede expresar opciones reales (elige una), opciones hipotéticas (podrías hacer esto o aquello), o indiferencia (da igual cuál hagas).',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre -거나 simple y repetido?',
      paragraphs: [
        'Con predicados puede aparecer una sola vez: "영화를 보거나 책을 읽어요". También puede marcarse cada alternativa: "쉬거나 산책하거나 해요".',
        'La repetición no expresa indiferencia por sí sola. Para «da igual cuál» se añaden expresiones como 상관없어요 o se usa con frecuencia -든지: 무엇을 하든지 상관없어요.',
      ],
    },
    {
      heading: '¿Cómo se usa -거나 con verbos y adjetivos?',
      paragraphs: [
        'Verbos: 가다 → 가거나, 오다 → 오거나, 먹다 → 먹거나. Ejemplo: "영화를 보거나 게임을 할 수 있어요" (puedes ver una película o jugar).',
        'Adjetivos: 예쁘다 → 예쁘거나, 비싸다 → 비싸거나. Ejemplo: "예쁘거나 싸야 산다" (compro si es bonito o barato — una u otra condición).',
      ],
    },
    {
      heading: '-거나 vs 아니면',
      paragraphs: [
        '-거나 es una terminación que se adjunta al primer predicado: 영화를 보거나 책을 읽어요. 아니면 es una palabra independiente que introduce otra opción: 영화를 볼까요? 아니면 책을 읽을까요?',
        '아니면 puede significar «o» o «si no», pero no rechaza necesariamente la primera opción. Para alternativas entre sustantivos, lo habitual es N-(이)나: 이 책이나 저 책.',
      ],
    },
    {
      heading: 'Contextos: decisión, preferencia, hipótesis',
      paragraphs: [
        'Decisión: "뭘 할 거야?" "공부하거나 놀거나" (¿qué harás? Estudiar o jugar — opciones reales). Preferencia: "예쁘거나 싼 옷을 사요" (compro ropa que sea bonita o barata).',
        'Hipótesis: "내일 비가 오거나 눈이 올 거야" (mañana podría llover o nevar). Indiferencia: "언제 와도 괜찮아. 아침이거나 저녁이거나" (cualquier hora, mañana o noche, me da igual).',
      ],
    },
    {
      heading: '-거나 -거나 para indiferencia',
      paragraphs: [
        'La repetición enumera de manera equilibrada: "집에서 쉬거나 밖을 산책하거나 해요" (descanso en casa o paseo fuera).',
        'Si quieres expresar indiferencia, añádela explícitamente: "집에서 쉬거나 산책하거나, 어느 쪽이든 상관없어요" (descansemos o paseemos, cualquiera está bien).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-거나: alternativa simple vs -거나 -거나 (indiferencia). Múltiples opciones.',
    graphicPrompt: 'Tabla: -거나 (A o B) vs -거나 -거나 (A o B, indiferente). Ejemplos.',
    scene: [
      ['차를 마시거나 커피를 마셔요.', 'Bebo té o café.'],
      ['영화를 보거나 게임을 할 수 있어요.', 'Puedo ver una película o jugar.'],
      ['주말에는 집에서 쉬거나 산책해요.', 'El fin de semana descanso en casa o paseo.'],
      ['예쁘거나 싼 옷을 사요.', 'Compro ropa que sea bonita o barata.'],
      ['버스를 타거나 지하철을 타요.', 'Voy en autobús o en metro.'],
      ['내일 비가 오거나 눈이 올 거예요.', 'Mañana podría llover o nevar.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['대안', '-거나 -거나', '선택'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma -거나',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta con -거나.',
        type: 'choice',
        items: [
          {
            scene: 'Verbo + -거나',
            lines: [['', '책을 읽___ 영화를 봐요.']],
            options: ['거나', '거나요', '는거나', '고도'],
            answer: '거나',
            explain: '읽다 → 읽거나 (leer o ver).',
          },
          {
            scene: 'Adjetivo + -거나',
            lines: [['', '예쁘___ 싼 옷을 원해요.']],
            options: ['거나', '거나요', '는거나', '고도'],
            answer: '거나',
            explain: '예쁘다 → 예쁘거나 (bonito o barato).',
          },
          {
            scene: '-거나 -거나 (indiferencia)',
            lines: [['', '주말에는 집에서 쉬___ 산책해요.']],
            options: ['거나', '지만', '면서', '니까'],
            answer: '거나',
            explain: '-거나 -거나 para indiferencia.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Múltiples alternativas',
        tag: '2+ opciones',
        intro: 'Completa con múltiples alternativas.',
        type: 'choice',
        items: [
          {
            scene: 'Tres opciones',
            lines: [['', 'A-거나 B-거나 C-거나']],
            options: ['A o B o C', 'A y B y C', 'No A, B, C', 'A pero B pero C'],
            answer: 'A o B o C',
            explain: 'Múltiples -거나 expresan "A o B o C".',
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Decisiones en contexto',
        tag: 'Texto guiado',
        intro: 'Completa un diálogo sobre opciones.',
        type: 'guidedText',
        scene: 'Conversación sobre preferencias y decisiones.',
        text: '뭘 마실 거야? 커피를 마시[[0]] 차를 마실 수 있어. 뭘 할 거야? 영화를 보[[1]] 게임을 할 수 있어. 어떻게 올 거야? 버스를 타[[2]] 지하철을 탈 거야.',
        blanks: [
          { options: ['거나', '고도'], answer: '거나', explain: '-거나 para alternativa.' },
          { options: ['거나', '고도'], answer: '거나', explain: '-거나 para alternativa.' },
          { options: ['거나', '고도'], answer: '거나', explain: '-거나 para alternativa de tiempo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escritura de opciones',
        tag: 'Texto libre',
        intro: 'Escribe tus opciones personales.',
        type: 'freeText',
        scene: 'Descripción de preferencias y alternativas.',
        text: '1. [[0]] (Bebo café o té). 2. [[1]] (Puedo venir mañana o pasado). 3. [[2]] (No importa, cualquier opción).',
        blanks: [
          { answer: '커피를 마시거나 차를 마셔요', accepted: ['-거나', '마셔'], explain: '-거나 conecta los dos predicados.' },
          { answer: '내일 오거나 모레 올 수 있어요', accepted: ['-거나', '올'], explain: '-거나 conecta las dos posibilidades de venir.' },
          { answer: '영화를 보거나 책을 읽어도 괜찮아요', accepted: ['-거나', '괜찮'], explain: '-거나 enumera opciones; 괜찮아요 expresa aceptación.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción de preferencias',
        tag: 'Producción',
        intro: 'Escribe sobre tus opciones y preferencias.',
        type: 'write',
        items: [
          {
            scene: 'Preferencias personales',
            prompt: 'Describe 3 opciones que te gustan usando -거나.',
            answer: '아침에는 커피를 마시거나 차를 마셔요. 주말에는 영화를 보거나 책을 읽어요. 저녁에는 한국 음식을 먹거나 이탈리아 음식을 먹고 싶어요.',
            accepted: ['-거나', '선택', '대안'],
            explain: 'Múltiples expresiones de alternativa.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análisis de -거나 vs -아니면',
        tag: 'Análisis',
        intro: 'Explica la diferencia de implicatura.',
        type: 'write',
        items: [
          {
            scene: 'Alternativa vs negación',
            prompt: '"영화를 보거나 책을 읽어요" vs "영화를 볼까요? 아니면 책을 읽을까요?": ¿qué cambia?',
            answer: '-거나 se adjunta al primer predicado y une alternativas dentro de una oración. 아니면 es un conector independiente que puede abrir una segunda pregunta u oración completa. Ambos pueden traducirse como «o».',
            accepted: ['연결 어미', '접속 부사', '선택'],
            explain: '-거나 es una terminación; 아니면 conecta alternativas de manera independiente.',
          },
        ],
      },
    ],
  },
}

export default topic
