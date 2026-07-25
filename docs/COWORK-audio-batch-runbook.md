# Runbook para Cowork — Batch de AUDIO de los exámenes (Higgsfield MCP)

**Objetivo:** generar los **409 audios** de escucha de los simulacros y dejar cada `.mp3` en su
ruta dentro de `public/audio/...` del repo `idiomaswl`. Al terminar, cada sección de listening
suena. Nada de código: solo producir y colocar archivos.

## Prerrequisitos
1. Estás en el repo local `~/Developer/idiomaswl` (Claude Code con acceso a filesystem + bash + ffmpeg).
2. El **MCP de Higgsfield está conectado** en esta sesión (herramientas `mcp__…__generate_audio`,
   `list_voices`, `job_display`, `show_medias`).
3. Plan con créditos/ventana ilimitada activa. Antes de lanzar en masa, corre UNA generación con
   `get_cost:true` para ver el costo por audio y calcular el total.

## Modelo y voces
- **Modelo:** `generate_audio` con `model: 'text2speech_v2'`, `variant: 'elevenlabs'` (ElevenLabs es
  multilingüe: la MISMA voz habla el idioma del texto que le pases — no hay que elegir "voz alemana",
  solo pasar el texto en alemán). Alternativa: `model: 'seed_audio'`.
- **Voces:** corre `list_voices` y elige **una voz masculina y una femenina** fijas por idioma
  (para consistencia dentro de cada examen). Ejemplos de presets disponibles (voice_type `preset`):
  - Femeninas: `Emily` `6b3e3642-f7b7-4cb8-9688-51e233c4b92f`, `Naomi` `caeba733-3c17-43db-863e-69c7025512cd`
  - Masculinas: `John` `6b528d43-c056-4a2f-9d82-1591a7ba13b0`, `Callum` `858499d9-fef5-40e1-bc29-b4dc661dc283`
  - (Hay más; escucha `preview_url`. Para coreano/portugués verifica que la voz suene natural en ese idioma antes del batch.)
- **Params sugeridos:** `format: 'mp3'`, `speech_rate` normal. En TOPIK/CELPE baja un poco la velocidad.

## Procedimiento por archivo (bucle)
Para CADA audio de la tabla de abajo:
1. **Lee el guion** desde el archivo del simulacro: campo `transcript` de la sección de listening
   correspondiente en `src/data/mocks/<archivo>.ts`. (El guion YA está escrito ahí.)
2. **Genera** con `generate_audio` (variant elevenlabs, voice_id elegida). Para diálogos multi-voz,
   ver "Multi-hablante" abajo.
3. **Obtén la URL del resultado** (del retorno de `generate_audio`, o con `job_display`/`show_medias`).
4. **Descarga y guarda** en la ruta destino EXACTA:
   ```bash
   curl -L "<URL_DEL_MP3>" -o "public/audio/<ruta>/<archivo>.mp3"
   ```
5. **Verifica** que el archivo existe y pesa > 10 KB.

## Multi-hablante (CRÍTICO — no asumas "un archivo = una voz")

Hay TRES situaciones. Muchos archivos son del tipo 3 (mezcla). Lee el `transcript` y cuenta los
roles antes de generar.

**Tipo 1 — Monólogo (1 voz):** avisos y lecturas. → una sola voz.
- TOEFL `announcement`, `academic-talk`, `listen-choose-*`, `repeat-*`; DELF `co-ex2` (reportage);
  los `Ansage`/`Durchsage` de Goethe; los `annuncio` dentro de CILS.

**Tipo 2 — Diálogo (2 voces, F + M):** una conversación de principio a fin. → dos voces, concatenadas.
- TOEFL `conversation` (Student + Professor); DELF `co-ex1` (interview, turnos con "—");
  CELPE `tarefa-2` (entrevista).

**Tipo 3 — MEZCLA dentro del mismo archivo (narrador + personajes + avisos):** ⚠️ el más común y el
que más se equivoca. Un **NARRADOR** lee los números de ítem ("1번.", "Nummer eins", "Numero uno") y
entre medio aparecen diálogos (F/M) y/o avisos.
- **TOPIK `du_gi`**: narrador lee cada número → algunos ítems son una sola línea (여자: … / 남자: …),
  otros son `[대화]` (2 voces), y hay 1 `[안내 방송]` (aviso). Todo en un `.mp3`.
- **CILS `ascolto`**: 3 *testi* seguidos → mezcla de telefonata/conversazione (2 voces) + annuncio (1).
- **Goethe `hoeren-teilN`**: Teil 1/2 mezclan Gespräch (Mann/Frau) + Durchsage.

