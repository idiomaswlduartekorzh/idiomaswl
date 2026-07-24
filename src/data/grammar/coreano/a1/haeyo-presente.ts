import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'haeyo-presente',
  order: '06',
  color: '#c60c30',
  category: 'Verbos',
  level: 'A1',
  title: 'Presente 해요체 en Coreano A1 — Verbos con 아요/어요',
  shortTitle: 'Presente 아요/어요',
  metaTitle: 'Presente 해요체 coreano A1 — conjugación con 아요/어요',
  description:
    'La forma 해요체 es el presente polite más usado en la conversación cotidiana coreana. Se construye añadiendo 아요 o 어요 a la raíz del verbo según la vocal de la última sílaba. Es el registro más importante para principiantes.',
  lead: 'Raíz verbal + 아요 (si la vocal es ㅏ/ㅗ) o + 어요 (todo lo demás). 하다 → 해요 (irregular especial). Este presente es más natural y frecuente que la forma formal 합니다.',
  outcomes: [
    'Conjuga verbos comunes con 아요/어요',
    'Aplica la regla vocal armónica ㅏ/ㅗ vs. resto',
    'Distingue 해요체 (conversacional) de 합니다체 (formal)',
  ],

  guide: {
    goal: 'Construir el presente polite de verbos coreanos usando las terminaciones 아요 y 어요.',
    model: '가요 (voy/va), 먹어요 (como/come), 마셔요 (bebo/bebe), 해요 (hago/hace)',
    formula: 'Raíz + 아요 (vocal ㅏ/ㅗ) | Raíz + 어요 (resto) | 하다 → 해요',
    decisions: [
      'Identifica la raíz: quita -다 del infinitivo → 가다 → 가, 먹다 → 먹',
      'Mira la vocal de la última sílaba de la raíz: ㅏ o ㅗ → 아요; cualquier otra → 어요',
      '가다 → 가(ㅏ) → 가+아요 → 가요 (la vocal ㅏ se fusiona con 아)',
      '오다 → 오(ㅗ) → 오+아요 → 와요 (contracción especial: ㅗ+ㅏ=ㅘ)',
      '마시다 → 마시(ㅣ) → 마시+어요 → 마셔요 (contracción: ㅣ+ㅓ=ㅕ)',
      '먹다 → 먹(ㅓ) → 먹+어요 → 먹어요',
      '하다 → 해요 (irregular: siempre, no sigue la regla vocálica)',
    ],
    table: [
      ['Infinitivo', '해요체 (presente)', 'Significado'],
      ['가다 (ir)', '가요', 'voy / vas / va'],
      ['오다 (venir)', '와요', 'vengo / vienes / viene'],
      ['먹다 (comer)', '먹어요', 'como / comes / come'],
      ['마시다 (beber)', '마셔요', 'bebo / bebes / bebe'],
      ['배우다 (aprender)', '배워요', 'aprendo / aprendes / aprende'],
      ['하다 (hacer)', '해요', 'hago / haces / hace'],
    ],
    mistakes: [
      '"가어요" ❌ — cuando la raíz termina en ㅏ, se fusiona: 가+아요 → 가요 ✓',
      '"마시어요" ❌ — ㅣ+ㅓ se contraen en ㅕ: 마셔요 ✓',
      '"하아요" ❌ — 하다 es irregular: siempre 해요, nunca 하아요 ✓',
    ],
  },

  seo: [
    {
      heading: '¿Qué es la forma 해요체 y por qué aprenderla primero?',
      paragraphs: [
        'La 해요체 (haeyo-che) es el nivel de formalidad más usado en la conversación cotidiana coreana. Es educada pero no rígida — perfecta para hablar con personas desconocidas, en tiendas, en clase o con compañeros de trabajo. A diferencia de la 합니다체 (muy formal, para presentaciones y noticias), la 해요체 suena natural en casi cualquier situación.',
        'Su construcción sigue la regla de armonía vocálica: la vocal de la última sílaba de la raíz determina si se añade 아요 o 어요. Es el mismo principio que usarás luego para el pasado, las formas condicionales y muchas otras estructuras — dominar esta regla ahora es invertir para el futuro.',
      ],
    },
    {
      heading: 'La regla vocálica: ㅏ/ㅗ → 아요, el resto → 어요',
      paragraphs: [
        'Identifica la raíz verbal quitando -다 del infinitivo. Luego observa la vocal de su última sílaba. Si es ㅏ (a) o ㅗ (o) → añade 아요. Si es cualquier otra vocal (ㅓ, ㅜ, ㅣ, ㅡ, etc.) → añade 어요.',
        'Las contracciones más importantes: 가 + 아요 = 가요 (las dos ㅏ se fusionan); 오 + 아요 = 와요 (ㅗ+ㅏ=ㅘ); 마시 + 어요 = 마셔요 (ㅣ+ㅓ=ㅕ); 배우 + 어요 = 배워요 (ㅜ+ㅓ=ㅝ). Estas contracciones son sistemáticas y vale la pena memorizarlas como unidad.',
      ],
      table: [
        ['Vocal final de raíz', 'Terminación', 'Ejemplo'],
        ['ㅏ o ㅗ', '아요', '가요, 와요'],
        ['cualquier otra', '어요', '먹어요, 마셔요, 배워요'],
        ['하다 (irregular)', '해요', '해요, 공부해요'],
      ],
    },
    {
      heading: '하다 verbos: el grupo más productivo del coreano',
      paragraphs: [
        '하다 (hacer) es un verbo irregular cuya forma presente es siempre 해요, sin excepción. Lo importante es que en coreano miles de verbos se forman con sustantivo + 하다: 공부하다 (estudiar = estudio-hacer), 운동하다 (ejercitarse), 요리하다 (cocinar), 전화하다 (llamar por teléfono). Todos se conjugan igual: 공부해요, 운동해요, 요리해요, 전화해요.',
        'Para un hispanohablante esto es muy práctico: si sabes el sustantivo coreano o incluso el equivalente en inglés prestado (드라이브하다 = drive-hacer = conducir), puedes crear verbos nuevos añadiendo 하다.',
      ],
    },
    {
      heading: 'Diferencia entre 해요체 y 합니다체',
      paragraphs: [
        '해요체: 먹어요, 가요, 해요 — conversacional, natural, cálido. Se usa con personas que no conoces bien pero con quienes hay cierta cercanía o igualdad. Es el registro recomendado para A1 como forma activa.',
        '합니다체: 먹습니다, 갑니다, 합니다 — muy formal, usado en presentaciones, reuniones de trabajo, noticias y anuncios públicos. En A1 se recomienda reconocerlo pasivamente (tema 19) y producir activamente en 해요체.',
      ],
    },
  ],

  visual: {
    mode: 'conjugation',
    teacherLens: 'Conjugación 해요체: raíz + 아요/어요 con la regla vocálica y contracciones clave.',
    graphicPrompt: 'Tabla de conjugación de verbos frecuentes con raíz resaltada y vocal determinante.',
    scene: [
      ['가다 → 가요', 'voy / vas / va (vocal ㅏ → 아요 → contracción)'],
      ['오다 → 와요', 'vengo / vienes / viene (ㅗ+ㅏ=ㅘ)'],
      ['먹다 → 먹어요', 'como / comes / come (vocal ㅓ → 어요)'],
      ['마시다 → 마셔요', 'bebo / bebes / bebe (ㅣ+ㅓ=ㅕ)'],
      ['배우다 → 배워요', 'aprendo / aprendes / aprende (ㅜ+ㅓ=ㅝ)'],
      ['하다 → 해요', 'hago / haces / hace (irregular)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['regla vocálica ㅏ/ㅗ', 'contracciones', 'hada irregulares'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige la forma 해요체 correcta para cada verbo.',
        type: 'choice',
        items: [
          {
            scene: 'En clase de coreano',
            lines: [['Diego', '가다의 해요체는 뭐예요? (¿Cuál es la forma 해요체 de 가다?)']],
            options: ['가요', '가어요', '가이요', '갑니다'],
            answer: '가요',
            explain: '가다 → raíz 가 (ㅏ) → 가+아요 → 가요 (fusión de dos ㅏ).',
          },
          {
            scene: 'Conjugando verbos',
            lines: [['Carlos', '먹다 → ___? (comer →  ___)']],
            options: ['먹어요', '먹아요', '먹해요', '먹여요'],
            answer: '먹어요',
            explain: '먹다 → raíz 먹 (vocal ㅓ) → 먹+어요 → 먹어요.',
          },
          {
            scene: 'Verbos irregulares',
            lines: [['Emma', '공부하다의 해요체는? (¿La forma 해요체 de 공부하다?)']],
            options: ['공부해요', '공부하아요', '공부하요', '공부합니다'],
            answer: '공부해요',
            explain: '하다 → 해요 (irregular). 공부하다 → 공부해요.',
          },
          {
            scene: 'Bebiendo algo',
            lines: [['Ana', '마시다 → ___? (beber → ___)']],
            options: ['마셔요', '마시어요', '마시요', '마십니다'],
            answer: '마셔요',
            explain: '마시다 → 마시(ㅣ) + 어요 → ㅣ+ㅓ=ㅕ → 마셔요.',
          },
          {
            scene: 'Aprendiendo',
            lines: [['Sofia', '배우다 → ___? (aprender → ___)']],
            options: ['배워요', '배우어요', '배우요', '배웁니다'],
            answer: '배워요',
            explain: '배우다 → 배우(ㅜ) + 어요 → ㅜ+ㅓ=ㅝ → 배워요.',
          },
          {
            scene: 'Viniendo',
            lines: [['Marco', '오다 → ___? (venir → ___)']],
            options: ['와요', '오아요', '오요', '옵니다'],
            answer: '와요',
            explain: '오다 → 오(ㅗ) + 아요 → ㅗ+ㅏ=ㅘ → 와요.',
          },
          {
            scene: '해요체 vs 합니다체',
            lines: [['Diego', '해요체는 어떤 상황에서 써요? (¿En qué situación se usa 해요체?)']],
            options: ['Conversación cotidiana educada', 'Solo en noticias', 'Solo con jefes', 'Solo en cartas formales'],
            answer: 'Conversación cotidiana educada',
            explain: '해요체 es educada y natural — el registro más versátil para principiantes.',
          },
          {
            scene: 'Regla vocálica',
            lines: [['Lina', '¿Qué terminación va con vocal ㅗ?']],
            options: ['아요', '어요', '해요', '이에요'],
            answer: '아요',
            explain: 'Vocal ㅏ o ㅗ → 아요. El resto → 어요.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Diálogo con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los diálogos con la forma 해요체 correcta.',
        type: 'dual',
        items: [
          {
            scene: 'En el café',
            lines: [
 ['Lina', '뭐 [[0]]? (¿Qué bebes?)'],
 ['Carlos', '커피를 [[1]]. (Bebo café.)'],
 ],
            blanks: [
              { options: ['마셔요', '마시요', '마십니다', '마시어요'], answer: '마셔요', explain: '마시다 → 마셔요. Pregunta: 뭐 마셔요?' },
              { options: ['마셔요', '마시어요', '마시요', '마십니다'], answer: '마셔요', explain: '커피를 마셔요 = bebo café. 마시다 → 마셔요.' },
            ],
          },
          {
            scene: 'Después de clases',
            lines: [
 ['Ana', '오늘 어디 [[0]]? (¿Adónde vas hoy?)'],
 ['Marco', '집에 [[1]]. (Voy a casa.)'],
 ],
            blanks: [
              { options: ['가요', '가어요', '가이요', '갑니다'], answer: '가요', explain: '가다 → 가요. Pregunta de destino con 어디.' },
              { options: ['가요', '가어요', '갑니다', '가이요'], answer: '가요', explain: '집에 가요 = voy a casa. 가다 → 가요.' },
            ],
          },
          {
            scene: 'En WeLearn',
            lines: [
 ['Emma', '지금 뭐 [[0]]? (¿Qué haces ahora?)'],
 ['Sofia', '한국어를 [[1]]. (Estudio coreano.)'],
 ],
            blanks: [
              { options: ['해요', '하아요', '하요', '합니다'], answer: '해요', explain: '하다 → 해요. 뭐 해요? = ¿Qué haces?' },
              { options: ['공부해요', '공부하아요', '공부해', '공부합니다'], answer: '공부해요', explain: '공부하다 → 공부해요. Verbo con 하다.' },
            ],
          },
          {
            scene: 'Hablando de Diego',
            lines: [
 ['Carlos', '데이비드 선생님이 어디서 [[0]]? (¿Dónde viene Diego?)'],
 ['Lina', '부카라망가에서 [[1]]. (Viene de Bucaramanga.)'],
 ],
            blanks: [
              { options: ['와요', '오아요', '오요', '옵니다'], answer: '와요', explain: '오다 → 와요. 어디서 와요? = ¿De dónde viene?' },
              { options: ['와요', '오아요', '오요', '옵니다'], answer: '와요', explain: '부카라망가에서 와요 = viene de Bucaramanga. 오다 → 와요.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa la descripción de la rutina con la forma 해요체 correcta.',
        type: 'guidedText',
        scene: 'Rutina diaria de un estudiante de WeLearn',
        text: '저는 매일 아침 커피를 [[0]]. 그리고 학교에 [[1]]. 점심에 밥을 [[2]]. 오후에 한국어를 [[3]]. 저녁에 집에 [[4]]. 잠자기 전에 음악을 [[5]].',
        blanks: [
          { options: ['마셔요', '마시요', '마시어요', '마십니다'], answer: '마셔요', explain: '마시다 → 마셔요 (ㅣ+ㅓ=ㅕ).' },
          { options: ['가요', '가어요', '갑니다', '가이요'], answer: '가요', explain: '가다 → 가요 (ㅏ+ㅏ=ㅏ).' },
          { options: ['먹어요', '먹아요', '먹해요', '먹습니다'], answer: '먹어요', explain: '먹다 → 먹어요 (vocal ㅓ → 어요).' },
          { options: ['공부해요', '공부하아요', '공부하요', '공부합니다'], answer: '공부해요', explain: '공부하다 → 공부해요 (하다 irregular).' },
          { options: ['와요', '오아요', '옵니다', '오요'], answer: '와요', explain: '오다 → 와요 (ㅗ+ㅏ=ㅘ).' },
          { options: ['들어요', '들아요', '듣어요', '듣습니다'], answer: '들어요', explain: '듣다 → 들어요 (irregular: ㄷ→ㄹ antes de vocal).' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma 해요체 correcta de cada verbo.',
        type: 'freeText',
        scene: 'Conjugación en contexto',
        text: '저는 한국어를 배우[[0]]. (배우다) / 친구가 와[[1]]. (오다) / 우리는 같이 밥을 먹[[2]]. (먹다) / 지금 뭐 하[[3]]? (하다) / 저는 매일 운동해[[4]]. (운동하다)',
        blanks: [
          { answer: '배워요', accepted: ['배워요'], explain: '배우다 → 배워요. ㅜ+ㅓ=ㅝ.' },
          { answer: '와요', accepted: ['와요'], explain: '오다 → 와요. ㅗ+ㅏ=ㅘ.' },
          { answer: '먹어요', accepted: ['먹어요'], explain: '먹다 → 먹어요. Vocal ㅓ → 어요.' },
          { answer: '해요', accepted: ['해요'], explain: '하다 → 해요. Irregular.' },
          { answer: '운동해요', accepted: ['운동해요'], explain: '운동하다 → 운동해요. 하다 → 해요.' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones en 해요체 usando los verbos dados.',
        type: 'write',
        items: [
          {
            scene: 'Rutina diaria',
            prompt: 'Di "Bebo café todos los días" en coreano (매일=todos los días, 커피=café, 마시다=beber).',
            answer: '저는 매일 커피를 마셔요.',
            accepted: ['마셔요', '커피를 마셔요', '매일 커피를 마셔요'],
            explain: '마시다 → 마셔요. Estructura: 저는 매일 커피를 마셔요.',
          },
          {
            scene: 'Actividades del día',
            prompt: 'Di "Estudio coreano" en coreano (한국어=coreano, 공부하다=estudiar).',
            answer: '저는 한국어를 공부해요.',
            accepted: ['공부해요', '한국어를 공부해요'],
            explain: '공부하다 → 공부해요. Hada irregular siempre → 해요.',
          },
          {
            scene: 'Yendo a algún lugar',
            prompt: 'Pregunta "¿Adónde vas?" en coreano (어디=dónde, 가다=ir).',
            answer: '어디 가요?',
            accepted: ['어디 가요', '어디 가요?', '어디에 가요'],
            explain: '가다 → 가요. Pregunta: 어디 가요? (lit. "¿Dónde vas?")',
          },
          {
            scene: 'Aprendiendo idiomas',
            prompt: 'Di "Aprendo coreano en WeLearn" (배우다=aprender, 위런에서=en WeLearn).',
            answer: '저는 위런에서 한국어를 배워요.',
            accepted: ['배워요', '한국어를 배워요', '위런에서 한국어를 배워요'],
            explain: '배우다 → 배워요. ㅜ+ㅓ=ㅝ.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe tu rutina diaria usando al menos 4 verbos en 해요체.',
        type: 'write',
        items: [
          {
            scene: 'Mi mañana',
            prompt: 'Di qué haces por la mañana: 아침에 ___ 해요/가요/마셔요/먹어요.',
            answer: '아침에 커피를 마셔요. 그리고 학교에 가요.',
            accepted: ['마셔요', '먹어요', '가요', '해요', '아침에'],
            explain: 'Rutina matutina: 아침에 + acción. Usa 해요체 con cada verbo.',
          },
          {
            scene: 'Mi tarde',
            prompt: 'Di qué estudias o haces por la tarde: 오후에 ___ 공부해요/배워요.',
            answer: '오후에 한국어를 공부해요.',
            accepted: ['공부해요', '배워요', '오후에'],
            explain: '공부하다 → 공부해요. 배우다 → 배워요.',
          },
          {
            scene: 'Mi noche',
            prompt: 'Di qué haces por la noche: 저녁에 ___ 먹어요/봐요/들어요.',
            answer: '저녁에 밥을 먹어요. 음악을 들어요.',
            accepted: ['먹어요', '봐요', '들어요', '저녁에'],
            explain: '먹다 → 먹어요. 보다 → 봐요. 듣다 → 들어요.',
          },
        ],
      },
    ],
  },
}

export default topic
