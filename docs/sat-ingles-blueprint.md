# SAT de inglés — blueprint y puertas de calidad

Fuente de verdad para todo lo que la red de agentes escribe, audita y publica sobre el SAT.
Si un agente y este documento se contradicen, manda este documento. Si este documento y
College Board se contradicen, manda College Board **y hay que corregir este documento**.

Estado: **§2 verificado contra la fuente oficial el 18 de agosto de 2026.** Ver §1 y las
fuentes al final de §2.

---

## 1. Lo primero, antes de escribir un solo ítem

Los números de §2 venían de conocimiento general del SAT digital. **No se produce un examen
entero sobre números sin verificar**: se han rehecho lotes completos en este repo por dar
por buena una cifra de memoria.

**Hecho el 18 de agosto de 2026.** Se leyeron el *Assessment Framework for the Digital SAT
Suite* (v3.01, agosto 2024), el *Specifications Overview* y la *2026-27 SAT Weekend Student
Guide* (© 2026). Los ocho parámetros de §2 quedan con ✅ y fecha, salvo uno que College
Board no publica y va marcado ⚠️. Un dato estaba mal y se corrige abajo, con la línea que
dice qué decía antes.

La verificación caduca: si alguien produce contenido después de agosto de 2027, vuelve a
comprobar contra `satsuite.collegeboard.org` antes de escribir.

## 2. Parámetros del examen — sección Reading and Writing

| Parámetro | Valor | Verificado |
|---|---|---|
| Módulos | 2, adaptativos por etapas (*multistage adaptive testing*): el módulo 2 se enruta según el rendimiento en el 1 | ✅ 2026-08-18 |
| Preguntas por módulo | 27 = **25 operativas + 2 de prueba (*pretest*)** | ✅ 2026-08-18 |
| Total sección | 54 preguntas (50 operativas + 4 pretest) / 64 min | ✅ 2026-08-18 |
| Tiempo por módulo | 32 min | ✅ 2026-08-18 |
| Tiempo medio por pregunta | 1,19 min (cifra que publica College Board) | ✅ 2026-08-18 |
| Formato de ítem | **Discreto**: cada pregunta lleva su propio texto (o par de textos) y ninguna pregunta se enlaza con otra. Opción múltiple de **cuatro opciones** con una sola clave | ✅ 2026-08-18 |
| Longitud del texto | 25–150 palabras, donde «palabra» = **6 caracteres**: se cuentan los caracteres totales (letras, números, espacios y signos de puntuación) y se dividen entre 6. En un par de textos, la suma de los dos debe caer dentro del rango | ✅ 2026-08-18 |
| Materias de los textos | Literatura, historia/estudios sociales, humanidades, ciencia | ✅ 2026-08-18 |
| Complejidad del texto | Tres bandas: grados 6–8, grados 9–11 y grados 12–14. El SAT **no restringe** por banda; las tres pueden aparecer (la de 12–14 solo se excluye del PSAT 8/9) | ✅ 2026-08-18 |
| Gráficos | Textos seleccionados van acompañados de un gráfico informativo: tabla, gráfico de barras o gráfico de líneas | ✅ 2026-08-18 |
| Puntuación de la sección | 200–800, en intervalos de 10 puntos | ✅ 2026-08-18 |
| Puntuación total del examen | 400–1600, en intervalos de 10 puntos (RW + Math) | ✅ 2026-08-18 |
| Navegación | Libre dentro de un módulo; una vez pasado al módulo 2 no se puede volver al 1 | ✅ 2026-08-18 |

Nota sobre los textos de literatura: en el examen real se toman de obras publicadas de
terceros; el resto se escribe expresamente para el examen. WeLearn escribe **todo**
original (§5); la literatura se resuelve con prosa original de registro literario o con
dominio público, nunca con extractos con derechos.

### Dominios: pesos oficiales

⚠️ **Corrección.** Este documento decía antes «Ítems (de 27): 13–15 / 12–14 / 11–15 / 8–12».
Era un error de lectura: esos rangos son **del examen completo** —los 50 ítems operativos de
los dos módulos juntos—, no de un módulo de 27. La fuente lo dice literalmente: la tabla
recoge «the distribution of operational (scored) questions by domain **on each test form**».

| Orden | Dominio | Peso | Ítems operativos por examen (de 50) | Tipos (*skill/knowledge testing points*) | Verificado |
|---|---|---|---|---|---|
| 1.º | Craft and Structure | ≈28 % | 13–15 | Words in Context · Text Structure and Purpose · Cross-Text Connections | ✅ 2026-08-18 |
| 2.º | Information and Ideas | ≈26 % | 12–14 | Central Ideas and Details · Command of Evidence (Textual, Quantitative) · Inferences | ✅ 2026-08-18 |
| 3.º | Standard English Conventions | ≈26 % | 11–15 | Boundaries · Form, Structure, and Sense | ✅ 2026-08-18 |
| 4.º | Expression of Ideas | ≈20 % | 8–12 | Rhetorical Synthesis · Transitions | ✅ 2026-08-18 |

### Reparto por módulo que usa WeLearn — derivado, no oficial

