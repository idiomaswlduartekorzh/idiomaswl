# Inventario seguro de resultados para el home

Estado: Fase 1 aprobada, integrada en `main` y alcanzable desde el commit de producción
`a036f93c` verificado el 25 de agosto de 2026. La rama histórica ya no es la fuente de verdad.

## Resultado del inventario

- Fotografías HEIC revisadas localmente: **39**.
- Evidencias únicas y publicables: **37**.
- Familias presentes: **TOEFL iBT, IELTS Academic, Goethe-Zertifikat y Celpe-Bras**.
- Duplicados detectados: **1** fotografía adicional del mismo Goethe-Zertifikat B1.
- Fotografías sin puntuación visible utilizable: **1** página TOEFL que contiene datos personales, pero no el reporte de puntuación.
- Originales subidos a servicios externos: **0**.

No se debe comunicar “39 resultados”. La afirmación verificable para el home es “37 evidencias publicables en cuatro familias de certificación”.

## Inventario publicable

| Familia | Evidencias | Resultados verificados |
| --- | ---: | --- |
| TOEFL iBT | 11 | 99, 95, 93, 92, 87, 86, 82, 81, 73, 72 y 71 |
| IELTS Academic | 10 | Band 8.0, 7.5, 7.5, 6.0, 6.0, 6.0, 6.0, 6.0, 5.0 y 5.0 |
| Goethe-Zertifikat | 11 | B1 (dos certificados modulares), A2 65/100 y A1 95, 92, 88, 87, 70, 64, 63 y 63/100 |
| Celpe-Bras | 5 | 1 Avançado y 4 Intermediário Superior |

Los dos registros Goethe B1 no tienen una única nota global: el documento reporta cuatro módulos. Deben mostrarse como “B1 · cuatro módulos aprobados” o con sus cuatro puntuaciones, nunca inventando un promedio.

## Reglas de privacidad aplicadas

Los derivados públicos conservan únicamente el bloque de puntuaciones o la frase del nivel. Quedan fuera:

- nombres y apellidos;
- fotografías de candidatos;
- fechas de nacimiento;
- correos, teléfonos y direcciones;
- números de candidato, registro o inscripción;
- documentos de identidad y pasaporte;
- códigos de autenticación, QR, firmas y sellos con identificadores.

Los archivos públicos fueron reexportados sin metadatos EXIF. Los originales HEIC se mantienen intactos fuera del repositorio.

## Derivados

- Directorio: `public/images/home/results/`
- Formato: WebP.
- Cantidad: 37 archivos.
- Peso total actual: aproximadamente 764 KB.
- Estrategia de carga propuesta: seis a ocho derivados iniciales y el resto bajo demanda/lazy-load.

## Propuesta narrativa

La sección no debe aparecer como una galería independiente. El documento de la etapa **Comprobar** recibe el pulso de la línea roja, se abre y se multiplica en un archivo editorial. Esa acción explica que comprobar no termina en una pantalla: deja evidencia.

Orden visual propuesto:

1. Un reporte principal emerge desde “Comprobar”.
2. El reporte se abre como una carpeta y revela una primera constelación de resultados.
3. El contador explicita “37 evidencias publicables · 4 familias”.
4. Las familias pueden filtrarse con controles de botón accesibles.
5. Una selección de seis a ocho pruebas se ve de inmediato; “Explorar el archivo” revela el resto sin cargar todas las imágenes al inicio.
6. Cada elemento conserva examen, puntuación o nivel, texto alternativo y la nota “identidad protegida”.

La animación debe usar `transform` y `opacity`, detenerse fuera del viewport y ofrecer el archivo completo en HTML incluso con JavaScript desactivado o `prefers-reduced-motion` activo.

## Exclusiones explícitas

- No mostrar documentos completos.
- No usar carrusel automático que impida leer o pausar.
- No afirmar que cada fotografía representa una persona diferente.
- No usar logotipos de las entidades como si existiera afiliación o aval.
- No afirmar que una puntuación está garantizada.
- No publicar cambios futuros sobre esta sección sin autorización explícita y sin actualizar el
  registro de producción.

## Preparación de la integración

La integración sustituyó únicamente la sección anterior `#resultados` de
`src/app/(site)/home/HomePage.tsx`. No reescribió el hero, los directorios,
las escenas narrativas ni la sección de exámenes ya aprobadas.

Arquitectura prevista:

- Mantener el texto, las 37 descripciones y las 37 figuras en el HTML generado.
- Encapsular únicamente filtros y expansión en un componente cliente pequeño.
- Pasar al componente datos serializables; no duplicar la fuente de resultados.
- Usar `next/image` con dimensiones intrínsecas o contenedores de proporción
  estable, `sizes` responsive y carga diferida bajo el fold.
- Mostrar ocho evidencias en el estado inicial sin descargar simultáneamente las
  37 imágenes a tamaño completo.
- Mantener botones reales con `aria-pressed`, `aria-expanded`, `aria-controls`,
  foco visible y una región de estado accesible.
- Preservar un `h2` para la sección; el único `h1` permanece en el hero.

### Reconciliación del repositorio — 2 de agosto de 2026

La rama estaba trece commits detrás de `origin/main`. Esos commits modificaban
la raíz, `/home`, el sitemap, `next.config.ts` y varios hubs; además, en `main`
no existían todavía los componentes del rediseño que sí viven en esta rama.

La reconciliación se ejecutó así:

1. se guardó el trabajo aprobado en el commit `17dd9eb`;
2. se actualizó la rama desde el `main` canónico sin publicar ni desplegar;
3. el merge se completó sin conflictos y conservó `/` como home real, `/home`
   como redirección permanente y la raíz única en el sitemap;
4. después se integró `HomeResultsArchive` y se ejecutaron las validaciones.

El árbol quedó protegido antes del merge; no se perdió ninguna sección aprobada.

## Evidencia de validación de la integración

- TypeScript: `npx tsc --noEmit --incremental false` sin errores.
- ESLint: componentes y datos del home sin errores.
- Catálogo protegido: 465 temas de gramática verificados.
- Prebuild: lectura y currículo de escritura verificados.
- Build de producción: generado con Webpack por la incompatibilidad de
  Turbopack con el symlink de `node_modules` del worktree.
- HTML servido: un H1, 37 imágenes del archivo y 37 figuras de resultado.
- Interacción: filtros por familia, estado accesible y expansión de 8 a 37.
- Responsive: comprobado a 390 px y escritorio; sin overflow horizontal.
- Canonical local: `/` responde 200 y `/home` responde 308 hacia `/`.
