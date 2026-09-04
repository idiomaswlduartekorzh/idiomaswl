# Set 1 — implementación del orden aprobado

Estado: EN_VALIDACION. Registro técnico del 4 de septiembre de 2026; no constituye aprobación humana ni autorización de publicación.

## Alcance y trazabilidad

- Rama: `codex/toefl-sectional-seo-harness-20260831`, exclusivamente en la USB.
- Aprobaciones registradas en `bc83bf7b`: `HR-06-SET1-ORDER-PRODUCT` (David Duarte) y `HR-06-SET1-ORDER-ACADEMIC` (Zhanna Korzh).
- Candidato aprobado SHA-256: `25cb54f3f6610376520904f4eb7ed549430bfb27f7fb276135f6e2a788219f42`. Los artefactos firmados no se modifican; su encabezado histórico de borrador no sustituye el registro de aprobación.
- Antes de implementar se reconcilió `origin/main` en `96e817fcee534d70ef3039d8d2e68aa5b9a735d9`, mediante merge `1baa8706af276e3ba6760874d393957ca93603fd` sin conflictos. Archivo recuperable: `archive/toefl-before-order-20260904`.
- Cambian únicamente las posiciones de Q4, Q6 y Q8 para intentos nuevos. Primeras ocho: A2/B2/C2/D2; conjunto de 34: A8/B8/C9/D9. Esto no acredita ausencia de otros sesgos ni validez psicométrica.

## Contrato implementado

`src/data/toefl/listening-option-order.ts` es la única proyección de opciones utilizada por la práctica seccional y el simulacro completo. Conserva todos los IDs, textos y claves semánticas: las letras visibles no se deducen del sufijo del ID.

Al iniciar un intento se selecciona `set1-order-2026-09-04-v1` y se persiste `listeningOrderVersion` en el snapshot existente. Un intento previo sin ese campo, o con metadatos desconocidos, usa `source-v1`. No se cambia la clave de localStorage ni se borran intentos. Los botones de inicio esperan la hidratación para evitar sobrescribir una sesión aún no restaurada.

No cambian bancos canónicos, audios, enunciados, respuestas correctas ni los otros 19 sets. La comprobación de puntuación cubre los 136 IDs de opción del Set 1. No se añaden dependencias.

## Verificaciones y límites reales

| Comprobación | Resultado |
| --- | --- |
| `npm run test:toefl-sectional-listening` | 13 pruebas pasan |
| `npm run test:toefl-fixed-listening` | 3 pruebas pasan |
| `npm run test:toefl-fixed-session` | 3 pruebas pasan |
| `npm run check:practica-catalog` | Pasa, sin rebajar mínimos |
| `npm run check:toefl-fixed-listening` | Pasa |
| TypeScript completo, `--noEmit --incremental false` | INCONCLUSO: detenido por el agente después de más de 13 minutos, salida 143, sin diagnóstico emitido; no se registra como aprobado |
| Build completo | No ejecutado; obligatorio antes de integrar |
| Navegador | NO VALIDADO, discrepancia y timeouts descritos abajo |

Las pruebas de persistencia son roundtrips de snapshots JSON y comprobaciones de conexión del código; no montan React ni sustituyen una prueba real de restauración en navegador.

### Hallazgo de navegador pendiente

En una pestaña de QA creada por este ciclo en `localhost:3026`, la práctica seccional comenzó desde la pantalla introductoria, pero Q4 todavía mostró la correcta en A, no en D. No se da por validado el orden nuevo. Una posible carga del cliente anterior durante Fast Refresh es solo una hipótesis, no una causa demostrada. La navegación posterior al simulacro completo agotó el tiempo; las lecturas de estado también fallaron por timeout. No se borró almacenamiento ni se reinició el intento del usuario en `127.0.0.1:3026`.

Un proxy temporal propuesto para aislar la prueba fue rechazado por seguridad por potencial reenvío de cookies. No se ejecutó ni se intentó eludir ese bloqueo. La pestaña de QA puede conservar el intento creado por este ciclo; no contiene evidencia de aceptación.

### Recursos

USB: 73 GiB libres, worktree 2,2 GiB antes y durante el cierre. El disco interno bajó de aproximadamente 14–18 GiB a 6,6 GiB libres durante verificaciones concurrentes; no se atribuye esa diferencia a una causa demostrada. Se detuvo únicamente el proceso TypeScript propio (PID 9971), sin tocar los de otras tareas. Sin instalaciones, duplicación de node_modules, generación de audios ni limpieza de archivos ajenos.

## Hashes de implementación (SHA-256)

- `src/data/toefl/listening-option-order.ts`: `f93c348bc55d1790216216c81a8debeae35d97a4e5cbe9dc262609fd1421b44a`
- `tests/toefl-listening-option-order.test.mjs`: `4c9e7c4bd0bfeb2da2c4d9a0fff44d1ab92748346fa60b73ff6cb7d74027170a`
- `Toefl2026PracticeClient.tsx`: `c1d605c2924bfc7081202f724fd21b1c1b2792231f72d059c7c4d5618bb015ad`
- `ToeflListeningSectionRunner.tsx`: `268bfa014c0ebac1cfa704c604e437b8431e310a817ed601a5d95a5942aedaab`
- `package.json`: `c9cff39277b9be672e47213f306c488c0c3b7260256709e86eb0ab7e16faae5f`

## Entrega y siguiente paso

- Responsable de esta entrega técnica: Codex; no actúa como revisor humano.
- Archivos compartidos: `package.json` (solo comando de pruebas), `Toefl2026PracticeClient.tsx` y este registro documental. Sin cambios a lockfile, navegación global ni infraestructura.
- Dependencias externas/migraciones/variables: ninguna nueva.
- Siguiente acción exacta: cuando el entorno local responda y tenga margen de recursos, verificar un inicio realmente nuevo en ambos runners, Q4/Q6/Q8, recarga y selección persistida; confirmar además que un intento anterior mantiene su orden. Si el navegador vuelve a mostrar A en Q4 de un intento nuevo, diagnosticar y corregir antes de cerrar QA. Repetir TypeScript y build antes de cualquier integración.
- HR-06 permanece abierto; C09 sigue bloqueado y D9 conserva sus controles. No hay merge a main, deployment ni smoke de producción. Decisión de integración aplazada: no está LISTO_PARA_INTEGRAR.
