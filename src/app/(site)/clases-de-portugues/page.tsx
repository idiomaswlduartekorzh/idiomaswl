import type { Metadata } from 'next';
import Link from 'next/link';
import FoundersBand from '@/components/hub/FoundersBand';
import LocalBand from '@/components/hub/LocalBand';
import { localBusinessNode, davidNode, zhannaNode, courseInstances } from '@/components/hub/localBusiness';
import PracticeBand from '@/components/hub/PracticeBand';
import s from './page.module.css';

const WA = '573005004253';
const WA_GENERAL = encodeURIComponent('Hola, vi la página de clases de portugués en WeLearn y quiero agendar mi clase de diagnóstico gratis.');
const WA_CELPE   = encodeURIComponent('Hola, quiero prepararme para el examen Celpe-Bras con WeLearn. ¿Cuándo puedo empezar?');

export const metadata: Metadata = {
  title: 'Clases de Portugués en Bucaramanga y Online — Preparación Celpe-Bras | WeLearn',
  description:
    'Academia de portugués en Bucaramanga con clases presenciales y online para toda Colombia. Preparación del Celpe-Bras, que se presenta en la propia ciudad. Portugués brasileño con método WeLearn. Diagnóstico gratis.',
  keywords: [
    'clases de portugués Bucaramanga',
    'curso de portugués Bucaramanga',
    'aprender portugués en Bucaramanga',
    'academia de portugués Bucaramanga',
    'Celpe-Bras Bucaramanga',
    'preparación Celpe-Bras Colombia',
    'Celpe-Bras Colombia',
    'clases de portugués online Colombia',
    'portugués brasileño online',
    'aprender portugués desde cero',
    'portugués para estudiar en Brasil',
    'WeLearn portugués',
  ],
  openGraph: {
    title: 'Clases de Portugués en Bucaramanga y Online — Celpe-Bras | WeLearn',
    description: 'Presencial en Bucaramanga y online en toda Colombia. Preparación del Celpe-Bras, que se presenta aquí mismo en la ciudad. Diagnóstico gratis.',
    url: 'https://www.idiomaswl.com/clases-de-portugues',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/clases-de-portugues' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Necesito saber portugués para empezar?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. Empezamos desde cero. El portugués brasileño comparte mucho vocabulario con el español, lo que acelera el aprendizaje inicial.' },
    },
    {
      '@type': 'Question',
      name: '¿Para qué sirve el Celpe-Bras?',
      acceptedAnswer: { '@type': 'Answer', text: 'El Celpe-Bras (Certificado de Proficiência em Língua Portuguesa para Estrangeiros) es la única certificación oficial de portugués del gobierno brasileño. Es requerida para ingresar a universidades públicas brasileñas, ejercer profesiones reguladas en Brasil y obtener visas de trabajo.' },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo toma llegar al Celpe-Bras Intermediário?',
      acceptedAnswer: { '@type': 'Answer', text: 'Para hispanohablantes, alcanzar el nivel Intermediário del Celpe-Bras toma entre 10 y 16 meses con práctica constante. La comprensión es rápida; la producción oral con acento natural toma más tiempo.' },
    },
    {
      '@type': 'Question',
      name: '¿Qué diferencia hay entre el portugués de Brasil y el de Portugal?',
      acceptedAnswer: { '@type': 'Answer', text: 'Hay diferencias de pronunciación, vocabulario y gramática. El portugués brasileño es más fonético y generalmente más fácil para hispanohablantes. El Celpe-Bras evalúa exclusivamente el portugués brasileño.' },
    },
    {
      '@type': 'Question',
      name: '¿Las clases son presenciales o virtuales?',
      acceptedAnswer: { '@type': 'Answer', text: 'Las dos modalidades están disponibles. En Bucaramanga y su área metropolitana las clases pueden ser presenciales, en la sede de Sotomayor; desde cualquier otra ciudad de Colombia o del mundo son por videollamada, con el mismo profesor y el mismo plan. También es posible alternar entre ambos formatos.' },
    },
    {
      '@type': 'Question',
      name: '¿Dónde se presenta el Celpe-Bras en Bucaramanga?',
      acceptedAnswer: { '@type': 'Answer', text: 'En la sede de la UNAB, en Bucaramanga. El puesto aplicador oficial del examen en Colombia es IBRACO, el Instituto de Cultura Brasil-Colombia, y la UNAB es el centro autorizado donde se aplica. El portugués es de los pocos idiomas que se pueden certificar sin salir de la ciudad.' },
    },
    {
      '@type': 'Question',
      name: '¿En qué ciudades de Colombia se aplica el Celpe-Bras?',
      acceptedAnswer: { '@type': 'Answer', text: 'Según IBRACO, puesto aplicador oficial, en su convocatoria más reciente el examen se aplica en Bogotá, Bucaramanga, Cali, Medellín, Leticia, Armenia, Montería, Yopal y Manizales. Las ciudades y los cupos pueden variar entre ediciones, por lo que conviene confirmarlo con IBRACO antes de inscribirse.' },
    },
    {
      '@type': 'Question',
      name: '¿Cómo y cuándo me inscribo al Celpe-Bras?',
      acceptedAnswer: { '@type': 'Answer', text: 'La inscripción se realiza únicamente en el sitio oficial del INEP, el instituto del gobierno brasileño, y luego se homologa en el puesto aplicador; no se hace en la sede. El examen es semestral, la ventana de inscripción dura pocos días y abre meses antes de las pruebas, y los resultados se publican alrededor de dos meses después.' },
    },
    {
      '@type': 'Question',
      name: '¿Dónde puedo estudiar portugués en Bucaramanga?',
      acceptedAnswer: { '@type': 'Answer', text: 'En Idiomas WeLearn, en la Calle 47 # 29-33, barrio Sotomayor, Bucaramanga. Hay clases presenciales para Bucaramanga, Floridablanca, Girón y Piedecuesta, y online para el resto del país. La preparación apunta al Celpe-Bras, que se presenta en la propia ciudad. El diagnóstico inicial es gratuito y el contacto es por WhatsApp al 300 500 4253.' },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuestan las clases de portugués en Bucaramanga?',
      acceptedAnswer: { '@type': 'Answer', text: 'El precio depende de la intensidad semanal y de si se toman clases sueltas o un paquete de horas, ya que el valor por hora disminuye a mayor volumen. El diagnóstico inicial es gratuito y en él se define objetivo, nivel y frecuencia para dar el precio exacto de cada caso.' },
    },
    {
      '@type': 'Question',
      name: '¿Cómo es el examen Celpe-Bras y por qué no tiene opción múltiple?',
      acceptedAnswer: { '@type': 'Answer', text: 'El Celpe-Bras evalúa uso real del idioma, no memorización. Consta de tareas escritas a partir de videos y textos auténticos, más una interacción oral con evaluadores. El candidato debe lograr algo concreto con el portugués: responder, argumentar, resumir o persuadir.' },
    },
    {
      '@type': 'Question',
      name: '¿Qué niveles tiene el Celpe-Bras y puedo elegir cuál presentar?',
      acceptedAnswer: { '@type': 'Answer', text: 'No se elige nivel. Se presenta un único examen y el resultado asigna el nivel obtenido: Intermediário, Intermediário Superior, Avançado o Avançado Superior. Hay una regla decisiva: cuando el desempeño de la parte escrita y el de la oral no coinciden, prevalece el menor de los dos. Si no se alcanza el mínimo, no se otorga certificado.' },
    },
    {
      '@type': 'Question',
      name: '¿Necesito el Celpe-Bras para revalidar mi título profesional en Brasil?',
      acceptedAnswer: { '@type': 'Answer', text: 'El Celpe-Bras es el certificado de proficiencia en portugués que aparece habitualmente en los procesos de revalidación de títulos y en las admisiones de posgrado de universidades públicas brasileñas. Los requisitos exactos dependen de la universidad y de la profesión, por lo que deben confirmarse con la institución donde se hace el trámite.' },
    },
    {
      '@type': 'Question',
      name: '¿Debo aprender portugués de Brasil o de Portugal?',
      acceptedAnswer: { '@type': 'Answer', text: 'Depende del objetivo. Para estudiar, trabajar o revalidar un título en Brasil, portugués brasileño, que es el que evalúa el Celpe-Bras. Para nacionalidad o residencia en Portugal, portugués europeo, con exámenes del sistema CAPLE. Idiomas WeLearn enseña portugués brasileño.' },
    },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Portugués con el método WeLearn',
      description: 'Aprende portugués brasileño desde cero hasta Celpe-Bras con tutor especializado.',
      provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
      hasCourseInstance: courseInstances('Portugués', 'pt-BR'),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'COP', description: 'Clase de diagnóstico gratis', availability: 'https://schema.org/InStock' },
    },
    localBusinessNode(
      'Academia de idiomas en Bucaramanga con clases presenciales y online para toda Colombia. Portugués brasileño con preparación del Celpe-Bras, además de inglés, francés, italiano, coreano y alemán.'
    ),
    davidNode(
      'Políglota activo en ocho idiomas. El portugués fue el tercero que aprendió, después del inglés y el italiano, y es el que más rápido avanza partiendo del español.'
    ),
    zhannaNode(
      'Co-fundadora y directora académica de WeLearn, formada en Francia e Inglaterra. Lidera el diseño curricular y la preparación de certificaciones oficiales de portugués.',
      ['es', 'en', 'fr']
    ),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de Portugués', item: 'https://www.idiomaswl.com/clases-de-portugues' },
      ],
    },
  ],
};

