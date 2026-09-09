# Pipeline de expansión de mocks propios ICFES

**Estado:** contrato operativo v1

**Fecha:** 8 de septiembre de 2026

**Alcance:** mocks propios de 45 preguntas; no cubre bancos históricos atribuidos.

Este pipeline hace que un mock nuevo sea contenido versionado y auditable, no un archivo que aparece directamente en producción. La fuente de verdad es
[`own-mock-expansion-manifest.json`](../src/data/icfes/own-mock-expansion-manifest.json), validada contra
[`own-mock-expansion.schema.json`](../src/data/icfes/own-mock-expansion.schema.json).

## Estados y transición

```text
draft → in-review → approved → release-candidate → published
          ↘ rejected
```

- `draft`: puede cambiar; no entra al catálogo.
- `in-review`: contenido congelado para revisión de inglés, formato ICFES y adjudicación.
- `approved`: las observaciones están resueltas y el hash coincide con lo revisado.
- `release-candidate`: además pasa todos los controles técnicos y puede integrarse.
- `published`: existe evidencia posterior al despliegue. Este estado nunca se infiere desde Git.
- `rejected`: vuelve a autoría con hallazgos documentados.

Todo cambio en enunciado, estímulo, opción o clave invalida el hash aprobado. Debe incrementar `contentVersion`, volver a `in-review` y repetir la revisión. El hash solo se actualiza después de la aprobación; no se usa para “hacer pasar” el validador.

## Registro mínimo por mock

Cada entrada declara de forma explícita:

- `mockId`, módulo, ruta y versión de contenido;
- hash SHA-256 del objeto importado;
- procedencia (`welearn-original`), titularidad y registro de autoría;
- estado editorial, fecha, roles revisores y expediente de remediación;
- estado de publicación.

Los IDs de pregunta son locales al mock; la identidad estable global es `mockId:itemId`. Un mock propio contiene exactamente 45 preguntas y las partes 1–7 en orden.

## Revisión humana obligatoria

Tres funciones distintas revisan cada lote:

1. **Especialista de inglés:** gramática, naturalidad, una sola respuesta defendible y distractores plausibles.
2. **Revisor de formato ICFES:** instrucción, habilidad, parte, audiencia y límites de cualquier claim de alineación.
3. **Adjudicador editorial:** resuelve desacuerdos, confirma la clave y decide `approved` o `rejected` con evidencia.

Una prueba automática no demuestra corrección semántica. Los agentes o revisores producen el expediente; el validador asegura que el contenido publicado sea exactamente el que aprobaron.

## Detección de duplicados

`npm run check:icfes-expansion` bloquea:

- `mockId`, ruta o archivo duplicados;
- `itemId` repetidos dentro de un mock;
- opciones idénticas después de normalizar Unicode, mayúsculas y espacios;
- preguntas exactamente repetidas entre mocks usando parte, estímulo, enunciado y opciones;
- hashes que no coinciden con la versión aprobada.

La similitud semántica no se resuelve automáticamente: el reporte editorial debe revisar paráfrasis cercanas y bancos temáticos repetitivos.

## Quality gates de release

En este orden:

1. Completar una copia de [`ICFES-OWN-MOCK-EXPANSION-CHECKLIST.md`](./templates/ICFES-OWN-MOCK-EXPANSION-CHECKLIST.md).
2. Crear el mock como `draft`, fuera del catálogo y de los registros de rutas.
3. Ejecutar revisión multirrol y guardar expedientes con hallazgos pregunta por pregunta.
4. Corregir o rechazar; nunca inferir una clave dudosa.
5. Fijar `contentVersion`, hash y estado `approved`.
6. Añadir catálogo/registro/ruta y promover a `release-candidate`.
7. Ejecutar `npm run check:icfes-expansion`, `npm run check:icfes-superhub`, `npm run test:icfes`, TypeScript, lint relevante y build Webpack.
8. Verificar escritorio y móvil: navegación, teclado, foco, scoring, resultado básico sin lead y ausencia de respuestas antes del envío.
9. Tras integración y smoke real, registrar la evidencia antes de cambiar a `published`.

Los bancos históricos atribuidos quedan fuera de esta expansión. No pueden convertirse en oferta paga hasta tener trazabilidad primaria por ítem y revisión jurídica de licencia.
