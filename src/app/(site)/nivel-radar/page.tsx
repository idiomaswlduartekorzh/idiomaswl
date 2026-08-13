import type { Metadata } from 'next';
import s from './page.module.css';
import NivelRadarClient from './NivelRadarClient';

const WA = '573005004253';
const WA_MSG = encodeURIComponent('Hola, quiero saber cuál es mi nivel real de inglés y cómo avanzar con WeLearn.');

export const metadata: Metadata = {
  title: 'Nivel Radar — ¿Cuál es tu nivel real de inglés?',
  description:
    'Diagnóstico adaptativo de inglés entre A1 y C2. Lectura, escucha, vocabulario y uso de la lengua con resultado orientativo inmediato.',
  keywords: [
    'nivel de inglés test', 'cuál es mi nivel de inglés', 'test de inglés gratis',
    'diagnóstico de inglés online', 'nivel real de inglés WeLearn',
  ],
  openGraph: {
    title: 'Nivel Radar — ¿Cuál es tu nivel real de inglés?',
    description: 'Un diagnóstico adaptativo de inglés A1–C2 con lectura, escucha, vocabulario y gramática.',
    url: 'https://www.idiomaswl.com/nivel-radar',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/nivel-radar' },
};

const HOW = [
  { title: 'Respondes ítems reales', desc: 'El diagnóstico alterna lectura, escucha, vocabulario y uso de la lengua. No usa respuestas de autopercepción.' },
  { title: 'La dificultad se adapta', desc: 'Cada acierto eleva la exigencia y cada error la ajusta. Así localizamos tu límite funcional entre B1 y C2.' },
  { title: 'Ves un mapa por habilidad', desc: 'Recibes un nivel orientativo y una prioridad de trabajo. Para escritura y habla, recomendamos una evaluación con tutor.' },
];

export default function NivelRadarPage() {
  return (
    <main className={s.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
            { '@type': 'ListItem', position: 2, name: 'Nivel Radar', item: 'https://www.idiomaswl.com/nivel-radar' },
          ],
        }) }}
      />

      <NivelRadarClient />

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className={s.howSection}>
        <div className={s.wrap} style={{ maxWidth: 900 }}>
          <p className={s.sectionEyebrow}>¿Cómo funciona?</p>
          <h2 className={s.h2}>No es un test de autopercepción</h2>
          <div className={s.howGrid}>
            {HOW.map((h, i) => (
              <div key={h.title} className={s.howCard}>
                <div className={s.howNum}>{i + 1}</div>
                <h3 className={s.howTitle}>{h.title}</h3>
                <p className={s.howDesc}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className={s.finalCta}>
        <div className={s.wrap}>
          <p className={s.sectionEyebrow}>¿Y ahora qué?</p>
          <h2 className={s.h2}>Conocer tu nivel es el primer paso.<br />Cerrar la brecha es el segundo.</h2>
          <p className={s.finalCtaSub}>
            Cuéntanos tu resultado y te decimos exactamente qué necesitas para
            avanzar — sin planes genéricos, con un tutor real.
          </p>
          <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className={s.mainBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Hablar con WeLearn por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
