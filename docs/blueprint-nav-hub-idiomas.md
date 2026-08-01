# Blueprint — Nav simplificado + Hub de Idiomas SEO/AEO/GEO

**Estado:** propuesta para aprobación. No se ha tocado código.
**Objetivo del usuario:** nav más corto (`HOME · Idiomas · Exámenes · Práctica · Quiénes somos`) + que cada idioma se convierta en un imán de búsqueda que aterrice gente y ahí encuentre TODO: práctica, ejercicios, clases, y a David/Zhanna como autoridad.

---

## 1. Diagnóstico real (auditado, no adivinado)

**La buena noticia: no partimos de cero. Partimos de piezas sueltas.**

| Qué existe | Estado real |
|---|---|
| Landing por idioma (`/clases-de-X`) | ✅ 6 de 8: Inglés (697 líneas), Coreano (821), Alemán (425), Francés (427), Italiano (356), Portugués (326) |
| Landing de Japonés / Ruso | ❌ **No existen** — pero SÍ hay contenido de práctica ya construido para ambos |
| Hub `/clases-de-idiomas` | ✅ Ya existe, con las 6 tarjetas por idioma, buen SEO metadata |
| Contenido de blog por idioma | ✅ **124 artículos reales** (no 35 — la memoria del proyecto estaba desactualizada). Coreano 19, Inglés 11, Francés 10, Italiano 9, Alemán 9, Portugués 7 |
| Práctica (`/practica/X`) | ✅ Contenido real para 8 idiomas: inglés, coreano, francés, alemán, italiano, portugués, japonés, ruso |
| Página "Quiénes somos" | ❌ **No existe en absoluto** |

**⚠️ Corrección (mi primer chequeo estaba mal — dejo esto documentado para no repetir el error):** el primer grep que hice ("0 links en todas partes") usaba un patrón que no detectaba links reales. Con un chequeo correcto, el mapa real es:

| Idioma | Sección "Del blog" | Bloque instructor/testimonios | Links reales a práctica |
|---|---|---|---|
| Coreano | ✅ 18 artículos | ✅ | ✅ 5 links |
| Inglés | ✅ | ✅ (testimonios reales) | ✅ 7 links |
| Francés | ❌ | ❌ | ❌ solo el link al examen |
| Italiano | ❌ | ❌ | ❌ solo el link al examen |
| Alemán | ❌ | ❌ | ❌ solo el link al examen |
| Portugués | ❌ | ❌ | ❌ solo el link al examen |

**Coreano e Inglés ya son "super-hubs" completos.** El gap real está concentrado en **Francés, Italiano, Alemán y Portugués** — a esas 4 les falta exactamente la plantilla de la sección 4.

---

## 2. La tesis del blueprint

**No hace falta escribir mucho contenido nuevo. Hace falta conectar el que ya existe — y llenar 3 huecos concretos.**

1. **Conectar** cada landing de idioma con: su práctica gratis, sus artículos de blog relevantes, y la autoridad de David/Zhanna.
2. **Llenar los huecos**: página "Quiénes somos", landing de Japonés, landing de Ruso.
3. **Reorganizar el nav** para que "Idiomas" sea el punto de entrada único a los 8.

---

## 3. Propuesta de nav

```
HOME · Idiomas ▾ · Exámenes · Práctica · Quiénes somos
```

- **"Idiomas"** pasa a ser un dropdown (o mega-menú simple) con los 8 idiomas — cada uno linkeando a su `/clases-de-X`. Así "se ven todos los idiomas con su link" sin abrir una página intermedia.
- Los ítems actuales sueltos del nav (**Inglés**, **Coreano**, **Nivel Radar**) se retiran como top-level y quedan dentro del dropdown de Idiomas (Nivel Radar puede vivir como CTA secundario dentro del hub, no en el nav principal).
- **Exámenes** y **Práctica** se mantienen igual — ya son sólidos.
- **Quiénes somos**: página nueva, autoridad de David (políglota 8 idiomas) + Zhanna (directora académica), con foto, trayectoria, testimonios reales que ya existen (Leonardo, Carlos, Karen, Daniel).

