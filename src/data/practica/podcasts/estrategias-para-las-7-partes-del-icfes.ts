import type { EpisodeSection } from '@/components/practica/EpisodeNotes';

export const ICFES_SEVEN_PARTS_PODCAST = {
  id: 'icfes-seven-parts-strategy',
  title: 'Estrategias para dominar las 7 partes del ICFES',
  description: 'Una conversación en español para entender qué evalúa el componente de inglés del Saber 11, cómo cambia la exigencia entre sus siete partes y cómo convertir cada error en una práctica concreta.',
  duration: '25:48',
  audioSrc: '/audio/icfes/strategy-map/estrategias-para-las-7-partes-del-icfes.mp3?v=20260821',
  locale: 'es',
  outcomes: [
    'distinguir el puntaje de inglés, el nivel reportado y el puntaje global del Saber 11;',
    'reconocer la mecánica, la habilidad central y las trampas de cada una de las siete partes;',
    'administrar la segunda sesión sin confundir sus 4 horas y 30 minutos con un tiempo exclusivo para inglés;',
    'pasar del diagnóstico a un ciclo de práctica, evidencia, corrección de errores y simulación.',
  ],
  editorialTitle: 'Verificado con la guía oficial Saber 11 2026-2',
  editorialBody: 'Revisado el 21 de agosto de 2026. El formato estándar incluye 55 preguntas de inglés en la segunda sesión; el resultado se reporta de 0 a 100 y de Pre A1 a B1. Las proporciones por parte son aproximadas y los cuadernillos históricos pueden tener otra extensión.',
} as const;

