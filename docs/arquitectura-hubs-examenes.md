# Sistema compartido de hubs de exámenes

Los hubs publicados en `/examenes/[exam]` comparten una sola arquitectura de interfaz. El contenido cambia por examen; la jerarquía, la navegación y los contratos de accesibilidad y SEO no.

## Modelo editorial

ICFES fija la profundidad: resumen verificable, estructura, escala, guía en audio, práctica diferenciada y guía escrita. Los otros exámenes conservan únicamente los bloques para los que tienen contenido real.

## Modelo visual

- Lienzo calmado, superficies claras, bordes finos y sombras bajas.
- El color del examen se utiliza como acento, no como fondo dominante.
- El mapa de secciones es la firma visual; el resto evita decoración innecesaria.
- Resumen, estructura, puntaje, podcast, práctica y guía usan la misma superficie `wl-hub-panel`: ancho, borde, radio, sombra y espaciado compartidos.
- Cada capítulo usa `wl-hub-heading`; ningún componente editorial introduce por su cuenta una jerarquía visual paralela.
- Cuatro datos principales en escritorio y cuadrícula 2×2 en móvil.
- Navegación local: Resumen, Estructura, Puntaje, Podcast, Práctica y Guía.
- Los catálogos muestran ocho prácticas inicialmente; el resto permanece accesible en un `details` nativo.

## Contratos

- No crear temas CSS ni wrappers condicionales por `slug`.
- El contenido crítico se renderiza visible sin depender de JavaScript o animaciones de entrada.
- Los identificadores de sección tienen `scroll-margin-top` y el sistema respeta `prefers-reduced-motion`.
- Cada hub conserva canonical, Open Graph, Twitter, `BreadcrumbList` y `LearningResource`.
- Podcasts y guías solo aparecen cuando existen en sus catálogos.
- Todo audio editorial debe registrarse en `podcast-library.ts` y `exam-podcast-catalog.ts`; TOPIK forma parte de este contrato.

`npm run check:exam-hub-ui` valida estos contratos y forma parte de `prebuild`.
