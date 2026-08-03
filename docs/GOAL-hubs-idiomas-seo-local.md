# GOAL — Hubs de idioma de idiomaswl.com

## Objetivo
Convertir cada idioma en un **hub** que (a) rankee en **primera página de Google en Bucaramanga**, (b) sea citado por motores de respuesta (AI Overviews, ChatGPT, Perplexity), y (c) conecte todo el ecosistema del sitio. Cerrar reorganizando el nav.

## Contexto fijo (no re-descubrir)
- Repo `~/Developer/idiomaswl`, Next.js 16. **Nunca desplegar desde el árbol local** (tiene WIP ajeno): worktree desde `origin/main` → build → verificar en dev server propio → push fast-forward. Ver `docs/blueprint-nav-hub-idiomas.md`.
- **Sede presencial: Calle 47 # 29-33, Sotomayor, Bucaramanga.** WhatsApp 573005004253. Presencial en Bucaramanga, Floridablanca, Girón y Piedecuesta; online al resto del mundo. **Nunca escribir "100% online".**
- Fundadores: **José David Duarte Silva** (políglota 8 idiomas) y **Zhanna Korzh** (**co-fundadora** y directora académica, estudió en **Francia e Inglaterra**). Orden real de aprendizaje de David: inglés → italiano → portugués → francés → ruso → alemán → japonés → coreano.
- CTA siempre "diagnóstico gratis", nunca "clase gratis".
- Ya existen `src/components/hub/FoundersBand.tsx` y `PracticeBand.tsx`.
- **Referencia terminada: `/clases-de-frances`.** Replicar ese patrón, no reinventarlo.

## Regla de oro: investigar antes de escribir
Para **cada** idioma, antes de tocar código: research SEO/AEO/GEO con búsquedas reales (SERP, People-Also-Ask, autocompletado, foros, competidores). Entregar: consultas head/medio/long-tail; consultas de sus exámenes oficiales; 8-10 FAQs tal como las escribe un usuario; competidores reales; ángulos LatAm sin cubrir; **y qué se busca en Bucaramanga**. Sin dato duro de volumen, decirlo — no inventar cifras.

## Qué debe tener cada hub
1. **Local Bucaramanga (prioridad #1)**: title/description/keywords con "<idioma> Bucaramanga"; sección "Clases de X en Bucaramanga: presencial u online" con CTA de WhatsApp local; 3+ FAQs locales (dónde, presencial vs virtual, precio).
2. **Schema**: `['LocalBusiness','LanguageSchool']` con dirección real, geo, `areaServed` de los 4 municipios, `openingHours`, `hasMap`, `sameAs` y `founder` → David + Zhanna; `Course` con `CourseInstance` `online` y `onsite` (con `location`); `Person` de ambos; `FAQPage` **idéntico** a las FAQs visibles; `BreadcrumbList`.
3. **Autoridad**: `FoundersBand` bajo el hero. Zhanna se destaca en francés e inglés; en los demás va como co-fundadora y directora académica — **no inventarle vínculo con idiomas que no estudió**.
4. **Red neuronal del sitio**: enlazar TODO lo del idioma — las 5 habilidades de `/practica/<idioma>`, simulacros de `/examenes`, artículos de `/blog`, `/nivel-radar`, `/precios`, `/metodo`. Verificar cada link con HTTP 200 antes de commitear.
5. **Bloque AEO**: responder con datos verificables la duda de mayor intención del idioma (como "¿el DELF sirve para Canadá?"). Respuesta directa primero, 100-150 palabras.

## Orden
italiano → portugués → **ruso (crear)** → alemán → **japonés (crear)** → coreano (revisar) → inglés.
Inglés: no pelear el head term nacional; atacar `clases de inglés Bucaramanga` y el clúster de exámenes, explotando `/clases-de-ingles-bucaramanga`.

## Cierre
1. Página **"Quiénes somos"** (David + Zhanna + métricas + testimonios reales).
2. **Nav final**: `Home · Idiomas ▾ (los 8) · Exámenes · Práctica · Quiénes somos`. Retirar Inglés, Coreano y Nivel Radar como ítems sueltos. **No borrar Práctica.** Login y tema igual. Se cambia **al final**, con las 8 páginas listas.

## Honestidad exigida
- No publicar precios de exámenes ni requisitos migratorios sin verificar: cambian cada año y un dato falso destruye el E-E-A-T. Ante duda, redactar sin cifra caduca y remitir a la fuente oficial.
- Verificar leyendo el código, no por `grep` suelto: ya hubo dos auditorías equivocadas así. Chequear blog / instructor / práctica por separado.
- Reportar lo que falló y lo que quedó fuera.
