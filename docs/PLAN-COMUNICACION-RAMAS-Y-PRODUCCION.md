# Plan operativo de comunicación entre ramas y protección de producción

Estado: activo. La línea base, la plantilla de PR y las puertas de CI se implementaron en
`codex/branch-recovery-plan-20260825`; su vigencia en producción empieza al integrarse en `main`.

Fecha de corte: 25 de agosto de 2026.

Fuente canónica al redactarlo: `origin/main` en `a036f93c5f151e0e49d90823f0e9dded815e0e6b`.

Registro vivo asociado: [`RECUPERACION-PRODUCCION-2026-08-25.md`](RECUPERACION-PRODUCCION-2026-08-25.md).

## 1. Resultado que debe producir este plan

El sistema de trabajo debe garantizar simultáneamente que:

1. todo trabajo sabe si está en borrador, listo, integrado o desplegado;
2. ninguna rama antigua puede borrar silenciosamente contenido que ya vive en `main`;
3. producción siempre corresponde a un commit identificable de `origin/main`;
4. el trabajo local, incluidos los archivos sin commit y los worktrees de `/tmp`, tiene respaldo recuperable;
5. cada subsistema tiene guardianes que detectan desapariciones antes del merge y pruebas de humo después del despliegue;
6. una rama no se declara terminada hasta registrar commit de `main`, despliegue y verificación de producción.

`main` remoto es la fuente de verdad de producción. Una rama, un worktree, un documento o una captura de pantalla nunca sustituyen esa evidencia.

## 2. Problemas que corrige

El estado auditado mostró cinco fallos de proceso:

- ramas activas creadas cientos de commits antes de `origin/main`;
- trabajos terminados que solo existen en ramas o en archivos sin commit;
- ramas cuyo nombre ya no describe los parches únicos que conservan;
- documentos que dicen «no desplegado» aunque el trabajo sí está en `main`;
- CI que hoy comprueba catálogo y TypeScript, pero no ejecuta el build completo ni verifica producción después del despliegue.

Por eso no se debe responder «¿está publicado?» mirando el nombre de una rama. La única respuesta válida se construye con alcance Git, SHA de `main`, metadatos de Vercel y una prueba de ruta.

## 3. Protocolo de comunicación entre ramas

### 3.1 Estados obligatorios

Todo trabajo debe tener exactamente uno de estos estados en el registro central:

| Estado | Significado | Puede mezclarse en `main` |
|---|---|---|
| `BORRADOR` | Contenido incompleto o exploratorio. | No |
| `EN_CURSO` | Implementación activa con alcance definido. | No |
| `EN_VALIDACION` | Código completo; faltan guardianes, revisión editorial o prueba visual. | No |
| `LISTO_PARA_INTEGRAR` | Actualizado desde `origin/main` y todas las puertas están en verde. | Sí, mediante PR o integración controlada |
| `INTEGRADO` | El commit es alcanzable desde `origin/main`; aún no se ha probado producción. | Ya está en `main` |
| `DESPLEGADO` | Vercel sirve el commit esperado y las pruebas de humo pasaron. | Estado final publicable |
| `BLOQUEADO` | Falta una decisión, migración, secreto, activo o permiso externo. | No |
| `SUSTITUIDO` | Otro trabajo en `main` reemplaza esta propuesta. | No |
| `ARCHIVADO` | Conservado únicamente para recuperación o auditoría. | No |

La palabra «hecho» queda reservada para `DESPLEGADO`. Un commit de una rama limpia puede estar listo, pero no está hecho en producción.

### 3.2 Registro central

Cada rama activa debe tener una fila en el registro con estos campos:

- identificador del trabajo;
- rama y SHA actual;
- SHA de `origin/main` usado como base;
- estado;
- responsable o agente activo;
- subsistemas y rutas afectadas;
- archivos compartidos que puede modificar;
- dependencias con otras ramas;
- migraciones, variables o activos externos;
- validaciones ejecutadas y fecha;
- decisión de integración: `MERGE`, `CHERRY_PICK`, `REIMPLEMENTAR` o `ARCHIVAR`;
- SHA final en `main`;
- ID/URL del despliegue de producción;
- resultado de las pruebas de humo.

El registro se actualiza al iniciar trabajo, al entregar una rama, al integrar y al verificar producción. Una fila sin actualización durante 72 horas se marca para reconciliación.

### 3.3 Inicio de una rama

Secuencia obligatoria:

```bash
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c <tipo>/<alcance>-<fecha>
git push -u origin HEAD
```

Si `main` está ocupado por otro worktree, la rama se crea directamente desde `origin/main` en un worktree nuevo. Nunca se parte de una rama de trabajo antigua para ahorrar tiempo.

