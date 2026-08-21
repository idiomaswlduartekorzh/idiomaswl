# Habla acompañada — inglés A2 · Auditoría de CONJUNTO de la composición nueva

Los ocho escenarios que van a producción: **los siete arreglados más el que sustituye al 4**.
El 4 viejo (`fase7-fichas-4-a-charge-i-did-not-make.md`) está **retirado y no se cuenta**.

| nº | archivo | qué es |
|---|---|---|
| 1 | `fase7-fichas-1-the-bike-in-the-parking-lot.md` | reescrito el 21 ago, tarde |
| 2 | `fase7-fichas-2-no-appointment-until-thursday.md` | reescrito el 21 ago, tarde |
| 3 | `fase7-modelo-ficha-en.md` | **el molde** |
| 4 | `fase8-fichas-4nuevo.md` | **nuevo** · `the-pot-is-already-on` |
| 5 | `fase7-fichas-5-late-again-on-monday.md` | reescrito · rol A pasó de Liliana a **Camilo** |
| 6 | `fase7-fichas-6-the-cousin-on-the-sofa.md` | reescrito el 21 ago, tarde |
| 7 | `fase7-fichas-7-two-more-people-for-the-trip.md` | reescrito el 21 ago, tarde |
| 8 | `fase7-fichas-8-cancel-the-gym-i-am-leaving.md` | reescrito el 21 ago, tarde |

Umbrales: `docs/habla-acompanado-blueprint.md` §5 (los siete repartos, **con la corrección del 21
de agosto**: los actos se miden en cuota de turnos, techo 30 % y suelo 3 %), §4 (minutos y turnos
por rol), §10 y §11 (prosa, tablas y bloque de vocabulario).

**Todo lo de abajo sale de script.** Los cuatro están en `artifacts/habla-a2/fase8-scripts/` y se
vuelven a correr con `node <archivo>`:

| script | qué cuenta |
|---|---|
| `extraer8.mjs` | parte las 16 fichas de la composición nueva en prosa / datos / vocabulario / exponentes |
| `actos8.mjs` | el reparto de actos en **cuota de turnos**, una fila de exponentes = un turno |
| `vocab8.mjs` | las 157 entradas: cruces, glosas, campos semánticos, bloque genérico, `here` calcable |
| `voz8.mjs` | plantilla compartida, bloques propios, estilo medido y solapamiento léxico |

La prosa se mide **solo** con `fase7-scripts/prosa-canonica.mjs`, que este informe no toca.
`fase8-scripts/prosa-canonica-8.mjs` es ese mismo contador, función por función, con la única
diferencia de la lista de archivos: cambiar el contador a mitad de auditoría es lo que produjo las
seis contabilidades de la ronda anterior.

---

## Veredicto

**Seis de los siete repartos de §5 pasan. Falla uno: el género — y falla por una razón nueva.**

| # | Reparto | Umbral §5 | Antes | Medido ahora | Veredicto |
|---|---|---|---|---|---|
| 1 | **Actos**, cuota de turnos | ninguno > 30 %, ninguno declarado < 3 % | máx. 16,6 % · `insistir` 0,7 % | máx. **15,9 %** (`pedir-aclaración`) · mínimo declarado **3,0 %** (`insistir`) | **cumple** |
| 2 | **Poder** — manda A | ≥ 3 de 8 | 3/8 · 37,5 % | **4/8 · 50,0 %** | **cumple, con margen** |
| 3 | **Quién arranca** | 40–60 % cada rol | 50/50 | **A 50,0 % · B 50,0 %** | **cumple** |
| 4 | **Desenlace** | ≥1 sin-acuerdo y ≥1 parcial | 1 y 3 | acuerdo 3 · **parcial 3** · aplazado 1 · **sin-acuerdo 1** | **cumple, sin margen** |
| 5 | **Culpa del rol A** | ≤ 50 % | 50,0 % exacto | **3/8 · 37,5 %** | **cumple, con margen** |
| 6 | **Escenografía** — aula | ≤ 2 de 8 | 0/8 | **0/8 · 0,0 %** | **cumple** |
| 7 | **Género** | ni poder ni culpa concentrados | 75 % de mandos mujeres | **75 % de mandos mujeres · 2 de 2 culpables hombres · 3 de 3 cuidadores hombres** | **FALLA** |

Y las tres cosas propias del formato:

- **Vocabulario: arreglado a medias.** Papel y dinero bajan de **52,5 % a 41,4 %** (unión sin doble
  conteo: **38,2 %**), y el escenario nuevo mete veinte palabras de cocina, fuego, moto, calor y
  sombra: **19 de sus 20 entradas no son ni papel ni dinero.** Pero los cuatro campos que el set no
  tocaba los llena **él solo**: quítalo y la cuenta vuelve a **42,3 %**. Y **ocio sigue en 0 de 157**.
- **Longitud: cumple, 16 de 16.** Media 443, peor 450, ninguna se pasa. Pero **7 de las 16 (43,8 %)
  están entre 448 y 450**, y la más corta del set es de 419 cuando §11 dice «apuntando a 400».
  Está recortada contra el número, no contra el lector.