---

## 4. Anatomía del "super-hub" por idioma (la plantilla a replicar)

Cada `/clases-de-X` debe tener, en este orden:

1. **Hero con intención de búsqueda real** (ya lo tienen los 6 existentes — mantener).
2. **Sección "Practica gratis ahora"** → cards a `/practica/X` (gramática, escritura, listening si existe). **Esto no existe hoy en ninguna landing.**
3. **Sección "Del blog"** → 3-4 artículos reales ya escritos para ese idioma, con su ángulo de búsqueda (migración, tiempo de estudio, certificación). **Ya escrito, solo falta enlazar.**
4. **Autoridad** → bloque David/Zhanna (ya existe como patrón en inglés/coreano, replicar).
5. **CTA WhatsApp** (ya existe en todas).
6. **JSON-LD** Course + FAQPage + BreadcrumbList (ya existe en las 6, replicar en japonés/ruso nuevas).

---

## 5. Plan de fases (para aprobación)

| Fase | Qué hace | Alcance |
|---|---|---|
| **4a — Piloto** | Tomar **1 idioma del gap real** (Francés) y aplicarle la sección "Practica gratis" + "Del blog" + instructor, con el mismo patrón visual de Coreano/Inglés | 1 página |
| **4b — Revisión** | El usuario revisa el piloto en vivo | — |
| **4c — Escalar conexión** | Aplicar el mismo patrón a Italiano, Alemán, Portugués (Coreano e Inglés ya están completos, no se tocan) | 3 páginas |
| **4d — Llenar huecos** | Crear landing de Japonés y Ruso desde cero (con su propio research de intención de búsqueda) + página Quiénes somos | 3 páginas nuevas |
| **4e — Nav** | Dropdown "Idiomas" con los 8, retirar ítems sueltos, agregar "Quiénes somos" | `SiteNav.tsx` |

**Por qué este orden:** el nav se cambia AL FINAL (4e), después de que las 8 páginas destino ya existan y estén conectadas — así el dropdown nunca apunta a algo a medio construir.

---

## 6. Decisiones aprobadas (2026-07-31)

1. **Piloto: Francés** (corregido — Coreano ya estaba completo, ver corrección arriba).
2. **"Nivel Radar"** se retira del nav top-level → vive como CTA secundario dentro del hub de Idiomas.
3. **"Quiénes somos"**: David + Zhanna + métricas (+1000 estudiantes, testimonios reales ya existentes en home).

**Estado:** ✅ Fase 4a completa y desplegada (commit `4462e2a`). Auditoría corregida otra vez al leer el código real: Francés SÍ tenía "Del blog" (8 artículos) — solo faltaban práctica e instructor. Se agregaron 4 links reales a `/practica/frances` (verificados uno por uno) + bloque de autoridad de David.

**✅ 4b — Revisión: APROBADO (2026-07-31).** El usuario vio el piloto en vivo y le gustó estética + patrón. Dio 2 ajustes antes de escalar:

1. **Orden de idiomas de David** (su propio orden real de aprendizaje, usar para priorizar 4c/4d): inglés → italiano → portugués → francés → ruso → alemán → japonés → coreano. Como inglés y coreano ya están completos, el orden de trabajo pendiente queda: **italiano, portugués** (4c, ya tienen landing) → **ruso** (4d, sin landing) → **alemán** (4c, ya tiene landing) → **japonés** (4d, sin landing).
2. **Zhanna debe aparecer como políglota**, específicamente en los idiomas que ella estudió (Francia e Inglaterra → francés e inglés). Debe estar en el hero o muy cerca de él en esas páginas — no solo como bloque secundario — mostrando a David + Zhanna como pareja políglota, autoridad conjunta. **Pendiente: agregar a Zhanna en el piloto de Francés (ajuste a lo ya desplegado) y en Inglés**, antes o junto con escalar a las demás.
3. **Duda abierta del usuario sobre contenido/SEO**: no sabe si el contenido actual es "suficiente" para SEO/AEO/GEO. Respuesta honesta pendiente de dar — conectar contenido existente (lo que hace este blueprint) mejora enlazado interno y autoridad tópica, pero no añade profundidad/volumen nuevo de contenido. Si se quiere competir de verdad en AEO/GEO (respuestas directas de IA), probablemente hace falta contenido adicional dirigido a preguntas long-tail reales — evaluar como posible fase 4f, no bloquea 4c/4d.

