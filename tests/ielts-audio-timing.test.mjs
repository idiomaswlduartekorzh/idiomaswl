import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  evaluateTimingMetrics,
  IELTS_AUDIO_TIMING_THRESHOLDS,
  parseSilenceDetection,
} from '../scripts/lib/ielts-audio-timing.mjs';

const calibration = JSON.parse(readFileSync('docs/ielts-listening-timing-reference-2026-08-28.json', 'utf8'));

test('the public official sample passes the pinned internal timing calibration', () => {
  assert.deepEqual(calibration.thresholds, {
    minimumDurationSeconds: IELTS_AUDIO_TIMING_THRESHOLDS.minimumDurationSeconds,
    maximumDurationSeconds: IELTS_AUDIO_TIMING_THRESHOLDS.maximumDurationSeconds,
    minimumAudibleSeconds: IELTS_AUDIO_TIMING_THRESHOLDS.minimumAudibleSeconds,
    maximumSilenceRatio: IELTS_AUDIO_TIMING_THRESHOLDS.maximumSilenceRatio,
    maximumSingleSilenceSeconds: IELTS_AUDIO_TIMING_THRESHOLDS.maximumSingleSilenceSeconds,
    maximumTrailingSilenceSeconds: IELTS_AUDIO_TIMING_THRESHOLDS.maximumTrailingSilenceSeconds,
  });
  assert.equal(evaluateTimingMetrics(calibration.measurements.officialPublicComputerSample).status, 'passed');
});

test('the historical Set 4 master and unpublished Set 5 candidate fail closed', () => {
  const set4 = evaluateTimingMetrics(calibration.measurements.welearnSet4PublishedMaster);
  const set5 = evaluateTimingMetrics(calibration.measurements.welearnSet5UnpublishedCandidate);
  assert.equal(set4.status, 'rejected');
  assert.ok(set4.failedChecks.includes('durationWithinOfficialSampleWindow'));
  assert.ok(set4.failedChecks.includes('noArtificialTrailingPadding'));
  assert.equal(set5.status, 'rejected');
  assert.ok(set5.failedChecks.includes('audibleDensity'));
  assert.ok(set5.failedChecks.includes('silenceRatio'));
  assert.ok(set5.failedChecks.includes('noArtificialTrailingPadding'));
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
