# Fase 13 · Auditoría de CONJUNTO — inglés A2, los ocho escenarios a la vez

**Fecha:** 22-23 ago 2026. **Estado del árbol:** `08fb16fd`. Todo lo de aquí está medido sobre el
disco de hoy. **Ninguna cifra declarada dentro de una ficha o de un informe anterior se ha dado
por buena**: las seis medidas se recalculan con scripts nuevos en `artifacts/habla-a2/fase13-scripts/`.

Set auditado (los ocho vivos; `fase7-fichas-4-a-charge-i-did-not-make.md` está RETIRADO y no entra):

| esc | archivo |
|---|---|
| 1 | `fase7-fichas-1-the-bike-in-the-parking-lot.md` |
| 2 | `fase7-fichas-2-no-appointment-until-thursday.md` |
| 3 | `fase7-modelo-ficha-en.md` — **el molde** |
| 4 | `fase8-fichas-4nuevo.md` — el que sustituyó al retirado |
| 5 | `fase7-fichas-5-late-again-on-monday.md` |
| 6 | `fase7-fichas-6-the-cousin-on-the-sofa.md` |
| 7 | `fase7-fichas-7-two-more-people-for-the-trip.md` |
| 8 | `fase7-fichas-8-cancel-the-gym-i-am-leaving.md` |

---

## VEREDICTO

**NO APTO, por cuatro defectos de conjunto.** Los seis repartos numéricos de §5 **pasan todos**, y
tres de ellos pasan hoy y no pasaban ayer. Lo que no pasa no está en ningún reparto: está en cuatro
cosas que solo aparecen cuando se ponen los dieciséis roles en la misma tabla.

| | |
|---|---|
| **Repartos de §5** | **6 de 6 PASAN.** Actos, poder, arranque, desenlace, culpa y escenografía, todos dentro de umbral, medidos sobre 133 turnos-materia |
| **Las tres reglas de tabla de §11** | **R1 y R2 pasan 16/16. R3 falla en 1 etiqueta de 133** |
| **Género** | poder en escena 2H/2M, culpa 3H/1M/1N, pronombres 50/50. **Pero quien decide fuera de escena es mujer en 5 de 7 (71 %)** — la columna exacta del aviso de §5 |
| **Defecto 1** | **En 0 de 8 escenarios el problema lo causa quien manda.** Cinco escenarios tienen culpable identificable y en los cinco es el que pide o un igual. Nunca el que concede |
| **Defecto 2** | **El escenario 4 está fuera del molde en seis ejes a la vez**, y dos rompen §11 por la letra: 14 y 13 filas de datos (techo 10) y una columna `register` que no tiene ninguno de los otros catorce roles |
| **Defecto 3** | **El molde falla la puerta 5** (carga 64/36, lado menor 35,8 %) con el arreglo escrito y costeado desde el 22 de agosto y sin aplicar. Es el único de los ocho que sigue fallándola |
| **Defecto 4** | **Hay dos protocolos de cierre distintos en el set** —cinco «lista compartida», tres «tres líneas cada uno»— y cuál te toca depende de qué fichas recibieron la pasada de carga, no del escenario |

Los cuatro se arreglan con **0 palabras de coste contra el techo de prosa**. Tres de los cuatro
viven en tablas y en la sección compartida `## Both screens`, que el contador canónico no cuenta; y
el cuarto —alinear el escenario 4— **libera 15 y 12 palabras**, que es lo que saca al peor rol del
set (4B, hoy en 450 clavado) del filo del techo.

---

## Antes de las cifras: un script canónico está midiendo un set que ya no existe

`node artifacts/habla-a2/fase11-scripts/actos-cuota.mjs` declara **135 turnos-materia**. El set de
hoy tiene **133**. Su mapa asigna nueve filas a `1A` y nueve a `1B`, y el commit `9cfc3dd0` —«nueve
filas para ocho turnos es un guion, no un andamiaje»— las dejó en **ocho y ocho**. Las dos filas
fantasma llevan acto asignado y entran en todos los porcentajes.

No cambia ningún veredicto (el máximo se mueve de 16,3 % a 15,8 %, el mínimo de 3,7 % a 3,8 %),
pero el número lleva tres valores distintos en tres informes —132 en `fase11-veredicto`, 135 en el
script, 133 en el disco— y ninguno de los tres se contradice a la vista: hay que abrir las fichas.

**Escrito nuevo:** `artifacts/habla-a2/fase13-scripts/actos-conjunto.mjs`, que **valida el mapa
contra el disco antes de contar y se para si no cuadra**. Es la diferencia entre un contador y un
contador que envejece en silencio.

---

## MEDIDA 1 · Reparto de actos de habla

`node artifacts/habla-a2/fase13-scripts/actos-conjunto.mjs`

Unidad: una fila de la tabla de exponentes = un turno que la pareja tiene que producir.
**133 turnos-materia** (A 66 · B 67). Umbrales de §5: techo **30 %** de los turnos del set, suelo
**3 %** para los actos declarados en las bandas.

| acto | turnos | % del set | techo 30 % | suelo 3 % | en cuántos esc. | A / B |
|---|---|---|---|---|---|---|
| pedir-aclaracion | 21 | **15,8 %** | ok | — | 8/8 | 12 / 9 |
| dar-dato/razon *(fuera de catálogo)* | 20 | 15,0 % | n/a | — | 8/8 | 9 / 11 |
| proponer-alternativa | 15 | 11,3 % | ok | ok | 7/8 | 7 / 8 |
| poner-limite | 13 | 9,8 % | ok | — | 7/8 | 7 / 6 |
| pedir-favor | 10 | 7,5 % | ok | ok | 8/8 | 4 / 6 |
| conceder-con-condicion | 8 | 6,0 % | ok | ok | 6/8 | 3 / 5 |
| dar-mala-noticia | 7 | 5,3 % | ok | ok | 5/8 | 3 / 4 |
| quejarse | 6 | 4,5 % | ok | ok | 4/8 | 4 / 2 |
| apertura *(fuera de catálogo)* | 5 | 3,8 % | n/a | — | 3/8 | 2 / 3 |
| rechazar | 5 | 3,8 % | ok | ok | 5/8 | 2 / 3 |
| recomendar | 5 | 3,8 % | ok | ok | **2/8** | 4 / 1 |
| insistir | 5 | 3,8 % | ok | ok | **2/8** | 3 / 2 |
| disculparse | 5 | 3,8 % | ok | ok | 4/8 | 2 / 3 |
| negociar | 4 | 3,0 % | ok | — | 3/8 | 2 / 2 |
| cierre-ritual *(fuera de catálogo)* | 2 | 1,5 % | n/a | — | 1/8 | 1 / 1 |
| ganar-tiempo *(fuera de catálogo)* | 2 | 1,5 % | n/a | — | 1/8 | 1 / 1 |

