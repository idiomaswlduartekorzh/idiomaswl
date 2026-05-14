// Datos compartidos para Idiomas WeLearn

const IDIOMAS = [
  { code: 'en', name: 'Inglés', native: 'English', flag: 'En', lessons: 180, level: 'A1 – C2' },
  { code: 'ko', name: 'Coreano', native: '한국어', flag: '한', lessons: 120, level: 'A1 – B2' },
  { code: 'ja', name: 'Japonés', native: '日本語', flag: '日', lessons: 140, level: 'A1 – B2' },
  { code: 'it', name: 'Italiano', native: 'Italiano', flag: 'It', lessons: 96, level: 'A1 – C1' },
  { code: 'fr', name: 'Francés', native: 'Français', flag: 'Fr', lessons: 108, level: 'A1 – C1' },
  { code: 'de', name: 'Alemán', native: 'Deutsch', flag: 'De', lessons: 110, level: 'A1 – C1' },
  { code: 'pt', name: 'Portugués', native: 'Português', flag: 'Pt', lessons: 92, level: 'A1 – C1' },
  { code: 'ru', name: 'Ruso', native: 'Русский', flag: 'Ру', lessons: 88, level: 'A1 – B2' },
];

const EXAMENES = [
  { code: 'toefl', name: 'TOEFL', lang: 'Inglés · iBT', sessions: '8 semanas', mock: '12 simulacros', focus: 'Academic' },
  { code: 'ielts', name: 'IELTS', lang: 'Inglés · Academic & General', sessions: '8 semanas', mock: '10 simulacros', focus: 'Band 7+' },
  { code: 'icfes', name: 'ICFES', lang: 'Inglés · Saber 11', sessions: '12 semanas', mock: '20 simulacros', focus: 'Colombia' },
  { code: 'goethe', name: 'Goethe', lang: 'Alemán · A1 – C2', sessions: '10 semanas', mock: '8 simulacros', focus: 'Zertifikat' },
  { code: 'delf', name: 'DELF/DALF', lang: 'Francés · A1 – C2', sessions: '10 semanas', mock: '8 simulacros', focus: 'Officiel' },
  { code: 'cils', name: 'CILS', lang: 'Italiano · A1 – C2', sessions: '10 semanas', mock: '6 simulacros', focus: 'Certificazione' },
];

const PASOS = [
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

// Vocabulario demo por idioma (paso 1 — Hangul / Hiragana / etc.)
const VOCAB = {
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

const FAQ = [
  {
    q: '¿En qué se diferencia WeLearn de otras apps de idiomas?',
    a: 'No somos una app de gamificación. Cada día tiene 11 pasos diseñados para que el concepto no solo se explique, sino que se interiorice: activación, adquisición, reconocimiento espaciado, escucha, contexto cultural, descubrimiento de patrones, producción y examen acumulativo. Aprendes — no acumulas rachas.'
  },
  {
    q: '¿Puedo probar antes de pagar?',
    a: 'Sí. El primer paso de cualquier idioma (Activación) está abierto sin tarjeta. Cuando termines, te invitamos a continuar con la lección completa. Sin trucos: si no te suena, no pasas a un paywall agresivo.'
  },
  {
    q: '¿Cuánto tiempo toma un día de estudio?',
    a: 'Entre 45 y 90 minutos según el idioma y tu ritmo. Los 11 pasos están pensados para hacerse en una sola sesión, o en bloques de 15-20 minutos a lo largo del día. Tu progreso se guarda en cualquier punto.'
  },
  {
    q: '¿Qué idiomas y exámenes incluyen?',
    a: 'Inglés, coreano, japonés, italiano, francés, alemán, portugués y ruso. Para certificaciones: TOEFL, IELTS, ICFES, Goethe (alemán), DELF/DALF (francés) y CILS (italiano). Cada examen tiene su propio plan con simulacros completos.'
  },
  {
    q: '¿Cómo funciona el repaso espaciado?',
    a: 'El paso de Reconocimiento mezcla vocabulario del día con palabras de los pasos 1 al N-1, en intervalos crecientes (1, 3, 7, 14 días). No estudias todo siempre — solo lo que tu cerebro está por olvidar.'
  },
  {
    q: '¿Funciona en móvil?',
    a: 'Sí. La plataforma está optimizada para escritorio, tablet y móvil. El audio se reproduce sin conexión una vez descargado el paso.'
  },
];

window.IDIOMAS = IDIOMAS;
window.EXAMENES = EXAMENES;
window.PASOS = PASOS;
window.VOCAB = VOCAB;
window.FAQ = FAQ;
