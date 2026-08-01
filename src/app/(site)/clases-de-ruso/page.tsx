import type { Metadata } from 'next';
import Link from 'next/link';
import FoundersBand from '@/components/hub/FoundersBand';
import LocalBand from '@/components/hub/LocalBand';
import PracticeBand from '@/components/hub/PracticeBand';
import { localBusinessNode, davidNode, zhannaNode, courseInstances } from '@/components/hub/localBusiness';
import s from './page.module.css';

const WA = '573005004253';
const WA_GENERAL = encodeURIComponent('Hola, vi la página de clases de ruso en WeLearn y quiero agendar mi diagnóstico gratis.');
const WA_BECAS   = encodeURIComponent('Hola, quiero aprender ruso para aplicar a las becas de estudio en Rusia. ¿Cómo me preparo?');

export const metadata: Metadata = {
  title: 'Clases de Ruso en Bucaramanga y Online — Desde Cero | WeLearn',
  description:
    'Academia de ruso en Bucaramanga con clases presenciales y online para toda Colombia. Desde el alfabeto cirílico hasta nivel avanzado, con preparación para estudiar en Rusia. Diagnóstico gratis.',
  keywords: [
    'clases de ruso Bucaramanga',
    'curso de ruso Bucaramanga',
    'aprender ruso en Colombia',
    'clases de ruso online',
    'clases de ruso en Colombia',
    'aprender ruso desde cero',
    'alfabeto cirílico',
    'examen de ruso oficial',
    'certificado de ruso como lengua extranjera',
    'becas para estudiar en Rusia',
    'profesor de ruso online',
    'WeLearn ruso',
  ],
  openGraph: {
    title: 'Clases de Ruso en Bucaramanga y Online — Desde Cero | WeLearn',
    description:
      'Presencial en Bucaramanga y online en toda Colombia. Del alfabeto cirílico al nivel avanzado, con profesora rusoparlante. Diagnóstico gratis.',
    url: 'https://www.idiomaswl.com/clases-de-ruso',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/clases-de-ruso' },
};

const FAQS = [
  {
    q: '¿Qué tan difícil es aprender ruso hablando español?',
    a: 'Es exigente, pero no imposible, y menos de lo que la fama sugiere. El Foreign Service Institute lo clasifica como idioma de categoría IV: alrededor de 1.100 horas de estudio intensivo para llegar a nivel profesional. Eso lo pone por encima del francés o el italiano, pero muy por debajo del chino, el árabe o el japonés. Y hay una ventaja que casi nadie menciona: la pronunciación rusa le resulta más natural a un hispanohablante que a un angloparlante, porque la Р rusa es prácticamente nuestra "rr". Lo que de verdad cuesta no es el alfabeto: son los seis casos y el aspecto verbal.',
  },
  {
    q: '¿Cuánto se demora en aprender el alfabeto cirílico?',
    a: 'Mucho menos de lo que crees. Las 33 letras del cirílico ruso se aprenden a leer en unas 3 a 8 horas, y hay métodos que lo logran en un par de días. Seis letras se leen igual que en español (А, Е, К, М, О, Т) y otras vienen del griego (П, Р, Ф, Х), así que el bloque realmente nuevo es pequeño. Automatizar la lectura, es decir leer sin ir deletreando, toma unas 2 a 4 semanas de práctica. Lo que sí sorprende a todo el mundo es la cursiva manuscrita rusa, que parece un segundo alfabeto.',
  },
  {
    q: '¿Cuánto tiempo toma llegar a nivel B1 en ruso?',
    a: 'Las estimaciones varían bastante según la intensidad y el estudio por cuenta propia, pero el rango que se maneja habitualmente es de 400 a 600 horas de estudio guiado. B1 importa porque equivale al ТРКИ-1, que es el nivel que suelen pedir las universidades rusas para entrar directo a una carrera sin pasar por el año preparatorio.',
  },
  {
    q: '¿Existe un examen oficial de ruso y cómo se llama?',
    a: 'Sí. Se llama ТРКИ, conocido internacionalmente como TORFL, y lo supervisa el Ministerio de Educación y Ciencia de la Federación de Rusia. Tiene seis niveles: ТЭУ (A1), ТБУ (A2), ТРКИ-1 (B1), ТРКИ-2 (B2), ТРКИ-3 (C1) y ТРКИ-4 (C2). Se rinde en dos días y evalúa gramática y léxico, lectura, escritura, comprensión auditiva y expresión oral.',
  },
  {
    q: '¿Puedo presentar el examen oficial de ruso en Colombia?',
    a: 'No de forma permanente, y conviene saberlo antes de hacer planes. En Colombia no hay hoy un centro examinador fijo de ТРКИ. El examen sí se ha aplicado alguna vez en Bogotá, en el Instituto Cultural León Tolstói, mediante delegaciones puntuales de universidades rusas, pero no hay convocatoria estable. Tampoco existe en el país una Casa de Rusia, un Instituto Pushkin ni un centro ruso de ciencia y cultura. La mayoría de candidatos colombianos terminan presentándolo en Rusia, en España o de forma remota con una universidad rusa autorizada. Si lo necesitas con fecha, confirma disponibilidad antes de organizar el viaje.',
  },
  {
    q: '¿Necesito saber ruso para aplicar a las becas del gobierno ruso?',
    a: 'No es requisito de entrada, y desconfía de quien te diga lo contrario. La beca del Gobierno de la Federación de Rusia, que en Colombia se gestiona junto con el ICETEX, incluye un año de facultad preparatoria justamente para aprender el idioma. Ahora bien, llegar con A2 o B1 cambia por completo la experiencia: aprovechas ese año en lugar de sufrirlo, y algunas universidades permiten entrar directo a la carrera si ya acreditas ТРКИ-1.',
  },
  {
    q: '¿Se puede aprender ruso desde cero sin saber nada de gramática?',
    a: 'Sí. Un curso desde cero empieza por el alfabeto, la pronunciación y frases funcionales, y solo después introduce los casos de forma progresiva. No necesitas conocimientos previos de gramática ni saber inglés. Lo que sí ayuda muchísimo es que te expliquen los casos y el aspecto verbal en español, porque son estructuras que no existen en nuestro idioma y traducirlas mentalmente desde el inglés solo añade ruido.',
  },
  {
    q: '¿Dónde puedo estudiar ruso en Bucaramanga?',
    a: 'La oferta en la ciudad es muy escasa: ni el Instituto de Lenguas de la UIS ni el Departamento de Lenguas de la UNAB incluyen ruso en su catálogo, y no hay academias privadas locales que lo dicten. Hasta ahora la única alternativa eran unos pocos tutores particulares en plataformas de clases. En Idiomas WeLearn damos ruso presencial en nuestra sede de la Calle 47 # 29-33, barrio Sotomayor, y también online. El diagnóstico inicial es gratis: escríbenos al 300 500 4253.',
  },
  {
    q: '¿Las clases de ruso son presenciales o virtuales?',
    a: 'Las dos. En Bucaramanga y su área metropolitana —Floridablanca, Girón y Piedecuesta— puedes venir a la sede de Sotomayor; desde cualquier otra ciudad de Colombia o del mundo la clase es por videollamada, con el mismo plan y la misma profesora. También puedes alternar entre los dos formatos según te convenga la semana.',
  },
  {
    q: '¿Cuánto cuestan las clases de ruso en Bucaramanga?',
    a: 'Depende de la modalidad, individual o grupal, presencial u online, y de la intensidad semanal. El diagnóstico inicial es gratis y ahí definimos objetivo, nivel y frecuencia para darte el precio exacto de tu caso. Como referencia del mercado local, las clases particulares de ruso en Bucaramanga se han publicado por encima del promedio nacional, precisamente porque hay muy poca oferta.',
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
      name: 'Ruso con el método WeLearn',
      description:
        'Aprende ruso desde el alfabeto cirílico hasta nivel avanzado con profesora rusoparlante. Preparación para estudiar en Rusia y para el examen oficial ТРКИ.',
      provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://www.idiomaswl.com' },
      hasCourseInstance: courseInstances('Ruso', 'ru'),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'COP',
        description: 'Diagnóstico gratis',
        availability: 'https://schema.org/InStock',
      },
    },
    localBusinessNode(
      'Academia de idiomas en Bucaramanga con clases presenciales y online para toda Colombia. Ruso desde cero con profesora rusoparlante, además de inglés, francés, italiano, portugués, alemán y coreano.'
    ),
    davidNode(
      'Políglota activo en ocho idiomas y co-fundador de WeLearn. Diseñó el método con el que la academia enseña lenguas lejanas al español, como el ruso, a hispanohablantes adultos.'
    ),
    zhannaNode(
      'Co-fundadora y directora académica de WeLearn, rusoparlante. Lidera la enseñanza de ruso de la academia y el diseño de sus rutas de nivel.',
      ['ru', 'es', 'en', 'fr']
    ),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de Ruso', item: 'https://www.idiomaswl.com/clases-de-ruso' },
      ],
    },
  ],
};

