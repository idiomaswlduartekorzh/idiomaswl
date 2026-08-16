# Transcripciones de las guías en audio

Fecha: 16 de agosto de 2026

Los episodios de las guías en audio se generan con NotebookLM y se publican con un
recuadro de revisión editorial. Desde esta fecha llevan además **transcripción
desplegable**, porque el audio por sí solo no aporta nada al buscador: Google no
escucha mp3, y el bloque del reproductor sumaba 199 palabras de texto frente a las
~3.000 que dice el episodio.

## Estado

| Episodio | Ruta | Párrafos | Palabras |
|---|---|---:|---:|
| IELTS Academic Reading: Strategies and Traps | `/practica/ielts/reading` | 28 | 3.131 |
| Mastering IELTS Academic Writing Task 1 | `/practica/ielts/academic/writing/task1` | 31 | 3.532 |
| Picking the IELTS Task 2 Lock | `/practica/ielts/academic/writing/task2` | 33 | 3.794 |

Los textos viven en `src/data/practica/podcasts/` y los pinta
`src/components/practica/PodcastTranscript.tsx`.

## Por qué un `<details>` nativo

El desplegable es un `<details>` de HTML, no un panel con JavaScript. Eso importa por
tres razones y conviene no cambiarlo sin entenderlas:

1. **El texto viaja en el HTML servido**, plegado pero presente. Google lo rastrea e
   indexa igual que el visible. Si se cargara por JavaScript tras el clic, dejaría de
   contar.
2. La página abre en silencio, sin un muro de tres mil palabras.
3. No cuesta ni una línea de JavaScript, y funciona con teclado sin hacer nada.

Los colores se pasan por props (`tone`) apuntando a los tokens de cada página
(`--reading-*`, `--task-*`, `--intro-*`), que a su vez aliasan los globales `--wl-*`.
Por eso el modo oscuro funciona solo, y por eso el componente no referencia los
globales directamente: si algún día se jubilan, se repunta el token de la página y
esto sigue funcionando.

## Cómo se produjo el texto

Con `whisper-cli` (whisper.cpp) y el modelo `ggml-small.en.bin`, en local. **El paso
que no se puede saltar es trocear el audio.**

Transcribiendo el mp3 de un tirón, whisper **pierde frases en las costuras de sus
propias ventanas de 30 segundos**. No avisa: devuelve un texto que se lee bien y al
que le faltan trozos. En el episodio de Reading se comió, entre otras cosas, la
definición entera de la segunda familia de preguntas y la comparación del bosque y la
lupa. `-mc 0` (sin arrastre de contexto) recupera parte, pero no todo.

La solución que sí funciona:

1. Convertir a WAV 16 kHz mono.
2. Detectar silencios con `ffmpeg ... silencedetect=noise=-32dB:d=0.35`.
3. Cortar en trozos de ~90 s **por el medio de un silencio**, nunca en seco, para que
   ningún corte caiga en mitad de una frase.
4. Transcribir cada trozo por separado con `-mc 0` y concatenar.

Verificación: tras el troceo volvieron las cuatro frases que faltaban en Reading, y el
recuento subió de 2.969 a 3.131 palabras.

## Reglas de corrección

El texto es lo que se dice, no lo que debería decirse. Solo se toca:

- **mayúsculas de términos del examen** (`Not Given`, `Matching Headings`, `Band 6.5`);
- **el nombre de la academia**, que whisper oye como *well-earned* o *Will Earn*, y
  solo cuando el sustantivo siguiente lo hace inequívoco (*system*, *philosophy*,
  *family*, *training*…).

**Las imprecisiones del audio se conservan.** El episodio de Reading dice que el examen
«always has 11» tipos de pregunta y habla de transferir respuestas a una hoja; ambas
cosas siguen en la transcripción, porque el recuadro editorial de encima ya las
corrige. Arreglarlas por lo bajo dejaría la página contradiciéndose a sí misma.

## Cuidado al reacomodar en párrafos

El reflujo de párrafos **debe verificar que no pierde palabras**. La primera versión
del script partía las frases con una expresión regular que se saltaba en silencio todo
lo que no encajara: una frase terminada en comillas (`voyages."`) o un decimal
(`Band 6.5`) hacían desaparecer texto. Se perdieron 21, 26 y 88 palabras sin que nada
fallara.

Un separador basado en `split` no puede perder nada por construcción, y aun así el
script compara el recuento de entrada y salida y aborta si no cuadra. Si se reescribe
esto alguna vez, esa comprobación se queda.
