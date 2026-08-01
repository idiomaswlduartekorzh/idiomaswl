import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FoundersBand from '@/components/hub/FoundersBand';
import LocalBand from '@/components/hub/LocalBand';
import { localBusinessNode, davidNode, zhannaNode, courseInstances } from '@/components/hub/localBusiness';
import s from './page.module.css';

const WA = '573005004253';
const WA_GENERAL = encodeURIComponent('Hola, vi la página de clases de francés en WeLearn y quiero agendar mi clase de diagnóstico gratis.');
const WA_DELF    = encodeURIComponent('Hola, quiero prepararme para el examen DELF con WeLearn. ¿Cuándo puedo empezar?');

export const metadata: Metadata = {
  title: 'Clases de Francés en Bucaramanga y Online — Preparación DELF/DALF | WeLearn',
  description:
    'Academia de francés en Bucaramanga con clases presenciales y online para toda Colombia. Preparación DELF A1–B2 y DALF C1–C2, y TCF/TEF para Canadá. Desde cero hasta C2. Diagnóstico gratis.',
  keywords: [
    'clases de francés Bucaramanga',
    'academia de francés Bucaramanga',
    'curso de francés Bucaramanga',
    'profesor de francés Bucaramanga',
    'clases de francés online Colombia',
    'preparación DELF Colombia',
    'preparación DALF Colombia',
    'TCF Canadá Colombia',
    'francés para migrar a Canadá',
    'curso de francés para adultos',
    'aprender francés desde cero',
    'WeLearn francés',
  ],
  openGraph: {
    title: 'Clases de Francés en Bucaramanga y Online — DELF/DALF | WeLearn',
    description:
      'Presencial en Bucaramanga y online en toda Colombia. Preparación DELF, DALF y TCF/TEF Canadá. Diagnóstico gratis.',
    url: 'https://www.idiomaswl.com/clases-de-frances',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/clases-de-frances' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Necesito saber francés para empezar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Empezamos desde A1 absoluto. La primera sesión cubre pronunciación básica, saludos y la lógica del idioma para hispanohablantes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tan difícil es el francés para colombianos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Más fácil de lo que parece. Compartimos el 80% del vocabulario con el español gracias al latín común. La pronunciación es diferente pero sistemática. Con método, progresas rápido.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Para qué sirve el DELF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El DELF es la certificación oficial de francés del Ministerio de Educación de Francia. Es requerida para estudiar en universidades francesas, obtener visas y demostrar nivel en contextos laborales internacionales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo toma llegar al DELF B2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Partiendo de cero, entre 18 y 24 meses con práctica constante de 3–4 horas semanales. Si ya tienes base (A2), puedes alcanzar B2 en 10–14 meses.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde puedo tomar clases de francés en Bucaramanga?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En Idiomas WeLearn, academia de idiomas con base en Bucaramanga. Atiende presencialmente a estudiantes de Bucaramanga, Floridablanca, Girón y Piedecuesta, y online al resto de Colombia y del mundo. El contacto es por WhatsApp al 300 500 4253 y la primera sesión de diagnóstico es gratuita.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Las clases de francés son presenciales o virtuales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las dos modalidades están disponibles. En Bucaramanga y su área metropolitana las clases pueden ser presenciales; desde cualquier otra ciudad son por videollamada, con el mismo profesor y el mismo plan de estudio. También es posible alternar entre ambos formatos según la semana.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuestan las clases de francés en Bucaramanga?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El precio depende de la intensidad semanal y de si se toman clases sueltas o un paquete de horas, ya que el valor por hora disminuye a mayor volumen. El diagnóstico inicial es gratuito y en él se define objetivo, nivel y frecuencia para dar el precio exacto de cada caso.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El DELF sirve para migrar a Canadá?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Para los trámites migratorios canadienses se aceptan el TEF Canada y el TCF Canada, no el DELF. El DELF y el DALF son diplomas académicos que no caducan y sirven para universidades y para acreditar nivel, pero no reemplazan el examen que exige el proceso migratorio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre DELF, DALF, TCF y TEF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DELF y DALF son diplomas del Ministerio de Educación de Francia: se presentan por nivel, de A1 a C2, y no caducan. TCF y TEF son pruebas de nivel con vigencia limitada, normalmente de dos años, y sus versiones Canada son las que reconocen los procesos migratorios canadienses. El francés que se estudia es el mismo; lo que cambia es el formato de la prueba.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde puedo presentar el DELF o el TCF en Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En los centros autorizados de la Alianza Francesa, presentes en Bogotá, Medellín, Cali y otras ciudades del país. Cada examen tiene su propio calendario de sesiones e inscripción, por lo que conviene confirmar fecha y sede con anticipación.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué nivel de francés necesito para estudiar en Francia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La mayoría de programas universitarios dictados en francés piden nivel B2. Algunos posgrados y programas selectivos piden C1. Si el programa se dicta en inglés, suele bastar un nivel básico de francés para la vida diaria, pero conviene verificarlo con la universidad.',
      },
    },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Francés con el método WeLearn',
      description:
        'Aprende francés desde cero hasta DALF C2 con tutor especializado. Preparación DELF/DALF, conversación, gramática y pronunciación.',
      provider: {
        '@type': 'Organization',
        name: 'Idiomas WeLearn',
        url: 'https://www.idiomaswl.com',
      },
      hasCourseInstance: courseInstances('Francés', 'fr'),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'COP',
        description: 'Clase de diagnóstico gratis',
        availability: 'https://schema.org/InStock',
      },
    },
    localBusinessNode(
      'Academia de idiomas en Bucaramanga con clases presenciales y online para toda Colombia. Francés con preparación DELF, DALF y TCF/TEF, además de inglés, coreano, alemán, italiano y portugués.'
    ),
    davidNode(
      'Políglota activo en ocho idiomas. Aprendió francés después del inglés, el italiano y el portugués, y de ese recorrido nació el método WeLearn de francés para hispanohablantes.'
    ),
    zhannaNode(
      'Co-fundadora y directora académica de WeLearn. Estudió en Francia y en Inglaterra, y lidera el diseño curricular y la preparación de exámenes DELF y DALF.'
    ),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de Francés', item: 'https://www.idiomaswl.com/clases-de-frances' },
      ],
    },
  ],
};

