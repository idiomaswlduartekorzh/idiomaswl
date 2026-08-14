export type TimedWritingPhase = 'ready' | 'active' | 'closed';
export type TimedWritingCloseReason = 'submitted' | 'expired';

export function remainingWritingSeconds(deadlineMs: number, nowMs: number) {
  if (!Number.isFinite(deadlineMs) || !Number.isFinite(nowMs)) return 0;
  return Math.max(0, Math.ceil((deadlineMs - nowMs) / 1000));
}

export function reconcileTimedWritingState(
  phase: TimedWritingPhase,
  deadlineMs: number | undefined,
  nowMs: number,
): { phase: TimedWritingPhase; closeReason?: TimedWritingCloseReason; remainingSeconds?: number } {
  if (phase !== 'active') return { phase };
  if (!deadlineMs || !Number.isFinite(deadlineMs)) return { phase: 'closed', closeReason: 'expired', remainingSeconds: 0 };
  const remainingSeconds = remainingWritingSeconds(deadlineMs, nowMs);
  return remainingSeconds === 0
    ? { phase: 'closed', closeReason: 'expired', remainingSeconds: 0 }
    : { phase: 'active', remainingSeconds };
}
