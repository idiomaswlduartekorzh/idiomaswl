// Controlled leaf for a client-owned draft. Never pass its callback across an RSC boundary.
import {
  inspectIeltsListeningDraftInputs,
  type IeltsListeningDraftInputSpec,
  type IeltsListeningDraftInputIssue,
} from '../../lib/ielts/listening-draft-input-contract';
import styles from './MatchingDraftFields.module.css';

export interface MatchingDraftFieldsProps {
  spec: Extract<IeltsListeningDraftInputSpec, { type: 'matching' }>;
  /** Visible prompts in the same order as spec.questionNumbers; no source objects. */
  prompts: readonly string[];
  responses: Readonly<Record<string, string>>;
  disabled?: boolean;
  showErrors?: boolean;
  onAnswer: (number: number, value: string) => void;
}

const messages: Record<IeltsListeningDraftInputIssue, string> = {
  missing: 'Choose a letter for this task.',
  'invalid-choice': 'Choose one of the letters shown.',
  'duplicate-choice': 'Use each letter once. Change one of the repeated choices.',
  'too-long': 'Choose a single letter from the list.',
  'too-many-words': 'Choose a single letter from the list.',
};

function assertPrompts(prompts: readonly string[], length: number): void {
  if (!Array.isArray(prompts) || Object.getPrototypeOf(prompts) !== Array.prototype
    || prompts.length !== length || Reflect.ownKeys(prompts).length !== length + 1) {
    throw new Error('Invalid IELTS Listening matching prompts.');
  }
  for (let i = 0; i < length; i++) {
    const property = Object.getOwnPropertyDescriptor(prompts, String(i));
    if (!property || !('value' in property) || typeof property.value !== 'string'
      || !property.value.trim() || property.value.length > 500) {
      throw new Error('Invalid IELTS Listening matching prompts.');
    }
  }
}

export default function MatchingDraftFields({
  spec, prompts, responses, disabled = false, showErrors = false, onAnswer,
}: MatchingDraftFieldsProps) {
  const state = inspectIeltsListeningDraftInputs(spec, responses);
  if (spec.type !== 'matching') throw new Error('Invalid IELTS Listening matching spec.');
  assertPrompts(prompts, state.controls.length);
  const titleId = `${spec.scope}-title`;
  const instructionId = `${spec.scope}-instructions`;
  const reuse = spec.optionReuse === 'may-repeat'
    ? 'You may use each letter more than once.'
    : 'Use each letter once only.';

  return (
    <section className={styles.group} aria-labelledby={titleId}>
      <header className={styles.header}>
        <p className={styles.range}>Questions {spec.questionNumbers[0]}–{spec.questionNumbers.at(-1)}</p>
        <h2 id={titleId}>Match each task</h2>
        <p id={instructionId}>Choose one letter for each task. {reuse}</p>
      </header>
      <ul className={styles.key} aria-label="Available choices">
        {spec.options.map((option) => (
          <li key={option.key}><b>{option.key}</b><span>{option.label}</span></li>
        ))}
      </ul>
      <ol className={styles.tasks} start={spec.questionNumbers[0]}>
        {state.controls.map((control, index) => {
          const error = showErrors && control.issue ? messages[control.issue] : null;
          return (
            <li key={control.number} value={control.number} className={styles.task}>
              <label htmlFor={control.id} className={styles.label}>
                <span className={styles.number}>{control.number}</span>
                <span>{prompts[index]}</span>
              </label>
              <div className={styles.response}>
                <select
                  id={control.id}
                  name={control.name}
                  value={control.value}
                  autoComplete="off"
                  disabled={disabled}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? `${instructionId} ${control.errorId}` : instructionId}
                  onChange={(event) => { if (!disabled) onAnswer(control.number, event.target.value); }}
                >
                  <option value="">Choose a letter</option>
                  {spec.options.map((option) => (
                    <option key={option.key} value={option.key}>{option.key} — {option.label}</option>
                  ))}
                </select>
                {error && <p id={control.errorId} className={styles.error}>{error}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
