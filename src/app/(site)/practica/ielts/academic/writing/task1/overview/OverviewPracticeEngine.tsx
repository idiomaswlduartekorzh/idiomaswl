'use client';

import { useMemo, useState } from 'react';
import { placeOption } from '@/lib/practica/shuffle-options';
import { CHART_OF, KIND_LABEL } from './overview-data';
import { LEVELS } from './overview-drills';
import type { Option } from './overview-drills';

/**
 * El motor del overview, después de la auditoría del 12 de agosto de 2026.
 *
 *   1. **6 de las 15 respuestas estaban impresas en la lección**, encima del ejercicio, dos
 *      de ellas palabra por palabra. Los quince ejercicios practican ahora sobre los doce
 *      gráficos que la lección no resuelve.
 *   2. **Una explicación para las cuatro opciones.** Quien fallaba leía por qué la buena era
 *      buena, nunca por qué la suya era mala. Ahora cada opción lleva la suya y salen todas.
 *   3. **Rotación cíclica en vez de reparto.** `rotateOptions` desplazaba las opciones con
 *      `shift = [1,3,0,2][seed % 4]`: una rotación conserva el orden relativo de los
 *      distractores, así que reconocer uno sitúa a los demás. Ahora reparte `placeOption`,
 *      que baraja y asigna por bloques.
 *   4. **El marcador no tenía tope.** Al dar la segunda vuelta seguía sumando: 8/5 en un
 *      nivel de cinco ejercicios.
 */

const C = '#0f3d8c';

