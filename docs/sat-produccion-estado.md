# SAT — estado de producción

Archivo de estado del loop nocturno. **Lo reescribe el loop en cada vuelta.**
Las reglas están en `docs/sat-loop-nocturno.md`; los parámetros y umbrales, en
`docs/sat-ingles-blueprint.md`.

- **Rama:** `feat/red-agentes-sat-ingles`
- **Última vuelta:** 1 · 18 ago 2026 · A1 hecha
- **Siguiente tarea:** **A2** (guardián `check-sat-exam.mjs`)

---

## Cola de trabajo

Se coge la primera sin marcar. Una por vuelta.

### Fase A — Cimientos

- [x] **A1** · `sat-blueprint` verifica los parámetros contra College Board y quita los ⚠️ de `docs/sat-ingles-blueprint.md` §2
- [ ] **A2** · `scripts/check-sat-exam.mjs` con las doce puertas de §4 + `npm run check:sat`
- [ ] **A3** · Contrato: entrada `sat` en `src/data/exams.ts` + forma del set + ruta `/examenes/sat/practica/[id]`

### Fase B — Rebanada vertical

- [ ] **B1a** · M1 · bloque Craft and Structure (13–15 ítems) hasta APTO
- [ ] **B1b** · M1 · bloque Information and Ideas (12–14 ítems) hasta APTO
- [ ] **B1c** · M1 · bloque Standard English Conventions (11–15 ítems) hasta APTO
- [ ] **B1d** · M1 · bloque Expression of Ideas (8–12 ítems) hasta APTO
- [ ] **B1e** · M1 completo: auditorías de conjunto (sesgo, dificultad, simulación) + veredicto
- [ ] **B2** · `sat-integration`: `src/data/mocks/sat-set-1.ts` + registro + ruta servible
- [ ] **B3** · Hub `/examenes/sat` con SEO completo (ver playbook)
- [ ] **B4** · `npx tsc --noEmit` + `npm run build`, una vez

### Fase C — Escala

- [ ] **C0** · `docs/sat-fabrica.md`: la receta real del M1, con costes y atascos medidos
- [ ] **C1** · M2-fácil del set 1
- [ ] **C2** · M2-difícil del set 1 → primer examen completo (81 ítems)
- [ ] **C3** · Set 2 (los tres módulos)
- [ ] **C4** · Set 3, y así hasta que se acabe la noche o el presupuesto

---

## Registro de vueltas

Una línea por vuelta: qué se hizo, qué commit, qué se aprendió. Sin borrar lo anterior.

| Vuelta | Tarea | Resultado | Commit |
|---|---|---|---|
| 1 | A1 · verificar parámetros | ✅ Los 8 parámetros verificados contra 3 PDF oficiales de College Board. **Un error grave corregido** (ver abajo). Solo queda ⚠️ el orden de los tipos dentro de un dominio: College Board no lo publica | `1fe76594` |

---

## Lo aprendido que cambia el trabajo (leer antes de escribir ítems)

1. **El reparto por módulo es 8 C&S / 7 I&I / 7 SEC / 5 EoI.** Los rangos 13–15 / 12–14 /
   11–15 / 8–12 que teníamos son **del examen completo** (50 ítems operativos de los dos
   módulos), no de un módulo. Un redactor que use los rangos viejos mete el doble de Craft
   and Structure del que toca. Cualquier plan que proponga otro reparto se rechaza.
2. **«Palabra» son 6 caracteres.** El rango 25–150 se mide dividiendo los caracteres
   totales entre 6, no contando palabras separadas por espacios. El guardián (A2) tiene que
   contar así.
3. **Cada módulo lleva 27 ítems todos puntuables.** El examen real mete 25 operativas + 2
   de prueba; nosotros no hacemos pretest.
4. **Orden entre dominios, fijo e igual en los dos módulos:** C&S → I&I → SEC → EoI. Dentro
   del dominio se agrupa por tipo de ítem y luego de fácil a difícil, **salvo SEC**, que va
   de fácil a difícil sin agrupar.
5. **M2-difícil también lleva ítems fáciles.** Lo que cambia entre M2-fácil y M2-difícil es
   la media, no la desaparición de los fáciles.
6. **Caducidad:** parámetros del ciclo 2026-27. Reverificar si se produce después de
   agosto de 2027.

## Bloqueos

Lo que no se pudo hacer y por qué. Vacío es buena señal.

| Qué | Por qué | Qué haría falta |
|---|---|---|
| Orden de los tipos de ítem dentro de un dominio | College Board dice que ordena «por elemento de destreza y luego por dificultad», pero no publica cuál es esa secuencia | Nada bloqueante: se reordena un módulo terminado sin reescribir ítems. Convención provisional: el orden en que los lista la tabla oficial |

---

## Decisiones para David

Lo que el loop **no** decide de noche. Se acumula aquí para la mañana.

| Decisión | Contexto | Recomendación |
|---|---|---|
| ¿Hub del SAT también en inglés? | El sitio es español; el volumen de búsqueda del SAT es mayor en inglés, pero ahí compiten Khan Academy y College Board gratis | Español primero. El inglés solo si vamos a por «SAT prep in Spanish» / estudiantes latinos en EE. UU. |
| ¿Adaptatividad M1→M2? | El motor de simulacros sirve secciones lineales | Publicar lineal y decirlo en pantalla; construir la adaptatividad después, con datos |
| ¿Escala 200–800? | No hay tabla de conversión y las oficiales tienen derechos | Puntaje bruto + rango orientativo hasta tener una tabla propia calibrada |
| ¿Cuántos sets antes de anunciarlo? | Un solo simulacro no sostiene una campaña | Tres sets completos (243 ítems) antes de meterle pauta |

---

## Resumen para la mañana

Lo escribe el loop al final. En español llano: qué hay hecho, en qué URL se ve, qué falta.

> (vacío)
