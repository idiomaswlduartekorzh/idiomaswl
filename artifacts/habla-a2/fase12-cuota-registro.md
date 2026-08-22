# Fase 12 · Los dos arreglos pequeños: la cuota de `insistir` y el registro del escenario 4

Encargo: puerta 12 (accionable nº 7) y puerta 9 (accionable nº 9) de `fase11-veredicto.md`.
Fecha: 22 ago 2026, 15:46–15:52. Tres archivos tocados y ninguno más:

- `artifacts/habla-a2/fase7-fichas-8-cancel-the-gym-i-am-leaving.md`
- `artifacts/habla-a2/fase8-fichas-4nuevo.md`
- `artifacts/habla-a2/fase11-scripts/actos-cuota.mjs` (solo el mapa a mano de `8A` y `8B`)

Todo lo de abajo está **releído del disco después de escribirlo**. Los números salen de correr
los scripts, no de estimar.

---

## 1 · `insistir` — de 1,5 % a 3,7 %, y el escenario elegido es el 8

**El escenario es `cancel-the-gym-i-am-leaving`, y encaja sin forzarlo por una razón:** insistir es
volver a pedir lo mismo de otra manera después de un no, y el 8 es el **único `sin-acuerdo` del
set**. Tatiana recibe tres noes seguidos —la permanencia, la prueba que no sirve, y el horario— y
no tenía **ni una fila** para volver a la carga: lo hacía con `Is there another way?`, que es pedir
un favor por primera vez, no insistir. En los otros siete el no llega tarde, llega una vez, o no
llega. Además el 8 era el más flaco del set en andamiaje (6 y 7 filas, contra 9 de casi todos),
así que hay sitio dentro del 6-9 de §11 sin quitarle nada a nadie.

**Tres filas nuevas, y son tres por aritmética, no por gusto.** Cada fila añadida sube también el
denominador del conjunto. Dos filas de `insistir` habrían dado **4/134 = 2,99 %** y habrían fallado
el suelo igual que hoy —el mismo cálculo que el 21 de agosto obligó a retirar una fila de Tatiana—.
Con tres: **5/135 = 3,7 %**.

| ficha | fila nueva | formas | qué produce |
|---|---|---|---|
| A · Tatiana | `asking again, with a new reason` | `I know, but I still need…` · `I have to ask you again: can you…?` | el segundo intento, con una razón que él no ha oído. Decir en voz alta que se pregunta por segunda vez, y preguntar igual |
| A · Tatiana | `asking again, about the hour` | `I can only come at…, so can we…?` | el tercer no es de calendario: Édison no está el jueves (lo dice la carta) y ella solo tiene libre de 12 a 1 ese mismo jueves. Contra el reloj hay que volver a preguntar |
| B · Mauricio | `asking again for the reason` | `I don't need to know where — I need…` · `Any reason works, but I can't write…` | choque ya diseñado en las dos fichas: el permiso de ella dice que **nunca** tiene que decir a dónde va; la restricción 3 de él le exige una razón para abrir el caso. Sin esta fila él pedía una vez y se quedaba sin caso |

Las seis formas son troncos con `…` (ninguna es una oración cerrada que se pueda leer en voz alta
tal cual) y las cinco estructuras están ancladas a `grammarReferences` que ya estaban en la ficha:
`have-to-must`, `can-ability`, `present-simple-negative` y `connectors-a2`.

Tatiana pasa de **6 a 8 filas**, Mauricio de **7 a 8**. Las dos dentro del 6-9 de §11.

---

## 2 · Escenario 8 · `proponer-alternativa`: ahora se produce en pantalla

El acta tiene razón en el fondo y conviene decir **por qué** fallaba, porque la ficha creía haberlo
arreglado el 21 de agosto por la noche. La fila era:

```
| offering a way | `There is another way, but…` · `If you bring…, I can…` | … |
```

