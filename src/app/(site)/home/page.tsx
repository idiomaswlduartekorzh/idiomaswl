import type { Metadata } from 'next';
import Link from 'next/link';
import LessonTabs from './LessonTabs';
import FAQ from './FAQ';
import HeroLangSelector from './HeroLangSelector';
import { BLOG_POSTS } from '@/data/blog';
import {
  FadeUp, StaggerGrid, StaggerItem,
  HeroLeft, HeroItem, HeroCard,
  StatsRow, StatItem, StepRow,
  CountUp, TiltCard, TeamCard, TestimonialCard,
} from './HomeAnimations';

// Mensaje pre-escrito de WhatsApp para la clase de diagnóstico gratis (CRM = WhatsApp)
const WA_DIAGNOSTICO =
  'https://wa.me/573005004253?text=Hola%2C%20quiero%20agendar%20mi%20clase%20de%20diagn%C3%B3stico%20gratis.';

export const metadata: Metadata = {
  title: 'Academia de idiomas en Bucaramanga y online — Aprende en serio',
  description:
    'Academia de idiomas con sede presencial en Bucaramanga y clases online en toda Colombia y el mundo. Profesores reales, método propio de 11 pasos y preparación para IELTS, TOEFL, ICFES, TOPIK, Goethe, DELF y más. Clase de diagnóstico gratis.',
  keywords: [
    'academia de idiomas online colombia', 'clases de idiomas bucaramanga',
    'curso de ingles online colombia', 'preparación IELTS', 'preparación TOEFL',
    'ICFES saber 11 inglés', 'aprender coreano desde cero', 'curso de alemán goethe',
    'profesor de inglés bucaramanga', 'método WeLearn once pasos',
  ],
  openGraph: {
    title: 'Idiomas WeLearn — Academia de idiomas en Bucaramanga y online',
    description:
      'Presencial en Bucaramanga y online en toda Colombia. Profesores reales, método de 11 pasos y preparación de exámenes internacionales. Clase de diagnóstico gratis.',
    url: 'https://www.idiomaswl.com/home',
  },
  alternates: {
    canonical: 'https://www.idiomaswl.com/home',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.idiomaswl.com/#organization',
      name: 'Idiomas WeLearn',
      url: 'https://www.idiomaswl.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.idiomaswl.com/images/welearn-logo.png',
      },
      description:
        'Academia de idiomas con sede presencial en Bucaramanga y clases online en toda Colombia y el mundo. Método WeLearn de once etapas diarias para interiorizar vocabulario, gramática y pronunciación.',
      sameAs: [
        'https://www.tiktok.com/@idiomas.welearn',
        'https://www.instagram.com/idiomas_welearn/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+573005004253',
        availableLanguage: ['es', 'en'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.idiomaswl.com/#website',
      url: 'https://www.idiomaswl.com',
      name: 'Idiomas WeLearn',
      description: 'Aprende inglés, coreano, francés, alemán y más — presencial en Bucaramanga y online.',
      publisher: { '@id': 'https://www.idiomaswl.com/#organization' },
    },
    {
      '@type': ['EducationalOrganization', 'LocalBusiness'],
      '@id': 'https://www.idiomaswl.com/#edu',
      name: 'Idiomas WeLearn',
      url: 'https://www.idiomaswl.com',
      description:
        'Academia de idiomas y preparación de exámenes internacionales (TOEFL, IELTS, ICFES, TOPIK, Goethe, DELF, CILS, CELPE-Bras). Clases presenciales en Bucaramanga y online en toda Colombia y el mundo.',
      telephone: '+573005004253',
      priceRange: '$$',
      image: 'https://www.idiomaswl.com/images/welearn-logo.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bucaramanga',
        addressRegion: 'Santander',
        addressCountry: 'CO',
      },
      areaServed: [
        { '@type': 'City', name: 'Bucaramanga' },
        { '@type': 'Country', name: 'Colombia' },
        'Online',
      ],
      sameAs: [
        'https://www.tiktok.com/@idiomas.welearn',
        'https://www.instagram.com/idiomas_welearn/',
      ],
      parentOrganization: { '@id': 'https://www.idiomaswl.com/#organization' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Idiomas y exámenes disponibles',
        itemListElement: [
          { '@type': 'Course', name: 'Inglés — TOEFL / IELTS / ICFES', description: 'Clases de inglés y preparación para certificaciones internacionales con simulacros completos.', provider: { '@id': 'https://www.idiomaswl.com/#organization' } },
          { '@type': 'Course', name: 'Coreano — TOPIK', description: 'Aprende coreano desde cero con el método visual WeLearn y prepárate para el TOPIK.', provider: { '@id': 'https://www.idiomaswl.com/#organization' } },
          { '@type': 'Course', name: 'Alemán — Goethe-Zertifikat', description: 'Cursos de alemán y preparación para los exámenes Goethe A1–C2.', provider: { '@id': 'https://www.idiomaswl.com/#organization' } },
          { '@type': 'Course', name: 'Francés — DELF / DALF', description: 'Aprende francés y practica para el DELF y el DALF.', provider: { '@id': 'https://www.idiomaswl.com/#organization' } },
          { '@type': 'Course', name: 'Italiano — CILS / CELI', description: 'Cursos de italiano y preparación para las certificaciones CILS y CELI.', provider: { '@id': 'https://www.idiomaswl.com/#organization' } },
          { '@type': 'Course', name: 'Portugués — CELPE-Bras', description: 'Aprende portugués y prepárate para el CELPE-Bras.', provider: { '@id': 'https://www.idiomaswl.com/#organization' } },
        ],
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.idiomaswl.com/#david',
      name: 'José David Duarte Silva',
      jobTitle: 'Políglota y co-fundador de Idiomas WeLearn',
      description: 'Políglota activo en 8 idiomas (español, inglés, coreano, alemán, portugués, italiano y francés), docente de idiomas y fundador de WeLearn. Especialista en preparación de exámenes internacionales.',
      url: 'https://www.idiomaswl.com/home',
      image: 'https://www.idiomaswl.com/images/david-duarte.jpg',
      worksFor: { '@id': 'https://www.idiomaswl.com/#organization' },
      knowsLanguage: ['es', 'en', 'ko', 'de', 'pt', 'it', 'fr'],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.idiomaswl.com/#zhanna',
      name: 'Zhanna Korzh',
      jobTitle: 'Directora Académica de Idiomas WeLearn',
      description: 'Directora académica de WeLearn. Lidera el diseño curricular y la preparación de exámenes internacionales de la academia.',
      url: 'https://www.idiomaswl.com/home',
      worksFor: { '@id': 'https://www.idiomaswl.com/#organization' },
    },
  ],
};

