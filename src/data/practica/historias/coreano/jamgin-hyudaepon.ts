// ─── 잠긴 휴대폰 — Historia B1 en coreano ──────────────────────────────────────
// Adaptación de «The Locked Phone» al coreano. Nivel B1, no B1–B2: el coreano
// del sitio llega hasta B1, así que las frases son más cortas y el léxico más
// controlado que en las versiones europeas. La estructura y el diseño de las
// preguntas son los mismos.
//
// DICCIONARIO Y PARTÍCULAS: el motor limpia la puntuación y busca la palabra tal
// cual aparece, con su partícula pegada (「휴대폰을」, no 「휴대폰」). Por eso las
// claves de abajo llevan la forma exacta que sale en el texto. Si cambias una
// frase, revisa que su clave siga existiendo aquí.
//
// AUDIO: /audio/historias/coreano/jamgin-hyudaepon/{a,b}.mp3
// a con voz de mujer (지은), b con voz de hombre (민호).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  잠긴: 'bloqueado / cerrado con clave',
  휴대폰: 'celular / teléfono móvil',
  휴대폰을: 'el celular (complemento directo)',
  휴대폰이: 'el celular (sujeto)',
  화면: 'pantalla',
  화면이: 'la pantalla (sujeto)',
  화면을: 'la pantalla (complemento)',
  알림: 'notificación',
  알림이: 'la notificación (sujeto)',
  메시지: 'mensaje',
  메시지를: 'el mensaje (complemento)',
  켜졌다: 'se encendió',
  켜지면: 'cuando se enciende',
  뒤집었다: 'lo dio la vuelta / lo puso boca abajo',
  뒤집어: 'volteando / poniendo boca abajo',
  엎어: 'boca abajo',
  식탁: 'mesa del comedor',
  식탁에: 'en la mesa',
  저녁: 'cena / la tarde-noche',
  저녁을: 'la cena (complemento)',
  주방: 'cocina',
  소파: 'sofá',
  사진: 'foto',
  사진이: 'las fotos (sujeto)',
  강아지: 'perro / perrito',
  위치: 'ubicación',
  회사: 'empresa / trabajo',
  금요일: 'viernes',
  토요일: 'sábado',
  작년: 'el año pasado',
  같이: 'juntos / juntas',
  살기: 'vivir (forma nominal)',
  알아챘다: 'se dio cuenta',
  농담: 'broma',
  농담처럼: 'como si fuera broma',
  반쯤: 'a medias / medio',
  물어봤다: 'preguntó',
  거절했다: 'se negó / rechazó',
  거절: 'negativa / rechazo',
  거절도: 'la negativa también',
  보여주는: 'mostrar (que muestra)',
  건네주는: 'entregar en la mano',
  대신: 'en lugar de eso',
  대답하겠다고: 'que respondería',
  대답: 'respuesta',
  사생활: 'vida privada / privacidad',
  사생활이라고: 'que es privado',
  원칙: 'principio',
  선: 'línea / límite',
  선을: 'la línea (complemento)',
  경계: 'límite / frontera',
  믿음: 'confianza',
  믿어야: 'tener que confiar',
  의심: 'sospecha',
  의심스러운: 'sospechoso',
  죄: 'culpa / delito',
  증거: 'prueba / evidencia',
  증거가: 'la prueba (sujeto)',
  증명: 'demostración',
  숨길: 'esconder (que va a esconder)',
  숨기는: 'que esconde',
  질투: 'celos',
  상처: 'herida / dolor emocional',
  상처를: 'la herida (complemento)',
  안심: 'tranquilidad',
  방어적으로: 'a la defensiva',
  연애: 'relación de pareja',
  여자친구: 'novia',
  남자친구: 'novio',
  전남친: 'exnovio',
  솔직히: 'sinceramente / la verdad',
  진짜: 'de verdad / en serio',
  갑자기: 'de repente',
  아무도: 'nadie',
  습관: 'costumbre / hábito',
  시험: 'prueba / examen',
  시험이었다: 'era una prueba',
  통제: 'control',
  규칙: 'regla / norma',
  진실: 'verdad',
  거짓말쟁이: 'mentiroso',
  연설: 'discurso',
  사과: 'disculpa / manzana',
  사과하지: 'no disculparse',
  미쳐: 'volverse loco/a',

  // Alta frecuencia en las notas de voz: sin estas, medio texto queda sin clic.
  제가: 'yo (humilde, sujeto)',
  저는: 'yo (humilde, tema)',
  저한테: 'a mí',
  거예요: 'es que… / terminación de explicación en 해요체',
  그런데: 'pero / y entonces',
  그게: 'eso (sujeto)',
  그냥: 'sin más / simplemente',
  아무: 'ningún / nada de',
  없는: 'que no tiene',
  뭐든지: 'cualquier cosa',
  사람이: 'la persona (sujeto)',
  사람을: 'a la persona',
  말했어요: 'dije / dijo',
  힘들어요: 'es duro / cuesta',
  먹는데: 'mientras comíamos',
  했다: 'hizo / dijo',
  했어요: 'hice / hizo',
  됐다: 'se convirtió en / llegó a ser',
  받고: 'recibiendo',
  이해는: 'entender, sí (con matiz de «pero»)',
};

