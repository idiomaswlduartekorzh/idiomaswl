'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/* ─── SVG icons ─────────────────────────────────────────────────────────────── */
const IC_MIC = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="1" width="6" height="12" rx="3" />
    <path d="M19 10v2a7 7 0 01-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const IC_LAYERS = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IC_PALETTE = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.47-1.125-.29-.289-.438-.652-.438-1.036 0-.952.727-1.714 1.625-1.714H16c2.761 0 5-2.239 5-5 0-4.418-4.03-8-9-8z" />
  </svg>
);

const IC_BARCHART = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const TABS = [
  {
    label: 'Coreano',
    flag: '🇰🇷',
    day: 'Día 1 · Coreano',
    title: 'Vocabulario fundamental',
    words: [
      { badge: 'H', native: '학교', rom: 'hak-kyo', es: 'escuela' },
      { badge: 'J', native: '집',   rom: 'jip',     es: 'casa'    },
      { badge: 'C', native: '책',   rom: 'chaek',   es: 'libro'   },
      { badge: 'A', native: '물',   rom: 'mul',     es: 'agua'    },
      { badge: 'F', native: '친구', rom: 'chin-gu', es: 'amigo'   },
      { badge: 'T', native: '시간', rom: 'shi-gan', es: 'tiempo'  },
    ],
    chars: ['한', '국', '어', '안', '녕', '서'],
  },
  {
    label: 'Japonés',
    flag: '🇯🇵',
    day: 'Día 1 · Japonés',
    title: 'Vocabulario esencial',
    words: [
      { badge: 'G', native: '学校', rom: 'gakkou',    es: 'escuela' },
      { badge: 'I', native: 'いえ', rom: 'ie',         es: 'casa'    },
      { badge: 'H', native: '本',   rom: 'hon',        es: 'libro'   },
      { badge: 'M', native: '水',   rom: 'mizu',       es: 'agua'    },
      { badge: 'T', native: '友達', rom: 'tomodachi',  es: 'amigo'   },
      { badge: 'J', native: '時間', rom: 'jikan',      es: 'tiempo'  },
    ],
    chars: ['日', '本', '語', 'こ', 'ん', 'に'],
  },
  {
    label: 'Inglés',
    flag: '🇺🇸',
    day: 'Día 1 · Inglés',
    title: 'First words',
    words: [
      { badge: 'S', native: 'School', rom: '/skuːl/',    es: 'escuela' },
      { badge: 'H', native: 'Home',   rom: '/hoʊm/',     es: 'casa'    },
      { badge: 'B', native: 'Book',   rom: '/bʊk/',      es: 'libro'   },
      { badge: 'W', native: 'Water',  rom: '/ˈwɔːtər/',  es: 'agua'    },
      { badge: 'F', native: 'Friend', rom: '/frend/',    es: 'amigo'   },
      { badge: 'T', native: 'Time',   rom: '/taɪm/',     es: 'tiempo'  },
    ],
    chars: ['A', 'B', 'C', 'D', 'E', 'F'],
  },
];

const STEPS = [
  { name: 'Activación',           mins: 6,  desc: 'Primeras palabras del día — activación rápida del vocabulario nuevo.' },
  { name: 'Acquisition Slides',   mins: 8,  desc: 'Tarjetas contextuales con audio nativo e ilustraciones.' },
  { name: 'Recognition Practice', mins: 7,  desc: 'Identifica palabras entre distractores. Entrenas el oído.' },
  { name: 'Listening Recognition',mins: 8,  desc: 'Audio auténtico. Marcas lo que escuchas en tiempo real.' },
  { name: 'Contextual Input',     mins: 10, desc: 'Lee o escucha la palabra en contextos reales del idioma.' },
  { name: 'Guided Discovery',     mins: 8,  desc: 'Deduces patrones gramaticales sin memorizar reglas.' },
  { name: 'Micro Explanation',    mins: 5,  desc: 'Cápsulas de 90 segundos para dudas puntuales.' },
  { name: 'Guided Production',    mins: 8,  desc: 'Construyes frases con andamiaje. El sistema te corrige.' },
  { name: 'Reactive Production',  mins: 7,  desc: 'Respuestas rápidas a situaciones reales. Velocidad de contexto.' },
  { name: 'Smart Review',         mins: 6,  desc: 'Repaso espaciado inteligente de los días anteriores.' },
  { name: 'Daily Exam',           mins: 7,  desc: 'Examen acumulativo del día. Interiorización inmediata.' },
];

