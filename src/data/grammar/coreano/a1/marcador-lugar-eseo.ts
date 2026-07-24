import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'marcador-lugar-eseo',
  order: '09',
  color: '#c60c30',
  category: 'Partículas',
  level: 'A1',
  title: 'Partícula 에서 (eseo) en Coreano A1 — Lugar de Acción',
  shortTitle: 'Lugar 에서 (acción)',
  metaTitle: 'Partícula 에서 coreano A1 — lugar donde ocurre la acción',
  description:
    '에서 (eseo) marca el lugar donde ocurre una acción: estudiar, comer, trabajar, etc. Es diferente de 에 que marca destino o ubicación estática. La diferencia entre 에 y 에서 es uno de los contrastes más importantes del coreano A1.',
  lead: '에서 = "en" (donde haces algo). 카페에서 공부해요 (estudio en el café). Diferencia clave: 에 = adónde vas o dónde estás; 에서 = dónde HACES algo activamente.',
  outcomes: [
    'Usa 에서 para marcar el lugar donde ocurre una acción',
    'Distingue 에서 (acción) de 에 (destino/existencia)',
    'Construye oraciones con lugar de acción en estructura SOV',
  ],

  guide: {
    goal: 'Usar 에서 para indicar el lugar donde se realiza una acción en coreano A1.',
    model: '카페에서 공부해요. (Estudio en el café.) / 집에서 먹어요. (Como en casa.)',
    formula: '[Lugar]에서 + verbo de acción',
    decisions: [
      '에서 va con verbos de acción: 공부해요, 먹어요, 일해요, 운동해요, 마셔요',
      '에 va con verbos de existencia o movimiento: 있어요, 없어요, 가요, 와요',
      'Truco: "에서" tiene "-서" — como "서다" (estar de pie, activo). Indica acción activa.',
      'Pregunta de lugar: 어디에서? o 어디서? (¿dónde?) para acciones',
      'En coloquial 에서 → 서: 카페서 공부해요 (omisión informal de 에)',
    ],
    table: [
      ['Partícula', 'Uso', 'Ejemplo'],
      ['에', 'Destino (ir, venir)', '학교에 가요 (voy a la escuela)'],
      ['에', 'Existencia (estar, haber)', '학교에 있어요 (estoy en la escuela)'],
      ['에서', 'Lugar de acción', '학교에서 공부해요 (estudio en la escuela)'],
      ['에서', 'Origen (desde)', '서울에서 왔어요 (vine de Seúl)'],
    ],
    mistakes: [
      '"카페에 공부해요" ❌ — 공부하다 es acción → 에서: "카페에서 공부해요" ✓',
      '"집에서 가요" ❌ — 가다 (ir) es movimiento a destino → 에: "집에 가요" ✓',
      '"도서관에서 있어요" ❌ — existencia usa 에: "도서관에 있어요" ✓',
    ],
  },

  seo: [
    {
      heading: '¿Qué es 에서 y cuándo usarlo?',
      paragraphs: [
        '에서 (eseo) marca el lugar donde se lleva a cabo una acción. Si alguien estudia, come, trabaja, hace ejercicio o cualquier otra actividad en un lugar, ese lugar lleva 에서: 카페에서 공부해요 (estudio en el café), 집에서 먹어요 (como en casa), 회사에서 일해요 (trabajo en la empresa).',
        'Un truco mnemotécnico útil: 에서 contiene -서, que recuerda a 서다 (ponerse de pie, hacer algo activamente). 에서 = lugar de actividad. 에 = lugar de presencia estática o destino.',
      ],
    },
    {
      heading: 'El gran contraste: 에 vs. 에서',
      paragraphs: [
        'Este es uno de los puntos donde más se equivocan los principiantes. La diferencia: 에 con 있어요 (estar/haber) indica que alguien o algo está en un lugar de forma estática. 에서 con verbos de acción indica que se hace algo en ese lugar activamente.',
        '학교에 있어요 = estoy en la escuela (simplemente estoy ahí). 학교에서 공부해요 = estudio en la escuela (realizo la acción de estudiar ahí). Misma palabra (학교), partícula distinta, significado distinto.',
      ],
      table: [
        ['Situación', 'Partícula', 'Oración'],
        ['Ir a la escuela (destino)', '에', '학교에 가요'],
        ['Estar en la escuela (existencia)', '에', '학교에 있어요'],
        ['Estudiar en la escuela (acción)', '에서', '학교에서 공부해요'],
      ],
    },
    {
      heading: '에서 para indicar origen: "desde"',
      paragraphs: [
        'Además del lugar de acción, 에서 también marca el origen o punto de partida de un movimiento: 서울에서 왔어요 (vine de Seúl), 어디에서 왔어요? (¿de dónde eres/viniste?). En este caso 에서 equivale a "de" o "desde" en español.',
        'Este segundo uso es muy común en presentaciones: 저는 콜롬비아에서 왔어요 (Soy de Colombia / vine de Colombia). Es la misma partícula 에서, pero en combinación con el verbo 오다 (venir) indica origen en vez de lugar de acción.',
      ],
    },
    {
      heading: 'Preguntar por el lugar: 어디에서? / 어디서?',
      paragraphs: [
        'Para preguntar dónde ocurre una acción se usa 어디에서? o su forma coloquial 어디서?: 어디에서 공부해요? (¿Dónde estudias?), 어디서 먹어요? (¿Dónde comes?). Para preguntar el origen: 어디에서 왔어요? (¿De dónde viniste?).',
        'En conversación coloquial, 에서 puede acortarse a -서: 카페서 공부해요, 집서 먹어요. Esto es informal y no se recomienda en escritura formal, pero lo oirás frecuentemente en k-dramas y conversaciones reales.',
      ],
    },
  ],

  visual: {
    mode: 'particles',
    teacherLens: 'Contraste 에 (destino/existencia) vs. 에서 (acción/origen) con ejemplos paralelos.',
    graphicPrompt: 'Dos columnas: 에 (flecha de destino + persona estática) vs. 에서 (persona activa estudiando/comiendo).',
    scene: [
      ['카페에서 공부해요', 'Estudio en el café. (acción → 에서)'],
      ['집에서 먹어요', 'Como en casa. (acción → 에서)'],
      ['학교에서 한국어를 배워요', 'Aprendo coreano en la escuela. (acción → 에서)'],
      ['집에 있어요', 'Estoy en casa. (existencia → 에)'],
      ['학교에 가요', 'Voy a la escuela. (destino → 에)'],
      ['서울에서 왔어요', 'Vine de Seúl. (origen → 에서)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['에서 acción', 'diferencia 에 vs 에서', '에서 origen'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige entre 에 y 에서 para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Estudiando',
            lines: [['Gael', '저는 도서관___ 공부해요. (Estudio en la biblioteca.)']],
            options: ['에서', '에', '를', '이'],
            answer: '에서',
            explain: '공부하다 = acción en lugar → 에서. 도서관에서 공부해요.',
          },
          {
            scene: 'Comiendo',
            lines: [['Ana', '저는 집___ 밥을 먹어요. (Como en casa.)']],
            options: ['에서', '에', '가', '이'],
            answer: '에서',
            explain: '먹다 = acción en lugar → 에서. 집에서 먹어요.',
          },
          {
            scene: 'Yendo',
            lines: [['Carlos', '저는 카페___ 가요. (Voy al café.)']],
            options: ['에', '에서', '를', '는'],
            answer: '에',
            explain: '가다 = ir a destino → 에. 카페에 가요.',
          },
          {
            scene: 'Ubicación',
            lines: [['Lina', '선생님이 교실___ 있어요. (El maestro está en el aula.)']],
            options: ['에', '에서', '이', '를'],
            answer: '에',
            explain: '있어요 = existencia → 에. 교실에 있어요.',
          },
          {
            scene: 'Trabajando',
            lines: [['Marco', '아버지가 회사___ 일해요. (Papá trabaja en la empresa.)']],
            options: ['에서', '에', '를', '가'],
            answer: '에서',
            explain: '일하다 = trabajar = acción en lugar → 에서. 회사에서 일해요.',
          },
          {
            scene: 'Origen',
            lines: [['Sofia', '저는 부카라망가___ 왔어요. (Vine de Bucaramanga.)']],
            options: ['에서', '에', '를', '가'],
            answer: '에서',
            explain: '오다 (venir) + origen → 에서. 부카라망가에서 왔어요.',
          },
          {
            scene: 'Ejercicio',
            lines: [['Nora', '저는 공원___ 운동해요. (Hago ejercicio en el parque.)']],
            options: ['에서', '에', '를', '은'],
            answer: '에서',
            explain: '운동하다 = hacer ejercicio = acción → 에서. 공원에서 운동해요.',
          },
          {
            scene: 'Preguntando',
            lines: [['Gael', '어디___ 공부해요? (¿Dónde estudias?)']],
            options: ['에서', '에', '를', '이'],
            answer: '에서',
            explain: 'Preguntar lugar de acción: 어디에서 공부해요? = ¿Dónde estudias?',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Lugar y acción',
        tag: '2 espacios',
        intro: 'Completa el lugar con 에서 y elige la acción correcta.',
        type: 'dual',
        items: [
          {
            scene: 'En la cafetería',
            lines: [['Carlos', '저는 카페[[0]] 커피를 [[1]]. (En el café bebo café.)']],
            blanks: [
              { options: ['에서', '에', '를', '이'], answer: '에서', explain: 'Acción (beber) en lugar → 에서.' },
              { options: ['마셔요', '가요', '있어요', '해요'], answer: '마셔요', explain: '마시다 → 마셔요. 카페에서 커피를 마셔요.' },
            ],
          },
          {
            scene: 'Haciendo tareas',
            lines: [['Ana', '저는 집[[0]] 숙제를 [[1]]. (En casa hago la tarea.)']],
            blanks: [
              { options: ['에서', '에', '가', '를'], answer: '에서', explain: 'Acción (hacer tarea) en lugar → 에서.' },
              { options: ['해요', '가요', '있어요', '마셔요'], answer: '해요', explain: '하다 → 해요. 집에서 숙제를 해요.' },
            ],
          },
          {
            scene: 'Presentándose',
            lines: [['Marco', '저는 콜롬비아[[0]] [[1]]. (Soy de Colombia.)']],
            blanks: [
              { options: ['에서', '에', '를', '이'], answer: '에서', explain: 'Origen con 오다 → 에서.' },
              { options: ['왔어요', '가요', '있어요', '해요'], answer: '왔어요', explain: '오다 → 왔어요 (pasado). 콜롬비아에서 왔어요.' },
            ],
          },
          {
            scene: 'Contrastando',
            lines: [
 ['Lina', '어디 [[0]]? (¿Adónde vas?)'],
 ['Sofia', '카페[[1]] 가요. (Voy al café.)'],
 ],
            blanks: [
              { options: ['가요', '있어요', '공부해요', '먹어요'], answer: '가요', explain: '가다 = ir. 어디 가요? = ¿Adónde vas?' },
              { options: ['에', '에서', '를', '이'], answer: '에', explain: 'Destino (ir al café) → 에. 카페에 가요.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa con 에 o 에서 según el uso.',
        type: 'guidedText',
        scene: 'El día de Sofia en la ciudad',
        text: '오전에 저는 집[[0]] 출발해요. 버스[[1]] 내려요. 도서관[[2]] 가요. 도서관[[3]] 한국어를 공부해요. 점심에 식당[[4]] 밥을 먹어요. 오후에 카페[[5]] 있어요.',
        blanks: [
          { options: ['에서', '에'], answer: '에서', explain: '집에서 출발해요 = salgo de casa. Origen → 에서.' },
          { options: ['에서', '에'], answer: '에서', explain: '버스에서 내려요 = bajo del autobús. Origen → 에서.' },
          { options: ['에', '에서'], answer: '에', explain: '도서관에 가요. Destino → 에.' },
          { options: ['에서', '에'], answer: '에서', explain: '도서관에서 공부해요. Acción → 에서.' },
          { options: ['에서', '에'], answer: '에서', explain: '식당에서 먹어요. Acción → 에서.' },
          { options: ['에', '에서'], answer: '에', explain: '카페에 있어요. Existencia → 에.' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe 에 o 에서 sin opciones.',
        type: 'freeText',
        scene: 'Describiendo dónde ocurren las cosas',
        text: '저는 학교[[0]] 공부해요. / 저는 집[[1]] 가요. / 저는 학교[[2]] 있어요. / 저는 식당[[3]] 밥을 먹어요. / 저는 서울[[4]] 왔어요.',
        blanks: [
          { answer: '에서', accepted: ['에서'], explain: '학교에서 공부해요. Acción → 에서.' },
          { answer: '에', accepted: ['에'], explain: '집에 가요. Destino → 에.' },
          { answer: '에', accepted: ['에'], explain: '학교에 있어요. Existencia → 에.' },
          { answer: '에서', accepted: ['에서'], explain: '식당에서 먹어요. Acción → 에서.' },
          { answer: '에서', accepted: ['에서'], explain: '서울에서 왔어요. Origen → 에서.' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones con 에서 indicando dónde realizas acciones.',
        type: 'write',
        items: [
          {
            scene: 'Lugar de estudio',
            prompt: 'Di "Estudio coreano en la biblioteca" (도서관=biblioteca, 한국어=coreano, 공부하다=estudiar).',
            answer: '저는 도서관에서 한국어를 공부해요.',
            accepted: ['도서관에서 한국어를 공부해요', '도서관에서 공부해요'],
            explain: 'Acción (estudiar) en lugar → 에서. SOV: 도서관에서 + 한국어를 + 공부해요.',
          },
          {
            scene: 'Comiendo',
            prompt: 'Di "Como en casa" (집=casa, 밥=arroz, 먹다=comer).',
            answer: '저는 집에서 밥을 먹어요.',
            accepted: ['집에서 밥을 먹어요', '집에서 먹어요'],
            explain: 'Acción (comer) en lugar → 에서. 집에서 먹어요.',
          },
          {
            scene: 'De dónde eres',
            prompt: 'Di de dónde eres en coreano: "Vine de ___" (오다 → 왔어요 pasado).',
            answer: '저는 콜롬비아에서 왔어요.',
            accepted: ['에서 왔어요'],
            explain: 'Origen con 오다 → 에서. [país]에서 왔어요.',
          },
          {
            scene: 'Diferenciando',
            prompt: 'Forma dos oraciones: "Voy al café" (destino) y "Estudio en el café" (acción).',
            answer: '카페에 가요. 카페에서 공부해요.',
            accepted: ['카페에 가요', '카페에서 공부해요', '카페에서 공부'],
            explain: 'Destino → 카페에 가요. Acción → 카페에서 공부해요. Diferencia 에 vs 에서.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe tu rutina indicando dónde realizas cada actividad con 에서.',
        type: 'write',
        items: [
          {
            scene: 'Dónde como',
            prompt: '어디에서 밥을 먹어요? (¿Dónde comes?) — responde con 에서.',
            answer: '저는 집에서 밥을 먹어요.',
            accepted: ['에서 먹어요', '에서 밥을 먹어요'],
            explain: 'Acción (comer) en lugar → 에서. 집에서 / 식당에서 / 학교에서.',
          },
          {
            scene: 'Dónde estudio',
            prompt: '어디에서 공부해요? (¿Dónde estudias?) — responde con 에서.',
            answer: '저는 도서관에서 공부해요.',
            accepted: ['에서 공부해요'],
            explain: '공부하다 = acción → 에서. 도서관에서 / 카페에서 / 집에서.',
          },
          {
            scene: 'De dónde eres',
            prompt: '어디에서 왔어요? (¿De dónde eres?) — responde con [lugar]에서 왔어요.',
            answer: '저는 콜롬비아에서 왔어요.',
            accepted: ['에서 왔어요'],
            explain: 'Origen → 에서. [país/ciudad]에서 왔어요.',
          },
        ],
      },
    ],
  },
}

export default topic