const NARRATOR_PARAGRAPHS = [
  '지은과 민호는 사귄 지 이 년이 됐다. 작년 봄부터 같이 살기 시작했다.',
  '금요일 저녁, 밥을 먹는데 민호의 휴대폰이 식탁 위에서 켜졌다. 민호는 아무 말 없이 휴대폰을 뒤집었다.',
  '지은은 그것을 알아챘다. 하지만 그 자리에서는 아무 말도 하지 않았다.',
  '그날 밤 늦게, 지은은 반쯤 농담처럼 휴대폰을 봐도 되냐고 물어봤다.',
  '민호는 안 된다고 했다.',
  '화를 낸 것은 아니었다. 휴대폰은 사생활이라고, 누구에게도 건네주지 않는다고 말했다.',
  '대신 어떤 질문이든 다 대답하겠다고 했다.',
  '지은은 거절도 하나의 대답이라고 말했다.',
  '그날 밤 두 사람 다 잠을 잘 못 잤고, 토요일 아침에는 각자 다른 사람에게 이 이야기를 하고 있었다.',
];

const A_PARAGRAPHS = [
  '이거 한 번은 소리 내서 말해야 될 것 같아요. 안 그러면 제가 미쳐요.',
  '민호가 휴대폰 어떻게 두는지 알잖아요. 소파에도 두고, 주방에도 두고, 화면 위로 그냥 둬요. 한 번도 문제가 된 적이 없어요.',
  '그런데 금요일에 저녁을 먹는데 휴대폰이 켜지니까 그걸 뒤집는 거예요.',
  '화면을 아래로.',
  '저를 쳐다보지도 않고요.',
  '저는 한 시간 동안 아무 일도 없는 것처럼 앉아 있었어요.',
  '그래서 좀 있다가 반쯤 농담처럼 말했어요. "휴대폰 좀 보여줘."',
  '그랬더니 "안 돼"래요.',
  '"그래, 여기" 도 아니고, "왜?" 도 아니고, 그냥 안 돼.',
  '이 년을 같이 있었는데 대답이 안 돼예요?',
  '그때부터 사생활 얘기, 원칙 얘기, 경계 얘기를 시작해요.',
  '경계요. 참 나.',
  '저는 메시지를 읽을 생각도 없었어요. 저한테 건네주는 걸 보고 싶었어요. 그게 시험이었어요.',
  '숨기는 게 없으면, 보여주는 게 왜 그렇게 힘들어요?',
  '그리고 설명을 하면 할수록 더 이상하게 들렸어요.',
  '미리 생각해 본 적이 없는 사람은 사생활에 대해서 연설을 준비하지 않아요.',
  '계속 이렇게 말했어요. "뭐든지 물어봐. 진실을 말해 줄게."',
  '좋아요. 그러니까 확인하게 안 해 주는 사람을 믿어야 되는 거예요.',
  '그런데 지금은 제가 잘못한 사람처럼 굴어요.',
  '제가 "선을 넘었대요".',
  '제가 선을 넘었대요.',
  '솔직히 그냥 줬으면 저는 열어 보지도 않았을 거예요.',
  '그 부분이 제일 힘들어요.',
];