Una fila = un acto (así mide `actos-cuota.mjs`), y esa fila la mandaba su segunda forma:
`If you bring…, I can…` es una **concesión con condición**, no una propuesta. Por eso el conjunto
la contaba como `conceder-con-condicion` y el tercer acto declarado del escenario seguía sin
existir en ninguna pantalla.

Se arregla **haciéndolo real, no reetiquetando**:

- La fila pasa a `offering another way` y sus dos formas proponen las dos:
  `There is another way, but…` · `You can also…, and it costs…`. La segunda es nueva y trae el
  precio pegado a la vía, que es como funciona este escenario (la cesión son 30.000 y las dos
  personas presentes; el congelamiento mueve los tres meses al final).
- `If you bring…, I can…` **no se pierde**: se muda a `saying no with a door open`, que es
  literalmente lo que es —un no que se vuelve sí si ella trae algo— y pasa a tres formas.

`You can also…, and it costs…` es `can` + presente simple: dentro de A2 y anclado a
`can-ability`, que ya estaba en los doce `grammarReferences` de la ficha.

---

## 3 · Lo que le pasa al conjunto — medido, no estimado

`node artifacts/habla-a2/fase11-scripts/actos-cuota.mjs`, con el mapa de `8A`/`8B` reescrito para
que mida la tabla que existe (no se tocó ninguna otra entrada ni ninguna regla del script):

| | antes | después |
|---|---|---|
| turnos-materia del set | 132 | **135** |
| `insistir` | 2 · **1,5 %** · 1 escenario | 5 · **3,7 %** · **2 escenarios** |
| `proponer-alternativa` | 14 · 10,6 % | 15 · 11,1 % |
| `conceder-con-condicion` | 9 · 6,8 % | 8 · **5,9 %** (declarado, sigue holgado) |
| máximo del set (techo 30 %) | `pedir-aclaracion` 16,7 % | `pedir-aclaracion` **16,3 %** |
| declarados bajo el suelo del 3 % | **`insistir` 1,5 %** | **ninguno** |
| esc 8 · «sin producir» | `proponer-alternativa` | **—** |

Las ocho líneas de «¿se produce lo que la banda declara?» salen hoy con guion. **La puerta 12 pasa
por las dos mitades por las que fallaba.** Mínimo declarado del set: `recomendar`, `insistir` y
`disculparse`, empatados en 3,7 %.

---

## 4 · Escenario 4 · el registro

**Lo que faltaba de verdad y ya está:** era el único de los ocho que no decía su registro en
ninguno de sus dos roles. Los otros siete abren la primera línea de la cabecera con la palabra en
negrita (*Polite, two strangers* · *Formal* · *Informal* · *Formal from him, direct from you* ·
*Counter, formal*). El 4 abría con `**No boss here.**`, que es **poder**, no registro.

| rol | antes | ahora | prosa |
|---|---|---|---|
| A · Fabián | `**No boss here.**` | `**Informal. No boss here.**` | 445 → **446** |
| B · Astrid | `**No boss here — the house, the fire and the food are his.**` | `**Informal. No boss here — …**` | 449 → **450** |

Es informal en los dos lados y no en uno solo: patio, nombre de pila, ella llegó a las nueve a
ayudar, no hay mostrador ni cargo. El poder `a>b` sigue dicho donde estaba —la casa, el fuego y la
comida son de él—, que es otra columna del motor y no se toca.

**Aviso, y va en la primera línea porque afecta a la próxima persona que audite:** B queda en
**450 exactos**, que es el techo. Cumple, y se queda **sin margen**: la próxima palabra que entre
en su prosa tiene que salir de otro sitio de su prosa.

### La columna `register`: el acta se equivoca en el «única», y así queda arreglado

El acta dice que el 4 es «**la única** ficha cuya tabla de exponentes no lleva columna `register`».
Fui a mirar antes de escribir, y **antes de esta pasada no la llevaba ninguna de las dieciséis**:
las ocho fichas abrían su tabla exactamente igual —`| function | form | what it does here |`—.
Comprobado por búsqueda literal sobre los ocho archivos antes de tocar nada (`grep -n "^| function"`:
dieciséis coincidencias, las dieciséis de tres columnas; `grep -rn "register"` sobre las fichas:
**cero**, salvo la palabra *register* como «caja registradora» en el escenario retirado). Lo que el
4 tenía de único era lo otro: no declarar el registro.

