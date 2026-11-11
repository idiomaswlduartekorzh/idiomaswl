import LanguageResourceLinks from '@/components/hub/LanguageResourceLinks';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FoundersBand from '@/components/hub/FoundersBand';
import LocalBand from '@/components/hub/LocalBand';
import CourseOfferBand from '@/components/hub/CourseOfferBand';
import { localBusinessNode, davidNode, zhannaNode, courseInstances } from '@/components/hub/localBusiness';
import { ENROLLMENT_FEE_COP, PLANS, formatCOP } from '@/lib/course-pricing/catalog';
import s from './page.module.css';

const WA = '573005004253';
const WA_GENERAL = encodeURIComponent('Hola, vi la página de clases de francés en WeLearn. Quiero contarles mi objetivo y conocer la ruta, el tutor, la modalidad y el precio.');
const WA_DELF    = encodeURIComponent('Hola, quiero prepararme para el examen DELF con WeLearn. ¿Cuándo puedo empezar?');

export const metadata: Metadata = {
  title: 'Clases de francés en Bucaramanga y online | WeLearn',
  description:
    'Aprende francés desde cero con clases presenciales en Bucaramanga u online en vivo. Conoce planes, precios y rutas para conversación o DELF.',
  openGraph: {
    title: 'Clases de francés en Bucaramanga y online | WeLearn',
    description:
      'Francés desde cero hasta nivel avanzado con tutor. Presencial en Bucaramanga u online desde Colombia.',
    url: 'https://www.idiomaswl.com/clases-de-frances',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/clases-de-frances' },
};

const faqJsonLd = (faqs: ReadonlyArray<{ q: string; a: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Francés con el método WeLearn',
      description:
        'Clases de francés desde nivel inicial hasta avanzado con tutor. Conversación, comprensión y preparación de exámenes según el objetivo del estudiante.',
      provider: {
        '@type': 'Organization',
        name: 'Idiomas WeLearn',
        url: 'https://www.idiomaswl.com',
      },
      hasCourseInstance: courseInstances('Francés', 'fr'),
    },
    localBusinessNode(
      'Clases particulares de idiomas con sede en Bucaramanga y atención online para toda Colombia. Francés con preparación DELF, DALF y TCF/TEF, además de inglés, coreano, alemán, italiano y portugués.'
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
  { icon: '🎯', title: 'Diagnóstico de pago', desc: 'Identificamos tu nivel real, tu objetivo y te diseñamos un plan personalizado desde la primera sesión.' },
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
    desc: "El Diplôme d'Études en Langue Française acredita un nivel de francés. Su aceptación para estudios, trabajo o trámites depende de los requisitos de cada institución o programa.",
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
    a: 'El francés y el español comparten muchas raíces latinas, pero la pronunciación y algunas estructuras son distintas. El tiempo de avance depende de tu punto de partida, intensidad y práctica entre clases.',
  },
  {
    q: '¿Para qué sirve el DELF?',
    a: 'El DELF es un diploma oficial de francés por nivel. Puede servir para acreditar tu nivel ante instituciones educativas o empleadores, según sus requisitos. Confirma el diploma y nivel que exige cada trámite antes de inscribirte.',
  },
  {
    q: '¿Cuánto tiempo toma llegar al DELF B2?',
    a: 'Partiendo de cero, entre 18 y 24 meses con práctica constante de 3–4 horas semanales. Si ya tienes base (A2), puedes alcanzar B2 en 10–14 meses.',
  },
  {
    q: '¿Dónde puedo tomar clases de francés en Bucaramanga?',
    a: 'En Idiomas WeLearn ofrecemos clases particulares con sede en Bucaramanga. Atendemos presencialmente a estudiantes de Bucaramanga, Floridablanca, Girón y Piedecuesta, y online al resto de Colombia y del mundo. Escríbenos por WhatsApp al 300 500 4253 y consulta el precio del diagnóstico con tutor antes de agendar.',
  },
  {
    q: '¿Las clases son presenciales o virtuales?',
    a: 'Las dos. Si estás en Bucaramanga o el área metropolitana puedes estudiar presencialmente; si estás en Bogotá, Medellín, Cali o cualquier otra ciudad, la clase es por videollamada con el mismo profesor y el mismo plan. También puedes alternar entre los dos formatos.',
  },
  {
    q: '¿Cuánto cuestan las clases de francés en Bucaramanga?',
    a: `El plan Esencial cuesta ${formatCOP(PLANS[0].price)} COP por cuatro semanas, con una clase de 100 minutos por semana. Hay planes de dos a cinco clases semanales. En la primera inscripción puede sumarse ${formatCOP(ENROLLMENT_FEE_COP)} COP; el total se muestra antes del pago. La sesión de diagnóstico con tutor, si la solicitas, es paga.`,
  },
  {
    q: '¿El DELF sirve para Express Entry o para Quebec?',
    a: 'Para Express Entry federal, las pruebas de francés aceptadas son TEF Canada y TCF Canada; DELF y DALF no figuran en esa lista. Algunos programas de selección de Quebec aceptan DELF y DALF bajo sus propias condiciones, incluso sobre la antigüedad del resultado. Consulta siempre las reglas vigentes del programa exacto.',
  },
  {
    q: '¿Cuál es la diferencia entre DELF, DALF, TCF y TEF?',
    a: 'DELF y DALF son diplomas por nivel (A1 a C2) que no caducan. TCF y TEF son pruebas de nivel con vigencia limitada. Express Entry federal acepta TEF Canada o TCF Canada; algunos programas de Quebec también aceptan DELF y DALF. Revisa el examen exigido por tu programa.',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }} />
      <main className={s.page}>

        {/* ══════════════ HERO ══════════════ */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <div className={s.heroPhrase}>Bonjour !</div>
              <p className={s.eyebrow}>Francés en Bucaramanga y online · WeLearn</p>
              <h1 className={s.h1}>
                Clases de francés<br />
                <span className={s.accent}>en Bucaramanga y online.</span>
              </h1>
              <p className={s.heroSub}>
                El francés no es solo pronunciación difícil — es estructura, ritmo y contexto.
                Con el método WeLearn trabajas la base y las habilidades que exige tu objetivo, desde empezar de cero hasta preparar DELF o DALF.
                <strong> Presencial en Bucaramanga u online desde cualquier ciudad de Colombia.</strong>
              </p>
              <div className={s.heroCtas}>
                <a
                  href={`https://wa.me/${WA}?text=${WA_GENERAL}`}
                  data-wa-cta="frances-hero"
                  target="_blank" rel="noopener noreferrer"
                  className={s.waBtn}
                >
                  <WaIcon />
                  Consultar ruta y precio
                </a>
                <Link href="/precios?idioma=frances&objetivo=general" className={s.ghostBtn}>
                  Ver planes y precios →
                </Link>
              </div>
              <p className={s.heroSub} style={{ fontSize: '0.82rem', marginTop: '0.8rem' }}>La orientación inicial por chat y la <Link href="/practica/frances/a1/gramatica">práctica automática de francés A1</Link> son gratis. La clase y el diagnóstico con tutor son pagos; conoce el precio antes de agendar.</p>
            </div>

            <div className={s.heroVisual}>
              <div className={s.heroCard}>
                <span className={s.heroCardFlag}>🇫🇷</span>
                <p className={s.heroCardTitle}>Francés desde tu nivel</p>
                <p className={s.heroCardSub}>Conversación, comprensión y expresión con una ruta de aprendizaje adaptada a tu objetivo.</p>
                <div className={s.levelBadges}>
                  {['A1','A2','B1','B2','C1','C2'].map(l => (
                    <span key={l} className={s.levelBadge}>{l}</span>
                  ))}
                </div>
              </div>
              <div className={s.heroCard}>
                <p className={s.heroCardTitle}>Cómo puedes estudiar</p>
                <p className={s.heroCardSub}>
                  • En nuestra sede de Sotomayor, Bucaramanga<br />
                  • Online en vivo desde Colombia<br />
                  • Una a cinco clases por semana<br />
                  • Ciclos de cuatro semanas
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
          <span className={s.proofItem}><strong>Diagnóstico</strong> con tutor</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Francés general</strong> · DELF y DALF según tu objetivo</span>
        </div>

        <LanguageResourceLinks language="frances" />

        {/* ══════════════ FUNDADORES ══════════════ */}
        <FoundersBand
          accent="#1a2ecc"
          title="Una ruta de francés creada por dos políglotas."
          intro="Los fundadores diseñan el método y la ruta; un tutor asignado acompaña tu aprendizaje según tu objetivo."
          davidLine="Habla ocho idiomas. Llegó al francés después del inglés, el italiano y el portugués — y ese recorrido es exactamente el método que hoy usamos con hispanohablantes."
          zhannaLine="Estudió en Francia y en Inglaterra. Esa experiencia académica dentro del sistema francés es la que respalda nuestra preparación DELF y DALF."
          zhannaTags={['Co-fundadora · Estudió en Francia', 'Preparación DELF / DALF', 'Diseño curricular']}
        />

        {/* ══════════════ WHY ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Por qué WeLearn</p>
            <h2 className={s.h2}>Una ruta para usar el francés en la vida real.</h2>
            <p className={s.sectionSub}>
              Elige la frecuencia de tus clases y trabaja conversación, comprensión, lectura y escritura con una ruta según tu nivel y objetivo.
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

        <CourseOfferBand language="frances" name="francés" local />

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
                <p className={s.sectionEyebrow}>Creador del método</p>
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
                  Consultar a WeLearn por WhatsApp
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
              Son diplomas oficiales de francés por nivel. No caducan, aunque una institución o programa puede exigir resultados recientes.
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
          intro="Estudia francés con un tutor y una ruta ajustada a tu nivel, ya sea para DELF, DALF o una meta personal. Si estás en la ciudad o en el área metropolitana puedes estudiar francés presencialmente con nosotros; si prefieres no desplazarte —o vives en otra ciudad— la misma clase, con el mismo profesor y el mismo plan, se hace por videollamada."
          presencial="Clases cara a cara para quienes rinden más con el profesor al lado. Ideal si vas a presentar el DELF y quieres entrenar la expresión oral sin la barrera de la pantalla."
          waText="Hola, estoy en Bucaramanga y quiero saber sobre las clases de francés presenciales. ¿Cómo funcionan?"
        />

        {/* ══════════════ CANADÁ (SEO/AEO) ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Francés para migrar</p>
            <h2 className={s.h2}>¿Qué examen de francés exige tu programa en Canadá?</h2>
            <p className={s.sectionSub}>
              Para Express Entry federal, las pruebas de francés aceptadas son <strong>TEF Canada</strong> y
              <strong> TCF Canada</strong>. Algunos programas de selección de Quebec también aceptan
              DELF o DALF bajo condiciones propias. Verifica la lista y el nivel exigidos por tu programa
              antes de pagar una inscripción.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>DELF / DALF</span>
                <p className={s.levelTitle}>Para certificar; también aceptados en ciertos programas de Quebec</p>
                <p className={s.levelDesc}>
                  Diplomas oficiales por nivel que no caducan. Algunas instituciones los aceptan para
                  acreditar francés y ciertos programas de Quebec los admiten con condiciones,
                  incluida la antigüedad del resultado presentado.
                  No aparecen entre las pruebas aceptadas por Express Entry federal.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>TEF / TCF</span>
                <p className={s.levelTitle}>Para Express Entry federal</p>
                <p className={s.levelDesc}>
                  TEF Canada y TCF Canada son las pruebas de francés aceptadas para ese programa.
                  Sus resultados se expresan en niveles NCLC y deben cumplir las reglas de vigencia
                  y puntuación publicadas por la autoridad federal.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Qué hacemos</span>
                <p className={s.levelTitle}>Un solo camino, dos salidas</p>
                <p className={s.levelDesc}>
                  Trabajamos tu nivel de francés y, si tienes una meta de certificación, orientamos
                  la práctica hacia el examen que hayas confirmado para tu trámite. Cada programa
                  tiene requisitos propios.
                </p>
              </div>
            </div>
            <p className={s.sectionSub} style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
              Consulta las fuentes oficiales de <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html">Express Entry</a> o del <a href="https://www.quebec.ca/en/immigration/permanent/skilled-workers/skilled-worker-selection-program/requirements/knowledge-french">programa de Quebec</a> que corresponda antes de inscribirte.
            </p>
          </div>
        </section>

        {/* ══════════════ PRACTICA GRATIS ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Práctica gratuita</p>
            <h2 className={s.h2}>Todo lo que puedes practicar gratis desde hoy</h2>
            <p className={s.sectionSub}>
              Puedes explorar ejercicios automáticos de francés por nivel antes de matricularte.
              Algunas herramientas o resultados pueden pedir una cuenta o datos de contacto.
              El diagnóstico con tutor es una sesión paga.
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
                <p className={s.practicaTitle}>Explora tu nivel orientativo</p>
                <p className={s.practicaDesc}>La herramienta automática da una orientación inicial. No reemplaza la evaluación de un tutor.</p>
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
              <span className={s.accent}>es una sesión paga.</span>
            </h2>
            <p className={s.ctaSub}>
              Cuéntanos tu nivel y objetivo. Te explicamos las clases, horarios disponibles y el precio antes de agendar una sesión con tutor.
            </p>
            <div className={s.ctaBtns}>
              <a
                href={`https://wa.me/${WA}?text=${WA_GENERAL}`} data-wa-cta="frances-final"
                target="_blank" rel="noopener noreferrer"
                className={s.waBtn}
              >
                <WaIcon />
                Consultar ruta y precio
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
