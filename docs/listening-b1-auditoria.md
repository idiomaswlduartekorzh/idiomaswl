# Auditoría B1 — qué se aplicó y qué no

**Fecha:** 6 de agosto de 2026
**Series revisadas:** coreano, francés, italiano, japonés, portugués y ruso B1 (120 episodios).

Las auditorías generan hallazgos de calidad muy desigual. Este documento separa los que
resistieron la comprobación de los que no, porque un hallazgo repetido sin verificar acaba
tratándose como hecho.

## Aplicado

| Hallazgo | Verificación | Estado |
|---|---|---|
| El generador de audio no veía las series B1: `--level b1` imprimía «TOTAL: 0 turnos» y tres ✓ sobre un conjunto vacío | Reproducido | **Corregido.** El enumerador acepta `b1` y un conjunto vacío aborta con código 1 |
| `그것도` copiado sobre `저것도`: transliterado «Geogeotdo» en vez de «Jeogeotdo» (ep. 18) | Confirmado | **Corregido** |
| `어두워` transliterado «eodowo» en vez de «eoduwo» (ep. 1) | Confirmado | **Corregido** |
| 16 personajes de A2 y B1 sin voz asignada, el italiano entero incluido | Reproducido con el dry-run | **Estructura completa**, pendiente de los `voice_id` |
| La banda de duración 20–35 s del blueprint de A1 se aplicaba a A2 y B1 | Reproducido: marcaba 199 de 340 episodios | **Corregido.** Banda por nivel; quedan 54, todos rozando el borde |

Además, una comprobación que ninguna auditoría pidió y que resultó ser el defecto más grave del
conjunto: el reparto de la respuesta correcta entre las tres opciones. Ver
[listening-reparto-de-respuestas.md](listening-reparto-de-respuestas.md).

## Examinado y descartado

**«Ocho episodios se aciertan sin escuchar: la palabra clave de la fase 1 contiene la respuesta
de la consolidación.»** No se sostiene. La consolidación es la fase 6 y llega después de las
fases 4 y 5, que muestran la transcripción entera. El estudiante ya ha leído la respuesta en el
guion, coincida o no con la ficha de vocabulario. El solapamiento existe —74 de 340
consolidaciones en las 17 series— pero la fase 6 nunca fue una prueba de escucha, sino de
retención. Es discutible como estilo; no es un agujero.

**«지호 desaparece del episodio 20 sin explicación.»** Leídos los episodios 18, 19 y 20, sí está
explicado, y bien. Jiho cierra su arco en el episodio 19, turno 8 —«hoy fotografío solo el buzón,
esta vez cumplo la promesa»—, y el episodio 20 enseña el resultado: Byeol cuelga esa foto en la
pared y dice que solo sale el buzón. El fotógrafo aparece representado por su fotografía, que es
justo lo que estaba en disputa desde el episodio 8. Meterlo a hablar exigiría quitar un turno
—el tope del blueprint son ocho— para repetir lo que el episodio 19 ya dice mejor.

**«Gramática sin declarar en los episodios 11, 13, 17 y 18.»** Lo que aparece sin declarar es
`-아/어도 되다` y `-(으)면 안 되다`, ambas de nivel A2. El campo `grammar` recoge el foco del
episodio, no un inventario de todo lo que reaparece de niveles anteriores. Si se quisiera exigir
el inventario completo habría que cambiar el blueprint, no estos cuatro episodios.

## Comprobaciones nuevas en el prebuild

Los dos errores de transliteración eran del tipo que solo encuentra alguien que lea esa línea
concreta en ese idioma concreto. Ahora los encuentra el build:

- **Alfabeto sin transliterar.** Ningún campo `romanization` puede conservar hangul, kana o
  cirílico. Medido: 0 en 1.380 turnos.
- **Primera letra de cada palabra.** La consonante inicial de una sílaba hangul y la primera
  letra de una cirílica son tablas fijas que la asimilación no toca, así que se pueden comprobar
  sin romanizador completo. Medido: 3.373 palabras coreanas y 3.995 rusas, **ni un falso
  positivo**. Probado en negativo: al reintroducir «Geogeotdo» el build falla y señala el turno.

El japonés queda fuera de la segunda comprobación porque no separa palabras y no hay con qué
alinear el romaji.

## Estado de la transliteración

| Serie | Turnos con transliteración |
|---|---|
| coreano A1 / A2 / B1 | 140 / 160 / 160 — completo |
| japonés A1 / A2 / B1 | 140 / 160 / 160 — completo |
| ruso A1 / A2 / B1 | 140 / 160 / 160 — completo |

Además, de 1.105 palabras que aparecen dos o más veces en coreano y ruso, ninguna está
transliterada de dos maneras distintas.