Al crearla se registra:

```text
Base: <sha de origin/main>
Alcance: <rutas y subsistemas>
Compartidos: <archivos que pueden chocar>
Estado: EN_CURSO
Dependencias: <ramas o ninguna>
```

### 3.4 Reserva de archivos compartidos

Antes de tocar cualquiera de estas áreas, la rama debe declararlo en el registro:

- `package.json`, `package-lock.json` y `vercel.json`;
- `src/app/sitemap.ts`, `src/app/layout.tsx` y navegación global;
- `src/styles/practica-ui.css` y motores compartidos de Práctica;
- registros centrales de Habla, Lectura, Escucha, quizzes y simulacros;
- acciones de pagos, autenticación, Supabase y migraciones;
- scripts incluidos en `prebuild`;
- documentos de estado de producción.

Dos ramas pueden avanzar en paralelo, pero no pueden integrar cambios incompatibles sobre un archivo compartido sin una reconciliación explícita sobre el `main` más reciente.

### 3.5 Entrega entre agentes o sesiones

Toda entrega debe incluir este bloque:

```text
Rama/SHA:
Base origin/main:
Estado:
Objetivo logrado:
Pendiente real:
Rutas afectadas:
Archivos compartidos:
Validaciones:
Migraciones/variables:
Riesgos conocidos:
Siguiente acción exacta:
```

No se entrega una tarea diciendo solamente «está en la rama». La persona que recibe debe poder decidir si rebasar, validar, integrar, sustituir o archivar sin reconstruir la historia.

### 3.6 Comunicación entre ramas

- Las ramas no se usan como buses de integración permanente.
- `origin/main` es el único punto de convergencia.
- Un `cherry-pick` entre ramas se registra con SHA de origen y razón.
- Una rama no puede incorporar otra rama antigua completa si solo necesita uno o dos parches.
- Si una rama está más de 20 commits detrás de `origin/main`, entra en `RECONCILIACION_OBLIGATORIA`.
- Si está más de 100 commits detrás, no se mezcla: se extraen parches y se reimplementan sobre una rama nueva.
- Los worktrees bajo `/tmp` deben tener rama remota desde el primer bloque funcional; el directorio temporal no es respaldo.

## 4. Plan de configuración

### 4.1 GitHub y protección de `main`

Configuración objetivo del repositorio canónico:

| Ajuste | Objetivo |
|---|---|
| Rama de producción | `main` únicamente |
| Force-push | Deshabilitado |
| Eliminación de `main` | Deshabilitada |
| PR antes de integrar | Obligatorio salvo recuperación urgente documentada |
| Rama actualizada | Exigir que el HEAD del PR incluya `origin/main` reciente |
| Historial | Lineal o fast-forward verificable |
| Conversaciones | Resueltas antes del merge |
| Checks requeridos | Baseline, catálogo, TypeScript, build y smoke de preview |
| Administración | Las reglas también aplican a administradores |

La plantilla de PR debe pedir base SHA, rutas afectadas, eliminaciones, guardianes, migraciones, capturas relevantes y plan de rollback.

### 4.2 CI obligatoria

Implementado el 25 de agosto de 2026 en `.github/workflows/content-integrity.yml`,
`config/production-baseline.json` y `scripts/check-production-baseline.mjs`.

El workflow actual de integridad cubre `check:practica-catalog` y TypeScript. Debe dividirse en cuatro puertas requeridas:

1. **Baseline de producción**
   - comprueba rutas, componentes, datos y cantidades mínimas declaradas en un manifiesto versionado;
   - falla ante la eliminación de cualquier activo protegido;
   - comprueba que no bajaron umbrales ni se retiraron scripts del `prebuild`.

2. **Integridad rápida**
   - `npm ci`;
   - `npm run check:practica-catalog`;
   - `npx tsc --noEmit --pretty false`;
   - guardianes específicos según las rutas modificadas.

3. **Build completo**
   - `npm run build`, que ejecuta todo el `prebuild`;
   - conserva el resumen de rutas y el resultado de los guardianes como artefacto del PR.

4. **Preview y humo**
   - prueba las rutas tocadas;
   - prueba una muestra fija de rutas protegidas no relacionadas con el cambio;
   - comprueba código HTTP, canonical, contenido marcador y ausencia de errores críticos.

No se permite «arreglar» CI bajando mínimos, quitando checks de `prebuild` o excluyendo el subsistema que falla. Una excepción exige decisión explícita en el registro.

### 4.3 Manifiesto de baseline

Implementado en `config/production-baseline.json`. La comparación contra la rama base impide
retirar rutas, archivos, marcadores, checks o mínimos protegidos dentro de un PR.

