# Homepage WeLearn — Ruta Clara (v2, refinada por el panel)

> Documento que toma las indicaciones crudas del fundador y las **pasa por el panel de expertos** para dejar una ruta ejecutable, ANTES de codear.
> Complementa `HOMEPAGE_BLUEPRINT.md` (la estructura milimétrica). Este doc resuelve: **UI de referencia + metodología de research SEO + la tensión "WebGL disruptivo vs. 100% indexable"**.
> **Estado:** ruta aprobada por el panel, pendiente de decisiones del fundador (§9) antes de iterar.

---

## 1. Tus indicaciones, interpretadas

Lo que pediste, en limpio:

1. **Referencia de UI:** `cornrevolution.resn.global` — experiencia disruptiva, inmersiva, premiada. La usamos como norte visual/experiencial.
2. **Contenido basado en SERP real:** construir el texto alrededor de **lo que Google muestra de primero** para las búsquedas relacionadas con lo que ofrecemos (`clases de inglés`, `toefl bucaramanga`, `profesor de inglés`, `curso de inglés`, `curso de alemán`, y todo el universo relacionado).
3. **"Competidores con esteroides":** tomar lo que ya le funciona a la competencia y hacerlo **mejor**, porque somos mejores que ellos.
4. **Indexabilidad y AEO perfectos:** la homepage debe ser 100% indexable, impecable en SEO **y EAO/AEO** (que la IA —AI Overviews, ChatGPT, Perplexity— también nos encuentre relevante; p. ej. un **FAQ IA-friendly** en el propio homepage).
5. **Diferido a la próxima iteración:** el listado de recursos técnicos para construir la experiencia tipo cornrevolution, y el research SERP completo.

---

## 2. El veredicto del panel: la tensión que hay que resolver ANTES de codear

> 🚨 **Contradicción central detectada.** `cornrevolution.resn.global` y "100% indexable + AEO perfecto" son, hechos de forma ingenua, **objetivos opuestos**.

Verificamos el sitio de referencia: está detrás de un *gate* de compatibilidad de navegador y renderiza todo en **WebGL/Canvas**. Este género de sitios (RESN, Awwwards, FWA) es:

- ✅ Espectacular, inmersivo, memorable (lo que quieres para la UI).
- ❌ **Veneno para SEO/AEO:** el contenido vive en un `<canvas>`, no en el DOM. Google y los LLMs **no pueden leer texto dentro de canvas/WebGL**. LCP lento, CLS/INP malos, JavaScript pesado, sin HTML semántico. Un sitio así, tal cual, es **invisible** para buscadores y para la IA.

**Si copiamos cornrevolution literalmente, perdemos el SEO. Si priorizamos SEO ingenuamente, perdemos el "wow". El panel resuelve esto así —y es la decisión más importante de todo el proyecto:**

### 🏛️ RESOLUCIÓN: Arquitectura de dos capas (Progressive Enhancement)

```
┌─────────────────────────────────────────────────────────────┐
│  CAPA 1 — SEMÁNTICA (SSR, HTML)  →  la leen Google y la IA    │
│  • Todo el texto, H1/H2/H3, FAQ, testimonios, links          │
│  • JSON-LD @graph + FAQPage schema                           │
│  • Server-rendered, en el DOM, crawlable, rápida (LCP = H1)  │
│  • Es LA SUSTANCIA. Aquí vive el 100% del SEO/AEO.           │
├─────────────────────────────────────────────────────────────┤
│  CAPA 2 — EXPERIENCIA (progressive enhancement)              │
│  • WebGL/Canvas/Framer-motion montada ENCIMA tras hidratar   │
│  • Carga diferida (next/dynamic ssr:false) con poster SSR    │
│  • Respeta prefers-reduced-motion y capacidad del dispositivo│
│  • Es EL DELEITE. Nunca es el vehículo de contenido indexable│
└─────────────────────────────────────────────────────────────┘
```

**Reglas no negociables de la arquitectura:**
1. **El contenido indexable JAMÁS vive dentro del canvas.** El WebGL decora; el HTML informa.
2. **El elemento LCP es texto HTML real** (el H1), nunca un canvas. El 3D se difiere.
3. **La página funciona y se ve bien sin JavaScript de la Capa 2** (móvil gama baja, `prefers-reduced-motion`, crawler): degrada a una versión estática impecable.
4. **Presupuesto de performance primero:** si el efecto rompe Lighthouse mobile > 90, el efecto se recorta, no el SEO.

> Resultado: obtenemos UI nivel Awwwards **y** un homepage perfecto para Google/IA. Es la única forma de tener las dos cosas. No es un compromiso: es la ingeniería correcta.

---

## 3. La referencia (cornrevolution) traducida a WeLearn: qué SÍ y qué NO

