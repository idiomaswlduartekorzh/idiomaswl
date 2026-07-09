# Homepage WeLearn — Blueprint Milimétrico

> **Documento maestro de rediseño del homepage de idiomaswl.com.**
> Escrito por un panel de expertos como spec ejecutable: SEO, AEO/GEO, psicología del aprendizaje, CRO/neuromarketing, copywriting de conversión y dirección de diseño.
> Objetivo: convertir el homepage —hoy el eslabón más flojo— en la máquina de posicionamiento y conversión de la plataforma.
> **Estado:** blueprint aprobado, pendiente de codear. Fase de estrategia, NO de código.

---

## 0. Veredicto del panel (resumen ejecutivo)

El homepage actual (`src/app/(site)/home/page.tsx`) está **técnicamente por encima del promedio** (JSON-LD @graph, FAQPage schema, canonical, motion primitives, 9 secciones numeradas). Su problema no es técnico: es **estratégico y psicológico**.

**Los 5 fallos que el rediseño corrige:**

| # | Diagnóstico | Corrección |
|---|-------------|------------|
| F1 | **No hay dolor.** El hero abre con producto ("once pasos") antes de tocar el problema del usuario. Nadie busca "once pasos": buscan "no logro pasar el IELTS". | Hero + sección de empatía que nombra el dolor antes que el método. |
| F2 | **Un solo CTA de alta fricción.** "Empezar gratis" pide compromiso frío. Falta el CTA de baja fricción y alto valor: **clase de diagnóstico gratuita → WhatsApp**. | Doble CTA con jerarquía: diagnóstico gratis (primario) + empezar lección (secundario). |
| F3 | **El método aparece como lista, no como mecanismo.** 11 pasos listados no explican *por qué funciona*. La psicología del aprendizaje debe volverlo creíble. | Sección "mecanismo" con el *porqué* neurocognitivo antes del *qué*. |
| F4 | **AEO/GEO casi ausente.** No hay bloques de respuesta extraíble para AI Overviews, ChatGPT ni Perplexity. El schema está, el contenido citable no. | Bloques "answer-first", comparativa vs apps, definiciones de entidad. |
| F5 | **Prueba social diluida.** 500+ estudiantes y testimonios reales enterrados en la sección 05. La confianza debe empezar en el primer scroll. | Franja de prueba inmediata bajo el hero + E-E-A-T de David/Zhanna elevado. |

**Tesis de posicionamiento (bloqueada, no negociable en el rediseño):**

> **"Aprender un idioma, en serio."** WeLearn es la academia humana, rigurosa y especializada en exámenes internacionales — la anti-app. No competimos con Duolingo en gamificación; competimos con el *resultado* (pasas el examen, migras, te aceptan en la maestría).

---

## 1. El panel de expertos

Cada experto emite su mandato. El blueprint de la sección 5 integra los seis mandatos simultáneamente.

### 🔍 SEO de intención — *"El homepage no vende, indexa y distribuye."*
El homepage NO debe canibalizar las landings de intención (`/clases-de-ingles`, `/clases-de-coreano`, etc.). Su trabajo SEO es triple:
1. **Ser el hub de entidad** de la marca (brand + categoría "academia de idiomas online Colombia").
2. **Ser el nodo central del topic cluster** — enlazar con anchor text rico a cada landing y al blog (link equity distribution).
3. **Ganar los head terms de marca y categoría**, dejando la cola larga a las landings.

### 🤖 AEO / GEO — *"Optimiza para ser citado, no solo rankeado."*
El 2026 se juega en AI Overviews de Google, ChatGPT Search, Perplexity y Gemini. Estos motores citan contenido **extraíble, estructurado y con entidad clara**. Mandato:
- Cada sección clave abre con una **respuesta de 1–2 frases** a una pregunta real (formato "answer-first").
- Reforzar la **entidad WeLearn** y la **entidad "José David Duarte Silva, políglota"** (E-E-A-T de personas reales, ya en el `@graph`).
- Contenido **comparativo y definicional**: "¿Qué es el método de 11 pasos?", "WeLearn vs. apps de idiomas".

