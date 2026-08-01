import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Academia de Idiomas en Bucaramanga y Online — 8 Idiomas y 9 Certificaciones | WeLearn',
  description:
    'Academia de idiomas en Bucaramanga con clases presenciales y online para toda Colombia. Ocho idiomas —inglés, italiano, portugués, francés, ruso, alemán, japonés y coreano— y nueve certificaciones oficiales: IELTS, TOEFL, Cambridge, ICFES, Goethe, DELF, CILS, Celpe-Bras y TOPIK. Diagnóstico gratis.',
  keywords: [
    'academia de idiomas Bucaramanga',
    'clases de idiomas Bucaramanga',
    'instituto de idiomas Bucaramanga',
    'academia de idiomas Sotomayor',
    'clases de idiomas online Colombia',
    'certificaciones de idiomas Colombia',
    'preparación IELTS TOEFL Bucaramanga',
    'aprender idiomas con tutor Colombia',
  ],
  openGraph: {
    title: 'Academia de Idiomas en Bucaramanga y Online | WeLearn',
    description: 'Inglés, italiano, portugués, francés, ruso, alemán, japonés y coreano. Presencial en Bucaramanga y online en toda Colombia. Diagnóstico gratis.',
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
  {
    slug: 'ruso',
    flag: '🇷🇺',
    name: 'Ruso',
    native: 'Русский',
    color: '#0039A6',
    bgColor: 'rgba(0,57,166,0.08)',
    description: 'El alfabeto se lee en horas, no en meses. Puerta de entrada a las becas del gobierno ruso y a un idioma que casi nadie enseña en Santander.',
    exams: ['ТРКИ-1 (B1)', 'ТРКИ-2 (B2)'],
    href: '/clases-de-ruso',
    waMsg: 'Hola, estoy interesado en clases de ruso con WeLearn. ¿Cómo funciona?',
    levels: 'A1 → C2',
  },
  {
    slug: 'japones',
    flag: '🇯🇵',
    name: 'Japonés',
    native: '日本語',
    color: '#BC002D',
    bgColor: 'rgba(188,0,45,0.08)',
    description: 'Comparte las cinco vocales del español, así que la pronunciación se te va a dar. Ruta JLPT y acceso a las becas del gobierno japonés.',
    exams: ['JLPT N5 → N1'],
    href: '/clases-de-japones',
    waMsg: 'Hola, estoy interesado en clases de japonés con WeLearn. ¿Cómo funciona?',
    levels: 'N5 → N1',
  },
];

/**
 * Los nueve certificados oficiales para los que la academia prepara, con su simulacro.
 * Las rutas corresponden a los slugs reales de `src/data/exams.ts`.
 */