College Board publica el reparto por examen, no por módulo; solo dice que los cuatro
dominios aparecen en **cada** módulo. Nuestros módulos son de 27 ítems, todos puntuables
(no metemos pretest), así que el reparto sale de aplicar los pesos oficiales a 27:

| Dominio | Peso oficial | Ítems por módulo (de 27) | % real | Estado |
|---|---|---|---|---|
| Craft and Structure | ≈28 % | **8** | 29,6 % | derivado |
| Information and Ideas | ≈26 % | **7** | 25,9 % | derivado |
| Standard English Conventions | ≈26 % | **7** | 25,9 % | derivado |
| Expression of Ideas | ≈20 % | **5** | 18,5 % | derivado |
| **Total** | | **27** | | |

8/7/7/5 es la **única** combinación de enteros que suma 27 y deja los cuatro dominios a
±2 puntos porcentuales de su peso oficial. No es un rango: es el reparto. Un plan de módulo
que proponga otro se rechaza.

### Orden dentro del módulo

Entre dominios, la secuencia es fija y **la misma en el módulo 1 y en el 2**:

**Craft and Structure → Information and Ideas → Standard English Conventions → Expression
of Ideas.** ✅ 2026-08-18

Dentro de cada dominio:

- En Craft and Structure, Information and Ideas y Expression of Ideas los ítems se ordenan
  **primero por tipo de ítem** (se agrupan los que miden lo mismo) y **dentro de cada grupo**
  de más fácil a más difícil. ✅ 2026-08-18
- Standard English Conventions es la excepción: va de más fácil a más difícil **sin agrupar**
  por tipo. ✅ 2026-08-18
- ⚠️ El orden de los tipos dentro de un dominio (si Words in Context va antes que Text
  Structure and Purpose, por ejemplo) **no lo publica College Board**: no verificado,
  producir bajo riesgo. Convención WeLearn mientras tanto, para que los lotes sean
  comparables entre sí: seguir el orden en que la tabla oficial de arriba los lista.

⚠️ **Corrección.** Antes se decía «los ítems van agrupados por dominio y, dentro de cada
dominio, de menos a más difícil». Es incompleto en dos puntos: la agrupación fina es por
tipo de ítem dentro del dominio, y Standard English Conventions no se agrupa.

### Módulo 1 vs módulo 2

- **Módulo 1 (de enrutamiento)**: mezcla amplia de ítems fáciles, medios y difíciles.
  ✅ 2026-08-18
- **Módulo 2**: también lleva mezcla de fáciles, medios y difíciles; lo que cambia es la
  **dificultad media**, más alta o más baja según el rendimiento en el módulo 1.
  ✅ 2026-08-18

Esto último importa para escribir: **M2-difícil no es «27 ítems difíciles»**, es un módulo
con la misma estructura de dominios y una media más alta. Un M2-difícil sin ítems fáciles
no reproduce el examen.

La puntuación de la sección se calcula con **todas las preguntas operativas de los dos
módulos**. ✅ 2026-08-18

Un examen completo son por tanto **tres módulos escritos**: M1, M2-fácil, M2-difícil.

Existe además una versión **no adaptativa** (para estudiantes con ciertas adaptaciones), con
algunas preguntas más por módulo; sus especificaciones están en el apéndice E del Assessment
Framework. ✅ 2026-08-18 — no es lo que produce WeLearn.

### Fuentes

Leídas el 18 de agosto de 2026.

1. **`https://satsuite.collegeboard.org/media/pdf/assessment-framework-for-digital-sat-suite.pdf`**
   — *Assessment Framework for the Digital SAT Suite*, versión 3.01, agosto 2024. Es la
   fuente principal. De aquí salen: tabla 8 (estructura, 25 operativas + 2 pretest por
   módulo, 32 min, 200–800, cuatro opciones, 25–150 palabras, bandas de complejidad,
   materias); tabla 9 (secuencia de dominios en cada módulo); tabla 10 (pesos y rangos por
   dominio, con la frase «on each test form»); §3.1.1 (adaptatividad y navegación); §3.1.2
   (operativas vs pretest); §3.1.6 (ítem discreto de cuatro opciones); §3.1.8 (la palabra de
   6 caracteres); §3.1.10 (bandas de complejidad); §3.4 (origen de los textos de literatura).
2. **`https://satsuite.collegeboard.org/media/pdf/digital-sat-test-spec-overview.pdf`**
   — *The Digital SAT Suite of Assessments Specifications Overview*, verano 2022. Tabla 1
   (formato, longitud, tiempos, «Discrete; four-option multiple-choice», materias); tabla 2
   (dominios y distribución); el párrafo que fija la secuencia de dominios y el orden
   fácil→difícil; la tabla de escalas (400–1600 y 200–800 en intervalos de 10).
3. **`https://satsuite.collegeboard.org/media/pdf/sat-student-guide.pdf`**
   — *2026-27 SAT Weekend Student Guide*, © 2026 College Board. Confirma que **la estructura
   sigue vigente en el ciclo 2026-27**: 25 + 2 por módulo, 32 min, 54 preguntas, 1,19 min por
   pregunta, los rangos por dominio, «There is a single question per passage», y la
   existencia de la versión no adaptativa.
