import type { Metadata } from 'next';
import Link from 'next/link';
import s from './page.module.css';

const WA = '573005004253';
const WA_GENERAL = encodeURIComponent('Hola, vi la página de clases de alemán en WeLearn y quiero agendar mi clase de diagnóstico gratis.');
const WA_GOETHE  = encodeURIComponent('Hola, quiero prepararme para el examen Goethe con WeLearn. ¿Cuándo puedo empezar?');

export const metadata: Metadata = {
  title: 'Clases de Alemán Online en Colombia — Preparación Goethe-Zertifikat | WeLearn',
  description:
    'Aprende alemán online con tutor especializado. Preparación Goethe A1 hasta C1. Desde cero hasta nivel avanzado. Clase diagnóstico gratis. Para colombianos con visas de trabajo, estudios o visa de oportunidad.',
  keywords: [
    'clases de alemán online Colombia',
    'aprender alemán Bucaramanga',
    'preparación Goethe-Zertifikat Colombia',
    'curso de alemán para adultos',
    'Goethe Colombia',
    'alemán online Colombia',
    'visa trabajo Alemania inglés',
    'aprender alemán desde cero',
    'WeLearn alemán',
    'Goethe B1 Colombia',
  ],
  openGraph: {
    title: 'Clases de Alemán Online — Preparación Goethe-Zertifikat | WeLearn',
    description:
      'Tutor especializado, método estructurado, preparación Goethe. Desde A1 hasta C1. Clase diagnóstico gratis para colombianos.',
    url: 'https://idiomaswl.com/clases-de-aleman',
  },
  alternates: { canonical: 'https://idiomaswl.com/clases-de-aleman' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Necesito saber alemán para empezar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Empezamos desde A1 absoluto. La primera sesión cubre el alfabeto alemán, pronunciación básica y las primeras frases de presentación.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tan difícil es el alemán para colombianos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Es más accesible de lo que parece. La pronunciación es consistente (se escribe como se lee) y hay vocabulario similar al inglés. Los 4 casos gramaticales son el mayor reto, pero con el método correcto se interiorizan gradualmente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Para qué sirve el Goethe-Zertifikat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El Goethe-Zertifikat es la certificación oficial del Instituto Goethe. Es requerida para visas de trabajo en Alemania (B1), estudios universitarios (B2–C1), residencia permanente y el pasaporte alemán (B1). También es valorada por empleadores alemanes y austriacos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo toma llegar al Goethe B1?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Partiendo de cero, entre 14 y 20 meses con práctica constante de 3–4 horas semanales. Si ya tienes base (A2), puedes alcanzar B1 en 8–12 meses.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Las clases son presenciales o virtuales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Son 100% virtuales, por videollamada. Puedes estar en Bogotá, Medellín, Cali, Bucaramanga o cualquier ciudad de Colombia o el mundo.',
      },
    },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Alemán con el método WeLearn',
      description:
        'Aprende alemán desde cero hasta Goethe C1 con tutor especializado. Preparación Goethe-Zertifikat, conversación, gramática y pronunciación.',
      provider: {
        '@type': 'Organization',
        name: 'Idiomas WeLearn',
        url: 'https://idiomaswl.com',
      },
      hasCourseInstance: [
        {
          '@type': 'CourseInstance',
          courseMode: 'online',
          inLanguage: 'de',
          courseWorkload: 'PT1H',
          instructor: { '@type': 'Person', name: 'José David Duarte Silva' },
        },
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'COP',
        description: 'Clase de diagnóstico gratis',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://idiomaswl.com/#localbusiness',
      name: 'Idiomas WeLearn',
      description: 'Academia de idiomas online. Clases de alemán, inglés, coreano, francés, italiano y portugués.',
      url: 'https://idiomaswl.com',
      telephone: '+573005004253',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bucaramanga',
        addressRegion: 'Santander',
        addressCountry: 'CO',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de Alemán', item: 'https://idiomaswl.com/clases-de-aleman' },
      ],
    },
  ],
};

const WHY_CARDS = [
  { icon: '🎯', title: 'Clase diagnóstico gratis', desc: 'Evaluamos tu nivel real, entendemos tu objetivo (visa, estudios o trabajo) y diseñamos tu plan personalizado.' },
  { icon: '🇩🇪', title: 'Tutor especializado', desc: 'Docentes con experiencia en Goethe-Zertifikat y en enseñanza del alemán a hispanohablantes.' },
  { icon: '📐', title: 'Gramática sin miedo', desc: 'Los 4 casos del alemán (Nominativ, Akkusativ, Dativ, Genitiv) explicados con lógica, no con memorización.' },
  { icon: '✅', title: 'Preparación Goethe', desc: 'Leseverstehen, Hörverstehen, Schreiben y Sprechen. Simulacros reales y feedback detallado.' },
];

