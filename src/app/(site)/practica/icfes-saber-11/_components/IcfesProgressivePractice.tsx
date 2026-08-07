'use client';

import { useState, type KeyboardEvent } from 'react';
import type { IcfesPartConfig } from '@/data/icfes/parts';
import type { IcfesPracticeStage } from '@/data/icfes/part-one-lesson';
import IcfesPartPracticeEngine from './IcfesPartPracticeEngine';
import styles from '../icfes-learning.module.css';

export default function IcfesProgressivePractice({
  part,
  stages,
}: {
  part: IcfesPartConfig;
  stages: IcfesPracticeStage[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState<Record<string, number>>({});
  const activeStage = stages[activeIndex];
  const nextStage = stages[activeIndex + 1];

  function moveStage(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = stages.length - 1;
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = index === lastIndex ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') nextIndex = index === 0 ? lastIndex : index - 1;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = lastIndex;
    else return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]
      ?.focus();
  }

  return (
    <div className={styles.progressiveEngine}>
      <div className={styles.engineIdentity}>
        <div aria-hidden="true"><span>W</span><strong>WeLearn</strong></div>
        <div>
          <p className={styles.kicker}>WeLearn Engine · Parte {part.part}</p>
          <h3>Practica por nivel de decisión</h3>
          <p>Primero reconoces vocabulario directo, después separas palabras cercanas y al final resuelves distractores de examen.</p>
        </div>
      </div>

      <div className={styles.stageTabs} role="tablist" aria-label="Niveles de práctica">
        {stages.map((stage, index) => (
          <button
            key={stage.id}
            id={`part-${part.part}-stage-${stage.id}-tab`}
            type="button"
            role="tab"
            tabIndex={index === activeIndex ? 0 : -1}
            aria-selected={index === activeIndex}
            aria-controls={`part-${part.part}-progressive-practice-panel`}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => moveStage(event, index)}
          >
            <span>{completed[stage.id] !== undefined ? '✓' : index + 1}</span>
            <div><strong>{stage.shortLabel}</strong><small>{stage.questions.length} ejercicios{completed[stage.id] !== undefined ? ` · ${completed[stage.id]}%` : ''}</small></div>
          </button>
        ))}
      </div>

      <div
        id={`part-${part.part}-progressive-practice-panel`}
        role="tabpanel"
        aria-labelledby={`part-${part.part}-stage-${activeStage.id}-tab`}
        className={styles.stagePanel}
      >
        <div className={styles.stageIntroduction}>
          <div><span>Nivel {activeIndex + 1} de {stages.length}</span><strong>{activeStage.label}</strong></div>
          <p>{activeStage.focus}</p>
        </div>
        <IcfesPartPracticeEngine
          key={activeStage.id}
          part={part}
          questions={activeStage.questions}
          progressScope={`part-${part.part}-${activeStage.id}`}
          onComplete={({ accuracy }) => setCompleted((current) => ({ ...current, [activeStage.id]: accuracy }))}
          resultAction={nextStage ? { label: `Continuar: ${nextStage.shortLabel}`, onClick: () => setActiveIndex((index) => index + 1) } : undefined}
        />
      </div>
    </div>
  );
}