- **Voz: la arregló un solo escenario.** Las siete fórmulas de encabezado bajan de 16/16 a **14/16**,
  y las dos que faltan son **4A y 4B**. Las fichas sin ni un bloque propio bajan de 11/16 a **9/16**,
  y los dos bloques que se sumaron son **los del nº4**. **Las seis fichas reescritas esta tarde no
  añadieron ni uno.**

**El escenario nuevo hizo su trabajo y algo más:** él solo mueve el poder, la culpa, el mostrador,
el ritual de cierre, los cuatro campos de vocabulario vacíos y la voz. Lo que no arregló —y lo que
las otras siete no arreglaron— es el género, y ahí el set está peor que la semana pasada en la
columna que nadie miró.

---

## 1 · Actos de habla — en cuota de turnos, que es la regla de hoy

**132 turnos-materia** (una fila de la tabla de exponentes = un turno que la pareja tiene que
producir). De ellos **104 (78,8 %)** son actos del catálogo de §7; los otros 28 son
`dar-dato/razón` (21), `apertura` (4) y `cierre-ritual` (3), fuera de catálogo y contados aparte.

| acto | turnos | **cuota** | techo 30 % | suelo 3 % | ¿declarado? | esc. |
|---|---|---|---|---|---|---|
| `pedir-aclaracion` | 21 | **15,9 %** | ok | — | **no** | 8/8 |
| *`dar-dato/razón`* | 21 | *15,9 %* | *n/a* | *n/a* | *no* | *8/8* |
| `poner-limite` | 15 | **11,4 %** | ok | — | **no** | 8/8 |
| `proponer-alternativa` | 14 | 10,6 % | ok | ok | sí | 6/8 |
| `negociar` | 7 | 5,3 % | ok | — | **no** | 4/8 |
| `pedir-favor` | 7 | 5,3 % | ok | ok | sí | 6/8 |
| `quejarse` | 7 | 5,3 % | ok | ok | sí | 5/8 |
| `dar-mala-noticia` | 7 | 5,3 % | ok | ok | sí | 4/8 |
| `recomendar` | 6 | 4,5 % | ok | ok | sí | **2/8** |
| `conceder-con-condicion` | 6 | 4,5 % | ok | ok | sí | 5/8 |
| `rechazar` | 5 | 3,8 % | ok | ok | sí | 4/8 |
| `disculparse` | 5 | 3,8 % | ok | ok | sí | 4/8 |
| `insistir` | 4 | **3,0 %** | ok | **ok, por cero** | sí | **1/8** |

**Los dos umbrales pasan.** El techo, con la mitad de margen: el acto más pedido del set ocupa el
15,9 % de los turnos, la mitad del 30 % permitido. El suelo, sin nada de margen: `insistir` está en
**3,0 % exacto**, y los cuatro turnos son del escenario nuevo. **Quita una fila de exponentes al
nº4 y el reparto falla.** Los doce actos del catálogo están presentes; en la ronda anterior
`insistir` era 1 turno de 145 (0,7 %) y `recomendar` 4, los cuatro del mismo escenario.

**Lo que el umbral no ve, y hay que decir:**

1. **Dos actos declarados que ningún turno produce.** El escenario 1 declara
   `conceder-con-condicion` en su banda de diseñador y ninguna de sus 18 filas lo pide; el 8 declara
   `proponer-alternativa` y ninguna de sus 12 lo pide. La etiqueta no describe la ficha.
2. **Los dos actos más pedidos del set no los declara nadie.** `pedir-aclaracion` (15,9 %, 8/8) y
   `poner-limite` (11,4 %, 8/8) son la mitad del trabajo real y no aparecen en el campo
   `speechActs` de ningún escenario. Lo mismo `negociar` (5,3 %, 4/8). Si el campo va a servir para
   filtrar o para etiquetar en la plataforma, hoy filtra mal.
3. **`insistir` y `recomendar` siguen siendo actos de un escenario y medio.** `insistir` está solo
   en el nº4; `recomendar` en el 2 y el 4, tres turnos cada uno. El set los toca porque el escenario
   nuevo se diseñó para eso, no porque el conjunto los reparta.
4. **El reparto A/B se enderezó.** `quejarse` era 6A/1B y ahora es 4A/3B; `recomendar` era 4A/0B y
   ahora 4A/2B. Ya no es verdad que quejarse sea solo cosa del que pide.

Turnos-materia por escenario: 18 en el 1, 2, 4, 5, 6 y 7; **12 en el 3 y en el 8**. Los dos cortos
son el molde y el único `sin-acuerdo`.

---

## 2 · Los otros cinco repartos

