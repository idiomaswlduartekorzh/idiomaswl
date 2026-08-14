import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('IELTS root, Task 1 and Reading Question Types use the shared product shell', () => {
  const rootHub = read('src/app/(site)/practica/ielts/IELTSHubClient.tsx');
  const task1 = read('src/app/(site)/practica/ielts/academic/writing/task1/Content.tsx');
  const questionTypes = read('src/app/(site)/practica/ielts/reading/tipos-de-preguntas/page.tsx');

  assert.match(rootHub, /IeltsHub\.module\.css/);
  assert.match(task1, /Task1Hub\.module\.css/);
  assert.match(questionTypes, /page\.module\.css/);
  for (const source of [rootHub, task1, questionTypes]) {
    assert.match(source, /styles\.hero/);
    assert.match(source, /styles\.section/);
    assert.doesNotMatch(source, /style=\{\{/);
  }
});

test('renewed IELTS hubs are explicitly canonical and indexable', () => {
  const ieltsPage = read('src/app/(site)/practica/ielts/page.tsx');
  const task1Page = read('src/app/(site)/practica/ielts/academic/writing/task1/page.tsx');
  const questionTypesPage = read('src/app/(site)/practica/ielts/reading/tipos-de-preguntas/page.tsx');
  const sitemap = read('src/app/sitemap.ts');
  const robots = read('src/app/robots.ts');

  for (const source of [ieltsPage, task1Page, questionTypesPage]) {
    assert.match(source, /alternates:\s*\{\s*canonical:/);
  }
  for (const route of [
    '/practica/ielts`',
    '/practica/ielts/academic/writing/task1`',
    '/practica/ielts/reading/tipos-de-preguntas`',
  ]) assert.match(sitemap, new RegExp(route));
  assert.match(robots, /userAgent:\s*'\*',\s*allow:\s*'\/'/);
  assert.match(robots, /sitemap:\s*'https:\/\/www\.idiomaswl\.com\/sitemap\.xml'/);
});

test('Reading Progress Engines expose evidence before answer controls', () => {
  const tfng = read('src/components/exam-practice/TfngPracticeLab.tsx');
  const multipleChoice = read('src/components/exam-practice/MultipleChoicePracticeLab.tsx');
  const workspace = read('src/components/exam-practice/ReadingEvidenceWorkspace.tsx');

  for (const source of [tfng, multipleChoice]) {
    assert.match(source, /ReadingEvidenceWorkspace/);
    assert.match(source, /passages=\{questions\.map/);
    assert.match(source, /Compact passage · feedback closed/);
  }
  assert.match(workspace, /Read the passage before deciding/);
  assert.match(workspace, /outside the passage does not count/);
});

test('shared question grid pins actions and comparison rules to the main column', () => {
  const styles = read('src/components/exam-practice/MatchingHeadingsPracticeLab.module.css');
  assert.match(styles, /\.engineQuestion > button/);
  assert.match(styles, /\.engineQuestion > \.sourceNote/);
  assert.match(styles, /grid-column: 2 \/ -1/);
  assert.match(styles, /width: min\(100%, 76ch\)/);
});

test('Reading lessons disclose compact practice scope', () => {
  const lesson = read('src/components/exam-practice/InternationalReadingSkillLesson.tsx');
  assert.match(lesson, /Practice scope/);
  assert.match(lesson, /deliberately compact training passages/);
  assert.match(lesson, /not full-length IELTS Academic Reading passages/);
});

test('the IELTS UI blueprint preserves the evidence and responsive contracts', () => {
  const blueprint = read('docs/ielts-product-ui-blueprint.md');
  assert.match(blueprint, /Evidence before decision/);
  assert.match(blueprint, /Compact training passages must be labelled as compact/);
  assert.match(blueprint, /320px/);
  assert.match(blueprint, /Progress Engine score is practice performance/);
});
