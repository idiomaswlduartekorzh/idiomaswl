# Auditoría de producto del SAT Set 2

Fecha de apertura: 23 de agosto de 2026. Estado: **APTO PARA PUBLICAR**.

Este documento separa el contenido editorial —ya declarado APTO en las tres actas— de la
publicabilidad del producto. Ningún resultado pendiente se presume verde y el Set 2 debe
permanecer fuera del catálogo público hasta cerrar toda la tabla.

## Evidencia requerida

| Puerta | Evidencia autoritativa | Estado |
| --- | --- | --- |
| Composición | `src/data/mocks/sat/sat-set-2.ts` construye 54 preguntas servidas desde M1 y una sola rama M2 | PASS |
| Enrutado | `node scripts/check-sat-adaptive.mjs --candidate src/data/mocks/sat/sat-set-2.ts --export satSet2` recorre los 28 resultados posibles de M1 | PASS |
| Catálogo previo | `set-2` continúa en `draft` y no aparece en el hub antes de cerrar las demás puertas | PASS |
| Guardianes | `npm run test:sat-factory`, `npm run check:sat-originality-local`, `npm run check:sat-superhub` y `npm run check:practica-catalog` | PASS |
| Tipos | `npx tsc --noEmit --incremental false` y TypeScript interno de Next | PASS |
| Construcción | build Webpack con candidato y segundo build de la configuración final sin preview | PASS |
| Navegador · estándar | M1 por debajo del corte, corte irreversible, 27 preguntas de M2 estándar, lead y resultado de 54 preguntas | PASS |
| Navegador · exigente | M1 en o por encima del corte, corte irreversible, 27 preguntas de M2 exigente, lead y resultado de 54 preguntas | PASS |
| Navegador · móvil | 390 × 844, sin desbordamiento horizontal en intro, pregunta, corte, lead y resultados | PASS |
| Consola y red | cero errores de página; dos POST abortados deliberadamente por recorrido para no insertar leads falsos | PASS CON LÍMITE DECLARADO |
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

## Ejecución tras integrar `main`

Checkpoint probado: `0be116ee` sobre el merge `e04cf7bd`.

```text
check:practica-catalog       PASS · 465 temas y módulos protegidos
test:sat-factory             PASS · 9/9
check:sat-superhub           PASS · 10 páginas, ocho puertas
check:sat-catalog            PASS · 1 publicado, 1 borrador
check:sat-originality-local  PASS · 6 módulos, 162 ítems, cero coincidencias de 8+ palabras
check-sat-adaptive candidato PASS · 28/28 resultados de M1; corte 16/27
```

Estas pruebas se ejecutaron de forma serial para no competir con otras sesiones. TypeScript,
build y Chromium se aplazaron inicialmente porque la máquina seguía con carga elevada y
menos de 6 GB de disco libre. Se retomaron cuando hubo 67 % de memoria disponible y 8,4 GB
libres; la segunda construcción limitó Next a un solo worker.

## Evidencia de producto

```text
TypeScript aislado          PASS · exit 0 · incremental desactivado
Next 16.2.6 + Webpack       PASS · 1.912 páginas · ruta QA incluida
Configuración final         PASS · 1.911 páginas · preview retirado
Rama estándar · móvil      PASS · 30/54 · 54 revisiones · 4 dominios · overflow 0
Rama exigente · escritorio PASS · 54/54 · 54 revisiones · 4 dominios · overflow 0
Corte entre módulos         PASS · no revela rama · M1 ya no es navegable
Cronómetro M2               PASS · reinicia en 32:00
Escala y transparencia      PASS · no presenta aciertos como puntaje 200–800
```

Los POST de `saveLead` y `saveExamResult` se abortaron desde el navegador antes de salir del
equipo. `Promise.allSettled` permitió comprobar que una caída de persistencia no bloquea el
resultado. Los errores de consola observados fueron exclusivamente los cuatro
`net::ERR_FAILED` provocados por esa intercepción; no hubo errores de página.

## Cierre

Las puertas locales están cerradas y las tres actas autorizan publicación. Quedan como
evidencia posterior la integración desde `main`, el despliegue de ese commit y la
verificación de la URL productiva; esas filas no se anticipan desde la rama candidata.
