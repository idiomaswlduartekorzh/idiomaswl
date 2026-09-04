'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import MatchingDraftFields from '../../src/components/ielts/MatchingDraftFields';
import { inspectIeltsListeningDraftInputs, type IeltsListeningDraftInputSpec } from '../../src/lib/ielts/listening-draft-input-contract';

const options = [{ key: 'A', label: 'Person one' }, { key: 'B', label: 'Person two' }, { key: 'C', label: 'Person three' }] as const;
const first: Extract<IeltsListeningDraftInputSpec, { type: 'matching' }> = {
  type: 'matching', scope: 'fixture-once', questionNumbers: [26, 27, 28], options, optionReuse: 'once-only',
};
const second: Extract<IeltsListeningDraftInputSpec, { type: 'matching' }> = {
  ...first, scope: 'fixture-repeat', optionReuse: 'may-repeat',
};
const prompts = ['Check the handout', 'Choose the room', 'Prepare the materials'];

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
    const states = [inspectIeltsListeningDraftInputs(first, left), inspectIeltsListeningDraftInputs(second, right)];
    setShowErrors(true);
    const problem = states.flatMap((state) => state.controls).find((control) => control.issue);
    setNotice(problem ? 'Check the highlighted choices.' : 'All required choices are selected. This does not score answers.');
    // Focus after the error descriptions commit, from one container only.
    pendingFocus.current = problem && !disabled ? problem.id : null;
    setValidationPass((previous) => previous + 1);
  };

  return (
    <main>
      <header>
        <p>PRIVATE UI FIXTURE · no audio or assessment</p>
        <h1>Matching controls</h1>
        <p>Synthetic prompts for interface testing only. Not an IELTS practice test.</p>
      </header>
      <div className="fixture-tools">
        <button type="button" onClick={validate}>Validate choices</button>
        <button type="button" onClick={() => { pendingFocus.current = null; setLeft({}); setRight({}); setShowErrors(false); setNotice(''); setChanges(0); }}>Reset fixture</button>
        <label><input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} /> Disable controls</label>
        <output>Changes observed: {changes}</output>
      </div>
      <p role="status" aria-live="polite">{notice}</p>
      <MatchingDraftFields spec={first} prompts={prompts} responses={left} showErrors={showErrors} disabled={disabled} onAnswer={(number, value) => answer('left', number, value)} />
      <MatchingDraftFields spec={second} prompts={prompts} responses={right} showErrors={showErrors} disabled={disabled} onAnswer={(number, value) => answer('right', number, value)} />
    </main>
  );
}

const root = document.getElementById('fixture-root');
if (!root) throw new Error('Missing fixture root.');
createRoot(root).render(<Preview />);
