import type { Metadata } from 'next';
import Link from 'next/link';
import s from './page.module.css';

const WA = '573005004253';
const WA_GENERAL = encodeURIComponent('Hola, vi la página de clases de portugués en WeLearn y quiero agendar mi clase de diagnóstico gratis.');
const WA_CELPE   = encodeURIComponent('Hola, quiero prepararme para el examen Celpe-Bras con WeLearn. ¿Cuándo puedo empezar?');

export const metadata: Metadata = {
  title: 'Clases de Portugués Online en Colombia — Preparación Celpe-Bras | WeLearn',
  description:
    'Aprende portugués online con tutor especializado. Preparación Celpe-Bras para estudiar en Brasil, trabajo internacional o fluidez real. Clase diagnóstico gratis. Portugués brasileño con método WeLearn.',
  keywords: [
    'clases de portugués online Colombia',
    'aprender portugués Bucaramanga',
    'preparación Celpe-Bras Colombia',
    'curso de portugués para adultos',
    'Celpe-Bras Colombia',
    'portugués brasileño online',
    'aprender portugués desde cero',
    'WeLearn portugués',
    'portugués para estudiar en Brasil',
  ],
  openGraph: {
    title: 'Clases de Portugués Online — Preparación Celpe-Bras | WeLearn',
    description: 'Tutor especializado, preparación Celpe-Bras, portugués brasileño real. Clase diagnóstico gratis para colombianos.',
    url: 'https://idiomaswl.com/clases-de-portugues',
  },
  alternates: { canonical: 'https://idiomaswl.com/clases-de-portugues' },
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
      acceptedAnswer: { '@type': 'Answer', text: '100% virtuales, por videollamada. Puedes estar en cualquier ciudad de Colombia o del mundo.' },
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
      provider: { '@type': 'Organization', name: 'Idiomas WeLearn', url: 'https://idiomaswl.com' },
      hasCourseInstance: [{
        '@type': 'CourseInstance',
        courseMode: 'online',
        inLanguage: 'pt-BR',
        courseWorkload: 'PT1H',
        instructor: { '@type': 'Person', name: 'José David Duarte Silva' },
      }],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'COP', description: 'Clase de diagnóstico gratis', availability: 'https://schema.org/InStock' },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://idiomaswl.com/#localbusiness',
      name: 'Idiomas WeLearn',
      url: 'https://idiomaswl.com',
      telephone: '+573005004253',
      address: { '@type': 'PostalAddress', addressLocality: 'Bucaramanga', addressRegion: 'Santander', addressCountry: 'CO' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Clases de Portugués', item: 'https://idiomaswl.com/clases-de-portugues' },
      ],
    },
  ],
};

const WHY_CARDS = [
  { icon: '🎯', title: 'Clase diagnóstico gratis', desc: 'Evaluamos tu nivel real, entendemos tu objetivo (Celpe-Bras, estudios en Brasil, fluidez) y diseñamos tu plan personalizado.' },
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
  { q: '¿Las clases son presenciales o virtuales?', a: '100% virtuales, por videollamada. Puedes estar en cualquier ciudad de Colombia o del mundo.' },
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
              <p className={s.eyebrow}>Portugués online · WeLearn</p>
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
          <span className={s.proofItem}><strong>Clase diagnóstico</strong> gratis</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Celpe-Bras Intermediário a Superior</strong></span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>100% online</strong> · Colombia y mundo</span>
        </div>

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
            <h2 className={s.ctaTitle}>Tu primera clase de portugués<br /><span className={s.accent}>es gratis.</span></h2>
            <p className={s.ctaSub}>Diagnosticamos tu nivel, definimos tu objetivo y te mostramos exactamente cómo llegar al Celpe-Bras que necesitas.</p>
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
