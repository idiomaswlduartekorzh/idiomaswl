import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'interrogativos',
  order: '11',
  color: '#c60c30',
  category: 'Sintaxis',
  level: 'A1',
  title: 'Palabras Interrogativas en Coreano A1',
  shortTitle: 'Interrogativos',
  metaTitle: 'Interrogativos coreano A1 — qué quién dónde cuándo cómo por qué',
  description:
    'Las palabras interrogativas del coreano van en la posición donde iría la respuesta — no se mueven al inicio de la frase como en español. 뭐 (qué), 누구 (quién), 어디 (dónde), 언제 (cuándo), 어떻게 (cómo), 왜 (por qué) son esenciales desde A1.',
  lead: '뭐(qué), 어디(dónde), 언제(cuándo), 누구(quién), 어떻게(cómo), 왜(por qué). SINGULARIDAD: van en la posición de la respuesta, NO al inicio como en español. El verbo sigue al final.',
  outcomes: [
    'Usa las 6 palabras interrogativas principales del coreano A1',
    'Coloca la interrogativa en la posición correcta (no al inicio)',
    'Forma preguntas simples manteniendo la estructura SOV',
  ],

  guide: {
    goal: 'Usar palabras interrogativas coreanas en la posición correcta de la oración.',
    model: '뭐 먹어요? (¿Qué comes?) / 어디 가요? (¿Adónde vas?) / 언제 와요? (¿Cuándo vienes?)',
    formula: '[Contexto] + [Interrogativa en posición de respuesta] + Verbo',
    decisions: [
      '뭐 / 무엇 = qué (뭐 más coloquial): 뭐 먹어요? / 무엇을 먹어요?',
      '어디 = dónde: 어디 가요? (¿adónde vas?)',
      '언제 = cuándo: 언제 와요? (¿cuándo vienes?)',
      '누구 = quién: 누구예요? (¿quién es?)',
      '어떻게 = cómo: 어떻게 해요? (¿cómo lo haces?)',
      '왜 = por qué: 왜 안 와요? (¿por qué no vienes?)',
      'Las interrogativas NO se mueven al inicio — van donde iría la respuesta',
    ],
    table: [
      ['Interrogativo', 'Romanización', 'Uso en frase'],
      ['뭐 / 무엇', 'mwo / mueot', '뭐 해요? (¿Qué haces?)'],
      ['어디', 'eodi', '어디 가요? (¿Adónde vas?)'],
      ['언제', 'eonje', '언제 와요? (¿Cuándo vienes?)'],
      ['누구', 'nugu', '누구예요? (¿Quién es?)'],
      ['어떻게', 'eotteoke', '어떻게 해요? (¿Cómo lo haces?)'],
      ['왜', 'wae', '왜 안 가요? (¿Por qué no vas?)'],
    ],
    mistakes: [
      '"어디를 가요?" es menos natural que "어디 가요?" — 가다 con destino usa 에, y la interrogativa puede ir sola',
      '"뭐를 먹어요" → en coloquial se contrae: "뭘 먹어요" ✓',
      'Las interrogativas NO cambian la posición del verbo — sigue al final: "어디 가요?" ✓ no "어디 ? 가요" ❌',
    ],
  },

  seo: [
    {
      heading: 'Las palabras interrogativas en coreano: una diferencia clave con el español',
      paragraphs: [
        'En español, las palabras interrogativas siempre van al inicio de la pregunta: "¿Qué comes?", "¿Dónde vas?". En coreano, las interrogativas van en la posición donde estaría la respuesta dentro de la oración — y el verbo sigue yendo al final.',
        '예시: 뭐 먹어요? = literalmente "qué comes?" (el interrogativo 뭐 está en posición de objeto, donde iría "arroz", "pizza", etc.). 어디 가요? = "adónde vas?" (어디 ocupa la posición del destino). Esta estructura SOV se mantiene incluso en preguntas.',
      ],
    },
    {
      heading: '뭐 vs 무엇: qué usar en cada contexto',
      paragraphs: [
        '뭐 (mwo) es la forma coloquial y más usada en conversación. 무엇 (mueot) es más formal. En A1 con compañeros o en clase, usa 뭐. Cuando 뭐 va con la partícula de objeto 를, se contrae: 뭐를 → 뭘. 뭘 먹어요? = ¿Qué comes? (más natural que 뭐를 먹어요).',
        'En la vida cotidiana oirás 뭐 constantemente: 뭐야? (¿qué es?), 뭐 해요? (¿qué haces?), 뭐 먹을래요? (¿qué vas a comer?). Es la interrogativa más frecuente del coreano.',
      ],
    },
    {
      heading: 'Preguntas de lugar: 어디 y 어디서',
      paragraphs: [
        '어디 (eodi) significa "dónde". Con verbos de movimiento (가다, 오다) se usa sin partícula o con 에: 어디 가요? / 어디에 가요? (¿adónde vas?). Para preguntar dónde ocurre una acción, se usa 어디서: 어디서 공부해요? (¿dónde estudias?), 어디서 먹어요? (¿dónde comes?).',
        'Esta distinción paralela 어디(에) vs 어디서 refleja la misma lógica de 에 (destino/existencia) vs 에서 (lugar de acción) que ya conoces de las partículas.',
      ],
    },
    {
      heading: 'Cuándo y cuántos: 언제 y 몇',
      paragraphs: [
        '언제 (eonje) pregunta por tiempo: 언제 와요? (¿cuándo vienes?), 언제 태어났어요? (¿cuándo naciste?). 몇 (myeot) es más específico — pregunta por número: 몇 시예요? (¿qué hora es? — lit. "cuántas horas es"), 몇 명이에요? (¿cuántas personas son?).',
        '얼마나 (eolmana) pregunta por cantidad o duración: 얼마나 걸려요? (¿cuánto tarda?), 얼마나 멀어요? (¿qué tan lejos está?). En A1 concéntrate en 언제 y 몇 como los más frecuentes para el tiempo.',
      ],
    },
  ],

  visual: {
    mode: 'questions',
    teacherLens: 'Interrogativos coreanos con posición SOV — interrogativa en lugar de la respuesta, verbo al final.',
    graphicPrompt: 'Tabla de interrogativos con ejemplos de preguntas y sus respuestas en coreano.',
    scene: [
      ['뭐 먹어요?', '¿Qué comes? (뭐 = objeto)'],
      ['어디 가요?', '¿Adónde vas? (어디 = destino)'],
      ['언제 와요?', '¿Cuándo vienes? (언제 = tiempo)'],
      ['누구예요?', '¿Quién es? (누구 = sujeto)'],
      ['어떻게 해요?', '¿Cómo lo haces? (어떻게 = modo)'],
      ['왜 안 가요?', '¿Por qué no vas? (왜 = causa)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['posición SOV de interrogativos', '뭐 vs 무엇', '어디 vs 어디서'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige el interrogativo correcto para cada pregunta.',
        type: 'choice',
        items: [
          {
            scene: 'Preguntando sobre comida',
            lines: [['Lina', '___ 먹어요? (¿Qué comes?)']],
            options: ['뭐', '어디', '언제', '왜'],
            answer: '뭐',
            explain: '뭐 = qué. 뭐 먹어요? = ¿Qué comes? (interrogativa en posición de objeto).',
          },
          {
            scene: 'Preguntando destino',
            lines: [['Carlos', '___ 가요? (¿Adónde vas?)']],
            options: ['어디', '뭐', '언제', '누구'],
            answer: '어디',
            explain: '어디 = dónde. 어디 가요? = ¿Adónde vas?',
          },
          {
            scene: 'Preguntando tiempo',
            lines: [['Ana', '___ 와요? (¿Cuándo vienes?)']],
            options: ['언제', '어디', '왜', '어떻게'],
            answer: '언제',
            explain: '언제 = cuándo. 언제 와요? = ¿Cuándo vienes?',
          },
          {
            scene: 'Preguntando identidad',
            lines: [['Gael', '저 사람이 ___ 예요? (¿Quién es esa persona?)']],
            options: ['누구', '뭐', '어디', '왜'],
            answer: '누구',
            explain: '누구 = quién. 누구예요? = ¿Quién es?',
          },
          {
            scene: 'Preguntando método',
            lines: [['Sofia', '한국어를 ___ 공부해요? (¿Cómo estudias coreano?)']],
            options: ['어떻게', '어디', '언제', '뭐'],
            answer: '어떻게',
            explain: '어떻게 = cómo. 어떻게 공부해요? = ¿Cómo estudias?',
          },
          {
            scene: 'Preguntando causa',
            lines: [['Marco', '___ 안 와요? (¿Por qué no vienes?)']],
            options: ['왜', '언제', '어떻게', '어디'],
            answer: '왜',
            explain: '왜 = por qué. 왜 안 와요? = ¿Por qué no vienes?',
          },
          {
            scene: 'Posición del interrogativo',
            lines: [['Sara', 'En coreano, ¿dónde va el interrogativo?']],
            options: ['En la posición de la respuesta', 'Siempre al inicio', 'Siempre al final', 'Después del verbo'],
            answer: 'En la posición de la respuesta',
            explain: 'Los interrogativos van donde iría la respuesta — el verbo sigue al final.',
          },
          {
            scene: 'Contracción coloquial',
            lines: [['Lina', '¿Cuál es la contracción coloquial de 뭐를?']],
            options: ['뭘', '뭐이', '뭐가', '뭐은'],
            answer: '뭘',
            explain: '뭐를 → 뭘 (contracción coloquial). 뭘 먹어요? más natural que 뭐를 먹어요.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Pregunta y respuesta',
        tag: '2 espacios',
        intro: 'Completa la pregunta con el interrogativo y la respuesta con el verbo.',
        type: 'dual',
        items: [
          {
            scene: 'Planes del fin de semana',
            lines: [
 ['Carlos', '주말에 [[0]] 해요? (¿Qué haces el fin de semana?)'],
 ['Ana', '한국어를 [[1]]. (Estudio coreano.)'],
 ],
            blanks: [
              { options: ['뭐', '어디', '언제', '왜'], answer: '뭐', explain: 'Preguntando actividad → 뭐. 뭐 해요?' },
              { options: ['공부해요', '가요', '먹어요', '있어요'], answer: '공부해요', explain: '공부하다 → 공부해요. Respuesta a 뭐 해요?' },
            ],
          },
          {
            scene: 'Después de clase',
            lines: [
 ['Gael', '수업 후에 [[0]] 가요? (¿Adónde vas después de clase?)'],
 ['Marco', '카페에 [[1]]. (Voy al café.)'],
 ],
            blanks: [
              { options: ['어디', '뭐', '언제', '누구'], answer: '어디', explain: 'Preguntando destino → 어디. 어디 가요?' },
              { options: ['가요', '있어요', '먹어요', '해요'], answer: '가요', explain: '가다 → 가요. 카페에 가요.' },
            ],
          },
          {
            scene: 'Citando a un amigo',
            lines: [
 ['Lina', '친구가 [[0]] 와요? (¿Cuándo viene el amigo?)'],
 ['Sofia', '내일 [[1]]. (Viene mañana.)'],
 ],
            blanks: [
              { options: ['언제', '어디', '왜', '뭐'], answer: '언제', explain: 'Preguntando tiempo → 언제.' },
              { options: ['와요', '가요', '해요', '먹어요'], answer: '와요', explain: '오다 → 와요. 내일 와요.' },
            ],
          },
          {
            scene: 'Conociendo a alguien',
            lines: [
 ['Carlos', '저 분이 [[0]]? (¿Quién es esa persona?)'],
 ['Gael', '저는 위런 선생님 데이비드[[1]]. (Soy Gael, maestro de WeLearn.)'],
 ],
            blanks: [
              { options: ['누구예요', '뭐예요', '어디예요', '언제예요'], answer: '누구예요', explain: '누구 + 예요 = ¿quién es? Preguntando identidad.' },
              { options: ['예요', '이에요', '있어요', '없어요'], answer: '예요', explain: '데이비드 termina en vocal → 예요.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa las preguntas con el interrogativo correcto.',
        type: 'guidedText',
        scene: 'Primera conversación entre estudiantes de WeLearn',
        text: '안녕하세요! [[0]] 이에요/예요? 저는 카를로스예요. [[1]] 에서 왔어요? 저는 콜롬비아에서 왔어요. [[2]] 한국어를 공부해요? 위런에서 공부해요. [[3]] 배우기 시작했어요? 6개월 전에요. [[4]] 한국어를 배워요? 한국에 가고 싶어서요.',
        blanks: [
          { options: ['성함이 뭐', '어디', '언제', '왜'], answer: '성함이 뭐', explain: '성함이 뭐예요? = ¿Cuál es su nombre? (뭐 para preguntar qué).' },
          { options: ['어디', '뭐', '언제', '왜'], answer: '어디', explain: '어디에서 왔어요? = ¿De dónde viniste?' },
          { options: ['어디', '어디서', '뭐', '언제'], answer: '어디서', explain: '어디서 공부해요? = ¿Dónde estudias? (lugar de acción).' },
          { options: ['언제', '어디', '뭐', '왜'], answer: '언제', explain: '언제 배우기 시작했어요? = ¿Cuándo empezaste a aprender?' },
          { options: ['왜', '어떻게', '어디', '뭐'], answer: '왜', explain: '왜 한국어를 배워요? = ¿Por qué aprendes coreano?' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe el interrogativo correcto sin opciones.',
        type: 'freeText',
        scene: 'Preguntas básicas de presentación',
        text: '[[0]] 이에요? (¿Qué es eso?) / [[1]] 가요? (¿Adónde vas?) / [[2]] 한국어를 공부해요? (¿Por qué estudias coreano?) / [[3]] 시예요? (¿Qué hora es? — lit. "cuántas horas") / [[4]] 해요? (¿Cómo lo haces?)',
        blanks: [
          { answer: '뭐', accepted: ['뭐', '무엇'], explain: '뭐 = qué. 뭐예요? / 무엇이에요?' },
          { answer: '어디', accepted: ['어디'], explain: '어디 = adónde/dónde. 어디 가요?' },
          { answer: '왜', accepted: ['왜'], explain: '왜 = por qué. 왜 공부해요?' },
          { answer: '몇', accepted: ['몇'], explain: '몇 시예요? = ¿Qué hora es? 몇 = cuántos/qué número.' },
          { answer: '어떻게', accepted: ['어떻게'], explain: '어떻게 = cómo. 어떻게 해요?' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Construye preguntas con los interrogativos correctos.',
        type: 'write',
        items: [
          {
            scene: 'Preguntando actividad',
            prompt: 'Pregunta "¿Qué haces hoy?" en coreano (오늘=hoy, 하다=hacer).',
            answer: '오늘 뭐 해요?',
            accepted: ['오늘 뭐 해요', '뭐 해요', '오늘 무엇을 해요'],
            explain: 'Interrogativo 뭐 en posición de objeto (antes del verbo). 오늘 뭐 해요?',
          },
          {
            scene: 'Preguntando destino',
            prompt: 'Pregunta "¿Adónde vas?" en coreano (가다=ir).',
            answer: '어디 가요?',
            accepted: ['어디 가요', '어디에 가요', '어디 가요?'],
            explain: '어디 = dónde/adónde. Posición de destino antes del verbo.',
          },
          {
            scene: 'Preguntando razón',
            prompt: 'Pregunta "¿Por qué no vienes?" en coreano (오다=venir, 안=negación).',
            answer: '왜 안 와요?',
            accepted: ['왜 안 와요', '왜 안 와요?'],
            explain: '왜 = por qué. 오다 → 와요. Negación: 안 + 와요. 왜 안 와요?',
          },
          {
            scene: 'Preguntando cómo',
            prompt: 'Pregunta "¿Cómo estudias coreano?" (어떻게=cómo, 한국어=coreano).',
            answer: '한국어를 어떻게 공부해요?',
            accepted: ['어떻게 공부해요', '한국어를 어떻게 공부해요'],
            explain: '어떻게 va en posición de modo. La estructura mantiene SOV.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Forma 3 preguntas distintas para conocer a un compañero de clase.',
        type: 'write',
        items: [
          {
            scene: 'Conociendo el nombre',
            prompt: '이름이 뭐예요? — Di esta pregunta y luego formula una similar con 어디.',
            answer: '이름이 뭐예요? 어디에서 왔어요?',
            accepted: ['뭐예요', '어디에서 왔어요', '어디서 왔어요'],
            explain: '이름이 뭐예요? = ¿Cuál es tu nombre? 어디에서 왔어요? = ¿De dónde eres?',
          },
          {
            scene: 'Planes de estudio',
            prompt: 'Pregunta cuándo estudia y por qué aprende coreano.',
            answer: '언제 한국어를 공부해요? 왜 한국어를 배워요?',
            accepted: ['언제 공부해요', '왜 배워요', '왜 한국어'],
            explain: '언제 = cuándo. 왜 = por qué. Ambos van en posición de la respuesta.',
          },
          {
            scene: 'Actividades',
            prompt: 'Pregunta qué hace el fin de semana y adónde va.',
            answer: '주말에 뭐 해요? 어디 가요?',
            accepted: ['뭐 해요', '어디 가요'],
            explain: '주말에 = el fin de semana. 뭐 = qué, 어디 = adónde. Estructura SOV mantenida.',
          },
        ],
      },
    ],
  },
}

export default topic
