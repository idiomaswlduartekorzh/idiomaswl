# SAT set-4 — borrador editorial

Este scaffold reserva los **81 ítems originales** del simulacro adaptativo: 27 para M1,
27 para M2 estándar y 27 para M2 exigente. No está registrado en la aplicación y no se
publicará mientras siga con `status: draft`.

## Contrato de salida

- Escribir los tres módulos en `src/data/mocks/sat/sat-set-4-*.ts`.
- Mantener por módulo CS 8 · II 7 · SEC 7 · EOI 5 y el orden del manifest.
- Completar metadatos, razones A-D, dificultad, tema y fuentes de hechos.
- Superar `npm run check:sat` y obtener tres actas APTO con huellas vigentes.
- Componer `src/data/mocks/sat/sat-set-4.ts` con `buildSatMock`.
- Solo entonces cambiar esta entrada del catálogo a `published`, declarar fuente,
  exportación, módulos y tarjeta, y ejecutar `npm run generate:sat-catalog`.

El guardián `npm run check:sat-catalog` impide que este borrador aparezca en el hub o
en el registro ejecutable por accidente.

## Avance

- M1: 27/27; cuatro bloques y contenido editorial APTO.
- M2 estándar: 27/27; cuatro bloques y contenido editorial APTO.
- M2 exigente: 27/27; cuatro bloques y contenido editorial APTO.
- Candidato compuesto en `sat-set-4.ts`, todavía fuera del registro público.
- El contrato adaptativo pasa para los 28 resultados posibles de M1 y entrega exactamente
  54 preguntas por ruta, con explicaciones A–D para los 81 ítems redactados.
- Siguiente unidad autorizada: validar ambas rutas y la experiencia de producto antes de
  promover archivos, emitir actas formales o cambiar el catálogo.
