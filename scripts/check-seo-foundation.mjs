#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (relativePath) => fs.readFileSync(path.join(ROOT, relativePath), 'utf8');

const errors = [];
const warnings = [];
const requireMatch = (source, pattern, message) => {
  if (!pattern.test(source)) errors.push(message);
};

const sitemap = read('src/app/sitemap.ts');
const robots = read('src/app/robots.ts');
const rootPage = read('src/app/(site)/page.tsx');
const legacyHome = read('src/app/(site)/home/page.tsx');

requireMatch(sitemap, /const BASE = 'https:\/\/www\.idiomaswl\.com'/, 'sitemap.ts perdió el host canónico con www.');
requireMatch(robots, /sitemap:\s*'https:\/\/www\.idiomaswl\.com\/sitemap\.xml'/, 'robots.ts dejó de anunciar el sitemap canónico.');
requireMatch(robots, /userAgent:\s*'\*',\s*allow:\s*'\/'/, 'robots.ts dejó de permitir el rastreo público.');
requireMatch(rootPage, /export default HomePage/, 'La home pública dejó de vivir en la raíz /.');
requireMatch(legacyHome, /permanentRedirect\('\/'\)/, '/home dejó de consolidar autoridad con redirección permanente a /.');

if (/\$\{BASE\}\/home(?:['"`/}]|$)/.test(sitemap) || /https:\/\/www\.idiomaswl\.com\/home/.test(sitemap)) {
  errors.push('El sitemap volvió a publicar /home aunque la URL canónica es /.');
}

const DERIVED_SITEMAP_MARKERS = [
  ['grammarRegistry', 'gramática'],
  ['publishedReadingExercises', 'lecturas publicadas'],
  ['getVocabLevels', 'vocabulario aprobado'],
  ['getHistorias', 'historias publicadas'],
  ['GUIDED_MOCK_IDS', 'mocks guiados ICFES'],
  ['GUIDED_WORKBOOK_IDS', 'cuadernillos guiados ICFES'],
  ["SIMULACROS.filter((exam) => exam.assessment === 'saber-11')", 'límite Saber 11'],
  ['SAT_GUIDE_SLUGS', 'guías SAT'],
  ['PUBLISHED_EXAM_PRACTICE_ROUTES', 'rutas de práctica de exámenes publicadas'],
];

for (const [marker, label] of DERIVED_SITEMAP_MARKERS) {
  if (!sitemap.includes(marker)) errors.push(`El sitemap dejó de derivar ${label} de su fuente publicada.`);
}

const PRIVATE_NOINDEX = [
  'src/app/(auth)/login/page.tsx',
  'src/app/(auth)/registro/page.tsx',
  'src/app/(site)/dashboard/layout.tsx',
  'src/app/(site)/pagos/resultado/page.tsx',
  'src/app/(site)/practica/icfes-saber-11/progreso/page.tsx',
  'src/app/(site)/practica/icfes-saber-11/repaso-errores/page.tsx',
  'src/app/(site)/practica/ielts/academic/writing/task1/tarea-completa/sesion/page.tsx',
  'src/app/(site)/examenes/toefl/resultado/[submissionId]/page.tsx',
];

for (const relativePath of PRIVATE_NOINDEX) {
  const source = read(relativePath);
  if (!/index:\s*false/.test(source)) errors.push(`${relativePath} perdió su noindex intencional.`);
}

const KNOWN_NON_WWW_CANONICAL_FILES = new Set([
  'src/app/(site)/practica/aleman/b1/page.tsx',
  'src/app/(site)/practica/coreano/a2/leccion-integrada/page.tsx',
  'src/app/(site)/practica/coreano/a2/page.tsx',
  'src/app/(site)/practica/coreano/b1/page.tsx',
  'src/app/(site)/practica/frances/b1/page.tsx',
  'src/app/(site)/practica/ingles/b1/conjunciones/page.tsx',
  'src/app/(site)/practica/ingles/b1/page.tsx',
  'src/app/(site)/practica/ingles/b2/conectores/page.tsx',
  'src/app/(site)/practica/italiano/a2/page.tsx',
  'src/app/(site)/practica/japones/a2/page.tsx',
  'src/app/(site)/practica/japones/b1/page.tsx',
  'src/app/(site)/practica/portugues/b1/page.tsx',
  'src/app/(site)/practica/ruso/a2/page.tsx',
  'src/app/(site)/practica/ruso/b1/page.tsx',
]);

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(absolutePath);
    return /\.(?:ts|tsx|js|jsx)$/.test(entry.name) ? [absolutePath] : [];
  });
}

const unresolvedCanonicalFiles = [];
for (const absolutePath of sourceFiles(path.join(ROOT, 'src/app'))) {
  const source = fs.readFileSync(absolutePath, 'utf8');
  if (!/canonical\s*:\s*['"`]https:\/\/idiomaswl\.com(?:[/'"`])/.test(source)) continue;
  const relativePath = path.relative(ROOT, absolutePath);
  unresolvedCanonicalFiles.push(relativePath);
  if (!KNOWN_NON_WWW_CANONICAL_FILES.has(relativePath)) {
    errors.push(`${relativePath} añadió un canonical nuevo sin www.`);
  }
}

if (unresolvedCanonicalFiles.length) {
  warnings.push(`${unresolvedCanonicalFiles.length} canonicals sin www siguen como deuda conocida; el guardián impide que aparezcan nuevos.`);
}

const volatileLastModified = (sitemap.match(/lastModified:\s*now\b/g) ?? []).length;
if (volatileLastModified) {
  warnings.push(`${volatileLastModified} grupos del sitemap aún publican la hora del build como lastModified; se corregirá en la fase de señales.`);
}

for (const warning of warnings) console.warn(`! ${warning}`);

if (errors.length) {
  console.error(`\n✗ Fundación SEO: ${errors.length} regresión${errors.length === 1 ? '' : 'es'}:\n`);
  for (const error of errors) console.error(`  ✗ ${error}`);
  process.exit(1);
}

console.log('✓ Fundación SEO: host, sitemap derivado, home canónica y noindex privados protegidos.');
