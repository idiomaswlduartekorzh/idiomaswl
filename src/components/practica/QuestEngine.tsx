'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── Types ─────────────────────────────────────────────────────────────────

export type LevelType = 'choice' | 'freeText' | 'sprint';

export interface QuestItem {
  text: string;
  opts?: string[];
  ans: string | string[];
  hint?: string;
}

export interface QuestLevel {
  type: LevelType;
  icon?: string;
  title: string;
  desc?: string;
  items: QuestItem[];
  xpMax?: number;
  inputWidth?: number;
}

export interface QuestGuide {
  title: string;
  body: string;
  tip?: string;
  tableHead?: string[];
  tableRows?: string[][];
}

interface Props {
  color: string;
  flag: string;
  storageKey: string;
  guide: QuestGuide;
  levels: QuestLevel[];
  backHref: string;
  backLabel: string;
  title: string;
  subtitle?: string;
  defaultGuideOpen?: boolean;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function norm(s: string): string {
  return s.trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '').trim();
}

function accepts(input: string, ans: string | string[]): boolean {
  const n = norm(input);
  if (!n) return false;
  return Array.isArray(ans) ? ans.some(a => norm(a) === n) : norm(ans) === n;
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function QuestEngine({
  color, flag, storageKey, guide, levels,
  backHref, backLabel, title, subtitle, defaultGuideOpen = false,
}: Props) {
  const [unlocked, setUnlocked] = useState(0);
  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<boolean[] | null>(null);
  const [xp, setXP] = useState(0);
  const [guideOpen, setGuideOpen] = useState(defaultGuideOpen);

  useEffect(() => {
    let cancelled = false;
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
      queueMicrotask(() => {
        if (cancelled) return;
        if (typeof saved.unlocked === 'number') {
          setUnlocked(saved.unlocked);
          setActive(Math.min(saved.unlocked, levels.length - 1));
        }
        if (typeof saved.xp === 'number') setXP(saved.xp);
      });
    } catch {}
    return () => { cancelled = true; };
  }, [storageKey, levels.length]);

  const level = levels[active];
  const maxXP = level.xpMax ?? level.items.length * 10;
  const correctCount = results ? results.filter(Boolean).length : 0;
  const didPass = results ? correctCount / level.items.length >= 0.6 : false;
  const allDone = unlocked >= levels.length;

  function setAns(i: number, val: string) {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [i]: val }));
  }

  function handleCheck() {
    const res = level.items.map((item, i) => accepts(answers[i] ?? '', item.ans));
    const correct = res.filter(Boolean).length;
    const ratio = correct / level.items.length;
    const passed = ratio >= 0.6;
    const isFirst = active >= unlocked;
    const earned = isFirst ? Math.round(ratio * maxXP) : 0;
    const newXP = xp + earned;
    const newUnlocked = passed && isFirst ? Math.min(active + 1, levels.length) : unlocked;
    setResults(res);
    setChecked(true);
    setXP(newXP);
    setUnlocked(newUnlocked);
    try {
      localStorage.setItem(storageKey, JSON.stringify({ unlocked: newUnlocked, xp: newXP }));
    } catch {}
  }

  function retry() {
    setAnswers({});
    setChecked(false);
    setResults(null);
  }

  function goLevel(i: number) {
    if (i > unlocked) return;
    setActive(i);
    setAnswers({});
    setChecked(false);
    setResults(null);
  }

  function nextLevel() {
    const next = active + 1;
    if (next < levels.length) goLevel(next);
  }

  function resetProgress() {
    try { localStorage.removeItem(storageKey); } catch {}
    setUnlocked(0);
    setActive(0);
    setXP(0);
    retry();
  }

  const iw = level.inputWidth ?? (level.type === 'sprint' ? 120 : 90);

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

        {/* Title */}
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />{flag} · {subtitle ?? title}</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 1.5rem', fontWeight: 700 }}>{title}</h1>

        {/* Guide toggle */}
        <button
          onClick={() => setGuideOpen(o => !o)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.85rem 1.1rem',
            borderRadius: guideOpen ? '12px 12px 0 0' : 12,
            border: `1.5px solid ${color}33`,
            background: guideOpen ? `${color}0d` : 'var(--bg)',
            color, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
            marginBottom: guideOpen ? 0 : '1.75rem',
          }}
        >
          <span>📖 {guide.title}</span>
          <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{guideOpen ? '▲ Cerrar' : '▼ Ver guía'}</span>
        </button>

        {guideOpen && (
          <div style={{
            padding: '1.1rem 1.3rem', borderRadius: '0 0 12px 12px',
            background: `${color}06`, border: `1.5px solid ${color}22`,
            borderTop: 'none', marginBottom: '1.75rem',
          }}>
            {guide.body.split('\n').filter(Boolean).map((line, i) => (
              <p key={i} style={{ margin: i === 0 ? '0 0 0.6rem' : '0.4rem 0 0', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>{line}</p>
            ))}
            {guide.tip && (
              <div style={{ marginTop: '0.75rem', padding: '0.55rem 0.75rem', borderRadius: 8, background: `${color}0d`, fontSize: '0.82rem', color, borderLeft: `3px solid ${color}` }}>
                💡 {guide.tip}
              </div>
            )}
            {guide.tableHead && guide.tableRows && (
              <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr>
                      {guide.tableHead.map((h, i) => (
                        <th key={i} style={{ padding: '0.4rem 0.6rem', textAlign: 'left', borderBottom: `2px solid ${color}44`, color, fontWeight: 700 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {guide.tableRows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--line-soft)' }}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ padding: '0.4rem 0.6rem', color: j === 0 ? color : 'var(--muted)', fontFamily: j === 0 ? 'var(--mono)' : undefined, fontWeight: j === 0 ? 700 : undefined }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Level dots + XP */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {levels.map((lv, i) => {
              const isActive = i === active;
              const isLocked = i > unlocked;
              const isDone = i < unlocked;
              return (
                <button
                  key={i}
                  onClick={() => goLevel(i)}
                  disabled={isLocked}
                  title={isLocked ? 'Completa el nivel anterior' : lv.title}
                  style={{
                    width: 36, height: 36, borderRadius: 9,
                    border: isActive ? `2px solid ${color}` : `1.5px solid ${isLocked ? 'var(--line-soft)' : color + '55'}`,
                    background: isActive ? color : isDone ? `${color}22` : 'var(--bg)',
                    color: isActive ? '#fff' : isLocked ? 'var(--muted)' : color,
                    fontWeight: 700, fontSize: '0.82rem',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    opacity: isLocked ? 0.45 : 1,
                    transition: 'all 0.15s',
                  }}
                >
                  {isDone ? '✓' : i + 1}
                </button>
              );
            })}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color, fontWeight: 700 }}>⚡ {xp} XP</div>
        </div>

        {/* Completion banner */}
        {allDone && (
          <div style={{ padding: '1.1rem 1.3rem', borderRadius: 12, background: `${color}12`, border: `1.5px solid ${color}44`, marginBottom: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>🎉</div>
            <div style={{ fontWeight: 800, color, fontSize: '1rem' }}>¡Quest completada! — ⚡ {xp} XP total</div>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.84rem', color: 'var(--muted)' }}>Puedes repasar cualquier nivel o reiniciar el progreso.</p>
          </div>
        )}

        {/* Level card */}
        <div style={{ padding: '1.25rem 1.4rem', borderRadius: 14, border: `1.5px solid ${color}33`, background: 'var(--bg)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '1.05rem' }}>
              {level.icon ?? (level.type === 'sprint' ? '⚡' : level.type === 'choice' ? '🎯' : '✏️')}
            </span>
            <span style={{ fontWeight: 800, color, fontSize: '0.95rem' }}>Nivel {active + 1} — {level.title}</span>
          </div>
          {level.desc && <p style={{ margin: '0 0 1.1rem', fontSize: '0.83rem', color: 'var(--muted)' }}>{level.desc}</p>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: level.type === 'sprint' ? '0.5rem' : '0.85rem' }}>
            {level.items.map((item, i) => {
              const val = answers[i] ?? '';
              const ok = results?.[i];
              const correctAns = Array.isArray(item.ans) ? item.ans[0] : item.ans;

              /* ── CHOICE ── */
              if (level.type === 'choice') {
                return (
                  <div key={i} style={{
                    padding: '0.85rem 1rem', borderRadius: 10,
                    border: `1.5px solid ${checked ? (ok ? '#05966944' : '#dc262644') : 'var(--line-soft)'}`,
                    background: checked ? (ok ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : undefined,
                  }}>
                    <p style={{ margin: '0 0 0.6rem', color: 'var(--ink)', fontWeight: 600, fontSize: '0.93rem', lineHeight: 1.5 }}>{item.text}</p>
                    {!checked ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {item.opts?.map(opt => (
                          <button key={opt} onClick={() => setAns(i, opt)} style={{
                            padding: '0.3rem 0.9rem', borderRadius: 6,
                            border: `1.5px solid ${val === opt ? color : 'var(--line-soft)'}`,
                            background: val === opt ? `${color}18` : 'var(--bg)',
                            color: val === opt ? color : 'var(--muted)',
                            fontFamily: 'var(--mono)', fontWeight: val === opt ? 700 : 400,
                            fontSize: '0.88rem', cursor: 'pointer',
                          }}>{opt}</button>
                        ))}
                      </div>
                    ) : (
                      <p style={{ margin: 0, fontSize: '0.78rem', fontFamily: 'var(--mono)', color: ok ? '#059669' : '#dc2626' }}>
                        {ok ? `✓ "${correctAns}"` : `✗ Correcto: "${correctAns}"`}
                        {item.hint ? ` — ${item.hint}` : ''}
                      </p>
                    )}
                  </div>
                );
              }

              /* ── FREETEXT ── */
              if (level.type === 'freeText') {
                const parts = item.text.split('___');
                return (
                  <div key={i} style={{
                    padding: '0.85rem 1rem', borderRadius: 10,
                    border: `1.5px solid ${checked ? (ok ? '#05966944' : '#dc262644') : 'var(--line-soft)'}`,
                    background: checked ? (ok ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : undefined,
                  }}>
                    <p style={{ margin: checked ? '0 0 0.4rem' : 0, color: 'var(--ink)', fontWeight: 600, fontSize: '0.93rem', lineHeight: 1.6 }}>
                      {parts[0]}
                      {checked ? (
                        <span style={{ padding: '0.1rem 0.45rem', borderRadius: 5, background: ok ? 'rgba(5,150,105,0.12)' : 'rgba(220,38,38,0.12)', color: ok ? '#059669' : '#dc2626', fontFamily: 'var(--mono)', fontWeight: 800 }}>{val || '—'}</span>
                      ) : (
                        <input value={val} onChange={e => setAns(i, e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter' && !checked) handleCheck(); }}
                          style={{ display: 'inline-block', width: iw, padding: '0.1rem 0.35rem', borderRadius: 5, border: `1.5px solid ${color}55`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.88rem', fontFamily: 'var(--mono)', fontWeight: 700, textAlign: 'center', outline: 'none' }}
                        />
                      )}
                      {parts[1] ?? ''}
                    </p>
                    {checked && (
                      <p style={{ margin: 0, fontSize: '0.78rem', fontFamily: 'var(--mono)', color: ok ? '#059669' : '#dc2626' }}>
                        {ok ? `✓ "${correctAns}"` : `✗ Correcto: "${correctAns}"`}
                        {item.hint ? ` — ${item.hint}` : ''}
                      </p>
                    )}
                  </div>
                );
              }

              /* ── SPRINT ── */
              const parts = item.text.split('___');
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', padding: '0.25rem 0', borderBottom: '1px solid var(--line-soft)' }}>
                  <span style={{ color: 'var(--ink)', fontSize: '0.88rem' }}>{parts[0]}</span>
                  {checked ? (
                    <span style={{ padding: '0.1rem 0.4rem', borderRadius: 5, background: ok ? 'rgba(5,150,105,0.12)' : 'rgba(220,38,38,0.12)', color: ok ? '#059669' : '#dc2626', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.85rem' }}>{val || '—'}</span>
                  ) : (
                    <input value={val} onChange={e => setAns(i, e.target.value)}
                      style={{ width: iw, padding: '0.12rem 0.3rem', borderRadius: 5, border: `1.5px solid ${color}55`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.85rem', fontFamily: 'var(--mono)', fontWeight: 700, textAlign: 'center', outline: 'none' }}
                    />
                  )}
                  <span style={{ color: 'var(--ink)', fontSize: '0.88rem' }}>{parts[1] ?? ''}</span>
                  {checked && !ok && <span style={{ fontSize: '0.72rem', color: '#dc2626', fontFamily: 'var(--mono)' }}>→ &quot;{correctAns}&quot;</span>}
                  {checked && ok && <span style={{ fontSize: '0.72rem', color: '#059669' }}>✓</span>}
                </div>
              );
            })}
          </div>

          {/* Action bar */}
          <div style={{ marginTop: '1.25rem' }}>
            {!checked ? (
              <button className="btn btn-sm" onClick={handleCheck} style={{ background: color, borderColor: color }}>
                {level.type === 'sprint' ? 'Entregar ⚡' : 'Comprobar →'}
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <div style={{ padding: '0.65rem 1rem', borderRadius: 10, background: `${color}0d`, border: `1.5px solid ${color}33`, fontWeight: 800, color, fontFamily: 'var(--mono)', fontSize: '0.88rem' }}>
                  {correctCount}/{level.items.length} {didPass ? '✓' : '✗'}
                </div>
                <button className="btn btn-ghost btn-sm" onClick={retry}>Reintentar</button>
                {didPass && active < levels.length - 1 && (
                  <button className="btn btn-sm" onClick={nextLevel} style={{ background: color, borderColor: color }}>
                    Siguiente nivel →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', opacity: 0.5 }} onClick={resetProgress}>
            Reiniciar progreso
          </button>
        </div>
      </div>
    </section>
  );
}
