# Fase 11 · Veredicto final del set de inglés A2 de habla acompañada

**VEREDICTO: NO APTO.** Seis de las doce puertas de §6 no se superan sobre el texto de hoy
(4, 5, 9, 10, 11, 12) y una séptima —la 8, nivel— no tiene ni una sola auditoría vigente que la
respalde. Las tres puertas de formato (cero decibles fuera de exponentes, vocabulario, prosa ≤450)
sí se superan, y se superan medidas por mí sobre el texto final.

Fecha: 22 ago 2026. Set auditado: los ocho escenarios listados abajo. El reclamo de la factura
(`fase7-fichas-4-a-charge-i-did-not-make.md`) está RETIRADO y no entra en ningún recuento.

---

## 0 · Aviso de método aplicado primero: qué evidencia caducó

Regla: un informe anterior al último cambio del archivo que audita no respalda nada. El último
cambio de contenido de cada ficha es `ae708726` (escrito en el árbol a las **08:38:36–08:38:57**)
para los escenarios 1, 3, 4, 5, 7 y 8, y `d672a01c` (**08:23:32–08:23:34**) para el 2 y el 6.

| Evidencia | Hora | ¿Vigente? |
|---|---|---|
| `fase9-nivel-1…8` | 07:59–08:16 | **NO — las ocho caducadas** (todas anteriores al último cambio de su ficha) |
| `fase10-calcable-2` y `-6` | 08:30:09 · 08:29:18 | sí |
| `fase10-calcable-1,3,4,5,7,8` | 08:29–08:34 | **NO — seis caducadas** (anteriores al 08:38) |
| `fase11-ultimas-lineas` | 08:40:07 | sí |
| `fase11-simulacion-1…8` | 08:48–14:55 | sí, las ocho |
| `fase11-equidad` · `fase11-naturalidad` | 14:55 | sí |
| `fase9-reparto-genero` | **21 ago 19:04** | **NO — caducada** |
| `fase8-diagnostico-carga` | **21 ago 13:13** | **NO — caducada** |

La caducidad de `fase9-reparto-genero` no es teórica: `fase11-equidad` §4 comprueba que la
reescritura que ese informe **declara aplicada** (*«His eleven eleven message is on your phone…»*)
**no está en el archivo**. Un informe caducado además mintió sobre su propio efecto.

Y la caducidad de las ocho de nivel tampoco: las **ocho** dicen «CABE CON CAMBIOS», ninguna
certifica un texto. Peor, `fase10-calcable-3` §2 A y B documenta que dos de esos arreglos de nivel
(N1, R2) **introdujeron líneas decibles nuevas**, que hubo que quitar después. Los arreglos de nivel
nunca se volvieron a mirar con la lente de nivel.

Para cerrar los huecos que dejó eso, medí yo sobre el texto de hoy con los scripts de
`fase11-scripts/` (15:00–15:08, posteriores a todo) y con `fase7-scripts/prosa-canonica.mjs`.

---

## 1 · Las doce puertas