const WHY_CARDS = [
  { icon: '🎯', title: 'Diagnóstico gratis', desc: 'Identificamos tu nivel real, tu objetivo y te diseñamos un plan personalizado desde la primera sesión.' },
  { icon: '🇫🇷', title: 'Tutor especializado', desc: 'Docentes con experiencia en DELF/DALF y en enseñanza de francés a hispanohablantes.' },
  { icon: '📚', title: 'Método estructurado', desc: 'Pronunciación → gramática → vocabulario → producción oral y escrita. Sin saltos, sin relleno.' },
  { icon: '✅', title: 'Preparación DELF/DALF', desc: 'Simulacros, comprensión auditiva, producción escrita y expresión oral. Exactamente lo que evalúa el examen.' },
];

const LEVELS = [
  {
    tag: 'A1 – A2',
    title: 'Fundamentos del francés',
    desc: 'Pronunciación francesa, saludos, presentación, verbos esenciales, números, artículos y géneros. Conversaciones básicas del día a día.',
    time: '4–6 meses',
  },
  {
    tag: 'B1 – B2',
    title: 'Francés funcional',
    desc: 'Conversación fluida, subjuntivo, vocabulario laboral, comprensión de medios franceses. DELF B1/B2 — el nivel más pedido en universidades.',
    time: '8–14 meses',
  },
  {
    tag: 'C1 – C2',
    title: 'Dominio avanzado',
    desc: 'Francés académico, debates, escritura formal y argumentativa. DALF C1/C2 para doctorados, traducción y trabajo internacional.',
    time: '14–24 meses',
  },
];

const DELF_EXAMS = [
  {
    name: 'DELF',
    range: 'Niveles A1 · A2 · B1 · B2',
    desc: "El Diplôme d'Études en Langue Française es la certificación más solicitada para estudio y trabajo en países francófonos. Válido para universidades en Francia, Bélgica, Suiza y Canadá.",
    skills: ['Comprensión oral', 'Comprensión escrita', 'Producción oral', 'Producción escrita'],
  },
  {
    name: 'DALF',
    range: 'Niveles C1 · C2',
    desc: 'El Diplôme Approfondi de Langue Française certifica el dominio avanzado. Requerido para doctorados en Francia, traducción e interpretación profesional.',
    skills: ['Comprensión auditiva', 'Lectura crítica', 'Producción escrita avanzada', 'Expresión oral formal'],
  },
];

