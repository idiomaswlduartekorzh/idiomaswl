# Auditoría visual de Práctica y Reading — 16 de noviembre de 2026

## Hallazgos

1. Las rutas `/en/practice/*/reading` estaban bajo `src/app/en`, fuera de `(site)`. Por eso sus catálogos y lecciones no heredaban `SiteNav`, el enlace para saltar al contenido ni el layout compartido. Tampoco cargaban `practica-ui.css` desde el layout de Práctica.
2. Seis familias de portadas B2–C2 (alemán, italiano, portugués, ruso, japonés y coreano) usaban componentes de gramática o estilos aislados. La portada A1 de la referencia usa `SkillHub`. Francés ya usaba ese componente, pero ofrecía menos destrezas. Inglés C1–C2 usaba las tarjetas compartidas, aunque anunciaba solo gramática y omitía Reading.
3. `SkillNav` añadía un segundo grupo de enlaces de destreza al pie de las portadas de nivel. Algunas portadas también anunciaban la ausencia de audio de su curso de gramática como si no existieran otras destrezas.
4. En móvil, la lección de Reading ponía la lista completa de 20 lecturas antes del contenido. El catálogo seguía diciendo que las 20 lecturas estaban «planned» después de su publicación.

## Corrección

- Las rutas inglesas de Reading viven ahora bajo `(site)` y cargan los tokens de Práctica. El menú usa la variante inglesa y marca **Practice** como sección activa; el documento cambia su idioma a inglés en esas rutas.
- Las 21 portadas B2–C2 de alemán, francés, italiano, portugués, ruso, japonés y coreano muestran el sistema compartido de tarjetas. Italiano B2 ya tenía una portada `SkillHub` con su ejercicio integrado; se conserva. Inglés C1–C2 incorpora Reading y deja de presentarse como piloto solo de gramática. Los títulos y descripciones de las portadas actualizadas describen las destrezas disponibles.
- El pie `SkillNav` deja de repetirse en la portada de nivel y sigue disponible dentro de las lecciones. Las tarjetas de Reading, gramática, escritura y habla enlazan las rutas publicadas.
- En móvil, la lista de lecturas es un selector plegable con el título y la posición actuales. La lección queda visible inmediatamente; en escritorio permanece la barra lateral.

## Prevención

`npm run check:site-navigation`, incluido en `prebuild`, exige que las rutas inglesas de Reading estén dentro de `(site)`, con menú y tokens de Práctica; exige que las portadas avanzadas usen el componente compartido y que las cuatro destrezas publicadas permanezcan accesibles. El control también impide que `SkillNav` vuelva a duplicar las tarjetas en la portada.

`check:writing-workplace-release` conserva su requisito de 480 casos y ahora sigue la ruta calculada por el hub compartido hasta cada enlace de escritura. No se redujo el umbral ni se omitió la comprobación de indexación.

La revisión visual se hizo en navegador a 1440 × 900 y 390 × 844: portada alemana B2, catálogo alemán B2, primera lección y apertura del selector de lecturas. Pasaron `check:site-navigation`, `check:practica-catalog` (485 temas protegidos), `check:writing-workplace-release` (480 casos), TypeScript, ESLint de los componentes modificados y el build local completo de 5.367 páginas. La comprobación pública posterior se registra en el inventario de producción.
