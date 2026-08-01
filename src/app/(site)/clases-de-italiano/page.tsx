import type { Metadata } from 'next';
import Link from 'next/link';
import FoundersBand from '@/components/hub/FoundersBand';
import PracticeBand from '@/components/hub/PracticeBand';
import s from './page.module.css';

const WA = '573005004253';
const WA_GENERAL = encodeURIComponent('Hola, vi la página de clases de italiano en WeLearn y quiero agendar mi clase de diagnóstico gratis.');
const WA_CILS    = encodeURIComponent('Hola, quiero prepararme para el examen CILS o CELI con WeLearn. ¿Cuándo puedo empezar?');

export const metadata: Metadata = {
  title: 'Clases de Italiano Online en Colombia — Preparación CILS y CELI | WeLearn',
  description:
    'Aprende italiano online con tutor especializado. Preparación CILS y CELI de A2 hasta C2. Ciudadanía italiana, estudios en Italia, trabajo internacional. Clase diagnóstico gratis.',
  keywords: [
    'clases de italiano online Colombia',
    'aprender italiano Bucaramanga',
    'preparación CILS Colombia',
    'preparación CELI Colombia',
    'curso de italiano para adultos',
    'italiano para ciudadanía italiana',
    'CILS Colombia',
    'italiano online Colombia',
    'aprender italiano desde cero',
    'WeLearn italiano',
  ],
  openGraph: {
    title: 'Clases de Italiano Online — Preparación CILS y CELI | WeLearn',
    description:
      'Tutor especializado, preparación CILS/CELI, ciudadanía italiana y estudios en Italia. Clase diagnóstico gratis para colombianos.',
    url: 'https://www.idiomaswl.com/clases-de-italiano',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/clases-de-italiano' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Necesito saber italiano para empezar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Empezamos desde A1 absoluto. El italiano es el idioma más cercano al español entre las lenguas romances — progresarás más rápido de lo que esperas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Para qué sirve el CILS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El CILS (Certificazione di Italiano come Lingua Straniera) es la certificación oficial de la Universidad para Extranjeros de Siena. Es reconocida para ciudadanía italiana, visas de estudio y trabajo en Italia, y universidades italianas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué nivel de italiano necesito para la ciudadanía italiana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El gobierno italiano exige demostrar nivel B1 de italiano para solicitar la ciudadanía por residencia (ciudadanía por naturalización). El CILS B1 o el CELI 2 son certificados aceptados.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo toma llegar al CILS B2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Para hispanohablantes, que parten con una ventaja gramatical y de vocabulario muy alta, alcanzar B2 toma entre 12 y 18 meses con práctica constante. El italiano es el idioma más fácil para hispanohablantes entre las lenguas no hispanas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre el CILS y el CELI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El CILS es de la Universidad para Extranjeros de Siena; el CELI es de la Universidad para Extranjeros de Perugia. Ambos son reconocidos oficialmente por el gobierno italiano. WeLearn prepara para los dos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El examen B1 de italiano para la ciudadanía se puede hacer online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Ni el CILS ni el CELI tienen versión online: son exámenes presenciales que se presentan en un centro autorizado, con documento de identidad. Lo que sí puedes hacer online es toda la preparación, incluidos los simulacros.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde puedo presentar el examen CILS o CELI en Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En centros autorizados por el gobierno italiano. La referencia principal es el Istituto Italiano di Cultura de Bogotá, y también hay sedes vinculadas a universidades y a la Sociedad Dante Alighieri en Bogotá, Medellín y Cartagena. El calendario de sesiones cambia cada año, así que conviene confirmar fecha y sede antes de inscribirse.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto se demora el resultado del CILS B1?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El resultado del CILS suele salir alrededor de mes y medio después del examen, y el del CELI puede tomar cerca de tres meses. El certificado físico llega después del resultado. Si tienes una cita consular con fecha fija, planea hacia atrás desde esa fecha.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo toma llegar a B1 en italiano si ya hablo español?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un hispanohablante puede alcanzar el B1 de italiano en 6 a 12 meses estudiando de 3 a 5 horas por semana. Es bastante más rápido que la referencia general del MCER porque compartes gramática y una gran parte del vocabulario.',
      },
    },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Italiano con el método WeLearn',
      description: 'Aprende italiano desde cero hasta CILS/CELI C2. Preparación para ciudadanía italiana, estudios y trabajo en Italia.',
      provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
      hasCourseInstance: [{
        '@type': 'CourseInstance',
        courseMode: 'online',
        inLanguage: 'it',
        courseWorkload: 'PT1H',
        instructor: { '@type': 'Person', name: 'José David Duarte Silva' },
      }],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'COP', description: 'Clase de diagnóstico gratis', availability: 'https://schema.org/InStock' },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.idiomaswl.com/#localbusiness',
      name: 'Idiomas WeLearn',
      url: 'https://www.idiomaswl.com',
      telephone: '+573005004253',
      address: { '@type': 'PostalAddress', addressLocality: 'Bucaramanga', addressRegion: 'Santander', addressCountry: 'CO' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de Italiano', item: 'https://www.idiomaswl.com/clases-de-italiano' },
      ],
    },
  ],
};

