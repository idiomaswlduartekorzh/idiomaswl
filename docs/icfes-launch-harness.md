# Harness de lanzamiento ICFES

**Estado inicial:** control ejecutable v1; lanzamiento comercial bloqueado.

**Alcance:** expansión de mocks propios y preparación verificable de la escalera COP 12.000 / 49.000 / 99.000. Este harness no cobra, no concede accesos, no aplica migraciones y no publica contenido.

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
npm run icfes:launch:inventory
npm run icfes:launch:release-check
```

`check` valida la integridad del control y termina correctamente aunque la decisión comercial sea `FAIL` o `BLOCKED`; eso permite conservar un registro honesto en CI. `release-check` es la compuerta estricta: devuelve error mientras algún candidato no esté `READY_FOR_RELEASE`.

## Estado inicial verificable

| Gate | Estado | Evidencia principal | Razón |
|---|---|---|---|
| editorial | PASS | `docs/ICFES-INTEGRATION-FINAL-2026-09-08.md:25-31` | El snapshot remediado de 23 mocks propios existe; las aprobaciones humanas del nuevo lanzamiento siguen siendo una fase posterior. |
| SEO | PASS | `src/app/(site)/examenes/[exam]/practica/[mockId]/guiado/page.tsx:16-30,41-77`, `src/app/sitemap.ts:264-280` | El guiado propio es dinámico, `noindex` y no entrega preguntas ni feedback a visitantes sin membresía; esas rutas no están en el sitemap. |
| pricing | PASS | `src/lib/icfes/commerce-v1.ts:10-14,45-83,116-192`, `src/lib/xpress-commerce/payments.server.ts:39-78` | La fachada fija los tres precios y el servidor recalcula los SKUs mensuales y upgrades para `examSlug=icfes`. |
| security | PASS | `src/lib/icfes/attempt-token.server.ts:38-68`, `src/app/api/icfes/attempts/[attemptId]/detail/route.ts:35-77` | Capability anónima firmada y acotada al intento; el owner autenticado conserva acceso por entitlement y la membresía se valida por usuario, examen y beneficio. |
| privacy | BLOCKED | `supabase/migrations/20260908170000_icfes_secure_attempts_and_pass.sql:4-14` | No hay contrato aprobado de retención, borrado/exportación o acceso docente minimizado. |
| payments | BLOCKED | `docs/ICFES-INTEGRATION-FINAL-2026-09-08.md:54-59` | No existe prueba Sandbox end-to-end ni modelo de upgrade/refund/chargeback. |
| teacher-ops | BLOCKED | `supabase/migrations/20260909000500_xpress_memberships_wompi.sql:121-139` | Existe tabla de revisiones y `due_at`, pero faltan roster calibrado, rúbrica versionada, reserva de capacidad y métricas observadas. |
| release | BLOCKED | `docs/ICFES-INTEGRATION-FINAL-2026-09-08.md:96-102` | Activación, migración, revisión legal y evidencia real continúan pendientes. |

Con la prioridad actual, el estado calculado es `BLOCKED_PRIVACY`. El manifiesto de release está vacío y `approvals.json` también. Es deliberado.

## Contrato de oferta

| SKU | Precio | Vigencia | Beneficio |
|---|---:|---:|---|
| `icfes-detail-attempt-v1` | COP 12.000 | Compra única | Detalle automático de un intento. |
| `exam-auto` + `examSlug=icfes` | COP 49.000 | 30 días | Todos los mocks propios y feedback automático. |
| `exam-teacher` + `examSlug=icfes` | COP 99.000 | 30 días | Beneficio anterior y un crédito de feedback docente con SLA de 24 horas. |

El cupo humano inicial es uno. “Feedback docente ilimitado” no es una interpretación permitida: cambiar esa cantidad modifica la policy y exige un nuevo work order, prueba de capacidad y nuevas aprobaciones.

Los upgrades se calculan en servidor y consumen una compra inferior una sola vez:

- 12k → 49k: COP 37.000 dentro de siete días; inicia una nueva vigencia de 30 días.
- 12k → 99k: COP 87.000 dentro de siete días; inicia una nueva vigencia de 30 días.
- 49k → 99k: COP 50.000 mientras el pase esté vigente; conserva su fecha final.

Solo una compra `APPROVED`, no reembolsada y vinculada a la misma cuenta puede originar crédito.

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
3. **Pricing:** SKU, precio, vigencia, beneficio, cupo humano y upgrade sin ambigüedad.
4. **Security:** scoring y autorización en servidor; acceso durable por usuario/capability; aislamiento entre usuarios; revocación por expiración o refund.
5. **Privacy:** minimización, retención, exportación/borrado, menores, consentimiento versionado y acceso docente pseudónimo.
6. **Payments:** Wompi Sandbox, firma, moneda, importe, ambiente, idempotencia, upgrade, refund y chargeback.
7. **Teacher Ops:** rúbrica versionada, crédito finito, slot reservado antes de checkout, cola con lease, QA y alertas 12/18/22 h.
8. **Release:** reportes, aprobaciones, build/E2E, canary, observabilidad y rollback.

Cambiar texto, estímulo, opción, clave, rationale o metadata evaluada invalida el hash afectado y devuelve el candidato a revisión.

## SEO sin degradación

La expansión no añade runners al sitemap automáticamente. `/examenes/icfes` conserva la intención transaccional. Una landing nueva necesita revisión de intención y valor único; si no la supera, queda fuera del sitemap y canonicaliza al hub. El runner, checkout, resultado y revisión son privados/noindex. No se publica `Quiz` JSON-LD que sugiera que el banco completo es gratuito cuando requiere entitlement.

El gate se detiene si encuentra respuestas o rationales en payload anónimo, rutas privadas indexables, páginas programáticas casi duplicadas o claims de contenido oficial no sustentados.

## Operación docente y stop conditions

Capacidad diaria vendible:

```text
floor(revisores × minutos productivos por día × 0,80 / p75 minutos por revisión)
```

Se reserva 20% para QA y retrabajo. El slot debe reservarse atómicamente antes de checkout. El SLA empieza cuando pago, intento y solicitud están completos.

La venta del tier humano se apaga si ocurre cualquiera de estas condiciones:

- cupo humano indefinido o ausencia de revisor calibrado;
- utilización proyectada superior a 80%;
- trabajo más antiguo en cola superior a 18 horas;
- p95 móvil superior a 20 horas;
- una brecha real de SLA sin compensación/refund y causa cerrada.

Los tiers inferiores pueden continuar únicamente si sus propios gates permanecen verdes.

## Ownership

- Product owner: alcance, precio, cupo humano, upgrades y wording comercial.
- Editorial adjudicator: claves, holds y decisión académica.
- English/ICFES/adversarial reviewers: informes independientes.
- Security/privacy owners: autorización, retención, borrado y minimización.
- Payments owner: órdenes, conciliación, refund/chargeback y evidencia Sandbox.
- Teacher Ops owner: rúbrica, calibración, slots, SLA, QA y escalamiento.
- SEO owner: canonical, sitemap, structured data y calidad de landings.
- Release warden: verifica los hashes y materializa el release manifest; no crea ni corrige el candidato.

## Condición de cierre

El harness está listo para gobernar trabajo, no para cobrar. El lanzamiento solo se vuelve elegible cuando `icfes:launch:release-check` termina en cero sobre un candidato con evidencia vigente. Ningún documento, test unitario o salida de agente sustituye las migraciones aplicadas, las pruebas Sandbox, una baseline SEO observada, la aprobación humana o la capacidad docente medida.
