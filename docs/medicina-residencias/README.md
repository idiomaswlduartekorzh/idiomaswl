# Residencias médicas Colombia — arquitectura de producto

Estado: arquitectura base, sin preguntas clínicas publicadas
Rama: `codex/investigacion-qbanks-medicina-colombia`
Última revisión: 2026-08-28

Este directorio gobierna el futuro producto de preparación para admisión a especializaciones médico-quirúrgicas en Colombia.

## Orden de lectura

1. [`FLUJO-DE-TRABAJO.md`](FLUJO-DE-TRABAJO.md): puertas y loop de producción.
2. [`ARQUITECTURA-PRODUCTO.md`](ARQUITECTURA-PRODUCTO.md): universidad, negocio, UX, tecnología, contenido médico y fases.
3. [`../investigacion-qbanks-residencias-medicas-colombia-2026.md`](../investigacion-qbanks-residencias-medicas-colombia-2026.md): investigación de mercado y competidores.

## Fuentes de verdad ejecutables

- `src/data/medical-residency/official-sources.ts`: documentos oficiales y límites.
- `src/data/medical-residency/university-blueprints.ts`: perfiles universitarios versionados.
- `src/data/medical-residency/editorial-taxonomy.ts`: ontología común, separando categorías oficiales de decisiones editoriales propias.
- `src/data/medical-residency/types.ts`: contrato de blueprint y de futura pregunta médica.
- `scripts/check-medical-residency-blueprints.mjs`: guardián contra datos inventados o simulacros habilitados sin evidencia.

La documentación explica las decisiones; el contrato TypeScript decide qué puede habilitar el producto.