const WHY_CARDS = [
  { icon: '🎯', title: 'Clase diagnóstico gratis', desc: 'Evaluamos tu nivel real, entendemos tu objetivo (ciudadanía, CILS, viaje o trabajo) y diseñamos tu plan personalizado.' },
  { icon: '🇮🇹', title: 'Tutor especializado', desc: 'Docentes con experiencia en CILS/CELI y en enseñanza del italiano a hispanohablantes.' },
  { icon: '🗣️', title: 'Énfasis en la fluidez', desc: 'Pronunciación, entonación y confianza para hablar desde la primera semana. El italiano se aprende hablando.' },
  { icon: '✅', title: 'Preparación CILS y CELI', desc: 'Comprensione orale, comprensione scritta, produzione scritta e produzione orale. Los cuatro componentes del examen.' },
];

const LEVELS = [
  {
    tag: 'A1 – A2',
    title: 'Italiano básico',
    desc: 'Saludos, presentación, verbi del quotidiano, artículos, presente indicativo. Conversaciones de turismo y vida cotidiana. El A2 es el punto de despegue para viajes.',
    time: '3–5 meses',
  },
  {
    tag: 'B1 – B2',
    title: 'Italiano funcional',
    desc: 'Congiuntivo, condizionale, vocabulario laboral y cultural. El B1 es el nivel mínimo para la ciudadanía italiana. El B2 abre puertas a universidades y trabajo formal en Italia.',
    time: '7–14 meses',
  },
  {
    tag: 'C1 – C2',
    title: 'Italiano avanzado',
    desc: 'Italiano académico, debates, escritura formal, DALF cultural italiano. Para profesores, traductores y profesionales que trabajan directamente con Italia.',
    time: '14–22 meses',
  },
];

const EXAMS = [
  {
    name: 'CILS',
    range: 'A2 · B1 · B2 · C1 · C2',
    desc: 'La Certificazione di Italiano come Lingua Straniera de la Universidad para Extranjeros de Siena. Reconocida para ciudadanía italiana, visas y universidades en Italia.',
    skills: ['Comprensione orale', 'Comprensione scritta', 'Produzione scritta', 'Produzione orale'],
  },
  {
    name: 'CELI',
    range: '1 (A2) · 2 (B1) · 3 (B2) · 4 (C1) · 5 (C2)',
    desc: 'El Certificato di Conoscenza della Lingua Italiana de la Universidad para Extranjeros de Perugia. Igualmente reconocido por el gobierno italiano para ciudadanía y visas.',
    skills: ['Ascolto', 'Lettura', 'Scrittura', 'Parlato'],
  },
];

