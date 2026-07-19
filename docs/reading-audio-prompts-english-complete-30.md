# Audio prompts — English reading corpus (30)

Estado: prompts de producción listos; archivos de audio no generados; reproductores narrados invisibles hasta completar el lote y aprobarlo.

## Prompt maestro

> Read the exact targetText from the matching exercise JSON in clear, natural global English. Use one warm adult voice. Do not read the title, instructions, feedback, or any metadata. Preserve every word, name, number, contraction, punctuation pause, and regional spelling. Do not add, omit, paraphrase, or explain anything. Use 105–115 wpm for A1, 120–130 wpm for A2, and 135–145 wpm for B1. Deliver a clean mono WAV master and a web MP3. Report any transcript mismatch before editing anything.

Technical master: WAV mono, 48 kHz, 24 bit; MP3 mono, 128 kbps; -16 LUFS integrated; true peak no higher than -1 dBTP; 300 ms lead-in and 500 ms tail.

## Manifiesto

Use the `targetText` in each linked fixture as the locked transcript. The fixture ID is also the output filename stem.

| Nivel | Exercise ID |
| --- | --- |
| A1 | `en-a1-my-morning-at-the-cafe`, `en-a1-library-book-message`, `en-a1-saturday-bus-guide`, `en-a1-morning-school-note`, `en-a1-pet-clinic-card`, `en-a1-park-cleanup-poster`, `en-a1-lunch-menu`, `en-a1-lost-and-found-message`, `en-a1-train-platform-sign`, `en-a1-birthday-party-invite` |
| A2 | `en-a2-weekend-without-my-phone`, `en-a2-community-garden-email`, `en-a2-rainy-day-bus-change`, `en-a2-new-neighbour-welcome`, `en-a2-cooking-class-reminder`, `en-a2-school-exchange-diary`, `en-a2-recycling-collection-plan`, `en-a2-weekend-volunteer-shift`, `en-a2-museum-audio-guide`, `en-a2-first-job-interview` |
| B1 | `en-b1-four-day-work-week`, `en-b1-neighbourhood-repair-cafe`, `en-b1-library-study-zones`, `en-b1-remote-work-pilot`, `en-b1-community-energy-project`, `en-b1-urban-tree-plan`, `en-b1-online-course-completion`, `en-b1-local-food-cooperative`, `en-b1-workplace-mentoring`, `en-b1-public-transport-fare-change` |

## Validation prompt

> Compare this audio with the fixture’s targetText word by word. Report every omission, addition, substitution, repeated word, clipped sound, unnatural pause, pronunciation issue, background artifact, or speaker/accent mismatch. Return PASS only when the transcript matches literally and the technical specification passes. Do not repair or reinterpret the transcript.

Activation gate: every one of the 30 rows must have a master file, web file, literal transcript match, linguistic sign-off, technical sign-off, and duration. Until then, keep `audio: null`; the learner’s local recorder remains independent.
