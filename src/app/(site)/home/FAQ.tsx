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
