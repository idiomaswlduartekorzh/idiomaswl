# Loop de cierre — IELTS Academic Writing Task 1

Mismo método que [`ielts-task2-loop.md`](ielts-task2-loop.md), que cerró sus once unidades.
Cada iteración toma **una unidad**, le pasa **las cuatro auditorías**, y solo la da por
cerrada cuando pasan las cuatro. El loop termina con las catorce cerradas.

---

## Cómo usarlo

```bash
/loop Continúa el cierre de IELTS Task 1 siguiendo docs/ielts-task1-loop.md. Toma la
siguiente unidad abierta del tablero, pásale las cuatro auditorías, arregla lo que falle y
actualiza el tablero. No commitees ni publiques sin aprobación.
```

---

## Antes de empezar: lo que ya está cerrado para las catorce

El 12 de agosto de 2026 se pasó una auditoría **transversal** a los nueve bancos de
preguntas de Task 1 —100 preguntas—, porque los defectos que miden son propiedades del
conjunto y no se ven unidad a unidad. Resultado y compuerta en
[`scripts/check-ielts-task1-alignment.mjs`](../scripts/check-ielts-task1-alignment.mjs),
enganchada al `prebuild`.

| | Antes | Ahora |
|---|---|---|
| La correcta es la más larga | 42 % (84 % en los cinco motores principales) | **30 %** (el azar está en 25-33 %) |
| Preguntas donde saca 3+ palabras al mejor distractor | **25** | **0** |
| `overview/Content.tsx`: la correcta es la opción A | **6 de 6** | 2/2/2 |
| `tendencias/Content.tsx`: la correcta llega a la C o la D | **nunca** | 3/3/1/2 |
| `mapas`: acertar eligiendo siempre la más larga | **75 %** | 42 % |
| Áreas de escritura con corrector ortográfico | 2 | **0** |

Los dos sesgos de posición se corrigieron con `placeOption` de
[`@/lib/practica/shuffle-options`](../src/lib/practica/shuffle-options.ts), el mismo
ayudante que ya usaban vocabulario y escucha. Las respuestas nuevas van por ahí.

**No hace falta volver a medir estas cinco cosas unidad por unidad**: la compuerta las mide
en cada build, sobre el árbol entero, y está probada con cinco mordidas.

---

## Tablero

Marca cada casilla solo cuando la auditoría pase entera. `—` = no evaluado todavía.

| # | Unidad | Código | Pedagógica | Usuario | Playwright |
|:-:|---|:-:|:-:|:-:|:-:|
| 1 | **introduccion** | ✅ | ✅ | ✅ | ✅ 6/6 |
| 2 | **overview** | ✅ | ✅ | ✅ | ✅ 5/5 |
| 3 | **body-1** | ✅ | ✅ | ✅ | ✅ 5/5 |
| 4 | **body-2** | ✅ | ✅ | ✅ | ✅ 5/5 |
| 5 | **tendencias** | ✅ | ✅ | ✅ | ✅ 5/5 |
| 6 | **comparaciones** | ✅ | ✅ | ✅ | ✅ 5/5 |
| 7 | **procesos** | ✅ | ✅ | ✅ | ✅ 5/5 |
| 8 | **mapas** | ✅ | ✅ | ✅ | ✅ 5/5 |
| 9 | vocabulario | — | — | — | — |
| 10 | graficos-lineales | — | — | — | — |
| 11 | graficos-de-barras | — | — | — | — |
| 12 | pie-charts | — | — | — | — |
| 13 | tablas | — | — | — | — |
| 14 | tarea-completa | — | — | — | — |

El orden es el del recorrido del estudiante: primero las cuatro partes de la respuesta
(introducción, overview, Body 1, Body 2), luego las cinco micro-habilidades que las
alimentan, luego los cuatro tipos de gráfico, y al final la tarea entera contra reloj.

---

## Las cuatro auditorías

### 1 · Código

Falla si encuentra cualquiera de esto:

- **Emparejamiento por posición.** `lista[i]` cruzando dos colecciones paralelas,
  `examples[(level + n) % length]`, `.map((x, i) => otra[i])`. El enunciado, el modelo y el
  feedback tienen que salir de la MISMA fuente.
