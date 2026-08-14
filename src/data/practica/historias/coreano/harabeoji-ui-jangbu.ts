// ─── 할아버지의 장부 — Historia B1 en coreano ──────────────────────────────────
// Adaptación de «The Grandfather's Ledger» al coreano, nivel B1. Quien reclama
// los regalos es el ABUELO (정만호) en las tres capas: narrador, transcripciones
// y preguntas.
//
// DICCIONARIO Y PARTÍCULAS: las claves llevan la forma exacta que sale en el
// texto, con partícula pegada. Si cambias una frase, revisa su clave.
//
// AUDIO: /audio/historias/coreano/harabeoji-ui-jangbu/{a,b}.mp3
// a con voz de mujer (수진), b con voz de hombre mayor (만호).

import type { Historia, StoryQuestion as Question } from '../types';

const DICT: Record<string, string> = {
  할아버지: 'abuelo',
  할아버지가: 'el abuelo (sujeto)',
  할머니: 'abuela',
  장부: 'libro de cuentas',
  장부를: 'el libro de cuentas (complemento)',
  목록: 'lista',
  목록을: 'la lista (complemento)',
  표: 'tabla / cuadro',
  영수증: 'recibo / factura',
  영수증을: 'los recibos (complemento)',
  유모차: 'cochecito de bebé',
  아기방: 'cuarto del bebé',
  침대: 'cama / cuna',
  서랍장: 'cómoda / cajonera',
  가구: 'muebles',
  장난감: 'juguetes',
  학자금: 'fondo para los estudios',
  손자: 'nieto',
  손자가: 'el nieto (sujeto)',
  손주: 'nieto/a',
  며느리: 'nuera',
  며느리는: 'la nuera (tema)',
  시아버지: 'suegro (padre del marido)',
  임신: 'embarazo',
  임신했다고: 'que estaba embarazada',
  재산: 'patrimonio / bienes',
  재산은: 'el patrimonio (tema)',
  투자: 'inversión',
  투자했다고: 'que invirtió',
  아낌없이: 'sin escatimar',
  인색한: 'tacaño',
  욕심: 'codicia / avaricia',
  악당: 'villano / el malo de la historia',
  괴물: 'monstruo',
  재고: 'inventario / existencias',
  창고: 'almacén / bodega',
  정리: 'orden / organización',
  서류: 'documentos / papeleo',
  태도: 'actitud',
  감사: 'gratitud',
  물려주는: 'pasar a la siguiente generación',
  물려주면: 'si se pasa a otro',
  세대: 'generación',
  거절했다: 'se negó / rechazó',
  거절: 'negativa',
  충격: 'impacto / shock',
  당황한: 'desconcertado',
  방어적으로: 'a la defensiva',
  갈등: 'conflicto',
  의도: 'intención',
  계획: 'plan',
  증거: 'prueba / evidencia',
  기대: 'expectativa',
  조건: 'condición',
  선물: 'regalo',
  선물을: 'los regalos (complemento)',
  빌려준: 'prestado',
  당연한: 'natural / que se da por hecho',
  공평하다고: 'que es justo',
  공평: 'justicia / equidad',
  말도안되는: 'que no tiene sentido',
  범죄: 'delito / crimen',
  변명: 'excusa',
  사과: 'disculpa',
  비꼬는: 'sarcástico / que se burla',
  갑자기: 'de repente',
  솔직히: 'sinceramente / la verdad',
  경제적으로: 'económicamente',
  힘들다고: 'que lo está pasando mal',
  찾아왔다: 'vino a visitar / se presentó',
  진짜: 'de verdad / en serio',

  // Alta frecuencia en las notas de voz: sin estas, medio texto queda sin clic.
  그런데: 'pero / y entonces',
  이제: 'ahora / ya',
  비싼: 'caro/a',
  거예요: 'es que… / terminación de explicación en 해요체',
  내가: 'yo (sujeto, informal)',
  제가: 'yo (humilde, sujeto)',
  가족: 'familia',
  물건: 'objeto / cosa',
  물건들: 'las cosas',
  아니에요: 'no es',
  돈을: 'el dinero (complemento)',
  많이: 'mucho',
  전부: 'todo / entero',
  그리고: 'y / además',
  다른: 'otro/a',
  이야기를: 'la historia / la conversación (complemento)',
  태어났을: 'cuando nació',
  샀다: 'compró',
  줬어요: 'me lo dio / se lo dio',
  드렸을: 'se lo habría dado (humilde)',
  쓰는: 'que usa',
  쌓여: 'amontonado',
};

