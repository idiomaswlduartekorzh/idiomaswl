import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'antes-despues-a2',
  order: '17',
  color: '#c60c30',
  category: 'Sintaxis',
  level: 'A2',
  title: '-기 전에 / -ㄴ 후에 en coreano A2: antes y después de',
  shortTitle: '전에/후에 (antes/después)',
  metaTitle: 'Antes y después en coreano A2 — 기 전에, -(으)ㄴ 후에/다음에',
  description:
    'Las expresiones -기 전에 y -(으)ㄴ 후에 / 다음에 son las formas principales para expresar "antes de hacer algo" y "después de hacer algo" en coreano. -기 전에 siempre usa el infinitivo (sin conjugar). -(으)ㄴ 후에 usa la forma verbal de pasado del modificador. Son estructuras de secuencia temporal fundamentales en A2.',
  lead: '자기 전에 이를 닦아요: antes y después en coreano A2.',
  outcomes: [
    'Usar -기 전에 para expresar "antes de + infinitivo"',
    'Usar -(으)ㄴ 후에 / -(으)ㄴ 다음에 para expresar "después de"',
    'Combinar correctamente la secuencia temporal con el contexto',
    'Distinguir 전에 (antes) de 후에/다음에 (después)',
  ],

  guide: {
    goal: 'Expresar secuencias temporales con -기 전에 (antes de) y -(으)ㄴ 후에 (después de).',
    model: '자기 전에 이를 닦아요. (Me cepillo los dientes antes de dormir.) / 먹은 후에 산책해요. (Paseo después de comer.)',
    formula: 'V-기 전에 [+ acción posterior] | V-ㄴ/은 후에/다음에 [+ acción posterior]',
    decisions: [
      '-기 전에: el verbo siempre en infinitivo + -기 (sin conjugar por tiempo): 먹기 전에, 자기 전에',
      '-(으)ㄴ 후에/다음에: tallo + -ㄴ (vocal) o -은 (consonante): 먹은 후에, 간 다음에',
      '전에 con sustantivos: 수업 전에 (antes de la clase), 점심 전에 (antes del almuerzo)',
      '후에/다음에 con sustantivos: 수업 후에 (después de la clase), 졸업 다음에 (después de la graduación)',
      '"후에" y "다음에" son intercambiables en la mayoría de contextos',
    ],
    table: [
      ['Expresión', 'Estructura', 'Ejemplo'],
      ['antes de + V', 'V-기 전에', '먹기 전에 손을 씻어요'],
      ['después de + V', 'V-ㄴ/은 후에', '먹은 후에 커피를 마셔요'],
      ['antes/después + N', 'N 전에 / N 후에', '수업 전에 / 수업 후에'],
    ],
    mistakes: [
      '"먹는 전에" ❌ → "먹기 전에" ✓ — 전에 con verbos usa -기 (no -는).',
      '"먹기 후에" ❌ → "먹은 후에" ✓ — 후에 con verbos usa -ㄴ/은 (no -기).',
      '"자기 전에" ✓ pero el tiempo de la oración principal es el que se conjuga, no el verbo de "전에".',
    ],
  },

  seo: [
    {
      heading: '-기 전에: siempre con el infinitivo',
      paragraphs: [
        'En coreano, "antes de hacer algo" se expresa con -기 전에. La clave es que el verbo que va antes de 전에 siempre lleva el sufijo -기 (el nominalizador verbal) sin conjugar por tiempo: "자기 전에" (antes de dormir), "먹기 전에" (antes de comer), "출발하기 전에" (antes de salir). El tiempo real se expresa en el verbo de la cláusula principal.',
        '"작년에 한국에 가기 전에 한국어를 배웠어요" (el año pasado, antes de ir a Corea, aprendí coreano). El tiempo pasado aparece en "배웠어요", no en "가기 전에".',
      ],
    },
    {
      heading: '-(으)ㄴ 후에 vs 다음에',
      paragraphs: [
        '"후에" y "다음에" son casi sinónimos cuando expresan "después de". Ambos se usan con la forma verbal de modificador de pasado (-(으)ㄴ): "먹은 후에" = "먹은 다음에" (después de comer). La diferencia es muy sutil: 다음에 a veces suena ligeramente más coloquial.',
        'Con sustantivos, ambos van directamente sin modificación: "수업 후에" = "수업 다음에" (después de la clase). Es un nivel A2 por su frecuencia en la vida cotidiana: "학교 끝난 후에 뭐 해요?" (¿Qué haces después de que termine la escuela?).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Secuencias temporales: -기 전에 (antes), -ㄴ/은 후에 (después).',
    graphicPrompt: 'Línea del tiempo con dos acciones: una marcada con "전에" y otra con "후에".',
    scene: [
      ['자기 전에 이를 닦아요.', 'Me cepillo los dientes antes de dormir.'],
      ['아침을 먹은 후에 학교에 가요.', 'Voy a la escuela después de desayunar.'],
      ['수업 전에 공부해요.', 'Estudio antes de clase.'],
      ['운동한 다음에 샤워해요.', 'Me ducho después de hacer ejercicio.'],
      ['결혼하기 전에 여행을 많이 했어요.', 'Viajé mucho antes de casarme.'],
      ['졸업한 후에 취직할 거예요.', 'Buscaré trabajo después de graduarme.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['V-기 전에', 'V-ㄴ/은 후에/다음에', 'N 전에/후에'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Antes o después',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma verbal correcta para 전에 o 후에.',
        type: 'choice',
        items: [
          {
            scene: 'Antes de comer.',
            lines: [['', '___ 전에']],
            options: ['먹기', '먹은', '먹는', '먹고'],
            answer: '먹기',
            explain: '"먹기 전에" = antes de comer. Con 전에, el verbo lleva -기.',
          },
          {
            scene: 'Después de comer.',
            lines: [['', '___ 후에']],
            options: ['먹은', '먹기', '먹는', '먹고'],
            answer: '먹은',
            explain: '"먹은 후에" = después de comer. Con 후에, el verbo lleva -ㄴ/은.',
          },
          {
            scene: 'Antes de ir a la escuela.',
            lines: [['', '학교에 ___ 전에']],
            options: ['가기', '간', '가는', '가고'],
            answer: '가기',
            explain: '"가기 전에" = antes de ir. -기 + 전에.',
          },
          {
            scene: 'Después de llegar a casa.',
            lines: [['', '집에 ___ 후에']],
            options: ['온', '오기', '오는', '오고'],
            answer: '온',
            explain: '"온 후에" = después de llegar (oír: 오 + ㄴ = 온).',
          },
          {
            scene: 'Antes de salir (출발하다).',
            lines: [['', '출발___ 전에']],
            options: ['하기', '한', '하는', '하고'],
            answer: '하기',
            explain: '"출발하기 전에" = antes de salir.',
          },
          {
            scene: 'Después de estudiar.',
            lines: [['', '공부___ 다음에']],
            options: ['한', '하기', '하는', '하고'],
            answer: '한',
            explain: '"공부한 다음에" = después de estudiar. -ㄴ + 다음에.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Secuencia de acciones',
        tag: '2 espacios',
        intro: 'Completa la secuencia con -기 전에 y -(으)ㄴ 후에.',
        type: 'dual',
        items: [
          {
            scene: 'Antes de comer te lavas las manos; después descansas.',
            lines: [['', '밥[[0]] 전에 손을 씻어요. 밥[[1]] 후에 쉬어요.']],
            blanks: [
              { options: ['먹기', '먹은', '먹는', '먹고'], answer: '먹기', explain: '"먹기 전에" = antes de comer (-기 전에).' },
              { options: ['먹은', '먹기', '먹는', '먹고'], answer: '먹은', explain: '"먹은 후에" = después de comer (-은 후에).' },
            ],
          },
          {
            scene: 'Antes de salir revisa el mapa; después del viaje escribe sobre ello.',
            lines: [['', '여행[[0]] 전에 지도를 봐요. 여행[[1]] 후에 일기를 써요.']],
            blanks: [
              { options: ['하기', '한', '하는', '하고'], answer: '하기', explain: '"여행하기 전에" = antes del viaje (-기 전에).' },
              { options: ['한', '하기', '하는', '하고'], answer: '한', explain: '"여행한 후에" = después del viaje (-ㄴ 후에).' },
            ],
          },
          {
            scene: 'Antes de dormir te cepillas; después de despertar desayunas.',
            lines: [['', '자[[0]] 전에 양치해요. 일어난[[1]] 아침을 먹어요.']],
            blanks: [
              { options: ['기', '는', 'ㄴ', '고'], answer: '기', explain: '"자기 전에" = antes de dormir. 자 + 기 전에.' },
              { options: ['다음에', '전에', '기에', '고'], answer: '다음에', explain: '"일어난 다음에" = después de despertar (-ㄴ 다음에).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Rutina diaria en orden',
        tag: 'Texto guiado',
        intro: 'Completa la descripción de una rutina con 전에/후에.',
        type: 'guidedText',
        scene: '준호가 하루 일과를 설명해요.',
        text: '아침에 일어난 [[0]] 운동을 해요. 운동하[[1]] 전에 스트레칭을 해요. 샤워한 [[2]] 아침을 먹어요. 학교 [[3]] 친구를 만나요. 수업이 끝난 [[4]] 도서관에서 공부해요.',
        blanks: [
          { options: ['후에', '전에', '기에', '다음'], answer: '후에', explain: '"일어난 후에" = después de levantarse.' },
          { options: ['기', '는', 'ㄴ', '고'], answer: '기', explain: '"운동하기 전에" = antes de hacer ejercicio.' },
          { options: ['다음에', '전에', '기', '고'], answer: '다음에', explain: '"샤워한 다음에" = después de ducharse.' },
          { options: ['전에', '후에', '다음에', '기에'], answer: '전에', explain: '"학교 전에" = antes de la escuela (sustantivo + 전에).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con la forma correcta',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta para 전에 o 후에.',
        type: 'freeText',
        scene: '시간 순서 표현을 완성하세요.',
        text: '자[[0]] 전에 책을 읽어요. / 밥을 먹[[1]] 다음에 커피를 마셔요. / 한국에 오[[2]] 전에 한국어를 배웠어요. / 졸업[[3]] 후에 취직할 거예요.',
        blanks: [
          { answer: '기', explain: '"자기 전에" = antes de dormir. -기 + 전에.' },
          { answer: '은', explain: '"먹은 다음에" = después de comer. -은 (consonante final).' },
          { answer: '기', explain: '"오기 전에" = antes de venir. 오다 + -기 전에.' },
          { answer: '한', explain: '"졸업한 후에" = después de graduarse. 졸업하다 + -ㄴ 후에.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye la secuencia',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con la expresión temporal indicada.',
        type: 'write',
        items: [
          {
            scene: 'Antes de viajar a Corea, estudia coreano.',
            prompt: '한국 여행하기 전에... (한국어 공부하세요)',
            answer: '한국 여행하기 전에 한국어를 공부하세요.',
            accepted: ['한국에 가기 전에 한국어를 배우세요.'],
            explain: '"-기 전에" con el verbo en su forma base + -기.',
          },
          {
            scene: 'Después de trabajar, descansa bien.',
            prompt: '일한 후에... (잘 쉬세요)',
            answer: '일한 후에 잘 쉬세요.',
            accepted: ['일이 끝난 후에 잘 쉬세요.'],
            explain: '"-ㄴ 후에" = después de trabajar. 일하다 → 일한.',
          },
          {
            scene: 'Después de la clase buscaré información.',
            prompt: '수업 후에... (정보를 찾을 거예요)',
            answer: '수업 후에 정보를 찾을 거예요.',
            accepted: ['수업이 끝난 후에 정보를 찾을 거예요.'],
            explain: 'Sustantivo + 후에 sin modificación verbal.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe tu rutina diaria',
        tag: 'Escritura libre',
        intro: 'Escribe sobre tu rutina diaria usando -기 전에 y -(으)ㄴ 후에/다음에.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu rutina matutina con al menos dos secuencias temporales.',
            prompt: '아침 루틴을 전에/후에를 사용해서 써 보세요.',
            answer: '일어난 후에 운동해요. 운동하기 전에 물을 마셔요. 샤워한 다음에 아침을 먹어요.',
            accepted: ['아침을 먹기 전에 스트레칭해요. 샤워한 후에 옷을 입어요.'],
            explain: '전에 = antes; 후에/다음에 = después. Combínalos para narrar secuencias.',
          },
          {
            scene: 'Describe qué hiciste antes y después de un evento importante (viaje, examen, etc.).',
            prompt: '중요한 일 전에/후에 한 일을 써 보세요.',
            answer: '시험 보기 전에 많이 공부했어요. 시험이 끝난 후에 친구들과 놀았어요.',
            accepted: ['여행하기 전에 여행 계획을 세웠어요. 여행한 후에 사진을 정리했어요.'],
            explain: 'Narra eventos pasados con -기 전에 y -ㄴ/은 후에 + pasado en el verbo principal.',
          },
        ],
      },
    ],
  },
}

export default topic