**PASA.** Máximo **15,8 %** (techo 30). Mínimo declarado **3,8 %** (suelo 3). **Ningún acto del
catálogo de §7 está ausente**, y ninguno queda por debajo del 3 % aunque no se declare. 104 de 133
turnos (78,2 %) piden un acto del catálogo.

**Esto es una mejora real desde `fase11-veredicto`**, que suspendía la puerta 12 por `insistir` al
**1,5 %**. Hoy está en **3,8 %**, y el escenario 8 —que declaraba `proponer-alternativa` sin
producirlo— lo produce en `8B` (`offering another way`). La puerta 12 se ha reparado.

**Lo que la cuota no ve, y sí se ve por escenario.** El acto declarado en la banda vive en un solo
rol en **cinco de los ocho**, y en **dos de ellos los declarados están todos del mismo lado**:

| esc | declara | dónde se produce |
|---|---|---|
| 1 | rechazar + conceder-con-condicion | `rechazar` **solo en B** |
| **2** | dar-mala-noticia + recomendar | **los dos solo en A** ← quien juega B no produce ninguno |
| 3 | pedir-favor + conceder-con-condicion | uno en cada rol (correcto: es el reparto del molde) |
| 4 | recomendar + insistir + conceder | los tres en los dos roles |
| 5 | disculparse + conceder-con-condicion | uno en cada rol |
| 6 | dar-mala-noticia + proponer-alternativa | los dos en los dos roles |
| **7** | quejarse + rechazar | **los dos solo en A** ← quien juega B no produce ninguno |
| 8 | pedir-favor + rechazar + proponer-alternativa | `rechazar` y `proponer` solo en B |

Un estudiante que en los escenarios 2 y 7 caiga en el asiento B se lleva a casa el escenario sin
haber producido ni una vez el acto que le da nombre. Como los dos asientos los juegan estudiantes,
esto no es un defecto de ficha: es un defecto de set.

---

## MEDIDA 2 · Poder, arranque, desenlace, culpa y escenografía

`node artifacts/habla-a2/fase13-scripts/reparto-conjunto.mjs`

| esc | poder | arranca | desenlace | min | relación | sitio | culpa | carta |
|---|---|---|---|---|---|---|---|---|
| 1 | a>b | B | acuerdo | 6 | desconocidos · compraventa | portería de un edificio | nadie | B |
| 2 | a>b | B | acuerdo | 6 | institución ↔ ciudadano | mostrador de clínica | nadie | A |
| 3 | igual | A | acuerdo-parcial | 7 | iguales · compañeros de turno | trastienda de un café | **A** | A |
| 4 | a>b | A | acuerdo-parcial | 7 | iguales · amigos, en casa de él | patio de una casa | **B** | A |
| 5 | b>a | B | acuerdo | 8 | jefa ↔ empleado | oficina de una bodega | **A** | B |
| 6 | igual | A | acuerdo-parcial | 8 | iguales · compañeros de piso | apartamento compartido | **A** | B |
| 7 | a>b | B | aplazado | 7 | iguales · amigos | parqueadero | **B** | A |
| 8 | b>a | A | sin acuerdo | 8 | institución ↔ cliente | mostrador de gimnasio | fuera de escena | B |

| Reparto | Cifra medida | Umbral | Veredicto |
|---|---|---|---|
| **Poder** | a>b **4/8** · b>a **2/8** · igual **2/8**. Un asiento manda en 6 de 8 | estudiante manda ≥ 3 de 8 | **PASA** |
| **Quién arranca** | A **4/8 = 50 %** · B **4/8 = 50 %** | 40–60 % cada rol | **PASA** |
| **Desenlace** | acuerdo 3 · acuerdo-parcial 3 · aplazado 1 · **sin acuerdo 1** | ≥1 sin acuerdo y ≥1 parcial | **PASA** |
| **Culpa** | asiento A **3/8 = 38 %** · asiento B **2/8 = 25 %** · fuera de los dos **3/8** | el estudiante ≤ 50 % | **PASA** |
| **Escenografía** | **aulas 0/8**. Mostrador de institución 2 · zona común de vivienda 2 · trabajo 2 · casa 2 | ≤ 2 de 8 en aula | **PASA** |
| **Carta** | dueño A **4/8** · dueño B **4/8** | — | equilibrado |

**Y la monotonía de pareja NO existe en este set:** 4 de 8 son **entre iguales** (3, 4, 6, 7), y de
esos, dos son de vida privada (compañeros de piso, amigos). Solo 2 de 8 son mostrador y 1 de 8 es
jefe-empleado. Este es el reparto en el que un set normalmente falla, y aquí está bien.

### El defecto que ningún umbral cubre: quien manda nunca se equivoca

Cruzando las dos columnas que §5 pide contar por separado —quién manda y quién causa el problema—:

| esc | culpa | manda | lectura |
|---|---|---|---|
| 3 | A | — | entre iguales |
| 4 | B (Astrid) | A (Fabián) | **la tiene el que pide** |
| 5 | A (Camilo) | B (doña Amparo) | **la tiene el que pide** |
| 6 | A (Dani) | — | entre iguales |
| 7 | B (Kevin) | A (Valentina) | **la tiene el que pide** |

**El que manda causa el problema en 0 de los 8 escenarios.** En los tres asimétricos con culpable,
la culpa cae siempre del lado de abajo; en los dos simétricos, cae entre iguales. Los tres restantes
la ponen en el azar (1, 2) o fuera de escena (8, Wilmer, un vendedor que ya no trabaja allí).

La letra de §5 pasa —el estudiante la tiene el 38 % de las veces como mucho—. Lo que enseña el
conjunto es otra cosa: **que la autoridad se equivoca cero veces, y que el que necesita algo es el
que la ha liado**. Es la versión de conjunto exacta del defecto que §5 persigue, un piso por debajo
de donde la regla mira. Un escenario donde el mostrador metió mal un dato, o donde la supervisora
no anotó lo que debía, es lengua distinta: obliga a reclamar sin acusar y a que quien tiene poder
reconozca algo. Hoy nadie con poder reconoce nada en ninguno de los ocho.