### 🧠 Psicología del aprendizaje — *"Vende autoeficacia, no lecciones."*
Quien busca un idioma carga **miedo y frustración** (intentó apps y falló, reprobó un examen, le da vergüenza hablar). La ciencia de la motivación (autoeficacia de Bandura, teoría de la autodeterminación) dice: la gente actúa cuando **cree que puede lograrlo con guía**. Mandato:
- Nombrar el dolor y **normalizarlo** ("no es tu culpa, es el método").
- Mostrar **estructura y acompañamiento humano** (reduce la ansiedad del "estoy solo").
- Vender el **estado final deseado** (identidad: "ser alguien que habla el idioma"), no la característica.

### 🎯 CRO / Neuromarketing — *"Reduce fricción, arma la arquitectura de decisión."*
Principios de Cialdini aplicados milimétricamente: prueba social, autoridad, escasez (Miembro Fundador, cupos), compromiso-consistencia (micro-sí antes del macro-sí). Mandato:
- **Un solo objetivo de conversión primario por pantalla**: la clase de diagnóstico gratuita → WhatsApp.
- Escalera de compromiso: ver lección (0 fricción) → diagnóstico gratis (baja) → matrícula (alta).
- CTA **repetido y contextual** en cada sección, nunca huérfano.

### ✍️ Copywriting de conversión — *"Habla como el estudiante piensa, no como la academia habla."*
Estructura PAS (Problema-Agitación-Solución) en el arco global. Mandato:
- Titulares en **segunda persona y verbo de resultado** ("Aprueba", "Habla", "Migra"), no en tercera persona de producto.
- Microcopy que **elimina objeciones** justo donde nacen (junto al CTA: "sin tarjeta", "sin compromiso", "responde un humano").
- Números específicos > adjetivos ("Band 7 en 8 semanas" > "resultados excelentes").

### 🎨 Dirección de diseño (impecable) — *"Atrevido, cinematográfico, pero al servicio de la lectura."*
Disruptivo ≠ ruidoso. Mandato:
- **Sistema tipográfico con contraste dramático** (display enorme + cuerpo legible), jerarquía brutal.
- **Motion con propósito**: cada animación revela información o guía el ojo hacia el CTA; nada decorativo que dañe CLS/LCP.
- **Un gesto disruptivo memorable** (el "hero moment") que ninguna academia colombiana tenga: el selector de idioma vivo, tipografía multilingüe que muta, o el método como una línea de tiempo animada.

---

## 2. Arquitectura de keywords e intención (SEO)

**Regla de oro:** el homepage gana marca + categoría; las landings ganan intención específica. No competir contra las propias landings.

### Cluster del homepage (head + marca)
| Keyword | Intención | Dónde se resuelve en el home |
|---------|-----------|------------------------------|
| `idiomas welearn` / `academia welearn` | Navegacional/marca | Hero + footer + entidad |
| `academia de idiomas online colombia` | Comercial investigación | Hero H1 + franja de prueba |
| `aprender idiomas online` | Informacional-comercial | Hero + sección método |
| `preparación exámenes internacionales idiomas` | Comercial | Sección certificaciones |
| `clases de idiomas online con profesor` | Comercial (anti-app) | Sección empatía + equipo |
| `mejor forma de aprender un idioma` | Informacional (AEO) | Sección método (answer-first) |

### Cola larga que el home solo ENLAZA (no compite)
`clases de inglés online` → `/clases-de-ingles` · `preparación IELTS` → `/examenes/ielts` · `aprender coreano desde cero` → `/clases-de-coreano` · `curso ICFES inglés` → `/preparacion-icfes` · etc.

### Preguntas objetivo para AEO/GEO (se responden en FAQ + bloques answer-first)
- "¿Cuál es la mejor academia de idiomas online en Colombia?"
- "¿Cómo aprender un idioma de verdad y no solo con apps?"
- "¿Dónde preparar el IELTS / TOEFL / TOPIK en Colombia?"
- "¿Cuánto cuesta aprender inglés en Colombia?"
- "¿Qué es el método de 11 pasos de WeLearn?"
- "¿En cuánto tiempo se llega a un B2 en inglés?"

**H1 recomendado (SEO + emocional):**
> `Aprende un idioma en serio — y presenta tu examen con respaldo real.`
> (contiene "aprende un idioma" + señal de examen; el eyebrow aporta "academia online · Colombia").

