'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CYCLE_TEXTS, type CycleText, type Nivel, type QuizLevel, type Question } from '@/data/korean-cycle-texts';

// ─── Constants ───────────────────────────────────────────────────────────────

const STEP_COLORS = {
  1: { main: '#534AB7', light: 'rgba(83,74,183,0.08)', border: 'rgba(83,74,183,0.25)', label: 'Leer' },
  2: { main: '#059669', light: 'rgba(5,150,105,0.08)', border: 'rgba(5,150,105,0.25)', label: 'Escuchar' },
  3: { main: '#d97706', light: 'rgba(217,119,6,0.08)',  border: 'rgba(217,119,6,0.25)',  label: 'Comprender' },
  4: { main: '#e11d48', light: 'rgba(225,29,72,0.08)',  border: 'rgba(225,29,72,0.25)',  label: 'Producir' },
} as const;

const NIVEL_INFO: Record<Nivel, { desc: string; emoji: string; color: string; bg: string }> = {
  A1: { desc: 'Principiante absoluto. Frases simples, vocabulario básico.', emoji: '🌱', color: '#059669', bg: 'rgba(5,150,105,0.08)' },
  A2: { desc: 'Básico. Situaciones cotidianas, presente y futuro sencillo.', emoji: '🌿', color: '#534AB7', bg: 'rgba(83,74,183,0.08)' },
  B1: { desc: 'Intermedio. Textos más largos, pasado, comparaciones.', emoji: '🌳', color: '#d97706', bg: 'rgba(217,119,6,0.08)' },
};

type CyclePhase = 'level' | 'text' | 'step1' | 'step2' | 'step3' | 'step4' | 'done';

// ─── Vocab highlight helper ───────────────────────────────────────────────────

