# Estandar transversal de PDFs WeLearn

Version 1.0 - 2026-07-14

Este contrato se aplica a toda guia descargable de Idiomas WeLearn. Cada nuevo PDF debe reutilizar la plantilla `scripts/pdf_templates/welearn_branded.py` y su pagina HTML de recurso.

## Identidad visual fija

- Formato A4 vertical.
- Margenes: 18 mm laterales, 31 mm superior y 21 mm inferior.
- Logo oficial de Idiomas WeLearn en el encabezado.
- Pastilla roja en la esquina superior izquierda y pastilla azul en la esquina inferior derecha.
- Paleta fija: navy `#10266b`, blue `#0f3d8c`, red `#e53935`, ink `#182653`.
- Encabezado con linea separadora y pie con marca de propiedad, version, fecha, URL y numero de pagina.

## Contenido minimo

- Titulo descriptivo del recurso y examen.
- Explicaciones pedagogicas originales.
- Ejemplos o modelos resueltos.
- Ejercicios y respuestas explicadas.
- Aviso: `Material original propiedad de Idiomas WeLearn.`
- Aviso de independencia: no presentar el recurso como material oficial de IELTS, TOEFL u otra entidad examinadora.
- URL canonica de la pagina HTML del recurso y fecha de version.

## SEO y EAO

Cada PDF debe tener una pagina HTML indexable en `/recursos/...` con:

- `title`, description, Open Graph y canonical propios.
- H1 que responda a la intencion de busqueda, por ejemplo `IELTS Writing Task 1 Introduccion PDF`.
- Contenido SSR que explique que incluye el PDF antes del enlace de descarga.
- Enlace descriptivo al PDF, sin depender de JavaScript ni de un blob generado en el navegador.
- `LearningResource`, `BreadcrumbList` y FAQ solo cuando el contenido visible los respalde.
- Inclusion de la pagina HTML en el sitemap. El PDF debe ser accesible publicamente desde una URL estable.
- No crear varias URLs para el mismo PDF sin una razon editorial; mantener una sola URL canonica.

La indexacion y el posicionamiento dependen del rastreo y de Google; estas reglas crean señales tecnicas y editoriales fuertes, pero no garantizan una posicion concreta.
