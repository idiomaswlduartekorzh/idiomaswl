# Selector de cursos y precios — 6 de septiembre de 2026

Estado: EN_VALIDACION. Rama exclusiva `codex/precios-selector-20260906`, base canónica `3a12afb2` (main actualizado por fetch). Worktree: `/Users/ddev/Documents/ChatGPT/IdiomasWL/precios-selector-20260906`.

## Implementado

En `/precios`, candidato con idioma, objetivo, nivel declarado, cinco planes aprobados, revisión de selección, enlace reutilizable y mensaje prellenado para WhatsApp. Ciclos de cuatro semanas, clases de 100 minutos y sesiones de 50 minutos. El usuario puede copiar el resumen para usarlo con su equipo. Cambiar idioma reinicia objetivo y nivel para no conservar datos incompatibles.

Precios COP: Esencial 320.000, Constancia 540.000, Impulso 760.000, Intensivo 960.000, Diario 1.160.000. Inmersión se describe como clases más asignaciones autónomas, desde casa u oficina. No se vende todavía como sexto plan ni se promete acompañante.

## Aislamiento

El candidato requiere `COURSE_PRICING_PREVIEW=true` y `VERCEL_ENV` distinto de `production`. Sin esa configuración se conserva la página anterior. No se han cambiado variables remotas. El candidato lleva noindex. La restricción de producción es deliberada: esta entrega permite revisar la UI, no activar cobros.

No se editaron PreciosClient legado, WompiCheckout, catálogo Wompi, API de pagos, webhook, IA, migraciones, controles de atribución o baseline. Nueva selección comercial independiente del catálogo financiero. Nunca usar una URL o mensaje editable de WhatsApp como autoridad de precio, identidad o pago.

La selección se transmite solo mediante enlace explícito y texto prellenado; no se recopilan nombres, teléfonos ni correos. No crea lead, orden o matrícula. Compartir el enlace restablece la selección con validación de valores; ignora importes suministrados por URL y parámetros ajenos. El usuario revisa y envía el mensaje; la aplicación no realiza envíos automáticos. Los enlaces locales sirven solo donde el servidor local sea accesible.

## Validaciones de esta entrega

- 4 pruebas nuevas: valores URL inválidos/duplicados, combinación idioma/examen, todos los enlaces válidos, importes y unidades, mensaje y destinatario WhatsApp.
- Las 9 pruebas existentes de Wompi también pasan: 13/13 junto con las nuevas.
- TypeScript global sin errores.
- ESLint de archivos nuevos y página: aprobado.
- Baseline y catálogo de Práctica: aprobados, sin rebajar protecciones.
- Navegador: ruta visible, sin errores de consola observados, Francés → DALF → Diario → resumen correcto; regreso al editor conserva selección; cambiar a Coreano reinicia objetivo a general y ofrece TOPIK.
- Enlace con opciones restaura Francés/DALF/Diario. Botón copiar muestra confirmación; el adaptador de clipboard del navegador devolvió vacío, por lo que no se certifica lectura independiente del portapapeles. Existe fallback seleccionable si el navegador rechaza copiar.
- QA visual a 390 y 1440 px; sin desbordamiento horizontal a 390. Mensaje inspeccionado sin abrir ni enviar WhatsApp. Pruebas de atribución productiva y bot fuera de alcance.
- Build completo y despliegue no ejecutados: entrega de desarrollo aislada, no lista para integrar/publicar.

Dependencias copiadas mediante clone-on-write desde instalación local con package-lock idéntico. No enlaces a node_modules de otra tarea, instalaciones globales ni secretos copiados.

## Ejecutar la vista previa

Desde este worktree, con Node en PATH:

```sh
COURSE_PRICING_PREVIEW=true NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED=false VERCEL_ENV=preview node node_modules/next/dist/bin/next dev --webpack --hostname 127.0.0.1 --port 3106
node --test tests/course-pricing.test.mts
node node_modules/typescript/bin/tsc --noEmit --pretty false
```

## Siguiente bloque

Confirmar si «verificación» significa revisar selección, evaluar nivel o verificar teléfono. En esta entrega significa revisar selección; nivel auto declarado. No bloquear la elección por disponibilidad de horarios ni agregar una aprobación obligatoria antes de futuros pagos: se conserva la decisión previa de coordinación pospago.

Después de revisar la UI: registro duradero de selección/orden, versiones de oferta, compatibilidad con pagos anteriores e idempotencia; integración controlada de WhatsApp y eventual verificación de contacto. Si se habilitan pagos: terminar conciliación, recuperación y pruebas Sandbox descritas en el blueprint, con políticas de inicio/cambios y catálogo docente confirmados. La llamada actual a WhatsApp es un puente de revisión, no sustituye ese flujo futuro de inscripción/pago directo.

Antes de integrar: actualizar main en esta rama aislada, checks requeridos y build, actualizar metadatos/imágenes sociales definitivos, revisar catálogo comercial y reemplazar deliberadamente el gate de preview. No habilitar de forma accidental mediante un flag productivo. Sin push/merge/deploy en esta entrega.

## Ajuste visual — 7 de septiembre de 2026

A petición del usuario, se refuerza el contraste: cabecera azul profundo con acento cálido y formas suaves, resumen oscuro con precio destacado, tarjetas con sombras discretas, selección verde más visible y bloque de trabajo autónomo cálido. Solo CSS; sin cambios en precios o comportamiento. Revisado en navegador a 1440 y 390 px, sin errores de consola observados ni desbordamiento horizontal móvil. Se respeta reducción de movimiento. Sigue aislado, sin publicar.
