// Idiomas WeLearn — shared data (ported from prototype/idiomaswl/data.jsx)

export interface Idioma {
  code: string;
  name: string;
  native: string;
  flag: string;
  lessons: number;
  level: string;
  slug: string;
}

export interface VocabWord {
  glyph: string;
  roman: string;
  mean: string;
  emoji: string;
}

export interface Paso {
  n: string;
  name: string;
  desc: string;
  time: string;
}

export interface Examen {
  code: string;
  name: string;
  lang: string;
  sessions: string;
  mock: string;
  focus: string;
}

// Language slug → language code mapping
export const SLUG_TO_CODE: Record<string, string> = {
  ingles: 'en',
  coreano: 'ko',
  japones: 'ja',
  italiano: 'it',
  frances: 'fr',
  aleman: 'de',
  portugues: 'pt',
  ruso: 'ru',
  // English slug alternatives
  english: 'en',
  korean: 'ko',
  japanese: 'ja',
  italian: 'it',
  french: 'fr',
  german: 'de',
  portuguese: 'pt',
  russian: 'ru',
};

export const IDIOMAS: Idioma[] = [
  { code: 'en', name: 'Inglés', native: 'English', flag: 'En', lessons: 180, level: 'A1 – C2', slug: 'ingles' },
  { code: 'ko', name: 'Coreano', native: '한국어', flag: '한', lessons: 120, level: 'A1 – B2', slug: 'coreano' },
  { code: 'ja', name: 'Japonés', native: '日本語', flag: '日', lessons: 140, level: 'A1 – B2', slug: 'japones' },
  { code: 'it', name: 'Italiano', native: 'Italiano', flag: 'It', lessons: 96, level: 'A1 – C1', slug: 'italiano' },
  { code: 'fr', name: 'Francés', native: 'Français', flag: 'Fr', lessons: 108, level: 'A1 – C1', slug: 'frances' },
  { code: 'de', name: 'Alemán', native: 'Deutsch', flag: 'De', lessons: 110, level: 'A1 – C1', slug: 'aleman' },
  { code: 'pt', name: 'Portugués', native: 'Português', flag: 'Pt', lessons: 92, level: 'A1 – C1', slug: 'portugues' },
  { code: 'ru', name: 'Ruso', native: 'Русский', flag: 'Ру', lessons: 88, level: 'A1 – B2', slug: 'ruso' },
];

export const EXAMENES: Examen[] = [
  { code: 'toefl', name: 'TOEFL', lang: 'Inglés · iBT', sessions: '8 semanas', mock: '12 simulacros', focus: 'Academic' },
  { code: 'ielts', name: 'IELTS', lang: 'Inglés · Academic & General', sessions: '8 semanas', mock: '10 simulacros', focus: 'Band 7+' },
  { code: 'icfes', name: 'ICFES', lang: 'Inglés · Saber 11', sessions: '12 semanas', mock: '20 simulacros', focus: 'Colombia' },
  { code: 'goethe', name: 'Goethe', lang: 'Alemán · A1 – C2', sessions: '10 semanas', mock: '8 simulacros', focus: 'Zertifikat' },
  { code: 'delf', name: 'DELF/DALF', lang: 'Francés · A1 – C2', sessions: '10 semanas', mock: '8 simulacros', focus: 'Officiel' },
  { code: 'cils', name: 'CILS', lang: 'Italiano · A1 – C2', sessions: '10 semanas', mock: '6 simulacros', focus: 'Certificazione' },
];

export const PASOS: Paso[] = [
  { n: '01', name: 'Activación', desc: 'Introducción al vocabulario nuevo con imagen, audio y forma escrita.', time: '6 min' },
  { n: '02', name: 'Adquisición guiada', desc: 'Quiz inicial que integra el vocabulario nuevo con palabras ya conocidas.', time: '8 min' },
  { n: '03', name: 'Reconocimiento', desc: 'Repaso espaciado: vocabulario del día más palabras recicladas de pasos anteriores.', time: '10 min' },
  { n: '04', name: 'Escucha sobrevivible', desc: 'Audio o podcast corto adaptado a tu nivel, con explicación práctica.', time: '7 min' },
  { n: '05', name: 'Contexto', desc: 'Explicación de gramática, estilo o cultura (formalidad, conjugaciones, idiomática).', time: '9 min' },
  { n: '06', name: 'Descubrir el patrón', desc: 'Encontrar reglas y estructuras dentro del idioma. La parte que más cambia el juego.', time: '8 min' },
  { n: '07', name: 'Microexplicaciones', desc: 'Cápsulas breves que aclaran dudas frecuentes y conexiones entre conceptos.', time: '5 min' },
  { n: '08', name: 'Producción guiada', desc: 'Practica producir lenguaje con apoyo: armar frases, completar diálogos.', time: '10 min' },
  { n: '09', name: 'Interacción reactiva', desc: 'Ejercicios de respuesta rápida que cierran el ciclo de uso activo.', time: '8 min' },
  { n: '10', name: 'Examen del día', desc: 'Verifica que todo lo del paso quedó interiorizado, no solo expuesto.', time: '6 min' },
  { n: '11', name: 'Examen acumulativo', desc: 'Repaso de los últimos N días para mantener todo en memoria de largo plazo.', time: '10 min' },
];

