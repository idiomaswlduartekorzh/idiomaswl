import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

const read = (relativePath) => fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};
const expectIncludes = (source, marker, label) => {
  expect(source.includes(marker), `${label} perdió el contrato: ${marker}`);
};

// Los podcasts se descubren desde Herramientas y desde el examen correspondiente.
// No son una categoría global al nivel de Idiomas, Exámenes o Práctica.
const navSource = read('src/components/SiteNav.tsx');
for (const arrayName of ['NAV_LINKS', 'IELTS_NAV_LINKS']) {
  const arraySource = navSource.match(new RegExp(`const ${arrayName} = \\[([\\s\\S]*?)\\n\\];`))?.[1] ?? '';
  expect(arraySource.length > 0, `No se pudo leer ${arrayName} en SiteNav.`);
  expect(!/href:\s*['"]\/podcasts(?:['"/])/.test(arraySource), `${arrayName} no puede enlazar /podcasts.`);
  expect(!/label:\s*['"][^'"]*podcast/i.test(arraySource), `${arrayName} no puede presentar Podcasts como categoría principal.`);
  expect(/href:\s*['"]\/herramientas['"]/.test(arraySource), `${arrayName} debe conservar Herramientas.`);
}

const toolsSource = read('src/app/(site)/herramientas/page.tsx');
expectIncludes(toolsSource, "slug: 'podcasts-examenes'", 'Herramientas');
expectIncludes(toolsSource, "href: '/podcasts'", 'Herramientas');
expectIncludes(toolsSource, 'PODCAST_LIBRARY.length', 'Herramientas');

// UI y SEO de la biblioteca: URL propia indexable, pero jerarquía visible bajo Herramientas.
const libraryPage = read('src/app/(site)/podcasts/page.tsx');
for (const marker of [
  "alternates: { canonical: 'https://www.idiomaswl.com/podcasts' }",
  '<Link href="/herramientas">Herramientas</Link>',
  "'@type': 'BreadcrumbList'",
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  'PODCAST_LIBRARY.map',
]) expectIncludes(libraryPage, marker, 'Biblioteca /podcasts');

// Cada episodio conserva una sola página canónica con audio, guía y datos estructurados.
const episodePage = read('src/app/(site)/examenes/[exam]/podcast/[slug]/page.tsx');
for (const marker of [
  'generateStaticParams',
  'alternates: { canonical: url }',
  "'@type': 'PodcastEpisode'",
  "'@type': 'PodcastSeries'",
  "'@type': 'LearningResource'",
  '<PodcastFeature',
  'notes={episode.notes}',
]) expectIncludes(episodePage, marker, 'Página canónica de episodio');

const examHub = read('src/app/(site)/examenes/[exam]/page.tsx');
expectIncludes(examHub, 'getExamPodcasts(slug)', 'Hub de examen');
expectIncludes(examHub, '<ExamPodcastShelf', 'Hub de examen');

const sitemap = read('src/app/sitemap.ts');
expectIncludes(sitemap, '`${BASE}/podcasts`', 'Sitemap');
expectIncludes(sitemap, 'EXAM_PODCASTS.map', 'Sitemap');

// Integridad mínima del catálogo sin ejecutar la aplicación ni cargar todos sus módulos.
const libraryCatalog = read('src/data/practica/podcast-library.ts');
const catalogBody = libraryCatalog.match(/export const PODCAST_LIBRARY[\s\S]*?= \[([\s\S]*?)\n\] as const;/)?.[1] ?? '';
const entries = [...catalogBody.matchAll(/\n  \{([\s\S]*?)\n  \},?/g)].map((match) => match[1]);
expect(entries.length > 0, 'PODCAST_LIBRARY no contiene episodios legibles.');

const field = (entry, name) => entry.match(new RegExp(`${name}:\\s*'([^']+)'`))?.[1] ?? '';
const ids = new Set();
const hrefs = new Set();
const detailCatalog = read('src/data/practica/exam-podcast-catalog.ts');

for (const entry of entries) {
  const id = field(entry, 'id');
  const slug = field(entry, 'slug');
  const examSlug = field(entry, 'examSlug');
  const href = field(entry, 'href');
  const hubHref = field(entry, 'hubHref');
  const audioSrc = field(entry, 'audioSrc');
  const audioPath = audioSrc.split('?')[0];
  const durationIso = field(entry, 'durationIso');

  expect(Boolean(id && slug && examSlug && href && hubHref && audioSrc), `Un episodio perdió campos obligatorios: ${id || slug || 'sin id'}.`);
  expect(!ids.has(id), `ID de podcast duplicado: ${id}.`);
  expect(!hrefs.has(href), `URL canónica de podcast duplicada: ${href}.`);
  ids.add(id);
  hrefs.add(href);

  expect(href === `/examenes/${examSlug}/podcast/${slug}`, `${id}: href no coincide con examSlug y slug.`);
  expect(hubHref.startsWith('/'), `${id}: hubHref debe ser una ruta interna absoluta.`);
  expect(/^PT(?=.*\d)[\dHMS]+$/.test(durationIso), `${id}: durationIso no es una duración ISO 8601 válida.`);
  expect(audioPath.startsWith('/audio/') && audioPath.endsWith('.mp3'), `${id}: audioSrc debe apuntar a un MP3 público.`);
  expect(fs.existsSync(path.join(repoRoot, 'public', audioPath.replace(/^\//, ''))), `${id}: falta el audio ${audioPath}.`);
  expect(detailCatalog.includes(`byId('${id}')`), `${id}: falta la guía editorial en EXAM_PODCASTS.`);
}

if (failures.length) {
  console.error('El guardián de arquitectura de podcasts falló:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Arquitectura de podcasts íntegra: ${entries.length} episodios bajo Herramientas y sus hubs, fuera del menú principal.`);
}
