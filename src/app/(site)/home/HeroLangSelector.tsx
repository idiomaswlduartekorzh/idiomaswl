'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGS = [
  {
    code: 'En', flag: '🇺🇸', name: 'Inglés',
    word: 'school', rom: 'school', es: 'escuela',
    opts: ['escuela', 'casa', 'libro', 'ciudad'],
    active: true,
  },
  {
    code: '한', flag: '🇰🇷', name: 'Coreano',
    word: '학교', rom: 'hak-kyo', es: 'escuela',
    opts: ['escuela', 'casa', 'libro', 'tiempo'],
    active: true,
  },
  {
    code: 'Fr', flag: '🇫🇷', name: 'Francés',
    word: 'école', rom: 'é-kol', es: 'escuela',
    opts: ['escuela', 'amigo', 'ciudad', 'tiempo'],
    active: true,
  },
  {
    code: 'De', flag: '🇩🇪', name: 'Alemán',
    word: 'Schule', rom: 'shu-le', es: 'escuela',
    opts: ['escuela', 'casa', 'trabajo', 'agua'],
    active: true,
  },
  {
    code: 'It', flag: '🇮🇹', name: 'Italiano',
    word: 'scuola', rom: 'sku-ó-la', es: 'escuela',
    opts: ['escuela', 'iglesia', 'libro', 'tiempo'],
    active: true,
  },
  {
    code: 'Pt', flag: '🇧🇷', name: 'Portugués',
    word: 'escola', rom: 'es-kó-la', es: 'escuela',
    opts: ['escuela', 'calle', 'libro', 'ciudad'],
    active: true,
  },
  {
    code: '日', flag: '🇯🇵', name: 'Japonés',
    word: '学校', rom: 'gak-kō', es: 'escuela',
    opts: ['escuela', 'casa', 'libro', 'tiempo'],
    active: false,
  },
  {
    code: 'Ру', flag: '🇷🇺', name: 'Ruso',
    word: 'школа', rom: 'shkó-la', es: 'escuela',
    opts: ['escuela', 'casa', 'libro', 'tiempo'],
    active: false,
  },
];

export default function HeroLangSelector() {
  const [selected, setSelected] = useState(1); // default: Coreano
  const lang = LANGS[selected];

  return (
    <div className="wlh-lesson-preview wlh-lesson-preview--selector">
      {/* Language pill selector */}
      <div className="wlh-hero-pills">
        {LANGS.map((l, i) => (
          <button
            key={l.code}
            onClick={() => setSelected(i)}
            className={[
              'wlh-hero-pill',
              i === selected ? 'wlh-hero-pill--active' : '',
              !l.active ? 'wlh-hero-pill--soon' : '',
            ].filter(Boolean).join(' ')}
          >
            <span>{l.flag}</span>
            <span>{l.code}</span>
          </button>
        ))}
      </div>

      {/* Animated lesson preview */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="wlh-lesson-preview__header">
            <span>{lang.name.toUpperCase()} · DÍA 1 · PASO 01</span>
            <span>ACTIVACIÓN</span>
          </div>

          {lang.active ? (
            <>
              <div className="wlh-lesson-preview__word">
                <span className="wlh-lesson-preview__native">{lang.word}</span>
                <span className="wlh-lesson-preview__rom">{lang.rom} · {lang.es}</span>
              </div>
              <div className="wlh-lesson-preview__opts">
                {lang.opts.map((opt, i) => (
                  <button
                    key={opt}
                    className={`wlh-lesson-opt${i === 0 ? ' wlh-lesson-opt--selected' : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="wlh-hero-selector-soon">
              <span className="wlh-hero-selector-soon__word">{lang.word}</span>
              <p className="wlh-hero-selector-soon__msg">Próximamente disponible</p>
            </div>
          )}

          <div className="wlh-lesson-preview__dots">
            {Array.from({ length: 11 }).map((_, i) => (
              <span key={i} className={`wlh-dot${i < 3 ? ' wlh-dot--done' : ''}`} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
