# Reporte SEO + AI SEO - Idiomas WeLearn

Fecha: 2026-07-09  
Sitio: https://www.idiomaswl.com  
Estado: diagnostico inicial, sin cambios de produccion

## 1. Resumen ejecutivo

Idiomas WeLearn ya no esta en fase de "Google no nos conoce". El sitio esta indexado, tiene sitemap enviado, contenidos publicados, landings comerciales, blog amplio, datos estructurados, capturas de leads y una primera traccion real en Search Console. El reto principal ahora es pasar de presencia a dominio: convertir impresiones dispersas en clics, concentrar autoridad en paginas-motor y limpiar senales tecnicas que pueden diluir el rastreo y la indexacion.

Lectura de Search Console en las capturas:

- Ultimos 3 meses: 107 clics, 9.27 mil impresiones, CTR medio 1.2%, posicion media 18.7.
- Indexacion: 158 paginas indexadas, 58 sin indexar.
- Sitemap: `/sitemap.xml` enviado el 22 jun 2026, ultima lectura 8 jul 2026, estado correcto, 388 paginas descubiertas.
- Cobertura exportada: a finales de junio se mantiene estable en 158 indexadas y 58 sin indexar.
- Problemas de cobertura exportados: 28 noindex, 10 canonicas alternativas, 7 no encontradas 404, 1 duplicada sin canonica seleccionada, 12 rastreadas actualmente sin indexar.
- Breadcrumbs: 0 invalidas; validas recientes entre 13 y 15.
- Enlaces internos mas fuertes en Search Console: `/precios` 151, `/examenes` 140, `/blog` 105, `/` 58, `/clases-de-coreano` 32, `/clases-de-ingles` 28.

Conclusion directiva: hay base suficiente para empezar a optimizar con intencion comercial, no solo publicar mas. La prioridad debe ser decidir que paginas merecen ser motores de leads, corregir senales contradictorias y convertir consultas con impresiones sin clics en respuestas/paginas mas fuertes.

## 2. Fuentes revisadas

- Zips enviados: cobertura e informes de breadcrumbs de Search Console.
- Capturas enviadas: rendimiento, indexacion, sitemap, enlaces y oportunidades de keywords.
- Codigo local: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/layout.tsx`, landings comerciales, blog, paginas de practica y metadata.
- Sitio publicado: `robots.txt`, headers, sitemap publicado y rutas clave.
- Referencias externas:
  - [Google Ads - Que buscan los usuarios online](https://business.google.com/es/resources/articles/what-are-people-searching/)
  - [Google Search Central - AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
  - [OpenAI - Overview of OpenAI crawlers](https://developers.openai.com/api/docs/bots)

Limitaciones: no tenemos aun export completo de consultas/paginas de Search Console en CSV, datos de conversiones GA4/GTM, Core Web Vitals por URL, ni perfil completo de Google Business Profile. Este reporte usa lo disponible en capturas, zips, sitio y codigo.

## 3. Diagnostico del panel

### Gerencia / estrategia

El sitio tiene demasiadas piezas buenas para tratarlas como una sola masa. Hay cuatro negocios SEO distintos dentro de idiomaswl.com:

1. Landings comerciales: clases de ingles, coreano, frances, aleman, italiano, portugues, ICFES, precios.
2. Examenes y simulacros: IELTS, TOEFL, ICFES, TOPIK, Goethe, Cambridge B2, CILS/CELI, DELF/DALF, Celpe-Bras.
3. Blog educativo: 124 articulos, con fuerte peso en IELTS y coreano.
4. Practica interactiva: muchas URLs por idioma, nivel, habilidad y tema gramatical.

El plan no debe ser "posicionar todo". Debe ser:

- Proteger indexacion y autoridad de paginas comerciales.
- Usar el blog como captador de demanda informativa con CTA.
- Usar practica/simulacros como lead magnet.
- Podar o fortalecer URLs que Google rastrea pero no quiere indexar.

### SEO tecnico

Fortalezas:

- `robots.txt` permite rastreo general y bloquea dashboard/api/preview/animation.
- Sitemap existe, esta enviado y Google lo lee correctamente.
- Hay metadata por pagina, canonicals, FAQPage, BreadcrumbList, Course, Article y LocalBusiness en multiples paginas.
- Las rutas principales devuelven 200 y estan prerenderizadas en Vercel/Next.

Riesgos:

- Hay 79 referencias a `https://idiomaswl.com` sin `www` en 66 archivos, mientras el sitemap y la arquitectura canonica principal usan `https://www.idiomaswl.com`.
- El sitemap incluye 388 URLs, pero Search Console muestra 158 indexadas. Esto no es automaticamente malo, pero exige triage: algunas paginas de practica pueden ser utiles para usuarios y no necesariamente para Google.
- La raiz `/` redirige a `/home`, pero el sitemap incluye ambas. La captura de rendimiento filtrada por pagina muestra una semana donde la home/raiz tuvo 0 clics y 77 impresiones. Conviene decidir si el homepage canonico del negocio sera `/` o `/home`.
- Existen 7 URLs 404 reportadas por Search Console. Deben extraerse del informe completo y resolverse con 301, correccion de enlaces internos o eliminacion del sitemap.
- Hay 12 paginas "rastreadas actualmente sin indexar"; eso suele indicar baja prioridad percibida, contenido muy similar, poca profundidad o poca autoridad interna.

