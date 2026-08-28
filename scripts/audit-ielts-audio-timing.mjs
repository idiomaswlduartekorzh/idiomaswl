#!/usr/bin/env node

import assert from 'node:assert/strict';
import path from 'node:path';
import { analyzeAudioTiming, IELTS_AUDIO_TIMING_THRESHOLDS } from './lib/ielts-audio-timing.mjs';

const files = process.argv.slice(2);
assert.ok(files.length, 'usage: audit-ielts-audio-timing.mjs <audio-file> [...]');

const results = files.map(file => ({
  file: path.resolve(file),
  ...analyzeAudioTiming(path.resolve(file)),
}));
console.log(JSON.stringify({ thresholds: IELTS_AUDIO_TIMING_THRESHOLDS, results }, null, 2));
if (results.some(result => result.status !== 'passed')) process.exitCode = 1;
