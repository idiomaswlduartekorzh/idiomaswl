'use client';
import { useState } from 'react';

const ITEMS = [
  {
    q: '¿En qué se diferencia WeLearn de otras apps?',
    a: 'Cada día integra 11 pasos con objetivos distintos: exposición, adquisición, retención, producción y revisión acumulativa. No es repetición de tarjetas ni gramática aislada.',
  },
  {
    q: '¿Puedo probar antes de pagar?',
    a: 'Sí. El primer paso de cada idioma está abierto sin tarjeta en esta fase de referencia.',
  },
  {
    q: '¿Cuánto tiempo toma una sesión?',
    a: 'Entre 45 y 90 minutos según tu ritmo y el idioma seleccionado.',
  },
  {
    q: '¿Incluye preparación para exámenes?',
    a: 'Sí. Hay rutas específicas para TOEFL, IELTS, ICFES, Goethe, DELF/DALF y CILS con simulacros por objetivo.',
  },
  {
    q: '¿Las clases son online o presenciales?',
    a: '100% online. Tenemos sede en Bucaramanga pero atendemos estudiantes en toda Colombia y en el exterior. Las clases 1:1 son por videollamada con tutor asignado.',
  },
  {
    q: '¿En cuánto tiempo puedo alcanzar un nivel B2 en inglés?',
    a: 'Depende del punto de partida. Desde A2 con 5–7 horas semanales, entre 12 y 18 meses. Desde B1, entre 9 y 12 meses. La clase de diagnóstico gratuita define el plan exacto para tu objetivo.',
  },
  {
    q: '¿Cómo funciona la clase de diagnóstico gratuita?',
    a: 'Es una sesión de 30 a 45 minutos con un tutor de WeLearn donde evaluamos tu nivel real, entendemos tu objetivo (examen, trabajo, migración) y te damos un plan de preparación personalizado. Sin compromiso de matrícula.',
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
