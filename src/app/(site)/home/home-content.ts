export const HOME_META = {
  title: 'Clases de inglés e idiomas en Bucaramanga y online | WeLearn',
  description:
    'Clases de inglés y otros idiomas en Bucaramanga y online, guiadas por una lingüista que habla seis idiomas y un políglota que aprendió ocho desde el español.',
  canonical: 'https://www.idiomaswl.com/',
  ogTitle: 'Clases de inglés y otros idiomas con profesores políglotas | WeLearn',
  ogDescription:
    'Conoce tu punto de partida y conecta clases, práctica y preparación de exámenes con una meta concreta.',
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
    title: 'Tu punto de partida, antes de recomendarte una ruta.',
    description:
      'Nivel Radar explora vocabulario, uso de la lengua, lectura y escucha. No entrega una certificación: organiza lo que ya sabes y lo que conviene revisar primero.',
    fragments: ['nivel', 'lectura', 'escucha'],
    result: 'Un mapa inicial',
    href: '/nivel-radar',
    linkLabel: 'Hacer el Nivel Radar',
  },
  {
    step: 'Comprender',
    title: 'Convertimos bloqueos y errores en prioridades concretas.',
    description:
      'Separamos el idioma en capacidades observables: comprender, construir, expresarte e interactuar. Así evitamos empezar de cero cuando no hace falta.',
    fragments: ['vocabulario', 'estructuras', 'comprensión'],
    result: 'Una prioridad clara',
    href: '#habilidades',
    linkLabel: 'Ver las habilidades',
  },
  {
    step: 'Practicar',
    title: 'Cada ejercicio entrena algo que vas a necesitar.',
    description:
      'La ruta conecta explicaciones y ejemplos con lectura, escucha, gramática, vocabulario, habla, escritura o simulacros, según la meta.',
    fragments: ['explicación', 'ejemplo', 'tarea'],
    result: 'Práctica con propósito',
    href: '/practica',
    linkLabel: 'Explorar la práctica',
  },
  {
    step: 'Corregir',
    title: 'El siguiente intento debe ser mejor que el anterior.',
    description:
      'Algunos ejercicios ofrecen feedback inmediato. En las modalidades acompañadas, la corrección docente ayuda a entender el criterio y decidir qué ajustar.',
    fragments: ['respuesta', 'criterio', 'ajuste'],
    result: 'Un siguiente paso',
    href: '/metodo',
    linkLabel: 'Conocer cómo enseñamos',
  },
] as const;

export const EVIDENCE_STEPS = [
  {
    step: 'Observar',
    title: 'Separamos el progreso por habilidad.',
    description:
      'La práctica separa escucha, lectura y producción para que el avance no dependa de una sensación general.',
    result: 'Señales que se pueden comparar',
    href: '/practica',
    linkLabel: 'Explorar la práctica',
  },
  {
    step: 'Relacionar',
    title: 'Comparamos el intento antes y después del feedback.',
    description:
      'Un intento cobra valor cuando puede compararse con un criterio, recibir feedback y orientar la siguiente decisión.',
    result: 'Progreso que se puede explicar',
    href: '/metodo',
    linkLabel: 'Conocer el método',
  },
  {
    step: 'Comprobar',
    title: 'Contrastamos la preparación con la tarea real.',
    description:
      'Los simulacros, reportes y resultados permiten contrastar la ruta con la tarea o el examen que la persona necesita enfrentar.',
    result: 'Evidencia antes que promesas',
    href: '#resultados',
    linkLabel: 'Ver cómo publicaremos resultados',
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
    title: 'Cursos y explicaciones por idioma y nivel.',
    description:
      'Construye vocabulario, estructuras y comprensión con ejemplos que conectan el contenido nuevo con lo que ya sabes.',
    href: '/clases-de-idiomas',
    linkLabel: 'Explorar clases e idiomas',
    visual: 'lesson',
  },
  {
    eyebrow: 'Practicar',
    title: '465 temas y tareas para trabajar habilidades concretas.',
    description:
      'Entrena lectura, escucha, vocabulario, gramática, habla y escritura según lo publicado en cada idioma y nivel.',
    href: '/practica',
    linkLabel: 'Explorar toda la práctica',
    visual: 'practice',
  },
  {
    eyebrow: 'Corregir',
    title: 'Feedback que explica el criterio, no solo la respuesta.',
    description:
      'Los ejercicios guiados pueden mostrar feedback inmediato, criterios de respuesta y ejemplos explicados.',
    href: '/practica/ielts/academic/writing/task2/opinion',
    linkLabel: 'Ver una práctica de Writing',
    visual: 'feedback',
  },
  {
    eyebrow: 'Preparar',
    title: 'Simulacros y práctica por sección de examen.',
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
      'Zhanna es lingüista y profesora universitaria titulada en Rusia, con estudios doctorales en idiomas germánicos. Enseña desde 2011 y dirige el criterio académico con el que WeLearn convierte una meta en aprendizaje.',
    languages: ['Ruso nativo', 'Inglés C1', 'Español C1', 'Francés B2', 'Italiano A2', 'Japonés'],
  },
  {
    name: 'José David Duarte Silva',
    role: 'Cofundador · Dirección general',
    image: '/images/david-duarte.jpg',
    alt: 'Retrato de José David, cofundador de Idiomas WeLearn.',
    lead: 'La experiencia de recorrerlo',
    description:
      'José David es ingeniero industrial y políglota en ocho idiomas. Los aprendió desde el español, siendo adulto y mediante años de disciplina; en WeLearn transforma ese recorrido en rutas que ayudan a saber qué estudiar y por qué.',
    languages: ['Español nativo', 'Inglés C2', 'Italiano C1', 'Portugués C1', 'Francés B2', 'Alemán B2', 'Ruso B1', 'Coreano B1'],
  },
] as const;

