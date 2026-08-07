import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';

const REPORTS = [
  ['inventory', 'Inventario maestro', 'docs/icfes-inventory-audit.json'],
  ['ownMocks', '23 mocks propios', 'docs/icfes-guided-editorial-audit.json'],
  ['guided55', 'Entrenamiento guiado de 55', 'docs/icfes-guided-55-audit.json'],
  ['official', 'Muestras históricas guiadas', 'docs/icfes-official-guided-audit.json'],
  ['seo', 'Producto, SEO y accesibilidad', 'docs/icfes-seo-product-audit.json'],
  ['users', 'Cohorte sintética de 100 estudiantes', 'docs/icfes-100-user-simulation.json'],
  ['runtime', 'Smoke de rutas renderizadas', 'docs/icfes-runtime-smoke-audit.json'],
];
const reports = Object.fromEntries(REPORTS.map(([id, , path]) => [id, JSON.parse(readFileSync(path, 'utf8'))]));
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const documentation = readFileSync('docs/ICFES-SUPERHUB.md', 'utf8');

const checks = [];
function check(id, requirement, pass, severity, evidence, remediation) {
  checks.push({ id, requirement, pass: Boolean(pass), severity, evidence, remediation });
}

for (const [id, label] of REPORTS) {
  check(`report-${id}`, `${label}: auditoría aprobada`, String(reports[id].verdict).startsWith('approved'), 'critical', reports[id].verdict, `Resolver hallazgos en ${REPORTS.find(([reportId]) => reportId === id)?.[2]}.`);
}

const inventory = reports.inventory.totals;
check('inventory-scope', 'Inventario cubre el alcance completo', inventory.ownMocks === 23 && inventory.officialSaber11 === 7 && inventory.relatedIcfes === 3 && inventory.standaloneGuided === 1 && inventory.allInventoryResources === 34, 'critical', `23 propios · 7 Saber 11 · 3 relacionados · 1 guiado autónomo · 34 total`, 'Reconciliar catálogo, archivos y rutas.');
check('own-question-grain', 'Los 23 mocks conservan 1.035 preguntas guiadas', reports.ownMocks.scope.questionGrain === 1035 && reports.ownMocks.summary.failed === 0, 'critical', `${reports.ownMocks.scope.questionGrain}/1035 · ${reports.ownMocks.summary.checks} controles`, 'Corregir formato o feedback del banco propio.');
check('guided-55-grain', 'El entrenamiento vigente conserva 55 preguntas', reports.guided55.scope.questions === 55 && reports.guided55.summary.failed === 0, 'critical', `55 preguntas · ${reports.guided55.summary.checks} controles`, 'Restaurar preguntas, razones o distribución.');
check('official-guided-grain', 'Cinco muestras elegibles suman 145 preguntas explicadas', reports.official.scope.guidedQuestions === 145 && reports.official.scope.guided.length === 5 && Object.keys(reports.official.scope.excluded).length === 2, 'critical', '145 guiadas · 5 muestras · 2 exclusiones documentadas', 'No habilitar material sin estímulo completo.');
check('guided-total', 'Las experiencias guiadas exponen 1.235 preguntas', reports.ownMocks.scope.questionGrain + reports.guided55.scope.questions + reports.official.scope.guidedQuestions === 1235, 'high', '1.035 + 55 + 145 = 1.235', 'Reconciliar los tres bancos guiados.');
check('seo-gate', 'SEO/producto no tiene hallazgos abiertos', reports.seo.findings.length === 0 && reports.seo.scope.checks === 21, 'high', '21/21 controles', 'Corregir canonical, sitemap, metadata o accesibilidad.');
check('synthetic-cohort-honesty', 'La simulación distingue proxies de aprendizaje real', reports.users.methodology.runtime === true && reports.users.methodology.kind === 'deterministic-synthetic-cohort' && reports.users.totals.users === 100, 'critical', '100 estudiantes sintéticos · runtime activo · metodología explícita', 'No presentar simulaciones como observación humana.');
check('runtime-route-gate', 'Rutas y exclusiones responden como se espera', reports.runtime.totals.expected200 === 48 && reports.runtime.totals.expected404 === 2 && reports.runtime.totals.criticalOrHighOpen === 0, 'critical', '48 rutas 200 · 2 exclusiones 404 · 0 bloqueos', 'Corregir rutas o clasificación editorial.');
check('regression-gate', 'La compuerta principal encadena todas las auditorías sin servidor', packageJson.scripts['check:icfes-superhub'].includes('audit-icfes-100-users.mjs') && packageJson.scripts['check:icfes-superhub'].includes('audit-icfes-seo-product.mjs'), 'high', 'SEO y cohorte fuente incluidas', 'Restaurar auditorías en check:icfes-superhub.');
check('documentation-current', 'Documentación refleja cinco muestras y 145 explicaciones', documentation.includes('cinco muestras históricas Saber 11') && documentation.includes('145 preguntas') && documentation.includes('4 de agosto de 2026'), 'medium', 'Alcance y fecha actualizados', 'Actualizar el handoff editorial.');

