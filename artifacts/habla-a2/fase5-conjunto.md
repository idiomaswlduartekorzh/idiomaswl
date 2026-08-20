# Habla acompañada — inglés A2 · Fase 5: auditoría de conjunto

Los ocho escenarios corregidos, mirados a la vez. Umbrales: `docs/habla-acompanado-blueprint.md`
§5. Fuentes medidas: `fase4-escenarios-1-3.md`, `fase4-escenarios-4-6.md`,
`fase4-escenarios-7-8.md`, `fase4-fichas-1-3.md`, `fase4-fichas-4-6.md`, `fase4-fichas-7-8.md`.
Contraste: `fase0-plan.md` (que cuadraba los repartos **sobre el papel**, antes de que se
escribiera nada).

Medido con script, no a ojo. Los cuatro están en `artifacts/habla-a2/fase5-scripts/` y se
vuelven a correr con `node <archivo>`:

| script | qué cuenta |
|---|---|
| `conjunto.mjs` | los seis repartos, el molde del motor, el género del poder, las colisiones de nombre |
| `exp.mjs` | los 160 exponentes de las 16 fichas, y las formas repetidas entre bloques |
| `glosa.mjs` | glosas repetidas literalmente y reparto de registro |
| `caja.mjs` | caja de herramientas contra exponentes propios (puerta 4 nueva, §10) |

Los porcentajes de abajo son su salida literal. `conjunto.mjs` lleva los ocho escenarios
transcritos a mano desde los seis archivos de fase 4: si se corrige un escenario, se corrige su
fila y se vuelve a correr.

---

## Veredicto

**Los seis repartos de §5 pasan.** Ninguno falla, y ninguno pasa por casualidad: cinco de los
seis dan el mismo número que fase 0 previó. La puerta 12 queda **superada**.

**Y aun así el set tiene tres defectos de conjunto que ningún umbral de §5 mide hoy**, los tres
del tipo que solo se ve desde arriba:

1. el acto que el texto exige de verdad no es el que declara el campo `speechActs`;
2. la corrección de género se aplicó en **direcciones opuestas** en dos bloques, y el resultado
   es el sesgo simétrico del que se partía;
3. tres correcciones de bloque no se propagaron al resto del set, y dos renombres simultáneos
   crearon dos colisiones de nombre nuevas —el mismo defecto C6 que venían a arreglar—.

Nada de esto bloquea la publicación por §5 tal como está escrito hoy. Lo que sí exige es que el
guardián **decida a la vista** las tres cosas del final, en vez de heredarlas.

---

## 1 · La tabla de los seis repartos

| Reparto | Umbral §5 | Medido sobre lo escrito | Veredicto |
|---|---|---|---|
| **Actos de habla** (campo `speechActs`) | ninguno > 40 % | máximo **37,5 %** (`rechazar` 3/8 y `conceder-con-condicion` 3/8) | **cumple** |
| **Poder** (estudiante manda) | ≥ 3 de 8 | **3 de 8 · 37,5 %** (esc. 1, 2, 7) | **cumple, sin margen** |
| **Quién arranca** | 40–60 % cada rol | **A 50,0 %** (3,4,6,8) · **B 50,0 %** (1,2,5,7) | **cumple** |
| **Desenlace** | ≥1 sin-acuerdo y ≥1 parcial | sin-acuerdo **1** (esc. 8) · parcial **3** (3,4,6) · acuerdo **3** · aplazado **1** | **cumple** |
| **Culpa del estudiante** | ≤ 50 % | **3 de 8 · 37,5 %** (esc. 3, 5, 6) | **cumple** |
| **Escenografía en aula** | ≤ 2 de 8 | **0 de 8 · 0,0 %** | **cumple** |

### Desglose de actos declarados

| acto | escenarios | nº | % |
|---|---|---|---|
| `rechazar` | 1, 7, 8 | 3 | 37,5 % |
| `conceder-con-condicion` | 1, 3, 5 | 3 | 37,5 % |
| `dar-mala-noticia` | 2, 6 | 2 | 25,0 % |
| `pedir-favor` | 3, 8 | 2 | 25,0 % |
| `quejarse` | 4, 7 | 2 | 25,0 % |
| `proponer-alternativa` | 6, 8 | 2 | 25,0 % |
| `recomendar` | 2 | 1 | 12,5 % |
| `pedir-aclaracion` | 4 | 1 | 12,5 % |
| `disculparse` | 5 | 1 | 12,5 % |

