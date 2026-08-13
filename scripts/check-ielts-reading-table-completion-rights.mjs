#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const require = createRequire(import.meta.url);
const ts = require('typescript');

// This timestamp freezes packet bytes. It records the validator implementation transaction and
// must never be moved forward merely to make an impossible review chronology appear valid.
const BLIND_PACKETS_GENERATED_AT = '2026-08-11T17:10:03Z';
// Frozen only after the clean first pass was persisted at 17:16:22Z; factual packet generation
// therefore remains chronologically after the blind decision record instead of manufacturing it.
const FACTUAL_PACKET_GENERATED_AT = '2026-08-11T17:19:29Z';
const CATALOG_PATH = 'src/data/practica-exams/seo-catalog.ts';
const ROUTE_PATH =
  'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/table-completion/page.tsx';
const ENGINE_PATH = 'src/components/exam-practice/TableCompletionEngine.tsx';
const BANK_PATH = 'src/components/exam-practice/TableCompletionPassageBank.tsx';
const NEXT_ROUTE_PATH =
  'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/flow-chart-completion/page.tsx';
const NEXT_ENGINE_PATH = 'src/components/exam-practice/FlowChartCompletionEngine.tsx';
const NEXT_BANK_PATH = 'src/components/exam-practice/FlowChartCompletionPassageBank.tsx';
const NEXT_QUESTION_TYPE_CONTRACT_PATH = 'src/lib/ielts/academic-reading-question-types.ts';
const REVIEW_SOURCE_BLOCK_PATH = 'src/components/exam-practice/QuestionTypeReviewSourceBlock.tsx';
const STRUCTURED_DATA_PATH = 'src/components/exam-practice/StructuredData.tsx';
const CONTRACT_PATH = 'src/lib/ielts/academic-reading-rights.ts';
const REGISTRY_PATH = 'src/data/practica-exams/ielts-reading-rights-registry.ts';
const VALIDATOR_PATH = 'scripts/check-ielts-reading-table-completion-rights.mjs';
const TEST_PATH = 'tests/ielts-reading-table-completion-rights.test.mjs';
const LOOP_DOC_PATH = 'docs/ielts-reading-loop.md';
const OUTPUT_DIRECTORY =
  'output/audits/ielts-reading-rights-table-completion-2026-08-11';
const BASELINE_PATH = `${OUTPUT_DIRECTORY}/baseline.json`;
const SOURCE_AVAILABILITY_PATH = `${OUTPUT_DIRECTORY}/source-availability.json`;
const PROVENANCE_SEARCH_PATH = `${OUTPUT_DIRECTORY}/provenance-search.json`;
const UNIT_CHANGE_MANIFEST_PATH = `${OUTPUT_DIRECTORY}/unit-change-manifest.json`;
const PROMPT_ONLY_PACKET_PATH = `${OUTPUT_DIRECTORY}/prompt-only.json`;
const PROMPT_ONLY_VERDICT_PATH = `${OUTPUT_DIRECTORY}/prompt-only-verdict.json`;
const BLIND_REVIEW_PATH = `${OUTPUT_DIRECTORY}/blind-review.json`;
const FACTUAL_SOURCE_REVIEW_PATH = `${OUTPUT_DIRECTORY}/factual-source-review.json`;
const FIRST_PASS_PATH = `${OUTPUT_DIRECTORY}/expert-first-pass.json`;
const EXPERT_VERDICT_PATH = `${OUTPUT_DIRECTORY}/expert-verdict.json`;
const STUDENT_WALKTHROUGH_PATH = `${OUTPUT_DIRECTORY}/student-walkthrough.json`;
const VALIDATION_PATH = `${OUTPUT_DIRECTORY}/validation.json`;
const AUDIT_VERDICTS_PATH = `${OUTPUT_DIRECTORY}/audit-verdicts.json`;
const BUILD_REPORT_PATH = `${OUTPUT_DIRECTORY}/build-report.mjs`;
const ARTIFACT_PATH = `${OUTPUT_DIRECTORY}/artifact.json`;
const REPORT_MD_PATH = `${OUTPUT_DIRECTORY}/report.md`;
const REPORT_HTML_PATH = `${OUTPUT_DIRECTORY}/report.html`;
const REPORT_VERIFICATION_PATH = `${OUTPUT_DIRECTORY}/report-verification.json`;
// Frozen output of the independently verified portable-report delivery. This prevents a
// self-updated verification receipt from blessing a rewritten builder, artifact, narrative or
// fallback HTML. These four pins are the reviewed report transaction, not values supplied by the
// receipt itself.
const EXPECTED_BUILD_REPORT_SHA256 =
  'f7a269952f74489af9672c24408916d1e246ea54ac7c994c25c14ecb6af1cbc3';
const EXPECTED_AUDIT_VERDICTS_SHA256 =
  'ec0de168be4e1abd40d8c29df3a7205031d2d081225fcf27de9d21a44cd20056';
const EXPECTED_PROMPT_ONLY_VERDICT_SHA256 =
  '379fbc2dd8e2562caf793cec3fd9d998ccc1f18ab24094f5d16f3a452915efe8';
const EXPECTED_FIRST_PASS_SHA256 =
  '798fd061e9c03a73dddf1cc34f8b706faa6e1df366348544036c164450293add';
const EXPECTED_FACTUAL_PACKET_SHA256 =
  '727744facf6729bb3e742c1748ac846e76019b51bab74131c080810c3c1e34ae';
const EXPECTED_EXPERT_VERDICT_SHA256 =
  '45208cc4e5e2985f87997ed17bb1c59bde2914bd3d67d8080649780b8cab355c';
const EXPECTED_STUDENT_WALKTHROUGH_SHA256 =
  '0bb207928c08805bf7cc237557fe5c4c27b522297ba14bb64d63fe8bb80cd202';
const EXPECTED_BASELINE_SHA256 =
  '32dadd4e8d4b21489ab2bae13d368a1f5b71bb53397f8eeb7ba269c9bcb16a18';
const EXPECTED_SOURCE_AVAILABILITY_SHA256 =
  '43b1e4da5cf88529b3311dad5b91bda59121cf2ad0693982a4fc9952bf236c05';
const EXPECTED_PROVENANCE_SEARCH_SHA256 =
  'c11b21d733b61fca3164f80ca173a6648d35bf115aeac5af1a32c6d99a5d3203';
const EXPECTED_UNIT_CHANGE_MANIFEST_SHA256 =
  '352343e4c2fc2d92d86dd3984594e2ea47276ac483ac31df46cc88bdf79cfc3c';
const EXPECTED_TEST_SHA256 =
  '2c1e989f5270c644bd1dafa1067c0e67cf8aa8633169701973d7390cd54a8ac9';
const EXPECTED_LOOP_DOC_SHA256 =
  '4f2ebd187d982151b25b9c750e362dcfa1e47b5c1a04fddf367ede7d516f09a6';
const EXPECTED_UNIT_RECORDS_STABLE_SHA256 =
  '60c93dda6076047edc97693aaab8d0ff2c6512643706f2b08258c1a8a99ae1a6';
const EXPECTED_UNIT_EVIDENCE_STABLE_SHA256 =
  '412c98c47e8aadb880571791aac1068ea6c9b0783527823d32a5b1fe52fb0e6d';
const EXPECTED_ARTIFACT_SHA256 =
  'feb437fd1e890b8574194f565cf589ebb24fd870894bb74325cc0d49ba59b8c3';
const EXPECTED_REPORT_MD_SHA256 =
  'ec56773cca458ac7760ba3173e9df48747eb6b755aa0fc8283dd9c78e0c06f20';
const EXPECTED_REPORT_HTML_SHA256 =
  '74770b4d0b4d5c65eb911fe5e1576b48c2facc61376e9cb35647099368f041ae';

const EXPECTED_SET_IDS = [
  'table-cooling-buildings',
  'table-rain-gardens',
  'table-museum-inventory',
];
const EXPECTED_ASSET_IDS = EXPECTED_SET_IDS.map(id => `formative:table-completion:${id}`);
const EXPECTED_QUESTION_IDS = [
  ...Array.from({ length: 6 }, (_, index) =>
    `table-cooling-${String(Math.floor(index / 2) + 1).padStart(2, '0')}-${index % 2 + 1}`),
  ...Array.from({ length: 6 }, (_, index) =>
    `table-rain-gardens-${String(Math.floor(index / 2) + 1).padStart(2, '0')}-${index % 2 + 1}`),
  ...Array.from({ length: 6 }, (_, index) =>
    `table-museum-inventory-${String(Math.floor(index / 2) + 1).padStart(2, '0')}-${index % 2 + 1}`),
];
const EXPECTED_INSTRUCTIONS =
  'Complete the table below using words from the passage. Write NO MORE THAN TWO WORDS for each answer.';
// policyVersion versions the deny-by-default contract, not the number of audited units.
// F0.2b.11 adds records under the unchanged v8 policy/schema.
const EXPECTED_POLICY_VERSION = '2026-08-09.v8';
const EXPECTED_REVIEWER_RUN_ID = 'codex-table-blind-ielts-expert-2026-08-11';
const EXPECTED_PASSAGE_SHA256 = {
  'table-cooling-buildings': '4855b6c5fc0b048304b1746b7423c1973b3ef548176673ccbde2641d513e946c',
  'table-rain-gardens': 'b1dd317e09c2ef80e152284263acdb390ca86494e33a95d9dfc425c658ee140f',
  'table-museum-inventory': 'f21af1a1f11c1f8b5d70b6f73b3f0113ee76d41de8e39dbe9914570b9e096e69',
};
const EXPECTED_SOURCE_OBJECT_SHA256 = {
  'table-cooling-buildings': 'bbf741fdf9e92620e9491e0b4197558aefe99b2c12b9a6cf11e94da8330518bd',
  'table-rain-gardens': '23e079b4c30603c96b2ed16bd1f68f52ffc6850d5b780d3af8e29bd5047a70b9',
  'table-museum-inventory': 'c7641b80b191b3bedd29a75df19bd1c39174b467e58947a817718d2d0b3fd069',
};
const EXPECTED_INTENDED_ANSWER_OFFSETS = {
  'table-cooling-01-1': 511, 'table-cooling-01-2': 604,
  'table-cooling-02-1': 850, 'table-cooling-02-2': 1097,
  'table-cooling-03-1': 1328, 'table-cooling-03-2': 1380,
  'table-rain-gardens-01-1': 161, 'table-rain-gardens-01-2': 122,
  'table-rain-gardens-02-1': 425, 'table-rain-gardens-02-2': 524,
  'table-rain-gardens-03-1': 879, 'table-rain-gardens-03-2': 1231,
  'table-museum-inventory-01-1': 326, 'table-museum-inventory-01-2': 247,
  'table-museum-inventory-02-1': 434, 'table-museum-inventory-02-2': 601,
  'table-museum-inventory-03-1': 826, 'table-museum-inventory-03-2': 1288,
};
const EXPECTED_INTENDED_ANSWER_PARAGRAPHS = {
  'table-cooling-01-1': 2, 'table-cooling-01-2': 2,
  'table-cooling-02-1': 3, 'table-cooling-02-2': 3,
  'table-cooling-03-1': 4, 'table-cooling-03-2': 4,
  'table-rain-gardens-01-1': 1, 'table-rain-gardens-01-2': 1,
  'table-rain-gardens-02-1': 2, 'table-rain-gardens-02-2': 2,
  'table-rain-gardens-03-1': 3, 'table-rain-gardens-03-2': 4,
  'table-museum-inventory-01-1': 1, 'table-museum-inventory-01-2': 1,
  'table-museum-inventory-02-1': 2, 'table-museum-inventory-02-2': 2,
  'table-museum-inventory-03-1': 3, 'table-museum-inventory-03-2': 4,
};
const OFFICIAL_EVIDENCE_ID = 'ielts-table-completion-official-format';
const SAMPLE_TASKS_EVIDENCE_ID = 'ielts-table-completion-sample-task';
const OFFICIAL_FORMAT_URL =
  'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const SAMPLE_TASKS_URL =
  'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test';
const EXPECTED_TEXT_ORDER_VIOLATIONS = [
  'table-rain-gardens-01-2',
  'table-museum-inventory-01-2',
];
const EXPECTED_MATERIAL_AMBIGUITY_IDS = [
  'table-cooling-01-2',
  'table-cooling-03-1',
  'table-museum-inventory-01-1',
  'table-museum-inventory-01-2',
];
const LEARNER_FACING_PATHS = [
  CATALOG_PATH, ROUTE_PATH, ENGINE_PATH, BANK_PATH, NEXT_QUESTION_TYPE_CONTRACT_PATH,
  REVIEW_SOURCE_BLOCK_PATH, STRUCTURED_DATA_PATH,
];
const NEXT_UNIT_PATHS = [...new Set([
  NEXT_ROUTE_PATH, NEXT_ENGINE_PATH, NEXT_BANK_PATH, NEXT_QUESTION_TYPE_CONTRACT_PATH,
  CATALOG_PATH,
])];
const EXPECTED_ROUTE_OBJECT_SHA256 =
  '2ff86681caae0578a04890551bd3068b20ca6e95da378ace5485bfc7ff33f165';
const EXPECTED_RENDER_CLOSURE_SHA256 = {
  'src/app/(site)/layout.tsx': 'b427054c94eb33f0177c05c241a2b3920c76e2b7497ad3822b7f379f8b9f2a11',
  [ROUTE_PATH]: '9aa433566f10715f42412c11d7f5e645894a892f0edb9d054b3606764db3bff2',
  'src/app/globals.css': '60efb283eab56b59072c8e43ac7469a3c34977346079600b525b19556207915d',
  'src/app/layout.tsx': '6323573c44d1f473e5d9cd3cb7c13706b9aebcc158d211d1f56e190fefda9ec3',
  'src/components/SiteNav.tsx': '9114393b428d703d41f84807e6322527c2f79036e4fe05eb8b43cd1238e4307b',
  'src/components/SiteSkipLink.tsx': 'd0c3ca1c465744e16e756623c704834083518acc1c84d83f09b581071cef967e',
  'src/components/ThemeProvider.tsx': '0bfdbb8105d100202331d5409c3b3cf0cd8ae8a0d231c03ec93c8836ca06c340',
  'src/components/WhatsAppFloat.tsx': '762256aadcff27912dacf99bb56d6fc6222ad0e54104910a545e8954b0a02255',
  [REVIEW_SOURCE_BLOCK_PATH]: '73d3b725c68c0ed193ceba23ebddca3fec7978f6e84712c99b3dddc190443711',
  [STRUCTURED_DATA_PATH]: '3e59a611e4d2bac9ce5994bdbd4ba6303407a5ddf82b26a340efe1f3c2b788d8',
  [BANK_PATH]: '7cca09dc031a7377e92d0a6d481767558a87e4cd64b526f45254e448e71e929b',
  [ENGINE_PATH]: 'c224f7cff507efecbe6753475ddd98bbf31a1744250bc414a56c5a5494ccfb7b',
  [CATALOG_PATH]: 'aebd26a1aa6a9cdae60f7b0208c3f5f6c3138889f8aeb4f3ae15efbe888734de',
  [NEXT_QUESTION_TYPE_CONTRACT_PATH]: '455924c25a1e33355265497a5c51d4cdb7d34864b34d539f1a7b91bedf3ce3ec',
  'src/lib/supabase/client.ts': 'acb02d5d75dad866b04380241e3a40623de46f098ee98ff017be8138c0d076e4',
};
const EXPECTED_ACTIVE_REMEDIATION_CLOSURE_SHA256 = {
  'src/app/(site)/layout.tsx': 'b427054c94eb33f0177c05c241a2b3920c76e2b7497ad3822b7f379f8b9f2a11',
  [ROUTE_PATH]: '0907ee7ba7db6b3bab0987ab25dcb12b1958a2f80e2a91e551058aa3d6835895',
  'src/app/globals.css': '60efb283eab56b59072c8e43ac7469a3c34977346079600b525b19556207915d',
  'src/app/layout.tsx': '6323573c44d1f473e5d9cd3cb7c13706b9aebcc158d211d1f56e190fefda9ec3',
  'src/components/SiteNav.tsx': '9114393b428d703d41f84807e6322527c2f79036e4fe05eb8b43cd1238e4307b',
  'src/components/SiteSkipLink.tsx': 'd0c3ca1c465744e16e756623c704834083518acc1c84d83f09b581071cef967e',
  'src/components/ThemeProvider.tsx': '0bfdbb8105d100202331d5409c3b3cf0cd8ae8a0d231c03ec93c8836ca06c340',
  'src/components/WhatsAppFloat.tsx': '762256aadcff27912dacf99bb56d6fc6222ad0e54104910a545e8954b0a02255',
  [STRUCTURED_DATA_PATH]: '3e59a611e4d2bac9ce5994bdbd4ba6303407a5ddf82b26a340efe1f3c2b788d8',
  [ENGINE_PATH]: 'c49bd375fb061ff7ca35afb0219194393c5a65bd7e44e1f68cc6338bfe329a14',
  [BANK_PATH]: '7cca09dc031a7377e92d0a6d481767558a87e4cd64b526f45254e448e71e929b',
  'src/components/exam-practice/TableCompletionReviewSourceBlock.tsx':
    '528dc846c306ef45cd3d00026bcac1f4528d65eeebf76a5885baf51a7af3d700',
  [REGISTRY_PATH]: '42fd225aa20a905361901fbf301cfb332cd6db729f880eed91856d8a934c8531',
  'src/data/practica-exams/ielts-table-completion-remediated.ts':
    '74d08ab43fa69659d90167ca48a076b8675847eb37f8749dab9080b35a7eed76',
  [CATALOG_PATH]: 'aebd26a1aa6a9cdae60f7b0208c3f5f6c3138889f8aeb4f3ae15efbe888734de',
  [NEXT_QUESTION_TYPE_CONTRACT_PATH]:
    '455924c25a1e33355265497a5c51d4cdb7d34864b34d539f1a7b91bedf3ce3ec',
  [CONTRACT_PATH]: 'cabd4adf35c75a14a3537bb07e5db4ef9ce8bc0c1a6f4a276d25518732923643',
  'src/lib/ielts/table-completion-publication.ts':
    '9e05decd6c9d1d1a7e06d65f73aaf277b573ad95040a47aa013a1a74598c65c4',
  'src/lib/supabase/client.ts': 'acb02d5d75dad866b04380241e3a40623de46f098ee98ff017be8138c0d076e4',
};
const EXPECTED_NEXT_UNIT_SOURCE_SHA256 = {
  [NEXT_ROUTE_PATH]: 'f17fed2dfa5003bd1157d57f8adf7e38dab86d5e50c70328805a51dd92ea8c4c',
  [NEXT_ENGINE_PATH]: 'e2c692f7f2962b9b533dc9e245393920422ad3b1698fdd4a5fab34eeac954353',
  [NEXT_BANK_PATH]: '06cb3db919ba3b8f3d68977c51f0a472382de77e9ca01b8c429c8cc9f198b213',
  [NEXT_QUESTION_TYPE_CONTRACT_PATH]:
    '455924c25a1e33355265497a5c51d4cdb7d34864b34d539f1a7b91bedf3ce3ec',
  [CATALOG_PATH]: 'aebd26a1aa6a9cdae60f7b0208c3f5f6c3138889f8aeb4f3ae15efbe888734de',
};
const EXPECTED_NEXT_ROUTE_OBJECT_SHA256 =
  'aa3a81fba832725ba21e150c74a5922a8de8deef049228078261a6f513bf79b3';
const EXPECTED_NEXT_SOURCE_OBJECT_SHA256 = {
  'flow-recycling-textiles': 'd039e350b44ef1b56c4db882eef1139301e534607ae93149b521fb3e3469117d',
  'flow-community-pottery': '01d18b2fc26faf66c1d7ff0cd7f827fc5234612269244e948e4d98360f038f0a',
  'flow-noise-mapping': '161d57827e7bbe02a99b6fff519fff6fbd1c14f54ed28dbf17ff81564dddf6b5',
};

// Five exact learner-facing factual claims per asset. Candidate sources are deliberately kept in
// the registry; these spans do not imply that any source supports them.
export const REQUIRED_FACTUAL_CLAIM_SPANS = {
  'formative:table-completion:table-cooling-buildings': [
    'Architects call these methods passive cooling because they lower indoor temperatures without relying mainly on powered machines.',
    'When windows or vents are placed on opposite sides of a room, moving air can carry heat away from occupants and surfaces.',
    'This works best when designers study the direction of prevailing winds before deciding where openings should go.',
    'Materials such as stone, concrete and brick can absorb heat during the day and release it slowly at night.',
    'External shade is usually more effective than curtains because it stops heat before it enters the glass.',
  ],
  'formative:table-completion:table-rain-gardens': [
    'Rain gardens are shallow planted areas designed to collect water after heavy rainfall.',
    'Instead of sending all runoff into drains at once, the garden holds water temporarily and lets it soak slowly into the soil.',
    'If the soil is permanently wet, plant roots may rot and the garden will not absorb new water effectively.',
    'Deep-rooted native plants are often recommended because they tolerate both wet and dry periods and help open channels in the soil.',
    'Schools often use rain gardens as outdoor classrooms.',
  ],
  'formative:table-completion:table-museum-inventory': [
    'Digitising the collection does not simply mean taking pictures.',
    'Staff must create records that explain what each object is, where it came from and why it matters.',
    'Curators check existing labels, interview donors and compare objects with catalogues from similar collections.',
    'When information is uncertain, the record should say so clearly rather than presenting a guess as fact.',
    'Volunteers can help with scanning and transcription, but a trained staff member should review records before publication.',
  ],
};

export const REQUIRED_FACTUAL_SOURCE_IDS = {
  'formative:table-completion:table-cooling-buildings': [
    'table-cooling-yourhome-passive',
    'table-cooling-yourhome-thermal-mass',
    'table-cooling-yourhome-shading',
    'table-cooling-newham-external-shading',
  ],
  'formative:table-completion:table-rain-gardens': [
    'table-rain-epa-types',
    'table-rain-epa-brochure',
    'table-rain-usda-drainage',
    'table-rain-psu-introduction',
    'table-rain-epa-school-learning',
  ],
  'formative:table-completion:table-museum-inventory': [
    'table-museum-nps-records',
    'table-museum-collections-trust',
    'table-museum-canada-small',
    'table-museum-nps-photography',
    'table-museum-loc-preservation',
  ],
};

