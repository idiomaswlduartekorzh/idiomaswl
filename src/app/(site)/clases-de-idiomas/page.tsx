import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Clases de idiomas online en Colombia | Inglés, Coreano, Francés, Alemán — WeLearn',
  description:
    'Clases de idiomas online 1:1 en Colombia: inglés, coreano, francés, alemán, italiano y portugués con tutores especializados. Preparamos para IELTS, TOEFL, Goethe, DELF, CILS y Celpe-Bras. Diagnóstico gratis.',
  keywords: [
    'clases de idiomas online Colombia',
    'academia de idiomas online Colombia',
    'aprender idiomas con tutor Colombia',
    'inglés coreano francés alemán italiano portugués online Colombia',
    'clases de idiomas 1 a 1 Colombia',
  ],
  openGraph: {
    title: 'Clases de idiomas online en Colombia | WeLearn',
    description: 'Inglés, coreano, francés, alemán, italiano y portugués con tutores especializados. Diagnóstico gratis.',
    url: 'https://www.idiomaswl.com/clases-de-idiomas',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.idiomaswl.com/clases-de-idiomas',
  },
};

const WA = '573005004253';

const LANGUAGES = [
  {
    slug: 'ingles',
    flag: '🇬🇧',
    name: 'Inglés',
    native: 'English',
    color: '#1a4fcc',
    bgColor: 'rgba(26,79,204,0.08)',
    description: 'El idioma más demandado globalmente. Indispensable para IELTS, TOEFL, trabajo remoto y migración a Canadá, Australia y EE.UU.',
    exams: ['IELTS', 'TOEFL iBT', 'ICFES'],
    href: '/clases-de-ingles',
    waMsg: 'Hola, estoy interesado en clases de inglés con WeLearn. ¿Cómo funciona?',
    levels: 'A1 → C2',
  },
  {
    slug: 'coreano',
    flag: '🇰🇷',
    name: 'Coreano',
    native: '한국어',
    color: '#c8202e',
    bgColor: 'rgba(200,32,46,0.08)',
    description: 'El idioma del K-pop, los dramas y las empresas tecnológicas. Método visual de 17 pasos diseñado para hispanohablantes. Preparamos para TOPIK I y II.',
    exams: ['TOPIK I', 'TOPIK II'],
    href: '/clases-de-coreano',
    waMsg: 'Hola, estoy interesado en clases de coreano con WeLearn. ¿Cómo funciona?',
    levels: 'Hangul → TOPIK 4',
  },
  {
    slug: 'frances',
    flag: '🇫🇷',
    name: 'Francés',
    native: 'Français',
    color: '#1a2ecc',
    bgColor: 'rgba(26,46,204,0.08)',
    description: 'Hablan francés 300 millones de personas en 29 países. Clave para inmigrar a Quebec (Canadá), trabajar en empresas francesas y certificaciones DELF/DALF.',
    exams: ['DELF A1–B2', 'DALF C1–C2', 'TCF Canadá'],
    href: '/clases-de-frances',
    waMsg: 'Hola, estoy interesado en clases de francés con WeLearn. ¿Cómo funciona?',
    levels: 'A1 → C2',
  },
  {
    slug: 'aleman',
    flag: '🇩🇪',
    name: 'Alemán',
    native: 'Deutsch',
    color: '#1a2ecc',
    bgColor: 'rgba(26,46,204,0.08)',
    description: 'La economía más grande de Europa busca trabajadores calificados. Alemán B1 para ciudadanía, B2 para enfermería y reconocimiento de títulos profesionales.',
    exams: ['Goethe A1', 'Goethe B1', 'Goethe B2', 'Goethe C1'],
    href: '/clases-de-aleman',
    waMsg: 'Hola, estoy interesado en clases de alemán con WeLearn. ¿Cómo funciona?',
    levels: 'A1 → C1',
  },
  {
    slug: 'italiano',
    flag: '🇮🇹',
    name: 'Italiano',
    native: 'Italiano',
    color: '#009246',
    bgColor: 'rgba(0,146,70,0.08)',
    description: 'El idioma más fácil para hispanohablantes. B1 para ciudadanía italiana por naturalización, B2 para universidades italianas (matrícula €1.000–€4.000/año).',
    exams: ['CILS A2–C2', 'CELI A2–C2'],
    href: '/clases-de-italiano',
    waMsg: 'Hola, estoy interesado en clases de italiano con WeLearn. ¿Cómo funciona?',
    levels: 'A1 → C2',
  },
  {
    slug: 'portugues',
    flag: '🇧🇷',
    name: 'Portugués',
    native: 'Português',
    color: '#166534',
    bgColor: 'rgba(22,101,52,0.08)',
    description: 'Comparte el 80% del vocabulario con el español. Indispensable para hacer negocios con Brasil, el mercado más grande de América del Sur.',
    exams: ['Celpe-Bras Intermediário', 'Celpe-Bras Superior'],
    href: '/clases-de-portugues',
    waMsg: 'Hola, estoy interesado en clases de portugués con WeLearn. ¿Cómo funciona?',
    levels: 'A1 → C2',
  },
];