---

## 3. Playbook AEO / GEO (lo que el home actual no tiene)

1. **Answer-first blocks.** Cada sección clave abre con un `<p>` de 1–2 frases que responde una pregunta literal. Los motores generativos extraen ese párrafo. Ej. en Método: *"El método de 11 pasos de WeLearn estructura cada día de estudio en exposición, adquisición, producción y repaso espaciado, imitando cómo el cerebro interioriza una lengua materna."*
2. **Bloque comparativo "WeLearn vs. apps".** Tabla semántica (app vs. academia humana) — oro para "X vs Y" en AI Overviews y para la objeción #1 del usuario.
3. **Entidad reforzada.** Mantener y ampliar el `@graph` con `EducationalOrganization`, `Person` (David, Zhanna con `sameAs` a redes cuando existan), `Course` por idioma, `AggregateRating` (cuando haya reseñas verificables), `FAQPage`.
4. **Definiciones citables.** Un glosario mínimo inline: qué es el método, qué exámenes, qué niveles MCER — frases autocontenidas.
5. **Datos verificables y específicos.** "500+ estudiantes", "8 idiomas", "Bucaramanga, Colombia", nombres reales. Los LLMs prefieren especificidad citable.
6. **Frescura.** Enlazar los 4 posts más recientes del blog (ya existe) — señal de actividad para crawlers y GEO.

> ⚠️ Sinceridad de datos: cifras como "500+ estudiantes" o cualquier rating deben ser reales/defendibles antes de marcarse en schema. No inventar `AggregateRating`.

---

## 4. Mapa del viaje psicológico (la espina emocional del scroll)

El scroll es un **arco narrativo PAS**. Cada sección mueve al usuario un peldaño emocional:

```
Estado emocional inicial:  ansioso, escéptico ("otra academia más"), frustrado (ya falló antes)
        │
S1 Hero ......... "esto es para mí" (reconocimiento del objetivo)         → CURIOSIDAD
S2 Prueba ....... "no es humo, hay gente real que lo logró"               → CONFIANZA inicial
S3 Empatía ...... "por fin alguien entiende por qué fallé"                → ALIVIO
S4 Método ....... "ah, ASÍ sí tiene sentido, hay una razón"               → CREENCIA (autoeficacia)
S5 Idiomas ...... "está mi idioma / mi examen"                            → PERTENENCIA
S6 Exámenes ..... "hay una ruta concreta para MI meta"                    → PROYECCIÓN
S7 Resultados ... "gente como yo lo logró con ellos"                      → PRUEBA SOCIAL
S8 Humanos ...... "hay expertos reales detrás, no un bot"                 → AUTORIDAD (E-E-A-T)
S9 Demo lección . "ya vi cómo se siente, no hay riesgo"                   → REDUCCIÓN DE RIESGO
S10 Precios ..... "es alcanzable y transparente"                         → PERMISO ECONÓMICO
S11 FAQ ......... "resolvieron mi última duda"                           → OBJECIONES A CERO
S13 CTA final ... "voy a agendar mi diagnóstico gratis"                  → ACCIÓN
```

**Palanca central:** en todo el arco vendemos **autoeficacia con acompañamiento** — "tú puedes, y no estás solo". El miedo del usuario no es el idioma; es *volver a fracasar*. El home debe desactivar ese miedo cinco veces.

---

## 5. Blueprint milimétrico — sección por sección

> Formato de cada sección: **Job (conversión) · Intención/keyword · AEO hook · Copy · Palanca psicológica · Diseño/motion · CTA · Evento GTM**.
> Se conserva la numeración visible "01 —, 02 —…" del diseño actual (buena para escaneo y anclas).

---

### S0 · Utility Nav (barra superior)
- **Job:** orientación + señal de confianza inmediata + acceso a WhatsApp.
- **Contenido:** logo · nav (Inglés · Coreano · Idiomas · Exámenes · Práctica · Blog · Precios) · botón "Clase gratis" destacado. **⚠️ NUNCA borrar "Práctica"** (se pierde en force-pushes, ver CLAUDE.md).
- **Diseño:** sticky con fondo que gana opacidad al hacer scroll (glass). Botón CTA siempre visible.
- **CTA:** `Agenda tu clase gratis` (secundario, persistente).

