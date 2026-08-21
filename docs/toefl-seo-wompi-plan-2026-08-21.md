# TOEFL 2026: plan SEO y desbloqueo de resultados con Wompi

Fecha de línea base: 21 de agosto de 2026

Propietario: Idiomas WeLearn
Estado: fase SEO en implementación; Wompi pendiente de precio, promesa de Speaking y llaves Sandbox

## 1. Resultado que buscamos

Construir dos recorridos conectados:

1. Una persona busca en Google un simulacro o una tarea de TOEFL 2026, llega a una página que responde exactamente a esa intención y empieza uno de los 20 simulacros.
2. Completa el simulacro gratis, paga con Wompi para desbloquear el informe detallado y recibe solo el resultado que el servidor haya autorizado después de confirmar el pago.

No se puede garantizar una posición concreta en Google. Sí se puede garantizar que las páginas sean rastreables, respondan a búsquedas reales, tengan mensajes honestos y cuenten con medición y guardianes para no retroceder.

## 2. Línea base comprobada en Search Console

Ventana disponible: 18 de julio a 19 de agosto de 2026.

| Métrica TOEFL | Línea base |
| --- | ---: |
| Clics | 0 |
| Impresiones | 120 |
| CTR | 0 % |
| Posición media | 29,8 |
| Enlaces externos a todo el dominio | 0 |

Consultas que ya tienen demanda:

| Consulta | Impresiones | Posición media | Página objetivo |
| --- | ---: | ---: | --- |
| examen toefl simulacro | 43 | 21,4 | `/examenes/toefl` |
| examen toefl simulador | 25 | 40,1 | `/examenes/toefl` |
| simulacro toefl | 9 | 19,7 | `/examenes/toefl` |
| toefl and toefl ibt | 8 | 35,1 | artículo comparativo o guía específica |
| simulacros toefl | 4 | 18,3 | `/examenes/toefl` |
| toefl essentials vs toefl ibt | 3 | 8,3 | artículo comparativo existente |

La página `/examenes/toefl` concentra 94 de las 120 impresiones TOEFL, pero todavía no recibe clics. La prioridad no es publicar cincuenta artículos: es hacer competitiva esa URL y construir los dos huecos reales del clúster, Listening y Speaking.

## 3. Diagnóstico

### 3.1 Lo que estaba frenando el clic

- El título principal priorizaba «nueva escala 1–6» aunque las búsquedas reales dicen «simulacro», «simulador» y «examen».
- El H1 decía únicamente «TOEFL iBT» y no presentaba el producto de 20 simulacros.
- `/practica/toefl` anunciaba Listening y Speaking como «Próximamente» aunque esas secciones ya existen dentro de los simulacros.
- No había páginas indexables que respondieran a `TOEFL listening practice` o `TOEFL speaking practice` en el formato 2026.
- La frase «formato real» podía hacer pensar que el producto era oficial o adaptativo. Los recorridos WeLearn son originales y fijos.
- Google no detecta ni un enlace externo al dominio. El contenido puede subir posiciones, pero competir con ETS y grandes editoriales requiere autoridad externa legítima.

### 3.2 Posicionamiento que sí podemos defender

> 20 simulacros originales de WeLearn que cubren Reading, Listening, Writing y Speaking en las tareas TOEFL 2026. Son recorridos fijos, no oficiales y no reproducen el motor adaptativo de ETS.

ETS ofrece un examen completo gratuito con puntuación automatizada en TestReady. Por eso «un TOEFL gratis» no es una diferencia suficiente. La ventaja de WeLearn debe ser la cantidad de recorridos, la explicación en español, la práctica repetible y el informe privado accionable.

## 4. Arquitectura de búsquedas

### Página transaccional principal

- URL: `/examenes/toefl`
- Intención primaria: `simulacro TOEFL`
- Variantes: `examen TOEFL simulacro`, `simulador TOEFL`, `simulacros TOEFL`, `simulacro TOEFL 2026`, `examen TOEFL en línea`.
- Acción: escoger uno de los 20 simulacros.

### Mapa de práctica

- URL: `/practica/toefl`
- Intención: entender el formato 2026 y elegir una sección.
- Acción: entrar a Reading, Listening, Writing o Speaking; después volver a un simulacro.

