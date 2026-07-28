export const HOME_META = {
  title: 'Academia de idiomas en Bucaramanga y online',
  description:
    'Clases de idiomas, práctica y preparación de exámenes conectadas con tu nivel y tu meta. Conoce Idiomas WeLearn en Bucaramanga y online.',
  canonical: 'https://www.idiomaswl.com/home',
  ogTitle: 'Aprende el idioma que tu meta necesita | WeLearn',
  ogDescription:
    'Reconoce tu punto de partida y encuentra clases, práctica y preparación de exámenes conectadas con tu meta.',
} as const;

export const INTENTIONS = [
  {
    label: 'Empezar o retomar un idioma',
    description: 'Encuentra una ruta de clases según tu idioma y punto de partida.',
    href: '/clases-de-idiomas',
    code: '01',
  },
  {
    label: 'Mejorar mi inglés',
    description: 'Trabaja el inglés que necesitas para estudiar, trabajar o comunicarte.',
    href: '/clases-de-ingles',
    code: '02',
  },
  {
    label: 'Preparar un examen',
    description: 'Explora preparación y simulacros de práctica por examen.',
    href: '/examenes',
    code: '03',
  },
  {
    label: 'Practicar una habilidad',
    description: 'Entrena lectura, escucha, gramática, vocabulario, habla o escritura.',
    href: '/practica',
    code: '04',
  },
  {
    label: 'Estudiar en Bucaramanga',
    description: 'Revisa la opción presencial disponible en la ciudad.',
    href: '/clases-de-ingles-bucaramanga',
    code: '05',
  },
  {
    label: 'Todavía no sé qué necesito',
    description: 'Empieza por reconocer tu nivel y tu prioridad de trabajo.',
    href: '/nivel-radar',
    code: '06',
  },
] as const;

export const ROUTE_STEPS = [
  {
    step: 'Reconocer',
    title: '¿Dónde estoy realmente?',
    description:
      'Nivel Radar explora vocabulario, uso de la lengua, lectura y escucha para ofrecerte un punto de partida orientativo.',
    fragments: ['nivel', 'lectura', 'escucha'],
    result: 'Un mapa inicial',
    href: '/nivel-radar',
    linkLabel: 'Hacer el Nivel Radar',
  },
  {
    step: 'Comprender',
    title: '¿Qué está frenando mi avance?',
    description:
      'Separamos el idioma en capacidades concretas para identificar qué necesitas construir, comprender o expresar.',
    fragments: ['vocabulario', 'estructuras', 'comprensión'],
    result: 'Una prioridad clara',
    href: '#habilidades',
    linkLabel: 'Ver las habilidades',
  },
  {
    step: 'Practicar',
    title: '¿Qué tarea me acerca a mi meta?',
    description:
      'Conectas la explicación con lectura, escucha, gramática, vocabulario, habla, escritura o simulacros de práctica.',
    fragments: ['explicación', 'ejemplo', 'tarea'],
    result: 'Práctica con propósito',
    href: '/practica',
    linkLabel: 'Explorar la práctica',
  },
  {
    step: 'Corregir',
    title: '¿Qué cambio en el siguiente intento?',
    description:
      'Algunos ejercicios ofrecen feedback inmediato. La corrección docente y su alcance dependen de la modalidad elegida.',
    fragments: ['respuesta', 'criterio', 'ajuste'],
    result: 'Un siguiente paso',
    href: '/metodo',
    linkLabel: 'Conocer cómo enseñamos',
  },
] as const;

export const SKILLS = [
  { name: 'Comprender', detail: 'Escucha y lectura', marker: 'CO' },
  { name: 'Construir', detail: 'Vocabulario y estructuras', marker: 'CT' },
  { name: 'Expresarte', detail: 'Habla y escritura', marker: 'EX' },
  { name: 'Interactuar', detail: 'Fluidez, respuesta y estrategia', marker: 'IN' },
  { name: 'Corregir', detail: 'Feedback, repetición y ajuste', marker: 'CR' },
] as const;

