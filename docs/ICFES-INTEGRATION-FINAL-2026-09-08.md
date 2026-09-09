# Revisión integral final — ataque ICFES

Fecha de cierre: 8 de septiembre de 2026 (America/Bogota)

Rama: `codex/icfes-content-safety-20260908`

Base revisada: `ac2ba152`

Commits de producto revisados: `7ad26a0b`, `bfb3a31a`, `fe5be2f1`, `da7f84c6`, `ae49eb91`

Decisión: **aprobado para integración humana segura**, con las limitaciones editoriales y operativas de este documento.

No se hizo deploy, push, merge, aplicación de migraciones ni cobro real.

## Resultado por categoría

### Inventario, routing y SEO

- El canonical transaccional es `/examenes/icfes`.
- Hay 34 recursos únicos: 23 mocks propios, 10 bancos atribuidos o relacionados y un entrenamiento guiado autónomo.
- Los recursos producen 62 modos o rutas; no se presentan como 62 exámenes distintos.
- El smoke del build final validó 48 rutas con respuesta 200 y dos rutas excluidas editorialmente con respuesta 404 deliberada.
- Las páginas satélite conservan una intención distinta y enlazan al hub principal; metadata, sitemap, JSON-LD y canonical pasaron 30/30 controles.

### Veracidad editorial y scoring

- Los 23 mocks propios conservan 1.035 preguntas, siete partes por mock, claves dentro de rango, IDs únicos y cero preguntas exactamente duplicadas. La auditoría editorial aprobó 382/382 controles.
- El entrenamiento autónomo conserva 55 preguntas y aprobó 14/14 controles.
- Cinco muestras históricas atribuidas habilitadas conservan 145 preguntas y aprobaron 19/19 controles. Dos muestras permanecen excluidas porque faltan seis estímulos; el sistema no inventa ese contenido.
- Los diez bancos históricos o relacionados dejan explícito que la atribución local no ha sido cotejada con una fuente primaria. Ninguno se vende ni se etiqueta como cuadernillo oficial verificado.
- Los textos públicos no afirman afiliación, aval, réplica oficial, puntaje garantizado ni nivel B2 del resultado ICFES. La escala visible se detiene en B1.

### Seguridad, privacidad y control de acceso

- El navegador recibe preguntas sanitizadas. En el flujo público nuevo no se envían claves, racionales, explicaciones ni insights de los ítems puntuados; las respuestas de ejemplos didácticos no puntuados permanecen visibles por diseño.
- La calificación ocurre en servidor con intento firmado y vinculado al examen. El DTO gratuito contiene únicamente resultado básico.
- El resultado se muestra inmediatamente y antes de cualquier formulario; dejar datos es opcional.
- Las banderas comerciales y de persistencia quedan apagadas por defecto.
- El precio se decide en servidor: COP 49.900 (`4.990.000` centavos), y el evento cliente usa el importe devuelto por el servidor.
- Ningún banco atribuido o relacionado puede llegar a checkout o detalle premium.
- Wompi verifica firma, referencia, importe, moneda y estado; la concesión de acceso es idempotente. Esta revisión no ejecutó transacciones reales.
- La migración habilita RLS en las tres tablas nuevas, revoca acceso a `anon` y `authenticated`, no crea políticas de lectura pública y reserva acceso a `service_role`.
- Los endpoints no aceptan `user_id`/`userId` desde body, payload o input del cliente; la identidad se deriva de la capacidad firmada y del servidor.
- La analítica usa un contrato allowlist y elimina contacto, respuestas y otros campos sensibles. No se envía PII en los eventos ICFES revisados.

### Producto, UX y accesibilidad

- El recorrido gratuito completo fue ejecutado en Chromium sobre el build de producción, en escritorio `1440×1000` y móvil `390×844`, sin errores de consola.
- El resultado gratuito, su desglose y el mensaje de datos opcionales son visibles sin registro. Con las banderas apagadas no aparece la oferta de pago.
- En móvil no hay desbordamiento horizontal ni superposición del botón flotante de WhatsApp sobre el resultado.
- Los controles de teclado, foco, tabs ARIA, `aria-live` y movimiento reducido están incluidos en los gates de producto y cohorte.
- La cohorte determinística de 100 usuarios sintéticos recorrió siete cohortes y 33 rutas únicas con 15/15 controles. Es evidencia de exposición y funcionamiento, no una medición de aprendizaje humano.

### Wompi, Supabase y estado de lanzamiento

- La arquitectura de cobro y persistencia queda preparada pero inactiva por flags.
- La migración no fue aplicada a ningún proyecto Supabase.
- No se hizo llamada de checkout real ni se concedió una suscripción real.
- Antes de activar el producto deben probarse migración, RLS, webhook e idempotencia en un proyecto sandbox, con secretos sandbox y una revisión legal separada de cualquier material atribuido.

## Entregable de expansión editorial

