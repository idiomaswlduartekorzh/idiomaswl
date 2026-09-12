# Registro de recuperación de producción

Estado: **snapshot histórico del 25 de agosto; no es autoridad operativa vigente**.

Para el inventario versionado actual usa
[`MAPA-CONOCIMIENTO-MAIN.md`](MAPA-CONOCIMIENTO-MAIN.md); para ramas y producción usa
[`PLAN-COMUNICACION-RAMAS-Y-PRODUCCION.md`](PLAN-COMUNICACION-RAMAS-Y-PRODUCCION.md). Las menciones
de cuota, ramas pendientes y despliegues de este archivo describen el momento del corte y no deben
usarse para decidir un despliegue nuevo sin volver a verificar GitHub y Vercel.

Fecha de corte: 25 de agosto de 2026, 13:47 COT.

Producción verificada:

- repositorio: `idiomaswlduartekorzh/idiomaswl`;
- rama: `main`;
- SHA verificado para SAT Set 5: `17fc7487afd037d323eeaf2ebc1085d05354cc7c`;
- Vercel: `READY`;
- deployment: `dpl_4NkTRTkBUYY3xgbtuhzmfh46ZjAm` ·
  `https://idiomaswl-60ige2wvn-idiomaswlduartekorzhs-projects.vercel.app`;
- fuente del despliegue: GitHub, rama `main`;
- dominios: `idiomaswl.com`, `www.idiomaswl.com`, `idiomaswl.vercel.app`.

Plan estable: [`PLAN-COMUNICACION-RAMAS-Y-PRODUCCION.md`](PLAN-COMUNICACION-RAMAS-Y-PRODUCCION.md).

## 1. Leyenda de decisión

| Decisión | Uso |
|---|---|
| `CONFIRMAR_PRODUCCION` | El trabajo ya está en `main`; corregir documentación o verificar ruta. |
| `INTEGRAR` | Trabajo actual que debe pasar por validación e integración. |
| `TERMINAR` | Trabajo activo todavía incompleto. |
| `REIMPLEMENTAR` | Rama demasiado antigua; rescatar intención/parche sobre `origin/main`. |
| `DECIDIR` | Requiere decisión de producto, seguridad o migración. |
| `SUSTITUIR_ARCHIVAR` | El contenido ya fue reemplazado o solo conserva historia. |
| `RESPALDAR_SEPARAR` | Árbol o rama con trabajo mezclado que no se puede integrar en bloque. |

## 2. Confirmado en producción

| Trabajo | Evidencia | Estado/acción |
|---|---|---|
| Habla acompañada Inglés A2 | Ruta de producción `200` y archivos alcanzables desde `origin/main`. | `DESPLEGADO` |
| Habla acompañada Coreano A2 | Ruta de producción `200`. | `DESPLEGADO` |
| Habla acompañada Francés A2 | Ruta de producción `200`. | `DESPLEGADO` |
| Habla acompañada Italiano A2 | Ruta de producción `200`. | `DESPLEGADO` |
| Habla acompañada Portugués A2 | Ruta de producción `200`; incluido antes de `a036f93c`. | `DESPLEGADO` |
| Habla acompañada Alemán A2 | Integrada en `origin/main` como `e41f1022`; el despliegue de producción está construyéndose. | `INTEGRADO`; falta smoke para pasar a `DESPLEGADO`. |
| Archivo de resultados del Home | Los commits `17dd9ebc`, `fbb9af2d`, `5976dc4e`, `58a2c7e1`, `60ead605`, `87db200b`, `9202c030`, `e225559f` y `1cea3ab2` son ancestros de `origin/main`. | `CONFIRMAR_PRODUCCION`: corregir documento obsoleto |
| Clase Claude independiente | `src/app/clase-claude/route.ts` y sus contenidos existen en `origin/main`. | `DESPLEGADO`; no restaurar la rama antigua completa |
| Sistema PDF actual | Componentes y `src/lib/pdf/` existen en `origin/main`. | `DESPLEGADO`; no sustituir con copias antiguas del árbol sucio |
| Landings y blog de japonés/ruso | Los archivos locales marcados como modificados coinciden byte a byte con `origin/main` en la auditoría. | `DESPLEGADO` |
| SAT Sets 1–5 | Rama `codex/sat-scale-to-20-20260824` integrada por fast-forward en `main` con SHA `17fc7487`. Deployment `dpl_4NkTRTkBUYY3xgbtuhzmfh46ZjAm`, fuente GitHub `main`, `READY`. Smoke oficial 14/14; hub, Sets 1–5 y login HTTP 200; `/dashboard` redirige 307 a login. | `DESPLEGADO`; conservar cinco sets y pausar la expansión hasta retomar el proyecto. |

## 3. Candidatos de recuperación e integración

| Prioridad | Trabajo | Rama/SHA de corte | Diferencia contra `origin/main` | Estado propuesto | Acción |
|---:|---|---|---:|---|---|
| P0 | Plan, registro y baseline de producción | `codex/branch-recovery-plan-20260825` | Rama nueva desde `a036f93c` | `LISTO_PARA_INTEGRAR` | Guardianes, TypeScript, build y smoke aprobados; integrar primero. |
| P0 | Guardrails SEO y landings | `codex/seo-guardrails-phase0-20260824` · `58655b44` | 1 parche único; 61 commits detrás | `EN_VALIDACION` | Rebase/reimplementar sobre `main`; conservar el `prebuild` actual. |
| P1 | Ideas avanzadas | `codex/practica-avanzada` · `953e20fa` | 4 parches únicos; 0 detrás | `EN_VALIDACION` | Validar contenido, UI, catálogo y build; publicar solo con aprobación. |
| P1 | Canonicals de 46 páginas de Práctica | `claude/gifted-edison-ef8a3c` · `3a3ca985` | 1 parche único; 420 detrás | `REIMPLEMENTAR` | Comparar canonicals actuales y portar únicamente los que aún fallan. |
| P1 | Puente de Práctica a clases | `seo/redirecciones-404` · `b8fef208` | 1 parche único; 433 detrás | `REIMPLEMENTAR` | Rehacer la tarjeta comercial sobre los hubs actuales y probar rutas. |
| P2 | Rendimiento LCP del hero | `fix/hero-lcp-perf` · `62299c51` | 1 parche único; 634 detrás | `REIMPLEMENTAR` | Medir el hero actual; aplicar solo si el problema persiste. |
| P2 | Calidad de gramática/performance histórica | `feature/icfes-mock-21-23` · `47a19b16` | 3 parches únicos; 646 detrás | `REIMPLEMENTAR` | La rama ya no representa ICFES 21–23; auditar los tres parches por intención. |
| P2 | Correcciones locales de Inglés A2 | árbol principal sin commit | 2 microcopias de apertura de tarjeta y cambios asociados | `RESPALDAR_SEPARAR` | Reimplementar sobre `main` y correr guardianes de Habla. |
| P3 | Ajustes locales de blog/lectura | árbol principal sin commit | Blog difiere; Lectura añade un emoji al H1 | `DECIDIR` | Comparación editorial; no integrar el árbol completo. |

