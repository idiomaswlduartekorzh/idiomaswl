# IELTS Reading — snapshot reproducible

Fecha de captura: 2026-08-09  
Unidad: Fase 0 — `Snapshot reproducible del estado actual`  
Resultado: snapshot cerrado; **no implica conformidad pedagógica, editorial, visual ni E2E**.

## Identidad del estado

- Rama: `codex/ielts-task2-introduction-pilot`.
- `HEAD`: `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78`.
- `origin/main`: `1181433edfc7e10362a88c66e9377b4829a4761f`.
- Relación `HEAD...origin/main`: 5 commits propios, 0 commits pendientes de `origin/main`.
- Los cambios tracked previos pertenecen a Writing Task 2. El documento del loop y otros
  documentos/bancos de Task 2 ya estaban untracked. No se modificó implementación ni datos
  de IELTS Reading en esta unidad.
- Stack medido: Node `v26.0.0`, npm `11.12.1`, Next `16.2.6`, React `19.2.4`.
- `workspace-state.json` conserva el status inicial completo, distingue seis archivos
  TOEFL concurrentes observados después y fija SHA-256 agregados de Reading, mocks y la
  referencia visual Task 2. Así el árbol sucio puede verificarse sin atribuir cambios
  ajenos a esta unidad.

Comandos de identidad:

```bash
git branch --show-current
git rev-parse HEAD
git rev-parse origin/main
git rev-list --left-right --count HEAD...origin/main
git status --short
```

## Superficie y datos actuales

### Rutas

- 14/14 rutas WeLearn de tipos están declaradas `published` y tienen `page.tsx`.
- 6/6 rutas de habilidades están declaradas `published` y tienen `page.tsx`.
- El hub `/practica/ielts/reading` sigue siendo un ejercicio antiguo de TFNG sobre el
  Amazonas y presenta como “Próximamente” formatos que ya tienen rutas publicadas.
- La UI afirma “14 tipos oficiales”. IELTS enumera 11 tipos y WeLearn llega a 14 rutas al
  separar Summary, Note, Table y Flow-chart Completion. La fila siguiente debe formalizar
  ese contrato sin llamar “14 tipos oficiales” a las rutas internas.
- El motor mixto imprime `task.questionType` antes de que el alumno responda; los párrafos
  también imprimen `paragraph.function`. La captura `mixed-engine-pre-answer-leak-desktop.png`
  muestra la fuga del tipo en el extremo superior derecho de cada tarjeta.

Reproducción:

```bash
find 'src/app/(site)/practica/ielts/reading/tipos-de-preguntas' \
  -mindepth 2 -maxdepth 2 -name page.tsx | sort
find 'src/app/(site)/practica/ielts/reading/habilidades' \
  -mindepth 2 -maxdepth 2 -name page.tsx | sort
rg -n "Próximamente|20%|Amazon|task\.questionType|paragraph\.function" \
  'src/app/(site)/practica/ielts/reading/Content.tsx' \
  src/components/exam-practice/IeltsReadingMixedQuestionTypeEngine.tsx
```

### Bancos formativos

- 42 pasajes, tres por cada una de las 14 rutas; 260 ítems.
- Metadatos estructurados de derechos, procedencia, licencia o review: 0/42 pasajes.
- Evidencia estructurada validable por máquina: 0/260 ítems.
- Las páginas llaman al material “original WeLearn”, pero los objetos de pasaje no
  contienen metadata que permita verificar esa afirmación.
- 17 sets / 84 decisiones en habilidades y transferencia: skimming 4, scanning 6,
  skim/scan 16, inferencia 10, paráfrasis 12, límite de palabras 12, tiempo 12 y mixto 12.

### Mocks heredados

- 20 archivos, 60 secciones/pasajes, 800 puntos; cada set suma 40.
- Metadatos estructurados de derechos/review: 0/60 secciones.
- Grupos con `evidence` o `explanation`: 0.
- 534 blanks; 464 no declaran `maxWords`. En los sets 5–20 faltan 29/29 límites por set.
- El runner usa `maxWords` para ancho visual, pero `isCorrect()` no valida el límite.
- Tres grupos multiselect / seis puntos se califican 2 o 0; no existe 1/2.

