# Archivo

Documentos que **ya no describen el estado del proyecto**. Se conservan porque
explican por qué se tomaron ciertas decisiones, no porque haya que actuar sobre
ellos.

**No los uses como referencia de cómo está el código hoy.** Si un documento de
aquí contradice a `docs/OPERACION-REPOSITORIO.md`, a `CLAUDE.md` o al código,
gana el código.

Archivado el 2026-08-02. Cada entrada dice qué lo dejó obsoleto.

| Documento | Qué era | Por qué está aquí |
|---|---|---|
| `AUDIO_NEEDED.md` | Lista de audios A1 pendientes por idioma | Apuntaba a `public/audio/practica/<idioma>/a1/`, ruta que nunca existió. La convención real es `public/audio/<idioma>/a1/`, y ahí ya hay 20 mp3 de inglés, 20 de italiano y 41 de alemán |
| `audios-necesarios-a1.md` | Guiones para "3 grabaciones por idioma" en A1 | La premisa quedó corta: se produjeron 20 por idioma, no 3. Francés, portugués y coreano siguen sin audio A1, pero eso está en `GUIONES-PENDIENTES-MASTER` |
| `QUICK_START.md` | Resumen del arreglo que evitaba que el PC se quedara sin memoria | Remediación puntual ya aplicada; citaba `next.config.js` cuando el repo usa `.ts`. Lo vigente está en `docs/SAFE_DEVELOPMENT_GUIDE.md` |
| `EXECUTIVE_SUMMARY_L0_L100_PROJECT.md` | Pitch del ICFES L0→L100, "listo para desarrollo" | Construido: las migraciones `20260706_icfes_v2_foundation.sql` y `20260706b_..._vocabulary_static.sql` están aplicadas y los componentes viven en `src/components/icfes/` |
| `IMPLEMENTATION_STATUS.md` | "Sprint 1 completo · 25% de V2" | El porcentaje nunca se actualizó. Todo lo de Sprint 2 en adelante existe: `OnboardingFlow`, `DiagnosticTest`, `VocabularyEngine`, `IcfesStudentFlow`, `IcfesDashboardClient` |
| `STUDENT_SIMULATION_L0_TO_L100.md` | Simulación de persona ("María, 17") que motivó V2 | Investigación previa a un diseño que ya se implementó |
| `INDEX_SESSION_ARTIFACTS.md` | Índice de los entregables del 2026-07-06 | Artefacto de una sola sesión; indexa documentos que también están aquí |
| `HANDOFF-CLAUDE-TO-CODEX-2026-07-18.md` | Traspaso: cambio de modelo Groq + motor de corrección de writing | Todo lo descrito aterrizó (`9bd1b3f`, `7111ed5`, `d2505c7`, `41fdcd1`) |
| `cambridge-b2-new-mocks-audit.md` | Auditoría de los sets FCE 2–10 | Decía "Listening pendiente para los sets 2-10". Hoy `public/audio/cambridge-b2/` tiene 41 mp3 repartidos en `mock1`…`mock10` |
| `seo-ai-audit-2026-07-09.md` | Foto de Search Console (107 clics / 9,27k impresiones) | Diagnóstico con fecha, explícitamente "sin cambios de producción". Lo reemplaza `docs/PLAN-ATAQUE-SEO-FASES.md` |
| `seo-ai-operating-plan.md` | "Instrucción maestra" de SEO/AI-SEO por fases | Se autodeclaraba borrador. Reemplazado por `docs/PLAN-ATAQUE-SEO-FASES.md` (2026-08-02), que es el plan vigente |
| `GOAL-hubs-idiomas-seo-local.md` | Convertir cada idioma en un hub de SEO local y rehacer el nav | Hecho: existen `/clases-de-ruso`, `/clases-de-japones` y `/quienes-somos`, y los componentes `FoundersBand`, `PracticeBand` y `LocalBand` están en `src/components/hub/` |
