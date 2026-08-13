import type { Metadata } from 'next';
import Link from 'next/link';
import FoundersBand from '@/components/hub/FoundersBand';
import LocalBand from '@/components/hub/LocalBand';
import { localBusinessNode, davidNode, zhannaNode, courseInstances } from '@/components/hub/localBusiness';
import PracticeBand from '@/components/hub/PracticeBand';
import s from './page.module.css';

const WA = '573005004253';
const WA_GENERAL = encodeURIComponent('Hola, vi la página de clases de alemán en WeLearn y quiero agendar mi clase de diagnóstico gratis.');
const WA_GOETHE  = encodeURIComponent('Hola, quiero prepararme para el examen Goethe con WeLearn. ¿Cuándo puedo empezar?');

export const metadata: Metadata = {
  title: 'Clases de alemán en Bucaramanga y online — Goethe A1–C1',
  description:
    'Academia de alemán en Bucaramanga y online. Preparación Goethe A1–C1 y las rutas reales: Ausbildung, enfermería y Chancenkarte. Diagnóstico gratis.',
  keywords: [
    'clases de alemán Bucaramanga',
    'curso de alemán Bucaramanga',
    'academia de alemán Bucaramanga',
    'nivel de alemán para Ausbildung',
    'curso de alemán para enfermeras',
    'Chancenkarte Colombia',
    'examen Goethe Colombia',
    'preparación Goethe-Zertifikat',
    'clases de alemán online Colombia',
    'aprender alemán desde cero',
    'alemán para trabajar en Alemania',
    'WeLearn alemán',
  ],
  openGraph: {
    title: 'Clases de Alemán en Bucaramanga y Online — Goethe y Ausbildung',
    description:
      'Presencial en Bucaramanga y online en toda Colombia. Las rutas reales: Ausbildung, enfermería, Chancenkarte y visa familiar. Diagnóstico gratis.',
    url: 'https://www.idiomaswl.com/clases-de-aleman',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/clases-de-aleman' },
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
        url: 'https://www.idiomaswl.com',
      },
      hasCourseInstance: courseInstances('Alemán', 'de'),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'COP',
        description: 'Clase de diagnóstico gratis',
        availability: 'https://schema.org/InStock',
      },
    },
    localBusinessNode(
      'Academia de idiomas en Bucaramanga con clases presenciales y online para toda Colombia. Alemán con preparación del Goethe-Zertifikat, además de inglés, francés, italiano, portugués, coreano y ruso.'
    ),
    davidNode(
      'Políglota activo en ocho idiomas y co-fundador de WeLearn. El alemán es de los que más le costó, y por eso es el que mejor sabe desarmar para un hispanohablante.'
    ),
    zhannaNode(
      'Co-fundadora y directora académica de WeLearn, formada en Francia e Inglaterra. Lidera el diseño curricular y la preparación de certificaciones oficiales de alemán.',
      ['es', 'en', 'fr']
    ),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de Alemán', item: 'https://www.idiomaswl.com/clases-de-aleman' },
      ],
    },
  ],
};