## 4. Trabajos activos que todavía no deben desplegarse

### Atribución WhatsApp — 4 de septiembre de 2026

- Rama: `codex/whatsapp-attribution-admin`; base `09d82c99` de `origin/main`.
- Estado: `LISTO_PARA_INTEGRAR`. Responsable: Codex, tarea de tags y panel de José.
- Alcance: captura de origen en enlaces públicos de WhatsApp, referencias de contacto,
  confirmación manual o por webhook y vista privada `/dashboard/admin/contactos`.
- Compartidos reservados: `src/app/layout.tsx`, `WhatsAppFloat.tsx`, cabecera de
  `JoseDashboard.tsx`, webhook WhatsApp, `config/production-baseline.json` y una migración aditiva de Supabase.
- Dependencias: no modificar ni activar la IA nativa de WhatsApp; no tocar precios/pagos.
- Producción: migración exacta aplicada y auditada en `ivqeokuxgxemhydvopdd`; flag
  de Vercel configurado para el siguiente build. Pendiente integrar en `main`,
  esperar el deployment y ejecutar smoke.
- Decisión de integración: `MERGE`; rama actualizada desde `origin/main` y validada.
- Validado: 17 pruebas de contrato/API/SQL/chatbot, TypeScript global y acotado,
  ESLint, guardianes completos, build de 2.515 páginas y QA local de éxito, permisos,
  móvil/escritorio y caída/recuperación de DB.
- Pendiente real: merge, deployment y smoke productivo. Detalle:
  [`whatsapp-attribution.md`](whatsapp-attribution.md).

| Trabajo | Rama/SHA de corte | Estado observado | Condición para publicar |
|---|---|---|---|
| Habla acompañada Ruso A2 | `main` · `58152f88`; artefacto `dpl_41Vp3YvdCacAqMXmPvuWm8cZrDPp` | `INTEGRADO`; 20 escenarios y artefacto Vercel `READY`. La promoción chocó con la cuota diaria y los tres alias se devolvieron al deployment público anterior. | Promover el artefacto exacto o un deployment posterior de `main`; exigir 64 rutas rusas, dos inválidas y regresiones públicas antes de marcar `DESPLEGADO`. |
| Habla acompañada Japonés A2 | `codex/habla-japones-a2` · `d071d658`; base `77476a11` | `LISTO_PARA_INTEGRAR`; 20 escenarios, 40 fichas, caja propia, 100 simulaciones, rutas, guardianes, TypeScript y build Webpack de 2.499 páginas aprobados. El guardián cuenta 10/24 conjuntos y 200/480 escenarios. | Fast-forward de `main`, deployment Vercel `READY` desde ese SHA y QA de las 64 rutas japonesas, dos inválidas y regresiones antes de marcar `DESPLEGADO`. |
| Piloto registro/pagos TOEFL | `codex/toefl-pilot-registration` · `5def8b7b` | 1 parche único; 206 detrás; incluye migración y comercio. | Decisión de producto, revisión de seguridad/RLS, migración, pruebas de pago y reimplementación actualizada. |
| Parche SAT adaptativo | `feat/sat-modulo-2`; parche `afd24f7d` | Rama 220 detrás; solo un parche no equivalente. | Comprobar si el motor actual ya resuelve la intención y reimplementar si hace falta. |

## 5. Rama principal antigua y árbol sin commit

Rama: `feat/red-agentes-sat-ingles` · `2fb610c6`.

Estado de corte:

- 349 commits detrás de `origin/main`;
- 45 commits locales por delante de su remoto;
- los 45 commits únicos son principalmente auditorías, simulaciones y documentación de Habla;
- contiene archivos modificados, eliminados y sin seguimiento de varios subsistemas;
- no es una candidata de merge.

Clasificación del árbol:

| Grupo | Ejemplos | Decisión |
|---|---|---|
| Idéntico a `main` | landings japonés/ruso, Home, motores PDF nuevos, varios componentes de Habla | No rescatar; ya existe en producción. |
| Corrección potencial | dos instrucciones de tarjetas Inglés A2, algunos cambios editoriales | Extraer y validar individualmente. |
| Regresión segura de evitar | Precios sin checkout Wompi, tipos de Habla limitados a Inglés, registro de Habla anterior, PDF anterior | No integrar. |
| Artefactos | capturas, informes, JSON de auditoría, PDFs generados | Archivar fuera de ramas de publicación. |

Acción inmediata: `RESPALDAR_SEPARAR`. No ejecutar limpieza, reset o cambio de rama hasta conservar commits, diff y archivos sin seguimiento.

## 6. Ramas históricas o sustituidas

| Rama | Señal | Decisión inicial |
|---|---|---|
| `codex/home-story-v1` | 11 parches únicos y 624 commits detrás; alternativa histórica del Home. | `DECIDIR` por intención; no mezclar. El archivo de resultados posterior sí está en producción. |
| `codex/ielts-english-comparisons` | 50 parches no equivalentes y 693 detrás. | Auditar contra el IELTS actual; previsión `SUSTITUIR_ARCHIVAR`. |
| `codex/ielts-comparaciones-fixes` | 49 parches y 693 detrás. | Auditar por contenido, nunca merge. |
| `codex/publish-ielts-radar-listening` | 47 parches y 693 detrás. | IELTS/Radar posteriores ya están protegidos; auditar y archivar. |
| `codex/clase-claude-prod` | La clase ya está en `main`; quedan 11 parches antiguos de gramática con contenido posterior en producción. | `SUSTITUIR_ARCHIVAR` después de confirmar cobertura. |
| `archive/pre-main-cleanup-2026-08-13-reading-audits` | Rama de archivo. | Conservar, no integrar. |
| `chore/limpieza-docs` y `wip/limpieza-2026-08-02` | Limpieza/respaldos anteriores, 570–646 detrás. | Auditar documentación útil y archivar. |