### Contenido / editorial

Inventario del blog:

- 124 articulos publicados.
- Distribucion: IELTS 32, Coreano 19, Ingles 11, Frances 10, Aleman 9, Italiano 9, TOEFL 8, Migracion 8, Portugues 7, Metodo 7, ICFES 4.

Lectura:

- Hay una apuesta fuerte por IELTS y coreano.
- ICFES tiene pocas piezas frente a la oportunidad visible en Search Console y frente al valor comercial de simulacros + clases.
- Bucaramanga/local aparece en consultas y articulos recientes, pero necesita una estrategia local mas compacta: Google Business Profile, landing local, pruebas sociales y contenidos por ciudad/intencion.

### CRO / ventas

Fortalezas:

- Hay CTAs a WhatsApp, clase diagnostico, simulacros y formularios de lead.
- El blog tiene CTA por categoria y captura de scroll.
- Los simulacros tienen gate de lead y guardan en `leads`.

Riesgos:

- El valor de cada tipo de visita aun no esta visible: no sabemos que query/pagina genera lead, WhatsApp o venta.
- Muchas paginas educativas pueden atraer trafico frio sin ruta clara hacia una oferta especifica.
- Hay que medir eventos de negocio, no solo clics: `lead_blog`, `lead_simulacro`, `click_whatsapp`, conversion por pagina y por categoria.

### AI SEO / motores generativos

Google Search Central indica que para AI Overviews y AI Mode no hay requisitos especiales aparte de SEO fundamental: contenido rastreable, indexado, enlazado internamente, texto visible, buena experiencia, datos estructurados que coincidan con el contenido visible y Search Console para diagnostico.

Para ChatGPT Search, OpenAI diferencia OAI-SearchBot (busqueda) de GPTBot (entrenamiento). El `robots.txt` actual permite `User-Agent: *`, por lo que no bloquea OAI-SearchBot. Aun asi, conviene explicitarlo para reducir ambiguedad operacional:

```txt
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /
```

No hay que obsesionarse con archivos "AI" exoticos. Lo importante es que cada pagina responda claramente preguntas, tenga datos verificables, tablas, fechas, autores, fuentes y entidades consistentes.

## 4. Queries y oportunidades detectadas

### Oportunidades visibles en Search Console

Consultas con impresiones y pocos/no clics vistas en capturas:

- `nivel de ingles para trabajar en estados unidos` - 106 impresiones, 0 clics.
- `estudiar ingles` - 61 impresiones, 0 clics.
- `que certificaciones de ingles son mas valoradas en el mercado laboral colombiano?` - 51 impresiones, 0 clics.
- `celi` - 41 impresiones, 0 clics.
- `cursos de ingles bucaramanga presencial` - 41 impresiones, 0 clics.
- `ielts academic vs general in peru` - 39 impresiones, 0 clics.
- `cursos de ingles en bucaramanga presenciales` - 38 impresiones, 0 clics.
- `topik` - 35 impresiones, 0 clics.
- `que paises exigen el ielts para trabajar` - 33 impresiones, 0 clics.
- `ingles para negociaciones internacionales` - 32 impresiones, 0 clics.
- `examen toefl simulacro` - 24 impresiones, 0 clics.
- `simulacro toefl` - 22 impresiones, 0 clics.
- `ielts bucaramanga` - 21 impresiones, 0 clics.
- `clases de ingles` - 20 impresiones, 0 clics.
- `curso de ingles` - 16 impresiones, 0 clics.
- `clases de coreano`, `clases coreano`, `curso coreano online`.
- `precio toefl colombia 2026`.
- `beca gks colombia`.
- `becas corea del sur para colombianos`.
- `goethe colombia`, `goethe zertifikat`.
- `celpe bras`, `celpe-bras colombia`.
- `first certificate exam`, `cambridge b2`, `fce b2`.

