# Quizzes de idiomas — blueprint operativo para nuevas implementaciones

Fuente canónica para construir o ampliar quizzes en `/herramientas/quizes` sin reconstruir el
contexto de las sesiones anteriores. Estado verificado: 23 de agosto de 2026.

Este documento manda sobre notas históricas cuando describe la arquitectura actual. Para las
decisiones lingüísticas por idioma sigue mandando
[`quiz-tiempo-estructura-multilingue-blueprint.md`](quiz-tiempo-estructura-multilingue-blueprint.md).

## 1. Qué producto existe

El estudiante elige las formas o contrastes que quiere practicar y completa seis niveles. No ve
aciertos, errores ni soluciones hasta cerrar el nivel. El motor corrige con bancos cerrados y
respuestas explícitas; no usa IA, similitud ni autocorrección.

Flujo estable:

```text
selección → nivel en curso ↔ revisar respuestas → resumen del nivel → siguiente nivel
     │                 │                              │
     └── URL compartible┴── intento en localStorage ──┘
```

La familia de tiempos tiene rutas para italiano, inglés, francés, portugués, alemán, ruso,
japonés y coreano. La familia de pronombres inicia con un piloto italiano bajo
`/herramientas/quizes/pronombres/italiano`; su contrato específico está en
[`quiz-pronombres-blueprint.md`](quiz-pronombres-blueprint.md).

## 2. Arquitectura real

| Archivo | Responsabilidad |
|---|---|
| `src/components/practica/TenseQuestEngine.tsx` | Estado, URL, persistencia, navegación, puntuación, foco y seis mecánicas |
| `src/components/practica/PronounQuestEngine.tsx` | Motor cerrado de referente, función, posición, reparación, transformación y cadena final |
| `src/components/practica/TenseQuestEngine.module.css` | Adaptaciones propias del motor sobre el sistema visual de Práctica |
| `src/data/practica/tense-quest-types.ts` | Contrato tipado de configuración y retos |
| `src/data/practica/create-structure-quest.ts` | Factoría determinista para bancos con tres ejemplos por forma |
| `src/data/practica/*-structure-quest.ts` | Contenido declarativo de francés, portugués, alemán, ruso, japonés y coreano |
| `src/data/practica/english-tense-quest.ts` | Banco editorial extendido de inglés |
| `src/data/practica/italian-tense-quest.ts` | Banco editorial de italiano |
| `src/data/practica/italian-tense-quest-config.ts` | Adaptación del banco italiano al motor común |
| `scripts/check-tense-quests.mjs` | Guardián estructural, pedagógico y de cobertura |
| `tests/tense-quests.test.mjs` | Regresiones de distribución, pistas y variantes normativas |
| `tests/e2e/tense-quests.spec.ts` | Recorrido real del catálogo, ocho rutas y seis niveles |
| `src/styles/practica-ui.css` | Primitivas visuales `wlp-*` compartidas con Práctica |
| `src/app/(site)/herramientas/quizes/page.tsx` | Catálogo público de quizzes |
| `src/app/(site)/herramientas/quizes/[idioma]/page.tsx` | Metadata, datos estructurados y montaje del motor |

Las rutas son Server Components. Solo el motor interactivo es Client Component. No se crea una
copia del motor por idioma.

## 3. Cuándo reutilizar la factoría

Usa `createStructureQuest()` si el nuevo quiz cumple estas condiciones:

- trabaja formas, estructuras o contrastes seleccionables;
- cada objetivo puede declarar tres contextos inequívocos;
- las seis mecánicas actuales tienen sentido pedagógico;
- la corrección puede expresarse mediante respuestas cerradas.

No fuerces esta factoría para vocabulario abierto, comprensión lectora, audio, pronunciación o
producción libre. En esos casos se reutilizan el sistema visual, la corrección diferida, la
persistencia y los guardianes como principios, pero se crea un motor de dominio separado.

### Cuando el nuevo quiz pertenece a otra familia

Para vocabulario, escucha, lectura, pronunciación u otro dominio, se crea una familia paralela
con el mismo esqueleto operativo:

- motor propio en `src/components/practica/`;
- tipos y banco de contenido en `src/data/practica/`;
- ruta bajo `src/app/(site)/herramientas/quizes/`;
- tarjeta explícita en el catálogo;
- guardián editorial propio, conectado a `prebuild`;
- pruebas unitarias del dominio y E2E del flujo real;
- persistencia versionada, navegación por URL y feedback diferido cuando corresponda.

Lo que se comparte entre familias es el contrato de experiencia, no necesariamente el modelo de
datos.

## 4. Contrato editorial mínimo por forma

Cada objetivo seleccionable declara:

- `id` estable y semántico;
- etiqueta visible y grupo;
- exactamente tres ejemplos con un solo marcador `___`;
- respuesta, lema, pista funcional y explicación;
- tres distractores únicos y plausibles por ejemplo;
- forma incorrecta explícita para el laboratorio de reparación;
- variantes aceptadas solo si son normativas para el mismo significado y registro;
- una fila dentro de la reconstrucción final.

La factoría deriva por objetivo:

| Nivel | Mecánica | Cobertura mínima |
|---|---|---:|
| 1 | Opción múltiple contextual | 3 ítems |
| 2 | Microtextos con conjugación | 3 ítems |
| 3 | Recuperación acumulativa | 2 bloques |
| 4 | Seleccionar error y corregir | 2 retos |
| 5 | Clasificar función en mapa | 3 ranuras |
| 6 | Reconstrucción con banco | 1 aparición |

El nivel 3 reutiliza deliberadamente casos anteriores para pasar de reconocimiento a producción.
Se llama recuperación acumulativa; no se vende como una colección de relatos nuevos.

## 5. Reglas pedagógicas que no se negocian

1. El contexto debe hacer inequívoca la respuesta. Si dos formas son defendibles, se reescribe.
2. No se importan categorías europeas a idiomas que no las tienen. Japonés usa no-pasado;
   ruso explicita aspecto; coreano explicita nivel de habla.
3. Partículas, auxiliares, negación y adverbios móviles entran en el hueco cuando su posición es
   parte del objetivo. No se deja un fragmento fijo que pueda duplicarse o quedar mal ordenado.
4. Las variantes normativas se enumeran en `accepted`; nunca se infieren por similitud.
5. La normalización solo aplica NFKC, apóstrofos, mayúsculas no significativas y espacios.
6. Cada hueco puntúa una decisión lingüística. Un texto con tres huecos vale tres puntos.
7. No se muestra ninguna señal de corrección antes de terminar el nivel.
8. Una selección de una sola forma conserva al menos tres distractores en el nivel final.
9. La respuesta correcta de opción múltiple se distribuye entre A, B, C y D.
10. El token erróneo se distribuye entre las tres posiciones seleccionables.
11. Una pista funcional nunca repite literalmente su respuesta.
12. Todo banco avanzado se revisa con una fuente primaria o con una persona competente en el
    idioma antes de publicarse.

## 6. Receta para añadir un idioma o banco nuevo

### Paso 1 — Escribir el mapa lingüístico

Antes del código, documenta:

- nivel CEFR aproximado;
- variedad o registro editorial;
- inventario de objetivos;
- contrastes que suelen confundir al hispanohablante;
- variantes aceptadas y las que cambian significado o registro;
- fuentes lingüísticas primarias usadas para resolver dudas.

### Paso 2 — Crear el archivo de datos

Para un banco generado, toma como referencia
`src/data/practica/french-structure-quest.ts` y exporta una constante con
`createStructureQuest(...)`. Mantén IDs en ASCII aunque el contenido use otro sistema de
escritura.

Para un banco editorial con necesidades excepcionales, usa los tipos de
`tense-quest-types.ts` directamente y toma inglés o italiano como referencia. La excepción debe
estar motivada por pedagogía, no por preferencia de código.

El `storageKey` es único y termina en versión:

```ts
storageKey: 'wl-<idioma>-structure-quest-v1'
```

