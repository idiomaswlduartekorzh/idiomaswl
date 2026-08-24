# SAT set-3 — borrador editorial

Este scaffold reserva los **81 ítems originales** del simulacro adaptativo: 27 para M1,
27 para M2 estándar y 27 para M2 exigente. No está registrado en la aplicación y no se
publicará mientras siga con `status: draft`.

## Contrato de salida

- Escribir los tres módulos en `src/data/mocks/sat/sat-set-3-*.ts`.
- Mantener por módulo CS 8 · II 7 · SEC 7 · EOI 5 y el orden del manifest.
- Completar metadatos, razones A-D, dificultad, tema y fuentes de hechos.
- Superar `npm run check:sat` y obtener tres actas APTO con huellas vigentes.
- Componer `src/data/mocks/sat/sat-set-3.ts` con `buildSatMock`.
- Solo entonces cambiar esta entrada del catálogo a `published`, declarar fuente,
  exportación, módulos y tarjeta, y ejecutar `npm run generate:sat-catalog`.

El guardián `npm run check:sat-catalog` impide que este borrador aparezca en el hub o
en el registro ejecutable por accidente.

## Avance

- M1 Craft and Structure: 8/8 escritos y bloque APTO. Evidencia en
  `docs/sat-auditorias/informes/sat-set-3-m1-cs.md`.
- M1 total: 8/27.
- M2 estándar y M2 exigente: 0/27.
- Siguiente bloque autorizado: M1 Information and Ideas q09–q15.
