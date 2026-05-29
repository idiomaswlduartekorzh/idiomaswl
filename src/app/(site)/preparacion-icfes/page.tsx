import type { Metadata } from 'next';
import Link from 'next/link';
import s from './page.module.css';

const WA = '573005004253';
const WA_ICFES      = encodeURIComponent('Hola, quiero prepararme para el inglés del ICFES con WeLearn. ¿Cómo funciona?');
const WA_SIMULACRO  = encodeURIComponent('Hola, acabo de hacer el simulacro de inglés ICFES en WeLearn y quiero saber cómo mejorar mi puntaje.');
const WA_GENERAL    = encodeURIComponent('Hola, vi la página de preparación ICFES inglés en WeLearn y tengo algunas preguntas.');

export const metadata: Metadata = {
  title: 'Preparación Inglés ICFES Saber 11 — Simulacros y Clases | WeLearn',
  description:
    'Prepárate para el inglés del ICFES Saber 11 con simulacros completos, clases 1:1 y el método WeLearn. Mejora tu puntaje de inglés y sube tu puntaje global. Para estudiantes de todo Colombia.',
  keywords: [
    'preparación inglés ICFES',
    'simulacro ICFES inglés',
    'Saber 11 inglés',
    'mejorar puntaje ICFES inglés',
    'clases inglés ICFES Colombia',
    'ICFES inglés nivel B2',
    'preparación Saber 11 inglés',
    'WeLearn ICFES',
    'inglés ICFES Bucaramanga',
    'simulacro ingles saber 11 gratis',
  ],
  openGraph: {
    title: 'Preparación Inglés ICFES Saber 11 — WeLearn',
    description:
      'Simulacros completos, análisis por sección y clases 1:1. Sube tu puntaje de inglés en el ICFES. Para estudiantes de todo Colombia.',
    url: 'https://idiomaswl.com/preparacion-icfes',
    images: [{ url: '/images/welearn-logo.png', width: 1200, height: 630, alt: 'WeLearn ICFES Inglés' }],
  },
  alternates: { canonical: 'https://idiomaswl.com/preparacion-icfes' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Preparación Inglés ICFES Saber 11',
      description: 'Preparación intensiva para la sección de inglés del ICFES Saber 11. Simulacros, análisis de errores y clases 1:1 con tutor.',
      provider: {
        '@type': 'Organization',
        name: 'Idiomas WeLearn',
        url: 'https://idiomaswl.com',
      },
      hasCourseInstance: [
        {
          '@type': 'CourseInstance',
          courseMode: 'online',
          inLanguage: 'es',
          instructor: { '@type': 'Person', name: 'José David Duarte Silva' },
        },
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'COP',
        description: 'Simulacro de prueba gratis',
        availability: 'https://schema.org/InStock',
      },
    },
  ],
};

const TIPS = [
  {
    icon: '📖',
    title: 'Comprensión de lectura',
    pct: '60%',
    desc: 'La mayoría del examen. Textos de 200–400 palabras con preguntas de inferencia, vocabulario en contexto y estructura narrativa.',
    tactics: ['Lee el enunciado antes del texto', 'Identifica la idea principal de cada párrafo', 'El vocabulario se deduce del contexto — no adivines'],
  },
  {
    icon: '💬',
    title: 'Conversacional y uso del idioma',
    pct: '40%',
    desc: 'Diálogos cortos, completar oraciones, preguntas sobre uso correcto de gramática y expresiones cotidianas.',
    tactics: ['Domina los tiempos verbales básicos', 'Conectores (however, although, therefore)', 'Vocabulario temático: trabajo, familia, viajes'],
  },
];

const SCORES = [
  { level: 'A-', label: 'Nivel A−', pts: '0–37',  color: '#dc2626', desc: 'No alcanza nivel A. Necesita preparación intensiva.' },
  { level: 'A1', label: 'Nivel A1',  pts: '38–49', color: '#ea580c', desc: 'Básico. Comprende frases muy simples.' },
  { level: 'A2', label: 'Nivel A2',  pts: '50–65', color: '#d97706', desc: 'Pre-intermedio. La mayoría de los estudiantes.' },
  { level: 'B1', label: 'Nivel B1',  pts: '66–80', color: '#2563eb', desc: 'Intermedio. Por encima del promedio nacional.' },
  { level: 'B2', label: 'Nivel B2',  pts: '81–100', color: '#16a34a', desc: 'Intermedio-alto. Puntaje excelente. Top 10%.' },
];

