import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'progresivo-go-itda-a2',
  order: '18',
  color: '#c60c30',
  category: 'Verbos',
  level: 'A2',
  title: '-고 있다 en coreano A2: estar + gerundio, acción en progreso',
  shortTitle: '-고 있다 (progresivo)',
  metaTitle: 'Aspecto progresivo en coreano A2 — -고 있다, estar haciendo algo ahora',
  description:
    'La forma -고 있다 expresa que una acción está en progreso en el momento presente o en un momento dado. Es el equivalente coreano de "estar + gerundio". Se combina como V-고 + 있다 (있어요/있어/있습니다). A diferencia del inglés, en coreano también puede expresar el resultado de una acción (llevar + participio).',
  lead: '지금 뭐 하고 있어요?: la forma progresiva del coreano que expresa lo que estás haciendo.',
  outcomes: [
    'Formar la progresiva con V-고 있다',
    'Distinguir la progresiva de acción (leer, comer) de la de estado resultado (llevar puesto, estar casado)',
    'Usar 고 있어요 en presente y 고 있었어요 en pasado progresivo',
    'Responder a preguntas sobre qué está haciendo alguien',
  ],

  guide: {
    goal: 'Expresar acciones en progreso con -고 있다 en coreano.',
    model: '지금 밥을 먹고 있어요. (Ahora estoy comiendo.) / 그때 공부하고 있었어요. (En ese momento estaba estudiando.)',
    formula: 'V + -고 있다 → V + -고 있어요 (formal) / V + -고 있어 (informal)',
    decisions: [
      'Progresiva presente: V-고 있어요 → "공부하고 있어요" (estoy estudiando)',
      'Progresiva pasada: V-고 있었어요 → "공부하고 있었어요" (estaba estudiando)',
      'Estado-resultado: 입다(llevar ropa) → "옷을 입고 있어요" (lleva puesto la ropa)',
      '결혼하다(casarse) → "결혼하고 있어요" ❌ vs "결혼했어요" ✓ — para estados permanentes se usa el pasado simple',
      'Pregunta: "뭐 하고 있어요?" = ¿Qué estás haciendo? (fórmula muy frecuente)',
    ],
    table: [
      ['Tiempo', 'Estructura', 'Ejemplo'],
      ['Presente progresivo', 'V-고 있어요', '지금 책을 읽고 있어요'],
      ['Pasado progresivo', 'V-고 있었어요', '그때 자고 있었어요'],
      ['Estado resultado', 'V-고 있다', '안경을 쓰고 있어요'],
    ],
    mistakes: [
      '"공부있어요" ❌ → "공부하고 있어요" ✓ — siempre se necesita el verbo + -고 있다.',
      '"자고 있었어요" ✓ (estaba durmiendo) — pasado progresivo correcto.',
      '"결혼하고 있어요" ❌ (para estado permanente) → "결혼했어요" ✓ — algunos verbos usan pasado simple.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el progresivo -고 있다 en coreano?',
      paragraphs: [
        'La forma -고 있다 en coreano indica que una acción está en curso. Se forma añadiendo -고 al tallo verbal, seguido de 있다 conjugado: "먹고 있어요" (estoy comiendo), "공부하고 있어요" (estoy estudiando), "자고 있어요" (estoy durmiendo).',
        'Es equivalente al español "estar + gerundio" y al inglés "present continuous". La pregunta más común es "뭐 하고 있어요?" (¿Qué estás haciendo?) y su respuesta: "지금 [acción]-고 있어요" (Ahora estoy [haciendo X]).',
      ],
    },
    {
      heading: '¿Qué es la progresiva de estado en coreano?',
      paragraphs: [
        'En coreano, -고 있다 también puede expresar el resultado persistente de una acción completada. "안경을 쓰고 있어요" no significa "estoy poniéndome las gafas" sino "llevo las gafas puestas" (resultado del acto de ponérselas). Del mismo modo, "반지를 끼고 있어요" = "llevo el anillo puesto".',
        'Esta doble función (proceso en curso / estado resultado) es una característica especial del coreano que no tiene equivalente directo en español.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre -고 있다 y el presente simple en coreano?',
      paragraphs: [
        '-고 있다 (-go itda) marca una acción EN CURSO ahora mismo, como el "estar + gerundio" español: 밥을 먹고 있어요 (estoy comiendo). El presente simple 해요, en cambio, sirve tanto para hábitos como para el presente general: 밥을 먹어요 puede ser "como" (habitual) o "voy a comer". Por eso, para dejar claro que la acción ocurre en este momento, el coreano usa -고 있다. Su honorífico es -고 계시다 (선생님이 오고 계세요 = el profesor está viniendo). La trampa para el hispanohablante: no todo "estoy -ndo" del español pide -고 있다; con verbos de estado o percepción el coreano prefiere el presente simple, y -고 있다 se reserva para acciones dinámicas realmente en desarrollo.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-고 있다: acción en progreso y estado resultado.',
    graphicPrompt: 'Persona en diferentes actividades con globos de diálogo mostrando -고 있어요.',
    scene: [
      ['지금 뭐 하고 있어요? — 책을 읽고 있어요.', '¿Qué estás haciendo? — Estoy leyendo un libro.'],
      ['밥을 먹고 있어요. 잠깐만요!', 'Estoy comiendo. ¡Un momento!'],
      ['그때 자고 있었어요.', 'En ese momento estaba durmiendo.'],
      ['안경을 쓰고 있어요.', 'Lleva las gafas puestas.'],
      ['지금 한국어를 공부하고 있어요.', 'Ahora estoy estudiando coreano.'],
      ['회의하고 있어서 나중에 전화할게요.', 'Estoy en reunión, te llamo después.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['V-고 있어요 (presente)', 'V-고 있었어요 (pasado)', '뭐 하고 있어요?'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma progresiva',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma progresiva correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Estoy estudiando ahora.',
            lines: [['', '지금 공부___.']],
            options: ['하고 있어요', '해요', '했어요', '할 거예요'],
            answer: '하고 있어요',
            explain: '"공부하고 있어요" = estoy estudiando (ahora, en progreso).',
          },
          {
            scene: 'Estaba durmiendo cuando llamaste.',
            lines: [['', '전화했을 때 자___.']],
            options: ['고 있었어요', '고 있어요', '고 있을 거예요', '기 전이에요'],
            answer: '고 있었어요',
            explain: '"자고 있었어요" = estaba durmiendo (pasado progresivo).',
          },
          {
            scene: '¿Qué estás haciendo? (pregunta progresiva)',
            lines: [['', '지금 뭐 ___?']],
            options: ['하고 있어요', '했어요', '해요', '할 거예요'],
            answer: '하고 있어요',
            explain: '"뭐 하고 있어요?" = ¿Qué estás haciendo? La pregunta más frecuente del progresivo.',
          },
          {
            scene: 'Está comiendo, no puede contestar.',
            lines: [['', '지금 밥을 ___ 못 받아요.']],
            options: ['먹고 있어서', '먹어서', '먹었기 때문에', '먹는 동안'],
            answer: '먹고 있어서',
            explain: '"먹고 있어서" = porque está comiendo (progresivo + -서 = razón).',
          },
          {
            scene: 'Lleva puestas las gafas (estado resultado).',
            lines: [['', '안경을 ___.']],
            options: ['쓰고 있어요', '써요', '쓸 거예요', '썼어요'],
            answer: '쓰고 있어요',
            explain: '"쓰고 있어요" = lleva las gafas puestas (estado resultado).',
          },
          {
            scene: 'Están trabajando en el proyecto.',
            lines: [['', '프로젝트를 ___.']],
            options: ['하고 있어요', '해요', '했어요', '할 거예요'],
            answer: '하고 있어요',
            explain: '"프로젝트를 하고 있어요" = están trabajando en el proyecto (plural → mismo verbo).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pregunta y respuesta progresiva',
        tag: '2 espacios',
        intro: 'Completa la pregunta y la respuesta en forma progresiva.',
        type: 'dual',
        items: [
          {
            scene: 'Preguntando qué está haciendo y respondiendo que está cocinando.',
            lines: [['', '뭐 [[0]] 있어요? — 요리[[1]] 있어요.']],
            blanks: [
              { options: ['하고', '하는', '해서', '하기'], answer: '하고', explain: '"뭐 하고 있어요?" = ¿Qué estás haciendo? (하고 있어요).' },
              { options: ['하고', '하는', '해서', '한'], answer: '하고', explain: '"요리하고 있어요" = estoy cocinando.' },
            ],
          },
          {
            scene: 'Le preguntas a tu amigo qué estaba haciendo cuando lo llamaste.',
            lines: [['', '전화했을 때 뭐 [[0]] 있었어? — 게임[[1]] 있었어.']],
            blanks: [
              { options: ['하고', '하는', '해서', '하기'], answer: '하고', explain: '"뭐 하고 있었어?" = ¿Qué estabas haciendo? (pasado).' },
              { options: ['하고', '한', '하는', '하기'], answer: '하고', explain: '"게임하고 있었어" = estaba jugando (pasado progresivo).' },
            ],
          },
          {
            scene: 'Están en reunión y llevan corbata.',
            lines: [['', '회의[[0]] 있어요. 넥타이를 [[1]] 있어요.']],
            blanks: [
              { options: ['하고', '한', '하는', '해서'], answer: '하고', explain: '"회의하고 있어요" = están en reunión (progresivo).' },
              { options: ['매고', '맨', '메는', '매서'], answer: '매고', explain: '"넥타이를 매고 있어요" = lleva la corbata puesta (estado resultado).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: '¿Qué están haciendo?',
        tag: 'Texto guiado',
        intro: 'Completa el texto describiendo lo que están haciendo.',
        type: 'guidedText',
        scene: '공원에서 사람들이 다양한 활동을 해요.',
        text: '공원에 사람이 많아요. 어떤 사람들은 운동[[0]] 있어요. 아이들은 놀[[1]] 있어요. 한 노인이 신문을 읽[[2]] 있어요. 연인들이 사진을 찍[[3]] 있어요. 한 여자는 강아지를 산책시키[[4]] 있어요.',
        blanks: [
          { options: ['하고', '한', '하는', '하기'], answer: '하고', explain: '"운동하고 있어요" = están haciendo ejercicio.' },
          { options: ['고', 'ㄴ', '는', '기'], answer: '고', explain: '"놀고 있어요" = están jugando. 놀다 → 놀 + 고.' },
          { options: ['고', 'ㄴ', '는', '기'], answer: '고', explain: '"읽고 있어요" = está leyendo.' },
          { options: ['고', 'ㄴ', '는', '기'], answer: '고', explain: '"찍고 있어요" = están sacando fotos.' },
          { options: ['고', 'ㄴ', '는', '기'], answer: '고', explain: '"산책시키고 있어요" = está paseando al perro.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa el progresivo',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma progresiva correcta.',
        type: 'freeText',
        scene: '지금 무엇을 하고 있어요?',
        text: '지금 한국어를 [[0]] (공부하다). / 그때 친구를 [[1]] (기다리다). / 음악을 [[2]] (듣다). / 옷을 [[3]] (입다 — estado resultado).',
        blanks: [
          { answer: '공부하고 있어요', explain: '"공부하고 있어요" = estoy estudiando.' },
          { answer: '기다리고 있었어요', explain: '"기다리고 있었어요" = estaba esperando (pasado progresivo).' },
          { answer: '듣고 있어요', explain: '"듣고 있어요" = estoy escuchando. 듣다 irregular → 듣 + 고.' },
          { answer: '입고 있어요', explain: '"입고 있어요" = lleva puesto / está poniéndose. 입다 → 입 + 고.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Describe acciones en progreso',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa en forma progresiva.',
        type: 'write',
        items: [
          {
            scene: 'Ahora mismo estás estudiando coreano.',
            prompt: '지금 한국어를... (공부하다)',
            answer: '지금 한국어를 공부하고 있어요.',
            accepted: ['지금 한국어 공부하고 있어요.'],
            explain: '"공부하고 있어요" = estoy estudiando (ahora, en progreso).',
          },
          {
            scene: 'Cuando sonó el teléfono, estabas durmiendo.',
            prompt: '전화가 울렸을 때, (자다 — pasado progresivo)',
            answer: '전화가 울렸을 때 자고 있었어요.',
            accepted: ['전화 왔을 때 자고 있었어요.'],
            explain: '"자고 있었어요" = estaba durmiendo (pasado progresivo).',
          },
          {
            scene: 'Está llevando una camisa roja (estado resultado).',
            prompt: '(빨간 셔츠를 입다 — estado resultado)',
            answer: '빨간 셔츠를 입고 있어요.',
            accepted: ['빨간색 셔츠를 입고 있어요.'],
            explain: '"입고 있어요" = lleva puesta (estado resultado de ponerse la ropa).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe lo que estás haciendo',
        tag: 'Escritura libre',
        intro: 'Escribe 3 oraciones sobre lo que estás haciendo ahora o lo que estabas haciendo.',
        type: 'write',
        items: [
          {
            scene: 'Describe tres cosas que estás haciendo ahora mismo.',
            prompt: '지금 하고 있는 일 세 가지를 써 보세요.',
            answer: '지금 한국어를 공부하고 있어요. 커피를 마시고 있어요. 음악을 듣고 있어요.',
            accepted: ['지금 책을 읽고 있어요. 밥을 먹고 있어요. TV를 보고 있어요.'],
            explain: '"V-고 있어요" = acción en progreso en este momento.',
          },
          {
            scene: 'Describe lo que estabas haciendo ayer a una hora específica.',
            prompt: '어제 [시간]에 무엇을 하고 있었어요? 써 보세요.',
            answer: '어제 저녁 7시에 저녁을 먹고 있었어요. 그리고 유튜브를 보고 있었어요.',
            accepted: ['어제 오후 3시에 공부하고 있었어요.'],
            explain: '"V-고 있었어요" = pasado progresivo (lo que estaba en curso en ese momento).',
          },
        ],
      },
    ],
  },
}

export default topic
