import type { ReviewGrade, VocabProgress, VocabStatus } from '@/lib/types/icfes'

/**
 * Spaced-repetition scheduling (Leitner-style, 6 boxes).
 *
 * A word climbs a ladder of boxes; each box has a longer interval before the
 * card is due again. Getting it wrong ("again") drops it back to relearning.
 * Reaching the top box marks the word "mastered". Pure + deterministic so it
 * can be unit-reasoned and reused on client and server.
 */

/** Days until the next review, indexed by Leitner box (0..5). */
export const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16, 45] as const

export const MAX_BOX = BOX_INTERVAL_DAYS.length - 1 // 5

/** A word is considered mastered once it reaches the top box. */
export const MASTERED_BOX = MAX_BOX

/** Fresh progress for a word the student has never seen. */
export function newProgress(wordKey: string): VocabProgress {
  return {
    word_key: wordKey,
    status: 'new',
    box: 0,
    review_count: 0,
    total_attempts: 0,
    correct_attempts: 0,
    next_review_at: null,
  }
}

function statusForBox(box: number): VocabStatus {
  if (box >= MASTERED_BOX) return 'mastered'
  if (box >= 2) return 'review'
  return 'learning'
}

function addDays(from: Date, days: number): Date {
  const d = new Date(from)
  d.setDate(d.getDate() + days)
  return d
}

/**
 * Apply a review grade to a card and return its next SRS state.
 * `now` is injectable so callers/tests control the clock.
 */
export function scheduleNextReview(
  current: VocabProgress,
  grade: ReviewGrade,
  now: Date = new Date()
): VocabProgress {
  const correct = grade !== 'again'

  let box: number
  if (grade === 'again') {
    // Miss: drop back into relearning (box 0), review again this session.
    box = 0
  } else if (grade === 'easy') {
    box = Math.min(current.box + 2, MAX_BOX)
  } else {
    box = Math.min(current.box + 1, MAX_BOX)
  }

  const intervalDays = BOX_INTERVAL_DAYS[box]

  return {
    ...current,
    box,
    status: statusForBox(box),
    review_count: current.review_count + 1,
    total_attempts: current.total_attempts + 1,
    correct_attempts: current.correct_attempts + (correct ? 1 : 0),
    next_review_at: addDays(now, intervalDays).toISOString(),
  }
}

/** Is this card due for review at `now`? New cards and box-0 cards are always due. */
export function isDue(p: VocabProgress, now: Date = new Date()): boolean {
  if (p.status === 'mastered') return false
  if (!p.next_review_at) return true
  return new Date(p.next_review_at).getTime() <= now.getTime()
}

/** Accuracy 0..1 over all attempts (0 when never attempted). */
export function accuracy(p: VocabProgress): number {
  return p.total_attempts === 0 ? 0 : p.correct_attempts / p.total_attempts
}
