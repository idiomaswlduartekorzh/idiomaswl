import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputPath = join(root, 'config/diagnostic/legacy-audio-inventory.json');

const groups = [
  {
    language: 'en', level: 'A1', gitRef: '13343f8f^', audioPrefix: 'public/audio/ingles/a1',
    filePattern: /^listening-(\d{2})\.mp3$/, sourceDataPath: 'src/data/practica/ingles-a1-listening.ts',
    availability: 'git-recoverable', exposure: 'previously-public', mapping: 'array-order',
  },
  {
    language: 'en', level: 'A2', gitRef: '9712f2d4^', audioPrefix: 'public/audio/ingles/a2',
    filePattern: /^listening-(\d{2})\.mp3$/, sourceDataPath: 'src/data/practica/ingles-a2-listening.ts',
    availability: 'git-recoverable', exposure: 'previously-public', mapping: 'array-order',
  },
  {
    language: 'en', level: 'B1', gitRef: '2677368a^', audioPrefix: 'public/audio/ingles/b1',
    filePattern: /^listening-(\d{2})\.mp3$/, sourceDataPath: 'src/data/practica/ingles-b1-listening.ts',
    availability: 'git-recoverable', exposure: 'previously-public', mapping: 'array-order',
  },
  {
    language: 'it', level: 'A1', gitRef: 'bfebab2dd780573b5f618e66a5c9922a8224d071', audioPrefix: 'public/audio/italiano/a1',
    filePattern: /^it-a1-(.+)\.mp3$/, sourceGitRef: '4fb2202d', sourceDataPath: 'src/data/practica/italiano-a1-ascolto.ts',
    availability: 'worktree-public', exposure: 'public-practice', mapping: 'audio-file',
  },
];

function git(...args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
}

function gitBuffer(ref, path) {
  return execFileSync('git', ['cat-file', '-p', `${ref}:${path}`], {
    cwd: root, encoding: 'buffer', maxBuffer: 32 * 1024 * 1024,
  });
}

function audioMetadata(buffer, filename) {
  const tempDirectory = mkdtempSync(join(tmpdir(), 'welearn-diagnostic-audio-'));
  const tempPath = join(tempDirectory, filename);
  try {
    writeFileSync(tempPath, buffer);
    const output = execFileSync('/usr/bin/afinfo', [tempPath], { encoding: 'utf8' });
    const duration = output.match(/estimated duration:\s+([0-9.]+) sec/);
    const channels = output.match(/Data format:\s+(\d+) ch/);
    const sampleRate = output.match(/Data format:\s+\d+ ch,\s+(\d+) Hz/);
    const bitRate = output.match(/bit rate:\s+(\d+) bits per second/);
    if (!duration || !channels || !sampleRate || !bitRate) throw new Error(`incomplete audio metadata for ${filename}`);
    return {
      durationSeconds: Number(Number(duration[1]).toFixed(3)), channels: Number(channels[1]),
      sampleRateHz: Number(sampleRate[1]), bitRateBps: Number(bitRate[1]), decodeStatus: 'pass',
    };
  } finally {
    rmSync(tempDirectory, { recursive: true, force: true });
  }
}

const items = [];
for (const group of groups) {
  const resolvedAudioCommit = git('rev-parse', group.gitRef);
  const resolvedSourceCommit = git('rev-parse', group.sourceGitRef ?? group.gitRef);
  const sourceBuffer = gitBuffer(resolvedSourceCommit, group.sourceDataPath);
  const paths = git('ls-tree', '-r', '--name-only', resolvedAudioCommit, group.audioPrefix)
    .split('\n').filter(Boolean).filter(path => group.filePattern.test(basename(path))).sort();
  if (paths.length !== 20) throw new Error(`${group.language}-${group.level} contains ${paths.length} legacy audios, expected 20`);

  paths.forEach((path, index) => {
    const buffer = gitBuffer(resolvedAudioCommit, path);
    items.push({
      id: `${group.language}-${group.level.toLowerCase()}-legacy-listening-${String(index + 1).padStart(2, '0')}`,
      language: group.language, levelCandidate: group.level, order: index + 1,
      exposure: group.exposure, availability: group.availability,
      diagnosticDisposition: 'candidate-pending-linguistic-review',
      audio: {
        originalPath: path, gitCommit: resolvedAudioCommit,
        gitBlob: git('rev-parse', `${resolvedAudioCommit}:${path}`),
        sha256: createHash('sha256').update(buffer).digest('hex'), bytes: buffer.byteLength,
        ...audioMetadata(buffer, basename(path)),
      },
      contentSource: {
        gitCommit: resolvedSourceCommit,
        gitBlob: git('rev-parse', `${resolvedSourceCommit}:${group.sourceDataPath}`),
        sha256: createHash('sha256').update(sourceBuffer).digest('hex'),
        path: group.sourceDataPath,
        mapping: group.mapping === 'array-order'
          ? `array-order:${index + 1}`
          : `audioFile:${basename(path, extname(path))}`,
      },
    });
  });
}

const manifest = {
  inventoryVersion: 'diagnostic-legacy-audio-v1', snapshotDate: '2026-09-24',
  purpose: 'Recovery provenance and technical inventory; inclusion does not imply linguistic approval.',
  totals: {
    items: items.length,
    englishGitRecoverable: items.filter(item => item.language === 'en').length,
    italianPublicLegacy: items.filter(item => item.language === 'it').length,
  },
  items,
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
const manifestSha256 = createHash('sha256').update(readFileSync(outputPath)).digest('hex');
process.stdout.write(`${JSON.stringify({ outputPath, manifestSha256, totals: manifest.totals }, null, 2)}\n`);