const CERTIFICADOS = [
  { idioma: 'Inglés',    flag: '🇬🇧', color: '#1a4fcc', items: [
    { name: 'IELTS',              desc: 'Academic y General. Migración, universidad y trabajo.', href: '/examenes/ielts' },
    { name: 'TOEFL iBT',          desc: 'El más pedido por universidades de Estados Unidos.',    href: '/examenes/toefl' },
    { name: 'Cambridge B2 First', desc: 'Certificado que no caduca, reconocido en toda Europa.', href: '/examenes/cambridge-b2' },
    { name: 'ICFES Saber 11',     desc: 'La sección de inglés de la prueba de Estado.',          href: '/examenes/icfes' },
  ]},
  { idioma: 'Francés',   flag: '🇫🇷', color: '#1a2ecc', items: [
    { name: 'DELF / DALF', desc: 'Diplomas del Ministerio de Educación de Francia. No caducan.', href: '/examenes/delf-dalf' },
  ]},
  { idioma: 'Italiano',  flag: '🇮🇹', color: '#009246', items: [
    { name: 'CILS / CELI', desc: 'Los certificados válidos para la ciudadanía italiana.', href: '/examenes/cils-celi' },
  ]},
  { idioma: 'Portugués', flag: '🇧🇷', color: '#166534', items: [
    { name: 'Celpe-Bras', desc: 'La única certificación oficial de Brasil — y se presenta en Bucaramanga.', href: '/examenes/celpe-bras' },
  ]},
  { idioma: 'Alemán',    flag: '🇩🇪', color: '#1a2ecc', items: [
    { name: 'Goethe-Zertifikat', desc: 'El estándar para visas, estudios y trabajo en Alemania.', href: '/examenes/goethe' },
  ]},
  { idioma: 'Coreano',   flag: '🇰🇷', color: '#c8202e', items: [
    { name: 'TOPIK', desc: 'Requisito para universidades y visas de Corea del Sur.', href: '/examenes/topik' },
  ]},
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
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>
              Idiomas WeLearn · Bucaramanga
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Ocho idiomas.<br />
              <span style={{ color: '#60a5fa' }}>Dos políglotas que los enseñan.</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,255,255,0.75)', maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
              No somos una plataforma con lecciones grabadas. Somos dos personas que aprendieron
              idiomas de verdad y montaron una academia en Bucaramanga para enseñarlos, presencial
              y online.
            </p>
          </div>

          {/* Los dos fundadores, en el hero */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: '1.15rem', alignItems: 'start', padding: '1.35rem', borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ position: 'relative', width: 96, height: 116, borderRadius: 12, overflow: 'hidden' }}>
                <Image src="/images/david-duarte.jpg" alt="José David Duarte Silva, políglota y co-fundador de Idiomas WeLearn" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="96px" />
              </div>
              <div>
                <p style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 2 }}>José David Duarte Silva</p>
                <p style={{ fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: '0.6rem' }}>Co-fundador · Políglota</p>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>
                  Habla ocho idiomas: inglés C2, italiano y portugués C1, francés y alemán B2,
                  ruso y coreano B1, además del español. Los aprendió en ese mismo orden, ya
                  adulto, y de ese recorrido salió el método que usamos.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: '1.15rem', alignItems: 'start', padding: '1.35rem', borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ position: 'relative', width: 96, height: 116, borderRadius: 12, overflow: 'hidden' }}>
                <Image src="/images/team-zhanna-korzh.png" alt="Zhanna Korzh, co-fundadora y directora académica de Idiomas WeLearn" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="96px" />
              </div>
              <div>
                <p style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 2 }}>Zhanna Korzh</p>
                <p style={{ fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: '0.6rem' }}>Co-fundadora · Directora académica</p>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>
                  Lingüista y profesora universitaria titulada en Rusia en enseñanza de idiomas
                  extranjeros, formada además en Francia e Inglaterra. Enseña desde 2011. Dirige
                  el diseño curricular y la preparación de exámenes.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent('Hola, quiero saber qué idioma me recomienda WeLearn según mi objetivo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25d366', color: '#fff', fontWeight: 700, padding: '0.85rem 1.75rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.97rem' }}
            >
              Diagnóstico gratis por WhatsApp →
            </a>
            <Link href="/quienes-somos" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, padding: '0.85rem 1.75rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.97rem', border: '1px solid rgba(255,255,255,0.15)' }}>
              Conócenos
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ PROOF STRIP ══════════════ */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)', padding: '1.25rem 1.25rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem 3rem', justifyContent: 'center', alignItems: 'center' }}>
          {[
            { n: '8', label: 'Idiomas disponibles' },
            { n: '9', label: 'Certificaciones oficiales' },
            { n: 'Sotomayor', label: 'Sede en Bucaramanga' },
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
      {/* ══════════════ CERTIFICADOS ══════════════ */}
      <section style={{ background: 'var(--bg-2)', padding: '4rem 1.25rem', borderTop: '1px solid var(--line-soft)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center', marginBottom: '0.5rem' }}>
            Certificaciones oficiales
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, textAlign: 'center', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            Los exámenes para los que te preparamos.
          </h2>
          <p style={{ color: 'var(--muted)', textAlign: 'center', maxWidth: 620, margin: '0 auto 2.5rem', fontSize: '0.97rem' }}>
            Nueve certificaciones oficiales, cada una con su simulacro gratuito para que veas el
            formato real antes de inscribirte a nada.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {CERTIFICADOS.map(grupo => (
              <div key={grupo.idioma} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '1.4rem', background: 'var(--bg)' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: grupo.color, marginBottom: '1rem' }}>
                  <span style={{ marginRight: 6 }}>{grupo.flag}</span>{grupo.idioma}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {grupo.items.map(ex => (
                    <Link
                      key={ex.href}
                      href={ex.href}
                      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                    >
                      <p style={{ fontSize: '0.97rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 2 }}>
                        {ex.name} <span style={{ color: grupo.color }}>→</span>
                      </p>
                      <p style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.5 }}>{ex.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.88rem', color: 'var(--muted)' }}>
            Ojo con un detalle que casi nadie menciona: el <strong>Celpe-Bras se presenta en
            Bucaramanga</strong>, mientras que el CILS, el Goethe y el TOPIK obligan a viajar a
            Bogotá. Lo tenemos explicado en la página de cada idioma.
          </p>
        </div>
      </section>

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
            Tu diagnóstico es gratis.
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
            <Link href="/practica" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 600, padding: '0.9rem 1.75rem', borderRadius: 8, textDecoration: 'none', fontSize: '1rem', border: '1px solid rgba(255,255,255,0.15)' }}>
              Practicar gratis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