const FAQS = [
  {
    q: '¿Necesito saber francés para empezar?',
    a: 'No. Empezamos desde A1 absoluto. La primera sesión cubre pronunciación básica, saludos y la lógica del idioma para hispanohablantes.',
  },
  {
    q: '¿Qué tan difícil es el francés para colombianos?',
    a: 'Más fácil de lo que parece. Compartimos el 80% del vocabulario con el español gracias al latín común. La pronunciación es diferente pero sistemática. Con método, progresas rápido.',
  },
  {
    q: '¿Para qué sirve el DELF?',
    a: 'El DELF es la certificación oficial de francés del Ministerio de Educación de Francia. Es requerida para estudiar en universidades francesas, obtener visas y demostrar nivel en contextos laborales internacionales.',
  },
  {
    q: '¿Cuánto tiempo toma llegar al DELF B2?',
    a: 'Partiendo de cero, entre 18 y 24 meses con práctica constante de 3–4 horas semanales. Si ya tienes base (A2), puedes alcanzar B2 en 10–14 meses.',
  },
  {
    q: '¿Dónde puedo tomar clases de francés en Bucaramanga?',
    a: 'En Idiomas WeLearn, academia con base en Bucaramanga. Atendemos presencialmente a estudiantes de Bucaramanga, Floridablanca, Girón y Piedecuesta, y online al resto de Colombia y del mundo. Escríbenos por WhatsApp al 300 500 4253 y agendamos tu diagnóstico gratis.',
  },
  {
    q: '¿Las clases son presenciales o virtuales?',
    a: 'Las dos. Si estás en Bucaramanga o el área metropolitana puedes estudiar presencialmente; si estás en Bogotá, Medellín, Cali o cualquier otra ciudad, la clase es por videollamada con el mismo profesor y el mismo plan. También puedes alternar entre los dos formatos.',
  },
  {
    q: '¿Cuánto cuestan las clases de francés en Bucaramanga?',
    a: 'Depende de la intensidad y de si tomas clases sueltas o un paquete de horas: el valor por hora baja a mayor volumen. La forma más rápida de tener el precio exacto de tu caso es el diagnóstico gratis, donde definimos objetivo, nivel y frecuencia. Puedes ver los planes vigentes en la página de precios.',
  },
  {
    q: '¿El DELF sirve para migrar a Canadá?',
    a: 'No. Para los trámites migratorios canadienses se aceptan el TEF Canada y el TCF Canada, no el DELF. El DELF y el DALF son diplomas académicos que no caducan y sirven para universidades y para acreditar tu nivel, pero no reemplazan el examen que exige el proceso migratorio.',
  },
  {
    q: '¿Cuál es la diferencia entre DELF, DALF, TCF y TEF?',
    a: 'DELF y DALF son diplomas del Ministerio de Educación de Francia: se presentan por nivel (A1 a C2) y no caducan. TCF y TEF son pruebas de nivel con vigencia limitada, normalmente de dos años, y sus versiones "Canada" son las que reconocen los procesos migratorios canadienses. El francés que estudias es el mismo; cambia el formato de la prueba.',
  },
  {
    q: '¿Dónde puedo presentar el DELF o el TCF en Colombia?',
    a: 'En los centros autorizados de la Alianza Francesa, presentes en Bogotá, Medellín, Cali y otras ciudades del país. Cada examen tiene su propio calendario de sesiones y su inscripción, así que conviene confirmar fecha y sede con anticipación.',
  },
  {
    q: '¿Qué nivel de francés necesito para estudiar en Francia?',
    a: 'La mayoría de programas universitarios en francés piden B2. Algunos posgrados y programas selectivos piden C1. Si el programa se dicta en inglés, suele bastar un nivel básico de francés para la vida diaria, pero conviene verificarlo con la universidad.',
  },
];

