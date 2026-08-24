# Auditoría de producto del SAT Set 2

Fecha de apertura: 23 de agosto de 2026. Estado: **PENDIENTE**.

Este documento separa el contenido editorial —ya declarado APTO en las tres actas— de la
publicabilidad del producto. Ningún resultado pendiente se presume verde y el Set 2 debe
permanecer fuera del catálogo público hasta cerrar toda la tabla.

## Evidencia requerida

| Puerta | Evidencia autoritativa | Estado |
| --- | --- | --- |
| Composición | `src/data/mocks/sat/sat-set-2.ts` construye 54 preguntas servidas desde M1 y una sola rama M2 | PASS |
| Enrutado | `node scripts/check-sat-adaptive.mjs --candidate src/data/mocks/sat/sat-set-2.ts --export satSet2` recorre los 28 resultados posibles de M1 | PASS |
| Catálogo previo | `set-2` continúa en `draft` y no aparece en el hub antes de cerrar las demás puertas | PASS |
| Guardianes | `npm run test:sat-factory`, `npm run check:sat-originality-local`, `npm run check:sat-superhub` y `npm run check:practica-catalog` | PENDIENTE TRAS MERGE |
| Tipos | `npx tsc --noEmit` | PENDIENTE |
| Construcción | build de producción completo, sin omitir el prebuild | PENDIENTE |
| Navegador · estándar | M1 por debajo del corte, corte irreversible, 27 preguntas de M2 estándar, lead y resultado de 54 preguntas | PENDIENTE |
| Navegador · exigente | M1 en o por encima del corte, corte irreversible, 27 preguntas de M2 exigente, lead y resultado de 54 preguntas | PENDIENTE |
| Navegador · móvil | 390 × 844, sin desbordamiento horizontal en intro, pregunta, corte, lead y resultados | PENDIENTE |
| Consola y red | cero errores de consola propios del flujo; los guardados del lead y resultado no bloquean la pantalla | PENDIENTE |
| Publicación | actas `publicable: true`, catálogo generado, integración desde `main` y despliegue de ese commit | PENDIENTE |
| Producción | hub muestra dos SAT, `/examenes/sat/practica/set-2` responde y ambas rutas críticas siguen operativas | PENDIENTE |

## Recorrido de navegador

Se ejecutará con un solo Chromium y sin paralelismo, reutilizando un único servidor de
producción local. Para la rama estándar se responderá M1 con claves deliberadamente
incorrectas; para la exigente se responderá con las claves del candidato. En ambos casos
se verificará que la pantalla intermedia no revele la rama, que M1 ya no sea navegable y
que los resultados sí identifiquen la rama servida.

Además de completar las 54 preguntas, se comprobarán explícitamente:

- título, 2 módulos, 54 preguntas y 64 minutos en la introducción;
- reinicio del cronómetro al entrar en M2;
- cuatro dominios y enlaces pedagógicos en los resultados;
- revisión de exactamente 54 respuestas, nunca las 81 autoradas;
- texto honesto que no presenta los aciertos como escala SAT de 200 a 800;
- aviso de marca y regreso al hub;
- ausencia de desplazamiento horizontal a 390 px.

## Cierre

Cuando todas las filas estén en PASS, se reemplazarán los bloqueantes de las tres actas,
se registrará aquí el commit y la URL verificada, y solo entonces el catálogo podrá pasar
`set-2` de `draft` a `published`.
