# Calibración de dificultad — `sat-set-1-m1` (27 ítems)

- **Archivos auditados:** `src/data/mocks/sat/blocks/sat-set-1-m1-{cs,ii,sec,eoi}.ts`
- **Auditor:** calibrador de dificultad
- **Fecha:** 19 ago 2026
- **Veredicto:** **NO APTO** — 2 bloqueantes, 6 mejoras
- **Qué NO se tocó:** nada. Este informe no modifica ni un `.ts`. Devolver y arreglar son
  trabajos distintos.

Es la primera vez que estos ítems pasan por una calibración de dificultad. Las etiquetas
`dificultad` del `meta` vienen del plan (`docs/sat-planes/sat-set-1-m1.md`), se escribieron
**antes** de las cinco rondas de rediseño, y ninguna se ha revisado desde entonces.

---

## 1. Método — para que se pueda discutir un número, no una sensación

Cada ítem puntúa **1 a 3** en cinco ejes. Suma: **5–7 fácil · 8–11 medio · 12–15 difícil**.

Las reglas de decisión que apliqué van escritas aquí para que quien no esté de acuerdo
pueda señalar la regla y no la intuición:

| Eje | Cómo lo puntué |
|---|---|
| **T · complejidad del texto** | 1 si la media de palabras por oración < 18 y el léxico es frecuente y el tema concreto; 3 si la media ≥ 24 **o** hay densidad de léxico académico con tema abstracto; 2 el resto. Medido con `scratchpad/metrics.mjs` (media de oración, palabras de ≥ 8 letras, marcas de subordinación) y ajustado a mano por concreción del tema. |
| **L · localización** | 1 = decide una sola oración, la que el enunciado señala o la que contiene el hueco; 2 = hay que relacionar dos partes; 3 = hay que sostener tres o más (o dos textos). |
| **D · distancia entre opciones** | 1 = con el texto delante, dos o tres opciones caen de golpe; 2 = el mejor distractor cae por un hecho comprobable del texto; 3 = clave y mejor distractor comparten molde y se separan por un matiz (alcance, dirección, denominador, orden). |
| **A · abstracción** | 1 = recuperar dato explícito, o aplicar una regla que se decide por la forma (todo SEC de puntuación/concordancia); 2 = paráfrasis, selección de acepción, relación discursiva, verificación de datos, regla que exige leer significado (tiempo verbal, referente del modificador); 3 = inferencia, función retórica, síntesis contra un objetivo, comparación de dos textos. |
| **E · léxico del enunciado** | 1 = enunciado directo o fórmula fija sin metalenguaje (`As used in the text…`, `According to the text…`, `…conforms to the conventions of Standard English`, `…the most logical transition`); 2 = metalenguaje de examen (`function`, `overall structure`, `inferred`, `if true, would most strongly support`, `most effectively uses relevant information … to accomplish this goal`); 3 = metalenguaje opaco o enunciado que hay que descifrar. |

Dos decisiones de método que conviene conocer porque mueven varios ítems a la vez:

1. **Los ítems de función retórica y de estructura arrancan en A=3** por definición del eje.
   Consecuencia: un `text-structure-purpose` no puede bajar de 8 puntos aunque su texto sea
   una narración de frases cortas. **El suelo de un ítem de función es medio**, y por eso
   `q05`, etiquetado 1, sale 9. No es un defecto del ítem: es lo que dice la escala.
2. **En SEC el eje E es constante (1) en los siete ítems**, porque el enunciado es literal-
   mente el mismo. Ese eje no discrimina dentro de SEC, y todo el peso recae en T, L y D.

---

## 2. Tabla — los cinco ejes, la suma, y lo que declaró el redactor

