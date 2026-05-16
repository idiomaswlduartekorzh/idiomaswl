'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  {
    label: 'Coreano', flag: '🇰🇷', slug: 'korean',
    day: 'Día 1 · Coreano', title: 'Vocabulario fundamental',
    words: [
      { badge: 'H', native: '학교', rom: 'hak-kyo', es: 'escuela' },
      { badge: 'J', native: '집',   rom: 'jip',     es: 'casa'    },
      { badge: 'C', native: '책',   rom: 'chaek',   es: 'libro'   },
      { badge: 'A', native: '물',   rom: 'mul',     es: 'agua'    },
      { badge: 'F', native: '친구', rom: 'chin-gu', es: 'amigo'   },
      { badge: 'T', native: '시간', rom: 'shi-gan', es: 'tiempo'  },
    ],
  },
  {
    label: 'Japonés', flag: '🇯🇵', slug: 'japanese',
    day: 'Día 1 · Japonés', title: 'Vocabulario esencial',
    words: [
      { badge: 'G', native: '学校', rom: 'gakkou',    es: 'escuela' },
      { badge: 'I', native: 'いえ', rom: 'ie',         es: 'casa'    },
      { badge: 'H', native: '本',   rom: 'hon',        es: 'libro'   },
      { badge: 'M', native: '水',   rom: 'mizu',       es: 'agua'    },
      { badge: 'T', native: '友達', rom: 'tomodachi',  es: 'amigo'   },
      { badge: 'J', native: '時間', rom: 'jikan',      es: 'tiempo'  },
    ],
  },
  {
    label: 'Inglés', flag: '🇺🇸', slug: 'english',
    day: 'Día 1 · Inglés', title: 'First words',
    words: [
      { badge: 'S', native: 'School', rom: '/skuːl/',   es: 'escuela' },
      { badge: 'H', native: 'Home',   rom: '/hoʊm/',    es: 'casa'    },
      { badge: 'B', native: 'Book',   rom: '/bʊk/',     es: 'libro'   },
      { badge: 'W', native: 'Water',  rom: '/ˈwɔːtər/', es: 'agua'    },
      { badge: 'F', native: 'Friend', rom: '/frend/',   es: 'amigo'   },
      { badge: 'T', native: 'Time',   rom: '/taɪm/',    es: 'tiempo'  },
    ],
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
  { name: 'Reactive Production',  mins: 7,  desc: 'Respuestas rápidas a situaciones reales.' },
  { name: 'Smart Review',         mins: 6,  desc: 'Repaso espaciado inteligente de los días anteriores.' },
  { name: 'Daily Exam',           mins: 7,  desc: 'Examen acumulativo del día. Interiorización inmediata.' },
];

function WordCard({ badge, native, rom, es, idx }: { badge: string; native: string; rom: string; es: string; idx: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      className="lec-word-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05, duration: 0.35 }}
      onClick={() => setFlipped(f => !f)}
      whileHover={{ scale: 1.03, transition: { duration: 0.12 } }}
    >
      <div className={`lec-word-card__inner${flipped ? ' is-flipped' : ''}`}>
        <div className="lec-word-card__face lec-word-card__face--front">
          <span className="lec-word-card__badge">{badge}</span>
          <span className="lec-word-card__native">{native}</span>
          <span className="lec-word-card__rom">{rom}</span>
          <span className="lec-word-card__es">{es}</span>
        </div>
        <div className="lec-word-card__face lec-word-card__face--back">
          <span className="lec-word-card__es-big">{es}</span>
          <span className="lec-word-card__native-sm">{native}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function LessonTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const tab = TABS[activeTab];

  return (
    <div id="coreano-preview">
      {/* Language tabs */}
      <div className="lec-tabs" style={{ marginBottom: '1.5rem' }}>
        {TABS.map((t, i) => (
          <button
            key={t.label}
            className={`lec-tab${activeTab === i ? ' lec-tab--active' : ''}`}
            onClick={() => { setActiveTab(i); setActiveStep(0); }}
          >
            {t.flag} {t.label}
          </button>
        ))}
      </div>

      {/* Lesson shell — same component as /leccion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="lec-shell"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          <div className="lec-shell__header">
            <span className="lec-shell__day">{tab.day}</span>
            <h3 className="lec-shell__title">{tab.title}</h3>
          </div>

          <div className="lec-shell__body">
            {/* Main */}
            <div className="lec-shell__main">
              <div className="lec-shell__step-meta">
                <span className="lec-shell__step-badge">PASO 01</span>
                <span className="lec-shell__step-name">ACTIVACIÓN</span>
                <span className="lec-shell__step-mins">6 MIN</span>
              </div>
              <h4 className="lec-shell__step-title">Conoce las primeras seis palabras.</h4>
              <div className="lec-word-grid">
                {tab.words.map((w, i) => (
                  <WordCard key={w.rom + activeTab} idx={i} {...w} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lec-shell__sidebar">
              <p className="lec-shell__steps-label">LOS 11 PASOS DEL DÍA</p>
              <ul className="lec-shell__steps">
                {STEPS.map((s, i) => (
                  <motion.li
                    key={s.name}
                    className={`lec-step${i === activeStep ? ' lec-step--active' : ''}`}
                    onClick={() => setActiveStep(i)}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.12 }}
                  >
                    <span className="lec-step__num">{String(i + 1).padStart(2, '0')}</span>
                    <div className="lec-step__info">
                      <span className="lec-step__name">{s.name}</span>
                      {i === activeStep && (
                        <motion.span
                          className="lec-step__desc"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.2 }}
                        >
                          {s.desc}
                        </motion.span>
                      )}
                    </div>
                    <span className="lec-step__status">
                      {i === activeStep
                        ? <span className="lec-step__pill lec-step__pill--active">en curso</span>
                        : i === 0 ? null
                        : <span className="lec-step__pill">bloqueado</span>}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </aside>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CTA — link to the real Step 01 */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link
          href={`/courses/${tab.slug}/step/1`}
          className="lec-hero__btn-primary"
        >
          {tab.flag} Empezar el Día 1 en {tab.label}
        </Link>
      </div>
    </div>
  );
}
