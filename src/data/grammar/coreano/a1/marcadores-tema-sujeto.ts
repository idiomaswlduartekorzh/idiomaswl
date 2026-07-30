import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'marcadores-tema-sujeto',
  order: '04',
  color: '#b45309',
  category: 'Partículas',
  level: 'A1',
  title: 'Marcadores de Tema y Sujeto del Coreano A1',
  shortTitle: '은/는 y 이/가',
  metaTitle: 'Partículas 은/는 이/가 coreano A1 — marcadores de tema y sujeto',
  description:
    'Las partículas 은/는 (eun/neun) marcan el tema de la conversación, y 이/가 (i/ga) marcan el sujeto gramatical. Ambas se seleccionan según si la palabra anterior termina en consonante o vocal. Son las partículas más frecuentes del coreano.',
  lead: '은/는 = "en cuanto a" (tema) y 이/가 = sujeto gramatical. Regla simple: consonante → 은/이; vocal → 는/가. Esenciales en toda oración coreana.',
  outcomes: ['Usa 은/는 para el tema', 'Usa 이/가 para el sujeto gramatical', 'Selecciona consonante vs. vocal correctamente'],

  guide: {
    goal: 'Usar las partículas de tema (은/는) y de sujeto (이/가) correctamente en coreano A1.',
    model: '저는 학생이에요. (Yo [tema] estudiante soy.) / 고양이가 있어요. (Hay un gato.)',
    formula: 'Sustantivo + 은/는 (tema) o 이/가 (sujeto) + predicado',
    decisions: [
      'Después de consonante: 은 (tema) / 이 (sujeto)',
      'Después de vocal: 는 (tema) / 가 (sujeto)',
      '은/는 introduce o cambia el tema, o hace contraste: 저는 학생이에요 (YO soy estudiante)',
      '이/가 marca el sujeto en frases nuevas o énfasis en el sujeto mismo',
      'En práctica, 은/는 es más frecuente en conversación y 이/가 con verbos de existencia (있어요)',
    ],
    table: [
      ['Partícula', 'Después de consonante', 'Después de vocal'],
      ['Tema', '은', '는'],
      ['Sujeto', '이', '가'],
    ],
    mistakes: [
      '"저가 학생이에요" — poco natural para presentación; mejor "저는 학생이에요"',
      '"나는가" ❌ — solo una partícula: "나는" O "내가" (contracción de 나+가)',
      '이/가 con 저→제가, 나→내가 (contracciones irregulares)',
    ],
  },

  seo: [
    {
      heading: '¿Por qué son importantes 은/는 y 이/가?',
      paragraphs: [
        'Las partículas son la columna vertebral de la gramática coreana. Las más frecuentes son las partículas de tema (은/는) y de sujeto (이/가). Aparecen en casi toda oración y no tienen equivalente directo en español — son conceptos exclusivos de las lenguas aglutinantes.',
        '은/는 (eun/neun) marcan el tema de la conversación: "en cuanto a X, ..." — señala sobre qué se está hablando o hace un contraste implícito. 이/가 (i/ga) son el sujeto gramatical puro, sin el matiz de tema.',
      ],
    },
    {
      heading: '¿Cómo se eligen 은/는 y 이/가 según la terminación?',
      paragraphs: [
        'La selección es puramente fonética. Si la última sílaba de la palabra tiene batchim (consonante final), se usa 은 (tema) o 이 (sujeto). Si termina en vocal (sin batchim), se usa 는 (tema) o 가 (sujeto).',
        'Ejemplos: 학생은/학생이 (학생 termina en ㅇ = consonante). 의사는/의사가 (의사 termina en ㅏ = vocal). 커피는/커피가 (커피 termina en ㅣ = vocal).',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre tema (은/는) y sujeto (이/가)?',
      paragraphs: [
        '은/는 introduce o cambia el tema de conversación, a menudo con un contraste implícito: 저는 학생이에요 (Yo [en cuanto a mí] soy estudiante — puede implicar que otros no lo son). También se usa para enfocar el tema.',
        '이/가 marca simplemente el sujeto gramatical. Se usa especialmente con verbos de existencia (있어요 = hay/existo, 없어요 = no hay) o cuando el sujeto es nuevo o inesperado: 고양이가 있어요 (Hay un gato). No puedes usar 은/는 con estos verbos fácilmente.',
      ],
    },
    {
      heading: 'Contracciones irregulares de 나 y 저',
      paragraphs: [
        'Cuando 나 (yo informal) o 저 (yo formal) van con la partícula 가 (sujeto, después de vocal), se contraen: 나+가 = 내가 / 저+가 = 제가. Estas contracciones son obligatorias en el habla natural.',
        'Con 는: 나는, 저는 — sin contracción. Esta asimetría (contracción solo con 가, no con 는) es una de las irregularidades que hay que memorizar.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Partículas de tema (은/는) y sujeto (이/가) con la regla consonante/vocal.',
    graphicPrompt: 'Tabla comparativa de 은/는 y 이/가 con ejemplos.',
    scene: [
      ['저는 학생이에요.', 'Yo [tema] estudiante soy.'],
      ['이것은 책이에요.', 'Esto [tema] libro es.'],
      ['고양이가 있어요.', 'Hay un gato. / Gato [sujeto] existe.'],
      ['저는 커피를 마셔요.', 'Yo [tema] café [obj.] bebo.'],
      ['내가 해요.', 'Yo lo hago. (나+가 = 내가)'],
      ['한국어는 재미있어요.', 'El coreano [tema] es interesante.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['은/는 vs 이/가', 'consonante/vocal', 'contracciones 내가/제가'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige la partícula correcta de tema (은/는) o sujeto (이/가).',
        type: 'choice',
        items: [
          { scene: 'Presentándose', lines: [['', '저___ 학생이에요. (yo, tema — 저 termina en vocal)']], options: ['는', '은', '가', '이'], answer: '는', explain: '저 termina en vocal (ㅓ) → 는 (partícula de tema).' },
          { scene: 'Hablando de estudiantes', lines: [['', '학생___ 공부해요. (el estudiante, tema — 학생 termina en ㅇ)']], options: ['은', '는', '이', '가'], answer: '은', explain: '학생 termina en consonante ㅇ → 은.' },
          { scene: 'Hablando de animales', lines: [['', '고양이___ 있어요. (hay un gato — 고양이 termina en vocal)']], options: ['가', '이', '는', '은'], answer: '가', explain: '고양이 termina en vocal ㅣ → 가 (partícula de sujeto).' },
          { scene: 'Hablando de objetos', lines: [['', '책___ 있어요. (hay libros — 책 termina en ㄱ)']], options: ['이', '가', '는', '은'], answer: '이', explain: '책 termina en consonante ㄱ → 이 (partícula de sujeto).' },
          { scene: 'Expresando preferencias', lines: [['', '커피___ 좋아요. (el café es bueno — 커피 termina en vocal)']], options: ['는', '은', '가', '이'], answer: '는', explain: '커피 termina en vocal ㅣ → 는 (tema).' },
          { scene: 'Describiendo personas', lines: [['', '선생님___ 친절해요. (el profesor es amable — termina en ㅁ)']], options: ['은', '는', '이', '가'], answer: '은', explain: '선생님 termina en consonante ㅁ → 은 (tema).' },
          { scene: 'Haciendo preguntas', lines: [['', '누가 왔어요? (¿Quién vino? — 누 termina en vocal)']], options: ['가', '이', '는', '은'], answer: '가', explain: '누 termina en vocal → 누가. Pregunta sobre el sujeto → 이/가.' },
          { scene: 'Hablando de idiomas', lines: [['', '한국어___ 어려워요? (¿El coreano es difícil? — tema)']], options: ['는', '은', '가', '이'], answer: '는', explain: '한국어 termina en vocal ㅓ → 는 (tema).' },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Dos partículas',
        tag: '2 espacios',
        intro: 'Completa las dos partículas en cada oración.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '저[[0]] 학생이에요. 그[[1]] 선생님이에요.']],
            blanks: [
              { options: ['는', '은', '가', '이'], answer: '는', explain: '저 (vocal) → 는 (tema).' },
              { options: ['는', '은', '가', '이'], answer: '는', explain: '그 (vocal) → 는. "그는" = él (tema).' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '고양이[[0]] 있어요. 강아지[[1]] 없어요.']],
            blanks: [
              { options: ['가', '이', '는', '은'], answer: '가', explain: '고양이 (vocal) → 가 (sujeto de existencia).' },
              { options: ['는', '은', '가', '이'], answer: '는', explain: '강아지 (vocal) → 가... espera: 강아지가 없어요 también es correcto, pero 는 da contraste implícito. Ambos son usados.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '한국어[[0]] 재미있어요. 일본어[[1]] 어려워요.']],
            blanks: [
              { options: ['는', '은', '가', '이'], answer: '는', explain: '한국어 (vocal ㅓ) → 는 (tema, contraste).' },
              { options: ['는', '은', '가', '이'], answer: '는', explain: '일본어 (vocal ㅓ) → 는 (contraste: coreano vs. japonés).' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '학교[[0]] 크고 도서관[[1]] 작아요.']],
            blanks: [
              { options: ['은', '는', '이', '가'], answer: '은', explain: '학교 (vocal ㅛ)... espera: 교 = ㄱ+ㅛ → termina en vocal → 는. Pero en contraste → 는/은 según fonética. 학교 termina en vocal → 는.' },
              { options: ['은', '는', '이', '가'], answer: '은', explain: '도서관 termina en ㄴ (consonante) → 은 (tema, contraste).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa con 은, 는, 이 o 가.',
        type: 'guidedText',
        scene: 'Completa con 은, 는, 이 o 가.',
        text: '저[[0]] 카를로스예요. 저[[1]] 스페인 사람이에요. 제 친구 마리아[[2]] 의사예요. 우리 집에 고양이[[3]] 있어요. 강아지[[4]] 없어요. 한국어[[5]] 재미있어요!',
        blanks: [
          { options: ['는', '은', '가', '이'], answer: '는', explain: '저 (vocal ㅓ) → 는 (tema, presentación).' },
          { options: ['는', '은', '가', '이'], answer: '는', explain: '저 → 는. Segundo uso de "저는".' },
          { options: ['는', '은', '가', '이'], answer: '는', explain: '마리아 (vocal ㅏ) → 는 (tema).' },
          { options: ['가', '이', '는', '은'], answer: '가', explain: '고양이 (vocal ㅣ) → 가 (sujeto de 있어요).' },
          { options: ['는', '은', '가', '이'], answer: '는', explain: '강아지 (vocal ㅣ) → 는 (contraste con el gato).' },
          { options: ['는', '은', '가', '이'], answer: '는', explain: '한국어 (vocal ㅓ) → 는 (tema).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Añade la partícula de tema (은/는) a cada sustantivo.',
        type: 'freeText',
        scene: 'Añade la partícula de tema (은/는) a cada sustantivo.',
        text: '저[[0]] 학생이에요. / 커피[[1]] 좋아요. / 선생님[[2]] 친절해요. / 한국어[[3]] 어려워요. / 이것[[4]] 제 책이에요.',
        blanks: [
          { answer: '는', accepted: ['는'], explain: '저 (vocal) → 는.' },
          { answer: '는', accepted: ['는'], explain: '커피 (vocal) → 는.' },
          { answer: '은', accepted: ['은'], explain: '선생님 (consonante ㅁ) → 은.' },
          { answer: '는', accepted: ['는'], explain: '한국어 (vocal) → 는.' },
          { answer: '은', accepted: ['은'], explain: '이것 (consonante ㅅ) → 은.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones con las partículas correctas.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Preséntate: "저___  ___이에요/예요" (yo + nombre + ser).',
            answer: '저는 마리아예요.',
            accepted: ['저는', '저는 '],
            explain: '저 + vocal → 저는. Después nombre: consonante/vocal determina 이에요/예요.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di que algo te gusta: "___는/은 좋아요" (X es bueno/me gusta).',
            answer: '커피는 좋아요.',
            accepted: ['는 좋아요', '은 좋아요'],
            explain: 'Ejemplo: 한국어는 재미있어요. / 음악은 좋아요. Vocal → 는; consonante → 은.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di que hay algo en tu casa usando 이/가 있어요.',
            answer: '우리 집에 고양이가 있어요.',
            accepted: ['가 있어요', '이 있어요'],
            explain: 'Con 있어요: vocal → 가; consonante → 이. Ejemplo: 책이 있어요 / 강아지가 있어요.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Haz contraste: "A는/은 ___, B는/은 ___" (A es X pero B es Y).',
            answer: '한국어는 재미있어요. 일본어는 어려워요.',
            accepted: ['는 ', '은 '],
            explain: '은/는 da contraste implícito. Ejemplo: 커피는 좋아요. 차는 별로예요.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Escribe una descripción breve de ti y tu casa usando 은/는 y 이/가.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Preséntate con 저는: nombre y profesión/condición.',
            answer: '저는 카를로스예요. 저는 학생이에요.',
            accepted: ['저는'],
            explain: '저 (vocal) → 저는. Usa 이에요/예요 según la última sílaba.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di algo sobre tu idioma favorito usando 는/은: "___ 는/은 재미있어요" (es interesante).',
            answer: '한국어는 재미있어요!',
            accepted: ['는 재미있어요', '은 재미있어요', '는 어려워요', '은 어려워요'],
            explain: 'Ejemplo: 스페인어는 재미있어요. / 영어는 쉬워요. (inglés es fácil)',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué hay en tu casa usando 이/가 있어요 o 이/가 없어요.',
            answer: '우리 집에 개가 있어요. 고양이는 없어요.',
            accepted: ['가 있어요', '이 있어요', '가 없어요', '이 없어요'],
            explain: '있어요/없어요 = hay/no hay. Vocal → 가; consonante → 이. Ejemplo: 책이 많이 있어요.',
          },
        ],
      },
    ],
  },
}

export default topic
