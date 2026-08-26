# Operación del repositorio y producción

## Fuente oficial

`git@github.com:idiomaswlduartekorzh/idiomaswl.git` es el único repositorio canónico de Idiomas WeLearn. Su rama `main` debe representar producción.

El repositorio histórico `git@github.com:idiomaswlduartekorzh/Welearnmiguel.git` se conserva únicamente como archivo recuperable. No se borra ni se usa para publicar ni para iniciar trabajo nuevo.

## Regla de oro

Antes de modificar contenido o código, todo agente debe partir de `main` actualizado del repositorio canónico. No se trabaja sobre una copia local desactualizada ni se mezclan ramas de los dos repositorios.

1. `git switch main`
2. `git pull --ff-only origin main`
3. Crear una rama de trabajo desde allí.
4. Ejecutar `npm run check:practica-catalog` y `npx tsc --noEmit` antes de integrar.
5. Integrar en `main` mediante commit verificable.

## Publicación

Vercel debe estar conectado al repositorio canónico y desplegar únicamente desde `main`.

- No ejecutar despliegues directos desde un árbol de trabajo con cambios sin commit.
- Cada publicación debe poder señalar un commit de `main`.
- Para una corrección urgente: crear rama, validar, integrar en `main`, y dejar que Vercel publique ese commit.
- Una reversión es un `git revert` o el rollback de Vercel; nunca se reescribe `main` con force-push.

## Contenido protegido

El catálogo de gramática, Listening A1/A2 de inglés, Nivel Radar, IELTS e ICFES tienen una comprobación obligatoria: `npm run check:practica-catalog`.

La verificación fija un mínimo histórico de 465 temas de gramática y falla si desaparecen rutas o módulos protegidos. No se reduce ese umbral sin una decisión explícita y documentada.

## Recuperación y archivo

Antes de una consolidación o limpieza se crea una rama `archive/` en el repositorio correspondiente. Las ramas de archivo no se eliminan. Así se puede recuperar cualquier archivo con `git show <rama>:ruta/del/archivo`.

## Coordinación entre agentes

Claude y Codex deben leer este archivo, `AGENTS.md` y `CLAUDE.md` antes de trabajar. Al terminar una tarea, registrar en el commit qué cambió y qué validaciones se ejecutaron. Si el árbol de trabajo ya tiene cambios ajenos, no mezclar ni sobrescribirlos: aislar el cambio en una rama o pedir una decisión.

La comunicación entre ramas, los estados obligatorios y el protocolo de recuperación están en
[`PLAN-COMUNICACION-RAMAS-Y-PRODUCCION.md`](PLAN-COMUNICACION-RAMAS-Y-PRODUCCION.md).
El inventario vivo de trabajos que están fuera, dentro o pendientes de producción está en
[`RECUPERACION-PRODUCCION-2026-08-25.md`](RECUPERACION-PRODUCCION-2026-08-25.md).
El grafo de lo versionado en la rama canónica está en
[`MAPA-CONOCIMIENTO-MAIN.md`](MAPA-CONOCIMIENTO-MAIN.md); su encabezado siempre debe nombrar el
SHA del snapshot para no confundir `main` con un deployment anterior.

Una rama no se declara «hecha» porque tenga commit, push o preview. Solo se declara desplegada
cuando el registro contiene el SHA integrado en `main`, el deployment de Vercel y las rutas de
producción verificadas. Antes de iniciar o entregar trabajo, consulta y actualiza el registro.

## Estado por subsistema

Cada subsistema grande deja un documento de traspaso con lo que hay publicado, qué scripts lo
comprueban y qué queda pendiente. Léelo antes de tocar ese subsistema, y actualízalo al terminar.

| Subsistema | Documento |
|---|---|
| Escucha — 480 episodios en 8 idiomas, `/practica/*/escucha` | [`docs/escucha-estado.md`](escucha-estado.md) |
| SAT — superhub y simulacro adaptativo completo | [`docs/sat-estado.md`](sat-estado.md) |
| PDF descargables — 5 destrezas en 8 idiomas, `src/lib/pdf/` | [`docs/pdf-descargables-estado.md`](pdf-descargables-estado.md) |
| Habla acompañada — 10 conjuntos, 200 escenarios publicados | [`docs/METODOLOGIA-HABLA-ACOMPANADA.md`](METODOLOGIA-HABLA-ACOMPANADA.md) y [`docs/habla-acompanado-blueprint.md`](habla-acompanado-blueprint.md) |
