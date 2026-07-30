import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'obligacion-aya-hada-a2',
  order: '08',
  color: '#c60c30',
  category: 'Modalidad',
  level: 'A2',
  title: '-(아/어)야 하다 Coreano A2 — Obligacion y necesidad',
  shortTitle: '-(아/어)야 하다',
  metaTitle: 'Coreano A2 — -(아/어)야 하다 obligacion necesidad',
  description:
    '-(아/어)야 하다 expresa obligacion o necesidad en coreano: "tener que", "deber". Se combina con -아야 (ㅏ/ㅗ) o -어야 (resto) mas hada/dweda. Es la forma clave para hablar de responsabilidades, normas y necesidades.',
  lead: 'Raiz + -아야 해요 (ㅏ/ㅗ) o + -어야 해요 (resto). Ejemplos: 가야 해요 (Tengo que ir). 먹어야 해요 (Tengo que comer). 공부해야 해요 (Tengo que estudiar).',
  outcomes: [
    'Expresar obligacion con -(아/어)야 하다',
    'Distinguir -(아/어)야 하다 de -(아/어)야 되다',
    'Usar la negacion: -지 않아도 돼요 (no es necesario)',
    'Aplicar armonia vocal para -아야/-어야',
  ],

  guide: {
    goal: 'Expresar obligacion y necesidad con -(아/어)야 하다/되다 en coreano A2.',
    model: '매일 운동해야 해요 (Tengo que hacer ejercicio a diario) | 숙제를 해야 돼요 (Hay que hacer la tarea)',
    formula: 'Raiz + -아야 (ㅏ/ㅗ) | Raiz + -어야 (resto) | 하다 → 해야 | + 해요/돼요',
    decisions: [
      'Ultima vocal de la raiz ㅏ o ㅗ → añade -아야: 가다 → 가야, 오다 → 와야',
      'Ultima vocal cualquier otra → añade -어야: 먹다 → 먹어야, 쓰다 → 써야',
      '하다 → 해야 (contraccion especial): 공부하다 → 공부해야',
      'Despues de -아야/-어야: 해요 (formal-casual) o 돼요 (equivalente, mas coloquial)',
      'Negacion "no es necesario": -(아/어)도 돼요 o -지 않아도 돼요',
      'Negacion "no debes": -면 안 돼요 (no esta permitido)',
    ],
    table: [
      ['Infinitivo', 'Armonia vocal', '-(아/어)야 해요'],
      ['가다 (ir)', 'ㅏ → -아야', '가야 해요'],
      ['먹다 (comer)', 'ㅓ → -어야', '먹어야 해요'],
      ['오다 (venir)', 'ㅗ → -아야', '와야 해요'],
      ['공부하다 (estudiar)', '하다 → 해야', '공부해야 해요'],
      ['읽다 (leer)', 'ㅣ → -어야', '읽어야 해요'],
    ],
    mistakes: [
      '"가어야" — 가다 vocal ㅏ → 가야 (no 가어야)',
      '"먹아야" — 먹다 vocal ㅓ → 먹어야 (armonia vocal)',
      '"공부해야 하어요" — hada se contrae: 공부해야 해요',
    ],
  },

  seo: [
    {
      heading: '¿Cuál es la diferencia entre -야 하다 y -야 되다?',
      paragraphs: [
        'Ambas formas expresan obligacion y son intercambiables en la mayoria de contextos: 가야 해요 = 가야 돼요. En la practica 돼요 es algo mas coloquial y frecuente en el habla cotidiana, mientras que 해요 suena ligeramente mas formal.',
        'Las dos formas tienen las mismas reglas de armonia vocal. Puedes usar cualquiera sin miedo a cometer un error grave.',
      ],
    },
    {
      heading: '"No es necesario" vs "No esta permitido"',
      paragraphs: [
        'Cuidado con la negacion. -(아/어)도 돼요 significa "esta bien / no es necesario": 안 가도 돼요 (No tienes que ir / esta bien que no vayas). -면 안 돼요 significa "no esta permitido, no debes": 여기서 먹으면 안 돼요 (No puedes comer aqui — esta prohibido).',
        'Este contraste es crucial: 해도 돼요 (puedes hacerlo) vs 하면 안 돼요 (no debes hacerlo).',
      ],
      table: [
        ['Estructura', 'Significado', 'Ejemplo'],
        ['-(아/어)야 해요', 'Obligacion: tienes que', '가야 해요 (tienes que ir)'],
        ['-(아/어)도 돼요', 'Permiso: puedes / no necesitas', '안 가도 돼요 (no tienes que ir)'],
        ['-면 안 돼요', 'Prohibicion: no debes', '가면 안 돼요 (no debes ir)'],
      ],
    },
    {
      heading: '¿Cómo se expresa obligación con distintos sujetos en coreano?',
      paragraphs: [
        '-(아/어)야 하다 funciona con cualquier sujeto: 나는 가야 해요 (tengo que ir), 너는 가야 해요 (tienes que ir), 우리는 가야 해요 (tenemos que ir). El sujeto puede estar implicito como en espanol.',
        'Para obligacion impersonal o de norma general, coreano tambien usa el infinitivo nominal + -이에요: 여기서는 조용히 해야 해요 (Aqui hay que estar en silencio).',
      ],
    },
    {
      heading: '¿Cómo se forma la obligación -(아/어)야 하다 en coreano?',
      paragraphs: [
        'Se toma la raíz del verbo y se le añade la terminación -아야/-어야 (según la vocal de la raíz: ㅏ/ㅗ → -아야, el resto → -어야) seguida de 하다 o 되다: 가다 → 가야 해요 (tengo que ir), 먹다 → 먹어야 해요 (tengo que comer), 공부하다 → 공부해야 해요. Expresa obligación o necesidad ("tener que / deber"). 하다 y 되다 son intercambiables aquí, aunque 되다 suena algo más coloquial. Para negar la obligación ("no hace falta") se usa -지 않아도 되다 (안 가도 돼요 = no hace falta ir), no la negación directa. Es una de las estructuras más útiles del A2 y aparece constantemente en instrucciones y consejos.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-(아/어)야 하다/되다: ㅏ/ㅗ → -아야, resto → -어야. Negacion: -도 돼요 (no necesario) vs -면 안 돼요 (prohibido).',
    graphicPrompt: 'Lista de reglas o normas con checkboxes: obligatorio (✓), permitido (○), prohibido (✗).',
    scene: [
      ['가야 해요', 'Tengo que ir (가다 → 가야)'],
      ['먹어야 해요', 'Tengo que comer (먹다 → 먹어야)'],
      ['공부해야 돼요', 'Hay que estudiar (공부하다 → 해야)'],
      ['안 가도 돼요', 'No tienes que ir (permiso de no ir)'],
      ['여기서 먹으면 안 돼요', 'No se puede comer aqui (prohibicion)'],
      ['일찍 자야 해요', 'Tienes que dormir temprano'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-아야 vs -어야', '해요 vs 돼요', '도 돼요 vs 면 안 돼요'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento de obligacion',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de -(아/어)야 해요.',
        type: 'choice',
        items: [
          {
            scene: 'Tarea escolar',
            lines: [['Elena', '오늘 숙제를 ___ (하다). (Hoy tienes que hacer la tarea.)']],
            options: ['해야 해요', '하아야 해요', '하어야 해요', '하야 해요'],
            answer: '해야 해요',
            explain: '하다 → forma especial: 해야 해요.',
          },
          {
            scene: 'Hora de dormir',
            lines: [['Enzo', '내일 시험이 있어서 일찍 ___ (자다). (Hay examen manana, asi que tengo que dormir temprano.)']],
            options: ['자야 해요', '자어야 해요', '자아야 해요', '자이야 해요'],
            answer: '자야 해요',
            explain: '자다 → raiz 자 (vocal ㅏ) → 자야 해요.',
          },
          {
            scene: 'Ejercicio diario',
            lines: [['Ana', '건강을 위해서 매일 ___ (운동하다). (Para la salud, hay que hacer ejercicio a diario.)']],
            options: ['운동해야 해요', '운동하아야 해요', '운동하어야 해요', '운동해아야 해요'],
            answer: '운동해야 해요',
            explain: '운동하다 → 해야 해요 → 운동해야 해요.',
          },
          {
            scene: 'Lectura obligatoria',
            lines: [['Carlos', '이 책을 다음 주까지 ___ (읽다). (Tienes que leer este libro para la semana que viene.)']],
            options: ['읽어야 해요', '읽아야 해요', '읽이야 해요', '읽으야 해요'],
            answer: '읽어야 해요',
            explain: '읽다 → raiz 읽 (ㄱ, vocal ㅣ) → 읽어야 해요.',
          },
          {
            scene: 'Hora de llegada',
            lines: [['Lina', '회의가 9시에 시작해요. 일찍 ___ (오다). (La reunion empieza a las 9. Tienes que llegar temprano.)']],
            options: ['와야 해요', '오아야 해요', '오어야 해요', '오이야 해요'],
            answer: '와야 해요',
            explain: '오다 → raiz 오 (ㅗ) → 와야 해요. 오 + 아야 → 와야.',
          },
          {
            scene: 'Norma de la escuela',
            lines: [['Marco', '수업 중에 핸드폰을 ___ (끄다). (Durante la clase hay que apagar el celular.)']],
            options: ['꺼야 해요', '끄어야 해요', '끄아야 해요', '끄이야 해요'],
            answer: '꺼야 해요',
            explain: '끄다 → raiz 끄 (ㅡ) + -어야 → 꺼야 해요.',
          },
          {
            scene: 'Permiso (no obligacion)',
            lines: [['Elena', '오늘은 안 ___ (오다). 내일 오세요. (Hoy no tienes que venir. Ven manana.)']],
            options: ['와도 돼요', '와야 해요', '오면 안 돼요', '오아도 돼요'],
            answer: '와도 돼요',
            explain: '오도 돼요 → con vocal ㅗ: 와도 돼요. Significa "no tienes que venir".',
          },
          {
            scene: 'Prohibicion',
            lines: [['Enzo', '도서관에서 큰 소리로 말하___ 안 돼요. (En la biblioteca no se puede hablar en voz alta.)']],
            options: ['하면', '하야', '해야', '하어야'],
            answer: '하면',
            explain: 'Prohibicion: -면 안 돼요 → 말하면 안 돼요.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Dialogos con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los dialogos sobre obligacion y permiso.',
        type: 'dual',
        items: [
          {
            scene: 'Preparacion para el examen',
            lines: [
 ['Elena', '시험 준비가 어때요? (¿Como va la preparacion para el examen?)'],
 ['Ana', '단어를 더 [[0]] (외우다). 문법도 [[1]] (복습하다). (Tengo que memorizar mas vocabulario. Tambien tengo que repasar la gramatica.)'],
 ],
            blanks: [
              { options: ['외워야 해요', '외우아야 해요', '외우어야 해요', '외우야 해요'], answer: '외워야 해요', explain: '외우다 → raiz 외우 (ㅜ → -어야) → 외워야 해요.' },
              { options: ['복습해야 해요', '복습하아야 해요', '복습하어야 해요', '복습하야 해요'], answer: '복습해야 해요', explain: '복습하다 → 복습해야 해요.' },
            ],
          },
          {
            scene: 'Normas del apartamento',
            lines: [
 ['Marco', '아파트에서 지켜야 할 규칙이 있어요? (¿Hay reglas que cumplir en el apartamento?)'],
 ['Enzo', '네, 밤 10시 이후에는 큰 소리를 내면 [[0]] 돼요. 음식물 쓰레기는 따로 [[1]] (버리다). (Si, despues de las 10 de la noche no se puede hacer ruido. La basura organica hay que tirarla por separado.)'],
 ],
            blanks: [
              { options: ['안', '야', '어야', '아야'], answer: '안', explain: 'Prohibicion: 내면 안 돼요 (no se puede hacer ruido).' },
              { options: ['버려야 해요', '버리아야 해요', '버리어야 해요', '버리야 해요'], answer: '버려야 해요', explain: '버리다 → raiz 버리 (ㅣ → -어야) → 버려야 해요.' },
            ],
          },
          {
            scene: 'Visita al medico',
            lines: [
 ['Doctor', '3일 동안 이 약을 [[0]] (먹다). 커피는 안 [[1]] 돼요. (Durante 3 dias debe tomar esta medicina. No debe tomar cafe.)'],
 ['Carlos', '알겠습니다. (Entendido.)'],
 ],
            blanks: [
              { options: ['먹어야 해요', '먹아야 해요', '먹이야 해요', '먹으야 해요'], answer: '먹어야 해요', explain: '먹다 → 먹어야 해요.' },
              { options: ['마시면', '마셔야', '마시아야', '마시어야'], answer: '마시면', explain: '커피는 마시면 안 돼요 (prohibicion).' },
            ],
          },
          {
            scene: 'Libertad de asistencia',
            lines: [
 ['Sofia', '내일 수업에 꼭 [[0]] (오다)? (¿Es obligatorio venir a clase manana?)'],
 ['Elena', '아니요, [[1]] (오다, no es necesario). 온라인으로도 들을 수 있어요. (No, no tienes que venir. Tambien puedes asistir en linea.)'],
 ],
            blanks: [
              { options: ['와야 해요', '오아야 해요', '오어야 해요', '오이야 해요'], answer: '와야 해요', explain: '오다 → 와야 해요 (ㅗ + 아야 → 와야).' },
              { options: ['안 와도 돼요', '와야 해요', '오면 안 돼요', '안 오아도 돼요'], answer: '안 와도 돼요', explain: 'No es obligatorio: 안 와도 돼요.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con -(아/어)야 해요, -도 돼요 o -면 안 돼요.',
        type: 'guidedText',
        scene: 'Normas del aula de coreano de WeLearn',
        text: '수업 시간에 지각하면 [[0]] 돼요. 항상 준비물을 [[1]] (가져오다). 질문이 있으면 손을 [[2]] (들다). 핸드폰은 무음으로 [[3]] (하다). 숙제는 안 [[4]] 돼요 — 꼭 제출하세요.',
        blanks: [
          { options: ['안', '야', '어야', '아야'], answer: '안', explain: 'Prohibicion: 지각하면 안 돼요 (no se puede llegar tarde).' },
          { options: ['가져와야 해요', '가져오아야 해요', '가져오어야 해요', '가져오이야 해요'], answer: '가져와야 해요', explain: '가져오다 → 가져와야 해요 (오다 → 와야).' },
          { options: ['들어야 해요', '들아야 해요', '들이야 해요', '들으야 해요'], answer: '들어야 해요', explain: '들다 → raiz 들 (ㄹ → tratar como vocal, ㅡ) → 들어야 해요.' },
          { options: ['해야 해요', '하아야 해요', '하어야 해요', '하야 해요'], answer: '해야 해요', explain: '하다 → 해야 해요.' },
          { options: ['내도', '내야', '내면', '내어야'], answer: '내도', explain: 'No se puede no entregar: 안 내도 돼요 seria "no es necesario entregarlo" — pero el contexto dice "꼭 제출하세요" = obligatorio. El espacio correcto en el contexto: 안 내면 안 돼요 → aqui: 안.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de obligacion para cada situacion.',
        type: 'freeText',
        scene: 'Consejos de un medico a su paciente',
        text: '매일 약을 [[0]] (먹다). / 물을 하루에 두 리터 [[1]] (마시다). / 담배를 피우면 [[2]] 돼요. / 스트레스를 [[3]] (줄이다). / 충분히 [[4]] (자다).',
        blanks: [
          { answer: '먹어야 해요', explain: '먹다 → 먹어야 해요.' },
          { answer: '마셔야 해요', explain: '마시다 → raiz 마시 (ㅣ → -어야) → 마셔야 해요.' },
          { answer: '안', explain: 'Prohibicion: 피우면 안 돼요.' },
          { answer: '줄여야 해요', explain: '줄이다 → raiz 줄이 (ㅣ → -어야) → 줄여야 해요.' },
          { answer: '자야 해요', explain: '자다 → raiz 자 (ㅏ → -아야) → 자야 해요.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produccion guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones de obligacion, permiso o prohibicion.',
        type: 'write',
        items: [
          {
            scene: 'Norma de trabajo',
            prompt: 'Di "Tienes que llegar a las 9 de la manana" (9시, 도착하다).',
            answer: '9시에 도착해야 해요.',
            accepted: ['도착해야 해요', '도착해야 돼요'],
            explain: '도착하다 → 도착해야 해요.',
          },
          {
            scene: 'No es necesario',
            prompt: 'Di "No tienes que traer dinero hoy" (오늘, 돈, 가져오다, no necesario).',
            answer: '오늘 돈을 안 가져와도 돼요.',
            accepted: ['안 가져와도 돼요', '가져오지 않아도 돼요'],
            explain: '안 + 가져오다 + 도 돼요 → 안 가져와도 돼요.',
          },
          {
            scene: 'Prohibicion',
            prompt: 'Di "No puedes usar el celular durante el examen" (시험 중, 핸드폰, 사용하다).',
            answer: '시험 중에 핸드폰을 사용하면 안 돼요.',
            accepted: ['사용하면 안 돼요', '쓰면 안 돼요'],
            explain: '사용하다 → 사용하면 안 돼요 (prohibicion con -면 안 돼요).',
          },
          {
            scene: 'Consejo de salud',
            prompt: 'Di "Para estar sano, tienes que comer bien" (건강하다, 잘 먹다).',
            answer: '건강하려면 잘 먹어야 해요.',
            accepted: ['먹어야 해요', '먹어야 돼요'],
            explain: '먹다 → 먹어야 해요. Con condicion: 건강하려면 (para estar sano).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Escritura libre',
        intro: 'Escribe tres reglas para una situacion de tu vida usando -(아/어)야 해요 y -면 안 돼요.',
        type: 'write',
        items: [
          {
            scene: 'Regla de tu clase de coreano',
            prompt: 'Escribe una obligacion de tu clase con -(아/어)야 해요.',
            answer: '매일 단어를 외워야 해요.',
            accepted: ['야 해요', '어야 해요', '아야 해요'],
            explain: 'Obligacion: verbo + -(아/어)야 해요.',
          },
          {
            scene: 'Una prohibicion en tu vida',
            prompt: 'Escribe algo que no esta permitido con -면 안 돼요.',
            answer: '수업 중에 잠을 자면 안 돼요.',
            accepted: ['면 안 돼요'],
            explain: 'Prohibicion: -면 안 돼요.',
          },
          {
            scene: 'Algo que no es obligatorio',
            prompt: 'Di que algo NO es obligatorio usando -(아/어)도 돼요.',
            answer: '이 숙제는 안 해도 돼요.',
            accepted: ['도 돼요'],
            explain: 'No obligatorio: -도 돼요o 안 + verbo + 도 돼요.',
          },
        ],
      },
    ],
  },
}

export default topic