Nueve de los doce actos del catálogo; los tres que faltan son los tres de B1. Idéntico a
fase 0: ningún cambio de fase 4 movió una columna de esta tabla, como los tres redactores
afirmaban y aquí queda comprobado.

### Dos cosas que la tabla no dice y hay que decir

**El poder pasa por un escenario, y es el más discutible.** `a>b` son el 1, el 2 y el 7. El
nº 1, reescrito en fase 4, es hoy **dos topes duros simétricos** ($390.000 / $350.000), con un
bloque explícito de «lo que le cuesta a cada uno irse sin trato» que **cuesta lo mismo a los
dos** y sin fecha que apriete a ninguno. Leído sin la etiqueta, es `igual`. Si el guardián lo
reetiqueta —y hay motivo—, el reparto de poder cae a **2 de 8** y **falla**. Esto no es una
objeción al escenario, que es bueno: es un aviso de que el umbral se sostiene sobre la etiqueta
menos firme del set.

**La culpa del nº 4 ya no es limpia.** El motor nuevo hace que el sobrino explique **$12.000 de
los $42.000** (28,6 %). El documento lo declara y mantiene «la culpa no es de A». Es defendible.
En el peor reparto (contando el 4 como media culpa) el indicador sube a **43,8 %**, y sigue
dentro de umbral.

---

## 2 · El molde del motor — lo que se pidió y lo que quedó

Encargo: cuatro escenarios (1, 4, 5 y en parte el 7) debían perder «fecha límite inamovible +
tercero ausente que decide». En la primera ronda corrían sobre ese motor **6 de 6**.

| rasgo | escenarios | nº | % |
|---|---|---|---|
| **Reloj duro** (algo se cierra hoy o mañana y no se puede mover) | 2, 3, 6, 7, 8 | 5 | **62,5 %** |
| **Tercero ausente que decide o veta una salida** | 2, 3, 6, 7, 8 | 5 | **62,5 %** |
| **El motor completo (reloj Y tercero)** | 2, 3, 6, 7, 8 | 5 | **62,5 %** |
| Libres de los dos | 1, 4, 5 | 3 | 37,5 % |
| Sin **ninguna** hora del día que cierre una salida | 4, 5 | 2 | 25,0 % |

Los dos rasgos aparecen **en el mismo conjunto exacto de escenarios**: donde hay reloj hay
tercero ausente, y al revés, en los cinco casos. No son dos variables: son una.

**Lo cumplido:** el 1, el 4 y el 5 perdieron los dos rasgos, tal como se pidió, y está
verificado sobre el texto (el 4 pierde el vencimiento y al jefe regional; el 5 pierde la lista
del mediodía y al dueño de los audios; el 1 no tiene ni mudanza ni segundo comprador).

**Lo no cumplido:** el **nº 7 conserva el motor entero y reforzado**. Su reloj es el más duro
del set (salida mañana a las 8:00, Sebastián a las 10:00 p. m., doña Nubia y el mecánico a las
7:00 a. m.) y su `aplazado` **depende por completo** de un tercero ausente que decide: «el
administrador es el que autoriza persona extra». No es un descuido: es la pieza que produce el
desenlace. Pero el encargo decía «en parte el 7» y el 7 no perdió nada.

### Y lo que se pidió mirar: ¿se parecen entre sí los que lo perdieron?

**Sí, dos de los tres.** El nº 1 y el nº 4 comparten un molde nuevo, y comparten hasta la frase:

| | nº 1 | nº 4 |
|---|---|---|
| tope duro del que pide | $350.000 de contado | — |
| tope duro del que da | $390.000 con los cambios | $25.000 de mostrador |
| hueco | **$40.000** | **$17.000** ($42.000 pedidos) |
| cómo se cierra | «un hueco que **no se puede cerrar con dinero**» | «el choque de verdad **no es la cifra**» |
| qué se negocia en su lugar | qué entra o sale del trato (piezas, candado, luces, transporte) | qué **forma** toma la compensación (nota crédito, gigas, plan) |

Es un molde cambiado por otro molde: **tope numérico + hueco que se cierra cambiando la forma de
lo que entra en el trato**. El nº 5 sí es distinto (no hay cifra en disputa: hay dos
diagnósticos del mismo problema, y es el mejor hallazgo de motor de todo el bloque 4-6).

### El molde que nadie midió: por dónde entra la carta

