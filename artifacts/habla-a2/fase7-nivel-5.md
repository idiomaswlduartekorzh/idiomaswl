# Escenario 5 · `late-again-on-monday` — auditoría de NIVEL (versión en inglés)

Auditado: `artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md`.
Contra: §4 y §11 de `docs/habla-acompanado-blueprint.md`, el molde
`artifacts/habla-a2/fase7-modelo-ficha-en.md`, `src/data/grammar/registry.ts` y
`src/data/grammar/ingles/{a1,a2}` para los slugs, y el propio script de la ficha
`artifacts/habla-a2/fase5-scripts/prosa.mjs` para el presupuesto.

La ficha está entera en inglés, así que se auditan **tres cosas donde antes había una**: el
inglés que el estudiante tiene que **decir** (A2 hablado, con lista de prohibidas), el que tiene
que **leer** (A2 leído, que aguanta un poco más) y las **20 definiciones** del bloque de
vocabulario, comprobadas una a una contra la palabra que definen.

**Veredicto: PASA CON CAMBIOS.** La mitad hablada está limpia y lo verifiqué por patrón, no a
ojo. Pero hay **tres hallazgos graves que bloquean la publicación**: la ficha se declara dentro
del presupuesto y su propio script dice que se pasa en 75 palabras; imprime como modelo una
frase que el tema de gramática al que enlaza marca con ❌; y las dos líneas de `Your toolkit`
—50 y 61 palabras, una sola oración cada una— no son legibles en A2 por ningún criterio.

---

## 0. Lo que pasa limpio (y conviene no romper)

**Estructuras prohibidas: cero en lo hablado.** Buscadas por patrón sobre el archivo entero:

| prohibida | ocurrencias en inglés de pantalla |
|---|---|
| present perfect de duración con `for` / `since` | **0** |
| pasiva en exponentes | **0** |
| preguntas incrustadas en exponentes | **0** |
| modal + infinitivo perfecto | **0** |
| condicional hipotético (2.º) | **0** |
| `would rather` / `would prefer` / `would` | **0** |
| `could` de cortesía | **0** (hay un `could` de posibilidad, leído, no dicho → §2, hallazgo M-1) |

Las dos apariciones de `since` (líneas 19 y 241) son metatexto en español que dice justamente
que `since` está fuera. No cuentan.

**Los 18 exponentes hablados son A2 de manual.** `used to` con contraste de presente, pasado
simple regular con fecha, `have to` de obligación externa, `can` de ofrecimiento y de permiso,
`will` de compromiso, primer condicional, imperativo, comparativo irregular, presente simple
de consecuencia (`Then I lose my Wednesdays.`). Nada que un A2 no haya visto. El único reparo
está en la mitad del condicional de Liliana, y es grave por otro motivo (§1, G-2).

**El truco del registro sobrevive bien.** `doña Amparo` / `Liliana` está en las dos cabeceras y
en dos exponentes producibles (`Sit down, Liliana.`, `What are the keys for, doña Amparo?`), que
es donde se produce. Correcto: el inglés no marca usted, y meterlo por el nombre es la salida
buena.

**Las horas cuadran con el tema al que enlazan.** `telling-time` (A1) enseña explícitamente
`twenty to seven` (6:40) y `a quarter past` en el mismo cuerpo del tema. Los cinco relojes de la
ficha —6:40, 6:50, 6:55, 7:00, 7:15— se dicen todos en la forma que el tema enseña. Nada
inventado.

**Los `grammarReferences`: los 10 existen, los 10 títulos coinciden carácter por carácter.**
Detalle en §4.

---

## 1. El inglés que hay que DECIR

### G-2 · GRAVE · el primer condicional que el propio tema marca con ❌

Línea 33, restricción 1 de Liliana, e impresa otra vez en el `rationale` de
`first-conditional` (línea 237):

> `If the store finds out, the promotion goes to somebody else.`

`src/data/grammar/ingles/a2/first-conditional.ts` la marca como error en su lista de fallos:

> `"If you study, you pass" ❌ (en este contexto) → "If you study, you'll pass" ✓ — resultado futuro lleva will.`

Es exactamente la misma forma. Un estudiante que pulse el enlace de gramática que la ficha le
da encuentra su propia frase modelo en la columna de los errores. Y es la única frase de la
ficha que le enseña a hablar de lo que puede perder.

