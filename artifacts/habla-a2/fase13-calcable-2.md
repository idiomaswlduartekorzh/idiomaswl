# Fase 13 · Calcabilidad del escenario 2 — `no-appointment-until-thursday`

**Auditado:** `/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/fase7-fichas-2-no-appointment-until-thursday.md`
leído del disco el 22 ago 2026. `git diff HEAD` sobre la ficha está **vacío**: lo que audito es
exactamente el commit `0a57fe20`, no un árbol sucio.

**Prueba única:** *si la línea se puede decir tal cual y el turno avanza, está mal escrita.*

**Alcance:** prosa, tabla de datos, tabla de vocabulario y **las dos tablas `Say it here`**
(blueprint §11, commit `a677b077`).

---

## Veredicto

**DEVUELVE A `habla-fichas-de-rol` · 2 líneas decibles sobre 110 unidades.**

Unidades, la misma base que `fase12-calcable-2.md` para que las dos cifras se puedan comparar:
**52 oraciones de prosa** (26 A + 26 B) + **40 filas** de datos y vocabulario (10+10 por rol) +
**18 filas de exponentes**. El recorte del 22 ago no movió ninguna frontera de oración: las siete
sustituciones cambian palabras dentro de la misma oración, así que la base sigue siendo 110.

Se devuelve por tres cosas: **uno de los dos cambios de fase 12 no está aplicado**, y el recorte
de siete frases dejó **dos líneas que hoy se levantan enteras** —una restricción de A y el primer
dato oculto de A—.

---

## 1 · Estado de los dos cambios que pedía `fase12-calcable-2.md`

### Cambio 1 — las dos etiquetas de la tabla de B que nombran un momento · **NO APLICADO**

Las dos filas están hoy en el disco, palabra por palabra como estaban:

> línea 160 · `| how you walk in | `I don't have an appointment. Can you help me, please?` | say what you are before they ask |`

> línea 163 · `| the two questions before you leave | `What time do I have to be there?` · `Does my plan cover it…?` | the two things you leave without if nobody asks |`

El recorte no tocó ninguna tabla —lo dice él mismo, «solo prosa, ningún dato»— y estas dos filas
no eran prosa. Sigue en pie el defecto tal cual se describió: el alfabeto barajó las nueve filas,
pero `how you walk in` dice «así se entra» y `the two questions before you leave` dice «esto es lo
último», así que un estudiante reconstruye el arranque y el cierre sin leer nada más, y la segunda
además empaqueta los puntos 1b y 2 del cierre en una celda. Los tres pasos que hacen falta siguen
siendo los del informe anterior: renombrar por función, no dividir la fila (dividirla da 10 filas
para 9 turnos y rompe el tercer criterio), y reordenar alfabéticamente después.

### Cambio 2 — la regresión de cifras declaradas · **APLICADO EN LO VIVO, CON UN RESTO**

Medido hoy con el único contador válido
(`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`): **ROLE A 449 · ROLE B 448**, techo
450, y la ficha declara en su tabla de cuenta de prosa (líneas 250-251) **449 / 448**. Declarado =
medido. Las 16 fichas pasan.

De las dos salidas que ofrecía el informe se tomó la segunda: `· use it or don't ·` **sigue en las
dos cabeceras** (líneas 81 y 153) y se compensó recortando prosa. La aritmética del recorte es
exacta, verificada palabra a palabra: −6 en A (−3 en la restricción 1, que perdía además el guion
largo, que el contador cuenta como palabra; −1, −1, −1) y −6 en B (−1, −2, −3). 455−6 = 449 y
454−6 = 448.

**El resto.** Queda una declaración vieja sin marcar, línea 352, dentro de la pasada del 21:

> `   **A 450 · B 448**, techo 450. Los arreglos 1 y 3 añaden palabras; se compensó recortando el`