### Repeticiones de escenografía y reloj, para vigilancia

- **Martes en 3 de 8** (2, 3, 6). Lunes 1, viernes 1, domingo 1, sin día 2.
- **Las 7:00 aparecen en 7 de los 8 escenarios**; las 6:00 en 6 de 8; las 9:00 en 5 de 8.
- **Cabecera formal en 3 de 8** (2, 5, 8) y **dos de esas tres son el mismo mostrador** (clínica y
  gimnasio: cliente que pide, empleado que no puede). Quien busque práctica de registro formal
  repite escena en 2 de sus 3 oportunidades.
- Cifras de pesos: solo `45,000` (esc 1 y 3) y `70,000` (esc 1 y 2) se repiten. **Ningún nombre
  propio se repite entre escenarios**: 25 nombres distintos, cero colisiones.

---

## MEDIDA 3 · Género

`node artifacts/habla-a2/fase13-scripts/genero-13.mjs`

| esc | rol A | rol B | manda en escena | decide fuera | manda la carta | gana | causa el problema |
|---|---|---|---|---|---|---|---|
| 1 | — | — | — (anónimos) | el portero (H) | el cuñado (H) | — | — |
| 2 | — | — | — (anónimos) | Dr. Restrepo (M) | Dr. Restrepo (M) | — | — |
| 3 | — | — | — (anónimos) | Nayibe (M) | el centro de examen (—) | — | A |
| 4 | Fabián (H) | Astrid (M) | **Fabián (H)** | la mamá (M) | la mamá (M) | — | Astrid (M) |
| 5 | Camilo (H) | doña Amparo (M) | **doña Amparo (M)** | — | Alba (M) | — | Camilo (H) |
| 6 | Dani (N) | Cris (N) | — (iguales) | la tía (M) | la mamá (M) | — | Dani (N) |
| 7 | Valentina (M) | Kevin (H) | **Valentina (M)** | doña Nubia (M) | doña Nubia (M) | Valentina (M) | Kevin (H) |
| 8 | Tatiana (M) | Mauricio (H) | **Mauricio (H)** | Édison / retención (H) | Édison (H) | Mauricio (H) | Wilmer (H) |

| Columna de §5 | Cifra | Veredicto |
|---|---|---|
| Rol A | 2 H · 2 M · 1 N · 3 sin género | equilibrado |
| Rol B | 2 H · 2 M · 1 N · 3 sin género | equilibrado |
| **Manda en escena** | **2 H · 2 M** (de los 4 con género) | **PASA** |
| **Causa el problema** | 3 H · 1 M · 1 N | **PASA** |
| Gana | 1 H · 1 M (solo 2 escenarios tienen ganador) | equilibrado |
| **Decide FUERA de escena** | **2 H · 5 M = 71 % mujeres** | **DESEQUILIBRIO** |
| **Manda la carta** | **2 H · 5 M = 71 % mujeres** | **DESEQUILIBRIO** |

Nombres en la zona jugable: **11 hombres · 12 mujeres · 2 neutros** (44 / 48 / 8 %).
Pronombres de tercera persona: **104 `he/him/his` · 105 `she/her`** — 50/50 clavado.

**Dónde está el sesgo y por qué importa.** Las columnas que §5 nombra primero están bien. La que
falla es exactamente la que §5 avisa que se mira **después**: «ojo con arreglarlo del revés». La
persona cuyo sí es definitivo, que no está en la habitación y a la que no se le puede replicar, es
**mujer en cinco de los siete escenarios que tienen una**: Dr. Restrepo, Nayibe, la mamá (dos
veces), la tía y doña Nubia. Y es la misma que manda la carta que rompe el plan.

Dicho de otro modo: en escena el poder está repartido, pero **el poder que no se puede negociar
está feminizado**. El estudiante habla con hombres y mujeres por igual, y a quien obedece sin
poder discutir es a una mujer 5 de 7 veces.

---

## MEDIDA 4 · Vocabulario

`node artifacts/habla-a2/fase13-scripts/vocab-13.mjs`
(comprobado además contra `fase11-scripts/vocab-campos.mjs` y `vocab-conjunto.mjs`, que sí miden
bien el disco de hoy: sus 157 entradas coinciden con las mías)

**157 entradas · 121 formas distintas · 16/16 roles dentro del 8-10 de §11.**

### Campos semánticos

| campo | entradas | % | escenarios |
|---|---|---|---|
| papeleo / contrato | 33 | 21,0 % | 7/8 |
| dinero | 27 | 17,2 % | 6/8 |
| tiempo / agenda | 25 | 15,9 % | 5/8 |
| objeto de la escena | 25 | 15,9 % | 6/8 |
| persona / rol | 16 | 10,2 % | 6/8 |
| comida / ocio / viaje | 7 | 4,5 % | 2/8 |
| sin clasificar | 42 | 26,8 % | — |

**Papeleo + dinero = 38,2 %**, y estaba en el 41 % antes de que entrara el escenario 4. El set
sigue inclinado hacia el trámite, pero ya no es monotema: el 4 metió el único campo de comida y
ocio que hay, y el 1 y el 6 aportan objeto y casa.

### Exclusividad

**Solo 6 formas viven en más de un escenario** (`opening`, `cover`, `warehouse`, `shift`,
`owe someone a favor`, `reservation`), 16 entradas de 157 = **10,2 %**. Exclusividad por escenario:
100 % en 1, 4 y 8; 89 % en 5, 6 y 7; 75 % en 2 y 3. **Esto está muy bien y no hay que tocarlo.**

### El problema está dentro del escenario, no entre escenarios

§11: «solo las de **este** rol en **este** escenario: la palabra que necesita quien está detrás del
mostrador no es la que necesita quien está delante».

