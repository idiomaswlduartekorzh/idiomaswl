# Plan de módulo — `sat-set-1-m1`

**Variante: M1 (módulo de enrutamiento).** Dificultad **mixta**: 7 fáciles, 11 medios,
9 difíciles. Un M1 sin ítems difíciles no enruta a nadie, y uno sin fáciles hunde al
estudiante antes de medirlo.

Este plan no es el examen. Un examen completo son **tres módulos**: este M1, más
`sat-set-1-m2-facil` y `sat-set-1-m2-dificil`, que se planifican aparte y comparten la
misma estructura de dominios.

Base: `docs/sat-ingles-blueprint.md` §2 (verificado contra College Board el 18 ago 2026) y
`src/data/mocks/sat/module-types.ts` (de donde salen los identificadores de tipo, en
kebab-case, y los cuatro temas).

## Dos trampas que este plan ya provocó una vez

Las detectó el auditor de clave sobre el bloque de Craft and Structure ya escrito, y las dos
venían de la nota del plan, no del redactor. Quien escriba Information and Ideas, Standard
English Conventions y Expression of Ideas no debe repetir el patrón:

1. **Una opción que se cae por gramática se cae sin leer el texto** (era `q02`): si la
   sintaxis del hueco descarta dos opciones, el ítem mide dos opciones, no cuatro, y eso es
   justo lo que castiga la puerta 6 de §4.
2. **Un sinónimo parcial de la clave es una segunda clave** (era `q04`): el matiz no se
   defiende ante una reclamación, así que cada opción tiene que abrir una dimensión de
   significado distinta y la dificultad tiene que venir del texto, no de acercar el
   distractor a la clave.

En SEC la primera regla se aplica al revés y es la excepción: ahí la regla examinada *es* lo
que hace agramaticales a los distractores. En II y EOI vale tal cual — un distractor solo
puede fallar por contenido.

## Antes de escribir un solo ítem

- **27 ítems, todos puntuables.** No hay pretest.
- **Cada ítem lleva su propio texto.** Ninguna pregunta se enlaza con otra. El único ítem
  con dos textos es `q08` (cross-text-connections), y la **suma** de los dos debe caer en
  el rango.
- **Longitud del texto: 25–150 palabras de 6 caracteres** (caracteres totales ÷ 6,
  blueprint §2). No es una estimación a ojo.
- **La clave asignada aquí es la que sale.** Si un ítem "pide" otra letra, se reescribe el
  ítem, no el reparto. Corregir el reparto al final es exactamente lo que produce
  distractores forzados.
- **Todo original.** Cero textos, enunciados u opciones tomados de material de College
  Board, ni traducidos ni parafraseados de cerca.
- La clave puede ser la opción más larga en **≤ 8 de los 27** ítems (puerta 2 de §4).
  Repártelo tú al escribir; nadie va a poder arreglarlo después sin romper otra cosa.

## Reparto de dominios — exacto, no es un rango

| Dominio | Código | Ítems | % del módulo | Posiciones |
|---|---|---|---|---|
| Craft and Structure | CS | **8** | 29,6 % | q01–q08 |
| Information and Ideas | II | **7** | 25,9 % | q09–q15 |
| Standard English Conventions | SEC | **7** | 25,9 % | q16–q22 |
| Expression of Ideas | EOI | **5** | 18,5 % | q23–q27 |
| **Total** | | **27** | 100 % | |

## Orden

Entre dominios: **CS → II → SEC → EOI**.

Dentro de CS, II y EOI: **agrupado por tipo de ítem**, y dentro de cada grupo de menos a
más difícil. El orden de los tipos dentro del dominio sigue la convención WeLearn (el
orden en que los lista la tabla oficial), porque College Board no lo publica.

Dentro de SEC: **de menos a más difícil sin agrupar por tipo** — boundaries y
form-structure-sense van intercalados. Es la excepción, y es deliberada.

## El módulo

