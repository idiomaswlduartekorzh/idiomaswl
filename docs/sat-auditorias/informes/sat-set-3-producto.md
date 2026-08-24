# Auditoría de producto · SAT Set 3

Fecha: 24 de agosto de 2026. Estado: **APTO PARA PUERTA DE BUILD Y PREVIEW**.

El candidato promovido se compone en `src/data/mocks/sat/sat-set-3.ts` y su entrada de
catálogo genera el registro público de forma reproducible. Esta auditoría no implica que
ya esté en producción: producción solo cambia al integrar `main` y superar su despliegue.

## Comprobado

- las tres partes contienen 27 preguntas y cada ruta entrega exactamente 54;
- resultados de M1 de 0 a 15 sirven M2 estándar y de 16 a 27 sirven M2 exigente;
- los 28 resultados posibles producen una sola transición monotónica de rama;
- nunca se sirven simultáneamente ambas ramas ni se permite reabrir M1 tras el corte;
- tiempo total 64 minutos, 32 por módulo;
- IDs prefijados por parte, sin colisiones entre respuestas de M1 y M2;
- 81 preguntas con dominio legible, clave dentro de rango y razones A–D completas para
  desglose y revisión;
- ambas ramas conservan CS8/II7/SEC7/EOI5 y 27 preguntas;
- dificultad media estándar 1,78 < M1 2,07 < exigente 2,30.
- el hub renderiza tres tarjetas y enlaza Set 3 en escritorio;
- la ruta estándar se sirvió tras un M1 bajo y la exigente tras 27/27 en M1;
- el corte oculta puntaje y rama, bloquea M1 y reinicia el reloj a 32:00;
- el resultado usa 54 como denominador, identifica la rama servida, muestra cuatro
  dominios, dos módulos y exactamente 54 explicaciones;
- el reintento limpia la rama anterior y vuelve a la introducción;
- la compuerta se probó con datos ficticios y los POST fueron interceptados: la QA no
  creó leads ni intentos reales;
- en 390 × 844 no hay desbordamiento horizontal. La pregunta aparece antes del panel de
  27 accesos rápidos;
- consola final del navegador: cero errores y cero advertencias.

El guardián se amplió para que estas condiciones se apliquen a cualquier candidato futuro
declarado en su manifiesto, no solo a Set 3.

## Puerta restante

El build completo local se intentó con límites de 2 y 3 GiB. El primero agotó el heap y el
segundo se detuvo de forma preventiva al no producir avance visible, para no competir con
otras sesiones pesadas. TypeScript y los guardianes específicos sí pasan.

El siguiente paso seguro es un build/preview remoto desde el commit de esta rama. Solo con
esa puerta verde corresponde actualizar `main`; hasta entonces producción continúa
mostrando exactamente dos SAT.
