import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { objectiveRows, mockFromPublicHtml } from './lib/ielts-answer-key-audit.mjs';

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
const words = text => (text ?? '').trim().split(/\s+/).filter(Boolean).length;
// IELTS treats a phone number or numeric range as a number even when visual
// grouping inserts spaces. Do not misreport those groups as multiple words.
const answerUnits = text => /^\s*[\d\s()+./–—-]+\s*$/u.test(String(text)) ? 1 : words(text);
const normal = text => String(text).toLowerCase().normalize('NFKC')
  .replace(/[’']/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const cachedAssets = new Map();
async function asset(url, kind) {
  if (cachedAssets.has(url)) return cachedAssets.get(url);
  const local = url?.startsWith('/') ? path.join(root, 'public', url) : null;
  const exists = Boolean(local && fs.existsSync(local));
  const result = { url, kind, exists, bytes: exists ? fs.statSync(local).size : 0 };
  if (exists) {
    result.sha256 = hash(fs.readFileSync(local));
    if (kind === 'audio' && args.media === 'true') {
      try {
        const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_entries',
          'format=duration:stream=codec_name,sample_rate,channels', '-of', 'json', local], { encoding: 'utf8' }));
        result.seconds = Number(probe.format.duration);
        result.streams = probe.streams;
        execFileSync('ffmpeg', ['-v', 'error', '-nostdin', '-i', local, '-f', 'null', '-'], { timeout: 120000 });
        result.decode = 'PASS';
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
  const mock = (await import(new URL(`../${source}`, import.meta.url))).default;
  const sections = skill => mock.sections.filter(s => s.skill === skill);
  const L = sections('listening'), R = sections('reading'), W = sections('writing').flatMap(s => s.questions);
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
        if (limit && b.answers.some(a => answerUnits(a) > limit)) add('ANSWER_WORD_LIMIT_REVIEW', `${section.skill} ${b.num}: at least one accepted variant exceeds ${limit} words; check the displayed instruction and hyphen/number rules`, 'high');
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
  sets.push({ set: n, mockId: mock.id, source, sourceSha256: hash(fs.readFileSync(path.join(root, source))),
    audio, transcriptCount: L.filter(s => s.transcript).length, reading, readingWords, writingImage,
    writingTasks: W.map(q => ({ id: q.id, task: q.taskNumber, stimulus: q.stimulus || q.stimulusLabel, minWords: q.minWords })),
    readingImages, points: counts, publicMock, issues, lexicalFlags,
    physicalAssetsComplete: audio.every(a => a.exists && a.decode !== 'FAIL') && reading.length === 3 && reading.every(r => r.words > 0) && Boolean(writingImage?.exists && task2),
    academicApproval: n === 1 ? 'PINNED_OBJECTIVE_KEY_ONLY' : 'NOT_AUDITED',
  });
}
const result = { generatedAt: new Date().toISOString(), baseCommit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
  scope: '20 IELTS Academic mocks; structural/media inventory and lexical screening, not full audio or academic approval',
  readingFormatSource: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading', sets };
if (args.output) fs.writeFileSync(path.resolve(args.output), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ total: sets.length, physicalAssetsComplete: sets.filter(s => s.physicalAssetsComplete).map(s => s.set),
  withinReadingLength: sets.filter(s => !s.issues.some(i => i.code === 'READING_LENGTH')).map(s => s.set),
  issues: sets.map(s => ({ set: s.set, codes: s.issues.map(i => i.code), lexicalFlags: s.lexicalFlags.length })), output: args.output }, null, 2));