| canal de la complicación | escenarios | nº | % |
|---|---|---|---|
| **Mensaje o nota de voz de alguien que no está** | 1, 2, 3, 4, 6, 7, 8 | 7 | **87,5 %** |
| En persona, por la puerta | 5 | 1 | 12,5 % |

`fase3-tension-1-6.md` levantó esto («seis de seis cartas por el móvil de un ausente») y se
corrigió **en un solo escenario**. En el set final siguen siendo siete de ocho: el cuñado, la
doctora, el correo del centro de exámenes, la hermana, la mamá, doña Nubia y Édison. El nº 5
—Alba tocando la puerta— es el único que sabe qué se siente cuando la mala noticia tiene cuerpo.

Lo que **sí** está bien repartido, y conviene que conste: la carta va a **A en 4 escenarios**
(2, 3, 4, 7) y a **B en 4** (1, 5, 6, 8), y su turno global es 3, 4, 5, 5, 5, 5, 6, 6 —los ocho
dentro de la horquilla 3-6 de la puerta 6—.

---

## 3 · El género del poder — recuento sobre el set final

16 roles en escena. **9 llevan nombre propio** (uno de ellos, Dani, deliberadamente neutro);
**7 son etiquetas sin género** («Quien vende la bicicleta», «Quien está en recepción», «Quien
reclama la factura»…), todas en los escenarios 1, 2, 3 y 4A.

| medida | resultado |
|---|---|
| Roles en escena con nombre de género marcado | 8 → **6 mujeres (75 %)** · **2 hombres (25 %)** |
| **Quien manda cara a cara y tiene nombre** | Yolima (4) · doña Amparo (5) · Valentina (7) · Milena (8) → **4 de 4 mujeres · 100 %** |
| **Quien decide fuera de escena** | Restrepo, la administradora (2) · Nayibe, Katherine (3) · Óscar (6) · doña Nubia, el administrador (7) · Édison (8) → **5 mujeres (63 %) · 3 hombres** |
| **Escenarios con ganador claro** | 3 → esc. 4 gana Yolima (f) · esc. 7 gana Valentina (f), pierde Kevin (h) · esc. 8 gana Milena (f), pierde Tatiana (f) → **3 de 3 gana una mujer con poder institucional** |
| **Quien causa el problema, entre los nombrados en escena** | Julián (5, h) · Dani (6, neutro) · Kevin (7, h) → **2 de 2 hombres nombrados son la causa · 0 de 6 mujeres** |

### Qué pasó, exactamente

El defecto original —«quien decide de verdad está fuera de escena y es mujer; con quien se
negocia cara a cara es hombre; de cinco mujeres nombradas solo hablaba la que pierde»— se
atacó **en dos bloques a la vez y en direcciones contrarias**:

- **Bloque 1-3** convirtió a un decisor ausente **hombre** en una decisora ausente **mujer**
  (Wilson → Nayibe, «equidad C2: todo el que decide era hombre»), y dio voz a la doctora
  Restrepo, que **también decide en ausencia**. Es decir: **añadió** mujeres a la autoridad que
  no está en escena.
- **Bloque 7-8** hizo lo contrario y lo escribió como regla (R2): sacó a las mujeres de la
  autoridad ausente (doña Nubia pasa a contestar, quien autoriza pasa a ser Édison) y las puso
  en escena con el poder (Valentina, Milena).

Resultado del set completo: el sesgo no se corrigió, **se hizo simétrico**. Hoy las mujeres son
mayoría entre quien decide en ausencia (5 de 8) **y** son el 100 % de quien manda cara a cara
(4 de 4) **y** el 75 % de los roles nombrados en escena. Y los dos únicos hombres que aparecen
en escena con nombre son, los dos, el que causó el problema de su escenario.

Un estudiante que juegue los ocho no ve nunca a un hombre sosteniendo una política desde el
otro lado de un mostrador, ni a una mujer teniendo que disculparse por algo que hizo mal.

Lo que **sí** quedó arreglado, y hay que decirlo: **de las seis mujeres nombradas en escena,
las seis hablan**, y solo una pierde (Tatiana, esc. 8) frente a otra mujer. El defecto «de
cinco mujeres nombradas solo hablaba la que pierde» está muerto.

---

## 4 · El dinero — comprobado con búsqueda literal

Búsqueda sobre los seis archivos de fase 4, insensible a mayúsculas:

```
día de pago · payday · get paid · hasta que me paguen · cuando me paguen · quincena
no me alcanza · no tengo plata · no tengo dinero · sin plata · liquidez · hasta el 15
próximo pago · mi sueldo · salario · can't afford · I don't have the money · no puedo pagar
```

