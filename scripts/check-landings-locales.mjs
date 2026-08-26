#!/usr/bin/env node
/**
 * Protege las señales compartidas por las ocho landings comerciales locales.
 * Los errores son regresiones; la profundidad pendiente de FAQ solo genera aviso.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DETAIL = process.argv.includes('--detalle');
const read = (relativePath) => {
  const absolutePath = path.join(ROOT, relativePath);
  return fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, 'utf8') : null;
};

const GOOGLE_PROFILE = {
  streetAddress: 'Calle 47 # 29-33, Sotomayor',
  addressLocality: 'Bucaramanga',
  addressRegion: 'Santander',
  phone: '573005004253',
  hours: ['Mo-Fr 07:00-21:00', 'Sa 08:00-18:00'],
  municipalities: ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta'],
};

const LANDINGS = [
  { slug: 'clases-de-ingles', language: 'inglés', exams: ['IELTS', 'TOEFL', 'FCE', 'ICFES'] },
  { slug: 'clases-de-coreano', language: 'coreano', exams: ['TOPIK'] },
  { slug: 'clases-de-italiano', language: 'italiano', exams: ['CILS', 'CELI', 'Ciudadanía'], faqSingleSource: true },
  { slug: 'clases-de-portugues', language: 'portugués', exams: ['Celpe-Bras'] },
  { slug: 'clases-de-frances', language: 'francés', exams: ['DELF', 'DALF'], faqSingleSource: true },
  { slug: 'clases-de-aleman', language: 'alemán', exams: ['Goethe', 'Ausbildung'] },
  { slug: 'clases-de-japones', language: 'japonés', exams: ['JLPT'] },
  { slug: 'clases-de-ruso', language: 'ruso', exams: ['Cero'] },
];

const FAQ_TARGET = 8;
const errors = [];
const warnings = [];
const details = [];
const fail = (scope, message) => errors.push(`${scope}: ${message}`);
const warn = (scope, message) => warnings.push(`${scope}: ${message}`);

function quotedValueAfter(source, key) {
  const match = source.match(new RegExp(`${key}:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)")`));
  return match ? (match[1] ?? match[2]).replace(/\\(.)/g, '$1') : null;
}

const localBusiness = read('src/components/hub/localBusiness.ts');
if (!localBusiness) {
  fail('localBusiness.ts', 'desapareció la fuente única de NAP.');
} else {
  const expectedValues = [
    [GOOGLE_PROFILE.streetAddress, 'dirección'],
    [GOOGLE_PROFILE.addressLocality, 'ciudad'],
    [GOOGLE_PROFILE.addressRegion, 'departamento'],
    [GOOGLE_PROFILE.phone, 'teléfono'],
    ...GOOGLE_PROFILE.hours.map((value) => [value, `horario ${value}`]),
    ...GOOGLE_PROFILE.municipalities.map((value) => [value, `municipio ${value}`]),
  ];
  for (const [value, label] of expectedValues) {
    if (!localBusiness.includes(value)) fail('localBusiness.ts', `${label} ya no coincide con la ficha de Google (${value}).`);
  }

  if (!/'@type':\s*\['LocalBusiness',\s*'LanguageSchool'\]/.test(localBusiness)) {
    fail('localBusiness.ts', "el nodo dejó de ser LocalBusiness + LanguageSchool.");
  }
  if (!/courseMode:\s*'onsite'/.test(localBusiness) || !/location:\s*\{\s*'@id':\s*BUSINESS_ID\s*\}/.test(localBusiness)) {
    fail('localBusiness.ts', 'la CourseInstance presencial perdió su ubicación de negocio.');
  }
  for (const marker of ['GeoCoordinates', 'sameAs']) {
    if (!localBusiness.includes(marker)) fail('localBusiness.ts', `perdió ${marker}.`);
  }
}

const snippetSource = read('src/lib/seo-snippet.ts') ?? '';
const TITLE_MAX = Number(snippetSource.match(/TITLE_MAX\s*=\s*(\d+)/)?.[1] ?? 60);
const DESCRIPTION_MAX = Number(snippetSource.match(/DESC_MAX\s*=\s*(\d+)/)?.[1] ?? 155);

for (const { slug, language, exams, faqSingleSource } of LANDINGS) {
  const relativePath = `src/app/(site)/${slug}/page.tsx`;
  const source = read(relativePath);
  if (!source) {
    fail(slug, 'desapareció la landing comercial.');
    continue;
  }

  const metadata = source.slice(Math.max(0, source.indexOf('export const metadata')));
  const title = quotedValueAfter(metadata, 'title');
  const description = quotedValueAfter(metadata, 'description');

  if (!title) fail(slug, 'no se pudo leer el title.');
  else {
    if (!/Bucaramanga/i.test(title)) fail(slug, `el title perdió Bucaramanga: «${title}».`);
    if (!/online/i.test(title)) warn(slug, `el title perdió online: «${title}».`);
    if (title.length > TITLE_MAX) fail(slug, `el title mide ${title.length}; el máximo es ${TITLE_MAX}.`);
    if (!exams.some((exam) => title.toLowerCase().includes(exam.toLowerCase()))) {
      warn(slug, `el title ya no nombra un examen de ${language} (${exams.join(', ')}).`);
    }
  }

  if (!description) warn(slug, 'no se pudo leer la description.');
  else if (description.length > DESCRIPTION_MAX) fail(slug, `la description mide ${description.length}; el máximo es ${DESCRIPTION_MAX}.`);

  const canonical = `https://www.idiomaswl.com/${slug}`;
  if (!source.includes(canonical)) fail(slug, `el canonical dejó de ser ${canonical}.`);
  if (!/from\s+['"][^'"]*localBusiness['"]/.test(source)) fail(slug, 'dejó de leer la fuente única localBusiness.ts.');
  if (!/localBusinessNode\(/.test(source)) fail(slug, 'perdió localBusinessNode().');
  if (!/courseInstances\(/.test(source)) fail(slug, 'perdió courseInstances().');
  if (!/<LocalBand/.test(source)) fail(slug, 'perdió el bloque NAP visible LocalBand.');
  for (const schemaType of ['BreadcrumbList', 'Course', 'FAQPage']) {
    if (!source.includes(`'${schemaType}'`)) fail(slug, `perdió ${schemaType} del JSON-LD.`);
  }

  const visibleQuestionCount = (source.match(/\{\s*q:\s*['"]/g) ?? []).length;
  const schemaQuestionCount = (source.match(/'@type':\s*'Question'/g) ?? []).length;
  const questionCount = Math.max(visibleQuestionCount, schemaQuestionCount);
  if (faqSingleSource) {
    if (!/mainEntity:\s*faqs\.map\(/.test(source) || !/JSON\.stringify\(faqJsonLd\(FAQS\)\)/.test(source)) {
      fail(slug, 'el FAQ visible y su JSON-LD dejaron de compartir una sola fuente.');
    }
  }
  if (questionCount < FAQ_TARGET) warn(slug, `solo tiene ${questionCount} pregunta${questionCount === 1 ? '' : 's'} en FAQ; objetivo ${FAQ_TARGET}.`);
  details.push(`${slug.padEnd(20)} title ${String(title?.length ?? 0).padStart(2)}/${TITLE_MAX} · FAQ ${String(questionCount).padStart(2)} · NAP + LocalBusiness + Course`);
}

if (DETAIL && details.length) {
  console.log('\nSeñales locales protegidas:\n');
  for (const detail of details) console.log(`  ✓ ${detail}`);
}
if (warnings.length) {
  console.warn(`\n! ${warnings.length} aviso${warnings.length === 1 ? '' : 's'} (no bloquean):`);
  for (const warning of warnings) console.warn(`  ! ${warning}`);
}
if (errors.length) {
  console.error(`\n✗ ${errors.length} regresión${errors.length === 1 ? '' : 'es'} en SEO local:`);
  for (const error of errors) console.error(`  ✗ ${error}`);
  process.exit(1);
}

console.log(`✓ Landings locales: ${LANDINGS.length} rutas conservan NAP, LocalBand, CourseInstance y JSON-LD.`);