const NARRATOR_PARAGRAPHS = [
  '삼 년 전 지호가 태어났을 때, 가족 중에서 돈을 가장 많이 쓴 사람은 할아버지 정만호였다.',
  '거의 모든 것을 샀다. 비싼 유모차, 아기방 가구 전부, 비싼 장난감, 그리고 학자금 통장까지 만들어 주었다.',
  '모두 그냥 아낌없이 주는 사람이라고 생각했다.',
  '그러다가 만호 씨의 딸 미영이 임신했다고 알렸다.',
  '갑자기 만호 씨는 지호의 물건 중 일부를 새 아기와 "나눠도 되지 않겠냐"는 말을 하기 시작했다.',
  '몇 주 뒤, 만호 씨는 아들과 며느리의 집에 찾아왔다. 손에는 지금까지 사 준 비싼 선물이 전부 적힌 목록이 있었다.',
  '수백만 원어치의 물건을 돌려 달라고 했다.',
  '며느리는 거절했다.',
  '지금 양쪽은 그날 있었던 일에 대해 아주 다른 이야기를 하고 있다.',
];

const A_PARAGRAPHS = [
  '언니, 저 아직도 손이 떨려요.',
  '지호 태어났을 때 남편 아버님이 다 사 주셨잖아요. 유모차, 아기방 가구, 굳이 사 주시겠다고 했던 그 비싼 선물들 전부요.',
  '그런데 어제 그분이 우리 집에 오셨는데, 손에 종이 목록을 들고 오셨어요.',
  '목록이요.',
  '농담 아니에요.',
  '우리 집 식탁에 앉아서 하나씩 확인하기 시작하셨어요. 창고에서 재고 조사 하시는 것처럼요.',
  '유모차. 침대. 서랍장. 지호 학자금 통장에 넣어 주신 돈까지요.',
  '그러더니 아주 진지하게 말씀하세요. "이제 이 중에 몇 개는 미영이 아기한테 가는 게 공평하다고 본다."',
  '저는 앉아서 생각했어요... 누구한테 공평한 건데요?',
  '지호가 지금 쓰고 있는 물건들이에요. 매일이요.',
  '창고에 쌓여 있는 상자가 아니에요. 지호 물건이에요.',
  '그다음에는 돈을 많이 투자했다고, 가족 재산은 가족 안에 있어야 한다고 하세요.',
  '가족 재산이요?',
  '아버님, 그건 아버님 손자예요. 부동산이 아니고요.',
  '그리고 영수증을 꺼내셨어요.',
  '영수증이요.',
  '삼 년 전 거요.',
  '언젠가 돌려받을 생각이 없는 사람이 아기 선물 영수증을 왜 가지고 있겠어요?',
  '진짜 말도 안 되는 상황이었어요.',
  '제일 힘들었던 건, 제가 안 된다고 했을 때 진심으로 당황하셨다는 거예요.',
  '다른 손주가 생긴다는 이유로 제가 제 아이 물건을 내줄 거라고 정말 믿으셨던 거예요.',
  '지호가 이제 안 쓰는 물건 있냐고 그냥 물어보셨으면, 저는 기쁘게 드렸을 거예요.',
  '그런데 서류를 들고 찾아오시는 건요?',
  '그건 아니죠.',
];

