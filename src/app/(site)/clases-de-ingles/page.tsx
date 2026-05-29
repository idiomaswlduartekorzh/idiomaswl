import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import s from './page.module.css';

// ── WhatsApp ─────────────────────────────────────────────────────────────────
const WA = '573005004253';
const wa = (msg: string) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const WA_GENERAL = wa('Hola, vi su página de clases de inglés y quiero agendar mi clase de diagnóstico gratis.');
const WA_IELTS   = wa('Hola, necesito preparación para el IELTS. ¿Cómo puedo agendar mi clase de diagnóstico gratis?');
const WA_TOEFL   = wa('Hola, necesito preparación para el TOEFL iBT. ¿Cómo puedo agendar mi clase de diagnóstico gratis?');
const WA_ICFES   = wa('Hola, necesito mejorar mi inglés para el ICFES Saber 11. ¿Cómo puedo agendar mi clase de diagnóstico gratis?');
const WA_TRABAJO = wa('Hola, quiero mejorar mi inglés para trabajo o para comunicarme con fluidez. ¿Cómo funciona la clase de diagnóstico gratis?');

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Clases de Inglés Online en Colombia — IELTS, TOEFL, ICFES | WeLearn',
  description:
    'Clases de inglés online con preparación para IELTS, TOEFL e ICFES Saber 11. Profesor políglota en 8 idiomas y directora académica. Clase de diagnóstico gratis. Bucaramanga y todo Colombia.',
  keywords: [
    'clases de inglés', 'inglés Bucaramanga', 'preparación IELTS Colombia',
    'preparación TOEFL Colombia', 'ICFES inglés Saber 11', 'aprender inglés online Colombia',
    'clases inglés online', 'IELTS Bucaramanga', 'TOEFL Bucaramanga',
    'inglés para trabajo', 'inglés para migrar',
  ],
  alternates: { canonical: 'https://idiomaswl.com/clases-de-ingles' },
  openGraph: {
    title: 'Clases de Inglés Online en Colombia — IELTS, TOEFL, ICFES | WeLearn',
    description: 'Preparación real para IELTS, TOEFL e ICFES. Clase de diagnóstico gratis. Bucaramanga y todo Colombia.',
    url: 'https://idiomaswl.com/clases-de-ingles',
  },
};

// ── JSON-LD ───────────────────────────────────────────────────────────────────
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué exámenes de inglés preparan en WeLearn?',
      acceptedAnswer: { '@type': 'Answer', text: 'Preparamos IELTS Academic y General, TOEFL iBT y ICFES Saber 11. Cada examen tiene su ruta de preparación propia con simulacros completos y retroalimentación por sección.' },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo necesito para prepararme para el IELTS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Con nivel B1 sólido, entre 10 y 14 semanas de preparación constante (1 hora diaria) son suficientes para alcanzar Band 7. Con nivel más bajo, puede tomar de 5 a 8 meses.' },
    },
    {
      '@type': 'Question',
      name: '¿Cómo funciona la clase de diagnóstico gratis?',
      acceptedAnswer: { '@type': 'Answer', text: 'Es una sesión de 45 minutos por videollamada donde evaluamos tu nivel de inglés, identificamos tu objetivo (examen, trabajo, migración) y diseñamos el plan de preparación más eficiente para ti. Sin costo y sin compromiso.' },
    },
    {
      '@type': 'Question',
      name: '¿Las clases son individuales o grupales?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ofrecemos clases 1:1 (individuales) con tutor asignado. No hacemos grupos masivos porque cada estudiante tiene objetivos y debilidades diferentes. El plan es personal desde el primer día.' },
    },
    {
      '@type': 'Question',
      name: '¿Puedo tomar clases si vivo fuera de Bucaramanga?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí. Todas las clases son 100% online por videollamada. Tenemos estudiantes en Bogotá, Medellín, Cali, Barranquilla, otras ciudades de Colombia y en el exterior.' },
    },
  ],
};