| id | dom | tipo | T | L | D | A | E | **suma** | **calculada** | declarada | |
|---|---|---|---|---|---|---|---|---|---|---|---|
| q01 | CS | words-in-context | 1 | 1 | 2 | 2 | 1 | **7** | fácil | 1 fácil | ✔ |
| q02 | CS | words-in-context | 1 | 2 | 3 | 2 | 1 | **9** | medio | 1 fácil | **✘ +1** |
| q03 | CS | words-in-context | 3 | 2 | 2 | 2 | 1 | **10** | medio | 2 medio | ✔ |
| q04 | CS | words-in-context | 3 | 3 | 3 | 3 | 1 | **13** | difícil | 3 difícil | ✔ |
| q05 | CS | text-structure-purpose | 1 | 1 | 2 | 3 | 2 | **9** | medio | 1 fácil | **✘ +1** |
| q06 | CS | text-structure-purpose | 2 | 3 | 3 | 3 | 2 | **13** | difícil | 2 medio | **✘ +1** |
| q07 | CS | text-structure-purpose | 3 | 3 | 3 | 3 | 2 | **14** | difícil | 3 difícil | ✔ |
| q08 | CS | cross-text-connections | 2 | 3 | 3 | 3 | 2 | **13** | difícil | 3 difícil | ✔ |
| q09 | II | central-ideas-details | 1 | 1 | 2 | 1 | 1 | **6** | fácil | 1 fácil | ✔ |
| q10 | II | central-ideas-details | 2 | 2 | 2 | 2 | 1 | **9** | medio | 2 medio | ✔ |
| q11 | II | command-of-evidence-textual | 1 | 2 | 3 | 2 | 2 | **10** | medio | 2 medio | ✔ |
| q12 | II | command-of-evidence-textual | 3 | 3 | 3 | 3 | 2 | **14** | difícil | 3 difícil | ✔ |
| q13 | II | command-of-evidence-quantitative | 2 | 3 | 3 | 2 | 2 | **12** | difícil | 2 medio | **✘ +1** |
| q14 | II | inferences | 2 | 3 | 3 | 3 | 2 | **13** | difícil | 2 medio | **✘ +1** |
| q15 | II | inferences | 3 | 3 | 3 | 3 | 2 | **14** | difícil | 3 difícil | ✔ |
| q16 | SEC | boundaries | 1 | 1 | 2 | 1 | 1 | **6** | fácil | 1 fácil | ✔ |
| q17 | SEC | form-structure-sense | 1 | 1 | 1 | 1 | 1 | **5** | fácil | 1 fácil | ✔ |
| q18 | SEC | boundaries | 2 | 1 | 2 | 1 | 1 | **7** | fácil | 2 medio | **✘ −1** |
| q19 | SEC | form-structure-sense | 2 | 2 | 2 | 2 | 1 | **9** | medio | 2 medio | ✔ |
| q20 | SEC | boundaries | 2 | 1 | 2 | 1 | 1 | **7** | fácil | 2 medio | **✘ −1** |
| q21 | SEC | form-structure-sense | 2 | 2 | 3 | 2 | 1 | **10** | medio | 3 difícil | **✘ −1** |
| q22 | SEC | boundaries | 2 | 1 | 3 | 2 | 1 | **9** | medio | 3 difícil | **✘ −1** |
| q23 | EOI | rhetorical-synthesis | 1 | 3 | 3 | 3 | 2 | **12** | difícil | 2 medio | **✘ +1** |
| q24 | EOI | rhetorical-synthesis | 2 | 3 | 3 | 3 | 2 | **13** | difícil | 3 difícil | ✔ |
| q25 | EOI | transitions | 1 | 1 | 1 | 2 | 1 | **6** | fácil | 1 fácil | ✔ |
| q26 | EOI | transitions | 2 | 3 | 2 | 2 | 1 | **10** | medio | 2 medio | ✔ |
| q27 | EOI | transitions | 3 | 3 | 3 | 2 | 1 | **12** | difícil | 3 difícil | ✔ |

**Coincidencia con la etiqueta declarada: 17 de 27 (63 %). Diez discrepancias, todas de un
nivel; ninguna de dos.** Media de la suma: **10,07 / 15**.

### Las discrepancias tienen una dirección, y no es azar

