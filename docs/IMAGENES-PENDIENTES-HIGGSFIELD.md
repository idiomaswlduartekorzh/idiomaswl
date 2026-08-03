# Imágenes pendientes — para generar a mano en Higgsfield

_Generado 2026-07-30. Cada fila = 1 imagen que falta. Copia el **PROMPT**, genera en Higgsfield, descarga y guarda en la **RUTA DESTINO**._

## Cómo usarlo (rápido)
- Motor sugerido: **Higgsfield → Nano Banana 2** (o **Nano Banana Pro** para más nitidez).
- Pega el prompt tal cual (están en inglés, es lo que mejor entiende el modelo).
- **No debe salir texto** en la imagen, salvo las 3 *charges* de CELPE que llevan diálogo (ahí sí va el texto que indico).
- Guarda con el **nombre exacto** de la ruta. Si una carpeta no existe, créala.
- ⚠️ Las rutas de imagen **todavía no están conectadas en el código** — eso es un paso aparte (yo lo hago después). Tú solo genera y guarda.

## Total a generar
| Bloque | Imágenes | Tipo | Prioridad |
|---|---|---|---|
| Goethe A1 — Bildkarten (Sprechen Teil 3) | 20 (17 únicas) | Ícono gris | Alta |
| CELPE-Bras — Elemento provocador | 20 | Foto / charge | Alta |
| FCE (Cambridge B2) — Speaking Part 2 | 2 | Foto realista | Media |
| TOEFL — foto de hablante (opcional) | hasta 60 | Foto escena | Baja/opcional |

---

# 1) GOETHE A1 — Bildkarten (Sprechen, Teil 3)

**Estilo fijo (igual para las 20):** ícono *clip-art* plano, **un solo objeto**, contorno negro grueso, **solo escala de grises (sin color)**, centrado en un azulejo gris claro con esquinas redondeadas, márgenes blancos, sin texto ni números. **Formato 1:1.**

> Plantilla de prompt (cambia solo el objeto en MAYÚSCULA):
> `Simple flat 2D clip-art icon of a single OBJECT, thick black outline, grayscale only (no color), centered on a light-gray rounded-square tile, minimalist vintage clip-art illustration style like a language-exam picture card, plain white margins, no text, no letters, no numbers`

| ID | Ruta destino | Objeto | OBJECT a poner en el prompt |
|---|---|---|---|
| G-A1-S1-1 | `public/images/goethe/a1/set-1/teil3-1-fenster.png` | Ventana (Fenster) | `an open window` |
| G-A1-S1-2 | `public/images/goethe/a1/set-1/teil3-2-licht.png` | Lámpara (Licht) | `a switched-on table lamp` |
| G-A1-S1-3 | `public/images/goethe/a1/set-1/teil3-3-handy.png` | Celular (Handy) | `a smartphone / mobile phone` |
| G-A1-S1-4 | `public/images/goethe/a1/set-1/teil3-4-glas-wasser.png` | Vaso de agua | `a glass of water` |
| G-A1-S2-1 | `public/images/goethe/a1/set-2/teil3-1-tuer.png` | Puerta (Tür) | `a closed door` |
| G-A1-S2-2 | `public/images/goethe/a1/set-2/teil3-2-stift.png` | Bolígrafo (Stift) | `a pen` |
| G-A1-S2-3 | `public/images/goethe/a1/set-2/teil3-3-heizung.png` | Radiador (Heizung) | `a radiator (heating)` |
| G-A1-S2-4 | `public/images/goethe/a1/set-2/teil3-4-kaffee.png` | Café (Kaffee) | `a cup of coffee` |
| G-A1-S3-1 | `public/images/goethe/a1/set-3/teil3-1-salz.png` | Salero (Salz) | `a salt shaker` |
| G-A1-S3-2 | `public/images/goethe/a1/set-3/teil3-2-fenster.png` | Ventana (reutiliza G-A1-S1-1) | `an open window` |
| G-A1-S3-3 | `public/images/goethe/a1/set-3/teil3-3-musik.png` | Radio/música | `a small radio with music notes` |
| G-A1-S3-4 | `public/images/goethe/a1/set-3/teil3-4-tragen.png` | Ayudar a cargar | `two heavy suitcases stacked` |
| G-A1-S4-1 | `public/images/goethe/a1/set-4/teil3-1-rechnung.png` | Cuenta/factura | `a restaurant bill on a small plate` |
| G-A1-S4-2 | `public/images/goethe/a1/set-4/teil3-2-licht.png` | Luz (reutiliza G-A1-S1-2) | `a switched-on table lamp` |
| G-A1-S4-3 | `public/images/goethe/a1/set-4/teil3-3-weg.png` | Mostrar el camino | `a folded city street map` |
| G-A1-S4-4 | `public/images/goethe/a1/set-4/teil3-4-foto.png` | Cámara (Foto) | `a photo camera` |
| G-A1-S5-1 | `public/images/goethe/a1/set-5/teil3-1-zeitung.png` | Periódico (Zeitung) | `a folded newspaper` |
| G-A1-S5-2 | `public/images/goethe/a1/set-5/teil3-2-fenster.png` | Ventana (reutiliza G-A1-S1-1) | `an open window` |
| G-A1-S5-3 | `public/images/goethe/a1/set-5/teil3-3-computer.png` | Computador | `a desktop computer` |
| G-A1-S5-4 | `public/images/goethe/a1/set-5/teil3-4-kuchen.png` | Trozo de pastel | `a slice of cake on a plate` |

