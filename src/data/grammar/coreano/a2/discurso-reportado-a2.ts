import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'discurso-reportado-a2',
  order: '19',
  color: '#c60c30',
  category: 'Gramática',
  level: 'A2',
  title: 'Discurso indirecto en coreano A2: -다고 해요, -라고 해요',
  shortTitle: 'Discurso indirecto',
  metaTitle: 'Discurso indirecto en coreano A2 — -다고 해요, -냐고 해요, -라고 해요',
  description:
    'El discurso indirecto en coreano se forma añadiendo -다고 해요 (para afirmaciones), -냐고 해요 (para preguntas) y -(으)라고 해요 (para órdenes/peticiones) al verbo reportado. Permite referir lo que alguien dijo sin usar citas directas. Es esencial para el coreano A2-B1.',
  lead: '친구가 피곤하다고 했어요: el discurso indirecto del coreano que reporta lo que otros dicen.',
  outcomes: [
    'Usar -다고 하다 para reportar afirmaciones e ideas',
    'Usar -냐고 하다 para reportar preguntas',
    'Usar -(으)라고 하다 para reportar órdenes o peticiones',
    'Transformar el discurso directo en indirecto correctamente',
  ],

  guide: {
    goal: 'Reportar lo que alguien dijo usando las terminaciones de discurso indirecto en coreano.',
    model: '"피곤해요" → 피곤하다고 했어요. (Dijo que estaba cansado.) / "오세요" → 오라고 했어요. (Dijo que viniera.)',
    formula: 'Presente: V-다고 하다 | Adj-다고 하다 | Pregunta: V-냐고 하다 | Orden: V-(으)라고 하다',
    decisions: [
      'Afirmación presente: 먹어요 → 먹는다고 해요 (verbo) | 피곤해요 → 피곤하다고 해요 (adjetivo)',
      'Afirmación pasada: 먹었어요 → 먹었다고 해요',
      'Pregunta indirecta: 어디 가요? → 어디 가냐고 물었어요',
      'Orden indirecta: 오세요 → 오라고 했어요; 먹으세요 → 먹으라고 했어요',
      'El verbo de reporte: 하다 (decir), 하다 → 물었어요 (preguntar), 전했어요 (transmitió)',
    ],
    table: [
      ['Tipo', 'Terminación', 'Ejemplo'],
      ['Afirmación (V)', '-는다고 해요', '먹는다고 해요 (dice que come)'],
      ['Afirmación (Adj)', '-다고 해요', '예쁘다고 해요 (dice que es bonita)'],
      ['Pregunta', '-냐고 해요', '어디 가냐고 물었어요 (preguntó dónde iba)'],
    ],
    mistakes: [
      '"피곤해다고 해요" ❌ → "피곤하다고 해요" ✓ — el adjetivo vuelve a su forma diccionario.',
      '"와요다고 해요" ❌ → "온다고 해요" ✓ — verbos en -아요/-어요 → forma diccionario + -ㄴ/는다고.',
      '"오세요라고 해요" ❌ → "오라고 해요" ✓ — con órdenes se usa -(으)라고 (no 세요라고).',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se reporta lo que alguien dijo en coreano?',
      paragraphs: [
        'En coreano, para reportar lo que alguien dijo, se transforma la oración original. Para afirmaciones: el verbo vuelve a su forma diccionario y se añade -는다고 (verbos de acción) o -다고 (adjetivos y ser/estar): "친구가 피곤하다고 했어요" (Mi amigo dijo que estaba cansado). Para pasado: -었다고: "먹었다고 했어요" (dijo que había comido).',
        'Para preguntas: -냐고 묻다/물어보다: "어디 가냐고 물었어요" (preguntó dónde iba). Para órdenes: -(으)라고 하다: "오라고 했어요" (dijo que viniera). Estas estructuras son esenciales para el coreano intermedio.',
      ],
    },
    {
      heading: '¿Cómo cambia el discurso indirecto según verbo o adjetivo en coreano?',
      paragraphs: [
        'La forma del discurso indirecto para verbos de acción y adjetivos es diferente: verbos de acción usan -는다고 (presente): "공부한다고 해요" (dice que estudia). Los adjetivos (verbos descriptivos) usan solo -다고: "크다고 해요" (dice que es grande), "좋다고 해요" (dice que es bueno).',
        'Con el verbo 이다 (ser): "학생이라고 해요" (dice que es estudiante). La forma -라고 se usa también para 이다 en el discurso indirecto de afirmación.',
      ],
    },
    {
      heading: '¿Qué terminaciones usa el discurso indirecto en coreano?',
      paragraphs: [
        'El coreano no cambia los tiempos como el español (no hay "concordancia de tiempos"): añade una terminación de cita según el TIPO de oración. Afirmaciones con verbo → -(ㄴ/는)다고 하다: 간다고 했어요 (dijo que iba). Afirmaciones con adjetivo → -다고 하다: 예쁘다고 했어요 (dijo que era bonita). Preguntas → -냐고 하다: 가냐고 물었어요 (preguntó si iba). Órdenes → -(으)라고 하다: 가라고 했어요 (dijo que fuera). Propuestas → -자고 하다: 가자고 했어요 (dijo de ir juntos). En el habla, 하다 suele contraerse (간대요, 예쁘대요). La dificultad para el hispanohablante es elegir la terminación por el tipo de frase original, no por el tiempo verbal.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Discurso indirecto: -다고 (afirmación), -냐고 (pregunta), -(으)라고 (orden).',
    graphicPrompt: 'Dos personas: una reportando lo que dijo una tercera, con flechas de discurso indirecto.',
    scene: [
      ['친구가 피곤하다고 했어요.', 'Mi amigo dijo que estaba cansado.'],
      ['선생님이 숙제를 내라고 했어요.', 'El profesor dijo que hiciéramos los deberes.'],
      ['어디 가냐고 물었어요.', 'Preguntó adónde iba.'],
      ['엄마가 일찍 오라고 했어요.', 'Mi mamá dijo que viniera pronto.'],
      ['그 영화가 재미있다고 들었어요.', 'Escuché que esa película es interesante.'],
      ['내일 비가 온다고 해요.', 'Dicen que mañana va a llover.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-다고 해요 (afirmación)', '-냐고 물었어요 (pregunta)', '-(으)라고 했어요 (orden)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la terminación correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la terminación de discurso indirecto correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Tu amigo dijo que estaba cansado.',
            lines: [['', '친구가 피곤___ 했어요.']],
            options: ['하다고', '하다라고', '하라고', '하냐고'],
            answer: '하다고',
            explain: '"피곤하다고 했어요" = dijo que estaba cansado. Adjetivo → -다고.',
          },
          {
            scene: 'El profesor dijo que vinieras.',
            lines: [['', '선생님이 오___ 했어요.']],
            options: ['라고', '다고', '냐고', '기로'],
            answer: '라고',
            explain: '"오라고 했어요" = dijo que vinieras. Orden → -(으)라고.',
          },
          {
            scene: 'Preguntó qué estabas comiendo.',
            lines: [['', '뭘 먹___ 물었어요.']],
            options: ['냐고', '다고', '라고', '기로'],
            answer: '냐고',
            explain: '"뭘 먹냐고 물었어요" = preguntó qué comías. Pregunta → -냐고.',
          },
          {
            scene: 'Dicen que mañana va a llover.',
            lines: [['', '내일 비가 온___ 해요.']],
            options: ['다고', '라고', '냐고', '기로'],
            answer: '다고',
            explain: '"온다고 해요" = dicen que viene. Verbo de acción presente → -는다고 (pero 온다 = oye 오다 → 온다고).',
          },
          {
            scene: 'Mi madre preguntó dónde había ido.',
            lines: [['', '어머니가 어디 갔___ 물으셨어요.']],
            options: ['냐고', '다고', '라고', '기로'],
            answer: '냐고',
            explain: '"어디 갔냐고 물으셨어요" = preguntó dónde había ido. Pregunta indirecta → -냐고.',
          },
          {
            scene: 'Escuché que ese restaurante es delicioso.',
            lines: [['', '그 식당이 맛있___ 들었어요.']],
            options: ['다고', '라고', '냐고', '기로'],
            answer: '다고',
            explain: '"맛있다고 들었어요" = escuché que es delicioso. 맛있다 + -다고.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Transforma el discurso directo',
        tag: '2 espacios',
        intro: 'Transforma el discurso directo en indirecto.',
        type: 'dual',
        items: [
          {
            scene: '"배고파요" → 친구가 배고프___ 했어요.',
            lines: [['', '친구가 배고프[[0]] 했어요. 밥을 먹[[1]] 했어요.']],
            blanks: [
              { options: ['다고', '라고', '냐고', '기로'], answer: '다고', explain: '"배고프다고" = dijo que tenía hambre. Adjetivo → -다고.' },
              { options: ['자고', '다고', '라고', '냐고'], answer: '자고', explain: '"먹자고 했어요" = dijo que comiéramos (-자고 = propuesta indirecta).' },
            ],
          },
          {
            scene: '"빨리 오세요" + "왜 늦었어요?" → orden + pregunta',
            lines: [['', '선생님이 빨리 오[[0]] 했어요. 왜 늦었[[1]] 물으셨어요.']],
            blanks: [
              { options: ['라고', '다고', '냐고', '기로'], answer: '라고', explain: '"빨리 오라고 했어요" = dijo que viniera rápido. Orden → -라고.' },
              { options: ['냐고', '다고', '라고', '기로'], answer: '냐고', explain: '"왜 늦었냐고 물으셨어요" = preguntó por qué llegó tarde. Pregunta → -냐고.' },
            ],
          },
          {
            scene: '"한국어를 공부해요" + "어려워요?" → afirmación + pregunta',
            lines: [['', '그 사람이 한국어를 공부한[[0]] 했어요. 어렵[[1]] 물었어요.']],
            blanks: [
              { options: ['다고', '라고', '냐고', '기로'], answer: '다고', explain: '"공부한다고 했어요" = dijo que estudia coreano. V presente → -ㄴ다고.' },
              { options: ['냐고', '다고', '라고', '기로'], answer: '냐고', explain: '"어렵냐고 물었어요" = preguntó si era difícil.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Reportando una conversación',
        tag: 'Texto guiado',
        intro: 'Reporta la conversación usando el discurso indirecto.',
        type: 'guidedText',
        scene: '지혜가 어머니와의 대화를 친구에게 전해요.',
        text: '어머니가 일찍 집에 오[[0]] 했어요. 그리고 숙제를 했[[1]] 물으셨어요. 밥이 준비됐[[2]] 말씀하셨어요. 그냥 쉬[[3]] 하셨어요.',
        blanks: [
          { options: ['라고', '다고', '냐고', '기로'], answer: '라고', explain: '"오라고 했어요" = dijo que viniera (orden).' },
          { options: ['냐고', '다고', '라고', '기로'], answer: '냐고', explain: '"숙제를 했냐고" = preguntó si hice los deberes.' },
          { options: ['다고', '라고', '냐고', '기로'], answer: '다고', explain: '"준비됐다고" = dijo que la comida estaba lista.' },
          { options: ['라고', '다고', '냐고', '기로'], answer: '라고', explain: '"쉬라고" = dijo que descansara (orden).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Transforma al discurso indirecto',
        tag: 'Texto libre',
        intro: 'Sin opciones: transforma la oración directa en indirecta.',
        type: 'freeText',
        scene: '직접 화법을 간접 화법으로 바꾸세요.',
        text: '"피곤해요" → 피곤[[0]] 했어요. / "오세요" → 오[[1]] 했어요. / "어디 가요?" → 어디 가[[2]] 물었어요.',
        blanks: [
          { answer: '하다고', explain: '"피곤하다고 했어요" = dijo que estaba cansado.' },
          { answer: '라고', explain: '"오라고 했어요" = dijo que viniera (orden).' },
          { answer: '냐고', explain: '"어디 가냐고 물었어요" = preguntó adónde iba.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Reporta mensajes',
        tag: 'Escritura guiada',
        intro: 'Reporta el mensaje usando el discurso indirecto.',
        type: 'write',
        items: [
          {
            scene: '"내일 비가 올 거예요" → discurso indirecto',
            prompt: '"내일 비가 올 거예요" → 뉴스에서 내일 비가...',
            answer: '뉴스에서 내일 비가 올 거라고 했어요.',
            accepted: ['뉴스에서 내일 비가 온다고 했어요.'],
            explain: '미래(-ㄹ 거예요) → -ㄹ 거라고 했어요 (discurso indirecto de futuro).',
          },
          {
            scene: '"조용히 하세요" → el profesor lo dijo',
            prompt: '선생님이 조용히...',
            answer: '선생님이 조용히 하라고 했어요.',
            accepted: ['선생님이 조용히 하라고 말씀하셨어요.'],
            explain: '"하세요" → "하라고" = discurso indirecto de orden.',
          },
          {
            scene: '"이 음식이 맛있어요?" → alguien preguntó',
            prompt: '친구가 이 음식이...',
            answer: '친구가 이 음식이 맛있냐고 물었어요.',
            accepted: ['친구가 이 음식이 맛있냐고 했어요.'],
            explain: '맛있어요? → 맛있냐고 물었어요 = discurso indirecto de pregunta.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Reporta conversaciones reales',
        tag: 'Escritura libre',
        intro: 'Reporta algo que alguien te dijo usando el discurso indirecto.',
        type: 'write',
        items: [
          {
            scene: 'Reporta algo que te dijo un amigo hoy o ayer.',
            prompt: '친구가 뭐라고 했어요? 간접 화법으로 써 보세요.',
            answer: '친구가 오늘 영화를 보자고 했어요. 그리고 맛있는 식당을 알고 있다고 했어요.',
            accepted: ['친구가 시험이 어렵다고 했어요. 같이 공부하자고 했어요.'],
            explain: '-다고/-냐고/-(으)라고/-자고 = discurso indirecto según el tipo de frase.',
          },
          {
            scene: 'Reporta una orden o petición que alguien te hizo.',
            prompt: '누가 뭔가를 하라고 했어요? 써 보세요.',
            answer: '어머니가 방을 청소하라고 하셨어요. 선생님이 숙제를 제출하라고 하셨어요.',
            accepted: ['친구가 일찍 오라고 했어요.'],
            explain: '"V라고 하셨어요/했어요" = reportar una orden que alguien dio.',
          },
        ],
      },
    ],
  },
}

export default topic
