import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const absolute = path.join(directory, entry);
    return statSync(absolute).isDirectory() ? walk(absolute) : [absolute];
  });
}

test('downloadable PDF and ZIP materials are absent from the public tree', () => {
  const publicFiles = walk('public/downloads');
  assert.deepEqual(
    publicFiles.filter((file) => /\.(?:pdf|zip)$/iu.test(file)),
    [],
  );
  const privateFiles = walk('private/site-materials');
  assert.ok(privateFiles.filter((file) => /\.pdf$/iu.test(file)).length >= 160);
  assert.ok(privateFiles.filter((file) => /\.zip$/iu.test(file)).length >= 4);
});

test('the general material endpoint authenticates and requires paid or WeLearn access', () => {
  const route = readFileSync('src/app/api/site-materials/[...path]/route.ts', 'utf8');
  const accessRoute = readFileSync('src/app/api/material-access/route.ts', 'utf8');
  const resolver = readFileSync('src/lib/xpress-commerce/access.server.ts', 'utf8');

  assert.match(route, /xpressUser\(\)/);
  assert.match(route, /hasMaterialDownloadAccess\(user\.id\)/);
  assert.match(route, /X-Robots-Tag.*noindex, nofollow, noarchive/s);
  assert.match(route, /Cache-Control.*private, no-store/s);
  assert.match(route, /absolutePath\.startsWith/);
  assert.match(resolver, /from\('xpress_memberships'\)/);
  assert.match(resolver, /from\('exam_access_grants'\)/);
  assert.match(resolver, /eq\('source', 'welearn'\)/);
  assert.doesNotMatch(resolver.slice(resolver.indexOf('export async function hasMaterialDownloadAccess')), /autodidacta-free/);
  assert.match(accessRoute, /hasMaterialDownloadAccess\(user\.id\)/);
  assert.match(accessRoute, /status: allowed \? 200 : 403/);
});

test('client-generated PDFs also verify material access before generation', () => {
  const button = readFileSync('src/components/practica/PdfDownloadButton.tsx', 'utf8');
  assert.ok(button.indexOf("fetch('/api/material-access'") < button.indexOf('await generate()'));
  assert.match(button, /access\.status === 401/);
  assert.match(button, /access\.status === 403/);
});

test('resource links use the protected endpoint', () => {
  const sources = [
    'src/data/english-grammar-preview.ts',
    'src/data/korean-grammar-preview.ts',
    'src/data/japanese-scripts-a1.ts',
    'src/components/grammar/JapaneseGrammarLesson.tsx',
    'src/data/practica/recursos/english-reference-resources.ts',
    'src/lib/welearn-pdf-standards.ts',
  ].map((file) => readFileSync(file, 'utf8')).join('\n');

  assert.match(sources, /\/api\/site-materials\//);
  assert.doesNotMatch(sources, /\/downloads\/[^'"`\s]+\.(?:pdf|zip)/iu);
});
