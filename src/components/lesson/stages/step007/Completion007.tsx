'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Data ───────────────────────────────────────────────────────────────── */
const SKILLS = [
  {
    icon: '📍',
    title: '에서 — Donde vive la acción',
    color: 'var(--wl-on-panel-link, #8b5cf6)',
    items: [
      '대학교에서 공부해요',
      '카페에서 일해요',
      '에서 + verbo de acción',
      'Distinto de 에 (destino)',
    ],
  },
  {
    icon: '🚶',
    title: '에 — Destino del movimiento',
    color: 'var(--wl-on-panel-link, #3b82f6)',
    items: [
      '매일 카페에 가요',
      '에 + 가다/오다',
      'Mismo lugar, distinta partícula',
      'El verbo decide cuál usar',
    ],
  },
  {
    icon: '⚙️',
    title: '하다 verbs — El patrón clave',
    color: '#10b981',
    items: [
      '공부해요 = estudio',
      '일해요 = trabajo',
      '좋아해요 = me gusta',
      '뭐해요? = ¿qué haces?',
    ],
  },
  {
    icon: '💡',
    title: '좋아요 vs 좋아해요',
    color: 'var(--wl-on-panel-alert, #ec4899)',
    items: [
      '좋아해요 = me gusta (verbo)',
      '좋아요 = está bien (adjetivo)',
      '한국 좋아해요 ✓',
      'Trampa clásica resuelta ✓',
    ],
  },
];

const PHRASES = [
  { ko: '이 대학교에서 공부해요', es: 'Estudio en esta universidad', audio: '이 대학교에서 공부해요' },
  { ko: '카페에서 일해요',        es: 'Trabajo en el café',          audio: '카페에서 일해요'        },
  { ko: '한국 좋아해요',          es: 'Me gusta Corea',              audio: '한국 좋아해요'          },
  { ko: '매일 카페에 가요',       es: 'Voy al café todos los días',   audio: '매일 카페에 가요'       },
];

/* ─── Confetti ───────────────────────────────────────────────────────────── */
interface Particle { id: number; x: number; size: number; color: string; delay: number; duration: number; shape: 'circle' | 'rect' }
const CONFETTI_COLORS = ['#6c63ff', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4', '#f97316'];

function useConfetti(active: boolean) {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    if (!active) return;
    const ps: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 6 + Math.random() * 8,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 1.2,
      duration: 2.2 + Math.random() * 1.4,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }));
    setParticles(ps);
    const t = setTimeout(() => setParticles([]), 5000);
    return () => clearTimeout(t);
  }, [active]);
  return particles;
}

/* ─── Component ───────────────────────────────────────────────────────────── */
interface Props { onComplete?: () => void }

