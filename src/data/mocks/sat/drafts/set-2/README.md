# SAT set-2 — borrador editorial

Este scaffold reserva los **81 ítems originales** del simulacro adaptativo: 27 para M1,
27 para M2 estándar y 27 para M2 exigente. No está registrado en la aplicación y no se
publicará mientras siga con `status: draft`.

## Estado actual

- M1: 27/27 ítems escritos y ocho puertas mecánicas superadas.
- M2 estándar: 27/27 ítems escritos y ocho puertas mecánicas superadas.
- M2 exigente: 27/27 ítems escritos y ocho puertas mecánicas superadas.
- Auditoría editorial de Codex y controles reproducibles: completados; no hubo panel
  humano o multi-modelo independiente y esa limitación está declarada en las actas.
- Set completo: 81/81 ítems escritos; **todavía no publicable**.

Las fuentes candidatas viven en `src/data/mocks/sat/sat-set-2-*.ts`; este directorio
conserva wrappers de auditoría y el manifiesto. El catálogo sigue en `draft`, por lo que el
hub y el registro no pueden servirlas. Se validan mecánicamente sin saltar la puerta de
producto con:

```bash
node scripts/check-sat-exam.mjs --draft \
  --file src/data/mocks/sat/drafts/set-2/sat-set-2-m1.ts --verbose
```

## Contrato de salida

- Mantener wrappers de auditoría bajo este directorio mientras el catálogo siga en draft.
- Mantener por módulo CS 8 · II 7 · SEC 7 · EOI 5 y el orden del manifest.
- Completar metadatos, razones A-D, dificultad, tema y fuentes de hechos.
- Mantener tres actas APTO con huellas vigentes. `publicable` permanece en `false` hasta
  completar build y QA de navegador con recursos disponibles.
- Componer `src/data/mocks/sat/sat-set-2.ts` con `buildSatMock`.
- Solo después de ese QA cambiar esta entrada del catálogo a `published`, declarar fuente,
  exportación, módulos y tarjeta, y ejecutar `npm run generate:sat-catalog`.

El guardián `npm run check:sat-catalog` impide que este borrador aparezca en el hub o
en el registro ejecutable por accidente.