export const VOCAB: Record<string, VocabWord[]> = {
  ko: [
    { glyph: '학교', roman: 'hak-kyo', mean: 'escuela', emoji: 'H' },
    { glyph: '집', roman: 'jip', mean: 'casa', emoji: 'J' },
    { glyph: '책', roman: 'chaek', mean: 'libro', emoji: 'C' },
    { glyph: '물', roman: 'mul', mean: 'agua', emoji: 'A' },
    { glyph: '친구', roman: 'chin-gu', mean: 'amigo', emoji: 'F' },
    { glyph: '시간', roman: 'shi-gan', mean: 'tiempo', emoji: 'T' },
  ],
  ja: [
    { glyph: 'がっこう', roman: 'gakkō', mean: 'escuela', emoji: 'G' },
    { glyph: 'いえ', roman: 'ie', mean: 'casa', emoji: 'I' },
    { glyph: 'ほん', roman: 'hon', mean: 'libro', emoji: 'H' },
    { glyph: 'みず', roman: 'mizu', mean: 'agua', emoji: 'M' },
    { glyph: 'ともだち', roman: 'tomodachi', mean: 'amigo', emoji: 'T' },
    { glyph: 'じかん', roman: 'jikan', mean: 'tiempo', emoji: 'J' },
  ],
  en: [
    { glyph: 'School', roman: 'sku:l', mean: 'escuela', emoji: 'S' },
    { glyph: 'Home', roman: 'hoʊm', mean: 'casa', emoji: 'H' },
    { glyph: 'Book', roman: 'bʊk', mean: 'libro', emoji: 'B' },
    { glyph: 'Water', roman: 'ˈwɔːtə', mean: 'agua', emoji: 'W' },
    { glyph: 'Friend', roman: 'frɛnd', mean: 'amigo', emoji: 'F' },
    { glyph: 'Time', roman: 'taɪm', mean: 'tiempo', emoji: 'T' },
  ],
  it: [
    { glyph: 'Scuola', roman: 'ˈskwɔ.la', mean: 'escuela', emoji: 'S' },
    { glyph: 'Casa', roman: 'ˈka.sa', mean: 'casa', emoji: 'C' },
    { glyph: 'Libro', roman: 'ˈli.bro', mean: 'libro', emoji: 'L' },
    { glyph: 'Acqua', roman: 'ˈak.kwa', mean: 'agua', emoji: 'A' },
    { glyph: 'Amico', roman: 'aˈmi.ko', mean: 'amigo', emoji: 'Am' },
    { glyph: 'Tempo', roman: 'ˈtɛm.po', mean: 'tiempo', emoji: 'T' },
  ],
  fr: [
    { glyph: 'École', roman: 'e.kɔl', mean: 'escuela', emoji: 'É' },
    { glyph: 'Maison', roman: 'mɛ.zɔ̃', mean: 'casa', emoji: 'M' },
    { glyph: 'Livre', roman: 'livʁ', mean: 'libro', emoji: 'L' },
    { glyph: 'Eau', roman: 'o', mean: 'agua', emoji: 'E' },
    { glyph: 'Ami', roman: 'a.mi', mean: 'amigo', emoji: 'A' },
    { glyph: 'Temps', roman: 'tɑ̃', mean: 'tiempo', emoji: 'T' },
  ],
  de: [
    { glyph: 'Schule', roman: 'ˈʃuːlə', mean: 'escuela', emoji: 'S' },
    { glyph: 'Haus', roman: 'haʊs', mean: 'casa', emoji: 'H' },
    { glyph: 'Buch', roman: 'buːx', mean: 'libro', emoji: 'B' },
    { glyph: 'Wasser', roman: 'ˈvasɐ', mean: 'agua', emoji: 'W' },
    { glyph: 'Freund', roman: 'frɔɪ̯nt', mean: 'amigo', emoji: 'F' },
    { glyph: 'Zeit', roman: 'tsaɪt', mean: 'tiempo', emoji: 'Z' },
  ],
  pt: [
    { glyph: 'Escola', roman: 'isˈkɔ.la', mean: 'escuela', emoji: 'E' },
    { glyph: 'Casa', roman: 'ˈka.zɐ', mean: 'casa', emoji: 'C' },
    { glyph: 'Livro', roman: 'ˈli.vɾu', mean: 'libro', emoji: 'L' },
    { glyph: 'Água', roman: 'ˈa.ɣwɐ', mean: 'agua', emoji: 'A' },
    { glyph: 'Amigo', roman: 'aˈmi.gu', mean: 'amigo', emoji: 'Am' },
    { glyph: 'Tempo', roman: 'ˈtẽ.pu', mean: 'tiempo', emoji: 'T' },
  ],
  ru: [
    { glyph: 'Школа', roman: 'shko-la', mean: 'escuela', emoji: 'Ш' },
    { glyph: 'Дом', roman: 'dom', mean: 'casa', emoji: 'Д' },
    { glyph: 'Книга', roman: 'kni-ga', mean: 'libro', emoji: 'К' },
    { glyph: 'Вода', roman: 'va-da', mean: 'agua', emoji: 'В' },
    { glyph: 'Друг', roman: 'drug', mean: 'amigo', emoji: 'Д' },
    { glyph: 'Время', roman: 'vre-mya', mean: 'tiempo', emoji: 'В' },
  ],
};
