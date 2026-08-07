'use client';

import { useEffect, useMemo, useState } from 'react';
import type { VocabularyWord } from '@/lib/types/icfes';
import styles from '../icfes-learning.module.css';

const KEY = 'wl:icfes:vocabulary:v1';

function loadKnown(): string[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}
export default function VocabularyPracticeClient({ words }: { words: VocabularyWord[] }) {
  const [tier, setTier] = useState<'all' | 'basic' | 'connectors' | 'context'>('all');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);

  useEffect(() => setKnown(loadKnown()), []);

  const filtered = useMemo(() => words.filter((word) => {
    if (tier === 'all') return true;
    if (tier === 'basic') return word.difficulty <= 2 && word.skill === 'vocabulary_basic';
    if (tier === 'connectors') return word.skill === 'connectors';
    return word.difficulty >= 3 && word.skill !== 'connectors';
  }), [tier, words]);
  const card = filtered[index % Math.max(1, filtered.length)];

  function changeTier(next: typeof tier) {
    setTier(next);
    setIndex(0);
    setFlipped(false);
  }

  function next() {
    setIndex((current) => (current + 1) % filtered.length);
    setFlipped(false);
  }

  function toggleKnown() {
    if (!card) return;
    const nextKnown = known.includes(card.id) ? known.filter((id) => id !== card.id) : [...known, card.id];
    setKnown(nextKnown);
    try { window.localStorage.setItem(KEY, JSON.stringify(nextKnown)); } catch { /* práctica disponible sin almacenamiento */ }
  }

  if (!card) return null;

  return (
    <div className={styles.vocabPractice}>
      <div className={styles.vocabFilters} aria-label="Filtrar vocabulario">
        {([
          ['all', `Todas (${words.length})`],
          ['basic', 'Base'],
          ['connectors', 'Conectores'],
          ['context', 'Lectura'],
        ] as const).map(([value, label]) => (
          <button type="button" aria-pressed={tier === value} onClick={() => changeTier(value)} key={value}>{label}</button>
        ))}
      </div>
      <div className={styles.vocabStats}><span>Tarjeta {(index % filtered.length) + 1} de {filtered.length}</span><span>{known.length} dominadas en este dispositivo</span></div>
      <button type="button" className={styles.vocabCard} data-flipped={flipped} onClick={() => setFlipped((value) => !value)} aria-label={flipped ? `Definición de ${card.word}: ${card.es}` : `Palabra ${card.word}. Mostrar definición`}>
        <span>{flipped ? 'Significado y uso' : `${card.pos} · dificultad ${card.difficulty}`}</span>
        <strong>{flipped ? card.es : card.word}</strong>
        <p>{flipped ? card.example_en : 'Toca la tarjeta para revelar significado y ejemplo.'}</p>
      </button>
      <div className={styles.vocabActions}>
        <button type="button" className={styles.secondaryButton} onClick={toggleKnown}>{known.includes(card.id) ? 'Quitar de dominadas' : '✓ Ya la reconozco'}</button>
        <button type="button" className={styles.primaryButton} onClick={next}>Siguiente palabra →</button>
      </div>
    </div>
  );
}
