# SEO y mensajes de WhatsApp — intervención del 24 de octubre de 2026

## Qué muestran los datos

Search Console de `idiomaswl.com`, búsqueda web, últimos 28 días comparados con los 28 anteriores: **925 frente a 706 clics orgánicos**, 58.867 frente a 45.605 impresiones y posición media 9 frente a 11,3. Es una mejora del dominio en conjunto, no una explicación de la semana con pocos mensajes. Los datos de Search Console tienen retraso; una semana de consultas no se puede inferir a partir de dos ventanas de 28 días.

La página `/clases-de-ingles-bucaramanga` tuvo **1 clic frente a 2**, con 214 impresiones en ambas ventanas, CTR 0,5 % frente a 0,9 % y posición media 29,7 frente a 26,5. Aparece para búsquedas de cursos presenciales en Bucaramanga (19 y 17 impresiones en las dos consultas principales), sin clics visibles para ellas. El título, H1 y descripción ya responden a esa intención desde la PR #32; cambiar esos elementos otra vez antes de medir una ventana completa añadiría riesgo sin una hipótesis nueva. Se refuerza su enlace contextual desde una guía de inglés que sí recibe tráfico.

La página `/clases-de-frances` tuvo **3 clics frente a 1**, con 85 frente a 75 impresiones y posición media 11,6 frente a 10,1. No está en una caída demostrada: tiene alcance orgánico pequeño. Las consultas visibles incluyen clases de francés y francés online, pero Search Console oculta algunas consultas por privacidad. Se ajusta el H1 para expresar esa oferta. La práctica gratuita de francés A1 tuvo 15 clics orgánicos frente a 9; ya enlaza a clases desde la navegación compartida, por lo que se evita duplicar otro bloque comercial.

En el registro propio de los últimos 28 días, los clics hacia WhatsApp fueron: alemán 10, italiano 9, inglés general 8, coreano 6, inglés Bucaramanga 4, portugués 3, francés 2, japonés 2 y ruso 2. Son aperturas del enlace, **no mensajes enviados**. De 113 intenciones registradas desde septiembre, el panel sigue con 0 confirmaciones manuales y 0 mensajes de API. La revisión anterior de la lista principal de WhatsApp encontró al menos 14 conversaciones con código `WL-` y procedencia Google entre el 10 de septiembre y el 15 de octubre, más una referencia de Goethe revisada después; no se consultaron archivados. Ese dato es un mínimo observado y el referido Google puede incluir anuncios.

## Cambios de bajo riesgo

1. La guía TOPIK I conserva URL, canonical, título, H1 y estructura; añade, junto al plan de ocho semanas, enlaces a la práctica automática gratuita y a clases pagas con tutor. El artículo ICFES conserva los mismos elementos y añade al final un enlace relevante a inglés presencial en Sotomayor.
2. Francés, que tiene poco alcance, expresa en el H1 la oferta presencial y online y enlaza la práctica A1 gratuita desde el primer bloque. La práctica ya ofrece una salida hacia clases. No se replica la plantilla de las páginas ganadoras.
3. El panel de contactos indica cómo verificar un mensaje recibido en la lista principal y confirmarlo con su código. La ubicación de algunos botones llega al evento `click_whatsapp` de `dataLayer`; no se altera el enlace ni la referencia `WL-`.

## Cómo medir el resultado

Cada semana, en hora de Colombia, registrar por separado: mensajes **recibidos** en la lista principal de WhatsApp, cuántos incluyen `WL-`, cuántos son consultas relevantes y cuántos terminan en venta. Confirmar en el panel solo referencias presentes en mensajes efectivamente recibidos; contar los mensajes sin código aparte. En Search Console comparar, por URL y consultas, clics, impresiones, CTR y posición a los 14 y 28 días. Revisar primero el 7 de noviembre y luego el 21 de noviembre de 2026. Comparar periodos equivalentes y evitar atribuir un cambio semanal a SEO sin evidencia por página y canal.

Si una página ganadora pierde consultas o clics de modo sostenido tras esta edición, revisar esa URL y su mezcla de búsquedas antes de revertir el enlace concreto. Los resultados de posicionamiento y consultas reales aún no pueden conocerse el día de publicación.