**Resultado: 0 apariciones dentro de un escenario o de una ficha.** Los 13 aciertos son todos
**meta-texto** —líneas de las tablas «qué cambié y quién lo pidió» y de las notas de equidad,
que dicen que se quitó—. Repartidos así:

| archivo | aciertos | qué son |
|---|---|---|
| `fase4-escenarios-1-3.md` | 4 | tabla de cambios (esc. 1, 2 y 3) + nota «fuera también el día de pago» |
| `fase4-escenarios-4-6.md` | 4 | decisión de conjunto nº 2, tabla de puertas, cambio nº 8 |
| `fase4-escenarios-7-8.md` | 4 | notas de equidad del 7 + cambio nº 7 |
| `fase4-fichas-1-3/4-6/7-8.md` | **0** | — |

Segunda pasada sobre las fichas buscando la versión encubierta («solo tienes», «es todo lo que
tienes», «no te queda», «no puedes gastar»): **5 aciertos, ninguno de liquidez**. Cuatro son
huecos pendientes del cierre («qué parte queda pendiente») y límites horarios («no te quedas
después de las 8:00 p. m.»). El único monetario es el tope de la ficha 1B —*«No puedes pagar
más de $350.000 de contado por la bicicleta sola. Es tu tope y es un número»*—, que es
exactamente lo que se pidió: **un presupuesto, no el estado de una cuenta**.

**Se quitó de todos. Confirmado.** Es la corrección mejor ejecutada del set: la hicieron tres
redactores por separado y ninguno dejó residuo.

---

## 5 · Lo que veo yo y no se ve escenario a escenario

### 5.1 · El acto declarado no es el acto que se entrena (**el hallazgo grave**)

El campo `speechActs` pasa el umbral con holgura (máx. 37,5 %). Los **turnos escritos y los
criterios de cierre** cuentan otra cosa:

| acto que el texto exige de verdad | escenarios | nº | % | umbral ≤40 % |
|---|---|---|---|---|
| **`rechazar`** (decir que no con una razón concreta) | 1,2,3,4,5,6,7,8 | 8 | **100,0 %** | **FALLA** |
| **`proponer-alternativa`** | 1,2,3,4,5,6,7,8 | 8 | **100,0 %** | **FALLA** |
| `pedir-aclaracion` | 1,2,4,5,6,7,8 | 7 | 87,5 % | FALLA |
| `conceder-con-condicion` | 1,3,4,5,6,7 | 6 | 75,0 % | FALLA |
| `dar-mala-noticia` | 2,3,6 | 3 | 37,5 % | ok |
| `disculparse` | 2,4,5 | 3 | 37,5 % | ok |
| `quejarse` | 4,7,8 | 3 | 37,5 % | ok |
| `recomendar` | 2,8 | 2 | 25,0 % | ok |
| `pedir-favor` | 3,8 | 2 | 25,0 % | ok |

Los ocho escenarios tienen, en su tercer turno como muy tarde, a alguien diciendo que no con una
razón. En los ocho hay que poner otra cosa encima de la mesa. **No es un fallo de los
redactores: es el blueprint el que lo produce.** §3.1 exige que el otro tenga «una razón
concreta para negarse», y §3.6 exige «dos salidas aceptables como mínimo». Cumplir las dos
puertas obliga a rechazar y a proponer en el 100 % de los escenarios.

La consecuencia es real y es la de [[pedagogy-defectos-de-conjunto]]: un estudiante que juegue
los ocho sale entrenado en «no, porque…» y «¿y si…?» y no ve nunca una conversación en la que
nadie se niega. **Lo que no vale es que el umbral lo dé por bueno porque la etiqueta dice otra
cosa.** El campo `speechActs` mide lo que el diseñador quiso destacar, no lo que la pareja va a
producir, y §5 se apoya en él.

### 5.2 · Los ocho terminan igual

| forma del cierre | escenarios | nº | % |
|---|---|---|---|
| Recitar en voz alta una lista de N datos y comprobar que coinciden | **los ocho** | 8 | **100,0 %** |
| …y además un gesto físico que cierra la escena | 3 (dictar el mensaje), 7 (dictar y confirmar), 8 (firmar y repetir el número) | 3 | 37,5 % |

