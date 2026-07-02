import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'tiempo-horas',
  order: '14',
  color: '#c60c30',
  category: 'Números',
  level: 'A1',
  title: 'La Hora en Coreano A1 — 몇 시예요?',
  shortTitle: 'La hora 몇 시예요?',
  metaTitle: 'La hora en coreano A1 — 몇 시예요 horas minutos AM PM coreano principiantes',
  description:
    'En coreano, las horas usan números NATIVOS (한/두/세...) y los minutos usan números SINO-COREANOS (십/이십/삼십...). Esta mezcla de dos sistemas en una sola expresión es la singularidad más importante de decir la hora en coreano.',
  lead: '몇 시예요? (myeot si yeyo?) = ¿Qué hora es? HORAS: números nativos + 시 (두 시=2h). MINUTOS: sino-coreanos + 분 (삼십 분=30min). 반(ban)=y media. 오전/오후=AM/PM.',
  outcomes: [
    'Pregunta y responde sobre la hora con 몇 시예요?',
    'Usa números nativos para horas y sino-coreanos para minutos',
    'Expresa AM/PM con 오전/오후 y "y media" con 반',
  ],

  guide: {
    goal: 'Decir y preguntar la hora en coreano usando los sistemas numéricos correctos.',
    model: '지금 오후 두 시 삼십 분이에요. (Ahora son las 2:30 de la tarde.)',
    formula: '[오전/오후] + [hora nativa] 시 + [minutos sino-coreanos] 분 | 시 반 = y media',
    decisions: [
      '¿Qué hora es? → 몇 시예요? / 몇 시 몇 분이에요?',
      'HORAS: números nativos (1-12): 한/두/세/네/다섯/여섯/일곱/여덟/아홉/열/열한/열두',
      'MINUTOS: sino-coreanos: 일 분(1min), 오 분(5min), 십 분(10min), 삼십 분(30min)',
      '반(ban) = y media: 세 시 반 = 3:30',
      '오전(ojeon) = AM / 오후(ohu) = PM — van ANTES de la hora',
      'Orden completo: 오후 + [hora]시 + [minuto]분',
    ],
    table: [
      ['Elemento', 'Sistema numérico', 'Ejemplo'],
      ['Horas (시)', 'Nativo coreano', '한 시(1h) / 두 시(2h) / 열두 시(12h)'],
      ['Minutos (분)', 'Sino-coreano', '십 분(10min) / 삼십 분(30min) / 오십오 분(55min)'],
      ['Y media (반)', 'Expresión fija', '두 시 반 = 2:30'],
      ['AM (오전)', 'Prefijo de hora', '오전 아홉 시 = 9:00 AM'],
      ['PM (오후)', 'Prefijo de hora', '오후 세 시 = 3:00 PM'],
    ],
    mistakes: [
      '"이 시" ❌ — horas con nativo: "두 시" ✓ (이 es sino-coreano, incorrecto para horas)',
      '"세 시 삼십" ❌ — los minutos necesitan 분: "세 시 삼십 분" ✓',
      'Decir 오전/오후 DESPUÉS de la hora ❌ — van antes: "오후 두 시" ✓',
    ],
  },

  seo: [
    {
      heading: 'La hora en coreano: dos sistemas en una sola expresión',
      paragraphs: [
        'La peculiaridad más sorprendente de la hora en coreano es que usa dos sistemas numéricos distintos dentro de la misma expresión: los números nativos para las horas y los números sino-coreanos para los minutos. Por eso 2:30 se dice 두 시 삼십 분 — dos (nativo) horas treinta (sino-coreano) minutos.',
        'Este contraste tiene origen histórico: el sino-coreano se adoptó del chino para funciones más abstractas y matemáticas (contar minutos, dinero, fechas), mientras que el nativo persistió para funciones más cotidianas y concretas (decir qué hora es del reloj).',
      ],
    },
    {
      heading: 'Las 12 horas en números nativos',
      paragraphs: [
        'Las horas del 1 al 12 en coreano son: 한 시(1h), 두 시(2h), 세 시(3h), 네 시(4h), 다섯 시(5h), 여섯 시(6h), 일곱 시(7h), 여덟 시(8h), 아홉 시(9h), 열 시(10h), 열한 시(11h), 열두 시(12h). Nota que para las 1-4 se usan las formas abreviadas: 한/두/세/네.',
        'El coreano no tiene distinción de 12h vs 24h en el habla cotidiana — usa 오전(AM) y 오후(PM) para clarificar si es necesario. En contextos formales (trenes, cines) pueden aparecer números sino-coreanos en formato 24h escrito, pero en el habla siempre se usa el sistema nativo.',
      ],
      table: [
        ['Hora', 'Coreano', 'Romanización'],
        ['1:00', '한 시', 'han si'],
        ['3:00', '세 시', 'se si'],
        ['6:00', '여섯 시', 'yeoseot si'],
        ['10:00', '열 시', 'yeol si'],
        ['12:00', '열두 시', 'yeoldu si'],
      ],
    },
    {
      heading: 'Minutos y expresiones de media hora',
      paragraphs: [
        'Los minutos van con números sino-coreanos: 오 분(5min), 십 분(10min), 십오 분(15min), 이십 분(20min), 이십오 분(25min), 삼십 분(30min), 사십오 분(45min), 오십오 분(55min).',
        'La expresión 반(ban) significa literalmente "mitad" y equivale a "y media": 두 시 반(2:30), 다섯 시 반(5:30). Es más coloquial que decir 삼십 분 y muy frecuente en la conversación cotidiana.',
      ],
    },
    {
      heading: 'AM, PM y contexto de la hora',
      paragraphs: [
        '오전(ojeon = antes del mediodía) equivale a AM. 오후(ohu = después del mediodía) equivale a PM. Se colocan ANTES de la hora: 오전 열 시(10:00 AM), 오후 두 시(2:00 PM). Si el contexto ya queda claro (una reunión de trabajo siempre es de tarde), se pueden omitir.',
        'Para hablar de reuniones, citas o clases: 오후 세 시에 수업이 있어요 = Tengo clase a las 3 de la tarde. La partícula 에 indica tiempo específico.',
      ],
    },
  ],

  visual: {
    mode: 'time',
    teacherLens: 'La hora: horas con nativo (한/두/세...) + minutos con sino-coreano (십/삼십...). 오전/오후 + 반.',
    graphicPrompt: 'Reloj analógico con horas en coreano + tabla horas vs minutos mostrando los dos sistemas.',
    scene: [
      ['몇 시예요?', '¿Qué hora es? (pregunta estándar)'],
      ['한 시 / 두 시 / 세 시', '1:00 / 2:00 / 3:00 (nativo para horas)'],
      ['두 시 삼십 분', '2:30 (nativo+sino-coreano en una sola hora)'],
      ['세 시 반', '3:30 (반 = y media, coloquial)'],
      ['오전 아홉 시', '9:00 AM (오전 = AM)'],
      ['오후 다섯 시 십오 분', '5:15 PM (오후 = PM)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['nativo para horas', 'sino-coreano para minutos', '반 y media / 오전 오후'],
  },

  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Elige cómo se dice correctamente la hora en coreano.',
        type: 'choice',
        items: [
          {
            scene: 'Son las 3 en punto',
            lines: [['David', '지금 몇 시예요? — ___이에요. (¿Qué hora es? — Son las 3.)']],
            options: ['세 시예요', '삼 시예요', '세이 시예요', '세번이에요'],
            answer: '세 시예요',
            explain: '셋→세 ante 시. 세 시 = las tres. 삼 시 sería incorrecto (sino-coreano).',
          },
          {
            scene: '2:30 de la tarde',
            lines: [['Zhanna', '오후 ___ 이에요. (Son las 2:30 PM.)']],
            options: ['두 시 삼십 분', '이 시 삼십 분', '두 시 반십', '두시삼십'],
            answer: '두 시 삼십 분',
            explain: 'Horas: 두(nativo), Minutos: 삼십(sino-coreano), 분(sufijo). 두 시 삼십 분.',
          },
          {
            scene: 'Coloquial "y media"',
            lines: [['Carlos', '네 시 ___ 에 만나요. (Nos vemos a las 4:30.)']],
            options: ['반', '밥', '반십', '이십'],
            answer: '반',
            explain: '반(ban) = y media. 네 시 반 = las cuatro y media (4:30).',
          },
          {
            scene: 'AM o PM',
            lines: [['Ana', '수업이 ___ 열 시에 있어요. (La clase es a las 10 AM.)']],
            options: ['오전', '오후', '오늘', '어제'],
            answer: '오전',
            explain: '오전 = AM. 오전 열 시 = las 10 de la mañana.',
          },
          {
            scene: '¿Qué hora es?',
            lines: [['Sofia', '지금 ___ ? (¿Qué hora es ahora?)']],
            options: ['몇 시예요', '몇 분이에요', '어디 시예요', '몇 개예요'],
            answer: '몇 시예요',
            explain: '몇 시예요? = ¿Qué hora es? 몇(myeot) = cuánto/qué número.',
          },
          {
            scene: 'Son las 11 y media',
            lines: [['Lina', '지금 열한 시 ___ 이에요. (Son las 11:30.)']],
            options: ['반', '이십', '삼십 분', '반이에요'],
            answer: '반',
            explain: '열한 시 반 = las once y media. 반 es la expresión coloquial para :30.',
          },
          {
            scene: '7:15 PM',
            lines: [['Marco', '오후 일곱 시 ___ 분이에요. (Son las 7:15 PM.)']],
            options: ['십오', '오십', '십칠', '오'],
            answer: '십오',
            explain: '15 minutos = 십오 분(sino-coreano). 오후 일곱 시 십오 분 = 7:15 PM.',
          },
          {
            scene: 'Las 12 del mediodía',
            lines: [['David', '점심 시간이에요. 지금 ___ 이에요. (Es la hora del almuerzo. Son las 12.)']],
            options: ['열두 시', '이십사 시', '열이 시', '십이 시'],
            answer: '열두 시',
            explain: '12 = 열두 (nativo). 열두 시 = las doce. 십이 시 sería incorrecto.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Nivel 2 — Diálogo con dos espacios',
        tag: '2 espacios',
        intro: 'Completa los diálogos con la hora correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Acordando una cita',
            lines: [
              ['Carlos', '몇 시에 만날까요? (¿A qué hora nos encontramos?)'],
              ['Ana', '[[0]] [[1]] 어때요? (¿Qué tal a las 2:00 PM?)'],
            ],
            blanks: [
              { options: ['오후', '오전', '오늘', '어제'], answer: '오후', explain: 'Por la tarde = 오후. Va antes de la hora.' },
              { options: ['두 시', '이 시', '두분', '두번'], answer: '두 시', explain: 'Las 2: 두 시 (nativo). 두 시 = 2:00.' },
            ],
          },
          {
            scene: 'Clase en WeLearn',
            lines: [
              ['Zhanna', '수업이 몇 시에 끝나요? (¿A qué hora termina la clase?)'],
              ['Sofia', '오후 [[0]] 시 [[1]] 분에 끝나요. (Termina a las 4:45 PM.)'],
            ],
            blanks: [
              { options: ['네', '넷', '사', '네이'], answer: '네', explain: '넷→네 ante 시. 네 시 = las cuatro.' },
              { options: ['사십오', '사십', '사오', '오십'], answer: '사십오', explain: '45 minutos = 사십오 분 (sino-coreano: 사십=40 + 오=5).' },
            ],
          },
          {
            scene: 'El tren',
            lines: [
              ['Lina', '기차가 몇 시에 출발해요? (¿A qué hora sale el tren?)'],
              ['Marco', '[[0]] 아홉 시 [[1]] 분에 출발해요. (Sale a las 9:20 AM.)'],
            ],
            blanks: [
              { options: ['오전', '오후', '어제', '내일'], answer: '오전', explain: '9 AM = 오전 아홉 시. 오전 = AM.' },
              { options: ['이십', '이십오', '삼십', '십오'], answer: '이십', explain: '20 minutos = 이십 분 (sino-coreano: 이십 = 20).' },
            ],
          },
          {
            scene: 'Hora de dormir',
            lines: [
              ['David', '보통 몇 시에 자요? (¿A qué hora te duermes normalmente?)'],
              ['Carlos', '밤 [[0]] 시 [[1]] 에 자요. (Me duermo a las 11 y media de la noche.)'],
            ],
            blanks: [
              { options: ['열한', '열하나', '십일', '열한이'], answer: '열한', explain: '11 = 열하나 → 열한 ante 시. 열한 시 = las once.' },
              { options: ['반', '삼십 분', '이십 분', '반이'], answer: '반', explain: '반 = y media. 열한 시 반 = las once y media.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el horario de un día típico en WeLearn.',
        type: 'guidedText',
        scene: 'El horario de Zhanna en WeLearn',
        text: '저는 보통 [[0]] 일곱 시에 일어나요. (Me levanto a las 7 AM.) 아침에 [[1]] 시 삼십 분에 커피를 마셔요. (A las 8:30 tomo café.) 오전 수업이 [[2]] 시에 시작해요. (La clase de mañana empieza a las 9.) 점심은 [[3]] 시 [[4]] 분에 먹어요. (Almuerzo a las 12:30.) 저녁 수업은 오후 [[5]] 시에 있어요. (La clase de la tarde es a las 6 PM.)',
        blanks: [
          { options: ['오전', '오후', '오늘', '밤'], answer: '오전', explain: '7 AM = 오전. Va antes de la hora.' },
          { options: ['여덟', '팔', '아홉', '여덜'], answer: '여덟', explain: '여덟 시(8h). Número nativo para la hora.' },
          { options: ['아홉', '구', '열', '아홉이'], answer: '아홉', explain: '아홉 시 = las 9. Nativo para horas.' },
          { options: ['열두', '십이', '열이', '스물'], answer: '열두', explain: '12 = 열두. 열두 시 = mediodía.' },
          { options: ['삼십', '오십', '이십', '사십오'], answer: '삼십', explain: '삼십 분 = 30 minutos (sino-coreano).' },
          { options: ['여섯', '육', '다섯', '일곱'], answer: '여섯', explain: '여섯 시 = las 6 (nativo). PM ya entendido por contexto.' },
        ],
      },
      {
        id: 'l4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la hora correcta en coreano para cada situación.',
        type: 'freeText',
        scene: 'Horarios de una semana de examen IELTS',
        text: '오전 수업은 ___ 시에 시작해요. (La clase de mañana empieza a las 10.) / 점심 시간은 ___ 시 반이에요. (El almuerzo es a las 12:30.) / 오후 수업은 ___ 시 이십 분에 있어요. (La clase de la tarde es a las 2:20.) / 시험이 ___ 시에 끝나요. (El examen termina a las 5.) / 저는 보통 밤 ___ 시에 자요. (Normalmente me duermo a las 11.)',
        blanks: [
          { answer: '열', accepted: ['열'], explain: '열 시 = las 10. Número nativo.' },
          { answer: '열두', accepted: ['열두'], explain: '열두 시 반 = 12:30. 열두 = nativo para 12.' },
          { answer: '두', accepted: ['두'], explain: '두 시(2h). 둘→두 ante 시.' },
          { answer: '다섯', accepted: ['다섯'], explain: '다섯 시 = las 5. No cambia ante 시.' },
          { answer: '열한', accepted: ['열한'], explain: '열한 시 = las 11. 열하나→열한 ante 시.' },
        ],
      },
      {
        id: 'l5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe la hora completa en coreano.',
        type: 'write',
        items: [
          {
            scene: 'Citando a un amigo',
            prompt: 'Di "Nos encontramos a las 3:00 PM" (만나요=nos encontramos, 에=a las, 오후=PM).',
            answer: '오후 세 시에 만나요.',
            accepted: ['오후 세 시', '세 시에 만나요'],
            explain: '세 시 = las 3 (셋→세 ante 시). 오후 = PM.',
          },
          {
            scene: 'Hora del examen',
            prompt: 'Di "El examen IELTS empieza a las 9:30 AM" (시험=examen, 시작해요=empieza).',
            answer: '오전 아홉 시 반에 시험이 시작해요.',
            accepted: ['아홉 시 반', '아홉 시 삼십 분', '오전 아홉 시'],
            explain: '아홉 시 반 = 9:30 (반=y media). 오전 = AM.',
          },
          {
            scene: 'Tu rutina',
            prompt: 'Di a qué hora te levantas normalmente (일어나요=me levanto).',
            answer: '저는 보통 일곱 시에 일어나요.',
            accepted: ['시에 일어나요', '일어나요', '시에'],
            explain: 'Hora con nativo + 시에. Ej: 일곱 시(7h), 여덟 시(8h).',
          },
          {
            scene: 'Clase de coreano',
            prompt: 'Di "La clase de coreano es a las 6:45 PM" (한국어 수업=clase de coreano, 있어요=hay/es).',
            answer: '오후 여섯 시 사십오 분에 한국어 수업이 있어요.',
            accepted: ['여섯 시 사십오 분', '여섯 시', '오후 여섯'],
            explain: '여섯 시(6h, nativo) + 사십오 분(45min, sino-coreano). 오후 = PM.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Describe tu horario del día usando horas y minutos en coreano.',
        type: 'write',
        items: [
          {
            scene: 'Mi mañana',
            prompt: 'Di a qué hora te levantas y desayunas: 오전 ___ 시에 ___. 그리고 ___ 시에 ___.',
            answer: '오전 일곱 시에 일어나요. 그리고 여덟 시에 아침을 먹어요.',
            accepted: ['오전', '시에', '일어나요', '먹어요'],
            explain: 'Usa 오전 + hora (nativa) + 시에 + verbo.',
          },
          {
            scene: 'Mi tarde',
            prompt: 'Di a qué hora tienes clase o trabajo por la tarde: 오후 ___ 시 ___ 분에 ___.',
            answer: '오후 두 시 삼십 분에 수업이 있어요.',
            accepted: ['오후', '시', '분에', '있어요'],
            explain: 'Oración completa: 오후 + hora (nativa) + 시 + minutos (sino-coreano) + 분에 + verbo.',
          },
          {
            scene: 'Preguntando la hora',
            prompt: 'Pregunta la hora y responde con "Son las 4 y media de la tarde".',
            answer: '몇 시예요? — 오후 네 시 반이에요.',
            accepted: ['몇 시예요', '오후 네 시 반', '네 시 반'],
            explain: '몇 시예요? = pregunta. 오후 네 시 반 = 4:30 PM (네 시 + 반).',
          },
        ],
      },
    ],
  },
}

export default topic
