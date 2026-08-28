import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

export const IELTS_AUDIO_TIMING_THRESHOLDS = Object.freeze({
  minimumDurationSeconds: 1740,
  maximumDurationSeconds: 1800,
  minimumAudibleSeconds: 990,
  maximumSilenceRatio: 0.45,
  maximumSingleSilenceSeconds: 75,
  maximumTrailingSilenceSeconds: 5,
  silenceNoiseDb: -40,
  silenceMinimumSeconds: 0.5,
});

const rounded = (value, places = 3) => Number(value.toFixed(places));

export function timingChecks(metrics, thresholds = IELTS_AUDIO_TIMING_THRESHOLDS) {
  return {
    durationWithinOfficialSampleWindow: metrics.durationSeconds >= thresholds.minimumDurationSeconds
      && metrics.durationSeconds <= thresholds.maximumDurationSeconds,
    audibleDensity: metrics.audibleSeconds >= thresholds.minimumAudibleSeconds,
    silenceRatio: metrics.silenceRatio <= thresholds.maximumSilenceRatio,
    longestSilence: metrics.longestSilenceSeconds <= thresholds.maximumSingleSilenceSeconds,
    noArtificialTrailingPadding: metrics.trailingSilenceSeconds <= thresholds.maximumTrailingSilenceSeconds,
  };
}

export function evaluateTimingMetrics(metrics, thresholds = IELTS_AUDIO_TIMING_THRESHOLDS) {
  const checks = timingChecks(metrics, thresholds);
  return {
    ...metrics,
    checks,
    failedChecks: Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name),
    status: Object.values(checks).every(Boolean) ? 'passed' : 'rejected',
  };
}

export function parseSilenceDetection(stderr, durationSeconds) {
  assert.ok(Number.isFinite(durationSeconds) && durationSeconds > 0, 'audio duration must be positive');
  const spans = [];
  let openStart = null;
  for (const line of stderr.split('\n')) {
    const start = line.match(/silence_start:\s*([0-9.]+)/);
    if (start) {
      openStart = Number(start[1]);
      continue;
    }
    const end = line.match(/silence_end:\s*([0-9.]+)\s*\|\s*silence_duration:\s*([0-9.]+)/);
    if (!end) continue;
    const endSeconds = Math.min(durationSeconds, Number(end[1]));
    const duration = Number(end[2]);
    const startSeconds = Math.min(durationSeconds, openStart ?? Math.max(0, endSeconds - duration));
    spans.push({
      startSeconds: rounded(startSeconds),
      endSeconds: rounded(endSeconds),
      durationSeconds: rounded(Math.max(0, endSeconds - startSeconds)),
    });
    openStart = null;
  }
  if (openStart !== null && openStart < durationSeconds) {
    spans.push({
      startSeconds: rounded(openStart),
      endSeconds: rounded(durationSeconds),
      durationSeconds: rounded(durationSeconds - openStart),
    });
  }
  const totalSilenceSeconds = spans.reduce((total, span) => total + span.durationSeconds, 0);
  const longestSilenceSeconds = Math.max(0, ...spans.map(span => span.durationSeconds));
  const lastSpan = spans.at(-1);
  const trailingSilenceSeconds = lastSpan && lastSpan.endSeconds >= durationSeconds - 0.5
    ? Math.max(0, durationSeconds - lastSpan.startSeconds)
    : 0;
  return {
    totalSilenceSeconds: rounded(totalSilenceSeconds),
    audibleSeconds: rounded(Math.max(0, durationSeconds - totalSilenceSeconds)),
    silenceRatio: rounded(totalSilenceSeconds / durationSeconds, 4),
    longestSilenceSeconds: rounded(longestSilenceSeconds),
    trailingSilenceSeconds: rounded(trailingSilenceSeconds),
    silenceSpans: spans.length,
  };
}

export function analyzeAudioTiming(filePath, thresholds = IELTS_AUDIO_TIMING_THRESHOLDS) {
  const probe = spawnSync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', filePath,
  ], { encoding: 'utf8' });
  assert.equal(probe.status, 0, `ffprobe failed for ${filePath}: ${probe.stderr}`);
  const durationSeconds = Number(probe.stdout.trim());
  assert.ok(Number.isFinite(durationSeconds) && durationSeconds > 0, `invalid duration for ${filePath}`);

  const silence = spawnSync('ffmpeg', [
    '-hide_banner', '-nostats', '-i', filePath,
    '-af', `silencedetect=noise=${thresholds.silenceNoiseDb}dB:d=${thresholds.silenceMinimumSeconds}`,
    '-f', 'null', '-',
  ], { encoding: 'utf8' });
  assert.equal(silence.status, 0, `silence analysis failed for ${filePath}: ${silence.stderr}`);
  return evaluateTimingMetrics({
    durationSeconds: rounded(durationSeconds),
    ...parseSilenceDetection(silence.stderr, durationSeconds),
  }, thresholds);
}

export function assertAudioTiming(filePath, label = filePath, thresholds = IELTS_AUDIO_TIMING_THRESHOLDS) {
  const result = analyzeAudioTiming(filePath, thresholds);
  assert.equal(
    result.status,
    'passed',
    `${label} fails IELTS timing fidelity: ${result.failedChecks.join(', ')}; metrics=${JSON.stringify({
      durationSeconds: result.durationSeconds,
      audibleSeconds: result.audibleSeconds,
      silenceRatio: result.silenceRatio,
      longestSilenceSeconds: result.longestSilenceSeconds,
      trailingSilenceSeconds: result.trailingSilenceSeconds,
    })}`,
  );
  return result;
}
