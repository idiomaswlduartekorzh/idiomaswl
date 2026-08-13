# IELTS Academic Reading — contrato oficial 11 tipos ↔ 14 rutas

Fecha: 2026-08-09  
Rama observada: `codex/ielts-task2-introduction-pilot`  
HEAD observado: `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78`  
Resultado de la unidad: **PASS**

## Alcance

Esta unidad fija y hace visible la relación entre los **11 tipos numerados** que publica
IELTS para Academic Reading y las **14 rutas WeLearn** ya publicadas. IELTS agrupa
Summary, Note, Table y Flow-chart Completion en su tipo oficial 9; WeLearn conserva ese
hecho y separa las cuatro representaciones únicamente como rutas pedagógicas.

No se creó un banco nuevo, scoring, banda, pasaje ni simulacro. No hubo commit, push,
merge, rebase, despliegue ni publicación.

## Fuentes y límite de derechos

- Taxonomía y orden: [IELTS Academic: Reading test format](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading), verificada el 2026-08-09.
- Material oficial complementario conservado en las rutas: [IELTS Academic sample test questions](https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test).
- Límite de uso: [IELTS copyright and trade mark statement](https://ielts.org/legal/ielts-copyright-and-trade-mark-statement), revisado el 2026-08-09.
- Alcance local: nombres y numeración como referencia factual. No se copiaron preguntas,
  pasajes o logotipos oficiales; la UI declara que WeLearn es independiente y no está
  afiliado ni avalado por los IELTS Partners. Esto es un gate técnico local, no asesoría
  jurídica ni autorización de publicación.

## Resultado antes → después

| Superficie | Antes | Después |
|---|---|---|
| Taxonomía | La UI afirmaba o sugería “14 tipos oficiales” | Contrato versionado con 11 tipos y 14 rutas |
| Tipo 9 | Cuatro rutas presentadas como tipos oficiales separados | Un tipo oficial con cuatro rutas WeLearn explícitas |
| Integridad | Slugs, nombres y catálogo podían derivar sin un gate total | Matriz exacta número + ID + nombre + slugs protegida por test |
| Hub | Catálogo plano de rutas | Mapa 1–11 con estrategia WeLearn y excepción estructural visible |
| Motor mixto | Revelaba `questionType` y función del párrafo antes de responder | Tipo oculto hasta responder; función oculta hasta cerrar el set |
| Fuente | Sample questions disponible, sin fuente taxonómica exacta | Se conservan sample questions y se añade la fuente exacta de formato |
| Accesibilidad local | Breadcrumb visual del hub y rutas tipo 9 | `nav aria-label="Breadcrumb"`, `aria-current` y nombres ingleses con `lang="en"` |

## Matriz protegida

| # | Nombre oficial | Ruta(s) WeLearn |
|---:|---|---|
| 1 | Multiple choice | `multiple-choice` |
| 2 | Identifying information (True/False/Not given) | `true-false-not-given` |
| 3 | Identifying writer’s views/claims (Yes/No/Not given) | `yes-no-not-given` |
| 4 | Matching information | `matching-information` |
| 5 | Matching headings | `matching-headings` |
| 6 | Matching features | `matching-features` |
| 7 | Matching sentence endings | `matching-sentence-endings` |
| 8 | Sentence completion | `sentence-completion` |
| 9 | Summary/note/table/flow-chart completion | `summary-completion`, `note-completion`, `table-completion`, `flow-chart-completion` |
| 10 | Diagram label completion | `diagram-labeling` |
| 11 | Short-answer questions | `short-answer` |

## Implementación y evidencia

- Contrato fuente de verdad: `src/lib/ielts/academic-reading-question-types.ts`.
- Test semántico: `tests/ielts-reading-question-type-contract.test.mjs`.
- Hub: `src/app/(site)/practica/ielts/reading/tipos-de-preguntas/page.tsx`.
- Rutas corregidas del tipo 9: `summary-completion`, `note-completion`,
  `table-completion` y `flow-chart-completion`.
- Motor mixto: `src/components/exam-practice/IeltsReadingMixedQuestionTypeEngine.tsx`.
- Descripciones del catálogo: `src/data/practica-exams/seo-catalog.ts`.
- Runner reproducible: [`audit.mjs`](./audit.mjs).
- Resultado completo: [`playwright-audit.json`](./playwright-audit.json), SHA-256
  `21d812a107ecf0294c0de0cc62ebe228618b54cca1cdf7b1cdcb2f8dd0ae7d9f`.
- Capturas: [`desktop`](./contract-desktop-1440x900.png),
  [`mobile`](./contract-mobile-390x844.png) y
  [`respuesta por teclado`](./contract-after-keyboard-answer-1440x900.png).

Hashes finales principales:

| Archivo | SHA-256 |
|---|---|
| contrato | `455924c25a1e33355265497a5c51d4cdb7d34864b34d539f1a7b91bedf3ce3ec` |
| test | `e43d37641c16f2fa8985a8ce1ef3509db75db264b49e0f5267b1098f98ee0a11` |
| hub | `227ea39332edb7c605dc1354d427564c25e784b90da6748af1ac0053d202278b` |
| motor mixto | `7b3cbed1795604b2f188aeebefdaf058f00113fec0b0da16ae0bf87153e19772` |
| catálogo | `aebd26a1aa6a9cdae60f7b0208c3f5f6c3138889f8aeb4f3ae15efbe888734de` |

## Panel de auditoría

| Perspectiva | Dictamen | Evidencia de cierre |
|---|---|---|
| Derechos | ✅ | Referencia factual acotada, dos fuentes oficiales conservadas, disclaimer independiente y 0 material oficial copiado |
| Full-stack/datos | ✅ | Contrato versionado, lookup total/fail-fast, matriz exacta y cruce 1:1 con catálogo publicado |
| IELTS Reading independiente | ✅ | 11 nombres/números y agrupación del tipo 9 contrastados con fuente oficial en contexto limpio |
| Walkthrough cognitivo | ✅ | Distinción 11/14 comprensible desde hero; rutas hijas y motor ya no contradicen el mapa |
| Anti-sesgo/anti-atajos | ✅ | Orden oficial, separación de roles y 0 claves/tipos/funciones en atributos visibles pre-respuesta; la estadística de posición no aplica a un contrato sin respuestas |
| UI/UX | ✅ | Paridad local con Task 2, breadcrumbs semánticos, idioma local en nombres oficiales y cinco viewports sin overflow |
| Playwright | ✅ | 28/28 aserciones sobre build de producción local |

Las auditorías de experto y estudiante son simulaciones expertas, no firmas humanas ni
pruebas con estudiantes reales.

## Gates ejecutados

| Comando / superficie | Resultado |
|---|---|
| `node --experimental-strip-types --test tests/ielts-reading-question-type-contract.test.mjs` | ✅ 8/8 |
| ESLint de todos los archivos de la unidad | ✅ |
| `npx tsc --noEmit` | ✅ |
| `npm run check:practica-catalog` | ✅ 465 módulos protegidos |
| `npm run build` | ✅ 1263 páginas estáticas, rutas Reading incluidas |
| Playwright producción local | ✅ 28/28 |
| `npm run check:exam-practice-content` | ⚠️ conserva 8 fallos preexistentes de Task 2; 0 fallos Reading tras restaurar sample questions |

El warning `MODULE_TYPELESS_PACKAGE_JSON` del test directo es de configuración global de
Node y no cambia el resultado. La consola del navegador conserva 12 eventos CSP externos
allowlisted de Meta/GTM ya observados en el baseline; hubo 0 `pageerror`, 0 errores propios,
0 requests internas fallidas y 0 errores de hidratación.

## Playwright verificable

- 14/14 destinos: HTTP 200, un H1, canonical congruente y ausencia de “próximamente”.
- 11 `[data-official-type]` en orden 1–11 y 14 `[data-welearn-route]` únicos.
- El tipo 9 contiene exactamente cuatro rutas; los otros diez contienen una.
- Claim aprobado visible; `14 tipos oficiales` ausente.
- Hub y cuatro hijas del tipo 9: breadcrumb accesible, fuente exacta y explicación.
- Pre-respuesta: todos los tipos y funciones permanecen ocultos; 0 atributos de clave.
- Teclado: Enter responde; se revela solo el tipo del ítem contestado y no la función.
- Reload devuelve el motor al estado pre-respuesta.
- Overflow 0 en 320×568, 390×844, 768×1024, 1024×768 y 1440×900.
- Reflow equivalente a zoom 200 %: 1440×900 físico → 720×450 CSS, overflow 0.

## Deuda fuera del alcance

- La navegación/skip link global usa inglés en todas las superficies IELTS, incluso cuando
  la instrucción local está en español. Es deuda transversal anterior y se reserva para
  `Shell visual compartido con Task 2`; cambiarla aquí alteraría también Writing.
- El banco mixto histórico continúa 12/12 en la opción A y, por ser práctica con feedback
  inmediato en cliente, sus props contienen la clave. Esta unidad eliminó la fuga visible
  de tipo/función y verificó que no se serializa una clave en atributos DOM; no certifica
  balance estadístico ni secreto de Exam. Ambos gates pertenecen a filas posteriores.
- El contrato se ejecuta hoy mediante test directo. Integrarlo en un validador dedicado y
  prebuild pertenece a la siguiente fila `Validador dedicado y reporte anti-atajos`.
- No se corrigieron los ocho fallos ajenos de Task 2 ni cambios concurrentes de TOEFL.

## Siguiente unidad autorizable

`Inventario de contenido, procedencia y cuarentena`. Esta ejecución se detiene aquí para
respetar la regla de una fila por iteración.
