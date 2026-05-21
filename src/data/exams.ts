export interface ExamSection {
  name: string;
  icon: string;
  time: string;
  questions: number | string;
  types: string[];
  color: string;
}

export interface MockItem {
  id: string;
  title: string;
  subtitle: string;
  free: boolean;
  parts: number;
  questions: number;
}

export interface Exam {
  slug: string;
  name: string;
  fullName: string;
  flag: string;
  language: string;
  color: string;
  colorDark: string;
  tagline: string;
  description: string;
  totalTime: string;
  totalQuestions: number | string;
  scoreRange: string;
  scoreName: string;
  passing?: string;
  recognized: string[];
  levels?: string[];
  sections: ExamSection[];
  mocks: MockItem[];
  available: boolean;
}

export const EXAMS: Record<string, Exam> = {
  ielts: {
    slug: 'ielts',
    name: 'IELTS',
    fullName: 'International English Language Testing System',
    flag: '🇬🇧',
    language: 'Inglés',
    color: '#c8202e',
    colorDark: '#8b0000',
    tagline: 'El estándar global para migración, estudio y trabajo internacional.',
    description: 'Reconocido en más de 140 países por universidades, gobiernos y empleadores. Existen dos versiones: Academic (estudio superior) y General Training (migración y trabajo).',
    totalTime: '2h 44min',
    totalQuestions: 80,
    scoreRange: '0 – 9',
    scoreName: 'Band Score',
    passing: 'Depende del destino (generalmente 6.0 – 7.5)',
    recognized: ['Universidades del Reino Unido, Australia y Canadá', 'Programas de migración permanente', 'Empleadores internacionales de +140 países'],
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    sections: [
      { name: 'Listening', icon: '🎧', time: '30 min', questions: 40, color: '#c8202e', types: ['Fill in the blank', 'Multiple choice', 'Matching', 'Map labelling'] },
      { name: 'Reading', icon: '📖', time: '60 min', questions: 40, color: '#e05a5a', types: ['True/False/NG', 'Matching headings', 'Fill in the blank', 'Multiple choice'] },
      { name: 'Writing', icon: '✍️', time: '60 min', questions: 2, color: '#f08080', types: ['Task 1: gráfico/diagrama', 'Task 2: ensayo argumentativo (250 palabras)'] },
      { name: 'Speaking', icon: '🎙️', time: '11–14 min', questions: 3, color: '#c8202e', types: ['Parte 1: preguntas personales', 'Parte 2: monólogo con ficha', 'Parte 3: discusión abstracta'] },
    ],
    mocks: [
      { id: 'set-1', title: 'IELTS Academic Set 1', subtitle: 'Car Tours · Leisure Club · Design Competition · Spirit Bear', free: true, parts: 4, questions: 80 },
      { id: 'set-2', title: 'IELTS Academic Set 2', subtitle: 'Listening + Reading + Writing + Speaking', free: true, parts: 4, questions: 80 },
      { id: 'set-3', title: 'IELTS Academic Set 3', subtitle: 'Listening + Reading + Writing + Speaking', free: true, parts: 4, questions: 80 },
      { id: 'set-4', title: 'IELTS Academic Set 4', subtitle: 'Listening + Reading + Writing + Speaking', free: true, parts: 4, questions: 80 },
    ],
    available: true,
  },

  toefl: {
    slug: 'toefl',
    name: 'TOEFL iBT',
    fullName: 'Test of English as a Foreign Language (Internet-Based)',
    flag: '🇺🇸',
    language: 'Inglés',
    color: '#2563eb',
    colorDark: '#1e40af',
    tagline: 'El examen preferido por universidades norteamericanas y canadienses.',
    description: 'El TOEFL iBT evalúa las 4 habilidades del inglés académico. Es el examen estándar para admisión en más de 11,000 universidades en 160 países, especialmente en Norteamérica.',
    totalTime: '~2h',
    totalQuestions: '54–72',
    scoreRange: '0 – 120',
    scoreName: 'Total Score',
    passing: 'Depende de la institución (generalmente 80 – 100)',
    recognized: ['Más de 11,000 universidades en 160 países', 'Programas de postgrado en EE.UU. y Canadá', 'Visas estudiantiles F-1 (EE.UU.)'],
    sections: [
      { name: 'Reading', icon: '📖', time: '35–72 min', questions: 20, color: '#2563eb', types: ['Multiple choice', 'Prose summary', 'Fill in a table', 'Referente questions'] },
      { name: 'Listening', icon: '🎧', time: '41–57 min', questions: 28, color: '#3b82f6', types: ['Conferencias académicas', 'Conversaciones campus', 'Multiple choice', 'Check the box'] },
      { name: 'Speaking', icon: '🎙️', time: '17 min', questions: 4, color: '#60a5fa', types: ['Independent: opinión personal', 'Integrated: leer + escuchar + hablar'] },
      { name: 'Writing', icon: '✍️', time: '50 min', questions: 2, color: '#93c5fd', types: ['Integrated: leer + escuchar + escribir', 'Academic Discussion: foro online (150+ palabras)'] },
    ],
    mocks: [
      { id: 'set-1', title: 'TOEFL iBT Set 1', subtitle: 'Reading + Listening + Speaking + Writing', free: true, parts: 4, questions: 54 },
      { id: 'set-2', title: 'TOEFL iBT Set 2', subtitle: 'Reading + Listening + Speaking + Writing', free: true, parts: 4, questions: 54 },
      { id: 'set-3', title: 'TOEFL iBT Set 3', subtitle: 'Reading + Listening + Speaking + Writing', free: true, parts: 4, questions: 54 },
      { id: 'set-4', title: 'TOEFL iBT Set 4', subtitle: 'Reading + Listening + Speaking + Writing', free: true, parts: 4, questions: 54 },
    ],
    available: true,
  },

  icfes: {
    slug: 'icfes',
    name: 'ICFES',
    fullName: 'Saber 11 · Componente de Inglés',
    flag: '🇨🇴',
    language: 'Inglés',
    color: '#14215c',
    colorDark: '#0c1540',
    tagline: 'El examen nacional colombiano para acceder a la educación superior.',
    description: 'El componente de inglés del Saber 11 evalúa comprensión lectora y de vocabulario en inglés. Determina el puntaje de acceso a universidades colombianas y becas del Estado.',
    totalTime: '60 min',
    totalQuestions: 55,
    scoreRange: '0 – 100',
    scoreName: 'Puntaje',
    passing: 'Variable por universidad (generalmente 50+ para acceso)',
    recognized: ['Universidades colombianas públicas y privadas', 'Becas Ser Pilo Paga / Generación E', 'Admisión especial ICETEX'],
    levels: ['Pre A1', 'A1', 'A2', 'B1'],
    sections: [
      { name: 'Parte 1', icon: '🔤', time: '~8 min', questions: 5, color: '#14215c', types: ['Matching: palabra ↔ descripción'] },
      { name: 'Parte 2', icon: '💬', time: '~10 min', questions: 9, color: '#1e3270', types: ['Diálogos: selección de respuesta en conversación'] },
      { name: 'Parte 3', icon: '📝', time: '~8 min', questions: 9, color: '#2c3870', types: ['Completar oración con vocabulario'] },
      { name: 'Parte 4', icon: '📰', time: '~10 min', questions: 9, color: '#3a4895', types: ['Lectura de imagen/aviso: comprensión visual'] },
      { name: 'Parte 5', icon: '📖', time: '~8 min', questions: 9, color: '#4a5aad', types: ['Texto corto: preguntas de comprensión'] },
      { name: 'Parte 6', icon: '📑', time: '~8 min', questions: 7, color: '#14215c', types: ['Texto largo: inferencia e interpretación'] },
      { name: 'Parte 7', icon: '🔍', time: '~8 min', questions: 7, color: '#1e3270', types: ['Texto de opinión/argumento'] },
    ],
    mocks: [
      { id: 'mock-01', title: 'Mock 1 · Rutinas y ciudad', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-02', title: 'Mock 2 · Viajes y servicios', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-03', title: 'Mock 3 · Estudio y tecnología', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-04', title: 'Mock 4 · Salud y ambiente', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-05', title: 'Mock 5 · Comida y cultura', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-06', title: 'Mock 6 · Trabajo y carrera', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-07', title: 'Mock 7 · Deporte y tiempo libre', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-08', title: 'Mock 8 · Ciencia y espacio', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-09', title: 'Mock 9 · Arte y medios', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-10', title: 'Mock 10 · Emergencias y seguridad', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-11', title: 'Mock 11 · Technology & Digital Life', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-12', title: 'Mock 12 · Environment & Sustainability', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-13', title: 'Mock 13 · Salud y Medicina', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-14', title: 'Mock 14 · Trabajo y Carreras', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-15', title: 'Mock 15 · Educación y aprendizaje', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-16', title: 'Mock 16 · Cultura e identidad', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-17', title: 'Mock 17 · Deporte y competencia', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-18', title: 'Mock 18 · Viajes y turismo', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-19', title: 'Mock 19 · Ciencia y descubrimiento', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
      { id: 'mock-20', title: 'Mock 20 · Sociedad y juventud', subtitle: '7 partes · Formato Saber 11', free: true, parts: 7, questions: 55 },
    ],
    available: true,
  },

  goethe: {
    slug: 'goethe',
    name: 'Goethe-Zertifikat',
    fullName: 'Goethe-Institut Deutschprüfungen',
    flag: '🇩🇪',
    language: 'Alemán',
    color: '#d4a017',
    colorDark: '#a07a10',
    tagline: 'La certificación oficial de alemán del Instituto Goethe.',
    description: 'Los exámenes del Goethe-Institut son el estándar mundial para la certificación del alemán. Requeridos para universidades alemanas, ciudadanía y trabajo en países de habla alemana.',
    totalTime: '~3h',
    totalQuestions: 'Variable por nivel',
    scoreRange: '0 – 100',
    scoreName: 'Puntos',
    passing: '60 puntos (15 por habilidad)',
    recognized: ['Universidades alemanas, austriacas y suizas', 'Programas de migración a Alemania', 'Ciudadanía alemana (C1)'],
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    sections: [
      { name: 'Hören', icon: '🎧', time: '~30 min', questions: 25, color: '#d4a017', types: ['Comprensión auditiva', 'Conversaciones cotidianas', 'Anuncios y noticias'] },
      { name: 'Lesen', icon: '📖', time: '~65 min', questions: 25, color: '#c8960e', types: ['Comprensión lectora', 'Textos informativos', 'Correspondencia'] },
      { name: 'Schreiben', icon: '✍️', time: '~75 min', questions: 2, color: '#b8840c', types: ['Producción escrita', 'Emails y cartas formales'] },
      { name: 'Sprechen', icon: '🎙️', time: '~15 min', questions: 3, color: '#a8720a', types: ['Producción oral', 'Descripción de imagen', 'Discusión'] },
    ],
    mocks: [
      { id: 'set-1', title: 'Goethe-Zertifikat B1 – Übungstest 1', subtitle: 'Lesen · Hören · Schreiben · Sprechen', free: true, parts: 8, questions: 39 },
    ],
    available: true,
  },

  'cils-celi': {
    slug: 'cils-celi',
    name: 'CILS / CELI',
    fullName: 'Certificazione Italiana come Lingua Straniera / Certificato di Conoscenza della Lingua Italiana',
    flag: '🇮🇹',
    language: 'Italiano',
    color: '#009246',
    colorDark: '#006b33',
    tagline: 'Las dos certificaciones oficiales del italiano como lengua extranjera.',
    description: 'CILS es emitido por la Universidad de Siena; CELI por la Universidad para Extranjeros de Perugia. Ambas son reconocidas internacionalmente para estudio, trabajo y ciudadanía italiana.',
    totalTime: '~4h',
    totalQuestions: 'Variable por nivel',
    scoreRange: '0 – 100',
    scoreName: 'Puntos',
    passing: '60 puntos (12 por componente)',
    recognized: ['Universidades italianas', 'Ciudadanía italiana (CELI 3 / B1)', 'Empleadores en Italia'],
    levels: ['A2', 'B1', 'B2', 'C1', 'C2'],
    sections: [
      { name: 'Ascolto', icon: '🎧', time: '~30 min', questions: 20, color: '#009246', types: ['Comprensione orale', 'Dialoghi e annunci'] },
      { name: 'Lettura', icon: '📖', time: '~50 min', questions: 20, color: '#33a86a', types: ['Comprensione scritta', 'Testi autentici'] },
      { name: 'Analisi', icon: '🔤', time: '~30 min', questions: 25, color: '#66c48c', types: ['Strutture grammaticali', 'Lessico'] },
      { name: 'Scrittura', icon: '✍️', time: '~60 min', questions: 2, color: '#009246', types: ['Produzione scritta', 'Email / testo narrativo'] },
      { name: 'Parlato', icon: '🎙️', time: '~15 min', questions: 2, color: '#33a86a', types: ['Produzione orale', 'Interazione'] },
    ],
    mocks: [
      { id: 'set-1', title: 'CILS B1 – Uno B1 Set 1', subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato', free: true, parts: 6, questions: 29 },
    ],
    available: true,
  },

  'delf-dalf': {
    slug: 'delf-dalf',
    name: 'DELF / DALF',
    fullName: 'Diplôme d\'Études en Langue Française / Diplôme Approfondi de Langue Française',
    flag: '🇫🇷',
    language: 'Francés',
    color: '#002395',
    colorDark: '#001466',
    tagline: 'La certificación oficial de francés del Ministerio de Educación Nacional de Francia.',
    description: 'DELF (A1-B2) y DALF (C1-C2) son diplomas oficiales del estado francés, válidos de por vida. Reconocidos para universidades francesas, ciudadanía y acceso a empleos en la Francofonía.',
    totalTime: '~3h',
    totalQuestions: 'Variable por nivel',
    scoreRange: '0 – 100',
    scoreName: 'Points',
    passing: '50/100 (25/50 por parte)',
    recognized: ['Universidades francófonas (Francia, Bélgica, Suiza, Canadá)', 'Ciudadanía francesa (DELF B1)', 'Campus France y programas de becas'],
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    sections: [
      { name: 'Compréhension de l\'oral', icon: '🎧', time: '~25 min', questions: 25, color: '#002395', types: ['Documents déclencheurs variés', 'Questionnaire de compréhension'] },
      { name: 'Compréhension des écrits', icon: '📖', time: '~35 min', questions: 25, color: '#1a3aad', types: ['Textes authentiques', 'QCM et vrai/faux'] },
      { name: 'Production écrite', icon: '✍️', time: '~45 min', questions: 2, color: '#3357c5', types: ['Remplir un formulaire', 'Rédiger un texte'] },
      { name: 'Production orale', icon: '🎙️', time: '~15 min', questions: 3, color: '#4d71dd', types: ['Monologue suivi', 'Exercice en interaction'] },
    ],
    mocks: [
      { id: 'set-1', title: 'DELF B1 – Épreuve 1', subtitle: 'Compréhension oral · Écrits · Production écrite · Orale', free: true, parts: 5, questions: 22 },
    ],
    available: true,
  },

  'celpe-bras': {
    slug: 'celpe-bras',
    name: 'CELPE-BRAS',
    fullName: 'Certificado de Proficiência em Língua Portuguesa para Estrangeiros',
    flag: '🇧🇷',
    language: 'Portugués',
    color: '#009c3b',
    colorDark: '#00732b',
    tagline: 'La única certificación oficial de portugués brasileño reconocida internacionalmente.',
    description: 'Emitido por el Ministerio de Educación de Brasil, el CELPE-BRAS es exigido para estudiar en universidades brasileñas, ejercer profesiones reguladas y obtener visas de trabajo en Brasil.',
    totalTime: '~3h 30min',
    totalQuestions: '4 tareas integradas + interação oral',
    scoreRange: 'Intermediário – Avançado Superior',
    scoreName: 'Nível',
    passing: 'Intermediário (mínimo para ingreso universitario)',
    recognized: ['Universidades brasileñas (reemplaza ENEM para extranjeros)', 'Profesiones reguladas en Brasil (medicina, derecho)', 'Visas de trabajo y residencia en Brasil'],
    levels: ['Intermediário', 'Intermediário Superior', 'Avançado', 'Avançado Superior'],
    sections: [
      { name: 'Parte Escrita', icon: '✍️', time: '~150 min', questions: 4, color: '#009c3b', types: ['Tarefa 1: vídeo + produção escrita', 'Tarefa 2: áudio + produção escrita', 'Tarefa 3: texto + produção escrita', 'Tarefa 4: texto + produção escrita'] },
      { name: 'Parte Oral', icon: '🎙️', time: '~20 min', questions: 1, color: '#33b563', types: ['Interação com avaliador', 'Discussão de temas a partir de elementos provocadores'] },
    ],
    mocks: [
      { id: 'set-1', title: 'CELPE-BRAS – Simulado 1', subtitle: 'Parte Escrita · Parte Oral', free: true, parts: 5, questions: 7 },
    ],
    available: true,
  },
};

export const EXAM_LIST = Object.values(EXAMS);
export type ExamSlug = keyof typeof EXAMS;