4. **`https://satsuite.collegeboard.org/sat/whats-on-the-test/structure`** — 54 preguntas y
   64 minutos en Reading and Writing, dos módulos de igual longitud, enrutamiento del
   módulo 2.
5. **`https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing`** — 25–150
   palabras, un texto (o par) por pregunta, los cuatro dominios, las cuatro materias, y el
   agrupamiento de fácil a difícil.
6. **`https://satsuite.collegeboard.org/k12-educators/about/alignment/reading`** — página
   viva de especificaciones: confirma en agosto de 2026 los pesos ≈28 / ≈26 / ≈26 / ≈20 y los
   tipos de ítem de cada dominio.

## 3. Contrato de datos del repo

El SAT reutiliza lo que ya existe; no se inventa un motor nuevo.

- Tipos: `src/data/mocks/types.ts` — los ítems son `MCQQuestion` (`type: 'mcq'`,
  `options: string[]`, `answer` 0-indexed), agrupados en `MockSection` (una por módulo).
- Ficha del examen: `src/data/exams.ts` → nueva entrada `sat` en `EXAMS`.
- Módulos: `src/data/mocks/sat/sat-set-N-<variante>.ts`, con la forma `SatModule` de
  `src/data/mocks/sat/module-types.ts` (27 ítems + 27 metadatos emparejados por `id`).
- Sets: se componen con `buildSatMock()` de `src/data/mocks/sat/build-sat-mock.ts` —
  M1 + una variante de M2— y se registran en `MOCK_REGISTRY` de `src/data/mocks/index.ts`
  con la clave `sat:<id>`.
- El builder pone solo el `part` y el `stimulusStyle: 'passage'`; sin ese estilo un texto
  de 150 palabras se pinta en monoespaciado y no hay quien lo lea.
- Ruta: `/examenes/sat/practica/[id]`, igual que IELTS y TOEFL.
- El texto de cada ítem va en `stimulus`; la pregunta en `text`.

Dos cosas que el motor actual **no** hace y hay que decidir antes de publicar:
adaptatividad entre módulos, y conversión a escala 200–800. Mientras no existan, un set
SAT es un simulacro lineal con puntaje bruto, y así hay que llamarlo en pantalla.

## 4. Puertas de calidad

Umbrales medidos sobre el conjunto, no ítem por ítem. Los implementa
`scripts/check-sat-exam.mjs` (✅ escrito el 18 ago 2026, probado contra nueve defectos
sembrados).

Ocho puertas son mecánicas y las mide el script. Cuatro —**4 clave única, 6 prueba a
ciegas, 10 equidad y 11 originalidad**— exigen criterio y no se pueden contar. Para esas,
el guardián no comprueba el contenido: comprueba que **el auditor pasó y firmó**, leyendo
`docs/sat-auditorias/<modulo>.json` (plantilla en esa misma carpeta). Un acta que falta es
un fallo, no una presunción de inocencia.

| # | Puerta | Umbral | Por qué |
|---|---|---|---|
| 1 | Reparto de la clave | Cada letra 20–30 % por módulo; nunca 3 iguales seguidas | Cinco series de este repo salieron con la correcta en A el 100 % de las veces |
| 2 | Longitud de la clave | La correcta es la opción más larga en ≤ 30 % de los ítems | Es la pista más explotada por quien no sabe la respuesta |
| 3 | Solape léxico, **por las dos caras** | La clave no puede ser la que más repite palabras del texto en > 40 % de los ítems, **ni la que menos** en > 40 % | Por arriba se acierta emparejando; por abajo, descartando lo que se parece al texto. Ver R4 |
| 4 | Clave única | Cero ítems con dos opciones defendibles | Un ítem con dos claves no mide nada |
| 5 | Distractores vivos | Cada distractor lleva escrito qué error del estudiante representa | Un distractor que nadie elegiría convierte un ítem de 4 en uno de 3 |
| 6 | Prueba a ciegas | Un solucionador que no ve el texto no pasa del 35 % | Azar = 25 %. Por encima de 35 % el ítem se resuelve sin leer. **Es la puerta que más cuesta pasar y la que decide el producto**: ver R8 |
| 7 | Longitud del texto | 25–150 palabras **de 6 caracteres** (caracteres totales ÷ 6, ver §2) | Parámetro oficial del examen, verificado 2026-08-18 |
| 8 | Mezcla de dominios | Exactamente 8 C&S / 7 I&I / 7 SEC / 5 EoI por módulo (§2) | Un simulacro desbalanceado da un diagnóstico falso |
| 9 | Curva de dificultad | Agrupado por tipo de ítem y, dentro del grupo, de menos a más; Standard English Conventions de menos a más sin agrupar (§2) | Es como está construido el examen real |
| 10 | Equidad | Cero ítems que exijan conocimiento cultural, regional o económico no dado en el texto | El estudiante es colombiano; el examen no puede medirle su geografía |
| 11 | Originalidad | Cero secuencias de 8+ palabras que coincidan con material publicado, **salvo los enunciados canónicos** (ver abajo) | Ni copiamos College Board ni fuentes con derechos |