const WHY_CARDS = [
  { icon: '🎯', title: 'Diagnóstico gratis', desc: 'Evaluamos tu nivel real, entendemos tu objetivo (Celpe-Bras, estudios en Brasil, fluidez) y diseñamos tu plan personalizado.' },
  { icon: '🇧🇷', title: 'Portugués brasileño real', desc: 'No el portugués de los libros. El portugués que se habla en São Paulo, Río y las universidades brasileñas.' },
  { icon: '🗣️', title: 'Producción oral desde el inicio', desc: 'El Celpe-Bras evalúa principalmente producción oral. Practicamos hablar desde la primera semana.' },
  { icon: '✅', title: 'Preparación Celpe-Bras', desc: 'Tarefas escritas y orales al estilo exacto del Celpe-Bras. Retroalimentación detallada por tarea.' },
];

const LEVELS = [
  {
    tag: 'Iniciante → Intermediário',
    title: 'Portugués funcional',
    desc: 'Pronunciación carioca vs. paulistano, vocabulario de alta frecuencia, verbos esenciales, presente e imperfeito. Conversación cotidiana y preparación para el Celpe-Bras Intermediário.',
    time: '10–16 meses',
  },
  {
    tag: 'Intermediário Superior',
    title: 'Fluidez laboral',
    desc: 'Subjuntivo, vocabulario técnico y académico, comprensión de medios brasileños. El nivel Intermediário Superior del Celpe-Bras es el mínimo para muchas universidades públicas.',
    time: '16–22 meses',
  },
  {
    tag: 'Avançado → Superior',
    title: 'Dominio completo',
    desc: 'Português coloquial, rioplatense, escritura académica, léxico profesional. Celpe-Bras Avançado para trabajo en empresas brasileñas, medicina y derecho en Brasil.',
    time: '22–30 meses',
  },
];

