# Escucha (`/practica/*/escucha`) — estado y comprobaciones

Documento de traspaso. Si vas a tocar algo de escucha —contenido, audio, reproductor o
estilos— empieza por aquí. Última revisión completa: **7 de agosto de 2026**.

## Qué hay publicado

**480 episodios**: 8 idiomas × 3 niveles × 20 episodios, con voces nativas de ElevenLabs.

| | A1 | A2 | B1 |
|---|---|---|---|
| alemán, coreano, francés, inglés, italiano, japonés, portugués, ruso | ✅ | ✅ | ✅ |

Cada idioma es **una sola historia continuada de A1 a B1**, no sesenta ejercicios sueltos.
La lámpara que Emma recibe en alemán A1 es el regalo de A2; el café donde trabaja un sábado
en A1 es su turno fijo en A2 y su trabajo en B1. Si escribes episodios nuevos, esa
continuidad es parte del contenido: rómpela y la serie deja de sostenerse.

## Dónde está cada cosa

```
src/data/practica/series/<idioma>-<nivel>-series.ts   ← fuente única: guion + preguntas
src/data/practica/series/adapt.ts                     ← adapta al esquema del runner
src/data/practica/series/audio-ready.ts               ← interruptor: ¿hay mp3 en disco?
src/data/practica/listening-shuffle.ts                ← reparto de la letra correcta
src/components/practica/ListeningJourney.tsx          ← las 7 fases del recorrido
src/components/practica/ListeningPlayer.tsx           ← el reproductor
public/audio/<idioma>/<nivel>/listening-NN.mp3        ← 480 archivos
src/app/globals.css                                   ← bloque «Escucha», busca .listen-shell
```

La serie es la **única fuente de verdad**: el script que genera el audio lee los mismos
turnos que se pintan en pantalla, así que audio y transcripción no pueden desincronizarse.
Nunca edites un fichero `*-listening.ts` para cambiar contenido; deriva de su serie.

## Las cuatro comprobaciones

```bash
node scripts/validate-listening-series.mjs      # estructura y contenido (corre en prebuild)
node scripts/audit-listening-content.mjs        # coherencia pregunta ↔ audio
node scripts/audit-listening-audio.mjs          # ensamblado de los mp3
node scripts/sync-listening-durations.mjs       # duración declarada vs mp3 real
```

Estado a 7 de agosto de 2026: **las cuatro en verde.** El audio son 480 episodios con
0 problemas y 4 avisos, y los cuatro avisos son pausas de prosodia dentro de un turno.

### Lo que cada una atrapa, y por qué existe

- **validate-listening-series** — 20 episodios por serie, 4–8 turnos, 5–8 palabras clave,
  rangos de unidades léxicas por nivel, que las palabras clave **se oigan de verdad** en el
  episodio, y el reparto A/B/C. Falla el build.
- **audit-listening-content** — que el feedback cite una línea que existe, que la respuesta
  correcta se pueda deducir de lo que se dice, que la duración declarada sea la del archivo,
  y que A1 < A2 < B1 medido sobre el texto y no sobre la etiqueta.
- **audit-listening-audio** — sonoridad, picos, golpes de ElevenLabs al final de cada turno,
  y que no falte ningún separador entre turnos.
- **sync-listening-durations** — con `--write`, lee los mp3 con ffprobe y escribe la duración
  real en la serie.

## Reglas que se aprendieron rompiéndolas

**Los defectos de conjunto no se ven episodio a episodio.** Cinco series publicadas tenían
la respuesta correcta en la opción A el **100 %** de las veces: se completaba el ejercicio
pulsando siempre la primera sin escuchar nada. Ninguna revisión manual lo vio, porque en
cada episodio suelto no hay nada raro. Mide con script, no a ojo.

**Regenerar audio cuesta créditos; volver a montarlo no.** `rebuild-listening-audio.mjs`
descarga del historial de ElevenLabs los turnos ya pagados y los vuelve a montar. Cada vez
que el montaje ha tenido que corregirse se ha usado eso. No regeneres para arreglar montaje.

**El inglés produce menos audio que el resto a igualdad de palabras.** La primera pasada de
inglés A2 salía a 21 s de media contra 28–36 del resto. Si escribes inglés, cuenta segundos,
no palabras.

**El umbral de recorte y el de la auditoría tienen que ser el mismo número.** Estuvieron en
−50 y −45 dB, y por esos cinco decibelios se colaba ruido de sala que luego contaba como
pausa.

## Lo que queda pendiente

**Sesgo por longitud de las opciones.** En **362 de las 2400 preguntas** una opción es tres
o más palabras más larga que las demás, y en el **96,7 %** de esos casos es la correcta.
Es el mismo problema que el sesgo A/B/C pero por otro eje, y este **no se arregla
barajando**: hay que reescribir los distractores para que sean tan específicos como la
respuesta buena.

Se concentra por igual en idea general (180) y detalle (176). Patrón típico:

> ✗ «Emma se despide de Berlín» · «Emma busca un piso» · ✓«Emma se presenta a una vecina
> el día que llega»

El validador lo tiene puesto como **techo de 362**: puede bajar, y si sube el build se para.
Al reescribir una serie, baja el número en `TECHO_SILUETA`.

**Los cuatro avisos de prosodia.** Pausas de 1,6–2,0 s dentro de un turno, donde el actor
hace un silencio dramático. No son fallo de montaje; si molestan hay que regenerar ese turno,
y eso sí gasta créditos.

## Audio heredado

Los 80 mp3 anteriores a las series dialogadas (inglés A1/A2/B1 e italiano A1) están en
`~/Developer/idiomaswl-audios-heredados/`, **fuera del repositorio** para que ni git ni
Vercel los toquen. No se han borrado. Decisión pendiente de David.
