import type { LiveSet } from './types'

/**
 * NIVEL 3 — Desafío
 * Objetivo: el 40-55% acierta. Desafiante pero nunca frustrante.
 * Cada error tiene un "aha moment" pedagógico claro.
 * Mix: 4 audio (pares mínimos difíciles) + 4 gramática avanzada
 * Distractores: fonéticamente muy cercanos, 1-2 sílabas de diferencia
 */
const set: LiveSet = {
  id: 'coreano-nivel-3',
  title: 'Nivel 3 — Desafío',
  titleKo: '레벨 3 — 도전',
  lang: 'ko',
  difficulty: 3,
  questions: [
    // ── AUDIO 1 — ㄷ/ㅌ/ㄸ distinción ────────────────────────────────────
    {
      id: 'n3-a1',
      type: 'audio-listen',
      level: 'TOPIK-II',
      prompt: '🔊 Nivel máximo de atención. Consonante aspirada vs tensa vs suave.',
      audioText: '달',
      audioRate: 0.75,
      options: [
        { id: 'A', text: '탈', romanization: 'tal', meaning: 'Máscara / incidente' },
        { id: 'B', text: '딸', romanization: 'ttal', meaning: 'Hija' },
        { id: 'C', text: '달', romanization: 'dal', meaning: 'Luna / mes' },
        { id: 'D', text: '살', romanization: 'sal', meaning: 'Carne / edad' },
      ],
      correct: 'C',
      explanation:
        '달 = luna / mes. La triada ㄷ/ㅌ/ㄸ es uno de los retos fonéticos más grandes del coreano: ㄷ (lenis/suave), ㅌ (aspirada — con aire), ㄸ (tensa — sin aire, más fuerte). 달(luna) vs 탈(máscara/aspirada) vs 딸(hija/tensa). Diferencia solo en el tipo de consonante inicial.',
      trap:
        'Las tres difieren solo en cómo pronuncias la ㄷ. El truco para distinguirlas: pon la mano frente a la boca. 탈 (aspirada) = sientes aire. 달 (lenis) = poco aire. 딸 (tensa) = casi ningún aire, pero con tensión muscular.',
    },

    // ── AUDIO 2 — vocal larga vs corta ──────────────────────────────────────
    {
      id: 'n3-a2',
      type: 'audio-listen',
      level: 'TOPIK-II',
      prompt: '🔊 Atención a la duración de la vocal. Muy importante en TOPIK.',
      audioText: '눈이 와요',
      audioRate: 0.8,
      options: [
        { id: 'A', text: '눈이 와요', romanization: 'nun-i wayo', meaning: 'Viene la nieve' },
        { id: 'B', text: '눈이 예뻐요', romanization: 'nun-i yeppeoyo', meaning: 'Los ojos son bonitos' },
        { id: 'C', text: '눈이 나빠요', romanization: 'nun-i nappayo', meaning: 'La vista es mala' },
        { id: 'D', text: '눈을 감아요', romanization: 'nuneul gamayo', meaning: 'Cierra los ojos' },
      ],
      correct: 'A',
      explanation:
        '눈이 와요 = está nevando / la nieve viene. 눈 tiene dos significados: ojo (corto) y nieve (largo). En esta oración, 와요 (venir) solo tiene sentido con nieve. En TOPIK Listening te dan oraciones completas para desambiguar — el contexto (verbo 와요) confirma que es nieve, no ojo.',
      trap:
        'B, C, D también usan 눈 pero con el significado "ojo". La ambigüedad de 눈 es un clásico del TOPIK. La clave es siempre el verbo: 와요 (venir) → solo hace sentido con nieve.',
    },

    // ── AUDIO 3 — 한테 vs 한테서 vs 에게서 ──────────────────────────────────
    {
      id: 'n3-a3',
      type: 'audio-listen',
      level: 'TOPIK-II',
      prompt: '🔊 Escucha con atención la partícula completa.',
      audioText: '친구한테서 선물을 받았어요',
      audioRate: 0.82,
      options: [
        { id: 'A', text: '친구한테 선물을 받았어요', romanization: 'chinguhaente seonmureul badasseoyo', meaning: 'Le di un regalo al amigo' },
        { id: 'B', text: '친구한테서 선물을 받았어요', romanization: 'chinguhanteeseo seonmureul badasseoyo', meaning: 'Recibí un regalo del amigo' },
        { id: 'C', text: '친구에게 선물을 받았어요', romanization: 'chinguege seonmureul badasseoyo', meaning: '(Mixto — incorrecto)' },
        { id: 'D', text: '친구로부터 선물을 받았어요', romanization: 'chinguroubuteo seonmureul badasseoyo', meaning: 'Recibí un regalo de parte del amigo (escrito)' },
      ],
      correct: 'B',
      explanation:
        '한테서 = partícula de origen animado (de alguien). 받다 (recibir) requiere especificar el origen → 한테서. La diferencia: 한테 (dirección hacia), 한테서 (origen desde). Escuchaste la sílaba 서 al final de la partícula — ese 서 marca origen.',
      trap:
        'A es casi igual pero usa 한테 en lugar de 한테서 — un solo carácter de diferencia que invierte la dirección. D es equivalente pero más formal/escrito (로부터). El TOPIK Listening a menudo distingue 한테 vs 한테서.',
    },

    // ── AUDIO 4 — sandhi fonológico ──────────────────────────────────────────
    {
      id: 'n3-a4',
      type: 'audio-listen',
      level: 'TOPIK-II',
      prompt: '🔊 Cuidado: el Hangul se escribe de una forma y suena de otra. ¿Qué escribes?',
      audioText: '국물',
      audioRate: 0.78,
      options: [
        { id: 'A', text: '국물', romanization: 'gungmul', meaning: 'Caldo / consomé' },
        { id: 'B', text: '궁물', romanization: '(no existe)', meaning: '— no existe —' },
        { id: 'C', text: '국수', romanization: 'guksu', meaning: 'Fideos' },
        { id: 'D', text: '구물', romanization: '(no existe)', meaning: '— no existe —' },
      ],
      correct: 'A',
      explanation:
        '국물 se escribe 국물 pero suena [궁물] — la ㄱ final de 국 se convierte en ㅇ (nasal) antes de la ㅁ de 물. Esto es la nasalización: consonante oclusiva + consonante nasal → la oclusiva se nasaliza. Es un fenómeno fonológico sistemático en coreano.',
      trap:
        'La trampa es escribir lo que suenas (궁물) en lugar de lo que se escribe (국물). El Hangul refleja la escritura morfológica, no la pronunciación superficial. Los estudiantes que aprenden solo de oído cometen este error constantemente.',
    },

    // ── GRAMÁTICA 5 — -(으)면 vs -아/어서 ───────────────────────────────────
    {
      id: 'n3-g1',
      type: 'blank',
      level: 'TOPIK-II',
      context: 'Completa con el conector adecuado.',
      prompt: '열심히 공부하___ 좋은 점수를 받을 거예요.',
      options: [
        { id: 'A', text: '서 (porque)', romanization: 'seo' },
        { id: 'B', text: '면 (si / cuando)', romanization: 'myeon' },
        { id: 'C', text: '지만 (pero)', romanization: 'jiman' },
        { id: 'D', text: '고 (y luego)', romanization: 'go' },
      ],
      correct: 'B',
      explanation:
        '-(으)면 = si/cuando (condicional). "Si estudias mucho, sacarás buena nota." La frase implica una condición → resultado futuro. 아/어서 (A) indica causa, no condición: "porque estudias → resultado" — pero ese tipo de causalidad no funciona bien con futuro (거예요).',
      trap:
        'A (서) es la confusión más común en nivel intermedio. La diferencia: "porque estudié saqué buena nota" (pasado/presente, causa real) vs "si estudias sacarás buena nota" (hipótesis futura). El condicional -(으)면 con futuro es diferente de la causa aserverativa -서.',
    },

    // ── GRAMÁTICA 6 — 이/가 énfasis ────────────────────────────────────────
    {
      id: 'n3-g2',
      type: 'choice',
      level: 'TOPIK-II',
      context: 'Contexto: alguien pregunta "¿Quién fue?" y tú dices que fuiste tú, no otro.',
      prompt: '¿Cuál es la respuesta con énfasis correcto?',
      options: [
        { id: 'A', text: '저는 갔어요', romanization: 'jeoneun gasseoyo', meaning: 'Yo fui (neutro)' },
        { id: 'B', text: '제가 갔어요', romanization: 'jega gasseoyo', meaning: 'Fui YO (énfasis en sujeto)' },
        { id: 'C', text: '나는 갔어요', romanization: 'naneun gasseoyo', meaning: 'Yo fui (informal)' },
        { id: 'D', text: '내가 갔어요', romanization: 'naega gasseoyo', meaning: 'Fui yo (informal + énfasis)' },
      ],
      correct: 'B',
      explanation:
        '제가 갔어요 usa la partícula de sujeto 가 (con énfasis contrastivo) en lugar de 는 (tema neutro). Cuando quieres decir "fue YO, no otro" → usa 이/가. Cuando introduces un tema o cambias de tema → usa 은/는. Aquí el énfasis es "yo específicamente fui" → 제가.',
      trap:
        'A también es correcto pero suena neutro, no enfático. En la situación dada (alguien pregunta quién fue, tú enfatizas que fuiste tú), 제가 es la respuesta natural. D también sería enfático pero en registro informal (날 자신을).',
    },

    // ── GRAMÁTICA 7 — coreano completo ─────────────────────────────────────
    {
      id: 'n3-g3',
      type: 'korean-read',
      level: 'TOPIK-II',
      context: '다음 중 자연스러운 문장을 고르세요.',
      prompt: '다음 중 맞는 표현은 무엇입니까?',
      options: [
        { id: 'A', text: '어제 학교에 갔다가 왔어요', romanization: 'eoje hakgyoe gatdaga wasseoyo' },
        { id: 'B', text: '어제 학교에서 갔다가 왔어요', romanization: 'eoje hakgyoeseo gatdaga wasseoyo' },
        { id: 'C', text: '어제 학교에 갔고 왔어요', romanization: 'eoje hakgyoe gatgo wasseoyo' },
        { id: 'D', text: '어제 학교를 갔다가 왔어요', romanization: 'eoje hakgyoreul gatdaga wasseoyo' },
      ],
      correct: 'A',
      explanation:
        '-았/었다가 = "hice X y luego vine de vuelta" (acción completada + retorno). 학교에 갔다가 왔어요 = Fui a la escuela y regresé. Estructura: destino → 에 (no 에서 para movimiento, no 를 para destino). 갔고 (C) solo enlaza dos acciones sin el matiz de "ida y vuelta".',
      trap:
        'B es la trampa de 에 vs 에서: 에서 indica lugar de acción, no destino de movimiento. 가다 (ir) siempre va con 에, nunca con 에서. D usa 를 (objeto) con 가다 — incorrecto, 가다 no toma objeto directo.',
    },

    // ── GRAMÁTICA 8 — -아/어 드리다 ────────────────────────────────────────
    {
      id: 'n3-g4',
      type: 'formality',
      level: 'TOPIK-II',
      context: 'Quieres ofrecerle ayuda a alguien mayor que tú con la computadora.',
      prompt: '¿Cuál es la forma más apropiada?',
      options: [
        { id: 'A', text: '도와줄까요?', romanization: 'dowajulkkayo?' },
        { id: 'B', text: '도와드릴까요?', romanization: 'dowadeurilkkayo?' },
        { id: 'C', text: '도와줘요?', romanization: 'dowajwoyo?' },
        { id: 'D', text: '도와드려요?', romanization: 'dowadeuryeoyo?' },
      ],
      correct: 'B',
      explanation:
        '도와드릴까요 = ¿Le ayudo? (forma más respetuosa). 드리다 es el verbo humilde de 주다 — lo usas cuando el beneficiario es tu superior. -ㄹ까요 es la forma de ofrecer o proponer elegantemente. Es la combinación perfecta: humildad (드리다) + propuesta educada (-ㄹ까요).',
      trap:
        'A (도와줄까요) también es correcto pero usa 주다 (verbo neutro) en vez de 드리다 (humilde). Ante alguien mayor, siempre 드리다. D (도와드려요) es una declaración, no una oferta. -ㄹ까요 es específicamente para ofrecer o preguntar la preferencia del otro.',
    },
  ],
}

export default set