---

### S1 · HERO — "El pacto de 5 segundos"
- **Job:** en 5 segundos el usuario debe entender *qué es*, *para quién*, y *qué hacer*. Es el 80% de las decisiones de rebote.
- **Intención/keyword:** `academia de idiomas online` + `aprender un idioma` + señal de examen. H1 con verbo de resultado.
- **AEO hook:** el H1 + subcopy son la definición citable de la entidad ("Idiomas WeLearn es una academia online de idiomas y preparación de exámenes internacionales con sede en Colombia").
- **Copy:**
  - Eyebrow: `Academia online · 8 idiomas · 7 exámenes internacionales · Colombia`
  - **H1:** `Aprende un idioma en serio. Y presenta tu examen con respaldo real.`
  - Subcopy (1 frase, dolor→solución): `Sin apps que no llevan a ningún lado. Clases con profesores reales, un método de 11 pasos y preparación específica para IELTS, TOEFL, TOPIK, Goethe y más.`
  - Trust microline bajo CTA: `Sin tarjeta · Responde un humano por WhatsApp · Primera lección abierta`
- **Palanca psicológica:** identidad + alivio ("en serio" reconoce el hartazgo con apps). Autoridad implícita (David políglota).
- **Diseño/motion (el "hero moment" disruptivo):** el `HeroLangSelector` vivo se mantiene y se sube de nivel: **la palabra "idioma" en el H1 muta entre lenguas** (idioma → language → 언어 → langue → Sprache) con máscara de texto, sincronizada al idioma resaltado en el selector. Es el gesto memorable que ninguna academia local tiene. Respetar LCP: el H1 renderiza estático primero (SSR), la mutación arranca tras hidratación.
- **CTA primario:** `Agenda tu clase de diagnóstico gratis →` (a WhatsApp con mensaje pre-escrito).
- **CTA secundario:** `Ver una lección real →` (ancla a S9, 0 fricción).
- **Evento GTM:** `click_whatsapp` (primario) · `view_lesson` (secundario).

---

### S2 · Franja de prueba inmediata — "No es humo"
- **Job:** matar el escepticismo antes de que crezca. Confianza en el primer scroll.
- **AEO hook:** datos citables y específicos (número de estudiantes, exámenes cubiertos).
- **Contenido:** franja horizontal (mantiene el `StatsRow` con `CountUp`) + logos/nombres de exámenes oficiales (IELTS, TOEFL, TOPIK, Goethe, DELF, CELPE-Bras, ICFES) como "sellos". Fila de 4 stats: `8 idiomas · 7 exámenes · 11 pasos/día · 500+ estudiantes`.
- **Palanca psicológica:** prueba social + autoridad (asociación con exámenes oficiales reconocidos).
- **Diseño/motion:** `CountUp` al entrar en viewport; logos de exámenes en marquee sutil o grid estático monocromo (para no romper LCP).
- **CTA:** ninguno (sección de confianza, no de acción).

---

### S3 · Empatía / Problema — "Por fin alguien lo entiende" *(NUEVA — no existe hoy)*
- **Job:** el corazón del arco PAS. Nombrar el dolor, agitarlo, y reposicionar la culpa (del usuario → del método viejo). Esta sección es la que hoy falta y la que más conversión desbloquea.
- **Intención/keyword:** `por qué no aprendo inglés` / `aprender idioma con profesor` (anti-app).
- **AEO hook:** bloque comparativo **"App vs. WeLearn"** — tabla semántica citable.
- **Copy:**
  - Eyebrow: `01 — Por qué estás aquí`
  - H2: `No fallaste tú. Falló el método.`
  - Cuerpo: `Descargaste la app. Hiciste rachas de 200 días. Y al sentarte frente a un examen —o frente a una persona real— seguías bloqueado. No es falta de disciplina: es que memorizar tarjetas no es aprender un idioma.`
  - **Tabla App vs. WeLearn** (3–4 filas): *Rachas y puntos → Objetivo real (tu examen)* · *Frases sueltas → Producción y conversación guiada* · *Un algoritmo → Un profesor que te corrige* · *"Tal vez algún día" → Un plan con fecha de examen*.
