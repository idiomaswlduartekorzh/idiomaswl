# Metodología operativa — Habla acompañada

Este documento define cómo autorar, corregir, certificar e integrar un conjunto de Habla
acompañada sin perder contenido publicado ni convertir evidencia histórica en estado vivo.
Complementa el diseño editorial de
[`habla-acompanado-blueprint.md`](habla-acompanado-blueprint.md).

## 1. Autoridades y fronteras

1. El runtime de `src/data/practica/habla-acompanado/` es la única fuente ejecutable.
2. `docs/habla-*-parrilla.md` describe intención y trazabilidad editorial; no sustituye al runtime.
3. `artifacts/`, `outputs/` y ramas `archive/*` son evidencia histórica. Sirven para investigar,
   nunca para importar, publicar ni declarar vigente una auditoría.
4. `ROLEPLAY_SETS` es el inventario publicado. Un conjunto entra completo, con 20 escenarios;
   no se conecta un candidato al registro para “probarlo”.
5. Producción solo puede venir de un commit de `main` del repositorio canónico.

## 2. Flujo obligatorio

### A. Aislar

```bash
git fetch origin
git worktree add /tmp/<tarea> -b codex/<tarea> origin/main
```

Si la rama existente está atrasada, contiene trabajo mezclado o viene de otro repositorio, no se
fusiona. Se respalda y la corrección se reimplementa sobre `origin/main`.

### B. Inventariar antes de editar

- Identificar el set vivo, su caja, sus 20 slugs y sus rutas.
- Comparar el contenido con `origin/main`, no con una copia local vieja.
- Clasificar cada hallazgo como `runtime`, `documentación`, `evidencia histórica` o `descartado`.
- Si un artefacto dice `NO APTO`, no puede convertirse en `pass` por inferencia. Hace falta una
  simulación posterior a la última edición del escenario.

### C. Corregir de forma quirúrgica

- Cambiar el mínimo texto que cierre el fallo observado: dato privado, condición, carta o cierre.
- No bajar pisos, umbrales ni número de perfiles para obtener verde.
- Una edición de la ficha invalida sus simulaciones anteriores. Una edición que cambie el reparto
  del set también obliga a revisar el conjunto.
- Mantener la carta entre turnos globales 3 y 6 y nombrar el mismo turno en su instrucción visible.

### D. Certificar

Cada escenario publicado necesita exactamente cinco corridas posteriores a su última edición:

| Perfil | Qué demuestra |
|---|---|
| `solid-solid` | El motor completo, cierre y reparto 40–60 |
| `solid-weak` | El andamiaje sostiene al rol débil |
| `weak-weak` | El papel basta sin un jugador experto y mantiene 40–60 |
| `quiet` | El callado produce dato privado, condición y parte del cierre |
| `shortcut` | No existe salida sustantiva antes de 6 turnos globales |

En todas: la carta abre en su turno, no hay filtración, se alcanza el cierre y aparecen al menos
cuatro piezas obligatorias. Las cifras de turnos y palabras se registran con un solo criterio; no
se copian de una simulación anterior ni se completan a ojo.

Los dos guardianes tienen responsabilidades distintas:

- `npm run check:habla-acompanada`: integridad mecánica del registro, contenido, referencias,
  fuentes vivas y rutas.
- `npm run check:habla-release:<objetivo>`: cobertura editorial exacta 20/20 y cinco perfiles.

Un verde estructural no significa “apto editorial”. Un `12/12` no certifica un set de 20.

### E. Verificar el producto completo

```bash
npm run check:habla-acompanada
npm run check:habla-release:<objetivo>
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

Después del build se comprueba el flujo feliz y el error: hub, 20 escenarios, 40 fichas A/B,
caja, destinos gramaticales usados y al menos un slug y un rol inválidos que deben devolver 404.

### F. Integrar y observar

1. `git fetch origin` y rebase/merge de `origin/main` antes de integrar.
2. Repetir guardianes, TypeScript y build sobre la cabeza final.
3. Integrar mediante commit rastreable; nunca desplegar un árbol sin commit.
4. Confirmar que Vercel construyó ese SHA de `main` y ejecutar smoke en producción.
5. Actualizar el documento de estado. `READY` de Vercel no equivale a verificación funcional.

## 3. Regla para evidencia vieja

Una auditoría es válida solo si su fuente corresponde al runtime evaluado y su fecha/commit es
posterior a la última edición relevante. Si no se puede demostrar, el veredicto es `revise`, aunque
las cifras antiguas fueran verdes. Las ramas `archive/*` se conservan para reconstruir decisiones,
no para saltarse una recertificación.

## 4. Entrega de un agente

El traspaso debe decir, sin ambigüedad:

- rama y SHA base;
- archivos runtime cambiados y contenido preservado;
- escenarios y perfiles re-simulados;
- comandos ejecutados y resultado;
- qué no se desplegó;
- deuda o fallo que siga abierto.

Si falta una de las verificaciones obligatorias, no se escribe “listo para producción”; se escribe
exactamente qué falta y el guardián debe seguir rojo.