---

## 7. Fase 4c — ejecutada (2026-07-31, commit `0a0c429`)

**Componentes compartidos creados** (`src/components/hub/`) — a partir de aquí escalar a un idioma nuevo es enchufar dos componentes, no copiar CSS:

| Componente | Qué hace |
|---|---|
| `FoundersBand` | Banda David + Zhanna justo debajo del hero. Props por idioma: `accent`, `title`, `intro`, `davidLine`, `zhannaLine`, `zhannaTags`. |
| `PracticeBand` | Sección "Práctica gratuita" con N tarjetas a `/practica/<idioma>`. Color por `--pb-accent`. |

**Aplicado en:** Francés, Inglés, Italiano, Portugués, Alemán (FoundersBand en los 5; PracticeBand en Italiano, Portugués y Alemán — Francés ya lo tenía inline, Inglés e Coreano ya estaban completos).

**Corrección de dato importante:** la página de Francés afirmaba que el francés fue el *segundo* idioma de David. Según su orden real de aprendizaje (inglés → italiano → portugués → francés → ruso → alemán → japonés → coreano) fue el **cuarto**. Corregido en el H2, el cuerpo y el JSON-LD.

**Copy:** "clase gratis" → "diagnóstico gratis" en todos los CTAs y títulos de landings (decisión del usuario).

### 7.1 SEO/AEO — qué se agregó y por qué

Research de intención de búsqueda real (no volumen medido — sin acceso a Keyword Planner/Ahrefs; todo inferido de SERPs, People-Also-Ask y competidores que rankean).

| Idioma | Hueco detectado | Bloque agregado |
|---|---|---|
| Francés | La consulta de mayor frustración e intención comercial del vertical es "¿el DELF sirve para Canadá?" — y la respuesta es **no** (IRCC acepta TEF Canada / TCF Canada). Nadie lo explica bien en español. | H2 `¿El DELF sirve para migrar a Canadá?` + 4 FAQs (DELF vs DALF vs TCF vs TEF, sedes en Colombia, nivel para estudiar en Francia). |
| Italiano | El ángulo dinero es **ciudadanía italiana** (ya cubierto), pero faltaban los datos operativos: sedes en Colombia, duración, tiempos de resultado, y que el examen **no existe online**. Cero competencia en español para esto. | H2 `Dónde presentar el examen de italiano en Colombia` + 4 FAQs. |
| Portugués | **La SERP más débil de todas — sí es realista rankear.** Y WeLearn está en Bucaramanga, una de las ciudades donde se aplica el Celpe-Bras. Nadie ha escrito eso. | H2 `Dónde se presenta el Celpe-Bras en Colombia` (nombra Bucaramanga) + 5 FAQs (formato sin opción múltiple, el nivel se obtiene y no se elige, revalidación de título, Brasil vs Portugal). |

**Veredicto honesto sobre inglés:** "clases de inglés online" no es rankeable a corto ni mediano plazo — la SERP es British Council, Open English, Platzi, Preply. Lo ganable es `+Colombia`, `+Bucaramanga` y todo el clúster de exámenes/decisión. La landing de inglés debe optimizarse para conversión y para ser citada por IA, no para ese head term.

### 7.2 Respuesta a la duda del usuario: "¿el contenido alcanza para SEO/AEO/GEO?"

