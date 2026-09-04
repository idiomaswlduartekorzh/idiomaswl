'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ListeningDraftGroupFields from '../../src/components/ielts/ListeningDraftGroupFields';
import type { IeltsListeningDraftControlDescriptor } from '../../src/lib/ielts/listening-draft-control-descriptor';
import { inspectIeltsListeningDraftInputs } from '../../src/lib/ielts/listening-draft-input-contract';

const matching = {
  type: 'matching',
  inputSpec: {
    type: 'matching', scope: 'fixture-composed-match', questionNumbers: [26, 27], optionReuse: 'may-repeat',
    options: [{ key: 'A', label: 'Workshop lead' }, { key: 'B', label: 'Course assistant' }],
  },
  prompts: ['Check the printed schedule', 'Prepare the welcome cards'],
} as const satisfies IeltsListeningDraftControlDescriptor;
const notes = {
  type: 'note-completion',
  inputSpec: { type: 'note-completion', scope: 'fixture-composed-notes', questionNumbers: [31, 32], maxWords: 1 },
  notes: [{ before: '', after: 'Begins the schedule.' }, { before: 'Place it beside the', after: '.' }],
} as const satisfies IeltsListeningDraftControlDescriptor;

function Preview() {
  const [matchingResponses, setMatchingResponses] = useState<Record<string, string>>({});
  const [noteResponses, setNoteResponses] = useState<Record<string, string>>({});
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

  const answer = (kind: 'matching' | 'notes', number: number, value: string) => {
    const setResponses = kind === 'matching' ? setMatchingResponses : setNoteResponses;
    setResponses((previous) => ({ ...previous, [number]: value }));
    setChanges((previous) => previous + 1);
    setNotice('');
  };
  const validate = () => {
    const states = [
      inspectIeltsListeningDraftInputs(matching.inputSpec, matchingResponses),
      inspectIeltsListeningDraftInputs(notes.inputSpec, noteResponses),
    ];
    const problem = states.flatMap((state) => state.controls).find((control) => control.issue);
    setShowErrors(true);
    setNotice(problem ? 'Check the highlighted fields.' : 'All fields contain valid input. This does not score answers.');
    pendingFocus.current = problem && !disabled ? problem.id : null;
    setValidationPass((previous) => previous + 1);
  };
  const reset = () => {
    pendingFocus.current = null;
    setMatchingResponses({});
    setNoteResponses({});
    setShowErrors(false);
    setNotice('');
    setChanges(0);
  };

  return (
    <main>
      <header>
        <p>PRIVATE COMPOSITION FIXTURE · no audio or assessment</p>
        <h1>Listening draft controls</h1>
        <p>Two synthetic groups verify the shared composition. This is not an IELTS practice test.</p>
      </header>
      <div className="fixture-tools">
        <button type="button" onClick={validate}>Validate fields</button>
        <button type="button" onClick={reset}>Reset fixture</button>
        <label><input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} /> Disable controls</label>
        <output>Changes observed: {changes}</output>
      </div>
      <p role="status" aria-live="polite">{notice}</p>
      <ListeningDraftGroupFields descriptor={matching} responses={matchingResponses} disabled={disabled} showErrors={showErrors} onAnswer={(number, value) => answer('matching', number, value)} />
      <ListeningDraftGroupFields descriptor={notes} responses={noteResponses} disabled={disabled} showErrors={showErrors} onAnswer={(number, value) => answer('notes', number, value)} />
    </main>
  );
}

const root = document.getElementById('fixture-root');
if (!root) throw new Error('Missing fixture root.');
createRoot(root).render(<Preview />);
