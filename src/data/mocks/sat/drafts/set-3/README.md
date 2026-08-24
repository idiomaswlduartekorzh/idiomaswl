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
- M1 Information and Ideas: 7/7 escritos y bloque APTO. Evidencia en
  `docs/sat-auditorias/informes/sat-set-3-m1-ii.md`.
- M1 Standard English Conventions: 7/7 escritos y bloque APTO. Evidencia en
  `docs/sat-auditorias/informes/sat-set-3-m1-sec.md`.
- M1 Expression of Ideas: 5/5 escritos y bloque APTO. Evidencia en
  `docs/sat-auditorias/informes/sat-set-3-m1-eoi.md`.
- M1 total: 27/27; contenido editorial APTO, producto todavía no evaluado.
- M2 estándar: 27/27, cuatro bloques escritos y contenido editorial APTO. Evidencia en
  `docs/sat-auditorias/informes/sat-set-3-m2-facil-cs.md`
  `docs/sat-auditorias/informes/sat-set-3-m2-facil-ii.md`
  `docs/sat-auditorias/informes/sat-set-3-m2-facil-sec.md`,
  `docs/sat-auditorias/informes/sat-set-3-m2-facil-eoi.md` y
  `docs/sat-auditorias/informes/sat-set-3-m2-facil-editorial.md`.
- M2 exigente: matriz 5/9/13 cerrada; Craft and Structure, Information and Ideas y
  Standard English Conventions están APTOS, 22/27 total. Evidencia en
  `docs/sat-planes/sat-set-3-m2-dificil.md`,
  `docs/sat-auditorias/informes/sat-set-3-m2-dificil-cs.md` y
  `docs/sat-auditorias/informes/sat-set-3-m2-dificil-ii.md` y
  `docs/sat-auditorias/informes/sat-set-3-m2-dificil-sec.md`.
- Siguiente bloque autorizado: M2 exigente Expression of Ideas q23–q27.