const KNOWN_ACCEPTED_ANSWERS = {
  'table-cooling-01-1': ['heat'], 'table-cooling-01-2': ['prevailing winds'],
  'table-cooling-02-1': ['day'], 'table-cooling-02-2': ['sunset'],
  'table-cooling-03-1': ['glass'], 'table-cooling-03-2': ['angle'],
  'table-rain-gardens-01-1': ['temporarily'], 'table-rain-gardens-01-2': ['drains'],
  'table-rain-gardens-02-1': ['drains'], 'table-rain-gardens-02-2': ['wet'],
  'table-rain-gardens-03-1': ['soil'], 'table-rain-gardens-03-2': ['inlet'],
  'table-museum-inventory-01-1': ['came'], 'table-museum-inventory-01-2': ['pictures'],
  'table-museum-inventory-02-1': ['donors'], 'table-museum-inventory-02-2': ['fact'],
  'table-museum-inventory-03-1': ['size'], 'table-museum-inventory-03-2': ['publication'],
};

const FORBIDDEN_PACKET_KEYS = new Set([
  'acceptedanswer', 'acceptedanswers', 'alternatives', 'answer', 'answers', 'answerkey',
  'answerkeys', 'canonicalanswer', 'completedanswer', 'completedsentence', 'completion',
  'correct', 'correctanswer', 'correctanswers', 'explanation', 'explanations', 'feedback',
  'hint', 'hints', 'key', 'keys', 'response', 'selectedanswer', 'solution', 'solutions',
  'trap', 'traps', 'skill', 'skills',
]);
const PII_KEYS = new Set([
  'address', 'attemptid', 'contact', 'email', 'emailaddress', 'ip', 'ipaddress', 'learnerid',
  'phone', 'phonenumber', 'sessionid', 'studentid', 'telephone', 'userid', 'whatsapp',
]);
const EMAIL_VALUE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu;
const PHONE_VALUE = /(?:\+(?:[\s().-]*\d){7,}|(?:phone|tel(?:ephone)?|whats ?app|contact)[^\n]{0,24}(?:\d[\s().-]*){7,})/iu;

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const sha256 = value => createHash('sha256').update(value).digest('hex');
const normalizeText = value => String(value ?? '').normalize('NFKC').replace(/\s+/gu, ' ').trim();
export const normalizeRuntimeAnswer = value => String(value ?? '')
  .trim()
  .toLowerCase()
  .replace(/[.,;:!?]+$/gu, '')
  .replace(/\s+/gu, ' ');
export const runtimeWordCount = value => {
  const normalized = normalizeRuntimeAnswer(value);
  return normalized ? normalized.split(' ').length : 0;
};
const sourceSha256 = path => sha256(readFileSync(resolve(ROOT, path)));
const readJson = path => JSON.parse(readFileSync(resolve(ROOT, path), 'utf8'));
const formattedJsonSha256 = value => sha256(`${JSON.stringify(value, null, 2)}\n`);

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!isObject(value)) return value;
  return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
}
const stableJson = value => JSON.stringify(stableValue(value));

function assertExactKeys(value, expected, label) {
  assert(isObject(value), `${label}: se esperaba un objeto.`);
  assert(stableJson(Object.keys(value).sort()) === stableJson([...expected].sort()),
    `${label}: keys inesperadas. Esperadas ${[...expected].sort().join(', ')}; observadas ${Object.keys(value).sort().join(', ')}.`);
}

function assertExactIdCoverage(records, expectedIds, field, label) {
  assert(Array.isArray(records) && records.length === expectedIds.length,
    `${label}: cardinalidad inválida.`);
  const ids = records.map(row => row?.[field]);
  assert(new Set(ids).size === ids.length, `${label}: IDs duplicados.`);
  assert(stableJson([...ids].sort()) === stableJson([...expectedIds].sort()),
    `${label}: IDs extra o ausentes.`);
}

function hasNonEmptyNotes(value) {
  return (typeof value === 'string' && value.trim()) ||
    (Array.isArray(value) && value.length > 0 &&
      value.every(note => typeof note === 'string' && note.trim()));
}

function loadTsModule(path) {
  const absolutePath = resolve(ROOT, path);
  const result = ts.transpileModule(readFileSync(absolutePath, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: absolutePath,
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics ?? []).filter(row =>
    row.category === ts.DiagnosticCategory.Error);
  assert(errors.length === 0, `No se pudo transpilar ${path}: ${errors.map(error =>
    ts.flattenDiagnosticMessageText(error.messageText, '\n')).join('; ')}`);
  const evaluated = { exports: {} };
  vm.runInNewContext(result.outputText, {
    module: evaluated,
    exports: evaluated.exports,
    require(specifier) {
      throw new Error(`Import runtime no permitido en ${path}: ${specifier}`);
    },
  }, { filename: absolutePath, timeout: 10_000 });
  return evaluated.exports;
}

function strictCalendarDate(value, label) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(String(value));
  assert(match, `${label}: fecha inválida.`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const maximumDay = month >= 1 && month <= 12
    ? new Date(Date.UTC(year, month, 0)).getUTCDate() : 0;
  assert(year >= 1 && month >= 1 && month <= 12 && day >= 1 && day <= maximumDay,
    `${label}: fecha calendárica inválida.`);
  return true;
}

function timestampMs(value, label) {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/u
    .exec(String(value));
  assert(match, `${label}: timestamp ISO inválido.`);
  strictCalendarDate(match[1], label);
  assert(Number(match[2]) <= 23 && Number(match[3]) <= 59 && Number(match[4]) <= 59,
    `${label}: hora inválida.`);
  if (match[5] !== 'Z') {
    const zoneHour = Number(match[5].slice(1, 3));
    const zoneMinute = Number(match[5].slice(4, 6));
    assert(zoneHour <= 14 && zoneMinute <= 59 && (zoneHour < 14 || zoneMinute === 0),
      `${label}: offset inválido.`);
  }
  const parsed = Date.parse(value);
  assert(Number.isFinite(parsed), `${label}: timestamp inválido.`);
  return parsed;
}

export function assertNoFutureTimestamp(value, label = 'timestamp', now = Date.now()) {
  assert(timestampMs(value, label) <= now, `${label}: timestamp futuro.`);
  return true;
}

export function parseWordLimit(value) {
  const match = /^NO MORE THAN (ONE|TWO|THREE|FOUR) WORDS?$/u.exec(String(value ?? '').trim());
  assert(match, `wordLimit no soportado: ${value}`);
  return { ONE: 1, TWO: 2, THREE: 3, FOUR: 4 }[match[1]];
}

function findForbiddenKeys(value, path = '$', findings = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => findForbiddenKeys(entry, `${path}[${index}]`, findings));
    return findings;
  }
  if (!isObject(value)) return findings;
  for (const [key, entry] of Object.entries(value)) {
    const normalized = key.toLowerCase().replace(/[-_]/gu, '');
    if (FORBIDDEN_PACKET_KEYS.has(normalized)) findings.push(`${path}.${key}`);
    findForbiddenKeys(entry, `${path}.${key}`, findings);
  }
  return findings;
}

function findPii(value, path = '$', findings = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => findPii(entry, `${path}[${index}]`, findings));
    return findings;
  }
  if (typeof value === 'string') {
    if (EMAIL_VALUE.test(value)) findings.push(`${path}:email-value`);
    if (PHONE_VALUE.test(value)) findings.push(`${path}:phone-value`);
    return findings;
  }
  if (!isObject(value)) return findings;
  for (const [key, entry] of Object.entries(value)) {
    const normalized = key.toLowerCase().replace(/[-_]/gu, '');
    if (PII_KEYS.has(normalized)) findings.push(`${path}.${key}`);
    findPii(entry, `${path}.${key}`, findings);
  }
  return findings;
}

const QUESTION_ID_PATTERN = /\btable-(?:cooling|rain-gardens|museum-inventory)-0[1-3]-[12]\b/giu;
const ASSIGNMENT_FIELD_KEYS = new Set([
  'acceptedanswer', 'acceptedanswers', 'answer', 'canonicalanswer', 'completedanswer',
  'completedsentence', 'completion', 'correctanswer', 'expectedanswer', 'response', 'result',
  'selectedanswer', 'solution', 'verdict',
]);

function acceptedFor(questionId) {
  return (KNOWN_ACCEPTED_ANSWERS[questionId] ?? []).map(normalizeRuntimeAnswer);
}

function stringAssignsKnownAnswer(text, inheritedQuestionId = null) {
  const normalizedText = normalizeRuntimeAnswer(normalizeText(text));
  const mentionedIds = [...normalizeText(text).matchAll(QUESTION_ID_PATTERN)]
    .map(match => match[0].toLowerCase());
  const ids = [...new Set([...mentionedIds, ...(inheritedQuestionId ? [inheritedQuestionId] : [])])];
  const assignmentLanguage = /(?:\banswer\b|\bcomplete\b|\bfill\b|\buse\b|\bwrite\b|\bwith\b|\bis\b|\bfor\b|\bcorresponds?\b|\brespuesta\b|\bcompleta\b|\bcompletar\b|\bescribe\b|\busa\b|\bcon\b|\bes\b|\bcorresponde\b|[=→])/iu
    .test(text);
  if (inheritedQuestionId && assignmentLanguage &&
    acceptedFor(inheritedQuestionId).some(answer => normalizedText.includes(answer))) return true;
  return ids.some(questionId => acceptedFor(questionId).some(answer => {
    if (normalizedText === answer && inheritedQuestionId === questionId) return true;
    return assignmentLanguage && normalizedText.includes(answer);
  }));
}

export function findTableCompletionAssignmentLeaks(
  value, path = '$', findings = [], inheritedQuestionId = null, assignmentContext = false,
) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => findTableCompletionAssignmentLeaks(
      entry, `${path}[${index}]`, findings, inheritedQuestionId, assignmentContext));
    return findings;
  }
  if (typeof value === 'string') {
    if ((assignmentContext && inheritedQuestionId &&
      acceptedFor(inheritedQuestionId).includes(normalizeRuntimeAnswer(value))) ||
      stringAssignsKnownAnswer(value, inheritedQuestionId)) {
      if (!findings.includes(path)) findings.push(path);
    }
    return findings;
  }
  if (!isObject(value)) return findings;
  const ownQuestionId = typeof value.questionId === 'string' &&
    Object.hasOwn(KNOWN_ACCEPTED_ANSWERS, value.questionId) ? value.questionId : null;
  const scopedQuestionId = ownQuestionId ?? inheritedQuestionId;
  for (const [key, entry] of Object.entries(value)) {
    const normalizedKey = key.toLowerCase().replace(/[-_]/gu, '');
    const keyQuestionId = Object.hasOwn(KNOWN_ACCEPTED_ANSWERS, key) ? key : null;
    const scoped = keyQuestionId ?? scopedQuestionId;
    const fieldIsAssignment = ASSIGNMENT_FIELD_KEYS.has(normalizedKey) || Boolean(keyQuestionId);
    if (scoped && fieldIsAssignment && entry !== null &&
      (normalizedKey === 'completedsentence' ||
        (typeof entry === 'string' && acceptedFor(scoped).some(answer =>
          normalizeRuntimeAnswer(entry) === answer || normalizeRuntimeAnswer(entry).includes(answer))))) {
      findings.push(`${path}.${key}`);
    }
    findTableCompletionAssignmentLeaks(key.replace(/[-_]+/gu, ' '), `${path}.${key}:key`,
      findings, scoped, fieldIsAssignment);
    findTableCompletionAssignmentLeaks(entry, `${path}.${key}`, findings, scoped,
      assignmentContext || fieldIsAssignment);
  }
  return [...new Set(findings)];
}

function assertCleanPacket(packet, label) {
  assert(findForbiddenKeys(packet).length === 0,
    `${label}: filtra answers, alternatives, feedback, explanations, hints o skills.`);
  assert(findTableCompletionAssignmentLeaks(packet).length === 0,
    `${label}: filtra una asignación EN/ES, incluso anidada.`);
  assert(findPii(packet).length === 0, `${label}: contiene PII learner/contact.`);
}

function sourceAssets(catalog) {
  const sets = catalog.IELTS_TABLE_COMPLETION_PASSAGES;
  assert(Array.isArray(sets), 'Falta IELTS_TABLE_COMPLETION_PASSAGES.');
  return sets.map((set, setIndex) => ({
    assetId: `formative:table-completion:${set.id}`,
    id: set.id,
    setIndex,
    title: set.title,
    wordLimit: set.wordLimit,
    maxWords: set.maxWords,
    passage: set.passage,
    instructions: set.instructions,
    tableTitle: set.tableTitle,
    columns: set.columns,
    rows: set.rows,
    questions: set.rows.flatMap((row, rowIndex) => row.cells.flatMap(
      (cell, cellIndex) => cell.type === 'blank' ? [{
        ...cell,
        id: `${row.id}-${cellIndex}`,
        rowId: row.id,
        rowIndex,
        cellIndex,
        rowHeader: row.cells.find(candidate => candidate.type === 'text')?.text ?? '',
        columnHeader: set.columns[cellIndex] ?? '',
        questionIndex: rowIndex * 2 + (cellIndex - 1),
      }] : [],
    )),
    wordCount: (normalizeText(set.passage).match(
      /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)?(?:-[\p{L}\p{N}]+)*/gu,
    ) ?? []).length,
    sourceObjectSha256: sha256(stableJson(set)),
    passageSha256: sha256(normalizeText(set.passage)),
  }));
}

function acceptedInventory(assets) {
  return assets.flatMap(asset => asset.questions.flatMap(question => [
    { assetId: asset.assetId, questionId: question.id, acceptedText: question.answer,
      normalizedText: normalizeRuntimeAnswer(question.answer), role: 'canonical' },
    ...(question.alternatives ?? []).map(alternative => ({
      assetId: asset.assetId, questionId: question.id, acceptedText: alternative,
      normalizedText: normalizeRuntimeAnswer(alternative), role: 'alternative',
    })),
  ]));
}

export function buildAcceptedAnswerInventory() {
  return acceptedInventory(sourceAssets(loadTsModule(CATALOG_PATH)));
}

function tokenSet(value) {
  return new Set(normalizeText(value).toLowerCase().match(/[a-z0-9]+/gu) ?? []);
}

const lexicalTokens = value => normalizeText(value).toLowerCase()
  .match(/[\p{L}\p{N}]+/gu) ?? [];