### Clúster por sección

| URL | Intención primaria |
| --- | --- |
| `/practica/toefl/reading` | TOEFL reading practice |
| `/practica/toefl/listening` | TOEFL listening practice |
| `/practica/toefl/writing` | TOEFL writing practice |
| `/practica/toefl/speaking` | TOEFL speaking practice |

Reading y Writing ya tienen rutas por tarea. Listening y Speaking empiezan con hubs completos; no se abrirán páginas hijas vacías. Una tarea obtiene URL propia solo cuando existe suficiente práctica original para que la página tenga valor independiente.

### Contenido editorial prioritario

1. Actualizar el artículo `TOEFL iBT vs TOEFL Essentials` porque ya aparece en posición 8,3 para una consulta exacta.
2. Corregir títulos y explicaciones que todavía describen las tareas anteriores a enero de 2026.
3. Crear o refrescar una guía de `TOEFL 2026 estructura, tiempos y tareas` que enlace las cuatro secciones y los simulacros.
4. Investigar de nuevo sedes y fechas antes de crear contenido local de `TOEFL Bucaramanga`; esa información cambia y no debe publicarse por memoria.
5. Crear un recurso enlazable propio: tabla de tareas 2026 y conversor 1–6 ↔ 0–120 con metodología y fecha de verificación.

## 5. Cambios técnicos de la primera entrega

- Título, descripción, H1 y respuesta directa de `/examenes/toefl` alineados con las consultas medidas.
- CTA visible hacia `#simulacros`.
- Mensaje explícito: material original, fijo, no oficial y no adaptativo.
- `/practica/toefl` actualizado a las cuatro rutas activas.
- Nuevos hubs indexables `/practica/toefl/listening` y `/practica/toefl/speaking`.
- Enlaces internos desde el hub, la portada de simulacros, el podcast y la guía.
- Sitemap y mapas de rutas/palabras clave actualizados.
- Nuevo `npm run audit:toefl`, equivalente a la tubería de IELTS. Comprueba HTTP 200, canonical propio, un solo H1, indexabilidad, sitemap, longitud de snippet, lenguaje de tareas y que las sesiones de examen sigan en `noindex`.

## 6. Autoridad externa sin spam

La ausencia de enlaces externos no se arregla comprando enlaces ni llenando directorios. Plan inicial:

1. Ofrecer la tabla de tareas y el conversor a orientadores de colegios, docentes de inglés y oficinas de internacionalización como recurso gratuito citable.
2. Conseguir menciones en páginas propias reales: perfiles institucionales, aliados educativos, directorios locales revisados y notas donde WeLearn aporte datos o una explicación original.
3. Publicar una metodología transparente sobre cómo se construyen y auditan los simulacros. Esto da una razón para citar la página más allá de «hay un test gratis».
4. Registrar cada contacto, URL obtenida y fecha. No medir «mensajes enviados» como éxito; medir dominios relevantes que enlazan y tráfico referido.

## 7. Medición semanal

Comparar periodos de 28 días, sin reaccionar a dos o tres días de datos:

- impresiones y clics de consultas que contengan `toefl`;
- CTR y posición de `/examenes/toefl`;
- posición de `examen toefl simulacro`, `simulacro toefl` y `simulacros toefl`;
- páginas TOEFL indexadas y excluidas;
- sesiones que inician un simulacro desde una entrada orgánica;
- tasa de finalización del simulacro;
- clic en pagar, checkout iniciado, pago aprobado e informe desbloqueado;
- dominios externos relevantes que enlazan.

Primer umbral de 28 días: pasar de cero clics a tráfico medible, llevar la intención principal desde alrededor de posición 21 hacia top 15 y conservar todas las rutas públicas sin errores de indexación. Es un objetivo operativo, no una promesa de ranking.

## 8. Diseño seguro del cobro con Wompi

### Principio

El navegador nunca decide que un informe está pagado. La redirección de Wompi tampoco es prueba de pago. Solo el servidor libera el informe después de validar un evento firmado o consultar la transacción y comprobar referencia, monto, moneda, ambiente y estado `APPROVED`.

