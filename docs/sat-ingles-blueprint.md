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
- Sets: `src/data/mocks/sat-set-N.ts`, registrados en `src/data/mocks/index.ts`.
- Ruta: `/examenes/sat/practica/[id]`, igual que IELTS y TOEFL.
- El texto de cada ítem va en `stimulus`; la pregunta en `text`.

Dos cosas que el motor actual **no** hace y hay que decidir antes de publicar:
adaptatividad entre módulos, y conversión a escala 200–800. Mientras no existan, un set
SAT es un simulacro lineal con puntaje bruto, y así hay que llamarlo en pantalla.

## 4. Puertas de calidad

Umbrales medidos sobre el conjunto, no ítem por ítem. Son los que implementará
`scripts/check-sat-exam.mjs` (todavía no escrito) y los que aplican los auditores a mano
mientras tanto.

| # | Puerta | Umbral | Por qué |
|---|---|---|---|
| 1 | Reparto de la clave | Cada letra 20–30 % por módulo; nunca 3 iguales seguidas | Cinco series de este repo salieron con la correcta en A el 100 % de las veces |
| 2 | Longitud de la clave | La correcta es la opción más larga en ≤ 30 % de los ítems | Es la pista más explotada por quien no sabe la respuesta |
| 3 | Solape léxico | La correcta no repite literalmente más palabras del texto que la media de los distractores | Se acierta emparejando palabras, no leyendo |
| 4 | Clave única | Cero ítems con dos opciones defendibles | Un ítem con dos claves no mide nada |
| 5 | Distractores vivos | Cada distractor lleva escrito qué error del estudiante representa | Un distractor que nadie elegiría convierte un ítem de 4 en uno de 3 |
| 6 | Prueba a ciegas | Un solucionador que no ve el texto no pasa del 35 % | Azar = 25 %. Por encima de 35 % el ítem se resuelve sin leer |
| 7 | Longitud del texto | 25–150 palabras **de 6 caracteres** (caracteres totales ÷ 6, ver §2) | Parámetro oficial del examen, verificado 2026-08-18 |
| 8 | Mezcla de dominios | Exactamente 8 C&S / 7 I&I / 7 SEC / 5 EoI por módulo (§2) | Un simulacro desbalanceado da un diagnóstico falso |
| 9 | Curva de dificultad | Agrupado por tipo de ítem y, dentro del grupo, de menos a más; Standard English Conventions de menos a más sin agrupar (§2) | Es como está construido el examen real |
| 10 | Equidad | Cero ítems que exijan conocimiento cultural, regional o económico no dado en el texto | El estudiante es colombiano; el examen no puede medirle su geografía |
| 11 | Originalidad | Cero secuencias de 8+ palabras que coincidan con material publicado | Ni copiamos College Board ni fuentes con derechos |
| 12 | Variedad temática | Ningún tema (ciencia, humanidades, historia, literatura) por encima del 40 % de un módulo | El examen real reparte |

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
| Guardián (`scripts/check-sat-exam.mjs`) | ⬜ pendiente — spec en §4 |
| Ficha `sat` en `exams.ts` + ruta | ⬜ pendiente |
| Primer set piloto | ⬜ pendiente |
