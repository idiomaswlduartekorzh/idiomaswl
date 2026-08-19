# Producción nocturna del SAT — playbook del loop

Este archivo es el encargo. El loop lo lee entero en cada vuelta y ejecuta **una** tarea.
El estado vivo —qué está hecho y qué toca ahora— vive en `docs/sat-produccion-estado.md`.

## Cómo se lanza

```
/loop Sigue docs/sat-loop-nocturno.md al pie de la letra. Lee docs/sat-produccion-estado.md, coge la siguiente tarea pendiente, hazla entera, verifícala, haz commit y actualiza el estado antes de terminar la vuelta.
```

Antes de lanzarlo: la sesión tiene que quedar en un modo que **no pida permisos**, o a las
3 de la mañana se queda esperando una respuesta que no va a llegar. Y el portátil no se
puede suspender.

## Las seis cosas que hace cada vuelta, en este orden

1. `git status` — mirar qué hay tocado sin commitear. Hay otras sesiones en este árbol.
2. Leer `docs/sat-produccion-estado.md` y coger **la siguiente tarea, una sola**.
3. Hacerla entera. Una tarea a medias no se deja abierta al terminar la vuelta.
4. Verificarla según la definición de «hecho» de más abajo.
5. Commit de las rutas propias, con mensaje que diga qué cambió y por qué.
6. Reescribir el estado: qué se hizo, qué se aprendió, cuál es la siguiente tarea.

Si una vuelta acaba sin commit, el estado tiene que decir por qué. Tres vueltas seguidas
sin progreso = parar el loop y dejar escrito el bloqueo.

## Líneas rojas

No son preferencias. Cruzar una de estas hace daño real:

- **Nada llega a producción esta noche.** Ni `git merge` a `main`, ni push a `main`, ni
  `vercel deploy`. `main` despliega solo. Publicar lo decide David despierto.
- **Nunca `git add -A`.** Solo rutas propias, escritas una a una. Hay trabajo de otras
  sesiones sin commitear en este mismo árbol.
- **No abrir el navegador de vista previa.** Esta máquina tiene 8 GB y se cae. La
  verificación es `tsc` + guardián + `build`, no mirar la página.
- **Los subagentes no compilan ni matan procesos.** Ni `build`, ni `tsc`, ni `next dev`,
  ni `pkill`. El coordinador compila **una vez por vuelta, al final**.
- **No se baja ningún umbral** de `docs/sat-ingles-blueprint.md` §4 para que pase un lote.
  Un lote que no pasa se rehace, o se marca bloqueado y se sigue con otra cosa.
- **Ni un texto ni un ítem de College Board.** Todo original. Esto detiene el lote entero.
- **Las decisiones de producto no se toman de noche.** Precio, promesas comerciales,
  idioma del hub, qué se anuncia: se escriben en el estado bajo «Decisiones para David»
  y se sigue con lo siguiente.

## Orden de trabajo

El orden importa más que la cantidad. Una rebanada completa que se puede ver y vender vale
más que trescientos ítems sueltos sin página donde vivir.

### Fase A — Cimientos (primero, sin excepción)

- **A1.** `sat-blueprint` verifica los parámetros del SAT digital contra
  `satsuite.collegeboard.org` y actualiza `docs/sat-ingles-blueprint.md` §2 con fecha y
  enlace. Todo lo que siga se apoya en esto: si está mal, está mal ochenta veces.
- **A2.** Escribir `scripts/check-sat-exam.mjs` con las doce puertas de §4 y engancharlo
  como `npm run check:sat`. Sin guardián automático, auditar 81 ítems a mano es la vía
  rápida a un lote entero mal.
- **A3.** Contrato de datos: entrada `sat` en `src/data/exams.ts`, forma del set en
  `src/data/mocks/sat-set-1.ts`, ruta `/examenes/sat/practica/[id]`. Reutilizar
  `MCQQuestion`; no inventar tipos.

### Fase B — Rebanada vertical (que se vea algo)

- **B1.** Módulo M1 del set 1: 27 ítems por la cadena completa de `crear-examen-sat`
  hasta veredicto APTO de `sat-release-warden`. Se trabaja **por bloques de dominio**
  (Craft and Structure, Information and Ideas, Standard English Conventions, Expression
  of Ideas), cerrando cada bloque antes de abrir el siguiente. Cada bloque cerrado es un
  commit.
