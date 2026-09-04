import assert from 'node:assert/strict';
import test from 'node:test';

import {
  privateCandidateExitCode,
  runPrivateCandidateCheck,
} from '../scripts/check-ielts-listening-private-candidates.mjs';

const isolated = {
  integrity: 'PASS', machineReadiness: 'BLOCKED', publicationDecision: 'BLOCK',
};

test('private integrity success never implies machine readiness or publication approval', () => {
  assert.equal(privateCandidateExitCode(isolated), 0);
  assert.equal(privateCandidateExitCode(isolated, true), 1);
  const machineReady = { ...isolated, machineReadiness: 'READY' };
  assert.equal(privateCandidateExitCode(machineReady, true), 0);
  assert.equal(privateCandidateExitCode({ ...machineReady, publicationDecision: 'APPROVE' }), 1);
  assert.equal(privateCandidateExitCode({ ...machineReady, integrity: 'BLOCK' }), 1);
  assert.equal(privateCandidateExitCode({ ...machineReady, machineReadiness: 'unknown' }), 1);
  assert.equal(privateCandidateExitCode(null), 1);
});

test('CLI modes are explicit and unknown arguments cannot weaken the gate', () => {
  assert.equal(runPrivateCandidateCheck([], () => isolated).exitCode, 0);
  assert.equal(runPrivateCandidateCheck(['--require-machine-ready'], () => isolated).exitCode, 1);
  for (const args of [['--release'], ['--skip'], ['--root=/tmp'],
    ['--require-machine-ready', '--require-machine-ready']]) {
    const result = runPrivateCandidateCheck(args, () => { throw new Error('must not run'); });
    assert.equal(result.exitCode, 2);
    assert.equal(result.report.code, 'INVALID_ARGUMENTS');
    assert.equal(result.report.publicationDecision, 'BLOCK');
  }
});

test('unexpected read or parser errors fail closed without exposing private error details', () => {
  const result = runPrivateCandidateCheck([], () => {
    throw new Error('PRIVATE TRANSCRIPT ANSWER MANIFEST PATH');
  });
  assert.equal(result.exitCode, 1);
  assert.equal(result.report.code, 'AUDIT_READ_FAILED');
  assert.doesNotMatch(JSON.stringify(result), /PRIVATE TRANSCRIPT ANSWER MANIFEST PATH/);
});