## 7. Stashes y worktrees

Stashes encontrados:

- 13 de agosto: trabajo IELTS sin commit de otra sesión;
- 30 de julio: sección de resultados revertida a petición;
- 18 de julio: residuos de otro worktree.

No se aplican directamente. Cada stash se inspecciona con diff y se clasifica como `SUSTITUIDO`, `REIMPLEMENTAR` o `ARCHIVAR`.

Worktrees temporales activos al corte incluyen Habla Italiano/Portugués/Alemán, auditoría IELTS, Ideas avanzadas y SEO. Cada uno debe comprobar rama remota antes de retirarse.

## 8. Cola de ejecución

| Orden | Unidad | Resultado esperado |
|---:|---|---|
| 1 | Respaldo de rama/árbol principal | Cero trabajo recuperable depende de un único portátil o directorio. |
| 2 | Plan, registro y corrección de estados obsoletos | Una fuente de verdad compartida. |
| 3 | Baseline + CI + Vercel/GitHub | Desapariciones bloqueadas antes de recuperar contenido. |
| 4 | Guardrails SEO | Protección transversal actualizada. |
| 5 | Ideas avanzadas | Decisión y, si pasa puertas, despliegue independiente. |
| 6 | Habla Alemán A2 | Terminar; después integrar como colección completa. |
| 7 | Parches SEO/comerciales/performance antiguos | Reimplementación mínima, uno por PR. |
| 8 | SAT/TOEFL con dependencias | Decisión técnica y de producto antes de publicar. |
| 9 | Árbol local mezclado | Rescatar correcciones válidas y archivar el resto. |
| 10 | Ramas históricas/stashes | Cierre explícito sin pérdidas. |

## 9. Cierre de cada fila

Una fila solo pasa a `DESPLEGADO` cuando contiene:

- SHA de la rama validada;
- SHA de integración en `main`;
- checks ejecutados;
- ID/URL del deployment Vercel;
- rutas probadas y código HTTP;
- decisión sobre la rama de origen;
- documento de subsistema actualizado.

Hasta entonces, el trabajo sigue pendiente aunque exista un commit o una preview.

### Actualización TOEFL — 4 de septiembre de 2026

| Trabajo | Rama / snapshot reconciliado | Base origin/main | Estado | Responsable / alcance | Entrega y pendiente |
| --- | --- | --- | --- | --- | --- |
| TOEFL sectional: orden de opciones Set 1 aprobado | `codex/toefl-sectional-seo-harness-20260831` / `125bbe154e738f25a59b022f0e04598b0cbaf70f` evidencia; `f8395a0af9f17833fadaccf13832fb38ecc1bd21` implementación | `96e817fcee534d70ef3039d8d2e68aa5b9a735d9` | `EN_VALIDACION` | Codex; presentación y persistencia en runners seccional/completo. Compartidos: `package.json`, `Toefl2026PracticeClient.tsx`, registro central. | TypeScript, 31 pruebas unitarias, guardianes y 20 rutas/correctores locales pasan. Navegador verifica orden nuevo en ambos runners, recargas y conservación del intento seccional previo. Build y revisión humana HR-06 pendientes. Sin migraciones ni despliegue. Integración aplazada; SHA main/deployment/smoke: no aplican. Ver [entrega técnica](toefl-listening-set1-order-implementation-20260904.md), [QA posterior](toefl-listening-set1-order-browser-qa-20260904.md) y [paquete final HR-06](toefl-sectional-hr06-final-review-packet-20260904.md). |

## 10. Bitácora de ejecución

### 25 de agosto de 2026

- Los 45 commits locales de `feat/red-agentes-sat-ingles` quedaron respaldados en
  `archive/recovery-feat-red-agentes-sat-ingles-20260825` con punta `2fb610c6a447`.
- Se implementó una línea base que protege 144 rutas base de Práctica y los 480 MP3 de
  Escucha, además de archivos críticos, marcadores y guardianes de `prebuild`.
- Se añadió comparación monotónica contra la rama base: un PR no puede bajar mínimos ni
  retirar protecciones para pasar CI.
- `check:production-baseline`, `check:practica-catalog`, `check:habla-acompanada` y TypeScript
  pasaron.
- El `prebuild` completo pasó. El build Webpack de Next 16.2.6 terminó con 2.306 páginas
  estáticas usando `NODE_OPTIONS=--max-old-space-size=4096`; CI conserva ese límite.
- El smoke público pasó en 10/10 rutas críticas con HTTP 200.
- Mientras se validaba la protección, Alemán A2 avanzó de 16 a 20 escenarios y se integró
  concurrentemente en `origin/main` (`e41f1022`). La rama de protección se rebasó sobre ese
  commit antes de continuar; ahora exige 417 páginas de Práctica y añade su ruta al smoke.
- SAT Set 5 quedó `LISTO_PARA_INTEGRAR` en `5e6c05f9`, rebasado sobre `6d2620f5`.
  Los cinco sets suman 15 módulos y 405 preguntas autoradas. Pasaron las doce puertas,
  fábrica 10/10, originalidad local, los 28 resultados adaptativos, TypeScript, prebuild,
  build y QA de navegador de ambas ramas con POST interceptados y móvil 390 × 844.
- SAT Set 5 se integró por fast-forward en `main` como `17fc7487` y quedó `DESPLEGADO` en
  `dpl_4NkTRTkBUYY3xgbtuhzmfh46ZjAm`. Vercel confirmó fuente GitHub `main` y estado
  `READY`; los tres dominios apuntaron al mismo deployment. El smoke oficial pasó 14/14,
  Sets 1–5 devolvieron HTTP 200, el hub mostró cinco simulacros y Set 5 publicó 54
  preguntas y 64 minutos. La expansión se pausa en cinco por decisión de producto.
