'use client';

import { useState } from 'react';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import type { EssayTypeId } from '../introduccion/introduction-data';
import { PROMPT_ANALYSIS_LESSONS } from './prompt-analysis-data';
import { ANALYSIS_DRILLS, writingExample } from './analysis-drills';
import styles from '../introduccion/page.module.css';

/**
 * Cuatro niveles de reconocer y cuatro de producir, en ese orden.
 *
 * Antes se alternaban —opción, opción, opción, escritura, opción, escritura…—, y el nivel 4
 * decía «Put topic, instruction, scope, position and body route in order» encima de un
 * cuadro de texto vacío: no había nada que ordenar, había que escribirlo. Los títulos
 * también hablaban en jerga de la casa («Identify the instruction», «Detect the missing
 * part»). Aquí cada nivel dice, en inglés llano, qué se hace y con qué se compara.
 *
 * Los cuatro primeros salen de `ANALYSIS_DRILLS`, donde cada opción es la respuesta real de
 * otro enunciado. Los cuatro últimos no se corrigen: se comparan.
 */
const LEVELS = [
  { title: 'What has to stay in', instruction: 'Read the prompt. Choose the requirement your answer has to keep visible from the first line to the last.', words: 0 },
  { title: 'The thesis', instruction: 'Choose the thesis sentence that answers this exact prompt.', words: 0 },
  { title: 'Body 1', instruction: 'Choose the one job Body 1 has to do here.', words: 0 },
  { title: 'Body 2', instruction: 'Choose the one job Body 2 has to do here.', words: 0 },
  { title: 'Map the prompt', instruction: 'Write the five blocks for this prompt: topic, instruction, scope, thesis, and the job of each body paragraph.', words: 20 },
  { title: 'Plan in one sentence', instruction: 'Write one sentence that says what you will argue and what each body paragraph will do.', words: 15 },
  { title: 'Full plan', instruction: 'Write a short plan for the introduction, Body 1, Body 2 and the conclusion.', words: 45 },
  { title: 'Timed essay', instruction: 'Spend five minutes planning, then write the complete response of 250 words or more.', words: 250 },
] as const;

const FIRST_WRITING_LEVEL = 4;

