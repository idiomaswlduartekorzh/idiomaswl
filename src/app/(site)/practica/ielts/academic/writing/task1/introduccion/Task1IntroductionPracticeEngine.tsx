'use client';

import { useMemo, useState } from 'react';
import { placeOption } from '@/lib/practica/shuffle-options';
import { CHART_OF, KIND_LABEL } from './introduction-data';
import { CHOICE_DRILLS, CLOZE_DRILLS, PRODUCTION_DRILLS } from './introduction-drills';
import type { ChoiceDrill, ClozeDrill, Option } from './introduction-drills';

/**
 * El motor de la introducción, después de la auditoría del 12 de agosto de 2026.
 *
 * Lo que se arregló, y por qué:
 *
 *   1. **Los ejercicios usaban los gráficos que la lección ya tenía resueltos.** Diez de las
 *      once respuestas estaban impresas arriba, cinco palabra por palabra. Ahora los doce
 *      ejercicios salen de `introduction-drills.ts`, colgados de las paráfrasis marcadas
 *      `worked: false`, que la lección no enseña.
 *   2. **Se podía pulsar «Check answer» con huecos vacíos.** `canCheck` miraba
 *      `answers.length`, y `answers` se llenaba por índice: elegir primero el tercer hueco
 *      dejaba `[vacío, vacío, 'x']`, con longitud 3. Al revés, elegir solo el primero
 *      bloqueaba el botón sin decir por qué. Ahora se cuentan los huecos resueltos y se
 *      anuncia cuántos faltan.
 *   3. **Una sola explicación para las cuatro opciones.** Ahora cada opción lleva la suya, y
 *      salen todas al comprobar: también las que no elegiste, que es donde se aprende.
 *   4. **La respuesta correcta no se enseñaba al fallar.** Ahora se enseña, junto a la
 *      paráfrasis modelo y a las sustituciones que hace.
 *   5. **Sesgo de posición:** en los huecos, la respuesta buena era la tercera opción una vez
 *      de doce (6/5/1). Ahora la reparte `placeOption`.
 *   6. **Español en pantalla** («Enunciado», «Bloque 1») dentro de contenido de IELTS.
 */

const C = '#0f3d8c';

type Level = {
  title: string;
  short: string;
  tag: string;
  kind: 'cloze' | 'choice';
  items: (ClozeDrill | ChoiceDrill)[];
};

const LEVELS: Level[] = [
  { title: 'Level 1 · Build the paraphrase', short: 'Build the paraphrase', tag: 'Word by word', kind: 'cloze', items: CLOZE_DRILLS },
  { title: 'Level 2 · Choose an aligned introduction', short: 'Choose an aligned introduction', tag: 'Precision and coverage', kind: 'choice', items: CHOICE_DRILLS },
  { title: 'Level 3 · Review the whole answer', short: 'Review the whole answer', tag: 'Spot what was added', kind: 'choice', items: PRODUCTION_DRILLS },
];