**Atajo:** ventana (G-A1-S1-1) y lámpara (G-A1-S1-2) se repiten → genera 1 vez y copia el archivo a las rutas repetidas. Son **17 imágenes únicas**.

---

# 2) CELPE-BRAS — Elemento provocador (Parte Oral)

**Estilo fijo para las FOTOS:** fotografía realista, documental, contexto brasileño, luz natural, **sin texto ni marcas de agua**. **Formato 4:3.**
**Estilo fijo para las CHARGES (viñetas):** dibujo de *charge* editorial brasileña, un solo cuadro, línea simple, humor social; **incluye los bocadillos con el texto en portugués que indico**. **Formato 4:3.**

| ID | Ruta destino | Tipo | PROMPT (pégalo) |
|---|---|---|---|
| CELPE-1 | `public/images/celpe-bras/set-1/elemento-provocador.png` | Foto | `Realistic documentary aerial photograph of a Brazilian city showing a dense favela right next to a luxury high-rise gated condominium, strong social contrast, natural daylight, no text, no watermark` |
| CELPE-2 | `public/images/celpe-bras/set-2/elemento-provocador.png` | Charge | `Brazilian editorial cartoon (charge), single panel, simple clean line art: a person sitting surrounded by glowing screens (smartphone, computer, television), while a window behind shows a sunny day with people chatting outdoors; satirical tone, no caption text` |
| CELPE-3 | `public/images/celpe-bras/set-3/elemento-provocador.png` | Foto | `Realistic street photograph of a Brazilian city: a road jammed with cars next to an overcrowded bus, and an empty bike lane beside them, urban mobility contrast, daylight, no text` |
| CELPE-4 | `public/images/celpe-bras/set-4/elemento-provocador.png` | Foto | `Realistic photograph of a Brazilian beach split in two halves: one side clean and tidy, the other side covered in trash and plastic bottles, environmental contrast, daylight, no text` |
| CELPE-5 | `public/images/celpe-bras/set-5/elemento-provocador.png` | Charge | `Brazilian editorial cartoon (charge), single panel, simple line art: a young man at a job interview; the interviewer asks and the young man answers, with two speech bubbles in Portuguese — interviewer: "Qual é a sua experiência?" and young man: "Estou procurando o primeiro emprego para ter experiência." Clear readable Portuguese text in the bubbles` |
| CELPE-6 | `public/images/celpe-bras/set-6/elemento-provocador.png` | Foto | `Realistic photograph of a family gathered at the dinner table, but each person is looking at their own smartphone instead of talking, warm indoor light, no text` |
| CELPE-7 | `public/images/celpe-bras/set-7/elemento-provocador.png` | Foto | `Realistic photograph of a young app-delivery courier cycling in the rain with a large insulated backpack, in heavy city traffic in Brazil, no text` |
| CELPE-8 | `public/images/celpe-bras/set-8/elemento-provocador.png` | Foto | `Realistic photograph of a long queue of people waiting outside a public health clinic under strong sun, Brazilian context, no text` |
| CELPE-9 | `public/images/celpe-bras/set-9/elemento-provocador.png` | Foto | `Realistic photograph of a child doing homework on the sidewalk under a street lamp at night because there is no electricity at home, emotional documentary tone, Brazilian context, no text` |
| CELPE-10 | `public/images/celpe-bras/set-10/elemento-provocador.png` | Foto | `Realistic photograph contrast: a crowded shopping mall on one side and, next to it, an empty traditional small-shop street with closed stores, daylight, Brazilian context, no text` |
| CELPE-11 | `public/images/celpe-bras/set-11/elemento-provocador.png` | Foto | `Realistic photograph of a street: a plain gray wall on one side and, across the same street, a large colorful graffiti mural depicting local culture characters, daylight, no text` |
| CELPE-12 | `public/images/celpe-bras/set-12/elemento-provocador.png` | Foto | `Realistic photograph of an elderly person sitting alone on a public square bench, looking at a lively group of young people chatting a little further away, soft daylight, no text` |
| CELPE-13 | `public/images/celpe-bras/set-13/elemento-provocador.png` | Foto | `Realistic photograph of a huge open-air landfill with mountains of discarded clothes, some still with price tags attached, unused, environmental documentary tone, no text` |
| CELPE-14 | `public/images/celpe-bras/set-14/elemento-provocador.png` | Foto | `Realistic photograph of schoolchildren working together in a vegetable garden, smiling, hands in the soil, sunny day, Brazilian school context, no text` |
| CELPE-15 | `public/images/celpe-bras/set-15/elemento-provocador.png` | Foto | `Realistic photograph contrast: an almost empty cinema hall on one side and, on the other, a person alone at home watching a movie on their phone in bed, no text` |
| CELPE-16 | `public/images/celpe-bras/set-16/elemento-provocador.png` | Foto | `Realistic photograph of a busy city street full of security cameras and large screens, with people walking while staring at their phones, surveillance-society mood, no text` |
| CELPE-17 | `public/images/celpe-bras/set-17/elemento-provocador.png` | Foto | `Realistic photograph of a colorful, busy Brazilian street-food stall, with people of different ages and social classes eating together on the sidewalk, lively, no text` |
| CELPE-18 | `public/images/celpe-bras/set-18/elemento-provocador.png` | Foto | `Realistic photograph of a busy open-air street market (feira livre) with colorful fruit and vegetable stalls and people chatting animatedly with the vendors, sunny, Brazilian context, no text` |
| CELPE-19 | `public/images/celpe-bras/set-19/elemento-provocador.png` | Charge | `Brazilian editorial cartoon (charge), single panel, simple line art: at a supermarket, one person refuses a plastic bag while another comments; three speech bubbles in Portuguese — person A: "Não, obrigado.", person B: "De que adianta? Não vai mudar nada.", person A: "Se todos pensassem assim, nunca mudaria." Clear readable Portuguese text in the bubbles` |
| CELPE-20 | `public/images/celpe-bras/set-20/elemento-provocador.png` | Foto | `Realistic photograph of a large circle of people of different ages, ethnicities and styles, all holding hands, smiling, in a public square during a cultural festival, joyful, Brazilian context, no text` |

