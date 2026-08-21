# Habla acompañada — inglés A2 · Fase 8: el hueco que deja la nº 4

**Decisión de David, 21 de agosto de 2026.** Se retira el escenario 4,
`a-charge-i-did-not-make` (el reclamo del cobro en la tienda de telefonía). Este documento no
discute la decisión: **calcula el hueco**. Los siete repartos de §5 se vuelven a medir sobre los
**siete escenarios que se quedan** (1, 2, 3, 5, 6, 7, 8) y de ahí se deduce, número a número, la
fila que el octavo tiene que ocupar.

**Por qué se fue, para que no vuelva por la puerta de atrás.** Era el tercer mostrador de ocho; su
vocabulario era trámite puro (`credit note`, `written claim`, `minimum term`, `a form`, `to file`);
cerraba dictando un número y que el otro lo repitiera, igual que la nº 2 y la nº 8; y la culpa era
del estudiante. **Ninguna de esas cuatro cosas puede reaparecer en el sustituto.**

**Medido con script**, no a ojo:

| script | qué recalcula |
|---|---|
| `fase7-scripts/actos2.mjs` (mapa de 145 turnos) | reparto de actos sobre turnos producidos, con y sin la nº 4 |
| `fase7-scripts/extraer.mjs` + medición de campos | las 158 → 138 entradas de vocabulario y su campo semántico |
| lectura de las 16 cabeceras `**Where you are** ·` | día, hora y barrio de las ocho escenas |

---

## 1 · Los siete repartos, medidos sobre los siete que quedan

El set pasa de **145 a 127 turnos-materia** (la nº 4 aportaba 18: 9 por rol) y de **158 a 138
entradas de vocabulario**.

### 1.1 Actos de habla — cuota de turnos (§5: techo 30 %, suelo 3 %)

| acto | 8 escenarios | 7 escenarios | veredicto sobre 7 |
|---|---|---|---|
| *`dar-dato/razón`* | 31 · 21,4 % | 26 · **20,5 %** | *fuera de catálogo* |
| `pedir-aclaracion` | 24 · 16,6 % | 20 · **15,7 %** | máximo del set — techo ok |
| `proponer-alternativa` | 14 · 9,7 % | 13 · **10,2 %** | ok |
| `rechazar` | 12 · 8,3 % | 12 · **9,4 %** | ok |
| `poner-limite` | 11 · 7,6 % | 10 · **7,9 %** | ok |
| `pedir-favor` | 10 · 6,9 % | 8 · **6,3 %** | ok |
| `dar-mala-noticia` | 6 · 4,1 % | 6 · **4,7 %** | ok |
| `negociar` | 6 · 4,1 % | 5 · **3,9 %** | ok, con dos turnos de margen |
| `quejarse` | 7 · 4,8 % | 5 · **3,9 %** | ok, con dos turnos de margen |
| `disculparse` | 6 · 4,1 % | 5 · **3,9 %** | ok, con dos turnos de margen |
| `recomendar` | 4 · **2,8 % (fallaba)** | 4 · **3,1 %** | **pasa por un turno** |
| `conceder-con-condicion` | 5 · 3,4 % | 4 · **3,1 %** | **pasa por un turno** |
| `insistir` | 1 · **0,7 % (fallaba)** | 1 · **0,8 %** | **FALLA** |

**Dos cosas que solo se ven con la resta hecha:**

1. **Quitar la nº 4 arregla `recomendar` por aritmética, no por diseño.** Sube de 2,8 % a 3,1 %
   porque el denominador bajó, no porque nadie aconseje más. Sigue siendo **4 turnos, los cuatro
   del escenario 2, los cuatro del rol A**.
2. **Y por eso el octavo puede volver a romperlo.** Si el sustituto aporta 18 turnos y ninguno de
   `recomendar` ni de `conceder-con-condicion`, esos dos actos caen a **4/145 = 2,8 %** y **vuelven
   a fallar el suelo**. Con 145 turnos, el suelo del 3 % son **5 turnos**: hoy tienen 4.

