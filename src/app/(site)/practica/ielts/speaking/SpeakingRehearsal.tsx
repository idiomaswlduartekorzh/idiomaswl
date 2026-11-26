'use client';

import { useState } from 'react';
import { IELTSSpeakingRecorder, type IeltsSpeakingRecording } from '@/components/exam-runner/IELTSSpeakingRecorder';
import type { SpeakingRehearsal as Rehearsal } from './speaking-rehearsals';
import styles from './SpeakingRehearsal.module.css';

export default function SpeakingRehearsal({ parts }: { parts: Rehearsal[] }) {
  const [activePart, setActivePart] = useState(1);
  const [take, setTake] = useState(1);
  const [busy, setBusy] = useState(false);
  const [recordings, setRecordings] = useState<Record<string, IeltsSpeakingRecording | undefined>>({});
  const part = parts.find(item => item.part === activePart)!;
  const recordingId = `part-${activePart}-take-${take}`;

  return (
    <div className={styles.workshop}>
      <fieldset className={styles.choices} disabled={busy}>
        <legend>Choose a Set 1 prompt</legend>
        {parts.map(item => (
          <label key={item.part}>
            <input type="radio" name="speaking-part" checked={item.part === activePart}
              onChange={() => { setActivePart(item.part); setTake(1); }} />
            Part {item.part} · {item.name}
          </label>
        ))}
      </fieldset>
      <div className={styles.prompt} key={activePart}>
        <h3>What the examiner asks</h3>
        <blockquote>{part.prompt}</blockquote>
        <p>{part.before}</p>
      </div>
      <fieldset className={styles.choices} disabled={busy}>
        <legend>Record or replay a take</legend>
        {[1, 2].map(number => (
          <label key={number}>
            <input type="radio" name="speaking-take" checked={take === number} onChange={() => setTake(number)} />
            {number === 1 ? 'First take' : 'Second take'}{recordings[`part-${activePart}-take-${number}`] ? ' · saved in this tab' : ''}
          </label>
        ))}
      </fieldset>
      <IELTSSpeakingRecorder
        key={recordingId}
        questionId={`Part ${activePart}, take ${take}`}
        recording={recordings[recordingId]}
        onChange={recording => setRecordings(previous => ({ ...previous, [recordingId]: recording }))}
        onRecordingStateChange={setBusy}
        maxSeconds={120}
        english
      />
      <details className={styles.comparison} key={`coach-${activePart}`}>
        <summary>After your turn, compare with a tutor</summary>
        <p className={styles.credit}>{part.credit}</p>
        <blockquote>{part.example}</blockquote>
        <p>{part.coaching}</p>
        <h3>Try it once more</h3>
        <p>{part.next}</p>
        {part.transfer && <><h3>A new question after your two takes</h3><p>{part.transfer}</p></>}
      </details>
    </div>
  );
}
