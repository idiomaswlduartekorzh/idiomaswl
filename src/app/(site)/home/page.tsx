import Link from 'next/link';
import LessonTabs from './LessonTabs';
import FAQ from './FAQ';
import {
  FadeUp, StaggerGrid, StaggerItem,
  HeroLeft, HeroItem, HeroCard,
  StatsRow, StatItem, StepRow,
} from './HomeAnimations';

export const metadata = { title: 'Idiomas WeLearn · Aprende un idioma, en serio.' };

const IDIOMAS = [
  { code: 'En', name: 'Inglés',    native: 'English',   days: '180 días · A1 – C2' },
  { code: '한', name: 'Coreano',   native: '한국어',    days: '120 días · A1 – B2' },
  { code: '日', name: 'Japonés',   native: '日本語',    days: '140 días · A1 – B2' },
  { code: 'It', name: 'Italiano',  native: 'Italiano',  days: '96 días · A1 – C1' },
  { code: 'Fr', name: 'Francés',   native: 'Français',  days: '108 días · A1 – C1' },
  { code: 'De', name: 'Alemán',    native: 'Deutsch',   days: '110 días · A1 – C1' },
  { code: 'Pt', name: 'Portugués', native: 'Português', days: '92 días · A1 – C1' },
  { code: 'Py', name: 'Ruso',      native: 'Русский',   days: '88 días · A1 – B2' },
];

const METODO = [
  { n: '01', name: 'Activación',          desc: 'Imagen, audio y forma escrita para abrir contexto.',   min: '6 min' },
  { n: '02', name: 'Adquisición guiada',  desc: 'Quiz inicial con palabras nuevas y recicladas.',        min: '8 min' },
  { n: '03', name: 'Reconocimiento',      desc: 'Repaso espaciado de alta retención.',                   min: '10 min' },
  { n: '04', name: 'Escucha sobrevivible',desc: 'Audio corto adaptado al nivel.',                        min: '7 min' },
  { n: '05', name: 'Contexto',            desc: 'Notas de gramática, estilo y cultura.',                 min: '9 min' },
  { n: '06', name: 'Descubrir el patrón', desc: 'Detección guiada de estructuras.',                      min: '8 min' },
  { n: '07', name: 'Microexplicaciones',  desc: 'Cápsulas breves para dudas frecuentes.',                min: '5 min' },
  { n: '08', name: 'Producción guiada',   desc: 'Construcción de frases con apoyo.',                     min: '10 min' },
  { n: '09', name: 'Interacción reactiva',desc: 'Respuestas rápidas en contexto.',                       min: '8 min' },
  { n: '10', name: 'Examen del día',      desc: 'Comprobación de interiorización inmediata.',            min: '6 min' },
  { n: '11', name: 'Examen acumulativo',  desc: 'Retención de largo plazo.',                             min: '10 min' },
];

