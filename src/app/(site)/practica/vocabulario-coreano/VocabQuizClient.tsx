'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';

// ── Quiz data ─────────────────────────────────────────────────────────────────

const WA_NUMBER = '573005004253';

const QUIZ_ITEMS = [
  {
    id: 'jip',
    image: '/assets/korean/step002/kr_step002_jip_home_v1.png',
    audio: '/assets/korean/step002/audio/audio_jip.mp3',
    korean: '집',
    meaning: 'casa',
    distractors: ['학교', '어디', '오늘'],
  },
  {
    id: 'hakgyo',
    image: '/assets/korean/step002/kr_step002_hakgyo_school_exit_v1.png',
    audio: '/assets/korean/step002/audio/audio_hakgyo.mp3',
    korean: '학교',
    meaning: 'escuela',
    distractors: ['집', '글자', '어제'],
  },
  {
    id: 'eodi',
    image: '/assets/korean/step002/kr_step002_eodi_conversation_v1.png',
    audio: '/assets/korean/step002/audio/audio_eodi.mp3',
    korean: '어디',
    meaning: '¿dónde?',
    distractors: ['뭐', '나', '조금'],
  },
  {
    id: 'oneul',
    image: '/assets/korean/step002/kr_step002_oneul_today_sign_v1.png',
    audio: '/assets/korean/step002/audio/audio_oneul.mp3',
    korean: '오늘',
    meaning: 'hoy',
    distractors: ['어제', '이제', '가요'],
  },
  {
    id: 'eoje',
    image: '/assets/korean/step002/kr_step002_eoje_yesterday_sign_v1.png',
    audio: '/assets/korean/step002/audio/audio_eoje.mp3',
    korean: '어제',
    meaning: 'ayer',
    distractors: ['오늘', '이제', '보여요'],
  },
  {
    id: 'geulja',
    image: '/assets/korean/step002/kr_step002_geulja_signs_v1.png',
    audio: '/assets/korean/step002/audio/audio_geulja.mp3',
    korean: '글자',
    meaning: 'letra / carácter',
    distractors: ['집', '학교', '뭐'],
  },
  {
    id: 'gayo',
    image: '/assets/korean/step002/kr_step002_gayo_crosswalk_v1.png',
    audio: '/assets/korean/step002/audio/audio_gayo.mp3',
    korean: '가요',
    meaning: 'va / voy',
    distractors: ['보여요', '조금', '너'],
  },
  {
    id: 'jeo',
    image: '/assets/korean/step002/kr_step002_jeo_me_formal_v1.png',
    audio: '/assets/korean/step002/audio/audio_jeoneun.mp3',
    korean: '저',
    meaning: 'yo (formal)',
    distractors: ['나', '너', '어디'],
  },
  {
    id: 'na',
    image: '/assets/korean/step002/kr_step002_na_me_v1.png',
    audio: '/assets/korean/step002/audio/audio_na.mp3',
    korean: '나',
    meaning: 'yo (informal)',
    distractors: ['저', '너', '뭐'],
  },
  {
    id: 'neo',
    image: '/assets/korean/step002/kr_step002_neo_you_pointing_v1.png',
    audio: '/assets/korean/step002/audio/audio_neo.mp3',
    korean: '너',
    meaning: 'tú',
    distractors: ['나', '저', '조금'],
  },
  {
    id: 'mwo',
    image: '/assets/korean/step002/kr_step002_mwo_what_david_v1.png',
    audio: '/assets/korean/step002/audio/audio_mwo.mp3',
    korean: '뭐',
    meaning: '¿qué?',
    distractors: ['어디', '오늘', '가요'],
  },
  {
    id: 'ije',
    image: '/assets/korean/step002/kr_step002_ije_now_haeun_down_gesture_v1.png',
    audio: '/assets/korean/step002/audio/audio_ije.mp3',
    korean: '이제',
    meaning: 'ahora / ya',
    distractors: ['어제', '오늘', '보여요'],
  },
];

