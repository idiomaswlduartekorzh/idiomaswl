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

- Rama: `codex/whatsapp-attribution-admin`; base `96e817fc` de `origin/main`.
- Estado: `EN_VALIDACION`. Responsable: Codex, tarea de tags y panel de José.
- Alcance: captura de origen en enlaces públicos de WhatsApp, referencias de contacto,
  confirmación manual o por webhook y vista privada `/dashboard/admin/contactos`.
- Compartidos reservados: `src/app/layout.tsx`, `WhatsAppFloat.tsx`, cabecera de
  `JoseDashboard.tsx`, webhook WhatsApp, `config/production-baseline.json` y una migración aditiva de Supabase.
- Dependencias: no modificar ni activar la IA nativa de WhatsApp; no tocar precios/pagos.
- Producción: pendiente de migración, validaciones y autorización de activación;
  no hay SHA integrado ni deployment de este cambio.
- Decisión de integración: `MERGE` solo tras actualizar desde `origin/main` y validar.
- Validado: 17 pruebas de contrato/API/SQL/chatbot, TypeScript acotado, ESLint,
  guardianes completos de prebuild y vista local en móvil/escritorio.
- Pendiente real: TypeScript/build globales (detenidos por contención con otra
  compilación), repetir QA de caída de DB y autorizar migración/activación productiva.
  Detalle: [`whatsapp-attribution.md`](whatsapp-attribution.md).

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
