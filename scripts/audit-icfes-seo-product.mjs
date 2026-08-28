import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { GUIDED_MOCK_IDS, GUIDED_WORKBOOK_IDS, GUIDED_WORKBOOK_EXCLUSIONS } from '../src/data/icfes/guided-registry.ts';

const read = (path) => readFileSync(path, 'utf8');
const sitemap = read('src/app/sitemap.ts');
const hub = read('src/app/(site)/practica/icfes-saber-11/page.tsx');
const partPage = read('src/app/(site)/practica/icfes-saber-11/[partSlug]/page.tsx');
const workbookPage = read('src/app/(site)/practica/icfes-saber-11/examenes/[examId]/page.tsx');
const workbookCatalogPage = read('src/app/(site)/practica/icfes-saber-11/examenes/page.tsx');
const guidedWorkbookPage = read('src/app/(site)/practica/icfes-saber-11/examenes/[examId]/guiado/page.tsx');
const guidedMockPage = read('src/app/(site)/examenes/[exam]/practica/[mockId]/guiado/page.tsx');
const mockGrid = read('src/app/(site)/examenes/[exam]/MockGrid.tsx');
const practiceClient = read('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx');
const workbookCatalog = read('src/app/(site)/practica/icfes-saber-11/examenes/ExamenesClient.tsx');
const partOneExamples = read('src/app/(site)/practica/icfes-saber-11/_components/IcfesPartOneExamples.tsx');
const css = read('src/app/(site)/practica/icfes-saber-11/icfes-learning.module.css');
const legacy = read('src/app/(site)/practica/icfes/page.tsx');
const progress = read('src/app/(site)/practica/icfes-saber-11/progreso/page.tsx');
const errorReview = read('src/app/(site)/practica/icfes-saber-11/repaso-errores/page.tsx');

const checks = [];
function check(id, title, pass, severity, evidence, remediation) {
  checks.push({ id, title, pass: Boolean(pass), severity, evidence, remediation });
}