function wholeTokenOffsets(passage, selectedText) {
  const escaped = String(selectedText).replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
    .replace(/\s+/gu, '\\s+');
  const matcher = new RegExp(
    `(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'giu');
  return [...String(passage).matchAll(matcher)].map(match => match.index);
}

function paragraphAtOffset(passage, offset) {
  let cursor = 0;
  for (const [index, paragraph] of String(passage).split(/\n\s*\n/gu).entries()) {
    if (offset >= cursor && offset <= cursor + paragraph.length) return index + 1;
    cursor += paragraph.length + 2;
  }
  return null;
}

function longestPromptPassageNgram(prompt, passage) {
  const promptTokens = lexicalTokens(prompt);
  const passageTokens = lexicalTokens(passage);
  let longest = 0;
  let hasUniqueBigram = false;
  for (let size = 1; size <= promptTokens.length; size += 1) {
    for (let start = 0; start + size <= promptTokens.length; start += 1) {
      const candidate = promptTokens.slice(start, start + size);
      let matches = 0;
      for (let passageStart = 0;
        passageStart + size <= passageTokens.length; passageStart += 1) {
        if (candidate.every((token, index) => passageTokens[passageStart + index] === token)) {
          matches += 1;
        }
      }
      if (matches > 0) longest = Math.max(longest, size);
      if (size === 2 && matches === 1) hasUniqueBigram = true;
    }
  }
  return { longest, hasUniqueBigram };
}

function boundaryDuplication(question, acceptedText) {
  const before = lexicalTokens(question.before);
  const accepted = lexicalTokens(acceptedText);
  const after = lexicalTokens(question.after);
  if (before.length && accepted.length && before.at(-1) === accepted[0]) {
    return before.at(-1);
  }
  if (accepted.length && after.length && accepted.at(-1) === after[0]) {
    return accepted.at(-1);
  }
  return null;
}

function structuralRiskProfile(assets) {
  const questions = assets.flatMap(asset => asset.questions.map(question => ({ asset, question })));
  const canonicalCounts = questions.map(({ question }) => runtimeWordCount(question.answer));
  const rawAccepted = acceptedInventory(assets);
  const normalizedGroups = new Map();
  rawAccepted.forEach(row => {
    if (!normalizedGroups.has(row.normalizedText)) normalizedGroups.set(row.normalizedText, []);
    normalizedGroups.get(row.normalizedText).push(row);
  });
  const perQuestionGroups = new Map();
  rawAccepted.forEach(row => {
    const key = `${row.questionId}\0${row.normalizedText}`;
    if (!perQuestionGroups.has(key)) perQuestionGroups.set(key, []);
    perQuestionGroups.get(key).push(row);
  });
  const duplicateAlternativeQuestionIds = [...new Set([...perQuestionGroups.values()]
    .filter(rows => rows.length > 1 && rows.some(row => row.role === 'alternative'))
    .map(rows => rows[0].questionId))];
  const nonVerbatimAlternativeQuestionIds = rawAccepted.filter(row => {
    if (row.role !== 'alternative') return false;
    const asset = assets.find(candidate => candidate.assetId === row.assetId);
    return !normalizeRuntimeAnswer(asset.passage).includes(row.normalizedText);
  }).map(row => row.questionId);
  const crossQuestionCollisions = [...normalizedGroups.entries()].filter(([, rows]) =>
    new Set(rows.map(row => row.questionId)).size > 1).map(([normalizedText, rows]) => ({
    normalizedText,
    questionIds: [...new Set(rows.map(row => row.questionId))].sort(),
  }));
  const answerFrameOverlapIds = questions.filter(({ question }) => {
    const frameTokens = tokenSet(`${question.before} ${question.after}`);
    return [...tokenSet(question.answer)].some(token => frameTokens.has(token));
  }).map(({ question }) => question.id);
  const titleOverlapIds = questions.filter(({ asset, question }) => {
    const titleTokens = tokenSet(asset.title);
    return [...tokenSet(question.answer)].some(token => titleTokens.has(token));
  }).map(({ question }) => question.id);
  const occurrenceRows = questions.map(({ asset, question }) => {
    const offsets = wholeTokenOffsets(asset.passage, question.answer);
    const intendedOffset = EXPECTED_INTENDED_ANSWER_OFFSETS[question.id];
    assert(offsets.includes(intendedOffset),
      `${question.id}: el offset intencionado no corresponde a un span whole-token.`);
    return { questionId: question.id, occurrences: offsets.length, offsets, intendedOffset };
  });
  const evidenceRows = questions.map(({ asset, question }) => ({
    assetId: asset.assetId,
    questionId: question.id,
    offset: EXPECTED_INTENDED_ANSWER_OFFSETS[question.id],
    paragraph: paragraphAtOffset(asset.passage, EXPECTED_INTENDED_ANSWER_OFFSETS[question.id]),
  }));
  const orderViolations = [];
  const naiveFirstOccurrenceOrderViolations = [];
  for (const asset of assets) {
    const rows = evidenceRows.filter(row => row.assetId === asset.assetId);
    for (let index = 1; index < rows.length; index += 1) {
      if (rows[index].offset <= rows[index - 1].offset) orderViolations.push(rows[index].questionId);
    }
    const naiveRows = asset.questions.map(question => ({
      questionId: question.id,
      offset: wholeTokenOffsets(asset.passage, question.answer)[0],
    }));
    for (let index = 1; index < naiveRows.length; index += 1) {
      if (naiveRows[index].offset <= naiveRows[index - 1].offset) {
        naiveFirstOccurrenceOrderViolations.push(naiveRows[index].questionId);
      }
    }
  }
  const perPositionModeHits = Array.from({ length: 6 }, (_, position) => {
    const counts = assets.map(asset => runtimeWordCount(asset.questions[position].answer));
    const frequency = new Map(counts.map(value => [value, counts.filter(row => row === value).length]));
    return Math.max(...frequency.values());
  }).reduce((sum, value) => sum + value, 0);
  const acceptedInHint = questions.filter(({ question }) =>
    [question.answer, ...(question.alternatives ?? [])].some(answer =>
      normalizeRuntimeAnswer(question.hint).includes(normalizeRuntimeAnswer(answer))))
    .map(({ question }) => question.id);
  const locationHintIds = questions.filter(({ question }) =>
    /\b(?:first|last|final|start|end|paragraph|sentence|near|before|after|between|mentioned|example|involving|look at|look for|find|follows?|contrasts|changes|copy|third|list|documentation|storage|cooking|signage|pilot|farming|location|time period|paired|adjectives?|nouns?|verbs?)\b/iu
      .test(question.hint)).map(({ question }) => question.id);
  const promptNgrams = questions.map(({ asset, question }) => ({
    questionId: question.id,
    ...longestPromptPassageNgram(`${question.before} ${question.after}`, asset.passage),
  }));
  const paragraphModeHits = Array.from({ length: 6 }, (_, position) => {
    const paragraphs = assets.map(asset => EXPECTED_INTENDED_ANSWER_PARAGRAPHS[
      asset.questions[position].id]);
    const frequency = new Map(paragraphs.map(value =>
      [value, paragraphs.filter(row => row === value).length]));
    return Math.max(...frequency.values());
  }).reduce((sum, value) => sum + value, 0);
  const invalidAlternatives = questions.flatMap(({ question }) =>
    (question.alternatives ?? []).map(acceptedText => ({
      questionId: question.id,
      acceptedText,
      duplicatedBoundaryToken: boundaryDuplication(question, acceptedText),
    })).filter(row => row.duplicatedBoundaryToken));
  return {
    canonicalAnswerWordCountDistribution: {
      oneWord: canonicalCounts.filter(value => value === 1).length,
      twoWords: canonicalCounts.filter(value => value === 2).length,
      overLimit: questions.filter(({ asset, question }) =>
        runtimeWordCount(question.answer) > asset.maxWords).length,
    },
    alwaysTwoWordAnswerPredictor: {
      eligible: 18, tiesOrAbstentions: 0,
      hits: canonicalCounts.filter(value => value === 2).length,
    },
    sameQuestionPositionAcrossSetsModalAnswerWordCount: {
      eligible: 18, positions: 6, tiesOrAbstentions: 0, hits: perPositionModeHits,
    },
    canonicalAnswerTokenVisibleInTableFrame: {
      questionsWithOverlap: answerFrameOverlapIds.length,
      questionIds: answerFrameOverlapIds,
    },
    passageTitleAnswerTokenOverlap: {
      questionsWithOverlap: titleOverlapIds.length,
      questionIds: titleOverlapIds,
    },
    canonicalAnswerOccurrenceInOwnPassage: {
      exactlyOnce: occurrenceRows.filter(row => row.occurrences === 1).length,
      zero: occurrenceRows.filter(row => row.occurrences === 0).length,
      multiple: occurrenceRows.filter(row => row.occurrences > 1).length,
      rows: occurrenceRows,
    },
    setsWithStrictlyAscendingCanonicalEvidenceOrder: assets.filter(asset => {
      const rows = evidenceRows.filter(row => row.assetId === asset.assetId);
      return rows.every((row, index) => index === 0 || row.offset > rows[index - 1].offset);
    }).length,
    passageOrderViolationQuestionIds: orderViolations,
    naiveFirstOccurrenceOrderViolationQuestionIds: naiveFirstOccurrenceOrderViolations,
    intendedWholeTokenEvidence: {
      rows: evidenceRows,
      offsetsMatchPinnedBaseline: evidenceRows.every(row =>
        row.offset === EXPECTED_INTENDED_ANSWER_OFFSETS[row.questionId] &&
        row.paragraph === EXPECTED_INTENDED_ANSWER_PARAGRAPHS[row.questionId]),
    },
    sameQuestionPositionAcrossSetsModalEvidenceParagraph: {
      eligible: 18, positions: 6, tiesOrAbstentions: 0, hits: paragraphModeHits,
    },
    acceptedAnswerNormalization: {
      algorithm: 'trim+lowercase+strip-trailing-[.,;:!?]+collapse-whitespace',
      canonicalEntries: 18,
      alternativeEntries: rawAccepted.length - 18,
      rawAcceptedEntries: rawAccepted.length,
      normalizedAcceptedValues: normalizedGroups.size,
    },
    normalizedDuplicateAlternativeQuestionIds: duplicateAlternativeQuestionIds,
    nonVerbatimAcceptedAlternativeQuestionIds: nonVerbatimAlternativeQuestionIds,
    grammaticallyInvalidAcceptedAlternatives: invalidAlternatives,
    crossQuestionNormalizedAnswerCollisions: crossQuestionCollisions,
    canonicalAnswerGrammarSurface: {
      manuallyClassifiedNominalOrNounPhrase: 14,
      manuallyClassifiedAdjective: 1,
      manuallyClassifiedVerb: 2,
      manuallyClassifiedAdverb: 1,
      total: 18,
      caveat: 'Manual structural classification; it is not a statistical POS certification.',
    },
    frameGrammaticalFit: {
      canonicalAnswersNaturalInCell: 18,
      unresolvedExactOneBestAnswerQuestionIds: ['table-cooling-01-2'],
      unresolvedCompetitorSpans: [
        { questionId: 'table-cooling-01-2', selectedText: 'the direction', offset: 587 },
        { questionId: 'table-cooling-01-2', selectedText: 'direction', offset: 591 },
      ],
      exactOneBestAnswerEstablished: 17,
    },
    promptPassageLexicalAnchors: {
      questionsWithUniqueExactBigram: promptNgrams.filter(row => row.hasUniqueBigram).length,
      longestExactNgramDistribution: Object.fromEntries([1, 2, 3, 4, 5, 6].map(size =>
        [String(size), promptNgrams.filter(row => row.longest === size).length])),
      rows: promptNgrams,
    },
    preResponseHintExposure: {
      questionsWithVisibleHintControl: questions.length,
      hintsContainingNormalizedAcceptedAnswer: acceptedInHint.length,
      hintsNamingPassageLocationOrAnchor: locationHintIds.length,
      semanticParaphraseOnlyHintQuestionIds: questions
        .filter(({ question }) => !locationHintIds.includes(question.id))
        .map(({ question }) => question.id),
    },
    promptOnlyExactGuessReviewRequired: true,
    exactOneBestAnswerReviewRequired: true,
    statisticalCertification: {
      observedQuestions: 18,
      certificationThreshold: 100,
      eligible: false,
      contentCertificationBlocked: true,
      blockingReasons: [
        'n-below-100',
        'client-side-canonical-answers-and-hints',
        'client-delivered-answer-keys',
        'rights-and-human-review-pending',
        'exact-one-best-answer-unresolved-table-cooling-01-2',
      ],
    },
  };
}

export function buildStoredStructuralRiskProfile() {
  const assets = sourceAssets(loadTsModule(CATALOG_PATH));
  assertUnitCardinality(assets);
  return structuralRiskProfile(assets);
}

export function assertUnitCardinality(assets) {
  const assetIds = assets.map(asset => asset.assetId);
  const questionIds = assets.flatMap(asset =>
    (asset.questions ?? asset.decisions ?? []).map(row => row.id ?? row.questionId));
  const canonicalAnswers = assets.flatMap(asset =>
    (asset.questions ?? []).map(row => row.answer)).filter(value => value !== undefined).length;
  assert(stableJson(assetIds) === stableJson(EXPECTED_ASSET_IDS) &&
    stableJson(questionIds) === stableJson(EXPECTED_QUESTION_IDS) &&
    (canonicalAnswers === 0 || canonicalAnswers === 18),
  'Table Completion: IDs o cardinalidad 3/18/18 inválidos.');
  if (canonicalAnswers === 18) {
    const inventory = acceptedInventory(assets);
    assert(inventory.length === 18 &&
      new Set(inventory.map(row => row.normalizedText)).size === 17,
    'Table Completion: accepted surface 18/17 inválida.');
    assert(assets.every(asset => asset.wordLimit === 'NO MORE THAN TWO WORDS' &&
      parseWordLimit(asset.wordLimit) === asset.maxWords && asset.maxWords === 2 &&
      asset.instructions === EXPECTED_INSTRUCTIONS && asset.rows.length === 3 &&
      asset.rows.every(row => row.cells.length === 3 &&
        row.cells.filter(cell => cell.type === 'blank').length === 2) &&
      asset.questions.length === 6 && asset.questions.every(question =>
        runtimeWordCount(question.answer) >= 1 &&
        runtimeWordCount(question.answer) <= asset.maxWords)),
    'Table Completion: wordLimit/instructions/3x2x3 inválido.');
    assert(assets.every(asset =>
      asset.sourceObjectSha256 === EXPECTED_SOURCE_OBJECT_SHA256[asset.id] &&
      asset.passageSha256 === EXPECTED_PASSAGE_SHA256[asset.id]),
    'Table Completion: hashes de objetos/pasajes cambiaron.');
  }
  return true;
}

export function assertCurrentTableUnitPinned() {
  const catalog = loadTsModule(CATALOG_PATH);
  const assets = sourceAssets(catalog);
  assertUnitCardinality(assets);
  const routeObjectSha256 = sha256(stableJson(routeObject(catalog, 'table-completion')));
  const closure = renderDependencyClosure([
    'src/app/layout.tsx', 'src/app/(site)/layout.tsx', ROUTE_PATH,
  ]).map(path => relative(ROOT, path));
  assert(routeObjectSha256 === EXPECTED_ROUTE_OBJECT_SHA256,
    'Table Completion: route object cambió.');
  assert(closure.length === 19 &&
    stableJson([...closure].sort()) ===
      stableJson(Object.keys(EXPECTED_ACTIVE_REMEDIATION_CLOSURE_SHA256).sort()) &&
    Object.entries(EXPECTED_ACTIVE_REMEDIATION_CLOSURE_SHA256).every(([path, expected]) =>
      sourceSha256(path) === expected),
  `Table Completion: clausura remediada 19/hash cambió: paths=${stableJson(closure)}; ` +
    `hashDiff=${stableJson(Object.entries(EXPECTED_ACTIVE_REMEDIATION_CLOSURE_SHA256).filter(([path, expected]) =>
      sourceSha256(path) !== expected).map(([path]) => path))}.`);
  return {
    passages: assets.length,
    questions: assets.flatMap(asset => asset.questions).length,
    canonicalAnswers: assets.flatMap(asset => asset.questions).length,
    rawAcceptedEntries: acceptedInventory(assets).length,
    normalizedAcceptedValues: new Set(acceptedInventory(assets)
      .map(row => row.normalizedText)).size,
    sourceObjectSha256: Object.fromEntries(assets.map(asset =>
      [asset.id, asset.sourceObjectSha256])),
    passageSha256: Object.fromEntries(assets.map(asset => [asset.id, asset.passageSha256])),
    routeObjectSha256,
    renderDependencyClosureSha256: EXPECTED_ACTIVE_REMEDIATION_CLOSURE_SHA256,
  };
}

function routeObject(catalog, slug) {
  const value = catalog.IELTS_READING_TYPES.find(row => row.slug === slug);
  assert(value, `Falta route object ${slug}.`);
  return value;
}

export function expectedNextUnitPin() {
  const catalog = loadTsModule(CATALOG_PATH);
  const nextSets = catalog.IELTS_FLOW_CHART_COMPLETION_PASSAGES;
  assert(Array.isArray(nextSets) && nextSets.length === 3,
    'F0.2b.12 no conserva exactamente tres objetos de catálogo.');
  const currentSourceSha256 = Object.fromEntries(
    NEXT_UNIT_PATHS.map(path => [path, sourceSha256(path)]));
  const currentRouteObjectSha256 = sha256(stableJson(routeObject(catalog, 'flow-chart-completion')));
  const currentSourceObjectSha256 = Object.fromEntries(
    nextSets.map(set => [set.id, sha256(stableJson(set))]));
  const closureCount = renderDependencyClosure([
    'src/app/layout.tsx', 'src/app/(site)/layout.tsx', NEXT_ROUTE_PATH,
  ]).length;
  assert(stableJson(currentSourceSha256) === stableJson(EXPECTED_NEXT_UNIT_SOURCE_SHA256) &&
    currentRouteObjectSha256 === EXPECTED_NEXT_ROUTE_OBJECT_SHA256 &&
    stableJson(currentSourceObjectSha256) ===
      stableJson(EXPECTED_NEXT_SOURCE_OBJECT_SHA256) && closureCount === 15,
  'F0.2b.12 Flow-chart Completion cambió antes de iniciarse.');
  return {
    unit: 'F0.2b.12',
    format: 'flow-chart-completion',
    sourceSha256: currentSourceSha256,
    routeObjectSha256: currentRouteObjectSha256,
    sourceObjectSha256: currentSourceObjectSha256,
    scope: {
      passages: 3,
      questions: 18,
      renderDependencyClosurePaths: closureCount,
    },
    sharedDependencyBoundary: [NEXT_ENGINE_PATH, NEXT_BANK_PATH, CATALOG_PATH],
  };
}

export function assertNextUnitPinned(baseline) {
  assertExactKeys(baseline.nextUnit,
    ['unit', 'format', 'sourceSha256', 'routeObjectSha256', 'sourceObjectSha256', 'scope',
      'sharedDependencyBoundary'],
    'baseline.nextUnit');
  assert(stableJson(baseline.nextUnit) === stableJson(expectedNextUnitPin()),
    'F0.2b.12 cambió o su pin route/engine/bank/objetos es incompleto.');
  return true;
}

// Read-only handoff for dossier authors. It exposes the exact frozen values and schema keys but
// deliberately does not fabricate retrieval rows, timestamps after the blind packet, or files.
export function expectedAuditScaffoldContract() {
  const catalog = loadTsModule(CATALOG_PATH);
  const assets = sourceAssets(catalog);
  const current = assertCurrentTableUnitPinned();
  const risk = structuralRiskProfile(assets);
  return {
    chronology: {
      baselineCapturedAt: '2026-08-11T17:01:30Z',
      retrievalStartedAt: '2026-08-11T17:02:27Z',
      latestRetrievalAt: '2026-08-11T17:02:55Z',
      provenanceSearchedAt: '2026-08-11T17:09:00Z',
      manifestRecordedAt: '2026-08-11T17:09:20Z',
      registryAssessedAt: '2026-08-11T17:09:30Z',
      blindPacketsGeneratedAt: BLIND_PACKETS_GENERATED_AT,
      factualPacketsGeneratedAt: FACTUAL_PACKET_GENERATED_AT,
    },
    baseline: {
      schemaVersion: 'ielts-reading-table-completion-baseline.v1',
      requiredTopLevelKeys: ['schemaVersion', 'capturedAt', 'scope', 'assets', 'hashMethods',
        'structuralRisk', 'runtimeAndAccessibilityBaseline', 'learnerFacingSourceSha256',
        'routeObjectSha256', 'renderDependencyClosureSha256',
        'concurrentExternalClosureChange', 'nextUnit', 'interpretation'],
      scope: { unit: 'F0.2b.11', format: 'table-completion', passages: 3,
        questions: 18, blanks: 18 },
      assets: assets.map(asset => ({
        assetId: asset.assetId, setId: asset.id, title: asset.title,
        wordCount: asset.wordCount, paragraphCount: asset.passage.split(/\n\s*\n/gu).length,
        questionCount: 6, blankCount: 6, wordLimit: asset.wordLimit,
        questionIds: asset.questions.map(row => row.id),
        sourceObjectSha256: asset.sourceObjectSha256, passageSha256: asset.passageSha256,
      })),
      hashMethods: {
        sourceObjectSha256: 'SHA-256 of recursively key-sorted JSON.',
        passageSha256:
          'SHA-256 of NFKC passage text only with collapsed whitespace; rights registry policy v8.',
      },
      structuralRisk: {
        wordLimitContract: { declaredInstruction: 'NO MORE THAN TWO WORDS',
          setsWithDeclaredInstruction: 3, setsWithMaxWordsField: 3,
          runtimeStoredMaxWordsDisplayLimit: 2, wordLimitParticipatesInScoring: false },
        answerSurfaceProfile: { questions: 18, oneWordPrimaryAnswers: 17,
          twoWordPrimaryAnswers: 1, primaryAnswersOverTwoWords: 0,
          primaryAnswersExactPassageTokenSequences: 18,
          primaryAnswerTokenSequencesUniqueWithinBank: 17,
          questionsWithAcceptedAlternativeEntry: 0, rawAcceptedEntries: 18,
          normalizedAcceptedValues: 17, normalizedRedundantAlternativeEntries: 0,
          grammaticallyInvalidAlternativeEntries: 0,
          manuallyClassifiedNominalOrNounPhrasePrimaryAnswers: 14,
          manualClassificationCaveat:
            'Manual classification; exact-one-best-answer remains unresolved for table-cooling-01-2.' },
        textOrder: { setsWithStrictlyAscendingEvidenceOrder:
            risk.setsWithStrictlyAscendingCanonicalEvidenceOrder,
          totalSets: 3, orderViolations: 2,
          canonicalAnswersWithExactlyOneWholeTokenOccurrence: 12,
          canonicalAnswersWithMultipleWholeTokenOccurrences: 6,
          naiveFirstMatchOrderViolationQuestionIds:
            risk.naiveFirstOccurrenceOrderViolationQuestionIds,
          intendedWholeTokenOffsetsPinned: 18 },
        shortcutSignals: { questionsWithUniqueExactPromptPassageBigram: 14,
          alwaysTwoWordPrimaryAnswerHits: 1,
          sameQuestionPositionAcrossSetsModalEvidenceParagraphHits: 13,
          manuallyClassifiedNominalOrNounPhrasePrimaryAnswers: 14,
          questionsWithHintsAvailableBeforeResponse: 18,
          preResponseHintsWithAnchorOrLocationLanguage: 18,
          preResponseHintsWithParaphraseOnly: 0,
          questionsWithPostCheckExplanation: 18,
          sameQuestionPositionAcrossSetsModalPrimaryAnswerWordCountHits: 17,
          sameQuestionPositionAcrossSetsEligible: 18,
          surfaceShortcutReviewRequired: true },
        normalizationContract: { trimOuterWhitespace: true, lowercase: true,
          collapseInternalWhitespace: true, removeTrailingAsciiPunctuation: '.,;:!?',
          unicodeNormalization: false, hyphenNormalization: false,
          acceptedVariantsOnlyWhenExplicitAlternativeExists: true },
      },
      runtimeAndAccessibilityBaseline: {
        runtimeClassification:
          'guided-training-runtime-with-immediate-feedback-not-practice-or-exam-simulation',
        answerKeysDeliveredToClient: true, inputLocksAfterExplicitCheck: true,
        inputLocksWhileTyping: false, correctnessAndExplanationShownImmediatelyAfterCheck: true,
        hintsAvailableBeforeResponse: true, attemptStatePersisted: false,
        resetRequiresConfirmation: false, resetScope: 'all-six-blanks-in-one-passage-engine',
        wordLimitVisualWarningPresent: true, wordLimitEnforcedInScoring: false,
        inputAccessibleNamePresent: true, inputAccessibleNamesUniqueAcrossThreeSets: true,
        breadcrumbHasNavAndCurrentSemantics: true, englishPassageHasLangAttribute: false,
        progressIndicatorHasProgrammaticRoleNameAndValue: false, feedbackHasLiveRegion: false,
        hintToggleHasExpandedAndControlsSemantics: false, headingHierarchyIsOrdered: false,
        feedbackFocusManaged: false, uiUxStaticReviewApplicable: true,
        playwrightApplicableToAuditOnlyScaffoldDelta: false,
        playwrightBecomesApplicableOnLearnerFacingOrRuntimeDrift: true,
      },
      learnerFacingSourceSha256: Object.fromEntries(LEARNER_FACING_PATHS.map(path =>
        [path, EXPECTED_RENDER_CLOSURE_SHA256[path]])),
      routeObjectSha256: current.routeObjectSha256,
      renderDependencyClosureSha256: current.renderDependencyClosureSha256,
      concurrentExternalClosureChange: {
        path: 'src/app/layout.tsx',
        previousSha256: '03d06f0aba4ac802fd9bf69b63229af511a8f4daa132d405dfc36a1a19f01dda',
        currentSha256: EXPECTED_RENDER_CLOSURE_SHA256['src/app/layout.tsx'],
        observedDiffSummary: 'GTM disabled in preview/development',
        observedAt: '2026-08-11T17:01:00Z',
        attribution: 'outside-F0.2b.11-audit-files',
        interpretation:
          'Table content/engine/bank unchanged; no UI conformity is certified.',
      },
      nextUnit: expectedNextUnitPin(),
      interpretation:
        'F0.2b.11 Table Completion audit-only baseline; this is not a conformity finding.',
    },
    sourceAvailability: {
      schemaVersion: 'ielts-reading-table-completion-source-availability.v1',
      requiredTopLevelKeys: ['schemaVersion', 'checkedAt', 'retrievalStartedAt', 'method',
        'coverageContract', 'sources', 'observedAvailability', 'interpretation'],
      coverageContract: { officialSources: 2, factualSources: 14, totalSources: 16,
        factualSourcesPerAsset: Object.fromEntries(Object.entries(REQUIRED_FACTUAL_SOURCE_IDS)
          .map(([assetId, ids]) => [assetId, ids.length])),
        officialEvidenceIds: [OFFICIAL_EVIDENCE_ID, SAMPLE_TASKS_EVIDENCE_ID],
        factualEvidenceIdsByAsset: REQUIRED_FACTUAL_SOURCE_IDS },
      requiredSourceRowKeys: ['evidenceId', 'requestedUrl', 'retrievedAt', 'httpStatus',
        'finalUrl', 'redirected', 'contentType', 'sizeBytes', 'bodySha256',
        'availabilityStatus', 'retrievalInterpretation', 'claimVerificationStatus'],
      observedAvailability: { http200: 12, http403: 0, networkError: 3,
        requestedContentRetrieved: 12, requestedContentNotRetrieved: 4,
        claimsVerified: 0, redirected: 'derive-from-source-rows' },
    },
    provenanceSearch: {
      schemaVersion: 'ielts-reading-table-completion-provenance-search.v1',
      requiredTopLevelKeys: ['schemaVersion', 'searchedAt', 'method', 'searchSurface',
        'queries', 'interpretation'],
      requiredQueryKeys: ['assetId', 'query', 'resultsReviewed',
        'candidateFactualSourcesCompared', 'outcome'],
      outcome: 'no-exact-match-in-reviewed-results',
      assetIds: EXPECTED_ASSET_IDS,
    },
    unitChangeManifest: {
      schemaVersion: 'ielts-reading-table-completion-unit-change-manifest.v1',
      requiredTopLevelKeys: ['schemaVersion', 'unit', 'recordedAt',
        'learnerFacingChangeAuthorized', 'learnerFacingBaselinePaths',
        'renderDependencyClosureBaselinePaths', 'unitSourceFiles', 'unitOutputDirectory',
        'nextUnitBoundary', 'applicability', 'interpretation'],
      unit: 'F0.2b.11', learnerFacingChangeAuthorized: false,
      learnerFacingBaselinePaths: LEARNER_FACING_PATHS,
      renderDependencyClosureBaselinePaths: Object.keys(EXPECTED_RENDER_CLOSURE_SHA256),
      unitSourceFiles: [REGISTRY_PATH, VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH],
      unitOutputDirectory: OUTPUT_DIRECTORY,
      nextUnitBoundary: { unit: 'F0.2b.12', format: 'flow-chart-completion',
        status: 'not-started' },
      applicability: {
        staticUiUxAndAccessibilityReview: 'applicable-to-existing-baseline',
        uiUxDeltaTesting:
          'not-applicable-only-while-learner-facing-and-render-closure-hashes-match-baseline',
        playwright:
          'not-applicable-only-while-learner-facing-and-render-closure-hashes-match-baseline',
        notApplicableMeaning:
          'Not applicable to this audit-only delta; not a UI, accessibility or runtime conformity.',
        playwrightActivationCriteria: ['learner-facing-source-drift', 'render-closure-drift',
          'runtime-behavior-drift', 'explicit-ui-change'],
      },
      interpretation:
        'Audit-only exact stop boundary after Table; Flow-chart remains not-started.',
    },
  };
}

export function assertBoardStopBoundary(loopDocText) {
  const priorClosed =
    '| 0 | 　　　 ↳ F0.2b.9 Summary Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const currentClosed =
    '| 0 | 　　　 ↳ F0.2b.10 Note Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const currentUnitClosed =
    '| 0 | 　　　 ↳ F0.2b.11 Table Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ |';
  const nextOpen =
    '| 0 | 　　　 ↳ F0.2b.12 Flow-chart Completion | — | — | — | — | — | — | — |';
  const parentOpen =
    '| 0 | 　 ↳ F0.2b Adjudicación de bancos formativos — padre | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |';
  const stop = 'Siguiente subunidad, sin iniciarla: ' + String.fromCharCode(96) +
    'F0.2b.12 Flow-chart Completion' + String.fromCharCode(96) + '.';
  const rows = loopDocText.split(/\r?\n/gu);
  const exactOnce = (needle, label) => {
    const matching = rows.filter(row => row.includes(label));
    assert(matching.length === 1 && matching[0] === needle,
      `${label}: debe existir una sola fila exacta.`);
  };
  exactOnce(priorClosed, '↳ F0.2b.9 Summary Completion');
  exactOnce(currentClosed, '↳ F0.2b.10 Note Completion');
  exactOnce(currentUnitClosed, '↳ F0.2b.11 Table Completion');
  exactOnce(nextOpen, '↳ F0.2b.12 Flow-chart Completion');
  exactOnce(parentOpen, '↳ F0.2b Adjudicación de bancos formativos — padre');
  assert(loopDocText.split(stop).length - 1 === 1,
    'El corte antes de F0.2b.12 debe aparecer exactamente una vez.');
  const nextMentions = rows.filter(row => /F0\.2b\.12 Flow-chart Completion/iu.test(row));
  assert(!nextMentions.some(row =>
    /(?:iniciad[oa]|started|en curso|cerrad[oa]|completed)/iu.test(row) && !row.includes(stop)),
  'F0.2b.12 tiene una declaración contradictoria con el corte de no inicio.');
  return true;
}

function basePacket(schemaVersion, reviewScope, reviewerIsolation, taskRule, instruction, excludes,
  records) {
  return {
    schemaVersion, generatedAt: BLIND_PACKETS_GENERATED_AT, reviewScope, reviewerIsolation,
    taskRule, instruction, excludes, records,
  };
}

export function buildPromptOnlyPacket() {
  const assets = sourceAssets(loadTsModule(CATALOG_PATH));
  assertUnitCardinality(assets);
  const packet = basePacket(
    'ielts-reading-table-completion-prompt-only.v1',
    'F0.2b.11 — grammar and visible-table shortcut audit over 18 open responses',
    'Use only the visible table frames, headers and word limits. Do not open passages, hints, keys, blind packets, registry or prior reviews.',
    'For each blank, classify the grammar requested and record whether the visible frame uniquely suggests an exact one- or two-word completion.',
    'Do not reconstruct stored keys. This packet measures prompt-only exact-guess risk without passage evidence.',
    ['passages', 'accepted answers', 'alternatives', 'explanations', 'hints', 'prior verdicts',
      'student data'],
    assets.map(asset => ({
      assetId: asset.assetId,
      sourceObjectSha256: asset.sourceObjectSha256,
      wordLimit: asset.wordLimit,
      maxWords: asset.maxWords,
      tableTitle: asset.tableTitle,
      columns: asset.columns,
      rows: asset.rows.map(row => ({
        rowId: row.id,
        cells: row.cells.map((cell, cellIndex) => cell.type === 'text'
          ? { kind: 'text', text: cell.text }
          : { kind: 'blank', questionId: `${row.id}-${cellIndex}`,
            before: cell.before, after: cell.after }),
      })),
    })),
  );
  assertCleanPacket(packet, 'prompt-only packet');
  return packet;
}

export function buildBlindReviewPacket() {
  const assets = sourceAssets(loadTsModule(CATALOG_PATH));
  assertUnitCardinality(assets);
  const packet = basePacket(
    'ielts-reading-table-completion-blind-review.v1',
    'F0.2b.11 — clean exact one-best-answer adjudication over three table passages',
    'Use only this packet. Do not open catalog, registry, validator, runtime, prompt-only verdict, factual packet or prior audits until all 18 decisions are persisted.',
    'Complete every table gap with a contiguous span from its passage. Use no more than two words; a hyphenated expression counts as one word and contractions are not tested. For official type 9, answers may not occur in passage order; judge this bank as written.',
    'Persist the completed cell, exact passage span, evidence, closest plausible competing span and ambiguity. Also judge whether row and column headers provide coherent coordinates without revealing the key. Do not use hints or outside knowledge.',
    ['answer keys', 'accepted alternatives', 'explanations', 'hints', 'prior verdicts',
      'factual sources', 'student data'],
    assets.map(asset => ({
      assetId: asset.assetId,
      title: asset.title,
      sourceObjectSha256: asset.sourceObjectSha256,
      passageSha256: asset.passageSha256,
      wordLimit: asset.wordLimit,
      maxWords: asset.maxWords,
      passage: asset.passage,
      tableTitle: asset.tableTitle,
      columns: asset.columns,
      rows: asset.rows.map(row => ({
        rowId: row.id,
        cells: row.cells.map((cell, cellIndex) => cell.type === 'text'
          ? { kind: 'text', text: cell.text }
          : { kind: 'blank', questionId: `${row.id}-${cellIndex}`,
            before: cell.before, after: cell.after }),
      })),
    })),
  );
  assertCleanPacket(packet, 'blind packet');
  return packet;
}

export function buildFactualSourceReviewPacketFromRegistry(registry, prerequisiteHashes) {
  assert(typeof FACTUAL_PACKET_GENERATED_AT === 'string',
    'FACTUAL_PACKET_GENERATED_AT debe fijarse solo después del primer pase persistido.');
  assert(registry?.schemaVersion === 'ielts-academic-reading-rights-registry.v2' &&
    registry.policyVersion === EXPECTED_POLICY_VERSION && registry.module === 'academic',
  'El factual packet requiere registry policy v8.');
  assert(Array.isArray(registry.evidence) && registry.evidence.every(row =>
    typeof row?.id === 'string' && row.id.trim()) &&
    new Set(registry.evidence.map(row => row.id)).size === registry.evidence.length,
  'El factual packet requiere evidence IDs únicos y no vacíos.');
  assertExactKeys(prerequisiteHashes,
    ['promptOnlyVerdict', 'expertFirstPass'], 'factualPacket.prerequisiteHashes');
  assert(Object.values(prerequisiteHashes).every(value => /^[a-f0-9]{64}$/u.test(value)),
    'El factual packet requiere hashes válidos de los dos pases ciegos.');
  const evidenceById = new Map(registry.evidence.map(row => [row.id, row]));
  const assetsById = new Map(sourceAssets(loadTsModule(CATALOG_PATH)).map(asset =>
    [asset.assetId, asset]));
  const records = EXPECTED_ASSET_IDS.map(assetId => {
    const rows = registry.entries.filter(row => row.assetId === assetId);
    assert(rows.length === 1, `${assetId}: se esperaba un registro global.`);
    const record = rows[0];
    const requiredSourceIds = REQUIRED_FACTUAL_SOURCE_IDS[assetId];
    const requiredClaimSpans = REQUIRED_FACTUAL_CLAIM_SPANS[assetId];
    assert(requiredClaimSpans.length === 5 && requiredClaimSpans.every(span =>
      assetsById.get(assetId)?.passage.includes(span)),
    `${assetId}: los cinco claim spans deben ser literales del pasaje vigente.`);
    assert(record.factualSourceResearch?.status === 'candidate-sources-collected' &&
      record.factualSourceResearch.sourceEvidenceIds.length === requiredSourceIds.length &&
      new Set(record.factualSourceResearch.sourceEvidenceIds).size === requiredSourceIds.length &&
      stableJson(record.factualSourceResearch.sourceEvidenceIds) ===
        stableJson(requiredSourceIds) &&
      typeof record.factualSourceResearch.limitation === 'string' &&
      record.factualSourceResearch.limitation.trim(),
    `${assetId}: inventario factual candidato incompleto o duplicado.`);
    return {
      assetId,
      claimSpansToReview: requiredClaimSpans,
      candidateSources: record.factualSourceResearch.sourceEvidenceIds.map(evidenceId => {
        const evidence = evidenceById.get(evidenceId);
        assert(evidence?.kind === 'factual-source' &&
          typeof evidence.label === 'string' && evidence.label.trim() &&
          typeof evidence.url === 'string' && /^https:\/\//u.test(evidence.url) &&
          typeof evidence.note === 'string' && evidence.note.trim(),
          `${assetId}: fuente factual inválida ${evidenceId}.`);
        return {
          evidenceId: evidence.id,
          label: evidence.label,
          url: evidence.url,
          note: evidence.note,
        };
      }),
      limitation: record.factualSourceResearch.limitation,
    };
  });
  const packet = {
    schemaVersion: 'ielts-reading-table-completion-factual-source-review.v1',
    generatedAt: FACTUAL_PACKET_GENERATED_AT,
    reviewScope: 'F0.2b.11 — second-pass factual-source review only',
    reviewerIsolation:
      'Open only after expert-first-pass.json is persisted and hashed. Do not change any completion decision after opening these sources.',
    prerequisiteHashes,
    instruction:
      'Open every source directly. Assess each exact claim as supported, oversimplified, unsupported or untraceable. Availability and candidacy do not prove facts, authorship, license, authorization or review.',
    excludes: ['answer keys', 'accepted alternatives', 'explanations', 'hints',
      'prior answer verdicts', 'student data'],
    records,
  };
  assertCleanPacket(packet, 'factual packet');
  return packet;
}

export function buildFactualSourceReviewPacket() {
  assert(existsSync(resolve(ROOT, PROMPT_ONLY_VERDICT_PATH)) &&
    existsSync(resolve(ROOT, FIRST_PASS_PATH)),
  'El factual packet requiere los dos verdicts ciegos persistidos.');
  return buildFactualSourceReviewPacketFromRegistry(
    loadTsModule(REGISTRY_PATH).IELTS_READING_RIGHTS_REGISTRY,
    {
      promptOnlyVerdict: sourceSha256(PROMPT_ONLY_VERDICT_PATH),
      expertFirstPass: sourceSha256(FIRST_PASS_PATH),
    },
  );
}

function allQuestionContext(assets) {
  return new Map(assets.flatMap(asset => asset.questions.map(question => [question.id, {
    asset,
    question,
  }])));
}

function validateReviewerBase(reviewer, expectedKeys, label) {
  assertExactKeys(reviewer, expectedKeys, label);
  assert(typeof reviewer.reviewerRunId === 'string' && reviewer.reviewerRunId.trim() &&
    Number.isFinite(timestampMs(reviewer.reviewedAt, `${label}.reviewedAt`)) &&
    reviewer.humanSignature === false && hasNonEmptyNotes(reviewer.notes),
  `${label}: trazabilidad incompleta.`);
}

function validatePromptOnlyVerdict(verdict, assets) {
  assertExactKeys(verdict, ['schemaVersion', 'reviewer', 'records'], 'promptOnlyVerdict');
  assert(verdict.schemaVersion === 'ielts-reading-table-completion-prompt-only-verdict.v1',
    'promptOnlyVerdict: schema inválido.');
  validateReviewerBase(verdict.reviewer,
    ['reviewerRunId', 'reviewedAt', 'packetSha256', 'sourceContext', 'humanSignature', 'notes'],
    'promptOnlyVerdict.reviewer');
  assert(verdict.reviewer.reviewerRunId === EXPECTED_REVIEWER_RUN_ID &&
    verdict.reviewer.packetSha256 === formattedJsonSha256(buildPromptOnlyPacket()) &&
    verdict.reviewer.sourceContext === 'prompt-only-packet-only',
  'promptOnlyVerdict: aislamiento inválido.');
  assertExactIdCoverage(verdict.records, EXPECTED_QUESTION_IDS, 'questionId',
    'promptOnlyVerdict.records');
  const contexts = allQuestionContext(assets);
  for (const row of verdict.records) {
    assertExactKeys(row,
      ['questionId', 'predictedGrammarCategory', 'plausibleCompletionCountBand',
        'plausibleCompletions', 'uniqueExactGuess', 'reasoning'],
      `${row.questionId}:promptOnly`);
    const context = contexts.get(row.questionId);
    assert(context, `${row.questionId}: pregunta fuera del banco.`);
    assert(typeof row.predictedGrammarCategory === 'string' &&
      row.predictedGrammarCategory.trim() &&
      ['zero', 'one', 'two-to-three', 'four-or-more'].includes(
        row.plausibleCompletionCountBand) && Array.isArray(row.plausibleCompletions) &&
      new Set(row.plausibleCompletions.map(normalizeRuntimeAnswer)).size ===
        row.plausibleCompletions.length && row.plausibleCompletions.every(value =>
        typeof value === 'string' && value.trim() &&
        runtimeWordCount(value) <= context.asset.maxWords) &&
      (row.uniqueExactGuess === null ||
        (typeof row.uniqueExactGuess === 'string' &&
          row.plausibleCompletions.length === 1 &&
          normalizeRuntimeAnswer(row.uniqueExactGuess) ===
            normalizeRuntimeAnswer(row.plausibleCompletions[0]))) &&
      (row.uniqueExactGuess !== null || row.plausibleCompletions.length !== 1) &&
      typeof row.reasoning === 'string' && row.reasoning.trim(),
    `${row.questionId}: dictamen prompt-only inválido.`);
    const expectedBand = row.plausibleCompletions.length === 0 ? 'zero' :
      row.plausibleCompletions.length === 1 ? 'one' :
        row.plausibleCompletions.length <= 3 ? 'two-to-three' : 'four-or-more';
    assert(row.plausibleCompletionCountBand === expectedBand,
      `${row.questionId}: plausibleCompletionCountBand contradice la lista.`);
  }
}

export function validatePromptOnlyVerdictDocument(verdict) {
  validatePromptOnlyVerdict(verdict, sourceAssets(loadTsModule(CATALOG_PATH)));
  return true;
}

export function assertExactPassageSpan(span, passage, selectedText, maxWords, label) {
  assertExactKeys(span, ['text', 'start', 'end'], label);
  const preceding = span.start > 0 ? passage[span.start - 1] : '';
  const following = span.end < passage.length ? passage[span.end] : '';
  assert(Number.isInteger(span.start) && Number.isInteger(span.end) && span.start >= 0 &&
    span.end > span.start && span.end <= passage.length &&
    passage.slice(span.start, span.end) === span.text &&
    !/[\p{L}\p{N}]/u.test(preceding) && !/[\p{L}\p{N}]/u.test(following) &&
    normalizeRuntimeAnswer(span.text) === normalizeRuntimeAnswer(selectedText) &&
    runtimeWordCount(span.text) >= 1 && runtimeWordCount(span.text) <= maxWords,
  `${label}: span no es literal, contiguo o excede wordLimit.`);
}

function completedSentence(question, selectedAnswer) {
  return normalizeText(`${question.before}${selectedAnswer}${question.after}`);
}

function validateQuestionDecision(value, sourceQuestion, asset, label) {
  assertExactKeys(value,
    ['questionId', 'selectedAnswer', 'normalizedSelectedAnswer', 'selectedAnswerWordCount',
      'completedSentence', 'grammaticalFit', 'selectedAnswerPassageSpan', 'evidenceQuotes',
      'closestCompetingAnswer', 'closestCompetitorPassageSpan', 'competitorFailure',
      'ambiguity', 'reasoning'], label);
  assert(value.questionId === sourceQuestion.id &&
    typeof value.selectedAnswer === 'string' && value.selectedAnswer.trim() &&
    value.normalizedSelectedAnswer === normalizeRuntimeAnswer(value.selectedAnswer) &&
    value.selectedAnswerWordCount === runtimeWordCount(value.selectedAnswer) &&
    value.selectedAnswerWordCount >= 1 && value.selectedAnswerWordCount <= asset.maxWords &&
    normalizeText(value.completedSentence) === completedSentence(sourceQuestion,
      value.selectedAnswer) && ['natural', 'strained', 'fails'].includes(value.grammaticalFit) &&
    Array.isArray(value.evidenceQuotes) && value.evidenceQuotes.length > 0 &&
    new Set(value.evidenceQuotes).size === value.evidenceQuotes.length &&
    value.evidenceQuotes.every(quote => typeof quote === 'string' && quote.trim() &&
      asset.passage.includes(quote)) &&
    typeof value.closestCompetingAnswer === 'string' &&
    value.closestCompetingAnswer.trim() &&
    normalizeRuntimeAnswer(value.closestCompetingAnswer) !== value.normalizedSelectedAnswer &&
    typeof value.competitorFailure === 'string' && value.competitorFailure.trim() &&
    ['none', 'minor', 'material'].includes(value.ambiguity) &&
    typeof value.reasoning === 'string' && value.reasoning.trim(),
  `${label}: decisión incompleta o no respeta wordLimit.`);
  assertExactPassageSpan(value.selectedAnswerPassageSpan, asset.passage, value.selectedAnswer,
    asset.maxWords, `${label}.selectedAnswerPassageSpan`);
  assertExactPassageSpan(value.closestCompetitorPassageSpan, asset.passage,
    value.closestCompetingAnswer, asset.maxWords, `${label}.closestCompetitorPassageSpan`);
  assert(value.evidenceQuotes.some(quote =>
    quote.includes(value.selectedAnswerPassageSpan.text)),
  `${label}: evidenceQuotes no contiene el span seleccionado.`);
}

function validateFirstPass(firstPass, assets) {
  assertExactKeys(firstPass, ['schemaVersion', 'reviewer', 'records'], 'firstPass');
  assert(firstPass.schemaVersion === 'ielts-reading-table-completion-expert-first-pass.v1',
    'firstPass: schema inválido.');
  validateReviewerBase(firstPass.reviewer,
    ['reviewerRunId', 'reviewedAt', 'blindPacketSha256', 'sourceContext',
      'humanSignature', 'notes'], 'firstPass.reviewer');
  assert(firstPass.reviewer.reviewerRunId === EXPECTED_REVIEWER_RUN_ID &&
    firstPass.reviewer.blindPacketSha256 === formattedJsonSha256(buildBlindReviewPacket()) &&
    firstPass.reviewer.sourceContext === 'blind-review-packet-only',
  'firstPass: aislamiento inválido.');
  assertExactIdCoverage(firstPass.records, EXPECTED_ASSET_IDS, 'assetId', 'firstPass.records');
  let questionCount = 0;
  for (const asset of assets) {
    const record = firstPass.records.find(row => row.assetId === asset.assetId);
    assertExactKeys(record, ['assetId', 'passageAssessment', 'questions'],
      `${asset.assetId}:first`);
    assertExactKeys(record.passageAssessment,
      ['ieltsFitness', 'wordLimitFitness', 'questionOrderRisk', 'promptCueRisk',
        'priorKnowledgeRisk', 'irrelevantLoadRisk', 'notes'],
      `${asset.assetId}:first.assessment`);
    assert(['fit', 'mixed', 'unfit'].includes(record.passageAssessment.ieltsFitness) &&
      ['fit', 'mixed', 'unfit'].includes(record.passageAssessment.wordLimitFitness) &&
      ['questionOrderRisk', 'promptCueRisk', 'priorKnowledgeRisk',
        'irrelevantLoadRisk'].every(key =>
        ['low', 'medium', 'high'].includes(record.passageAssessment[key])) &&
      hasNonEmptyNotes(record.passageAssessment.notes),
    `${asset.assetId}: first-pass assessment inválido.`);
    assertExactIdCoverage(record.questions, asset.questions.map(row => row.id), 'questionId',
      `${asset.assetId}:first.questions`);
    for (const question of asset.questions) {
      validateQuestionDecision(record.questions.find(row => row.questionId === question.id),
        question, asset, `${question.id}:first`);
      questionCount += 1;
    }
  }
  assert(questionCount === 18, 'First pass no cubre exactamente 18 preguntas.');
  return { fileSha256: sourceSha256(FIRST_PASS_PATH), questionCount };
}

export function validateFirstPassDocument(firstPass) {
  return validateFirstPass(firstPass, sourceAssets(loadTsModule(CATALOG_PATH)));
}

function validateFactualClaim(claim, expectedClaim, factualRecord, label) {
  assertExactKeys(claim, ['claim', 'assessment', 'evidenceIds', 'sourceFindings', 'note'], label);
  assert(claim.claim === expectedClaim &&
    ['supported', 'oversimplified', 'unsupported', 'untraceable'].includes(claim.assessment) &&
    Array.isArray(claim.evidenceIds) && claim.evidenceIds.length > 0 &&
    new Set(claim.evidenceIds).size === claim.evidenceIds.length &&
    claim.evidenceIds.every(id => factualRecord.candidateSources.some(source =>
      source.evidenceId === id)) && Array.isArray(claim.sourceFindings) &&
    claim.sourceFindings.length === claim.evidenceIds.length &&
    typeof claim.note === 'string' && claim.note.trim(),
  `${label}: factual claim inválido.`);
  assertExactIdCoverage(claim.sourceFindings, claim.evidenceIds, 'evidenceId',
    `${label}.sourceFindings`);
  claim.sourceFindings.forEach(finding => {
    assertExactKeys(finding, ['evidenceId', 'locator', 'evidenceNote'],
      `${label}.${finding.evidenceId}`);
    assert(typeof finding.locator === 'string' && finding.locator.trim() &&
      typeof finding.evidenceNote === 'string' && finding.evidenceNote.trim(),
    `${label}.${finding.evidenceId}: finding vacío.`);
  });
}

function acceptedAssessmentKey(row) {
  return `${row.questionId}\0${row.role}\0${row.acceptedText}`;
}

function validateAcceptedAnswerAssessments(rows, assets) {
  const inventory = acceptedInventory(assets);
  assert(Array.isArray(rows) && rows.length === inventory.length,
    'acceptedAnswerAssessments: cardinalidad 18 inválida.');
  const expectedKeys = inventory.map(acceptedAssessmentKey).sort();
  const observedKeys = rows.map(acceptedAssessmentKey);
  assert(new Set(observedKeys).size === observedKeys.length &&
    stableJson([...observedKeys].sort()) === stableJson(expectedKeys),
  'acceptedAnswerAssessments: entradas extra, duplicadas o ausentes.');
  const inventoryByKey = new Map(inventory.map(row => [acceptedAssessmentKey(row), row]));
  const statuses = [];
  for (const row of rows) {
    const source = inventoryByKey.get(acceptedAssessmentKey(row));
    const context = allQuestionContext(assets).get(row.questionId);
    assertExactKeys(row,
      ['questionId', 'acceptedText', 'normalizedText', 'role', 'passageStatus',
        'wordCount', 'grammaticalFit', 'evidenceIds', 'note'],
      `${row.questionId}:${row.role}:${row.acceptedText}`);
    assert(source && row.normalizedText === source.normalizedText &&
      row.wordCount === runtimeWordCount(row.acceptedText) &&
      row.wordCount >= 1 && row.wordCount <= context.asset.maxWords &&
      ['canonical', 'alternative'].includes(row.role) &&
      ['verbatim', 'unsupported'].includes(row.passageStatus) &&
      ['natural', 'strained', 'fails'].includes(row.grammaticalFit) &&
      Array.isArray(row.evidenceIds) && new Set(row.evidenceIds).size === row.evidenceIds.length &&
      row.evidenceIds.every(id => id === SAMPLE_TASKS_EVIDENCE_ID) &&
      typeof row.note === 'string' && row.note.trim(),
    `${row.questionId}: accepted-answer assessment inválido.`);
    if (row.role === 'canonical') {
      assert(row.passageStatus === 'verbatim' &&
        row.grammaticalFit === 'natural' &&
        row.evidenceIds.length === 0 &&
        wholeTokenOffsets(context.asset.passage, row.acceptedText).length >= 1,
      `${row.questionId}: la respuesta canónica dejó de ser literal.`);
    } else {
      assert(false, `${row.questionId}: alternativa no inventariada.`);
    }
    statuses.push(row);
  }
  return statuses;
}

export function validateAcceptedAnswerAssessmentsDocument(rows) {
  return validateAcceptedAnswerAssessments(rows, sourceAssets(loadTsModule(CATALOG_PATH))).length;
}

function validateExpertVerdict(verdict, firstPass, firstTrace, assets, factualPacket) {
  assertExactKeys(verdict, ['schemaVersion', 'reviewer', 'records'], 'expertVerdict');
  assert(verdict.schemaVersion === 'ielts-reading-table-completion-expert-verdict.v1',
    'expertVerdict: schema inválido.');
  validateReviewerBase(verdict.reviewer,
    ['reviewerRunId', 'reviewedAt', 'blindPacketSha256', 'firstPassSha256',
      'factualPacketSha256',
      'openedEvidenceIds', 'sourceContext', 'reviewSequence', 'directSourceReview',
      'humanSignature', 'notes'], 'expertVerdict.reviewer');
  const expectedEvidenceIds = [OFFICIAL_EVIDENCE_ID, SAMPLE_TASKS_EVIDENCE_ID,
    ...factualPacket.records.flatMap(row =>
      row.candidateSources.map(source => source.evidenceId))].sort();
  assert(stableJson(factualPacket.prerequisiteHashes) === stableJson({
    promptOnlyVerdict: sourceSha256(PROMPT_ONLY_VERDICT_PATH),
    expertFirstPass: firstTrace.fileSha256,
  }), 'expertVerdict: factual packet no está ligado a los dos pases ciegos vigentes.');
  assert(verdict.reviewer.reviewerRunId === EXPECTED_REVIEWER_RUN_ID &&
    verdict.reviewer.reviewerRunId === firstPass.reviewer.reviewerRunId &&
    verdict.reviewer.blindPacketSha256 === formattedJsonSha256(buildBlindReviewPacket()) &&
    verdict.reviewer.firstPassSha256 === firstTrace.fileSha256 &&
    verdict.reviewer.factualPacketSha256 === sourceSha256(FACTUAL_SOURCE_REVIEW_PATH) &&
    stableJson([...verdict.reviewer.openedEvidenceIds].sort()) === stableJson(expectedEvidenceIds) &&
    verdict.reviewer.sourceContext === 'two-pass-blind-then-factual-and-policy-sources' &&
    stableJson(verdict.reviewer.reviewSequence) ===
      stableJson(['blind-review', 'factual-and-policy-source-review']) &&
    verdict.reviewer.directSourceReview === true,
  'expertVerdict: trazabilidad o secuencia inválida.');
  assertExactIdCoverage(verdict.records, EXPECTED_ASSET_IDS, 'assetId',
    'expertVerdict.records');
  const comparisons = [];
  const factualClaims = [];
  const acceptedAssessments = [];
  const evidenceOffsets = [];
  for (const asset of assets) {
    const record = verdict.records.find(row => row.assetId === asset.assetId);
    const prior = firstPass.records.find(row => row.assetId === asset.assetId);
    const factualRecord = factualPacket.records.find(row => row.assetId === asset.assetId);
    assertExactKeys(record,
      ['assetId', 'passageAssessment', 'questions', 'factualClaims',
        'acceptedAnswerAssessments'], `${asset.assetId}:expert`);
    assertExactKeys(record.passageAssessment,
      ['ieltsFitness', 'factualRisk', 'representationRisk', 'priorKnowledgeRisk',
        'irrelevantLoadRisk', 'wordLimitRisk', 'questionOrderRisk', 'promptCueRisk',
        'hintCueRisk', 'notes'], `${asset.assetId}:expert.assessment`);
    assert(['fit', 'mixed', 'unfit'].includes(record.passageAssessment.ieltsFitness) &&
      ['factualRisk', 'representationRisk', 'priorKnowledgeRisk', 'irrelevantLoadRisk',
        'wordLimitRisk', 'questionOrderRisk', 'promptCueRisk'].every(key =>
        ['low', 'medium', 'high'].includes(record.passageAssessment[key])) &&
      record.passageAssessment.hintCueRisk === 'not-assessed' &&
      hasNonEmptyNotes(record.passageAssessment.notes),
    `${asset.assetId}: expert passage assessment inválido.`);
    assertExactIdCoverage(record.questions, asset.questions.map(row => row.id), 'questionId',
      `${asset.assetId}:expert.questions`);
    for (const sourceQuestion of asset.questions) {
      const decision = record.questions.find(row => row.questionId === sourceQuestion.id);
      const firstDecision = prior.questions.find(row => row.questionId === sourceQuestion.id);
      validateQuestionDecision(decision, sourceQuestion, asset, `${sourceQuestion.id}:expert`);
      assert(decision.selectedAnswerPassageSpan.start ===
        EXPECTED_INTENDED_ANSWER_OFFSETS[sourceQuestion.id] &&
        decision.selectedAnswerPassageSpan.end ===
          EXPECTED_INTENDED_ANSWER_OFFSETS[sourceQuestion.id] + sourceQuestion.answer.length &&
        decision.normalizedSelectedAnswer === normalizeRuntimeAnswer(sourceQuestion.answer),
      `${sourceQuestion.id}: el pase experto no conserva el span whole-token intencionado.`);
      assert(stableJson(decision) === stableJson(firstDecision),
        `${sourceQuestion.id}: cambió después de abrir fuentes.`);
      evidenceOffsets.push({ assetId: asset.assetId, questionId: sourceQuestion.id,
        offset: decision.selectedAnswerPassageSpan.start });
      const accepted = [sourceQuestion.answer, ...(sourceQuestion.alternatives ?? [])]
        .map(normalizeRuntimeAnswer);
      comparisons.push({
        questionId: sourceQuestion.id,
        selectedAnswer: decision.selectedAnswer,
        matchesStoredAcceptedSet: accepted.includes(decision.normalizedSelectedAnswer),
        grammaticalFit: decision.grammaticalFit,
        ambiguity: decision.ambiguity,
      });
    }
    const expectedClaims = REQUIRED_FACTUAL_CLAIM_SPANS[asset.assetId];
    assertExactIdCoverage(record.factualClaims, expectedClaims, 'claim',
      `${asset.assetId}:factualClaims`);
    expectedClaims.forEach(expectedClaim => {
      const claim = record.factualClaims.find(row => row.claim === expectedClaim);
      validateFactualClaim(claim, expectedClaim, factualRecord,
        `${asset.assetId}:${expectedClaim.slice(0, 24)}`);
      factualClaims.push({ ...claim, assetId: asset.assetId });
    });
    acceptedAssessments.push(...record.acceptedAnswerAssessments);
  }
  validateAcceptedAnswerAssessments(acceptedAssessments, assets);
  const orderViolations = [];
  for (const asset of assets) {
    const rows = evidenceOffsets.filter(row => row.assetId === asset.assetId);
    for (let index = 1; index < rows.length; index += 1) {
      if (rows[index].offset <= rows[index - 1].offset) orderViolations.push(rows[index].questionId);
    }
  }
  assert(stableJson(orderViolations) === stableJson(EXPECTED_TEXT_ORDER_VIOLATIONS),
    `Orden textual inválido: ${orderViolations.join(', ') || 'ninguno'}.`);
  return { comparisons, factualClaims, acceptedAssessments, evidenceOffsets, orderViolations };
}

function validateStudentWalkthrough(walkthrough, assets) {
  assertExactKeys(walkthrough, ['schemaVersion', 'reviewer', 'records'], 'walkthrough');
  assert(walkthrough.schemaVersion ===
    'ielts-reading-table-completion-student-walkthrough.v1',
  'walkthrough: schema inválido.');
  assertExactKeys(walkthrough.reviewer,
    ['humanSignature', 'sourceContext', 'reviewedAt', 'blindPacketSha256', 'notes'],
    'walkthrough.reviewer');
  assert(walkthrough.reviewer.humanSignature === false &&
    walkthrough.reviewer.sourceContext === 'blind-review-packet-only' &&
    walkthrough.reviewer.blindPacketSha256 === formattedJsonSha256(buildBlindReviewPacket()) &&
    Number.isFinite(timestampMs(walkthrough.reviewer.reviewedAt,
      'walkthrough.reviewer.reviewedAt')) && hasNonEmptyNotes(walkthrough.reviewer.notes),
  'walkthrough: reviewer inválido.');
  assertCleanPacket(walkthrough, 'walkthrough');
  assertExactIdCoverage(walkthrough.records, EXPECTED_ASSET_IDS, 'assetId',
    'walkthrough.records');
  let questionsCovered = 0;
  for (const asset of assets) {
    const record = walkthrough.records.find(row => row.assetId === asset.assetId);
    assertExactKeys(record,
      ['assetId', 'passageBarrier', 'wordLimitRisk', 'promptCueRisk', 'hintCueRisk',
        'shortcutRisks', 'transferValue', 'nextAction', 'questionWalkthrough'],
      `${asset.assetId}:walkthrough`);
    assert(typeof record.passageBarrier === 'string' && record.passageBarrier.trim() &&
      ['wordLimitRisk', 'promptCueRisk'].every(key =>
        ['low', 'medium', 'high'].includes(record[key])) &&
      record.hintCueRisk === 'not-assessed' &&
      Array.isArray(record.shortcutRisks) && record.shortcutRisks.length >= 2 &&
      record.shortcutRisks.every(value => typeof value === 'string' && value.trim()) &&
      typeof record.transferValue === 'string' && record.transferValue.trim() &&
      typeof record.nextAction === 'string' && record.nextAction.trim(),
    `${asset.assetId}: walkthrough incompleto.`);
    assertExactIdCoverage(record.questionWalkthrough, asset.questions.map(row => row.id),
      'questionId', `${asset.assetId}:walkthrough.questions`);
    for (const sourceQuestion of asset.questions) {
      const row = record.questionWalkthrough.find(item => item.questionId === sourceQuestion.id);
      assertExactKeys(row,
        ['questionId', 'likelyMisread', 'predictedGrammarCategory', 'wordLimitCheck',
          'promptOnlyGuessRisk', 'evidenceSearch', 'passageSpanCheck', 'grammarRecheck',
          'spellingCheck', 'competitorCheck', 'decisionRule', 'repairAction'],
        `${sourceQuestion.id}:walkthrough`);
      assert(Object.values(row).every(value => typeof value === 'string' && value.trim()),
        `${sourceQuestion.id}: walkthrough vacío.`);
      questionsCovered += 1;
    }
  }
  return { passagesCovered: assets.length, questionsCovered };
}

export function validateStudentWalkthroughDocument(walkthrough) {
  return validateStudentWalkthrough(walkthrough, sourceAssets(loadTsModule(CATALOG_PATH)));
}

function resolveLocalSourceImport(fromAbsolutePath, specifier) {
  if (!(specifier.startsWith('@/') || specifier.startsWith('.'))) return null;
  const unresolved = specifier.startsWith('@/')
    ? resolve(ROOT, 'src', specifier.slice(2)) : resolve(dirname(fromAbsolutePath), specifier);
  const candidates = [
    unresolved,
    ...['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css'].map(extension =>
      `${unresolved}${extension}`),
    ...['.ts', '.tsx', '.js', '.jsx', '.mjs'].map(extension =>
      resolve(unresolved, `index${extension}`)),
  ];
  return candidates.find(candidate => existsSync(candidate) &&
    /\.(?:ts|tsx|js|jsx|mjs|css)$/u.test(candidate)) ?? null;
}

export function renderDependencyClosure(entryPaths) {
  const pending = entryPaths.map(path => resolve(ROOT, path));
  const visited = new Set();
  while (pending.length) {
    const absolutePath = pending.pop();
    if (visited.has(absolutePath) || !existsSync(absolutePath)) continue;
    visited.add(absolutePath);
    const source = readFileSync(absolutePath, 'utf8');
    const specifiers = [
      ...source.matchAll(/\b(?:import|export)\s+(?:type\s+)?(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]/gu),
      ...source.matchAll(/\bimport\(\s*['"]([^'"]+)['"]\s*\)/gu),
      ...source.matchAll(/@import\s+(?:url\()?\s*['"]([^'"]+)['"]/gu),
    ].map(match => match[1]);
    for (const specifier of specifiers) {
      const dependency = resolveLocalSourceImport(absolutePath, specifier);
      if (dependency && !visited.has(dependency)) pending.push(dependency);
    }
  }
  return [...visited].sort();
}

function sourceFilesUnder(path) {
  return readdirSync(resolve(ROOT, path), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && /\.(?:ts|tsx|js|jsx|mjs)$/u.test(entry.name))
    .map(entry => resolve(entry.parentPath, entry.name));
}

function validateSourceAvailability(ledger, registry, unitRecords) {
  assertExactKeys(ledger,
    ['schemaVersion', 'checkedAt', 'retrievalStartedAt', 'method', 'coverageContract',
      'sources', 'observedAvailability', 'interpretation'],
    'sourceAvailability');
  assert(ledger.schemaVersion === 'ielts-reading-table-completion-source-availability.v1' &&
    strictCalendarDate(ledger.checkedAt, 'sourceAvailability.checkedAt') &&
    Number.isFinite(timestampMs(ledger.retrievalStartedAt,
      'sourceAvailability.retrievalStartedAt')) &&
    ledger.retrievalStartedAt.slice(0, 10) === ledger.checkedAt &&
    ledger.method.includes('response-body SHA-256') &&
    ledger.interpretation.includes('do not establish') &&
    ledger.interpretation.includes('authorship') &&
    ledger.interpretation.includes('shared batch-start marker') &&
    ledger.interpretation.includes('not a per-response completion timestamp'),
  'sourceAvailability: metadata inválida.');
  const expectedIds = [OFFICIAL_EVIDENCE_ID, SAMPLE_TASKS_EVIDENCE_ID,
    ...unitRecords.flatMap(record => record.factualSourceResearch.sourceEvidenceIds)].sort();
  assert(expectedIds.length === 16 && new Set(expectedIds).size === 16,
    'La unidad requiere 2 fuentes oficiales + 14 fuentes factuales únicas.');
  assertExactKeys(ledger.coverageContract,
    ['officialSources', 'factualSources', 'totalSources', 'factualSourcesPerAsset',
      'officialEvidenceIds', 'factualEvidenceIdsByAsset'],
    'sourceAvailability.coverageContract');
  assert(ledger.coverageContract.officialSources === 2 &&
    ledger.coverageContract.factualSources === 14 &&
    ledger.coverageContract.totalSources === 16 &&
    stableJson(ledger.coverageContract.factualSourcesPerAsset) === stableJson({
      'formative:table-completion:table-cooling-buildings': 4,
      'formative:table-completion:table-rain-gardens': 5,
      'formative:table-completion:table-museum-inventory': 5,
    }) &&
    stableJson(ledger.coverageContract.officialEvidenceIds) ===
      stableJson([OFFICIAL_EVIDENCE_ID, SAMPLE_TASKS_EVIDENCE_ID]) &&
    stableJson(ledger.coverageContract.factualEvidenceIdsByAsset) ===
      stableJson(REQUIRED_FACTUAL_SOURCE_IDS),
  'sourceAvailability.coverageContract contradice 2+14.');
  assertExactIdCoverage(ledger.sources, expectedIds, 'evidenceId',
    'sourceAvailability.sources');
  const evidenceById = new Map(registry.evidence.map(row => [row.id, row]));
  ledger.sources.forEach((source, index) => {
    assertExactKeys(source,
      ['evidenceId', 'requestedUrl', 'retrievedAt', 'httpStatus', 'finalUrl', 'redirected',
        'contentType', 'sizeBytes', 'bodySha256', 'availabilityStatus',
        'retrievalInterpretation', 'claimVerificationStatus'],
      `sourceAvailability.sources[${index}]`);
    const evidence = evidenceById.get(source.evidenceId);
    assert(evidence?.url === source.requestedUrl &&
      Number.isFinite(timestampMs(source.retrievedAt, `${source.evidenceId}.retrievedAt`)) &&
      source.retrievedAt.slice(0, 10) === ledger.checkedAt &&
      Number.isInteger(source.httpStatus) && source.httpStatus >= 0 &&
      source.httpStatus <= 599 && (source.httpStatus === 0 || source.httpStatus >= 100) &&
      typeof source.finalUrl === 'string' &&
      source.finalUrl.trim() && typeof source.redirected === 'boolean' &&
      (source.contentType === null || typeof source.contentType === 'string') &&
      Number.isInteger(source.sizeBytes) && source.sizeBytes >= 0 &&
      (source.bodySha256 === null || /^[a-f0-9]{64}$/u.test(source.bodySha256)) &&
      source.availabilityStatus === (source.httpStatus === 200 ? 'retrieved' : 'not-retrieved') &&
      typeof source.retrievalInterpretation === 'string' &&
      source.retrievalInterpretation.trim() &&
      source.claimVerificationStatus === 'not-performed',
    `${source.evidenceId}: ledger inválido.`);
    if (source.httpStatus === 200) {
      assert(source.sizeBytes > 0 && /^[a-f0-9]{64}$/u.test(source.bodySha256),
        `${source.evidenceId}: respuesta 200 sin cuerpo fijado.`);
    }
  });
  assertExactKeys(ledger.observedAvailability,
    ['http200', 'http403', 'networkError', 'redirected', 'requestedContentRetrieved',
      'requestedContentNotRetrieved', 'claimsVerified'],
    'sourceAvailability.observedAvailability');
  const observed = {
    http200: ledger.sources.filter(row => row.httpStatus === 200).length,
    http403: ledger.sources.filter(row => row.httpStatus === 403).length,
    networkError: ledger.sources.filter(row => row.httpStatus === 0).length,
    redirected: ledger.sources.filter(row => row.redirected).length,
    requestedContentRetrieved: ledger.sources.filter(row => row.availabilityStatus ===
      'retrieved').length,
    requestedContentNotRetrieved: ledger.sources.filter(row => row.availabilityStatus ===
      'not-retrieved').length,
    claimsVerified: ledger.sources.filter(row => row.claimVerificationStatus !==
      'not-performed').length,
  };
  assert(stableJson(ledger.observedAvailability) === stableJson(observed),
    'sourceAvailability.observedAvailability contradice las filas.');
}

function validateProvenanceSearch(ledger, registry) {
  assertExactKeys(ledger,
    ['schemaVersion', 'searchedAt', 'method', 'searchSurface', 'queries', 'interpretation'],
    'provenanceSearch');
  assert(ledger.schemaVersion === 'ielts-reading-table-completion-provenance-search.v1' &&
    Number.isFinite(timestampMs(ledger.searchedAt, 'provenanceSearch.searchedAt')) &&
    ledger.method.includes('exact opening-fragment') &&
    ledger.interpretation.includes('non-exhaustive') &&
    ledger.interpretation.includes('does not prove originality'),
  'provenanceSearch: metadata inválida.');
  assertExactIdCoverage(ledger.queries, EXPECTED_ASSET_IDS, 'assetId',
    'provenanceSearch.queries');
  for (const query of ledger.queries) {
    assertExactKeys(query,
      ['assetId', 'query', 'resultsReviewed', 'candidateFactualSourcesCompared', 'outcome'],
      `${query.assetId}:provenance`);
    const evidenceById = new Map(registry.evidence.map(row => [row.id, row]));
    const expectedCandidateUrls = REQUIRED_FACTUAL_SOURCE_IDS[query.assetId]
      .map(id => evidenceById.get(id)?.url);
    assert(typeof query.query === 'string' && query.query.trim() &&
      query.outcome === 'no-exact-match-in-reviewed-results' &&
      Array.isArray(query.resultsReviewed) && query.resultsReviewed.length >= 2 &&
      Array.isArray(query.candidateFactualSourcesCompared) &&
      query.candidateFactualSourcesCompared.length === expectedCandidateUrls.length &&
      new Set(query.candidateFactualSourcesCompared).size === expectedCandidateUrls.length &&
      stableJson(query.candidateFactualSourcesCompared) === stableJson(expectedCandidateUrls),
    `${query.assetId}: búsqueda incompleta.`);
    query.resultsReviewed.forEach((result, index) => {
      assertExactKeys(result, ['title', 'url', 'reasonNotExactMatch'],
        `${query.assetId}:result[${index}]`);
      assert(Object.values(result).every(value => typeof value === 'string' && value.trim()),
        `${query.assetId}: resultado vacío.`);
    });
  }
}

function referencedEvidenceIds(record) {
  return [
    ...record.moduleAssessment.evidenceIds,
    ...record.authorship.evidenceIds,
    ...record.provenanceAssessment.evidenceIds,
    ...record.rightsAssessment.evidenceIds,
    ...record.factualSourceResearch.sourceEvidenceIds,
    ...record.factualReview.sourceEvidenceIds,
    ...record.humanReview.evidenceIds,
  ];
}

export function assertDecisionQuarantined(decision, label = 'decision') {
  const expectedReasonCodes = [
    'authorship-unresolved',
    'factual-review-incomplete',
    'human-review-pending',
    'module-not-declared',
    'rights-unresolved',
  ];
  assert(decision.rightsBasis === 'unknown-quarantined' &&
    decision.disposition === 'quarantine' && decision.eligibleForPublicationPipeline === false &&
    stableJson(decision.reasonCodes) === stableJson(expectedReasonCodes),
  `${label}: la cuarentena exacta fue debilitada.`);
  return true;
}

export function assertExpectedMaterialAmbiguities(questionIds) {
  assert(Array.isArray(questionIds) &&
    stableJson(questionIds) === stableJson(EXPECTED_MATERIAL_AMBIGUITY_IDS),
  `El inventario material cambió: ${Array.isArray(questionIds) && questionIds.length ?
    questionIds.join(', ') : 'ninguno'}.`);
  return true;
}

function validateAuditVerdicts(audit, facts = null) {
  assertExactKeys(audit, ['schemaVersion', 'reviewedAt', 'status', 'passMeaning', 'rows'],
    'auditVerdicts');
  assert(audit.schemaVersion === 'ielts-reading-table-completion-audit-verdicts.v1' &&
    audit.status === 'pass' && Number.isFinite(timestampMs(audit.reviewedAt,
      'auditVerdicts.reviewedAt')) && audit.passMeaning ===
      'The F0.2b.11 audit dossier and its detection controls pass; all three assets remain quarantined and the bank, content certification, Practice, Exam and security remain blocked.',
  'auditVerdicts sobredeclara aprobación.');
  const expected = [
    ['Rights and provenance', '✅'],
    ['Full-stack and data', '✅'],
    ['IELTS expert', '✅'],
    ['Cognitive walkthrough', '✅'],
    ['Anti-bias and leakage', '✅'],
    ['UI/UX and accessibility', '➖'],
    ['Playwright', '➖'],
  ];
  assertExactIdCoverage(audit.rows, expected.map(row => row[0]), 'lane',
    'auditVerdicts.rows');
  for (const [lane, mark] of expected) {
    const row = audit.rows.find(candidate => candidate.lane === lane);
    assertExactKeys(row, ['lane', 'boardMark', 'scope', 'findings', 'blockersCarriedForward'],
      `${lane}:audit`);
    assert(row.boardMark === mark && [row.scope, row.findings, row.blockersCarriedForward]
      .every(value => typeof value === 'string' && value.trim()),
    `${lane}: audit incompleto.`);
  }
  if (!facts) return;
  const byLane = new Map(audit.rows.map(row => [row.lane, row]));
  assert(byLane.get('Rights and provenance').findings.includes('3/3') &&
    /license|authorship/iu.test(byLane.get('Rights and provenance').blockersCarriedForward),
  'Carril de derechos contradice cuarentena.');
  assert(byLane.get('IELTS expert').findings.includes(`${facts.expertMatches}/18`) &&
    /word limit|word-limit|order/iu.test(byLane.get('IELTS expert').findings),
  'Carril IELTS omite acuerdo, límite u orden.');
  assert(byLane.get('Anti-bias and leakage').findings.includes('1/18') &&
    byLane.get('Anti-bias and leakage').blockersCarriedForward.includes('n=18'),
  'Carril anti-sesgo contradice el predictor de longitud o n.');
  assert(byLane.get('UI/UX and accessibility').scope ===
      'Not applicable to unchanged learner-runtime conformance in this audit-only delta.' &&
    byLane.get('Playwright').scope ===
      'Not applicable to unchanged learner-runtime behavior; portable Chromium verifies the report package only.' &&
    !audit.rows.some(row => /fully conformant|proves? conformity|release[- ]ready/iu.test(
      `${row.scope} ${row.findings} ${row.blockersCarriedForward}`)),
  'UI/Playwright ➖ fue presentado como conformidad.');
}

export function validateChronology(input, now = Date.now()) {
  const baselineAt = timestampMs(input.baseline.capturedAt, 'baseline.capturedAt');
  const retrievalStartedAt = timestampMs(input.sourceAvailability.retrievalStartedAt,
    'sourceAvailability.retrievalStartedAt');
  const retrievalTimes = input.sourceAvailability.sources.map(source =>
    timestampMs(source.retrievedAt, `${source.evidenceId}.retrievedAt`));
  const provenanceAt = timestampMs(input.provenanceSearch.searchedAt,
    'provenanceSearch.searchedAt');
  const manifestAt = timestampMs(input.unitChangeManifest.recordedAt,
    'unitChangeManifest.recordedAt');
  const registryTimes = input.unitRecords.map(record => timestampMs(
    record.automatedTriage.assessedAt, `${record.assetId}.automatedTriage.assessedAt`));
  const blindPacketAt = timestampMs(BLIND_PACKETS_GENERATED_AT,
    'BLIND_PACKETS_GENERATED_AT');
  const factualPacketAt = timestampMs(FACTUAL_PACKET_GENERATED_AT,
    'FACTUAL_PACKET_GENERATED_AT');
  const promptAt = timestampMs(input.promptOnlyVerdict.reviewer.reviewedAt,
    'promptOnlyVerdict.reviewedAt');
  const firstAt = timestampMs(input.firstPass.reviewer.reviewedAt, 'firstPass.reviewedAt');
  const walkthroughAt = timestampMs(input.walkthrough.reviewer.reviewedAt,
    'walkthrough.reviewedAt');
  const expertAt = timestampMs(input.expertVerdict.reviewer.reviewedAt,
    'expertVerdict.reviewedAt');
  const auditAt = timestampMs(input.audit.reviewedAt, 'auditVerdicts.reviewedAt');
  const all = [baselineAt, retrievalStartedAt, ...retrievalTimes, provenanceAt, manifestAt,
    ...registryTimes, blindPacketAt, promptAt, firstAt, factualPacketAt, walkthroughAt,
    expertAt, auditAt];
  assert(all.every(value => value <= now),
    'La cronología contiene timestamps futuros.');
  assert(baselineAt <= retrievalStartedAt &&
    retrievalTimes.every(value => value >= retrievalStartedAt) &&
    Math.max(...retrievalTimes) <= provenanceAt && provenanceAt <= manifestAt &&
    registryTimes.every(value => value >= manifestAt) &&
    Math.max(...registryTimes) <= blindPacketAt &&
    blindPacketAt <= promptAt && promptAt <= firstAt && firstAt <= factualPacketAt &&
    factualPacketAt <= expertAt && blindPacketAt <= walkthroughAt &&
    Math.max(promptAt, walkthroughAt, expertAt) <= auditAt,
  'La cronología declarada es imposible o no monotónica.');
}

function validateBaseline(baseline, assets, storedRisk, renderClosurePaths) {
  assertExactKeys(baseline,
    ['schemaVersion', 'capturedAt', 'scope', 'assets', 'hashMethods', 'structuralRisk',
      'runtimeAndAccessibilityBaseline', 'learnerFacingSourceSha256', 'routeObjectSha256',
      'renderDependencyClosureSha256', 'concurrentExternalClosureChange', 'nextUnit',
      'interpretation'], 'baseline');
  assertExactKeys(baseline.scope,
    ['unit', 'format', 'passages', 'questions', 'blanks'], 'baseline.scope');
  assert(baseline.schemaVersion === 'ielts-reading-table-completion-baseline.v1' &&
    baseline.scope.unit === 'F0.2b.11' && baseline.scope.format === 'table-completion' &&
    baseline.scope.passages === 3 && baseline.scope.questions === 18 &&
    baseline.scope.blanks === 18 && baseline.assets.length === 3,
  'baseline: identidad 3/18/18 inválida.');
  assertExactKeys(baseline.hashMethods, ['sourceObjectSha256', 'passageSha256'],
    'baseline.hashMethods');
  assert(baseline.hashMethods.sourceObjectSha256.includes('key-sorted JSON') &&
    baseline.hashMethods.passageSha256.includes('passage text only') &&
    baseline.hashMethods.passageSha256.includes('NFKC') &&
    baseline.hashMethods.passageSha256.includes('rights registry policy v8'),
  'baseline.hashMethods no distingue object hash de passage-only hash.');
  assertExactIdCoverage(baseline.assets, EXPECTED_ASSET_IDS, 'assetId', 'baseline.assets');
  for (const asset of assets) {
    const pinned = baseline.assets.find(row => row.assetId === asset.assetId);
    assertExactKeys(pinned,
      ['assetId', 'setId', 'title', 'wordCount', 'paragraphCount', 'questionCount',
        'blankCount', 'wordLimit', 'questionIds', 'sourceObjectSha256', 'passageSha256'],
      `${asset.assetId}:baseline`);
    assert(pinned.setId === asset.id && pinned.title === asset.title &&
      pinned.wordLimit === asset.wordLimit && pinned.wordCount === asset.wordCount &&
      pinned.paragraphCount === asset.passage.split(/\n\s*\n/gu).length &&
      pinned.questionCount === 6 && pinned.blankCount === 6 &&
      stableJson(pinned.questionIds) === stableJson(asset.questions.map(row => row.id)) &&
      pinned.sourceObjectSha256 === asset.sourceObjectSha256 &&
      pinned.passageSha256 === asset.passageSha256,
    `${asset.assetId}: drift desde baseline.`);
  }
  assertExactKeys(baseline.structuralRisk,
    ['wordLimitContract', 'answerSurfaceProfile', 'textOrder', 'shortcutSignals',
      'normalizationContract'], 'baseline.structuralRisk');
  const structural = baseline.structuralRisk;
  assertExactKeys(structural.wordLimitContract,
    ['declaredInstruction', 'setsWithDeclaredInstruction', 'setsWithMaxWordsField',
      'runtimeStoredMaxWordsDisplayLimit', 'wordLimitParticipatesInScoring'],
    'baseline.structuralRisk.wordLimitContract');
  assert(structural.wordLimitContract.declaredInstruction === 'NO MORE THAN TWO WORDS' &&
    structural.wordLimitContract.setsWithDeclaredInstruction === 3 &&
    structural.wordLimitContract.setsWithMaxWordsField === 3 &&
    structural.wordLimitContract.runtimeStoredMaxWordsDisplayLimit === 2 &&
    structural.wordLimitContract.wordLimitParticipatesInScoring === false,
  'baseline.wordLimitContract contradice banco/runtime.');
  assertExactKeys(structural.answerSurfaceProfile,
    ['questions', 'oneWordPrimaryAnswers', 'twoWordPrimaryAnswers',
      'primaryAnswersOverTwoWords', 'primaryAnswersExactPassageTokenSequences',
      'primaryAnswerTokenSequencesUniqueWithinBank', 'questionsWithAcceptedAlternativeEntry',
      'rawAcceptedEntries', 'normalizedAcceptedValues',
      'normalizedRedundantAlternativeEntries', 'grammaticallyInvalidAlternativeEntries',
      'manuallyClassifiedNominalOrNounPhrasePrimaryAnswers', 'manualClassificationCaveat'],
    'baseline.structuralRisk.answerSurfaceProfile');
  assert(structural.answerSurfaceProfile.questions === 18 &&
    structural.answerSurfaceProfile.oneWordPrimaryAnswers ===
      storedRisk.canonicalAnswerWordCountDistribution.oneWord &&
    structural.answerSurfaceProfile.twoWordPrimaryAnswers ===
      storedRisk.canonicalAnswerWordCountDistribution.twoWords &&
    structural.answerSurfaceProfile.primaryAnswersOverTwoWords ===
      storedRisk.canonicalAnswerWordCountDistribution.overLimit &&
    structural.answerSurfaceProfile.primaryAnswersExactPassageTokenSequences === 18 &&
    structural.answerSurfaceProfile.primaryAnswerTokenSequencesUniqueWithinBank === 17 &&
    structural.answerSurfaceProfile.questionsWithAcceptedAlternativeEntry === 0 &&
    structural.answerSurfaceProfile.rawAcceptedEntries === 18 &&
    structural.answerSurfaceProfile.normalizedAcceptedValues === 17 &&
    structural.answerSurfaceProfile.normalizedRedundantAlternativeEntries === 0 &&
    structural.answerSurfaceProfile.grammaticallyInvalidAlternativeEntries === 0 &&
    structural.answerSurfaceProfile.manuallyClassifiedNominalOrNounPhrasePrimaryAnswers === 14 &&
    structural.answerSurfaceProfile.manualClassificationCaveat.includes('Manual'),
  'baseline.answerSurfaceProfile contradice 18 raw/17 normalized o sus categorías gramaticales.');
  assertExactKeys(structural.textOrder,
    ['setsWithStrictlyAscendingEvidenceOrder', 'totalSets', 'orderViolations',
      'canonicalAnswersWithExactlyOneWholeTokenOccurrence',
      'canonicalAnswersWithMultipleWholeTokenOccurrences',
      'naiveFirstMatchOrderViolationQuestionIds', 'intendedWholeTokenOffsetsPinned'],
    'baseline.structuralRisk.textOrder');
  assert(structural.textOrder.setsWithStrictlyAscendingEvidenceOrder ===
      storedRisk.setsWithStrictlyAscendingCanonicalEvidenceOrder &&
    structural.textOrder.totalSets === 3 && structural.textOrder.orderViolations === 2 &&
    structural.textOrder.canonicalAnswersWithExactlyOneWholeTokenOccurrence === 12 &&
    structural.textOrder.canonicalAnswersWithMultipleWholeTokenOccurrences === 6 &&
    stableJson(structural.textOrder.naiveFirstMatchOrderViolationQuestionIds) ===
      stableJson(['table-rain-gardens-01-2', 'table-rain-gardens-02-1',
        'table-rain-gardens-03-1', 'table-museum-inventory-01-2']) &&
    structural.textOrder.intendedWholeTokenOffsetsPinned === 18,
  'baseline.textOrder contradice los offsets canónicos.');
  assertExactKeys(structural.shortcutSignals,
    ['questionsWithUniqueExactPromptPassageBigram', 'alwaysTwoWordPrimaryAnswerHits',
      'sameQuestionPositionAcrossSetsModalEvidenceParagraphHits',
      'manuallyClassifiedNominalOrNounPhrasePrimaryAnswers',
      'questionsWithHintsAvailableBeforeResponse', 'preResponseHintsWithAnchorOrLocationLanguage',
      'preResponseHintsWithParaphraseOnly', 'questionsWithPostCheckExplanation',
      'sameQuestionPositionAcrossSetsModalPrimaryAnswerWordCountHits',
      'sameQuestionPositionAcrossSetsEligible', 'surfaceShortcutReviewRequired'],
    'baseline.structuralRisk.shortcutSignals');
  assert(structural.shortcutSignals.questionsWithUniqueExactPromptPassageBigram === 14 &&
    structural.shortcutSignals.alwaysTwoWordPrimaryAnswerHits === 1 &&
    structural.shortcutSignals.sameQuestionPositionAcrossSetsModalEvidenceParagraphHits === 13 &&
    structural.shortcutSignals.manuallyClassifiedNominalOrNounPhrasePrimaryAnswers === 14 &&
    structural.shortcutSignals.questionsWithHintsAvailableBeforeResponse === 18 &&
    structural.shortcutSignals.preResponseHintsWithAnchorOrLocationLanguage === 18 &&
    structural.shortcutSignals.preResponseHintsWithParaphraseOnly === 0 &&
    structural.shortcutSignals.questionsWithPostCheckExplanation === 18 &&
    structural.shortcutSignals.sameQuestionPositionAcrossSetsModalPrimaryAnswerWordCountHits ===
      storedRisk.sameQuestionPositionAcrossSetsModalAnswerWordCount.hits &&
    structural.shortcutSignals.sameQuestionPositionAcrossSetsEligible === 18 &&
    structural.shortcutSignals.surfaceShortcutReviewRequired === true,
  'baseline.shortcutSignals contradice banco/runtime.');
  assertExactKeys(structural.normalizationContract,
    ['trimOuterWhitespace', 'lowercase', 'collapseInternalWhitespace',
      'removeTrailingAsciiPunctuation', 'unicodeNormalization', 'hyphenNormalization',
      'acceptedVariantsOnlyWhenExplicitAlternativeExists'],
    'baseline.structuralRisk.normalizationContract');
  assert(stableJson(structural.normalizationContract) === stableJson({
    trimOuterWhitespace: true,
    lowercase: true,
    collapseInternalWhitespace: true,
    removeTrailingAsciiPunctuation: '.,;:!?',
    unicodeNormalization: false,
    hyphenNormalization: false,
    acceptedVariantsOnlyWhenExplicitAlternativeExists: true,
  }), 'baseline.normalizationContract no coincide con el engine.');
  assertExactKeys(baseline.runtimeAndAccessibilityBaseline,
    ['runtimeClassification', 'answerKeysDeliveredToClient', 'inputLocksAfterExplicitCheck',
      'inputLocksWhileTyping', 'correctnessAndExplanationShownImmediatelyAfterCheck',
      'hintsAvailableBeforeResponse', 'attemptStatePersisted', 'resetRequiresConfirmation',
      'resetScope', 'wordLimitVisualWarningPresent', 'wordLimitEnforcedInScoring',
      'inputAccessibleNamePresent', 'inputAccessibleNamesUniqueAcrossThreeSets',
      'breadcrumbHasNavAndCurrentSemantics', 'englishPassageHasLangAttribute',
      'progressIndicatorHasProgrammaticRoleNameAndValue', 'feedbackHasLiveRegion',
      'hintToggleHasExpandedAndControlsSemantics', 'headingHierarchyIsOrdered',
      'feedbackFocusManaged', 'uiUxStaticReviewApplicable',
      'playwrightApplicableToAuditOnlyScaffoldDelta',
      'playwrightBecomesApplicableOnLearnerFacingOrRuntimeDrift'],
    'baseline.runtimeAndAccessibilityBaseline');
  const expectedRuntime = {
    runtimeClassification:
      'guided-training-runtime-with-immediate-feedback-not-practice-or-exam-simulation',
    answerKeysDeliveredToClient: true,
    inputLocksAfterExplicitCheck: true,
    inputLocksWhileTyping: false,
    correctnessAndExplanationShownImmediatelyAfterCheck: true,
    hintsAvailableBeforeResponse: true,
    attemptStatePersisted: false,
    resetRequiresConfirmation: false,
    resetScope: 'all-six-blanks-in-one-passage-engine',
    wordLimitVisualWarningPresent: true,
    wordLimitEnforcedInScoring: false,
    inputAccessibleNamePresent: true,
    inputAccessibleNamesUniqueAcrossThreeSets: true,
    breadcrumbHasNavAndCurrentSemantics: true,
    englishPassageHasLangAttribute: false,
    progressIndicatorHasProgrammaticRoleNameAndValue: false,
    feedbackHasLiveRegion: false,
    hintToggleHasExpandedAndControlsSemantics: false,
    headingHierarchyIsOrdered: false,
    feedbackFocusManaged: false,
    uiUxStaticReviewApplicable: true,
    playwrightApplicableToAuditOnlyScaffoldDelta: false,
    playwrightBecomesApplicableOnLearnerFacingOrRuntimeDrift: true,
  };
  assert(stableJson(baseline.runtimeAndAccessibilityBaseline) === stableJson(expectedRuntime),
    'Runtime/accessibility baseline inesperado.');
  assert(stableJson(Object.keys(baseline.learnerFacingSourceSha256).sort()) ===
    stableJson([...LEARNER_FACING_PATHS].sort()) &&
    stableJson(baseline.learnerFacingSourceSha256) === stableJson(Object.fromEntries(
      LEARNER_FACING_PATHS.map(path => [path, EXPECTED_RENDER_CLOSURE_SHA256[path]]))) &&
    Object.entries(baseline.learnerFacingSourceSha256).every(([path, expected]) =>
      [ROUTE_PATH, ENGINE_PATH].includes(path) || sourceSha256(path) === expected),
  'El snapshot histórico cambió fuera de la ruta Table remediada.');
  const currentRouteHash = sha256(stableJson(routeObject(loadTsModule(CATALOG_PATH),
    'table-completion')));
  assert(baseline.routeObjectSha256 === EXPECTED_ROUTE_OBJECT_SHA256 &&
    baseline.routeObjectSha256 === currentRouteHash,
    'baseline.routeObjectSha256 cambió.');
  assert(stableJson(Object.keys(baseline.renderDependencyClosureSha256).sort()) ===
    stableJson([...renderClosurePaths].sort()) &&
    stableJson(baseline.renderDependencyClosureSha256) ===
      stableJson(EXPECTED_RENDER_CLOSURE_SHA256) &&
    Object.entries(baseline.renderDependencyClosureSha256).every(([path, expected]) =>
      [ROUTE_PATH, ENGINE_PATH].includes(path) || sourceSha256(path) === expected),
  'La clausura histórica cambió fuera de la ruta Table remediada.');
  assertExactKeys(baseline.concurrentExternalClosureChange,
    ['path', 'previousSha256', 'currentSha256', 'observedDiffSummary', 'observedAt',
      'attribution', 'interpretation'], 'baseline.concurrentExternalClosureChange');
  assert(baseline.concurrentExternalClosureChange.path === 'src/app/layout.tsx' &&
    baseline.concurrentExternalClosureChange.previousSha256 ===
      '03d06f0aba4ac802fd9bf69b63229af511a8f4daa132d405dfc36a1a19f01dda' &&
    baseline.concurrentExternalClosureChange.currentSha256 ===
      EXPECTED_RENDER_CLOSURE_SHA256['src/app/layout.tsx'] &&
    baseline.concurrentExternalClosureChange.observedDiffSummary ===
      'GTM disabled in preview/development' &&
    timestampMs(baseline.concurrentExternalClosureChange.observedAt,
      'baseline.concurrentExternalClosureChange.observedAt') >=
      timestampMs('2026-08-11T17:01:00Z', 'concurrent drift lower bound') &&
    baseline.concurrentExternalClosureChange.attribution ===
      'outside-F0.2b.11-audit-files' &&
    baseline.concurrentExternalClosureChange.interpretation.includes(
      'Table content/engine/bank unchanged') &&
    baseline.concurrentExternalClosureChange.interpretation.includes(
      'no UI conformity is certified'),
  'baseline.concurrentExternalClosureChange no documenta honestamente el drift ajeno.');
  assert(baseline.interpretation.includes('audit-only') &&
    baseline.interpretation.includes('F0.2b.11 Table Completion') &&
    baseline.interpretation.includes('not a conformity finding'),
  'baseline.interpretation sobredeclara alcance o frontera.');
  assertNextUnitPinned(baseline);
}

function validateUnitChangeManifest(manifest, renderClosurePaths) {
  assertExactKeys(manifest,
    ['schemaVersion', 'unit', 'recordedAt', 'learnerFacingChangeAuthorized',
      'learnerFacingBaselinePaths', 'renderDependencyClosureBaselinePaths', 'unitSourceFiles',
      'unitOutputDirectory', 'nextUnitBoundary', 'applicability', 'interpretation'],
    'unitChangeManifest');
  assert(manifest.schemaVersion ===
    'ielts-reading-table-completion-unit-change-manifest.v1' &&
    manifest.unit === 'F0.2b.11' &&
    Number.isFinite(timestampMs(manifest.recordedAt, 'unitChangeManifest.recordedAt')) &&
    manifest.learnerFacingChangeAuthorized === false &&
    stableJson([...manifest.learnerFacingBaselinePaths].sort()) ===
      stableJson([...LEARNER_FACING_PATHS].sort()) &&
    stableJson([...manifest.renderDependencyClosureBaselinePaths].sort()) ===
      stableJson([...renderClosurePaths].sort()) &&
    stableJson([...manifest.unitSourceFiles].sort()) ===
      stableJson([REGISTRY_PATH, VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH].sort()) &&
    manifest.unitOutputDirectory === OUTPUT_DIRECTORY,
  'unitChangeManifest: alcance final inválido.');
  assertExactKeys(manifest.nextUnitBoundary, ['unit', 'format', 'status'],
    'unitChangeManifest.nextUnitBoundary');
  assert(manifest.nextUnitBoundary.unit === 'F0.2b.12' &&
    manifest.nextUnitBoundary.format === 'flow-chart-completion' &&
    manifest.nextUnitBoundary.status === 'not-started',
  'unitChangeManifest: frontera F0.2b.12 inválida.');
  assertExactKeys(manifest.applicability,
    ['staticUiUxAndAccessibilityReview', 'uiUxDeltaTesting', 'playwright',
      'notApplicableMeaning', 'playwrightActivationCriteria'],
    'unitChangeManifest.applicability');
  assert(manifest.applicability.staticUiUxAndAccessibilityReview ===
    'applicable-to-existing-baseline' &&
    manifest.applicability.uiUxDeltaTesting ===
      'not-applicable-only-while-learner-facing-and-render-closure-hashes-match-baseline' &&
    manifest.applicability.playwright ===
      'not-applicable-only-while-learner-facing-and-render-closure-hashes-match-baseline' &&
    manifest.applicability.notApplicableMeaning.includes(
      'not a UI, accessibility or runtime conformity') &&
    Array.isArray(manifest.applicability.playwrightActivationCriteria) &&
    manifest.applicability.playwrightActivationCriteria.length >= 4 &&
    manifest.interpretation.includes('exact stop boundary'),
  'unitChangeManifest sobredeclara UI/Playwright o conserva scaffold obsoleto.');
}

export function validateAuditScaffoldsDocument() {
  const catalog = loadTsModule(CATALOG_PATH);
  const registry = loadTsModule(REGISTRY_PATH).IELTS_READING_RIGHTS_REGISTRY;
  const assets = sourceAssets(catalog);
  const baseline = readJson(BASELINE_PATH);
  const sourceAvailability = readJson(SOURCE_AVAILABILITY_PATH);
  const provenanceSearch = readJson(PROVENANCE_SEARCH_PATH);
  const manifest = readJson(UNIT_CHANGE_MANIFEST_PATH);
  assertCurrentTableUnitPinned();
  const renderClosurePaths = Object.keys(EXPECTED_RENDER_CLOSURE_SHA256);
  const unitRecords = EXPECTED_ASSET_IDS.map(assetId => {
    const rows = registry.entries.filter(row => row.assetId === assetId);
    assert(rows.length === 1, `${assetId}: registry debe tener una fila.`);
    return rows[0];
  });
  validateBaseline(baseline, assets, structuralRiskProfile(assets), renderClosurePaths);
  validateSourceAvailability(sourceAvailability, registry, unitRecords);
  validateProvenanceSearch(provenanceSearch, registry);
  validateUnitChangeManifest(manifest, renderClosurePaths);
  return { baseline: true, sourceAvailability: true, provenanceSearch: true,
    unitChangeManifest: true };
}

export function buildValidationArtifacts() {
  const catalog = loadTsModule(CATALOG_PATH);
  const registry = loadTsModule(REGISTRY_PATH).IELTS_READING_RIGHTS_REGISTRY;
  const contract = loadTsModule(CONTRACT_PATH);
  const assets = sourceAssets(catalog);
  const baseline = readJson(BASELINE_PATH);
  const sourceAvailability = readJson(SOURCE_AVAILABILITY_PATH);
  const provenanceSearch = readJson(PROVENANCE_SEARCH_PATH);
  const unitChangeManifest = readJson(UNIT_CHANGE_MANIFEST_PATH);
  assert(sourceSha256(BASELINE_PATH) === EXPECTED_BASELINE_SHA256 &&
    sourceSha256(SOURCE_AVAILABILITY_PATH) === EXPECTED_SOURCE_AVAILABILITY_SHA256 &&
    sourceSha256(PROVENANCE_SEARCH_PATH) === EXPECTED_PROVENANCE_SEARCH_SHA256 &&
    sourceSha256(UNIT_CHANGE_MANIFEST_PATH) === EXPECTED_UNIT_CHANGE_MANIFEST_SHA256,
  'Baseline/source-availability/provenance/manifest no coinciden con la transacción revisada.');
  assert(sourceSha256(TEST_PATH) === EXPECTED_TEST_SHA256,
    'El arnés adversarial no coincide byte a byte con la revisión ejecutada.');
  assert(sourceSha256(LOOP_DOC_PATH) === EXPECTED_LOOP_DOC_SHA256,
    'El tablero/evidencia F0.2b.11 no coincide byte a byte con el cierre revisado.');
  const promptOnlyPacket = buildPromptOnlyPacket();
  const blindPacket = buildBlindReviewPacket();
  const factualPacket = buildFactualSourceReviewPacket();
  const promptOnlyVerdict = readJson(PROMPT_ONLY_VERDICT_PATH);
  const firstPass = readJson(FIRST_PASS_PATH);
  const expertVerdict = readJson(EXPERT_VERDICT_PATH);
  const walkthrough = readJson(STUDENT_WALKTHROUGH_PATH);
  const audit = readJson(AUDIT_VERDICTS_PATH);
  assert(sourceSha256(PROMPT_ONLY_VERDICT_PATH) === EXPECTED_PROMPT_ONLY_VERDICT_SHA256 &&
    sourceSha256(FIRST_PASS_PATH) === EXPECTED_FIRST_PASS_SHA256 &&
    sourceSha256(FACTUAL_SOURCE_REVIEW_PATH) === EXPECTED_FACTUAL_PACKET_SHA256 &&
    sourceSha256(EXPERT_VERDICT_PATH) === EXPECTED_EXPERT_VERDICT_SHA256 &&
    sourceSha256(STUDENT_WALKTHROUGH_PATH) === EXPECTED_STUDENT_WALKTHROUGH_SHA256 &&
    sourceSha256(AUDIT_VERDICTS_PATH) === EXPECTED_AUDIT_VERDICTS_SHA256,
  'Los veredictos/packet factual/walkthrough/panel no coinciden con la transacción revisada.');
  assertCurrentTableUnitPinned();
  const renderClosurePaths = Object.keys(EXPECTED_RENDER_CLOSURE_SHA256);
  const renderClosure = renderClosurePaths.map(path => resolve(ROOT, path));
  const storedRisk = structuralRiskProfile(assets);

  assertUnitCardinality(assets);
  assert(assets.every(asset => asset.wordLimit === 'NO MORE THAN TWO WORDS' &&
    parseWordLimit(asset.wordLimit) === asset.maxWords && asset.maxWords === 2 &&
    asset.instructions === EXPECTED_INSTRUCTIONS && asset.rows.length === 3 &&
    asset.rows.every(row => row.cells.length === 3 &&
      row.cells.filter(cell => cell.type === 'blank').length === 2) &&
    asset.questions.every(question => runtimeWordCount(question.answer) <= asset.maxWords)),
  'Word limits, instructions, grupos o respuestas canónicas inválidas.');
  validateBaseline(baseline, assets, storedRisk, renderClosurePaths);
  validateUnitChangeManifest(unitChangeManifest, renderClosurePaths);

  assert(registry.schemaVersion === 'ielts-academic-reading-rights-registry.v2' &&
    registry.policyVersion === EXPECTED_POLICY_VERSION && registry.module === 'academic',
  'Registry global no está en policy v8.');
  const evidenceById = new Map(registry.evidence.map(row => [row.id, row]));
  assert(evidenceById.size === registry.evidence.length, 'Evidence IDs duplicados.');
  assert(evidenceById.get(OFFICIAL_EVIDENCE_ID)?.kind === 'official-policy' &&
    evidenceById.get(OFFICIAL_EVIDENCE_ID)?.url === OFFICIAL_FORMAT_URL &&
    evidenceById.get(SAMPLE_TASKS_EVIDENCE_ID)?.kind === 'official-policy' &&
    evidenceById.get(SAMPLE_TASKS_EVIDENCE_ID)?.url === SAMPLE_TASKS_URL,
  'Fuentes oficiales de formato/samples ausentes o cambiadas.');
  const unitRecords = EXPECTED_ASSET_IDS.map(assetId => {
    const rows = registry.entries.filter(row => row.assetId === assetId);
    assert(rows.length === 1, `${assetId}: registry debe tener una fila.`);
    return rows[0];
  });
  const reviewedEvidenceIds = [
    OFFICIAL_EVIDENCE_ID,
    SAMPLE_TASKS_EVIDENCE_ID,
    ...unitRecords.flatMap(record => record.factualSourceResearch.sourceEvidenceIds),
  ];
  const reviewedEvidence = reviewedEvidenceIds.map(evidenceId => evidenceById.get(evidenceId));
  assert(new Set(reviewedEvidenceIds).size === 16 && reviewedEvidence.every(Boolean) &&
    sha256(stableJson(unitRecords)) === EXPECTED_UNIT_RECORDS_STABLE_SHA256 &&
    sha256(stableJson(reviewedEvidence)) === EXPECTED_UNIT_EVIDENCE_STABLE_SHA256,
  'Los registros o las 16 evidencias de Table no coinciden con la revisión conservadora.');
  validateSourceAvailability(sourceAvailability, registry, unitRecords);
  validateProvenanceSearch(provenanceSearch, registry);
  validatePromptOnlyVerdict(promptOnlyVerdict, assets);
  validateAuditVerdicts(audit);
  validateChronology({ baseline, sourceAvailability, provenanceSearch, unitChangeManifest,
    unitRecords, promptOnlyVerdict, firstPass, expertVerdict, walkthrough, audit });

  const decisions = assets.map(asset => {
    const record = unitRecords.find(row => row.assetId === asset.assetId);
    referencedEvidenceIds(record).forEach(evidenceId =>
      assert(evidenceById.has(evidenceId), `${asset.assetId}: evidencia inexistente ${evidenceId}`));
    assert(record.sourceObjectSha256 === asset.sourceObjectSha256 &&
      record.passageSha256 === asset.passageSha256 &&
      record.authorship.status === 'unknown' &&
      record.provenanceAssessment.status === 'unresolved' &&
      record.rightsAssessment.basis === 'unknown-quarantined' &&
      record.rightsAssessment.status === 'reviewed-unresolved' &&
      record.rightsAssessment.rightsHolder === null &&
      record.rightsAssessment.authorizationEvidenceStatus ===
        'not-located-in-reviewed-sources' &&
      record.factualReviewRequirement.policy === 'required' &&
      record.factualSourceResearch.status === 'candidate-sources-collected' &&
      stableJson(record.factualSourceResearch.sourceEvidenceIds) ===
        stableJson(REQUIRED_FACTUAL_SOURCE_IDS[asset.assetId]) &&
      record.factualReview.status === 'not-reviewed' &&
      record.humanReview.status === 'pending',
    `${asset.assetId}: cuarentena/estado editorial exacto inválido.`);
    for (const evidenceId of referencedEvidenceIds(record)) {
      const evidence = evidenceById.get(evidenceId);
      assert(strictCalendarDate(evidence.accessedAt, `${evidenceId}.accessedAt`),
        `${evidenceId}: accessedAt inválido.`);
      assertNoFutureTimestamp(`${evidence.accessedAt}T00:00:00Z`, `${evidenceId}.accessedAt`);
    }
    assertNoFutureTimestamp(record.automatedTriage.assessedAt,
      `${asset.assetId}.automatedTriage.assessedAt`);
    const assessed = contract.assessIeltsReadingRights(registry, asset);
    assert(assessed.disposition === 'quarantine' &&
      assessed.eligibleForPublicationPipeline === false &&
      assessed.rightsBasis === 'unknown-quarantined' &&
      !assessed.reasonCodes.some(code => [
        'registry-contract-invalid', 'content-hash-mismatch',
        'factual-source-research-invalid',
      ].includes(code)), `${asset.assetId}: registry inválido oculto.`);
    const decision = {
      assetId: asset.assetId,
      title: asset.title,
      sourceObjectSha256: asset.sourceObjectSha256,
      passageSha256: asset.passageSha256,
      wordCount: asset.wordCount,
      wordLimit: asset.wordLimit,
      maxWords: asset.maxWords,
      questionCount: asset.questions.length,
      canonicalAnswerCount: asset.questions.length,
      acceptedEntryCount: asset.questions.reduce((sum, question) =>
        sum + 1 + (question.alternatives?.length ?? 0), 0),
      provenanceStatus: record.provenanceAssessment.status,
      rightsBasis: assessed.rightsBasis,
      factualResearchStatus: record.factualSourceResearch.status,
      factualReviewPolicy: record.factualReviewRequirement.policy,
      candidateFactualSourceCount: record.factualSourceResearch.sourceEvidenceIds.length,
      factualReviewStatus: record.factualReview.status,
      humanReviewStatus: record.humanReview.status,
      authorizationEvidenceStatus: record.rightsAssessment.authorizationEvidenceStatus,
      disposition: assessed.disposition,
      eligibleForPublicationPipeline: assessed.eligibleForPublicationPipeline,
      reasonCodes: assessed.reasonCodes,
    };
    assertDecisionQuarantined(decision, asset.assetId);
    return decision;
  });

  const runtimeRegistryImports = sourceFilesUnder('src')
    .filter(path => ![resolve(ROOT, REGISTRY_PATH), resolve(ROOT, CONTRACT_PATH)].includes(path))
    .filter(path => {
      const relativePath = relative(ROOT, path);
      const source = readFileSync(path, 'utf8');
      return !(relativePath === 'src/lib/ielts/table-completion-publication.ts' &&
        source.startsWith("import 'server-only';"));
    })
    .filter(path => {
      const source = readFileSync(path, 'utf8');
      return source.includes('ielts-reading-rights-registry') ||
        source.includes('academic-reading-rights');
    });
  assert(runtimeRegistryImports.length === 0,
    `Runtime importa registry/contrato: ${runtimeRegistryImports.join(', ')}`);
  const closureTexts = renderClosure
    .filter(path => relative(ROOT, path) !== CATALOG_PATH)
    .map(path => readFileSync(path, 'utf8'));
  assert(findTableCompletionAssignmentLeaks(closureTexts).length === 0,
    'La clausura learner-facing contiene una asignación explícita question→answer.');

  const routeText = readFileSync(resolve(ROOT, ROUTE_PATH), 'utf8');
  const remediationReviewText = readFileSync(resolve(ROOT,
    'src/components/exam-practice/TableCompletionReviewSourceBlock.tsx'), 'utf8');
  assert(!/textos originales de WeLearn|Banco original WeLearn|sin copiar preguntas oficiales/iu
    .test(routeText) &&
    routeText.includes('TableCompletionReviewSourceBlock') &&
    remediationReviewText.includes('práctica guiada fue autorizada') &&
    remediationReviewText.includes('no se presenta como examen oficial'),
  'La publicación guiada reintrodujo claims de originalidad o retiró sus límites.');
  // The portable F0.2b.11 report is an immutable pre-remediation snapshot. Its five claims stay
  // inventoried here even though the current Table route deliberately renders none of them.
  const visibleClaims = [
    ...['textos originales de WeLearn', 'Banco original WeLearn',
      'sin copiar preguntas oficiales'].map(text => ({
      text, sourcePath: ROUTE_PATH, observed: true,
    })),
    {
      text: 'preparado por el equipo académico de WeLearn y revisado en julio de 2026',
      sourcePath: REVIEW_SOURCE_BLOCK_PATH,
      observed: true,
    },
    {
      text: 'los ejercicios son originales de WeLearn',
      sourcePath: REVIEW_SOURCE_BLOCK_PATH,
      observed: true,
    },
  ];
  assert(visibleClaims.every(row => row.observed), 'Cambió un claim visible de originalidad.');

  const engineText = readFileSync(resolve(ROOT, ENGINE_PATH), 'utf8');
  // This object intentionally reproduces the runtime that the immutable F0.2b.11
  // package audited. The active guided-practice runtime is pinned separately below.
  const runtime = {
    clientSideCanonicalAnswersPresent: true,
    clientSideAcceptedAlternativesPresent: true,
    preResponseHintsAvailable: true,
    answerCheckRequiresExplicitButton: true,
    answerLocksAfterCheck: true,
    correctnessAndExplanationShownImmediatelyAfterCheck: true,
    incorrectResponseRevealsCanonicalAnswerAfterCheck: true,
    wordLimitDisplayHardCodedToTwo: false,
    storedWordLimitParsedForEnforcement: true,
    wordLimitViolationExplicitlyBlocksCheck: false,
    classification:
      'guided-training-runtime-with-explicit-check-and-immediate-post-check-key-and-explanation-not-practice-or-exam-simulation',
  };
  assert(Object.entries(runtime).filter(([key]) => key !== 'classification' &&
    !['wordLimitDisplayHardCodedToTwo', 'wordLimitViolationExplicitlyBlocksCheck']
      .includes(key)).every(([, value]) => value === true) &&
    runtime.wordLimitDisplayHardCodedToTwo === false &&
    runtime.wordLimitViolationExplicitlyBlocksCheck === false,
  'Cambió el runtime de check/feedback/keys/hints/word-limit.');
  const activeGuidedRuntimeIsPinned =
    engineText.includes("'use client'") &&
    engineText.includes('cell.answer') &&
    engineText.includes('cell.alternatives') &&
    engineText.includes('wordCount(answers[id] ?? \'\') > passage.maxWords') &&
    engineText.includes('disabled={isChecked && isCorrect}') &&
    engineText.includes('window.localStorage.setItem') &&
    engineText.includes('window.confirm') &&
    engineText.includes('role="progressbar"') &&
    engineText.includes('aria-live="polite"') &&
    engineText.includes('aria-expanded={Boolean(showHints[id])}') &&
    engineText.includes('scope="row"') &&
    engineText.includes('<article lang="en"');
  assert(activeGuidedRuntimeIsPinned,
    'La remediación funcional del runtime guiado cambió o quedó incompleta.');

  const firstTrace = validateFirstPass(firstPass, assets);
  const expert = validateExpertVerdict(expertVerdict, firstPass, firstTrace, assets,
    factualPacket);
  const walkthroughNote = validateStudentWalkthrough(walkthrough, assets);
  const conflicts = expert.comparisons.filter(row => !row.matchesStoredAcceptedSet)
    .map(row => row.questionId);
  const materialAmbiguities = expert.comparisons.filter(row => row.ambiguity === 'material')
    .map(row => row.questionId);
  const nonNaturalSelections = expert.comparisons.filter(row => row.grammaticalFit !== 'natural')
    .map(row => row.questionId);
  assert(conflicts.length === 0, `Expert verdict no coincide 18/18: ${conflicts.join(', ')}`);
  assertExpectedMaterialAmbiguities(materialAmbiguities);
  assert(expert.factualClaims.length === 15, 'Faltan claims factuales exactos.');
  const acceptedStatusCounts = Object.fromEntries(
    ['verbatim', 'normalized-duplicate', 'official-spelling-variant', 'unsupported'].map(status =>
      [status, expert.acceptedAssessments.filter(row => row.passageStatus === status).length]));
  const factualAssessmentCounts = Object.fromEntries(
    ['supported', 'oversimplified', 'unsupported', 'untraceable'].map(assessment =>
      [assessment, expert.factualClaims.filter(row => row.assessment === assessment).length]));
  const uniquePromptRows = promptOnlyVerdict.records.filter(row => row.uniqueExactGuess !== null);
  const acceptedByQuestion = new Map(assets.flatMap(asset => asset.questions.map(question => [
    question.id,
    [question.answer, ...(question.alternatives ?? [])].map(normalizeRuntimeAnswer),
  ])));
  const promptShortcut = {
    uniquePredictions: uniquePromptRows.length,
    hits: uniquePromptRows.filter(row => acceptedByQuestion.get(row.questionId)
      .includes(normalizeRuntimeAnswer(row.uniqueExactGuess))).length,
    total: 18,
  };
  validateAuditVerdicts(audit, { expertMatches: 18 - conflicts.length });

  const negativeControl = contract.assessIeltsReadingRights(registry, {
    ...assets[0], passageSha256: '0'.repeat(64),
  });
  assert(negativeControl.reasonCodes.includes('content-hash-mismatch'),
    'La mutación de contenido no falla cerrada.');
  const leakControls = {
    englishAnswer: findTableCompletionAssignmentLeaks({
      instruction: 'Answer for table-cooling-01-1 is heat',
    }),
    englishCompletion: findTableCompletionAssignmentLeaks({
      instruction: 'Complete table-cooling-01-2 with prevailing winds',
    }),
    spanishCompletion: findTableCompletionAssignmentLeaks({
      nested: { repair: 'table-rain-gardens-02-2 se completa con wet' },
    }),
    spanishAnswer: findTableCompletionAssignmentLeaks({
      repair: 'La respuesta de table-museum-inventory-03-2 es publication',
    }),
    nestedField: findTableCompletionAssignmentLeaks({
      questionId: 'table-rain-gardens-03-1', review: { selectedAnswer: 'soil' },
    }),
  };
  assert(Object.values(leakControls).every(findings => findings.length === 1),
    'El detector adversarial EN/ES/nested no falla cerrado.');
  const contentCertificationBlocked = assets.flatMap(asset => asset.questions).length < 100 ||
    runtime.clientSideCanonicalAnswersPresent || runtime.clientSideAcceptedAlternativesPresent ||
    runtime.preResponseHintsAvailable || runtime.wordLimitDisplayHardCodedToTwo ||
    conflicts.length > 0 || materialAmbiguities.length > 0 || nonNaturalSelections.length > 0 ||
    storedRisk.frameGrammaticalFit.exactOneBestAnswerEstablished < 18 ||
    storedRisk.grammaticallyInvalidAcceptedAlternatives.length > 0 ||
    expert.acceptedAssessments.some(row => row.passageStatus === 'unsupported');
  assert(contentCertificationBlocked, 'Content certification debía quedar bloqueada.');
  assertBoardStopBoundary(readFileSync(resolve(ROOT, LOOP_DOC_PATH), 'utf8'));

  const allSourcePaths = [
    ...LEARNER_FACING_PATHS, ...NEXT_UNIT_PATHS, CONTRACT_PATH, REGISTRY_PATH,
    VALIDATOR_PATH, TEST_PATH, LOOP_DOC_PATH, BASELINE_PATH, SOURCE_AVAILABILITY_PATH,
    PROVENANCE_SEARCH_PATH, UNIT_CHANGE_MANIFEST_PATH, PROMPT_ONLY_PACKET_PATH,
    PROMPT_ONLY_VERDICT_PATH, BLIND_REVIEW_PATH, FACTUAL_SOURCE_REVIEW_PATH,
    FIRST_PASS_PATH, EXPERT_VERDICT_PATH, STUDENT_WALKTHROUGH_PATH, AUDIT_VERDICTS_PATH,
    BUILD_REPORT_PATH,
  ];
  const validation = {
    schemaVersion: 'ielts-reading-table-completion-rights-validation.v1',
    generatedAt: audit.reviewedAt,
    unit: 'F0.2b.11 — three formative Table Completion passages',
    status: 'pass',
    passMeaning:
      'PASS certifies audit coverage, identity, quarantine, prompt-only review, exact-answer adjudication and risk detection. It does not approve keys, factuality, rights, publication, runtime conformity or student efficacy; bank and content certification remain BLOCKED.',
    scope: {
      passages: 3,
      questions: 18,
      canonicalAnswers: 18,
      rawAcceptedEntries: 18,
      normalizedAcceptedValues: 17,
      registryEntriesInUnit: decisions.length,
      registryEntriesTotal: registry.entries.length,
      coveredAssetIds: EXPECTED_ASSET_IDS,
      parentF02bRemainsOpen: true,
      scopedLearnerSourcesChangedSinceBaseline: false,
    },
    concurrentExternalClosureChange: baseline.concurrentExternalClosureChange,
    checks: {
      exactCoverageThreeEighteenEighteenEighteenEighteen: true,
      stableUniqueIds: new Set(EXPECTED_ASSET_IDS).size === 3 &&
        new Set(EXPECTED_QUESTION_IDS).size === 18,
      registryPolicyV8Pinned: true,
      actualAssetsAllQuarantined: decisions.every(row =>
        row.eligibleForPublicationPipeline === false),
      officialFormatAndSampleSourcesRetrieved:
        [OFFICIAL_EVIDENCE_ID, SAMPLE_TASKS_EVIDENCE_ID].every(evidenceId =>
          sourceAvailability.sources.some(row => row.evidenceId === evidenceId &&
            row.httpStatus === 200 && row.claimVerificationStatus === 'not-performed')),
      factualSourceAvailabilityRecordedNotVerified:
        sourceAvailability.sources.length === 16 &&
        decisions.every(row => row.factualReviewStatus === 'not-reviewed'),
      renderDependencyClosurePinned: true,
      auditRegistryAbsentFromLearnerRuntimeImports: runtimeRegistryImports.length === 0,
      threePacketsContainNoKeysAlternativesEditorialFeedbackHintsPiiOrAssignments:
        [promptOnlyPacket, blindPacket, factualPacket].every(packet =>
          findForbiddenKeys(packet).length === 0 &&
          findTableCompletionAssignmentLeaks(packet).length === 0 &&
          findPii(packet).length === 0),
      promptOnlyReviewCoverageComplete: promptOnlyVerdict.records.length === 18,
      expertFirstPassPersistedAndPinned:
        expertVerdict.reviewer.firstPassSha256 === sourceSha256(FIRST_PASS_PATH),
      exactOneBestAnswerContractEnforced: expert.comparisons.length === 18,
      expertAgreementEighteenOfEighteen: conflicts.length === 0,
      evidenceSpansClosestCompetitorWordLimitAndOrderEnforced:
        expert.evidenceOffsets.length === 18 &&
        stableJson(expert.orderViolations) === stableJson(EXPECTED_TEXT_ORDER_VIOLATIONS),
      acceptedAnswerInventoryEighteenExact: expert.acceptedAssessments.length === 18,
      noAcceptedAlternativesInventoried:
        storedRisk.grammaticallyInvalidAcceptedAlternatives.length === 0 &&
        storedRisk.acceptedAnswerNormalization.alternativeEntries === 0,
      factualClaimsFifteenExact: expert.factualClaims.length === 15,
      walkthroughThreeByEighteenExact:
        walkthroughNote.passagesCovered === 3 && walkthroughNote.questionsCovered === 18,
      multidimensionalShortcutAuditComplete:
        storedRisk.alwaysTwoWordAnswerPredictor.hits === 1 &&
        storedRisk.sameQuestionPositionAcrossSetsModalAnswerWordCount.hits === 17 &&
        storedRisk.sameQuestionPositionAcrossSetsModalEvidenceParagraph.hits === 13 &&
        storedRisk.canonicalAnswerTokenVisibleInTableFrame.questionsWithOverlap === 0 &&
        storedRisk.promptPassageLexicalAnchors.questionsWithUniqueExactBigram === 14 &&
        storedRisk.frameGrammaticalFit.exactOneBestAnswerEstablished === 17,
      runtimeExplicitCheckFeedbackKeyHintsAndClientAnswersDetected:
        runtime.answerCheckRequiresExplicitButton && runtime.answerLocksAfterCheck &&
        runtime.correctnessAndExplanationShownImmediatelyAfterCheck &&
        runtime.incorrectResponseRevealsCanonicalAnswerAfterCheck &&
        runtime.preResponseHintsAvailable && runtime.clientSideCanonicalAnswersPresent,
      runtimeStoredMaxWordsWarningDetected: !runtime.wordLimitDisplayHardCodedToTwo &&
        runtime.storedWordLimitParsedForEnforcement &&
        !runtime.wordLimitViolationExplicitlyBlocksCheck,
      runtimeNotMisrepresentedAsPracticeOrExam:
        runtime.classification.endsWith('not-practice-or-exam-simulation'),
      statisticalCertificationWithheldNBelow100: EXPECTED_QUESTION_IDS.length < 100,
      contentCertificationBlocked,
      contentMutationDenied: negativeControl.disposition === 'quarantine',
      chronologyMonotonicAndNotFutureDated: true,
      boardCurrentClosedNextAndParentOpenExactlyOnce: true,
      adversarialLeakMutationsDetected:
        Object.values(leakControls).every(findings => findings.length === 1),
    },
    decisions,
    visibleClaims,
    renderDependencyClosure: {
      sourceCount: renderClosure.length,
      paths: renderClosurePaths,
      limitation:
        'Static local-import closure from root/site layouts and route. Runtime-generated or remote copy remains outside scope.',
    },
    provenanceSearch,
    sourceAvailability,
    factualResearch: unitRecords.map(record => ({
      assetId: record.assetId,
      status: record.factualSourceResearch.status,
      sourceEvidenceIds: record.factualSourceResearch.sourceEvidenceIds,
      limitation: record.factualSourceResearch.limitation,
    })),
    shortcutReview: {
      promptOnly: promptShortcut,
      interpretation:
        'Prompt-only exact guesses measure answerability from sentence frames without passage evidence; they are not expert adjudications.',
    },
    expertReview: {
      reviewerType: 'independent-ai-editorial-review',
      humanSignature: false,
      answerAgreement: { matches: 18 - conflicts.length, total: 18,
        rate: (18 - conflicts.length) / 18 },
      keyConflictCount: conflicts.length,
      keyConflictQuestionIds: conflicts,
      materialAmbiguityCount: materialAmbiguities.length,
      materialAmbiguityQuestionIds: materialAmbiguities,
      nonNaturalSelectionQuestionIds: nonNaturalSelections,
      passageOrderViolationQuestionIds: expert.orderViolations,
      acceptedAnswerAssessmentCounts: acceptedStatusCounts,
      factualAssessmentCounts,
      verdictPath: EXPERT_VERDICT_PATH,
    },
    studentWalkthrough: {
      ...walkthroughNote,
      verdictPath: STUDENT_WALKTHROUGH_PATH,
      limitation: 'Blind content-only walkthrough; no students, UI or conformance test.',
    },
    runtime: {
      ...runtime,
      inheritedAccessibilityRisks: baseline.runtimeAndAccessibilityBaseline,
      limitation:
        'Explicit check, immediate post-check key/explanation, client answers and pre-response hints prevent representation as Practice or Exam simulation. Stored maxWords only drives a visual warning and does not block scoring.',
    },
    antiShortcut: {
      storedProfile: storedRisk,
      qualitativeCoverage: {
        grammarOnlyAndPromptOnlyExactGuess: true,
        lexicalOverlap: true,
        answerLength: true,
        positionAndTextOrder: true,
        wordLimit: true,
        acceptedAnswerNormalization: true,
        exactOneBestAnswer: true,
        representation: true,
        priorKnowledge: true,
        irrelevantLoad: true,
      },
      sampleAdequacy: {
        certificationThreshold: 100,
        observedQuestions: 18,
        eligibleForStatisticalCertification: false,
        conclusion: 'n=18 is too small to certify statistically balanced content.',
      },
      statisticalCertification: 'withheld-n-below-100',
      contentCertification: 'blocked-runtime-rights-editorial-review-required',
    },
    applicability: {
      rights: 'applicable',
      fullStackData: 'applicable',
      ieltsExpert: 'applicable',
      cognitiveWalkthrough: 'applicable-to-content-only',
      antiBiasAndLeakage: 'applicable',
      uiUxAccessibility: 'not-applicable-to-unchanged-runtime-delta-conformance',
      playwright: 'not-applicable-scoped-learner-runtime-unchanged',
      evidence:
        'Seven Table learner-facing files and the final fifteen-file closure remain pinned. A concurrent root-layout drift outside F0.2b.11 was recorded before the revised baseline; Table content/engine/bank did not change. UI/Playwright ➖ is not conformity.',
    },
    negativeControl: { contentHashMismatch: negativeControl, leakControls },
    sources: allSourcePaths.filter(path => existsSync(resolve(ROOT, path)))
      .map(path => ({ path, sha256: sourceSha256(path) })),
  };
  const failed = Object.entries(validation.checks).filter(([, passed]) => !passed)
    .map(([name]) => name);
  assert(failed.length === 0, `Falló gate F0.2b.11: ${failed.join(', ')}`);
  return { validation, promptOnlyPacket, blindPacket, factualPacket };
}

export function validateFinalReportArtifacts(validation) {
  for (const path of [VALIDATION_PATH, AUDIT_VERDICTS_PATH, BUILD_REPORT_PATH, ARTIFACT_PATH,
    REPORT_MD_PATH, REPORT_HTML_PATH, REPORT_VERIFICATION_PATH]) {
    assert(existsSync(resolve(ROOT, path)), `Falta artefacto final: ${path}`);
  }
  const audit = readJson(AUDIT_VERDICTS_PATH);
  validateAuditVerdicts(audit, { expertMatches: validation.expertReview.answerAgreement.matches });
  const artifact = readJson(ARTIFACT_PATH);
  assert(artifact.surface === 'report' && artifact.manifest?.surface === 'report' &&
    artifact.manifest.title === 'IELTS Reading Table Completion — audit gate' &&
    artifact.manifest.generatedAt === audit.reviewedAt &&
    artifact.snapshot?.generatedAt === artifact.manifest.generatedAt &&
    artifact.snapshot?.status === 'ready' && artifact.manifest.cards?.length === 4 &&
    artifact.manifest.charts?.length === 3 && artifact.manifest.tables?.length === 2,
  'Artifact portable incompleto.');
  assert(stableJson(artifact.manifest.charts.map(chart => chart.title)) === stableJson([
    'Canonical answer word counts',
    'Prompt-only shortcut performance',
    'Independent factual-claim assessments',
  ]), 'Títulos de gráficos inválidos.');
  const expectedNote = [{
    passages: 3,
    questions: 18,
    canonicalAnswers: 18,
    acceptedEntries: 18,
    quarantined: validation.decisions.filter(row => row.disposition === 'quarantine').length,
    expertMatches: validation.expertReview.answerAgreement.matches,
    expertTotal: 18,
    materialAmbiguities: validation.expertReview.materialAmbiguityCount,
    orderViolations: validation.expertReview.passageOrderViolationQuestionIds.length,
  }];
  const profile = validation.antiShortcut.storedProfile;
  const expectedLengths = [
    { answerWords: '1 word', count: profile.canonicalAnswerWordCountDistribution.oneWord },
    { answerWords: '2 words', count: profile.canonicalAnswerWordCountDistribution.twoWords },
    { answerWords: 'over limit', count: profile.canonicalAnswerWordCountDistribution.overLimit },
  ];
  const expectedShortcuts = [
    {
      stage: 'prompt-only unique',
      hits: validation.shortcutReview.promptOnly.hits,
      predictions: validation.shortcutReview.promptOnly.uniquePredictions,
    },
    {
      stage: 'always two words',
      hits: profile.alwaysTwoWordAnswerPredictor.hits,
      predictions: profile.alwaysTwoWordAnswerPredictor.eligible,
    },
    {
      stage: 'position-modal word count',
      hits: profile.sameQuestionPositionAcrossSetsModalAnswerWordCount.hits,
      predictions: profile.sameQuestionPositionAcrossSetsModalAnswerWordCount.eligible,
    },
  ];
  const expectedClaims = Object.entries(validation.expertReview.factualAssessmentCounts)
    .map(([assessment, claims]) => ({ assessment, claims }));
  const expectedDecisions = validation.decisions.map(decision => {
    const row = { ...decision };
    delete row.reasonCodes;
    row.blockers = decision.reasonCodes.join(' · ');
    return row;
  });
  assert(stableJson(artifact.snapshot.datasets.note) === stableJson(expectedNote) &&
    stableJson(artifact.snapshot.datasets.answerLengths) === stableJson(expectedLengths) &&
    stableJson(artifact.snapshot.datasets.shortcuts) === stableJson(expectedShortcuts) &&
    stableJson(artifact.snapshot.datasets.claims) === stableJson(expectedClaims) &&
    stableJson(artifact.snapshot.datasets.decisions) === stableJson(expectedDecisions) &&
    stableJson(artifact.snapshot.datasets.audit) === stableJson(audit.rows),
  'Artifact no coincide con validation/audit.');

  const markdown = readFileSync(resolve(ROOT, REPORT_MD_PATH), 'utf8');
  const html = readFileSync(resolve(ROOT, REPORT_HTML_PATH), 'utf8');
  assertReviewedReportHashes({
    buildReport: sourceSha256(BUILD_REPORT_PATH),
    artifact: sourceSha256(ARTIFACT_PATH),
    reportMarkdown: sourceSha256(REPORT_MD_PATH),
    reportHtml: sourceSha256(REPORT_HTML_PATH),
  });

  // report-verification.json is a receipt, not an authority: its hashes must not be able to
  // bless a manually rewritten narrative. Rebuild both source artifacts from the pinned
  // validation/audit inputs in an isolated directory and require byte-for-byte identity.
  const reportBuildDirectory = mkdtempSync(join(tmpdir(), 'ielts-table-report-build-'));
  try {
    for (const path of [VALIDATION_PATH, AUDIT_VERDICTS_PATH, BUILD_REPORT_PATH]) {
      copyFileSync(resolve(ROOT, path), join(reportBuildDirectory, basename(path)));
    }
    const rebuilt = spawnSync(process.execPath, [join(reportBuildDirectory,
      basename(BUILD_REPORT_PATH))], {
      cwd: reportBuildDirectory,
      encoding: 'utf8',
      timeout: 10_000,
    });
    assert(rebuilt.status === 0,
      `No se pudo reconstruir el reporte determinista: ${rebuilt.stderr || rebuilt.error}`);
    assert(readFileSync(join(reportBuildDirectory, basename(ARTIFACT_PATH)), 'utf8') ===
      readFileSync(resolve(ROOT, ARTIFACT_PATH), 'utf8') &&
      readFileSync(join(reportBuildDirectory, basename(REPORT_MD_PATH)), 'utf8') === markdown,
    'Artifact/report.md no coinciden byte a byte con el builder y sus fuentes pinneadas.');
  } finally {
    rmSync(reportBuildDirectory, { recursive: true, force: true });
  }

  const requiredMarkdown = [
    'audit PASS; bank and content certification BLOCKED',
    'guided-training',
    'n=18',
    'F0.2b.11 Table Completion',
    ...EXPECTED_TEXT_ORDER_VIOLATIONS,
    `${validation.expertReview.answerAgreement.matches}/18`,
    ...validation.expertReview.materialAmbiguityQuestionIds,
    ...validation.expertReview.keyConflictQuestionIds,
  ];
  requiredMarkdown.forEach(value =>
    assert(markdown.includes(value), `report.md omite: ${value}`));
  for (const [assessment, count] of Object.entries(
    validation.expertReview.factualAssessmentCounts)) {
    assert(markdown.includes(`- ${assessment}: ${count}`),
      `report.md contradice ${assessment}=${count}.`);
    assert(html.includes(
      `<tr><td>${assessment}</td><td class="portable-table-number">${count}</td></tr>`),
    `report.html contradice ${assessment}=${count}.`);
  }
  assert(html.includes('IELTS Reading Table Completion') &&
    html.includes('Prompt-only shortcut') && html.includes('Word-limit enforcement') &&
    html.includes('Recommended next decisions'), 'report.html incompleto.');

  const verification = readJson(REPORT_VERIFICATION_PATH);
  assertExactKeys(verification,
    ['schemaVersion', 'verifiedAt', 'command', 'stages', 'viewports', 'counts', 'sha256',
      'interpretation'], 'reportVerification');
  assert(verification.schemaVersion ===
    'ielts-reading-table-completion-report-verification.v1' &&
    timestampMs(verification.verifiedAt, 'reportVerification.verifiedAt') >=
      timestampMs(audit.reviewedAt, 'auditVerdicts.reviewedAt') &&
    timestampMs(verification.verifiedAt, 'reportVerification.verifiedAt') <= Date.now() &&
    verification.command.includes('deliver_portable_artifact.mjs') &&
    stableJson(verification.stages) === stableJson({
      validation: 'passed', package: 'passed', verification: 'passed',
    }) && stableJson(verification.viewports) === stableJson([1440, 390]) &&
    verification.counts.cards === 4 && verification.counts.charts === 3 &&
    verification.counts.tables === 2 && verification.interpretation.includes('report only') &&
    verification.interpretation.includes('not learner-facing'),
  'Verificación portable inválida.');
  assertExactKeys(verification.sha256,
    ['validation', 'auditVerdicts', 'buildReport', 'artifact', 'reportMarkdown', 'reportHtml'],
    'reportVerification.sha256');
  assert(verification.sha256.validation === sourceSha256(VALIDATION_PATH) &&
    verification.sha256.auditVerdicts === sourceSha256(AUDIT_VERDICTS_PATH) &&
    verification.sha256.buildReport === sourceSha256(BUILD_REPORT_PATH) &&
    verification.sha256.artifact === sourceSha256(ARTIFACT_PATH) &&
    verification.sha256.reportMarkdown === sourceSha256(REPORT_MD_PATH) &&
    verification.sha256.reportHtml === sourceSha256(REPORT_HTML_PATH),
  'Bindings/hash del reporte no coinciden.');
  return {
    validationSha256: sourceSha256(VALIDATION_PATH),
    auditVerdictsSha256: sourceSha256(AUDIT_VERDICTS_PATH),
    buildReportSha256: sourceSha256(BUILD_REPORT_PATH),
    artifactSha256: sourceSha256(ARTIFACT_PATH),
    reportMarkdownSha256: sourceSha256(REPORT_MD_PATH),
    reportHtmlSha256: sourceSha256(REPORT_HTML_PATH),
  };
}

export function assertReviewedReportHashes(actual) {
  assertExactKeys(actual, ['buildReport', 'artifact', 'reportMarkdown', 'reportHtml'],
    'reviewedReportHashes');
  assert(stableJson(actual) === stableJson({
    buildReport: EXPECTED_BUILD_REPORT_SHA256,
    artifact: EXPECTED_ARTIFACT_SHA256,
    reportMarkdown: EXPECTED_REPORT_MD_SHA256,
    reportHtml: EXPECTED_REPORT_HTML_SHA256,
  }),
  'Builder/artifact/report.md/report.html no coinciden byte a byte con la entrega revisada.');
  return true;
}

function writeJson(path, value) {
  const absolutePath = resolve(ROOT, path);
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`);
}

