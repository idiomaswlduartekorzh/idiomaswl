import type { Metadata } from 'next';
import Link from 'next/link';
import LessonTabs from './LessonTabs';
import FAQ from './FAQ';
import HeroLangSelector from './HeroLangSelector';
import {
  FadeUp, StaggerGrid, StaggerItem,
  HeroLeft, HeroItem, HeroCard,
  StatsRow, StatItem, StepRow,
  CountUp, TiltCard, TeamCard, TestimonialCard,
} from './HomeAnimations';

export const metadata: Metadata = {
  title: 'Aprende un idioma, en serio',
  description:
    'Once pasos diarios diseñados para que el cerebro interiorice un idioma de verdad. Vocabulario, gramática, escucha y producción. Coreano, inglés, francés, alemán, italiano, portugués y ruso.',
  keywords: [
    'aprender coreano', 'aprender inglés gratis', 'método WeLearn', 'TOEFL iBT',
    'IELTS simulacro', 'ICFES saber 11 inglés', 'once pasos idioma',
  ],
  openGraph: {
    title: 'Idiomas WeLearn — Aprende un idioma, en serio',
    description: 'Once pasos diarios que imitan cómo el cerebro interioriza un idioma. Gratis para empezar.',
    url: 'https://idiomaswl.com/home',
  },
  alternates: {
    canonical: 'https://idiomaswl.com/home',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://idiomaswl.com/#organization',
      name: 'Idiomas WeLearn',
      url: 'https://idiomaswl.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://idiomaswl.com/images/welearn-logo.png',
      },
      description:
        'Plataforma de aprendizaje de idiomas con el método WeLearn: once etapas diarias para interiorizar vocabulario, gramática y pronunciación.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://idiomaswl.com/#website',
      url: 'https://idiomaswl.com',
      name: 'Idiomas WeLearn',
      description: 'Aprende coreano, inglés, francés y más con once pasos diarios.',
      publisher: { '@id': 'https://idiomaswl.com/#organization' },
    },
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://idiomaswl.com/#edu',
      name: 'Idiomas WeLearn',
      url: 'https://idiomaswl.com',
      description: 'Plataforma educativa para aprender idiomas y prepararse para certificaciones internacionales como TOEFL, IELTS e ICFES.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Idiomas disponibles',
        itemListElement: [
          { '@type': 'Course', name: 'Coreano', description: 'Aprende coreano desde cero con el método WeLearn.', provider: { '@id': 'https://idiomaswl.com/#organization' } },
          { '@type': 'Course', name: 'Inglés — TOEFL / IELTS / ICFES', description: 'Prepárate para certificaciones de inglés con simulacros completos.', provider: { '@id': 'https://idiomaswl.com/#organization' } },
          { '@type': 'Course', name: 'Francés — DELF/DALF', description: 'Aprende francés y practica para el DELF.', provider: { '@id': 'https://idiomaswl.com/#organization' } },
        ],
      },
    },
  ],
};

