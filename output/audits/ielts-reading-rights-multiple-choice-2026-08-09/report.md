# IELTS Academic Reading — F0.2b.1 Multiple Choice audit gate

Fecha de corte: 2026-08-09  
Unidad: F0.2b.1 — expediente de tres pasajes Multiple Choice  
Estado: **PASS de la auditoría; 3/3 pasajes siguen en cuarentena**

## Resumen ejecutivo

- El control F0.2b.1 pasa; el banco no pasa. Ningún activo avanza al pipeline de
  publicación.
- La revisión experta independiente reprodujo 18/18 claves y encontró cero
  ambigüedades materiales, pero calificó la aptitud IELTS de los tres pasajes como
  `mixed`.
- De 12 claims factuales seleccionados, solo dos quedan respaldados por las fuentes
  candidatas; cinco son no trazables, cuatro están sobresimplificados y uno no está
  respaldado.
- La distribución A/B/C/D es 6/8/4/0 y la opción únicamente más larga es correcta en 10
  de 13 preguntas evaluables. La certificación editorial de balance queda bloqueada.

## Decisión por activo

| Activo | Preguntas | Derechos | Revisión factual | Revisión humana | Decisión |
|---|---:|---|---|---|---|
| `formative:multiple-choice:mc-sleep-learning` | 6 | `unknown-quarantined` | `not-reviewed` | `pending` | `quarantine` |
| `formative:multiple-choice:mc-river-restoration` | 6 | `unknown-quarantined` | `not-reviewed` | `pending` | `quarantine` |
| `formative:multiple-choice:mc-digital-notes` | 6 | `unknown-quarantined` | `not-reviewed` | `pending` | `quarantine` |

Cada activo conserva los mismos cinco códigos de bloqueo: `authorship-unresolved`,
`factual-review-incomplete`, `human-review-pending`, `module-not-declared` y
`rights-unresolved`.

## Procedencia, derechos y evidencia factual

El baseline fija la identidad de los tres objetos, sus pasajes, el catálogo público, la
ruta y el motor por SHA-256. El registro v2 conserva ocho fuentes candidatas:

- sueño y memoria: tres fuentes académicas;
- restauración de ríos: dos fuentes institucionales;
- apuntes digitales: estudio original, replicación y resultado nulo.

Siete URLs devolvieron HTTP 200. El DOI de Mueller y Oppenheimer resolvió al publisher,
que negó el fetch automatizado con HTTP 403. Reachability no equivale a verificación
factual, autoría, licencia o autorización.

La búsqueda de títulos y primeras frases fue dirigida y no exhaustiva. No localizó un
match exacto en los resultados revisados, pero ese resultado negativo no prueba
originalidad, propiedad ni ausencia universal. El claim visible de “pasajes cortos
originales” permanece observado y no verificado.

## Revisión IELTS en dos pases

El experto recibió primero `blind-review.json`, con pasajes, preguntas y opciones, pero
sin claves, feedback, explicaciones, trampas ni fuentes. Solo después de fijar sus
respuestas recibió `factual-source-review.json`, que mapea claims exactos a fuentes
candidatas sin revelar claves.

Resultado:

- 18/18 selecciones expertas coinciden con las claves actuales;
- cero ambigüedades materiales y una imprecisión menor en `mc-sleep-05`;
- los tres pasajes tienen `ieltsFitness: mixed`;
- distractores frecuentes con absolutos y contradicciones demasiado visibles;
- dificultad e inferencia por debajo de una simulación IELTS Academic exigente.

La coincidencia 18/18 demuestra respuesta interna estable; no demuestra equivalencia
oficial, calidad suficiente ni publicación segura.

## Claims que mantienen la cuarentena

| Evaluación | Claims |
|---|---:|
| `supported` | 2 |
| `oversimplified` | 4 |
| `unsupported` | 1 |
| `untraceable` | 5 |

Bloqueantes principales:

1. el estudio específico de pares de palabras del pasaje de sueño no corresponde a una
   fuente candidata trazable;
2. varias generalizaciones sobre ondas lentas, REM y rendimiento exceden la evidencia;
3. “Millgate” no se identifica en ninguna fuente y sus resultados, encuestas, loading
   bays y cafés no pueden verificarse;
4. los apuntes digitales necesitan atribución y mantener el matiz de replicaciones y
   resultados nulos.

## Walkthrough cognitivo

Una simulación separada de estudiante promedio trabajó exclusivamente con el packet
ciego. Cubrió 3/3 pasajes y registró 45 observaciones entre barreras, atajos, valor
formativo y acciones siguientes. No seleccionó respuestas, no asignó banda y no
representa a un estudiante real.

