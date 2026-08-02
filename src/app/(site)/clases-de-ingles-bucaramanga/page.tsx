import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FoundersBand from '@/components/hub/FoundersBand';
import PracticeBand from '@/components/hub/PracticeBand';
import { localBusinessNode, davidNode, zhannaNode, courseInstances } from '@/components/hub/localBusiness';

// ── WhatsApp ─────────────────────────────────────────────────────────────────
const WA = '573005004253';
const wa = (msg: string) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const WA_GENERAL  = wa('Hola, vi su página de clases de inglés en Bucaramanga y quiero agendar mi clase de diagnóstico gratis.');
const WA_IELTS    = wa('Hola, necesito preparación para el IELTS en Bucaramanga. ¿Cómo funciona la clase diagnóstico?');
const WA_TOEFL    = wa('Hola, necesito preparación para el TOEFL iBT. ¿Cómo puedo agendar mi diagnóstico gratis?');
const WA_PAQUETE  = wa('Hola, me interesa un paquete de horas de inglés con WeLearn. ¿Qué opciones tienen?');

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // Search Console (18-29 jul 2026): lo que la gente teclea es «cursos de ingles en
  // bucaramanga presenciales» y «cursos de ingles bucaramanga presencial». El title
  // anterior no contenía ni «cursos» ni «presenciales».
  title: 'Cursos de inglés en Bucaramanga presenciales y online — Academia WeLearn',
  description:
    'Academia de inglés con sede física en Bucaramanga, barrio Sotomayor: cursos presenciales y también online. Preparación para IELTS, TOEFL e ICFES con tutor asignado. Diagnóstico de nivel gratis.',
  keywords: [
    'cursos de inglés en Bucaramanga presenciales', 'clases de inglés presenciales Bucaramanga',
    'clases de inglés en Bucaramanga', 'academia de inglés Bucaramanga',
    'inglés Bucaramanga', 'curso de inglés Bucaramanga', 'IELTS Bucaramanga',
    'TOEFL Bucaramanga', 'preparación IELTS Bucaramanga', 'inglés online Bucaramanga',
    'clases inglés Santander Colombia', 'paquetes de inglés Bucaramanga',
  ],
  alternates: { canonical: 'https://www.idiomaswl.com/clases-de-ingles-bucaramanga' },
  openGraph: {
    title: 'Cursos de inglés en Bucaramanga, presenciales y online — WeLearn',
    description: 'Sede física en el barrio Sotomayor. Cursos presenciales en Bucaramanga y también online. Preparación IELTS, TOEFL e ICFES. Diagnóstico gratis.',
    url: 'https://www.idiomaswl.com/clases-de-ingles-bucaramanga',
  },
};

// ── JSON-LD ───────────────────────────────────────────────────────────────────
const buildJsonLd = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    localBusinessNode(
      'Academia de inglés en Bucaramanga con clases presenciales en la sede de Sotomayor y online para toda Colombia. Preparación de IELTS, TOEFL, Cambridge e ICFES, además de otros siete idiomas.'
    ),
    davidNode(
      'Políglota activo en ocho idiomas y co-fundador de WeLearn. El inglés fue el primero que aprendió, y prepararlo hasta nivel de examen dio origen al método de la academia.'
    ),
    zhannaNode(
      'Co-fundadora y directora académica de WeLearn. Estudió en Inglaterra y en Francia, y lidera el diseño curricular y la preparación de IELTS, TOEFL y Cambridge.',
      ['en', 'es', 'fr', 'ru']
    ),
    faqPageNode(),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de Inglés', item: 'https://www.idiomaswl.com/clases-de-ingles' },
        { '@type': 'ListItem', position: 3, name: 'Clases de Inglés en Bucaramanga', item: 'https://www.idiomaswl.com/clases-de-ingles-bucaramanga' },
      ],
    },
  ],
});

// ── Data ──────────────────────────────────────────────────────────────────────
const PAQUETES = [
  {
    label: '4 horas',
    desc: 'Ideal para reforzar un tema específico o hacer una prueba antes de comprometerte.',
    badge: null,
    highlight: false,
  },
  {
    label: '10 horas',
    desc: 'El más popular. Cubre una unidad completa de preparación con mejor precio por hora.',
    badge: 'Más popular',
    highlight: true,
  },
  {
    label: '20 horas',
    desc: 'Mejor precio por hora. Para preparación seria de IELTS, TOEFL o nivel completo.',
    badge: 'Mejor precio/hora',
    highlight: false,
  },
];

