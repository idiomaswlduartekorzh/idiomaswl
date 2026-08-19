# SAT de inglés — blueprint y puertas de calidad

Fuente de verdad para todo lo que la red de agentes escribe, audita y publica sobre el SAT.
Si un agente y este documento se contradicen, manda este documento. Si este documento y
College Board se contradicen, manda College Board **y hay que corregir este documento**.

Estado: **parámetros propuestos, sin verificar contra la fuente oficial**. Ver §1.

---

## 1. Lo primero, antes de escribir un solo ítem

Los números de §2 vienen de conocimiento general del SAT digital, no de una lectura
reciente de la especificación oficial. **No se produce un examen entero sobre números sin
verificar**: se han rehecho lotes completos en este repo por dar por buena una cifra de
memoria.

`sat-blueprint` verifica contra `satsuite.collegeboard.org` (Assessment Framework /
Specifications) y actualiza §2 con fecha y enlace antes de que nadie escriba contenido.

## 2. Parámetros del examen — sección Reading and Writing

| Parámetro | Valor | Verificado |
|---|---|---|
| Módulos | 2, adaptativos por etapas (el 2 depende del rendimiento en el 1) | ⚠️ |
| Preguntas por módulo | 27 | ⚠️ |
| Tiempo por módulo | 32 min | ⚠️ |
| Total sección | 54 preguntas / 64 min | ⚠️ |
| Formato de ítem | 1 texto propio + 1 pregunta + 4 opciones, una correcta | ⚠️ |
| Longitud del texto | 25–150 palabras | ⚠️ |
| Puntuación | 200–800 | ⚠️ |

### Dominios y reparto por módulo

| Dominio | Peso | Ítems (de 27) | Tipos |
|---|---|---|---|
| Craft and Structure | ~28 % | 13–15 | Words in Context · Text Structure and Purpose · Cross-Text Connections |
| Information and Ideas | ~26 % | 12–14 | Central Ideas and Details · Command of Evidence (textual y cuantitativo) · Inferences |
| Standard English Conventions | ~26 % | 11–15 | Boundaries · Form, Structure and Sense |
| Expression of Ideas | ~20 % | 8–12 | Rhetorical Synthesis · Transitions |

Orden dentro del módulo: los ítems van agrupados por dominio y, dentro de cada dominio,
de menos a más difícil. ⚠️ Verificar el orden exacto de los dominios.

### Módulo 1 vs módulo 2

El módulo 1 es de dificultad mixta. El módulo 2 existe en dos versiones —una más fácil y
otra más difícil— y el estudiante recibe una según cómo le fue en el 1. Un examen completo
son por tanto **tres módulos escritos**: M1, M2-fácil, M2-difícil.

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
| 7 | Longitud del texto | 25–150 palabras | Parámetro del examen |
| 8 | Mezcla de dominios | Dentro de los rangos de §2 | Un simulacro desbalanceado da un diagnóstico falso |
| 9 | Curva de dificultad | Dentro de cada dominio, de menos a más | Es como está construido el examen real |
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