function segmentText(korean: string, vocab: CycleText['vocab']) {
  type Seg = { text: string; vocabIdx?: number };
  const result: Seg[] = [];
  let remaining = korean;
  let pos = 0;

  while (remaining.length > 0) {
    let earliest = -1;
    let earliestLen = 0;
    let earliestIdx = -1;

    for (let i = 0; i < vocab.length; i++) {
      const w = vocab[i].word;
      const idx = remaining.indexOf(w);
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx;
        earliestLen = w.length;
        earliestIdx = i;
      }
    }

    if (earliest === -1) {
      result.push({ text: remaining });
      break;
    }

    if (earliest > 0) result.push({ text: remaining.slice(0, earliest) });
    result.push({ text: remaining.slice(earliest, earliest + earliestLen), vocabIdx: earliestIdx });
    remaining = remaining.slice(earliest + earliestLen);
    pos += earliest + earliestLen;
  }

  return result;
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function KoreanCycle({ addXp }: { addXp: (n: number) => void }) {
  const [phase, setPhase] = useState<CyclePhase>('level');
  const [nivel, setNivel]   = useState<Nivel | null>(null);
  const [textId, setTextId] = useState<string | null>(null);
  const [quizLevel, setQuizLevel] = useState<QuizLevel>('principiante');
  const [answers, setAnswers] = useState<(string | boolean | string[])[]>([]);
  const [score, setScore]   = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const currentText = CYCLE_TEXTS.find(t => t.id === textId) ?? null;
  const step = phase === 'step1' ? 1 : phase === 'step2' ? 2 : phase === 'step3' ? 3 : phase === 'step4' ? 4 : 0;

  function chooseLevel(n: Nivel) { setNivel(n); setPhase('text'); }
  function chooseText(id: string) { setTextId(id); setPhase('step1'); }
  function restart() { setPhase('level'); setNivel(null); setTextId(null); setAnswers([]); setScore(0); }

  const slideProps = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -24 },
    transition: { duration: 0.25, ease: 'easeOut' as const },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Intro banner */}
      {showIntro && phase === 'level' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg,rgba(83,74,183,0.1) 0%,rgba(225,29,72,0.06) 100%)',
            border: '1.5px solid rgba(83,74,183,0.2)', borderRadius: 16,
            padding: '1.25rem 1.5rem', position: 'relative',
          }}
        >
          <button onClick={() => setShowIntro(false)} style={{ position:'absolute',top:'0.75rem',right:'0.75rem', background:'none',border:'none',cursor:'pointer',fontSize:'1.1rem',color:'var(--muted)' }}>✕</button>
          <p style={{ margin:'0 0 0.6rem', fontWeight:800, fontSize:'1rem', color:'var(--ink)' }}>
            ¿Cómo funciona el Ciclo de Aprendizaje?
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:'0.5rem' }}>
            {Object.entries(STEP_COLORS).map(([n, c]) => (
              <div key={n} style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.82rem', color:'var(--ink)' }}>
                <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:22, height:22, borderRadius:'50%', background:c.main, color:'#fff', fontWeight:800, fontSize:'0.7rem', flexShrink:0 }}>{n}</span>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
          <p style={{ margin:'0.75rem 0 0', fontSize:'0.8rem', color:'var(--muted)', lineHeight:1.55 }}>
            Elige un texto, léelo, escúchalo, responde preguntas y graba tu voz. Al completar el ciclo ganas <strong style={{ color:'#534AB7' }}>+50 XP</strong>.
          </p>
        </motion.div>
      )}

      {/* Progress bar (only during steps) */}
      {step > 0 && <CycleProgressBar step={step} />}

      {/* Phase content */}
      <AnimatePresence mode="wait">
        {phase === 'level' && (
          <motion.div key="level" {...slideProps}>
            <LevelSelector onSelect={chooseLevel} />
          </motion.div>
        )}
        {phase === 'text' && nivel && (
          <motion.div key="text" {...slideProps}>
            <TextSelector nivel={nivel} onSelect={chooseText} onBack={() => setPhase('level')} />
          </motion.div>
        )}
        {phase === 'step1' && currentText && (
          <motion.div key="step1" {...slideProps}>
            <StepRead text={currentText} onNext={() => setPhase('step2')} />
          </motion.div>
        )}
        {phase === 'step2' && currentText && (
          <motion.div key="step2" {...slideProps}>
            <StepListen text={currentText} onNext={() => setPhase('step3')} />
          </motion.div>
        )}
        {phase === 'step3' && currentText && (
          <motion.div key="step3" {...slideProps}>
            <StepComprension
              text={currentText}
              quizLevel={quizLevel}
              setQuizLevel={setQuizLevel}
              onDone={(sc, ans) => { setScore(sc); setAnswers(ans); setPhase('step4'); }}
            />
          </motion.div>
        )}
        {phase === 'step4' && currentText && (
          <motion.div key="step4" {...slideProps}>
            <StepProduccion
              text={currentText}
              score={score}
              answers={answers}
              quizLevel={quizLevel}
              onDone={() => { addXp(50); setPhase('done'); }}
            />
          </motion.div>
        )}
        {phase === 'done' && currentText && (
          <motion.div key="done" {...slideProps}>
            <CompletionScreen text={currentText} score={score} onRestart={restart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function CycleProgressBar({ step }: { step: number }) {
  return (
    <div style={{ display:'flex', gap:'0.4rem', alignItems:'center' }}>
      {([1,2,3,4] as const).map(s => {
        const c = STEP_COLORS[s];
        const active = s === step;
        const done   = s < step;
        return (
          <div key={s} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'0.3rem' }}>
            <div style={{
              width:'100%', height: active ? 6 : 4, borderRadius:4,
              background: done ? c.main : active ? c.main : 'var(--line-soft)',
              transition:'all 0.3s',
              opacity: done || active ? 1 : 0.35,
            }} />
            <span style={{
              fontSize:'0.65rem', fontFamily:'var(--mono)', fontWeight:700,
              color: done || active ? c.main : 'var(--muted)',
              textTransform:'uppercase', letterSpacing:'0.05em',
              transition:'color 0.3s',
            }}>
              {done ? '✓' : s} {c.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Level selector ───────────────────────────────────────────────────────────

function LevelSelector({ onSelect }: { onSelect: (n: Nivel) => void }) {
  return (
    <div>
      <p className="eyebrow" style={{ margin:'0 0 0.5rem' }}><span className="ink-line" />Selecciona tu nivel</p>
      <h2 style={{ fontSize:'1.5rem', fontWeight:800, margin:'0 0 1.25rem', color:'var(--ink)' }}>¿Qué nivel de coreano tienes?</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'0.85rem' }}>
        {(['A1','A2','B1'] as Nivel[]).map(n => {
          const info = NIVEL_INFO[n];
          const texts = CYCLE_TEXTS.filter(t => t.nivel === n);
          return (
            <button
              key={n}
              onClick={() => onSelect(n)}
              style={{
                display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'0.5rem',
                padding:'1.25rem', borderRadius:16, textAlign:'left',
                border:`2px solid ${info.color}44`, background: info.bg,
                cursor:'pointer', fontFamily:'inherit', transition:'all 0.18s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${info.color}22`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
            >
              <div style={{ fontSize:'2rem' }}>{info.emoji}</div>
              <div style={{ fontSize:'1.5rem', fontWeight:900, color: info.color, fontFamily:'var(--mono)' }}>{n}</div>
              <div style={{ fontSize:'0.85rem', color:'var(--ink)', fontWeight:700 }}>{
                n === 'A1' ? 'Principiante' : n === 'A2' ? 'Básico' : 'Intermedio'
              }</div>
              <div style={{ fontSize:'0.78rem', color:'var(--muted)', lineHeight:1.5 }}>{info.desc}</div>
              <div style={{ fontSize:'0.72rem', color: info.color, fontFamily:'var(--mono)', fontWeight:700, marginTop:'0.25rem' }}>
                {texts.length} textos disponibles →
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Text selector ────────────────────────────────────────────────────────────

function TextSelector({ nivel, onSelect, onBack }: { nivel: Nivel; onSelect: (id: string) => void; onBack: () => void }) {
  const texts = CYCLE_TEXTS.filter(t => t.nivel === nivel);
  const info  = NIVEL_INFO[nivel];

  return (
    <div>
      <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ marginBottom:'1rem', fontSize:'0.82rem' }}>← Volver</button>
      <p className="eyebrow" style={{ margin:'0 0 0.4rem' }}><span className="ink-line" />{info.emoji} Nivel {nivel}</p>
      <h2 style={{ fontSize:'1.5rem', fontWeight:800, margin:'0 0 1.25rem', color:'var(--ink)' }}>Elige un texto para practicar</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
        {texts.map((t, i) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{
              display:'flex', alignItems:'center', gap:'1rem', padding:'1.1rem 1.25rem',
              borderRadius:14, border:`1.5px solid ${info.color}33`, background:'var(--bg)',
              cursor:'pointer', fontFamily:'inherit', textAlign:'left', transition:'all 0.18s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = info.color; (e.currentTarget as HTMLElement).style.background = info.bg; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${info.color}33`; (e.currentTarget as HTMLElement).style.background = 'var(--bg)'; }}
          >
            <div style={{
              width:40, height:40, borderRadius:10, background: info.bg, border:`1.5px solid ${info.color}44`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.1rem', fontWeight:900, color: info.color, fontFamily:'var(--mono)', flexShrink:0,
            }}>{i+1}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:800, color:'var(--ink)', fontSize:'0.95rem' }}>{t.titulo}</div>
              <div style={{ color:info.color, fontWeight:700, fontSize:'0.78rem', fontFamily:'var(--mono)' }}>{t.tituloKo}</div>
              <div style={{ color:'var(--muted)', fontSize:'0.78rem', marginTop:'0.2rem', lineHeight:1.4, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                {t.korean.slice(0, 60)}…
              </div>
            </div>
            <span style={{ color:'var(--muted)', fontSize:'1.2rem', flexShrink:0 }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 1: Read ─────────────────────────────────────────────────────────────

function StepRead({ text, onNext }: { text: CycleText; onNext: () => void }) {
  const [activeVocab, setActiveVocab] = useState<number | null>(null);
  const segments = segmentText(text.korean, text.vocab);
  const c = STEP_COLORS[1];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <StepHeader step={1} titulo={text.titulo} tituloKo={text.tituloKo} />

      {/* Korean text */}
      <div className="wl-card" style={{ padding:'1.75rem', border:`1.5px solid ${c.border}` }}>
        <p className="eyebrow" style={{ margin:'0 0 1rem' }}><span className="ink-line" />Texto en coreano — lee con atención</p>
        <p style={{ fontSize:'1.45rem', lineHeight:2.1, margin:'0 0 1rem', color:'var(--ink)', letterSpacing:'0.01em' }}>
          {segments.map((seg, i) =>
            seg.vocabIdx !== undefined ? (
              <span
                key={i}
                onClick={() => setActiveVocab(activeVocab === seg.vocabIdx ? null : seg.vocabIdx!)}
                style={{
                  cursor:'pointer', position:'relative',
                  background: activeVocab === seg.vocabIdx ? `${c.main}22` : `${c.main}11`,
                  borderBottom: `2px solid ${c.main}`,
                  borderRadius:'3px', padding:'0 2px',
                  color: c.main, fontWeight:700,
                  transition:'background 0.15s',
                }}
                title={text.vocab[seg.vocabIdx!].translation}
              >
                {seg.text}
                {activeVocab === seg.vocabIdx && (
                  <span style={{
                    position:'absolute', bottom:'calc(100% + 6px)', left:'50%', transform:'translateX(-50%)',
                    background:'var(--ink)', color:'var(--bg)', fontSize:'0.72rem', fontWeight:700,
                    padding:'0.3rem 0.6rem', borderRadius:8, whiteSpace:'nowrap', zIndex:10,
                    fontFamily:'var(--mono)',
                    boxShadow:'0 4px 12px rgba(0,0,0,0.2)',
                  }}>
                    {text.vocab[seg.vocabIdx!].translation}
                  </span>
                )}
              </span>
            ) : (
              <span key={i}>{seg.text}</span>
            )
          )}
        </p>
        <p style={{ fontSize:'0.75rem', color:'var(--muted)', margin:0, fontFamily:'var(--mono)' }}>
          Toca las palabras subrayadas para ver su traducción
        </p>
      </div>

      {/* Vocab chips */}
      <div className="wl-card" style={{ padding:'1.25rem' }}>
        <p className="eyebrow" style={{ margin:'0 0 0.85rem' }}><span className="ink-line" />Vocabulario clave (5 palabras)</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
          {text.vocab.map((v, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'0.6rem 0.9rem', borderRadius:10,
              background: activeVocab === i ? `${c.main}12` : 'var(--bg-2,rgba(0,0,0,0.02))',
              border:`1px solid ${activeVocab === i ? c.main+'44' : 'var(--line-soft)'}`,
              cursor:'pointer', transition:'all 0.15s',
            }}
              onClick={() => setActiveVocab(activeVocab === i ? null : i)}
            >
              <span style={{ fontWeight:800, fontSize:'1.05rem', color: c.main }}>{v.word}</span>
              <span style={{ color:'var(--muted)', fontSize:'0.85rem' }}>{v.translation}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onNext} className="btn btn-sm" style={{ background:c.main, borderColor:c.main, fontSize:'0.95rem', padding:'0.85rem' }}>
        Listo, siguiente — Escuchar →
      </button>
    </div>
  );
}

// ─── Step 2: Listen ───────────────────────────────────────────────────────────

function StepListen({ text, onNext }: { text: CycleText; onNext: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'normal' | 'slow'>('normal');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [customAudio, setCustomAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileRef  = useRef<HTMLInputElement | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const c = STEP_COLORS[2];

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.speechSynthesis) setSpeechSupported(false);
    return () => { if (typeof window !== 'undefined') window.speechSynthesis?.cancel(); };
  }, []);

  function playSpeech(slow: boolean) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.korean);
    u.lang = 'ko-KR';
    u.rate = slow ? 0.6 : 0.9;
    u.onstart = () => setIsPlaying(true);
    u.onend   = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    utterRef.current = u;
    window.speechSynthesis.speak(u);
    setMode(slow ? 'slow' : 'normal');
  }

  function stopSpeech() {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setCustomAudio(url);
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <StepHeader step={2} titulo={text.titulo} tituloKo={text.tituloKo} />

      {/* Korean text (same text visible while listening) */}
      <div className="wl-card" style={{ padding:'1.75rem', border:`1.5px solid ${c.border}` }}>
        <p className="eyebrow" style={{ margin:'0 0 1rem' }}><span className="ink-line" />Escucha mientras lees</p>
        <p style={{ fontSize:'1.35rem', lineHeight:2.1, margin:'0', color:'var(--ink)' }}>
          {text.korean}
        </p>
      </div>

      {/* Audio controls */}
      <div className="wl-card" style={{ padding:'1.5rem' }}>
        <p className="eyebrow" style={{ margin:'0 0 1rem' }}><span className="ink-line" />Modo de escucha</p>

        {!speechSupported && (
          <div style={{ padding:'0.85rem', borderRadius:10, background:'rgba(217,119,6,0.08)', border:'1px solid rgba(217,119,6,0.25)', fontSize:'0.85rem', color:'#d97706', marginBottom:'1rem' }}>
            ⚠️ Tu navegador no soporta síntesis de voz. Sube un archivo de audio para escuchar el texto.
          </div>
        )}

        {speechSupported && (
          <div style={{ display:'flex', gap:'0.6rem', flexWrap:'wrap', marginBottom:'1.25rem' }}>
            <button
              onClick={() => isPlaying && mode === 'normal' ? stopSpeech() : playSpeech(false)}
              style={{
                display:'flex', alignItems:'center', gap:'0.5rem',
                padding:'0.75rem 1.25rem', borderRadius:10,
                background: isPlaying && mode === 'normal' ? c.main : 'var(--bg)',
                border:`2px solid ${c.main}`,
                color: isPlaying && mode === 'normal' ? '#fff' : c.main,
                fontWeight:700, fontSize:'0.9rem', cursor:'pointer', fontFamily:'inherit', transition:'all 0.18s',
              }}
            >
              {isPlaying && mode === 'normal' ? '⏸ Pausar' : '▶ Velocidad normal'}
            </button>
            <button
              onClick={() => isPlaying && mode === 'slow' ? stopSpeech() : playSpeech(true)}
              style={{
                display:'flex', alignItems:'center', gap:'0.5rem',
                padding:'0.75rem 1.25rem', borderRadius:10,
                background: isPlaying && mode === 'slow' ? c.main : 'var(--bg)',
                border:`2px solid ${c.main}44`,
                color: isPlaying && mode === 'slow' ? '#fff' : c.main,
                fontWeight:700, fontSize:'0.9rem', cursor:'pointer', fontFamily:'inherit', transition:'all 0.18s',
              }}
            >
              {isPlaying && mode === 'slow' ? '⏸ Pausar' : '🐢 Velocidad lenta'}
            </button>
          </div>
        )}

        {/* Custom audio upload */}
        <div style={{ borderTop:'1px solid var(--line-soft)', paddingTop:'1.1rem' }}>
          <p style={{ margin:'0 0 0.6rem', fontSize:'0.82rem', color:'var(--muted)' }}>
            ¿Tienes un audio propio del texto? Súbelo aquí:
          </p>
          <input ref={fileRef} type="file" accept="audio/*" onChange={handleFileUpload} style={{ display:'none' }} />
          <button
            onClick={() => fileRef.current?.click()}
            className="btn btn-ghost btn-sm"
            style={{ fontSize:'0.82rem' }}
          >
            📁 Subir audio
          </button>
          {customAudio && (
            <div style={{ marginTop:'0.85rem' }}>
              <audio ref={audioRef} controls src={customAudio} style={{ width:'100%', borderRadius:8 }} />
            </div>
          )}
        </div>
      </div>

      {/* Playing indicator */}
      {isPlaying && (
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          style={{
            display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.85rem 1.1rem',
            borderRadius:12, background: c.light, border:`1px solid ${c.border}`,
          }}
        >
          <SoundWave color={c.main} />
          <span style={{ fontSize:'0.85rem', color: c.main, fontWeight:700 }}>
            Reproduciendo en {mode === 'slow' ? 'velocidad lenta' : 'velocidad normal'}…
          </span>
        </motion.div>
      )}

      <button onClick={onNext} className="btn btn-sm" style={{ background:c.main, borderColor:c.main, fontSize:'0.95rem', padding:'0.85rem' }}>
        Entendido, continuar — Comprensión →
      </button>
    </div>
  );
}

// ─── Sound wave indicator ─────────────────────────────────────────────────────

function SoundWave({ color }: { color: string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:3, height:20 }}>
      {[1,2,3,4,5].map(i => (
        <motion.div
          key={i}
          animate={{ height: [4, 16, 4] }}
          transition={{ duration:0.6, repeat:Infinity, delay: i * 0.1, ease:'easeInOut' }}
          style={{ width:3, background: color, borderRadius:3 }}
        />
      ))}
    </div>
  );
}

// ─── Step 3: Comprensión ──────────────────────────────────────────────────────

type AnswerState = (string | boolean | string[])[];

function StepComprension({
  text, quizLevel, setQuizLevel, onDone
}: {
  text: CycleText;
  quizLevel: QuizLevel;
  setQuizLevel: (q: QuizLevel) => void;
  onDone: (score: number, answers: AnswerState) => void;
}) {
  const questions = text.questions[quizLevel];
  const [answers, setAnswers] = useState<AnswerState>(Array(4).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore]   = useState(0);
  const [orderState, setOrderState] = useState<Record<number, string[]>>({});
  const c = STEP_COLORS[3];

  function reset() {
    setAnswers(Array(4).fill(null));
    setSubmitted(false);
    setScore(0);
    setOrderState({});
  }

  function handleQuizLevelChange(ql: QuizLevel) {
    setQuizLevel(ql);
    reset();
  }

  function setAnswer(idx: number, val: string | boolean | string[]) {
    setAnswers(prev => { const a = [...prev]; a[idx] = val; return a; });
  }

  function handleSubmit() {
    let sc = 0;
    questions.forEach((q, i) => {
      if (q.type === 'multiple' && answers[i] === q.correct) sc++;
      if (q.type === 'truefalse' && answers[i] === q.correct) sc++;
      if (q.type === 'order') {
        const ord = orderState[i] ?? [];
        if (JSON.stringify(ord) === JSON.stringify(q.correct)) sc++;
      }
      if (q.type === 'open') sc++; // always award point for open questions (effort)
    });
    setScore(sc);
    setSubmitted(true);
  }

  const allAnswered = questions.every((q, i) => {
    if (q.type === 'multiple')  return answers[i] !== null;
    if (q.type === 'truefalse') return answers[i] !== null;
    if (q.type === 'order')     return (orderState[i]?.length ?? 0) === q.words.length;
    if (q.type === 'open')      return typeof answers[i] === 'string' && (answers[i] as string).trim().length > 0;
    return false;
  });

  const feedback = score === 4 ? '¡Perfecto! Dominas este texto.' : score >= 3 ? '¡Muy bien! Casi perfecto.' : score >= 2 ? 'Bien. Sigue practicando.' : 'Sigue intentando — la práctica hace al maestro.';

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <StepHeader step={3} titulo={text.titulo} tituloKo={text.tituloKo} />

      {/* Level selector */}
      <div className="wl-card" style={{ padding:'1.25rem' }}>
        <p style={{ margin:'0 0 0.85rem', fontSize:'0.85rem', fontWeight:700, color:'var(--ink)' }}>Nivel de preguntas:</p>
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
          {(['principiante','intermedio','avanzado'] as QuizLevel[]).map(ql => (
            <button
              key={ql}
              onClick={() => handleQuizLevelChange(ql)}
              style={{
                padding:'0.5rem 1rem', borderRadius:10,
                background: quizLevel === ql ? c.main : 'var(--bg)',
                border:`2px solid ${quizLevel === ql ? c.main : 'var(--line-soft)'}`,
                color: quizLevel === ql ? '#fff' : 'var(--ink)',
                fontWeight:700, fontSize:'0.82rem', cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s',
                textTransform:'capitalize',
              }}
            >
              {ql === 'principiante' ? '🌱 Principiante' : ql === 'intermedio' ? '🌿 Intermedio' : '🌳 Avanzado'}
            </button>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
        {questions.map((q, i) => (
          <QuestionCard
            key={`${quizLevel}-${i}`}
            question={q}
            idx={i}
            answer={answers[i]}
            orderState={orderState[i] ?? []}
            setAnswer={(v) => setAnswer(i, v)}
            setOrder={(words) => setOrderState(prev => ({ ...prev, [i]: words }))}
            submitted={submitted}
            color={c.main}
          />
        ))}
      </div>

      {/* Submit / Results */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="btn btn-sm"
          style={{ background:c.main, borderColor:c.main, fontSize:'0.95rem', padding:'0.85rem', opacity: allAnswered ? 1 : 0.45 }}
        >
          Verificar respuestas →
        </button>
      ) : (
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          <div style={{
            padding:'1.25rem', borderRadius:14,
            background: score >= 3 ? 'rgba(5,150,105,0.08)' : 'rgba(217,119,6,0.08)',
            border:`1.5px solid ${score >= 3 ? '#05966933' : '#d9770633'}`,
            display:'flex', alignItems:'center', gap:'1rem',
          }}>
            <div style={{ fontSize:'2.5rem', fontWeight:900, color: score >= 3 ? '#059669' : c.main }}>{score}/4</div>
            <div>
              <div style={{ fontWeight:800, color:'var(--ink)', marginBottom:'0.2rem' }}>{feedback}</div>
              {quizLevel !== 'avanzado' && <div style={{ fontSize:'0.82rem', color:'var(--muted)' }}>Las preguntas abiertas siempre suman punto.</div>}
            </div>
          </div>
          <button onClick={() => onDone(score, answers)} className="btn btn-sm" style={{ background:c.main, borderColor:c.main, fontSize:'0.95rem', padding:'0.85rem' }}>
            Siguiente: Grabar audio →
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ─── Question card ────────────────────────────────────────────────────────────

function QuestionCard({
  question, idx, answer, orderState, setAnswer, setOrder, submitted, color,
}: {
  question: Question; idx: number; answer: string | boolean | string[] | null;
  orderState: string[]; setAnswer: (v: string | boolean | string[]) => void;
  setOrder: (w: string[]) => void; submitted: boolean; color: string;
}) {
  const num = idx + 1;

  return (
    <div className="wl-card" style={{ padding:'1.25rem', borderLeft:`3px solid ${color}` }}>
      <p style={{ margin:'0 0 0.85rem', fontWeight:700, fontSize:'0.9rem', color:'var(--ink)', lineHeight:1.5 }}>
        <span style={{ color, fontFamily:'var(--mono)', marginRight:'0.4rem' }}>{num}.</span>
        {question.question}
      </p>

      {question.type === 'multiple' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem' }}>
          {question.options.map(opt => {
            const chosen  = answer === opt;
            const correct = question.correct === opt;
            let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', col = 'var(--ink)';
            if (submitted) {
              if (correct) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; col = '#059669'; }
              else if (chosen) { bg = 'rgba(220,38,38,0.08)'; border = '1.5px solid #dc2626'; col = '#dc2626'; }
            } else if (chosen) { bg = `${color}12`; border = `1.5px solid ${color}`; col = color; }
            return (
              <button key={opt} onClick={() => !submitted && setAnswer(opt)}
                style={{ padding:'0.65rem 0.85rem', borderRadius:10, border, background:bg, color:col, fontWeight:600, fontSize:'0.85rem', cursor: submitted ? 'default' : 'pointer', fontFamily:'inherit', textAlign:'left', transition:'all 0.15s' }}>
                {submitted && correct && '✓ '}{submitted && chosen && !correct && '✗ '}{opt}
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'truefalse' && (
        <div style={{ display:'flex', gap:'0.5rem' }}>
          {[true, false].map(val => {
            const chosen  = answer === val;
            const correct = question.correct === val;
            let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', col = 'var(--ink)';
            if (submitted) {
              if (correct) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; col = '#059669'; }
              else if (chosen) { bg = 'rgba(220,38,38,0.08)'; border = '1.5px solid #dc2626'; col = '#dc2626'; }
            } else if (chosen) { bg = `${color}12`; border = `1.5px solid ${color}`; col = color; }
            return (
              <button key={String(val)} onClick={() => !submitted && setAnswer(val)}
                style={{ flex:1, padding:'0.65rem', borderRadius:10, border, background:bg, color:col, fontWeight:700, fontSize:'0.9rem', cursor: submitted ? 'default' : 'pointer', fontFamily:'inherit', transition:'all 0.15s' }}>
                {val ? '✓ Verdadero' : '✗ Falso'}
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'order' && (
        <OrderQuestion words={question.words} correct={question.correct} orderState={orderState} setOrder={setOrder} submitted={submitted} color={color} />
      )}

      {question.type === 'open' && (
        <textarea
          placeholder="Escribe tu respuesta aquí…"
          value={typeof answer === 'string' ? answer : ''}
          onChange={e => setAnswer(e.target.value)}
          disabled={submitted}
          rows={3}
          style={{
            width:'100%', padding:'0.75rem', borderRadius:10, fontSize:'0.9rem',
            border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)',
            fontFamily:'inherit', resize:'vertical', outline:'none',
            boxSizing:'border-box',
          }}
        />
      )}
    </div>
  );
}

// ─── Order question ───────────────────────────────────────────────────────────

function OrderQuestion({ words, correct, orderState, setOrder, submitted, color }: {
  words: string[]; correct: string[]; orderState: string[];
  setOrder: (w: string[]) => void; submitted: boolean; color: string;
}) {
  const placed    = orderState;
  const remaining = words.filter(w => !placed.includes(w));
  const isCorrect = JSON.stringify(placed) === JSON.stringify(correct);

  function place(w: string)  { if (!placed.includes(w)) setOrder([...placed, w]); }
  function remove(i: number) { setOrder(placed.filter((_, j) => j !== i)); }

  return (
    <div>
      {/* Drop zone */}
      <div style={{
        minHeight:44, border:`2px dashed ${color}44`, borderRadius:10, padding:'0.5rem 0.75rem',
        marginBottom:'0.6rem', display:'flex', flexWrap:'wrap', gap:'0.4rem', alignItems:'center',
        background: placed.length > 0 ? `${color}06` : 'transparent',
      }}>
        {placed.length === 0 && <span style={{ color:'var(--muted)', fontSize:'0.8rem', fontStyle:'italic' }}>Haz clic en las palabras de abajo para ordenarlas aquí</span>}
        {placed.map((w, i) => (
          <button key={i} onClick={() => !submitted && remove(i)}
            style={{
              padding:'0.35rem 0.7rem', borderRadius:8, background: color, color:'#fff',
              fontWeight:700, fontSize:'0.9rem', cursor: submitted ? 'default' : 'pointer', fontFamily:'inherit',
              border:'none',
            }}>
            {w} {!submitted && '×'}
          </button>
        ))}
      </div>
      {/* Available words */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
        {remaining.map(w => (
          <button key={w} onClick={() => !submitted && place(w)}
            style={{
              padding:'0.35rem 0.7rem', borderRadius:8, background:'var(--bg)',
              border:`1.5px solid ${color}55`, color: color,
              fontWeight:700, fontSize:'0.9rem', cursor: submitted ? 'default' : 'pointer', fontFamily:'inherit',
              transition:'all 0.15s',
            }}>
            {w}
          </button>
        ))}
      </div>
      {submitted && (
        <p style={{ margin:'0.5rem 0 0', fontSize:'0.8rem', color: isCorrect ? '#059669' : '#dc2626', fontWeight:700 }}>
          {isCorrect ? '✓ ¡Correcto!' : `✗ Orden correcto: ${correct.join(' ')}`}
        </p>
      )}
    </div>
  );
}

// ─── Step 4: Producción oral ──────────────────────────────────────────────────

function StepProduccion({
  text, score, answers, quizLevel, onDone,
}: {
  text: CycleText; score: number; answers: AnswerState; quizLevel: QuizLevel; onDone: () => void;
}) {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl,  setAudioUrl]  = useState<string | null>(null);
  const [seconds,   setSeconds]   = useState(0);
  const [sending,   setSending]   = useState(false);
  const [sent,      setSent]      = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [micError,  setMicError]  = useState<string | null>(null);

  const mediaRef    = useRef<MediaRecorder | null>(null);
  const chunksRef   = useRef<Blob[]>([]);
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef   = useRef<HTMLCanvasElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animRef     = useRef<number>(0);
  const streamRef   = useRef<MediaStream | null>(null);

  const c = STEP_COLORS[4];

  useEffect(() => () => { stopAll(); }, []);

  function stopAll() {
    mediaRef.current?.stop();
    streamRef.current?.getTracks().forEach(t => t.stop());
    if (timerRef.current) clearInterval(timerRef.current);
    cancelAnimationFrame(animRef.current);
  }

  async function startRecording() {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Waveform analyser
      const audioCtx = new AudioContext();
      const source   = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;
      drawWaveform();

      // Determine MIME type
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4';

      const mr = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stopAll();
        setRecording(false);
        cancelAnimationFrame(animRef.current);
      };
      mr.start(100);
      mediaRef.current = mr;

      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => {
        setSeconds(s => {
          if (s >= 119) { mr.stop(); clearInterval(timerRef.current!); return 120; }
          return s + 1;
        });
      }, 1000);
    } catch {
      setMicError('No se pudo acceder al micrófono. Verifica los permisos del navegador.');
    }
  }

  function drawWaveform() {
    const canvas   = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const ctx  = canvas.getContext('2d');
    if (!ctx) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barW = canvas.width / data.length;
    data.forEach((val, i) => {
      const h = (val / 255) * canvas.height;
      ctx.fillStyle = c.main;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.roundRect(i * barW, canvas.height - h, barW - 1, h, 2);
      ctx.fill();
    });
    animRef.current = requestAnimationFrame(drawWaveform);
  }

  function stopRecording() {
    mediaRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
  }

  async function submitAudio() {
    if (!audioBlob || !username.trim()) return;
    setSending(true);
    setError(null);
    try {
      const fd = new FormData();
      const ext = audioBlob.type.includes('mp4') ? 'mp4' : 'webm';
      fd.append('audio', audioBlob, `recording.${ext}`);
      fd.append('username', username.trim());
      fd.append('email', email.trim());
      fd.append('nivel', text.nivel);
      fd.append('texto_id', text.id);
      fd.append('quiz_level', quizLevel);
      fd.append('respuestas', JSON.stringify(answers));
      const res  = await fetch('/api/practica/submit-audio', { method:'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Error al enviar');
      setSent(true);
      onDone();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2,'0');
  const ss = String(seconds % 60).padStart(2,'0');

  if (sent) {
    return (
      <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
        style={{ padding:'2rem', textAlign:'center', borderRadius:20, background:`${c.main}0a`, border:`2px solid ${c.main}33` }}>
        <div style={{ fontSize:'3rem', marginBottom:'0.5rem' }}>🎉</div>
        <h3 style={{ fontWeight:900, fontSize:'1.4rem', color: c.main, margin:'0 0 0.5rem' }}>¡Audio enviado!</h3>
        <p style={{ color:'var(--muted)', margin:0 }}>Gracias <strong style={{ color:'var(--ink)' }}>{username}</strong>. Nuestro equipo revisará tu pronunciación.</p>
        <div style={{ marginTop:'1rem', padding:'0.75rem', borderRadius:10, background:'rgba(83,74,183,0.08)', border:'1px solid rgba(83,74,183,0.2)' }}>
          <span style={{ color:'#534AB7', fontWeight:800, fontSize:'1.1rem' }}>+50 XP desbloqueados</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <StepHeader step={4} titulo={text.titulo} tituloKo={text.tituloKo} />

      <div className="wl-card" style={{ padding:'1.5rem', border:`1.5px solid ${c.border}` }}>
        <p className="eyebrow" style={{ margin:'0 0 0.5rem' }}><span className="ink-line" />Tu turno</p>
        <p style={{ margin:'0 0 1.25rem', fontSize:'0.9rem', color:'var(--ink)', lineHeight:1.65 }}>
          Graba un audio <strong>resumiendo lo que entendiste</strong> del texto. Puedes usar las palabras del vocabulario. Habla en coreano.
        </p>

        {/* User info form */}
        <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem', marginBottom:'1.25rem' }}>
          <input
            value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Tu nombre de usuario *"
            style={{ padding:'0.7rem 0.9rem', borderRadius:10, border:`1.5px solid ${username ? c.main+'66' : 'var(--line-soft)'}`, background:'var(--bg)', color:'var(--ink)', fontSize:'0.9rem', fontFamily:'inherit', outline:'none' }}
          />
          <input
            value={email} onChange={e => setEmail(e.target.value)}
            type="email" placeholder="Email (opcional — para recibir feedback)"
            style={{ padding:'0.7rem 0.9rem', borderRadius:10, border:'1.5px solid var(--line-soft)', background:'var(--bg)', color:'var(--ink)', fontSize:'0.9rem', fontFamily:'inherit', outline:'none' }}
          />
        </div>

        {/* Recording UI */}
        {micError && (
          <div style={{ padding:'0.75rem', borderRadius:10, background:'rgba(220,38,38,0.08)', border:'1px solid rgba(220,38,38,0.25)', fontSize:'0.85rem', color:'#dc2626', marginBottom:'0.85rem' }}>
            {micError}
          </div>
        )}

        {/* Waveform canvas */}
        {recording && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
            style={{ marginBottom:'0.85rem', borderRadius:12, overflow:'hidden', border:`1px solid ${c.main}33`, padding:'0.5rem', background:`${c.main}06` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.4rem', padding:'0 0.25rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#e11d48', display:'inline-block', animation:'pulse 1s infinite' }} />
                <span style={{ fontSize:'0.78rem', fontWeight:700, color: c.main, fontFamily:'var(--mono)' }}>GRABANDO</span>
              </div>
              <span style={{ fontSize:'0.85rem', fontWeight:800, color: c.main, fontFamily:'var(--mono)' }}>{mm}:{ss} / 02:00</span>
            </div>
            <canvas ref={canvasRef} width={600} height={60} style={{ width:'100%', height:60, borderRadius:8 }} />
          </motion.div>
        )}

        {/* Record buttons */}
        <div style={{ display:'flex', gap:'0.6rem', flexWrap:'wrap', marginBottom: audioUrl ? '1rem' : 0 }}>
          {!recording && !audioUrl && (
            <button
              onClick={startRecording}
              disabled={!username.trim()}
              style={{
                display:'flex', alignItems:'center', gap:'0.5rem',
                padding:'0.85rem 1.5rem', borderRadius:12,
                background: username.trim() ? c.main : 'var(--line-soft)',
                border:'none', color: username.trim() ? '#fff' : 'var(--muted)',
                fontWeight:800, fontSize:'0.95rem', cursor: username.trim() ? 'pointer' : 'default', fontFamily:'inherit',
                transition:'all 0.2s',
              }}
            >
              🎙️ Iniciar grabación
            </button>
          )}
          {recording && (
            <button onClick={stopRecording}
              style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.85rem 1.5rem', borderRadius:12, background:'#dc2626', border:'none', color:'#fff', fontWeight:800, fontSize:'0.95rem', cursor:'pointer', fontFamily:'inherit' }}>
              ⏹️ Detener
            </button>
          )}
          {audioUrl && !recording && (
            <button onClick={() => { setAudioUrl(null); setAudioBlob(null); setSeconds(0); }}
              className="btn btn-ghost btn-sm" style={{ fontSize:'0.85rem' }}>
              🔁 Volver a grabar
            </button>
          )}
        </div>

        {/* Preview */}
        {audioUrl && (
          <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:'1rem' }}>
            <p style={{ margin:'0 0 0.5rem', fontSize:'0.82rem', color:'var(--muted)' }}>Vista previa de tu grabación:</p>
            <audio controls src={audioUrl} style={{ width:'100%', borderRadius:8 }} />
          </motion.div>
        )}

        {/* Submit */}
        {audioUrl && (
          <button
            onClick={submitAudio}
            disabled={sending || !username.trim()}
            style={{
              width:'100%', padding:'0.9rem', borderRadius:12,
              background: sending ? 'var(--line-soft)' : c.main,
              border:'none', color: sending ? 'var(--muted)' : '#fff',
              fontWeight:800, fontSize:'0.95rem', cursor: sending ? 'default' : 'pointer', fontFamily:'inherit',
              transition:'all 0.2s',
            }}
          >
            {sending ? '⏳ Enviando…' : '✅ Enviar audio'}
          </button>
        )}

        {error && (
          <p style={{ margin:'0.75rem 0 0', fontSize:'0.85rem', color:'#dc2626', fontWeight:600 }}>
            Error: {error}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Completion screen ────────────────────────────────────────────────────────

function CompletionScreen({ text, score, onRestart }: { text: CycleText; score: number; onRestart: () => void }) {
  return (
    <motion.div initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
      style={{ display:'flex', flexDirection:'column', gap:'1rem', textAlign:'center', padding:'1rem 0' }}>
      <div style={{ fontSize:'4rem' }}>🏆</div>
      <h2 style={{ fontWeight:900, fontSize:'1.8rem', margin:0, color:'var(--ink)' }}>¡Ciclo completado!</h2>
      <p style={{ color:'var(--muted)', margin:0, fontSize:'1rem' }}>
        Terminaste el ciclo de <strong style={{ color:'var(--ink)' }}>{text.titulo}</strong> ({text.nivel})
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', maxWidth:400, margin:'0 auto', width:'100%' }}>
        <div style={{ padding:'1rem', borderRadius:14, background:'rgba(83,74,183,0.08)', border:'1px solid rgba(83,74,183,0.2)' }}>
          <div style={{ fontSize:'2rem', fontWeight:900, color:'#534AB7' }}>+50</div>
          <div style={{ fontSize:'0.78rem', color:'var(--muted)', fontFamily:'var(--mono)' }}>XP GANADOS</div>
        </div>
        <div style={{ padding:'1rem', borderRadius:14, background:'rgba(5,150,105,0.08)', border:'1px solid rgba(5,150,105,0.2)' }}>
          <div style={{ fontSize:'2rem', fontWeight:900, color:'#059669' }}>{score}/4</div>
          <div style={{ fontSize:'0.78rem', color:'var(--muted)', fontFamily:'var(--mono)' }}>COMPRENSIÓN</div>
        </div>
      </div>
      <button onClick={onRestart} className="btn btn-sm" style={{ fontSize:'0.95rem', padding:'0.85rem', maxWidth:300, margin:'0 auto' }}>
        Practicar otro texto →
      </button>
    </motion.div>
  );
}

// ─── Step header ──────────────────────────────────────────────────────────────

function StepHeader({ step, titulo, tituloKo }: { step: 1|2|3|4; titulo: string; tituloKo: string }) {
  const c = STEP_COLORS[step];
  const labels = ['', 'Leer el texto', 'Escuchar el texto', 'Preguntas de comprensión', 'Producción oral'];
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.85rem' }}>
      <div style={{
        width:44, height:44, borderRadius:12, background: c.main, color:'#fff',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.3rem', fontWeight:900, flexShrink:0,
      }}>{step}</div>
      <div>
        <div style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.08em', color: c.main, fontWeight:800 }}>
          Paso {step} — {labels[step]}
        </div>
        <div style={{ fontWeight:800, color:'var(--ink)', fontSize:'1rem' }}>
          {titulo} <span style={{ color: c.main, fontFamily:'var(--mono)', fontSize:'0.85rem' }}>({tituloKo})</span>
        </div>
      </div>
    </div>
  );
}