Su gemela de la pasada quirúrgica (línea 452) sí recibió el aviso —`—cifra desmentida el 22 ago:
el contador daba 455/454, ver el recorte al final—`— y esta no. Las dos eran ciertas el día que se
escribieron y las dos son falsas hoy; tratarlas distinto es lo que deja al lector sin saber cuál de
los dos «450» es el vivo. **Arreglo, 6 palabras:** añadir tras la cifra `—corregida el 22 ago: ver
el recorte—`. LEVE, pero es el mismo agujero del hallazgo 62 y por eso conviene cerrarlo aquí.

---

## 2 · Cepillo sobre las siete frases recortadas

Las siete son texto nuevo. Cinco quedan bien —dos de ellas **mejor que antes**— y dos se levantan
enteras.

### H13-1 · MEDIA · ROLE A, restricción 1 · **decible**

> `You can't ask Dr. Restrepo anything before 5:00, and never by phone: only in writing.`

Dicha en voz alta por A al paciente, el referente se invierte y **no se rompe**: sale una línea de
mostrador perfectamente normal —«no puede preguntarle nada a la doctora antes de las cinco, y por
teléfono nunca: solo por escrito»— y B contesta («¿y entonces cuándo me dice?»). El turno avanza.

Lo que protegía a esta línea antes del recorte era justo lo que el recorte se llevó: la cola
`and you ask her in writing — you never call` clavaba el sujeto en la rutina de A, porque un
paciente no «le escribe» a la dentista. La cola nueva, `never by phone: only in writing`, es una
regla impersonal que suena igual en las dos bocas. Es un caso de manual de lo que el encargo
temía: recortar quitó el ancla.

**Arreglo, 15 palabras (hoy son 15):**
`You can't ask Dr. Restrepo anything before 5:00: you write to her, you never call.`
Dicha a B, `you write to her, you never call` no significa nada para un paciente. Se rompe.

### H13-2 · MEDIA · ROLE A, dato oculto 1 · **decible, y regala el 5:20**

> `You have an appointment at 5:20 today, with a patient who missed twice.`

Dicha por A: «You have an appointment at 5:20 today» es, literalmente, la oferta que A **no** puede
hacer, y la cola es la fuga que su restricción 2 prohíbe. B la oye como «le doy las 5:20», acepta,
y el escenario se acaba en el turno 1 con las dos cosas rotas a la vez: la puerta que había que
dejar entreabierta sin nombre ni motivo se abre con nombre y motivo.

El recorte solo quitó `already`, pero al quitarlo dejó la oración cerrada en `twice`, sin la coleta
escrita que la delataba como texto de ficha. Entra en el cepillo por eso: es una de las siete, y
después del recorte se lee de corrido.

**Arreglo, 10 palabras (hoy son 13):**
`At 5:20 today you see a patient who missed twice.`
Dicha a B —que no atiende pacientes— no significa nada. Se rompe. Conserva el dato y el motivo, y
no reintroduce el elíptico `a 5:20` que `fase9-nivel-2.md` había ido a corregir.

### H13-3 · LEVE tirando a MEDIA · ROLE B, dato oculto 1 · consecuencia del recorte

La frase recortada **no es decible** —`On Sunday you broke a small piece of your lower back tooth,
and you feel the sharp edge when you talk.` dicha al mostrador es un sinsentido: A no se rompió
ningún diente—. El problema es a dónde manda ahora al estudiante.

Al salir `on your tongue` de la prosa, el detalle de la lengua vive **solo** en la fila de datos de
B, que está en primera persona y que `fase10` y `fase12` ya marcaron como «a un `is` de ser
decible»:

> `| What happened | Sunday — a piece of my lower back tooth, broken · the edge **sharp** (= able to cut) on my tongue when I talk |`

Antes, quien quisiera decir lo de la lengua lo leía en la prosa, que no se levanta. Ahora tiene que
ir a esa fila, que se levanta metiéndole un `is`: *The edge is sharp on my tongue when I talk.* El
recorte no creó el defecto, le mandó el tráfico.

