import type { EpisodeSection } from '@/components/practica/EpisodeNotes';

export const GOETHE_ZERTIFIKAT_STRATEGY_PODCAST = {
  id: 'goethe-zertifikat-strategy-map',
  title: 'Estrategias para aprobar el Goethe-Zertifikat',
  description: 'Una conversación en español para entender la familia Goethe-Zertifikat, elegir el nivel correcto, entrenar Lesen, Hören, Schreiben y Sprechen y transformar los resultados de práctica en un plan de mejora medible.',
  duration: '21:13',
  audioSrc: '/audio/goethe/strategy-map/estrategias-para-aprobar-el-goethe-zertifikat.mp3?v=20260828',
  locale: 'es',
  outcomes: [
    'distinguir los niveles A1–C2 y comprobar qué certificado exige cada trámite o institución;',
    'entender los cuatro módulos y usar la información oficial correspondiente al nivel elegido;',
    'entrenar lectura, escucha, escritura y expresión oral mediante decisiones observables, no solo exposición al idioma;',
    'convertir un simulacro en un registro de errores, práctica focalizada y una nueva medición.',
  ],
  editorialTitle: 'Edición auditada con fuentes oficiales',
  editorialBody: 'Revisado el 28 de agosto de 2026. Esta versión elimina precios y reglas logísticas que pueden variar, generalizaciones sobre sedes y trámites, y explicaciones neurocientíficas que no hacían falta para enseñar la estrategia. Conserva los datos oficiales usados como ejemplo para Goethe-Zertifikat B1 y separa las reglas del examen de las recomendaciones de estudio.',
} as const;

