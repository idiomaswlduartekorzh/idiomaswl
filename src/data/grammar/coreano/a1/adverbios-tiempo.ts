import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adverbios-tiempo',
  order: '18',
  color: '#c60c30',
  category: 'Adverbios',
  level: 'A1',
  title: 'Adverbios de Tiempo en Coreano A1 — 오늘 어제 내일 지금',
  shortTitle: 'Adverbios de tiempo',
  metaTitle: 'Adverbios de tiempo coreano A1 — 오늘 어제 내일 지금 항상 가끔 coreano principiantes',
  description:
    'Los adverbios de tiempo del coreano son esenciales para la conversación cotidiana. 오늘(hoy), 어제(ayer), 내일(mañana), 지금(ahora), 이따가(más tarde), 항상(siempre), 가끔(a veces), 자주(frecuentemente). Se colocan con gran flexibilidad posicional, generalmente al inicio o antes del verbo.',
  lead: '오늘(oneul=hoy), 어제(eoje=ayer), 내일(naeil=mañana), 지금(jigeum=ahora), 이따가(itaga=más tarde), 항상/늘(siempre), 가끔(a veces), 자주(frecuentemente), 빨리(rápido). Gran flexibilidad posicional.',
  outcomes: [
    'Usa los 12 adverbios de tiempo más frecuentes del coreano A1',
    'Coloca los adverbios con flexibilidad al inicio o antes del verbo',
    'Combina adverbios de tiempo con el presente y el pasado',
  ],

  guide: {
    goal: 'Usar adverbios de tiempo coreanos para hablar de cuándo ocurren las acciones.',
    model: '오늘 학교에 가요. (Hoy voy a la escuela.) / 어제 뭐 했어요? (¿Qué hiciste ayer?)',
    formula: '[Adverbio de tiempo] + [Sujeto] + [Objeto] + Verbo | O justo antes del verbo',
    decisions: [
      '오늘(oneul)=hoy, 어제(eoje)=ayer, 내일(naeil)=mañana, 모레(more)=pasado mañana',
      '지금(jigeum)=ahora, 이따가(itaga)=más tarde (hoy), 아까(akka)=hace un momento',
      '요즘(yojeum)=últimamente/estos días, 최근(choigeun)=recientemente',
      '항상(hangsang)/늘(neul)=siempre, 보통(botong)=normalmente, 가끔(gakkeum)=a veces, 자주(jaju)=frecuentemente',
      '빨리(ppalli)=rápido, 천천히(cheoncheonhi)=despacio',
      'Posición: preferentemente al INICIO de la frase o justo ANTES del verbo',
      'En coreano el adverbio puede ir en muchas posiciones — la más natural suele ser al inicio',
    ],
    table: [
      ['Adverbio', 'Romanización', 'Significado'],
      ['오늘', 'oneul', 'hoy'],
      ['어제', 'eoje', 'ayer'],
      ['내일', 'naeil', 'mañana'],
      ['지금', 'jigeum', 'ahora'],
      ['이따가', 'itaga', 'más tarde (hoy)'],
      ['항상 / 늘', 'hangsang / neul', 'siempre'],
      ['가끔', 'gakkeum', 'a veces'],
      ['자주', 'jaju', 'frecuentemente'],
    ],
    mistakes: [
      'Olvidar que 이따가 = MÁS TARDE (hoy mismo), diferente de 나중에(en el futuro general)',
      '"아까가" ❌ — 아까 no lleva partícula de tiempo 에: "아까 왔어요" ✓ (no "아까에 왔어요")',
      '내일 con pasado ❌ — 내일(mañana) lógicamente requiere presente o futuro: "내일 가요" ✓',
    ],
  },

  seo: [
    {
      heading: 'Los adverbios de tiempo más esenciales del coreano',
      paragraphs: [
        'Los adverbios de tiempo son palabras de alto rendimiento en coreano: pocas palabras que permiten una conversación rica sobre cuándo ocurrieron o ocurrirán las cosas. El trío más esencial es 오늘(hoy)/어제(ayer)/내일(mañana) — tres palabras que cubren el 80% de las necesidades conversacionales iniciales.',
        'Una ventaja del coreano para hispanohablantes: los adverbios de tiempo no se conjugan, no cambian de forma y no requieren preposición. 오늘 va directamente en la frase sin "de" ni "en": 오늘 가요 = hoy voy.',
      ],
    },
    {
      heading: 'Posición flexible: una ventaja del coreano',
      paragraphs: [
        'En coreano, los adverbios tienen gran flexibilidad posicional. Se pueden colocar al inicio de la frase (posición tópica, enfatiza el tiempo), en el medio o justo antes del verbo. 오늘 학교에 가요 = 학교에 오늘 가요 = 학교에 가요 오늘 (menos natural). La primera posición es la más frecuente.',
        'Esta libertad contrasta con el español donde la posición del adverbio cambia el énfasis pero no la gramaticalidad. En coreano, dado que el verbo siempre va al final, el adverbio de tiempo al inicio crea un "marco temporal" natural para el resto de la oración.',
      ],
    },
    {
      heading: 'Frecuencia: siempre, a veces, frecuentemente',
      paragraphs: [
        '항상(hangsang) y su variante 늘(neul) significan "siempre". 자주(jaju) = frecuentemente. 가끔(gakkeum) = a veces, de vez en cuando. 보통(botong) = normalmente, habitualmente. 별로(byeollo) + negación = no mucho, raramente.',
        'Ejemplos: 저는 항상 커피를 마셔요(siempre bebo café), 가끔 운동해요(a veces hago ejercicio), 자주 한국 음식을 먹어요(frecuentemente como comida coreana).',
      ],
    },
    {
      heading: 'Hoy, hace un rato, más tarde: precisión temporal',
      paragraphs: [
        'Para el mismo día hay varios adverbios con matices distintos: 아까(akka=hace un momento/rato, pasado reciente), 지금(jigeum=ahora mismo), 이따가(itaga=más tarde, pero hoy). Para el futuro inmediato: 곧(got=pronto), 나중에(najunge=más adelante, sin especificar cuándo).',
        'Un error frecuente: confundir 이따가(más tarde hoy) con 나중에(más adelante, futuro indeterminado). 이따가 만나요 = nos vemos más tarde (hoy). 나중에 봐요 = nos vemos en otro momento (futuro impreciso).',
      ],
    },
  ],

  visual: {
    mode: 'time-adverbs',
    teacherLens: 'Adverbios de tiempo: hoy/ayer/mañana + ahora/más tarde/hace un rato + siempre/a veces/frecuentemente.',
    graphicPrompt: 'Línea de tiempo con adverbios pasado-presente-futuro + columna de frecuencia.',
    scene: [
      ['어제 갔어요', 'Ayer fui. (어제 = ayer + pasado)'],
      ['오늘 가요', 'Hoy voy. (오늘 = hoy + presente)'],
      ['내일 갈 거예요', 'Mañana iré. (내일 = mañana)'],
      ['지금 공부해요', 'Ahora estudio. (지금 = ahora)'],
      ['항상 커피를 마셔요', 'Siempre bebo café. (항상 = siempre)'],
      ['가끔 운동해요', 'A veces hago ejercicio. (가끔 = a veces)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['오늘/어제/내일', 'jigeum/itaga/akka', 'hangsang/gakkeum/jaju'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige el adverbio de tiempo correcto para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Planes para mañana',
            lines: [['David', '___ 서울에 가요. (Mañana voy a Seúl.)']],
            options: ['내일', '어제', '지금', '아까'],
            answer: '내일',
            explain: '내일(naeil) = mañana. Con presente/futuro para planes.',
          },
          {
            scene: 'Lo de ayer',
            lines: [['Carlos', '___ 영화를 봤어요. (Ayer vi una película.)']],
            options: ['어제', '내일', '지금', '이따가'],
            answer: '어제',
            explain: '어제(eoje) = ayer. Con pasado (봤어요).',
          },
          {
            scene: 'Ahora mismo',
            lines: [['Ana', '___ 뭐 해요? (¿Qué haces ahora mismo?)']],
            options: ['지금', '아까', '내일', '항상'],
            answer: '지금',
            explain: '지금(jigeum) = ahora, en este momento.',
          },
          {
            scene: 'Hace un rato',
            lines: [['Sofia', '___ 커피를 마셨어요. (Hace un rato bebí café.)']],
            options: ['아까', '이따가', '내일', '자주'],
            answer: '아까',
            explain: '아까(akka) = hace un momento/rato (pasado muy reciente).',
          },
          {
            scene: 'Siempre',
            lines: [['Zhanna', '저는 ___ 아침을 먹어요. (Siempre desayuno.)']],
            options: ['항상', '가끔', '빨리', '아까'],
            answer: '항상',
            explain: '항상(hangsang) = siempre. Frecuencia máxima.',
          },
          {
            scene: 'A veces',
            lines: [['Lina', '저는 ___ 한국 음식을 먹어요. (A veces como comida coreana.)']],
            options: ['가끔', '항상', '빨리', '지금'],
            answer: '가끔',
            explain: '가끔(gakkeum) = a veces, de vez en cuando.',
          },
          {
            scene: 'Más tarde hoy',
            lines: [['Marco', '___ 전화할게요. (Te llamo más tarde [hoy].)']],
            options: ['이따가', '나중에', '아까', '자주'],
            answer: '이따가',
            explain: '이따가(itaga) = más tarde hoy (mismo día). Diferente de 나중에(futuro indeterminado).',
          },
          {
            scene: 'Frecuentemente',
            lines: [['Carlos', '저는 카페에 ___ 가요. (Voy frecuentemente al café.)']],
            options: ['자주', '가끔', '아까', '이따가'],
            answer: '자주',
            explain: '자주(jaju) = frecuentemente, con regularidad.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Diálogo con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los diálogos con el adverbio de tiempo correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Planes del fin de semana',
            lines: [
              ['David', '이번 주말에 뭐 할 거예요? (¿Qué harás este fin de semana?)'],
              ['Ana', '[[0]] 친구를 만날 거예요. [[1]] 부터 계획을 짰어요. (Mañana veo a una amiga. Llevo un rato planeándolo.)'],
            ],
            blanks: [
              { options: ['내일', '어제', '지금', '아까'], answer: '내일', explain: '내일 = mañana. Plan futuro.' },
              { options: ['아까', '이따가', '내일', '자주'], answer: '아까', explain: '아까 = hace un rato (pasado reciente).' },
            ],
          },
          {
            scene: 'Hábitos de estudio',
            lines: [
              ['Zhanna', '한국어 공부를 얼마나 자주 해요? (¿Con qué frecuencia estudias coreano?)'],
              ['Sofia', '저는 [[0]] 해요. 그런데 [[1]] 피곤해서 쉬어요. (Siempre lo hago. Pero a veces descanso porque estoy cansada.)'],
            ],
            blanks: [
              { options: ['항상', '가끔', '빨리', '내일'], answer: '항상', explain: '항상 = siempre. Frecuencia máxima.' },
              { options: ['가끔', '항상', '자주', '지금'], answer: '가끔', explain: '가끔 = a veces. Frecuencia baja.' },
            ],
          },
          {
            scene: 'Cita aplazada',
            lines: [
              ['Lina', '지금 바빠요? (¿Estás ocupada ahora?)'],
              ['Marco', '네, 조금요. [[0]] 괜찮아요. [[1]] 이야기해요. (Sí, un poco. Ahora estoy bien. Hablemos más tarde hoy.)'],
            ],
            blanks: [
              { options: ['지금', '내일', '어제', '자주'], answer: '지금', explain: '지금 = ahora (inmediato). 지금 괜찮아요 = ahora estoy bien.' },
              { options: ['이따가', '나중에', '아까', '내일'], answer: '이따가', explain: '이따가 = más tarde (hoy). 이따가 이야기해요 = hablamos después (hoy).' },
            ],
          },
          {
            scene: 'Últimamente',
            lines: [
              ['Carlos', '요즘 어때요? (¿Cómo estás últimamente?)'],
              ['David', '[[0]] 많이 바빠요. [[1]] 쉬지 못해요. (Últimamente estoy muy ocupado. Frecuentemente no puedo descansar.)'],
            ],
            blanks: [
              { options: ['요즘', '지금', '아까', '내일'], answer: '요즘', explain: '요즘(yojeum) = últimamente, estos días.' },
              { options: ['자주', '항상', '가끔', '빨리'], answer: '자주', explain: '자주 = frecuentemente. 자주 못 쉬어요 = frecuentemente no puedo descansar.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con el adverbio de tiempo más lógico.',
        type: 'guidedText',
        scene: 'La rutina de Carlos en WeLearn',
        text: '저는 [[0]] 8시에 일어나요. (Normalmente me levanto a las 8.) [[1]] 은 좀 늦었어요. (Ayer me levanté un poco tarde.) [[2]] 은 일찍 일어날 거예요. (Mañana me levantaré temprano.) 수업은 [[3]] 재미있어요. (La clase siempre es divertida.) 그런데 [[4]] 숙제가 어려워요. (Pero a veces la tarea es difícil.) 지금 잠깐 쉬고 [[5]] 계속할게요. (Ahora descanso un poco y luego continúo.)',
        blanks: [
          { options: ['보통', '가끔', '내일', '지금'], answer: '보통', explain: '보통(botong) = normalmente, habitualmente.' },
          { options: ['어제', '내일', '지금', '아까'], answer: '어제', explain: '어제 = ayer. Pasado reciente.' },
          { options: ['내일', '어제', '지금', '아까'], answer: '내일', explain: '내일 = mañana. Plan futuro.' },
          { options: ['항상', '가끔', '빨리', '아까'], answer: '항상', explain: '항상 = siempre.' },
          { options: ['가끔', '항상', '자주', '빨리'], answer: '가끔', explain: '가끔 = a veces.' },
          { options: ['이따가', '나중에', '아까', '자주'], answer: '이따가', explain: '이따가 = más tarde (hoy). 이따가 계속할게요 = continúo más tarde (hoy).' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe el adverbio de tiempo correcto para cada oración.',
        type: 'freeText',
        scene: 'Preguntas sobre tiempo y frecuencia',
        text: '저는 ___ 카페에서 공부해요. (A veces estudio en la cafetería.) / 선생님이 ___ 숙제를 내요. (El maestro frecuentemente pone tarea.) / ___ 한국어 수업이 있어요. (Hoy hay clase de coreano.) / 저는 ___ 음악을 들어요. (Siempre escucho música.) / ___ 뭐 먹었어요? (¿Qué comiste hace un rato?)',
        blanks: [
          { answer: '가끔', accepted: ['가끔'], explain: '가끔(gakkeum) = a veces.' },
          { answer: '자주', accepted: ['자주'], explain: '자주(jaju) = frecuentemente.' },
          { answer: '오늘', accepted: ['오늘'], explain: '오늘(oneul) = hoy.' },
          { answer: '항상', accepted: ['항상', '늘'], explain: '항상/늘 = siempre.' },
          { answer: '아까', accepted: ['아까'], explain: '아까(akka) = hace un momento/rato.' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones usando adverbios de tiempo.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina',
            prompt: 'Di algo que siempre haces usando 항상 (항상 + verbo).',
            answer: '저는 항상 아침에 커피를 마셔요.',
            accepted: ['항상', '늘'],
            explain: '항상 = siempre. Posición al inicio o antes del verbo.',
          },
          {
            scene: 'Plan de mañana',
            prompt: 'Di algo que harás mañana (내일 + verbo).',
            answer: '내일 친구를 만날 거예요.',
            accepted: ['내일'],
            explain: '내일 = mañana. Con plan futuro: 거예요.',
          },
          {
            scene: 'Actividad de ayer',
            prompt: 'Di algo que hiciste ayer (어제 + pasado).',
            answer: '어제 한국어를 공부했어요.',
            accepted: ['어제', '었어요', '았어요', '했어요'],
            explain: '어제 = ayer. Con pasado: 었어요/았어요/했어요.',
          },
          {
            scene: 'A veces',
            prompt: 'Di algo que haces a veces (가끔 + verbo).',
            answer: '저는 가끔 한국 음식을 만들어요.',
            accepted: ['가끔'],
            explain: '가끔 = a veces. Posición al inicio o en el medio.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe tus hábitos usando adverbios de frecuencia y tiempo.',
        type: 'write',
        items: [
          {
            scene: 'Mis hábitos de estudio',
            prompt: 'Di con qué frecuencia estudias coreano: 저는 ___ 한국어를 ___.',
            answer: '저는 항상 한국어를 공부해요.',
            accepted: ['항상', '자주', '가끔', '보통'],
            explain: 'Usa un adverbio de frecuencia + verbo. ¡Di la verdad sobre tus hábitos!',
          },
          {
            scene: 'Mi ayer y mi mañana',
            prompt: 'Di algo de ayer y algo de mañana: 어제 ___ 어요/았어요/었어요. 내일 ___.',
            answer: '어제 카페에 갔어요. 내일 한국어 수업이 있어요.',
            accepted: ['어제', '내일', '갔어요', '먹었어요', '했어요'],
            explain: '어제+pasado / 내일+presente/futuro. La combinación correcta de tiempo+verbo.',
          },
          {
            scene: 'Ahora y más tarde',
            prompt: 'Di qué haces ahora y qué harás más tarde: 지금 ___. 이따가 ___.',
            answer: '지금 공부해요. 이따가 친구를 만날 거예요.',
            accepted: ['지금', '이따가'],
            explain: '지금(ahora) + presente. 이따가(más tarde hoy) + presente/futuro.',
          },
        ],
      },
    ],
  },
}

export default topic