| Elemento de cornrevolution | ¿Lo tomamos? | Cómo se traduce a WeLearn (sin romper SEO) |
|---|---|---|
| Scroll cinematográfico dirigido (scrollytelling) | ✅ Sí | El arco PAS del blueprint se "cuenta" con el scroll: cada sección revela con propósito. |
| 3D/WebGL de personajes | ⚠️ Selectivo | Un solo "hero moment" 3D ligero (ej. tipografía multilingüe que muta / esfera de idiomas), no toda la página. |
| Transiciones entre secciones tipo "escena" | ✅ Sí | Reveals + parallax por capas con Framer Motion / Lenis (ya instalados). |
| Interactividad lúdica (hover, drag) | ✅ Sí | Selector de idioma vivo, cards con tilt, línea de tiempo del método que se dibuja. |
| Gate de navegador / todo en canvas | ❌ No | Prohibido. Rompe indexabilidad. Contenido siempre en DOM. |
| Sin texto real / sin H1 semántico | ❌ No | Prohibido. H1/H2/H3 semánticos y crawlables. |
| Carga inicial pesada | ❌ No | Diferimos la Capa 2; la Capa 1 carga instantánea. |

**La firma disruptiva de WeLearn** (nuestro equivalente al "corn moment"): el **hero multilingüe vivo** — la palabra "idioma" mutando entre lenguas (idioma → language → 언어 → langue → Sprache) sincronizada al selector, sobre un fondo con profundidad 3D sutil. Memorable, único en el mercado colombiano de idiomas, y **construido encima de un H1 de texto real**.

---

## 4. Metodología de research SEO/SERP ("buscar lo que Google muestra de primero")

Convertimos tu instrucción en un método reproducible. Para CADA término se mina la SERP real y se extrae lo que Google premia:

**Qué se extrae de cada búsqueda:**
- **Autocomplete** (Google Suggest): las variantes que la gente realmente teclea.
- **People Also Ask (PAA):** las preguntas exactas → alimentan el FAQ IA-friendly (§6).
- **Featured snippet / AI Overview:** el formato y longitud de respuesta que Google/IA eligen citar.
- **Related searches** (pie de página): términos del mismo cluster.
- **Top 3 orgánicos:** su H1/H2, estructura y qué secciones tienen (para "esteroides", §5).
- **Modificadores locales:** `bucaramanga`, `colombia`, `online`, `precio`, `gratis`.

**El universo de keywords a minar** (matriz idioma × intención × geo):

```
IDIOMAS:   inglés · coreano · alemán · francés · italiano · portugués (+ ruso/japonés próximamente)
INTENCIÓN: clases de · curso de · profesor de · academia de · aprender ·
           preparación · precio/cuánto cuesta · online · gratis · mejor
EXÁMENES:  toefl · ielts · icfes · topik · goethe · delf/dalf · cils · celpe-bras · cambridge b2
GEO:       bucaramanga · colombia · (sin geo = nacional/online)
```

Ej. de intersecciones de alto valor: `curso de inglés bucaramanga`, `preparación IELTS online colombia`, `profesor de inglés bucaramanga`, `aprender coreano desde cero`, `curso de alemán goethe colombia`, `cuánto cuesta un curso de inglés`.

**Hallazgos preliminares** (2 búsquedas de validación ya hechas — se completará el universo en la próxima iteración):

- La SERP local está dominada por **agregadores** (Superprof, tusclases.co) y **listicles** ("Los 7 mejores cursos de inglés en Bucaramanga"). → Oportunidad: crear nuestro propio contenido comparativo y de autoridad para pelear esa intención.
- **Autoridades locales fuertes:** Centro Colombo Americano (desde 1957, aval Embajada EE.UU.), Praxis English (cuádruple certificación ICONTEC), UPB/UIS (testing centers oficiales), Get Ready! (especialista en TOEFL/IELTS/GRE/GMAT).
- **Señales de precio en SERP:** hora de inglés ~$26.500 promedio; particulares $20K–70K; TOEFL ~$31.750/h; **"97% ofrece la primera clase gratis"** → confirma que "clase gratis" es el gancho estándar del mercado (nuestro CTA de diagnóstico gratis está alineado).
- **Intención de examen** convive con universidades (UPB, UNAL, Colombo). → WeLearn debe posicionarse como **el especialista ágil y humano** frente al aparato institucional.

---

## 5. "Competidores con esteroides" — qué tienen y cómo los superamos

De la SERP real, lo que le funciona a la competencia + nuestra versión mejorada:

