'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, LockKeyhole, RotateCcw } from 'lucide-react';
import type { GuidedExample } from './introduction-data';
import { placeOption } from '@/lib/practica/shuffle-options';
import styles from './page.module.css';

/**
 * El taller que faltaba entre la guía de tipos de frase y el motor progresivo.
 *
 * Body 1, Body 2 y Conclusion tienen el suyo; introducción y revisión final, no. Nunca se
 * borró: no se llegó a construir. El salto era de leer seis definiciones abstractas a
 * producir una introducción entera, sin nada en medio.
 *
 * Sigue el método de David: la introducción responde cuatro preguntas en orden —hook,
 * paráfrasis, opinión y las dos premisas, muy cortas—. Los pasos van bloqueados, así que
 * nadie llega a escribir sin haber distinguido antes las funciones.
 *
 * LOS DISTRACTORES SON LAS OTRAS FUNCIONES DEL MISMO EJEMPLO, y eso es deliberado. Una
 * auditoría de los 205 ejercicios de opción de Task 2 encontró que en el 92,7 % TODOS los
 * distractores eran texto reciclado de otro ejercicio —los mismos rellenos repetidos hasta
 * 25 veces—, así que se acertaba reconociendo la frase vista, no entendiendo. Aquí eso no
 * puede pasar: cada opción es una frase real de ESTA introducción, y equivocarse enseña la
 * distinción concreta que falló. Confundir el hook con la paráfrasis es el error de verdad;
 * merece ser una opción, no un relleno.
 */

/** La parte afirmativa del enunciado, sin la instrucción final. Es la trampa de copiar. */
function promptStatement(prompt: string) {
  const parts = prompt.split(/(?<=[.?])\s+/u).filter(Boolean);
  const statement = parts.filter((part) => !part.trim().endsWith('?'));
  return (statement.length ? statement : parts).join(' ').trim();
}

type Step = { key: string; label: string; question: string; correct: string; options: string[]; why: string };

