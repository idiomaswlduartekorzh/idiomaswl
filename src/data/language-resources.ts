export const LANGUAGE_RESOURCES = {
  ingles: {
    name: 'inglés',
    practice: '/practica/ingles',
    classes: '/clases-de-ingles',
    accent: '#1a4fcc',
    exams: [
      { label: 'IELTS', href: '/examenes/ielts' },
      { label: 'TOEFL', href: '/examenes/toefl' },
      { label: 'ICFES Inglés', href: '/examenes/icfes' },
    ],
  },
  coreano: {
    name: 'coreano', practice: '/practica/coreano', classes: '/clases-de-coreano', accent: '#534ab7',
    exams: [{ label: 'TOPIK', href: '/examenes/topik' }],
  },
  frances: {
    name: 'francés', practice: '/practica/frances', classes: '/clases-de-frances', accent: '#003189',
    exams: [{ label: 'DELF y DALF', href: '/examenes/delf-dalf' }],
  },
  aleman: {
    name: 'alemán', practice: '/practica/aleman', classes: '/clases-de-aleman', accent: '#bd2424',
    exams: [{ label: 'Goethe', href: '/examenes/goethe' }],
  },
  italiano: {
    name: 'italiano', practice: '/practica/italiano', classes: '/clases-de-italiano', accent: '#00834d',
    exams: [{ label: 'CILS y CELI', href: '/examenes/cils-celi' }],
  },
  portugues: {
    name: 'portugués', practice: '/practica/portugues', classes: '/clases-de-portugues', accent: '#008b3c',
    exams: [{ label: 'Celpe-Bras', href: '/examenes/celpe-bras' }],
  },
  ruso: {
    name: 'ruso', practice: '/practica/ruso', classes: '/clases-de-ruso', accent: '#b52828',
    exams: [],
  },
  japones: {
    name: 'japonés', practice: '/practica/japones', classes: '/clases-de-japones', accent: '#bc002d',
    exams: [],
  },
} as const;

export type LanguageResourceKey = keyof typeof LANGUAGE_RESOURCES;
