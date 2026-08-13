'use client';

import { useState } from 'react';
import { CheckCircle2, Eye, LockKeyhole, RotateCcw } from 'lucide-react';
import { countWords, type GuidedExercise } from './skill-blueprint';
import styles from '../task2/introduccion/page.module.css';

/**
 * Bloque 3 del blueprint: el ejercicio guiado.
 *
 * Es el escalón que faltaba. Un ejemplo resuelto lo hace todo por ti; el motor no te ayuda en
 * nada. Aquí escribes tú, por pasos, y el modelo está detrás de un botón que no se desbloquea
 * hasta que hay algo escrito.
 *
 * TRES DECISIONES QUE PARECEN DETALLES Y NO LO SON
 *
 *  · El botón se bloquea por número de palabras. Sin ese freno, esto es un ejemplo resuelto
 *    partido en trozos: se pulsa «ver modelo» cuatro veces seguidas y no se ha escrito nada.
 *  · Los pasos se abren en orden. El paso 3 de una paráfrasis no tiene sentido antes del 2, y
 *    dejarlos todos abiertos convierte el andamio en un formulario.
 *  · Comparar NO puntúa. No hay acierto ni fallo: hay tu versión, la del modelo, y una
 *    explicación de qué hace la del modelo. Puntuar un texto libre exigiría leerlo, y esta
 *    página no lee nada.
 *
 * El área de escritura va sin corrector —`spellCheck={false}`, y sin autocorrección ni
 * mayúsculas automáticas— porque en el examen no hay ninguna de las tres. Lo vigila la
 * compuerta `check:ielts-task2`.
 */

export default function GuidedPractice({
  exercise,
  kicker = 'Now you try · with the scaffolding on',
  heading = 'Build it one step at a time',
}: {
  exercise: GuidedExercise;
  kicker?: string;
  heading?: string;
}) {
  const [written, setWritten] = useState<string[]>(() => exercise.steps.map(() => ''));
  const [revealed, setRevealed] = useState<boolean[]>(() => exercise.steps.map(() => false));

  /** Un paso está abierto si es el primero, o si el anterior ya se comparó con su modelo. */
  const isOpen = (index: number) => index === 0 || revealed[index - 1];
  const allDone = revealed.every(Boolean);

  function reset() {
    setWritten(exercise.steps.map(() => ''));
    setRevealed(exercise.steps.map(() => false));
  }

  return (
    <section id="guided" className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.kicker}>{kicker}</p>
        <h2>{heading}</h2>
        <p>{exercise.goal}</p>
      </div>

      <div className={styles.guidedWorkshop}>
        <div className={styles.workshopHeader}>
          <div><span>The material</span><h3>{exercise.brief}</h3></div>
          <button type="button" className={styles.iconButton} onClick={reset} title="Start again" aria-label="Start again">
            <RotateCcw size={18} />
          </button>
        </div>

        {exercise.steps.map((step, index) => {
          const open = isOpen(index);
          const enough = countWords(written[index]) >= step.minWords;
          const missing = step.minWords - countWords(written[index]);

          return (
            <div key={step.instruction} className={`${styles.workshopStep} ${open ? '' : styles.stepLocked}`} data-step={index}>
              <div className={styles.stepLabel}>
                {revealed[index] ? <CheckCircle2 size={20} /> : open ? <Eye size={20} /> : <LockKeyhole size={20} />}
                <strong>Step {index + 1}</strong><span>{step.instruction}</span>
              </div>

              {open && <>
                <p className={styles.exerciseInstruction}>{step.hint}</p>

                <label className={styles.guidedField}>
                  <strong>Your version</strong>
                  <textarea
                    spellCheck={false} autoCorrect="off" autoCapitalize="off" rows={3}
                    value={written[index]}
                    onChange={(event) => {
                      const value = event.target.value;
                      setWritten((current) => current.map((item, i) => (i === index ? value : item)));
                    }}
                    placeholder={step.placeholder}
                  />
                  <small>{countWords(written[index])} words · minimum {step.minWords}</small>
                </label>

                <div className={styles.workshopActions}>
                  <button type="button" disabled={!enough || revealed[index]}
                    onClick={() => setRevealed((current) => current.map((item, i) => (i === index ? true : item)))}>
                    <Eye size={17} /> Compare with the model
                  </button>
                  {!enough && <p className={styles.unlockHint}>
                    {missing} more word{missing === 1 ? '' : 's'} before you can compare. Writing it yourself first is the whole exercise.
                  </p>}
                </div>

                {revealed[index] && <div className={styles.bodyModelReveal} aria-live="polite">
                  <span>The WeLearn model · not a correction of yours</span>
                  <div className={styles.completeParagraph}><p>{step.model}</p></div>
                  <p className={styles.mistakeNote}><strong>What it does:</strong> {step.why}</p>
                </div>}
              </>}
            </div>
          );
        })}

        {allDone && <div className={`${styles.feedback} ${styles.feedbackCorrect}`} role="status" aria-live="polite">
          <CheckCircle2 size={20} />
          <div>
            <strong>That is the whole move, end to end.</strong>
            <div className={styles.completeParagraph}><p>{exercise.result}</p></div>
            <button type="button" className={styles.secondaryButton} onClick={reset}>
              <RotateCcw size={15} /> Try it again from the start
            </button>
          </div>
        </div>}
      </div>
    </section>
  );
}
