import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { objectiveRows, mockFromPublicHtml } from './lib/ielts-answer-key-audit.mjs';
import { ieltsAnswerUnits, whitespaceWords } from './lib/ielts-text-metrics.mjs';
import { withIeltsListeningProductionTranscript } from '../src/data/mocks/ielts-listening-production.ts';
import { withIeltsListeningLegacyReplacementTranscript } from '../src/data/mocks/ielts-listening-legacy-replacement.ts';

// Inventory and screening, NOT academic approval. Never derives a trusted key
// from the same key being tested. Generated evidence belongs outside product code.
const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [key, ...value] = a.replace(/^--/, '').split('=');
  return [key, value.join('=')];
}));
for (const key of Object.keys(args)) {
  if (!['output', 'public', 'media'].includes(key)) throw Error(`Unknown flag ${key}`);
}
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const words = whitespaceWords;
const commandPath = command => {
  try { return execFileSync('/usr/bin/which', [command], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch { return null; }
};
const resolveBaseCommit = () => {
  const deploymentCommit = process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA;
  if (deploymentCommit?.trim()) return deploymentCommit.trim();
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return 'unavailable';
  }
};
const ffprobePath = commandPath('ffprobe');
const ffmpegPath = commandPath('ffmpeg');
const afinfoPath = fs.existsSync('/usr/bin/afinfo') ? '/usr/bin/afinfo' : null;
function imageDimensions(bytes, local) {
  if (bytes.length >= 24 && bytes.subarray(1, 4).toString() === 'PNG') {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  if (local.endsWith('.svg')) {
    const source = bytes.toString('utf8', 0, Math.min(bytes.length, 16_384));
    const viewBox = source.match(/viewBox=["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)["']/i);
    const width = source.match(/\bwidth=["']([\d.]+)(?:px)?["']/i);
    const height = source.match(/\bheight=["']([\d.]+)(?:px)?["']/i);
    if (viewBox || (width && height)) return {
      width: Number(width?.[1] ?? viewBox[1]),
      height: Number(height?.[1] ?? viewBox[2]),
    };
  }
  if (/\.jpe?g$/i.test(local)) {
    for (let offset = 2; offset + 9 < bytes.length;) {
      if (bytes[offset] !== 0xff) break;
      const marker = bytes[offset + 1];
      const length = bytes.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        return { width: bytes.readUInt16BE(offset + 7), height: bytes.readUInt16BE(offset + 5) };
      }
      if (length < 2) break;
      offset += length + 2;
    }
  }
  return null;
}
const normal = text => String(text).toLowerCase().normalize('NFKC')
  .replace(/[’']/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const cachedAssets = new Map();
async function asset(url, kind) {
  if (cachedAssets.has(url)) return cachedAssets.get(url);
  const local = url?.startsWith('/') ? path.join(root, 'public', url) : null;
  const exists = Boolean(local && fs.existsSync(local));
  const result = { url, kind, exists, bytes: exists ? fs.statSync(local).size : 0 };
  if (exists) {
    const bytes = fs.readFileSync(local);
    result.sha256 = hash(bytes);
    if (kind === 'image') result.dimensions = imageDimensions(bytes, local);
    if (kind === 'audio' && args.media === 'true') {
      try {
        if (ffprobePath && ffmpegPath) {
          const probe = JSON.parse(execFileSync(ffprobePath, ['-v', 'error', '-show_entries',
            'format=duration:stream=codec_name,sample_rate,channels', '-of', 'json', local], { encoding: 'utf8' }));
          result.seconds = Number(probe.format.duration);
          result.streams = probe.streams;
          execFileSync(ffmpegPath, ['-v', 'error', '-nostdin', '-i', local, '-f', 'null', '-'], { timeout: 120000 });
          result.probe = 'ffprobe+ffmpeg';
          result.decode = 'PASS';
        } else if (afinfoPath) {
          const probe = execFileSync(afinfoPath, [local], { encoding: 'utf8', timeout: 120000 });
          result.seconds = Number(probe.match(/estimated duration:\s*([\d.]+)\s*sec/i)?.[1]);
          result.streams = [{
            codec_name: probe.match(/Data format:\s+.*?\.([a-z0-9]+)/i)?.[1] ?? null,
            sample_rate: Number(probe.match(/Data format:\s+\d+\s+ch,\s*(\d+)\s+Hz/i)?.[1]) || null,
            channels: Number(probe.match(/Data format:\s+(\d+)\s+ch/i)?.[1]) || null,
          }];
          result.probe = 'afinfo';
          result.decode = Number.isFinite(result.seconds) && result.seconds > 0 ? 'PASS' : 'FAIL';
        } else {
          throw Error('No supported media probe found (ffprobe+ffmpeg or macOS afinfo)');
        }
      } catch (error) { result.decode = 'FAIL'; result.error = error.message.slice(0, 300); }
    }
  }
  if (args.public) {
    try {
      const response = await fetch(new URL(url, args.public), { method: 'HEAD', signal: AbortSignal.timeout(30000) });
      result.http = response.status;
      result.contentType = response.headers.get('content-type');
      result.publicBytes = Number(response.headers.get('content-length')) || null;
    } catch (error) { result.http = null; result.networkError = error.message; }
  }
  cachedAssets.set(url, result);
  return result;
}
const sets = [];
for (let n = 1; n <= 20; n++) {
  const source = `src/data/mocks/ielts-set-${n}.ts`;
  const authoredMock = (await import(new URL(`../${source}`, import.meta.url))).default;
  const mock = withIeltsListeningLegacyReplacementTranscript(withIeltsListeningProductionTranscript(authoredMock));
  const sections = skill => mock.sections.filter(s => s.skill === skill);
  const L = sections('listening'), R = sections('reading'), W = sections('writing').flatMap(s => s.questions);
  const S = sections('speaking').flatMap(section => section.questions).filter(question => question.type === 'speak');
  const issues = [];
  const add = (code, detail, severity = 'high') => issues.push({ code, detail, severity });
  let rows = [];
  try { rows = objectiveRows(mock); } catch (error) { add('STRUCTURE', error.message); }
  const counts = {};
  for (const skill of ['listening', 'reading']) {
    const numbers = rows.filter(r => r.skill === skill).flatMap(r => Array.from({ length: r.weight }, (_, i) => r.number + i));
    counts[skill] = numbers.length;
    if (JSON.stringify(numbers) !== JSON.stringify(Array.from({ length: 40 }, (_, i) => i + 1))) add('NUMBERING', skill);
  }
  const ids = mock.sections.flatMap(s => s.questions.map(q => q.id));
  if (new Set(ids).size !== ids.length) add('DUPLICATE_QUESTION_ID', 'Question IDs must be unique within the set');
  const audio = await Promise.all([...new Set(L.map(s => s.audioUrl))].map(url => asset(url, 'audio')));
  for (const a of audio) if (!a.exists || a.decode === 'FAIL' || (args.public && (a.http !== 200 || !a.contentType?.startsWith('audio/')))) add('AUDIO_UNAVAILABLE', a.url, 'critical');
  const reading = R.map(s => ({ part: s.part, title: s.title, words: words(s.passage), sha256: hash(s.passage ?? '') }));
  const readingWords = reading.reduce((a, r) => a + r.words, 0);
  if (R.length !== 3 || reading.some(r => r.words === 0)) add('READING_MISSING', 'Three non-empty passages required', 'critical');
  if (readingWords < 2150 || readingWords > 2750) add('READING_LENGTH', `${readingWords} whitespace-delimited words; official total range 2150–2750. Screening count includes embedded headings.`, 'high');
  if (L.length !== 4 || L.some(s => !s.transcript?.trim())) add('SCRIPT_MISSING', 'Four non-empty Listening scripts required');
  const task1 = W.find(q => q.type === 'write' && q.taskNumber === 1);
  const task2 = W.find(q => q.type === 'write' && q.taskNumber === 2);
  const writingImage = task1?.imageUrl ? await asset(task1.imageUrl, 'image') : null;
  if (!writingImage?.exists) add('WRITING_IMAGE_MISSING', 'Task 1 visual missing', 'critical');
  if (args.public && writingImage && (writingImage.http !== 200 || !writingImage.contentType?.startsWith('image/'))) add('WRITING_IMAGE_UNAVAILABLE', writingImage.url, 'critical');
  if (!task1?.text || !task2?.text || !(task1?.stimulus || task1?.stimulusLabel) || !task2?.stimulus) add('WRITING_PROMPT_MISSING', 'Task 1 needs a stimulus or chart description; Task 2 needs a prompt, both need task instructions');
  const readingImages = await Promise.all([...new Set(R.flatMap(s => s.questions.map(q => q.imageUrl).filter(Boolean)))].map(url => asset(url, 'image')));
  const lexicalFlags = [];
  for (const section of [...L, ...R]) {
    const stimulus = normal(section.skill === 'reading' ? section.passage : section.transcript);
    for (const q of section.questions) {
      if (['mcq', 'dialog'].includes(q.type) && (!Number.isInteger(q.answer) || !q.options[q.answer])) add('OPTION_KEY_INVALID', q.id, 'critical');
      if (q.type === 'matching') for (const i of q.items) if (!q.endings.some(e => e.letter === i.answer)) add('MATCH_KEY_INVALID', `${q.id}:${i.num}`, 'critical');
      if (q.type === 'multiselect') for (const letter of q.answers) if (!q.options.some(o => o.letter === letter)) add('MULTI_KEY_INVALID', q.id, 'critical');
      const blanks = q.type === 'formgroup' ? q.blanks : q.type === 'tablegroup' ? q.rows.flat().filter(c => typeof c !== 'string') : [];
      for (const b of blanks) {
        if (!b.answers?.length || b.answers.some(a => !String(a).trim())) add('EMPTY_ANSWER', `${q.id}:${b.num}`, 'critical');
        const writtenLimit = q.groupLabel?.match(/(?:NO MORE THAN |WRITE |CHOOSE )?(ONE|TWO|THREE) WORDS?/i)?.[1]?.toUpperCase();
        const limit = b.maxWords ?? ({ ONE: 1, TWO: 2, THREE: 3 })[writtenLimit];
        const overLimit = limit ? b.answers.filter(answer => ieltsAnswerUnits(answer) > limit) : [];
        if (overLimit.length) add('ANSWER_WORD_LIMIT_REVIEW', `${section.skill} ${b.num}: accepted variant(s) ${overLimit.map(answer => JSON.stringify(answer)).join(', ')} exceed ${limit} words/numbers; check the displayed instruction and hyphen/number rules`, 'high');
        // Judgement answers describe the passage; they need not occur in it.
        if (b.answers.every(a => ['true', 'false', 'yes', 'no', 'not given'].includes(normal(a)))) continue;
        const textual = b.answers.filter(a => /[a-z]/i.test(a) && !/\d/.test(a));
        if (textual.length && !b.answers.some(a => (` ${stimulus} `).includes(` ${normal(a)} `))) lexicalFlags.push({ skill: section.skill, question: b.num, group: q.id, answers: b.answers, reason: 'No literal accepted variant in the supplied text/script; manual check required, not proof of an incorrect key.' });
      }
    }
  }
  let publicMock = null;
  if (args.public) {
    try {
      const response = await fetch(new URL(`/examenes/ielts/practica/${mock.id}`, args.public), { signal: AbortSignal.timeout(30000) });
      const served = mockFromPublicHtml(await response.text(), mock.id);
      // Long prose can be Flight text references; comparing raw JSON would falsely
      // report drift. This projection verifies keys/identities, not rendered prose.
      publicMock = { http: response.status,
        objectiveMatch: JSON.stringify(objectiveRows(served)) === JSON.stringify(objectiveRows(mock)),
        proseComparison: 'NOT_CHECKED_RSC_TEXT_REFERENCES' };
      if (!publicMock.objectiveMatch) add('PUBLIC_KEY_DRIFT', 'Published objective mapping differs from audited source', 'critical');
    } catch (error) { publicMock = { error: error.message }; add('PUBLIC_PAGE_UNVERIFIED', error.message); }
  }
  const objectiveSha256 = hash(JSON.stringify(rows));
  const objectiveAuditRows = rows.map(row => {
    const section = [...L, ...R].find(candidate => candidate.questions.some(question => row.key === question.id || row.key.startsWith(`${question.id}__`)));
    const part = section?.skill === 'reading' ? R.indexOf(section) + 1 : L.indexOf(section) + 1;
    return { ...row, part: part > 0 ? part : null };
  });
  const listeningTranscriptSha256 = hash(JSON.stringify(L.map(s => ({ part: s.part, transcript: s.transcript ?? '' }))));
  const readingContentSha256 = hash(JSON.stringify(R.map(s => ({ part: s.part, passage: s.passage ?? '' }))));
  const writingContentSha256 = hash(JSON.stringify(W.map(q => ({ id: q.id, task: q.taskNumber, text: q.text ?? '', stimulus: q.stimulus ?? '', stimulusLabel: q.stimulusLabel ?? '', imageUrl: q.imageUrl ?? '' }))));
  const speakingContentSha256 = hash(JSON.stringify(S.map(question => ({
    id: question.id, part: question.part, partNumber: question.partNumber, text: question.text,
    cueCard: question.cueCard ?? '', followUp: question.followUp ?? [],
  }))));
  const sourceSha256 = hash(fs.readFileSync(path.join(root, source)));
  const contentSha256 = hash(JSON.stringify({ sourceSha256, objectiveSha256, listeningTranscriptSha256,
    readingContentSha256, writingContentSha256, speakingContentSha256 }));
  sets.push({ set: n, mockId: mock.id, source, sourceSha256, contentSha256, objectiveSha256, objectiveAuditRows,
    listeningTranscriptSha256, readingContentSha256, writingContentSha256, speakingContentSha256,
    audio, transcriptCount: L.filter(s => s.transcript).length,
    listening: L.map(s => ({ part: s.part, title: s.title, words: words(s.transcript), sha256: hash(s.transcript ?? '') })),
    reading, readingWords, writingImage,
    writingTasks: W.map(q => ({ id: q.id, task: q.taskNumber, stimulus: q.stimulus || q.stimulusLabel,
      stimulusWords: words(q.stimulus || q.stimulusLabel), instructionWords: words(q.text), minWords: q.minWords,
      imageUrl: q.imageUrl ?? null })),
    readingImages, points: counts, publicMock, issues, lexicalFlags,
    physicalAssetsComplete: audio.every(a => a.exists && a.decode !== 'FAIL') && reading.length === 3 && reading.every(r => r.words > 0) && Boolean(writingImage?.exists && task2),
    academicApproval: n === 1 ? 'PINNED_OBJECTIVE_KEY_ONLY' : 'NOT_AUDITED',
  });
}
const result = { generatedAt: new Date().toISOString(), baseCommit: resolveBaseCommit(),
  scope: '20 IELTS Academic mocks; structural/media inventory and lexical screening, not full audio or academic approval',
  readingFormatSource: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading', sets };
if (args.output) fs.writeFileSync(path.resolve(args.output), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ total: sets.length, physicalAssetsComplete: sets.filter(s => s.physicalAssetsComplete).map(s => s.set),
  withinReadingLength: sets.filter(s => !s.issues.some(i => i.code === 'READING_LENGTH')).map(s => s.set),
  issues: sets.map(s => ({ set: s.set, codes: s.issues.map(i => i.code), lexicalFlags: s.lexicalFlags.length })), output: args.output }, null, 2));
