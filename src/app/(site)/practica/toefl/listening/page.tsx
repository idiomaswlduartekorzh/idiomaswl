import type { Metadata } from 'next';

import ToeflSectionHub from '../ToeflSectionHub';

const URL = 'https://www.idiomaswl.com/practica/toefl/listening';

export const metadata: Metadata = {
  title: 'TOEFL Listening 2026: formato, tareas y simulacros',
  description: 'Practica TOEFL Listening con las cuatro tareas del formato 2026 y aplica la estrategia en 20 simulacros originales de WeLearn con audio.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'TOEFL Listening 2026: formato y práctica',
    description: 'Las cuatro tareas actuales de TOEFL Listening y 20 simulacros originales para aplicar la estrategia.',
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
};

const tasks = [
  {
    title: 'Listen and Choose a Response',
    description: 'Escuchas una intervención breve y eliges la respuesta que mejor encaja con su intención y con el contexto.',
    measures: 'intención, pragmática y respuesta apropiada',
  },
  {
    title: 'Listen to a Conversation',
    description: 'Escuchas un diálogo principalmente relacionado con la vida universitaria y respondes sobre ideas, detalles e inferencias.',
    measures: 'idea principal, detalles e intención del hablante',
  },
  {
    title: 'Listen to an Announcement',
    description: 'Procesas un anuncio de contexto académico o de campus y distingues propósito, organización e información accionable.',
    measures: 'propósito, secuencia e información clave',
  },
  {
    title: 'Listen to an Academic Talk',
    description: 'Sigues una explicación académica, reconoces cómo se organiza y conectas ejemplos con la idea central.',
    measures: 'organización, relaciones y contenido académico',
  },
] as const;

const faqs = [
  {
    question: '¿Cuáles son las tareas de TOEFL Listening en 2026?',
    answer: 'ETS publica cuatro: Listen and Choose a Response, Listen to a Conversation, Listen to an Announcement y Listen to an Academic Talk.',
  },
  {
    question: '¿TOEFL Listening 2026 es adaptativo?',
    answer: 'Sí. En el examen oficial, Reading y Listening usan un diseño adaptativo por módulos, así que la cantidad exacta de ítems y el tiempo pueden variar. Los simulacros WeLearn son fijos y sirven para comparar tus intentos; no reproducen ese algoritmo.',
  },
  {
    question: '¿Es normal encontrar audios muy cortos en TOEFL Listening?',
    answer: 'Sí, en Listen and Choose a Response una intervención puede durar pocos segundos. Eso no significa que toda la sección sea así: conversaciones, anuncios y charlas académicas necesitan audios más extensos y varias preguntas.',
  },
  {
    question: '¿Los audios de WeLearn son oficiales de ETS?',
    answer: 'No. Son materiales originales de WeLearn creados para practicar las familias de tarea actuales. TOEFL y TOEFL iBT son marcas de ETS; WeLearn no está afiliado con ETS.',
  },
];

export default function ToeflListeningPage() {
  return (
    <ToeflSectionHub
      section="Listening"
      url={URL}
      title="TOEFL Listening 2026: formato y práctica"
      lead="Entiende las cuatro tareas actuales, aprende cuándo un audio corto es correcto y aplica la estrategia en los 20 simulacros originales de WeLearn."
      facts={[
        { value: '4', label: 'familias de tarea actuales' },
        { value: 'Adaptativo', label: 'por módulos en el examen oficial' },
        { value: 'Fijo', label: 'recorrido de práctica WeLearn' },
        { value: 'Original', label: 'audio creado por WeLearn' },
      ]}
      tasks={[...tasks]}
      officialSummary={[
        'La sección oficial usa fragmentos breves y audios más desarrollados. Por eso no se debe auditar toda la experiencia mirando solo el primer clip: cada familia de tarea exige una longitud y una carga de comprensión distintas.',
        'ETS identifica Reading y Listening como secciones adaptativas. Una práctica fija como la de WeLearn debe decir de forma visible que no reproduce ese enrutamiento ni la puntuación oficial.',
      ]}
      practiceSteps={[
        'Haz un primer recorrido sin pausar y registra si fallaste por vocabulario, intención, detalle u organización.',
        'Vuelve a la familia de tarea que falló. En audios breves, anticipa la función de la respuesta; en audios largos, toma notas solo de cambios, ejemplos y contrastes.',
        'Haz otro simulacro fijo y compara el tipo de error, no solo el número de aciertos.',
      ]}
      weLearnSummary="Veinte recorridos de las cuatro secciones con audios originales, preguntas objetivas y una estructura fija que permite comparar el mismo tipo de exigencia entre intentos."
      officialUrl="https://www.ets.org/toefl/test-takers/ibt/about/content/listening.html"
      faqs={[...faqs]}
      practiceHref="/practica/toefl/listening/simulacros"
      practiceLabel="Practicar Listening por secciones"
    />
  );
}
