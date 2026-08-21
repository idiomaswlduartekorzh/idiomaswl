# Acta del guardián — inglés A2, habla acompañada, versión final en formato inglés

**Fecha:** 21 de agosto de 2026 · **Material:** `fase7-modelo-ficha-en.md` + los siete
`fase7-fichas-*.md` · **Norma:** `docs/habla-acompanado-blueprint.md` §4, §5, §6, §10, §11.

---

# NO APTO

Ocho escenarios, dieciséis fichas. **Seis de las doce puertas de §6 fallan, y las tres del
formato nuevo fallan las tres.** Ninguna de las siete auditorías de esta ronda dio un aprobado
limpio: las siete dicen «pasa con cambios», y la del escenario 8 lo dice con todas las letras
—*«tal como está no se puede publicar»*—. No es un set roto: es un set al que le falta la última
pasada de correcciones, casi todas de una línea. Pero mientras estén sin aplicar, no sale.

**Las dos reglas que cambiaron después del informe de conjunto, aplicadas:**

- **Actos por cuota de turnos, techo 30 % y suelo 3 %.** El 87,5 % que reportó el conjunto era la
  medida vieja y **ya no es un fallo**: el acto más frecuente del set es `pedir-aclaración` con
  **16,6 % de los 145 turnos**, muy por debajo del techo. El suelo sí falla.
- **Techo de prosa 450, contador canónico.** `node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`
  da **12 de 16 dentro, media 426, peor 480**. Los 9 fuera de techo que reportó el conjunto eran
  contra el 350 derogado. Las cuatro que se pasan siguen siendo hallazgo.

---

## Las doce puertas de §6

| # | Puerta | Veredicto | Respaldo |
|---|---|---|---|
| 1 | **Asimetría** | **pasa, con reserva** | `fase7-simulacion-7` (6 de 6 datos ocultos salen en la pareja sólida) · las cinco simulaciones de 1, 2, 4, 5, 6, 8 declaran «Filtración: ninguna». La reserva: `fase7-calcable-4` — el dato oculto de B está impreso tres veces y «se entrega solo, sin darse cuenta» |
| 2 | **Zona de acuerdo** | **pasa** | `fase7-naturalidad-1…8`: los siete verifican el motor y los siete lo dan intacto («el jueves a las 7:00 sigue siendo imposible», «la aritmética del escenario es correcta») |
| 3 | **Cero frase calcable** | **FALLA** | `fase7-calcable-8`: 7 decibles en 5 líneas, **dos bloqueantes**, y verificadas hoy sobre el archivo (líneas 46, 52, 122 de la ficha 8, intactas). `fase7-calcable-7`: 5, dos en la carta. `fase7-calcable-5`: 5. `fase7-calcable-6`: 1. Los de 1 (7), 2 (18) y 4 (15) sí se aplicaron —comprobado— pero **nunca se reauditaron**. Y el molde no tiene auditoría de calcabilidad: conserva `to be off \| *I'm off on Friday the 18th*` (línea 66) |
| 4 | **Andamiaje en dos piezas** | **FALLA** | `fase7-simulacion-6`: *«el rol A se juega leyendo de arriba abajo y sale una conversación que funciona»* — 7 de sus 10 filas son oraciones enteras. `fase7-simulacion-1`: tres turnos seguidos leídos de la tabla, en el orden impreso, y la pareja no lo nota. `fase7-conjunto` §5: 4 fichas con 10 exponentes contra el 6-9 de §11 (el blueprint se contradice con §10, hay que cerrarlo) |
| 5 | **Carga ≥ 40 %, en palabras** | **FALLA** | Medido sobre las simulaciones, que es lo que pide §6: `simulacion-1` 83/17 · `-2` 86/14 · `-4` 13/87 y 30/70 · `-5` 21/79 y 35/65 · `-6` 21/79 y 61/39 · `-7` 16/84 · `-8` 11/89 y 62/38. Los informes 1 y 2 lo dicen ellos mismos: *«la regla del 40 % no detecta al callado: 50/50 en turnos, 86/14 en palabras»* |
| 6 | **Complicación entre el turno global 3 y 6** | **FALLA** | Leído en las fichas: 1 → 5 ✔ · 2 → 5 ✔ · 4 → 5 ✔ · 5 → 5 ✔ · 7 → 3 ✔ · 8 → 3 ✔ · **6 → «global turn 8»** ✘, fuera de ventana. Y el molde (escenario 3) **no publica carta ni disparador**: la puerta no es verificable en 1 de 8 |
| 7 | **Cierre escrito, idéntico** | **pasa** | `Both screens — how it ends` en 8 de 8 archivos, sección compartida, idéntica por construcción · `fase7-conjunto` §6 (16/16) |
| 8 | **Nivel** | **FALLA** | `fase7-nivel-7` §4 y `fase7-nivel-8`: los `grammarReferences` existen y los títulos coinciden —salvo `prepositions-time` en la 8, cuyo `rationale` cita cuatro cadenas que no están en la ficha—. Lo que falla es §4: **la ficha 5 declara 9 minutos y el techo A2 es 8**, en las dos pantallas. Y «N turns» son dos unidades distintas en el mismo campo: 7, 8, 10, 12 y **17** |
| 9 | **Registro** | **pasa** | `fase7-conjunto` §6: la fórmula `**Registro.** … **Quién arranca.**` está en 16 de 16, con el trato dicho por escrito en las dos direcciones |
| 10 | **Equidad** | **FALLA** | El género de §5 falla (ver puerta 12). Y hay un agujero de proceso: las auditorías de equidad son `fase3-equidad-1-6`, `fase3-equidad-7-8` y `fase5-equidad-8` — **todas sobre las fichas en español**. El formato cambió entero (ficha en inglés + bloque de vocabulario) y **nadie ha vuelto a pasar equidad sobre lo que hoy ve el estudiante** |
| 11 | **Simulación** | **FALLA** | `fase7-simulacion-8`: *«el primer escenario del set donde la respuesta es que sí»* — la atajista gana, 5 de 7 criterios en 3:50, rompe su restricción 1 y le sale gratis. `fase7-simulacion-6`, pareja flojo+flojo: 7:25 y **sin cerrar**. `fase7-simulacion-8`, pareja 3: *«el escenario muere y el cierre se ejecuta igual»* |
| 12 | **Conjunto** | **FALLA** | `fase7-conjunto` + `actos2.mjs`. **Techo de actos: pasa** (máx. 16,6 %). **Suelo del 3 %: falla** — `insistir` 1 turno de 145 (0,7 %) y `recomendar` 4 (2,8 %), los cuatro en la nº 2. **Género: falla** — 3 de 4 mandos con nombre son mujeres (75 %), 2 de 8 escenarios son dos mujeres y 0 de 8 dos hombres. Arranque 50/50 ✔ · aula 0/8 ✔ · desenlace 1 y 3, sin margen · culpa **50,0 % exacto**, en el límite · poder 3/8 y **cae a 2/8 si la nº 1 se reetiqueta `igual`**, como pide el propio informe |

