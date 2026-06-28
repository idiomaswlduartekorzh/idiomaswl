import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'hangul-basico',
  order: '01',
  color: '#c60c30',
  category: 'Escritura',
  level: 'A1',
  title: 'El Hangeúl Básico: Vocales y Consonantes del Coreano A1',
  shortTitle: 'Hangeúl básico',
  metaTitle: 'Hangeúl básico coreano A1 — vocales y consonantes esenciales',
  description:
    'El hangeúl (한글) es el sistema de escritura del coreano, creado en 1443 por el rey Sejong. A diferencia del chino o japonés, no es ideográfico sino alfabético: tiene 14 consonantes y 10 vocales básicas que se combinan en sílabas. Aprenderlo en 1-2 semanas es totalmente posible.',
  lead: 'El hangeúl es un alfabeto científico con reglas claras: 10 vocales + 14 consonantes que se agrupan en bloques silábicos. Se puede aprender en días.',
  outcomes: ['Reconoce las 10 vocales básicas', 'Reconoce las 14 consonantes básicas', 'Lee sílabas simples en hangeúl'],

  guide: {
    goal: 'Reconocer y leer las vocales y consonantes básicas del hangeúl coreano.',
    model: '가 나 다 라 마 바 사 아 자 차 카 타 파 하',
    formula: 'Consonante inicial (초성) + Vocal (중성) [+ Consonante final (종성)]',
    decisions: [
      'Cada sílaba es un bloque: 가 = ㄱ(g) + ㅏ(a)',
      '10 vocales básicas: ㅏ(a) ㅓ(eo) ㅗ(o) ㅜ(u) ㅡ(eu) ㅣ(i) ㅐ(ae) ㅔ(e) ㅚ(oe) ㅟ(wi)',
      '14 consonantes básicas: ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ',
      'ㅇ (ieung) al inicio de sílaba es muda: 아 = solo la vocal /a/',
      'La pronunciación cambia según la posición (inicial, final) — se aprende progresivamente',
    ],
    table: [
      ['Vocal', 'Romanización', 'Pronunciación aprox.'],
      ['ㅏ', 'a', 'como en "mamá"'],
      ['ㅓ', 'eo', 'como "o" breve'],
      ['ㅗ', 'o', 'como "o" española'],
      ['ㅜ', 'u', 'como "u" española'],
      ['ㅡ', 'eu', 'entre "i" y "u"'],
      ['ㅣ', 'i', 'como "i" española'],
    ],
    mistakes: [
      'ㄹ no es ni "r" ni "l" — es un sonido intermedio entre los dos',
      'ㅓ (eo) NO es "eo" español — se pronuncia como una "o" corta y relajada',
      'La consonante ㅇ al inicio de sílaba es MUDA: 아 = /a/ (no "ng")',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el hangeúl y por qué aprenderlo es fácil?',
      paragraphs: [
        'El hangeúl (한글) es el sistema de escritura oficial del coreano, inventado en 1443 por el rey Sejong de la dinastía Joseon con el propósito explícito de que fuera fácil de aprender. A diferencia del chino (miles de caracteres) o el japonés (tres sistemas), el hangeúl es un alfabeto fonético con solo 24 letras básicas (14 consonantes + 10 vocales).',
        'La característica más innovadora del hangeúl es que las letras se agrupan en bloques silábicos. Por ejemplo, la sílaba 한 combina ㅎ (h) + ㅏ (a) + ㄴ (n). Esto hace que la escritura sea compacta y reconocible. La mayoría de hispanohablantes pueden leer hangeúl básico en menos de una semana.',
      ],
    },
    {
      heading: 'Las 10 vocales básicas del hangeúl',
      paragraphs: [
        'Las 10 vocales básicas del hangeúl son: ㅏ (a), ㅓ (eo), ㅗ (o), ㅜ (u), ㅡ (eu), ㅣ (i), ㅐ (ae), ㅔ (e), ㅚ (oe), ㅟ (wi). Están agrupadas en simples y compuestas.',
        'Las más frecuentes son ㅏ, ㅓ, ㅗ, ㅜ, ㅣ. Un truco visual: las vocales con línea vertical (ㅏ ㅓ ㅣ) se escriben a la derecha de la consonante; las de línea horizontal (ㅗ ㅜ ㅡ) van debajo.',
      ],
      table: [
        ['Hangeúl', 'Romanización', 'Hangeúl'],
        ['ㅏ', 'a', 'ㅓ'],
        ['ㅗ', 'o', 'ㅜ'],
        ['ㅡ', 'eu', 'ㅣ'],
        ['ㅐ', 'ae', 'ㅔ'],
      ],
    },
    {
      heading: 'Las 14 consonantes básicas del hangeúl',
      paragraphs: [
        'Las 14 consonantes básicas son: ㄱ(g/k), ㄴ(n), ㄷ(d/t), ㄹ(r/l), ㅁ(m), ㅂ(b/p), ㅅ(s), ㅇ(ng/mudo), ㅈ(j), ㅊ(ch), ㅋ(k), ㅌ(t), ㅍ(p), ㅎ(h).',
        'La consonante ㅇ (ieung) tiene una función doble: al inicio de sílaba es completamente muda (sirve de marcador de posición cuando la sílaba empieza por vocal: 아=a, 이=i), y al final de sílaba suena como /ng/.',
      ],
    },
    {
      heading: 'Cómo se forman las sílabas en hangeúl',
      paragraphs: [
        'Cada sílaba en coreano es un bloque que contiene: una consonante inicial (초성), una vocal (중성) y opcionalmente una consonante final (종성, llamada batchim). La estructura básica es: consonante + vocal → 가 (ga), 나 (na), 다 (da).',
        'Con batchim (consonante final): 밥 (bap = arroz) = ㅂ+ㅏ+ㅂ; 한 (han) = ㅎ+ㅏ+ㄴ. El batchim afecta la pronunciación de la siguiente sílaba por el fenómeno de enlace (연음).',
      ],
    },
    {
      heading: 'Estrategia para aprender hangeúl rápidamente',
      paragraphs: [
        'Método recomendado para hispanohablantes: (1) Aprende las 5 vocales principales (ㅏ ㅓ ㅗ ㅜ ㅣ) el primer día. (2) Aprende las consonantes de 3 en 3, creando sílabas combinando cada consonante con las vocales conocidas. (3) Practica leyendo palabras prestadas del inglés que aparecen en coreano (pizza = 피자, coffee = 커피).',
        'No trates de memorizar las consonantes de manera abstracta — combínalas siempre con vocales para formar sílabas reales desde el primer momento.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Hangeúl básico: vocales y consonantes con ejemplos de palabras cotidianas.',
    graphicPrompt: 'Tabla del hangeúl con las letras básicas y palabras de ejemplo.',
    scene: [
      ['ㅏ (a)', '아이 (ai = niño), 사랑 (sarang = amor)'],
      ['ㅓ (eo)', '어디 (eodi = dónde?), 서울 (Seoul = Seúl)'],
      ['ㅗ (o)', '오늘 (oneul = hoy), 고양이 (goyangi = gato)'],
      ['ㅜ (u)', '우리 (uri = nosotros), 물 (mul = agua)'],
      ['ㅣ (i)', '이름 (ireum = nombre), 피자 (pija = pizza)'],
      ['ㄱ (g/k)', '가다 (gada = ir), 고맙다 (gomapda = gracias)'],
      ['ㄴ (n)', '나 (na = yo), 네 (ne = sí)'],
      ['ㅎ (h)', '한국 (Hanguk = Corea), 한글 (hangeúl)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['vocales básicas', 'consonantes básicas', 'lectura de sílabas simples'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Reconocimiento',
        tag: 'Opción múltiple',
        intro: 'Identifica qué vocal o consonante corresponde a cada romanización.',
        type: 'choice',
        items: [
          { scene: 'Vocales del hangeúl', lines: [['', '¿Qué símbolo del hangeúl corresponde a la vocal "a"?']], options: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅣ'], answer: 'ㅏ', explain: 'ㅏ = "a" como en "mamá".' },
          { scene: 'Vocales del hangeúl', lines: [['', '¿Qué símbolo corresponde a la vocal "o"?']], options: ['ㅗ', 'ㅓ', 'ㅏ', 'ㅜ'], answer: 'ㅗ', explain: 'ㅗ = "o" española.' },
          { scene: 'Consonantes del hangeúl', lines: [['', '¿Qué consonante es el sonido "m"?']], options: ['ㅁ', 'ㅂ', 'ㅍ', 'ㅅ'], answer: 'ㅁ', explain: 'ㅁ = /m/. Parece una caja cerrada.' },
          { scene: 'Consonantes del hangeúl', lines: [['', '¿Qué consonante es el sonido "n"?']], options: ['ㄴ', 'ㄷ', 'ㄹ', 'ㅇ'], answer: 'ㄴ', explain: 'ㄴ = /n/. Parece la letra "L" rotada.' },
          { scene: 'Consonantes del hangeúl', lines: [['', '¿Qué consonante es MUDA al inicio de sílaba?']], options: ['ㅇ', 'ㅎ', 'ㄱ', 'ㄴ'], answer: 'ㅇ', explain: 'ㅇ (ieung) es muda al inicio: 아 = /a/. Al final suena /ng/.' },
          { scene: 'Leyendo sílabas', lines: [['', '¿Cómo se lee la sílaba 가?']], options: ['ga', 'na', 'da', 'ha'], answer: 'ga', explain: '가 = ㄱ(g) + ㅏ(a) = "ga".' },
          { scene: 'Leyendo sílabas', lines: [['', '¿Cómo se lee la sílaba 이?']], options: ['i', 'eu', 'ae', 'o'], answer: 'i', explain: '이 = ㅇ(mudo) + ㅣ(i) = "i".' },
          { scene: 'Vocales del hangeúl', lines: [['', '¿Cuál es la vocal del hangeúl para el sonido "u"?']], options: ['ㅜ', 'ㅡ', 'ㅗ', 'ㅏ'], answer: 'ㅜ', explain: 'ㅜ = "u". La línea apunta hacia abajo (como caída).' },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Lectura de sílabas',
        tag: '2 espacios',
        intro: 'Lee estas sílabas y elige la romanización correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '나 = [[0]] y 마 = [[1]]']],
            blanks: [
              { options: ['na', 'ma', 'da', 'ra'], answer: 'na', explain: '나 = ㄴ(n) + ㅏ(a) = "na".' },
              { options: ['ma', 'na', 'ba', 'sa'], answer: 'ma', explain: '마 = ㅁ(m) + ㅏ(a) = "ma".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '오 = [[0]] y 우 = [[1]]']],
            blanks: [
              { options: ['o', 'u', 'eo', 'eu'], answer: 'o', explain: '오 = ㅇ(mudo) + ㅗ(o) = "o".' },
              { options: ['u', 'o', 'eu', 'i'], answer: 'u', explain: '우 = ㅇ(mudo) + ㅜ(u) = "u".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '하 = [[0]] y 사 = [[1]]']],
            blanks: [
              { options: ['ha', 'sa', 'na', 'ja'], answer: 'ha', explain: '하 = ㅎ(h) + ㅏ(a) = "ha".' },
              { options: ['sa', 'ha', 'ja', 'cha'], answer: 'sa', explain: '사 = ㅅ(s) + ㅏ(a) = "sa".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '바 = [[0]] y 파 = [[1]]']],
            blanks: [
              { options: ['ba', 'pa', 'ma', 'na'], answer: 'ba', explain: '바 = ㅂ(b) + ㅏ(a) = "ba".' },
              { options: ['pa', 'ba', 'ma', 'ha'], answer: 'pa', explain: '파 = ㅍ(p) + ㅏ(a) = "pa".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Lee estas palabras básicas del coreano y completa la romanización.',
        type: 'guidedText',
        scene: 'Lee estas palabras básicas del coreano y completa la romanización.',
        text: '나 [[0]] (yo) / 너 [[1]] (tú) / 우리 [[2]] (nosotros) / 이름 [[3]] (nombre) / 한국 [[4]] (Corea) / 물 [[5]] (agua) / 밥 [[6]] (arroz/comida)',
        blanks: [
          { options: ['na', 'ma', 'da', 'la'], answer: 'na', explain: '나 = ㄴ+ㅏ = na.' },
          { options: ['neo', 'no', 'nu', 'ni'], answer: 'neo', explain: '너 = ㄴ+ㅓ = neo (vocal eo).' },
          { options: ['uri', 'uli', 'ugi', 'ubi'], answer: 'uri', explain: '우리 = ㅜ+ㄹ+ㅣ = u-ri = uri.' },
          { options: ['ireum', 'irum', 'ileum', 'ilum'], answer: 'ireum', explain: '이름 = 이(i)+름(reum) = ireum.' },
          { options: ['Hanguk', 'Hangug', 'Hangul', 'Hangug'], answer: 'Hanguk', explain: '한국 = 한(han)+국(guk) = Hanguk.' },
          { options: ['mul', 'mol', 'mal', 'mel'], answer: 'mul', explain: '물 = ㅁ+ㅜ+ㄹ = mul.' },
          { options: ['bap', 'bab', 'bam', 'ban'], answer: 'bap', explain: '밥 = ㅂ+ㅏ+ㅂ = bap (b final suena más como p).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la romanización correcta de estas palabras coreanas frecuentes.',
        type: 'freeText',
        scene: 'Escribe la romanización correcta de estas palabras coreanas frecuentes.',
        text: '안녕하세요 = [[0]] (hola formal) / 감사합니다 = [[1]] (gracias formal) / 네 = [[2]] (sí) / 아니요 = [[3]] (no) / 한국어 = [[4]] (lengua coreana)',
        blanks: [
          { answer: 'annyeonghaseyo', accepted: ['annyeonghaseyo', 'annyeong haseyo'], explain: '안녕하세요 = an-nyeong-ha-se-yo.' },
          { answer: 'gamsahamnida', accepted: ['gamsahamnida', 'gamsa hamnida'], explain: '감사합니다 = gam-sa-ham-ni-da.' },
          { answer: 'ne', accepted: ['ne', 'nae'], explain: '네 = ne (sí).' },
          { answer: 'aniyo', accepted: ['aniyo', 'a-ni-yo'], explain: '아니요 = a-ni-yo.' },
          { answer: 'hangugeo', accepted: ['hangugeo', 'hanguk-eo', 'han-gug-eo'], explain: '한국어 = han-gug-eo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe en romanización o hangeúl estas palabras cotidianas.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe "hola" en coreano (saludo informal entre amigos).',
            answer: '안녕 (annyeong)',
            accepted: ['annyeong', '안녕'],
            explain: '안녕 = annyeong = hola informal. 안녕하세요 es la versión formal.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe "gracias" en coreano (forma corta informal).',
            answer: '고마워 (gomawo)',
            accepted: ['gomawo', '고마워', 'gamsahamnida', '감사합니다'],
            explain: '고마워 = gomawo (informal). 감사합니다 = gamsahamnida (formal).',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe "yo" en coreano.',
            answer: '나 (na)',
            accepted: ['na', '나', 'je', '저'],
            explain: '나 = na (informal), 저 = jeo (formal/humilde).',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe "Corea" en coreano y en romanización.',
            answer: '한국 (Hanguk)',
            accepted: ['hanguk', '한국'],
            explain: '한국 = Hanguk = Corea del Sur. 조선 = Joseon (histórico). 코리아 = Koria (extranjerismo).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Escribe una presentación básica en coreano con las frases que conoces.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di "hola" en coreano (puedes escribir en hangeúl o en romanización).',
            answer: '안녕하세요 (annyeonghaseyo)',
            accepted: ['annyeonghaseyo', '안녕하세요', 'annyeong', '안녕'],
            explain: 'Formal: 안녕하세요 (annyeonghaseyo). Informal: 안녕 (annyeong).',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di tu nombre: "Me llamo ___" en coreano: "저는 ___ 이에요/예요".',
            answer: '저는 Ana예요. (Jeo-neun Ana ye-yo)',
            accepted: ['저는', 'jeo-neun', 'jeoneun', '이에요', '예요', 'ieyo', 'yeyo'],
            explain: '저는 = yo (topic marker). 이름이 뭐예요? = ¿Cómo te llamas? 저는 [nombre]이에요/예요.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di "gracias" y "de nada" en coreano.',
            answer: '감사합니다! 천만에요. (Gamsahamnida! Cheonmaneyo.)',
            accepted: ['gamsahamnida', '감사합니다', 'gomawo', '고마워', 'cheonmaneyo', '천만에요'],
            explain: '감사합니다 = gracias formal. 천만에요 = de nada. 고마워 = gracias informal.',
          },
        ],
      },
    ],
  },
}

export default topic