**Excepción de la puerta 11, escrita porque casi detiene un lote entero.** Los enunciados
fijos de cada tipo de ítem —«Which choice completes the text so that it conforms to the
conventions of Standard English?», «As used in the text, what does the word … most nearly
mean?», «While researching a topic, a student has taken the following notes:»— se
reproducen **literalmente** por requisito de validez: un simulacro que pregunta con otras
palabras deja de parecerse al examen. Son frases funcionales cortas, hay fusión (no hay
otra manera de dar esa instrucción) y toda la industria las imprime igual. La puerta 11 se
aplica a los `stimulus` y a las `options`, que es donde vive el contenido.
| 12 | Variedad temática | Ningún tema (ciencia, humanidades, historia, literatura) por encima del 40 % de un módulo | El examen real reparte |

## 4 bis. Reglas de escritura que descubrió la producción

No estaban en ninguna especificación. Salieron de ítems que hubo que rehacer, y cada una
lleva el ítem que la enseñó.

### R1 · Un words-in-context solo funciona si las cuatro opciones comparten régimen

**Lo enseñó q02 de `sat-set-1-m1`, tres versiones seguidas.** Si dos opciones no pueden
ocupar sintácticamente el lugar de la palabra en su propia oración, el estudiante que
parsea la frase las descarta sin entender nada, y un ítem de cuatro opciones se convierte
en uno de dos: el azar sube del 25 % al 50 %.

- v1 examinaba *carried*: dos opciones transitivas en un hueco intransitivo.
- v2 cambió los distractores: dos dejaron de ser acepciones de *carry*, y se podaban con
  solo saber inglés.
- v3 movió la palabra a *called*: las cuatro son acepciones de manual, pero el hueco lleva
  una subordinada con *that*, y *named* y *summoned* exigen sintagma nominal. Mismo defecto
  que v1, con otras palabras.

**La regla:** elige la palabra examinada de forma que las cuatro acepciones candidatas
compartan la misma subcategorización —el mismo tipo de complemento— en esa oración
concreta. Después comprueba la sustitución una por una: las cuatro tienen que producir una
frase gramatical. El modelo bueno es **q01** del mismo bloque: *support* → Props up ·
Sustains · Endorses · Tolerates, cuatro verbos transitivos con objeto nominal, ninguno
podable sin leer.

Corolario práctico: los verbos con muchas acepciones suelen tener también muchos regímenes,
que es justo lo que rompe el ítem. Adjetivos y sustantivos polisémicos dan menos guerra.

### R4 · La puerta del solape léxico tiene dos caras, y arreglar una abre la otra

**Lo enseñó el bloque Information and Ideas de `sat-set-1-m1`, entero.** La instrucción
«parafrasea la clave y deja que un distractor repita el vocabulario visible» se cumplió a
rajatabla, y el resultado fue que la clave pasó a ser **la opción que menos palabras del
texto repite**, sistemáticamente: en 5 de 6 ítems. Un estudiante que no entienda una sola
palabra y solo cuente coincidencias con el texto acierta 5 de 6.

Es el mismo defecto que la puerta pretendía evitar, con el signo cambiado. Y no se ve ítem
por ítem: cada uno estaba bien. Solo se ve contando el conjunto, que es justo la lección
que este repositorio ya había pagado una vez con las cinco series cuya respuesta correcta
estaba siempre en la A.

`scripts/check-sat-exam.mjs` mide ahora las dos caras. Medido sobre los cuatro bloques del
M1 el día que se descubrió: Information and Ideas 57 % (falla), Craft and Structure 38 %
(pasa raspando), Standard English Conventions 0 %, Expression of Ideas 0 %.

### R5 · Los distractores tienen que compartir la FORMA de la clave

R1 dicho en general. No es solo la sintaxis: es **cualquier rasgo formal que permita
separar la clave del resto sin entender el contenido**. Los que aparecieron en una sola
noche de producción:

- La clave es la única con forma de tesis y las tres falsas son citas o detalles.
- La clave es la única que contiene un conector causal (*because*).
- La clave es la única no absoluta, y las falsas dicen *never*, *cannot*, *all*.
- La clave es la única que compara dos cosas, cuando el objetivo declarado pide comparar.
- La clave es la única cita en primera persona y la falsa en tercera.
- La clave es la única opción internamente coherente en puntuación (en convenciones).

**La comprobación es siempre la misma:** tapa el texto. Si con solo mirar la forma de las
cuatro opciones puedes eliminar una, el ítem no está terminado. Al menos dos distractores
tienen que compartir la forma definitoria de la clave y ser falsos por razones distintas.

### R6 · La falsedad de un distractor no puede vivir en la marca que lo delata

**Lo enseñaron los cuatro bloques del M1 a la vez.** El patrón: un distractor es falso
*porque* es absoluto («never», «cannot»), o *porque* habla del periodo equivocado, o
*porque* es un detalle en vez de una tesis. Pero eso mismo es lo que lo señala desde
fuera. Quien poda por esa marca **poda siempre bien**, sin leer una palabra.

