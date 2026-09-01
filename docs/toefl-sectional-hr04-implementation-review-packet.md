# HR-04 — paquete de revisión de plantilla editorial e IU

> Estado: **PENDIENTE DE REVISIÓN HUMANA**
>
> Preparado: 2026-09-01
>
> Rama: `codex/toefl-sectional-seo-harness-20260831`
>
> Commit de IU: `ff23bb175cad4d74dc1e0106dad558d784118624`
>
> No autoriza: runner seccional, integración en `main`, despliegue ni release.

## 1. Qué está listo para revisar

- `/practica/toefl` presenta las tres puertas aprobadas: **Ejercicios**, **Práctica** y **Simulacros**.
- **Práctica** comunica “Próximamente” y no ofrece un enlace falso.
- `/practica/toefl/ejercicios` muestra en HTML los 12 tipos vigentes agrupados en Reading 3, Listening 4, Writing 3 y Speaking 2.
- Las seis tareas con ruta real abren práctica individual. Las seis sin ruta individual se muestran como “En simulacros” y usan un solo CTA de clúster hacia `/examenes/toefl#practica`.
- Las seis páginas individuales de Reading y Writing incluyen breadcrumb con padre **Ejercicios**, retorno al clúster y acceso al simulacro completo.
- El hub y el catálogo tienen canonical propio, sitemap, `LearningResource`, `BreadcrumbList` y FAQ visible con paridad en JSON-LD.
- La tarjeta TOEFL de `/practica` ya no promete “1 pasaje · 6 preguntas”; comunica `12 tipos · 20 simulacros` y que las rutas guiadas siguen en desarrollo.

## 2. Alcance académico

La aprobación `HR-04-SOURCE` de Zhanna Korzh habilitó C01–C08 y C10. Esta implementación usa solamente C03–C06 y C10:

- C03–C06: nombres de las doce familias y agrupación por sección.
- C10: material original de WeLearn, no afiliación con ETS, recorrido fijo y ausencia de scoring oficial.
- C09: **no se implementó**. No aparecen tiempos ni conteos oficiales de ítems en el hub, catálogo, Listening o Speaking tocados por este slice.

La aprobación de fuentes no equivale a aprobación de esta plantilla renderizada. HR-04 permanece abierto hasta registrar la revisión académica de la IU/copy y la revisión SEO/editorial.

## 3. Evidencia visual persistente

| Vista | Archivo | SHA-256 |
|---|---|---|
| Hub, Chromium 1440 px | `docs/prototypes/screenshots/hr04-hub-desktop.png` | `bd510d57ba42abf04424775ef765f7dbfd8f0bb8df5b1ffbd1f7415d1cca24f8` |
| Catálogo, Chromium 1440 px | `docs/prototypes/screenshots/hr04-catalog-desktop.png` | `4c316447c1237dfe83e2235eb70d918ff293fef5cbd4373a8f05480a24800cdf` |
| Catálogo, Chromium 390 px | `docs/prototypes/screenshots/hr04-catalog-mobile.png` | `84c4cb181d60a51d192cf34414ee4dd576e4e4a15813e47e2ac031ca3202a36b` |

Las capturas se generaron desde una copia efímera de 54 MB en `/tmp`, con `node_modules` y `public` enlazados a sus fuentes existentes. No se instalaron ni duplicaron dependencias.

## 4. Evidencia técnica

Pasaron:

- `npm run check:toefl-sectional-catalog`
- `npx tsc --noEmit --pretty false --incremental false`
- `npm run check:practica-catalog`
- `npm run check:production-baseline`
- `npm run check:toefl-editorial`
- `npm run check:seo-foundation`
- seis rutas individuales respondieron HTTP 200 y expusieron ambos enlaces de retorno
- el catálogo respondió HTTP 200 con canonical absoluta, H1 y tres bloques JSON-LD

`npm run check:exam-practice-content` conserva exactamente las 12 deudas visibles ya registradas en D9: cinco de IELTS, dos disclosures legacy de TOEFL Writing y cinco de Complete the Words. No se alteró el script ni se redujeron controles.

El build global queda para el gate previo a integración, junto con la reconciliación final contra `origin/main`; esta revisión no integra ni publica.

## 5. Preguntas para revisión humana

### Académica

- [ ] Los 12 nombres y sus explicaciones breves conservan el sentido de C03–C06.
- [ ] “Disponible”, “En simulacros” e “Individual próximamente” no exageran el producto existente.
- [ ] El disclosure C10 es visible, claro y suficiente cerca del contenido principal.
- [ ] Se confirma que C09 debe seguir ausente.

### SEO/editorial

- [ ] `/practica/toefl` posee la intención de selección de modo y no compite con `/examenes/toefl`.
- [ ] `/practica/toefl/ejercicios` posee la intención “ejercicios TOEFL” y no compite con los hubs seccionales.
- [ ] Title, description, H1, canonical, breadcrumbs, FAQ y schema mantienen paridad.
- [ ] Los enlaces internos son descriptivos y ninguna tarjeta simula una ruta inexistente.

### UX/accesibilidad

- [ ] Las tres puertas se comprenden sin explicación adicional.
- [ ] Los cuatro clústeres se encuentran sin filtros, carrusel o interacción obligatoria.
- [ ] Los estados se entienden sin depender únicamente del color.
- [ ] Escritorio y móvil conservan orden de lectura, foco visible y objetivos táctiles adecuados.

## 6. Forma válida de decisión

La decisión debe identificar a cada revisor humano, rol, fecha y alcance. Ejemplo:

> Apruebo HR-04 para la plantilla renderizada en `ff23bb175cad4d74dc1e0106dad558d784118624`. C09 sigue bloqueado. Nombre, rol, fecha.

Si la revisión pide cambios, debe señalar el claim, bloque o recorrido concreto. La ausencia de respuesta no aprueba el gate.