- **Palanca psicológica:** reatribución de la culpa (reduce vergüenza) → habilita autoeficacia. Es el "alivio" del mapa.
- **Diseño/motion:** dos columnas con contraste visual fuerte (columna "app" apagada/gris vs. columna "WeLearn" viva/acento). Reveal por fila con stagger.
- **CTA:** `Así enseñamos nosotros →` (ancla a S4).
- **Evento GTM:** `scroll_problem_section` (micro-conversión de engagement).

---

### S4 · El Método como mecanismo — "Ah, ASÍ sí tiene sentido"
- **Job:** convertir los 11 pasos de *lista* en *mecanismo creíble*. La gente compra el "por qué funciona", no el "qué es".
- **Intención/keyword:** `método para aprender idiomas` / `mejor forma de aprender un idioma` (AEO fuerte).
- **AEO hook (answer-first, crítico):** párrafo de apertura autocontenido: *"El método de 11 pasos de WeLearn estructura cada día de estudio en cuatro fases —exposición, adquisición, producción y repaso espaciado— imitando cómo el cerebro interioriza una lengua materna. Por eso el conocimiento se retiene y se convierte en habla, no en tarjetas olvidadas."*
- **Copy:**
  - Eyebrow: `02 — El método`
  - H2: `El día tiene once pasos. Cada uno tiene una razón.`
  - Reagrupar los 11 pasos en **4 fases narrativas** (Exposición · Adquisición · Producción · Consolidación) para dar sentido, y debajo la línea de tiempo detallada de los 11 (mantener datos actuales con `min`).
- **Palanca psicológica:** autoeficacia por comprensión ("entiendo el mecanismo → creo que funcionará conmigo"). Fundamento neurocognitivo = autoridad.
- **Diseño/motion:** la lista actual de `StepRow` se convierte en **línea de tiempo vertical animada** que se "dibuja" con el scroll (progress line con `scaleY`), agrupada por las 4 fases con color. Disruptivo pero informativo.
- **CTA:** `Ver el método completo →` (a `/metodo`).
- **Evento GTM:** `click_metodo`.

---

### S5 · Catálogo de idiomas — "Está mi idioma"
- **Job:** pertenencia + distribución de link equity a las landings.
- **Intención/keyword:** cada card enlaza a su landing (`clases-de-ingles`, etc.) con anchor rico → el nodo del cluster.
- **AEO hook:** lista de idiomas con exámenes asociados (entidad "cursos").
- **Copy:** Eyebrow `03 — Catálogo` · H2 `Ocho idiomas. Un mismo método probado.` (mantener grid actual con `TiltCard`).
- **Palanca psicológica:** pertenencia + consistencia (mismo método = confianza transferible entre idiomas).
- **Diseño/motion:** grid con `TiltCard` (mantener). Idiomas activos con acento; "próximamente" (Japonés, Ruso) apagados con badge — genera anticipación (escasez temporal).
- **CTA (por card):** `Ver ruta →` a la landing.
- **Evento GTM:** `click_language_card` (con `language` param).

---

### S6 · Certificaciones / Exámenes — "La sección del dinero"
- **Job:** conectar cada meta concreta (IELTS Band 7, TOEFL, TOPIK, ICFES) con una ruta específica. Aquí está la intención comercial más rentable.
- **Intención/keyword:** `preparación IELTS`, `curso TOEFL online`, `TOPIK preparación`, `ICFES inglés` → enlaza a `/examenes/[slug]`.
- **AEO hook:** cada examen con datos citables (semanas, nº de simulacros) — responde "¿dónde preparo X examen?".
- **Copy:** Eyebrow `04 — Certificaciones` · H2 `Preparación específica para tu examen. Con simulacros reales.` (mantener grid `EXAMENES` con badges).
- **Palanca psicológica:** proyección al estado final (tu meta con nombre y fecha) + autoridad (simulacros = rigor).
- **Diseño/motion:** grid `StaggerGrid` + `TiltCard` con badges. Mantener.
- **CTA (por card):** card entera clickable a la ruta del examen.
- **Evento GTM:** `click_exam_card` (con `exam` param).

---

