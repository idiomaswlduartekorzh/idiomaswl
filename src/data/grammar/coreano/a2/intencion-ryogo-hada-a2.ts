import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'intencion-ryogo-hada-a2',
  order: '06',
  color: '#c60c30',
  category: 'Intenciones',
  level: 'A2',
  title: '-(으)려고 하다 Coreano A2 — Intencion y planes',
  shortTitle: '-(으)려고 하다',
  metaTitle: 'Coreano A2 — -(으)려고 하다 intencion y planes',
  description:
    '-(으)려고 하다 expresa intencion, plan o proposito en coreano. Equivale a "tengo la intencion de", "pienso", "voy a (plan)". Se forma con -려고 (vocal/ㄹ) o -으려고 (consonante) mas 하다 conjugado.',
  lead: 'Raiz + -려고 해요 (vocal/ㄹ) o + -으려고 해요 (consonante). Ejemplos: 먹으려고 해요 (Pienso comer). 가려고 해요 (Voy a ir). 공부하려고 해요 (Planeo estudiar).',
  outcomes: [
    'Expresar intenciones y planes con -(으)려고 하다',
    'Distinguir -려고 y -으려고 segun la raiz',
    'Usar el futuro 할 거예요 vs -(으)려고 해요',
    'Construir oraciones de proposito con -(으)려고 가다/오다',
  ],

  guide: {
    goal: 'Expresar intencion o plan con -(으)려고 하다, equivalente a "pienso hacer algo" o "planeo hacer algo".',
    model: '주말에 친구를 만나려고 해요 (Planeo encontrarme con un amigo el fin de semana) | 한국어를 배우려고 학원에 등록했어요 (Me registre en la academia para aprender coreano)',
    formula: 'Raiz + -려고 (vocal/ㄹ) | Raiz + -으려고 (consonante) | + 하다 conjugado',
    decisions: [
      'Identifica la raiz: quita -다 del infinitivo',
      'Si la raiz termina en vocal o ㄹ → añade -려고: 가다 → 가려고, 살다 → 살려고',
      'Si la raiz termina en consonante → añade -으려고: 먹다 → 먹으려고, 읽다 → 읽으려고',
      '+ 하다 conjugado: 해요 (presente/intencion), 했어요 (intencion pasada), 할 거예요 (intencion futura enfatica)',
      'Sin 하다: -(으)려고 solo puede preceder a verbos de movimiento: 가다, 오다, 나가다. Ejemplo: 밥 먹으려고 집에 갔어요 (Fui a casa a comer)',
      'Diferencia con 할 거예요: -(으)려고 해요 implica intencion planificada; 할 거예요 es prediccion o intencion menos comprometida',
    ],
    table: [
      ['Infinitivo', 'Raiz final', '-(으)려고'],
      ['가다 (ir)', 'vocal 가', '가려고'],
      ['먹다 (comer)', 'consonante 먹', '먹으려고'],
      ['살다 (vivir)', 'ㄹ 살', '살려고'],
      ['공부하다 (estudiar)', 'vocal 하', '공부하려고'],
      ['읽다 (leer)', 'consonante 읽', '읽으려고'],
    ],
    mistakes: [
      '"가으려고" — raiz vocal no necesita -으: 가다 → 가려고',
      '"먹려고" — raiz consonante necesita -으: 먹다 → 먹으려고',
      '"-(으)려고 + mandato" — NO se puede: ✗가려고 가세요. Solo con 하다 o verbos de movimiento',
    ],
  },

  seo: [
    {
      heading: '¿Como se usa -(으)려고 하다 en coreano?',
      paragraphs: [
        '-(으)려고 하다 es la expresion mas natural para hablar de planes e intenciones en coreano. La parte 하다 se conjuga normalmente: 해요 para el presente, 했어요 para el pasado (intencion que ya tenia), 할 거예요 para el futuro.',
        'Es importante que el sujeto de las dos clausulas sea el mismo: 나는 밥을 먹으려고 해요 (Yo pienso comer). No se puede cambiar de sujeto entre las dos partes.',
      ],
    },
    {
      heading: '-(으)려고 con verbos de movimiento',
      paragraphs: [
        'Cuando -(으)려고 precede a verbos de movimiento como 가다 (ir), 오다 (venir), 나가다 (salir), se usa sin 하다 para indicar el proposito del desplazamiento: 책을 사려고 서점에 갔어요 (Fui a la libreria a comprar un libro).',
        'Esta es una construccion muy frecuente en coreano cotidiano. Piensa en ella como "fui a [lugar] para [hacer algo]": 수업을 들으려고 학교에 왔어요 (Vine a la escuela para asistir a clase).',
      ],
      table: [
        ['Proposito', 'Movimiento', 'Oracion completa'],
        ['책을 사다 (comprar libro)', '서점에 가다', '책을 사려고 서점에 갔어요'],
        ['밥을 먹다 (comer)', '식당에 가다', '밥을 먹으려고 식당에 갔어요'],
        ['한국어를 배우다 (aprender)', '학원에 오다', '한국어를 배우려고 학원에 왔어요'],
      ],
    },
    {
      heading: '-(으)려고 해요 vs 할 거예요',
      paragraphs: [
        '-(으)려고 해요 indica una intencion planificada y consciente: 내일 운동하려고 해요 (Planeo hacer ejercicio manana — es mi plan). 할 거예요 puede ser mas espontaneo o predictivo: 내일 운동할 거예요 (Voy a hacer ejercicio manana — prediccion o intencion general).',
        'Cuando quieres enfatizar que algo es un plan firme, usa -(으)려고 해요. En conversacion casual ambas formas son aceptables.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-(으)려고 하다: vocal/ㄹ → -려고, consonante → -으려고. Con hada conjugado o con verbos de movimiento.',
    graphicPrompt: 'Persona mirando un calendario con globo de pensamiento: "plan" con flecha a accion futura.',
    scene: [
      ['한국에 가려고 해요', 'Planeo ir a Corea (가다 → 가려고)'],
      ['밥을 먹으려고 해요', 'Pienso comer (먹다 → 먹으려고)'],
      ['책을 사려고 서점에 갔어요', 'Fui a la libreria para comprar un libro'],
      ['한국어를 배우려고 학원에 등록했어요', 'Me registre en la academia para aprender coreano'],
      ['오늘 운동하려고 해요', 'Pienso hacer ejercicio hoy'],
      ['살려고 아파트를 찾고 있어요', 'Estoy buscando un apartamento para vivir'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-려고 vs -으려고', 'con 하다', 'con verbos de movimiento'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento de -(으)려고',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de -(으)려고 para cada verbo.',
        type: 'choice',
        items: [
          {
            scene: 'Planes de verano',
            lines: [['David', '이번 여름에 한국에 ___ (가다) 해요. (Planeo ir a Corea este verano.)']],
            options: ['가려고', '가으려고', '갔으려고', '가고려고'],
            answer: '가려고',
            explain: '가다 → raiz 가 (vocal) → 가려고. Sin -으.',
          },
          {
            scene: 'Hora de cenar',
            lines: [['Ana', '저녁에 피자를 ___ (먹다) 해요. (Pienso comer pizza en la cena.)']],
            options: ['먹으려고', '먹려고', '먹아려고', '먹어려고'],
            answer: '먹으려고',
            explain: '먹다 → raiz 먹 (consonante) → 먹으려고.',
          },
          {
            scene: 'Nuevo libro',
            lines: [['Carlos', '한국어 책을 ___ (읽다) 도서관에 갔어요. (Fui a la biblioteca para leer un libro de coreano.)']],
            options: ['읽으려고', '읽려고', '읽아려고', '읽어려고'],
            answer: '읽으려고',
            explain: '읽다 → raiz 읽 (consonante) → 읽으려고.',
          },
          {
            scene: 'Viajar a Europa',
            lines: [['Lina', '유럽에 ___ (살다) 비자를 신청했어요. (Solicite el visado para vivir en Europa.)']],
            options: ['살려고', '살으려고', '살아려고', '사으려고'],
            answer: '살려고',
            explain: '살다 → raiz 살 (ㄹ) → 살려고. ㄹ se trata como vocal.',
          },
          {
            scene: 'Aprender un idioma',
            lines: [['Marco', '스페인어를 ___ (배우다) 학원에 등록했어요. (Me registre en la academia para aprender espanol.)']],
            options: ['배우려고', '배우으려고', '배워려고', '배우아려고'],
            answer: '배우려고',
            explain: '배우다 → raiz 배우 (vocal ㅜ) → 배우려고.',
          },
          {
            scene: 'Preparacion fisica',
            lines: [['Sofia', '건강해지___ 해서 매일 운동해요. (Hago ejercicio a diario para estar mas sano.)']],
            options: ['지려고', '지으려고', '지아려고', '지어려고'],
            answer: '지려고',
            explain: '건강해지다 → raiz 건강해지 (vocal) → 건강해지려고.',
          },
          {
            scene: 'Estudio nocturno',
            lines: [['Zhanna', '시험을 준비하___ 매일 밤 공부해요. (Estudio todas las noches para prepararme para el examen.)']],
            options: ['하려고', '하으려고', '해려고', '하아려고'],
            answer: '하려고',
            explain: '준비하다 → raiz 준비하 (vocal) → 준비하려고.',
          },
          {
            scene: 'Reserva de restaurante',
            lines: [['David', '생일을 축하하___ 예약을 했어요. (Hice una reserva para celebrar el cumpleanos.)']],
            options: ['하려고', '하으려고', '해려고', '하이려고'],
            answer: '하려고',
            explain: '축하하다 → 축하하려고 (hada → -려고).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Dialogos con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los dialogos con -(으)려고 y la conjugacion de 하다.',
        type: 'dual',
        items: [
          {
            scene: 'Planes del fin de semana',
            lines: [
              ['Carlos', '주말에 뭐 하려고 해요? (¿Que planes tienes para el fin de semana?)'],
              ['Ana', '친구 집에 _[[0]]_ (가다) 해요. 같이 영화를 _[[1]]_ (보다) 거예요. (Pienso ir a casa de un amigo. Vamos a ver una pelicula juntos.)'],
            ],
            blanks: [
              { options: ['가려고', '가으려고', '갔으려고', '가이려고'], answer: '가려고', explain: '가다 → 가려고 (vocal).' },
              { options: ['볼', '보려고', '보아', '봤으려고'], answer: '볼', explain: 'Futuro declarativo: 보다 → 볼 거예요.' },
            ],
          },
          {
            scene: 'Razon de visita a la tienda',
            lines: [
              ['Zhanna', '어디 가요? (¿A donde vas?)'],
              ['Lina', '물건을 [[0]] (사다) 마트에 가요. 저녁에 요리를 [[1]] (하다) 재료가 필요해요. (Voy al supermercado a comprar cosas. Necesito ingredientes para cocinar en la tarde.)'],
            ],
            blanks: [
              { options: ['사려고', '사으려고', '샀으려고', '사이려고'], answer: '사려고', explain: '사다 → 사려고 (vocal ㅏ).' },
              { options: ['하려고', '하으려고', '해려고', '하아려고'], answer: '하려고', explain: '하다 → 하려고.' },
            ],
          },
          {
            scene: 'Motivation para estudiar',
            lines: [
              ['Marco', '왜 한국어를 공부해요? (¿Por que estudias coreano?)'],
              ['Sofia', '한국에 [[0]] (살다) 공부해요. 그리고 한국 회사에 [[1]] (취직하다) 싶어서요. (Estudio para vivir en Corea. Tambien porque quiero trabajar en una empresa coreana.)'],
            ],
            blanks: [
              { options: ['살려고', '살으려고', '사으려고', '살아려고'], answer: '살려고', explain: '살다 → 살려고 (ㄹ = como vocal).' },
              { options: ['취직하려고', '취직하으려고', '취직해려고', '취직하아려고'], answer: '취직하려고', explain: '취직하다 → 취직하려고.' },
            ],
          },
          {
            scene: 'Preparation para el examen',
            lines: [
              ['David', '다음 달에 뭐 할 거예요? (¿Que vas a hacer el proximo mes?)'],
              ['Carlos', 'TOPIK 시험을 [[0]] (보다) 공부를 많이 할 거예요. 시험에 [[1]] (합격하다) 정말 열심히 해야 해요. (Para tomar el examen TOPIK estudiare mucho. Para aprobar el examen tengo que esforzarme mucho.)'],
            ],
            blanks: [
              { options: ['보려고', '보으려고', '봤으려고', '보아려고'], answer: '보려고', explain: '보다 → 보려고 (vocal ㅗ).' },
              { options: ['합격하려고', '합격하으려고', '합격해려고', '합격하아려고'], answer: '합격하려고', explain: '합격하다 → 합격하려고.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con -(으)려고 en la forma correcta.',
        type: 'guidedText',
        scene: 'Los planes de Ana para el proximo ano',
        text: '내년에 한국에 [[0]] (가다) 요즘 준비를 열심히 하고 있어요. 우선 한국어를 더 잘 [[1]] (하다) 학원을 다니고 있어요. 비자를 [[2]] (받다) 서류를 모으고 있어요. 한국에서 아파트를 [[3]] (찾다) 인터넷을 열심히 보고 있어요. 열심히 준비해서 꿈을 [[4]] (이루다) 노력할 거예요.',
        blanks: [
          { options: ['가려고', '가으려고', '갔으려고', '가이려고'], answer: '가려고', explain: '가다 → 가려고 (vocal).' },
          { options: ['하려고', '하으려고', '해려고', '하아려고'], answer: '하려고', explain: '하다 → 하려고.' },
          { options: ['받으려고', '받려고', '받아려고', '받어려고'], answer: '받으려고', explain: '받다 → raiz 받 (consonante) → 받으려고.' },
          { options: ['찾으려고', '찾려고', '찾아려고', '찾어려고'], answer: '찾으려고', explain: '찾다 → raiz 찾 (consonante) → 찾으려고.' },
          { options: ['이루려고', '이루으려고', '이뤄려고', '이루아려고'], answer: '이루려고', explain: '이루다 → raiz 이루 (vocal) → 이루려고.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de -(으)려고 para cada verbo.',
        type: 'freeText',
        scene: 'Planes de diferentes estudiantes de WeLearn',
        text: '마르코는 살을 빼___ (빼다) 운동을 시작했어요. / 소피아는 스페인어를 가르치___ (가르치다) 대학에 지원했어요. / 카를로스는 책을 쓰___ (쓰다) 매일 연습해요. / 리나는 한국 음식을 만들___ (만들다) 요리 책을 샀어요. / 다비드는 새 노래를 외우___ (외우다) 계속 들어요.',
        blanks: [
          { answer: '빼려고', explain: '빼다 → raiz 빼 (vocal) → 빼려고.' },
          { answer: '가르치려고', explain: '가르치다 → raiz 가르치 (vocal) → 가르치려고.' },
          { answer: '쓰려고', explain: '쓰다 → raiz 쓰 (vocal ㅡ) → 쓰려고.' },
          { answer: '만들려고', explain: '만들다 → raiz 만들 (ㄹ) → 만들려고 (ㄹ = como vocal).' },
          { answer: '외우려고', explain: '외우다 → raiz 외우 (vocal) → 외우려고.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produccion guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas con -(으)려고 해요 o -(으)려고 + verbo de movimiento.',
        type: 'write',
        items: [
          {
            scene: 'Plan de viaje',
            prompt: 'Di "Planeo ir a Japon el proximo ano" (내년, 일본에 가다).',
            answer: '내년에 일본에 가려고 해요.',
            accepted: ['가려고 해요', '일본에 가려고', '내년'],
            explain: '가다 → 가려고 해요 (vocal).',
          },
          {
            scene: 'Proposito de visita',
            prompt: 'Di "Fui al supermercado a comprar fruta" (과일을 사다, 마트에 가다).',
            answer: '과일을 사려고 마트에 갔어요.',
            accepted: ['사려고', '마트에 갔어요'],
            explain: '사다 → 사려고 + verbo de movimiento 갔어요.',
          },
          {
            scene: 'Intencion de aprendizaje',
            prompt: 'Di "Pienso aprender a cocinar comida coreana" (한국 음식을 만들다, 배우다).',
            answer: '한국 음식 만드는 법을 배우려고 해요.',
            accepted: ['배우려고 해요', '만들려고', '배우려고'],
            explain: '배우다 → 배우려고 해요. O: 만들려고 해요.',
          },
          {
            scene: 'Plan de salud',
            prompt: 'Di "Para estar sano, empece a hacer ejercicio" (건강하다, 운동을 시작하다).',
            answer: '건강해지려고 운동을 시작했어요.',
            accepted: ['건강해지려고', '운동을 시작했어요'],
            explain: '건강해지다 → 건강해지려고 + resultado pasado.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Escritura libre',
        intro: 'Escribe tres planes que tienes para el proximo mes usando -(으)려고 해요.',
        type: 'write',
        items: [
          {
            scene: 'Plan de estudio',
            prompt: 'Describe tu plan de estudio para el proximo mes con -(으)려고 해요.',
            answer: '다음 달에 한국어 시험을 보려고 해요.',
            accepted: ['려고 해요', '으려고 해요'],
            explain: 'Usa -(으)려고 해요 para expresar un plan concreto.',
          },
          {
            scene: 'Plan personal',
            prompt: 'Describe algo que piensas hacer para mejorar tu vida usando -(으)려고 해요.',
            answer: '건강을 위해서 매일 걷으려고 해요.',
            accepted: ['려고 해요', '으려고 해요'],
            explain: 'Plan personal: 운동하려고, 먹으려고, 자려고, 공부하려고, etc.',
          },
          {
            scene: 'Plan de viaje o actividad',
            prompt: 'Di adonde piensas ir y para que usando -(으)려고 + verbo de movimiento.',
            answer: '한국 영화를 보려고 영화관에 갈 거예요.',
            accepted: ['려고', '으려고'],
            explain: '-(으)려고 + 가다/오다 para expresar proposito de desplazamiento.',
          },
        ],
      },
    ],
  },
}

export default topic
