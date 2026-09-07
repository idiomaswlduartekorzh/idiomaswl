# Revisión del reglamento de clases — 7 septiembre 2026

Revisión documental y contraste normativo; no es un dictamen ni una certificación de un abogado. Se leyó el texto completo contenido en `Reglas David Zhanna 2.pages`, sin modificar el original. La extracción privada se conserva en `handoff-local/continuidad/precios/artefactos/reglamento-original-extraido.txt`, fuera de este repositorio.

David confirmó que José David Duarte Silva, C.C. 1.098.685.591, y Zhanna Korzh, C.E. 480.406, ofrecen las clases como independientes bajo la marca WeLearn. Indicó `david_duarte182@hotmail.com` como canal de solicitudes relacionadas con la inscripción, el pago o el curso. La versión final identifica a ambos como responsables del tratamiento y usa como domicilio contractual Calle 47 # 29-33, Sotomayor, Bucaramanga, Colombia.

## Cambios que requiere el original

| Tema | Hallazgo y propuesta |
| --- | --- |
| Devoluciones | Eliminar la prohibición absoluta. Mantener retracto, garantía y devolución por incumplimiento. |
| Responsabilidad | Sustituir la exención general de responsabilidad por obligaciones concretas de ambas partes. |
| Calendario | Cambiar inicio desde el lunes por primera clase acordada; definir 28 días. Evitar perder clases que el prestador no pudo programar. |
| Cancelaciones | La regla solo por enfermedad, con certificado, límite por nivel y franja nocturna es difícil de aplicar. David rechazó expresamente la propuesta de 24 horas. La regla comercial confirmada es reprogramación únicamente con excusa médica, conservando las excepciones legales obligatorias. No se exige diagnóstico ni historia clínica. |
| Horario después del pago | La vigencia comienza con la aprobación del pago, salvo fecha posterior acordada por escrito. El vencimiento por falta de programación solo opera si los profesores ofrecieron suficientes horarios por un canal verificable. |
| Unidades | Usar clases de 100 minutos y sesiones de 50; eliminar referencias ambiguas a niveles y a compensaciones de dos horas. |
| Salud | No exigir información general de salud en la inscripción. Cualquier soporte excepcional requiere necesidad, minimización y tratamiento adecuado. |
| Menores | Una frase indicativa no verifica edad ni representación. Implementar autorización del representante y definir comprobación antes de habilitar ventas a menores. |
| Cobranza | El flujo nuevo es prepago; no trasladar una cláusula abierta de costos de cobro. |
| Certificados | Aclarar el alcance de la tutoría y de cualquier constancia; no prometer certificación oficial ni resultado de exámenes. |