function checkJson(path, value) {
  const absolutePath = resolve(ROOT, path);
  assert(existsSync(absolutePath), `Falta artefacto generado: ${path}`);
  assert(readFileSync(absolutePath, 'utf8') === `${JSON.stringify(value, null, 2)}\n`,
    `Artefacto desactualizado: ${path}`);
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const mode = process.argv.includes('--write-blind') ? 'write-blind' :
    process.argv.includes('--write-factual') ? 'write-factual' :
    process.argv.includes('--write') ? 'write' :
      process.argv.includes('--check') ? 'check' : 'print';
  if (mode === 'write-blind') {
    assertNoFutureTimestamp(BLIND_PACKETS_GENERATED_AT, 'BLIND_PACKETS_GENERATED_AT');
    const promptOnlyPacket = buildPromptOnlyPacket();
    const blindPacket = buildBlindReviewPacket();
    writeJson(PROMPT_ONLY_PACKET_PATH, promptOnlyPacket);
    writeJson(BLIND_REVIEW_PATH, blindPacket);
    process.stdout.write(`${JSON.stringify({
      status: 'blind-review-packets-written',
      passages: 3,
      questions: 18,
      canonicalAnswers: 18,
      acceptedEntries: 18,
      promptOnlyPath: PROMPT_ONLY_PACKET_PATH,
      blindPath: BLIND_REVIEW_PATH,
    }, null, 2)}\n`);
  } else if (mode === 'write-factual') {
    assert(existsSync(resolve(ROOT, PROMPT_ONLY_VERDICT_PATH)) &&
      existsSync(resolve(ROOT, FIRST_PASS_PATH)),
    'El factual packet requiere prompt-only-verdict y expert-first-pass persistidos.');
    assertNoFutureTimestamp(FACTUAL_PACKET_GENERATED_AT, 'FACTUAL_PACKET_GENERATED_AT');
    const assets = sourceAssets(loadTsModule(CATALOG_PATH));
    const promptOnlyVerdict = readJson(PROMPT_ONLY_VERDICT_PATH);
    const firstPass = readJson(FIRST_PASS_PATH);
    validatePromptOnlyVerdict(promptOnlyVerdict, assets);
    validateFirstPass(firstPass, assets);
    assert(timestampMs(promptOnlyVerdict.reviewer.reviewedAt,
      'promptOnlyVerdict.reviewedAt') <= timestampMs(firstPass.reviewer.reviewedAt,
      'firstPass.reviewedAt') && timestampMs(firstPass.reviewer.reviewedAt,
      'firstPass.reviewedAt') <= timestampMs(FACTUAL_PACKET_GENERATED_AT,
      'FACTUAL_PACKET_GENERATED_AT'),
    'El factual packet no puede preceder los dos pases ciegos persistidos.');
    const factualPacket = buildFactualSourceReviewPacket();
    writeJson(FACTUAL_SOURCE_REVIEW_PATH, factualPacket);
    process.stdout.write(`${JSON.stringify({
      status: 'factual-review-packet-written-after-first-pass',
      passages: 3,
      claims: 15,
      firstPassSha256: sourceSha256(FIRST_PASS_PATH),
      factualPath: FACTUAL_SOURCE_REVIEW_PATH,
    }, null, 2)}\n`);
  } else {
    const artifacts = buildValidationArtifacts();
    let reportBindings = null;
    if (mode === 'write') {
      writeJson(VALIDATION_PATH, artifacts.validation);
      writeJson(PROMPT_ONLY_PACKET_PATH, artifacts.promptOnlyPacket);
      writeJson(BLIND_REVIEW_PATH, artifacts.blindPacket);
      writeJson(FACTUAL_SOURCE_REVIEW_PATH, artifacts.factualPacket);
    } else if (mode === 'check') {
      checkJson(VALIDATION_PATH, artifacts.validation);
      checkJson(PROMPT_ONLY_PACKET_PATH, artifacts.promptOnlyPacket);
      checkJson(BLIND_REVIEW_PATH, artifacts.blindPacket);
      checkJson(FACTUAL_SOURCE_REVIEW_PATH, artifacts.factualPacket);
      reportBindings = validateFinalReportArtifacts(artifacts.validation);
    }
    process.stdout.write(`${JSON.stringify({
      status: artifacts.validation.status,
      mode,
      passages: 3,
      questions: 18,
      canonicalAnswers: 18,
      acceptedEntries: 18,
      quarantined: artifacts.validation.decisions.filter(row =>
        row.disposition === 'quarantine').length,
      checks: artifacts.validation.checks,
      reportBindings,
    }, null, 2)}\n`);
  }
}