Reproducción del contrato de scoring:

```bash
rg -n "correct_ms|correct \+= ms\.selectCount|maxWords|isCorrect\(" \
  'src/app/(site)/examenes/[exam]/practica/[mockId]/IELTSPracticeClient.tsx' \
  src/components/exam-runner/primitives.tsx
```

## Snapshot anti-atajos

Universo formativo reproducido: 68 decisiones con `options: string[]` y `answer` numérico
en Skimming, Mixed, Inference, Paraphrase, Time Management y Multiple Choice.

| Banco | N | A/B/C | Aciertos al elegir única más larga / elegibles |
|---|---:|---:|---:|
| Skimming | 4 | 1/2/1 | 2/4 |
| Mixed | 12 | 12/0/0 | 2/4 |
| Inference | 10 | 7/2/1 | 7/9 |
| Paraphrase | 12 | 6/5/1 | 12/12 |
| Time Management | 12 | 6/5/1 | 4/9 |
| Multiple Choice | 18 | 6/8/4 | 10/13 |
| **Total** | **68** | **38/22/8** | **37/51 = 72,5 %** |

El universo no llega a las 100 decisiones elegibles del gate Wilson, por lo que la
estimación agregada de longitud es provisional. Dos fallos son deterministas: Mixed tiene
12/12 claves en A y Paráfrasis permite acertar 12/12 eligiendo la única opción más larga.

El extractor ampliado audita cada universo de opciones en tres cortes reproducibles:
agregado por cantidad de opciones, por banco y por pool. El corpus formativo aporta 21
cortes, 202 resultados heurísticos y 408 permutaciones; los mocks, 37/370/462. El total
es 58 cortes, 572 resultados y 870 permutaciones sin fallos de invariancia semántica. Las
nueve familias heurísticas cubren posición fija, opción más larga/corta, mayor
solapamiento léxico, ciclo de posiciones, novedad y reciclaje de distractores; también se
registran rachas y longitud media. Seis auditorías adicionales miden si los términos
absolutos permiten predecir FALSE/NO.

Los resultados más visibles siguen siendo adversos: en los 44 ítems formativos de cuatro
opciones, D nunca es correcta y la única opción más larga acierta 31/38 casos elegibles;
en los 24 de tres opciones, A concentra 18 claves. Entre TFNG formativo y mocks, predecir
FALSE cuando aparece un término absoluto acierta 8/10 casos elegibles. Cada resultado
estadístico permanece rotulado `provisional` porque su muestra no alcanza el mínimo de
100; el `✅` de esta fila certifica que el sesgo del baseline quedó medido, no que el banco
esté libre de atajos.

En mocks heredados:

- 77 MCQ no-TFNG/YNNG: A/B/C = 0/51/26; A nunca es correcta.
- Elegir la única más larga: 35/55 = 63,6 %.
- TFNG: TRUE 20, FALSE 17, NOT GIVEN 3.
- YNNG: YES 7, NO 5, NOT GIVEN 1.

La metodología ya no depende de esta descripción: `extract-baseline.mjs` transpila el
catálogo y cada mock con el TypeScript local, evalúa en un `vm` sin imports, recorre solo
exports nombrados, cuenta posición por `answer`, longitud por palabras separadas por
whitespace y se abstiene ante empates. Produce `baseline.json`, registra cada archivo y su
SHA-256, el hash combinado y el status Git solo de las fuentes medidas. Dos ejecuciones
consecutivas produjeron el mismo SHA-256 del JSON:
`3d9475a79282f722a25001425776c13c2ef40089435e5395e734dd21b59f19b0`.

```bash
node output/playwright/ielts-reading-baseline-2026-08-09/extract-baseline.mjs --write
shasum -a 256 output/playwright/ielts-reading-baseline-2026-08-09/baseline.json
```

## Walkthrough cognitivo y auditoría IELTS

Recorrido frío obligatorio de diez pasos:

1. **Entrar sin explicación externa:** abre correctamente, pero “Reading” lleva a un
   ejercicio TFNG antiguo, no al mapa del ecosistema.
