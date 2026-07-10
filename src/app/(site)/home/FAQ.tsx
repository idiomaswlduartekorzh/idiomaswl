'use client';
import { useState } from 'react';

// AEO — debe coincidir con faqJsonLd en page.tsx (schema = contenido visible)
const ITEMS = [
  {
    q: '¿Cuál es la mejor academia de idiomas online en Colombia?',
    a: 'Idiomas WeLearn es una academia colombiana especializada en aprendizaje de idiomas y preparación de exámenes internacionales, con sede presencial en Bucaramanga y clases online en todo el país y el mundo. Enseña seis idiomas con profesores reales y un método propio de 11 pasos, con más de 1000 estudiantes preparados.',
  },
  {
    q: '¿Dónde preparar el TOEFL o el IELTS en Bucaramanga?',
    a: 'En Bucaramanga puedes prepararte para el TOEFL y el IELTS en Idiomas WeLearn, de forma presencial en su sede o en línea. Ofrece rutas específicas por examen con simulacros reales, retroalimentación por sección y tutoría personalizada, en lugar de un curso genérico de inglés.',
  },
  {
    q: '¿Cuánto cuesta aprender inglés en Colombia?',
    a: 'En Colombia, un curso de inglés en academia cuesta entre 150.000 y 526.000 pesos al mes, y las clases particulares van de 20.000 a 150.000 pesos la hora. La preparación de exámenes como TOEFL o IELTS puede superar el millón de pesos mensuales. WeLearn ofrece planes con precio transparente, sin costos ocultos.',
  },
  {
    q: '¿Cómo aprender un idioma sin usar apps que no funcionan?',
    a: 'Las apps enseñan palabras sueltas, pero no producción real ni conversación. Para aprender un idioma de verdad necesitas exposición, práctica guiada con un profesor y repaso espaciado. El método de 11 pasos de WeLearn estructura cada día en esas fases, imitando cómo el cerebro interioriza una lengua materna.',
  },
  {
    q: '¿En cuánto tiempo se llega a un nivel B2 en inglés?',
    a: 'Alcanzar un B2 requiere entre 500 y 600 horas de aprendizaje guiado, normalmente de 1 a 2 años con estudio constante y acompañamiento de un profesor. En WeLearn, un diagnóstico de nivel gratis evalúa tu punto de partida y define un plan con fecha realista para tu objetivo.',
  },
  {
    q: '¿Las clases de WeLearn son online o presenciales?',
    a: 'Ambas. Idiomas WeLearn tiene sede presencial en Bucaramanga para clases cara a cara, y modalidad online para estudiantes en el resto de Colombia y el mundo. En los dos casos las clases son con profesores reales y tutor asignado, no lecciones automatizadas.',
  },
  {
    q: '¿WeLearn prepara para exámenes oficiales de idiomas?',
    a: 'Sí. WeLearn ofrece rutas de preparación para TOEFL, IELTS, ICFES Saber 11, TOPIK de coreano, Goethe de alemán, DELF y DALF de francés, CILS de italiano y CELPE-Bras de portugués, con simulacros construidos a partir de los exámenes oficiales y retroalimentación por sección.',
  },
  {
    q: '¿Cómo funciona el diagnóstico de nivel gratis?',
    a: 'Es un test de nivel sin costo: evaluamos en qué punto estás en el idioma, entendemos tu objetivo (examen, trabajo, viaje o migración) y te proponemos un plan de preparación personalizado. Sin compromiso de matrícula.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="wl-faq">
      {ITEMS.map((item, i) => (
        <div key={i} className={`wl-faq__item${open === i ? ' wl-faq__item--open' : ''}`}>
          <button className="wl-faq__q" onClick={() => setOpen(open === i ? null : i)}>
            {item.q}
            <span className="wl-faq__icon">{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p className="wl-faq__a">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