const IDIOMAS = [
  { code: 'En', name: 'Inglés',    native: 'English',   desc: 'IELTS · TOEFL · ICFES',   active: true  },
  { code: '한', name: 'Coreano',   native: '한국어',    desc: 'Método visual WeLearn',    active: true  },
  { code: 'Fr', name: 'Francés',   native: 'Français',  desc: 'DELF · DALF',              active: true  },
  { code: 'De', name: 'Alemán',    native: 'Deutsch',   desc: 'Goethe-Zertifikat',        active: true  },
  { code: 'It', name: 'Italiano',  native: 'Italiano',  desc: 'CILS · CELI',              active: true  },
  { code: 'Pt', name: 'Portugués', native: 'Português', desc: 'CELPE-Bras',               active: true  },
  { code: '日', name: 'Japonés',   native: '日本語',    desc: 'JLPT · Próximamente',      active: false },
  { code: 'Py', name: 'Ruso',      native: 'Русский',   desc: 'TORFL · Próximamente',     active: false },
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
  { badge: 'ACADEMIC',        name: 'TOEFL',     lang: 'Inglés · iBT',               weeks: '8 semanas',  mocks: '12 simulacros', slug: 'toefl'     },
  { badge: 'BAND 7+',        name: 'IELTS',     lang: 'Inglés · Academic & General', weeks: '8 semanas',  mocks: '10 simulacros', slug: 'ielts'     },
  { badge: 'COLOMBIA',       name: 'ICFES',     lang: 'Inglés · Saber 11',           weeks: '12 semanas', mocks: '20 simulacros', slug: 'icfes'     },
  { badge: 'ZERTIFIKAT',     name: 'Goethe',    lang: 'Alemán · A1 – C2',            weeks: '10 semanas', mocks: '8 simulacros',  slug: 'goethe'    },
  { badge: 'OFFICIEL',       name: 'DELF/DALF', lang: 'Francés · A1 – C2',           weeks: '10 semanas', mocks: '8 simulacros',  slug: 'delf-dalf' },
  { badge: 'CERTIFICAZIONE', name: 'CILS',      lang: 'Italiano · A1 – C2',          weeks: '10 semanas', mocks: '6 simulacros',  slug: 'cils-celi' },
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
    name: 'Camila R.',
    city: 'Bogotá',
    exam: 'IELTS Academic · Band 7.0',
    quote: 'Preparé el IELTS en 8 semanas usando los simulacros de WeLearn. El nivel de detalle en cada sección me permitió identificar exactamente dónde mejorar.',
  },
  {
    name: 'Sebastián M.',
    city: 'Medellín',
    exam: 'Goethe B1 · Aprobado',
    quote: 'Los simulacros del Goethe son los más completos que encontré en español. Pasé el examen en el primer intento con una preparación de 10 semanas.',
  },
  {
    name: 'Laura P.',
    city: 'Cali',
    exam: 'DELF B2 · Mention Bien',
    quote: 'La estructura de los audios y las tareas de producción escrita del DELF es idéntica al examen real. WeLearn me ahorró meses de búsqueda de material.',
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* HERO */}
      <section className="wlh-hero">
        <HeroLeft>
          <HeroItem><p className="wlh-eyebrow">Plataforma · 8 idiomas · 6 exámenes internacionales</p></HeroItem>
          <HeroItem>
            <h1 className="wlh-hero__h1">
              Aprender un<br />idioma, <em>en serio.</em>
            </h1>
          </HeroItem>
          <HeroItem>
            <p className="wlh-hero__desc">
              Preparación real para exámenes internacionales y aprendizaje estructurado en once pasos diarios.
            </p>
          </HeroItem>
          <HeroItem>
            <div className="wlh-hero__ctas">
              <Link href="/clases-de-ingles" className="btn wlh-hero__btn-primary">Empezar gratis</Link>
              <Link href="#coreano-preview" className="btn btn-ghost wlh-hero__btn-ghost">Ver una lección</Link>
            </div>
          </HeroItem>
        </HeroLeft>

        <HeroCard>
          <HeroLangSelector />
        </HeroCard>
      </section>

      {/* STATS ROW — gradient */}
      <StatsRow className="wlh-stats">
        <StatItem className="wlh-stat">
          <span className="wlh-stat__num"><CountUp to={8} /></span>
          <span className="wlh-stat__lbl">idiomas disponibles</span>
        </StatItem>
        <StatItem className="wlh-stat">
          <span className="wlh-stat__num"><CountUp to={6} /></span>
          <span className="wlh-stat__lbl">exámenes internacionales</span>
        </StatItem>
        <StatItem className="wlh-stat">
          <span className="wlh-stat__num"><CountUp to={11} /></span>
          <span className="wlh-stat__lbl">pasos del método diario</span>
        </StatItem>
        <StatItem className="wlh-stat">
          <span className="wlh-stat__num"><CountUp to={500} suffix="+" /></span>
          <span className="wlh-stat__lbl">estudiantes preparados</span>
        </StatItem>
      </StatsRow>

      {/* CERTIFICACIONES — moved up */}
      <section id="examenes" className="wlh-section wlh-section--dark">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow wlh-section-eyebrow--light">01 — Certificaciones</p>
            <h2 className="wlh-section-h2 wlh-section-h2--light">Preparación específica para exámenes.</h2>
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

      {/* IDIOMAS */}
      <section id="idiomas" className="wlh-section">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">02 — Catálogo</p>
            <h2 className="wlh-section-h2">Ocho idiomas. Un mismo método.</h2>
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
                      {lang.active && <button className="wlh-lang-card__cta">Ver ruta →</button>}
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* METODO — moved down */}
      <section id="metodo" className="wlh-section wlh-section--alt">
        <div className="wrap wlh-metodo-wrap">
          <FadeUp className="wlh-metodo-left">
            <p className="wlh-section-eyebrow">03 — Método</p>
            <h2 className="wlh-section-h2">El día tiene once pasos.</h2>
            <p className="wlh-section-desc">Exposición, integración, práctica y revisión acumulativa. Cada bloque cumple una función concreta en el ciclo de aprendizaje.</p>
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

      {/* EQUIPO */}
      <section id="equipo" className="wlh-section">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">04 — Equipo</p>
            <h2 className="wlh-section-h2">Quiénes están detrás de WeLearn.</h2>
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

      {/* TESTIMONIOS */}
      <section className="wlh-section wlh-section--alt">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">05 — Resultados</p>
            <h2 className="wlh-section-h2">Estudiantes que alcanzaron su objetivo.</h2>
            <p className="wlh-section-desc">
              Más de 500 estudiantes han usado WeLearn para preparar sus exámenes internacionales.
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

      {/* LECCION PREVIEW */}
      <section id="coreano-preview" className="wlh-section">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">06 — Vista previa</p>
            <h2 className="wlh-section-h2">Mira cómo se ve un día completo.</h2>
            <p className="wlh-section-desc">Preview modular de lección.</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <LessonTabs />
          </FadeUp>
        </div>
      </section>

      {/* PRECIOS — teaser, sin duplicar la página /precios */}
      <section id="precios" className="wlh-section wlh-section--alt">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <FadeUp>
            <p className="wlh-section-eyebrow">07 — Precios</p>
            <h2 className="wlh-section-h2">Desde $50.000 / mes.</h2>
            <p className="wlh-section-desc" style={{ maxWidth: 520, margin: '0 auto 2rem' }}>
              Simulacros, retroalimentación y tutorías en vivo. Un precio único para todos los idiomas y exámenes. Sin letra pequeña.
            </p>
            <Link href="/precios" className="btn">Ver planes y precios →</Link>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="wlh-section">
        <div className="wrap wlh-faq-wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">08 — Preguntas</p>
            <h2 className="wlh-section-h2">Lo que casi siempre nos preguntan.</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <FAQ />
          </FadeUp>
        </div>
      </section>

      {/* CTA FINAL */}
      <FadeUp>
        <section className="wlh-cta">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <p className="wlh-cta__eyebrow">Empieza hoy</p>
            <h2 className="wlh-cta__h2">Tu primer día es gratis.</h2>
            <div className="wlh-cta__btns">
              <Link href="/clases-de-ingles" className="btn wlh-cta__btn-primary">Clases de inglés →</Link>
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
            <p className="wlh-footer__tagline">Once pasos al día. Seis exámenes internacionales. Un método que funciona.</p>
          </div>
          <div className="wlh-footer__col">
            <p className="wlh-footer__col-title">Clases</p>
            <Link href="/clases-de-ingles">Inglés</Link>
            <Link href="/clases-de-coreano">Coreano</Link>
            <Link href="/preparacion-icfes">ICFES Inglés</Link>
            <Link href="/miembro-fundador">Miembro Fundador</Link>
          </div>
          <div className="wlh-footer__col">
            <p className="wlh-footer__col-title">Exámenes</p>
            <Link href="/examenes/toefl">TOEFL</Link>
            <Link href="/examenes/ielts">IELTS</Link>
            <Link href="/examenes/icfes">ICFES</Link>
            <Link href="/examenes/goethe">Goethe</Link>
          </div>
          <div className="wlh-footer__col">
            <p className="wlh-footer__col-title">Compañía</p>
            <Link href="/metodo">Método</Link>
            <Link href="/precios">Precios</Link>
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
