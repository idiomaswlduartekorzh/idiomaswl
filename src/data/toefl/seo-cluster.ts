export type ToeflSeoClusterLink = {
  href: string;
  title: string;
  description: string;
};

export type ToeflSeoClusterGroup = {
  id: string;
  label: string;
  description: string;
  links: readonly ToeflSeoClusterLink[];
};

export const TOEFL_SEO_CLUSTER_GROUPS: readonly ToeflSeoClusterGroup[] = [
  {
    id: 'entender',
    label: 'Entiende el examen',
    description: 'Empieza por el formato vigente, la escala nueva y una estrategia concreta para cada sección.',
    links: [
      {
        href: '/blog/toefl-ibt-preparacion-guia-completa',
        title: 'Guía TOEFL desde cero',
        description: 'Formato, escala y plan de estudio de diez semanas para colombianos.',
      },
      {
        href: '/blog/toefl-ibt-estructura-completa-y-estrategia-2026',
        title: 'Estructura completa del TOEFL 2026',
        description: 'Tareas vigentes, adaptación, tiempos y puntajes explicados por sección.',
      },
      {
        href: '/blog/toefl-ibt-estrategias-por-seccion',
        title: 'Estrategias para las cuatro secciones',
        description: 'Qué hacer en Reading, Listening, Writing y Speaking, y qué técnicas antiguas descartar.',
      },
    ],
  },
  {
    id: 'practicar',
    label: 'Practica por tarea y sección',
    description: 'Elige ejercicios individuales, una sección completa o un recorrido de práctica.',
    links: [
      {
        href: '/practica/toefl/ejercicios',
        title: 'Biblioteca de ejercicios TOEFL',
        description: 'Doce familias de tareas y 20 sets organizados por Reading, Listening, Writing y Speaking.',
      },
      {
        href: '/practica/toefl/reading',
        title: 'TOEFL Reading',
        description: 'Formato actual, práctica por tarea y habilidades complementarias de lectura.',
      },
      {
        href: '/practica/toefl/listening',
        title: 'TOEFL Listening',
        description: 'Las cuatro tareas actuales y sets con audio original reproducible.',
      },
      {
        href: '/practica/toefl/writing',
        title: 'TOEFL Writing',
        description: 'Build a Sentence, Write an Email y Academic Discussion con práctica cronometrada.',
      },
      {
        href: '/practica/toefl/speaking',
        title: 'TOEFL Speaking',
        description: 'Listen and Repeat y Take an Interview con grabación privada.',
      },
      {
        href: '/blog/toefl-speaking-integrated-tasks-como-responder',
        title: 'Cómo practicar Speaking en 2026',
        description: 'Qué mide cada tarea actual y cómo revisar tus propias grabaciones.',
      },
      {
        href: '/blog/toefl-reading-preguntas-inferencia-y-detalle',
        title: 'Inferencia, detalle y vocabulario en Reading',
        description: 'Cómo aplicar estas habilidades dentro de las tareas vigentes.',
      },
    ],
  },
  {
    id: 'decidir',
    label: 'Toma una decisión informada',
    description: 'Comprueba precio, requisitos y alternativas antes de pagar el examen.',
    links: [
      {
        href: '/blog/cuanto-cuesta-el-toefl-en-colombia-2026',
        title: 'Precio del TOEFL en Colombia',
        description: 'Cómo verificar la tarifa, los cargos, las fechas y las sedes directamente con ETS.',
      },
      {
        href: '/blog/toefl-ibt-puntaje-minimo-canada-universidades',
        title: 'TOEFL para universidades de Canadá',
        description: 'Cómo confirmar el requisito por programa e interpretar la escala de 1 a 6.',
      },
      {
        href: '/blog/ielts-vs-toefl-cual-tomar-en-colombia',
        title: 'IELTS o TOEFL en Colombia',
        description: 'Compara formato, reconocimiento y logística según tu objetivo.',
      },
      {
        href: '/blog/toefl-ibt-vs-toefl-essentials-cual-elegir-2026',
        title: 'TOEFL iBT o TOEFL Essentials',
        description: 'Diferencias entre los dos exámenes y cómo comprobar cuál acepta tu institución.',
      },
    ],
  },
] as const;

export const TOEFL_SEO_CLUSTER_LINKS = TOEFL_SEO_CLUSTER_GROUPS.flatMap((group) => group.links);