const BLOG_POSTS = [
  { cat: 'Francés', color: '#1a2ecc', title: 'DELF y DALF: cuál nivel necesitas según tu objetivo real', slug: 'delf-cual-nivel-necesitas-y-para-que-sirve' },
  { cat: 'Francés', color: '#1a2ecc', title: 'TCF Canadá: el examen de francés para inmigrar a Quebec', slug: 'tcf-canada-frances-para-inmigrar-a-quebec' },
  { cat: 'Francés', color: '#1a2ecc', title: 'Francés para estudiar medicina en Francia o Bélgica: guía completa', slug: 'frances-para-estudiar-medicina-en-francia-belgica' },
  { cat: 'Francés', color: '#1a2ecc', title: 'Francés B2: qué puertas abre en trabajo, universidad y migración', slug: 'frances-b2-para-que-sirve-que-puertas-abre' },
  { cat: 'Francés', color: '#1a2ecc', title: 'Aprender francés siendo adulto desde cero en Colombia: guía realista', slug: 'aprender-frances-adulto-desde-cero-colombia' },
  { cat: 'Método', color: '#7c3aed', title: 'Inmersión en casa: cómo crear un ambiente de idioma sin viajar', slug: 'aprender-idiomas-tecnica-inmersion-en-casa' },
  { cat: 'Francés', color: '#1a2ecc', title: 'Francés para vivir en Canadá: cuándo es más valioso que el inglés', slug: 'frances-para-vivir-en-canada-diferencias-ingles-frances' },
  { cat: 'Francés', color: '#1a2ecc', title: 'DALF C1: qué puertas abre en Francia, Quebec y el mundo francófono', slug: 'frances-dalf-c1-para-universidades-y-trabajo-en-francia' },
];

// WhatsApp SVG icon
const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