- **Campos muertos.** Declarados en el tipo, nunca renderizados, o copiados de otro campo.
- **La respuesta a la vista.** El contexto impreso encima de las opciones no puede ser la
  respuesta, ni el ejercicio puede usar un ejemplo que ya está resuelto más arriba.
- **Distractores excluidos por construcción.** `filter(...).slice(0, 3)` deja siempre fuera
  a los últimos: esa opción solo aparece cuando es la correcta.
- **Rotación cíclica** en vez de `placeOption` de `@/lib/practica/shuffle-options`. Si la
  unidad tiene su propio reordenador, tiene que estar en el registro de la compuerta.

Cierre: `npx tsc --noEmit`, `npm run check:ielts-task1`, `npm run build`, y `npx eslint`
sobre los ficheros tocados con **0 errores**.

### 2 · Pedagógica

- **Ejemplo trabajado antes de practicar.** Watch one, then you try. Si el alumno produce
  antes de haber visto uno resuelto, la unidad no pasa.
- **Cero evaluación falsa.** Ningún mensaje afirma corrección de un texto libre. Comprobar
  además que la rama de fallo sea ALCANZABLE: si el botón está bloqueado bajo el umbral y
  pulsarlo es la única forma de evaluar, el veredicto negativo es código muerto.
- **Feedback por opción.** Cada distractor explica por qué falla ÉL, no una frase común.
- **Sin atajos.** Medir, no estimar. Lo transversal ya lo cubre la compuerta; aquí toca
  mirar lo propio de la unidad: distractores reciclados entre sus ejercicios y delatores de
  forma (verbo en otra persona, registro más académico, la única opción con cifras).
- **Se produce todo.** Si la unidad enseña tres movimientos, el alumno escribe los tres.

### 3 · Usuario

La prueba: **¿lo entiende un estudiante, no un experto?**

- Ninguna instrucción con jerga interna. Se sustituye por preguntas directas.
- **Todo mínimo se anuncia antes de escribir**, con contador en vivo y cuántas palabras
  faltan: `Minimum 20 words · 7 to go`.
- **Ningún botón bloqueado sin decir por qué.**
- Todo el contenido de IELTS **en inglés**. El FAQ se queda en español a propósito: es la
  superficie de búsqueda y responde a lo que un estudiante colombiano escribe en Google.
- **Ninguna promesa de banda.** Nada de «Band 7» sobre un texto que la página no lee.

### 4 · Playwright

`BASE_URL=http://localhost:3011 npx playwright test tests/e2e/ielts-task1-<unidad>.spec.ts`

- Pulsar **todos** los botones, recorrer **todos** los niveles, abrir **todos** los modelos.
- Fallar a propósito en opciones distintas y comprobar que las explicaciones son
  **distintas entre sí**.
- Comprobar que el contador sube y que el botón se desbloquea en el número anunciado.
- Móvil (375) y escritorio (1280).
- **Consola sin errores propios** (filtro compartido en `tests/e2e/consola-ajena.ts`).
- **Cada test se muerde**: se reintroduce el defecto que vigila y tiene que ponerse rojo. Un
  test que no se ha visto fallar no prueba nada.

El servidor no se levanta desde el test: esta máquina tiene 8 GB. Arráncalo aparte en el
3011 —el 3012 suele estar ocupado por otra sesión— y mátalo por puerto, nunca con
`pkill -f "next dev"`, que se lleva por delante el de las demás.

---

## Trabajo pendiente por unidad

### 1 · introduccion — CERRADA

| | Antes | Ahora |
|---|---|---|
| Respuestas del motor ya impresas en la lección | **10 de 11** (5 palabra por palabra) | **0 de 12** |
| Ejemplos que enseñan un gráfico que no es el suyo | **3 de 30** | **0** |
| Ejemplos que enseñan el enunciado original | **0** | 30 |
| Explicación por opción | 1 para las 3-4 | **una por opción**, y salen todas |
| La respuesta correcta al fallar | no se enseñaba | frase entera + segunda versión válida + sustituciones |
| «Check answer» con huecos vacíos | **se podía** | bloqueado, y dice cuántos faltan |
| Botón bloqueado sin explicación | sí | `2 blanks still to fill` |
| Posición de la respuesta en los huecos | 6/5/1 | repartida por `placeOption` |
| Marcador al repetir el motor | llegaba a 8/4 | tope en el total |
| Español en contenido de IELTS | «Enunciado», «Bloque 1» | ninguno |

