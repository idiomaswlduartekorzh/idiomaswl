# HR-06 — paquete final de revisión humana

Estado: **PENDIENTE DE PRODUCTO Y ACADÉMICO**. Preparado el 4 de septiembre de 2026. Este documento organiza la revisión; no la aprueba.

## En palabras simples

La parte técnica está lista para que una persona la revise. Para cerrar HR-06 hay que probar seis sets completos de Listening y emitir dos decisiones separadas:

1. **Producto:** confirmar que se entiende, se ve y se usa como Idiomas WeLearn.
2. **Académico:** confirmar que los audios, instrucciones, opciones y correcciones son correctos.

No hace falta revisar los 20 sets manualmente. La muestra obligatoria fijada por el harness es **Set 1, 5, 10, 15, 20 y 9**. Set 9 es la muestra aleatoria fijada antes de la revisión y no se puede reemplazar por conveniencia.

## Dónde revisar

Con el servidor local de la rama USB activo en el puerto 3026:

- Biblioteca: <http://127.0.0.1:3026/practica/toefl/listening/simulacros>
- Set 1: <http://127.0.0.1:3026/practica/toefl/listening/simulacros/practica/set-1>
- Set 5: <http://127.0.0.1:3026/practica/toefl/listening/simulacros/practica/set-5>
- Set 10: <http://127.0.0.1:3026/practica/toefl/listening/simulacros/practica/set-10>
- Set 15: <http://127.0.0.1:3026/practica/toefl/listening/simulacros/practica/set-15>
- Set 20: <http://127.0.0.1:3026/practica/toefl/listening/simulacros/practica/set-20>
- Set 9: <http://127.0.0.1:3026/practica/toefl/listening/simulacros/practica/set-9>

Si el preview está cerrado, arrancarlo desde `/Volumes/WELEARN_DEV/idiomaswl-toefl-sectional-seo-harness`, reutilizando las dependencias existentes y sin instalar nada:

```bash
node --max-old-space-size=3072 node_modules/next/dist/bin/next dev --webpack --hostname 127.0.0.1 --port 3026
```

## Qué debe revisar producto

En la biblioteca y en los seis sets:

- Que la identidad gráfica se sienta parte de Idiomas WeLearn, no como otro producto.
- Que sea obvio qué hay en la sección y cómo iniciar, continuar, terminar, repetir y volver.
- Que el audio, las opciones, el progreso y el resultado respondan bien.
- Que al recargar se conserve el intento y que un set no herede respuestas de otro.
- Que funcione en móvil y con teclado, con foco visible y sin controles tapados.

## Qué debe revisar académico

En los seis sets completos:

- Escuchar los audios y comprobar que corresponden a la pregunta.
- Revisar instrucciones, opciones, clave correcta y explicación del resultado.
- Confirmar que las cuatro familias de ejercicios se presentan con coherencia.
- Confirmar que el resultado bruto coincide con las respuestas realizadas.
- Confirmar que se entiende que es práctica fija, no adaptativa y sin puntuación oficial TOEFL.

## Qué ya verificó ingeniería

- TypeScript: pasa sin diagnósticos.
- Pruebas unitarias: **31/31**.
- Rutas y correctores locales: **20/20**.
- IDs inválidos: 404; payload inválido: 400.
- Orden nuevo de Set 1: Q4=D, Q6=D y Q8=B en ambos runners.
- Un intento anterior conserva su orden; un intento nuevo toma el orden aprobado.
- Selecciones, texto y audio completado persisten al recargar.
- Consola del recorrido probado: cero errores o advertencias.

Estos resultados no sustituyen escuchar la muestra ni decidir sobre identidad visual. La build de release también continúa pendiente y será obligatoria antes de integrar.

## Versión exacta

- Rama: `codex/toefl-sectional-seo-harness-20260831`.
- Snapshot a revisar: `125bbe154e738f25a59b022f0e04598b0cbaf70f`.
- Implementación del orden aprobado: `f8395a0af9f17833fadaccf13832fb38ecc1bd21`.
- `origin/main` reconciliado antes de implementar: `96e817fcee534d70ef3039d8d2e68aa5b9a735d9`.
- Contrato inmutable de revisión: `docs/toefl-sectional-hr06-final-review-candidate-20260904.json`.
- SHA-256 del contrato: `d8f8c6f39ecf196c9531d5f5575ef88785d9f51201a0eaa61887ab709b5b2492`.

Las opciones de Set 1 y las permutaciones de Q4/Q6/Q8 ya tienen aprobaciones acotadas. Esas aprobaciones no cubren la muestra completa ni cierran HR-06.

## Cómo responder

Cada decisión debe nombrar la muestra realmente completada. Se puede aprobar, aprobar con observaciones o solicitar cambios.

Producto:

> [Nombre], [rol], [fecha], aprueba producto de HR-06 para la muestra Set 1/5/10/15/20/9, snapshot 125bbe15 y candidato d8f8c6f3. [Observaciones o “sin observaciones”].

Académico:

> [Nombre], [rol], [fecha], aprueba académico de HR-06 para la muestra Set 1/5/10/15/20/9, snapshot 125bbe15 y candidato d8f8c6f3. [Observaciones o “sin observaciones”].

Si no se completó toda la muestra, indicar exactamente qué sets faltan. No se convertirá una aprobación parcial en cierre total.

## Controles que no cambian

- **C09 sigue bloqueado:** no publicar tiempos, conteos o puntuaciones como hechos oficiales del TOEFL.
- **D9 sigue visible:** no se bajaron controles ni umbrales.
- **Build pendiente:** obligatoria antes de integración.
- No avanzar a HR-07, integrar en `main`, desplegar ni limpiar HR-08 hasta que las dos decisiones humanas queden registradas.
