# SAT — estado de publicación

Actualizado el **23 de agosto de 2026**.

## Producto en producción

- `/examenes/sat`: superhub en español con diez guías, fuentes oficiales, canonical,
  metadatos sociales, `LearningResource`, `FAQPage`, `BreadcrumbList` e `ItemList`.
- `set-1`: simulacro adaptativo completo de Reading and Writing, 54 preguntas y 64
  minutos. Sirve M1 y exactamente una rama de M2.
- `set-2`: segundo simulacro adaptativo completo, con otras 81 preguntas autoradas y 54
  servidas por intento. Superó guardianes, TypeScript, build y las dos rutas de navegador.
- Corte de práctica WeLearn: 16 de 27 en M1. Es una convención explícita y no se presenta
  como el algoritmo privado de College Board.
- Actas vigentes:
  - `docs/sat-auditorias/sat-set-1-m1.json`
  - `docs/sat-auditorias/sat-set-1-m2-facil.json`
  - `docs/sat-auditorias/sat-set-1-m2-dificil.json`
  - `docs/sat-auditorias/sat-set-2-m1.json`
  - `docs/sat-auditorias/sat-set-2-m2-facil.json`
  - `docs/sat-auditorias/sat-set-2-m2-dificil.json`

**Inventario:** hay **2 SAT completos publicados**, formados por 6 módulos y 162 preguntas
originales; cada estudiante responde 54 por intento y nunca recibe las dos ramas de M2.

## Loop de escala a 20

El loop se abrió el **24 de agosto de 2026** en una rama aislada. `set-3` está reservado
como borrador con 81 slots; 27 ya tienen contenido y ninguno aparece en el hub ni en el
registro público. La
receta operativa, los costes medidos y las puertas por vuelta viven en
[`docs/sat-fabrica.md`](sat-fabrica.md).

La regla de avance es un set, un módulo y un bloque abiertos a la vez. La matriz editorial
de M1 de Set 3 está cerrada en `docs/sat-planes/sat-set-3-m1.md`: 27 temas, dificultad y
claves equilibradas. Sus cuatro bloques y el contenido M1 completo están APTOS; los 27
ítems dan 23,0 % en la prueba ciega y cero coincidencias locales. Producto y acta formal
siguen pendientes hasta tener ambas ramas M2. La matriz editorial de M2 estándar ya está
cerrada con perfil 10/13/4; Craft and Structure q01–q08 está APTO y la siguiente unidad
es Information and Ideas q09–q15.
Ningún set se promueve junto con otro ni se baja un umbral para sostener el ritmo.

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
  atajos sin pasajes. La rama estándar dio 21,0 %; la exigente, 26,1 %; azar, 25 %.
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

## Antes de la siguiente publicación

Ejecutar `npm run check:practica-catalog`, `npx tsc --noEmit`, `npm run build` y recorrer
en navegador ambos lados del corte (15 y 16 aciertos), entrega, captura de lead, resultado,
reintento y revisión. Producción solo sale de `main`; no desplegar esta rama directamente.
