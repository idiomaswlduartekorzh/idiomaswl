'use client';

import { useId, useState } from 'react';
import styles from './ReadingChoiceGroup.module.css';

export interface ReadingChoiceOption {
  id: string;
  label: string;
  text: string;
}

export interface ReadingChoiceOutcome {
  selectedOptionIds: string[];
  correctOptionIds?: string[];
  rawPoints?: 0 | 1;
  reasonCode?: string;
}

export function ReadingSingleChoiceGroup({
  itemId,
  number,
  prompt,
  options,
  selectedOptionId,
  onSelect,
  onFocus,
  outcome,
}: {
  itemId: string;
  number: number;
  prompt: string;
  options: readonly ReadingChoiceOption[];
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  onFocus?: (inputId: string) => void;
  outcome?: ReadingChoiceOutcome;
}) {
  const hintId = useId();
  const resultId = useId();
  return (
    <fieldset className={styles.group} aria-describedby={`${hintId}${outcome ? ` ${resultId}` : ''}`}>
      <legend className={styles.legend}><span aria-hidden="true">{number}.</span> {prompt}</legend>
      <p id={hintId} className={styles.hint}>Choose one answer.</p>
      <div className={styles.options}>
        {options.map((option) => {
          const inputId = `${itemId}-${option.label.toLowerCase()}`;
          const checked = selectedOptionId === option.id;
          const correct = Boolean(outcome?.correctOptionIds?.includes(option.id));
          const incorrectSelection = Boolean(outcome && checked && !correct);
          return (
            <label
              key={option.id}
              htmlFor={inputId}
              className={`${styles.option}${checked ? ` ${styles.selected}` : ''}${correct ? ` ${styles.correct}` : ''}${incorrectSelection ? ` ${styles.incorrect}` : ''}`}
            >
              <input
                id={inputId}
                type="radio"
                name={itemId}
                value={option.id}
                checked={checked}
                onChange={() => onSelect(option.id)}
                onFocus={() => onFocus?.(inputId)}
                disabled={Boolean(outcome)}
              />
              <span className={styles.letter} aria-hidden="true">{option.label}</span>
              <span>{option.text}</span>
            </label>
          );
        })}
      </div>
      {outcome && (
        <p id={resultId} className={outcome.rawPoints === 1 ? styles.resultCorrect : styles.resultIncorrect}>
          {outcome.rawPoints === 1 ? 'Correct answer.' : outcome.reasonCode === 'unanswered' ? 'Unanswered.' : 'Incorrect answer.'}
        </p>
      )}
    </fieldset>
  );
}

export function ReadingMultiChoiceGroup({
  itemId,
  number,
  prompt,
  options,
  selectedOptionIds,
  selectCount,
  onChange,
  onFocus,
  outcome,
  supplementary = false,
}: {
  itemId: string;
  number: number;
  prompt: string;
  options: readonly ReadingChoiceOption[];
  selectedOptionIds: string[];
  selectCount: number;
  onChange: (optionIds: string[]) => void;
  onFocus?: (inputId: string) => void;
  outcome?: ReadingChoiceOutcome;
  supplementary?: boolean;
}) {
  const hintId = useId();
  const countId = useId();
  const errorId = useId();
  const resultId = useId();
  const [limitMessage, setLimitMessage] = useState('');

  function toggle(optionId: string) {
    if (selectedOptionIds.includes(optionId)) {
      setLimitMessage('');
      onChange(selectedOptionIds.filter((id) => id !== optionId));
      return;
    }
    if (selectedOptionIds.length >= selectCount) {
      setLimitMessage(`You can select exactly ${selectCount} answers. Remove one selection before choosing another.`);
      return;
    }
    setLimitMessage('');
    onChange([...selectedOptionIds, optionId]);
  }

  return (
    <fieldset
      className={`${styles.group} ${styles.multi}${supplementary ? ` ${styles.supplementary}` : ''}`}
      aria-describedby={`${hintId} ${countId}${limitMessage ? ` ${errorId}` : ''}${outcome ? ` ${resultId}` : ''}`}
    >
      {supplementary && <p className={styles.badge}>Práctica complementaria WeLearn · fuera de las 5 preguntas del piloto oficial</p>}
      <legend className={styles.legend}><span aria-hidden="true">{number}.</span> {prompt}</legend>
      <p id={hintId} className={styles.hint}>Choose exactly {selectCount} answers. Full credit requires the exact set.</p>
      <p id={countId} className={styles.count} aria-live="polite">Selected {selectedOptionIds.length} of {selectCount}.</p>
      <div className={styles.options}>
        {options.map((option) => {
          const inputId = `${itemId}-${option.label.toLowerCase()}`;
          const checked = selectedOptionIds.includes(option.id);
          const correct = Boolean(outcome?.correctOptionIds?.includes(option.id));
          const incorrectSelection = Boolean(outcome && checked && !correct);
          return (
            <label
              key={option.id}
              htmlFor={inputId}
              className={`${styles.option}${checked ? ` ${styles.selected}` : ''}${correct ? ` ${styles.correct}` : ''}${incorrectSelection ? ` ${styles.incorrect}` : ''}`}
            >
              <input
                id={inputId}
                type="checkbox"
                value={option.id}
                checked={checked}
                onChange={() => toggle(option.id)}
                onFocus={() => onFocus?.(inputId)}
                disabled={Boolean(outcome)}
              />
              <span className={styles.letter} aria-hidden="true">{option.label}</span>
              <span>{option.text}</span>
            </label>
          );
        })}
      </div>
      <p id={errorId} className={styles.error} role="status" aria-live="polite">{limitMessage}</p>
      {outcome && (
        <p id={resultId} className={outcome.rawPoints === 1 ? styles.resultCorrect : styles.resultIncorrect}>
          {outcome.rawPoints === 1
            ? 'Correct answer.'
            : outcome.reasonCode === 'incomplete_selection'
              ? `Incomplete selection: ${outcome.selectedOptionIds.length} of ${selectCount}.`
              : outcome.reasonCode === 'unanswered' ? 'Unanswered.' : 'Incorrect answer.'}
        </p>
      )}
    </fieldset>
  );
}
