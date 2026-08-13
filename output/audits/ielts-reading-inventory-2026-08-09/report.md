# IELTS Academic Reading — evidencia F0.1

Fecha: 2026-08-09  
Unidad cerrada: `F0.1 Censo canónico, grain e identidad por hashes`  
Unidad padre: `Inventario de contenido, procedencia y cuarentena` — permanece abierta

## Resultado

F0.1 pasa sus cuatro auditorías aplicables. El censo identifica de forma reproducible
120 ocurrencias learner-facing, 310 grupos y 1.152 decisiones. De las 116 ocurrencias
con texto extraíble surgen 115 pasajes canónicos por hash: un texto se reutiliza en dos
activos. Cuatro sets de aprendizaje no contienen un pasaje completo extraíble.

El resultado no aprueba contenido. Los 120 activos carecen de `rightsBasis`, autor,
revisor y fuentes factuales estructuradas; por tanto, los 120 se clasifican de forma
provisional como `unknown-quarantined`. El censo registra 120 contradicciones entre esa
clasificación y la exposición actual en runtime. Resolver derechos y hacer cumplir la
cuarentena pertenecen a F0.2–F0.4.

Informe portable validado: [report.html](./report.html)

## Estado de repositorio preservado

- Rama: `codex/ielts-task2-introduction-pilot`.
- HEAD observado: `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78`.
- `origin/main` observado: `1181433edfc7e10362a88c66e9377b4829a4761f`.
- Divergencia `origin/main...HEAD`: `0 5`.
- El worktree ya contenía cambios ajenos de Writing Task 2, Reading contract y TOEFL;
  se preservaron. F0.1 no editó rutas, componentes ni bancos de producto.
- No se hizo commit, push, merge, rebase, deploy, cambio de remoto ni publicación.

## Baseline y antes → después

Antes de F0.1 existían conteos agregados —42 activos formativos, 17 de habilidades,
60 secciones mock y un ejercicio legado—, pero no un manifiesto por ocurrencia con
localizador, grano, identidad de objeto, identidad de texto, estado de módulo y
clasificación conservadora de derechos.

Después:

- 120/120 `assetId` únicos y 120/120 pares `sourcePath + sourceLocator` únicos;
- 59 IDs declarados y 61 IDs sintéticos deterministas para el snapshot;
- 47 archivos fuente locales identificados y hasheados;
- 20 imports, 20 keys públicas y correspondencia exacta
  `ielts:set-N → ieltsSetN → ielts-set-N.ts → mock.id set-N`;
- 116 ocurrencias textuales → 115 pasajes canónicos;
- un duplicado exacto: TFNG `urban-trees` y skimming `urban-trees`;
- 119 módulos `academic` inferidos, nunca presentados como declarados;
- el hub legado queda `missing-or-ambiguous` porque su metadata mezcla Academic y
  General Training mientras la descripción y JSON-LD dicen Academic;
- 59 activos están bajo claims visibles de originalidad sin procedencia estructurada;
- el hub legado añade un claim visible de “pasaje real” también no verificado;
- 120/120 `unknown-quarantined` y 120/120 contradicciones runtime registradas;
- escaneo recursivo real del inventario y paquete ciego: 0 campos de clave/opciones y
  0 campos o valores PII detectados.

## Procedencia, derechos y fuentes

La regla conservadora se contrastó con:

