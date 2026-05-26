'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { playAudio } from '@/lib/storage';

/* ─── Data ───────────────────────────────────────────────────────────────── */
const SKILLS = [
  {
    icon: '👆',
    title: '이거/그거/저거 — La perspectiva importa',
    color: '#6c63ff',
    items: [
      '이거 = esto (cerca mío)',
      '그거 = eso (lejos mío)',
      '저거 = aquello (lejos de ambos)',
      'El mismo objeto, distinto pronombre',
    ],
  },
  {
    icon: '🔢',
    title: 'Números nativos — Para contar objetos',
    color: '#f59e0b',
    items: [
      '하나/둘/셋/넷/다섯',
      'Contratan antes de contador',
      '하나→한, 둘→두, 셋→세, 넷→네',
      'Sistema distinto al sino-coreano',
    ],
  },
  {
    icon: '🥤',
    title: 'Contadores — 잔 y 개',
    color: '#22c55e',
    items: [
      '잔 = para bebidas en taza/vaso',
      '개 = para objetos sólidos',
      '커피 한 잔 / 호떡 한 개',
      'El contador define la categoría',
    ],
  },
  {
    icon: '➕',
    title: '-도 — La partícula "también"',
    color: '#e879f9',
    items: [
      '-도 = también / también esto',
      'Reemplaza -를/을 directamente',
      '커피도 주세요 — café también',
      'Se pega a la palabra: 주스도',
    ],
  },
];

const PHRASES = [
  { ko: '이거 뭐예요?',              es: '¿Qué es esto?',                   audio: '이거 뭐예요?' },
  { ko: '그거는 호떡이에요',          es: 'Eso es hodduk',                   audio: '호떡' },
  { ko: '호떡 하나 주세요',           es: 'Un hodduk, por favor',             audio: '호떡 하나 주세요' },
  { ko: '커피 한 잔 주세요',          es: 'Un café, por favor',               audio: '한 잔' },
  { ko: '커피도 주세요',              es: 'Un café también, por favor',        audio: '커피' },
  { ko: '금방 준비해 드릴게요',       es: 'Enseguida se lo preparo',           audio: '금방' },
];

/* ─── Confetti ───────────────────────────────────────────────────────────── */
interface Particle { id: number; x: number; size: number; color: string; delay: number; duration: number; shape: 'circle' | 'rect' }
const CONFETTI_COLORS = ['#6c63ff', '#22c55e', '#f59e0b', '#e879f9', '#06b6d4', '#f97316'];

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