Dicho al revés: si el rasgo que hace falsa a una opción es visible sin el texto, ese rasgo
es la respuesta. Hay que repartirlo — que alguna opción con forma de clave sea falsa, y
que alguna con forma de distractor sea verdadera pero no responda.

### R7 · Cada opción tiene que ser coherente consigo misma

**Lo enseñó Standard English Conventions.** Tres de las cinco podas del bloque eran de la
misma especie: una opción que se cae por su propio dibujo, sin necesidad del párrafo
—«minor however,», «which are:», «; which …;»—. Que una opción sea falsa **lo tiene que
decidir el párrafo, no la opción misma**.

### R8 · El juego de opciones se diseña antes de decidir cuál es la clave

Es la conclusión de las dos rondas de reescritura, y la que cambia el proceso, no el ítem.

Escribiendo como escribimos —sacar la clave del texto y después inventarle tres
distractores— la clave sale siempre siendo la opción «con forma de verdad», y las tres
falsas comparten un aire de familia que las delata. Por eso una reescritura completa del
bloque Information and Ideas solo bajó la prueba a ciegas del 71 % al 64 %: se arreglaron
los ítems uno a uno y el sesgo estaba en el método.

Lo que hay que hacer: **diseñar primero las cuatro opciones como cuatro objetos
indistinguibles entre sí** —misma forma, mismo alcance, mismo régimen, misma longitud
aproximada, misma relación aparente con el texto— y solo entonces decidir cuál de las
cuatro sostiene el texto. Si al terminar puedes decir cuál es la clave mirando solo la
lista, vuelve a empezar.

### R9 · La clave no puede ser la lectura más interesante

**Lo enseñó la ronda 2 de R8**, midiendo. R8 igualó la forma de las opciones y el panel
cayó de 68,5 % a 48,1 %: nueve ítems se arreglaron del todo (q01 pasó de 7 aciertos a
ciegas sobre 8 a 0; q07 y q20, de 8 a 1). Pero ocho no se movieron, y en los ocho el panel
converge en la clave con mayoría abrumadora aunque las cuatro opciones tengan ya la misma
forma, la misma longitud y el mismo alcance.

Lo que queda cuando la forma ya está igualada es el **registro intelectual**. Un
solucionador entrenado en exámenes elige la opción que suena a *lectura sofisticada*: la
que enuncia un giro conceptual en vez de un hecho, la que suena a lo que diría un profesor.
Y como quien escribe el ítem redacta la clave pensando en lo que el texto de verdad hace,
la clave sale siendo sistemáticamente la más interesante de las cuatro.

**La regla:** los tres distractores tienen que ser lecturas **igual de atractivas** —igual
de sofisticadas, igual de plausibles como interpretación culta— y ser falsas solo por lo
que dice el texto. Si al leer las cuatro una suena más «de examen» que las otras, esa es la
respuesta y el ítem no mide lectura.

Corolario que la ronda 2 también dejó claro: **el enunciado filtra tanto como las
opciones**. Un enunciado que declara la conclusión, o que nombra la relación que hay que
encontrar, permite deducir la clave sin el texto. El enunciado no es material protegido:
se puede y se debe recortar.

### R10 · La respuesta no puede ser deducible sin el texto

Es la última pista, la que queda cuando ya no queda ninguna de forma. **Lo enseñaron cuatro
ítems** que, con la forma igualada y el registro repartido, seguían siendo acertados por 13,
15 y hasta **16 de 16** solucionadores que no veían el texto.

Cuando el acierto es tan unánime, la pista no es superficial: la respuesta **se deduce
razonando** con lo visible. El enunciado plantea una situación y solo una opción es
coherente con el mundo, o con la lógica del propio enunciado, o con lo que cualquiera
esperaría de un texto así. El pasaje sobra.

**La regla:** al menos dos opciones tienen que ser igual de coherentes con todo lo visible,
y solo el texto puede decidir entre ellas.

Dos soluciones que funcionaron, y que valen como patrón:

- **El diseño factorial, en ítems con datos.** En `q13` los distractores salían de
  perturbar un número de la clave, así que los valores buenos aparecían dos o tres veces y
  los malos una: **la clave se votaba sola**. Se rehízo como un 2×2 exacto —cada valor
  aparece dos veces— y el recuento deja de decir nada. Es el mismo defecto de conjunto de
  siempre, escondido dentro de un solo ítem.
- **Que el mundo apunte a un distractor.** En `q09` la pregunta pedía la idea central, y la
  idea central de ese texto era la tesis museística de manual: se marcaba desde el
  conocimiento general. Reformulada, quien razona desde el mundo aterriza ahora en una
  opción falsa.

### R11 · En convenciones, las cuatro opciones tienen que ser correctas por separado

Descubierta midiendo el módulo 2 estándar: **cuatro de sus siete ítems de Standard
English Conventions los acertaban 7, 10, 10 y 10 solucionadores de 10 sin ver el texto.**
No era mala redacción. Era el diseño.