El valor pedagógico observable está en paráfrasis, alcance, conectores de contraste,
función de ejemplos, inferencia limitada y síntesis. Los atajos probables son matching
léxico, creencias previas y descarte mecánico de opciones absolutas.

## Anti-sesgo y anti-atajos

- correctas por posición: A=6, B=8, C=4, D=0;
- 13 preguntas tienen una opción únicamente más larga;
- esa opción es la correcta en 10/13 casos (`76,9 %`);
- 15 preguntas tienen una opción únicamente más corta y solo 2/15 son correctas;
- 54 permutaciones preservan la clave semántica;
- n=18 es menor que el umbral predeclarado de 100 para certificación estadística.

El control anti-sesgo obtiene PASS porque detecta y bloquea el patrón. El contenido
obtiene `blocked-editorial-rebalancing-required`; no está certificado como equilibrado.

## Dictamen del panel

- Derechos/procedencia ✅: expediente conservador completo, no clearance.
- Full-stack/datos ✅: contrato v2 fail-closed, hashes e invariantes reproducibles.
- IELTS ✅: auditoría ciega completa; contenido aún `mixed` y quarantined.
- Walkthrough cognitivo ✅: simulación content-only completa y sin claves.
- Anti-sesgo ✅: riesgo detectado, medido y convertido en bloqueo.
- UI/UX ➖: no cambió archivo learner-facing y catálogo/ruta/motor conservan hash.
- Playwright ➖: no cambió ruta, DOM ni interacción; no se finge una prueba browser.

## Guardianes ejecutados

- `node scripts/check-ielts-reading-multiple-choice-rights.mjs --write`: PASS.
- dos ejecuciones consecutivas de `--check`: PASS y hashes idénticos.
- `node --test tests/ielts-reading-multiple-choice-rights.test.mjs`: 9/9 PASS.
- `node --test tests/ielts-reading-rights-contract.test.mjs`: 8/8 PASS.
- ESLint focalizado: PASS.
- `npx tsc --noEmit`: PASS.
- `npm run check:practica-catalog`: 465 temas protegidos, PASS.
- `npm run build`: 1.263/1.263 páginas, PASS.
- `npm run check:exam-practice-content`: conserva ocho fallos preexistentes de Writing
  Task 2 y cero de Reading; no se silenciaron ni se corrigieron en esta unidad.
- Informe HTML: validation/package/Chromium verification PASS en 1440 y 390 px; cuatro
  métricas, dos gráficos, dos tablas y diálogo de fuentes.

## Artefactos y hashes SHA-256

| Artefacto | SHA-256 |
|---|---|
| `baseline.json` | `d2f4a13096cfb4485822a04e23b8a7afd451ca84735557bf47997add5ead3784` |
| `source-availability.json` | `713949d3807e62530abcce61b5ae4e09585d169ff45cf96ced70d0598e8eac65` |
| `blind-review.json` | `baa154728e991ec7b9826687d73aec008d34320e2906bbf4b523f53e721d0845` |
| `factual-source-review.json` | `ab8522ba791b47f496809dafa586682565ddea6e0a6acb6cfed2496b75aed8a7` |
| `expert-verdict.json` | `cf188e15b9ed9943f26425928b2470824827d606bf7694833fc5d8fe958391f3` |
| `student-walkthrough.json` | `b568aabeb15d6a9d839fc3250d7add6d2c9aedd772735e4c78bfce3c85316618` |
| `validation.json` | `d5f1fd1855b6975ad2cf1a12d05cbb22aca6f0cc8b76ff89771d9cff98e78a51` |
| `audit-verdicts.json` | `2785c17df26d417c764c926aff6796040d2f7cce2945e173061a506b63415725` |
| `artifact.json` | `c6bec67a3a899e4b10b518865471c5829e6190cc8c3915ac4a2c13a5aff34ac3` |
| `report.html` | `22d75cf766c70392b5fa4f9902589267a5427b386425f15f3ae7dbe5b3e9b59e` |
| contrato TS | `cabd4adf35c75a14a3537bb07e5db4ef9ce8bc0c1a6f4a276d25518732923643` |
| registry TS | `d3de9bdd09c14c9360b35ff7548894f25ef0044c9fe40c1d459b4ac02bcf777b` |
| validator F0.2b.1 | `299cff7736356547ffef034077ba5819aea6503661977962d8762cfc424516c2` |
| tests F0.2b.1 | `6248ee0529fcdc8cfcddb817769dd3a476d1e9ad8449e4e25aacc34b158e6449` |

## Siguiente frontera

F0.2b padre permanece abierto. La siguiente unidad es F0.2b.2 True/False/Not Given y no
se inició en esta iteración. Antes de publicar Multiple Choice siguen siendo obligatorios
autoría/derechos, revisión factual humana, reescritura de claims, mejora de distractores,
rebalanceo posicional y enforcement runtime.
