# Plan operativo de comunicación entre ramas y protección de producción

Estado: activo. La línea base, la plantilla de PR y las puertas de CI se implementaron en
`codex/branch-recovery-plan-20260825`; su vigencia en producción empieza al integrarse en `main`.

Fecha de corte: 25 de agosto de 2026.

Fuente canónica al redactarlo: `origin/main` en `a036f93c5f151e0e49d90823f0e9dded815e0e6b`.

## Superhub de español para extranjeros — 25 de octubre de 2026

`codex/spanish-colombia-hub-20261025` se actualizó sobre `origin/main@296f8c2d` en un
worktree aislado. Estado: `EN_VALIDACION`; integración y despliegue pendientes.
Añade una entrada editorial en inglés, otra en español, una página comercial de
clases presenciales en Bucaramanga y online, y tres guías de intención distinta,
con canonicals, `hreflang` recíproco para las dos portadas editoriales, sitemap y enlaces desde
el catálogo de idiomas y el menú móvil. El mapa de búsquedas y sus límites están en
[`espanol-extranjeros-superhub-2026-10-25.md`](espanol-extranjeros-superhub-2026-10-25.md).

El propietario confirmó clases de español online y presenciales en Bucaramanga el
25 de octubre de 2026. La rama incluye una página comercial y una tarjeta de español
en el catálogo; no anuncia precios, horarios, visados ni sedes fuera de Bucaramanga.
La ampliación pasó catálogo protegido (465 temas), TypeScript, ESLint focalizado,
navegación, SEO y build completo de 2.958 páginas. Smoke local: seis rutas de español,
catálogo y sitemap responden `200`; títulos, descripciones y canonicals se comprobaron
en el HTML renderizado. Se revisó la landing comercial en escritorio y móvil sin
desbordamiento horizontal. Falta integrar y verificar producción.

## Perfil y notificaciones del estudiante — 25 de octubre de 2026

`codex/student-profile-settings-20261025` partió de `origin/main` en `f5d514db`.
El estudiante puede editar nombre, teléfono, ciudad, foto, correo de acceso sujeto a
confirmación, contraseña y preferencias de correo desde `/dashboard/student/perfil`.
Los recordatorios son optativos (diarios o semanales, alrededor de las 8:00 a. m. de
Colombia); las correcciones de tareas y revisiones IELTS, TOEFL, Goethe y Xpress
respetan la preferencia correspondiente. La foto aparece también en el panel.

Las migraciones `20261026005430`, `20261026005856` y `20261026010235` se aplicaron
al proyecto Supabase productivo. Se verificaron RLS, permisos de columnas,
políticas de Storage, bucket y el trigger que sincroniza el correo confirmado.
Catálogo protegido, TypeScript, ESLint, pruebas existentes del panel y build Webpack
pasaron. Código integrado en `main` mediante `46a441e3`. Vercel publicó ese SHA
desde `main` en el despliegue de producción `dpl_Eqi16ZquW4UtEwTFYDgQm2jD4KAR`
con estado `READY` y dominio `www.idiomaswl.com`. El smoke confirmó que la ruta
interna de recordatorios responde `401` sin el secreto de cron y que
`/dashboard/student/perfil` redirige a `/login` sin sesión. El guardado y la
entrega de correo con una cuenta real quedan sin prueba manual para evitar
alterar los datos o la bandeja de un estudiante.

## Recuperación de contraseña — 25 de octubre de 2026

`codex/password-recovery-20261025` partió de `origin/main` en `a7d96133` y se integró
en `main` mediante `1a8564eb`. El enlace de la página de acceso abre ahora
`/recuperar-contrasena`; Supabase envía un enlace al correo y el callback conduce a
`/restablecer-contrasena` para elegir una contraseña nueva. Los enlaces vencidos
regresan al formulario. El formulario no revela si existe una cuenta.

Validación previa: catálogo protegido íntegro (465 temas), TypeScript y build Next.js
de 2.951 páginas, incluidas las dos rutas nuevas. Despliegue de producción
`dpl_33d2Q6swqHEsLsRnuhujf1tcyGeU`: `READY`, fuente GitHub `main`, SHA `1a8564eb`.
`/login`, `/recuperar-contrasena` y `/restablecer-contrasena` respondieron `200` en
`www.idiomaswl.com`; el enlace de login apunta al nuevo formulario. Supabase registró
un envío de correo de recuperación a la cuenta reportada. La recepción en la bandeja
de la alumna y la apertura del enlace requieren confirmación de ella.

Registro vivo asociado: [`RECUPERACION-PRODUCCION-2026-08-25.md`](RECUPERACION-PRODUCCION-2026-08-25.md).

## Conexión entre idiomas, práctica y exámenes — 24 de octubre de 2026

`codex/language-practice-links-20261024` parte de `origin/main` en `5661967a`.
Estado: `EN_VALIDACION`; integración y despliegue pendientes. Las ocho páginas de idiomas
incluyen un acceso secundario a sus ejercicios por nivel. Inglés, coreano, francés, alemán,
italiano y portugués enlazan además sus catálogos de exámenes existentes. Los hubs de
práctica muestran las rutas hacia clases y exámenes, y los hubs de exámenes enlazan de
regreso a la práctica del idioma. Ruso y japonés solo apuntan a su práctica porque no
tienen catálogo de exámenes publicado. No cambian URL, títulos, H1 ni canonicals.
Validaciones locales: catálogo protegido, navegación, TypeScript, build Webpack de 2.764
páginas y respuesta HTTP 200 de páginas representativas. Se revisó la presentación de
inglés, práctica de inglés e IELTS en navegador local.

## Consultas desde SEO y conciliación de WhatsApp — 24 de octubre de 2026

