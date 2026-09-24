# Goethe A1 · expansión de los sets 8–10

Fecha editorial: 24 de septiembre de 2026.

## Estado de publicación

- Los sets 8, 9 y 10 contienen material original de WeLearn alineado con la arquitectura pública de Start Deutsch 1.
- Lesen, Schreiben y Sprechen están publicados para práctica independiente.
- Hören y el simulacro completo quedan cerrados por set hasta que existan y pasen control las pistas de audio.
- La fuente de verdad del audio habilitado es `src/data/mocks/goethe-a1-audio-release.json`.
- El generador añade un set a ese manifiesto únicamente después de producir y medir correctamente sus audios finales.

Cada set conserva 11 partes, 35 respuestas objetivas, un formulario, una tarea de mensaje y tres bloques de Sprechen. El control editorial compara los estímulos completos de los sets 3–10 y rechaza repeticiones exactas.

## Imágenes

Las 45 imágenes se generaron con la herramienta integrada de generación de imágenes en tres lotes de 15:

- `public/images/goethe/a1-8/`
- `public/images/goethe/a1-9/`
- `public/images/goethe/a1-10/`

Prompt base de Hören:

> Imagen fotorrealista para Goethe-Zertifikat A1, 2172 × 724, tres paneles verticales iguales con separadores blancos, iluminación coherente, objetos o escenas inequívocos, sin logotipos, marcas de agua ni texto salvo cifras requeridas.

Cada set incluye siete trípticos: un ejemplo y seis preguntas. Los temas de los sets 8–10 son, respectivamente:

| Set | Trípticos de Hören |
|---|---|
| 8 | taxi/autobús/a pie; paraguas y precios; horas; helado/tarta/bocadillo; cantidades de fotos; ubicación del baño; autobús/coche/tranvía |
| 9 | chaqueta/gorro/paraguas; postal/libro/taza; horas; pan/baguette/pretzel; paquetes; información/taquillas/andén; autobús/bicicleta/tranvía |
| 10 | flores/chocolate/libro; entradas y precios; horas; sopa/ensalada/pasta; habitaciones; ubicación de farmacia; tren/coche/bicicleta |

Prompt base de Lesen:

> Imagen fotorrealista para Goethe-Zertifikat A1, 1536 × 1024, dos anuncios o escenas comparables en mitades iguales, separador blanco, contraste semántico inmediato, sin logotipos ni marcas de agua.

Cada set incluye seis pares visuales para el ejemplo y las preguntas 6–10. Los pares representan exactamente las dos alternativas descritas en cada estímulo del banco.

### Criterio visual para futuras expansiones de Lesen Teil 2

Observación editorial registrada el 24 de septiembre de 2026: las imágenes actuales de
los sets 8–10 se conservan, pero no deben usarse como referencia estética para próximos
sets. Su acabado es demasiado cercano a fotografía publicitaria generada por IA.

En futuras expansiones, Lesen Teil 2 debe parecer material producido dentro de una prueba
Goethe A1: anuncios impresos sencillos, clasificados, carteles de comercio local o fichas
editoriales diagramadas, con composición funcional, tipografía sobria y recursos visuales
didácticos. La imagen puede contener fotografía, pero debe sentirse subordinada al anuncio
y a la lectura, no como una escena cinematográfica o una campaña comercial.

Evitar en los próximos lotes:

- iluminación excesivamente pulida, simetría perfecta y superficies con acabado de render;
- escaparates, personas u objetos con apariencia de fotografía de banco demasiado idealizada;
- grandes escenas fotorrealistas que sustituyen la lectura por una pista visual obvia;
- tipografía inventada, logotipos falsos, textos deformados y carteles con demasiada producción;
- reutilizar el prompt fotorrealista anterior como plantilla principal de Lesen Teil 2.

Dirección recomendada: construir primero el pequeño anuncio A1 —título, horario, servicio,
precio o condición relevante— y usar una foto documental modesta, un recorte, un icono o
una ilustración sencilla únicamente como apoyo. El resultado debe recordar una hoja de
examen diagramada y no revelar a primera vista que fue creado con IA.

Prompt base de Sprechen:

> Hoja de tarjetas Goethe-Zertifikat A1, 1536 × 1024, cuadrícula estricta 3 × 2 con bordes azul marino redondeados y fondo marfil, un objeto fotorrealista aislado por celda, sin texto, logotipos, marcas de agua ni objetos adicionales.

Cada set incluye dos hojas y doce objetos nuevos. En el set 8 son plato, cuchillo, vaso, agua, azúcar, silla, mapa, billete, paraguas, cámara, taxi y puerta; los sets 9 y 10 siguen el mismo contrato gráfico con los sustantivos propios de sus tareas.

## Audio pendiente

El guion de cada set ya está dividido en 28 clips naturales y usa el reparto existente:

- narradora: Klara;
- voces femeninas: Emma y Frau Schneider;
- voces masculinas: Jonas y Herr Becker;
- modelo: ElevenLabs `eleven_v3`;
- salida: MP3 44.1 kHz / 128 kbps;
- señal: cue sintético WeLearn antes de cada reproducción evaluada.

Los ensayos sin consumo registran:

| Set | Clips | Caracteres facturables | Hash de manifiesto |
|---|---:|---:|---|
| 8 | 28 | 3.875 | `808da3196a73b89d` |
| 9 | 28 | 4.440 | `62ed3dc8d450c4da` |
| 10 | 28 | 4.233 | `0c11d84ba7140c62` |

Cuando haya saldo, producir un set por vez:

```bash
npm run audio:goethe-a1 -- --set=8 --generate
npm run audio:goethe-a1 -- --set=9 --generate
npm run audio:goethe-a1 -- --set=10 --generate
```

El proceso comprueba saldo y reserva protegida antes de consumir créditos, ensambla pistas por Teil y el examen completo, mide archivos, escribe el manifiesto técnico y habilita automáticamente el set terminado. Después de cada lote se debe ejecutar `npm run check:goethe-a1` y escuchar una muestra humana antes de integrar el cambio de audio.

## Puertas de calidad

```bash
npm run check:goethe-a1
npm run check:goethe-practice
npm run check:practica-catalog
npx tsc --noEmit --pretty false
npm run build
```

El primer guardián comprueba estructura, respuestas, balance de claves, extensiones A1, 15 imágenes por set, originalidad y que un set sin audio no aparezca como simulacro completo ni dentro de Hören.