Quien manda aquí no es el acta sino `docs/habla-acompanado-blueprint.md`, que sí lo pide dos veces:
§2 («andamiaje… con su uso y su registro») y el modelo de datos
(`exponents: { form, use, register: 'formal' | 'neutro' | 'informal' }`). La columna
`what it does here` era el `use`; el `register` no estaba en ninguna parte.

Añadida a las **18 filas** del escenario 4, con dos valores que hacen trabajo en vez de repetir
«informal» nueve veces:

- **`informal`** — lo que solo se le dice a un amigo en su patio: el consejo sobre el lado del
  otro, la queja, la apertura, lo que te cuesta a ti, y el `taking it back` de Astrid.
- **`neutral`** — lo que se diría igual en un mostrador: el no físico de la olla, la pregunta por
  el número, el plan en personas y minutos, la propuesta de las dos vueltas, la condición.

Va **al final de la fila** a propósito: `fase11-scripts/extraer-conjunto.mjs` lee
`what it does here` por posición (`c[2]`), y meterla en medio le habría cambiado el dato a todos
los que miden sobre ese extracto. Verificado corriendo el extractor después: 4A y 4B siguen
saliendo con `exp 9` y el vocabulario intacto.

**Pendiente que esto abre y que no es de este escenario:** quedan **catorce fichas sin la columna**.
El escenario 4 es hoy el primero que cumple el modelo de datos del blueprint, no el que se puso al
día con los demás. La puerta 9 no es «1 de 8 falla»: es «8 de 8 declaran registro en la cabecera —
ya— y 1 de 8 lo lleva por exponente». Se deja escrito para que nadie lo dé por cobrado.

---

## 5 · Qué se comprobó al terminar, releyendo del disco

| comprobación | resultado |
|---|---|
| `prosa-canonica.mjs` sobre mis dos fichas | esc 4: **A 446 · B 450** · esc 8: **A 449 · B 450** — las cuatro dentro del techo |
| `actos-cuota.mjs` | 135 turnos · `insistir` **3,7 %** · ningún declarado bajo el suelo · ningún acto sobre el techo · esc 8 sin faltantes |
| `extraer-conjunto.mjs` | 16 roles · 8A y 8B pasan a **exp 8** · 4A y 4B siguen en **exp 9** · vocabulario y datos duros sin mover |
| `here-calcable.mjs` | 157 celdas `here`: **0** entrecomilladas, **0** con pronombre + verbo · 165 filas de datos duros: **0** decibles |
| `prosa-decible.mjs` | 567 oraciones de prosa · **0** empiezan por I/We/My/Our |
| las cuatro cabeceras, las 18 celdas `register` y las cuatro filas nuevas | releídas con `grep` sobre el archivo guardado, después de escribir. Están |

### Lo que NO toqué y hay que decir

Mientras trabajaba, **otra sesión escribió a la vez** en cuatro fichas que no son mías: los
escenarios 2, 5, 6 y 7 cambiaron todos en el mismo segundo (`15:47:18`). Con eso,
`prosa-canonica.mjs` pasó de **16/16 dentro del techo a 9/16**, con el peor caso en **462**
(escenario 7, rol A). No es de esta pasada —mis dos archivos son los de las 15:46 y las 15:48 y los
cuatro números míos están dentro— y **no lo he tocado**, pero el que firme la puerta de prosa
después de esto tiene que volver a medir: el `16/16` del acta ya no describe el disco.

Tampoco toqué nada de las otras diez líneas accionables del acta: la carga de las parejas flojas,
la muerte en el turno 17 del escenario 4, las formas cerradas del 2, el 5 y el 6, los tres cambios
de equidad, ni la reauditoría de nivel. Siguen abiertas tal como las dejó `fase11-veredicto.md`.
