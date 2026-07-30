import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'condicional-eumyeon-a2',
  order: '03',
  color: '#c60c30',
  category: 'Conectores',
  level: 'A2',
  title: 'Condicional -(으)면 Coreano A2 — Si y cuando',
  shortTitle: '-(으)면',
  metaTitle: 'Condicional coreano A2 — -(으)면 si/cuando condicion',
  description:
    'La terminacion -(으)면 es el condicional basico del coreano: equivale a "si" o "cuando" en espanol. Se usa con verbos y adjetivos para expresar condiciones. Su forma depende de si la raiz termina en consonante o vocal.',
  lead: 'Raiz + -면 (vocal/ㄹ) o + -으면 (consonante). Significado: si ... entonces ... / cuando ... Ejemplos: 비가 오면 우산을 써요 (Si llueve, usa paraguas). 피곤하면 쉬세요 (Si estas cansado, descansa).',
  outcomes: [
    'Construir oraciones condicionales con -(으)면',
    'Aplicar la regla vocal/consonante para elegir -면 o -으면',
    'Usar el condicional con verbos y adjetivos',
    'Combinar el condicional con mandatos y sugerencias',
  ],

  guide: {
    goal: 'Expresar condiciones con -(으)면 en coreano, equivalente al "si" condicional del espanol.',
    model: '비가 오면 집에 있을 거예요 (Si llueve, me quedare en casa) | 시간이 있으면 같이 가요 (Si tienes tiempo, vamos juntos)',
    formula: 'Raiz + -면 (vocal/ㄹ) | Raiz + -으면 (consonante) | Adj + -(으)면 → 피곤하면 / 어려우면',
    decisions: [
      'Identifica la raiz del verbo o adjetivo: quita -다',
      'Si la raiz termina en vocal o ㄹ → añade -면: 가다 → 가면, 살다 → 살면',
      'Si la raiz termina en consonante → añade -으면: 먹다 → 먹으면, 읽다 → 읽으면',
      'Con adjetivos: 덥다 (irregular ㅂ) → 더우면; 피곤하다 → 피곤하면',
      'La clausula condicional va ANTES de la clausula resultado: [si...] + [entonces...]',
      'El sujeto puede cambiar entre clausulas: 시간이 있으면 저도 갈게요 (Si tienes tiempo, yo tambien ire)',
    ],
    table: [
      ['Infinitivo', 'Raiz final', '-(으)면'],
      ['가다 (ir)', 'vocal 가', '가면'],
      ['먹다 (comer)', 'consonante 먹', '먹으면'],
      ['살다 (vivir)', 'ㄹ 살', '살면'],
      ['피곤하다 (cansado)', 'vocal 피곤하', '피곤하면'],
      ['어렵다 (dificil)', 'ㅂ irr → 어려우', '어려우면'],
    ],
    mistakes: [
      '"가으면" — raiz vocal no necesita 으: 가다 → 가면, no 가으면',
      '"먹면" — raiz consonante necesita 으: 먹다 → 먹으면, no 먹면',
      '"피곤하으면" — 하다 termina en vocal: 피곤하면 sin 으',
    ],
  },

  seo: [
    {
      heading: '¿Como funciona el condicional -(으)면?',
      paragraphs: [
        'En coreano la clausula condicional siempre precede a la clausula resultado. La estructura basica es: [condicion-(으)면] + [resultado]. Por ejemplo: 돈이 있으면 (si tengo dinero) + 여행할 거예요 (viajare) = 돈이 있으면 여행할 거예요.',
        '-(으)면 puede expresar tanto condiciones hipoteticas (si llueve, no salgo) como condiciones generales o habituales (cuando como mucho, me duele el estomago). En espanol usariamos "si" o "cuando" dependiendo del contexto.',
      ],
    },
    {
      heading: '¿Cómo se usa -(으)면 con mandatos y sugerencias?',
      paragraphs: [
        'Una combinacion muy frecuente es el condicional seguido de un mandato o sugerencia: 피곤하면 쉬세요 (Si estas cansado, descansa). 배고프면 드세요 (Si tienes hambre, come). Esta estructura es muy natural en el coreano hablado.',
        'Atencion: a diferencia de -(아/어)서 (que NO puede preceder a mandatos), -(으)면 si puede ir seguido de comandos. Esta es una diferencia importante que veremos en el tema 04.',
      ],
      table: [
        ['Condicion', 'Resultado/Mandato', 'Traduccion'],
        ['피곤하면', '쉬세요', 'Si estas cansado, descansa'],
        ['시간이 있으면', '같이 가요', 'Si tienes tiempo, vamos juntos'],
        ['돈이 없으면', '걱정하지 마세요', 'Si no tienes dinero, no te preocupes'],
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre -(으)면 y -때?',
      paragraphs: [
        '-(으)면 expresa una condicion (si algo ocurre). -때 expresa simplemente el momento (cuando/en el momento de). Compare: 비가 오면 우산을 써요 (Si llueve, usa paraguas — condicion) vs 비가 올 때 우산을 썼어요 (Cuando lluvia, usaba paraguas — descripcion de momento).',
        'Para A2 lo mas importante es dominar -(으)면 como la forma general de condicion. -때 se introduce posteriormente para hablar de momentos especificos.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Condicional -(으)면: raiz + -면 (vocal/ㄹ) o + -으면 (consonante). Siempre antes del resultado.',
    graphicPrompt: 'Dos paneles: panel A (condicion con -(으)면) y panel B (resultado). Flecha de A a B.',
    scene: [
      ['비가 오면...', 'Si llueve... (오다 → 오면, vocal)'],
      ['시간이 있으면...', 'Si tienes tiempo... (있다 → 있으면, consonante)'],
      ['피곤하면 쉬세요', 'Si estas cansado, descansa'],
      ['먹으면 기분이 좋아요', 'Si como, me siento bien'],
      ['살면 알게 돼요', 'Si vives alli, lo sabes (살다 → 살면)'],
      ['한국에 가면 뭐 할 거예요?', 'Si vas a Corea, ¿que haras?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-면 vs -으면', 'orden clausulas', 'con mandatos'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento del condicional',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de -(으)면 para cada verbo o adjetivo.',
        type: 'choice',
        items: [
          {
            scene: 'Consejo para el estudio',
            lines: [['Iris', '열심히 공부___ 한국어를 잘 할 수 있어요. (Si estudias duro, podras hablar bien coreano.)']],
            options: ['하면', '하으면', '해면'],
            answer: '하면',
            explain: '하다 → raiz 하 (vocal) → 하면. Vocal final no necesita -으.',
          },
          {
            scene: 'Tiempo libre',
            lines: [['Ana', '시간이 있___ 같이 밥 먹어요. (Si tienes tiempo, comamos juntos.)']],
            options: ['으면', '면', '이면', '으면서'],
            answer: '으면',
            explain: '있다 → raiz 있 (consonante ㅅ) → 있으면. Consonante + -으면.',
          },
          {
            scene: 'Lluvia',
            lines: [['Diego', '비가 ___ (오다) 우산을 가져가세요. (Si llueve, lleva paraguas.)']],
            options: ['오면', '오으면', '왔으면', '오고면'],
            answer: '오면',
            explain: '오다 → raiz 오 (vocal) → 오면.',
          },
          {
            scene: 'Cansancio',
            lines: [['Carlos', '피곤___ 일찍 자세요. (Si estas cansado, duerme temprano.)']],
            options: ['하면', '하으면', '해면', '했으면'],
            answer: '하면',
            explain: '피곤하다 → raiz 피곤하 (vocal) → 피곤하면.',
          },
          {
            scene: 'Comida picante',
            lines: [['Lina', '매운 거 먹___ 물을 많이 드세요. (Si comes algo picante, bebe mucha agua.)']],
            options: ['으면', '면', '이면', '을면'],
            answer: '으면',
            explain: '먹다 → raiz 먹 (consonante) → 먹으면.',
          },
          {
            scene: 'Viviendo en Seoul',
            lines: [['Sofia', '서울에 살___ 지하철을 자주 타요. (Si vives en Seul, tomas el metro con frecuencia.)']],
            options: ['면', '으면', '살이면', '살았으면'],
            answer: '면',
            explain: '살다 → raiz 살 (ㄹ final) → 살면. ㄹ se trata como vocal: no necesita -으.',
          },
          {
            scene: 'Dificultad',
            lines: [['Marco', '어려___ 도움을 요청하세요. (Si es dificil, pide ayuda.)']],
            options: ['우면', '으면', '어면', '웠으면'],
            answer: '우면',
            explain: '어렵다 → irregular ㅂ: ㅂ→우 → 어려우면.',
          },
          {
            scene: 'Con el medico',
            lines: [['Iris', '아프___ 병원에 가세요. (Si estas enfermo, ve al hospital.)']],
            options: ['면', '으면', '아면', '프면'],
            answer: '면',
            explain: '아프다 → raiz 아프 (vocal) → 아프면.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Dialogos con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los dialogos usando -(으)면 en el contexto correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Consejo de Diego',
            lines: [
 ['Carlos', '선생님, 한국어 발음이 어려워요. (La pronunciacion coreana es dificil.)'],
 ['Diego', '매일 연습[[0]] (하다) 금방 [[1]] (좋아지다 — mejorar). (Si practicas a diario, mejoraras pronto.)'],
 ],
            blanks: [
              { options: ['하면', '하으면', '해면', '하이면'], answer: '하면', explain: '하다 → raiz 하 (vocal) → 하면.' },
              { options: ['좋아질 거예요', '좋아지면', '좋아졌어요', '좋아지요'], answer: '좋아질 거예요', explain: 'Resultado con futuro: 좋아지다 → 좋아질 거예요.' },
            ],
          },
          {
            scene: 'Planes condicionados',
            lines: [
 ['Ana', '날씨가 좋[[0]] (좋다) 공원에 갈 거예요? (Si el clima esta bueno, ¿iras al parque?)'],
 ['Lina', '네, 날씨가 좋[[1]] (좋다) 갈 거예요. (Si, si el clima esta bueno, ire.)'],
 ],
            blanks: [
              { options: ['으면', '이면', '면', '였으면'], answer: '으면', explain: '좋다 → raiz 좋 (consonante ㅎ) → 좋으면.' },
              { options: ['으면', '이면', '면', '았으면'], answer: '으면', explain: '좋다 → 좋으면. Mismo condicional en la respuesta.' },
            ],
          },
          {
            scene: 'Preguntando sobre Corea',
            lines: [
 ['Marco', '한국에 [[0]] (가다) 뭐 하고 싶어요? (Si vas a Corea, ¿que quieres hacer?)'],
 ['Sofia', '한국에 [[1]] (가다) 김치를 꼭 먹을 거예요. (Si voy a Corea, seguro comere kimchi.)'],
 ],
            blanks: [
              { options: ['가면', '가으면', '갔으면', '가이면'], answer: '가면', explain: '가다 → raiz 가 (vocal) → 가면.' },
              { options: ['가면', '가으면', '갔으면', '가이면'], answer: '가면', explain: '가다 → 가면. Mismo patron en la respuesta.' },
            ],
          },
          {
            scene: 'Reglas del hogar',
            lines: [
 ['Iris', '집에 들어 (오다) 손을 씻으세요. (Cuando llegues a casa, lavate las manos.)'],
 ['Carlos', '알겠어요. 먹[[0]] 도 손을 씻을게요. (Entendido. Antes de comer tambien me lavare las manos.)'],
 ],
            blanks: [
              { options: ['오면', '오으면', '왔으면', '오이면'], answer: '오면', explain: '오다 → raiz 오 (vocal) → 오면.' },
              { options: ['기 전에', '으면서', '으면', '아서'], answer: '기 전에', explain: '먹기 전에 = antes de comer. -기 전에 expresa anterioridad (tema 17).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con la forma correcta de -(으)면.',
        type: 'guidedText',
        scene: 'Consejos de Iris para aprender coreano',
        text: '매일 30분 공부[[0]] 한 달 후에 많이 달라질 거예요. 단어를 모르[[1]] 사전을 찾아보세요. 발음이 어렵[[2]] 소리 내어 읽으세요. 한국 드라마를 보[[3]] 자연스럽게 배울 수 있어요. 틀려도 괜찮아요 — 포기하지 않[[4]] 반드시 성공할 거예요.',
        blanks: [
          { options: ['하면', '하으면', '해면', '하이면'], answer: '하면', explain: '공부하다 → 하면 (vocal).' },
          { options: ['르면', '르으면', '르면', '으면'], answer: '으면', explain: '모르다 → raiz 모르 (vocal) → 모르면. Atencion: vocal ㅡ → -면.' },
          { options: ['우면', '으면', '어면', '웠으면'], answer: '우면', explain: '어렵다 → irregular ㅂ: 어려우면.' },
          { options: ['보면', '보으면', '봤으면', '보이면'], answer: '보면', explain: '보다 → raiz 보 (vocal) → 보면.' },
          { options: ['으면', '면', '않으면', '면'], answer: '으면', explain: '않다 → raiz 않 (consonante) → 않으면.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de -(으)면 para cada verbo.',
        type: 'freeText',
        scene: 'Consejos para la vida saludable',
        text: '물을 많이 [[0]]건강해요. (마시다) / 운동을 [[1]]기분이 좋아요. (하다) / 야채를 많이 [[2]]몸에 좋아요. (먹다) / 일찍 [[3]]피곤하지 않아요. (자다) / 스트레스가 [[4]]산책을 하세요. (있다)',
        blanks: [
          { answer: '마시면', explain: '마시다 → raiz 마시 (vocal) → 마시면.' },
          { answer: '하면', explain: '하다 → raiz 하 (vocal) → 하면.' },
          { answer: '먹으면', explain: '먹다 → raiz 먹 (consonante) → 먹으면.' },
          { answer: '자면', explain: '자다 → raiz 자 (vocal) → 자면.' },
          { answer: '있으면', explain: '있다 → raiz 있 (consonante) → 있으면.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produccion guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones condicionales completas con -(으)면.',
        type: 'write',
        items: [
          {
            scene: 'Consejo a un amigo',
            prompt: 'Di "Si tienes tiempo, estudia coreano" (시간이 있다=tener tiempo, 공부하다=estudiar).',
            answer: '시간이 있으면 한국어를 공부하세요.',
            accepted: ['있으면', '시간이 있으면', '공부하세요'],
            explain: '있다 → consonante → 있으면. Resultado: mandato 공부하세요.',
          },
          {
            scene: 'Invitacion condicional',
            prompt: 'Di "Si el clima esta bien, vamos al parque" (날씨가 좋다, 공원에 가다).',
            answer: '날씨가 좋으면 공원에 가요.',
            accepted: ['좋으면', '날씨가 좋으면', '공원에 가요'],
            explain: '좋다 → consonante ㅎ → 좋으면. Resultado: propuesta 가요.',
          },
          {
            scene: 'Condicion de trabajo',
            prompt: 'Di "Si no estudias, no podras hablar coreano" (공부하다, 한국어, 말하다, 못).',
            answer: '공부하지 않으면 한국어를 못 말할 거예요.',
            accepted: ['않으면', '안 하면', '못 말할 거예요'],
            explain: 'Negacion condicional: -지 않으면 (si no...). Resultado: 못 + verbo.',
          },
          {
            scene: 'Automatico',
            prompt: 'Di "Cuando llueve, me quedo en casa" (비가 오다, 집에 있다).',
            answer: '비가 오면 집에 있어요.',
            accepted: ['오면', '비가 오면', '집에 있어요'],
            explain: '오다 → raiz 오 (vocal) → 오면. Habito: presente en resultado.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Escritura libre',
        intro: 'Escribe tres consejos para un estudiante nuevo usando -(으)면 + mandato.',
        type: 'write',
        items: [
          {
            scene: 'Consejo 1: sobre el estudio',
            prompt: 'Da un consejo de estudio usando "Si... entonces [mandato]".',
            answer: '모르는 단어가 있으면 꼭 사전을 찾아보세요.',
            accepted: ['있으면', '으면', '하면', '먹으면'],
            explain: 'Estructura: condicion-(으)면 + mandato. Usa vocabulario de tus temas favoritos.',
          },
          {
            scene: 'Consejo 2: sobre la salud',
            prompt: 'Da un consejo de salud usando -(으)면 con un adjetivo como 피곤하다 o 아프다.',
            answer: '피곤하면 충분히 쉬세요.',
            accepted: ['피곤하면', '아프면', '배고프면', '배가 아프면'],
            explain: '피곤하다 → 피곤하면(vocal). 충분히 = suficientemente, bien. 쉬다 → 쉬세요.',
          },
          {
            scene: 'Consejo 3: sobre la practica',
            prompt: 'Da un consejo de practica usando -(으)면 con un verbo como 연습하다 o 듣다.',
            answer: '매일 연습하면 빨리 늘 거예요.',
            accepted: ['연습하면', '들으면', '말하면', '보면'],
            explain: '연습하다 → 연습하면(vocal). 빨리 늘다 = mejorar rapidamente.',
          },
        ],
      },
    ],
  },
}

export default topic
