import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'forma-formal-habnida',
  order: '20',
  color: '#c60c30',
  category: '문법',
  level: 'A1',
  title: 'La forma formal -합니다/-입니다 en coreano A1',
  shortTitle: 'Forma formal -합니다',
  metaTitle: 'Forma formal coreano A1 — 합니다, 입니다, 습니다, -ㅂ니다 en situaciones formales',
  description:
    'El coreano tiene dos niveles principales de formalidad: la forma educada informal (해요체) que ya conocemos, y la forma formal (합쇼체) usada en presentaciones, noticias, discursos y situaciones muy formales. El verbo 이다 (ser/estar) se vuelve 입니다 y los demás verbos usan -합니다 o -ㅂ니다/-습니다.',
  lead: '합니다 (hamnida) y 입니다 (imnida) son las formas más formales del coreano. Las escucharás en noticias, presentaciones y situaciones de protocolo. ¡Son más fáciles de lo que parecen!',
  outcomes: [
    'Distinguir la forma formal 합니다/입니다 de la forma educada 해요/이에요',
    'Usar 입니다 para identificarse y describirse en presentaciones formales',
    'Conjugar verbos comunes en -합니다 / -ㅂ니다 / -습니다',
  ],
  guide: {
    goal: 'Usar el estilo formal 합니다 en presentaciones y contextos profesionales.',
    model: '[raíz verbal] + -ㅂ니다 (vocal final) / -습니다 (consonante final)',
    formula: '이다 → 입니다 | 하다 → 합니다 | 가다 → 갑니다 | 먹다 → 먹습니다',
    decisions: [
      '¿El verbo termina en vocal? → raíz + ㅂ니다 (가다 → 가 + ㅂ니다 = 갑니다)',
      '¿El verbo termina en consonante? → raíz + 습니다 (먹다 → 먹 + 습니다 = 먹습니다)',
      '¿Es 하다? → 합니다 (siempre, irregular)',
      '¿Es 이다 (ser/estar)? → 입니다 para afirmación, 이 아닙니다 para negación',
      '¿Haces una pregunta formal? → cambia 다 por 까? (갑니다 → 갑니까? ¿Va?)',
    ],
    table: [
      ['Forma base', 'Informal educado (해요체)', 'Formal (합쇼체)'],
      ['가다 (ir)', '가요', '갑니다'],
      ['먹다 (comer)', '먹어요', '먹습니다'],
      ['공부하다 (estudiar)', '공부해요', '공부합니다'],
      ['이다 (ser)', '이에요/예요', '입니다'],
      ['없다 (no haber)', '없어요', '없습니다'],
    ],
    mistakes: [
      '입니다 solo se usa con sustantivos: 학생입니다 (Soy estudiante). Con verbos de acción, usa -합니다/-ㅂ니다/-습니다.',
      'La pregunta formal: ¡cambia -니다 a -니까! 갑니다 → 갑니까? No "갑니다?"',
      '"아닙니다" es la negación de 이다 en formal: 학생이 아닙니다 (No soy estudiante). No confundir con "안 합니다".',
      'En conversación cotidiana use siempre 해요체. 합니다체 suena muy rígido entre amigos.',
    ],
  },
  seo: [
    {
      heading: '¿Cuándo se usa la forma formal 합니다 en coreano?',
      paragraphs: [
        'La forma formal 합니다 (hamnida) se usa en situaciones muy específicas: presentaciones profesionales, discursos, noticias de televisión, anuncios en aeropuertos, manuales de instrucciones, y en el servicio al cliente formal. Si estudias coreano para viajes o conversación, la forma 해요 es suficiente para el 95% de las situaciones.',
        'Sin embargo, si planeas trabajar en Corea, presentarte en eventos o ver noticias, reconocer 합니다체 es esencial. Y además, muchos hablantes usan 합니다 en sus propias presentaciones: "저는 David입니다" (Yo soy David) es más impactante y formal que "저는 David예요".',
      ],
      table: [
        ['Situación', 'Forma recomendada', 'Ejemplo'],
        ['Conversación amigos', '해요체', '어디 가요? (¿Adónde vas?)'],
        ['Presentación formal', '합니다체', '저는 David입니다 (Soy David)'],
        ['Noticias/TV', '합니다체', '오늘 날씨는 맑겠습니다'],
        ['Servicio al cliente', '합니다체', '도와드리겠습니다 (Le ayudaremos)'],
      ],
    },
    {
      heading: 'Cómo memorizar la diferencia entre 입니다 y 합니다',
      paragraphs: [
        '"입니다" viene de 이다 (ser/estar) y se usa SOLO después de sustantivos. 저는 학생입니다 = Soy estudiante (학생 = sustantivo). "합니다" viene de 하다 y se adhiere a verbos: 공부합니다 = estudio (공부하다 → 합니다).',
        'Para los demás verbos: si la raíz termina en vocal, añade ㅂ니다 como consonante final (가 → 갑니다). Si termina en consonante, añade 습니다 (먹 → 먹습니다). La regla es la misma que en 해요 pero con terminación formal.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'Students need to RECOGNIZE 합니다체 more than produce it at A1. Focus on 입니다 for self-introduction (high usefulness) and on recognizing -ㅂ니다/-습니다 patterns in media and formal contexts.',
    graphicPrompt:
      'Two speech bubble columns: left "해요체 (informal)" with casual person, right "합니다체 (formal)" with person in business attire. Connecting arrows showing same meaning, different register. Korean red/blue theme.',
    scene: [
      ['입니다', '저는 학생입니다 (jeo-neun hak-ssaeng-im-ni-da) — Soy estudiante (formal)'],
      ['갑니다', '학교에 갑니다 (hak-gyo-e gam-ni-da) — Voy a la escuela (formal)'],
      ['먹습니다', '밥을 먹습니다 (ba-beul meok-sseum-ni-da) — Como arroz (formal)'],
      ['공부합니다', '한국어를 공부합니다 (gong-bu-ham-ni-da) — Estudio coreano (formal)'],
      ['아닙니다', '선생님이 아닙니다 (a-nim-ni-da) — No soy profesor (formal)'],
      ['갑니까?', '어디 갑니까? (gam-ni-kka) — ¿Adónde va? (pregunta formal)'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['가다', '먹다', '하다', '이다', '공부하다', '일하다'],
    reviewFocus: ['입니다 (이다+formal)', 'vocal+ㅂ니다 vs consonante+습니다', 'pregunta: -ㅂ니까?/-습니까?'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: '합니다체 인식',
        tag: 'Opción múltiple',
        intro: 'Identifica la forma formal correcta.',
        type: 'choice',
        items: [
          { scene: '입니다 — identificación', lines: [['', '¿Cuál es la forma formal de "저는 학생이에요"?']], options: ['저는 학생이에요', '저는 학생합니다', '저는 학생입니다', '저는 학생였어요'], answer: '저는 학생입니다', explain: '이에요/예요 (informal educado) → 입니다 (formal). 학생 + 입니다 = 학생입니다.' },
          { scene: '가다 → 갑니다', lines: [['', '¿Cuál es la forma formal de "가요" (va)?']], options: ['가합니다', '갑니다', '가습니다', '갔니다'], answer: '갑니다', explain: '가다 → raíz 가 (vocal final) + ㅂ니다 = 갑니다. Vocal final → ㅂ니다.' },
          { scene: '먹다 → 먹습니다', lines: [['', '¿Cuál es la forma formal de "먹어요" (como)?']], options: ['먹ㅂ니다', '먹합니다', '먹습니다', '먹이니다'], answer: '먹습니다', explain: '먹다 → raíz 먹 (consonante final ㄱ) + 습니다 = 먹습니다. Consonante → 습니다.' },
          { scene: '공부하다 formal', lines: [['', '¿Cómo se dice "Estudio coreano" en formal?']], options: ['한국어를 공부해요', '한국어를 공부합니다', '한국어를 공부이에요', '한국어를 공부했습니다'], answer: '한국어를 공부합니다', explain: '공부하다 → 공부합니다. Verbos 하다: siempre 합니다 en formal.' },
          { scene: 'Pregunta formal', lines: [['', '¿Cómo se hace la pregunta formal de 갑니다?']], options: ['갑니다?', '가요?', '갑니까?', '가합니까?'], answer: '갑니까?', explain: '갑니다 → 갑니까? Para preguntar en formal: cambia -니다 a -니까. Entonación ascendente.' },
          { scene: 'Negación formal', lines: [['', '"No soy estudiante" en formal:']], options: ['학생이 아니에요', '학생이 아닙니다', '학생 없습니다', '학생 안 입니다'], answer: '학생이 아닙니다', explain: '이 아닙니다 = no es/no soy (negación formal de 이다). 학생이 아닙니다.' },
          { scene: '없다 formal', lines: [['', '¿Cuál es la forma formal de "없어요" (no hay)?']], options: ['없합니다', '없이니다', '없습니다', '없ㅂ니다'], answer: '없습니다', explain: '없다 → raíz 없 (consonante final ㅅ) + 습니다 = 없습니다.' },
          { scene: 'Registro apropiado', lines: [['', '¿En qué situación usarías 합니다체?']], options: ['Hablar con amigos por KakaoTalk', 'Presentación en empresa coreana', 'Pedir comida en restaurante casual', 'Chat con compañeros de clase'], answer: 'Presentación en empresa coreana', explain: '합니다체 es para situaciones muy formales: presentaciones, noticias, discursos, protocolo empresarial.' },
        ],
      },
      {
        id: 'level-2',
        title: '해요체 → 합니다체 변환',
        tag: '2 espacios',
        intro: 'Transforma la forma educada a la forma formal.',
        type: 'dual',
        items: [
          { scene: '이에요 → 입니다', lines: [['', '"저는 콜롬비아 사람이에요" en formal: 저는 콜롬비아 [[0]] [[1]].']], blanks: [{ options: ['사람이에요', '사람입니다', '사람합니다', '사람이습니다'], answer: '사람입니다', explain: '사람 + 입니다. 이에요/예요 → 입니다 en formal.' }, { options: ['(fin)', '이에요', 'ㅂ니다', '해요'], answer: '(fin)', explain: '사람입니다 — la frase termina aquí. 입니다 ya incluye todo.' }] },
          { scene: '가요 → 갑니다', lines: [['', '"학교에 가요" en formal: 학교에 [[0]].']], blanks: [{ options: ['갑니다', '가합니다', '가습니다', '가요'], answer: '갑니다', explain: '가다 → vocal final + ㅂ니다 = 갑니다.' }, { options: ['(completa)', '요', '니다', '다'], answer: '(completa)', explain: '학교에 갑니다 — forma formal completa.' }] },
          { scene: '먹어요 → 먹습니다', lines: [['', '"점심을 먹어요" en formal: 점심을 [[0]].']], blanks: [{ options: ['먹합니다', '먹습니다', '먹이니다', '먹ㅂ니다'], answer: '먹습니다', explain: '먹다 → consonante final ㄱ + 습니다 = 먹습니다.' }, { options: ['(completa)', '요', '어요', '이에요'], answer: '(completa)', explain: '점심을 먹습니다 — forma formal completa.' }] },
          { scene: '해요 → 합니다 (하다 verbo)', lines: [['', '"일해요" en formal: [[0]].']], blanks: [{ options: ['일합니다', '일습니다', '일ㅂ니다', '일이니다'], answer: '일합니다', explain: '일하다 → 일합니다. Verbos 하다: siempre 합니다.' }, { options: ['(completa)', '이에요', '요', 'ㄴ다'], answer: '(completa)', explain: '일합니다 — forma formal de 일해요 (trabaja/trabajo).' }] },
        ],
      },
      {
        id: 'level-3',
        title: '공식적인 발표 — 안내문',
        tag: 'Opciones',
        intro: 'Elige la forma formal correcta en cada espacio.',
        type: 'guidedText',
        scene: 'Presentación formal de WeLearn en conferencia',
        text: '안녕하십니까! 저는 David [[0]]. (Soy David — formal) WeLearn은 언어 학원 [[1]]. (WeLearn es una academia de idiomas) 저희는 한국어, 영어, 스페인어를 가르칩[[2]]. (Enseñamos coreano, inglés, español) 수업은 매일 [[3]]. (Las clases son todos los días) 감사합[[4]]! (¡Gracias!)',
        blanks: [
          { options: ['이에요', '예요', '입니다', '해요'], answer: '입니다', explain: 'David + 입니다. Autoidentificación formal con 이다 → 입니다.' },
          { options: ['이에요', '입니다', '해요', '있어요'], answer: '입니다', explain: 'WeLearn은 학원 + 입니다. Descripción formal con 이다 → 입니다.' },
          { options: ['니다', '어요', '아요', '해요'], answer: '니다', explain: '가르치다 → raíz 가르치 (vocal final) + ㅂ니다 = 가르칩니다. La ㅂ ya está, añades 니다.' },
          { options: ['있어요', '있습니다', '있합니다', '있ㅂ니다'], answer: '있습니다', explain: '있다 → raíz 있 (consonante ㅅ) + 습니다 = 있습니다.' },
          { options: ['니다', '어요', '아요', '이에요'], answer: '니다', explain: '감사하다 → 감사합니다. 하다 → 합니다. La 합 ya está, completas con 니다.' },
        ],
      },
      {
        id: 'level-4',
        title: '형식체 쓰기',
        tag: 'Sin opciones',
        intro: 'Escribe la forma formal correcta sin opciones.',
        type: 'freeText',
        scene: 'Producción de formas formales',
        text: '1. "Soy David" (formal, 이다): 저는 David [[0]]. 2. "Estudio coreano" (공부하다, formal): 한국어를 [[1]]. 3. "Voy a la academia" (가다, formal): 학원에 [[2]]. 4. "Como arroz" (먹다, formal): 밥을 [[3]]. 5. "¿Habla coreano?" (말하다, pregunta formal): 한국어를 [[4]]?',
        blanks: [
          { answer: '입니다', accepted: ['입니다'], explain: 'David + 입니다 (이다 formal).' },
          { answer: '공부합니다', accepted: ['공부합니다'], explain: '공부하다 → 공부합니다 (하다 formal).' },
          { answer: '갑니다', accepted: ['갑니다'], explain: '가다 → 갑니다 (vocal final + ㅂ니다).' },
          { answer: '먹습니다', accepted: ['먹습니다'], explain: '먹다 → 먹습니다 (consonante final + 습니다).' },
          { answer: '말합니까', accepted: ['말합니까', '말하십니까'], explain: '말하다 → 말합니다 → pregunta: 말합니까? (하다 formal + pregunta -까).' },
        ],
      },
      {
        id: 'level-5',
        title: '공식 발표 쓰기',
        tag: 'Producción',
        intro: 'Construye frases formales completas.',
        type: 'write',
        items: [
          { scene: 'Presentación formal', prompt: 'Escribe en coreano formal: "Soy estudiante de WeLearn. Estudio coreano todos los días." (학생 = estudiante, 매일 = todos los días, 공부하다 = estudiar)', answer: '저는 WeLearn 학생입니다. 매일 한국어를 공부합니다.', accepted: ['학생입니다', '공부합니다'], explain: '학생입니다 (입니다 formal) + 공부합니다 (하다 formal). Lenguaje de presentación.' },
          { scene: 'Anuncio formal', prompt: 'Escribe en coreano formal: "Hoy hay clase de coreano. La clase empieza a las dos." (오늘 = hoy, 수업 = clase, 시작하다 = empezar, 두 시 = las dos)', answer: '오늘 한국어 수업이 있습니다. 수업은 두 시에 시작합니다.', accepted: ['있습니다', '시작합니다'], explain: '있다 → 있습니다 (consonante). 시작하다 → 시작합니다 (하다 formal).' },
          { scene: 'Pregunta formal', prompt: 'Escribe en coreano formal: "¿Habla coreano? ¿Estudia todos los días?" (말하다 = hablar, 공부하다 = estudiar)', answer: '한국어를 말합니까? 매일 공부합니까?', accepted: ['말합니까', '공부합니까'], explain: '말하다 → 말합니다 → pregunta: 말합니까? 공부하다 → 공부합니다 → 공부합니까?' },
          { scene: 'Negación formal', prompt: 'Escribe en coreano formal: "No soy profesor, soy estudiante." (선생님 = profesor, 학생 = estudiante)', answer: '선생님이 아닙니다. 학생입니다.', accepted: ['아닙니다', '학생입니다'], explain: '이 아닙니다 = no soy (negación formal). 학생입니다 = soy estudiante (afirmación formal).' },
        ],
      },
      {
        id: 'level-6',
        title: '공식 소개 미션',
        tag: 'Producción',
        intro: 'Practica la presentación formal en coreano.',
        type: 'write',
        items: [
          { scene: 'Presentación profesional', prompt: '자기소개를 합니다체로 써 보세요 (escribe tu presentación en forma formal). Incluye: nombre (이름), origen (나라), qué estudias (공부하다), por qué estudias coreano. Usa 입니다, 합니다, 공부합니다.', answer: '안녕하십니까! 저는 [이름]입니다. 저는 콜롬비아 사람입니다. 한국어를 공부합니다. 한국 문화를 좋아합니다. 잘 부탁드립니다!', accepted: ['입니다', '합니다'], explain: '자기소개 공식: 이름입니다 + 나라 사람입니다 + 공부합니다. 잘 부탁드립니다 = encantado/encantada (expresión formal de presentación).' },
          { scene: '해요체 vs 합니다체', prompt: '같은 내용을 두 번 써 보세요: 한 번은 해요체, 한 번은 합니다체. (Escribe lo mismo dos veces: una en 해요체 y otra en 합니다체.) "Soy Carlos, colombiano. Estudio coreano en WeLearn."', answer: '해요체: 저는 Carlos예요. 콜롬비아 사람이에요. WeLearn에서 한국어를 공부해요. | 합니다체: 저는 Carlos입니다. 콜롬비아 사람입니다. WeLearn에서 한국어를 공부합니다.', accepted: ['예요', '이에요', '해요', '입니다', '합니다'], explain: '해요체: 예요/이에요, 해요. 합니다체: 입니다, 합니다. Mismo contenido, diferente formalidad.' },
        ],
      },
    ],
  },
}

export default topic
