# Harness de lanzamiento ICFES

**Estado inicial:** control ejecutable v1; lanzamiento comercial bloqueado.

**Alcance:** expansión de mocks propios y preparación verificable de la escalera COP 12.900 / 49.900 / 99.900. Este harness no cobra, no concede accesos, no aplica migraciones y no publica contenido.

## Qué resuelve

El harness separa cuatro cosas que no deben confundirse:

1. el `work order`, que fija objetivo, commit base, artefactos de entrada y sus SHA-256;
2. el `candidate ledger`, que conserva candidatos aunque fallen o estén bloqueados;
3. las revisiones y aprobaciones humanas, ligadas al digest exacto del work order y del candidato;
4. el `release manifest`, que solo puede contener un candidato con todos los gates en `PASS`, reportes vigentes y aprobaciones humanas completas.

El estado nunca se escribe a mano. `scripts/icfes-launch-harness.mjs` lo calcula a partir de gates, reportes, aprobaciones y release manifest. Añadir una entrada al release manifest no transforma un candidato fallido en aprobado.

## Comandos

```bash
npm run check:icfes-launch-harness
npm run test:icfes-launch-harness
npm run test:icfes-payments-adversarial
npm run audit:icfes-payments-adversarial
npm run icfes:launch:refresh
npm run icfes:launch:inventory
npm run icfes:launch:release-check
```

`check` valida la integridad del control y termina correctamente aunque la decisión comercial sea `FAIL` o `BLOCKED`; eso permite conservar un registro honesto en CI. `release-check` es la compuerta estricta: devuelve error mientras algún candidato no esté `READY_FOR_RELEASE`.

`refresh` recalcula SHA-256, `workOrderDigest` y `candidateDigest` únicamente cuando no existen aprobaciones ni releases. Antes de escribir hace una prevalidación completa y se niega a operar si falta un artefacto, si Git conserva rutas sin resolver en el índice o si detecta marcadores de conflicto; así un merge sin resolver nunca se convierte en evidencia aprobable.

## Estado inicial verificable

| Gate | Estado | Evidencia principal | Razón |
|---|---|---|---|
| editorial | PASS | `docs/ICFES-INTEGRATION-FINAL-2026-09-08.md:25-31` | El snapshot remediado de 23 mocks propios existe; las aprobaciones humanas del nuevo lanzamiento siguen siendo una fase posterior. |
| SEO | PASS | `src/app/(site)/examenes/[exam]/practica/[mockId]/guiado/page.tsx:16-30,41-77`, `src/app/sitemap.ts:264-280` | El guiado propio es dinámico, `noindex` y no entrega preguntas ni feedback a visitantes sin membresía; esas rutas no están en el sitemap. |
| GEO/AEO/IA | PASS | `scripts/audit-icfes-seo-product.mjs`, `docs/icfes-seo-measurement-2026-09-09.md` | El audit pasa 30/30 controles de respuesta pública, fuentes/método, paridad estructurada y exclusión del contenido privado. No se afirma indexación, ranking, citación ni inclusión en respuestas generativas. |
| pricing | PASS | `src/lib/icfes/commerce-v1.ts:10-14,45-83,116-192`, `src/lib/xpress-commerce/payments.server.ts:39-78`, `docs/icfes-commerce-v1.md` | Los tres importes, la renovación, el upgrade y el beneficio asistido están versionados y calculados en servidor; el copy revela la asistencia de IA, evita atribución docente y exige control de calidad antes de entregar. |
| security | PASS | `src/lib/icfes/attempt-token.server.ts`, `src/lib/icfes/attempt-ownership.server.ts`, `supabase/migrations/20260909002000_icfes_attempt_claim_evidence.sql` | Capability anónima firmada y acotada al intento; el claim autenticado es atómico, verifica su hash y rechaza takeover. El owner conserva acceso por entitlement y la membresía se valida por usuario, examen y beneficio. |
| privacy | BLOCKED | `supabase/migrations/20260909180000_icfes_privacy_operations.sql`, `src/lib/icfes/privacy-operations.server.ts`, `tests/icfes-privacy-operations.test.mjs`, `docs/icfes-privacy-contract.md` | Exportación, borrado de datos de intento y purga están modelados con ownership, idempotencia y bloqueo por contrato; faltan decisión jurídica, tratamiento del ledger financiero, agenda/observabilidad, migraciones aplicadas y prueba Sandbox. |
| payments | BLOCKED | `docs/icfes-payments-adversarial-local.json`, `tests/icfes-payments-adversarial.test.mjs` | El modelo local aislado pasa 10/10 casos adversariales, incluidos upgrades, replay, refund y chargeback; faltan checkout, webhook firmado, consulta autoritativa y revocación persistida en Wompi Sandbox. |
| teacher-ops | BLOCKED | `src/lib/icfes/teacher-ops.server.ts`, `supabase/migrations/20260909183000_icfes_teacher_review_delivery.sql`, `tests/icfes-teacher-api-v1.test.mjs` | El camino local cubre ingreso a bandeja, notificación a WeLearn, payload sin PII, credencial de aprobación, leases con heartbeat, QA/retry y resultado inmutable. Sigue bloqueado porque no existen worker desplegado, roster calibrado real, evidencia de aprobación previa a la entrega, métricas observadas, migraciones aplicadas ni corrida Sandbox. |
| release | BLOCKED | `docs/ICFES-INTEGRATION-FINAL-2026-09-08.md:96-102` | Activación, migración, revisión legal y evidencia real continúan pendientes. |

