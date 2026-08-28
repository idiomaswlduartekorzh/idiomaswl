import type { Metadata } from 'next';
import Link from 'next/link';
import FoundersBand from '@/components/hub/FoundersBand';
import LocalBand from '@/components/hub/LocalBand';
import { localBusinessNode, davidNode, zhannaNode, courseInstances } from '@/components/hub/localBusiness';
import PracticeBand from '@/components/hub/PracticeBand';
import s from './page.module.css';

const WA = '573005004253';
const WA_GENERAL = encodeURIComponent('Hola, vi la página de clases de italiano en WeLearn y quiero agendar mi clase de diagnóstico gratis.');
const WA_CILS    = encodeURIComponent('Hola, quiero prepararme para el examen CILS o CELI con WeLearn. ¿Cuándo puedo empezar?');

export const metadata: Metadata = {
  title: 'Clases de italiano en Bucaramanga y online — CILS y CELI',
  description:
    'Academia de italiano en Bucaramanga y online. Preparación del B1 para la ciudadanía italiana y de CILS y CELI, de A2 a C2. Diagnóstico gratis.',
  keywords: [
    'clases de italiano Bucaramanga',
    'academia de italiano Bucaramanga',
    'curso de italiano Bucaramanga',
    'profesor de italiano Bucaramanga',
    'italiano para ciudadanía italiana',
    'examen B1 italiano ciudadanía',
    'preparación CILS Colombia',
    'preparación CELI Colombia',
    'clases de italiano online Colombia',
    'aprender italiano desde cero',
    'consulado de Italia Bucaramanga',
    'WeLearn italiano',
  ],
  openGraph: {
    title: 'Clases de Italiano en Bucaramanga y Online — B1 de Ciudadanía',
    description:
      'Presencial en Bucaramanga y online en toda Colombia. Preparación del B1 para la ciudadanía italiana, CILS y CELI. Diagnóstico gratis.',
    url: 'https://www.idiomaswl.com/clases-de-italiano',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/clases-de-italiano' },
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
      name: 'Italiano con el método WeLearn',
      description: 'Aprende italiano desde cero hasta CILS/CELI C2. Preparación para ciudadanía italiana, estudios y trabajo en Italia.',
      provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
      hasCourseInstance: courseInstances('Italiano', 'it'),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'COP', description: 'Clase de diagnóstico gratis', availability: 'https://schema.org/InStock' },
    },
    localBusinessNode(
      'Academia de idiomas en Bucaramanga con clases presenciales y online para toda Colombia. Italiano con preparación CILS y CELI, incluida la ruta B1 para la ciudadanía italiana, además de inglés, francés, coreano, alemán y portugués.'
    ),
    davidNode(
      'Políglota activo en ocho idiomas. El italiano fue el segundo que aprendió, justo después del inglés, y es el que mejor demuestra cuánta ventaja da partir del español.'
    ),
    zhannaNode(
      'Co-fundadora y directora académica de WeLearn, formada en Francia e Inglaterra. Lidera el diseño curricular y la preparación de certificaciones oficiales de italiano.',
      ['es', 'en', 'fr']
    ),
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
  { icon: '🎯', title: 'Diagnóstico gratis', desc: 'Evaluamos tu nivel real, entendemos tu objetivo (ciudadanía, CILS, viaje o trabajo) y diseñamos tu plan personalizado.' },
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
  { q: '¿Dónde puedo presentar el CILS o el CELI en Colombia?', a: 'El CILS se presenta en el Istituto Italiano di Cultura de Bogotá, su sede en el país. El PLIDA lo administra la Sociedad Dante Alighieri, con comités en Bogotá y Cartagena, y también se presenta en Medellín a través de la Universidad EAFIT. No hay sede en Bucaramanga ni en Santander, así que desde aquí toca viajar. El calendario cambia cada año: confirma sede y fecha antes de inscribirte.' },
  { q: '¿Cuánto se demora el resultado del CILS B1?', a: 'Cuenta con meses, no con semanas. La corrección del CILS toma alrededor de tres meses y el certificado físico puede llegar medio año después del examen. El CELI publica resultados en torno a los tres meses. Si tienes cita consular con fecha fija, planea hacia atrás desde ahí: es el error de cálculo más común.' },
  { q: '¿Cuánto tiempo toma llegar a B1 en italiano si ya hablo español?', a: 'Entre 6 y 12 meses estudiando de 3 a 5 horas por semana. Es más rápido que la referencia general del MCER porque compartes gramática y buena parte del vocabulario con el italiano.' },
  { q: '¿Dónde puedo estudiar italiano en Bucaramanga?', a: 'En Idiomas WeLearn, en la Calle 47 # 29-33, barrio Sotomayor. Damos clases presenciales en Bucaramanga, Floridablanca, Girón y Piedecuesta, y online al resto del país. Varias universidades de la ciudad tienen cursos de italiano, pero suelen quedarse en niveles iniciales y estar dirigidos a su propia comunidad; nosotros llevamos hasta el B1 de ciudadanía y más allá. El diagnóstico inicial es gratis: escríbenos al 300 500 4253.' },
  { q: '¿Hay consulado de Italia en Bucaramanga?', a: 'Sí. Italia tiene un consulado honorario en Bucaramanga cuya jurisdicción cubre Santander, Norte de Santander y Arauca, y atiende con cita previa. Ojo con la confusión más común: el consulado gestiona el trámite, pero el examen de italiano no se presenta ahí ni en la ciudad — para eso hay que viajar, normalmente a Bogotá.' },
  { q: '¿Puedo presentar el examen B1 de italiano en Bucaramanga?', a: 'No. No hay sede de CILS, CELI ni PLIDA en Bucaramanga ni en Santander. El CILS se presenta en Bogotá y el PLIDA en Bogotá, Cartagena o Medellín. Lo que sí puedes hacer desde Bucaramanga es toda la preparación, presencial u online, y viajar solo el día del examen.' },
  { q: '¿Todavía existe el examen corto de "B1 Ciudadanía" en Bogotá?', a: 'No. La sede de Bogotá pasó a administrar únicamente los exámenes de los seis niveles del Marco Común Europeo y dejó de ofrecer las versiones hechas a la medida de un trámite, como el B1 de ciudadanía. Quien lo presente allí debe rendir el CILS B1 completo: cinco habilidades, cerca de cuatro horas de escrito más el oral, y un mínimo exigido en cada habilidad por separado. Casi todas las guías en español siguen describiendo el examen viejo.' },
  { q: '¿Necesito certificar italiano si voy por ciudadanía por descendencia?', a: 'Ojo, aquí hay mucha información contradictoria circulando. El requisito de certificar B1 aplica claramente a las vías por matrimonio y por residencia. Para la vía por descendencia, la Embajada de Italia en Bogotá no lista un requisito de idioma en su información oficial, pese a que varios medios lo han dado por hecho. Como las reglas cambiaron en 2025 y siguen discutiéndose, confirma tu caso concreto con el consulado antes de pagar cualquier examen.' },
  { q: '¿Cuánto cuestan las clases de italiano en Bucaramanga?', a: 'Depende de la intensidad semanal y de si tomas clases sueltas o un paquete de horas, porque el valor por hora baja a mayor volumen. El diagnóstico inicial es gratis y ahí definimos objetivo, nivel y frecuencia para darte el precio exacto de tu caso.' },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }} />
      <main className={s.page}>

        {/* HERO */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <div className={s.heroPhrase}>Ciao!</div>
              <p className={s.eyebrow}>Italiano en Bucaramanga y online · WeLearn</p>
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
          <span className={s.proofItem}><strong>Presencial en Bucaramanga</strong> · Sotomayor</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Online</strong> · toda Colombia y el mundo</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Diagnóstico</strong> gratis</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>B1 de ciudadanía · CILS y CELI</strong></span>
        </div>

        {/* ══════════════ FUNDADORES ══════════════ */}
        <FoundersBand
          accent="#009246"
          title="Dos políglotas te enseñan italiano. No un curso grabado."
          intro="Detrás de cada clase hay dos personas que aprendieron idiomas de verdad, no una app con lecciones automáticas."
          davidLine="Habla ocho idiomas. El italiano fue el segundo que aprendió, justo después del inglés — y es el que mejor demuestra cuánta ventaja te da ya hablar español."
          zhannaLine="Co-fundadora y directora académica de WeLearn, formada en Francia e Inglaterra. Diseña las rutas de certificación y controla que la preparación CILS y CELI corresponda a lo que el examen realmente evalúa."
          zhannaTags={['Lingüista titulada · Co-fundadora', 'Preparación CILS / CELI', 'Diseño curricular']}
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

        {/* ══════════════ BUCARAMANGA (SEO LOCAL) ══════════════ */}
        <LocalBand
          accent="#009246"
          idioma="italiano"
          intro="WeLearn es una academia de idiomas con sede en Bucaramanga. Si estás en la ciudad o en el área metropolitana puedes estudiar italiano presencialmente con nosotros; si prefieres no desplazarte —o vives en otra ciudad— la misma clase, con el mismo profesor y el mismo plan, se hace por videollamada."
          presencial="Clases cara a cara para quienes rinden más con el profesor al lado. Especialmente útil si vas por el B1 de ciudadanía: la prueba oral es la que más se falla y la que menos se puede improvisar."
          waText="Hola, estoy en Bucaramanga y quiero saber sobre las clases de italiano presenciales. ¿Cómo funcionan?"
        />

        {/* ══════════════ CIUDADANÍA DESDE SANTANDER (SEO LOCAL + AEO) ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Santander y el trámite italiano</p>
            <h2 className={s.h2}>Vas por la ciudadanía italiana desde Bucaramanga: esto es lo que nadie te cuenta</h2>
            <p className={s.sectionSub}>
              Bucaramanga tiene consulado honorario de Italia, pero no tiene dónde presentar el
              examen de italiano. Esa distancia entre el trámite y la certificación es el problema
              real de quien vive en Santander — y planearlo mal cuesta meses.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>El trámite</span>
                <p className={s.levelTitle}>El consulado sí está aquí</p>
                <p className={s.levelDesc}>
                  Italia tiene un consulado honorario en Bucaramanga cuya jurisdicción cubre
                  Santander, Norte de Santander y Arauca. Atiende con cita previa, así que el
                  calendario del trámite no lo pones tú.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>El examen</span>
                <p className={s.levelTitle}>Pero el examen no</p>
                <p className={s.levelDesc}>
                  No hay sede de CILS, CELI ni PLIDA en Bucaramanga ni en Santander. Toca viajar,
                  normalmente a Bogotá. Súmale el viaje al cronograma: no es solo el día del
                  examen, es la inscripción con fecha límite y la espera del resultado.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>La preparación</span>
                <p className={s.levelTitle}>Eso sí lo resolvemos acá</p>
                <p className={s.levelDesc}>
                  Las universidades de la ciudad llegan a niveles iniciales y suelen ser para su
                  propia comunidad. Nosotros te llevamos hasta el B1 completo, con las cuatro
                  pruebas entrenadas, sin que tengas que salir de Bucaramanga hasta el día del
                  examen.
                </p>
              </div>
            </div>
            <p className={s.sectionSub} style={{ marginTop: '2.5rem' }}>
              <strong>Ojo con esto si vas por descendencia:</strong> en 2025 Italia endureció las
              reglas de reconocimiento para descendientes nacidos en el exterior, y la aplicación
              de esa reforma todavía tiene discusiones abiertas en los tribunales italianos. Si tu
              vía deja de ser la de descendencia directa, es muy probable que sí termines
              necesitando certificar tu italiano. Confirma tu caso concreto con el consulado antes
              de inscribirte a cualquier examen — nosotros no asesoramos el trámite, preparamos el
              idioma.
            </p>
          </div>
        </section>

        {/* ══════════════ DÓNDE Y CUÁNDO (SEO/AEO) ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Dónde y cuándo</p>
            <h2 className={s.h2}>Dónde se presenta el examen de italiano en Colombia</h2>
            <p className={s.sectionSub}>
              Ningún examen oficial de italiano se hace online: CILS, CELI y PLIDA son presenciales,
              en sede autorizada y con documento de identidad. Si alguien te ofrece &ldquo;el examen
              oficial por internet&rdquo;, no es un certificado válido ante el Estado italiano.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>CILS</span>
                <p className={s.levelTitle}>Solo en Bogotá</p>
                <p className={s.levelDesc}>
                  El Istituto Italiano di Cultura de Bogotá es la sede del CILS en el país. Los
                  cupos por sesión son limitados y la inscripción cierra con bastante antelación
                  a la fecha del examen, así que no se puede dejar para última hora.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>PLIDA</span>
                <p className={s.levelTitle}>Bogotá, Medellín y Cartagena</p>
                <p className={s.levelDesc}>
                  El PLIDA lo administra la Società Dante Alighieri, con comités en Bogotá y
                  Cartagena, y se presenta también en Medellín a través del centro de exámenes de
                  la Universidad EAFIT. Es la alternativa si no te sirve el calendario del CILS.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Santander</span>
                <p className={s.levelTitle}>Aquí no hay sede: toca viajar</p>
                <p className={s.levelDesc}>
                  No existe sede de CILS, CELI ni PLIDA en Bucaramanga ni en ningún municipio de
                  Santander. Suma el viaje al cronograma: no es solo el día del examen, es también
                  la inscripción con fecha límite y la espera del resultado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ EL B1 CIUDADANÍA YA NO EXISTE EN BOGOTÁ (AEO diferencial) ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>El dato que casi nadie te dice</p>
            <h2 className={s.h2}>En Bogotá ya no existe el examen corto de &ldquo;B1 Ciudadanía&rdquo;</h2>
            <p className={s.sectionSub}>
              Desde 2025, el Istituto Italiano di Cultura de Bogotá administra únicamente los
              exámenes de los seis niveles del Marco Común Europeo. Dejó de ofrecer las versiones
              hechas a la medida de un trámite, entre ellas el B1 de ciudadanía. Casi todas las
              guías en español siguen describiendo el examen corto — y quien llega con esa idea
              se lleva la sorpresa el día de la inscripción.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Antes</span>
                <p className={s.levelTitle}>El examen corto de ciudadanía</p>
                <p className={s.levelDesc}>
                  Cuatro secciones, alrededor de dos horas y un oral breve. Estaba diseñado
                  específicamente para cumplir el requisito de idioma del trámite, y nada más.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Ahora</span>
                <p className={s.levelTitle}>El CILS B1 completo</p>
                <p className={s.levelDesc}>
                  Cinco habilidades y cerca de cuatro horas de prueba escrita más el oral. No basta
                  con el puntaje global: hay que alcanzar un mínimo en cada habilidad por separado,
                  así que una sola debilidad tumba el examen entero.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Qué significa</span>
                <p className={s.levelTitle}>Necesitas prepararte más, no menos</p>
                <p className={s.levelDesc}>
                  El listón subió de verdad. Por eso el plan no puede ser un repaso de tres
                  semanas: hay que entrenar las cinco habilidades, y la que más se descuida
                  —producción oral y escrita— es justo la que decide.
                </p>
              </div>
            </div>
            <p className={s.sectionSub} style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
              Los calendarios y las condiciones de inscripción cambian cada año. Confirma siempre
              con la sede antes de pagar: nosotros preparamos el idioma, no gestionamos el trámite.
            </p>
          </div>
        </section>

        {/* ══════════════ PRACTICA GRATIS ══════════════ */}
        <PracticeBand
          accent="#009246"
          title="Todo lo que puedes practicar gratis desde hoy"
          sub="No tienes que esperar a matricularte. Las cinco habilidades, los simulacros del CILS y el diagnóstico de nivel están abiertos, con corrección inmediata y sin registro."
          cards={[
            { href: '/practica/italiano/a1/gramatica', title: 'Gramática A1 · A2 · B1', desc: 'Artículos, género, presente, passato prossimo y congiuntivo. Ejercicios interactivos con corrección al instante.' },
            { href: '/practica/italiano/a1/vocabulario', title: 'Vocabulario con audio', desc: 'Palabras de alta frecuencia con audio nativo — el italiano que de verdad se habla en Italia.' },
            { href: '/practica/italiano/a1/escucha', title: 'Comprensión auditiva', desc: 'Audio a velocidad real con preguntas de comprensión, la prueba que más sorprende a quien viene del español.' },
            { href: '/practica/italiano/a1/lectura', title: 'Comprensión lectora', desc: 'Textos auténticos con preguntas al estilo del examen, para entrenar lectura rápida y detalle.' },
            { href: '/practica/italiano/a1/escritura', title: 'Escritura integrada', desc: 'Lee, prepara vocabulario y escribe una respuesta real — con modelo de nivel para comparar la tuya.' },
            { href: '/practica/italiano/a1/habla', title: 'Expresión oral', desc: 'Frases y estructuras para hablar desde el primer día. Clave para la prueba oral del B1 de ciudadanía.' },
            { href: '/herramientas/quizes/italiano', title: 'Quiz de tiempos verbales', desc: 'Elige los tiempos y completa seis niveles. La corrección aparece únicamente al terminar cada nivel.' },
            { href: '/practica/italiano/b1', title: 'Nivel B1 completo', desc: 'El nivel exacto que exige el Estado italiano para la ciudadanía: gramática, escucha, lectura y escritura.' },
            { href: '/examenes/cils-celi', title: 'Simulacros CILS y CELI', desc: 'Practica con el formato real del examen y recibe un informe con tu desempeño por sección.' },
            { href: '/nivel-radar', title: 'Descubre tu nivel real', desc: 'Si no sabes por dónde empezar, el diagnóstico de nivel te ubica en el MCER antes de la primera clase.' },
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
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