| Bloque | Discrepancias | Dirección |
|---|---|---|
| CS · II · EOI (lectura) | q02, q05, q06, q13, q14, q23 | **6 de 6 hacia arriba** |
| SEC (convenciones) | q18, q20, q21, q22 | **4 de 4 hacia abajo** |

No es ruido, es el rastro de cinco rondas de rediseño. Cada ronda de R8/R9/R10 igualó el
molde de las cuatro opciones para que no se pudieran podar sin leer, y eso **sube el eje D
en todos los ítems que tocó**. Los seis ítems de lectura que se salieron de su etiqueta son
exactamente ítems que se reescribieron (q02 cuatro versiones, q13 y q14 seis, q23 dos). La
etiqueta se puso antes; el ítem se endureció después; nadie volvió a la etiqueta.

En SEC pasa lo contrario y por otra razón: el eje E está clavado en 1 (enunciado idéntico) y
el eje A rara vez pasa de 2, así que un ítem de convenciones sólo puede subir por T, L y D.
Con ese techo, **ningún ítem de SEC llega a la banda difícil** (§4).

---

## 3. La curva, dominio por dominio

Recordatorio del blueprint §2: en CS, II y EOI la curva se exige **dentro de cada grupo de
tipo**, y entre grupos puede bajar. En SEC se exige a lo largo del bloque entero, sin
agrupar.

### Craft and Structure — ✔ sin rotura

| grupo | ítems | sumas | |
|---|---|---|---|
| words-in-context | q01 → q04 | **7 · 9 · 10 · 13** | estrictamente creciente |
| text-structure-purpose | q05 → q07 | **9 · 13 · 14** | creciente |
| cross-text-connections | q08 | **13** | grupo de uno |

La caída q04 (13) → q05 (9) entre grupos está expresamente permitida por el plan («q05 es
más fácil que q04, y es correcto»). Es la curva mejor construida del módulo.

### Information and Ideas — ✔ sin rotura

| grupo | ítems | sumas | |
|---|---|---|---|
| central-ideas-details | q09 → q10 | **6 · 9** | creciente |
| command-of-evidence-textual | q11 → q12 | **10 · 14** | creciente |
| command-of-evidence-quantitative | q13 | **12** | grupo de uno |
| inferences | q14 → q15 | **13 · 14** | creciente, por 1 punto |

El orden de tipos coincide con la convención WeLearn (el de la tabla oficial) y con
`SAT_TYPES_BY_DOMAIN`. ✔

### Standard English Conventions — ✘ **ROTA**

| q16 | q17 | q18 | q19 | q20 | q21 | q22 |
|---|---|---|---|---|---|---|
| **6** | **5** | **7** | **9** | **7** | **10** | **9** |

Tres inversiones:

- **q19 (9) → q20 (7)**: bajada de 2 puntos que **cruza de banda** (medio → fácil), en la
  posición 5 de 7. Es la rotura de verdad.
- q21 (10) → q22 (9): bajada de 1, misma banda, en la cola.
- q16 (6) → q17 (5): bajada de 1, misma banda, ruido.

Esto no es sólo opinión mía. **Si se corrigen las etiquetas a las bandas medidas,
`scripts/check-sat-exam.mjs` falla la puerta 9 por su cuenta:** SEC quedaría
`1 · 1 · 1 · 2 · 1 · 2 · 2` y el guardián compara `dificultad[i] < dificultad[i-1]` sobre
los siete de SEC sin agrupar (líneas 278-285). Es decir: hoy el guardián pasa porque las
etiquetas están mal, no porque el bloque esté ordenado.

### Expression of Ideas — ✔ sin rotura formal, pero abre en 12

| grupo | ítems | sumas | |
|---|---|---|---|
| rhetorical-synthesis | q23 → q24 | **12 · 13** | creciente, por 1 punto |
| transitions | q25 → q27 | **6 · 10 · 12** | creciente |

Perfil del bloque tal y como lo ve el estudiante: **12 · 13 · 6 · 10 · 12**. El último
bloque del módulo abre con sus dos ítems más duros —hacia el minuto 27 de 32— y después
cae 7 puntos de golpe, la mayor caída del módulo. Es legal (manda la agrupación por tipo, y
el orden de tipos es convención WeLearn, no dato oficial), pero es lo que este calibrador
está para señalar.