export const GOETHE_ZERTIFIKAT_STRATEGY_NOTES: EpisodeSection[] = [
  {
    heading: 'Una familia de exámenes, no una sola prueba',
    body: [
      'Goethe-Zertifikat certifica alemán desde A1 hasta C2. El formato, la duración, las tareas y los criterios dependen del nivel, por lo que una estrategia útil empieza por consultar la página y el modelo oficial del examen concreto que vas a presentar.',
      'El nivel correcto no se elige por intuición ni por el tiempo que llevas estudiando. Confirma primero qué certificado acepta la universidad, empleador, autoridad o trámite y después usa una prueba diagnóstica representativa para comprobar tu punto de partida.',
    ],
  },
  {
    heading: 'Los cuatro módulos',
    body: [
      'La preparación se organiza alrededor de Lesen —lectura—, Hören —escucha—, Schreiben —escritura— y Sprechen —expresión oral—. Compartir nombres no significa que las tareas sean iguales en todos los niveles: cambian la longitud, la complejidad, el tipo de interacción y lo que debe demostrar el candidato.',
      'Desde B1, el Goethe-Institut presenta el examen en módulos que pueden realizarse individualmente o en conjunto, sujeto a las condiciones vigentes del centro examinador. Revisa siempre la normativa oficial de tu nivel y convocatoria antes de tomar decisiones de inscripción.',
    ],
  },
  {
    heading: 'B1 como ejemplo concreto de estructura',
    body: [
      'En el Goethe-Zertifikat B1, Lesen dura 65 minutos, Hören aproximadamente 40, Schreiben 60 y Sprechen aproximadamente 15. La prueba oral suele realizarse en pareja y contempla tiempo de preparación. Estas cifras pertenecen a B1 y no deben trasladarse automáticamente a A1, A2, B2, C1 o C2.',
      'En Lesen y Hören de B1 hay 30 ítems en cada módulo. Las respuestas objetivas se convierten a una escala de 100; 30 respuestas correctas equivalen a 100 puntos, por eso cada acierto representa aproximadamente 3,33 puntos en esa conversión.',
    ],
  },
  {
    heading: 'Cómo leer el resultado',
    body: [
      'En B1, cada módulo se evalúa por separado y se supera desde 60 puntos o 60 %. La escritura y la expresión oral se valoran mediante criterios publicados; no basta con contar errores gramaticales ni con estimar una nota global a partir de una impresión general.',
      'Las producciones de Schreiben y Sprechen son evaluadas por dos personas. Si sus valoraciones se separan más de lo permitido por la normativa, interviene una tercera evaluación. Conocer la rúbrica ayuda a practicar lo que realmente se observa: cumplimiento de la tarea, organización, recursos lingüísticos e interacción, según el módulo.',
    ],
  },
  {
    heading: 'Lesen: localizar evidencia y controlar inferencias',
    body: [
      'Antes de leer en detalle, identifica qué decisión exige la tarea: propósito, correspondencia, información específica, postura o relación entre ideas. Después localiza palabras clave y, sobre todo, paráfrasis; la respuesta suele expresar la misma idea con vocabulario distinto.',
      'No conviertas una posibilidad razonable en evidencia. Marca la frase que sostiene la respuesta, descarta opciones demasiado amplias o absolutas y registra si el error nació de vocabulario, estructura, inferencia o presión de tiempo.',
    ],
  },
  {
    heading: 'Hören: anticipar sin adivinar',
    body: [
      'Usa los segundos previos para comparar las opciones y predecir qué información distinguirá una de otra. Durante el audio, sigue quién habla, dónde, con qué intención y cuál es la decisión final; presta especial atención a negaciones, cifras, correcciones y cambios de opinión.',
      'Escuchar mucho alemán ayuda, pero la práctica de examen exige revisar por qué una opción era atractiva y qué señal confirmó la correcta. Alterna escucha extensiva con tareas cortas, corrección inmediata y una segunda escucha enfocada en la evidencia perdida.',
    ],
  },
  {
    heading: 'Schreiben: responder la tarea con una arquitectura visible',
    body: [
      'Lee la consigna como una lista de obligaciones. Define destinatario, propósito, registro y puntos que debes cubrir antes de escribir. Organiza las ideas para que el lector pueda seguirlas y reserva tiempo para revisar terminaciones, orden verbal, concordancia, conectores y omisiones.',
      'Una plantilla puede liberar memoria durante la práctica, pero no debe sustituir la respuesta real a la consigna. Compara cada texto con la rúbrica del nivel, elige uno o dos patrones prioritarios y reescribe; acumular redacciones sin revisión reproduce los mismos errores.',
    ],
  },
  {
    heading: 'Sprechen: interacción, estructura y reparación',
    body: [
      'Practica con las condiciones del módulo: preparación limitada, turnos, presentación o conversación según el nivel. Entrena aperturas, desarrollo, ejemplos, preguntas de seguimiento, acuerdos, desacuerdos y formas de pedir aclaración sin convertir la respuesta en un guion memorizado.',
      'Grábate y revisa evidencia observable: si cumpliste la tarea, si la idea avanzó, si respondiste al interlocutor, qué pausas interrumpieron el mensaje y qué errores se repitieron. La meta no es sonar perfecto, sino comunicar de manera comprensible y adecuada al nivel evaluado.',
    ],
  },
  {
    heading: 'El ciclo de mejora',
    body: [
      'La secuencia es Diagnosticar → Clasificar → Entrenar → Repetir → Transferir. Comienza con un modelo oficial o una simulación representativa, separa el resultado por módulo y clasifica cada error por causa: conocimiento, comprensión de la tarea, estrategia, producción, tiempo o descuido.',
      'Practica la causa principal en bloques breves, vuelve a resolver una tarea equivalente y finalmente comprueba la transferencia con material nuevo. Un puntaje sin análisis describe el pasado; un registro de errores bien hecho decide qué estudiar mañana.',
    ],
  },
  {
    heading: 'Cómo usar la ruta de WeLearn',
    body: [
      'Empieza en el hub de Goethe para confirmar nivel, estructura y simulacros disponibles. Haz un diagnóstico bajo tiempo, conserva el resultado de cada módulo y usa la guía escrita para elegir una sola debilidad prioritaria. Después practica esa habilidad en alemán y regresa a un conjunto nuevo.',
      'WeLearn es una plataforma independiente y no representa al Goethe-Institut. Para fechas, precios, sedes, documentos, modalidades y reglas de certificación, consulta siempre el Goethe-Institut y el centro examinador autorizado antes de inscribirte.',
    ],
    bullets: [
      'Confirma el nivel y el objetivo oficial de tu trámite.',
      'Descarga el modelo y la normativa del nivel exacto.',
      'Haz un diagnóstico por módulos y registra el tiempo.',
      'Clasifica los errores por causa, no solo por pregunta.',
      'Entrena la debilidad principal con retroalimentación.',
      'Repite con una tarea nueva y compara la evidencia.',
    ],
  },
];
