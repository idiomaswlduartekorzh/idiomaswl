---
name: crear-examen-sat
description: Produce un examen SAT de inglés (sección Reading and Writing) de principio a fin con la red de agentes — plan verificado, textos originales, ítems con clave y distractores razonados, y las ocho auditorías antes de que nada llegue a producción. Úsala cuando el usuario diga "vamos a hacer un simulacro SAT", "crea un módulo de SAT", "necesito preguntas tipo SAT", "arma el examen de SAT", o cuando haya que ampliar, rehacer o completar un set SAT existente. Es la puerta de entrada a los agentes sat-*.
---

# Crear un examen SAT

Un módulo son 27 ítems, cada uno con su propio texto. Escribirlos de corrido y revisarlos
al final no funciona: los defectos que hunden un simulacro —la clave siempre en la misma
letra, ítems que se aciertan sin leer, dos respuestas defendibles— **no se ven ítem por
ítem**. Por eso esto es una cadena con auditorías en medio, y no un encargo de redacción.

Antes de nada, lee `docs/sat-ingles-blueprint.md`. Es la fuente de verdad; esta skill solo
dice en qué orden se hacen las cosas.

## La cadena

**Fase 0 — Plan.** `sat-blueprint`. Verifica los parámetros contra College Board (los de
§2 llevan ⚠️ porque salieron de memoria) y entrega la tabla de 27 filas: dominio, tipo,
tema, dificultad y **clave preasignada**. Sin plan aprobado no se escribe nada.

**Fase 1 — Textos.** `sat-passage-writer`, en paralelo por bloques de dominio. Devuelve
cada texto con sus métricas de complejidad.

**Fase 2 — Ítems.** `sat-item-writer`, en paralelo por bloques. Cada ítem sale con clave
**y con la razón de error de cada distractor**. Un ítem sin eso vuelve.

**Fase 3 — Auditorías.** Las ocho, y todas hacen falta. Cinco pueden ir a la vez:

| En paralelo | Después, en serie |
|---|---|
| `sat-key-auditor` (clave, a ciegas) | `sat-difficulty-calibrator` — necesita los ítems ya corregidos |
| `sat-bias-auditor` (el conjunto) | `sat-student-simulator` — se hace sobre el módulo final |
| `sat-fairness-auditor` (equidad) | |
| `sat-language-auditor` (inglés y reglas) | |
| `sat-originality-auditor` (derechos) | |

**Fase 4 — Correcciones.** Devuelve los ítems marcados a `sat-item-writer`. **Quien
audita no arregla**: el que revisa su propio arreglo ya no está auditando. Tras corregir,
`sat-key-auditor` y `sat-bias-auditor` se repiten sobre lo tocado — arreglar un ítem
cambia el reparto de claves del módulo entero.

**Fase 5 — Veredicto.** `sat-release-warden`. APTO o NO APTO. No hay tercera opción.

**Fase 6 — Integración.** Solo con APTO: `sat-integration`.

## Reglas de operación que no son opcionales

- **Ningún agente compila ni levanta servidores.** Ni `npm run build`, ni `tsc`, ni
  `next dev`, ni `pkill`. Esta máquina tiene 8 GB: ocho agentes compilando a la vez la
  dejaron sin memoria, y dos mataron procesos por patrón llevándose por delante sesiones
  ajenas. El build lo corre el coordinador, **una vez, al final**.
- **Nunca `git add -A`.** Hay otras sesiones trabajando en el mismo árbol. Se añaden solo
  las rutas propias, escritas una a una.
- **Un examen completo son tres módulos**: M1, M2-fácil y M2-difícil. Un solo módulo es
  un simulacro parcial y hay que decirlo así.
- **Ni un texto ni un ítem oficial de College Board**, ni siquiera como punto de partida.
  Todo original. Esto detiene un lote entero, no lo penaliza.

## Qué se entrega al terminar

El set en el formato de `src/data/mocks/types.ts`, los ocho informes de auditoría, el
veredicto del guardián, y la lista de lo que queda abierto —hoy: adaptatividad entre
módulos y conversión a escala 200–800, que el motor todavía no hace.

## Cuánto cuesta, para saber en qué te metes

Un módulo de 27 ítems son ~15 pasadas de agente entre redacción y auditoría, más las
correcciones. No se hace en una tacada; se hace por bloques de dominio, cerrando cada
bloque antes de abrir el siguiente.