Los artículos 42 y 43 del Estatuto del Consumidor impiden renunciar a derechos y retener pagos por prestaciones no ejecutadas. Los artículos 46 y 50 exigen información previa, constancia de la operación y mecanismos de reclamación. El artículo 52 trata la autorización de padres en comercio electrónico con menores. [Ley 1480 de 2011, texto del Senado](https://www.secretariasenado.gov.co/senado/basedoc/ley_1480_2011_pr001.html).

El retracto tiene condiciones y excepciones; empezar el servicio exige acuerdo del consumidor. En comercio electrónico, el reembolso por retracto no puede superar 15 días calendario una vez cumplidos los requisitos aplicables. La reforma también exige canales de atención con trazabilidad. [Ley 2439 de 2024, arts. 3–5](https://www1.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=257116).

La información de salud es sensible. El tratamiento ordinario necesita autorización previa e informada, consultable posteriormente, y debe identificar al responsable y sus finalidades. La autorización de inscripción no debe convertirse en consentimiento publicitario. [Ley 1581 de 2012, arts. 5–9 y 12](https://www1.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981).

## Implementación disponible para revisar

- `/reglamento` y tarjetas antes de aceptar: texto versionado, legible y opción del navegador para guardar/imprimir.
- Casillas inicialmente vacías: términos, datos y mayoría de edad/representación. Abrir el texto habilita la casilla de términos; esto prueba una acción de interfaz, **no prueba comprensión ni lectura efectiva**.
- El servidor requiere versiones vigentes y manifestaciones explícitas; conserva texto, hash, cuenta verificada y fecha de la orden en almacenamiento inmutable.
- El cobro de los planes nuevos queda desactivado mediante una bandera operativa hasta aprobar las pruebas externas. El reglamento original no se modifica.

## Antes de activar

Establecer atención y devolución con radicado consultable, comprobar autorización de menores y confirmar el procedimiento fiscal. Se recomienda revisión de un abogado colombiano del texto final, especialmente sobre la responsabilidad de los independientes, las cancelaciones y los datos de menores. No se ha enviado el documento a ningún tercero.

David informó que Wompi ya funciona y está configurado en Vercel. El flujo nuevo reutiliza exactamente las variables y el verificador central de esa integración. Se comprobaron en el panel, sin revelar sus valores, `NEXT_PUBLIC_WOMPI_PUBLIC_KEY`, `WOMPI_PRIVATE_KEY`, `WOMPI_INTEGRITY_SECRET` y `WOMPI_EVENTS_SECRET` tanto para Production como para Preview. Falta aplicar la migración en un entorno de prueba y realizar una compra Sandbox completa que cubra ida, retorno, webhook, cuenta y correos. No se ha cobrado, migrado ni desplegado desde esta tarea.

## Identificación y notificación — draft-6

Se incorporaron los documentos informados por David y el correo `david_duarte182@hotmail.com`. Ese correo es el destinatario predeterminado de cada aviso de pago confirmado, aunque puede reemplazarse mediante `COURSE_OWNER_NOTIFICATION_EMAIL`. El nombre se conservó como **José David Duarte Silva** porque así aparece de forma consistente en el sitio y en las decisiones anteriores; confirmar antes de habilitar si la escritura reciente “Sila” era intencional.

## Corrección solicitada por David — versión draft-2

Se retiró la propuesta de cambios por aviso anticipado y la referencia a llegadas tarde/cancelaciones de profesores. La reserva del horario queda protegida: avisar con anticipación no habilita cambios; la excepción comercial requiere excusa médica. Solo se descuenta una ausencia cuando el servicio estuvo disponible. No se introducen beneficios discrecionales ni compensaciones adicionales a favor del estudiante. Se conservan las obligaciones legales en términos generales, sin presentar incumplimientos del prestador como habituales.

La validez concreta de una restricción a reprogramaciones depende de su aplicación y proporcionalidad; no queda certificada por esta revisión. La salvedad legal no legitima automáticamente cualquier penalidad. Referencia: [SIC sobre contratos de cursos de idiomas](https://sedeelectronica.sic.gov.co/publicaciones/boletin-juridico/concepto/senor-consumidor-usted-puede-acudir-ante-la-superintendencia-de-industria-y-comercio-para-hace-hacer-valer).

## Enfoque comercial confirmado — draft-3

David pidió expresamente una redacción favorable a los prestadores sin contravenir la ley. Se delimitó el paquete (sin disponibilidad ilimitada ni acompañamiento permanente), se concretaron obligaciones de asistencia/preparación del estudiante y se excluyeron devoluciones comerciales voluntarias por cambio de opinión o abandono, sin suprimir retracto ni remedios legales. No se añadieron multas. La regla médica permanece. Las condiciones de reserva y liquidación siguen sujetas al análisis de proporcionalidad y no autorizan retener pagos por servicios no ofrecidos. No se afirma certificación de validez jurídica.

## Vigencia y clases no programadas — draft-4

Se confirmó que todas las clases deben programarse y tomarse dentro de las cuatro semanas. Si los profesores comunicaron por un canal verificable suficientes horarios para completar el plan y el estudiante no programó, rechazó las opciones, no respondió o dejó clases pendientes, esas clases vencen sin reposición, prórroga, cesión ni devolución. La aplicación exige conservar evidencia de las opciones ofrecidas y de que eran suficientes dentro del ciclo. La explicación del retracto se redujo a la información mínima que debe mostrarse antes de una compra a distancia; también se aclaró que confirmar la primera clase autoriza el inicio del servicio.
