# Guiones de audio — The Locked Phone

Ejercicio: `/practica/the-locked-phone`
Nivel: **B1–B2** · Formato: dos notas de voz (voice notes) de WhatsApp, una por persona.

## Estado: ✅ audios producidos

| Archivo | Ruta en el repo | Voz | Duración |
|---|---|---|---|
| `girlfriend.mp3` | `public/audio/locked-phone/girlfriend.mp3` | Hope | 1:27 |
| `boyfriend.mp3` | `public/audio/locked-phone/boyfriend.mp3` | William | 1:14 |

Ambos generados en ElevenLabs, MP3 128 kbps. Este documento es la fuente de verdad para regrabar o corregir.

## Voces y ajustes (ElevenLabs) — reproducir al regrabar

| Personaje | Voz | Speed | Stability | Similarity | Style |
|---|---|---|---|---|---|
| Jess (`girlfriend.mp3`) | **Hope** — Bubbly, Gossipy and Girly | 1.00 | 50 | 75 | 0 |
| Tom (`boyfriend.mp3`) | **William** — Deep, Engaging Storyteller | 0.85 | 60 | 100 | 0 |

La combinación funciona: Hope da el registro de chisme acelerado que pide Jess, y William a 0.85 da el ritmo lento y contenido de Tom. **Mantener estas dos voces** en futuras versiones del ejercicio para que los alumnos reconozcan a cada personaje.

## Especificaciones técnicas

- **Formato:** MP3, 128 kbps mono, 44.1 kHz. Peso objetivo por archivo: < 2 MB.
- **Acento:** inglés neutro, **el mismo registro en los dos audios** para que la dificultad sea comparable.
- **Velocidad:** natural conversacional. No ralentizar artificialmente: el ejercicio entrena escucha real.
- **Ruido/ambiente:** limpio, sin música. Son notas de voz, no locución.
- **Sin efectos** de teléfono ni compresión "walkie-talkie": debe entenderse con claridad.

## Dirección de actuación

**Jess (novia)** — enojada, sarcástica, hablando rápido a una amiga. Las frases cortas y secas (`Face-down.`, `Boundaries. Please.`, `I crossed a line.`) van **planas, con pausa antes y después**. Las dos últimas líneas bajan de volumen: ahí aparece el dolor debajo de la rabia. Es lo que evalúa la pregunta de *Tone*.

**Tom (novio)** — controlado, defensivo, cansado. **No grita nunca.** Ritmo más lento que Jess. Pausa larga en `Look — maybe I could have handled the moment better. Maybe.`: el segundo *Maybe* es más bajo y más lento, porque es la concesión que retira enseguida. Cierra firme en la última línea.

---

## Guion 1 — Jess (girlfriend.mp3)

> Contexto: le está mandando un audio a su mejor amiga el sábado por la mañana.

```
Okay, I need to say this out loud, because I think I'm losing my mind.

You know how Tom leaves his phone everywhere? On the sofa, on the kitchen counter, face up, no problem.

Well, on Friday we're having dinner, his phone lights up, and he flips it over.

Face-down.

Didn't even look at me.

And I sat there for an hour pretending it was nothing.

So later I said, kind of joking, "let me see your phone."

And he goes: "no."

Not "sure, here." Not "why?" Just no.

Two years together, and the answer is no?

And then he starts explaining about privacy, and principles, and boundaries.

Boundaries. Please.

I wasn't going to read his messages. I wanted to watch him hand it over. That was the whole test.

Because if you've got nothing to hide, why does it cost you so much to prove it?

And the more he explained, the worse it sounded.

Nobody prepares a speech about privacy unless they've already been thinking about it.

He kept saying, "ask me anything, I'll tell you the truth."

Great. So I'm supposed to trust the man who won't let me check.

And now he's acting like I'm the one who did something wrong.

Apparently I "crossed a line."

I crossed a line.

Honestly, if he'd just given me the phone, I probably wouldn't even have opened it.

That's the part that kills me.
```

## Guion 2 — Tom (boyfriend.mp3)

> Contexto: le está mandando un audio a un amigo el mismo sábado.

```
Man, I don't even know how to explain this without sounding like the bad guy.

Friday night. Dinner. My phone lights up, I put it face-down.

I always put my phone face-down at dinner. I've done that since I was nineteen.

Apparently that's evidence now.

Later she asks to see my phone.

And look — there's nothing on that phone. Nothing.

Work group chats, my mother, football scores, forty photos of the dog.

But that's not the point.

The point is I'm not handing over my phone to prove I'm not a liar.

Because once you do that, that's the new normal, isn't it?

This month it's the phone. Next month it's my location, then it's who I had lunch with.

I told her: ask me anything. Anything at all. I'll answer.

She didn't want answers. She wanted the phone.

And I get it, I do. I know she's been hurt before, and I know her ex was genuinely awful.

But I'm not him.

I'm being investigated for something somebody else did.

And now I'm the suspicious one, because I said no.

That's the part I can't get past.

If saying no makes you guilty, then there's no answer that works.

Look — maybe I could have handled the moment better. Maybe.

But I'm not apologising for having a line.
```

---

## Reglas de sincronización con la página

El texto de los dos guiones **debe coincidir palabra por palabra** con las transcripciones en
`src/app/(site)/practica/the-locked-phone/locked-phone-data.ts`
(`GF_PARAGRAPHS` y `BF_PARAGRAPHS`). Los alumnos leen la transcripción mientras escuchan y marcan
palabras desconocidas: cualquier diferencia entre audio y texto rompe ese paso.

Si al grabar suena mejor cambiar una frase, cambia **primero** el archivo de datos, después el guion
de aquí, y solo entonces graba.

## Detalles que el quiz evalúa (no se pueden perder al regrabar)

| Detalle | Dónde | Por qué importa |
|---|---|---|
| `face-down` dicho por ambos | Jess línea 4 · Tom línea 2 | Es el **único hecho objetivo** que confirman las dos versiones (pregunta de Synthesis). |
| `Boundaries. Please.` | Jess | Eco sarcástico del vocabulario de Tom (pregunta de Vocabulary). |
| `Apparently I "crossed a line." / I crossed a line.` | Jess | Scare quotes: cita la acusación y la rechaza (pregunta de Register). La repetición debe sonar plana, no enfadada. |
| `having a line` | Tom, última línea | Misma metáfora que Jess, posición opuesta (pregunta final de Register). |
| `Maybe… Maybe.` | Tom | Non-apology (pregunta de Tone). |
| `I'm being investigated for something somebody else did.` | Tom | Metáfora legal — se siente juzgado por el ex de ella (pregunta de Inference). |
| Cierre bajo de Jess | `That's the part that kills me.` | Vulnerabilidad bajo la rabia (pregunta de Tone). |