- **B2.** `sat-integration` mete el módulo en el repo y lo deja servible.
- **B3.** El hub `/examenes/sat`. Ver especificación abajo.
- **B4.** `npx tsc --noEmit` y `npm run build`, una vez, al final de la vuelta.

Con la fase B terminada ya hay producto: una página de SAT con un simulacro real que
funciona. Todo lo demás es multiplicar.

### Fase C — Escala

- **C0. La receta.** Antes de repetir nada: escribir `docs/sat-fabrica.md` con lo que de
  verdad costó el M1 —cuántas pasadas, qué devolvió cada auditor, qué se atascó, cuánto
  tardó cada bloque—. Ese documento es lo que convierte «hicimos un examen» en «podemos
  hacer treinta», y es lo que David pidió: el blueprint al que escalar.
- **C1.** M2-fácil y M2-difícil del set 1 → primer examen completo (81 ítems).
- **C2.** Sets 2, 3, 4… uno por vuelta, cada uno por la cadena entera. Commit por módulo.
- **C3.** Cada set nuevo se enlaza desde el hub y desde `/examenes`.

### Fase D — Cierre (siempre)

Cuando la noche se acabe —o el presupuesto de tokens—, escribir en el estado un resumen
en español llano y sin jerga: qué se hizo, qué se puede ver y en qué URL, qué falta, y las
decisiones que esperan a David. Ese resumen es lo primero que él va a leer al levantarse.

## Definición de «hecho»

| Tarea | Está hecha cuando… |
|---|---|
| Bloque de dominio | Sus ítems tienen clave, razón de error por distractor, y han pasado `sat-key-auditor` |
| Módulo | 27 ítems, los ocho informes presentes, veredicto APTO, `npm run check:sat` en verde |
| Página o ruta | `tsc` limpio, `build` verde, guardianes del prebuild verdes, metadata + canonical + JSON-LD puestos |
| Documento | Alguien que no estuvo anoche podría continuar el trabajo leyéndolo |

Lo que **no** cuenta como progreso: ítems escritos sin auditar, un informe sin recuento,
una página que compila pero no tiene metadata, y cualquier cosa descrita como «casi».

## El hub `/examenes/sat`

Es la pieza comercial. Tiene que ganarse el tráfico, no solo existir.

- **Idioma: español.** El sitio es español y el diferencial de WeLearn es preparar el SAT
  a estudiantes hispanohablantes que aspiran a universidades de EE. UU. Competir en inglés
  contra Khan Academy es perder. Una versión en inglés es **decisión para David**, no del
  loop.
- Contenido mínimo: qué es el SAT digital y cómo cambió, las dos secciones, cómo se
  puntúa (200–800 por sección), para qué universidades sirve, cuándo presentarlo desde
  Latinoamérica, y la lista de simulacros con enlace directo.
- SEO como el resto del sitio: `metadata` con título y descripción propios, `canonical`
  a `https://www.idiomaswl.com/...`, JSON-LD `@graph` (Course + FAQPage + BreadcrumbList +
  LocalBusiness), `opengraph-image.tsx`, y enlaces bidireccionales con el blog y con
  `/clases-de-ingles`.
- CTA a WhatsApp `573005004253`, como todo el sitio.
- **Honestidad en pantalla:** mientras el motor no haga el salto adaptativo M1→M2 ni la
  conversión a 200–800, se dice que es un simulacro lineal con puntaje bruto. Prometer
  adaptativo y servir lineal se paga con la confianza del estudiante.

## Si algo se rompe

- Guardián del catálogo en rojo (`check:practica-catalog`) → tu rama se llevó algo
  publicado por delante. Recupéralo con `git checkout origin/main -- <ruta>`. **No
  silenciar el guardián.**
- `build` sin memoria → no reintentar en bucle. Anotar y parar la vuelta.
- Un módulo que llega NO APTO tres veces → marcarlo bloqueado, escribir por qué, y pasar
  al siguiente. No insistir toda la noche en el mismo lote.
