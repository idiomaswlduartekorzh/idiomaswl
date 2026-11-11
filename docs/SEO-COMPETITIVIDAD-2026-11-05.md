# Revisión competitiva: inglés, exámenes y francés — 5 de noviembre de 2026

## Alcance y línea de base

Se revisaron `/clases-de-ingles-bucaramanga`, `/clases-de-ingles`, `/preparacion-ielts`, `/preparacion-toefl`, `/preparacion-icfes` y `/clases-de-frances`. Los cambios de inglés del 31 de octubre aún no están representados en el corte de Search Console del 30 de julio al 29 de octubre de 2026.

| Página anterior | Colombia: clics / impresiones | Posición media de página |
| --- | ---: | ---: |
| Inglés Bucaramanga | 1 / 183 | 46,9 |
| Inglés general | 0 / 57 | 26,1 |
| Francés | 1 / 41 | 51,5 |

La posición media de página mezcla consultas distintas: no equivale a la posición de una palabra clave concreta. Search Console permite segmentar por país, no por ciudad. GA4 contó 82 usuarios activos de `google / organic` en Bucaramanga entre el 2 de agosto y el 30 de octubre, cifra de visitantes y no de ranking local.

## Comparación con páginas visibles de la competencia

| Referencia | Elemento competitivo observable | Brecha que se abordó |
| --- | --- | --- |
| [ICE: inglés](https://www.iceworldteam.com/programas/curso-de-ingles) | Precio mensual publicado | Mostrar precios reales de WeLearn desde su catálogo vigente |
| [Colombo: programa sabatino](https://www.colombo.edu.co/adultos/programa-intensivo-sabatino-presencial/) | Horario, duración y precio del ciclo | Explicar frecuencia, 100 minutos por clase y cuatro semanas por ciclo |
| [iFlex: clases online](https://ienglishacademy.com/clases-grupales-en-vivo/) | Horas y precio visibles | Hacer comparable el alcance de cada plan de WeLearn |
| [UPB: francés Bucaramanga](https://www.upb.edu.co/es/programas/centro-lenguas/curso-frances-bucaramanga) | Programa general antes que exámenes | Priorizar francés general en el título y presentación |
| [Javeriana Cali: IELTS](https://www.javerianacali.edu.co/educacion-continua/curso-de-preparacion-de-ielts-international-english-language-testing-system) | Condiciones de preparación concretas | Añadir duración y precio de las clases, conservando la diferencia entre curso y examen oficial |

Esta búsqueda web identifica páginas competidoras y su información visible. No reproduce de forma fiable una SERP geolocalizada físicamente en Bucaramanga ni mide autoridad relativa.

## Correcciones realizadas

- Un bloque compartido lee directamente el catálogo comercial: cinco planes disponibles, tres mostrados en las landings; ciclos de cuatro semanas, clases de 100 minutos y precio desde $320.000 COP. Informa la posible inscripción de $44.200 COP y, para exámenes, el pago único de plataforma de $99.000 COP. Enlaza a la selección exacta en `/precios`.
- Inglés local y online dejan de anunciar paquetes de 4, 10 y 20 horas y retiran el testimonio de Goethe/Alemán de sus resultados de inglés.
- La página local adapta hero, ventajas y testimonios a una columna en móvil y deja de prometer un inicio esta semana sin confirmar cupo.
- Francés general pasa al frente del título y la presentación; también se pone el H1 y los CTA antes de las tarjetas en móvil. Se eliminan contradicciones sobre clases sueltas, registro y diagnóstico con tutor. La explicación sobre Canadá distingue Express Entry federal de programas de Quebec y remite a [IRCC](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html) y al [Gobierno de Quebec](https://www.quebec.ca/en/immigration/permanent/skilled-workers/skilled-worker-selection-program/requirements/knowledge-french).
- IELTS, TOEFL e ICFES enlazan los precios de sus objetivos de examen y explican las condiciones de los ciclos. La práctica automática de ICFES deja de prometer acceso a resultados sin datos de contacto.
- La portada y el hub de práctica enlazan con más claridad el inglés presencial, el online y el francés.
- Se corrigió la etiqueta «GA4 - Conversiones WeLearn» del contenedor `GTM-57NXLPZV`: el ID de medición es `G-YSYKDBDC4J` y el nombre del evento toma `{{Event}}`. Se publicó la versión 5 de GTM el 5 de noviembre y se comprobó un `click_whatsapp` en el informe de tiempo real de GA4 tras pulsar un CTA de producción. El clic de prueba no representa un contacto real.

## Verificación técnica y visual

El build completo, TypeScript, el catálogo protegido de 465 temas, el control de landings locales y el control de snippets SEO pasaron. En el HTML servido, las seis rutas respondieron `200`, tienen un solo H1, título y descripción propios, canonical a sí mismas, `robots: index, follow` y JSON-LD parseable. No hubo desbordamiento horizontal a 375, 768 o 1440 px. Se inspeccionaron los héroes y la oferta en móvil y escritorio.

Los enlaces de cinco rutas al selector de clases se probaron con `COURSE_PRICING_ENABLED=true`, la configuración que sirve `/precios` en producción: conservaron idioma y objetivo, mostraron el ciclo Esencial de $320.000 COP y calcularon $364.200 COP para una primera inscripción general o $463.200 COP con plataforma de examen. La variable local estaba desactivada por defecto y por eso el primer smoke mostró el catálogo anterior de suscripciones; se repitió con el estado de producción y pasó. La vista previa remota se debe verificar con su propia configuración antes de entregar el enlace.

## Dictamen del panel de revisión

Tres agentes independientes revisaron SEO competitivo, contenido y conversión/técnica. Tras atender sus objeciones, el dictamen editorial es que las páginas tienen una oferta e intención de búsqueda **aptas para competir** con las referencias examinadas. El panel no afirma que superen su autoridad, sus reseñas o sus posiciones actuales. Tampoco puede garantizar la primera página: eso exige observar las consultas específicas y los contactos tras la publicación.

Pendientes de observación externa: comprobar el Perfil de Empresa de Google y reseñas locales; medir contactos reales provenientes de búsqueda orgánica; cotejar por ítem la procedencia de bancos históricos ICFES. No se muestran horarios fijos porque la disponibilidad del tutor es variable; el sitio indica que el horario definitivo se coordina después del pago.

## Medición posterior a la publicación

En Search Console comparar, para cada URL, consultas comerciales e impresiones, clics y CTR filtrados por Colombia, con una revisión separada de consultas que incluyen “Bucaramanga”. En GA4 revisar contactos de `google / organic` y la dimensión Ciudad. Evaluar a las cuatro y ocho semanas sin atribuir a estos cambios datos anteriores al despliegue.
