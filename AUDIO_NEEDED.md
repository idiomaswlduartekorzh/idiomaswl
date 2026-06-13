# Audios necesarios para la sección Práctica

Este archivo documenta todos los audios que se necesitan grabar para completar los ejercicios de Escucha A1 en la sección de Práctica.

---

## Inglés A1 — Listening

**Carpeta destino:** `public/audio/practica/ingles/a1/`

| Archivo | Texto a grabar | Hablante | Duración est. | Notas |
|---------|---------------|----------|---------------|-------|
| `dialogue-01-intro.mp3` | "Hi! My name is Tom. I am 25 years old. I live in London." | Nativo inglés (M) | ~8s | Voz clara, ritmo normal |
| `dialogue-02-daily-routine.mp3` | "Every morning I take the bus to work. I work in an office." | Nativo inglés (M) | ~7s | Ritmo moderado |
| `dialogue-03-likes.mp3` | "I like coffee, music, and reading books." | Nativo inglés (M) | ~5s | |
| `dialogue-04-family.mp3` | "My family is in Canada. I call them every weekend." | Nativo inglés (M) | ~6s | |
| `listening-q1-fill.mp3` | Pasaje completo del texto de lectura A1 leído en voz alta | Nativo inglés (M) | ~30s | Para ejercicio "escucha y completa" |
| `survival-phrases.mp3` | Las 10 frases de supervivencia del ejercicio Habla A1 | Nativo inglés (M/F) | ~60s | Cada frase con pausa de 3s |

---

## Francés A1 — Listening

**Carpeta destino:** `public/audio/practica/frances/a1/`

| Archivo | Texto a grabar | Hablante | Duración est. | Notas |
|---------|---------------|----------|---------------|-------|
| `dialogue-01-sophie.mp3` | "Bonjour! Je m'appelle Sophie. J'ai vingt ans. J'habite à Paris." | Nativo francés (F) | ~8s | Acento parisino |
| `dialogue-02-famille.mp3` | "J'ai un frère et une sœur. Mon frère s'appelle Paul." | Nativo francés (F) | ~7s | |
| `dialogue-03-matin.mp3` | "Chaque matin, je bois du café et je mange une baguette." | Nativo francés (F) | ~7s | |
| `dialogue-04-loisirs.mp3` | "J'étudie le français à l'université. J'aime lire et écouter de la musique." | Nativo francés (F) | ~8s | |
| `listening-q1-fill.mp3` | Texto completo de Sophie leído despacio | Nativo francés (F) | ~35s | Para fill-in-the-blanks |
| `survival-phrases.mp3` | Las 10 frases de supervivencia del ejercicio A1 | Nativo francés (M/F) | ~65s | Con pausa de 3s entre frases |

---

## Portugués A1 — Listening

**Carpeta destino:** `public/audio/practica/portugues/a1/`

| Archivo | Texto a grabar | Hablante | Duración est. | Notas |
|---------|---------------|----------|---------------|-------|
| `dialogue-01-carlos.mp3` | "Olá! Meu nome é Carlos. Tenho trinta anos. Moro em São Paulo." | Nativo BR-PT (M) | ~8s | Acento brasileiro |
| `dialogue-02-familia.mp3` | "Moro em São Paulo com minha esposa e meu filho." | Nativo BR-PT (M) | ~6s | |
| `dialogue-03-trabalho.mp3` | "Trabalho num escritório perto de casa. Todo dia tomo café da manhã." | Nativo BR-PT (M) | ~8s | |
| `dialogue-04-fim-semana.mp3` | "No fim de semana, gosto de ir ao parque. Adoro futebol e música brasileira." | Nativo BR-PT (M) | ~8s | |
| `listening-q1-fill.mp3` | Texto completo de Carlos leído despacio | Nativo BR-PT (M) | ~35s | |
| `survival-phrases.mp3` | Las 10 frases de supervivencia | Nativo BR-PT (M/F) | ~65s | Con pausa de 3s entre frases |

---

## Alemán A1 — Listening

**Carpeta destino:** `public/audio/practica/aleman/a1/`

| Archivo | Texto a grabar | Hablante | Duración est. | Notas |
|---------|---------------|----------|---------------|-------|
| `dialogue-01-anna.mp3` | "Hallo! Ich heiße Anna. Ich bin 22 Jahre alt. Ich wohne in Berlin." | Nativo DE (F) | ~8s | Pronunciación clara |
| `dialogue-02-familie.mp3` | "Ich habe einen Bruder, er heißt Klaus." | Nativo DE (F) | ~5s | |
| `dialogue-03-morgen.mp3` | "Jeden Morgen trinke ich Kaffee und esse Brot." | Nativo DE (F) | ~6s | |
| `dialogue-04-freizeit.mp3` | "Ich lerne Deutsch an der Universität. Am Wochenende gehe ich mit Freunden ins Kino." | Nativo DE (F) | ~9s | |
| `listening-q1-fill.mp3` | Texto completo de Anna leído despacio | Nativo DE (F) | ~35s | |
| `survival-phrases.mp3` | Las 10 frases de supervivencia | Nativo DE (M/F) | ~70s | Con pausa de 3s entre frases |

---

## Especificaciones técnicas para todos los audios

- **Formato:** MP3, 128kbps mínimo (192kbps preferido)
- **Frecuencia de muestreo:** 44.1 kHz
- **Canales:** Mono o estéreo (mono es suficiente)
- **Fondo:** Sin música ni ruido de fondo
- **Nivel de volumen:** Normalizado a -16 LUFS
- **Velocidad:** Normal (no lenta a menos que se especifique)

## Cómo usar estos audios cuando estén listos

1. Colocar los archivos en las carpetas indicadas
2. En cada `EscuchaA1` component, reemplazar el placeholder con el player real usando WaveSurfer.js (ya está instalado en el proyecto como `@wavesurfer/react`)
3. El componente `WaveSurfer` ya se usa en `/practica/the-grandmothers-ledger` — usar ese como referencia de implementación

## Prioridad de grabación

1. **Alta:** Inglés A1 — survival-phrases.mp3 y listening-q1-fill.mp3 (mayor demanda)
2. **Alta:** Francés A1 — survival-phrases.mp3
3. **Media:** Portugués A1 — todos
4. **Media:** Alemán A1 — todos