check('guided-mock-registry', 'Los 23 mocks guiados tienen una fuente única', GUIDED_MOCK_IDS.length === 23 && new Set(GUIDED_MOCK_IDS).size === 23, 'critical', `${GUIDED_MOCK_IDS.length}/23 IDs únicos`, 'Corregir guided-registry.ts antes de exponer rutas.');
check('guided-workbook-registry', 'Cinco muestras guiadas y dos exclusiones documentadas', GUIDED_WORKBOOK_IDS.length === 5 && Object.keys(GUIDED_WORKBOOK_EXCLUSIONS).length === 2, 'critical', `${GUIDED_WORKBOOK_IDS.length} guiadas · ${Object.keys(GUIDED_WORKBOOK_EXCLUSIONS).length} exclusiones`, 'No publicar guiado sin estímulo completo.');
check('sitemap-guided-mocks', 'El sitemap deriva todos los mocks del registro', sitemap.includes('...GUIDED_MOCK_IDS.map'), 'high', 'Mapeo dinámico desde GUIDED_MOCK_IDS', 'Eliminar listas manuales parciales.');
check('sitemap-guided-workbooks', 'El sitemap deriva las cinco muestras guiadas', sitemap.includes('...GUIDED_WORKBOOK_IDS.map'), 'high', 'Mapeo dinámico desde GUIDED_WORKBOOK_IDS', 'Añadir las rutas guiadas aprobadas.');
check('sitemap-saber11-boundary', 'El sitemap Saber 11 excluye otras evaluaciones', sitemap.includes("SIMULACROS.filter((exam) => exam.assessment === 'saber-11')"), 'critical', 'Filtro explícito assessment=saber-11', 'No mezclar Saber 9, Saber 10 o TyT en esta arquitectura.');
check('related-noindex', 'Los materiales complementarios no compiten como páginas Saber 11', workbookPage.includes("robots: sim.assessment === 'saber-11' ? undefined : { index: false, follow: true }"), 'high', 'noindex,follow condicional', 'Mantener acceso y enlaces sin indexación engañosa.');
check('canonical-hub-parts', 'Hub y partes declaran URL canónica', hub.includes('alternates: { canonical: CANONICAL }') && partPage.includes('alternates: { canonical: url }'), 'critical', 'Canonicals propios en hub y siete páginas dinámicas', 'Añadir canonical absoluto.');
check('canonical-guided', 'Ambas familias guiadas declaran canonical propio', guidedMockPage.includes('alternates: { canonical }') && guidedWorkbookPage.includes('alternates: { canonical }'), 'high', 'Canonical en mocks y muestras guiadas', 'Evitar que el modo guiado compita con modo examen.');
check('private-tools-noindex', 'Progreso y repaso personal no se indexan', progress.includes('index: false') && errorReview.includes('index: false'), 'high', 'Dos herramientas personales con noindex,follow', 'Excluir páginas dependientes de estado personal.');
check('legacy-redirect', 'La antigua ruta /practica/icfes consolida autoridad', legacy.includes("permanentRedirect('/practica/icfes-saber-11')"), 'high', 'Redirección permanente al hub', 'Evitar una landing duplicada.');
check('structured-data', 'Hub y experiencias publican datos estructurados pertinentes', hub.includes("'@type': 'CollectionPage'") && hub.includes("'@type': 'BreadcrumbList'") && guidedMockPage.includes('type="Quiz"') && guidedWorkbookPage.includes('type="Quiz"'), 'medium', 'CollectionPage + BreadcrumbList + Quiz', 'Mantener schema alineado con contenido visible.');
const workbookMetadataStatesGuidedScope = /Cinco\s+(?:muestras\s+)?traen\s+explicación\s+guiada/i.test(workbookCatalogPage);
const workbookOpenGraphStatesQuestionCount = /145\s+preguntas\s+explicadas\s+en\s+cinco\s+recorridos\s+guiados/i.test(workbookCatalogPage);
check('metadata-truth', 'La portada de cuadernillos comunica alcance real', workbookMetadataStatesGuidedScope && workbookOpenGraphStatesQuestionCount && !workbookCatalogPage.includes('análisis guiado en el cuadernillo 2023'), 'high', 'Snippet: cinco muestras guiadas · Open Graph: 145 preguntas en cinco recorridos', 'Actualizar los hechos del snippet y Open Graph cuando cambie el inventario, sin exigir una redacción literal.');
check('catalogue-cta-parity', 'Catálogos y modo examen consultan el registro único', mockGrid.includes("from '@/data/icfes/guided-registry'") && practiceClient.includes("from '@/data/icfes/guided-registry'") && workbookCatalog.includes("from '@/data/icfes/guided-registry'"), 'critical', 'Tres consumidores usan el registro ligero', 'No volver a listas locales de tres IDs.');
check('client-payload-boundary', 'Los catálogos no importan bancos editoriales pesados', !mockGrid.includes('guided-mocks') && !practiceClient.includes('guided-mocks') && !workbookCatalog.includes('guided-workbooks'), 'medium', 'Decisiones CTA sin cargar bancos completos', 'Importar solo guided-registry.ts.');
check('part-one-keyboard', 'La demostración de Parte 1 funciona con teclado', partOneExamples.includes('onKeyDown=') && partOneExamples.includes('tabIndex=') && partOneExamples.includes('aria-labelledby='), 'high', 'Flechas/Home/End, roving tabindex y panel etiquetado', 'Implementar el patrón ARIA tabs completo.');
check('focus-visible', 'Los controles muestran foco visible', css.includes('.exampleTabs button:focus-visible') && css.includes('.hubPage a:focus-visible'), 'high', 'Anillo de foco en motor y hub', 'No depender solo de hover.');
check('reduced-motion', 'Las animaciones respetan movimiento reducido', (css.match(/prefers-reduced-motion:\s*reduce/g) ?? []).length >= 2, 'high', 'Reglas para páginas didácticas y hub', 'Desactivar animaciones no esenciales.');
check('safe-animation', 'La órbita anima solo transform', /@keyframes orbit \{ from \{ transform: rotate\(0deg\); \} to \{ transform: rotate\(360deg\); \} \}/.test(css), 'medium', 'Animación compositor-friendly', 'No animar bordes o layout.');
check('touch-actions', 'Controles táctiles evitan demora de interacción', css.includes('touch-action: manipulation'), 'medium', 'Aplicado a botones y enlaces ICFES', 'Añadir touch-action a controles interactivos.');
check('seven-parts-linked', 'El hub enlaza las siete partes desde datos', hub.includes('ICFES_PARTS.map') && hub.includes('href={`/practica/icfes-saber-11/${part.slug}`}'), 'critical', 'Mapa y tarjetas derivados de ICFES_PARTS', 'No mantener una lista manual incompleta.');
check('review-date', 'La revisión pública está fechada', hub.includes("dateModified: '2026-08-04'") && partPage.includes("REVIEWED_AT = '4 de agosto de 2026'"), 'medium', '4 de agosto de 2026', 'Actualizar solo al completar una revisión real.');

const failed = checks.filter((item) => !item.pass);
const blocking = failed.filter((item) => item.severity === 'critical' || item.severity === 'high');
const report = {
  generatedAt: new Date().toISOString(),
  verdict: blocking.length ? 'blocked' : failed.length ? 'approved-with-observations' : 'approved',
  scope: { guidedMocks: GUIDED_MOCK_IDS.length, guidedWorkbooks: GUIDED_WORKBOOK_IDS.length, excludedWorkbooks: Object.keys(GUIDED_WORKBOOK_EXCLUSIONS).length, checks: checks.length },
  findings: failed,
  checks,
};

if (!process.argv.includes('--no-write')) writeFileSync('docs/icfes-seo-product-audit.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ verdict: report.verdict, scope: report.scope, failed: failed.map(({ id, severity }) => ({ id, severity })) }, null, 2));
assert.equal(blocking.length, 0, `SEO/producto ICFES bloqueado: ${blocking.map(({ id }) => id).join(', ')}`);