**Poder.** `a>b` en 1, 2, **4** y 7 = **4 de 8**. El escenario nuevo es el que compró el margen: sin
él serían 3 de 8, justo en el umbral. Y sigue en pie el aviso que ninguna ronda ha resuelto: la nº 1
son dos topes duros simétricos con un «if you walk away with nothing» que cuesta lo mismo a los dos.
Si el guardián la reetiqueta `igual`, el reparto queda en 3 de 8 y **sigue pasando** — antes esa
reetiqueta lo tumbaba.

**Quién arranca.** A en 3, 4, 6, 8; B en 1, 2, 5, 7. **50/50 exacto.**

**Desenlace.** acuerdo 3 (1, 2, 5) · acuerdo-parcial 3 (3, 4, 6) · aplazado 1 (7) · **sin-acuerdo
1 (8)**. Cumple, y **sigue sin margen**: el nº 8 es el único escenario del set que termina en nada.
Cualquier cambio que lo toque tumba el reparto.

**Culpa del rol A.** El problema lo causa A en el 3 (el examen), el 5 (los tres lunes tarde) y el 6
(el sí a la tía antes de preguntar): **3 de 8 = 37,5 %**. El nº4 nuevo pone la causa fuera de los dos
jugadores —el grupo se fue al río a las diez por el calor— y eso es exactamente lo que abrió el
margen que antes era cero.

**Escenografía.** Aula **0 de 8**. Y lo que el umbral no mide también mejoró:

| dónde | esc. | nº | % | antes |
|---|---|---|---|---|
| mostrador / escritorio con alguien detrás | 2, 5, 8 | 3 | **37,5 %** | 50,0 % |
| calle / parqueadero / portería | 1, 7 | 2 | 25,0 % | 25,0 % |
| casa o patio | 4, 6 | 2 | 25,0 % | 12,5 % |
| trastienda de trabajo | 3 | 1 | 12,5 % | 12,5 % |

Martes: **4 de 8 (50,0 %)**, antes 5. Cabecera: **3 de 8 (37,5 %)**, antes 4. Registro: 3 formales,
4 informales y uno «polite», antes 4-3-1. El domingo en Girón del nº4 es el que rompe las tres.

**Minutos y turnos por rol contra §4 (A2 = 5-8 min, 6-9 turnos por rol).** Los minutos están
arreglados: los ocho van de 6 a 8, y el nº5 bajó de 9 a 8. Los turnos, no:

| esc. | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| turnos por rol | 8 | 9 | 7 | 9 | **17** | **12** | 9 | 8 |

**El nº5 declara 17 turnos por rol.** El techo de A2 es 9 y el de **B1 es 12**: está por encima de
los dos. El nº6, con 12, está en el techo de B1. Y 17 por rol en 8 minutos son 34 turnos globales a
14 segundos cada uno. La unidad ya no es ambigua —las ocho fichas dicen «por rol» y lo dicen igual—,
pero **dos escenarios de ocho no son A2 en turnos**.

---

## 3 · Género — el reparto que sigue fallando, y ahora falla por la columna nueva

Esta ronda mide cinco cosas, no cuatro: quién manda en escena, quién decide fuera, quién gana,
quién causa el problema **y quién cuida**.

**Roles en escena: 16. Con nombre propio: 8** (antes 9). Dos más son neutros a propósito (Dani y
Cris, nº6, sin una sola concordancia en ninguna de las dos fichas). Seis no tienen nombre: los dos
del 1, los dos del 2 y los dos del 3.

| medida | mujeres | hombres | neutro |
|---|---|---|---|
| **roles con nombre en escena** | 4 (Amparo, Valentina, Tatiana, Milena) — **50,0 %** | 4 (Fabián, Duván, Camilo, Kevin) — **50,0 %** | 2 |
| **manda en escena**, con nombre | **3** (Amparo 5, Valentina 7, Milena 8) — **75,0 %** | 1 (Fabián 4) — 25,0 % | — |
| **gana**, con nombre | **3** (las mismas) — **75,0 %** | 1 (Fabián) — 25,0 % | — |
| **causa el problema**, con nombre | **0** | **2 de 2** (Camilo 5, Kevin 7) — **100 %** | 1 (Dani 6) |
| **decide fuera de escena** | 7 (Restrepo, Nayibe, Marcela, la tía, la mamá, doña Nubia, Andrea) — 46,7 % | 8 (el portero, Édgar, el vecino del 3, Nelson, Hernán, Sebastián, Édison, Wilmer) — 53,3 % | — |
| **cuida de alguien**, con nombre | **0 de 4** | **3 de 3** (Fabián, Duván, Camilo) | 1 (Dani) |

### Lo que mejoró de verdad

- **Los roles con nombre están 4 a 4**, cuando la ronda anterior eran 5 mujeres y 2 hombres. Ahora
  la pregunta de si el reparto es justo se puede contestar: hay bastantes de los dos en pantalla.
- **Fuera de escena, 53/47.** Antes era 60/40. Es un reparto razonable y no hay que tocarlo.
- **Ya hay un hombre que manda y gana** (Fabián), y hay un escenario entero de dos hombres, que el
  set no tenía: eran 2 de 8 con dos mujeres frente a frente y **0 con dos hombres**. Ahora es 1 y 1.

