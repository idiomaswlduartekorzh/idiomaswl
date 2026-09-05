# Sistema de agentes y harness editorial para tiempos alemanes

Este documento opera la campaña que alinea las nueve formas alemanas pendientes con el recorrido de
seis niveles aprobado en Präsens. El contrato pedagógico vive en
[`quiz-tiempos-aleman-blueprint.md`](quiz-tiempos-aleman-blueprint.md); este archivo define quién
trabaja, qué evidencia produce y cómo se bloquea una entrega defectuosa.

## Decisión de alcance

El quiz ya contiene Präsens, Perfekt con `haben`, Perfekt con `sein`, Präteritum,
Plusquamperfekt, Futur I, Futur II, `würde + Infinitiv`, irreale Vergangenheit e Imperativ.
La primera campaña no crea identificadores nuevos: toma Präsens como referencia aprobada y revisa
las otras nueve formas.

La fase 0 debe corregir dos riesgos antes de ampliar el inventario:

- selección de `haben/sein` por lema, sentido y valencia, no por una expresión regular superficial;
- unidades verbales completas en el nivel 6. Un hueco que pide solo `hat`, `sein`, `wird` o un
  participio aislado no cumple la promesa actual del nivel.

Después de esa alineación, las expansiones candidatas son: contraste mixto `haben oder sein`,
modales, Konjunktiv II sintético, voz pasiva y Konjunktiv I. Cada una requiere una decisión de
producto y una especificación nueva antes de entrar en la campaña.

## Componentes ejecutables

| Ruta | Función |
|---|---|
| `config/german-tense-harness/policy.json` | Roles, estados, cobertura y puertas obligatorias |
| `config/german-tense-harness/campaign.json` | Cola, referencia y regla de trabajo paralelo |
| `config/german-tense-harness/forms/*.json` | Contrato lingüístico keyed por `formId` |
| `config/german-tense-harness/approvals.json` | Aprobaciones humanas ligadas a huellas |
| `config/german-tense-harness/*.schema.json` | Formato de órdenes, candidatos e informes |
| `.claude/agents/german-*.md` | Prompts versionados de los ocho roles |
| `scripts/lib/german-tense-harness-core.mjs` | Huellas, inventario, validación y estados derivados |
| `scripts/german-tense-harness.mjs` | CLI de inventario, siguiente forma y scaffold |
| `scripts/check-german-tense-agents.mjs` | Guardián estático conectado a `prebuild` |
| `tests/german-tense-harness.test.mjs` | Regresiones del propio harness |

## Agentes y separación de funciones

1. `german-tense-coordinator` fija la orden, commit base, alcance y huellas.
2. `german-tense-author` entrega un candidato JSON; no toca el runtime.
3. `german-morphology-auditor` resuelve a ciegas y revisa forma, concordancia y orden.
4. `german-auxiliary-auditor` revisa `haben/sein` cuando la construcción lo exige.
5. `german-pedagogy-auditor` revisa progresión, pistas, duplicados y continuidad.
6. `german-adversarial-auditor` intenta romper las claves y prueba mutaciones negativas.
7. `german-tense-integrator` es el único que modifica `src/data/practica` y ejecuta puertas.
8. `german-tense-release-warden` emite `PASS/FAIL`; no corrige, integra ni publica.

El máximo es cuatro agentes activos. Los autores nunca editan en paralelo
`german-advanced-editorial.ts`; producen artefactos por forma y el integrador aplica uno por vez.

## Huellas y estados

Cada orden congela cuatro huellas SHA-256:

- `baselineContentFingerprint`: contenido materializado al abrir la orden;
- `specFingerprint`: reglas de la forma;
- `promptFingerprint`: conjunto de instrucciones de los agentes.
- `harnessFingerprint`: núcleo, política y schemas que juzgan la evidencia.