const B_PARAGRAPHS = [
  '무슨 일이 있었는지 누구한테라도 말해야겠어요. 이제 내가 악당이 된 것 같으니까.',
  '삼 년 전에 지호가 태어났을 때, 나는 그 아이들을 도우려고 큰돈을 썼어요.',
  '정말 큰돈을요.',
  '누가 시켜서 한 게 아니에요. 내 손자가 다 가졌으면 해서 그랬어요.',
  '아기방 가구만 해도 내 첫 차보다 비쌌어요.',
  '내가 불평했나요? 안 했어요.',
  '고맙다는 말을 요구한 적 있나요? 없어요.',
  '그런데 이제 딸 미영이가 첫아이를 기다리는데, 경제적으로 많이 힘들다고 해요.',
  '그래서 이제 거의 안 쓰는 비싼 물건 몇 개는 물려주면 어떨까 생각한 거예요.',
  '옛날부터 집안에서 다들 그렇게 해 왔잖아요.',
  '그런데 수진이는 내가 은행이라도 털려는 것처럼 반응했어요.',
  '전부 다 돌려 달라고 한 적은 한 번도 없어요.',
  '큰 물건 몇 개를 나누는 이야기를 해 보자고 했을 뿐이에요.',
  '그런데 유모차 얘기를 꺼내자마자 방어적으로 나오더라고요.',
  '솔직히 말하면요?',
  '나를 힘들게 한 건 물건이 아니었어요.',
  '태도였어요.',
  '고맙다는 마음이 하나도 없다는 거요.',
  '삼 년 동안 내가 돈을 낸 물건들을 쓰는 걸 봤는데, 다른 손주를 돕자고 하는 순간 갑자기 내가 욕심 많은 노인이 됐어요.',
  '그리고 다들 내 목록을 가지고 웃어요.',
  '정리해 놓은 게 그렇게 잘못인가요.',
  '수천만 원짜리 이야기를 하는데 적어 두는 게 그렇게 이상한 일은 아니잖아요.',
  '나는 지호한테서 뭘 뺏으려고 한 게 아니에요.',
  '미영이를 도우려고 한 거예요.',
  '그런데 이 집에서는 그게 이제 범죄인가 봐요.',
];

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: '이야기는 만호 씨가 「아낌없이 주는 사람」으로 보였다고 합니다. 이 표현은 무슨 뜻입니까?',
    opts: [
      '싸고 실용적인 물건만 샀다',
      '돈을 아끼지 않고 많이 썼다',
      '중고 물건을 더 좋아했다',
      '할인할 때만 샀다',
    ],
    correct: 1,
    explanation:
      '「아낌없이」 significa «sin escatimar»: gastó sin mirar el precio. La lista sube de escalón en escalón —cochecito, muebles, juguetes, fondo para los estudios— y eso prepara todo lo que viene después.',
  },
  {
    type: 'Inferencia',
    q: '이야기는 만호 씨의 태도가 「갑자기」 바뀌었다고 합니다. 이것은 무엇을 뜻합니까?',
    opts: [
      '변화는 천천히 왔고 오래전부터 예상됐다',
      '만호 씨는 처음부터 물건을 돌려받을 계획이었다',
      '변화는 한 사건 직후에 왔다 — 딸의 임신',
      '미영이 직접 물건을 달라고 했다',
    ],
    correct: 2,
    explanation:
      '「갑자기」 contrasta con tres años de generosidad e implica que la motivación cambió justo cuando su propia hija quedó embarazada — no poco a poco.',
  },
  {
    type: 'Comprensión',
    q: '만호 씨가 들고 온 목록에는 무엇이 적혀 있었습니까?',
    opts: [
      '새 아기를 위해 앞으로 살 물건',
      '지금까지 사 준 비싼 선물 전부',
      '집안의 한 달 예산',
      '아들과 맺은 계약서',
    ],
    correct: 1,
    explanation:
      'El narrador dice: 「지금까지 사 준 비싼 선물이 전부 적힌 목록」.',
  },
  {
    type: 'Pensamiento crítico',
    q: '「모두 그냥 아낌없이 주는 사람이라고 생각했다」에서 「그냥」은 무엇을 암시합니까?',
    opts: [
      '만호 씨는 정말 다른 뜻 없이 관대한 사람이었다는 뜻이다',
      '그 관대함 뒤에 그때는 보이지 않던 무언가가 더 있었을 수 있다',
      '가족은 처음부터 만호 씨가 선물마다 조건을 단다는 걸 알고 있었다',
      '만호 씨는 처음부터 대놓고 가족을 통제하려고 했다는 뜻이다',
    ],
    correct: 1,
    explanation:
      '「그냥」 sugiere que las apariencias engañaban: deja abierta la posibilidad de que aquella generosidad llevara condiciones que nadie vio hasta ahora.',
  },
];

