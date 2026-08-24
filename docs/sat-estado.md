# SAT — estado de publicación

Actualizado el **23 de agosto de 2026**.

## Producto en producción

- `/examenes/sat`: superhub en español con diez guías, fuentes oficiales, canonical,
  metadatos sociales, `LearningResource`, `FAQPage`, `BreadcrumbList` e `ItemList`.
- `set-1`: simulacro adaptativo completo de Reading and Writing, 54 preguntas y 64
  minutos. Sirve M1 y exactamente una rama de M2.
- Corte de práctica WeLearn: 16 de 27 en M1. Es una convención explícita y no se presenta
  como el algoritmo privado de College Board.
- Actas vigentes:
  - `docs/sat-auditorias/sat-set-1-m1.json`
  - `docs/sat-auditorias/sat-set-1-m2-facil.json`
  - `docs/sat-auditorias/sat-set-1-m2-dificil.json`

**Inventario:** hay **1 SAT completo publicado**, formado por 3 módulos autorados y 81
preguntas originales; cada estudiante responde 54. Existe además el scaffold de `set-2`
con 81 slots editoriales, pero es un borrador sin preguntas y no cuenta como simulacro
disponible.

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

## Transparencia editorial

La pasada final de M2 fue realizada por Codex con revisión editorial y heurísticas
reproducibles; no se presenta como panel humano o multi-modelo independiente. Las actas
declaran esta limitación. Un panel externo futuro puede ampliar la evidencia, pero ya no
hay un bloqueo técnico o editorial sin documentar dentro de esta rama.

## Antes de la siguiente publicación

Ejecutar `npm run check:practica-catalog`, `npx tsc --noEmit`, `npm run build` y recorrer
en navegador ambos lados del corte (15 y 16 aciertos), entrega, captura de lead, resultado,
reintento y revisión. Producción solo sale de `main`; no desplegar esta rama directamente.
