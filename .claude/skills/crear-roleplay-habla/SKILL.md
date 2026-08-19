---
name: crear-roleplay-habla
description: Produce juegos de rol para dos personas de la sección de habla de práctica, de principio a fin con la red de agentes — plan del set, situaciones con conflicto real, las dos fichas de rol ocultas, calibración de nivel y las auditorías antes de que nada llegue a producción. Úsala cuando el usuario diga «vamos a hacer speaking acompañado», «juegos de roles», «role play», «escenarios de conversación», «habla en parejas», o cuando haya que ampliar, rehacer o adaptar a otro idioma un set existente. Es la puerta de entrada a los agentes habla-*.
---

# Crear juegos de rol para dos

Un nivel son 6 a 8 escenarios, y cada escenario son dos fichas que **nunca se leen juntas**.
Escribirlos de corrido y revisarlos al final no funciona: los defectos que los hunden —que se
resuelven en tres turnos, que uno de los dos no habla, que las ocho situaciones son la misma—
**no se ven escenario a escenario**. Por eso esto es una cadena con auditorías en medio.

Antes de nada, lee `docs/habla-acompanado-blueprint.md`. Es la fuente de verdad; esta skill
solo dice en qué orden se hacen las cosas.

## Lo que ya está decidido, para no reabrirlo

Dos personas reales, cada una con su URL y su ficha. Sin micrófono, sin IA, sin servidor.
Piloto: **inglés A2**. «Habla solo» —las 20 frases que ya están en producción— no se toca.

## La cadena

**Fase 0 — Plan.** `habla-blueprint`. Entrega la tabla del set: una fila por escenario con
acto de habla, poder, quién arranca y desenlace, y **con los seis repartos ya cuadrados**.
Sin tabla aprobada no se escribe nada.

**Fase 1 — Situaciones.** `habla-escenarios`, en paralelo por bloques. Cada uno vuelve con
su conflicto, la asimetría, la zona de acuerdo y la carta de complicación. Sin fichas todavía.

**Fase 2 — Fichas.** `habla-fichas-de-rol`, en paralelo. Las dos fichas de cada escenario,
con datos duros y andamiaje. **Ni una frase en español calcable**: eso vuelve solo.

**Fase 3 — Auditorías.** Las cinco por escenario pueden ir a la vez; el conjunto va después.

| En paralelo, por escenario | Después, sobre el set |
|---|---|
| `habla-calibrador-nivel` | `habla-auditor-conjunto` — necesita el set entero |
| `habla-auditor-naturalidad` | |
| `habla-auditor-tension` | |
| `habla-auditor-equidad` | |
| `habla-simulador-parejas` | |

**Fase 4 — Correcciones.** Vuelven a `habla-fichas-de-rol` o a `habla-escenarios`, según de
dónde venga el fallo. **Quien audita no arregla**: el que revisa su propio arreglo ya no está
auditando. Tras corregir, el simulador y el auditor de conjunto se repiten —tocar un
escenario mueve el reparto del set entero.

**Fase 5 — Veredicto.** `habla-guardian`. APTO o NO APTO.

**Fase 6 — Integración.** Solo con APTO: `habla-integracion`.

**Fase 7 — Otros idiomas.** Solo cuando el piloto convenza: `habla-adaptador-idiomas`, y
cada adaptación vuelve a pasar por calibrador, naturalidad y equidad. Aprobado en inglés no
es aprobado en coreano.

## Reglas de operación que no son opcionales

- **Ningún agente compila ni levanta servidores.** Ni `npm run build`, ni `tsc`, ni
  `next dev`, ni el navegador de previsualización, ni `pkill`. Esta máquina tiene 8 GB. El
  build lo corre el coordinador, **una vez, al final**.
- **Nunca `git add -A`.** Hay otras sesiones en el mismo árbol; se añaden las rutas propias
  una a una.
- **La ficha de A jamás resume la de B.** Ni «él te dirá que no». Es el fallo que mata el
  ejercicio y el más fácil de cometer por querer ayudar.
- **La interconexión con las otras destrezas va por la situación, nunca por el tema
  gramatical.** Nadie «habla el presente perfecto». El aeropuerto da la lectura, la escucha,
  el habla y la escritura.

## Qué se entrega al terminar

El set en el formato de §7 del blueprint, los seis informes, el veredicto del guardián, y la
lista de lo que queda abierto —hoy: sin sincronía entre las dos pantallas, sin grabación, sin
evaluación automática y sin emparejador.

## Cuánto cuesta, para saber en qué te metes

Un nivel de 8 escenarios son ~14 pasadas de agente entre redacción y auditoría, más las
correcciones. No se hace en una tacada: por bloques de dos o tres escenarios, cerrando cada
bloque antes de abrir el siguiente.