const A_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: '수진은 시아버지의 방문을 「창고에서 재고 조사 하시는 것처럼」이라고 표현합니다. 이 비유는 무엇을 합니까?',
    opts: [
      '시아버지가 창고에서 재고를 세듯이 집 안의 가구를 하나씩 옮겨 가며 확인했다는 뜻이다',
      '시아버지를 차갑고 사무적인 사람으로 그린다 — 선물을 되찾을 수 있는 재고처럼 다룬다',
      '분위기를 풀려고 일부러 웃기게 과장해서 말한 것이다',
      '목록에 사람 같은 성격을 부여해서 목록이 살아 있는 것처럼 만든 표현이다',
    ],
    correct: 1,
    explanation:
      'La comparación le quita a la visita todo el calor familiar. Equipararla a un recuento de almacén muestra que 수진 vivió la escena como una transacción, no como una conversación entre familia.',
  },
  {
    type: 'Inferencia',
    q: '「돌려받을 생각이 없는 사람이 아기 선물 영수증을 왜 가지고 있겠어요?」 이 질문은 무엇을 암시합니까?',
    opts: [
      '아기 선물 영수증은 누구나 보관해 두는 것이 당연하다',
      '시아버지는 원래 뭐든지 정리를 잘하는 사람이라서 그랬을 뿐이다',
      '영수증은 시아버지가 처음부터 돌려받을 생각이었다는 증거다',
      '수진이 자기 영수증을 잃어버려서 확인할 방법이 없었다',
    ],
    correct: 2,
    explanation:
      'Una pregunta retórica no espera respuesta: dicta un veredicto. 수진 la usa para convertir los recibos en prueba de premeditación, no en simple orden.',
  },
  {
    type: 'Tono',
    q: '수진의 음성 메시지의 어조를 가장 잘 설명한 것은 무엇입니까?',
    opts: [
      '있었던 일을 차분하게 순서대로 정리해서 분석하듯 설명한다',
      '감정이 격해 있고, 화가 나 있으며, 믿기지 않아 한다',
      '슬퍼하면서 그때 그렇게 말한 것을 후회하고 있다',
      '끝까지 감정을 누르고 격식 있게 사무적으로 이야기한다',
    ],
    correct: 1,
    explanation:
      '«Todavía me tiemblan las manos», las frases de una sola palabra (「목록이요.」, 「영수증이요.」) y el sarcasmo (「부동산이 아니고요」) marcan indignación emocional, no análisis.',
  },
  {
    type: 'Comprensión',
    q: '수진의 말에 따르면, 시아버지가 어떻게 말했으면 괜찮았을까요?',
    opts: [
      '선물 전체가 적힌 자세한 목록을 가져오는 것',
      '유모차와 침대를 당장 돌려 달라고 하는 것',
      '지호가 이제 안 쓰는 물건이 있는지 물어보는 것',
      '정식으로 편지를 보내는 것',
    ],
    correct: 2,
    explanation:
      'Ella lo dice: 「지호가 이제 안 쓰는 물건 있냐고 그냥 물어보셨으면, 저는 기쁘게 드렸을 거예요.」 El CÓMO pesó tanto como el QUÉ.',
  },
  {
    type: 'Registro',
    q: '「아버님, 그건 아버님 손자예요. 부동산이 아니고요.」 수진은 무엇을 하고 있습니까?',
    opts: [
      '시아버지가 하시는 부동산 사업 이야기를 진지하게 받아서 이어 가고 있다',
      '존댓말은 그대로 두면서, 가족을 투자처럼 다루는 태도를 비꼬고 있다',
      '가족 재산이라는 시아버지의 관점에 정중하게 동의하고 있다',
      '시아버지가 적어 온 목록의 항목을 그대로 인용하고 있다',
    ],
    correct: 1,
    explanation:
      'Es sarcasmo dentro de la cortesía: mantiene el 「아버님」 y el 존댓말 impecables mientras el contenido lo acusa de tratar a su nieto como una cartera de inversión. En coreano esa combinación golpea más fuerte que gritar.',
  },
];

