import type { LiveSet } from './types'

const set: LiveSet = {
  id: 'coreano-1',
  title: 'Coreano — Set 1: Partículas y Formalidad',
  titleKo: '한국어 세트 1: 조사와 격식체',
  lang: 'ko',
  questions: [
    {
      id: 'q1',
      type: 'particle',
      level: 'TOPIK-I',
      context: 'Completa la oración con la partícula correcta.',
      prompt: '저 ___ 학생이에요.',
      options: [
        { id: 'A', text: '은', romanization: 'eun' },
        { id: 'B', text: '는', romanization: 'neun' },
        { id: 'C', text: '이', romanization: 'i' },
        { id: 'D', text: '가', romanization: 'ga' },
      ],
      correct: 'B',
      explanation:
        '저 termina en vocal → la partícula de tema es 는. La regla: consonante final → 은, vocal final → 는. 이/가 son partículas de sujeto, no de tema — cambian el énfasis de la oración.',
      trap:
        'Muchos eligen 가 porque suena natural en oral, pero 저가 es incorrecto. 저 solo acepta 는 como partícula de tema.',
    },
    {
      id: 'q2',
      type: 'formality',
      level: 'TOPIK-I',
      context: 'Estás en tu primer día de trabajo en Seúl. Tu jefe te pregunta si entendiste la instrucción.',
      prompt: '¿Cómo respondes "Sí, entendí"?',
      options: [
        { id: 'A', text: '응, 알았어', romanization: 'eung, arasseo' },
        { id: 'B', text: '네, 알겠어요', romanization: 'ne, algeseoyo' },
        { id: 'C', text: '네, 알겠습니다', romanization: 'ne, algesseumnida' },
        { id: 'D', text: '그래, 알아', romanization: 'geurae, ara' },
      ],
      correct: 'C',
      explanation:
        '알겠습니다 es el nivel formal escrito/corporativo — el único apropiado con un jefe en Corea del Sur. 알겠어요 es polite pero insuficiente en contexto laboral formal. 응/그래 son entre amigos íntimos.',
      trap:
        '알겠어요 parece correcto porque suena respetuoso, pero en jerarquía laboral coreana el estándar es siempre 합쇼체 (형태: ~습니다/~ㅂ니다).',
    },
    {
      id: 'q3',
      type: 'particle',
      level: 'TOPIK-I',
      context: 'Elige la partícula de sujeto correcta.',
      prompt: '오늘 ___ 날씨가 좋아요.',
      options: [
        { id: 'A', text: '은', romanization: 'eun' },
        { id: 'B', text: '는', romanization: 'neun' },
        { id: 'C', text: '이', romanization: 'i' },
        { id: 'D', text: '가', romanization: 'ga' },
      ],
      correct: 'A',
      explanation:
        '오늘 termina en consonante ㄹ → partícula de tema 은. Aquí 오늘 funciona como marco temporal (tema), no como sujeto de la acción. La estructura es: [tema]은/는 + [sujeto]이/가 + predicado.',
      trap:
        '가 es error común porque 오늘 termina en ㄹ (se siente como vocal al pronunciar) pero ortográficamente tiene consonante final → 은.',
    },
    {
      id: 'q4',
      type: 'choice',
      level: 'TOPIK-I',
      context: 'Vocabulario en contexto. Marca la opción correcta.',
      prompt: '"Hace mucho tiempo" en coreano es:',
      options: [
        { id: 'A', text: '나중에', romanization: 'najunge' },
        { id: 'B', text: '아까', romanization: 'akka' },
        { id: 'C', text: '오래전에', romanization: 'oraejeon-e' },
        { id: 'D', text: '잠깐', romanization: 'jamkkan' },
      ],
      correct: 'C',
      explanation:
        '오래전에 = hace mucho tiempo (오래 = largo tiempo, 전 = antes). 아까 = hace un momento (mismo día). 나중에 = después/más tarde. 잠깐 = un momento/brevemente. El error más común es confundir 아까 (pasado cercano) con 오래전에 (pasado lejano).',
      trap:
        '아까 es el más elegido porque todos conocen esa palabra, pero aká solo aplica a algo que pasó hace minutos, no años.',
    },
    {
      id: 'q5',
      type: 'korean-read',
      level: 'TOPIK-II',
      context: '다음 문장에서 틀린 부분을 고르세요.',
      prompt: '저는 어제 친구한테 선물을 받았어요. 친구___ 저에게 책을 줬어요.',
      options: [
        { id: 'A', text: '이', romanization: 'i' },
        { id: 'B', text: '가', romanization: 'ga' },
        { id: 'C', text: '는', romanization: 'neun' },
        { id: 'D', text: '한테서', romanization: 'hanteseo' },
      ],
      correct: 'D',
      explanation:
        '한테서 es la partícula de origen animado ("desde alguien"). 친구한테서 = "desde/de parte del amigo". 한테 solo indica dirección (a alguien). La distinción: 한테 = destino, 한테서 = origen. En "el amigo me dio" el amigo es origen → 한테서.',
      trap:
        '한테 parece suficiente porque lo usamos siempre, pero 주다 (dar) requiere especificar origen con 한테서 cuando el foco está en quién da, no en quién recibe.',
    },
    {
      id: 'q6',
      type: 'formality',
      level: 'TOPIK-II',
      context: 'Escribes un email formal a una universidad coreana para pedir información sobre admisiones.',
      prompt: '¿Cuál es la apertura más apropiada?',
      options: [
        { id: 'A', text: '안녕하세요, 저는 지원자입니다.', romanization: 'annyeonghaseyo, jeoneun jiwon-ja-imnida' },
        { id: 'B', text: '안녕! 입학 정보 주세요.', romanization: 'annyeong! ipak jeongbo juseyo' },
        { id: 'C', text: '귀 대학교에 문의드립니다.', romanization: 'gwi daehakgyo-e munuideurimnida' },
        { id: 'D', text: '입학처에 물어보고 싶어요.', romanization: 'ipakcheo-e mureobogo sipeoyo' },
      ],
      correct: 'C',
      explanation:
        '귀 대학교 ("su honorable universidad") + 문의드립니다 (forma humilde de "consultar") es la apertura estándar en escritura formal coreana. 드리다 es el verbo humilde de 주다/하다 — elevas al receptor rebajándote tú. 안녕하세요 en email formal suena demasiado casual.',
      trap:
        'A parece correcta porque usa 입니다 (formal), pero 안녕하세요 en apertura de email formal es equivalente a escribir "¡Hola!" en una carta a un rector — demasiado informal.',
    },
    {
      id: 'q7',
      type: 'blank',
      level: 'TOPIK-I',
      context: 'Elige la combinación correcta para completar la oración.',
      prompt: '저는 커피___ 차___ 좋아해요.',
      options: [
        { id: 'A', text: '와 / 를', romanization: 'wa / reul' },
        { id: 'B', text: '하고 / 도', romanization: 'hago / do' },
        { id: 'C', text: '과 / 를', romanization: 'gwa / reul' },
        { id: 'D', text: '하고 / 를', romanization: 'hago / reul' },
      ],
      correct: 'D',
      explanation:
        '커피 termina en vocal → 하고 (no 과). 차 recibe 를 como objeto directo de 좋아해요. 하고 = "y" informal (siempre igual, no cambia por consonante/vocal). 와/과 también significan "y" pero son más formales y SÍ cambian: vocal → 와, consonante → 과.',
      trap:
        'A es trampa perfecta: 와 parece correcto con 커피 (vocal) pero 와/과 son la versión formal. En oral cotidiano usamos 하고. Además 차와를 suena redundante — 와 ya une, 를 es el objeto.',
    },
    {
      id: 'q8',
      type: 'formality',
      level: 'TOPIK-II',
      context: 'Estás en una reunión de negocios. Quieres decir "Por favor revise este documento".',
      prompt: '¿Cuál es la forma más apropiada?',
      options: [
        { id: 'A', text: '이 서류 봐요.', romanization: 'i seoryu bwayo' },
        { id: 'B', text: '이 서류 좀 확인해 주시겠습니까?', romanization: 'i seoryu jom hwagin-hae jusigessseumnikka' },
        { id: 'C', text: '이거 확인해줘요.', romanization: 'igeo hwagin-haejwoyo' },
        { id: 'D', text: '서류 좀 보세요.', romanization: 'seoryu jom boseyo' },
      ],
      correct: 'B',
      explanation:
        '~아/어 주시겠습니까? es la forma de petición más formal en coreano: usa 주시다 (forma honorífica de 주다) + 겠 (intención/cortesía) + ㅂ니까 (interrogativo formal). 좀 suaviza la petición. En negocios coreanos esta estructura es la mínima esperada con superiores o clientes.',
      trap:
        'D parece educada porque usa 보세요 (imperativo con 요), pero 보다 es más vago que 확인하다 y el nivel de formalidad es insuficiente para una reunión de negocios.',
    },
  ],
}

export default set