function VisualFrame({ drill }: { drill: ClozeDrill | ChoiceDrill }) {
  const Chart = CHART_OF[drill.source.kind];
  return (
    <div style={{ display: 'grid', gap: '0.8rem' }}>
      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.85rem', overflow: 'hidden' }}>
        <p style={{ margin: '0 0 0.55rem', color: C, fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase' }}>Practice visual · {KIND_LABEL[drill.source.kind]}</p>
        <Chart variant={drill.source.variant} />
      </div>
      <div style={{ padding: '0.9rem 1rem', borderLeft: `3px solid ${C}`, background: `${C}08`, borderRadius: 10 }}>
        <p style={{ margin: '0 0 0.3rem', color: C, fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase' }}>The prompt</p>
        <p style={{ margin: 0, lineHeight: 1.65, fontStyle: 'italic', color: 'var(--ink)' }}>&ldquo;{drill.source.prompt}&rdquo;</p>
      </div>
    </div>
  );
}

/** Las explicaciones de todas las opciones, marcando la correcta y la que se eligió. */
function WhyList({ options, correct, chosen }: { options: Option[]; correct: number; chosen: number | null }) {
  return (
    <ul style={{ listStyle: 'none', margin: '0.6rem 0 0', padding: 0, display: 'grid', gap: '0.45rem' }}>
      {options.map((option, index) => {
        const good = index === correct;
        const mine = index === chosen;
        return (
          <li key={option.text} style={{ padding: '0.55rem 0.7rem', borderRadius: 8, border: `1px solid ${good ? 'rgba(5,150,105,0.3)' : 'var(--line-soft)'}`, background: good ? 'rgba(5,150,105,0.06)' : 'var(--bg)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.66rem', fontWeight: 800, color: good ? '#059669' : 'var(--muted)', textTransform: 'uppercase' }}>
              {String.fromCharCode(65 + index)}{good ? ' · correct' : ''}{mine && !good ? ' · you chose this' : ''}
            </span>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.86rem' }}>{option.why}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default function Task1IntroductionPracticeEngine() {
  const [level, setLevel] = useState(0);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [scores, setScores] = useState<number[]>([0, 0, 0]);
  /** Ejercicios ya puntuados, para que repetir el motor no infle el marcador por encima del total. */
  const [done, setDone] = useState<Set<string>>(new Set());

  const currentLevel = LEVELS[level];
  const drill = currentLevel.items[index];
  const isCloze = currentLevel.kind === 'cloze';
  const cloze = isCloze ? (drill as ClozeDrill) : null;
  const choice = isCloze ? null : (drill as ChoiceDrill);
  const key = `${level}-${index}`;

  /**
   * El reparto de la respuesta, estable entre servidor y navegador. Antes la correcta se
   * escribía primera y se pintaba en ese orden: en los huecos era la tercera opción una sola
   * vez de doce.
   */
  const gaps = useMemo(
    () => (cloze ? cloze.gaps.map((gap, slot) => placeOption(gap.options, gap.options.findIndex((option) => option.text === gap.answer), `task1-intro-cloze-${index}`, slot)) : []),
    [cloze, index],
  );
  const choices = useMemo(
    () => (choice ? placeOption(choice.options, choice.correct, `task1-intro-nivel-${level}`, index) : null),
    [choice, level, index],
  );

  const resolved = cloze ? cloze.gaps.filter((_, slot) => answers[slot]).length : 0;
  const missing = cloze ? cloze.gaps.length - resolved : 0;
  const canCheck = isCloze ? missing === 0 : selected !== null;
  const isCorrect = isCloze
    ? cloze!.gaps.every((gap, slot) => answers[slot] === gap.answer)
    : selected === choices!.correct;

  function resetQuestion() {
    setAnswers([]);
    setSelected(null);
    setChecked(false);
  }

  function checkAnswer() {
    if (checked || !canCheck) return;
    if (isCorrect && !done.has(key)) {
      setScores((old) => old.map((score, i) => (i === level ? score + 1 : score)));
      setDone((old) => new Set(old).add(key));
    }
    setChecked(true);
  }

  function next() {
    if (index < currentLevel.items.length - 1) {
      setIndex((old) => old + 1);
    } else {
      setLevel((old) => (old + 1) % LEVELS.length);
      setIndex(0);
    }
    resetQuestion();
  }

  return (
    <section aria-labelledby="task1-intro-practice" style={{ marginTop: '2.5rem' }}>
      <p className="eyebrow" style={{ marginBottom: '0.65rem' }}><span className="ink-line" />Progressive engine</p>
      <h2 id="task1-intro-practice" style={{ margin: '0 0 0.35rem', color: 'var(--ink)', fontSize: '1.45rem' }}>Practise the introduction by level</h2>
      <p style={{ margin: '0 0 1.25rem', color: 'var(--muted)', lineHeight: 1.65 }}>
        These twelve visuals are the ones the lesson above did not work through, so the answer is not printed anywhere on this page. Each level trains a different decision: first choose the words, then check that the sentence covers the whole prompt, and finally spot what a good-sounding introduction has added.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {LEVELS.map((item, i) => (
          <button key={item.title} type="button" onClick={() => { setLevel(i); setIndex(0); resetQuestion(); }} aria-pressed={level === i} className="btn btn-sm" style={{ flex: '1 1 180px', minWidth: 0, whiteSpace: 'normal', overflowWrap: 'anywhere', textAlign: 'left', opacity: level === i ? 1 : 0.68 }}>
            <strong>{i + 1}. {item.short}</strong><br /><span style={{ fontSize: '0.72rem', opacity: 0.8 }}>{item.tag} · {scores[i]}/{item.items.length}</span>
          </button>
        ))}
      </div>

      <div className="wl-card" style={{ padding: '1.2rem', borderTop: `4px solid ${C}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div>
            <p style={{ margin: 0, fontWeight: 800, color: C, fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase' }}>{currentLevel.title}</p>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.82rem' }}>Exercise {index + 1} of {currentLevel.items.length}</p>
          </div>
          <span style={{ fontFamily: 'var(--mono)', color: 'var(--muted)', fontSize: '0.78rem' }}>{Math.round(((index + 1) / currentLevel.items.length) * 100)}%</span>
        </div>

        <VisualFrame drill={drill} />

        {cloze ? (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ margin: '0 0 0.7rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>Complete the introduction. Every blank has one option that works and two that fail for a reason you will see when you check.</p>
            <div style={{ padding: '0.85rem', background: 'var(--bg-2)', borderRadius: 10, lineHeight: 2.2, color: 'var(--ink)' }}>
              <span>{cloze.before} </span>
              {gaps.map((gap, slot) => (
                <select
                  key={cloze.gaps[slot].answer}
                  value={answers[slot] ?? ''}
                  onChange={(event) => setAnswers((old) => { const copy = [...old]; copy[slot] = event.target.value || null; return copy; })}
                  aria-label={`Blank ${slot + 1} of ${cloze.gaps.length}`}
                  disabled={checked}
                  style={{ margin: '0 0.25rem', padding: '0.4rem 0.55rem', border: `1px solid ${checked ? (answers[slot] === cloze.gaps[slot].answer ? '#059669' : '#dc2626') : `${C}55`}`, borderRadius: 7, background: 'var(--bg)', color: 'var(--ink)', maxWidth: '100%' }}
                >
                  <option value="">choose…</option>
                  {gap.options.map((option) => <option key={option.text} value={option.text}>{option.text}</option>)}
                </select>
              ))}
              <span> {cloze.after}</span>
            </div>
          </div>
        ) : choices ? (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ margin: '0 0 0.7rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>{choice!.question}</p>
            <div style={{ display: 'grid', gap: '0.55rem' }}>
              {choices.options.map((option, i) => (
                <button key={option.text} type="button" onClick={() => !checked && setSelected(i)} aria-pressed={selected === i} disabled={checked} style={{ textAlign: 'left', padding: '0.8rem 0.9rem', borderRadius: 9, border: `1px solid ${checked && i === choices.correct ? '#059669' : checked && i === selected ? '#dc2626' : selected === i ? C : 'var(--line-soft)'}`, background: selected === i ? `${C}10` : 'var(--bg)', color: 'var(--ink)', cursor: checked ? 'default' : 'pointer', lineHeight: 1.55 }}>
                  {String.fromCharCode(65 + i)}. {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
          <button type="button" className="btn btn-sm" onClick={checkAnswer} disabled={!canCheck || checked}>
            {checked ? (isCorrect ? 'Correct' : 'See what happened') : 'Check answer'}
          </button>
          {/* Ningún botón bloqueado sin decir por qué. */}
          {!checked && !canCheck && (
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
              {isCloze ? `${missing} blank${missing === 1 ? '' : 's'} still to fill` : 'Choose an option first'}
            </span>
          )}
          {checked && <button type="button" className="btn btn-sm" onClick={next}>{index < currentLevel.items.length - 1 ? 'Next exercise →' : level < LEVELS.length - 1 ? 'Next level →' : 'Start again →'}</button>}
        </div>

        {checked && (
          <div role="status" style={{ marginTop: '0.85rem', padding: '0.85rem 1rem', borderRadius: 10, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(217,119,6,0.08)', border: `1px solid ${isCorrect ? 'rgba(5,150,105,0.22)' : 'rgba(217,119,6,0.22)'}` }}>
            <strong style={{ color: isCorrect ? '#059669' : '#b45309' }}>{isCorrect ? 'Good observation.' : 'Not yet.'}</strong>

            {cloze ? (
              <>
                {/* La respuesta correcta se enseña siempre, también al fallar. */}
                <p style={{ margin: '0.4rem 0 0', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                  The full sentence reads: <strong style={{ color: 'var(--ink)' }}>{cloze.before} {cloze.gaps.map((gap) => gap.answer).join(' ')} {cloze.after}</strong>
                </p>
                {cloze.gaps.map((gap, slot) => (
                  <div key={gap.answer} style={{ marginTop: '0.6rem' }}>
                    <p style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: '0.66rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>Blank {slot + 1}</p>
                    <WhyList options={gaps[slot].options} correct={gaps[slot].options.findIndex((option) => option.text === gap.answer)} chosen={gaps[slot].options.findIndex((option) => option.text === answers[slot])} />
                  </div>
                ))}
              </>
            ) : (
              <WhyList options={choices!.options} correct={choices!.correct} chosen={selected} />
            )}

            <div style={{ marginTop: '0.8rem', padding: '0.7rem 0.85rem', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
              <p style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: '0.66rem', fontWeight: 800, color: C, textTransform: 'uppercase' }}>Another way to say it</p>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--ink)', lineHeight: 1.6, fontSize: '0.88rem' }}>{drill.source.alternative}</p>
              <p style={{ margin: '0.4rem 0 0', color: C, fontFamily: 'var(--mono)', fontSize: '0.7rem', lineHeight: 1.45 }}>{drill.source.swaps}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
