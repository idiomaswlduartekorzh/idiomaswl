# Anexo HR-03 — propiedad SEO, GEO y respuestas de IA por URL

**Estado:** borrador de curaduría; requiere revisión SEO y académica; no modifica producción

**Corte técnico:** `ee125032`

**Naturaleza:** overlay de decisión para HR-03, no una fuente de verdad paralela. Después de aprobación, las decisiones deben reconciliarse en `docs/ielts-toefl-route-map.md`, `docs/ielts-toefl-content-inventory.json`, `docs/ielts-toefl-keyword-map.csv` y `src/data/practica-exams/seo-catalog.ts`; este anexo se conserva solo como evidencia del gate.

## 1. Principio de propiedad

Cada página debe responder una intención primaria distinta. El hub no intenta ser la mejor respuesta para cada tarea; el catálogo no reemplaza las guías; una página de habilidad compatible no se presenta como tarea vigente; y los simulacros no compiten con los ejercicios individuales.

Estados propuestos:

- **INDEX + SITEMAP:** URL estratégica, canónica y deliberadamente incluida en sitemap.
- **INDEX + DISCOVERY:** URL útil e indexable que se descubre por enlaces internos; no necesita prioridad explícita en sitemap.
- **REVISAR:** la utilidad existe, pero su relación con el formato vigente requiere decisión académica/SEO antes de reforzarla.

Ningún estado cambia robots, sitemap o canonical durante HR-03.

## 2. Registro de propiedad

### Hub, catálogo y secciones

| URL | Propietaria de | Estado propuesto |
|---|---|---|
| `/practica/toefl` | práctica TOEFL general y elección entre Ejercicios, Práctica y Simulacros | INDEX + SITEMAP |
| `/practica/toefl/ejercicios` | catálogo de 12 tipos TOEFL 2026 agrupados en cuatro secciones | INDEX + SITEMAP al crearla |
| `/practica/toefl/reading` | práctica y orientación TOEFL Reading | INDEX + SITEMAP |
| `/practica/toefl/listening` | práctica y orientación TOEFL Listening | INDEX + SITEMAP |
| `/practica/toefl/writing` | práctica y orientación TOEFL Writing | INDEX + SITEMAP |
| `/practica/toefl/speaking` | práctica y orientación TOEFL Speaking | INDEX + SITEMAP |
| `/examenes/toefl` | simulacros completos, estructura y medición TOEFL | INDEX + SITEMAP; fuera del clúster de ejercicios |

### Reading — tareas vigentes

| URL | Propietaria de | Estado propuesto |
|---|---|---|
| `/practica/toefl/reading/formato-2026` | explicación conjunta de las tres tareas actuales de Reading | INDEX + SITEMAP |
| `/practica/toefl/reading/formato-2026/complete-the-words` | Complete the Words: definición y práctica | INDEX + SITEMAP |
| `/practica/toefl/reading/formato-2026/read-in-daily-life` | Read in Daily Life: definición y práctica | INDEX + SITEMAP |
| `/practica/toefl/reading/formato-2026/read-an-academic-passage` | Read an Academic Passage: definición y práctica | INDEX + SITEMAP |

### Reading — habilidades complementarias WeLearn

| URL | Propietaria de | Estado propuesto |
|---|---|---|
| `/practica/toefl/reading/habilidades` | directorio de habilidades transferibles a Reading | INDEX + DISCOVERY |
| `/practica/toefl/reading/habilidades/logical-relationships` | relaciones lógicas aplicadas a textos TOEFL | INDEX + DISCOVERY |
| `/practica/toefl/reading/habilidades/text-organisation` | organización textual aplicada a Reading | INDEX + DISCOVERY |
| `/practica/toefl/reading/habilidades/time-management` | manejo del tiempo en Reading | INDEX + DISCOVERY |
| `/practica/toefl/reading/habilidades/seleccion-de-palabras-contexto` | selección de palabras por contexto como refuerzo WeLearn | INDEX + DISCOVERY |

Estas URLs no deben usar `tipo de tarea TOEFL 2026` como descripción principal. Son apoyo pedagógico.

### Reading — slugs históricos de tipos de pregunta

| URL | Propietaria de | Estado propuesto |
|---|---|---|
| `/practica/toefl/reading/tipos-de-preguntas` | directorio de habilidades compatibles con preguntas históricas | REVISAR |
| `/practica/toefl/reading/tipos-de-preguntas/factual-information` | Factual Information como habilidad compatible/histórica | REVISAR |
| `/practica/toefl/reading/tipos-de-preguntas/inference` | Inference como habilidad compatible/histórica | REVISAR |
| `/practica/toefl/reading/tipos-de-preguntas/rhetorical-purpose` | Rhetorical Purpose como habilidad compatible/histórica | REVISAR |
| `/practica/toefl/reading/tipos-de-preguntas/sentence-simplification` | Sentence Simplification como habilidad compatible/histórica | REVISAR |
| `/practica/toefl/reading/tipos-de-preguntas/vocabulary` | Vocabulary in Context como habilidad compatible/histórica | REVISAR |

