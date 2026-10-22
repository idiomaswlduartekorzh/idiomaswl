# Audio de Speaking para IELTS guiado · Sets 1–20

El contenido pedagógico está preparado en `config/ielts-guided-speaking-audio.json`: 20 tarjetas de Speaking Part 2 y dos respuestas de referencia por tarjeta (bandas objetivo 5.5 y 9.0). El manifiesto es la única fuente de los transcripts tanto para la interfaz como para Chatterbox. Cada set conserva su propio veredicto y sus cuatro notas de criterio en ambas bandas; no se aplica una valoración global indiscriminada.

Los 40 WAV permanecen pendientes. Generar un par nunca lo aprueba ni activa el reproductor: la interfaz exige además un recibo de revisión acústica humana independiente que vincule los SHA-256 del WAV y del contenido de ambas bandas. Ambos perfiles usan la ventana de 55–120 segundos, compatible con el turno largo de 1–2 minutos. Las bandas son referencias de lenguaje guionizado; una voz sintética no acredita pronunciación ni predice una calificación oficial.

El Set 4 conserva intacta la cue card incompleta del mock canónico. El manifiesto registra por separado `sourceCueCard`, `displayCueCard` y `editorialCorrectionReason`: la interfaz muestra el enunciado editorial completo y los checks siguen comprobando la fuente original, sin fallback silencioso.

## Preparación única

1. Crear un entorno con Python 3.11.
2. Instalar Chatterbox con `pip install chatterbox-tts`.
3. Preparar un clip WAV limpio, en inglés y de una voz cuya clonación y uso estén autorizados. El clip privado no se versiona.
4. Escuchar el clip y confirmar que no contiene música, ruido, reverberación marcada ni voces adicionales.

Se utiliza la misma voz y configuración para todos los sets y ambas bandas. Así, la comparación pedagógica refleja el guion y no un cambio de locutor.

## Validación antes de generar

```bash
npm run check:ielts-guided-speaking-audio
npm run test:ielts-guided-speaking-audio
```

El primer comando valida el manifiesto, la segmentación, los 20 estados, cada `sourceMockFile`/`sourceQuestionId` contra el `sp2` canónico y la correspondencia entre estado y archivos. El segundo comprueba además la corrección editorial explícita del Set 4, la retroalimentación específica de ambas bandas, el carácter oral de los guiones y la ventana de duración.

## Generación final

Para producir los 20 sets:

```bash
npm run audio:ielts-guided-speaking -- \
  --sets 1-20 \
  --voice-prompt /ruta/privada/voz-autorizada.wav \
  --confirm-voice-rights
```

También se puede trabajar por ondas o regenerar un set específico:

```bash
npm run audio:ielts-guided-speaking -- \
  --sets 1-4 \
  --voice-prompt /ruta/privada/voz-autorizada.wav \
  --confirm-voice-rights

npm run audio:ielts-guided-speaking -- \
  --sets 7 \
  --voice-prompt /ruta/privada/voz-autorizada.wav \
  --confirm-voice-rights \
  --overwrite
```

Antes de una generación o regeneración autorizada, el comando persiste para los sets seleccionados `generated: false`, `approved: false`, `ready: false` y elimina el recibo anterior **antes de cargar Chatterbox o tocar un WAV público**. El generador divide cada transcript en fragmentos seguros, condiciona **cada fragmento** con la voz autorizada, inserta pausas y valida señal y duración. Los dos resultados se preparan en staging; justo antes de promoverlos, el proceso vuelve a leer del disco y exige que la compuerta siga revocada. Solo después reemplaza los WAV y registra el par como `generated: true`, `approved: false`, `ready: false`. Una interrupción puede dejar un archivo antiguo o un par físico incompleto, pero nunca puede servir audio nuevo bajo la aprobación anterior: la URL ya está cerrada y el check falla hasta regenerar el par. El estado conserva duración, frecuencia de muestreo, SHA-256 del WAV y un hash que incluye archivo fuente, `sourceQuestionId`, cue card fuente, corrección editorial visible y transcript.

## Revisión humana obligatoria

La validación técnica no aprueba el audio pedagógicamente. Una persona distinta de quien produce el lote debe escuchar cada WAV y revisar:

- identidad de voz estable entre fragmentos y sets;
- ausencia de cortes, repeticiones, palabras inventadas o ruido;
- pronunciación inteligible de nombres y lugares;
- pausas naturales y duración apropiada para una respuesta de Part 2;
- correspondencia exacta con el transcript.

Después de escuchar **las dos bandas** de un set, el revisor independiente prepara fuera del repositorio un recibo como este, copiando los cuatro hashes actuales desde `guided-speaking-audio.generated.ts`:

```json
{
  "schemaVersion": 1,
  "kind": "ielts-guided-speaking-acoustic-review",
  "setNumber": 7,
  "decision": "APPROVED",
  "reviewer": "identificador-del-revisor-humano",
  "reviewedAt": "2026-10-20T18:30:00-05:00",
  "checks": {
    "identityStable": true,
    "noArtifacts": true,
    "intelligible": true,
    "naturalPauses": true,
    "transcriptMatch": true,
    "durationAppropriate": true
  },
  "files": {
    "5.5": { "sha256": "…", "contentSha256": "…" },
    "9.0": { "sha256": "…", "contentSha256": "…" }
  },
  "notes": "Escucha completa de ambos WAV; identidad, texto, pausas y duración conformes."
}
```

Aplicar un recibo ya emitido:

```bash
npm run audio:ielts-guided-speaking -- \
  --apply-human-review /ruta/privada/revision-acustica-set-07.json
```

El comando no redacta el recibo ni decide la aprobación. Verifica decisión, revisor, fecha con zona horaria, seis comprobaciones con valor booleano literal `true` —cadenas como `"true"` o `"false"`, números y `null` se rechazan— y coincidencia exacta de ambos `sha256` y ambos `contentSha256`; solo entonces marca el par completo `approved/ready`. Una regeneración restablece ambos archivos del set a `approved: false`, cambia los hashes y deja sin efecto cualquier recibo anterior. El estado sigue siendo `DRAFTED` hasta que el flujo general de IELTS complete sus demás compuertas; aprobar audio no aprueba ni publica el release del mock.
