import type { Metadata } from 'next';
import Link from 'next/link';
import FoundersBand from '@/components/hub/FoundersBand';
import LocalBand from '@/components/hub/LocalBand';
import PracticeBand from '@/components/hub/PracticeBand';
import { localBusinessNode, davidNode, zhannaNode, courseInstances } from '@/components/hub/localBusiness';
import s from './page.module.css';

const WA = '573005004253';
const WA_GENERAL = encodeURIComponent('Hola, vi la página de clases de japonés en WeLearn y quiero agendar mi diagnóstico gratis.');
const WA_JLPT    = encodeURIComponent('Hola, quiero prepararme para el JLPT con WeLearn. ¿Cómo funciona el plan?');

export const metadata: Metadata = {
  title: 'Clases de Japonés en Bucaramanga y Online — Desde Cero y JLPT | WeLearn',
  description:
    'Academia de japonés en Bucaramanga con clases presenciales y online para toda Colombia. Del hiragana al JLPT, con preparación para becas de estudio en Japón. Diagnóstico gratis.',
  keywords: [
    'clases de japonés Bucaramanga',
    'curso de japonés Bucaramanga',
    'clases de japonés online',
    'clases de japonés para principiantes',
    'aprender japonés desde cero',
    'JLPT Colombia',
    'hiragana katakana kanji',
    'becas MEXT Colombia',
    'estudiar en Japón desde Colombia',
    'profesor de japonés particular',
    'academia de japonés Colombia',
    'WeLearn japonés',
  ],
  openGraph: {
    title: 'Clases de Japonés en Bucaramanga y Online — Desde Cero y JLPT | WeLearn',
    description:
      'Presencial en Bucaramanga y online en toda Colombia. Del hiragana al JLPT, con la ruta real hacia las becas de estudio en Japón. Diagnóstico gratis.',
    url: 'https://www.idiomaswl.com/clases-de-japones',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/clases-de-japones' },
};

const FAQS = [
  {
    q: '¿Es muy difícil aprender japonés siendo latino?',
    a: 'Es de los idiomas más exigentes según la escala del Foreign Service Institute estadounidense, que lo ubica en el grupo más difícil junto al chino, el árabe y el coreano, con unas 2.200 horas de instrucción para competencia profesional. Pero esa dificultad no está repartida por igual, y aquí viene la buena noticia: la pronunciación es notablemente fácil para un hispanohablante. El japonés tiene cinco vocales —a, e, i, o, u—, las mismas cinco del español, mientras el inglés tiene alrededor de veinte. Lo que de verdad cuesta es la escritura y la gramática, nunca hablar.',
  },
  {
    q: '¿Cuánto tiempo se tarda en aprender japonés básico?',
    a: 'No existe una cifra oficial única, y desconfía de quien te dé uno exacto. La referencia del Foreign Service Institute son unas 2.200 horas, pero eso es para nivel profesional, no para defenderte. Los niveles iniciales son mucho más cortos: el N5 del JLPT acredita entender japonés básico y se alcanza con varios meses de estudio constante. El hiragana y el katakana juntos son apenas 92 caracteres, un conjunto cerrado que se domina en las primeras semanas.',
  },
  {
    q: '¿Cuántos kanji necesito para el JLPT N5?',
    a: 'Las cifras que circulan hablan de unos 100 kanji para N5, cerca de 300 para N4, 650 para N3, 1.000 para N2 y más de 2.000 para N1. Importante y casi nadie lo dice: desde la revisión de 2010 la Fundación Japón dejó de publicar listas oficiales de kanji por nivel, precisamente para evaluar uso real del idioma y no memorización de listas. Esas cifras son estimaciones de la comunidad basadas en exámenes anteriores, no requisitos oficiales.',
  },
  {
    q: '¿Se puede presentar el JLPT en Colombia?',
    a: 'Sí, pero solo en Bogotá. La sede en Colombia es la Universidad de los Andes. La inscripción es completamente virtual y está habilitada de forma explícita para quienes viven fuera de Bogotá, así que el trámite lo puedes hacer desde Bucaramanga; lo que sí implica viajar es el día del examen. Se ofrecen los cinco niveles, de N5 a N1.',
  },
  {
    q: '¿Cuántas veces al año se aplica el JLPT en Colombia?',
    a: 'Una sola vez, y esto cambia por completo cómo debes planear tu estudio. A nivel mundial el JLPT se aplica dos veces al año, en julio y en diciembre, pero en Colombia solo hay convocatoria de julio: no hay examen en diciembre. La inscripción abre meses antes, alrededor de marzo. Si pierdes esa fecha, esperas doce meses hasta la siguiente.',
  },
  {
    q: '¿Sirve de algo el certificado JLPT o es solo un papel?',
    a: 'Sirve, y está reconocido oficialmente por el gobierno japonés para trámites concretos. El N5 cumple el requisito de idioma para la visa de estudiante. El N4 habilita la visa de trabajador con habilidades específicas, que es una visa laboral real. El N2 es la referencia para admisión universitaria y para varias visas profesionales. Y en el sistema de puntos para profesionales altamente calificados, el N2 otorga diez puntos y el N1 quince.',
  },
  {
    q: '¿Hay becas para estudiar en Japón si soy colombiano?',
    a: 'Sí. La Embajada del Japón en Colombia gestiona varios programas de becas del gobierno japonés, que cubren pregrado, posgrado e investigación, carreras tecnológicas y estudios sobre Japón, entre otros. Suelen cubrir matrícula, un estipendio mensual y los pasajes, e incluyen curso preparatorio de idioma. Los requisitos y las fechas cambian en cada convocatoria, así que consúltalos siempre en el sitio oficial de la Embajada antes de organizar nada.',
  },
  {
    q: '¿Hay clases de japonés presenciales en Bucaramanga?',
    a: 'Sí, en Idiomas WeLearn, en nuestra sede de Calle 47 # 29-33, barrio Sotomayor. Es una oferta poco común en la ciudad: ninguna de las universidades locales incluye japonés en su catálogo de idiomas, y en las plataformas de tutores particulares aparece apenas un profesor para toda Bucaramanga, frente a decenas en Bogotá.',
  },
  {
    q: '¿Dónde puedo estudiar japonés en Bucaramanga o Floridablanca?',
    a: 'En Idiomas WeLearn dictamos japonés presencial en la sede de Sotomayor, en Bucaramanga, y atendemos también a estudiantes de Floridablanca, Girón y Piedecuesta. Si estás fuera del área metropolitana o prefieres otro horario, las mismas clases se dan online. Escríbenos por WhatsApp al 300 500 4253 y revisamos horarios.',
  },
  {
    q: '¿Puedo prepararme en Bucaramanga para presentar el JLPT?',
    a: 'Sí. Toda la preparación se puede hacer desde Bucaramanga, presencial u online. Lo que no está aquí es la sede del examen: el JLPT solo se aplica en Bogotá, así que ese día hay que viajar. Como la inscripción abre alrededor de marzo y el examen es en julio, conviene armar el calendario de estudio en función de esa única fecha anual.',
  },
  {
    q: '¿Cuánto cuestan las clases de japonés en Bucaramanga?',
    a: 'Depende de la modalidad, individual o grupal, presencial u online, y de la intensidad semanal. El diagnóstico inicial es gratis y ahí definimos objetivo, nivel y frecuencia para darte el precio exacto de tu caso. Escríbenos por WhatsApp al 300 500 4253.',
  },
];

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
      name: 'Japonés con el método WeLearn',
      description:
        'Aprende japonés desde el hiragana hasta el JLPT con profesores reales. Preparación para el examen oficial y para las becas de estudio en Japón.',
      provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
      hasCourseInstance: courseInstances('Japonés', 'ja'),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'COP',
        description: 'Diagnóstico gratis',
        availability: 'https://schema.org/InStock',
      },
    },
    localBusinessNode(
      'Academia de idiomas en Bucaramanga con clases presenciales y online para toda Colombia. Japonés desde cero con preparación del JLPT, además de inglés, francés, italiano, portugués, alemán, coreano y ruso.'
    ),
    davidNode(
      'Políglota activo en ocho idiomas y co-fundador de WeLearn. El japonés está entre los últimos que aprendió, ya con el método completo, y de ahí sale la ruta que la academia usa para lenguas lejanas al español.'
    ),
    zhannaNode(
      'Co-fundadora y directora académica de WeLearn, formada en Francia e Inglaterra. Lidera el diseño curricular y las rutas de certificación de la academia.',
      ['es', 'en', 'fr', 'ru']
    ),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de Japonés', item: 'https://www.idiomaswl.com/clases-de-japones' },
      ],
    },
  ],
};

