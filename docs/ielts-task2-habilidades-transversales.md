# IELTS Task 2 — las diez habilidades transversales

Estado a 12 de agosto de 2026.

## De qué va este documento

El hub de Task 2 tiene tres bloques: la arquitectura de la respuesta (7 etapas), los tipos de
pregunta (5), y **diez habilidades transversales**. David preguntó por ellas en agosto de
2026 —«en la parte de paraphrasing no hemos hecho nada»— y la respuesta corta es que las diez
existen, pero como **fichas de navegación**, no como lecciones.

Eso no era un olvido: es una decisión que funciona para nueve de ellas y no funcionaba para
una. Este documento dice cuál es cuál, para que la próxima persona no tenga que medirlo otra
vez.

## Cómo están montadas

`TOOLS`, en `src/app/(site)/practica/ielts/academic/writing/task2/Content.tsx`, es una lista
de diez `[título, ruta, descripción]`. Cada ficha enlaza a la etapa del curso donde esa
habilidad ya se practica. La habilidad no tiene página propia; tiene un sitio donde se usa.

| # | Habilidad | Enlaza a | Recorrido propio |
|---|---|---|---|
| 1 | **Paraphrasing** | `paraphrasing` | **Sí** — hub + 5 técnicas + motor |
| 2 | Thesis and position | `introduccion` | No |
| 3 | Topic sentences | `body-1` | No |
| 4 | Explanation and development | `parrafos-cuerpo` | No |
| 5 | Examples and evidence | `parrafos-cuerpo` | No |
| 6 | Cohesion and linking | `linking-language` | **Sí** — hub + 7 familias + motor |
| 7 | Contrast and concession | `body-2` | No |
| 8 | Sentence types | `introduccion` | No |
| 9 | **Academic vocabulary** | `academic-vocabulary` | **Sí** — hub + 8 funciones + motor |
| 10 | Critical final review | `revision-final` | No |

Tres de las diez tienen recorrido propio. Las otras siete son fichas que llevan a una etapa.

## Por qué solo dos

Una habilidad merece página propia cuando cumple las tres:

1. **Se usa fuera de su etapa.** Parafrasear no es solo la primera frase de Task 2: lo hace
   también la introducción de Task 1, y Reading lo mide entero. Los conectores aparecen en
   los cuatro párrafos.
2. **Tiene subdivisiones que se enseñan por separado.** Cinco técnicas de paráfrasis, siete
   familias de conectores. «Topic sentences» no se divide en nada: es una idea.
3. **Alguien la busca en Google por su nombre.** «Cómo parafrasear en inglés» y «conectores
   de contraste en inglés» tienen volumen en Colombia. «Thesis statement IELTS» tiene mucho
   menos, y quien lo busca ya está dentro del embudo.

Las otras ocho fallan al menos dos de las tres. Convertirlas en páginas produciría ocho
lecciones flojas que repiten lo que ya dice su etapa, y una etapa vaciada.

## Paraphrasing — lo que se construyó

Ruta: `/practica/ielts/academic/writing/task2/paraphrasing`

Sale del material de clase de David («Grammar and Speech tools · Paraphrasing»), que enseña
la paráfrasis como cinco movimientos concretos en vez de «di lo mismo con otras palabras».
Ese reparto es la aportación pedagógica y se conserva entero:

| Técnica | Ruta | Qué mueve |
|---|---|---|
| Synonyms | `/synonyms` | las palabras |
| Word order | `/word-order` | el orden |
| Word form | `/word-form` | la categoría gramatical |
| Voice | `/voice` | quién es el sujeto |
| Sentence structure | `/sentence-structure` | cuántas frases hay |

Cada página lleva el recorrido completo de una unidad de Task 2: qué mueve → cuándo se usa →
el ejercicio de reconocimiento → los movimientos con su nota de riesgo → tres ejemplos
resueltos → los errores típicos → cuatro ejercicios. Más un motor de 12 ejercicios en el hub.

### Los diecinueve errores del documento

El material de clase es manuscrito y su inglés tiene diecinueve fallos. No son erratas:
`guaranty` por `guarantee` (cinco veces), `Progenitors` por `parents`, `Phycologists` por
`Psychologists`, `ALEATORY catches` por `random searches`, `Animalistic` —que significa
bestial— por `animal rights activists`, `Richness` —que se dice de un sabor— por `Wealth`,
`in base that` por `on the basis that`, `affects dramatically the oceans` con el orden del
español.

Ninguno podía publicarse. Pero **casi todos son calcos del español**, es decir, exactamente lo
que produce un hispanohablante parafraseando bajo presión. Así que no se tiraron: cada uno
está en la sección de errores de su técnica, con el diagnóstico y la reparación. El documento
aportó el método y además el corpus de errores, que es la parte difícil de inventar.

### Dos decisiones que conviene no deshacer

**El ejercicio de reconocimiento va ANTES que el de producción.** Tres paráfrasis del mismo
original, solo una conserva el significado. El fallo característico de la paráfrasis no es
escribir mal: es escribir bien otra cosa. Quien no distingue «does not guarantee» de «never
brings» no lo arregla produciendo más frases.

