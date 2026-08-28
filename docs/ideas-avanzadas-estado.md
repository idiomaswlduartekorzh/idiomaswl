# Ideas avanzadas — estado del subsistema

## Fuente de verdad

El catálogo vive en `src/data/practica/advanced-topics.ts`. El motor guiado, sus tipos y el
orden de las lecciones viven en `src/data/practica/advanced-guided-topics.ts`; los temas más
largos tienen un archivo `advanced-guided-*.ts` propio.

Todas las lecciones usan el mismo ciclo abierto de ocho fases:

1. seis afirmaciones iniciales opcionales;
2. veinte minutos de discusión y primera nota de voz local;
3. veinte objetivos léxicos, cinco por familia;
4. lectura larga en seis funciones argumentativas;
5. recuperación oral y notas;
6. dos fuentes auditivas con funciones distintas;
7. doce preguntas de evidencia con retroalimentación cerrada;
8. síntesis escrita y nota de voz final.

## Estado publicado y preparado

| Secuencia | Tema | Blueprint | Audio |
|---|---|---|---|
| 1 | Framing Effect | completo | 2 guiones aprobables; MP3 pendientes |
| 2 | Dunning–Kruger | completo | 2 MP3 producidos |
| 3 | Affect Heuristic | completo | 2 guiones aprobables; MP3 pendientes |
| 4 | Hypergamy | completo | 2 MP3 producidos |
| 5 | Firmness, Strength and Generosity | completo | 2 guiones aprobables; MP3 pendientes |
| 6 | Confirmation Bias | completo | 2 guiones aprobables; MP3 pendientes |
| 7 | Zero-sum Thinking | completo | 2 guiones aprobables; MP3 pendientes |

Un audio pendiente no admite contenido incompleto: cada pista debe tener título, voz prevista,
función, duración estimada, guion C1 de al menos 300 palabras y cuatro preguntas balanceadas.
La interfaz solo muestra el reproductor cuando existen dos activos reales.

## Revisar los guiones sin generar audio

Todos los guiones pendientes:

```bash
npm run audio:advanced:scripts
```

Un solo tema:

```bash
npm run audio:advanced:scripts -- efecto-encuadre
```

Slugs pendientes: `efecto-encuadre`, `heuristica-del-afecto`,
`firmeza-fuerza-generosidad`, `sesgo-confirmacion` y `pensamiento-suma-cero`.

Este comando es de solo lectura: no llama a ElevenLabs, no crea archivos y no consume créditos.

## Guardianes obligatorios

```bash
npm run check:advanced-ideas
npm run check:advanced-guided
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

`check:advanced-guided` exige inglés en la lección, seis bloques de lectura, seis afirmaciones,
veinte objetivos léxicos, doce preguntas de evidencia, claves equilibradas y opciones sin pistas
de longitud. También impide declarar un audio como pendiente si faltan sus guiones o preguntas.

## Producción futura de audio

Antes de gastar créditos, imprimir y revisar los dos guiones del tema. Al producirlos, conservar
los guiones y preguntas como fuente de verdad, añadir únicamente las rutas y duraciones de los
dos MP3 y cambiar el laboratorio de `not-produced` a `produced`. No inventar la duración.