---

# 3) FCE (Cambridge B2) — Speaking Part 2 (comparar 2 fotos)

**Estilo:** fotografía realista, natural, gente real, **sin texto**. **Formato 4:3.** (Set 1; los demás sets no traen fotos definidas todavía.)

| ID | Ruta destino | PROMPT |
|---|---|---|
| FCE-S1-A | `public/images/cambridge-b2/set-1/speaking-photo-a.png` | `Realistic photograph of a student studying alone late at night at a desk, surrounded by textbooks and notes, focused, warm lamp light, no text` |
| FCE-S1-B | `public/images/cambridge-b2/set-1/speaking-photo-b.png` | `Realistic photograph of a group of students discussing and collaborating around a table in a library, engaged and talking, daylight, no text` |

---

# 4) TOEFL — foto de hablante (OPCIONAL)

El examen **funciona sin estas imágenes**. Solo si quieres el toque visual del formato 2026. **Estilo:** foto neutra, realista, sin texto. **Formato 16:9.**
Por cada set (`set-1` … `set-20`) hay 3 escenas. Ruta: `public/images/toefl/set-N/...`.

| Nombre archivo (por set) | PROMPT |
|---|---|
| `speaker-conversation.png` | `Realistic neutral photograph of two university students having a casual conversation on a campus, natural daylight, no text` |
| `speaker-announcement.png` | `Realistic neutral photograph of a person making an announcement at a campus office or over a speaker, professional, no text` |
| `speaker-lecture.png` | `Realistic neutral photograph of a professor giving a lecture in front of a university class, no text` |

> Si las haces, repite las 3 para cada set que quieras (set-1…set-20). No es obligatorio.

---

## Resumen de prioridad
1. **Goethe A1** (17 únicas) — el examen las pide de verdad.
2. **CELPE** (20) — el examen las pide de verdad.
3. **FCE** (2) — set-1.
4. **TOEFL** (opcional) — solo si sobra tiempo.

Cuando termines de generarlas y guardarlas en esas rutas, avísame y **yo las conecto en el código** para que aparezcan en cada examen.