**Lo que el octavo tiene que aportar, calculado:**

| acto | tiene | necesita para el 3 % de 145 | aporte mínimo del 8º |
|---|---|---|---|
| `insistir` | 1 | 5 | **4 turnos** |
| `recomendar` | 4 | 5 | **1 turno** |
| `conceder-con-condicion` | 4 | 5 | **1 turno** |

### 1.2 Los otros seis

| reparto | sobre los 7 | umbral §5 | qué exige del octavo |
|---|---|---|---|
| **Poder** (`a>b`, manda el estudiante) | 3/7 · **42,9 %** · `b>a` 2 · `igual` 2 | ≥3 de 8 | **`a>b`** → 4/8 · **50,0 %**. Con `igual` o `b>a` queda en 3/8 · 37,5 %, y **cae a 2/8 · 25,0 % y falla** si el guardián reetiqueta la nº 1 como `igual`, como pide el punto 16 del acta |
| **Quién arranca** | A 3/7 · **42,9 %** · B 4/7 · 57,1 % | 40–60 % cada uno | **arranca A** → 4/8 · **50,0 %**. Si arranca B, A queda en 3/8 · **37,5 % y falla** el suelo del 40 % |
| **Desenlace** | acuerdo 3 (42,9 %) · parcial 2 (28,6 %) · aplazado 1 · sin-acuerdo 1 | ≥1 sin-acuerdo, ≥1 parcial | **`acuerdo-parcial`** → 3/3/1/1, el mismo reparto que tenía el set de ocho. `sin-acuerdo` también cumple (2/8) y quitaría la dependencia de la nº 8 — pero el atajista **ya gana** el único sin-acuerdo del set (acta, puerta 11), y escribir un segundo sin blindar el primero duplica el defecto |
| **Culpa** (la causa el rol A) | 3/7 · **42,9 %** (3, 5, 6) | ≤50 % | **la causa, fuera de los dos** → 3/8 · **37,5 %**, con margen. Si la causa es de A → 4/8 · **50,0 %**, el techo exacto otra vez |
| **Escenografía** | aula **0/7** ✔ · **mostrador 3/7 · 42,9 %** · calle/parqueadero 2/7 · casa 1/7 · trastienda 1/7 | aula ≤2 de 8 | ni aula ni mostrador ni oficina → mostrador **3/8 · 37,5 %**. Y **ni martes ni Cabecera**: martes son 4/7 (**57,1 %**: esc. 2, 3, 6, 8) y Cabecera 4/7 (**57,1 %**: esc. 1, 2, 6, 8) |
| **Género** | **empeora al quitar la nº 4** — ver abajo | ni poder ni culpa concentrados | **mando masculino**, obligatorio |

### 1.3 El género, que la resta empeora

La nº 4 se llevó a **Norbey**, que era **el único mando masculino con nombre del set**.

| medida | con 8 | con 7 |
|---|---|---|
| roles con nombre en escena | 9 (5 M · 2 H · 2 neutros) | **8 (5 M · 1 H · 2 neutros)** |
| **mandan, con nombre** | 3 M · 1 H — **75 % mujeres** | **3 M · 0 H — 100 % mujeres** |
| escenarios de dos mujeres / dos hombres | 2 / 0 | **2 / 0** |

**Consecuencia, y es una corrección al acta.** El punto 11 del veredicto daba dos variantes
equivalentes: «rol A masculino en la nº 5 **o** mando masculino en la nº 8». **Ya no son
equivalentes.** La variante de la nº 5 cambia a quien causa el problema, no a quien manda: deja los
mandos en 3 M · 0 H. Con la nº 4 fuera hay que tomar **la variante de la nº 8**.

