import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'razon-gittaemune-a2',
  order: '05',
  color: '#c60c30',
  category: 'Conectores',
  level: 'A2',
  title: '-기 때문에 Coreano A2 — Razon formal en coreano',
  shortTitle: '-기 때문에',
  metaTitle: 'Coreano A2 — -기 때문에 expresar causa formal',
  description:
    '-기 때문에 es la forma formal y neutra de expresar razon en coreano. Equivale a "porque" o "debido a". A diferencia de -(아/어)서, si puede preceder a mandatos y se usa mucho en escritura formal, presentaciones y explicaciones.',
  lead: 'Raiz + -기 때문에: 비가 오기 때문에 우산을 가져가세요 (Porque va a llover, lleva un paraguas). 바쁘기 때문에 못 갔어요 (Porque estaba ocupado, no pude ir).',
  outcomes: [
    'Usar -기 때문에 para expresar razones formales y escritas',
    'Comparar -기 때문에 con -(아/어)서 y -(으)니까',
    'Aplicar -기 때문에 antes de mandatos y declaraciones',
    'Construir explicaciones elaboradas con sustantivos + 때문에',
  ],

  guide: {
    goal: 'Expresar razon o causa de forma neutral o formal con -기 때문에 en contextos orales y escritos.',
    model: '날씨가 춥기 때문에 외투를 입어요 (Porque hace frio, me pongo abrigo) | 한국어를 좋아하기 때문에 공부해요 (Porque me gusta el coreano, lo estudio)',
    formula: 'Raiz verbal/adjetival + -기 때문에 | Sustantivo + 때문에 (sin -기)',
    decisions: [
      'Con verbos y adjetivos: raiz + -기 때문에 (misma forma para todos los verbos sin distincion vocal)',
      'Con sustantivos: sustantivo + 때문에 directamente: 일 때문에 (por el trabajo), 비 때문에 (por la lluvia)',
      'A diferencia de -(아/어)서, -기 때문에 SI puede preceder a mandatos: 위험하기 때문에 가지 마세요',
      'Es mas formal y explicativo que -(으)니까 o -(아/어)서',
      'En habla coloquial se prefiere -(아/어)서 o -(으)니까; -기 때문에 es mas propio de escritura o explicaciones largas',
    ],
    table: [
      ['Raiz', 'Tipo', '-기 때문에'],
      ['바쁘다 (estar ocupado)', 'Adjetivo', '바쁘기 때문에'],
      ['먹다 (comer)', 'Verbo', '먹기 때문에'],
      ['비가 오다 (llover)', 'Verbo compuesto', '비가 오기 때문에'],
      ['일 (trabajo)', 'Sustantivo', '일 때문에 (sin -기)'],
      ['좋아하다 (gustar)', 'Verbo', '좋아하기 때문에'],
    ],
    mistakes: [
      '"바쁘아기 때문에" — no se añade vocal de armonia: siempre raiz + -기 때문에',
      '"일이기 때문에" — con sustantivos no se usa -기: 일 때문에 directamente',
      '"먹기 때문에서" — no se combina con -서: solo -기 때문에',
    ],
  },

  seo: [
    {
      heading: '¿Cuando usar -기 때문에 y cuando -(아/어)서?',
      paragraphs: [
        '-기 때문에 y -(아/어)서 ambos expresan causa, pero con matices diferentes. -기 때문에 es mas formal, neutro y puede usarse en cualquier contexto, incluyendo antes de mandatos. -(아/어)서 es mas coloquial y no puede preceder a mandatos.',
        'Por ejemplo, en un texto escrito o una presentacion usarias -기 때문에: 환경 문제가 심각하기 때문에 우리는 노력해야 합니다 (Porque los problemas medioambientales son graves, debemos esforzarnos). En conversacion cotidiana usarias -(아/어)서 o -(으)니까.',
      ],
    },
    {
      heading: '¿Cómo se usa 때문에 con sustantivos en coreano?',
      paragraphs: [
        'Cuando la causa es un sustantivo (no un verbo ni adjetivo), se usa 때문에 directamente sin -기: 비 때문에 못 갔어요 (Por la lluvia no pude ir). 일 때문에 바빠요 (Estoy ocupado por el trabajo).',
        'Este uso es muy frecuente y practico. Tambien se puede hacer negativo: 돈이 없기 때문에 (porque no tengo dinero) vs 돈 때문에 (por el dinero).',
      ],
      table: [
        ['Estructura', 'Ejemplo', 'Traduccion'],
        ['Verbo + -기 때문에', '피곤하기 때문에 쉬어요', 'Porque estoy cansado, descanso'],
        ['Sustantivo + 때문에', '피곤함 때문에 쉬어요', 'Por el cansancio, descanso'],
        ['Negacion + -기 때문에', '돈이 없기 때문에 못 가요', 'Porque no tengo dinero, no puedo ir'],
      ],
    },
    {
      heading: '¿Cómo se comparan los conectores de causa en coreano?',
      paragraphs: [
        'Coreano tiene tres conectores de causa principales en A2: -(아/어)서 (secuencial/coloquial), -(으)니까 (subjetivo/mandato), -기 때문에 (formal/neutro). Dominar los tres te permitira expresarte en cualquier registro.',
        'Regla practica: si no sabes cual usar, -기 때문에 casi nunca es incorrecto. Es la opcion mas segura y clara.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: '-기 때문에: raiz + -기 때문에 (verbos/adj). Sustantivo + 때문에 (sin -기). Formal y neutro.',
    graphicPrompt: 'Bloque formal de causa (raiz-기 때문에) conectando con flecha a resultado.',
    scene: [
      ['바쁘기 때문에 못 갔어요', 'Porque estaba ocupado, no pude ir'],
      ['날씨가 춥기 때문에 외투를 입어요', 'Porque hace frio, me pongo abrigo'],
      ['일 때문에 바빠요', 'Estoy ocupado por el trabajo (sustantivo)'],
      ['한국어를 좋아하기 때문에 공부해요', 'Porque me gusta el coreano, lo estudio'],
      ['비가 오기 때문에 우산을 가져가세요', 'Porque llueve, lleva un paraguas (con mandato)'],
      ['돈이 없기 때문에 못 샀어요', 'Porque no tenia dinero, no pude comprarlo'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-기 때문에 vs -(아/어)서', 'sustantivo + 때문에', 'con mandatos'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento de -기 때문에',
        tag: 'Opcion multiple',
        intro: 'Elige la forma correcta con -기 때문에 para cada situacion.',
        type: 'choice',
        items: [
          {
            scene: 'Explicacion formal',
            lines: [['Diego', '오늘 수업을 쉽니다. 제가 아프___ 때문에. (Hoy no hay clase. Porque estoy enfermo.)']],
            options: ['기', '아기', '어기', '이기'],
            answer: '기',
            explain: '아프다 → raiz 아프 + -기 때문에. Sin vocal de armonia en -기.',
          },
          {
            scene: 'Causa de la ausencia',
            lines: [['Elena', '학생이 결석했어요. 일___ 때문이에요. (La estudiante falto. Es por el trabajo.)']],
            options: ['이', '기', '아기', '어기'],
            answer: '이',
            explain: '일 es sustantivo → 일 + 이에요 → 일 때문이에요. O solo: 일 때문에.',
          },
          {
            scene: 'Presentacion escolar',
            lines: [['Carlos', '환경이 중요하___ 때문에 쓰레기를 줄여야 해요. (Porque el medioambiente es importante, debemos reducir la basura.)']],
            options: ['기', '아기', '어기', '으기'],
            answer: '기',
            explain: '중요하다 → raiz 중요하 + -기 때문에. Siempre solo -기.',
          },
          {
            scene: 'Razon de llegada tarde',
            lines: [['Ana', '차가 막히___ 때문에 늦었어요. (Porque habia trafico, llegue tarde.)']],
            options: ['기', '아기', '어기', '으기'],
            answer: '기',
            explain: '막히다 → raiz 막히 + -기 때문에.',
          },
          {
            scene: 'Con mandato',
            lines: [['Elena', '위험하___ 때문에 조심하세요. (Porque es peligroso, tenga cuidado.)']],
            options: ['기', '아기', '어기', '이기'],
            answer: '기',
            explain: '위험하다 → 위험하기 때문에. Con mandato es posible con -기 때문에.',
          },
          {
            scene: 'Causa del estudio',
            lines: [['Lina', '한국에 살___ 때문에 한국어를 공부해요. (Porque vivo en Corea, estudio coreano.)']],
            options: ['기', '아기', '어기', '이기'],
            answer: '기',
            explain: '살다 → raiz 살 + -기 때문에. Nota: ㄹ final, pero -기 no cambia.',
          },
          {
            scene: 'Calor extremo',
            lines: [['Marco', '날씨가 너무 덥___ 때문에 에어컨을 켰어요. (Porque hace mucho calor, encendi el aire acondicionado.)']],
            options: ['기', '아기', '어기', '우기'],
            answer: '기',
            explain: '덥다 → irregular ㅂ→우: 더워 + -기 않 — PERO con -기 la raiz no cambia: 덥기 때문에.',
          },
          {
            scene: 'Sustantivo',
            lines: [['Sofia', '비___ 때문에 소풍을 취소했어요. (Por la lluvia, cancelamos el picnic.)']],
            options: ['', '기', '가', '이'],
            answer: '',
            explain: '비 (lluvia) es sustantivo → 비 + 때문에. Sin -기 ni otro elemento.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Dialogos con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los dialogos con -기 때문에 o sustantivo + 때문에.',
        type: 'dual',
        items: [
          {
            scene: 'Reunion de trabajo',
            lines: [
 ['Carlos', '왜 회의에 안 왔어요? (¿Por que no viniste a la reunion?)'],
 ['Marco', '아이가 [[0]] (아프다) 때문에 집에 있어야 했어요. 정말 [[1]] (미안하다). (Porque mi hijo estaba enfermo, tuve que quedarme en casa. Lo siento mucho.)'],
 ],
            blanks: [
              { options: ['아프기', '아파기', '아프아기', '아프어기'], answer: '아프기', explain: '아프다 → 아프기 때문에. Con -기 la raiz no cambia por armonia vocal.' },
              { options: ['미안해요', '미안기 때문에', '미안합니다', '미안해서요'], answer: '미안해요', explain: 'Expresion de disculpa: 미안하다 → 미안해요.' },
            ],
          },
          {
            scene: 'Explicacion al profesor',
            lines: [
 ['Elena', '왜 숙제를 못 했어요? (¿Por que no pudiste hacer la tarea?)'],
 ['Ana', '일[[0]] 때문에 시간이 없었어요. 오늘은 꼭 (하다). (Por el trabajo no tuve tiempo. Hoy seguro la hago.)'],
 ],
            blanks: [
              { options: ['', '기', '이', '가'], answer: '', explain: '일 es sustantivo → directamente 일 때문에.' },
              { options: ['할게요', '해서요', '하기 때문에', '하아요'], answer: '할게요', explain: 'Promesa: 하다 → 할게요.' },
            ],
          },
          {
            scene: 'Aviso de clase',
            lines: [
 ['Diego', '이번 주 수요일 수업은 어떻게 돼요? (¿Como queda la clase del miercoles esta semana?)'],
 ['Elena', '선생님이 출장[[0]] 때문에 수업이 (없다). (Porque el profesor tiene un viaje de trabajo, no hay clase.)'],
 ],
            blanks: [
              { options: ['이', '기', '가', '을'], answer: '이', explain: '출장 es sustantivo → 출장 때문에. El 이에요 es parte de la oracion: "출장 때문이에요" o "출장 때문에".' },
              { options: ['없을 거예요', '없기 때문에', '없어서', '없이요'], answer: '없을 거예요', explain: '없다 → 없을 거예요 (no habra clase).' },
            ],
          },
          {
            scene: 'Consejo de salud',
            lines: [
 ['Lina', '왜 매일 운동해요? (¿Por que haces ejercicio todos los dias?)'],
 ['Marco', '건강이 중요하 때문에 운동해요. 그리고 스트레스[[0]] 에도 도움이 돼요. (Porque la salud es importante, hago ejercicio. Tambien ayuda con el estres.)'],
 ],
            blanks: [
              { options: ['기', '아기', '어기', '이기'], answer: '기', explain: '중요하다 → 중요하기 때문에.' },
              { options: ['때문', '기 때문에', '이어서', '가'], answer: '때문', explain: 'Sustantivo 스트레스 + 때문에 → 스트레스 때문에도.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con -기 때문에 o sustantivo + 때문에.',
        type: 'guidedText',
        scene: 'Carta formal de Elena a los padres de los estudiantes',
        text: '안녕하세요. 이번 주 금요일은 학교 행사[[0]] 때문에 수업이 없습니다. 날씨가 좋[[1]] 때문에 야외 활동을 할 예정입니다. 학생들이 열심히 공부하[[2]] 때문에 선생님들이 기쁩니다. 준비물은 운동화와 물병입니다. 비용[[3]] 때문에 걱정하지 마세요 — 무료입니다. 더 궁금한 점이 있으[[4]] 때문에 연락하지 마시고 이메일을 보내 주세요.',
        blanks: [
          { options: ['', '기', '이', '가'], answer: '', explain: '학교 행사 es sustantivo → 행사 때문에 (sin -기).' },
          { options: ['기', '아기', '어기', '이기'], answer: '기', explain: '좋다 → 좋기 때문에. Sin cambio de vocal.' },
          { options: ['기', '아기', '어기', '해기'], answer: '기', explain: '공부하다 → 공부하기 때문에.' },
          { options: ['', '기', '이', '에'], answer: '', explain: '비용 es sustantivo → 비용 때문에 (sin -기).' },
          { options: ['으시면', '기 때문에', '으셔서', '으시기'], answer: '으시면', explain: 'Ultimo espacio: contexto diferente — 궁금한 점이 있으시면 (si tiene preguntas, use -(으)면).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta para completar las razones.',
        type: 'freeText',
        scene: 'Explicaciones escolares de un estudiante',
        text: '한국어를 배우[[0]] 때문에 시간이 많이 걸려요. (배우다) / 오늘 날씨가 나쁘[[1]] 때문에 소풍을 안 가요. (나쁘다) / 숙제가 많[[2]] 때문에 놀 수 없어요. (많다) / 선생님[[3]] 때문에 열심히 공부해요. (sustantivo) / 몸이 좋지 않[[4]] 때문에 병원에 갔어요. (좋지 않다)',
        blanks: [
          { answer: '배우기', explain: '배우다 → 배우기 때문에.' },
          { answer: '나쁘기', explain: '나쁘다 → 나쁘기 때문에.' },
          { answer: '많기', explain: '많다 → 많기 때문에.' },
          { answer: '', explain: '선생님 es sustantivo → 선생님 때문에 (sin -기).' },
          { answer: '좋지 않기', explain: '좋지 않다 → 좋지 않기 때문에.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produccion guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas usando -기 때문에.',
        type: 'write',
        items: [
          {
            scene: 'Razon de estudio',
            prompt: 'Di "Porque quiero ir a Corea, estudio coreano" (한국에 가고 싶다, 한국어를 공부하다).',
            answer: '한국에 가고 싶기 때문에 한국어를 공부해요.',
            accepted: ['가고 싶기 때문에', '한국어를 공부해요'],
            explain: '가고 싶다 → 가고 싶기 때문에. El deseo + razon.',
          },
          {
            scene: 'Aviso oficial',
            prompt: 'Di "Porque es peligroso, por favor no entre" (위험하다, 들어가다, 마세요).',
            answer: '위험하기 때문에 들어가지 마세요.',
            accepted: ['위험하기 때문에', '들어가지 마세요'],
            explain: '-기 때문에 puede preceder a mandatos negativos: -지 마세요.',
          },
          {
            scene: 'Justificacion de tarea',
            prompt: 'Di "Porque no tenia tiempo, no pude hacer la tarea" (시간이 없다, 숙제를 못 하다).',
            answer: '시간이 없기 때문에 숙제를 못 했어요.',
            accepted: ['없기 때문에', '못 했어요', '숙제'],
            explain: '없다 → 없기 때문에. Resultado negativo: 못 했어요.',
          },
          {
            scene: 'Causa con sustantivo',
            prompt: 'Di "Por el trabajo estoy ocupado" (일, 바쁘다).',
            answer: '일 때문에 바빠요.',
            accepted: ['일 때문에', '바빠요'],
            explain: '일 es sustantivo → 일 때문에 directamente.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Escritura libre',
        intro: 'Escribe tres oraciones explicando razones reales de tu vida con -기 때문에.',
        type: 'write',
        items: [
          {
            scene: 'Razon de aprendizaje',
            prompt: 'Explica por que estudias coreano usando -기 때문에.',
            answer: '한국 문화를 좋아하기 때문에 한국어를 공부해요.',
            accepted: ['때문에', '-기 때문에'],
            explain: 'Usa un verbo o adjetivo + -기 때문에 para explicar tu motivacion real.',
          },
          {
            scene: 'Razon de una decision',
            prompt: 'Explica una decision reciente usando -기 때문에 (ej: comer sano, dormir mas, etc.).',
            answer: '건강이 중요하기 때문에 운동을 시작했어요.',
            accepted: ['때문에'],
            explain: 'Estructura: razon -기 때문에 + decision/accion.',
          },
          {
            scene: 'Causa con sustantivo',
            prompt: 'Usa un sustantivo + 때문에 para explicar algo (ej: el frio, el trabajo, la lluvia, etc.).',
            answer: '날씨 때문에 오늘 집에 있을 거예요.',
            accepted: ['때문에'],
            explain: 'Sustantivo + 때문에: 날씨 때문에, 일 때문에, 공부 때문에, etc.',
          },
        ],
      },
    ],
  },
}

export default topic
