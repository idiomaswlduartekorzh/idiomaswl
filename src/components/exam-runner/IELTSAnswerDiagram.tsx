'use client';

import { useId, useState, type ReactNode } from 'react';
import Image from 'next/image';
import type { FormGroupQuestion } from '@/data/mocks/types';
import type { IeltsDiagramLayout } from '@/data/ielts/set1-diagram-layouts';
import { blankKey } from './primitives';
import styles from './IELTSAnswerDiagram.module.css';

export function IELTSAnswerDiagram({ question, layout, fills, onChange, textView }: {
  question: FormGroupQuestion;
  layout: IeltsDiagramLayout;
  fills: Record<string, string>;
  onChange: (key: string, value: string) => void;
  textView: ReactNode;
}) {
  const [showText, setShowText] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  // One input per question at a time; both views share the exact persisted key.
  const diagram = (
    <div className={styles.scroll} tabIndex={0} role="region" aria-label={question.imageAlt} aria-describedby={`${id}-help`}>
      <div className={styles.canvas} style={{ width: layout.width, height: layout.height }}>
        <Image src={layout.imageUrl} alt={question.imageAlt ?? 'Question diagram'} width={layout.width} height={layout.height}
          sizes={`${layout.width}px`} className={styles.image} />
        {layout.blanks.map(b => (
          <label key={b.num} className={styles.blank} style={{ left: b.x, top: b.y, width: b.width, height: b.height }}>
            <span className={styles.srOnly}>{`Question ${b.num}: ${b.context}`}</span>
            <input type="text" name={`${question.id}_${b.num}`} aria-label={`Question ${b.num}`}
              aria-describedby={`${id}-context-${b.num}`} autoComplete="off" spellCheck={false}
              className={styles.input} placeholder="Answer…" value={fills[blankKey(question.id, b.num)] ?? ''}
              onChange={event => onChange(blankKey(question.id, b.num), event.target.value)} />
            <span id={`${id}-context-${b.num}`} className={styles.srOnly}>{b.context}</span>
          </label>
        ))}
      </div>
    </div>
  );
  return (
    <div className={styles.root} data-answer-diagram={question.id}>
      <div className={styles.toolbar}>
        <button type="button" onClick={() => setShowText(value => !value)} aria-pressed={showText}>
          {showText ? 'Show diagram' : 'Use text view'}
        </button>
        {!showText && <button type="button" onClick={() => setExpanded(true)}>Expand diagram</button>}
      </div>
      <p className={styles.help} id={`${id}-help`}>
        {showText ? 'The question numbers and your answers are the same in both views.' :
          'Type directly on each numbered line. Scroll sideways or expand the diagram; use text view for a compact layout.'}
      </p>
      {showText ? textView : !expanded && diagram}
      {expanded && (
        <dialog open ref={element => {
          if (element && !element.matches(':modal')) { element.close(); element.showModal(); }
        }} className={styles.dialog} onCancel={() => setExpanded(false)} aria-label={question.imageAlt}>
          <div className={styles.toolbar}><strong>{question.imageAlt}</strong>
            <button type="button" autoFocus onClick={() => setExpanded(false)}>Close diagram</button>
          </div>
          {diagram}
        </dialog>
      )}
    </div>
  );
}