const FAQS = [
  {
    q: '¿Cuántas preguntas tiene la sección de inglés del ICFES?',
    a: '45 preguntas distribuidas en comprensión lectora y uso del idioma. El puntaje va de 0 a 100 y representa alrededor del 10% del puntaje global.',
  },
  {
    q: '¿En cuánto tiempo puedo mejorar mi puntaje de inglés?',
    a: 'Depende tu nivel de base. Con 2–3 meses de preparación constante (simulacros + análisis de errores), la mayoría de estudiantes sube 10–20 puntos. Con clases 1:1, el avance es más rápido.',
  },
  {
    q: '¿Los simulacros de WeLearn son como el ICFES real?',
    a: 'Sí. Tienen el mismo formato, nivel de dificultad y distribución de preguntas que el ICFES oficial. Después de cada simulacro recibes análisis por sección y retroalimentación.',
  },
  {
    q: '¿Necesito saber inglés para empezar la preparación?',
    a: 'No. Empezamos desde tu nivel actual, sea A1 o B1. Primero hacemos un simulacro de diagnóstico y diseñamos un plan según tus puntos débiles específicos.',
  },
  {
    q: '¿Puedo prepararme para el ICFES si vivo fuera de Bucaramanga?',
    a: 'Sí. Las clases son 100% online por videollamada. Tenemos estudiantes de Bogotá, Medellín, Cali, Barranquilla y otras ciudades.',
  },
];

