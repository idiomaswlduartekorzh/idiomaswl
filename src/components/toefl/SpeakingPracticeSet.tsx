'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Headphones, Mic2 } from 'lucide-react';

import { IELTSSpeakingRecorder, type IeltsSpeakingRecording } from '@/components/exam-runner/IELTSSpeakingRecorder';
import { AudioPlayer } from '@/components/exam-runner/primitives';
import type { RepeatQuestion, SpeakQuestion } from '@/data/mocks/types';

import styles from './SpeakingPracticeSet.module.css';

type SpeakingQuestion = RepeatQuestion | SpeakQuestion;

function taskLabel(question: SpeakingQuestion) {
  return question.type === 'repeat' ? 'Listen and Repeat' : 'Take an Interview';
}

function itemLabel(question: SpeakingQuestion) {
  return question.type === 'repeat' ? `Sentence ${question.itemNumber}` : `Question ${question.partNumber}`;
}

export default function SpeakingPracticeSet({
  setNumber,
  questions,
}: {
  setNumber: number;
  questions: readonly SpeakingQuestion[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [recordings, setRecordings] = useState<Record<string, IeltsSpeakingRecording>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const active = questions[activeIndex];
  if (!active) return null;

  const completed = Object.keys(recordings).filter((id) => questions.some((question) => question.id === id)).length;
  const blocked = active.mediaStatus === 'script-ready-audio-blocked';

  return (
    <section className={styles.shell} aria-labelledby="speaking-practice-title">
      <header className={styles.header}>
        <div>
          <p>Speaking Set {setNumber} · open practice</p>
          <h1 id="speaking-practice-title">Practice speaking inside this section.</h1>
          <span>Replay prompts, move freely, skip items, and record a response whenever you are ready.</span>
        </div>
        <aside><strong>{completed}/{questions.length}</strong><span>responses recorded</span></aside>
      </header>

      <nav className={styles.rail} aria-label="Speaking prompts">
        {questions.map((question, index) => (
          <button
            key={question.id}
            type="button"
            aria-current={index === activeIndex ? 'step' : undefined}
            data-recorded={recordings[question.id] ? 'true' : 'false'}
            onClick={() => setActiveIndex(index)}
          >
            <span>{index + 1}</span>
            <small>{question.type === 'repeat' ? 'Repeat' : 'Interview'}</small>
          </button>
        ))}
      </nav>

      <article className={styles.practiceCard}>
        <div className={styles.identity}>
          <span>{active.type === 'repeat' ? <Headphones aria-hidden="true" /> : <Mic2 aria-hidden="true" />}</span>
          <div><p>{taskLabel(active)}</p><h2>{itemLabel(active)}</h2></div>
          <strong>Item {activeIndex + 1} of {questions.length}</strong>
        </div>

        {active.audioUrl ? (
          <AudioPlayer
            key={active.id}
            src={active.audioUrl}
            label={`${taskLabel(active)} · ${itemLabel(active)} · replay allowed`}
            replayable
          />
        ) : (
          <p className={styles.notice}>The prompt audio is unavailable. You can still read the prompt, record, or move to another item.</p>
        )}

        {active.type === 'repeat' ? (
          <div className={styles.prompt}>
            <p>Listen and repeat the sentence with clear pronunciation, rhythm, and intonation.</p>
            <button
              type="button"
              className={styles.transcriptButton}
              aria-expanded={Boolean(revealed[active.id])}
              onClick={() => setRevealed((current) => ({ ...current, [active.id]: !current[active.id] }))}
            >
              {revealed[active.id] ? 'Hide transcript' : 'Show transcript'}
            </button>
            {revealed[active.id] ? <blockquote>{active.targetSentence}</blockquote> : null}
          </div>
        ) : (
          <div className={styles.prompt}>
            <p>Answer naturally in English. You may replay the interviewer and record again.</p>
            {active.text.split('\n\n').map((paragraph) => <blockquote key={paragraph}>{paragraph}</blockquote>)}
          </div>
        )}

        {!blocked ? (
          <div className={styles.recorder}>
            <h3>Record your response</h3>
            <p>The recording stays in this tab for your own review and is not submitted.</p>
            <IELTSSpeakingRecorder
              key={active.id}
              questionId={active.id}
              recording={recordings[active.id]}
              maxSeconds={180}
              english
              onChange={(recording) => setRecordings((current) => {
                if (recording) return { ...current, [active.id]: recording };
                const next = { ...current };
                delete next[active.id];
                return next;
              })}
            />
          </div>
        ) : <p className={styles.notice}>Recording is unavailable because this prompt has no approved audio yet.</p>}

        <footer className={styles.footer}>
          <p>You may continue without listening or recording.</p>
          <div>
            <button type="button" disabled={activeIndex === 0} onClick={() => setActiveIndex((index) => index - 1)}>
              <ArrowLeft aria-hidden="true" /> Previous
            </button>
            <button type="button" disabled={activeIndex === questions.length - 1} onClick={() => setActiveIndex((index) => index + 1)}>
              Next <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </footer>
      </article>
    </section>
  );
}