const FAQS = [
  { q: '¿Necesito saber italiano para empezar?', a: 'No. Empezamos desde A1 absoluto. El italiano es el idioma más cercano al español — progresarás más rápido de lo que esperas.' },
  { q: '¿Para qué sirve el CILS?', a: 'El CILS es la certificación oficial de la Universidad para Extranjeros de Siena. Es reconocida para ciudadanía italiana, visas de estudio y trabajo en Italia, y universidades italianas.' },
  { q: '¿Qué nivel necesito para la ciudadanía italiana?', a: 'El gobierno italiano exige demostrar nivel B1 para la ciudadanía por naturalización. El CILS B1 o el CELI 2 son certificados aceptados.' },
  { q: '¿Cuánto tiempo toma llegar al CILS B2?', a: 'Para hispanohablantes, alcanzar B2 toma entre 12 y 18 meses con práctica constante. El italiano es el más fácil para hispanohablantes entre las lenguas no hispanas.' },
  { q: '¿Cuál es la diferencia entre CILS y CELI?', a: 'El CILS es de Siena; el CELI es de Perugia. Ambos son reconocidos por el gobierno italiano. WeLearn prepara para los dos.' },
  { q: '¿El examen B1 de italiano para la ciudadanía se puede hacer online?', a: 'No. Ni el CILS ni el CELI tienen versión online: son presenciales, en un centro autorizado y con documento de identidad. Lo que sí es online es toda la preparación, incluidos los simulacros.' },
  { q: '¿Dónde puedo presentar el CILS o el CELI en Colombia?', a: 'En centros autorizados por el gobierno italiano. La referencia principal es el Istituto Italiano di Cultura de Bogotá, y también hay sedes vinculadas a universidades y a la Sociedad Dante Alighieri en Bogotá, Medellín y Cartagena. El calendario cambia cada año: confirma sede y fecha antes de inscribirte.' },
  { q: '¿Cuánto se demora el resultado del CILS B1?', a: 'El CILS suele entregar resultados alrededor de mes y medio después del examen; el CELI puede tomar cerca de tres meses, y el certificado físico llega después. Si tienes cita consular con fecha, planea hacia atrás desde ahí.' },
  { q: '¿Cuánto tiempo toma llegar a B1 en italiano si ya hablo español?', a: 'Entre 6 y 12 meses estudiando de 3 a 5 horas por semana. Es más rápido que la referencia general del MCER porque compartes gramática y buena parte del vocabulario con el italiano.' },
];

const BLOG_POSTS = [
  { cat: 'Italiano', color: '#009246', title: 'Estudiar en Italia: costos, nivel de italiano y cómo aplicar', slug: 'italiano-para-estudiar-en-italia-costos-y-requisitos' },
  { cat: 'Italiano', color: '#009246', title: 'Ciudadanía italiana: el requisito de italiano B1 explicado', slug: 'ciudadania-italiana-italiano-b1-requisito' },
  { cat: 'Italiano', color: '#009246', title: 'CILS y CELI: la guía completa para certificar tu italiano desde Colombia', slug: 'cils-celi-certificacion-italiano-colombia' },
  { cat: 'Italiano', color: '#009246', title: 'Italiano de cero a B2: cuánto tiempo toma y cómo estudiarlo', slug: 'italiano-de-cero-a-b2-cuanto-tiempo-y-como-estudiarlo' },
  { cat: 'Italiano', color: '#009246', title: 'Italiano B1 para ciudadanía italiana: examen y proceso completo', slug: 'italiano-para-ciudadania-italiana-nivel-b1' },
  { cat: 'Italiano', color: '#009246', title: 'Trabajar en Italia: visas y nivel de italiano por sector', slug: 'italiano-trabajar-en-italia-visas-y-nivel-requerido' },
  { cat: 'Italiano', color: '#009246', title: 'Aprender italiano con música y películas: método práctico', slug: 'aprender-italiano-con-musica-y-peliculas' },
];

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