**Arreglo:** `If the store finds out, the promotion will go to somebody else.` Sigue siendo A2,
sigue cabiendo en el renglón, y ahora sí es la frase que el tema enseña. Corregir también la
cita del `rationale`.

### M-2 · MEDIO · el mismo verbo en dos tiempos sobre la misma idea

El cierre compartido (línea 209) manda decir en voz alta:

> `"This cost you ___."`

y los dos exponentes de precio (líneas 88 y 166) dicen `That costs you two nights.` /
`That costs you your Wednesdays.` Presente en la tabla, pasado en el cierre, mismo verbo, misma
función. Es la colisión que esta misma ronda arregló en el renglón del mecanismo (`can` → `will`
con la misma hora) y que se coló otra vez aquí. Además `cost` es irregular y su pasado es
idéntico al presente sin `-s`: el estudiante no tiene forma de saber qué tiempo está diciendo.

**Arreglo:** `"This costs you ___."` en el cierre. Un carácter.

### M-3 · MEDIO · una frase que hay que decir y que no está en ninguna caja

Línea 211, y la dice doña Amparo en voz alta:

> `"Say it back to me: who takes Matías, and what time do you get here?"`

`say something back to somebody` es un phrasal con partícula desplazada, no está en los nueve
exponentes de B, no está en su vocabulario y no está en la caja. Es la única frase obligatoria
del escenario que no tiene respaldo en ninguna pantalla.

**Arreglo:** `"Tell me again: who takes Matías, and what time do you get here?"` Misma función,
verbo A1.

### L-1 · LEVE · `better than anybody` es adverbio, no adjetivo

`You know this warehouse better than anybody.` (línea 168) usa el comparativo del **adverbio**
`well`. El tema `comparatives` enseña `good → better` como adjetivo y no menciona adverbios ni
una sola vez (comprobado por grep: `adverb|adverbio|well` → 0 resultados). La frase es correcta
y natural; el anclaje es parcial. Ver §4, M-12.

---

## 2. El inglés que hay que LEER

Aquí está la mayor parte del daño. Criterio aplicado: frases cortas, presente y pasado simple,
sin subordinación larga. Cuando una instrucción no cabe, se dice y se propone la versión corta.

### G-3 · GRAVE · las dos líneas de `Your toolkit` no son legibles en A2

Son las dos líneas más pesadas de la ficha y son **instrucciones**, no ambientación: si no se
entienden, el rol no se juega bien.

Liliana (línea 74) — **50 palabras, una sola oración**, dos incisos con guion largo, tres
paréntesis y un fragmento final:

> `Blocks 1 — only to answer, she asked you to come; your opening is the question below — 2, 3 [receives] (three papers, and one of those names is not on your screen), 5, 6 (Saturday mornings: you cannot say yes), 7 [grants] — Saturday mornings, not on the table — 8. Not 4.`

Amparo (línea 155) — **61 palabras, una sola oración**, con `the times she throws at you`
(idiomático) y `above all` (conector B1):

> `Blocks 1 [grants], 2, 3 [receives] — the times she throws at you, and the line you have to read back — 4 [jargon] (five of your words are not on her screen), 5 (nobody pays you for those two nights), 7 [grants] for the things you cannot give, 8, and above all 6: today there is one question you will not answer.`

**Arreglo — una línea por bloque, y la lista primero.** Para Liliana:

> Use blocks 1, 2, 3 `[receives]`, 5, 6, 7 `[grants]`, 8. Don't use 4.
> Block 1: only to answer her. She asked you to come. Your first question is in the table below.
> Block 3: three papers. One of the names is not on your screen.
> Block 6: you cannot say yes to Saturday mornings.
> Block 7: Saturday mornings are not on the table.

Para Amparo:

> Use all eight blocks.
> Block 3: she gives you times. Read the line back to her.
> Block 4 `[jargon]`: five of your words are not on her screen.
> Block 5: nobody pays you for those two nights.
> Block 7: for the things you cannot give.
> Block 6 matters most: today there is one question you do not answer.

Baja además el presupuesto, que es el hallazgo G-1.

### G-4 · GRAVE · una línea que no se puede analizar