2. **Reconocer Academic o GT:** el eyebrow dice Academic; el title dice “Academic y
   General Training”. La señal visible y la metadata son inconsistentes.
3. **Saber qué hacer en diez segundos:** la instrucción de elegir TRUE/FALSE/NOT GIVEN es
   directa, aunque la regla de NOT GIVEN se enseña de forma superficial.
4. **Ver un ejemplo antes de decidir:** falla; no hay demostración resuelta antes del
   primer ítem independiente.
5. **Fallar deliberadamente:** se eligió TRUE en el ítem 1; Playwright observó la clave
   FALSE, el feedback específico y el bloqueo del grupo.
6. **Entender por qué falló:** el feedback contrasta “mainly in Brazil” con “exclusively”
   en lenguaje llano. Explica este ítem, pero no enseña un mapa de proceso reusable.
7. **Volver al texto y localizar evidencia:** falla; no hay “Ir a evidencia” ni highlight.
   En móvil, pasaje y pregunta quedan separados por scroll largo.
8. **Transferir a texto no visto:** falla; el hub no ofrece una forma paralela/transfer.
9. **Reanudar intento:** falla; reload elimina feedback, progreso y respuestas. Playwright
   observó opciones nuevamente habilitadas y ausencia de `1/8`.
10. **Terminar sabiendo la siguiente acción:** falla; “Próximamente” lista formatos ya
    publicados y no ofrece un CTA activo o personalizado.

Hallazgos transversales: colores fijos por etiqueta antes de comprobar; WhatsApp invade el
pasaje móvil; el motor mixto muestra el nombre del formato antes de pedir identificarlo.
`localhost-deliberate-error-feedback.png`, `localhost-after-click-feedback.png`,
`localhost-after-reload-reset.png` y `playwright-interaction.json` fijan la evidencia.

No se ejecutó una resolución IELTS a ciegas: esta fila no introduce ni aprueba contenido;
su objeto es registrar fielmente el baseline. La auditoría IELTS de esta fila sí cubrió
terminología, rutas, formato, scoring y desviaciones observables. El solve independiente
corresponde a unidades con clave/contenido que se pretenda aprobar.

## UI/UX, accesibilidad y navegador real

Base URL visual inicial: `http://127.0.0.1:3001`.  
Base URL interactiva estable: `http://localhost:3001` (servidor `next dev` ya activo;
el PID inicial cambió durante el smoke exhaustivo).  
Capturas comparativas: 1440×900 y 390×844.  
Smoke automatizado: 320×568, 390×844, 768×1024, 1024×768 y 1440×900.  
Rutas: Task 2 hub como referencia; los tres hubs actuales de Reading; las 14 rutas de
tipos y las seis rutas de habilidades.

Todas las rutas medidas devolvieron HTTP 200, un único `main`, un único H1 y canonical;
el hub no tuvo overflow horizontal al 100 % en los cinco viewports. El baseline no cumple
aún el gate final:

- Reading no comparte la gramática visual/editorial de Task 2.
- El hub Reading no tiene `fieldset`/`radiogroup`, `role=progressbar` ni `aria-live`.
- Los pasajes ingleses medidos no tienen `lang="en"`.
- El progreso es puramente visual.
- TRUE/FALSE/NOT GIVEN reciben colores de identidad antes de responder.
- La página móvil es una columna larga y el widget flotante solapa contenido.
- El motor mixto deja visible el tipo de pregunta antes de la respuesta.

La primera sesión por `127.0.0.1` no hidrató de forma fiable y generó fallos HMR
instrumentales. La repetición por `localhost` sí observó el contrato completo: elegir
FALSE mostró la explicación, deshabilitó las tres opciones, activó `1/8` y mantuvo
`scrollWidth === clientWidth`; reload eliminó explicación/progreso y habilitó de nuevo el
grupo. Un segundo intento deliberadamente incorrecto mostró “La respuesta es FALSE” con
la explicación de `mainly` frente a `exclusively`. Un listener en reload obtuvo cero
`pageerror`. Los resultados crudos normalizados están en `playwright-interaction.json`.

