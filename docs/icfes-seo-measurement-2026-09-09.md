# Medición SEO del lanzamiento ICFES

Fecha de diseño: 9 de septiembre de 2026

## Qué se puede afirmar hoy

La referencia histórica disponible corresponde al export de Search Console del
18 al 29 de julio de 2026. En ese corte, ICFES registraba 81 impresiones, 14
consultas y una posición media de 12,8. El código también documenta que
`/examenes/icfes` estaba alrededor de la posición 29 y que buena parte de la
visibilidad del clúster se concentraba en artículos.

Estos datos prueban oportunidad, pero no son una línea base válida para medir el
lanzamiento de septiembre. Antes de publicar se necesita un export nuevo de
Search Console. No se promete una posición: se mide el cambio.

## URL principal y límites

- URL principal de intención comercial: `/examenes/icfes`.
- URL pública de demostración: `/practica/icfes-saber-11/simulacro-guiado`.
- Hubs de apoyo: aprendizaje, muestras históricas, vocabulario, plan de estudio
  y preparación con profesor.
- Los 23 cuadernos guiados completos son producto privado: deben permanecer
  fuera del sitemap y con `noindex, nofollow, noarchive`.
- Las respuestas, explicaciones y diagnósticos pagados no se usan como contenido
  indexable para atraer tráfico.

## Línea base obligatoria antes de publicar

Exportar de Search Console los últimos 28 días completos y guardar, como mínimo:

1. consultas que contengan `icfes`, `saber 11`, `simulacro` o `ingles`;
2. páginas del clúster ICFES;
3. clics, impresiones, CTR y posición media;
4. país y dispositivo;
5. estado de indexación de la URL principal y la demostración pública.

Separar consultas de marca y no marca. Registrar la fecha exacta del corte y no
mezclar ventanas de distinta duración.

## Tablero de lanzamiento

| Indicador | Día 0 | Día 7 | Día 14 | Día 28 | Regla de lectura |
|---|---:|---:|---:|---:|---|
| Impresiones no marca del clúster | pendiente | — | — | — | Crecimiento indica mayor descubrimiento, no necesariamente mejor conversión. |
| Clics orgánicos del clúster | pendiente | — | — | — | Comparar siempre contra una ventana equivalente. |
| CTR de `/examenes/icfes` | pendiente | — | — | — | Evaluar title/description solo con suficientes impresiones. |
| Posición media de la consulta principal | pendiente | — | — | — | Usar como tendencia; no como promesa de ranking. |
| Leads tras terminar un simulacro | pendiente | — | — | — | Medir por sesión y excluir pruebas internas. |
| Compras de detalle de COP 12.000 | 0 | — | — | — | Solo después de habilitar pagos de forma autorizada. |
| Membresías de COP 49.000 | 0 | — | — | — | Atribuir el primer contacto y la conversión final. |
| Membresías de COP 99.000 | 0 | — | — | — | Separar ventas de capacidad docente disponible. |

## Experimento controlado

Durante los primeros 28 días no se cambia simultáneamente la URL, el `title`, el
H1 y la oferta. El orden recomendado es:

1. publicar la arquitectura ya auditada y tomar Día 0;
2. comprobar rastreo e indexación sin tocar el contenido durante siete días;
3. si hay impresiones y CTR bajo, probar un solo cambio de snippet;
4. si no hay impresiones, revisar enlaces internos, sitemap y cobertura antes de
   ampliar contenido;
5. expandir mocks solo por lotes pequeños que pasen el arnés editorial. Los mocks
   privados mejoran el producto y la conversión, no se contabilizan como nuevas
   páginas SEO.

## Criterios de decisión

- **Continuar:** el clúster gana impresiones no marca o clics sin filtrar
  respuestas privadas y los eventos comerciales llegan completos.
- **Ajustar:** hay impresiones suficientes, pero cae el CTR o los usuarios llegan
  y no terminan la demostración.
- **Detener el experimento comercial:** una respuesta privada se indexa, una
  atribución sugiere afiliación oficial, el checkout concede acceso incorrecto o
  se vende revisión docente sin capacidad reservada.

La revisión SEO técnica no autoriza el lanzamiento comercial. El Día 0 empieza
únicamente cuando existe publicación autorizada y un export actual de Search
Console.