- Ruso A2 quedó integrado en `main` como `58152f88` y su deployment exacto
  `dpl_41Vp3YvdCacAqMXmPvuWm8cZrDPp` terminó `READY`. La promoción agotó la cuota diaria;
  se revirtieron los tres alias al deployment público anterior para no dejar Vercel SSO.
- Japonés A2 llegó a 20 escenarios y 100 simulaciones en `codex/habla-japones-a2`.
  Rebasado sobre `77476a11`, pasó release guard, guardián profundo (10/24, 200/480),
  catálogo, TypeScript y build Webpack de 2.499 páginas; queda listo para fast-forward.

### Continuidad TOEFL Mac mini — Set 8, 2026-09-04

Estado EN_CURSO. Rama exclusiva `codex/toefl-curation-mac-mini-20260904`, continuación de `1f7a3c39a9f2a0dd5ae8bbfba6bfed6f6336e3a7`; base main `5af12736a991f3dc1ecbc5f691faf166f02299f9`. Ambas referencias confirmadas en GitHub en este turno. Responsable: Codex. Alcance: candidato documental Set 8, tracker y evidencia; compartido reservado: este registro. Sin cambios de runtime. Candidato de 34 ítems pasa cuatro métricas de longitud; hash y resultados en `toefl-listening-set8-screen-20260904.json`. Revisión de transcripciones legacy de conversación/anuncio/charla y scripts de las 19 adiciones; no se escucharon audios ni se certificó revisión académica. Las primeras cinco respuestas legacy requieren contraste auditivo humano. Próximo paso: Set 9, después 10–20. HR-06, revisión académica, build e integración siguen pendientes; sin migraciones, nuevas variables, push, deployment o smoke de producción.

### Continuidad TOEFL Mac mini — Set 9, 2026-09-04

Estado EN_CURSO. En la misma rama exclusiva, se preparó un candidato documental de 34 ítems para Set 9, sin cambios de runtime. La pantalla automática pasó sus auto-pruebas y las cuatro métricas: peor resultado 42,65 % en caracteres más cortos, bajo el límite de 45 %. Hash `2f7a0b89c9bf314e3655aa581cfe58048f259a4a9088bf5fa15ae8bdccb23d58`; evidencia en `toefl-listening-set9-screen-20260904.json`. Se contrastaron las transcripciones legacy y los guiones de las 19 adiciones; los cinco intercambios legacy iniciales siguen pendientes de contraste auditivo humano. El candidato conserva IDs, claves, orden, prompts y audio y no se importó. Próximo paso: Set 10. Revisión académica, HR-06, build e integración siguen pendientes; sin push, deployment, migraciones, generación de audio ni servicios pagados.

### Continuidad TOEFL Mac mini — Set 10, 2026-09-04

Estado EN_CURSO. Se preparó un candidato documental de 34 ítems para Set 10, sin cambios de runtime. La pantalla automática pasó sus auto-pruebas y las cuatro métricas; el peor resultado es 35,29 % en caracteres más cortos, bajo el límite de 45 %. Hash `1d912db1ad03564a0967d848ca730cd9c3fd607b8a5034f2c8178154499e99b8`; evidencia en `toefl-listening-set10-screen-20260904.json`. Se contrastaron las transcripciones legacy y los guiones de las 19 adiciones; los cinco intercambios legacy iniciales siguen pendientes de contraste auditivo humano. El candidato conserva IDs, claves, orden, prompts y audio y no se importó. Próximo paso: Set 11. Revisión académica, HR-06, build e integración siguen pendientes; sin push, deployment, migraciones, generación de audio ni servicios pagados.

### Continuidad TOEFL Mac mini — Set 11, 2026-09-04

Estado EN_CURSO. Se preparó un candidato documental de 34 ítems para Set 11, sin cambios de runtime. La pantalla automática pasó sus auto-pruebas y las cuatro métricas; el peor resultado es 30,88 % en caracteres más cortos, bajo el límite de 45 %. Hash `61fd8f9556f1727788b40d839b9accb1c037fb20460a29f028c5fd521ee6d971`; evidencia en `toefl-listening-set11-screen-20260904.json`. Se contrastaron las transcripciones legacy y los guiones de las 19 adiciones; los cinco intercambios legacy iniciales siguen pendientes de contraste auditivo humano. El candidato conserva IDs, claves, orden, prompts y audio y no se importó. Próximo paso: Set 12. Revisión académica, HR-06, build e integración siguen pendientes; sin push, deployment, migraciones, generación de audio ni servicios pagados.

### Continuidad TOEFL Mac mini — Set 12, 2026-09-04

Estado EN_CURSO. Se preparó un candidato documental de 34 ítems para Set 12, sin cambios de runtime. La primera proyección conservó sesgo hacia respuestas cortas y se corrigió sin rebajar controles. La pantalla final pasó sus auto-pruebas y las cuatro métricas; el peor resultado es 40,69 % en caracteres más cortos, bajo el límite de 45 %. Hash `5d739c9acf8c7b1b5534f8ed16564e8b1f6abcf17da6271db4980ba558f9978c`; evidencia en `toefl-listening-set12-screen-20260904.json`. Se contrastaron las transcripciones legacy y los guiones de las 19 adiciones; los cinco intercambios legacy iniciales siguen pendientes de contraste auditivo humano. El candidato conserva IDs, claves, orden, prompts y audio y no se importó. Próximo paso: Set 13. Revisión académica, HR-06, build e integración siguen pendientes; sin push, deployment, migraciones, generación de audio ni servicios pagados.

### Continuidad TOEFL Mac mini — Set 13, 2026-09-04

Estado EN_CURSO. Se preparó un candidato documental de 34 ítems para Set 13, sin cambios de runtime. La pantalla automática pasó sus auto-pruebas y las cuatro métricas; el peor resultado es 38,24 % en palabras más largas, bajo el límite de 45 %. Hash `7abaf06d3c1b8c553e29eb3188374735e75195b9500d3971d89785b78bc546d9`; evidencia en `toefl-listening-set13-screen-20260904.json`. Se contrastaron las transcripciones legacy y los guiones de las 19 adiciones; los cinco intercambios legacy iniciales siguen pendientes de contraste auditivo humano. El candidato conserva IDs, claves, orden, prompts y audio y no se importó. Próximo paso: Set 14. Revisión académica, HR-06, build e integración siguen pendientes; sin push, deployment, migraciones, generación de audio ni servicios pagados.

