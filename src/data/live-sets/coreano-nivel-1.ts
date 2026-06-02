import type { LiveSet } from './types'

/**
 * NIVEL 1 — Fácil y divertido
 * Objetivo: enganchar, no frustrar. Que el 70-80% acierte.
 * Mix: 4 audio-listen (saludos/básico) + 4 gramática básica
 * Distractores: muy distintos entre sí — gap grande
 */
const set: LiveSet = {
  id: 'coreano-nivel-1',
  title: 'Nivel 1 — Saludos y básico',
  titleKo: '레벨 1 — 인사와 기초',
  lang: 'ko',
  difficulty: 1,
  nextSetId: 'coreano-nivel-2',
  questions: [
    // ── AUDIO 1 ─────────────────────────────────────────────────────────────
    {
      id: 'n1-a1',
      type: 'audio-listen',
      level: 'A1',
      prompt: '🔊 Escucha con atención. ¿Cuál de estas palabras acabas de escuchar?',
      audioText: '감사합니다',
      audioRate: 0.8,
      options: [
        { id: 'A', text: '감사합니다', romanization: 'gamsahamnida', meaning: 'Gracias (formal)' },
        { id: 'B', text: '죄송합니다', romanization: 'jwesonghamnida', meaning: 'Lo siento (formal)' },
        { id: 'C', text: '안녕하세요', romanization: 'annyeonghaseyo', meaning: 'Hola' },
        { id: 'D', text: '잘 지내요', romanization: 'jal jinaeyo', meaning: '¿Cómo estás?' },
      ],
      correct: 'A',
      explanation:
        '감사합니다 es "gracias" en nivel formal-escrito. La confusión más común es con 죄송합니다 (lo siento) porque ambas terminan en 합니다 — la diferencia está en las primeras sílabas: 감사 (gratitud) vs 죄송 (disculpa).',
      trap:
        '죄송합니다 suena similar al final, pero empieza diferente. Entrena el oído desde las primeras sílabas, no solo el final.',
    },

    // ── AUDIO 2 ─────────────────────────────────────────────────────────────
    {
      id: 'n1-a2',
      type: 'audio-listen',
      level: 'A1',
      prompt: '🔊 Escucha. ¿Qué palabra es?',
      audioText: '맛있어요',
      audioRate: 0.85,
      options: [
        { id: 'A', text: '맛없어요', romanization: 'madeopseoyo', meaning: 'No está rico' },
        { id: 'B', text: '맛있어요', romanization: 'masisseoyo', meaning: 'Está rico / delicioso' },
        { id: 'C', text: '배고파요', romanization: 'baegopayo', meaning: 'Tengo hambre' },
        { id: 'D', text: '먹어요', romanization: 'meogeoyo', meaning: 'Como / estoy comiendo' },
      ],
      correct: 'B',
      explanation:
        '맛있어요 = está rico. El truco: 맛있 (sabe bien) vs 맛없 (no sabe bien). En oral, 맛있어요 suena más "lleno" — la sílaba 있 tiene la vocal ㅣ que sube el tono. 맛없어요 suena más "cortado" por la ㅂ final de 없.',
      trap:
        'A (맛없어요) es la trampa perfecta — difieren solo en 있 vs 없. Visualmente son casi iguales y fonéticamente muy parecidas. El truco es escuchar la vocal del medio: ì (있) suena arriba, eo (없) suena abajo.',
    },

    // ── AUDIO 3 ─────────────────────────────────────────────────────────────
    {
      id: 'n1-a3',
      type: 'audio-listen',
      level: 'A1',
      prompt: '🔊 ¿Cuál es?',
      audioText: '어디예요',
      audioRate: 0.85,
      options: [
        { id: 'A', text: '뭐예요', romanization: 'mwoyeyo', meaning: '¿Qué es?' },
        { id: 'B', text: '누구예요', romanization: 'nuguyeyo', meaning: '¿Quién es?' },
        { id: 'C', text: '어디예요', romanization: 'eodiyeyo', meaning: '¿Dónde está?' },
        { id: 'D', text: '언제예요', romanization: 'eonjeyeyo', meaning: '¿Cuándo es?' },
      ],
      correct: 'C',
      explanation:
        '어디예요 = ¿dónde está? Es la pregunta de lugar. La familia de preguntas en coreano: 뭐 (qué), 누구 (quién), 어디 (dónde), 언제 (cuándo), 왜 (por qué), 어떻게 (cómo). Cada una empieza diferente — entrenando el oído desde la primera sílaba.',
      trap:
        'Las 4 opciones terminan en 예요, por eso la clave está en la PRIMERA sílaba: eo-di (어디) vs mwo (뭐) vs nu-gu (누구) vs eon-je (언제). ',
    },

    // ── AUDIO 4 ─────────────────────────────────────────────────────────────
    {
      id: 'n1-a4',
      type: 'audio-listen',
      level: 'A1',
      prompt: '🔊 Escucha despacio. ¿Cuál sonó?',
      audioText: '괜찮아요',
      audioRate: 0.75,
      options: [
        { id: 'A', text: '관찮아요', romanization: '(incorrecta)', meaning: '— no existe —' },
        { id: 'B', text: '괜찮아요', romanization: 'gwaenchanayo', meaning: 'Está bien / no pasa nada' },
        { id: 'C', text: '좋아요', romanization: 'joayo', meaning: 'Bien / me gusta' },
        { id: 'D', text: '싫어요', romanization: 'sireoyo', meaning: 'No me gusta' },
      ],
      correct: 'B',
      explanation:
        '괜찮아요 = está bien / no hay problema. La diferencia con A: 관찮아요 NO existe en coreano — es una escritura incorrecta de 괜찮아요. La sílaba correcta es 괜 (gwae + n), no 관 (gwan). Este tipo de pregunta entrena a reconocer la escritura correcta del Hangul.',
      trap:
        'A es una escritura plausible pero errónea — cambia 괜 (ㅐ doble) por 관 (ㅏ simple). La vocal ㅐ/ㅔ es uno de los errores más comunes de escritura en aprendices de nivel básico.',
    },

    // ── GRAMÁTICA 5 ─────────────────────────────────────────────────────────
    {
      id: 'n1-g1',
      type: 'particle',
      level: 'A1',
      context: 'Completa con la partícula correcta.',
      prompt: '저 ___ 한국어를 배워요.',
      options: [
        { id: 'A', text: '가', romanization: 'ga' },
        { id: 'B', text: '이', romanization: 'i' },
        { id: 'C', text: '는', romanization: 'neun' },
        { id: 'D', text: '을', romanization: 'eul' },
      ],
      correct: 'C',
      explanation:
        '저 termina en vocal → partícula de tema 는 (consonante → 은). La oración dice "Yo aprendo coreano". 저는 = yo (como tema de la oración). 이/가 son partículas de sujeto, 을/를 son de objeto.',
      trap:
        '가 suena natural en oral, pero 저가 es incorrecto — 저 nunca toma 가 como tema. Solo acepta 는. (En contraste, 나는 / 내가 son ambos correctos para "yo" informal.)',
    },

    // ── GRAMÁTICA 6 ─────────────────────────────────────────────────────────
    {
      id: 'n1-g2',
      type: 'choice',
      level: 'A1',
      context: '¿Cuál de estas frases significa "Soy estudiante"?',
      prompt: '"Soy estudiante" en coreano es:',
      options: [
        { id: 'A', text: '저는 선생님이에요', romanization: 'jeoneun seonsaengnim-ieyo', meaning: 'Soy profesor' },
        { id: 'B', text: '저는 학생이에요', romanization: 'jeoneun haksaeng-ieyo', meaning: 'Soy estudiante' },
        { id: 'C', text: '저는 학생이 있어요', romanization: 'jeoneun haksaeng-i isseoyo', meaning: 'Tengo un estudiante' },
        { id: 'D', text: '학생은 저예요', romanization: 'haksaengeun jeoyeyo', meaning: 'El estudiante soy yo' },
      ],
      correct: 'B',
      explanation:
        '저는 학생이에요 = Yo soy estudiante. Estructura: [yo]는 + [sustantivo]이에요. La terminación 이에요 se usa después de consonante (학생 termina en ㅇ). Si terminara en vocal sería 예요 directamente.',
      trap:
        'D tiene el mismo significado pero énfasis diferente — es una construcción válida pero marcada (énfasis en "yo"). B es la forma natural y directa.',
    },

    // ── GRAMÁTICA 7 ─────────────────────────────────────────────────────────
    {
      id: 'n1-g3',
      type: 'formality',
      level: 'A1',
      context: 'Conoces a alguien por primera vez en una situación informal (mismo grupo de edad).',
      prompt: '¿Cómo dices "Mucho gusto / encantado de conocerte"?',
      options: [
        { id: 'A', text: '반갑습니다', romanization: 'bangapseumnida', meaning: 'Encantado (formal)' },
        { id: 'B', text: '반가워', romanization: 'bangaweo', meaning: 'Encantado (casual)' },
        { id: 'C', text: '반가워요', romanization: 'bangawoyo', meaning: 'Encantado (polite)' },
        { id: 'D', text: '만나서 반가워요', romanization: 'mannaseo bangawoyo', meaning: 'Encantado de conocerte (polite)' },
      ],
      correct: 'C',
      explanation:
        '반가워요 es el nivel polite (존댓말) sin llegar a formal. Ideal entre personas de igual estatus que no se conocen. 반갑습니다 es para situaciones muy formales. 반가워 es casual entre amigos. La versión completa 만나서 반가워요 añade "de conocerte" y es perfectamente válida y natural.',
      trap:
        'D también es correcto y muy natural, pero C es la forma mínima polite. La pregunta pide un contexto informal-no-íntimo donde 반가워요 es la elección neutra más común.',
    },

    // ── GRAMÁTICA 8 ─────────────────────────────────────────────────────────
    {
      id: 'n1-g4',
      type: 'choice',
      level: 'A1',
      context: '¿Cuál es el número correcto?',
      prompt: '"Tengo 23 años" en coreano: 저는 스물셋 살이에요. ¿Qué sistema numérico usa?',
      options: [
        { id: 'A', text: 'Números sino-coreanos (일, 이, 삼...)', romanization: 'il, i, sam' },
        { id: 'B', text: 'Números nativos coreanos (하나, 둘, 셋...)', romanization: 'hana, dul, set' },
        { id: 'C', text: 'Dígitos en inglés', romanization: 'twenty-three' },
        { id: 'D', text: 'Cualquiera de los dos — son intercambiables', romanization: '' },
      ],
      correct: 'B',
      explanation:
        'La edad SIEMPRE usa números nativos coreanos (하나, 둘, 셋... 스물, 서른...). Regla: edad, horas del reloj → nativos. Minutos, fechas, precios, pisos → sino-coreanos (일, 이, 삼). 스물셋 = 23 en sistema nativo.',
      trap:
        'D es el error más común — NO son intercambiables. Decir 이십삼 살 (sino-coreano) para la edad suena extraño. Los nativos coreanos siempre usan el sistema nativo para edades.',
    },
  ],
}

export default set