export default function PreparacionICFESPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={s.page}>

        {/* ══════════════ HERO ══════════════ */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <p className={s.eyebrow}>ICFES Saber 11 · Inglés</p>
              <h1 className={s.h1}>
                Sube tu puntaje<br />
                de inglés en el <span className={s.accent}>ICFES.</span>
              </h1>
              <p className={s.heroSub}>
                El inglés del Saber 11 tiene un formato predecible. Con simulacros
                que replican el examen real y análisis de errores preciso, subir
                10–20 puntos en 2–3 meses es completamente posible.
              </p>
              <div className={s.heroCtas}>
                <Link href="/examenes/icfes" className={s.primaryBtn}>
                  Hacer simulacro gratis →
                </Link>
                <a
                  href={`https://wa.me/${WA}?text=${WA_ICFES}`}
                  target="_blank" rel="noopener noreferrer"
                  className={s.waBtn}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Clases con tutor
                </a>
              </div>
            </div>
            <div className={s.heroStats}>
              <div className={s.statCard}>
                <div className={s.statNum}>45</div>
                <div className={s.statLabel}>preguntas en el examen</div>
              </div>
              <div className={s.statCard}>
                <div className={s.statNum}>B2</div>
                <div className={s.statLabel}>nivel objetivo (top 10%)</div>
              </div>
              <div className={s.statCard}>
                <div className={s.statNum}>10%</div>
                <div className={s.statLabel}>del puntaje global</div>
              </div>
              <div className={s.statCard}>
                <div className={s.statNum}>3</div>
                <div className={s.statLabel}>meses de preparación</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ PROOF STRIP ══════════════ */}
        <div className={s.proofStrip}>
          <div className={s.proofItem}><strong>Simulacros</strong> en formato ICFES real</div>
          <div className={s.proofDivider} />
          <div className={s.proofItem}><strong>Análisis</strong> por sección</div>
          <div className={s.proofDivider} />
          <div className={s.proofItem}><strong>Clases 1:1</strong> con tutor asignado</div>
          <div className={s.proofDivider} />
          <div className={s.proofItem}><strong>100% online</strong> desde cualquier ciudad</div>
        </div>

        {/* ══════════════ PUNTAJES ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Escala de puntajes</p>
            <h2 className={s.h2}>¿En qué nivel estás?</h2>
            <p className={s.sectionSub}>
              El ICFES mide el inglés en una escala de 0 a 100 equivalente al Marco Común Europeo.
              El promedio nacional es A2. La meta es llegar a B1 o B2.
            </p>
            <div className={s.scoresGrid}>
              {SCORES.map(sc => (
                <div key={sc.level} className={s.scoreCard}>
                  <div className={s.scoreLevelBadge} style={{ color: sc.color, borderColor: sc.color + '40', background: sc.color + '15' }}>
                    {sc.label}
                  </div>
                  <div className={s.scorePts} style={{ color: sc.color }}>{sc.pts} pts</div>
                  <p className={s.scoreDesc}>{sc.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/examenes/icfes" className={s.primaryBtn}>
                Hacer simulacro y conocer mi nivel →
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════ QUÉ EVALÚA ══════════════ */}
        <section className={s.sectionAlt}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>¿Qué evalúa el examen?</p>
            <h2 className={s.h2}>Estructura del inglés en el ICFES</h2>
            <div className={s.tipsGrid}>
              {TIPS.map(tip => (
                <div key={tip.title} className={s.tipCard}>
                  <div className={s.tipHeader}>
                    <span className={s.tipIcon}>{tip.icon}</span>
                    <div>
                      <h3 className={s.tipTitle}>{tip.title}</h3>
                      <span className={s.tipPct}>{tip.pct} del examen</span>
                    </div>
                  </div>
                  <p className={s.tipDesc}>{tip.desc}</p>
                  <ul className={s.tipTactics}>
                    {tip.tactics.map((t, i) => (
                      <li key={i} className={s.tipTactic}>
                        <span className={s.tipCheck}>✓</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ MÉTODO ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Cómo preparamos</p>
            <h2 className={s.h2}>Plan de preparación WeLearn para ICFES</h2>
            <div className={s.planGrid}>
              <div className={s.planStep}>
                <div className={s.planN}>01</div>
                <h3 className={s.planTitle}>Simulacro de diagnóstico</h3>
                <p className={s.planDesc}>Hacemos un simulacro completo para identificar exactamente dónde pierdes puntos: vocabulario, inferencia, gramática o velocidad de lectura.</p>
              </div>
              <div className={s.planStep}>
                <div className={s.planN}>02</div>
                <h3 className={s.planTitle}>Plan personalizado</h3>
                <p className={s.planDesc}>Con los resultados del diagnóstico, diseñamos un plan de 8–12 semanas enfocado en tus puntos débiles específicos.</p>
              </div>
              <div className={s.planStep}>
                <div className={s.planN}>03</div>
                <h3 className={s.planTitle}>Clases 1:1 + simulacros semanales</h3>
                <p className={s.planDesc}>Clases en vivo por videollamada más un simulacro por semana. Cada simulacro es revisado en detalle con el tutor.</p>
              </div>
              <div className={s.planStep}>
                <div className={s.planN}>04</div>
                <h3 className={s.planTitle}>Simulacro de cierre</h3>
                <p className={s.planDesc}>2 semanas antes del ICFES, simulacro en condiciones de examen real. Comparamos con el diagnóstico para medir el avance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ CTA MITAD ══════════════ */}
        <div className={s.midCta}>
          <div className={s.wrap}>
            <p className={s.midCtaText}>
              ¿Cuándo es tu ICFES? Mientras más pronto empieces, más sube el puntaje.
            </p>
            <div className={s.midCtaBtns}>
              <a
                href={`https://wa.me/${WA}?text=${WA_ICFES}`}
                target="_blank" rel="noopener noreferrer"
                className={s.waBtn}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Empezar preparación por WhatsApp
              </a>
              <Link href="/examenes/icfes" className={s.ghostBtn}>
                Hacer simulacro gratis primero
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════ FAQ ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Preguntas frecuentes</p>
            <h2 className={s.h2}>Dudas sobre el inglés del ICFES</h2>
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

        {/* ══════════════ FINAL CTA ══════════════ */}
        <section className={s.ctaSection}>
          <div className={s.wrap}>
            <div className={s.ctaBox}>
              <h2 className={s.ctaTitle}>Empieza con un simulacro gratis</h2>
              <p className={s.ctaSub}>
                Haz el simulacro de inglés ICFES ahora. Recibes tu resultado por sección
                al instante. Si quieres mejorar tu puntaje, te conectamos con un tutor.
              </p>
              <div className={s.ctaBtns}>
                <Link href="/examenes/icfes" className={s.primaryBtn}>
                  Hacer simulacro gratis →
                </Link>
                <a
                  href={`https://wa.me/${WA}?text=${WA_ICFES}`}
                  target="_blank" rel="noopener noreferrer"
                  className={s.waBtn}
                >
                  Hablar con un tutor
                </a>
              </div>
              <p className={s.ctaNote}>Sin registro ni tarjeta de crédito para el simulacro gratis.</p>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