Y ni siquiera basta con esa: un mando masculino en el nuevo deja 3 M · 1 H = **75 %**, el mismo
sesgo de hoy. Los dos cambios juntos —mando masculino en la nº 8 **y** mando masculino en el
octavo— dejan **2 M · 2 H = 50,0 %**. Si además los dos roles del nuevo son hombres, el set queda
con **1 par de mujeres y 1 par de hombres** y con los roles nombrados en 4 M · 4 H · 2 neutros.

### 1.4 El vocabulario — el problema de fondo, medido

Es lo que motivó la decisión: **el set enseña a hablar con mostradores**.

| campo | 8 escenarios (158) | 7 escenarios (138) |
|---|---|---|
| trámite / papel / contrato | 43 · 27,2 % | 31 · **22,5 %** |
| dinero / pago | 40 · 25,3 % | 31 · **22,5 %** |
| **papel + dinero, sumados** | **52,5 %** | **44,9 %** |
| **papel + dinero, sin doble conteo** | 71 · 44,9 % | 56 · **40,6 %** |
| comida · salud no dental · transporte · clima · ocio · cuerpo | **0** | **0** |

Quitar la nº 4 baja el trámite ocho puntos y **no añade una sola palabra** de los campos que
faltan. Con un octavo de **20 entradas y cero de papel o dinero**: sumados **39,2 %**, sin doble
conteo **35,4 %**. Ése es todo el margen que hay, y por eso las diez palabras de cada rol del
sustituto **no se eligen: se gastan enteras** en un campo que el set no toca.

---

## 2 · La fila del octavo

Cada casilla es la que produce el porcentaje de la derecha. No hay elección libre en cinco de las
ocho: la casilla está determinada por lo que dejaron los siete.

| campo | valor | qué produce | ¿hay alternativa? |
|---|---|---|---|
| **actos declarados** | `recomendar`, `insistir`, `conceder-con-condicion` | `insistir` 0,8 % → **3,4 %** · `recomendar` 3,1 % → **4,8 %** · `conceder` 3,1 % → **4,1 %** | **no.** Son los tres únicos actos que el set no puede sostener sin él |
| **poder** | **`a>b`** (manda el rol A) | `a>b` 4/8 · **50,0 %**; 3/8 · 37,5 % si la nº 1 pasa a `igual` | no, si se quiere margen |
| **quién arranca** | **A** | A 4/8 · **50,0 %** / B **50,0 %** | **no.** Con B, A cae a 37,5 % y falla |
| **desenlace** | **`acuerdo-parcial`** | acuerdo 3 · parcial **3** · aplazado 1 · sin-acuerdo 1 | `sin-acuerdo` cumple (2/8) pero duplica un defecto abierto |
| **quién causa el problema** | **ni A ni B** — la causa está fuera de escena | culpa de A **3/8 · 37,5 %** | de B también vale; de A no |
| **escenografía** | **casa o exterior de casa**, sin mostrador, sin oficina, sin aula. **No martes. No Cabecera** | mostrador **3/8 · 37,5 %** · aula 0/8 · casa 2/8 · martes 4/8 · Cabecera 4/8 | calle/parqueadero también vale, pero sube ese grupo a 3/8 y empata con el mostrador |
| **género** | **rol A (el que manda) masculino**; los dos hombres, si se quiere cerrar el 0/8 | mandos con nombre **2 M · 2 H · 50,0 %** *(exige además el punto 11 en su variante nº 8)* | no |
| **registro** | **informal, entre conocidos** | formal 3 · informal 4 · mixto 1 | semiformal vale |
| **minutos · turnos** | **7 minutos · 9 turnos por rol** (18 globales) | dentro de §4 (A2: 5–8 min · 6–9 turnos) y dentro de §11 (9 filas de exponentes, no 10) | no bajar de 9 por rol: con menos no caben 4 turnos de `insistir` sin que el acto sea adorno |
| **vocabulario** | **20 entradas, cero de papel y cero de dinero** | papel+dinero **52,5 % → 39,2 %** | no |
| **carta (§9)** | al rol **A**, turno global **5**, y **asigna una tarea nueva** | dentro de la ventana 3-6 de la puerta 6 | no puede quitarle una palanca a nadie: eso premia mirarla antes |