// Shuffle options so correct answer isn't always first
function shuffleOptions(korean: string, distractors: string[]): string[] {
  const opts = [korean, ...distractors];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return opts;
}

function getLevelInfo(correct: number, total: number) {
  const pct = correct / total;
  if (pct >= 0.85) return {
    level: 'A2', emoji: '⭐', color: '#2563eb',
    title: 'Excelente — Nivel A2',
    desc: 'Reconoces el vocabulario esencial con fluidez. Tienes una base sólida del coreano básico y estás listo para avanzar a gramática y frases completas.',
    next: 'Con un método estructurado puedes llegar a A2 consolidado en 2–3 meses.',
  };
  if (pct >= 0.5) return {
    level: 'A1', emoji: '🌱', color: '#059669',
    title: 'Bien — Nivel A1',
    desc: 'Reconoces vocabulario elemental del coreano. Ya tienes una base inicial. Con práctica constante puedes consolidar el A1 rápidamente.',
    next: 'Enfócate en los primeros 5 pasos del método WeLearn para consolidar tu A1.',
  };
  return {
    level: 'Principiante', emoji: '🔰', color: '#c8202e',
    title: 'Principiante',
    desc: 'Estás en la etapa inicial. El coreano es diferente al español, ¡pero con el método correcto avanzas rápido!',
    next: 'Empieza con el Hangul (alfabeto) en el Paso 1 del método WeLearn — en 2 días ya lees coreano.',
  };
}

// ── Audio button ──────────────────────────────────────────────────────────────

function AudioBtn({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setPlaying(true);
  }

  return (
    <button
      onClick={play}
      title="Escuchar pronunciación"
      style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.5rem 1rem', borderRadius: 8,
        border: '1.5px solid var(--line-soft)',
        background: playing ? 'var(--bg-2)' : 'var(--surface)',
        color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 600,
        cursor: 'pointer', transition: 'all .15s',
      }}
    >
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} />
      {playing ? '🔊 Reproduciendo…' : '🔊 Escuchar pronunciación'}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Phase = 'quiz' | 'lead' | 'results';

