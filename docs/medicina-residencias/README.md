# Residencias médicas Colombia — arquitectura de producto

Estado: arquitectura base, sin preguntas clínicas publicadas
Rama: `codex/investigacion-qbanks-medicina-colombia`
Última revisión: 2026-08-28

Este directorio gobierna el futuro producto de preparación para admisión a especializaciones médico-quirúrgicas en Colombia.

## Orden de lectura

1. [`FLUJO-DE-TRABAJO.md`](FLUJO-DE-TRABAJO.md): puertas y loop de producción.
2. [`ARQUITECTURA-PRODUCTO.md`](ARQUITECTURA-PRODUCTO.md): universidad, negocio, UX, tecnología, contenido médico y fases.
3. [`AUDITORIA-MVP.md`](AUDITORIA-MVP.md): verificación mecánica, visual, de privacidad y bloqueos.
4. [`AGENTES-VERIFICACION.md`](AGENTES-VERIFICACION.md): consejo automatizado, autoridad, consenso y auditoría.
5. [`PROTOCOLO-VAMOS.md`](PROTOCOLO-VAMOS.md): primer corte exacto cuando se autorice construir.
6. [`../investigacion-qbanks-residencias-medicas-colombia-2026.md`](../investigacion-qbanks-residencias-medicas-colombia-2026.md): investigación de mercado y competidores.

## Fuentes de verdad ejecutables

- `src/data/medical-residency/official-sources.ts`: documentos oficiales y límites.
- `src/data/medical-residency/university-blueprints.ts`: perfiles universitarios versionados.
- `src/data/medical-residency/editorial-taxonomy.ts`: ontología común, separando categorías oficiales de decisiones editoriales propias.
- `src/data/medical-residency/mvp-audit.ts`: registro append-only de fases y bloqueos.
- `src/data/medical-residency/mvp-plan.ts`: generador determinista del primer plan Caldas.
- `src/data/medical-residency/types.ts`: contrato de blueprint y de futura pregunta médica.
- `src/data/medical-residency/verification-agents.ts`: agentes versionados y controlador de liberación.
- `src/data/medical-residency/verification-evals.ts`: matriz adversarial y umbrales de seguridad.
- `scripts/check-medical-residency-blueprints.mjs`: guardián contra datos inventados o simulacros habilitados sin evidencia.
- `scripts/check-medical-verification-agents.mjs`: guardián contra autoridad médica simulada o pases sin humano.

La documentación explica las decisiones; los contratos TypeScript y guardianes deciden qué puede habilitar el producto.