---

## 4. La mezcla del M1

| Banda | Calculada | Declarada en el plan |
|---|---|---|
| fácil (5-7) | **7** (25,9 %) | 7 (25,9 %) |
| medio (8-11) | **9** (33,3 %) | 11 (40,7 %) |
| difícil (12-15) | **11** (40,7 %) | 9 (33,3 %) |
| media | **10,07 / 15** | 2,07 / 3 |

**La mezcla, contada, aguanta**: los tres niveles están presentes y ninguno pasa del 41 %.
Un M1 con esta media (10,07 sobre 15, justo por encima del centro de la escala) enruta.

Lo que no aguanta es **dónde viven los fáciles y dónde vive el techo**:

| Dominio | media | fácil | medio | difícil |
|---|---|---|---|---|
| Craft and Structure | **11,00** | 1 | 3 | 4 |
| Information and Ideas | **11,14** | 1 | 2 | 4 |
| **Standard English Conventions** | **7,57** | **4** | **3** | **0** |
| Expression of Ideas | **10,60** | 1 | 1 | 3 |

Dos hechos que salen de esa tabla:

1. **SEC no tiene ni un ítem difícil.** Los dos que el plan declara 3 salen 10 y 9. El techo
   del bloque de convenciones es 10 sobre 15. Traducido: un estudiante fuerte en gramática y
   flojo en lectura no se distingue en SEC de uno medio — los siete ítems se le dan igual —,
   así que **el enrutamiento al M2 lo decide casi sólo la lectura**. En un módulo cuyo único
   trabajo es enrutar, eso es un defecto de instrumento, no de estilo.
2. **De los 7 fáciles, 4 están en SEC.** En los quince primeros ítems (CS + II) sólo hay dos
   por debajo de 8: q01 (7) y q09 (6). Y la secuencia q11-q15 es **10 · 14 · 12 · 13 · 14**:
   cinco ítems seguidos, cuatro de ellos difíciles, en mitad del módulo. El estudiante choca
   con un muro justo antes del respiro de SEC.

Perfil completo del módulo en el orden en que se responde:

```
 7  9 10 13  9 13 14 13 │  6  9 10 14 12 13 14 │  6  5  7  9  7 10  9 │ 12 13  6 10 12
 └──────── CS ─────────┘   └────── II ───────┘   └────── SEC ──────┘   └─── EOI ───┘
```

---

## 5. Comparación de medias entre módulos — no se puede hacer todavía

`src/data/mocks/sat/` sólo contiene `sat-set-1-m1.ts`. **`sat-set-1-m2-facil` y
`sat-set-1-m2-dificil` no existen**, ni como plan ni como bloque. Sin ellos no hay medias
que comparar y la adaptatividad no es «decorativa»: es inexistente. Queda anotado, no
contado como hallazgo de este módulo.

Lo que sí deja este módulo es **la línea base y el eje por el que hay que separar**. Media
de cada eje en M1, y cuánto se mueve cada uno entre la banda fácil y la difícil **dentro**
de este mismo módulo:

| Eje | media M1 | media de los 7 fáciles | media de los 11 difíciles | salto |
|---|---|---|---|---|
| T · complejidad del texto | 1,89 | 1,29 | 2,36 | **+1,07** |
| L · localización | 2,11 | 1,00 | 3,00 | **+2,00** |
| D · distancia entre opciones | 2,48 | 1,71 | 3,00 | **+1,29** |
| A · abstracción | 2,19 | 1,29 | 2,82 | **+1,53** |
| E · léxico del enunciado | **1,41** | 1,00 | 1,82 | **+0,82** |

Dos lecturas:

- **La buena: el módulo no hace trampa con el enunciado.** Ningún ítem de los 27 llega a
  E=3. La media es 1,41 y en SEC es 1,00 clavado. La dificultad de este M1 no está fabricada
  enrevesando la pregunta, que es exactamente lo que el plan se prometió a sí mismo
  («lo que separa un 1 de un 3 aquí no es enrevesar el enunciado»).