const RECENT_BLOG = [
  ...BLOG_POSTS
    .filter(p => ['Alemán','Francés','Italiano','Portugués','Coreano','Inglés'].includes(p.category))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
].slice(0, 6);

const CAT_COLORS: Record<string, string> = {
  Alemán: '#1a2ecc', Francés: '#1a2ecc', Italiano: '#009246',
  Portugués: '#166534', Coreano: '#c8202e', Inglés: '#1a4fcc',
  IELTS: '#0f3d8c', TOEFL: '#1a6e3c', Método: '#7c3aed',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.idiomaswl.com/clases-de-idiomas#service',
      name: 'Clases de idiomas online — Idiomas WeLearn',
      description: 'Clases de idiomas online 1:1 en Colombia: inglés, coreano, francés, alemán, italiano y portugués con tutores especializados.',
      provider: {
        '@type': 'Organization',
        name: 'Idiomas WeLearn',
        url: 'https://www.idiomaswl.com',
      },
      serviceType: 'Clases de idiomas online',
      areaServed: 'Colombia',
      inLanguage: 'es-CO',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de idiomas', item: 'https://www.idiomaswl.com/clases-de-idiomas' },
      ],
    },
  ],
};

export default function ClasesDeIdiomasPage() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--ink)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════════════ HERO ══════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, #050a14 0%, #0b1230 50%, #050a14 100%)',
        color: '#fff',
        padding: '5rem 1.25rem 4rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>
            Idiomas WeLearn
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            Clases de idiomas online<br />
            <span style={{ color: '#60a5fa' }}>con tutor especializado.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Seis idiomas. Un método. Tutores reales que conocen tu examen y tu objetivo.
            Clases 1:1 online, desde Colombia, con resultados verificables.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent('Hola, quiero saber qué idioma me recomienda WeLearn según mi objetivo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25d366', color: '#fff', fontWeight: 700, padding: '0.85rem 1.75rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.97rem' }}
            >
              Hablar con un tutor →
            </a>
            <Link href="/precios" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, padding: '0.85rem 1.75rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.97rem', border: '1px solid rgba(255,255,255,0.15)' }}>
              Ver precios
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ PROOF STRIP ══════════════ */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)', padding: '1.25rem 1.25rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem 3rem', justifyContent: 'center', alignItems: 'center' }}>
          {[
            { n: '6', label: 'Idiomas disponibles' },
            { n: '1:1', label: 'Clases personalizadas' },
            { n: '12+', label: 'Certificaciones preparadas' },
            { n: 'Gratis', label: 'Diagnóstico inicial' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--ink)', lineHeight: 1 }}>{s.n}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ LANGUAGE CARDS ══════════════ */}
      <section style={{ padding: '4rem 1.25rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center', marginBottom: '0.5rem' }}>
            Nuestros idiomas
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, textAlign: 'center', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            Elige tu idioma objetivo.
          </h2>
          <p style={{ color: 'var(--muted)', textAlign: 'center', maxWidth: 520, margin: '0 auto 2.5rem', fontSize: '0.97rem' }}>
            Cada idioma tiene su propia ruta de aprendizaje, sus exámenes internacionales y sus oportunidades específicas. Aquí encontrarás todo lo que necesitas.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.25rem' }}>
            {LANGUAGES.map(lang => (
              <div
                key={lang.slug}
                style={{
                  border: '1px solid var(--line-soft)',
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: 'var(--bg)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ padding: '1.5rem 1.5rem 1rem', background: lang.bgColor }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2rem', lineHeight: 1 }}>{lang.flag}</span>
                    <div>
                      <p style={{ fontSize: '1.25rem', fontWeight: 900, lineHeight: 1, color: 'var(--ink)' }}>{lang.name}</p>
                      <p style={{ fontSize: '0.85rem', color: lang.color, fontWeight: 600 }}>{lang.native} · {lang.levels}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>{lang.description}</p>
                </div>

                <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem' }}>Certificaciones</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.1rem' }}>
                    {lang.exams.map(e => (
                      <span key={e} style={{ fontSize: '0.73rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: lang.bgColor, color: lang.color }}>
                        {e}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <Link
                      href={lang.href}
                      style={{ flex: 1, textAlign: 'center', padding: '0.6rem', borderRadius: 7, background: lang.color, color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem' }}
                    >
                      Ver clases →
                    </Link>
                    <a
                      href={`https://wa.me/${WA}?text=${encodeURIComponent(lang.waMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ padding: '0.6rem 0.85rem', borderRadius: 7, background: 'var(--bg-2)', color: 'var(--ink)', fontWeight: 600, textDecoration: 'none', fontSize: '0.85rem', border: '1px solid var(--line-soft)' }}
                    >
                      💬
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ WHY WELEARN ══════════════ */}
      <section style={{ background: 'var(--bg-2)', padding: '4rem 1.25rem', borderTop: '1px solid var(--line-soft)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)', fontWeight: 900, textAlign: 'center', marginBottom: '2.5rem' }}>
            Por qué WeLearn y no una app o academia genérica
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {[
              { icon: '🎯', title: 'Tutores especializados por idioma', desc: 'Cada tutor conoce el examen al que te preparas, el nivel que tienes y el objetivo que persigues. No son instructores genéricos.' },
              { icon: '📋', title: 'Plan personalizado desde el día 1', desc: 'El diagnóstico inicial define exactamente qué necesitas. El plan cambia si tu ritmo o tu objetivo cambia.' },
              { icon: '🗣️', title: 'Clases 1:1, no grupos', desc: 'Cada minuto de clase es para ti. Sin esperar turno, sin ritmo de grupo que no se adapta, sin sílabo rígido.' },
              { icon: '✅', title: 'Diagnóstico gratis', desc: 'Tu primera sesión de diagnóstico no tiene costo. Conoces el tutor, el método y el plan antes de comprometerte.' },
            ].map(f => (
              <div key={f.title} style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '1.4rem' }}>
                <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.75rem' }}>{f.icon}</span>
                <p style={{ fontWeight: 700, marginBottom: '0.4rem', color: 'var(--ink)' }}>{f.title}</p>
                <p style={{ fontSize: '0.87rem', color: 'var(--muted)', lineHeight: 1.55 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section style={{ padding: '4rem 1.25rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, textAlign: 'center', marginBottom: '2rem' }}>
            Resultados reales de estudiantes WeLearn
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.1rem' }}>
            {[
              { name: 'Leonardo Pinto', lang: '🇬🇧 Inglés', result: 'IELTS 7.5 — visa de trabajo en EE.UU.', quote: 'En 4 meses subí de 5.5 a 7.5. El tutor de WeLearn entendía exactamente qué fallaba en mi Writing.' },
              { name: 'Daniel Zuluaga', lang: '🇧🇷 Portugués', result: 'Celpe-Bras Intermediário Superior — USP', quote: 'Empecé desde cero con el español como base. En 8 meses estaba en nivel intermedio superior del Celpe.' },
              { name: 'Karen Ayala', lang: '🇩🇪 Alemán', result: 'Goethe B1 — visa de trabajo en Alemania', quote: 'El plan de WeLearn fue muy estructurado. Aprendí el alemán necesario para iniciar mi proceso migratorio.' },
            ].map(t => (
              <div key={t.name} style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 12, padding: '1.4rem' }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.55, marginBottom: '1rem' }}>{`"${t.quote}"`}</p>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>{t.name}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{t.lang} · {t.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ BLOG ══════════════ */}
      <section style={{ background: 'var(--bg-2)', padding: '4rem 1.25rem', borderTop: '1px solid var(--line-soft)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center', marginBottom: '0.5rem' }}>Del blog WeLearn</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, textAlign: 'center', marginBottom: '2rem' }}>
            Guías gratuitas por idioma
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {RECENT_BLOG.map(p => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                style={{ display: 'block', padding: '1rem 1.1rem', borderRadius: 10, border: '1px solid var(--line-soft)', background: 'var(--bg)', textDecoration: 'none' }}
              >
                <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: CAT_COLORS[p.category] ?? '#1a4fcc', background: 'rgba(26,79,204,0.07)', padding: '2px 8px', borderRadius: 100, marginBottom: '0.55rem' }}>
                  {p.category}
                </span>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4, color: 'var(--ink)', margin: 0 }}>{p.title} →</p>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <Link href="/blog" style={{ display: 'inline-block', padding: '0.7rem 1.5rem', borderRadius: 8, border: '1px solid var(--line-soft)', color: 'var(--muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
              Ver todos los artículos →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section style={{ padding: '4.5rem 1.25rem', textAlign: 'center', background: 'linear-gradient(135deg, #050a14 0%, #0b1230 100%)' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: '#fff', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            Tu primer día de clases es gratis.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Agenda tu clase de diagnóstico gratuita. En 60 minutos sabrás tu nivel real,
            qué necesitas y cuánto tiempo te toma alcanzar tu objetivo.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent('Hola, quiero agendar mi primera clase de diagnóstico gratis en WeLearn.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25d366', color: '#fff', fontWeight: 700, padding: '0.9rem 1.75rem', borderRadius: 8, textDecoration: 'none', fontSize: '1rem' }}
            >
              Agendar diagnóstico gratis →
            </a>
            <Link href="/precios" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, padding: '0.9rem 1.75rem', borderRadius: 8, textDecoration: 'none', fontSize: '1rem', border: '1px solid rgba(255,255,255,0.15)' }}>
              Ver precios
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