**En formato §7:**

```
id: 4 · slug: <ver §3> · sequence: 4 · level: 'a2' · language: 'ingles'
speechActs: ['recomendar', 'insistir', 'conceder-con-condicion']
power: 'a>b' · initiator: 'a' · outcome: 'acuerdo-parcial'
minutes: 7 · turnsTarget: 9   // por rol
twist: { afterTurn: 5, toRole: 'a', card: <tarea nueva, no palanca retirada> }
```

### El aviso que va con la fila: `insistir` no está autorizado en A2

§4 pone `insistir` —y también `negociar` y `poner-limite`— **en la fila de B1**. El plan de fase 0
lo dijo por escrito y por eso no lo usó: *«insistir sin sonar grosero exige atenuadores que A2 no
tiene»*. Pero el suelo del 3 % de §5 exige que ningún acto declarado baje de ahí, y el acta manda
arreglarlo con este escenario. **Las dos reglas se contradicen**, y no es un caso aislado: el set
ya produce `poner-limite` en **10 turnos (7,9 %)** y `negociar` en **5**, los dos B1 según §4.

Dos salidas, y hay que escoger antes de escribir la ficha:

- **(a) Declarar la versión A2 de `insistir` en §4** — repetir la petición con una razón nueva,
  volver a pedir después de un «no», y añadir una condición simple. Todo eso se sostiene con
  `first-conditional`, `connectors-a2` y `have-to-must`, que están en el registro de A2. Lo que
  sigue prohibido es el atenuador largo. **Es la salida recomendada**, y de paso cierra la
  contradicción que ya arrastran `poner-limite` y `negociar`.
- **(b) Borrar el único turno de `insistir` de la ficha 1B.** §5 dice «ninguno **de los
  declarados**»: si el acto no existe en el set, el suelo no se le aplica. Cuesta una línea y deja
  el set sin el acto que un A2 colombiano usa a diario.

---

## 3 · Dos situaciones que llenan la fila

Las dos: **sin papeles, sin mostrador, sin números que dictar**, y con las diez palabras de cada
rol gastadas enteras en campos que el set no toca.

### Situación A — `the-pot-is-already-on` · «La olla ya está prendida» **(recomendada)**

**Dónde.** Domingo, 11:20 a.m., el patio de una casa en Girón. El sancocho lleva al fuego desde
las nueve.

**Rol A — Fabián (manda, arranca).** La casa y la comida son suyas: manda sin cargo y sin
uniforme, que es justo el tipo de poder que al set le falta. Sabe lo que el otro no: la olla
necesita dos horas más y la gallina lleva desde temprano fuera de la nevera. Quiere que el grupo
coma ahí a la una y que el río quede para después.

**Rol B — Duván.** Trajo al grupo y les prometió alcanzarlos en el río. Quiere que Fabián apague,
lo eche en algo y se lo lleven. **Dato oculto:** el del carro ya está en el río y no vuelve por
nadie — si Duván no sale ya, no va nadie. Fabián no lo sabe, y es lo que impide que el escenario
se resuelva mandando.

**La causa, fuera de los dos:** el grupo cambió el plan por su cuenta esa mañana por el calor.
Ni A ni B lo decidieron.

**La carta (turno global 5, al rol A).** Llama la mamá de Fabián: llega a la una con cuatro
personas más. Es **tarea nueva**, no palanca retirada — mirarla antes de tiempo no le sirve de
nada, porque el problema sigue entero.

**Cierre, acuerdo parcial, con dos salidas.** (1) Comen ahí a la una y el río queda para las tres,
sin mover la olla; (2) Duván se va ya y vuelve a la una con los del río. Los dos pierden si se van
sin acuerdo: Fabián se queda con comida para doce y sin nadie, Duván llega al río con las manos
vacías y sin poder explicar por qué.

