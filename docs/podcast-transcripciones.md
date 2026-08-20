# Guías en audio: el texto que las acompaña

Fecha: 16 de agosto de 2026

Cada guía en audio lleva ahora, bajo el reproductor, **un artículo desplegable con lo
que el episodio explica**. No es una transcripción, y la diferencia es deliberada.

## Por qué existe

El audio no aporta nada al buscador: Google no escucha mp3. El bloque del reproductor
sumaba 199 palabras de texto frente a las ~3.000 que dice el episodio, así que todo el
contenido bueno era invisible — para Google y para cualquier IA que quisiera citarlo.

| Episodio | Ruta | Secciones | Palabras |
|---|---|---:|---:|
| IELTS Academic Reading: Strategies and Traps | `/practica/ielts/reading` | 15 | ~1.640 |
| Mastering IELTS Academic Writing Task 1 | `/practica/ielts/academic/writing/task1` | 13 | ~1.550 |
| Picking the IELTS Task 2 Lock | `/practica/ielts/academic/writing/task2` | 15 | ~1.660 |

Los textos viven en `src/data/practica/podcasts/` y los pinta
`src/components/practica/EpisodeNotes.tsx`.

## Por qué artículo y no transcripción

Se intentó la transcripción literal primero. **No se puede con estos audios.** Son dos
voces sintéticas que se pisan al turnarse, y cuando se solapan cualquier transcriptor
se queda con una y borra la otra — por eso lo que falta es casi siempre el arranque de
la respuesta. Probado y medido:

| Método | Tartamudeos | Frases decapitadas |
|---|---:|---:|
| `small.en` de un tirón | 0 | 29 |
| `small.en` troceado por silencios y cosido | 38 | 3 |
| `medium.en` de un tirón | 0 | 31 |
| `medium.en` + reparación cruzando pasadas | 14 | 10 |

Siempre queda una de las dos. El modelo grande (1,5 GB) no mejoró al pequeño: el techo
lo pone el audio, no el modelo. Si alguien vuelve a intentarlo, hará falta un servicio
con separación de voces, no una herramienta local.

Y el artículo es mejor producto de todos modos. Una transcripción literal de una
conversación son tres mil palabras con *"Oh yeah. Right. Exactly."* entre medias. El
artículo dice lo mismo, se lee, y **puede decir el formato oficial bien desde la
primera línea** en vez de repetir las imprecisiones del audio.

## Reglas del texto

- **El recuadro editorial sigue corrigiendo el audio**, y el artículo dice la versión
  correcta directamente. Reading, por ejemplo: el episodio afirma que el examen
  «always has 11» tipos de pregunta; el artículo explica que IELTS define 11 categorías
  numeradas y que cada examen usa una selección variable.
- Todo lo que es convención de estudio va etiquetado como tal: el plan de cuatro
  párrafos, las tres familias de preguntas, las cinco familias de prompts y el reloj
  5/30/5 son defaults de WeLearn, **no reglas de IELTS**.
- En inglés, como el resto de estas páginas. Mezclar idiomas en una misma página
  perjudica el rastreo.

## Por qué un `<details>` nativo

El desplegable es un `<details>` de HTML, no un panel con JavaScript. Tres razones, y
conviene no cambiarlo sin entenderlas:

1. **El texto viaja en el HTML servido**, plegado pero presente. Google lo rastrea e
   indexa igual que el visible. Si se cargara por JavaScript tras el clic, dejaría de
   contar.
2. La página abre en silencio, sin un muro de mil seiscientas palabras. Fue condición
   expresa: «que no salga de una porque quedaría feo».
3. No cuesta una línea de JavaScript y funciona con teclado sin hacer nada.

Los colores llegan por la prop `tone`, apuntando a los tokens de cada página
(`--reading-*`, `--task-*`, `--intro-*`), que a su vez aliasan los globales `--wl-*`.
Por eso el modo oscuro funciona solo, y por eso el componente no referencia los
globales directamente: si algún día se jubilan, se repunta el token de la página y esto
sigue funcionando.

## Para el próximo episodio

El componente ya sirve tal cual. Hace falta un archivo en
`src/data/practica/podcasts/` que exporte `EpisodeSection[]` y una línea en el
`Content.tsx` de la página. El siguiente episodio previsto es **Cambridge B2 First**,
que es la mayor demanda sin atender según Search Console: 26 % de las impresiones con
consulta visible, posición media 36,8 y cero clics.
