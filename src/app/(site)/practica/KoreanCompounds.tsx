'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ROOTS, COMPOUNDS, CATEGORY_COLORS,
  getRootById, findCompound, getCompoundsForRoot,
  type KoreanRoot, type KoreanCompound, type RootCategory,
} from '@/data/korean-compounds';

// ─── types ────────────────────────────────────────────────────────────────────

type Mode = 'combine' | 'family' | 'quiz';

interface QuizQuestion {
  type: 'parts-to-meaning' | 'compound-to-parts';
  compound: KoreanCompound;
  options: string[];
  correct: string;
}

// ─── utils ────────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateQuiz(): QuizQuestion[] {
  const pool = shuffle([...COMPOUNDS]).slice(0, 10);
  return pool.map((compound, i) => {
    if (i % 2 === 0) {
      // Show two roots → pick meaning
      const wrong = shuffle(COMPOUNDS.filter(c => c.id !== compound.id).map(c => c.meaning)).slice(0, 3);
      return {
        type: 'parts-to-meaning',
        compound,
        options: shuffle([compound.meaning, ...wrong]),
        correct: compound.meaning,
      };
    } else {
      // Show compound → pick which roots form it
      const correctKey = compound.parts.join('|');
      const wrongKeys  = shuffle(
        COMPOUNDS.filter(c => c.id !== compound.id).map(c => c.parts.join('|'))
      ).slice(0, 3);
      return {
        type: 'compound-to-parts',
        compound,
        options: shuffle([correctKey, ...wrongKeys]),
        correct: correctKey,
      };
    }
  });
}

const CATEGORY_LABELS: Record<RootCategory, string> = {
  cuerpo: 'Cuerpo', naturaleza: 'Naturaleza', objetos: 'Objetos', espacio: 'Espacio',
};

// ─── Root block component ─────────────────────────────────────────────────────

function RootBlock({
  root, selected = false, disabled = false, onClick, size = 'md',
}: {
  root: KoreanRoot; selected?: boolean; disabled?: boolean;
  onClick?: () => void; size?: 'sm' | 'md' | 'lg';
}) {
  const color = CATEGORY_COLORS[root.category];
  const pad   = size === 'sm' ? '0.45rem 0.6rem' : size === 'lg' ? '1rem 1.25rem' : '0.65rem 0.85rem';
  const hSize = size === 'sm' ? '1.1rem' : size === 'lg' ? '2rem' : '1.45rem';
  const rSize = size === 'sm' ? '0.58rem' : size === 'lg' ? '0.75rem' : '0.65rem';
  const mSize = size === 'sm' ? '0.58rem' : size === 'lg' ? '0.72rem' : '0.62rem';
  const eSize = size === 'sm' ? '0.85rem' : size === 'lg' ? '1.4rem' : '1rem';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem',
        padding: pad, borderRadius: 12,
        background: selected ? `${color}18` : 'var(--bg)',
        border: `2px solid ${selected ? color : `${color}55`}`,
        cursor: disabled ? 'default' : 'pointer',
        fontFamily: 'inherit', transition: 'all 0.15s',
        opacity: disabled ? 0.45 : 1,
        boxShadow: selected ? `0 4px 14px ${color}33` : 'none',
        minWidth: size === 'sm' ? 64 : size === 'lg' ? 100 : 76,
      }}
    >
      <span style={{ fontSize: eSize }}>{root.emoji}</span>
      <span style={{ fontSize: hSize, fontWeight: 900, color, lineHeight: 1.1 }}>{root.hangul}</span>
      <span style={{ fontSize: rSize, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{root.romanization}</span>
      <span style={{ fontSize: mSize, color: 'var(--ink)', fontWeight: 600, textAlign: 'center', lineHeight: 1.25, maxWidth: 86 }}>
        {root.meaning}
      </span>
    </button>
  );
}

// ─── Compound result card ─────────────────────────────────────────────────────