- **La menos buena: tampoco está donde el plan dijo que estaría.** El plan dice que la
  dificultad viene «del texto y de la distancia entre opciones». Medido, el texto es el eje
  que **menos** separa (+1,07) de los cuatro de contenido, por debajo de la localización
  (+2,00) y de la abstracción (+1,53). Y +0,82 de los 6,7 puntos de separación —un 12 %—
  los pone el enunciado, arrastrado por el tipo de ítem (los `inferences`, `function` y
  `synthesis` llevan de serie más metalenguaje que los `words-in-context`). O sea: en este
  M1 la dificultad la marca sobre todo **qué operación pide el tipo de ítem y dónde está la
  respuesta**, no cuán exigente es el texto.

**Objetivos para cuando se escriban los dos M2**, por si sirven de contrato:

| | media objetivo | cómo separarlos |
|---|---|---|
| M2-fácil | ≈ 8,0 | bajar **T** a ≈1,3 y **D** a ≈1,8 |
| M2-difícil | ≈ 12,5 | subir **T** a ≈2,6 y **D** a 3,0 |
| ambos | — | **E no se toca**: tiene que quedarse en ≈1,4, igual que en M1. Si los dos M2 se separan por metalenguaje, la separación es falsa. |

Con M1 en 10,07, esos dos objetivos dejan un solape mínimo y ponen el M1 justo en medio,
que es lo que hace falta para enrutar.

---

## 6. Hallazgos

### BLOQUEANTES (2)

#### B1 · La curva de SEC está rota en q20, y hoy el guardián no lo ve

`q19` mide 9 y `q20`, que va detrás, mide 7: dos puntos abajo y cambio de banda, en un
bloque que el blueprint obliga a ordenar de fácil a difícil **sin agrupar por tipo**
(§2, verificado 2026-08-18). En la cola pasa lo mismo en pequeño: `q21` 10 → `q22` 9.

Que hoy pase la puerta 9 es un accidente de las etiquetas: `q18` y `q20` van declarados 2
cuando miden 7 (fácil), y `q21`/`q22` van declarados 3 cuando miden 10 y 9. En cuanto se
corrijan las etiquetas, `scripts/check-sat-exam.mjs` falla solo.

**Arreglo (barato: es un reorden de dos ítems, no una reescritura).** SEC es el único bloque
donde reordenar es legal, porque no se agrupa por tipo. Basta con **intercambiar `q19` y
`q20`**:

| orden propuesto | q16 | q17 | q18 | **q20** | **q19** | q21 | q22 |
|---|---|---|---|---|---|---|---|
| suma | 6 | 5 | 7 | **7** | **9** | 10 | 9 |
| etiqueta corregida | 1 | 1 | 1 | 1 | 2 | 2 | 2 |

Quedan sólo dos descensos de 1 punto **dentro de la misma banda** (6→5 al principio, 10→9 al
final), que es ruido y que el guardián no mira porque compara etiquetas, no sumas.

Comprobado que el reorden no rompe nada más (verificado con script, no a ojo):

- secuencia de claves de SEC → `D · B · A · D · C · A · B`; sin tres iguales seguidas, y sin
  pegarse a `q15` (B) por delante ni a `q23` (C) por detrás;
- recuentos de letra intactos, A 25,9 % · B 25,9 % · C 25,9 % · D 22,2 % (un reorden no mueve
  cuentas);
- temas de SEC → historia · humanidades · ciencia · humanidades · historia · ciencia ·
  historia: ningún tema dos veces seguidas, que es la coquetería que el plan mantiene en
  todo el módulo;
- con las etiquetas de M1 corregidas, **los diez grupos de tipo del módulo quedan no
  decrecientes**.

Aun así hay que **volver a correr el guardián** después, no darlo por bueno.

#### B2 · Standard English Conventions no llega a difícil: el módulo enruta sólo por lectura

