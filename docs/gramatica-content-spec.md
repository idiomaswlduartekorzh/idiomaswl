# Especificación de contenido — temas de gramática (v2)

Objetivo: que cada tema de `/practica/<idioma>/<nivel>/gramatica/<slug>` sea **la página de
referencia** para su tema específico — la que Google muestra cuando alguien busca "verbos
irregulares en italiano", "ci e ne", "piacere", "verbos impersonales", etc. — combinando algo
que la competencia no junta: **tabla de referencia completa + explicación pedagógica + ejercicios
interactivos gratis**.

No requiere cambios de esquema: se usan los campos que el motor ya renderiza
(`metaTitle`, `description`, `guide`, `seo[]` con `table`, `practice`). Exemplar de referencia ya
implementado: `src/data/grammar/italiano/a1/verbi-irregolari.ts`.

## Los 3 pilares (barra mínima por tema)

### 1. Tablas de referencia completas y adecuadas al tipo de tema
Cada tema debe llevar **al menos una tabla de referencia real** en una sección `seo[].table`
(columnas libres; el `[slug]/page.tsx` ya la renderiza). El tipo de tabla depende del tema:

| Tipo de tema | Tabla(s) que debe tener |
|---|---|
| Verbos (regulares/irregulares/tiempos) | Paradigma completo: **6 personas** (io/tu/lui/noi/voi/loro) × 3-4 verbos por tabla |
| Preposiciones | Matriz preposición → usos + ejemplos; contracciones (di+il=del…) en su propia tabla |
| Artículos / género-número | Matriz por género × número × inicial de palabra (il/lo/la/l'/i/gli/le) |
| Pronombres (diretti, indiretti, ci/ne, relativi) | Tabla de formas por persona/función + tabla de posición en la frase |
| Comparativos / superlativos | Tabla de estructuras (più…di, meno…di, il più…) con ejemplos |
| Conjunciones / conectores | Tabla función → conector → ejemplo |
| Impersonales / piacere | Tabla de estructura (a + persona + verbo + sujeto) con las formas clave |

Regla de ancho: máximo **4 columnas** por tabla (legibilidad móvil). Formas verbales cortas en
la 2ª+ columnas. Si un tema necesita más verbos, se parten en varias tablas temáticas.

### 2. Explicación pedagógica, sin carreta
Cada párrafo debe **enseñar algo accionable**. Prohibido el relleno tipo "este tema es muy
importante y aparece mucho". Reglas:
- **Abre con la regla**, no con generalidades. (“El congiuntivo va después de che cuando hay dos
  sujetos distintos”, no “el congiuntivo es un modo fascinante del italiano”.)
- **Contraste con el español** en cada punto donde el hispanohablante se equivoca (la "trampa").
- **Ejemplo real** por regla (frase completa IT + traducción), no solo la forma aislada.
- **Sección de errores frecuentes** con tabla ❌ error típico / ✅ correcto / por qué.
- Longitud objetivo: **≥ 450 palabras** de explicación útil (hoy el promedio es 150-370 y 67 % de
  los temas no tiene ni una tabla).

### 3. Investigación SEO propia por tema
Antes de escribir, se investiga la demanda real del tema (SERP + consultas relacionadas) y se
targetiza:
- **`metaTitle`**: keyword primaria + diferenciador. Formula: `<Keyword primaria> <nivel> — <gancho: tabla/conjugación/ejercicios>`.
  Ej: "Verbos irregulares italiano A1 — tabla de conjugación: essere, avere, andare, fare…".
- **`description`**: keyword primaria + 2-3 secundarias + qué ofrece la página (tablas completas + ejercicios).
- **`seo[]` como FAQ**: cada `heading` se emite como `FAQPage` (rich snippet). **Al menos 3 headings
  deben ser preguntas reales del SERP** ("¿cómo se conjuga…?", "¿cuál es la diferencia entre…?").
- Registrar por tema: keyword primaria, clúster secundario e intención (en el PR o en un CSV de tracking).

Método de investigación (por tema): 1 búsqueda de la keyword primaria + 1 de la variante
"ejercicios/conjugación" → leer títulos de la competencia (qué cubren y qué les falta) → extraer
las preguntas relacionadas → mapearlas a headings `seo[]`. La skill `seo-command-center-360` sirve
para lotes grandes.

## Reglas de estética (producto bonito)
- **Tablas de conjugación = verbos en COLUMNAS (horizontal), personas en FILAS (vertical).** Primera
  columna = "Persona" (io/tu/lui/noi/voi/loro); las demás columnas = **UN verbo por columna**.
- **Nunca amontonar dos verbos en una misma celda** (p. ej. "andare / fare"). Si hay más de 3 verbos,
  se parten en varias tablas de ≤4 columnas, no se cramean.
- **`guide.table`** (quick-ref del visual brief, máx 3 col): que sea un resumen corto y limpio, sin
  pares apretados. El paradigma completo va en `seo[].table`, no aquí.
- **`guide.decisions`** (tarjetas numeradas): frases CORTAS de regla (una línea), no el paradigma
  entero. Ej: "ANDARE: io vado, loro vanno — irregular en io/loro". Texto largo se recorta feo en las
  tarjetas (bug de layout ya parcheado en `src/styles/grammar.css .flow-step p`, pero igual: sé breve).

## Definición de "hecho" por tema
- [ ] `metaTitle` y `description` targetizados con keyword investigada.
- [ ] ≥ 1 tabla de referencia adecuada al tipo (paradigma completo si es verbo).
- [ ] ≥ 450 palabras de explicación pedagógica; cero relleno.
- [ ] Sección de errores frecuentes (tabla contraste).
- [ ] ≥ 3 headings `seo[]` en formato pregunta (FAQ/SERP).
- [ ] `npm run check:grammar-exercises` en verde y `scripts/_verify-engine.mjs` sin bloqueos.

## Rollout sugerido (por fases)
1. **Italiano completo** como idioma-referencia y plantilla viva (44 temas: A1+A2+B1),
   empezando por verbos/tiempos (donde más falta la tabla) y luego el resto.
2. Replicar por idioma. Latinos/germánicos: yo puedo autorar tablas y prosa con fidelidad.
   **Coreano/japonés/ruso**: las tablas son factuales pero requieren **validación de Zhanna**.
3. En paralelo, saldar la deuda de `docs/gramatica-deuda-contenido.md` (cardinalidad + respuestas
   vacías) al pasar por cada tema.

## Notas
- No tocar el motor ni el CSS: todo es contenido en `src/data/grammar/**`.
- Los nombres de ejemplo usan el pool neutral (ver `scripts/neutralize-example-names.mjs`); no
  reintroducir David/Zhanna en ejercicios.
