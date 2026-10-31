import LanguageResourceLinks from '@/components/hub/LanguageResourceLinks';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FoundersBand from '@/components/hub/FoundersBand';
import PracticeBand from '@/components/hub/PracticeBand';
import { localBusinessNode, davidNode, zhannaNode, courseInstances } from '@/components/hub/localBusiness';
import s from './page.module.css';

// ── WhatsApp ─────────────────────────────────────────────────────────────────
const WA = '573005004253';
const wa = (msg: string) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const WA_GENERAL = wa('Hola, vi su página de clases de inglés. Quiero contarles mi objetivo y conocer la ruta, el tutor, la modalidad y el precio.');
const WA_CONVERSACION = wa('Hola, quiero mejorar mi conversación en inglés. ¿Cómo son las clases y cuánto cuesta el diagnóstico con tutor?');
const WA_TRABAJO = wa('Hola, quiero mejorar mi inglés para trabajo o para comunicarme con fluidez. ¿Cómo funciona y cuánto cuesta la clase de diagnóstico con tutor?');
const WA_ESTUDIO = wa('Hola, quiero aprender inglés para estudiar o viajar. ¿Qué ruta me recomiendan y cuánto cuesta el diagnóstico con tutor?');

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Clases de inglés online en Colombia | WeLearn',
  description:
    'Aprende inglés online con clases en vivo, tutor asignado y una ruta para conversación, trabajo o estudio. Consulta modalidad y precio antes de agendar.',
  alternates: { canonical: 'https://www.idiomaswl.com/clases-de-ingles' },
  openGraph: {
    title: 'Clases de inglés online en Colombia | WeLearn',
    description: 'Clases de inglés general con tutor asignado y una ruta según tu nivel y objetivo. También ofrecemos preparación de exámenes.',
    url: 'https://www.idiomaswl.com/clases-de-ingles',
  },
};

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const FAQS = [
  { q: '¿Puedo empezar inglés desde cero?', a: 'Sí. La ruta se ajusta a tu nivel de partida. En la orientación inicial nos cuentas qué necesitas; el diagnóstico con tutor, que es pago, permite definir un plan de clases.' },
  { q: '¿Las clases de inglés online son en vivo?', a: 'Sí. Las sesiones con tutor se hacen por videollamada y se complementan con materiales de práctica. Consulta horarios e intensidad disponibles antes de elegir un plan.' },
  { q: '¿Puedo estudiar inglés para trabajo o conversación?', a: 'Sí. Puedes enfocar las clases en conversación, entrevistas, reuniones, viajes u otra meta personal. El tutor ajusta la ruta a tu nivel y objetivo.' },
  { q: '¿En qué se diferencia inglés general de preparación IELTS o TOEFL?', a: 'Inglés general desarrolla el idioma para comunicarte. Las rutas IELTS y TOEFL añaden práctica de las tareas y criterios de cada examen. Si necesitas una certificación, consulta la página específica de preparación.' },
  { q: '¿Qué exámenes de inglés preparan en WeLearn?', a: 'Ofrecemos preparación para IELTS, TOEFL iBT, Cambridge B2 First e ICFES Saber 11. IELTS, TOEFL e ICFES tienen páginas de preparación específicas; también puedes explorar prácticas y simulacros por examen.' },
  { q: '¿Cuánto cuestan las clases de inglés online?', a: 'Depende de la intensidad semanal y de si tomas clases sueltas o un paquete de horas. La sesión de diagnóstico con tutor es paga; te informamos su precio antes de agendar. Escríbenos al 300 500 4253.' },
  { q: '¿Tienen paquetes de horas con descuento?', a: 'Sí. Hay paquetes prepago de clases en vivo, y entre más horas tomas, menor es el valor por hora. Escríbenos por WhatsApp al 300 500 4253 y te contamos las opciones vigentes.' },
  { q: '¿Cómo funciona y cuánto cuesta la clase de diagnóstico con tutor?', a: 'Es una sesión paga con tutor para revisar tu nivel, objetivo y plan. Te informamos el precio y la modalidad antes de agendar.' },
  { q: '¿Cómo se organizan las clases?', a: 'Te asignamos un tutor y una ruta según tu nivel y objetivo. Consulta las modalidades y horarios disponibles antes de elegir un plan.' },
  { q: '¿Puedo tomar clases si vivo fuera de Colombia?', a: 'Sí. Las clases online son por videollamada, así que puedes estudiar desde Colombia o el exterior. Consulta horarios disponibles para tu zona antes de agendar.' },
];

