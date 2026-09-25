import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const manifest = JSON.parse(readFileSync(resolve(root, 'config/diagnostic/legacy-audio-inventory.json'), 'utf8'));
const failures = [];

if (manifest.inventoryVersion !== 'diagnostic-legacy-audio-v1') failures.push('unexpected inventory version');
if (manifest.items.length !== 80) failures.push(`expected 80 items, found ${manifest.items.length}`);
if (manifest.totals.englishGitRecoverable !== 60) failures.push('expected 60 recoverable English audios');
if (manifest.totals.italianPublicLegacy !== 20) failures.push('expected 20 legacy Italian audios');
if (new Set(manifest.items.map(item => item.id)).size !== manifest.items.length) failures.push('duplicate inventory IDs');

const groupCounts = new Map();
for (const item of manifest.items) {
  const group = `${item.language}-${item.levelCandidate}`;
  groupCounts.set(group, (groupCounts.get(group) ?? 0) + 1);
  if (item.audio.decodeStatus !== 'pass') failures.push(`${item.id} did not decode`);
  if (!(item.audio.durationSeconds > 0)) failures.push(`${item.id} has no duration`);
  if (!/^[a-f0-9]{64}$/.test(item.audio.sha256)) failures.push(`${item.id} has an invalid sha256`);
  if (item.diagnosticDisposition !== 'candidate-pending-linguistic-review') failures.push(`${item.id} bypasses linguistic review`);
  const buffer = execFileSync('git', ['cat-file', '-p', `${item.audio.gitCommit}:${item.audio.originalPath}`], {
    cwd: root, encoding: 'buffer', maxBuffer: 32 * 1024 * 1024,
  });
  const actualSha256 = createHash('sha256').update(buffer).digest('hex');
  if (actualSha256 !== item.audio.sha256) failures.push(`${item.id} no longer matches its source blob`);
  const sourceBuffer = execFileSync('git', ['cat-file', '-p', `${item.contentSource.gitCommit}:${item.contentSource.path}`], {
    cwd: root, encoding: 'buffer', maxBuffer: 32 * 1024 * 1024,
  });
  const sourceSha256 = createHash('sha256').update(sourceBuffer).digest('hex');
  if (sourceSha256 !== item.contentSource.sha256) failures.push(`${item.id} no longer matches its content source`);
  if (!/^(array-order:\d+|audioFile:[a-z0-9-]+)$/.test(item.contentSource.mapping)) {
    failures.push(`${item.id} has no deterministic script mapping`);
  }
}

for (const [group, expected] of [['en-A1', 20], ['en-A2', 20], ['en-B1', 20], ['it-A1', 20]]) {
  if (groupCounts.get(group) !== expected) failures.push(`${group} expected ${expected}, found ${groupCounts.get(group) ?? 0}`);
}
if (failures.length) {
  process.stderr.write(`${failures.map(failure => `- ${failure}`).join('\n')}\n`);
  process.exit(1);
}
process.stdout.write(`${JSON.stringify({ status: 'PASS', inventoryVersion: manifest.inventoryVersion, groups: Object.fromEntries(groupCounts) }, null, 2)}\n`);