const B_QS: Question[] = [
  {
    type: 'Vocabulario',
    q: '만호 씨는 물건을 「물려주면」 어떨까 생각했다고 합니다. 이 말은 어떤 전통을 가리킵니까?',
    opts: [
      '산 가게에 물건을 다시 반품하고 돈을 그대로 돌려받는 것',
      '집안에서 물건을 윗세대에서 아랫세대로 넘겨주는 관습',
      '법적으로 재산을 물려주는 정식 상속 절차',
      '안 쓰는 물건을 기부 단체에 보내 주는 것',
    ],
    correct: 1,
    explanation:
      '「물려주다」 invoca una costumbre familiar, no una devolución. 만호 presenta su petición como práctica cultural, no como exigencia económica.',
  },
  {
    type: 'Comprensión',
    q: '만호 씨의 말에 따르면, 그가 정확히 요구한 것은 무엇입니까?',
    opts: [
      '목록에 있는 모든 물건을 당장 돌려받는 것',
      '학자금 통장의 돈만',
      '큰 물건 몇 개를 나누는 이야기를 해 보는 것',
      '수진의 사과',
    ],
    correct: 2,
    explanation:
      '만호 dice: 「전부 다 돌려 달라고 한 적은 한 번도 없어요. 큰 물건 몇 개를 나누는 이야기를 해 보자고 했을 뿐이에요.」 Contradice directamente el relato de 수진.',
  },
  {
    type: 'Inferencia',
    q: '「나를 힘들게 한 건 물건이 아니었어요. 태도였어요.」 이 말은 무엇을 보여 줍니까?',
    opts: [
      '물건에 관심 없는 척하고 있을 뿐이다',
      '오랫동안 베풀었는데도 무시당했다고 느낀다',
      '수진을 가족에서 밀어내고 싶어 한다',
      '이제 와서 선물을 산 것을 후회한다',
    ],
    correct: 1,
    explanation:
      'Al separar 「물건」 de 「태도」, 만호 deja claro que la herida emocional —sentirse desechado tras años de dar— le pesa más que el dinero.',
  },
  {
    type: 'Tono',
    q: '「정리해 놓은 게 그렇게 잘못인가요.」 이 문장의 어조는 무엇입니까?',
    opts: [
      '자기 잘못을 진심으로 뉘우치면서 하는 사과다',
      '비꼬는 방어 — 자기가 잘못했다고 생각하지 않는다',
      '왜 다들 목록을 보고 화가 났는지 모르겠다는 혼란이다',
      '학술적이고 격식 있는 말투로 차분하게 설명한다',
    ],
    correct: 1,
    explanation:
      'Es una no-disculpa con forma de pregunta: defiende su acto mientras insinúa que criticarle la lista es ridículo. El 「-인가요」 finge duda donde no la hay.',
  },
  {
    type: 'Vocabulario',
    q: '「이제 내가 악당이 된 것 같으니까.」 「악당」이라는 말은 무엇을 드러냅니까?',
    opts: [
      '자기 행동이 잘못됐다고 이제 와서 완전히 인정하고 사과하는 말이다',
      '남들이 하는 이야기 속에서 나쁜 역할을 억울하게 맡았다고 느낀다',
      '자기 상황을 설명하려고 법률 용어를 그대로 쓰고 있다',
      '스스로를 낮추는 말로 주위의 동정을 얻으려 하는 것이다',
    ],
    correct: 1,
    explanation:
      '「악당」 es vocabulario de ficción, no de vida real. 만호 lo usa para decir que le han asignado un papel narrativo injusto: es un personaje en la historia que cuentan otros.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Síntesis',
    q: '수진과 만호 씨가 둘 다 인정하는 사실은 무엇입니까?',
    opts: [
      '만호 씨가 모든 물건을 영영 돌려받으려고 했다',
      '수진이 먼저 나눠 주겠다고 제안했다',
      '만호 씨가 목록을 들고 왔다',
      '미영이 직접 물건을 달라고 했다',
    ],
    correct: 2,
    explanation:
      'La lista es el único dato objetivo que confirman las dos versiones. Todo lo demás —intención, tono, alcance— está en disputa.',
  },
  {
    type: 'Perspectiva',
    q: '이야기는 만호 씨가 「수백만 원어치를 돌려 달라고 했다」고 하고, 만호 씨는 「나누는 이야기를 해 보자고 했을 뿐」이라고 합니다. 이 차이는 무엇을 보여 줍니까?',
    opts: [
      '이야기하는 사람이 처음부터 만호 씨를 싫어해서 일부러 더 나쁘게 전한 것이다',
      '만호 씨가 생각한 의도와 그 말이 실제로 준 느낌 사이에 큰 차이가 있다',
      '수진이 그날 있었던 일을 대부분 지어내서 부풀린 것이다',
      '이야기하는 사람이 금액과 요구 내용을 사실과 다르게 잘못 알았다',
    ],
    correct: 1,
    explanation:
      'Intención frente a impacto. 만호 creía estar abriendo una conversación; 수진 (y el narrador) lo vivieron como una exigencia. Esa distancia es el motor de todo el conflicto.',
  },
  {
    type: 'Pensamiento crítico',
    q: '이 갈등의 가장 근본적인 원인은 무엇입니까?',
    opts: [
      '다른 손주가 생기자 갑자기 커진 만호 씨의 욕심',
      '삼 년 동안 받기만 하고 고맙다는 말 한마디 없는 수진의 태도',
      '선물을 줄 때 어떤 기대가 있는지 한 번도 이야기하지 않았다',
      '미영이 형편이 어려운데도 아이를 갖기로 한 결정',
    ],
    correct: 2,
    explanation:
      '¿Eran regalos o préstamos con condiciones? Que nadie fijara ese límite en su momento —y no la avaricia ni la ingratitud por separado— es la causa estructural de la disputa.',
  },
  {
    type: 'Inferencia',
    q: '수진은 시아버지가 거절을 듣고 「진심으로 당황하셨다」고 합니다. 이 반응은 무엇을 보여 줍니까?',
    opts: [
      '수진을 압박하려고 전략적으로 놀란 척한 것이다',
      '자기 부탁이 무리라고 여겨질 수 있다는 생각을 정말 못 했다',
      '수진이 거절할 줄 뻔히 알면서도 일부러 시험해 본 것이다',
      '살면서 집안에서 한 번도 거절당해 본 적이 없다',
    ],
    correct: 1,
    explanation:
      'El asombro genuino revela que 만호 opera con un conjunto de supuestos completamente distinto: no esperaba una negativa porque, dentro de su marco, su petición era razonable.',
  },
  {
    type: 'Registro',
    q: '만호 씨는 아들과 며느리를 「그 아이들」이라고 부릅니다. 이 표현은 무엇을 암시합니까?',
    opts: [
      '아들과 수진이 아직 나이가 어린 사람들이라는 뜻이다',
      '자신을 어른이자 도와주는 사람으로, 두 사람을 아직 미숙한 사람으로 본다',
      '두 사람의 이름을 잊어버려서 그렇게 부르는 것이다',
      '한국어에서 집안 어른이 손아랫사람을 부를 때 쓰는 아주 격식 있는 표현이다',
    ],
    correct: 1,
    explanation:
      'Llamarlos 「그 아이들」 los infantiliza: los coloca como receptores de su dinero y su criterio, no como iguales. Refuerza en voz baja su sensación de autoridad.',
  },
];

