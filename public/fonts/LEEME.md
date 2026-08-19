# Tipografías de los PDF descargables

Estos `.ttf` **no** son las Noto completas: son un recorte a los caracteres que
el contenido de WeLearn usa de verdad. Noto Sans KR entera pesa 10 MB y acabaría
dentro de cada hoja de gramática coreana; recortada son 208 KB.

| Archivo | Origen | Para |
|---|---|---|
| `welearn-ko-400/700.ttf` | Noto Sans KR | coreano |
| `welearn-ja-400/700.ttf` | Noto Sans JP | japonés |
| `welearn-ru-400/700.ttf` | Noto Sans | ruso |

Dos pesos porque la plantilla pone en negrita los títulos y jsPDF no sabe
engordar una fuente: necesita un archivo por peso.

- **Regenerar**: `node scripts/build-pdf-fonts.mjs --src <carpeta>` (lee su cabecera).
- **Vigilar**: `npm run check:pdf-fonts` falla si el contenido estrena un carácter
  que el recorte no trae. Ese carácter saldría en blanco y nadie se enteraría.

Licencia SIL Open Font License 1.1 (`OFL.txt`), que permite incrustarlas en un
documento y redistribuirlas. La licencia tiene que viajar con las fuentes: no
borres `OFL.txt`.
