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
    '-거나 expresa alternativa entre dos o más opciones: "X o Y", "puedes hacer X o Y". Literal: "-거나" es un marcador de alternancia. Diferente de "-거나 -거나": la primera forma solo une dos opciones; la repetición (A-거나 B-거나) expresa "ya sea A o B, no importa cuál". Fundamental para expresar opciones y preferencia en B1.',
  lead: 'Domina -거나 para expresar alternativas: "o bien..., o bien..."',
  outcomes: [
    'Forma alternativas con -거나',
    'Usa repetición -거나 -거나 para "ya sea... o..."',
    'Distingues -거나 de -아니면 (sino, en su lugar)',
    'Expresa opciones en contextos de decisión y preferencia',
  ],

  guide: {
    goal: 'Expresar alternativas entre dos o más opciones de forma clara y estructurada.',
    model: '차를 마시거나 커피를 마셔요. 영화를 보거나 책을 읽을 수 있어요. (Bebo té o café. Puedo ver una película o leer un libro.)',
    formula: 'Verbo/adjetivo + -거나 + segunda opción',
    decisions: [
      '-거나: une dos opciones, "o bien... o bien..."',
      'Múltiples opciones: A-거나 B-거나 C-거나 (A o B o C)',
      '-거나 -거나: repetición, "ya sea A o B, no importa" (indiferencia)',
      'Con verbos: 가다 → 가거나, 먹다 → 먹거나',
      'Con adjetivos: 예쁘다 → 예쁘거나, 비싸다 → 비싸거나',
      'Negación: 하지 않거나 o 못 하거나',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['-거나', 'Alternativa simple', '커피거나 차거나 → café o té'],
      ['-거나 -거나', 'Alternativa indiferente', '뭘 하거나 상관없어요 → no importa qué hagas'],
      ['다중선택', 'Múltiples opciones', 'A-거나 B-거나 C-거나 → A o B o C'],
    ],
    mistakes: [
      '"-나 -나" no es lo mismo que "-거나 -거나"; "-나" es más coloquial.',
      '"-거나" vs "-아니면": -거나 es opción real; -아니면 es "sino" (negación + alternativa).',
      '"오거나 가거나" (viene o va) ✓ vs "오거나 뭐거나" (viene o qué sea) ✓ (espontáneidad).',
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
      heading: 'Alternativa simple vs repetida',
      paragraphs: [
        'Simple: "커피거나 차" (café o té — tienes que elegir uno). Repetida: "커피거나 차거나" (café o té, me da igual cuál elijas — indiferencia). La repetición añade matiz de que "no importa cuál".',
        'Ejemplo con indiferencia: "뭐를 하거나 상관없어요" (no importa qué hagas, me da igual). La repetición suaviza hacia la aceptación de cualquier opción.',
      ],
    },
    {
      heading: 'Con verbos y adjetivos',
      paragraphs: [
        'Verbos: 가다 → 가거나, 오다 → 오거나, 먹다 → 먹거나. Ejemplo: "영화를 보거나 게임을 할 수 있어요" (puedes ver una película o jugar).',
        'Adjetivos: 예쁘다 → 예쁘거나, 비싸다 → 비싸거나. Ejemplo: "예쁘거나 싸야 산다" (compro si es bonito o barato — una u otra condición).',
      ],
    },
    {
      heading: '-거나 vs -아니면 (sino)',
      paragraphs: [
        '-거나 expresa opciones equivalentes: A o B (ambas válidas). -아니면 expresa negación + alternativa: "no es A, sino B" (B es la alternativa específica). Diferencia de implicatura: -거나 es "elige A o elige B"; -아니면 es "no A, [entonces] B".',
        'Ejemplo: "이 책이거나 저 책 읽어요" (este libro o ese, ambos válidos) vs "이 책 아니면 저 책 읽어요" (no este, sino ese).',
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
        'Repetición añade matiz: "뭐하거나 괜찮아요" (está bien hagas lo que hagas). "언제 와도 돼. 지금이거나 나중이거나" (viene ahora o después, me da igual).',
        'Es útil en contextos de concesión flexible: "어디든 괜찮아. 서울이거나 부산이거나" (está bien, Seúl o Busan, me da igual).',
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
      ['언제 와도 돼. 지금이거나 나중이거나.', 'Está bien. Ven ahora o después, me da igual.'],
      ['예쁘거나 싼 옷을 사요.', 'Compro ropa que sea bonita o barata.'],
      ['뭐하거나 상관없어요.', 'No importa qué hagas.'],
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
        tag: 'Múltipla escolha',
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
            lines: [['', '언제 와도 돼. 아침___ 저녁___']],
            options: ['에', '거나', '때', '고도'],
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
        text: '뭘 마실거야? 커피[[0]] 차를 마실 수 있어. 뭘 할거야? 영화를 보[[1]] 게임을 할 수 있어. 언제 와? 내일[[2]] 모레에 올 거야.',
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
          { answer: '커피거나 차를 마셔요', accepted: ['-거나', '마셔'], explain: '-거나 con bebidas.' },
          { answer: '내일이거나 모레에 올 수 있어요', accepted: ['-거나', '올'], explain: '-거나 con tiempo.' },
          { answer: '뭐거나 상관없어요', accepted: ['-거나', '상관'], explain: '-거나 con indiferencia.' },
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
            answer: '나는 커피거나 차를 좋아해요. 주말에는 영화를 보거나 책을 읽어요. 밥은 한국음식이거나 이탈리아음식을 먹고 싶어요.',
            accepted: ['-거나', '선택', '대안'],
            explain: 'Múltiples expresiones de alternativa.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de -거나 vs -아니면',
        tag: 'Análise',
        intro: 'Explica la diferencia de implicatura.',
        type: 'write',
        items: [
          {
            scene: 'Alternativa vs negación',
            prompt: '"이 책이거나 저 책" vs "이 책 아니면 저 책": ¿cuál es la diferencia?',
            answer: '"이 책이거나 저 책" = ambos libros son opciones válidas (elige uno). "이 책 아니면 저 책" = no este libro, [entonces] ese libro (este es rechazado). -거나 es opciones equivalentes; -아니면 es negación + específica alternativa.',
            accepted: ['동등한', '부정', '선택'],
            explain: '-거나 (opciones equivalentes) vs -아니면 (negación + alternativa).',
          },
        ],
      },
    ],
  },
}

export default topic