### Continuidad TOEFL Mac mini — Set 14, 2026-09-04

Estado EN_CURSO. Se preparó un candidato documental de 34 ítems para Set 14, sin cambios de runtime. La primera proyección quedó apenas sobre el límite en caracteres más cortos y se corrigió sin rebajar controles. La pantalla final pasó las cuatro métricas; el peor resultado es 42,65 % en caracteres más cortos, bajo 45 %. Hash `8a4be388c3f89a4ad28fcfacc249b6b3817e4d8e5ce9d80ba838921885cec38d`; evidencia en `toefl-listening-set14-screen-20260904.json`. Se contrastaron las fuentes textuales disponibles; los cinco intercambios legacy iniciales siguen pendientes de contraste auditivo humano. El candidato no se importó. Próximo paso: Set 15. Revisión académica, HR-06, build e integración siguen pendientes; sin push, deployment, migraciones, generación de audio ni servicios pagados.

### Continuidad TOEFL Mac mini — Set 15, 2026-09-04

Estado EN_CURSO. Se preparó un candidato documental de 34 ítems para Set 15, sin cambios de runtime. La primera proyección conservó sesgo hacia respuestas cortas y se corrigió sin rebajar controles. La pantalla final pasó sus auto-pruebas y las cuatro métricas; el peor resultado es 41,18 % en caracteres más cortos, bajo el límite de 45 %. Hash `929d5fbe28a64df53a3a80ef434ca72c19b1bbf74a31b1c1dbe7d7502a43a964`; evidencia en `toefl-listening-set15-screen-20260904.json`. Se contrastaron las transcripciones legacy y los guiones de las 19 adiciones; los cinco intercambios legacy iniciales siguen pendientes de contraste auditivo humano. El candidato conserva IDs, claves, orden, prompts y audio y no se importó. Próximo paso: Set 16. Revisión académica, HR-06, build e integración siguen pendientes; sin push, deployment, migraciones, generación de audio ni servicios pagados.

### Continuidad TOEFL Mac mini — Set 16, 2026-09-04

Estado EN_CURSO. Se preparó un candidato documental de 34 ítems para Set 16, sin cambios de runtime. La pantalla automática pasó sus auto-pruebas y las cuatro métricas; el peor resultado es 43,63 % en palabras más largas, bajo el límite de 45 %. Hash `2fd291949684c763ba17a43f4d33f9195f17517afc649b3ebd00b7692735f544`; evidencia en `toefl-listening-set16-screen-20260904.json`. Se contrastaron las transcripciones legacy y los guiones de las 19 adiciones; los cinco intercambios legacy iniciales siguen pendientes de contraste auditivo humano. El candidato conserva IDs, claves, orden, prompts y audio y no se importó. Próximo paso: Set 17. Revisión académica, HR-06, build e integración siguen pendientes; sin push, deployment, migraciones, generación de audio ni servicios pagados.

### Continuidad TOEFL Mac mini — Set 17, 2026-09-04

Estado EN_CURSO. Se preparó un candidato documental de 34 ítems para Set 17, sin cambios de runtime. La pantalla automática pasó sus auto-pruebas y las cuatro métricas; el peor resultado es 44,12 % en caracteres más cortos, bajo el límite de 45 %. Hash `92b071b996be9f689d14a0b8375de818831412be0929340a5388ef9077d8a624`; evidencia en `toefl-listening-set17-screen-20260904.json`. Se contrastaron las transcripciones legacy y los guiones de las 19 adiciones; los cinco intercambios legacy iniciales siguen pendientes de contraste auditivo humano. El candidato conserva IDs, claves, orden, prompts y audio y no se importó. Próximo paso: Set 18. Revisión académica, HR-06, build e integración siguen pendientes; sin push, deployment, migraciones, generación de audio ni servicios pagados.

### Continuidad TOEFL Mac mini — Set 18, 2026-09-04

Estado EN_CURSO. Se preparó un candidato documental de 34 ítems para Set 18, sin cambios de runtime. La pantalla automática pasó sus auto-pruebas y las cuatro métricas; el peor resultado es 37,25 % en palabras más largas, bajo el límite de 45 %. Hash `df7ddd3f277c85da006b1cbd58a2221080aee219a3509fd6622feda8b088d727`; evidencia en `toefl-listening-set18-screen-20260904.json`. Se contrastaron las transcripciones legacy y los guiones de las 19 adiciones; los cinco intercambios legacy iniciales siguen pendientes de contraste auditivo humano. El candidato conserva IDs, claves, orden, prompts y audio y no se importó. Próximo paso: Set 19. Revisión académica, HR-06, build e integración siguen pendientes; sin push, deployment, migraciones, generación de audio ni servicios pagados.

### Continuidad TOEFL Mac mini — Set 19, 2026-09-04

Estado EN_CURSO. Se preparó un candidato documental de 34 ítems para Set 19, sin cambios de runtime. La pantalla automática pasó sus auto-pruebas y las cuatro métricas; el peor resultado es 41,18 % en caracteres más cortos, bajo el límite de 45 %. Hash `a4f800753bc867295361e2555b85eedadf81cbdf9992d497f497048c54fa955f`; evidencia en `toefl-listening-set19-screen-20260904.json`. Se contrastaron las transcripciones legacy y los guiones de las 19 adiciones; los cinco intercambios legacy iniciales siguen pendientes de contraste auditivo humano. El candidato conserva IDs, claves, orden, prompts y audio y no se importó. Próximo paso: Set 20 y luego validación agregada de 680 ítems. Revisión académica, HR-06, build e integración siguen pendientes; sin push, deployment, migraciones, generación de audio ni servicios pagados.

### Continuidad TOEFL Mac mini — Set 20, 2026-09-04

