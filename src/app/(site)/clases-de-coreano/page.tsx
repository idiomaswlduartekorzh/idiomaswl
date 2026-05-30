import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import s from './page.module.css';
import { KOREAN_STEPS } from '@/data/stepsMeta';

const WA = '573005004253';
const WA_GENERAL   = encodeURIComponent('Hola, vi la página de clases de coreano en WeLearn y quiero agendar mi clase de diagnóstico gratis.');
const WA_TOPIK     = encodeURIComponent('Hola, quiero prepararme para el examen TOPIK con WeLearn. ¿Cuándo puedo empezar?');
const WA_FUNDADOR  = encodeURIComponent('Hola, me interesa el cupo de Miembro Fundador de coreano en WeLearn. ¿Quedan cupos disponibles?');

export const metadata: Metadata = {
  title: 'Aprende Coreano Online — Clases con Profesor Nativo | WeLearn',
  description:
    'Aprende coreano con el método WeLearn: pronunciación, Hangul, vocabulario esencial y preparación TOPIK. Clases 1:1 con tutor. Cupos de Miembro Fundador disponibles. Desde Bucaramanga, para toda Colombia.',
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
    title: 'Aprende Coreano Online con el método WeLearn',
    description:
      'Hangul, pronunciación, vocabulario esencial y TOPIK. Clases 1:1 con tutor. 50 cupos de Miembro Fundador. Para colombianos que van en serio.',
    url: 'https://idiomaswl.com/clases-de-coreano',
  },
  alternates: { canonical: 'https://idiomaswl.com/clases-de-coreano' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Necesito saber algo de coreano para empezar?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. Empezamos desde cero: la primera sesión cubre el alfabeto Hangul y los primeros sonidos. En 2–3 días ya puedes leer coreano básico.' },
    },
    {
      '@type': 'Question',
      name: '¿Qué tan diferente es el coreano del español?',
      acceptedAnswer: { '@type': 'Answer', text: 'Es muy diferente en estructura (SOV en lugar de SVO), pero la pronunciación es más sencilla de lo que parece. Con el método correcto, progresas rápido.' },
    },
    {
      '@type': 'Question',
      name: '¿Se puede aprender coreano para ver K-dramas sin subtítulos?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí, y ese es un objetivo válido. Con 12–18 meses de práctica constante puedes seguir series sin subtítulos. Usamos K-dramas como material didáctico.' },
    },
    {
      '@type': 'Question',
      name: '¿Para qué sirve el TOPIK?',
      acceptedAnswer: { '@type': 'Answer', text: 'TOPIK (Test of Proficiency in Korean) es la certificación oficial coreana. Es requerida para trabajar, estudiar o migrar a Corea. Preparamos desde nivel 1 hasta 6.' },
    },
    {
      '@type': 'Question',
      name: '¿Las clases son en vivo o grabadas?',
      acceptedAnswer: { '@type': 'Answer', text: 'Las clases 1:1 son en vivo por videollamada. También tienes acceso al método de 17 pasos con videos, ejercicios y podcasts para practicar entre sesiones.' },
    },
  ],
};

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
        url: 'https://idiomaswl.com',
      },
      hasCourseInstance: [
        {
          '@type': 'CourseInstance',
          courseMode: 'online',
          inLanguage: 'ko',
          courseWorkload: 'PT1H',
          instructor: { '@type': 'Person', name: 'José David Duarte Silva' },
        },
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'COP',
        description: 'Clase de diagnóstico gratis',
        availability: 'https://schema.org/LimitedAvailability',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://idiomaswl.com/#localbusiness',
      name: 'Idiomas WeLearn',
      description: 'Academia de idiomas online. Clases de coreano, inglés, francés, alemán, italiano y portugués.',
      url: 'https://idiomaswl.com',
      telephone: '+573005004253',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bucaramanga',
        addressRegion: 'Santander',
        addressCountry: 'CO',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de Coreano', item: 'https://idiomaswl.com/clases-de-coreano' },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className={s.page}>

        {/* ══════════════ HERO ══════════════ */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <div className={s.heroKorean}>안녕하세요</div>
              <p className={s.eyebrow}>Coreano online · WeLearn</p>
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
        <section className={s.sectionDark} id="practica">
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Práctica gratuita</p>
            <h2 className={s.h2}>Ejercítate con material real</h2>
            <p className={s.sectionSub}>
              Las primeras secciones son completamente gratis. Practica vocabulario y lectura
              antes de comprometerte con un plan.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', marginTop: '1.75rem' }}>
              {/* Vocabulario 1 — FREE */}
              <Link
                href="/practica/vocabulario-coreano"
                style={{
                  display: 'flex', flexDirection: 'column', gap: '0.6rem',
                  padding: '1.25rem', borderRadius: 14,
                  border: '1.5px solid rgba(200,32,46,0.4)',
                  background: 'rgba(200,32,46,0.07)',
                  textDecoration: 'none', transition: 'border-color .2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '1.5rem' }}>🖼️</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#c8202e', background: 'rgba(200,32,46,0.12)', padding: '2px 8px', borderRadius: 100 }}>Gratis</span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)' }}>Vocabulario 1 — Imágenes</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.4 }}>12 palabras clave del día 1 y 2. Ve la imagen, escucha el audio, elige la palabra. Descubre tu nivel A1.</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>🎯 12 preguntas · Sin registro</div>
              </Link>

              {/* Lectura TOPIK — FREE */}
              <Link
                href="/examenes/topik/practica/set-1"
                style={{
                  display: 'flex', flexDirection: 'column', gap: '0.6rem',
                  padding: '1.25rem', borderRadius: 14,
                  border: '1.5px solid rgba(0,52,120,0.4)',
                  background: 'rgba(0,52,120,0.07)',
                  textDecoration: 'none', transition: 'border-color .2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '1.5rem' }}>📖</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#003478', background: 'rgba(0,52,120,0.12)', padding: '2px 8px', borderRadius: 100 }}>Gratis</span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)' }}>Lectura TOPIK I — Diagnóstico</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.4 }}>30 preguntas de lectura al estilo TOPIK I. Descubre si estás en Nivel 1, Nivel 2 o eres principiante.</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>📝 30 preguntas · Sin tiempo límite</div>
              </Link>

              {/* Vocabulario 2 — LOCKED */}
              <div style={{
                display: 'flex', flexDirection: 'column', gap: '0.6rem',
                padding: '1.25rem', borderRadius: 14,
                border: '1px solid var(--line-soft)',
                background: 'var(--bg-2)',
                opacity: 0.6,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '1.5rem' }}>🔒</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', background: 'rgba(255,255,255,0.07)', padding: '2px 8px', borderRadius: 100 }}>Suscripción</span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--muted)' }}>Vocabulario 2 — Frases</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.4 }}>Frases completas con vocabulario de los días 3–5. Construye oraciones básicas en coreano.</div>
              </div>

              {/* Pronunciación — LOCKED */}
              <div style={{
                display: 'flex', flexDirection: 'column', gap: '0.6rem',
                padding: '1.25rem', borderRadius: 14,
                border: '1px solid var(--line-soft)',
                background: 'var(--bg-2)',
                opacity: 0.6,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '1.5rem' }}>🔒</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', background: 'rgba(255,255,255,0.07)', padding: '2px 8px', borderRadius: 100 }}>Suscripción</span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--muted)' }}>Pronunciación — Audio</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.4 }}>Escucha y repite. Ejercicios de pronunciación con audio nativo para entrenar el oído.</div>
              </div>
            </div>
          </div>
        </section>

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
                { cat: 'Coreano', title: 'Aprender coreano desde cero en Colombia: la guía completa', slug: 'aprender-coreano-desde-cero-guia-colombia' },
                { cat: 'Coreano', title: 'TOPIK I: cómo prepararlo desde cero y pasar al primer intento', slug: 'topik-1-preparacion-guia-para-principiantes' },
                { cat: 'Coreano', title: 'Beca GKS de Corea del Sur para colombianos: requisitos y TOPIK', slug: 'beca-gks-corea-del-sur-para-colombianos' },
                { cat: 'Coreano', title: 'Aprender idiomas con series y películas: lo que funciona', slug: 'aprender-idiomas-con-series-y-peliculas' },
                { cat: 'Coreano', title: 'Ventajas (y retos) de aprender coreano siendo hispanohablante', slug: 'aprender-coreano-siendo-hispanohablante' },
                { cat: 'Coreano', title: 'TOPIK I vs TOPIK II: diferencia y cuál debes tomar', slug: 'topik-i-vs-topik-ii-diferencias' },
                { cat: 'Coreano', title: 'TOPIK II: cómo pasar del nivel 2 al nivel 4 en coreano', slug: 'topik-ii-como-subir-de-nivel' },
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
                Primera clase de diagnóstico gratis. Sin compromisos.
                En 50 minutos sabes exactamente en qué nivel estás y qué necesitas para llegar a donde quieres.
              </p>
              <div className={s.ctaBtns}>
                <a
                  href={`https://wa.me/${WA}?text=${WA_GENERAL}`}
                  target="_blank" rel="noopener noreferrer"
                  className={s.waBtn}
                >
                  Agendar clase gratis por WhatsApp
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
