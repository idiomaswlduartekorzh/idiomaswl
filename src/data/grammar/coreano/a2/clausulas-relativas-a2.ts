import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'clausulas-relativas-a2',
  order: '12',
  color: '#c60c30',
  category: 'Sintaxis',
  level: 'A2',
  title: 'Cláusulas relativas en coreano A2: N이/가 V-는/ㄴ N',
  shortTitle: 'Cláusulas relativas',
  metaTitle: 'Cláusulas relativas en coreano A2 — verbo adjetival, el libro que leí, la persona que viene',
  description:
    'En coreano no existen pronombres relativos como "que", "quien" o "el cual". En cambio, el verbo se convierte en adjetivo y se coloca ANTES del sustantivo que modifica. "Libro que leo" = 내가 읽는 책. "Persona que vino" = 온 사람. Esta estructura es fundamental para el coreano A2 en adelante.',
  lead: '내가 읽는 책: las cláusulas relativas del coreano donde el verbo va antes del sustantivo.',
  outcomes: [
    'Usar V-는 para formar cláusulas relativas en presente/habitual',
    'Usar V-ㄴ/은 para cláusulas relativas en pasado',
    'Usar V-ㄹ/을 para cláusulas relativas en futuro o posibilidad',
    'Colocar la cláusula relativa antes del sustantivo modificado',
  ],

  guide: {
    goal: 'Modificar sustantivos con cláusulas relativas usando las formas verbales -는, -ㄴ/은, -ㄹ/을.',
    model: '내가 읽는 책 (el libro que leo) / 어제 먹은 음식 (la comida que comí ayer)',
    formula: '[Cláusula relativa: S + O + V-는/은/을] + Sustantivo modificado',
    decisions: [
      'Presente: V-는 + N → "먹는 음식" (la comida que como)',
      'Pasado: V-ㄴ + N (si el tallo termina en vocal) → "먹은 음식" (la comida que comí)',
      'Pasado: V-은 + N (si el tallo termina en consonante) → "읽은 책" (el libro que leí)',
      'Futuro/posibilidad: V-ㄹ/을 + N → "먹을 음식" (la comida que comeré)',
      'El orden siempre es: sujeto + objeto + verbo adjetival + sustantivo modificado',
    ],
    table: [
      ['Tiempo', 'Terminación', 'Ejemplo'],
      ['Presente/Habitual', '-는', '내가 읽는 책 (el libro que leo)'],
      ['Pasado', '-ㄴ/은', '어제 읽은 책 (el libro que leí ayer)'],
      ['Futuro', '-ㄹ/을', '내일 읽을 책 (el libro que leeré mañana)'],
    ],
    mistakes: [
      '"나는 책 읽는" ❌ (no hay sustantivo al final) → "내가 읽는 책" ✓ — el sustantivo modificado va AL FINAL.',
      '"어제 먹는 음식" ❌ (presente en pasado) → "어제 먹은 음식" ✓ — el pasado usa -ㄴ/은.',
      '"내가 가는 사람" ❌ (sujeto incorrecto) → "내가 만나는 사람" ✓ — "가는" = que va, "만나는" = que conozco.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo funcionan las cláusulas relativas en coreano?',
      paragraphs: [
        'El coreano no tiene pronombres relativos. Para decir "el libro que leo", la cláusula relativa se convierte en un modificador adjetival que va ANTES del sustantivo: "내가 읽는 책" (literalmente: "yo-sujeto leer-PRES libro"). El verbo de la cláusula toma una terminación especial según el tiempo: -는 (presente), -ㄴ/은 (pasado), -ㄹ/을 (futuro).',
        'Esta estructura es uno de los pilares del coreano intermedio. Permite expresar ideas complejas: "서울에서 온 친구" (el amigo que vino de Seúl), "내가 좋아하는 음식" (la comida que me gusta), "우리가 갈 곳" (el lugar al que iremos).',
      ],
    },
    {
      heading: '¿Cómo cambian las terminaciones relativas según el tiempo en coreano?',
      paragraphs: [
        'Presente/habitual: tallo + -는 para todos los verbos de acción (comer → 먹는, ir → 가는, ver → 보는). Para verbos descriptivos (adjetivos) se usa -ㄴ/은: 크다 → 큰 (grande), 작다 → 작은 (pequeño).',
        'Pasado: tallo + -ㄴ (si termina en vocal) o -은 (si termina en consonante). "먹다" → "먹은", "오다" → "온", "읽다" → "읽은". Futuro: tallo + -ㄹ (si termina en vocal) o -을 (si termina en consonante).',
      ],
    },
    {
      heading: '¿Por qué la cláusula relativa va antes del sustantivo en coreano?',
      paragraphs: [
        'Porque el coreano coloca SIEMPRE el modificador delante de lo modificado, y una oración de relativo no es más que un modificador largo. Donde el español dice "el libro QUE leí", el coreano dice literalmente "leí-que libro": 내가 읽은 책 (naega ilgeun chaek). No existe un pronombre relativo como "que/quien/donde"; en su lugar, el verbo de la cláusula toma una terminación atributiva que además marca el tiempo: presente -는 (읽는 책 = el libro que leo), pasado -(으)ㄴ (읽은 책 = el libro que leí), futuro -(으)ㄹ (읽을 책 = el libro que leeré). Esta inversión total del orden es la mayor dificultad del hispanohablante y conviene practicarla frase a frase.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Cláusulas relativas: V-는/은/을 + N, el verbo va ANTES del sustantivo modificado.',
    graphicPrompt: 'Un libro con flechas mostrando la estructura: [sujeto + verbo-는] + sustantivo, todo antes del núcleo.',
    scene: [
      ['내가 읽는 책이 재미있어요.', 'El libro que estoy leyendo es interesante.'],
      ['어제 먹은 음식이 맛있었어요.', 'La comida que comí ayer estaba rica.'],
      ['내일 갈 곳을 정했어요?', '¿Has decidido el lugar al que irás mañana?'],
      ['한국에서 온 친구를 만났어요.', 'Me encontré con un amigo que vino de Corea.'],
      ['내가 좋아하는 노래예요.', 'Es la canción que me gusta.'],
      ['우리가 살 집을 찾고 있어요.', 'Estamos buscando la casa en la que viviremos.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['V-는 (presente)', 'V-ㄴ/은 (pasado)', 'V-ㄹ/을 (futuro)', 'orden: [cláusula] + N'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la terminación correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la terminación verbal correcta para la cláusula relativa.',
        type: 'choice',
        items: [
          {
            scene: 'El libro que leo (habitualmente).',
            lines: [['', '내가 ___ 책']],
            options: ['읽는', '읽은', '읽을', '읽고'],
            answer: '읽는',
            explain: '"읽는" = terminación -는 para presente/habitual. El libro que (suelo) leer.',
          },
          {
            scene: 'La comida que comí ayer.',
            lines: [['', '어제 ___ 음식']],
            options: ['먹은', '먹는', '먹을', '먹고'],
            answer: '먹은',
            explain: '"먹은" = terminación -은 para pasado (먹다, tallo termina en consonante).',
          },
          {
            scene: 'El lugar al que iremos.',
            lines: [['', '우리가 ___ 곳']],
            options: ['갈', '가는', '간', '가고'],
            answer: '갈',
            explain: '"갈" = terminación -ㄹ para futuro (가다, tallo termina en vocal).',
          },
          {
            scene: 'La persona que vino de Seúl.',
            lines: [['', '서울에서 ___ 사람']],
            options: ['온', '오는', '올', '오고'],
            answer: '온',
            explain: '"온" = terminación -ㄴ para pasado (오다, tallo termina en vocal → -ㄴ).',
          },
          {
            scene: 'La canción que me gusta ahora.',
            lines: [['', '내가 좋아___ 노래']],
            options: ['하는', '한', '할', '하고'],
            answer: '하는',
            explain: '"좋아하는" = terminación -는 para presente.',
          },
          {
            scene: 'La casa que compraremos.',
            lines: [['', '우리가 살 ___']],
            options: ['집', '에', '을', '에서'],
            answer: '집',
            explain: '"살" = terminación -ㄹ (futuro de 살다). El sustantivo modificado "집" va al final.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Relativa y sustantivo',
        tag: '2 espacios',
        intro: 'Completa la terminación verbal y el sustantivo modificado.',
        type: 'dual',
        items: [
          {
            scene: 'El café que tomo por la mañana.',
            lines: [['', '아침에 마시[[0]] [[1]]이 필요해요.']],
            blanks: [
              { options: ['는', 'ㄴ', 'ㄹ', '고'], answer: '는', explain: '"마시는" = que bebo (presente).' },
              { options: ['커피', '음식', '물', '차'], answer: '커피', explain: '"마시는 커피" = el café que bebo.' },
            ],
          },
          {
            scene: 'La amiga que conocí en la fiesta.',
            lines: [['', '파티에서 만[[0]] [[1]]가 왔어요.']],
            blanks: [
              { options: ['난', '나는', '날', '나고'], answer: '난', explain: '"만난" → 만나 + ㄴ = 만난. Pasado (vocal terminal → -ㄴ).' },
              { options: ['친구', '사람', '선생님', '학생'], answer: '친구', explain: '"만난 친구" = la amiga que conocí.' },
            ],
          },
          {
            scene: 'El restaurante al que iremos mañana.',
            lines: [['', '내일 [[0]] [[1]]을 예약했어요.']],
            blanks: [
              { options: ['갈', '가는', '간', '가고'], answer: '갈', explain: '"갈" = futuro de 가다 (vocal → -ㄹ).' },
              { options: ['식당', '학교', '카페', '병원'], answer: '식당', explain: '"갈 식당" = el restaurante al que iremos.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Descripción con cláusulas relativas',
        tag: 'Texto guiado',
        intro: 'Completa el texto usando las terminaciones correctas de cláusulas relativas.',
        type: 'guidedText',
        scene: '수진이가 자신의 일상을 묘사해요.',
        text: '제가 매일 타[[0]] 버스는 9시에 와요. 어제 [[1]] 영화가 정말 재미있었어요. 제가 좋아[[2]] 노래를 들으면서 통학해요. 다음 주에 [[3]] 시험을 위해 공부하고 있어요. 친구가 만들[[4]] 케이크를 먹어 봤어요?',
        blanks: [
          { options: ['는', 'ㄴ', 'ㄹ', '고'], answer: '는', explain: '"타는 버스" = el autobús que tomo (presente habitual).' },
          { options: ['본', '보는', '볼', '보고'], answer: '본', explain: '"본 영화" = la película que vi (pasado: 보 + ㄴ = 본).' },
          { options: ['하는', '한', '할', '하고'], answer: '하는', explain: '"좋아하는 노래" = la canción que me gusta (presente).' },
          { options: ['볼', '보는', '본', '보고'], answer: '볼', explain: '"볼 시험" = el examen que haré (futuro: 보 + ㄹ = 볼).' },
          { options: ['든', '드는', '들', '들고'], answer: '든', explain: '"만든 케이크" = el pastel que hizo (pasado: 만들 → irregular: 만든).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa la cláusula relativa',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la terminación correcta del verbo en la cláusula relativa.',
        type: 'freeText',
        scene: '관계절 완성하기.',
        text: '내가 자주 가[[0]] 카페 / 어제 만[[1]] 사람 / 내일 먹[[2]] 음식 / 한국에서 온[[3]] 친구 (이미 옴)',
        blanks: [
          { answer: '는', explain: '"가는 카페" = el café al que voy (presente habitual).' },
          { answer: '난', explain: '"만난 사람" = la persona que conocí (pasado: 만나 + ㄴ = 만난).' },
          { answer: '을', explain: '"먹을 음식" = la comida que comeré (futuro: 먹 + 을 = 먹을).' },
          { answer: '(없음/이미 완성)', explain: '"한국에서 온 친구" = el amigo que vino de Corea (온 = 오 + ㄴ = 온).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye cláusulas relativas',
        tag: 'Escritura guiada',
        intro: 'Combina la cláusula relativa con el sustantivo correcto.',
        type: 'write',
        items: [
          {
            scene: '"내가 좋아한다" + "음식" → 내가 좋아하는 음식',
            prompt: '"어제 봤다" + "영화" →',
            answer: '어제 본 영화',
            accepted: ['어제 봤던 영화'],
            explain: '"보다" pasado: 보 + ㄴ = 본. "어제 본 영화" = la película que vi ayer.',
          },
          {
            scene: '"한국어를 가르친다" + "선생님" →',
            prompt: '"한국어를 가르친다" + "선생님" →',
            answer: '한국어를 가르치는 선생님',
            accepted: ['한국어를 가르치는 분'],
            explain: '"가르치는" = que enseña (presente). 선생님 = el profesor.',
          },
          {
            scene: '"내일 살 것이다" + "집" →',
            prompt: '"내일 살 것이다" + "집" →',
            answer: '내일 살 집',
            accepted: ['우리가 살 집'],
            explain: '"살다" futuro: 살 + ㄹ = 살 → 살. "내일 살 집" = la casa en la que viviré mañana.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe usando cláusulas relativas',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones propias usando cláusulas relativas en coreano.',
        type: 'write',
        items: [
          {
            scene: 'Describe una película, libro o canción que te gusta usando una cláusula relativa.',
            prompt: '내가 좋아하는 [영화/책/노래]를 묘사하세요.',
            answer: '내가 좋아하는 영화는 액션 영화예요. 요즘 자주 듣는 노래는 BTS 노래예요.',
            accepted: ['내가 매일 읽는 책은 소설이에요.'],
            explain: '"V-는 + N" = sustantivo con cláusula relativa de presente.',
          },
          {
            scene: 'Describe algo que hiciste ayer o algo que harás mañana.',
            prompt: '어제 V-ㄴ N 또는 내일 V-ㄹ N으로 문장을 써 보세요.',
            answer: '어제 먹은 비빔밥이 정말 맛있었어요. 내일 볼 영화를 이미 예매했어요.',
            accepted: ['어제 만난 친구가 재미있었어요.'],
            explain: 'Pasado (-ㄴ/은) para experiencias pasadas, futuro (-ㄹ/을) para planes.',
          },
        ],
      },
    ],
  },
}

export default topic