**Vocabulario — comida, cuerpo y casa, cero papel y cero dinero:** `to simmer` · `a burner` ·
`raw` · `to go bad` · `leftovers` · `to reheat` · `a serving` · `a cooler` · `to be starving` ·
`stuffed`.

**Dónde se producen los actos.** `recomendar` en las dos direcciones —Fabián aconseja qué hacer
con el grupo, Duván aconseja qué hacer con la olla—, que es lo que rompe el `recomendar` A 4 · B 0
de hoy. `insistir` sale solo, porque hay **un reloj físico en escena**: la olla se enfría y la
gallina se daña mientras discuten. `conceder-con-condicion` es el cierre.

### Situación B — `the-road-closes-at-noon` · «La vía se cierra al mediodía»

**Dónde.** Sábado, 5:50 a.m., el andén frente a la casa, en Piedecuesta. El baúl abierto.

**Rol A (manda, arranca).** El carro es suyo y ha hecho esa vía muchas veces. Sabe que con el
derrumbe hay paso a un solo carril y que después de las once son dos horas parado, y que la bajada
con neblina no se hace de noche. Quiere salir ya.

**Rol B.** Quiere esperar dos horas. **Dato oculto:** se marea en la vía larga y no lo quiere
decir delante de los otros.

**La causa, fuera de los dos:** el derrumbe y la neblina.

**Vocabulario — transporte, clima y cuerpo:** `a landslide` · `one lane` · `a detour` · `fog` ·
`to pull over` · `carsick` · `daylight` · `the shoulder` · `a flat tire` · `to get stuck`.

**Dos reparos, y por eso va segunda.** La escena vuelve a ser calle/andén, que sube ese grupo a
**3/8 · 37,5 %** y lo empata con el mostrador — el sustituto tiene que bajar repeticiones, no
mudarlas. Y los peajes y la gasolina tiran del diálogo hacia el dinero, que es exactamente el
campo del que hay que salir: habría que prohibirlo por restricción escrita, y una restricción que
pelea contra la escena se rompe sola.

### Por qué la A

1. **Llena el hueco más grande medido.** De 158 entradas del set, **cero** son de comer. Es el
   campo que el informe de conjunto nombra primero y el único que un A2 usa todos los días.
2. **Baja repeticiones en vez de mudarlas.** Casa 2/8 · 25,0 %, mostrador 3/8 · 37,5 %, aula 0/8,
   domingo (el set no tiene ninguno), Girón (el set no tiene ninguno en escena).
3. **El `insistir` no hay que forzarlo.** Hay algo que se enfría mientras hablan. Es lo que impide
   el colapso en tres turnos sin necesidad de una regla escrita.
4. **El poder es del que da, no del que niega.** Los tres `a>b` que quedan son una vendedora, una
   recepcionista y quien puso la plata del paseo. Un rol que manda **porque está dando de comer**
   es un tipo de poder que el set entero no tiene.
5. **No hay nada que firmar, ni que dictar, ni que repetir en voz alta.** El cierre es un acuerdo
   de hora y de quién llama a quién.

---

## 4 · Comprobación: el suelo del 3 % con el sustituto dentro

Reparto propuesto de los 18 turnos-materia del nuevo escenario (9 filas de exponentes por rol,
dentro del 6-9 de §11):

- **Rol A (9):** `dar-dato/razón` ×2 · `recomendar` ×1 · `insistir` ×3 · `pedir-aclaración` ×1 ·
  `proponer-alternativa` ×1 · `conceder-con-condición` ×1
- **Rol B (9):** `rechazar` ×1 · `quejarse` ×2 · `dar-dato/razón` ×1 · `pedir-aclaración` ×1 ·
  `recomendar` ×2 · `insistir` ×1 · `conceder-con-condición` ×1