| # | Puerta | Veredicto | Respaldo |
|---|---|---|---|
| 1 | Asimetría | **PASA** | `fase11-simulacion-1…8` (vigentes); §D0 «Filtraciones» de la 3; bloques *Only you know* presentes en las 16 fichas |
| 2 | Zona de acuerdo | **PASA, con reserva** | `fase11-simulacion-1…8`: la pareja sólida cierra en 8/8. Reserva: en el esc 4 el atajista **gana** con dos datos falsos (`fase11-simulacion-4` §D4) |
| 3 | Cero frase calcable | **PASA** | Medición propia sobre el texto final: `prosa-decible.mjs` → **0 de 567** oraciones de prosa empiezan por I/We/My/Our; `here-calcable.mjs` → **0 de 157** celdas `here` con comillas o pronombre+verbo, **0 de 165** filas de datos duros decibles. Cubre los ocho y sustituye a los seis `fase10-calcable` caducados |
| 4 | Andamiaje (dos piezas · la tabla en orden no puede ser la conversación) | **FALLA** | `fase11-naturalidad` (vigente): esc 2 con **16 de 18 exponentes** como oraciones cerradas decibles tal cual **y la cola de la tabla de A = los puntos 3, 1 y 4 del cierre puestos en fila**; esc 5 con 8 formas cerradas; esc 6 con 9; esc 7 sin `don't read it out loud`. Tres de ocho «suenan a libro» |
| 5 | Carga (≥40 % en palabras, solo parejas de perfil parejo, un contador declarado) | **FALLA** | Ejecución propia de `carga-unica.mjs` (contador único, bruto, declarado): **12 de 16 parejas parejas pasan**. Fallan esc 3 sólido+sólido **35,8 %**, esc 4 flojo+flojo **36,5 %**, esc 6 flojo+flojo **35,3 %**, esc 7 flojo+flojo **35,6 %**. Lo confirman los propios informes: `simulacion-3` §D7 («64/36. NO PASA por 4 puntos»), `simulacion-4` D1 («La puerta 5 NO se pasa»), `simulacion-6` («se FALLA en la pareja 3»), `simulacion-7` («NO SUPERADA en el escenario 7»). **No es el artefacto del callado**: está medido exactamente donde la regla corregida manda medir. Y el subcriterio del callado también cae: en el esc 4 «consigue su objetivo con cinco palabras en tres turnos, y eso es defecto» (`simulacion-4` §D3) |
| 6 | Complicación colocada | **PASA** | Comprobación propia sobre las ocho: carta en pantalla propia, a un solo rol, disparador global entre 3 y 6 (esc 7 y 8 en el 3; 2, 4 y 5 en el 5; 3 y 6 en el 6; esc 1 en el 5). Nota: el esc 1 lo escribe en turnos **del rol** («after your third turn») con el global entre paréntesis — es la redacción que §6 avisa de evitar, aunque aterriza bien |
| 7 | Cierre idéntico | **PASA** | Comprobación propia: las ocho fichas tienen una única sección compartida `## Both screens — how it ends`; idéntico por construcción, no por copia |
| 8 | Nivel | **SIN RESPALDO VIGENTE** | Las ocho `fase9-nivel-*` son anteriores al último cambio de su ficha **y las ocho dicen «CABE CON CAMBIOS»**. Ninguna certifica el texto de hoy. No es que falle: es que nadie lo ha mirado desde que se cambió |
| 9 | Registro | **FALLA (1 de 8)** | Comprobación propia: 1 «Polite, two strangers», 2 «Formal», 3 «Informal», 5 «Formal / Formal from him», 6 «Informal», 7 «Informal», 8 «Counter, formal». **El escenario 4 no dice el registro en ninguno de sus dos roles**, y es además la única ficha cuya tabla de exponentes no lleva columna `register` |
| 10 | Equidad | **NO SUPERADA (pendiente)** | `fase11-equidad` (vigente): 5 PASA y **3 PASA CON CAMBIOS**, con los cambios sin aplicar. Esc 2: el bloque de pérdida de B es «el único de los dieciséis que deja al jugador sin salida en el propio bloque» — acorralado, no con algo en juego. Esc 4: el único colectivo del set puesto en ridículo son cinco mujeres, más un `him` sin dueño. Esc 7: bloque de 241 caracteres, el más denso de las dieciséis, en el rol que abre |
| 11 | Simulación | **FALLA** | `fase11-simulacion-4` §D2: la pareja **flojo+flojo se muere en el turno 17 sin ninguna pieza del cierre**, porque A no tiene forma para preguntar su propio objetivo (`How many are coming back at …?` no existe en su tabla). §6 exige que la floja llegue con el andamiaje |
| 12 | Conjunto | **FALLA** | Ejecución propia de `actos-cuota.mjs` sobre 132 turnos-materia: **`insistir` = 1,5 %**, por debajo del suelo del 3 % — el «acto de adorno» que §5 nombra. Además el esc 8 declara `proponer-alternativa` en su banda y **no lo produce**. Los otros cinco repartos sí pasan: techo 30 % (máximo `pedir-aclaracion` 16,7 %), arranca 4A/4B = 50 %, desenlace 3 acuerdo + 3 parcial + 1 aplazado + 1 sin acuerdo, escenografía 0 de 8 en aula, poder 4 `a>b` / 2 `b>a` / 2 `igual`, y género sin concentración (`genero-verificado.mjs`: entre los nombrados, el poder queda 2 hombres / 2 mujeres) |

## 2 · Las tres puertas de formato

| Puerta | Veredicto | Medición |
|---|---|---|
| Cero líneas decibles fuera de la tabla de exponentes | **PASA** | 0/567 oraciones de prosa · 0/157 celdas `here` · 0/165 filas de datos duros |
| Vocabulario completo, específico, definición más simple que la palabra | **PASA** | 157 entradas · 8–10 por rol en los 16 · las 157 con `what it is` y con `here` · ninguna definición pasa de 16 palabras · exclusividad por escenario 75–100 %. **Aviso**: 28 de 157 (17,8 %) superan la prueba de §11 «¿puede llegar al cierre sin ella?» y sobrarían |
| Prosa ≤ 450 | **PASA** | 16/16 dentro del techo · peor caso 450 · media ≈445 |

