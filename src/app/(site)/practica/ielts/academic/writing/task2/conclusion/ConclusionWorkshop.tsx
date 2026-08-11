'use client';

import { Fragment, useState } from 'react';
import { CheckCircle2, Eye, LockKeyhole, RotateCcw } from 'lucide-react';
import ColoredBodyParagraph from '../body-1/ColoredBodyParagraph';
import type { ConclusionDrill, EssaySentence } from './conclusion-drills';
import styles from '../introduccion/page.module.css';

/**
 * Cerrar un ensayo que se puede leer.
 *
 * Antes este taller mostraba el enunciado y una línea con la función del párrafo, y a
 * continuación pedía «write a complete conclusion». David lo señaló con la pregunta exacta:
 * «¿cómo voy a colocar algo que yo no he visto?». No había ensayo. Se pedía sintetizar un
 * razonamiento que nadie había leído, y las opciones del paso 1 eran dos frases de relleno
 * repetidas en los veinte ejercicios.
 *
 * El recorrido ahora es el que tiene sentido:
 *
 *   el ensayo delante  →  ¿qué retoma la respuesta?  →  ¿qué sintetiza los dos cuerpos?
 *                      →  escríbelo tú  →  compara, con lo que había que recoger subrayado
 *
 * El subrayado aparece al acertar cada paso, nunca antes: la tesis cuando se acierta el
 * restatement, los dos cierres parciales cuando se acierta la síntesis. Enseñado antes,
 * sería la respuesta; enseñado después, es la explicación.
 */

function Paragraph({ sentences, showHighlight }: { sentences: EssaySentence[]; showHighlight: boolean }) {
  return <p>{sentences.map((sentence, index) => <Fragment key={sentence.text}>
    {index > 0 && ' '}
    <span className={showHighlight && sentence.highlight ? styles.essayHighlight : undefined}>{sentence.text}</span>
  </Fragment>)}</p>;
}

