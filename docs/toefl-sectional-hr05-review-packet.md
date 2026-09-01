# HR-05 — paquete de revisión del piloto funcional Listening Set 1

> Estado: **PENDIENTE DE REVISIÓN HUMANA**
>
> Preparado: 2026-09-01
>
> Rama: `codex/toefl-sectional-seo-harness-20260831`
>
> Commit de implementación: `758966144efd4e593e4888b9e9a77a83c897f629`
>
> No autoriza: Sets 2–20, HR-06, integración en `main`, despliegue ni release.

## 1. Qué está listo para revisar

- `/practica/toefl/listening/simulacros` es la biblioteca seccional indexable y enlaza un único piloto disponible.
- `/practica/toefl/listening/simulacros/practica/set-1` es un runner `noindex, follow` y no aparece en el sitemap.
- El runner proyecta Listening desde el mismo mock normalizado `toefl/set-1`; no existe un banco copiado.
- Conserva los IDs de sección, pregunta, objeto y media de la fuente canónica.
- Presenta 22 pasos de audio, 34 preguntas y cuatro familias de tarea. Estos conteos describen el piloto WeLearn y no se publican como formato oficial.
- Cada audio se reproduce una vez; las opciones se habilitan al terminar y el avance es hacia adelante.
- El progreso anónimo queda versionado en `localStorage`; una recarga puede reanudar el intento.
- La corrección usa el endpoint y el registro privado ya existentes. Las claves no llegan al cliente.
- El resultado muestra aciertos brutos y desglose por familia, con disclosure explícito de que no es una banda, overall ni equivalencia ETS.
- Resultado y errores ofrecen salida hacia ejercicios, biblioteca, reintento o simulacro completo; no hay callejón sin salida.

## 2. Límites académicos y de producto

- Se reutilizan C03–C06 para los nombres de las cuatro familias y C10 para autoría, no afiliación, recorrido fijo y ausencia de scoring oficial.
- **C09 sigue bloqueado.** La biblioteca no presenta tiempos ni conteos como hechos del formato oficial. Los únicos contadores del runner son operativos y pertenecen a este recorrido WeLearn.
- El piloto no afirma adaptatividad y explica que no reproduce el enrutamiento oficial.
- No se modificaron autenticación, pagos, intentos del examen completo ni entrega de reportes.
- Sets 2–20 no se exponen hasta aprobar HR-05.

## 3. Evidencia visual persistente

| Vista | Archivo | SHA-256 |
|---|---|---|
| Biblioteca, Chromium 1280 × 900 | `docs/prototypes/screenshots/hr05-library-desktop.png` | `a7b6da5986cc4ef5aade8b8be1ec19e31c31dbf32a1776b14c070cc8adb6e165` |
| Biblioteca, Chromium 390 × 844 | `docs/prototypes/screenshots/hr05-library-mobile.png` | `8f44b9ca97d6b7c1baea006c68284a4c4e5df502fecd9bf228b1cee4c4d49a10` |
| Introducción del runner, Chromium 1280 × 900 | `docs/prototypes/screenshots/hr05-runner-intro-desktop.png` | `f4db566f64c49d95d4298d1a70a32cc0f64dd51cfb89b53d6995b3246b70b1ab` |
| Primer paso, Chromium 390 × 844 | `docs/prototypes/screenshots/hr05-runner-step1-mobile.png` | `142416fc7d41e32e50ebee52738f5eca8583a50d450275d5b20d6048e5f20a47` |

Las capturas se generaron desde una copia efímera de 54 MB bajo `/tmp`. `node_modules` y `public` se enlazaron a fuentes existentes; no se instalaron ni duplicaron dependencias. En móvil se ocultó el widget flotante de WhatsApp únicamente dentro del runner porque cubría opciones de respuesta.

## 4. Evidencia automática y runtime

Pasaron:

- `npm run test:toefl-sectional-listening`: 3/3.
- `npx tsc --noEmit --pretty false --incremental false`.
- `npm run check:toefl-sectional-catalog`.
- `npm run check:toefl-editorial`.
- `npm run check:practica-catalog`.
- `npm run check:production-baseline`.
- `npm run check:seo-foundation`.
- `npm run check:toefl-fixed-listening` y `npm run test:toefl-fixed-listening`: 3/3.
- `npm run check:toefl-audio-release`.

Comprobaciones de runtime:

- biblioteca `200`, runner Set 1 `200`, Set 99 `404`;
- meta del runner: `noindex, follow`;
- score válido: `200`, 34 outcomes y denominador 34;
- body inválido: `400`;
- un solo landmark `<main>`;
- móvil: widget flotante ausente dentro del runner;
- radios efectivamente deshabilitados antes del fin del audio y habilitados después;
- cero errores de consola en la ejecución efímera final.

`npm run check:exam-practice-content` conserva exactamente las 12 deudas D9 ya registradas. El script y sus umbrales no cambiaron.

## 5. Build y límites de la evidencia

La build global sigue siendo obligatoria antes de integrar. En el preview efímero se probaron ambos compiladores:

- Webpack agotó el heap del proceso cercano a 2 GB.
- Turbopack rechazó correctamente que el `node_modules` enlazado apuntara fuera de la raíz efímera.

Ninguno de esos intentos se registra como build aprobada. La revisión sí cuenta con TypeScript limpio, guardianes verdes y render/runtime real. Antes de HR-09 deberá ejecutarse el build completo en un worktree apto para integración, con dependencias reales o heap suficiente.

## 6. Revisión humana obligatoria

### QA humano

- [ ] Biblioteca e inicio del runner se entienden sin explicación adicional.
- [ ] Audio, bloqueo previo, habilitación posterior, selección y avance funcionan con mouse y teclado.
- [ ] Confirmación de respuestas faltantes, reanudación, reintento de audio y error de scoring son comprensibles.
- [ ] Escritorio y móvil no presentan controles tapados, desbordes ni foco invisible.

### Ingeniería

- [ ] El adaptador reutiliza el mock normalizado sin duplicar banco ni claves.
- [ ] El límite cliente/servidor y el payload de scoring son correctos.
- [ ] `noindex, follow`, sitemap, `404` de sets no habilitados y manejo de errores son correctos.
- [ ] Se acepta la deuda de build solo para este gate de preview y se mantiene como obligación antes de integrar.

### Académica

- [ ] Las cuatro familias y sus instrucciones mantienen el sentido aprobado.
- [ ] Los disclosures fijo/no adaptativo/no score oficial son suficientes y visibles.
- [ ] Los resultados brutos no pueden confundirse con una puntuación ETS.
- [ ] C09 continúa bloqueado y no se interpreta ningún contador operativo como claim oficial.

## 7. Forma válida de decisión

Cada decisión debe identificar nombre, rol, fecha, commit y alcance. HR-05 necesita QA humano, ingeniería y académico; si una persona cubre varios roles, se registra la falta de independencia.

Ejemplo:

> Apruebo HR-05 en `758966144efd4e593e4888b9e9a77a83c897f629` para [QA / ingeniería / académico]. C09 sigue bloqueado. Nombre, rol, fecha.

La ausencia de respuesta no aprueba el gate. Hasta registrar las tres revisiones, el trabajo se detiene antes de HR-06.
