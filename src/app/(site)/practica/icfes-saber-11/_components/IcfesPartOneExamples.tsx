'use client';

import { useState } from 'react';
import { PART_ONE_EXAMPLE_GROUPS } from '@/data/icfes/part-one-lesson';
import styles from '../icfes-learning.module.css';

export default function IcfesPartOneExamples() {
  const [groupId, setGroupId] = useState(PART_ONE_EXAMPLE_GROUPS[0].id);
  const [exampleIndex, setExampleIndex] = useState(0);
  const group = PART_ONE_EXAMPLE_GROUPS.find((item) => item.id === groupId) ?? PART_ONE_EXAMPLE_GROUPS[0];
  const example = group.examples[exampleIndex] ?? group.examples[0];

  function chooseGroup(nextGroupId: string) {
    setGroupId(nextGroupId);
    setExampleIndex(0);
  }

  return (
    <section className={styles.partOneExamples} aria-labelledby="part-one-examples-title">
      <div className={styles.lessonSectionHeading}>
        <p className={styles.kicker}>Ejemplos guiados</p>
        <h2 id="part-one-examples-title">Observa el razonamiento antes de responder</h2>
        <p>Cambia de categoría y estudia cómo una pista decisiva elimina palabras que parecen posibles. Son ejemplos propios de entrenamiento con el formato de la Parte 1.</p>
      </div>

      <div className={styles.exampleTabs} role="tablist" aria-label="Categorías de vocabulario">
        {PART_ONE_EXAMPLE_GROUPS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === group.id}
            aria-controls="part-one-example-panel"
            onClick={() => chooseGroup(item.id)}
          >
            <span aria-hidden="true">{item.icon}</span>
            <strong>{item.label}</strong>
            <small>{item.examples.length} ejemplos</small>
          </button>
        ))}
      </div>

      <div id="part-one-example-panel" role="tabpanel" className={styles.examplePanel}>
        <div className={styles.examplePicker} aria-label={`Ejemplos de ${group.label}`}>
          <div>
            <p className={styles.kicker}>{group.label}</p>
            <strong>{group.subtitle}</strong>
          </div>
          {group.examples.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={index === exampleIndex}
              onClick={() => setExampleIndex(index)}
            >
              <span>0{index + 1}</span>
              {item.definition}
            </button>
          ))}
        </div>

        <article className={styles.exampleWalkthrough} aria-live="polite">
          <div className={styles.exampleWordBank}>
            <span>Banco de palabras</span>
            <div>
              {example.wordBank.map((word, index) => (
                <span key={word} data-answer={word === example.answer}>
                  <b>{String.fromCharCode(65 + index)}</b>{word}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.exampleDefinition}>
            <span>Descripción</span>
            <p>“{example.definition}”</p>
          </div>

          <ol className={styles.reasoningTrace}>
            <li><span>1</span><div><strong>Encuentra la pista</strong><mark>{example.decisiveClue}</mark></div></li>
            <li><span>2</span><div><strong>Comprueba la función</strong><p>{example.reasoning}</p></div></li>
            <li><span>3</span><div><strong>Rechaza el distractor cercano</strong><p>{example.distractor}</p></div></li>
          </ol>

          <div className={styles.exampleAnswer}>
            <span>Respuesta razonada</span>
            <strong>{example.answer}</strong>
            <p>La respuesta no sale de traducir todo: sale de encontrar la palabra que cumple cada pista.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
