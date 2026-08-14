'use client';

import { useId, useState } from 'react';
import type { ToeflBuildSentenceItem as BuildItem } from '@/data/toefl/build-sentence-set-1';
import type { ToeflBuildSentenceOutcome } from '@/lib/toefl/build-sentence-contract';
import styles from './BuildSentenceSet1.module.css';

function tileText(item: BuildItem, tileId: string) {
  return item.tiles.find((tile) => tile.id === tileId)?.text ?? '';
}

export default function BuildSentenceItem({
  item,
  number,
  order,
  onChange,
  onFocus,
  outcome,
}: {
  item: BuildItem;
  number: number;
  order: string[];
  onChange: (order: string[]) => void;
  onFocus?: (controlId: string) => void;
  outcome?: ToeflBuildSentenceOutcome;
}) {
  const reactId = useId().replace(/:/g, '');
  const instructionId = `${reactId}-instructions`;
  const statusId = `${reactId}-status`;
  const [announcement, setAnnouncement] = useState('');
  const locked = Boolean(outcome);
  const used = new Set(order);

  function add(tileId: string) {
    if (locked || used.has(tileId) || order.length >= item.blankCount) return;
    const next = [...order, tileId];
    onChange(next);
    setAnnouncement(`${tileText(item, tileId)} added to position ${next.length} of ${item.blankCount}.`);
    const placedId = `${item.id}-position-${next.length}`;
    onFocus?.(placedId);
    window.requestAnimationFrame(() => document.getElementById(placedId)?.focus());
  }

  function remove(position: number) {
    if (locked) return;
    const removed = order[position];
    onChange(order.filter((_, index) => index !== position));
    setAnnouncement(`${tileText(item, removed)} removed from position ${position + 1}.`);
    const bankId = `${removed}-control`;
    onFocus?.(bankId);
    window.requestAnimationFrame(() => document.getElementById(bankId)?.focus());
  }

  function reset() {
    if (locked || order.length === 0) return;
    onChange([]);
    setAnnouncement('Sentence cleared.');
    const firstId = `${item.tiles[0].id}-control`;
    onFocus?.(firstId);
    window.requestAnimationFrame(() => document.getElementById(firstId)?.focus());
  }

  return (
    <fieldset className={styles.item} aria-describedby={`${instructionId} ${statusId}`}>
      <legend>Item {number} of 10</legend>
      <p id={instructionId} className={styles.instructions}>
        Read the first speaker. Add {item.blankCount} fragments in order. One fragment will not be used.
      </p>

      <div className={styles.exchange}>
        <p><strong>Speaker 1:</strong> {item.context}</p>
        <div className={styles.reply} aria-label="Speaker 2 response under construction">
          <strong>Speaker 2:</strong>
          <span className={styles.fixed}>{item.replyPrefix}</span>
          {Array.from({ length: item.blankCount }, (_, position) => {
            const tileId = order[position];
            return tileId ? (
              <button
                key={tileId}
                type="button"
                className={styles.placed}
                disabled={locked}
                aria-label={`Position ${position + 1} of ${item.blankCount}: ${tileText(item, tileId)}. Remove fragment.`}
                onClick={() => remove(position)}
                onFocus={(event) => onFocus?.(event.currentTarget.id)}
                id={`${item.id}-position-${position + 1}`}
              >
                <span aria-hidden="true">{position + 1}</span> {tileText(item, tileId)}
              </button>
            ) : (
              <span key={`empty-${position}`} className={styles.blank} aria-label={`Position ${position + 1} of ${item.blankCount}, empty`}>
                <span aria-hidden="true">{position + 1}</span>
              </span>
            );
          })}
          <span className={styles.fixed}>{item.replySuffix}</span>
        </div>
      </div>

      <div className={styles.bank} aria-label="Available fragments">
        {item.tiles.map((tile) => {
          const selected = used.has(tile.id);
          const full = order.length >= item.blankCount;
          return (
            <button
              key={tile.id}
              id={`${tile.id}-control`}
              type="button"
              disabled={locked || selected || full}
              aria-label={selected
                ? `${tile.text}, already used`
                : `${tile.text}. Add to position ${order.length + 1} of ${item.blankCount}.`}
              onClick={() => add(tile.id)}
              onFocus={(event) => onFocus?.(event.currentTarget.id)}
            >
              {tile.text}
            </button>
          );
        })}
      </div>

      {!locked && order.length > 0 && (
        <button type="button" className={styles.reset} onClick={reset}>Clear this sentence</button>
      )}

      <p id={statusId} className={styles.srOnly} aria-live="polite">{announcement}</p>
      {outcome && (
        <p className={outcome.rawPoints === 1 ? styles.correct : styles.incorrect} role="status">
          {outcome.rawPoints === 1 ? 'Correct order.' : 'Incorrect or incomplete order.'}
        </p>
      )}
    </fieldset>
  );
}
