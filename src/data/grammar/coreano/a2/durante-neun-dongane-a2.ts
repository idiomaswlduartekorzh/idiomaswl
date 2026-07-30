import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'durante-neun-dongane-a2',
  order: '11',
  color: '#c60c30',
  category: 'Sintaxis',
  level: 'A2',
  title: '는/은 동안에 en coreano A2: durante, mientras',
  shortTitle: '동안에 (durante)',
  metaTitle: 'Durante y mientras en coreano A2 — 동안에, 는 동안에',
  description:
    'La expresión 동안에 (dongan-e) indica que dos acciones ocurren simultáneamente o durante un período de tiempo. Con sustantivos se usa directamente: 수업 동안에 (durante la clase). Con verbos, se añade 는/은 동안에 al tallo verbal. Es el equivalente coreano de "durante" y "mientras".',
  lead: '음악을 듣는 동안에 공부해요: el "mientras" coreano para acciones simultáneas.',
  outcomes: [
    'Usar 동안에 con sustantivos de tiempo para expresar "durante"',
    'Usar 는 동안에 con verbos para expresar "mientras (se hace algo)"',
    'Distinguir 동안에 (durante/mientras) de 후에 (después de)',
    'Construir oraciones de dos acciones simultáneas en coreano',
  ],

  guide: {
    goal: 'Expresar duración y simultaneidad de acciones usando 동안에 y 는 동안에.',
    model: '음악을 듣는 동안에 공부해요. (Estudio mientras escucho música.)',
    formula: 'Sustantivo + 동안에 | Tallo verbal + 는/은 동안에 + cláusula principal',
    decisions: [
      'Con sustantivos: 한 시간 동안에 (durante una hora), 방학 동안에 (durante las vacaciones)',
      'Con verbos: tallo + 는 동안에 (terminación -는 para presente/habitual)',
      '여름 방학 동안에 → 동안에 puede contraerse a 동안 en el habla coloquial',
      'El sujeto de las dos cláusulas puede ser el mismo o diferente',
      'Diferencia: 동안에 (durante el período) vs 동시에 (al mismo tiempo — más enfático)',
    ],
    table: [
      ['Estructura', 'Ejemplo', 'Español'],
      ['N + 동안에', '수업 동안에 집중해요', 'Me concentro durante la clase'],
      ['V-는 동안에', '먹는 동안에 말하지 마세요', 'No hables mientras comes'],
      ['시간 + 동안에', '두 시간 동안에 공부했어요', 'Estudié durante dos horas'],
    ],
    mistakes: [
      '"공부 동안에" ❌ (verbo sin conjugar) → "공부하는 동안에" ✓ — los verbos necesitan la terminación -는.',
      '"한 시간 동안에 동안에" ❌ → "한 시간 동안에" ✓ — no se repite 동안에.',
      '"먹는 동안에 전화했어요" — cuidado con el sujeto: si son distintos, hay que especificar los dos sujetos.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se dice "durante" en coreano?',
      paragraphs: [
        '"Durante" en coreano se expresa con 동안에 (dongan-e). Con sustantivos temporales va directamente: "방학 동안에" (durante las vacaciones), "수업 동안에" (durante la clase), "한 시간 동안에" (durante una hora). El partícula 에 puede omitirse en el habla informal.',
        'Con verbos, se necesita la forma adjetival del verbo (tallo + 는): 먹다 → 먹는 + 동안에 = "mientras come". Esta construcción indica que dos acciones ocurren en paralelo temporal.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre 동안 y otras expresiones de duración?',
      paragraphs: [
        '"동안에" (durante/mientras) vs "후에" (después de) vs "전에" (antes de): "수업 동안에 집중해요" (me concentro durante la clase), "수업 후에 쉬어요" (descanso después de la clase), "수업 전에 준비해요" (me preparo antes de la clase).',
        '"동안에" implica simultaneidad o duración. No indica secuencia. Para secuencia ("primero X, luego Y"), use -고 나서 o -후에.',
      ],
    },
    {
      heading: '¿Cómo se forma -는 동안(에) en coreano?',
      paragraphs: [
        'Con la raíz del verbo + -는 동안(에) (-neun dongan(e)), que significa "mientras / durante el tiempo en que": 제가 공부하는 동안 (mientras estudio), 자는 동안에 (mientras duermo). Con un sustantivo se usa 동안 directamente: 방학 동안 (durante las vacaciones), 세 시간 동안 (durante tres horas). La partícula 에 es opcional y a menudo se omite en el habla. Ojo: 동안 expresa un periodo con duración; para "mientras" con simultaneidad puntual también existe -(으)면서 (dos acciones a la vez del mismo sujeto: 음악을 들으면서 공부해요 = estudio escuchando música), que no es intercambiable con 동안.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '동안에: simultaneidad y duración con sustantivos y verbos en -는 동안에.',
    graphicPrompt: 'Dos actividades superpuestas en el tiempo: música y estudio, mostrando simultanéidad.',
    scene: [
      ['음악을 듣는 동안에 공부해요.', 'Estudio mientras escucho música.'],
      ['수업 동안에 집중하세요.', 'Concéntrese durante la clase.'],
      ['밥을 먹는 동안에 말하지 마세요.', 'No hable mientras come.'],
      ['방학 동안에 여행할 거예요.', 'Viajaré durante las vacaciones.'],
      ['두 시간 동안에 기다렸어요.', 'Esperé durante dos horas.'],
      ['자는 동안에 꿈을 꿨어요.', 'Soñé mientras dormía.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['N + 동안에', 'V-는 동안에', 'simultaneidad de acciones'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la terminación correcta para 동안에.',
        type: 'choice',
        items: [
          {
            scene: 'Estudias durante dos horas.',
            lines: [['', '두 시간 ___ 공부했어요.']],
            options: ['동안에', '후에', '전에', '동시에'],
            answer: '동안에',
            explain: '"두 시간 동안에" = durante dos horas (duración con sustantivo de tiempo).',
          },
          {
            scene: 'No uses el teléfono mientras conduces.',
            lines: [['', '운전___ 동안에 핸드폰을 사용하지 마세요.']],
            options: ['하는', '해서', '하고', '하면'],
            answer: '하는',
            explain: '"운전하는 동안에" = mientras conduces. Tallo + -는 + 동안에.',
          },
          {
            scene: 'Durante las vacaciones viajé a Jeju.',
            lines: [['', '방학 ___ 제주도에 갔어요.']],
            options: ['동안에', '때문에', '후에', '전에'],
            answer: '동안에',
            explain: '"방학 동안에" = durante las vacaciones.',
          },
          {
            scene: 'Soñé mientras dormía.',
            lines: [['', '___ 동안에 꿈을 꿨어요.']],
            options: ['자는', '잔', '자면', '자고'],
            answer: '자는',
            explain: '"자는 동안에" = mientras dormía/duerme. Tallo 자- + -는.',
          },
          {
            scene: 'No comas mientras hablas.',
            lines: [['', '이야기하___ 동안에 먹지 마세요.']],
            options: ['는', 'ㄴ', '서', '고'],
            answer: '는',
            explain: '"이야기하는 동안에" = mientras hablas.',
          },
          {
            scene: 'Esperé durante 30 minutos.',
            lines: [['', '30분 ___ 기다렸어요.']],
            options: ['동안', '때', '후', '전'],
            answer: '동안',
            explain: '"30분 동안" = durante 30 minutos (동안 puede usarse sin 에 en habla informal).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Acción principal y simultánea',
        tag: '2 espacios',
        intro: 'Completa la acción simultánea y la principal.',
        type: 'dual',
        items: [
          {
            scene: 'Mientras ves la TV, comes popcorn.',
            lines: [['', 'TV를 [[0]] 동안에 팝콘을 [[1]].']],
            blanks: [
              { options: ['보는', '본', '보고', '보면'], answer: '보는', explain: '"보는 동안에" = mientras ves.' },
              { options: ['먹어요', '먹었어요', '먹을 거예요', '먹으세요'], answer: '먹어요', explain: '"팝콘을 먹어요" = comes popcorn (presente habitual).' },
            ],
          },
          {
            scene: 'Durante un año viví en Seúl.',
            lines: [['', '일 년 [[0]] 서울에서 [[1]].']],
            blanks: [
              { options: ['동안에', '후에', '전에', '때문에'], answer: '동안에', explain: '"일 년 동안에" = durante un año.' },
              { options: ['살았어요', '살아요', '살 거예요', '사세요'], answer: '살았어요', explain: '"살았어요" = viví (pasado).' },
            ],
          },
          {
            scene: 'Mientras cocinas, escucha música.',
            lines: [['', '요리[[0]] 동안에 음악을 [[1]].']],
            blanks: [
              { options: ['하는', '한', '하면', '하고'], answer: '하는', explain: '"요리하는 동안에" = mientras cocinas.' },
              { options: ['들으세요', '들어요', '들었어요', '들을 거예요'], answer: '들으세요', explain: '"들으세요" = escucha (imperativo de cortesía).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Rutina de estudio',
        tag: 'Texto guiado',
        intro: 'Completa la descripción de una rutina usando 동안에.',
        type: 'guidedText',
        scene: '지수가 공부 루틴을 설명해요.',
        text: '저는 공부[[0]] 동안에 음악을 들어요. 음악을 듣[[1]] 동안에 집중이 잘 돼요. 수업 [[2]] 동안에 핸드폰을 꺼요. 점심을 먹[[3]] 동안에 뉴스를 봐요. 방학 [[4]] 유럽 여행을 할 거예요.',
        blanks: [
          { options: ['하는', '한', '하면', '하고'], answer: '하는', explain: '"공부하는 동안에" = mientras estudio.' },
          { options: ['는', 'ㄴ', '면', '고'], answer: '는', explain: '"듣는 동안에" = mientras escucho.' },
          { options: ['동안에', '후에', '전에', '때'], answer: '동안에', explain: '"수업 동안에" = durante la clase.' },
          { options: ['는', 'ㄴ', '으면', '고'], answer: '는', explain: '"먹는 동안에" = mientras como.' },
          { options: ['동안에', '후에', '전에', '때문에'], answer: '동안에', explain: '"방학 동안에" = durante las vacaciones.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la estructura',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta con 동안에.',
        type: 'freeText',
        scene: '동안에 표현을 완성하세요.',
        text: '세 시간 [[0]] 영화를 봤어요. / 수업[[1]] 동안에 잠을 잤어요. / 운동[[2]] 동안에 음악을 들어요. / 한 달 [[3]] 한국어를 배웠어요.',
        blanks: [
          { answer: '동안에', explain: '"세 시간 동안에" = durante tres horas.' },
          { answer: '하는', explain: '"수업하는 동안에" = durante la clase / mientras tengo clase.' },
          { answer: '하는', explain: '"운동하는 동안에" = mientras hago ejercicio.' },
          { answer: '동안에', explain: '"한 달 동안에" = durante un mes.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Combina las dos acciones',
        tag: 'Escritura guiada',
        intro: 'Combina las dos acciones usando 는 동안에.',
        type: 'write',
        items: [
          {
            scene: '"음악을 들어요" + "공부해요" → 동안에로 연결',
            prompt: '음악을 듣는 동안에...',
            answer: '음악을 듣는 동안에 공부해요.',
            accepted: ['음악을 듣는 동안에 집중해요.'],
            explain: '"듣는 동안에" = mientras escucho. Tallo 듣- → irregular: 듣 + 는 = 듣는.',
          },
          {
            scene: '"자요" + "꿈을 꿔요" → 동안에로 연결',
            prompt: '자는 동안에...',
            answer: '자는 동안에 꿈을 꿔요.',
            accepted: ['자는 동안에 꿈을 자주 꿔요.'],
            explain: '"자는 동안에" = mientras duerme.',
          },
          {
            scene: '"여름 방학" + "아르바이트를 해요"',
            prompt: '여름 방학 동안에...',
            answer: '여름 방학 동안에 아르바이트를 해요.',
            accepted: ['여름 방학 동안에 여행을 할 거예요.'],
            explain: '"방학 동안에" = durante las vacaciones. Con sustantivo, no se necesita -는.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe tus acciones simultáneas',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones propias usando 동안에 y 는 동안에.',
        type: 'write',
        items: [
          {
            scene: 'Describe dos cosas que haces al mismo tiempo habitualmente.',
            prompt: '동안에를 사용해서 두 가지 동시에 하는 일을 써 보세요.',
            answer: '버스를 타는 동안에 책을 읽어요. 요리하는 동안에 팟캐스트를 들어요.',
            accepted: ['운동하는 동안에 음악을 들어요.'],
            explain: 'V-는 동안에 = mientras + acción simultánea en el coreano cotidiano.',
          },
          {
            scene: 'Describe lo que hiciste durante un período de tiempo específico.',
            prompt: '시간 + 동안에를 사용해서 과거 경험을 써 보세요.',
            answer: '대학교 4년 동안에 많이 배웠어요. 여름 방학 동안에 여행했어요.',
            accepted: ['한 달 동안에 한국어를 열심히 공부했어요.'],
            explain: '"기간 + 동안에" = durante + período de tiempo.',
          },
        ],
      },
    ],
  },
}

export default topic
