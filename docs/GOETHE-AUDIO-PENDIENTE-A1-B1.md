# Goethe A1–B1 · inventario exacto de audio pendiente

Fecha de corte: **28 de septiembre de 2026**. Este documento es la puerta de
entrada operativa para reanudar ElevenLabs. El inventario legible por máquina
está en `config/goethe-audio/backlog.json`.

## Resumen que evita gastar créditos en el lote equivocado

| Nivel | Sets que necesitan audio | Estado real | Archivos públicos finales |
|---|---|---|---:|
| A1 | 8, 9 y 10 | listo para generar, un set por vez | 57 |
| A2 | 1–10 | guiones congelados; generador y casting todavía bloqueados | 50 |
| B1 | 1–10 | faltan los guiones completos de Hören | 50 planificados |

Los sets A1 1–7 ya están liberados y **no se regeneran**. En total quedan 157
salidas públicas si A2 y B1 conservan un master de examen y cuatro pistas de
práctica por set. Las fuentes de TTS, manifiestos y recibos no cuentan como
salidas públicas.

## A1 · lote ejecutable

Cada set produce 28 clips naturales reutilizables y 19 archivos públicos:
`hoeren-komplett.mp3`, tres pistas por Teil y `item-01.mp3` a `item-15.mp3`.
El generador usa `eleven_v3`, cinco voces alemanas ya fijadas, MP3 44.1 kHz /
128 kbps y reserva protegida de 8.000 créditos.

| Set | Clips | Caracteres facturables | Crédito estimado actual | Huella |
|---:|---:|---:|---:|---|
| 8 | 28 | 3.875 | 2.713 | `808da3196a73b89d` |
| 9 | 28 | 4.440 | 3.108 | `62ed3dc8d450c4da` |
| 10 | 28 | 4.233 | 2.964 | `0c11d84ba7140c62` |
| **Total** | **84** | **12.548** | **8.785** | — |

Ejecutar y escuchar un set antes de iniciar el siguiente:

```bash
npm run audio:goethe-a1 -- --set=8 --generate --reserve=8000
npm run audio:goethe-a1 -- --set=9 --generate --reserve=8000
npm run audio:goethe-a1 -- --set=10 --generate --reserve=8000
```

El proceso debe escribir `public/audio/goethe/a1-<set>/manifest.json`, medir las
19 salidas y añadir el set a `goethe-a1-audio-release.json`. Si la huella o el
saldo no coincide, se detiene: no se corrige el guion durante la generación.

## A2 · textos exactos, generación todavía prohibida

Los diez archivos `src/data/mocks/goethe-a2-set-<n>-audio.json` son la fuente
congelada. Cada set contiene 12 unidades de audio: cinco textos de Teil 1, una
conversación de Teil 2, cinco conversaciones de Teil 3 y una entrevista de
Teil 4. Las reproducciones reglamentarias son **2 / 1 / 1 / 2**. El master debe
incluir instrucciones, ejemplos contenidos en los textos, pausas y cinco
minutos de transferencia al final.

| Set | Unidades | Turnos | Caracteres congelados¹ | Huella de secuencia |
|---:|---:|---:|---:|---|
| 1 | 12 | 46 | 6.646 | `33d22ca770355196` |
| 2 | 12 | 35 | 6.531 | `c0284e12cf57da15` |
| 3 | 12 | 35 | 6.501 | `434889d141a42355` |
| 4 | 12 | 35 | 6.546 | `cb3ba4142fbce141` |
| 5 | 12 | 35 | 6.538 | `a5df442cf60e89d2` |
| 6 | 12 | 35 | 6.548 | `faf0d46acc813337` |
| 7 | 12 | 35 | 6.535 | `f078cb9eba6d3ca4` |
| 8 | 12 | 35 | 6.528 | `5375ac1e859162bd` |
| 9 | 12 | 35 | 6.517 | `f0b21bf9df46cdb8` |
| 10 | 12 | 35 | 6.574 | `f8108ebb648c7677` |
| **Total** | **120** | **361** | **65.464** | — |

¹ Suma exacta actual de instrucciones, turnos y cierre. La factura definitiva
se calcula únicamente después de congelar las etiquetas habladas que agregará
el ensamblador; por eso aquí no se inventa un número de créditos.

Por set deben salir exactamente cinco archivos: el master
`public/audio/goethe/a2-<set>/goethe-a2-<set>-master.mp3` y
`hoeren-teil1.mp3` a `hoeren-teil4.mp3`. El master será mono, 44.1 kHz,
64 kbps, -18 LUFS y durará entre 22 y 25 minutos. Las pistas por Teil se derivan
del mismo montaje; no se vuelven a sintetizar.

Antes de llamar a ElevenLabs faltan cuatro cierres: crear el generador
reanudable, aprobar IDs de las cinco voces, congelar modelo/tarifa y emitir el
recibo de montaje/QA. El piloto es A2 Set 1; solo tras escucha humana se autoriza
2–10.

## B1 · primero escribir, después sintetizar

Los diez B1 actuales tienen Lesen, Schreiben y Sprechen aprobados, pero **no
tienen guiones de Hören**. Cada set necesita exactamente este módulo:

| Teil | Unidad hablada | Ítems | Reproducciones |
|---:|---|---:|---:|
| 1 | cinco textos breves | 10 | 2 |
| 2 | un monólogo público | 5 | 1 |
| 3 | una conversación | 7 | 1 |
| 4 | un debate radial con atribución de hablantes | 8 | 2 |

Son 8 unidades y 30 ítems por set, 80 unidades y 300 ítems en el banco. La
duración objetivo del módulo es aproximadamente 40 minutos. Cada set tendrá un
master `public/audio/goethe/b1-<set>/goethe-b1-<set>-hoeren-master.mp3` y cuatro
pistas derivadas `hoeren-teil1.mp3` a `hoeren-teil4.mp3`.

Los archivos heredados `goethe-b1-set-2.ts` a `goethe-b1-set-5.ts` describen un
Hören antiguo de solo dos partes. **No se generan, no se copian y no se usan
como guion.** La fuente válida es el contrato de cuatro partes de
`GOETHE_B1_MASTER_1_BLUEPRINT` y los diez registros `AUDIO_BLOCKED` de
`goethe-b1-release.json`.

La secuencia correcta es: escribir 4 partes originales por set; auditoría B1,
sesgo y respuestas; congelar manifiesto y caracteres; aprobar casting; calcular
factura; piloto B1 Set 1; QA humana; sets 2–10. Hasta completar esos pasos no se
debe pasar ninguna cadena B1 a ElevenLabs.

## Puerta común de publicación

1. Foto fresca del saldo y reserva mínima antes de cada lote.
2. Huella del guion y casting aprobados antes de generar.
3. Reanudación por archivo: nunca pagar dos veces un clip ya válido.
4. `ffprobe`, duración, bitrate, canales, loudness y ausencia de clipping.
5. Escucha humana de instrucciones, números, pausas, voces y respuestas.
6. Prueba web en Hören por Teil y examen completo.
7. Recibo de publicación; solo entonces cambia `audioReady` o el manifiesto de
   liberación.

Este inventario no autoriza gasto. La autorización debe nombrar nivel, sets,
huella, coste máximo y reserva restante.