El runner exacto `playwright-baseline.mjs` deriva las rutas publicadas de las mismas
fuentes censadas y produjo `playwright-baseline.json`: 23/23 rutas con HTTP 200, un H1,
un `main`, canonical y sin overflow horizontal a 1440 px; 23/23 destinos internos únicos
respondieron 200. En los cinco viewports no hubo overflow al 100 %, pero a zoom 200 % el
hub midió 448 px de contenido sobre 390 px de viewport. WhatsApp solapa el pasaje a
390×844. La prueba de teclado encontró skip link, pero 0 `fieldset`, 0 `radiogroup`, 0
`progressbar` y 0 regiones `aria-live`. Las rutas planificadas `diagnostico`, `practica` y
`simulacro` devuelven 404 y quedan, correctamente, para sus filas futuras.

La corrida persistida terminó con 0 `pageerror` y 0 errores de consola en las 23 rutas.
Conserva un request fallido transitorio: el servidor dev rechazó brevemente la conexión
mientras compilaba `matching-headings`; el runner usó reintentos acotados y la ruta final
respondió 200. El error CSP real se conserva por separado en el flujo interactivo de CLI
descrito abajo.

El primer intento con `next start -p 3218` devolvió 500 porque el servidor `next dev` ya
activo había sustituido el output de producción y faltaban `.next/BUILD_ID` y
`.next/server/middleware-manifest.json`. El build había pasado antes; por eso la auditoría
visual continuó contra el servidor dev existente sin matar un proceso ajeno.

La red de la sesión instrumental por IP retiene 319 respuestas 200, 73 respuestas 304 y
79 fallos WebSocket HMR (`status: -1`). La sesión estable por `localhost` reveló además un
error real: GTM intenta cargar
`https://unpkg.com/meta-capi-param-builder-clientjs/dist/clientParamBuilder.bundle.js`,
pero la CSP del sitio lo bloquea. Se observaron cuatro intentos fallidos —uno por cada
navegación/reload del recorrido final—. El baseline de consola, por
tanto, no satisface el gate final de cero errores aunque la interacción sí sea reproducible.

No se ejecutó axe: no está instalado y esta fila no autoriza instalar dependencias. No se
simula ese gate; la accesibilidad automatizada final continúa abierta.

Comandos base de reproducción:

```bash
curl -sI http://localhost:3001/practica/ielts/reading
curl -sI http://localhost:3001/practica/ielts/academic/writing/task2
bash /Users/josedavidduartesilva/.codex/skills/playwright/scripts/playwright_cli.sh \
  --session reading-baseline-localhost open \
  http://localhost:3001/practica/ielts/reading
bash /Users/josedavidduartesilva/.codex/skills/playwright/scripts/playwright_cli.sh \
  --session reading-baseline-localhost resize 1440 900
bash /Users/josedavidduartesilva/.codex/skills/playwright/scripts/playwright_cli.sh \
  --session reading-baseline-localhost screenshot \
  --filename output/playwright/ielts-reading-baseline-2026-08-09/reading-hub-desktop-1440x900.png \
  --full-page
bash /Users/josedavidduartesilva/.codex/skills/playwright/scripts/playwright_cli.sh \
  --session reading-baseline-localhost eval \
  "() => JSON.stringify({h1:[...document.querySelectorAll('h1')].map(x=>x.textContent?.trim()),scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth})"
```

Gate Playwright aplicable a esta fila de snapshot: smoke/DOM, viewport, interacción mínima
del hub existente, error deliberado, reload/reset, consola, red y artefactos persistentes.
Practice, Exam, Review, navegación versionada, offline y robustez no existen como contrato
implementado todavía; no se declaran aprobados aquí y conservan sus filas posteriores.

Reproducción exhaustiva exacta:

```bash
node output/playwright/ielts-reading-baseline-2026-08-09/playwright-baseline.mjs --write
shasum -a 256 \
  output/playwright/ielts-reading-baseline-2026-08-09/playwright-baseline.mjs \
  output/playwright/ielts-reading-baseline-2026-08-09/playwright-baseline.json
```

SHA-256: runner
`19a01ecaa78fe10309d712d8e470f2a72e0a7f5ea3c7e0600608eaf0f2360ec9`; resultado
`7a2745650ed82aabcdf2da208ca469ff646cba40ba727a775215f0f8d3979c24`.