### Lo que falla, y por qué falla ahora

**1 · El mando no se movió ni un punto.** Fabián sustituye a Norbey en la casilla de «hombre que
manda» y todo lo demás sigue igual: **3 de 4 mandos con nombre son mujeres, 75 %**, exactamente la
cifra de la semana pasada. La recomendación anterior ofrecía dos caminos —rol A masculino en el nº5
**o** mando masculino en el nº8— y se tomó el primero, que **no toca la casilla del mando**: en el
nº5 el que manda es doña Amparo, y Camilo es el subordinado. Se arregló el conteo de cabezas y no
el de poder.

**2 · La culpa se volvió cosa de hombres, 2 de 2.** Antes eran Liliana (mujer, nº5) y Kevin
(hombre, nº7) más Dani (neutro): uno y uno. Hoy los dos culpables con nombre del set son hombres.
Es el mismo defecto que §5 avisa —«ojo con arreglarlo del revés»— con los papeles cambiados: **las
mujeres mandan y ganan, los hombres causan el problema.**

**3 · El cuidado no se añadió: se mudó.** Este es el hallazgo de la ronda. La auditoría anterior
midió que en los ocho escenarios **ningún hombre cuidaba de nadie**. Hoy los tres personajes con
nombre que cuidan de alguien son hombres y **ninguna de las cuatro mujeres con nombre cuida de
nadie**. Y no se escribió cuidado nuevo para nadie más: la guardería de Matías, los cuarenta niños
de la escuela de fútbol de los sábados y la carrera de las 6:40 **eran de Liliana y siguen palabra
por palabra donde estaban**; lo único que cambió es el nombre de quien las hace. Hasta el vecino
del 3, que era «her two girls», ahora es «his two boys». El escenario nuevo añade dos hombres más
—Fabián cocinando para doce desde las nueve sin haber desayunado, Duván guardando un plato— y con
eso la columna queda **3 de 3 hombres, 0 de 4 mujeres**. Un espejo es un espejo aunque apunte al
otro lado.

**4 · Y el cambio de nombre creó una escena que nadie volvió a mirar.** En el nº5, la lista de
cierre obliga a decir en voz alta *«por qué él, y no Alba»*. Alba es la compañera del mostrador que
—dice la propia ficha— **nunca llega tarde**. Antes de esta ronda la frase era *«why you chose her,
and not Alba»*: mujer contra mujer, y no significaba nada. Hoy es una supervisora explicándole a un
hombre que llega tarde tres lunes seguidos por qué el ascenso es suyo y no de la mujer puntual, y el
estudiante tiene que **decirlo en voz alta para cerrar el juego**. Es la consecuencia directa de
renombrar un rol sin volver a leer el escenario entero.

**Qué habría que cambiar, y por qué.** Con tocar una sola cosa se arreglan las tres:
**hacer masculino el mando del nº8** (Milena → un hombre). Deja los mandos en 2 de 4 (50 %), deshace
el segundo par de dos mujeres frente a frente y no toca ni el desenlace `sin-acuerdo` ni el poder
`b>a`, que son las dos piezas que el nº8 sostiene solo. Para la culpa y el cuidado hace falta lo
contrario y también es barato: **darle a una mujer con nombre algo que cuidar** —el nº7 y el nº8 no
tienen a nadie cuidando de nadie— o **devolverle a una la causa del problema**, en el 3 o en el 6,
que hoy son roles sin nombre y neutros. No hace falta reescribir ningún escenario: hacen falta
nombres y dos o tres líneas.

---

## 4 · El vocabulario del set — las 157 entradas juntas

**157 entradas** en 16 roles (9 o 10 por rol: §11 pide 8-10, cumplen 16 de 16), **122 formas
distintas** una vez normalizadas.

### ¿Arregló el campo el escenario nuevo? A medias, y él solo

Medido con **las mismas expresiones regulares** de la ronda anterior, para que las cifras se puedan
comparar:

| campo | antes (158) | ahora (157) | escenarios |
|---|---|---|---|
| trámite / papel / contrato | 27,2 % | **21,0 %** | 7/8 |
| dinero / pago | 25,3 % | **20,4 %** | 7/8 |
| tiempo / agenda | 18,4 % | 19,1 % | 6/8 |
| objeto y oficio de la escena | 20,3 % | 16,6 % | 5/8 |
| persona y cargo | 11,4 % | 8,3 % | 6/8 |
| **papel + dinero** | **52,5 %** | **41,4 %** | — |
| **papel ∪ dinero**, sin doble conteo | — | **38,2 %** | 8/8 |

Y los cuatro campos que la auditoría anterior daba por vacíos:

| campo nuevo | entradas | % | escenarios |
|---|---|---|---|
| comida y cocina | 17 | **10,8 %** | 3/8 (1, 4, 7) |
| transporte que no es papeleo | 6 | 3,8 % | 3/8 (1, 4, 5) |
| cuerpo y salud que no es una muela | 2 | 1,3 % | **1/8 — solo el 4** |
| **ocio y tiempo libre** | **0** | **0,0 %** | **0/8** |