const KEY_LANGUAGE = [
  { phrase: '재고 조사', meaning: 'recuento de existencias — aquí, aplicado a una familia' },
  { phrase: '물려주다', meaning: 'pasar algo a la siguiente generación dentro de la familia' },
  { phrase: '-겠어요? (수사 의문)', meaning: 'pregunta retórica: no espera respuesta, dicta un veredicto' },
  { phrase: '-인가요 (비꼬는)', meaning: 'pregunta que finge duda para defenderse: no-disculpa' },
  { phrase: '존댓말로 하는 비꼼', meaning: 'sarcasmo dentro de la cortesía — golpea más que levantar la voz' },
];

export const harabeojiuiJangbu: Historia = {
  slug: 'harabeoji-ui-jangbu',
  lang: 'coreano',
  icon: '🎙️',
  color: '#059669',
  level: 'B1',
  title: '할아버지의 장부',
  tagline: 'Lo pagó todo cuando nació el nieto. Tres años después llegó con la lista impresa.',
  metaTitle: '할아버지의 장부 — comprensión en coreano B1',
  metaDescription:
    
    
    'Lo pagó todo cuando nació el nieto. Tres años después llegó con la lista impresa. Dos audios, transcripción y 19 preguntas en coreano B1.',
  intro:
    'Un conflicto de familia. Dos versiones. Tú decides quién tiene razón. Lee al narrador en coreano escrito, escucha las dos notas de voz y responde 19 preguntas de vocabulario, inferencia, tono y pensamiento crítico.',
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Fíjate en el 존댓말: la nuera nunca deja de tratar de usted a su suegro, y aun así lo está acusando. En coreano la cortesía no significa acuerdo — y ese es medio ejercicio.',
  },
  voices: [
    {
      key: 'a',
      name: '수진',
      role: '며느리',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/coreano/harabeoji-ui-jangbu/a.mp3',
      paragraphs: A_PARAGRAPHS,
      questions: A_QS,
      listenHint: 'Escucha con atención. Todavía no hay transcripción — concéntrate en lo que puedas entender.',
      transcriptHint: 'las marcas y ves su traducción. Ojo: las palabras salen con su partícula pegada, como suenan.',
      write1Prompt: 'Sin mirar ninguna transcripción, escribe con tus palabras lo que entendiste de la nota de voz de 수진.',
      write1Hint: 'No te preocupes por que salga perfecto: es una primera impresión. Escribe en español o en coreano.',
      write2Prompt: 'Ahora escríbelo otra vez — esta vez puedes entrar en más detalle.',
    },
    {
      key: 'b',
      name: '만호',
      role: '시아버지',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/coreano/harabeoji-ui-jangbu/b.mp3',
      paragraphs: B_PARAGRAPHS,
      questions: B_QS,
      listenHint: 'Escucha primero sin transcripción. Esta es la otra mitad del conflicto.',
      transcriptHint: 'compara la versión de 만호 con la de 수진: ¿en qué coinciden? ¿Dónde se contradicen?',
      write1Prompt: 'Sin la transcripción, escribe con tus palabras lo que entendiste de la nota de voz de 만호.',
      write1Hint: '¿Qué dice él que pasó de verdad? Escribe en español o en coreano.',
      write2Prompt: 'Ahora escribe otra vez lo que entendiste desde la perspectiva de 만호.',
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Estas preguntas te piden sostener las dos versiones a la vez y pensar con calma qué pasó, por qué, y cómo el idioma que elige cada uno moldea lo que creemos que pasó.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: 'Después de oír a los dos: ¿quién tiene el argumento más fuerte, y por qué?',
    note: 'No hay una única respuesta correcta. Lo que importa es sostener tu posición con evidencia del texto: palabras y frases concretas. Esa es la destreza que separa un B1 sólido de un B1 de examen.',
  },
  ui: 'es',
};

export default harabeojiuiJangbu;
