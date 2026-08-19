---
name: auditar-examen-sat
description: Audita un examen SAT ya escrito y decide si puede publicarse — las ocho auditorías, las doce puertas de calidad del blueprint y el veredicto APTO/NO APTO. Úsala cuando el usuario diga "revisa el SAT", "audita este simulacro", "está listo para producción?", "puede salir esto?", antes de integrar un set en main, o cuando llegue contenido SAT de fuera. También sirve para reauditar lo ya publicado.
---

# Auditar un examen SAT

Esta skill no escribe contenido. Decide si el que hay se puede publicar.

Sirve para tres situaciones: un módulo recién escrito por la red de agentes, contenido SAT
que llega de fuera (otro proveedor, otra sesión, un lote antiguo), y una reauditoría de lo
que ya está en producción.

Referencia obligatoria: `docs/sat-ingles-blueprint.md` §4, las doce puertas.

## Cómo se corre

Las cinco primeras a la vez, sobre el módulo completo:

1. `sat-key-auditor` — resuelve cada ítem **a ciegas** y solo después compara con la clave.
2. `sat-bias-auditor` — cuenta el conjunto: letras, rachas, longitudes, solape léxico, y
   hace la prueba a ciegas del módulo entero.
3. `sat-fairness-auditor` — qué le estamos pidiendo saber a un estudiante colombiano que
   el texto no le da.
4. `sat-language-auditor` — el inglés, y si las reglas de convenciones son reglas de verdad.
5. `sat-originality-auditor` — de dónde salió cada texto.

Y después, en serie:

6. `sat-difficulty-calibrator` — los cinco ejes, la curva por dominio, la separación M2.
7. `sat-student-simulator` — cuatro perfiles resuelven el módulo, incluido el que no lee.
8. `sat-release-warden` — consolida y firma.

## Las tres eliminatorias

Cualquier puerta fuera de umbral es NO APTO, pero estas tres no admiten conversación:

- **Originalidad.** Un texto que coincide con material publicado detiene el lote entero.
  No es un defecto de calidad: es un problema legal.
- **Clave única.** Un solo ítem con dos respuestas defendibles invalida el set. Ese ítem
  no mide nada y contamina el diagnóstico de todos los que lo respondan.
- **Prueba a ciegas ≤ 35 %.** Si se puede acertar sin leer el texto, no es un examen de
  lectura, y el estudiante que confíe en su puntaje va a llevarse un golpe el día real.

## Lo que no se hace al auditar

- No se arregla sobre la marcha. Se devuelve al redactor con el defecto escrito.
- No se baja un umbral porque el lote lleve tres rondas. El umbral se cambia en el
  blueprint, por escrito y con su motivo, o no se cambia.
- No se aprueba "con reservas". Es APTO o NO APTO.
- No se compilan cosas dentro de los agentes. Si hace falta `tsc` o `build`, lo corre el
  coordinador una vez, al final.

## Salida

Los ocho informes, el veredicto del guardián con las doce puertas contadas, y la lista de
ítems a rehacer con su motivo. Si sale NO APTO, esa lista es el encargo siguiente para
`crear-examen-sat` — no hay que empezar de cero.
