import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Headphones, SplitSquareHorizontal } from 'lucide-react';
import IntegratedWritingWorkbench from '@/components/exam-practice/IntegratedWritingWorkbench';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  PRACTICE_BASE_URL,
  TOEFL_INTEGRATED_WRITING_PROMPTS,
  TOEFL_WRITING_TASKS,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = TOEFL_WRITING_TASKS.find((item) => item.slug === 'integrated-writing')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#1a4fcc';
const META_DESCRIPTION = 'Practica síntesis de lectura y clase en el formato anterior de TOEFL Integrated Writing, con organización, notas y ejercicios originales.';

export const metadata: Metadata = {
  title: 'TOEFL Integrated Writing: síntesis lectura y clase',
  description: META_DESCRIPTION,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'TOEFL Integrated Writing: síntesis lectura y clase',
    description: META_DESCRIPTION,
    url: URL,
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: URL },
};

export default function Page() {
  return (
    <>
      <LearningResourceJsonLd
        name={ROUTE.title}
        url={URL}
        description={ROUTE.description}
        teaches={ROUTE.teaches}
        isPartOf={{ name: 'TOEFL Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` }}
      />
      <FaqJsonLd faqs={ROUTE.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Writing', url: `${PRACTICE_BASE_URL}/practica/toefl/writing` },
          { name: 'Integrated Writing', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1040 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/toefl" style={{ color: 'var(--muted)', textDecoration: 'none' }}>TOEFL</Link>
            <span>/</span>
            <Link href="/practica/toefl/writing" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Writing</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Integrated Writing</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.2rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />TOEFL Writing · Síntesis académica
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.15rem)', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 0.85rem', color: 'var(--ink)' }}>
                TOEFL Integrated Writing
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 740 }}>
                Integrated Writing entrena una habilidad clave: explicar cómo una clase contradice, limita o matiza una lectura. Aquí lo practicamos como formato anterior y como laboratorio de síntesis académica.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'Vigencia', value: 'anterior', sub: 'no tarea principal actual' },
                { label: 'Meta', value: 'síntesis', sub: 'lectura + clase' },
                { label: 'No hagas', value: 'opinión', sub: 'solo fuentes' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '0.75rem', background: 'var(--bg-2)' }}>
                  <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800 }}>{item.label}</span>
                  <strong style={{ color: ACCENT, fontFamily: 'var(--mono)', fontSize: '1.05rem', textAlign: 'right' }}>
                    {item.value}
                    <span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.66rem', fontWeight: 700 }}>{item.sub}</span>
                  </strong>
                </div>
              ))}
            </aside>
          </div>

          <section style={{ marginBottom: '1.2rem', padding: '0.9rem 1rem', borderRadius: 14, border: `1px solid ${ACCENT}30`, background: `${ACCENT}0d` }}>
            <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.6, fontSize: '0.94rem' }}>
              Nota de vigencia: {ROUTE.note} Para preparación principal de TOEFL Writing, trabaja también la ruta de Academic Discussion.
            </p>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <FileText size={18} />,
                title: 'Lee la postura',
                text: 'La lectura normalmente presenta tres razones. Tu respuesta debe identificarlas sin copiar párrafos enteros.',
              },
              {
                icon: <Headphones size={18} />,
                title: 'Escucha la respuesta',
                text: 'La clase suele desafiar punto por punto: evidencia débil, costo oculto, excepción o condición.',
              },
              {
                icon: <SplitSquareHorizontal size={18} />,
                title: 'Escribe relaciones',
                text: 'No resumas dos textos por separado. Explica cómo cada punto de la clase responde al punto de la lectura.',
              },
            ].map((item) => (
              <article key={item.title} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
                <div style={{ display: 'flex', gap: '0.5rem', color: ACCENT, alignItems: 'center', marginBottom: '0.35rem' }}>
                  {item.icon}
                  <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1rem' }}>{item.title}</h2>
                </div>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.58, fontSize: '0.9rem' }}>{item.text}</p>
              </article>
            ))}
          </section>

          <section className="wl-card" style={{ padding: '1.2rem', borderRadius: 16, marginBottom: '1rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Estructura recomendada</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Cómo escribir Integrated Writing</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Introducción breve: la lectura propone una idea, pero la clase la cuestiona o la limita.',
                'Párrafo 1: reading point 1 + respuesta de la clase + razón específica.',
                'Párrafo 2: reading point 2 + respuesta de la clase + detalle clave.',
                'Párrafo 3: reading point 3 + respuesta de la clase + cierre sin opinión personal.',
              ].map((item, index) => (
                <p key={item} style={{ margin: 0, display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0.65rem', alignItems: 'start', color: 'var(--ink-2)', lineHeight: 1.58 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, background: `${ACCENT}12`, color: ACCENT, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </section>

          <IntegratedWritingWorkbench prompts={TOEFL_INTEGRATED_WRITING_PROMPTS} accent={ACCENT} />

          <section style={{ marginTop: '1.4rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>Preguntas frecuentes</p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {ROUTE.faqs.map((faq) => (
                <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
                  <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1rem' }}>{faq.question}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
