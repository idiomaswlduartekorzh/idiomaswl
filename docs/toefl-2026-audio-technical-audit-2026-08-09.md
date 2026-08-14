# TOEFL iBT 2026 — auditoría técnica global de audio T06

Fecha de corte: 2026-08-09

Estado: T06 cerrada; release bloqueado hasta T07 y T08

Alcance: 260 MP3 existentes, sin regenerar, normalizar, recortar ni sobrescribir ninguno

## 1. Resultado ejecutivo

La intuición de que el lote necesitaba una revisión técnica era correcta, aunque el
problema no es de integridad ni de compatibilidad general. Los 260 archivos existen,
coinciden exactamente con el manifiesto T04, decodifican y reproducen en Chromium.
La heterogeneidad está en loudness, margen de pico y colas de silencio:

| Estado técnico T06 | Assets | Interpretación |
|---|---:|---|
| `pass_automated_T06` | 142 | Sin hallazgos según el contrato automatizado actual |
| `pass_with_actionable_warning` | 61 | Reproducible, pero requiere revisión o decisión humana |
| `fail_actionable` | 57 | Tiene métrica, finding, acción, owner y ruta de corrección versionada |
| **Total** | **260** | **100 % cubierto por pase o fallo accionable** |

El gate de T06 queda satisfecho porque los 260 assets están medidos y todos los fallos
tienen tratamiento explícito. Esto no significa que los 57 hayan sido reparados ni que
los 203 restantes estén aprobados para release. La alineación lingüística, naturalidad,
prosodia, voces, transcripción canónica y escucha humana siguen bloqueadas en T07–T08.

La matriz individual y reproducible está en
`docs/toefl-2026-audio-technical-audit-2026-08-09.tsv`.

## 2. Fuentes, alcance y límites

Esta auditoría parte de:

- `docs/toefl-2026-audio-manifest-2026-08-09.tsv`, SHA-256
  `4982abc724898d1b85b60f9605e981c25abcd390839ca9c80630a8c6b37d9913`;
- fingerprint agregado de los MP3
  `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842`;
- FFmpeg y FFprobe 8.1.1;
- la especificación oficial vigente registrada como
  `toefl-ibt-2026@2026-08-09.v2`.

La [especificación oficial TOEFL iBT 2026 de ETS](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf)
define familias de tareas, contenido y características de las voces, pero el material
revisado no publica un objetivo numérico de LUFS o dBTP. Por tanto, los límites de
loudness, pico y silencio usados aquí son un contrato interno de control de calidad de
WeLearn, no un requisito atribuido a ETS.

