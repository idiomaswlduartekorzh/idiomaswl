export type LanguageSlug = 'ingles' | 'coreano' | 'frances' | 'aleman' |
  'italiano' | 'portugues' | 'japones' | 'ruso';

export type Question = {
  id: string;
  prompt: string;
  options: readonly [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
};

export type QuickPracticeSet = {
  slug: LanguageSlug;
  title: string;
  code: string;
  questions: readonly Question[];
};

// Original, short A1 pilot content. The full WeLearn curriculum remains on the website.
export const QUICK_PRACTICE: readonly QuickPracticeSet[] = [
  {
    slug: 'ingles', title: 'Inglés', code: 'EN', questions: [
      { id: 'en-1', prompt: 'Completa: I ___ from Colombia.', options: ['is', 'am', 'are', 'be'], answer: 1,
        explanation: 'Con “I” usamos “am”: I am from Colombia.' },
      { id: 'en-2', prompt: '¿Qué significa “book”?', options: ['Mesa', 'Bolígrafo', 'Libro', 'Puerta'], answer: 2,
        explanation: '“Book” significa “libro”.' },
      { id: 'en-3', prompt: 'Completa: They ___ at home.', options: ['are', 'am', 'is', 'be'], answer: 0,
        explanation: 'Con “they” usamos “are”: They are at home.' },
      { id: 'en-4', prompt: '¿Cómo se dice “Buenos días”?', options: ['Good night', 'Good morning', 'Goodbye', 'Good luck'], answer: 1,
        explanation: '“Good morning” es el saludo de la mañana.' },
      { id: 'en-5', prompt: 'Elige la pregunta “¿Cómo te llamas?”',
        options: ['Where are you?', 'How old are you?', 'What is your name?', 'How are you?'], answer: 2,
        explanation: '“What is your name?” pregunta por el nombre de una persona.' },
    ],
  },
  {
    slug: 'coreano', title: 'Coreano', code: 'KO', questions: [
      { id: 'ko-1', prompt: '¿Qué significa “안녕하세요”?', options: ['Gracias', 'Hola', 'Adiós', 'Perdón'], answer: 1,
        explanation: '“안녕하세요” (annyeonghaseyo) es un saludo cortés.' },
      { id: 'ko-2', prompt: '¿Qué significa “감사합니다”?', options: ['Gracias', 'Por favor', 'Sí', 'Buenos días'], answer: 0,
        explanation: '“감사합니다” (gamsahamnida) expresa agradecimiento.' },
      { id: 'ko-3', prompt: '¿Qué significa “물”?', options: ['Comida', 'Casa', 'Agua', 'Libro'], answer: 2,
        explanation: '“물” (mul) significa “agua”.' },
      { id: 'ko-4', prompt: '¿Qué significa “저는 학생입니다”?',
        options: ['Soy profesor', 'Soy estudiante', 'Tengo un libro', 'Voy a casa'], answer: 1,
        explanation: '“저는 학생입니다” significa “Soy estudiante” en estilo formal.' },
      { id: 'ko-5', prompt: '¿Qué significa “네”?', options: ['No', 'Hola', 'Sí', 'Gracias'], answer: 2,
        explanation: '“네” (ne) se usa para decir “sí”.' },
    ],
  },
  {
    slug: 'frances', title: 'Francés', code: 'FR', questions: [
      { id: 'fr-1', prompt: 'Completa: Je ___ français.', options: ['parles', 'parlons', 'parle', 'parlent'], answer: 2,
        explanation: 'Con “je”, el presente de “parler” es “parle”.' },
      { id: 'fr-2', prompt: 'Completa: Nous ___ à Paris.', options: ['sommes', 'suis', 'es', 'est'], answer: 0,
        explanation: 'Con “nous”, el verbo “être” toma la forma “sommes”.' },
      { id: 'fr-3', prompt: '¿Qué significa “merci”?', options: ['Por favor', 'Gracias', 'Perdón', 'Adiós'], answer: 1,
        explanation: '“Merci” significa “gracias”.' },
      { id: 'fr-4', prompt: '¿Qué significa “le livre”?', options: ['La mesa', 'El libro', 'La escuela', 'El lápiz'], answer: 1,
        explanation: '“Le livre” significa “el libro”.' },
      { id: 'fr-5', prompt: 'Completa: Elle ___ une sœur.', options: ['ai', 'as', 'a', 'avons'], answer: 2,
        explanation: 'Con “elle”, el verbo “avoir” toma la forma “a”.' },
    ],
  },
  {
    slug: 'aleman', title: 'Alemán', code: 'DE', questions: [
      { id: 'de-1', prompt: 'Completa: Ich ___ aus Kolumbien.', options: ['kommt', 'kommst', 'kommen', 'komme'], answer: 3,
        explanation: 'Con “ich”, el verbo “kommen” toma la forma “komme”.' },
      { id: 'de-2', prompt: 'Completa: Wir ___ Deutsch.', options: ['lernt', 'lerne', 'lernen', 'lernst'], answer: 2,
        explanation: 'Con “wir”, el verbo “lernen” conserva la forma “lernen”.' },
      { id: 'de-3', prompt: '¿Qué significa “Danke”?', options: ['Gracias', 'Hola', 'Por favor', 'Adiós'], answer: 0,
        explanation: '“Danke” significa “gracias”.' },
      { id: 'de-4', prompt: '¿Qué significa “das Buch”?', options: ['La casa', 'El libro', 'La mesa', 'El agua'], answer: 1,
        explanation: '“Das Buch” significa “el libro”.' },
      { id: 'de-5', prompt: 'Completa: Er ___ Lehrer.', options: ['bin', 'sind', 'ist', 'bist'], answer: 2,
        explanation: 'Con “er”, el verbo “sein” toma la forma “ist”.' },
    ],
  },
  {
    slug: 'italiano', title: 'Italiano', code: 'IT', questions: [
      { id: 'it-1', prompt: 'Completa: Io ___ italiano.', options: ['parlo', 'parli', 'parla', 'parliamo'], answer: 0,
        explanation: 'Con “io”, el verbo “parlare” toma la forma “parlo”.' },
      { id: 'it-2', prompt: '¿Qué significa “buongiorno”?', options: ['Buenas noches', 'Buenos días', 'Hasta luego', 'Gracias'], answer: 1,
        explanation: '“Buongiorno” es un saludo diurno, como “buenos días”.' },
      { id: 'it-3', prompt: '¿Qué significa “la casa”?', options: ['La casa', 'La clase', 'La calle', 'La comida'], answer: 0,
        explanation: '“La casa” tiene el mismo significado que en español.' },
      { id: 'it-4', prompt: 'Completa: Noi ___ a Roma.', options: ['sono', 'sei', 'siamo', 'siete'], answer: 2,
        explanation: 'Con “noi”, el verbo “essere” toma la forma “siamo”.' },
      { id: 'it-5', prompt: '¿Qué significa “Ho fame”?', options: ['Tengo frío', 'Tengo hambre', 'Tengo sueño', 'Tengo sed'], answer: 1,
        explanation: '“Ho fame” expresa que tienes hambre.' },
    ],
  },
  {
    slug: 'portugues', title: 'Portugués', code: 'PT', questions: [
      { id: 'pt-1', prompt: 'Completa: Eu ___ português.', options: ['falamos', 'fala', 'falo', 'falam'], answer: 2,
        explanation: 'Con “eu”, el verbo “falar” toma la forma “falo”.' },
      { id: 'pt-2', prompt: '¿Qué significa “bom dia”?', options: ['Buenas noches', 'Buenos días', 'Gracias', 'Hasta mañana'], answer: 1,
        explanation: '“Bom dia” es el saludo de la mañana.' },
      { id: 'pt-3', prompt: 'Completa: Nós ___ estudantes.', options: ['sou', 'é', 'são', 'somos'], answer: 3,
        explanation: 'Con “nós”, el verbo “ser” toma la forma “somos”.' },
      { id: 'pt-4', prompt: '¿Qué significa “água”?', options: ['Agua', 'Aire', 'Leche', 'Comida'], answer: 0,
        explanation: '“Água” significa “agua”.' },
      { id: 'pt-5', prompt: '¿Qué pregunta “Onde você mora?”',
        options: ['¿Cómo te llamas?', '¿Dónde vives?', '¿Cuántos años tienes?', '¿Adónde vas?'], answer: 1,
        explanation: '“Onde você mora?” pregunta dónde vive una persona.' },
    ],
  },
  {
    slug: 'japones', title: 'Japonés', code: 'JA', questions: [
      { id: 'ja-1', prompt: '¿Qué significa “こんにちは”?', options: ['Gracias', 'Hola', 'Adiós', 'Sí'], answer: 1,
        explanation: '“こんにちは” (konnichiwa) es un saludo usado durante el día.' },
      { id: 'ja-2', prompt: '¿Qué significa “ありがとう”?', options: ['Por favor', 'Gracias', 'No', 'Buenas noches'], answer: 1,
        explanation: '“ありがとう” (arigatō) expresa agradecimiento.' },
      { id: 'ja-3', prompt: '¿Qué significa “水（みず）”?', options: ['Casa', 'Agua', 'Comida', 'Libro'], answer: 1,
        explanation: '“水” se lee “mizu” y significa “agua”.' },
      { id: 'ja-4', prompt: '¿Qué significa “私は学生です”?',
        options: ['Soy estudiante', 'Soy profesor', 'Voy a la escuela', 'Tengo un libro'], answer: 0,
        explanation: '“私は学生です” (watashi wa gakusei desu) significa “Soy estudiante”.' },
      { id: 'ja-5', prompt: '¿Qué significa “はい”?', options: ['No', 'Sí', 'Gracias', 'Hola'], answer: 1,
        explanation: '“はい” (hai) se usa para responder “sí”.' },
    ],
  },
  {
    slug: 'ruso', title: 'Ruso', code: 'RU', questions: [
      { id: 'ru-1', prompt: '¿Qué significa “Привет”?', options: ['Hola', 'Adiós', 'Gracias', 'Perdón'], answer: 0,
        explanation: '“Привет” (privet) es un saludo informal.' },
      { id: 'ru-2', prompt: '¿Qué significa “Спасибо”?', options: ['Por favor', 'Gracias', 'Sí', 'Buenos días'], answer: 1,
        explanation: '“Спасибо” (spasibo) significa “gracias”.' },
      { id: 'ru-3', prompt: '¿Qué significa “вода”?', options: ['Libro', 'Casa', 'Agua', 'Comida'], answer: 2,
        explanation: '“Вода” (vodá) significa “agua”.' },
      { id: 'ru-4', prompt: '¿Qué significa “Я студент”?',
        options: ['Tengo un estudiante', 'Soy estudiante', 'Veo al estudiante', 'Voy a estudiar'], answer: 1,
        explanation: '“Я студент” significa “Soy estudiante” si habla un hombre.' },
      { id: 'ru-5', prompt: '¿Qué significa “Да”?', options: ['No', 'Gracias', 'Sí', 'Hola'], answer: 2,
        explanation: '“Да” (da) se usa para decir “sí”.' },
    ],
  },
];

export function quickPracticeFor(slug: LanguageSlug): QuickPracticeSet {
  const set = QUICK_PRACTICE.find((item) => item.slug === slug);
  if (!set) throw new Error(`No quick practice for ${slug}`);
  return set;
}