- [IELTS copyright and trade mark statement](https://ielts.org/legal/ielts-copyright-and-trade-mark-statement)
- [IELTS Academic Reading test format](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading)
- [IELTS Academic sample questions](https://www.ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test)

La disponibilidad de materiales oficiales no se trató como licencia de republicación.
La clasificación de F0.1 es editorial y provisional, no una conclusión jurídica.

Una búsqueda dirigida y no exhaustiva encontró una coincidencia de alta confianza entre
las tres secciones de `set-1` y la secuencia de Cambridge IELTS 5 Academic Reading Test 2.
Solo se revisaron [esta identificación de la secuencia](https://www.babarenglish.com/post/cambridge-ielts-academic-5-reading-test-1-answers-with-explanation)
y [esta identificación del tercer pasaje](https://ieltsdeal.com/ielts-academic-reading-cambridge-5-test-2-reading-passage-3-the-birth-of-scientific-english-with-best-solutions-and-best-explanations/).
No se localizó evidencia de autorización en esas páginas. Esto prioriza revisión; no
demuestra titularidad, infracción, ausencia universal de licencia ni resultado alguno
para los otros 117 activos.

## Panel de auditoría

| Carril | Estado | Alcance exacto |
|---|:---:|---|
| Derechos y procedencia | ✅ | Censo y clasificación conservadora; no clearance |
| Full-stack y datos | ✅ | Cobertura, grano, hashes, registry y determinismo |
| IELTS independiente a ciegas | ✅ | Verdad y exhaustividad del censo; no resolución de ítems |
| Walkthrough cognitivo | ➖ | No cambió ningún flujo learner-facing |
| Anti-sesgo, anti-atajos y anti-fugas | ✅ | Cobertura completa y paquete ciego sin claves/PII |
| UI/UX y accesibilidad | ➖ | No cambió una superficie educativa o componente visual |
| Playwright de producto | ➖ | No cambió DOM ni comportamiento navegable |

Los tres `➖` son reproducibles: el diff de F0.1 contiene únicamente extractor,
manifiestos, reporte y documentación. La validación Chromium del HTML técnico no se usa
para fingir paridad UI con Task 2 ni pruebas de producto.

## Artefactos y hashes

| Artefacto | SHA-256 |
|---|---|
| [inventory.json](./inventory.json) | `28197d216dfc1b7d544a2b2e5d14427353ff4efa2500f727fcabae2d8f6cd126` |
| [inventory.tsv](./inventory.tsv) | `950fdf07b75bceb736df8a7d0269a95751f9c6a57fe9625474b1ef00e35fbb5c` |
| [blind-review.json](./blind-review.json) | `aadda81bcff943c32835a2d2fdf6fef129f8c71006077b7ca8e48056a170258d` |
| [audit-verdicts.json](./audit-verdicts.json) | `b20dd8a0ddd65d4d92407cfbaa5bfbbf7323041b43f339437d0b20412b3e14d5` |
| [artifact.json](./artifact.json) | `99f48daf729c1abc54c6d52919178ee5831a91f0c677e04c9791cdb980588fbf` |
| [report.html](./report.html) | `854d1eb2683dbc77ce758cb47e0ee2046c40cde02df0619119e6ac3a26ac95ab` |
| [extract-inventory.mjs](./extract-inventory.mjs) | `d0c10900b996c4b56b427398451908376b03b902e8626784866595543f6aab08` |
| [build-report.mjs](./build-report.mjs) | `0df3d8efe21832c11487cd4a285ae5a0d2995bab71354cc54b496ff0ec06b268` |

`sourceIdentity.combinedSha256` del universo fuente allowlisted:
`01ba66e1af5107f5bc583bca2d1bc1f9d1a4b5ef77872cf744012f89f58012c6`.

## Comandos y guardianes

- `node --check .../extract-inventory.mjs` — PASS.
- `node .../extract-inventory.mjs --write` — PASS.
- `node .../extract-inventory.mjs --check` — PASS repetido, hashes idénticos.
- `node --check .../build-report.mjs` — PASS.
- `npx eslint .../extract-inventory.mjs .../build-report.mjs` — PASS.
- `npm run check:practica-catalog` — PASS, 465 temas protegidos.
- `npx tsc --noEmit` — PASS.
- `npm run build` — PASS, 1.263 páginas estáticas generadas.
- `npm run check:exam-practice-content` — FAIL por ocho expectativas previas de Writing
  Task 2; 0 fallos Reading. No se silenciaron ni se corrigieron dentro de F0.1.
- Empaquetador portable — PASS final: validación, package y verificación Chromium; un
  gráfico, cinco métricas, seis tablas, viewports 1440/390 y diálogo de fuentes.

## Límites y siguiente subunidad

- Los 61 IDs sintéticos identifican este snapshot; no sustituyen IDs editoriales
  versionados.
- Un hash canónico identifica una versión textual exacta, no continuidad editorial tras
  una edición.
- Los 310 grupos y 1.152 decisiones son conteos, no contratos estables de ítem.
- No se auditaron claves, evidencia, dificultad, factualidad, distractores ni eficacia.
- No se resolvieron ítems ni se inventó revisión humana.
- No se aplicó todavía la cuarentena en runtime.

Siguiente subunidad, sin iniciarla aquí: `F0.2 Adjudicación de procedencia, rightsBasis y
fuentes factuales`.