Los siete ítems de SEC miden 6, 5, 7, 9, 7, 10, 9. **Cero en la banda difícil**, media 7,57
frente a 11,00 de CS y 11,14 de II. Los dos que el plan declara dificultad 3 salen 10 y 9.

Un M1 es un instrumento de enrutamiento: su trabajo es separar. Si el cuarto del examen que
mide gramática tiene el techo en 10/15, ese cuarto no discrimina en la parte alta y la
decisión de qué M2 recibe el estudiante se toma, de hecho, con los otros veinte ítems. Un
estudiante fuerte en convenciones y flojo en lectura queda mal medido, y es un perfil común.

La causa es rastreable ítem a ítem, no genérica: **`q22` ya no examina lo que el plan le
encargó.** El plan (fila 22) pide «dos decisiones a la vez en la misma oración (subordinada
intercalada + elemento no esencial); ninguna opción puede acertar las dos por casualidad».
El `q22` escrito examina **una** decisión —predicado compuesto, sin signo delante de `and`—,
y por eso se queda en 9. El ítem se endureció por el eje D durante la reescritura R8, pero
perdió por el camino la segunda decisión que era la que lo ponía en 12.

**Arreglo.** Devolver a `q22` (o a `q21`) la segunda decisión que el plan pedía, subiendo
por los ejes que cuentan —L de 1 a 2 o 3, y T de 2 a 3 con un texto de sintaxis más densa—.
Lo que **no** vale: subirlo alargando el enunciado, porque el enunciado de SEC es fijo y
porque es exactamente la trampa que este calibrador existe para detectar. Objetivo: al
menos un ítem de SEC en 12 o más, y el bloque cerrando en esa cifra.

### MEJORAS (6)

#### M1 · Diez etiquetas `dificultad` están obsoletas

`q02`, `q05`, `q06`, `q13`, `q14` y `q23` van declarados por debajo de lo que miden; `q18`,
`q20`, `q21` y `q22`, por encima. Todas de un nivel. Corregir el `meta` a:
q02→2, q05→2, q06→3, q13→3, q14→3, q18→1, q20→1, q21→2, q22→2, q23→3.

**Aviso importante:** corregir las etiquetas **sin hacer antes el reorden de B1 rompe la
puerta 9** del guardián en `q20`. Van juntos o no van. Con el reorden aplicado, las diez
correcciones dejan todos los grupos no decrecientes (comprobado grupo por grupo) y el plan
`docs/sat-planes/sat-set-1-m1.md` hay que actualizarlo con ellas: sus tablas de recuento
(7/11/9, media 2,07) pasan a 7/9/11 y media 2,15.

#### M2 · Los siete fáciles están mal repartidos: cuatro de ellos en SEC

En los quince primeros ítems sólo hay dos por debajo de 8 (`q01` y `q09`). La secuencia
`q11`-`q15` es 10 · 14 · 12 · 13 · 14: cinco seguidos sin respiro, cuatro difíciles.
El estudiante que se hunde ahí ya no rinde en SEC ni en EOI aunque los tuviera. No rompe la
puerta 9 —dentro de cada grupo la curva sube— pero es el motivo por el que un M1 puede
enrutar mal a un estudiante que sabe más de lo que el módulo le deja demostrar.
Se arregla al escribir los grupos de II: el `central-ideas-details` y el `inferences` de
este módulo podrían tener su primer ítem un punto más abajo.

#### M3 · EOI abre en 12 y cae a 6

El último bloque, en el tramo final del cronómetro, presenta 12 · 13 · 6 · 10 · 12: los dos
`rhetorical-synthesis` primero, ambos difíciles, y después el `transitions` más fácil del
módulo. La caída de 7 puntos entre `q24` y `q25` es la mayor del examen. Es legal —manda la
agrupación por tipo—, pero el orden de tipos dentro del dominio es **convención WeLearn, no
dato de College Board** (blueprint §2, marcado ⚠️ «producir bajo riesgo»). Si se decide
invertirlo a transitions → synthesis, el bloque quedaría 6 · 10 · 12 · 12 · 13, que es una
rampa. Es una decisión de blueprint, no un arreglo de ítem: se discute allí y se deja
escrito por qué cambió.