Con la prioridad actual, el estado calculado avanza hasta el primer gate externo pendiente: privacidad, pagos, operación del feedback asistido y release siguen bloqueados. El manifiesto de release está vacío y `approvals.json` también. Es deliberado.

## Contrato de oferta

| SKU | Precio | Vigencia | Beneficio |
|---|---:|---:|---|
| `icfes-detail-attempt-v1` | COP 12.900 | Compra única | Detalle automático de un intento. |
| `exam-auto` + `examSlug=icfes` | COP 49.900 | 30 días | Todos los mocks propios y feedback automático. |
| `exam-teacher` + `examSlug=icfes` | COP 99.900 | 30 días | Beneficio anterior y un crédito por periodo de **feedback pedagógico personalizado de WeLearn con asistencia de IA**; objetivo operativo condicional de 12 horas. |

El cupo inicial es uno por periodo. La solicitud entra a la bandeja, notifica a WeLearn y requiere aprobación humana registrada antes de entregarse. La asistencia de IA debe declararse públicamente; el SKU técnico `exam-teacher` no autoriza a afirmar que el feedback fue escrito por un docente. “Feedback docente” y “feedback ilimitado” son claims prohibidos. Las 12 horas son un objetivo sujeto a capacidad reservada, no una garantía.

Los upgrades entre membresías se calculan en servidor:

- 49,9k → 99,9k: COP 50.000 mientras el pase esté vigente; conserva su fecha final.

La compra de COP 12.900 es un detalle ligado a un intento y no se descuenta de las membresías: no existe una promesa comercial ni una implementación aprobada para ese crédito. Solo una membresía de COP 49.900 `APPROVED`, no reembolsada y vinculada a la misma cuenta puede originar el upgrade de COP 50.000.

La evidencia `docs/icfes-payments-adversarial-local.json` se regenera de forma determinista, incluye hashes de fuente/prueba y no usa red ni credenciales. El flag `ICFES_ADVERSARIAL_PAYMENTS_ENABLED` está apagado por defecto y el modelo rechaza su ejecución en producción. Esta prueba local mejora el gate, pero no lo convierte en `PASS`: la prueba end-to-end con eventos firmados y estado persistido real sigue siendo obligatoria.

## Roles y separación