| esc | A | B | formas compartidas A↔B | % del presupuesto | con glosa idéntica |
|---|---|---|---|---|---|
| **6** | 9 | 10 | **8** | **84 %** | 8/8 |
| **2** | 10 | 10 | **8** | **80 %** | 7/8 |
| 5 | 10 | 9 | 5 | 53 % | 5/5 |
| 1 | 10 | 10 | 4 | 40 % | 4/4 |
| 7 | 9 | 10 | 3 | 32 % | 3/3 |
| 3 | 10 | 10 | 1 | 10 % | 0/1 |
| 8 | 10 | 10 | 1 | 10 % | 0/1 |
| 4 | 10 | 10 | **0** | 0 % | — |

**60 de las 157 entradas del set (38,2 %) se gastan dos veces**, y 30 de ellas con la definición
literalmente idéntica en las dos pantallas. En los escenarios 2 y 6, ocho de cada diez palabras del
presupuesto de un rol son las mismas del otro rol, palabra por palabra y glosa por glosa: el
mostrador y el paciente estudian el mismo diccionario. Ahí se pierde la asimetría léxica que es la
mitad de la gracia de un juego de rol —el bloque 3 de la caja (`What does "…" mean?`) y el bloque 4
(`In other words, …`) no tienen a qué agarrarse si los dos ya saben las mismas palabras—.

El escenario 4 es el único con **cero** solape, y el 3 y el 8 con uno. Sí se puede hacer.

### Entradas que valdrían en cualquier escenario

Prueba comprobable en vez de lista a mano: §11 dice que entran «las que aparecen en los datos duros
del propio rol, las que le va a soltar el otro, y las del oficio de la escena». Se busca cada
palabra en **todo el resto de las dos fichas** —datos, prosa, exponentes, carta— quitando su propia
fila. Si no aparece en ningún sitio más, nada la sostiene.

**19 de 157 = 12,1 %**, y no están repartidas:

| rol | entradas sin sostén |
|---|---|
| **4A** | `leftovers` · `to go bad` · `to reheat` · `to stir` |
| **3B** | `a rush` · `in a row` · `to be short-staffed` |
| **4B** | `to be starving` · `to hang out` · `to head out` |
| **3A** | `non-refundable` · `to be off` |
| 2A · 2B | `chipped` (las dos) |
| 6A · 6B | `to be out all day` (las dos) |
| 7A | `to chip in` · 7B `to be 50,000 short` · 8A `to renew` |

**Siete de las veinte entradas del escenario 4 (35 %) y cinco de las veinte del escenario 3 (25 %)**
son ambiente, no herramienta. `to stir`, `to hang out`, `to head out` son vocabulario de
lección de comida, no de este patio: nada en las dos fichas los pide, nadie los va a soltar y no
hay dato duro que los ancle.

---

## MEDIDA 5 · Las tres reglas de tabla de §11 (`ed220acf`), sobre los dieciséis roles

`node artifacts/habla-a2/fase13-scripts/tablas-16.mjs`

### Premisa: ¿están las tablas ordenadas alfabéticamente por función?

**16 de 16, sí.** Sin esto, la regla del otorgamiento no significa nada.

### R1 · filas ≤ techo de la banda declarada

| rol | turnos declarados | techo | filas | margen |
|---|---|---|---|---|
| 1A · 1B | 8 | 8 | 8 · 8 | 0 · 0 |
| 2A · 2B | 9 | 9 | 9 · 9 | 0 · 0 |
| 3A · 3B | 7 | 7 | 6 · 6 | **1 · 1** |
| 4A · 4B | 9 | 9 | 9 · 9 | 0 · 0 |
| 5A · 5B | 6-9 | **9** | 9 · 9 | 0 · 0 |
| 6A · 6B | 9 | 9 | **8** · 9 | **1** · 0 |
| 7A · 7B | 9 | 9 | 9 · 9 | 0 · 0 |
| 8A · 8B | 8 | 8 | 8 · 8 | 0 · 0 |

**R1: 16/16 PASA.** También 16/16 dentro del 6-9 de §11. **Trece de dieciséis están exactamente en
el techo**: no hay margen para añadir ni una fila en ninguno de esos trece sin subir la banda de
turnos, que a su vez cambia el reloj de la escena. Es una restricción a tener presente antes de
proponer nada.

### R2 · la fila que concede, ni primera ni última

| rol | fila(s) que conceden | posición |
|---|---|---|
| 1A · 1B | `moving the deal` | 4/8 · 6/8 |
| 3B | `granting it` | 3/6 |
| 4A · 4B | `granting it, with a string` | 4/9 · 5/9 |
| 5B | `granting it` | **2/9** |
| 6B | `granting it` | 3/9 |
| 7A | `putting a price on a yes` | 6/9 |
| 7B | `something for something` | 7/9 |
| 8B | `offering another way` · `saying no with a door open` | 5/8 · 6/8 |
| 2A · 2B · 3A · 5A · 6A · 8A | — ninguna | n/a |

**R2: 16/16 PASA.** El caso más ajustado es `5B` en posición 2 de 9 —cumple la letra—. Nótese que
§11 manda etiquetar por función (`granting it`) y eso se cumple: no hay ni un `yes, with a
condition` ni un `your condition` en las 133 filas.

### R3 · ninguna etiqueta nombra un momento

El detector marca cuatro; tres son falsos positivos y hay que decirlo:

| rol | etiqueta | juicio |
|---|---|---|
| 5B 1/9 | `asking, and then waiting` | **falso positivo.** El «then» es dentro del turno (pregunta y calla), no dentro de la conversación |
| 6A 1/8 | `a second bed` | **falso positivo.** «Second» es una cama, no un momento |
| 6B 1/9 | `a third door` | **falso positivo.** «Third door» es una tercera opción |
| **6B 7/9** | **`the lease, last`** | **FALLA.** «Last» dice *cuándo*, no *qué* |

**R3: 1 fallo real de 133 etiquetas (0,8 %).** Y no es cosmético: la prosa de `6B` dice
*«You can't say all three things at once. One thing per turn, and the lease last»*, y la tercera
columna de esa fila dice *«your second thing as a closed plan — and the marker with the third one
already inside it»*. El alfabético baraja las nueve filas y **esta etiqueta le devuelve al
estudiante el orden entero de su plan**, que es literalmente lo que la regla nueva vino a impedir.

### Dos hallazgos extra de la misma pasada

- **El escenario 1 tiene 4 de 8 etiquetas idénticas entre A y B** (`asking about theirs`,
  `closing the question`, `money`, `moving the deal`) = **50 %**. Los otros siete escenarios van de
  0 a 1. Las dos fichas del escenario 1 comparten la mitad de su andamiaje.