export default function VocabQuizClient() {
  const total = QUIZ_ITEMS.length;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [phase, setPhase] = useState<Phase>('quiz');

  // Stable shuffled options per question
  const shuffledOptions = useMemo(
    () => QUIZ_ITEMS.map(item => shuffleOptions(item.korean, item.distractors)),
    [],
  );

  const current = QUIZ_ITEMS[currentIdx];
  const options = shuffledOptions[currentIdx];

  const score = useMemo(
    () => QUIZ_ITEMS.reduce((acc, item) => (answers[item.id] === item.korean ? acc + 1 : acc), 0),
    [answers],
  );

  const levelInfo = useMemo(() => getLevelInfo(score, total), [score, total]);
  const examScoreStr = `${score}/${total} — Vocabulario Coreano ${levelInfo.level}`;

  const handleSelect = useCallback((opt: string) => {
    if (confirmed) return;
    setSelected(opt);
  }, [confirmed]);

  function handleConfirm() {
    if (!selected) return;
    setAnswers(prev => ({ ...prev, [current.id]: selected }));
    setConfirmed(true);
  }

  function handleNext() {
    if (currentIdx < total - 1) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setConfirmed(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Done — show lead or results
      try {
        if (localStorage.getItem('wl_lead_captured') === '1') { setPhase('results'); return; }
      } catch {}
      setPhase('lead');
    }
  }

  function handleLeadClose() {
    setPhase('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Inline minimal CSS ────────────────────────────────────────────────────

  const css = `
    .vocab-image-wrap { position:relative; width:100%; aspect-ratio:4/3; border-radius:14px; overflow:hidden; background:var(--bg-2); border:1px solid var(--line-soft); margin-bottom:1.25rem; }
    .vocab-option { display:flex; align-items:center; gap:.75rem; padding:.8rem 1rem; border-radius:10px; border:1.5px solid var(--line-soft); background:var(--surface); cursor:pointer; text-align:left; transition:border-color .15s,background .15s; width:100%; font-family:inherit; }
    .vocab-option:hover:not(:disabled) { border-color:var(--ink); background:var(--bg-2); }
    .vocab-option--selected { border-color:var(--accent); background:rgba(200,32,46,.06); }
    .vocab-option--correct  { border-color:#059669; background:rgba(5,150,105,.09); }
    .vocab-option--wrong    { border-color:#c8202e; background:rgba(200,32,46,.09); opacity:.75; }
    .vocab-option__letter   { width:28px;height:28px;border-radius:7px;background:var(--bg-2);color:var(--muted);font-family:var(--mono);font-size:.72rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .15s,color .15s; }
    .vocab-option--selected .vocab-option__letter { background:var(--accent);color:#fff; }
    .vocab-option--correct .vocab-option__letter  { background:#059669;color:#fff; }
    .vocab-option__text { font-size:1.05rem;font-weight:700;color:var(--ink);letter-spacing:.02em; }
    .vocab-option__meaning { font-size:.82rem;color:var(--muted);margin-left:auto;flex-shrink:0; }
    .vocab-feedback { padding:.75rem 1rem;border-radius:10px;font-size:.9rem;font-weight:600;margin-top:.5rem; }
    .vocab-feedback--ok  { background:rgba(5,150,105,.1);color:#059669;border:1px solid rgba(5,150,105,.25); }
    .vocab-feedback--err { background:rgba(200,32,46,.1);color:#c8202e;border:1px solid rgba(200,32,46,.25); }
    .vocab-counter { font-family:var(--mono);font-size:.75rem;color:rgba(255,255,255,.5); }
    .vocab-progress { height:3px;background:rgba(255,255,255,.1); }
    .vocab-progress__fill { height:100%;background:var(--accent,#c8202e);transition:width .4s; }
    .vocab-results-content { max-width:580px;margin:0 auto;padding:2.5rem 1rem 4rem;display:flex;flex-direction:column;gap:1.25rem; }
    .vocab-res-hero { text-align:center;padding-bottom:1.25rem;border-bottom:1px solid var(--line-soft); }
    .vocab-res-emoji { font-size:3.5rem;display:block;margin-bottom:.5rem; }
    .vocab-res-eyebrow { font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:.35rem; }
    .vocab-res-title { font-size:clamp(1.6rem,5vw,2.2rem);font-weight:900;margin:0 0 .25rem; }
    .vocab-res-sub { font-size:.9rem;color:var(--muted);line-height:1.6; }
    .vocab-res-scorebar { background:var(--bg-2);border-radius:99px;height:10px;max-width:320px;margin:1rem auto .4rem;overflow:hidden; }
    .vocab-res-scorefill { height:100%;border-radius:99px;transition:width 1s cubic-bezier(.22,1,.36,1); }
    .vocab-res-scoretext { font-size:.85rem;color:var(--muted); }
    .vocab-res-scoretext strong { color:var(--ink);font-size:1.05rem; }
    .vocab-res-card { border-radius:14px;padding:1.25rem; }
    .vocab-res-card-next { font-size:.82rem;color:var(--muted);line-height:1.55;padding-top:.75rem;border-top:1px solid var(--line-soft); }
    .vocab-cta-wa { display:flex;align-items:center;justify-content:center;gap:.5rem;padding:.85rem 1.5rem;background:#25D366;color:#fff;border-radius:10px;font-weight:700;font-size:.93rem;text-decoration:none;transition:background .15s; }
    .vocab-cta-wa:hover { background:#1da851; }
    @media(max-width:600px) { .vocab-res-title{font-size:1.8rem;} }
  `;

  // ── Quiz phase ────────────────────────────────────────────────────────────

  if (phase === 'quiz' || phase === 'lead') {
    const isCorrect = confirmed && selected === current.korean;
    const isWrong   = confirmed && selected !== current.korean;
    const LETTERS   = ['A', 'B', 'C', 'D'];

    return (
      <>
        <style>{css}</style>
        <div className="prac-shell" style={{ '--exam-color': '#c8202e' } as React.CSSProperties}>

          {/* Topbar */}
          <header className="prac-topbar" style={{ '--exam-color': '#c8202e' } as React.CSSProperties}>
            <div className="prac-topbar__left">
              <Link href="/clases-de-coreano" className="prac-topbar__back">← Coreano</Link>
              <span className="prac-topbar__title">🇰🇷 Vocabulario — Diagnóstico A1</span>
            </div>
            <span className="vocab-counter">{currentIdx + 1}/{total}</span>
          </header>

          {/* Progress */}
          <div className="vocab-progress">
            <div className="vocab-progress__fill" style={{ width: `${((currentIdx + (confirmed ? 1 : 0)) / total) * 100}%` }} />
          </div>

          {/* Content */}
          <div style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1rem 5rem' }}>

            {/* Question header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)' }}>
                Pregunta {currentIdx + 1} · Vocabulario
              </span>
              <span style={{ fontSize: '.82rem', color: 'var(--muted)' }}>{total - currentIdx - 1} restantes</span>
            </div>

            <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem', lineHeight: 1.4 }}>
              ¿Cuál es la palabra coreana para este concepto?
            </p>

            {/* Image */}
            <div className="vocab-image-wrap">
              <Image
                src={current.image}
                alt={`Imagen de vocabulario coreano: ${current.meaning}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="560px"
                priority
              />
            </div>

            {/* Audio */}
            <div style={{ marginBottom: '1.25rem' }}>
              <AudioBtn src={current.audio} />
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', marginBottom: '1rem' }}>
              {options.map((opt, idx) => {
                const isSelectedOpt = selected === opt;
                const isCorrectOpt  = confirmed && opt === current.korean;
                const isWrongOpt    = confirmed && isSelectedOpt && !isCorrectOpt;
                let cls = 'vocab-option';
                if (isCorrectOpt) cls += ' vocab-option--correct';
                else if (isWrongOpt) cls += ' vocab-option--wrong';
                else if (!confirmed && isSelectedOpt) cls += ' vocab-option--selected';

                return (
                  <button
                    key={opt}
                    className={cls}
                    onClick={() => handleSelect(opt)}
                    disabled={confirmed}
                  >
                    <span className="vocab-option__letter">{LETTERS[idx]}</span>
                    <span className="vocab-option__text">{opt}</span>
                    {confirmed && opt === current.korean && (
                      <span className="vocab-option__meaning">= {current.meaning}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {confirmed && (
              <div className={`vocab-feedback${isCorrect ? ' vocab-feedback--ok' : ' vocab-feedback--err'}`}>
                {isCorrect
                  ? `✅ ¡Correcto! ${current.korean} significa "${current.meaning}".`
                  : `❌ Era ${current.korean} (${current.meaning}). ¡Lo recordarás la próxima!`}
              </div>
            )}

            {/* Confirm / Next buttons */}
            {!confirmed ? (
              <button
                className="btn"
                style={{ width: '100%', marginTop: '1rem', background: selected ? '#c8202e' : undefined }}
                disabled={!selected}
                onClick={handleConfirm}
              >
                Confirmar respuesta
              </button>
            ) : (
              <button
                className="btn"
                style={{ width: '100%', marginTop: '.75rem', background: '#c8202e' }}
                onClick={handleNext}
              >
                {currentIdx < total - 1 ? 'Siguiente pregunta →' : '🇰🇷 Ver mi nivel →'}
              </button>
            )}
          </div>
        </div>

        {phase === 'lead' && (
          <LeadCaptureModal
            examSlug="topik"
            examScore={examScoreStr}
            examName="Vocabulario Coreano A1"
            onClose={handleLeadClose}
          />
        )}
      </>
    );
  }

  // ── Results phase ─────────────────────────────────────────────────────────

  const pct = Math.round((score / total) * 100);
  const waMsg = encodeURIComponent(`Hola! Hice el diagnóstico de vocabulario coreano en WeLearn y obtuve ${score}/${total} (${levelInfo.level}). ¿Cómo puedo mejorar más rápido?`);
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  return (
    <>
      <style>{css}</style>
      <div className="prac-shell" style={{ '--exam-color': '#c8202e' } as React.CSSProperties}>

        <header className="prac-topbar" style={{ '--exam-color': '#c8202e' } as React.CSSProperties}>
          <div className="prac-topbar__left">
            <Link href="/clases-de-coreano" className="prac-topbar__back">← Coreano</Link>
            <span className="prac-topbar__title">🇰🇷 Resultados — Vocabulario A1</span>
          </div>
        </header>

        <div className="vocab-results-content">
          <div className="vocab-res-hero">
            <span className="vocab-res-emoji">{levelInfo.emoji}</span>
            <div className="vocab-res-eyebrow">Tu nivel de vocabulario coreano</div>
            <h1 className="vocab-res-title" style={{ color: levelInfo.color }}>{levelInfo.title}</h1>
            <div className="vocab-res-scorebar">
              <div className="vocab-res-scorefill" style={{ width: `${pct}%`, background: levelInfo.color }} />
            </div>
            <div className="vocab-res-scoretext">
              <strong>{score}</strong> de {total} correctas · {pct}%
            </div>
          </div>

          <div className="vocab-res-card" style={{ background: `${levelInfo.color}15`, border: `1px solid ${levelInfo.color}40` }}>
            <p style={{ color: 'var(--ink)', fontSize: '.9rem', lineHeight: 1.65, marginBottom: '.75rem' }}>{levelInfo.desc}</p>
            <div className="vocab-res-card-next">📌 {levelInfo.next}</div>
          </div>

          {/* Answer review */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line-soft)', borderRadius: 14, padding: '1.25rem' }}>
            <p style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', marginBottom: '.875rem' }}>
              Revisión de respuestas
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px,1fr))', gap: '.5rem' }}>
              {QUIZ_ITEMS.map((item, i) => {
                const ok = answers[item.id] === item.korean;
                return (
                  <div
                    key={item.id}
                    style={{
                      padding: '.6rem .75rem', borderRadius: 8,
                      border: `1px solid ${ok ? 'rgba(5,150,105,.35)' : 'rgba(200,32,46,.35)'}`,
                      background: ok ? 'rgba(5,150,105,.07)' : 'rgba(200,32,46,.07)',
                      fontSize: '.82rem',
                    }}
                  >
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem', marginBottom: '2px' }}>{item.korean}</div>
                    <div style={{ color: 'var(--muted)' }}>{item.meaning}</div>
                    <div style={{ color: ok ? '#059669' : '#c8202e', fontSize: '.7rem', fontWeight: 700, marginTop: '2px' }}>
                      {ok ? '✓ Correcto' : `✗ Dijiste: ${answers[item.id] ?? '—'}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            <Link
              href="/courses/korean/step/1"
              className="btn"
              style={{ textAlign: 'center', background: '#c8202e', borderColor: '#c8202e' }}
            >
              🇰🇷 Empezar Lección 1 — Paso 1 gratis
            </Link>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="vocab-cta-wa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Hablar con un profesor por WhatsApp
            </a>
            <Link href="/clases-de-coreano" className="btn btn-ghost" style={{ textAlign: 'center' }}>
              Ver clases de coreano WeLearn
            </Link>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => { setCurrentIdx(0); setAnswers({}); setSelected(null); setConfirmed(false); setPhase('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer', fontSize: '.82rem', color: 'var(--muted)', textDecoration: 'underline' }}
            >
              Repetir diagnóstico
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
