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
npm run test:icfes-payments-adversarial
npm run audit:icfes-payments-adversarial
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
| security | PASS | `src/lib/icfes/attempt-token.server.ts`, `src/lib/icfes/attempt-ownership.server.ts`, `supabase/migrations/20260909002000_icfes_attempt_claim_evidence.sql` | Capability anónima firmada y acotada al intento; el claim autenticado es atómico, verifica su hash y rechaza takeover. El owner conserva acceso por entitlement y la membresía se valida por usuario, examen y beneficio. |
| privacy | BLOCKED | `supabase/migrations/20260909180000_icfes_privacy_operations.sql`, `src/lib/icfes/privacy-operations.server.ts`, `tests/icfes-privacy-operations.test.mjs`, `docs/icfes-privacy-contract.md` | Exportación, borrado de datos de intento y purga están modelados con ownership, idempotencia y bloqueo por contrato; faltan decisión jurídica, tratamiento del ledger financiero, agenda/observabilidad, migraciones aplicadas y prueba Sandbox. |
| payments | BLOCKED | `docs/icfes-payments-adversarial-local.json`, `tests/icfes-payments-adversarial.test.mjs` | El modelo local aislado pasa 10/10 casos adversariales, incluidos upgrades, replay, refund y chargeback; faltan checkout, webhook firmado, consulta autoritativa y revocación persistida en Wompi Sandbox. |
| teacher-ops | BLOCKED | `src/lib/icfes/teacher-ops-v1.ts`, `src/lib/icfes/teacher-rubric-v1.ts`, `supabase/migrations/20260909000500_xpress_memberships_wompi.sql`, `supabase/migrations/20260909002000_icfes_attempt_claim_evidence.sql`, `tests/icfes-teacher-evidence-v1.test.mjs` | El arnés local cubre rúbrica, reserva, crédito único, cola, lease, idempotencia, alertas, claim anti-takeover y snapshot/hash inmutable del banco. Sigue bloqueado porque no existen worker/ruta de solicitud visible, roster calibrado, métricas observadas, migraciones aplicadas, corrida Sandbox ni aceptación visible del addendum ICFES. |
| release | BLOCKED | `docs/ICFES-INTEGRATION-FINAL-2026-09-08.md:96-102` | Activación, migración, revisión legal y evidencia real continúan pendientes. |

Con la prioridad actual, el estado calculado es `BLOCKED_PRIVACY`. El manifiesto de release está vacío y `approvals.json` también. Es deliberado.

## Contrato de oferta

| SKU | Precio | Vigencia | Beneficio |
|---|---:|---:|---|
| `icfes-detail-attempt-v1` | COP 12.000 | Compra única | Detalle automático de un intento. |
| `exam-auto` + `examSlug=icfes` | COP 49.000 | 30 días | Todos los mocks propios y feedback automático. |
| `exam-teacher` + `examSlug=icfes` | COP 99.000 | 30 días | Beneficio anterior y un crédito docente; objetivo operativo de 24 horas solo con capacidad reservada. |

El cupo humano inicial es uno. “Feedback docente ilimitado” no es una interpretación permitida: cambiar esa cantidad modifica la policy y exige un nuevo work order, prueba de capacidad y nuevas aprobaciones.

Los upgrades se calculan en servidor y consumen una compra inferior una sola vez:

- 12k → 49k: COP 37.000 dentro de siete días; inicia una nueva vigencia de 30 días.
- 12k → 99k: COP 87.000 dentro de siete días; inicia una nueva vigencia de 30 días.
- 49k → 99k: COP 50.000 mientras el pase esté vigente; conserva su fecha final.

Solo una compra `APPROVED`, no reembolsada y vinculada a la misma cuenta puede originar crédito.

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

### Divergencia contractual vigente

`src/lib/xpress-commerce/terms.ts` dice que el plan docente añade retroalimentación después de “cada entrega”. Esa condición global también sirve a otros exámenes y no se altera desde este track. Para ICFES, `icfes-teacher-addendum-2026-09-09-v1` reemplaza específicamente esa sección por un crédito durante 30 días; el parser rechaza una orden ICFES docente que no incluya la aceptación de esa versión.

Como la UI aún no presenta ni recoge ese addendum, el tier ICFES docente permanece bloqueado. Las pruebas locales demuestran el control y el bloqueo, pero no sustituyen aceptación contractual, roster calibrado, métricas reales ni una migración aplicada.

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
