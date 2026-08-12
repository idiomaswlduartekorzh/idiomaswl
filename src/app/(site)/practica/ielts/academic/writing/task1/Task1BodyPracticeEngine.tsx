'use client';

import { useMemo, useState } from 'react';
import { placeOption } from '@/lib/practica/shuffle-options';
import Task1ApprovedMapVisual from './Task1ApprovedMapVisual';
import Task1ApprovedProcessVisual from './Task1ApprovedProcessVisual';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSPieChartVisual,
  IELTSTableVisual,
} from './Task1VisualLab';
import { DRILLS, promptOf } from './body-drills';
import type { Body, Option } from './body-drills';

/**
 * El motor de Body 1 y Body 2, después de la auditoría del 12 de agosto de 2026.
 *
 *   1. **Practicaba sobre los seis gráficos que la lección resuelve encima**, y el motor va
 *      dentro de esa misma lección: 5 de las 12 respuestas solapaban un párrafo modelo
 *      impreso a un palmo, una palabra por palabra. Ahora usa otros seis.
 *   2. **Una explicación para las cuatro opciones.** Ahora cada una lleva la suya.
 *   3. **`rotate()` desplazaba en ciclo** con `shift = [2,0,3,1][seed % 4]`. Una rotación
 *      reparte bien las letras pero conserva el orden relativo de los distractores, así que
 *      reconocer uno sitúa a los demás. Reparte `placeOption`.
 *   4. **«Next exercise →» también en el último**, que daba la vuelta en silencio y nadie
 *      sabía que el nivel se había acabado.
 */

const C = '#0f3d8c';

const VISUALS = {
  line: IELTSLineGraphVisual,
  bar: IELTSBarChartVisual,
  pie: IELTSPieChartVisual,
  table: IELTSTableVisual,
  process: Task1ApprovedProcessVisual,
  map: Task1ApprovedMapVisual,
} as const;

const LEVEL_NAME = { 1: 'Find the paragraph job', 2: 'Group the evidence', 3: 'Build the sentence' } as const;

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

export default function Task1BodyPracticeEngine({ body }: { body: Body }) {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const questions = useMemo(() => DRILLS[body].filter((drill) => drill.level === level), [body, level]);
  const drill = questions[index % questions.length];
  const VisualComponent = VISUALS[drill.visual];

  const rendered = useMemo(
    () => placeOption(drill.options, drill.correct, `task1-body-${body}-nivel-${level}`, index),
    [drill, body, level, index],
  );
  const correct = selected === rendered.correct;
  const last = index === questions.length - 1;

  function changeLevel(nextLevel: 1 | 2 | 3) {
    setLevel(nextLevel);
    setIndex(0);
    setSelected(null);
    setChecked(false);
  }

  function next() {
    setIndex((current) => (current + 1) % questions.length);
    setSelected(null);
    setChecked(false);
  }

  return (
    <section aria-labelledby={`task1-body-${body}-engine`} style={{ marginTop: '2.5rem' }}>
      <p className="eyebrow"><span className="ink-line" />WeLearn progressive engine</p>
      <h2 id={`task1-body-${body}-engine`} style={{ margin: '0 0 0.4rem', fontSize: '1.45rem' }}>Practise Body {body} by level</h2>
      <p style={{ margin: '0 0 1.1rem', color: 'var(--muted)', lineHeight: 1.65 }}>
        {body === 1
          ? 'Move from recognising a useful group to selecting evidence and writing the first detail paragraph. '
          : 'Move from identifying a missing second group to writing a connected contrast that completes the response. '}
        These visuals are not the ones worked through above, so no model paragraph on this page gives the answer away.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {([1, 2, 3] as const).map((item) => (
          <button key={item} type="button" className="btn btn-sm" aria-pressed={level === item} onClick={() => changeLevel(item)} style={{ flex: '1 1 170px', textAlign: 'left', opacity: level === item ? 1 : 0.68 }}>
            <strong>Level {item}</strong><br />
            <span style={{ fontSize: '0.72rem' }}>{LEVEL_NAME[item]}</span>
          </button>
        ))}
      </div>

      <div className="wl-card" style={{ padding: '1.15rem', borderTop: `4px solid ${C}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', alignItems: 'start' }}>
          <div style={{ padding: '0.65rem', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden' }}>
            <VisualComponent variant={drill.variant} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.85rem', color: C, fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}>
              <span>Level {level} · {drill.visual}</span><span>Exercise {index + 1} of {questions.length}</span>
            </div>

            {/* El enunciado del gráfico sale de la tabla común, no se escribe aquí. */}
            <p style={{ margin: 0, padding: '0.8rem 0.9rem', borderLeft: `3px solid ${C}`, background: 'rgba(15,61,140,0.05)', lineHeight: 1.55, fontStyle: 'italic' }}>&ldquo;{promptOf(drill)}&rdquo;</p>
            <p style={{ margin: '0.6rem 0 0', color: 'var(--ink-2)', lineHeight: 1.6, fontSize: '0.9rem' }}>{drill.situation}</p>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--ink)', lineHeight: 1.6, fontWeight: 700 }}>{drill.question}</p>

            <div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.9rem' }}>
              {rendered.options.map((option, optionIndex) => (
                <button key={option.text} type="button" onClick={() => !checked && setSelected(optionIndex)} aria-pressed={selected === optionIndex} disabled={checked} style={{ textAlign: 'left', padding: '0.8rem 0.9rem', borderRadius: 8, border: `1.5px solid ${checked && optionIndex === rendered.correct ? '#059669' : checked && selected === optionIndex ? '#dc2626' : selected === optionIndex ? C : 'var(--line-soft)'}`, background: selected === optionIndex ? 'rgba(15,61,140,0.06)' : 'var(--bg)', color: 'var(--ink)', cursor: checked ? 'default' : 'pointer', lineHeight: 1.55 }}>
                  {String.fromCharCode(65 + optionIndex)}. {option.text}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button type="button" className="btn btn-sm" onClick={() => setChecked(true)} disabled={selected === null || checked}>
                {checked ? (correct ? 'Correct' : 'See what happened') : 'Check answer'}
              </button>
              {/* Ningún botón bloqueado sin decir por qué. */}
              {!checked && selected === null && <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Choose an option first</span>}
              {checked && <button type="button" className="btn btn-sm" onClick={next}>{last ? 'Start this level again →' : 'Next exercise →'}</button>}
            </div>

            {checked && (
              <div role="status" style={{ marginTop: '0.85rem', padding: '0.8rem 0.9rem', borderRadius: 8, background: correct ? 'rgba(5,150,105,0.08)' : 'rgba(217,119,6,0.08)', border: `1px solid ${correct ? 'rgba(5,150,105,0.22)' : 'rgba(217,119,6,0.22)'}` }}>
                <strong style={{ color: correct ? '#059669' : '#b45309' }}>{correct ? 'Good choice.' : 'Not yet.'}</strong>
                <WhyList options={rendered.options} correct={rendered.correct} chosen={selected} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