Parcialmente, y ahora más que antes:
- **Lo que sí resuelve esta fase:** enlazado interno real (landing → práctica → examen), autoridad de personas declarada en JSON-LD (`Person` con `knowsLanguage`, `Course.instructor`), y bloques de respuesta directa con `FAQPage` schema — que es exactamente el formato que extraen AI Overviews, ChatGPT y Perplexity.
- **Lo que NO resuelve:** volumen y profundidad. Para dominar de verdad hace falta un clúster de blog por idioma apuntado a long-tail (mínimo ~4 artículos nuevos por idioma, todos enlazando a su landing).
- **Riesgo a vigilar:** varios datos migratorios y de exámenes cambian cada año. Los bloques nuevos están redactados sin cifras que caduquen rápido y con una llamada explícita a verificar en la fuente oficial. **No publicar cifras de precio ni requisitos normativos sin verificarlos** — un dato falso en esta materia destruye E-E-A-T.

---

## 8. Fase 4c-bis — Francés al 100% + SEO local (commit `099a0ab`)

Tres correcciones que pidió el usuario tras revisar 4c:

**1. Zhanna es CO-FUNDADORA.** No solo directora académica. Corregido en las 5 landings, en el bloque de equipo de la home y en el `jobTitle` del JSON-LD.

**2. WeLearn tiene presencia PRESENCIAL en Bucaramanga.** El sitio decía "100% online" en las franjas de prueba, y dos FAQs de inglés afirmaban que "WeLearn opera principalmente online" — falso, y perjudicial para el SEO local. Corregido en todas partes: el mensaje ahora es **presencial en Bucaramanga + online en toda Colombia**.

**3. Francés queda como la implementación de referencia al 100%** — el patrón a copiar en cada idioma:

| Pieza | Qué se hizo |
|---|---|
| Metadata | Title/description/keywords atacan "clases de francés Bucaramanga" además del término online, más TCF/TEF Canadá. |
| `LocalBusiness` | Pasa a `['LocalBusiness','LanguageSchool']` con `geo` (7.1193, −73.1227), `areaServed` (Bucaramanga, Floridablanca, Girón, Piedecuesta), `openingHours`, `hasMap`, `sameAs` (con TikTok) y `founder` → David + Zhanna. |
| `Course` | Dos `CourseInstance`: `online` y `onsite`, este último con `location` apuntando al negocio local. Ambos con los dos instructores. |
| Sección visible | `Clases de francés en Bucaramanga: presencial u online` — presencial / online / mixto, con CTA de WhatsApp propio para consultas locales. |
| FAQs locales | 3 nuevas (dónde tomar clases, presencial vs virtual, cuánto cuestan), replicadas en el `FAQPage`. |
| Recursos | La sección de práctica pasa de 4 a **8** destinos: las cinco habilidades, simulacros DELF/DALF y el diagnóstico de nivel. Los 8 verificados con HTTP 200. |

### 8.1 Límite honesto del SEO local

Todo lo anterior es lo que se puede hacer **desde el código**. El factor con más peso en el pack local de Google **no está en el repo**: es el **Perfil de Empresa de Google** (dirección exacta verificada, categoría, fotos, horarios y sobre todo **reseñas**). Sin eso reclamado y optimizado, el marcado estructurado ayuda pero no alcanza para el mapa. Es la tarea #1 del usuario fuera del código.

Segundo límite: el JSON-LD declara `streetAddress: 'Bucaramanga'`, que es un placeholder heredado. Cuando haya dirección exacta hay que ponerla — Google la contrasta con el Perfil de Empresa.

### 8.2 Pendiente

- **4d** — Ruso y Japonés: no existe landing. Crearla desde cero con research propio + los dos componentes de `hub/`. Orden del usuario: ruso antes que japonés.
- **4d** — Página "Quiénes somos" (David + Zhanna + métricas).
- **4e** — Nav: dropdown "Idiomas" con los 8, retirar Inglés/Coreano/Nivel Radar como top-level, agregar "Quiénes somos". Va al final.
- **4f (nuevo, opcional)** — Clúster de blog long-tail por idioma. Es lo que falta para pasar de "bien enlazado" a "primera página".

---

## 9. Mapa competitivo de Bucaramanga (research, 2026-08-01)

