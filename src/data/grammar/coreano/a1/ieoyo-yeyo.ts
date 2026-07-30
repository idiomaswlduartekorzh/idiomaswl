import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ieoyo-yeyo',
  order: '03',
  color: '#7c3aed',
  category: 'Verbos',
  level: 'A1',
  title: '이에요/예요 en Coreano A1 — El Verbo "Ser"',
  shortTitle: '이에요 / 예요',
  metaTitle: '이에요 예요 coreano A1 — presente formal del verbo ser',
  description:
    'Las terminaciones 이에요 (ieyo) y 예요 (yeyo) son la forma formal del verbo "ser" (ser/estar) en coreano presente. Se usan para identificación y descripción. La elección entre 이에요 y 예요 depende de si el sustantivo anterior termina en consonante o vocal.',
  lead: '이에요 o 예요 = "es/soy/eres". Clave: después de consonante → 이에요; después de vocal → 예요. La regla más usada del coreano A1.',
  outcomes: ['Usa 이에요/예요 para identificar y describir', 'Aplica la regla consonante/vocal', 'Construye frases con 저는 ___ 이에요/예요'],

  guide: {
    goal: 'Usar 이에요/예요 para expresar identidad, profesión y nacionalidad en coreano formal.',
    model: '저는 학생이에요. (Soy estudiante.) / 저는 의사예요. (Soy médico/a.)',
    formula: 'Sustantivo + 이에요 (si termina en consonante) / 예요 (si termina en vocal)',
    decisions: [
      '이에요 → después de consonante: 학생이에요, 선생님이에요',
      '예요 → después de vocal: 의사예요, 피자예요',
      '저는 = yo (formal) / 나는 = yo (informal)',
      'Negación: 이 아니에요 → 학생이 아니에요 (no soy estudiante)',
      'Pregunta: misma estructura + entonación ascendente: 학생이에요?',
    ],
    table: [
      ['Situación', 'Terminación', 'Ejemplo'],
      ['Después de consonante', '이에요', '학생이에요 (soy estudiante)'],
      ['Después de vocal', '예요', '의사예요 (soy médico/a)'],
      ['Después de vocal', '예요', '한국 사람이에요 — espera, "람" termina en consonante → 이에요'],
      ['Negación', '이 아니에요', '학생이 아니에요 (no soy estudiante)'],
    ],
    mistakes: [
      '"의사이에요" ❌ — "의사" termina en vocal (아) → "의사예요" ✓',
      '"학생예요" ❌ — "학생" termina en consonante (ㅇ) → "학생이에요" ✓',
      'La negación NO es "이에요 안" — es "이 아니에요" después del sustantivo',
    ],
  },

  seo: [
    {
      heading: '¿Qué son 이에요 y 예요?',
      paragraphs: [
        '이에요 (ieyo) y 예요 (yeyo) son las terminaciones formales del verbo cópula del coreano, equivalentes a "soy/es/eres" en español. Se usan para identificar o describir algo: 저는 학생이에요 (Soy estudiante), 이것은 피자예요 (Esto es pizza).',
        'La diferencia entre 이에요 y 예요 es puramente fonética: si la palabra anterior termina en consonante (받침/batchim), se usa 이에요; si termina en vocal, se usa 예요. No existe diferencia de significado.',
      ],
    },
    {
      heading: '¿Cuándo se usa 이에요 y cuándo 예요 en coreano?',
      paragraphs: [
        '이에요 se usa cuando el sustantivo o nombre termina en consonante: 학생이에요 (학생 = estudiante, termina en ㅇ), 선생님이에요 (선생님 = profesor, termina en ㅁ), 한국 사람이에요 (사람 = persona, termina en ㅁ).',
        '예요 se usa cuando termina en vocal: 의사예요 (의사 = médico, termina en ㅏ), 한국어예요 (한국어 = coreano, termina en ㅓ), 커피예요 (커피 = café, termina en ㅣ).',
      ],
      table: [
        ['Termina en', 'Usa', 'Ejemplo'],
        ['consonante (받침)', '이에요', '선생님이에요 / 학생이에요'],
        ['vocal (no 받침)', '예요', '의사예요 / 커피예요'],
      ],
    },
    {
      heading: 'Uso en presentaciones: 저는 ___ 이에요/예요',
      paragraphs: [
        'La estructura más útil para principiantes es: 저는 + [identidad] + 이에요/예요. Ejemplo: 저는 마리아예요 (Soy María), 저는 스페인 사람이에요 (Soy español/a), 저는 학생이에요 (Soy estudiante).',
        '저는 es la forma formal de "yo" con la partícula de tema 는. En conversaciones informales se usa 나는, pero para presentarse con alguien desconocido 저는 es más apropiado.',
      ],
    },
    {
      heading: '¿Cómo se niega con 아니에요 en coreano?',
      paragraphs: [
        'Para negar con el verbo cópula, se usa 이 아니에요: sustantivo + 이 아니에요 (después de consonante) o 가 아니에요 (después de vocal). Ejemplo: 저는 학생이 아니에요 (No soy estudiante). 이것은 피자가 아니에요 (Esto no es pizza — "피자" termina en vocal → 가 아니에요).',
        'En A1 es suficiente aprender la forma principal: 이 아니에요. La distinción 이/가 se profundiza en el tema de partículas de sujeto.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: '이에요/예요: cópula formal del coreano con regla consonante/vocal.',
    graphicPrompt: 'Tabla con la regla de selección y ejemplos de presentación personal.',
    scene: [
      ['저는 학생이에요.', 'Soy estudiante. (학생 termina en consonante → 이에요)'],
      ['저는 의사예요.', 'Soy médico/a. (의사 termina en vocal → 예요)'],
      ['이것은 커피예요.', 'Esto es café. (커피 termina en vocal → 예요)'],
      ['저는 한국 사람이에요.', 'Soy coreano/a. (사람 termina en consonante → 이에요)'],
      ['저는 학생이 아니에요.', 'No soy estudiante. (negación)'],
      ['저는 마리아예요.', 'Soy María. (마리아 termina en vocal → 예요)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['이에요 tras consonante', '예요 tras vocal', 'negación 이 아니에요'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige la terminación correcta: 이에요 o 예요.',
        type: 'choice',
        items: [
          { scene: 'Presentándose', lines: [['', '저는 학생___ (soy estudiante; 학생 termina en ㅇ)']], options: ['이에요', '예요', '아니에요', '있어요'], answer: '이에요', explain: '학생 termina en consonante ㅇ → 이에요.' },
          { scene: 'Describiendo profesión', lines: [['', '저는 의사___ (soy médico/a; 의사 termina en ㅏ)']], options: ['예요', '이에요', '아니에요', '없어요'], answer: '예요', explain: '의사 termina en vocal ㅏ → 예요.' },
          { scene: 'Identificando objetos', lines: [['', '이것은 피자___ (esto es pizza; 피자 termina en ㅏ)']], options: ['예요', '이에요', '이 아니에요', '있어요'], answer: '예요', explain: '피자 termina en vocal → 예요.' },
          { scene: 'Describiendo profesión', lines: [['', '저는 선생님___ (soy profesor; 선생님 termina en ㅁ)']], options: ['이에요', '예요', '아니에요', '없어요'], answer: '이에요', explain: '선생님 termina en consonante ㅁ → 이에요.' },
          { scene: 'Identificando objetos', lines: [['', '이것은 커피___ (esto es café; 커피 termina en ㅣ)']], options: ['예요', '이에요', '이 아니에요', '있어요'], answer: '예요', explain: '커피 termina en vocal ㅣ → 예요.' },
          { scene: 'Describiendo nacionalidad', lines: [['', '저는 한국 사람___ (soy coreano/a; 사람 termina en ㅁ)']], options: ['이에요', '예요', '아니에요', '있어요'], answer: '이에요', explain: '사람 termina en consonante ㅁ → 이에요.' },
          { scene: 'Usando la negación', lines: [['', '저는 학생이 ___ (no soy estudiante — negación)']], options: ['아니에요', '예요', '이에요', '있어요'], answer: '아니에요', explain: 'Negación: 이 아니에요. "저는 학생이 아니에요" = No soy estudiante.' },
          { scene: 'Presentándose', lines: [['', '저는 마리아___ (soy María; 마리아 termina en ㅏ)']], options: ['예요', '이에요', '아니에요', '없어요'], answer: '예요', explain: '마리아 termina en vocal ㅏ → 예요.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Sujeto y cópula',
        tag: '2 espacios',
        intro: 'Completa el sujeto y la cópula.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] 학생이에요. (yo soy estudiante, formal)']],
            blanks: [
              { options: ['저는', '나는', '그는', '우리는'], answer: '저는', explain: '저는 = yo formal. Presentación ante desconocidos.' },
              { options: ['학생이에요', '학생예요', '학생이 아니에요', '학생없어요'], answer: '학생이에요', explain: '학생 + consonante final ㅇ → 이에요.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '이것은 [[0]] [[1]].']],
            blanks: [
              { options: ['커피', '학생', '선생님', '사람'], answer: '커피', explain: '커피 = café (termina en vocal → 예요).' },
              { options: ['예요', '이에요', '아니에요', '있어요'], answer: '예요', explain: '커피 termina en vocal ㅣ → 예요.' },
            ],
          },
          {
            scene: 'Describiendo nacionalidad',
            lines: [['', '저는 스페인 [[0]].']],
            blanks: [
              { options: ['사람이에요', '사람예요', '의사예요', '학생이에요'], answer: '사람이에요', explain: '사람 + ㅁ (consonante) → 사람이에요.' },
            ],
          },
          {
            scene: 'Usando la negación',
            lines: [['', '저는 [[0]] 이 아니에요. (no soy estudiante)']],
            blanks: [
              { options: ['학생', '의사', '선생님', '사람'], answer: '학생', explain: '학생이 아니에요 = no soy estudiante.' },
              { options: ['이에요', '예요', '있어요', '아니에요'], answer: '이에요', explain: 'Aquí "이" es la partícula de sujeto en la negación, no parte de 이에요.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa con 이에요 o 예요.',
        type: 'guidedText',
        scene: 'Completa con 이에요 o 예요.',
        text: '안녕하세요! 저는 카를로스[[0]]. 저는 학생[[1]]. 저는 스페인 사람[[2]]. 이것은 제 책[[3]]. 이것은 커피가 아니에요 — 차[[4]]. 저는 의사가 아니에요 — 선생님[[5]].',
        blanks: [
          { options: ['예요', '이에요'], answer: '예요', explain: '카를로스 termina en vocal ㅅ... espera: 스 = consonante ㅅ? No, 스 = ㅅ+ㅡ = termina en vocal ㅡ → 예요.' },
          { options: ['이에요', '예요'], answer: '이에요', explain: '학생 termina en ㅇ (consonante) → 이에요.' },
          { options: ['이에요', '예요'], answer: '이에요', explain: '사람 termina en ㅁ (consonante) → 이에요.' },
          { options: ['이에요', '예요'], answer: '이에요', explain: '책 termina en ㄱ (consonante) → 이에요.' },
          { options: ['예요', '이에요'], answer: '예요', explain: '차 termina en vocal ㅏ → 예요. (차 = té)' },
          { options: ['이에요', '예요'], answer: '이에요', explain: '선생님 termina en ㅁ (consonante) → 이에요.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe 이에요 o 예요 para completar cada oración.',
        type: 'freeText',
        scene: 'Escribe 이에요 o 예요 para completar cada oración.',
        text: '저는 의사[[0]]. / 이것은 책[[1]]. / 저는 마리아[[2]]. / 저는 선생님[[3]]. / 이것은 피자[[4]].',
        blanks: [
          { answer: '예요', accepted: ['예요'], explain: '의사 termina en vocal ㅏ → 예요.' },
          { answer: '이에요', accepted: ['이에요'], explain: '책 termina en ㄱ (consonante) → 이에요.' },
          { answer: '예요', accepted: ['예요'], explain: '마리아 termina en vocal ㅏ → 예요.' },
          { answer: '이에요', accepted: ['이에요'], explain: '선생님 termina en ㅁ (consonante) → 이에요.' },
          { answer: '예요', accepted: ['예요'], explain: '피자 termina en vocal ㅏ → 예요.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones usando 이에요/예요.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di tu nombre en coreano: "저는 [nombre] ___".',
            answer: '저는 Ana예요.',
            accepted: ['저는', '이에요', '예요'],
            explain: 'Ejemplo: 저는 카를로스예요. / 저는 마리아예요. Elige 이에요 o 예요 según la última sílaba.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di tu profesión o condición: 학생(estudiante), 선생님(profesor), 의사(médico).',
            answer: '저는 학생이에요.',
            accepted: ['이에요', '예요'],
            explain: 'Ejemplo: 저는 의사예요. / 저는 선생님이에요. Depende de la consonante final.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di tu nacionalidad: 스페인 사람(español/a), 콜롬비아 사람(colombiano/a).',
            answer: '저는 콜롬비아 사람이에요.',
            accepted: ['이에요', '예요', '사람이에요'],
            explain: '사람이에요 porque 사람 termina en ㅁ (consonante).',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di que algo NO eres: usa 이 아니에요.',
            answer: '저는 선생님이 아니에요. 저는 학생이에요.',
            accepted: ['아니에요', '이 아니에요'],
            explain: 'Negación: sustantivo + 이 아니에요. Ejemplo: 저는 의사가 아니에요.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Escríbete una presentación en coreano usando 이에요/예요 al menos 3 veces.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di tu nombre con 이에요/예요.',
            answer: '저는 Ana예요.',
            accepted: ['저는', '이에요', '예요'],
            explain: 'Usa 저는 para ser formal. Elige 이에요 o 예요 según la última sílaba de tu nombre.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di tu profesión o lo que eres (학생/의사/선생님/회사원=trabajador de empresa).',
            answer: '저는 학생이에요.',
            accepted: ['이에요', '예요'],
            explain: 'Recuerda: consonante final → 이에요; vocal final → 예요.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di tu nacionalidad usando "___ 사람이에요".',
            answer: '저는 스페인 사람이에요.',
            accepted: ['사람이에요', '사람예요'],
            explain: '사람 siempre termina en ㅁ (consonante) → 사람이에요. Siempre 이에요 con 사람.',
          },
        ],
      },
    ],
  },
}

export default topic
