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
  a1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'pasado', title: '았/었어요 (Pasado)', icon: '⏰',
    rule: "El pasado en coreano: verbos y adjetivos + 았어요 (después de vocal brillante ㅏ/ㅗ) o 었어요 (después de otras vocales). 하다 → 했어요 (irregular). Negativo pasado: 안 + verbo + 았/었어요 O verbo + 지 않았어요. Pregunta: ～았/었어요? (entonación ascendente). Partícula de tiempo: 어제 (ayer), 지난주에 (la semana pasada), ～전에 (hace ～).",
    tip: "Regla rápida: mira la vocal de la última sílaba del stem. ㅏ u ㅗ → 았어요. Cualquier otra vocal → 었어요. 하다 siempre → 했어요. Ejemplos: 가다 (ga) → 갔어요 (gasseoyo); 먹다 (eok) → 먹었어요 (meogeosseoyo); 공부하다 → 공부했어요.",
    table: {
      headers: ['Verbo', 'Romanización', 'Vocal stem', 'Pasado (pol.)', 'Significado'],
      rows: [
        ['가다', 'gada', 'ㅏ', '갔어요 (gasseoyo)', 'fue / fui'],
        ['먹다', 'meokda', 'ㅓ', '먹었어요 (meogeosseoyo)', 'comió / comí'],
        ['오다', 'oda', 'ㅗ', '왔어요 (wasseoyo)', 'vino / vine'],
        ['배우다', 'baeuda', 'ㅜ', '배웠어요 (baewosseoyo)', 'aprendió / aprendí'],
        ['공부하다', 'gongbuhada', '하다', '공부했어요 (gongbuhaesseoyo)', 'estudió / estudié'],
      ]
    },
    a1note: "En A1 usabas el presente polite: '먹어요 (como)' y '가요 (voy)'. El pasado 았/었어요 narra eventos terminados: '어제 피자를 먹었어요 (ayer comí pizza)'. Presente = realidad actual; pasado = evento concluido.",
    examples: [
      "어제 친구를 만났어요. (Eoje chingureul mannasseoyo.) — Ayer me encontré con un amigo. (가다 → 갔어요: vocal ㅏ)",
      "도서관에서 공부했어요. (Doseogwane-seo gongbuhaesseoyo.) — Estudié en la biblioteca. (하다 → 했어요: irregular)",
      "오늘 점심을 안 먹었어요. (Oneul jeomsimeul an meogeosseoyo.) — Hoy no comí el almuerzo. (negativo: 안 + verbo pasado)",
    ],
    fills: [
      { s: "어제 영화를 ___ . (보다 — ver)", opts: ['봐요', '봤어요', '보았어요', '봅니다'], a: 1, fb: "'봤어요' = pasado de '보다'. Vocal ㅗ → 았어요, pero se contrae: 보+았→봤어요." },
      { s: "저는 어제 음식을 ___ . (만들다 — hacer/cocinar)", opts: ['만들어요', '만들었어요', '만들었습니다', '만들지 않아요'], a: 1, fb: "'만들었어요' — stem '만들', vocal ㄹ → 었어요. Forma polite de pasado." },
      { s: "우리 팀이 경기에서 ___ . (이기다 — ganar)", opts: ['이겨요', '이겼어요', '이겼습니다', '이기었어요'], a: 1, fb: "'이겼어요' — '이기다' vocal ㅣ → 었어요, contrae a 겼어요." },
      { s: "그녀는 한국어를 ___ . (배우다 — aprender)", opts: ['배워요', '배웠어요', '배웁니다', '배우었어요'], a: 1, fb: "'배웠어요' — '배우다' vocal ㅜ → 었어요, se contrae: 우+었→웠어요." },
      { s: "오늘 아침에 커피를 ___ . (마시다 — beber/tomar)", opts: ['마셔요', '마셨어요', '마시었어요', '마십니다'], a: 1, fb: "'마셨어요' — '마시다' vocal ㅣ → 었어요, se contrae: 이+었→셨어요." },
    ],
    transforms: [
      { prompt: "Convierte al pasado polite (았/었어요):", s: "저는 매일 운동해요. (오늘 아침에)", opts: ["오늘 아침에 운동했어요.", "오늘 아침에 운동했습니다.", "오늘 아침에 운동이었어요.", "오늘 아침에 운동하었어요."], a: 0, fb: "'운동하다' → 하다 irregular → '운동했어요'. '했어요' es la forma polite de pasado para verbos 하다." },
      { prompt: "Convierte a negativo pasado:", s: "저는 어제 학교에 갔어요.", opts: ["저는 어제 학교에 안 갔어요.", "저는 어제 학교에 가지 않았어요.", "저는 어제 학교에 안 갔어요. / 가지 않았어요.", "저는 어제 학교에 갔지 않았어요."], a: 2, fb: "Dos formas correctas de negativo pasado: '안 + verbo pasado' o 'verbo stem + 지 않았어요'. Ambas son válidas." },
      { prompt: "Forma una pregunta en pasado:", s: "Pregunta si alguien comió 비빔밥 (bibimbap) ayer.", opts: ["어제 비빔밥을 먹었어요?", "어제 비빔밥을 먹어요?", "어제 비빔밥 먹었습니까?", "어제 비빔밥을 먹었나요?"], a: 0, fb: "Pregunta en pasado: '먹었어요?' con entonación ascendente. '먹었습니까?' también es correcto pero más formal. '먹었나요?' es una alternativa educada." },
    ],
    errors: [
      { s: "어제 저는 영화를 봤습니다.", q: "¿Hay un error en esta oración?", opts: ["Sí: '봤습니다' debe ser '봐요'", "Sí: '어제' debe ir al final", "No hay error — '봤습니다' es el pasado formal correcto", "Sí: '저는' debe ser '제가'"], a: 2, fb: "'봤습니다' es el pasado formal (합쇼체) de '보다'. Es correcto. '봐요' es presente. La oración significa 'Ayer vi una película.' Es perfectamente correcta." },
      { s: "그는 어제 학교에 갔었어요.", q: "¿Cuál es el uso de '갔었어요' aquí?", opts: ["Es un error — debería ser '갔어요'", "Es correcto — indica pasado remoto que ya no aplica", "Es un error — debería ser '갈 거예요'", "Es correcto, es el único modo de expresar el pasado"], a: 1, fb: "'갔었어요' (pasado doble) indica que fue al colegio en el pasado pero ya no va. '갔어요' solo indica que fue ayer. El doble pasado tiene un matiz especial de contraste con el presente." },
    ],
    production: "Escribe 4 frases sobre lo que hiciste el fin de semana pasado. Usa verbos con distintas vocales (ㅏ/ㅗ y otras). Ejemplo: '주말에 ___ 었/았어요.'"
  },
  {
    id: 'intencion', title: '-(으)려고 하다 (Intención)', icon: '🎯',
    rule: "-(으)려고 하다 = tener la intención de / planear. Si el stem termina en consonante: 으려고 하다. Si termina en vocal: 려고 하다. Se usa para planes propios (no para otras personas). Para planes confirmados se puede usar -(으)ㄹ 거예요 (Tema 4). Con estar en camino de: -(으)려고 하다 + 이다 (cuando el plan es inminente).",
    tip: "Diferencia crucial: '가려고 해요' = 'tengo intención de ir' (plan interno, puede cambiar). '갈 거예요' = 'voy a ir' (decisión más firme). Para planes del futuro inmediato en conversación, coreanos usan -려고 해요 para mostrar consideración y flexibilidad.",
    table: {
      headers: ['Verbo', 'Romanización', 'Stem final', 'Forma', 'Significado'],
      rows: [
        ['가다', 'gada', 'vocal', '가려고 해요', 'tengo intención de ir'],
        ['먹다', 'meokda', 'consonante', '먹으려고 해요', 'tengo intención de comer'],
        ['공부하다', 'gongbuhada', '하다', '공부하려고 해요', 'tengo intención de estudiar'],
        ['만들다', 'mandeulda', 'ㄹ (특수)', '만들려고 해요', 'tengo intención de hacer'],
        ['쉬다', 'swida', 'vocal', '쉬려고 해요', 'tengo intención de descansar'],
      ]
    },
    a1note: "En A1 expresabas planes simples con el presente: '내일 학교에 가요 (mañana voy al colegio)'. Con -(으)려고 해요, comunicas que tienes esa intención formada pero flexible: '내일 학교에 가려고 해요'. Suena más natural en conversación espontánea.",
    examples: [
      "올해 한국어를 배우려고 해요. (Olhae hangugeo-reul baeuryrago haeyo.) — Este año tengo la intención de aprender coreano.",
      "주말에 친구를 만나려고 해요. (Jumar-e chingureul mannalyrago haeyo.) — El fin de semana tengo intención de ver a un amigo.",
      "다이어트를 시작하려고 했지만 어려워요. (Daieoteureul sijakhalyrago haessji-man eoryeowoyo.) — Tenía intención de empezar dieta pero es difícil.",
    ],
    fills: [
      { s: "저는 다음 달에 한국에 ___ . (가다)", opts: ['가려고 해요', '갈 거예요', '가려고 합니다', '가고 싶어요'], a: 0, fb: "'가려고 해요' expresa intención personal de ir. '갈 거예요' también es correcto pero indica decisión más firme. Aquí se pide la estructura -(으)려고 하다." },
      { s: "오늘 저녁에 요리를 ___ . (하다)", opts: ['하려고 해요', '할 거예요', '하고 싶어요', '할 것 같아요'], a: 0, fb: "'하려고 해요' — intención de cocinar esta tarde. '하다' termina en vocal (하-) → 하려고 해요 (sin 으)." },
      { s: "새 핸드폰을 ___ . (사다 — comprar)", opts: ['사려고 해요', '살 거예요', '사고 싶어요', '샀어요'], a: 0, fb: "'사려고 해요' — intención de comprar un nuevo teléfono. '사다' termina en vocal → '사려고 해요'." },
      { s: "내년에 대학원에 ___ . (들어가다 — ingresar)", opts: ['들어가려고 해요', '들어갈 거예요', '들어가고 싶어요', '들어갔어요'], a: 0, fb: "'들어가려고 해요' — intención de ingresar al posgrado el próximo año. Termina en vocal → 려고 해요." },
      { s: "주말에 영화를 ___ . (보다)", opts: ['보려고 해요', '볼 거예요', '보고 싶어요', '봤어요'], a: 0, fb: "'보려고 해요' — intención de ver una película el fin de semana. '보다' → vocal 오 → 보려고 해요." },
    ],
    transforms: [
      { prompt: "Expresa intención usando -(으)려고 해요:", s: "Quiero ir al gimnasio mañana (es mi plan).", opts: ["내일 헬스장에 가려고 해요.", "내일 헬스장에 갈 거예요.", "내일 헬스장에 가고 싶어요.", "내일 헬스장에 갔어요."], a: 0, fb: "'가려고 해요' — plan/intención. '가고 싶어요' = deseo, más subjetivo. '갈 거예요' = decisión más firme. Para intención formada (pero flexible) → 려고 해요." },
      { prompt: "Convierte el plan a negación de intención:", s: "오늘 외식하려고 해요. (Cambia: 'decidiste no hacerlo')", opts: ["오늘 외식 안 하려고 해요.", "오늘 외식하지 않으려고 해요.", "오늘 외식하려고 하지 않아요.", "Las tres primeras son correctas."], a: 3, fb: "Hay varias formas de negar la intención: '안 + verbo + 려고 해요', 'verbo + 지 않으려고 해요', o 'verbo + 려고 하지 않아요'. Todas son gramaticalmente válidas." },
      { prompt: "Usa -(으)려고 했지만 (intención + contraste):", s: "Quería estudiar ayer pero estaba cansado/a.", opts: ["어제 공부하려고 했지만 피곤했어요.", "어제 공부했지만 피곤했어요.", "어제 공부하고 싶었지만 피곤했어요.", "어제 공부할 거였지만 피곤했어요."], a: 0, fb: "'공부하려고 했지만' = tenía intención de estudiar + pero (contraste). '했지만' expresa el plan pasado que no se cumplió. Muy útil para explicar situaciones." },
    ],
    errors: [
      { s: "저는 친구가 여행하려고 해요.", q: "¿Hay un error con -(으)려고 하다 aquí?", opts: ["Sí: -(으)려고 하다 solo se usa para planes propios; debería ser '친구가 여행할 거예요'", "No hay error", "Sí: debería ser '가려고 해요' no '여행하려고 해요'", "Sí: debería usarse -고 싶다"], a: 0, fb: "-(으)려고 하다 expresa la intención del HABLANTE. Para hablar de los planes de OTROS se usa -(으)ㄹ 거예요: '친구가 여행할 거예요 (mi amigo va a viajar)'. Esta es una distinción clave." },
      { s: "저는 밥을 먹려고 해요.", q: "¿Hay un error gramatical?", opts: ["Sí: '먹다' termina en consonante → debe ser '먹으려고 해요'", "No hay error", "Sí: debe ser '먹고 싶어요'", "Sí: debe ser '먹을 거예요'"], a: 0, fb: "'먹다' termina en consonante ㄱ → se añade 으: '먹으려고 해요'. Regla: consonante final + 으려고, vocal final + 려고. '먹려고' es incorrecto." },
    ],
    production: "Escribe 4 oraciones sobre tus planes para las próximas vacaciones usando -(으)려고 해요."
  },
  {
    id: 'conjetura', title: '-(으)ㄹ 것 같다 (Conjetura)', icon: '🔮',
    rule: "-(으)ㄹ 것 같다 (futuro/conjetura) = parece que... / creo que... Sobre el FUTURO o algo incierto. Presente/estado: -(으)ㄴ 것 같다 (adj) / -는 것 같다 (verbo). Pasado: -(으)ㄴ 것 같다 (verb). Forma polite: -(으)ㄹ 것 같아요. Se usa para suavizar afirmaciones, dar opiniones indirectas, y hacer predicciones educadas. Los coreanos lo usan mucho para ser corteses: 'creo que es correcto' en lugar de 'es correcto'.",
    tip: "Muy cortés y muy usado. Cuando quieras dar una opinión sin ser demasiado directo, usa -(으)ㄹ 것 같아요. '비가 올 것 같아요 (creo que va a llover)' suena más natural que '비가 와요 (llueve)' cuando no estás seguro. Muy importante para el habla educada coreana.",
    table: {
      headers: ['Tiempo', 'Verbo/Adj', 'Forma', 'Ejemplo', 'Significado'],
      rows: [
        ['Futuro/incierto', 'Verbo stem + vocal', '-(으)ㄹ 것 같아요', '비가 올 것 같아요', 'Creo que va a llover'],
        ['Futuro/incierto', 'Verbo stem + consonante', '-(으)ㄹ 것 같아요', '늦을 것 같아요', 'Creo que voy a llegar tarde'],
        ['Presente (adj)', 'Adj stem + vocal', '-ㄴ 것 같아요', '맛있을 것 같아요 → 맛있는 것 같아요 (pres)', 'Parece que está rico'],
        ['Pasado', 'Verbo', '-ㄴ 것 같아요', '간 것 같아요', 'Parece que fue'],
        ['Pasado', 'Adj', '-았/었던 것 같아요', '피곤했던 것 같아요', 'Parece que estaba cansado'],
      ]
    },
    a1note: "En A1 usabas el presente simple para hechos: '날씨가 좋아요 (el clima está bien)'. Con -(으)ㄹ 것 같아요, expresas incertidumbre o cortesía: '날씨가 좋을 것 같아요 (creo que el clima va a estar bien)'. Mucho más educado y natural en conversación.",
    examples: [
      "오늘 비가 올 것 같아요. (Oneul bi-ga ol geot gata-yo.) — Creo que hoy va a llover. (predicción)",
      "그 식당 음식이 맛있을 것 같아요. (Geu sikdang eumsig-i masissul geot gata-yo.) — Parece que la comida de ese restaurante estará rica.",
      "이 시험이 어려울 것 같아요. (I siheom-i eoryeoul geot gata-yo.) — Creo que este examen va a ser difícil.",
    ],
    fills: [
      { s: "내일 날씨가 추울 ___ . (creo que hará frío)", opts: ['것 같아요', '것입니다', '거예요', '것 같습니다'], a: 0, fb: "'것 같아요' — forma polite de -(으)ㄹ 것 같다. '것 같습니다' también es correcto (más formal). '거예요' indica certeza, no conjetura." },
      { s: "그 책이 재미있을 ___ . (creo que será interesante)", opts: ['것 같아요', '거예요', '것입니다', '줄 알아요'], a: 0, fb: "'것 같아요' — conjetura sobre algo que aún no has experimentado. '재미있을 것 같아요' = 'creo que será interesante'." },
      { s: "지금쯤 그녀가 집에 도착했을 ___ . (creo que ya llegó a casa)", opts: ['것 같아요', '거예요', '줄 알아요', '것 같습니다'], a: 0, fb: "'도착했을 것 같아요' — conjetura sobre algo que probablemente ya ocurrió (pasado). '했을 것 같아요' indica pasado probable." },
      { s: "저 가방이 비쌀 ___ . (creo que esa bolsa será cara)", opts: ['것 같아요', '거예요', '것입니다', '줄 알아요'], a: 0, fb: "'비쌀 것 같아요' — adj '비싸다' + -(으)ㄹ 것 같아요 para conjetura. '비쌀 것 같아요 = creo que es/será caro'." },
      { s: "시험이 ___ 어려울 것 같아요. (Completa: '...[ya sé que será difícil]')", opts: ['많이', '조금', '진짜', '별로'], a: 2, fb: "'진짜 어려울 것 같아요' — 'creo que será realmente difícil'. '진짜' = realmente/de verdad. '많이' también podría funcionar contextualmente." },
    ],
    transforms: [
      { prompt: "Convierte la certeza en conjetura educada:", s: "내일 바빠요. (mañana estaré ocupado — afirmación directa)", opts: ["내일 바쁠 것 같아요.", "내일 바빴어요.", "내일 바쁠 거예요.", "내일 바쁜 것 같아요."], a: 0, fb: "'바쁠 것 같아요' — conjetura / suavizado de la afirmación. '바쁠 거예요' también es válido pero más directo. '것 같아요' suena más cortés y considerado." },
      { prompt: "Haz una predicción sobre el futuro:", s: "Predice si mañana lloverá (creo que sí).", opts: ["내일 비가 올 것 같아요.", "내일 비가 왔어요.", "내일 비가 올 거예요.", "내일 비가 오는 것 같아요."], a: 0, fb: "'비가 올 것 같아요' — '오다' + -(으)ㄹ 것 같아요. '오는 것 같아요' sería presente ('parece que está lloviendo ahora'). '올 것 같아요' = futuro probable." },
      { prompt: "Da una opinión indirecta y educada:", s: "¿Qué piensas del nuevo restaurante? (Parece bueno)", opts: ["새 식당이 좋을 것 같아요.", "새 식당이 좋아요.", "새 식당이 좋을 거예요.", "새 식당이 좋은 것 같아요."], a: 0, fb: "'좋을 것 같아요' (futuro/conjetura) es la forma más educada de opinar sobre algo que no has probado. '좋은 것 같아요' sería para algo que ya has observado en el momento." },
    ],
    errors: [
      { s: "오늘 날씨가 좋은 것 같아요.", q: "Si quieres decir 'creo que HOY hará buen tiempo' (futuro/predicción), ¿es correcta esta frase?", opts: ["No: debería ser '좋을 것 같아요' (futuro)", "Sí, es correcta", "No: debería ser '좋겠어요'", "No: debería ser '좋을 거예요'"], a: 1, fb: "'좋은 것 같아요' puede referirse al estado presente observado ('parece que el tiempo está bien ahora'). Es ambiguo. Para predicción futura clara: '좋을 것 같아요'. Ambas son gramaticalmente válidas según contexto." },
      { s: "그 영화가 재미있을 것 같았어요.", q: "¿Es correcta esta forma en pasado?", opts: ["Sí: 'creía que esa película sería interesante' (pasado de la conjetura)", "No: debería ser '재미있을 것 같아요'", "No: debería ser '재미있는 것 같아요'", "No: debería ser '재미있었을 것 같아요'"], a: 0, fb: "'재미있을 것 같았어요' es correcto — es el PASADO de la conjetura: 'Antes creía que esa película sería interesante' (conjetura que tenías en el pasado)." },
    ],
    production: "Haz 3 predicciones sobre el tiempo, la clase, o el fin de semana usando -(으)ㄹ 것 같아요."
  },
  {
    id: 'contraste', title: '-지만 (Contraste)', icon: '⚡',
    rule: "-지만 = pero / sin embargo. Se adjunta directamente al stem del verbo/adjetivo (sin necesidad de 아/어). Diferencia con 그런데/그러나: -지만 conecta dentro de la misma oración ('Es difícil pero interesante'), mientras que 그런데 conecta oraciones separadas ('Es difícil. Sin embargo, es interesante'). Con ser/estar: 이다 → 이지만 / 아니다 → 아니지만. Formal escrito: -지만 / -나 (literario).",
    tip: "¡Muy versátil! '한국어는 어렵지만 재미있어요 (El coreano es difícil pero interesante)'. El verbo/adjetivo antes de 지만 NO lleva 요 — la terminación polite va solo en el segundo verbo. Stem + 지만 (sin 요) + segundo verbo + 아/어요.",
    table: {
      headers: ['Tipo', 'Stem', 'Forma -지만', 'Ejemplo', 'Significado'],
      rows: [
        ['Adjetivo', '어렵-', '어렵지만', '어렵지만 재미있어요', 'Es difícil pero interesante'],
        ['Verbo', '먹-', '먹지만', '먹지만 배가 고파요', 'Como pero tengo hambre'],
        ['이다 (ser)', '학생이-', '학생이지만', '학생이지만 일해요', 'Soy estudiante pero trabajo'],
        ['있다', '있-', '있지만', '돈이 있지만 안 써요', 'Tengo dinero pero no lo gasto'],
        ['Pasado + 지만', '갔-', '갔지만', '갔지만 없었어요', 'Fui pero no estaba'],
      ]
    },
    a1note: "En A1 dabas descripciones simples: '이 음식이 맛있어요 (esta comida está rica)'. Con -지만 añades contraste dentro de la misma frase: '이 음식이 비싸지만 맛있어요 (esta comida es cara pero está rica)'. Hablar con matices = nivel A2+.",
    examples: [
      "서울은 크지만 교통이 복잡해요. (Seo-ul-eun keujiman gyotong-i bokjab-haeyo.) — Seúl es grande pero el tráfico es complicado.",
      "저는 한국어를 공부하지만 아직 잘 못 해요. (Jeoneun hangugeo-reul gongbuhajiman ajik jal mot haeyo.) — Estudio coreano pero todavía no lo hablo bien.",
      "그 영화는 길지만 아주 재미있어요. (Geu yeonghwa-neun giljiman aju jaemi-isseoyo.) — Esa película es larga pero muy interesante.",
    ],
    fills: [
      { s: "한국 음식이 맛있___ 너무 매워요.", opts: ['지만', '어서', '고', '는데'], a: 0, fb: "'-지만' = contraste: 'la comida coreana es rica PERO es muy picante'. '-고' conecta sin contraste. '-어서' es causa. '-지만' es el conector de contraste por excelencia." },
      { s: "저는 영어를 잘 하___ 한국어는 잘 못 해요.", opts: ['지만', '어서', '려고', '고'], a: 0, fb: "'-지만' — contraste entre dos habilidades: 'hablo inglés bien PERO el coreano no lo hablo bien'. Stem '하' + 지만 = '하지만'." },
      { s: "그 영화를 봤___ 별로 재미없었어요.", opts: ['지만', '어서', '고', '기 때문에'], a: 0, fb: "'-지만' en pasado: '봤지만' = 'vi (la película) pero no fue muy interesante'. '봤-' + 지만 = '봤지만'." },
      { s: "비가 오___ 공원에 갔어요.", opts: ['지만', '어서', '는데', '고'], a: 0, fb: "'-지만' — contraste: 'llovía PERO fui al parque'. '오지만' (presente) describe la lluvia como contraste al hecho de ir al parque." },
      { s: "저는 학생이___ 아르바이트를 해요.", opts: ['지만', '어서', '고', '기 때문에'], a: 0, fb: "'이다' + 지만 = '이지만'. '저는 학생이지만 아르바이트를 해요 = Soy estudiante pero trabajo part-time'." },
    ],
    transforms: [
      { prompt: "Combina las oraciones con -지만:", s: "서울은 비싸요. 서울은 좋아요.", opts: ["서울은 비싸지만 좋아요.", "서울은 비싸서 좋아요.", "서울은 비싸고 좋아요.", "서울은 비쌌지만 좋아요."], a: 0, fb: "'비싸지만 좋아요' — adj '비싸다' + 지만. Se elimina la '아' final del stem y se añade directamente 지만. Muy natural y fluido." },
      { prompt: "Usa -지만 para expresar contraste entre pasado y presente:", s: "어제 피곤했어요. 오늘은 괜찮아요.", opts: ["어제 피곤했지만 오늘은 괜찮아요.", "어제 피곤했어서 오늘은 괜찮아요.", "어제 피곤했고 오늘은 괜찮아요.", "어제 피곤했는데 오늘은 괜찮아요."], a: 0, fb: "'피곤했지만' — pasado + 지만. '했지만' = 'estaba cansado PERO'. '했는데' también sería aceptable (más suave), pero '했지만' es el contraste más claro." },
      { prompt: "Corrige el error de posición del 요:", s: "한국어는 어려워요지만 재미있어요.", opts: ["한국어는 어렵지만 재미있어요.", "한국어는 어렵지만 재미있어요.", "한국어는 어려워지만 재미있어요.", "A y B son iguales"], a: 3, fb: "La regla clave: el polite '요' NO va antes de '지만'. Se dice '어렵지만' (stem + 지만), NO '어려워요지만'. El 요 solo aparece en el último verbo de la oración." },
    ],
    errors: [
      { s: "저는 운동하지만요 건강해요.", q: "¿Cuál es el error?", opts: ["'하지만요' — no se añade 요 a 지만", "'건강해요' debe ser '건강했어요'", "'저는' debe ser '제가'", "No hay error"], a: 0, fb: "'-지만' nunca lleva '요'. Es un conector de cláusulas, no un predicado. La forma correcta es '운동하지만 건강해요'. El '요' solo va al final del predicado." },
      { s: "비싸지만는 좋아요.", q: "¿Cuál es el error gramatical?", opts: ["'지만는' es incorrecto — solo '-지만'", "'비싸' debe ser '비쌌'", "'좋아요' debe ser '좋아요?'", "No hay error"], a: 0, fb: "'-지만는' no existe. El conector es simplemente '-지만'. No se añade ninguna partícula después de 지만. Correcto: '비싸지만 좋아요'." },
    ],
    production: "Describe algo que te gusta y no te gusta de tu ciudad, trabajo o un idioma usando -지만 en 3 oraciones."
  },
  {
    id: 'causa', title: '-아/어서 (Causa y Secuencia)', icon: '🔗',
    rule: "-아/어서 tiene DOS usos: (1) CAUSA/RAZÓN (porque → '배가 고파서 먹었어요 = Comí porque tenía hambre'). (2) SECUENCIA de acciones (y luego → '집에 가서 쉬었어요 = Fui a casa y descansé'). Formación: ㅏ/ㅗ → 아서; otras → 어서; 하다 → 해서. IMPORTANTE: con causa, el TIEMPO se marca en el segundo verbo, NO en el primero (no se dice 갔어서 — sino 가서 con el tiempo después). Diferencia con -니까: -아/어서 no se usa con imperativos ni propuestas; para eso usa -(으)니까.",
    tip: "El error más común: '갔어서' NO existe — '가서' (sin tiempo) + tiempo en el segundo verbo. '어제 카페에 가서 공부했어요 (Ayer fui al café y estudié / Ayer fui al café para estudiar)'. El 었/았 solo va en el ÚLTIMO verbo cuando se usa -아/어서.",
    table: {
      headers: ['Stem', 'Vocal regla', 'Forma -아/어서', 'Ejemplo', 'Significado'],
      rows: [
        ['가-', 'ㅏ → 아서', '가서', '집에 가서 쉬었어요', 'Fui a casa y descansé'],
        ['먹-', 'ㅓ → 어서', '먹어서', '많이 먹어서 배불러요', 'Comí mucho así que estoy lleno'],
        ['피곤하-', '하다 → 해서', '피곤해서', '피곤해서 잤어요', 'Estaba cansado así que dormí'],
        ['만나-', 'ㅏ → 아서', '만나서', '친구를 만나서 기뻐요', 'Me alegra encontrarme con mi amigo'],
        ['씻-', 'ㅣ → 어서', '씻어서', '손을 씻어서 먹어요', 'Me lavo las manos y (luego) como'],
      ]
    },
    a1note: "En A1 conectabas oraciones con -고 (y): '먹고 마셔요 (como y bebo)'. -아/어서 añade la relación de CAUSA o SECUENCIA: '배가 고파서 먹어요 (como porque tengo hambre)' o '손을 씻어서 먹어요 (me lavo las manos y luego como)'. -고 es neutral; -아/어서 indica razón o paso previo.",
    examples: [
      "배가 고파서 밥을 먹었어요. (Baega gopa-seo bab-eul meogeosseoyo.) — Comí arroz porque tenía hambre. (causa)",
      "카페에 가서 친구를 만났어요. (Kape-e ga-seo chingureul mannasseoyo.) — Fui al café y (allí) me encontré con un amigo. (secuencia)",
      "한국어가 어려워서 열심히 공부해요. (Hangugeo-ga eoryeowo-seo yeolsimhi gongbuhaeyo.) — Estudio mucho porque el coreano es difícil. (causa)",
    ],
    fills: [
      { s: "피곤___ 일찍 잤어요. (estar cansado → dormir temprano)", opts: ['해서', '하지만', '하고', '하려고'], a: 0, fb: "'피곤해서' — '피곤하다' (하다 verbo) → 해서. Causa: 'Dormí temprano porque estaba cansado'. El tiempo (-었) va en '잤어요', no en '피곤해서'." },
      { s: "도서관에 ___ 공부했어요. (ir a la biblioteca → estudiar)", opts: ['가서', '갔어서', '가지만', '가려고'], a: 0, fb: "'가서' — NO '갔어서'. Con -아/어서, el primer verbo NO lleva tiempo (았/었). '가서' + tiempo en '공부했어요'. Secuencia: 'Fui a la biblioteca y estudié'." },
      { s: "날씨가 좋___ 공원에 갔어요. (buen tiempo → ir al parque)", opts: ['아서', '지만', '고', '려고'], a: 0, fb: "'좋아서' — '좋다' adj + 아서 (vocal 좋 → ㅗ → 아서). Causa: 'Fui al parque porque el clima estaba bien'." },
      { s: "손을 씻___ 밥을 먹어요. (lavarse las manos → comer)", opts: ['어서', '었어서', '고서', '어도'], a: 0, fb: "'씻어서' — '씻다' + 어서 (consonante stem → 어서). Secuencia: 'Me lavo las manos y (luego) como'." },
      { s: "한국 드라마가 재미있___ 매일 봐요. (k-drama → ver todos los días)", opts: ['어서', '지만', '고', '는데'], a: 0, fb: "'재미있어서' — '재미있다' adj + 어서. Causa: 'Veo todos los días porque los k-dramas son interesantes'." },
    ],
    transforms: [
      { prompt: "Combina usando -아/어서 (causa):", s: "배가 고파요. 밥을 먹었어요.", opts: ["배가 고파서 밥을 먹었어요.", "배가 고팠어서 밥을 먹었어요.", "배가 고프지만 밥을 먹었어요.", "배가 고파고 밥을 먹었어요."], a: 0, fb: "'배가 고파서' — '고프다' adj (vocal ㅡ, pero irregular → 고파) + 아서. El tiempo '었' va en '먹었어요'. '고팠어서' NO existe." },
      { prompt: "Combina usando -아/어서 (secuencia):", s: "집에 갔어요. 그리고 샤워했어요.", opts: ["집에 가서 샤워했어요.", "집에 갔어서 샤워했어요.", "집에 가서 샤워해요.", "집에 가지만 샤워했어요."], a: 0, fb: "'집에 가서 샤워했어요' — secuencia: 'Fui a casa y (luego) me duché'. '가서' (sin 었) + tiempo en '샤워했어요'." },
      { prompt: "¿Cuándo usar -어서 vs -(으)니까?", s: "Quieres decir 'Como tengo sueño, ¡vete a dormir!' (imperativo)", opts: ["졸리니까 자세요.", "졸려서 자세요.", "졸리지만 자세요.", "졸려고 자세요."], a: 0, fb: "Con IMPERATIVOS o SUGERENCIAS, usa -(으)니까, NO -어서. '졸리니까 자세요 (Duerme porque tienes sueño)'. '졸려서 자세요' es incorrecto con imperativo." },
    ],
    errors: [
      { s: "어제 카페에 갔어서 공부했어요.", q: "¿Cuál es el error gramatical?", opts: ["'갔어서' no existe — debe ser '가서'", "'공부했어요' debe ser '공부해요'", "El orden de las cláusulas está invertido", "No hay error"], a: 0, fb: "Con -아/어서, el PRIMER verbo nunca lleva 았/었. '갔어서' es incorrecto → '가서'. '어제 카페에 가서 공부했어요' es correcto. El tiempo solo va en el predicado final." },
      { s: "비가 와서 집에 있어요. 나가세요!", q: "¿Es correcto usar -아서 con el imperativo '나가세요'?", opts: ["No: con imperativo debe usarse -니까: '비가 오니까 나가지 마세요'", "Sí, es completamente correcto", "No: debe usarse -지만", "No: debe usarse -고"], a: 0, fb: "-아/어서 NO se usa con imperativos o sugerencias. Para imperativo/propuesta con causa → -(으)니까: '비가 오니까 집에 있어요 / 나가지 마세요'. Este es uno de los errores más comunes en A2." },
    ],
    production: "Explica por qué hiciste 3 cosas ayer usando -아/어서. Ejemplo: '___아/어서 ___었/았어요.'"
  },
];

export default function GramaticaCoreanoA2() {
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
    if (ok) return { background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', color: '#059669' };
    if (sel) return { background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: '#dc2626' };
    return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A2</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>📐 문법</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />문법 · Coreano A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Gramática A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 560, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          5 temas con tabla de conjugación, ejemplos reales, 5 fill-in-blank, 3 transformaciones, 2 detección de errores y producción libre.
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
            📌 <strong style={{ color: 'var(--ink)' }}>vs A1:</strong> {t.a1note}
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
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔄 {q.prompt}</div>
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
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔍 오류를 찾아보세요</div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: '#dc2626', fontSize: '0.93rem', fontFamily: 'var(--mono)', borderLeft: '3px solid #dc2626', paddingLeft: '0.5rem', lineHeight: 1.5 }}>{q.s}</p>
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
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>내 쓰기</div>
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
              <Link href="/practica/coreano/a2" className="btn btn-ghost btn-sm">← Volver a A2</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