const B_PARAGRAPHS = [
  '이걸 어떻게 말해야 제가 나쁜 사람처럼 안 보일지 모르겠어요.',
  '금요일 저녁이었어요. 밥 먹는 중에 휴대폰이 켜져서 엎어 놨어요.',
  '저는 밥 먹을 때 항상 휴대폰을 엎어 놔요. 열아홉 살 때부터 그랬어요.',
  '그게 이제 증거가 됐네요.',
  '조금 있다가 지은이가 휴대폰을 보여 달라고 했어요.',
  '그런데요, 그 휴대폰에 아무것도 없어요. 진짜 아무것도요.',
  '회사 단톡방, 어머니, 축구 결과, 강아지 사진 사십 장.',
  '그런데 그게 중요한 게 아니에요.',
  '중요한 건, 제가 거짓말쟁이가 아니라는 걸 증명하려고 휴대폰을 건네주지는 않는다는 거예요.',
  '한 번 그렇게 하면 그때부터 그게 당연한 게 되잖아요.',
  '이번 달은 휴대폰, 다음 달은 위치, 그다음은 누구랑 점심을 먹었는지.',
  '제가 말했어요. 뭐든지 물어보라고. 진짜 뭐든지. 다 대답한다고.',
  '지은이는 대답을 원한 게 아니었어요. 휴대폰을 원했어요.',
  '이해는 해요. 전에 상처를 받은 것도 알고, 전남친이 진짜 별로였던 것도 알아요.',
  '그런데 저는 그 사람이 아니에요.',
  '다른 사람이 한 일 때문에 제가 조사를 받고 있는 거예요.',
  '그리고 이제는 안 된다고 했다는 이유로 제가 의심스러운 사람이 됐어요.',
  '그 부분이 제일 받아들이기 힘들어요.',
  '안 된다고 하는 게 죄가 되면, 맞는 대답은 아예 없는 거잖아요.',
  '그날 제가 좀 더 잘 말할 수도 있었겠죠. 그럴 수도요.',
  '그래도 선이 있다는 것에 대해서는 사과하지 않을 거예요.',
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: '「휴대폰이 식탁 위에서 켜졌다」는 무슨 뜻입니까?',
    opts: [
      '휴대폰에 불이 붙었다',
      '알림이 와서 화면이 저절로 켜졌다',
      '민호가 휴대폰을 들고 잠금을 풀었다',
      '그날 휴대폰 밝기가 아주 높았다',
    ],
    correct: 1,
    explanation:
      '「켜지다」 es intransitivo: la pantalla se enciende sola, normalmente porque acaba de llegar una notificación. Ese es el detonante de toda la historia. Compáralo con 「켜다」 (encender algo), que es lo que haría 민호 al desbloquear el celular con la mano.',
  },
  {
    type: 'Inferencia',
    q: '지은은 「반쯤 농담처럼」 물어봤습니다. 이 표현은 무엇을 보여 줍니까?',
    opts: [
      '휴대폰 내용에는 관심이 없어서 지나가는 말로 한 것이다',
      '민호에게 상처를 주려고 일부러 놀리는 말을 한 것이다',
      '부탁은 농담으로 포장됐지만 뒤에 진짜 의도가 있었다',
      '지은은 그 주에 이미 휴대폰을 봐서 다시 확인한 것이다',
    ],
    correct: 2,
    explanation:
      '「반쯤 농담처럼」 deja a los dos margen para leer el momento de forma distinta: ella puede decir que solo bromeaba; él puede oír una acusación seria. Esa ambigüedad es donde empieza la pelea.',
  },
  {
    type: 'Comprensión',
    q: '민호는 휴대폰을 주는 대신에 무엇을 하겠다고 했습니까?',
    opts: [
      '지은 앞에서 메시지를 지우겠다고 했다',
      '어떤 질문이든 다 대답하겠다고 했다',
      '사진만 보여 주겠다고 했다',
      '다음 날 휴대폰을 주겠다고 했다',
    ],
    correct: 1,
    explanation:
      'El narrador dice: 「어떤 질문이든 다 대답하겠다고 했다」. Minho separa dos cosas que Jieun trata como una sola: dar información y dar acceso.',
  },
  {
    type: 'Pensamiento crítico',
    q: '「거절도 하나의 대답이다」라는 말 뒤에는 어떤 전제가 있습니까?',
    opts: [
      '거절하는 사람은 대개 피곤하거나 바빠서 그런 것이니 별다른 뜻이 없다',
      '결백한 사람이라면 보여 줬을 것이다 — 그러니까 거절 자체가 증거다',
      '민호가 전에 휴대폰을 언제든 보여 주겠다고 약속한 적이 있다',
      '한국어에서 거절은 언제나 무례한 행동이라서 문제가 된 것이다',
    ],
    correct: 1,
    explanation:
      'Jieun trata la negativa como prueba. La suposición escondida —«el inocente acepta»— deja a Minho sin ninguna forma posible de demostrar su inocencia, que es justo lo que él denuncia después.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Comprensión',
    q: '지은의 말에 따르면, 휴대폰을 보여 달라고 했을 때 진짜 원한 것은 무엇이었습니까?',
    opts: [
      '이 년 동안 주고받은 메시지를 처음부터 다 읽어 보는 것',
      '저녁 식사 때 온 그 알림이 누구한테서 온 건지 정확히 확인하는 것',
      '민호가 스스로 건네주는 모습을 보는 것 — 그 부탁은 시험이었다',
      '휴대폰에 남은 위치 기록까지 하나하나 확인하는 것',
    ],
    correct: 2,
    explanation:
      'Lo dice sin rodeos: 「저한테 건네주는 걸 보고 싶었어요. 그게 시험이었어요.」 Para ella contaba el gesto, no el contenido.',
  },
  {
    type: 'Inferencia',
    q: '「숨기는 게 없으면 왜 그렇게 힘들어요?」 이 질문의 문제는 무엇입니까?',
    opts: [
      '문법이 틀려서 민호가 질문을 제대로 이해하지 못했다',
      '거절을 곧 죄로 보기 때문에, 민호가 어떤 대답을 해도 벗어날 수 없다',
      '지은이 휴대폰 안에 뭐가 있는지 이미 알고 묻는다는 뜻이 되어 버린다',
      '지은이 연애 자체에 지쳐서 헤어질 핑계를 찾고 있다는 뜻이다',
    ],
    correct: 1,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. La lógica está cerrada — aceptar parece prueba, negarse parece culpa. Minho nombra la misma trampa desde su lado.',
  },
  {
    type: 'Tono',
    q: '지은의 음성 메시지의 어조를 가장 잘 설명한 것은 무엇입니까?',
    opts: [
      '상황을 차분하게 정리하면서 분석적으로 설명한다',
      '감정을 드러내지 않고 격식 있게 사무적으로 말한다',
      '화가 나 있고 비꼬지만, 그 바탕에는 불안과 상처가 있다',
      '농담을 섞어 가며 처음부터 끝까지 가볍고 유쾌하게 이야기한다',
    ],
    correct: 2,
    explanation:
      'El sarcasmo es real (「경계요. 참 나.」), pero mira el marco: abre con 「안 그러면 제가 미쳐요」 y cierra con 「그 부분이 제일 힘들어요」. La rabia está montada encima del dolor.',
  },
  {
    type: 'Vocabulario',
    q: '「경계요. 참 나.」에서 지은은 무엇을 하고 있습니까?',
    opts: [
      '연애에서도 경계가 중요하다는 민호의 말에 정중하게 동의하고 있다',
      '민호가 쓴 단어를 그대로 되돌려 주며 핑계로 치부하고 있다',
      '그 단어가 정확히 무슨 뜻인지 설명해 달라고 하고 있다',
      '상담 선생님한테 들은 표현을 그대로 인용하고 있다',
    ],
    correct: 1,
    explanation:
      'Repetir la palabra del otro suelta y añadir 「참 나」 es un recurso sarcástico habitual en coreano hablado: rechaza la palabra misma por falsa o pretenciosa.',
  },
  {
    type: 'Registro',
    q: '지은은 「제가 "선을 넘었대요"」라고 말합니다. 왜 따옴표를 씁니까?',
    opts: [
      '법률 문서에 나오는 표현이라서 원문에 있는 말을 그대로 옮겨 적은 것이다',
      '민호의 말을 인용해 거리를 두고, 그 비난을 받아들이지 않는다는 신호를 보낸다',
      '한국어에서는 남의 말을 옮길 때 이런 표현에는 언제나 따옴표를 붙여야 한다',
      '그 말을 자기 말로 어떻게 바꿔야 할지 몰라서 그대로 옮겼다',
    ],
    correct: 1,
    explanation:
      'Son comillas de distancia. El 「-대요」 marca que la frase es de otro, y al repetirla luego en seco —「제가 선을 넘었대요.」— deja claro que la acusación es de él, no suya, y que le parece absurda.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Comprensión',
    q: '민호는 거절한 이유로 무엇을 듭니까?',
    opts: [
      '지은이 보면 안 되는 메시지가 있어서 그것부터 먼저 지울 시간이 필요했기 때문이다',
      '회사에서 준 휴대폰이라 다른 사람에게는 보여 줄 수 없게 되어 있다',
      '숨기는 게 있어서가 아니라, 한 번 보여 주면 확인이 당연한 일이 되기 때문이다',
      '비밀번호를 잊어버려서 그 자리에서는 잠금을 풀 수 없었다',
    ],
    correct: 2,
    explanation:
      'Insiste en que el contenido es irrelevante (「아무것도 없어요」) y construye su negativa alrededor de lo que el acto establecería hacia adelante, no de lo que revelaría.',
  },
  {
    type: 'Vocabulario',
    q: '「이번 달은 휴대폰, 다음 달은 위치…」 이것은 어떤 논증 방식입니까?',
    opts: [
      '미끄러운 비탈길 — 작은 양보 하나가 연쇄의 시작으로 제시된다',
      '지은이 실제로 요구한 말을 그대로 옮겨 적은 것이다',
      '저녁 식사 때 휴대폰을 뒤집은 행동을 뒤늦게 사과하는 말이다',
      '두 사람 사이에 이미 일어난 일을 사실대로 하나하나 정리한 설명이다',
    ],
    correct: 0,
    explanation:
      'La pendiente resbaladiza predice una reacción en cadena a partir de un primer paso. Convence — pero fíjate en que describe un futuro que él imagina, no hechos ocurridos.',
  },
  {
    type: 'Inferencia',
    q: '「다른 사람이 한 일 때문에 제가 조사를 받고 있어요.」 이 문장은 무엇을 보여 줍니까?',
    opts: [
      '민호가 실제로 경찰 조사를 받고 있어서 휴대폰을 줄 수 없다는 뜻이다',
      '민호는 지은의 전남친이 한 행동의 대가를 자기가 치른다고 느낀다',
      '민호도 지은의 전남친과 똑같은 일을 저질렀다고 인정하는 말이다',
      '민호는 지은이 전남친에게 직접 연락해서 확인해 보기를 바란다',
    ],
    correct: 1,
    explanation:
      'La metáfora judicial (「조사」, 「의심」, 「증거」) recorre todo su relato. Se retrata como acusado injustamente: pagando por una historia que no es la suya.',
  },
  {
    type: 'Pensamiento crítico',
    q: '「안 된다고 하는 게 죄가 되면, 맞는 대답은 아예 없다」는 무엇을 지적합니까?',
    opts: [
      '지은이 뭐든지 물어보라는 말은 듣지도 않고 결국 휴대폰을 봐야만 믿겠다고 했다는 것',
      '그 부탁은 정직하게 통과할 방법이 없다는 것 — 어떤 반응이든 의심을 확인해 준다',
      '이제는 헤어지는 것 말고는 방법이 없다고 생각한다는 것',
      '지은이 무엇을 왜 묻는지 민호가 끝까지 이해하지 못했다는 것',
    ],
    correct: 1,
    explanation:
      'Está señalando una sospecha infalsable: ninguna prueba podría refutarla. Es el espejo exacto de la pregunta retórica de Jieun — la misma lógica, vista desde el otro lado.',
  },
  {
    type: 'Tono',
    q: '「좀 더 잘 말할 수도 있었겠죠. 그럴 수도요.」 반복되는 「-수도」는 무엇을 전달합니까?',
    opts: [
      '자기 잘못을 온전히 인정하고 책임을 지겠다는 뜻이다',
      '그날 무슨 일이 있었는지 아직도 모르겠다는 혼란스러운 마음이다',
      '작은 인정을 했다가 바로 거두어들인다 — 사과의 모양만 갖춘 문장',
      '진심으로 후회하면서 앞으로는 다르게 말하겠다는 다짐이다',
    ],
    correct: 2,
    explanation:
      'El primer 「-수도 있었겠죠」 abre una puerta; el segundo la cierra. Concede la forma, nunca la decisión — y la frase siguiente (「사과하지 않을 거예요」) lo confirma.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: '두 사람의 이야기가 모두 확인해 주는 사실은 무엇입니까?',
    opts: [
      '민호가 다른 여자에게서 온 메시지를 저녁에 받았다',
      '지은이 민호의 대화 내용을 일부 이미 읽어 봤다',
      '민호가 저녁 식사 중에 휴대폰을 엎어 놓았다',
      '민호가 다음 날 아침에 먼저 사과하고 화해했다',
    ],
    correct: 2,
    explanation:
      'El celular boca abajo es el único hecho objetivo que cuentan los dos. Su significado está en disputa total: para ella es una reacción, para él una costumbre que tiene desde los diecinueve.',
  },
  {
    type: 'Perspectiva',
    q: '지은은 그 부탁을 「시험」이라고 하고, 민호는 「조사」라고 합니다. 이 차이는 무엇을 보여 줍니까?',
    opts: [
      '둘 중 하나가 그날 밤 있던 일을 분명히 알면서도 일부러 다르게 말하고 있다',
      '같은 행동이라도 각자가 그것을 무엇의 상징으로 보느냐에 따라 정반대의 뜻이 된다',
      '둘 다 그날 밤에 오간 말을 제대로 기억하지 못해서 다르게 말한다',
      '민호가 지은보다 어려운 단어를 골라 쓰면서 자기 입장을 포장한다',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. Ella buscaba un gesto pequeño de tranquilidad; él vivió una acusación que exigía pruebas. Ninguno inventa la noche: describen experiencias distintas de la misma noche.',
  },
  {
    type: 'Pensamiento crítico',
    q: '이 갈등의 가장 근본적인 원인은 무엇입니까?',
    opts: [
      '민호가 휴대폰 안에 지은에게 보여 줄 수 없는 것을 숨기고 있다',
      '지은이 원래 질투가 많아서 별일 아닌 일을 크게 만들었다',
      '두 사람 사이에서 사생활이 무엇인지 한 번도 정한 적이 없었다',
      '지은에게 상처를 준 전남친이 아직도 영향을 주고 있다',
    ],
    correct: 2,
    explanation:
      '¿Compartir el celular es normal en esta pareja o no? Nadie lo había decidido nunca. La regla se inventó en mitad de la discusión, y por eso los dos sienten que el otro la rompió.',
  },
  {
    type: 'Registro',
    q: '지은은 민호가 자기에게 「선을 넘었다」고 했다 하고, 민호는 「선이 있다는 것」에 사과하지 않겠다고 합니다. 같은 「선」이라는 표현은 무엇을 보여 줍니까?',
    opts: [
      '두 사람이 같은 영화에서 본 대사를 각자 그대로 인용하고 있다',
      '같은 「선」의 이미지로 정반대의 입장을 지킨다 — 각자 자기가 선을 지키는 사람이라고 믿는다',
      '두 사람이 쓰는 「선」은 뜻이 완전히 달라서 서로 아무 상관이 없는 말이다',
      '민호가 지은이 먼저 쓴 「선」이라는 말을 그대로 따라 써서 자기 뜻만 바꾸고 있다는 증거다',
    ],
    correct: 1,
    explanation:
      'La misma imagen —una línea que no se cruza— hace trabajos opuestos en cada relato. En la mayoría de los conflictos de pareja, los dos creen estar defendiendo un límite, no atacándolo.',
  },
  {
    type: 'Inferencia',
    q: '「그냥 줬으면 저는 열어 보지도 않았을 거예요.」 이 문장은 무엇을 드러냅니까?',
    opts: [
      '지은은 처음부터 휴대폰을 볼 생각이 없었으면서 보여 달라고 했으니, 그 부탁 자체가 민호를 떠보려고 꾸며 낸 거짓말이었다는 뜻이다',
      '지은이 원한 것은 정보가 아니라 안심이었다 — 그런데 그 안심을 줄 수 있는 것은 민호가 원칙 때문에 거절한 바로 그 행동이었다',
      '지은은 예전에 민호가 자는 사이에 이미 휴대폰을 열어 본 적이 있어서, 이번에는 굳이 열어 볼 필요가 없었다',
      '지은은 민호의 비밀번호를 몰라서 휴대폰을 건네받아도 어차피 열어 보지 못했을 것이다',
    ],
    correct: 1,
    explanation:
      'Aquí está la trampa central de la historia. Ella necesitaba un gesto; él solo podía ver un precedente. No había ninguna versión de esa noche en la que los dos consiguieran lo que necesitaban.',
  },
];

