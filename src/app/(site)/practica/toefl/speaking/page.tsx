import type { Metadata } from 'next';

import ToeflSectionHub from '../ToeflSectionHub';

const URL = 'https://www.idiomaswl.com/practica/toefl/speaking';

export const metadata: Metadata = {
  title: 'TOEFL Speaking 2026: formato, tareas y práctica',
  description: 'Practica TOEFL Speaking con Listen and Repeat y Take an Interview. Graba respuestas privadas y aplica la estrategia en 20 simulacros WeLearn.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'TOEFL Speaking 2026: formato y práctica',
    description: 'Listen and Repeat, Take an Interview y práctica de grabación dentro de 20 simulacros originales.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
};

const tasks = [
  {
    title: 'Listen and Repeat',
    description: 'Escuchas una oración y la repites con la mayor fidelidad posible, conservando palabras, grupos de sentido y rasgos de pronunciación.',
    measures: 'procesamiento oral, precisión e inteligibilidad',
  },
  {
    title: 'Take an Interview',
    description: 'Respondes espontáneamente preguntas dentro de una entrevista simulada y desarrollas ideas con claridad, control y ritmo sostenible.',
    measures: 'respuesta espontánea, desarrollo y claridad',
  },
] as const;

const faqs = [
  {
    question: '¿Cuáles son las tareas de TOEFL Speaking en 2026?',
    answer: 'La sección vigente usa dos familias: Listen and Repeat y Take an Interview. Las antiguas tareas integradas no son la estructura principal del examen posterior al 21 de enero de 2026.',
  },
  {
    question: '¿Dónde puedo practicar TOEFL Speaking en WeLearn?',
    answer: 'Listen and Repeat y Take an Interview están disponibles dentro de los 20 simulacros WeLearn. La práctica individual por tarea todavía está en desarrollo.',
  },
  {
    question: '¿TOEFL Speaking 2026 es adaptativo?',
    answer: 'No. ETS identifica Reading y Listening como las secciones adaptativas; Speaking mantiene una estructura fija con Listen and Repeat y Take an Interview.',
  },
  {
    question: '¿Qué pasa con mis grabaciones en WeLearn?',
    answer: 'Las respuestas orales se envían al almacenamiento privado asociado con la entrega del simulacro para permitir su revisión. No se publican como páginas abiertas ni forman parte del contenido indexable.',
  },
];

export default function ToeflSpeakingPage() {
  return (
    <ToeflSectionHub
      section="Speaking"
      url={URL}
      title="TOEFL Speaking 2026: tareas y práctica"
      lead="Practica Listen and Repeat y Take an Interview, graba tus respuestas y entrena claridad, memoria oral y desarrollo espontáneo dentro de los 20 simulacros WeLearn."
      facts={[
        { value: '2', label: 'familias de tarea actuales' },
        { value: 'Fijo', label: 'no es una sección adaptativa' },
        { value: '20', label: 'recorridos WeLearn disponibles' },
        { value: 'Privada', label: 'grabación para revisión' },
      ]}
      tasks={[...tasks]}
      officialSummary={[
        'El cambio de 2026 sustituyó el mapa anterior por dos familias. Listen and Repeat exige conservar el mensaje que acabas de oír; Take an Interview exige producir respuestas propias sin preparar un discurso memorizado.',
        'La sección exige procesar, planear y hablar sin convertir la respuesta en un discurso memorizado. Practicar una sola respuesta larga no reproduce la variedad entre repetición precisa y entrevista espontánea.',
      ]}
      practiceSteps={[
        'Comprueba el micrófono antes de iniciar y usa una distancia constante para que el volumen no cambie entre respuestas.',
        'En Listen and Repeat, escucha por grupos de sentido y conserva primero el contenido; no sacrifiques palabras por imitar un acento.',
        'En Take an Interview, responde la pregunta en la primera frase, añade una razón y cierra con un ejemplo concreto.',
        'Escucha tu grabación una vez y anota un solo objetivo para el siguiente simulacro: claridad, precisión, ritmo o desarrollo.',
      ]}
      weLearnSummary="Veinte recorridos con grabación para las dos familias vigentes. Las respuestas orales se conservan de forma privada para revisión y no se convierten en páginas públicas."
      officialUrl="https://www.ets.org/toefl/test-takers/ibt/about/content/speaking.html"
      faqs={[...faqs]}
    />
  );
}