Se incrementa la versión cuando cambia el significado de IDs, respuestas, niveles o estado
persistido. Un cambio solo visual no requiere invalidar intentos.

### Paso 3 — Crear la ruta

La página de idioma incluye:

- `metadata` con canonical y Open Graph;
- `GrammarLessonSchema`;
- `QuizSchema`;
- una única instancia de `TenseQuestEngine` con su configuración.

No copies JSX del motor. No importes todos los bancos desde la ruta: cada página debe enviar al
cliente solo su idioma.

### Paso 4 — Registrar todos los puntos manuales

Hoy el descubrimiento no es automático. Un idioma nuevo debe añadirse en estos cuatro lugares:

1. catálogo `src/app/(site)/herramientas/quizes/page.tsx`;
2. imports, `GENERATED_CONFIGS` y `allConfigs` de `scripts/check-tense-quests.mjs`;
3. `CONFIGS` de `tests/tense-quests.test.mjs`;
4. `ROUTES` de `tests/e2e/tense-quests.spec.ts`.

Si se omite uno, el quiz puede existir visualmente pero quedar fuera de una barrera de calidad.

### Paso 5 — Añadir regresiones lingüísticas

Cuando se incorpora una variante cuya pérdida sería fácil —contracción inglesa, omisión
conversacional japonesa, `ё/е` rusa—, añade una aserción explícita en
`tests/tense-quests.test.mjs`. El guardián de estructura no puede decidir por sí solo si una
variante es normativa.

## 7. Contrato visual

Los quizzes pertenecen visualmente a Práctica aunque su URL viva bajo Herramientas.

- El layout de `/herramientas` carga `src/styles/practica-ui.css`.
- El lienzo usa `wlp-page` y `wlp-shell`.
- El acento es `SKILL_ACCENT.gramatica.var`.
- Encabezados: `wlp-hero wlp-hero--compact`.
- Tarjetas: `wlp-card`; caminos o contenedores principales: `wlp-card--path`.
- Botones, opciones, niveles, progreso y navegación usan las primitivas `wlp-*` existentes.
- Radios permitidos: 4, 6, 8 px y píldora mediante variables `--wlp-r-*`.
- No se reintroducen banderas, emojis, degradados o un color por idioma en el catálogo.
- No se añaden paneles de métricas genéricos al hero.
- El mapa temporal es la única firma propia del motor y permanece compacto en móvil.
- Controles táctiles: mínimo 44 × 44 px; foco visible y `prefers-reduced-motion` respetado.

La línea base actual del catálogo es de nueve tarjetas. Al añadir otra, el conteo esperado del E2E
debe actualizarse deliberadamente. Todas deben usar `wlp-card--path`, un solo acento de Gramática
y cero tarjetas heredadas `wl-catalog-card`.

## 8. Estado, URL y accesibilidad

- La selección vive en `?forms=id-1,id-2` y el nivel en `?level=1..6`.
- La URL nunca contiene respuestas o puntajes.
- El intento activo y mejores puntajes viven en el `storageKey` versionado.
- Recargar restaura selección, nivel, ítem y respuestas.
- Cambiar selección pide confirmación si hay progreso no finalizado y limpia `forms` y `level`.
- Estado local o parámetros corruptos regresan a una configuración segura.
- Tabs usan `aria-controls`, `aria-selected`, `tabpanel` y navegación con flechas.
- Al avanzar se enfoca el título del reto; al cerrar, el título del resultado.
- El resumen anuncia el resultado con `role="status"`.
- Inputs y selects tienen `name`, etiqueta accesible y `lang` del idioma meta.
- La página mantiene un único landmark `main`, aportado por el layout del sitio.

## 9. Guardianes existentes

`npm run check:tense-quests` ejecuta el guardián y las pruebas de datos. Falla ante:

- IDs duplicados o referencias a formas inexistentes;
- niveles distintos de seis;
- opciones duplicadas o respuesta ausente;
- segmentos y huecos desalineados;
- errores sin token o corrección válida;
- mapas sin funciones plausibles o con pista literal;
- banco final desalineado, ambiguo o con tarjetas reutilizadas;
- cobertura inferior al mínimo;
- posiciones correctas o errores desequilibrados;
- `storageKey` repetido o sin versión.