**Corrección al contador canónico, y es de método.** `prosa-canonica.mjs` selecciona con
`/^fase7-(fichas-.*|modelo-ficha-en)\.md$/`: por eso mide el escenario **RETIRADO** (457, el único
que se pasa del techo en su salida) y **no mide el escenario 4 vivo**, que está en
`fase8-fichas-4nuevo.md`. Aplicadas sus mismas reglas al 4 vivo: **A 443 · B 449**. El set vivo
cumple; el `457*` que imprime el script es de una ficha que no existe.

---

## 3 · Lista accionable

| # | Qué | A quién vuelve | ¿Una pasada o rediseño? |
|---|---|---|---|
| 1 | **Puerta 5 · esc 4, 6, 7**: la pareja floja se queda en 35–36 %. El propio diagnóstico dice que no se arregla dándole más al lado corto, sino quitándole al largo los turnos que gasta preguntando lo que no sabe preguntar | `habla-escenarios` | **REDISEÑO** de la ruta floja en tres escenarios |
| 2 | **Puerta 5 · esc 3 (el molde)**: 64/36 en sólido+sólido, y el informe señala el turno único que lo produce (A10, el mensaje al grupo) | `habla-escenarios` | Una pasada (partir ese turno) |
| 3 | **Puerta 11 · esc 4**: la pareja floja muere en el turno 17. Falta la forma para preguntar el propio objetivo | `habla-escenarios` + `habla-fichas-de-rol` | **REDISEÑO** — misma raíz que el nº 1 |
| 4 | **Puerta 5 · esc 4, callado**: consigue su objetivo con cinco palabras en tres turnos. §6 manda esto a escenarios por escrito | `habla-escenarios` | **REDISEÑO** del criterio de éxito de ese rol |
| 5 | **Puerta 4 · esc 2**: 16 de 18 exponentes son oraciones cerradas y las cuatro últimas filas son el cierre en orden. Esc 5 (8 formas), esc 6 (9), esc 7 (falta `don't read it out loud`) | `habla-fichas-de-rol` | Una pasada por ficha, pero son cuatro |
| 6 | **Puerta 4 · proceso**: las tablas `Say it here` están declaradas **fuera de alcance** en `fase10-calcable-2/3/4/6/8`. Nadie podía citarlas, así que nadie las arregló. Hay que levantar la exclusión y medir dos números por rol: formas sin elipsis, y correlación entre el orden de la tabla y el del cierre | `habla-integracion` (guardián) | Una pasada — es una puerta nueva, no un arreglo |
| 7 | **Puerta 12**: `insistir` al 1,5 %. O sube a ≥4 turnos del set, o sale de las bandas. Y el esc 8 declara `proponer-alternativa` sin producirlo | `habla-escenarios` | Una pasada |
| 8 | **Puerta 10**: los tres cambios de `fase11-equidad` ya están redactados literalmente (esc 2 bloque de pérdida · esc 4 las cinco mujeres y el `him` · esc 7 el bloque de 241 caracteres y `building manager`) | `habla-fichas-de-rol` | Una pasada — el texto ya está escrito |
| 9 | **Puerta 9 · esc 4**: no dice el registro en ninguno de sus dos roles, y su tabla de exponentes no lleva columna `register` | `habla-fichas-de-rol` | Una pasada |
| 10 | **Puerta 8**: reauditar los ocho de nivel sobre el texto de hoy. No es un arreglo, es evidencia que falta | `habla-calibrador-de-nivel` | Una pasada, pero **bloqueante**: sin ella la puerta 8 no se puede firmar |
| 11 | **Contador canónico**: `prosa-canonica.mjs` mide el escenario retirado y no mide el 4 vivo | `habla-integracion` | Una pasada (una línea de regex) |

**Orden.** Los nº 1, 3 y 4 son la misma raíz y hay que hacerlos juntos, antes que nada: mueven texto
y obligan a repetir simulación, nivel y calcabilidad de esos escenarios. Los nº 5, 8 y 9 se pueden
hacer en paralelo. El nº 10 se hace **al final**, sobre el texto ya movido, o vuelve a caducar —que
es exactamente lo que ha pasado tres veces en esta cadena.

---

## 4 · Lo que queda abierto aunque un día sea APTO

Esto no lo arregla ninguna pasada de contenido; es §8 del blueprint, y se dice, no se disimula:

- **No hay sincronía entre las dos pantallas.** El temporizador y la carta los abre cada uno en su
  URL.
- **No se graba nada.** No hay evidencia de que la conversación ocurrió.
- **No hay evaluación automática.** Nadie corrige lo que se dijo.
- **No hay emparejador.** Si el estudiante no tiene con quién, este modo no le sirve.

Y una quinta, propia de esta ronda: **§9 exige que cada escenario diga por escrito qué pasa si la
carta se mira antes de tiempo, y que la respuesta sea «nada bueno».** Solo el esc 8 lo escribe
(«Don't open this card early…»). Los otros siete lo dejan implícito.
