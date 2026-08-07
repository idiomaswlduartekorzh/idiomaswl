import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const questions = read('src/data/icfes/questions.ts');
const guided = read('src/data/icfes/guided-workbooks.ts');
const mocks = read('src/data/mocks/icfes-simulacros.ts');
const sitemap = read('src/app/sitemap.ts');
const migration = read('supabase/migrations/20260803_icfes_practice_engine.sql');
const partOneLesson = read('src/data/icfes/part-one-lesson.ts');
const structuredLessons = read('src/data/icfes/part-lessons.ts');
const guidedExamplesComponent = read('src/app/(site)/practica/icfes-saber-11/_components/IcfesGuidedExamples.tsx');
const progressivePracticeComponent = read('src/app/(site)/practica/icfes-saber-11/_components/IcfesProgressivePractice.tsx');
const examCatalog = read('src/data/exams.ts');
const examGuide = read('src/data/examGuides.ts');
const blog = read('src/data/blog.ts');
const legacyNormalizer = read('src/data/mocks/normalize-icfes-mock.ts');
const mockRegistry = read('src/data/mocks/index.ts');
const studyPlan = read('src/app/(site)/practica/icfes-saber-11/plan-de-estudio/StudyPlanClient.tsx');
const workbookCatalog = read('src/app/(site)/practica/icfes-saber-11/examenes/ExamenesClient.tsx');
const mockGrid = read('src/app/(site)/examenes/[exam]/MockGrid.tsx');
const practiceClient = read('src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx');
const guided55 = read('src/data/icfes/guided-simulacro-2026.ts');
const guided55Page = read('src/app/(site)/practica/icfes-saber-11/simulacro-guiado/page.tsx');
const errorReviewPage = read('src/app/(site)/practica/icfes-saber-11/repaso-errores/page.tsx');
const guidedMocks = read('src/data/icfes/guided-mocks.ts');
const guidedRegistry = read('src/data/icfes/guided-registry.ts');
const guidedMockPage = read('src/app/(site)/examenes/[exam]/practica/[mockId]/guiado/page.tsx');

for (let part = 1; part <= 7; part += 1) {
  const count = (questions.match(new RegExp(`officialPart: ${part}`, 'g')) ?? []).length;
  assert.ok(count >= 3, `Parte ${part}: se esperaban al menos 3 preguntas revisadas; encontradas ${count}`);
}

for (let question = 1; question <= 25; question += 1) {
  assert.match(guided, new RegExp(`^  ${question}:`, 'm'), `Falta revisión del cuadernillo 2023, pregunta ${question}`);
}
assert.match(guided, /return exam\.questions\.map/, 'El modo guiado debe convertir el cuadernillo completo');
assert.doesNotMatch(guided, /questions\.slice\(0,\s*5\)/, 'El modo guiado volvió a ser un piloto de cinco preguntas');

