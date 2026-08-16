'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = '#7c3aed';

interface FQ { s: string; opts: string[]; a: number; fb: string; }
interface TQ { prompt: string; s: string; opts: string[]; a: number; fb: string; }
interface EQ { s: string; q: string; opts: string[]; a: number; fb: string; }
interface Topic {
  id: string; title: string; icon: string;
  rule: string; tip: string;
  table: { headers: string[]; rows: string[][] };
  a2note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'conditional', title: '-(으)면 (Condicional — si...)', icon: '🔀',
    rule: "-(으)면 = si... (condicional). Si el stem termina en consonante: 으면. Si termina en vocal o ㄹ: 면 (directamente). Se usa para expresar condiciones hipotéticas, consejos, planes y situaciones posibles. Puede ir en tiempo presente, futuro o pasado. Con 이다 (ser): 이면 / 면. El verbo en la cláusula resultado puede ser pasado, presente o futuro.",
    tip: "Regla clave: consonante + 으면, vocal + 면. '비가 오면 (si llueve)' — '오다' termina en vocal → 오면. '날씨가 좋으면 (si el tiempo está bien)' — '좋다' termina en consonante → 좋으면. Muy versátil: usado para consejos ('가면 돼요 = si vas, está bien'), condiciones ('공부하면 합격해요 = si estudias, apruebas') y deseos ('돈이 많으면 여행할 거예요 = si tuviera dinero, viajaría').",
    table: {
      headers: ['Stem', 'Final', 'Forma -(으)면', 'Ejemplo', 'Significado'],
      rows: [
        ['가-', 'vocal', '가면', '비가 오면 집에 있을게요.', 'Si llueve, me quedaré en casa.'],
        ['먹-', 'consonante', '먹으면', '많이 먹으면 배가 불러요.', 'Si comes mucho, te llenas.'],
        ['춥-', 'consonante', '추우면', '추우면 코트를 입어요.', 'Si hace frío, ponte el abrigo.'],
        ['공부하-', '하다', '공부하면', '공부하면 성적이 올라요.', 'Si estudias, suben las notas.'],
        ['길-', 'ㄹ', '길면', '길면 택시를 타세요.', 'Si es largo, toma un taxi.'],
      ]
    },
    a2note: "En A2 aprendiste -아/어서 para causa real ('비가 와서 못 갔어요 = no fui porque llovió'). -(으)면 es hipotético: '비가 오면 못 갈 거예요 (si llueve, no podré ir)'. -아/어서 = causa pasada real; -(으)면 = condición hipotética o futura.",
    examples: [
      "날씨가 좋으면 산에 갈 거예요. (Nalssi-ga joeun-myeon san-e gal geoyeyo.) — Si el tiempo está bueno, iremos a la montaña.",
      "한국어를 열심히 공부하면 잘 할 수 있어요. (Hangugeo-reul yeolsimhi gongbuhame-yon jal hal su isseoyo.) — Si estudias coreano con esfuerzo, podrás hacerlo bien.",
      "피곤하면 쉬어야 해요. (Pigonha-myeon swieo-ya haeyo.) — Si estás cansado/a, debes descansar.",
    ],
    fills: [
      { s: "날씨가 좋___ 공원에 갈 거예요. (좋다 — estar bueno)", opts: ['으면', '면', '아서', '지만'], a: 0, fb: "'좋다' stem '좋' termina en consonante ㅎ → '좋으면'. Regla: consonante + 으면. '날씨가 좋으면 = si el tiempo está bueno'." },
      { s: "시간이 있___ 같이 커피 마셔요. (있다 — tener tiempo)", opts: ['으면', '면', '어서', '지만'], a: 0, fb: "'있다' stem '있' termina en consonante ㅆ → '있으면'. '시간이 있으면 = si tienes tiempo'." },
      { s: "비가 오___ 우산을 가져가세요. (오다 — llover)", opts: ['으면', '면', '서', '고'], a: 1, fb: "'오다' stem '오' termina en vocal → '오면' (sin 으). '비가 오면 = si llueve'." },
      { s: "돈이 많___ 세계 여행을 할 거예요. (많다 — tener mucho)", opts: ['으면', '면', '아서', '으니까'], a: 0, fb: "'많다' stem '많' termina en consonante ㅎ → '많으면'. '돈이 많으면 = si tuviera mucho dinero'." },
      { s: "한국에 가___ 불고기를 꼭 먹어보세요. (가다 — ir)", opts: ['으면', '면', '서', '고'], a: 1, fb: "'가다' stem '가' termina en vocal → '가면'. '한국에 가면 = si vas a Corea'." },
    ],
    transforms: [
      { prompt: "Combina las dos oraciones con -(으)면:", s: "시험 공부를 해요. 합격할 거예요.", opts: ["시험 공부를 하면 합격할 거예요.", "시험 공부를 해서 합격할 거예요.", "시험 공부를 하지만 합격할 거예요.", "시험 공부를 하고 합격할 거예요."], a: 0, fb: "'공부하면 합격할 거예요' — condición → resultado futuro. '하다' → 하면. La condición va primero, el resultado después." },
      { prompt: "Expresa un consejo usando -(으)면:", s: "피곤해요. → Consejo: descansar.", opts: ["피곤하면 쉬어야 해요.", "피곤해서 쉬어야 해요.", "피곤하지만 쉬어야 해요.", "피곤하고 쉬어야 해요."], a: 0, fb: "'피곤하면 쉬어야 해요' — -(으)면 + consejo obligación (-아야 해요). '피곤하다' → 피곤하면. Combinación muy natural en coreano." },
      { prompt: "Usa -(으)면 para expresar un deseo hipotético:", s: "시간이 더 있으면 좋겠어요. (quisiera tener más tiempo)", opts: ["시간이 더 있으면 좋겠어요.", "시간이 더 있어서 좋겠어요.", "시간이 더 있지만 좋겠어요.", "시간이 더 있고 좋겠어요."], a: 0, fb: "'-(으)면 좋겠어요' = expresión de deseo hipotético. '있으면 좋겠어요' = ojalá hubiera / quisiera que hubiera. Estructura muy común para deseos." },
    ],
    errors: [
      { s: "날씨가 좋면 공원에 가요.", q: "¿Hay error gramatical?", opts: ["Sí: '좋다' termina en consonante → debe ser '좋으면'", "No hay error", "Sí: debe ser '좋아서'", "Sí: debe ser '좋지만'"], a: 0, fb: "'좋다' stem '좋' termina en consonante ㅎ → '좋으면', NO '좋면'. La regla: consonante → 으면, vocal → 면. '좋면' es un error muy común." },
      { s: "먹었으면 배가 불렀을 거예요.", q: "¿Es correcta la forma pasada del condicional?", opts: ["Sí: '먹었으면' = condicional pasado hipotético (si hubiera comido)", "No: debe ser '먹으면'", "No: debe ser '먹었지만'", "No: no existe el condicional pasado en coreano"], a: 0, fb: "'먹었으면' = condicional hipotético del pasado: 'si hubiera comido, estaría lleno'. 과거 가정법 (conditional pasado). '먹었으면 좋겠어요' también existe: 'ojalá hubiera comido'." },
    ],
    production: "Escribe 4 oraciones condicionales sobre planes: '한국어를 열심히 공부하면...', '시간이 있으면...', '돈이 있으면...' y una condición propia."
  },
  {
    id: 'obligation', title: '-아/어야 하다 (Obligación — deber)', icon: '⚠️',
    rule: "-아/어야 하다 = deber / tener que. Formación: ㅏ/ㅗ → 아야 하다; otras vocales → 어야 하다; 하다 → 해야 하다. Polite: -아/어야 해요. Negación: -지 않아도 돼요 (no tienes que...) o -면 안 돼요 (no debes...). Para obligación más suave: -는 것이 좋아요 (es mejor que...). Para deber formal/escrito: -아/어야 합니다. La diferencia entre 해야 해요 (obligación) y 하면 돼요 (posibilidad permitida) es importante.",
    tip: "Mismo principio de armonía vocal que 아/어서: '먹다' → '먹어야 해요 (debes comer)', '가다' → '가야 해요 (debes ir)', '공부하다' → '공부해야 해요'. Negar: '안 해도 돼요 (no tienes que hacerlo)' ≠ '하면 안 돼요 (está prohibido hacerlo)'. Diferencia crucial.",
    table: {
      headers: ['Verbo', 'Vocal stem', 'Forma', 'Ejemplo', 'Significado'],
      rows: [
        ['가다', 'ㅏ → 아야', '가야 해요', '지금 가야 해요.', 'Tienes que ir ahora.'],
        ['먹다', 'ㅓ → 어야', '먹어야 해요', '약을 먹어야 해요.', 'Debes tomar el medicamento.'],
        ['오다', 'ㅗ → 아야', '와야 해요', '일찍 와야 해요.', 'Debes llegar temprano.'],
        ['공부하다', '하다 → 해야', '공부해야 해요', '열심히 공부해야 해요.', 'Debes estudiar con esfuerzo.'],
        ['쉬다', 'ㅣ → 어야', '쉬어야 해요', '충분히 쉬어야 해요.', 'Debes descansar suficiente.'],
      ]
    },
    a2note: "En A2 usabas -고 싶다 para deseo y -(으)려고 해요 para intención. -아/어야 해요 es obligación: '먹어야 해요 (debes comer)'. Gradación: 하고 싶어요 (quiero) < 하려고 해요 (planeo) < 해야 해요 (debo) < 해야만 해요 (tengo que sin falta).",
    examples: [
      "매일 운동해야 해요. (Maeil undonghaeya haeyo.) — Debes ejercitarte todos los días. (obligación cotidiana)",
      "시험 전에 잘 자야 해요. (Siheom jeon-e jal jaya haeyo.) — Debes dormir bien antes del examen.",
      "환경을 보호해야 해요. 기 때문에 재활용을 해야 해요. (Hwangyeong-eul bohohaeya haeyo. Gi ttaemune jaehwallyong-eul haeya haeyo.) — Debemos proteger el medioambiente. Por eso debemos reciclar.",
    ],
    fills: [
      { s: "건강을 위해 매일 운동___ 해요. (운동하다)", opts: ['해야', '하야', '하어야', '하아야'], a: 0, fb: "'운동하다' es 하다 verbo → '운동해야 해요'. La contracción: 하+아야 → 해야. '운동해야 해요 = debes ejercitarte'." },
      { s: "약속 시간에 늦으면 안 되니까 빨리 ___ 해요. (가다)", opts: ['가야', '가아야', '갔어야', '가지야'], a: 0, fb: "'가다' stem '가' vocal ㅏ → '가야 해요'. '빨리 가야 해요 = debes ir rápido'. Armonía: ㅏ/ㅗ → 아야, otras → 어야." },
      { s: "이 책을 오늘까지 다 읽___ 해요. (읽다)", opts: ['어야', '아야', '었어야', '어서야'], a: 0, fb: "'읽다' stem '읽' vocal ㅣ → '읽어야 해요'. No es ㅏ/ㅗ → 어야. '오늘까지 읽어야 해요 = debes terminar de leer para hoy'." },
      { s: "거짓말을 하___ 안 돼요. (하다 — prohibición)", opts: ['면', '야', '어야', '지만'], a: 0, fb: "'하면 안 돼요' = está prohibido hacer. A diferencia de '안 해도 돼요 (no tienes que hacerlo)'. '거짓말을 하면 안 돼요 = no debes mentir'." },
      { s: "비자 신청서를 제출___ 해요. (제출하다)", opts: ['해야', '하야', '했어야', '하여야'], a: 0, fb: "'제출하다' → 하다 → 해야 해요. '제출해야 해요 = debes presentar (la solicitud)'. La forma formal escrita: '제출하여야 합니다'." },
    ],
    transforms: [
      { prompt: "Transforma la sugerencia en obligación:", s: "운동하는 것이 좋아요. → (obligación fuerte)", opts: ["운동해야 해요.", "운동하고 싶어요.", "운동하려고 해요.", "운동하는 것 같아요."], a: 0, fb: "'운동해야 해요' — obligación directa. '운동하는 것이 좋아요' es sugerencia suave (es bueno que...). Gradación de obligación: 좋아요 (bueno) < 아야 해요 (deber) < 아야만 해요 (imperativo fuerte)." },
      { prompt: "Cambia la obligación a 'no hace falta' (negación suave):", s: "오늘 회의에 와야 해요. → (no es necesario venir)", opts: ["오늘 회의에 안 와도 돼요.", "오늘 회의에 오면 안 돼요.", "오늘 회의에 와야 해요.", "오늘 회의에 안 와야 해요."], a: 0, fb: "'안 와도 돼요' = no tienes que venir (permiso para no venir). '오면 안 돼요' = está prohibido venir (muy diferente). Errores con estas dos formas son muy comunes." },
      { prompt: "Cambia la obligación a 'está prohibido':", s: "여기에서 담배를 피우면 안 돼요. ¿Qué estructura es esta?", opts: ["-(으)면 안 돼요 — prohibición", "-아야 해요 — obligación", "-지 않아도 돼요 — no es necesario", "-아/어도 돼요 — permiso"], a: 0, fb: "'-(으)면 안 돼요' = está prohibido (literalmente 'si haces X, no está bien'). '아야 해요' = deber positivo. '도 돼요' = permiso. '안 해도 돼요' = no hace falta." },
    ],
    errors: [
      { s: "숙제를 내일까지 해야 돼요.", q: "¿Es correcta '해야 돼요' en vez de '해야 해요'?", opts: ["Sí: '해야 돼요' y '해야 해요' son ambas correctas (돼요 = forma coloquial de 되다)", "No: solo '해야 해요' es correcto", "No: debe ser '해야 합니다'", "No: debe ser '해도 돼요'"], a: 0, fb: "'해야 해요' y '해야 돼요' son AMBAS correctas. '돼요' viene de '되다' (ser/volverse) usado coloquialmente. En escritura formal: '해야 합니다'. En conversación: ambas formas son aceptadas." },
      { s: "오늘 약을 먹아야 해요.", q: "¿Cuál es el error?", opts: ["'먹아야' es incorrecto — debe ser '먹어야' (stem vocal ㅓ → 어야)", "No hay error", "Debe ser '먹야야'", "Debe ser '먹이야'"], a: 0, fb: "'먹다' stem '먹', vocal ㅓ → 어야. '먹아야' aplica la regla ㅏ/ㅗ incorrectamente. Correcto: '먹어야 해요'. La armonía vocal: solo ㅏ/ㅗ → 아야; el resto → 어야." },
    ],
    production: "Escribe 4 oraciones sobre cosas que debes hacer esta semana. Usa '해야 해요' y varía los verbos. Ej: '이번 주에 ___야/어야 해요.'"
  },
  {
    id: 'ability', title: '-(으)ㄹ 수 있다/없다 (Capacidad — poder)', icon: '💪',
    rule: "-(으)ㄹ 수 있다 = poder hacer / ser capaz de. -(으)ㄹ 수 없다 = no poder. Formación: stem termina en vocal → ㄹ 수 있다; termina en consonante → 을 수 있다; termina en ㄹ → ㄹ 수 있다. Diferencia con -ㄹ 줄 알다 (saber hacer, habilidad aprendida): '수영할 수 있어요 (puedo nadar ahora)' vs '수영할 줄 알아요 (sé nadar, aprendí cómo)'. Con -(으)면: 'X하면 Y할 수 있어요 (si haces X, podrás hacer Y)'.",
    tip: "'할 수 있어요' (puedo hacer) tiene dos matices: posibilidad física ('내일 올 수 있어요 = puedo venir mañana') y capacidad ('한국어를 말할 수 있어요 = puedo hablar coreano'). '할 줄 알아요' = sé cómo hacerlo (habilidad adquirida). '할 수 없어요' es más formal; en conversación se usa '못 해요' con más frecuencia.",
    table: {
      headers: ['Stem', 'Final', 'Positivo', 'Negativo', 'Ejemplo'],
      rows: [
        ['가-', 'vocal', '갈 수 있어요', '갈 수 없어요', '내일 갈 수 있어요.'],
        ['먹-', 'consonante', '먹을 수 있어요', '먹을 수 없어요', '매운 것을 먹을 수 있어요.'],
        ['만들-', 'ㄹ', '만들 수 있어요', '만들 수 없어요', '요리를 만들 수 있어요.'],
        ['공부하-', '하다', '공부할 수 있어요', '공부할 수 없어요', '집에서 공부할 수 있어요.'],
        ['읽-', 'consonante', '읽을 수 있어요', '읽을 수 없어요', '한국어를 읽을 수 있어요.'],
      ]
    },
    a2note: "En A2 usabas -고 싶다 (querer) y -(으)려고 해요 (intención). -(으)ㄹ 수 있다 añade posibilidad/capacidad: '갈 수 있어요 (puedo ir)'. Combinación muy útil: '공부하면 갈 수 있어요 (si estudias, podrás ir)'.",
    examples: [
      "저는 한국어를 말할 수 있어요. (Jeoneun hangugeo-reul malhal su isseoyo.) — Puedo hablar coreano.",
      "오늘 회의에 참석할 수 없어요. (Oneul hoeui-e chamseokhal su eopsseoyo.) — No puedo asistir a la reunión de hoy.",
      "열심히 연습하면 피아노를 칠 수 있을 거예요. (Yeolsimhi yeonseuphame-yon piano-reul chil su isseul geoyeyo.) — Si practicas con esfuerzo, podrás tocar el piano.",
    ],
    fills: [
      { s: "저는 수영을 ___ 있어요. (수영하다 — nadar)", opts: ['할 수', '하을 수', '하ㄹ 수', '해 수'], a: 0, fb: "'수영하다' → '수영할 수 있어요'. 하다 verbo → 하 + ㄹ 수 있다. '수영할 수 있어요 = puedo nadar'." },
      { s: "이 음식이 너무 매워서 ___ 없어요. (먹다 — comer)", opts: ['먹을 수', '먹ㄹ 수', '먹아 수', '먹어 수'], a: 0, fb: "'먹다' stem '먹' termina en consonante ㄱ → '먹을 수 없어요'. '너무 매워서 먹을 수 없어요 = es tan picante que no puedo comer'." },
      { s: "한국어를 열심히 배우면 TOPIK 시험을 ___ 있을 거예요. (보다 — tomar el examen)", opts: ['볼 수', '봐 수', '보을 수', '봤을 수'], a: 0, fb: "'보다' stem '보' vocal ㅗ → '볼 수 있을 거예요'. '볼 수 있을 거예요 = podrás tomar el examen'. -(으)면 + -(으)ㄹ 수 있을 거예요 = condición + capacidad futura." },
      { s: "죄송한데요, 지금 통화 ___ 없어요? (하다)", opts: ['할 수', '하을 수', '해 수', '했 수'], a: 0, fb: "'통화하다' → '통화할 수 없어요?' — Forma de pregunta educada: '¿No puedes hablar ahora?' 할 수 없어요 vs 못 해요: ambas significan 'no puedo', pero 할 수 없어요 es más formal." },
      { s: "만약 내가 의사라면 환자를 도울 ___ 있을 텐데요. (돕다 — ayudar)", opts: ['수', '있 수', '었 수', '아서'], a: 0, fb: "'도울 수 있을 텐데요' — '돕다' es irregular: 돕 + 을 → 도울. '...수 있을 텐데요' = podría... (hipotético). '텐데요' añade matiz de deseo o lástima." },
    ],
    transforms: [
      { prompt: "Transforma a negación de capacidad:", s: "내일 파티에 올 수 있어요. → (no puedo venir)", opts: ["내일 파티에 올 수 없어요.", "내일 파티에 못 가요.", "내일 파티에 안 가요.", "A y B son correctas."], a: 3, fb: "'올 수 없어요' y '못 가요' (못 + verbo) son ambas correctas para expresar incapacidad. '안 가요' indica decisión propia (no quiero ir), no incapacidad. En conversación, '못 가요' es más común." },
      { prompt: "Combina condición con capacidad:", s: "열심히 연습하세요. 그러면 잘 할 수 있어요.", opts: ["열심히 연습하면 잘 할 수 있어요.", "열심히 연습해서 잘 할 수 있어요.", "열심히 연습하지만 잘 할 수 있어요.", "열심히 연습하고 잘 할 수 있어요."], a: 0, fb: "'연습하면 잘 할 수 있어요' — condición -(으)면 + capacidad -(으)ㄹ 수 있어요. Estructura muy natural en coreano para motivar: 'si haces X, podrás Y'." },
      { prompt: "Diferencia entre -(으)ㄹ 수 있다 y -(으)ㄹ 줄 알다:", s: "韓国語를 말할 ___ (capacidad aprendida/habilidad)", opts: ["줄 알아요 (sé cómo — habilidad adquirida)", "수 있어요 (puedo — posibilidad)", "수 없어요 (no puedo)", "줄 모르다 (no sé cómo)"], a: 0, fb: "'말할 줄 알아요' = sé hablar (habilidad aprendida). 'ml할 수 있어요' = puedo hablar (posibilidad en ese momento). Para hablar de idiomas, habilidades aprendidas: 줄 알다. Para posibilidad circunstancial: 수 있다." },
    ],
    errors: [
      { s: "저는 한국어를 말해 수 있어요.", q: "¿Cuál es el error?", opts: ["'말해 수 있어요' es incorrecto — debe ser '말할 수 있어요' (stem + ㄹ/을 수)", "No hay error", "Debe ser '말하를 수 있어요'", "Debe ser '말하고 수 있어요'"], a: 0, fb: "La estructura es stem + (으)ㄹ 수 있다. '말하다' → '말할 수 있어요'. '말해' es la forma conectada (-아/어) que no se usa aquí. El error es aplicar -아/어 en lugar de -ㄹ." },
      { s: "이 음식을 먹을 수 없다고 했어요.", q: "¿Es correcta la forma indirecta '없다고 했어요'?", opts: ["Sí: '없다고 했어요' = dijo que no podía (cita indirecta correcta)", "No: debe ser '없어요고 했어요'", "No: debe ser '없었다고 했어요'", "No: debe usarse '못 먹어요'"], a: 0, fb: "'없다고 했어요' = dijo que no podía (cita indirecta con -다고 하다). La estructura es correcta. '없다고 하다' = decir que no puede. '있다고 하다' = decir que puede." },
    ],
    production: "Escribe 4 oraciones sobre cosas que puedes o no puedes hacer. Usa tanto '할 수 있어요' como '할 수 없어요'. Ej: '저는 ___ 를 ___ 수 있어요/없어요.'"
  },
  {
    id: 'reason', title: '-기 때문에 (Razón — porque)', icon: '🔍',
    rule: "-기 때문에 = porque (razón formal). Formación: verbo/adj stem + 기 때문에. Diferencia con -아/어서: -기 때문에 es más formal y puede usarse con imperativos (a diferencia de -아/어서). Con sustantivos: 명사 + 때문에 (sin -기). El tiempo va en la cláusula resultante. En escritura formal: muy preferido sobre -아/어서. En conversación: -아/어서 es más natural, pero -기 때문에 se usa cuando se quiere enfatizar la razón.",
    tip: "-기 때문에 vs -아/어서: '바빠서 못 왔어요 (no vine porque estaba ocupado)' — causa inmediata y natural. '바쁘기 때문에 못 왔어요' — más formal, énfasis en la razón. Sustantivos: '날씨 때문에 (debido al clima)' sin 기. Para imperativos: '바쁘기 때문에 도와주세요 (porque estoy ocupado, ayúdame)' — aquí NO puedes usar -아/어서.",
    table: {
      headers: ['Tipo', 'Forma', 'Ejemplo', 'Significado'],
      rows: [
        ['Verbo', 'stem + 기 때문에', '공부하기 때문에 피곤해요', 'Porque estudio, estoy cansado'],
        ['Adjetivo', 'stem + 기 때문에', '비싸기 때문에 못 사요', 'Porque es caro, no puedo comprarlo'],
        ['Sustantivo', '명사 + 때문에', '날씨 때문에 못 갔어요', 'Debido al clima, no pude ir'],
        ['Pasado', 'stem + 았/었기 때문에', '먹었기 때문에 안 배고파요', 'Porque comí, no tengo hambre'],
        ['Con imperativo', 'stem + 기 때문에 + 명령', '바쁘기 때문에 빨리 해주세요', 'Porque estoy ocupado, hágalo rápido'],
      ]
    },
    a2note: "En A2 usabas -아/어서 para razón/causa conversacional. -기 때문에 añade formalidad y más flexibilidad: puede usarse con imperativos donde -아/어서 no puede. '날씨가 좋아서 나갔어요 (informal)' = '날씨가 좋기 때문에 나갔어요 (más formal)'.",
    examples: [
      "한국어가 어렵기 때문에 매일 공부해요. (Hangugeo-ga eoryeopgi ttaemune maeil gongbuhaeyo.) — Porque el coreano es difícil, estudio todos los días.",
      "시간이 없기 때문에 빨리 결정해야 해요. (Sigan-i eopgi ttaemune ppalli gyeoljeonghaeeya haeyo.) — Porque no hay tiempo, debemos decidir rápido.",
      "환경 오염 때문에 건강 문제가 생겨요. (Hwangyeong oyeom ttaemune geongang munje-ga saenggyeoyo.) — Debido a la contaminación ambiental, surgen problemas de salud.",
    ],
    fills: [
      { s: "비가 오___ 때문에 소풍을 취소했어요. (오다 — llover)", opts: ['기', '아서', '지만', '고'], a: 0, fb: "'오기 때문에' — '오다' stem '오' + 기 때문에. '비가 오기 때문에 = porque llueve'. El resultado en pasado '취소했어요'." },
      { s: "열심히 공부했___ 때문에 시험에 합격했어요. (pasado)", opts: ['기', '어서기', '기지만', '었기'], a: 3, fb: "'공부했기 때문에' = porque estudié (pasado). Forma pasada: stem + 았/었 + 기 때문에. '공부했기 때문에 합격했어요 = porque estudié (pasado), aprobé'." },
      { s: "교통 ___ 때문에 30분이나 늦었어요. (sustantivo)", opts: ['이', '에', '가', '(sin partícula)'], a: 3, fb: "Con sustantivos, solo se añade '때문에' directamente: '교통 때문에 (debido al tráfico)'. No se necesita -기 con sustantivos. '교통 때문에 30분이나 늦었어요 = llegué 30 minutos tarde por el tráfico'." },
      { s: "시간이 없___ 때문에 빨리 해주세요! (imperativo)", opts: ['기', '아서', '어서', '지만'], a: 0, fb: "'없기 때문에' — solo -기 때문에 puede ir con imperativo. '없어서 빨리 해주세요' es incorrecto (regla A2: -아/어서 no va con imperativo). '없기 때문에 빨리 해주세요 = porque no hay tiempo, ¡hágalo rápido!'." },
      { s: "이 제품이 품질이 좋___ 때문에 인기가 많아요. (adjetivo)", opts: ['기', '아서기', '기지만', '어서'], a: 0, fb: "'좋기 때문에' — '좋다' stem + 기 때문에. '품질이 좋기 때문에 인기가 많아요 = porque la calidad es buena, es muy popular'." },
    ],
    transforms: [
      { prompt: "Combina con -기 때문에 (formal):", s: "바빠요. 회의에 못 갔어요.", opts: ["바쁘기 때문에 회의에 못 갔어요.", "바빠서 회의에 못 갔어요.", "바쁘지만 회의에 못 갔어요.", "바쁘고 회의에 못 갔어요."], a: 0, fb: "'바쁘기 때문에' — adj '바쁘다' stem + 기 때문에. '바빠서' también es correcto pero menos formal. '바쁘기 때문에 회의에 못 갔어요 = porque estaba ocupado, no pude ir a la reunión'." },
      { prompt: "Usa -기 때문에 con sustantivo causa:", s: "날씨가 나빠서 소풍을 취소했어요. → (sustantivo)", opts: ["나쁜 날씨 때문에 소풍을 취소했어요.", "날씨가 나쁘기 때문에 소풍을 취소했어요.", "날씨 때문에 소풍을 취소했어요.", "B y C son ambas correctas."], a: 3, fb: "Con sustantivo: '날씨 때문에 = debido al clima'. Con verbo/adjetivo: '날씨가 나쁘기 때문에 = porque el clima es malo'. Ambas formas son correctas con diferente estructura." },
      { prompt: "¿Cuándo prefieres -기 때문에 sobre -아/어서?", s: "Quieres pedir ayuda dando una razón formal.", opts: ["바쁘기 때문에 도와주세요. (-기 때문에 + imperativo)", "바빠서 도와주세요. (incorrecto: -서 + imperativo)", "바쁘기 때문에 도왔어요.", "바빠서 도왔어요."], a: 0, fb: "Con IMPERATIVOS o SUGERENCIAS, usa -기 때문에, NO -아/어서. '바빠서 도와주세요' es incorrecto según la gramática coreana. 'Baáppeugi ttaemune dowajuseyo = porque estoy ocupado, ayúdame'." },
    ],
    errors: [
      { s: "피곤해서기 때문에 일찍 잤어요.", q: "¿Cuál es el error?", opts: ["'해서기' no existe — usar solo '기 때문에' o solo '-아/어서'", "No hay error", "Debe ser '피곤하지기 때문에'", "Debe ser '피곤했기 때문에'"], a: 0, fb: "'해서기 때문에' mezcla dos estructuras incompatibles. Usar una sola: '피곤해서 잤어요' (informal) O '피곤하기 때문에 잤어요' (formal). Nunca combinar -아/어서 con -기 때문에." },
      { s: "돈이 없어서 도와주세요.", q: "¿Hay un problema gramatical con este uso de -아/어서?", opts: ["Sí: -아/어서 no se usa con imperativo. Correcto: '돈이 없기 때문에 도와주세요'", "No hay error", "Sí: debe ser '없으니까 도와주세요'", "A y C son ambas correctas (reglas: -아/어서 ≠ imperativo; -(으)니까 o -기 때문에 = imperativo)"], a: 3, fb: "-아/어서 NO va con imperativos. Con imperativo/sugerencia usar: -기 때문에 ('없기 때문에 도와주세요') o -(으)니까 ('없으니까 도와주세요'). Ambas A y C son correctas." },
    ],
    production: "Escribe 4 oraciones explicando por qué haces o no puedes hacer algo. Usa -기 때문에 para razones formales. Ej: '___기 때문에 ___해요/못 해요.'"
  },
  {
    id: 'background', title: '-는데 (Contexto y contraste)', icon: '🔄',
    rule: "-는데 conecta dos cláusulas con matiz de contexto/fondo (providing background) o contraste suave. Formación: verbos presentes: -는데; adjetivos: -(으)ㄴ데 (vocal → ㄴ데, consonante → 은데); pasado: -았/었는데; 이다 (ser): 인데. Usos: (1) Contexto/fondo: '비가 오는데 우산이 없어요 (llueve, pero no tengo paraguas)'; (2) Contraste suave (diferente de -지만 que es más marcado); (3) Preparatorio para preguntar: '저는 학생인데요, 질문이 있어요 (soy estudiante y tengo una pregunta)'; (4) Sorpresa: '생각보다 맛있는데요! (¡Es más rico de lo que pensaba!)'.",
    tip: "Diferencia clave con -지만: -는데 es más suave y menos marcado como contraste. '비싸지만 샀어요 (es caro pero lo compré)' — contraste fuerte. '비싼데 샀어요 (siendo caro, lo compré)' — contexto + acción. -는데 también se usa al final de la frase para suavizar: '그런데요... (es que...)'. Muy versátil y muy usado en coreano coloquial.",
    table: {
      headers: ['Tipo', 'Forma -는데', 'Ejemplo', 'Significado'],
      rows: [
        ['Verbo presente', '-는데', '비가 오는데 우산이 없어요', 'Llueve y no tengo paraguas'],
        ['Adjetivo (vocal)', '-ㄴ데', '날씨가 좋은데 나가요', 'El tiempo está bien, vamos a salir'],
        ['Adjetivo (cons.)', '-은데', '집이 작은데 편해요', 'La casa es pequeña pero cómoda'],
        ['Pasado', '-았/었는데', '먹었는데 배고파요', 'Comí pero tengo hambre'],
        ['이다', '인데', '학생인데 질문이 있어요', 'Soy estudiante y tengo una pregunta'],
      ]
    },
    a2note: "En A2 aprendiste -지만 para contraste claro. -는데 añade un matiz más suave y contextual. '한국어가 어렵지만 재미있어요 (contraste marcado)' vs '한국어가 어려운데 재미있어요 (contexto, matiz más suave)'. -는데 también se usa para dar contexto antes de hacer una petición o pregunta.",
    examples: [
      "지금 바쁜데 나중에 전화할게요. (Jigeum babeunde najunge jeonhwahalgeyo.) — Ahora estoy ocupado, te llamaré después. (contexto)",
      "어제 공부했는데 시험이 어려웠어요. (Eoje gongbuhaesseunde siheom-i eoryeowosseoyo.) — Estudié ayer pero el examen fue difícil. (contraste)",
      "저는 외국인인데요, 이 역이 어디예요? (Jeoneun oegugin-indeyo, i yeog-i eodiyeyo?) — Soy extranjero/a y, ¿dónde está esta estación? (preparatorio)",
    ],
    fills: [
      { s: "비가 오___ 우산을 안 가져왔어요. (오다 — llover, verbo)", opts: ['는데', 'ㄴ데', '은데', '았는데'], a: 0, fb: "Verbo presente '오다' → '-는데'. '비가 오는데 = llueve pero/y...' Verbos de acción en presente siempre usan -는데." },
      { s: "한국 음식이 맵___ 맛있어요. (맵다 — picante, adjetivo)", opts: ['은데', 'ㄴ데', '는데', '었는데'], a: 0, fb: "'맵다' adj, stem '맵' termina en consonante → '-은데'. '매운데' sería el adj modificador. '한국 음식이 매운데 = la comida coreana es picante y/pero...' (맵 + 은데 = 매운데)." },
      { s: "어제 많이 먹었___ 또 배가 고파요. (pasado)", opts: ['는데', 'ㄴ데', '은데', '었는데'], a: 3, fb: "Pasado de verbo: '-았/었는데'. '먹었는데 = comí pero/y...'. El pasado añade -았/었 antes de -는데. Contraste: 'comí mucho pero de nuevo tengo hambre'." },
      { s: "저는 초보자___ 도움이 필요해요. (이다 — ser)", opts: ['인데', '는데', 'ㄴ데', '은데'], a: 0, fb: "'이다' → '인데'. '초보자인데요 = soy principiante y...' (usado para dar contexto antes de pedir ayuda). Con vocal + 이다 → 인데." },
      { s: "서울이 복잡___ 좋아요. (복잡하다 — complicado)", opts: ['한데', '는데', '은데', 'ㄴ데'], a: 0, fb: "'복잡하다' adj + 은데/ㄴ데. '복잡한데 좋아요 = aunque es complicado, me gusta'. '복잡하다' → stem '복잡하' → '복잡한데' (어미 연결형)." },
    ],
    transforms: [
      { prompt: "Combina usando -는데 como contexto:", s: "지금 피곤해요. 좀 쉬고 싶어요.", opts: ["지금 피곤한데 좀 쉬고 싶어요.", "지금 피곤하지만 좀 쉬고 싶어요.", "지금 피곤해서 좀 쉬고 싶어요.", "지금 피곤하고 좀 쉬고 싶어요."], a: 0, fb: "'피곤한데 쉬고 싶어요' — -는데 da contexto suave para introducir la petición/deseo. '피곤하지만' sería más marcado. '-는데' aquí da el trasfondo (soy principiante / estoy cansado) para motivar lo que sigue." },
      { prompt: "Usa -는데 para expresar contraste pasado:", s: "열심히 운동했어요. 그런데 살이 안 빠졌어요.", opts: ["열심히 운동했는데 살이 안 빠졌어요.", "열심히 운동해서 살이 안 빠졌어요.", "열심히 운동하지만 살이 안 빠졌어요.", "열심히 운동했기 때문에 살이 안 빠졌어요."], a: 0, fb: "'운동했는데' — pasado '-았/었는데' para contraste: 'Hice ejercicio pero no adelgacé'. '했는데' = '했(pasado)' + '-는데'. Muy natural para expresar resultados inesperados." },
      { prompt: "Usa -는데 para preparar una pregunta (uso preparatorio):", s: "Quieres preguntar sobre el horario (eres estudiante).", opts: ["저는 학생인데요, 수업 시간이 어떻게 돼요?", "저는 학생이지만 수업 시간이 어떻게 돼요?", "저는 학생이어서 수업 시간이 어떻게 돼요?", "저는 학생이고 수업 시간이 어떻게 돼요?"], a: 0, fb: "'학생인데요, 질문이 있어요 / 수업 시간이...' — uso preparatorio de -는데: dar contexto personal antes de hacer la pregunta. Muy cortés y natural. '인데요' con 요 suaviza aún más." },
    ],
    errors: [
      { s: "오늘 바쁘는데 나중에 얘기해요.", q: "¿Cuál es el error?", opts: ["'바쁘는데' es incorrecto — adjetivos usan -(으)ㄴ데: '바쁜데'", "No hay error", "Debe ser '바쁘기 때문에'", "Debe ser '바쁘지만'"], a: 0, fb: "'바쁘다' es adjetivo → '바쁜데' (vocal → ㄴ데). '바쁘는데' es un error muy común de confundir verbos (que usan -는데) con adjetivos (que usan -ㄴ/은데). '오늘 바쁜데 나중에 얘기해요 = hoy estoy ocupado, hablemos después'." },
      { s: "어제 비가 왔는데 우산을 안 가져갔어요.", q: "¿Es correcta la forma '왔는데'?", opts: ["Sí: '왔는데' = pasado de '오다' + -는데. Correcto.", "No: debe ser '오는데'", "No: debe ser '왔지만'", "No: debe ser '왔어서'"], a: 0, fb: "'왔는데' = '왔 (pasado de 오다)' + '-는데'. Es correcto. El pasado de verbos de acción antes de -는데: '-았/었는데'. 'Ayer llovió y/pero no llevé paraguas'." },
    ],
    production: "Escribe 4 oraciones usando -는데 para: (1) dar contexto, (2) expresar contraste, (3) preparar una pregunta, (4) expresar sorpresa."
  },
];