const WHY_CARDS = [
  { icon: '🎯', title: 'Diagnóstico gratis', desc: 'Evaluamos tu nivel real, entendemos tu objetivo (visa, estudios o trabajo) y diseñamos tu plan personalizado.' },
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
    a: 'Las dos. En Bucaramanga y su área metropolitana —Floridablanca, Girón y Piedecuesta— puedes venir a nuestra sede de Sotomayor; desde cualquier otra ciudad de Colombia o del mundo la clase es por videollamada, con el mismo profesor y el mismo plan. También puedes alternar entre los dos formatos.',
  },
  {
    q: '¿Dónde puedo estudiar alemán en Bucaramanga?',
    a: 'En Idiomas WeLearn, Calle 47 # 29-33, barrio Sotomayor. Damos clases presenciales en Bucaramanga, Floridablanca, Girón y Piedecuesta, y online al resto del país. Algunas universidades de la ciudad ofrecen alemán, normalmente en niveles iniciales y para su propia comunidad. El diagnóstico inicial es gratis: escríbenos al 300 500 4253.',
  },
  {
    q: '¿Dónde puedo presentar el examen Goethe en Bucaramanga?',
    a: 'No se puede: no hay centro examinador de alemán en Bucaramanga ni en Santander. Los exámenes se presentan en la sede del Goethe-Institut en Bogotá, o en los centros asociados de Medellín, Cali y Cartagena. Desde Bucaramanga lo más práctico suele ser Bogotá. Inscríbete con semanas de anticipación, porque los cupos son limitados.',
  },
  {
    q: '¿Existe un colegio alemán en Bucaramanga?',
    a: 'No. No hay ninguna escuela alemana en Bucaramanga; el colegio alemán más antiguo del país está en Barranquilla. En Bucaramanga el alemán se estudia en algunas universidades y en academias de idiomas como la nuestra.',
  },
  {
    q: '¿Qué nivel de alemán necesito para una Ausbildung?',
    a: 'Por norma B1 para una formación profesional cualificada, y A2 cuando no lo es. En la práctica, las empresas del sector salud suelen pedir B2 antes de dar la plaza. Se aceptan certificados de Goethe, telc y ÖSD, entre otros, y normalmente se exigen con menos de un año de antigüedad.',
  },
  {
    q: '¿Qué nivel piden para trabajar como enfermera en Alemania, B1 o B2?',
    a: 'Los dos, en momentos distintos. Para el permiso con el que llegas a completar el reconocimiento de tu título suele bastar B1. Para obtener el reconocimiento y ejercer, la mayoría de los estados alemanes exige B2 y además un examen de lenguaje especializado de enfermería. El requisito exacto cambia según el estado federado, así que confírmalo para el tuyo.',
  },
  {
    q: '¿Cuánto cuestan las clases de alemán en Bucaramanga?',
    a: 'Depende de la intensidad semanal y de si tomas clases sueltas o un paquete de horas, porque el valor por hora baja a mayor volumen. El diagnóstico inicial es gratis y ahí definimos objetivo, nivel y frecuencia para darte el precio exacto de tu caso.',
  },
];

