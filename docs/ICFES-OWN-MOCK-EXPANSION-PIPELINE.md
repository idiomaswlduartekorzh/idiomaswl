# Pipeline de expansión de mocks propios ICFES

**Estado:** contrato operativo v2

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

## Contrato ejecutable v2

El arreglo `mocks` conserva el baseline liberado; `candidates` contiene la cola desde `mock-24`. Un candidato nuevo nace con `contentHash: null`, procedencia pendiente y `catalogEligible`, `indexEligible` y `premiumEligible` en `false`. El validador JSON Schema real y las reglas semánticas impiden elevar esos flags por omisión.

Los reportes de inglés, formato y adjudicación se ligan a `candidateDigest`. El digest cubre identidad, ruta, versión, hash de contenido y procedencia por ítem. Si cualquiera de esos campos cambia, los tres reportes y la adjudicación quedan obsoletos. Un `PASS` con hallazgo alto/crítico, reportes contradictorios, roles repetidos o revisores repetidos bloquea la transición.

Solo `release-candidate` puede entrar explícitamente al catálogo y todavía conserva `premiumEligible: false`. `published` exige evidencia de despliegue y smoke productivo antes de habilitar monetización. `indexEligible` permanece siempre en `false` para runners; una landing indexable necesita una allowlist SEO independiente y los gates SEO y GEO/AEO/IA.

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
4. Ligar cada expediente al `candidateDigest`, con procedencia por ítem y roles/revisores distintos.
5. Corregir o rechazar; nunca inferir una clave dudosa ni reutilizar un reporte cuyo digest ya cambió.
6. Fijar `contentVersion`, hash, adjudicación y estado `approved`.
7. Añadir catálogo/registro/ruta y promover a `release-candidate`.
8. Ejecutar `npm run check:icfes-expansion`, `npm run check:icfes-superhub`, `npm run test:icfes`, TypeScript, lint relevante y build Webpack.
9. Verificar SEO y GEO/AEO/IA: contenido público directo y sustentado, paridad de datos estructurados, cero respuestas privadas indexables y ninguna promesa de ranking o citación.
10. Verificar escritorio y móvil: navegación, teclado, foco, scoring, resultado básico sin lead y ausencia de respuestas antes del envío.
11. Tras integración y smoke real, guardar evidencia de despliegue y su digest antes de cambiar a `published`.

Los bancos históricos atribuidos quedan fuera de esta expansión. No pueden convertirse en oferta paga hasta tener trazabilidad primaria por ítem y revisión jurídica de licencia.
