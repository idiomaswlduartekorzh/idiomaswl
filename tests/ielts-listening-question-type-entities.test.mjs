import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  IELTS_LISTENING_OFFICIAL_FORMAT_URL,
  IELTS_LISTENING_OFFICIAL_MAP_GUIDE_URL,
  IELTS_LISTENING_PART_1_COMPLETION_HREF,
  IELTS_LISTENING_QUESTION_TYPE_ENTITIES,
  validateIeltsListeningQuestionTypeEntities,
} from '../src/data/ielts/listening-question-type-entities.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hubPath = path.join(root, 'src/app/(site)/practica/ielts/listening/page.tsx');
const partOnePath = path.join(
  root,
  'src/app/(site)/practica/ielts/listening/part-1/page.tsx',
);
const sitemapPath = path.join(root, 'src/app/sitemap.ts');

const EXPECTED_IDS = [
  'multiple-choice',
  'matching',
  'plan-map-diagram-labelling',
  'form-note-table-flow-chart-summary-completion',
  'sentence-completion',
  'short-answer-questions',
];

const EXPECTED_NAMES = [
  'Multiple choice',
  'Matching',
  'Plan, map or diagram labelling',
  'Form, note, table, flow-chart or summary completion',
  'Sentence completion',
  'Short-answer questions',
];

function cloneEntities() {
  return structuredClone(IELTS_LISTENING_QUESTION_TYPE_ENTITIES);
}

function assertMutationRejected(name, mutate, expectedMessage) {
  const entities = cloneEntities();
  mutate(entities);
  assert.throws(
    () => validateIeltsListeningQuestionTypeEntities(entities),
    expectedMessage,
    name,
  );
}

