'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ListeningDraftGroupFields from '../../src/components/ielts/ListeningDraftGroupFields';
import type { IeltsListeningDraftControlDescriptor } from '../../src/lib/ielts/listening-draft-control-descriptor';
import { inspectIeltsListeningDraftInputs } from '../../src/lib/ielts/listening-draft-input-contract';

const singleChoice = {
  type: 'single-choice',
  inputSpec: { type: 'single-choice', scope: 'fixture-composed-single', questionNumbers: [21, 22], optionKeys: ['A', 'B', 'C'] },
  questions: [
    {
      prompt: 'Which room will host the workshop?',
      options: [{ key: 'A', label: 'Room 12' }, { key: 'B', label: 'Room 14' }, { key: 'C', label: 'Room 18' }],
    },
    {
      prompt: 'When should the group arrive?',
      options: [{ key: 'A', label: '8:30' }, { key: 'B', label: '9:00' }, { key: 'C', label: '9:30' }],
    },
  ],
} as const satisfies IeltsListeningDraftControlDescriptor;
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
  const [singleResponses, setSingleResponses] = useState<Record<string, string>>({});
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

  const answer = (kind: 'single' | 'matching' | 'notes', number: number, value: string) => {
    if (kind === 'single') setSingleResponses((previous) => ({ ...previous, [number]: value }));
    else if (kind === 'matching') setMatchingResponses((previous) => ({ ...previous, [number]: value }));
    else setNoteResponses((previous) => ({ ...previous, [number]: value }));
    setChanges((previous) => previous + 1);
    setNotice('');
  };
  const validate = () => {
    const states = [
      inspectIeltsListeningDraftInputs(singleChoice.inputSpec, singleResponses),
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
    setSingleResponses({});
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
        <p>Three synthetic groups verify the shared composition. This is not an IELTS practice test.</p>
      </header>
      <div className="fixture-tools">
        <button type="button" onClick={validate}>Validate fields</button>
        <button type="button" onClick={reset}>Reset fixture</button>
        <label><input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} /> Disable controls</label>
        <output>Changes observed: {changes}</output>
      </div>
      <p role="status" aria-live="polite">{notice}</p>
      <ListeningDraftGroupFields descriptor={singleChoice} responses={singleResponses} disabled={disabled} showErrors={showErrors} onAnswer={(number, value) => answer('single', number, value)} />
      <ListeningDraftGroupFields descriptor={matching} responses={matchingResponses} disabled={disabled} showErrors={showErrors} onAnswer={(number, value) => answer('matching', number, value)} />
      <ListeningDraftGroupFields descriptor={notes} responses={noteResponses} disabled={disabled} showErrors={showErrors} onAnswer={(number, value) => answer('notes', number, value)} />
    </main>
  );
}

const root = document.getElementById('fixture-root');
if (!root) throw new Error('Missing fixture root.');
createRoot(root).render(<Preview />);