**Dificultad real de ganar la SERP local, de más fácil a más difícil:**

| Nivel | Idiomas | Por qué |
|---|---|---|
| 🟢 Casi vacío | **Ruso, japonés, coreano** | Cero academias locales. La SERP la rellenan Superprof y agregadores, señal de que no hay contenido real compitiendo. |
| 🟡 Competencia institucional sin contenido | **Italiano, alemán, portugués** | Solo universidades (UIS, UNAB, UPB, USTA), en niveles básicos y mayormente cerradas a su comunidad. Ninguna con página SEO decente. |
| 🔴 Difícil | **Francés, inglés** | Alianza Francesa monopoliza la certificación de francés; en inglés hay 16 centros certificados, redes nacionales y universidades. Atacar solo por nicho y long-tail. |

**Competidores locales reales:** Centro Colombo Americano (solo inglés), Alianza Francesa (solo francés), UIS/UNAB/UPB/USTA, Praxis y Smart Academia (ambos con sede en Sotomayor, vecinos directos), Celai, Caisa, Lingüi Academy y ULA. **Ninguno pasa de 5 idiomas.** WeLearn es la única con 8 idiomas + 8 exámenes bajo una marca — esa es la ventaja estructural.

**Centros de examen en Bucaramanga (verificado):** IELTS ✅ (UNAB/British Council y UIS) · TOEFL ✅ (UNAB, UIS) · DELF/DALF/TCF ✅ (Alianza Francesa) · Oxford Test ✅ (Praxis) · **CILS/CELI/PLIDA ❌ · Goethe ❌ · TOPIK ❌**. El Celpe-Bras está en verificación (ver 9.2).

### 9.1 Factores del pack local que sí mueven la aguja

Pesos (Whitespark 2026): Perfil de Empresa 32% · reseñas 20% · on-page 15%.

- **Factor #1: la categoría primaria del Perfil de Empresa.** Debe ser **"Escuela de idiomas"**, no "escuela de inglés" — WeLearn vende ocho idiomas.
- **Nunca ocultar la dirección.** Hay pruebas documentadas (Sterling Sky) de fichas que la ocultaron y desaparecieron del pack local por completo; al restaurarla, volvieron. Se pueden añadir zonas de servicio sin borrar la dirección.
- **Reseñas: manda la recencia, no el total.** 74% de usuarios busca reseñas de los últimos 3 meses. Flujo constante > lote grande. Responder el 100%.
- **No sirve para ranking:** Google Posts (estudio controlado: 441 keywords, 9 semanas, cero movimiento) y los rich results de FAQ (Google los deprecó por completo en mayo de 2026 — el `FAQPage` se mantiene porque ayuda a la extracción por IA, no por las estrellitas).
- **Riesgo a evitar:** con una sola sede, crear muchas páginas de ciudad/barrio es *doorway content*. Solo hacerlas si llevan contenido único real.

### 9.2 Pendiente de verificar antes de publicar

El Celpe-Bras podría aplicarse en Bucaramanga (UNAB, avalada por IBRACO, sería el único centro del nororiente). Sería **el mejor activo local del sitio**, pero la lista de postos del INEP revisada no incluía Bucaramanga. **No publicarlo hasta confirmarlo con la convocatoria vigente.**

---

### 8.3 Orden de trabajo acordado

El usuario pidió explícitamente: **francés al 100% primero, y ahí sí escalar.** Francés ya está (commit `099a0ab`). El siguiente paso es replicar el paquete completo — banda de fundadores + recursos ampliados + **sección y schema local de Bucaramanga** + FAQs locales — en el resto, en su orden de aprendizaje:

**italiano ✅ → portugués → ruso (crear) → alemán → japonés (crear)**

**Italiano completado (commit `d2e6e96`).** Hallazgo diferencial: la sede de Bogotá dejó de aplicar el examen corto de "B1 Ciudadanía" y ahora exige el CILS B1 completo. Ángulo local: el consulado honorario de Italia en Bucaramanga cubre tres departamentos y no hay ninguna sede de examen ni academia especializada en su territorio. De paso se corrigieron tres datos que yo mismo había publicado mal (sedes de PLIDA sin Medellín, tiempos de resultado del examen corto, y la exigencia de B1 por descendencia).

