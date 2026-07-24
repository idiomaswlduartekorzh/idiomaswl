import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futuro-rl-geoyeyo-a2',
  order: '02',
  color: '#c60c30',
  category: 'Tiempo verbal',
  level: 'A2',
  title: 'Futuro -(으)ㄹ 거예요 Coreano A2 — Intencion y prediccion',
  shortTitle: '-(으)ㄹ 거예요',
  metaTitle: 'Futuro coreano A2 — -(으)ㄹ 거예요 intencion y prediccion',
  description:
    'La forma -(으)ㄹ 거예요 es el futuro mas usado en coreano conversacional. Expresa tanto intenciones personales como predicciones sobre el futuro. Se construye a partir de la raiz verbal y varia segun si esta termina en consonante o vocal.',
  lead: 'Raiz + -ㄹ 거예요 (vocal/ㄹ final) o + -을 거예요 (consonante final). Uso: "voy a hacer algo" o "creo que va a pasar algo". Pregunta: -(으)ㄹ 거예요? Negacion: 안 + verbo + -(으)ㄹ 거예요.',
  outcomes: [
    'Formar el futuro -(으)ㄹ 거예요 segun la raiz verbal',
    'Expresar intenciones y planes en coreano',
    'Hacer preguntas sobre planes futuros',
    'Negar acciones futuras con 안',
  ],

  guide: {
    goal: 'Construir y usar el futuro -(으)ㄹ 거예요 para hablar de intenciones y predicciones.',
    model: '내일 학교에 갈 거예요 (manana voy a ir a la escuela) | 비가 올 거예요 (creo que va a llover) | 밥을 먹을 거예요 (voy a comer)',
    formula: 'Raiz + -ㄹ 거예요 (vocal/ㄹ) | Raiz + -을 거예요 (consonante) | 안 + raiz + -(으)ㄹ 거예요 (negacion)',
    decisions: [
      'Identifica la raiz: quita -다 del infinitivo → 가다 → 가, 먹다 → 먹',
      'Si la raiz termina en vocal o ㄹ → añade -ㄹ 거예요: 가 → 갈 거예요, 알 → 알 거예요',
      'Si la raiz termina en consonante (no ㄹ) → añade -을 거예요: 먹 → 먹을 거예요',
      'Para preguntar: -(으)ㄹ 거예요? al final con entonacion ascendente',
      'Para negar intencion: 안 + verbo + -(으)ㄹ 거예요 → 안 먹을 거예요',
      'Para negar de forma formal: raiz + -지 않을 거예요 → 먹지 않을 거예요',
    ],
    table: [
      ['Infinitivo', 'Raiz final', '-(으)ㄹ 거예요'],
      ['가다 (ir)', 'vocal 가', '갈 거예요'],
      ['오다 (venir)', 'vocal 오', '올 거예요'],
      ['먹다 (comer)', 'consonante 먹', '먹을 거예요'],
      ['배우다 (aprender)', 'vocal 배우', '배울 거예요'],
      ['살다 (vivir)', 'ㄹ 살', '살 거예요'],
    ],
    mistakes: [
      '"갈거에요" — se escribe 갈 거예요 (con espacio y correcto: 거예요, no 거에요)',
      '"먹ㄹ 거예요" — consonante final + -을: 먹을 거예요, no se añade ㄹ directo',
      '"갈을 거예요" — vocal final solo añade -ㄹ sin 으: 갈 거예요, no 갈을',
    ],
  },

  seo: [
    {
      heading: 'Que es -(으)ㄹ 거예요 y cuando usarlo',
      paragraphs: [
        '-(으)ㄹ 거예요 es la forma de futuro mas natural en el coreano conversacional. A diferencia del ingles o el espanol, el coreano no tiene un tiempo verbal futuro propiamente dicho — usa esta construccion para expresar lo que piensas hacer o lo que crees que va a suceder.',
        'La distincion clave es entre intencion (yo decido hacer algo) y prediccion (creo que algo va a pasar). En ambos casos se usa la misma forma: 내년에 한국에 갈 거예요 (el ano que viene voy a ir a Corea / creo que ire a Corea).',
      ],
    },
    {
      heading: 'La regla de -ㄹ vs -을: segun la raiz',
      paragraphs: [
        'La eleccion entre -ㄹ y -을 depende del ultimo elemento de la raiz verbal. Raiz termina en vocal: añades directamente -ㄹ. Raiz termina en ㄹ: el ㄹ ya esta, añades directamente 거예요 (살다 → 살 거예요). Raiz termina en consonante (distinta de ㄹ): añades -을 como vocal de apoyo.',
        'Este patron de vocal de apoyo -으- aparece en muchas otras estructuras del coreano, asi que interiorizarlo ahora te preparara para temas futuros como el condicional y la clausula de relativo.',
      ],
      table: [
        ['Tipo de raiz', 'Terminacion', 'Ejemplo'],
        ['Vocal final', '-ㄹ 거예요', '가다 → 갈 거예요'],
        ['ㄹ final', '-ㄹ + 거예요 (ㄹ ya presente)', '살다 → 살 거예요'],
        ['Consonante final', '-을 거예요', '먹다 → 먹을 거예요'],
      ],
    },
    {
      heading: 'Preguntas y negaciones en futuro',
      paragraphs: [
        'Para preguntar sobre planes futuros, añade interrogacion al final: 내일 뭐 할 거예요? (¿Que vas a hacer manana?). Para preguntar de manera directa: 갈 거예요? (¿Vas a ir?).',
        'Para negar intencion la forma mas comun es 안 + verbo base + -(으)ㄹ 거예요: 안 먹을 거예요 (no voy a comer). La forma formal usa -지 않을 거예요: 먹지 않을 거예요.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Futuro -(으)ㄹ 거예요: raiz + ㄹ (vocal/ㄹ) o + 을 (consonante) + 거예요.',
    graphicPrompt: 'Diagrama de flujo: raiz → vocal o consonante → añadir ㄹ o 을 → + 거예요.',
    scene: [
      ['갈 거예요', 'Voy a ir (가다, raiz vocal)'],
      ['먹을 거예요', 'Voy a comer (먹다, raiz consonante)'],
      ['배울 거예요', 'Voy a aprender (배우다, raiz vocal)'],
      ['안 갈 거예요', 'No voy a ir (negacion con 안)'],
      ['뭐 할 거예요?', '¿Que vas a hacer? (pregunta)'],
      ['한국어를 공부할 거예요', 'Voy a estudiar coreano'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-ㄹ vs -을 segun raiz', 'negacion con 안', 'pregunta con entonacion'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento del futuro',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de -(으)ㄹ 거예요 para cada verbo.',
        type: 'choice',
        items: [
          {
            scene: 'Planes para manana',
            lines: [['Ana', '내일 학교에 ___ (가다). (Manana voy a ir a la escuela.)']],
            options: ['갈 거예요', '가을 거예요', '가ㄹ 거예요', '갈거에요'],
            answer: '갈 거예요',
            explain: '가다 → raiz 가 (vocal) → 갈 거예요. Raiz vocal + -ㄹ 거예요.',
          },
          {
            scene: 'Que vas a comer',
            lines: [['Leo', '점심에 뭐 ___? (가다) → (¿Que vas a comer al mediodia?)']],
            options: ['먹을 거예요', '먹ㄹ 거예요', '먹갈 거예요', '먹을거예요'],
            answer: '먹을 거예요',
            explain: '먹다 → raiz 먹 (consonante) → 먹을 거예요. Consonante + -을 거예요.',
          },
          {
            scene: 'Prediccion del tiempo',
            lines: [['Alba', '오늘 비가 ___ (오다). (Creo que hoy va a llover.)']],
            options: ['올 거예요', '오을 거예요', '오갈 거예요', '올거예요'],
            answer: '올 거예요',
            explain: '오다 → raiz 오 (vocal) → 올 거예요.',
          },
          {
            scene: 'Aprendiendo coreano',
            lines: [['Carlos', '올해 한국어를 ___ (배우다). (Este ano voy a aprender coreano.)']],
            options: ['배울 거예요', '배우을 거예요', '배울거예요', '배우ㄹ 거예요'],
            answer: '배울 거예요',
            explain: '배우다 → raiz 배우 (vocal) → 배울 거예요.',
          },
          {
            scene: 'Negacion de planes',
            lines: [['Lina', '오늘 파티에 ___ (가다) — no voy. (Hoy no voy a ir a la fiesta.)']],
            options: ['안 갈 거예요', '갈 거 아니에요', '안 가을 거예요', '갈 없어요'],
            answer: '안 갈 거예요',
            explain: 'Negacion futura: 안 + raiz + -(으)ㄹ 거예요 → 안 갈 거예요.',
          },
          {
            scene: 'Viviendo en Korea',
            lines: [['Sofia', '내년에 서울에 ___ (살다). (El ano que viene voy a vivir en Seul.)']],
            options: ['살 거예요', '살을 거예요', '사ㄹ 거예요', '살거예요'],
            answer: '살 거예요',
            explain: '살다 → raiz 살 (ㄹ final) → 살 거예요 (ㄹ ya presente, sin 으).',
          },
          {
            scene: 'Preguntando sobre planes',
            lines: [['Marco', '주말에 뭐 ___? (하다) (¿Que vas a hacer este fin de semana?)']],
            options: ['할 거예요', '하을 거예요', '해ㄹ 거예요', '할거에요'],
            answer: '할 거예요',
            explain: '하다 → raiz 하 (vocal) → 할 거예요. Pregunta con entonacion ascendente.',
          },
          {
            scene: 'Leyendo un libro',
            lines: [['Leo', '저녁에 책을 ___ (읽다). (Esta noche voy a leer un libro.)']],
            options: ['읽을 거예요', '읽ㄹ 거예요', '읽갈 거예요', '읽어 거예요'],
            answer: '읽을 거예요',
            explain: '읽다 → raiz 읽 (consonante) → 읽을 거예요.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Dialogos con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los dialogos sobre planes futuros.',
        type: 'dual',
        items: [
          {
            scene: 'Planes del fin de semana',
            lines: [
 ['Lina', '이번 주말에 뭐 [[0]] (하다)? (¿Que vas a hacer este fin de semana?)'],
 ['Carlos', '친구를 [[1]] (만나다). (Voy a encontrarme con un amigo.)'],
 ],
            blanks: [
              { options: ['할 거예요', '하을 거예요', '해 거예요', '할거예요'], answer: '할 거예요', explain: '하다 → 할 거예요 (vocal final).' },
              { options: ['만날 거예요', '만나을 거예요', '만나ㄹ 거예요', '만날거예요'], answer: '만날 거예요', explain: '만나다 → raiz 만나 (vocal) → 만날 거예요.' },
            ],
          },
          {
            scene: 'Prediccion del clima',
            lines: [
 ['Ana', '내일 비가 [[0]] (오다)? (¿Crees que manana va a llover?)'],
 ['Alba', '아마 [[1]] (오다). (Probablemente si.)'],
 ],
            blanks: [
              { options: ['올 거예요', '오을 거예요', '오ㄹ 거예요', '올거예요'], answer: '올 거예요', explain: '오다 → raiz 오 (vocal) → 올 거예요.' },
              { options: ['올 거예요', '오을 거예요', '오ㄹ 거예요', '올거예요'], answer: '올 거예요', explain: '아마 = probablemente. 오다 → 올 거예요.' },
            ],
          },
          {
            scene: 'Negacion de planes',
            lines: [
 ['Marco', '오늘 운동 [[0]] (하다)? (¿Vas a hacer ejercicio hoy?)'],
 ['Sofia', '아니요, [[1]] (하다) — negacion. (No, no voy a hacerlo.)'],
 ],
            blanks: [
              { options: ['할 거예요', '하을 거예요', '해 거예요', '하ㄹ 거예요'], answer: '할 거예요', explain: '하다 → 할 거예요. Pregunta de futuro.' },
              { options: ['안 할 거예요', '안 하을 거예요', '할 없어요', '안해 거예요'], answer: '안 할 거예요', explain: '안 + 할 거예요 = no voy a hacerlo.' },
            ],
          },
          {
            scene: 'Comida de manana',
            lines: [
 ['Leo', '내일 점심에 뭐 [[0]] (먹다)? (¿Que vas a comer manana al mediodia?)'],
 ['Lina', '김치찌개를 [[1]] (먹다). (Voy a comer kimchi-jjigae.)'],
 ],
            blanks: [
              { options: ['먹을 거예요', '먹ㄹ 거예요', '먹어 거예요', '먹을거예요'], answer: '먹을 거예요', explain: '먹다 → raiz 먹 (consonante) → 먹을 거예요.' },
              { options: ['먹을 거예요', '먹ㄹ 거예요', '먹어 거예요', '먹을거예요'], answer: '먹을 거예요', explain: '김치찌개를 먹을 거예요 = voy a comer kimchi-jjigae.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto sobre los planes de Sofia para el verano.',
        type: 'guidedText',
        scene: 'Los planes de Sofia para el verano',
        text: '이번 여름에 저는 한국에 [[0]] (가다). 거기서 한국어를 [[1]] (배우다). 친구들과 맛있는 음식을 [[2]] (먹다). 한국 드라마도 많이 [[3]] (보다). 비가 많이 [[4]] (오다) — el verano coreano tiene monsoon. 많이 [[5]] (걷다 — caminar). 정말 즐거운 여름이 [[6]] (되다 — ser/convertirse).',
        blanks: [
          { options: ['갈 거예요', '가을 거예요', '갈거예요', '가ㄹ 거예요'], answer: '갈 거예요', explain: '가다 → raiz 가 (vocal) → 갈 거예요.' },
          { options: ['배울 거예요', '배우을 거예요', '배울거예요', '배우ㄹ 거예요'], answer: '배울 거예요', explain: '배우다 → raiz 배우 (vocal) → 배울 거예요.' },
          { options: ['먹을 거예요', '먹ㄹ 거예요', '먹갈 거예요', '먹을거예요'], answer: '먹을 거예요', explain: '먹다 → raiz 먹 (consonante) → 먹을 거예요.' },
          { options: ['볼 거예요', '보을 거예요', '볼거예요', '보ㄹ 거예요'], answer: '볼 거예요', explain: '보다 → raiz 보 (vocal) → 볼 거예요.' },
          { options: ['올 거예요', '오을 거예요', '올거예요', '오ㄹ 거예요'], answer: '올 거예요', explain: '오다 → raiz 오 (vocal) → 올 거예요.' },
          { options: ['걸을 거예요', '걷을 거예요', '걷ㄹ 거예요', '걸ㄹ 거예요'], answer: '걸을 거예요', explain: '걷다 → irregular ㄷ→ㄹ ante vocal: 걸 + 을 거예요 → 걸을 거예요.' },
          { options: ['될 거예요', '되을 거예요', '될거예요', '되ㄹ 거예요'], answer: '될 거예요', explain: '되다 → raiz 되 (vocal) → 될 거예요.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de -(으)ㄹ 거예요 para cada verbo.',
        type: 'freeText',
        scene: 'Planes para la proxima semana',
        text: '다음 주에 한국어를 [[0]]. (공부하다) / 친구에게 전화를 [[1]]. (하다) / 새 책을 [[2]]. (읽다) / 음악을 [[3]]. (듣다) / 저녁에 집에 [[4]]. (오다)',
        blanks: [
          { answer: '공부할 거예요', explain: '공부하다 → raiz 공부하 (vocal) → 공부할 거예요.' },
          { answer: '할 거예요', explain: '하다 → raiz 하 (vocal) → 할 거예요.' },
          { answer: '읽을 거예요', explain: '읽다 → raiz 읽 (consonante) → 읽을 거예요.' },
          { answer: '들을 거예요', explain: '듣다 → irregular ㄷ→ㄹ: 들 + 을 거예요 → 들을 거예요.' },
          { answer: '올 거예요', explain: '오다 → raiz 오 (vocal) → 올 거예요.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produccion guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas usando -(으)ㄹ 거예요.',
        type: 'write',
        items: [
          {
            scene: 'Planes de vacaciones',
            prompt: 'Di "El proximo ano voy a ir a Corea" (내년=el proximo ano, 한국=Corea, 가다=ir).',
            answer: '내년에 한국에 갈 거예요.',
            accepted: ['갈 거예요', '한국에 갈 거예요', '내년에 갈 거예요'],
            explain: '가다 → 갈 거예요. Estructura: tiempo + 에 + lugar + 에 + verbo futuro.',
          },
          {
            scene: 'Lo que no vas a hacer',
            prompt: 'Di "Hoy no voy a beber cafe" (오늘=hoy, 커피=cafe, 마시다=beber).',
            answer: '오늘은 커피를 안 마실 거예요.',
            accepted: ['안 마실 거예요', '커피를 안 마실 거예요', '마시지 않을 거예요'],
            explain: '마시다 → raiz 마시 (vocal) → 마실 거예요. Negacion: 안 마실 거예요.',
          },
          {
            scene: 'Prediccion del tiempo',
            prompt: 'Di "Creo que manana va a llover" (내일=manana, 비=lluvia, 오다=venir/caer).',
            answer: '내일 비가 올 거예요.',
            accepted: ['올 거예요', '비가 올 거예요', '내일 비가 올 거예요'],
            explain: '오다 → raiz 오 (vocal) → 올 거예요. Prediccion natural con -(으)ㄹ 거예요.',
          },
          {
            scene: 'Preguntando sobre manana',
            prompt: 'Pregunta "¿Que vas a hacer manana?" (내일=manana, 뭐=que, 하다=hacer).',
            answer: '내일 뭐 할 거예요?',
            accepted: ['할 거예요', '뭐 할 거예요', '내일 뭐 할 거예요?'],
            explain: '하다 → 할 거예요. Pregunta: añadir interrogacion al final.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Escritura libre',
        intro: 'Describe tus planes para el fin de semana usando -(으)ㄹ 거예요.',
        type: 'write',
        items: [
          {
            scene: 'Mis planes del sabado',
            prompt: 'Di al menos dos cosas que vas a hacer el sabado usando -(으)ㄹ 거예요.',
            answer: '토요일에 친구를 만날 거예요. 그리고 한국 음식을 먹을 거예요.',
            accepted: ['갈 거예요', '먹을 거예요', '볼 거예요', '할 거예요', '만날 거예요'],
            explain: 'Usa 토요일에 (el sabado) + actividad + -(으)ㄹ 거예요. Conecta con 그리고.',
          },
          {
            scene: 'Una cosa que no voy a hacer',
            prompt: 'Di una cosa que no vas a hacer este fin de semana usando 안 + -(으)ㄹ 거예요.',
            answer: '이번 주말에는 술을 안 마실 거예요.',
            accepted: ['안 갈 거예요', '안 먹을 거예요', '안 볼 거예요', '안 할 거예요'],
            explain: 'Negacion: 안 + raiz + -(으)ㄹ 거예요. Usa 이번 주말에는 (este fin de semana).',
          },
          {
            scene: 'Una prediccion',
            prompt: 'Haz una prediccion sobre el clima del fin de semana usando -(으)ㄹ 거예요.',
            answer: '주말에 날씨가 좋을 거예요.',
            accepted: ['좋을 거예요', '비가 올 거예요', '더울 거예요', '추울 거예요'],
            explain: 'Prediccion: 날씨가 좋을 거예요 (el clima estara bueno) o 비가 올 거예요 (va a llover).',
          },
        ],
      },
    ],
  },
}

export default topic
