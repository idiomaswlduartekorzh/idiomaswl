# TOEFL 2026 — estado del lote de audio

## Estado publicado

- Lote: 400 archivos nuevos para Sets 1–20, además de los MP3 que ya existían.
- Modelo: ElevenLabs `eleven_flash_v2_5`.
- Perfil final: MP3 mono, 44.1 kHz, 64 kbps, normalización EBU R128 en dos pasadas con objetivo de -18 LUFS.
- Huella del manifiesto fuente: `a11ed6a310f316c622df9741fbb6616d3bce5ecff7bd252ecb46e985fa20fd94`.
- Huella del lote publicado: `9235dd4f4350b3ec2f962903f4ebb5414876ea872f00ae836e398dc01de21741`.
- Inventario verificable: `docs/toefl-2026-audio-release-2026-08-21.json`.

## QA aplicado

Los 400 archivos pasaron la auditoría técnica. La comparación automática de guion contra Whisper se escaló de Tiny a Small para cualquier diferencia. Tres clips ambiguos se regeneraron de forma dirigida y luego obtuvieron transcripción exacta con Small. Un anuncio largo original se conservó porque Tiny reconoció la cláusula disputada en el archivo completo y Small la reconoció exactamente al aislar ese tramo.

Resultado efectivo de liberación: 400 de 400 archivos aceptados. El registro individual de hashes hace que el build falle si un MP3 desaparece o cambia sin actualizar deliberadamente el lote.

## Coste y reutilización futura

La generación completa, incluidos los reintentos correctivos, quedó aproximadamente en USD 3.3353, dentro del techo total autorizado de USD 3.34. Los scripts de manifiesto, casting, generación selectiva, normalización, Whisper, reemplazos y publicación se conservan porque permiten ampliar futuros sets sin volver a generar ni pagar por los audios ya aprobados.

Para comprobar el lote antes de integrar o desplegar:

```bash
npm run check:toefl-audio-manifest
npm run check:toefl-audio-release
```

La plataforma presenta una práctica propia alineada a la familia y forma fija oficial documentada; no afirma ser un producto de ETS ni replicar su algoritmo adaptativo propietario.
