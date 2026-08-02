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

1. **Hero:** clases de inglés y otros idiomas, Bucaramanga y online, Nivel Radar y autoridad humana de Zhanna y José David.
2. **Descubrimiento inmediato:** ocho idiomas y nueve familias de examen enlazados antes de iniciar la narración larga.
3. **Necesidad:** una consulta no se trata como palabra clave aislada, sino como señal de una meta concreta.
4. **Diagnóstico:** Nivel Radar convierte respuestas reales en un punto de partida orientativo A1–C2.
5. **Ruta de trabajo:** reconocer, comprender, practicar y corregir con interfaces y materiales reales de WeLearn.
6. **Producto:** clases, explicaciones, práctica por habilidad y preparación para condiciones de examen.
7. **Evidencia:** progreso del producto y puntajes oficiales anonimizados, presentados como resultados históricos y no como promesa.
8. **Distribución y conversión:** rutas por intención, hubs especializados, Nivel Radar y contacto humano.

## Dirección creativa

Para adultos que necesitan que un idioma produzca un cambio real, la home debe sentirse clara, rigurosa y humana; su firma visual es una línea editorial que atraviesa fotografías de los fundadores, movimiento narrativo y fragmentos auténticos del producto hasta convertirse en evidencia.

- La animación conecta capítulos; no reemplaza información ni funciona como fondo decorativo.
- Las interfaces reales aparecen integradas en la composición, no como capturas metidas dentro de ventanas genéricas.
- Se conserva la tensión editorial entre azul profundo, blanco cálido y rojo de señal; el color identifica decisiones, no categorías arbitrarias.
- Se evita una sucesión de tarjetas. Cada capítulo debe tener una jerarquía dominante y una acción clara.

## Inventario verificable para la fase de producto

El inventario se comprobó contra los datos y registros de ejecución del repositorio el 1 de agosto de 2026:

- **8 idiomas:** inglés, francés, alemán, italiano, portugués, ruso, coreano y japonés.
- **465 temas de gramática:** 65 de inglés, 58 de francés, 60 de alemán, 44 de italiano, 58 de portugués y 60 en cada uno de ruso, coreano y japonés; niveles A1–B1 según disponibilidad publicada.
- **9 familias de examen:** IELTS, TOEFL iBT, ICFES, Goethe-Zertifikat, CILS/CELI, DELF/DALF, TOPIK I, CELPE-BRAS y Cambridge B2 First.
- **178 recursos de examen publicados:** 168 prácticas o simulacros registrados en el reproductor de WeLearn y 10 cuadernillos oficiales ICFES enlazados. No se presentará esta cifra como “178 exámenes completos”.
- **Nivel Radar:** diagnóstico adaptativo de inglés A1–C2 con vocabulario, uso de la lengua, lectura y escucha; entrega nivel funcional y prioridades orientativas, no una certificación oficial.
- **Resultados disponibles en la rama:** cuatro recortes anonimizados —IELTS 8.0, IELTS 7.5, TOEFL 95 y TOEFL 92—. Dos fuentes miden 360 × 247 px, por lo que no deben ampliarse como imágenes hero.
- **Secuencias de movimiento existentes:** los tres videos duran 8,04 s, tienen 24 fps y resolución nativa de 560 × 752 px. Deben usarse como capas narrativas acotadas o mezcladas con el fondo; ampliarlos como planos nítidos de escritorio expone pixelación que una recompresión no puede recuperar.

## Guion propuesto para implementar después de aprobar la fase 1

1. **“¿Qué necesitas que cambie?”** El movimiento existente traduce búsquedas reales en metas, pero el texto visible conduce enseguida a una decisión: conocer el nivel, elegir un idioma o preparar un examen.
2. **“Primero necesitamos evidencia.”** Se muestra el flujo real de Nivel Radar: respuesta → adaptación → lectura/escucha/vocabulario/uso → resultado orientativo.
3. **“Tu resultado abre una ruta.”** El mapa deja de ser una metáfora abstracta y se convierte en idioma, nivel y habilidad con accesos reales a práctica.
4. **“La práctica tiene profundidad.”** Se comunica el catálogo de ocho idiomas y 465 temas sin convertir la home en un listado de 465 enlaces.
5. **“Una certificación cambia las condiciones.”** Se presenta el catálogo completo de nueve familias y el desglose honesto de 168 prácticas interactivas más 10 cuadernillos oficiales ICFES.
6. **“Corregir cambia el siguiente intento.”** Una interfaz real explica respuesta, criterio y ajuste; se distingue feedback automático de corrección docente según modalidad.
7. **“El resultado deja evidencia.”** Los puntajes anonimizados se muestran a su resolución útil, con contexto, privacidad y sin prometer una nota futura.
8. **“Elige tu siguiente paso.”** Nivel Radar, idioma, examen, práctica o conversación con WeLearn; cada CTA enlaza a su hub especializado.

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
