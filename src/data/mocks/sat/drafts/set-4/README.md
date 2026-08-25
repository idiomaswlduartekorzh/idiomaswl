# SAT set-4 — release editorial

Este manifiesto conserva la trazabilidad de los **81 ítems originales** del simulacro
adaptativo: 27 para M1, 27 para M2 estándar y 27 para M2 exigente.

## Contrato cerrado

- Los tres módulos públicos viven en `src/data/mocks/sat/sat-set-4-*.ts`.
- Cada módulo conserva CS 8 · II 7 · SEC 7 · EOI 5, metadatos y razones A–D.
- Las tres actas APTO fijan huellas por ítem y `npm run check:sat` las verifica.
- `src/data/mocks/sat/sat-set-4.ts` compone el producto con `buildSatMock`.
- El catálogo genera la cuarta tarjeta y el registro ejecutable de forma reproducible.

## Avance

- M1: 27/27; cuatro bloques y contenido editorial APTO.
- M2 estándar: 27/27; cuatro bloques y contenido editorial APTO.
- M2 exigente: 27/27; cuatro bloques y contenido editorial APTO.
- Producto compuesto y registrado en `sat-set-4.ts`.
- El contrato adaptativo pasa para los 28 resultados posibles de M1 y entrega exactamente
  54 preguntas por ruta, con explicaciones A–D para los 81 ítems redactados.
- QA de navegador aprobada en las rutas estándar y exigente, escritorio y 390 × 844.
