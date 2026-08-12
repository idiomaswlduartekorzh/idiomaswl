'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { placeOption } from '@/lib/practica/shuffle-options';
import { ENGINE_DRILLS } from './vocabulary-engine-data';
import styles from '../introduccion/page.module.css';

/**
 * El motor progresivo de vocabulario: doce ejercicios en tres niveles.
 *
 * Nivel 1 nombra la función, nivel 2 elige la palabra precisa, nivel 3 diagnostica la mal
 * elegida. Los tres usan frases que NO aparecen en ninguna de las ocho lecciones.
 *
 * El reparto de la correcta lo hace `placeOption` por bloques, con una semilla que incluye el
 * nivel y el índice. Sin el índice, las doce preguntas de una serie reciben la MISMA
 * permutación de distractores, y en `procesos` esa permutación resultó ser la identidad.
 */

export default function VocabularyEngine() {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const items = useMemo(() => ENGINE_DRILLS.filter((item) => item.level === level), [level]);
  const current = items[index % items.length];

  const displayed = useMemo(
    () => placeOption(current.options, current.correct, `task2-vocabulary-nivel-${level}`, index),
    [current, level, index],
  );

  const isCorrect = selected === displayed.correct;
  const last = index === items.length - 1;

  function chooseLevel(value: 1 | 2 | 3) {
    setLevel(value); setIndex(0); setSelected(null); setChecked(false);
  }

  return <section aria-labelledby="vocabulary-engine" className={styles.section}>
    <div className={styles.sectionHeading}>
      <p className={styles.kicker}>WeLearn progressive engine</p>
      <h2 id="vocabulary-engine">Practise all eight functions together</h2>
      <p>
        None of these sentences appears in the eight lessons, so no example above gives one away.
        Name the function first, then choose the precise version, then diagnose a word that is doing
        more work than the evidence allows — which is the skill you need when you reread your own draft.
      </p>
    </div>

    {/* `data-level` y `data-option` existen para que las pruebas puedan leer la permutación
        sin depender de los nombres con hash del módulo CSS. Sin un gancho estable, el
        localizador acaba siendo más frágil que la propiedad que quiere probar. */}
    <div className={styles.promptChoiceGrid}>
      {([1, 2, 3] as const).map((value) => (
        <button key={value} type="button" aria-pressed={level === value} data-level={value}
          onClick={() => chooseLevel(value)}
          className={`${styles.promptChoice} ${level === value ? styles.selected : ''}`}>
          <strong>Level {value}</strong>
          <p>{value === 1 ? 'Name the function' : value === 2 ? 'Choose the precise version' : 'Diagnose the wrong word'}</p>
        </button>
      ))}
    </div>

    <article className={styles.examplePanel}>
      <div className={styles.workedBadge}>{current.title} · Exercise {index + 1} of {items.length}</div>

      <p className={styles.exercisePrompt}>{current.sentence}</p>
      <p className={styles.exerciseInstruction}>{current.question}</p>

      <div className={styles.optionGrid}>
        {displayed.options.map((option, position) => (
          <button key={option.text} type="button" disabled={checked} data-option={position}
            onClick={() => !checked && setSelected(position)}
            aria-pressed={selected === position}
            className={`${styles.option} ${selected === position ? styles.selected : ''} ${checked && position === displayed.correct ? styles.correct : ''} ${checked && selected === position && position !== displayed.correct ? styles.incorrect : ''}`}>
            <span>{String.fromCharCode(65 + position)}</span>
            <div>{option.text}</div>
          </button>
        ))}
      </div>

      <div className={styles.workshopHeader}>
        <button type="button" className={styles.secondaryButton} disabled={selected === null || checked}
          onClick={() => setChecked(true)}>
          {checked ? (isCorrect ? 'Correct' : 'See what happened') : 'Check answer'}
        </button>
        {!checked && selected === null && <span className={styles.comparisonNote}>Choose an option first</span>}
        {checked && <button type="button" className={styles.secondaryButton}
          onClick={() => { setIndex((value) => (value + 1) % items.length); setSelected(null); setChecked(false); }}>
          {last ? 'Start this level again →' : 'Next exercise →'}
        </button>}
      </div>

      {checked && <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`} role="status" aria-live="polite">
        <CheckCircle2 size={20} />
        <div>
          <strong>{isCorrect ? 'Good work.' : 'Not this one.'}</strong>
          {/* Todas las opciones con SU motivo, no solo la elegida: es lo que distingue un
              ejercicio que enseña de uno que solo puntúa. */}
          <ul className={styles.optionGrid}>
            {displayed.options.map((option, position) => {
              const good = position === displayed.correct;
              return <li key={option.text} className={`${styles.legoBlock} ${good ? styles.correct : ''}`}>
                <strong>{String.fromCharCode(65 + position)}{good ? ' · correct' : ''}{position === selected && !good ? ' · you chose this' : ''}</strong>
                <p>{option.why}</p>
              </li>;
            })}
          </ul>
          <button type="button" className={styles.secondaryButton}
            onClick={() => { setSelected(null); setChecked(false); }}><RotateCcw size={15} /> Try this one again</button>
        </div>
      </div>}
    </article>
  </section>;
}
