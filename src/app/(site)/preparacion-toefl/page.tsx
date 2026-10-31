import type { Metadata } from 'next';
import ExamPrepLanding, { type ExamPrepContent } from '@/components/marketing/ExamPrepLanding';

export const metadata: Metadata = {
  title: 'Preparación TOEFL iBT online con tutor | WeLearn',
  description: 'Prepara TOEFL iBT con clases online, tutor asignado y práctica de Reading, Listening, Writing y Speaking. Consulta la ruta y el precio.',
  alternates: { canonical: 'https://www.idiomaswl.com/preparacion-toefl' },
  openGraph: {
    title: 'Preparación TOEFL iBT online con tutor | WeLearn',
    description: 'Clases de preparación TOEFL iBT con diagnóstico, práctica por tarea y simulacros. Consulta modalidad y precio antes de agendar.',
    url: 'https://www.idiomaswl.com/preparacion-toefl',
  },
};

const content: ExamPrepContent = {
  exam: 'TOEFL iBT',
  slug: 'preparacion-toefl',
  eyebrow: 'TOEFL iBT · Clases online',
  heading: 'Preparación TOEFL iBT online con tutor',
  intro: 'Prepara las tareas actuales del TOEFL iBT con tutor asignado. Partimos del nivel que tienes y del requisito de la institución a la que aplicas; después combinamos clases, práctica por sección y revisión de tus respuestas.',
  who: 'El TOEFL iBT usa tareas académicas y de campus. El formato de 2026 cambió, por eso tu preparación debe usar ejercicios vigentes y un objetivo de puntuación confirmado con tu institución.',
  routes: [
    { title: 'Admisión universitaria', detail: 'Trabajamos lectura y escucha de contenido académico, producción escrita y respuestas orales con el nivel que exige tu programa.' },
    { title: 'Puntaje y fecha de examen', detail: 'Partimos del requisito de tu institución y del tiempo disponible. Si aún no sabes qué puntuación necesitas, te ayudamos a verificarla antes de diseñar la ruta.' },
  ],
  skills: [
    { title: 'Reading', detail: 'Practica las tareas actuales, incluidas Complete the Words, Read in Daily Life y Read an Academic Passage, con análisis de comprensión y vocabulario.' },
    { title: 'Listening', detail: 'Entrena respuestas a mensajes, conversaciones, anuncios y charlas académicas, y revisa los detalles que se pierden al escuchar bajo tiempo.' },
    { title: 'Writing', detail: 'Trabaja Build a Sentence, Write an Email y Academic Discussion con estructura, claridad y revisión de errores frecuentes.' },
    { title: 'Speaking', detail: 'Practica Listen and Repeat y Take an Interview; mejora inteligibilidad, organización y respuesta dentro del tiempo disponible.' },
  ],
  method: [
    'Confirmamos el requisito de tu institución, tu fecha prevista y el formato TOEFL iBT que presentarás.',
    'El diagnóstico con tutor señala tu nivel y las tareas en las que necesitas concentrarte.',
    'Combinamos sesiones en vivo con práctica de las cuatro secciones del examen vigente.',
    'Revisamos tus respuestas y ajustamos el plan sin prometer una puntuación fija.',
  ],
  faqs: [
    { question: '¿La preparación usa el formato TOEFL iBT vigente?', answer: 'Sí. La ruta se basa en las tareas actuales del iBT y en las prácticas correspondientes de WeLearn. Confirma la fecha y las exigencias de tu institución antes de inscribirte.' },
    { question: '¿Puedo preparar TOEFL desde Bucaramanga?', answer: 'Sí. Puedes estudiar online desde cualquier ciudad y consultar clases presenciales con tutor en nuestra sede de Sotomayor, Bucaramanga, según disponibilidad.' },
    { question: '¿Cuánto cuesta la preparación TOEFL?', answer: 'El valor depende de la intensidad y el paquete de clases. La orientación inicial por chat es gratuita; el diagnóstico y las sesiones con tutor son pagos. Conoces el precio antes de agendar.' },
    { question: '¿El simulacro reemplaza las clases?', answer: 'El simulacro permite practicar y detectar errores. Las clases con tutor sirven para trabajar esos errores con un plan ajustado a tu objetivo.' },
  ],
  practiceHref: '/examenes/toefl',
  practiceLabel: 'Ver simulacros TOEFL',
  otherHref: '/preparacion-ielts',
  otherLabel: '¿Necesitas IELTS? Ver esa ruta',
  whatsappMessage: 'Hola, vi la página de preparación TOEFL iBT. Quisiera conocer modalidad, tutor, diagnóstico y precio antes de reservar.',
};

export default function PreparacionToeflPage() {
  return <ExamPrepLanding content={content} />;
}