**Las veinte entradas del escenario nuevo son el motor del cambio.** Diecinueve de sus veinte no
son ni papel ni dinero: `to simmer`, `firewood`, `raw`, `a lid`, `to stir`, `to go bad`,
`a serving`, `leftovers`, `to reheat`, `to keep an eye on something` en A; `to be starving`,
`a cooler`, `to head out`, `to swing by`, `to show up`, `empty-handed`, `to pick someone up`,
`to save someone a plate`, `the shade`, `to cool off` en B.

**Pero la mejora no es solo suya, y conviene decirlo bien.** Sin el escenario 4, las otras 137
entradas dan **42,3 %** de papel más dinero: las siete fichas reescritas esta tarde bajaron unos
diez puntos por su cuenta, y el escenario nuevo bajó los cuatro últimos. Lo que **sí** depende solo
de él son los campos nuevos: quítalo y comida se queda en 7 entradas, cuerpo baja a **cero** y
transporte a 5.

**Y ocio sigue en cero.** El escenario se llama «el río», el río está en la prosa de las dos fichas,
y en las 157 entradas de vocabulario del set no hay una sola palabra de río, de nadar, de fin de
semana ni de pasarlo bien. Lo más cerca que llega es `the shade` y `to cool off`, que son cuerpo, no
ocio. **Un estudiante que haga los ocho sale sin saber decir qué hace un domingo.**

### Cuántas entradas cruzan escenarios

**Seis formas** aparecen en dos escenarios distintos: `opening` (2, 3), `to cover` (2, 3),
`warehouse` (2, 5), `shift` (3, 7), `to owe someone a favor` (3, 6), `reservation` (3, 7). Son
**16 entradas de 157 = 10,2 %**; el **89,8 % de lo que se enseña en un escenario no se enseña en
ningún otro** (antes 85,4 %).

| esc. | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| exclusivas | **100 %** | 75 % | 75 % | **100 %** | 89 % | 89 % | 89 % | **100 %** |

Los dos flojos siguen siendo el 2 y el 3, y siguen compartiendo `opening` y `to cover`: la clínica y
el café hablan de turnos con las mismas palabras. No es grave. **Las glosas repetidas son 58 de 157
(36,9 %)** y casi todas son el mismo objeto visto por los dos roles del mismo escenario, que es como
debe ser; **solo dos cruzan escenario** (`the hours you work in one day`, en 3A y 7B).

### Sí, sigue habiendo un bloque genérico, y casi no se movió

Con **la lista idéntica** de la ronda anterior —palabras que valdrían tal cual en cualquiera de los
ocho—: **28 de 157 = 17,8 %**, contra 19,6 % antes. Son `appointment`, `branch`, `business days`,
`charge`, `cover`, `deal`, `ID`, `in cash`, `in writing`, `lock`, `opening`, `proof`, `shift`,
`sign`, `spot`, `tips`.

**El escenario nuevo aporta cero de las veintiocho.** El bloque sigue entero donde estaba, y sigue
concentrado en los mismos sitios: **2A (4 de 10), 2B (4 de 10), 8A (4 de 10), 1A (3), 1B (3)**.
La prueba de §11 —«¿puede este rol llegar al cierre sin esta palabra?»— las deja pasar una a una;
lo que solo se ve desde arriba es que **una de cada seis palabras del set es la misma palabra de
trámite con otro nombre**, y que la clínica y el gimnasio se llevan la mitad.

### La columna `here`, que §11 marca como la más calcable

**2 celdas de 157 = 1,3 %** empiezan por pronombre y verbo conjugado, que es lo que §11 prohíbe:

> `1A | the doorman → he told you twice · his rule, not your idea`
> `5A | commitment sheet → it is blank · one line on it is yours`

La del molde (`refund → you don't get one…`) **está arreglada**. Las dos de ahora son nuevas, y las
dos están en fichas reescritas esta misma tarde: la regla se aplicó al vocabulario del escenario
nuevo y no se volvió a pasar sobre las siete viejas. Son dos celdas y dos minutos.

---

## 5 · La longitud — el contador canónico, y solo él

Salida literal de `node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`, **tal como está
escrito hoy** —es decir, con el escenario 4 viejo dentro y el nuevo fuera, porque el glob del script
solo mira `fase7-*`:

```
ficha                                              A     B
------------------------------------------------------------
  fase7-fichas-1-the-bike-in-the-parking-lot.m  441   419
  fase7-fichas-2-no-appointment-until-thursday  449   448
  fase7-fichas-4-a-charge-i-did-not-make.md     450   457*
  fase7-fichas-5-late-again-on-monday.md        449   450
  fase7-fichas-6-the-cousin-on-the-sofa.md      449   450
  fase7-fichas-7-two-more-people-for-the-trip.  448   443
  fase7-fichas-8-cancel-the-gym-i-am-leaving.m  445   439
  fase7-modelo-ficha-en.md                      441   445

  dentro del techo (450): 15/16 · media 445 · peor 457
  * = se pasa
```

