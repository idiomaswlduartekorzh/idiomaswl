# HANDOFF PARA COWORK — Producir los 16 audios de IELTS Listening (sets 5–20)

> **Qué es esto:** el encargo completo y autocontenido. No necesitas leer ningún otro archivo aparte de los que se indican aquí.
> **Estado:** el contenido (4 transcripts + 40 preguntas por set) YA está escrito y verificado en `src/data/mocks/ielts-set-5.ts` … `ielts-set-20.ts`. **NO lo modifiques.**
> **Tu única tarea:** producir en **Higgsfield** el audio de cada set y guardarlo como `public/audio/ielts/ielts-listening-set-N.mp3`, replicando EXACTAMENTE la forma, nivel y duración de los audios ya existentes de los sets 1–4 (`public/audio/ielts/ielts-listening-set-1.mp3` … `-4.mp3`, 22–26 min c/u). Esos 4 son tu referencia de calidad.

Repo: `/Users/josedavidduartesilva/Developer/idiomaswl`. **No despliegues nada.** Deja los mp3 en local y avisa para revisión.

---

## ⬇️ PROMPT (pégalo como instrucción de arranque)

```
OBJETIVO: Producir en Higgsfield los 16 audios de IELTS Listening que faltan
(sets 5 a 20) y guardarlos como public/audio/ielts/ielts-listening-set-N.mp3,
replicando EXACTAMENTE forma, nivel y duración de los audios existentes de los
sets 1–4. El contenido (transcripts + preguntas) YA está escrito en
src/data/mocks/ielts-set-N.ts — NO lo modifiques; solo léelo para producir audio.
No despliegues; deja los mp3 en local.

POR CADA set N de 5 a 20:
1. Abre src/data/mocks/ielts-set-N.ts. Toma las 4 secciones con skill:'listening'
   (parts 1,2,3,4). De cada una extrae el campo `transcript` y los speakers
   (etiquetas EN MAYÚSCULAS antes de ':'; si no hay etiquetas, es monólogo de 1 voz).
2. Arma el guion de audio del examen completo intercalando NARRACIÓN + PAUSAS con
   la plantilla EXACTA de la sección «PLANTILLA DE NARRACIÓN» de este documento
   (intros de sección, "time to look at the questions", cierres "half a minute to
   check your answers"). No cambies ni una palabra de los transcripts.
3. Genera el audio con Higgsfield (generate_audio / TTS multivoz):
   - 1 NARRADOR fijo (British RP, neutro) para TODAS las instrucciones, en los 16.
   - Cada speaker del diálogo con una voz DISTINTA y estable; en discusiones de 3
     personas, 3 voces diferenciables.
   - Acento nativo (British/Australian/North American/NZ); rota el acento entre sets
     según la tabla «CASTING». Ritmo 130–150 wpm, claro. Sin música ni efectos.
   - Números y deletreos de la Sección 1 (teléfono, "O-K-O-R-O", precios) dígito a
     dígito / letra a letra, despacio.
4. Ensambla con ffmpeg los clips de voz + los silencios de pausa en un solo mp3
   (libmp3lame, ~128 kbps, mono). Nómbralo ielts-listening-set-N.mp3 y colócalo en
   public/audio/ielts/.
5. VERIFICA con ffprobe que dura 23–26 min (1380–1560 s). Si <22 min faltan
   narración/pausas; si >27 min el ritmo va lento. Corrige hasta que entre en rango.

ENTREGABLE: 16 mp3 en public/audio/ielts/ (set-5 … set-20), cada uno verificado a
23–26 min, + un reporte con la duración real de cada archivo. No desplegar.
```

---

## PLANTILLA DE NARRACIÓN (obligatoria — es el ~60% de la duración)

`[NARRADOR]` = voz fija de instrucciones. `[PAUSA Ns]` = silencio de N s. `<<AUDIO …>>` = leer el `transcript` de esa sección con las voces del diálogo. Sustituye `<...>` según el contenido de cada set.