function CompoundCard({ compound, highlight }: { compound: KoreanCompound; highlight?: string }) {
  const r0 = getRootById(compound.parts[0])!;
  const r1 = getRootById(compound.parts[1])!;
  const c0 = CATEGORY_COLORS[r0.category];
  const c1 = CATEGORY_COLORS[r1.category];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      style={{
        borderRadius: 16, border: '1.5px solid var(--line-soft)',
        background: 'var(--bg)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      }}
    >
      {/* Anatomy */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '1.3rem', fontWeight: 900, color: c0, fontFamily: 'var(--mono)' }}>{r0.hangul}</span>
        <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{r0.meaning}</span>
        <span style={{ color: 'var(--muted)', fontWeight: 700 }}>+</span>
        <span style={{ fontSize: '1.3rem', fontWeight: 900, color: c1, fontFamily: 'var(--mono)' }}>{r1.hangul}</span>
        <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{r1.meaning}</span>
        <span style={{ color: 'var(--muted)', fontWeight: 700 }}>=</span>
        <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--ink)' }}>{compound.hangul}</span>
      </div>

      {/* Main info */}
      <div>
        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted)', marginBottom: '0.2rem' }}>
          {compound.romanization}
        </div>
        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>{compound.meaning}</div>
      </div>

      {/* Explanation */}
      <div style={{
        padding: '0.65rem 0.85rem', borderRadius: 10,
        background: 'var(--bg-2,rgba(0,0,0,0.03))', border: '1px solid var(--line-soft)',
        fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6,
      }}>
        💡 {compound.explanation}
      </div>

      {/* Phonological note */}
      {compound.note && (
        <div style={{
          padding: '0.5rem 0.75rem', borderRadius: 8,
          background: 'rgba(83,74,183,0.06)', border: '1px solid rgba(83,74,183,0.2)',
          fontSize: '0.78rem', color: '#534AB7', lineHeight: 1.55,
        }}>
          🔊 <strong>Nota:</strong> {compound.note}
        </div>
      )}

      {/* Level badge */}
      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
        <span style={{
          fontSize: '0.65rem', fontFamily: 'var(--mono)', fontWeight: 800, padding: '0.15rem 0.5rem',
          borderRadius: 6, background: 'rgba(5,150,105,0.08)', color: '#059669', border: '1px solid #05966944',
        }}>
          {compound.level}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Mode: Combinar ───────────────────────────────────────────────────────────