**Esa salida ya no describe el set que va a producción**: cuenta las dos fichas del escenario 4
retirado —una de las cuales es la única que se pasa, con 457— y no cuenta las dos del nuevo. El
mismo contador, misma función palabra por palabra, sobre la composición nueva
(`node artifacts/habla-a2/fase8-scripts/prosa-canonica-8.mjs`):

```
ficha                                              A     B
------------------------------------------------------------
  fase7-fichas-1-the-bike-in-the-parking-lot.m  441   419
  fase7-fichas-2-no-appointment-until-thursday  449   448
  fase7-modelo-ficha-en.md                      441   445
  fase8-fichas-4nuevo.md                        432   441
  fase7-fichas-5-late-again-on-monday.md        449   450
  fase7-fichas-6-the-cousin-on-the-sofa.md      449   450
  fase7-fichas-7-two-more-people-for-the-trip.  448   443
  fase7-fichas-8-cancel-the-gym-i-am-leaving.m  445   439

  dentro del techo (450): 16/16 · media 443 · peor 450
  * = se pasa
```

**16 de 16 dentro del techo.** La ronda anterior tenía 9 de 16 fuera con seis reglas de conteo
distintas y dos marcadores `PROSA_A` sin sustituir. Eso está cerrado: un solo contador, y todas
pasan.

**Lo que la cifra tapa.** El techo es 450 y §11 dice «**apuntando a 400**»:

| distancia al techo | fichas | nº | % |
|---|---|---|---|
| 0-2 palabras (448-450) | 2A, 2B, 5A, 5B, 6A, 6B, 7A | **7** | **43,8 %** |
| 3-10 palabras (440-447) | 1A, 3A, 3B, 4B, 7B, 8A | 6 | 37,5 % |
| 11-31 palabras (419-439) | 1B, 4A, 8B | 3 | 18,8 % |

**Ninguna de las dieciséis baja de 419**, y siete están a dos palabras o menos de reventar. Dos
—5B y 6B— están en 450 clavado. Eso no es un presupuesto respetado: es un presupuesto **agotado**.
Cualquier corrección futura que añada una línea a cualquiera de esas siete rompe la puerta, y la
media del set está 43 palabras por encima del objetivo declarado. **Las dos fichas más cortas son
las del escenario nuevo (432 y 441)**, que es la única escrita con el techo ya conocido.

### Las tablas, contra §11

| pieza | umbral §11 (A1-A2) | medido | veredicto |
|---|---|---|---|
| datos | ≤ 10 filas | 10 filas en 15 de 16 · 8 en 3A | **cumple** |
| vocabulario | 8-10 | 9 o 10 en 16 de 16 | **cumple** |
| exponentes | 6-9 | **6B con 10** · las otras 15, entre 6 y 9 | **1 de 16 se pasa** |

Antes eran cuatro fichas con 10 filas de exponentes; queda una. Y sigue en pie que **§10 dice «6 a
10» y §11 dice «6 a 9»**: el blueprint se contradice consigo mismo y hay que cerrarlo en una cifra.

**Y hay una cuenta que el escenario nuevo se salta.** 4A y 4B llevan la tabla de datos de 10 filas
**más una segunda tabla de datos propia de 5 filas** —«What the fire is doing while you talk» y
«The bike, and what fits»—. Son **15 filas de dato duro por ficha contra un techo de 10**: un 50 %
por encima. La ficha lo justifica por escrito (los dos relojes son lo que hace que `insistir` sea
cortés y no grosero), y el argumento es bueno; pero entonces **la que hay que cambiar es la regla de
§11, no dejar la excepción sin declarar**. Hoy el escenario que arregla la voz del set es el único
que se sale de la cuenta de tablas, y eso no está escrito en ninguna parte.

---

## 6 · La voz — la arregló un escenario, no la ronda

### La plantilla

| fórmula | antes | ahora | las que no la usan |
|---|---|---|---|
| cita de registro `… N turns · N minutes` | 16/16 | **14/16 · 88 %** | 4A, 4B |
| `Your screen only. Don't show it. Don't read from it.` | 16/16 | **14/16 · 88 %** | 4A, 4B |
| `**Where you are** ·` | 16/16 | **14/16 · 88 %** | 4A, 4B |
| `**You want** ·` | 16/16 | **14/16 · 88 %** | 4A, 4B |
| `**You can't**` + lista numerada | 16/16 | **14/16 · 88 %** | 4A, 4B |
| `**Only you know**` | 16/16 | **14/16 · 88 %** | 4A, 4B |
| `**If you walk away with nothing**` | 16/16 | **14/16 · 88 %** | 4A, 4B |
| los cinco títulos de sección, en el mismo orden | 16/16 | **14/16 · 88 %** | 4A, 4B |