export const ICFES_SEVEN_PARTS_NOTES: EpisodeSection[] = [
  {
    heading: 'Qué evalúa realmente el componente de inglés',
    body: [
      'El componente de inglés del Saber 11 evalúa lectura y uso de la lengua. No contiene una prueba independiente de listening, speaking o writing: todas las decisiones nacen de textos escritos, desde una definición breve hasta un texto continuo.',
      'Eso no vuelve inútiles las demás habilidades para aprender inglés; solo significa que, si el objetivo inmediato es mejorar este resultado, la práctica debe concentrarse en vocabulario en contexto, gramática, pragmática y comprensión literal e inferencial.',
    ],
  },
  {
    heading: 'Dónde aparece y cuánto tiempo tienes',
    body: [
      'La guía Saber 11 2026-2 ubica 55 preguntas de inglés en la segunda sesión. Las 4 horas y 30 minutos corresponden a la sesión completa, donde inglés comparte tiempo con otras pruebas y cuestionarios; el ICFES no asigna en esa guía un cronómetro independiente de 60 minutos para inglés.',
      'La estrategia práctica es fijar un presupuesto propio, avanzar cuando una pregunta se atasca y guardar margen para las partes de lectura y cloze del final. En un cuadernillo histórico o una práctica abreviada, usa el número de preguntas y el tiempo que ese recurso indique.',
    ],
  },
  {
    heading: 'Cómo leer el resultado sin confundir escalas',
    body: [
      'Inglés se reporta de 0 a 100: Pre A1 de 0 a 36, A1 de 37 a 57, A2 de 58 a 70 y B1 de 71 a 100. B1 es el nivel más alto que reporta actualmente este componente; llegar a 100 no equivale a certificar B2 o C1.',
      'El puntaje global del Saber 11 usa una escala de 0 a 500 y se calcula con ponderaciones, no como una suma simple de todos los puntajes. Tampoco existe un puntaje universal para “pasar inglés”: cada universidad, beca o convocatoria define cómo usa el resultado.',
    ],
  },
  {
    heading: 'Parte 1: relacionar definiciones con palabras',
    body: [
      'La tarea presenta cinco descripciones y siete palabras disponibles, identificadas de A a G. Debes escoger la palabra que corresponde a cada descripción; sobran dos opciones. La letra H que puede verse en un ejemplo resuelto no es una octava opción utilizable.',
      'La subhabilidad clave es reconocer rasgos definitorios, no traducir palabra por palabra. Conviene anticipar la categoría de la respuesta —persona, objeto, lugar o acción—, subrayar los rasgos que la distinguen y dejar para el final las parejas dudosas.',
    ],
  },
  {
    heading: 'Parte 2: entender avisos por su función',
    body: [
      'Aquí una frase corta debe relacionarse con el lugar, la situación o la audiencia donde tendría sentido. La pregunta real no es solo “qué significa”, sino “para qué sirve y dónde aparecería”.',
      'Busca señales de contexto: prohibiciones, horarios, instrucciones, vocabulario propio de un servicio y tono. Descarta opciones que compartan palabras con el aviso pero no expliquen su propósito.',
    ],
  },
  {
    heading: 'Parte 3: completar conversaciones con pragmática',
    body: [
      'Una respuesta puede ser gramatical y aun así no encajar en la conversación. Esta parte exige identificar la intención del turno anterior: pedir ayuda, invitar, disculparse, opinar, agradecer o confirmar.',
      'Antes de mirar las opciones, predice qué función debe cumplir la respuesta. Luego comprueba pronombres, tiempo verbal, registro y coherencia con el siguiente turno. Esa predicción reduce el efecto de los distractores que “suenan a inglés” pero responden otra cosa.',
    ],
  },
  {
    heading: 'Parte 4: gramática dentro de un texto',
    body: [
      'Los espacios se resuelven con la estructura de la oración y con la lógica del texto. Determina primero qué falta: tiempo verbal, preposición, pronombre, conector, artículo u otra categoría; después compara las opciones.',
      'Las palabras vecinas suelen dar la pista más rápida, pero no siempre bastan. Relee la oración completa y, cuando haya conectores, referencias o tiempos verbales, comprueba también las frases que la rodean.',
    ],
  },
  {
    heading: 'Parte 5: lectura literal y paráfrasis',
    body: [
      'Estas preguntas piden localizar una idea expresada en el texto, aunque la opción correcta use palabras distintas. El trabajo central es reconocer paráfrasis y volver a una evidencia concreta.',
      'Lee primero la pregunta para saber qué buscar, ubica el pasaje relevante y compara cada opción con esa línea. Una respuesta plausible por conocimiento general no cuenta si el texto no la sostiene.',
    ],
  },
  {
    heading: 'Parte 6: inferencia, propósito y postura',
    body: [
      'La respuesta no suele estar copiada de forma literal, pero sí debe poder demostrarse con varias pistas: tono, contraste, selección de detalles, causa y efecto o intención del autor. Inferir no es inventar.',
      'Formula una conclusión breve antes de mirar las opciones y exige evidencia para cada palabra importante. Las afirmaciones extremas pueden ser distractores, pero no se eliminan automáticamente: se eliminan cuando exageran o contradicen el alcance del texto.',
    ],
  },
  {
    heading: 'Parte 7: vocabulario y gramática en un cloze',
    body: [
      'En un texto con espacios, varias opciones pueden parecer posibles aisladas. La correcta debe encajar a la vez en significado, forma gramatical, colocación y cohesión con el resto del pasaje.',
      'Haz una primera lectura sin responder para captar tema y tono. En cada espacio, identifica la categoría necesaria, prueba la combinación natural y vuelve a leer la oración completa. Al final, recorre el texto seguido para detectar saltos de lógica.',
    ],
  },
  {
    heading: 'La clave maestra: una secuencia para las siete partes',
    body: [
      'La misma rutina puede guiar toda la prueba: reconoce qué decisión pide la parte, predice el tipo de respuesta, localiza la evidencia, elimina opciones por una razón verificable, responde y audita solo si aparece información nueva.',
      'La predicción cambia según la tarea —una categoría en la Parte 1, una función comunicativa en la Parte 3 o una categoría gramatical en la Parte 7—, pero evita que cada distractor dirija tu razonamiento.',
    ],
  },
  {
    heading: 'Cómo convertir errores en un plan de mejora',
    body: [
      'Empieza con un diagnóstico que cubra las siete partes. No registres solo correcto o incorrecto: clasifica la causa. ¿Faltó vocabulario, gramática, evidencia, inferencia, reconocimiento del formato o tiempo?',
      'Practica primero la subhabilidad más débil con apoyo y sin presión; después llévala a preguntas mixtas y finalmente a una simulación cronometrada. El progreso aparece cuando el mismo tipo de error deja de repetirse, no cuando acumulas exámenes completos.',
    ],
    bullets: [
      'Días 1–2: diagnóstico y clasificación de errores.',
      'Días 3–5: micropráctica de una o dos debilidades concretas.',
      'Día 6: bloque mixto con tiempo y revisión de evidencia.',
      'Día 7: repaso de errores y ajuste de la siguiente semana.',
    ],
  },
];
