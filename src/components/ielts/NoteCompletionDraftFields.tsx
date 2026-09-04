// Controlled leaf for a client-owned draft. Do not pass callbacks across an RSC boundary.
import {
  inspectIeltsListeningDraftInputs,
  type IeltsListeningDraftInputSpec,
  type IeltsListeningDraftInputIssue,
} from '../../lib/ielts/listening-draft-input-contract';
import styles from './NoteCompletionDraftFields.module.css';

export interface NoteCompletionDraftFieldsProps {
  spec: Extract<IeltsListeningDraftInputSpec, { type: 'note-completion' }>;
  /** Visible context only, aligned with questionNumbers. Never pass a source object. */
  notes: readonly { before: string; after: string }[];
  responses: Readonly<Record<string, string>>;
  disabled?: boolean;
  showErrors?: boolean;
  onAnswer: (number: number, value: string) => void;
}

function assertNotes(notes: NoteCompletionDraftFieldsProps['notes'], length: number): void {
  const reject = () => { throw new Error('Invalid IELTS Listening note context.'); };
  if (!Array.isArray(notes) || Object.getPrototypeOf(notes) !== Array.prototype
    || notes.length !== length || Reflect.ownKeys(notes).length !== length + 1) reject();
  for (let index = 0; index < length; index++) {
    const item = Object.getOwnPropertyDescriptor(notes, String(index));
    if (!item || !('value' in item) || !item.enumerable) reject();
    const note = item!.value;
    if (!note || typeof note !== 'object' || Array.isArray(note)
      || (Object.getPrototypeOf(note) !== Object.prototype && Object.getPrototypeOf(note) !== null)
      || Reflect.ownKeys(note).length !== 2) reject();
    for (const key of ['before', 'after']) {
      const field = Object.getOwnPropertyDescriptor(note, key);
      if (!field || !('value' in field) || !field.enumerable || typeof field.value !== 'string'
        || field.value.length > 500 || (key === 'before' && !field.value.trim())) reject();
    }
  }
}

export default function NoteCompletionDraftFields({
  spec, notes, responses, disabled = false, showErrors = false, onAnswer,
}: NoteCompletionDraftFieldsProps) {
  const state = inspectIeltsListeningDraftInputs(spec, responses);
  if (spec.type !== 'note-completion') throw new Error('Invalid IELTS Listening note spec.');
  assertNotes(notes, state.controls.length);
  const words = spec.maxWords === 1 ? 'ONE WORD ONLY' : `NO MORE THAN ${spec.maxWords === 2 ? 'TWO' : 'THREE'} WORDS`;
  const instructionId = `${spec.scope}-instructions`;
  const messages: Record<IeltsListeningDraftInputIssue, string> = {
    missing: 'Write an answer for this gap.',
    'too-long': 'Use 80 characters or fewer. Your text has not been shortened.',
    'too-many-words': spec.maxWords === 1 ? 'Use one word only.' : `Use no more than ${spec.maxWords} words.`,
    'invalid-choice': 'Check your answer for this gap.',
    'duplicate-choice': 'Check your answer for this gap.',
  };

  return (
    <section className={styles.group} aria-labelledby={`${spec.scope}-title`}>
      <header className={styles.header}>
        <p className={styles.range}>Questions {spec.questionNumbers[0]}–{spec.questionNumbers.at(-1)}</p>
        <h2 id={`${spec.scope}-title`}>Complete the notes</h2>
        <p id={instructionId}>Write <strong>{words}</strong> for each answer. Maximum 80 characters per gap.</p>
      </header>
      <ol className={styles.notes} start={spec.questionNumbers[0]}>
        {state.controls.map((control, index) => {
          const error = showErrors && control.issue ? messages[control.issue] : null;
          return (
            <li key={control.number} value={control.number} className={styles.note}>
              <label htmlFor={control.id} className={styles.label}>
                <span className={styles.number}>{control.number}</span>
                <span>{notes[index].before} <span className={styles.gap}>…</span> {notes[index].after}</span>
              </label>
              <div className={styles.response}>
                <textarea
                  rows={1}
                  id={control.id}
                  name={control.name}
                  value={control.value}
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  disabled={disabled}
                  aria-required="true"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? `${instructionId} ${control.errorId}` : instructionId}
                  onChange={(event) => { if (!disabled) onAnswer(control.number, event.target.value); }}
                />
                {error && <p id={control.errorId} className={styles.error}>{error}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