const RESULTADOS = [
  { name: 'Leonardo Pinto', ciudad: 'Bucaramanga', logro: 'Work & Travel USA', quote: 'Estudié inglés en WeLearn para prepararme e ir a trabajar en USA y me fue de maravilla. Volveré para presentar el TOEFL.' },
  { name: 'Carlos Torres', ciudad: 'Bucaramanga', logro: 'TOEFL — Maestría', quote: 'Realmente les agradezco a ustedes dos por toda la ayuda, el master dura 2 años pero mi profesor quiere que haga otro curso cuando me gradúe.' },
  { name: 'Karen Ayala', ciudad: 'Bucaramanga', logro: 'Goethe — Alemán B2', quote: 'David te he recomendado como con 15 personas sin decir mentiras, espero que les salga todo suuuper biennn.' },
];

const FAQS_LOCAL = [
  {
    q: '¿Hay clases presenciales de inglés en Bucaramanga con WeLearn?',
    a: 'Las dos. Tenemos sede en la Calle 47 # 29-33, barrio Sotomayor, donde las clases pueden ser presenciales para Bucaramanga, Floridablanca, Girón y Piedecuesta. Si prefieres no desplazarte, o vives en otra ciudad, la misma clase se hace por videollamada con el mismo tutor y el mismo plan. También puedes alternar entre los dos formatos.',
  },
  {
    q: '¿Cuánto cuestan las clases de inglés en Bucaramanga?',
    a: 'Depende de la intensidad semanal y de si tomas clases sueltas o un paquete de horas, porque el valor por hora baja a mayor volumen. El diagnóstico inicial es gratis y ahí definimos objetivo, nivel y frecuencia para darte el precio exacto de tu caso. Escríbenos al 300 500 4253.',
  },
  {
    q: '¿WeLearn prepara para IELTS y TOEFL desde Bucaramanga?',
    a: 'Sí. Tenemos ruta específica para IELTS Academic, IELTS General y TOEFL iBT. Nuestros estudiantes en Bucaramanga han alcanzado Band 7.0+ en IELTS y más de 90 puntos en TOEFL.',
  },
  {
    q: '¿Tienen paquetes de horas con descuento?',
    a: 'Sí. Paquetes de 4, 10 y 20 horas con precio por hora decreciente. Sin compromiso mensual. Escríbenos por WhatsApp para ver las opciones actuales.',
  },
  {
    q: '¿Puedo tomar clases si vivo en Floridablanca, Girón o Piedecuesta?',
    a: 'Sí. Todas las clases son online por videollamada. Atendemos todo el área metropolitana de Bucaramanga y cualquier ciudad de Colombia.',
  },
  {
    q: '¿Qué diferencia a WeLearn de otras academias de inglés en Bucaramanga?',
    a: 'Directora académica con doctorado + profesor políglota en 8 idiomas + método propio de 17 pasos. No hacemos grupos masivos — cada estudiante tiene plan individual. Somos especialistas en exámenes internacionales: IELTS, TOEFL, ICFES.',
  },
];

/**
 * FAQPage derivado del MISMO arreglo que se pinta en pantalla.
 *
 * Antes estaba escrito a mano, aparte, y ya había divergido: el marcado decía
 * «¿Hay clases de inglés presenciales...» y lo visible «¿Hay clases presenciales
 * de inglés...». Esa diferencia entre lo que ve Google y lo que ve la persona es
 * justo lo que se penaliza. Ahora una pregunta se escribe una sola vez.
 */
