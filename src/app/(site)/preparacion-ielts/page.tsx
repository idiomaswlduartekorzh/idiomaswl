import type { Metadata } from 'next';
import ExamPrepLanding, { type ExamPrepContent } from '@/components/marketing/ExamPrepLanding';

export const metadata: Metadata = {
  title: 'Preparación IELTS online con tutor | WeLearn',
  description: 'Prepara IELTS Academic o General Training con clases online, tutor asignado y práctica por habilidad. Consulta clases presenciales en Bucaramanga.',
  alternates: { canonical: 'https://www.idiomaswl.com/preparacion-ielts' },
  openGraph: {
    title: 'Preparación IELTS online con tutor | WeLearn',
    description: 'Clases para IELTS Academic y General Training con diagnóstico, tutor y simulacros. Consulta modalidad y precio antes de agendar.',
    url: 'https://www.idiomaswl.com/preparacion-ielts',
  },
};

const content: ExamPrepContent = {
  exam: 'IELTS',
  slug: 'preparacion-ielts',
  eyebrow: 'IELTS Academic y General Training · Clases online',
  heading: 'Preparación IELTS online con tutor',
  intro: 'Trabaja las cuatro habilidades del IELTS con un tutor asignado y un plan basado en tu nivel, la versión del examen que necesitas y la banda que te piden. Practica con simulacros y revisa tus errores antes de presentar la prueba.',
  who: 'Academic y General Training comparten Listening y Speaking, pero Reading y Writing cambian. Elegir la versión correcta es el primer paso de tu plan.',
  routes: [
    { title: 'IELTS Academic', detail: 'Para quienes necesitan acreditar inglés en estudios superiores u otros procesos que exigen la versión académica. El plan incorpora textos académicos y las dos tareas de Writing.' },
    { title: 'IELTS General Training', detail: 'Para procesos que piden la versión General Training. Practicas sus textos y tareas de escritura específicas sin estudiar con materiales de la versión equivocada.' },
  ],
  skills: [
    { title: 'Listening y Reading', detail: 'Identifica en qué tipos de pregunta pierdes puntos, practica con tiempo y revisa por qué una respuesta es correcta y otra no.' },
    { title: 'Writing Task 1 y Task 2', detail: 'Organiza tus respuestas según la versión del examen, trabaja la claridad de los argumentos y recibe orientación sobre errores recurrentes.' },
    { title: 'Speaking', detail: 'Practica las tres partes de la entrevista, desarrolla respuestas completas y trabaja fluidez, pronunciación y precisión.' },
    { title: 'Simulacros y revisión', detail: 'Usa las prácticas disponibles para medir avance por habilidad y enfocar las siguientes sesiones en lo que más necesitas mejorar.' },
  ],
  method: [
    'Definimos si necesitas Academic o General Training, tu banda objetivo y la fecha prevista.',
    'El diagnóstico con tutor identifica tu punto de partida y las habilidades prioritarias.',
    'Combinamos clases en vivo con práctica de secciones y tareas del examen.',
    'Revisamos errores y ajustamos la ruta; ningún resultado de banda se garantiza por adelantado.',
  ],
  faqs: [
    { question: '¿Preparan IELTS Academic y General Training?', answer: 'Sí. La ruta se ajusta a la versión que exige tu universidad, empleador o trámite. Comprueba cuál te piden antes de inscribirte al examen.' },
    { question: '¿Las clases de IELTS son online o presenciales?', answer: 'Puedes estudiar online por videollamada. Si estás en Bucaramanga, consulta la disponibilidad de clases presenciales en nuestra sede de Sotomayor.' },
    { question: '¿Cuánto cuesta la preparación?', answer: 'Depende de la intensidad y del paquete de clases. La orientación inicial por chat es gratuita; el diagnóstico y las clases con tutor son pagos. Te informamos el precio antes de agendar.' },
    { question: '¿Puedo empezar con un simulacro?', answer: 'Sí. El centro de IELTS de WeLearn reúne prácticas y simulacros. El simulacro te ayuda a identificar áreas de trabajo, pero no sustituye el diagnóstico con tutor.' },
  ],
  practiceHref: '/examenes/ielts',
  practiceLabel: 'Ver simulacros IELTS',
  otherHref: '/preparacion-toefl',
  otherLabel: '¿Necesitas TOEFL? Ver esa ruta',
  whatsappMessage: 'Hola, vi la página de preparación IELTS. Necesito la versión Academic o General Training y quisiera conocer modalidad, tutor, diagnóstico y precio antes de reservar.',
};

export default function PreparacionIeltsPage() {
  return <ExamPrepLanding content={content} />;
}
