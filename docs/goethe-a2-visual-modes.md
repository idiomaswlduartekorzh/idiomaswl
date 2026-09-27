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
