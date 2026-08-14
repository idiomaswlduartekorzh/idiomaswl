import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const task1Root = join(root, 'src/app/(site)/practica/ielts/academic/writing/task1');
const courseMapSource = readFileSync(join(task1Root, 'Task1CourseLayout.tsx'), 'utf8');
const writingHubSource = readFileSync(join(task1Root, '..', 'Content.tsx'), 'utf8');
const hubSource = [
  readFileSync(join(task1Root, 'Content.tsx'), 'utf8'),
  readFileSync(join(task1Root, 'Task1ChartTypeGuide.tsx'), 'utf8'),
].join('\n');

const routes = [
  'introduccion',
  'overview',
  'body-1',
  'body-2',
  'graficos-lineales',
  'graficos-de-barras',
  'pie-charts',
  'tablas',
  'procesos',
  'mapas',
  'tendencias',
  'comparaciones',
  'vocabulario',
  'tarea-completa',
];

test('Task 1 exposes one shared course map with all 14 canonical lesson routes', () => {
  for (const slug of routes) {
    const path = `/practica/ielts/academic/writing/task1/${slug}`;
    assert.equal(courseMapSource.includes(path), true, `course map is missing ${path}`);
    assert.equal(hubSource.includes(path), true, `Task 1 hub is missing ${path}`);
    assert.equal(existsSync(join(task1Root, slug, 'page.tsx')), true, `page.tsx is missing for ${slug}`);
  }

  const declaredCourseHrefs = [...courseMapSource.matchAll(/href:\s*'\/practica\/ielts\/academic\/writing\/task1\/[^']+'/g)];
  assert.equal(declaredCourseHrefs.length, routes.length);
  assert.match(courseMapSource, /aria-current=\{isActive \? 'page' : undefined\}/);
  assert.match(courseMapSource, /aria-label="Task 1 lesson sequence"/);
});

test('every indexable Task 1 lesson declares its own canonical URL', () => {
  for (const slug of routes) {
    const source = readFileSync(join(task1Root, slug, 'page.tsx'), 'utf8');
    assert.match(source, /alternates:\s*\{\s*canonical:/, `${slug} has no canonical metadata`);
    assert.equal(source.includes(`/practica/ielts/academic/writing/task1/${slug}`), true, `${slug} canonical does not point to its route`);
  }
});

test('the timed session remains excluded from indexing while its practice bank stays indexable', () => {
  const session = readFileSync(join(task1Root, 'tarea-completa/sesion/page.tsx'), 'utf8');
  const bank = readFileSync(join(task1Root, 'tarea-completa/page.tsx'), 'utf8');
  assert.match(session, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
  assert.match(bank, /alternates:\s*\{\s*canonical:/);
});

test('the Writing hub keeps Task 1 and Task 2 as the aligned primary routes', () => {
  assert.match(writingHubSource, /className=\{styles\.primaryGrid\}/);
  assert.match(writingHubSource, /PRIMARY_TASKS\.map/);
  assert.match(writingHubSource, /className=\{styles\.rubricCard\}/);
  assert.doesNotMatch(writingHubSource, /wl-exams-catalog/);
  assert.doesNotMatch(writingHubSource, /150\+ palabras|250\+ palabras/);
});

test('every promoted data-visual lesson uses the shared Task 1 visual desk', () => {
  for (const slug of ['graficos-lineales', 'graficos-de-barras', 'pie-charts', 'tablas']) {
    const source = readFileSync(join(task1Root, slug, 'Content.tsx'), 'utf8');
    assert.match(source, /import Task1VisualPanel from '\.\.\/Task1VisualPanel'/, `${slug} is missing the shared visual panel`);
    assert.match(source, /<Task1VisualPanel/, `${slug} still exposes its visual through a legacy generic card`);
  }
});