Estado EN_CURSO. Se preparó un candidato documental de 34 ítems para Set 20, sin cambios de runtime. La pantalla automática pasó sus auto-pruebas y las cuatro métricas; el peor resultado es 40,69 % en palabras más largas, bajo el límite de 45 %. Hash `4375b416bb87ef35550ca7484bed676696a8e9b4b2abf0bad02dc7009d552f1f`; evidencia en `toefl-listening-set20-screen-20260904.json`. Se contrastaron las transcripciones legacy y los guiones de las 19 adiciones; los cinco intercambios legacy iniciales siguen pendientes de contraste auditivo humano. El candidato conserva IDs, claves, orden, prompts y audio y no se importó. Próximo paso: validación de candidatos 2–20, proyección de 680 ítems y paquete actualizado HR-06. Revisión académica, build e integración siguen pendientes; sin push, deployment, migraciones, generación de audio ni servicios pagados.

### Continuidad TOEFL Mac mini — validación agregada, 2026-09-04

Los candidatos documentales Sets 2–20 coinciden con sus 19 hashes del tracker, contienen 646 ítems válidos y proyectan únicamente texto de opciones. Junto con el Set 1 ya aplicado, la proyección reúne 680 IDs únicos. Los 20 sets pasan individualmente el límite 0,45 y el agregado pasa las cuatro métricas: palabras largas 28,38 %, palabras cortas 26,91 %, caracteres largos 21,18 % y caracteres cortos 35,69 %. Evidencia en `toefl-listening-all-candidates-screen-20260904.json`; reproducción con `scripts/check-toefl-listening-all-candidates.mjs`. Esto es una pantalla automática documental: no importa candidatos, no modifica runtime y no sustituye la revisión académica ni la escucha humana.

### Continuidad TOEFL Mac mini — paquete HR-06 actualizado, 2026-09-04

Estado `PENDIENTE_REVISION_HUMANA`. El nuevo contrato `toefl-sectional-hr06-length-review-candidate-20260904.json` liga la revisión al snapshot `2b6bd7f9d911e4551ceac988e495a904f5e76f96`; SHA-256 `5943893930224895b1d0878abbb075a61460030442a2888ffa3bb8eddaf6a820`. El paquete `toefl-sectional-hr06-length-review-packet-20260904.md` conserva la muestra fija Set 1/5/10/15/20/9. Se requiere aprobación académica de los 646 ítems candidatos Sets 2–20 antes de importarlos. Como aún no están en el runtime, producto y académico deben completar la muestra de extremo a extremo después de una importación autorizada. La automatización de curaduría se pausa al cerrar este paquete.
### 6 de septiembre de 2026

- La captura unificada de leads quedó `DESPLEGADA`. ICFES/SAT ya no son los únicos
  runners que bloquean el resultado hasta guardar contacto: IELTS, TOEFL, Goethe,
  DELF, CILS/CELI, CELPE-Bras, Cambridge y TOPIK exigen nombre, correo válido y
  WhatsApp plausible. El panel también recupera entregas históricas con correo sin
  inventar teléfonos ausentes.
- La rama local `codex/unify-exam-leads-20260905`, basada en `5af12736`, se integró en
  `main` como `3a12afb2`. No se publicó una rama remota separada.
- No hubo migración de Supabase: se reutilizaron la tabla `leads` y sus políticas.
- Pasaron 3 pruebas nuevas del contrato de captura, TypeScript global, ESLint acotado
  sin errores, guardianes de catálogo/admin/hub, regresiones IELTS/TOEFL y el build
  Webpack de 2.515 páginas.
- El deployment Vercel `BzFtiYxJbynNtcbaRCNMDb9DBKjN`
  (`idiomaswl-5fubkrjhg-idiomaswlduartekorzhs-projects.vercel.app`) quedó `READY` en
  12 min 4 s.
- El smoke productivo devolvió HTTP 200 en IELTS Set 1, TOEFL Set 1 y Goethe A1-1; el
  panel administrativo redirigió correctamente a `/login` y terminó en HTTP 200. No
  se creó ningún lead ficticio en producción.

### 7 de septiembre de 2026

- La curaduría y la nueva experiencia de práctica TOEFL quedaron `DESPLEGADAS`. Los
  candidatos de Listening de los Sets 2–20 (646 ítems) y el conjunto completo de 680
  listas conservan las opciones aprobadas académicamente por Zhanna Korzh; los
  guardianes verifican texto, claves, orden, persistencia y ausencia de pistas
  sistemáticas por longitud.
- La biblioteca de práctica abre primero el catálogo y los sets. Reading, Listening,
  Writing y Speaking usan la interfaz nueva en inglés; Listening y Speaking permiten
  reproducir, pausar, continuar y repetir audios, avanzar o retroceder libremente y
  continuar sin respuesta, escucha ni grabación.
- La rama `codex/toefl-curation-mac-mini-20260904` quedó respaldada en GitHub e integrada
  en `main` mediante `6fc6cd14ad06fbd43c22f4302aecc1174d8cf675`, después de incorporar
  `3106450d` y conservar ambos registros de continuidad.
- Pasaron el `prebuild` completo, el catálogo protegido, TypeScript, SEO, los guardianes
  TOEFL, 14 pruebas sobre las 680 listas de Listening y el build Turbopack de 2.517
  páginas.
- El deployment Vercel `i4af6f7B34vxmCtZtAuc4H9PMJhf`
  (`idiomaswl-rb1ff17g5-idiomaswlduartekorzhs-projects.vercel.app`) quedó `READY` en
  11 min 33 s con fuente GitHub `main`.
- El smoke productivo devolvió HTTP 200 en `/practica/toefl/ejercicios`,
  `/practica/toefl/speaking?set=3` y
  `/practica/toefl/reading/formato-2026/complete-the-words`. En Speaking Set 3 se
  verificó el estado `Pause` durante reproducción y navegación a la frase 2 mientras
  el audio seguía activo.

### 7 de septiembre de 2026 — plantilla visual transversal de práctica TOEFL

- La unificación visual quedó `DESPLEGADA` desde `main` en
  `35511319b2fb196524d70b69cbd8c835452e1bae`. Reading, Listening, Writing y Speaking
  comparten marco de ruta, catálogo de sets y encabezado de sesión; cada sección
  conserva un color propio sin cambiar la geometría ni la navegación.