export default function PromptAnalysisPracticeEngine({ essayType }: { essayType: EssayTypeId }) {
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [checked, setChecked] = useState(false);
  const [writing, setWriting] = useState('');

  const lesson = PROMPT_ANALYSIS_LESSONS.find((item) => item.id === essayType) ?? PROMPT_ANALYSIS_LESSONS[0];
  const writingLevel = level >= FIRST_WRITING_LEVEL;
  const drill = writingLevel ? null : ANALYSIS_DRILLS[lesson.id][level];
  const example = writingExample(lesson.id, level);
  const prompt = drill ? drill.prompt : example.prompt;

  const wordCount = writing.trim() ? writing.trim().split(/\s+/).length : 0;
  const requiredWords = LEVELS[level].words;
  const missingWords = Math.max(0, requiredWords - wordCount);

  function reset(next = level) { setLevel(next); setSelected(-1); setChecked(false); setWriting(''); }

  /**
   * Un texto libre no se califica aquí, así que no se califica: se recuerda el mínimo, se
   * revela el modelo y se compara. El recuento dice lo único que sabe —que hubo intento—,
   * nunca que el intento sea bueno.
   */
  const isCorrect = drill ? selected === drill.correct : null;
  const canCheck = writingLevel ? wordCount >= requiredWords : selected >= 0;

  return <section className={styles.practiceSection} aria-labelledby="analysis-engine-heading">
    <div className={styles.sectionHeading}>
      <p className={styles.kicker}>WeLearn progressive engine</p>
      <h2 id="analysis-engine-heading">Practise prompt analysis by level</h2>
      <p>Levels 1 to 4 have one right answer and every wrong option tells you which prompt it belongs to. Levels 5 to 8 are your own writing: nothing is marked, you compare against the model.</p>
    </div>
    <div className={styles.levelTabs} aria-label="Practice levels">{LEVELS.map((item, index) => <button key={item.title} type="button" className={index === level ? styles.levelActive : ''} onClick={() => reset(index)}>{index + 1} · {item.title}</button>)}</div>
    <div className={styles.enginePanel}>
      <div className={styles.engineHeader}><div><h3>{LEVELS[level].title}</h3><p>{lesson.shortLabel} · Level {level + 1} of 8</p></div><span>{level + 1}/8</span></div>
      <div className={styles.exerciseBody}>
        <span className={styles.typeTag}>{lesson.shortLabel}</span>
        <p className={styles.exercisePrompt}>{prompt}</p>
        <p className={styles.exerciseInstruction}>{drill ? drill.question : LEVELS[level].instruction}</p>

        {writingLevel
          ? <>
              <textarea
                className={level === 7 ? styles.essayWriter : styles.writer}
                value={writing}
                onChange={(event) => { setWriting(event.target.value); setChecked(false); }}
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                placeholder={LEVELS[level].instruction}
                aria-label={LEVELS[level].instruction}
              />
              <div className={styles.writerMeta}>
                <span>{wordCount} words</span>
                {/* El mínimo se anuncia siempre, y cuando falta, cuánto falta. Un botón
                    apagado sin decir por qué es lo que hacía que la gente se quedara ahí. */}
                <span>{missingWords === 0 ? `Minimum ${requiredWords} words reached · you can compare now` : `Minimum ${requiredWords} words · ${missingWords} to go before you can compare`}</span>
              </div>
            </>
          : <div className={styles.optionGrid}>{drill!.options.map((option, index) => <button
              key={option.text}
              type="button"
              onClick={() => !checked && setSelected(index)}
              className={`${styles.option} ${selected === index ? styles.selected : ''} ${checked && index === drill!.correct ? styles.correct : ''} ${checked && selected === index && index !== drill!.correct ? styles.incorrect : ''}`}
            ><span>{String.fromCharCode(65 + index)}</span>{option.text}</button>)}</div>}

        {checked && (isCorrect === null
          ? <div className={`${styles.feedback} ${styles.feedbackNeutral}`}><div>
              <strong>Your response is ready to compare</strong>
              <p>Nothing here has been marked right or wrong: a plan written in your own words cannot be graded automatically. Read the model below and check your own against it.</p>
              <ul className={styles.compareList}>{example.map.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className={styles.modelReveal}><strong>Model plan:</strong> Body 1: {example.map.bodyRoute[0]} · Body 2: {example.map.bodyRoute[1]}</p>
              <p>Does your plan cover every line above, even if you worded it differently?</p>
            </div></div>
          /* El feedback es el de la OPCIÓN elegida, no uno común a los tres errores: cada
             distractor es la respuesta real de otro enunciado y el mensaje dice de cuál. */
          : <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`}><Check size={20} /><div>
              <strong>{isCorrect ? 'Correct' : 'Not this one'}</strong>
              <p>{drill!.options[selected]?.why}</p>
              {!isCorrect && <p className={styles.modelReveal}><strong>This prompt needs:</strong> {drill!.options[drill!.correct].text}</p>}
            </div></div>)}

        <div className={styles.exerciseActions}>
          <button type="button" className="btn btn-ghost" onClick={() => reset()}><RotateCcw size={16} /> Reset</button>
          <button type="button" className="btn btn-primary" disabled={!canCheck} onClick={() => checked ? reset(Math.min(LEVELS.length - 1, level + 1)) : setChecked(true)}>
            {checked ? <>Next level <ArrowRight size={16} /></> : writingLevel ? 'Compare with the model' : 'Check my answer'}
          </button>
        </div>
        {!canCheck && !writingLevel && <p className={styles.unlockHint}>Choose an option to check it.</p>}
      </div>
    </div>
  </section>;
}
