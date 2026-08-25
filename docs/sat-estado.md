# SAT — estado de publicación

Actualizado el **25 de agosto de 2026**.

## Producto en producción

- `/examenes/sat`: superhub en español con diez guías, fuentes oficiales, canonical,
  metadatos sociales, `LearningResource`, `FAQPage`, `BreadcrumbList` e `ItemList`.
- `set-1`: simulacro adaptativo completo de Reading and Writing, 54 preguntas y 64
  minutos. Sirve M1 y exactamente una rama de M2.
- `set-2`: segundo simulacro adaptativo completo, con otras 81 preguntas autoradas y 54
  servidas por intento. Superó guardianes, TypeScript, build y las dos rutas de navegador.
- `set-3`: tercer simulacro adaptativo completo, con 81 preguntas nuevas. Pasó las doce
  puertas editoriales, las 28 decisiones de enrutado, ambas ramas, móvil, preview remoto
  y verificación HTTP posterior al despliegue desde `main`.
- `set-4`: cuarto simulacro adaptativo completo, con 81 preguntas nuevas. Pasó las doce
  puertas, originalidad local, ambas rutas en navegador, móvil a 390 px, TypeScript y
  builds local y remoto. El dominio real devuelve 200 y lo enlaza desde el hub.
- `set-5`: quinto simulacro adaptativo completo, con 81 preguntas nuevas. Pasó las doce
  puertas, originalidad local entre los 405 ítems, las 28 decisiones adaptativas, ambas
  ramas en navegador y móvil a 390 px. Vercel y el dominio real quedaron verificados.
- Corte de práctica WeLearn: 16 de 27 en M1. Es una convención explícita y no se presenta
  como el algoritmo privado de College Board.
- Actas vigentes:
  - `docs/sat-auditorias/sat-set-1-m1.json`
  - `docs/sat-auditorias/sat-set-1-m2-facil.json`
  - `docs/sat-auditorias/sat-set-1-m2-dificil.json`
  - `docs/sat-auditorias/sat-set-2-m1.json`
  - `docs/sat-auditorias/sat-set-2-m2-facil.json`
  - `docs/sat-auditorias/sat-set-2-m2-dificil.json`
  - `docs/sat-auditorias/sat-set-3-m1.json`
  - `docs/sat-auditorias/sat-set-3-m2-facil.json`
  - `docs/sat-auditorias/sat-set-3-m2-dificil.json`
  - `docs/sat-auditorias/sat-set-4-m1.json`
  - `docs/sat-auditorias/sat-set-4-m2-facil.json`
  - `docs/sat-auditorias/sat-set-4-m2-dificil.json`
  - `docs/sat-auditorias/sat-set-5-m1.json`
  - `docs/sat-auditorias/sat-set-5-m2-facil.json`
  - `docs/sat-auditorias/sat-set-5-m2-dificil.json`

**Inventario:** hay **5 SAT completos publicados**, formados por 15 módulos y 405 preguntas
originales; cada estudiante responde 54 por intento y nunca recibe las dos ramas de M2.

## Loop de escala a 20

El loop se abrió el **24 de agosto de 2026** en una rama aislada. Sets 3, 4 y 5 completaron
el ciclo y se publicaron desde `main` en el dominio real. Set 5 quedó verificado en el
deployment `dpl_4NkTRTkBUYY3xgbtuhzmfh46ZjAm`, asociado a `main` en `17fc7487`. Por
decisión de producto, la escala queda pausada en cinco SAT completos; Sets 6–20 se crearán
más adelante, después de cerrar los otros trabajos activos.

La receta operativa, los costes medidos y las puertas por vuelta viven en
[`docs/sat-fabrica.md`](sat-fabrica.md). La regla sigue siendo un set, un módulo y un bloque
abiertos a la vez. Ningún set se promueve junto con otro ni se baja un umbral para sostener
el ritmo.

## Blueprint de escala

- `src/data/mocks/sat/catalog.json` es la fuente única de sets publicados y borradores.
- `npm run scaffold:sat -- --set N` crea los 3 módulos editoriales y 81 slots de un set.
- `npm run generate:sat-catalog` deriva tarjetas y registro ejecutable; no hay que editar
  dos listas a mano.
- Un `draft` nunca entra al hub ni a `/practica/[id]`. Para promoverlo se requieren los
  tres módulos reales, tres actas APTO vigentes y los controles mecánicos en verde.
- El guardián adaptativo recorre todos los sets publicados automáticamente.

## Controles obligatorios

- `npm run check:sat-catalog`: valida estados, rutas, exportaciones, composición de tres
  módulos y sincronía de los archivos derivados.
- `npm run test:sat-factory`: prueba que un scaffold reserva 81 slots sin registrar
  borradores en el producto.
- `npm run check:sat`: 27 ítems por módulo, claves, opciones, longitud, solape, dominios,
  dificultad, temas, razones y huellas del contenido firmado.
- `npm run check:sat-adaptive`: prueba los 28 resultados posibles de M1, el bloqueo de
  navegación, la equivalencia de ramas y el orden estándar < M1 < exigente.
- `npm run check:sat-superhub`: protege las diez páginas, sitemap, canonical, fuentes,
  enlaces internos, dominios y aviso de marca.
- `node scripts/sat-blind-test.mjs --module <id> --heuristics`: panel reproducible de 18
  atajos sin pasajes. En Set 3: M1 23,0 %, estándar 23,7 % y exigente 24,3 %; azar, 25 %.
- `npm run check:sat-originality-local`: rechaza secuencias internas repetidas de ocho
  palabras entre estímulos y opciones, incluyendo candidatos en `drafts`.

## Transparencia editorial

La pasada final de M2 fue realizada por Codex con revisión editorial y heurísticas
reproducibles; no se presenta como panel humano o multi-modelo independiente. Las actas
declaran esta limitación. Un panel externo futuro puede ampliar la evidencia, pero ya no
hay un bloqueo técnico o editorial sin documentar dentro de esta rama.

El Set 2 usa la misma transparencia: segunda pasada de Codex, no independiente; 18
heurísticas sin pasaje (M1 23,7 %, estándar 26,1 %, exigente 23,0 %); cero coincidencias
locales de ocho palabras. Su auditoría de producto recorrió ambas ramas en un build real,
incluido móvil a 390 px, antes de firmar las actas como publicables.

Set 3 mantiene esa limitación declarada. Además, su QA bloqueó los POST con datos ficticios
para no crear leads reales, contó 54 explicaciones y corrigió el orden móvil para mostrar la
pregunta antes del panel de 27 accesos rápidos.

Set 4 conserva la misma transparencia. Su QA recorrió una ruta estándar y una exigente,
interceptó los POST, contó 54 revisiones y razones por ruta, comprobó el reintento y midió
cero overflow a 390 px. El build final de `main` volvió a ejecutar las doce puertas y los
28 resultados adaptativos antes de publicar.

Set 5 mantiene la misma transparencia. Su QA recorrió las ramas estándar y exigente,
interceptó los POST para no crear leads ni intentos reales, verificó los cuatro dominios y
54 explicaciones por resultado, reintento, corte adaptativo y cero overflow a 390 × 844.
El build remoto volvió a ejecutar la línea base, la fábrica 10/10, las doce puertas, el
superhub y los 28 resultados antes de publicar 2.372 rutas.

## Antes de la siguiente publicación

Ejecutar `npm run check:practica-catalog`, `npx tsc --noEmit`, `npm run build` y recorrer
en navegador ambos lados del corte (15 y 16 aciertos), entrega, captura de lead, resultado,
reintento y revisión. Producción solo sale de `main`; no desplegar esta rama directamente.