export const ANSWERS = [
  {
    question: '¿Qué es Idiomas WeLearn?',
    answer:
      'Idiomas WeLearn es una academia de idiomas con sede en Bucaramanga y atención online. Reúne clases, práctica y preparación de exámenes para ayudar a cada persona a avanzar según su punto de partida y su meta.',
  },
  {
    question: '¿Dónde ofrece WeLearn clases de idiomas en Bucaramanga?',
    answer:
      'Idiomas WeLearn atiende presencialmente en la Calle 47 # 29-33, Sotomayor, Bucaramanga. También ofrece clases online; la modalidad, el horario y lo incluido dependen del plan elegido.',
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
    question: '¿Nivel Radar certifica mi nivel de inglés?',
    answer:
      'No. Nivel Radar es un diagnóstico orientativo de inglés que explora vocabulario, uso de la lengua, lectura y escucha. Sirve para organizar un punto de partida, pero no sustituye IELTS, TOEFL u otra certificación oficial.',
  },
  {
    question: '¿Qué puedo practicar dentro de WeLearn?',
    answer:
      'La plataforma reúne 465 temas de práctica gramatical en ocho idiomas, además de lectura, escucha, vocabulario, habla, escritura y recursos de examen según la ruta publicada. La disponibilidad exacta aparece en cada página.',
  },
  {
    question: '¿Cómo funciona la ruta de aprendizaje?',
    answer:
      'La ruta comienza reconociendo el punto de partida y la meta. Después prioriza una habilidad, conecta explicación y práctica, incorpora feedback cuando está disponible y orienta el siguiente intento.',
  },
  {
    question: '¿Los ejercicios incluyen correcciones?',
    answer:
      'Algunos ejercicios guiados ofrecen feedback inmediato, criterios y ejemplos explicados. La corrección docente y su alcance dependen de la modalidad o servicio contratado.',
  },
  {
    question: '¿Cómo puedo comenzar en WeLearn?',
    answer:
      'Si todavía no sabes qué estudiar, comienza con Nivel Radar o habla con el equipo. Si ya tienes una meta, puedes entrar directamente por tu idioma, una habilidad o la preparación para tu examen.',
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
      founder: [
        { '@id': 'https://www.idiomaswl.com/#zhanna' },
        { '@id': 'https://www.idiomaswl.com/#david' },
      ],
      sameAs: [
        'https://www.instagram.com/idiomas_welearn/',
        'https://www.tiktok.com/@idiomas.welearn',
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.idiomaswl.com/#zhanna',
      name: 'Zhanna Korzh',
      jobTitle: 'Cofundadora y directora académica de Idiomas WeLearn',
      worksFor: { '@id': 'https://www.idiomaswl.com/#localbusiness' },
      image: 'https://www.idiomaswl.com/images/team-zhanna-korzh.png',
      knowsLanguage: ['ru', 'en', 'es', 'fr', 'it', 'ja'],
      description:
        'Lingüista y profesora universitaria titulada por la Universidad Estatal de Oremburgo, con estudios de doctorado en idiomas germánicos. Enseña desde 2011.',
    },
    {
      '@type': 'Person',
      '@id': 'https://www.idiomaswl.com/#david',
      name: 'José David Duarte Silva',
      jobTitle: 'Políglota y cofundador de Idiomas WeLearn',
      worksFor: { '@id': 'https://www.idiomaswl.com/#localbusiness' },
      image: 'https://www.idiomaswl.com/images/david-duarte.jpg',
      knowsLanguage: ['es', 'en', 'it', 'pt', 'fr', 'de', 'ru', 'ko'],
      description:
        'Ingeniero industrial y políglota activo en ocho idiomas, aprendidos desde el español mediante disciplina y años de práctica.',
    },
    {
      '@type': ['LocalBusiness', 'LanguageSchool'],
      '@id': 'https://www.idiomaswl.com/#localbusiness',
      name: 'Idiomas WeLearn',
      url: 'https://www.idiomaswl.com/',
      telephone: '+573005004253',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle 47 # 29-33, Sotomayor',
        addressLocality: 'Bucaramanga',
        addressRegion: 'Santander',
        postalCode: '680001',
        addressCountry: 'CO',
      },
      founder: [
        { '@id': 'https://www.idiomaswl.com/#zhanna' },
        { '@id': 'https://www.idiomaswl.com/#david' },
      ],
      parentOrganization: { '@id': 'https://www.idiomaswl.com/#organization' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: ANSWERS.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com/' },
      ],
    },
  ],
} as const;
