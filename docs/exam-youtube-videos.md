# Videos integrales de Listening/Hören para YouTube

La plantilla de `scripts/render-exam-video.mjs` produce videos completos desde los
audios publicados y las preguntas del simulacro. Hay timelines revisados para
IELTS Academic Sets 2, 3, 5–8 y 10–20, y Goethe-Zertifikat A1 Sets 1–7.
Los MP4 se guardan en `output/youtube/` y no se integran al repositorio.

```bash
node scripts/render-exam-video.mjs --exam ielts --set set-2 --render
node scripts/render-exam-video.mjs --exam goethe --set a1-1 --render
python3 scripts/check-ielts-video-timing.py
python3 scripts/check-exam-video-cues.py
```

Sin `--render` se generan las tarjetas PNG y `timeline.json` para revisión visual.
Todas las escenas llevan dos pastillas tipo vidrio líquido y el logo limpio arriba
a la derecha. La portada añade el logo grande y el nombre del examen, seguida por
instrucciones. El rótulo de `Part` o `Teil` permanece visible en cada pregunta.

IELTS presenta los enunciados de todas las preguntas del bloque activo. Los cortes
en `config/exam-videos/` se fijaron sobre las pausas largas de cada MP3 vigente.
La primera tanda de cada parte termina donde comienza la pausa que anuncia la
siguiente tanda. Goethe muestra una pregunta a la vez desde el inicio de su beep;
las 28 señales reales de cada set se comprueban contra el audio con el script de
arriba. Durante la segunda reproducción de una pregunta, la misma tarjeta
permanece en pantalla.

IELTS Sets 1 y 9 usan un patrón de audio diferente y requieren cortes individuales.
Set 4 tiene 7 preguntas en Part 3 y 13 en Part 4 en el mock; se debe reconciliar
esa distribución con el audio antes de generar un video. Los restantes GOETHE aún
no tienen un MP3 integral revisado como fuente de este flujo.

El generador rechaza un audio cuya duración cambie más de 0,15 s; si se sustituye
un MP3, hay que volver a auditar sus cortes antes de renderizar. La salida usa
1920 × 1080, H.264 y AAC. Los 20 s iniciales de portada e instrucciones preceden
al MP3 íntegro; los 8 s finales muestran el cierre. No hay respuestas visibles
durante la prueba.