El motor añade distractores del pool activo hasta completar al menos cuatro tarjetas cuando la
selección tiene una sola forma. El banco editorial base sigue declarando una tarjeta por hueco;
no se meten distractores falsos en los datos solo para satisfacer la UI.

## 10. Batería obligatoria

Durante desarrollo:

```bash
npm run check:tense-quests
npx tsc --noEmit --pretty false
npx eslint <archivos-ts-tsx-tocados>
BASE_URL=http://localhost:<puerto> npx playwright test tests/e2e/tense-quests.spec.ts --project=chromium
```

Usa `localhost` si Next anuncia `localhost`; mezclarlo con `127.0.0.1` bloquea HMR en desarrollo y
puede desmontar el componente durante un clic.

Antes de integrar, en este orden y sobre el `main` más reciente:

```bash
git fetch origin
git rebase origin/main          # o merge; nunca integrar una rama atrasada
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

No se reducen umbrales ni se silencian guardianes. Si `check:practica-catalog` detecta pérdida de
escucha, IELTS, ICFES u otro módulo protegido, se recupera el contenido desde `origin/main`.

Después del despliegue:

```bash
BASE_URL=https://www.idiomaswl.com npx playwright test tests/e2e/tense-quests.spec.ts --project=chromium
```

La publicación solo termina cuando Vercel está `Ready`, el alias público apunta al deployment y
la suite pasa sobre el dominio, no solo sobre la URL temporal.

## 11. Errores ya encontrados — no repetir

- Dejar una partícula fija y pedir solo el verbo produjo respuestas imposibles de reordenar.
- Poner siempre la correcta en B permitía aprobar sin leer.
- Colocar siempre el error en el primer token convertía el nivel 4 en reconocimiento de patrón.
- Mostrar la misma palabra en pista y respuesta resolvía el mapa por coincidencia literal.
- Un banco 1:1 revelaba la respuesta sin conocimiento lingüístico.
- Guardar solo `bestScores` borraba el intento activo.
- Restaurar un índice corrupto en el último ítem ocultaba el problema; ahora vuelve al primero.
- Usar un `<main>` dentro del motor creaba landmarks anidados.
- El catálogo multicolor con banderas rompía el sistema visual serio de Práctica.
- Un mapa temporal vertical ocupaba demasiado espacio en móvil.
- Probar por `127.0.0.1` contra un servidor anunciado como `localhost` bloqueaba HMR y generaba
  falsos timeouts en Playwright.

## 12. Definición de terminado

Un quiz nuevo está listo solo si:

- su mapa lingüístico fue revisado;
- todas las formas alcanzan cobertura mínima;
- no hay respuestas múltiples razonables no declaradas;
- aparece en catálogo, guardián, unit tests y E2E;
- los seis niveles pueden completarse con una sola forma seleccionada;
- no muestra corrección antes del resumen;
- restaura el intento tras recarga y sobrevive a estado corrupto;
- cabe a 390 px sin overflow y mantiene un solo `main`;
- respeta el sistema visual de Práctica en claro y oscuro;
- catálogo, TypeScript, build y suite local pasan;
- el commit está en `main`, Vercel está `Ready` y la suite de producción pasa.

## 13. Prompt de arranque para otro chat

```text
Implementa el nuevo quiz en idiomaswl siguiendo docs/quizzes-blueprint-operativo.md y
docs/quiz-tiempo-estructura-multilingue-blueprint.md. Lee primero AGENTS.md y
docs/OPERACION-REPOSITORIO.md. No copies TenseQuestEngine, no uses IA para corregir y no
publiques antes de registrar el banco en catálogo, guardián, unit tests y E2E. Mantén el sistema
visual wlp-* de Práctica, valida una selección de una sola forma y ejecuta todas las puertas de
calidad y producción descritas en el blueprint.
```