// El FAQPage se deriva de FAQS para que el marcado y el texto visible no puedan
// divergir: si divergen, Google puede tratarlo como contenido engañoso.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Clases de inglés online con tutor',
      description: 'Clases de inglés general online para conversación, trabajo y estudio, con tutor asignado y una ruta según el nivel de cada estudiante.',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Idiomas WeLearn',
        url: 'https://www.idiomaswl.com',
      },
      hasCourseInstance: courseInstances('Inglés', 'en').slice(0, 1),
    },
    localBusinessNode(
      'Clases particulares de idiomas con sede en Bucaramanga y atención online para toda Colombia.'
    ),
    davidNode(
      'Políglota activo en ocho idiomas y co-fundador de WeLearn. El inglés fue el primero que aprendió, y prepararlo hasta nivel de examen es lo que dio origen al método de WeLearn.'
    ),
    zhannaNode(
      'Co-fundadora y directora académica de WeLearn. Estudió en Inglaterra y en Francia, y lidera el diseño curricular y la preparación de IELTS, TOEFL y Cambridge.',
      ['en', 'es', 'fr', 'ru']
    ),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de Inglés', item: 'https://www.idiomaswl.com/clases-de-ingles' },
      ],
    },
  ],
};

// ── Data ──────────────────────────────────────────────────────────────────────
const INTENTS = [
  {
    icon: '💬',
    title: 'Conversación en inglés',
    target: 'Habla y escucha',
    desc: 'Practica conversaciones reales con un tutor, gana soltura al responder y trabaja pronunciación y comprensión oral desde tu nivel.',
    waUrl: WA_CONVERSACION,
  },
  {
    icon: '💼',
    title: 'Inglés para el trabajo',
    target: 'Reuniones y entrevistas',
    desc: 'Enfoca tus clases en las situaciones profesionales que necesitas: entrevistas, reuniones, presentaciones o comunicación diaria.',
    waUrl: WA_TRABAJO,
  },
  {
    icon: '🌍',
    title: 'Inglés para estudiar y viajar',
    target: 'Estudio y vida diaria',
    desc: 'Aprende a leer, entender y comunicarte en contextos académicos y cotidianos, con una ruta ajustada a tu próximo paso.',
    waUrl: WA_ESTUDIO,
  },
];

const PILARES = [
  {
    num: '01',
    title: 'Método propio para hispanohablantes',
    desc: 'Cada clase sigue un ciclo estructurado: vocabulario, gramática, escucha, producción y revisión espaciada. Nada se deja al azar ni a la improvisación.',
  },
  {
    num: '02',
    title: 'Dirección académica especializada',
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
    price: 'Consultar',
    cadence: '',
    desc: 'Evaluamos tu nivel actual, identificamos tu objetivo y diseñamos un plan de preparación personalizado. Sesión paga; consulta el precio antes de agendar.',
    cta: 'Consultar ruta y precio',
    waUrl: WA_GENERAL,
    featured: false,
  },
  {
    name: 'Plan Preparación',
    price: 'Consultar',
    cadence: '',
    desc: 'Material de práctica, feedback escrito por habilidad y chat con tutor. Sin sesiones en vivo.',
    cta: 'Consultar por WhatsApp',
    waUrl: WA_GENERAL,
    featured: true,
  },
  {
    name: 'Plan Intensivo',
    price: 'Consultar',
    cadence: '',
    desc: 'Sesiones en vivo 2 a 4 veces por semana, tutor asignado, plan de estudio personalizado y evaluación mensual de progreso.',
    cta: 'Consultar por WhatsApp',
    waUrl: WA_GENERAL,
    featured: false,
  },
];

const PAQUETES_HORAS = [
  { label: '4 horas', desc: 'Para reforzar un área específica o probar WeLearn sin compromiso mensual.', badge: null },
  { label: '10 horas', desc: 'El más popular. Cubre una unidad completa con mejor precio por hora.', badge: 'Más popular' },
  { label: '20 horas', desc: 'Para avanzar en tu objetivo con más tiempo de práctica y tutoría.', badge: 'Mejor precio/hora' },
];

const WA_PAQUETE = wa('Hola, me interesa un paquete de horas de inglés con WeLearn. ¿Qué opciones tienen?');