Si de las cuatro opciones solo una está bien formada aisladamente —`children's` frente a
`childrens'`, `childrens` y `children`— no hace falta la frase: se ve cuál es correcta
mirando solo las opciones. Lo mismo con los pares de comas, donde la opción «equilibrada»
se reconoce sola, y con la ausencia de coma, que es la apuesta segura de quien no lee.

La regla: **las cuatro opciones deben ser gramaticales en abstracto, y solo la oración
debe decidir cuál encaja.** `is` y `are` son las dos palabras correctas del inglés; el
sujeto decide. `childrens'` no es una palabra, así que ese ítem no mide lectura.

Consecuencia práctica: se examinan preferentemente concordancia con sujeto interpuesto,
tiempo verbal fijado por el contexto, referencia de pronombre y elección de conector
—donde las cuatro formas existen— antes que ortografía de posesivos o formas inventadas.

### R12 · En síntesis retórica, gana la opción que parece más completa

Misma medición: los dos ítems de síntesis de notas los acertaron **10 de 10 sin leer las
notas**, y en el módulo 1 el equivalente iba 13 de 14. Es el patrón más consistente que
ha dado la prueba a ciegas.

Sin las notas, el solucionador elige la frase que suena más redonda: la que enlaza dos
ideas con una cláusula causal, la que menciona más elementos, la que tiene forma de
conclusión. Y esa suele ser la clave, porque cumplir el objetivo del enunciado empuja al
redactor a escribirla más completa que las otras tres.

La regla: **las cuatro opciones tienen que parecer igual de completas**. Mismo número de
elementos de las notas, misma longitud aproximada, y —esto es lo que de verdad lo
arregla— **las cuatro con la misma forma sintáctica**: si la clave lleva cláusula causal,
las cuatro la llevan. Lo que separa a la clave no puede ser la forma, tiene que ser si
cumple el objetivo.

### R13 · Igualar la forma no sirve: lo que filtra es el sentido

Esta corrige a R12, que se quedó corta. Tras rehacer los ítems de síntesis con las cuatro
opciones en un molde único —misma palabra inicial, misma sintaxis, siete caracteres de
diferencia entre la más larga y la más corta— **el panel a ciegas siguió acertándolos 10
de 10**. La forma estaba igualada y no cambió nada, porque la fuga nunca fue la forma.

**En síntesis retórica, el objetivo viene escrito en el enunciado.** «El estudiante quiere
explicar por qué algunos oyentes no entienden un mensaje silbado». El solucionador lee eso
y busca la única opción que habla de alguien que no entiende un silbido. Las otras tres
hablaban de un grito, de una escuela y del origen de la práctica: son verdaderas según las
notas y **ajenas al objetivo**, y esa ajenidad se ve sin las notas.

Diseñar «las cuatro verdaderas, una sola relevante» produce ítems que se contestan sin
leer. Lo que hay que hacer es lo contrario:

> **Las cuatro opciones tienen que ser relevantes al objetivo. Solo las notas deben decidir
> cuál está sostenida.** Tres explicaciones plausibles de lo que el enunciado pide, que las
> notas no respaldan o contradicen, y una que sí.

**En estructura y función pasa lo mismo por el otro lado: gana la opción más general.** En
un ítem de estructura, la clave decía «cierra diciendo qué cambia el registro nuevo y qué
no», y las tres distractoras nombraban contenidos concretos. Una descripción que encaja en
casi cualquier texto de esa forma es siempre la apuesta segura del que no ha leído. Lo
mismo con función: de cuatro funciones posibles, la que describe un texto **bien hecho**
se adivina, porque los textos bien hechos son predecibles.

> **Todas las opciones al mismo grado de concreción, y cada distractor tiene que ser una
> descripción impecable de un texto ligeramente distinto** — no una descripción torpe del
> texto que hay.

Lo que sí funcionó a la primera, y conviene recordar por qué: en convenciones, rediseñar
las opciones para que fueran **la misma palabra con distinto signo** bajó tres ítems de
10/10 a por debajo del umbral. Ahí la fuga sí era formal —la opción bien formada se
reconocía sola— y por eso el arreglo formal la cerró. La lección no es «la forma da igual»,
es **medir cuál de las dos fugas tiene cada ítem antes de arreglarlo**.

### R14 · La tercera fuga es la frecuencia: ningún conjunto con un solo miembro marcado

R11 describe la fuga **formal** —solo una opción está bien formada— y R13 la fuga de
**sentido** —una opción es la más general, o la única relevante al objetivo—. Falta una
tercera, que apareció en un ítem de tiempo verbal cuyas cuatro opciones eran gramaticales
y ninguna «sonaba mejor», y aun así lo acertaban 7 de 10 a ciegas.

Las opciones eran `grows` · `has grown` · `grew` · `had grown`. Tres tiempos corrientes de
la prosa y **uno marcado**. En un ítem de examen, el marcado es la apuesta: es el que
parece la respuesta de una pregunta, porque es el que un ítem de gramática suele estar
examinando. No hace falta leer la frase.

