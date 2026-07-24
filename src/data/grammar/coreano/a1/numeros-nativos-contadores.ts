import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'numeros-nativos-contadores',
  order: '13',
  color: '#c60c30',
  category: 'Números',
  level: 'A1',
  title: 'Números Nativos y Contadores en Coreano A1 — 하나 둘 셋',
  shortTitle: 'Números nativos y contadores',
  metaTitle: 'Números nativos coreano A1 — hana dul set contadores coreano principiantes',
  description:
    'El sistema nativo coreano (순우리말 — sunurimmal) usa palabras propias del idioma: 하나, 둘, 셋, 넷, 다섯... Se usa para contar objetos físicos (con contadores), personas (명/분), horas (시) y años de edad. Ante un contador, algunos números cambian de forma.',
  lead: '하나(1), 둘(2), 셋(3), 넷(4), 다섯(5)...열(10), 스물(20). Ante contadores cambian: 하나→한, 둘→두, 셋→세, 넷→네. Contadores clave: 개(objetos), 명(personas), 시(horas), 잔(vasos), 권(libros).',
  outcomes: [
    'Cuenta del 1 al 20 con el sistema nativo coreano',
    'Aplica las formas abreviadas (한/두/세/네) ante contadores',
    'Usa contadores esenciales: 개, 명, 시, 잔, 권',
  ],

  guide: {
    goal: 'Usar números nativos con los contadores más frecuentes del coreano cotidiano.',
    model: '사과 두 개 (2 manzanas), 학생 세 명 (3 estudiantes), 한 시 (la una en punto)',
    formula: '[Sustantivo] + [Número nativo abreviado] + [Contador]',
    decisions: [
      '하나(1), 둘(2), 셋(3), 넷(4) cambian a 한, 두, 세, 네 antes de un contador',
      'Ante contador: 한 개(1 obj), 두 명(2 pers), 세 잔(3 vasos), 네 권(4 libros)',
      'Sin contador (conteo puro): 하나, 둘, 셋, 넷 se mantienen sin cambio',
      '개 = contador general para objetos y cosas inanimadas',
      '명(myeong)/분(bun) = personas (분 es más formal/educado)',
      '시(si) = horas del reloj (한 시=1h, 두 시=2h, 열두 시=12h)',
      'Edad: 살(sal) = 스물세 살(23 años)',
    ],
    table: [
      ['Número', 'Forma base', 'Forma ante contador'],
      ['1', '하나 (hana)', '한 개 / 한 명 / 한 시'],
      ['2', '둘 (dul)', '두 개 / 두 명 / 두 시'],
      ['3', '셋 (set)', '세 개 / 세 명 / 세 시'],
      ['4', '넷 (net)', '네 개 / 네 명 / 네 시'],
      ['5–9', '다섯~아홉', 'sin cambio: 다섯 개 / 여섯 명'],
      ['10', '열 (yeol)', '열 개 / 열 명 / 열 시'],
      ['20', '스물 (seumul)', '스무 개 / 스무 명 (스물→스무)'],
    ],
    mistakes: [
      '"하나 개" ❌ — ante contador, 하나 cambia a 한: "한 개" ✓',
      '"이 시" ❌ — las horas usan nativos: "두 시" ✓ (이 시 = sino-coreano, incorrecto para horas)',
      '"스물 명" ❌ — 스물 ante contador cambia a 스무: "스무 명" ✓',
    ],
  },

  seo: [
    {
      heading: 'El sistema nativo coreano: números propios del idioma',
      paragraphs: [
        'Los números nativos coreanos (순우리말) son palabras del coreano puro, anteriores a la influencia china. Se usan principalmente para contar cosas en el mundo físico: cuántas manzanas hay, cuántas personas, cuántos vasos. También se usan para las horas del reloj y la edad.',
        'La gran diferencia con el sistema sino-coreano es que los números nativos van acompañados de contadores — palabras que indican la categoría del objeto contado. En coreano no se puede decir simplemente "dos manzanas" sin el contador apropiado: 사과 두 개 (lit. "manzana dos [objeto]").',
      ],
    },
    {
      heading: 'Las formas abreviadas: 한 두 세 네',
      paragraphs: [
        'Cuando los números 1-4 van seguidos de un contador, cambian de forma: 하나→한, 둘→두, 셋→세, 넷→네. Este cambio es consistente — aplica a todos los contadores sin excepción para estos cuatro números.',
        'A partir de 다섯(5), los números no cambian: 다섯 개, 여섯 잔, 일곱 권. Solo los cuatro primeros tienen esta alternancia. Además, 스물(20) cambia a 스무 ante contador: 스무 명.',
      ],
      table: [
        ['Forma aislada', 'Forma ante contador', 'Ejemplo'],
        ['하나', '한', '한 개 (un objeto)'],
        ['둘', '두', '두 명 (dos personas)'],
        ['셋', '세', '세 잔 (tres vasos)'],
        ['넷', '네', '네 권 (cuatro libros)'],
        ['스물', '스무', '스무 살 (20 años)'],
      ],
    },
    {
      heading: 'Contadores esenciales para A1',
      paragraphs: [
        '개(gae) es el contador más versátil — se usa para objetos en general cuando no hay un contador específico. 명(myeong) y 분(bun) cuentan personas (분 es más formal y educado). 시(si) marca las horas del reloj. 잔(jan) cuenta vasos o tazas. 권(gwon) cuenta libros o cuadernos. 살(sal) indica la edad.',
        'El orden en la frase es: [sustantivo] + [número nativo (abreviado si corresponde)] + [contador]. Por ejemplo: 커피 두 잔(dos tazas de café), 책 세 권(tres libros), 선생님 한 분(un maestro — formal).',
      ],
    },
    {
      heading: 'Horas del reloj: sistema nativo obligatorio',
      paragraphs: [
        'Las horas del reloj siempre usan números nativos: 한 시(1h), 두 시(2h), 세 시(3h)...열두 시(12h). Los minutos, sin embargo, usan sino-coreano: 십 분(10 min), 삼십 분(30 min). Este contraste dentro de una misma expresión de tiempo es muy importante: 두 시 삼십 분(2:30) = dos (nativo) + treinta (sino-coreano).',
        'Para preguntar la hora: 몇 시예요? (myeot si yeyo? = ¿Qué hora es?). La respuesta: 세 시 이십 분이에요 (son las 3:20).',
      ],
    },
  ],

  visual: {
    mode: 'numbers',
    teacherLens: 'Números nativos 1-20 con formas abreviadas ante contador y contadores esenciales.',
    graphicPrompt: 'Tabla comparativa: forma aislada vs. forma ante contador, con ejemplos de uso.',
    scene: [
      ['하나 → 한 개', 'un objeto (하나 cambia a 한 ante contador)'],
      ['둘 → 두 명', 'dos personas (둘 cambia a 두)'],
      ['셋 → 세 잔', 'tres vasos (셋 cambia a 세)'],
      ['다섯 개', 'cinco objetos (sin cambio desde 5)'],
      ['한 시', 'la una en punto (horas = nativo)'],
      ['스물세 살', '23 años de edad (스물=20 + 셋→세 + 살)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['한 두 세 네 ante contador', 'contadores 개/명/시/잔/권', 'horas con nativo'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del número nativo con su contador.',
        type: 'choice',
        items: [
          {
            scene: 'En la frutería',
            lines: [['Carlos', '사과 ___ 개 주세요. (Déme 2 manzanas, por favor.)']],
            options: ['두', '둘', '이', '두이'],
            answer: '두',
            explain: '둘(2) ante contador 개 cambia a 두. 사과 두 개 = dos manzanas.',
          },
          {
            scene: 'En clase',
            lines: [['Iris', '학생이 ___ 명이에요. (Hay 3 estudiantes.)']],
            options: ['세', '셋', '삼', '세이'],
            answer: '세',
            explain: '셋(3) ante contador 명 cambia a 세. 세 명 = tres personas.',
          },
          {
            scene: 'Pidiendo café',
            lines: [['Ana', '커피 ___ 잔 주세요. (Un café, por favor.)']],
            options: ['한', '하나', '일', '하나이'],
            answer: '한',
            explain: '하나(1) ante contador 잔 cambia a 한. 한 잔 = una taza.',
          },
          {
            scene: '¿Qué hora es?',
            lines: [['Iván', '지금 몇 시예요? — 지금 ___ 시예요. (Son las 4.)']],
            options: ['네', '넷', '사', '네이'],
            answer: '네',
            explain: '넷(4) ante contador 시 cambia a 네. 네 시 = las cuatro.',
          },
          {
            scene: 'Librería',
            lines: [['Sofia', '책을 ___ 권 샀어요. (Compré 5 libros.)']],
            options: ['다섯', '오', '다섰', '다셋'],
            answer: '다섯',
            explain: '다섯(5) no cambia ante contador: 다섯 권 = cinco libros.',
          },
          {
            scene: 'Edad',
            lines: [['Lina', '저는 스물___ 살이에요. (Tengo 24 años.)']],
            options: ['네', '넷', '사', '네이'],
            answer: '네',
            explain: '24 = 스물네. 넷→네 ante 살. 스물네 살 = 24 años.',
          },
          {
            scene: 'Personas en la reunión',
            lines: [['Marco', '회의에 ___ 분이 오셨어요. (Vinieron 2 personas — formal.)']],
            options: ['두', '둘', '이', '두이'],
            answer: '두',
            explain: '둘→두 ante 분(formal). 두 분 = dos personas (educado).',
          },
          {
            scene: 'Cuánto cambia',
            lines: [['Iván', '스물 명 vs 스무 명 — ¿Cuál es correcto?']],
            options: ['스무 명', '스물 명', '이십 명', '스물이 명'],
            answer: '스무 명',
            explain: '스물(20) ante contador cambia a 스무: 스무 명 = veinte personas.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Diálogo con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los diálogos con el número nativo y el contador correctos.',
        type: 'dual',
        items: [
          {
            scene: 'En el mercado',
            lines: [
 ['Ana', '귤 몇 개 드릴까요? (¿Cuántas mandarinas le doy?)'],
 ['Carlos', '[[0]] [[1]] 주세요. (Deme 6, por favor.)'],
 ],
            blanks: [
              { options: ['여섯', '육', '일곱', '다섯'], answer: '여섯', explain: '여섯(6) no cambia ante contador. Seis mandarinas.' },
              { options: ['개', '명', '잔', '권'], answer: '개', explain: '개 = contador de objetos. 여섯 개 = seis piezas.' },
            ],
          },
          {
            scene: 'En la cafetería',
            lines: [
 ['Lina', '아메리카노 몇 잔 드릴까요? (¿Cuántos americanos?)'],
 ['Marco', '[[0]] [[1]] 주세요. (Dos, por favor.)'],
 ],
            blanks: [
              { options: ['두', '둘', '이', '한'], answer: '두', explain: '둘→두 ante contador. Dos cafés.' },
              { options: ['잔', '개', '명', '권'], answer: '잔', explain: '잔(jan) = vaso/taza. 두 잔 = dos tazas.' },
            ],
          },
          {
            scene: 'En el aula',
            lines: [
 ['Iris', '오늘 수업에 학생이 몇 명 왔어요? (¿Cuántos estudiantes vinieron hoy?)'],
 ['Iván', '[[0]] [[1]] 왔어요. (Vinieron ocho.)'],
 ],
            blanks: [
              { options: ['여덟', '팔', '아홉', '일곱'], answer: '여덟', explain: '여덟(8) no cambia ante 명. Ocho estudiantes.' },
              { options: ['명', '개', '잔', '분'], answer: '명', explain: '명 = contador de personas (informal/neutro).' },
            ],
          },
          {
            scene: 'Cita con el médico',
            lines: [
 ['Recepcionista', '몇 시 예약이에요? (¿A qué hora es su cita?)'],
 ['Sofia', '[[0]] [[1]] 예약이에요. (A las 3.)'],
 ],
            blanks: [
              { options: ['세', '셋', '삼', '세이'], answer: '세', explain: '셋→세 ante 시. Las horas usan número nativo.' },
              { options: ['시', '분', '일', '월'], answer: '시', explain: '시 = contador de horas. 세 시 = las tres.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con la forma nativa correcta del número.',
        type: 'guidedText',
        scene: 'Sofia hace la compra para la clase de coreano',
        text: '오늘 저는 슈퍼마켓에 가요. 사과 [[0]] 개랑 오렌지 [[1]] 개를 사요. (Compro 3 manzanas y 5 naranjas.) 물 [[2]] 병도 사요. (También compro 2 botellas de agua.) 계산대에 사람이 [[3]] 명 있어요. (Hay 4 personas en la caja.) 지금 [[4]] 시예요. (Son las 11.) 아이스크림 [[5]] 개를 덤으로 받아요. (Me regalan un helado de más.)',
        blanks: [
          { options: ['세', '셋', '삼', '세이'], answer: '세', explain: '셋→세 ante 개. 세 개 = tres piezas.' },
          { options: ['다섯', '오', '다석', '다섰'], answer: '다섯', explain: 'cinco no cambia: 다섯 개 = cinco piezas.' },
          { options: ['두', '둘', '이', '두이'], answer: '두', explain: '둘→두 ante 병(botella). 두 병 = dos botellas.' },
          { options: ['네', '넷', '사', '네이'], answer: '네', explain: '넷→네 ante 명. 네 명 = cuatro personas.' },
          { options: ['열한', '십일', '열하나', '열 한'], answer: '열한', explain: '11 = 열하나 → 열한 ante 시. 열한 시 = las 11.' },
          { options: ['한', '하나', '일', '하나이'], answer: '한', explain: '하나→한 ante 개. 한 개 = un objeto.' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe el número nativo correcto (con la forma abreviada si aplica).',
        type: 'freeText',
        scene: 'Describir cantidades en el contexto de WeLearn',
        text: '위런에 선생님이 [[0]] 분이에요. (Hay 2 profesores — formal.) / 오늘 수업이 [[1]] 시에 시작해요. (La clase empieza a las 10.) / 저는 책을 [[2]] 권 가지고 있어요. (Tengo 7 libros.) / 커피숍에 의자가 [[3]] 개 있어요. (Hay 9 sillas en la cafetería.) / 저는 스물[[4]] 살이에요. (Tengo 22 años.)',
        blanks: [
          { answer: '두', accepted: ['두'], explain: '둘→두 ante 분. 두 분 = dos personas (formal).' },
          { answer: '열', accepted: ['열'], explain: '열 시 = las 10. 열 no cambia ante 시.' },
          { answer: '일곱', accepted: ['일곱'], explain: '일곱(7) no cambia ante 권. 일곱 권 = 7 libros.' },
          { answer: '아홉', accepted: ['아홉'], explain: '아홉(9) no cambia ante 개. 아홉 개 = 9 sillas.' },
          { answer: '두', accepted: ['두'], explain: '22 = 스물둘 → 스물두 ante 살. 스물두 살 = 22 años.' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones usando números nativos con contadores.',
        type: 'write',
        items: [
          {
            scene: 'Comprando fruta',
            prompt: 'Di "Por favor, deme 4 manzanas" (사과=manzana, 주세요=deme, 개=objeto).',
            answer: '사과 네 개 주세요.',
            accepted: ['네 개', '사과 네 개'],
            explain: '넷→네 ante 개. 사과 네 개 = cuatro manzanas.',
          },
          {
            scene: 'En clase',
            prompt: 'Di "Hay 10 estudiantes en la clase" (학생=estudiante, 명=personas, 있어요=hay).',
            answer: '수업에 학생이 열 명 있어요.',
            accepted: ['열 명', '학생이 열 명'],
            explain: '열(10) no cambia ante 명. 열 명 = diez personas.',
          },
          {
            scene: 'La hora',
            prompt: 'Di "Son las 3 en punto" (지금=ahora, 시=horas, 이에요=es).',
            answer: '지금 세 시예요.',
            accepted: ['세 시', '세 시예요'],
            explain: '셋→세 ante 시. 세 시 = las tres (horas con nativo).',
          },
          {
            scene: 'Tu edad',
            prompt: 'Di cuántos años tienes usando 살 (nativo + 살).',
            answer: '저는 스물다섯 살이에요.',
            accepted: ['살이에요', '살', '스물'],
            explain: 'Edad con número nativo + 살. 스물다섯 살 = 25 años.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe tu entorno usando números nativos y contadores.',
        type: 'write',
        items: [
          {
            scene: 'Mi mesa ahora mismo',
            prompt: 'Describe cuántos objetos ves en tu mesa ahora: ___ 개 있어요.',
            answer: '책이 두 권 있어요. 컵이 한 개 있어요.',
            accepted: ['개', '권', '잔', '있어요'],
            explain: '개(objetos), 권(libros). Usa nativo + contador para cada cosa.',
          },
          {
            scene: 'Personas en tu vida',
            prompt: 'Di cuántos amigos o familiares tienes: ___이/가 ___ 명 있어요.',
            answer: '친구가 세 명 있어요.',
            accepted: ['명', '있어요', '세', '두', '네'],
            explain: '명 = contador de personas. 세 명 = tres personas.',
          },
          {
            scene: 'Tu horario',
            prompt: 'Di a qué hora empieza algo en tu día: ___ 시에 ___이에요/있어요.',
            answer: '수업이 열 시에 있어요.',
            accepted: ['시에', '있어요', '열', '두', '세'],
            explain: 'Horas con nativo: 열 시(10h), 두 시(2h), 세 시(3h).',
          },
        ],
      },
    ],
  },
}

export default topic
