# Home SEO Hub v2

## Objetivo

Convertir la URL raíz de Idiomas WeLearn en una portada canónica que explique quién guía el aprendizaje, cómo funciona la ruta y hacia qué páginas debe continuar cada intención. La home no sustituye las landings de idiomas, exámenes o práctica: las presenta, las contextualiza y distribuye autoridad interna hacia ellas.

## Evidencia utilizada

La exportación de Google Search Console entregada el 1 de agosto de 2026 contiene 12 días, del 18 al 29 de julio, aunque el filtro del archivo dice “6 meses”. En ese corte aparecen 55 clics, 3.994 impresiones y 1,38 % de CTR. No se mezcló con el corte oral de 109 clics y 15.600 impresiones porque corresponden a ventanas distintas.

- La home normalizada recibió 5 clics, 47 impresiones y posición media 7,98.
- El artículo de vocabulario de inglés para ICFES recibió 15 clics, 672 impresiones y posición media 8,48.
- Móvil tuvo posición media 10,84 y CTR de 1,11 %; escritorio, posición 22,19 y CTR de 1,59 %.
- Se detectaron 18 destinos repartidos entre variantes `www` y dominio raíz. La consolidación de host debe verificarse también en Vercel y Search Console.

El análisis reproducible quedó fuera del repositorio en `/private/tmp/welearn-gsc-analysis/welearn_search_console_analysis.ipynb`; no contiene credenciales ni modifica Search Console.

## Arquitectura editorial

1. **Hero:** clases de idiomas, Bucaramanga y online, meta concreta, Nivel Radar y autoridad humana de Zhanna y José David.
2. **Intención de búsqueda:** una consulta no se trata como palabra clave aislada, sino como señal de una meta.
3. **Método:** reconocer, comprender, practicar y corregir.
4. **Producto:** clases, explicaciones, práctica, feedback y preparación.
5. **Autoridad:** credenciales verificadas y experiencia multilingüe, sin atribuir doctorado terminado ni idiomas no documentados.
6. **Evidencia:** recortes de puntajes oficiales anonimizados, presentados como resultados históricos y no como promesa.
7. **Distribución:** rutas por intención, ocho idiomas publicados, nueve familias de examen y preguntas frecuentes.
8. **Conversión:** Nivel Radar como primer paso y contacto humano como alternativa.

## Decisiones SEO, GEO y AEO

- `/` es la única URL canónica de la home; `/home` responde con redirección permanente y se eliminó del sitemap.
- Un solo `h1`, jerarquía semántica de secciones, enlaces HTML rastreables y contenido útil aunque los videos no carguen.
- Datos estructurados conectados mediante `@graph`: `WebSite`, `Organization`, dos `Person`, `LanguageSchool`, `FAQPage` y `BreadcrumbList`.
- Las consultas de ICFES, clases y nivel se integran en frases naturales; las landings especializadas conservan su intención principal para evitar canibalización.
- Los videos son evidencia visual complementaria: están ocultos para tecnología asistiva, tienen póster y respetan movimiento reducido.

## Verificación y seguimiento

Tras publicar, comparar cada 28 días contra los 28 días anteriores:

- clics, impresiones, CTR y posición de `/`;
- consultas no marcarias que aterrizan en `/`;
- clics de la home hacia Nivel Radar, idiomas, exámenes y práctica;
- inicio y finalización de Nivel Radar;
- Core Web Vitals móvil, especialmente LCP, INP y CLS;
- indexación de `/`, exclusión de `/home` y consolidación `www`/dominio raíz.

La meta inicial no debe ser “posición 1” en abstracto. Debe ser aumentar impresiones relevantes y CTR sin desplazar las páginas especializadas que ya responden mejor a una consulta concreta.