/* ─── Floating chars animation ─────────────────────────────────────────────── */
function FloatingChars({ chars }: { chars: string[] }) {
  const positions = [
    { top: '12%', left: '4%',  delay: 0    },
    { top: '28%', left: '88%', delay: 0.4  },
    { top: '55%', left: '6%',  delay: 0.8  },
    { top: '70%', left: '92%', delay: 0.2  },
    { top: '82%', left: '18%', delay: 1.0  },
    { top: '40%', left: '78%', delay: 0.6  },
  ];
  return (
    <>
      {chars.map((c, i) => (
        <motion.span
          key={c + i}
          className="lec-hero__float-char"
          style={{ top: positions[i].top, left: positions[i].left }}
          initial={{ opacity: 0, y: 20, scale: 0.7 }}
          animate={{
            opacity: [0, 0.18, 0.12, 0.18],
            y: [20, 0, -8, 0],
            scale: [0.7, 1, 1.04, 1],
          }}
          transition={{
            delay: positions[i].delay,
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          {c}
        </motion.span>
      ))}
    </>
  );
}

/* ─── Word card with flip animation ────────────────────────────────────────── */
function WordCard({ badge, native, rom, es, idx }: { badge: string; native: string; rom: string; es: string; idx: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      className="lec-word-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.06, duration: 0.4, ease: 'easeOut' }}
      onClick={() => setFlipped(f => !f)}
      whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
    >
      <div className={`lec-word-card__inner${flipped ? ' is-flipped' : ''}`}>
        {/* Front */}
        <div className="lec-word-card__face lec-word-card__face--front">
          <span className="lec-word-card__badge">{badge}</span>
          <span className="lec-word-card__native">{native}</span>
          <span className="lec-word-card__rom">{rom}</span>
          <span className="lec-word-card__es">{es}</span>
        </div>
        {/* Back */}
        <div className="lec-word-card__face lec-word-card__face--back">
          <span className="lec-word-card__es-big">{es}</span>
          <span className="lec-word-card__native-sm">{native}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Available days panel ──────────────────────────────────────────────────── */
const AVAILABLE_DAYS: { lang: string; slug: string; flag: string; day: number; title: string; desc: string }[] = [
  { lang: 'Coreano', slug: 'korean', flag: '🇰🇷', day: 1, title: 'Vocabulario fundamental', desc: 'Escuela, casa, libro, agua, amigo — primeras 6 palabras.' },
  { lang: 'Coreano', slug: 'korean', flag: '🇰🇷', day: 2, title: 'El alfabeto Hangul', desc: 'Bloques silábicos, 6 familias articulatorias, primeras lecturas.' },
  { lang: 'Coreano', slug: 'korean', flag: '🇰🇷', day: 3, title: 'Cortesía en la cafetería', desc: '안녕하세요, 주세요, 감사합니다 — pide tu primer café en coreano.' },
  { lang: 'Coreano', slug: 'korean', flag: '🇰🇷', day: 4, title: 'Mercado y números', desc: 'Números nativos, 이거/그거/저거, contadores — pide hodduk como un local.' },
  { lang: 'Coreano', slug: 'korean', flag: '🇰🇷', day: 5, title: 'Pago y despedida', desc: '여기 있습니다, 잘 먹었습니다, 칠천 원, 화장실 — cierra la transacción en el café.' },
  { lang: 'Coreano', slug: 'korean', flag: '🇰🇷', day: 6, title: 'Campus universitario', desc: 'Presentaciones, 새로 왔어요, 어때요 — conoce gente en la universidad.' },
  { lang: 'Coreano', slug: 'korean', flag: '🇰🇷', day: 7, title: 'Rutina universitaria', desc: '에서 vs 에, verbos 하다, 좋아해요 — la vida de David en Corea.' },
];

function AvailableDays() {
  return (
    <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)', padding: '3rem 0' }}>
      <div className="wrap">
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6c63ff' }}>
            DISPONIBLE AHORA
          </span>
          <h2 style={{ margin: '6px 0 6px', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            Empieza sin crear cuenta
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
            Los días publicados están abiertos. Accede directo a la lección.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {AVAILABLE_DAYS.map(d => (
            <Link
              key={`${d.slug}-${d.day}`}
              href={`/courses/${d.slug}/step/${d.day}`}
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                style={{
                  background: 'var(--bg)',
                  border: '1.5px solid var(--line-soft)',
                  borderRadius: 14,
                  padding: '20px 22px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 22 }}>{d.flag}</span>
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 100, background: 'rgba(108,99,255,0.1)', color: '#6c63ff', fontWeight: 700 }}>
                    Día {d.day}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {d.lang}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
                    {d.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                    {d.desc}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 13, color: '#6c63ff', fontWeight: 600 }}>
                    Ir a la lección →
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Step row ──────────────────────────────────────────────────────────────── */
function StepRow({ step, index, active, onClick }: { step: typeof STEPS[0]; index: number; active: boolean; onClick: () => void }) {
  return (
    <motion.li
      className={`lec-step${active ? ' lec-step--active' : ''}`}
      onClick={onClick}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.15 }}
    >
      <span className="lec-step__num">{String(index + 1).padStart(2, '0')}</span>
      <div className="lec-step__info">
        <span className="lec-step__name">{step.name}</span>
        {active && (
          <motion.span
            className="lec-step__desc"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {step.desc}
          </motion.span>
        )}
      </div>
      <span className="lec-step__status">
        {active ? <span className="lec-step__pill lec-step__pill--active">en curso</span> : null}
      </span>
    </motion.li>
  );
}

/* ─── Main component ────────────────────────────────────────────────────────── */
export default function LeccionClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const tab = TABS[activeTab];

  /* Lenis smooth scroll */
  useEffect(() => {
    let lenis: import('lenis').default | null = null;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      const raf = (time: number) => { lenis!.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    });
    return () => { lenis?.destroy(); };
  }, []);

  return (
    <div className="lec-page">

      {/* ── Hero — video background, centrado ─────────────────────────────────── */}
      <section className="lec-hero" ref={heroRef}>
        {/* Video de fondo */}
        <video
          className="lec-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/leccion-hero-poster.webp"
        >
          <source src="/images/leccion-hero.webm" type="video/webm" />
          <source src="/images/leccion-hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay oscuro sobre el video */}
        <div className="lec-hero__overlay" />

        {/* Floating Korean chars encima del video */}
        <FloatingChars chars={tab.chars} />

        <motion.div
          className="lec-hero__content lec-hero__content--center wrap"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            className="lec-hero__center"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="lec-hero__eyebrow">
              <span className="lec-hero__dot" /> Método WeLearn
            </span>
            <h1 className="lec-hero__h1">
              Aprende un idioma<br />
              <em className="lec-hero__em">como un políglota.</em>
            </h1>
            <p className="lec-hero__sub">
              Once pasos diarios que imitan la forma en que el cerebro interioriza un idioma
              — sin memorizar reglas, sin aburrirte.
            </p>

            {/* Primary CTA: probar Step 01 ya */}
            <div className="lec-hero__ctas">
              <Link href="/courses/korean/step/1" className="lec-hero__btn-primary">
                🇰🇷 Probar el Paso 01 gratis
              </Link>
              <button
                className="lec-hero__btn-ghost"
                onClick={() => document.getElementById('lec-demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver cómo funciona ↓
              </button>
            </div>

            <div className="lec-hero__stats">
              <div className="lec-hero__stat"><strong>11</strong><span>pasos diarios</span></div>
              <div className="lec-hero__stat-div" />
              <div className="lec-hero__stat"><strong>8</strong><span>idiomas</span></div>
              <div className="lec-hero__stat-div" />
              <div className="lec-hero__stat"><strong>500+</strong><span>estudiantes</span></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="lec-hero__scroll-cue"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="lec-hero__scroll-line" />
        </motion.div>
      </section>

      <AvailableDays />

      {/* ── Live demo ─────────────────────────────────────────────────────────── */}
      <section id="lec-demo" className="lec-demo">
        <div className="wrap">
          <motion.div
            className="lec-demo__header"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="lec-demo__eyebrow">
              <span className="lec-demo__line" /> Preview interactivo
            </span>
            <h2 className="lec-demo__h2">Mira cómo se ve<br />un día completo.</h2>
            <p className="lec-demo__sub">Haz clic en las tarjetas para voltearlas. Explora los 11 pasos del día.</p>
          </motion.div>

          {/* Language selector */}
          <div className="lec-tabs">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                className={`lec-tab${activeTab === i ? ' lec-tab--active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                <span>{t.flag}</span> {t.label}
              </button>
            ))}
          </div>

          {/* Lesson shell */}
          <motion.div
            className="lec-shell"
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <header className="lec-shell__header">
              <span className="lec-shell__day">{tab.day}</span>
              <h3 className="lec-shell__title">{tab.title}</h3>
            </header>

            <div className="lec-shell__body">
              {/* Main content */}
              <div className="lec-shell__main">
                <div className="lec-shell__step-meta">
                  <span className="lec-shell__step-badge">PASO {String(activeStep + 1).padStart(2, '0')}</span>
                  <span className="lec-shell__step-name">{STEPS[activeStep].name.toUpperCase()}</span>
                  <span className="lec-shell__step-mins">{STEPS[activeStep].mins} MIN</span>
                </div>
                <h4 className="lec-shell__step-title">
                  {activeStep === 0 ? 'Conoce las primeras seis palabras.' : STEPS[activeStep].desc}
                </h4>

                {activeStep === 0 ? (
                  <div className="lec-word-grid">
                    {tab.words.map((w, i) => (
                      <WordCard key={w.rom + activeTab} {...w} idx={i} />
                    ))}
                  </div>
                ) : (
                  <div className="lec-locked-step">
                    <p className="lec-locked-step__text">{STEPS[activeStep].desc}</p>
                    <Link href="/courses/korean/step/1" className="lec-locked-step__cta">
                      Ir a la lección →
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar: 11 pasos */}
              <aside className="lec-shell__sidebar">
                <p className="lec-shell__steps-label">LOS 11 PASOS DEL DÍA</p>
                <ul className="lec-shell__steps">
                  <AnimatePresence>
                    {STEPS.map((s, i) => (
                      <StepRow
                        key={s.name}
                        step={s}
                        index={i}
                        active={activeStep === i}
                        onClick={() => setActiveStep(i)}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
              </aside>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content types ─────────────────────────────────────────────────────── */}
      <section className="lec-types">
        <div className="wrap">
          <motion.h2
            className="lec-types__h2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Todo lo que necesitas,<br />en un solo lugar.
          </motion.h2>
          <div className="lec-types__grid">
            {(
              [
                { icon: IC_MIC,      title: 'Podcast integrado', desc: 'Audio nativo en contexto real. Escuchas el idioma como se habla en la calle.' },
                { icon: IC_LAYERS,   title: 'Flashcards 3D', desc: 'Tarjetas con flip que activan la memoria visual y la recuperación activa.' },
                { icon: IC_PALETTE,  title: 'Ilustraciones', desc: 'Imágenes que conectan la palabra con el concepto — no con la traducción.' },
                { icon: IC_BARCHART, title: 'Examen acumulativo', desc: 'Cada día evalúa todo lo aprendido antes. El sistema sabe qué repasar.' },
              ] as { icon: ReactNode; title: string; desc: string }[]
            ).map((item, i) => (
              <motion.div
                key={item.title}
                className="lec-type-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <span className="lec-type-card__icon">{item.icon}</span>
                <h3 className="lec-type-card__title">{item.title}</h3>
                <p className="lec-type-card__desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ──────────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(3rem, 7vw, 5rem) 1.5rem', background: 'var(--bg-alt)' }}>
        <div className="wrap">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>Del blog WeLearn</p>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: '1.25rem' }}>Artículos sobre aprendizaje de idiomas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.85rem' }}>
              {[
                { cat: 'Método', color: '#7c3aed', title: 'Cómo aprender un idioma más rápido: lo que la ciencia dice', slug: 'como-aprender-un-idioma-mas-rapido' },
                { cat: 'Inglés', color: '#1a4fcc', title: 'Por qué te bloqueas al hablar inglés y cómo superarlo', slug: 'como-mejorar-el-ingles-hablado' },
                { cat: 'Método', color: '#7c3aed', title: 'Aprender idiomas con series y películas: cómo hacerlo bien', slug: 'aprender-idiomas-con-series-y-peliculas' },
              ].map(a => (
                <Link key={a.slug} href={`/blog/${a.slug}`} style={{ display: 'block', padding: '1rem 1.1rem', borderRadius: 10, border: '1px solid var(--line-soft)', background: 'var(--bg)', textDecoration: 'none' }}>
                  <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: a.color, background: a.color + '18', padding: '2px 8px', borderRadius: 100, marginBottom: '0.55rem' }}>{a.cat}</span>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4, color: 'var(--ink)', margin: 0 }}>{a.title} →</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────────────────────── */}
      <section className="lec-cta">
        <motion.div
          className="wrap lec-cta__inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="lec-cta__h2">Empieza hoy.<br />El primer día es gratis.</h2>
          <p className="lec-cta__sub">Sin tarjeta de crédito. Sin promesas vacías.</p>
          <div className="lec-cta__btns">
            <Link href="/clases-de-ingles" className="lec-cta__btn">Crear cuenta gratis</Link>
            <Link href="/examenes" className="lec-cta__link">Ver exámenes disponibles →</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