const FAQS = [
  { q: '¿Necesito saber portugués para empezar?', a: 'No. Empezamos desde cero. El portugués brasileño comparte mucho vocabulario con el español, lo que acelera el aprendizaje inicial.' },
  { q: '¿Para qué sirve el Celpe-Bras?', a: 'El Celpe-Bras es la única certificación oficial del gobierno brasileño. Es requerida para ingresar a universidades públicas brasileñas, ejercer profesiones reguladas en Brasil y obtener visas de trabajo.' },
  { q: '¿Cuánto tiempo toma llegar al Celpe-Bras Intermediário?', a: 'Para hispanohablantes, entre 10 y 16 meses con práctica constante. La comprensión es rápida; la producción oral con acento natural toma más tiempo.' },
  { q: '¿Qué diferencia hay entre el portugués de Brasil y el de Portugal?', a: 'Pronunciación, vocabulario y algo de gramática. El portugués brasileño es más fonético y generalmente más fácil para hispanohablantes. El Celpe-Bras evalúa exclusivamente el portugués brasileño.' },
  { q: '¿Las clases son presenciales o virtuales?', a: 'Las dos. Si estás en Bucaramanga o el área metropolitana puedes venir a la sede de Sotomayor; desde cualquier otra ciudad la clase es por videollamada, con el mismo profesor y el mismo plan. También puedes alternar entre los dos formatos.' },
  { q: '¿Dónde se presenta el Celpe-Bras en Bucaramanga?', a: 'En la sede de la UNAB. El puesto aplicador oficial en Colombia es IBRACO, el Instituto de Cultura Brasil-Colombia, y la UNAB es el centro autorizado donde se aplica el examen en la ciudad. Es una ventaja poco conocida: el portugués es de los pocos idiomas que puedes certificar sin salir de Bucaramanga.' },
  { q: '¿En qué ciudades de Colombia se aplica el Celpe-Bras?', a: 'Según IBRACO, el puesto aplicador oficial, en su convocatoria más reciente se aplica en Bogotá, Bucaramanga, Cali, Medellín, Leticia, Armenia, Montería, Yopal y Manizales. Las ciudades y los cupos pueden cambiar de una edición a otra, así que confirma con IBRACO antes de inscribirte.' },
  { q: '¿Cómo y cuándo me inscribo al Celpe-Bras?', a: 'La inscripción se hace únicamente en el sitio oficial del INEP, el instituto del gobierno brasileño, y después se homologa en el puesto aplicador. No se hace en la sede ni con nosotros. El examen es semestral y la ventana de inscripción dura pocos días, meses antes de las pruebas; los resultados salen alrededor de dos meses después.' },
  { q: '¿Cómo es el examen Celpe-Bras y por qué no tiene opción múltiple?', a: 'Porque evalúa uso real del idioma, no memorización. Consta de tareas escritas a partir de videos y textos auténticos, más una interacción oral con evaluadores. Debes lograr algo concreto con el portugués: responder, argumentar, resumir o persuadir.' },
  { q: '¿Qué niveles tiene el Celpe-Bras y puedo elegir cuál presentar?', a: 'No se elige. Presentas un único examen y el resultado te asigna el nivel: Intermediário, Intermediário Superior, Avançado o Avançado Superior. Y ojo con esto: cuando el desempeño escrito y el oral no coinciden, prevalece el menor de los dos. Si no alcanzas el mínimo, no hay certificado.' },
  { q: '¿Necesito el Celpe-Bras para revalidar mi título profesional en Brasil?', a: 'Es el certificado de proficiencia que aparece habitualmente en los procesos de revalidación y en las admisiones de posgrado de universidades públicas brasileñas. Los requisitos exactos dependen de la universidad y de la profesión, así que confírmalos con la institución donde vas a hacer el trámite.' },
  { q: '¿Dónde puedo estudiar portugués en Bucaramanga?', a: 'En Idiomas WeLearn, Calle 47 # 29-33, barrio Sotomayor. Damos clases presenciales en Bucaramanga, Floridablanca, Girón y Piedecuesta, y online al resto del país. Y como el Celpe-Bras se presenta aquí mismo, puedes prepararte y certificarte sin viajar. El diagnóstico es gratis: escríbenos al 300 500 4253.' },
  { q: '¿Cuánto cuestan las clases de portugués en Bucaramanga?', a: 'Depende de la intensidad semanal y de si tomas clases sueltas o un paquete de horas, porque el valor por hora baja a mayor volumen. El diagnóstico inicial es gratis y ahí definimos objetivo, nivel y frecuencia para darte el precio exacto de tu caso.' },
  { q: '¿Debo aprender portugués de Brasil o de Portugal?', a: 'Depende de tu objetivo. Si vas a estudiar, trabajar o revalidar título en Brasil, el brasileño — y es el que evalúa el Celpe-Bras. Si buscas nacionalidad o residencia en Portugal, el europeo, con exámenes del sistema CAPLE. WeLearn enseña portugués brasileño.' },
];

