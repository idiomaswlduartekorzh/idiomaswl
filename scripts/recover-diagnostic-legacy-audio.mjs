import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const manifest = JSON.parse(readFileSync(resolve(root, 'config/diagnostic/legacy-audio-inventory.json'), 'utf8'));
const outputArgumentIndex = process.argv.indexOf('--output');
const outputRoot = resolve(root, outputArgumentIndex >= 0 ? process.argv[outputArgumentIndex + 1] : '.diagnostic-private/legacy-audio');
const relativeOutput = relative(root, outputRoot);

if (!relativeOutput || relativeOutput.startsWith(`..${sep}`) || relativeOutput === '..') {
  throw new Error('recovery output must be a dedicated directory inside the repository');
}
if (['public', 'src', 'config', 'docs'].some(directory => relativeOutput === directory || relativeOutput.startsWith(`${directory}${sep}`))) {
  throw new Error('recovery output must stay outside public application and source directories');
}

const recoverable = manifest.items.filter(item => item.language === 'en' && item.availability === 'git-recoverable');
if (recoverable.length !== 60) throw new Error(`expected 60 recoverable English audios, found ${recoverable.length}`);
let restored = 0;
let alreadyPresent = 0;
for (const item of recoverable) {
  const destination = resolve(outputRoot, item.language, item.levelCandidate.toLowerCase(), basename(item.audio.originalPath));
  const relativeDestination = relative(outputRoot, destination);
  if (relativeDestination.startsWith(`..${sep}`) || relativeDestination === '..') throw new Error(`unsafe destination for ${item.id}`);
  const buffer = execFileSync('git', ['cat-file', '-p', `${item.audio.gitCommit}:${item.audio.originalPath}`], {
    cwd: root, encoding: 'buffer', maxBuffer: 32 * 1024 * 1024,
  });
  const sha256 = createHash('sha256').update(buffer).digest('hex');
  if (sha256 !== item.audio.sha256) throw new Error(`${item.id} failed its recovery checksum`);
  mkdirSync(dirname(destination), { recursive: true });
  if (existsSync(destination)) {
    const existingSha256 = createHash('sha256').update(readFileSync(destination)).digest('hex');
    if (existingSha256 !== sha256) throw new Error(`${item.id} would overwrite a different recovered file`);
    alreadyPresent += 1;
  } else {
    writeFileSync(destination, buffer, { flag: 'wx' });
    restored += 1;
  }
}
process.stdout.write(`${JSON.stringify({ status: 'RECOVERED', files: recoverable.length, restored, alreadyPresent, outputRoot }, null, 2)}\n`);
