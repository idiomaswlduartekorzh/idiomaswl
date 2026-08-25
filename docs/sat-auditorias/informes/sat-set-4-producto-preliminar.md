# Validación preliminar de producto · SAT Set 4

Fecha: 24 de agosto de 2026. Estado: **CONTRATO ADAPTATIVO APTO · UI PENDIENTE**.

El candidato se compone en
`src/data/mocks/sat/drafts/set-4/sat-set-4.ts` sin aparecer todavía en el catálogo generado
ni en el registro público.

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
- dificultad media estándar 1,81 < M1 2,07 < exigente 2,30;
- `test:sat-factory` detecta el candidato desde su manifiesto y pasa 10/10;
- el catálogo sigue registrando solo tres sets publicados y Set 4 permanece oculto.

## Pendiente antes de publicar

- promover los archivos del candidato en la rama aislada y registrarlo temporalmente para
  un build o preview de release;
- probar en navegador ruta estándar y ruta exigente, corte de módulo, resultado por
  dominio, explicación de respuesta y reintento;
- revisar escritorio y móvil, accesibilidad básica y ausencia de errores de consola;
- emitir las tres actas JSON formales con las huellas finales de los archivos promovidos;
- actualizar desde `origin/main` y ejecutar los guardianes completos antes de integrar.

Hasta completar esos puntos, `set-4` sigue en `draft`, `publishable: false` y producción
continúa mostrando exactamente tres SAT.
