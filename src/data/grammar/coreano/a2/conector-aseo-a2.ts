import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'conector-aseo-a2',
  order: '04',
  color: '#c60c30',
  category: 'Conectores',
  level: 'A2',
  title: 'Conector -(아/어)서 Coreano A2 — Razon y secuencia',
  shortTitle: '-(아/어)서',
  metaTitle: 'Conector coreano A2 — -(아/어)서 razon y secuencia',
  description:
    'La terminacion -(아/어)서 conecta dos clausulas expresando razon ("porque") o secuencia ("y luego"). La clausula anterior explica por que o describe que paso primero. No puede usarse antes de mandatos ni de propuestas.',
  lead: 'Raiz + -아서 (armonía vocal ㅏ/ㅗ) o + -어서 (resto). Ejemplos: 피곤해서 일찍 잤어요 (Estaba cansado, así que dormí temprano). 학교에 가서 공부했어요 (Fui al colegio y estudié).',
  outcomes: [
    'Conectar dos acciones con relacion de causa usando -(아/어)서',
    'Expresar secuencia temporal con -(아/어)서',
    'Aplicar la regla de armonia vocal para elegir -아서 o -어서',
    'Distinguir -(아/어)서 de -(으)면 y -(으)니까',
  ],

  guide: {
    goal: 'Conectar clausulas indicando razon o secuencia con -(아/어)서 en coreano A2.',
    model: '피곤해서 집에 있었어요 (Estaba cansado, por eso me quede en casa) | 시장에 가서 과일을 샀어요 (Fui al mercado y compre fruta)',
    formula: 'Raiz + -아서 (vocal ㅏ/ㅗ) | Raiz + -어서 (resto) | 하다 → 해서',
    decisions: [
      'Identifica la raiz del verbo o adjetivo: quita -다',
      'Si la ultima vocal de la raiz es ㅏ o ㅗ → añade -아서: 가다 → 가서, 오다 → 와서',
      'Si la ultima vocal es cualquier otra → añade -어서: 먹다 → 먹어서, 피곤하다 → 피곤해서',
      '하다 tiene forma especial: 해서 (no 하아서)',
      'PROHIBICION: -(아/어)서 NO puede preceder a mandatos (세요) ni propuestas (아요/어요 invitacion). Para eso usa -(으)니까',
      'Con -(아/어)서 el sujeto suele ser el mismo en las dos clausulas',
    ],
    table: [
      ['Infinitivo', 'Regla de vocal', '-(아/어)서'],
      ['가다 (ir)', 'ㅏ → -아서', '가서'],
      ['오다 (venir)', 'ㅗ → -아서 (contraccion)', '와서'],
      ['먹다 (comer)', 'ㅓ → -어서', '먹어서'],
      ['피곤하다 (estar cansado)', '하다 → 해서', '피곤해서'],
      ['배우다 (aprender)', 'ㅜ → -어서', '배워서'],
    ],
    mistakes: [
      '"피곤해서 쉬세요" — con mandatos usa -(으)니까: 피곤하니까 쉬세요',
      '"가아서" — 가다: contraccion 가 + 아서 = 가서 (no 가아서)',
      '"하아서" — 하다 tiene forma especial: siempre 해서',
    ],
  },

  seo: [
    {
      heading: '¿Como funciona -(아/어)서 en coreano?',
      paragraphs: [
        '-(아/어)서 tiene dos usos principales: razon y secuencia. Como razon equivale a "porque" o "asi que": 배가 고파서 밥을 먹었어요 (Tenia hambre, asi que comi). Como secuencia indica que una accion ocurre antes: 집에 가서 숙제를 했어요 (Fui a casa y hice la tarea).',
        'La clave para elegir -아서 o -어서 es la armonia vocal: si la ultima vocal de la raiz es ㅏ o ㅗ, se usa -아서. En los demas casos, -어서. Y 하다 siempre da 해서, que es una contraccion de 하여서.',
      ],
    },
    {
      heading: 'Limitacion importante: no con mandatos',
      paragraphs: [
        'A diferencia de -(으)니까 y -(으)면, la terminacion -(아/어)서 NO puede usarse antes de mandatos (imperativo) ni de propuestas con -(아/어)요. Esta es una regla crucial que confunde a muchos estudiantes.',
        'Correcto: 피곤하니까 쉬세요 (Como estas cansado, descansa). Incorrecto: ✗피곤해서 쉬세요. Sin embargo, si se puede usar con oraciones declarativas: 피곤해서 쉬었어요 (Estaba cansado, asi que descanse).',
      ],
      table: [
        ['Uso', 'Ejemplo', 'Mandato posible'],
        ['-(아/어)서 + declaracion', '배가 고파서 먹었어요', 'Si'],
        ['-(아/어)서 + mandato', '✗배가 고파서 드세요', 'NO'],
        ['-(으)니까 + mandato', '배가 고프니까 드세요', 'Si'],
      ],
    },
    {
      heading: 'Razon vs secuencia: ¿como distinguirlos?',
      paragraphs: [
        'Con verbos de movimiento (가다, 오다, 나가다) -(아/어)서 casi siempre expresa secuencia: 학교에 가서 공부했어요 (Fui al colegio y estudie). Con adjetivos, expresa casi siempre razon: 날씨가 좋아서 기분이 좋아요 (El clima esta bien, por eso me siento bien).',
        'El contexto y el tipo de verbo te guian: si la primera clausula describe un estado o emocion, es causa. Si describe un desplazamiento o preparacion, es secuencia.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-(아/어)서: razon (ㅏ/ㅗ→아서, resto→어서, 하다→해서) o secuencia. NO con mandatos.',
    graphicPrompt: 'Dos paneles conectados por flecha: Causa/Accion1 -(아/어)서 → Resultado/Accion2.',
    scene: [
      ['피곤해서 일찍 잤어요', 'Estaba cansado, asi que dormi temprano (피곤하다 → 해서)'],
      ['학교에 가서 공부했어요', 'Fui al colegio y estudie (가다 → 가서)'],
      ['배가 고파서 밥을 먹었어요', 'Tenia hambre, asi que comi (고프다 → 고파서)'],
      ['날씨가 좋아서 기분이 좋아요', 'Hace buen tiempo, por eso me siento bien'],
      ['친구를 만나서 커피를 마셨어요', 'Me encontre con mi amigo y tome cafe'],
      ['돈이 없어서 못 갔어요', 'No tenia dinero, asi que no pude ir'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-아서 vs -어서', '해서', 'NO con mandatos'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento de -(아/어)서',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta de -(아/어)서 para cada verbo.',
        type: 'choice',
        items: [
          {
            scene: 'Cansancio despues del trabajo',
            lines: [['Iván', '일이 많___ 집에 일찍 왔어요. (Habia mucho trabajo, asi que vine a casa temprano.)']],
            options: ['아서', '어서', '해서', '이서'],
            answer: '아서',
            explain: '많다 → raiz 많, ultima vocal ㅏ → 많아서.',
          },
          {
            scene: 'Cita con amigos',
            lines: [['Ana', '친구를 만나___ 카페에 갔어요. (Me encontre con mi amiga y fui al cafe.)']],
            options: ['아서', '어서', '서', '해서'],
            answer: '서',
            explain: '만나다 → raiz 만나 (vocal ㅏ) → 만나서. 만나 + 아서 = 만나서 (contraccion).',
          },
          {
            scene: 'Estudio en casa',
            lines: [['Carlos', '도서관에 ___ (가다) 책을 읽었어요. (Fui a la biblioteca y lei un libro.)']],
            options: ['가서', '가아서', '갔어서', '가해서'],
            answer: '가서',
            explain: '가다 → vocal ㅏ → 가아서 → contraccion: 가서.',
          },
          {
            scene: 'Clima agradable',
            lines: [['Lina', '날씨가 좋___ 산책했어요. (El clima estaba bien, asi que di un paseo.)']],
            options: ['아서', '어서', '해서', '이서'],
            answer: '아서',
            explain: '좋다 → raiz 좋, ultima vocal ㅗ → 좋아서.',
          },
          {
            scene: 'Sin dinero',
            lines: [['Marco', '돈이 없___ 못 갔어요. (No tenia dinero, asi que no pude ir.)']],
            options: ['어서', '아서', '해서', '으서'],
            answer: '어서',
            explain: '없다 → raiz 없, ultima vocal ㅓ → 없어서.',
          },
          {
            scene: 'Preparando clase',
            lines: [['Emma', '공부를 ___ (하다) 시험을 잘 봤어요. (Estudie y sali bien en el examen.)']],
            options: ['해서', '하아서', '하어서', '하서'],
            answer: '해서',
            explain: '하다 → forma especial: 해서 (no 하아서). Siempre 해서.',
          },
          {
            scene: 'Llegando tarde',
            lines: [['Sofia', '버스를 놓쳐___ 늦었어요. (Perde el autobus, asi que llegue tarde.)']],
            options: ['서', '아서', '해서', '이서'],
            answer: '서',
            explain: '놓치다 → raiz 놓치, vocal ㅣ → 놓쳐서. 놓치 + 어서 → 놓쳐서.',
          },
          {
            scene: 'Hambre repentina',
            lines: [['Ana', '배가 고파___ 편의점에 갔어요. (Tenia hambre, asi que fui a la tienda.)']],
            options: ['서', '아서', '어서', '해서'],
            answer: '서',
            explain: '고프다 → vocal ㅡ pero regla especial: 고프 + 아서 → 고파서. -프 con ㅏ.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Dialogos con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los dialogos usando -(아/어)서 para razon o secuencia.',
        type: 'dual',
        items: [
          {
            scene: 'Planes del fin de semana',
            lines: [
 ['Carlos', '이번 주말에 뭐 해요? (¿Que haces este fin de semana?)'],
 ['Iván', '시장에 [[0]] (가다) 야채를 [[1]] (사다). (Voy al mercado y compro verduras.)'],
 ],
            blanks: [
              { options: ['가서', '가아서', '갔어서', '가이서'], answer: '가서', explain: '가다 → 가서. Secuencia: ir → comprar.' },
              { options: ['살 거예요', '샀어요', '사서', '사아요'], answer: '살 거예요', explain: 'Resultado en futuro: 사다 → 살 거예요.' },
            ],
          },
          {
            scene: 'Explicando el retraso',
            lines: [
 ['Emma', '왜 늦었어요? (¿Por que llegaste tarde?)'],
 ['Ana', '길이 [[0]] (막히다) 택시를 못 [[1]] (타다). (El trafico estaba congestionado, asi que no pude tomar un taxi.)'],
 ],
            blanks: [
              { options: ['막혀서', '막히서', '막혔어서', '막히아서'], answer: '막혀서', explain: '막히다 → 막혀서 (ㅣ → 어서 → 막혀서).' },
              { options: ['탔어요', '탔습니다', '탈 수 없었어요', '타서'], answer: '탈 수 없었어요', explain: '타다 → 못 탈 수 없었어요 (no pude tomar). O simplemente: 못 탔어요.' },
            ],
          },
          {
            scene: 'Preparacion para la fiesta',
            lines: [
 ['Lina', '파티 준비는 어떻게 됐어요? (¿Como va la preparacion de la fiesta?)'],
 ['Marco', '마트에 [[0]] (가다) 음식을 [[1]] (준비하다). (Fui al supermercado y prepare la comida.)'],
 ],
            blanks: [
              { options: ['가서', '가아서', '갔어서', '가해서'], answer: '가서', explain: '가다 → 가서. Secuencia de acciones.' },
              { options: ['준비했어요', '준비해서', '준비하아서', '준비하이서'], answer: '준비했어요', explain: 'Resultado final: 준비하다 → 준비했어요.' },
            ],
          },
          {
            scene: 'Motivo del descanso',
            lines: [
 ['Iván', '오늘 왜 수업을 안 들었어요? (¿Por que no asististe a clase hoy?)'],
 ['Sofia', '몸이 [[0]] (아프다) 쉬었어요. 내일은 [[1]] (오다) 꼭 들을게요. (Estaba enfermo, asi que descanse. Manana vendré seguro.)'],
 ],
            blanks: [
              { options: ['아파서', '아프어서', '아프해서', '아파아서'], answer: '아파서', explain: '아프다 → ㅡ irregular: 아파서 (vocal ㅏ).' },
              { options: ['와서', '오아서', '왔어서', '오서'], answer: '와서', explain: '오다 → 와서 (ㅗ + 아서 = 와서, contraccion).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con la forma correcta de -(아/어)서.',
        type: 'guidedText',
        scene: 'El dia de Iván en Bucaramanga',
        text: '오늘 아침에 일찍 일어나[[0]] 조깅을 했어요. 그다음에 집에 돌아[[1]] 샤워를 했어요. 날씨가 맑[[2]] 기분이 정말 좋았어요. 카페에 [[3]] (가다) 커피를 마시면서 수업을 준비했어요. 학생들이 열심히 공부[[4]] 뿌듯했어요.',
        blanks: [
          { options: ['서', '아서', '어서', '해서'], answer: '서', explain: '일어나다 → 일어나 + 아서 → 일어나서 (contraccion).' },
          { options: ['아서', '어서', '서', '해서'], answer: '아서', explain: '돌아오다 → 돌아와서. Aqui: 돌아오다 raiz 돌아오, vocal ㅗ → 돌아와서. Simplificado: 돌아와서.' },
          { options: ['아서', '어서', '해서', '이서'], answer: '아서', explain: '맑다 → raiz 맑, vocal ㅏ → 맑아서.' },
          { options: ['가서', '가아서', '갔어서', '가이서'], answer: '가서', explain: '가다 → 가서. Secuencia.' },
          { options: ['해서', '하아서', '하서', '하어서'], answer: '해서', explain: '공부하다 → 해서. Forma especial de 하다.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma -(아/어)서 correcta para cada verbo indicado.',
        type: 'freeText',
        scene: 'Rutina diaria de una estudiante coreana',
        text: '학교에 [[0]] (가다) 친구들을 만났어요. / 점심을 [[1]] (먹다) 도서관에 갔어요. / 피곤[[2]] (피곤하다) 커피를 마셨어요. / 숙제를 [[3]] (하다) 음악을 들었어요. / 집에 [[4]] (오다) 바로 잤어요.',
        blanks: [
          { answer: '가서', explain: '가다 → 가 + 아서 → 가서.' },
          { answer: '먹어서', explain: '먹다 → 먹 + 어서 → 먹어서.' },
          { answer: '피곤해서', explain: '피곤하다 → 해서 → 피곤해서.' },
          { answer: '해서', explain: '하다 → 해서 (forma especial).' },
          { answer: '와서', explain: '오다 → 오 + 아서 → 와서 (contraccion).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produccion guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas usando -(아/어)서 para causa o secuencia.',
        type: 'write',
        items: [
          {
            scene: 'Explicando por que no fuiste a la fiesta',
            prompt: 'Di "Estaba enfermo, asi que no pude ir a la fiesta" (아프다, 파티, 못 가다).',
            answer: '아파서 파티에 못 갔어요.',
            accepted: ['아파서', '못 갔어요', '파티'],
            explain: '아프다 → 아파서 (irregular ㅡ). Resultado: 못 갔어요.',
          },
          {
            scene: 'Secuencia de acciones',
            prompt: 'Di "Fui al supermercado y compre comida" (마트에 가다, 음식을 사다).',
            answer: '마트에 가서 음식을 샀어요.',
            accepted: ['가서', '마트에 가서', '음식을 샀어요'],
            explain: '가다 → 가서. Secuencia: ir → comprar.',
          },
          {
            scene: 'Resultado de estudio',
            prompt: 'Di "Estudie mucho, asi que sali bien en el examen" (열심히 공부하다, 시험을 잘 보다).',
            answer: '열심히 공부해서 시험을 잘 봤어요.',
            accepted: ['공부해서', '열심히', '시험을 잘 봤어요'],
            explain: '공부하다 → 공부해서. 시험을 잘 보다 = salir bien en el examen.',
          },
          {
            scene: 'Causa del retraso',
            prompt: 'Di "Hubo trafico, asi que llegue tarde" (차가 막히다, 늦다).',
            answer: '차가 막혀서 늦었어요.',
            accepted: ['막혀서', '늦었어요'],
            explain: '막히다 → 막혀서 (ㅣ + 어서 → 혀서). 늦다 → 늦었어요.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Escritura libre',
        intro: 'Describe tres cosas que hiciste hoy usando -(아/어)서 para conectar acciones o explicar razones.',
        type: 'write',
        items: [
          {
            scene: 'Accion de la manana',
            prompt: 'Escribe lo que hiciste primero esta manana y lo que paso despues (secuencia con -(아/어)서).',
            answer: '아침에 일어나서 커피를 마셨어요.',
            accepted: ['아서', '어서', '서', '해서'],
            explain: 'Cualquier secuencia valida: 일어나서, 가서, 만나서, 먹어서, etc.',
          },
          {
            scene: 'Una razon personal',
            prompt: 'Explica por que hiciste algo hoy usando un adjetivo + -아서/-어서.',
            answer: '피곤해서 일찍 잤어요.',
            accepted: ['해서', '아서', '어서'],
            explain: 'Adjetivo causa: 피곤해서, 바빠서, 좋아서, etc. + resultado.',
          },
          {
            scene: 'Viaje o desplazamiento',
            prompt: 'Di adonde fuiste hoy y que hiciste despues de llegar (가서/와서).',
            answer: '도서관에 가서 공부했어요.',
            accepted: ['가서', '와서', '가서 공부'],
            explain: 'Verbos de movimiento + secuencia: 가서, 와서, 나가서, 들어가서.',
          },
        ],
      },
    ],
  },
}

export default topic
