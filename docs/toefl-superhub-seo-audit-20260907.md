# Auditoría SEO del superhub TOEFL

**Fecha de corte:** 7 de septiembre de 2026

**URLs principales:**

- <https://www.idiomaswl.com/examenes/toefl>
- <https://www.idiomaswl.com/practica/toefl>
- <https://www.idiomaswl.com/practica/toefl/ejercicios>

## Conclusión

El clúster TOEFL ya aparece en Google, pero todavía no atrae visitas. Search Console, con
el filtro “consulta contiene `toefl`”, registró en los últimos 28 días **237 impresiones,
0 clics, CTR de 0 % y posición media 25,1**. El hub `/examenes/toefl` concentró 206 de esas
impresiones y tuvo posición media 23,1. En los últimos siete días el conjunto mejoró a
posición media 19,9, aunque mantuvo 0 clics.

El principal problema corregible era arquitectónico: `/examenes/toefl` ofrecía información,
podcast y simulacros, pero no mostraba el índice del clúster TOEFL. Google podía descubrir
las URLs por sitemap y enlaces dispersos, aunque la página madre no distribuía autoridad ni
explicaba la cobertura completa. La búsqueda también conservaba un título y un fragmento
anteriores, con datos viejos del formato y solo cuatro simulacros, mientras la página en
producción ya mostraba 20 y el formato 2026.

## Línea base de Search Console

### Últimos 28 días: 9 de agosto a 5 de septiembre de 2026

| Alcance | Clics | Impresiones | CTR | Posición media |
|---|---:|---:|---:|---:|
| Consultas que contienen `toefl` | 0 | 237 | 0 % | 25,1 |
| `/examenes/toefl` dentro de ese filtro | 0 | 206 | 0 % | 23,1 |
| TOEFL iBT vs TOEFL Essentials | 0 | 11 | 0 % | 14,3 |

Consultas principales:

| Consulta | Clics | Impresiones | Posición media |
|---|---:|---:|---:|
| `examen toefl simulacro` | 0 | 84 | 17,5 |
| `examen toefl simulador` | 0 | 60 | 39,2 |
| `simulacro toefl` | 0 | 41 | 11,5 |
| `simulación toefl` | 0 | 6 | 29,8 |
| `simulacros toefl` | 0 | 4 | 14,5 |

### Últimos 7 días: 30 de agosto a 5 de septiembre de 2026

| Alcance | Clics | Impresiones | CTR | Posición media |
|---|---:|---:|---:|---:|
| Consultas que contienen `toefl` | 0 | 48 | 0 % | 19,9 |
| `/examenes/toefl` dentro de ese filtro | 0 | 44 | 0 % | 20,5 |

La mejora reciente de posición es una señal favorable, pero 0 clics confirma que el
superhub todavía no está cumpliendo su función de captación. La prioridad es llevar
`simulacro toefl`, hoy en 11,5, a la primera página y mejorar el fragmento que Google
muestra.

La evidencia completa quedó registrada en
[toefl-superhub-seo-gsc-baseline-20260907.json](./toefl-superhub-seo-gsc-baseline-20260907.json).

## Qué ya estaba bien

- `/examenes/toefl` responde en producción, permite indexación y declara canonical.
- El título, H1, texto introductorio y guía visible contienen TOEFL, 2026 y las cuatro
  secciones.
- La página incorpora `BreadcrumbList`, `LearningResource` y `FAQPage` derivados de
  contenido visible.
- Robots permite rastreo normal y de buscadores con IA.
- El sitemap incluye el hub, el mapa de práctica, el catálogo y las páginas seccionales.
- Hay nueve artículos TOEFL, páginas de práctica profunda y enlaces editoriales hacia los
  hubs.
- Resultados externos ya muestran páginas profundas de WeLearn para precio, vocabulario,
  selección por contexto y otras consultas específicas.

## Hallazgos críticos

### 1. El índice de Google está atrasado

La búsqueda devolvió `/examenes/toefl` con el título anterior “Simulacros de Test of
English as a Foreign Language (Internet-Based)” y contenido que todavía hablaba de cuatro
simulacros, 54–72 preguntas y escala 0–120. La página publicada el día de la auditoría ya
tenía 20 simulacros, tareas 2026 y escala 1–6.

**Implicación:** el código correcto no basta hasta que Google vuelva a rastrear y procese la
URL. Después de publicar este cambio se debe solicitar indexación de las tres URLs
principales y volver a enviar el sitemap desde Search Console.

### 2. El hub no exponía el clúster completo

Solo SAT tenía un índice visible de guías dentro de su página de examen. TOEFL tenía nueve
artículos y numerosas rutas de práctica, pero el hub enlazaba apenas una selección al final
de la guía.