Ocho filas, y en las ocho la excepción son las mismas dos fichas. **El escenario 4 es la única voz
distinta del set.** Renombra las cinco secciones por rol —«the numbers you're cooking with» contra
«the numbers you're carrying», «Words for the fire» contra «Words for the road», «Out loud, in this
patio» contra «Out loud, before the bike»— y cambia los siete encabezados por otros que solo tienen
sentido en ese patio.

### Bloques propios

**9 de las 16 fichas no añaden ni un bloque propio (56,3 %)**, contra 11 de 16 antes. Las siete que
sí añaden algo:

| ficha | bloque propio |
|---|---|
| **4A** | *The patio, 11:20 a.m.* · *What you're after* · *Three things you won't do* · *Nobody out there knows this* · *If he rides off with nothing settled* · **«What the fire is doing while you talk»** |
| **4B** | *The patio, and one foot outside it* · *What you need before you go* · *Three lines you don't cross* · *What you haven't said yet* · *If you leave at 11:40 with nothing* · **«The bike, and what fits»** |
| 5B | `**Before you speak**` — la acotación escénica |
| 6B | `**One at a time**` |
| 7A | `**Your own rule**` |
| 7B | `**And a reason you can repeat**` |
| 8A | `**Not about money**` · `**You can, but you don't have to**` |

**Los dos que se sumaron desde la ronda anterior son los del escenario nuevo.** Las seis fichas que
se reescribieron esta tarde —1, 2, 5, 6, 7 y 8— tenían la oportunidad de añadir uno y **ninguna lo
hizo**; el 6B que aparece en la lista ya estaba. Las dos del molde siguen sin ninguno, que es
coherente: el molde es la plantilla.

### El estilo medido

| medida | ronda anterior | ahora |
|---|---|---|
| palabras por frase | media 10,0 · rango 8,5–11,6 · **CV 9 %** | media 10,3 · rango 8,9–11,7 · **CV 9 %** |
| % de fragmento sin verbo finito | media 42 % · rango **32–59 %** · CV 19 % | media 27 % · rango **17–40 %** · CV 20 % |
| `·` por 100 palabras | rango **2,4–6,7** · CV 32 % | rango **1,0–3,9** · **CV 43 %** |

**Todo el set bajó quince puntos de telegrama** —es la corrección del 21 de agosto, «la prosa vuelve
a ser prosa», y se aplicó de verdad en las ocho—. Pero **la dispersión es la misma que antes** (CV
20 % contra 19 %) y la de los puntos medios **subió** (43 % contra 32 %). Traducido: las fichas
siguen sin converger, solo que ahora se separan más abajo. Y hay una vuelta de tuerca: **la más
telegráfica del set es hoy 4B, con un 40 %** —el escenario nuevo—, mientras el molde está en el 23 %.
El molde sigue sin mandar.

**El léxico sí distingue, exactamente igual que antes.** Jaccard medio entre fichas de escenarios
distintos: **17,3 %** (antes 17,4 %). Entre los dos roles del mismo escenario: **32,3 %** (antes
31,4 %). Cada ficha tiene del 10 % al 26 % de tipos que no aparecen en ninguna otra, y las dos más
propias son **4A (23 %) y 4B (25 %)**. Se sigue distinguiendo por los sustantivos.

### Y una uniformidad que ninguna ronda ha medido: los ocho cierran igual

| esc. | cómo cierra |
|---|---|
| 1 | los dos dicen los cuatro hechos en voz alta y comprueban que coinciden |
| 2 | cada uno dice su parte de las cuatro · **el paciente dicta el celular dígito a dígito y el mostrador lo devuelve** |
| 3 | los dos dicen en voz alta el mensaje que va al grupo del café, cinco puntos |
| 4 | seis frases, tres cada uno, **y nadie repite la del otro**; prohibido escribir y prohibido leer |
| 5 | se firma la hoja · **doña Amparo lee la línea en voz alta y pregunta para que él la repita** |
| 6 | Dani dice el mensaje para la tía delante de Cris, y Cris lo confirma o corrige |
| 7 | cada uno dice su parte del mensaje del grupo, Valentina lo aprueba y lo manda |
| 8 | **Milena dicta el número de caso y la fecha, y Tatiana los devuelve** |

**8 de 8 cierran con el mismo mecanismo**: decir en voz alta y que el otro confirme o corrija. El
escenario nuevo cambia los accesorios —prohíbe explícitamente el papel y el dictado— pero **no
cambia el mecanismo**; solo lo reparte en seis frases con dueño en vez de en una lista compartida.
Lo que sí bajó es el ritual de dictar un número y devolverlo: **2 de 8 (25,0 %)** contra 3 de 8
antes. Y **3 de 8 cierran componiendo un mensaje para alguien que no está en la escena** (el grupo
del café, la tía, el grupo de WhatsApp).

No hay umbral en §5 para esto, y por eso nunca ha salido. Pero un estudiante que haga los ocho
practica ocho veces la misma coreografía de cierre, y **es la parte del ejercicio que más se nota
cuando se repite**.