> **Un juego de opciones no puede tener un solo miembro marcado.** Si tres son las formas
> por defecto y una es la llamativa, la llamativa se elige sin leer.

Y ojo con el arreglo que parece obvio y no lo es: **reescribir la frase para que la clave
sea un tiempo corriente no cierra la fuga, la invierte.** La arquitectura «tres contra uno»
sigue en pie, y la apuesta del que no lee pasa a caer sobre un distractor — con lo que el
ítem se sigue resolviendo sin leerlo, al revés, y contra alguien que ya sabe que este
examen castiga la opción vistosa vuelve a filtrar. El arreglo es al **conjunto**: las
cuatro al mismo grado de marcación. En el caso citado, las cuatro pasaron a formas
compuestas —`have grown` · `has grown` · `was growing` · `had grown`—, con lo que «elegir
el perfecto» dejó de discriminar.

Regla de bolsillo para los tres casos: **antes de arreglar un ítem que filtra, decide cuál
de las tres fugas tiene** —forma, sentido o frecuencia—. Aplicar el arreglo de una a la
otra no hace nada, y ya nos costó una vuelta entera: igualar la forma de los ítems de
síntesis los dejó exactamente igual de adivinables.

### R15 · Se mide después de cada ronda, no después de tres

La prueba a ciegas del módulo 2 estándar fue: 44,1 → 35,6 → 21,5 → 15,9 → 17,4 → **25,9 %**.
Sube al final, y la causa no es el contenido: es que **encadené tres rondas de cambios
antes de volver a medir** —arreglos de conjunto, rebarajado de claves y correcciones de
equidad—, así que cuando el número subió ya no se podía saber cuál de las tres lo había
movido.

Peor aún: un ítem que se rediseñó **expresamente** para cerrar su fuga pasó de no filtrar a
filtrar 9 de 10, y estuvo así dos rondas sin que nadie lo supiera. El arreglo lo empeoró y
la medición que lo habría dicho llegó dos cambios tarde.

> **Cada ronda de cambios se mide antes de empezar la siguiente.** Diez solucionadores y
> cinco minutos: es la parte barata del proceso. Encadenar arreglos ahorra una medición y
> cuesta una ronda entera de diagnóstico a ciegas.

Corolario, que es el que de verdad duele: **un arreglo no es un arreglo hasta que la
medición lo confirma.** Hasta entonces es una hipótesis, y en este módulo dos hipótesis
razonadas —igualar la forma de las opciones de síntesis, dar causa permanente a las cuatro
opciones del ítem de los lagos— resultaron falsas al medirlas.

### R2 · Arreglar un ítem lo convierte en un ítem nuevo

Las tres versiones de q02 pasaron cada una por auditoría, y cada arreglo introdujo un
defecto distinto de la misma familia. Un ítem corregido vuelve a la cola de auditoría
entero: no se revisa «solo lo que cambió».

### R3 · La lente que más rinde es la del estudiante que no lee

De las cuatro lentes que se pasaron a q02 v3, dos dieron APTO y dos lo devolvieron. Las
dos que lo devolvieron —el tramposo y la lingüística— llegaron por caminos distintos al
mismo hecho comprobable. Y las dos que lo aprobaron **describían ese mismo hecho en su
argumento**, dándolo por bueno. Cuando las lentes discrepan, gana el hecho verificable,
no el recuento de votos.

## 4 ter. Cómo se mide la puerta 6 (y qué salió al medirla en serio)

Durante toda la primera noche, la prueba a ciegas se hizo pidiéndole a un auditor que
«tapara mentalmente el texto». Eso no es un control: el pasaje seguía en su contexto, y la
cifra dependía de su disciplina.

`scripts/sat-blind-test.mjs` lo convierte en medición:

```bash
node scripts/sat-blind-test.mjs --module sat-set-1-m1 --out /tmp/ciego.md   # examen SIN los textos
node scripts/sat-blind-test.mjs --module sat-set-1-m1 --panel /tmp/panel.json
```

El panel toma las respuestas de varios solucionadores y devuelve la media **y el desglose
por ítem**. La media dice si el examen está roto; el desglose dice **cuál** rehacer, que es
lo único accionable.

### Serie de mediciones del módulo `sat-set-1-m1`

| Ronda | Qué se hizo | Panel | Ítems que filtran |
|---|---|---|---|
| 1 | Escritura normal + dos rondas de corrección ítem por ítem | **68,5 %** | 17 de 27 |
| 2 | Rediseño R8 de los 17 juegos de opciones | **48,1 %** | 8 de 27 |
| 3 | R9 sobre los 8 que resistieron: registro igualado y enunciados recortados | **34,7 %** ✅ | 3 de 27 |
| 3 bis | La misma ronda 3, remedida con **16 jueces** en vez de 8 | **34,3 %** ✅ | 4 de 27 |
| 4 | R10 sobre los 4 deducibles (16 jueces) | **27,3 %** ✅ | 3 de 27 |
| 5 | Última pasada sobre q03, q13 y q14 (16 jueces) | **26,4 %** ✅ | 3 de 27 |
| 6 | Arreglos de las auditorías: q27 (hechos falsos), curva y techo de SEC | **25,5 %** ✅ | 1 de 27 |
| 7 | q22 rehecho por dos claves | **23,1 %** ✅ | 2 de 27 |

