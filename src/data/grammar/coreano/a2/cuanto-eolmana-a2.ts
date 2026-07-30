import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'cuanto-eolmana-a2',
  order: '20',
  color: '#c60c30',
  category: 'Adverbios',
  level: 'A2',
  title: '얼마나 en coreano A2: cuánto, qué tan, hasta qué punto',
  shortTitle: '얼마나 (cuánto/qué tan)',
  metaTitle: 'Cuánto en coreano A2 — 얼마나, preguntas de grado y cantidad',
  description:
    '얼마나 es el adverbio interrogativo que pregunta por grado, cantidad o duración en coreano. Se usa para preguntar "¿cuánto?", "¿qué tan...?", "¿cuánto tiempo...?". Se combina con adjetivos (얼마나 커요?), adverbios de frecuencia (얼마나 자주?) y verbos de tiempo (얼마나 걸려요?). En oraciones subordinadas se usa con -(으)ㄴ/는지 para expresar indirección.',
  lead: '얼마나 걸려요?: la pregunta de grado y duración más útil del coreano.',
  outcomes: [
    'Preguntar con 얼마나 + adjetivo (qué tan + adj)',
    'Preguntar duración con 얼마나 걸려요?',
    'Preguntar frecuencia con 얼마나 자주?',
    'Usar 얼마나 en oraciones subordinadas con -(으)ㄴ/는지',
  ],

  guide: {
    goal: 'Usar 얼마나 para preguntar por grado, cantidad, duración y frecuencia en coreano.',
    model: '얼마나 걸려요? (¿Cuánto se tarda?) / 얼마나 자주 운동해요? (¿Con qué frecuencia haces ejercicio?)',
    formula: '얼마나 + Adj/Adv? | 얼마나 + V-는지 (indirecto)',
    decisions: [
      '얼마나 + adjetivo: "얼마나 커요?" = ¿Qué tan grande es? / "얼마나 어려워요?" = ¿Qué tan difícil?',
      '얼마나 + 자주: "얼마나 자주 가요?" = ¿Con qué frecuencia vas?',
      '얼마나 걸려요?: ¿Cuánto tiempo se tarda? (la pregunta de duración más frecuente)',
      '얼마나 + 됐어요?: "얼마나 됐어요?" = ¿Cuánto tiempo hace? / ¿Desde hace cuánto?',
      'Indirecto con -는지: "얼마나 걸리는지 알아요?" = ¿Sabes cuánto tarda?',
    ],
    table: [
      ['Pregunta', 'Estructura', 'Ejemplo'],
      ['Grado (qué tan)', '얼마나 + Adj?', '얼마나 비싸요?'],
      ['Duración (cuánto tarda)', '얼마나 걸려요?', '서울까지 얼마나 걸려요?'],
      ['Frecuencia (con qué freq.)', '얼마나 자주 + V?', '얼마나 자주 연락해요?'],
    ],
    mistakes: [
      '"얼마나 크다요?" ❌ → "얼마나 커요?" ✓ — 얼마나 va con la forma polite -아/어요.',
      '"얼마나 걸려요?" se puede responder con: "30분 걸려요" (tarda 30 minutos).',
      '"얼마나 됐어요?" ≠ "얼마나 걸려요?" —됐어요 = tiempo transcurrido; 걸려요 = tiempo necesario.',
    ],
  },

  seo: [
    {
      heading: '¿Qué significa 얼마나 en coreano?',
      paragraphs: [
        '얼마나 es el equivalente coreano de "¿cuánto?", "¿qué tan...?" y "¿cuánto tiempo?". Es uno de los adverbios interrogativos más frecuentes en el coreano cotidiano. "얼마나 걸려요?" (¿Cuánto se tarda?) es una de las preguntas más útiles que aprenderás en nivel A2.',
        'Con adjetivos: "얼마나 멀어요?" (¿Qué tan lejos está?), "얼마나 어려워요?" (¿Qué tan difícil es?), "얼마나 좋아요?" (¿Qué tan bueno es?). La estructura es directa: 얼마나 + adjetivo conjugado + ?',
      ],
    },
    {
      heading: '¿Cómo se pregunta cuánto tarda algo en coreano (얼마나 걸려요)?',
      paragraphs: [
        '"얼마나 걸려요?" se usa para preguntar el tiempo necesario para hacer algo o llegar a algún lugar. Respuesta típica: "한 시간쯤 걸려요" (tarda aproximadamente una hora). "얼마나 됐어요?" pregunta cuánto tiempo ha pasado desde que algo ocurrió: "한국에 온 지 얼마나 됐어요?" (¿Cuánto tiempo llevas en Corea?).',
        'En oraciones subordinadas, 얼마나 se combina con -는지 / -(으)ㄴ지 / -(으)ㄹ지 para expresar "cuánto... (indirecto)": "얼마나 비싼지 몰라요" (No sé cuánto cuesta), "얼마나 걸리는지 알아요?" (¿Sabes cuánto se tarda?).',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre 얼마나 y 얼마예요 en coreano?',
      paragraphs: [
        '얼마나 (eolmana) pregunta por el GRADO o la cantidad de una acción o cualidad ("cuánto de..."): 얼마나 자주? (¿con qué frecuencia?), 얼마나 걸려요? (¿cuánto tarda?), 얼마나 멀어요? (¿qué tan lejos está?). 얼마 (eolma), en cambio, pregunta por el PRECIO: 얼마예요? (¿cuánto cuesta?), 이거 얼마예요? (¿cuánto vale esto?). La trampa para el hispanohablante es que en español "cuánto" cubre ambos; en coreano hay que distinguir: para dinero, 얼마; para grado/duración/frecuencia, 얼마나. Y 얼마나 suele acompañar a un adjetivo o adverbio (얼마나 비싸요? = ¿qué tan caro es?), mientras 얼마 va solo con el verbo 이다.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '얼마나: grado, duración y frecuencia en preguntas y oraciones subordinadas.',
    graphicPrompt: 'Persona mirando un reloj y un mapa, preguntando cuánto tiempo y qué tan lejos.',
    scene: [
      ['서울까지 얼마나 걸려요?', '¿Cuánto se tarda hasta Seúl?'],
      ['얼마나 자주 운동해요?', '¿Con qué frecuencia haces ejercicio?'],
      ['한국어가 얼마나 어려워요?', '¿Qué tan difícil es el coreano?'],
      ['여기에 온 지 얼마나 됐어요?', '¿Cuánto tiempo llevas aquí?'],
      ['얼마나 비싼지 알아요?', '¿Sabes cuánto cuesta?'],
      ['얼마나 멀어요? — 걸어서 10분이에요.', '¿Qué tan lejos está? — A 10 minutos a pie.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['얼마나 + Adj?', '얼마나 걸려요?', '얼마나 자주?', '얼마나 됐어요?'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la pregunta correcta con 얼마나',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta de 얼마나 según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Preguntas cuánto tiempo se tarda en ir al trabajo.',
            lines: [['', '회사까지 얼마나 ___?']],
            options: ['걸려요', '됐어요', '자주요', '많아요'],
            answer: '걸려요',
            explain: '"얼마나 걸려요?" = ¿Cuánto se tarda? La pregunta de duración más común.',
          },
          {
            scene: 'Preguntas con qué frecuencia va al gimnasio.',
            lines: [['', '헬스장에 얼마나 ___ 가요?']],
            options: ['자주', '걸려', '됐어', '많이'],
            answer: '자주',
            explain: '"얼마나 자주 가요?" = ¿Con qué frecuencia vas? (자주 = a menudo).',
          },
          {
            scene: 'Preguntas qué tan difícil es el examen.',
            lines: [['', '시험이 얼마나 ___?']],
            options: ['어려워요', '어려운지요', '어렵게요', '어렵어요'],
            answer: '어려워요',
            explain: '"얼마나 어려워요?" = ¿Qué tan difícil es? (어렵다 → 어려워요).',
          },
          {
            scene: 'Preguntas cuánto tiempo llevas estudiando coreano.',
            lines: [['', '한국어를 공부한 지 얼마나 ___?']],
            options: ['됐어요', '걸려요', '자주요', '돼요'],
            answer: '됐어요',
            explain: '"얼마나 됐어요?" = ¿Cuánto tiempo lleva/hace? (tiempo transcurrido).',
          },
          {
            scene: 'No sabes cuánto cuesta el billete.',
            lines: [['', '표가 얼마나 비싼___ 몰라요.']],
            options: ['지', '가', '는지', '서'],
            answer: '지',
            explain: '"얼마나 비싼지 몰라요" = No sé cuánto cuesta. -ㄴ지 en oración subordinada con adj.',
          },
          {
            scene: 'Preguntas qué tan lejos está la estación.',
            lines: [['', '역이 얼마나 ___?']],
            options: ['멀어요', '멀게요', '멀었어요', '멀은지요'],
            answer: '멀어요',
            explain: '"얼마나 멀어요?" = ¿Qué tan lejos está? (멀다 → 멀어요).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pregunta y respuesta con 얼마나',
        tag: '2 espacios',
        intro: 'Completa la pregunta con 얼마나 y la respuesta correspondiente.',
        type: 'dual',
        items: [
          {
            scene: 'Preguntas cuánto tarda y te dicen que una hora.',
            lines: [['', '얼마나 [[0]]? — 한 시간 [[1]].']],
            blanks: [
              { options: ['걸려요', '됐어요', '자주요', '멀어요'], answer: '걸려요', explain: '"얼마나 걸려요?" = ¿Cuánto se tarda? (걸리다 = tardar).' },
              { options: ['걸려요', '됐어요', '자주예요', '멀어요'], answer: '걸려요', explain: '"한 시간 걸려요" = tarda una hora.' },
            ],
          },
          {
            scene: 'Preguntas con qué frecuencia estudia y te dice que todos los días.',
            lines: [['', '얼마나 [[0]] 공부해요? — 매일 [[1]].']],
            blanks: [
              { options: ['자주', '걸려', '됐어', '많이'], answer: '자주', explain: '"얼마나 자주" = con qué frecuencia.' },
              { options: ['해요', '됐어요', '걸려요', '자주해요'], answer: '해요', explain: '"매일 해요" = lo hago todos los días.' },
            ],
          },
          {
            scene: 'Alguien pregunta qué tan fría está el agua y tú dices que muy fría.',
            lines: [['', '물이 얼마나 [[0]]? — 정말 많이 [[1]].']],
            blanks: [
              { options: ['차가워요', '차갑지요', '차갑게요', '차가운가요'], answer: '차가워요', explain: '"얼마나 차가워요?" = ¿Qué tan fría está? (차갑다 → 차가워요).' },
              { options: ['차가워요', '차갑어요', '차갑게요', '차가운지요'], answer: '차가워요', explain: '"정말 많이 차가워요" = está muy fría.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Conversación con 얼마나',
        tag: 'Texto guiado',
        intro: 'Completa el diálogo usando 얼마나 con el contexto correcto.',
        type: 'guidedText',
        scene: '새 친구를 만났어요. 여러 가지를 물어봐요.',
        text: '가: 한국에 온 지 얼마나 [[0]]? 나: 6개월 됐어요. 가: 한국어가 얼마나 [[1]]? 나: 생각보다 많이 어려워요. 가: 학교까지 얼마나 [[2]]? 나: 버스로 30분 걸려요. 가: 얼마나 [[3]] 한국어를 공부해요? 나: 매일 두 시간씩 해요.',
        blanks: [
          { options: ['됐어요', '걸려요', '자주요', '멀어요'], answer: '됐어요', explain: '"얼마나 됐어요?" = ¿Cuánto tiempo hace que...? (tiempo transcurrido).' },
          { options: ['어려워요', '걸려요', '됐어요', '자주요'], answer: '어려워요', explain: '"얼마나 어려워요?" = ¿Qué tan difícil es?' },
          { options: ['걸려요', '됐어요', '어려워요', '자주요'], answer: '걸려요', explain: '"얼마나 걸려요?" = ¿Cuánto se tarda?' },
          { options: ['자주', '많이', '걸려', '됐어'], answer: '자주', explain: '"얼마나 자주" = con qué frecuencia.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con 얼마나',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la pregunta correcta con 얼마나.',
        type: 'freeText',
        scene: '얼마나 표현을 완성하세요.',
        text: '집에서 역까지 얼마나 [[0]]? (cuánto tarda) / 한국어를 배운 지 얼마나 [[1]]? (cuánto tiempo) / 그 가방이 얼마나 [[2]]? (qué tan caro) / 얼마나 [[3]] 운동해요? (con qué frecuencia)',
        blanks: [
          { answer: '걸려요', explain: '"얼마나 걸려요?" = ¿Cuánto se tarda? (걸리다).' },
          { answer: '됐어요', explain: '"얼마나 됐어요?" = ¿Cuánto tiempo hace? (되다 = llegar a ser).' },
          { answer: '비싸요', explain: '"얼마나 비싸요?" = ¿Qué tan caro es? (비싸다 → 비싸요).' },
          { answer: '자주', explain: '"얼마나 자주 운동해요?" = ¿Con qué frecuencia haces ejercicio?' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye preguntas con 얼마나',
        tag: 'Escritura guiada',
        intro: 'Escribe la pregunta completa con 얼마나.',
        type: 'write',
        items: [
          {
            scene: 'Preguntas cuánto tiempo tarda en llegar al aeropuerto en taxi.',
            prompt: '택시로 공항까지... (얼마나 걸리다)',
            answer: '택시로 공항까지 얼마나 걸려요?',
            accepted: ['공항까지 택시로 얼마나 걸려요?'],
            explain: '"얼마나 걸려요?" = ¿Cuánto se tarda? Con medio de transporte + hasta + lugar.',
          },
          {
            scene: 'Preguntas con qué frecuencia tu amigo llama a su familia.',
            prompt: '가족에게 얼마나 자주... (전화하다)',
            answer: '가족에게 얼마나 자주 전화해요?',
            accepted: ['가족한테 얼마나 자주 전화해요?'],
            explain: '"얼마나 자주 전화해요?" = ¿Con qué frecuencia llamas?',
          },
          {
            scene: 'No sabes cuánto tiempo tarda en aprender japonés.',
            prompt: '일본어를 얼마나... (배우는지 알다 → negative)',
            answer: '일본어를 얼마나 배우는지 몰라요.',
            accepted: ['일본어 배우는 데 얼마나 걸리는지 몰라요.'],
            explain: '"얼마나 -는지 몰라요" = No sé cuánto... (subordinada indirecta).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Preguntas sobre tu vida con 얼마나',
        tag: 'Escritura libre',
        intro: 'Escribe preguntas y respuestas sobre tu vida usando 얼마나.',
        type: 'write',
        items: [
          {
            scene: 'Escribe 3 preguntas sobre tu vida diaria usando 얼마나.',
            prompt: '얼마나를 사용해서 자신의 생활에 대해 써 보세요.',
            answer: '집에서 회사까지 얼마나 걸려요? 30분 걸려요. 얼마나 자주 운동해요? 일주일에 세 번 해요. 한국어를 배운 지 얼마나 됐어요? 6개월 됐어요.',
            accepted: ['학교까지 얼마나 걸려요? 지하철로 20분 걸려요. 한국어가 얼마나 어려워요?'],
            explain: '얼마나 걸려요 = duración; 얼마나 자주 = frecuencia; 얼마나 됐어요 = tiempo transcurrido.',
          },
          {
            scene: 'Describe algo que haces con mucha frecuencia y algo que te tarda mucho.',
            prompt: '자주 하는 일과 오래 걸리는 일에 대해 써 보세요.',
            answer: '저는 매일 한국어를 공부해요. 얼마나 자주 하냐면, 하루에 두 번 해요. 한국어 문법을 배우는 데 얼마나 걸리는지 몰라요. 아마 몇 년 걸릴 것 같아요.',
            accepted: ['저는 주말마다 요리를 해요. 얼마나 자주 하냐면, 일주일에 두 번 해요.'],
            explain: '"얼마나 자주 하냐면" = con qué frecuencia lo hago es; combina 얼마나 con explicación.',
          },
        ],
      },
    ],
  },
}

export default topic