**Arreglo, 13 palabras (hoy son 13), solo la cola de la fila:**
`a **sharp** (= able to cut) edge on my tongue when I talk`
Con el adjetivo delante del nombre ya no hay hueco para la cópula: quien quiera decirlo tiene que
producir el verbo («I have a sharp edge…»), que es exactamente el trabajo que la ficha quiere.

### H13-4 · LEVE · ROLE A, restricción 2 · se registra, no se cambia

> `You can't say a word about another patient's appointment: not the name, not the reason.`

El recorte quitó el `and` y dejó asíndeton, que es más ritmo de habla que de texto. Aun así no se
levanta: en boca de A, `You can't say a word…` acusa a B de estar hablando de otro paciente, y la
forma que A sí diría —`I can't tell you about it`— ya está, bien puesta, en su tabla de exponentes.
No cuenta como decible. Se anota porque es el tercer aviso sobre esta oración y el margen se acabó.

### Las tres restantes, y dos que mejoraron

| frase recortada | efecto sobre calcabilidad |
|---|---|
| A, toolkit · `**6** when they push about another patient.` | ninguno: números de bloque y negritas, no es lengua |
| B, `Where you are` · `you are now in` → `you are in` | **mejora**: `now` era la única deixis de la oración |
| B, restricción 1 · `Your work in Girón starts` → `Your work starts` | neutro: `Your work` sigue invirtiéndose en sinsentido dicho al mostrador; Girón no se pierde (está en la oración anterior y en la fila `Work`) |
| A, dato oculto 1 · `already` fuera | ver H13-2: es lo que cierra la oración |
| A, restricción 1 · guion largo fuera | ver H13-1: era el ancla |

---

## 3 · Las dos tablas `Say it here`, los cuatro criterios sobre el archivo de hoy

| criterio | ROLE A | ROLE B |
|---|---|---|
| agrupada por función | 9 de 9 | **7 de 9** — filas 4 y 7 nombran un momento (cambio 1, sin aplicar) |
| orden alfabético estricto | **SÍ** (a, c, d, g, k, n, s, t, w) | **SÍ** (a, c, f, h, p·money, p·time, t, w·what, w·why) |
| filas ≤ turnos | 9 filas / 9 turnos | 9 filas / 9 turnos |
| ninguna secuencia reproduce cierre o arranque | **no lo reproduce** · sigue el residuo de filas 2-3 | **lo reproduce por etiqueta**, no por orden |

La tercera columna se volvió a revisar entera, las 18 filas: son notas al jugador, no turnos.
`close one door without a reason`, `describe by comparing`, `your money as an option, not as a
complaint`, `the two things you leave without if nobody asks`. Ninguna se puede decir en voz alta y
hacer avanzar nada. **0 decibles sobre 18.**

Sigue vigente el residuo 1 de fase 12: en A, `checking a number` → `danger` son los puntos 3 y 4b
del cierre, contiguos y en orden, y lo produjo el alfabeto solo. Dos de cuatro, la fila 4 rompe la
serie. No es el cierre; se registra para el conjunto.

---

## 4 · Para el conjunto

1. **Un recorte de prosa es una pasada de calcabilidad, no una de presupuesto.** Las dos líneas que
   hoy se levantan se levantan *porque* se recortaron: en las dos, lo que se fue era el ancla que
   invertía el referente (`you ask her in writing`, `already`). Quien recorte palabras repetidas
   tiene que releer la oración entera en voz alta después, no solo restar del contador.
2. **Las anclas más baratas son las que parecen redundancia.** Una cola con un verbo que solo el
   dueño de la ficha puede ejecutar cuesta tres palabras y vale más que cualquier «no leas esto».
3. **Cuando un recorte vacía la prosa de un dato, ese dato se muda a la tabla.** Hay que mirar a
   qué fila se muda: si la fila estaba «a un `is` de ser decible», el recorte acaba de convertirla
   en la única puerta.
4. **Cerrar una regresión de cifras es corregir todas sus copias, o marcarlas todas.** Corregir la
   viva y anotar una de las dos históricas deja al lector con dos números y ninguna manera de saber
   cuál rige.