**23,1 % está por debajo del azar.** No es un error de medición ni una casualidad afortunada:
significa que las heurísticas que un solucionador entrenado aplica cuando no puede leer
—elegir la opción menos obvia, descartar los absolutos, preferir la que suena a examen—
ahora le llevan sistemáticamente a distractores. El examen no solo no se puede resolver sin
leerlo: castiga intentarlo.

**Dónde se para.** En 26,4 % contra un azar de 25 %, el examen ya no se puede resolver sin
leerlo. Y hay una señal clara de que seguir es perseguir ruido: `q24` subió de 9/16 a 14/16
**sin que nadie lo tocara** entre dos mediciones. A este nivel las diferencias por ítem son
ruido; la media, que es lo que la puerta mide, lleva cinco mediciones bajando.

Los tres que más se acercan a resolverse sin leer, anotados para una pasada futura:
`q06` (12/16), `q14` (13/16) y `q24` (14/16).

Con el azar puro en 25 %, un 27,3 % significa que el examen **ya casi no se puede resolver
sin leerlo**. Dos ítems que estaban rotos del todo quedaron limpios: `q09` pasó de 15/16 a
**0/16** y `q15` de 16/16 a **0/16**.

Veinte puntos en una ronda de R8 y trece más en la de R9, contra siete puntos por ronda
arreglando ítem a ítem. El método vale casi tres veces más que el esfuerzo. Techo: 35 %.

**Aviso sobre el ruido, que costó entenderlo.** Con ocho solucionadores la media es
estable, pero el recuento por ítem no lo es: `q06` marcó 8/8, luego 5/8, luego 8/8 otra vez
**sin que nadie lo tocara** entre la segunda y la tercera medición. Actuar sobre un ítem por
un 8/8 que puede ser ruido es perseguir fantasmas; no tocarlo por un 5/8 que puede ser
suerte es dejar pasar uno roto. Para decidir sobre un ítem concreto hace falta un panel
mayor; ocho bastan para la media.

### La calibración del 19 ago 2026, y la hipótesis que mató

Se sospechaba que el 64 % que medían los auditores fuese un artefacto: un modelo muy fuerte
con tiempo ilimitado no es un chico de 17 años con cronómetro. Se comprobó con ocho
solucionadores sin acceso a los textos.

| Solucionador | Media a ciegas |
|---|---|
| Modelo pequeño (5 intentos) | **65,2 %** |
| Modelo intermedio (3 intentos) | **74,1 %** |
| **Panel completo** | **68,5 %** |

**La hipótesis era falsa y en la dirección contraria.** No hacía falta un auditor
sobrehumano: un modelo barato, sin leer un solo texto, acertaba dos de cada tres. Las
pistas no eran sutiles, eran gruesas.

Desglose: **17 de 27 ítems** los acertaban 6 o más de los 8 solucionadores. Ocho de ellos,
los 8 de 8 — ítems que no medían absolutamente nada. Por dominio: Information and Ideas
80 %, Craft and Structure 75 %, Standard English Conventions 62 %, Expression of Ideas 50 %.

**El ítem modelo es `q02`**, el que costó cuatro versiones y llegó a estar bloqueado:
**0 de 8** lo acertaron sin leer. Cuatro verbos del mismo régimen, misma longitud, y la
única heurística de forma disponible apunta a un distractor. Es lo que R8 pide, y salió de
rehacerlo cuatro veces.

**Corolario para el proceso:** la puerta 6 no se audita, se mide. Un panel de ocho
solucionadores baratos cuesta una fracción de una auditoría y da un número que no admite
discusión, más la lista exacta de ítems a rehacer.

## 5. Lo que no se hace, nunca

- **No se copian ítems ni textos oficiales de College Board**, ni traducidos, ni
  parafraseados de cerca. Todo el material es original de WeLearn. Esto no es una
  preferencia de estilo: es la diferencia entre un producto y una infracción.
- No se publica un set que no haya pasado por `sat-release-warden` con veredicto APTO.
- No se baja un umbral de §4 para que pase un lote. Si un umbral estorba, se discute el
  umbral en este documento y se deja escrito por qué cambió.
- David y Zhanna no aparecen dentro de los ítems. Testimonios sí; contenido de examen no.

## 6. Estado de la red

| Pieza | Estado |
|---|---|
| Agentes (`.claude/agents/sat-*.md`) | ✅ escritos |
| Skill de creación (`crear-examen-sat`) | ✅ escrita |
| Skill de auditoría (`auditar-examen-sat`) | ✅ escrita |
| Guardián (`scripts/check-sat-exam.mjs`) | ✅ 18 ago 2026 — probado contra 9 defectos sembrados |
| Ficha `sat` en `exams.ts` + ruta | ✅ 18 ago 2026 — `available: false` hasta que haya contenido |
| Primer set piloto | ⬜ pendiente |