Autor, especialista de inglés, revisor de formato ICFES, adversario y release warden son funciones separadas. El checker rechaza reportes de funciones incompatibles producidos por el mismo `actorId`. También exige que product owner y release warden sean personas distintas.

Los agentes pueden producir reportes, pero no aprobaciones. Una aprobación válida declara `actorType: human`, credencial/rol, evidencia, timestamp y los dos digests actuales. Cualquier cambio del candidato o work order vuelve obsoleta esa aprobación.

Los reportes viven en:

```text
artifacts/icfes-launch-harness/<candidateId>/<role>.json
```

Cada hallazgo editorial conserva los campos machine-actionable `resourceId`, `questionId`, `currentKey`, `proposedKeyOrWording`, `evidence`, `severity`, `confidence` y `blockProduction`.

## Candidate ledger y release manifest

`candidate-ledger.json` acepta trabajo incompleto, fallido o bloqueado. Allí deben permanecer las alternativas rechazadas para no repetirlas ni perder su evidencia.

`release-manifest.json` es una allowlist pequeña, no un historial. Para entrar exige:

- todos los gates en `PASS`;
- un reporte `PASS` vigente de cada rol requerido;
- siete aprobaciones humanas, todas ligadas a los digests actuales;
- identidad del release warden coincidente;
- ausencia de cualquier stop condition activa.

El modelo nuevo acepta `mock-24`, `mock-25` y números posteriores. Los borradores permanecen fuera del catálogo; el manifest anterior de 23 mocks se trata como baseline, no como techo de crecimiento.

## Gates de expansión

1. **Editorial:** 45 preguntas, partes 1–7, IDs estables, clave única, distractores defendibles, inglés natural, evidencia por ítem y adjudicación de desacuerdos.
2. **SEO:** hub transaccional único; runners, checkout, resultados y revisión en `noindex`; ninguna clave en HTML/RSC; landing indexable solo si aporta intención y texto propios.
3. **GEO/AEO/IA:** resumen directo visible, fuente y método explícitos, datos estructurados fieles al contenido visible, contenido privado fuera de superficies de recuperación y resultados medidos sin prometer ranking, citación o inclusión.
4. **Pricing:** SKU, precio, vigencia, beneficio, cupo finito, disclosure de IA, prohibición de autoría docente y upgrade sin ambigüedad.
5. **Security:** scoring y autorización en servidor; acceso durable por usuario/capability; aislamiento entre usuarios; revocación por expiración o refund.
6. **Privacy:** minimización, retención, exportación/borrado, menores, consentimiento versionado y acceso operativo pseudónimo.
7. **Payments:** Wompi Sandbox, firma, moneda, importe, ambiente, idempotencia, upgrade, refund y chargeback.
8. **Teacher Ops:** rúbrica versionada, crédito finito, bandeja y notificación a WeLearn, slot reservado antes de checkout, cola con lease, aprobación humana evidenciada, QA y alertas a las 6/9/11 h.
9. **Release:** reportes, aprobaciones, build/E2E, canary, observabilidad y rollback.

Cambiar texto, estímulo, opción, clave, rationale o metadata evaluada invalida el hash afectado y devuelve el candidato a revisión.

## SEO sin degradación

La expansión no añade runners al sitemap automáticamente. `/examenes/icfes` conserva la intención transaccional. Una landing nueva necesita revisión de intención y valor único; si no la supera, queda fuera del sitemap y canonicaliza al hub. El runner, checkout, resultado y revisión son privados/noindex. No se publica `Quiz` JSON-LD que sugiera que el banco completo es gratuito cuando requiere entitlement.

El gate se detiene si encuentra respuestas o rationales en payload anónimo, rutas privadas indexables, páginas programáticas casi duplicadas o claims de contenido oficial no sustentados.

## GEO/AEO/IA sin promesas de visibilidad

Este gate gobierna la aptitud del contenido público para motores de respuesta y sistemas generativos; no intenta manipularlos ni afirma que vayan a citar, posicionar o incluir a IdiomasWL. Un `PASS` técnico solo significa que el snapshot revisado cumple estas condiciones verificables:

- la respuesta principal es visible, breve y coherente con el resto de la página;
- autoría, procedencia, método y límites del simulacro son explícitos;
- FAQ, JSON-LD y metadata no añaden afirmaciones que la persona no pueda ver;
- runners, resultados, respuestas, rationales y feedback pago siguen privados y `noindex`;
- cualquier mención de desempeño orgánico o presencia en respuestas de IA se apoya en observación fechada, nunca en una garantía.

El gate se bloquea ante claims sin fuente, falsa afiliación oficial, fechas o metodología ausentes, datos estructurados divergentes, respuestas privadas recuperables o promesas de ranking/citación. Search Console, logs y referencias observadas se registran después de una publicación autorizada; la ausencia de citación no convierte por sí sola el producto en defectuoso.

## Operación del feedback asistido y stop conditions

Capacidad diaria vendible:

```text
floor(personas aprobadoras × minutos productivos por día × 0,80 / p75 minutos por revisión)
```

Se reserva 20% para QA y retrabajo. El slot debe reservarse atómicamente antes de checkout. El SLA empieza cuando pago, intento y solicitud están completos.

La venta del tier de feedback asistido se apaga si ocurre cualquiera de estas condiciones:

- cupo indefinido o ausencia de una persona aprobadora calibrada;
- la solicitud no entra a bandeja o no notifica a WeLearn;
- la entrega puede ocurrir sin evidencia de aprobación humana;
- utilización proyectada superior a 80%;
- trabajo más antiguo en cola igual o superior a 9 horas;
- p95 móvil superior a 10 horas;
- una brecha real de SLA sin compensación/refund y causa cerrada.

Los tiers inferiores pueden continuar únicamente si sus propios gates permanecen verdes.

### Contrato específico vigente

`src/lib/xpress-commerce/terms.ts` y el addendum ICFES deben coincidir en un crédito por periodo de 30 días de “feedback pedagógico personalizado de WeLearn con asistencia de IA” y en un objetivo operativo condicional de 12 horas. El parser rechaza una orden ICFES que no incluya la aceptación de la versión específica vigente.

La UI presenta y recoge ese addendum de forma independiente, y el servidor conserva la versión aceptada. El copy público no puede usar “feedback docente”, “revisión docente” ni atribuciones equivalentes. La entrega debe conservar evidencia hash-bound de bandeja, notificación a WeLearn y aprobación humana. El tier permanece bloqueado porque las pruebas locales no sustituyen roster calibrado, worker desplegado, métricas reales, migraciones aplicadas ni una corrida Sandbox.

## Ownership

- Product owner: alcance, precio, cupo, upgrades, disclosure de IA y wording comercial sin claim docente.
- Editorial adjudicator: claves, holds y decisión académica.
- English/ICFES/adversarial reviewers: informes independientes.
- Security/privacy owners: autorización, retención, borrado y minimización.
- Payments owner: órdenes, conciliación, refund/chargeback y evidencia Sandbox.
- Teacher Ops owner: rúbrica, calibración, slots, bandeja/notificación, evidencia de aprobación, objetivo operativo, QA y escalamiento.
- SEO owner: canonical, sitemap, structured data y aprobación conjunta del gate GEO/AEO/IA.
- GEO/AEO/IA reviewer: contraste independiente de respuesta directa, fuentes, paridad visible/estructurada, privacidad y ausencia de promesas de visibilidad.
- Release warden: verifica los hashes y materializa el release manifest; no crea ni corrige el candidato.

## Condición de cierre

El harness está listo para gobernar trabajo, no para cobrar. El lanzamiento solo se vuelve elegible cuando `icfes:launch:release-check` termina en cero sobre un candidato con evidencia vigente. Ningún documento, test unitario o salida de agente sustituye las migraciones aplicadas, las pruebas Sandbox, una baseline SEO observada, la aprobación humana previa a cada entrega o la capacidad operativa medida.