const LEVELS = [
  {
    tag: 'ТЭУ · ТБУ',
    title: 'A1 y A2 — los cimientos',
    desc: 'Alfabeto, pronunciación, presentarte, moverte y sobrevivir en situaciones cotidianas. El A2 es además el nivel que se pide para trámites de ciudadanía rusa.',
    time: 'Desde cero',
  },
  {
    tag: 'ТРКИ-1',
    title: 'B1 — la puerta a la universidad',
    desc: 'El nivel que suelen exigir las universidades rusas para entrar directo a una carrera sin pasar por el año preparatorio. Aquí ya manejas los seis casos con soltura.',
    time: '400–600 h',
  },
  {
    tag: 'ТРКИ-2 y más',
    title: 'B2, C1 y C2 — uso profesional',
    desc: 'Maestría, ejercicio profesional, traducción e investigación. El C1 converge con las ~1.100 horas que estima el Foreign Service Institute para competencia profesional.',
    time: '600 h en adelante',
  },
];

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

export default function ClasesDeRusoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className={s.page}>

        {/* ══════════════ HERO ══════════════ */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <div className={s.heroPhrase}>Здравствуйте!</div>
              <p className={s.eyebrow}>Ruso en Bucaramanga y online · WeLearn</p>
              <h1 className={s.h1}>
                Aprende ruso<br />
                <span className={s.accent}>desde cero.</span>
              </h1>
              <p className={s.heroSub}>
                El alfabeto no es el problema — se lee en cuestión de horas. Lo que exige método son
                los casos y el aspecto verbal, y para eso necesitas que te los expliquen en español.
                <strong> Presencial en Bucaramanga u online desde cualquier ciudad.</strong>
              </p>
              <div className={s.heroCtas}>
                <a href={`https://wa.me/${WA}?text=${WA_GENERAL}`} target="_blank" rel="noopener noreferrer" className={s.waBtn}>
                  <WaIcon />
                  Diagnóstico gratis
                </a>
                <Link href="/practica/ruso" className={s.ghostBtn}>
                  Practicar ruso gratis →
                </Link>
              </div>
            </div>

            <div className={s.heroVisual}>
              <div className={s.heroCard}>
                <span className={s.heroCardFlag}>🇷🇺</span>
                <p className={s.heroCardTitle}>ТРКИ · TORFL</p>
                <p className={s.heroCardSub}>Examen oficial del Ministerio de Educación y Ciencia de la Federación de Rusia</p>
                <div className={s.levelBadges}>
                  {['A1','A2','B1','B2','C1','C2'].map(l => (
                    <span key={l} className={s.levelBadge}>{l}</span>
                  ))}
                </div>
              </div>
              <div className={s.heroCard}>
                <p className={s.heroCardTitle}>¿Por qué ruso?</p>
                <p className={s.heroCardSub}>
                  • Becas del gobierno ruso abiertas para colombianos<br />
                  • 33 letras que se leen en horas, no en meses<br />
                  • Pronunciación más fácil para ti que para un angloparlante<br />
                  • Casi nadie lo enseña en Santander
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
          <span className={s.proofItem}><strong>Profesora rusoparlante</strong></span>
        </div>

        {/* ══════════════ FUNDADORES ══════════════ */}
        <FoundersBand
          accent="#0039A6"
          title="El ruso lo enseña quien lo habla."
          intro="No es un curso grabado ni un profesor que va un capítulo por delante: la directora académica de WeLearn es rusoparlante."
          davidLine="Habla ocho idiomas y diseñó el método con el que enseñamos lenguas lejanas al español. Sabe exactamente dónde se atasca un hispanohablante, porque él pasó por ahí."
          zhannaLine="Rusoparlante y directora académica de WeLearn. Enseña el ruso desde adentro y, sobre todo, te explica los casos y el aspecto verbal en español, que es lo que de verdad marca la diferencia."
          zhannaTags={['Co-fundadora · Rusoparlante', 'Directora académica', 'Diseño curricular']}
        />

        {/* ══════════════ DIFICULTAD (AEO) ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>La pregunta que todos hacen</p>
            <h2 className={s.h2}>¿Qué tan difícil es aprender ruso si hablas español?</h2>
            <p className={s.sectionSub}>
              Exigente, sí. Imposible, no. El Foreign Service Institute clasifica el ruso como
              idioma de categoría IV y calcula unas 1.100 horas de estudio intensivo para llegar a
              competencia profesional. Eso lo pone por encima del francés o el italiano, y muy por
              debajo del chino, el árabe o el japonés.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Contexto</span>
                <p className={s.levelTitle}>Esa cifra hay que leerla bien</p>
                <p className={s.levelDesc}>
                  Son 1.100 horas en régimen diplomático de jornada completa, para llegar a nivel
                  profesional — no para defenderte. Además la escala está calibrada para
                  angloparlantes. Confundir &ldquo;profesional&rdquo; con &ldquo;hablarlo&rdquo; es lo que hace
                  creer que el ruso es inalcanzable.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>A tu favor</span>
                <p className={s.levelTitle}>La pronunciación te va a salir</p>
                <p className={s.levelDesc}>
                  Aquí el hispanohablante gana. La Р rusa es prácticamente nuestra &ldquo;rr&rdquo;, algo
                  que a un angloparlante le cuesta años. El sistema de vocales es manejable, no hay
                  tonos y, una vez sabes el alfabeto, se lee casi como se escribe.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>En contra</span>
                <p className={s.levelTitle}>Los casos y el aspecto verbal</p>
                <p className={s.levelDesc}>
                  Seis casos: cada sustantivo y adjetivo cambia de terminación según su función. Y
                  el aspecto verbal, que es el verdadero muro: cada verbo viene en pareja según si
                  la acción se completó o no. Tu intuición del español no transfiere, y por eso
                  necesitas que te lo expliquen en español.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ CIRÍLICO (AEO — rompe la objeción #1) ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>El miedo número uno</p>
            <h2 className={s.h2}>El alfabeto cirílico se aprende en horas, no en meses</h2>
            <p className={s.sectionSub}>
              Es lo que frena a casi todo el mundo, y es el obstáculo más pequeño de todos. Son 33
              letras y se leen en unas 3 a 8 horas. Automatizarlo —leer sin ir deletreando— toma
              entre dos y cuatro semanas de práctica.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Ya las conoces</span>
                <p className={s.levelTitle}>А Е К М О Т</p>
                <p className={s.levelDesc}>
                  Estas seis se leen igual que en español. Y si alguna vez viste letras griegas,
                  П, Р, Ф y Х también te suenan. El bloque genuinamente nuevo es mucho más pequeño
                  de lo que parece al mirar un texto por primera vez.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Las trampas</span>
                <p className={s.levelTitle}>Las que engañan</p>
                <p className={s.levelDesc}>
                  Las peligrosas no son las raras, son las que parecen conocidas y no lo son: Р se
                  lee &ldquo;r&rdquo;, В se lee &ldquo;v&rdquo;, Н se lee &ldquo;n&rdquo; y У se lee &ldquo;u&rdquo;.
                  Son las que producen los errores que más tardan en corregirse.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Lo que nadie avisa</span>
                <p className={s.levelTitle}>La cursiva manuscrita</p>
                <p className={s.levelDesc}>
                  Aquí sí hay sorpresa: la cursiva rusa a mano se parece tan poco a la imprenta que
                  funciona casi como un segundo alfabeto. Ninguna app te lo advierte, y es la razón
                  por la que mucha gente que &ldquo;ya sabe leer&rdquo; no entiende una nota escrita a mano.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ NIVELES Y EXAMEN ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Niveles</p>
            <h2 className={s.h2}>Del alfabeto al uso profesional</h2>
            <p className={s.sectionSub}>
              El sistema ruso tiene su propia escala, el ТРКИ, que corresponde con los niveles del
              Marco Común Europeo. Saber a cuál apuntas cambia por completo el plan.
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

        {/* ══════════════ BUCARAMANGA (SEO LOCAL) ══════════════ */}
        <LocalBand
          accent="#0039A6"
          idioma="ruso"
          intro="WeLearn es una academia de idiomas con sede en Bucaramanga. Si estás en la ciudad o en el área metropolitana puedes estudiar ruso presencialmente con nosotros; si prefieres no desplazarte —o vives en otra ciudad— la misma clase, con la misma profesora y el mismo plan, se hace por videollamada."
          presencial="Prácticamente la única opción de ruso con sede física en Santander: ni el Instituto de Lenguas de la UIS ni el Departamento de Lenguas de la UNAB lo incluyen en su catálogo, y no hay academias privadas locales que lo dicten."
          waText="Hola, estoy en Bucaramanga y quiero saber sobre las clases de ruso presenciales. ¿Cómo funcionan?"
        />

        {/* ══════════════ PARA QUÉ SIRVE (comercial) ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Para qué te sirve</p>
            <h2 className={s.h2}>Estudiar en Rusia con beca es el motivo número uno</h2>
            <p className={s.sectionSub}>
              El Gobierno de la Federación de Rusia mantiene abierta una convocatoria de becas para
              colombianos en pregrado, maestría y doctorado, que en Colombia se gestiona junto con
              el ICETEX. Cubre matrícula y alojamiento, e incluye un año de facultad preparatoria
              para aprender el idioma.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Seamos claros</span>
                <p className={s.levelTitle}>No necesitas ruso para postular</p>
                <p className={s.levelDesc}>
                  Si alguien te dice que sí, te está vendiendo humo. La beca incluye el año
                  preparatorio precisamente para eso. Lo que cambia es otra cosa: llegar con A2 o
                  B1 hace que aproveches ese año en lugar de sufrirlo, y con ТРКИ-1 algunas
                  universidades te dejan entrar directo a la carrera.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Familia</span>
                <p className={s.levelTitle}>Parejas y familias rusoparlantes</p>
                <p className={s.levelDesc}>
                  Es el motivo más constante de todos: entender a la familia de tu pareja, hablar
                  con tus suegros, criar hijos bilingües. La motivación es alta y sostenida, y los
                  resultados suelen llegar antes de lo esperado.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Trámites</span>
                <p className={s.levelTitle}>Y el nivel que piden</p>
                <p className={s.levelDesc}>
                  Para los trámites de ciudadanía rusa se pide el ТБУ, equivalente a un A2 — un
                  nivel alcanzable. Para entrar a una universidad rusa sin año preparatorio, el
                  ТРКИ-1, equivalente a B1.
                </p>
              </div>
            </div>
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <a href={`https://wa.me/${WA}?text=${WA_BECAS}`} target="_blank" rel="noopener noreferrer" className={s.waBtnLight}>
                <WaIcon /> Quiero prepararme para estudiar en Rusia →
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════ EXAMEN OFICIAL (AEO diferencial) ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>El examen oficial</p>
            <h2 className={s.h2}>¿Se puede presentar el examen oficial de ruso en Colombia?</h2>
            <p className={s.sectionSub}>
              Respuesta corta y honesta: <strong>no de forma permanente</strong>. Es información
              que casi nadie da en español y que conviene tener antes de hacer planes o comprar
              tiquetes.
            </p>
            <div className={s.levelsGrid}>
              <div className={s.levelCard}>
                <span className={s.levelTag}>En Colombia</span>
                <p className={s.levelTitle}>No hay centro examinador fijo</p>
                <p className={s.levelDesc}>
                  El ТРКИ se ha aplicado alguna vez en Bogotá, en el Instituto Cultural León
                  Tolstói, mediante delegaciones puntuales de universidades rusas. Pero no existe
                  una convocatoria estable, ni Casa de Rusia, ni Instituto Pushkin, ni centro ruso
                  de ciencia y cultura en el país.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Alternativas</span>
                <p className={s.levelTitle}>Rusia, España o remoto</p>
                <p className={s.levelDesc}>
                  La mayoría de candidatos colombianos terminan presentándolo en Rusia, en España
                  —donde hay varios centros— o de forma remota a través de una universidad rusa
                  autorizada. Conviene confirmar disponibilidad y modalidad antes de organizar
                  nada.
                </p>
              </div>
              <div className={s.levelCard}>
                <span className={s.levelTag}>Qué hacemos</span>
                <p className={s.levelTitle}>Te preparamos igual</p>
                <p className={s.levelDesc}>
                  La preparación no depende de dónde rindas: las cinco secciones del examen se
                  entrenan igual desde Bucaramanga. Y si tu objetivo es la beca, el nivel importa
                  más que el certificado — lo que pesa es llegar sabiendo.
                </p>
              </div>
            </div>
            <p className={s.sectionSub} style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
              Las convocatorias y las sedes cambian. Confirma siempre la información vigente en la
              fuente oficial antes de inscribirte o viajar.
            </p>
          </div>
        </section>

        {/* ══════════════ PRACTICA GRATIS ══════════════ */}
        <PracticeBand
          accent="#0039A6"
          title="Empieza hoy, gratis, sin registro"
          sub="Alfabeto, gramática, vocabulario con audio, escucha, lectura y escritura. Compruébalo tú mismo antes de matricularte."
          cards={[
            { href: '/practica/ruso/a1/gramatica', title: 'Gramática A1 · A2 · B1', desc: 'Los casos explicados desde el español, paso a paso, con corrección inmediata en los tres niveles.' },
            { href: '/practica/ruso/a1/vocabulario', title: 'Vocabulario con audio', desc: 'Palabras de alta frecuencia con audio nativo, para acostumbrar el oído desde el primer día.' },
            { href: '/practica/ruso/a1/lectura', title: 'Comprensión lectora', desc: 'El mejor ejercicio para automatizar el cirílico: leer de verdad, no memorizar letras sueltas.' },
            { href: '/practica/ruso/a1/escucha', title: 'Comprensión auditiva', desc: 'Audio a velocidad real con preguntas de comprensión, desde nivel principiante.' },
            { href: '/practica/ruso/a1/escritura', title: 'Escritura', desc: 'Escribe en cirílico con modelo de nivel para comparar. La forma más rápida de fijar el alfabeto.' },
            { href: '/practica/ruso/a1/habla', title: 'Expresión oral', desc: 'Frases y estructuras para hablar desde el principio, con pronunciación modelo para imitar.' },
            { href: '/practica/ruso/b1', title: 'Nivel B1 completo', desc: 'El nivel que abre la puerta a las universidades rusas sin año preparatorio.' },
            { href: '/nivel-radar', title: 'Descubre tu nivel real', desc: 'Si ya sabes algo de ruso, el diagnóstico te ubica antes de la primera clase.' },
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
            <h2 className={s.ctaTitle}>Tu diagnóstico de ruso<br /><span className={s.accent}>es gratis.</span></h2>
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
