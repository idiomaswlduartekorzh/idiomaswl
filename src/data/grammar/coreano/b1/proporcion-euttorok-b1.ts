import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'proporcion-euttorok-b1',
  order: '10',
  color: '#c60c30',
  category: 'Proporción y grado',
  level: 'B1',
  title: '-ㄹ수록 / -을수록: Proporción y Comparación Gradual en Coreano B1',
  shortTitle: '-ㄹ수록 (cuanto más..., más...)',
  metaTitle: '-ㄹ수록 / -을수록 en Coreano B1 — Expresar Proporcionalidad',
  description:
    '-ㄹ수록 expresa relación proporcional: "cuanto más X, más/menos Y". Literal: "raíz + -ㄹ수" (cantidad) + "록" (en la medida que). Se usa para: "cuanto más trabajo, más aprendo", "cuanto menos duermes, peor estás". Fundamental para expresar causa-efecto proporcional en B1.',
  lead: 'Domina -ㄹ수록 para expresar: "cuanto más..., más..."',
  outcomes: [
    'Forma proporcionalidad con -ㄹ수록',
    'Expresa relaciones causa-efecto graduales',
    'Usa comparativos en cláusula de proporción',
    'Distingues -ㄹ수록 de comparativos simples',
  ],

  guide: {
    goal: 'Expresar relaciones proporcionales entre dos variables.',
    model: '공부할수록 알 수 있어요. 나이가 들수록 지혜가 생겨요. (Cuanto más estudio, más aprendo. Cuanto más envejeces, más sabiduría adquieres.)',
    formula: '동사/형용사 + -ㄹ수록',
    decisions: [
      '-ㄹ수록: proporcionalidad, "cuanto más... más..."',
      '동사: 공부하다 → 공부할수록, 먹다 → 먹을수록',
      '형용사: 많다 → 많을수록, 크다 → 클수록',
      '결과 절에도 비교 표현: 더/덜 + 동사/형용사',
      '반복 가능: A-ㄹ수록 B, B-ㄹ수록 C (cadena de proporciones)',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['-ㄹ수록', 'Proporcionalidad', '많을수록 좋아요 — cuanto más, mejor'],
      ['반복', 'Cadena proporcional', '큰 도시일수록 비쌀수록 → cuanto más grande la ciudad, más cara'],
      ['부정', 'Proporción negativa', '못 잘수록 피곤해요 — cuanto menos duermes, más cansado estás'],
    ],
    mistakes: [
      '"-는수록" no existe; es "-ㄹ수록".',
      '"많으면 많을수록" (redundancia); usa solo "-ㄹ수록".',
      '"공부할수록" ✓ (cuanto más estudies) vs "공부하면서" (mientras estudias) — proporcional vs simultaneidad.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es -ㄹ수록?',
      paragraphs: [
        '-ㄹ수록 expresa proporción gradual: "cuanto más X, más/menos Y". Es muy usado en coreano para describir relaciones causales de grado: cambios graduales, correlaciones, efectos acumulativos.',
        'Se usa en contextos comparativos y causales complejos. TOPIK II incluye -ㄹ수록 frecuentemente en comprensión de lectura y escritura.',
      ],
    },
    {
      heading: 'Formación con verbos y adjetivos',
      paragraphs: [
        'Verbos: 공부하다 → 공부할수록 (cuanto más estudies), 먹다 → 먹을수록 (cuanto más comas). Adjetivos: 많다 → 많을수록 (cuanto más), 크다 → 클수록 (cuanto más grande).',
        'La raíz + -ㄹ se adjunta a sujetos o complementos de la cláusula principal.',
      ],
    },
    {
      heading: 'Expresiones comunes con -ㄹ수록',
      paragraphs: [
        '"좋을수록" = cuanto mejor. "많을수록 좋아요" = cuanto más, mejor (expresión fija). "클수록 비쌀수록" = cuanto más grande, más caro.',
        '"공부할수록 알 수 있어요" = cuanto más estudio, más entiendo. Relación causa-efecto proporcional clara.',
      ],
    },
    {
      heading: 'Con negación: proporción inversa',
      paragraphs: [
        '"못 잘수록 피곤해요" = cuanto menos duermes, más cansado estás (proporción inversa). La negación invierte la relación pero -ㄹ수록 sigue expresando proporcionalidad.',
        'También: "덜 먹을수록 건강해요" (cuanto menos comas, más sano estás) — la negación o reducción en una variable produce reducción en el resultado.',
      ],
    },
    {
      heading: 'Cadena de proporciones: A-ㄹ수록 B, B-ㄹ수록 C',
      paragraphs: [
        'Se puede encadenar: "도시가 클수록 비쌀수록 살기 힘들어요" (cuanto más grande la ciudad, más cara, más difícil vivir). Cada variable proporciona causa para la siguiente.',
        'Ejemplo complejo: "일을 많이 할수록 스트레스가 많아질수록 건강이 나빠져요" (cuanto más trabajes, más estrés, peor salud).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-ㄹ수록: proporcionalidad "cuanto más... más...". Negación inversa.',
    graphicPrompt: 'Tabla: -ㄹ수록 (A aumenta → B aumenta) vs con negación (A disminuye → B aumenta).',
    scene: [
      ['많을수록 좋아요.', 'Cuanto más, mejor.'],
      ['공부할수록 알 수 있어요.', 'Cuanto más estudio, más entiendo.'],
      ['클수록 비쌀수록 산다.', 'Cuanto más grande, más caro, más difícil vivir.'],
      ['못 잘수록 피곤해요.', 'Cuanto menos duermes, más cansado.'],
      ['나이가 들수록 지혜가 생겨요.', 'Cuanto más envejeces, más sabiduría adquieres.'],
      ['돈이 많을수록 행복할까요?', '¿Cuanto más dinero, más feliz?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['비례', '결과 절 형용사', '부정 반비례'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma -ㄹ수록',
        tag: 'Múltipla escolha',
        intro: 'Selecciona la forma correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Verbo + -ㄹ수록',
            lines: [['', '공부___ 알 수 있어요. (공부하다)']],
            options: ['할수록', 'ㄹ수록', '하수록', '하다'],
            answer: '할수록',
            explain: '공부하다 → 공부할수록.',
          },
          {
            scene: 'Adjetivo + -ㄹ수록',
            lines: [['', '많___ 좋아요.']],
            options: ['을수록', 'ㄹ수록', '으로', '는것'],
            answer: '을수록',
            explain: '많다 → 많을수록.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Proporcionalidad en contexto',
        tag: 'Proporciones',
        intro: 'Completa con -ㄹ수록 manteniendo lógica proporcional.',
        type: 'guidedText',
        scene: 'Descripción de relaciones causa-efecto proporcionales.',
        text: '공부할___ 더 많이 알 수 있어요. 나이가 들___ 더 지혜로워져요. 돈이 많___ 행복할까요?',
        blanks: [
          { options: ['수록', '면'], answer: '수록', explain: '-ㄹ수록 para proporcionalidad.' },
          { options: ['수록', '면'], answer: '수록', explain: '-ㄹ수록 con edad.' },
          { options: ['수록', '으면'], answer: '수록', explain: '-ㄹ수록 para pregunta proporcional.' },
        ],
      },
      {
        id: 'level-3',
        title: 'Escritura proporcional',
        tag: 'Proporciones',
        intro: 'Escribe relaciones proporcionales.',
        type: 'freeText',
        scene: 'Descripción de relaciones causa-efecto graduales.',
        text: '1. [[0]] (Cuanto más trabajo). 2. [[1]] (Cuanto mayor es). 3. [[2]] (Cuanto menos duermes).',
        blanks: [
          { answer: '많이 일할수록 피곤해요', accepted: ['할수록', '피곤'], explain: '-ㄹ수록 con trabajo.' },
          { answer: '아이가 클수록 똑똑해요', accepted: ['수록', '크다'], explain: '-ㄹ수록 con edad/tamaño.' },
          { answer: '못 잘수록 피곤해요', accepted: ['수록', '못'], explain: '-ㄹ수록 con negación (inverso).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Análise de proporciones',
        tag: 'Análise',
        intro: 'Explica la proporcionalidad en contexto.',
        type: 'write',
        items: [
          {
            scene: 'Entendimiento de relación',
            prompt: '"공부할수록 알 수 있어요" — ¿qué expresa exactamente?',
            answer: 'Expresa que hay relación proporcional: cuanto más estudios (aumenta estudio), más entiendes (aumenta comprensión). Es causa-efecto gradual y acumulativa.',
            accepted: ['비례', '원인', '누적'],
            explain: '-ㄹ수록 expresa proporcionalidad acumulativa.',
          },
        ],
      },
    ],
  },
}

export default topic
