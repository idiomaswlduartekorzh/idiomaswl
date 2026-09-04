// Controlled leaf for a client-owned draft. Never pass its callback across an RSC boundary.
import {
  inspectIeltsListeningDraftInputs,
  type IeltsListeningDraftInputIssue,
  type IeltsListeningDraftInputSpec,
} from '../../lib/ielts/listening-draft-input-contract';
import type { IeltsListeningDraftControlDescriptor } from '../../lib/ielts/listening-draft-control-descriptor';
import styles from './SingleChoiceDraftFields.module.css';

type SingleChoiceDescriptor = Extract<IeltsListeningDraftControlDescriptor, { type: 'single-choice' }>;

export interface SingleChoiceDraftFieldsProps {
  spec: Extract<IeltsListeningDraftInputSpec, { type: 'single-choice' }>;
  /** Visible prompts/options only, aligned with questionNumbers. Never pass source questions. */
  questions: SingleChoiceDescriptor['questions'];
  responses: Readonly<Record<string, string>>;
  disabled?: boolean;
  showErrors?: boolean;
  onAnswer: (number: number, value: string) => void;
}

function rejectQuestions(): never {
  throw new Error('Invalid IELTS Listening single-choice questions.');
}

function dataRecord(value: unknown, fields: readonly string[]): value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return (proto === Object.prototype || proto === null)
    && Reflect.ownKeys(value).length === fields.length
    && fields.every((field) => {
      const descriptor = Object.getOwnPropertyDescriptor(value, field);
      return descriptor?.enumerable === true && 'value' in descriptor;
    });
}

function denseArray(value: unknown, length: number): value is unknown[] {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype
    || value.length !== length || Reflect.ownKeys(value).length !== length + 1) return false;
  for (let index = 0; index < length; index++) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (!descriptor || !descriptor.enumerable || !('value' in descriptor)) return false;
  }
  return true;
}

function assertQuestions(
  questions: SingleChoiceDraftFieldsProps['questions'],
  spec: SingleChoiceDraftFieldsProps['spec'],
): void {
  if (!denseArray(questions, spec.questionNumbers.length)) rejectQuestions();
  for (const question of questions) {
    if (!dataRecord(question, ['prompt', 'options'])
      || typeof question.prompt !== 'string'
      || !question.prompt.trim()
      || question.prompt.length > 500
      || !denseArray(question.options, spec.optionKeys.length)) rejectQuestions();
    const labels = new Set<string>();
    for (const [index, option] of question.options.entries()) {
      if (!dataRecord(option, ['key', 'label'])
        || option.key !== spec.optionKeys[index]
        || typeof option.label !== 'string'
        || !option.label.trim()
        || option.label.length > 200) rejectQuestions();
      const label = option.label.trim().toLocaleLowerCase('en');
      if (labels.has(label)) rejectQuestions();
      labels.add(label);
    }
  }
}

const messages: Record<IeltsListeningDraftInputIssue, string> = {
  missing: 'Choose one answer for this question.',
  'invalid-choice': 'Choose one of the options shown.',
  'too-long': 'Choose one of the options shown.',
  'too-many-words': 'Choose one of the options shown.',
  'duplicate-choice': 'Choose one of the options shown.',
};

export default function SingleChoiceDraftFields({
  spec, questions, responses, disabled = false, showErrors = false, onAnswer,
}: SingleChoiceDraftFieldsProps) {
  const state = inspectIeltsListeningDraftInputs(spec, responses);
  if (spec.type !== 'single-choice') throw new Error('Invalid IELTS Listening single-choice spec.');
  assertQuestions(questions, spec);
  const titleId = `${spec.scope}-title`;
  const instructionId = `${spec.scope}-instructions`;

  return (
    <section className={styles.group} aria-labelledby={titleId}>
      <header className={styles.header}>
        <p className={styles.range}>Questions {spec.questionNumbers[0]}–{spec.questionNumbers.at(-1)}</p>
        <h2 id={titleId}>Choose one answer</h2>
        <p id={instructionId}>Select one option, A, B or C, for each question.</p>
      </header>
      <div className={styles.questions}>
        {state.controls.map((control, index) => {
          const error = showErrors && control.issue ? messages[control.issue] : null;
          const describedBy = error ? `${instructionId} ${control.errorId}` : instructionId;
          return (
            <fieldset
              key={control.number}
              className={styles.question}
              aria-describedby={describedBy}
              aria-invalid={error ? true : undefined}
            >
              <legend>
                <span className={styles.number}>{control.number}</span>
                <span>{questions[index].prompt}</span>
              </legend>
              <div className={styles.options}>
                {questions[index].options.map((option, optionIndex) => {
                  const optionId = optionIndex === 0 ? control.id : `${control.id}-${option.key.toLowerCase()}`;
                  return (
                    <label key={option.key} htmlFor={optionId}>
                      <input
                        id={optionId}
                        type="radio"
                        name={control.name}
                        value={option.key}
                        checked={control.value === option.key}
                        autoComplete="off"
                        disabled={disabled}
                        aria-describedby={describedBy}
                        onChange={() => { if (!disabled) onAnswer(control.number, option.key); }}
                      />
                      <strong>{option.key}</strong>
                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </div>
              {error && <p id={control.errorId} className={styles.error}>{error}</p>}
            </fieldset>
          );
        })}
      </div>
    </section>
  );
}