```
[NARRADOR] "This is the IELTS Listening test. You will hear four recordings and
           answer questions on what you hear. The recordings are played once only."
[PAUSA 3s]

── SECTION 1 (Q1–10 · conversación, 2 voces) ──
[NARRADOR] "Section 1. You will hear a conversation between <A> and <B>.
           First, you have some time to look at questions 1 to 6."
[PAUSA 30s]
[NARRADOR] "Now listen carefully and answer questions 1 to 6."
<<AUDIO diálogo — primera parte (cubre Q1–6)>>
[PAUSA 3s]
[NARRADOR] "Now look at questions 7 to 10."
[PAUSA 20s]
<<AUDIO diálogo — segunda parte (cubre Q7–10)>>
[PAUSA 3s]
[NARRADOR] "That is the end of Section 1. You now have half a minute to check your answers."
[PAUSA 30s]

── SECTION 2 (Q11–20 · monólogo, 1 voz) ──
[NARRADOR] "Section 2. You will hear <descripción del monólogo>. First, you have
           some time to look at questions 11 to 20."
[PAUSA 45s]
[NARRADOR] "Now listen carefully and answer questions 11 to 20."
<<AUDIO monólogo completo>>
[PAUSA 3s]
[NARRADOR] "That is the end of Section 2. You now have half a minute to check your answers."
[PAUSA 30s]

── SECTION 3 (Q21–30 · discusión, 2–3 voces) ──
[NARRADOR] "Section 3. You will hear <descripción>. First, you have some time to
           look at questions 21 to 25."
[PAUSA 30s]
[NARRADOR] "Now listen and answer questions 21 to 25."
<<AUDIO discusión — parte que cubre Q21–25>>
[PAUSA 3s]
[NARRADOR] "Before you hear the rest, look at questions 26 to 30."
[PAUSA 20s]
<<AUDIO discusión — parte que cubre Q26–30>>
[PAUSA 3s]
[NARRADOR] "That is the end of Section 3. You now have half a minute to check your answers."
[PAUSA 30s]

── SECTION 4 (Q31–40 · lecture, 1 voz) ──
[NARRADOR] "Section 4. You will hear a lecture about <tema>. Look at questions 31
           to 40. You will hear the lecture with no break in the middle."
[PAUSA 45s]
[NARRADOR] "Now listen carefully and answer questions 31 to 40."
<<AUDIO conferencia completa>>
[PAUSA 3s]
[NARRADOR] "That is the end of Section 4. That is the end of the Listening test."
```

**Corte S1/S3:** los transcripts van de corrido. Para meter "Now look at questions 7 to 10" (S1) y "questions 26 to 30" (S3), parte el diálogo en el punto natural donde el contenido pasa del primer grupo de respuestas al segundo. Es un corte de conveniencia, no reescribas texto.

---

## PRESUPUESTO DE DURACIÓN (estricto)

| | Meta |
|---|---|
| Audio final por sección (con narración + pausas) | **5.5–6.5 min** |
| Audio final por set (4 secciones) | **23–26 min** (1380–1560 s) |
| Ritmo de locución | 130–150 wpm, claro, natural |
| Nivel de habla | IELTS Academic real (B2–C1); contracciones y entonación de examen; no simplificar |

Comprobar SIEMPRE con: `ffprobe -v error -show_entries format=duration -of csv=p=0 <archivo>.mp3`

---

## CASTING de voces (para variedad entre los 16)

Narrador SIEMPRE la misma voz (British RP). Acento base de los diálogos, rotando:

| Sets | Acento de los diálogos |
|---|---|
| 5, 9, 13, 17 | British (RP + regional suave) |
| 6, 10, 14, 18 | Australian |
| 7, 11, 15, 19 | North American |
| 8, 12, 16, 20 | Mixto (British + NZ / British + N. American) |

Dentro de cada set, voces distintas por speaker (p. ej. S1 agente mujer / cliente hombre; S3 tutor + 2 estudiantes bien diferenciados). Los speakers exactos salen de las etiquetas en MAYÚSCULAS de cada `transcript`.

---

## MAPA DE LOS 16 SETS (archivo → salida → temas por sección)

Todos: 4 secciones, S1 conversación · S2 monólogo · S3 discusión · S4 lecture. El `audioUrl` ya está cableado a cada nombre de abajo.

