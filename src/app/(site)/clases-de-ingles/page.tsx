import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FoundersBand from '@/components/hub/FoundersBand';
import LocalBand from '@/components/hub/LocalBand';
import PracticeBand from '@/components/hub/PracticeBand';
import { localBusinessNode, davidNode, zhannaNode, courseInstances } from '@/components/hub/localBusiness';
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
const WA_FCE     = wa('Hola, necesito preparación para el Cambridge B2 First (FCE). ¿Cómo puedo agendar mi clase de diagnóstico gratis?');

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Clases de Inglés en Bucaramanga y Online — IELTS, TOEFL, FCE, ICFES | WeLearn',
  description:
    'Academia de inglés en Bucaramanga con clases online para toda Colombia. Preparación IELTS, TOEFL, Cambridge B2 First (FCE) e ICFES Saber 11. Profesor políglota en 8 idiomas. Clase de diagnóstico gratis.',
  keywords: [
    'clases de inglés', 'inglés Bucaramanga', 'preparación IELTS Colombia',
    'preparación TOEFL Colombia', 'ICFES inglés Saber 11', 'aprender inglés online Colombia',
    'clases inglés online', 'IELTS Bucaramanga', 'TOEFL Bucaramanga',
    'Cambridge B2 First Colombia', 'FCE preparación Colombia', 'FCE Bucaramanga',
    'inglés para trabajo', 'inglés para migrar',
  ],
  alternates: { canonical: 'https://www.idiomaswl.com/clases-de-ingles' },
  openGraph: {
    title: 'Clases de Inglés en Bucaramanga y Online — IELTS, TOEFL, ICFES | WeLearn',
    description: 'Academia de inglés en Bucaramanga. Preparación IELTS, TOEFL e ICFES con método propio. Clase de diagnóstico gratis para toda Colombia.',
    url: 'https://www.idiomaswl.com/clases-de-ingles',
  },
};

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const FAQS = [
  { q: '¿Dónde puedo presentar el examen IELTS en Bucaramanga?', a: 'En la UNAB, que es la sede avalada por el British Council en Santander. La inscripción y el pago se hacen directamente con el British Council, no en la universidad. Es el examen internacional de inglés más cómodo de presentar desde Bucaramanga, porque no obliga a viajar.' },
  { q: '¿Puedo presentar el TOEFL iBT en Bucaramanga?', a: 'No nos consta que exista sede de TOEFL iBT en la ciudad, así que cuenta con viajar. Cuidado con una confusión muy común: el TOEFL ITP que se ofrece localmente es un examen diferente, con otros usos, y no reemplaza al iBT que piden las universidades del exterior. Confirma siempre en la fuente oficial antes de pagar.' },
  { q: '¿Qué nivel de inglés necesito para graduarme de la universidad en Bucaramanga?', a: 'Depende de la universidad y varía bastante: va desde A1 en pregrado en la UIS hasta B2 en la UNAB, pasando por B1 en la UPB, la USTA y la UDES. Las UTS piden B1 en tecnología y B2 en el ciclo profesional. Muchas permiten homologar el requisito con un examen internacional. Confirma tu caso con tu facultad, porque los reglamentos cambian.' },
  { q: '¿Qué nivel de inglés piden los call centers bilingües en Bucaramanga?', a: 'Hoy el estándar es B2, que en muchas convocatorias se expresa como un 80% de dominio. Es un salto real frente al B1 que se pedía hace unos años. En el área metropolitana operan compañías como TP, Concentrix, Lean Solutions, Accedo, Atento y Solvo, y los cargos bilingües pagan por encima de los monolingües.' },
  { q: '¿Qué exámenes de inglés preparan en WeLearn?', a: 'Preparamos IELTS Academic y General, TOEFL iBT, Cambridge B2 First (FCE) e ICFES Saber 11. Cada examen tiene su ruta de preparación propia con simulacros completos y retroalimentación por sección.' },
  { q: '¿Cuánto cuesta aprender inglés en Bucaramanga con WeLearn?', a: 'Depende de la intensidad semanal y de si tomas clases sueltas o un paquete de horas, porque el valor por hora baja a mayor volumen. El diagnóstico inicial es gratis y ahí definimos objetivo, nivel y frecuencia para darte el precio exacto de tu caso. Escríbenos al 300 500 4253.' },
  { q: '¿Tienen paquetes de horas con descuento?', a: 'Sí. Hay paquetes prepago de clases en vivo, y entre más horas tomas, menor es el valor por hora. Escríbenos por WhatsApp al 300 500 4253 y te contamos las opciones vigentes.' },
  { q: '¿Cuánto tiempo necesito para prepararme para el IELTS?', a: 'Con nivel B1 sólido, entre 10 y 14 semanas de preparación constante (1 hora diaria) son suficientes para alcanzar Band 7. Con nivel más bajo, puede tomar de 5 a 8 meses.' },
  { q: '¿Hay clases de inglés presenciales en Bucaramanga?', a: 'Sí. WeLearn tiene sede en Bucaramanga y da clases presenciales a estudiantes de Bucaramanga, Floridablanca, Girón y Piedecuesta. Si prefieres no desplazarte, o vives en otra ciudad, la misma clase se hace online por videollamada, con el mismo tutor y el mismo plan. También puedes alternar entre los dos formatos.' },
  { q: '¿Cómo funciona la clase de diagnóstico gratis?', a: 'Es una sesión de 45 minutos por videollamada donde evaluamos tu nivel de inglés, identificamos tu objetivo y diseñamos el plan. Sin costo y sin compromiso.' },
  { q: '¿Las clases son individuales o grupales?', a: 'Ofrecemos clases 1:1 con tutor asignado. No hacemos grupos masivos porque cada estudiante tiene objetivos y debilidades diferentes.' },
  { q: '¿Puedo tomar clases si vivo fuera de Bucaramanga?', a: 'Sí. En Bucaramanga y su área metropolitana puedes venir presencialmente; desde cualquier otra ciudad la clase es online por videollamada. Tenemos estudiantes en Bogotá, Medellín, Cali, Barranquilla y en el exterior.' },
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
      name: 'Clases de Inglés — Preparación IELTS, TOEFL e ICFES',
      description: 'Clases de inglés online con preparación para IELTS, TOEFL e ICFES. Método WeLearn de 17 pasos.',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Idiomas WeLearn',
        url: 'https://www.idiomaswl.com',
      },
      hasCourseInstance: courseInstances('Inglés', 'en'),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'COP',
        description: 'Diagnóstico gratis',
      },
    },
    localBusinessNode(
      'Academia de idiomas en Bucaramanga con clases presenciales y online para toda Colombia. Inglés con preparación de IELTS, TOEFL, Cambridge e ICFES, además de otros siete idiomas.'
    ),
    davidNode(
      'Políglota activo en ocho idiomas y co-fundador de WeLearn. El inglés fue el primero que aprendió, y prepararlo hasta nivel de examen es lo que dio origen al método de la academia.'
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
    icon: '🎖️',
    title: 'Cambridge B2 First (FCE)',
    target: 'Grade B–C (160+) · Grade A (180+)',
    desc: 'Certificación reconocida en más de 25,000 organizaciones en 130 países. Válida de por vida. Ideal para trabajo, postgrados y migración al Reino Unido o Australia.',
    waUrl: WA_FCE,
    simulacro: { label: 'Hacer simulacro FCE gratis →', href: '/examenes/cambridge-b2/practica/set-1' },
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
    price: 'Consultar',
    cadence: '',
    desc: 'Simulacros ilimitados, material de preparación, feedback escrito por sección y chat con tutor en menos de 24 horas.',
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
  { label: '20 horas', desc: 'Preparación seria de IELTS o TOEFL al mejor precio por hora disponible.', badge: 'Mejor precio/hora' },
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
              Academia de inglés · Bucaramanga y Colombia
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

      {/* ── FUNDADORES ───────────────────────────────────────────────────── */}
      <FoundersBand
        accent="#1a4fcc"
        title="Dos políglotas te enseñan inglés. No un curso grabado."
        intro="Detrás de cada clase hay dos personas que aprendieron idiomas de verdad — y una de ellas estudió en Inglaterra."
        davidLine="Habla ocho idiomas. El inglés fue el primero, y prepararlo hasta nivel de examen es lo que dio origen al método de 11 pasos que usamos hoy."
        zhannaLine="Estudió en Inglaterra y en Francia. Esa formación dentro del sistema académico británico respalda nuestra preparación de IELTS, TOEFL y Cambridge."
        zhannaTags={['Co-fundadora · Estudió en Inglaterra', 'Preparación IELTS / TOEFL', 'Diseño curricular']}
      />

      {/* ── INTENT SECTION ───────────────────────────────────────────────── */}
      <section className="wlh-section wlh-section--alt">
        <div className="wrap">
          <p className="wlh-section-eyebrow">01 — ¿Para qué necesitas el inglés?</p>
          <h2 className="wlh-section-h2">Cada objetivo, una preparación específica.</h2>
          <p className="wlh-section-desc">
            No todas las clases de inglés son iguales. En Idiomas WeLearn — academia de inglés en Bucaramanga con cobertura nacional online — tu plan de estudio depende de exactamente lo que necesitas lograr.
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
                    Agendar diagnóstico gratis →
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
                    <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#fff', color: 'var(--accent)', fontSize: '0.68rem', fontWeight: 700, padding: '0.18rem 0.75rem', borderRadius: 20, whiteSpace: 'nowrap' }}>
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
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.82rem',
          }}>
            Todos los planes incluyen clase de diagnóstico gratis · Sin permanencia mínima
          </p>
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
        </div>
      </section>

      {/* ── SIMULACRO HOOK ───────────────────────────────────────────────── */}
      {/* ── BUCARAMANGA (SEO LOCAL) ─────────────────────────────────────── */}
      {/* ══════════════ EXÁMENES EN BUCARAMANGA (SEO local + AEO) ══════════════ */}
      <section className="wlh-section">
        <div className="wrap">
          <p className="wlh-section-eyebrow">Dónde se presenta cada examen</p>
          <h2 className="wlh-section-h2">El IELTS sí se presenta en Bucaramanga. El TOEFL iBT no.</h2>
          <p className="wlh-section-desc">
            Es una diferencia que cambia el plan y el presupuesto, y casi nadie la explica antes de
            que la gente pague la inscripción.
          </p>
          <div className={s.grid3} style={{ marginTop: '2.5rem' }}>
            <div className={s.intentCard}>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>IELTS · en la ciudad</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Se aplica en Bucaramanga, en la UNAB, que es la sede avalada por el British Council
                en Santander. La inscripción y el pago se hacen con el British Council, no en la
                universidad. Es el examen más cómodo de presentar desde aquí.
              </p>
            </div>
            <div className={s.intentCard}>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>TOEFL iBT · toca viajar</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                No confirmamos ninguna sede de TOEFL iBT en Bucaramanga. Ojo con una confusión
                frecuente: el TOEFL ITP que se ofrece localmente es un examen distinto, con otros
                usos, y no reemplaza al iBT que piden las universidades del exterior.
              </p>
            </div>
            <div className={s.intentCard}>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>Cambridge e ICFES</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                El Cambridge B2 First entrega un certificado que no caduca. El ICFES es otra cosa:
                mide solo comprensión lectora y su nivel más alto es B1, así que no sirve como
                certificación internacional.
              </p>
            </div>
          </div>
          <p className="wlh-section-desc" style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
            Las sedes, las fechas y los valores cambian cada año. Confirma siempre en la fuente
            oficial del examen antes de inscribirte.
          </p>
        </div>
      </section>

      {/* ══════════════ REQUISITO DE GRADO (SEO local) ══════════════ */}
      <section className="wlh-section wlh-section--alt">
        <div className="wrap">
          <p className="wlh-section-eyebrow">Universidades de Bucaramanga</p>
          <h2 className="wlh-section-h2">¿Qué nivel de inglés te exigen para graduarte?</h2>
          <p className="wlh-section-desc">
            No es el mismo en todas, y la diferencia es grande: hay universidades de la ciudad que
            piden A1 y otras que piden B2. Saber cuál te aplica define cuántos meses necesitas.
          </p>
          <div className={s.grid3} style={{ marginTop: '2.5rem' }}>
            <div className={s.intentCard}>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>El rango va de A1 a B2</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                La UIS pide A1 en pregrado —y sube a A2 en maestría y B1 en doctorado—, mientras
                que la UNAB exige B2. La UPB, la USTA y la UDES se mueven alrededor de B1, y las
                UTS piden B1 en tecnología y B2 en el ciclo profesional.
              </p>
            </div>
            <div className={s.intentCard}>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>Casi todas aceptan certificados externos</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Varias homologan el requisito con un examen internacional en lugar de obligarte a
                cursar todos los niveles. Si ya ibas a presentar el IELTS o el TOEFL, puedes
                resolver dos cosas con un solo examen.
              </p>
            </div>
            <div className={s.intentCard}>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>Verifica tu caso antes de pagar</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Los reglamentos cambian y cada programa tiene sus excepciones. Confirma con tu
                facultad qué nivel te aplica y qué certificados acepta; nosotros armamos el plan
                para llegar ahí en el tiempo que tengas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LocalBand
        accent="#1a4fcc"
        idioma="inglés"
        intro="WeLearn es una academia de idiomas con sede en Bucaramanga. Si estás en la ciudad o en el área metropolitana puedes estudiar inglés presencialmente con nosotros; si prefieres no desplazarte —o vives en otra ciudad— la misma clase, con el mismo tutor y el mismo plan, se hace por videollamada."
        presencial="Clases cara a cara con tutor asignado. Y una ventaja concreta si vas por certificación: el IELTS y el TOEFL sí se aplican en Bucaramanga, así que puedes prepararte y presentarte sin salir de la ciudad."
        waText="Hola, estoy en Bucaramanga y quiero saber sobre las clases de inglés presenciales. ¿Cómo funcionan?"
      />

      {/* ── PRACTICA GRATIS ─────────────────────────────────────────────── */}
      <PracticeBand
        accent="#1a4fcc"
        title="Todo lo que puedes practicar gratis desde hoy"
        sub="Las cinco habilidades de A1 a B2, los simulacros completos de IELTS, TOEFL e ICFES, y el diagnóstico de nivel. Corrección inmediata y sin registro."
        cards={[
          { href: '/practica/ingles/a1/gramatica', title: 'Gramática A1 · A2 · B1 · B2', desc: 'Desde los cimientos hasta estructuras avanzadas, con corrección al instante en los cuatro niveles.' },
          { href: '/practica/ingles/a1/vocabulario', title: 'Vocabulario con audio', desc: 'Palabras de alta frecuencia con audio nativo, organizadas por nivel del Marco Europeo.' },
          { href: '/practica/ingles/b1/escucha', title: 'Comprensión auditiva', desc: 'Audio a velocidad real con preguntas, el formato que evalúan IELTS y TOEFL.' },
          { href: '/practica/ingles/b1/lectura', title: 'Comprensión lectora', desc: 'Textos auténticos con preguntas al estilo del examen, para entrenar lectura rápida y detalle.' },
          { href: '/practica/ingles/b1/escritura', title: 'Escritura integrada', desc: 'Lee, prepara vocabulario y escribe una respuesta real, con modelo de nivel para comparar.' },
          { href: '/practica/ingles/b1/habla', title: 'Expresión oral', desc: 'La sección que más pesa y la que menos se practica sola. Estructuras y pronunciación modelo.' },
          { href: '/examenes/ielts', title: 'Simulacros IELTS', desc: 'Listening, Reading y Writing con formato real e informe de desempeño por sección.' },
          { href: '/examenes/toefl', title: 'Simulacros TOEFL', desc: 'Reading, Listening, Speaking y Writing al estilo del iBT, con retroalimentación.' },
          { href: '/examenes/icfes', title: 'Simulacro ICFES', desc: 'La sección de inglés del Saber 11, con el nivel estimado según la escala del examen.' },
          { href: '/nivel-radar', title: 'Descubre tu nivel real', desc: 'Si no sabes por dónde empezar, el diagnóstico te ubica en el MCER antes de la primera clase.' },
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
            Guías gratuitas de inglés y certificaciones
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {[
              { cat: 'IELTS', title: 'Cómo sacar Band 7 en el IELTS', slug: 'como-sacar-band-7-en-ielts' },
              { cat: 'IELTS', title: 'IELTS Reading: estrategias para alcanzar Band 7', slug: 'ielts-reading-estrategias-para-band-7' },
              { cat: 'IELTS', title: 'IELTS Speaking: cómo preparar las 3 partes', slug: 'ielts-speaking-como-preparar-las-3-partes' },
              { cat: 'TOEFL', title: 'TOEFL iBT: guía completa para colombianos', slug: 'toefl-ibt-preparacion-guia-completa' },
              { cat: 'IELTS', title: 'IELTS vs TOEFL: ¿cuál es mejor para ti?', slug: 'ielts-vs-toefl-cual-tomar-en-colombia' },
              { cat: 'Inglés', title: 'Niveles de inglés A1–C2: qué significa cada uno', slug: 'niveles-de-ingles-a1-a2-b1-b2-c1-c2' },
              { cat: 'Trabajo', title: 'Inglés para empresas multinacionales', slug: 'ingles-para-trabajar-en-empresas-multinacionales' },
              { cat: 'Speaking', title: 'Por qué te bloqueas al hablar inglés y cómo superarlo', slug: 'como-mejorar-el-ingles-hablado' },
              { cat: 'Migración', title: 'IELTS para migrar a Canadá: qué puntaje necesitas por visa', slug: 'migrar-a-canada-requisitos-ielts-ingles' },
              { cat: 'IELTS', title: 'IELTS Listening: los 7 errores más comunes y cómo evitarlos', slug: 'ielts-listening-errores-comunes' },
              { cat: 'IELTS', title: 'Estudiar en Irlanda con IELTS: universidades, costos y puntaje mínimo', slug: 'ielts-para-estudiar-en-irlanda' },
              { cat: 'TOEFL', title: 'TOEFL iBT vs TOEFL Essentials: diferencias y cuál elegir en 2026', slug: 'toefl-ibt-vs-toefl-essentials-cual-elegir-2026' },
              { cat: 'Inglés', title: 'Inglés B2–C1 para trabajo remoto: lo que necesitas para empleadores globales', slug: 'ingles-b2-c1-para-trabajo-remoto-global' },
              { cat: 'Inglés', title: 'Inglés para entrevistas en multinacionales: estructura STAR y frases clave', slug: 'ingles-para-entrevistas-de-trabajo-en-multinacionales' },
              { cat: 'Migración', title: 'Inglés para Express Entry Canadá: CLB, IELTS y cómo maximizar tu CRS', slug: 'ingles-para-canada-express-entry-requisitos-2026' },
              { cat: 'IELTS', title: 'IELTS Academic vs General Training: cuál debes tomar y por qué', slug: 'ielts-academic-vs-general-training-cual-elegir' },
              { cat: 'IELTS', title: 'IELTS de banda 6 a 7: qué cambia y cómo cruzar esa barrera', slug: 'ielts-de-banda-6-a-banda-7-que-cambia' },
              { cat: 'Inglés', title: 'Inglés técnico para programadores: vocabulario, daily meetings y entrevistas', slug: 'ingles-tecnico-para-programadores-y-desarrolladores' },
              { cat: 'IELTS', title: 'IELTS Listening Secciones 3 y 4: estrategias para banda 7+', slug: 'ielts-listening-sections-3-4-estrategias-avanzadas' },
              { cat: 'IELTS', title: 'IELTS Writing Task 2: tipos de ensayo, estructura y errores comunes', slug: 'ielts-writing-task-2-tipos-de-ensayo-y-estructura' },
              { cat: 'TOEFL', title: 'TOEFL iBT 2026: estructura completa, puntajes y estrategia por sección', slug: 'toefl-ibt-estructura-completa-y-estrategia-2026' },
              { cat: 'Inglés', title: 'Inglés para médicos: residencia en Estados Unidos y USMLE', slug: 'ingles-para-residencia-medica-en-estados-unidos' },
              { cat: 'Migración', title: 'Migrar a Nueva Zelanda: requisitos de inglés y tipos de visa 2026', slug: 'migrar-a-nueva-zelanda-ingles-requisitos-visa-2026' },
              { cat: 'IELTS', title: 'IELTS Speaking Parte 2: cómo hablar 2 minutos sobre cualquier tema', slug: 'ielts-speaking-parte-2-cue-card-como-hablar-2-minutos' },
              { cat: 'Inglés', title: 'Inglés para profesionales de salud: médicos, enfermeros y fisioterapeutas', slug: 'ingles-para-profesionales-de-salud-colombia' },
              { cat: 'Migración', title: 'Migrar a España: nivel de inglés que necesitas realmente', slug: 'migrar-a-espana-nivel-ingles-y-espanol-que-necesitas' },
              { cat: 'IELTS', title: 'IELTS vs. Duolingo English Test: diferencias y cuál aceptan las universidades', slug: 'ielts-vs-duolingo-english-test-diferencias' },
              { cat: 'IELTS', title: 'IELTS General Training para migración: diferencias con Academic', slug: 'ielts-general-training-para-migracion-vs-academic' },
              { cat: 'IELTS', title: 'Vocabulario IELTS para banda 7: temas frecuentes y cómo dominarlos', slug: 'ielts-vocabulario-para-banda-7-temas-frecuentes' },
              { cat: 'Inglés', title: 'Inglés para negocios internacionales: negociaciones y contratos', slug: 'ingles-para-negociaciones-y-contratos-internacionales' },
              { cat: 'Migración', title: 'Migrar al Reino Unido 2026: requisitos de inglés por tipo de visa', slug: 'migrar-reino-unido-requisitos-ingles-visa-2026' },
              { cat: 'IELTS', title: 'IELTS Reading: skimming, scanning y técnicas para ahorrar tiempo', slug: 'ielts-reading-skimming-scanning-tecnicas' },
              { cat: 'Inglés', title: 'Inglés jurídico para abogados: contratos, arbitraje y documentos legales', slug: 'ingles-para-abogados-y-profesionales-del-derecho' },
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
        </p>
      </div>
    </>
  );
}