export const PRODUCT_AREAS = [
  {
    eyebrow: 'Aprender',
    title: 'Entender antes de repetir.',
    description:
      'Cursos, explicaciones, ejemplos y práctica por nivel para construir vocabulario, estructuras y comprensión.',
    href: '/clases-de-idiomas',
    linkLabel: 'Explorar clases e idiomas',
    visual: 'lesson',
  },
  {
    eyebrow: 'Practicar',
    title: 'Entrenar una habilidad con una tarea real.',
    description:
      'Lectura, escucha, vocabulario, gramática, habla y escritura, según lo disponible en cada idioma y nivel.',
    href: '/practica',
    linkLabel: 'Explorar toda la práctica',
    visual: 'practice',
  },
  {
    eyebrow: 'Corregir',
    title: 'Entender por qué una respuesta funciona.',
    description:
      'Los ejercicios guiados pueden mostrar feedback inmediato, criterios de respuesta y ejemplos explicados.',
    href: '/practica/ielts/academic/writing/task2/opinion',
    linkLabel: 'Ver una práctica de Writing',
    visual: 'feedback',
  },
  {
    eyebrow: 'Preparar',
    title: 'Practicar para la condición que enfrentarás.',
    description:
      'Simulacros de práctica, tipos de tarea y entrenamiento por sección para los exámenes disponibles.',
    href: '/examenes',
    linkLabel: 'Explorar preparación de exámenes',
    visual: 'exam',
  },
] as const;

export const LANGUAGES = [
  {
    name: 'Inglés',
    native: 'English',
    symbol: 'EN',
    href: '/clases-de-ingles',
    label: 'Ver clases de inglés',
    type: 'Clases y práctica',
  },
  {
    name: 'Coreano',
    native: '한국어',
    symbol: '한',
    href: '/clases-de-coreano',
    label: 'Ver clases de coreano',
    type: 'Clases y práctica',
  },
  {
    name: 'Francés',
    native: 'Français',
    symbol: 'FR',
    href: '/clases-de-frances',
    label: 'Ver clases de francés',
    type: 'Clases y práctica',
  },
  {
    name: 'Alemán',
    native: 'Deutsch',
    symbol: 'DE',
    href: '/clases-de-aleman',
    label: 'Ver clases de alemán',
    type: 'Clases y práctica',
  },
  {
    name: 'Italiano',
    native: 'Italiano',
    symbol: 'IT',
    href: '/clases-de-italiano',
    label: 'Ver clases de italiano',
    type: 'Clases y práctica',
  },
  {
    name: 'Portugués',
    native: 'Português',
    symbol: 'PT',
    href: '/clases-de-portugues',
    label: 'Ver clases de portugués',
    type: 'Clases y práctica',
  },
  {
    name: 'Japonés',
    native: '日本語',
    symbol: '日',
    href: '/practica/japones',
    label: 'Explorar práctica de japonés',
    type: 'Práctica publicada',
  },
  {
    name: 'Ruso',
    native: 'Русский',
    symbol: 'РУ',
    href: '/practica/ruso',
    label: 'Explorar práctica de ruso',
    type: 'Práctica publicada',
  },
] as const;

export const EXAMS = [
  { name: 'IELTS', language: 'Inglés', href: '/examenes/ielts', code: '01' },
  { name: 'TOEFL iBT', language: 'Inglés', href: '/examenes/toefl', code: '02' },
  { name: 'ICFES Saber 11', language: 'Inglés', href: '/examenes/icfes', code: '03' },
  { name: 'Goethe-Zertifikat', language: 'Alemán', href: '/examenes/goethe', code: '04' },
  { name: 'CILS / CELI', language: 'Italiano', href: '/examenes/cils-celi', code: '05' },
  { name: 'DELF / DALF', language: 'Francés', href: '/examenes/delf-dalf', code: '06' },
  { name: 'TOPIK I', language: 'Coreano', href: '/examenes/topik', code: '07' },
  { name: 'CELPE-Bras', language: 'Portugués', href: '/examenes/celpe-bras', code: '08' },
  { name: 'Cambridge B2 First', language: 'Inglés', href: '/examenes/cambridge-b2', code: '09' },
] as const;

