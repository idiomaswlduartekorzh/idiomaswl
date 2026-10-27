/** Export the audited answer keys used by the platform for public PDF generation. */
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const outputPath = path.resolve(
  process.argv[2] ?? path.join(root, 'tmp/pdfs/exam-answer-keys/source-data.json'),
);

const originalResolve = Module._resolveFilename;
const originalLoad = Module._load;

Module._resolveFilename = function resolve(request, parent, ...rest) {
  const source = request.startsWith('@/') ? path.join(root, 'src', request.slice(2)) : request;
  return originalResolve.call(this, source, parent, ...rest);
};

Module._load = function load(request, parent, ...rest) {
  return request === 'server-only' ? {} : originalLoad.call(this, request, parent, ...rest);
};

require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;
  module._compile(output, filename);
};

const { EXAMS } = require('../src/data/exams.ts');
const { getMock } = require('../src/data/mocks/index.ts');
const { auditMockKey, getAnswerKeyCatalog } = require('../src/lib/exams/answer-key-catalog.ts');
const { getExamTranscriptResource } = require('../src/lib/exams/transcript-resource.ts');

const sets = getAnswerKeyCatalog()
  .map((item) => ({ item, resource: getExamTranscriptResource(item.examSlug, item.mockId) }))
  // Sets 21–40 use the factory-generated combined private review packet.
  // Keep this legacy exporter scoped to the 57 standalone public key PDFs.
  .filter(({ resource }) => resource && !resource.combinedReviewPacket)
  .map(({ item, resource }) => {
    const mock = getMock(item.examSlug, item.mockId);
    const audit = auditMockKey(mock);
    return {
      key: item.key,
      examSlug: item.examSlug,
      examName: EXAMS[item.examSlug]?.name ?? item.examSlug,
      mockId: item.mockId,
      setNumber: Number(item.mockId.match(/(\d+)$/)?.[1]),
      title: mock.title,
      subtitle: mock.subtitle ?? '',
      transcriptHref: resource.href,
      interfaceLanguage: resource.interfaceLanguage,
      audioLanguage: resource.audioLanguage,
      automatic: audit.automatic,
      reference: audit.reference,
      open: audit.open,
      issues: audit.issues,
      sections: audit.sections.map((section) => ({
        title: section.title,
        skill: section.skill,
        instructions: section.instructions,
        rows: section.rows.map((row) => ({
          number: row.number,
          answer: row.answer,
          type: row.type,
          mode: row.mode,
          alternatives: row.alternatives ?? [],
          issues: row.issues,
        })),
      })),
    };
  });

if (sets.length !== 57) throw new Error(`Expected 57 answer-key sets, found ${sets.length}`);
if (sets.some((set) => !Number.isInteger(set.setNumber) || set.issues !== 0)) {
  throw new Error('Every exported set must have a numeric set number and zero integrity issues.');
}

const payload = {
  generatedAt: new Date().toISOString(),
  scope: {
    ielts: sets.filter((set) => set.examSlug === 'ielts').length,
    goethe: sets.filter((set) => set.examSlug === 'goethe').length,
    fce: sets.filter((set) => set.examSlug === 'cambridge-b2').length,
    toefl: sets.filter((set) => set.examSlug === 'toefl').length,
    totalPdfs: sets.length,
  },
  sets,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, scope: payload.scope }, null, 2));
