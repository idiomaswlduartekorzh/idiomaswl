# SAT set-2 — borrador editorial

Este scaffold reserva los **81 ítems originales** del simulacro adaptativo: 27 para M1,
27 para M2 estándar y 27 para M2 exigente. No está registrado en la aplicación y no se
publicará mientras siga con `status: draft`.

## Estado actual

- M1: 27/27 ítems escritos y ocho puertas mecánicas superadas.
- M2 estándar: 0/27.
- M2 exigente: 0/27.
- Auditorías editoriales y prueba a ciegas de M1: pendientes.
- Set completo: 27/81 ítems escritos; **no publicable**.

El M1 permanece dentro de `drafts/` hasta que las auditorías de criterio sean APTO. Se
valida sin omitir ni falsificar actas con:

```bash
node scripts/check-sat-exam.mjs --draft \
  --file src/data/mocks/sat/drafts/set-2/sat-set-2-m1.ts --verbose
```

## Contrato de salida

- Escribir primero los tres módulos bajo este directorio de borradores.
- Mantener por módulo CS 8 · II 7 · SEC 7 · EOI 5 y el orden del manifest.
- Completar metadatos, razones A-D, dificultad, tema y fuentes de hechos.
- Superar las ocho puertas mecánicas en borrador y obtener tres actas APTO con huellas
  vigentes antes de promover los archivos a `src/data/mocks/sat/sat-set-2-*.ts`.
- Componer `src/data/mocks/sat/sat-set-2.ts` con `buildSatMock`.
- Solo entonces cambiar esta entrada del catálogo a `published`, declarar fuente,
  exportación, módulos y tarjeta, y ejecutar `npm run generate:sat-catalog`.

El guardián `npm run check:sat-catalog` impide que este borrador aparezca en el hub o
en el registro ejecutable por accidente.
