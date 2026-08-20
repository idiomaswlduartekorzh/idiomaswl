import { notFound } from 'next/navigation';
import Link from 'next/link';
import { EXAMS } from '@/data/exams';
import { SAT_GUIDES, getSatGuide, resolveRelatedGuides } from '@/data/satGuides';

const BASE = 'https://www.idiomaswl.com';

/**
 * El espinazo del superhub: `/examenes/sat/guia/<slug>`.
 *
 * `guia` es un segmento estático bajo `[exam]`, igual que `practica`, así que no
 * choca con la página del examen ni con el simulacro. Hoy solo emite parámetros
 * para `sat`; cuando otro examen tenga clúster propio, se añade aquí su fuente de
 * datos y no hay que tocar la ruta.
 *
 * Contenido en `src/data/satGuides.ts`; plan del clúster en
 * `docs/sat-superhub-plan.md`.
 */

export async function generateStaticParams() {
  return SAT_GUIDES.map(g => ({ exam: 'sat', slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ exam: string; slug: string }> }) {
  const { exam, slug } = await params;
  if (exam !== 'sat') return {};
  const guide = getSatGuide(slug);
  if (!guide) return {};
  const url = `${BASE}/examenes/sat/guia/${slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: { title: guide.title, description: guide.description, url, type: 'article' },
  };
}

export default async function SatGuidePage({ params }: { params: Promise<{ exam: string; slug: string }> }) {
  const { exam: slug, slug: guideSlug } = await params;
  if (slug !== 'sat') notFound();
  const exam = EXAMS.sat;
  const guide = getSatGuide(guideSlug);
  if (!exam || !guide) notFound();

  const accent = exam.color;
  const url = `${BASE}/examenes/sat/guia/${guide.slug}`;
  const internos = resolveRelatedGuides(guide);
  const enlaces = [...internos, ...(guide.related ?? [])];

  // Un solo @graph: migas, la ficha del recurso y las MISMAS preguntas que se ven
  // abajo. Nada aquí que no esté en pantalla.
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${BASE}/home` },
          { '@type': 'ListItem', position: 2, name: 'Exámenes', item: `${BASE}/examenes` },
          { '@type': 'ListItem', position: 3, name: 'SAT', item: `${BASE}/examenes/sat` },
          { '@type': 'ListItem', position: 4, name: guide.h1, item: url },
        ],
      },
      {
        '@type': 'LearningResource',
        '@id': `${url}#recurso`,
        name: guide.title,
        description: guide.description,
        url,
        inLanguage: 'es',
        isAccessibleForFree: true,
        learningResourceType: 'Guía de examen',
        educationalUse: 'Preparación de examen',
        dateModified: guide.checkedISO,
        provider: { '@type': 'EducationalOrganization', name: 'Idiomas WeLearn', url: BASE, areaServed: ['CO', 'US'] },
        about: { '@type': 'Thing', name: 'SAT (digital) — sección Reading and Writing', sameAs: guide.sources[0]?.url },
        isPartOf: { '@type': 'WebPage', name: 'SAT', url: `${BASE}/examenes/sat` },
        citation: guide.sources.map(s => ({ '@type': 'CreativeWork', name: s.label, url: s.url })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />

      {/* Migas */}
      <div style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--line-soft)', padding: '0.6rem 0' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <Link href="/examenes" style={{ color: 'var(--muted)' }}>Exámenes</Link>
          <span>›</span>
          <Link href="/examenes/sat" style={{ color: 'var(--muted)' }}>SAT</Link>
          <span>›</span>
          <span style={{ color: 'var(--ink)' }}>{guide.h1}</span>
        </div>
      </div>

      <article style={{ padding: '3rem 1.25rem 3.5rem', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, fontWeight: 700, marginBottom: '0.6rem' }}>
            {guide.eyebrow}
          </p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.6rem)', fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            {guide.h1}
          </h1>

          {/* Respuesta directa — lo primero que lee una persona y lo que citan los motores de IA */}
          <p
            style={{ fontSize: '1.12rem', lineHeight: 1.65, color: 'var(--ink)', borderLeft: `3px solid ${accent}`, paddingLeft: '1.1rem', marginBottom: '2.75rem' }}
            dangerouslySetInnerHTML={{ __html: guide.lead }}
          />

          {guide.sections.map(sec => (
            <section key={sec.h} style={{ marginBottom: '2.5rem' }}>
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
            </section>
          ))}

          {/* Llamada al simulacro: la página explica, el módulo mide */}
          <div style={{ margin: '2.75rem 0', padding: '1.35rem 1.5rem', borderRadius: 14, border: '1px solid var(--line-soft)', borderLeft: `4px solid ${accent}`, background: 'var(--bg-2)' }}>
            <strong style={{ display: 'block', fontSize: '1.02rem', marginBottom: '0.45rem' }}>
              Leer sobre el examen no te dice dónde estás.
            </strong>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--muted)', marginBottom: '0.85rem' }}>
              Nuestro simulacro es un módulo de verdad: 27 preguntas en 32 minutos, con los cuatro
              dominios en la proporción del examen y el desglose de en cuál fallaste. Es gratis y no
              hay que crear cuenta.
            </p>
            <Link href="/examenes/sat/practica/set-1" style={{ color: accent, fontWeight: 800, fontSize: '0.95rem' }}>
              Hacer el simulacro SAT →
            </Link>
          </div>

          {enlaces.length > 0 && (
            <div style={{ marginTop: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', fontWeight: 800, marginBottom: '1.1rem' }}>
                Sigue por aquí
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.7rem' }}>
                {enlaces.map(r => (
                  <Link
                    key={r.href}
                    href={r.href}
                    style={{ display: 'block', padding: '0.9rem 1.05rem', borderRadius: 10, border: '1px solid var(--line-soft)', background: 'var(--bg-2)', textDecoration: 'none', borderLeft: `3px solid ${accent}` }}
                  >
                    <strong style={{ display: 'block', fontSize: '0.93rem', color: 'var(--ink)', marginBottom: 2 }}>{r.label}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.45 }}>{r.note}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <h2 style={{ fontSize: 'clamp(1.35rem, 3.2vw, 1.75rem)', fontWeight: 900, marginTop: '3rem', marginBottom: '1.25rem' }}>
            Preguntas frecuentes
          </h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {guide.faqs.map(f => (
              <details key={f.q} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, padding: '1rem 1.15rem', background: 'var(--bg-2)' }}>
                <summary style={{ fontWeight: 700, fontSize: '0.97rem', cursor: 'pointer', lineHeight: 1.45 }}>{f.q}</summary>
                <p style={{ marginTop: '0.7rem', fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--muted)' }}>{f.a}</p>
              </details>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line-soft)' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              Datos verificados en {guide.checked} contra la fuente oficial:{' '}
              {guide.sources.map((s, i) => (
                <span key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: accent, fontWeight: 600 }}>{s.label}</a>
                  {i < guide.sources.length - 1 ? ' · ' : '.'}
                </span>
              ))}{' '}
              College Board rehace el calendario y las tarifas cada año escolar: esas dos cosas se
              consultan siempre en su sitio, nunca aquí.
            </p>
          </div>

        </div>
      </article>
    </>
  );
}
