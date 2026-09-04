# Handoff Mac mini — IELTS Set 2 v2

Fecha: 2026-09-04, America/Bogota.
Rama: `codex/ielts-set2-rebuild-20260904`.
Repositorio canónico: `idiomaswl`.

## Estado al pausar el portátil

- Set 1 permanece publicado y funcional en `main` (`09d82c990ec33a65d6203be59fbf1121ccccdbcb`).
- Set 2 v2 está en rama, **no desplegado** y debe permanecer `NOT_AUDITED`.
- Reading v2: 2.557 palabras (850/833/874), 40 puntos y cero banderas del auditor.
- Listening v2: guion original de 2.805 palabras, 40 puntos y cero banderas del auditor.
- Clave candidata: 80 puntos, numeración exacta; todavía no es fixture aprobado porque falta el MP3.
- Versión activa candidata: `ielts-set-2-v2`; pestañas v1 fallan cerradas.
- Informe detallado: `docs/ielts-set2-rebuild-2026-09-04.md`.

## Audio pendiente

El MP3 actual es de otro examen y no debe conservarse en el release v2. El generador seguro es
`scripts/generate-ielts-set2-audio.mjs`; por defecto solo emite factura.

- manifest SHA-256: `36439cc51432c46f3adf61f3988f0b05ef9ed3ea56aaa740aeed60550f073e78`
- 17.576 caracteres; 8.788 créditos estimados; USD 0,8788 estimados
- saldo visto sin gasto: 964 créditos
- reinicio informado por API: 2026-09-05 18:13:51 America/Bogota
- casting: `scripts/ielts-set2-voice-casting.json`

No generar hasta tener saldo suficiente y un techo/reserva autorizados. La salida cae en `/tmp`,
nunca en `public`. Después hay que escucharla, transcribirla y mapear Q1–Q40 por timecode antes
de reemplazar el MP3 antiguo.

## Comprobaciones terminadas

- `npm run audit:ielts-materials ...`: Set 2, 0 issues / 0 lexical flags.
- `npm run test:ielts-objective`: 9/9 PASS.
- `npm run check:ielts-review-blueprint`: PASS.
- `npm run test:ielts-review`: 11/11 PASS.
- `npm run check:practica-catalog`: PASS.
- TypeScript: PASS con `node --max-old-space-size=4096 node_modules/typescript/bin/tsc --noEmit --pretty false`.
- `npm run prebuild`: PASS completo.
- `next build --webpack`: dos intentos interrumpidos externamente durante optimización; no se
  observó error de código y no debe registrarse como PASS.
- `check:ielts-answer-keys -- --set=2`: falla deliberadamente con `NOT_AUDITED`.

## Siguiente secuencia segura en el Mac mini

1. `git fetch origin` y checkout de `codex/ielts-set2-rebuild-20260904`.
2. Confirmar que el HEAD coincide con el commit de handoff y que el árbol está limpio.
3. Ejecutar la factura (`npm run audio:ielts-set2`) y consultar saldo sin generar.
4. Cuando haya autorización y saldo, generar con manifest, casting, techo USD y reserva exactos.
5. QA auditivo y timecodes Q1–Q40; corregir cualquier pronunciación y regenerar solo lo necesario.
6. Sustituir el MP3, crear fixture JSON aprobado, registrar hash y convertir el guardián Set 2 a PASS.
7. Repetir TypeScript, prebuild, build, UI local, rebase `origin/main`, y todas las pruebas.
8. Solo entonces integrar en `main`, desplegar y verificar la ruta pública.

No se enviaron correos, no se tocaron intentos históricos y no se gastaron créditos.
