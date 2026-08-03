# IELTS Listening — PROMPT GOAL para producir los audios en Higgsfield (Sets 5–20)

> **Para:** Claude Cowork.
> **Situación:** los 16 sets (5–20) ya tienen sus **4 transcripts + 40 preguntas** escritos en `src/data/mocks/ielts-set-N.ts`. **No hay que escribir contenido.** El único trabajo es **producir el audio** de cada set en Higgsfield y colocarlo como `public/audio/ielts/ielts-listening-set-N.mp3`.
> **Regla suprema:** el resultado debe ser indistinguible en **forma, complejidad, nivel y duración** de los audios ya publicados de los sets 1–4. Esos 4 mp3 (`public/audio/ielts/ielts-listening-set-1..4.mp3`, 22–26 min) son la referencia de calidad. Si tu audio no se parece a esos, está mal.

---

## ⬇️ PROMPT GOAL (copiar/pegar tal cual a Cowork)

```
OBJETIVO: Producir en Higgsfield los 16 audios de IELTS Listening que faltan
(sets 5 a 20) y guardarlos como public/audio/ielts/ielts-listening-set-N.mp3,
replicando EXACTAMENTE la forma, nivel y duración de los audios ya existentes
de los sets 1–4. El contenido (transcripts + preguntas) YA está escrito en
src/data/mocks/ielts-set-N.ts — NO lo modifiques; solo léelo para producir audio.

POR CADA set N de 5 a 20:
1. Lee las 4 secciones de Listening (skill:'listening', parts 1–4) en
   src/data/mocks/ielts-set-N.ts. Extrae el campo `transcript` de cada una y la
   lista de speakers (etiquetas EN MAYÚSCULAS antes de ':').
2. Construye el guion de audio del examen completo intercalando NARRACIÓN y PAUSAS
   con la plantilla exacta de §2 de este documento (intros de sección, "time to
   look at the questions", cierres "end of Section X… half a minute to check").
3. Genera el audio con Higgsfield (generate_audio / TTS multi-voz):
   - VOCES: 1 narrador fijo (British RP, neutro) para TODAS las instrucciones.
     Cada speaker del diálogo con una voz DISTINTA y coherente con su rol.
     En discusiones de 3 personas, 3 voces claramente diferenciables.
   - ACENTOS: inglés nativo (British / Australian / North American / NZ). Varía el
     acento entre sets para realismo; dentro de un set, mantén cada voz constante.
   - RITMO: 130–150 wpm, claro y natural, sin prisa. Sin música, sin efectos, sin
     reverberación. Cada grabación se oye UNA sola vez (no repetir).
4. Ensambla con ffmpeg los tramos de voz + los silencios de pausa (§2) en un solo
   mp3 (libmp3lame, ~128 kbps mono). Nómbralo ielts-listening-set-N.mp3 y colócalo
   en public/audio/ielts/.
5. VERIFICA con ffprobe que la duración total cae en 23–26 min. Si queda < 22 min,
   te faltan narración o pausas → corrige. Si queda > 27 min, el ritmo va muy lento.

RESTRICCIONES DE LONGITUD Y NIVEL (estrictas, no negociables):
- Cada sección de audio terminada: 5.5–6.5 min. Test completo por set: 23–26 min.
- Nivel de habla = IELTS Academic real (B2–C1): léxico y conectores naturales,
  contracciones, entonación de examen. NO simplifiques ni infantilices.
- No cambies NI UNA palabra de los transcripts: las respuestas de las preguntas
  son palabras exactas que el estudiante debe oír. Léelas con claridad.
- Los números y nombres deletreados de la Sección 1 (teléfono, código postal,
  precios, "B-R-O-W-N") deben pronunciarse dígito a dígito / letra a letra,
  despacio y claro, igual que en los sets 1–4.

ENTREGABLE: 16 archivos mp3 en public/audio/ielts/ (set-5 … set-20), cada uno
verificado a 23–26 min, más un reporte con la duración real de cada archivo.
NO despliegues a producción; solo deja los mp3 listos y avisa para revisión.
```

---

## 1. Presupuesto de longitud (medido sobre los audios reales de sets 1–4)

| Métrica | Referencia sets 1–4 (medido) | **Meta sets 5–20** |
|---|---|---|
| Palabras de habla por sección | 320–380 | igual (ya fijo en el transcript) |
| Ritmo de locución | ~130–150 wpm | 130–150 wpm |
| Habla pura por sección | ~2.3–2.8 min | ~2.3–2.8 min |
| **Audio final por sección** (con narración + pausas) | ~5.5–6.5 min | **5.5–6.5 min** |
| **Audio final por set** (4 secciones) | **22–26 min** | **23–26 min** |

> El grueso de la duración NO es el diálogo (solo ~10 min): son la **narración de instrucciones** y las **pausas** de examen. Ese es el 60% del audio. Omitirlas = error de forma y de tiempo.

---

## 2. Plantilla EXACTA del guion de audio (narración + pausas)

`[NARRADOR]` = voz fija de instrucciones. `[PAUSA Ns]` = silencio de N segundos a insertar. `<<AUDIO …>>` = leer el `transcript` de esa sección.