## Guardianes

| Comando | Estado | Evidencia |
|---|:---:|---|
| `npm run check:practica-catalog` | ✅ | 465 temas; catálogo íntegro. |
| `npm run check:reading-content` | ✅ | 31 ejercicios; 30 English publicados y 1 Korean draft. |
| `npx tsc --noEmit` | ✅ | Sin errores. |
| `npm run build` | ✅ | Compiló y generó 1263 páginas; rutas IELTS Reading presentes. |
| `npm run check:exam-practice-content` | ⚠️ previo | Ocho expectativas antiguas de Writing Task 2; ninguna menciona Reading. |
| `npm run test:reading` | ⚠️ previo | 9 pasan, 2 fallan por expectativas de publicación antiguas del motor Reading general, no por IELTS. |

No se ocultó ni “arregló” deuda ajena. Esta fila tampoco crea todavía
`npm run check:ielts-reading`; ese es el objeto explícito de una fila posterior de fase 0.

## Derechos y publicación

`➖` para esta fila: es un snapshot de solo lectura que no introduce, transforma ni
publica contenido. El `0/42` y `0/60` de metadata no se aprueba ni se declara resuelto; se
convierte en baseline para la fila “Inventario de contenido, procedencia y cuarentena”.

## Artefactos

- `task2-desktop-1440x900.png` y `task2-mobile-390x844.png`: referencia visual.
- `reading-hub-desktop-1440x900.png` y `reading-hub-mobile-390x844.png`: hub obsoleto.
- `question-types-*.png`: hub moderno, rutas y motor mixto.
- `skimming-*.png`: habilidad representativa.
- `tfng-type-desktop-1440x900.png`: ruta de tipo representativa.
- `mixed-engine-pre-answer-leak-desktop.png`: fuga visible antes de responder.
- `reading-hub-pre-answer.snapshot.yml`: árbol accesible pre-respuesta.
- `localhost-after-click-feedback.png`, `localhost-deliberate-error-feedback.png` y
  `localhost-after-reload-reset.png`: interacción estable y walkthrough.
- `localhost-after-click.snapshot.yml` y `localhost-after-reload.snapshot.yml`: DOM
  accesible después de click y recarga.
- `playwright-interaction.json`: aserciones normalizadas del flujo estable.
- `playwright-baseline.mjs` y `playwright-baseline.json`: runner exacto y salida del smoke
  completo de rutas, links, responsive, zoom, teclado e interacción.
- `console-*.log`, `console-localhost-interaction.log` y `playwright.network`: consola y
  red crudas.
- `extract-baseline.mjs` y `baseline.json`: extractor determinista y censo completo.
- `workspace-state.json`: estado sucio inicial, concurrencia y fingerprints.

La copia de recursos de la traza instrumental se retiró porque contenía 160 MB de
fotogramas repetidos por HMR. Se retiraron también la traza sin recursos y dos capturas
redundantes; no eran evidencia única. Las capturas, snapshots, JSON, red, consola y
comandos reproducibles permanecen.

## Dictamen de la fila

- `Derechos ➖`: N/A justificado para un snapshot read-only.
- `Full-stack ✅`: estructura, datos, scoring y guardianes reproducidos.
- `IELTS ✅`: baseline oficial/interno y desviaciones clasificados; no aprobación de clave.
- `Walkthrough ✅`: recorrido en frío y fricciones documentados.
- `Anti-sesgo ✅`: nueve familias de heurísticas, rachas, permutación, términos absolutos,
  NOT GIVEN, blanks y multiselect medidos; certificación estadística final aún abierta.
- `UI/UX ✅`: comparación Task 2/Reading, responsive y semántica capturados.
- `Playwright ✅`: runner persistente, 23 rutas/links, cinco viewports, zoom, teclado,
  interacción, capturas, DOM, red y limitaciones retenidos.

El antes era un conjunto de observaciones dispersas; el después es un baseline medido,
fechado, reproducible y enlazado. Ningún hallazgo de producto quedó corregido en esta fila.
La siguiente fila abierta es `Contrato oficial 11 tipos ↔ 14 rutas`.