function CombineMode({ addXp }: { addXp: (n: number) => void }) {
  const [sel, setSel]     = useState<[string | null, string | null]>([null, null]);
  const [result, setResult] = useState<KoreanCompound | 'none' | null>(null);
  const [found, setFound]   = useState<Set<string>>(new Set());

  function select(id: string) {
    if (result) { reset(); return; }
    const [a, b] = sel;
    if (a === null) { setSel([id, null]); return; }
    if (a === id)   { setSel([null, null]); return; }
    // second block selected → try to combine
    const compound = findCompound(a, id);
    setSel([a, id]);
    setResult(compound ?? 'none');
    if (compound && !found.has(compound.id)) {
      setFound(prev => new Set(prev).add(compound.id));
      addXp(15);
    }
  }

  function reset() { setSel([null, null]); setResult(null); }

  const [a, b] = sel;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Combination zone */}
      <div className="wl-card" style={{
        padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
        flexWrap: 'wrap', minHeight: 80, border: '1.5px dashed var(--line-soft)',
        justifyContent: 'center',
      }}>
        {!a && !b ? (
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: 0, fontStyle: 'italic' }}>
            Toca dos bloques para combinarlos 👇
          </p>
        ) : (
          <>
            {a && <RootBlock root={getRootById(a)!} selected size="lg" />}
            {a && <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--muted)' }}>+</span>}
            {b
              ? <RootBlock root={getRootById(b)!} selected size="lg" />
              : <div style={{ width: 100, height: 80, borderRadius: 12, border: '2px dashed var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>?</span>
                </div>
            }
            {a && (
              <button onClick={reset} className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem', marginLeft: '0.5rem' }}>
                ✕ Limpiar
              </button>
            )}
          </>
        )}
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        {result === 'none' && (
          <motion.div key="none" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ padding: '0.85rem 1rem', borderRadius: 12, background: 'rgba(217,119,6,0.07)', border: '1px solid rgba(217,119,6,0.25)', fontSize: '0.88rem', color: '#d97706', fontWeight: 600 }}>
            🤔 Estas raíces no forman una palabra compuesta conocida. ¡Prueba otra combinación!
          </motion.div>
        )}
        {result && result !== 'none' && (
          <motion.div key={result.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CompoundCard compound={result} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Root grid */}
      <div>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
          Raíces disponibles — {found.size}/{COMPOUNDS.length} compuestos encontrados
        </p>
        {(['cuerpo', 'naturaleza', 'objetos', 'espacio'] as RootCategory[]).map(cat => {
          const catRoots = ROOTS.filter(r => r.category === cat);
          const color    = CATEGORY_COLORS[cat];
          return (
            <div key={cat} style={{ marginBottom: '0.85rem' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.4rem' }}>
                {CATEGORY_LABELS[cat]}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {catRoots.map(root => (
                  <RootBlock
                    key={root.id}
                    root={root}
                    selected={a === root.id || b === root.id}
                    onClick={() => select(root.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {found.size > 0 && (
        <div style={{ padding: '0.85rem 1rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)', fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>
          ✅ Compuestos encontrados ({found.size}): {[...found].map(id => COMPOUNDS.find(c => c.id === id)!.hangul).join(' · ')}
        </div>
      )}
    </div>
  );
}

// ─── Mode: Familias ───────────────────────────────────────────────────────────

function FamilyMode() {
  const [activeRoot, setActiveRoot] = useState<string | null>(null);

  const compounds = activeRoot ? getCompoundsForRoot(activeRoot) : [];
  const root      = activeRoot ? getRootById(activeRoot) : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        Elige una raíz y descubre todas las palabras que se pueden construir con ella.
        Aprenderás cómo la <strong style={{ color: 'var(--ink)' }}>misma raíz reaparece</strong> en palabras diferentes — el secreto del vocabulario coreano.
      </p>

      {/* Root grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {ROOTS.map(r => {
          const count = getCompoundsForRoot(r.id).length;
          if (count === 0) return null;
          const color = CATEGORY_COLORS[r.category];
          return (
            <button
              key={r.id}
              onClick={() => setActiveRoot(activeRoot === r.id ? null : r.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.45rem 0.75rem', borderRadius: 10,
                background: activeRoot === r.id ? `${color}18` : 'var(--bg)',
                border: `2px solid ${activeRoot === r.id ? color : `${color}44`}`,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: '1rem' }}>{r.emoji}</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 900, color, fontFamily: 'var(--mono)' }}>{r.hangul}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{r.meaning}</span>
              <span style={{
                fontSize: '0.65rem', fontFamily: 'var(--mono)', fontWeight: 800,
                padding: '0.1rem 0.35rem', borderRadius: 5,
                background: `${color}22`, color,
              }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Family display */}
      <AnimatePresence mode="wait">
        {root && compounds.length > 0 && (
          <motion.div key={activeRoot} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: `${CATEGORY_COLORS[root.category]}18`,
                border: `2px solid ${CATEGORY_COLORS[root.category]}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', fontWeight: 900, color: CATEGORY_COLORS[root.category],
              }}>
                {root.hangul}
              </div>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem' }}>
                  Familia de <span style={{ color: CATEGORY_COLORS[root.category] }}>{root.hangul}</span> ({root.meaning})
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{compounds.length} palabras compuestas</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {compounds.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <CompoundCard compound={c} highlight={activeRoot ?? undefined} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {!activeRoot && (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
            ← Selecciona una raíz para explorar su familia
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mode: Quiz ───────────────────────────────────────────────────────────────

function QuizMode({ addXp }: { addXp: (n: number) => void }) {
  const [questions,    setQuestions]    = useState<QuizQuestion[]>(() => generateQuiz());
  const [currentIdx,   setCurrentIdx]   = useState(0);
  const [chosen,       setChosen]       = useState<string | null>(null);
  const [score,        setScore]        = useState(0);
  const [finished,     setFinished]     = useState(false);
  const [xpAwarded,    setXpAwarded]    = useState(false);

  const q = questions[currentIdx];

  function answer(opt: string) {
    if (chosen !== null) return;
    setChosen(opt);
    if (opt === q.correct) {
      setScore(s => s + 1);
      if (!xpAwarded) { addXp(20); setXpAwarded(true); }
    }
  }

  function next() {
    if (currentIdx + 1 >= questions.length) { setFinished(true); return; }
    setCurrentIdx(i => i + 1);
    setChosen(null);
    setXpAwarded(false);
  }

  function restart() {
    setQuestions(generateQuiz());
    setCurrentIdx(0);
    setChosen(null);
    setScore(0);
    setFinished(false);
    setXpAwarded(false);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct >= 90 ? '¡Excelente! Dominas los bloques.' : pct >= 70 ? '¡Muy bien! Sigue practicando.' : 'Sigue explorando las familias de palabras.';
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <div style={{ fontSize: '3.5rem' }}>{pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : '💪'}</div>
        <h3 style={{ fontWeight: 900, fontSize: '1.5rem', margin: 0, color: 'var(--ink)' }}>{msg}</h3>
        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#534AB7' }}>{score}/{questions.length}</div>
        <p style={{ color: 'var(--muted)', margin: 0 }}>{pct}% de aciertos</p>
        <button onClick={restart} className="btn btn-sm" style={{ fontSize: '0.95rem', padding: '0.75rem 1.5rem', marginTop: '0.5rem' }}>
          Intentar de nuevo →
        </button>
      </motion.div>
    );
  }

  const r0 = getRootById(q.compound.parts[0])!;
  const r1 = getRootById(q.compound.parts[1])!;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 6, borderRadius: 4, background: 'var(--line-soft)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((currentIdx + 1) / questions.length) * 100}%`, background: '#534AB7', borderRadius: 4, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
          {currentIdx + 1}/{questions.length}
        </span>
        <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: '#059669', fontWeight: 700 }}>
          ✓ {score}
        </span>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div key={currentIdx}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22 }}
        >
          <div className="wl-card" style={{ padding: '1.5rem', border: '1.5px solid rgba(83,74,183,0.2)' }}>
            {q.type === 'parts-to-meaning' ? (
              <>
                <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#534AB7', fontWeight: 800 }}>
                  ¿Qué significa esta combinación?
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <RootBlock root={r0} size="lg" />
                  <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--muted)' }}>+</span>
                  <RootBlock root={r1} size="lg" />
                </div>
              </>
            ) : (
              <>
                <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#534AB7', fontWeight: 800 }}>
                  ¿Cuáles raíces forman esta palabra?
                </p>
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--ink)', marginBottom: '0.25rem' }}>{q.compound.hangul}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{q.compound.romanization}</div>
                </div>
              </>
            )}

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {q.options.map((opt, i) => {
                const isChosen  = chosen === opt;
                const isCorrect = opt === q.correct;
                let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', col = 'var(--ink)';
                if (chosen) {
                  if (isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; col = '#059669'; }
                  else if (isChosen) { bg = 'rgba(220,38,38,0.08)'; border = '1.5px solid #dc2626'; col = '#dc2626'; }
                }

                if (q.type === 'compound-to-parts') {
                  // render as pair of small blocks
                  const [pid0, pid1] = opt.split('|');
                  const pr0 = getRootById(pid0);
                  const pr1 = getRootById(pid1);
                  if (!pr0 || !pr1) return null;
                  return (
                    <button key={opt} onClick={() => answer(opt)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.6rem 0.85rem', borderRadius: 12,
                        background: bg, border, cursor: chosen ? 'default' : 'pointer',
                        fontFamily: 'inherit', transition: 'all 0.15s', justifyContent: 'flex-start',
                      }}
                    >
                      {chosen && isCorrect && <span style={{ color: '#059669', fontWeight: 800, marginRight: '0.25rem' }}>✓</span>}
                      {chosen && isChosen && !isCorrect && <span style={{ color: '#dc2626', fontWeight: 800, marginRight: '0.25rem' }}>✗</span>}
                      <RootBlock root={pr0} size="sm" />
                      <span style={{ color: 'var(--muted)', fontWeight: 700 }}>+</span>
                      <RootBlock root={pr1} size="sm" />
                      <span style={{ fontSize: '0.8rem', color: col, fontWeight: 600, marginLeft: '0.25rem' }}>
                        {pr0.meaning} + {pr1.meaning}
                      </span>
                    </button>
                  );
                }

                // parts-to-meaning: text option
                return (
                  <button key={opt} onClick={() => answer(opt)}
                    style={{
                      padding: '0.7rem 0.95rem', borderRadius: 10,
                      background: bg, border, color: col,
                      fontWeight: 600, fontSize: '0.9rem', cursor: chosen ? 'default' : 'pointer',
                      fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s',
                    }}
                  >
                    {chosen && isCorrect && '✓ '}{chosen && isChosen && !isCorrect && '✗ '}{opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback + next */}
            {chosen && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{
                  padding: '0.7rem 0.9rem', borderRadius: 10, fontSize: '0.83rem', lineHeight: 1.55,
                  background: chosen === q.correct ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.06)',
                  border: `1px solid ${chosen === q.correct ? '#05966933' : '#dc262633'}`,
                  color: 'var(--ink)',
                }}>
                  {chosen === q.correct
                    ? `✅ ¡Correcto! ${q.compound.explanation}`
                    : `❌ Era: ${q.compound.hangul} (${q.compound.meaning}). ${q.compound.explanation}`
                  }
                </div>
                <button onClick={next} className="btn btn-sm"
                  style={{ background: '#534AB7', borderColor: '#534AB7', fontSize: '0.9rem' }}>
                  {currentIdx + 1 < questions.length ? 'Siguiente →' : 'Ver resultado'}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: 'combine', label: '🔀 Combinar',  desc: 'Toca dos raíces y descubre si forman una palabra' },
  { id: 'family',  label: '🌳 Familias',  desc: 'Explora todas las palabras que comparte una raíz' },
  { id: 'quiz',    label: '🧠 Quiz',      desc: '10 preguntas para poner a prueba lo aprendido' },
];

export default function KoreanCompounds({ addXp = () => {} }: { addXp?: (n: number) => void }) {
  const [mode, setMode]       = useState<Mode>('combine');
  const [showIntro, setShowIntro] = useState(true);

  const slideProps = {
    initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 }, transition: { duration: 0.22, ease: 'easeOut' as const },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* SEO / intro section */}
      {showIntro && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{
            borderRadius: 16, padding: '1.4rem 1.5rem', position: 'relative',
            background: 'linear-gradient(135deg, rgba(5,150,105,0.08) 0%, rgba(83,74,183,0.06) 100%)',
            border: '1.5px solid rgba(5,150,105,0.2)',
          }}
        >
          <button onClick={() => setShowIntro(false)} style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem',
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--muted)',
          }}>✕</button>

          <p style={{ margin: '0 0 0.4rem', fontSize: '0.72rem', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#059669', fontWeight: 800 }}>
            El secreto del vocabulario coreano
          </p>
          <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem', fontWeight: 900, color: 'var(--ink)', lineHeight: 1.3 }}>
            Las palabras compuestas — <span style={{ color: '#059669' }}>합성어</span>
          </h2>
          <p style={{ margin: '0 0 1rem', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65 }}>
            En coreano, puedes combinar dos palabras sencillas para crear una nueva.
            Una vez aprendes las raíces, tu vocabulario se <strong style={{ color: 'var(--ink)' }}>multiplica solo</strong>.
          </p>

          {/* Examples strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              { a: '눈 (ojo)', b: '물 (agua)', r: '👁️+💧 = 눈물 lágrimas' },
              { a: '손 (mano)', b: '가락 (dedo)', r: '✋+〽️ = 손가락 dedo' },
              { a: '불 (fuego)', b: '고기 (carne)', r: '🔥+🥩 = 불고기 bulgogi' },
            ].map((ex, i) => (
              <div key={i} style={{
                padding: '0.5rem 0.85rem', borderRadius: 10,
                background: 'var(--bg)', border: '1px solid var(--line-soft)',
                fontSize: '0.8rem', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}>
                <span style={{ color: 'var(--muted)' }}>{ex.a}</span>
                <span style={{ fontWeight: 700 }}>+</span>
                <span style={{ color: 'var(--muted)' }}>{ex.b}</span>
                <span style={{ fontWeight: 900, color: '#059669' }}>→</span>
                <span style={{ fontWeight: 800 }}>{ex.r}</span>
              </div>
            ))}
          </div>

          <p style={{ margin: '0.85rem 0 0', fontSize: '0.78rem', color: 'var(--muted)' }}>
            Tenemos <strong>{ROOTS.length} raíces</strong> y <strong>{COMPOUNDS.length} palabras compuestas</strong> para explorar. ¡Empieza combinando!
          </p>
        </motion.div>
      )}

      {/* Mode selector */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              padding: '0.55rem 1rem', borderRadius: 10, fontFamily: 'inherit',
              background: mode === m.id ? '#059669' : 'var(--bg)',
              border: `2px solid ${mode === m.id ? '#059669' : 'var(--line-soft)'}`,
              color: mode === m.id ? '#fff' : 'var(--ink)',
              fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.15s',
            }}
            title={m.desc}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Mode content */}
      <AnimatePresence mode="wait">
        {mode === 'combine' && (
          <motion.div key="combine" {...slideProps}>
            <CombineMode addXp={addXp} />
          </motion.div>
        )}
        {mode === 'family' && (
          <motion.div key="family" {...slideProps}>
            <FamilyMode />
          </motion.div>
        )}
        {mode === 'quiz' && (
          <motion.div key="quiz" {...slideProps}>
            <QuizMode addXp={addXp} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
