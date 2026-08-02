import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FoundersBand from '@/components/hub/FoundersBand';
import LocalBand from '@/components/hub/LocalBand';
import PracticeBand from '@/components/hub/PracticeBand';
import { localBusinessNode, davidNode, zhannaNode, courseInstances } from '@/components/hub/localBusiness';
import s from './page.module.css';
import { KOREAN_STEPS } from '@/data/stepsMeta';

const WA = '573005004253';
const WA_GENERAL   = encodeURIComponent('Hola, vi la página de clases de coreano en WeLearn y quiero agendar mi clase de diagnóstico gratis.');
const WA_TOPIK     = encodeURIComponent('Hola, quiero prepararme para el examen TOPIK con WeLearn. ¿Cuándo puedo empezar?');
const WA_FUNDADOR  = encodeURIComponent('Hola, me interesa el cupo de Miembro Fundador de coreano en WeLearn. ¿Quedan cupos disponibles?');

export const metadata: Metadata = {
  title: 'Clases de Coreano en Bucaramanga y Online — TOPIK, Hangul | WeLearn',
  description:
    'Academia de coreano en Bucaramanga con clases online para toda Colombia. Hangul, pronunciación, TOPIK I y II. Clases 1:1 con tutor especializado. Cupos de Miembro Fundador disponibles.',
  keywords: [
    'clases de coreano online Colombia',
    'aprender coreano Bucaramanga',
    'curso de coreano para principiantes',
    'TOPIK preparación Colombia',
    'aprender hangul',
    'coreano online Colombia',
    'clases coreano baratas',
    'método para aprender coreano',
    'aprender coreano desde cero',
    'WeLearn coreano',
  ],
  openGraph: {
    title: 'Clases de Coreano en Bucaramanga y Online — WeLearn',
    description:
      'Academia de coreano en Bucaramanga. Hangul, pronunciación, TOPIK I y II. Clases 1:1. 50 cupos de Miembro Fundador para toda Colombia.',
    url: 'https://www.idiomaswl.com/clases-de-coreano',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/clases-de-coreano' },
};

/**
 * FAQPage derivado del MISMO arreglo que se pinta en pantalla.
 *
 * Antes estaba escrito a mano y había divergido: 7 preguntas en el marcado contra
 * 5 visibles. Esa diferencia entre lo que ve Google y lo que ve la persona es justo
 * lo que se penaliza. Ahora una pregunta se escribe una sola vez, en FAQS.
 */
const faqPageNode = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Coreano con el método WeLearn',
      description: 'Aprende coreano desde cero hasta TOPIK con el método WeLearn de 17 pasos. Clases 1:1 con tutor especializado.',
      provider: {
        '@type': 'Organization',
        name: 'Idiomas WeLearn',
        url: 'https://www.idiomaswl.com',
      },
      hasCourseInstance: courseInstances('Coreano', 'ko'),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'COP',
        description: 'Clase de diagnóstico gratis',
        availability: 'https://schema.org/LimitedAvailability',
      },
    },
    localBusinessNode(
      'Academia de idiomas en Bucaramanga con clases presenciales y online para toda Colombia. Coreano con preparación TOPIK, además de inglés, francés, alemán, italiano, portugués y ruso.'
    ),
    davidNode(
      'Políglota activo en ocho idiomas y co-fundador de WeLearn. El coreano fue el último que aprendió, y con él terminó de afinar el método que la academia usa para lenguas lejanas al español.'
    ),
    zhannaNode(
      'Co-fundadora y directora académica de WeLearn, formada en Francia e Inglaterra. Lidera el diseño curricular y la preparación de certificaciones internacionales.',
      ['es', 'en', 'fr', 'ru']
    ),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de Coreano', item: 'https://www.idiomaswl.com/clases-de-coreano' },
      ],
    },
  ],
};