// FAQ answer-first optimizado para AEO — DEBE coincidir con FAQ.tsx (contenido visible)
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuál es la mejor academia de idiomas online en Colombia?',
      acceptedAnswer: { '@type': 'Answer', text: 'Idiomas WeLearn es una academia colombiana especializada en aprendizaje de idiomas y preparación de exámenes internacionales, con sede presencial en Bucaramanga y clases online en todo el país y el mundo. Enseña seis idiomas con profesores reales y un método propio de 11 pasos, con más de 1000 estudiantes preparados.' },
    },
    {
      '@type': 'Question',
      name: '¿Dónde preparar el TOEFL o el IELTS en Bucaramanga?',
      acceptedAnswer: { '@type': 'Answer', text: 'En Bucaramanga puedes prepararte para el TOEFL y el IELTS en Idiomas WeLearn, de forma presencial en su sede o en línea. Ofrece rutas específicas por examen con simulacros reales, retroalimentación por sección y tutoría personalizada, en lugar de un curso genérico de inglés.' },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta aprender inglés en Colombia?',
      acceptedAnswer: { '@type': 'Answer', text: 'En Colombia, un curso de inglés en academia cuesta entre 150.000 y 526.000 pesos al mes, y las clases particulares van de 20.000 a 150.000 pesos la hora. La preparación de exámenes como TOEFL o IELTS puede superar el millón de pesos mensuales. WeLearn ofrece planes con precio transparente, sin costos ocultos.' },
    },
    {
      '@type': 'Question',
      name: '¿Cómo aprender un idioma sin usar apps que no funcionan?',
      acceptedAnswer: { '@type': 'Answer', text: 'Las apps enseñan palabras sueltas, pero no producción real ni conversación. Para aprender un idioma de verdad necesitas exposición, práctica guiada con un profesor y repaso espaciado. El método de 11 pasos de WeLearn estructura cada día en esas fases, imitando cómo el cerebro interioriza una lengua materna.' },
    },
    {
      '@type': 'Question',
      name: '¿En cuánto tiempo se llega a un nivel B2 en inglés?',
      acceptedAnswer: { '@type': 'Answer', text: 'Alcanzar un B2 requiere entre 500 y 600 horas de aprendizaje guiado, normalmente de 1 a 2 años con estudio constante y acompañamiento de un profesor. En WeLearn, una clase de diagnóstico gratuita evalúa tu punto de partida y define un plan con fecha realista para tu objetivo.' },
    },
    {
      '@type': 'Question',
      name: '¿Las clases de WeLearn son online o presenciales?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ambas. Idiomas WeLearn tiene sede presencial en Bucaramanga para clases cara a cara, y modalidad online para estudiantes en el resto de Colombia y el mundo. En los dos casos las clases son con profesores reales y tutor asignado, no lecciones automatizadas.' },
    },
    {
      '@type': 'Question',
      name: '¿WeLearn prepara para exámenes oficiales de idiomas?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí. WeLearn ofrece rutas de preparación para TOEFL, IELTS, ICFES Saber 11, TOPIK de coreano, Goethe de alemán, DELF y DALF de francés, CILS de italiano y CELPE-Bras de portugués, con simulacros construidos a partir de los exámenes oficiales y retroalimentación por sección.' },
    },
    {
      '@type': 'Question',
      name: '¿Cómo funciona la clase de diagnóstico gratuita?',
      acceptedAnswer: { '@type': 'Answer', text: 'Es una sesión de 30 a 45 minutos con un tutor de WeLearn donde evaluamos tu nivel real, entendemos tu objetivo (examen, trabajo o migración) y te damos un plan de preparación personalizado. Sin compromiso de matrícula.' },
    },
  ],
};

