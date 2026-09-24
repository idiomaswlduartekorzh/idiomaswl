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