`codex/seo-message-funnel-20261024` parte de `origin/main` en `68f28b6e`.
Estado al abrir [PR #39](https://github.com/idiomaswlduartekorzh/idiomaswl/pull/39):
`EN_VALIDACION`; integración y despliegue de producción pendientes. Se añadieron
enlaces contextuales a la práctica TOPIK gratuita y a la oferta con tutor desde
dos guías que ya reciben visitas, sin cambiar sus URL, títulos, H1 ni canonicals.
La landing de francés, de alcance reducido, aclara la oferta presencial y online
en el H1. El panel privado explica cómo confirmar solo mensajes efectivamente
recibidos; los clics de WhatsApp continúan separados de los mensajes. No hay
migración ni variables nuevas. Pasaron línea base, catálogo, TypeScript, ESLint
sin errores y build Webpack de 2.764 páginas. El diagnóstico y el protocolo de
seguimiento están en [`SEO-MENSAJES-2026-10-24.md`](SEO-MENSAJES-2026-10-24.md).

## Remodelación gramatical A1–B1 e imágenes educativas — 24 de octubre de 2026

### Gramática inglesa completa B2–C2 — 25 de octubre de 2026

`codex/english-b2-c2-complete-curriculum` sustituye el piloto de doce lecciones por un
currículo operativo integral de 90 temas: 30 B2, 30 C1 y 30 C2. Estado: `DESPLEGADO`
desde `main` mediante la implementación `c947fae7` y la promoción `981afa2b`. La
cobertura recorre tiempo y aspecto, modalidad, voz y reporte, arquitectura de cláusulas
y sintagmas nominales, énfasis y estructura informativa, cohesión, referencia, registro
y control editorial. Cada tema conserva URL única, metadatos, datos estructurados,
enlaces internos y entrada de sitemap sin modificar las rutas A1–B1 existentes.

Las 90 páginas y sus interfaces son monolingües en inglés. Cada lección incluye cuatro
bloques explicativos, mapa visual con propósito pedagógico y seis etapas de práctica
progresiva con al menos 30 decisiones. Cada tema ofrece tres PDF separados con el estilo
editorial aprobado: guía completa, ejercicios y `answer key`; son 270 documentos en
total, de 8 a 20 páginas, revisados por texto extraíble, tamaño y render representativo.
Por decisión del propietario, el alcance no publica ni anuncia audios y el JSON-LD omite
`AudioObject`.

El guardián `check:english-advanced-grammar` exige 30 temas por nivel, slugs y órdenes
únicos, contenido en inglés, seis etapas y tres PDF mayores de 50 KB por tema. Pasaron
además TypeScript, catálogo protegido de 465 temas, protección SEO de 17 índices y 17
plantillas, 467 snippets y build Next.js completo de 2.949 páginas. Se renderizaron y
revisaron muestras B2, C1 y C2, incluidas guía, ejercicios y soluciones; no se observaron
recortes, superposiciones ni preguntas duplicadas. GitHub Actions y Vercel finalizaron
en éxito; el smoke público confirmó las 90/90 lecciones con HTTP 200, tres PDF por
página y 30 enlaces únicos en cada índice B2, C1 y C2.

### Corrección del banco visual por propósito — 24 de octubre de 2026

`codex/grammar-visual-purpose` parte de `origin/main` en `5661967a`. Estado:
`LISTO_PARA_INTEGRAR`; integración y despliegue pendientes. La revisión visual confirmó
que el primer banco cambiaba el texto, pero repetía la misma composición de título,
regla y tres ejemplos en todos los temas. La corrección sustituye esa plantilla única
por siete familias pedagógicas: mapa de escritura, comparación, tabla de referencia,
transformaciones, línea temporal, constructor de oraciones y mapa de uso.

Hiragana y katakana muestran sus 46 formas básicas; hangeúl separa vocales,
consonantes y formación de bloques; el cirílico organiza letras familiares, trampas y
nuevas; ser/estar compara las conjugaciones en paralelo; los irregulares muestran
cambios reales, y `〜ようになる` representa antes, proceso y resultado. El resto se
clasifica usando el modo visual, título, categoría, objetivo, fórmula y consigna gráfica
ya revisados en cada lección. No se generan escenas decorativas ni texto mediante IA en
tiempo de ejecución.

Se conserva la ruta visual anterior para compatibilidad y se publica la versión
pedagógica bajo `/recursos-visuales/gramatica/v2/`; páginas, `ImageObject`, Open Graph,
Twitter Card y sitemap apuntan a la versión nueva para romper la caché inmutable del
banco anterior sin perder URLs existentes. Validaciones locales: TypeScript, catálogo
protegido de 465 temas, protección SEO, build Next.js de 2.764 páginas y render HTTP 200
`image/png` de las 482 URLs visuales del sitemap, sin fallos.

`codex/korean-grammar-pages-20261013` conserva las URLs, canonicals, títulos y contenido
rastreable de gramática y completa la fachada nueva de japonés A2–B1. Estado:
`DESPLEGADO` mediante el PR #37 y el commit de `main`
`9bd3304c2c44d54b974cd70c80003f8eca3a0533`; sin migraciones ni variables nuevas. Los
audios que no existían siguen explícitamente pendientes y no se anuncian como publicados.

Cada entrada del registro de gramática incorpora una infografía educativa original de
1200 × 630 construida con la fórmula y los ejemplos revisados del tema. La imagen aparece
en la lección con texto alternativo y pie contextual, se declara como `ImageObject`,
Open Graph y Twitter Card, y entra en el sitemap de imágenes. El sitemap de producción
local generó 482 URLs visuales únicas, todas bajo una ruta rastreable fuera de `/api/`.
También se sustituyó el barajado aleatorio durante render por uno determinista para evitar
fallos de hidratación en los ejercicios sin fijar la respuesta correcta en la primera
posición.

Validaciones: TypeScript y ESLint focalizado sin errores; catálogo protegido de 465 temas;
protección SEO de 17 índices y 17 plantillas; 467 snippets; build Webpack completo de 2.764
páginas; checks de GitHub y despliegue Vercel
`HLj95gyySxnzZr4VnCNdUFkgigDm` completados. El smoke público confirmó HTTP 200 en la
lección japonesa B1, PNG 1200 × 630 y `image/png` en muestras de los ocho idiomas, HTML
con `ImageObject`, `og:image` y `twitter:image`, caché inmutable y sitemap con 482 recursos
visuales únicos.

## Auditoría WhatsApp y corrección de oferta SEO — 23 de octubre de 2026

### Retiro de promesas de modalidad individual y oferta gratis — 23 de octubre de 2026

`codex/copy-offer-audit` parte de `origin/main` en `8148b4ed`.
Estado: `VALIDADO_PENDIENTE_DE_PR`. El propietario pidió retirar transversalmente la promesa
«1:1 / uno a uno», mantener a WeLearn fuera de la categoría de academia y
eliminar «diagnóstico gratis» como posible promesa de sesión humana. Se ajustan
landings, metadatos, JSON-LD, imágenes OG, precios, preparación ICFES, el panel
de estudiante y los artículos que describen la oferta. Las pruebas de nivel
automáticas siguen siendo gratuitas y se nombran como tales; clases y
diagnósticos con tutor son pagos. Las comparaciones sobre academias ajenas y
la cita textual atribuida se conservan. Permanecen las URL, títulos y
canonicals de las diez páginas de clases. El reporte privado del propietario
contrasta 15 conversaciones codificadas de WhatsApp, alcance del panel y
clics orgánicos de Search Console, sin equiparar clics con mensajes enviados.
Pasaron TypeScript, landings locales, fragmentos SEO y el build Webpack de
2.764 rutas. La ejecución del prebuild completo se detuvo en la máquina local
por un enlace faltante del paquete `jiti`; los checks específicos de esta
corrección y la compilación de la aplicación sí completaron.

### Identidad de marca en páginas de idiomas — 23 de octubre de 2026

`codex/tutores-no-academia` parte de `main` en `819d4ba`.
Estado: `DESPLEGADO` mediante PR #34, SHA de `main`
`38f7a61893b5580872dacd1e901058be8e45f2a3` y Vercel
`dpl_H7A8xXjARTEEZJyX96aDcLHUBSX9` (`READY`). El propietario aclaró que WeLearn es un
servicio de clases particulares con tutores, no una academia. Esta rama
reemplaza la autodescripción incorrecta en las páginas de idiomas, Inicio,
Quiénes somos, Kids, textos de IA, OG y JSON-LD. Conserva los títulos y
canonicals de las nueve páginas específicas de idiomas; cambia el título del
hub y de Quiénes somos para que describan el servicio real. El esquema local
mantiene `LocalBusiness` y la ficha NAP, sin `LanguageSchool` ni el alias
«Academia». Las comparaciones con academias ajenas y citas textuales
atribuidas se conservan. La regla de marca quedó en `AGENTS.md` y `CLAUDE.md`.
Pasaron TypeScript, catálogo, línea base, navegación, SEO foundation, landings
locales, snippets y build Webpack de 2.764 rutas, además de cuatro checks de
GitHub. En producción respondieron HTTP 200 con canonical Inicio, el hub, las
nueve páginas específicas, Quiénes somos, Kids y dos artículos. En Chrome se
verificó la redacción del hub; el JSON-LD de Inicio, inglés, coreano y Quiénes
somos conservó `LocalBusiness` y dejó de declarar `LanguageSchool`.

### Hiperoptimización SEO y consultas — 23 de octubre de 2026

`codex/seo-hyperopt-20261023` parte del `main` desplegado en `817aca8b`.
Estado: `DESPLEGADO` mediante PR #33, SHA de `main`
`819d4bafb0b55eb9c034343db41a4ff4ef5456b0` y Vercel
`dpl_9h7vtXtirikNvdatnyCaRLBAGP5s` (`READY`). El plan y las fuentes del diagnóstico están en el
informe privado del propietario, fuera del repositorio. Dos revisores
independientes de SEO técnico y conversión aprobaron el alcance tras exigir
conservar URL, títulos, H1 y canonical de páginas ganadoras, así como retirar
afirmaciones no acreditadas.

La comparación lunes–viernes 19–23 frente a 12–16 octubre muestra 10 frente a
15 clics de contacto, y 5 frente a 5 con referido Google; el viernes 23 sigue
en curso. Son clics hacia WhatsApp, no mensajes enviados. Search Console
registra 926 frente a 708 clics orgánicos en periodos sucesivos de 28 días.
La hipótesis de caída general del posicionamiento no está demostrada; se
trabaja la conversión y la medición por ubicación de CTA. La redacción aclara
que la orientación inicial por chat es gratuita, las sesiones con tutor son
pagas y las herramientas automáticas son gratuitas y orientativas. No hay
migración, cambio de precios ni cambio de canonical.
Pasaron TypeScript, catálogo, línea base, navegación, SEO foundation, landings
locales, snippets, revisión de señales SEO de nueve landings y build Webpack
completo de 2.764 rutas. Dos revisores independientes dieron visto bueno al
diff final. Las diez páginas de clases y el artículo de italiano A1–B2
respondieron HTTP 200 con canonical en producción; el hub se verificó en Chrome.

### Fase previa: auditoría y corrección de oferta

`codex/seo-contact-audit-20261023` parte de `origin/main` en `d7c48068`.
Estado: `DESPLEGADO` mediante PR #31, SHA de `main`
`bf2a86a91d83146f61de2eb02cef5d7d6515552a` y Vercel
`dpl_5hkh8d98isJKFjk3f4KXm1EiTSpi` (`READY`). Se comprobaron HTTP 200,
encabezados y metadatos en cinco páginas públicas.
La revisión de la lista principal de WhatsApp (sin abrir Archivados), el panel de
contactos y el alcance por página, y Search Console no respaldan una caída general
del tráfico orgánico: los clics de búsqueda subieron de 708 a 926 en dos ventanas
consecutivas de 28 días. El panel guarda clics a WhatsApp, pero aún no recibe
mensajes entrantes ni confirmaciones manuales, por lo que no cuantifica la caída
percibida de conversaciones. Se localizaron 14 referencias de Google en la lista
principal; son un mínimo observado, no un censo exhaustivo.

El propietario confirmó que las clases y los diagnósticos con tutor son pagos; las
pruebas automáticas de la web siguen gratis. Esta rama corrige las promesas de
sesiones gratuitas en páginas, blog, enlaces de WhatsApp y datos estructurados, y
ajusta las páginas de inglés online, inglés en Bucaramanga, coreano, italiano y
japonés según el rendimiento observado. Sin migración ni cambio de precios.
Validaciones: `check:practica-catalog`, TypeScript, navegación, SEO foundation,
landings locales, snippets y build Webpack completo de 2.764 rutas. El informe
privado con referencias de chats se conserva fuera del repositorio para no publicar
identificadores de conversaciones.

## Seguimiento de intención inglesa y conciliación de contactos — 23 de octubre de 2026

`codex/seo-english-intent-20261023` parte del `main` anterior en `bf2a86a9`.
Estado: `DESPLEGADO` mediante PR #32, SHA de `main`
`817aca8b831508a507bb986a532f31d0ee559a6b` y Vercel
`dpl_5ryVggVPKMjBm5Lfnh7D1yJt4XC7` (`READY`). Pasaron TypeScript,
catálogo, línea base, snippets SEO y build Webpack completo de 2.764 rutas.
Search Console muestra que `/clases-de-ingles` recibe impresiones de búsquedas
locales aunque su intención principal es online nacional. Se retira «Bucaramanga»
del título y las palabras clave de esa página, se aclara el enlace desde la
página local y se corrige una afirmación contradictoria sobre sedes de TOEFL.
La búsqueda de WhatsApp confirmó 3 referencias de Google entre el 25 de
septiembre y el 8 de octubre y 5 entre el 9 y el 22 de octubre; son mínimos
observados. El panel no recibe mensajes de la IA nativa de WhatsApp Business.

## Guía autónoma IELTS Set 1 — 20 de octubre de 2026

`codex/ielts-guided-review-20261020` parte de `origin/main`. Estado:
`LISTO_PARA_INTEGRAR`, sin despliegue. Alcance: recorrido guiado de Listening y
Reading con corrección pregunta por pregunta y evidencia exacta; referencias
originales de Writing y Speaking para bandas aproximadas 5.5 y 9; y acceso al
modo guiado desde el simulacro IELTS Set 1.

Los audios provisionales de Speaking fueron retirados. Los dos guiones finales,
el manifiesto, el estado de publicación y el generador reproducible quedaron
preparados para `ResembleAI/chatterbox`; la interfaz no crea reproductores ni
solicita archivos inexistentes mientras el lote siga pendiente. El paso final
requiere una muestra de voz inglesa autorizada y revisión auditiva humana. Ver
[`ielts-guided-speaking-audio.md`](ielts-guided-speaking-audio.md).

Validaciones: prueba focalizada 3/3, `check:practica-catalog`, TypeScript, chequeo
del manifiesto Chatterbox, QA funcional y visual local sin errores de consola, y
build Next.js completo de 2.743 páginas. No requiere migración, variables ni
servicios externos para la guía; Chatterbox solo se usa en el lote final de audio.

## Cierre de acceso a claves y corrección — 12 de octubre de 2026

`codex/exam-server-gating` partió del `main` en `1812fb710336d6dbbe8535ba6de0666d8d82e84c`
y se integró en `main` como `26006f5eb4db3756972d6e9284ea90fd27550afb`.
Estado: `DESPLEGADO` en Vercel `dpl_54VGW5r8cpSLp4W3V8KgwvuxwyqN` (`READY`,
producción desde `main`, mismo SHA); `www.idiomaswl.com` apuntó a ese deployment.
Los simulacros públicos entregan primero preguntas sin claves;
el servidor devuelve la revisión completa solo con un comprobante firmado tras guardar
el lead. Las API de puntuación de prácticas IELTS/TOEFL y las entregas completas exigen
acceso concedido tras ese registro. Las prácticas puntuadas independientes capturan el
contacto antes de empezar y se distinguen de entregas terminadas en el panel.
No requiere migración ni nueva variable. Auditoría y límites en
[`exam-lead-gate-audit-2026-10-12.md`](exam-lead-gate-audit-2026-10-12.md).
Validaciones: `check:practica-catalog`, TypeScript, build Webpack de 2.599 páginas,
pruebas de claves y firmas, seis API de puntuación y tres API de entrega con HTTP
403 sin registro. Smoke público: HTTP 200 en Home, Cambridge B2 Set 3 y práctica
TOEFL; HTTP 307 en admin anónimo. Playwright confirmó el formulario previo en
producción. No se creó un contacto ficticio.

## Captura obligatoria de leads en simulacros — 12 de octubre de 2026

`codex/exam-lead-result-gates` se integró en `main` en
`89c47486aaa3e0d7c94ef8dce53cefb4b10f7f49`. Estado: `DESPLEGADO` en
Vercel `dpl_A8FhPgWVrveBLKwUqGSdPh4WqJQB` (`READY`, producción desde
`main`, mismo SHA). `www.idiomaswl.com` apuntó a ese deployment.

Se auditó el despacho de los diez catálogos de simulacros completos. TOPIK ya
no admite la marca local `wl_lead_captured` como prueba de contacto; todos los
formularios obligatorios comprueban el ID persistido del lead antes de abrir
la nota. El motor TOEFL antiguo sin barrera quedó fuera de la ruta pública y
el TOEFL 2026 calcula las secciones después de confirmar la entrega. IELTS
rechaza sets sin contrato de entrega. El admin incluye la fuente nueva
`exam-results` y conserva las históricas.

Validaciones: 23 pruebas dirigidas, `check:practica-catalog`, TypeScript y
build Webpack local de 2.599 páginas. Vercel compiló y generó las mismas
2.599 páginas. Smoke público: HTTP 200 en Home, TOPIK set 1 y Cambridge B2
set 3; HTTP 307 en admin sin sesión; HTTP 405 en GET de la API ICFES.
Playwright completó las 30 preguntas de TOPIK en producción con la marca local
forzada: el formulario apareció y el resultado no estaba en el DOM. No se
envió un contacto ficticio. El alcance y los límites de las prácticas por
destreza y de claves presentes en el cliente están en
[`exam-lead-gate-audit-2026-10-12.md`](exam-lead-gate-audit-2026-10-12.md).

## Acceso lateral al hub de claves — 12 de octubre de 2026

`codex/exam-answer-hub` actualizó el centro operativo para mostrar **Claves de
exámenes** en el menú lateral y retiró el enlace horizontal y la tarjeta
promocional. Las respuestas y el sistema de corrección no cambiaron. Estado:
`DESPLEGADO` desde `main` en `3ed22e9ed2c60518d8274ede79d63a020465ad5d`,
deployment de Vercel `dpl_74GiJczMJnQX1GHb75QVH3pa7QGj` (`READY`). Pasaron
`check:practica-catalog`, TypeScript y el build Webpack de 2.599 páginas. La
auditoría de claves conservó 165 sets, 10 exámenes, 7.172 claves y cero alertas
estructurales. El alias `www.idiomaswl.com` apuntó a ese deployment y la ruta
`/dashboard/admin/claves` redirigió a `/login` sin sesión (HTTP 307).

## Inicio de métricas y operación de exámenes — 12 de octubre de 2026

`codex/admin-metrics-exam-ops` partió de `origin/main` en `da69405e`. Estado:
`DESPLEGADO` en `39e3bdf2f5ffe25eedc91ee817433de2785222fb`, deployment
`dpl_EFFryhfB8vEqo3QYL4WLWJoGRWgE` (`READY`) desde `main`. El inicio
administrativo muestra visitantes diarios, llegadas e
inactividad aproximadas, páginas con más y menos alcance, y distingue visitas a
simulacros, entregas y leads. La nueva tabla de alcance diario registra únicamente
identificadores anónimos hash y páginas públicas; la migración aditiva
`20261012172320_site_daily_page_reach.sql` está aplicada en Supabase producción.
Las URLs de resultados con identificadores privados se agrupan por ruta base
antes de guardar la visita; las páginas de revisión con token no se registran.
El historial de páginas comienza al publicar el tracker: los días anteriores se
marcan sin dato. Se verificó RLS habilitado, sin lectura de `anon` ni
`authenticated`, con inserción de `service_role`.

Corrección de exámenes, revisiones Xpress, claves, códigos, pagos y contactos se
acceden desde el menú lateral. La API ICFES ahora exige y guarda el contacto
consentido antes de devolver el marcador básico. El módulo de pagos muestra la
causa concreta si las credenciales deshabilitan el botón y errores específicos
de autorización o validación de Wompi; queda pendiente confirmar con el
administrador el síntoma exacto y el origen deseado de los links. Validaciones:
17/17 pruebas ICFES, catálogo protegido, TypeScript y build Webpack de 2.599
páginas. Vercel compiló las mismas 2.599 páginas y pasó TypeScript. El alias
`www.idiomaswl.com` quedó en este deployment. Smoke público: HTTP 200 en `/` y
`/examenes/cambridge-b2/practica/set-3`; HTTP 307 a `/login` para el centro
operativo, claves y pagos sin sesión; HTTP 405 en GET de la API de calificación.
La tabla de alcance recibió dos navegadores reales después de publicar.
El refuerzo de privacidad de rutas se integró en `main` como
`b724261e19f956b46752a6aea83370b5d006b5c9` y Vercel lo publicó en
`dpl_HfAXv9k7LdQ2xzLvs3awbNE3pCkQ` (`READY`). El alias `www.idiomaswl.com`
apuntó a este segundo deployment. Pasaron 27/27 pruebas focalizadas,
`check:practica-catalog`, TypeScript y el build local de 2.599 páginas; el
build de Vercel generó las mismas 2.599. El smoke público repitió los HTTP 200,
307 y 405 anteriores sobre el nuevo alias. Antes del cambio no había rutas
privadas de resultados en la tabla nueva.

## Tracker financiero y links de pago administrativos — 30 de septiembre de 2026

`codex/admin-payment-tracker-20260930` parte de `origin/main` en `2361475c`.
Estado: `DESPLEGADO`. Responsable: Codex. Alcance: nueva ruta privada
`/dashboard/admin/pagos`, ledger normalizado de planes, clases, Xpress, ICFES y
links personalizados, indicadores de recaudo bruto, filtros y CSV; creación de
links Wompi de monto fijo, un solo uso y vencimiento; y conciliación por webhook
mediante consulta autenticada a Wompi. No se almacenan datos de tarjeta ni se
estiman comisiones, retenciones o desembolsos.

Las migraciones aditivas `20261001043031_admin_payment_links_and_ledger.sql` y
`20261001044506_admin_payment_links_hardening.sql` están aplicadas en Supabase
producción. La comprobación remota confirmó RLS, tres políticas de denegación,
cero privilegios de navegador, acceso exclusivo de `service_role`, cero hallazgos
de seguridad del asesor y tres registros históricos visibles en el ledger; todavía
no existen tickets personalizados. Validaciones: 36/36 pruebas del módulo y sus
regresiones Wompi/comercio/admin, TypeScript, ESLint focalizado, navegación,
catálogo protegido y build Next.js de 2.596 páginas. El baseline de archivos
multimedia no pudo ejecutarse en el clon liviano porque `public/audio` no se
descargó; el catálogo de 465 temas sí pasó. Decisión de integración: `MERGE`.
La implementación y este registro entraron en `main` como `a63374f`. GitHub
Actions aprobó `baseline-and-types` y `production-build`; Vercel publicó ese SHA
en el deployment `Dyyji1ZPkZkd7jZt5KW4pHe4UZrk`, estado `success`, con artefacto
`idiomaswl-ecut7lo1y-idiomaswlduartekorzhs-projects.vercel.app`. El smoke público
confirmó `200` en `www.idiomaswl.com`, redirección anónima de
`/dashboard/admin/pagos` a `/login` y `405` para intentos GET contra el webhook.

## Ecosistema de vocabulario y phrasal verbs — 28 de septiembre de 2026

`codex/phrasal-verbs-main-integration` parte de `origin/main` en `f4019feb`.
Estado: `INTEGRADO`. Responsable: Codex. Alcance: nueva entrada
`Herramientas → Vocabulario`, selector de ocho idiomas, colección de inglés y el
banco existente de phrasal verbs en rutas limpias bajo
`/herramientas/vocabulario/ingles/phrasal-verbs`. No se amplió el corpus durante
esta integración: se conservaron 334 expresiones únicas, 672 usos, 40 rutas de
aprendizaje, 1.344 ejemplos, 42 guías PDF y 42 páginas SEO con imágenes WeLearn.
El sitemap registra las 42 páginas y sus imágenes para descubrimiento web y en
Google Images. No requiere migraciones, variables ni servicios externos.

Validaciones previas: guardián específico del ecosistema, navegación, base SEO,
catálogo de práctica, vocabulario, baseline productivo, TypeScript y build Webpack
de 2.587 páginas; smoke HTTP de HTML, PDF, imagen y sitemap; recorrido funcional
desktop y móvil a 390 × 844; quiz con retroalimentación y avance; trazabilidad
entre contextos; cero errores o advertencias de consola. Decisión de integración:
`MERGE`. La implementación se integró inicialmente en `main` como `d4ab165e`.
El deployment definitivo de Vercel y el smoke público se registrarán al terminar
la publicación.

## Hojas PDF Goethe y TOEFL — 19 de septiembre de 2026

`codex/goethe-toefl-worksheets-20260919` partió de `origin/main` en `d729dbc3`.
Estado: `DESPLEGADO`. Alcance: hojas PDF de estudiante Goethe A1 y TOEFL iBT 2026,
botones de descarga en sus prácticas y guardián `check:exam-worksheets`. No requiere
variables ni migraciones. El [PR #15](https://github.com/idiomaswlduartekorzh/idiomaswl/pull/15)
pasó baseline, catálogo, TypeScript y build completo en GitHub Actions; se integró por
squash a `main` como `d5c01dc6670308da89262e7b64b3aaf5f9f3f71a`.
Vercel publicó ese commit desde `main` con deployment
[`dpl_C1k3HiYByqxzRgTrEz7NtEzADGpM`](https://vercel.com/idiomaswlduartekorzhs-projects/idiomaswl/C1k3HiYByqxzRgTrEz7NtEzADGpM)
en estado `Ready` y asignó `www.idiomaswl.com` e `idiomaswl.vercel.app`.
El smoke productivo pasó en 25 rutas y 17 audios protegidos. En el navegador público
se descargaron y comprobaron Goethe Hören Teil 1 (5 páginas), TOEFL completo
(36 páginas) y TOEFL Listening independiente (16 páginas). Vercel mostró 0 % de
errores en el resumen del proyecto tras el despliegue. El preview del PR fue omitido
por la configuración de build; la validación previa se hizo en CI y navegador local.

## Parche activo de seguridad — 19 de septiembre de 2026

`codex/private-cycle-audio-20260919` parte de `origin/main` en `9cc951a8`.
Estado: `EN_VALIDACION`. Alcance: bucket `cycle-audio`, rutas de audio del ciclo
coreano y panel administrativo. Dependencia externa: migración de Supabase
`20260920032155_private_cycle_audio.sql`, que solo se aplica después de
desplegar y verificar las nuevas rutas. Validaciones: catálogo, TypeScript,
pruebas de privacidad de audio y build Webpack aprobados. No requiere nuevas
variables. Orden, pruebas de permisos y reversión:
[`SEGURIDAD-AUDIO-CICLO-2026-09-19.md`](SEGURIDAD-AUDIO-CICLO-2026-09-19.md).

## Expansión Goethe A1 a diez sets — 24 de septiembre de 2026

`codex/goethe-a1-sets-8-10` parte de `origin/main` en `57fcb34b`.
Estado: `DESPLEGADO`. Responsable: Codex. Alcance: sets originales A1 8–10,
catálogo de examen y práctica por destreza, imágenes, scoring, guiones y fábrica de
audio. Compartidos: `package.json`, registros centrales de mocks y este documento.
No requiere migraciones ni variables nuevas. Dependencia externa: créditos de
ElevenLabs para producir Hören; hasta entonces los tres sets publican Lesen,
Schreiben y Sprechen y bloquean automáticamente Hören y el simulacro completo.
Validaciones del 24 de septiembre: banco Goethe y originalidad 3–10, scoring,
práctica por Teil, PDFs estudiantiles, catálogo protegido, TypeScript, prebuild
global y build Webpack de 2.563 páginas; smoke local 200 en hub, biblioteca,
Lesen del set 8 y Sprechen del set 10, con redirecciones protegidas para Hören y
los simulacros sin audio. Decisión de integración: `MERGE` desde la base vigente.
La rama quedó respaldada en GitHub y se integró por fast-forward en `main` como
`05ae3e5e`. Vercel publicó ese commit desde `main` en el deployment
[`Bi5txHMcTQSfgjFZhnxQ3Wc6k14p`](https://vercel.com/idiomaswlduartekorzhs-projects/idiomaswl/Bi5txHMcTQSfgjFZhnxQ3Wc6k14p),
estado `success` a las 22:13:54 UTC. El smoke público devolvió HTTP 200 en el hub,
la portada y las bibliotecas Goethe, Lesen Set 8, Schreiben Set 9 y Sprechen Set 10;
la imagen de tarjetas del Set 10 respondió `image/png`. El catálogo mostró Set 10
y `Audio pendiente`, Hören no enlazó los sets 8–10 y las rutas directas sin audio
emitieron los meta-redireccionamientos protegidos esperados.
Detalle editorial, prompts de imagen, hashes de audio y procedimiento:
[`GOETHE-A1-SETS-8-10.md`](GOETHE-A1-SETS-8-10.md).

## Práctica Goethe A2 y catálogo A1–B2 — 24 de septiembre de 2026

`codex/goethe-a2-production` partió de `origin/main` en `092fefda` e integra la
fábrica editorial A2 aprobada. Estado: `DESPLEGADO`. Responsable: Codex.
Alcance: navegación de práctica Goethe A1, A2, B1 y B2; bibliotecas A2 por set y
Teil para Lesen, Schreiben y Sprechen; y diez simulacros A2 visibles pero
bloqueados en Exámenes. Hören A2 y cualquier acceso al examen completo permanecen
cerrados hasta producir y aprobar sus audios. La práctica por destreza es gratuita;
el flujo de resultados, acceso y pagos de los exámenes completos no se modifica.
No requiere migraciones ni variables nuevas. La publicación está protegida por un
registro separado de release de práctica, de modo que habilitar una destreza nunca
habilita accidentalmente un mock completo. Validaciones: 21/21 pruebas de
estructura, scoring, originalidad y sesgos; guardianes Goethe y catálogo; TypeScript;
ESLint focalizado; build Webpack de 2.584 páginas; y recorrido visual local del hub,
bibliotecas, tiempos por Teil, redirección heredada de A1 y niveles bloqueados.
La implementación se integró en `main` como `b794f4f9`; los ajustes finales de copy
y límite SEO quedaron en `841761d1`. Vercel publicó este último commit en
[`dpl_FXafrB1G88nkZZBsz7T9LkUHUfqd`](https://vercel.com/idiomaswlduartekorzhs-projects/idiomaswl/FXafrB1G88nkZZBsz7T9LkUHUfqd),
estado `success`. El smoke público confirmó el hub A1–B2, diez sets de Lesen,
Schreiben y Sprechen A2, editor de escritura, grabador oral, resultado gratuito sin
muro de pago, redirección heredada de A1 y cierre efectivo de Hören y de las rutas de
examen completo. Los diez simulacros A2 aparecen bloqueados en el catálogo de
Exámenes con audio pendiente.

Actualización editorial del 24 de septiembre: `codex/goethe-a2-editorial-ui`
rediseña exclusivamente la práctica A2 como hojas de candidato WeLearn, sin usar
logos ni páginas oficiales. Lesen distingue visualmente artículo, directorio,
correo y anuncios; las preguntas recuperan numeración y casillas A/B/C; Schreiben
y Sprechen comparten la misma jerarquía de Teil y papel editorial. Estado:
`DESPLEGADO`. Vercel publicó desde `main` el mismo commit que contiene este registro
y el smoke público se ejecutó sobre
`/examenes/goethe/practica/a2-2?mode=practice&skill=reading` y `skill=writing`.
Validaciones: 21/21 harness A2, guardianes Goethe y catálogo, TypeScript, build
Webpack de 2.584 páginas y recorridos visuales desktop y móvil sin desbordamiento.
No cambian respuestas, scoring, pagos ni los bloqueos de Hören y examen completo.

Actualización responsive del 25 de septiembre: `codex/goethe-a2-official-layout`
mantiene Schreiben sin cambios y corrige la respiración visual de Lesen en móvil.
El directorio de Teil 2 apila rótulo y descripción sin colisiones; Teil 4 separa
los enunciados 16–20 y elimina los ordinales duplicados del contenido. Sprechen
recupera el control de aleatoriedad de A1 en sus tres Teile y evita repetir la
selección consecutiva. Estado: `DESPLEGADO`. La implementación quedó en
`569db5be` y el árbol publicado en `main` en `08c848db`. Vercel publicó este SHA
como `Ready` y `Current` en
[`dpl_4mo2ZS3rmeU2VU1j7jqS1fKH91LZ`](https://vercel.com/idiomaswlduartekorzhs-projects/idiomaswl/4mo2ZS3rmeU2VU1j7jqS1fKH91LZ),
asignado a `www.idiomaswl.com`. Validaciones: 21/21 harness A2, guardianes
Goethe y catálogo, TypeScript, build Webpack de 2.584 páginas, prueba responsive
local a 390 × 844 sin desbordamiento y smoke público de Lesen y Sprechen. En el
smoke, Lesen mostró numeración limpia 16–20 y Sprechen ofreció tres controles de
azar con cambio verificado de tarjeta. Hören y el examen completo siguen
bloqueados; pagos, scoring y rutas protegidas no cambian.

Actualización web nativa del 27 de septiembre: `codex/goethe-a2-web-native`
mantiene el cuadernillo A2 aprobado como referencia opcional (`layout=sheet`),
pero presenta por defecto Lesen, Schreiben y Sprechen dentro de la experiencia
web de IdiomasWL. El contenido, la estructura Goethe, las respuestas y el scoring
no cambian. Lesen usa paneles de lectura y preguntas coordinados; Schreiben usa un
espacio de consigna y respuesta; Sprechen conserva los tres controles aleatorios
de A1. Estado: `DESPLEGADO`. La implementación entró en `main` en `cbdeebe3`.
Validaciones: harness A2 y guardianes de catálogo, TypeScript, build Webpack de
2.584 páginas, y recorridos funcionales desktop y móvil. Hören y el examen
completo siguen bloqueados; pagos y rutas protegidas permanecen sin cambios.

## Mock maestro Goethe B1 — 27 de septiembre de 2026

`codex/goethe-b1-master-20260927` partió de `origin/main` en `ce6eee65`.
Estado: `DESPLEGADO`. Responsable: Codex. Alcance: primer mock maestro B1 original,
navegación por módulos, presentación web IdiomasWL y cuadernos PDF. En Exámenes,
el mock completo aparece bloqueado y sin enlace porque Hören todavía no dispone de
guiones ni pistas aprobadas. En Práctica B1 están publicados Lesen, Schreiben y
Sprechen; Hören muestra únicamente su arquitectura de cuatro partes y 30 tareas,
sin reproductores ni acceso ejecutable. No cambian pagos ni se añaden variables,
migraciones o servicios externos.

La implementación y la corrección de visibilidad entraron en `main` mediante los
commits `37a05d97` y `1271c72a`. Vercel publicó el segundo desde `main` en el
deployment
[`5JnedE7ZJ83LTzGhf5cXYZsapH9a`](https://vercel.com/idiomaswlduartekorzhs-projects/idiomaswl/5JnedE7ZJ83LTzGhf5cXYZsapH9a),
estado `success`. Pasaron 6/6 pruebas B1, catálogo protegido de 465 temas, contrato
PDF de 60 sets, TypeScript, build Webpack local y los jobs de GitHub
`baseline-and-types` y `production-build`. El smoke público confirmó la tarjeta B1
bloqueada y sin enlace en Exámenes; los enlaces de Lesen, Schreiben y Sprechen en
Práctica; un botón PDF en cada destreza; tres áreas de respuesta en Schreiben;
cuatro partes de Hören sin controles; cero errores de consola y cero desbordamiento
horizontal a 390 × 844.

## Presencia en tiempo real del sitio — 24 de septiembre de 2026

`codex/live-presence-admin-20260924` parte de `origin/main` en `bfebab2d`.
Estado: `DESPLEGADO_PRODUCCION`. Responsable: Codex. Alcance: medición anónima de sesiones
activas, detección estimada de bots, API administrativa y tarjeta en
`/dashboard/admin`. Compartidos reservados: `src/app/layout.tsx`, `src/proxy.ts`,
migraciones de Supabase y este documento. Requiere una migración nueva, sin
variables adicionales. La medición no conserva IP, correo ni user-agent; solo un
identificador irreversible, el tipo estimado, la ruta actual y marcas de tiempo.
La migración `20260924233546_live_site_presence.sql` se aplicó en Supabase
producción. Verificación: seis columnas esperadas, RLS activo, `anon` y
`authenticated` sin privilegios, `service_role` con acceso explícito, tres
índices y cero filas iniciales. Los asesores de seguridad y rendimiento no
reportaron errores ni advertencias para `site_presence`. Validación local:
5/5 pruebas de presencia, TypeScript, ESLint focalizado, catálogo de prácticas,
build completo de Next.js y smoke visual/HTTP. Integrado en `main` por el commit
`2e608ac0`; el deployment productivo final también contiene el commit posterior
`38f46db8`. Vercel `3LKF2yaNEyLhfwuQDof8zknsmRPm` quedó `Ready`, `Latest` y
`Current` para `www.idiomaswl.com`. Smoke final: página pública `200`, heartbeat
humano `204`, visita bot `200`, API administrativa anónima `403` y panel anónimo
redirigido a `/login`. Supabase confirmó filas recientes tanto `person/heartbeat`
como `bot/request`.

## 1. Resultado que debe producir este plan

El sistema de trabajo debe garantizar simultáneamente que:

1. todo trabajo sabe si está en borrador, listo, integrado o desplegado;
2. ninguna rama antigua puede borrar silenciosamente contenido que ya vive en `main`;
3. producción siempre corresponde a un commit identificable de `origin/main`;
4. el trabajo local, incluidos los archivos sin commit y los worktrees de `/tmp`, tiene respaldo recuperable;
5. cada subsistema tiene guardianes que detectan desapariciones antes del merge y pruebas de humo después del despliegue;
6. una rama no se declara terminada hasta registrar commit de `main`, despliegue y verificación de producción.

`main` remoto es la fuente de verdad de producción. Una rama, un worktree, un documento o una captura de pantalla nunca sustituyen esa evidencia.

## 2. Problemas que corrige

El estado auditado mostró cinco fallos de proceso:

- ramas activas creadas cientos de commits antes de `origin/main`;
- trabajos terminados que solo existen en ramas o en archivos sin commit;
- ramas cuyo nombre ya no describe los parches únicos que conservan;
- documentos que dicen «no desplegado» aunque el trabajo sí está en `main`;
- CI que hoy comprueba catálogo y TypeScript, pero no ejecuta el build completo ni verifica producción después del despliegue.

Por eso no se debe responder «¿está publicado?» mirando el nombre de una rama. La única respuesta válida se construye con alcance Git, SHA de `main`, metadatos de Vercel y una prueba de ruta.

## 3. Protocolo de comunicación entre ramas

### 3.1 Estados obligatorios

Todo trabajo debe tener exactamente uno de estos estados en el registro central:

| Estado | Significado | Puede mezclarse en `main` |
|---|---|---|
| `BORRADOR` | Contenido incompleto o exploratorio. | No |
| `EN_CURSO` | Implementación activa con alcance definido. | No |
| `EN_VALIDACION` | Código completo; faltan guardianes, revisión editorial o prueba visual. | No |
| `LISTO_PARA_INTEGRAR` | Actualizado desde `origin/main` y todas las puertas están en verde. | Sí, mediante PR o integración controlada |
| `INTEGRADO` | El commit es alcanzable desde `origin/main`; aún no se ha probado producción. | Ya está en `main` |
| `DESPLEGADO` | Vercel sirve el commit esperado y las pruebas de humo pasaron. | Estado final publicable |
| `BLOQUEADO` | Falta una decisión, migración, secreto, activo o permiso externo. | No |
| `SUSTITUIDO` | Otro trabajo en `main` reemplaza esta propuesta. | No |
| `ARCHIVADO` | Conservado únicamente para recuperación o auditoría. | No |

La palabra «hecho» queda reservada para `DESPLEGADO`. Un commit de una rama limpia puede estar listo, pero no está hecho en producción.

### 3.2 Registro central

Cada rama activa debe tener una fila en el registro con estos campos:

- identificador del trabajo;
- rama y SHA actual;
- SHA de `origin/main` usado como base;
- estado;
- responsable o agente activo;
- subsistemas y rutas afectadas;
- archivos compartidos que puede modificar;
- dependencias con otras ramas;
- migraciones, variables o activos externos;
- validaciones ejecutadas y fecha;
- decisión de integración: `MERGE`, `CHERRY_PICK`, `REIMPLEMENTAR` o `ARCHIVAR`;
- SHA final en `main`;
- ID/URL del despliegue de producción;
- resultado de las pruebas de humo.

El registro se actualiza al iniciar trabajo, al entregar una rama, al integrar y al verificar producción. Una fila sin actualización durante 72 horas se marca para reconciliación.

### 3.3 Inicio de una rama

Secuencia obligatoria:

```bash
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c <tipo>/<alcance>-<fecha>
git push -u origin HEAD
```

Si `main` está ocupado por otro worktree, la rama se crea directamente desde `origin/main` en un worktree nuevo. Nunca se parte de una rama de trabajo antigua para ahorrar tiempo.

Al crearla se registra:

```text
Base: <sha de origin/main>
Alcance: <rutas y subsistemas>
Compartidos: <archivos que pueden chocar>
Estado: EN_CURSO
Dependencias: <ramas o ninguna>
```

### 3.4 Reserva de archivos compartidos

Antes de tocar cualquiera de estas áreas, la rama debe declararlo en el registro:

- `package.json`, `package-lock.json` y `vercel.json`;
- `src/app/sitemap.ts`, `src/app/layout.tsx` y navegación global;
- `src/styles/practica-ui.css` y motores compartidos de Práctica;
- registros centrales de Habla, Lectura, Escucha, quizzes y simulacros;
- acciones de pagos, autenticación, Supabase y migraciones;
- scripts incluidos en `prebuild`;
- documentos de estado de producción.

Dos ramas pueden avanzar en paralelo, pero no pueden integrar cambios incompatibles sobre un archivo compartido sin una reconciliación explícita sobre el `main` más reciente.

### 3.5 Entrega entre agentes o sesiones

Toda entrega debe incluir este bloque:

```text
Rama/SHA:
Base origin/main:
Estado:
Objetivo logrado:
Pendiente real:
Rutas afectadas:
Archivos compartidos:
Validaciones:
Migraciones/variables:
Riesgos conocidos:
Siguiente acción exacta:
```

No se entrega una tarea diciendo solamente «está en la rama». La persona que recibe debe poder decidir si rebasar, validar, integrar, sustituir o archivar sin reconstruir la historia.

### 3.6 Comunicación entre ramas

- Las ramas no se usan como buses de integración permanente.
- `origin/main` es el único punto de convergencia.
- Un `cherry-pick` entre ramas se registra con SHA de origen y razón.
- Una rama no puede incorporar otra rama antigua completa si solo necesita uno o dos parches.
- Si una rama está más de 20 commits detrás de `origin/main`, entra en `RECONCILIACION_OBLIGATORIA`.
- Si está más de 100 commits detrás, no se mezcla: se extraen parches y se reimplementan sobre una rama nueva.
- Los worktrees bajo `/tmp` deben tener rama remota desde el primer bloque funcional; el directorio temporal no es respaldo.

## 4. Plan de configuración

### 4.1 GitHub y protección de `main`

Configuración objetivo del repositorio canónico:

| Ajuste | Objetivo |
|---|---|
| Rama de producción | `main` únicamente |
| Force-push | Deshabilitado |
| Eliminación de `main` | Deshabilitada |
| PR antes de integrar | Obligatorio salvo recuperación urgente documentada |
| Rama actualizada | Exigir que el HEAD del PR incluya `origin/main` reciente |
| Historial | Lineal o fast-forward verificable |
| Conversaciones | Resueltas antes del merge |
| Checks requeridos | Baseline, catálogo, TypeScript, build y smoke de preview |
| Administración | Las reglas también aplican a administradores |

La plantilla de PR debe pedir base SHA, rutas afectadas, eliminaciones, guardianes, migraciones, capturas relevantes y plan de rollback.

### 4.2 CI obligatoria

Implementado el 25 de agosto de 2026 en `.github/workflows/content-integrity.yml`,
`config/production-baseline.json` y `scripts/check-production-baseline.mjs`.

El workflow actual de integridad cubre `check:practica-catalog` y TypeScript. Debe dividirse en cuatro puertas requeridas:

1. **Baseline de producción**
   - comprueba rutas, componentes, datos y cantidades mínimas declaradas en un manifiesto versionado;
   - falla ante la eliminación de cualquier activo protegido;
   - comprueba que no bajaron umbrales ni se retiraron scripts del `prebuild`.

2. **Integridad rápida**
   - `npm ci`;
   - `npm run check:practica-catalog`;
   - `npx tsc --noEmit --pretty false`;
   - guardianes específicos según las rutas modificadas.

3. **Build completo**
   - `npm run build`, que ejecuta todo el `prebuild`;
   - conserva el resumen de rutas y el resultado de los guardianes como artefacto del PR.

4. **Preview y humo**
   - prueba las rutas tocadas;
   - prueba una muestra fija de rutas protegidas no relacionadas con el cambio;
   - comprueba código HTTP, canonical, contenido marcador y ausencia de errores críticos.

No se permite «arreglar» CI bajando mínimos, quitando checks de `prebuild` o excluyendo el subsistema que falla. Una excepción exige decisión explícita en el registro.

### 4.3 Manifiesto de baseline

Implementado en `config/production-baseline.json`. La comparación contra la rama base impide
retirar rutas, archivos, marcadores, checks o mínimos protegidos dentro de un PR.

Debe existir un manifiesto legible por máquina con, al menos:

- las 24 rutas y 480 audios de Escucha;
- las colecciones publicadas de Habla y sus rutas;
- los 465 o más temas de gramática;
- Lectura, Escritura, Vocabulario, Historias y PDFs;
- IELTS, TOEFL, ICFES, SAT y Nivel Radar;
- Home, resultados, navegación, landings, blog, precios y pagos;
- sitemap, canonicals, metadatos y rutas locales;
- migraciones de Supabase requeridas por funcionalidades visibles.

Cada adición a producción actualiza el manifiesto en el mismo PR. Un despliegue nuevo no puede reducirlo salvo una retirada aprobada y documentada.

### 4.4 Vercel

Configuración y comprobaciones objetivo:

- proyecto conectado únicamente a `idiomaswlduartekorzh/idiomaswl`;
- rama de producción: `main`;
- ningún despliegue directo desde un árbol local sin commit;
- previews para ramas de integración; ramas de generación pesada pueden deshabilitar previews de forma explícita;
- el despliegue de producción debe registrar `gitSource.ref=main` y el SHA esperado;
- los dominios `idiomaswl.com`, `www.idiomaswl.com` e `idiomaswl.vercel.app` deben apuntar al mismo despliegue aprobado;
- después de cada despliegue se ejecutan pruebas de humo y se registra el deployment ID;
- si falla una ruta protegida, se revierte el commit o se hace rollback del artefacto; nunca se corrige con force-push.

### 4.5 Supabase y configuración externa

Un trabajo con migración, RLS, webhook, secreto o variable no puede pasar de `EN_VALIDACION` a `LISTO_PARA_INTEGRAR` hasta registrar:

- migración exacta y orden de aplicación;
- entorno donde se verificó;
- compatibilidad hacia atrás;
- rollback o corrección hacia delante;
- variables requeridas sin exponer valores;
- prueba de permisos y webhook cuando corresponda.

El código visible no se despliega antes de que la dependencia externa esté preparada o sea tolerante a su ausencia.

## 5. Plan de restablecimiento

### Fase 0 — Congelar y respaldar

Durante la ventana de recuperación no se integran nuevas funcionalidades en `main`.

1. Actualizar referencias remotas.
2. Crear ramas `archive/recovery-<fecha>-<origen>` para commits locales únicos.
3. Respaldar por separado el diff binario y los archivos sin seguimiento del árbol sucio.
4. Empujar a `origin` todas las ramas activas que viven en `/tmp`.
5. Registrar SHA, estado y worktree de cada trabajo.
6. No hacer `reset`, `clean`, `stash drop` ni borrar worktrees hasta cerrar la recuperación.

Los archivos de salida, capturas y auditorías se separan del código de producto. Un respaldo puede contenerlos; una rama de publicación no.

### Fase 1 — Confirmar la línea base

1. Verificar que Vercel sirve el SHA actual de `origin/main`.
2. Ejecutar guardianes y build sobre un worktree limpio de ese SHA.
3. Probar las rutas protegidas y registrar el resultado.
4. Corregir documentos de estado obsoletos.
5. Crear el manifiesto de baseline desde lo que realmente está en producción.

### Fase 2 — Integrar protección antes que contenido

Orden recomendado:

1. plan, registro y plantilla de PR;
2. guardrails SEO y de landings, reconciliados con el `package.json` actual;
3. baseline de producción y CI completa;
4. smoke tests posteriores al despliegue;
5. protección de rama y configuración Vercel.

Así, los trabajos recuperados después quedan protegidos inmediatamente.

### Fase 3 — Recuperar trabajos limpios y actuales

Cada unidad se integra por separado desde una rama nueva basada en `origin/main`:

1. confirmar intención de publicación;
2. rebase o recreación sobre el SHA actual;
3. revisión de diferencias contra producción;
4. guardianes específicos, TypeScript y build;
5. preview y prueba visual;
6. integración en `main`;
7. despliegue y smoke;
8. actualización a `DESPLEGADO`.

Las primeras candidatas se enumeran en el registro: Ideas avanzadas, protecciones SEO y, cuando complete su colección y auditoría, Habla Alemán A2.

### Fase 4 — Extraer parches de ramas antiguas

No se mezclan ramas con cientos de commits de atraso. Para cada parche:

1. identificar los commits `+` de `git cherry origin/main <rama>`;
2. comprobar si la funcionalidad ya existe de otra forma en `main`;
3. clasificar como `SUSTITUIDO`, `CHERRY_PICK` o `REIMPLEMENTAR`;
4. aplicar solo el cambio mínimo en una rama de recuperación nueva;
5. validar contra el baseline actual.

Esto aplica a rendimiento del home, canonicals SEO, puentes comerciales, mejoras históricas de gramática, SAT adaptativo y el piloto de registro/pagos.

### Fase 5 — Separar el árbol local mezclado

El árbol principal auditado contiene tres clases de cambios y no debe convertirse en un solo commit:

1. archivos idénticos a `origin/main`, que se descartan del rescate;
2. correcciones pequeñas posiblemente válidas, que se reimplementan una por una;
3. versiones antiguas que eliminarían Wompi, multilingüismo o el sistema PDF actual, que no se integran.

Cada corrección válida recibe su propia rama, prueba y fila del registro. El respaldo original se conserva hasta verificar producción.

### Fase 6 — Archivar y cerrar

Una rama solo se archiva cuando:

- su trabajo está `DESPLEGADO`, `SUSTITUIDO` o rechazado explícitamente;
- el registro contiene la decisión y evidencia;
- no tiene commits o archivos sin respaldo;
- el documento del subsistema refleja el estado final.

Las ramas `archive/` no se borran. Las ramas de trabajo pueden eliminarse del remoto después de crear la referencia de archivo necesaria.

## 6. Puertas de aceptación por integración

Puertas comunes:

```bash
git fetch origin
git rebase origin/main
npm run check:practica-catalog
npx tsc --noEmit --pretty false
npm run build
```

Además:

- Habla: `npm run check:habla-acompanada` y el `check:habla-release:<objetivo>` correspondiente;
- SAT: catálogo, fábrica, examen, superhub y adaptativo;
- TOEFL/IELTS/ICFES: guardianes y pruebas específicas, más migraciones si existen;
- SEO/landings: auditoría de snippets, canonicals, rutas locales y sitemap;
- pagos: configuración, checkout, webhook, persistencia, RLS y entorno;
- UI: preview responsive, teclado, contraste, reducción de movimiento y errores de consola.

Si el `prebuild` o el build generan archivos, el árbol debe quedar limpio o el PR debe incluir los derivados esperados.

## 7. Prueba posterior al despliegue

Dentro de los diez minutos posteriores a Vercel `READY`:

1. confirmar deployment ID, `gitSource.ref` y SHA;
2. probar las rutas nuevas;
3. probar Home, Práctica, Precios, Blog y autenticación básica;
4. probar una ruta por subsistema protegido;
5. revisar respuestas 4xx/5xx y errores de runtime;
6. registrar resultado en el inventario.

Si falla algo protegido:

1. detener nuevas integraciones;
2. marcar el trabajo `BLOQUEADO_PRODUCCION`;
3. ejecutar rollback/revert;
4. comprobar que el baseline anterior volvió;
5. corregir desde una rama nueva sin reescribir `main`.

## 8. Responsabilidades

| Responsabilidad | Quién la asume |
|---|---|
| Decisión de producto: publicar, aplazar o retirar | José David |
| Exactitud pedagógica/editorial | Responsable académico del subsistema |
| Registro de rama y entrega | Agente que crea o modifica la rama |
| Reconciliación con `origin/main` | Autor de la integración |
| Validaciones y evidencia | Autor de la integración |
| Configuración GitHub/Vercel/Supabase | Responsable técnico con acceso |
| Smoke de producción y cierre del registro | Responsable del despliegue |

Ningún agente puede declarar una tarea `DESPLEGADA` solo porque el build terminó o porque hizo push.

## 9. Orden de ejecución recomendado

1. Respaldar la rama principal antigua y su árbol sucio.
2. Publicar este plan y el registro en una rama basada en `origin/main`.
3. Corregir estados documentales obsoletos.
4. Integrar guardrails y baseline.
5. Configurar checks requeridos y protección de `main`.
6. Recuperar candidatos actuales, uno por uno.
7. Auditar parches únicos de ramas antiguas.
8. Separar y rescatar cambios locales válidos.
9. Archivar lo sustituido.
10. Ejecutar una auditoría final producción ↔ `origin/main` ↔ registro.

## 10. Definición de terminado

La recuperación termina cuando:

- no existen ramas activas sin fila de registro;
- no existen worktrees temporales sin respaldo remoto;
- todo trabajo revisado está `DESPLEGADO`, `BLOQUEADO`, `SUSTITUIDO` o `ARCHIVADO`;
- producción sirve exactamente un SHA de `origin/main`;
- CI impide reducir el baseline;
- el smoke posterior al despliegue está automatizado;
- los documentos de subsistema coinciden con Git y producción;
- un despliegue nuevo puede añadir trabajo, pero no hacer desaparecer trabajo aprobado sin una retirada explícita.

## 11. Entrega activa — gramática francesa B2–C2

- Rama: `codex/french-b2-c2-complete-curriculum`.
- Alcance: 90 lecciones, 30 por nivel B2, C1 y C2, con interfaz y contenido en
  francés, explicación pedagógica, mapa visual específico, seis etapas de
  práctica y al menos 30 decisiones de aprendizaje por tema.
- Recursos: 270 PDF editoriales (cours complet, cahier d’exercices y corrigé),
  entre 8 y 20 páginas, con texto extraíble. Los audios quedan expresamente
  aplazados y no se anuncian todavía.
- SEO/GEO: canonicals estables, metadatos franceses, `LearningResource`,
  `ImageObject`, `HowTo`, breadcrumbs, sitemap derivado del registro e
  interlinking de A1 a C2.
- Puertas locales superadas: guardián francés 90/270, controles de catálogo y
  SEO, regresión inglesa, TypeScript y build Next.js de 3.048 páginas.
- Estado: `LISTO_PARA_INTEGRAR`; pasa a `DESPLEGADO` únicamente después de
  integrar en `main`, obtener Vercel `READY` y ejecutar el smoke de producción.
