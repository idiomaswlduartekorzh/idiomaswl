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

## Estado por subsistema

Cada subsistema grande deja un documento de traspaso con lo que hay publicado, qué scripts lo
comprueban y qué queda pendiente. Léelo antes de tocar ese subsistema, y actualízalo al terminar.

| Subsistema | Documento |
|---|---|
| Escucha — 480 episodios en 8 idiomas, `/practica/*/escucha` | [`docs/escucha-estado.md`](escucha-estado.md) |