### S7 · Resultados / Testimonios — "Gente como yo lo logró"
- **Job:** prueba social específica y verificable. Elevada respecto a hoy (sube en el arco, refuerza tras exámenes).
- **AEO hook:** testimonios con nombre, ciudad y examen (especificidad citable + señal de reseña real).
- **Copy:** Eyebrow `05 — Resultados` · H2 `Estudiantes reales. Metas reales cumplidas.` Usar los 4 testimonios reales existentes (Leonardo/USA, Daniel/Celpe-Bras USP, Karen/Goethe, Carlos/TOEFL) — son oro, ya están.
- **Palanca psicológica:** prueba social por semejanza ("como yo") + prueba de resultado (aceptado en maestría, viajó a USA).
- **Diseño/motion:** `TestimonialCard` con reveal. Considerar destacar la cita con resultado tangible (aceptación USP) como caso ancla.
- **CTA:** `Quiero mi resultado →` (a diagnóstico/WhatsApp).
- **Evento GTM:** `click_whatsapp`.

---

### S8 · Los humanos detrás — "Hay expertos reales, no un bot" (E-E-A-T)
- **Job:** autoridad y confianza. Es la sección E-E-A-T que Google y los LLMs premian (personas reales, experiencia demostrable).
- **AEO hook:** entidad `Person` (David Duarte, políglota 8 idiomas; Zhanna Korzh, directora académica) — reforzar `@graph` con `sameAs` cuando haya redes verificables.
- **Copy:** Eyebrow `06 — Equipo` · H2 `Quiénes te van a enseñar.` Mantener bios de David y Zhanna. **Recomendación fuerte:** usar la foto real `public/images/david-duarte.jpg` (ya en producción) en lugar de solo iniciales — la cara humana multiplica confianza.
- **Palanca psicológica:** autoridad (Cialdini) + humanización (anti-app: "aquí hay personas").
- **Diseño/motion:** `TeamCard` con reveal; foto de David con tratamiento editorial (duotono con acento de marca).
- **CTA:** `Habla con nuestro equipo →` (WhatsApp).

---

### S9 · Demo de lección en vivo — "Ya vi cómo se siente"
- **Job:** reducción de riesgo por prueba de producto. El usuario experimenta antes de comprometerse.
- **AEO hook:** demostración de la característica única (método visual, audio, hangul, etc.).
- **Copy:** Eyebrow `07 — Vista previa` · H2 `Mira cómo se ve un día completo.` (mantener `LessonTabs`).
- **Palanca psicológica:** reducción de riesgo + efecto dotación (ya "usó" el producto).
- **Diseño/motion:** `LessonTabs` interactivo (mantener). Es el mejor activo de producto en el home.
- **CTA:** `Empieza tu primera lección gratis →`.
- **Evento GTM:** `view_lesson_demo`.

---

### S10 · Precios (teaser) — "Es alcanzable y transparente"
- **Job:** dar permiso económico sin duplicar `/precios`. Transparencia = confianza (anti "letra pequeña").
- **Intención/keyword:** `cuánto cuesta aprender inglés colombia` (AEO — pregunta de precio muy buscada).
- **AEO hook:** rango de precio explícito y transparente responde la pregunta de costo.
- **Copy:** Eyebrow `08 — Precios` · H2 `Un precio claro. Sin sorpresas.` Mantener teaser con rango + "Sin letra pequeña". Verificar coherencia con `/precios` (CLAUDE.md M1.5).
- **Palanca psicológica:** transparencia (reduce ansiedad de compra) + anclaje de valor (todo incluido, un precio).
- **Diseño/motion:** bloque centrado, limpio. Mantener.
- **CTA:** `Ver planes y precios →` (a `/precios`).

---

