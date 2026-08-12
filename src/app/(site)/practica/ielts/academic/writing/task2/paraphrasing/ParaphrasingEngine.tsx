'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { placeOption } from '@/lib/practica/shuffle-options';
import { ENGINE_DRILLS } from './paraphrasing-engine-data';
import styles from '../introduccion/page.module.css';

/**
 * El motor progresivo de paráfrasis: doce ejercicios en tres niveles.
 *
 * Nivel 1 nombra la técnica, nivel 2 elige la mejor paráfrasis, nivel 3 diagnostica una
 * rota. Los tres usan frases que NO aparecen en ninguna de las cinco lecciones: es la
 * corrección del defecto que tenían las ocho unidades de Task 1, donde el motor preguntaba
 * por la frase que la lección acababa de imprimir.
 *
 * El reparto de la respuesta correcta lo hace `placeOption` por bloques, con una semilla que
 * incluye el nivel y el índice. Sin el índice en la semilla, las doce preguntas de una serie
 * reciben la MISMA permutación de distractores, y en `procesos` esa permutación resultó ser
 * la identidad: los tres distractores salían siempre en el orden en que estaban escritos.
 */

export default function ParaphrasingEngine() {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const items = useMemo(() => ENGINE_DRILLS.filter((item) => item.level === level), [level]);
  const current = items[index % items.length];

  const displayed = useMemo(
    () => placeOption(current.options, current.correct, `task2-paraphrasing-nivel-${level}`, index),
    [current, level, index],
  );

  const isCorrect = selected === displayed.correct;
  const last = index === items.length - 1;

  function chooseLevel(value: 1 | 2 | 3) {
    setLevel(value); setIndex(0); setSelected(null); setChecked(false);
  }

  return <section aria-labelledby="paraphrasing-engine" className={styles.section}>
    <div className={styles.sectionHeading}>
      <p className={styles.kicker}>WeLearn progressive engine</p>
      <h2 id="paraphrasing-engine">Practise all five techniques together</h2>
      <p>
        None of these sentences appears in the five lessons, so no model answer above gives one away.
        Name the technique first, then choose the strongest paraphrase, then diagnose a broken one —
        which is the skill you actually need when you reread your own introduction.
      </p>
    </div>

    {/* `data-level` y `data-option` existen para que las pruebas puedan leer la permutación
        de opciones sin depender de los nombres con hash del módulo CSS. Sin un gancho
        estable, el localizador acaba siendo más frágil que la propiedad que quiere probar, y
        un localizador vacío pasa sin haber mirado nada. */}
    <div className={styles.promptChoiceGrid}>
      {([1, 2, 3] as const).map((value) => (
        <button key={value} type="button" aria-pressed={level === value} data-level={value}
          onClick={() => chooseLevel(value)}
          className={`${styles.promptChoice} ${level === value ? styles.selected : ''}`}>
          <strong>Level {value}</strong>
          <p>{value === 1 ? 'Name the technique' : value === 2 ? 'Choose the strongest paraphrase' : 'Diagnose the broken one'}</p>
        </button>
      ))}
    </div>

    <article className={styles.examplePanel}>
      <div className={styles.workedBadge}>{current.title} · Exercise {index + 1} of {items.length}</div>

      <p className={styles.exercisePrompt}><strong>Original:</strong> {current.original}</p>
      {current.rewrite && <p className={styles.reviewDraft}><strong>Rewrite:</strong> {current.rewrite}</p>}
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