Línea 118, en «Only you know» de Amparo:

> `The first two Mondays · never on the incident form · one written today = the question back, about the other two.`

`one written today` es una pasiva reducida con condicional implícito, `the question back` es un
sustantivo que no existe, y el `=` hace de verbo. Ni un nativo la lee a la primera. Y es el dato
que sostiene el secreto de Amparo entero.

**Arreglo:** `The first two Mondays are not on the incident form. If you write one today, she can ask about the other two.`

### M-4 · MEDIO · la instrucción de apertura de Amparo no tiene verbo

Línea 106:

> `Before you speak · The second set of keys and the blank commitment sheet on the desk. Then talk. Without them, this is a lecture.`

Dos problemas. Uno: `The keys and the sheet on the desk` es un sintagma nominal; la orden
—ponlos encima de la mesa— no está escrita en ninguna parte, y sin embargo el criterio de salida
1 la da por comprobable («The keys and the sheet were on the desk before you spoke»). Dos:
**`lecture` es falso amigo** para un hispanohablante (`lectura`), y no está glosado.

**Arreglo:** `Put the second set of keys and the blank commitment sheet on the desk. Then talk. Without them, this is only a complaint.`

### M-5 · MEDIO · `could` impreso en la pantalla del estudiante

Línea 120: `You could give the training on two Thursdays after closing…`. No es `could` de
cortesía —es de posibilidad, y leído, no dicho—, pero la ficha se declara a sí misma libre de
`could` (línea 19) y lo tiene impreso. Lo que se lee se dice.

**Arreglo:** `You can give the training on two Thursdays after closing, 6:30 to 8:30. Nobody pays you for those two nights, and your Mondays are already twelve hours. You don't want to offer it.`

Arregla de paso `on top of twelve-hour Mondays` (idioma + premodificador compuesto) y
`two nights nobody pays` (relativa de contacto).

### M-6 · MEDIO · la lista de `You can't` se lee como imperativo

En las dos fichas (líneas 32-35 y 112-115) el encabezado es `You can't` y cada punto empieza con
un verbo en base. El resultado es que la línea 33 se lee literalmente como una orden —«Say why
you can't work on Saturday mornings»— y dos frases después dice `Don't say why.` La ficha se
contradice en la superficie del texto, que es la única que un A2 tiene.

**Arreglo mínimo, sin tocar el molde:** poner dos puntos en el encabezado (`You can't:`) y
empezar cada punto con `say / invent / close`, en minúscula, como continuación de la frase. Si
el molde de los ocho no lo permite, **escalar**: el problema es del molde, no de este escenario.

### M-7 · MEDIO · seis palabras y giros por encima de A2, sin glosa

| dónde | qué | arreglo |
|---|---|---|
| 55 | `vacant from April` | `nobody in that job from April` |
| 38 | `no refund` | `you paid, and they don't give the money back` |
| 49 | `drop-off 6:40` (nominalización de phrasal; la propia ficha dice que expulsó `drop-off`) | `you leave him at 6:40` |
| 119 | `five months in` | `five months in the job` |
| 196 | `How much you tell her: your call.` | `You decide how much you tell her.` |
| 129 · 133 · 144 | `count them against the delivery note` (×3, `against` = comparar con) | `check them with the delivery note` |

### M-8 · MEDIO · dos pasivas y una absoluta en la prosa de Liliana

| dónde | qué | arreglo |
|---|---|---|
| 55 | `the delivery note signed by the person who opens the store` | `the person who opens the store signs the delivery note` |
| 67 | `signed by the person who opens the store` (celda `here` de `delivery note`) | `the person who opens the store signs it` |
| 144 | `boxes counted against it` | `two people check the boxes with it` |
| 28 | `The office door shut behind you, two things on the desk.` | `The office door is shut. Two things are on the desk.` |
| 177 | `If it cost you nothing, say so…` (se lee como segundo condicional) | `If it costs you nothing, say it out loud, and say why that worries you.` |

### L-2 · LEVE · el resto, ordenado por si se quiere apurar

- 194-195 (la carta): `A quiet deal is no good now.` → `A secret deal does not work now.` ·
  `Any change the other four can see = something she gives back where they can see it.` →
  `The other four can see any change. So she gives something back, and they see that too.`