const JLPT_LEVELS = [
  {
    tag: 'N5 · N4',
    title: 'Los primeros escalones',
    desc: 'El N5 acredita japonés básico y cumple el requisito de idioma de la visa de estudiante. El N4 es el primero que habilita una visa de trabajo real, la de trabajador con habilidades específicas.',
    time: 'El punto de partida',
  },
  {
    tag: 'N3',
    title: 'El nivel puente',
    desc: 'Ya entiendes textos cotidianos y titulares de prensa, y la escucha va casi a velocidad natural. Es el escalón donde el japonés deja de ser un pasatiempo y empieza a ser una herramienta.',
    time: 'El salto grande',
  },
  {
    tag: 'N2 · N1',
    title: 'Universidad y trabajo profesional',
    desc: 'El N2 es la referencia para admisión universitaria y para varias visas profesionales. En el sistema de puntos para profesionales altamente calificados, el N2 suma diez puntos y el N1 quince.',
    time: 'La meta seria',
  },
];

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

export default function ClasesDeJaponesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className={s.page}>

        {/* ══════════════ HERO ══════════════ */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <div className={s.heroPhrase}>はじめまして</div>
              <p className={s.eyebrow}>Japonés en Bucaramanga y online · WeLearn</p>
              <h1 className={s.h1}>
                Aprende japonés<br />
                <span className={s.accent}>desde cero.</span>
              </h1>
              <p className={s.heroSub}>
                Tiene fama de imposible y esa fama es solo medio cierta. Hablarlo se te va a dar
                mejor de lo que crees; lo que exige método es la escritura y la gramática.
                <strong> Presencial en Bucaramanga u online desde cualquier ciudad.</strong>
              </p>
              <div className={s.heroCtas}>
                <a href={`https://wa.me/${WA}?text=${WA_GENERAL}`} target="_blank" rel="noopener noreferrer" className={s.waBtn}>
                  <WaIcon />
                  Diagnóstico gratis
                </a>
                <Link href="/practica/japones" className={s.ghostBtn}>
                  Practicar japonés gratis →
                </Link>
              </div>
            </div>

            <div className={s.heroVisual}>
              <div className={s.heroCard}>
                <span className={s.heroCardFlag}>🇯🇵</span>
                <p className={s.heroCardTitle}>JLPT</p>
                <p className={s.heroCardSub}>El examen oficial de japonés. En Colombia se aplica una sola vez al año, y solo en Bogotá.</p>
                <div className={s.levelBadges}>
                  {['N5','N4','N3','N2','N1'].map(l => (
                    <span key={l} className={s.levelBadge}>{l}</span>
                  ))}
                </div>
              </div>
              <div className={s.heroCard}>
                <p className={s.heroCardTitle}>¿Por qué japonés?</p>
                <p className={s.heroCardSub}>
                  • Las mismas cinco vocales del español<br />
                  • Becas del gobierno japonés abiertas a colombianos<br />
                  • El N4 habilita una visa de trabajo real<br />
                  • Ninguna universidad lo enseña en Bucaramanga
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
          <span className={s.proofItem}><strong>Ruta JLPT</strong> N5 a N1</span>
        </div>

        {/* ══════════════ FUNDADORES ══════════════ */}
        <FoundersBand
          accent="#BC002D"
          title="Dos políglotas te enseñan japonés. No un curso grabado."
          intro="Detrás de cada clase hay dos personas que aprendieron idiomas de verdad, incluidos los que se consideran difíciles."
          davidLine="Habla ocho idiomas. Llegó al japonés casi al final del recorrido, con el método ya probado en lenguas lejanas al español, y por eso sabe qué atajos sirven y cuáles hacen perder meses."
          zhannaLine="Co-fundadora y directora académica de WeLearn, formada en Francia e Inglaterra. Diseña las rutas de nivel y controla que la preparación del JLPT corresponda a lo que el examen realmente evalúa."
          zhannaTags={['Co-fundadora · Dir. académica', 'Rutas de certificación', 'Diseño curricular']}
        />

        {/* ══════════════ DIFICULTAD (AEO estrella) ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>La objeción de siempre</p>
            <h2 className={s.h2}>¿Es difícil el japonés? Lo que de verdad cuesta y lo que no</h2>
            <p className={s.sectionSub}>
              El japonés tiene cinco vocales: a, e, i, o, u — <strong>las mismas cinco del
              español</strong>. El inglés tiene alrededor de veinte. Por eso un colombiano suena
              natural en japonés casi desde la primera clase, algo que a un angloparlante le toma
              meses. La dificultad del japonés está en la escritura y en la gramática, nunca en la
              pronunciación.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Falso mito</span>
                <p className={s.levelTitle}>&ldquo;Los sonidos son rarísimos&rdquo;</p>
                <p className={s.levelDesc}>
                  Al contrario: es la parte más fácil para ti. Además de las vocales, el japonés
                  tiene un ritmo parecido al del español, no el ritmo acentual del inglés. Leer
                  &ldquo;sakura&rdquo; o &ldquo;arigatou&rdquo; te sale bien al primer intento; a un
                  angloparlante no.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Verdad a medias</span>
                <p className={s.levelTitle}>&ldquo;Son miles de kanji&rdquo;</p>
                <p className={s.levelDesc}>
                  El problema real no es la cantidad, son las lecturas múltiples: un mismo kanji
                  cambia de sonido según la palabra en que aparece. Y ojo con el otro lado: el
                  hiragana y el katakana juntos son solo 92 caracteres, un conjunto cerrado y
                  finito. Esa parte se domina pronto.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Lo que sí cuesta</span>
                <p className={s.levelTitle}>Las partículas y el verbo al final</p>
                <p className={s.levelDesc}>
                  El japonés pone el verbo al final, así que reordenas la frase entera respecto al
                  español. Y las partículas —は, が, を, に, で— no tienen equivalente y son donde
                  más se traba un hispanohablante. Súmale los registros de cortesía, que cambian la
                  forma según con quién hables.
                </p>
              </div>
            </div>
            <p className={s.sectionSub} style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
              Sin adornos: el Foreign Service Institute ubica al japonés en su grupo más exigente,
              con unas 2.200 horas para competencia profesional. Esa escala está calibrada para
              angloparlantes y mide nivel profesional, no conversación. Es un compromiso largo, y
              preferimos decírtelo antes que después.
            </p>
          </div>
        </section>

        {/* ══════════════ JLPT EN COLOMBIA (AEO diferencial) ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>El examen oficial</p>
            <h2 className={s.h2}>En Colombia el JLPT se aplica una sola vez al año</h2>
            <p className={s.sectionSub}>
              Este es el dato que más planes desbarata y que casi nadie publica. En el mundo el
              JLPT tiene dos convocatorias, julio y diciembre. <strong>En Colombia solo existe la
              de julio.</strong> Si la pierdes, esperas doce meses. Y la sede es única: Bogotá.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Dónde</span>
                <p className={s.levelTitle}>Solo en Bogotá</p>
                <p className={s.levelDesc}>
                  La sede en Colombia es la Universidad de los Andes, y se ofrecen los cinco
                  niveles. No hay sede en Bucaramanga ni en Santander, así que el día del examen
                  hay que viajar. Lo bueno: la inscripción es virtual y está habilitada
                  expresamente para quienes viven fuera de Bogotá.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Cuándo</span>
                <p className={s.levelTitle}>Inscripción en marzo, examen en julio</p>
                <p className={s.levelDesc}>
                  La ventana de inscripción abre meses antes del examen y dura pocas semanas. Es
                  decir: la decisión de presentarte se toma a comienzos de año, no en junio. Por
                  eso el plan de estudio se arma hacia atrás desde esa fecha.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Qué implica</span>
                <p className={s.levelTitle}>Una sola bala al año</p>
                <p className={s.levelDesc}>
                  Con dos convocatorias puedes arriesgarte y repetir en seis meses. Con una sola,
                  presentarse &ldquo;a ver qué pasa&rdquo; sale caro. Conviene llegar con margen y
                  apuntar al nivel que de verdad tienes asegurado.
                </p>
              </div>
            </div>
            <p className={s.sectionSub} style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
              Las fechas, los cupos y el valor de la inscripción cambian cada año. Confirma siempre
              la convocatoria vigente en la fuente oficial antes de organizar el viaje.
            </p>
          </div>
        </section>

        {/* ══════════════ NIVELES JLPT ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Niveles</p>
            <h2 className={s.h2}>Qué te abre cada nivel del JLPT</h2>
            <p className={s.sectionSub}>
              El JLPT no es solo un diploma para la pared: el gobierno japonés lo usa como
              requisito en trámites concretos. Saber a qué nivel apuntas cambia el plan por
              completo.
            </p>
            <div className={s.levelsGrid}>
              {JLPT_LEVELS.map(l => (
                <div key={l.tag} className={s.levelCard}>
                  <span className={s.levelTag}>{l.tag}</span>
                  <p className={s.levelTitle}>{l.title}</p>
                  <p className={s.levelDesc}>{l.desc}</p>
                  <p className={s.levelTime}>⏱ {l.time}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <a href={`https://wa.me/${WA}?text=${WA_JLPT}`} target="_blank" rel="noopener noreferrer" className={s.waBtn}>
                <WaIcon /> Quiero prepararme para el JLPT →
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════ BUCARAMANGA (SEO LOCAL) ══════════════ */}
        <LocalBand
          accent="#BC002D"
          idioma="japonés"
          intro="WeLearn es una academia de idiomas con sede en Bucaramanga. Si estás en la ciudad o en el área metropolitana puedes estudiar japonés presencialmente con nosotros; si prefieres no desplazarte —o vives en otra ciudad— la misma clase, con el mismo profesor y el mismo plan, se hace por videollamada."
          presencial="Aquí el dato es contundente: ninguna universidad de Bucaramanga incluye japonés en su catálogo de idiomas, y en las plataformas de tutores aparece apenas un profesor para toda la ciudad. Somos de las poquísimas opciones con sede física."
          waText="Hola, estoy en Bucaramanga y quiero saber sobre las clases de japonés presenciales. ¿Cómo funcionan?"
        />

        {/* ══════════════ PARA QUÉ SIRVE ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Para qué te sirve</p>
            <h2 className={s.h2}>Becas, visas y —sí— también el anime</h2>
            <p className={s.sectionSub}>
              Vale la pena ser honestos sobre dónde está la oportunidad real y dónde no, para que
              elijas con la información completa.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Becas</span>
                <p className={s.levelTitle}>Estudiar en Japón, pagado</p>
                <p className={s.levelDesc}>
                  La Embajada del Japón en Colombia gestiona varios programas de becas del gobierno
                  japonés: pregrado, posgrado e investigación, carreras tecnológicas y estudios
                  sobre Japón. Suelen cubrir matrícula, estipendio y pasajes, e incluyen curso
                  preparatorio de idioma. Es la vía con más retorno de todas.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Trabajo</span>
                <p className={s.levelTitle}>La demanda está en Japón, no aquí</p>
                <p className={s.levelDesc}>
                  Seamos claros: hay empresas japonesas en Colombia, pero la mayoría opera en
                  español o inglés y no exige japonés. El mercado laboral que sí lo pide está en
                  Japón, y se accede por la escalera del JLPT: N4 para la visa de trabajador con
                  habilidades específicas, N2 para perfiles profesionales.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Cultura</span>
                <p className={s.levelTitle}>Si llegaste por el anime, bienvenido</p>
                <p className={s.levelDesc}>
                  Es una motivación tan válida como cualquier otra, y de hecho es la que más
                  sostiene el estudio a largo plazo. Solo conviene saber que entender una serie sin
                  subtítulos no llega con un curso corto: el N5 es el primer escalón real de ese
                  camino.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ PRACTICA GRATIS ══════════════ */}
        <PracticeBand
          accent="#BC002D"
          title="Empieza hoy, gratis, sin registro"
          sub="Hiragana, gramática, vocabulario con audio, escucha, lectura y escritura. Compruébalo tú mismo antes de matricularte."
          cards={[
            { href: '/practica/japones/a1/gramatica', title: 'Gramática A1 · A2 · B1', desc: 'Partículas, orden de la frase y formas de cortesía, explicadas desde el español en los tres niveles.' },
            { href: '/practica/japones/a1/vocabulario', title: 'Vocabulario con audio', desc: 'Palabras de alta frecuencia con audio nativo, para acostumbrar el oído desde el primer día.' },
            { href: '/practica/japones/a1/lectura', title: 'Comprensión lectora', desc: 'La mejor forma de automatizar el hiragana y el katakana: leer de verdad, no memorizar tablas.' },
            { href: '/practica/japones/a1/escucha', title: 'Comprensión auditiva', desc: 'Audio a velocidad real con preguntas de comprensión, desde nivel principiante.' },
            { href: '/practica/japones/a1/escritura', title: 'Escritura', desc: 'Escribe en japonés con modelo de nivel para comparar tu respuesta.' },
            { href: '/practica/japones/a1/habla', title: 'Expresión oral', desc: 'Frases y estructuras para hablar desde el principio, aprovechando tu ventaja de pronunciación.' },
            { href: '/practica/japones/b1', title: 'Nivel B1 completo', desc: 'Gramática, escucha, lectura y escritura de nivel intermedio, camino a los niveles altos del JLPT.' },
            { href: '/nivel-radar', title: 'Descubre tu nivel real', desc: 'Si ya sabes algo de japonés, el diagnóstico te ubica antes de la primera clase.' },
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

        {/* ══════════════ CTA ══════════════ */}
        <section className={s.ctaSection}>
          <div className={s.wrap}>
            <h2 className={s.ctaTitle}>Tu diagnóstico de japonés<br /><span className={s.accent}>es gratis.</span></h2>
            <p className={s.ctaSub}>
              Media hora para ver dónde estás, a dónde quieres llegar y cuánto te va a tomar de
              verdad. Sin compromiso.
            </p>
            <a href={`https://wa.me/${WA}?text=${WA_GENERAL}`} target="_blank" rel="noopener noreferrer" className={s.waBtn}>
              <WaIcon /> Agendar diagnóstico gratis
            </a>
          </div>
        </section>

      </main>
    </>
  );
}
