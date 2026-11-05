import type { LanguageSlug } from './quick-practice';

export const STUDY_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export const STUDY_LANGUAGES: readonly {
  slug: LanguageSlug;
  title: string;
  code: string;
  description: string;
}[] = [
  { slug: 'ingles', title: 'Inglés', code: 'EN', description: 'Lectura, escucha, gramática, vocabulario y expresión.' },
  { slug: 'coreano', title: 'Coreano', code: 'KO', description: 'Hangul, lectura, escucha y práctica por nivel.' },
  { slug: 'frances', title: 'Francés', code: 'FR', description: 'Comprensión y expresión desde A1 hasta C2.' },
  { slug: 'aleman', title: 'Alemán', code: 'DE', description: 'Gramática, lectura, escucha y conversación.' },
  { slug: 'italiano', title: 'Italiano', code: 'IT', description: 'Lecciones y ejercicios por nivel y destreza.' },
  { slug: 'portugues', title: 'Portugués', code: 'PT', description: 'Lectura, gramática, escucha y habla.' },
  { slug: 'japones', title: 'Japonés', code: 'JA', description: 'Escritura, lectura y práctica progresiva.' },
  { slug: 'ruso', title: 'Ruso', code: 'RU', description: 'Alfabeto, casos, lectura y escucha.' },
];

export const STUDY_EXAMS: readonly {
  slug: string;
  title: string;
  detail: string;
  practicePath?: string;
}[] = [
  { slug: 'ielts', title: 'IELTS', detail: 'Listening, Reading, Writing y Speaking.', practicePath: '/practica/ielts' },
  { slug: 'toefl', title: 'TOEFL iBT', detail: 'Preparación por tarea y simulacros.', practicePath: '/practica/toefl' },
  { slug: 'sat', title: 'SAT', detail: 'Reading and Writing y Math.' },
  { slug: 'icfes', title: 'ICFES Saber 11', detail: 'Inglés, práctica guiada y simulacros.', practicePath: '/practica/icfes-saber-11' },
  { slug: 'goethe', title: 'Goethe-Zertifikat', detail: 'Preparación de alemán por habilidad.', practicePath: '/practica/goethe' },
  { slug: 'cils-celi', title: 'CILS / CELI', detail: 'Certificaciones de italiano.' },
  { slug: 'delf-dalf', title: 'DELF / DALF', detail: 'Certificaciones de francés.' },
  { slug: 'topik', title: 'TOPIK', detail: 'Certificación de coreano.' },
  { slug: 'celpe-bras', title: 'CELPE-BRAS', detail: 'Certificación de portugués brasileño.' },
  { slug: 'cambridge-b2', title: 'Cambridge B2 First', detail: 'Certificación de inglés B2.' },
];