## Las tres del formato nuevo (§11)

| | Puerta | Veredicto | Respaldo |
|---|---|---|---|
| **A** | Cero líneas decibles fuera de la tabla de exponentes | **FALLA** | Lo mismo que la puerta 3, más el vocabulario: `vocab.mjs` da la columna `here` limpia (1 sospechosa de 158) **pero la sospechosa está en el molde** (`refund → you don't get one, and that's your argument`, línea 64), y el molde es contra lo que se escribe todo lo que venga. `fase7-simulacion-1` documenta el caso extremo del patrón: una fila de vocabulario con la frase en cursiva soltaba el dato oculto del escenario (ya corregida en la ficha 1, no en el molde) |
| **B** | Bloque de vocabulario completo, propio y con definiciones más simples que la palabra | **FALLA** | Tamaño y exclusividad, bien: 8-10 entradas en 16 de 16 y **85,4 % de las 158 entradas no se repiten en ningún otro escenario** (`vocab.mjs`). Falla el contenido de las glosas: `fase7-nivel-7` señala cinco definiciones más difíciles o falsas —`reservation`, `to pay someone back`, `to chip in`, `the mechanic`, `to put someone's name down`— **y las cinco siguen literales en la ficha 7 hoy**, más siete palabras usadas en la ficha sin glosar. Y falla el campo: **papel + dinero = 52,5 % del vocabulario del set**, en 7 de 8 escenarios; ni una palabra de comida, salud no dental, transporte, clima u ocio |
| **C** | Prosa ≤ 450, contador canónico | **FALLA** | `prosa-canonica.mjs`: **12 de 16 dentro**, media 426. Fuera: **5B 480 · 8B 476 · 8A 453 · 4B 457**. El molde es el más corto del set (346 / 376) y las siete fichas escritas contra él son todas más largas |

---

## Lo que falta, y a quién vuelve