- 5 etiquetas se repiten entre escenarios distintos: `granting it` (3B, 5B, 6B — esto es §11
  cumpliéndose, no un defecto), `asking about theirs` (1A, 1B, 3A), `opening` (1A, 4A),
  `asking again, with a new reason` (4A, 8A), `taking it back` (4B, 6B). 121 etiquetas distintas
  sobre 133 filas.

---

## MEDIDA 6 · Lo que solo se ve mirando los ocho juntos

`node artifacts/habla-a2/fase13-scripts/motor-conjunto.mjs` y `cierres-conjunto.mjs`

### ¿Corren todos sobre el mismo motor? Siete sí. El cuarto, no.

Las diez piezas obligatorias de §11 —situación, objetivo, restricciones, dato oculto, lo que se
pierde, datos duros, vocabulario, caja, exponentes, criterios— están en **16 de 16 roles**. Lo que
no está es el mismo **rótulo**, y el escenario 4 los cambia todos:

| pieza | los otros catorce roles | 4A | 4B |
|---|---|---|---|
| datos duros | `### Facts` | `### What the fire is doing while you talk` **+** `### The numbers you're cooking with` | `### The bike, and what fits` **+** `### The numbers you're carrying` |
| vocabulario | `### Words you need here` | `### Words for the fire` | `### Words for the road` |
| caja | `### Your toolkit` | `### What to take from the toolkit` | idem |
| exponentes | `### Say it here — …` | `### Out loud, in this patio — …` | `### Out loud, before the bike — …` |
| criterios | `### You did it if` | `### The lunch happened if` | `### You rode off right if` |

Y no es solo cosmética. Al partir los datos en dos tablas, el escenario 4 **rompe el techo de §11**:

| | filas de datos | §11: ≤ 10 |
|---|---|---|
| **4A** | 6 + 8 = **14** | **FALLA** |
| **4B** | 6 + 7 = **13** | **FALLA** |
| los otros catorce roles | 8 o 10 | ok |

Además, **el escenario 4 es el único cuya tabla de exponentes lleva columna `register`** (los otros
siete la resuelven en la línea de cabecera del rol), **el único con siete entradas de vocabulario
sin sostén**, **el único con «Five rules» en el cierre** y **uno de los dos que no dice
`use it or don't`** en la cabecera de exponentes. Seis desviaciones del molde en la misma ficha.

Es explicable —el 4 entró después, a sustituir al retirado, y cada pasada posterior lo arregló
contra sí mismo y no contra el molde— y por eso hay que arreglarlo ahora: cada pasada que venga lo
volverá a tratar como caso aparte.

**Dos cosas más del mismo tipo, en otras fichas:**

- **La instrucción de la carta del escenario 2 está en español**, y es la única de las ocho:
  «*Pantalla propia, detrás de un botón. No se imprime debajo del andamiaje. Se abre al terminar el
  turno global 5…*». Las otras siete la dan en inglés. §11 es explícito: la ficha entera va en el
  idioma que se estudia, y esa línea la lee el jugador. Además su nota de diseño («Si se lee antes
  de tiempo…») es **la única de las cuatro que existen que no está marcada como nota de diseño** —
  el 1 y el 3 la marcan entre paréntesis, el 5 la envuelve en un comentario HTML, el 2 no la marca.
- **`use it or don't` falta en el molde (0 apariciones) y en el escenario 4.** Los otros seis lo
  llevan en las dos cabeceras. §11 apoya en esa frase su propia regla de recuento de filas —«una
  pareja que resuelva en seis turnos usa un subconjunto de la tabla, que es exactamente lo que
  `use it or don't` autoriza»—, y la ficha que sirve de molde no la dice.

### ¿Los ocho cierres son de la misma forma? No: hay dos protocolos

| esc | forma de `## Both screens — how it ends` | palabras |
|---|---|---|
| 1 | lista compartida de 4 puntos | 124 |
| 2 | lista compartida de 4 puntos, con reparto dentro de cada punto | 188 |
| 3 | lista compartida de 5 puntos | 97 |
| **4** | **tres cada uno / seis en total + Together + Five rules** | 277 |
| 5 | lista compartida de 3 puntos | 136 |
| **6** | **tres cada uno / seis en total + Together + Four rules** | 271 |
| **7** | **tres cada uno / seis en total + Together + Four rules** | 314 |
| 8 | lista compartida de 3 puntos | 118 |

Solape literal de 6-gramas: máximo **15 %** (4↔6), 14 % (4↔7), 10 % (6↔7). **No es copia-pega** —el
texto está escrito para cada escenario—, pero **son dos protocolos distintos**, y el segundo cuesta
**2,2 veces más lectura** (287 palabras de media contra 133).

**Y el reparto no lo decide el escenario: lo decide el historial de arreglos.** Los tres que llevan
el protocolo nuevo son exactamente los tres que recibieron la pasada de carga del 22 de agosto
(`## Sexta pasada … carga` en el 4, `## Pasada de carga` en el 6 y el 7). Los cinco restantes se
quedaron con el protocolo viejo porque no estaban en aquel encargo. El estudiante que hace los ocho
aprende dos maneras de cerrar y no hay nada en la escena que le diga cuál le toca.

### ¿Los ocho reparten la carga igual? Siete sí; el molde no

Puerta 5: ningún rol por debajo del 40 % de las palabras, sobre parejas de perfil parejo.
Combinando `fase11-scripts/carga-unica.mjs` (vigente para 1, 2, 3, 5 y 8) con las resimulaciones
`fase13-simulacion-4/-6/-7` (que sustituyen a las de fase 11 para esos tres):

| esc | lado menor · sólido+sólido | lado menor · flojo+flojo | ¿pasa? |
|---|---|---|---|
| 1 | 48,7 % | 46,9 % | sí |
| 2 | 47,0 % | 47,8 % | sí |
| **3 · el molde** | **35,8 %** | 45,6 % | **NO** |
| 4 | 44,5 % | 42,7 % *(era 36,5)* | sí, arreglado |
| 5 | 46,5 % | 46,8 % | sí |
| 6 | 49 % *(pareja 1)* | — | sí, arreglado |
| 7 | 45 % | 47 % *(era 35,6)* | sí, arreglado |
| 8 | 43,8 % | 44,5 % | sí |