La simulación de fase 3 midió el problema y lo escribió: *«tres de cinco parejas preguntaron
“¿ya está?” al acabar el 7, y cero de cinco en el 8, que sí tenía un gesto. Una lista de tres
puntos agotada no se siente como un final.»* El arreglo se aplicó **en el bloque donde se
midió** y no se propagó: el 1, el 2, el 4, el 5 y el 6 —cinco de ocho— siguen terminando en una
lista agotada. El nº 5 es el caso más doloroso, porque el gesto ya está escrito en el escenario
(una hoja de compromiso encima del escritorio, en blanco, esperando una firma) y el cierre no lo
usa.

### 5.3 · Tres correcciones que no cruzaron el bloque

Nadie lo podía ver: cada auditoría de fase 3 miró 1-6 o 7-8, nunca los ocho.

| corrección | dónde se aplicó | dónde sobrevive el defecto |
|---|---|---|
| «`The thing is…` desaparece de las fichas» (naturalidad C5) | fichas 1-3 y 4-6, con la frase escrita en la cabecera de las dos | **fichas 7-8, dos veces**: andamiaje de Kevin (7B) y de Tatiana (8A) |
| «Ninguna glosa se repite» (naturalidad C5) | dentro de cada bloque | entre bloques: *«volver a decirlo con otras palabras cuando ves que no te entendieron»* aparece **literal en 4A, 5A y 6A/6B** |
| Gesto físico de cierre (simulación 7-8) | escenarios 7, 8 y 3 | 1, 2, 4, 5, 6 |

Y una inconsistencia de pantalla que el estudiante sí nota, porque es la primera línea que lee:

| bloque | qué dice el recuadro del jugador |
|---|---|
| fichas 1-3 | «Te tocan unos **6 turnos** y el juego dura unos **6 minutos**» |
| fichas 4-6 | «Te tocan unos 7 turnos» — **sin minutos** |
| fichas 7-8 | «Empiezas tú.» / «Empieza Kevin.» — **sin turnos y sin minutos** |

Los tres escenarios más largos en minutos (4, 5 y 6: siete, siete y ocho) son justo los que no
le dicen al jugador cuánto dura, y los dos más largos en turnos (7 y 8: 14 y 16 turnos globales)
no le dicen ni turnos ni minutos. La información se da con más precisión donde menos hace falta.
Se arregla unificando la línea de las fichas 1-3 —«Te tocan unos N turnos y el juego dura unos N
minutos»— en las dieciséis.

### 5.4 · Dos colisiones de nombre nuevas, creadas por dos arreglos simultáneos

Es literalmente el defecto C6 que fase 3 encontró (dos Wilson, dos Yeison) reaparecido por la
puerta de atrás, porque cada bloque comprobó sus nombres contra **la fase 1** del otro bloque y
el otro bloque estaba cambiando los suyos al mismo tiempo.

| nombre | esc. A | esc. B |
|---|---|---|
| **Óscar** | nº 6 — el vecino del 402 que se va a Barranquilla del 24 al 30 | nº 7 — el **hermano de Valentina**, sexto del viaje, pone el otro carro |
| **Duván** | nº 3 — compañero del café, incapacitado hasta el 20 | nº 8 — el **vendedor despedido** que prometió de palabra la cancelación |

El Óscar del nº 6 nació precisamente de la corrección «Sebastián → **Óscar**» *(escenarios 4-6,
cambio nº 10, «comprobación propia contra `fase1-escenarios-7-8.md`»)*, y al mismo tiempo
escenarios 7-8 metía a **Óscar** en el nº 7 *(cambio nº 9, «la hermana que se podía sacar
desaparece: entra Óscar»)*. Dos agentes arreglando la misma colisión en sentidos opuestos.

### 5.5 · El aula es cero, pero el mostrador es tres

§5 pone techo al aula porque es «el sitio donde ya está». La misma lógica, medida:

| escenografía | escenarios | nº | % |
|---|---|---|---|
| **Aula** | — | 0 | **0,0 %** — cumple con margen |
| **Mostrador con política que bloquea** | 2 (recepción clínica), 4 (tienda de la operadora), 8 (recepción del gimnasio) | 3 | **37,5 %** |
| Puesto de trabajo de al menos uno de los dos | 2, 3, 4, 5, 8 | 5 | 62,5 % |
| Casa | 6 | 1 | 12,5 % |
| Calle / parqueadero / portería | 1, 7 | 2 | 25,0 % |
| **Mismo barrio (Cabecera)** | 1, 2, 3, 6, 8 | 5 | **62,5 %** |