- 137: `eyes on everything` → `they see everything`.
- 132: `What you can write · three, no fourth` → `You can write three things. There is no fourth.`
- 134: `The warehouse, quiet | Saturdays, 8:00 to 12:00` → `The warehouse is quiet on Saturdays, 8:00 to 12:00.` Es el dato que choca con el secreto de Liliana; conviene que se entienda a la primera.
- 41 y 122: `If you walk away with nothing` es giro de la casa y está en las ocho fichas. No lo toco aquí; queda anotado para el conjunto.
- 30: `No written warning in your file` — sintagma sin verbo. Cabe en A2 leído por la negrita, pero `You don't want a written warning in your file.` no cuesta nada.
- 55 y 30: `out of the list for the warehouse job` (línea 41) — la colocación inglesa es **`off the list`**. Es error de inglés, no de nivel, pero se arregla en el mismo pase.

---

## 3. Las 20 definiciones, una a una

Criterio: **cada definición tiene que estar en inglés más sencillo que la palabra que define.**
Trece de veinte están bien hechas y son de las mejores del set —`warehouse` = «the big room
where the store keeps the boxes» es exactamente lo que hay que hacer—. Las que fallan:

### M-9 · MEDIO · tres definiciones más difíciles que su palabra

| palabra | definición actual | qué falla | arreglo |
|---|---|---|---|
| `a set of keys` (B) | `all the keys for one place, kept together` | `kept together` es participio pasivo reducido; el titular es un sustantivo transparente | `all the keys for one place, in one group` |
| `review date` (B) | `the day you look again and see if it worked` | `see if it worked` es **pregunta incrustada**, que es justo lo que la ficha prohíbe en la línea 19 | `the day you look again: did it work?` |
| `to wait alone` (A) | `to be in a place with nobody looking after you` | la definición no define esperar, define estar sin vigilancia; y `with nobody looking after you` es una absoluta con `-ing`, gramática más dura que el titular | el titular no es una palabra, es una frase transparente. Cambiarlo por `alone` = `with no other person`, y liberar la plaza (ver M-11) |

### M-10 · MEDIO · cuatro celdas `here` por encima de A2

La columna `here` se lee igual que la definición y nadie la audita.

| dónde | qué | arreglo |
|---|---|---|
| 63 | `the one thing not to leave with` | `don't leave with this one` |
| 64 | `blank · one line on it yours` | `it is blank · one line on it is yours` |
| 69 | `6:40 sharp, nothing before and nothing after` (`sharp` adverbial, sin glosa) | `at 6:40, not before and not after` |
| 152 | `what turns a promise into a check` (`check` se lee «cheque» en americano) | `the day somebody can see if it is true` |

### L-3 · LEVE · dos incoherencias entre las dos pantallas

- `your file` está definido **idéntico** en las dos pantallas (líneas 62 y 149). Bien, y es lo
  que hay que hacer. Pero `written warning` no: A dice `a paper about a mistake that goes in your
  file`, B dice `a paper about a mistake, in the worker's file`; y el titular es `a written
  warning` en A y `written warning` en B. Unificar.
- `store folder` (B, línea 147) usa relativa de contacto sin `that` —`the papers the store
  keeps`— mientras la entrada gemela de A sí lo lleva. Poner `that`.

### M-11 · MEDIO · `training` está impreso en la pantalla de A y solo glosado en la de B

El cierre compartido (línea 209, y va en las dos pantallas) dice
`When and where the training happens, and what it costs.` La ficha quitó `training` de la lista
de A porque «la simulación midió cero veces en boca de A». Pero el criterio que la propia ficha
usó dos renglones antes para **meter** `warehouse` y `delivery note` en A fue otro: «las dos
impresas hoy en la pantalla de A y glosadas solo en la de Amparo». `training` cumple ese mismo
criterio y se quedó fuera. La plaza que libera M-9 (`to wait alone`) le sirve.

**No es el caso de `store folder`,** que también aparece sin glosa en la pantalla de A: ahí la
asimetría es de diseño y está declarada en el toolkit («one of those names is not on your
screen») y comprobada en el criterio de salida 6. Bien puesta. No tocar.

---

## 4. Los `grammarReferences`, slug a slug