function faqPageNode() {
  return {
    '@type': 'FAQPage',
    mainEntity: FAQS_LOCAL.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ClasesInglessBucaramangaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', paddingTop: '3.5rem', paddingBottom: '3rem' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>

            {/* Copy */}
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>
                Academia de inglés · Bucaramanga y Área Metropolitana
              </p>
              <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1.25rem' }}>
                Cursos de inglés<br />
                en Bucaramanga,<br />
                <span style={{ color: 'var(--accent)' }}>presenciales u online.</span>
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '0.75rem', maxWidth: 440 }}>
                Tenemos <strong style={{ color: 'var(--ink)' }}>sede física en el barrio Sotomayor</strong>, Calle 47 # 29-33.
                Ven presencialmente, toma las clases online, o combina las dos según te cuadre la semana.
                Atendemos Bucaramanga, Floridablanca, Girón y Piedecuesta.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '2rem', maxWidth: 440 }}>
                Preparación para IELTS, TOEFL e ICFES con tutor asignado y método propio de 17 pasos.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <a
                  href={WA_GENERAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1rem', padding: '0.85rem 2rem', borderRadius: 12, textDecoration: 'none' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Diagnóstico gratis
                </a>
                <a href={WA_PAQUETE} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>
                  Ver paquetes →
                </a>
              </div>
            </div>

            {/* Photo */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 340, height: 420, borderRadius: 20, overflow: 'hidden', background: 'var(--bg-2)', boxShadow: '0 24px 64px rgba(20,33,92,0.14)' }}>
                <Image
                  src="/images/david-duarte.jpg"
                  alt="José David Duarte Silva — Políglota en 8 idiomas, co-fundador de Idiomas WeLearn Bucaramanga"
                  fill
                  sizes="(max-width: 640px) 90vw, 340px"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROOF STRIP ──────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--ink-bg)', padding: '0.9rem 0' }}>
        <div className="wrap">
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
            <li>✓ Academia en Bucaramanga</li>
            <li>✓ Clases online toda Colombia</li>
            <li>✓ IELTS Band 7.0+</li>
            <li>✓ TOEFL 90+ puntos</li>
            <li>✓ 500+ estudiantes preparados</li>
            <li>✓ Paquetes de horas con descuento</li>
          </ul>
        </div>
      </div>

      {/* ── POR QUÉ WELEARN ──────────────────────────────────────────────── */}
      {/* ── FUNDADORES ──────────────────────────────────────────────────── */}
      <FoundersBand
        accent="#1a4fcc"
        title="Dos políglotas te enseñan inglés, aquí en Bucaramanga."
        intro="No es una franquicia ni un marketplace de tutores: los fundadores siguen dando clase y diseñando el contenido."
        davidLine="Habla ocho idiomas. El inglés fue el primero, y llevarlo hasta nivel de examen es lo que dio origen al método de once pasos que usamos hoy."
        zhannaLine="Estudió en Inglaterra y en Francia. Esa formación dentro del sistema académico británico respalda nuestra preparación de IELTS, TOEFL y Cambridge."
        zhannaTags={['Co-fundadora · Estudió en Inglaterra', 'Preparación IELTS / TOEFL', 'Diseño curricular']}
      />

      {/* ── PRACTICA GRATIS ─────────────────────────────────────────────── */}
      <PracticeBand
        accent="#1a4fcc"
        title="Practica gratis antes de venir a la primera clase"
        sub="Las cinco habilidades de A1 a B2, los simulacros completos de IELTS, TOEFL e ICFES y el diagnóstico de nivel. Sin registro."
        cards={[
          { href: '/practica/ingles/a1/gramatica', title: 'Gramática A1 a B2', desc: 'Desde los cimientos hasta estructuras avanzadas, con corrección al instante en los cuatro niveles.' },
          { href: '/practica/ingles/a1/vocabulario', title: 'Vocabulario con audio', desc: 'Palabras de alta frecuencia con audio nativo, organizadas por nivel del Marco Europeo.' },
          { href: '/practica/ingles/b1/escucha', title: 'Comprensión auditiva', desc: 'Audio a velocidad real con preguntas, el formato que evalúan IELTS y TOEFL.' },
          { href: '/practica/ingles/b1/habla', title: 'Expresión oral', desc: 'La sección que más pesa y la que menos se practica sola. Estructuras y pronunciación modelo.' },
          { href: '/examenes/ielts', title: 'Simulacros IELTS', desc: 'Listening, Reading y Writing con formato real e informe por sección.' },
          { href: '/examenes/toefl', title: 'Simulacros TOEFL', desc: 'Reading, Listening, Speaking y Writing al estilo del iBT.' },
          { href: '/examenes/icfes', title: 'Simulacro ICFES', desc: 'La sección de inglés del Saber 11, con tu nivel estimado según la escala del examen.' },
          { href: '/nivel-radar', title: 'Descubre tu nivel real', desc: 'El diagnóstico te ubica en el MCER antes de que agendes la primera clase.' },
        ]}
      />

      <section className="wlh-section wlh-section--alt">
        <div className="wrap">
          <p className="wlh-section-eyebrow">01 — Por qué WeLearn en Bucaramanga</p>
          <h2 className="wlh-section-h2">No somos una app. Somos una academia de verdad.</h2>
          <p className="wlh-section-desc" style={{ maxWidth: 580 }}>
            En Bucaramanga hay varias opciones para aprender inglés — grupos masivos, plataformas online genéricas, profesores particulares sin método.
            WeLearn es diferente: plan individual, tutor asignado y el único método en Colombia con directora académica con doctorado.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '3rem' }}>
            {[
              { num: '01', title: 'Método de 17 pasos', desc: 'Diseñado específicamente para hispanohablantes. Cada clase sigue un ciclo estructurado: vocabulario, gramática, escucha, producción oral y revisión. Nada improvisado.' },
              { num: '02', title: 'Directora académica con doctorado', desc: 'Zhanna Korzh diseña el currículo y controla la calidad de todos los cursos. Rigor académico real, con años de experiencia en preparación de exámenes internacionales.' },
              { num: '03', title: 'Políglota en 8 idiomas', desc: 'David habla inglés, coreano, ruso, alemán y más. Conoce exactamente los errores que comete un hispanohablante — y cómo corregirlos más rápido.' },
            ].map(p => (
              <div key={p.num} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 800, fontSize: '1.75rem', color: 'var(--accent)', lineHeight: 1, minWidth: 44 }}>{p.num}</span>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OBJETIVOS ────────────────────────────────────────────────────── */}
      <section className="wlh-section">
        <div className="wrap">
          <p className="wlh-section-eyebrow">02 — ¿Para qué necesitas el inglés?</p>
          <h2 className="wlh-section-h2">Cada objetivo, un plan específico.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginTop: '2.5rem' }}>
            {[
              { icon: '🎓', title: 'Preparación IELTS', sub: 'Band 6.5 – 8.0', desc: 'Para estudiar en el exterior, migrar a Canadá, Australia, Reino Unido o trabajar en empresas internacionales. Academic y General Training.', waUrl: WA_IELTS },
              { icon: '🏛️', title: 'Preparación TOEFL', sub: '90 – 110 puntos', desc: 'Para universidades en EE.UU., Canadá y Europa. Estrategias para las cuatro secciones del iBT con práctica real de escritura y speaking.', waUrl: WA_TOEFL },
              { icon: '📚', title: 'ICFES Saber 11', sub: 'Nivel B2 – C1', desc: 'Para subir el puntaje de inglés en las pruebas de Estado. Plan específico para el componente de inglés del ICFES.', waUrl: WA_GENERAL },
              { icon: '💼', title: 'Inglés laboral y conversacional', sub: 'Fluidez real', desc: 'Para comunicarte en el trabajo, entrevistas en multinacionales, trabajo remoto o mudarte al exterior. Corrección real de errores.', waUrl: WA_GENERAL },
            ].map(item => (
              <div key={item.title} style={{ background: 'var(--surface)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.3rem' }}>{item.title}</h3>
                  <span style={{ display: 'inline-block', fontSize: '0.75rem', background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)', padding: '0.2rem 0.65rem', borderRadius: 20, fontWeight: 700 }}>{item.sub}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6, flexGrow: 1 }}>{item.desc}</p>
                <a href={item.waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '0.85rem', padding: '0.6rem 1rem', borderRadius: 10, textDecoration: 'none' }}>
                  Agendar diagnóstico gratis →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRECIOS + PAQUETES ───────────────────────────────────────────── */}
      <section className="wlh-section wlh-section--dark">
        <div className="wrap">
          <p className="wlh-section-eyebrow wlh-section-eyebrow--light">03 — Precios en Bucaramanga</p>
          <h2 className="wlh-section-h2 wlh-section-h2--light">
            Planes mensuales y paquetes de horas.
          </h2>
          <p className="wlh-section-desc wlh-section-desc--light" style={{ maxWidth: 520 }}>
            Elige la modalidad que más se adapta a tu presupuesto y ritmo. Sin tarjeta de crédito ni permanencia mínima.
          </p>

          {/* Planes mensuales */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginTop: '2.5rem' }}>
            {[
              {
                name: 'Diagnóstico',
                price: 'Gratis',
                cadence: '',
                desc: 'Evaluamos tu nivel, identificamos tu objetivo y te damos un plan. 45 minutos. Sin costo ni compromiso.',
                cta: 'Agendar ahora',
                url: WA_GENERAL,
                featured: false,
              },
              {
                name: 'Plan Preparación',
                price: 'Consultar',
                cadence: '/ mes',
                desc: 'Simulacros ilimitados + feedback escrito por sección + chat con tutor. Sin sesiones en vivo.',
                cta: 'Consultar por WhatsApp',
                url: WA_GENERAL,
                featured: true,
              },
              {
                name: 'Plan Intensivo',
                price: 'Consultar',
                cadence: '/ mes',
                desc: '2 a 4 sesiones en vivo por semana + tutor asignado + plan personalizado + evaluación mensual.',
                cta: 'Reservar cupo',
                url: WA_GENERAL,
                featured: false,
              },
            ].map(plan => (
              <div key={plan.name} style={{ background: plan.featured ? 'var(--accent)' : 'rgba(255,255,255,0.06)', border: `1px solid ${plan.featured ? 'var(--accent)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 16, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                {plan.featured && (
                  <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#fff', color: 'var(--accent)', fontSize: '0.72rem', fontWeight: 700, padding: '0.22rem 0.9rem', borderRadius: 20, whiteSpace: 'nowrap' }}>
                    Más popular
                  </span>
                )}
                <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.5rem', color: '#fff' }}>{plan.price}</span>
                  {plan.cadence && <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>{plan.cadence}</span>}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, flexGrow: 1 }}>{plan.desc}</p>
                <a href={plan.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '0.65rem 1.25rem', borderRadius: 10, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', background: plan.featured ? '#fff' : 'rgba(255,255,255,0.12)', color: plan.featured ? 'var(--accent)' : '#fff' }}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Paquetes de horas */}
          <div style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: '0.4rem' }}>
              ¿Prefieres pagar por horas sin compromiso mensual?
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', marginBottom: '1.75rem' }}>
              Tenemos paquetes prepago con precio por hora más bajo mientras más horas compras.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {PAQUETES.map(pkg => (
                <div key={pkg.label} style={{ background: pkg.highlight ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)', border: `1px solid ${pkg.highlight ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 14, padding: '1.25rem', position: 'relative' }}>
                  {pkg.badge && (
                    <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#fff', color: 'var(--accent)', fontSize: '0.68rem', fontWeight: 700, padding: '0.18rem 0.75rem', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {pkg.badge}
                    </span>
                  )}
                  <p style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '0.4rem' }}>
                    Paquete {pkg.label}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, marginBottom: '1rem' }}>{pkg.desc}</p>
                  <a href={WA_PAQUETE} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, fontSize: '0.82rem', padding: '0.5rem', borderRadius: 8, textDecoration: 'none' }}>
                    Consultar precio →
                  </a>
                </div>
              ))}
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.75rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
            Todos los planes incluyen clase de diagnóstico gratis · Sin permanencia mínima · Cancela cuando quieras
          </p>
        </div>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────────────────────── */}
      <section className="wlh-section">
        <div className="wrap">
          <p className="wlh-section-eyebrow">04 — Resultados reales</p>
          <h2 className="wlh-section-h2">Estudiantes de Bucaramanga que lo lograron.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginTop: '2.5rem' }}>
            {RESULTADOS.map(t => (
              <div key={t.name} style={{ background: 'var(--surface)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '1.5rem' }}>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--ink)', marginBottom: '1.25rem' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem', flexShrink: 0 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--ink)' }}>{t.name} · {t.ciudad}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 700 }}>{t.logro}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ LOCAL ────────────────────────────────────────────────────── */}
      <section className="wlh-section wlh-section--alt">
        <div className="wrap" style={{ maxWidth: 720, margin: '0 auto' }}>
          <p className="wlh-section-eyebrow">05 — Preguntas frecuentes</p>
          <h2 className="wlh-section-h2">Clases de inglés en Bucaramanga — FAQ</h2>
          <div style={{ marginTop: '2rem' }}>
            {FAQS_LOCAL.map((f, i) => (
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

      {/* ── SIMULACROS ───────────────────────────────────────────────────── */}
      <section className="wlh-section">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p className="wlh-section-eyebrow">06 — Practica gratis ahora</p>
          <h2 className="wlh-section-h2">¿Quieres medir tu nivel antes de empezar?</h2>
          <p className="wlh-section-desc" style={{ maxWidth: 480, margin: '0 auto 2.5rem' }}>
            Haz un simulacro gratis de IELTS, TOEFL o ICFES. Sin registro. Sin costo.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/examenes/ielts" className="btn">Simulacro IELTS →</Link>
            <Link href="/examenes/toefl" className="btn btn-ghost">Simulacro TOEFL →</Link>
            <Link href="/examenes/icfes" className="btn btn-ghost">Simulacro ICFES →</Link>
          </div>
        </div>
      </section>

      {/* ── BLOG LOCAL ──────────────────────────────────────────────────── */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-2, #f9f9fb)' }}>
        <div className="wrap">
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem' }}>
            Del blog WeLearn
          </p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 1.5rem' }}>
            Guías de inglés para estudiantes de Bucaramanga
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {[
              { cat: 'Local', title: 'Academias de inglés en Bucaramanga: comparativa 2026 y cómo elegir', slug: 'academias-de-ingles-en-bucaramanga-comparativa-2026' },
              { cat: 'Local', title: '¿Cuánto cuesta aprender inglés en Bucaramanga en 2026?', slug: 'cuanto-cuesta-aprender-ingles-en-bucaramanga-2026' },
              { cat: 'Local', title: 'Inglés presencial vs online en Bucaramanga: guía 2026', slug: 'clases-de-ingles-presenciales-vs-online-bucaramanga' },
              { cat: 'IELTS', title: 'IELTS en Bucaramanga: centros de examen y cómo registrarse', slug: 'ielts-bucaramanga-centros-de-examen-y-registro' },
              { cat: 'IELTS', title: 'Cómo sacar Band 7 en el IELTS desde Bucaramanga', slug: 'como-sacar-band-7-en-ielts' },
              { cat: 'TOEFL', title: 'TOEFL iBT en Bucaramanga: centros autorizados y puntajes', slug: 'toefl-ibt-estructura-completa-y-estrategia-2026' },
            ].map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`} style={{ display: 'block', padding: '1rem 1.1rem', borderRadius: 10, border: '1px solid var(--line-soft)', background: 'var(--bg)', textDecoration: 'none' }}>
                <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1a4fcc', background: 'rgba(26,79,204,0.1)', padding: '2px 8px', borderRadius: 100, marginBottom: '0.55rem' }}>{a.cat}</span>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4, color: 'var(--ink)', margin: 0 }}>{a.title} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="wlh-section">
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <p className="wlh-section-eyebrow">Empieza en Bucaramanga</p>
          <h2 className="wlh-section-h2">
            Tu diagnóstico es gratis.<br />Empezamos esta semana.
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            45 minutos por videollamada. Evaluamos tu nivel, encontramos tu objetivo
            y te damos el plan más eficiente. Sin compromisos.
          </p>
          <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1rem', padding: '0.9rem 2.25rem', borderRadius: 12, textDecoration: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Agendar por WhatsApp
          </a>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
            Respuesta en menos de 2 horas · Lunes–Sábado 7 am–8 pm
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
            ¿Quieres ver todos los idiomas? →{' '}
            <Link href="/clases-de-ingles" style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Clases de inglés
            </Link>
          </p>
        </div>
      </section>

      {/* ── FOOTER MINI ──────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--ink-bg)', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textAlign: 'center', padding: '1.25rem' }}>
        <p>
          © 2026 Idiomas WeLearn ·{' '}
          <Link href="/" style={{ color: 'rgba(255,255,255,0.55)' }}>Inicio</Link> ·{' '}
          <Link href="/clases-de-ingles" style={{ color: 'rgba(255,255,255,0.55)' }}>Clases de Inglés</Link> ·{' '}
          <Link href="/examenes/ielts" style={{ color: 'rgba(255,255,255,0.55)' }}>IELTS</Link> ·{' '}
          <Link href="/examenes/toefl" style={{ color: 'rgba(255,255,255,0.55)' }}>TOEFL</Link> ·{' '}
        </p>
      </div>
    </>
  );
}