**Corrección:** se añadió una ruta visible con 14 enlaces agrupados en tres intenciones:
entender el examen, practicar por sección y tomar decisiones sobre precio, requisitos y
alternativas.

### 3. Faltaban canonicals en rutas que aceptan `?set=`

Varias bibliotecas nuevas permitían URLs como `?set=1`, `?set=2` y `?set=20` sin declarar
la URL base como canonical.

**Implicación:** un rastreador podía tratar cada selección como una página duplicada y
repartir señales entre variantes.

**Corrección:** se declararon canonicals en el mapa de práctica, el catálogo y siete
bibliotecas de Reading, Writing y Speaking. Listening ya tenía canonical.

### 4. La intención en español y en inglés necesitaba una frontera clara

`/examenes/toefl` está escrito en español y responde `simulacro TOEFL`, formato, puntaje y
decisiones desde Colombia. `/practica/toefl` y `/practica/toefl/ejercicios` están escritos
en inglés por decisión de producto, pero el mapa de keywords aún les asignaba términos
principales en español.

**Corrección:** el mapa SEO ahora deja la intención española de simulacro en
`/examenes/toefl` y asigna `TOEFL practice online` y `TOEFL exercises` a las dos páginas en
inglés. Ambas declaran canonical, Open Graph en inglés y `lang="en"` sobre su contenido.

### 5. La consulta comercial tiene competencia fuerte y otra intención

Para `preparación TOEFL Colombia`, los resultados observados estuvieron dominados por
universidades y empresas con páginas específicas de curso. El superhub actual responde
principalmente práctica gratuita e información del examen.

**Implicación:** intentar que una sola URL posea simultáneamente `simulacro TOEFL` y `curso
de preparación TOEFL Colombia` diluiría su foco. Si Search Console confirma demanda
comercial, la siguiente pieza debe ser una landing propia de preparación TOEFL enlazada
desde el hub y desde `/clases-de-ingles`.

## Cambios implementados

1. Título SEO de la página española actualizado a `Simulacro TOEFL gratis 2026: 20
   exámenes de práctica`.
2. Descripción reescrita con las cuatro secciones, la oferta gratuita y las rutas de guía.
3. Índice visible “Todo para preparar el TOEFL iBT 2026” con 20 simulacros, 12 familias,
   cuatro secciones y nueve guías.
4. `ItemList` estructurado construido desde la misma fuente que el índice visible.
5. Canonicals para las bibliotecas con selección por query param.
6. Metadata y señal de idioma coherentes en los dos hubs de práctica en inglés.
7. Mapa de keywords actualizado de `release-candidate` a `live` para las rutas publicadas.

## Consultas y páginas objetivo

| Intención | URL propietaria | Consulta principal |
|---|---|---|
| Simulacro completo en español | `/examenes/toefl` | `simulacro TOEFL gratis 2026` |
| Elegir modalidad de práctica | `/practica/toefl` | `TOEFL practice online` |
| Elegir una familia de tarea | `/practica/toefl/ejercicios` | `TOEFL exercises` |
| Formato y estrategia | artículos editoriales | `TOEFL 2026 estructura` |
| Práctica por destreza | hubs seccionales | `TOEFL Reading/Listening/Writing/Speaking practice` |
| Precio y registro | artículo de precio | `precio TOEFL Colombia 2026` |
| Curso con profesor | futura landing comercial | `preparación TOEFL Colombia` |

## Medición necesaria después de publicar

Tomar una línea base y comparar a 7, 14 y 28 días en Search Console:

- clics e impresiones por las tres URLs principales;
- posición y CTR de las consultas de la tabla anterior;
- consultas nuevas que contengan `gratis`, `2026`, `ejercicios`, `practice`, `puntaje`,
  `precio` y nombres de secciones;
- páginas del clúster descubiertas, rastreadas e indexadas;
- diferencias entre el título declarado y el título que Google muestra.

La línea base confirma que el SEO genera visibilidad inicial, pero no tráfico: el objetivo
de la próxima medición es obtener los primeros clics y acercar las consultas principales a
las diez primeras posiciones.

## Fuentes externas consultadas

- [Página TOEFL publicada por WeLearn](https://www.idiomaswl.com/examenes/toefl)
- [Página de práctica TOEFL publicada por WeLearn](https://www.idiomaswl.com/practica/toefl)
- [ETS: comprensión de puntajes TOEFL iBT](https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html)
- [Universidad Autónoma de Manizales: examen TOEFL iBT](https://www.autonoma.edu.co/instituto-de-idiomas/toefl)
- [Berlitz Colombia: preparación TOEFL](https://www.berlitz.com/es-co/examenes/toefl)