export default function ClasesDeItalianoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className={s.page}>

        {/* HERO */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <div className={s.heroPhrase}>Ciao!</div>
              <p className={s.eyebrow}>Italiano online · WeLearn</p>
              <h1 className={s.h1}>
                Aprende italiano<br />
                <span className={s.accent}>de verdad.</span>
              </h1>
              <p className={s.heroSub}>
                El italiano es el idioma románico más cercano al español. Con método correcto,
                en 6 meses ya conversas, y en 12–18 puedes alcanzar el CILS B2 para ciudadanía o trabajo en Italia.
              </p>
              <div className={s.heroCtas}>
                <a href={`https://wa.me/${WA}?text=${WA_GENERAL}`} target="_blank" rel="noopener noreferrer" className={s.waBtn}>
                  <WaIcon /> Clase de diagnóstico gratis
                </a>
                <Link href="/examenes/cils-celi" className={s.ghostBtn}>Ver simulacros CILS →</Link>
              </div>
            </div>

            <div className={s.heroVisual}>
              <div className={s.heroCard}>
                <span className={s.heroCardFlag}>🇮🇹</span>
                <p className={s.heroCardTitle}>CILS · CELI</p>
                <p className={s.heroCardSub}>Certificaciones oficiales del Ministerio de Asuntos Exteriores de Italia</p>
                <div className={s.levelBadges}>
                  {['A2','B1','B2','C1','C2'].map(l => <span key={l} className={s.levelBadge}>{l}</span>)}
                </div>
              </div>
              <div className={s.heroCard}>
                <p className={s.heroCardTitle}>¿Por qué italiano?</p>
                <p className={s.heroCardSub}>
                  • Ciudadanía italiana por residencia (B1 requerido)<br />
                  • Universidades gratuitas en Italia hasta nivel B2<br />
                  • Moda, gastronomía, diseño, arquitectura — 4ª economía de la UE<br />
                  • El idioma más fácil del mundo para hispanohablantes
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={s.proofStrip}>
          <span className={s.proofItem}><strong>6 idiomas</strong> disponibles</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Clase diagnóstico</strong> gratis</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>CILS · CELI A2 hasta C2</strong></span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>100% online</strong> · Colombia y mundo</span>
        </div>

        {/* ══════════════ FUNDADORES ══════════════ */}
        <FoundersBand
          accent="#009246"
          title="Dos políglotas te enseñan italiano. No un curso grabado."
          intro="Detrás de cada clase hay dos personas que aprendieron idiomas de verdad, no una app con lecciones automáticas."
          davidLine="Habla ocho idiomas. El italiano fue el segundo que aprendió, justo después del inglés — y es el que mejor demuestra cuánta ventaja te da ya hablar español."
          zhannaLine="Directora académica de WeLearn, formada en Francia e Inglaterra. Diseña las rutas de certificación y controla que la preparación CILS y CELI corresponda a lo que el examen realmente evalúa."
          zhannaTags={['Directora académica', 'Preparación CILS / CELI', 'Diseño curricular']}
        />

        {/* WHY */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Por qué WeLearn</p>
            <h2 className={s.h2}>No es un curso. Es un método.</h2>
            <p className={s.sectionSub}>Diseñamos el camino completo desde tu nivel actual hasta tu objetivo — sea el CILS B1 para ciudadanía o el C2 para trabajo profesional.</p>
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

        {/* LEVELS */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Niveles</p>
            <h2 className={s.h2}>Desde cero hasta C2</h2>
            <p className={s.sectionSub}>Cada nivel tiene objetivos claros. Sabes exactamente qué aprendes y para qué sirve.</p>
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

        {/* EXAMS */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Certificaciones</p>
            <h2 className={s.h2}>CILS y CELI: las certificaciones oficiales</h2>
            <p className={s.sectionSub}>Ambas son reconocidas por el gobierno italiano. La diferencia está en la universidad que las emite, no en el valor oficial.</p>
            <div className={s.examGrid}>
              {EXAMS.map(e => (
                <div key={e.name} className={s.examCard}>
                  <p className={s.examName}>{e.name}</p>
                  <p className={s.examRange}>{e.range}</p>
                  <p className={s.examDesc}>{e.desc}</p>
                  <div className={s.examSkills}>{e.skills.map(sk => <span key={sk}>{sk}</span>)}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <a href={`https://wa.me/${WA}?text=${WA_CILS}`} target="_blank" rel="noopener noreferrer" className={s.waBtnLight}>
                <WaIcon /> Preparar mi CILS ahora →
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════ DÓNDE Y CUÁNDO (SEO/AEO) ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Dónde y cuándo</p>
            <h2 className={s.h2}>Dónde presentar el examen de italiano en Colombia</h2>
            <p className={s.sectionSub}>
              El CILS y el CELI son presenciales — no existe versión online. En Colombia se presentan
              en centros autorizados por el gobierno italiano. Esto es lo que necesitas saber para
              planear tu cronograma antes de la cita consular.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Sedes</span>
                <p className={s.levelTitle}>Centros autorizados en Colombia</p>
                <p className={s.levelDesc}>
                  El Istituto Italiano di Cultura de Bogotá es la referencia principal, y también
                  hay centros vinculados a universidades y a la Sociedad Dante Alighieri en Bogotá,
                  Medellín y Cartagena. Confirma sede y fecha de sesión antes de inscribirte: el
                  calendario cambia cada año.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Duración</span>
                <p className={s.levelTitle}>Cuánto dura el examen</p>
                <p className={s.levelDesc}>
                  El CILS B1 toma alrededor de 2 horas y el CELI algo más de 2 horas y media.
                  Ambos se dividen en cuatro pruebas — escucha, lectura, escritura y oral — que
                  pesan lo mismo. Se aprueba con el mínimo en cada una, no con el promedio.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Resultados</span>
                <p className={s.levelTitle}>Cuánto tarda el certificado</p>
                <p className={s.levelDesc}>
                  El resultado del CILS suele salir en torno a mes y medio; el del CELI puede tomar
                  cerca de tres meses. El certificado físico llega después. Si tienes cita
                  consular con fecha, cuenta hacia atrás desde ahí — es el error de planeación
                  más común.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ PRACTICA GRATIS ══════════════ */}
        <PracticeBand
          accent="#009246"
          title="Ejercítate con material real antes de empezar"
          sub="Gramática, vocabulario, escucha y escritura con feedback inmediato. Sin registro."
          cards={[
            { href: '/practica/italiano/a1/gramatica', title: 'Gramática A1', desc: 'Artículos, género, presente y los verbos que más se usan. Ejercicios interactivos con corrección al instante.' },
            { href: '/practica/italiano/a1/vocabulario', title: 'Vocabulario A1', desc: 'Palabras de alta frecuencia con audio nativo — el italiano que de verdad se habla en Italia.' },
            { href: '/practica/italiano/b1', title: 'Nivel B1 — el de la ciudadanía', desc: 'Gramática, escucha, lectura y escritura de nivel B1, el que exige el Estado italiano para la ciudadanía.' },
            { href: '/practica/italiano/tiempos-verbales', title: 'Tiempos verbales', desc: 'Passato prossimo, imperfetto, congiuntivo y condizionale explicados desde el español, con práctica.' },
          ]}
        />

        {/* FAQ */}
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

        {/* BLOG */}
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

        {/* FINAL CTA */}
        <section className={s.ctaSection}>
          <div className={s.ctaBox}>
            <p className={s.ctaPhrase}>Iniziamo!</p>
            <h2 className={s.ctaTitle}>Tu diagnóstico de italiano<br /><span className={s.accent}>es gratis.</span></h2>
            <p className={s.ctaSub}>Diagnosticamos tu nivel, definimos tu objetivo y te mostramos exactamente cómo llegar al CILS que necesitas.</p>
            <div className={s.ctaBtns}>
              <a href={`https://wa.me/${WA}?text=${WA_GENERAL}`} target="_blank" rel="noopener noreferrer" className={s.waBtn}>
                <WaIcon /> Agendar diagnóstico gratis
              </a>
              <Link href="/precios" className={s.ghostBtnLight}>Ver planes y precios →</Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
