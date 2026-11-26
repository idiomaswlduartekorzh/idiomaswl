'use client';

import { useRef, useState, useTransition, type FormEvent } from 'react';
import { checkListeningSample } from './check-listening-sample';
import { listeningSamples, type ListeningSample } from './listening-samples';
import hub from '../IeltsHub.module.css';
import styles from './listening-exercises.module.css';

function ListeningPart({ sample, onPlay }: {
  sample: ListeningSample;
  onPlay: (element: HTMLAudioElement) => void;
}) {
  const [entry, setEntry] = useState('');
  const [review, setReview] = useState<Awaited<ReturnType<typeof checkListeningSample>>>(null);
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  const id = `listening-part-${sample.part}`;
  const instructionId = `${id}-instruction`;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!entry.trim() || pending || review) return;
    setError('');
    startTransition(async () => {
      try {
        const result = await checkListeningSample(sample.part, entry);
        if (result) setReview(result);
        else setError('Enter your answer and try again.');
      } catch {
        setError('Your answer is still here. Try checking it again when the connection returns.');
      }
    });
  }

  return (
    <article className={hub.editorialCard} id={id} aria-labelledby={`${id}-title`}>
      <span className={hub.cardLabel}>Part {sample.part}</span>
      <h3 id={`${id}-title`}>{sample.title}</h3>
      <p>{sample.context}</p>
      <form className={styles.exercise} onSubmit={submit}>
        <fieldset>
          <legend>{sample.prompt}</legend>
          <p id={instructionId}>{sample.instruction}</p>
          <audio
            controls preload="none" className={styles.audio}
            aria-label={`Play Part ${sample.part}. ${sample.title}`}
            src={`/audio/ielts/listening-guide/set-2-part-${sample.part}.mp3`}
            onPlay={event => onPlay(event.currentTarget)}
          />
          {sample.options ? sample.options.map(option => (
            <label className={styles.option} key={option}>
              <input
                type="radio" name={id} value={option} checked={entry === option} disabled={pending || review !== null}
                aria-describedby={instructionId} onChange={() => setEntry(option)}
              />
              {option}
            </label>
          )) : (
            <input
              className={styles.written} type="text" disabled={pending || review !== null} aria-label={`Your Part ${sample.part} answer`}
              aria-describedby={instructionId} autoComplete="off" spellCheck={false} maxLength={160}
              value={entry} onChange={event => setEntry(event.target.value)}
            />
          )}
        </fieldset>
        {review === null && (
          <button className={styles.check} type="submit" disabled={pending || !entry.trim()}>
            {pending ? 'Checking…' : 'Check my answer'}
          </button>
        )}
        {error && <p role="alert">{error}</p>}
      </form>
      {review && (
        <div className={styles.review}>
          <div role="status">
            <h4>{review.correct ? 'You heard it.' : 'Listen to that moment again.'}</h4>
            <p><strong>{review.answer}</strong></p>
            <p>{review.reasoning}</p>
          </div>
          <details>
            <summary>Read the words in the clip</summary>
            <p>{review.transcript}</p>
          </details>
          <button
            className={styles.retry} type="button"
            onClick={() => { setEntry(''); setReview(null); setError(''); }}
          >
            Try this clip again
          </button>
        </div>
      )}
    </article>
  );
}

export default function ListeningPartExercises() {
  const playing = useRef<HTMLAudioElement | null>(null);

  function onPlay(element: HTMLAudioElement) {
    if (playing.current !== element) playing.current?.pause();
    playing.current = element;
  }

  return (
    <div className={hub.articleGrid} data-active-practice="true">
      {listeningSamples.map(sample => <ListeningPart key={sample.part} sample={sample} onPlay={onPlay} />)}
    </div>
  );
}