/** Las explicaciones de las cuatro opciones, marcando la correcta y la elegida. */
function WhyList({ options, correct, chosen }: { options: Option[]; correct: number; chosen: number | null }) {
  return (
    <ul style={{ listStyle: 'none', margin: '0.6rem 0 0', padding: 0, display: 'grid', gap: '0.45rem' }}>
      {options.map((option, index) => {
        const good = index === correct;
        return (
          <li key={option.text} style={{ padding: '0.55rem 0.7rem', borderRadius: 8, border: `1px solid ${good ? 'rgba(5,150,105,0.3)' : 'var(--line-soft)'}`, background: good ? 'rgba(5,150,105,0.06)' : 'var(--bg)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.66rem', fontWeight: 800, color: good ? '#059669' : 'var(--muted)', textTransform: 'uppercase' }}>
              {String.fromCharCode(65 + index)}{good ? ' · correct' : ''}{index === chosen && !good ? ' · you chose this' : ''}
            </span>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.86rem' }}>{option.why}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default function OverviewPracticeEngine() {
  const [level, setLevel] = useState(0);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [scores, setScores] = useState([0, 0, 0]);
  /** Ejercicios ya puntuados: repetir el motor no puede dejar el marcador en 8/5. */
  const [done, setDone] = useState<Set<string>>(new Set());

  const currentLevel = LEVELS[level];
  const drill = currentLevel.items[index];
  const Chart = CHART_OF[drill.source.kind];
  const key = `${level}-${index}`;

  const displayed = useMemo(
    () => placeOption(drill.options, drill.correct, `task1-overview-nivel-${level}`, index),
    [drill, level, index],
  );
  const correct = selected === displayed.correct;

  function reset() { setSelected(null); setChecked(false); }

  function check() {
    if (selected === null || checked) return;
    if (correct && !done.has(key)) {
      setScores((old) => old.map((score, i) => (i === level ? score + 1 : score)));
      setDone((old) => new Set(old).add(key));
    }
    setChecked(true);
  }

  function next() {
    if (index < currentLevel.items.length - 1) setIndex((old) => old + 1);
    else { setLevel((old) => (old + 1) % LEVELS.length); setIndex(0); }
    reset();
  }

  return (
    <section aria-labelledby="task1-overview-practice" style={{ marginTop: '2.5rem' }}>
      <p className="eyebrow"><span className="ink-line" />WeLearn progressive engine</p>
      <h2 id="task1-overview-practice" style={{ margin: '0 0 0.4rem', fontSize: '1.45rem' }}>Practise the overview by level</h2>
      <p style={{ margin: '0 0 1.1rem', color: 'var(--muted)', lineHeight: 1.65 }}>
        These twelve visuals are the ones the lesson above did not work through, so no answer is printed anywhere on this page. First detect the story, then check that your summary covers the whole visual, and finally choose between four versions that all sound reasonable.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {LEVELS.map((item, i) => (
          <button key={item.title} type="button" className="btn btn-sm" aria-pressed={level === i} onClick={() => { setLevel(i); setIndex(0); reset(); }} style={{ flex: '1 1 180px', textAlign: 'left', whiteSpace: 'normal', opacity: level === i ? 1 : 0.68 }}>
            <strong>{i + 1}. {item.title.split('·')[1]}</strong><br /><span style={{ fontSize: '0.72rem' }}>{scores[i]}/{item.items.length}</span>
          </button>
        ))}
      </div>

      <div className="wl-card" style={{ padding: '1.15rem', borderTop: `4px solid ${C}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
          <div>
            <p style={{ margin: 0, color: C, fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}>{currentLevel.title}</p>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.82rem' }}>{currentLevel.skill} · Exercise {index + 1} of {currentLevel.items.length}</p>
          </div>
          <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.76rem' }}>{KIND_LABEL[drill.source.kind]}</span>
        </div>

        <div style={{ padding: '0.7rem', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden' }}>
          <Chart variant={drill.source.variant} />
        </div>
        <p style={{ margin: '0.85rem 0 0', padding: '0.8rem 0.9rem', borderLeft: `3px solid ${C}`, background: 'rgba(15,61,140,0.05)', color: 'var(--ink)', lineHeight: 1.55, fontStyle: 'italic' }}>&ldquo;{drill.source.prompt}&rdquo;</p>
        <p style={{ margin: '0.7rem 0 0', color: 'var(--ink-2)', lineHeight: 1.6 }}>{drill.question}</p>

        <div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.9rem' }}>
          {displayed.options.map((option, i) => (
            <button key={option.text} type="button" onClick={() => !checked && setSelected(i)} aria-pressed={selected === i} disabled={checked} style={{ textAlign: 'left', padding: '0.8rem 0.9rem', borderRadius: 8, border: `1.5px solid ${checked && i === displayed.correct ? '#059669' : checked && selected === i ? '#dc2626' : selected === i ? C : 'var(--line-soft)'}`, background: selected === i ? 'rgba(15,61,140,0.06)' : 'var(--bg)', color: 'var(--ink)', cursor: checked ? 'default' : 'pointer', lineHeight: 1.55 }}>
              {String.fromCharCode(65 + i)}. {option.text}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
          <button type="button" className="btn btn-sm" onClick={check} disabled={selected === null || checked}>
            {checked ? (correct ? 'Correct' : 'See what happened') : 'Check answer'}
          </button>
          {/* Ningún botón bloqueado sin decir por qué. */}
          {!checked && selected === null && <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Choose an option first</span>}
          {checked && <button type="button" className="btn btn-sm" onClick={next}>{index === currentLevel.items.length - 1 ? 'Next level →' : 'Next exercise →'}</button>}
        </div>

        {checked && (
          <div role="status" style={{ marginTop: '0.85rem', padding: '0.8rem 0.9rem', borderRadius: 8, background: correct ? 'rgba(5,150,105,0.08)' : 'rgba(217,119,6,0.08)', border: `1px solid ${correct ? 'rgba(5,150,105,0.22)' : 'rgba(217,119,6,0.22)'}` }}>
            <strong style={{ color: correct ? '#059669' : '#b45309' }}>{correct ? 'Good observation.' : 'Not yet.'}</strong>
            <WhyList options={displayed.options} correct={displayed.correct} chosen={selected} />
            <div style={{ marginTop: '0.8rem', padding: '0.7rem 0.85rem', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
              <p style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: '0.66rem', fontWeight: 800, color: C, textTransform: 'uppercase' }}>A full overview for this visual</p>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.88rem' }}>{drill.source.model}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