export default function IntroductionWorkshop({ example, essayType }: { example: GuidedExample; essayType: string }) {
  const hook = example.blocks.find((block) => block.tone === 'hook')?.text ?? '';
  const paraphrase = example.blocks.find((block) => block.tone === 'paraphrase')?.text ?? '';
  const position = example.blocks.find((block) => block.tone === 'claim')?.text ?? '';

  const steps = useMemo<Step[]>(() => {
    const copyTrap = promptStatement(example.prompt);
    const built: Step[] = [];

    if (hook && paraphrase && position) {
      built.push({
        key: 'hook',
        label: 'Choose the hook',
        question: 'Which sentence states the claim this essay will prove?',
        correct: hook,
        options: [hook, paraphrase, position],
        why: 'A hook is arguable: somebody could disagree with it. The paraphrase only restates the prompt, and the position is your answer — that comes later, in your own voice.',
      });
      built.push({
        key: 'paraphrase',
        label: 'Choose the paraphrase',
        question: 'Which sentence restates the prompt without copying it and without adding a judgement?',
        correct: paraphrase,
        options: [paraphrase, copyTrap, hook],
        why: 'A paraphrase keeps the meaning and changes the wording. Copying the prompt earns nothing, and a claim you could argue with is a hook, not a restatement.',
      });
    }
    return built;
  }, [example.prompt, hook, paraphrase, position]);

  const [choices, setChoices] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  /**
   * Las cuatro partes del método, en su orden. El hook va vacío por defecto porque es
   * opcional: no da puntos en el examen, obliga a saber la conclusión antes de escribir.
   */
  const [written, setWritten] = useState({ hook: '', paraphrase: '', position: '', premises: '' });
  const [modelVisible, setModelVisible] = useState(false);

  const shuffled = useMemo(
    () => steps.map((step, index) => placeOption(step.options, 0, `intro-workshop|${essayType}|${step.key}`, index).options),
    [steps, essayType],
  );

  const solved = (step: Step) => checked[step.key] && choices[step.key] === step.correct;
  const allSolved = steps.length > 0 && steps.every(solved);

  const words = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;
  const writingReady = words(written.paraphrase) >= 8 && words(written.position) >= 10 && words(written.premises) >= 6;

  /**
   * Lo único que se puede comprobar de verdad sobre una paráfrasis sin analizarla: si es
   * el enunciado copiado. Se busca una tirada literal de seis palabras o más del prompt.
   *
   * Es una comprobación honesta porque afirma exactamente lo que midió —«esto está copiado
   * del enunciado»— y no que la paráfrasis sea buena o mala. Copiar es además el fallo más
   * común y el que no puntúa: el examinador descuenta las palabras copiadas del recuento.
   */
  const copiedRun = useMemo(() => {
    const norm = (value: string) => value.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/u).filter(Boolean);
    const source = norm(example.prompt);
    const attempt = norm(written.paraphrase);
    for (let start = 0; start + 6 <= attempt.length; start += 1) {
      const run = attempt.slice(start, start + 6).join(' ');
      if (source.join(' ').includes(run)) return run;
    }
    return null;
  }, [example.prompt, written.paraphrase]);

  function reset() {
    setChoices({});
    setChecked({});
    setWritten({ hook: '', paraphrase: '', position: '', premises: '' });
    setModelVisible(false);
  }

  if (!steps.length) return null;

  return <div className={styles.guidedWorkshop}>
    <div className={styles.workshopHeader}>
      <div><span>Guided introduction workshop</span><h3>You build it before WeLearn reveals it</h3></div>
      <button type="button" className={styles.iconButton} onClick={reset} title="Reset this workshop" aria-label="Reset this workshop"><RotateCcw size={18} /></button>
    </div>

    <p className={styles.paragraphJob}><strong>The prompt:</strong> {example.prompt}</p>

    {steps.map((step, stepIndex) => {
      const previous = stepIndex === 0 ? null : steps[stepIndex - 1];
      const locked = previous ? !solved(previous) : false;
      return <div key={step.key} className={`${styles.workshopStep} ${locked ? styles.stepLocked : ''}`}>
        <div className={styles.stepLabel}>
          {stepIndex > 0 && (locked ? <LockKeyhole size={20} /> : <CheckCircle2 size={20} />)}
          <strong>Step {stepIndex + 1}</strong><span>{step.label}</span>
        </div>
        {!locked && <>
          <p className={styles.exerciseInstruction}>{step.question}</p>
          <div className={styles.optionGrid}>{shuffled[stepIndex].map((option, index) => {
            const chosen = choices[step.key] === option;
            const right = checked[step.key] && option === step.correct;
            const wrong = checked[step.key] && chosen && option !== step.correct;
            return <button key={option} type="button" className={`${styles.option} ${chosen ? styles.selected : ''} ${right ? styles.correct : ''} ${wrong ? styles.incorrect : ''}`}
              onClick={() => { setChoices((c) => ({ ...c, [step.key]: option })); setChecked((c) => ({ ...c, [step.key]: false })); }}>
              <span>{String.fromCharCode(65 + index)}</span>{option}
            </button>;
          })}</div>
          <div className={styles.workshopActions}>
            <button type="button" onClick={() => setChecked((c) => ({ ...c, [step.key]: true }))} disabled={!choices[step.key]}><Eye size={17} /> Check this choice</button>
          </div>
          {checked[step.key] && <div className={`${styles.feedback} ${solved(step) ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite">
            <CheckCircle2 size={20} /><div><strong>{solved(step) ? 'That is the one.' : 'Not that one.'}</strong><p>{step.why}</p></div>
          </div>}
        </>}
      </div>;
    })}

    <div className={`${styles.workshopStep} ${allSolved ? '' : styles.stepLocked}`}>
      <div className={styles.stepLabel}>
        {allSolved ? <CheckCircle2 size={20} /> : <LockKeyhole size={20} />}
        <strong>Step {steps.length + 1}</strong><span>Now write the whole introduction, one job at a time</span>
      </div>
      {allSolved && <>
        <div className={styles.planGrid}>
          <label className={styles.guidedField}>
            <strong>Your hook <em>· optional</em></strong>
            <span>The claim your essay will prove. Somebody must be able to disagree with it. No “I” here.</span>
            <textarea rows={2} value={written.hook} onChange={(event) => { setWritten((w) => ({ ...w, hook: event.target.value })); setModelVisible(false); }} placeholder="Leave this empty if you are short of time — a three-sentence introduction is still complete." />
            <small>{words(written.hook)} words · no minimum</small>
          </label>
          <label className={styles.guidedField}>
            <strong>Your paraphrase</strong>
            <span>Restate the prompt. Keep the meaning, change the wording.</span>
            <textarea rows={3} value={written.paraphrase} onChange={(event) => { setWritten((w) => ({ ...w, paraphrase: event.target.value })); setModelVisible(false); }} placeholder="Rewrite the prompt in your own words…" />
            <small>{words(written.paraphrase)} words · minimum 8</small>
            {copiedRun && <small className={styles.copyWarning}>Copied from the prompt: “…{copiedRun}…”. Copied words are not counted by the examiner.</small>}
          </label>
          <label className={styles.guidedField}>
            <strong>Your position</strong>
            <span>Answer the instruction directly. This is where “I” belongs.</span>
            <textarea rows={3} value={written.position} onChange={(event) => { setWritten((w) => ({ ...w, position: event.target.value })); setModelVisible(false); }} placeholder="I largely agree that…" />
            <small>{words(written.position)} words · minimum 10</small>
          </label>
          <label className={styles.guidedField}>
            <strong>Your two reasons</strong>
            <span>Very short. These become Body 1 and Body 2.</span>
            <textarea rows={3} value={written.premises} onChange={(event) => { setWritten((w) => ({ ...w, premises: event.target.value })); setModelVisible(false); }} placeholder="…because X and because Y." />
            <small>{words(written.premises)} words · minimum 6</small>
          </label>
        </div>
        <div className={styles.workshopActions}>
          <button type="button" onClick={() => setModelVisible(true)} disabled={!writingReady}><Eye size={17} /> Compare with the expert model</button>
        </div>
        {modelVisible && <div className={styles.bodyModelReveal} aria-live="polite">
          <span>Expert comparison</span>
          <div className={styles.completeParagraph}>
            <strong>Complete model introduction</strong>
            <p className={styles.coloredParagraph}>
              {example.blocks.map((block) => <span key={block.label} className={`${styles.paragraphBlock} ${styles[block.tone]}`} title={block.label}>{block.text}</span>)}
            </p>
          </div>
          {/*
            Nada de «correcto». Lo que el estudiante escribió no se ha analizado, y decir
            que está alineado después de contar palabras es exactamente el defecto que se
            corrigió en el motor de esta misma página.
          */}
          <p className={styles.comparisonNote}>Your wording does not need to match the model. Check four things: does your paraphrase keep the meaning without copying, does your position answer the instruction, are your two reasons different from each other, and could each one fill a paragraph? This is a comparison, not automated marking — nothing you wrote has been graded. The only automatic check on this page is whether your paraphrase repeats six or more words from the prompt.</p>
        </div>}
      </>}
    </div>
  </div>;
}
