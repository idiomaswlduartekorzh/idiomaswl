'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import NoteCompletionDraftFields from '../../src/components/ielts/NoteCompletionDraftFields';
import { inspectIeltsListeningDraftInputs, type IeltsListeningDraftInputSpec } from '../../src/lib/ielts/listening-draft-input-contract';

const one: Extract<IeltsListeningDraftInputSpec, { type: 'note-completion' }> = {
  type: 'note-completion', scope: 'fixture-notes-one', questionNumbers: [31, 32], maxWords: 1,
};
const three: typeof one = { ...one, scope: 'fixture-notes-three', maxWords: 3 };
const notes = [{ before: 'Collect a', after: 'at the desk.' }, { before: 'Put the item in the', after: '.' }];

function Preview() {
  const [left, setLeft] = useState<Record<string, string>>({});
  const [right, setRight] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [changes, setChanges] = useState(0);
  const [notice, setNotice] = useState('');
  const [validationPass, setValidationPass] = useState(0);
  const pendingFocus = useRef<string | null>(null);
  useLayoutEffect(() => {
    const target = pendingFocus.current;
    pendingFocus.current = null;
    if (target && !disabled) document.getElementById(target)?.focus();
  }, [validationPass, disabled]);
  const answer = (side: 'left' | 'right', number: number, value: string) => {
    const set = side === 'left' ? setLeft : setRight;
    set((previous) => ({ ...previous, [number]: value }));
    setChanges((previous) => previous + 1);
    setNotice('');
  };
  const validate = () => {
    const states = [inspectIeltsListeningDraftInputs(one, left), inspectIeltsListeningDraftInputs(three, right)];
    const problem = states.flatMap((state) => state.controls).find((control) => control.issue);
    setShowErrors(true);
    setNotice(problem ? 'Check the highlighted answers.' : 'All required gaps have valid text. This does not score answers.');
    pendingFocus.current = problem && !disabled ? problem.id : null;
    setValidationPass((previous) => previous + 1);
  };
  return (
    <main>
      <header>
        <p>PRIVATE UI FIXTURE · no audio or assessment</p>
        <h1>Note completion controls</h1>
        <p>Synthetic prompts for interface testing only. Not an IELTS practice test.</p>
      </header>
      <div className="fixture-tools">
        <button type="button" onClick={validate}>Validate answers</button>
        <button type="button" onClick={() => { pendingFocus.current = null; setLeft({}); setRight({}); setShowErrors(false); setNotice(''); setChanges(0); }}>Reset fixture</button>
        <label><input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} /> Disable controls</label>
        <output>Changes observed: {changes}</output>
      </div>
      <p role="status" aria-live="polite">{notice}</p>
      <NoteCompletionDraftFields spec={one} notes={notes} responses={left} disabled={disabled} showErrors={showErrors} onAnswer={(number, value) => answer('left', number, value)} />
      <NoteCompletionDraftFields spec={three} notes={notes} responses={right} disabled={disabled} showErrors={showErrors} onAnswer={(number, value) => answer('right', number, value)} />
    </main>
  );
}

const root = document.getElementById('fixture-root');
if (!root) throw new Error('Missing fixture root.');
createRoot(root).render(<Preview />);