const BLOG_POSTS = [
  { cat: 'Portugués', color: '#166534', title: 'Portugués para negocios con Brasil: nivel y guía práctica', slug: 'portugues-para-negocios-con-brasil-nivel-recomendado' },
  { cat: 'Portugués', color: '#166534', title: '¿Cuánto cuesta aprender portugués en Colombia en 2026?', slug: 'cuanto-cuesta-aprender-portugues-colombia-2026' },
  { cat: 'Portugués', color: '#166534', title: 'Celpe-Bras: qué es, requisitos y cómo prepararse desde Colombia', slug: 'celpe-bras-que-es-como-prepararse' },
  { cat: 'Portugués', color: '#166534', title: 'Portugués de Brasil vs Portugal: diferencias para estudiantes colombianos', slug: 'portugues-brasil-vs-portugal-diferencias-para-aprender' },
  { cat: 'Portugués', color: '#166534', title: 'Portugués europeo vs. brasileño: cuál aprender según tu objetivo', slug: 'portugues-europeo-vs-brasileno-para-aprender' },
  { cat: 'Portugués', color: '#166534', title: 'Portugués para estudiar en Brasil: universidades, becas y nivel requerido', slug: 'portugues-para-estudiar-en-brasil-universidades-y-requisitos' },
];

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

