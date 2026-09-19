# ICFES: operación y activación segura

## Contrato comercial acotado

Este contrato solo aplica a `examSlug=icfes`:

- COP 12.900, pago único: informe detallado de un intento.
- COP 49.900, renovación cada 30 días: membresía ICFES.
- COP 99.900, renovación cada 30 días: membresía ICFES Intensiva. Es la única que incluye **Feedback pedagógico personalizado de WeLearn, generado automáticamente a partir de tus resultados**.

Los demás exámenes conservan intacto su catálogo Xpress. El identificador interno `exam-teacher` se mantiene únicamente por compatibilidad con el esquema ya desplegado; en ICFES representa `icfes-intensive-v1` y no habilita operaciones manuales, cupos ni tiempos prometidos.

El informe de pago único aparece solo después de terminar y registrar un intento elegible. La pantalla general de membresías ICFES ofrece únicamente los dos planes recurrentes; así no puede crearse un pago sin el intento que debe desbloquear.

## Embudo y minimización

La calificación del intento propio ocurre en servidor. Con persistencia activa, el primer DTO confirma únicamente que el intento fue guardado; no contiene puntaje, claves ni diagnóstico. Después del consentimiento versionado se guarda el lead y se presenta la oferta. La ruta gratuita entrega solo correctas, total, porcentaje y aviso de resultado no oficial. Partes, habilidades, respuestas, explicaciones y feedback permanecen en rutas privadas y bajo entitlement.

El consentimiento del lead queda en `icfes_lead_consents`, ligado al intento, con versiones, snapshot, hashes y fecha. No se guarda el token ni el contacto en claro en ese ledger. Si la persistencia aún está apagada, el examen termina con **solo el puntaje gratuito**, sin pedir datos, crear orden ni mostrar oferta pagable. La información privada y los cobros siguen fallando cerrados si política, propiedad, consentimiento o entitlement no pueden verificarse.

## Interruptores por defecto

```dotenv
ICFES_ATTEMPT_SIGNING_SECRET=<32-o-mas-caracteres-aleatorios>
ICFES_PERSISTENCE_ENABLED=false
ICFES_PRIVACY_POLICY_VERSION=
ICFES_PASE_ENABLED=false
ICFES_PASE_PRICE_COP=12900
ICFES_WOMPI_SANDBOX_ONLY=true
ICFES_PASE_ORIGIN=http://localhost:3000
```

Para habilitar persistencia en Sandbox, `ICFES_PRIVACY_POLICY_VERSION` debe coincidir exactamente con `icfes-privacy-2026-09-12-v2`. El precio es calculado en servidor y cualquier valor configurado distinto de `12900` bloquea checkout. Con `ICFES_WOMPI_SANDBOX_ONLY=true`, las rutas ICFES rechazan un ambiente Wompi de producción.

## Migraciones remotas pendientes

Esta integración no aplicó migraciones remotas. El orden revisable es:

1. `20260908170000_icfes_secure_attempts_and_pass.sql`
2. `20260912193000_icfes_commercial_contract_v2.sql`
3. `20260912194500_icfes_lead_consent_ledger.sql`
4. `20260912200000_xpress_icfes_commercial_contract_v2.sql`

La migración Xpress general ya está en remoto. No se eliminan órdenes ni entitlements anteriores. La migración comercial acepta el monto histórico para reconciliación, pero la aplicación solo genera nuevas órdenes de COP 12.900. La migración ICFES conserva también el contrato genérico Xpress v5 de COP 12.900/49.900/99.900. El ambiente Sandbox o producción se controla por los flags del servidor, no por una prohibición permanente en la base. Un rollback operativo apaga los flags y conserva el ledger; cualquier corrección de esquema se hace con otra migración.

## Secuencia de verificación

1. Ejecutar catálogo, TypeScript, lint, pruebas ICFES/Xpress/DB/privacidad/pagos y build Webpack.
2. Aplicar las migraciones únicamente en una base de prueba y confirmar RLS, grants de servidor e inmutabilidad del consentimiento.
3. Configurar credenciales Wompi Sandbox del mismo ambiente y probar tokenización, cobro inicial, webhook, reconciliación, renovación, cancelación y reactivación.
4. Confirmar que PENDING no desbloquea contenido, APPROVED concede una sola vez y los niveles inferiores nunca reciben `personalizedFeedback`.
5. Verificar el embudo en móvil y escritorio y comprobar que las rutas privadas mantienen `noindex`.

El arnés colegiado rechaza los reportes del 12 de septiembre porque están vinculados a un hash anterior del manifiesto, además de mantener hallazgos editoriales. No se actualizan hashes ni se reutilizan aprobaciones: el contenido exacto actual requiere una nueva revisión independiente antes de salir de `BLOCKED_EDITORIAL`. Integrar código no equivale a autorizar publicación de los mocks retenidos, cobros ni cambios remotos.