Los tres mostradores comparten hasta la apertura: el andamiaje de 2A, 4B y 8B abre con
`Good morning/afternoon/evening. How can I help you?` y el de 2B, 4A y 8A con
`Good … Can you help me / I have a problem with this bill`. Tres veces el mismo par de frases.
Fase 0 descartó «quejarse por un plato en un restaurante» razonando que «la queja de consumo ya
vive en el nº 4» — pero también vive en el 2 y en el 8.

### 5.6 · Lo que nunca está en disputa

En los ocho escenarios el objeto del desacuerdo es **un recurso escaso y contable**: pesos (1,
4, 7, 8), horas de un turno (3, 5), un hueco de agenda (2), un sofá y una mesa (6). **Cero de
ocho** discuten cómo hacer algo, qué pasó, o una preferencia sin recurso detrás. El A2 que sale
de aquí sabe repartir lo que no alcanza y no ha tenido que ponerse de acuerdo en un plan con
alguien que quiere lo mismo que él. El nº 5 es el que más se acerca («los dos quieren lo mismo
—las llaves en manos de Julián— y no se ponen de acuerdo en qué hay que cambiar»), y aun así B
tiene que rechazar la propuesta de A en el tercer turno.

### 5.7 · La puerta 4 nueva, medida sobre el set entero

El blueprint cambió mientras se escribía esta auditoría: la **puerta 4** ya no pide «6 a 10
exponentes por rol», pide **dos piezas separadas** —una caja de herramientas del nivel, común a
los ocho escenarios, y **6 a 10 exponentes propios de este rol en este escenario**— y el §10
nuevo explica por qué: en la primera versión, seis de cada diez filas eran la misma función en
los doce roles y quedaban 4,6 filas propias. Como es un defecto **de conjunto** («se cumplía
fila a fila y se rompía en el conjunto de la tabla»), lo mido aquí.

Clasificando las **160 filas de andamiaje** de las 16 fichas de fase 4 contra las siete
funciones que §10 asigna a la caja:

| | nº | % de las 160 |
|---|---|---|
| **Filas que son caja de herramientas del nivel** | **68** | **42,5 %** |
| — cerrar / despedirse / agradecer | 18 | 11,3 % |
| — abrir / saludar / avisar de que viene algo | 15 | 9,4 % |
| — decir por qué algo importa | 15 | 9,4 % |
| — reformular lo propio | 8 | 5,0 % |
| — pedir que te repitan | 6 | 3,8 % |
| — callar sin mentir | 6 | 3,8 % |
| **Filas propias del escenario** | **92** | **57,5 %** → **5,8 de media por rol** |

Fase 4 mejoró lo medido en §10 (de 60 % a 42,5 % de caja; de 4,6 a 5,8 filas propias) porque las
auditorías de naturalidad pidieron justo esas funciones. Pero **con la puerta 4 nueva, 7 de las
16 fichas quedan por debajo del suelo de 6 exponentes propios** una vez separada la caja:

```
exponentes propios por ficha: 3, 3, 4, 5, 5, 5, 5, 6, 6, 7, 7, 7, 7, 7, 7, 8
```

No es mi puerta —la 4 es de `habla-fichas-de-rol` y `habla-calibrador-nivel`— y **no bloquea la
12**. Lo dejo medido porque la separación de la caja es trabajo de set, no de escenario: si cada
redactor la hace por su lado, el saludo del mostrador se escribirá tres veces distinto y
volveremos al §5.3 de este informe.

### 5.8 · Dos apuntes menores, medidos

- **Zona de acuerdo:** 7 de 8 tienen **exactamente tres salidas** (87,5 %); solo el nº 8 tiene
  dos, y por una decisión escrita. Tres salidas está bien; que sean siempre tres, y que la
  tercera sea siempre la que depende de un tercero al que hay que llamar (esc. 3 Katherine, 5
  Alba, 6 Óscar, 7 la salida de no llevar a nadie), es un patrón.
- **Andamiaje:** 160 exponentes en 16 fichas = **10 por rol**, el techo exacto de la puerta 4
  en las dieciséis. Reparto de registro: **neutro 43,1 % · informal 39,4 % · formal 17,5 %**. El
  formal está concentrado en los tres mostradores; si alguno de ellos se cambia, hay que
  revisar que no baje más.
- **Niños:** hay dos en el set (Brayan, 12, esc. 4; Matías, esc. 5) y **los dos son la razón por
  la que un adulto está en problemas**. Dos de dos.