const IDIOMAS = [
  { code: 'En', name: 'Inglés',    native: 'English',   desc: 'IELTS · TOEFL · ICFES',   active: true,  href: '/clases-de-ingles'  },
  { code: '한', name: 'Coreano',   native: '한국어',    desc: 'Método visual WeLearn',    active: true,  href: '/clases-de-coreano' },
  { code: 'Fr', name: 'Francés',   native: 'Français',  desc: 'DELF · DALF',              active: true,  href: '/clases-de-frances' },
  { code: 'De', name: 'Alemán',    native: 'Deutsch',   desc: 'Goethe-Zertifikat',        active: true,  href: '/clases-de-aleman'  },
  { code: 'It', name: 'Italiano',  native: 'Italiano',  desc: 'CILS · CELI',              active: true,  href: '/clases-de-italiano'  },
  { code: 'Pt', name: 'Portugués', native: 'Português', desc: 'CELPE-Bras',               active: true,  href: '/clases-de-portugues' },
  { code: '日', name: 'Japonés',   native: '日本語',    desc: 'JLPT · Próximamente',      active: false, href: null                 },
  { code: 'Py', name: 'Ruso',      native: 'Русский',   desc: 'TORFL · Próximamente',     active: false, href: null                 },
];

// Contraste app vs. WeLearn — corazón del arco PAS (answer-first para AEO)
const APP_VS_WELEARN = [
  { app: 'Rachas, puntos y niveles que no significan nada', wl: 'Un objetivo real: tu examen, tu meta, tu fecha' },
  { app: 'Frases sueltas que memorizas y olvidas', wl: 'Producción y conversación guiada con un profesor' },
  { app: 'Un algoritmo que nunca te corrige', wl: 'Un profesor real que te corrige y te exige' },
  { app: '“Tal vez algún día llegue a hablarlo”', wl: 'Un plan estructurado con fecha de examen' },
];

const METODO = [
  { n: '01', name: 'Activación',           desc: 'Imagen, audio y forma escrita para abrir contexto.',   min: '6 min' },
  { n: '02', name: 'Adquisición guiada',   desc: 'Quiz inicial con palabras nuevas y recicladas.',        min: '8 min' },
  { n: '03', name: 'Reconocimiento',       desc: 'Repaso espaciado de alta retención.',                   min: '10 min' },
  { n: '04', name: 'Escucha sobrevivible', desc: 'Audio corto adaptado al nivel.',                        min: '7 min' },
  { n: '05', name: 'Contexto',             desc: 'Notas de gramática, estilo y cultura.',                 min: '9 min' },
  { n: '06', name: 'Descubrir el patrón',  desc: 'Detección guiada de estructuras.',                      min: '8 min' },
  { n: '07', name: 'Microexplicaciones',   desc: 'Cápsulas breves para dudas frecuentes.',                min: '5 min' },
  { n: '08', name: 'Producción guiada',    desc: 'Construcción de frases con apoyo.',                     min: '10 min' },
  { n: '09', name: 'Interacción reactiva', desc: 'Respuestas rápidas en contexto.',                       min: '8 min' },
  { n: '10', name: 'Examen del día',       desc: 'Comprobación de interiorización inmediata.',            min: '6 min' },
  { n: '11', name: 'Examen acumulativo',   desc: 'Retención de largo plazo.',                             min: '10 min' },
];