Comprobados contra `src/data/grammar/registry.ts` → `ingles/{a1,a2}`. **Los 10 existen. Los 10
títulos coinciden carácter por carácter. Los 10 `level` son correctos.**

| slug | `level` declarado | ¿existe? | título |
|---|---|---|---|
| `used-to-a2` | a2 | sí (`a2/used-to.ts`) | coincide |
| `first-conditional` | a2 | sí | coincide |
| `have-to-must` | a2 | sí | coincide |
| `past-simple-regular` | a2 | sí | coincide |
| `will-future` | a2 | sí | coincide |
| `connectors-a2` | a2 | sí (`a2/connectors.ts`) | coincide |
| `comparatives` | a2 | sí | coincide |
| `imperative` | a1 | sí | coincide |
| `can-ability` | a1 | sí | coincide |
| `telling-time` | a1 | sí | coincide |

**El sufijo está bien manejado.** `used-to-a2` y `connectors-a2` lo llevan porque el registro lo
lleva —aunque sus ficheros se llamen `used-to.ts` y `connectors.ts`, que es lo que confunde: el
campo `slug` manda, no el nombre del fichero. Y `first-conditional`, `have-to-must`,
`past-simple-regular`, `will-future` y `comparatives` correctamente **no** lo llevan. Nadie ha
«corregido» de más.

**El campo `level` está bien traído.** `getTopicBySlug(idioma, nivel, slug)` busca dentro de un
nivel y la ruta A2 tiene el nivel clavado, así que sin ese campo los tres de A1 darían 404. La
nota de la ficha (líneas 223-229) es correcta y la advertencia sobre `getGrammarReferences`
(`src/data/practica/writing-integrated.ts:1046`), que no tiene `level`, también: hay que ampliar
ese tipo antes de reutilizarlo. Verificado.

**Quitar `past-simple-questions` fue lo correcto** y por la razón que la ficha da: el único
anclaje era `What happened this morning?`, que es pregunta de sujeto y por tanto la única de
pasado sin `did`. El tema va de `did / didn't`. Bien retirado.

### M-12 · MEDIO · dos `rationale` que no dicen la verdad del tema

1. **`first-conditional`** (línea 237) afirma: «El tema autoriza `can` y `have to` en la cláusula
   `if`». El tema lo que dice (decisión 5, `first-conditional.ts:31`) es que se pueden usar
   `can`, `must` y `have to` **en la cláusula `if`**, con el ejemplo `If you can come, please let
   me know.` Pero en el exponente de la ficha —`If you write this line today, I can give you the
   keys.`— el `can` está en la **cláusula resultado**, no en la `if`. La justificación está
   apuntando a la línea equivocada del tema. **Arreglo:** decir lo que de verdad pasa: el
   condicional lleva presente simple en la `if` y `can` de permiso en el resultado.
2. **`comparatives`** (línea 247) dice «el irregular que el tema enseña». El tema enseña
   `good → better` **como adjetivo** y no menciona adverbios (grep: 0). `You know this warehouse
   better than anybody.` es el comparativo del adverbio `well`. **Arreglo:** o se reformula el
   `rationale` sin prometer cobertura que el tema no da, o se cambia el enlace. Aviso: esa frase
   es **el único comparativo de la ficha entera**, así que si se quita el enlace no queda nada
   que ancle el tema.

---

## 5. Presupuesto — G-1, y es el hallazgo más incómodo

### G-1 · GRAVE · la ficha se declara dentro del tope y su propio script dice que no

La ficha creó `fase5-scripts/prosa.mjs` precisamente para que la regla no se aplicara a mano.
Lo corrí, sin tocar nada:

```
$ node artifacts/habla-a2/fase5-scripts/prosa.mjs artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md
 341    ok     ROLE A — Liliana, warehouse assistant
      facts: 10 filas · words you need here: 10 filas · say it here: 9 filas
 425  SE PASA  ROLE B — doña Amparo, supervisor
      facts: 10 filas · words you need here: 10 filas · say it here: 9 filas

$ … --con-h3
 359  SE PASA  ROLE A
 443  SE PASA  ROLE B
```