const TESTIMONIALS = [
  {
    name: 'Leonardo Pinto',
    city: 'Bucaramanga',
    result: 'Inglés · Work & Travel USA',
    quote: 'Estudié inglés en WeLearn para prepararme e ir a trabajar en USA durante el verano y me fue de maravilla. Volveré para presentar el examen TOEFL.',
  },
  {
    name: 'Carlos Torres',
    city: 'Bucaramanga',
    result: 'TOEFL · Inglés — Maestría',
    quote: 'Realmente les agradezco a ustedes dos por toda la ayuda, el master dura 2 años pero mi profesor quiere que haga otro curso cuando me gradúe.',
  },
  {
    name: 'Karen Ayala',
    city: 'Bucaramanga',
    result: 'Goethe — Alemán',
    quote: 'David te he recomendado como con 15 personas sin decir mentiras, espero que les salga todo suuuper biennn.',
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
              Clases de inglés online · Toda Colombia
            </p>
            <h1 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
              color: 'var(--ink)',
            }}>
              Clases de inglés online<br />{' '}
              <span style={{ color: 'var(--accent)' }}>para hablarlo y usarlo.</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '2rem', maxWidth: 440 }}>
              Aprende desde tu nivel con clases en vivo y tutor asignado. Trabaja conversación,
              comprensión y el inglés que necesitas para estudiar, viajar o avanzar en tu trabajo.
              La orientación inicial por chat es gratis. La sesión de diagnóstico con tutor es paga;
              consulta su precio antes de agendar.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" data-wa-cta="ingles-hero" className={s.waBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Consultar ruta y precio
              </a>
              <Link href="/clases-de-ingles-bucaramanga" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>
                ¿Buscas clases en Bucaramanga? →
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
            <li>✓ Clases con tutor asignado</li>
            <li>✓ Clases en vivo por videollamada</li>
            <li>✓ Conversación y trabajo</li>
            <li>✓ Ruta según tu nivel</li>
            <li>✓ Desde Colombia y el exterior</li>
          </ul>
        </div>
      </div>

      {/* ── FUNDADORES ───────────────────────────────────────────────────── */}
      <LanguageResourceLinks language="ingles" />

      <FoundersBand
        accent="#1a4fcc"
        title="Una ruta de inglés creada por dos políglotas."
        intro="Los fundadores diseñan el método y la ruta; un tutor asignado acompaña tu aprendizaje según tu objetivo."
        davidLine="Habla ocho idiomas. El inglés fue el primero, y su experiencia al preparar exámenes ayudó a crear el método que usamos hoy."
        zhannaLine="Estudió en Inglaterra y en Francia. Esa formación dentro del sistema académico británico respalda nuestra preparación de IELTS, TOEFL y Cambridge."
        zhannaTags={['Co-fundadora · Estudió en Inglaterra', 'Preparación IELTS / TOEFL', 'Diseño curricular']}
      />

      {/* ── INTENT SECTION ───────────────────────────────────────────────── */}
      <section className="wlh-section wlh-section--alt">
        <div className="wrap">
          <p className="wlh-section-eyebrow">01 — ¿Para qué necesitas el inglés?</p>
          <h2 className="wlh-section-h2">Elige dónde quieres usar tu inglés.</h2>
          <p className="wlh-section-desc">
            Tu plan de clases online parte de tu nivel y de lo que necesitas hacer con el idioma. El tutor adapta la práctica y revisa contigo los avances.
          </p>
          <div className={s.grid3} style={{ marginTop: '2.5rem' }}>
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
                  <a href={intent.waUrl} target="_blank" rel="noopener noreferrer" className={s.waBtnSm}>Consultar ruta y precio →</a>
                </div>
              </div>
            ))}
          </div>
          <div className={s.examPaths}>
            <strong>¿Necesitas preparar un examen?</strong>
            <Link href="/preparacion-ielts">IELTS →</Link>
            <Link href="/preparacion-toefl">TOEFL iBT →</Link>
            <Link href="/preparacion-icfes">ICFES Inglés →</Link>
          </div>
        </div>
      </section>

      {/* ── PILARES ──────────────────────────────────────────────────────── */}
      <section className="wlh-section">
        <div className="wrap">
          <p className="wlh-section-eyebrow">02 — Por qué WeLearn</p>
          <h2 className="wlh-section-h2">Clases con tutores reales y un método propio.</h2>
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
            Empieza con una clase de diagnóstico con tutor. Consulta el precio antes de agendar.
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
          {/* Paquetes de horas */}
          <div style={{ marginTop: '2.5rem', paddingTop: '2.25rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontWeight: 700, fontSize: '1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '0.35rem' }}>
              ¿Prefieres pagar por horas sin compromiso mensual?
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
              Tenemos paquetes prepago de clases en vivo. Entre más horas compras, mejor es el precio por hora.
            </p>
            <div className={s.grid3} style={{ gap: '1rem' }}>
              {PAQUETES_HORAS.map(pkg => (
                <div key={pkg.label} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '1.25rem', position: 'relative' }}>
                  {pkg.badge && (
                    <span className="wl-action-on-light" style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#fff', color: 'var(--accent)', fontSize: '0.68rem', fontWeight: 700, padding: '0.18rem 0.75rem', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {pkg.badge}
                    </span>
                  )}
                  <p style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', marginBottom: '0.4rem' }}>Paquete {pkg.label}</p>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.58)', lineHeight: 1.55, marginBottom: '1rem' }}>{pkg.desc}</p>
                  <a href={WA_PAQUETE} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700, fontSize: '0.82rem', padding: '0.5rem', borderRadius: 8, textDecoration: 'none' }}>
                    Consultar precio →
                  </a>
                </div>
              ))}
            </div>
          </div>

          <p style={{
            textAlign: 'center',
            marginTop: '1.75rem',
            color: 'rgba(255,255,255,0.68)',
            fontSize: '0.82rem',
          }}>
            La clase de diagnóstico con tutor es paga · Sin permanencia mínima
          </p>
        </div>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────────────────────── */}
      <section className="wlh-section">
        <div className="wrap">
          <p className="wlh-section-eyebrow">04 — Resultados</p>
          <h2 className="wlh-section-h2">Experiencias de estudiantes WeLearn.</h2>
          <div className={s.grid3} style={{ marginTop: '2.5rem' }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} className={s.testimonialCard}>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--ink)', marginBottom: '1.25rem' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: 'var(--accent-action)', color: '#fff',
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
        </div>
      </section>

      {/* Inglés general: contenido principal de esta ruta. Las consultas locales y de examen tienen páginas propias. */}
      <section className="wlh-section wlh-section--alt">
        <div className="wrap">
          <p className="wlh-section-eyebrow">Inglés para usarlo</p>
          <h2 className="wlh-section-h2">Aprende inglés para hablar, entender y avanzar.</h2>
          <p className="wlh-section-desc">
            Tu punto de partida puede ser desde cero o una base que quieres fortalecer. El tutor ajusta
            las clases a tu objetivo y combina explicación, práctica, corrección y revisión del progreso.
          </p>
          <div className={s.grid3} style={{ marginTop: '2.5rem' }}>
            <div className={s.intentCard}>
              <h3>Conversación cotidiana</h3>
              <p>Practica situaciones reales y recibe correcciones para expresarte con más claridad y seguridad.</p>
            </div>
            <div className={s.intentCard}>
              <h3>Inglés para el trabajo</h3>
              <p>Enfoca las sesiones en entrevistas, reuniones, mensajes y vocabulario de tu contexto laboral.</p>
            </div>
            <div className={s.intentCard}>
              <h3>Comprensión y base del idioma</h3>
              <p>Trabaja escucha, lectura, vocabulario y gramática como apoyo para comunicarte mejor.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wlh-section" aria-labelledby="ingles-local-link">
        <div className="wrap">
          <p className="wlh-section-eyebrow">También en Bucaramanga</p>
          <h2 id="ingles-local-link" className="wlh-section-h2">¿Prefieres una clase presencial?</h2>
          <p className="wlh-section-desc">
            Tenemos sede en Bucaramanga. Consulta las modalidades, la ubicación y los horarios
            en la página de <Link href="/clases-de-ingles-bucaramanga">cursos de inglés en Bucaramanga</Link>.
          </p>
        </div>
      </section>

      {/* ── PRACTICA GRATIS ─────────────────────────────────────────────── */}
      <PracticeBand
        accent="#1a4fcc"
        title="Todo lo que puedes practicar gratis desde hoy"
        sub="Las cinco habilidades de A1 a B2, los simulacros completos de IELTS, TOEFL e ICFES, y el diagnóstico de nivel. Explora todo y crea una cuenta gratis al comenzar."
        cards={[
          { href: '/practica/ingles/a1/gramatica', title: 'Gramática A1 · A2 · B1 · B2', desc: 'Desde los cimientos hasta estructuras avanzadas, con corrección al instante en los cuatro niveles.' },
          { href: '/practica/ingles/a1/vocabulario', title: 'Vocabulario con audio', desc: 'Palabras de alta frecuencia con audio nativo, organizadas por nivel del Marco Europeo.' },
          { href: '/practica/ingles/b1/escucha', title: 'Comprensión auditiva', desc: 'Audio a velocidad real con preguntas, el formato que evalúan IELTS y TOEFL.' },
          { href: '/practica/ingles/b1/lectura', title: 'Comprensión lectora', desc: 'Textos auténticos con preguntas al estilo del examen, para entrenar lectura rápida y detalle.' },
          { href: '/practica/ingles/b1/escritura', title: 'Escritura integrada', desc: 'Lee, prepara vocabulario y escribe una respuesta real, con modelo de nivel para comparar.' },
          { href: '/practica/ingles/b1/habla', title: 'Expresión oral', desc: 'La sección que más pesa y la que menos se practica sola. Estructuras y pronunciación modelo.' },
          { href: '/herramientas/quizes/ingles', title: 'Quiz de tiempos verbales', desc: 'Elige entre 19 tiempos y estructuras y recorre seis niveles con resultados diferidos.' },
          { href: '/examenes/ielts', title: 'Simulacros IELTS', desc: 'Listening, Reading y Writing con formato real e informe de desempeño por sección.' },
          { href: '/examenes/toefl', title: 'Simulacros TOEFL', desc: 'Reading, Listening, Speaking y Writing al estilo del iBT, con retroalimentación.' },
          { href: '/examenes/icfes', title: 'Simulacro ICFES', desc: 'La sección de inglés del Saber 11, con el nivel estimado según la escala del examen.' },
          { href: '/herramientas/transcripcion-fonetica/ingles', title: 'Transcripción fonética', desc: 'Pega cualquier texto y léelo en alfabeto fonético, en británico o americano, con el acento tónico donde va.' },
          { href: '/nivel-radar', title: 'Explora tu nivel orientativo', desc: 'La herramienta automática es gratis y te da un punto de partida antes de una sesión paga con tutor.' },
        ]}
      />

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

      {/* ── BLOG RESOURCES ──────────────────────────────────────────────── */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-2, #f9f9fb)' }}>
        <div className="wrap">
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem' }}>
            Del blog WeLearn
          </p>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 1.75rem' }}>
            Guías para aprender y usar el inglés
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {[
              { cat: 'Inglés', title: 'Niveles de inglés A1–C2: qué significa cada uno', slug: 'niveles-de-ingles-a1-a2-b1-b2-c1-c2' },
              { cat: 'Speaking', title: 'Por qué te bloqueas al hablar inglés y cómo superarlo', slug: 'como-mejorar-el-ingles-hablado' },
              { cat: 'Trabajo', title: 'Inglés para empresas multinacionales', slug: 'ingles-para-trabajar-en-empresas-multinacionales' },
              { cat: 'Inglés', title: 'Inglés B2–C1 para trabajo remoto', slug: 'ingles-b2-c1-para-trabajo-remoto-global' },
              { cat: 'Inglés', title: 'Inglés para entrevistas en multinacionales', slug: 'ingles-para-entrevistas-de-trabajo-en-multinacionales' },
              { cat: 'Inglés', title: 'Inglés técnico para programadores', slug: 'ingles-tecnico-para-programadores-y-desarrolladores' },
            ].map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`} style={{ display: 'block', padding: '1rem 1.1rem', borderRadius: 10, border: '1px solid var(--line-soft)', background: 'var(--bg)', textDecoration: 'none', transition: 'box-shadow 0.15s' }}>
                <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1a4fcc', background: 'rgba(26,79,204,0.1)', padding: '2px 8px', borderRadius: 100, marginBottom: '0.55rem' }}>{a.cat}</span>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4, color: 'var(--ink)', margin: 0 }}>{a.title} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="wlh-section">
        <div className={`wrap ${s.ctaFinal}`}>
          <p className="wlh-section-eyebrow">Empieza hoy</p>
          <h2 className="wlh-section-h2">
            Tu clase de diagnóstico es de pago.<br />Sin compromisos.
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Cuéntanos tu objetivo por chat sin costo. La sesión con tutor es paga;
            te explicamos la ruta y el precio antes de agendar.
          </p>
          <a href={WA_GENERAL} data-wa-cta="ingles-final" target="_blank" rel="noopener noreferrer" className={s.waBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Consultar ruta y precio
          </a>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
            Consulta la disponibilidad y los horarios actuales antes de agendar.
          </p>
        </div>
      </section>

      {/* ── FOOTER MINI ──────────────────────────────────────────────────── */}
      <div className={s.footerMini}>
        <p>
          © 2026 Idiomas WeLearn ·{' '}
          <Link href="/">Inicio</Link> ·{' '}
          <Link href="/metodo">Método</Link> ·{' '}
          <Link href="/examenes/ielts">IELTS</Link> ·{' '}
          <Link href="/examenes/toefl">TOEFL</Link> ·{' '}
          <Link href="/examenes/icfes">ICFES</Link> ·{' '}
        </p>
      </div>
    </>
  );
}
