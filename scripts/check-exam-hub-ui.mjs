import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLISHED_EXAM_FLOOR = 10;
const failures = [];
const read = (relativePath) => fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
const exists = (relativePath) => fs.existsSync(path.join(repoRoot, relativePath));
const expect = (condition, message) => { if (!condition) failures.push(message); };
const expectMarkers = (source, label, markers) => {
  for (const marker of markers) expect(source.includes(marker), `${label} perdió el contrato: ${marker}`);
};

const page = read('src/app/(site)/examenes/[exam]/page.tsx');
expectMarkers(page, 'ExamPage', [
  "import styles from './exam-hub.module.css'",
  'className={styles.page}',
  'className={styles.localNav}',
  "{ href: '#resumen'",
  "{ href: '#estructura'",
  "{ href: '#puntaje'",
  "{ href: '#practica'",
  '<ExamPodcastShelf',
  '<ExamGuideBlock',
  'alternates:',
  'canonical:',
]);
expect(!/slug\s*===\s*['"]toefl['"]\s*\?\s*<div/.test(page), 'ExamPage no puede volver a envolver un examen en un tema visual exclusivo.');
expect(!page.includes('toefl-ios.module.css'), 'ExamPage no puede importar el tema privado de TOEFL.');
expect(!exists('src/app/(site)/examenes/[exam]/toefl-ios.module.css'), 'El tema privado toefl-ios.module.css debe permanecer eliminado.');

const infographic = read('src/app/(site)/examenes/[exam]/ExamInfoGraphic.tsx');
expectMarkers(infographic, 'ExamInfoGraphic', [
  'function examVocabulary',
  'id="resumen"',
  'id="estructura"',
  'id="puntaje"',
  '<dl className="wl-exam-hero__pills"',
  'aria-hidden="true"',
  'href="#practica"',
  'hasPodcast',
]);
expect(!infographic.includes('framer-motion'), 'El contenido crítico del hub no puede depender de Framer Motion para ser visible.');
expect(!infographic.includes('initial={{ opacity: 0'), 'El hero no puede renderizar contenido crítico inicialmente invisible.');

const mockGrid = read('src/app/(site)/examenes/[exam]/MockGrid.tsx');
expectMarkers(mockGrid, 'MockGrid', [
  'INITIAL_VISIBLE_MOCKS',
  'id="practica"',
  '<details className="wl-mock-more">',
  '<summary>',
  'wl-mock-card__actions',
]);
expect(!mockGrid.includes('framer-motion'), 'El catálogo de simulacros no puede ocultarse detrás de animaciones cliente.');

const styles = read('src/app/(site)/examenes/[exam]/exam-hub.module.css');
expectMarkers(styles, 'Sistema visual de hubs', [
  '--hub-canvas:',
  '--hub-surface:',
  '--hub-ink:',
  '--exam-accent',
  '.localNav',
  'scroll-margin-top:',
  'grid-template-columns: repeat(4',
  'grid-template-columns: repeat(2',
  ':focus-visible',
  '@media (prefers-reduced-motion: reduce)',
]);
expect(!styles.includes('transition: all'), 'El sistema visual no puede usar transition: all.');

const jsonLd = read('src/app/(site)/examenes/[exam]/ExamJsonLd.tsx');
expectMarkers(jsonLd, 'SEO de hubs', ["'@type': 'BreadcrumbList'", "'@type': 'LearningResource'", 'isAccessibleForFree']);

const examsSource = read('src/data/exams.ts');
const publishedCount = (examsSource.match(/available:\s*true/g) ?? []).length;
expect(publishedCount >= PUBLISHED_EXAM_FLOOR, `El catálogo publicado bajó de ${PUBLISHED_EXAM_FLOOR} exámenes a ${publishedCount}.`);

const examsDirectory = path.join(repoRoot, 'src/app/(site)/examenes');
const staticOverrides = fs.readdirSync(examsDirectory, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('['))
  .filter((entry) => fs.existsSync(path.join(examsDirectory, entry.name, 'page.tsx')))
  .map((entry) => entry.name);
expect(staticOverrides.length === 0, `No se permiten hubs visuales paralelos fuera de [exam]: ${staticOverrides.join(', ')}.`);

if (failures.length) {
  console.error('El guardián del sistema de hubs de exámenes falló:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Sistema de hubs íntegro: ${publishedCount} exámenes comparten UI, navegación, accesibilidad y SEO.`);
}
