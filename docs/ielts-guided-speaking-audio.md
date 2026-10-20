# Audio de Speaking para la guía IELTS Set 1

Los dos guiones están cerrados y la interfaz no muestra un reproductor hasta que **ambos** WAV hayan sido generados y validados. El manifiesto de producción es `config/ielts-guided-speaking-audio.json`; no se deben editar guiones directamente dentro del script.

## Preparación única

1. Crear un entorno con Python 3.11.
2. Instalar Chatterbox con `pip install chatterbox-tts`.
3. Preparar un clip WAV limpio, en inglés y de una voz cuya clonación y uso estén autorizados. No se versiona ese clip.

Se usa la misma voz y la misma configuración para ambas bandas. La diferencia pedagógica está en el guion, la fluidez y el desarrollo de ideas; una voz sintética no acredita una banda de pronunciación.

## Generación final

Desde la raíz del repositorio:

```bash
npm run audio:ielts-guided-speaking -- \
  --voice-prompt /ruta/privada/voz-autorizada.wav \
  --confirm-voice-rights
```

El comando divide los textos en fragmentos seguros, genera ambos audios con `ChatterboxTTS`, verifica duración, escribe los WAV en `public/audio/ielts/` y solo entonces activa sus reproductores mediante `src/data/ielts/guided-speaking-audio.generated.ts`.

Para validar el montaje sin instalar ni cargar el modelo:

```bash
npm run check:ielts-guided-speaking-audio
```

Si se regenera un lote ya existente, primero debe escucharse el lote vigente y luego usarse `--overwrite`. Después de generar, hay que revisar por oído que no existan cortes, repeticiones, palabras inventadas ni cambios de voz antes de integrar los binarios.
