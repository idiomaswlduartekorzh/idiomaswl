# SAT set-2 — borrador editorial

Este scaffold reserva los **81 ítems originales** del simulacro adaptativo: 27 para M1,
27 para M2 estándar y 27 para M2 exigente. No está registrado en la aplicación y no se
publicará mientras siga con `status: draft`.

## Contrato de salida

- Escribir los tres módulos en `src/data/mocks/sat/sat-set-2-*.ts`.
- Mantener por módulo CS 8 · II 7 · SEC 7 · EOI 5 y el orden del manifest.
- Completar metadatos, razones A-D, dificultad, tema y fuentes de hechos.
- Superar `npm run check:sat` y obtener tres actas APTO con huellas vigentes.
- Componer `src/data/mocks/sat/sat-set-2.ts` con `buildSatMock`.
- Solo entonces cambiar esta entrada del catálogo a `published`, declarar fuente,
  exportación, módulos y tarjeta, y ejecutar `npm run generate:sat-catalog`.

El guardián `npm run check:sat-catalog` impide que este borrador aparezca en el hub o
en el registro ejecutable por accidente.