| nº | id | dominio | tipo | tema | dificultad | clave | nota para el redactor |
|---|---|---|---|---|---|---|---|
| 1 | q01 | CS | words-in-context | ciencia | 1 | B | Palabra frecuente cuyo sentido lo fija la oración que la contiene; el distractor más cercano es la acepción de diccionario más común. |
| 2 | q02 | CS | words-in-context | literatura | 1 | D | **BLOQUEADO tras tres versiones — leer R1 del blueprint §4 bis antes de reescribirlo.** La palabra examinada tiene que elegirse de modo que las CUATRO acepciones candidatas compartan el mismo régimen sintáctico en esa oración: las cuatro opciones deben producir una frase gramatical al sustituir. Ni *carried* ni *called* lo permiten en este pasaje. Modelo bueno: q01 (*support*, cuatro verbos transitivos). **Resuelto en la cuarta versión (19 ago 2026) sobre *stood***: Towered · Ranked · Remained · Perched, cuatro verbos intransitivos con complemento de lugar; clave D, sin tocar el pasaje ni el reparto. |
| 3 | q03 | CS | words-in-context | historia | 2 | A | La pista está una oración antes de la palabra, no en la misma; obliga a leer el párrafo, no la línea. |
| 4 | q04 | CS | words-in-context | humanidades | 3 | C | Palabra polisémica de registro académico. **Prohibidos los sinónimos parciales entre opciones**: con este texto, cualquier sinónimo parcial de la clave (*restraint*) se vuelve una segunda clave defendible. Las cuatro abren **dimensiones distintas** — ritmo de trabajo, disposición de las partes, parquedad de medios (clave) y precio —, de modo que cada una es descartable por una razón propia. La dificultad la sostienen dos cosas: la acepción académica de la palabra, alejada de la de diccionario, y que la clave **exige el párrafo entero** (el contraste que lo cierra), no una sola línea. |
| 5 | q05 | CS | text-structure-purpose | literatura | 1 | A | Función de una oración señalada dentro de un párrafo con un giro claro; la clave nombra qué hace la oración, no qué dice. |
| 6 | q06 | CS | text-structure-purpose | ciencia | 2 | B | Estructura global observación → hipótesis → prueba; los distractores describen bien una sola parte del texto y por eso fallan. |
| 7 | q07 | CS | text-structure-purpose | historia | 3 | D | El texto debe presentar dos posturas para que la pregunta de propósito tenga sentido; la clave describe qué hace el autor con la segunda. |
| 8 | q08 | CS | cross-text-connections | ciencia | 3 | C | Dos textos originales que comparten el objeto y difieren en la **interpretación**, no en los hechos; la pregunta pide cómo respondería el autor 2 a una afirmación concreta del texto 1. Suma de los dos textos dentro del rango de longitud. |
| 9 | q09 | II | central-ideas-details | humanidades | 1 | C | La idea central está enunciada en el cierre; los distractores son detalles verdaderos pero secundarios. |
| 10 | q10 | II | central-ideas-details | ciencia | 2 | A | La idea central no está en ninguna oración: hay que sintetizarla; ningún distractor puede contradecir el texto, solo estrecharlo o ampliarlo. |
| 11 | q11 | II | command-of-evidence-textual | literatura | 2 | B | Se afirma algo sobre la actitud del narrador y se pide qué detalle la sostiene; las cuatro opciones son detalles reales del texto y solo una sostiene la afirmación entera. |
| 12 | q12 | II | command-of-evidence-textual | historia | 3 | D | La afirmación es la conclusión de un historiador sobre una tendencia; los distractores apoyan una versión más débil o más amplia de esa conclusión. |
| 13 | q13 | II | command-of-evidence-quantitative | ciencia | 2 | A | **Lleva gráfico** (tabla o barras) con dos series; la clave exige comparar las dos, y un distractor debe ser un dato leído correctamente que no responde a la pregunta. |
| 14 | q14 | II | inferences | literatura | 2 | C | El texto se corta antes de la consecuencia y la clave la completa; lo implícito debe seguir del texto, no del mundo. |
| 15 | q15 | II | inferences | ciencia | 3 | B | La inferencia solo se sostiene combinando dos datos separados; el distractor más cercano se sigue de uno solo de ellos. |
| 16 | q16 | SEC | boundaries | historia | 1 | D | Regla: frontera entre dos oraciones independientes (empalme de comas). La más visible del bloque, va primera a propósito. |
| 17 | q17 | SEC | form-structure-sense | humanidades | 1 | B | Regla: concordancia sujeto-verbo con una frase preposicional interpuesta entre sujeto y verbo. |
| 18 | q18 | SEC | boundaries | ciencia | 2 | A | Regla: elemento no esencial delimitado por ambos lados; el hueco cierra el par que el texto ya abrió. |
| 19 | q19 | SEC | form-structure-sense | historia | 2 | C | Regla: tiempo verbal fijado por un marcador temporal del texto, no por el verbo de la oración vecina. |
| 20 | q20 | SEC | boundaries | humanidades | 2 | D | Regla: dos puntos tras oración completa para introducir una explicación; un distractor debe usar los dos puntos tras oración incompleta. |
| 21 | q21 | SEC | form-structure-sense | ciencia | 3 | A | Regla: modificador inicial no personal — el sujeto de la principal tiene que ser quien realiza esa acción; tres opciones son gramaticales y solo una no cuelga el modificador. |
| 22 | q22 | SEC | boundaries | historia | 3 | B | Regla: dos decisiones a la vez en la misma oración (subordinada intercalada + elemento no esencial); ninguna opción puede acertar las dos por casualidad. |
| 23 | q23 | EOI | rhetorical-synthesis | humanidades | 2 | C | Cuatro notas en viñetas y un objetivo explícito («presentar X a quien no lo conoce»); la clave usa dos notas y cumple el objetivo, los distractores usan notas correctas para otro objetivo. |
| 24 | q24 | EOI | rhetorical-synthesis | ciencia | 3 | A | El objetivo exige **comparar** dos resultados; los tres distractores cumplen la mitad del objetivo, que es el error real del estudiante que lee las viñetas y no el encargo. |
| 25 | q25 | EOI | transitions | humanidades | 1 | D | Contraste explícito entre dos oraciones vecinas; ningún otro conector del grupo debe encajar. |
| 26 | q26 | EOI | transitions | historia | 2 | B | Relación de consecuencia donde la causa está dos oraciones antes; el distractor más cercano es un conector de adición que suena bien al leer solo la frase anterior. |
| 27 | q27 | EOI | transitions | humanidades | 3 | C | Concesión seguida de matiz: dos conectores contrastivos deben parecer plausibles y solo la dirección del argumento decide. |

