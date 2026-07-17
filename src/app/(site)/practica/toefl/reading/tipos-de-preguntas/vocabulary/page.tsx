import type { Metadata } from 'next';
import Link from 'next/link';
import { Brain, CheckCircle2, SearchCheck } from 'lucide-react';
import MultipleChoicePracticeEngine from '@/components/exam-practice/MultipleChoicePracticeEngine';
import { BreadcrumbJsonLd, FaqJsonLd, LearningResourceJsonLd } from '@/components/exam-practice/StructuredData';
import {
  PRACTICE_BASE_URL,
  TOEFL_READING_TYPES,
  TOEFL_VOCABULARY_PASSAGE,
} from '@/data/practica-exams/seo-catalog';

const ROUTE = TOEFL_READING_TYPES.find((item) => item.slug === 'vocabulary')!;
const URL = `${PRACTICE_BASE_URL}${ROUTE.path}`;
const ACCENT = '#1a4fcc';

export const metadata: Metadata = {
  title: 'TOEFL Vocabulary in Context: ejercicios y estrategia',
  description: ROUTE.description,
  keywords: ROUTE.keywords,
  openGraph: {
    title: 'TOEFL Vocabulary in Context: ejercicios y estrategia',
    description: ROUTE.description,
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
        isPartOf={{ name: 'Tipos de preguntas TOEFL Reading', url: `${PRACTICE_BASE_URL}/practica/toefl/reading/tipos-de-preguntas` }}
      />
      <FaqJsonLd faqs={ROUTE.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Práctica', url: `${PRACTICE_BASE_URL}/practica` },
          { name: 'TOEFL', url: `${PRACTICE_BASE_URL}/practica/toefl` },
          { name: 'Reading', url: `${PRACTICE_BASE_URL}/practica/toefl/reading` },
          { name: 'Tipos de preguntas', url: `${PRACTICE_BASE_URL}/practica/toefl/reading/tipos-de-preguntas` },
          { name: 'Vocabulary in Context', url: URL },
        ]}
      />

      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1040 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/toefl" style={{ color: 'var(--muted)', textDecoration: 'none' }}>TOEFL</Link>
            <span>/</span>
            <Link href="/practica/toefl/reading/tipos-de-preguntas" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Tipos de preguntas</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 800 }}>Vocabulary</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1rem', alignItems: 'stretch', marginBottom: '1.5rem' }}>
            <div>
              <p className="eyebrow" style={{ margin: '0 0 0.5rem' }}>
                <span className="ink-line" />TOEFL Reading · Tipo de pregunta
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.1rem)', lineHeight: 1.04, letterSpacing: '-0.04em', margin: '0 0 0.85rem', color: 'var(--ink)' }}>
                TOEFL Vocabulary in Context
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: 0, maxWidth: 740 }}>
                En TOEFL, una pregunta de vocabulario no pregunta “¿cuál traducción memorizaste?”, sino “¿qué significa esta palabra aquí?”. La respuesta correcta conserva la lógica de la oración y del párrafo.
              </p>
            </div>

            <aside className="wl-card" style={{ padding: '1rem', borderRadius: 16, display: 'grid', gap: '0.75rem', alignContent: 'center' }}>
              {[
                { label: 'Pista', value: 'contexto', sub: 'frase completa' },
                { label: 'Prueba', value: 'sustituir', sub: 'sin cambiar sentido' },
                { label: 'Trampa', value: 'tema', sub: 'opción relacionada' },
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

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.85rem', marginBottom: '1.2rem' }}>
            {[
              {
                icon: <SearchCheck size={18} />,
                title: 'Lee la oración completa',
                text: 'La pista suele estar antes o después de la palabra: definición, contraste, ejemplo o consecuencia.',
              },
              {
                icon: <Brain size={18} />,
                title: 'Sustituye la opción',
                text: 'Pon cada opción en la frase. Si cambia la lógica del párrafo, es distractor.',
              },
              {
                icon: <CheckCircle2 size={18} />,
                title: 'No elijas por tema',
                text: 'Una opción puede sonar académica o relacionada con el pasaje y aun así no significar lo mismo.',
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
            <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Método WeLearn</p>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Cómo resolver Vocabulary in Context</h2>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {[
                'Ubica la palabra en la oración y decide si funciona como verbo, sustantivo, adjetivo o frase.',
                'Lee una oración antes y una después para detectar la relación lógica.',
                'Sustituye cada opción en silencio y elimina la que cambie el sentido.',
                'Elige la opción que conserva el significado local, aunque no sea la traducción más común de la palabra.',
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

          <MultipleChoicePracticeEngine passage={TOEFL_VOCABULARY_PASSAGE} accent={ACCENT} />

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