- La plantilla reutilizable vive en `src/components/exam-practice/` y su contrato de
  extensión para futuros idiomas y exámenes quedó documentado en
  `docs/PRACTICE-UI-TEMPLATE.md`. El guardián TOEFL exige su uso en las nueve rutas
  activas de ejercicios.
- Pasaron `prebuild`, catálogo protegido, TypeScript, ESLint acotado, guardián de UI,
  14 pruebas de Listening y el build Webpack de 2.517 páginas. El intento Turbopack
  local se detuvo sin error tras no producir progreso; Webpack completó todo el build.
- Vercel completó el deployment `dpl_2WTDNXZTB4Thtifz6Q3oodoCo3L2` con fuente GitHub
  `main`. El smoke productivo devolvió HTTP 200 en el hub y en una sesión de Reading,
  Listening, Writing y Speaking; el HTML público contiene `PracticeRouteShell`,
  `PracticeSetCatalog` y `PracticeSessionHeader` donde corresponde.
- En Speaking Set 3 se verificaron audio en estado `Pause`, botón `Next` habilitado,
  navegación a `Sentence 2` durante reproducción y consola del navegador sin errores.

### 7 de septiembre de 2026 — quizzes multilingües de tiempos verbales

- El sistema de práctica de tiempos verbales quedó `DESPLEGADO` desde `main` en
  `e98ea5656556eabaaf6e61019bd4372e26695e5c`. La rama de trabajo
  `codex/quiz-verbos-aleman-mac-mini-20260904` permanece respaldada en GitHub.
- Los ocho idiomas y sus 92 formas comparten selección mixta intercalada y limitada,
  etiquetas ocultas durante el ejercicio, revisión con respuestas precargadas y seis
  niveles con escenas independientes. El nivel 5 exige producción de oración completa;
  alemán conserva además la decisión separable/inseparable y el nivel 6 usa historias
  extensas de producción escrita.
- El `prebuild` completo, la línea base de producción, el catálogo de 465 temas,
  TypeScript, 36 pruebas de datos y los harness de estructura, pedagogía y usuario
  promedio pasaron. El build Webpack compiló y generó 2.517 páginas estáticas.
- Vercel completó el deployment `dpl_2Pz2w2HhJV7aQJTPp7wSdgUFK9NT` con fuente GitHub
  `main`; el alias verificado es `https://www.idiomaswl.com`.
- El smoke productivo pasó 17/17 escenarios: recorrió la revisión precargada y los seis
  niveles en italiano, inglés, francés, portugués, alemán, ruso, japonés y coreano;
  auditó todas las formas del nivel 5, comprobó edición normal y verificó la mezcla de
  dos tiempos sin revelar etiquetas. No hubo errores de página.
- No se añadieron migraciones ni variables de entorno.

### 7 de septiembre de 2026 — SEO del superhub TOEFL

- La auditoría de Search Console fijó una línea base de 237 impresiones, 0 clics y
  posición media 25,1 para consultas que contienen `toefl` entre el 9 de agosto y el
  5 de septiembre. `/examenes/toefl` concentró 206 impresiones; `simulacro toefl`
  quedó como la oportunidad más cercana, en posición media 11,5.
- La rama `codex/toefl-superhub-seo-audit-20260907` quedó respaldada en GitHub e
  integrada por fast-forward en `main` como
  `b0eae043bbcf116721744f011f9acb9f5b43bc13`.
- El hub publica el título `Simulacro TOEFL gratis 2026: 20 exámenes de práctica`,
  una ruta visible de 14 recursos y un `ItemList` generado desde esa misma fuente.
  Las bibliotecas con `?set=` declaran la URL base como canonical y los dos hubs de
  práctica en inglés publican metadata y señal `lang` coherentes.
- Pasaron catálogo protegido, TypeScript, guardián de hubs, fragmentos SEO y el build
  Webpack de 2.517 páginas. La revisión local y el HTML productivo comprobaron un H1,
  14 enlaces visibles y 14 entradas estructuradas.
- Vercel completó el deployment
  `dpl_5pbyqWSjgvS8n3VFv8qKPkPFS2Yp`
  (`idiomaswl-hoxn55dna-idiomaswlduartekorzhs-projects.vercel.app`) con fuente GitHub
  `main`, estado `READY` y duración de 11 min 13 s. El preview redundante del mismo
  commit se canceló sin afectar la rama ni producción.
- El smoke productivo devolvió HTTP 200 en `/examenes/toefl`, `/practica/toefl` y
  `/practica/toefl/ejercicios`. Las tres URLs sirvieron sus canonicals esperados; el
  hub sirvió el `ItemList` 14/14 y Vercel mostró cero errores, advertencias o fallos
  fatales en la ventana posterior al despliegue.

### 8 de septiembre de 2026 — membresías Xpress y clases opcionales

- El comercio de Xpress quedó `DESPLEGADO` desde `main` en
  `e1f04f9041057a91818dd99ad44eeb9e2cac59b8`. Los estudiantes de examen pueden comprar
  30 días de simulacros con corrección automática por $49.000 o feedback docente por
  $99.000; el cambio del plan automático al docente cuesta $50.000 durante el mismo
  periodo y no genera renovación automática.
- La página protegida `/suscripcion/examenes` guarda la orden antes de abrir Wompi,
  exige aceptar condiciones y privacidad, verifica la transacción con la API privada
  del proveedor y activa acceso únicamente ante un estado `APPROVED`. El webhook,
  la cola de conciliación y los trabajos idempotentes conservan pagos y reintentan los
  correos del estudiante y de los responsables.
- Las migraciones `20260909000500_xpress_memberships_wompi.sql` y
  `20260909003500_xpress_membership_indexes.sql` quedaron aplicadas en el proyecto
  Supabase `ivqeokuxgxemhydvopdd`. Una prueba transaccional en producción comprobó pago
  pendiente sin acceso, pago aprobado con una sola membresía, notificación repetida sin
  duplicado y estado aprobado sin regresión; todos los datos de prueba se revirtieron.
- Desde la membresía y el panel aparece `Comprar clases`, que abre el flujo de clases
  existente con idioma, objetivo de examen y plan Esencial de 4 semanas preseleccionados
  (precio vigente desde $320.000). Las clases conservan su orden, reglamento y cobro
  independientes de la membresía.
