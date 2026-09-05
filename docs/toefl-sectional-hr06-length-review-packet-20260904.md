# HR-06 — revisión de corrección del sesgo de longitud

Estado: **PENDIENTE DE REVISIÓN HUMANA**. Preparado el 4 de septiembre de 2026. Este paquete organiza la revisión y no constituye una aprobación.

## Resultado automático listo para revisar

Los candidatos documentales de Sets 2–20 contienen 646 preguntas. Junto con el Set 1 ya aplicado, la proyección cubre 680 preguntas con IDs únicos. Cada set y el banco completo pasan las cuatro métricas de longitud con límite 45 %.

| Métrica agregada | Antes | Proyección | Límite |
| --- | ---: | ---: | ---: |
| Palabras: respuesta más larga | 77,87 % | 28,38 % | 45 % |
| Palabras: respuesta más corta | 5,05 % | 26,91 % | 45 % |
| Caracteres: respuesta más larga | 79,56 % | 21,18 % | 45 % |
| Caracteres: respuesta más corta | 5,88 % | 35,69 % | 45 % |

Evidencia: `docs/toefl-listening-all-candidates-screen-20260904.json`. Verificador: `scripts/check-toefl-listening-all-candidates.mjs`.

```bash
/Users/ddev/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  --experimental-strip-types --no-warnings \
  --experimental-loader ./tests/ts-paths-loader.mjs \
  scripts/check-toefl-listening-all-candidates.mjs
```

## Versión exacta

- Rama: `codex/toefl-curation-mac-mini-20260904`.
- Snapshot con candidatos y evidencia: `2b6bd7f9d911e4551ceac988e495a904f5e76f96`.
- Contrato: `docs/toefl-sectional-hr06-length-review-candidate-20260904.json`.
- SHA-256 del contrato: `5943893930224895b1d0878abbb075a61460030442a2888ffa3bb8eddaf6a820`.
- Muestra HR-06 fija: **Set 1, 5, 10, 15, 20 y 9**, en ese orden. Set 9 no puede sustituirse.

## Decisión requerida ahora

Antes de importar opciones al runtime, una persona responsable de contenido académico debe revisar los 646 ítems de Sets 2–20. Para cada pregunta debe confirmar:

- que la opción correcta conserva el significado de la fuente;
- que los distractores son plausibles y claramente incorrectos;
- que la redacción es natural y adecuada al nivel;
- que el audio y las opciones corresponden;
- que la clave, los IDs y el orden no cambiaron.

Durante esta continuación se revisaron en texto las transcripciones y los guiones de Sets 8–20. No se escucharon los cinco audios legacy iniciales de cada uno de esos sets; deben contrastarse de forma humana. Todos los candidatos mantienen `reviewer: null`.

Los archivos que forman la muestra fija son:

- `docs/toefl-listening-set1-options-candidate.json`
- `docs/toefl-listening-set5-options-candidate.json`
- `docs/toefl-listening-set10-options-candidate.json`
- `docs/toefl-listening-set15-options-candidate.json`
- `docs/toefl-listening-set20-options-candidate.json`
- `docs/toefl-listening-set9-options-candidate.json`

La revisión académica previa a la importación abarca Sets 2–20 completos; la muestra fija sirve además para la puerta HR-06 de extremo a extremo.

## Cómo registrar la aprobación académica de candidatos

> [Nombre], [rol], [fecha], aprueba académicamente los candidatos documentales Sets 2–20, 646 ítems, snapshot 2b6bd7f9 y contrato 59438939. [Observaciones o “sin observaciones”].

Si la revisión es parcial, debe enumerar los sets revisados y los pendientes. Una aprobación parcial no autoriza importar los demás.

## Decisiones posteriores a la importación aprobada

Los candidatos todavía no están en el runtime. Por eso la revisión final de producto y la revisión académica de extremo a extremo deben hacerse después de una importación autorizada, usando la muestra fija Set 1/5/10/15/20/9.

Producto debe comprobar navegación, legibilidad, móvil, teclado, progreso, persistencia y aislamiento entre sets. Académico debe escuchar los audios completos, comprobar instrucciones, opciones, corrección, las cuatro familias y los avisos de práctica fija sin puntuación oficial.

## Controles vigentes

- C09 sigue bloqueado: no publicar tiempos, conteos o puntuaciones como hechos oficiales de TOEFL.
- D9 se mantiene: no se redujo el umbral ni se omitió ninguna métrica.
- La pantalla automática no sustituye la revisión académica.
- No se modificó el runtime, no se ejecutó build y no hubo integración, push ni despliegue.