## Qué mueve la dificultad en este módulo

M1 mezcla los tres niveles a propósito. Lo que separa un 1 de un 3 aquí **no** es enrevesar
el enunciado: es el texto y la distancia entre opciones.

- **Dificultad 1 (7 ítems: q01, q02, q05, q09, q16, q17, q25).** Texto de frases cortas y
  léxico frecuente sobre tema concreto. La respuesta está en una oración señalada. Los
  distractores son claramente falsos con el texto delante. Enunciado directo, sin
  metalenguaje.
- **Dificultad 2 (11 ítems: q03, q06, q10, q11, q13, q14, q18, q19, q20, q23, q26).**
  Alguna subordinación, léxico de divulgación. Hay que juntar dos partes del texto o leer
  el párrafo entero. El mejor distractor es verdadero pero incompleto.
- **Dificultad 3 (9 ítems: q04, q07, q08, q12, q15, q21, q22, q24, q27).** Sintaxis densa,
  léxico académico, tema abstracto o dos textos. La clave y el distractor más cercano se
  separan por un matiz: alcance, dirección del argumento o quién es el sujeto. En SEC, dos
  reglas en la misma oración.

La curva sube dentro de cada grupo de tipo (CS, II, EOI) y a lo largo del bloque SEC
completo. Entre grupos puede bajar —q05 es más fácil que q04, y es correcto—: manda la
agrupación por tipo.

## Recuentos — para comprobar de un vistazo

### Claves (puerta 1: cada letra 20–30 %, nunca tres iguales seguidas)

| Letra | Veces | % | Ítems |
|---|---|---|---|
| A | 7 | 25,9 % | q03, q05, q10, q13, q18, q21, q24 |
| B | 7 | 25,9 % | q01, q06, q11, q15, q17, q22, q26 |
| C | 7 | 25,9 % | q04, q08, q09, q14, q19, q23, q27 |
| D | 6 | 22,2 % | q02, q07, q12, q16, q20, q25 |
| **Total** | **27** | 100 % | |

Secuencia en orden de módulo:

`B D A C A B D C · C A B D A C B · D B A C D A B · C A D B C`

Única repetición contigua: q08–q09 (C, C), y q10 rompe. **Cero tríos.** Por dominio el
reparto también queda repartido: CS 2/2/2/2, II 2/2/2/1, SEC 2/2/1/2, EOI 1/1/2/1.

### Temas (puerta 12: ninguno por encima del 40 %, es decir ≤ 10 de 27)

| Tema | Ítems | % |
|---|---|---|
| ciencia | 9 | 33,3 % |
| historia | 7 | 25,9 % |
| humanidades | 7 | 25,9 % |
| literatura | 4 | 14,8 % |
| **Total** | **27** | 100 % |

Literatura se concentra en CS e II (q02, q05, q11, q14) a propósito: los ítems de SEC y
EOI se apoyan en textos informativos, y forzar prosa literaria ahí produce ítems falsos.
Ningún tema aparece dos veces seguidas en todo el módulo.

### Tipos

| Dominio | Tipo | Ítems |
|---|---|---|
| CS | words-in-context | 4 |
| CS | text-structure-purpose | 3 |
| CS | cross-text-connections | 1 |
| II | central-ideas-details | 2 |
| II | command-of-evidence-textual | 2 |
| II | command-of-evidence-quantitative | 1 |
| II | inferences | 2 |
| SEC | boundaries | 4 |
| SEC | form-structure-sense | 3 |
| EOI | rhetorical-synthesis | 2 |
| EOI | transitions | 3 |
| | **Total** | **27** |

### Dificultad

| Nivel | Ítems | % |
|---|---|---|
| 1 fácil | 7 | 25,9 % |
| 2 medio | 11 | 40,7 % |
| 3 difícil | 9 | 33,3 % |
| **Media** | **2,07** | |

Un solo ítem con gráfico: `q13`. Un solo ítem con par de textos: `q08`.