La revisión debe decidir entre conservar la intención histórica con disclosure visible, reclasificar como habilidad complementaria o consolidar. No se redirige ni desindexa en bloque.

### Writing — tareas vigentes y bancos

| URL | Propietaria de | Estado propuesto |
|---|---|---|
| `/practica/toefl/writing/build-a-sentence` | Build a Sentence: guía y runner inmediato | INDEX + SITEMAP |
| `/practica/toefl/writing/write-an-email` | Write an Email: guía, estructura y acceso al banco | INDEX + SITEMAP |
| `/practica/toefl/writing/write-an-email/banco-de-prompts` | práctica repetible con prompts de Email | INDEX + SITEMAP |
| `/practica/toefl/writing/academic-discussion` | Academic Discussion: guía, estructura y acceso al banco | INDEX + SITEMAP |
| `/practica/toefl/writing/academic-discussion/banco-de-prompts` | práctica repetible con prompts de Discussion | INDEX + SITEMAP |

### Writing — recursos de autoridad

| URL | Propietaria de | Estado propuesto |
|---|---|---|
| `/practica/toefl/writing/model-answers` | modelos y variantes calificadas | INDEX + SITEMAP |
| `/practica/toefl/writing/rubrica` | rúbrica, checklist y revisión | INDEX + SITEMAP |
| `/practica/toefl/writing/grammar-for-writing` | gramática aplicada a tareas Writing | INDEX + SITEMAP |
| `/practica/toefl/writing/integrated-writing` | formato anterior de Integrated Writing | REVISAR |

Integrated Writing debe conservar una señal inequívoca de formato anterior y no aparecer entre los 12 tipos vigentes del catálogo.

## 3. Reglas anti-canibalización

1. El H1 del hub general menciona la decisión de modo, no enumera exhaustivamente las tareas.
2. El H1 del catálogo posee “ejercicios TOEFL” y los 12 tipos; sus descripciones enlazan a páginas profundas en vez de duplicarlas.
3. Cada hub seccional posee la consulta amplia `TOEFL {sección} practice` y explica la sección completa.
4. Cada tarea posee su nombre exacto y una acción práctica específica.
5. Los bancos poseen la intención `prompts` o `practice bank`; no repiten la guía completa.
6. Las habilidades complementarias dicen explícitamente `habilidad` o `refuerzo`, no `tarea actual`.
7. Las páginas históricas no se refuerzan desde el catálogo de 12 tipos hasta pasar revisión académica.
8. `/examenes/toefl` conserva la intención de simulacro completo; las páginas de práctica solo lo enlazan como siguiente nivel de medición.

## 4. Contrato GEO/EAO/IA

Para que buscadores y asistentes puedan extraer respuestas sin tergiversar el producto:

- **Hub:** definición breve de las tres modalidades, estados y cantidades comprobables.
- **Catálogo:** lista HTML completa de los 12 tipos, agrupación semántica por sección y estado visible por tarea.
- **Sección:** respuesta directa “qué incluye”, facts visibles, fuente oficial cuando se hacen claims de formato y disclosure WeLearn/ETS.
- **Tarea:** definición en las primeras líneas, instrucciones, ejemplo o práctica, errores comunes y enlaces a la sección/catálogo.
- **Bancos:** cantidad y categorías derivadas de los datos reales; nunca escribir conteos a mano si pueden cambiar.
- **Schema:** solo datos visibles; `BreadcrumbList`, `LearningResource` y FAQ no introducen claims ausentes del contenido.
- **Lenguaje:** nombres oficiales de tarea en inglés acompañados por explicación en español; no traducciones inventadas como sustituto del nombre.
- **Limitaciones:** contenido original de WeLearn, no oficial y no adaptativo cuando corresponda.

## 5. Hallazgos de cobertura

- Se observaron 29 archivos `page.tsx` bajo `/practica/toefl`.
- Los 29 declaran canonical y ninguno declara `noindex`.
- El sitemap contiene 11 entradas explícitas de ese árbol.
- La diferencia de 18 URLs exige una decisión por página; no justifica añadirlas todas automáticamente.
- La nueva ruta de catálogo debe incorporarse al sitemap y al baseline en el mismo commit que la implemente.

## 6. Revisión humana necesaria

- SEO: confirmar la frontera entre catálogo, secciones y tareas.
- Académico: resolver las seis URLs de `tipos-de-preguntas` y `integrated-writing`.
- Producto: confirmar el copy diferenciado de las tres tareas Writing.
- Ingeniería: convertir este registro en una fuente de verdad o guardián sin duplicar manualmente rutas en varios archivos.

Este documento no aprueba indexación, eliminación ni migración. Solo vuelve explícita la decisión que deberá tomarse antes de escalar.