| # | Qué | Dónde | Agente |
|---|---|---|---|
| 1 | Aplicar las 7 decibles del escenario 8 —**las dos bloqueantes primero**: `Only you know` viñeta 1 y la restricción 3 de Milena— y las 5 del 7, las 5 del 5 y la 1 del 6. Las notas de reemplazo ya están escritas en cada informe | 4 fichas | `habla-fichas-de-rol` |
| 2 | Reauditar calcabilidad de **1, 2 y 4**: sus 40 hallazgos se aplicaron y nunca se volvió a mirar. Y auditar el molde por primera vez | 3 fichas + molde | `habla-auditor-naturalidad` |
| 3 | Arreglar el molde: `to be off` (frase en cursiva en `here`) y `refund` (pronombre + verbo conjugado). Es la plantilla de los 23 niveles que vienen detrás | `fase7-modelo-ficha-en.md` | `habla-fichas-de-rol` |
| 4 | Las 5 definiciones y las 7 palabras sin glosar del escenario 7 — es la segunda ronda seguida que salen | ficha 7 | `habla-calibrador-nivel` |
| 5 | Recortar prosa en 5B (−30), 8B (−26), 8A (−3), 4B (−7). **Se corta prosa, nunca una pieza** | 3 fichas | `habla-fichas-de-rol` |
| 6 | Mover la carta del escenario 6 del turno global 8 a la ventana 3-6, o reescribirla para que la ventana tenga sentido. Y dar carta y disparador al escenario 3 en su propia ficha | fichas 6 y molde | `habla-escenarios` |
| 7 | Bajar la ficha 5 de 9 a 8 minutos. Unificar la unidad de «N turns» en las 16 cabeceras (global o por rol, una sola) | fichas 5 + las 8 | `habla-fichas-de-rol` |
| 8 | Carga en palabras: el reparto se hunde con el callado en 7 de 7 escenarios. No es de una ficha, es de diseño — hace falta que el rol callado **tenga que producir** para cerrar, no solo asentir | los 8 escenarios | `habla-escenarios` + `habla-simulador-parejas` |
| 9 | La tabla «Say it here» leída en orden sigue siendo la conversación en el rol A de la 6 y en el B de la 1. O deja de ser una lista de frases completas entrecomilladas, o el orden deja de ser el de la conversación | forma de la tabla, los 8 | `habla-fichas-de-rol` + `habla-integracion` |
| 10 | El atajista gana el escenario 8, y rompe su restricción 1 sin coste. Ese escenario necesita que irse rápido cueste algo | escenario 8 | `habla-escenarios` |
| 11 | Género: rol A masculino en la nº 5 **o** mando masculino en la nº 8. Una sola pasada, y deshace el 75 % y el par femenino sobrante | 1 ficha | `habla-auditor-equidad` |
| 12 | Suelo del 3 % en actos: `insistir` (0,7 %) y `recomendar` (2,8 %) son adorno. Se arreglan con el escenario nuevo del punto 14, no metiéndolos a la fuerza | conjunto | `habla-escenarios` |
| 13 | Pasar **equidad** por primera vez sobre las fichas en inglés | los 8 | `habla-auditor-equidad` |
| 14 | **Decisión de David:** sustituir la nº 4 `a-charge-i-did-not-make` por un escenario sin papel, sin mostrador y sin empresa, con `insistir` y `recomendar` por diseño, culpa fuera de los dos, mando masculino y vocabulario de un campo que el set no toca. Mueve cinco repartos a la vez. No la 8 (único sin-acuerdo), no la 2 (única con `recomendar`), no la 5 (única con acotación escénica) | escenario nuevo, ciclo completo | David → `habla-escenarios` |
| 15 | **Decisión de guardián, en el blueprint:** cerrar el rango de exponentes en 6-9 (§11) o 6-10 (§10), que hoy se contradicen. Cuatro fichas están en 10 | `docs/habla-acompanado-blueprint.md` | `habla-blueprint` |
| 16 | **Decisión de guardián:** la nº 1 son dos topes duros simétricos sin reloj. O se reetiqueta `igual` —y el poder cae a 2/8 y falla— o se le escribe una asimetría de verdad | ficha 1 + motor | `habla-escenarios` |

Los puntos 1 a 7 son de una pasada y no tocan ningún escenario. Del 8 al 13 tocan diseño. El 14
necesita que David diga que sí.

---

## Lo que queda abierto aunque esto llegue a APTO

Es §8 del blueprint, y no se disimula:

- **No hay sincronía entre las dos pantallas.** El temporizador y la carta los abre cada uno en su
  URL. Si hace falta que la carta salte a la vez, es producto nuevo.
- **No se graba nada.** Ninguna evidencia de que la conversación ocurrió.
- **No hay evaluación automática.** El «You did it if» lo comprueba la pareja, a ojo.
- **No hay emparejador.** El estudiante que no tiene con quién se va a «habla solo».

Y una que sale de esta ronda: **la trazabilidad entre informe y ficha no está cerrada.** Hay
simulaciones que describen filas que ya no existen (el `to fit` del escenario 1) y fichas que no
han cambiado desde la ronda anterior. Mientras cada informe no diga contra qué versión exacta se
jugó, «la buena es la que no lleva sufijo» es un acuerdo verbal, no un método.
