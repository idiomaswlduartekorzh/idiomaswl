/** Metadata per step — titles, grammar topics, vocab, and SEO data.
 *  Used by page.tsx (metadata), LessonRuntime (header), and GrammarDeep sections.
 */

export interface StepMeta {
  /** Narrative episode title for the <h1> */
  episodeTitle: string;
  /** Short subtitle shown as badge  */
  grammarLabel: string;
  /** List of grammar/culture topics covered */
  topics: string[];
  /** Key vocabulary words (Korean characters) shown as chips */
  vocab: string[];
  /** <title> tag optimised for Google */
  seoTitle: string;
  /** <meta description> */
  seoDescription: string;
  /** Extra keywords */
  seoKeywords: string[];
}

export const KOREAN_STEPS: Record<number, StepMeta> = {
  1: {
    episodeTitle: '어디 가요? · Primeros pasos en Seúl',
    grammarLabel: 'Gramática · Día 1',
    topics: ['Orden S-O-V', 'Partícula 에', '저는 vs 나는', 'Sin artículos'],
    vocab: ['학교', '대학교', '집', '가요', '저는', '어디'],
    seoTitle: 'Orden SOV coreano y partícula 에: primeras frases | IdiomasWL',
    seoDescription:
      'Aprende el orden de palabras del coreano (SOV), la partícula de dirección 에, y cómo decir "yo" en formal e informal. Primeras frases: 저는 학교에 가요.',
    seoKeywords: [
      'orden de palabras coreano',
      'partícula e coreano',
      'sov coreano español',
      'jeoneun vs naneun',
      'aprender coreano básico',
      'coreano para hispanohablantes',
    ],
  },
  2: {
    episodeTitle: '글자 보여요 · El Hangul cobra vida',
    grammarLabel: 'Gramática · Día 2',
    topics: ['Vocales y consonantes', 'Bloques silábicos', 'Lectura básica'],
    vocab: ['글자', '보여요', '어제', '오늘', '이제', '조금'],
    seoTitle: 'Aprender Hangul: vocales, consonantes y bloques silábicos | IdiomasWL',
    seoDescription:
      'Guía completa para aprender el alfabeto coreano Hangul. Vocales, consonantes y cómo se forman los bloques silábicos. Empieza a leer coreano desde el primer día.',
    seoKeywords: [
      'aprender hangul',
      'alfabeto coreano',
      'letras coreanas',
      'como leer coreano',
      'hangul para principiantes',
    ],
  },
  3: {
    episodeTitle: '아메리카노 한 잔 주세요 · El café de Haeun',
    grammarLabel: 'Gramática · Día 3',
    topics: ['Forma -요 (cortesía)', '주세요 (petición)', 'Saludos formales', 'Loanwords 외래어'],
    vocab: ['주세요', '안녕하세요', '감사합니다', '여기요', '얼마예요', '이름'],
    seoTitle: '주세요 coreano: pedir en un café, saludos formales y cortesía | IdiomasWL',
    seoDescription:
      'Aprende a pedir en un café coreano con 주세요. Saludos formales (안녕하세요), gracias (감사합니다), cómo preguntar el precio y sobrevivir tu primer día en Seúl.',
    seoKeywords: [
      'juseyo coreano',
      'annyeonghaseyo',
      'saludos en coreano',
      'pedir en cafetería coreana',
      'cortesía coreana',
    ],
  },
  4: {
    episodeTitle: '호떡 하나 주세요 · Mercado callejero',
    grammarLabel: 'Gramática · Día 4',
    topics: ['Números nativos (하나/둘)', 'Adjetivos descriptivos', '맛있어요 / 뜨거워요'],
    vocab: ['호떡', '하나', '맛있어요', '뜨거워요', '조심하세요', '길거리'],
    seoTitle: 'Números nativos en coreano: hana dul set — mercado callejero | IdiomasWL',
    seoDescription:
      'Aprende los números nativos del coreano (하나, 둘, 셋...) con contexto real en el mercado callejero. Adjetivos de sabor y temperatura. Ordena comida como un local.',
    seoKeywords: [
      'números nativos coreano',
      'hana dul set coreano',
      'contar en coreano',
      'adjetivos coreano',
      'mercado coreano frases',
    ],
  },
  5: {
    episodeTitle: '여기 있습니다 · Pago y despedida',
    grammarLabel: 'Gramática · Día 5',
    topics: ['-습니다 (formal máximo)', 'Números sino-coreanos', '얼마예요 (precio)', 'Direcciones'],
    vocab: ['여기 있습니다', '얼마예요', '잘 먹었습니다', '실례합니다', '화장실', '칠천 원'],
    seoTitle: 'Cómo pagar en coreano: 얼마예요, números sino-coreanos y -습니다 | IdiomasWL',
    seoDescription:
      'Aprende a preguntar precios en coreano (얼마예요), usar los números sino-coreanos para won, y el nivel de formalidad máximo -습니다. Frases esenciales para transacciones en Corea.',
    seoKeywords: [
      'eolmayeyo precio coreano',
      'numeros sino-coreanos',
      'formalidad seumnida coreano',
      'pagar en coreano',
      'frases utiles corea',
    ],
  },
  6: {
    episodeTitle: '새로 왔어요? · Primer día en el campus',
    grammarLabel: 'Gramática · Día 6',
    topics: ['Cópula 이에요/예요', '-ㄹ래요 (invitación)', '어때요 (¿qué tal?)', 'Nacionalidades'],
    vocab: ['새로 왔어요', '이에요/예요', '어때요', '마실래요', '반갑습니다', '사람'],
    seoTitle: '이에요 예요 diferencia: cópula coreana y -ㄹ래요 para invitar | IdiomasWL',
    seoDescription:
      'Aprende la diferencia entre 이에요 y 예요 en coreano, cómo invitar con -ㄹ래요 y preguntar ¿qué tal? con 어때요. Presentaciones y frases para conocer gente en Corea.',
    seoKeywords: [
      'ieyo yeyo diferencia coreano',
      'copula coreana',
      'eottaeyo coreano',
      'presentarse en coreano',
      'invitar en coreano',
    ],
  },
  7: {
    episodeTitle: '한국 생활 어때요? · Rutina universitaria',
    grammarLabel: 'Gramática · Día 7',
    topics: ['에서 vs 에 (lugar de acción)', 'Verbos 하다', '씨 (honorífico)', '좋아해요'],
    vocab: ['에서', '공부해요', '일해요', '좋아해요', '생활', '씨'],
    seoTitle: '에서 vs 에 coreano: verbos con hada y vida universitaria | IdiomasWL',
    seoDescription:
      'Aprende la diferencia entre las partículas 에서 y 에 en coreano, los verbos con 하다 (공부하다, 일하다) y el honorífico 씨. Habla de tu rutina diaria en coreano.',
    seoKeywords: [
      'eseo vs e coreano',
      'partícula eseo coreano',
      'verbos hada coreano',
      'ssi honorífico coreano',
      'rutina diaria coreano',
    ],
  },
};