- Pasaron 19/19 pruebas de Wompi, configuración, checkout, recuperación y Xpress; el
  catálogo protegido verificó 465 temas, TypeScript y ESLint acotado quedaron limpios,
  y el build Webpack generó 2.524/2.524 páginas.
- Vercel completó el deployment `dpl_CyyCQjuXX81b9f57VoDhg2Dm2xEs` desde GitHub
  `main`; el preview redundante del mismo commit fue omitido sin afectar producción.
  El smoke en `https://www.idiomaswl.com` comprobó `/registro` en HTTP 200, las diez
  familias de examen y ambos precios después de seleccionar examen, redirección 307 de
  `/suscripcion/examenes` a login sin sesión y respuesta 401 de `/api/xpress-orders`
  para una solicitud no autenticada. No se realizó ningún cobro real durante la prueba.

### 12 de septiembre de 2026 — renovaciones automáticas de Xpress

- Xpress quedó `DESPLEGADO` desde `main` en `5c179597afd956555048b6dd4b867de0e6a038b4`,
  con la implementación principal en `6ddd8a0d7e2725cad29044f52aed6b9ba9e8404c`.
  El examen individual de $12.000 sigue siendo un pago único; los planes de $49.000 y
  $99.000 se cobran por periodos sucesivos de 30 días hasta que el estudiante cancele
  la renovación desde su panel.
- La tarjeta se tokeniza y permanece en Wompi. WeLearn conserva únicamente el ID de la
  fuente de pago. Cada periodo usa una orden y referencia únicas, conciliación durable,
  límite de reintentos, notificaciones idempotentes y acceso solo después de `APPROVED`.
  La cancelación impide cobros futuros y conserva el acceso ya pagado hasta su vencimiento.
- Las migraciones `20260912110000_xpress_recurring_subscriptions.sql`,
  `20260912113000_xpress_recurring_indexes.sql`,
  `20260912114500_xpress_finalize_cancellations.sql` y
  `20260912115500_xpress_cancel_guard.sql` quedaron aplicadas en Supabase
  `ivqeokuxgxemhydvopdd`. Las tablas nuevas tienen RLS, sin lectura para `anon` o
  `authenticated`, y al cerrar la validación no contenían suscripciones ni órdenes
  recurrentes ficticias.
- Pasaron 12/12 pruebas de comercio y base de datos, TypeScript, ESLint acotado, el
  guardián de 465 temas y el build Webpack de 2.525 páginas. GitHub aprobó
  `baseline-and-types` y `production-build`. Vercel completó
  `dpl_2B6XEgp8pkDSQc64Agpxdh3BzdZL` desde GitHub `main`.
- El smoke productivo comprobó `/registro` en HTTP 200, redirección 307 de
  `/suscripcion/examenes` a login sin sesión, redirección 303 del alta de suscripción
  anónima a login, respuesta 401 al cancelar sin sesión y respuesta 401 del cron sin
  secreto. No se tokenizó ninguna tarjeta ni se realizó un cobro real.

### 12 de septiembre de 2026 — contratación de clases desde el registro

- El flujo de clases quedó `DESPLEGADO` desde `main` en
  `efacc498314037d554bbc1531d9463c0b2b8bb72`. Tanto Idioma general como Preparación
  para un examen con profesor exigen escoger uno de los cinco planes y pasan
  directamente al reglamento; la cuenta ya no se crea antes de contratar las clases.
- El formulario permanece bloqueado hasta aceptar el reglamento. Después solicita
  nombre, correo, WhatsApp, ciudad y país, dirección, propósito del curso, pagador y
  firma electrónica. La firma debe coincidir con el nombre del pagador y la orden
  conserva la versión, el texto exacto y la huella SHA-256 del reglamento aceptado.
- Wompi sigue recibiendo el pago solamente después de guardar la orden. La cuenta se
  crea tras un pago `APPROVED`; si el correo ya pertenece a un estudiante, la orden se
  vincula a ese perfil. Los correos de bienvenida y notificación conservan sus trabajos
  idempotentes y la cola de conciliación mantiene los reintentos ante interrupciones.
- El prebuild completo, TypeScript, el build Webpack y los guardianes de producto
  quedaron verdes. Vercel completó la compilación GitHub
  `DwH1zaAtuWpbSQRNFTCerDJmAv6R` y promovió el resultado a producción.
- La prueba Chromium sobre `https://www.idiomaswl.com` pasó 4/4 recorridos: selección
  obligatoria del producto, tres precios autodidactas, idioma general hacia reglamento
  y examen con profesor con plan Impulso. También comprobó que los datos y la firma se
  muestran únicamente tras aceptar las reglas. No se creó una orden ni se realizó un
  cobro real.

### 12 de septiembre de 2026 — panel académico del estudiante y seguimiento docente

- La rama aislada `codex/student-dashboard-20260912` queda `PENDIENTE DE REVISIÓN`; no
  está integrada en `main` ni desplegada. Reúne el acceso de Xpress, los reportes que el
  estudiante ya pagó y las clases contratadas en un panel privado ligado al usuario
  autenticado.
- El panel calcula una curva solo con intentos comparables de la misma familia de examen,
  y muestra promedio, tendencia, habilidades fuertes, aspectos por mejorar, días activos
  en los últimos 30 días y constancia actual. Las métricas salen de
  `exam_submissions.skills` y `daily_activity`; cuando faltan datos, la interfaz lo dice y
  no inventa resultados.
- Cada estudiante con acompañamiento puede recibir asignaciones con instrucciones, fecha
  y material. El estudiante solo lee y marca sus propias tareas mediante RLS; los perfiles
  autodidactas no admiten tareas. La ficha administrativa exige la lista autorizada de
  administradores y reúne progreso, historial, actividad y creación o cancelación de
  asignaciones.
- La migración `20260912190000_student_assignments.sql` todavía no se ha aplicado en el
  Supabase productivo. La validación local pasó 10/10 pruebas funcionales, la prueba
  transaccional de pagos y RLS, TypeScript, ESLint, el guardián de 465 temas y 4/4
  recorridos Chromium. El build Webpack también quedó verde antes de esta revisión final.
