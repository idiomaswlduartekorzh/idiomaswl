# SAT set-5 — release editorial

Este manifiesto conserva la trazabilidad de los **81 ítems originales** del simulacro
adaptativo: 27 para M1, 27 para M2 estándar y 27 para M2 exigente.

## Contrato cerrado

- Los tres módulos públicos viven en `src/data/mocks/sat/sat-set-5-*.ts`.
- Cada módulo conserva CS 8 · II 7 · SEC 7 · EOI 5, metadatos y razones A-D.
- Las tres actas APTO fijan huellas por ítem y `npm run check:sat` las verifica.
- `src/data/mocks/sat/sat-set-5.ts` compone el producto con `buildSatMock`.
- El catálogo genera la quinta tarjeta y el registro ejecutable de forma reproducible.

## Evidencia de producto

- El contrato adaptativo pasa los 28 resultados posibles de M1 y sirve exactamente una
  rama de 27 preguntas, para un total de 54.
- Ambas rutas se completaron en navegador con POST interceptados: resultado sobre 54,
  desglose CS 16 · II 14 · SEC 14 · EOI 10 y 54 explicaciones.
- El corte no revela puntaje ni rama; reintentar limpia el estado.
- Las cinco rutas SAT responden 200 y los Sets 1–4 conservan su pantalla de inicio.
- En móvil 390 × 844 no hay desbordamiento horizontal en pregunta ni resultados.