**Cómo producir los tipos 2 y 3 (fiel):**
1. Trocea el `transcript` en segmentos por rol: narrador (números/instrucciones), voz F, voz M, aviso.
2. Genera cada segmento con su voz fija (narrador = una voz neutra; personajes = F/M distintas).
3. **Concatena en el ORDEN del guion** con ffmpeg:
   ```bash
   ffmpeg -i "concat:seg01.mp3|seg02.mp3|seg03.mp3|...|segNN.mp3" -acodec copy salida.mp3
   ```
   (o crea `lista.txt` con `file 'segNN.mp3'` y `ffmpeg -f concat -i lista.txt -c copy salida.mp3`).
4. Opcional: mete ~0.6s de silencio entre segmentos para que se oiga natural.

**Opción rápida (si urge):** una sola voz narradora lee TODO el guion corrido. Aceptable como práctica,
pero menos fiel — para diálogos reales usa 2 voces.

## Mapa completo — 409 audios (rutas destino)

> La lista exhaustiva de las 409 rutas está en `docs/exam-media-batch-manifest.md` (sección AUDIOS).
> Resumen por familia (idioma · qué generar · dónde leer el guion):

| Familia | Idioma | Audios | Archivos por set | Carpeta destino | Guion (transcript en) |
|---|---|---|---|---|---|
| **TOEFL** | EN (varía acento US/UK/AU) | 260 | `listen-choose-1..5.mp3` (resp. corta), `conversation.mp3` (2 voces), `announcement.mp3` (1), `academic-talk.mp3` (1 lecture), `repeat-1..5.mp3` (1 frase) | `public/audio/toefl/set-N/` | `src/data/mocks/toefl-set-N.ts` |
| **Goethe** | DE | 59 | A1/A2: `hoeren-teil1..3.mp3`; B1/B2/C1: `hoeren-teil1..2.mp3` | `public/audio/goethe/<nivel>-<n>/` | `src/data/mocks/goethe-<nivel>-set-*.ts` |
| **DELF** | FR | 42 | `co-ex1.mp3` (interview, 2 voces), `co-ex2.mp3` (reportage, 1) | `public/audio/delf/<nivel>-<n>/` | `src/data/mocks/delf-<nivel>-set-*.ts` |
| **CILS** | IT | 20 | `ascolto.mp3` (2–3 testi, mezcla diálogo/anuncio) | `public/audio/cils/<nivel>-<n>/` | `src/data/mocks/cils-celi-*.ts` |
| **CELPE-Bras** | PT-BR | 19 | `tarefa-2.mp3` (entrevista, 2 voces) | `public/audio/celpe-bras/set-N/` | `src/data/mocks/celpe-bras-set-N.ts` |
| **TOPIK** | KO | 9 | `du_gi.mp3` (resp. cortas + 방송 + diálogos) | `public/audio/topik/set-N/` | `src/data/mocks/topik-set-N.ts` (sets 2–10) |

Rutas exactas por set: extráelas con este comando (te da las 409 con su ruta):
```bash
grep -rhoE "audioUrl: '/audio/[^']+'" src/data/mocks/{toefl,topik,cils,goethe,delf,celpe}*.ts \
  | sed "s/audioUrl: '//;s/'//" | sort -u
```

## QA obligatorio (por audio)
- Escucha el resultado: **números, nombres propios, precios y (en TOPIK) hangul** son donde el TTS
  más falla — justo lo que evalúan los ítems. Si lee mal una cifra, regenera esa pista.
- Confirma idioma correcto (que no meta acento inglés en el alemán/coreano).
- Duración razonable (no cortada).

## Verificación final (cuando termines)
```bash
# ¿cuántos de los 409 ya existen?
grep -rhoE "audioUrl: '/audio/[^']+'" src/data/mocks/{toefl,topik,cils,goethe,delf,celpe}*.ts \
 | sed "s/audioUrl: '//;s/'//" | grep -v youtube | sort -u \
 | while read p; do [ -f "public${p}" ] && echo "OK $p" || echo "FALTA $p"; done | sort | uniq -c
```
El objetivo es **0 "FALTA"**.

## Publicar (NO subir a producción sin validar)
Los `.mp3` son binarios grandes: **revisa `.vercelignore`/`.gitignore`** antes de commitear (los assets
coreanos pesados están excluidos a propósito). Cuando estén listos, sigue el flujo seguro de
`docs/OPERACION-REPOSITORIO.md` (rama desde `main`, `npm run check:practica-catalog`, `npx tsc --noEmit`,
`npm run build`, integrar en `main`). NO publicar desde un árbol con cambios sin commit ajenos.

---

### Nota sobre las IMÁGENES
Este runbook cubre SOLO audio. Las ~184 imágenes (Goethe Teil 1 selección-de-imagen, CILS Parlato,
TOEFL Discussion/Interview) requieren que primero se construyan los ítems de imagen en el contenido
(tipo `image-select` + prompts + rutas + render). Ese runbook se entrega aparte cuando el contenido
de imagen esté montado.