Lectura: Google ya esta probando el sitio para consultas con intencion comercial y educativa. La mayoria estan en pagina 2 o mas lejos. El objetivo de la siguiente iteracion es mover un subconjunto a top 10, no perseguir las 1000 consultas a la vez.

### Keywords del mapa de oportunidades enviado

Alta prioridad:

- `como preparar el icfes ingles`
- `simulacros icfes ingles`
- `diferencias entre ielts y toefl colombia`
- `ielts vs toefl`
- `cual examen ingles elegir`
- `como aprender coreano desde cero`
- `aprender coreano colombia`
- `curso coreano online`
- `metodo de estudio para idiomas adultos`
- `como aprender idioma siendo adulto`
- `requisitos ingles para grado universitario colombia`
- `certificacion ingles universidades colombianas`
- `mejores plataformas para aprender idiomas online`
- `welearn vs duolingo`
- `preparacion examen goethe colombia`
- `curso goethe colombia`
- `como obtener el delf b2 en colombia`
- `aprender portugues para estudiar en brasil`
- `celpe-bras colombia`
- `cuanto tiempo tarda aprender ingles b2`

## 5. Paginas-motor recomendadas

### Motor 1: ICFES Ingles

Objetivo: leads de estudiantes/colegios/padres.

Paginas existentes a empujar:

- `/preparacion-icfes`
- `/examenes/icfes`
- `/practica/icfes-saber-11`
- articulos ICFES existentes

Acciones editoriales:

- Crear o fortalecer una pagina exacta: "Como preparar el ICFES de ingles".
- Crear hub de "Simulacros ICFES ingles gratis" con tabla de simulacros oficiales y de WeLearn.
- Expandir articulos: vocabulario ICFES, partes del examen, plan de 30/60/90 dias, puntaje B1/B2.
- Agregar FAQ con respuestas cortas y directas: numero de preguntas, tiempo, puntaje, niveles, como subir 10-20 puntos.

### Motor 2: Ingles comercial / Bucaramanga / trabajo

Objetivo: leads de clases 1:1 y preparacion para trabajo/examenes.

Paginas existentes:

- `/clases-de-ingles`
- `/clases-de-ingles-bucaramanga`
- `/blog/academias-de-ingles-en-bucaramanga-comparativa-2026`
- `/blog/cuanto-cuesta-aprender-ingles-en-bucaramanga-2026`
- `/blog/ingles-para-trabajar-en-estados-unidos`

Acciones:

- Optimizar la landing local con intencion "presencial vs online en Bucaramanga"; la gente esta buscando presencial, pero se puede convertir si se explica por que online 1:1 puede superar presencial masivo.
- Crear/optimizar un bloque "Nivel de ingles para trabajar en Estados Unidos" con tabla por sector: salud, tecnologia, servicio al cliente, academia, migracion.
- Crear pagina "Certificaciones de ingles mas valoradas en Colombia" enlazada desde clases de ingles, blog y examenes.

### Motor 3: IELTS / TOEFL / Cambridge

Objetivo: leads de examen internacional.

Paginas existentes:

- `/clases-de-ingles`
- `/examenes/ielts`
- `/examenes/toefl`
- `/examenes/cambridge-b2`
- blog IELTS/TOEFL amplio

Acciones:

- Consolidar cluster "IELTS vs TOEFL vs Duolingo vs Cambridge" con una tabla madre y subpaginas por comparacion.
- Optimizar articulos para consultas de pais: Colombia primero; Peru/LatAm solo si se decide captar leads regionales.
- Crear "precio TOEFL Colombia 2026" como pagina/articulo con fecha visible y CTA.
- En examenes, agregar texto indexable mas profundo: quien lo acepta, precio, duracion, puntaje objetivo, errores comunes, ruta de preparacion.

### Motor 4: Coreano / TOPIK / becas