const METODO_STEPS = [
  { n: '01', title: 'Hangul en 2 días',    desc: 'El alfabeto coreano es fonético. Con nuestra guía lo dominas en 2 sesiones.' },
  { n: '02', title: 'Pronunciación base',  desc: 'Consonantes, vocales, rechazo y tensión. Desde el inicio, suenas correcto.' },
  { n: '03', title: 'Vocabulario de alta frecuencia', desc: '500 palabras que cubren el 80% de conversaciones cotidianas.' },
  { n: '04', title: 'Gramática funcional', desc: 'Partículas, conjugaciones, honoríficos. Sin memorización vacía.' },
  { n: '05', title: 'Escucha intensiva',   desc: 'K-dramas, K-pop, noticias. Entrenar el oído desde el nivel 1.' },
  { n: '06', title: 'Producción oral',     desc: 'Hablas desde la primera semana. Sin miedo a equivocarte.' },
];

const LEVELS = [
  { badge: 'Principiante',        title: 'Cero a TOPIK I',   desc: 'Hangul, saludos, vida cotidiana, viajes. Preparación para TOPIK nivel 1–2.',    time: '6–8 meses' },
  { badge: 'Intermedio',          title: 'TOPIK I a TOPIK II', desc: 'Conversación fluida, trabajo, contextos formales. Apunta al nivel 3–4.',      time: '8–12 meses' },
  { badge: 'Avanzado',            title: 'TOPIK II y fluidez', desc: 'Coreano de negocios, K-drama sin subtítulos, nivel 5–6.',                       time: '12–18 meses' },
];

const FAQS = [
  {
    q: '¿Necesito saber algo de coreano para empezar?',
    a: 'No. Empezamos desde cero: la primera sesión cubre el alfabeto Hangul y los primeros sonidos. En 2–3 días ya puedes leer coreano básico.',
  },
  {
    q: '¿Qué tan diferente es el coreano del español?',
    a: 'Es muy diferente en estructura (SOV en lugar de SVO), pero la pronunciación es más sencilla de lo que parece. Con el método correcto, progresas rápido.',
  },
  {
    q: '¿Se puede aprender coreano para ver K-dramas sin subtítulos?',
    a: 'Sí, y ese es un objetivo válido. Con 12–18 meses de práctica constante puedes seguir series sin subtítulos. Usamos K-dramas como material didáctico.',
  },
  {
    q: '¿Para qué sirve el TOPIK?',
    a: 'TOPIK (Test of Proficiency in Korean) es la certificación oficial coreana. Es requerida para trabajar, estudiar o migrar a Corea. Preparamos desde nivel 1 hasta 6.',
  },
  // Añadidas desde consultas reales de Search Console: cuánto se tarda, si el
  // hangul es difícil, las becas de Corea y qué nivel piden para trabajar allí.
  {
    q: '¿Cuánto se tarda en aprender coreano desde cero?',
    a: 'Leer el hangul se consigue en unas semanas y ahí mucha gente se sorprende. Lo que toma tiempo es la estructura: el coreano pone el verbo al final y marca la función de cada palabra con partículas, así que hay que reordenar la cabeza. Con constancia semanal, un TOPIK 1 o 2 es un objetivo razonable para el primer año; el salto a TOPIK 3 es bastante más largo. Desconfía de quien te dé una cifra exacta sin conocer tu punto de partida.',
  },
  {
    q: '¿El hangul es tan difícil como parece?',
    a: 'No, y es la mejor noticia del coreano. No es un sistema de miles de caracteres como el chino: son 24 letras que se combinan en sílabas, y se diseñó a propósito para que fuera fácil de aprender. La mayoría de estudiantes lo leen en dos o tres semanas. Lo difícil viene después, con la gramática y los niveles de formalidad.',
  },
  {
    q: '¿Necesito TOPIK para la beca del Gobierno coreano?',
    a: 'No. A la beca GKS puedes postularte sin ningún nivel de coreano, porque incluye un año de estudio del idioma. Tener TOPIK suma puntos en la evaluación, pero no es requisito de entrada. Es un malentendido que frena a mucha gente que sí podría aplicar.',
  },
  {
    q: '¿Qué nivel de coreano piden para trabajar en Corea?',
    a: 'Depende del puesto y del tipo de visa. Como orientación, donde el coreano es la lengua de trabajo suele pedirse TOPIK 4 o superior; en empresas internacionales con inglés como lengua franca el requisito puede ser mucho menor. Verifica siempre la oferta concreta.',
  },
  {
    q: '¿Dan clases de coreano presenciales en Bucaramanga?',
    a: 'Sí. Tenemos sede en el barrio Sotomayor, Calle 47 # 29-33, y también damos las clases online para quien vive lejos o tiene horarios difíciles. Puedes alternar entre las dos modalidades según te cuadre la semana.',
  },
  {
    q: '¿Las clases son en vivo o grabadas?',
    a: 'Las clases 1:1 son en vivo por videollamada. También tienes acceso al método de 17 pasos con videos, ejercicios y podcasts para practicar entre sesiones.',
  },
];