**El motor practica sobre frases que no están en ninguna lección.** Es la corrección del
defecto que la auditoría de agosto de 2026 encontró en las ocho unidades de Task 1, donde
entre el 8 % y el 91 % de las respuestas del motor estaban impresas en su propia lección.

## Lo que vigila la compuerta

`npm run check:ielts-task2` mide, sobre esta unidad:

1. **Fuga** — ninguna frase del motor solapa ≥70 % con el texto de las lecciones, y ningún
   ejercicio de una técnica repite un ejemplo resuelto de esa misma técnica.
2. **Silueta** — ninguna correcta saca 3 palabras o más al mejor distractor, y ninguna es
   estrictamente la más larga en más de la mitad de un banco.
3. **Motivos** — cada opción con el suyo, ninguno repetido, cuatro opciones por ejercicio.
4. **Reconocimiento** — tres opciones y exactamente una que conserva el significado.
5. **Riesgo** — cada técnica con al menos un movimiento marcado como `trap`.
6. **Reparto** — los dos clientes reparten con `placeOption(...)`, no con una rotación.

Las seis se probaron por mordida el 12 de agosto de 2026: se reintrodujo cada defecto y la
compuerta lo cazó. La sexta se escapó al primer intento porque la mordida estaba mal hecha
—`synonyms` tiene dos movimientos `trap` y solo se cambió uno—, no porque la regla fallara.

### Un umbral que se corrigió, no se bajó

La primera versión de la regla de silueta contaba `correcta === Math.max(...)`, lo que marca
como defectuoso un banco cuyas cuatro opciones miden lo mismo. Cuatro opciones de doce
palabras no delatan nada: la silueta solo funciona cuando **una** sobresale. Se cambió a
estrictamente mayor. Medido sobre los 32 bancos, la versión anterior acusaba a nueve
ejercicios de los que siete estaban empatados.

## Academic vocabulary — lo que se construyó

Ruta: `/practica/ielts/academic/writing/task2/academic-vocabulary`

Pedido por David en agosto de 2026: «vocabulario organizado mostrando la funcionalidad y la
importancia de usar vocabulario avanzado para subir la banda».

### Por función, no por tema

Todo el material del mercado va por tema. `Cambridge Vocabulary for IELTS` (Pauline Cullen,
2008) tiene veinte unidades temáticas, de «Growing up» a «The arts». Ese reparto sirve para
leer y no sirve para escribir: delante de un enunciado sobre coches eléctricos nadie se
pregunta qué palabras sabe de transporte, se pregunta cómo se dice que algo probablemente pasa
pero no siempre. Eso es una **función**, y ningún índice temático la contiene.

Del libro se tomó la cobertura, no el texto —está bajo copyright estricto y no se reproduce
nada—. Su única tabla funcional (Unit 24, los conectores por función) es además exactamente lo
que ya cubren las siete familias de `linking-language`, así que **conectar no está** entre las
ocho. La compuerta lo impide explícitamente.

| Función | Ruta | Qué hace |
|---|---|---|
| Hedging | `/hedging` | baja la temperatura de una afirmación |
| Asserting | `/asserting` | la sube, donde la evidencia lo permite |
| Attributing | `/attributing` | dice de quién es cada idea |
| Quantifying | `/quantifying` | dice cuántos, sin inventar cifras |
| Causing | `/causing` | dice hacia dónde apunta la flecha |
| Evaluating | `/evaluating` | juzga, y nombra en qué respecto |
| Proposing | `/proposing` | dice qué hacer, con actor y mecanismo |
| Register | `/register` | mantiene la formalidad que la tarea espera |

### La banda, sin números

David pidió enseñar la importancia de subir la banda. No se hace con números: ninguna página
del curso puede prometerle una nota a nadie, y la compuerta lo impide desde que se escribió.

Se hace con el campo `upgrade`, que enseña **la misma frase en versión vaga y precisa** y
nombra qué gana —precisión, colocación, registro, rango—, que es lo que el criterio de Lexical
Resource mira de verdad. Un número sin explicación no enseña a escribir; ver que «is a big
problem for» se convierte en «poses a measurable risk to», y por qué, sí.

La compuerta comprueba que `earns` no contenga ningún dígito.

### El patrón importa más que la palabra

Cada una de las 48 entradas lleva su `pattern`: la construcción que exige. «Tend to» pide
infinitivo sin «to», «detrimental» pide «to» y no «for», «subsidise» no pide preposición
ninguna. Saber la palabra y no su patrón es exactamente lo que produce «detrimental for»,
«subsidise to families» y «tend to investing» — y una palabra rara en el patrón equivocado
puntúa peor que la palabra llana en el correcto. La compuerta falla si una entrada se publica
sin patrón.

## Lo que queda abierto

- Las ocho fichas sin recorrido propio siguen enlazando a su etapa. Antes de convertir alguna,
  pasarla por las tres condiciones de arriba.
- Tres de esas ocho (`Explanation and development`, `Examples and evidence`, y las mejoras de
  `Academic vocabulary`) apuntan a contenido que en agosto de 2026 solo existe en la rama
  `codex/ielts-task2-introduction-pilot`. En producción llevan a una página que todavía no
  tiene lo que la ficha promete.