| Lo que hace la competencia | Nuestra versión "con esteroides" |
|---|---|
| Colombo/Praxis presumen certificaciones y antigüedad (autoridad institucional) | **E-E-A-T humano:** David políglota real (8 idiomas, cara visible) + Zhanna directora académica + resultados con nombre propio (aceptado en USP, viajó a USA). Autoridad *con rostro*. |
| "Primera clase gratis" (gancho genérico del 97%) | **Clase de diagnóstico gratis con plan personalizado** por WhatsApp — no una demo, un *diagnóstico con hoja de ruta*. |
| Listicles de terceros ("los 7 mejores") rankean por nosotros | Publicar **nuestro propio contenido comparativo y guías** (el blog de 35 artículos ya es un activo) + FAQ que gana los snippets. |
| Precio opaco / "pregunta por WhatsApp" | **Precio transparente** en el homepage ("sin letra pequeña") = confianza diferencial. |
| Enseñanza genérica de inglés | **Especialización en exámenes** (IELTS, TOEFL, TOPIK, Goethe, DELF, CELPE-Bras) + **método propio de 11 pasos** con fundamento cognitivo. |
| Presencial / horarios rígidos | **100% online**, tutor asignado, alcance nacional e internacional. |

**Principio:** no inventamos ganchos nuevos; tomamos los que YA convierten en este mercado y los ejecutamos mejor, con nuestra ventaja real (humano + polígloto + examen + método).

---

## 6. AEO / EAO — el FAQ IA-friendly en el homepage

Para que **la IA nos cite** (AI Overviews, ChatGPT Search, Perplexity, Gemini), el homepage lleva un bloque FAQ construido así:

1. **Preguntas = las PAA reales** extraídas de la SERP (mismas palabras que teclea la gente y que consulta la IA).
2. **Respuestas answer-first, autocontenidas, 40–60 palabras:** frase directa primero, contexto después. Extraíbles sin depender del resto de la página.
3. **Marcado `FAQPage` (JSON-LD)** — ya existe en el home, se amplía con las nuevas Q/A.
4. **Preguntas visibles en el HTML** (no solo en el schema): los crawlers y LLMs leen el DOM.
5. **Entidad reforzada:** cada respuesta ancla la entidad ("Idiomas WeLearn, academia online con sede en Bucaramanga…") para que los LLMs asocien la marca al tema.

Preguntas objetivo (se afinan con PAA reales en la próxima iteración):
- "¿Cuál es la mejor academia de idiomas online en Colombia?"
- "¿Dónde preparar el TOEFL / IELTS en Bucaramanga?"
- "¿Cuánto cuesta un curso de inglés en Colombia?"
- "¿Cómo aprender un idioma sin usar apps que no funcionan?"
- "¿En cuánto tiempo se llega a un B2 en inglés?"
- "¿WeLearn es online o presencial?"

Además de FAQ, refuerzan AEO: bloque comparativo "App vs. WeLearn" (§blueprint S3), datos citables específicos, y el `@graph` de entidad (Organization, EducationalOrganization, Person, Course).

---

## 7. Checklist de indexabilidad perfecta (definición de "impecable")

La homepage se considera terminada solo si cumple TODO esto:

- [ ] Un solo `<h1>`, jerarquía lógica `h2`/`h3`, HTML semántico (`section`, `nav`, `article`).
- [ ] Todo el texto de valor **en el DOM (SSR)**, nada crítico solo en canvas/JS.
- [ ] `title` + `meta description` optimizados con keyword + marca; `canonical` correcto.
- [ ] JSON-LD `@graph` (Organization, EducationalOrganization, WebSite, Person×2, Course) + `FAQPage` + `BreadcrumbList`. Datos **reales y defendibles** (sin ratings inventados).
- [ ] Core Web Vitals verdes: **LCP < 2.5s** (H1 texto SSR), **CLS < 0.1** (espacio reservado), **INP < 200ms**.
- [ ] Lighthouse mobile > 90 (perf, SEO, accesibilidad, best practices).
- [ ] Capa 2 diferida (`next/dynamic ssr:false`), `prefers-reduced-motion` respetado, fallback estático.
- [ ] Imágenes `next/image` con `alt` descriptivo y dimensiones; OG image (ya existe).
- [ ] Internal linking rico a landings (`/clases-de-*`, `/examenes/*`) y blog — el home como hub del cluster.
- [ ] En `sitemap.ts` y no bloqueado por `robots.ts` (ya existen).
- [ ] Mobile-first, contraste AA, foco visible, navegable por teclado.
- [ ] Validado en Rich Results Test + PageSpeed Insights antes de dar por cerrado.

---

## 8. Indicaciones refinadas (la versión mejorada de lo que pediste)

> Esta es la versión "pasada por el panel" de tus 5 puntos — la que guía la construcción:

1. **UI:** inspiración cornrevolution ejecutada como **arquitectura de dos capas** — experiencia WebGL/motion diferida (Capa 2) montada sobre un homepage SSR semántico impecable (Capa 1). Un único "hero moment" 3D (multilingüe), no una página-canvas.
2. **Contenido:** redactado a partir de **research SERP real** (autocomplete + PAA + featured snippets + related + top 3 orgánicos) sobre el universo idioma × intención × examen × geo de §4.
3. **Competencia con esteroides:** replicar los patrones que YA convierten en la SERP colombiana (§5) y superarlos con nuestra ventaja real (políglota humano + especialización en exámenes + método de 11 pasos + precio transparente + 100% online).
4. **SEO + AEO impecables:** cumplir el checklist de §7; FAQ IA-friendly con PAA reales y `FAQPage` schema; entidad reforzada para que la IA nos cite.
5. **Todo lo indexable en Capa 1;** la Capa 2 nunca es vehículo de contenido y nunca degrada Core Web Vitals.

---

## 9. Próxima iteración: entregables + decisiones que necesito de ti

**Lo que entregaré en la próxima iteración (cuando aprobemos la ruta):**
- 📋 **A. Listado de recursos técnicos** para la experiencia tipo cornrevolution (librerías, assets 3D, herramientas de motion, presupuesto de performance) — como pediste.
- 🔎 **B. Research SERP completo:** el universo de keywords minado con PAA, snippets, related y análisis del top 3 por término → tabla de keywords + preguntas + copy sugerido por sección.

**Decisiones que necesito de ti antes de arrancar (para no re-trabajar):**

| # | Decisión | Opciones |
|---|----------|----------|
| D1 | **Nivel de "wow" 3D** | (a) Un hero moment 3D ligero + motion elegante en el resto *(recomendado: máximo impacto/riesgo controlado)* · (b) Full immersive scrollytelling en varias secciones *(más riesgo de performance)* · (c) Solo motion 2D premium, sin WebGL |
| D2 | **Alcance geográfico del SEO** | (a) Nacional/online Colombia como foco + Bucaramanga como refuerzo local *(recomendado)* · (b) Hiper-local Bucaramanga primero |
| D3 | **Objetivo de conversión primario del home** | Confirmar: clase de diagnóstico gratis → WhatsApp *(recomendado, ya en blueprint)* · o self-serve "empezar lección gratis" |
| D4 | **Datos verificables** | ¿Tenemos reseñas/rating reales para schema? ¿Número exacto de estudiantes? ¿Redes de David/Zhanna para `sameAs`? (necesario para no inventar datos) |

---

---

## 10. Decisiones tomadas por el fundador (LOCKED)

| # | Decisión | Resuelto |
|---|----------|----------|
| D1 | **Nivel 3D** | ✅ **Hero moment + motion elegante.** Un solo efecto 3D memorable (hero multilingüe vivo) + motion premium 2D en el resto. Riesgo de performance controlado, SEO seguro. |
| D2 | **Foco geo** | ✅ **DUAL — local + nacional.** Bucaramanga (presencial + local SEO, `LocalBusiness`) **y** nacional online (`EducationalOrganization`). Conviven en el mismo `@graph` sin canibalizar. |
| D4 | **Datos verificables** | ✅ **+1000 estudiantes** (actualizar el "500+" del home a "1000+"), número exacto disponible · **Reseñas/rating reales** → habilita `AggregateRating` legítimo en schema · **Redes de David/Zhanna** → `sameAs` en la entidad `Person`. |

**Implicaciones para el build:**
- Estrategia SEO **dual local+nacional**: entidad `LocalBusiness` (Bucaramanga, NAP, `areaServed`, horarios si hay presencial) + `EducationalOrganization` (online nacional). Copy que sirva ambas intenciones ("en Bucaramanga y en toda Colombia, online").
- Actualizar cifra a **1000+ estudiantes** en hero/stats.
- Añadir `AggregateRating` al `@graph` **con reseñas reales** (pedir a David el rating y nº de reseñas exactos, o fuente Google Business).
- Añadir `sameAs` (Instagram/LinkedIn/YouTube de David y Zhanna) a las entidades `Person` — refuerza E-E-A-T y AEO.

**⚠️ Pendiente de confirmar (contradice CLAUDE.md "100% online"):** ¿hay clases **presenciales** reales en Bucaramanga, o es operación online con sede en Bucaramanga? Determina si el schema `LocalBusiness` lleva dirección/horarios físicos y qué promete el copy. **No asumir.**

**Pendiente de recolectar para la próxima iteración (de David):**
- Número exacto de estudiantes.
- Rating promedio + nº de reseñas (fuente verificable).
- URLs de redes de David y Zhanna para `sameAs`.
- Confirmación presencial vs. online en Bucaramanga.

---

*Fin de la ruta. Con D1, D2 y D4 resueltas (falta confirmar presencial y recolectar datos exactos), la próxima iteración entrega el resource list (A) y el research SERP completo (B), y con eso el homepage se codea sobre terreno firme, sin adivinar.*
