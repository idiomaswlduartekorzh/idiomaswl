# English reading corpus — release review

Estado: `review` / `noindex` / audio narrado pendiente. El corpus ya tiene 10 lecturas por nivel: 30 en total.

## Progresión cerrada

| Nivel | Textos | Extensión objetivo | Preguntas por texto | Orden de hechos |
| --- | ---: | --- | ---: | ---: |
| A1 | 10 | 58–80 palabras | 5 | 1 sección |
| A2 | 10 | 120–180 palabras | 5 | 2 secciones |
| B1 | 10 | 220–300 palabras | 5 | 3 secciones |

La cantidad de secuencias aumenta con el nivel. A1 mantiene lectura literal y acciones cotidianas; A2 añade propósito, referencia e inferencia ligera; B1 añade tono, propósito retórico, inferencia moderada y tres ventanas de secuencia sobre el desarrollo del texto.

## Rutas de revisión

- [A1 — diez lecturas](http://localhost:3217/es/practica/ingles/a1/lectura)
- [A2 — diez lecturas](http://localhost:3217/es/practica/ingles/a2/lectura)
- [B1 — diez lecturas](http://localhost:3217/es/practica/ingles/b1/lectura)

Cada ruta inglesa equivalente usa `/en/practice/english/{level}/reading`.

## Tipos de pregunta incluidos

- A1: idea principal, detalle, vocabulario, verdadero/falso y orden.
- A2: propósito, detalle, vocabulario, inferencia, referencia y dos órdenes parciales.
- B1: idea principal, propósito, inferencia, tono, vocabulario y tres órdenes parciales.

Todas las respuestas tienen evidencia textual y feedback bilingüe. Las posiciones de respuesta se mezclan en la interfaz; las secuencias nunca se entregan inicialmente resueltas.

## SEO/AEO y publicación

- Canonical propio por lectura, título y descripción en español e inglés.
- Intención y tema diferenciados; enlaces de serie para navegación contextual.
- Texto principal renderizado como HTML, con preguntas explicadas y evidencia recuperable.
- Todas las lecturas nuevas mantienen `indexable: false`, `audio: null` y decisiones humanas pendientes.
- El despliegue de código puede ir a producción, pero el contenido no se hace público hasta registrar firma lingüística y pedagógica. No se fabrican aprobaciones.

## Checklist de release humano

- [ ] Revisar una muestra completa de A1, A2 y B1 en español e inglés.
- [ ] Confirmar que el salto de dificultad y el número de secuencias se sienten naturales.
- [ ] Aprobar lingüística y pedagogía por lectura o por lote con excepciones explícitas.
- [ ] Generar y validar los 30 audios contra las transcripciones bloqueadas.
- [ ] Activar publicación e indexación únicamente después de esas firmas.
- [ ] Medir finalización, errores, glosas, uso de secuencias y grabaciones locales.

Respuesta compacta:

`APROBACIÓN CORPUS INGLÉS — A1: [decisión]; A2: [decisión]; B1: [decisión]. Firmas: [nombres]. Cambios: [lista o ninguno].`
