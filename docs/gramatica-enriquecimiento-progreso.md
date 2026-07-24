# Progreso — enriquecimiento de gramática (molde v2)

Aplicar el molde v2 (ver `docs/gramatica-content-spec.md`) a los **465 temas** de
`src/data/grammar/**`: tablas de referencia por tipo de tema + prosa pedagógica sin carreta +
FAQ/SEO por tema. Este archivo es el tracker durable entre sesiones.

## Estado por idioma × nivel

| Idioma | A1 | A2 | B1 | Notas |
|---|---|---|---|---|
| italiano | ✅ 18/18 | ✅ 20/20 | ✅ 6/6 | **COMPLETO 44/44** y verificado. Idioma-plantilla de referencia. |
| inglés | ✅ 25/25 | 🔵 0/20 | ⬜ 0/20 | **A1 COMPLETO** (77 FAQ, verificado). Gap del inglés = FAQ (+ alguna tabla seo). **Siguiente: inglés A2** (`src/data/grammar/ingles/a2/`). |
| francés | ⬜ 0/18 | ⬜ 0/20 | ⬜ 0/20 | |
| alemán | ⬜ 0/20 | ⬜ 0/20 | ⬜ 0/20 | |
| portugués | ⬜ 0/18 | ⬜ 0/20 | ⬜ 0/20 | |
| coreano | ⬜ 0/20 | ⬜ 0/20 | ⬜ 0/20 | ⚠️ Requiere validación de Zhanna (tablas factuales, pero contenido en coreano). |
| japonés | ⬜ 0/20 | ⬜ 0/20 | ⬜ 0/20 | ⚠️ Requiere validación de Zhanna. |
| ruso | ⬜ 0/20 | ⬜ 0/20 | ⬜ 0/20 | ⚠️ Requiere validación de Zhanna (declinaciones/aspecto). |

**Total: 69/465 hecho (italiano completo + inglés A1) · 396 pendientes. Siguiente: inglés A2.**

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