export default function ClasesDePortuguesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className={s.page}>

        {/* HERO */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <div className={s.heroPhrase}>Olá!</div>
              <p className={s.eyebrow}>Portugués en Bucaramanga y online · WeLearn</p>
              <h1 className={s.h1}>
                Aprende portugués<br />
                <span className={s.accent}>de verdad.</span>
              </h1>
              <p className={s.heroSub}>
                El portugués es el cuarto idioma más hablado del mundo. Con método correcto,
                en 6 meses ya conversas con brasileños, y en 12–16 puedes alcanzar el Celpe-Bras Intermediário
                para estudiar en las mejores universidades de Brasil.
              </p>
              <div className={s.heroCtas}>
                <a href={`https://wa.me/${WA}?text=${WA_GENERAL}`} target="_blank" rel="noopener noreferrer" className={s.waBtn}>
                  <WaIcon /> Clase de diagnóstico gratis
                </a>
                <Link href="/examenes/celpe-bras" className={s.ghostBtn}>Ver simulacros Celpe-Bras →</Link>
              </div>
            </div>

            <div className={s.heroVisual}>
              <div className={s.heroCard}>
                <span className={s.heroCardFlag}>🇧🇷</span>
                <p className={s.heroCardTitle}>Celpe-Bras</p>
                <p className={s.heroCardSub}>La única certificación oficial del gobierno brasileño — reconocida para universidades, visas y trabajo en Brasil</p>
                <div className={s.levelBadges}>
                  {['Intermediário','Inter. Superior','Avançado','Superior'].map(l => <span key={l} className={s.levelBadge}>{l}</span>)}
                </div>
              </div>
              <div className={s.heroCard}>
                <p className={s.heroCardTitle}>¿Por qué portugués?</p>
                <p className={s.heroCardSub}>
                  • 4.ª lengua más hablada del mundo (260 millones)<br />
                  • USP, Unicamp, UFRJ — universidades top en América Latina<br />
                  • Creciente demanda en comercio Colombia-Brasil<br />
                  • El más similar al español entre las lenguas no hispanas (junto al italiano)
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={s.proofStrip}>
          <span className={s.proofItem}><strong>6 idiomas</strong> disponibles</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Diagnóstico</strong> gratis</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Celpe-Bras Intermediário a Superior</strong></span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Presencial en Bucaramanga</strong> · Sotomayor</span>
        </div>

        {/* ══════════════ FUNDADORES ══════════════ */}
        <FoundersBand
          accent="#166534"
          title="Dos políglotas te enseñan portugués. No un curso grabado."
          intro="Detrás de cada clase hay dos personas que aprendieron idiomas de verdad, no una app con lecciones automáticas."
          davidLine="Habla ocho idiomas. El portugués fue el tercero que aprendió, después del inglés y el italiano, y es el que más rápido avanza cuando ya hablas español."
          zhannaLine="Co-fundadora y directora académica de WeLearn, formada en Francia e Inglaterra. Diseña las rutas de certificación y controla que la preparación Celpe-Bras corresponda a lo que el examen realmente evalúa."
          zhannaTags={['Lingüista titulada · Co-fundadora', 'Preparación Celpe-Bras', 'Diseño curricular']}
        />

        {/* WHY */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Por qué WeLearn</p>
            <h2 className={s.h2}>No es un curso. Es un método.</h2>
            <p className={s.sectionSub}>Diseñamos el camino completo desde tu nivel actual hasta el Celpe-Bras que necesitas.</p>
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
            <h2 className={s.h2}>Desde cero hasta Celpe-Bras Superior</h2>
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

        {/* CELPE-BRAS */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Certificación</p>
            <h2 className={s.h2}>Celpe-Bras: la única certificación oficial de Brasil</h2>
            <p className={s.sectionSub}>No hay otra opción: es el único certificado que las universidades y empleadores brasileños reconocen oficialmente.</p>
            <div className={s.celpeBox}>
              <div className={s.celpeCard}>
                <p className={s.celpeName}>Celpe-Bras</p>
                <p className={s.celpeRange}>Intermediário · Intermediário Superior · Avançado · Superior</p>
                <p className={s.celpeDesc}>
                  El Certificado de Proficiência em Língua Portuguesa para Estrangeiros es emitido por el MEC (Ministerio de Educación de Brasil). Evalúa uso real del idioma a través de tarefas (tareas) escritas y orales basadas en textos, videos y audios auténticos — no gramática aislada. Es el único certificado aceptado para ingreso a universidades públicas brasileñas como la USP, la Unicamp y la UFRJ, y para ejercer profesiones reguladas (medicina, odontología, derecho) en Brasil.
                </p>
                <div className={s.celpeSkills}>
                  {['Compreensão oral', 'Compreensão escrita', 'Produção escrita', 'Interação oral'].map(sk => <span key={sk}>{sk}</span>)}
                </div>
              </div>
            </div>
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <a href={`https://wa.me/${WA}?text=${WA_CELPE}`} target="_blank" rel="noopener noreferrer" className={s.waBtnLight}>
                <WaIcon /> Preparar mi Celpe-Bras ahora →
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════ BUCARAMANGA (SEO LOCAL) ══════════════ */}
        <LocalBand
          accent="#166534"
          idioma="portugués"
          intro="WeLearn es una academia de idiomas con sede en Bucaramanga. Si estás en la ciudad o en el área metropolitana puedes estudiar portugués presencialmente con nosotros; si prefieres no desplazarte —o vives en otra ciudad— la misma clase, con el mismo profesor y el mismo plan, se hace por videollamada."
          presencial="Clases cara a cara con una ventaja que casi ningún idioma tiene aquí: el Celpe-Bras se presenta en la propia Bucaramanga, así que puedes prepararte y certificarte sin salir de la ciudad."
          waText="Hola, estoy en Bucaramanga y quiero saber sobre las clases de portugués presenciales y la preparación del Celpe-Bras. ¿Cómo funcionan?"
        />

        {/* ══════════════ CELPE-BRAS EN BUCARAMANGA (activo local diferencial) ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>La ventaja de estudiar aquí</p>
            <h2 className={s.h2}>El Celpe-Bras se presenta en Bucaramanga</h2>
            <p className={s.sectionSub}>
              Es la excepción entre los exámenes de idiomas en Santander. Para certificar italiano,
              alemán o coreano toca viajar a Bogotá; el portugués no. El Celpe-Bras se aplica en la
              ciudad, en la sede de la UNAB, a través de IBRACO, que es el puesto aplicador oficial
              en Colombia. Puedes prepararte y certificarte sin salir de Bucaramanga.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Dónde</span>
                <p className={s.levelTitle}>En la UNAB, con IBRACO</p>
                <p className={s.levelDesc}>
                  El puesto aplicador oficial es IBRACO, el Instituto de Cultura Brasil-Colombia,
                  y la UNAB es el centro autorizado donde se aplica el examen en la ciudad. Además
                  de Bucaramanga, IBRACO lo administra en Bogotá, Medellín, Cali, Leticia, Armenia,
                  Montería, Yopal y Manizales.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Cuándo</span>
                <p className={s.levelTitle}>Dos convocatorias al año</p>
                <p className={s.levelDesc}>
                  El examen es semestral y la inscripción abre meses antes, por una ventana corta
                  de pocos días. Los resultados salen alrededor de dos meses después de las
                  pruebas. Si tienes una fecha límite —una admisión, un trámite— cuenta hacia
                  atrás desde ahí.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Cómo</span>
                <p className={s.levelTitle}>La inscripción no se hace en la sede</p>
                <p className={s.levelDesc}>
                  Es el error más común. El registro se hace únicamente en el sitio oficial del
                  INEP, el instituto del gobierno brasileño, y solo después se homologa en el
                  puesto aplicador. Consulta fechas y valor vigentes con IBRACO antes de pagar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ CÓMO ES EL EXAMEN (SEO/AEO) ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Cómo es el examen</p>
            <h2 className={s.h2}>El Celpe-Bras no se parece a ningún otro examen de idiomas</h2>
            <p className={s.sectionSub}>
              Quien llega esperando un examen de opción múltiple se estrella. El Celpe-Bras evalúa
              qué eres capaz de hacer con el portugués, no cuánta gramática recuerdas — y eso
              cambia por completo la forma de prepararse.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Formato</span>
                <p className={s.levelTitle}>No hay opción múltiple</p>
                <p className={s.levelDesc}>
                  Tres horas de parte escrita con cuatro tareas de producción a partir de video,
                  audio y textos reales, más unos veinte minutos de interacción oral cara a cara
                  con evaluadores, que se graba. Tienes que lograr algo concreto: responder,
                  argumentar, resumir o persuadir.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Nivel</span>
                <p className={s.levelTitle}>El nivel no se elige: se obtiene</p>
                <p className={s.levelDesc}>
                  Presentas un único examen y el resultado te asigna el nivel: Intermediário,
                  Intermediário Superior, Avançado o Avançado Superior. Y hay una regla que casi
                  nadie menciona: cuando el desempeño escrito y el oral no coinciden,
                  <strong> vale el menor de los dos</strong>. Descuidar el oral te baja el
                  certificado entero.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Para qué</span>
                <p className={s.levelTitle}>Universidad, título y trabajo en Brasil</p>
                <p className={s.levelDesc}>
                  Es el certificado que piden las universidades públicas brasileñas para posgrados
                  y el que aparece en los procesos de revalidación de títulos profesionales y en
                  trámites de visa de trabajo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ PRACTICA GRATIS ══════════════ */}
        <PracticeBand
          accent="#166534"
          title="Todo lo que puedes practicar gratis desde hoy"
          sub="No tienes que esperar a matricularte. Las cinco habilidades, los simulacros del Celpe-Bras y el diagnóstico de nivel están abiertos, con corrección inmediata y sin registro."
          cards={[
            { href: '/practica/portugues/a1/gramatica', title: 'Gramática A1 · A2 · B1', desc: 'Los cimientos del portugués brasileño: artículos, presente, preposiciones y las trampas del portuñol.' },
            { href: '/practica/portugues/a1/vocabulario', title: 'Vocabulario con audio', desc: 'Palabras de alta frecuencia con audio brasileño — el portugués que de verdad se habla.' },
            { href: '/practica/portugues/b1/escucha', title: 'Comprensión auditiva', desc: 'Audio real a velocidad natural, que es exactamente lo que más cuesta al pasar del español.' },
            { href: '/practica/portugues/b1/lectura', title: 'Comprensión lectora', desc: 'Textos auténticos con preguntas de comprensión, la base de las tareas escritas del examen.' },
            { href: '/practica/portugues/b1/escritura', title: 'Escritura integrada', desc: 'Lee, prepara vocabulario y escribe una respuesta real — justo el tipo de tarea que evalúa el Celpe-Bras.' },
            { href: '/practica/portugues/b1/habla', title: 'Expresión oral', desc: 'Clave aquí: en el Celpe-Bras, si el oral queda por debajo del escrito, vale el resultado menor.' },
            { href: '/examenes/celpe-bras', title: 'Simulacros Celpe-Bras', desc: 'Practica con el formato real: videos, tareas escritas y parte oral, con informe de desempeño.' },
            { href: '/nivel-radar', title: 'Descubre tu nivel real', desc: 'Si no sabes por dónde empezar, el diagnóstico de nivel te ubica antes de la primera clase.' },
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
            <p className={s.ctaPhrase}>Vamos lá!</p>
            <h2 className={s.ctaTitle}>Tu diagnóstico de portugués<br /><span className={s.accent}>es gratis.</span></h2>
            <p className={s.ctaSub}>Diagnosticamos tu nivel, definimos tu objetivo y te mostramos exactamente cómo llegar al Celpe-Bras que necesitas.</p>
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