Inglés merece tratamiento aparte: no se pelea el head term nacional, se pelea `clases de inglés Bucaramanga` y el clúster de exámenes. Ya existe `/clases-de-ingles-bucaramanga`, que es el activo local más defendible del sitio y hoy está infrautilizado.


---

## 10. Cierre del plan (2026-08-01)

**Los 8 hubs están en producción, más "Quiénes somos" y el nav reorganizado.**

| Idioma | Commit | Hallazgo diferencial |
|---|---|---|
| Francés | `099a0ab` | El DELF **no sirve** para migrar a Canadá; se usan TEF/TCF Canada. |
| Italiano | `d2e6e96` | En Bogotá **ya no existe** el examen corto de "B1 Ciudadanía": ahora es el CILS B1 completo. Consulado honorario en Bucaramanga con jurisdicción sobre 3 departamentos, y cero sedes de examen. |
| Portugués | `cad60ae` | **El Celpe-Bras sí se aplica en Bucaramanga** (IBRACO, sede UNAB). Es el único examen de idiomas que no obliga a viajar. Y "curso de portugués bucaramanga" es la 2ª sugerencia de autocompletado en Colombia. |
| Ruso | `5788f91` | Página nueva. Cero competencia local: ni UIS ni UNAB lo enseñan. En Colombia **no hay centro examinador permanente** de ТРКИ. |
| Alemán | `ee71073` | El nivel depende del trámite, no del "curso": A1 visa familiar, B1 Ausbildung (B2 de facto en salud), B1→B2 enfermería, A1/B1/B2 Chancenkarte, ~C1 universidad. Goethe **no se aplica** en Santander. |
| Japonés | `5e0d4c0` | Página nueva. En Colombia el JLPT se aplica **una sola vez al año** (julio, solo Bogotá), frente a dos en el resto del mundo. Y las 5 vocales del japonés son las del español. |
| Coreano | `5e0d4c0` | Puesto al patrón: Zhanna no aparecía, y su sección de práctica enlazaba 2 destinos de los 8 disponibles. |
| Inglés | `415a41b` | Las dos landings tenían **cero** enlaces a `/practica`, siendo el idioma con más contenido del sitio (32 rutas + 3 simulacros). |

**Nav final (`59dc06c`):** `Home · Idiomas ▾ · Exámenes · Práctica · Quiénes somos · Blog · Precios`. Se retiraron Inglés, Coreano y Nivel Radar como ítems sueltos, según lo acordado. **Blog y Precios se conservaron** porque no estaban en la lista de retirados y quitarlos dejaría esas páginas sin entrada — si se quieren fuera, es una línea.

### 10.1 Infraestructura compartida creada

`src/components/hub/`: `FoundersBand`, `PracticeBand`, `LocalBand` y `localBusiness.ts` (fuente única del NAP y constructores de `localBusinessNode`, `davidNode`, `zhannaNode`, `courseInstances`). Añadir un idioma nuevo es enchufar tres componentes, no copiar 40 líneas de JSON-LD.

`robots.ts` declara explícitamente GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended y Applebot-Extended. El comodín ya los permitía; queda explícito para que nadie los bloquee por error.

### 10.2 Lo que sigue pendiente

1. **Fotos y reseñas en el Perfil de Empresa de Google.** Es el factor de mayor peso del pack local y no se puede tocar desde el código. Sin eso, el marcado ayuda pero no basta.
2. **Fase 4f — clúster de blog long-tail por idioma.** Es lo que falta para pasar de "bien enlazado" a competir de verdad por volumen.
3. **Verificar anualmente** los datos de examen y migración de cada hub. Están redactados evitando cifras que caduquen rápido, pero calendarios y requisitos cambian.
4. Decidir si Blog y Precios salen del nav.