| Set | Archivo de datos | Audio a producir | S1 / S2 / S3 / S4 |
|---|---|---|---|
| 5 | `ielts-set-5.ts` | `ielts-listening-set-5.mp3` | Guided city walk · Volunteer induction · Field-trip planning · Urban beekeeping |
| 6 | `ielts-set-6.ts` | `ielts-listening-set-6.mp3` | Renting a bicycle · Leisure-centre tour · Marketing coursework · History of tea |
| 7 | `ielts-set-7.ts` | `ielts-listening-set-7.mp3` | Evening course enrolment · Museum audio guide · Psychology experiment · Sleep science |
| 8 | `ielts-set-8.ts` | `ielts-listening-set-8.mp3` | Lost item report · Festival briefing · Business plan tutorial · History of clocks |
| 9 | `ielts-set-9.ts` | `ielts-listening-set-9.mp3` | Hotel reservation · Company induction · Nutrition study · Volcanoes |
| 10 | `ielts-set-10.ts` | `ielts-listening-set-10.mp3` | Job-agency registration · Library services · Architecture presentation · Whale migration |
| 11 | `ielts-set-11.ts` | `ielts-listening-set-11.mp3` | Photography workshop · Theatre backstage tour · Environmental essay · Roman aqueducts |
| 12 | `ielts-set-12.ts` | `ielts-listening-set-12.mp3` | Car-park/travel-card · Farm open-day · Robotics project · Human colour vision |
| 13 | `ielts-set-13.ts` | `ielts-listening-set-13.mp3` | Gym sign-up · Airport orientation · Tourism dissertation · Antarctic research |
| 14 | `ielts-set-14.ts` | `ielts-listening-set-14.mp3` | Wedding venue · Charity fun-run · Geology fieldwork · History of paper money |
| 15 | `ielts-set-15.ts` | `ielts-listening-set-15.mp3` | Catering order · Clubs fair talk · Education survey · Coral bleaching |
| 16 | `ielts-set-16.ts` | `ielts-listening-set-16.mp3` | Summer camp registration · Recycling launch · Engineering prototype · Bird navigation |
| 17 | `ielts-set-17.ts` | `ielts-listening-set-17.mp3` | Home repair booking · Art gallery tour · Sports-science study · The printing press |
| 18 | `ielts-set-18.ts` | `ielts-listening-set-18.mp3` | Book club · Nature reserve talk · Linguistics presentation · Desert ecosystems |
| 19 | `ielts-set-19.ts` | `ielts-listening-set-19.mp3` | Language exchange · Science-museum tour · Film-studies project · Renewable energy storage |
| 20 | `ielts-set-20.ts` | `ielts-listening-set-20.mp3` | Study room reservation · Transport-museum guide · Public-health campaign · History of chocolate |

---

## ENSAMBLADO TÉCNICO (ffmpeg)

```bash
# 1) Silencios reutilizables (mono 44.1 kHz)
for s in 3 20 30 45; do
  ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t $s -q:a 9 pause_${s}.wav
done

# 2) Generar cada tramo de voz con Higgsfield → clip_XX.wav
#    (narración con la voz fija; cada tramo de diálogo con su voz/acento)

# 3) Concatenar en el orden del guion (concat.txt: file 'clip_00.wav' / file 'pause_30.wav' / ...)
ffmpeg -f concat -safe 0 -i concat.txt -c:a libmp3lame -b:a 128k -ac 1 \
  public/audio/ielts/ielts-listening-set-N.mp3

# 4) Verificar duración (debe ser 1380–1560 s)
ffprobe -v error -show_entries format=duration -of csv=p=0 \
  public/audio/ielts/ielts-listening-set-N.mp3
```

---

## CHECKLIST DE QA POR SET (antes de darlo por hecho)

- [ ] Duración total **23–26 min** (`ffprobe`).
- [ ] Las 4 secciones, en orden, con su intro de narración y su cierre.
- [ ] Pausas de preview (30s S1/S3 primer grupo, 45s S2/S4, 20s segundos grupos) y de revisión (30s entre secciones).
- [ ] Narrador = **una sola voz constante** en las 16 pistas.
- [ ] Cada speaker con voz **distinta y estable**; acento nativo; sin música/efectos.
- [ ] Números/deletreos de la Sección 1 pronunciados dígito a dígito / letra a letra.
- [ ] **Cero cambios** al texto de los transcripts (las respuestas deben oírse literales, en orden).
- [ ] Archivo `ielts-listening-set-N.mp3` en `public/audio/ielts/`, mp3 mono ~128 kbps.
- [ ] Reproduce OK en `/examenes/ielts/practica/set-N` (el `audioUrl` ya apunta ahí).

## DEFINITION OF DONE

1. 16 mp3 en `public/audio/ielts/` (set-5 … set-20), cada uno 23–26 min y pasando la checklist.
2. Reporte con la duración real de cada archivo.
3. **No desplegar** hasta que David revise (hasta entonces los mp3 quedan en local).
