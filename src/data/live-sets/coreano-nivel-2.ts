import type { LiveSet } from './types'

/**
 * NIVEL 2 — Intermedio
 * Objetivo: el 55-65% acierta. Audio con palabras que suenan parecido.
 * Mix: 4 audio (pares mínimos / similar fonética) + 4 gramática
 * Distractores: más cercanos — diferencia de 1 sílaba o vocal
 */
const set: LiveSet = {
  id: 'coreano-nivel-2',
  title: 'Nivel 2 — Fonética y gramática',
  titleKo: '레벨 2 — 발음과 문법',
  lang: 'ko',
  difficulty: 2,
  nextSetId: 'coreano-nivel-3',
  questions: [
    // ── AUDIO 1 — par mínimo (있 vs 없) ────────────────────────────────────
    {
      id: 'n2-a1',
      type: 'audio-listen',
      level: 'TOPIK-I',
      prompt: '🔊 Escucha con mucha atención. Las opciones son muy similares.',
      audioText: '재미없어요',
      audioRate: 0.82,
      options: [
        { id: 'A', text: '재미있어요', romanization: 'jaemiisseoyo', meaning: 'Es divertido' },
        { id: 'B', text: '재미없어요', romanization: 'jaemieopseoyo', meaning: 'Es aburrido' },
        { id: 'C', text: '재밌어요', romanization: 'jaemisseoyo', meaning: 'Es divertido (coloquial)' },
        { id: 'D', text: '흥미없어요', romanization: 'heungmieopseoyo', meaning: 'No tengo interés' },
      ],
      correct: 'B',
      explanation:
        '재미없어요 = es aburrido / no tiene gracia. El par mínimo crítico: 재미있어요 (divertido) vs 재미없어요 (aburrido). La diferencia es solo 있 vs 없 — en oral se distinguen por la vocal interna: ㅣ (있) suena cerrada/arriba, ㅓ (없) suena abierta/abajo. C es la forma coloquial de A (contracción).',
      trap:
        'A y B difieren solo en 있 vs 없 — el par mínimo más desafiante del coreano cotidiano. Si no entrenas el oído para este contraste, todos los adjetivos de emoción te sonarán iguales.',
    },

    // ── AUDIO 2 — tono y velocidad ──────────────────────────────────────────
    {
      id: 'n2-a2',
      type: 'audio-listen',
      level: 'TOPIK-I',
      prompt: '🔊 Fíjate en cada sílaba. ¿Cuál es la palabra correcta?',
      audioText: '도와주세요',
      audioRate: 0.8,
      options: [
        { id: 'A', text: '도와드릴게요', romanization: 'dowadeurilgeyo', meaning: 'Le ayudaré (yo a usted)' },
        { id: 'B', text: '도와줄게요', romanization: 'dowajulgeyo', meaning: 'Te ayudaré (yo a ti)' },
        { id: 'C', text: '도와주세요', romanization: 'dowajuseyo', meaning: '¡Ayúdeme! / Por favor ayúdeme' },
        { id: 'D', text: '도와줘요', romanization: 'dowajwoyo', meaning: 'Ayuda (informal)' },
      ],
      correct: 'C',
      explanation:
        '도와주세요 = por favor ayúdeme (petición formal). La raíz 도와 (ayudar) + 주세요 (forma de petición educada). Contraste con 도와드릴게요 (ofrecer ayuda, dirección inversa) y 도와줄게요 (promesa de ayuda). Escuchaste una petición, no una oferta.',
      trap:
        'A tiene la misma raíz pero es el hablante ofreciendo ayuda, no pidiendo. La diferencia 주 (dar a igual/inferior) vs 드리 (dar a superior) cambia completamente el sentido aunque suenan muy similar.',
    },

    // ── AUDIO 3 — consonantes finales ───────────────────────────────────────
    {
      id: 'n2-a3',
      type: 'audio-listen',
      level: 'TOPIK-I',
      prompt: '🔊 Presta atención a la última sílaba. ¿Qué escuchaste?',
      audioText: '알겠습니다',
      audioRate: 0.78,
      options: [
        { id: 'A', text: '알겠어요', romanization: 'algeseoyo', meaning: 'Entendido (polite)' },
        { id: 'B', text: '알겠습니까', romanization: 'algesseumnikka', meaning: '¿Entiende? (formal interrogativo)' },
        { id: 'C', text: '알겠습니다', romanization: 'algesseumnida', meaning: 'Entendido (formal declarativo)' },
        { id: 'D', text: '알아요', romanization: 'arayo', meaning: 'Sé / entiendo (informal)' },
      ],
      correct: 'C',
      explanation:
        '알겠습니다 = "entendido" en nivel formal corporativo. La diferencia clave con B: 습니다 (declarativo) vs 습니까 (interrogativo). En oral, 다 suena "cerrado/afirmativo" y 까 suena "abierto/pregunta". C declara, B pregunta.',
      trap:
        'B es la trampa perfecta — misma longitud, mismas primeras sílabas, solo difiere en la última consonante: 다 vs 까. Entrena especialmente la última sílaba en formal coreano porque ahí está toda la información gramatical.',
    },

    // ── AUDIO 4 — palabras con ㄹ ────────────────────────────────────────────
    {
      id: 'n2-a4',
      type: 'audio-listen',
      level: 'TOPIK-I',
      prompt: '🔊 La pronunciación de ㄹ en medio de palabra es clave. ¿Cuál es?',
      audioText: '물어봐요',
      audioRate: 0.82,
      options: [
        { id: 'A', text: '물어봐요', romanization: 'mureobwayo', meaning: 'Pregunto / pregunte' },
        { id: 'B', text: '물을 봐요', romanization: 'mureul bwayo', meaning: 'Veo el agua' },
        { id: 'C', text: '물어요', romanization: 'muleoyo', meaning: 'Pica / muerde' },
        { id: 'D', text: '볼어요', romanization: '(no existe)', meaning: '— no existe —' },
      ],
      correct: 'A',
      explanation:
        '물어봐요 = preguntar (literalmente: "mirar pidiendo"). La raíz 물어보다 es un verbo compuesto muy común. No confundir con 물다 (morder/picar → 물어요) ni con 물 + 봐요 (ver agua — dos palabras separadas con pausa distinta).',
      trap:
        'B suena casi igual oralmente (물을 봐요) pero tiene una pausa entre 물 y 봐요 que 물어봐요 no tiene. El oído entrenado distingue si hay o no un "corte" entre sílabas.',
    },

    // ── GRAMÁTICA 5 — 에 vs 에서 ────────────────────────────────────────────
    {
      id: 'n2-g1',
      type: 'particle',
      level: 'TOPIK-I',
      context: 'Elige la partícula correcta para cada hueco.',
      prompt: '저는 학교___ 공부해요. 집___ 가요.',
      options: [
        { id: 'A', text: '에서 / 에', romanization: 'eseo / e' },
        { id: 'B', text: '에 / 에서', romanization: 'e / eseo' },
        { id: 'C', text: '에서 / 에서', romanization: 'eseo / eseo' },
        { id: 'D', text: '에 / 에', romanization: 'e / e' },
      ],
      correct: 'A',
      explanation:
        '에서 = lugar donde ocurre una acción (학교에서 공부해요 = estudio en la escuela). 에 = dirección/destino (집에 가요 = voy a casa) o existencia (있다/없다). La regla de oro: si el verbo implica movimiento hacia un lugar → 에. Si implica una acción que ocurre en un lugar → 에서.',
      trap:
        'D es el error más frecuente — usar 에 para todo. Recuerda: 에 es destino o existencia, 에서 es escenario de acción. "Estudio en la escuela" es acción → 에서. "Voy a casa" es destino → 에.',
    },

    // ── GRAMÁTICA 6 — formalidad en email ──────────────────────────────────
    {
      id: 'n2-g2',
      type: 'formality',
      level: 'TOPIK-I',
      context: 'Escribes un mensaje a tu profesor universitario preguntando por la tarea.',
      prompt: '¿Cuál es la apertura más apropiada?',
      options: [
        { id: 'A', text: '안녕하세요! 과제가 뭐예요?', romanization: 'annyeonghaseyo! gwajega mwoyeyo?' },
        { id: 'B', text: '교수님, 과제에 대해 여쭤봐도 될까요?', romanization: 'gyosunim, gwajee daehae yeojwoeobwado doelkayo?' },
        { id: 'C', text: '교수님! 과제 알려주세요~', romanization: 'gyosunim! gwaje allyeojuseyo~' },
        { id: 'D', text: '야, 과제 뭔지 알아?', romanization: 'ya, gwaje mwonji ara?' },
      ],
      correct: 'B',
      explanation:
        'B usa: 교수님 (tratamiento honorífico), 여쭤보다 (forma humilde de "preguntar"), 될까요 (forma de pedir permiso muy educada). Esta estructura es el estándar en comunicación formal estudiante-profesor. A suena casual a pesar del saludo. C usa ~ (emoticono) — nunca en comunicación formal.',
      trap:
        'A parece educada porque usa 안녕하세요 y 예요, pero en comunicación escrita formal con un superior, 안녕하세요 como apertura y preguntas directas (뭐예요) son demasiado informales.',
    },

    // ── GRAMÁTICA 7 — negación ──────────────────────────────────────────────
    {
      id: 'n2-g3',
      type: 'choice',
      level: 'TOPIK-I',
      context: 'Niega esta oración de dos formas: "Voy (가요)"',
      prompt: '¿Cuáles son las dos formas correctas de negar 가요?',
      options: [
        { id: 'A', text: '안 가요 / 가지 않아요', romanization: 'an gayo / gaji anayo' },
        { id: 'B', text: '못 가요 / 가지 못해요', romanization: 'mot gayo / gaji motaeyo' },
        { id: 'C', text: '안 가요 / 못 가요', romanization: 'an gayo / mot gayo' },
        { id: 'D', text: '가지 않아요 / 가지 못해요', romanization: 'gaji anayo / gaji motaeyo' },
      ],
      correct: 'A',
      explanation:
        'Hay dos tipos de negación: 안/지 않다 = negación voluntaria ("no voy" — elijo no ir). 못/지 못하다 = negación de capacidad ("no puedo ir" — algo me lo impide). La pregunta pide negar sin implicar incapacidad, así que las dos formas de "no voy voluntariamente" son: 안 가요 y 가지 않아요.',
      trap:
        'C mezcla los dos tipos de negación (voluntaria + incapacidad). D también mezcla. Solo A presenta las dos variantes de la misma negación voluntaria.',
    },

    // ── GRAMÁTICA 8 — conector de razón ────────────────────────────────────
    {
      id: 'n2-g4',
      type: 'blank',
      level: 'TOPIK-I',
      context: 'Completa con el conector correcto.',
      prompt: '피곤해서 일찍 자요. / 피곤하___ 일찍 자요.',
      options: [
        { id: 'A', text: '지만 (pero / sin embargo)', romanization: 'jiman' },
        { id: 'B', text: '기 때문에 (debido a que)', romanization: 'gi ttaemune' },
        { id: 'C', text: '서 (porque — causa inmediata)', romanization: 'seo' },
        { id: 'D', text: '고 (y / luego)', romanization: 'go' },
      ],
      correct: 'C',
      explanation:
        '아서/어서 = porque (causa-efecto inmediato, emocional o físico). Se usa cuando la causa lleva directamente a la consecuencia: estoy cansado → me duermo temprano. 기 때문에 (B) es más formal y se usa para argumentar, no para causas cotidianas. 지만 contradice, 고 solo enlaza acciones.',
      trap:
        'B (기 때문에) también significa "porque" y es gramaticalmente correcto, pero suena demasiado formal/escrito para "estoy cansado así que me acuesto". 아서/어서 es la forma natural en oral para este tipo de causalidad cotidiana.',
    },
  ],
}

export default set