const FAQS = [
  { q: '¿Qué exámenes de inglés preparan en WeLearn?', a: 'Preparamos IELTS Academic y General, TOEFL iBT y ICFES Saber 11. Cada examen tiene su ruta de preparación propia con simulacros completos y retroalimentación por sección.' },
  { q: '¿Cuánto tiempo necesito para prepararme para el IELTS?', a: 'Con nivel B1 sólido, entre 10 y 14 semanas de preparación constante (1 hora diaria) son suficientes para alcanzar Band 7. Con nivel más bajo, puede tomar de 5 a 8 meses.' },
  { q: '¿Cómo funciona la clase de diagnóstico gratis?', a: 'Es una sesión de 45 minutos por videollamada donde evaluamos tu nivel de inglés, identificamos tu objetivo y diseñamos el plan. Sin costo y sin compromiso.' },
  { q: '¿Las clases son individuales o grupales?', a: 'Ofrecemos clases 1:1 con tutor asignado. No hacemos grupos masivos porque cada estudiante tiene objetivos y debilidades diferentes.' },
  { q: '¿Puedo tomar clases si vivo fuera de Bucaramanga?', a: 'Sí. Todas las clases son 100% online. Tenemos estudiantes en Bogotá, Medellín, Cali, Barranquilla y en el exterior.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Clases de Inglés — Preparación IELTS, TOEFL e ICFES',
      description: 'Clases de inglés online con preparación para IELTS, TOEFL e ICFES. Método WeLearn de 17 pasos.',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Idiomas WeLearn',
        url: 'https://idiomaswl.com',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'COP',
        description: 'Clase de diagnóstico gratis',
      },
    },
    {
      '@type': 'LocalBusiness',
      name: 'Idiomas WeLearn',
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
        { '@type': 'ListItem', position: 2, name: 'Clases de Inglés', item: 'https://idiomaswl.com/clases-de-ingles' },
      ],
    },
  ],
};

// ── Data ──────────────────────────────────────────────────────────────────────
const INTENTS = [
  {
    icon: '🎓',
    title: 'Certificación IELTS',
    target: 'Band 6.5 – 8.0',
    desc: 'Para estudiar en el exterior, migrar o trabajar en empresas internacionales. Preparación para Academic y General Training.',
    waUrl: WA_IELTS,
    simulacro: { label: 'Hacer simulacro IELTS gratis →', href: '/examenes/ielts' },
  },
  {
    icon: '🏛️',
    title: 'Certificación TOEFL',
    target: '90 – 110 puntos',
    desc: 'Para universidades en EE.UU., Canadá y Europa. Estrategias específicas para las cuatro secciones del iBT.',
    waUrl: WA_TOEFL,
    simulacro: { label: 'Hacer simulacro TOEFL gratis →', href: '/examenes/toefl' },
  },
  {
    icon: '📚',
    title: 'ICFES Saber 11',
    target: 'Nivel B2 – C1',
    desc: 'Para subir el puntaje en inglés de las pruebas de Estado. Estrategia específica para el componente de inglés del ICFES.',
    waUrl: WA_ICFES,
    simulacro: { label: 'Hacer simulacro ICFES gratis →', href: '/examenes/icfes' },
  },
  {
    icon: '💼',
    title: 'Inglés para trabajo o vida',
    target: 'Conversación fluida',
    desc: 'Para comunicarte con fluidez en el trabajo, viajar o mudarte al exterior. Clases conversacionales con corrección real.',
    waUrl: WA_TRABAJO,
    simulacro: null,
  },
];

