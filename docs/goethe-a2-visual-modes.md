# Goethe A2 · modos visuales

La práctica A2 comparte una sola fuente de contenido, respuestas y scoring, pero
conserva dos presentaciones visuales:

- `web` es el modo predeterminado para estudiantes. Mantiene la estructura del
  examen —Teil, instrucciones, ejemplos, numeración, textos y opciones— dentro
  de una interfaz nativa de IdiomasWL con paneles responsive e interacción web.
- `sheet` conserva la maqueta de hojas de candidato aprobada el 25 de septiembre
  de 2026. Es una referencia visual interna y no se ofrece como selector al
  estudiante.

## Acceso de referencia

Modo web:

```text
/examenes/goethe/practica/a2-1?mode=practice&skill=reading
```

Modo hoja conservado:

```text
/examenes/goethe/practica/a2-1?mode=practice&skill=reading&layout=sheet
```

El modo hoja corresponde al diseño publicado inicialmente en `main` como
`96f08499`. Cambiar de modo no debe modificar el mock, la puntuación, los
bloqueos de Hören, el flujo de resultados ni los pagos.

## Cuadernillo descargable y Sprechen

La presentación `sheet` se conserva para comparación interna. El estudiante
recibe su equivalente útil mediante **Descargar cuadernillo PDF**, disponible
antes de comenzar y dentro de cada práctica publicada de Lesen, Schreiben y
Sprechen. El archivo se genera con el set y el Teil activos, sin claves,
transcripciones ni contenido bloqueado; identifica correctamente el nivel A2 y
enlaza de vuelta a la práctica viva.

En Sprechen la página no muestra el mazo completo. Cada Teil abre directamente
con una sola tarjeta o un solo rol elegido al azar. **Andere Auswahl** sustituye
esa selección por otra distinta; en Teil 3 la imagen visible y la etiqueta de
Kandidat/in cambian juntas. El PDF mantiene todas las tarjetas necesarias para
trabajo impreso, mientras la interfaz web conserva la dinámica de extracción.