const KEY_LANGUAGE = [
  { phrase: '켜지다 / 켜다', meaning: 'encenderse solo (la pantalla) frente a encender algo — la diferencia importa aquí' },
  { phrase: '엎어 놓다', meaning: 'dejar algo boca abajo — acto literal, significado simbólico' },
  { phrase: '반쯤 농담처럼', meaning: 'medio en broma: deja abiertas dos lecturas del mismo acto' },
  { phrase: '-대요', meaning: 'cita lo que dijo otro; usado así, marca distancia y rechazo' },
  { phrase: '-ㄹ 수도 있었겠죠', meaning: 'concesión mínima que se retira enseguida: no-disculpa' },
  { phrase: '참 나', meaning: 'expresión de fastidio e incredulidad — el sarcasmo en una sílaba y media' },
];

export const jamginHyudaepon: Historia = {
  slug: 'jamgin-hyudaepon',
  lang: 'coreano',
  icon: '📵',
  color: '#be185d',
  level: 'B1',
  title: '잠긴 휴대폰',
  tagline: 'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes.',
  metaTitle: '잠긴 휴대폰 — comprensión en coreano B1',
  metaDescription:
    
    
    'Ella pidió ver el celular. Él dijo que no. Dos versiones del mismo viernes. Dos audios, transcripción y 19 preguntas en coreano B1.',
  intro:
    'Una pareja, un celular y dos versiones completamente distintas del mismo viernes por la noche. Lee al narrador en coreano escrito, escucha las dos notas de voz en 해요체 y responde 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'El narrador va en 서술체 (–았다/–ㄴ다), el coreano escrito de las lecturas; las dos notas de voz van en 해요체, el coreano hablado. Fíjate también en lo poco que pasó de verdad: nadie leyó ningún mensaje. Toda la discusión está hecha del significado que cada uno le da a un gesto mínimo.',
  },
  voices: [
    {
      key: 'a',
      name: '지은',
      role: '여자친구',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/coreano/jamgin-hyudaepon/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Ojo: las palabras salen con su partícula pegada, como suenan.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de 지은.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en coreano.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: '민호',
      role: '남자친구',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/coreano/jamgin-hyudaepon/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. 민호 repite un detalle que 지은 también menciona: búscalo.',
      transcriptHint: 'compara la versión de 민호 con la de 지은: ¿qué detalles cuentan los dos? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de 민호.',
      write1Hint: 'Esta es la otra cara de la historia. ¿Qué dice él que pasó? Escribe en español o en coreano.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de 민호.',
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Ahora sabes algo que ninguno de los dos sabe: has oído las dos versiones. Estas preguntas te piden ponerlas una al lado de la otra — qué detalles sobreviven en las dos, dónde tiene razón cada uno y dónde tener razón no es lo mismo que ser justo.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: '¿Negarse es lo mismo que esconder? ¿Y puede una petición ser razonable y aun así injusta?',
    note: 'No hay una única respuesta correcta. Lo que se evalúa es defender tu posición con evidencia del texto: palabras y frases concretas de cada versión. Esa es la destreza que separa un B1 sólido de un B1 de examen.',
  },
  ui: 'es',
};

export default jamginHyudaepon;