function normalizedWords(value) {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('en')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function wordWindows(value, size) {
  const words = normalizedWords(value);
  return words.length < size
    ? []
    : Array.from({ length: words.length - size + 1 }, (_, index) =>
      words.slice(index, index + size).join(' '));
}

function privateCandidateSourceText() {
  return fs.readdirSync(path.join(root, 'src/data/ielts'))
    .filter((fileName) => /^listening-part[2-4]-.*\.server\.ts$/.test(fileName))
    .map((fileName) => fs.readFileSync(path.join(root, 'src/data/ielts', fileName), 'utf8'))
    .join('\n');
}

function entityPublicProse(entity) {
  return [
    ...entity.aliases,
    entity.directDefinition,
    entity.answerShape,
    ...entity.instructionSignals,
    entity.firstDecision,
    entity.commonTrap,
    ...Object.values(entity.workedExample),
  ].join(' ');
}

function privateCandidateOverlaps(entities, size = 8) {
  const privateWindows = new Set(wordWindows(privateCandidateSourceText(), size));
  return entities.flatMap((entity) =>
    wordWindows(entityPublicProse(entity), size)
      .filter((phrase) => privateWindows.has(phrase))
      .map((phrase) => `${entity.id}: ${phrase}`));
}

test('the entity layer exposes the six official families with original, source-bound examples', () => {
  assert.equal(
    validateIeltsListeningQuestionTypeEntities(cloneEntities()).length,
    6,
  );
  assert.deepEqual(
    IELTS_LISTENING_QUESTION_TYPE_ENTITIES.map((entity) => entity.id),
    EXPECTED_IDS,
  );
  assert.deepEqual(
    IELTS_LISTENING_QUESTION_TYPE_ENTITIES.map((entity) => entity.officialName),
    EXPECTED_NAMES,
  );
  assert.deepEqual(
    IELTS_LISTENING_QUESTION_TYPE_ENTITIES.map((entity) => entity.officialOrder),
    [1, 2, 3, 4, 5, 6],
  );

  const evidence = new Set();
  for (const entity of IELTS_LISTENING_QUESTION_TYPE_ENTITIES) {
    assert.ok(entity.aliases.length >= 2);
    assert.ok(entity.directDefinition.length >= 80);
    assert.ok(entity.instructionSignals.length >= 2);
    assert.equal(entity.workedExample.ownership, 'welearn-original');
    assert.ok(entity.workedExample.spokenEvidence.length >= 50);
    assert.equal(evidence.has(entity.workedExample.spokenEvidence), false);
    evidence.add(entity.workedExample.spokenEvidence);

    assert.ok(entity.sourceUrls.includes(IELTS_LISTENING_OFFICIAL_FORMAT_URL));
    for (const sourceUrl of entity.sourceUrls) {
      const url = new URL(sourceUrl);
      assert.equal(url.protocol, 'https:');
      assert.equal(url.hostname, 'ielts.org');
      assert.ok(
        [IELTS_LISTENING_OFFICIAL_FORMAT_URL, IELTS_LISTENING_OFFICIAL_MAP_GUIDE_URL]
          .includes(sourceUrl),
      );
    }

    const prose = [
      entity.directDefinition,
      entity.answerShape,
      entity.firstDecision,
      entity.commonTrap,
      entity.workedExample.context,
      entity.workedExample.prompt,
      entity.workedExample.spokenEvidence,
      entity.workedExample.rationale,
    ].join(' ');
    assert.doesNotMatch(
      prose,
      /In this type of question, you have to|What skills are tested\?|How many questions are there\?|You will lose the mark/i,
    );
    assert.doesNotMatch(
      prose,
      /Cambridge IELTS|official sample|welearn-listening-part-2|\/part-2/i,
    );
  }

  const linkedEntities = IELTS_LISTENING_QUESTION_TYPE_ENTITIES.filter(
    (entity) => entity.availablePracticeHref,
  );
  assert.deepEqual(
    linkedEntities.map((entity) => [entity.id, entity.availablePracticeHref]),
    [[
      'form-note-table-flow-chart-summary-completion',
      IELTS_LISTENING_PART_1_COMPLETION_HREF,
    ]],
  );

  assert.equal(Object.isFrozen(IELTS_LISTENING_QUESTION_TYPE_ENTITIES), true);
  for (const entity of IELTS_LISTENING_QUESTION_TYPE_ENTITIES) {
    assert.equal(Object.isFrozen(entity), true);
    assert.equal(Object.isFrozen(entity.aliases), true);
    assert.equal(Object.isFrozen(entity.workedExample), true);
    assert.equal(Object.isFrozen(entity.sourceUrls), true);
  }
  assert.throws(
    () => IELTS_LISTENING_QUESTION_TYPE_ENTITIES[0].sourceUrls[0] = 'javascript:alert(1)',
    TypeError,
  );

  assert.deepEqual(privateCandidateOverlaps(IELTS_LISTENING_QUESTION_TYPE_ENTITIES), []);
});

test('the validator fails closed under structural, source, publication and originality mutations', () => {
  assertMutationRejected(
    'missing family',
    (entities) => entities.pop(),
    /expected exactly 6 official families/,
  );
  assertMutationRejected(
    'reordered family',
    (entities) => {
      [entities[0], entities[1]] = [entities[1], entities[0]];
    },
    /expected multiple-choice/,
  );
  assertMutationRejected(
    'duplicate alias across families',
    (entities) => {
      entities[1].aliases[0] = entities[0].aliases[0];
    },
    /duplicate alias/,
  );
  assertMutationRejected(
    'unapproved source URL',
    (entities) => {
      entities[0].sourceUrls.push('https://example.com/listening-types');
    },
    /canonical source list/,
  );
  assertMutationRejected(
    'map guide on a non-map family',
    (entities) => {
      entities[0].sourceUrls.push(IELTS_LISTENING_OFFICIAL_MAP_GUIDE_URL);
    },
    /canonical source list/,
  );
  assertMutationRejected(
    'reordered map sources',
    (entities) => {
      entities[2].sourceUrls.reverse();
    },
    /canonical source list/,
  );
  assertMutationRejected(
    'practice link on an unavailable family',
    (entities) => {
      entities[0].availablePracticeHref = IELTS_LISTENING_PART_1_COMPLETION_HREF;
    },
    /practice is not publicly available for this family/,
  );
  assertMutationRejected(
    'missing completion practice link',
    (entities) => {
      delete entities[3].availablePracticeHref;
    },
    /must equal \/practica\/ielts\/listening\/part-1/,
  );
  assertMutationRejected(
    'candidate-only reference',
    (entities) => {
      entities[2].workedExample.rationale +=
        ' See docs/ielts-superhub/candidates for the private asset.';
    },
    /private or candidate-only reference/,
  );
  assertMutationRejected(
    'future candidate-only reference',
    (entities) => {
      entities[1].workedExample.rationale += ' See welearn-listening-part-3-001.';
    },
    /private or candidate-only reference/,
  );
  assertMutationRejected(
    'human-readable private candidate reference',
    (entities) => {
      entities[1].workedExample.rationale += ' The private Part 4 candidate remains hidden.';
    },
    /private or candidate-only reference/,
  );
  assertMutationRejected(
    'unqualified future-part source reference',
    (entities) => {
      entities[1].workedExample.rationale +=
        ' This answer was taken from Part 3 and must not be public.';
    },
    /private or candidate-only reference/,
  );
  assertMutationRejected(
    'unreleased exercise reference without candidate label',
    (entities) => {
      entities[1].workedExample.rationale +=
        ' The unreleased Part 4 exercise remains hidden from learners.';
    },
    /private or candidate-only reference/,
  );
  assertMutationRejected(
    'inherited worked-example fields',
    (entities) => {
      entities[2].workedExample = Object.create(entities[2].workedExample);
    },
    /plain object with no inherited content/,
  );
  assertMutationRejected(
    'worked-example accessor',
    (entities) => {
      const workedExample = { ...entities[2].workedExample };
      Object.defineProperty(workedExample, 'rationale', {
        enumerable: true,
        get: () => entities[2].workedExample.rationale,
      });
      entities[2].workedExample = workedExample;
    },
    /accessor properties are not allowed/,
  );
  assertMutationRejected(
    'array accessor',
    (entities) => {
      Object.defineProperty(entities[4].aliases, '0', {
        enumerable: true,
        get: () => 'IELTS Listening sentence completion',
      });
    },
    /accessor array values are not allowed/,
  );
  assertMutationRejected(
    'array with inherited content',
    (entities) => {
      Object.setPrototypeOf(entities[4].aliases, Object.create(Array.prototype, {
        privateCandidate: {
          enumerable: true,
          value: 'welearn-listening-part-3-001',
        },
      }));
    },
    /native array with no inherited content/,
  );
  assertMutationRejected(
    'empty worked example',
    (entities) => {
      entities[4].workedExample.prompt = '';
    },
    /expected trimmed text with at least 30 characters/,
  );
  assertMutationRejected(
    'unsupported field',
    (entities) => {
      entities[5].futureRoute = '/practica/ielts/listening/short-answer';
    },
    /unsupported field/,
  );

  const copiedPrivateProse = cloneEntities();
  copiedPrivateProse[0].directDefinition =
    'Good morning, everyone, and welcome to the Larkspur Repair House. My name is Amira Cole, and I coordinate our Saturday Fix and Share Day.';
  assert.equal(validateIeltsListeningQuestionTypeEntities(copiedPrivateProse).length, 6);
  assert.ok(privateCandidateOverlaps(copiedPrivateProse).length > 0);
});

test('the Listening hub renders the entity source as SSR deep-link targets', () => {
  const hub = fs.readFileSync(hubPath, 'utf8');

  assert.match(
    hub,
    /import\s*\{[^}]*IELTS_LISTENING_QUESTION_TYPE_ENTITIES[^}]*\}\s*from\s*['"]@\/data\/ielts\/listening-question-type-entities['"]/s,
  );
  assert.doesNotMatch(hub, /const QUESTION_TYPES\s*=/);
  assert.match(
    hub,
    /IELTS_LISTENING_QUESTION_TYPE_ENTITIES\.map\(\(questionType\)\s*=>/,
  );
  assert.match(hub, /href=\{`#\$\{questionType\.id\}`\}/);
  assert.match(hub, /id=\{questionType\.id\}/);
  assert.match(hub, /Which question types appear in IELTS Listening\?/);
  assert.match(hub, /Why some guides count 9 or 10 types/);
  assert.match(
    hub,
    /<summary>Open an original \{questionType\.officialName\} worked example<\/summary>/,
  );
  assert.match(hub, /\$\{sourceLabel\} for \$\{questionType\.officialName\} \(opens in a new tab\)/);
  assert.match(hub, /Practise form and table completion in Part 1/);
});

test('Part 1 closes the loop back to the completion entity', () => {
  const partOne = fs.readFileSync(partOnePath, 'utf8');
  assert.match(
    partOne,
    /\/practica\/ielts\/listening#form-note-table-flow-chart-summary-completion/,
  );
});

test('the entity increment does not create a competing canonical or unsupported schema', () => {
  const hub = fs.readFileSync(hubPath, 'utf8');
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');

  assert.equal(
    fs.existsSync(
      path.join(root, 'src/app/(site)/practica/ielts/listening/question-types/page.tsx'),
    ),
    false,
  );
  assert.equal(
    fs.existsSync(
      path.join(root, 'src/app/(site)/practica/ielts/listening/tipos-de-preguntas/page.tsx'),
    ),
    false,
  );
  assert.doesNotMatch(
    sitemap,
    /\/practica\/ielts\/listening\/(?:question-types|tipos-de-preguntas)/,
  );
  assert.match(hub, /IELTS Listening Practice with Audio: Part 1 \+ Format Guide/);
  assert.match(hub, /<h1>IELTS Listening Practice by Part<\/h1>/);
  assert.doesNotMatch(hub, /['"]@type['"]:\s*['"](?:FAQPage|PracticeProblem|DefinedTermSet)['"]/);
});