// El FAQPage se deriva de FAQS para que el marcado y el texto visible nunca se separen.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const BLOG_POSTS = [
  { cat: 'Alemán', color: '#1a2ecc', title: 'Alemán para enfermería en Alemania: nivel B2 y la Fachsprachprüfung', slug: 'aleman-para-enfermeria-en-alemania' },
  { cat: 'Alemán', color: '#1a2ecc', title: 'Trabajar en Alemania: ¿qué nivel de alemán necesitas según tu profesión?', slug: 'trabajar-en-alemania-nivel-aleman-requerido' },
  { cat: 'Alemán', color: '#1a2ecc', title: 'Goethe-Zertifikat: guía completa para colombianos', slug: 'goethe-zertifikat-guia-completa-colombia' },
  { cat: 'Alemán', color: '#1a2ecc', title: 'Alemán de A1 a B1: cuánto tiempo toma y cómo organizarte', slug: 'aleman-a1-a-b1-cuanto-tiempo-y-plan-de-estudio' },
  { cat: 'Alemán', color: '#1a2ecc', title: 'Alemán para trabajar en Suiza: nivel requerido y salarios', slug: 'aleman-para-suiza-oportunidades-trabajo-nivel-requerido' },
  { cat: 'Alemán', color: '#1a2ecc', title: 'Alemán B2 para enfermería: reconocimiento de título y proceso en Alemania', slug: 'aleman-b2-reconocimiento-titulo-enfermeria-alemania' },
  { cat: 'Alemán', color: '#1a2ecc', title: 'DSH: el examen de alemán para entrar a universidades en Alemania', slug: 'aleman-dsh-examen-para-universidades-alemanas' },
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
              <p className={s.eyebrow}>Alemán en Bucaramanga y online · WeLearn</p>
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
          <span className={s.proofItem}><strong>Diagnóstico</strong> gratis</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Goethe A1 hasta C1</strong></span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Presencial en Bucaramanga</strong> · Sotomayor</span>
        </div>

        {/* ══════════════ FUNDADORES ══════════════ */}
        <FoundersBand
          accent="#1a2ecc"
          title="Dos políglotas te enseñan alemán. No un curso grabado."
          intro="Detrás de cada clase hay dos personas que aprendieron idiomas de verdad, no una app con lecciones automáticas."
          davidLine="Habla ocho idiomas. El alemán es de los que más le costó, y por eso es el que mejor sabe explicar: casos, orden de la frase y verbos separables, paso a paso desde el español."
          zhannaLine="Co-fundadora y directora académica de WeLearn, formada en Francia e Inglaterra. Diseña las rutas de certificación y controla que la preparación Goethe corresponda a lo que el examen realmente evalúa."
          zhannaTags={['Lingüista titulada · Co-fundadora', 'Preparación Goethe', 'Diseño curricular']}
        />

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

        {/* ══════════════ QUÉ NIVEL PIDE CADA TRÁMITE (AEO) ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Antes de elegir curso</p>
            <h2 className={s.h2}>¿Qué nivel de alemán te piden según tu trámite?</h2>
            <p className={s.sectionSub}>
              Casi nadie necesita &ldquo;aprender alemán&rdquo; en abstracto: necesita un nivel concreto
              para un trámite concreto. Estudiar sin saber cuál es tu meta es la forma más común de
              perder un año.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Visa familiar</span>
                <p className={s.levelTitle}>A1 — reagrupación con tu pareja</p>
                <p className={s.levelDesc}>
                  Se pide un A1 acreditado antes de viajar. Colombia no está entre los países
                  exentos de este requisito, así que cuenta con presentarlo. Es el objetivo más
                  corto de todos y el que más rápido se alcanza.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Ausbildung</span>
                <p className={s.levelTitle}>B1 por norma, B2 en la práctica</p>
                <p className={s.levelDesc}>
                  La norma pide B1 para una formación profesional cualificada, y A2 cuando no lo
                  es. Pero las empresas del sector salud suelen exigir B2 para dar la plaza. Dicho
                  claro: el B1 te abre el visado, el B2 te abre las buenas vacantes.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Enfermería</span>
                <p className={s.levelTitle}>B1 para entrar, B2 para ejercer</p>
                <p className={s.levelDesc}>
                  Son dos momentos distintos y confundirlos cuesta meses. Para el permiso mientras
                  completas el reconocimiento del título suele bastar B1. Para ejercer, la mayoría
                  de estados alemanes exige B2 y además un examen de lenguaje especializado de
                  enfermería. El requisito exacto varía según el estado federado.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Chancenkarte</span>
                <p className={s.levelTitle}>A1 abre la puerta, B1 y B2 dan puntos</p>
                <p className={s.levelDesc}>
                  La tarjeta de oportunidades pide como mínimo A1 de alemán o B2 de inglés — y ese
                  mínimo no suma puntos. El alemán sí puntúa por encima: B1 suma dos puntos y B2 o
                  más suma tres, sobre los seis que hay que alcanzar. Si te faltan puntos, subir de
                  nivel suele ser la vía más rápida.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Universidad</span>
                <p className={s.levelTitle}>Alrededor de C1</p>
                <p className={s.levelDesc}>
                  Para carreras dictadas en alemán se pide TestDaF con nivel 4 en las cuatro partes
                  o DSH-2, ambos en torno a C1. El B2 normalmente no alcanza. El TestDaF sí se
                  presenta en Colombia; el DSH solo en Alemania, en la propia universidad.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Al llegar</span>
                <p className={s.levelTitle}>B1 para la nacionalización</p>
                <p className={s.levelDesc}>
                  El examen que se rinde al final del curso de integración se presenta ya dentro de
                  Alemania, no desde Colombia, y acredita B1. Conviene saberlo desde el principio
                  para no pagar dos veces por el mismo nivel.
                </p>
              </div>
            </div>
            <p className={s.sectionSub} style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
              Los requisitos migratorios cambian con frecuencia y varían entre estados alemanes.
              Confirma siempre tu caso en la fuente oficial antes de inscribirte a un examen —
              nosotros preparamos el idioma, no gestionamos el trámite.
            </p>
          </div>
        </section>

        {/* ══════════════ DÓNDE SE PRESENTA (SEO LOCAL + AEO diferencial) ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Dónde se presenta</p>
            <h2 className={s.h2}>El Goethe-Zertifikat no se aplica en Bucaramanga</h2>
            <p className={s.sectionSub}>
              Conviene saberlo antes de organizar nada: no hay centro examinador de alemán en
              Bucaramanga ni en ningún municipio de Santander. Prepararte, sí puedes hacerlo aquí.
              Presentarlo, no.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Bogotá</span>
                <p className={s.levelTitle}>La sede principal</p>
                <p className={s.levelDesc}>
                  El Goethe-Institut tiene su sede propia en Bogotá y allí se aplican los exámenes
                  de A1 a C2, además del TestDaF para universidad. Desde Bucaramanga es el destino
                  más práctico por frecuencia de convocatorias.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Otras sedes</span>
                <p className={s.levelTitle}>Medellín, Cali y Cartagena</p>
                <p className={s.levelDesc}>
                  Hay centros asociados en esas tres ciudades, donde la inscripción se hace
                  directamente con cada centro y no con la sede de Bogotá. Sus calendarios son
                  independientes, así que vale la pena compararlos.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Ojo</span>
                <p className={s.levelTitle}>Inscríbete con antelación</p>
                <p className={s.levelDesc}>
                  La inscripción cierra con semanas de anticipación y los cupos son limitados. Suma
                  el viaje al cálculo: no es solo el día del examen. Y ten presente que el
                  certificado suele exigirse con menos de un año de antigüedad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ DIFICULTAD (AEO) ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>La pregunta de siempre</p>
            <h2 className={s.h2}>¿Es tan difícil el alemán como dicen?</h2>
            <p className={s.sectionSub}>
              Menos de lo que su fama sugiere. El Foreign Service Institute lo sitúa en categoría
              II, con unas 750 horas de aula para competencia profesional. Eso es{' '}
              <strong>una sola categoría por encima</strong> del francés o el italiano, y muy lejos
              del chino o el árabe, que están en la categoría más alta con unas 2.200 horas.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Lo que cuesta</span>
                <p className={s.levelTitle}>Casos, géneros y el verbo al final</p>
                <p className={s.levelDesc}>
                  Cuatro casos que cambian artículos y adjetivos; tres géneros con poca lógica
                  aparente; y el verbo que se va al final en las subordinadas, lo que te obliga a
                  planear la frase entera antes de abrir la boca. A eso súmale los verbos
                  separables, donde el sentido se cierra en la última sílaba.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>A tu favor</span>
                <p className={s.levelTitle}>Se lee como se escribe</p>
                <p className={s.levelDesc}>
                  La ortografía alemana es muy regular: puedes leer en voz alta desde la primera
                  semana, algo impensable en inglés o francés. Las vocales le vienen bien al oído
                  hispano y el alfabeto es el mismo — cero curva de escritura, a diferencia del
                  ruso o el japonés.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Cuánto toma</span>
                <p className={s.levelTitle}>Los niveles altos cuestan el doble</p>
                <p className={s.levelDesc}>
                  Según las referencias del propio Goethe-Institut, el A1 ronda las 60 a 150 horas
                  y el B1 acumulado va de 260 a 490. Pero el B2 y el C1 requieren el doble de curso
                  que los niveles iniciales. Por eso &ldquo;llegar a B2 para enfermería&rdquo; no es
                  cuestión de un trimestre.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ BUCARAMANGA (SEO LOCAL) ══════════════ */}
        <LocalBand
          accent="#1a2ecc"
          idioma="alemán"
          intro="WeLearn es una academia de idiomas con sede en Bucaramanga. Si estás en la ciudad o en el área metropolitana puedes estudiar alemán presencialmente con nosotros; si prefieres no desplazarte —o vives en otra ciudad— la misma clase, con el mismo profesor y el mismo plan, se hace por videollamada."
          presencial="Clases cara a cara para el idioma que más se beneficia de tener al profesor al lado: los casos, el género y el orden de la frase se corrigen mucho más rápido en persona que por chat."
          waText="Hola, estoy en Bucaramanga y quiero saber sobre las clases de alemán presenciales. ¿Cómo funcionan?"
        />

        {/* ══════════════ PRACTICA GRATIS ══════════════ */}
        <PracticeBand
          accent="#1a2ecc"
          title="Ejercítate con material real antes de empezar"
          sub="Gramática, vocabulario, escucha y escritura con feedback inmediato. Sin registro."
          cards={[
            { href: '/practica/aleman/a1/gramatica', title: 'Gramática A1', desc: 'Artículos, casos y orden de la frase explicados desde el español — lo que hace que el alemán parezca difícil.' },
            { href: '/practica/aleman/a1/vocabulario', title: 'Vocabulario A1', desc: 'Palabras de alta frecuencia con audio nativo y el género de cada sustantivo desde el primer día.' },
            { href: '/practica/aleman/b1/escucha', title: 'Escucha B1', desc: 'Audio a velocidad natural: el nivel que piden la mayoría de visas y procesos de trabajo en Alemania.' },
            { href: '/practica/aleman/b1', title: 'Nivel B1 completo', desc: 'Gramática, escucha, lectura y escritura del nivel que exige el Goethe-Zertifikat B1.' },
          ]}
        />

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
              Tu diagnóstico de alemán<br />
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
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
