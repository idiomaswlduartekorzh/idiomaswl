import type { EpisodeSection } from '@/components/practica/EpisodeNotes';

export const TOPIK_I_STRATEGY_PODCAST = {
  id: 'topik-i-strategy-map',
  title: 'TOPIK I sin misterio: estrategias para aprobar',
  description: 'Una conversación en español para entender el TOPIK I en papel, entrenar 듣기 y 읽기, interpretar los niveles 1 y 2 y convertir cada simulacro en un plan de mejora concreto.',
  duration: '23:42',
  audioSrc: '/audio/topik/strategy-map/estrategias-para-aprobar-el-topik-i.mp3?v=20260825',
  locale: 'es',
  outcomes: [
    'distinguir TOPIK I, TOPIK II y las modalidades PBT e IBT sin mezclar sus escalas;',
    'ubicar las 70 preguntas, los 100 minutos y los cortes de 80 y 140 puntos del TOPIK I en papel;',
    'reconocer las señales de escucha, lectura, vocabulario y gramática que resuelven cada familia de preguntas;',
    'pasar de un diagnóstico a práctica focalizada, revisión de errores y una nueva medición.',
  ],
  editorialTitle: 'Verificado con la información vigente de NIIED',
  editorialBody: 'Revisado el 25 de agosto de 2026. Esta edición elimina cifras de vocabulario no oficiales, afirmaciones absolutas sobre GKS, inscripción y partículas, y una promesa injustificada de obtener el nivel 2. La guía escrita distingue el TOPIK I PBT del IBT y conserva como variables los requisitos de cada institución y convocatoria.',
} as const;