---

## 6 · Qué cambiar por qué — con la aritmética hecha

No arreglo nada aquí. Digo qué se cambia por qué, y compruebo que el cambio no tumba ninguno de
los seis repartos que hoy pasan.

### 6.1 · Un cambio de escenario: **fuera el nº 2, entra un `a>b` sin mostrador y sin reloj**

El **nº 2 (`no-appointment-until-thursday`)** es el candidato, y no porque sea malo —el conflicto
devuelto en fase 4 es sólido—, sino porque es el escenario que acumula más redundancia del set:

- es el **tercero** de los tres mostradores (con el 4 y el 8), y el más ligero de los tres;
- conserva el **motor completo** (reloj duro: jueves 7:00, la doctora sale a las 6:30, confirmar
  antes de las 5:30 · tercero ausente que decide: la doctora Restrepo);
- es el escenario donde **las dos autoridades son mujeres fuera de escena** (Restrepo y la
  administradora), que es la mitad del sesgo del punto 3;
- su carta es una más de las siete que llegan por el móvil de un ausente;
- transcurre en Cabecera, como otros cuatro.

**Qué tiene que traer el que entre**, para que los seis repartos sigan pasando:

| condición | por qué |
|---|---|
| `power: a>b` | el 2 es uno de los tres `a>b`; sin reemplazo el reparto de poder cae a 2/8 y **falla** |
| `initiator: b` | mantiene el 50/50 de quién arranca |
| `outcome: acuerdo` | mantiene 3 acuerdos / 3 parciales / 1 sin / 1 aplazado |
| culpa **no** del estudiante | mantiene la culpa en 3/8 (37,5 %) |
| `dar-mala-noticia` **fuera** de sus actos, o dentro | da igual: con o sin él, ningún acto pasa del 37,5 % |
| **ni mostrador, ni reloj, ni tercero que decida, ni Cabecera** | es todo el motivo del cambio |
| **un hombre con nombre sosteniendo el poder cara a cara** | rompe el 4 de 4 del punto 3 |

**Candidato concreto, y está en el banquillo de fase 0:** *«reclamar al vecino por una gotera»*,
que fase 0 apartó como «primer candidato si el set crece a 10» y descartó solo porque entraba
como `igual`. **Reasentado como `a>b` sí encaja**: A es quien vive arriba y tiene la llave del
lavadero —nada le obliga a abrir la puerta ni a pagar nada—, B es el vecino de abajo que sube
con la mancha en el techo y arranca la conversación. Sin mostrador (un rellano), sin fecha que
venza (la mancha lleva ahí semanas), sin nadie fuera de escena que decida —la administración del
edificio existe y explícitamente **no** resuelve esto—, y con un hombre nombrado sosteniendo el
«no» de frente. Desenlace `acuerdo`: se turnan el plomero y el reparto del costo.

Efecto medido del cambio sobre el conjunto:

| reparto / rasgo | hoy | después |
|---|---|---|
| Actos declarados (máximo) | 37,5 % | 37,5 % — sin cambio |
| Poder `a>b` | 3/8 | 3/8 |
| Arranca A / B | 50/50 | 50/50 |
| Desenlaces | 3·3·1·1 | 3·3·1·1 |
| Culpa del estudiante | 3/8 (37,5 %) | 3/8 (37,5 %) |
| Aula | 0/8 | 0/8 |
| **Motor completo (reloj + tercero)** | **5/8 (62,5 %)** | **4/8 (50,0 %)** |
| **Mostrador** | **3/8 (37,5 %)** | **2/8 (25,0 %)** |
| **Cabecera** | **5/8 (62,5 %)** | **4/8 (50,0 %)** |
| **Mujeres decidiendo fuera de escena** | **5 de 8 (63 %)** | **3 de 6 (50 %)** |
| **Hombres con poder en escena** | **0 de 4** | **1 de 5 (20 %)** |

### 6.2 · Dos renombres, coste cero, sin tocar ningún motor

| cambio | qué arregla | qué no toca |
|---|---|---|
| **Yolima (4B) pasa a ser un hombre** | «quien manda cara a cara» baja de 4/4 mujeres a 3/5 (60 %) | nada del motor del 4 depende de su género: el tope de $25.000, la encuesta y la prueba en pantalla son iguales |
| **Julián (5A) pasa a ser una mujer** | rompe el «2 de 2 hombres nombrados son la causa» y estrena la primera mujer que tiene que disculparse por algo que hizo mal | el jardín, la obra, el bus y el curso de los sábados son idénticos |