**El molde es hoy el único de los ocho que falla la puerta de carga**, y falla en la pareja
**sólido + sólido**, que es la que menos excusas admite. `fase12-carga.md` §4 lo diagnosticó el
mismo día, localizó la causa en un solo turno —el mensaje al grupo dictado entero por A, 70
palabras— y **dejó el arreglo escrito, exacto y sin aplicar** porque no estaba en el encargo. Su
propia frase: «mientras su cierre no reparta, los demás tenderán a volver a lo mismo».

### ¿El molde repetido? Cinco de ocho se resuelven ofreciendo una alternativa

| esc | cómo se sale | molde |
|---|---|---|
| 1 | se cambia qué entra en el trato, no el precio | ofrecer alternativa |
| 2 | otra sede y otra hora + algo para esta noche | ofrecer alternativa |
| 3 | se parte el turno en dos y se paga con una fecha | ofrecer alternativa |
| 4 | se cocina en dos tandas y se suelta el recipiente con condición | ofrecer alternativa |
| 5 | se cambia la hora de entrada a cambio de dos mañanas de formación | intercambio condicionado |
| 6 | se reparte la mesa por franjas y se busca una segunda cama | ofrecer alternativa |
| 7 | se aplaza la deuda con fecha y entra uno, no dos | intercambio condicionado |
| 8 | no hay salida: se abre un caso y se firma | sustituto de segundo orden |

**5 de 8 = 63 %.** Por debajo del 6 de 8 que el blueprint pone como señal de alarma, pero en el
filo, y con el agravante de que los cinco son los cinco primeros más el 6. **No propongo tocarlo
ahora** —cambiar la salida de un escenario es rediseñarlo, no corregirlo— pero queda medido para
que el noveno escenario que se escriba no sea el sexto «ofrecer alternativa».

### Otros repartos del conjunto, sanos

- Tipo de carta: mensaje/nota de voz 4, llamada 1, email 1, entrada en persona 1, pantalla de
  sistema 1. Dueño A 4 / dueño B 4. Disparador global entre 3 y 6 en las ocho.
- Carga de reloj: **20 a 30 segundos por turno**, rango de 10 s. El más apretado es el 2 (20 s), el
  más holgado el 3 y el 8 (30 s). Ningún escenario está fuera de escala.
- Prosa: **16/16 dentro del techo de 450**, media **444**, peor **450** (4B).
- Nombres: 25 distintos, **cero repetidos entre escenarios**, 11 H / 12 M / 2 N.

---

## LOS ARREGLOS, ordenados por gravedad, con su coste en palabras

El techo de prosa es 450 por rol y el peor está en 450 clavado. **El contador canónico solo mide
las secciones `## ROLE A` y `## ROLE B`, y dentro de ellas descarta las filas de tabla.** Por eso
casi todo lo que sigue cuesta cero: vive en tablas, en `## The card` o en `## Both screens`.

### GRAVE 1 · El molde tiene que repartir su cierre — esc 3

**Qué:** aplicar el arreglo ya escrito en `fase12-carga.md` §4. Repartir los cinco puntos que hoy
dicen los dos: **A** los puntos 1 y 3 (quién abre el sábado 12 y a qué hora · qué turno devuelve el
favor y qué día exacto), **B** los puntos 2 y 4 (cuánto se queda y quién entra después —es su límite
de las 8:00— y el nombre que va escrito en el mensaje, que es su única condición), **juntos** el 5.
Más las dos reglas de no repetir la línea del otro y de no asentir.

**Por qué primero:** es el único fallo de puerta que queda en el set, está en el archivo que sirve
de molde a los otros siete, y el arreglo está escrito y costeado desde hace un día.

**Coste:** `## Both screens — how it ends`, **0 palabras contra el techo de prosa** de 3A (378) y
3B (384). El bloque compartido pasa de 97 a ~135 palabras de lectura: **+38**. Si en vez de eso se
le pone el protocolo de «tres cada uno» del 4/6/7, cuesta **+190** — no hace falta y no lo
recomiendo.

**Efecto medido esperado:** quitar el mensaje dictado por A ya mueve el reparto de 64/36 a 60/40
(`fase11-simulacion-3` §D7); el reparto de los cinco puntos lo lleva a la banda 47-51 % en la que
quedaron el 4, el 6 y el 7.

### GRAVE 2 · Alinear el escenario 4 al molde — cuatro cosas, y ahorra palabras

**a) Rótulos.** `What the fire is doing while you talk` + `The numbers you're cooking with` → una
sola `### Facts`; `Words for the fire` → `Words you need here`; `What to take from the toolkit` →
`Your toolkit`; `Out loud, in this patio — …` → `Say it here — grouped by job, not in order · use
it or don't · **don't read it out loud**`; `The lunch happened if` / `You rode off right if` →
`You did it if`.

Contado rótulo por rótulo con el criterio del contador canónico:

| rótulo | hoy | al molde | Δ |
|---|---|---|---|
| `What the fire is doing while you talk` | 9 | `Facts` 2 | **−7** |
| `The numbers you're cooking with` | 6 | fusionada, desaparece | **−6** |
| `Words for the fire` / `for the road` | 5 | `Words you need here` 5 | 0 |
| `What to take from the toolkit` | 7 | `Your toolkit` 3 | **−4** |
| `Out loud, in this patio — …` | 18 | `Say it here — … use it or don't · …` 22 | **+4** |
| `The lunch happened if` | 5 | `You did it if` 5 | 0 |
| `The bike, and what fits` | 6 | `Facts` 2 | **−4** |
| `The numbers you're carrying` | 5 | fusionada, desaparece | **−5** |
| `You rode off right if` | 6 | `You did it if` 5 | **−1** |

**Coste: −13 palabras en 4A (448 → 435) y −10 en 4B (450 → 440), y el `use it or don't` del
MENOR 10 ya va dentro.** Alinear el escenario 4 al molde es la única propuesta de este informe que
**libera** presupuesto, y saca al peor rol del set del filo del techo.

