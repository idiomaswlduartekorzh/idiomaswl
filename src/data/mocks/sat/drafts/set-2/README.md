# SAT set-2 — archivo editorial

Este directorio conserva el manifiesto y los wrappers de auditoría de los **81 ítems
originales** del simulacro adaptativo: 27 para M1, 27 para M2 estándar y 27 para M2
exigente. El contenido ejecutable vive en `src/data/mocks/sat/sat-set-2-*.ts`.

## Estado actual

- M1: 27/27 ítems escritos y ocho puertas mecánicas superadas.
- M2 estándar: 27/27 ítems escritos y ocho puertas mecánicas superadas.
- M2 exigente: 27/27 ítems escritos y ocho puertas mecánicas superadas.
- Auditoría editorial de Codex y controles reproducibles: completados; no hubo panel
  humano o multi-modelo independiente y esa limitación está declarada en las actas.
- Set completo: 81/81 ítems escritos; build, TypeScript y QA de ambas ramas superados.
- Catálogo y tres actas: `published` y `publicable: true`.

Las fuentes publicables viven en `src/data/mocks/sat/sat-set-2-*.ts`; este directorio
conserva wrappers de auditoría y el manifiesto histórico. El catálogo generado sirve el
set en el hub y en el registro. Los wrappers todavía permiten validar cada módulo con:

```bash
node scripts/check-sat-exam.mjs --draft \
  --file src/data/mocks/sat/drafts/set-2/sat-set-2-m1.ts --verbose
```

## Contrato de mantenimiento

- Mantener wrappers de auditoría bajo este directorio para reproducir las puertas mecánicas.
- Mantener por módulo CS 8 · II 7 · SEC 7 · EOI 5 y el orden del manifest.
- Completar metadatos, razones A-D, dificultad, tema y fuentes de hechos.
- Mantener tres actas APTO con huellas vigentes y repetir QA si cambia contenido firmado.
- Componer `src/data/mocks/sat/sat-set-2.ts` con `buildSatMock`.
- Regenerar tarjetas y registro con `npm run generate:sat-catalog` después de cualquier
  cambio del catálogo.

El guardián `npm run check:sat-catalog` impide que catálogo, tarjetas y registro diverjan.
