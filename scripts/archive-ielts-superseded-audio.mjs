#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...rest] = argument.replace(/^--/u, '').split('=');
  return [key, rest.length ? rest.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['source-commit', 'destination'].includes(key), `Unknown flag: ${key}`);
assert.ok(args['source-commit'], '--source-commit is required');
assert.ok(args.destination, '--destination is required');
const sourceCommit = execFileSync('git', ['rev-parse', `${args['source-commit']}^{commit}`], { cwd: root, encoding: 'utf8' }).trim();
const destination = path.resolve(args.destination);
assert.ok(!fs.existsSync(destination), `Archive destination already exists: ${destination}`);
fs.mkdirSync(destination, { recursive: true });
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const rows = [];
for (let set = 1; set <= 12; set += 1) {
  const repositoryPath = `public/audio/ielts/ielts-listening-set-${set}.mp3`;
  const previous = execFileSync('git', ['show', `${sourceCommit}:${repositoryPath}`], { cwd: root, maxBuffer: 30 * 1024 * 1024 });
  const current = fs.readFileSync(path.join(root, repositoryPath));
  const filename = `ielts-listening-set-${set}-superseded.mp3`;
  fs.writeFileSync(path.join(destination, filename), previous);
  rows.push({ set, filename, sourceRepositoryPath: repositoryPath, sourceSha256: sha256(previous),
    currentProductionSha256: sha256(current), bytes: previous.length });
}
const manifestCore = { schemaVersion: 1, createdAt: new Date().toISOString(), sourceCommit,
  purpose: 'Recoverable candidate bank. These masters are superseded and are not approved for direct production use.', rows };
const manifest = { ...manifestCore, manifestSha256: sha256(JSON.stringify(manifestCore)) };
fs.writeFileSync(path.join(destination, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
fs.writeFileSync(path.join(destination, 'README.txt'), 'Superseded IELTS Listening masters from Sets 1-12. Preserve for future exam or placement-test candidates. Reuse requires question correspondence, technical QA, ASR Q1-Q40 and human approval.\n');
console.log(JSON.stringify({ status: 'ARCHIVED', destination, files: rows.length, sourceCommit,
  totalBytes: rows.reduce((sum, row) => sum + row.bytes, 0), manifestSha256: manifest.manifestSha256 }, null, 2));
