/** Structural regression check for the admin key hub. Runs the actual TS registry. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const originalResolve = Module._resolveFilename;
const originalLoad = Module._load;
Module._resolveFilename = function resolve(request, parent, ...rest) {
  const source = request.startsWith('@/') ? path.join(root, 'src', request.slice(2)) : request;
  return originalResolve.call(this, source, parent, ...rest);
};
// Next's server-only guard belongs to its bundler; this process only executes the server audit.
Module._load = function load(request, parent, ...rest) {
  return request === 'server-only' ? {} : originalLoad.call(this, request, parent, ...rest);
};
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  module._compile(output, filename);
};

const { getMock, getRegisteredMockKeys } = require('../src/data/mocks/index.ts');
const { getAnswerKeyCatalog, auditMockKey } = require('../src/lib/exams/answer-key-catalog.ts');
const { acceptsExamAnswer } = require('../src/lib/exams/accepted-answer.ts');
const { getExamTranscriptResource } = require('../src/lib/exams/transcript-resource.ts');

const catalog = getAnswerKeyCatalog();
assert.deepEqual(new Set(catalog.map(item => item.key)), new Set(getRegisteredMockKeys()));
assert(catalog.length > 100, 'The published exam catalog unexpectedly shrank.');
for (const item of catalog) {
  assert(getMock(item.examSlug, item.mockId), `${item.key} is not a published mock`);
  assert.equal(item.issues, 0, `${item.key} has key-integrity alerts`);
}

const transcriptResources = catalog
  .map(item => ({ item, resource: getExamTranscriptResource(item.examSlug, item.mockId) }))
  .filter(({ resource }) => resource);
assert.equal(transcriptResources.length, 57, 'The transcript library must cover 57 published sets.');
assert.equal(new Set(transcriptResources.map(({ resource }) => resource.href)).size, 57, 'Transcript PDF routes must be unique.');
assert.equal(new Set(transcriptResources.map(({ resource }) => resource.answerKeyHref)).size, 57, 'Answer-key PDF routes must be unique.');
for (const { item, resource } of transcriptResources) {
  for (const [kind, href] of [['transcript', resource.href], ['answer key', resource.answerKeyHref]]) {
    const pdfPath = path.join(root, 'public', href.slice(1));
    assert(fs.existsSync(pdfPath), `${item.key} ${kind} is missing: ${href}`);
    const descriptor = fs.openSync(pdfPath, 'r');
    const signature = Buffer.alloc(4);
    fs.readSync(descriptor, signature, 0, signature.length, 0);
    fs.closeSync(descriptor);
    assert.equal(signature.toString(), '%PDF', `${item.key} ${kind} is not a valid PDF`);
    assert(fs.statSync(pdfPath).size > 10_000, `${item.key} ${kind} PDF is unexpectedly small`);
  }
}

const practiceClients = {
  'IELTSPracticeClient.tsx': 'className="prac-intro__sections"',
  'GoetheA1PracticeClient.tsx': 'className={styles.moduleGrid}',
  'LanguagePracticeClient.tsx': 'className="prac-intro__sections"',
  'Toefl2026PracticeClient.tsx': 'className="prac-intro__tips"',
};
for (const [client, contentMarker] of Object.entries(practiceClients)) {
  const clientPath = path.join(root, 'src/app/(site)/examenes/[exam]/practica/[mockId]', client);
  const clientSource = fs.readFileSync(clientPath, 'utf8');
  const downloadPosition = clientSource.lastIndexOf('<ExamPracticeDownloads');
  const contentPosition = clientSource.lastIndexOf(contentMarker);
  assert(downloadPosition >= 0, `${client} does not publish the practice resources.`);
  assert(contentPosition >= 0, `${client} is missing its intro content marker.`);
  assert(downloadPosition < contentPosition, `${client} hides the downloads below the intro content.`);
}

const fce = auditMockKey(getMock('cambridge-b2', 'set-3'));
assert.equal(fce.automatic, 82);
assert.equal(fce.sections[0].rows.map(row => row.options.find(option => option.correct).letter).join(''), 'CADBBDAC');
assert(acceptsExamAnswer('  HAS.  ', ['has']));
assert(!acceptsExamAnswer('had', ['has']));

console.log(`Claves íntegras: ${catalog.length} sets, ${new Set(catalog.map(item => item.examSlug)).size} exámenes, ${catalog.reduce((sum, item) => sum + item.automatic + item.reference, 0)} claves, 57 transcripciones PDF, 57 claves PDF, 0 alertas estructurales.`);