const LEVELS = [
  {
    tag: 'A1 – A2',
    title: 'Fundamentos del alemán',
    desc: 'Pronunciación, saludos, verbos modales, artículos determinados e indeterminados, presente y pasado simple. Conversaciones cotidianas básicas.',
    time: '5–8 meses',
  },
  {
    tag: 'B1',
    title: 'Alemán funcional — Goethe B1',
    desc: 'Subjuntivo, pasado compuesto, vocabulario laboral y burocrático. El nivel B1 es el requerido para visa de trabajo, reunificación familiar y residencia en Alemania.',
    time: '8–14 meses',
  },
  {
    tag: 'B2 – C1',
    title: 'Alemán avanzado — Goethe C1',
    desc: 'Debates, escritura académica, gramática compleja, Konjunktiv II. Requerido para universidades alemanas, DAAD y trabajos técnicos especializados.',
    time: '14–24 meses',
  },
];

const GOETHE_EXAMS = [
  {
    name: 'Goethe A1',
    level: 'Principiante',
    desc: 'Requerido para la visa de reunificación familiar (Familiennachzug). Evalúa comprensión y producción básica en situaciones cotidianas.',
  },
  {
    name: 'Goethe B1',
    level: 'Intermedio',
    desc: 'El más solicitado. Requerido para visa de trabajo (Fachkräfteeinwanderungsgesetz), residencia permanente y para solicitar el pasaporte alemán.',
  },
  {
    name: 'Goethe C1',
    level: 'Avanzado',
    desc: 'Requerido para acceso directo a universidades alemanas sin examen de admisión adicional. Ideal para ingeniería, medicina y posgrados en Alemania.',
  },
];

const FAQS = [
  {
    q: '¿Necesito saber alemán para empezar?',
    a: 'No. Empezamos desde A1 absoluto. La primera sesión cubre el alfabeto alemán, pronunciación básica y las primeras frases de presentación.',
  },
  {
    q: '¿Qué tan difícil es el alemán para colombianos?',
    a: 'Es más accesible de lo que parece. La pronunciación es consistente (se escribe como se lee) y hay vocabulario similar al inglés. Los 4 casos gramaticales son el mayor reto, pero con el método correcto se interiorizan gradualmente.',
  },
  {
    q: '¿Para qué sirve el Goethe-Zertifikat?',
    a: 'El Goethe-Zertifikat es la certificación oficial del Instituto Goethe. Es requerida para visas de trabajo en Alemania (B1), estudios universitarios (B2–C1), residencia permanente y el pasaporte alemán (B1). También es valorada por empleadores alemanes y austriacos.',
  },
  {
    q: '¿Cuánto tiempo toma llegar al Goethe B1?',
    a: 'Partiendo de cero, entre 14 y 20 meses con práctica constante de 3–4 horas semanales. Si ya tienes base (A2), puedes alcanzar B1 en 8–12 meses.',
  },
  {
    q: '¿Las clases son presenciales o virtuales?',
    a: 'Son 100% virtuales, por videollamada. Puedes estar en Bogotá, Medellín, Cali, Bucaramanga o cualquier ciudad de Colombia o el mundo.',
  },
];

const BLOG_POSTS = [
  { cat: 'Alemán', color: '#1a2ecc', title: 'Clases de alemán online en Colombia: guía para elegir bien', slug: 'clases-de-aleman-online-colombia' },
  { cat: 'Alemán', color: '#1a2ecc', title: 'Goethe-Zertifikat: guía completa para colombianos', slug: 'goethe-zertifikat-guia-completa-colombia' },
  { cat: 'Método', color: '#7c3aed', title: 'Cómo aprender un idioma más rápido: lo que dice la ciencia', slug: 'como-aprender-un-idioma-mas-rapido' },
];

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