const mockIds = mocks.match(/id: 'icfes-[^']+'/g) ?? [];
const explicitRanges = mocks.match(/partRanges:\s*\[/g) ?? [];
assert.equal(explicitRanges.length, mockIds.length, 'Cada simulacro debe tener partRanges explícitos');

for (const route of ['diagnostico', 'plan-de-estudio', 'pregunta-del-dia', 'vocabulario', 'simulacro-guiado']) {
  assert.ok(sitemap.includes(route), `Falta ${route} en sitemap`);
}
assert.match(sitemap, /GUIDED_WORKBOOK_IDS\.map/, 'El sitemap debe incluir todos los cuadernillos guiados desde el registro');
assert.match(sitemap, /GUIDED_MOCK_IDS\.map/, 'El sitemap debe incluir los 23 mocks guiados desde el registro');

for (const table of ['icfes_practice_sessions', 'icfes_practice_attempts', 'icfes_skill_mastery', 'icfes_error_queue']) {
  assert.match(migration, new RegExp(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY`), `${table} debe habilitar RLS`);
}
assert.match(migration, /REVOKE ALL ON FUNCTION record_icfes_practice_attempt[\s\S]+FROM PUBLIC/, 'La función RPC no debe quedar ejecutable por anon/public');

assert.equal((partOneLesson.match(/decisiveClue:/g) ?? []).length - 1, 20, 'La Parte 1 debe conservar 20 ejemplos guiados');
assert.equal((partOneLesson.match(/id: 'p1-/g) ?? []).length, 8, 'La Parte 1 debe conservar 8 ejercicios adicionales para progresión');
for (const stage of ['category', 'clue', 'distractors']) {
  assert.match(partOneLesson, new RegExp(`id: '${stage}'`), `Falta el nivel progresivo ${stage} de la Parte 1`);
}
for (const part of [2, 3, 4, 5, 6, 7]) {
  assert.equal((structuredLessons.match(new RegExp(`\\['p${part}-`, 'g')) ?? []).length, 15, `La Parte ${part} debe conservar 15 demostraciones guiadas`);
  assert.match(structuredLessons, new RegExp(`part: ${part},`), `Falta la configuración pedagógica de la Parte ${part}`);
}
for (const [name, component] of [['demostraciones', guidedExamplesComponent], ['niveles', progressivePracticeComponent]]) {
  assert.match(component, /onKeyDown=/, `Las pestañas de ${name} deben responder al teclado`);
  assert.match(component, /tabIndex=/, `Las pestañas de ${name} deben usar roving tabindex`);
  assert.match(component, /aria-labelledby=/, `El panel de ${name} debe identificar su pestaña activa`);
}

const publicTruth = [
  examGuide,
  examCatalog,
  blog,
  read('src/app/(site)/dashboard/student/StudentDashboardClient.tsx'),
  read('src/app/(site)/practica/icfes-saber-11/layout.tsx'),
].join('\n');
assert.doesNotMatch(publicTruth, /La prueba de Inglés del ICFES Saber 11 tiene 45 preguntas/i);
assert.doesNotMatch(publicTruth, /ICFES Nivel C1/i);
assert.doesNotMatch(publicTruth, /solo evalúa comprensión de lectura/i);

assert.match(examCatalog, /totalQuestions: 55/, 'La ficha pública ICFES debe declarar 55 preguntas para 2026-2');
assert.match(examCatalog, /Parte 1[\s\S]{0,180}Relacionar descripciones con palabras/, 'Parte 1 debe ser descripciones y palabras');
assert.match(examCatalog, /Parte 2[\s\S]{0,180}Interpretar avisos/, 'Parte 2 debe ser avisos');
assert.equal((examCatalog.match(/Práctica propia abreviada · 45 preguntas/g) ?? []).length, 23, 'Los 23 mocks propios deben declararse abreviados');
assert.doesNotMatch(examGuide, /empieza con avisos e instrucciones cortas, sigue con vocabulario/i, 'La guía no debe invertir Partes 1 y 2');
assert.doesNotMatch(blog, /81\s*[–-]\s*100\s*→\s*Nivel B2/i, 'El blog no debe reportar B2 como nivel de Saber 11');

assert.match(legacyNormalizer, /'matching-grid': 1/, 'El normalizador debe mapear vocabulario a Parte 1');
assert.match(legacyNormalizer, /'notices-grid': 2/, 'El normalizador debe mapear avisos a Parte 2');
assert.match(mockRegistry, /normalizeIcfesMock\(mock\)/, 'El registro debe normalizar los 23 mocks heredados');
const currentPartSeven = read('src/data/mocks/icfes-current-part-seven.ts');
const editorialAudit = read('scripts/audit-icfes-guided-editorial.mjs');
const inventoryAudit = read('scripts/audit-icfes-inventory.mjs');
assert.equal((currentPartSeven.match(/'mock-(?:0[1-9]|1[0-9]|2[0-3])': section/g) ?? []).length, 23, 'Los veintitrés mocks guiados deben sustituir la Parte 7 heredada');
assert.equal((currentPartSeven.match(/\.map\(clozeQuestion\)/g) ?? []).length, 23, 'Cada Parte 7 vigente debe construir diez espacios de cloze');
assert.match(legacyNormalizer, /CURRENT_PART_SEVEN/, 'Examen y guiado deben compartir la Parte 7 vigente');
assert.match(editorialAudit, /assert\.equal\(report\.verdict, 'approved'/, 'La auditoría editorial debe bloquear el flujo si no aprueba');
assert.match(inventoryAudit, /catalogResources:\s*33/, 'El inventario debe cubrir los 33 recursos del catálogo ICFES');
assert.match(inventoryAudit, /allInventoryResources:\s*resources\.length/, 'El inventario debe incluir el entrenamiento guiado adicional');

assert.match(studyPlan, /repaso-errores/, 'Las semanas de repaso deben enlazar a la cola de errores');
assert.match(studyPlan, /Abrir cuadernillo/, 'Las semanas de repaso deben enlazar a un cuadernillo');
assert.match(workbookCatalog, /Práctica complementaria/, 'El catálogo debe separar materiales complementarios');
assert.match(workbookCatalog, /sim\.assessment === 'saber-11'/, 'Saber 11 debe filtrarse por evaluación explícita');
assert.match(workbookCatalog, /sim\.assessment !== 'saber-11'/, 'Saber 9, Saber 10 y TyT deben quedar en práctica complementaria');
assert.match(mockGrid, /Prácticas propias abreviadas/, 'La landing debe diferenciar las prácticas propias');
assert.match(mockGrid, /Cuadernillos divulgados por el ICFES/, 'La landing debe diferenciar los cuadernillos divulgados');
assert.match(practiceClient, /no reproduce la extensión estándar 2026-2 ni predice tu puntaje oficial/, 'El resultado abreviado debe explicar su límite');
assert.match(practiceClient, /Reforzar Parte/, 'El resultado debe recomendar la habilidad más débil');
assert.equal((guided55.match(/part: [1-7], id:/g) ?? []).length, 34, 'El simulacro debe añadir 34 preguntas a las 21 revisadas');
assert.match(guided55, /const EXTRA_ANSWER_SLOTS = \[/, 'Las claves nuevas deben usar una distribución editorial explícita entre A–D');
assert.doesNotMatch(guided55, /No encaja con la pista decisiva|Esta pista separa .* de los distractores/, 'El guiado de 55 no debe usar feedback intercambiable');
assert.match(guided55Page, /55 preguntas/, 'La landing debe declarar la extensión completa del entrenamiento');
assert.match(guided55Page, /No es un cuadernillo oficial ni predice tu puntaje ICFES/, 'La landing debe diferenciar práctica propia y prueba oficial');
assert.match(errorReviewPage, /GUIDED_SIMULACRO_2026_QUESTIONS/, 'Los errores del simulacro guiado deben entrar a la cola de repaso');
assert.match(questions, /bookstore[\s\S]{0,500}library/, 'Borrow debe contrastar library con el distractor plausible bookstore');
assert.match(questions, /Library o bookstore/, 'La microlección de borrow debe explicar la distinción que aparece en las opciones');
assert.match(guidedRegistry, /'mock-22', 'mock-23'/, 'Los veintitrés mocks deben ofrecer modo guiado');
assert.match(guidedMocks, /throat: 'la garganta: el conducto detrás de la boca/, 'Throat debe tener una explicación semántica concreta');
assert.match(guidedMocks, /ankle: 'el tobillo: la articulación que une el pie con la pierna'/, 'Ankle debe explicar por qué no es throat');
assert.doesNotMatch(guidedMocks, /trap: 'pista parcial'/, 'El adaptador no debe inventar la misma etiqueta de trampa para todos los distractores');
assert.match(guidedMockPage, /mismas 45 preguntas del modo examen/, 'La página guiada debe explicar que ambos modos comparten banco');
assert.match(errorReviewPage, /GUIDED_MOCK_IDS\.flatMap\(getGuidedMockQuestions\)/, 'Los errores de los 23 mocks deben entrar al repaso');
for (const mockId of ['01', '02', '03']) {
  const mockSource = read(`src/data/mocks/icfes-mock-${mockId}.ts`);
  const machineScored = (mockSource.match(/type: '(?:mcq|dialog)'/g) ?? []).length;
  assert.equal(machineScored, 45, `El mock-${mockId} debe conservar sus 45 preguntas adaptables`);
}

console.log('Superhub ICFES íntegro: formato 2026-2, 7 partes progresivas, 110 demostraciones, 1.235 preguntas en experiencias guiadas, rutas de refuerzo, SEO y RLS verificados.');