export default function ConclusionWorkshop({ drill }: { drill: ConclusionDrill }) {
  const [chosen, setChosen] = useState<[number, number]>([-1, -1]);
  const [checked, setChecked] = useState<[boolean, boolean]>([false, false]);
  const [writing, setWriting] = useState(() => drill.blocks.map(() => ''));
  const [showModel, setShowModel] = useState(false);

  const solved = (step: number) => checked[step] && chosen[step] === drill.steps[step].correct;
  const MINIMUM = 8;
  const shortOf = writing.map((value) => Math.max(0, MINIMUM - value.trim().split(/\s+/).filter(Boolean).length));
  const ready = shortOf.every((missing) => missing === 0);

  function choose(step: number, option: number) {
    setChosen((current) => current.map((value, index) => index === step ? option : value) as [number, number]);
    setChecked((current) => current.map((value, index) => index === step ? false : value) as [boolean, boolean]);
    setShowModel(false);
  }

  function check(step: number) {
    setChecked((current) => current.map((value, index) => index === step ? true : value) as [boolean, boolean]);
  }

  function reset() {
    setChosen([-1, -1]); setChecked([false, false]);
    setWriting(drill.blocks.map(() => '')); setShowModel(false);
  }

  return <div className={styles.guidedWorkshop}>
    <div className={styles.workshopHeader}>
      <div><span>Guided conclusion workshop</span><h3>Read the essay, then close it</h3></div>
      <button type="button" className={styles.iconButton} onClick={reset} title="Reset this workshop" aria-label="Reset this workshop"><RotateCcw size={18} /></button>
    </div>

    {/* El ensayo se queda visible durante todo el taller: es sobre esto que se decide. */}
    <div className={styles.essaySoFar}>
      <h4>Introduction</h4>
      <Paragraph sentences={drill.introduction} showHighlight={solved(0)} />
      <h4>Body 1</h4>
      <Paragraph sentences={drill.bodyOne} showHighlight={solved(1)} />
      <h4>Body 2</h4>
      <Paragraph sentences={drill.bodyTwo} showHighlight={solved(1)} />
      {(solved(0) || solved(1)) && <p className={styles.highlightKey}>
        {solved(1)
          ? 'Highlighted: the thesis, and the last sentence of each body paragraph. Those three are what a conclusion has to carry — nothing else from above belongs in it.'
          : 'Highlighted: the thesis. Your restatement has to say this again, in different words.'}
      </p>}
    </div>

    {drill.steps.map((step, index) => {
      const locked = index > 0 && !solved(0);
      const selected = chosen[index];
      const done = checked[index];
      return <div key={step.question} className={`${styles.workshopStep} ${locked ? styles.stepLocked : ''}`}>
        <div className={styles.stepLabel}>
          {index === 0 ? null : solved(0) ? <CheckCircle2 size={20} /> : <LockKeyhole size={20} />}
          <strong>Step {index + 1}</strong><span>{step.question}</span>
        </div>
        {!locked && <>
          <div className={styles.optionGrid}>{step.options.map((option, position) => <button
            key={option.text}
            type="button"
            /**
             * Se puede volver a elegir mientras no se haya acertado.
             *
             * Era `!done && choose(...)`: en cuanto se comprobaba, la rejilla dejaba de
             * responder. Con la respuesta buena eso está bien —la pregunta ya está hecha—,
             * pero al fallar dejaba encallado: la única salida era el botón de reiniciar
             * del encabezado, que además borra lo escrito en el paso 3. David se topó con
             * ello en los dos pasos.
             */
            onClick={() => !solved(index) && choose(index, position)}
            className={`${styles.option} ${selected === position ? styles.selected : ''} ${done && position === step.correct ? styles.correct : ''} ${done && selected === position && position !== step.correct ? styles.incorrect : ''}`}
          ><span>{String.fromCharCode(65 + position)}</span>{option.text}</button>)}</div>
          <div className={styles.workshopActions}>
            <button type="button" onClick={() => check(index)} disabled={selected < 0}><Eye size={17} /> Check this choice</button>
          </div>
          {selected < 0 && <p className={styles.unlockHint}>Choose an option to check it.</p>}
          {/* El mensaje es el de la opción elegida: cada distractor cierra el ensayo de otro
              enunciado, y decirle cuál es lo que enseña la diferencia. */}
          {done && <div className={`${styles.feedback} ${selected === step.correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite">
            <CheckCircle2 size={20} />
            <div>
              <strong>{selected === step.correct ? 'That closes this essay.' : 'That closes a different essay.'}</strong>
              <p>{step.options[selected]?.why}</p>
              {selected !== step.correct && <p><strong>Pick another one</strong> — the options are still live, and the essay is right above you.</p>}
            </div>
          </div>}
        </>}
      </div>;
    })}

    <div className={`${styles.workshopStep} ${!solved(0) || !solved(1) ? styles.stepLocked : ''}`}>
      <div className={styles.stepLabel}>
        {solved(0) && solved(1) ? <CheckCircle2 size={20} /> : <LockKeyhole size={20} />}
        <strong>Step 3</strong><span>Now write it in your own words</span>
      </div>
      {solved(0) && solved(1) && <>
        <p className={styles.paragraphJob}>You have seen which two sentences do the job. Write your own versions — the wording should be yours, the two jobs should not change.</p>
        <div className={styles.planGrid}>{drill.blocks.map((block, index) => <label key={block.label} className={styles.guidedField}>
          <strong>{block.label}</strong><span>{block.purpose}</span>
          <textarea
            rows={4}
            value={writing[index]}
            onChange={(event) => { setWriting((current) => current.map((value, position) => position === index ? event.target.value : value)); setShowModel(false); }}
            placeholder={`Write your ${block.label.toLowerCase()} here.`}
            spellCheck={false} autoCorrect="off" autoCapitalize="off"
          />
          <small>{shortOf[index] === 0 ? `At least ${MINIMUM} words — reached` : `At least ${MINIMUM} words · ${shortOf[index]} to go`}</small>
        </label>)}</div>
        <div className={styles.workshopActions}>
          <button type="button" onClick={() => setShowModel(true)} disabled={!ready}><Eye size={17} /> Show me the model conclusion</button>
        </div>
        {!ready && <p className={styles.unlockHint}>Write at least {MINIMUM} words in both boxes to see the model.</p>}
        {showModel && <div className={styles.bodyModelReveal}>
          <span>Compare with the WeLearn model</span>
          <div className={styles.modelBlockGrid}>{drill.blocks.map((block) => <article key={block.label} className={styles.claim}>
            <strong>{block.label}</strong><p>{block.text}</p><small>{block.purpose}</small>
          </article>)}</div>
          <div className={styles.completeParagraph}>
            <strong>Read as one conclusion</strong>
            <ColoredBodyParagraph blocks={drill.blocks.map((block, index) => ({ label: block.label, text: block.text, tone: index === 0 ? 'claim' : 'development', purpose: block.purpose }))} />
          </div>
          <p className={styles.mistakeNote}><strong>Precision check:</strong> {drill.commonMistake}</p>
          <p className={styles.comparisonNote}>Compare what each sentence does, not the wording. Nothing you wrote has been marked: this page cannot read your text, so it shows you the model instead of grading you.</p>
        </div>}
      </>}
    </div>
  </div>;
}