Objetivo: leads de coreano y TOPIK.

Paginas existentes:

- `/clases-de-coreano`
- `/examenes/topik`
- `/blog/aprender-coreano-desde-cero-guia-colombia`
- `/blog/topik-fechas-centros-colombia-latinoamerica-2026`
- `/blog/beca-gks-corea-del-sur-para-colombianos`

Acciones:

- Fortalecer "aprender coreano desde cero" con respuesta inicial, ruta de 90 dias, Hangul, TOPIK y CTA.
- Crear comparador "curso coreano online Colombia" con criterios para elegir.
- Convertir `batchim` y `topik` en microhubs enlazados desde la landing.

### Motor 5: Idiomas europeos y certificaciones

Objetivo: leads de frances/aleman/italiano/portugues.

Paginas existentes:

- `/clases-de-frances`, `/clases-de-aleman`, `/clases-de-italiano`, `/clases-de-portugues`
- `/examenes/goethe`, `/examenes/cils-celi`, `/examenes/delf-dalf`, `/examenes/celpe-bras`

Acciones:

- Crear pagina madre "certificaciones de idiomas en Colombia" con secciones por IELTS, TOEFL, TOPIK, Goethe, DELF, DALF, CILS, CELI, Celpe-Bras.
- Fortalecer queries exactas: `celi`, `goethe colombia`, `celpe bras`, `delf b2 colombia`.
- Cada certificacion debe tener tabla: para que sirve, nivel, precio aproximado, donde se presenta, tiempo de preparacion, CTA.

## 6. Hallazgos prioritarios

### P0 - Medicion incompleta para ventas

Tenemos clics e impresiones, pero falta atribucion completa a leads y ventas. Sin eso, podemos posicionar articulos que no venden.

Accion:

- Exportar de Search Console: consultas, paginas, paises, dispositivos, aparicion en busquedas, comparativo 28 dias.
- Cruzar con eventos GTM/GA4: WhatsApp, lead blog, lead simulacro, scroll, formulario.
- Crear un tablero semanal: query -> pagina -> clic -> lead -> venta.

### P1 - Canonicalizacion `www` vs no `www`

Hay 79 referencias a dominio sin `www` en 66 archivos. El sitemap usa `www`, el comentario del sitemap dice que `www` es canonico y Google inspecciona `https://www.idiomaswl.com/`.

Accion:

- Unificar todos los canonicals, JSON-LD `url`, `@id`, `sameAs` internos y CourseSchema hacia `https://www.idiomaswl.com`.
- Validar con `rg "https://idiomaswl\\.com"` hasta llegar a 0 referencias, salvo redirects intencionales.

### P1 - Root `/` vs `/home`

La raiz redirige a `/home`, pero ambas aparecen en sitemap. Para marca y autoridad, conviene elegir una sola URL canonica para la home.

Opciones:

- Opcion A: mover homepage real a `/` y redirigir `/home` -> `/`.
- Opcion B: mantener `/home`, pero quitar `/` del sitemap y ajustar senales para que Google entienda `/home` como la home final.

Recomendacion: Opcion A a mediano plazo. La home de una marca normalmente debe vivir en `/`.

### P1 - Triage de indexacion

No todas las 388 paginas deben indexar. Pero las que si deben hacerlo necesitan calidad, enlaces internos y señales canonicas limpias.

Accion:

- Extraer las 58 no indexadas con URL exacta.
- Clasificarlas en: mantener noindex, corregir canonical, corregir 404, fortalecer contenido, quitar de sitemap.
- Enviar validacion en Search Console por grupo, no masivamente.

### P2 - Balance editorial

ICFES tiene 4 articulos frente a 32 de IELTS. Las capturas muestran demanda de ICFES y simulacros. Hay una oportunidad de autoridad temprana porque el producto ya existe.

Accion:

- Publicar/optimizar 8-12 piezas ICFES en 30 dias, enlazadas desde `/preparacion-icfes` y `/examenes/icfes`.
- Priorizar paginas que capturan leads: simulacro, plan de estudio, vocabulario, niveles, puntaje, universidades.

### P2 - Autoridad externa/local

La captura de enlaces muestra bajo o nulo dato externo visible. Para local SEO y AI SEO, WeLearn necesita menciones fuera del sitio.

Accion:

- Completar y mantener Google Business Profile.
- Pedir reviews reales por servicio: ingles, coreano, ICFES, IELTS.
- Crear perfiles/citaciones consistentes: nombre, telefono, ciudad, URL, categorias.
- Conseguir menciones en colegios, directorios educativos, alianzas universitarias y contenido invitado.

## 7. Plan de ataque propuesto

### Semana 1: base y medicion

1. Exportar CSV completo de Search Console: consultas, paginas, paises, dispositivos y paginas no indexadas.
2. Corregir canonicals no `www`.
3. Decidir estrategia `/` vs `/home`.
4. Auditar 404 y noindex exactos.
5. Validar que eventos de GTM/GA4 capturen: `click_whatsapp`, `lead_blog`, `lead_simulacro`, pagina, slug, categoria y query cuando sea posible.

### Semanas 2-3: quick wins de CTR y ranking

1. Optimizar titulos/meta/H1 de las 20 paginas con mas impresiones y baja CTR.
2. Agregar respuesta directa al inicio de cada articulo objetivo.
3. Crear tablas comparativas para certificaciones y examenes.
4. Insertar enlaces internos desde `/home`, `/clases-de-ingles`, `/examenes`, `/blog` y landings por idioma hacia las paginas-motor.
5. Solicitar reindexacion solo de URLs corregidas o fortalecidas.

### Mes 1: clusters motores

1. Cluster ICFES: 8-12 articulos + hub + simulacros.
2. Cluster Bucaramanga/ingles local: 4-6 articulos + landing optimizada + GBP.
3. Cluster certificaciones ingles: IELTS/TOEFL/Cambridge/Duolingo/comparativos/precios.
4. Cluster coreano: aprender desde cero, TOPIK, batchim, becas GKS, curso online.

### Mes 2: autoridad y AI visibility

1. Crear pagina "Sobre WeLearn" con entidad completa: fundador, directora academica, metodologia, ciudad, idiomas, pruebas, contacto.
2. Reforzar schema Organization, Person, Course, FAQ y LocalBusiness con datos consistentes.
3. Crear benchmarks mensuales en ChatGPT, Gemini, Perplexity y Google AI Mode:
   - "mejores cursos de coreano online en Colombia"
   - "preparacion IELTS Colombia"
   - "simulacro ICFES ingles gratis"
   - "academia de ingles Bucaramanga"
   - "preparacion Goethe Colombia"
4. Registrar si WeLearn aparece, si se cita, que URL aparece y contra quien compite.

## 8. KPIs sugeridos

Base actual aproximada:

- 107 clics / 3 meses.
- 9.27 mil impresiones / 3 meses.
- CTR 1.2%.
- Posicion media 18.7.
- 158 paginas indexadas.
- 58 paginas sin indexar.

Metas de 90 dias:

- CTR organico: 1.2% -> 2.5%+.
- Posicion media: 18.7 -> <12.
- Clics organicos mensuales: llevar el sitio a 250-400/mes como primer hito.
- Leads organicos medidos: definir baseline y crecer 25% mensual.
- 0 canonicals internas con dominio no canonico.
- 0 404 enlazadas internamente.
- 100% de paginas-motor con CTA, FAQ, schema y enlaces internos.

## 9. Decision pendiente

Antes de ejecutar cambios, conviene decidir:

1. Home canonica: `/` o `/home`.
2. Pais foco: solo Colombia o Colombia + Peru/LatAm para examenes.
3. Prioridad comercial Q3: ICFES, ingles Bucaramanga, IELTS/TOEFL, coreano o certificaciones europeas.
4. Politica de paginas de practica: indexar todas, indexar solo hubs/temas fuertes o noindex para niveles incompletos.
5. Google Business Profile: quien lo actualiza, cada cuanto y con que calendario de posts/reviews.

## 10. Primera recomendacion del gerente

La jugada mas rentable no es publicar 50 articulos mas. Es escoger tres frentes y cerrarlos bien:

1. Limpieza tecnica: canonicals, 404, home canonica, sitemap.
2. ICFES + ingles local: porque ya hay producto, busquedas y lead magnet.
3. Conversion tracking: porque sin leads atribuidos, SEO se vuelve vanidad.

Despues de eso, si el sitio sube de pagina 2 a pagina 1 en 10-20 consultas con intencion comercial, ya tendremos datos reales para decidir que cluster merece mas inversion.