**La causa raíz era estructural.** El *Visual Lab* tiene 30 gráficos; la lección los trabajaba
los 30 con su paráfrasis escrita, y el motor practicaba sobre esos mismos 30. Por eso la
respuesta estaba siempre arriba. Ahora hay una sola fuente
([`introduction-data.ts`](../src/app/\(site\)/practica/ielts/academic/writing/task1/introduccion/introduction-data.ts)):
la lección enseña resueltos **3 por tipo** (18) y el motor practica sobre los **otros 12**. No
se ha borrado ninguna paráfrasis: doce se han movido de encima del ejercicio a debajo, que es
donde sirven.

Los tres ejemplos desparejados venían del mismo sitio: `<Chart variant={exampleIndex} />`
contra un texto escrito en otra lista. Ahora la variante viaja dentro del propio ejemplo.

**Dos fallos de la compuerta que salieron aquí**, los dos arreglados:

1. Al cambiar la forma del dato, dejó de reconocer el banco de esta unidad: el total bajó de
   100 preguntas a 93 y **siguió en verde**. Ahora una forma de `options` que no sepa leer
   para el build.
2. Buscaba el reordenador en el propio fichero, y aquí los datos y el componente están
   separados. El registro admite ya `{ llamada, en }`.

**Y tres de mis seis tests no probaban lo que decían.** Lo destapó la prueba de mordida:
uno leía el `body` de entrada cuando la lección enseña un ejemplo cada vez; otro leía el
primer `<svg>` de la página, que es de otra sección; y el del marcador daba una sola vuelta,
cuando el defecto solo aparece en la segunda. Un cuarto no veía «ENUNCIADO» porque el CSS lo
pone en versalitas e `innerText` devuelve el texto ya transformado.

### 2 · overview — CERRADA

| | Antes | Ahora |
|---|---|---|
| Respuestas del motor ya impresas en la lección | **6 de 15** (2 palabra por palabra) | **0 de 15** |
| Explicación por opción | 1 para las 4 | **una por opción**, salen todas |
| Reparto de la respuesta | rotación cíclica (`shift = [1,3,0,2][seed % 4]`) | `placeOption` |
| Marcador al repetir | seguía sumando: 8/5 | tope en el total |
| Botón bloqueado sin explicación | sí | «Choose an option first» |
| El overview modelo del gráfico practicado | solo arriba | se enseña al comprobar |

**La misma causa que la unidad 1**, y la misma corrección: la lección resolvía los 30
gráficos y el motor practicaba sobre esos mismos 30. Ahora resuelve **3 por tipo** (18) y el
motor usa **los otros 12**, con 15 ejercicios repartidos entre ellos.

El enunciado de cada gráfico se ha sacado a
[`task1-visuals.ts`](../src/app/\(site\)/practica/ielts/academic/writing/task1/task1-visuals.ts),
común a todo Task 1: se escribe una vez y las unidades lo piden. La introducción ya lo usa.

**Por qué la rotación no vale**, que es lo que enseñó la mordida: `rotateOptions` repartía
las letras *perfectamente* —DBACD BACDB ACDBA, las cuatro, tres secuencias distintas—, así
que un test que solo mire la letra la da por buena. Lo que una rotación no hace es cambiar el
**orden relativo de los distractores**: el que inventa una causa sale siempre a la misma
distancia de la buena. El test mide ahora eso, y con la rotación puesta canta *15 de 15*.

**Y dos de mis cinco tests no miraban nada.** El selector de tipo de gráfico son botones, no
pestañas, así que el bucle recorría cero elementos y las comprobaciones pasaban en vacío; lo
destapó una guarda de conteo, no la suerte. El otro leía el `body` entero, que incluye el
propio motor: el test se acusaba a sí mismo de filtrar la respuesta.

### 3 y 4 · body-1 y body-2 — CERRADAS

Las dos páginas son el mismo componente con `body={1}` y `body={2}`, así que se auditaron a la
vez. Los tests recorren las dos por separado.

| | Antes | Ahora |
|---|---|---|
| Gráficos compartidos con la lección | **los 6 de 6** | 0 |
| Respuestas que solapaban un párrafo modelo | **5 de 12** (una palabra por palabra) | 0 |
| Explicación por opción | 1 para las 4 | una por opción |
| Reparto de la respuesta | rotación cíclica (`shift = [2,0,3,1]`) | `placeOption` |
| El último ejercicio del nivel | decía «Next exercise →» y daba la vuelta en silencio | «Start this level again →» |
| Botón bloqueado sin explicación | sí | «Choose an option first» |