export default function ClasesDeFrancesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className={s.page}>

        {/* ══════════════ HERO ══════════════ */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <div className={s.heroPhrase}>Bonjour !</div>
              <p className={s.eyebrow}>Francés en Bucaramanga y online · WeLearn</p>
              <h1 className={s.h1}>
                Aprende francés<br />
                <span className={s.accent}>de verdad.</span>
              </h1>
              <p className={s.heroSub}>
                El francés no es solo pronunciación difícil — es estructura, ritmo y contexto.
                Con el método WeLearn llegas al DELF B2 con una base sólida que no se te olvida.
                <strong> Presencial en Bucaramanga u online desde cualquier ciudad de Colombia.</strong>
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
                <Link href="/examenes/delf-dalf" className={s.ghostBtn}>
                  Ver simulacros DELF →
                </Link>
              </div>
            </div>

            <div className={s.heroVisual}>
              <div className={s.heroCard}>
                <span className={s.heroCardFlag}>🇫🇷</span>
                <p className={s.heroCardTitle}>DELF / DALF</p>
                <p className={s.heroCardSub}>Certificación oficial del Ministerio de Educación de Francia</p>
                <div className={s.levelBadges}>
                  {['A1','A2','B1','B2','C1','C2'].map(l => (
                    <span key={l} className={s.levelBadge}>{l}</span>
                  ))}
                </div>
              </div>
              <div className={s.heroCard}>
                <p className={s.heroCardTitle}>¿Por qué francés?</p>
                <p className={s.heroCardSub}>
                  • 300 millones de hablantes en 5 continentes<br />
                  • Segundo idioma más estudiado del mundo<br />
                  • Requerido para becas Eiffel y universidades francesas<br />
                  • Ventaja competitiva en comercio internacional
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Proof strip ────────────────────────────────────── */}
        <div className={s.proofStrip}>
          <span className={s.proofItem}><strong>Presencial en Bucaramanga</strong> · Sotomayor</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Online</strong> · toda Colombia y el mundo</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Diagnóstico</strong> gratis</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>DELF A1 hasta DALF C2</strong></span>
        </div>

        {/* ══════════════ FUNDADORES ══════════════ */}
        <FoundersBand
          accent="#1a2ecc"
          title="Dos políglotas te enseñan francés. No un curso grabado."
          intro="Detrás de cada clase hay dos personas que aprendieron idiomas de verdad — y una de ellas estudió en Francia."
          davidLine="Habla ocho idiomas. Llegó al francés después del inglés, el italiano y el portugués — y ese recorrido es exactamente el método que hoy usamos con hispanohablantes."
          zhannaLine="Estudió en Francia y en Inglaterra. Esa experiencia académica dentro del sistema francés es la que respalda nuestra preparación DELF y DALF."
          zhannaTags={['Co-fundadora · Estudió en Francia', 'Preparación DELF / DALF', 'Diseño curricular']}
        />

        {/* ══════════════ WHY ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Por qué WeLearn</p>
            <h2 className={s.h2}>No es un curso. Es un método.</h2>
            <p className={s.sectionSub}>
              No vendemos clases sueltas. Diseñamos el camino completo desde tu nivel actual hasta tu objetivo.
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
            <h2 className={s.h2}>Desde cero hasta C2</h2>
            <p className={s.sectionSub}>
              Cada nivel tiene objetivos claros. Sabes exactamente qué aprendes y para qué sirve.
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

        {/* ══════════════ INSTRUCTOR ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <div className={s.instructorRow}>
              <div className={s.instructorPhoto}>
                <div className={s.photoWrap}>
                  <Image
                    src="/images/david-duarte.jpg"
                    alt="José David Duarte Silva — políglota y fundador de WeLearn"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    sizes="(max-width: 680px) 100vw, 220px"
                  />
                </div>
              </div>
              <div className={s.instructorText}>
                <p className={s.sectionEyebrow}>Tu instructor</p>
                <h2 className={s.h2}>David habla 8 idiomas. El francés fue el cuarto.</h2>
                <p className={s.instructorP}>
                  David llegó al francés después del inglés, el italiano y el portugués. Para
                  entonces ya sabía algo que casi nadie te dice: aprender un idioma
                  &ldquo;difícil&rdquo; es cuestión de método, no de talento. El francés comparte
                  raíces con el español, pero su pronunciación y su lógica gramatical exigen un
                  camino estructurado.
                </p>
                <p className={s.instructorP}>
                  Esa experiencia personal es la base del método WeLearn para francés:
                  pronunciación desde el día uno, gramática funcional y preparación DELF/DALF
                  diseñada específicamente para hispanohablantes.
                </p>
                <a
                  href={`https://wa.me/${WA}?text=${WA_GENERAL}`}
                  target="_blank" rel="noopener noreferrer"
                  className={s.waBtnLight}
                >
                  Hablar con David por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ DELF/DALF ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Certificaciones</p>
            <h2 className={s.h2}>DELF y DALF: las certificaciones oficiales</h2>
            <p className={s.sectionSub}>
              Son los únicos diplomas del Ministerio de Educación de Francia. Válidos de por vida, reconocidos en todo el mundo.
            </p>
            <div className={s.delfGrid}>
              {DELF_EXAMS.map(e => (
                <div key={e.name} className={s.delfCard}>
                  <p className={s.delfName}>{e.name}</p>
                  <p className={s.delfRange}>{e.range}</p>
                  <p className={s.delfDesc}>{e.desc}</p>
                  <div className={s.delfSkills}>
                    {e.skills.map(sk => <span key={sk}>{sk}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <a
                href={`https://wa.me/${WA}?text=${WA_DELF}`}
                target="_blank" rel="noopener noreferrer"
                className={s.waBtnLight}
              >
                <WaIcon />
                Preparar mi DELF ahora →
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════ BUCARAMANGA (SEO LOCAL) ══════════════ */}
        <LocalBand
          accent="#1a2ecc"
          idioma="francés"
          intro="WeLearn es una academia de idiomas con sede en Bucaramanga. Si estás en la ciudad o en el área metropolitana puedes estudiar francés presencialmente con nosotros; si prefieres no desplazarte —o vives en otra ciudad— la misma clase, con el mismo profesor y el mismo plan, se hace por videollamada."
          presencial="Clases cara a cara para quienes rinden más con el profesor al lado. Ideal si vas a presentar el DELF y quieres entrenar la expresión oral sin la barrera de la pantalla."
          waText="Hola, estoy en Bucaramanga y quiero saber sobre las clases de francés presenciales. ¿Cómo funcionan?"
        />

        {/* ══════════════ CANADÁ (SEO/AEO) ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Francés para migrar</p>
            <h2 className={s.h2}>¿El DELF sirve para migrar a Canadá?</h2>
            <p className={s.sectionSub}>
              No. Es el error más caro y más común: mucha gente estudia y presenta el DELF pensando
              que le sirve para su proceso migratorio, y no es el examen que aceptan las
              autoridades canadienses. Para inmigración necesitas <strong>TEF Canada</strong> o
              <strong> TCF Canada</strong>; para Quebec, la variante que exija el programa.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>DELF / DALF</span>
                <p className={s.levelTitle}>Para estudiar y certificar</p>
                <p className={s.levelDesc}>
                  Diploma oficial del Ministerio de Educación de Francia. No caduca. Es el que
                  piden universidades francesas y el que sirve para acreditar tu nivel ante
                  empleadores. No es el examen de los trámites migratorios canadienses.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>TEF / TCF</span>
                <p className={s.levelTitle}>Para inmigración a Canadá</p>
                <p className={s.levelDesc}>
                  Son pruebas de nivel con vigencia limitada — típicamente dos años — y son las
                  versiones &ldquo;Canada&rdquo; las que reconocen los procesos migratorios. Tu resultado se
                  traduce a niveles NCLC, que es lo que suma puntos.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Qué hacemos</span>
                <p className={s.levelTitle}>Un solo camino, dos salidas</p>
                <p className={s.levelDesc}>
                  El francés que necesitas es el mismo; lo que cambia es el formato de la prueba.
                  Te llevamos al nivel y después entrenamos el examen concreto que tu trámite
                  exige, sin que estudies dos veces.
                </p>
              </div>
            </div>
            <p className={s.sectionSub} style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
              Los requisitos migratorios cambian con frecuencia. Confirma siempre el examen y el
              nivel exacto en la fuente oficial del programa al que apliques antes de inscribirte.
            </p>
          </div>
        </section>

        {/* ══════════════ PRACTICA GRATIS ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Práctica gratuita</p>
            <h2 className={s.h2}>Todo lo que puedes practicar gratis desde hoy</h2>
            <p className={s.sectionSub}>
              No tienes que esperar a matricularte. Las cinco habilidades, los simulacros del
              DELF y el diagnóstico de nivel están abiertos, con corrección inmediata y sin
              registro.
            </p>
            <div className={s.practicaGrid}>
              <Link href="/practica/frances/a1/gramatica" className={s.practicaCard}>
                <span className={s.practicaBadge}>Gratis</span>
                <p className={s.practicaTitle}>Gramática A1 · A2 · B1</p>
                <p className={s.practicaDesc}>Artículos, género, verbos, tiempos y subjuntivo. Ejercicios interactivos con corrección al instante en los tres niveles.</p>
              </Link>
              <Link href="/practica/frances/a1/vocabulario" className={s.practicaCard}>
                <span className={s.practicaBadge}>Gratis</span>
                <p className={s.practicaTitle}>Vocabulario con audio</p>
                <p className={s.practicaDesc}>Palabras de alta frecuencia con audio nativo. El francés que realmente se usa, no el de los libros.</p>
              </Link>
              <Link href="/practica/frances/a1/escucha" className={s.practicaCard}>
                <span className={s.practicaBadge}>Gratis</span>
                <p className={s.practicaTitle}>Comprensión auditiva</p>
                <p className={s.practicaDesc}>Audio a velocidad real con preguntas de comprensión — lo que más cuesta al pasar del español al francés.</p>
              </Link>
              <Link href="/practica/frances/a1/lectura" className={s.practicaCard}>
                <span className={s.practicaBadge}>Gratis</span>
                <p className={s.practicaTitle}>Comprensión lectora</p>
                <p className={s.practicaDesc}>Textos auténticos con preguntas al estilo del DELF, para entrenar lectura rápida y detalle.</p>
              </Link>
              <Link href="/practica/frances/a1/escritura" className={s.practicaCard}>
                <span className={s.practicaBadge}>Gratis</span>
                <p className={s.practicaTitle}>Escritura integrada</p>
                <p className={s.practicaDesc}>Lee, prepara vocabulario y escribe una respuesta real — con modelo de nivel para comparar la tuya.</p>
              </Link>
              <Link href="/practica/frances/a1/habla" className={s.practicaCard}>
                <span className={s.practicaBadge}>Gratis</span>
                <p className={s.practicaTitle}>Expresión oral</p>
                <p className={s.practicaDesc}>Frases y estructuras para hablar desde el primer día, con pronunciación modelo para imitar.</p>
              </Link>
              <Link href="/examenes/delf-dalf" className={s.practicaCard}>
                <span className={s.practicaBadge}>Gratis</span>
                <p className={s.practicaTitle}>Simulacros DELF / DALF</p>
                <p className={s.practicaDesc}>Practica con el formato real del examen y recibe un informe con tu desempeño por sección.</p>
              </Link>
              <Link href="/nivel-radar" className={s.practicaCard}>
                <span className={s.practicaBadge}>Gratis</span>
                <p className={s.practicaTitle}>Descubre tu nivel real</p>
                <p className={s.practicaDesc}>Si no sabes por dónde empezar, el diagnóstico de nivel te ubica en el MCER antes de la primera clase.</p>
              </Link>
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
            <p className={s.ctaPhrase}>C'est parti !</p>
            <h2 className={s.ctaTitle}>
              Tu diagnóstico de francés<br />
              <span className={s.accent}>es gratis.</span>
            </h2>
            <p className={s.ctaSub}>
              Diagnosticamos tu nivel, definimos tu objetivo y te mostramos exactamente cómo llegar al DELF que necesitas.
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