**b) Datos: de 14 y 13 filas a ≤ 10.** Al fusionar las dos tablas quedan 14 y 13 filas; hay que
quitar 4 y 3. Candidatas por redundancia con la prosa: en 4A, `6:00 you up · nothing eaten yet`,
`after 1:00 low fire · two hours max`, `The fridge` y `That container` (los dos últimos dicen lo
mismo que la viñeta *«you have Saturday's rice and chicken in there»*); en 4B, `2:00 full sun on
that road`, `Sunday there` y `The small cooler`. **Coste: 0 palabras de prosa**, pero es una
decisión de contenido: hay que pasarle la lente de calcabilidad a las siete filas que salgan.

**c) La columna `register`.** O se quita de 4A/4B, o se añade a los otros catorce. Recomiendo
**quitarla**: los ocho escenarios ya declaran registro en la línea de cabecera del rol, y el
escenario 4 lo hace también (`Informal. No boss here.`), así que la columna es redundante y es la
única cosa que hace su tabla distinta de las quince restantes. **Coste: 0.**

**d) Las siete entradas de vocabulario sin sostén.** `leftovers`, `to go bad`, `to reheat`,
`to stir`, `to be starving`, `to hang out`, `to head out`. Sustituirlas por palabras que sí estén
en los datos duros o en la carta: `a serving`, `the gate`, `a round`, `a passenger`, `to fit`,
`shade`, `on foot`. **Coste: 0** (tabla). Nota: hay que rehacer la prueba de celda `here` en las
siete nuevas.

### GRAVE 3 · `the lease, last` — esc 6B

**Qué:** renombrar la fila 7 de la tabla de exponentes de 6B. Etiqueta por función, no por posición:
`the name on the lease`. Sigue ordenando en la posición 7 de 9 (después de `taking it back`, antes
de `the reason, if they ask`), así que no toca R2. Y revisar la tercera columna de esa fila, que
también lleva el orden dentro: «*your second thing as a closed plan — and the marker with the third
one already inside it*» → «*the second ask, as a closed plan with a date on it*».

**Coste: 0 palabras** (tabla). Es el único fallo literal de las tres reglas nuevas de §11 en las
133 filas del set.

### GRAVE 4 · Un escenario en el que quien manda se equivoque

**El problema:** en 0 de 8 el problema lo causa quien tiene el poder. Se corrige con **un solo
escenario**, y el más barato es el 2.

**El arreglo barato (0 palabras):** hoy `2B` dice *«The number in their file is your sister's. You
never gave them that number, so their messages never reach you»* — el error existe, pero es de
nadie. Basta con que **la ficha de A diga que ese número lo apuntó el mostrador**. Como 2A está en
449 y no cabe una línea de prosa, va en su tabla de datos duros, que tiene exactamente 10 filas:
sustituir una por `Their number in your file | taken here, by phone, in March`. **Coste: 0 palabras
de prosa; una fila de datos por otra.**

Con eso, el escenario 2 pasa de «culpa: nadie» a «culpa: quien manda», el recuento queda en
A 3 / B 2 / **quien manda 1** / nadie 1 / fuera 1, y la clínica tiene que reconocer un error suyo
mientras sigue sin poder dar cita: que es la lengua que hoy no se practica en ningún escenario del
set. **Hay que volver a correr las lentes de calcabilidad y de equidad sobre el escenario 2**: la
disculpa institucional es un acto nuevo en esa ficha.

**Lo que NO recomiendo:** meterlo en el 5 (la supervisora ya carga con no haber puesto dos lunes en
el acta, y añadirle culpa la desequilibra) ni en el 8 (Mauricio ya hereda la culpa de Wilmer, que es
de su empresa; ponérsela a él rompe el «el no es mío» del que vive el escenario).

### MEDIO 5 · El poder que no se negocia está feminizado — 5 de 7 (71 %)

**Qué:** cambiar de género **una** de las cinco. La más barata con diferencia es **Nayibe** en el
escenario 3: no está en escena, no tiene pantalla, aparece 7 veces y todas como sustitución 1:1 en
prosa y datos. Con un nombre masculino la columna queda **4 M / 3 H = 57 / 43 %**, dentro de banda.

**Coste: 0 palabras netas** (sustitución de nombre por nombre de longitud parecida).

**Y el escenario 3 hay que tocarlo de todos modos por el GRAVE 1**, así que las dos cosas van en la
misma pasada. Ojo con el aviso de §5: no hay que espejarlo. Cambiando **una sola** queda equilibrado;
cambiando dos o tres se cae al otro lado.

### MEDIO 6 · Un solo protocolo de cierre

**Qué:** decidir cuál de los dos es el protocolo del set y llevar los otros a él. **Recomiendo el
de lista repartida** (el que sale del GRAVE 1) y no el de «tres cada uno», por tres razones: cuesta
la mitad de lectura (133 palabras contra 287), lo llevan 5 de 8 hoy, y consigue lo mismo —repartir
la carga— en cuanto los puntos van asignados.

**Alcance:** una vez arreglado el 3, quedan **1 y 5** con cierre sin repartir. El 1 dice *«Say the
whole deal out loud, both of you»* con cuatro datos que dicen los dos; el 5, tres puntos iguales.
Los dos pasan hoy la puerta de carga (46-49 %), así que **no es urgente**, pero es lo que evita que
el set enseñe dos protocolos.

**Coste: 0 palabras contra el techo** (vive en `## Both screens`). ~+30 palabras de lectura por
escenario.

### MEDIO 7 · Los dos actos declarados en un solo asiento — esc 2 y esc 7

**Qué:** en el escenario 2, `dar-mala-noticia` y `recomendar` viven los dos en la tabla de A;
en el 7, `quejarse` y `rechazar` viven los dos en la de A. Quien juega B no produce ninguno.
Bastan **dos filas**, una por escenario:

- **2B**, hoy con 9 filas para 9 turnos: no cabe una décima sin subir la banda. Hay que **cambiar**
  una: `putting your money in` (`I have… with me, if that helps.`) es la que menos trabaja —el
  dinero ya sale en `checking cost and arrival time`—; sustituirla por una de `recomendar` hacia el
  mostrador, que el paciente tiene motivo para dar: el teléfono del archivo es el de su hermana.
  Etiqueta candidata **`how to reach you`**, que ordena entre `fixing the number` y `putting your
  time in` — **posición 5 de 9**, ni primera ni última, y no nombra ningún momento.
- **7B**, hoy con 9 filas para 9 turnos: la que sobra **no** es `keeping the friendship` (aunque
  duplique la etiqueta de A, es la única forma que B tiene para su propio criterio *«tomorrow you
  still travel together»*), sino **`owning your half`** (`It's my fault, but …`), que hace el mismo
  acto que `owning the lateness` (`I know it's last minute, but …`) dos filas más arriba: `7B` es
  el único rol del set con dos filas de `disculparse`. Sustituirla por una de `quejarse` — Kevin
  tiene motivo y hoy no tiene forma: *«you heard about the sixth from somebody else»*. Etiqueta
  candidata **`hearing it from someone else`**, que ordena entre `asking what changed` y
  `keeping the friendship` — **posición 3 de 9**.

**Coste: 0 palabras** (tablas, fila por fila, sin cambiar el recuento). **Cambia la cuota de actos
del set entero**, así que la MEDIDA 1 hay que recalcularla después.

### MEDIO 8 · El solape de vocabulario A↔B — esc 2 (80 %) y esc 6 (84 %)

**Qué:** sustituir **3 o 4 entradas por rol** en cada uno de los dos, para que cada pantalla tenga
al menos la mitad de su diccionario propia. En el 2, las del oficio se quedan en A (`referral note`,
`emergency check`, `to be fully booked`) y las del cuerpo y el plan en B (`chipped`, `a sharp edge`,
`what the plan covers`). En el 6, las del contrato en B (`lease`, `to sign`, `to drop`) y las de la
visita en A (`to put someone up`, `couch`, `mattress`).

**Coste: 0 palabras** (tabla). Es lo que le devuelve trabajo a los bloques 3 y 4 de la caja, que hoy
en esos dos escenarios no tienen qué reparar.

### MENOR 9 · La instrucción de la carta del escenario 2, al inglés

Traducir las tres líneas de `## The card` («Pantalla propia, detrás de un botón…») al inglés, como
las otras siete, y marcar la nota **«Si se lee antes de tiempo…»** como nota de diseño igual que la
del 1 y la del 3. **Coste: 0 palabras contra el techo** (`## The card` está fuera del recuento).

### MENOR 10 · `use it or don't` en el molde y en el escenario 4

Añadirlo a las cuatro cabeceras de exponentes que no lo llevan (3A, 3B, 4A, 4B). **Coste: +4
palabras por rol.** 3A pasa de 431 a **435** y 3B de 439 a **443**: caben. En 4A y 4B **el coste ya
está dentro del GRAVE 2a** (435 y 440 lo incluyen). **Hoy, sin el 2a, 4B no lo admite**:
450 + 4 = 454, catorce por encima del techo. El orden de ejecución no es opcional.

### MENOR 11 · Las cuatro etiquetas espejo del escenario 1

`asking about theirs`, `closing the question`, `money` y `moving the deal` son idénticas en 1A y
1B. Las dos primeras y `money` describen jobs realmente simétricos y pueden quedarse; **`moving the
deal` no**: en A es «tu única bajada de precio» y en B es «pedir más dentro del trato». Renombrar
la de B a `asking for more in the deal` (ordena en posición 2 de 8, después de `asking about
theirs`). **Coste: 0.**

### MENOR 12 · El script de actos, actualizado

`fase11-scripts/actos-cuota.mjs` mide 135 sobre 133. Ya está escrito el sustituto,
`fase13-scripts/actos-conjunto.mjs`, que se para si el mapa no cuadra con el disco. **Recomiendo
retirar el viejo o dejarlo apuntando al nuevo**: mientras exista, alguien lo va a correr.

---

## Orden de ejecución, y por qué importa

1. **GRAVE 2a** (rótulos del escenario 4) — es lo único que libera presupuesto, y sin él el
   MENOR 10 no cabe en 4B.
2. **GRAVE 2b, 2c, 2d** — el resto del escenario 4, todo en tablas.
3. **GRAVE 1 + MEDIO 5** — el escenario 3, en una sola pasada: el cierre reparte y Nayibe cambia
   de género.
4. **GRAVE 3** — `the lease, last` en 6B.
5. **GRAVE 4** — la fila de datos del escenario 2.
6. **MENOR 9** — la carta del escenario 2, en la misma pasada que el punto 5.
7. **MEDIO 7, MEDIO 8, MENOR 11, MENOR 10, MEDIO 6** — el resto.

---

## Qué hay que volver a medir cuando esto se aplique

Corregir un escenario cambia el reparto del set entero. En concreto:

| arreglo | qué invalida |
|---|---|
| GRAVE 1 (cierre del 3) | la puerta 5 del set: hay que **rejugar la simulación del escenario 3** con pareja sólido+sólido. Las cifras de `fase11-simulacion-3` caducan |
| GRAVE 2b (7 filas de datos fuera) y 2d (7 palabras nuevas) | calcabilidad y nivel del escenario 4 |
| GRAVE 4 (la clínica se equivoca) | equidad y calcabilidad del escenario 2, y la MEDIDA 2 (culpa) |
| MEDIO 5 (Nayibe) | la MEDIDA 3 entera |
| MEDIO 7 (dos filas nuevas) | **la MEDIDA 1 entera** — la cuota se calcula sobre 133 filas y esas dos cambian de acto |
| MEDIO 8 (6-8 entradas de vocabulario) | la MEDIDA 4, y la prueba de celda `here` en las nuevas |
| cualquiera que toque prosa | `node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs` |

**Y esta auditoría se repite completa.** Con los seis scripts de `fase13-scripts/`, que leen el
disco y no se creen ninguna cifra declarada.

---

## Scripts de esta auditoría

| script | qué mide |
|---|---|
| `fase13-scripts/actos-conjunto.mjs` | cuota de actos sobre 133 turnos · valida el mapa contra el disco antes de contar |
| `fase13-scripts/reparto-conjunto.mjs` | poder, arranque, desenlace, culpa, escenografía, relación, dueño de la carta |
| `fase13-scripts/genero-13.mjs` | las cuatro columnas de §5 más «quién manda la carta» |
| `fase13-scripts/vocab-13.mjs` | solape A↔B, exclusividad, entradas sin sostén, campos semánticos |
| `fase13-scripts/tablas-16.mjs` | R1, R2, R3 de §11 más el alfabético y las etiquetas repetidas |
| `fase13-scripts/motor-conjunto.mjs` | piezas del molde, nombres, cartas, horas, cifras, carga, molde de salida |
| `fase13-scripts/cierres-conjunto.mjs` | solape literal de 6-gramas entre los ocho cierres y las ocho reflexiones |
