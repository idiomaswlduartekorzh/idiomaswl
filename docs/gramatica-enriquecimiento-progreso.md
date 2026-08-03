# Progreso — enriquecimiento de gramática (molde v2)

Aplicar el molde v2 (ver `docs/gramatica-content-spec.md`) a los **465 temas** de
`src/data/grammar/**`: tablas de referencia por tipo de tema + prosa pedagógica sin carreta +
FAQ/SEO por tema. Este archivo es el tracker durable entre sesiones.

## Estado por idioma × nivel

| Idioma | A1 | A2 | B1 | Notas |
|---|---|---|---|---|
| italiano | ✅ 18/18 | ✅ 20/20 | ✅ 6/6 | **COMPLETO 44/44** y verificado. Idioma-plantilla de referencia. |
| inglés | ✅ 25/25 | ✅ 20/20 | ✅ 20/20 | **COMPLETO 65/65** (226 FAQ) y verificado. |
| portugués | ✅ 18/18 | ✅ 20/20 | ✅ 20/20 | **COMPLETO 58/58** (todos ≥3 FAQ, tsc+validador verde). B1 ya traía prosa rica + guide.table; se reformularon headings a pregunta. Pulido opcional: añadir seo[].table de paradigma completo a 13 temas B1 que solo tienen guide.table. |
| francés | ✅ 18/18 | ✅ 20/20 | ✅ 20/20 | **COMPLETO 58/58** (todos ≥3 FAQ, tsc+validador verde). A2 delgado → reformular 2 + añadir 1 FAQ; B1 tenía 3-5 secciones → solo rephrase de headings a pregunta. |
| alemán | ✅ 20/20 | ✅ 20/20 | ✅ 20/20 | **COMPLETO 60/60** (todos ≥3 FAQ, tsc+validador verde). Rephrase de headings a pregunta + FAQ nueva en los de 2 secciones. | |
| coreano | ✅ 20/20 | ✅ 20/20 | ✅ 20/20 | **COMPLETO 60/60** (todos ≥3 FAQ, tsc+validador verde). **PENDIENTE REVISIÓN ZHANNA (dir entero).** OJO B1: 7 archivos usan formato compacto de 1 línea `{heading: '...', paragraphs:[...]}` → el old_string del Edit es `{heading: '...'` (sin 6 espacios). |
| japonés | ✅ 20/20 | ✅ 20/20 | ✅ 20/20 | COMPLETO 60/60 (≥3 ¿-headings, tsc limpio, validador 0 fallos). Dir entero pendiente revisión Zhanna (registro en tracker, no reviewFlag). |
| ruso | ✅ 20/20 | ✅ 20/20 | ✅ 20/20 | COMPLETO 60/60 (≥3 ¿-headings, tsc limpio, validador 0 fallos). Dir entero pendiente revisión Zhanna (registro en tracker, sin reviewFlag). |

**Total: 465/465 HECHO ✅ (los 8 idiomas completos: italiano, inglés, portugués, francés, alemán, coreano, japonés, ruso — A1+A2+B1). Verificación global: 465/465 con ≥3 ¿-headings, `tsc` limpio (solo se ignora el error preexistente delf-b2-set-1), validador `check-grammar-exercises.mjs` 0 fallos.**

> **Dónde está esto hoy (verificado 2026-08-02).** El enriquecimiento **sí está commiteado**, en los commits `8fd6396` (los 465 temas) y `47a19b1` (calificación de producción libre por heurístico). Lo que ocurre es que viven en `feature/icfes-mock-21-23` y en su respaldo `wip/limpieza-2026-08-02`, **no en `main`** — esa rama se separó de `main` el 18 de julio y quedó 76 commits por detrás.
>
> Es decir: el trabajo no está perdido, pero **no está en producción** y no llegará hasta que alguien rebase esos commits sobre `main`. Son 465 archivos contra 76 commits de diferencia, así que conviene hacerlo con tiempo y no en caliente.
>
> Sigue pendiente la **revisión de Zhanna** de los directorios `coreano/`, `japones/` y `ruso/` enteros (por diseño, sin `reviewFlag`).

## Orden de ataque
1. **Italiano** entero (idioma-plantilla): A2 → B1. *(en curso)*
2. Lenguas que puedo autorar con fidelidad: **inglés, portugués, francés, alemán** (por niveles A1→A2→B1).
3. **Coreano, japonés, ruso**: enriquecer con tablas factuales, marcar cada archivo para **revisión de Zhanna** antes de considerarlo cerrado.

## Barra por tema (checklist)
- [ ] metaTitle + description targetizados (keyword investigada).
- [ ] ≥ 1 tabla de referencia adecuada al tipo (paradigma completo si es verbo).
- [ ] Prosa pedagógica sin carreta (abre con la regla, contrasta con español, marca la trampa).
- [ ] ≥ 3 headings `seo[]` en formato pregunta (FAQ/SERP).
- [ ] `npm run check:grammar-exercises` verde + `scripts/_verify-engine.mjs` sin bloqueos.

## Aprendizajes de operación
- Editar `seo[]` con cuidado de NO comerse el cierre `],` del array (rompió 2 archivos en A1; verificar con `tsc` + harness por lote).
- Tablas: máx. 4 columnas (legibilidad móvil); paradigmas verbales = 6 personas.
- No abrir el preview del navegador (PC de 8GB, crashea). Verificar con validador + harness Node.
