# Auditoría de producto · SAT Set 4

Fecha: 24 de agosto de 2026. Estado: **APTO PARA PUERTA DE BUILD Y PREVIEW REMOTA**.

El producto se compone en `src/data/mocks/sat/sat-set-4.ts`. Esta auditoría no implica
que ya esté en producción: producción solo cambia al integrar `main` y superar su
despliegue.

## Comprobado

- las tres partes contienen 27 preguntas y cada ruta entrega exactamente 54;
- resultados de M1 de 0 a 15 sirven M2 estándar y de 16 a 27 sirven M2 exigente;
- los 28 resultados posibles producen una sola transición monotónica de rama;
- nunca se sirven simultáneamente ambas ramas ni se permite reabrir M1 tras el corte;
- tiempo total 64 minutos, 32 por módulo, con reinicio del reloj al comenzar M2;
- IDs prefijados por parte, sin colisiones entre respuestas de M1 y M2;
- 81 preguntas con dominio legible, clave válida y razones A–D completas;
- dificultad media estándar 1,81 < M1 2,07 < exigente 2,30;
- el hub local renderiza cuatro tarjetas y enlaza Set 4;
- un M1 bajo sirvió el contenido de M2 estándar y un 27/27 sirvió M2 exigente;
- el corte oculta puntaje y rama, bloquea M1 y presenta 27 preguntas nuevas;
- ambos resultados usan 54 como denominador, identifican la rama servida y muestran
  cuatro dominios con denominadores 16/14/14/10;
- cada ruta mostró exactamente 54 ítems de revisión y 54 explicaciones de clave;
- el reintento limpió el intento estándar y volvió a la introducción antes de la ruta alta;
- los POST se interceptaron durante toda la QA: no se crearon leads ni intentos reales;
- en 390 × 844, `documentElement`, `body` y viewport midieron 390 px: cero overflow;
- consola final: cero errores. Solo apareció el aviso de fuente precargada de Next dev.

## Evidencia reproducible

`test:sat-factory` pasa 10/10, `check:sat-adaptive` recorre los 28 resultados de M1,
`check:sat` verifica las doce puertas y las huellas de los tres módulos, y TypeScript
compila sin errores. La QA de navegador se ejecutó con Playwright CLI sobre una preview
local aislada y con una sola instancia de Next.

## Puerta restante

Antes de integrar: actualizar desde `origin/main`, ejecutar el guardián del catálogo de
práctica, TypeScript y el build completo. Después corresponde integrar exclusivamente en
`main` y verificar el despliegue de producción. Hasta entonces producción conserva tres
SAT públicos.