export default function GramaticaCoreanoB1() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [fillAns, setFillAns] = useState<Record<number, number>>({});
  const [transAns, setTransAns] = useState<Record<number, number>>({});
  const [errAns, setErrAns] = useState<Record<number, number>>({});
  const [prodText, setProdText] = useState('');
  const [prodDone, setProdDone] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const t = TOPICS[topicIdx];
  const allFill = t.fills.every((_, i) => fillAns[i] !== undefined);
  const allTrans = t.transforms.every((_, i) => transAns[i] !== undefined);
  const allErr = t.errors.every((_, i) => errAns[i] !== undefined);
  const allMCQ = allFill && allTrans && allErr;
  const total = t.fills.length + t.transforms.length + t.errors.length;
  const correct =
    t.fills.filter((q, i) => fillAns[i] === q.a).length +
    t.transforms.filter((q, i) => transAns[i] === q.a).length +
    t.errors.filter((q, i) => errAns[i] === q.a).length;

  function reset() {
    setFillAns({}); setTransAns({}); setErrAns({});
    setProdText(''); setProdDone(false); setShowResult(false);
  }

  function bs(done: boolean, ok: boolean, sel: boolean) {
    if (!done) return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--ink)' };
    if (ok) return { background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', color: 'var(--wl-on-panel-ok, #059669)' };
    if (sel) return { background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: 'var(--wl-on-panel-alert, #dc2626)' };
    return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano B1</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>📐 문법</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />문법 · Coreano B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Gramática B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 560, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          5 temas clave del B1 con tabla de conjugación, ejemplos reales, 5 fill-in-blank, 3 transformaciones, 2 detección de errores y producción libre.
        </p>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {TOPICS.map((tp, i) => (
            <button key={tp.id} onClick={() => { setTopicIdx(i); reset(); }}
              className={topicIdx === i ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.78rem', ...(topicIdx === i ? { background: C, borderColor: C } : {}) }}>
              {tp.icon} {tp.title}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.4rem', borderRadius: 16, background: `${C}08`, border: `1.5px solid ${C}22`, marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem', fontSize: '1rem' }}>{t.icon} {t.title}</div>
          <p style={{ margin: '0 0 0.6rem', fontSize: '0.87rem', color: 'var(--muted)', lineHeight: 1.7 }}>{t.rule}</p>
          <div style={{ padding: '0.5rem 0.75rem', borderRadius: 8, background: `${C}0d`, fontSize: '0.82rem', color: C, borderLeft: `3px solid ${C}`, marginBottom: '0.85rem', lineHeight: 1.6 }}>
            💡 {t.tip}
          </div>
          <div style={{ overflowX: 'auto', marginBottom: '0.85rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', minWidth: 380 }}>
              <thead>
                <tr>{t.table.headers.map((h, hi) => (
                  <th key={hi} style={{ padding: '0.45rem 0.7rem', background: `${C}18`, border: '1px solid var(--line-soft)', textAlign: 'left', fontWeight: 800, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {t.table.rows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '0.4rem 0.7rem', border: '1px solid var(--line-soft)', color: 'var(--ink)', lineHeight: 1.45, background: ri % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)' }}>{cell}</td>
                  ))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', padding: '0.5rem 0.75rem', borderRadius: 8, background: 'rgba(0,0,0,0.04)', borderLeft: '3px solid var(--muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
            📌 <strong style={{ color: 'var(--ink)' }}>vs A2:</strong> {t.a2note}
          </div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Ejemplos en contexto real</div>
          {t.examples.map((ex, ei) => (
            <p key={ei} style={{ margin: '0 0 0.3rem', fontSize: '0.84rem', color: 'var(--ink)', lineHeight: 1.6, borderLeft: '2px solid var(--line-soft)', paddingLeft: '0.6rem' }}>
              &ldquo;{ex}&rdquo;
            </p>
          ))}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>📝</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Completa las oraciones</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.fills.filter((_, i) => fillAns[i] !== undefined).length}/{t.fills.length}
            </span>
          </div>
          {t.fills.map((q, qi) => {
            const ans = fillAns[qi]; const done = ans !== undefined;
            const parts = q.s.split('___');
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <p style={{ margin: '0 0 0.7rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {qi + 1}.{' '}
                  {parts.map((part, pi) => (
                    <span key={pi}>{part}{pi < parts.length - 1 && (
                      <span style={{ display: 'inline-block', minWidth: 72, borderBottom: `2px solid ${C}`, margin: '0 3px', textAlign: 'center', verticalAlign: 'bottom' }}>
                        {done && <span style={{ fontSize: '0.85rem', fontWeight: 800, color: ans === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                      </span>
                    )}</span>
                  ))}
                </p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setFillAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.9rem', borderRadius: 7, fontSize: '0.88rem', fontWeight: 700, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ 정답! ' : `✗ 정답: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔄</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Transforma las oraciones</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.transforms.filter((_, i) => transAns[i] !== undefined).length}/{t.transforms.length}
            </span>
          </div>
          {t.transforms.map((q, qi) => {
            const ans = transAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wl-on-panel-warn, #d97706)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔄 {q.prompt}</div>
                <p style={{ margin: '0 0 0.7rem', fontSize: '0.92rem', color: 'var(--ink)', fontStyle: 'italic', borderLeft: '3px solid var(--line-soft)', paddingLeft: '0.5rem', fontWeight: 600 }}>
                  &ldquo;{q.s}&rdquo;
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setTransAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.5rem 0.9rem', borderRadius: 8, fontSize: '0.87rem', ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.12s', lineHeight: 1.45 }}>
                        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', opacity: 0.6, marginRight: '0.4rem' }}>{['A', 'B', 'C', 'D'][oi]}.</span>
                        {opt}{done && oi === q.a && ' ✓'}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ ' : `✗ 정답: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔍</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Detecta el error</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.errors.filter((_, i) => errAns[i] !== undefined).length}/{t.errors.length}
            </span>
          </div>
          {t.errors.map((q, qi) => {
            const ans = errAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wl-on-panel-alert, #dc2626)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔍 오류를 찾아보세요</div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: 'var(--wl-on-panel-alert, #dc2626)', fontSize: '0.93rem', fontFamily: 'var(--mono)', borderLeft: '3px solid #dc2626', paddingLeft: '0.5rem', lineHeight: 1.5 }}>{q.s}</p>
                <p style={{ margin: '0 0 0.65rem', fontSize: '0.83rem', color: 'var(--muted)' }}>{q.q}</p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setErrAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.85rem', borderRadius: 7, fontSize: '0.85rem', fontWeight: 600, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ 정답! ' : `✗ 정답: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>✍️</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>쓰기 자유 (Producción libre)</span>
          </div>
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.2)', marginBottom: '0.85rem' }}>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>{t.production}</p>
          </div>
          {!allMCQ && (
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>
              🔒 Completa todos los ejercicios de arriba para desbloquear la producción libre.
            </p>
          )}
          {allMCQ && !prodDone && (
            <>
              <textarea value={prodText} onChange={e => setProdText(e.target.value)} rows={5}
                placeholder="한국어로 써 보세요... (Escribe aquí en coreano o romanización)"
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.92rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  {prodText.trim() ? prodText.trim().split(/\s+/).length : 0} palabras
                </span>
                <button className="btn btn-sm"
                  onClick={() => { if (prodText.trim().split(/\s+/).filter(Boolean).length >= 8) setProdDone(true); }}
                  disabled={prodText.trim().split(/\s+/).filter(Boolean).length < 8}
                  style={{ background: '#059669', borderColor: '#059669', opacity: prodText.trim().split(/\s+/).filter(Boolean).length >= 8 ? 1 : 0.5 }}>
                  완료 →
                </button>
              </div>
            </>
          )}
          {prodDone && (
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.25)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>내 쓰기</div>
              <p style={{ margin: '0 0 0.7rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{prodText}</p>
              <button className="btn btn-ghost btn-sm" onClick={() => { setProdText(''); setProdDone(false); }} style={{ fontSize: '0.78rem' }}>수정하기</button>
            </div>
          )}
        </div>

        {allMCQ && prodDone && !showResult && (
          <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background: C, borderColor: C, marginBottom: '1rem' }}>
            결과 보기 →
          </button>
        )}

        {showResult && (
          <div style={{ padding: '1.75rem', borderRadius: 18, border: `2px solid ${C}33`, background: `${C}06`, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {correct === total ? '🏆' : correct >= Math.ceil(total * 0.7) ? '⭐' : '📖'}
            </div>
            <h2 style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)', fontSize: '1.3rem' }}>
              {correct} / {total} ejercicios correctos
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
              {correct === total
                ? '완벽해요! 이 주제를 잘 알고 있어요.'
                : correct >= Math.ceil(total * 0.7)
                ? '잘 했어요! ✗ 표시된 문제를 다시 확인하세요.'
                : '위의 설명을 다시 읽고 다시 도전해 보세요.'}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: C, borderColor: C }}>다시 시도 →</button>
              {topicIdx < TOPICS.length - 1 && (
                <button className="btn btn-ghost btn-sm" onClick={() => { setTopicIdx(topicIdx + 1); reset(); }}>
                  다음 주제 →
                </button>
              )}
              <Link href="/practica/coreano/b1" className="btn btn-ghost btn-sm">← Volver a B1</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