const EXAMENES = [
  { badge: 'ACADEMIC',       name: 'TOEFL',    lang: 'Inglés · iBT',               weeks: '8 semanas',  mocks: '12 simulacros', slug: 'toefl' },
  { badge: 'BAND 7+',       name: 'IELTS',    lang: 'Inglés · Academic & General', weeks: '8 semanas',  mocks: '10 simulacros', slug: 'ielts' },
  { badge: 'COLOMBIA',      name: 'ICFES',    lang: 'Inglés · Saber 11',           weeks: '12 semanas', mocks: '20 simulacros', slug: 'icfes' },
  { badge: 'ZERTIFIKAT',    name: 'Goethe',   lang: 'Alemán · A1 – C2',            weeks: '10 semanas', mocks: '8 simulacros',  slug: 'goethe' },
  { badge: 'OFFICIEL',      name: 'DELF/DALF',lang: 'Francés · A1 – C2',           weeks: '10 semanas', mocks: '8 simulacros',  slug: 'delf-dalf' },
  { badge: 'CERTIFICAZIONE',name: 'CILS',     lang: 'Italiano · A1 – C2',          weeks: '10 semanas', mocks: '6 simulacros',  slug: 'cils-celi' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="wlh-hero">
        <HeroLeft>
          <HeroItem><p className="wlh-eyebrow">Plataforma · 8 idiomas · 6 exámenes</p></HeroItem>
          <HeroItem>
            <h1 className="wlh-hero__h1">
              Aprender un<br />idioma, <em>en serio.</em>
            </h1>
          </HeroItem>
          <HeroItem>
            <p className="wlh-hero__desc">
              Once pasos diarios diseñados para interiorizar contenido en vez de memorizarlo a medias.
            </p>
          </HeroItem>
          <HeroItem>
            <div className="wlh-hero__ctas">
              <button className="btn wlh-hero__btn-primary">Empezar gratis</button>
              <Link href="#coreano-preview" className="btn btn-ghost wlh-hero__btn-ghost">Ver una lección</Link>
            </div>
          </HeroItem>
        </HeroLeft>

        <HeroCard>
          <div className="wlh-lesson-preview">
            <div className="wlh-lesson-preview__header">
              <span>Coreano · Día 1 · Paso 01</span>
              <span>Activación</span>
            </div>
            <div className="wlh-lesson-preview__word">
              <span className="wlh-lesson-preview__native">학교</span>
              <span className="wlh-lesson-preview__rom">hak-kyo · escuela</span>
            </div>
            <div className="wlh-lesson-preview__opts">
              <button className="wlh-lesson-opt wlh-lesson-opt--selected">escuela</button>
              <button className="wlh-lesson-opt">casa</button>
              <button className="wlh-lesson-opt">libro</button>
              <button className="wlh-lesson-opt">tiempo</button>
            </div>
            <div className="wlh-lesson-preview__dots">
              {Array.from({ length: 11 }).map((_, i) => (
                <span key={i} className={`wlh-dot${i < 3 ? ' wlh-dot--done' : ''}`} />
              ))}
            </div>
          </div>
        </HeroCard>
      </section>

      {/* STATS ROW */}
      <StatsRow className="wlh-stats">
        <StatItem className="wlh-stat">
          <span className="wlh-stat__num">8</span>
          <span className="wlh-stat__lbl">idiomas en diseño de shell</span>
        </StatItem>
        <StatItem className="wlh-stat">
          <span className="wlh-stat__num">6</span>
          <span className="wlh-stat__lbl">rutas de examen en preview</span>
        </StatItem>
        <StatItem className="wlh-stat">
          <span className="wlh-stat__num">11</span>
          <span className="wlh-stat__lbl">pasos del método visual</span>
        </StatItem>
        <StatItem className="wlh-stat">
          <span className="wlh-stat__num wlh-stat__num--text">Demo</span>
          <span className="wlh-stat__lbl">métricas no finales en esta fase</span>
        </StatItem>
      </StatsRow>

      {/* IDIOMAS */}
      <section id="idiomas" className="wlh-section">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">01 — Catálogo</p>
            <h2 className="wlh-section-h2">Ocho idiomas. Un mismo método.</h2>
            <p className="wlh-section-desc">Cada idioma conserva la misma estructura de 11 pasos diarios con variaciones de contenido, ritmo y material de práctica.</p>
          </FadeUp>
          <StaggerGrid className="wlh-idiomas-grid">
            {IDIOMAS.map(lang => (
              <StaggerItem key={lang.name}>
                <div className="wlh-lang-card">
                  <div className="wlh-lang-card__top">
                    <span className="wlh-lang-card__code">{lang.code}</span>
                  </div>
                  <h3 className="wlh-lang-card__name">{lang.name}</h3>
                  <p className="wlh-lang-card__native">{lang.native}</p>
                  <div className="wlh-lang-card__footer">
                    <span className="wlh-lang-card__days">{lang.days}</span>
                    <button className="wlh-lang-card__cta">Ver ruta demo →</button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* METODO */}
      <section id="metodo" className="wlh-section wlh-section--alt">
        <div className="wrap wlh-metodo-wrap">
          <FadeUp className="wlh-metodo-left">
            <p className="wlh-section-eyebrow">02 — Método</p>
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
      </section>

      {/* CERTIFICACIONES */}
      <section id="examenes" className="wlh-section wlh-section--dark">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow wlh-section-eyebrow--light">03 — Certificaciones</p>
            <h2 className="wlh-section-h2 wlh-section-h2--light">Preparación específica para exámenes.</h2>
            <p className="wlh-section-desc wlh-section-desc--light">TOEFL, IELTS, ICFES y rutas extendidas con simulacros por objetivo.</p>
          </FadeUp>
          <StaggerGrid className="wlh-exams-grid">
            {EXAMENES.map(ex => (
              <StaggerItem key={ex.name}>
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
              </StaggerItem>
            ))}
          </StaggerGrid>
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

      {/* PRECIOS */}
      <section id="precios" className="wlh-section wlh-section--alt">
        <div className="wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">04 — Precios</p>
            <h2 className="wlh-section-h2">Un plan por idioma. Sin truco.</h2>
          </FadeUp>
          <StaggerGrid className="wlh-pricing-grid">
            <StaggerItem>
              <div className="wlh-price-card">
                <p className="wlh-price-card__tier">Free</p>
                <h3 className="wlh-price-card__name">Prueba</h3>
                <p className="wlh-price-card__price">/ siempre</p>
                <p className="wlh-price-card__desc">Conoce la plataforma antes de comprometerte.</p>
                <ul className="wlh-price-card__features">
                  <li>Paso 1 gratis por idioma</li>
                  <li>Demo de un examen internacional</li>
                  <li>Sin tarjeta</li>
                </ul>
                <button className="btn btn-ghost" style={{ width: '100%' }}>Crear cuenta</button>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="wlh-price-card wlh-price-card--featured">
                <p className="wlh-price-card__tier">Más popular</p>
                <h3 className="wlh-price-card__name">Idioma completo</h3>
                <p className="wlh-price-card__price"><strong>$19</strong> / mes</p>
                <p className="wlh-price-card__desc">Ruta diaria completa con repaso espaciado y práctica guiada.</p>
                <ul className="wlh-price-card__features">
                  <li>11 pasos diarios</li>
                  <li>Repaso automático</li>
                  <li>Examen semanal</li>
                  <li>Progreso detallado</li>
                </ul>
                <button className="btn" style={{ width: '100%' }}>Empezar idioma</button>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="wlh-price-card">
                <p className="wlh-price-card__tier">Plus</p>
                <h3 className="wlh-price-card__name">Todos los idiomas</h3>
                <p className="wlh-price-card__price"><strong>$39</strong> / mes</p>
                <p className="wlh-price-card__desc">Para preparar múltiples idiomas y certificaciones.</p>
                <ul className="wlh-price-card__features">
                  <li>8 idiomas completos</li>
                  <li>6 rutas de examen</li>
                  <li>Simulacros ilimitados</li>
                  <li>Acompañamiento docente</li>
                </ul>
                <button className="btn btn-ghost" style={{ width: '100%' }}>Hablar con ventas</button>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* FAQ */}
      <section className="wlh-section">
        <div className="wrap wlh-faq-wrap">
          <FadeUp>
            <p className="wlh-section-eyebrow">05 — Preguntas</p>
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
              <button className="btn wlh-cta__btn-primary">Crear cuenta</button>
              <Link href="#coreano-preview" className="wlh-cta__link">Ver una lección primero</Link>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* FOOTER */}
      <footer className="wlh-footer">
        <div className="wrap wlh-footer__inner">
          <div className="wlh-footer__brand">
            <span className="wlh-footer__logo"><strong>Idiomas</strong> WeLearn</span>
            <p className="wlh-footer__tagline">Once pasos al día. Ocho idiomas. Seis exámenes internacionales.</p>
          </div>
          <div className="wlh-footer__col">
            <p className="wlh-footer__col-title">Idiomas</p>
            <Link href="#idiomas">Inglés</Link>
            <Link href="#idiomas">Coreano</Link>
            <Link href="#idiomas">Japonés</Link>
          </div>
          <div className="wlh-footer__col">
            <p className="wlh-footer__col-title">Exámenes</p>
            <Link href="/examenes/toefl">TOEFL</Link>
            <Link href="/examenes/ielts">IELTS</Link>
            <Link href="/examenes/icfes">ICFES</Link>
          </div>
          <div className="wlh-footer__col">
            <p className="wlh-footer__col-title">Compañía</p>
            <Link href="#metodo">Método</Link>
            <Link href="#">Contacto</Link>
            <Link href="#">Privacidad</Link>
          </div>
        </div>
        <div className="wlh-footer__bottom">
          <p>© 2026 Idiomas WeLearn S.A.S. · Bogotá · Medellín · Madrid</p>
        </div>
      </footer>
    </>
  );
}