El texto de la ficha (líneas 280-285) dice: «La ficha de B entraba en esta ronda con **351**
medidas —por encima del tope— y **baja** con los cuatro recortes». El script dice **425**: no
baja, se pasa en **75 palabras**, un 21 % por encima del tope de 350. Y con `--con-h3`, que es
la segunda columna que la propia tabla declara, **se pasan las dos fichas**.

Peor: **la tabla de presupuesto (líneas 275-278) nunca se rellenó.** Sigue con los marcadores
`PROSA_A`, `PROSA_A_H3`, `PROSA_B`, `PROSA_B_H3` literalmente impresos. Por eso la
contradicción no se ve al leer.

Esto es exactamente el defecto que la propia ficha describe en su hallazgo 6: *«Una ficha que
declara de sí misma un cambio que no hizo es peor que el fallo: el siguiente auditor lee la
declaración y no la línea.»* Aquí ha vuelto a pasar, en el párrafo de al lado.

**Arreglo:** rellenar la tabla con lo que salga del script, y recortar B hasta bajar de 350. Las
75 palabras están localizadas y coinciden con los defectos de lectura, así que se pagan solas:

| línea | palabras | qué |
|---|---|---|
| 155 | **61** | `Your toolkit` de B → la versión en líneas cortas de G-3 la deja en ~45 y arregla la legibilidad |
| 120 | 28 | `You could give the training…` → la reescritura de M-5 |
| 122 | 28 | `If you walk away with nothing` |
| 110 | 26 | `You want` |
| 103 | 26 | cabecera |
| 177 | 28 | criterio de salida 6 |

Con G-3 y M-5 aplicados, B queda alrededor de 395: **sigue pasándose**. Hacen falta ~45 palabras
más. Sugerencia, por orden de coste pedagógico: fundir las tres restricciones de `You can't` en
dos, y cortar la cabecera (línea 103), que repite en 26 palabras lo que la primera línea de la
ficha ya dice.

**Nota de método:** el script cuenta bien y es la autoridad. No bajar el tope ni tocar el script.

---

## 6. Lo que no toco, y por qué

1. **`walk away with nothing`, la lista `You can't` y el titular `Your toolkit`** son del molde de
   los ocho. Lo que digo en M-6 es un defecto del molde; si se arregla, se arregla en los ocho a
   la vez, no aquí.
2. **Los turnos por rol (12-18, mediana 17) contra los 6-9 de §4.** La ficha ya lo escaló en su
   hallazgo 9 y estoy de acuerdo con la decisión: se declara lo medido. No lo repito como
   hallazgo, pero afecta al nivel de lectura de refilón —17 turnos son 17 turnos de inglés— y por
   eso conviene que el presupuesto de prosa sí se cumpla.
3. **`I can start at five to seven` (6:55) frente a la hora de apertura (7:00).** Da el cuarto de
   hora de margen que la escena necesita y es coherente con el bus de las 5:50 (llega 6:45). No
   es defecto.
4. **`can` de permiso en `I can give you the keys`** con un tema que se titula «Can para
   habilidad». Lo comprobé: el cuerpo del tema (`can-ability.ts:47-48`) cubre permiso y
   ofrecimiento explícitamente, y tiene una escena «Ofreciendo ayuda». El enlace es bueno.

---

## 7. Resumen ejecutable

**No se publica sin esto (3):**

1. **G-1** · rellenar la tabla de presupuesto con la salida del script y bajar B de 425 a ≤350.
2. **G-2** · `If the store finds out, the promotion will go to somebody else.` (línea 33 y el
   `rationale` de la línea 237).
3. **G-3 / G-4** · reescribir las dos líneas de `Your toolkit` en líneas cortas, y la línea 118.

**Antes de la simulación (9 medios):** M-2 (`This costs you`), M-3 (`Tell me again`), M-4
(`Put… on the desk` + `lecture`), M-5 (`could`), M-6 (`You can't:`), M-7 (seis palabras sin
glosa), M-8 (pasivas y absolutas), M-12 (los dos `rationale`), M-9 (tres definiciones), M-10 (cuatro celdas
`here`), M-11 (`training` en la lista de A).

**Si sobra tiempo (leves):** L-1 (`better` adverbio), L-2 (la carta y los telegramas), L-3
(unificar `written warning` y poner el `that` de `store folder`), y `off the list` por
`out of the list`.
