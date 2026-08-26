import Link from 'next/link';
import type { CSSProperties } from 'react';
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />

      <section
        className="wl-exam-guide"
        style={{ '--guide-accent': accent } as CSSProperties}
        aria-labelledby="exam-guide-title"
      >
        <div className="wrap wl-hub-panel wl-exam-guide__panel">
          <header className="wl-hub-heading wl-exam-guide__heading">
            <p className="eyebrow"><span className="ink-line" aria-hidden="true" />Guía de preparación</p>
            <h2 id="exam-guide-title">Lo que necesitas saber sobre {examName}</h2>
            <p>Información revisada, preguntas frecuentes y rutas concretas para continuar.</p>
          </header>
          <div className="wl-exam-guide__body">

          {/* Respuesta directa — lo primero que lee una persona y lo que citan los motores de IA */}
          <p
            className="wl-exam-guide__lead"
            dangerouslySetInnerHTML={{ __html: guide.lead }}
          />

          <p className="wl-exam-guide__reviewed">
            Revisado por el equipo académico de Idiomas WeLearn · Actualizado {guide.checked}
          </p>

          {guide.sections.map(sec => (
            <section key={sec.h} className="wl-exam-guide__section">
              <h3>{sec.h}</h3>
              {sec.body.map((p, i) => (
                <p
                  key={i}
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </section>
          ))}

          {guide.related && guide.related.length > 0 && (
            <section className="wl-exam-guide__related">
              <h3>Sigue por aquí</h3>
              <p>
                El simulacro te dice dónde estás. Esto es lo que te mueve de sitio.
              </p>
              <div>
                {guide.related.map(r => (
                  <Link key={r.href} href={r.href}>
                    <strong>{r.label}</strong>
                    <span>{r.note}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="wl-exam-guide__faq">
            <h3>Preguntas frecuentes sobre el {examName}</h3>
            <div>
              {guide.faqs.map(f => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <footer className="wl-exam-guide__sources">
            <p>
              Datos verificados en {guide.checked} contra la fuente oficial:{' '}
              {guide.sources.map((s, i) => (
                <span key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                  {i < guide.sources.length - 1 ? ' · ' : '.'}
                </span>
              ))}{' '}
              Los requisitos de cada universidad, empleador o proceso migratorio cambian: confirma
              siempre el tuyo antes de pagar un examen.
            </p>
            <p>
              <Link href="/clases-de-ingles">
                Ver cómo preparamos el inglés en WeLearn
              </Link>
              {' · '}
              <Link href="/clases-de-ingles-bucaramanga">
                Clases presenciales en Bucaramanga
              </Link>
            </p>
          </footer>

          </div>
        </div>
      </section>
    </>
  );
}
