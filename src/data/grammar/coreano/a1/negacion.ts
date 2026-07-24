import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'negacion',
  order: '10',
  color: '#c60c30',
  category: 'Verbos',
  level: 'A1',
  title: 'Negación en Coreano A1 — 안 y 못',
  shortTitle: 'Negación 안 / 못',
  metaTitle: 'Negación 안 못 coreano A1 — no quiero vs no puedo en coreano',
  description:
    '안 (an) y 못 (mot) son los dos prefijos negativos del coreano. 안 expresa negación voluntaria ("no quiero" / "no hago"), y 못 expresa imposibilidad o incapacidad ("no puedo"). Se colocan justo antes del verbo. La forma larga alternativa es verbo + 지 않아요.',
  lead: '안 = negación voluntaria (no quiero / no hago). 못 = imposibilidad (no puedo). Ambas van ANTES del verbo. Con 하다: 공부 안 해요 / 공부 못 해요.',
  outcomes: [
    'Usa 안 para negar voluntariamente una acción',
    'Usa 못 para expresar imposibilidad o incapacidad',
    'Aplica la posición correcta: antes del verbo',
  ],

  guide: {
    goal: 'Negar acciones con 안 (voluntad) y 못 (incapacidad) en coreano A1.',
    model: '안 먹어요. (No como — no quiero.) / 못 먹어요. (No puedo comer.)',
    formula: '안/못 + verbo | 하다 → 안 해요 / 못 해요 | [sustantivo] 안/못 해요',
    decisions: [
      '안 + verbo = negación simple (voluntaria): 안 가요 (no voy), 안 먹어요 (no como)',
      '못 + verbo = imposibilidad: 못 가요 (no puedo ir), 못 먹어요 (no puedo comer)',
      'Con verbos 하다: 공부 안 해요 (no estudio), 공부 못 해요 (no puedo estudiar) — 안/못 van entre el sustantivo y 하다',
      'Adjetivos: solo 안 (no 못): 안 예뻐요 (no es bonito), 안 맛있어요 (no está rico)',
      'Forma larga: verbo + 지 않아요 (más formal): 먹지 않아요 = 안 먹어요',
    ],
    table: [
      ['Tipo de negación', 'Ejemplo', 'Significado'],
      ['안 + verbo (voluntad)', '안 먹어요', 'No como (no quiero)'],
      ['못 + verbo (imposibilidad)', '못 먹어요', 'No puedo comer'],
      ['하다 con 안', '공부 안 해요', 'No estudio (no quiero)'],
      ['하다 con 못', '공부 못 해요', 'No puedo estudiar'],
      ['Forma larga', '먹지 않아요', 'No como (más formal)'],
    ],
    mistakes: [
      '"먹어요 안" ❌ — 안/못 van ANTES del verbo: "안 먹어요" ✓',
      '"안 공부해요" ❌ — con 하다 verbos: "공부 안 해요" ✓ (안 entre sustantivo y 하다)',
      '"못 피곤해요" ❌ — 못 NO se usa con adjetivos. "안 피곤해요" ✓ (no estoy cansado)',
    ],
  },

  seo: [
    {
      heading: 'La negación en coreano: 안 y 못',
      paragraphs: [
        'El coreano tiene dos formas básicas de negar una acción en el presente: 안 (an) y 못 (mot), que se colocan inmediatamente antes del verbo. A diferencia del español donde la negación ("no") va antes del verbo sin distinción de significado, el coreano distingue entre no hacer algo por voluntad propia (안) y no poder hacerlo por incapacidad (못).',
        '안 먹어요 = "no como" (por decisión, no tengo hambre, no quiero). 못 먹어요 = "no puedo comer" (soy alérgico, estoy enfermo, no hay tiempo). Esta distinción es fundamental y cambia completamente el significado.',
      ],
    },
    {
      heading: 'Posición de 안 y 못 con verbos 하다',
      paragraphs: [
        'Con verbos formados por sustantivo + 하다 (공부하다, 운동하다, 요리하다, etc.), 안 y 못 van entre el sustantivo y 하다, no antes del sustantivo: 공부 안 해요 ✓ (no estudio), 안 공부해요 ✗.',
        'Esta regla tiene lógica: 공부(estudio) es el contenido de lo que no se hace, y 안/못 niegan el acto de hacer (해요). Por eso van antes del hacer: "공부 안 해요" = "estudio no-hago".',
      ],
      table: [
        ['Verbo', 'Con 안', 'Con 못'],
        ['먹다 (comer)', '안 먹어요', '못 먹어요'],
        ['가다 (ir)', '안 가요', '못 가요'],
        ['공부하다 (estudiar)', '공부 안 해요', '공부 못 해요'],
        ['운동하다 (ejercitar)', '운동 안 해요', '운동 못 해요'],
      ],
    },
    {
      heading: 'Adjetivos: solo 안',
      paragraphs: [
        'Con adjetivos descriptivos, solo se usa 안, nunca 못: 안 예뻐요 (no es bonito), 안 맛있어요 (no está rico), 안 피곤해요 (no estoy cansado). La razón: 못 implica incapacidad, y los adjetivos no se "hacen" — solo se "son".',
        'Esto es diferente del español donde "no" sirve para todo. En coreano, cuando describes características o estados, siempre usa 안.',
      ],
    },
    {
      heading: 'La forma larga: 지 않아요',
      paragraphs: [
        'Existe una forma más larga y formal para negar: verbo + 지 않아요. Equivale a 안 + verbo en significado pero es más formal y enfática: 먹지 않아요 = 안 먹어요 (no como); 가지 않아요 = 안 가요 (no voy). En A1 es suficiente conocerla como reconocimiento pasivo — en producción activa usa 안/못.',
        'Para 못, la forma larga es: verbo + 지 못해요: 먹지 못해요 = 못 먹어요 (no puedo comer). También existen para enfatizar imposibilidad.',
      ],
    },
  ],

  visual: {
    mode: 'negation',
    teacherLens: 'Negación 안 (voluntad) vs. 못 (imposibilidad) con posición antes del verbo y regla para 하다.',
    graphicPrompt: 'Dos columnas: 안 (no quiero) vs. 못 (no puedo) con verbos comunes.',
    scene: [
      ['안 먹어요', 'No como. (no quiero — voluntad)'],
      ['못 먹어요', 'No puedo comer. (imposibilidad)'],
      ['공부 안 해요', 'No estudio. (hada-verbo: 안 entre sustantivo y 해요)'],
      ['공부 못 해요', 'No puedo estudiar. (못 entre sustantivo y 해요)'],
      ['안 가요', 'No voy. (voluntad)'],
      ['못 가요', 'No puedo ir. (imposibilidad)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['안 voluntad', '못 imposibilidad', 'hada: 안/못 entre sustantivo y 해요'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige 안 o 못 según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Rechazando comida',
            lines: [['Carlos', '저는 고수를 ___ 먹어요. (No como cilantro — no me gusta.)']],
            options: ['안', '못', '이', '에'],
            answer: '안',
            explain: 'No comer por decisión/gusto → 안. 안 먹어요 = no como (no quiero).',
          },
          {
            scene: 'Alergia',
            lines: [['Ana', '저는 우유를 ___ 마셔요. (No puedo beber leche — soy intolerante.)']],
            options: ['못', '안', '이', '에'],
            answer: '못',
            explain: 'Imposibilidad física → 못. 못 마셔요 = no puedo beber.',
          },
          {
            scene: 'No ir a la fiesta',
            lines: [['Lina', '오늘 파티에 ___ 가요. (Hoy no voy a la fiesta — no quiero.)']],
            options: ['안', '못', '없', '에서'],
            answer: '안',
            explain: 'Decisión voluntaria de no ir → 안. 안 가요.',
          },
          {
            scene: 'Ocupado',
            lines: [['Marco', '내일 ___ 와요. 일이 있어요. (Mañana no puedo venir. Tengo trabajo.)']],
            options: ['못', '안', '이', '가'],
            answer: '못',
            explain: 'No poder venir por compromiso → 못. 못 와요.',
          },
          {
            scene: 'Verbo hada',
            lines: [['Sofia', '저는 요즘 운동 ___ 해요. (Últimamente no hago ejercicio.)']],
            options: ['안', '못', '이', '에'],
            answer: '안',
            explain: 'Con 하다: sustantivo + 안 + 해요. 운동 안 해요.',
          },
          {
            scene: 'Adjetivo',
            lines: [['Dario', '오늘 날씨가 ___ 좋아요. (El tiempo hoy no está bien.)']],
            options: ['안', '못', '이', '를'],
            answer: '안',
            explain: 'Con adjetivos → solo 안. 안 좋아요 = no está bien.',
          },
          {
            scene: 'Posición de 안',
            lines: [['Sara', '¿Cómo se dice "No estudio" con 하다?']],
            options: ['공부 안 해요', '안 공부해요', '공부해요 안', '공부 안해요'],
            answer: '공부 안 해요',
            explain: 'Con 하다: [sustantivo] + 안 + 해요. 공부 안 해요.',
          },
          {
            scene: 'Forma larga',
            lines: [['Carlos', '¿Cuál es la forma larga equivalente a "안 먹어요"?']],
            options: ['먹지 않아요', '먹 안 해요', '안먹어요', '못 먹어요'],
            answer: '먹지 않아요',
            explain: 'Forma larga: verbo + 지 않아요. 먹지 않아요 = 안 먹어요.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Diálogos de negación',
        tag: '2 espacios',
        intro: 'Completa los diálogos con 안 o 못 y el verbo negado.',
        type: 'dual',
        items: [
          {
            scene: 'Rechazando una invitación',
            lines: [
 ['Lina', '오늘 같이 밥 먹을래요? (¿Quieres comer juntos hoy?)'],
 ['Marco', '미안해요, 오늘은 [[0]] [[1]]. 약속이 있어요. (Lo siento, hoy no puedo. Tengo un compromiso.)'],
 ],
            blanks: [
              { options: ['못', '안', '이', '에'], answer: '못', explain: 'Imposibilidad por compromiso → 못.' },
              { options: ['가요', '먹어요', '해요', '있어요'], answer: '먹어요', explain: '못 먹어요 = no puedo comer (hoy).' },
            ],
          },
          {
            scene: 'No estudiar por decisión',
            lines: [
 ['Sara', '오늘 공부해요? (¿Estudias hoy?)'],
 ['Carlos', '오늘은 공부 [[0]] [[1]]. 쉬고 싶어요. (Hoy no estudio. Quiero descansar.)'],
 ],
            blanks: [
              { options: ['안', '못', '이', '에'], answer: '안', explain: 'Decisión de no estudiar → 안.' },
              { options: ['해요', '가요', '있어요', '마셔요'], answer: '해요', explain: '공부 안 해요. Con 하다: 안 antes de 해요.' },
            ],
          },
          {
            scene: 'No hablar coreano todavía',
            lines: [
 ['Turista', '한국어 해요? (¿Hablas coreano?)'],
 ['Ana', '아직 한국어를 [[0]] [[1]]. 배우는 중이에요. (Todavía no puedo hablar coreano. Lo estoy aprendiendo.)'],
 ],
            blanks: [
              { options: ['못', '안', '이', '에'], answer: '못', explain: 'Todavía no poder → 못 (incapacidad actual).' },
              { options: ['해요', '가요', '있어요', '먹어요'], answer: '해요', explain: '한국어를 못 해요 = no puedo hablar coreano.' },
            ],
          },
          {
            scene: 'No gustarle algo',
            lines: [
 ['Dario', '커피 마셔요? (¿Bebes café?)'],
 ['Sofia', '아니요, 커피를 [[0]] [[1]]. 차를 좋아해요. (No, no bebo café. Me gusta el té.)'],
 ],
            blanks: [
              { options: ['안', '못', '이', '에'], answer: '안', explain: 'No beber por gusto/preferencia → 안.' },
              { options: ['마셔요', '먹어요', '가요', '해요'], answer: '마셔요', explain: '커피를 안 마셔요. 안 antes del verbo.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa con 안 o 못 según el contexto del texto.',
        type: 'guidedText',
        scene: 'Carlos explica sus limitaciones y preferencias',
        text: '저는 고기를 [[0]] 먹어요. 채식주의자예요. (No como carne.) / 저는 수영을 [[1]] 해요. 아직 못 배웠어요. (No sé nadar todavía.) / 저는 밤에 커피를 [[2]] 마셔요. 잠을 못 자요. (No bebo café de noche.) / 저는 내일 [[3]] 가요. 일이 있어요. (Mañana no puedo ir.) / 요즘 운동 [[4]] 해요. 바빠요. (Últimamente no hago ejercicio.)',
        blanks: [
          { options: ['안', '못'], answer: '안', explain: 'Vegetariano = decisión propia → 안. 안 먹어요.' },
          { options: ['못', '안'], answer: '못', explain: 'No saber nadar = incapacidad → 못. 수영을 못 해요.' },
          { options: ['안', '못'], answer: '안', explain: 'No beber por decisión (para dormir) → 안.' },
          { options: ['못', '안'], answer: '못', explain: 'No poder ir por trabajo → 못. 못 가요.' },
          { options: ['안', '못'], answer: '안', explain: 'No hacer ejercicio por decisión (ocupado, pero puede) → 안. 운동 안 해요.' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe 안 o 못 en el lugar correcto.',
        type: 'freeText',
        scene: 'Oraciones de negación con contexto',
        text: '저는 술을 [[0]] 마셔요. (No bebo alcohol — voluntad.) / 저는 일본어를 [[1]] 해요. (No sé japonés — incapacidad.) / 저는 오늘 학교에 [[2]] 가요. (Hoy no puedo ir a la escuela.) / 저는 고수를 [[3]] 먹어요. (No como cilantro — no me gusta.) / 저는 한국 드라마를 [[4]] 봐요. 시간이 없어요. (No puedo ver dramas coreanos. No tengo tiempo.)',
        blanks: [
          { answer: '안', accepted: ['안'], explain: 'No beber alcohol = decisión → 안.' },
          { answer: '못', accepted: ['못'], explain: 'No saber japonés = incapacidad → 못.' },
          { answer: '못', accepted: ['못'], explain: 'No poder ir hoy = imposibilidad → 못.' },
          { answer: '안', accepted: ['안'], explain: 'No comer por gusto = preferencia → 안.' },
          { answer: '못', accepted: ['못'], explain: 'No poder ver = falta de tiempo = imposibilidad → 못.' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Construye oraciones negativas con 안 y 못.',
        type: 'write',
        items: [
          {
            scene: 'Preferencia alimentaria',
            prompt: 'Di "No como carne" (고기=carne) — es una decisión.',
            answer: '저는 고기를 안 먹어요.',
            accepted: ['안 먹어요', '고기를 안 먹어요'],
            explain: 'Decisión propia → 안. 고기를 안 먹어요.',
          },
          {
            scene: 'Incapacidad',
            prompt: 'Di "No puedo nadar" (수영=nadar, 하다=hacer).',
            answer: '저는 수영을 못 해요.',
            accepted: ['수영을 못 해요', '못 해요'],
            explain: 'Imposibilidad/incapacidad → 못. 수영을 못 해요.',
          },
          {
            scene: 'No estudiar',
            prompt: 'Di "Hoy no estudio" (오늘=hoy, 공부하다=estudiar) — por decisión.',
            answer: '오늘은 공부 안 해요.',
            accepted: ['공부 안 해요', '오늘 공부 안 해요'],
            explain: 'hada con 안: 공부 + 안 + 해요. Decisión → 안.',
          },
          {
            scene: 'Forma larga',
            prompt: 'Di "No voy" usando la forma larga (가다=ir, verbo + 지 않아요).',
            answer: '가지 않아요.',
            accepted: ['가지 않아요', '안 가요'],
            explain: 'Forma larga: 가다 → 가지 않아요. Equivale a 안 가요.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Di tres cosas que no haces (안) y una cosa que no puedes hacer (못).',
        type: 'write',
        items: [
          {
            scene: 'Lo que no hago',
            prompt: 'Di algo que no haces por decisión propia: ___를/을 안 ___요.',
            answer: '저는 술을 안 마셔요.',
            accepted: ['안 먹어요', '안 마셔요', '안 가요', '안 해요'],
            explain: 'Decisión → 안 + verbo. Ej: 고기를 안 먹어요, 커피를 안 마셔요.',
          },
          {
            scene: 'Lo que no puedo hacer',
            prompt: 'Di algo que no puedes hacer por incapacidad: ___를/을 못 ___요.',
            answer: '저는 한국어를 못 해요.',
            accepted: ['못 해요', '못 가요', '못 먹어요', '못 마셔요'],
            explain: 'Incapacidad → 못 + verbo. Ej: 수영을 못 해요, 요리를 못 해요.',
          },
          {
            scene: 'Diferencia clara',
            prompt: 'Usa 안 y 못 en una oración cada uno para mostrar la diferencia.',
            answer: '저는 고기를 안 먹어요. 하지만 수영을 못 해요.',
            accepted: ['안', '못'],
            explain: '안 = no quiero/decido. 못 = no puedo/soy incapaz. Dos conceptos distintos.',
          },
        ],
      },
    ],
  },
}

export default topic