El autor entrega `candidate` con `runtime`, anotaciones y fuentes, además de su
`candidateFingerprint`. Todos los auditores deben usar esa misma huella. El integrador demuestra
que `runtimeContentFingerprint` coincide con la huella de `candidate.runtime`; el candidato completo
no se compara con el runtime. Cambiar
contenido, especificación, prompts o validadores invalida los dictámenes anteriores.

El validador del candidato exige diez anotaciones por nivel del 1 al 5, una anotación para la
historia del nivel 6, cobertura runtime completa y el mínimo de palabras de la unidad verbal definido
por cada forma. Así, por ejemplo, Perfekt no puede entregar solo el participio y Futur II no puede
omitir `werden` o el auxiliar heredado.

Los estados se calculan; no se escriben a mano:

```text
MISSING_SPEC
  → NEEDS_DRAFT
  → BLOCKED_SCHEMA
  → BLOCKED_LINGUISTIC
  → BLOCKED_PEDAGOGY
  → BLOCKED_RUNTIME
  → READY_FOR_HUMAN_REVIEW
  → APPROVED
```

Un informe faltante o un solo `FAIL` bloquea. No hay votación por mayoría. La aprobación humana
solo vale para la huella exacta revisada.

## Operación

Ver el inventario y la próxima forma:

```bash
npm run german:harness:inventory
npm run german:harness:next
```

Abrir una orden aislada:

```bash
npm run german:harness:scaffold -- --form=perfekt-haben --run=round-1
```

El scaffold crea:

```text
artifacts/german-tense-harness/<form>/<run>/
  work-order.json
  author.json
  morphology.json
  auxiliary.json       # solo cuando aplica
  pedagogy.json
  adversary.json
  integration.json
  release.json
```

Los artefactos de una ejecución son evidencia de trabajo. No se copian a otra forma ni se reutilizan
después de un cambio de huella.

Puertas estáticas y pruebas del harness:

```bash
npm run check:german-tense-harness
npm run test:german-tense-harness
npm run check:tense-quests
```

El integrador ejecuta además TypeScript, ESLint, catálogo y el E2E alemán completo. El build se
ejecuta una vez, al final de la campaña o antes de integrar, nunca en paralelo con varios agentes.

## Reglas específicas de auxiliares

- Perfekt con `haben`: `haben + Partizip II`; usos transitivos, reflexivos y actividades sin cambio
  dirigido.
- Perfekt con `sein`: `sein + Partizip II`; movimiento dirigido, cambio de estado y excepciones
  léxicas licenciadas.
- Plusquamperfekt: `hatte/war + Partizip II`, heredando el auxiliar del Perfekt.
- Futur II: `werden + Partizip II + haben/sein`, con el mismo auxiliar léxico.
- Pasado irreal: `hätte/wäre + Partizip II`, también heredado del Perfekt.

Los verbos regionalmente variables como `liegen`, `sitzen` y `stehen` se evitan en retos binarios o
declaran sus variantes. Los verbos separables forman el participio con `ge` entre partícula y raíz;
los prefijos inseparables y los verbos en `-ieren` no reciben ese `ge`.

Fuentes de referencia consultadas el 5 de septiembre de 2026:

- Goethe-Institut, [Deutsche Grammatik](https://www.goethe.de/ins/de/de/m/prf/grm.html).
- Leibniz-Institut für Deutsche Sprache, [Perfektbildung mit haben oder sein](https://grammis.ids-mannheim.de/progr%40mm/5316).
- Duden, [Verzeichnis der Fachausdrücke: Verbpartikel y Verbpräfix](https://www.duden.de/Fachausdr%C3%BCcke-Buchstabe-T-V).
- Duden, [Die Verbformen](https://shop.duden.de/media/02/88/fd/1687432582/Leseprobe_9783411743230_Ganz_einfach%21_Deutsche_Grammatik.pdf).

Las fuentes orientan el contrato; el auditor debe verificar cualquier caso dudoso por sentido y no
convertir una regla didáctica general en una prohibición absoluta.