const EXAMENES = [
  { badge: 'ACADEMIC',        name: 'TOEFL',           lang: 'Inglés · iBT',               weeks: '8 semanas',  mocks: '12 simulacros', slug: 'toefl'        },
  { badge: 'BAND 7+',        name: 'IELTS',           lang: 'Inglés · Academic & General', weeks: '8 semanas',  mocks: '10 simulacros', slug: 'ielts'        },
  { badge: 'B2 FIRST',       name: 'Cambridge B2',    lang: 'Inglés · FCE',               weeks: '10 semanas', mocks: '4 simulacros',  slug: 'cambridge-b2' },
  { badge: 'COLOMBIA',       name: 'ICFES',           lang: 'Inglés · Saber 11',           weeks: '12 semanas', mocks: '20 simulacros', slug: 'icfes'        },
  { badge: 'ZERTIFIKAT',     name: 'Goethe',          lang: 'Alemán · A1 – C2',            weeks: '10 semanas', mocks: '8 simulacros',  slug: 'goethe'       },
  { badge: 'OFFICIEL B1',    name: 'DELF B1',         lang: 'Francés · Nivel B1',          weeks: '8 semanas',  mocks: '2 simulacros',  slug: 'delf-b1'      },
  { badge: 'OFFICIEL B2',    name: 'DELF B2',         lang: 'Francés · Nivel B2',          weeks: '10 semanas', mocks: '1 simulacro',   slug: 'delf-b2'      },
  { badge: 'CERTIFICAZIONE', name: 'CILS',            lang: 'Italiano · A1 – C2',          weeks: '10 semanas', mocks: '6 simulacros',  slug: 'cils-celi'    },
  { badge: '초급 · 중급',      name: 'TOPIK',           lang: 'Coreano · Nivel I y II',      weeks: '12 semanas', mocks: '6 simulacros',  slug: 'topik'        },
  { badge: 'BRASIL',         name: 'CELPE-BRAS',      lang: 'Portugués · Intermediário+',  weeks: '10 semanas', mocks: '4 simulacros',  slug: 'celpe-bras'   },
];

const MODALIDAD = [
  {
    tag: 'Presencial',
    title: 'En nuestra sede en Bucaramanga',
    desc: 'Clases cara a cara con profesores reales en Bucaramanga. Para quienes prefieren el aula, el contacto directo y una rutina de estudio con acompañamiento presencial.',
  },
  {
    tag: 'Online',
    title: 'Desde cualquier lugar de Colombia y el mundo',
    desc: 'Clases en vivo por videollamada con tutor asignado, mismo método y mismo material. Para estudiantes en toda Colombia y colombianos en el exterior.',
  },
];

const TEAM = [
  {
    initials: 'JD',
    name: 'José David Duarte Silva',
    role: 'Co-fundador · Director General',
    tags: ['Políglota · 8 idiomas', 'Lingüística aplicada', 'Metodología pedagógica'],
    bio: 'Fundó WeLearn para ofrecer una alternativa rigurosa a la enseñanza de idiomas superficial. Como políglota activo en ocho lenguas, diseñó el método de 11 pasos que estructura cada sesión de aprendizaje en la plataforma.',
    accent: '#1a2ecc',
  },
  {
    initials: 'ZK',
    name: 'Zhanna Korzh',
    role: 'Directora Académica',
    tags: ['Diseño curricular', 'Preparación de exámenes', 'Evaluación lingüística'],
    bio: 'Lidera el diseño curricular y la calidad académica de todos los cursos. Su experiencia en preparación de exámenes internacionales respalda el rigor de las rutas de certificación disponibles en la plataforma.',
    accent: '#c8202e',
  },
];

const TESTIMONIALS = [
  {
    name: 'Leonardo Pinto',
    city: 'Bucaramanga',
    exam: 'Inglés · Work & Travel USA',
    quote: 'Estudié inglés en WeLearn para prepararme e ir a trabajar en USA durante el verano y me fue de maravilla. Volveré para presentar el examen TOEFL.',
  },
  {
    name: 'Daniel Zuluaga',
    city: 'Bogotá',
    exam: 'Celpe-Bras · Portugués — Maestría USP',
    quote: 'Hola David, fui aceptado en la facultad de odontología de Ribeirão Preto - USP y voy a comenzar la maestría el próximo mes. Muchas gracias por hacer parte del proceso, eternamente agradecido.',
  },
  {
    name: 'Karen Ayala',
    city: 'Bucaramanga',
    exam: 'Goethe — Alemán',
    quote: 'David te he recomendado como con 15 personas sin decir mentiras, espero que les salga todo suuuper biennn.',
  },
  {
    name: 'Carlos Torres',
    city: 'Bucaramanga',
    exam: 'TOEFL · Inglés — Maestría',
    quote: 'Realmente les agradezco a ustedes dos por toda la ayuda, el master dura 2 años pero mi profesor quiere que haga otro curso cuando me gradúe.',
  },
];