Debe existir un manifiesto legible por máquina con, al menos:

- las 24 rutas y 480 audios de Escucha;
- las colecciones publicadas de Habla y sus rutas;
- los 465 o más temas de gramática;
- Lectura, Escritura, Vocabulario, Historias y PDFs;
- IELTS, TOEFL, ICFES, SAT y Nivel Radar;
- Home, resultados, navegación, landings, blog, precios y pagos;
- sitemap, canonicals, metadatos y rutas locales;
- migraciones de Supabase requeridas por funcionalidades visibles.

Cada adición a producción actualiza el manifiesto en el mismo PR. Un despliegue nuevo no puede reducirlo salvo una retirada aprobada y documentada.

### 4.4 Vercel

Configuración y comprobaciones objetivo:

- proyecto conectado únicamente a `idiomaswlduartekorzh/idiomaswl`;
- rama de producción: `main`;
- ningún despliegue directo desde un árbol local sin commit;
- previews para ramas de integración; ramas de generación pesada pueden deshabilitar previews de forma explícita;
- el despliegue de producción debe registrar `gitSource.ref=main` y el SHA esperado;
- los dominios `idiomaswl.com`, `www.idiomaswl.com` e `idiomaswl.vercel.app` deben apuntar al mismo despliegue aprobado;
- después de cada despliegue se ejecutan pruebas de humo y se registra el deployment ID;
- si falla una ruta protegida, se revierte el commit o se hace rollback del artefacto; nunca se corrige con force-push.

### 4.5 Supabase y configuración externa

Un trabajo con migración, RLS, webhook, secreto o variable no puede pasar de `EN_VALIDACION` a `LISTO_PARA_INTEGRAR` hasta registrar:

- migración exacta y orden de aplicación;
- entorno donde se verificó;
- compatibilidad hacia atrás;
- rollback o corrección hacia delante;
- variables requeridas sin exponer valores;
- prueba de permisos y webhook cuando corresponda.

El código visible no se despliega antes de que la dependencia externa esté preparada o sea tolerante a su ausencia.

## 5. Plan de restablecimiento

### Fase 0 — Congelar y respaldar

Durante la ventana de recuperación no se integran nuevas funcionalidades en `main`.

1. Actualizar referencias remotas.
2. Crear ramas `archive/recovery-<fecha>-<origen>` para commits locales únicos.
3. Respaldar por separado el diff binario y los archivos sin seguimiento del árbol sucio.
4. Empujar a `origin` todas las ramas activas que viven en `/tmp`.
5. Registrar SHA, estado y worktree de cada trabajo.
6. No hacer `reset`, `clean`, `stash drop` ni borrar worktrees hasta cerrar la recuperación.

Los archivos de salida, capturas y auditorías se separan del código de producto. Un respaldo puede contenerlos; una rama de publicación no.

### Fase 1 — Confirmar la línea base

1. Verificar que Vercel sirve el SHA actual de `origin/main`.
2. Ejecutar guardianes y build sobre un worktree limpio de ese SHA.
3. Probar las rutas protegidas y registrar el resultado.
4. Corregir documentos de estado obsoletos.
5. Crear el manifiesto de baseline desde lo que realmente está en producción.

### Fase 2 — Integrar protección antes que contenido

Orden recomendado:

1. plan, registro y plantilla de PR;
2. guardrails SEO y de landings, reconciliados con el `package.json` actual;
3. baseline de producción y CI completa;
4. smoke tests posteriores al despliegue;
5. protección de rama y configuración Vercel.

Así, los trabajos recuperados después quedan protegidos inmediatamente.

### Fase 3 — Recuperar trabajos limpios y actuales

Cada unidad se integra por separado desde una rama nueva basada en `origin/main`:

1. confirmar intención de publicación;
2. rebase o recreación sobre el SHA actual;
3. revisión de diferencias contra producción;
4. guardianes específicos, TypeScript y build;
5. preview y prueba visual;
6. integración en `main`;
7. despliegue y smoke;
8. actualización a `DESPLEGADO`.

Las primeras candidatas se enumeran en el registro: Ideas avanzadas, protecciones SEO y, cuando complete su colección y auditoría, Habla Alemán A2.

### Fase 4 — Extraer parches de ramas antiguas

No se mezclan ramas con cientos de commits de atraso. Para cada parche:

1. identificar los commits `+` de `git cherry origin/main <rama>`;
2. comprobar si la funcionalidad ya existe de otra forma en `main`;
3. clasificar como `SUSTITUIDO`, `CHERRY_PICK` o `REIMPLEMENTAR`;
4. aplicar solo el cambio mínimo en una rama de recuperación nueva;
5. validar contra el baseline actual.