export default function Completion007({ onComplete }: Props) {
  const [visible,   setVisible]   = useState(0);
  const [challenge, setChallenge] = useState(false);
  const [confetti,  setConfetti]  = useState(false);
  const startRef = useRef(Date.now());
  const particles = useConfetti(confetti);

  useEffect(() => {
    onComplete?.();
    const ct = setTimeout(() => setConfetti(true), 400);
    let n = 0;
    function step() {
      if (n > 12) return;
      const delay = n === 0 ? 300 : 160;
      setTimeout(() => { setVisible(v => v + 1); n++; step(); }, delay);
    }
    step();
    return () => clearTimeout(ct);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const elapsed = Math.max(1, Math.round((Date.now() - startRef.current) / 60000));

  const base: CSSProperties = {
    fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
    color: 'var(--foreground)',
  };

  return (
    <div style={{ ...base, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
      <style>{`
        @keyframes cl5-pop   { from{opacity:0;transform:scale(0.78) translateY(22px)} to{opacity:1;transform:none} }
        @keyframes cl5-in    { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        @keyframes cl5-badge { 0%{opacity:0;transform:scale(0.6) rotate(-8deg)} 60%{transform:scale(1.12) rotate(2deg)} 100%{opacity:1;transform:scale(1) rotate(0deg)} }
        @keyframes cl5-fall  { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
        @keyframes cl5-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        .cl5-btn:hover  { filter:brightness(1.07); transform:translateY(-1px); transition:all 0.18s ease; }
        .cl5-skill:hover { transform:translateY(-2px); transition:transform 0.18s ease; }
      `}</style>

      {/* Confetti overlay */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'fixed', top: '-24px',
          left: `${p.x}vw`,
          width: p.shape === 'rect' ? p.size * 1.6 : p.size,
          height: p.size,
          borderRadius: p.shape === 'circle' ? '50%' : 3,
          background: p.color,
          opacity: 0,
          animation: `cl5-fall ${p.duration}s ${p.delay}s ease-in forwards`,
          zIndex: 9999, pointerEvents: 'none',
        }} />
      ))}

      {/* 1 — Badge */}
      {visible >= 1 && (
        <div style={{ textAlign: 'center', animation: 'cl5-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 12 }}>
            <div style={{ fontSize: 64, animation: 'cl5-pulse 2.5s 1s ease-in-out infinite' }}>🎓</div>
            <div style={{
              position: 'absolute', bottom: -4, right: -4, width: 26, height: 26, borderRadius: '50%',
              background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, animation: 'cl5-badge 0.6s 0.5s ease both', boxShadow: '0 0 0 3px var(--card)',
            }}>✓</div>
          </div>
          <h2 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 800 }}>Step 007 completado</h2>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--muted-foreground)', lineHeight: 1.6, maxWidth: 300, marginInline: 'auto' }}>
            Ya describes tu vida, tus acciones y dónde ocurren.
          </p>
        </div>
      )}

      {/* 2 — Stats chips */}
      {visible >= 2 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', animation: 'cl5-in 0.4s 0.1s ease both' }}>
          {[
            { label: `${elapsed} min`, sub: 'invertidos',      icon: '⏱️', color: '#06b6d4' },
            { label: 'に/에서/에',      sub: 'dominado',         icon: '📍', color: 'var(--wl-on-panel-link, #8b5cf6)' },
            { label: '4 verbos',       sub: '하다 activos',      icon: '⚙️', color: '#10b981' },
            { label: 'Steps 001–007',  sub: 'integrados',        icon: '🔄', color: '#f59e0b' },
          ].map(({ label, sub, icon, color }) => (
            <div key={label} style={{ padding: '10px 14px', borderRadius: 14, textAlign: 'center', minWidth: 74, background: `${color}10`, border: `1px solid ${color}28` }}>
              <p style={{ margin: '0 0 2px', fontSize: 18 }}>{icon}</p>
              <p style={{ margin: '0 0 1px', fontSize: 13, fontWeight: 800, color }}>{label}</p>
              <p style={{ margin: 0, fontSize: 10, color: 'var(--muted-foreground)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* 3 — Achievement badges */}
      {visible >= 3 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center', animation: 'cl5-in 0.4s 0.12s ease both' }}>
          {[
            '📍 에서 desbloqueado',
            '⚙️ 하다 verbs activos',
            '💡 좋아해요 vs 좋아요',
            '🗓️ 매일 en tu léxico',
          ].map((badge, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 700, padding: '5px 13px', borderRadius: 100,
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: 'var(--wl-on-panel-ok, #16a34a)',
            }}>
              ✓ {badge}
            </span>
          ))}
        </div>
      )}

      {/* 4–7 — Skills breakdown */}
      {SKILLS.map((skill, si) => visible >= si + 4 && (
        <div key={si} className="cl5-skill" style={{
          background: 'var(--card)', border: `1px solid ${skill.color}25`,
          borderRadius: 16, padding: '14px 16px', borderLeft: `3px solid ${skill.color}`,
          animation: 'cl5-in 0.4s ease both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 17 }}>{skill.icon}</span>
            <p style={{ margin: 0, fontSize: 13.5, fontWeight: 800, color: 'var(--foreground)', flex: 1 }}>{skill.title}</p>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
              background: `${skill.color}15`, border: `1px solid ${skill.color}30`, color: skill.color,
            }}>✓ dominado</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {skill.items.map((item, ii) => (
              <p key={ii} style={{ margin: 0, fontSize: 11.5, color: 'var(--muted-foreground)', lineHeight: 1.5, paddingLeft: 10, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: skill.color, fontWeight: 800 }}>·</span>
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}

      {/* 8 — Lo que puedes decir */}
      {visible >= 8 && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px', animation: 'cl5-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-foreground)' }}>
            🗣️ Lo que puedes decir ahora mismo
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PHRASES.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)', lineHeight: 1.3 }}>{p.ko}</p>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--muted-foreground)' }}>{p.es}</p>
                </div>
                <button type="button" onClick={() => playAudio(p.audio)}
                  style={{ width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', flexShrink: 0, background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>
                  🔊
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9 — Step006 preview */}
      {visible >= 9 && (
        <div style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.22)', borderRadius: 16, padding: '16px', animation: 'cl5-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 3px', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--wl-on-panel-link, #6c63ff)' }}>Próximamente</p>
          <p style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 800, color: 'var(--foreground)' }}>Step 006 — Tiempo y planes</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['내일', '어제', '언제', '지금', '나중에'].map(item => (
              <span key={item} style={{
                fontSize: 12, fontWeight: 500, fontFamily: '"Noto Sans KR",sans-serif',
                padding: '4px 12px', borderRadius: 100,
                background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.22)', color: 'var(--foreground)',
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 10 — Desafío real */}
      {visible >= 10 && !challenge && (
        <button type="button" className="cl5-btn" onClick={() => setChallenge(true)}
          style={{
            padding: '15px', borderRadius: 14, cursor: 'pointer', width: '100%',
            background: 'rgba(245,158,11,0.14)', border: '1px solid rgba(245,158,11,0.4)',
            fontSize: 13.5, fontWeight: 800, color: '#f59e0b',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            animation: 'cl5-in 0.4s ease both',
          }}>
          🎯 Acepta el desafío final →
        </button>
      )}

      {visible >= 10 && challenge && (
        <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 14, padding: '18px', animation: 'cl5-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>🎯 Tu misión esta semana</p>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.55 }}>
            Usa estas frases en situaciones reales — o practica en voz alta:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { n: '1', ko: '카페에서 일해요', hint: 'Díselo a alguien hoy' },
              { n: '2', ko: '[lugar]에서 [acción]해요', hint: 'Describe tu rutina' },
              { n: '3', ko: '뭐해요?', hint: 'Pregúntale a alguien' },
              { n: '4', ko: '한국 좋아해요', hint: 'O cualquier cosa que te guste' },
            ].map(({ n, ko, hint }) => (
              <div key={n} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
                borderBottom: n !== '4' ? '1px solid rgba(245,158,11,0.15)' : 'none',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', background: 'rgba(245,158,11,0.2)',
                  border: '1px solid rgba(245,158,11,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: '#f59e0b', flexShrink: 0,
                }}>{n}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 800, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)' }}>{ko}</p>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--muted-foreground)' }}>{hint}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ margin: '14px 0 0', fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.55, fontStyle: 'italic' }}>
            El idioma se aprende hablando — aunque sea en tu cuarto. Cada frase dicha es un paso real.
          </p>
        </div>
      )}
    </div>
  );
}
