## Entrega

- Rama/SHA:
- Base `origin/main`:
- Estado (`EN_VALIDACION` o `LISTO_PARA_INTEGRAR`):
- Objetivo logrado:
- Pendiente real:

## Alcance

- Rutas afectadas:
- Archivos compartidos:
- Eliminaciones intencionales:
- Migraciones/variables/activos externos:
- Dependencias con otras ramas:

## Validación

- [ ] La rama incorpora el `origin/main` más reciente.
- [ ] `npm run check:production-baseline -- --compare-git-ref=origin/main`
- [ ] `npm run check:practica-catalog`
- [ ] `npx tsc --noEmit --pretty false`
- [ ] `npm run build`
- [ ] Prueba visual o funcional de las rutas afectadas.
- [ ] No se bajaron mínimos ni se quitaron guardianes para hacer pasar CI.

## Producción y reversión

- Marcadores/rutas para smoke:
- Riesgos conocidos:
- Plan de reversión:
- SHA final en `main` (completar al integrar):
- Deployment y smoke (completar al desplegar):
