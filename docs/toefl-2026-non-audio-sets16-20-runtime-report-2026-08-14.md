# TOEFL 2026 — cierre no-audio Sets 16–20

Fecha: 14 de agosto de 2026

Lote: W7

Estado: validación automática, build completo y navegador representativo cerrados

| Set | CTW palabras/objetivos | Academic palabras | Official-family + suplemento | Build | Chromium |
| --- | ---: | ---: | ---: | ---: | --- |
| 16 | 81 / 10 | 190 | 5 + 1 | 10 | 10/10 · 6/6 · 10/10 |
| 17 | 85 / 10 | 208 | 5 + 1 | 10 | unit |
| 18 | 80 / 10 | 204 | 5 + 1 | 10 | unit |
| 19 | 82 / 10 | 206 | 5 + 1 | 10 | unit |
| 20 | 84 / 10 | 202 | 5 + 1 | 10 | 10/10 · 6/6 · 10/10 |

## Resultado

- CTW: un objeto por set, primera oración intacta, exactamente diez objetivos alternos
  y entrada de sólo letras faltantes.
- Academic: cinco preguntas single-select de familia oficial y un multiselect rotulado
  como suplemento WeLearn; todos los pasajes quedan dentro de 180–220 palabras.
- Build: diez intercambios contextualizados por set, cuatro fragmentos correctos y un
  distractor inequívocamente incorrecto; contexto y texto fijo de respuesta visibles.
- Seguridad: IDs independientes por set. Las claves CTW/Reading y los órdenes Build
  viven sólo en servidor; la deriva entre fuente pública y privada falla cerrada.
- Preservación: diez bloques CTW, cinco pasajes Academic y treinta actividades Build
  anteriores permanecen como fuentes server-only reutilizables.
- Auditoría factual/editorial: decisiones y fuentes en
  `docs/toefl-2026-written-sets16-20-factual-audit-2026-08-14.md`.

## Evidencia ejecutada

- `npm run check:toefl-ctw`: PASS; unit 8/8 y 10/10 por Set 2–20.
- `npm run check:toefl-reading`: PASS; unit 8/8 y 6/6 por Set 2–20.
- `npm run check:toefl-build-sentence`: PASS sobre 200 ítems Sets 1–20; unit
  9/9 y 10/10 por set.
- `npm run check:toefl-writing`: PASS; unit 8/8 sobre las políticas de 20 sets.
- `npx tsc --noEmit`: PASS.
- ESLint dirigido sobre todos los cambios W7: PASS.
- `npm run build`: PASS con guardianes completos y 1.364/1.364 rutas.
- Chromium de producción Sets 16 y 20: PASS 2/2. Ambos cerraron CTW 10/10,
  Academic 6/6 y Build 10/10 contra los tres endpoints server-only.

La primera corrida de navegador buscó el servidor en el puerto 3001 mientras el build
se había iniciado en 3011. Falló antes de abrir una página con `ERR_CONNECTION_REFUSED`.
Al iniciar el mismo build en el puerto configurado, la misma prueba pasó 2/2 en 6,2 s;
se registra como configuración de infraestructura, no como fallo de producto.

## Límites honestos

- Sets 16–20 quedan completos dentro del alcance no-audio actual: CTW, Daily Life,
  Academic, Build, Email y Academic Discussion.
- Sets 2–20 ya comparten el mismo contrato no-audio y quedan listos para la auditoría
  transversal de composición, tiempos, scoring, navegación y accesibilidad.
- VoiceOver T16/T17 continúa como gate humano documentado.
- No se abrió, reprodujo, transcribió, generó ni modificó audio. Esto todavía no
  declara los 20 simulacros completos ni autoriza producción.