export default function ClasesDeCoreanoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageNode()) }}
      />
      <main className={s.page}>

        {/* ══════════════ HERO ══════════════ */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <div className={s.heroKorean}>안녕하세요</div>
              <p className={s.eyebrow}>Academia de coreano · Bucaramanga y Colombia</p>
              <h1 className={s.h1}>
                Aprende coreano<br />
                <span className={s.accent}>de verdad.</span>
              </h1>
              <p className={s.heroSub}>
                El coreano no es difícil — es diferente. Con el método correcto,
                en 6 meses ya entiendes K-dramas, ordenas en un restaurante coreano
                y estás listo para el TOPIK I.
              </p>
              <div className={s.heroCtas}>
                <a
                  href={`https://wa.me/${WA}?text=${WA_GENERAL}`}
                  target="_blank" rel="noopener noreferrer"
                  className={s.waBtn}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Clase de diagnóstico gratis
                </a>
                <a href="#miembro-fundador" className={s.ghostBtn}>
                  Ver oferta Miembro Fundador →
                </a>
              </div>
            </div>
            <div className={s.heroVisual}>
              {/* Step003 lesson preview video — muted autoplay (compressed to 3 MB) */}
              <video
                className={s.heroVideo}
                src="/assets/korean/step003/video/STEP003_web.mp4"
                poster="/assets/korean/step003/welcome_v1.png"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className={s.heroBadge}>
                <span className={s.heroBadgeNum}>17</span>
                <span className={s.heroBadgeLabel}>pasos del<br />método</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ PROOF STRIP ══════════════ */}
        <div className={s.proofStrip}>
          <div className={s.proofItem}><strong>6 idiomas</strong> en la plataforma</div>
          <div className={s.proofDivider} />
          <div className={s.proofItem}><strong>17 pasos</strong> por nivel</div>
          <div className={s.proofDivider} />
          <div className={s.proofItem}><strong>TOPIK I y II</strong> incluidos</div>
          <div className={s.proofDivider} />
          <div className={s.proofItem}><strong>50 cupos</strong> Miembro Fundador</div>
        </div>

        {/* ══════════════ WHY KOREAN ══════════════ */}
        {/* ══════════════ FUNDADORES ══════════════ */}
        <FoundersBand
          accent="#c8202e"
          title="Dos políglotas te enseñan coreano. No un curso grabado."
          intro="Detrás de cada clase hay dos personas que aprendieron idiomas de verdad, no una app con lecciones automáticas."
          davidLine="Habla ocho idiomas y el coreano fue el último que aprendió. Justamente por eso llegó a él con todo el método ya afinado, y sabe qué atajos funcionan y cuáles no."
          zhannaLine="Co-fundadora y directora académica de WeLearn, formada en Francia e Inglaterra. Diseña las rutas de nivel y controla que la preparación del TOPIK corresponda a lo que el examen realmente evalúa."
          zhannaTags={['Lingüista titulada · Co-fundadora', 'Preparación TOPIK', 'Diseño curricular']}
        />

        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>¿Por qué coreano?</p>
            <h2 className={s.h2}>El idioma del momento — y con futuro</h2>
            <div className={s.whyGrid}>
              <div className={s.whyCard}>
                <div className={s.whyIcon}>🎬</div>
                <h3 className={s.whyTitle}>K-dramas sin subtítulos</h3>
                <p className={s.whyDesc}>Netflix, Disney+, Viki. El contenido coreano es global. Entender el idioma original cambia completamente la experiencia.</p>
              </div>
              <div className={s.whyCard}>
                <div className={s.whyIcon}>💼</div>
                <h3 className={s.whyTitle}>Oportunidades laborales</h3>
                <p className={s.whyDesc}>Samsung, Hyundai, LG, Lotte — todas con presencia en Latinoamérica. El coreano abre puertas que el inglés solo no puede.</p>
              </div>
              <div className={s.whyCard}>
                <div className={s.whyIcon}>✈️</div>
                <h3 className={s.whyTitle}>Vivir o estudiar en Corea</h3>
                <p className={s.whyDesc}>Becas del gobierno coreano (GKS), universidades top, visa de trabajo. El TOPIK es el requisito base para casi todo.</p>
              </div>
              <div className={s.whyCard}>
                <div className={s.whyIcon}>🎵</div>
                <h3 className={s.whyTitle}>K-pop y cultura</h3>
                <p className={s.whyDesc}>BTS, BLACKPINK, NewJeans. Entender las letras, leer los créditos, conectar con la cultura de otra forma.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ MÉTODO ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Cómo aprendemos</p>
            <h2 className={s.h2}>El método WeLearn aplicado al coreano</h2>
            <p className={s.sectionSub}>
              No memorizas listas de vocabulario. Construyes el idioma capa por capa,
              de la misma forma que tu cerebro aprendió el español: con contexto, repetición y uso real.
            </p>
            <div className={s.metodGrid}>
              {METODO_STEPS.map(step => (
                <div key={step.n} className={s.metodStep}>
                  <span className={s.metodNum}>{step.n}</span>
                  <div>
                    <h3 className={s.metodTitle}>{step.title}</h3>
                    <p className={s.metodDesc}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={s.metodCta}>
              <a href="/metodo" className={s.ghostBtnLight}>Ver el método completo (17 pasos) →</a>
            </div>
          </div>
        </section>

        {/* ══════════════ LEVELS ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Rutas de aprendizaje</p>
            <h2 className={s.h2}>Desde cero hasta fluidez</h2>
            <div className={s.levelsGrid}>
              {LEVELS.map(lv => (
                <div key={lv.badge} className={s.levelCard}>
                  <span className={s.levelBadge}>{lv.badge}</span>
                  <h3 className={s.levelTitle}>{lv.title}</h3>
                  <p className={s.levelDesc}>{lv.desc}</p>
                  <div className={s.levelTime}>⏱ {lv.time}</div>
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
                    sizes="(max-width: 600px) 100vw, 320px"
                  />
                </div>
              </div>
              <div className={s.instructorText}>
                <p className={s.sectionEyebrow}>Tu instructor</p>
                <h2 className={s.h2}>David habla 8 idiomas. El coreano lo cambió todo.</h2>
                <p className={s.instructorP}>
                  Después de aprender inglés, francés, alemán, italiano, portugués y ruso,
                  David tomó el coreano como el reto más diferente. &ldquo;Los otros idiomas comparten
                  raíces con el español. El coreano no tiene nada en común — y eso lo hace fascinante.&rdquo;
                </p>
                <p className={s.instructorP}>
                  Esa experiencia de aprender un idioma radicalmente diferente es la base del
                  método WeLearn para coreano: estructurado, progresivo, y diseñado para hispanohablantes.
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

        {/* ══════════════ MIEMBRO FUNDADOR ══════════════ */}
        <section className={s.founderSection} id="miembro-fundador">
          <div className={s.wrap}>
            <div className={s.founderBox}>
              <div className={s.founderBadgeRow}>
                <span className={s.founderBadge}>🔥 Oferta de lanzamiento</span>
                <span className={s.founderSpots}>50 cupos · Precio vitalicio</span>
              </div>
              <h2 className={s.founderTitle}>Miembro Fundador de Coreano</h2>
              <p className={s.founderSub}>
                Los primeros 50 estudiantes que se unan al programa de coreano acceden
                a un precio especial que <strong>se congela para siempre</strong>. Cuando
                el precio suba, tú sigues pagando el precio fundador.
              </p>
              <div className={s.founderPerks}>
                <div className={s.founderPerk}><span>✅</span> Precio vitalicio — nunca sube para ti</div>
                <div className={s.founderPerk}><span>✅</span> Acceso prioritario a todos los niveles nuevos</div>
                <div className={s.founderPerk}><span>✅</span> Grupo exclusivo de fundadores en WhatsApp</div>
                <div className={s.founderPerk}><span>✅</span> Sesión de bienvenida 1:1 con David</div>
                <div className={s.founderPerk}><span>✅</span> Tu nombre en los créditos del programa</div>
              </div>
              <a
                href={`https://wa.me/${WA}?text=${WA_FUNDADOR}`}
                target="_blank" rel="noopener noreferrer"
                className={s.founderBtn}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Quiero ser Miembro Fundador
              </a>
              <p className={s.founderNote}>
                Te contactamos por WhatsApp para confirmar tu cupo y enviarte los detalles de pago.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════ TOPIK ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Certificación</p>
            <h2 className={s.h2}>Prepárate para el TOPIK</h2>
            <div className={s.topikGrid}>
              <div className={s.topikCard}>
                <div className={s.topikLevel}>TOPIK I</div>
                <div className={s.topikLevels}>Niveles 1 y 2</div>
                <p className={s.topikDesc}>Comprensión y vocabulario básico. Ideal para visa de turismo extendida o admisión a programas de idiomas en Corea.</p>
                <div className={s.topikSkills}>
                  <span>Lectura</span>
                  <span>Escucha</span>
                </div>
              </div>
              <div className={s.topikCard}>
                <div className={s.topikLevel}>TOPIK II</div>
                <div className={s.topikLevels}>Niveles 3–6</div>
                <p className={s.topikDesc}>Desde comunicación funcional hasta dominio académico. Requerido para universidades coreanas y empleos en empresas coreanas.</p>
                <div className={s.topikSkills}>
                  <span>Lectura</span>
                  <span>Escucha</span>
                  <span>Escritura</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a
                href={`https://wa.me/${WA}?text=${WA_TOPIK}`}
                target="_blank" rel="noopener noreferrer"
                className={s.waBtn}
              >
                Quiero prepararme para el TOPIK
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════ STEPS — LECCIONES DEL MÉTODO ══════════════ */}
        <section className={s.sectionDark} id="lecciones">
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Método WeLearn · 17 pasos</p>
            <h2 className={s.h2}>Empieza a aprender hoy — gratis</h2>
            <p className={s.sectionSub}>
              Los primeros 5 pasos del método son completamente gratuitos.
              Sin registro. Entra, aprende y decide.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '0.6rem',
              marginTop: '1.75rem',
            }}>
              {Array.from({ length: 20 }, (_, i) => i + 1).map(step => {
                const meta = KOREAN_STEPS[step];
                const free = step <= 5;
                const label = free ? `Lección ${step}` : `Paso ${step}`;
                const title = meta?.episodeTitle?.split('·')[0]?.trim() ?? `Paso ${step}`;
                const sub   = meta?.grammarLabel ?? (free ? 'Gramática' : '');
                return free ? (
                  <Link
                    key={step}
                    href={`/courses/korean/step/${step}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                      padding: '1rem 1rem 0.9rem',
                      borderRadius: 12,
                      border: '1.5px solid rgba(200,32,46,0.55)',
                      background: 'rgba(200,32,46,0.12)',
                      backdropFilter: 'blur(12px)',
                      textDecoration: 'none',
                      transition: 'border-color .2s, background .2s, transform .2s, box-shadow .2s',
                      boxShadow: '0 2px 16px rgba(200,32,46,0.08)',
                    }}
                  >
                    <span style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#f87171' }}>
                      ▶ {label}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{title}</span>
                    {sub && <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>{sub}</span>}
                    <span style={{ fontSize: '0.65rem', marginTop: '0.25rem', color: '#f87171', fontWeight: 600 }}>Gratis →</span>
                  </Link>
                ) : (
                  <div
                    key={step}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                      padding: '1rem 1rem 0.9rem',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: 'rgba(255,255,255,0.04)',
                      cursor: 'default',
                    }}
                  >
                    <span style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'rgba(255,255,255,0.3)' }}>
                      🔒 {label}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>{title}</span>
                    {sub && <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)' }}>{sub}</span>}
                    <span style={{ fontSize: '0.65rem', marginTop: '0.25rem', color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>Suscripción</span>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a
                href={`https://wa.me/${WA}?text=${WA_FUNDADOR}`}
                target="_blank" rel="noopener noreferrer"
                className={s.ghostBtnLight}
              >
                Desbloquear todos los pasos → Miembro Fundador
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════ SECCIONES DE PRÁCTICA ══════════════ */}
        {/* ══════════════ BUCARAMANGA (SEO LOCAL) ══════════════ */}
        <LocalBand
          accent="#c8202e"
          idioma="coreano"
          intro="WeLearn es una academia de idiomas con sede en Bucaramanga. Si estás en la ciudad o en el área metropolitana puedes estudiar coreano presencialmente con nosotros; si prefieres no desplazarte —o vives en otra ciudad— la misma clase, con el mismo profesor y el mismo plan, se hace por videollamada."
          presencial="Clases cara a cara para un idioma que casi nadie enseña en Santander. El TOPIK solo se aplica en Bogotá, así que aquí lo que resolvemos es la preparación completa."
          waText="Hola, estoy en Bucaramanga y quiero saber sobre las clases de coreano presenciales. ¿Cómo funcionan?"
        />

        {/* ══════════════ PRACTICA GRATIS ══════════════ */}
        <div id="practica">
          <PracticeBand
            accent="#c8202e"
            title="Todo lo que puedes practicar gratis desde hoy"
            sub="Las cinco habilidades, el diagnóstico TOPIK y el vocabulario con imágenes. Corrección inmediata y sin registro."
            cards={[
              { href: '/practica/coreano/a1/gramatica', title: 'Gramática A1 · A2 · B1', desc: 'Partículas, orden de la frase y niveles de formalidad, explicados desde el español en los tres niveles.' },
              { href: '/practica/coreano/a1/vocabulario', title: 'Vocabulario con audio', desc: 'Palabras de alta frecuencia con audio nativo, para fijar pronunciación desde el primer día.' },
              { href: '/practica/coreano/a1/lectura', title: 'Comprensión lectora', desc: 'El mejor ejercicio para automatizar el Hangul: leer de verdad, no memorizar sílabas sueltas.' },
              { href: '/practica/coreano/a1/escucha', title: 'Comprensión auditiva', desc: 'Audio a velocidad real con preguntas de comprensión, desde nivel principiante.' },
              { href: '/practica/coreano/a1/escritura', title: 'Escritura', desc: 'Escribe en Hangul con modelo de nivel para comparar tu respuesta.' },
              { href: '/practica/coreano/a1/habla', title: 'Expresión oral', desc: 'Frases y estructuras para hablar desde el principio, con pronunciación modelo.' },
              { href: '/aprende-coreano/palabras-compuestas', title: 'Palabras compuestas (합성어)', desc: 'Cómo el coreano fabrica palabras nuevas juntando dos: entiendes decenas de términos sin memorizarlos uno a uno.' },
              { href: '/practica/vocabulario-coreano', title: 'Vocabulario con imágenes', desc: 'Ve la imagen, escucha el audio y elige la palabra. Doce palabras clave para descubrir tu nivel A1.' },
              { href: '/examenes/topik/practica/set-1', title: 'Diagnóstico TOPIK', desc: 'Treinta preguntas al estilo del examen oficial, con tu nivel estimado al final.' },
            ]}
          />
        </div>

        {/* ══════════════ DIAGNÓSTICO TOPIK ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Diagnóstico gratuito</p>
            <h2 className={s.h2}>¿En qué nivel de coreano estás?</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 560, marginBottom: '2rem', lineHeight: 1.65, fontSize: '0.97rem' }}>
              Haz el simulacro de lectura estilo TOPIK I y descubre en minutos si eres
              Nivel 1, Nivel 2, o estás en etapa inicial. Sin registro. Sin tiempo límite.
              30 preguntas, resultado inmediato.
            </p>

            {/* Diagnostic card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,52,120,0.25), rgba(200,32,46,0.15))',
              border: '1px solid rgba(0,52,120,0.4)',
              borderRadius: 20,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              maxWidth: 620,
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 16,
                  background: 'rgba(0,52,120,0.4)',
                  border: '1px solid rgba(0,52,120,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', flexShrink: 0,
                }}>🇰🇷</div>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#7eb3ff', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.3rem' }}>
                    TOPIK I · 읽기 · Lectura
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.3rem' }}>
                    Diagnóstico de Nivel de Coreano
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                    30 preguntas al estilo oficial TOPIK I · Resultado en segundos
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {[
                  { icon: '📖', label: '30 preguntas', sub: 'Lectura TOPIK I' },
                  { icon: '⏱️', label: 'Sin límite', sub: 'A tu ritmo' },
                  { icon: '🎯', label: 'Nivel exacto', sub: 'Nivel 1 · Nivel 2 · Inicial' },
                ].map((stat) => (
                  <div key={stat.label} style={{
                    flex: 1, minWidth: 120,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12, padding: '0.75rem 1rem',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '1.3rem', marginBottom: '0.2rem' }}>{stat.icon}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.1rem' }}>{stat.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/examenes/topik/practica/set-1"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 1.5rem',
                  background: 'linear-gradient(135deg, #003478, #c8202e)',
                  color: '#fff',
                  borderRadius: 14,
                  fontWeight: 800,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'opacity 0.15s',
                }}
              >
                🇰🇷 Hacer el diagnóstico gratis →
              </Link>
              <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--muted)', marginTop: '-0.75rem' }}>
                Sin registro · Resultado inmediato · 100% gratuito
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ FAQ ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Preguntas frecuentes</p>
            <h2 className={s.h2}>Lo que todos preguntan antes de empezar</h2>
            <div className={s.faqList}>
              {FAQS.map((f, i) => (
                <details key={i} className={s.faqItem}>
                  <summary className={s.faqQ}>{f.q}</summary>
                  <p className={s.faqA}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ BLOG RESOURCES ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Del blog WeLearn</p>
            <h2 className={s.h2}>Guías gratuitas para aprender coreano</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
              {[
                { cat: 'Coreano', title: 'Clases de coreano online en Colombia: guía para elegir bien', slug: 'clases-de-coreano-online-colombia' },
                { cat: 'Coreano', title: '¿Cuánto cuesta aprender coreano en Colombia en 2026?', slug: 'cuanto-cuesta-aprender-coreano-colombia-2026' },
                { cat: 'Coreano', title: 'Aprender coreano desde cero en Colombia: la guía completa', slug: 'aprender-coreano-desde-cero-guia-colombia' },
                { cat: 'Coreano', title: 'TOPIK I: cómo prepararlo desde cero y pasar al primer intento', slug: 'topik-1-preparacion-guia-para-principiantes' },
                { cat: 'Coreano', title: 'Beca GKS de Corea del Sur para colombianos: requisitos y TOPIK', slug: 'beca-gks-corea-del-sur-para-colombianos' },
                { cat: 'Coreano', title: 'Aprender idiomas con series y películas: lo que funciona', slug: 'aprender-idiomas-con-series-y-peliculas' },
                { cat: 'Coreano', title: 'Ventajas (y retos) de aprender coreano siendo hispanohablante', slug: 'aprender-coreano-siendo-hispanohablante' },
                { cat: 'Coreano', title: 'TOPIK I vs TOPIK II: diferencia y cuál debes tomar', slug: 'topik-i-vs-topik-ii-diferencias' },
                { cat: 'Coreano', title: 'TOPIK II: cómo pasar del nivel 2 al nivel 4 en coreano', slug: 'topik-ii-como-subir-de-nivel' },
                { cat: 'Coreano', title: 'TOPIK 2026: fechas, centros en Colombia y cómo inscribirse', slug: 'topik-fechas-centros-colombia-latinoamerica-2026' },
                { cat: 'Coreano', title: 'Hangul en 1 semana: la guía definitiva para hispanohablantes', slug: 'hangul-aprender-en-una-semana-guia-completa' },
                { cat: 'Coreano', title: 'Coreano para trabajar en Samsung, LG, Hyundai o Kia en Colombia', slug: 'coreano-para-trabajar-en-samsung-lg-hyundai' },
                { cat: 'Coreano', title: 'Visa E-7 Corea del Sur: nivel de coreano y requisitos para colombianos', slug: 'visa-trabajo-corea-e7-requisitos-nivel-coreano' },
                { cat: 'Coreano', title: 'TOPIK II niveles 3 y 4: qué se evalúa y cómo alcanzarlos', slug: 'coreano-nivel-topik-3-4-como-alcanzarlo' },
                { cat: 'Coreano', title: 'Batchim: guía de consonantes finales del coreano para hispanohablantes', slug: 'coreano-pronunciacion-batchim-consonantes-finales' },
                { cat: 'Coreano', title: 'Aprender coreano con K-dramas: qué funciona y qué no', slug: 'coreano-k-dramas-para-aprender-series-recomendadas' },
                { cat: 'Coreano', title: 'Nivel mínimo de coreano para trabajar en Corea del Sur', slug: 'coreano-nivel-minimo-para-trabajar-en-corea' },
                { cat: 'Coreano', title: 'Aprender coreano con K-pop: qué funciona y cómo hacerlo', slug: 'coreano-canciones-kpop-para-aprender-idioma' },
              ].map(a => (
                <Link key={a.slug} href={`/blog/${a.slug}`} style={{ display: 'block', padding: '1rem 1.1rem', borderRadius: 10, border: '1px solid var(--line-soft)', background: 'var(--bg)', textDecoration: 'none' }}>
                  <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#c8202e', background: 'rgba(200,32,46,0.1)', padding: '2px 8px', borderRadius: 100, marginBottom: '0.55rem' }}>{a.cat}</span>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4, color: 'var(--ink)', margin: 0 }}>{a.title} →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FINAL CTA ══════════════ */}
        <section className={s.ctaSection}>
          <div className={s.wrap}>
            <div className={s.ctaBox}>
              <div className={s.ctaKorean}>시작하세요</div>
              <h2 className={s.ctaTitle}>¿Listo para empezar?</h2>
              <p className={s.ctaSub}>
                Diagnóstico inicial gratis. Sin compromisos.
                En 50 minutos sabes exactamente en qué nivel estás y qué necesitas para llegar a donde quieres.
              </p>
              <div className={s.ctaBtns}>
                <a
                  href={`https://wa.me/${WA}?text=${WA_GENERAL}`}
                  target="_blank" rel="noopener noreferrer"
                  className={s.waBtn}
                >
                  Agendar diagnóstico gratis por WhatsApp
                </a>
                <a href="#miembro-fundador" className={s.ghostBtn}>
                  Ver Miembro Fundador
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
