import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'parecer-neun-geot-gatda-a2',
  order: '13',
  color: '#c60c30',
  category: 'Gramática',
  level: 'A2',
  title: '-(으)ㄴ/는 것 같다 en coreano A2: parece que, creo que',
  shortTitle: '것 같다 (parece)',
  metaTitle: 'Parecer y creer en coreano A2 — 것 같다, -(으)ㄴ 것 같다',
  description:
    'La expresión 것 같다 (geot gatda) se usa para expresar suposiciones, probabilidades o impresiones. Equivale a "parece que", "creo que" o "me parece que". Se combina con formas verbales de presente (-는 것 같다), pasado (-ㄴ/은 것 같다) y futuro (-ㄹ/을 것 같다).',
  lead: '피곤한 것 같아요: cómo expresar suposiciones e impresiones en coreano.',
  outcomes: [
    'Usar -는 것 같다 para suposiciones sobre el presente',
    'Usar -ㄴ/은 것 같다 para suposiciones sobre el pasado',
    'Usar -ㄹ/을 것 같다 para predicciones sobre el futuro',
    'Expresar incertidumbre y opiniones de forma natural en coreano',
  ],

  guide: {
    goal: 'Expresar suposiciones, impresiones y probabilidades con -(으)ㄴ/는 것 같다.',
    model: '피곤한 것 같아요. (Parece que está cansado.) / 비가 올 것 같아요. (Parece que va a llover.)',
    formula: 'V-는/은/을 것 같다 | Adj-ㄴ/은 것 같다',
    decisions: [
      'Presente (acción): V-는 것 같다 → "자는 것 같아요" (parece que duerme)',
      'Presente (adjetivo): Adj-ㄴ/은 것 같다 → "피곤한 것 같아요" (parece cansado)',
      'Pasado: V-ㄴ/은 것 같다 → "먹은 것 같아요" (parece que comió)',
      'Futuro/probabilidad: V-ㄹ/을 것 같다 → "비가 올 것 같아요" (parece que lloverá)',
      'Forma honorífica/educada: 것 같아요 (formal); 것 같아 (informal)',
    ],
    table: [
      ['Tipo', 'Estructura', 'Ejemplo'],
      ['Presente (verbo)', '-는 것 같다', '지금 자는 것 같아요'],
      ['Presente (adjetivo)', '-ㄴ/은 것 같다', '피곤한 것 같아요'],
      ['Futuro', '-ㄹ/을 것 같다', '비가 올 것 같아요'],
    ],
    mistakes: [
      '"피곤는 것 같아요" ❌ → "피곤한 것 같아요" ✓ — los adjetivos usan -ㄴ/은, no -는.',
      '"먹는 것 같아요" (queriendo decir pasado) → "먹은 것 같아요" ✓ — pasado usa -ㄴ/은.',
      '"올 것 같아요" ✓ pero "오는 것 같아요" también es posible con matiz diferente (presente vs. futuro próximo).',
    ],
  },

  seo: [
    {
      heading: '것 같다: cómo expresar suposiciones en coreano',
      paragraphs: [
        '것 같다 (geot gatda) es una de las expresiones más usadas en coreano para expresar suposiciones, impresiones o probabilidades. "피곤한 것 같아요" = "Parece cansado" o "Creo que está cansado". Esta expresión muestra incertidumbre o que la información es inferida, no confirmada.',
        'La forma cambia según el tipo de palabra: con verbos de acción en presente se usa -는 것 같다; con adjetivos en presente se usa -ㄴ/은 것 같다; con verbos de acción en pasado se usa -ㄴ/은 것 같다; y para el futuro o probabilidad se usa -ㄹ/을 것 같다.',
      ],
    },
    {
      heading: 'Cómo suena más natural en coreano cotidiano',
      paragraphs: [
        'En el habla cotidiana, 것 같아요 se usa muy frecuentemente para dar opiniones de forma modesta o para hacer predicciones: "좀 어려울 것 같아요" (Creo que será un poco difícil), "맛있을 것 같아요" (Parece que estará rico).',
        'También se usa para hacer críticas o comentarios negativos de forma más suave: "조금 늦을 것 같아요" (Parece que llegaré un poco tarde) es más educado que "늦어요" (llego tarde). Es una herramienta clave para el tono de cortesía en coreano.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '것 같다: suposiciones con -는 (presente), -ㄴ/은 (pasado), -ㄹ/을 (futuro).',
    graphicPrompt: 'Persona observando a otra con un signo de interrogación, pensando "parece que...".',
    scene: [
      ['피곤한 것 같아요.', 'Parece que está cansado.'],
      ['지금 자는 것 같아요.', 'Parece que está durmiendo ahora.'],
      ['비가 올 것 같아요.', 'Parece que va a llover.'],
      ['이미 먹은 것 같아요.', 'Parece que ya comió.'],
      ['어려울 것 같아요.', 'Parece que será difícil.'],
      ['맛있을 것 같아요!', '¡Parece que estará rico!'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-는 것 같다 (verbo presente)', '-ㄴ/은 것 같다 (adj./pasado)', '-ㄹ/을 것 같다 (futuro)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la terminación correcta para 것 같다.',
        type: 'choice',
        items: [
          {
            scene: 'Parece que está lloviendo (ahora, verbo).',
            lines: [['', '비가 ___ 것 같아요.']],
            options: ['오는', '온', '올', '오고'],
            answer: '오는',
            explain: '"비가 오는 것 같아요" = Parece que llueve (ahora). Verbo de acción presente → -는.',
          },
          {
            scene: 'El ejercicio parece difícil (adjetivo).',
            lines: [['', '이 운동이 ___ 것 같아요.']],
            options: ['어려운', '어려는', '어려울', '어렵고'],
            answer: '어려운',
            explain: '"어려운 것 같아요" = Parece difícil. Adjetivo → -ㄴ/은 것 같다.',
          },
          {
            scene: 'Parece que ya comió.',
            lines: [['', '이미 ___ 것 같아요.']],
            options: ['먹은', '먹는', '먹을', '먹고'],
            answer: '먹은',
            explain: '"먹은 것 같아요" = Parece que ya comió (pasado).',
          },
          {
            scene: 'Parece que vendrá mañana.',
            lines: [['', '내일 ___ 것 같아요.']],
            options: ['올', '오는', '온', '오고'],
            answer: '올',
            explain: '"올 것 같아요" = Parece que vendrá (futuro: 오 + ㄹ = 올).',
          },
          {
            scene: 'Parece que es coreano (adjetivo implícito).',
            lines: [['', '한국 사람인 ___ 같아요.']],
            options: ['것', '거', '느', '은'],
            answer: '것',
            explain: '"한국 사람인 것 같아요" = Parece que es coreano.',
          },
          {
            scene: 'Parece que estará delicioso.',
            lines: [['', '맛있___ 것 같아요.']],
            options: ['을', '는', 'ㄴ', '고'],
            answer: '을',
            explain: '"맛있을 것 같아요" = Parece que estará rico. 맛있다 + -을 (futuro/probabilidad).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Observación y suposición',
        tag: '2 espacios',
        intro: 'Completa la observación y la suposición con 것 같다.',
        type: 'dual',
        items: [
          {
            scene: 'Ves que alguien bosteza mucho.',
            lines: [['', '많이 [[0]] 것 같아요. [[1]] 것 같아요.']],
            blanks: [
              { options: ['피곤한', '피곤는', '피곤을', '피곤하고'], answer: '피곤한', explain: '"피곤한 것 같아요" = Parece cansado. Adjetivo → -ㄴ.' },
              { options: ['자고 싶은', '자고 싶는', '자고 싶을', '자고 싶고'], answer: '자고 싶은', explain: '"자고 싶은 것 같아요" = Parece que quiere dormir.' },
            ],
          },
          {
            scene: 'Miras el cielo antes de salir.',
            lines: [['', '하늘이 [[0]] 것 같아요. 비가 [[1]] 것 같아요.']],
            blanks: [
              { options: ['흐린', '흐리는', '흐릴', '흐리고'], answer: '흐린', explain: '"흐린 것 같아요" = Parece nublado. Adjetivo → -ㄴ.' },
              { options: ['올', '오는', '온', '오고'], answer: '올', explain: '"비가 올 것 같아요" = Parece que lloverá (futuro).' },
            ],
          },
          {
            scene: 'Ves que la tienda está cerrada.',
            lines: [['', '가게가 [[0]] 것 같아요. 오늘 [[1]] 것 같아요.']],
            blanks: [
              { options: ['닫힌', '닫히는', '닫힐', '닫히고'], answer: '닫힌', explain: '"닫힌 것 같아요" = Parece que está cerrado (pasado: ya cerró).' },
              { options: ['쉬는', '쉰', '쉴', '쉬고'], answer: '쉬는', explain: '"오늘 쉬는 것 같아요" = Parece que hoy descansan (presente).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Suposiciones en un diálogo',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de 것 같다 según el contexto.',
        type: 'guidedText',
        scene: '지민과 수아가 친구 태양에 대해 이야기해요.',
        text: '지민: 태양이 왜 안 왔지? 수아: 아마 바[[0]] 것 같아요. 지민: 핸드폰도 안 받네요. 수아: 자[[1]] 것 같아요. 지민: 내일은 [[2]] 것 같아요? 수아: 글쎄요, 올[[3]] 것 같아요.',
        blanks: [
          { options: ['쁜', '쁘는', '쁠', '쁘고'], answer: '쁜', explain: '"바쁜 것 같아요" = Parece que está ocupado. Adjetivo → -ㄴ.' },
          { options: ['는', 'ㄴ', 'ㄹ', '고'], answer: '는', explain: '"자는 것 같아요" = Parece que está durmiendo. Verbo presente → -는.' },
          { options: ['올', '오는', '온', '오고'], answer: '올', explain: '"올 것 같아요?" = ¿Parece que vendrá? Futuro → -ㄹ.' },
          { options: ['것', '거', '는', '을'], answer: '것', explain: '"올 것 같아요" = Parece que vendrá.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa las suposiciones',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta de 것 같다.',
        type: 'freeText',
        scene: '상황을 보고 추측해 보세요.',
        text: '그 사람이 한국 사람인 ___ 같아요. / 오늘 날씨가 춥___ 것 같아요. / 이미 출발___ 것 같아요. / 내일 늦___ 것 같아요.',
        blanks: [
          { answer: '것', explain: '"한국 사람인 것 같아요" = Parece que es coreano.' },
          { answer: '은', explain: '"추운 것 같아요" = Parece que hace frío (adjetivo: 춥 → 추운).' },
          { answer: '한', explain: '"출발한 것 같아요" = Parece que ya salió (pasado).' },
          { answer: '을', explain: '"늦을 것 같아요" = Parece que llegaré tarde (futuro).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Expresa suposiciones',
        tag: 'Escritura guiada',
        intro: 'Expresa la suposición usando 것 같다.',
        type: 'write',
        items: [
          {
            scene: 'Parece que está cansado (lo ves en su cara).',
            prompt: '그 사람 얼굴을 보면... (피곤하다)',
            answer: '피곤한 것 같아요.',
            accepted: ['많이 피곤한 것 같아요.'],
            explain: '"피곤하다" → adjetivo → 피곤한 것 같다.',
          },
          {
            scene: 'Parece que va a llover (cielo nublado).',
            prompt: '하늘이 흐려요. (비가 오다)',
            answer: '비가 올 것 같아요.',
            accepted: ['비가 오는 것 같아요.'],
            explain: '"오다" + -ㄹ → 올 것 같다 (probabilidad futura).',
          },
          {
            scene: 'Parece que ya se fue (no está en casa).',
            prompt: '집에 없어요. (이미 가다)',
            answer: '이미 간 것 같아요.',
            accepted: ['이미 나간 것 같아요.'],
            explain: '"가다" + 과거 → 간 것 같다 (가 + ㄴ = 간).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe suposiciones propias',
        tag: 'Escritura libre',
        intro: 'Escribe suposiciones sobre personas o situaciones usando 것 같다.',
        type: 'write',
        items: [
          {
            scene: 'Tu amigo no ha llegado. Escribe 3 suposiciones sobre por qué.',
            prompt: '친구가 안 왔어요. 세 가지 추측을 써 보세요.',
            answer: '바쁜 것 같아요. 길이 막히는 것 같아요. 늦잠을 잔 것 같아요.',
            accepted: ['피곤한 것 같아요. 아픈 것 같아요. 잊어버린 것 같아요.'],
            explain: '다양한 형태의 것 같다: 형용사(-ㄴ 것 같다), 동사(-는/ㄴ 것 같다).',
          },
          {
            scene: 'Ves algo por primera vez. Escribe 2 suposiciones usando 것 같다.',
            prompt: '처음 보는 것을 보고 추측을 써 보세요.',
            answer: '한국 음식인 것 같아요. 맛있을 것 같아요.',
            accepted: ['비쌀 것 같아요. 어려울 것 같아요.'],
            explain: '"인 것 같다" para identidad; "-ㄹ/을 것 같다" para probabilidad futura.',
          },
        ],
      },
    ],
  },
}

export default topic