El motor va **dentro** de la lección, así que el párrafo modelo estaba a un palmo del
ejercicio. Ahora la lección se queda con line 0, bar 0, pie 1, table 0, process 0 y map 0, y el
motor practica sobre line 1, bar 1, pie 4, table 1, process 1 y map 1.

**Aquí comparar textos no sirve.** En la introducción y en el overview la respuesta ES el
párrafo, así que una fuga se caza buscando la frase. En Body la respuesta es una estrategia
—«agrupa los dos que suben y apóyalos con dos cifras»— y el modelo la demuestra sin repetir
una palabra. Devolví el motor al gráfico de la lección y el test de fugas de texto siguió en
verde. La comprobación correcta es sobre el PAR (gráfico, variante), y vive en la compuerta,
donde es exacta. Mordida y cazada.

**La compuerta me cazó a mí.** Al escribir las 48 opciones nuevas, la correcta salió como la
más larga en **10 de 12** —cuatro de ellas destacando por 3 palabras o más—, que es justo el
defecto que llevo el día quitando de otros sitios. Corregido a 4 de 12, ninguna destaca. Una
compuerta no protege del pasado: protege de quien está escribiendo ahora.

**Un 404 que no era mío.** A media unidad, todo el subárbol `task1` empezó a devolver 404 con
código que compilaba. Era el manifiesto de `.next`, desincronizado después de tantos ficheros
nuevos; `rm -rf .next` y reiniciar lo arregló. Antes de buscar el fallo en lo recién escrito,
probar una ruta que no se haya tocado. Y ojo: `.next` es único del proyecto, así que borrarlo
obliga a recompilar al servidor de las demás sesiones.

### 5 · tendencias — CERRADA

| | Antes | Ahora |
|---|---|---|
| Gráficos compartidos con el ejercicio de selección | **los 5 de 5** | 0 (cuatro nuevos) |
| Explicación por opción | 1 para las 4 | una por opción |
| Marcador al repetir | seguía sumando | tope en el total |
| Botón bloqueado sin explicación | sí | «Choose an option first» |

**Una lección sobre cómo medir.** Comparando la respuesta del motor contra cada observación
del ejercicio por separado salía **1 de 9**, y parecía poca cosa. Pero la pregunta de nivel 3
pide «la versión más completa», y su respuesta —*all regions grew, North America remained
highest and the gap narrowed*— es la **suma exacta de las tres observaciones que el ejercicio
acaba de marcar como correctas**. Igual en el escenario de la energía.

Una respuesta compuesta no se parece a ninguna de sus partes, así que el solapamiento léxico
uno a uno no la ve. Cuando el ejercicio de arriba entrega las piezas, hay que comparar contra
las combinaciones, o —más simple y más seguro— **no compartir el material**.

Cuatro gráficos nuevos para el motor
([`tendencias-scenarios.ts`](../src/app/\(site\)/practica/ielts/academic/writing/task1/tendencias/tendencias-scenarios.ts)),
cada uno con un patrón distinto: saturación, anomalía con recuperación, cruce entre dos series,
y una que sube y vuelve a bajar. Sin observaciones: no hay nada que copiar.

**Escribir los distractores largos desde el principio funciona.** En Body los escribí cortos y
la compuerta me devolvió 10 de 12; aquí los escribí ya desarrollados y salió **1 de 9**, con
ventaja máxima de 1 palabra. Cuesta lo mismo hacerlo bien a la primera.

**Y el mismo tropiezo por tercera vez:** leer el `body` entero para buscar fugas recoge también
el motor, cuyas opciones SON las respuestas, así que el test se acusa a sí mismo. Aquí se
resta el texto del motor antes de comparar.

### 6 · comparaciones — CERRADA

| | Antes | Ahora |
|---|---|---|
| Gráficos compartidos con la lección | **los 20 de 20** | 0 (la lección se queda 12, el motor usa 8) |
| Respuestas que solapaban un modelo | **3 de 15** (una al 88 %) | 0 |
| Explicación por opción | 1 para las 4 | una por opción |
| Reparto de la respuesta | ninguno | `placeOption` |
| Campo muerto | `type Question` sin usar | fuera |

