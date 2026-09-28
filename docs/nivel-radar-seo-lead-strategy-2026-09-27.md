# Nivel Radar: estrategia SEO y captura de leads

Fecha de análisis: 27 de septiembre de 2026.

## Objetivo

Posicionar `/nivel-radar` para búsquedas transaccionales e informativas como “test de nivel de inglés gratis”, “cuál es mi nivel de inglés” y “test de inglés A1 B1 B2”, y convertir una parte de ese tráfico en contactos útiles sin ocultar el resultado ni exagerar la validez del instrumento.

## Lectura competitiva

| Producto | Promesa principal | Mecánica de conversión | Espacio para WeLearn |
| --- | --- | --- | --- |
| [EF SET](https://www.efset.org/) | Prueba gratuita, escala CEFR, resultado/certificado y opciones de 50 o 90 minutos | Cuenta y certificado compartible | Competir con claridad por habilidad y una ruta de estudio local, no con una promesa de certificación antes de validar el instrumento |
| [British Council EnglishScore](https://www.britishcouncil.org/english/learn-online/englishscore) | Resultado rápido en móvil para gramática, vocabulario, lectura y escucha | Aplicación, certificado de pago y recomendaciones | Ganar en acceso desde navegador, sin instalación, y hacer visible qué mide y qué no mide el resultado |
| [Cambridge Test Your English](https://www.cambridgeenglish.org/in/test-your-english/general-english/) | Prueba corta de ubicación aproximada | Derivación al portafolio Cambridge | Convertir el perfil por habilidad en un siguiente paso concreto dentro de WeLearn |
| [Preply English Placement Test](https://preply.com/en/language-tests/english) | Prueba gratuita y rápida con aproximación CEFR | Resultado conectado a cursos y tutores | Mantener la intención comercial, pero basarla en la brecha detectada y no en una recomendación genérica |

## Posición elegida

**Nivel Radar es un test gratuito en navegador que entrega una estimación orientativa A1–C2 por habilidad y convierte el resultado en una prioridad de estudio.**

No se presenta como certificado oficial. La versión pública solo promete las habilidades que efectivamente muestra. La versión integral mantiene una salida separada y no se activa en producción hasta completar sus controles de banco, audio y calibración.

## Arquitectura SEO implementada

- Título y descripción centrados en la intención “test de nivel de inglés gratis”.
- Canonical estable en `https://www.idiomaswl.com/nivel-radar`.
- Open Graph y Twitter Card con la misma promesa verificable.
- Datos estructurados `WebApplication`, `FAQPage` y `BreadcrumbList`.
- FAQ visible que responde precio, habilidades, duración, registro y alcance del resultado.
- Contenido semántico sobre resultados por habilidad, acceso desde navegador y diferencia entre orientación y certificación.
- Enlaces internos hacia práctica de inglés, IELTS y TOEFL.
- Frecuencia semanal y prioridad 0.95 en el sitemap.

## Embudo y medición

1. La búsqueda llega a la misma URL canónica.
2. La persona completa el diagnóstico y ve el resultado sin entregar datos.
3. Después del resultado aparece una invitación opcional a recibir una ruta.
4. El formulario guarda nombre, WhatsApp, correo opcional, resultado y perfil por habilidad.
5. Se conservan `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, landing y dominio referidor.
6. Se separa el consentimiento de contacto asociado al resultado del consentimiento opcional de marketing.
7. El lead aparece en el panel administrativo con producto, resultado, adquisición, consentimiento y estado.
8. El evento `nivel_radar_lead_captured` queda disponible en `dataLayer` para medición en GTM/GA4.

## Guardas de calidad y seguridad

- Honeypot contra bots y límite durable de ocho solicitudes por hora por huella seudonimizada.
- La huella usa HMAC en el servidor; no se guarda la IP en texto claro.
- Deduplicación por WhatsApp y fuente dentro de 24 horas.
- Escritura directa anónima a `public.leads` revocada; la captura pasa por una función exclusiva del servidor.
- Resultado no condicionado a entregar datos.
- Consentimiento de contacto obligatorio para el formulario; marketing separado y opcional.

## Métricas recomendadas

- Impresiones, clics, CTR y posición de `/nivel-radar` por consulta en Search Console.
- Inicio, avance y finalización del diagnóstico.
- Tasa de captura sobre resultados vistos.
- Captura por fuente/medio/campaña y nivel estimado.
- Contactados, calificados y convertidos por campaña.
- Conversión a práctica, examen internacional o conversación por WhatsApp.

La atribución y el estado ya quedan modelados. La actualización operativa del estado puede añadirse al panel cuando se defina el flujo comercial responsable (persona, SLA y definición de “calificado”).
