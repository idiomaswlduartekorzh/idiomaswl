import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { GUIDED_MOCK_IDS, GUIDED_WORKBOOK_EXCLUSIONS, GUIDED_WORKBOOK_IDS } from '../src/data/icfes/guided-registry.ts';

const base = process.env.ICFES_AUDIT_BASE_URL ?? 'http://127.0.0.1:4192';
const hub = '/practica/icfes-saber-11';
const expected200 = [
  hub,
  `${hub}/diagnostico`, `${hub}/plan-de-estudio`, `${hub}/pregunta-del-dia`, `${hub}/vocabulario`, `${hub}/simulacro-guiado`, `${hub}/examenes`, `${hub}/repaso-errores`, `${hub}/progreso`,
  ...Array.from({ length: 7 }, (_, index) => `${hub}/parte-${index + 1}`),
  ...GUIDED_MOCK_IDS.map((id) => `/examenes/icfes/practica/${id}/guiado`),
  ...GUIDED_WORKBOOK_IDS.map((id) => `${hub}/examenes/${id}/guiado`),
  `${hub}/examenes/icfes-2022-g9`, `${hub}/examenes/icfes-2022-g10`, `${hub}/examenes/icfes-tyt`,
  '/sitemap.xml',
];
const expected404 = Object.keys(GUIDED_WORKBOOK_EXCLUSIONS).map((id) => `${hub}/examenes/${id}/guiado`);

const results = [];
for (const route of [...expected200, ...expected404]) {
  const response = await fetch(`${base}${route}`, { redirect: 'manual' });
  const body = await response.text();
  results.push({ route, status: response.status, body });
}

const checks = [];
function check(id, title, pass, severity, evidence, remediation) {
  checks.push({ id, title, pass: Boolean(pass), severity, evidence, remediation });
}
const unexpectedPublic = results.filter((item) => expected200.includes(item.route) && item.status !== 200);
const unexpectedExcluded = results.filter((item) => expected404.includes(item.route) && item.status !== 404);
check('public-routes', 'Todas las rutas públicas esperadas responden 200', unexpectedPublic.length === 0, 'critical', `${expected200.length - unexpectedPublic.length}/${expected200.length}`, unexpectedPublic.map((item) => `${item.status} ${item.route}`).join(', '));
check('excluded-guided-routes', 'Los guiados con estímulos incompletos responden 404', unexpectedExcluded.length === 0, 'critical', `${expected404.length - unexpectedExcluded.length}/${expected404.length}`, unexpectedExcluded.map((item) => `${item.status} ${item.route}`).join(', '));

const sitemap = results.find((item) => item.route === '/sitemap.xml')?.body ?? '';
const mockUrls = sitemap.match(/\/examenes\/icfes\/practica\/mock-\d+\/guiado/g) ?? [];
const workbookUrls = sitemap.match(/\/practica\/icfes-saber-11\/examenes\/icfes-[^<]+\/guiado/g) ?? [];
const relatedInSitemap = ['icfes-2022-g9', 'icfes-2022-g10', 'icfes-tyt'].filter((id) => sitemap.includes(`${hub}/examenes/${id}`));
check('sitemap-guided-mocks', 'Sitemap contiene los 23 mocks guiados', mockUrls.length === 23, 'critical', `${mockUrls.length}/23`, 'Regenerar desde GUIDED_MOCK_IDS.');
check('sitemap-guided-workbooks', 'Sitemap contiene las cinco muestras guiadas', workbookUrls.length === 5, 'critical', `${workbookUrls.length}/5`, 'Regenerar desde GUIDED_WORKBOOK_IDS.');
check('sitemap-assessment-boundary', 'Sitemap no mezcla otras evaluaciones con Saber 11', relatedInSitemap.length === 0, 'high', relatedInSitemap.join(', ') || 'Ninguna', 'Retirar Saber 9, Saber 10 y TyT del sitemap de esta arquitectura.');

const relatedPages = results.filter((item) => ['icfes-2022-g9', 'icfes-2022-g10', 'icfes-tyt'].some((id) => item.route.endsWith(id)));
const relatedWithoutNoindex = relatedPages.filter((item) => !/<meta name="robots" content="noindex, follow"/.test(item.body));
check('related-noindex', 'Las evaluaciones complementarias publican noindex,follow', relatedWithoutNoindex.length === 0, 'high', `${relatedPages.length - relatedWithoutNoindex.length}/${relatedPages.length}`, relatedWithoutNoindex.map((item) => item.route).join(', '));

const hubBody = results.find((item) => item.route === hub)?.body ?? '';
check('hub-canonical', 'El hub renderiza canonical absoluto', hubBody.includes('<link rel="canonical" href="https://www.idiomaswl.com/practica/icfes-saber-11"'), 'critical', 'Canonical final www', 'Corregir metadata del hub.');
check('hub-structured-data', 'El hub renderiza CollectionPage y BreadcrumbList', hubBody.includes('CollectionPage') && hubBody.includes('BreadcrumbList'), 'high', 'Dos esquemas presentes', 'Restaurar datos estructurados visibles en HTML.');
check('part-one-accessibility-html', 'Parte 1 renderiza tablist y panel etiquetado', (results.find((item) => item.route === `${hub}/parte-1`)?.body ?? '').includes('role="tablist"') && (results.find((item) => item.route === `${hub}/parte-1`)?.body ?? '').includes('role="tabpanel"'), 'high', 'Patrón ARIA presente en SSR', 'Restaurar semántica de pestañas.');

const failed = checks.filter((item) => !item.pass);
const blocking = failed.filter((item) => ['critical', 'high'].includes(item.severity));
const report = {
  generatedAt: new Date().toISOString(),
  verdict: blocking.length ? 'blocked' : failed.length ? 'approved-with-observations' : 'approved',
  base,
  totals: { expected200: expected200.length, expected404: expected404.length, checks: checks.length, criticalOrHighOpen: blocking.length },
  findings: failed,
  checks,
  routes: results.map(({ route, status }) => ({ route, status })),
};
if (!process.argv.includes('--no-write')) writeFileSync('docs/icfes-runtime-smoke-audit.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ verdict: report.verdict, totals: report.totals, failed: failed.map(({ id, severity }) => ({ id, severity })) }, null, 2));
assert.equal(blocking.length, 0, `Smoke ICFES bloqueado: ${blocking.map((item) => item.id).join(', ')}`);