**Aquí el reparto era peor que una rotación.** `arrangeOptions` cogía los distractores **en el
orden en que estaban escritos** y se limitaba a insertar la correcta en un `slot` a mano. Una
rotación al menos desplaza el bloque; esto ni eso. El distractor que invierte la comparación
salía siempre en la misma posición relativa a la buena, en las quince preguntas.

El test que lo vigila no mira la letra —eso lo pasa cualquier reparto— sino si los
distractores conservan su orden escrito. Con la mordida puesta canta *15 de 15*.

**Escribir los distractores largos desde el principio, otra vez:** 2 de 15 con la correcta
más larga y ventaja máxima de 1 palabra, sin una sola pasada de corrección.

### 7 · procesos — CERRADA

| | Antes | Ahora |
|---|---|---|
| Respuestas contenidas en un párrafo modelo | **6 de 12** (cuatro al 100 %) | 0 |
| Explicación por opción | 1 para las 4 | una por opción |
| Reparto de los distractores | ninguno (`arrange` los dejaba en su orden) | `placeOption` |
| El gráfico de la lección | salía de la POSICIÓN del ejercicio | viaja en el dato |
| Último ejercicio / botón bloqueado | mudos | lo dicen |

**La corrección salió barata porque este motor no pinta gráfico: es texto.** Así que los doce
ejercicios se mudaron a procesos que la lección no trabaja —papel, chocolate, vidrio, lana,
cemento, aceite, sal y gusano de seda— y la lección **conserva sus cinco ejercicios de
escritura intactos**, que es lo que de verdad hace escribir al estudiante. En las unidades
anteriores hubo que repartir gráficos; aquí no hacía falta tocar la lección.

**Un fallo en el ayudante compartido, encontrado por un test de esta unidad.**
`placeOption` barajaba los distractores con la semilla `${seed}|distractores`, **sin el índice
de la pregunta**: todas las preguntas de una serie recibían la misma permutación, y con la
semilla de procesos esa permutación era la identidad. Los tres distractores salían en el orden
escrito en las doce preguntas.

La posición de la respuesta se repartía perfectamente —de eso se encarga `correctPosition`—,
así que **ningún test de letras lo habría visto**. Lo cazó el que compara el orden de los
distractores contra el orden escrito. Arreglado en
[`shuffle-options.ts`](../src/lib/practica/shuffle-options.ts), que usan Task 1 y Task 2: las
95 pruebas de las dos siguen en verde.

**Y una lección sobre el propio test:** comparaba fugas por subcadena exacta. «The flakes are
heated and turned into pellets» no es subcadena de «The flakes are then heated and turned into
plastic pellets», y es la misma frase. Ahora mide solapamiento de palabras, igual que la
compuerta.

### 8 · mapas — CERRADA

| | Antes | Ahora |
|---|---|---|
| Respuestas contenidas en una frase modelo | **5 de 12** (dos al 100 %) | 0 |
| Explicación por opción | 1 para las 4 | una por opción |
| Reparto de los distractores | ninguno (`arrange`) | `placeOption` |
| Último ejercicio / botón bloqueado | mudos | lo dicen |

Como en procesos, **el motor no pinta gráfico**, así que los doce ejercicios se mudaron a mapas
que la lección no trabaja —un hospital, una terminal de aeropuerto, un colegio, un muelle
industrial y una granja— y la lección conserva sus 25 frases modelo intactas.

La regla de la compuerta que ya existía para procesos se generalizó a las dos unidades: ninguna
opción del motor puede caber dentro de un modelo de su lección, medido por solapamiento de
palabras con carga.

**Tres intentos hasta que el test midió lo que dice medir.** El primero comparaba el enunciado
largo contra un título de tres palabras, así que el porcentaje salía siempre bajo y pasaba; el
segundo dividía al revés pero arrastraba los años del título («1990-2020»), que ningún enunciado
repite, y volvía a diluirse; el tercero saltaba en falso porque «Park changes» son dos palabras
y cualquier mención de un «car park» daba 1 de 2. Ahora mide cuánto del título aparece en el
enunciado, sin números, y solo para títulos de tres palabras o más.

Ninguno de los tres se habría notado sin la prueba de mordida: los tres estaban en verde.