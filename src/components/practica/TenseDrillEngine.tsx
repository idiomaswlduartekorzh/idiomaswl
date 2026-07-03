'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export interface DrillItem {
  level: string;
  tenseFocus: string;
  es: string;
  it: string;
  seconds: number;
}

interface Props {
  color: string;
  flag: string;
  title: string;
  subtitle?: string;
  backHref: string;
  backLabel: string;
  items: DrillItem[];
}

export default function TenseDrillEngine({ color, flag, title, subtitle, backHref, backLabel, items }: Props) {
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(items[0]?.seconds ?? 30);
  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [note, setNote] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const item = items[index];

  useEffect(() => {
    setSecondsLeft(item.seconds);
    setRunning(false);
    setRevealed(false);
    setNote('');
  }, [index, item.seconds]);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => (s > 0 ? s - 1 : 0));
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, secondsLeft > 0]);

  const timeUp = running === false && secondsLeft === 0;

  function goTo(i: number) {
    setIndex(Math.max(0, Math.min(items.length - 1, i)));
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }
  function resetTimer() { setSecondsLeft(item.seconds); setRunning(false); }
  function adjustTime(delta: number) { setSecondsLeft(s => Math.max(0, s + delta)); }

  const pct = item.seconds > 0 ? Math.round((secondsLeft / item.seconds) * 100) : 0;
  const timerColor = secondsLeft === 0 ? '#dc2626' : pct <= 25 ? '#d97706' : color;

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 800 }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href={backHref} style={{ color: 'var(--muted)', textDecoration: 'none' }}>{flag} {backLabel}</Link>
          <span>/</span>
          <span style={{ color, fontWeight: 800 }}>{title}</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />{flag} · {subtitle ?? title}</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>{title}</h1>
        <p style={{ margin: '0 0 1.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
          Modo guiado en vivo: muestra la oración, dale tiempo al alumno, revisa juntos y avanza. No hay corrección automática.
        </p>

        {/* Jump pills */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.1rem' }}>
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={`Oración ${i + 1} — ${it.level}`}
              style={{
                width: 34, height: 34, borderRadius: 8,
                border: i === index ? `2px solid ${color}` : '1.5px solid var(--line-soft)',
                background: i === index ? color : 'var(--bg)',
                color: i === index ? '#fff' : 'var(--muted)',
                fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'var(--mono)',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div style={{ padding: '1.4rem 1.5rem', borderRadius: 14, border: `1.5px solid ${color}33`, background: 'var(--bg)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.9rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, background: `${color}18`, color, borderRadius: 5, padding: '0.15rem 0.5rem', fontFamily: 'var(--mono)' }}>
              {item.level} · {index + 1}/{items.length}
            </span>
          </div>

          <p style={{ margin: '0 0 1.25rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.5 }}>
            {item.es}
          </p>

          {/* Timer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.1rem', flexWrap: 'wrap' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
              border: `4px solid ${timerColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '1.05rem', color: timerColor,
            }}>
              {secondsLeft}
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setRunning(r => !r)} disabled={secondsLeft === 0}>
              {running ? '⏸ Pausar' : '▶ Iniciar'}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={resetTimer}>↺ Reiniciar</button>
            <button className="btn btn-ghost btn-sm" onClick={() => adjustTime(10)}>+10s</button>
            <button className="btn btn-ghost btn-sm" onClick={() => adjustTime(-10)}>-10s</button>
            {timeUp && <span style={{ fontSize: '0.78rem', color: '#dc2626', fontWeight: 700 }}>⏰ Tiempo agotado</span>}
          </div>

          {/* Note (optional, session-only) */}
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Escribe aquí lo que dijo el alumno (opcional, solo para esta sesión)…"
            rows={2}
            style={{
              width: '100%', resize: 'vertical', padding: '0.6rem 0.75rem', borderRadius: 8,
              border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)',
              fontSize: '0.88rem', fontFamily: 'inherit', marginBottom: '1.1rem', outline: 'none',
            }}
          />

          {/* Reveal */}
          {!revealed ? (
            <button className="btn btn-sm" onClick={() => setRevealed(true)} style={{ background: color, borderColor: color }}>
              👁 Mostrar respuesta modelo
            </button>
          ) : (
            <div style={{ padding: '0.85rem 1rem', borderRadius: 10, background: `${color}0d`, border: `1.5px solid ${color}33`, marginBottom: '0.25rem' }}>
              <p style={{ margin: 0, fontSize: '1.02rem', fontWeight: 700, color, lineHeight: 1.5 }}>{item.it}</p>
              <p style={{ margin: '0.45rem 0 0', fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{item.tenseFocus}</p>
            </div>
          )}

          {/* Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <button className="btn btn-ghost btn-sm" onClick={prev} disabled={index === 0}>← Anterior</button>
            {index < items.length - 1 ? (
              <button className="btn btn-sm" onClick={next} style={{ background: color, borderColor: color }}>
                Revisado ✓ — Siguiente →
              </button>
            ) : (
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color }}>🎉 Última oración del set</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
