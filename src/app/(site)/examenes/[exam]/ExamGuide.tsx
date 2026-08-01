import Link from 'next/link';
import type { ExamGuide } from '@/data/examGuides';

/**
 * Bloque de contenido de una página de examen: respuesta directa, secciones y FAQ.
 *
 * El `FAQPage` del schema se construye a partir de `guide.faqs`, el MISMO arreglo
 * que se pinta en pantalla. No añadir preguntas al marcado que no estén visibles.
 */
export default function ExamGuideBlock({
  guide, examName, accent,
}: { guide: ExamGuide; examName: string; accent: string }) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section style={{ padding: '3.5rem 1.25rem', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Respuesta directa — lo primero que lee una persona y lo que citan los motores de IA */}
          <p
            style={{
              fontSize: '1.12rem', lineHeight: 1.65, color: 'var(--ink)',
              borderLeft: `3px solid ${accent}`, paddingLeft: '1.1rem', marginBottom: '2.75rem',
            }}
            dangerouslySetInnerHTML={{ __html: guide.lead }}
          />

          {guide.sections.map(sec => (
            <div key={sec.h} style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '0.9rem' }}>
                {sec.h}
              </h2>
              {sec.body.map((p, i) => (
                <p
                  key={i}
                  style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--muted)', marginBottom: '0.85rem' }}
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </div>
          ))}

          <h2 style={{ fontSize: 'clamp(1.35rem, 3.2vw, 1.75rem)', fontWeight: 900, marginTop: '3rem', marginBottom: '1.25rem' }}>
            Preguntas frecuentes sobre el {examName}
          </h2>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {guide.faqs.map(f => (
              <details
                key={f.q}
                style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '1rem 1.15rem', background: 'var(--bg-2)' }}
              >
                <summary style={{ fontWeight: 700, fontSize: '0.97rem', cursor: 'pointer', lineHeight: 1.45 }}>
                  {f.q}
                </summary>
                <p style={{ marginTop: '0.7rem', fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--muted)' }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line-soft)' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              Datos verificados en {guide.checked} contra la fuente oficial:{' '}
              {guide.sources.map((s, i) => (
                <span key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: accent, fontWeight: 600 }}>
                    {s.label}
                  </a>
                  {i < guide.sources.length - 1 ? ' · ' : '.'}
                </span>
              ))}{' '}
              Los requisitos de cada universidad, empleador o proceso migratorio cambian: confirma
              siempre el tuyo antes de pagar un examen.
            </p>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
              <Link href="/clases-de-ingles" style={{ color: accent, fontWeight: 700 }}>
                Ver cómo preparamos el inglés en WeLearn
              </Link>
              {' · '}
              <Link href="/clases-de-ingles-bucaramanga" style={{ color: accent, fontWeight: 700 }}>
                Clases presenciales en Bucaramanga
              </Link>
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