#### M4 · La dificultad no la pone el texto, que es lo que el plan prometió

El eje que menos separa fácil de difícil es **T, complejidad del texto** (+1,07), por debajo
de localización (+2,00), abstracción (+1,53) y distancia entre opciones (+1,29). El plan
dice literalmente «lo que separa un 1 de un 3 aquí no es enrevesar el enunciado: es el texto
y la distancia entre opciones». La segunda mitad se cumple; la primera no. Los textos de los
ítems difíciles no son mucho más exigentes que los de los fáciles: lo que cambia es dónde
está la respuesta y qué operación pide el tipo de ítem. Para los M2 esto importa, porque un
M2-difícil que suba sólo por L y A estará midiendo tipo de pregunta, no lectura.

#### M5 · Dos grupos se sostienen por un punto

`inferences` (q14 13 → q15 14) y `rhetorical-synthesis` (q23 12 → q24 13) suben por un solo
punto, y en ambos ese punto sale de una sola decisión mía en el eje T (2 vs 3 en q15; 1 vs 2
en q23). Si otro calibrador puntúa distinto ese eje, los dos grupos quedan planos. No es una
rotura —un empate no es un descenso— pero son las dos curvas más frágiles del módulo, y
conviene que la próxima versión de cualquiera de esos cuatro ítems las separe de verdad.

#### M6 · `q17` es el ítem menos exigente del módulo (5/15) y su campo de opciones lo delata

Sus cuatro opciones son `are · is · were · have been`: **sólo la clave está en singular**.
Con el texto delante caen tres de golpe (D=1), que es la única puntuación de 1 en ese eje en
todo SEC. Cabe en la banda fácil y el módulo necesita fáciles, así que no es un defecto por
sí solo, pero es también un patrón de forma del tipo que R5 persigue —la clave separable por
un rasgo visible—, así que conviene que lo mire el auditor de sesgo antes de publicar. Aquí
se anota sólo por lo que le toca a este informe: es el suelo de dificultad del módulo.

---

## 7. Qué NO es un problema, para que nadie lo «arregle»

- **La caída q04 (13) → q05 (9) en CS.** Es entre grupos de tipo y el plan la bendice
  expresamente. Igual que q12 (14) → q13 (12) → q14 (13) en II: son tres grupos distintos.
- **El enunciado plano.** Que ningún ítem llegue a E=3 y que SEC esté clavado en 1 es lo que
  se busca, no una carencia. Subir el metalenguaje para «endurecer» sería hacer trampa.
- **Las etiquetas declaradas, vistas solas.** Por grupo son todas no decrecientes
  (1,1,2,3 · 1,2,3 · 3 · 1,2 · 2,3 · 2 · 2,3 · 1,1,2,2,2,3,3 · 2,3 · 1,2,3). El plan está
  bien escrito; lo que falló es que nadie volvió a él después de cinco reescrituras.

---

## 8. Recuento

| | |
|---|---|
| Ítems calibrados | **27** |
| Puntuaciones emitidas | 135 (27 × 5 ejes) |
| Coincidencias con la etiqueta declarada | **17 / 27 (63 %)** |
| Discrepancias de un nivel | 10 |
| Discrepancias de dos niveles | 0 |
| Curvas de grupo revisadas | 10 (3 CS + 4 II + 1 SEC + 2 EOI) |
| Curvas rotas | **1** (SEC) |
| Bloqueantes | **2** |
| Mejoras | **6** |
| **Veredicto** | **NO APTO** |

El módulo no se cae por dificultad: se cae por dos cosas concretas y arreglables —el orden
de SEC y el techo de SEC—. La calidad de los ítems, medida por estos cinco ejes, es alta y
la curva de CS y de II es de manual. Lo que hay debajo de las dos roturas es un módulo que
enruta bien en lectura y no enruta nada en gramática.
