import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ge-doeda-b1',
  order: '03',
  color: '#c60c30',
  category: 'Expresiones',
  level: 'B1',
  title: '-게 되다: Llegar a Ser / Pasar a en Coreano B1',
  shortTitle: '-게 되다 (Llegar a ser)',
  metaTitle: '-게 되다 en Coreano B1 — Cambio de Estado Gradual o Circunstancial',
  description:
    '-게 되다 expresa un cambio de estado o situación que ocurre de forma gradual, circunstancial o no del todo bajo el control del hablante. Equivale a "llegar a", "acabar haciendo", "pasar a" o "resultar que". Es muy frecuente para hablar de cambios de vida, hábitos adquiridos y situaciones que se desarrollaron sin planificación explícita.',
  lead: 'Aprende a expresar cambios de estado y situaciones inesperadas o graduales con -게 되다, una de las expresiones más naturales del coreano cotidiano.',
  outcomes: [
    'Formas -게 되다 correctamente con verbos de acción y estado',
    'Expresas cambios de vida, hábitos y situaciones circunstanciales',
    'Distingues -게 되다 de -(으)ㄹ 거예요 (intención deliberada)',
    'Conjugas 되다 en diferentes tiempos (됐어요, 되었어요, 될 것 같아요)',
  ],

  guide: {
    goal: 'Usar -게 되다 para describir cambios de estado, situaciones no del todo planificadas y resultados circunstanciales.',
    model: '한국어를 배우게 됐어요. (Llegué a aprender coreano / Acabé aprendiendo coreano.) / 서울에 살게 됐어요. (Resulta que me voy a vivir a Seúl.)',
    formula: 'Raíz verbal + -게 되다 (conjugar 되다 según el tiempo)',
    decisions: [
      'La raíz del verbo siempre queda igual; el tiempo se expresa en 되다',
      'Presente: -게 돼요 / -게 됩니다 (el cambio está ocurriendo)',
      'Pasado: -게 됐어요 / -게 되었어요 (el cambio ya ocurrió)',
      'Futuro: -게 될 거예요 / -게 될 것 같아요 (el cambio va a ocurrir)',
      'Implica que el hablante no fue el único agente: circunstancias, destino, o proceso gradual',
      'Con adjetivos: 형용사 + -게 되다 = volverse + adjetivo (바쁘게 되었어요 = me volví ocupado)',
    ],
    table: [
      ['Tiempo', 'Forma', 'Ejemplo'],
      ['Presente (cambio en curso)', '-게 돼요', '알게 돼요 — llego a saber'],
      ['Pasado (cambio completado)', '-게 됐어요', '살게 됐어요 — llegué a vivir'],
      ['Futuro (cambio anticipado)', '-게 될 거예요', '좋아하게 될 거예요 — llegarás a gustar'],
    ],
    mistakes: [
      '"공부하게 됬어요" ❌ → "공부하게 됐어요" ✓ — 됐어요 viene de 되다, no lleva ㅈ.',
      'No usar -게 되다 para acciones deliberadas y planificadas: no digas "공부하게 됐어요" si decides conscientemente estudiar. En ese caso usa "공부하기로 했어요".',
      '"좋게 되다" ≠ "좋아지다": ambas expresan mejora, pero 좋게 되다 enfatiza el cambio circunstancial; 좋아지다 el proceso gradual.',
    ],
  },

  seo: [
    {
      heading: '¿Qué significa -게 되다 en coreano?',
      paragraphs: [
        '-게 되다 es una de las expresiones más características del coreano cotidiano. Describe un cambio de situación que ocurre de forma gradual, circunstancial o no completamente planificada. La idea clave es que el hablante no fue el único agente — las circunstancias, el tiempo o los demás también influyeron.',
        'Para hispanohablantes, la traducción más natural suele ser "llegar a + infinitivo", "acabar + gerundio" o "pasar a + infinitivo": 한국어를 좋아하게 됐어요 → Acabé gustándome el coreano / Llegué a gustar del coreano.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre -게 되다, -(으)려고 하다 y -기로 하다?',
      paragraphs: [
        '-게 되다: el cambio es circunstancial, gradual o externo. 서울에 살게 됐어요. (Acabé viviendo en Seúl — las cosas resultaron así.)',
        '-(으)려고 하다: intención en proceso, decisión activa. 서울에 살려고 해요. (Estoy planeando vivir en Seúl — es mi intención activa.)',
        '-기로 하다: decisión firme y deliberada. 서울에 살기로 했어요. (Decidí vivir en Seúl — fue una decisión consciente.)',
      ],
      table: [
        ['Expresión', 'Matiz', 'Ejemplo'],
        ['-게 됐어요', 'Circunstancial/gradual', '한국에 살게 됐어요'],
        ['-(으)려고 해요', 'Intención en proceso', '한국에 살려고 해요'],
        ['-기로 했어요', 'Decisión firme', '한국에 살기로 했어요'],
      ],
    },
    {
      heading: '¿En qué contextos se usa -게 되다?',
      paragraphs: [
        'Cambios de vida: trabajo, vivienda, relaciones. "회사를 그만두게 됐어요" (Acabé renunciando al trabajo — las circunstancias me llevaron a ello.)',
        'Hábitos y gustos adquiridos gradualmente: 운동을 좋아하게 됐어요 (Llegué a gustar del ejercicio). Es muy natural para hablar de cambios en preferencias.',
        'Situaciones formales y noticias: en coreano formal, -게 되었습니다 es una forma muy educada y humilde de anunciar cambios o eventos.',
      ],
    },
    {
      heading: '-게 되다 con adjetivos',
      paragraphs: [
        'Con adjetivos (형용사), -게 되다 expresa volverse + adjetivo: 한국어가 재미있게 됐어요 (El coreano se volvió interesante para mí), 건강해지게 됐어요 (Llegué a estar más sano).',
        'Aunque a menudo se prefiere -아/어지다 para cambios graduales de estado (más común y natural), -게 되다 también es correcto y añade el matiz circunstancial.',
      ],
    },
    {
      heading: 'Usos formales e informales',
      paragraphs: [
        'Formal (anuncios, noticias, presentaciones): -게 되었습니다 / -게 됩니다. Por ejemplo: "저는 이 자리를 떠나게 되었습니다." (Voy a dejar este puesto.) Muy común en discursos de despedida o comunicados oficiales.',
        'Informal (conversación): -게 됐어요 / -게 돼요. Natural y frecuente para contar cómo llegaste a una situación o cómo algo cambió en tu vida.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-게 되다 para cambios circunstanciales de vida, hábitos adquiridos y situaciones no del todo planeadas.',
    graphicPrompt: 'Camino serpenteante que lleva a un destino inesperado, flecha de proceso con varios pasos.',
    scene: [
      ['한국어를 배우게 됐어요. (hangugeo reul baeugehge doesseoyo)', 'Llegué a aprender coreano (circunstancialmente).'],
      ['서울에 살게 됐어요. (seoure salge doesseoyo)', 'Acabé viviendo en Seúl.'],
      ['그 사람을 좋아하게 됐어요. (geu sarameul joahage doesseoyo)', 'Llegué a gustarme esa persona.'],
      ['운동을 매일 하게 됐어요. (undong eul maeil hage doesseoyo)', 'Llegué a hacer ejercicio todos los días.'],
      ['회사를 그만두게 됐어요. (hoesa reul geumanduge doesseoyo)', 'Acabé renunciando a la empresa.'],
      ['한국 음식을 좋아하게 될 거예요. (hanguk eumsig eul joahage doel geoyeyo)', 'Llegará a gustarte la comida coreana.'],
      ['이 일을 담당하게 되었습니다. (i ireul damdanghage doeeosseumnida)', 'Pasé a estar a cargo de este trabajo.'],
      ['친구가 많이 생기게 됐어요. (chinguga mani saengige doesseoyo)', 'Resultó que hice muchos amigos.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-게 되다 vs -기로 하다', 'conjugación de 되다', 'cambio circunstancial vs decisión'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la expresión correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de -게 되다 según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Contando cómo llegaste a estudiar coreano',
            lines: [['', '드라마를 보다가 한국어를 ___.']],
            options: ['배우게 됐어요', '배우기로 했어요', '배우게 해요', '배우려고 했어요'],
            answer: '배우게 됐어요',
            explain: '-게 됐어요: el aprendizaje del coreano surgió circunstancialmente (por los dramas). No fue una decisión planificada de antemano.',
          },
          {
            scene: 'Un cambio de trabajo circunstancial',
            lines: [['', '갑자기 회사가 망해서 다른 일을 ___.']],
            options: ['찾게 됐어요', '찾기로 했어요', '찾을 거예요', '찾으려고 해요'],
            answer: '찾게 됐어요',
            explain: '-게 됐어요: las circunstancias (la empresa quebró) forzaron el cambio. No es una decisión voluntaria.',
          },
          {
            scene: 'Un anuncio formal',
            lines: [['', '저는 이번에 부서장이 ___.']],
            options: ['되게 됐습니다', '되었습니다', '됩니다', '되게 되었습니다'],
            answer: '되게 되었습니다',
            explain: '-게 되었습니다: forma formal de anunciar un cambio de posición. Muy común en discursos formales.',
          },
          {
            scene: 'Un hábito gradual',
            lines: [['', '처음에는 싫었는데 지금은 채소를 먹는 걸 ___.']],
            options: ['좋아하게 됐어요', '좋아하기로 했어요', '좋아할 거예요', '좋아하는 편이에요'],
            answer: '좋아하게 됐어요',
            explain: '-게 됐어요: al principio no le gustaba, pero gradualmente llegó a gustarle. Cambio gradual.',
          },
          {
            scene: 'Predicción de un cambio futuro',
            lines: [['', '계속 연습하면 잘 ___.']],
            options: ['하게 될 거예요', '하게 됐어요', '하기로 했어요', '할 거예요'],
            answer: '하게 될 거예요',
            explain: '-게 될 거예요: futuro de -게 되다. El cambio llegará a ocurrir si continúa practicando.',
          },
          {
            scene: 'Una decisión deliberada (NO usar -게 되다)',
            lines: [['', '내년에 한국에 가기로 ___. (decisión firme)']],
            options: ['했어요', '됐어요', '되었어요', '하게 됐어요'],
            answer: '했어요',
            explain: '-기로 했어요: decisión firme y deliberada. Aquí NO se usa -게 되다 porque la persona tomó una decisión activa.',
          },
          {
            scene: 'Cambio de situación sin querer',
            lines: [['', '시간이 지나면서 그 사람과 친하___.']],
            options: ['게 됐어요', '기로 했어요', '게 됩니다', '려고 해요'],
            answer: '게 됐어요',
            explain: '친하게 됐어요: llegaron a ser cercanos con el tiempo. El cambio fue gradual y circunstancial.',
          },
          {
            scene: 'Anuncio de cambio próximo',
            lines: [['', '다음 달부터 새 팀에서 일___에요.']],
            options: ['하게 될 거', '하게 되었을 거', '하기로 할 거', '하게 되는 거'],
            answer: '하게 될 거',
            explain: '일하게 될 거예요: el cambio va a ocurrir el mes que viene. Futuro de -게 되다.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Cambios de vida con dos huecos',
        tag: '2 espacios',
        intro: 'Completa las oraciones sobre cambios de vida con las formas correctas de -게 되다.',
        type: 'dual',
        items: [
          {
            scene: 'Historia de cómo alguien conoció a su pareja',
            lines: [['', '우연히 친구 소개로 그 사람을 만나게 [[0]], 그 후로 계속 연락하다가 사귀게 [[1]].']],
            blanks: [
              { options: ['됐어요', '했어요', '되었는데요', '될 거예요'], answer: '됐어요', explain: '만나게 됐어요: el encuentro fue circunstancial (presentación de amigo).' },
              { options: ['됐어요', '했어요', '될 거예요', '됩니다'], answer: '됐어요', explain: '사귀게 됐어요: la relación también surgió gradualmente. Ambos con -게 됐어요.' },
            ],
          },
          {
            scene: 'Cambio de trabajo anunciado formalmente',
            lines: [['', '이번에 서울 지사로 이동하게 [[0]] 새로운 프로젝트를 담당하게 [[1]].']],
            blanks: [
              { options: ['되었고', '됐고', '되었으며', '되었는데'], answer: '되었으며', explain: 'Formal: 되었으며 conecta dos cambios formales (y/además). Discurso formal de empresa.' },
              { options: ['됩니다', '됐어요', '될 거예요', '되었고'], answer: '됩니다', explain: '됩니다: forma formal presente. Anuncio oficial de cambio de responsabilidades.' },
            ],
          },
          {
            scene: 'Cómo llegaste a gustar de algo',
            lines: [['', '처음에는 매운 음식을 못 먹었는데, 한국에 살다 보니까 잘 먹게 [[0]]. 이제는 오히려 더 맵게 먹는 게 좋게 [[1]].']],
            blanks: [
              { options: ['됐어요', '했어요', '됩니다', '될 거예요'], answer: '됐어요', explain: '먹게 됐어요: viviendo en Corea llegó a poder comerla (cambio gradual).' },
              { options: ['됐어요', '했어요', '될 거예요', '됩니다'], answer: '됐어요', explain: '좋게 됐어요: llegó a preferir la comida más picante. Cambio de gusto gradual.' },
            ],
          },
          {
            scene: 'Predicción de cambios futuros',
            lines: [['', '이 수업을 계속 들으면 한국어가 많이 늘게 [[0]] 자연스럽게 말하게 [[1]].']],
            blanks: [
              { options: ['될 거예요', '됐어요', '됩니다', '되었어요'], answer: '될 거예요', explain: '늘게 될 거예요: futuro de -게 되다. Predicción de mejora.' },
              { options: ['될 거예요', '됐어요', '됩니다', '되었어요'], answer: '될 거예요', explain: '말하게 될 거예요: también futuro. Si sigue estudiando, llegará a hablar con naturalidad.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Mi historia en Corea',
        tag: 'Texto guiado',
        intro: 'Completa el texto sobre cómo alguien llegó a vivir y adaptarse en Corea.',
        type: 'guidedText',
        scene: 'Una persona hispanohablante cuenta cómo llegó a Corea y cómo fue adaptándose.',
        text: '저는 한국 드라마를 보다가 한국어에 관심을 [[0]] 됐어요. 처음에는 그냥 취미로 배웠는데, 나중에는 한국 회사에 취직하[[1]] 됐어요. 그래서 서울에 살[[2]] 됐어요. 처음에는 한국 음식이 낯설었는데, 지금은 매운 음식도 잘 먹[[3]] 됐어요. 친구들도 많이 [[4]] 됐고, 한국 문화도 이해하[[5]] 됐어요. 지금은 한국이 제2의 고향이 [[6]] 것 같아요.',
        blanks: [
          { options: ['가지게', '가지기로', '갖는', '갖게'], answer: '가지게', explain: '관심을 가지게 됐어요: llegué a interesarme (cambio circunstancial).' },
          { options: ['하게', '하기로', '하는', '하려고'], answer: '하게', explain: '취직하게 됐어요: circunstancialmente conseguí trabajo en empresa coreana.' },
          { options: ['게', '기로', '는', '려고'], answer: '게', explain: '살게 됐어요: acabé viviendo en Seúl (resultado de las circunstancias).' },
          { options: ['게', '기로', '는', '려고'], answer: '게', explain: '먹게 됐어요: llegué a poder comer comida picante.' },
          { options: ['생기게', '생기기로', '생기는', '생기게'], answer: '생기게', explain: '생기게 됐어요: llegué a tener amigos (surgieron circunstancialmente).' },
          { options: ['게', '기로', '는', '려고'], answer: '게', explain: '이해하게 됐어요: llegué a entender la cultura coreana (proceso gradual).' },
          { options: ['된', '될', '되는', '됐을'], answer: '된', explain: '고향이 된 것 같아요: parece que se convirtió en mi segunda patria (se usa -된, modificador).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe los cambios',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de -게 되다 para completar cada hueco.',
        type: 'freeText',
        scene: 'Completa la entrevista con alguien que cambió de carrera circunstancialmente.',
        text: '처음에는 의사가 되고 싶었는데, 상황이 바뀌어서 디자이너가 [[0]] (되다). 우연히 디자인 동아리에 들어가게 됐고, 거기서 재능을 발견해서 이 일을 하[[1]] (되다). 지금은 디자인 일이 너무 즐거워졌고, 예전보다 훨씬 행복[[2]] (되다). 이 일을 하다 보니 세계 여러 나라 사람들과 일하[[3]] (되다). 미래에는 제 브랜드를 만들[[4]] (미래 -게 되다).',
        blanks: [
          { answer: '됐어요', accepted: ['됐어요', '되었어요', '되게 됐어요'], explain: '디자이너가 됐어요: llegar a ser diseñadora (circunstancialmente). Aquí 되다 sola o el contexto permite -게 되다.' },
          { answer: '하게 됐어요', accepted: ['하게 됐어요', '하게 되었어요'], explain: '이 일을 하게 됐어요: acabé haciendo este trabajo.' },
          { answer: '해지게 됐어요', accepted: ['해지게 됐어요', '행복하게 됐어요', '행복해졌어요'], explain: '행복하게 됐어요 / 행복해지게 됐어요: llegué a ser más feliz.' },
          { answer: '하게 됐어요', accepted: ['하게 됐어요', '하게 되었어요'], explain: '세계 여러 나라 사람들과 일하게 됐어요: llegué a trabajar con personas de distintos países.' },
          { answer: '하게 될 것 같아요', accepted: ['만들게 될 것 같아요', '만들게 될 거예요', '만들게 될 것 같아요'], explain: 'Futuro: 만들게 될 거예요 / 만들게 될 것 같아요.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Expresa cambios con -게 되다',
        tag: 'Producción',
        intro: 'Escribe oraciones usando -게 됐어요 o -게 될 거예요 según el contexto.',
        type: 'write',
        items: [
          {
            scene: 'Un cambio en tu vida',
            prompt: 'Cuenta cómo llegaste a aprender coreano o a interesarte en Corea (usa -게 됐어요).',
            answer: '한국 음악을 듣다가 한국어에 관심을 갖게 됐어요.',
            accepted: ['게 됐어요', '배우게', '좋아하게', '관심을', '알게'],
            explain: 'Ejemplo: K-pop을 듣다가 한국어를 배우게 됐어요. (Escuchando K-pop, llegué a aprender coreano.)',
          },
          {
            scene: 'Un hábito adquirido',
            prompt: 'Habla de algo que antes no hacías/gustaba pero que ahora sí, usando -게 됐어요.',
            answer: '처음에는 운동이 싫었는데 지금은 좋아하게 됐어요.',
            accepted: ['게 됐어요', '먹게', '좋아하게', '하게', '즐기게'],
            explain: 'Ejemplo: 처음에는 매운 음식을 못 먹었는데 이제 잘 먹게 됐어요.',
          },
          {
            scene: 'Un anuncio formal',
            prompt: 'Escribe un anuncio formal de un cambio (trabajo, posición, etc.) usando -게 되었습니다.',
            answer: '이번에 새로운 팀장을 맡게 되었습니다.',
            accepted: ['되었습니다', '됩니다', '담당하게', '맡게', '이동하게', '일하게'],
            explain: 'Ejemplo: 4월부터 새 부서로 이동하게 되었습니다. (A partir de abril, pasaré a un nuevo departamento.)',
          },
          {
            scene: 'Una predicción de cambio futuro',
            prompt: 'Predice un cambio que ocurrirá si alguien hace algo usando -게 될 거예요.',
            answer: '열심히 공부하면 한국어를 잘 말하게 될 거예요.',
            accepted: ['게 될 거예요', '것 같아요', '게 될', '잘 하게', '좋아하게'],
            explain: 'Ejemplo: 계속 연습하면 실력이 늘게 될 거예요. (Si sigues practicando, llegarás a mejorar tu nivel.)',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Cambios de vida',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre cambios reales o hipotéticos usando -게 되다.',
        type: 'write',
        items: [
          {
            scene: 'Un cambio circunstancial del pasado',
            prompt: 'Cuenta algo que cambió en tu vida sin que fuera del todo planeado (usa -게 됐어요).',
            answer: '우연히 친구를 통해 이 스터디 그룹에 참여하게 됐어요.',
            accepted: ['됐어요', '됐', '게 됐', '만나게', '알게', '배우게', '하게', '살게'],
            explain: 'Usa -게 됐어요 para cambios circunstanciales. Ejemplo: 이 일을 하게 됐어요.',
          },
          {
            scene: 'Un hábito o gusto adquirido',
            prompt: 'Describe algo que llegaste a gustar o hacer por primera vez gracias a las circunstancias.',
            answer: '한국 드라마를 보다 보니 자연스럽게 한국 문화를 좋아하게 됐어요.',
            accepted: ['게 됐어요', '좋아하게', '즐기게', '먹게', '배우게', '친해지게'],
            explain: 'Ejemplo: 시간이 지나면서 그 책이 재미있게 됐어요 / 좋아지게 됐어요.',
          },
          {
            scene: 'Un cambio futuro esperado',
            prompt: 'Expresa un cambio que crees que ocurrirá en el futuro (usa -게 될 거예요 o -게 될 것 같아요).',
            answer: '꾸준히 연습하다 보면 언젠가 유창하게 말하게 될 거예요.',
            accepted: ['게 될 거예요', '게 될 것 같아요', '될 거예요', '될 것 같아요'],
            explain: 'Ejemplo: 열심히 하다 보면 좋아지게 될 거예요. (Si perseveras, las cosas mejorarán.)',
          },
        ],
      },
    ],
  },
}

export default topic