Con los dos, más el 6.1, el recuento queda: mujeres nombradas en escena 5, hombres 4; poder cara
a cara 3 mujeres / 2 hombres; causantes del problema 1 hombre / 1 mujer / 1 neutro. Eso es
repartido; lo de hoy no lo es.

### 6.3 · Dos renombres obligatorios (colisión)

- **Óscar del nº 6** (el del 402) → otro nombre. Es una mención de tres líneas; el Óscar del
  nº 7 lleva un carro, cuatro puestos y media carta.
- **Duván del nº 3** (compañero incapacitado) → otro nombre. Es una mención de una línea; el
  Duván del nº 8 tiene subtrama y derecho a réplica.

No son opcionales: es el defecto C6, ya diagnosticado y ya reincidente.

### 6.4 · Cinco cierres con gesto

Dar gesto físico de cierre al **1, 2, 4, 5 y 6**, como ya lo tienen el 3, el 7 y el 8. Cuatro de
los cinco lo tienen escrito en el motor y sin usar:

| esc. | gesto que ya existe en el escenario |
|---|---|
| 1 | el dinero y el candado cambian de mano; la bicicleta sale de la portería |
| 4 | el número del radicado / la nota crédito, dicho y repetido (igual que el 8) |
| **5** | **la hoja de compromiso, que está encima del escritorio desde el turno 1, se firma y se lee en voz alta** |
| 6 | el mensaje a la tía, que Dani dice que va a mandar esta misma noche |
| 2 | la tarjeta con la cita escrita, entregada y leída |

Coste: una línea en el bloque «Cómo termina» de las dos fichas de cada escenario. No mueve
ningún reparto.

### 6.5 · Tres decisiones que son de David y hay que tomar **una vez**, no tres

1. ~~**Los minutos.**~~ **RESUELTO durante esta auditoría, y a favor del set.** §4 fijaba A2 en
   4-6 minutos y los tres redactores dejaron por escrito que su bloque se pasaba. El blueprint
   se actualizó el 19 de agosto: **A2 pasa a 5-8 minutos y 6-9 turnos por rol.** Vuelto a medir
   contra la horquilla nueva: minutos **6, 6, 7, 7, 7, 8, 6, 7** → **8 de 8 dentro**; turnos por
   rol de 6 a 8 → **16 de 16 dentro**. No queda nada que decidir aquí. Los avisos de fase 4
   sobre §4 pueden borrarse de las tres cabeceras.
2. **`rechazar` al 100 %** (§5.1 de este informe). Dos salidas: (a) reconocer en §5 que rechazar
   y proponer-alternativa son **suelo estructural** del blueprint (§3.1 y §3.6) y exceptuarlos
   del umbral del 40 % —dejando el umbral para los otros diez actos—; o (b) escribir un
   escenario donde la fricción no sea una negativa: dos personas que dicen que sí a todo y no
   consiguen armar el plan. Recomiendo **(a) ahora y (b) cuando el set crezca a 10**, porque
   arreglarlo hoy exige tocar puertas del blueprint, no escenarios.
3. **La etiqueta de poder del nº 1.** Si se mantiene `a>b`, que sea por decisión escrita y no
   por herencia de fase 0, porque el reparto de poder entero se sostiene sobre ella.

---

## 7 · Resumen para el guardián

| | |
|---|---|
| **Puerta 12 (§5, seis repartos)** | **SUPERADA** — 6 de 6, medidos sobre lo escrito |
| Bloqueantes | **ninguno** |
| Obligatorio antes de publicar | las dos colisiones de nombre (§6.3) |
| Muy recomendado | el cambio del nº 2 (§6.1), los dos renombres de género (§6.2) y los cinco gestos de cierre (§6.4) |
| Ya no hace falta decidir | los minutos: §4 pasó a 5-8 y el set entra entero (§6.5.1) |
| No es mi puerta, pero está medido | 7 de 16 fichas quedan bajo el suelo de la puerta 4 nueva (§5.7) |
| Para el blueprint, no para el set | el suelo estructural de `rechazar` (§6.5.2) |

Y la nota que hay que dejar escrita porque se va a volver a necesitar: **este informe se repite
entero en cuanto se corrija un escenario.** Cambiar el nº 2 mueve seis columnas de golpe, y
ninguna de las tablas de arriba sigue siendo cierta después.
