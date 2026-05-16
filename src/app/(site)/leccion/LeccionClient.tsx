'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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
        {active ? <span className="lec-step__pill lec-step__pill--active">en curso</span>
                : index === 0 ? null
                : <span className="lec-step__pill">bloqueado</span>}
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

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="lec-hero" ref={heroRef}>
        <FloatingChars chars={tab.chars} />

        <motion.div className="lec-hero__content wrap" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            className="lec-hero__left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
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
            <div className="lec-hero__stats">
              <div className="lec-hero__stat"><strong>11</strong><span>pasos diarios</span></div>
              <div className="lec-hero__stat-div" />
              <div className="lec-hero__stat"><strong>8</strong><span>idiomas</span></div>
              <div className="lec-hero__stat-div" />
              <div className="lec-hero__stat"><strong>500+</strong><span>estudiantes</span></div>
            </div>
            <div className="lec-hero__ctas">
              <Link href="/registro" className="lec-hero__btn-primary">Empezar gratis</Link>
              <button
                className="lec-hero__btn-ghost"
                onClick={() => document.getElementById('lec-demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver la lección ↓
              </button>
            </div>
          </motion.div>

          {/* David placeholder — swap with real photo */}
          <motion.div
            className="lec-hero__right"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="lec-hero__photo-wrap">
              <div className="lec-hero__photo-placeholder">
                {/* Replace with: <Image src="/images/david-hero.jpg" alt="David" fill style={{objectFit:'cover'}} /> */}
                <span className="lec-hero__photo-icon">📸</span>
                <span className="lec-hero__photo-label">Foto de David aquí<br /><small>/public/images/david-hero.jpg</small></span>
              </div>
              {/* Floating label */}
              <div className="lec-hero__photo-badge">
                <strong>José David</strong>
                <span>Políglota · 8 idiomas</span>
              </div>
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
                    <div className="lec-locked-step__icon">🔒</div>
                    <p className="lec-locked-step__text">{STEPS[activeStep].desc}</p>
                    <Link href="/registro" className="lec-locked-step__cta">
                      Desbloquear este paso →
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
            {[
              { icon: '🎙', title: 'Podcast integrado', desc: 'Audio nativo en contexto real. Escuchas el idioma como se habla en la calle.' },
              { icon: '🃏', title: 'Flashcards 3D', desc: 'Tarjetas con flip que activan la memoria visual y la recuperación activa.' },
              { icon: '🎨', title: 'Ilustraciones', desc: 'Imágenes que conectan la palabra con el concepto — no con la traducción.' },
              { icon: '📊', title: 'Examen acumulativo', desc: 'Cada día evalúa todo lo aprendido antes. El sistema sabe qué repasar.' },
            ].map((item, i) => (
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
            <Link href="/registro" className="lec-cta__btn">Crear cuenta gratis</Link>
            <Link href="/examenes" className="lec-cta__link">Ver exámenes disponibles →</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