### S11 · FAQ — "La mina de oro AEO"
- **Job:** eliminar las últimas objeciones + capturar featured snippets y AI Overviews. El `FAQPage` schema ya está.
- **Intención/keyword:** un cluster de preguntas long-tail informacionales.
- **AEO hook (máxima prioridad):** cada Q/A es un bloque extraíble. Ampliar las FAQ actuales con las de mayor volumen de búsqueda: "¿en cuánto tiempo B2?", "¿online o presencial?", "¿cómo funciona el diagnóstico gratis?", "¿cuánto cuesta?", "¿sirve para migrar?".
- **Copy:** Eyebrow `09 — Preguntas` · H2 `Lo que casi siempre nos preguntan.` (mantener `FAQ` + `faqJsonLd`, ampliar entradas).
- **Palanca psicológica:** objeciones a cero (última barrera antes del CTA final).
- **Diseño/motion:** acordeón accesible (mantener). Preguntas visibles en HTML (no solo en schema) para que los crawlers las lean.
- **CTA:** `Todavía tengo una duda → escríbenos` (WhatsApp).

---

### S12 · Blog / Autoridad temática
- **Job:** señal de frescura + topic authority + distribución interna a los 35 artículos.
- **AEO hook:** frescura y cobertura temática amplia (IELTS, TOEFL, coreano, migración…).
- **Copy:** Eyebrow `10 — Blog` · H2 `Guías gratuitas que sí sirven.` (mantener grid de 4 posts recientes + colores por categoría).
- **Diseño/motion:** grid de cards con categoría coloreada (mantener). `FadeUp`.
- **CTA:** `Ver todos los artículos →` (a `/blog`).

---

### S13 · CTA final — "El cierre"
- **Job:** la conversión primaria. Un solo objetivo dominante: agendar el diagnóstico gratis por WhatsApp.
- **Copy:**
  - Eyebrow: `Empieza hoy`
  - H2: `Tu primera clase de diagnóstico es gratis.`
  - Subcopy: `30 minutos con un profesor real. Evaluamos tu nivel, entendemos tu meta y te damos un plan. Sin compromiso.`
  - Trust microline: `Responde un humano · Hoy mismo · Sin tarjeta`
- **Palanca psicológica:** todas convergen — baja fricción, valor alto, prueba de humanidad, cierre.
- **Diseño/motion:** sección `wlh-cta` a todo color de marca, botón primario grande. Los botones por-idioma actuales pasan a ser secundarios; el **primario es el diagnóstico WhatsApp**.
- **CTA primario:** `Agenda tu clase gratis por WhatsApp →`.
- **CTA secundarios:** links a landings por idioma (mantener).
- **Evento GTM:** `click_whatsapp` (el evento de conversión clave).

---

### S14 · Footer
- **Job:** navegación completa + link equity + señal de entidad (NAP: nombre, dirección Bucaramanga, teléfono).
- **Contenido:** mantener columnas actuales (Clases · Exámenes · Compañía) + NAP + WhatsApp. Bueno para SEO local ("idiomas Bucaramanga") y entidad.
- **Diseño:** mantener. Verificar que TODAS las landings estén enlazadas (distribución de equity).

---

## 6. Arquitectura de CTA y conversión (resumen)

**Escalera de compromiso (micro-sí → macro-sí):**
```
0 fricción   → "Ver una lección real"     (S1 sec., S9)      → engagement
baja         → "Agenda diagnóstico gratis"(S1 prim., S13)    → LEAD (WhatsApp)  ★ conversión primaria
media        → "Empezar primera lección"  (S9)               → activación producto
alta         → "Ver precios / matricularme"(S10, /precios)   → venta
```

- **Objetivo primario único y repetido:** clase de diagnóstico gratis → WhatsApp con mensaje pre-escrito (WA `573005004253`, ver CLAUDE.md).
- **Regla:** ninguna sección larga sin un CTA contextual. El CTA de nav (S0) es el paracaídas siempre visible.
- **Eventos GTM a instrumentar** (algunos ya existen): `click_whatsapp`, `view_lesson`, `click_metodo`, `click_language_card`, `click_exam_card`, `view_lesson_demo`, `scroll_problem_section`. Reusar el trigger `Click WhatsApp` ya publicado (GTM-57NXLPZV, Versión 4).

---

## 7. Dirección de diseño "impecable" (motion & sistema)

