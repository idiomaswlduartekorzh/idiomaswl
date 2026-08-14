# TOEFL 2026 — Build a Sentence Sets 2–5 — reporte de cierre automático

Fecha: 14 de agosto de 2026
Alcance: contenido e interacción no-audio de Build a Sentence en Sets 2, 3, 4 y 5.

## Resultado

- 4 objetos independientes y 40 ítems públicos: 10 por set.
- 40/40 con intercambio contextual, respuesta fija, cuatro posiciones y un distractor.
- 0 claves, órdenes aceptados o respuestas heredadas en los objetos públicos.
- 40/40 órdenes canónicos reconciliados por el contrato local; 10/10 por set.
- 24/24 actividades heredadas preservadas como fuente server-only.
- Sets representativos 2 y 5: cierre integral en Chromium con CTW 10/10, Academic 6/6
  y Build 10/10.
- Regresión Set 1: 4/4 casos Chromium.
- Audio: no abierto, reproducido, transcrito, generado ni modificado.

## Frontera de seguridad

Los mocks importan únicamente los objetos públicos con fragmentos mezclados. El
endpoint importa un registro `server-only` que contiene los órdenes aceptados. Antes de
construir el registro, el servidor compara IDs y textos públicos con su fuente privada;
si existe deriva, la configuración no carga.

## Pruebas ejecutadas

- `npm run check:toefl-build-sentence`: PASS, Sets 1–5.
- `npm run test:toefl-build-sentence`: PASS, 9/9.
- `npm run check:toefl-ctw` + unit: PASS, 8/8.
- `npm run check:toefl-reading` + unit: PASS, 8/8.
- `npm run check:toefl-writing` + unit: PASS, 8/8.
- `npx tsc --noEmit`: PASS.
- ESLint dirigido: PASS.
- `npm run build`: PASS, guardianes completos y 1.364/1.364 rutas.
- Playwright Sets 2 y 5 combinado: PASS, 2/2.
- Playwright Build Set 1: PASS, 4/4.

## Pendientes fuera de este cierre

- VoiceOver manual T16/T17 continúa como gate humano separado.
- Sets 6–20 conservan CTW, Academic y Build pendientes de expansión.
- Audio y composición completa de tiempos permanecen diferidos según decisión del
  owner. No se considera el producto completo ni listo para producción todavía.
