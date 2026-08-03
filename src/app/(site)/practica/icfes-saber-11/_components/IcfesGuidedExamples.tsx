'use client';

import { useState } from 'react';
import type { IcfesPartLessonConfig } from '@/data/icfes/part-lessons';
import styles from '../icfes-learning.module.css';

export default function IcfesGuidedExamples({ lesson }: { lesson: IcfesPartLessonConfig }) {
  const [groupId, setGroupId] = useState(lesson.groups[0].id);
  const [exampleIndex, setExampleIndex] = useState(0);
  const group = lesson.groups.find((item) => item.id === groupId) ?? lesson.groups[0];
  const example = group.examples[exampleIndex] ?? group.examples[0];

  function chooseGroup(id: string) {
    setGroupId(id);
    setExampleIndex(0);
  }

  return (
    <section className={styles.partOneExamples} aria-labelledby={`part-${lesson.part}-examples-title`}>
      <div className={styles.lessonSectionHeading}>
        <p className={styles.kicker}>15 demostraciones guiadas</p>
        <h2 id={`part-${lesson.part}-examples-title`}>Mira cómo se toma la decisión</h2>
        <p>Estudia la pista que controla la respuesta, el distractor más cercano y la razón que conecta el estímulo con la opción correcta.</p>
      </div>

      <div className={styles.exampleTabs} role="tablist" aria-label={`Subtipos de la Parte ${lesson.part}`}>
        {lesson.groups.map((item) => (
          <button key={item.id} type="button" role="tab" aria-selected={item.id === group.id} aria-controls={`part-${lesson.part}-example-panel`} onClick={() => chooseGroup(item.id)}>
            <span aria-hidden="true">{item.icon}</span><strong>{item.label}</strong><small>{item.examples.length} ejemplos</small>
          </button>
        ))}
      </div>

      <div id={`part-${lesson.part}-example-panel`} role="tabpanel" className={styles.examplePanel}>
        <div className={styles.examplePicker} aria-label={`Ejemplos de ${group.label}`}>
          <div><p className={styles.kicker}>{group.label}</p><strong>{group.subtitle}</strong></div>
          {group.examples.map((item, index) => (
            <button key={item.id} type="button" aria-pressed={index === exampleIndex} onClick={() => setExampleIndex(index)}>
              <span>0{index + 1}</span>{item.stimulus}
            </button>
          ))}
        </div>

        <article className={styles.exampleWalkthrough} aria-live="polite">
          <div className={styles.lessonStimulus} data-visual={lesson.visual}>
            <span>{example.stimulusLabel}</span><strong>{example.stimulus}</strong>
          </div>
          <div className={styles.lessonPrompt}><span>Pregunta</span><p>{example.prompt}</p></div>
          <div className={styles.lessonOptions}>
            {example.options.map((option, index) => <span key={option} data-answer={index === example.answerIndex}><b>{String.fromCharCode(65 + index)}</b>{option}</span>)}
          </div>
          <ol className={styles.reasoningTrace}>
            <li><span>1</span><div><strong>Encuentra la pista</strong><mark>{example.decisiveClue}</mark></div></li>
            <li><span>2</span><div><strong>Comprueba la función</strong><p>{example.reasoning}</p></div></li>
            <li><span>3</span><div><strong>Rechaza el distractor</strong><p>{example.distractor}</p></div></li>
          </ol>
          <div className={styles.exampleAnswer}>
            <span>Respuesta razonada</span><strong>{example.options[example.answerIndex]}</strong><p>La opción correcta responde a la función completa, no solo a una palabra compartida.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