---

## 7 · Qué habría que cambiar, por orden de coste

No se arregla nada aquí. Se dice qué, dónde y por qué.

| # | qué | dónde | por qué | coste |
|---|---|---|---|---|
| 1 | Reescribir dos celdas `here` que empiezan por pronombre y verbo conjugado | `1A` (`the doorman`), `5A` (`commitment sheet`) | §11 lo prohíbe por escrito; el molde ya está arreglado y estas dos son nuevas | minutos |
| 2 | Actualizar el glob de `prosa-canonica.mjs` para que mida la composición que va a producción | `fase7-scripts/prosa-canonica.mjs` | hoy cuenta el escenario retirado —y su 457— y no cuenta el nuevo | minutos |
| 3 | Cuadrar la banda de diseñador con lo que la ficha produce | esc. **1** (declara `conceder-con-condicion` y no lo pide) y esc. **8** (declara `proponer-alternativa` y no lo pide) | el campo `speechActs` es lo que hace medible §5; si miente, mide mal | una pasada |
| 4 | Bajar de 10 a 9 la tabla de exponentes de **6B** | ficha 6 | única fuera del 6-9 de §11 | minutos |
| 5 | Cerrar la contradicción del blueprint: exponentes 6-9 (§11) o 6-10 (§10) | blueprint | lleva dos rondas abierta | decisión |
| 6 | **Declarar la excepción de tablas del escenario 4**, o quitarle una de las dos tablas de reloj | §11 + ficha 4 | 15 filas de dato duro por rol contra un techo de 10, sin nota que lo diga | decisión |
| 7 | **Bajar los turnos por rol del nº5 (17) y del nº6 (12)** al rango 6-9 de §4, o declararlos B1 | fichas 5 y 6 | el 17 está por encima incluso del techo de B1, y son 34 turnos globales en 8 minutos | media jornada |
| 8 | **Género: hacer masculino el mando del nº8** | ficha 8 | deja los mandos en 2 de 4 y deshace el segundo par de dos mujeres, sin tocar el `sin-acuerdo` ni el `b>a` que el nº8 sostiene solo | una pasada |
| 9 | **Género: dar a una mujer con nombre algo que cuidar, o devolverle a una la causa del problema** | esc. 7 u 8 (nadie cuida), esc. 3 o 6 (culpa en rol sin nombre) | hoy 3 de 3 cuidadores son hombres y 2 de 2 culpables también: el espejo de la ronda anterior, del revés | una pasada |
| 10 | **Volver a leer el nº5 entero después del cambio de nombre** | ficha 5 | «why him, and not Alba» pone al estudiante a decir en voz alta por qué el ascenso es del impuntual y no de la puntual. Lo creó el renombrado, no el diseño | una pasada |
| 11 | Meter ocio en el vocabulario: 8-10 entradas de río, fin de semana o pasarlo bien | cualquiera de los ocho | **0 de 157** entradas, y el escenario nuevo transcurre a quince minutos de un río | media jornada |
| 12 | Recortar hacia 400 las siete fichas que están a 0-2 palabras del techo | 2A, 2B, 5A, 5B, 6A, 6B, 7A | §11 dice «apuntando a 400»; hoy la media es 443 y no queda margen para una sola corrección futura | media jornada |
| 13 | Variar el mecanismo de cierre en dos escenarios | 2 del set | 8 de 8 cierran diciendo en voz alta y confirmando; no hay umbral que lo cace y se nota al hacer los ocho | el bloque |
| 14 | Repartir `insistir` y `recomendar` a un segundo y tercer escenario | esc. a elegir | `insistir` está en 3,0 % exacto y los cuatro turnos son del nº4: una fila menos y el suelo de §5 falla | el bloque |

Los seis primeros no tocan ningún escenario. Del 7 al 11 son decisiones de David o del guardián.
Los tres últimos son trabajo de verdad, y ninguno bloquea la publicación.

---

## 8 · Lo que hay que decir del escenario nuevo

Sustituyó a la nº4 y se le pidieron siete cosas. **Cumple las siete**: exterior sin mostrador,
sin documento, poder `a>b`, culpa fuera de los dos jugadores, `insistir` y `recomendar` por diseño,
vocabulario de un campo que el set no tocaba, y registro informal. Y además hace dos que no se le
pidieron: es el único que rompe la plantilla de voz y el único que trae bloques propios por rol.

Lo que conviene no perder de vista es que **eso mismo lo vuelve el punto único de fallo del
conjunto**. Hoy el set depende de él para el suelo de `insistir` (3,0 % exacto), para el margen del
reparto de poder (4 de 8 en vez de 3), para el margen de la culpa (37,5 % en vez de 50 %), para tres
de los cuatro campos de vocabulario que estaban vacíos y para el 100 % de la variación de voz.
**Siete escenarios comparten una plantilla y el octavo lleva todo lo que la salva.** Eso no es un
defecto de la ficha nueva: es la medida de cuánto no se movieron las otras siete.