export default function HomePage() {
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
      {/* HERO */}
      <section className="wlh-hero">
        <HeroLeft>
          <HeroItem><p className="wlh-eyebrow">Academia de idiomas · Presencial en Bucaramanga y online en toda Colombia</p></HeroItem>
          <HeroItem>
            <h1 className="wlh-hero__h1">
              Aprende un<br />idioma, <em>en serio.</em>
            </h1>
          </HeroItem>
          <HeroItem>
            <p className="wlh-hero__desc">
              Sin apps que no llevan a ningún lado. Clases con profesores reales, un método propio de
              11 pasos y preparación específica para IELTS, TOEFL, TOPIK, Goethe y más. En nuestra sede
              en Bucaramanga o desde donde estés.
            </p>
          </HeroItem>
          <HeroItem>
            <div className="wlh-hero__ctas">
              <a href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer" className="btn wlh-hero__btn-primary" data-gtm="click_whatsapp">Agenda tu clase gratis →</a>
              <Link href="#leccion" className="btn btn-ghost wlh-hero__btn-ghost">Ver una lección</Link>
            </div>
          </HeroItem>
          <HeroItem>
            <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 600 }}>
              Clase de diagnóstico gratis · Responde un humano · +1000 estudiantes preparados
            </p>
          </HeroItem>
        </HeroLeft>

        <HeroCard>
          <HeroLangSelector />
        </HeroCard>
      </section>

      {/* STATS ROW — gradient */}
      <StatsRow className="wlh-stats">
        <StatItem className="wlh-stat">
          <span className="wlh-stat__num"><CountUp to={6} /></span>
          <span className="wlh-stat__lbl">idiomas con profesor</span>
        </StatItem>
        <StatItem className="wlh-stat">
          <span className="wlh-stat__num"><CountUp to={10} suffix="+" /></span>
          <span className="wlh-stat__lbl">exámenes internacionales</span>
        </StatItem>
        <StatItem className="wlh-stat">
          <span className="wlh-stat__num"><CountUp to={11} /></span>
          <span className="wlh-stat__lbl">pasos del método diario</span>
        </StatItem>
        <StatItem className="wlh-stat">
          <span className="wlh-stat__num"><CountUp to={1000} suffix="+" /></span>
          <span className="wlh-stat__lbl">estudiantes preparados</span>
        </StatItem>
      </StatsRow>

      {/* 01 — EMPATÍA / PROBLEMA (App vs WeLearn) */}
      <section id="por-que" className="wlh-section">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">01 — Por qué estás aquí</p>
            <h2 className="wlh-section-h2">No fallaste tú. Falló el método.</h2>
            <p className="wlh-section-desc">
              Descargaste la app. Hiciste rachas de 200 días. Y al sentarte frente a un examen —o frente a
              una persona real— seguías bloqueado. No es falta de disciplina: memorizar tarjetas no es
              aprender un idioma. La tutoría con un profesor real supera al 98% del aprendizaje en solitario.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="wlh-appvs">
              <div className="wlh-appvs__head wlh-appvs__head--app">Una app de idiomas</div>
              <div className="wlh-appvs__head wlh-appvs__head--wl">WeLearn</div>
              {APP_VS_WELEARN.map((row, i) => (
                <div key={i} className="wlh-appvs__row-group">
                  <div className="wlh-appvs__cell wlh-appvs__cell--app">{row.app}</div>
                  <div className="wlh-appvs__cell wlh-appvs__cell--wl">{row.wl}</div>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div style={{ marginTop: '1.6rem' }}>
              <Link href="#metodo" className="wlh-lang-card__cta" style={{ fontSize: '0.95rem' }}>Así enseñamos nosotros →</Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 02 — METODO */}
      <section id="metodo" className="wlh-section wlh-section--alt">
        <div className="wrap wlh-metodo-wrap">
          <FadeUp className="wlh-metodo-left">
            <p className="wlh-section-eyebrow">02 — El método</p>
            <h2 className="wlh-section-h2">El día tiene once pasos. Cada uno tiene una razón.</h2>
            <p className="wlh-section-desc">
              El método de 11 pasos de WeLearn estructura cada día de estudio en cuatro fases —exposición,
              adquisición, producción y repaso espaciado— imitando cómo el cerebro interioriza una lengua
              materna. Por eso el conocimiento se retiene y se convierte en habla, no en tarjetas olvidadas.
            </p>
            <div className="wlh-metodo-tags">
              <span className="wlh-tag">Audio · Imagen · Texto</span>
              <span className="wlh-tag">Repaso espaciado</span>
            </div>
          </FadeUp>
          <div className="wlh-metodo-right">
            {METODO.map((step, i) => (
              <StepRow key={step.n} className="wlh-step-row" index={i}>
                <span className="wlh-step-row__num">{step.n}</span>
                <div className="wlh-step-row__info">
                  <span className="wlh-step-row__name">{step.name}</span>
                  <span className="wlh-step-row__desc">{step.desc}</span>
                </div>
                <span className="wlh-step-row__min">{step.min}</span>
              </StepRow>
            ))}
          </div>
        </div>
        <div className="wrap" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
          <Link
            href="/metodo"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.6rem 1.4rem', borderRadius: 10,
              background: 'var(--accent)', color: '#fff',
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}
          >
            Ver el método completo →
          </Link>
        </div>
      </section>

      {/* 03 — CERTIFICACIONES */}
      <section id="examenes" className="wlh-section wlh-section--dark">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow wlh-section-eyebrow--light">03 — Certificaciones</p>
            <h2 className="wlh-section-h2 wlh-section-h2--light">Preparación específica para tu examen. Con simulacros reales.</h2>
            <p className="wlh-section-desc wlh-section-desc--light">
              Simulacros construidos a partir de los exámenes oficiales. Cada ruta incluye material de práctica, audios reales y retroalimentación por sección.
            </p>
          </FadeUp>
          <StaggerGrid className="wlh-exams-grid">
            {EXAMENES.map(ex => (
              <StaggerItem key={ex.name}>
                <TiltCard>
                  <Link href={`/examenes/${ex.slug}`} className="wlh-exam-card">
                    <span className="wlh-exam-card__badge">{ex.badge}</span>
                    <h3 className="wlh-exam-card__name">{ex.name}</h3>
                    <p className="wlh-exam-card__lang">{ex.lang}</p>
                    <div className="wlh-exam-card__stats">
                      <span>{ex.weeks}</span>
                      <span>·</span>
                      <span>{ex.mocks}</span>
                    </div>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 04 — IDIOMAS */}
      <section id="idiomas" className="wlh-section">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">04 — Catálogo</p>
            <h2 className="wlh-section-h2">Seis idiomas. Un mismo método probado.</h2>
            <p className="wlh-section-desc">
              Cada idioma sigue la misma estructura de 11 pasos diarios, con contenido, ritmo y material de práctica adaptados a cada lengua.
            </p>
          </FadeUp>
          <StaggerGrid className="wlh-idiomas-grid">
            {IDIOMAS.map(lang => (
              <StaggerItem key={lang.name}>
                <TiltCard>
                  <div className={`wlh-lang-card${!lang.active ? ' wlh-lang-card--soon' : ''}`}>
                    <div className="wlh-lang-card__top">
                      <span className="wlh-lang-card__code">{lang.code}</span>
                      {!lang.active && <span className="wlh-lang-card__soon-badge">Próximamente</span>}
                    </div>
                    <h3 className="wlh-lang-card__name">{lang.name}</h3>
                    <p className="wlh-lang-card__native">{lang.native}</p>
                    <div className="wlh-lang-card__footer">
                      <span className="wlh-lang-card__days">{lang.desc}</span>
                      {lang.active && lang.href && (
                        <Link href={lang.href} className="wlh-lang-card__cta">Ver ruta →</Link>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 05 — MODALIDAD (presencial + online) */}
      <section id="modalidad" className="wlh-section wlh-section--alt">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">05 — Modalidad</p>
            <h2 className="wlh-section-h2">En Bucaramanga o desde donde estés.</h2>
            <p className="wlh-section-desc">
              WeLearn nació en Bucaramanga y enseña en su sede de forma presencial, y también online para el
              resto de Colombia y el mundo. Tú eliges la modalidad; el método y el acompañamiento son los mismos.
            </p>
          </FadeUp>
          <div className="wlh-modalidad-grid">
            {MODALIDAD.map((m, i) => (
              <FadeUp key={m.tag} delay={i * 0.1}>
                <div className="wlh-modalidad-card">
                  <span className="wlh-tag">{m.tag}</span>
                  <h3 className="wlh-modalidad-card__title">{m.title}</h3>
                  <p className="wlh-modalidad-card__desc">{m.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — TESTIMONIOS */}
      <section className="wlh-section">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">06 — Resultados</p>
            <h2 className="wlh-section-h2">Estudiantes reales. Metas reales cumplidas.</h2>
            <p className="wlh-section-desc">
              Más de 1000 estudiantes han usado WeLearn para aprender un idioma y preparar sus exámenes internacionales.
            </p>
          </FadeUp>
          <div className="wlh-testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} className="wlh-testimonial-card" delay={i * 0.1}>
                <p className="wlh-testimonial-card__quote">"{t.quote}"</p>
                <div className="wlh-testimonial-card__footer">
                  <div className="wlh-testimonial-card__avatar">{t.name[0]}</div>
                  <div>
                    <p className="wlh-testimonial-card__name">{t.name} · {t.city}</p>
                    <p className="wlh-testimonial-card__exam">{t.exam}</p>
                  </div>
                </div>
              </TestimonialCard>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — EQUIPO */}
      <section id="equipo" className="wlh-section wlh-section--alt">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">07 — Equipo</p>
            <h2 className="wlh-section-h2">Quiénes te van a enseñar.</h2>
            <p className="wlh-section-desc">
              WeLearn es una academia construida por profesionales con experiencia directa en aprendizaje de idiomas y preparación de exámenes internacionales.
            </p>
          </FadeUp>
          <div className="wlh-team-grid">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} className="wlh-team-card" delay={i * 0.12}>
                <div className="wlh-team-card__avatar" style={{ background: member.accent }}>
                  {member.initials}
                </div>
                <div className="wlh-team-card__body">
                  <h3 className="wlh-team-card__name">{member.name}</h3>
                  <p className="wlh-team-card__role">{member.role}</p>
                  <div className="wlh-team-card__tags">
                    {member.tags.map(t => <span key={t} className="wlh-tag">{t}</span>)}
                  </div>
                  <p className="wlh-team-card__bio">{member.bio}</p>
                </div>
              </TeamCard>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — LECCION PREVIEW */}
      <section id="leccion" className="wlh-section">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">08 — Vista previa</p>
            <h2 className="wlh-section-h2">Mira cómo se ve un día completo.</h2>
            <p className="wlh-section-desc">Explora un día real del método, paso por paso.</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <LessonTabs />
          </FadeUp>
        </div>
      </section>

      {/* 09 — PRECIOS — teaser, sin duplicar la página /precios */}
      <section id="precios" className="wlh-section wlh-section--alt">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <FadeUp>
            <p className="wlh-section-eyebrow">09 — Precios</p>
            <h2 className="wlh-section-h2">Un precio claro. Sin sorpresas.</h2>
            <p className="wlh-section-desc" style={{ maxWidth: 520, margin: '0 auto 2rem' }}>
              Simulacros, retroalimentación y tutorías en vivo. Un precio transparente para todos los idiomas y exámenes. Sin letra pequeña.
            </p>
            <Link href="/precios" className="btn">Ver planes y precios →</Link>
          </FadeUp>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section className="wlh-section">
        <div className="wrap wlh-faq-wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">10 — Preguntas</p>
            <h2 className="wlh-section-h2">Lo que casi siempre nos preguntan.</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <FAQ />
          </FadeUp>
        </div>
      </section>

      {/* 11 — BLOG HIGHLIGHTS */}
      <FadeUp>
        <section className="wlh-section wlh-section--alt">
          <div className="wrap">
            <p className="wlh-section-eyebrow">11 — Blog</p>
            <h2 className="wlh-section-h2">Guías gratuitas que sí sirven.</h2>
            <p className="wlh-section-desc" style={{ maxWidth: 540, margin: '0 auto 2.5rem' }}>
              Artículos prácticos sobre IELTS, TOEFL, ICFES, coreano, alemán, italiano, portugués, francés y más.
              Sin relleno, solo lo que funciona.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {[...BLOG_POSTS]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 4)
                .map(post => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    style={{ display: 'block', padding: '1.1rem 1.2rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)', textDecoration: 'none' }}
                  >
                    <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: ({IELTS:'#0f3d8c',Coreano:'#c8202e',ICFES:'#0f7c3e',TOEFL:'#1a6e3c',Alemán:'#1a2ecc',Francés:'#1a2ecc',Portugués:'#166534',Italiano:'#009246',Método:'#7c3aed',Migración:'#0369a1',Inglés:'#1a4fcc'}[post.category]??'#1a4fcc'), background: ({IELTS:'rgba(15,61,140,0.1)',Coreano:'rgba(200,32,46,0.1)',ICFES:'rgba(15,124,62,0.1)',TOEFL:'rgba(26,110,60,0.1)',Alemán:'rgba(26,46,204,0.1)',Francés:'rgba(26,46,204,0.1)',Portugués:'rgba(22,101,52,0.1)',Italiano:'rgba(0,146,70,0.1)',Método:'rgba(124,58,237,0.1)',Migración:'rgba(3,105,161,0.1)',Inglés:'rgba(26,79,204,0.1)'}[post.category]??'rgba(26,79,204,0.1)'), padding: '2px 8px', borderRadius: 100, marginBottom: '0.5rem' }}>
                      {post.category}
                    </span>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4, color: 'var(--ink)', margin: '0 0 0.4rem' }}>{post.title} →</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{post.readTime} min</span>
                  </Link>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/blog" className="btn btn-ghost">Ver todos los artículos →</Link>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* CTA FINAL */}
      <FadeUp>
        <section className="wlh-cta">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <p className="wlh-cta__eyebrow">Empieza hoy</p>
            <h2 className="wlh-cta__h2">Tu primera clase de diagnóstico es gratis.</h2>
            <p style={{ maxWidth: 540, margin: '0.75rem auto 2rem', color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.6 }}>
              30 minutos con un profesor real. Evaluamos tu nivel, entendemos tu meta y te damos un plan. Sin compromiso.
            </p>
            <div className="wlh-cta__btns">
              <a href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer" className="btn wlh-cta__btn-primary" data-gtm="click_whatsapp">Agenda tu clase gratis por WhatsApp →</a>
              <Link href="/clases-de-ingles" className="btn btn-ghost wlh-cta__btn-ghost">Clases de inglés →</Link>
              <Link href="/clases-de-coreano" className="btn btn-ghost wlh-cta__btn-ghost">Clases de coreano →</Link>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* FOOTER */}
      <footer className="wlh-footer">
        <div className="wrap wlh-footer__inner">
          <div className="wlh-footer__brand">
            <span className="wlh-footer__logo"><strong>Idiomas</strong> WeLearn</span>
            <p className="wlh-footer__tagline">Seis idiomas. Doce certificaciones. Presencial en Bucaramanga y online en todo el mundo.</p>
          </div>
          <div className="wlh-footer__col">
            <p className="wlh-footer__col-title">Clases</p>
            <Link href="/clases-de-idiomas">Todos los idiomas</Link>
            <Link href="/clases-de-ingles">Inglés</Link>
            <Link href="/clases-de-coreano">Coreano</Link>
            <Link href="/clases-de-frances">Francés</Link>
            <Link href="/clases-de-aleman">Alemán</Link>
            <Link href="/clases-de-italiano">Italiano</Link>
            <Link href="/clases-de-portugues">Portugués</Link>
            <Link href="/preparacion-icfes">ICFES Inglés</Link>
            <Link href="/miembro-fundador">Miembro Fundador</Link>
          </div>
          <div className="wlh-footer__col">
            <p className="wlh-footer__col-title">Exámenes</p>
            <Link href="/examenes/toefl">TOEFL</Link>
            <Link href="/examenes/ielts">IELTS</Link>
            <Link href="/examenes/cambridge-b2">Cambridge B2 (FCE)</Link>
            <Link href="/examenes/icfes">ICFES</Link>
            <Link href="/examenes/goethe">Goethe</Link>
            <Link href="/examenes/delf-b1">DELF B1</Link>
            <Link href="/examenes/delf-b2">DELF B2</Link>
            <Link href="/examenes/topik">TOPIK</Link>
          </div>
          <div className="wlh-footer__col">
            <p className="wlh-footer__col-title">Compañía</p>
            <Link href="/metodo">Método</Link>
            <Link href="/precios">Precios</Link>
            <Link href="/blog">Blog</Link>
            <a href="https://wa.me/573005004253?text=Hola%2C%20quiero%20contactar%20a%20WeLearn." target="_blank" rel="noopener noreferrer">Contacto</a>
          </div>
        </div>
        <div className="wlh-footer__bottom">
          <p>© 2026 Idiomas WeLearn · Bucaramanga, Colombia · <a href="https://wa.me/573005004253" target="_blank" rel="noopener noreferrer" style={{color:'inherit'}}>+57 300 500 4253</a></p>
        </div>
      </footer>
    </>
  );
}