La medición de loudness y true peak usa el filtro `loudnorm` documentado por
[FFmpeg](https://www.ffmpeg.org/ffmpeg-filters.html), basado en EBU R128. La
[recomendación EBU R128](https://tech.ebu.ch/publications/r128) sirve como fundamento
metrológico, pero su objetivo broadcast no se adoptó como objetivo TOEFL. WeLearn
mantiene por ahora el objetivo ya presente en su auditor histórico, que deberá
versionarse si una prueba perceptual posterior justifica cambiarlo.

## 3. Contrato técnico aplicado

| Dimensión | Regla T06 | Resultado de incumplir |
|---|---|---|
| Integridad | Hash, bytes y duración iguales a T04 | Fallo |
| Perfil | MP3, mono, 44,1 kHz, 64 kbps | Fallo o revisión de metadatos |
| Decodificación | FFmpeg debe decodificar el archivo completo | Fallo |
| Loudness | Objetivo interno −16 LUFS ±2,5 LU | Fallo fuera de −18,5 a −13,5 LUFS |
| Margen de loudness | −18,5..−18,0 o −14,0..−13,5 LUFS | Advertencia |
| True peak | Mayor que 0 dBTP | Fallo |
| Headroom | Mayor que −1 dBTP y hasta 0 dBTP | Advertencia |
| Clipping PCM | Cualquier muestra decodificada en límite | Fallo |
| Silencio inicial | Más de 350 ms | Fallo |
| Silencio final | Más de 600 ms | Fallo |
| Pausa interna | Más de 1.600 ms | Advertencia |
| Fragmento audible | Menos de 80 ms entre silencios largos | Advertencia |
| Corte | Cambio de muestra/energía de borde sospechoso | Advertencia |
| Duplicado exacto | Hash MP3 o PCM repetido | Fallo |
| Candidato casi duplicado | Mismo tipo, duración ≤1,01×, correlación de onda >0,98 y de envolvente >0,995 | Revisión |
| Navegador | `AudioContext.decodeAudioData` y reproducción HTMLAudio silenciada | Fallo |

Los thresholds son deliberadamente conservadores y accionables. Un fallo de silencio
de 610–790 ms, por ejemplo, no implica que el contenido sea inservible: significa que
debe revisarse el borde y, si procede, crearse una variante recortada con identidad
nueva. Nunca autoriza sobrescribir el original.

## 4. Integridad, perfil y reproducción

| Control | Resultado |
|---|---:|
| Filas T04 ↔ T06 | 260/260 |
| Assets ausentes o extra | 0 |
| Diferencias de hash, bytes o duración | 0 |
| Decodificación FFmpeg completa | 260/260 |
| MP3 mono, 44,1 kHz, 64 kbps | 260/260 |
| Hashes MP3 únicos | 260 |
| Hashes PCM decodificados únicos | 260 |
| Candidatos casi duplicados | 0 |
| Reproducción Chromium | 260/260 |
| Errores o warnings en consola Chromium limpia | 0 |

La pareja más parecida dentro del filtro de tarea/duración fue
`set-5/listen-choose-3` frente a `set-11/listen-choose-2`: correlación de onda
0,18783 y de envolvente 0,96785. Está lejos del contrato conjunto de candidato casi
duplicado, por lo que no se abre finding.

Chromium decodificó los 260 assets en un `AudioContext` de 48 kHz, con un canal, y la
duración de `AudioBuffer` coincidió con HTMLAudio con delta máximo de 0 ms. Los 48 kHz
son la frecuencia del contexto del navegador y su resampling, no una mutación ni una
discrepancia del stream fuente de 44,1 kHz.

## 5. Resultado por familia

| Familia | Assets | Pasa | Advertencia | Falla | LUFS mín.–máx. | dBTP mín.–máx. |
|---|---:|---:|---:|---:|---:|---:|
| Listen and Choose a Response | 100 | 73 | 14 | 13 | −17,24 a −12,77 | −3,45 a −0,42 |
| Listen to a Conversation | 20 | 7 | 12 | 1 | −17,46 a −14,35 | −1,24 a −0,20 |
| Listen to an Announcement | 20 | 16 | 4 | 0 | −16,39 a −14,62 | −1,65 a −0,66 |
| Listen to an Academic Talk | 20 | 0 | 4 | 16 | −19,20 a −18,07 | −1,45 a −0,63 |
| Listen and Repeat | 100 | 46 | 27 | 27 | −17,12 a −11,89 | −3,16 a +0,29 |

La señal más clara es sistemática: Academic Talk está demasiado bajo respecto al
contrato interno en 16 de 20 assets y los otros cuatro quedan en margen. Repeat y
Choose Response concentran los assets demasiado altos. Announcement es la familia
más consistente técnicamente.

## 6. Resultado por set

| Set | Pasa | Advertencia | Falla | Set | Pasa | Advertencia | Falla |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 7 | 6 | 0 | 11 | 6 | 5 | 2 |
| 2 | 5 | 6 | 2 | 12 | 8 | 3 | 2 |
| 3 | 9 | 2 | 2 | 13 | 8 | 4 | 1 |
| 4 | 4 | 4 | 5 | 14 | 8 | 2 | 3 |
| 5 | 5 | 2 | 6 | 15 | 7 | 1 | 5 |
| 6 | 8 | 1 | 4 | 16 | 8 | 2 | 3 |
| 7 | 5 | 5 | 3 | 17 | 8 | 2 | 3 |
| 8 | 9 | 1 | 3 | 18 | 8 | 4 | 1 |
| 9 | 8 | 2 | 3 | 19 | 8 | 3 | 2 |
| 10 | 8 | 1 | 4 | 20 | 5 | 5 | 3 |

Ningún set queda técnicamente aprobado como conjunto. El set 1 no tiene fallos, pero
conserva seis advertencias y todavía depende de T07–T08. El set 5 tiene la mayor carga
de reparación técnica, con seis fallos.

## 7. Catálogo de findings

Las ocurrencias pueden solaparse en un mismo asset; por eso suman más que 57 o 61.

| ID | Severidad | Ocurrencias | Significado | Acción versionada |
|---|---|---:|---|---|
| `TECH-LDN-002` | Fallo | 37 | Loudness fuera de −18,5..−13,5 LUFS | Medir gain y crear variante normalizada |
| `TECH-SIL-002` | Fallo | 21 | Cola superior a 600 ms | Revisar borde y crear variante recortada si procede |
| `TECH-PEAK-001` | Fallo | 1 | True peak superior a 0 dBTP | Crear variante limitada después de revisión |
| `TECH-PEAK-002` | Fallo | 1 | Muestras PCM recortadas | Crear variante limitada después de revisión |
| `TECH-PEAK-003` | Advertencia | 61 | Menos de 1 dB de headroom | Escucha humana y decisión de conservación |
| `TECH-LDN-003` | Advertencia | 27 | Loudness en margen del contrato | Escucha humana y decisión de conservación |
| `TECH-CUT-001` | Advertencia | 1 | Final potencialmente abrupto | Revisar borde en T08 |

No hubo `decode failure`, silencio inicial excesivo, pausa interna larga, fragmento
audible corto, DC offset fuera de contrato, warning del decoder ni fallo de metadata.

## 8. Casos prioritarios

- `asset:toefl:set-5:part-12:repeat-5` es el único asset con clipping: −14,42 LUFS,
  +0,29 dBTP y cinco muestras PCM en el límite. FFmpeg confirmó de forma independiente
  el true peak. Requiere una variante limitada; el original se conserva.
- `asset:toefl:set-18:part-8:academic-talk` es el más bajo, con −19,20 LUFS.
- `asset:toefl:set-5:part-12:repeat-1` es el más alto, con −11,89 LUFS.
- `asset:toefl:set-9:part-12:repeat-4` tiene la mayor cola detectada, 790 ms. Las 21
  colas fallidas están entre 610 y 790 ms y son candidatas a revisión/trim, no una
  razón automática para reemplazar la locución.

Cada una de las 57 filas fallidas contiene el valor medido, uno o más IDs de finding,
`technical_reuse_class=B_technical_repair_candidate`, acción no vacía y owner
`T20_T21_T22`. Las demás usan sólo una clase técnica candidata. La clase global
A/B/C/D/E permanece `pending_T07_T08` para no convertir un pase automático en
aprobación de reutilización.

## 9. Verificación en navegador y corrección del arnés

Se sirvió el repositorio únicamente en `127.0.0.1` y se usó una sesión Chromium limpia.
Para cada asset se hizo fetch sin caché, decodificación completa mediante
`AudioContext.decodeAudioData`, carga con HTMLAudio, `play()` silenciado, pausa y
comparación de duración. Resultado final:

```text
assets=260; pass=260; fail=0; sampleRates=[48000]; channels=[1];
maxDurationDeltaMs=0; consoleErrors=0; consoleWarnings=0
```

La primera ejecución del arnés pidió `/audio/toefl/...` a un servidor estático iniciado
en la raíz del repositorio y obtuvo 404. La ruta correcta para ese arnés era
`/public/audio/toefl/...`. Se descartó la ejecución inválida, se abrió una sesión nueva
y se repitieron los 260 casos con 200/decodificación/playback correctos. Es un fallo de
configuración de prueba corregido, no un fallo de producto ni de audio.

No se tomaron capturas: no hubo cambio de UI y una imagen no aporta evidencia sobre
decodificación completa. La matriz y el resultado estructurado son la evidencia
aplicable.

## 10. Siete auditorías

1. **Full-stack, datos y repositorio — pasa T06.** Paridad exacta T04↔T06, 260/260
   hashes/bytes/duraciones iguales, rutas resueltas y originales intactos. Se preservó
   todo el trabajo IELTS concurrente.
2. **TOEFL — pasa como capa técnica, no como fidelidad total.** Los assets continúan
   ligados a L-001–L-004 o S-001. ETS no recibe una atribución falsa de thresholds
   internos y este pase no resuelve volumen, adaptatividad, visuales ni tiempos.
3. **Editorial y pedagógica — pendiente donde corresponde.** T06 no adjudica guiones,
   naturalidad, prosodia, velocidad, dificultad, distractores ni concordancia. Eso se
   deriva a T07–T08 sin inferir aprobación.
4. **Audio — pasa el gate T06.** Cobertura técnica 100 %, con 142 pases, 61 warnings y
   57 fallos accionables. No se modificó ningún asset.
5. **Antisesgo y derechos — no certifica.** No se infirieron acentos, identidades,
   proveedor, licencia o consentimiento desde el waveform. Esos campos permanecen
   bloqueados para revisión posterior.
6. **UI/UX y accesibilidad — no certifica UI.** No hubo cambio visual. La reproducción
   técnica en Chromium pasa, pero controles, single-play, teclado, lector de pantalla y
   recuperación ante error siguen para las unidades de interfaz.
7. **Playwright/Chromium — pasa.** 260/260 decodifican y reproducen en una sesión limpia,
   sin fallos ni mensajes de consola.

## 11. Seguridad y preservación

- No se leyó `.env.local` ni se inspeccionaron variables de entorno.
- No se buscó, mostró ni copió ninguna clave.
- No se llamó ElevenLabs ni otra API paga; consumo: cero.
- No se generó, recortó, normalizó, limitó, renombró o sobrescribió ningún MP3.
- No se hizo commit, push, merge, rebase, deploy ni cambio de remotos.
- Las acciones de reparación apuntan a variantes versionadas futuras con identidad y
  vínculo al original.

## 12. Gate y siguiente paso

T06 se cierra porque el 100 % de los 260 assets pasa técnicamente o tiene un fallo
accionable registrado. El TSV de evidencia tiene SHA-256
`21c15c0f8eaa63b17ab5d17f74e9aa8678da51ca00624bae6887ab922419653f`.

El release sigue `blocked_not_validated` para 260/260. La siguiente primera unidad
elegible es T07: auditoría lingüística/ASR, reconciliación de transcripciones y cola de
casos que requieren escucha humana. T06 no autoriza todavía generar audio ni aplicar
las 57 reparaciones.