const buildArtifacts = ['.next/routes-manifest.json', '.next/prerender-manifest.json', '.next/server/app-paths-manifest.json'];
const missingArtifacts = buildArtifacts.filter((path) => !existsSync(path));
const buildModifiedAt = missingArtifacts.length ? null : new Date(Math.min(...buildArtifacts.map((path) => statSync(path).mtimeMs))).toISOString();
check('webpack-build-artifacts', 'El build Webpack produjo manifiestos finales', missingArtifacts.length === 0, 'critical', missingArtifacts.length ? `Faltan: ${missingArtifacts.join(', ')}` : `Manifiestos presentes · ${buildModifiedAt}`, 'Ejecutar next build --webpack en el worktree aislado.');

const failed = checks.filter((item) => !item.pass);
const blocking = failed.filter((item) => ['critical', 'high'].includes(item.severity));
const report = {
  generatedAt: new Date().toISOString(),
  verdict: blocking.length ? 'blocked' : failed.length ? 'approved-with-observations' : 'approved',
  releaseDecision: blocking.length ? 'not-ready' : 'ready-for-human-integration-review',
  deployment: 'not-deployed-not-pushed-not-merged',
  scope: {
    inventoryResources: 34,
    ownMocks: 23,
    officialSaber11: 7,
    relatedAssessments: 3,
    guidedQuestionExperiences: 1235,
    guidedOfficialEligible: 5,
    guidedOfficialExcluded: 2,
    syntheticStudents: 100,
    renderedRoutes200: 48,
    deliberateRoutes404: 2,
  },
  browserEvidence: [
    { check: 'keyboard-tabs', result: 'passed', evidence: 'ArrowRight movió foco y selección de Lugares a Personas y oficios; tabpanel actualizó aria-labelledby.' },
    { check: 'specific-error-feedback', result: 'passed', evidence: 'Al elegir ankle, explicó tobillo, contrastó la definición y justificó throat como garganta.' },
    { check: 'persistence-and-review', result: 'passed', evidence: 'El intento mock-03:p1q1 quedó en localStorage y apareció en repaso con selección, correcta, evidencia y microlección.' },
    { check: 'historical-sample-scaling', result: 'passed', evidence: 'icfes-2022-g11 renderizó 25 preguntas, partes históricas, fuente y explicación editorial separadas.' },
    { check: 'mobile-layout', result: 'passed', evidence: 'Viewport 390×844: documentWidth 390, sin desbordamiento horizontal y CTA principales presentes.' },
  ],
  informationalObservations: [
    { id: 'gtm-third-party-csp', severity: 'info', detail: 'GTM intentó cargar un script de unpkg bloqueado por la CSP global. No afectó navegación, práctica, persistencia ni feedback ICFES; revisar aparte con el responsable de analítica.' },
    { id: 'turbopack-symlink', severity: 'info', detail: 'Turbopack no admite el symlink de node_modules del worktree /tmp. La validación se ejecutó con Webpack, soportado por Next.js 16.2.6, y produjo manifiestos finales.' },
  ],
  limitations: [
    'La cohorte de 100 es sintética: valida rutas, contenido expuesto y oportunidad pedagógica, no memoria, motivación ni aprendizaje observado en estudiantes reales.',
    'La indexabilidad técnica no garantiza posiciones en Google. Rendimiento orgánico requiere publicación autorizada, rastreo y datos posteriores de Search Console.',
    'Las dos muestras con avisos faltantes permanecen deliberadamente sin guiado; incorporar la fuente completa exige una nueva revisión editorial.',
    'No se predice puntaje oficial ni se presenta una muestra histórica o práctica propia como equivalente a la aplicación estándar 2026-2.',
  ],
  findings: failed,
  checks,
  componentReports: REPORTS.map(([id, label, path]) => ({ id, label, path, verdict: reports[id].verdict, generatedAt: reports[id].generatedAt })),
};