const PILARES = [
  {
    num: '01',
    title: 'Método de 17 pasos',
    desc: 'Cada clase sigue un ciclo estructurado: vocabulario, gramática, escucha, producción y revisión espaciada. Nada se deja al azar ni a la improvisación.',
  },
  {
    num: '02',
    title: 'Directora académica con doctorado',
    desc: 'Zhanna Korzh lidera el diseño curricular y la calidad de todos los cursos. Rigor académico real, respaldado por años de experiencia en preparación de exámenes internacionales.',
  },
  {
    num: '03',
    title: 'Profesor políglota en 8 idiomas',
    desc: 'David habla inglés, coreano, ruso, alemán y más. Sabe exactamente cómo funciona el proceso de aprendizaje para un hispanohablante y qué errores son los más comunes.',
  },
];

const PRECIOS = [
  {
    name: 'Clase de diagnóstico',
    price: 'Gratis',
    cadence: '',
    desc: 'Evaluamos tu nivel actual, identificamos tu objetivo y diseñamos un plan de preparación personalizado. Sin costo ni compromiso.',
    cta: 'Agendar por WhatsApp',
    waUrl: WA_GENERAL,
    featured: false,
  },
  {
    name: 'Plan Preparación',
    price: 'desde $80.000',
    cadence: '/ mes',
    desc: 'Simulacros ilimitados, material de preparación, feedback escrito por sección y chat con tutor en menos de 24 horas.',
    cta: 'Consultar por WhatsApp',
    waUrl: WA_GENERAL,
    featured: true,
  },
  {
    name: 'Plan Intensivo',
    price: 'desde $300.000',
    cadence: '/ mes',
    desc: 'Sesiones en vivo 2 a 4 veces por semana, tutor asignado, plan de estudio personalizado y evaluación mensual de progreso.',
    cta: 'Consultar por WhatsApp',
    waUrl: WA_GENERAL,
    featured: false,
  },
];

