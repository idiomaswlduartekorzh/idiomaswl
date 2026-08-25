# Auditoría de producto · SAT Set 5

Fecha de apertura: 25 de agosto de 2026. Estado: **EN QA · NO PUBLICABLE**.

El candidato se compone en
`src/data/mocks/sat/drafts/set-5/sat-set-5.ts`. Permanece fuera del registro ejecutable,
con `publishable:false` y las tres puertas de producto en `PENDING`.

## Evidencia cerrada

- M1, M2 estándar y M2 exigente contienen 27 preguntas y 27 metadatos cada uno;
- las tres actas editoriales están vigentes y declaran sus límites no independientes;
- cada ruta entrega 54 preguntas en 64 minutos;
- `check-sat-adaptive --candidate` recorrió los 28 resultados posibles de M1;
- resultados de 0 a 15 sirven M2 estándar y de 16 a 27 sirven M2 exigente;
- nunca se sirven simultáneamente ambas ramas y el enrutado cambia una sola vez;
- el compositor prefija los IDs por parte, evitando colisiones entre M1 y M2;
- las ramas conservan CS 8 · II 7 · SEC 7 · EOI 5;
- la dificultad prevista cumple estándar 1,81 < M1 2,07 < exigente 2,30;
- originalidad local: cero secuencias comunes de ocho palabras entre 405 ítems SAT;
- el catálogo público sigue registrando exactamente cuatro sets y no enlaza Set 5.

## Puertas todavía abiertas

- `test:sat-factory` debe repetirse con el nuevo `candidateFile` ya declarado;
- TypeScript completo debe terminar con salida 0; el intento limitado a 1 GiB agotó ese
  heap y se cerró, por lo que no constituye evidencia de aprobación ni de error de tipos;
- falta ejecutar el guardián de doce puertas sobre las formas que se promoverán;
- falta QA de navegador de ambas rutas, revisión, reintento, móvil, consola y POST
  interceptados;
- falta el build de producción y la batería obligatoria del repositorio;
- antes de integrar se debe actualizar la rama desde `origin/main`, que actualmente lleva
  trabajo posterior no relacionado con SAT;
- solo después de todo lo anterior se pueden mover las fuentes fuera de `drafts`, renovar
  las huellas, declarar `publicable:true`, generar catálogo y publicar desde `main`.

## Regla de cierre

Este archivo es una bitácora de QA, no un acta de publicación. No debe cambiar a
**APTO PARA PUBLICAR** hasta que cada puerta abierta tenga evidencia reproducible y el
estado del repositorio confirme que la integración no elimina trabajo de otras sesiones.
