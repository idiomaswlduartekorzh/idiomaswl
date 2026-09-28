import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputPath = join(root, 'config/diagnostic/recovered-listening-content-audit.json');
const writeMode = process.argv.includes('--write');
const privateArchiveRoot = join(root, '.diagnostic-private/legacy-audio/en');
const privateArchiveMounted = existsSync(privateArchiveRoot);
const existingAudit = existsSync(outputPath)
  ? JSON.parse(readFileSync(outputPath, 'utf8'))
  : null;
const pinnedAudio = new Map(
  (existingAudit?.items ?? [])
    .filter((item) => item.audio)
    .map((item) => [item.id, item.audio]),
);

const sources = [
  { level: 'A1', ref: '13343f8f^', path: 'src/data/practica/ingles-a1-listening.ts', exportName: 'LISTENING_A1_ALL' },
  { level: 'A2', ref: '9712f2d4^', path: 'src/data/practica/ingles-a2-listening.ts', exportName: 'LISTENING_A2_ALL' },
  { level: 'B1', ref: '2677368a^', path: 'src/data/practica/ingles-b1-listening.ts', exportName: 'LISTENING_B1_ALL' },
];

function git(...args) {
  return execFileSync('git', args, { cwd: root, encoding: args[0] === 'show' ? 'buffer' : 'utf8' });
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function historicalSourceExists(source) {
  try {
    execFileSync('git', ['cat-file', '-e', `${source.ref}:${source.path}`], {
      cwd: root, stdio: 'ignore',
    });
    return true;
  } catch {
    return false;
  }
}

function validatePinnedAudit() {
  if (!existingAudit) throw new Error(`Missing ${outputPath}; run with --write`);
  if (existingAudit.auditVersion !== 'diagnostic-recovered-listening-content-v1') {
    throw new Error('Recovered listening audit has an unexpected version');
  }
  if (existingAudit.policy?.operationalUseAllowed !== false || existingAudit.items?.length !== 60) {
    throw new Error('Recovered listening audit has an invalid policy or item count');
  }
  for (const item of existingAudit.items) {
    if (!/^[a-f0-9]{64}$/.test(item.source?.sourceSha256 ?? '')) {
      throw new Error(`${item.id} has an invalid source digest`);
    }
    if (!/^[a-f0-9]{64}$/.test(item.audio?.sha256 ?? '') || !(item.audio?.bytes > 0) || !(item.audio?.durationSeconds > 0)) {
      throw new Error(`${item.id} has invalid pinned audio metadata`);
    }
  }
}

if (!privateArchiveMounted && !sources.every(historicalSourceExists)) {
  validatePinnedAudit();
  process.stdout.write('✓ Recovered listening audit metadata valid; private archive and historical Git sources are not mounted in this build environment\n');
  process.exit(0);
}

function metadata(audioPath) {
  const output = execFileSync('/usr/bin/afinfo', [audioPath], { encoding: 'utf8' });
  const duration = output.match(/estimated duration:\s+([0-9.]+) sec/);
  if (!duration) throw new Error(`Cannot measure ${audioPath}`);
  const buffer = readFileSync(audioPath);
  return {
    sha256: sha256(buffer),
    bytes: statSync(audioPath).size,
    durationSeconds: Number(Number(duration[1]).toFixed(3)),
  };
}

const temporaryDirectory = mkdtempSync(join(tmpdir(), 'welearn-recovered-listening-'));
try {
  const modules = new Map();
  for (const source of sources) {
    const sourceBuffer = git('show', `${source.ref}:${source.path}`);
    const temporaryPath = join(temporaryDirectory, basename(source.path));
    writeFileSync(temporaryPath, sourceBuffer);
    const resolvedCommit = git('rev-parse', source.ref).trim();
    const imported = await import(`${pathToFileURL(temporaryPath).href}?commit=${resolvedCommit}`);
    modules.set(source.level, {
      source,
      resolvedCommit,
      sourceSha256: sha256(sourceBuffer),
      exercises: imported[source.exportName],
    });
  }

  const items = [];
  for (const [level, module] of modules) {
    if (!Array.isArray(module.exercises) || module.exercises.length !== 20) {
      throw new Error(`${level} recovered source must contain exactly 20 exercises`);
    }
    for (const exercise of module.exercises) {
      const order = Number(exercise.order);
      const itemId = `en-${level.toLowerCase()}-legacy-listening-${String(order).padStart(2, '0')}`;
      const audioPath = join(root, '.diagnostic-private/legacy-audio/en', level.toLowerCase(), `listening-${String(order).padStart(2, '0')}.mp3`);
      const audioExists = existsSync(audioPath);
      const pinned = privateArchiveMounted ? null : pinnedAudio.get(itemId);
      const audioAvailable = audioExists || Boolean(pinned);
      const transcriptLines = Array.isArray(exercise.transcript) ? exercise.transcript.filter((line) => line?.en?.trim()).length : 0;
      const detailQuestions = Array.isArray(exercise.details) ? exercise.details.length : 0;
      const questionObjects = [exercise.gist, ...(exercise.details ?? []), exercise.consolidation].filter(Boolean);
      const questionsWithSingleKey = questionObjects.filter((question) =>
        Array.isArray(question.options) && question.options.filter((option) => option.correct === true).length === 1,
      ).length;
      const completeTranscript = transcriptLines >= 3;
      const enoughQuestionsForTestlet = questionObjects.length >= 3 && questionsWithSingleKey === questionObjects.length;
      const disposition = !audioAvailable
        ? 'audio-missing'
        : !completeTranscript
          ? 'transcription-required'
          : !enoughQuestionsForTestlet
            ? 'question-repair-required'
            : 'ready-for-english-question-rewrite';
      items.push({
        id: itemId,
        levelCandidate: level,
        source: {
          path: module.source.path,
          gitCommit: module.resolvedCommit,
          sourceSha256: module.sourceSha256,
          exerciseId: exercise.id,
          exerciseContentSha256: sha256(JSON.stringify(exercise)),
        },
        evidence: {
          transcriptLines,
          detailQuestions,
          totalQuestionObjects: questionObjects.length,
          questionsWithSingleKey,
          promptLanguage: 'es',
          targetAudioLanguage: 'en',
          expectedDurationSeconds: Number(exercise.duration),
        },
        audio: audioExists
          ? { privatePath: audioPath.replace(`${root}/`, ''), ...metadata(audioPath) }
          : pinned ?? null,
        disposition,
        requiredActions: disposition === 'ready-for-english-question-rewrite'
          ? ['rewrite-prompts-and-options-in-target-language', 'independent-linguistic-review', 'human-audio-alignment-review']
          : disposition === 'transcription-required'
            ? ['transcribe-audio', 'verify-transcript-humanly', 'author-target-language-testlet', 'independent-linguistic-review']
            : ['repair-source-before-authoring'],
      });
    }
  }

  const byDisposition = Object.fromEntries(
    [...items.reduce((map, item) => map.set(item.disposition, (map.get(item.disposition) ?? 0) + 1), new Map())]
      .sort(([a], [b]) => a.localeCompare(b)),
  );
  const byLevel = Object.fromEntries(sources.map(({ level }) => [level, {
    items: items.filter((item) => item.levelCandidate === level).length,
    completeTranscripts: items.filter((item) => item.levelCandidate === level && item.evidence.transcriptLines >= 3).length,
    readyForQuestionRewrite: items.filter((item) => item.levelCandidate === level && item.disposition === 'ready-for-english-question-rewrite').length,
    transcriptionRequired: items.filter((item) => item.levelCandidate === level && item.disposition === 'transcription-required').length,
  }]));
  const audit = {
    auditVersion: 'diagnostic-recovered-listening-content-v1',
    snapshotDate: '2026-09-24',
    purpose: 'Content completeness and audio-binding audit; never a linguistic approval or operational release.',
    policy: {
      operationalUseAllowed: false,
      oldSpanishQuestionsReusable: false,
      reason: 'Spanish prompts and options add first-language reading to the listening construct.',
    },
    summary: {
      items: items.length,
      audioPresent: items.filter((item) => item.audio).length,
      byDisposition,
      byLevel,
    },
    items,
  };
  const rendered = `${JSON.stringify(audit, null, 2)}\n`;
  if (writeMode) {
    writeFileSync(outputPath, rendered);
    process.stdout.write(`Wrote ${outputPath}\n`);
  } else {
    if (!existsSync(outputPath)) throw new Error(`Missing ${outputPath}; run with --write`);
    if (readFileSync(outputPath, 'utf8') !== rendered) {
      throw new Error('Recovered listening audit is stale; regenerate it with --write');
    }
    process.stdout.write(`✓ Recovered listening audit current: ${items.length} audios; ${JSON.stringify(byDisposition)}\n`);
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