### Recorrido propuesto

1. Antes de iniciar se informa: «hacer el simulacro es gratis; el informe detallado tiene un costo de COP $X».
2. Al terminar, el servidor guarda la entrega y devuelve un acceso temporal que no contiene respuestas ni puntajes detallados.
3. El estudiante ve la confirmación de entrega y el botón «Desbloquear mi informe».
4. `POST /api/toefl/reports/checkout` valida la entrega, crea una referencia única, toma el precio desde configuración del servidor y genera la firma SHA-256 de integridad.
5. Wompi procesa el pago en Checkout Web o Widget.
6. `POST /api/payments/wompi/events` verifica el checksum con el secreto de eventos y procesa el evento de forma idempotente.
7. Solo si referencia, precio, moneda, ambiente y estado coinciden, la orden queda `paid`.
8. La página privada consulta el estado. Si está pagado, el servidor entrega el informe; si está pendiente, muestra espera; si fue rechazado, permite reintentar con una referencia nueva.

### Datos durables mínimos

Tabla `toefl_report_orders`:

- `id` UUID;
- `submission_id`, con una sola orden pendiente y una sola aprobada como máximo;
- `reference` única;
- `amount_in_cents` y `currency`;
- `payer_email`;
- `status` (`PENDING`, `APPROVED`, `DECLINED`, `VOIDED`, `ERROR`);
- `wompi_transaction_id` único cuando exista;
- `environment` (`sandbox` o `production`); el webhook además comprueba los valores `test` o `prod` enviados por Wompi;
- `created_at`, `updated_at`, `paid_at`.

El acceso al informe necesita además un token aleatorio durable guardado como hash o una sesión autenticada. El recibo HMAC actual de dos horas no alcanza para una revisión humana que puede terminar después.

### Variables de servidor

- `WOMPI_PUBLIC_KEY`
- `WOMPI_INTEGRITY_SECRET`
- `WOMPI_EVENTS_SECRET`
- `WOMPI_ENVIRONMENT=sandbox|production`
- `TOEFL_SPEAKING_REVIEW_SLA_HOURS`
- `TOEFL_REPORT_PAYWALL_ENABLED=true` solo después de completar Sandbox y aprobar la salida
- `TOEFL_REPORT_PRICE_COP`

No se necesita exponer los secretos con prefijo `NEXT_PUBLIC_`. Sandbox y producción deben usar llaves, endpoints y URL de eventos separados.

### Casos que deben pasar antes de dinero real

- pago aprobado desbloquea exactamente una entrega;
- pago rechazado, pendiente, anulado o con error no desbloquea;
- firma de evento inválida no cambia la orden;
- referencia, monto, moneda o ambiente incorrectos no desbloquean;
- evento repetido no duplica efectos;
- alterar el precio en el navegador no funciona;
- visitar manualmente la URL de redirección no funciona;
- un token de una entrega no abre otra;
- las respuestas y los audios siguen privados y las páginas de sesión siguen en `noindex`;
- si el webhook se retrasa, la interfaz permite volver a consultar sin perder la entrega.

## 9. Dos decisiones antes de activar Wompi

1. Precio final del informe en COP. Se configurará en servidor; no se inventará ni quedará escrito en varios archivos.
2. Promesa de revisión de Speaking. Hoy esa parte requiere revisión humana. Recomendación: el pago desbloquea Reading, Listening, Build a Sentence y Writing cuando estén listos; Speaking aparece «en revisión» con una promesa explícita de máximo 24 o 48 horas. Si el negocio promete «informe completo inmediato», primero debe existir corrección automática fiable de Speaking.

## 10. Orden de despliegue

1. Publicar y validar la base SEO.
2. Solicitar reindexación de `/examenes/toefl`, `/practica/toefl`, `/practica/toefl/listening` y `/practica/toefl/speaking`.
3. Configurar Wompi Sandbox y migración de órdenes.
4. Probar todos los estados y el acceso privado en preview.
5. Definir precio y promesa de Speaking.
6. Cambiar a llaves de producción, configurar el webhook de producción y hacer una compra real de bajo valor controlada.
7. Publicar el paywall y medir el embudo completo.
