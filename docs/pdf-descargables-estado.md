# PDF descargables — estado

Qué hay publicado, qué lo comprueba y qué queda pendiente. Léelo antes de tocar
`src/lib/pdf/`, `public/fonts/` o cualquier botón de descarga.

## Qué hay

Cinco destrezas descargables en los ocho idiomas, todas sobre la misma plantilla
membretada. La descarga es libre y de un clic: no pide correo.

| Destreza | Generador | Enganchado en |
|---|---|---|
| Gramática (465 temas) | `generateGrammarPdf.ts` | `GrammarTopicClient` |
| Lectura (210 lecturas) | `generateReadingPdf.ts` | `ReadingLesson` |
| Vocabulario | `generateVocabularyPdf.ts` | `VocabularyJourney` (páginas de BLOQUE) |
| Historias | `generateStoryPdf.ts` | `StoryEngine` (pantalla de entrada) |
| Escritura | `generateWritingPdf.ts` | `IntegratedWritingPractice` |
| Los 100 verbos irregulares | `generateVerbsResourcePdf.ts` | dentro de `ingles/a2/gramatica/past-simple-irregular` |

Exámenes queda fuera a propósito: decisión de producto, no un olvido.

## Cómo está montado

- **`brandedDoc.ts`** es la plantilla: píldoras del logo en las esquinas, logo
  arriba a la derecha, copyright y licencia abajo, en TODAS las páginas. El
  membrete se dibuja al final, sobre las páginas ya creadas, porque es la única
  forma de que las que abre `jspdf-autotable` por su cuenta también salgan
  membretadas.
- **`sanitize.ts`** es el único sitio donde se decide qué se puede imprimir. Lo
  comparten el navegador y los guiones de `scripts/` **a propósito**: si el
  recorte de fuentes y el saneado salieran de sitios distintos, discreparían, y
  la discrepancia se ve como un hueco en blanco dentro del PDF de un estudiante.
- **`languages.ts`** dice qué idioma necesita qué alfabeto. Es también donde
  vive el interruptor de qué idiomas ofrecen descarga.
- **`PdfDownloadButton.tsx`** es el único punto por el que pasan todas las
  descargas del sitio. Cuando haya suscripción, el candado va ahí.

## Tipografías

Los PDF en coreano, japonés y ruso llevan la tipografía dentro: Helvetica, la
que trae el formato, solo escribe latino, y esos alfabetos no se pierden, se
corrompen.

No son las Noto completas. La coreana entera son 10 MB y jsPDF no sabe recortar:
mete el archivo entero en cada documento. Nuestro contenido coreano usa 745
caracteres de los 11.000 del hangul, así que se recorta a esos y baja a 208 KB.

- Regenerar: `node scripts/build-pdf-fonts.mjs --src <carpeta>` (lee su cabecera;
  las Noto originales NO se commitean, son 22 MB).
- Vigilar: `npm run check:pdf-fonts`, dentro del prebuild. Para el build si el
  contenido estrena un carácter que el recorte no trae. **No lo silencies**: ese
  carácter saldría en blanco y no se nota hasta que alguien abre el PDF.

El japonés NO se sirve con la fuente coreana aunque esta cubra los dos
alfabetos: daría formas de trazo coreanas en algunos kanji a un estudiante de
japonés. El precio es que la lección de japonés A2 que compara con el coreano
pierde ese ejemplo en el PDF, y el propio PDF lo dice.

## Trampas comprobadas (no son teoría)

- `jspdf-autotable` **no hereda** la fuente del documento. Hay que pasarle
  `font: familia` en `styles` y `headStyles`, o el cuerpo del PDF coreano sale
  bien y sus tablas salen como basura.
- La `œ` francesa y las comillas curvas SÍ caben en CP1252. Filtrar por `> 255`
  escribía mal el francés.
- Media transcripción fonética enseña una pronunciación falsa: si dentro de
  `/…/` hay símbolos AFI, se quita el grupo entero, no los caracteres sueltos.
- Un recuadro (`callout`) más alto que una página se salía del papel y pisaba el
  copyright. Ahora se degrada a título + párrafo, que sí paginan.
- `.map(S)` pasa el índice como segundo argumento de `S`. Si algún día `S` gana
  un segundo parámetro, eso lo activa sin que nadie lo pida.
- `VocabularyJourney` vive en las páginas de bloque, no en el índice del nivel:
  buscar el botón en el índice da cero y parece un fallo que no existe.

## Pendiente

- **Escucha** no tiene PDF. Es la única destreza sin él; tendría que llevar la
  transcripción del episodio y sus preguntas.
- **Vocabulario** solo tiene datos de inglés A1 y A2. El generador ya sirve para
  los ocho idiomas: en cuanto haya catálogo, sale solo.
- La lección `japones/b1/you-ni-naru-b1` compara con el coreano y ese ejemplo no
  se imprime. Se arregla escribiendo el coreano transcrito en letras latinas.
