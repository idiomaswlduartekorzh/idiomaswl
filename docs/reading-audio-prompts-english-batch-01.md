# Prompts de audio — lote inglés A1, A2 y B1

Estado: prompts listos · archivos no generados · audio narrado invisible en la interfaz. La grabadora privada del estudiante es independiente y guarda solamente en su dispositivo.

## Regla de activación

No añadir `audio.src` ni mostrar reproductores de narración hasta que las seis lecturas tengan WAV maestro, MP3 web, coincidencia literal con la transcripción, aprobación lingüística, aprobación técnica y duración registrada. Hasta entonces cada ejercicio conserva `"audio": null`.

## Especificación maestra

- Una voz adulta cálida y natural por lectura; inglés global claro, sin tono publicitario ni infantil.
- Leer solamente la transcripción bloqueada: sin título, instrucciones, comentarios o despedida.
- Pausas naturales en puntuación; no enfatizar respuestas de forma artificial.
- 300 ms de silencio inicial y 500 ms final.
- WAV mono, 48 kHz, 24 bit; MP3 mono, 128 kbps.
- Objetivo: -16 LUFS integrados y pico verdadero máximo de -1 dBTP.
- Nombre: `<exercise-id>.wav` y `<exercise-id>.mp3`.

## 01 — A1 · Your Library Book Is Ready

**Dirección:** Read in clear global English at 105–115 words per minute. Keep the tone friendly and practical, like a short personal message. Pronounce “six o’clock”, “Mrs Green”, “front desk”, and “until Monday” clearly. Do not add or remove any word.

**Transcripción bloqueada:**

> Hi Leo, your English book is ready at the library. You can collect it after school today. The library closes at six o’clock. Please bring your student card. The book is on the front desk beside the blue box. If you cannot come today, call Mrs Green before five. She can keep the book for you until Monday.

## 02 — A1 · Saturday Bus 12

**Dirección:** Read in clear global English at 105–115 words per minute. Sound like a calm public-information announcement. Keep numbers and place names distinct, but do not exaggerate them. Do not add or remove any word.

**Transcripción bloqueada:**

> On Saturday, the number 12 bus leaves Central Station every thirty minutes. The first bus leaves at eight o’clock, and the last bus leaves at six in the evening. A ticket costs two pounds. Children under five travel free. The bus stops at the museum, the city park, and Riverside Market. Passengers for the hospital should get off at the city park and walk for five minutes.

## 03 — A2 · A Weekend Without My Phone

**Dirección:** Read in natural global English at 120–130 words per minute. Use a relaxed storytelling tone. Let Maya’s initial worry and later calm be audible without becoming theatrical. Keep “Sam”, “flower shop”, and “realised” clear. Do not add or remove any word.

**Transcripción bloqueada:**

> Last Saturday, Maya left her phone at home by accident. She noticed it when the bus arrived, but she did not go back. At first, she felt nervous because she could not check the map or message her friend Sam. She asked the driver where to get off and wrote the stop name on a paper ticket. At the market, Maya waited beside the flower shop, their usual meeting place. Sam arrived ten minutes later. Without their phones, they looked carefully at the stalls, talked to the sellers, and tried a new fruit drink. Maya bought a small notebook to record places she wanted to visit. On the bus home, she realised that the day had felt longer and calmer. She still uses her phone every day, but now she sometimes leaves it in her bag when she meets friends.

## 04 — A2 · Help Us Prepare the Community Garden

**Dirección:** Read in natural global English at 120–130 words per minute. Sound organised and welcoming, like a coordinator reading a community email. Pause lightly after the subject line and list items. Keep the date, meeting time, weather condition, and reply deadline precise. Do not add or remove any word.

**Transcripción bloqueada:**

> Subject: Help us prepare the community garden. Hello neighbours, we are getting the community garden ready for spring on Sunday, 14 April. We will meet at the main gate at nine thirty and finish around one. First, we are going to remove dry leaves and prepare four planting areas. After that, volunteers can choose between painting the wooden signs and planting herbs. Please wear old clothes and closed shoes. Bring gardening gloves if you have them, but we can lend tools and gloves to twenty people. The weather forecast says there may be light rain, so we will work unless there is a storm. Children are welcome with an adult. At midday, the café across the street will provide soup and bread. To help us plan the food, reply to this email before Thursday and tell us how many people are coming. Thank you, Lina, Garden coordinator.

