# TOEFL 2026 — expansión fija de Speaking en Sets 1–20

Fecha: 14 de agosto de 2026

Estado: composición escrita 11/11 integrada; cuarenta audios nuevos bloqueados

## Resultado

Cada simulacro contiene ahora la composición reproducible elegida para Speaking:

- siete Listen and Repeat;
- cuatro Take an Interview;
- once interacciones totales por set.

Los cinco Repeat y cuatro Interview existentes se conservan sin editar. Se añadieron
únicamente Repeat 6 y 7: cuarenta guiones nuevos para los veinte sets.

## Diseño editorial

- Item 6: 15–16 palabras en el lote real, dentro del contrato de 15–17;
- Item 7: 18–22 palabras en el lote real, dentro del contrato de 18–24;
- cuarenta oraciones únicas, naturales y autocontenidas;
- progresión de memoria respecto a los primeros cinco Repeat de cada set;
- un rol `woman` y uno `man` por set, veinte asignaciones de cada rol en total;
- situaciones ficticias de vida universitaria, sin copiar prompts ni audio ETS.

Los guiones son contenido original de WeLearn. No se presentan como material oficial y
no contienen afirmaciones académicas externas que requieran atribución factual.

## Medios y runtime

Los cuarenta medios usan rutas planeadas `repeat-6.mp3` y `repeat-7.mp3`, pero su estado
es `script-ready-audio-blocked`. El manifiesto de liberación está vacío. La interfaz:

- no intenta reproducir una ruta inexistente;
- rotula el ítem como revisión editorial;
- permite al owner revelar el texto del guion;
- no lo cuenta como respondido;
- no lo incluye en la autoevaluación oral mientras falte el audio.

Los cien MP3 Repeat existentes permanecen intactos. La brecha total que deberá presentar
el gate de audio pasa a 320 piezas TTS nuevas: 280 Listening + 40 Speaking, más cualquier
corte derivado de Conversation que se apruebe sin TTS.

## Evidencia

- `check:toefl-fixed-speaking`: PASS Sets 1–20;
- `test:toefl-fixed-speaking`: 2/2 PASS;
- TypeScript: PASS;
- ESLint dirigido: PASS;
- 40/40 IDs, media IDs, rutas y guiones únicos;
- ningún MP3, WAV, M4A u OGG modificado.

## Estado de producto

La composición escrita alcanza 97/97 en cada set: Reading 40, Listening 34, Writing 12
y Speaking 11. Esto todavía no significa producto terminado. Siguen pendientes los 21
medios nuevos por set, los posibles cortes de Conversation, navegación Listening
forward-only, cierres y relojes por módulo/tarea, captura/evaluación oral honesta,
resultados sin banda inventada, preview editorial y VoiceOver T16/T17.
