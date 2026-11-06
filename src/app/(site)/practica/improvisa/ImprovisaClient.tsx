'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Pause, Play, RotateCcw, Sparkles, Volume2 } from 'lucide-react';
import styles from './improvisa.module.css';

type Language = 'es' | 'en';
type Prompt = { category: string; word: string };
type Level = {
  name: string;
  theme: Record<Language, string>;
  intro: Record<Language, string>;
  challenge: Record<Language, string>;
  prompts: Record<Language, Prompt[]>;
};

const REVEAL_AT = [10, 22, 34, 46, 58, 70];
const DURATION = 82;
const LEVELS: Level[] = [
  {
    name: 'La chispa',
    theme: { es: '¿Qué hice ayer?', en: 'What did I do yesterday?' },
    intro: { es: 'Cuenta tu día como si fuera una pequeña aventura. Empieza por la mañana y deja que cada palabra cambie el rumbo.', en: 'Tell the story of your day as a little adventure. Start in the morning and let each word change what happens next.' },
    challenge: { es: 'Integra objetos y lugares sin detener tu historia.', en: 'Weave objects and places into your story without stopping.' },
    prompts: {
      es: [{ category: 'Animal', word: 'perro' }, { category: 'Lugar', word: 'estación' }, { category: 'Objeto', word: 'llave' }, { category: 'Comida', word: 'mango' }, { category: 'Persona', word: 'vecino' }, { category: 'Clima', word: 'lluvia' }],
      en: [{ category: 'Animal', word: 'dog' }, { category: 'Place', word: 'station' }, { category: 'Object', word: 'key' }, { category: 'Food', word: 'mango' }, { category: 'Person', word: 'neighbor' }, { category: 'Weather', word: 'rain' }],
    },
  },
  {
    name: 'El giro',
    theme: { es: 'El día que todo cambió', en: 'The day everything changed' },
    intro: { es: 'Inventa un momento inesperado. Ahora las palabras no solo añaden cosas: cambian el tono y conectan ideas.', en: 'Invent an unexpected moment. Now the words do more than add things: they change the mood and connect ideas.' },
    challenge: { es: 'Usa conectores y adjetivos con naturalidad.', en: 'Use connectors and adjectives naturally.' },
    prompts: {
      es: [{ category: 'Emoción', word: 'sorpresa' }, { category: 'Adjetivo', word: 'misterioso' }, { category: 'Conector', word: 'sin embargo' }, { category: 'Acción', word: 'descubrir' }, { category: 'Adverbio', word: 'de repente' }, { category: 'Giro', word: 'secreto' }],
      en: [{ category: 'Emotion', word: 'surprise' }, { category: 'Adjective', word: 'mysterious' }, { category: 'Connector', word: 'however' }, { category: 'Action', word: 'discover' }, { category: 'Adverb', word: 'suddenly' }, { category: 'Twist', word: 'secret' }],
    },
  },
  {
    name: 'Sin guion',
    theme: { es: 'Una decisión imposible', en: 'An impossible decision' },
    intro: { es: 'Defiende una decisión difícil dentro de una historia. Habla con precisión, introduce contraste y termina con una consecuencia.', en: 'Defend a difficult choice inside a story. Speak precisely, introduce contrast, and end with a consequence.' },
    challenge: { es: 'Sostén una idea abstracta mientras improvisas.', en: 'Hold an abstract idea together while improvising.' },
    prompts: {
      es: [{ category: 'Valor', word: 'lealtad' }, { category: 'Duda', word: 'quizás' }, { category: 'Contraste', word: 'a pesar de' }, { category: 'Consecuencia', word: 'por lo tanto' }, { category: 'Adjetivo', word: 'inevitable' }, { category: 'Cierre', word: 'promesa' }],
      en: [{ category: 'Value', word: 'loyalty' }, { category: 'Doubt', word: 'perhaps' }, { category: 'Contrast', word: 'despite' }, { category: 'Consequence', word: 'therefore' }, { category: 'Adjective', word: 'inevitable' }, { category: 'Ending', word: 'promise' }],
    },
  },
];

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export default function ImprovisaClient() {
  const [language, setLanguage] = useState<Language>('es');
  const [levelIndex, setLevelIndex] = useState(0);
  const [unlocked, setUnlocked] = useState(0);
  const [phase, setPhase] = useState<'ready' | 'running' | 'paused' | 'review'>('ready');
  const [elapsed, setElapsed] = useState(0);
  const [checked, setChecked] = useState<boolean[]>(Array(6).fill(false));
  const startedAt = useRef(0);
  const banked = useRef(0);
  const level = LEVELS[levelIndex];
  const prompts = level.prompts[language];
  const revealed = REVEAL_AT.filter((at) => elapsed >= at).length;
  const nextAt = REVEAL_AT[revealed];
  const remaining = Math.max(0, DURATION - elapsed);
  const allChecked = checked.every(Boolean);

  useEffect(() => {
    if (phase !== 'running') return;
    const interval = window.setInterval(() => {
      const next = Math.min(DURATION, Math.floor(banked.current + (Date.now() - startedAt.current) / 1000));
      setElapsed(next);
      if (next >= DURATION) setPhase('review');
    }, 100);
    return () => window.clearInterval(interval);
  }, [phase]);

  const reset = useCallback((nextLevel = levelIndex, nextLanguage = language) => {
    banked.current = 0;
    startedAt.current = 0;
    setElapsed(0);
    setChecked(Array(6).fill(false));
    setPhase('ready');
    setLevelIndex(nextLevel);
    setLanguage(nextLanguage);
  }, [language, levelIndex]);

  const start = () => {
    startedAt.current = Date.now();
    setPhase('running');
  };
  const pause = () => {
    banked.current += (Date.now() - startedAt.current) / 1000;
    setPhase('paused');
  };
  const finish = () => {
    setElapsed(DURATION);
    setPhase('review');
  };
  const advance = () => {
    if (!allChecked || levelIndex === LEVELS.length - 1) return;
    setUnlocked(Math.max(unlocked, levelIndex + 1));
    reset(levelIndex + 1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <Link href="/practica" className={styles.back}><ArrowLeft size={17} /> Práctica</Link>
          <span className={styles.brand}>WELEARN <span>/</span> LABORATORIO DE VOZ</span>
          <span className={styles.topTag}>Ejercicio oral · 3 niveles</span>
        </header>

        <section className={styles.hero} aria-labelledby="improvisa-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.sparkle}><Sparkles size={15} /></span> HABLA SIN GUION</p>
            <h1 id="improvisa-title">Una historia.<br /><em>Seis sorpresas.</em></h1>
            <p className={styles.heroLead}>Empieza a contar. La pista te anuncia qué viene; la palabra aparece cuando la línea llega a su marca. Incorpórala sin romper el hilo.</p>
            <div className={styles.how}>
              <span><b>01</b> Elige idioma</span><i />
              <span><b>02</b> Improvisa en voz alta</span><i />
              <span><b>03</b> Revisa tus 6 palabras</span>
            </div>
          </div>
          <div className={styles.heroArt} aria-hidden="true"><span className={styles.artOrbit} /><span className={styles.artQuote}>“</span><span className={styles.artWord}>¿y<br />ahora?</span><span className={styles.artDot} /><span className={styles.artCaption}>TU HISTORIA CAMBIA EN TIEMPO REAL</span></div>
        </section>

        <div className={styles.controlsRow}>
          <div className={styles.levels} aria-label="Niveles">
            {LEVELS.map((item, index) => <button key={item.name} type="button" disabled={index > unlocked || phase === 'running' || phase === 'paused'} aria-current={index === levelIndex ? 'step' : undefined} className={`${styles.levelTab} ${index === levelIndex ? styles.levelTabActive : ''}`} onClick={() => reset(index)}><span>{String(index + 1).padStart(2, '0')}</span> {item.name}{index > unlocked ? ' · bloqueado' : ''}</button>)}
          </div>
          <div className={styles.language} aria-label="Idioma de la historia"><button type="button" className={language === 'es' ? styles.languageActive : ''} disabled={phase === 'running' || phase === 'paused'} onClick={() => reset(levelIndex, 'es')} aria-pressed={language === 'es'}>Español</button><button type="button" className={language === 'en' ? styles.languageActive : ''} disabled={phase === 'running' || phase === 'paused'} onClick={() => reset(levelIndex, 'en')} aria-pressed={language === 'en'}>English</button></div>
        </div>

        <section className={styles.stage} aria-label="Reto de improvisación">
          <div className={styles.stageTop}><span className={styles.stageKicker}>NIVEL {String(levelIndex + 1).padStart(2, '0')} <span>·</span> {level.name.toUpperCase()}</span><span className={styles.stagePill}><Volume2 size={14} /> EN VOZ ALTA</span></div>
          <div className={styles.stageGrid}>
            <div className={styles.storyBrief}><p className={styles.smallLabel}>TU PUNTO DE PARTIDA</p><h2>{level.theme[language]}</h2><p>{level.intro[language]}</p><div className={styles.challenge}><span>✦</span><div><strong>Tu misión</strong><p>{level.challenge[language]}</p></div></div></div>
            <div className={styles.livePanel}>
              <div className={styles.timerHead}><span>{phase === 'review' ? 'RONDA TERMINADA' : phase === 'paused' ? 'EN PAUSA' : phase === 'running' ? 'EN DIRECTO' : 'LISTO PARA EMPEZAR'}</span><strong aria-live="off">{formatTime(remaining)}</strong></div>
              <div className={styles.promptCard}>
                {phase === 'ready' ? <><span className={styles.promptOverline}>PRIMERA PISTA</span><span className={styles.promptHint}>{prompts[0].category}</span><p>Empieza tu historia. La primera palabra aparecerá en 10 segundos.</p></> : phase === 'review' ? <><span className={styles.promptOverline}>AHORA REVISA</span><span className={styles.promptHint}>¿Las usaste todas?</span><p>Marca las seis palabras que lograste integrar en tu historia.</p></> : <><span className={styles.promptOverline}>{revealed < 6 ? 'PRÓXIMA CATEGORÍA' : 'ÚLTIMA PALABRA'}</span><span className={styles.promptHint}>{revealed < 6 ? prompts[revealed].category : prompts[5].category}</span><div className={styles.currentWord} aria-live="assertive">{revealed > 0 ? prompts[revealed - 1].word : <span>La historia empieza contigo</span>}</div><p>{revealed < 6 ? `La siguiente palabra llega en ${Math.max(0, nextAt - elapsed)} s` : 'Cierra tu historia antes de que termine el tiempo.'}</p></>}
              </div>
              <div className={styles.actionRow}>{phase === 'ready' && <button type="button" className={styles.primaryButton} onClick={start}><Play size={17} fill="currentColor" /> Empezar historia</button>}{phase === 'running' && <button type="button" className={styles.primaryButton} onClick={pause}><Pause size={17} fill="currentColor" /> Pausar</button>}{phase === 'paused' && <button type="button" className={styles.primaryButton} onClick={start}><Play size={17} fill="currentColor" /> Continuar</button>}{phase === 'review' && <button type="button" className={styles.primaryButton} onClick={() => reset()}><RotateCcw size={17} /> Repetir nivel</button>}{(phase === 'running' || phase === 'paused') && revealed === 6 && <button type="button" className={styles.textButton} onClick={finish}>Terminar antes</button>}</div>
            </div>
          </div>

          <div className={styles.timelineSection}><div className={styles.timelineHeading}><span>EL RECORRIDO</span><span>{revealed} / 6 palabras reveladas</span></div><div className={styles.timeline} role="img" aria-label={`Progreso: ${elapsed} de ${DURATION} segundos; ${revealed} de seis palabras reveladas`}><div className={styles.timelineFill} style={{ width: `${(elapsed / DURATION) * 100}%` }} />{REVEAL_AT.map((at, index) => <span key={at} className={`${styles.marker} ${elapsed >= at ? styles.markerDone : ''}`} style={{ left: `${(at / DURATION) * 100}%` }}><span>{index + 1}</span></span>)}</div><div className={styles.timelineEnds}><span>COMIENZA</span><span>FINAL</span></div></div>
        </section>

        <section className={styles.wordsSection} aria-labelledby="words-title"><div className={styles.wordsTitle}><div><p className={styles.smallLabel}>TU REPERTORIO</p><h2 id="words-title">Las palabras de esta historia</h2></div><p>{phase === 'review' ? 'Marca cada palabra que realmente dijiste.' : 'Se irán revelando mientras hablas.'}</p></div><div className={styles.wordGrid}>{prompts.map((prompt, index) => { const visible = revealed > index || phase === 'review'; return <div key={`${language}-${levelIndex}-${index}`} className={`${styles.wordTile} ${visible ? styles.wordTileVisible : ''} ${phase === 'review' && checked[index] ? styles.wordTileChecked : ''}`}><span className={styles.tileIndex}>{String(index + 1).padStart(2, '0')}</span><span className={styles.tileCategory}>{visible ? prompt.category : 'POR DESCUBRIR'}</span><strong>{visible ? prompt.word : '······'}</strong>{phase === 'review' && <label className={styles.checkLabel}><input type="checkbox" checked={checked[index]} onChange={() => setChecked((prev) => prev.map((value, i) => i === index ? !value : value))} /><span><Check size={15} /></span> La incorporé</label>}</div>; })}</div>{phase === 'review' && <div className={styles.resultBar}><div><strong>{checked.filter(Boolean).length} de 6 incorporadas</strong><p>{allChecked ? levelIndex === 2 ? '¡Completaste los tres niveles! Puedes repetir este reto en otro idioma.' : '¡Nivel superado! Ya puedes pasar al siguiente.' : 'Si faltó alguna, repite la historia y prueba otra manera de introducirla.'}</p></div>{allChecked && levelIndex < 2 && <button type="button" className={styles.nextButton} onClick={advance}>Siguiente nivel <ArrowRight size={17} /></button>}</div>}</section>
        <footer className={styles.footer}>WELEARN <span>·</span> HABLAR TAMBIÉN SE ENTRENA</footer>
      </div>
    </div>
  );
}
