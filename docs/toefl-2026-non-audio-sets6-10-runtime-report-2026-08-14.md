# TOEFL 2026 — cierre no-audio Sets 6–10

Fecha: 14 de agosto de 2026

Lote: W5

Estado: validación automática y navegador representativo cerrados

| Set | CTW palabras/objetivos | Academic palabras | Official-family + suplemento | Build | Chromium |
| --- | ---: | ---: | ---: | ---: | --- |
| 6 | 79 / 10 | 184 | 5 + 1 | 10 | 10/10 · 6/6 · 10/10 |
| 7 | 86 / 10 | 197 | 5 + 1 | 10 | unit |
| 8 | 82 / 10 | 192 | 5 + 1 | 10 | unit |
| 9 | 84 / 10 | 199 | 5 + 1 | 10 | unit |
| 10 | 83 / 10 | 197 | 5 + 1 | 10 | 10/10 · 6/6 · 10/10 |

## Resultado

- CTW: un objeto académico por set, primera oración intacta, exactamente diez objetivos
  alternos y entrada de sólo letras faltantes.
- Academic: cinco preguntas single-select official-family y un multiselect rotulado
  como suplemento WeLearn; pasajes dentro de 180–220 palabras.
- Build: diez intercambios por set, cuatro fragmentos correctos y exactamente un
  distractor; contexto y respuesta fija visibles.
- Seguridad: objetos e IDs independientes por set. Las claves CTW/Reading y órdenes
  Build viven sólo en servidor; objetos, ítems, opciones o tiles desconocidos fallan
  cerrados.
- Preservación: 10 bloques CTW, 5 pasajes Academic y 30 actividades Build anteriores
  permanecen como fuentes server-only reutilizables.
- Auditoría factual/editorial: decisiones y fuentes en
  `docs/toefl-2026-written-sets6-10-factual-audit-2026-08-14.md`.

## Evidencia ejecutada

- `npm run check:toefl-ctw`: PASS; unit 8/8.
- `npm run check:toefl-reading`: PASS; unit 8/8, 6/6 en cada Set 2–10.
- `npm run check:toefl-build-sentence`: PASS sobre 100 ítems Sets 1–10; unit 9/9,
  10/10 en cada set.
- `npx tsc --noEmit`: PASS.
- ESLint dirigido sobre todos los cambios W5: PASS.
- `npm run build`: PASS con guardianes completos y 1.364/1.364 rutas.
- Chromium Sets 6 y 10: PASS 2/2. Cada uno cerró CTW 10/10, Academic 6/6 y Build
  10/10 contra los tres endpoints server-only.

La primera corrida de navegador usó `127.0.0.1` contra un servidor cuyo origen era
`localhost`; Next bloqueó los recursos de desarrollo cross-origin y React no hidrató.
La repetición con el mismo host del servidor pasó 2/2. Se registra como ruido de
infraestructura, no como fallo del contenido o scoring.

## Límites honestos

- Sets 6–10 quedan completos sólo dentro del alcance no-audio actual: CTW, Daily Life,
  Academic, Build, Email y Academic Discussion.
- Sets 11–20 siguen pendientes del mismo tratamiento.
- VoiceOver T16/T17 continúa como gate humano documentado.
- No se abrió, reprodujo, transcribió, generó ni modificó audio. Esto no declara los
  simulacros completos ni listos para producción.
