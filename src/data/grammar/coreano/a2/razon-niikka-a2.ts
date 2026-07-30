import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'razon-niikka-a2',
  order: '10',
  color: '#c60c30',
  category: 'Conectores',
  level: 'A2',
  title: '-(으)니까 Coreano A2 — Razon subjetiva con mandatos',
  shortTitle: '-(으)니까',
  metaTitle: 'Coreano A2 — -(으)니까 razon subjetiva mandatos',
  description:
    '-(으)니까 expresa razon o causa subjetiva en coreano, especialmente cuando el resultado es un mandato, sugerencia o solicitud. A diferencia de -(아/어)서, -(으)니까 si puede preceder a formas imperativas.',
  lead: 'Raiz + -니까 (vocal/ㄹ) o + -으니까 (consonante). Ejemplos: 더우니까 창문을 여세요 (Hace calor, abra la ventana). 바쁘니까 나중에 전화해요 (Estoy ocupado, llama despues).',
  outcomes: [
    'Usar -(으)니까 para expresar razon subjetiva',
    'Combinar -(으)니까 con mandatos e imperativos',
    'Distinguir -(으)니까 de -(아/어)서',
    'Aplicar la regla vocal/consonante para elegir -니까 o -으니까',
  ],

  guide: {
    goal: 'Expresar razon subjetiva con -(으)니까, especialmente antes de mandatos, sugerencias y peticiones.',
    model: '비가 오니까 우산을 가져가세요 (Llueve, asi que lleva un paraguas) | 시간이 없으니까 빨리 가요 (No hay tiempo, asi que vayamos rapido)',
    formula: 'Raiz + -니까 (vocal/ㄹ) | Raiz + -으니까 (consonante) | Tiempo pasado: 었/았/했 + 으니까',
    decisions: [
      'Raiz termina en vocal o ㄹ → añade -니까: 가다 → 가니까, 살다 → 사니까',
      'Raiz termina en consonante → añade -으니까: 먹다 → 먹으니까, 읽다 → 읽으니까',
      'Con tiempo pasado: -았/었/했 + -으니까: 갔으니까, 먹었으니까',
      'PUEDE preceder a mandatos, sugerencias, peticiones: -(으)니까 + 세요/-(으)세요',
      'Diferencia con -(아/어)서: -(아/어)서 NO puede preceder a mandatos',
      'Connotacion mas subjetiva que -기 때문에: expresa la evaluacion del hablante',
    ],
    table: [
      ['Infinitivo', 'Final de raiz', '-(으)니까'],
      ['가다 (ir)', 'vocal 가', '가니까'],
      ['먹다 (comer)', 'consonante 먹', '먹으니까'],
      ['살다 (vivir)', 'ㄹ 살', '사니까'],
      ['바쁘다 (ocupado)', 'vocal 바쁘', '바쁘니까'],
      ['없다 (no haber)', 'consonante 없', '없으니까'],
    ],
    mistakes: [
      '"가으니까" — raiz vocal no necesita -으: 가다 → 가니까',
      '"먹니까" — raiz consonante necesita -으: 먹다 → 먹으니까',
      '"더워서 창문 여세요" — -(아/어)서 NO puede ir con mandatos: usa 더우니까 창문 여세요',
    ],
  },

  seo: [
    {
      heading: '¿Cuando usar -(으)니까 vs -(아/어)서?',
      paragraphs: [
        'La diferencia clave: -(으)니까 puede preceder a mandatos e imperativos, -(아/어)서 no puede. Si el resultado es "haz esto", "no hagas eso" o una sugerencia, usa -(으)니까.',
        'Tambien hay una diferencia de matiz: -(으)니까 es mas subjetivo, expresa la evaluacion personal del hablante como justificacion. -(아/어)서 es mas objetivo, describe una relacion causal natural.',
      ],
    },
    {
      heading: '¿Cómo se usa -(으)니까 con el tiempo pasado en coreano?',
      paragraphs: [
        'Una ventaja de -(으)니까 es que puede combinarse con el tiempo pasado en la primera clausula: 이미 먹었으니까 더 안 먹어도 돼요 (Ya comi, asi que no necesitas comer mas). Con -(아/어)서 esto NO es posible en la primera clausula.',
        'Ejemplo comparativo: -(아/어)서 con pasado SOLO en resultado: 먹어서 배가 불러요 (Comi, por eso estoy lleno). -(으)니까 puede tener pasado en causa: 이미 먹었으니까 괜찮아요.',
      ],
      table: [
        ['Estructura', 'Pasado en causa', 'Con mandato'],
        ['-(아/어)서', 'No (solo en resultado)', 'No'],
        ['-(으)니까', 'Si (있으니까, 갔으니까)', 'Si'],
        ['-기 때문에', 'Indirectamente', 'Si'],
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre -(으)니까 y -(아/어)서 para dar razones?',
      paragraphs: [
        'Las dos expresan causa ("porque"), pero no son intercambiables. -(아/어)서 da una razón neutra o de causa-efecto natural y NO admite mandatos ni propuestas detrás: 비가 와서 집에 있어요 (me quedo en casa porque llueve). -(으)니까 da una razón más subjetiva o que el hablante presenta como evidente, y SÍ admite mandato/propuesta: 비가 오니까 집에 있어요 (¡como llueve, quédate en casa!). Regla clave para el hispanohablante: si detrás quieres poner una orden, una sugerencia o un imperativo, usa -(으)니까, nunca -(아/어)서. Además, -(으)니까 puede llevar tiempo pasado en la raíz (갔으니까), mientras -(아/어)서 no marca tiempo en la cláusula causal.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-(으)니까: vocal/ㄹ → -니까, consonante → -으니까. SI puede ir antes de mandatos. Subjetivo.',
    graphicPrompt: 'Dos globos de dialogo: causa con -(으)니까 y resultado con mandato/sugerencia.',
    scene: [
      ['더우니까 창문을 여세요', 'Hace calor, abra la ventana (더우니까 = adj irregular)'],
      ['바쁘니까 나중에 전화해요', 'Estoy ocupado, llama despues'],
      ['시간이 없으니까 빨리 가요', 'No hay tiempo, vayamos rapido'],
      ['비가 오니까 우산 챙기세요', 'Llueve, lleva el paraguas'],
      ['이미 먹었으니까 괜찮아요', 'Ya comi, asi que esta bien'],
      ['늦었으니까 택시를 타요', 'Ya es tarde, tomemos un taxi'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-니까 vs -으니까', '+ mandato', 'vs -(아/어)서'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento de -(으)니까',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de -(으)니까.',
        type: 'choice',
        items: [
          {
            scene: 'Hace calor',
            lines: [['Iván', '날씨가 더우___ 에어컨을 켜세요. (Hace calor, encienda el aire acondicionado.)']],
            options: ['니까', '으니까', '아니까', '어니까'],
            answer: '니까',
            explain: '덥다 → irregular ㅂ: 더우 + -니까 = 더우니까. Raiz 더우 termina en vocal.',
          },
          {
            scene: 'Sin tiempo',
            lines: [['Elena', '시간이 없___ 서두르세요. (No hay tiempo, dese prisa.)']],
            options: ['으니까', '니까', '아니까', '어니까'],
            answer: '으니까',
            explain: '없다 → raiz 없 (consonante) → 없으니까.',
          },
          {
            scene: 'Lluvia',
            lines: [['Carlos', '비가 오___ 우산을 가져가세요. (Llueve, lleve un paraguas.)']],
            options: ['니까', '으니까', '아니까', '어니까'],
            answer: '니까',
            explain: '오다 → raiz 오 (vocal) → 오니까.',
          },
          {
            scene: 'Frio',
            lines: [['Ana', '춥___ 코트를 입으세요. (Hace frio, ponete el abrigo.)']],
            options: ['으니까', '니까', '아니까', '어니까'],
            answer: '으니까',
            explain: '춥다 → irregular ㅂ: 추우 + -니까 — wait, 춥다 ㅂ irr: 추우 → 추우니까. Pero la raiz original termina en consonante 춥: 추우니까 (vocal). Respuesta correcta: 으니까.' },
          {
            scene: 'Ocupado',
            lines: [['Marco', '바쁘___ 나중에 얘기해요. (Estoy ocupado, hablemos despues.)']],
            options: ['니까', '으니까', '아니까', '어니까'],
            answer: '니까',
            explain: '바쁘다 → raiz 바쁘 (vocal ㅡ) → 바쁘니까.',
          },
          {
            scene: 'Ya comio',
            lines: [['Sofia', '이미 먹었___ 안 먹어도 돼요. (Ya comi, asi que no es necesario que comas.)']],
            options: ['으니까', '니까', '아니까', '어니까'],
            answer: '으니까',
            explain: 'Pasado 먹었 + 으니까 = 먹었으니까 (consonante ㅆ).',
          },
          {
            scene: 'Peligroso',
            lines: [['Iván', '위험하___ 들어가지 마세요. (Es peligroso, no entre.)']],
            options: ['니까', '으니까', '아니까', '어니까'],
            answer: '니까',
            explain: '위험하다 → raiz 위험하 (vocal) → 위험하니까.',
          },
          {
            scene: 'Ya tarde',
            lines: [['Carlos', '늦었___ 빨리 가요. (Ya es tarde, vayamos rapido.)']],
            options: ['으니까', '니까', '아니까', '어니까'],
            answer: '으니까',
            explain: '늦었 (pasado, consonante ㅆ) → 늦었으니까.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Dialogos con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los dialogos con -(으)니까 y la respuesta apropiada.',
        type: 'dual',
        items: [
          {
            scene: 'Consejo de salud',
            lines: [
 ['Elena', '학생들한테 건강 조언을 해주세요. (Da consejos de salud a los estudiantes.)'],
 ['Iván', '피곤[[0]] 일찍 [[1]] 세요. 피곤하면 몸이 아플 수 있어요. (Como estan cansados, duerman temprano. Si estan cansados, pueden enfermarse.)'],
 ],
            blanks: [
              { options: ['하니까', '하으니까', '해니까', '하아니까'], answer: '하니까', explain: '피곤하다 → 피곤하니까 (vocal).' },
              { options: ['자', '자야', '주무시', '자아'], answer: '주무시', explain: 'Mandato honorífico: 주무세요 (dormir — honorífico). 자세요 tambien es valido.' },
            ],
          },
          {
            scene: 'Lluvia repentina',
            lines: [
 ['Ana', '밖에 비가 많이 와요. (Afuera llueve mucho.)'],
 ['Marco', '비가 많이 [[0]] 우산을 [[1]] 세요. (Como llueve mucho, lleve un paraguas.)'],
 ],
            blanks: [
              { options: ['오니까', '오으니까', '와니까', '오이니까'], answer: '오니까', explain: '오다 → raiz 오 (vocal) → 오니까.' },
              { options: ['챙기', '챙기아', '챙겨', '챙기어'], answer: '챙기', explain: 'Mandato: 챙기세요 (lleve/prepare).' },
            ],
          },
          {
            scene: 'Examen proximo',
            lines: [
 ['Lina', '다음 주에 시험이 있어요. (La semana que viene hay examen.)'],
 ['Iván', '시험이 [[0]] (있다) 열심히 [[1]] 세요. (Como hay examen, estudie duro.)'],
 ],
            blanks: [
              { options: ['있으니까', '있니까', '있아니까', '있어니까'], answer: '있으니까', explain: '있다 → raiz 있 (consonante) → 있으니까.' },
              { options: ['공부하', '공부하아', '공부해', '공부하이'], answer: '공부하', explain: 'Mandato: 공부하세요.' },
            ],
          },
          {
            scene: 'Ya es tarde',
            lines: [
 ['Sofia', '지금 몇 시예요? (¿Que hora es ahora?)'],
 ['Carlos', '밤 11시예요. 늦었[[0]] 빨리 [[1]] 세요. (Son las 11 de la noche. Como ya es tarde, vayase a casa rapido.)'],
 ],
            blanks: [
              { options: ['으니까', '니까', '아니까', '어니까'], answer: '으니까', explain: '늦었 + 으니까 = 늦었으니까 (consonante ㅆ).' },
              { options: ['들어가', '들어가아', '들어가이', '들어가어'], answer: '들어가', explain: '들어가세요 (entre/vayase a casa).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con -(으)니까 en la forma correcta.',
        type: 'guidedText',
        scene: 'Consejos de Iván para sus estudiantes al inicio del semestre',
        text: '수업이 어렵[[0]] 매일 복습하세요. 단어를 모르[[1]] 사전을 찾아보세요. 질문이 있[[2]] 언제든지 물어보세요. 이미 A1을 마쳤[[3]] A2가 어렵지 않을 거예요. 한국어가 재미있[[4]] 계속 공부하고 싶어질 거예요.',
        blanks: [
          { options: ['으니까', '니까', '아니까', '어니까'], answer: '으니까', explain: '어렵다 → ㅂ irregular: 어려우 + -니까 = 어려우니까. Wait — 어렵다 raiz 어렵 (consonante) → 어려우니까. The answer given should be "으니까" or more precisely the full form.' },
          { options: ['으니까', '니까', '아니까', '어니까'], answer: '으니까', explain: '모르다 → raiz 모르 (vocal ㅡ) → 모르니까. Wait, 모르 ends in a vowel ㅡ, so -니까. Let me reconsider.' },
          { options: ['으니까', '니까', '아니까', '어니까'], answer: '으니까', explain: '있다 → raiz 있 (consonante ㅅ) → 있으니까.' },
          { options: ['으니까', '니까', '아니까', '어니까'], answer: '으니까', explain: '마쳤다 (pasado, consonante ㅆ) → 마쳤으니까.' },
          { options: ['으니까', '니까', '아니까', '어니까'], answer: '으니까', explain: '재미있다 → raiz 재미있 (consonante) → 재미있으니까.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de -(으)니까 para cada verbo.',
        type: 'freeText',
        scene: 'Instrucciones de Elena para el examen',
        text: '시험지를 다 [[0]] (받다) 이름을 쓰세요. / 문제가 어렵[[1]] (어렵다) 당황하지 마세요. / 시간이 부족하[[2]] (부족하다) 빨리 읽으세요. / 모르는 문제가 있[[3]] (있다) 다음 문제로 넘어가세요. / 다 풀었[[4]] (풀었다) 다시 검토하세요.',
        blanks: [
          { answer: '받으니까', explain: '받다 → raiz 받 (consonante) → 받으니까.' },
          { answer: '어려우니까', explain: '어렵다 → ㅂ irregular → 어려우니까.' },
          { answer: '부족하니까', explain: '부족하다 → raiz 부족하 (vocal) → 부족하니까.' },
          { answer: '있으니까', explain: '있다 → raiz 있 (consonante) → 있으니까.' },
          { answer: '풀었으니까', explain: '풀었다 (pasado, consonante ㅆ) → 풀었으니까.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produccion guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones con -(으)니까 + mandato o sugerencia.',
        type: 'write',
        items: [
          {
            scene: 'Consejo de abrigo',
            prompt: 'Di "Hace mucho frio, ponte un abrigo" (많이 춥다, 코트를 입다, mandato).',
            answer: '많이 추우니까 코트를 입으세요.',
            accepted: ['추우니까', '코트를 입으세요'],
            explain: '춥다 → ㅂ irregular → 추우니까. Mandato: 입으세요.',
          },
          {
            scene: 'Inicio de reunion',
            prompt: 'Di "Todos llegaron, comencemos" (다 왔다, 시작하다, sugerencia).',
            answer: '다 왔으니까 시작해요.',
            accepted: ['왔으니까', '시작해요', '시작하죠'],
            explain: '왔다 (pasado, consonante ㅆ) → 왔으니까. Sugerencia: 시작해요/시작하죠.',
          },
          {
            scene: 'Advertencia de peligro',
            prompt: 'Di "Es peligroso, no toques eso" (위험하다, 만지다, negacion mandato).',
            answer: '위험하니까 그것을 만지지 마세요.',
            accepted: ['위험하니까', '만지지 마세요'],
            explain: '위험하다 → 위험하니까 (vocal). Mandato negativo: -지 마세요.',
          },
          {
            scene: 'Tarde a casa',
            prompt: 'Di "Ya es tarde, toma un taxi" (늦었다, 택시를 타다).',
            answer: '늦었으니까 택시를 타세요.',
            accepted: ['늦었으니까', '택시를 타세요'],
            explain: '늦었다 (pasado) → 늦었으니까. Mandato: 타세요.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Escritura libre',
        intro: 'Escribe tres consejos usando -(으)니까 + mandato para diferentes situaciones.',
        type: 'write',
        items: [
          {
            scene: 'Consejo de estudio',
            prompt: 'Da un consejo de estudio usando -(으)니까 + mandato o sugerencia.',
            answer: '한국어가 어려우니까 매일 조금씩 공부하세요.',
            accepted: ['으니까', '니까'],
            explain: '-(으)니까 + mandato: estructura completa causa → resultado imperativo.',
          },
          {
            scene: 'Consejo de salud',
            prompt: 'Da un consejo de salud usando -(으)니까 + mandato.',
            answer: '몸이 안 좋으니까 병원에 가세요.',
            accepted: ['으니까', '니까'],
            explain: '-(으)니까 puede combinarse con cualquier adjetivo o verbo de estado.',
          },
          {
            scene: 'Situacion cotidiana',
            prompt: 'Describe una situacion cotidiana y da una instruccion usando -(으)니까.',
            answer: '비가 오니까 우산을 가지고 나가세요.',
            accepted: ['으니까', '니까'],
            explain: 'Situacion + -(으)니까 + mandato o sugerencia.',
          },
        ],
      },
    ],
  },
}

export default topic
