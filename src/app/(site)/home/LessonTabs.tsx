'use client';
import { useState } from 'react';

const TABS = [
  {
    label: 'Coreano',
    day: 'Día 1 · Coreano',
    title: 'Vocabulario fundamental',
    words: [
      { badge: 'H', native: '학교', rom: 'hak-kyo', es: 'escuela' },
      { badge: 'J', native: '집',   rom: 'jip',    es: 'casa' },
      { badge: 'C', native: '책',   rom: 'chaek',  es: 'libro' },
      { badge: 'A', native: '물',   rom: 'mul',    es: 'agua' },
      { badge: 'F', native: '친구', rom: 'chin-gu',es: 'amigo' },
      { badge: 'T', native: '시간', rom: 'shi-gan',es: 'tiempo' },
    ],
  },
  {
    label: 'Japonés',
    day: 'Día 1 · Japonés',
    title: 'Vocabulario esencial',
    words: [
      { badge: 'G', native: '学校', rom: 'gakkou', es: 'escuela' },
      { badge: 'I', native: 'いえ', rom: 'ie',     es: 'casa' },
      { badge: 'H', native: '本',   rom: 'hon',    es: 'libro' },
      { badge: 'M', native: '水',   rom: 'mizu',   es: 'agua' },
      { badge: 'T', native: '友達', rom: 'tomodachi', es: 'amigo' },
      { badge: 'J', native: '時間', rom: 'jikan',  es: 'tiempo' },
    ],
  },
  {
    label: 'Inglés',
    day: 'Día 1 · Inglés',
    title: 'First words',
    words: [
      { badge: 'S', native: 'School',  rom: '/skuːl/',  es: 'escuela' },
      { badge: 'H', native: 'Home',    rom: '/hoʊm/',   es: 'casa' },
      { badge: 'B', native: 'Book',    rom: '/bʊk/',    es: 'libro' },
      { badge: 'W', native: 'Water',   rom: '/ˈwɔːtər/',es: 'agua' },
      { badge: 'F', native: 'Friend',  rom: '/frend/',  es: 'amigo' },
      { badge: 'T', native: 'Time',    rom: '/taɪm/',   es: 'tiempo' },
    ],
  },
];

const STEPS = [
  'Activación', 'Acquisition Slides', 'Recognition Practice',
  'Listening Recognition', 'Contextual Input', 'Guided Discovery',
  'Micro Explanation', 'Guided Production', 'Reactive Production',
  'Smart Review', 'Daily Exam',
];

export default function LessonTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <div>
      <div className="wl-lesson-tabs">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={`wl-lesson-tab${active === i ? ' wl-lesson-tab--active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="wl-lesson-shell">
        <header className="wl-lesson-shell__header">
          <span className="wl-lesson-shell__day">{tab.day}</span>
          <h3 className="wl-lesson-shell__title">{tab.title}</h3>
        </header>
        <div className="wl-lesson-shell__body">
          <div className="wl-lesson-shell__main">
            <div className="wl-lesson-shell__step-info">
              <span>PASO 01 · ACTIVACION · 6 MIN</span>
            </div>
            <h4 className="wl-lesson-shell__step-title">Conoce las primeras seis palabras.</h4>
            <div className="wl-word-grid">
              {tab.words.map(w => (
                <div key={w.rom} className="wl-word-card">
                  <span className="wl-word-card__badge">{w.badge}</span>
                  <span className="wl-word-card__native">{w.native}</span>
                  <span className="wl-word-card__rom">{w.rom}</span>
                  <span className="wl-word-card__es">{w.es}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="wl-lesson-shell__sidebar">
            <p className="wl-lesson-shell__steps-label">LOS 11 PASOS DEL DIA</p>
            <ul className="wl-lesson-shell__steps">
              {STEPS.map((s, i) => (
                <li key={s} className={`wl-lesson-step${i === 0 ? ' wl-lesson-step--active' : ''}`}>
                  <span className="wl-lesson-step__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="wl-lesson-step__name">{s}</span>
                  <span className="wl-lesson-step__status">{i === 0 ? 'en curso' : 'bloqueado'}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
