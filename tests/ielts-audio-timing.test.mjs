import assert from 'node:assert/strict';
import test from 'node:test';
import {
  evaluateTimingMetrics,
  IELTS_AUDIO_TIMING_THRESHOLDS,
  parseSilenceDetection,
} from '../scripts/lib/ielts-audio-timing.mjs';

test('a full-length paper with sufficient audible time passes timing gates', () => {
  assert.equal(evaluateTimingMetrics({
    durationSeconds: 1770,
    audibleSeconds: 1100,
    silenceRatio: 0.3785,
    longestSilenceSeconds: 30,
    trailingSilenceSeconds: 0,
  }).status, 'passed');
});

test('short speech padded with silence fails closed', () => {
  const result = evaluateTimingMetrics({
    durationSeconds: 1770,
    audibleSeconds: 800,
    silenceRatio: 0.548,
    longestSilenceSeconds: 300,
    trailingSilenceSeconds: 300,
  });
  assert.equal(result.status, 'rejected');
  assert.ok(result.failedChecks.includes('audibleDensity'));
  assert.ok(result.failedChecks.includes('silenceRatio'));
  assert.ok(result.failedChecks.includes('noArtificialTrailingPadding'));
});

test('silencedetect parsing preserves a terminal span instead of disguising padding', () => {
  const parsed = parseSilenceDetection([
    '[silencedetect] silence_start: 12.5',
    '[silencedetect] silence_end: 14.5 | silence_duration: 2',
    '[silencedetect] silence_start: 90',
    '[silencedetect] silence_end: 120 | silence_duration: 30',
  ].join('\n'), 120);
  assert.equal(parsed.totalSilenceSeconds, 32);
  assert.equal(parsed.trailingSilenceSeconds, 30);
  assert.equal(parsed.longestSilenceSeconds, 30);
});
