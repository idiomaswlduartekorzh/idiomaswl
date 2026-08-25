# Auditoría de producto · SAT Set 4

Fecha de cierre: 25 de agosto de 2026. Estado: **PRODUCCIÓN VERIFICADA**.

El producto se compone en `src/data/mocks/sat/sat-set-4.ts` y está publicado desde
`main`.

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
local aislada y con una sola instancia de Next. El build de producción con Next 16.2.6 y
Webpack compiló, validó tipos y generó 2.243 páginas estáticas con salida 0. Se usó Webpack
porque el `node_modules` compartido del worktree queda fuera de la raíz que Turbopack
permite en local; los previews anteriores de esta misma rama sí compilaron con Turbopack
en Vercel.

## Evidencia de publicación

- commit SAT integrado en `main`: `efeb017da8c333df2b5ad65fcd1189071438aecc`;
- deployment de producción descendiente: `dpl_2ZgtCKHeYEP8A4QjS85TX1YAu227`, estado
  `READY`, commit `88d71ab652e39c9a803dfe71445cb339c6dd74b3`;
- build remoto con Turbopack: prebuild completo, 12 módulos SAT, 28 resultados
  adaptativos, TypeScript y 2.306 rutas generadas;
- `https://www.idiomaswl.com/examenes/sat` enlaza Sets 1–4;
- `https://www.idiomaswl.com/examenes/sat/practica/set-4` devuelve HTTP 200 y contiene
  la presentación de 54 preguntas y 64 minutos;
- cero logs de nivel error encontrados en los primeros 15 minutos del deployment.