export default function ClasesDeAlemanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className={s.page}>

        {/* ══════════════ HERO ══════════════ */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <div className={s.heroPhrase}>Hallo!</div>
              <p className={s.eyebrow}>Alemán online · WeLearn</p>
              <h1 className={s.h1}>
                Aprende alemán<br />
                <span className={s.accent}>de verdad.</span>
              </h1>
              <p className={s.heroSub}>
                El alemán abre puertas a Alemania, Austria y Suiza — visas de trabajo, universidades de clase mundial
                y salarios entre los más altos de Europa. Con el método WeLearn llegas al Goethe B1 con una base sólida.
              </p>
              <div className={s.heroCtas}>
                <a
                  href={`https://wa.me/${WA}?text=${WA_GENERAL}`}
                  target="_blank" rel="noopener noreferrer"
                  className={s.waBtn}
                >
                  <WaIcon />
                  Clase de diagnóstico gratis
                </a>
                <Link href="/examenes/goethe" className={s.ghostBtn}>
                  Ver simulacros Goethe →
                </Link>
              </div>
            </div>

            <div className={s.heroVisual}>
              <div className={s.heroCard}>
                <span className={s.heroCardFlag}>🇩🇪</span>
                <p className={s.heroCardTitle}>Goethe-Zertifikat</p>
                <p className={s.heroCardSub}>La certificación oficial del Instituto Goethe — reconocida en todo el mundo</p>
                <div className={s.levelBadges}>
                  {['A1','A2','B1','B2','C1'].map(l => (
                    <span key={l} className={s.levelBadge}>{l}</span>
                  ))}
                </div>
              </div>
              <div className={s.heroCard}>
                <p className={s.heroCardTitle}>¿Por qué alemán?</p>
                <p className={s.heroCardSub}>
                  • Alemania busca activamente profesionales colombianos<br />
                  • Fachkräfteeinwanderungsgesetz: visa de trabajo simplificada<br />
                  • B1 abre la puerta a residencia permanente<br />
                  • 4ª economía más grande del mundo
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Proof strip ────────────────────────────────────── */}
        <div className={s.proofStrip}>
          <span className={s.proofItem}><strong>6 idiomas</strong> disponibles</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Clase diagnóstico</strong> gratis</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Goethe A1 hasta C1</strong></span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>100% online</strong> · Colombia y mundo</span>
        </div>

        {/* ══════════════ WHY ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Por qué WeLearn</p>
            <h2 className={s.h2}>No es un curso. Es un método.</h2>
            <p className={s.sectionSub}>
              Diseñamos el camino completo desde tu nivel actual hasta tu objetivo — sea el Goethe B1 para una visa o el C1 para una universidad alemana.
            </p>
            <div className={s.whyGrid}>
              {WHY_CARDS.map(c => (
                <div key={c.title} className={s.whyCard}>
                  <div className={s.whyIcon}>{c.icon}</div>
                  <p className={s.whyTitle}>{c.title}</p>
                  <p className={s.whyDesc}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ LEVELS ══════════════ */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Niveles</p>
            <h2 className={s.h2}>Desde cero hasta C1</h2>
            <p className={s.sectionSub}>
              Cada nivel tiene objetivos claros. Sabes exactamente qué aprendes y para qué sirve en tu plan de vida.
            </p>
            <div className={s.levelsGrid}>
              {LEVELS.map(l => (
                <div key={l.tag} className={s.levelCard}>
                  <span className={s.levelTag}>{l.tag}</span>
                  <p className={s.levelTitle}>{l.title}</p>
                  <p className={s.levelDesc}>{l.desc}</p>
                  <p className={s.levelTime}>⏱ {l.time}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ GOETHE EXAMS ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Certificaciones</p>
            <h2 className={s.h2}>Goethe-Zertifikat: elige el nivel correcto</h2>
            <p className={s.sectionSub}>
              Cada Goethe abre una puerta diferente. Identifica cuál necesitas según tu objetivo.
            </p>
            <div className={s.goetheGrid}>
              {GOETHE_EXAMS.map(e => (
                <div key={e.name} className={s.goetheCard}>
                  <p className={s.goetheName}>{e.name}</p>
                  <p className={s.goetheLevel}>{e.level}</p>
                  <p className={s.goetheDesc}>{e.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <a
                href={`https://wa.me/${WA}?text=${WA_GOETHE}`}
                target="_blank" rel="noopener noreferrer"
                className={s.waBtnLight}
              >
                <WaIcon />
                Preparar mi Goethe ahora →
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════ FAQ ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Preguntas frecuentes</p>
            <h2 className={s.h2}>Resolvemos tus dudas</h2>
            <div className={s.faqList}>
              {FAQS.map(f => (
                <details key={f.q} className={s.faqItem}>
                  <summary className={s.faqQ}>{f.q}</summary>
                  <p className={s.faqA}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ BLOG ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Del blog WeLearn</p>
            <h2 className={s.h2}>Aprende antes de empezar</h2>
            <div className={s.blogGrid}>
              {BLOG_POSTS.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className={s.blogCard}>
                  <p className={s.blogCat} style={{ color: p.color }}>{p.cat}</p>
                  <p className={s.blogTitle}>{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FINAL CTA ══════════════ */}
        <section className={s.ctaSection}>
          <div className={s.ctaBox}>
            <p className={s.ctaPhrase}>Viel Erfolg!</p>
            <h2 className={s.ctaTitle}>
              Tu primera clase de alemán<br />
              <span className={s.accent}>es gratis.</span>
            </h2>
            <p className={s.ctaSub}>
              Diagnosticamos tu nivel, definimos tu objetivo y te mostramos exactamente cómo llegar al Goethe que necesitas.
            </p>
            <div className={s.ctaBtns}>
              <a
                href={`https://wa.me/${WA}?text=${WA_GENERAL}`}
                target="_blank" rel="noopener noreferrer"
                className={s.waBtn}
              >
                <WaIcon />
                Agendar diagnóstico gratis
              </a>
              <Link href="/precios" className={s.ghostBtnLight}>
                Ver planes y precios →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