- **Tipografía:** contraste dramático display/cuerpo. Display para H1/H2 (peso alto, tracking apretado), cuerpo legible. Mantener `next/font` (Geist) por performance.
- **Color:** sistema de marca con acentos por idioma/categoría ya definidos en CLAUDE.md (IELTS #0f3d8c, Coreano #c8202e, etc.). Usar acento como energía, fondo sobrio.
- **El "hero moment":** mutación multilingüe de la palabra "idioma" en el H1 sincronizada al `HeroLangSelector`. Es el gesto disruptivo firma.
- **Motion con reglas (no romper Core Web Vitals):**
  - Reveal `FadeUp`/`Stagger` en scroll (ya existe, `once: true`).
  - Línea de tiempo del método que se dibuja con scroll (`scaleY` + progress).
  - `TiltCard` en grids (ya existe).
  - **Prohibido:** animaciones que muevan el LCP element, layout shift (reservar espacio), autoplay pesado. Respetar `prefers-reduced-motion`.
- **Performance (M4.3):** LCP = H1 en SSR estático; hidratación progresiva del selector; imágenes `next/image` con dimensiones; OG image edge (ya existe). Meta: Lighthouse mobile > 90.
- **Accesibilidad:** contraste AA, foco visible, acordeón FAQ accesible, `alt` en imágenes, motion reducido respetado. (La accesibilidad también es señal de calidad para SEO.)

---

## 8. Cambios estructurales vs. el home actual (checklist para la fase de código)

| Acción | Sección | Prioridad |
|--------|---------|-----------|
| **AÑADIR** sección Empatía/Problema (S3) con tabla "App vs. WeLearn" | nueva 01 | 🔴 Alta |
| **REESCRIBIR** H1 + subcopy del hero (dolor→resultado, verbo 2ª persona) | S1 | 🔴 Alta |
| **AÑADIR** CTA primario "diagnóstico gratis → WhatsApp" en hero y CTA final | S1, S13 | 🔴 Alta |
| **REAGRUPAR** los 11 pasos en 4 fases + answer-first block + timeline animada | S4 | 🟠 Media |
| **AÑADIR** franja de logos de exámenes bajo stats (S2) | S2 | 🟠 Media |
| **SUBIR** prueba social; usar foto real de David en Equipo (S8) | S7, S8 | 🟠 Media |
| **AMPLIAR** FAQ con preguntas de mayor volumen (AEO) | S11 | 🟠 Media |
| **VERIFICAR** coherencia de precios con `/precios` | S10 | 🟢 Baja |
| **INSTRUMENTAR** eventos GTM nuevos | global | 🟢 Baja |
| **CONSERVAR** JSON-LD @graph, FAQPage, canonical, motion primitives, LessonTabs, nav "Práctica" | — | ⚠️ No romper |

---

## 9. Secuencia de construcción (cuando se autorice codear)

1. **Fase A — Estructura y copy (SEO/AEO):** reescribir `page.tsx` con las secciones nuevas y el copy definitivo. Ampliar `jsonLd` y `faqJsonLd`. Sin motion todavía. Verificable por contenido + schema (Rich Results Test).
2. **Fase B — Sistema visual:** tokens de tipografía/color, layout de la sección Empatía (tabla App vs WeLearn) y del método por fases. CSS en el archivo de estilos del home.
3. **Fase C — Motion impecable:** hero moment multilingüe, timeline del método con scroll, reveals. Respetar `prefers-reduced-motion` y CWV.
4. **Fase D — Instrumentación y QA:** eventos GTM, Lighthouse mobile > 90, validación de schema, prueba en móvil real, revisión de accesibilidad.

Cada fase es verificable de forma independiente y se puede commitear por separado en `claude/impeccable-design-skill-4je4gt`.

---

## 10. Principios inamovibles (heredados de CLAUDE.md)

- WhatsApp es el CRM y canal de cierre → todo CTA primario apunta ahí (`573005004253`).
- Posicionamiento "Aprender un idioma, en serio" — anti-app, academia humana especializada en exámenes.
- No tocar la medición instalada (GTM-57NXLPZV, Search Console, Meta Pixel).
- Nunca borrar el nav "Práctica".
- Assets coreanos steps 008-019 NO se commitean (552MB, .gitignore).
- Datos en schema deben ser reales y defendibles (no inventar ratings).

---

*Fin del blueprint. Este documento es la fuente de verdad para la fase de código del homepage. Cualquier decisión de implementación que se desvíe debe justificarse contra los mandatos del panel (sección 1).*