Esto aplica a rendimiento del home, canonicals SEO, puentes comerciales, mejoras históricas de gramática, SAT adaptativo y el piloto de registro/pagos.

### Fase 5 — Separar el árbol local mezclado

El árbol principal auditado contiene tres clases de cambios y no debe convertirse en un solo commit:

1. archivos idénticos a `origin/main`, que se descartan del rescate;
2. correcciones pequeñas posiblemente válidas, que se reimplementan una por una;
3. versiones antiguas que eliminarían Wompi, multilingüismo o el sistema PDF actual, que no se integran.

Cada corrección válida recibe su propia rama, prueba y fila del registro. El respaldo original se conserva hasta verificar producción.

### Fase 6 — Archivar y cerrar

Una rama solo se archiva cuando:

- su trabajo está `DESPLEGADO`, `SUSTITUIDO` o rechazado explícitamente;
- el registro contiene la decisión y evidencia;
- no tiene commits o archivos sin respaldo;
- el documento del subsistema refleja el estado final.

Las ramas `archive/` no se borran. Las ramas de trabajo pueden eliminarse del remoto después de crear la referencia de archivo necesaria.

## 6. Puertas de aceptación por integración

Puertas comunes:

```bash
git fetch origin
git rebase origin/main
npm run check:practica-catalog
npx tsc --noEmit --pretty false
npm run build
```

Además:

- Habla: `npm run check:habla-acompanada` y el `check:habla-release:<objetivo>` correspondiente;
- SAT: catálogo, fábrica, examen, superhub y adaptativo;
- TOEFL/IELTS/ICFES: guardianes y pruebas específicas, más migraciones si existen;
- SEO/landings: auditoría de snippets, canonicals, rutas locales y sitemap;
- pagos: configuración, checkout, webhook, persistencia, RLS y entorno;
- UI: preview responsive, teclado, contraste, reducción de movimiento y errores de consola.

Si el `prebuild` o el build generan archivos, el árbol debe quedar limpio o el PR debe incluir los derivados esperados.

## 7. Prueba posterior al despliegue

Dentro de los diez minutos posteriores a Vercel `READY`:

1. confirmar deployment ID, `gitSource.ref` y SHA;
2. probar las rutas nuevas;
3. probar Home, Práctica, Precios, Blog y autenticación básica;
4. probar una ruta por subsistema protegido;
5. revisar respuestas 4xx/5xx y errores de runtime;
6. registrar resultado en el inventario.

Si falla algo protegido:

1. detener nuevas integraciones;
2. marcar el trabajo `BLOQUEADO_PRODUCCION`;
3. ejecutar rollback/revert;
4. comprobar que el baseline anterior volvió;
5. corregir desde una rama nueva sin reescribir `main`.

## 8. Responsabilidades

| Responsabilidad | Quién la asume |
|---|---|
| Decisión de producto: publicar, aplazar o retirar | José David |
| Exactitud pedagógica/editorial | Responsable académico del subsistema |
| Registro de rama y entrega | Agente que crea o modifica la rama |
| Reconciliación con `origin/main` | Autor de la integración |
| Validaciones y evidencia | Autor de la integración |
| Configuración GitHub/Vercel/Supabase | Responsable técnico con acceso |
| Smoke de producción y cierre del registro | Responsable del despliegue |

Ningún agente puede declarar una tarea `DESPLEGADA` solo porque el build terminó o porque hizo push.

## 9. Orden de ejecución recomendado

1. Respaldar la rama principal antigua y su árbol sucio.
2. Publicar este plan y el registro en una rama basada en `origin/main`.
3. Corregir estados documentales obsoletos.
4. Integrar guardrails y baseline.
5. Configurar checks requeridos y protección de `main`.
6. Recuperar candidatos actuales, uno por uno.
7. Auditar parches únicos de ramas antiguas.
8. Separar y rescatar cambios locales válidos.
9. Archivar lo sustituido.
10. Ejecutar una auditoría final producción ↔ `origin/main` ↔ registro.

## 10. Definición de terminado

La recuperación termina cuando:

- no existen ramas activas sin fila de registro;
- no existen worktrees temporales sin respaldo remoto;
- todo trabajo revisado está `DESPLEGADO`, `BLOQUEADO`, `SUSTITUIDO` o `ARCHIVADO`;
- producción sirve exactamente un SHA de `origin/main`;
- CI impide reducir el baseline;
- el smoke posterior al despliegue está automatizado;
- los documentos de subsistema coinciden con Git y producción;
- un despliegue nuevo puede añadir trabajo, pero no hacer desaparecer trabajo aprobado sin una retirada explícita.
