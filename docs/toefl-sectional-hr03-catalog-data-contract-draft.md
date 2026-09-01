# Anexo HR-03 — contrato de datos del catálogo de ejercicios

**Estado:** borrador técnico; requiere HR-03 y revisión académica; no modifica runtime

**Corte:** `d8827d2f`

## 1. Decisión de arquitectura propuesta

El hub y `/practica/toefl/ejercicios` deben consumir un registro pequeño de presentación. No deben extraer nombres, disponibilidad o conteos recorriendo los 20 mocks ni importando registros de scoring del servidor.

Ruta de trabajo sugerida después de la aprobación:

```text
src/data/practica/toefl-exercise-catalog.ts
```

El registro será público, sin respuestas correctas, secretos de scoring, transcripciones ni bancos completos.

## 2. Forma mínima

```ts
type ToeflExerciseSection = 'reading' | 'listening' | 'writing' | 'speaking';

type ToeflExerciseAvailability =
  | { kind: 'individual'; href: string; actionLabel: string }
  | { kind: 'mock-only'; href: '/examenes/toefl#practica'; actionLabel: string };

type ToeflExerciseCatalogItem = {
  id: string;
  section: ToeflExerciseSection;
  officialName: string;
  spanishExplanation: string;
  availability: ToeflExerciseAvailability;
  sourceRuleIds: readonly string[];
};
```

El tipo no incluye `coming-soon` como destino. “Individual próximamente” puede mostrarse como nota editorial en tareas `mock-only`, pero no genera URL.

## 3. Registro esperado de 12 tipos

| ID estable | Sección | Nombre | Disponibilidad | Regla fuente histórica |
|---|---|---|---|---|
| `reading-complete-words` | Reading | Complete the Words | individual | R-001 |
| `reading-daily-life` | Reading | Read in Daily Life | individual | R-002 |
| `reading-academic-passage` | Reading | Read an Academic Passage | individual | R-003 |
| `listening-choose-response` | Listening | Listen and Choose a Response | mock-only | L-001 |
| `listening-conversation` | Listening | Listen to a Conversation | mock-only | L-002 |
| `listening-announcement` | Listening | Listen to an Announcement | mock-only | L-003 |
| `listening-academic-talk` | Listening | Listen to an Academic Talk | mock-only | L-004 |
| `writing-build-sentence` | Writing | Build a Sentence | individual | W-001 |
| `writing-email` | Writing | Write an Email | individual/guía+banco | W-002 |
| `writing-academic-discussion` | Writing | Write for an Academic Discussion | individual/guía+banco | W-003 |
| `speaking-repeat` | Speaking | Listen and Repeat | mock-only | S-001 |
| `speaking-interview` | Speaking | Take an Interview | mock-only | S-002 |

Los IDs son internos y estables. El nombre oficial visible no se deduce del título libre de una sección de mock.

## 4. Destinos exactos

| ID | `href` |
|---|---|
| `reading-complete-words` | `/practica/toefl/reading/formato-2026/complete-the-words` |
| `reading-daily-life` | `/practica/toefl/reading/formato-2026/read-in-daily-life` |
| `reading-academic-passage` | `/practica/toefl/reading/formato-2026/read-an-academic-passage` |
| `writing-build-sentence` | `/practica/toefl/writing/build-a-sentence` |
| `writing-email` | `/practica/toefl/writing/write-an-email` |
| `writing-academic-discussion` | `/practica/toefl/writing/academic-discussion` |
| seis tareas mock-only | `/examenes/toefl#practica` |

Las páginas Email y Academic Discussion son guías que conducen a sus bancos. El `actionLabel` debe comunicar `Abrir guía y banco de prompts`, no fingir un runner inmediato.

## 5. Derivaciones permitidas

Desde el registro se derivan:

- los conteos 3/4/3/2;
- la vista previa del hub;
- los cuatro clústeres del catálogo;
- labels y destinos;
- datos del guardián T02–T10;
- una exportación liviana para el registro SEO, si se decide automatizarla.

No se escriben por separado `12 tipos`, `3/4/3/2` o seis rutas en múltiples componentes sin una comprobación automática.

## 6. Fuentes que no deben alimentar directamente la UI

### `src/data/mocks/toefl-set-*.ts`

Contienen los bancos y títulos operacionales de cada set. Son evidencia de disponibilidad en mocks, no un catálogo editorial canónico. Recorrerlos desde el hub aumentaría acoplamiento y riesgo de cargar datos innecesarios.

### `src/server/toefl/*-registry.ts`

Son registros `server-only` de scoring y paridad. Nunca se importan en componentes públicos del catálogo.

### `src/data/practica-exams/seo-catalog.ts`

Es una fuente de contenido extenso para rutas profundas. Puede validar que una ruta individual existe, pero no debe obligar al hub liviano a cargar bancos, FAQs y ejercicios completos.

## 7. Bloqueo documental descubierto

Veinte archivos `src/data/mocks/toefl-set-*.ts`, el contrato de fidelidad y el loop histórico apuntan a:

```text
docs/toefl-ibt-2026-official-format.md
```

Ese archivo no existe en el árbol actual. Git conserva una versión en el commit de archivo `7da796a4`, con registro `2026-08-09.v2` y fecha de revisión `2026-09-09`. `docs/toefl-2026-review-blueprint.md` regula entrega, scoring y revisión; no reemplaza el registro de formato/tareas.

**Regla de harness:** no restaurar silenciosamente el documento archivado ni copiar sus claims. Antes de HR-04, una revisión académica debe elegir y registrar una de estas salidas:

1. restaurar y revalidar el registro versionado contra fuentes oficiales vigentes;
2. crear una versión nueva y actualizar todas las referencias;
3. declarar otro documento vivo como fuente normativa y retirar referencias rotas.

Hasta entonces, los `sourceRuleIds` de este anexo son referencias históricas, no una revalidación académica de 2026.

## 8. Guardas del contrato

El futuro checker debe fallar si:

- no hay exactamente 12 IDs únicos;
- la distribución no es 3/4/3/2;
- una tarea individual no resuelve a `page.tsx`;
- una tarea mock-only apunta a una ruta individual;
- un item importa o expone una clave de respuesta;
- `sourceRuleIds` está vacío;
- el anchor de mocks deja de existir;
- una tarea histórica aparece en el catálogo vigente;
- el catálogo y las guías discrepan en el nombre visible.

Este contrato prepara una única fuente liviana para la implementación; no crea todavía el archivo de runtime ni valida claims académicos.