export const FOUNDERS = [
  {
    name: 'Zhanna Korzh',
    role: 'Cofundadora · Dirección académica',
    image: '/images/team-zhanna-korzh.png',
    alt: 'Retrato de Zhanna, cofundadora de Idiomas WeLearn.',
    lead: 'La mirada pedagógica',
    description:
      'Zhanna trabaja con inglés, español, italiano, francés, ruso y japonés. Tiene estudios doctorales en Pedagogía y orienta el criterio académico con el que WeLearn convierte una meta en aprendizaje.',
    languages: ['Inglés', 'Español', 'Italiano', 'Francés', 'Ruso', 'Japonés'],
  },
  {
    name: 'José David Duarte Silva',
    role: 'Cofundador · Dirección general',
    image: '/images/david-duarte.jpg',
    alt: 'Retrato de José David, cofundador de Idiomas WeLearn.',
    lead: 'La experiencia de recorrerlo',
    description:
      'José David ha construido inglés, alemán, italiano, francés, portugués, español, ruso, japonés y coreano mediante disciplina y años de práctica. En WeLearn transforma esa experiencia en rutas que ayudan a saber qué estudiar y por qué.',
    languages: ['Inglés', 'Alemán', 'Italiano', 'Francés', 'Portugués', 'Español', 'Ruso', 'Japonés', 'Coreano'],
  },
] as const;

export const ANSWERS = [
  {
    question: '¿Qué es Idiomas WeLearn?',
    answer:
      'Idiomas WeLearn es una academia de idiomas con sede en Bucaramanga y atención online. Reúne clases, práctica y preparación de exámenes para ayudar a cada persona a avanzar según su punto de partida y su meta.',
  },
  {
    question: '¿Cómo puedo saber qué nivel tengo?',
    answer:
      'Puedes comenzar con Nivel Radar, un diagnóstico adaptativo de inglés que explora vocabulario, uso de la lengua, lectura y escucha. Entrega un resultado orientativo y no sustituye una certificación oficial.',
  },
  {
    question: '¿Qué idiomas puedo estudiar o practicar?',
    answer:
      'WeLearn publica rutas de clases para inglés, coreano, francés, alemán, italiano y portugués. La plataforma de práctica también ofrece herramientas para ruso y japonés. La disponibilidad cambia según el nivel y aparece detallada en cada página.',
  },
  {
    question: '¿Para qué exámenes hay preparación?',
    answer:
      'El catálogo publicado incluye IELTS, TOEFL iBT, ICFES Saber 11, Goethe-Zertifikat, CILS/CELI, DELF/DALF, TOPIK I, CELPE-Bras y Cambridge B2 First.',
  },
  {
    question: '¿Qué puedo practicar?',
    answer:
      'Según el idioma o examen puedes encontrar lectura, escucha, vocabulario, gramática, habla, escritura, ejemplos explicados y simulacros de práctica.',
  },
  {
    question: '¿Recibo correcciones?',
    answer:
      'Algunos ejercicios guiados ofrecen feedback inmediato. La corrección docente y su alcance dependen de la modalidad o servicio contratado.',
  },
  {
    question: '¿Las clases son online o presenciales?',
    answer:
      'WeLearn publica atención presencial en Bucaramanga y clases online. Antes de matricularte, revisa la modalidad, el horario y lo que incluye el plan elegido.',
  },
  {
    question: '¿Cómo comienzo?',
    answer:
      'Puedes conocer tu nivel, explorar un idioma, practicar una habilidad o revisar la preparación para tu examen. Si todavía no sabes qué ruta elegir, puedes hablar con una persona.',
  },
] as const;

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.idiomaswl.com/#website',
      url: 'https://www.idiomaswl.com',
      name: 'Idiomas WeLearn',
      inLanguage: 'es-CO',
      publisher: { '@id': 'https://www.idiomaswl.com/#organization' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.idiomaswl.com/#organization',
      name: 'Idiomas WeLearn',
      url: 'https://www.idiomaswl.com',
      logo: 'https://www.idiomaswl.com/images/welearn-logo.png',
      description:
        'Academia de idiomas con clases, práctica y preparación de exámenes en Bucaramanga y online.',
      sameAs: [
        'https://www.instagram.com/idiomas_welearn/',
        'https://www.tiktok.com/@idiomas.welearn',
      ],
    },
  ],
} as const;