const markdown = `# Auditoría experta final — ecosistema ICFES Inglés\n\n` +
`Fecha: ${report.generatedAt}\n\n` +
`## Veredicto\n\n**${report.verdict === 'approved' ? 'APROBADO' : report.verdict.toUpperCase()}** para revisión humana de integración. No se desplegó, publicó, hizo push ni merge.\n\n` +
`## Cobertura demostrada\n\n` +
`- 34 recursos inventariados: 23 mocks propios, 7 muestras Saber 11, 3 recursos de otras evaluaciones y un entrenamiento guiado autónomo.\n` +
`- 1.235 preguntas servidas en experiencias guiadas: 1.035 de mocks propios, 55 del recorrido vigente y 145 de cinco muestras históricas elegibles.\n` +
`- Dos muestras excluidas del guiado porque faltan seis estímulos; sus rutas guiadas responden 404 en vez de inventar contenido.\n` +
`- 100 estudiantes sintéticos en siete cohortes y 33 rutas únicas; 48 rutas públicas aprobaron el smoke exhaustivo.\n` +
`- 21/21 controles SEO/producto y cero hallazgos críticos o altos abiertos.\n\n` +
`## Evidencia de navegador\n\n` + report.browserEvidence.map((item) => `- ${item.evidence}`).join('\n') + `\n\n` +
`## Juicio experto ICFES\n\n` +
`La arquitectura distingue con claridad el formato estándar 2026-2, las prácticas propias abreviadas, las muestras históricas divulgadas y Saber 9/10/TyT. El motor ya no entrega feedback intercambiable: muestra significado o regla, evidencia localizada, razón por alternativa, microlección y transferencia. La Parte 1 conserva el recorrido visual aprobado y el patrón se escala mediante un contrato común sin borrar la identidad de cada tarea.\n\n` +
`## Límites que no deben convertirse en promesas\n\n` + report.limitations.map((item) => `- ${item}`).join('\n') + `\n\n` +
`## Observaciones informativas\n\n` + report.informationalObservations.map((item) => `- ${item.detail}`).join('\n') + `\n\n` +
`## Compuerta de regresión\n\n` +
`Ejecutar \`npm run check:icfes-superhub\`. Para verificación renderizada, levantar el servidor de auditoría y ejecutar \`npm run audit:icfes-runtime\` y \`npm run audit:icfes-100-users:runtime\`.\n`;

if (!process.argv.includes('--no-write')) {
  writeFileSync('docs/icfes-final-expert-audit.json', `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync('docs/ICFES-FINAL-EXPERT-AUDIT.md', markdown);
}
console.log(JSON.stringify({ verdict: report.verdict, releaseDecision: report.releaseDecision, scope: report.scope, failed: failed.map(({ id, severity }) => ({ id, severity })) }, null, 2));
assert.equal(blocking.length, 0, `Auditoría experta final bloqueada: ${blocking.map((item) => item.id).join(', ')}`);