```
[NARRADOR] "This is the IELTS Listening test. You will hear four recordings and
           answer questions on what you hear. There will be time to read the
           questions and to check your answers. The recordings are played once only."
[PAUSA 3s]

──────────── SECTION 1 (Q1–10 · conversación, 2 voces) ────────────
[NARRADOR] "Section 1. You will hear a conversation between <A> and <B>.
           First, you have some time to look at questions 1 to 6."
[PAUSA 30s]
[NARRADOR] "Now listen carefully and answer questions 1 to 6."
<<AUDIO diálogo — primera parte, cubre Q1–6>>
[PAUSA 3s]
[NARRADOR] "Now look at questions 7 to 10."
[PAUSA 20s]
<<AUDIO diálogo — segunda parte, cubre Q7–10>>
[PAUSA 3s]
[NARRADOR] "That is the end of Section 1. You now have half a minute to check
           your answers."
[PAUSA 30s]

──────────── SECTION 2 (Q11–20 · monólogo, 1 voz) ────────────
[NARRADOR] "Section 2. You will hear <descripción del monólogo>. First, you have
           some time to look at questions 11 to 20."
[PAUSA 45s]
[NARRADOR] "Now listen carefully and answer questions 11 to 20."
<<AUDIO monólogo completo>>
[PAUSA 3s]
[NARRADOR] "That is the end of Section 2. You now have half a minute to check
           your answers."
[PAUSA 30s]

──────────── SECTION 3 (Q21–30 · discusión académica, 2–3 voces) ────────────
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
[NARRADOR] "That is the end of Section 3. You now have half a minute to check
           your answers."
[PAUSA 30s]

──────────── SECTION 4 (Q31–40 · conferencia académica, 1 voz) ────────────
[NARRADOR] "Section 4. You will hear a lecture about <tema>. Look at questions 31
           to 40. You will hear the lecture once, without a break to check your
           answers halfway."
[PAUSA 45s]
[NARRADOR] "Now listen carefully and answer questions 31 to 40."
<<AUDIO conferencia completa>>
[PAUSA 3s]
[NARRADOR] "That is the end of Section 4. That is the end of the Listening test."
```

**Nota de partición S1/S3:** el transcript está escrito de corrido. Para insertar la pausa "Now look at questions 7 to 10" (S1) y "questions 26 to 30" (S3), corta el diálogo en el punto natural donde el contenido pasa de cubrir el primer grupo de respuestas al segundo. Es un corte de conveniencia; no reescribas texto.

---

## 3. Casting de voces sugerido por set (para variedad entre los 16)

Narrador SIEMPRE la misma voz (British RP). Alterna los acentos de los diálogos:

| Sets | Acento base de los diálogos |
|---|---|
| 5, 9, 13, 17 | British (RP + regional suave) |
| 6, 10, 14, 18 | Australian |
| 7, 11, 15, 19 | North American |
| 8, 12, 16, 20 | Mixto (British + NZ / British + N. American) |

Dentro de cada set: género y timbre distintos por speaker (p. ej. S1 agente mujer / cliente hombre; S3 tutor + 2 estudiantes de voces bien diferenciadas).

---

## 4. Ensamblado técnico (ffmpeg)

```bash
# 1) Silencios reutilizables (mono 44.1 kHz)
for s in 3 20 30 45; do
  ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t $s -q:a 9 pause_${s}.wav
done

# 2) Generar cada tramo de voz con Higgsfield → clip_XX.wav
#    (narración con la voz fija; cada tramo de diálogo con su voz/acento)

# 3) Concatenar en el orden del guion §2 (lista de archivos)
#    concat.txt:  file 'clip_00.wav'\n file 'pause_3.wav'\n file 'clip_01.wav' ...
ffmpeg -f concat -safe 0 -i concat.txt -c:a libmp3lame -b:a 128k -ac 1 \
  public/audio/ielts/ielts-listening-set-N.mp3

# 4) Verificar duración (debe ser 23–26 min = 1380–1560 s)
ffprobe -v error -show_entries format=duration -of csv=p=0 \
  public/audio/ielts/ielts-listening-set-N.mp3
```

---

## 5. Checklist de QA del AUDIO (por set — antes de dar por hecho)

- [ ] Duración total **23–26 min** (`ffprobe`). Ni corto (falta narración/pausas) ni excesivamente lento.
- [ ] Las 4 secciones presentes, en orden, con su narración de intro y su cierre.
- [ ] Pausas de preview (30s S1/S3 primer grupo, 45s S2/S4, 20s segundos grupos) y de revisión (30s entre secciones) insertadas.
- [ ] Narrador = **una sola voz constante** en las 16 pistas.
- [ ] Cada speaker de diálogo con voz **distinta y estable**; acento nativo; sin música/efectos.
- [ ] Números y deletreos de la Sección 1 pronunciados **dígito a dígito / letra a letra**, claros.
- [ ] **Cero cambios** al texto de los transcripts (las respuestas deben oírse literales, en orden).
- [ ] Archivo `ielts-listening-set-N.mp3` en `public/audio/ielts/`, mp3 mono ~128 kbps.
- [ ] Reproduce OK en la página `/examenes/ielts/practica/set-N` (el `audioUrl` ya apunta a ese archivo).

---

## 6. Definition of Done (los 16 sets)

1. 16 archivos `public/audio/ielts/ielts-listening-set-5.mp3` … `set-20.mp3`, cada uno 23–26 min y pasando la checklist §5.
2. Reporte con la duración real de cada archivo.
3. **No desplegar a producción** hasta que David revise: hasta entonces, los mp3 quedan en local. (Al desplegar, cada `set-N` pasa a tener Listening jugable con audio real; hoy el `audioUrl` ya está cableado y espera el archivo.)