export const TOPIK_I_STRATEGY_NOTES: EpisodeSection[] = [
  {
    heading: 'Qué es TOPIK I y qué no evalúa',
    body: [
      'TOPIK es la prueba oficial de competencia en coreano administrada bajo el National Institute for International Education de Corea del Sur. TOPIK I corresponde al nivel principiante y puede otorgar el nivel 1 o el nivel 2; TOPIK II es otro examen y cubre los niveles 3 a 6.',
      'TOPIK I evalúa comprensión auditiva y comprensión lectora. No contiene pruebas de producción oral ni de escritura. Leer hangul con fluidez es una base necesaria, pero el examen exige además comprender vocabulario, relaciones gramaticales e información cotidiana bajo presión de tiempo.',
    ],
  },
  {
    heading: 'El mapa del TOPIK I en papel',
    body: [
      'La modalidad tradicional PBT contiene 30 preguntas de 듣기 —escucha— en 40 minutos y 40 preguntas de 읽기 —lectura— en 60 minutos. En total son 70 preguntas, 100 minutos y un máximo de 200 puntos.',
      'La sesión es consecutiva. Antes de presentarla, confirma en la convocatoria local el horario de llegada, el documento aceptado, el procedimiento para responder y cualquier regla operativa vigente.',
    ],
  },
  {
    heading: 'Cómo se determina el nivel',
    body: [
      'En TOPIK I PBT, un total de 80 a 139 puntos otorga el nivel 1 y un total de 140 a 200 otorga el nivel 2. El nivel nace de la suma de escucha y lectura; la escala oficial no establece un mínimo separado que deba aprobarse en cada sección.',
      'Eso permite que una sección más fuerte compense parcialmente otra más débil, pero no convierte el nivel 2 en una garantía. El punto de partida, la amplitud del vocabulario, la velocidad y la constancia determinan cuánto entrenamiento necesita cada persona.',
    ],
  },
  {
    heading: 'PBT e IBT no comparten números',
    body: [
      'TOPIK I IBT se presenta por computador y tiene otra estructura. La información vigente de NIIED indica 26 preguntas de escucha, 26 de lectura, 70 minutos y una escala total de 400 puntos; los cortes de nivel también son distintos.',
      'Nunca combines el número de preguntas, el tiempo o los puntajes del IBT con el examen en papel. La inscripción debe indicar la modalidad concreta para la que te estás preparando.',
    ],
  },
  {
    heading: 'Qué entrenar en 듣기',
    body: [
      'Las tareas de escucha usan intercambios breves y situaciones cotidianas para comprobar si identificas una respuesta apropiada, el lugar, el tema, una razón, la intención o la acción siguiente. En los pasajes más extensos debes conservar la idea central mientras filtras detalles.',
      'Antes de escuchar, compara las opciones y detecta qué información cambia. Durante el audio, sigue quién habla, dónde está, qué quiere y cómo termina la interacción. Una palabra repetida no basta como evidencia: revisa negaciones, números, tiempo y cambios de decisión.',
    ],
  },
  {
    heading: 'Qué entrenar en 읽기',
    body: [
      'Lectura combina vocabulario y gramática en espacios en blanco con avisos, horarios, recibos, mensajes y textos breves. Las decisiones recurrentes son completar una estructura, reconocer el propósito, localizar un detalle, identificar la idea principal y escoger una paráfrasis compatible.',
      'Define primero la tarea, busca la evidencia y elimina las opciones que contradicen un detalle. Traducir cada palabra consume el tiempo disponible; conviene usar partículas, terminaciones verbales, conectores, números y formato visual como señales, sin convertir ninguna señal en una regla absoluta.',
    ],
  },
  {
    heading: 'Partículas: señales útiles, no predicciones infalibles',
    body: [
      'Como orientación inicial, 에 puede marcar destino, ubicación de existencia o tiempo, mientras 에서 puede señalar el lugar donde ocurre una acción o el punto de procedencia. Son usos frecuentes, no definiciones exhaustivas.',
      'Reconocer una partícula reduce las interpretaciones posibles, pero no permite conocer “con absoluta certeza” el verbo que aparecerá. Comprueba siempre el sustantivo, la terminación verbal y el significado de la oración completa.',
    ],
  },
  {
    heading: 'Vocabulario útil sin una cifra mágica',
    body: [
      'NIIED no fija en su tabla del examen una cantidad oficial de palabras que garantice cada nivel. Las listas de frecuencia pueden orientar el estudio, pero cifras como 800 o 2.000 palabras son estimaciones pedagógicas y no requisitos de certificación.',
      'Prioriza vocabulario dentro de situaciones: familia, transporte, compras, comida, salud, escuela, trabajo, clima y rutinas. Añade verbos de acción, adverbios de tiempo, números, contadores y conectores; aprende cada elemento dentro de una frase que muestre cómo funciona.',
    ],
  },
  {
    heading: 'La práctica que sí cambia el resultado',
    body: [
      'El ciclo es Diagnosticar → Clasificar → Entrenar → Repetir → Transferir. Empieza con una práctica cronometrada y separa los resultados de escucha y lectura. En cada error identifica la causa: vocabulario, gramática, reconocimiento del sonido, atención, inferencia, velocidad o estrategia.',
      'Entrena la causa concreta antes de abrir otro examen completo. Después usa un conjunto nuevo para comprobar transferencia. Acumular simulacros sin revisar evidencia solo repite los mismos patrones con mayor velocidad.',
    ],
  },
  {
    heading: 'Un plan adaptable de ocho semanas',
    body: [
      'Ocho semanas son una estructura de trabajo, no una promesa de certificación. Si todavía descifras cada sílaba lentamente o partes con poco vocabulario, amplía el ciclo y consolida primero la base.',
    ],
    bullets: [
      'Semanas 1–2: automatiza hangul, toma el diagnóstico y repasa partículas, números y vocabulario cotidiano.',
      'Semanas 3–4: practica por familias de preguntas y empieza un registro de errores.',
      'Semanas 5–6: combina escucha y lectura en bloques cronometrados y ataca las dos debilidades principales.',
      'Semana 7: realiza simulaciones representativas y ajusta el ritmo.',
      'Semana 8: consolida, revisa errores recurrentes y confirma la logística oficial.',
    ],
  },
  {
    heading: 'Certificados, becas y trámites',
    body: [
      'TOPIK no funciona como una llave universal. Universidades, empleadores, programas de becas y autoridades migratorias establecen sus propios requisitos. Tampoco existe una equivalencia automática y oficial entre TOPIK 1–2 y A1–A2 del MCER.',
      'Las condiciones de GKS varían por convocatoria y modalidad. Las guías generales contemplan formación lingüística para muchos becarios, pero debes consultar la convocatoria vigente y la institución receptora. Para el examen, revisa siempre el anuncio del centro local: las sedes, cupos, documentos y fechas pueden cambiar.',
    ],
  },
  {
    heading: 'Tus siguientes siete acciones',
    body: [
      'Confirma que TOPIK I corresponde a tu meta. Identifica si presentarás PBT o IBT. Haz un diagnóstico sin ayuda. Separa escucha y lectura. Clasifica cada error. Entrena las dos causas principales. Repite con preguntas nuevas y compara la evidencia.',
      'No necesitas comprender cada palabra. Necesitas reconocer la tarea, detectar las señales pertinentes, administrar el tiempo y convertir cada equivocación en una decisión específica de estudio.',
    ],
  },
];