El set vuelve a 145 turnos-materia. Suelo del 3 % = **5 turnos**. Techo del 30 % = 43,5.

| acto | 8 originales | 7 | **8 con el sustituto** | veredicto |
|---|---|---|---|---|
| `pedir-aclaracion` | 24 · 16,6 % | 20 · 15,7 % | **22 · 15,2 %** | techo ok (máximo del set) |
| `proponer-alternativa` | 14 · 9,7 % | 13 · 10,2 % | **14 · 9,7 %** | ok |
| `rechazar` | 12 · 8,3 % | 12 · 9,4 % | **13 · 9,0 %** | ok |
| `poner-limite` | 11 · 7,6 % | 10 · 7,9 % | **10 · 6,9 %** | ok |
| `pedir-favor` | 10 · 6,9 % | 8 · 6,3 % | **8 · 5,5 %** | ok |
| `quejarse` | 7 · 4,8 % | 5 · 3,9 % | **7 · 4,8 %** | ok |
| `recomendar` | 4 · **2,8 %** | 4 · 3,1 % | **7 · 4,8 %** | **arreglado** |
| `dar-mala-noticia` | 6 · 4,1 % | 6 · 4,7 % | **6 · 4,1 %** | ok |
| `conceder-con-condicion` | 5 · 3,4 % | 4 · 3,1 % | **6 · 4,1 %** | **con margen** |
| `negociar` | 6 · 4,1 % | 5 · 3,9 % | **5 · 3,4 %** | ok |
| `insistir` | 1 · **0,7 %** | 1 · 0,8 % | **5 · 3,4 %** | **arreglado** |
| `disculparse` | 6 · 4,1 % | 5 · 3,9 % | **5 · 3,4 %** | ok, el más justo |

**Fallos de suelo: ninguno. Fallos de techo: ninguno.** Los doce actos del catálogo de §7 quedan
entre el 3,4 % y el 15,2 %.

**Y se corrige el reparto por rol**, que el informe de conjunto señalaba aparte del umbral:

| acto | A/B con 8 | A/B con el sustituto |
|---|---|---|
| `recomendar` | **4 / 0** — «fuera de la clínica nadie aconseja a nadie» | **5 / 2** |
| `quejarse` | **6 / 1** — «quejarse es cosa del que pide» | **4 / 3** |
| `insistir` | 0 / 1 | **3 / 2** |

**Dos avisos sobre el margen.** `disculparse` y `negociar` quedan en 5 turnos exactos: si el
sustituto crece por encima de 20 turnos-materia, hay que darle uno de cada. Y el suelo se recalcula
sobre el total del set, así que **cualquier escenario noveno vuelve a mover estas tres cifras**.

---

## 5 · Lo que este sustituto NO arregla

Se dice para que nadie lo dé por cerrado:

| queda abierto | por qué no lo toca el octavo |
|---|---|
| **Puerta 5 — carga en palabras** | El acta la da por fallada en 7 de 7 por diseño: el rol callado consigue su objetivo asintiendo. Es de los ocho escenarios, no de éste |
| **Puerta 3 — frases calcables** | 18 hallazgos abiertos en las fichas 5, 6, 7, 8 y en el molde |
| **Prosa fuera de techo** | 5B 480 · 8B 476 · 8A 453, contra el techo de 450 |
| **La nº 1, `a>b` o `igual`** | Decisión del guardián. El sustituto le da aire (con la nº 1 en `igual`, el poder queda en 3/8 y cumple), pero no la resuelve |
| **Exponentes 6-9 o 6-10** | §10 y §11 se contradicen. Cuatro fichas están en 10; el sustituto se escribe con 9 y no toma partido |
| **Equidad sobre las fichas en inglés** | Nunca se ha pasado. El sustituto entra en esa primera pasada, no la sustituye |

Y el sustituto entra al ciclo completo —fases 1 a 7, las seis auditorías y las doce puertas—.
No hereda el «pasa» de nadie.
