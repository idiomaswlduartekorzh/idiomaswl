import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'passado-reminiscencia-b1',
  order: '01',
  color: '#c60c30',
  category: 'Tiempo verbal',
  level: 'B1',
  title: '-던 / -았던: Pasado con Reminiscencia en Coreano B1',
  shortTitle: '-던 / -았던 (Pasado con reminiscencia)',
  metaTitle: '-던 / -았던 en Coreano B1 — Pasado con Reminiscencia',
  description:
    'Los sufijos -던 y -았던/-었던 se usan para recordar o evocar situaciones del pasado. -던 describe acciones o estados que eran habituales o continuos en el pasado pero ya no lo son. -았던/-었던 refuerza que la acción se completó o que el estado ya terminó definitivamente. Son esenciales para narrar recuerdos con matiz nostálgico o reflexivo.',
  lead: 'Aprende a evocar recuerdos del pasado con -던 (habitual/continuo) y -았던 (completado/terminado), dos sufijos modificadores de B1 fundamentales para narrativa personal.',
  outcomes: [
    'Distingues -던 (hábito/continuidad pasada) de -았던 (acción completada/terminada)',
    'Usas ambos sufijos como modificadores de sustantivos',
    'Narras recuerdos y anécdotas con matiz apropiado',
    'Identificas cuándo un estado pasado ya no se mantiene en el presente',
  ],

  guide: {
    goal: 'Evocar recuerdos y situaciones pasadas usando -던 y -았던 como modificadores nominales con el matiz correcto.',
    model: '제가 자주 가던 카페가 문을 닫았어요. (El café al que iba con frecuencia cerró.) / 어릴 때 좋아했던 노래예요. (Es la canción que me gustaba cuando era niño.)',
    formula: 'Verbo + 던 / Verbo + 았던·었던 + sustantivo',
    decisions: [
      '-던: acción o estado que era HABITUAL o CONTINUO en el pasado, con énfasis en que ya no ocurre',
      '-았던/-었던: acción que se COMPLETÓ en el pasado, reforzando que ya terminó del todo',
      'Verbos de estado (형용사) usan -던 para "antes era así pero ya no"; -았던 para "llegó a ese estado y terminó"',
      'La vocal/consonante final del verbo no afecta la forma: -던 siempre es -던',
      '-았던 se usa con verbos que tienen vocal armónica ㅏ/ㅗ; -었던 con los demás',
      'Ambos modifican un sustantivo que viene después, como cualquier adjetivo relativo',
    ],
    table: [
      ['Sufijo', 'Significado principal', 'Ejemplo'],
      ['-던', 'Hábito/continuidad pasada (ya no ocurre)', '자주 가던 식당 — el restaurante al que iba seguido'],
      ['-았던/-었던', 'Acción completada en el pasado', '배웠던 내용 — el contenido que aprendí'],
      ['-던 (adj.)', 'Estado pasado que ya cambió', '예쁘던 꽃 — la flor que era bonita (ya no lo es)'],
    ],
    mistakes: [
      '"이었던" vs "이던": 이었던 indica que algo FUE algo definitivamente (ya no lo es); 이던 es menos enfático y más coloquial.',
      'No confundas -던 con -는: -는 es presente/habitual actual; -던 es pasado/habitual que ya no se repite.',
      'Con verbos de movimiento: 가던 길 = el camino por el que iba (en proceso); 갔던 길 = el camino por el que fui (completado, puede volver).',
    ],
  },

  seo: [
    {
      heading: '¿Qué es -던 en coreano y para qué sirve?',
      paragraphs: [
        '-던 es un sufijo modificador de sustantivos que se usa para evocar acciones o estados que eran habituales, continuos o estaban en progreso en el pasado, con la implicación de que ya no ocurren de esa manera. Es la forma coreana de expresar "el X que solía hacer/ser".',
        'Se adjunta directamente a la raíz del verbo sin ningún cambio: 먹다 → 먹던, 자다 → 자던, 예쁘다 → 예쁘던. Esta simplicidad lo hace muy accesible una vez que entiendes su uso semántico.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre -던 y -았던/-었던?',
      paragraphs: [
        '-던 pone énfasis en la continuidad o habitualidad del pasado — la acción se repetía o el estado se mantenía, y ahora ya no es así. Es nostálgico: 어릴 때 먹던 과자 (las galletas que comía de niño).',
        '-았던/-었던 añade la idea de que la acción se completó definitivamente. Con verbos de movimiento, la diferencia es clara: 가던 길 (el camino por el que iba, en proceso) vs 갔던 길 (el camino por el que fui y regresé, completado).',
        'Para los hispanohablantes, -던 es como el imperfecto de indicativo español (comía, iba) y -았던 se acerca al pretérito perfecto compuesto con valor de experiencia (he ido, he comido).',
      ],
      table: [
        ['Forma', 'Matiz', 'Ejemplo'],
        ['-던', 'Habitual/continuo, ya no ocurre', '자주 가던 카페 → el café al que iba seguido'],
        ['-았던', 'Completado (vocal ㅏ/ㅗ)', '배웠던 단어 → palabras que aprendí'],
        ['-었던', 'Completado (otras vocales)', '먹었던 음식 → la comida que comí'],
      ],
    },
    {
      heading: '¿Cómo se usa -던 con adjetivos en coreano?',
      paragraphs: [
        'Cuando -던 modifica adjetivos (형용사), expresa que algo tenía esa cualidad en el pasado pero ya no la tiene: 작던 마을 (el pueblo que era pequeño — ya creció), 바쁘던 시절 (la época en que estaba ocupado).',
        '-았던 con adjetivos es menos común pero posible: 예뻤던 사람 (la persona que era hermosa). La diferencia es matiz: -던 sugiere continuidad del estado, -았던 que ese estado ya terminó completamente.',
      ],
    },
    {
      heading: 'Contextos de uso: cuándo usar cada forma',
      paragraphs: [
        'Usa -던 para: recuerdos nostálgicos de infancia (어릴 때 놀던 공원), lugares a los que ibas seguido (자주 먹던 식당), personas que conocías bien antes (친하던 친구), hábitos del pasado que ya no tienes.',
        'Usa -았던/-었던 para: experiencias pasadas completadas (유럽에서 살았던 경험), cosas que aprendiste (배웠던 내용), situaciones que se dieron y terminaron (힘들었던 시간).',
      ],
    },
    {
      heading: 'Errores frecuentes de hispanohablantes',
      paragraphs: [
        'El error más común es confundir -던 con -는 (modificador de presente habitual). Si algo sigue ocurriendo, usa -는 (내가 자주 가는 카페); si ya no ocurre, usa -던 (내가 자주 가던 카페).',
        'Otro error es añadir 이 antes de -던/-었던 innecesariamente con verbos. Solo los sustantivos llevan 이었던: 선생님이었던 분 (la persona que era profesora).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Modificadores de reminiscencia -던 y -았던 para evocar recuerdos pasados con matiz de hábito o completitud.',
    graphicPrompt: 'Álbum de fotos antiguo con escenas de infancia y recuerdos, línea de tiempo que muestra "antes" y "ahora".',
    scene: [
      ['제가 자주 가던 카페가 문을 닫았어요. (jega jaju gadeon kape ga mun eul dadasseoyo)', 'El café al que yo iba con frecuencia cerró.'],
      ['어릴 때 좋아하던 만화책이에요. (eoril ttae joahaden manhwachaek ieyo)', 'Es el cómic que me gustaba cuando era niño.'],
      ['우리가 다니던 학교가 많이 바뀌었어요. (uriga danideon hakgyo ga mani bakkwieosseoyo)', 'La escuela a la que íbamos cambió mucho.'],
      ['배웠던 내용을 복습해야 해요. (baeweotdeon naeyongeul bokseupaeya haeyo)', 'Tengo que repasar el contenido que aprendí.'],
      ['살았던 동네가 그리워요. (saradeon dongnae ga geuriwoyo)', 'Extraño el barrio donde vivía.'],
      ['함께 먹던 라면이 제일 맛있었어요. (hamkke meokdeon ramyeon i jeil masisseoyo)', 'El ramen que comíamos juntos era el más delicioso.'],
      ['예전에 친하던 친구를 우연히 만났어요. (yejeon e chinhadeon chingureul uyeonhi mannasseoyo)', 'Me encontré por casualidad con un amigo con quien era cercano antes.'],
      ['힘들었던 시간이 지나고 이제 괜찮아요. (himdeureosdeon sigan i jinago ije gwaenchana yo)', 'Después de pasar tiempos difíciles, ahora estoy bien.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-던 vs -는', '-던 vs -았던', 'modificadores nominales'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el sufijo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige entre -던, -았던 o -었던 según el contexto de cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Recordando un lugar favorito',
            lines: [['', '어릴 때 자주 ___ 공원이 없어졌어요.']],
            options: ['가던', '가는', '갔던', '갈'],
            answer: '가던',
            explain: '-던: acción habitual en el pasado (ir seguido al parque). Se implica que ya no lo haces así. -는 sería presente.',
          },
          {
            scene: 'Hablando de una experiencia de viaje',
            lines: [['', '제가 유럽에서 ___ 경험이 평생 기억에 남을 거예요.']],
            options: ['살았던', '살던', '사는', '살'],
            answer: '살았던',
            explain: '-았던: la experiencia de vivir en Europa está completamente terminada. -살던 también es posible pero 살았던 enfatiza que se completó.',
          },
          {
            scene: 'Recordando la infancia',
            lines: [['', '아이일 때 좋아___ 장난감을 아직도 갖고 있어요.']],
            options: ['하던', '했던', '하는', '할'],
            answer: '하던',
            explain: '-하던: el gustar era habitual/continuo en la infancia. No enfatiza una acción puntual completada.',
          },
          {
            scene: 'Un amigo que cambió',
            lines: [['', '예전에 내성적이___ 친구가 이제 엄청 활발해요.']],
            options: ['던', '었던', '는', '일'],
            answer: '던',
            explain: '-이던 (→ 내성적이던): el estado de ser introvertido era continuo antes; ahora ya no lo es.',
          },
          {
            scene: 'Recordando comida',
            lines: [['', '할머니가 자주 만들어 주___ 음식이 너무 그리워요.']],
            options: ['시던', '셨던', '주시던', '주셨던'],
            answer: '주시던',
            explain: '-주시던: la abuela solía cocinar (hábito continuo). La honorífica 시 se inserta antes de -던.',
          },
          {
            scene: 'Sobre la escuela',
            lines: [['', '우리가 같이 다니___ 학교를 오늘 다시 방문했어요.']],
            options: ['던', '었던', '는', '을'],
            answer: '던',
            explain: '-던: asistir juntos a la escuela era un hábito continuo del pasado, ya terminado.',
          },
          {
            scene: 'Recuerdos de trabajo',
            lines: [['', '그 회사에서 일___ 시절이 정말 힘들었어요.']],
            options: ['하던', '했던', '하는', '할'],
            answer: '하던',
            explain: '-하던: el período de trabajo era continuo. -했던 también posible, pero -하던 enfatiza la duración/habitualidad.',
          },
          {
            scene: 'Una película favorita',
            lines: [['', '어릴 때 제일 좋아___ 영화가 뭐예요?']],
            options: ['하던', '했던', '하는', '할'],
            answer: '하던',
            explain: '-하던: el gusto era habitual/continuo durante la infancia. Pregunta nostálgica típica con -던.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos huecos de reminiscencia',
        tag: '2 espacios',
        intro: 'Completa cada frase con el sufijo de reminiscencia adecuado en los dos huecos.',
        type: 'dual',
        items: [
          {
            scene: 'Conversación nostálgica entre amigos',
            lines: [['', '우리가 자주 [[0]] 그 식당이 바뀌었고, 항상 [[1]] 메뉴도 없어졌어요.']],
            blanks: [
              { options: ['가던', '갔던', '가는', '갈'], answer: '가던', explain: '-던: ir a ese restaurante era una costumbre habitual del pasado.' },
              { options: ['시키던', '시켰던', '시키는', '시킬'], answer: '시키던', explain: '-던: pedir ese menú era habitual. La acción era continua/repetida.' },
            ],
          },
          {
            scene: 'Recordando los estudios universitarios',
            lines: [['', '대학교 때 [[0]] 교수님께서 가르쳐 주신 내용과 [[1]] 친구들이 아직도 생각나요.']],
            blanks: [
              { options: ['계시던', '계셨던', '계시는', '계실'], answer: '계시던', explain: '계시던: el profesor existía/estaba (continuo) durante la uni. Honorífico de 있던.' },
              { options: ['사귀던', '사귀었던', '사귀는', '사귈'], answer: '사귀던', explain: '-던: los amigos con quienes se relacionaba (habitualmente) en la universidad.' },
            ],
          },
          {
            scene: 'Álbum de fotos',
            lines: [['', '이 사진은 우리가 [[0]] 해변이고, 저 사진은 제가 살[[1]] 아파트예요.']],
            blanks: [
              { options: ['가던', '갔던', '가는', '가던지'], answer: '갔던', explain: '-갔던: ir a esa playa está completado — quizás fueron una vez o el viaje terminó.' },
              { options: ['던', '았던', '는', '을'], answer: '던', explain: '살던: vivir en ese apartamento era continuo/habitual (ya no vive allí).' },
            ],
          },
          {
            scene: 'Hablando de un ex compañero',
            lines: [['', '그 사람은 예전에 정말 열심히 일[[0]] 사람인데, 요즘은 다른 일을 [[1]] 것 같아요.']],
            blanks: [
              { options: ['하던', '했던', '하는', '할'], answer: '하던', explain: '-하던: trabajar duro era un estado continuo/habitual del pasado.' },
              { options: ['하던', '했던', '하는', '할'], answer: '하는', explain: '-하는: "parece que ahora hace" — el estado actual se expresa con -는.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Mi infancia en el barrio',
        tag: 'Texto guiado',
        intro: 'Completa el texto con la forma correcta de -던 o -았던/-었던.',
        type: 'guidedText',
        scene: 'Una persona adulta recuerda su infancia en el barrio donde creció.',
        text: '어릴 때 살[[0]] 동네가 정말 그리워요. 매일 [[1]] 학교, 친구들과 함께 [[2]] 공원, 할머니가 자주 만들어 [[3]] 불고기... 모두 소중한 기억이에요. 지금은 [[4]] 건물들이 많이 바뀌었고, 같이 [[5]] 친구들도 다 뿔뿔이 흩어졌어요. 그래도 그때 [[6]] 추억은 평생 잊을 수 없을 것 같아요.',
        blanks: [
          { options: ['던', '았던', '는', '을'], answer: '던', explain: '살던: vivir en ese barrio era continuo/habitual (ya no vive allí). → 살던 동네' },
          { options: ['다니던', '다녔던', '다니는', '다닐'], answer: '다니던', explain: '-던: asistir a la escuela era hábito diario del pasado.' },
          { options: ['놀던', '놀았던', '노는', '놀'], answer: '놀던', explain: '-던: jugar en el parque era hábito continuo de infancia.' },
          { options: ['주시던', '주셨던', '주시는', '주실'], answer: '주시던', explain: '주시던: la abuela acostumbraba hacer bulgogi (hábito afectuoso). Honorífico.' },
          { options: ['있던', '있었던', '있는', '있을'], answer: '있던', explain: '있던: los edificios "que existían/estaban" antes (continuo pasado).' },
          { options: ['놀던', '놀았던', '놀', '노는'], answer: '놀던', explain: '-던: los amigos con quienes jugaba habitualmente.' },
          { options: ['했던', '하던', '하는', '할'], answer: '했던', explain: '했던: los recuerdos vividos (completados). -었던 enfatiza que ese período se terminó.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe los sufijos',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de -던 o -았던/-었던 para completar cada hueco.',
        type: 'freeText',
        scene: 'Completa las memorias de una estudiante que regresó a su ciudad natal.',
        text: '오랜만에 고향에 돌아왔어요. 어릴 때 자주 [[0]] 빵집이 아직 있어서 너무 반가웠어요. 예전에 선생님께서 가르쳐 [[1]] 노래도 다시 생각났어요. 친구들과 항상 [[2]] 길을 걸으면서 옛날 생각을 많이 했어요. 정말 [[3]] 시절이었는데, 지금 생각하면 그때가 제일 행복한 것 같아요. 그 시절에 [[4]] 친구 중에 지금도 연락하는 사람이 있어요.',
        blanks: [
          { answer: '가던', accepted: ['가던', '갔던'], explain: '가던: ir a la panadería era hábito continuo. -갔던 también aceptable enfatizando que completó los viajes.' },
          { answer: '주시던', accepted: ['주시던', '주셨던'], explain: '주시던: la profesora solía enseñar (hábito habitual). -주셨던 también válido.' },
          { answer: '걷던', accepted: ['걷던', '걸었던'], explain: '걷던: caminar por ese camino era hábito. -걸었던 también posible.' },
          { answer: '행복하던', accepted: ['행복하던', '행복했던'], explain: '행복하던: la felicidad era un estado continuo. -행복했던 enfatiza más que ese estado terminó.' },
          { answer: '사귀던', accepted: ['사귀던', '사귀었던'], explain: 'Los amigos con quienes se relacionaba habitualmente (continuo pasado).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye memorias',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando -던 o -았던/-었던 según el contexto.',
        type: 'write',
        items: [
          {
            scene: 'Un lugar del pasado',
            prompt: 'Describe un lugar al que ibas con frecuencia de niño/a pero que ya no visitas (usa -던).',
            answer: '어릴 때 자주 가던 공원이 이제 없어졌어요.',
            accepted: ['가던', '다니던', '놀던', '가던 곳', '살던'],
            explain: 'Ejemplo: 어릴 때 자주 가던 도서관이 너무 그리워요. (Extraño mucho la biblioteca a la que iba seguido de niño.)',
          },
          {
            scene: 'Una experiencia completada',
            prompt: 'Habla de algo que hiciste en el pasado y que completaste (usa -았던/-었던).',
            answer: '대학교 때 배웠던 스페인어를 다시 공부하고 싶어요.',
            accepted: ['배웠던', '살았던', '다녔던', '했던', '먹었던'],
            explain: 'Ejemplo: 여행에서 먹었던 음식이 아직도 기억나요. (Todavía recuerdo la comida que comí en el viaje.)',
          },
          {
            scene: 'Una persona del pasado',
            prompt: 'Habla de alguien que conocías antes pero con quien ya no tienes contacto (usa -던).',
            answer: '예전에 같은 반이던 친구를 오늘 우연히 만났어요.',
            accepted: ['이던', '친하던', '알던', '같이', '사귀던'],
            explain: 'Ejemplo: 예전에 친하던 친구가 해외로 이민을 갔어요. (Un amigo con quien era cercano antes emigró al extranjero.)',
          },
          {
            scene: 'Un hábito del pasado',
            prompt: 'Describe un hábito que tenías antes pero que ya no haces (usa -던).',
            answer: '학생 때 매일 일기를 쓰던 습관이 있었는데 이제는 안 써요.',
            accepted: ['쓰던', '운동하던', '공부하던', '먹던', '가던'],
            explain: 'Ejemplo: 예전에 매일 운동하던 사람인데 요즘은 바빠서 못 해요. (Antes era alguien que hacía ejercicio todos los días, pero hoy en día estoy ocupado y no puedo.)',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Carta a tu yo del pasado',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones evocando recuerdos de tu pasado, usando -던 y -았던/-었던.',
        type: 'write',
        items: [
          {
            scene: 'Un lugar o cosa del pasado',
            prompt: 'Describe un lugar, comida o cosa que formaba parte de tu vida pasada pero ya no (usa -던).',
            answer: '어릴 때 자주 먹던 음식이 지금도 너무 그리워요.',
            accepted: ['던', '살던', '먹던', '가던', '다니던', '좋아하던'],
            explain: 'Usa -던 para hábitos o estados continuos del pasado. Ejemplo: 예전에 살던 집이 너무 그리워요.',
          },
          {
            scene: 'Una experiencia o período completado',
            prompt: 'Habla de una experiencia que viviste y completaste (usa -았던/-었던).',
            answer: '제가 유럽에서 공부했던 시간이 정말 소중해요.',
            accepted: ['았던', '었던', '배웠던', '살았던', '힘들었던', '행복했던'],
            explain: 'Usa -았던/-었던 para experiencias completadas. Ejemplo: 힘들었던 시간이 지나고 이제 괜찮아요.',
          },
          {
            scene: 'Una persona del pasado',
            prompt: 'Menciona a alguien importante en tu pasado y cómo era entonces (usa -던 o -았던).',
            answer: '예전에 항상 나를 도와주던 선생님이 아직도 기억에 남아요.',
            accepted: ['던', '았던', '었던', '이던', '도와주던', '가르쳐 주던'],
            explain: 'Ejemplo: 어릴 때 정말 친하던 친구가 지금은 다른 나라에 살고 있어요.',
          },
        ],
      },
    ],
  },
}

export default topic