## 05 — B1 · Why an Office Tried a Four-Day Week

**Dirección:** Read in clear global English at 135–145 words per minute. Use a neutral, informative article style. Signal contrasts such as “Instead”, “However”, and “Still” with natural intonation, not long pauses. Pronounce “Bristol”, “productivity”, “overtime”, and “client satisfaction” carefully. Do not add or remove any word.

**Transcripción bloqueada:**

> For three months, a small design company in Bristol tested a four-day working week. Employees worked from Monday to Thursday but received the same monthly salary. The experiment did not mean fitting forty hours into four very long days. Instead, teams shortened meetings, protected periods of quiet work, and stopped sending routine internal emails. The office was also closed on Fridays. At the beginning, several clients worried that urgent requests would wait until Monday. The company responded by creating a shared emergency phone that one manager carried each Friday. In practice, the phone rang only twice during the entire trial. Productivity, measured by completed client projects, rose slightly. Sick days fell, and most employees said they had more energy on Monday mornings. Managers also asked employees to record overtime, so hidden extra work would not make the results look better. However, the change created pressure in the finance team, whose monthly deadlines could not always move. During the final month, the company allowed that team to rotate its day off instead of closing completely. The trial did not prove that every organisation should adopt the same schedule. A hospital, a school, and a design office have very different responsibilities. Still, the experiment showed that reducing working time depends on redesigning work, not simply removing a day. The company decided to continue the policy for another six months while tracking client satisfaction and staff workload.

## 06 — B1 · The Repair Café That Changed a Neighbourhood

**Dirección:** Read in clear global English at 135–145 words per minute. Use an engaging but factual feature-article tone. Keep the Canadian setting and the name “Amira Khan” natural. Make the shift from repairing objects to sharing knowledge audible through phrasing, without dramatizing it. Do not add or remove any word.

**Transcripción bloqueada:**

> Every second Saturday, the basement of a public library in Toronto fills with broken lamps, silent radios, torn backpacks, and people who do not want to throw them away. The event is called a repair café, although it sells neither repairs nor coffee. Volunteers with practical skills sit beside the owners and try to understand what has gone wrong. The owners are expected to watch, ask questions, and help. The project began when local resident Amira Khan noticed how many small appliances appeared on the street before rubbish collection day. She invited three neighbours to repair objects in her garage. Twenty people arrived at the first meeting, and the garage quickly became too small. The library offered its basement, while a nearby bakery began donating drinks and bread. Not everything can be saved. Some devices need unavailable parts, and volunteers refuse to open equipment that may be dangerous. Even unsuccessful repairs can be useful, however, because owners learn why an object failed and how to buy a longer-lasting replacement. Over two years, the group has examined more than eight hundred items and repaired about sixty percent of them. Amira believes the numbers tell only part of the story. Teenagers have learned sewing from retired neighbours, newcomers have practised English while fixing bicycles, and people who once came with broken objects now return as volunteers. The café has therefore become less about saving individual products and more about sharing knowledge that a neighbourhood already possesses.

## Prompt de control por archivo

> Compare this audio with its locked transcript word by word. Report every omission, addition, substitution, repetition, clipped sound, unnatural pause, background artifact, pronunciation problem, or speaker/accent mismatch. Return PASS only when the spoken content is exact and the technical delivery meets the master specification. Do not repair or reinterpret the transcript.

## Manifiesto de salida

| Ejercicio | WAV | MP3 | Coincidencia literal | Lingüística | Técnica | Duración |
| --- | --- | --- | --- | --- | --- | --- |
| en-a1-library-book-message | pendiente | pendiente | pendiente | pendiente | pendiente | pendiente |
| en-a1-saturday-bus-guide | pendiente | pendiente | pendiente | pendiente | pendiente | pendiente |
| en-a2-weekend-without-my-phone | pendiente | pendiente | pendiente | pendiente | pendiente | pendiente |
| en-a2-community-garden-email | pendiente | pendiente | pendiente | pendiente | pendiente | pendiente |
| en-b1-four-day-work-week | pendiente | pendiente | pendiente | pendiente | pendiente | pendiente |
| en-b1-neighbourhood-repair-cafe | pendiente | pendiente | pendiente | pendiente | pendiente | pendiente |