export default function Completion004({ onComplete }: Props) {
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
      if (n > 14) return;
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
        @keyframes cl4-pop   { from{opacity:0;transform:scale(0.78) translateY(22px)} to{opacity:1;transform:none} }
        @keyframes cl4-in    { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        @keyframes cl4-badge { 0%{opacity:0;transform:scale(0.6) rotate(-8deg)} 60%{transform:scale(1.12) rotate(2deg)} 100%{opacity:1;transform:scale(1) rotate(0deg)} }
        @keyframes cl4-fall  { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
        @keyframes cl4-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        .cl4-btn:hover   { filter:brightness(1.07); transform:translateY(-1px); transition:all 0.18s ease; }
        .cl4-skill:hover { transform:translateY(-2px); transition:transform 0.18s ease; }
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
          animation: `cl4-fall ${p.duration}s ${p.delay}s ease-in forwards`,
          zIndex: 9999, pointerEvents: 'none',
        }} />
      ))}

      {/* 1 — Badge */}
      {visible >= 1 && (
        <div style={{ textAlign: 'center', animation: 'cl4-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 12 }}>
            <div style={{ fontSize: 64, animation: 'cl4-pulse 2.5s 1s ease-in-out infinite' }}>🍡</div>
            <div style={{
              position: 'absolute', bottom: -4, right: -4, width: 26, height: 26, borderRadius: '50%',
              background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, animation: 'cl4-badge 0.6s 0.5s ease both', boxShadow: '0 0 0 3px var(--bg)',
            }}>✓</div>
          </div>
          <h2 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 800 }}>Step 004 completado</h2>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 300, marginInline: 'auto' }}>
            Ya puedes comprar en un café coreano — preguntar, pedir y agradecer.
          </p>
        </div>
      )}

      {/* 2 — Stats chips */}
      {visible >= 2 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', animation: 'cl4-in 0.4s 0.1s ease both' }}>
          {[
            { label: `${elapsed} min`, sub: 'invertidos',     icon: '⏱️', color: '#06b6d4' },
            { label: '이거/그거',      sub: 'dominado',        icon: '👆', color: '#6c63ff' },
            { label: '2 contadores',   sub: '잔 y 개',          icon: '🥤', color: '#22c55e' },
            { label: 'Steps 001–004',  sub: 'integrados',      icon: '🔄', color: '#f59e0b' },
          ].map(({ label, sub, icon, color }) => (
            <div key={label} style={{ padding: '10px 14px', borderRadius: 14, textAlign: 'center', minWidth: 74, background: `${color}10`, border: `1px solid ${color}28` }}>
              <p style={{ margin: '0 0 2px', fontSize: 18 }}>{icon}</p>
              <p style={{ margin: '0 0 1px', fontSize: 13, fontWeight: 800, color }}>{label}</p>
              <p style={{ margin: 0, fontSize: 10, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* 3 — Achievement badges */}
      {visible >= 3 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center', animation: 'cl4-in 0.4s 0.12s ease both' }}>
          {[
            '👆 이거/그거/저거',
            '🔢 Números nativos',
            '🥤 Contadores 잔/개',
            '➕ Partícula -도',
            '🍡 Primer pedido en coreano',
          ].map((badge, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 700, padding: '5px 13px', borderRadius: 100,
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#16a34a',
            }}>
              ✓ {badge}
            </span>
          ))}
        </div>
      )}

      {/* 4–7 — Skills breakdown */}
      {SKILLS.map((skill, si) => visible >= si + 4 && (
        <div key={si} className="cl4-skill" style={{
          background: 'var(--bg)', border: `1px solid ${skill.color}25`,
          borderRadius: 16, padding: '14px 16px', borderLeft: `3px solid ${skill.color}`,
          animation: 'cl4-in 0.4s ease both',
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
              <p key={ii} style={{ margin: 0, fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.5, paddingLeft: 10, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: skill.color, fontWeight: 800 }}>·</span>
                {item}
              </p>
            ))}
          </div>
        </div>
      ))}

      {/* 8 — Lo que puedes decir */}
      {visible >= 8 && (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 16, padding: '16px', animation: 'cl4-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>
            🗣️ Frases que ya puedes usar
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PHRASES.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, fontFamily: '"Noto Sans KR",sans-serif', color: 'var(--foreground)', lineHeight: 1.3 }}>{p.ko}</p>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)' }}>{p.es}</p>
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

      {/* 9 — Step005 preview */}
      {visible >= 9 && (
        <div style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.22)', borderRadius: 16, padding: '16px', animation: 'cl4-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 3px', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: '#6c63ff' }}>Próximamente</p>
          <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 800, color: 'var(--foreground)' }}>Step 005 — El pago y más</p>
          <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--muted)' }}>David cobra, aprende a dar precio en coreano y navega el café con confianza.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['얼마예요?', '카드로', '현금으로', '영수증', '잠깐만요'].map(item => (
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
        <button type="button" className="cl4-btn" onClick={() => setChallenge(true)}
          style={{
            padding: '15px', borderRadius: 14, cursor: 'pointer', width: '100%',
            background: 'rgba(245,158,11,0.14)', border: '1px solid rgba(245,158,11,0.4)',
            fontSize: 13.5, fontWeight: 800, color: '#f59e0b',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            animation: 'cl4-in 0.4s ease both',
          }}>
          🎯 Acepta el desafío de la semana →
        </button>
      )}

      {visible >= 10 && challenge && (
        <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 14, padding: '18px', animation: 'cl4-in 0.4s ease both' }}>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>🎯 Tu misión esta semana</p>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>
            Entra a cualquier café o tienda coreana (o imagínalo). Practica estas frases en voz alta:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { n: '1', ko: '이거 뭐예요?',          hint: 'Señala algo y pregunta' },
              { n: '2', ko: '[cosa] 하나 주세요',     hint: 'Pide cualquier cosa con "uno"' },
              { n: '3', ko: '[bebida] 한 잔 주세요',  hint: 'Usa el contador correcto' },
              { n: '4', ko: '[item]도 주세요',         hint: 'Agrega algo más al pedido' },
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
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)' }}>{hint}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ margin: '14px 0 0', fontSize: 12, color: 'var(--muted)', lineHeight: 1.55, fontStyle: 'italic' }}>
            El idioma se aprende hablando — aunque sea en tu cuarto. Cada frase dicha es un paso real.
          </p>
        </div>
      )}
    </div>
  );
}