La rama incluye un pipeline explícito, sin añadir exámenes ni preguntas nuevas:

- Schema versionado: `src/data/icfes/own-mock-expansion.schema.json`.
- Manifiesto de 23 mocks: `src/data/icfes/own-mock-expansion-manifest.json`.
- Validador: `scripts/check-icfes-own-expansion.mjs`.
- Proceso y estados editoriales: `docs/ICFES-OWN-MOCK-EXPANSION-PIPELINE.md`.
- Checklist reutilizable: `docs/templates/ICFES-OWN-MOCK-EXPANSION-CHECKLIST.md`.

Cada entrada registra módulo, ruta, versión, SHA-256, procedencia, roles de revisión, remediación y estado de publicación. La compuerta exige integridad de siete partes, paridad de catálogo/registro/guiado, claves válidas, opciones únicas, sanitización pública, hashes vigentes y detección de duplicados exactos. Resultado final: 23 mocks, 1.035 preguntas, cero duplicados exactos y 8/8 gates aprobados.

## Evidencia reproducible

- Informe consolidado: `/Users/ddev/Documents/ChatGPT/IdiomasWL/quiz-verbos-aleman-mac-mini/docs/icfes-final-expert-audit.json`
- Auditoría editorial: `/Users/ddev/Documents/ChatGPT/IdiomasWL/quiz-verbos-aleman-mac-mini/docs/icfes-guided-editorial-audit.json`
- Auditoría histórica atribuida: `/Users/ddev/Documents/ChatGPT/IdiomasWL/quiz-verbos-aleman-mac-mini/docs/icfes-official-guided-audit.json`
- Auditoría SEO/producto: `/Users/ddev/Documents/ChatGPT/IdiomasWL/quiz-verbos-aleman-mac-mini/docs/icfes-seo-product-audit.json`
- Smoke de rutas: `/Users/ddev/Documents/ChatGPT/IdiomasWL/quiz-verbos-aleman-mac-mini/docs/icfes-runtime-smoke-audit.json`
- Cohorte de 100: `/Users/ddev/Documents/ChatGPT/IdiomasWL/quiz-verbos-aleman-mac-mini/docs/icfes-100-user-simulation.json`
- Evidencia E2E: `/Users/ddev/Documents/ChatGPT/IdiomasWL/quiz-verbos-aleman-mac-mini/artifacts/icfes-audit/icfes-product-e2e-2026-09-08.json`
- Captura escritorio: `/Users/ddev/Documents/ChatGPT/IdiomasWL/quiz-verbos-aleman-mac-mini/artifacts/icfes-audit/icfes-free-result-desktop-2026-09-08.png`
- Captura móvil: `/Users/ddev/Documents/ChatGPT/IdiomasWL/quiz-verbos-aleman-mac-mini/artifacts/icfes-audit/icfes-free-result-mobile-2026-09-08.png`

Validaciones ejecutadas sobre el estado final:

- 40/40 pruebas ICFES.
- TypeScript `tsc --noEmit`: aprobado.
- ESLint enfocado: cero errores; seis advertencias existentes fuera de los archivos modificados.
- `next build --webpack` con Next.js 16.2.6: aprobado; compilación, typecheck y 2.523 páginas estáticas completadas.
- Auditorías de expansión, superhub, inventario, 23 mocks, guiado 55, muestras atribuidas, SEO, 100 usuarios, runtime y consolidación final: aprobadas.
- E2E de escritorio y móvil: aprobado, cero errores de consola.

## Límites explícitos

- La atribución de los bancos históricos no está verificada ítem por ítem contra fuente primaria, y su licencia requiere revisión legal. No deben monetizarse ni presentarse como oficiales hasta cerrar ambos puntos.
- Las dos muestras incompletas continúan bloqueadas en guiado y premium.
- Los tests de 100 usuarios son sintéticos; no prueban retención, motivación ni mejora real de puntaje.
- La indexabilidad técnica no garantiza posiciones orgánicas.
- Activar flags, aplicar la migración, configurar secretos reales o publicar son pasos posteriores y requieren una autorización separada.

## Integración segura a `main`

Ejecutar desde un árbol limpio. Si el rebase presenta conflictos, detenerse y revisarlos; no usar `reset --hard`, force-push ni resolución automática.

```bash
cd /Users/ddev/Documents/ChatGPT/IdiomasWL/quiz-verbos-aleman-mac-mini
git switch codex/icfes-content-safety-20260908
git status --short
git fetch origin
git rebase origin/main

npm ci
npm run check:practica-catalog
npm run test:icfes
npm run check:icfes-superhub
npx tsc --noEmit
npx next build --webpack

git status --short
git switch main
git pull --ff-only origin main
git merge --ff-only codex/icfes-content-safety-20260908
git log --oneline --decorate -7
```

Después del `merge --ff-only`, detenerse. Este procedimiento no incluye `git push`, deploy, migración ni activación de flags.
