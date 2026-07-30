import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pasado-asseoyo',
  order: '17',
  color: '#c60c30',
  category: 'Verbos',
  level: 'A1',
  title: 'Pasado en Coreano A1 — 았어요 / 었어요 (asseoyo / eosseoyo)',
  shortTitle: 'Pasado 았/었어요',
  metaTitle: 'Pasado coreano A1 — 았어요 었어요 conjugación pasado coreano principiantes',
  description:
    '았어요 y 었어요 son las terminaciones del tiempo pasado en 해요체. La regla es la misma armonía vocálica del presente: vocal ㅏ/ㅗ → 았어요; el resto → 었어요. 하다 siempre → 했어요. El coreano no distingue entre pretérito indefinido y pretérito perfecto.',
  lead: 'Raíz + 았어요 si vocal es ㅏ/ㅗ. Raíz + 었어요 si es cualquier otra. 하다 → 했어요 (irregular). 갔어요(fui), 먹었어요(comí), 했어요(hice), 마셨어요(bebí), 왔어요(vine).',
  outcomes: [
    'Conjuga verbos comunes en pasado con 았어요/었어요',
    'Aplica la regla vocálica ㅏ/ㅗ para elegir 았어요 o 었어요',
    'Usa 했어요 como pasado de 하다 y verbos compuestos',
  ],

  guide: {
    goal: 'Construir el pasado polite de verbos coreanos usando 았어요 o 었어요 según la regla vocálica.',
    model: '어제 뭐 했어요? (¿Qué hiciste ayer?) — 커피를 마셨어요. (Bebí café.)',
    formula: 'Vocal ㅏ/ㅗ → 았어요 | Resto → 었어요 | 하다 → 했어요',
    decisions: [
      'Identifica la raíz: quita -다 → 가다→가, 먹다→먹, 마시다→마시',
      'Mira la vocal de la última sílaba de la raíz: ㅏ/ㅗ → 았어요; todo lo demás → 었어요',
      '가다 → 가(ㅏ) → 갔어요 (가+았어요 → ㅏ+ㅏ se fusionan = 갔어요)',
      '오다 → 오(ㅗ) → 왔어요 (오+았어요 → ㅗ+ㅏ=ㅘ → 왔어요)',
      '먹다 → 먹(ㅓ) → 먹었어요 (먹+었어요)',
      '마시다 → 마시(ㅣ) → 마셨어요 (마시+었어요 → ㅣ+ㅓ=ㅕ → 마셨어요)',
      '하다 → 했어요 (irregular siempre, igual que en presente 해요)',
    ],
    table: [
      ['Verbo', 'Presente (아/어요)', 'Pasado (았/었어요)'],
      ['가다 (ir)', '가요', '갔어요'],
      ['오다 (venir)', '와요', '왔어요'],
      ['먹다 (comer)', '먹어요', '먹었어요'],
      ['마시다 (beber)', '마셔요', '마셨어요'],
      ['배우다 (aprender)', '배워요', '배웠어요'],
      ['하다 (hacer)', '해요', '했어요'],
    ],
    mistakes: [
      '"가었어요" ❌ — la vocal ㅏ+았어요 se fusiona: "갔어요" ✓',
      '"하았어요" ❌ — 하다 en pasado es siempre "했어요" ✓',
      '"공부했었어요" para pasado simple ❌ — 했어요 es suficiente para el pasado simple: "공부했어요" ✓',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el pasado en coreano (았/었어요)?',
      paragraphs: [
        'Una de las diferencias más cómodas del coreano respecto al español: el coreano tiene un solo tiempo pasado para lo que en español llamamos "comí", "he comido", "había comido" (en la conversación cotidiana). La terminación 았어요/었어요 cubre todos estos significados en contexto coloquial.',
        'La regla de construcción es la misma del presente 해요체: mira la vocal de la raíz. Si es ㅏ o ㅗ → añade 았어요. Si es cualquier otra vocal → añade 었어요. Y 하다 siempre → 했어요. Misma lógica, diferente sufijo.',
      ],
    },
    {
      heading: '¿Cuáles son las contracciones del pasado en coreano?',
      paragraphs: [
        'Al igual que en el presente, el pasado tiene contracciones frecuentes. Las más importantes: 가(ㅏ)+았어요 = 갔어요 (las dos ㅏ se fusionan); 오(ㅗ)+았어요 = 왔어요 (ㅗ+ㅏ=ㅘ); 마시(ㅣ)+었어요 = 마셨어요 (ㅣ+ㅓ=ㅕ); 배우(ㅜ)+었어요 = 배웠어요 (ㅜ+ㅓ=ㅝ).',
        'Una pista útil: si ya aprendiste las contracciones del presente (가요, 와요, 마셔요, 배워요), las del pasado siguen el mismo patrón de fusión vocálica — solo añade 어요 extra: 갔어요, 왔어요, 마셨어요, 배웠어요.',
      ],
      table: [
        ['Presente', 'Pasado', 'Cambio vocálico'],
        ['가요', '갔어요', 'ㅏ+ㅏ → 갔'],
        ['와요', '왔어요', 'ㅗ+ㅏ → 왔'],
        ['마셔요', '마셨어요', 'ㅣ+ㅓ → 셨'],
        ['배워요', '배웠어요', 'ㅜ+ㅓ → 웠'],
        ['해요', '했어요', 'irregular'],
      ],
    },
    {
      heading: '했어요: el pasado de hada y todos sus compuestos',
      paragraphs: [
        '하다 en pasado siempre da 했어요. Y como en coreano hay miles de verbos formados con sustantivo+하다, esto significa que todos esos verbos también tienen un pasado muy regular: 공부하다→공부했어요(estudié), 운동하다→운동했어요(hice ejercicio), 요리하다→요리했어요(cociné), 전화하다→전화했어요(llamé por teléfono).',
        'Esta productividad hace que aprendas cientos de pasados de golpe: cualquier sustantivo+하다 → sustantivo+했어요.',
      ],
    },
    {
      heading: '¿Cómo se pregunta en pasado en coreano?',
      paragraphs: [
        'Para preguntar sobre el pasado: sube la entonación al final de la oración. 뭐 했어요?(¿Qué hiciste?), 어디 갔어요?(¿Adónde fuiste?), 뭐 먹었어요?(¿Qué comiste?). Puedes añadir marcadores de tiempo: 어제(ayer), 지난주(la semana pasada), 아까(hace un momento).',
        'El marcador de tiempo más útil para practicar el pasado: 어제(eoje=ayer). 어제 뭐 했어요? es una de las preguntas más naturales para conversar sobre el pasado inmediato.',
      ],
    },
  ],

  visual: {
    mode: 'conjugation',
    teacherLens: 'Pasado 았/었어요: misma regla vocálica que el presente. 하다→했어요. Contracciones paralelas al presente.',
    graphicPrompt: 'Tabla paralela presente vs. pasado con la vocal determinante resaltada.',
    scene: [
      ['갔어요', 'fui / fue (가다→가→갔어요)'],
      ['왔어요', 'vine / vino (오다→오→왔어요)'],
      ['먹었어요', 'comí / comió (먹다→먹→먹었어요)'],
      ['마셨어요', 'bebí / bebió (마시다→마시→마셨어요)'],
      ['공부했어요', 'estudié / estudió (공부하다→했어요)'],
      ['배웠어요', 'aprendí / aprendió (배우다→배우→배웠어요)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['regla ㅏ/ㅗ→았어요', 'contracciones 갔/왔/마셨', '했어요 para hada'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige el pasado correcto de cada verbo.',
        type: 'choice',
        items: [
          {
            scene: 'Ayer',
            lines: [['Carlos', '어제 학교에 ___. (Ayer fui a la escuela.) — 가다']],
            options: ['갔어요', '가았어요', '가었어요', '갑니다'],
            answer: '갔어요',
            explain: '가다 → 가(ㅏ)+았어요 → ㅏ+ㅏ fusión → 갔어요.',
          },
          {
            scene: 'Esta mañana',
            lines: [['Ana', '아침에 커피를 ___. (Esta mañana bebí café.) — 마시다']],
            options: ['마셨어요', '마시었어요', '마시았어요', '마십니다'],
            answer: '마셨어요',
            explain: '마시다 → 마시(ㅣ)+었어요 → ㅣ+ㅓ=ㅕ → 마셨어요.',
          },
          {
            scene: 'El almuerzo',
            lines: [['Sofia', '점심에 비빔밥을 ___. (En el almuerzo comí bibimbap.) — 먹다']],
            options: ['먹었어요', '먹았어요', '먹어요', '먹해요'],
            answer: '먹었어요',
            explain: '먹다 → 먹(ㅓ)+었어요 → 먹었어요. Vocal ㅓ ≠ ㅏ/ㅗ → 었어요.',
          },
          {
            scene: 'El fin de semana',
            lines: [['Lina', '주말에 운동 ___. (El fin de semana hice ejercicio.) — 운동하다']],
            options: ['했어요', '하았어요', '하었어요', '합니다'],
            answer: '했어요',
            explain: '운동하다 → 운동했어요. 하다 → 했어요 (irregular siempre).',
          },
          {
            scene: 'Llegando',
            lines: [['Marco', '친구가 서울에서 ___. (Mi amigo vino de Seúl.) — 오다']],
            options: ['왔어요', '오았어요', '오었어요', '옵니다'],
            answer: '왔어요',
            explain: '오다 → 오(ㅗ)+았어요 → ㅗ+ㅏ=ㅘ → 왔어요.',
          },
          {
            scene: 'Clases pasadas',
            lines: [['Vera', '지난주에 한국어를 ___. (La semana pasada aprendí coreano.) — 배우다']],
            options: ['배웠어요', '배우었어요', '배우았어요', '배웁니다'],
            answer: '배웠어요',
            explain: '배우다 → 배우(ㅜ)+었어요 → ㅜ+ㅓ=ㅝ → 배웠어요.',
          },
          {
            scene: 'Pregunta de pasado',
            lines: [['Hugo', '어제 ___ ? (¿Qué hiciste ayer?)']],
            options: ['뭐 했어요', '뭐 해요', '뭐 할 거예요', '뭐 해야 해요'],
            answer: '뭐 했어요',
            explain: '뭐 했어요? = ¿Qué hiciste? 했어요 = pasado de 하다.',
          },
          {
            scene: 'Ayer en casa',
            lines: [['Carlos', '어제 집에서 공부 ___. (Ayer estudié en casa.) — 공부하다']],
            options: ['했어요', '하았어요', '하었어요', '하고 싶어요'],
            answer: '했어요',
            explain: '공부하다 → 공부했어요. 하다 siempre → 했어요.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Diálogo con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los diálogos sobre el pasado.',
        type: 'dual',
        items: [
          {
            scene: 'El fin de semana de Carlos',
            lines: [
 ['Hugo', '주말에 어디 [[0]] ? (¿Adónde fuiste el fin de semana?)'],
 ['Carlos', '친구하고 공원에 [[1]]. (Fui al parque con un amigo.)'],
 ],
            blanks: [
              { options: ['갔어요', '가요', '갈 거예요', '가았어요'], answer: '갔어요', explain: '가다 → 갔어요. Pregunta en pasado: 어디 갔어요?' },
              { options: ['갔어요', '가요', '가았어요', '갑니다'], answer: '갔어요', explain: '공원에 갔어요 = fui al parque. 가다 → 갔어요.' },
            ],
          },
          {
            scene: 'El almuerzo de ayer',
            lines: [
 ['Ana', '어제 점심에 뭐 [[0]] ? (¿Qué comiste ayer al almuerzo?)'],
 ['Lina', '친구하고 삼겹살을 [[1]]. (Comí samgyeopsal con una amiga.)'],
 ],
            blanks: [
              { options: ['먹었어요', '먹어요', '먹았어요', '먹을 거예요'], answer: '먹었어요', explain: '먹다 → 먹었어요. Pregunta en pasado.' },
              { options: ['먹었어요', '먹어요', '먹았어요', '먹습니다'], answer: '먹었어요', explain: '삼겹살을 먹었어요 = comí samgyeopsal. 먹다 → 먹었어요.' },
            ],
          },
          {
            scene: 'Llegada de Sofia',
            lines: [
 ['Marco', 'Sofia, 언제 [[0]] ? (Sofía, ¿cuándo llegaste?)'],
 ['Sofia', '아까 [[1]]. (Llegué hace un momento.)'],
 ],
            blanks: [
              { options: ['왔어요', '와요', '올 거예요', '오았어요'], answer: '왔어요', explain: '오다 → 왔어요. 언제 왔어요? = ¿cuándo viniste?' },
              { options: ['왔어요', '와요', '오았어요', '옵니다'], answer: '왔어요', explain: '아까 왔어요 = llegué hace un momento.' },
            ],
          },
          {
            scene: 'Estudio del fin de semana',
            lines: [
 ['Vera', '주말에 공부 [[0]] ? (¿Estudiaste el fin de semana?)'],
 ['Carlos', '네, 열심히 [[1]]. (Sí, estudié mucho.)'],
 ],
            blanks: [
              { options: ['했어요', '해요', '할 거예요', '하았어요'], answer: '했어요', explain: '공부하다 → 공부했어요. Pregunta en pasado.' },
              { options: ['했어요', '해요', '합니다', '하았어요'], answer: '했어요', explain: '열심히 했어요 = estudié con dedicación. 하다→했어요.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el relato en pasado sobre el día de Ana.',
        type: 'guidedText',
        scene: 'El día de ayer de Ana en Bucaramanga',
        text: '어제 저는 아침 일찍 [[0]]. (Ayer me levanté temprano.) 커피를 한 잔 [[1]]. (Bebí una taza de café.) 그리고 학교에 [[2]]. (Y fui a la escuela.) 점심에 친구하고 밥을 [[3]]. (Al almuerzo comí con una amiga.) 오후에는 한국어를 [[4]]. (Por la tarde estudié coreano.) 저녁에는 집에 와서 쉬었어요. 일찍 [[5]]. (Y descansé. Me dormí temprano.)',
        blanks: [
          { options: ['일어났어요', '일어나요', '일어났', '일어나았어요'], answer: '일어났어요', explain: '일어나다(levantarse) → 일어나(ㅏ)+았어요 → 일어났어요.' },
          { options: ['마셨어요', '마셔요', '마시었어요', '마시았어요'], answer: '마셨어요', explain: '마시다 → 마셨어요. ㅣ+ㅓ=ㅕ → 마셨어요.' },
          { options: ['갔어요', '가요', '가았어요', '갑니다'], answer: '갔어요', explain: '가다 → 갔어요. 학교에 갔어요 = fui a la escuela.' },
          { options: ['먹었어요', '먹어요', '먹았어요', '먹습니다'], answer: '먹었어요', explain: '먹다 → 먹었어요. 밥을 먹었어요 = comí.' },
          { options: ['공부했어요', '공부해요', '공부하았어요', '공부했어'], answer: '공부했어요', explain: '공부하다 → 공부했어요. 하다→했어요.' },
          { options: ['잤어요', '자요', '자았어요', '잡니다'], answer: '잤어요', explain: '자다(dormir) → 자(ㅏ)+았어요 → ㅏ+ㅏ → 잤어요.' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe el pasado correcto de cada verbo.',
        type: 'freeText',
        scene: 'Diario de aprendizaje de coreano',
        text: '지난주에 한국어 수업에 [[0]] (가다). / 선생님이 문법을 [[1]] (설명하다). / 저는 새 단어를 많이 [[2]] (배우다). / 집에서 연습문제를 [[3]] (하다). / 그리고 한국 노래도 [[4]] (듣다).',
        blanks: [
          { answer: '갔어요', accepted: ['갔어요'], explain: '가다 → 갔어요. ㅏ+았어요 → 갔어요.' },
          { answer: '설명했어요', accepted: ['설명했어요'], explain: '설명하다 → 설명했어요. 하다→했어요.' },
          { answer: '배웠어요', accepted: ['배웠어요'], explain: '배우다 → 배웠어요. ㅜ+었어요 → 배웠어요.' },
          { answer: '했어요', accepted: ['했어요'], explain: '하다 → 했어요. Irregular.' },
          { answer: '들었어요', accepted: ['들었어요'], explain: '듣다 → 들었어요 (irregular ㄷ→ㄹ ante vocal).' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones en pasado coreano.',
        type: 'write',
        items: [
          {
            scene: 'Lo que hiciste ayer',
            prompt: 'Di "Ayer fui al café" (어제=ayer, 카페=café, 가다=ir).',
            answer: '어제 카페에 갔어요.',
            accepted: ['갔어요', '카페에 갔어요', '어제 카페에'],
            explain: '가다 → 갔어요. 어제 + lugar + 에 + 갔어요.',
          },
          {
            scene: 'Comida del almuerzo',
            prompt: 'Di "Comí bibimbap al almuerzo" (점심=almuerzo, 비빔밥=bibimbap, 먹다=comer).',
            answer: '점심에 비빔밥을 먹었어요.',
            accepted: ['먹었어요', '비빔밥을 먹었어요'],
            explain: '먹다 → 먹었어요. 점심에 + 비빔밥을 + 먹었어요.',
          },
          {
            scene: 'Estudio',
            prompt: 'Di "Estudié coreano toda la noche" (밤새=toda la noche, 공부하다=estudiar).',
            answer: '밤새 한국어를 공부했어요.',
            accepted: ['공부했어요', '한국어를 공부했어요'],
            explain: '공부하다 → 공부했어요. 하다siempre→했어요.',
          },
          {
            scene: 'Pregunta sobre el pasado',
            prompt: 'Pregunta "¿Qué comiste ayer?" (어제=ayer, 뭐=qué, 먹다=comer).',
            answer: '어제 뭐 먹었어요?',
            accepted: ['뭐 먹었어요', '어제 뭐 먹었어요'],
            explain: '먹다 → 먹었어요. 어제 뭐 먹었어요? = pregunta natural en pasado.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Escribe sobre tu ayer usando al menos 4 verbos en pasado.',
        type: 'write',
        items: [
          {
            scene: 'Mi mañana de ayer',
            prompt: 'Di qué hiciste ayer por la mañana (al menos 2 verbos en pasado).',
            answer: '어제 아침에 커피를 마셨어요. 그리고 학교에 갔어요.',
            accepted: ['었어요', '았어요', '했어요', '갔어요', '마셨어요', '먹었어요'],
            explain: 'Usa pasados con 었어요/았어요/했어요 según la regla vocálica.',
          },
          {
            scene: 'Mi tarde de ayer',
            prompt: 'Di qué hiciste ayer por la tarde (usa 했어요 con al menos un verbo 하다).',
            answer: '어제 오후에 한국어를 공부했어요. 운동도 했어요.',
            accepted: ['했어요', '었어요', '았어요'],
            explain: 'Verbos con 하다 → 했어요: 공부했어요, 운동했어요, 요리했어요.',
          },
          {
            scene: 'Pregunta a alguien',
            prompt: 'Pregunta a tu compañero sobre su ayer: 어제 ___어요/았어요/었어요?',
            answer: '어제 뭐 먹었어요? 어디 갔어요?',
            accepted: ['었어요', '았어요', '했어요', '먹었어요', '갔어요'],
            explain: 'Pregunta en pasado: verbo en pasado + ? (entonación ↑).',
          },
        ],
      },
    ],
  },
}

export default topic