const TESTIMONIALS = [
  {
    name: 'Camila R.',
    city: 'Bogotá',
    result: 'IELTS Academic · Band 7.0',
    quote: 'Preparé el IELTS en 8 semanas con WeLearn. El método estructurado me permitió identificar exactamente dónde mejorar en cada sección.',
  },
  {
    name: 'Sebastián M.',
    city: 'Medellín',
    result: 'TOEFL iBT · 101 puntos',
    quote: 'Los simulacros son los más completos que encontré en español. Pasé el examen en el primer intento gracias a la estrategia de preparación.',
  },
  {
    name: 'Laura P.',
    city: 'Bucaramanga',
    result: 'ICFES · Nivel C1',
    quote: 'Mejoré 40 puntos en el componente de inglés del ICFES. El plan de estudio personalizado marcó toda la diferencia.',
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ClasesDeInglesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className={`wrap ${s.hero}`}>

          {/* Copy */}
          <div>
            <p className="wlh-section-eyebrow" style={{ marginBottom: '1rem' }}>
              Clases de inglés online · Colombia
            </p>
            <h1 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
              color: 'var(--ink)',
            }}>
              Aprende inglés<br />
              con quien<br />
              <span style={{ color: 'var(--accent)' }}>lo domina de verdad.</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '2rem', maxWidth: 440 }}>
              Preparación específica para IELTS, TOEFL e ICFES con el método WeLearn.
              Clase de diagnóstico 100% gratis.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className={s.waBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Clase de diagnóstico gratis
              </a>
              <Link href="/examenes/ielts" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>
                Ver simulacro IELTS →
              </Link>
            </div>
          </div>

          {/* Foto de David */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={s.heroPhoto}>
              <Image
                src="/images/david-duarte.jpg"
                alt="José David Duarte Silva — Políglota en 8 idiomas, co-fundador de Idiomas WeLearn"
                fill
                sizes="(max-width: 640px) 280px, 320px"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── PROOF STRIP ──────────────────────────────────────────────────── */}
      <div className={s.proofStrip}>
        <div className="wrap">
          <ul>
            <li>✓ 500+ estudiantes preparados</li>
            <li>✓ IELTS Band 7.0+</li>
            <li>✓ TOEFL 100+ puntos</li>
            <li>✓ ICFES Nivel C1</li>
            <li>✓ Bucaramanga · Todo Colombia</li>
          </ul>
        </div>
      </div>

      {/* ── INTENT SECTION ───────────────────────────────────────────────── */}
      <section className="wlh-section wlh-section--alt">
        <div className="wrap">
          <p className="wlh-section-eyebrow">01 — ¿Para qué necesitas el inglés?</p>
          <h2 className="wlh-section-h2">Cada objetivo, una preparación específica.</h2>
          <p className="wlh-section-desc">
            No todas las clases de inglés son iguales. Tu plan de estudio en WeLearn
            depende de exactamente lo que necesitas lograr.
          </p>
          <div className={s.grid4} style={{ marginTop: '2.5rem' }}>
            {INTENTS.map(intent => (
              <div key={intent.title} className={s.intentCard}>
                <span style={{ fontSize: '2rem', lineHeight: 1 }}>{intent.icon}</span>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem', color: 'var(--ink)' }}>
                    {intent.title}
                  </h3>
                  <span className={s.targetBadge}>{intent.target}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6, flexGrow: 1 }}>
                  {intent.desc}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <a href={intent.waUrl} target="_blank" rel="noopener noreferrer" className={s.waBtnSm}>
                    Agendar clase gratis →
                  </a>
                  {intent.simulacro && (
                    <Link
                      href={intent.simulacro.href}
                      style={{ fontSize: '0.8rem', color: 'var(--accent)', textAlign: 'center', textDecoration: 'underline', textUnderlineOffset: 3 }}
                    >
                      {intent.simulacro.label}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILARES ──────────────────────────────────────────────────────── */}
      <section className="wlh-section">
        <div className="wrap">
          <p className="wlh-section-eyebrow">02 — Por qué WeLearn</p>
          <h2 className="wlh-section-h2">No es una app. Es una academia de verdad.</h2>
          <p className="wlh-section-desc" style={{ maxWidth: 560 }}>
            WeLearn nació de la frustración con métodos que entretienen pero no enseñan.
            Aquí la prioridad es que aprendas y alcances el resultado que necesitas.
          </p>
          <div className={s.grid3} style={{ marginTop: '3rem' }}>
            {PILARES.map(p => (
              <div key={p.num} className={s.pilarRow}>
                <span style={{
                  fontWeight: 800,
                  fontSize: '1.75rem',
                  color: 'var(--accent)',
                  lineHeight: 1,
                  minWidth: 44,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {p.num}
                </span>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRECIOS ──────────────────────────────────────────────────────── */}
      <section className="wlh-section wlh-section--dark">
        <div className="wrap">
          <p className="wlh-section-eyebrow wlh-section-eyebrow--light">03 — Precios</p>
          <h2 className="wlh-section-h2 wlh-section-h2--light">
            ¿Cuánto cuesta aprender inglés con WeLearn?
          </h2>
          <p className="wlh-section-desc wlh-section-desc--light" style={{ maxWidth: 500 }}>
            Empieza con tu clase de diagnóstico gratis. Sin tarjeta de crédito ni compromiso.
          </p>
          <div className={s.grid3} style={{ marginTop: '2.5rem' }}>
            {PRECIOS.map(plan => (
              <div key={plan.name} className={`${s.pricingCard}${plan.featured ? ` ${s.pricingCardFeatured}` : ''}`}>
                {plan.featured && <span className={s.featuredBadge}>Más popular</span>}
                <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>
                  {plan.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.65rem', color: '#fff' }}>{plan.price}</span>
                  {plan.cadence && (
                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>{plan.cadence}</span>
                  )}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, flexGrow: 1 }}>
                  {plan.desc}
                </p>
                <a
                  href={plan.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '0.65rem 1.25rem',
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    marginTop: 'auto',
                    background: plan.featured ? '#fff' : 'rgba(255,255,255,0.12)',
                    color: plan.featured ? 'var(--accent)' : '#fff',
                    transition: 'opacity 0.15s',
                  }}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p style={{
            textAlign: 'center',
            marginTop: '1.75rem',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.82rem',
          }}>
            Todos los planes incluyen clase de diagnóstico gratis · Sin permanencia mínima
          </p>
          <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
            <Link href="/precios" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Ver comparación completa de planes →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────────────────────── */}
      <section className="wlh-section">
        <div className="wrap">
          <p className="wlh-section-eyebrow">04 — Resultados</p>
          <h2 className="wlh-section-h2">Estudiantes que alcanzaron su puntaje.</h2>
          <div className={s.grid3} style={{ marginTop: '2.5rem' }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} className={s.testimonialCard}>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--ink)', marginBottom: '1.25rem' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: 'var(--accent)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.95rem', flexShrink: 0,
                  }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--ink)' }}>
                      {t.name} · {t.city}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 700 }}>
                      {t.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>
            * Los testimonios son representativos del tipo de resultado que alcanzan nuestros estudiantes.
            Reemplazar con testimonios reales cuando estén disponibles.
          </p>
        </div>
      </section>

      {/* ── SIMULACRO HOOK ───────────────────────────────────────────────── */}
      <section className="wlh-section wlh-section--alt">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p className="wlh-section-eyebrow">05 — Practica ahora</p>
          <h2 className="wlh-section-h2">¿Quieres saber cómo estás antes de empezar?</h2>
          <p className="wlh-section-desc" style={{ maxWidth: 500, margin: '0 auto 2.5rem' }}>
            Haz un simulacro gratis de IELTS, TOEFL o ICFES. Sin registro ni costo.
            Mide tu nivel real ahora mismo.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/examenes/ielts" className="btn">Simulacro IELTS →</Link>
            <Link href="/examenes/toefl" className="btn btn-ghost">Simulacro TOEFL →</Link>
            <Link href="/examenes/icfes" className="btn btn-ghost">Simulacro ICFES →</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="wlh-section">
        <div className="wrap" style={{ maxWidth: 720, margin: '0 auto' }}>
          <p className="wlh-section-eyebrow">06 — FAQ</p>
          <h2 className="wlh-section-h2">Preguntas frecuentes</h2>
          <div style={{ marginTop: '2rem' }}>
            {FAQS.map((f, i) => (
              <details key={i} style={{ borderBottom: '1px solid var(--border, #e5e7eb)', paddingBlock: '1.1rem' }}>
                <summary style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  {f.q}
                  <span style={{ fontSize: '1.25rem', flexShrink: 0, color: 'var(--accent)' }}>+</span>
                </summary>
                <p style={{ marginTop: '0.75rem', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="wlh-section">
        <div className={`wrap ${s.ctaFinal}`}>
          <p className="wlh-section-eyebrow">Empieza hoy</p>
          <h2 className="wlh-section-h2">
            Tu clase de diagnóstico es gratis.<br />Sin compromisos.
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            En 45 minutos evaluamos tu nivel, identificamos tu objetivo y te damos
            el plan de preparación más eficiente para ti.
          </p>
          <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className={s.waBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Agendar por WhatsApp
          </a>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
            Respuesta en menos de 2 horas · Lun–Sáb 7 am–8 pm
          </p>
        </div>
      </section>

      {/* ── FOOTER MINI ──────────────────────────────────────────────────── */}
      <div className={s.footerMini}>
        <p>
          © 2026 Idiomas WeLearn ·{' '}
          <Link href="/home">Inicio</Link> ·{' '}
          <Link href="/metodo">Método</Link> ·{' '}
          <Link href="/examenes/ielts">IELTS</Link> ·{' '}
          <Link href="/examenes/toefl">TOEFL</Link> ·{' '}
          <Link href="/examenes/icfes">ICFES</Link> ·{' '}
          <Link href="/precios">Precios</Link>
        </p>
      </div>
    </>
  );
}
