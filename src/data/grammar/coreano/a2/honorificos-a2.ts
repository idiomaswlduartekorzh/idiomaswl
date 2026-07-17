import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'honorificos-a2',
  order: '16',
  color: '#c60c30',
  category: 'Gramática',
  level: 'A2',
  title: 'Honoríficos en coreano A2: -(으)세요, 드리다, 여쭤보다',
  shortTitle: 'Honoríficos',
  metaTitle: 'Honoríficos en coreano A2 — (으)세요, 드리다, 진지, 말씀, 댁',
  description:
    'El sistema honorífico coreano es obligatorio para hablar con respeto a mayores y superiores. A nivel A2 se incluyen: el sufijo verbal -(으)시- que transforma verbos en honoríficos, el sufijo de mandato-(으)세요, los verbos especiales (드리다/드시다/계시다), y el vocabulario honorífico (진지, 말씀, 댁, 연세).',
  lead: '어머니가 진지를 드세요: el sistema honorífico coreano que demuestra respeto.',
  outcomes: [
    'Usar -(으)시- para convertir verbos ordinarios en honoríficos',
    'Usar los verbos especiales más frecuentes: 드리다, 드시다, 계시다, 주무시다',
    'Conocer el vocabulario honorífico básico (진지, 말씀, 댁, 연세)',
    'Saber cuándo activar el nivel honorífico (con mayores y superiores)',
  ],

  guide: {
    goal: 'Usar el sistema honorífico coreano de nivel A2 para hablar con respeto a superiores.',
    model: '선생님이 오셨어요. (El profesor ha llegado.) / 할머니께서 진지를 드세요. (La abuela come.)',
    formula: 'V + -(으)시- + terminación | Verbos especiales: 드리다/드시다/계시다/주무시다',
    decisions: [
      '-(으)시-: añadir -시- antes de la terminación si el tallo termina en vocal; -으시- si termina en consonante',
      'Presente: V-(으)세요 | Pasado: V-(으)셨어요 | Futura: V-(으)실 거예요',
      'Verbos especiales honoríficos: 먹다→드시다/잡수시다, 자다→주무시다, 있다→계시다, 죽다→돌아가시다',
      'Vocabulario honorífico: 밥→진지, 말→말씀, 집→댁, 나이→연세, 이름→성함',
      'Se usa 께서 (en lugar de 이/가) como partícula de sujeto honorífico',
    ],
    table: [
      ['Ordinario', 'Honorífico', 'Español'],
      ['먹다 (먹어요)', '드시다 (드세요)', 'comer'],
      ['자다 (자요)', '주무시다 (주무세요)', 'dormir'],
      ['있다 (있어요)', '계시다 (계세요)', 'estar/haber'],
    ],
    mistakes: [
      '"할머니가 먹어요" ❌ (con mayor) → "할머니께서 드세요" ✓ — sujeto +께서 + verbo honorífico.',
      '"선생님이 가세요" — es correcto (-(으)시- añadido), pero con 가다 se puede decir "가시다".',
      '"선생님이 있으세요" — para la existencia de superiores mejor "계세요" (verbo especial).',
    ],
  },

  seo: [
    {
      heading: 'El sistema honorífico coreano: por qué y cómo',
      paragraphs: [
        'El coreano tiene un sistema honorífico obligatorio. Cuando el sujeto de la oración es una persona mayor o de mayor rango social que el hablante, hay que usar formas especiales. El nivel A2 incluye dos mecanismos principales: (1) el sufijo -(으)시- que transforma el verbo ordinario en honorífico, y (2) verbos completamente diferentes para acciones básicas.',
        '"아버지가 왔어요" (mi padre llegó — habla casual) vs "아버지께서 오셨어요" (mi padre llegó — honorífico). La diferencia no es opcional: usar la forma ordinaria cuando se debe usar la honorífica se percibe como una falta grave de educación.',
      ],
    },
    {
      heading: 'Verbos especiales y vocabulario honorífico',
      paragraphs: [
        'Los verbos especiales más importantes: 드시다/잡수시다 (comer honorífico, en lugar de 먹다), 주무시다 (dormir, en lugar de 자다), 계시다 (estar, en lugar de 있다), 돌아가시다 (morir, en lugar de 죽다). El vocabulario también cambia: 밥 → 진지 (comida), 집 → 댁 (casa), 나이 → 연세 (edad), 말 → 말씀 (palabras/discurso).',
        '"성함이 어떻게 되세요?" (¿Cómo se llama usted?) usa 성함 (nombre honorífico) en lugar de 이름. Estas formas se usan al hablar CON la persona mayor/superior o SOBRE ella cuando el interlocutor es igual o superior.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Honoríficos: -(으)시- + terminación, verbos especiales, vocabulario honorífico.',
    graphicPrompt: 'Una persona joven hablando respetuosamente con una persona mayor, con verbos en forma honorífica.',
    scene: [
      ['할머니께서 진지를 드세요.', 'La abuela está comiendo.'],
      ['선생님이 오셨어요.', 'El profesor ha llegado.'],
      ['아버지는 지금 주무세요.', 'Mi padre está durmiendo ahora.'],
      ['교수님께서 말씀하셨어요.', 'El profesor dijo (habló).'],
      ['어머니께서 댁에 계세요.', 'Mi madre está en casa.'],
      ['성함이 어떻게 되세요?', '¿Cómo se llama usted?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-(으)시- con verbos ordinarios', '드시다/주무시다/계시다', '께서 como partícula de sujeto'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma honorífica',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma honorífica correcta para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'La abuela está comiendo (honorífico).',
            lines: [['', '할머니께서 ___.']],
            options: ['드세요', '먹어요', '잡수세요', '먹으세요'],
            answer: '드세요',
            explain: '"드세요" = forma honorífica de 먹다 → 드시다 → 드세요.',
          },
          {
            scene: 'El profesor está en la oficina (honorífico).',
            lines: [['', '선생님이 사무실에 ___.']],
            options: ['계세요', '있어요', '있으세요', '이세요'],
            answer: '계세요',
            explain: '"계세요" = forma honorífica de 있다 → 계시다 → 계세요.',
          },
          {
            scene: 'Mi padre ha llegado (honorífico, pasado).',
            lines: [['', '아버지께서 ___.']],
            options: ['오셨어요', '왔어요', '오세요', '오싰어요'],
            answer: '오셨어요',
            explain: '"오셨어요" = 오다 + -시- + -었어요 = oída honorífica en pasado.',
          },
          {
            scene: 'El abuelo está durmiendo (honorífico).',
            lines: [['', '할아버지께서 ___.']],
            options: ['주무세요', '자요', '자세요', '주무어요'],
            answer: '주무세요',
            explain: '"주무세요" = forma honorífica de 자다 → 주무시다 → 주무세요.',
          },
          {
            scene: '¿Cómo se llama usted? (honorífico).',
            lines: [['', '___ 이 어떻게 되세요?']],
            options: ['성함', '이름', '이름님', '명함'],
            answer: '성함',
            explain: '"성함" = nombre (vocabulario honorífico para 이름).',
          },
          {
            scene: 'La profesora habló (honorífico).',
            lines: [['', '교수님께서 ___.']],
            options: ['말씀하셨어요', '말했어요', '말씀했어요', '말씀세요'],
            answer: '말씀하셨어요',
            explain: '"말씀하셨어요" = 말씀하다 (hablar honorífico) + -시- + pasado.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Sujeto honorífico y verbo honorífico',
        tag: '2 espacios',
        intro: 'Completa el sujeto con 께서 y el verbo en su forma honorífica.',
        type: 'dual',
        items: [
          {
            scene: 'Mi madre comió (honorífico).',
            lines: [['', '어머니[[0]] 진지를 [[1]].']],
            blanks: [
              { options: ['께서', '이', '가', '께'], answer: '께서', explain: '"어머니께서" = mi madre (sujeto honorífico con 께서).' },
              { options: ['드셨어요', '먹었어요', '드세요', '드셨습니다'], answer: '드셨어요', explain: '"드셨어요" = comió (honorífico pasado).' },
            ],
          },
          {
            scene: 'El profesor está en la sala de profesores.',
            lines: [['', '선생님[[0]] 교무실에 [[1]].']],
            blanks: [
              { options: ['께서', '이', '가', '는'], answer: '께서', explain: '"선생님께서" = el profesor (sujeto honorífico).' },
              { options: ['계세요', '있어요', '있으세요', '계시요'], answer: '계세요', explain: '"계세요" = está (honorífico de 있다).' },
            ],
          },
          {
            scene: 'Mi abuelo está durmiendo ahora.',
            lines: [['', '할아버지[[0]] 지금 [[1]].']],
            blanks: [
              { options: ['께서', '이', '가', '는'], answer: '께서', explain: '"할아버지께서" = el abuelo (honorífico).' },
              { options: ['주무세요', '자요', '자세요', '주무어요'], answer: '주무세요', explain: '"주무세요" = está durmiendo (honorífico de 자다).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Conversación con el profesor',
        tag: 'Texto guiado',
        intro: 'Completa el diálogo usando el nivel honorífico correcto.',
        type: 'guidedText',
        scene: '학생이 교수님께 이야기해요.',
        text: '학생: 교수님, 지금 시간이 [[0]]? 교수님: 네, 있어요. 학생: [[1]]이 어떻게 되세요? 교수님: 김민준이에요. 학생: 점심 [[2]]? 교수님: 네, 학교 식당에서 먹었어요. 학생: 오늘 강의에서 [[3]] 내용이 어려웠어요.',
        blanks: [
          { options: ['있으세요', '있어요', '계세요', '있습니까'], answer: '있으세요', explain: '"시간이 있으세요?" = ¿Tiene tiempo? (시간 + 있다 + -(으)세요).' },
          { options: ['성함', '이름', '이름님', '성명'], answer: '성함', explain: '"성함" = nombre (vocabulario honorífico).' },
          { options: ['드셨어요', '먹었어요', '드세요', '드실까요'], answer: '드셨어요', explain: '"드셨어요?" = ¿Comió? (honorífico de 먹다, pasado).' },
          { options: ['말씀하신', '말한', '말씀한', '말씀했던'], answer: '말씀하신', explain: '"말씀하신 내용" = el contenido que usted explicó (honorífico + relativa: 말씀하시 + ㄴ).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la forma honorífica',
        tag: 'Texto libre',
        intro: 'Sin opciones: transforma el verbo ordinario en su forma honorífica.',
        type: 'freeText',
        scene: '존댓말 형태로 바꿔 쓰세요.',
        text: '아버지가 밥을 먹어요. → 아버지께서 ___. / 어머니가 자요. → 어머니께서 ___. / 교수님이 있어요. → 교수님께서 ___.',
        blanks: [
          { answer: '진지를 드세요/드십니다', explain: '"드세요" = honorífico de 먹어요. 밥 → 진지.' },
          { answer: '주무세요', explain: '"주무세요" = honorífico de 자요 → 주무시다.' },
          { answer: '계세요', explain: '"계세요" = honorífico de 있어요 → 계시다.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Habla con respeto',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración en forma honorífica.',
        type: 'write',
        items: [
          {
            scene: 'Tu profesor ha llegado. Díselo a un compañero.',
            prompt: '"선생님이 왔어요" → 존댓말로',
            answer: '선생님께서 오셨어요.',
            accepted: ['교수님이 오셨어요.'],
            explain: '"오셨어요" = 오다 + -(으)시- + 었어요. 이/가 → 께서.',
          },
          {
            scene: 'Pregunta educadamente dónde está el profesor.',
            prompt: '"선생님이 어디에 있어요?" → 존댓말로',
            answer: '선생님이 어디에 계세요?',
            accepted: ['선생님께서 어디에 계세요?'],
            explain: '"계세요" = honorífico de 있어요 → 계시다 → 계세요.',
          },
          {
            scene: 'Dile a alguien que la abuela está durmiendo.',
            prompt: '"할머니가 자요" → 존댓말로',
            answer: '할머니께서 주무세요.',
            accepted: ['할머니가 주무세요.'],
            explain: '"주무세요" = honorífico de 자요 → 주무시다 → 주무세요.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe en nivel honorífico',
        tag: 'Escritura libre',
        intro: 'Escribe 3 oraciones sobre un familiar mayor usando el nivel honorífico.',
        type: 'write',
        items: [
          {
            scene: 'Describe a tu abuelo o abuela usando verbos honoríficos.',
            prompt: '할머니 또는 할아버지에 대해 존댓말로 써 보세요.',
            answer: '할머니께서 매일 아침 일찍 일어나세요. 진지를 많이 드세요. 지금 거실에 계세요.',
            accepted: ['할아버지께서 산책을 좋아하세요. 항상 신문을 읽으세요.'],
            explain: 'Usa 께서 como sujeto, verbos especiales (드시다/계시다/주무시다) y -(으)시- para verbos ordinarios.',
          },
          {
            scene: 'Describe lo que hizo tu profesor hoy usando honoríficos.',
            prompt: '오늘 선생님이 한 일을 존댓말로 써 보세요.',
            answer: '선생님께서 오늘 강의를 하셨어요. 학생들에게 말씀을 해 주셨어요. 교무실에 계셨어요.',
            accepted: ['교수님께서 시험을 내셨어요. 학생들을 도와주셨어요.'],
            explain: '-(으)시- en pasado: 하셨어요, 말씀하셨어요, 계셨어요.',
          },
        ],
      },
    ],
  },
}

export default topic
