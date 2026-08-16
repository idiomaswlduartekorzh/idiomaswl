'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const COLOR = '#534AB7';

interface ReadingText {
  id: number;
  title: string;
  titleRomaja: string;
  titleEs: string;
  topic: string;
  words: number;
  grammar: string;
  text: string;
  textRomaja: string;
  vocab: Record<string, string>;
  preQ: { q: string; opts: string[]; a: number }[];
  mcq: { q: string; cat: string; opts: string[]; a: number; fb: string }[];
  openQ: string;
  production: string;
}

const TEXTS: ReadingText[] = [
  {
    id: 1, title: '제주도 여행', titleRomaja: 'Jeju-do Yeohaeng', titleEs: 'Viaje a Jeju',
    topic: 'Viajes', words: 90, grammar: '았/었어요 (pasado)',
    text: "지난달에 저는 제주도에 갔어요. 제주도는 한국에서 가장 큰 섬이에요. 한라산이 정말 아름다웠어요. 저는 친구들과 함께 흑돼지를 먹었어요. 흑돼지는 제주도의 특별한 음식이에요. 해산물도 아주 신선했어요. 우리는 바닷가에서 사진을 많이 찍었어요. 제주도의 날씨는 따뜻했어요. 돌담길도 걸었어요. 다음에 또 가고 싶어요.",
    textRomaja: "Jinandan-e jeoneun Jeju-do-e gasseoyo. Jeju-do-neun Hanguk-eseo gajang keun seom-ieyo. Hallasan-i jeongmal areumdaweosseoyo. Jeoneun chingudeul-gwa hamkke heukdwaeji-reul meogeosseoyo. Heukdwaeji-neun Jeju-do-eui teukbyeolhan eumsig-ieyo. Haesanmul-do aju sinseon-haesseoyo. Urineun badatga-eseo sajin-eul mani jikeosseoyo. Jeju-do-eui nalssineun ttatteuthaesseoyo. Doldamgil-do georeosseoyo. Daeumde tto gago sipeoyo.",
    vocab: { '지난달에': 'el mes pasado', '섬': 'isla', '아름다웠어요': 'era hermoso/a', '흑돼지': 'cerdo negro (esp. de Jeju)', '특별한': 'especial', '해산물': 'mariscos', '신선했어요': 'estaba fresco/a', '바닷가': 'orilla del mar / playa', '사진': 'foto', '찍었어요': 'tomó / sacó (fotos)', '날씨': 'clima / tiempo', '따뜻했어요': 'estaba cálido', '돌담길': 'camino de muros de piedra', '걸었어요': 'caminó / caminé' },
    preQ: [
      { q: '¿Has escuchado hablar de la isla de Jeju?', opts: ['Sí, sé bastante', 'Solo un poco', 'Es la primera vez'], a: -1 },
      { q: '¿Qué tipo de comida te gusta probar cuando viajas?', opts: ['Comida local especial', 'Mariscos y pescados', 'Lo que sea rico'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "섬" (seom)?', cat: 'Vocabulario', opts: ['montaña', 'isla', 'playa', 'ciudad'], a: 1, fb: '"섬" (seom) = isla. "제주도는 한국에서 가장 큰 섬이에요" = Jeju es la isla más grande de Corea.' },
      { q: '¿Qué comida especial de Jeju comió el/la narrador/a?', cat: 'Comprensión', opts: ['Kimchi', 'Bibimbap', 'Cerdo negro (흑돼지)', 'Mariscos únicamente'], a: 2, fb: '"흑돼지를 먹었어요" = comió cerdo negro. El 흑돼지 es la comida más famosa de Jeju.' },
      { q: '¿Cómo estaba el clima en Jeju?', cat: 'Comprensión', opts: ['Frío y lluvioso', 'Caluroso y húmedo', 'Cálido (따뜻했어요)', 'Ventoso'], a: 2, fb: '"제주도의 날씨는 따뜻했어요" = el clima de Jeju estaba cálido.' },
      { q: '¿Qué hicieron en la orilla del mar?', cat: 'Comprensión', opts: ['Nadaron', 'Comieron', 'Tomaron muchas fotos', 'Descansaron'], a: 2, fb: '"바닷가에서 사진을 많이 찍었어요" = sacaron muchas fotos en la orilla del mar.' },
      { q: '"갔어요" es el pasado de "가다" (ir). ¿Qué vocal tiene el stem?', cat: 'Gramática', opts: ['ㅓ → 었어요', 'ㅏ → 았어요 (contracción a 갔어요)', 'ㅗ → 았어요', 'hada → 했어요'], a: 1, fb: '"가다" → stem "가", vocal ㅏ → 았어요. Se contrae: 가+았→갔어요. Regla de vocal armónica ㅏ/ㅗ → 았어요.' },
      { q: '¿Quiere volver a Jeju el/la narrador/a?', cat: 'Comprensión', opts: ['No, ya no quiere ir', 'Sí, dice "다음에 또 가고 싶어요"', 'No lo menciona', 'Quiere ir a otra isla'], a: 1, fb: '"다음에 또 가고 싶어요" = quiero volver otra vez. "다음에" = la próxima vez, "또" = otra vez, "가고 싶어요" = quiero ir.' },
    ],
    openQ: 'Describe un viaje que hiciste en el pasado usando 았/었어요. ¿A dónde fuiste? ¿Qué comiste?',
    production: 'Usa: "지난 ___ 에 ___에 갔어요. ___을/를 먹었어요. ___이/가 ___했어요."',
  },
  {
    id: 2, title: '새로운 직장', titleRomaja: 'Saeroun Jikjang', titleEs: 'Nuevo trabajo',
    topic: 'Trabajo', words: 95, grammar: '았/었어요 + -(으)려고 해요',
    text: "저는 지난주에 새 회사에 출근했어요. 첫날에 많이 긴장했어요. 동료들이 친절하게 인사했어요. 점심시간에 같이 밥을 먹었어요. 상사가 회사 규칙을 설명해 줬어요. 업무가 생각보다 많았어요. 하지만 재미있었어요. 앞으로 열심히 일하려고 해요. 한국어도 더 공부하려고 해요. 좋은 동료들과 함께 일할 수 있어서 기뻐요.",
    textRomaja: "Jeoneun jinan-jue sae hoesa-e chulgeun-haesseoyo. Cheotnal-e mani ginjanghasseoyo. Dongnyodeuri chinjeolhage insahaesseoyo. Jeomsim-sigan-e gachi bab-eul meogeosseoyo. Sangsa-ga hoesa gyuchik-eul seorongmyeonghae jwosseoyo. Eommu-ga saenggakboda manhaesseoyo. Hajiman jaemiisseosseoyo. Apeuro yeolsimhi ilharyrago haeyo. Hangugeo-do deo gongbuharyrago haeyo. Joeun dongnyodeul-gwa hamkke ilhal su isseo-seo gibbeyo.",
    vocab: { '지난주에': 'la semana pasada', '새': 'nuevo/a', '출근했어요': 'fue al trabajo (primer día)', '첫날': 'primer día', '긴장했어요': 'estaba nervioso/a', '친절하게': 'amablemente', '인사했어요': 'saludó', '점심시간': 'hora del almuerzo', '업무': 'trabajo / tareas laborales', '설명해 줬어요': 'explicó (para mí)', '앞으로': 'en el futuro / de ahora en adelante', '열심히': 'con esfuerzo / diligentemente', '기뻐요': 'estoy contento/a' },
    preQ: [
      { q: '¿Has empezado algún trabajo nuevo recientemente?', opts: ['Sí, recientemente', 'Hace unos años', 'Todavía no he trabajado'], a: -1 },
      { q: '¿Qué te pone más nervioso al empezar un trabajo nuevo?', opts: ['Conocer a nuevas personas', 'Aprender las tareas', 'Hablar con el jefe'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "동료" (dongnyo)?', cat: 'Vocabulario', opts: ['jefe/a', 'cliente', 'colega / compañero/a', 'subordinado/a'], a: 2, fb: '"동료" = colega o compañero/a de trabajo. "동료들이 친절하게 인사했어요" = los colegas saludaron amablemente.' },
      { q: '¿Cómo se sintió el/la narrador/a el primer día?', cat: 'Comprensión', opts: ['Relajado/a', 'Nervioso/a (긴장했어요)', 'Aburrido/a', 'Emocionado/a'], a: 1, fb: '"첫날에 많이 긴장했어요" = el primer día estaba muy nervioso/a.' },
      { q: '¿Qué hicieron durante el almuerzo?', cat: 'Comprensión', opts: ['Trabajaron', 'Comieron juntos', 'Tuvieron una reunión', 'Descansaron solos'], a: 1, fb: '"점심시간에 같이 밥을 먹었어요" = durante la hora del almuerzo comieron juntos.' },
      { q: '¿Qué planea hacer el/la narrador/a en el futuro?', cat: 'Comprensión', opts: ['Renunciar pronto', 'Trabajar duro y estudiar más coreano', 'Buscar otro trabajo', 'Pedir un aumento'], a: 1, fb: '"앞으로 열심히 일하려고 해요. 한국어도 더 공부하려고 해요." = Tiene intención de trabajar duro y estudiar más coreano.' },
      { q: '"일하려고 해요" usa la estructura -(으)려고 하다. ¿Qué expresa?', cat: 'Gramática', opts: ['Pasado completado', 'Intención / plan personal', 'Conjetura sobre el futuro', 'Contraste'], a: 1, fb: '"-(으)려고 해요" = intención o plan personal formado. "일하려고 해요" = tengo la intención de trabajar. El stem "일하" termina en vocal → 려고 (sin 으).' },
      { q: '¿Qué opina el/la narrador/a sobre el trabajo?', cat: 'Comprensión', opts: ['Es aburrido', 'Es muy difícil', 'Hay mucho trabajo pero es interesante', 'Es perfecto sin problemas'], a: 2, fb: '"업무가 생각보다 많았어요. 하지만 재미있었어요." = Hay más trabajo de lo esperado, pero fue interesante. "하지만" = pero (contraste).' },
    ],
    openQ: 'Escribe 3-4 oraciones sobre algo que empezaste hacer recientemente y tus planes para el futuro. Usa 았/었어요 y -(으)려고 해요.',
    production: 'Usa: "지난주에 ___를 시작했어요. ___했어요. 앞으로 ___려고 해요."',
  },
  {
    id: 3, title: '우리 동네 변화', titleRomaja: 'Uri Dongne Byeonhwa', titleEs: 'Cambios en mi barrio',
    topic: 'Ciudad', words: 92, grammar: '-았/었어요 + -지만',
    text: "우리 동네가 많이 변했어요. 예전에 작은 시장이 있었어요. 지금은 없어졌어요. 대신에 큰 마트가 생겼어요. 편리하지만 옛날 시장이 그리워요. 오래된 카페도 문을 닫았어요. 슬펐지만 새 카페가 더 예뻐요. 공원이 더 커졌어요. 나무도 많이 심었어요. 동네가 깨끗해졌어요. 하지만 옛날 모습이 그립기도 해요.",
    textRomaja: "Uri dongne-ga mani byeonhaesseoyo. Yejeon-e jageun sijang-i isseosseoyo. Jigeumneun eopseojyeosseoyo. Daesine keun mateu-ga saenggyeosseoyo. Pyeollihajiman yennal sijang-i geuriwoyo. Oraedoen kape-do mun-eul dadasseoyo. Seulpeossjiman sae kape-ga deo yeppeyo. Gongwon-i deo keojyeosseoyo. Namu-do mani simeosseoyo. Dongne-ga kkaekkeuthaejyeosseoyo. Hajiman yennal moseub-i geuripgido haeyo.",
    vocab: { '동네': 'barrio / vecindario', '변했어요': 'cambió', '예전에': 'antes / en el pasado', '시장': 'mercado', '없어졌어요': 'desapareció', '대신에': 'en cambio / en su lugar', '생겼어요': 'apareció / surgió', '편리하지만': 'es conveniente pero', '그리워요': 'lo echo de menos', '문을 닫았어요': 'cerró (su puerta)', '슬펐지만': 'estaba triste pero', '심었어요': 'plantaron', '깨끗해졌어요': 'se limpió / quedó limpio', '모습': 'imagen / aspecto' },
    preQ: [
      { q: '¿Tu barrio ha cambiado mucho en los últimos años?', opts: ['Sí, muchísimo', 'Un poco', 'Casi nada'], a: -1 },
      { q: '¿Prefieres los barrios modernos o los tradicionales?', opts: ['Modernos y convenientes', 'Tradicionales y con carácter', 'Una mezcla de ambos'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "동네" (dongne)?', cat: 'Vocabulario', opts: ['ciudad grande', 'barrio / vecindario', 'pueblo rural', 'zona comercial'], a: 1, fb: '"동네" = barrio o vecindario. Es la unidad de comunidad más pequeña en Corea. Se usa mucho en conversación cotidiana.' },
      { q: '¿Qué había antes en el barrio que ahora desapareció?', cat: 'Comprensión', opts: ['Un parque grande', 'Un supermercado', 'Un mercado pequeño (시장)', 'Una escuela'], a: 2, fb: '"예전에 작은 시장이 있었어요. 지금은 없어졌어요." = Antes había un mercado pequeño. Ahora desapareció.' },
      { q: '¿Cómo se siente el/la narrador/a sobre el nuevo supermercado?', cat: 'Comprensión', opts: ['Muy contento/a', 'Es conveniente pero echa de menos el mercado viejo', 'Le disgusta el supermercado', 'Indiferente'], a: 1, fb: '"편리하지만 옛날 시장이 그리워요" = Es conveniente pero echo de menos el mercado de antes. -지만 = contraste.' },
      { q: '¿Qué le pasó al café antiguo?', cat: 'Comprensión', opts: ['Se renovó', 'Cerró (문을 닫았어요)', 'Se hizo más grande', 'Sigue abierto'], a: 1, fb: '"오래된 카페도 문을 닫았어요" = el café antiguo también cerró. "문을 닫다" = cerrar la puerta / cerrar (un negocio).' },
      { q: '"슬펐지만 새 카페가 더 예뻐요" — ¿qué estructura es "-지만"?', cat: 'Gramática', opts: ['Causa y efecto', 'Secuencia temporal', 'Contraste (pero)', 'Intención futura'], a: 2, fb: '"-지만" = pero / sin embargo (contraste). "슬펐지만" = estaba triste pero... Conecta dos ideas contrastantes dentro de la misma oración.' },
      { q: '¿El narrador tiene sentimientos mixtos sobre los cambios?', cat: 'Comprensión', opts: ['No, solo está contento', 'No, solo está triste', 'Sí, le gustan algunos cambios pero echa de menos el pasado', 'No menciona sus sentimientos'], a: 2, fb: 'El texto usa -지만 varias veces para expresar sentimientos mixtos: conveniente pero echa de menos, nuevo es bonito pero extraña lo antiguo. Actitud ambivalente típica.' },
    ],
    openQ: 'Describe 3-4 cambios en tu ciudad o barrio usando 았/었어요 y -지만. ¿Qué ha mejorado? ¿Qué extrañas?',
    production: 'Usa: "예전에 ___이/가 있었어요. 지금은 ___. ___지만 ___."',
  },
  {
    id: 4, title: '친구에게 문자', titleRomaja: 'Chinguege Munja', titleEs: 'Mensajes de texto',
    topic: 'Amistad y planes', words: 85, grammar: '-(으)려고 해요 + -(으)ㄹ 것 같아요',
    text: "[민준]: 이번 주말에 뭐 해요? 같이 영화 보려고 해요.\n[수아]: 좋아요! 어떤 영화 보려고 해요?\n[민준]: 새로 나온 한국 영화예요. 재미있을 것 같아요.\n[수아]: 몇 시에 만나려고 해요?\n[민준]: 오후 3시는 어때요? 버스가 많이 막힐 것 같아서요.\n[수아]: 그럼 2시 반에 만나요. 영화관 앞에서요.\n[민준]: 알겠어요! 내일 만나요.\n[수아]: 네, 좋아요! 내일 봐요.",
    textRomaja: "[Min-jun]: Ibeon jumal-e mwo haeyo? Gachi yeonghwa boryrago haeyo.\n[Su-a]: Joayo! Eotteon yeonghwa boryrago haeyo?\n[Min-jun]: Saero naon hanguk yeonghwa-yeyo. Jaemiissul geot gata-yo.\n[Su-a]: Myeot si-e mannalyrago haeyo?\n[Min-jun]: Ohu 3si-neun eottaeyo? Beoseuga mani mak-hil geot gata-seoyo.\n[Su-a]: Geureon 2si ban-e mannayo. Yeonghwagwan ap-e-seoyo.\n[Min-jun]: Algessoyo! Naeil mannayo.\n[Su-a]: Ne, joayo! Naeil bwayo.",
    vocab: { '이번 주말': 'este fin de semana', '같이': 'juntos / junto', '새로 나온': 'recién estrenado/a', '몇 시에': '¿a qué hora?', '만나려고 해요': 'tenemos intención de encontrarnos', '버스가 막힐 것 같아요': 'creo que el bus habrá mucho tráfico', '그럼': 'entonces / en ese caso', '영화관': 'cine', '알겠어요': 'entendido / de acuerdo' },
    preQ: [
      { q: '¿Cómo sueles planear salidas con amigos?', opts: ['Por mensaje de texto', 'Por llamada', 'En persona'], a: -1 },
      { q: '¿Qué tipo de películas te gustan?', opts: ['Coreanas (K-movies)', 'De Hollywood', 'De todo el mundo'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué propone hacer Min-jun el fin de semana?', cat: 'Comprensión', opts: ['Ir a comer', 'Ver una película juntos', 'Estudiar coreano', 'Ir de compras'], a: 1, fb: '"같이 영화 보려고 해요" = tengo intención de ver una película juntos. "보려고 해요" = intención de ver.' },
      { q: '¿Qué tipo de película quiere ver Min-jun?', cat: 'Comprensión', opts: ['Una película americana clásica', 'Una película de animación', 'Una película coreana recién estrenada', 'Un documental'], a: 2, fb: '"새로 나온 한국 영화예요" = es una película coreana recién estrenada. "새로 나온" = recién salido/estrenado.' },
      { q: '¿Por qué Min-jun propone las 3pm?', cat: 'Comprensión', opts: ['Porque le gusta ese horario', 'Para evitar el tráfico del bus (막힐 것 같아서)', 'Porque el cine abre a esa hora', 'Porque Su-a pidió esa hora'], a: 1, fb: '"버스가 많이 막힐 것 같아서요" = porque creo que el bus tendrá mucho tráfico. "막히다" = estar bloqueado / tener tráfico.' },
      { q: '¿A qué hora y dónde quedan finalmente?', cat: 'Comprensión', opts: ['3pm en la cafetería', '2:30pm frente al cine', '4pm en la estación de metro', '2pm en casa de Su-a'], a: 1, fb: '"2시 반에 만나요. 영화관 앞에서요." = Quedan a las 2:30 frente al cine. "반" = mitad (media hora).' },
      { q: '"재미있을 것 같아요" expresa...', cat: 'Gramática', opts: ['Una acción pasada', 'Una intención personal', 'Una conjetura sobre algo futuro / incierto', 'Un contraste'], a: 2, fb: '"재미있을 것 같아요" = creo que será interesante. "-(으)ㄹ 것 같아요" = conjetura sobre el futuro o algo incierto. No has visto la película todavía → es una predicción.' },
      { q: '¿Qué significa "알겠어요" al final del mensaje de Min-jun?', cat: 'Vocabulario', opts: ['No entiendo', 'Entendido / de acuerdo', 'Hasta luego', 'Lo pensaré'], a: 1, fb: '"알겠어요" (algessoyo) = entendido / de acuerdo. Es la forma polite de confirmar que has comprendido algo. Muy común en mensajes.' },
    ],
    openQ: 'Escribe un intercambio de mensajes corto (4-6 mensajes) con un amigo planificando algo. Usa -(으)려고 해요 y -(으)ㄹ 것 같아요.',
    production: 'Usa: "이번 주말에 ___려고 해요. ___을/를 것 같아요. ___ 시에 만나요?"',
  },
  {
    id: 5, title: '요리 수업', titleRomaja: 'Yori Sueop', titleEs: 'Clase de cocina',
    topic: 'Gastronomía / Cultura', words: 95, grammar: '-아/어서 + verbos irregulares',
    text: "오늘 저는 김치 만들기 수업에 갔어요. 선생님이 재료를 설명해 주셔서 쉽게 이해했어요. 먼저 배추를 소금에 절였어요. 그 다음에 고춧가루와 마늘을 섞었어요. 처음에는 냄새가 강해서 조금 어려웠어요. 하지만 같이 만들어서 재미있었어요. 완성된 김치를 맛봤어요. 정말 맛있었어요! 집에 가져가서 가족과 먹으려고 해요. 내일 또 오고 싶어요.",
    textRomaja: "Oneul jeoneun kimchi mandeulgi sueob-e gasseoyo. Seonsaengnim-i jaeryoreul seorongmyeonghae jusyeoseo sipge ihaehasseoyo. Meonjeo baechureul sogeum-e jeoryeosseoyo. Geu daeum-e gochutgaru-wa maneul-eul seokeosseoyo. Cheoeum-eneun naemse-ga ganghae-seo jogeum eoryeosseosseoyo. Hajiman gachi mandeureosseo jaemiisseosseoyo. Wanseongdoen kimchi-reul matbwasseoyo. Jeongmal masisseoyo! Jip-e gajyeoga-seo gajok-gwa meogeulyrago haeyo. Naeil tto ogo sipeoyo.",
    vocab: { '김치': 'kimchi (col fermentada picante)', '재료': 'ingredientes', '설명해 주셔서': 'como me explicó (honorífico)', '쉽게': 'fácilmente', '이해했어요': 'entendí', '먼저': 'primero', '배추': 'col / repollo chino', '소금': 'sal', '절였어요': 'curó / marinó (en sal)', '고춧가루': 'pimentón en polvo / ají molido', '마늘': 'ajo', '섞었어요': 'mezcló', '냄새': 'olor / aroma', '완성된': 'terminado / finalizado', '맛봤어요': 'probó / degustó', '가져가서': 'llevándolo a casa y...' },
    preQ: [
      { q: '¿Conoces el kimchi?', opts: ['Sí, me encanta', 'Lo he probado una vez', 'Nunca lo he probado'], a: -1 },
      { q: '¿Te gusta cocinar?', opts: ['Sí, mucho', 'Un poco', 'No me gusta cocinar'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué aprendió a hacer el/la narrador/a?', cat: 'Comprensión', opts: ['Bibimbap', 'Kimchi', 'Tteokbokki', 'Bulgogi'], a: 1, fb: '"김치 만들기 수업에 갔어요" = fue a una clase para aprender a hacer kimchi.' },
      { q: '¿Qué dificultad tuvo al principio?', cat: 'Comprensión', opts: ['Los ingredientes eran caros', 'El olor era fuerte (냄새가 강해서)', 'El maestro era estricto', 'Era demasiado picante'], a: 1, fb: '"처음에는 냄새가 강해서 조금 어려웠어요" = al principio el olor era fuerte así que fue un poco difícil. "-어서" expresa causa.' },
      { q: '¿Por qué fue divertida la experiencia a pesar de la dificultad?', cat: 'Comprensión', opts: ['Fue muy fácil', 'Lo hicieron juntos (같이 만들어서)', 'El maestro era muy cómico', 'El kimchi salió perfecto'], a: 1, fb: '"같이 만들어서 재미있었어요" = porque lo hicimos juntos fue divertido. "같이" = juntos, "-어서" = razón/causa.' },
      { q: '¿Qué planea hacer con el kimchi al llegar a casa?', cat: 'Comprensión', opts: ['Guardarlo para mañana', 'Comerlo con la familia', 'Regalarlo', 'Venderlo'], a: 1, fb: '"집에 가져가서 가족과 먹으려고 해요" = Llevaré a casa y tengo intención de comerlo con la familia.' },
      { q: '"설명해 주셔서 쉽게 이해했어요" — ¿cuál es la función de "-어서" aquí?', cat: 'Gramática', opts: ['Contraste (pero)', 'Causa (porque me explicó → entendí fácilmente)', 'Secuencia de acciones', 'Intención futura'], a: 1, fb: '"-어서" = causa. "설명해 주셔서 이해했어요" = porque me explicó (causa) → lo entendí (resultado). La causa siempre va en la primera cláusula sin tiempo (았/었).' },
      { q: '¿Qué significa "먼저" (meonjeo)?', cat: 'Vocabulario', opts: ['después', 'primero', 'también', 'juntos'], a: 1, fb: '"먼저" = primero / en primer lugar. "먼저 배추를 소금에 절였어요" = primero curé la col en sal. Indica la primera acción en una secuencia.' },
    ],
    openQ: 'Describe una vez que aprendiste a cocinar o probar algo nuevo. Usa -아/어서 para explicar la causa o secuencia.',
    production: 'Usa: "___에 가서 ___했어요. ___어서/아서 ___었/았어요. ___려고 해요."',
  },
];

function tokenizeKorean(text: string) {
  return text.split(/(\s+|[.,!?'\-\n\[\]:]+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t), isPunct: /^[.,!?'\-\n\[\]:]+$/.test(t),
    clean: t.replace(/[^가-힣]/g, ''),
  }));
}

function MCQItem({ q, qi, answers, onAnswer }: {
  q: ReadingText['mcq'][0]; qi: number;
  answers: Record<number, number>; onAnswer: (qi: number, oi: number) => void;
}) {
  const ans = answers[qi];
  const done = ans !== undefined;
  return (
    <div className="wl-card" style={{ padding: '1.25rem' }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
        {q.cat} · Pregunta {qi + 1}
      </div>
      <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{q.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {q.opts.map((opt, oi) => {
          const isCorrect = oi === q.a; const isSelected = ans === oi;
          let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let color = 'var(--ink)';
          if (done && isSelected && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          if (done && !isSelected && isCorrect) { bg = 'rgba(5,150,105,0.06)'; border = '1.5px solid #059669'; color = '#059669'; }
          return (
            <button key={oi} onClick={() => onAnswer(qi, oi)} disabled={done}
              style={{ textAlign: 'left', padding: '0.6rem 0.9rem', borderRadius: 10, border, background: bg, color, fontSize: '0.9rem', cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.15s' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.55, flexShrink: 0 }}>{String.fromCharCode(65 + oi)}.</span>
              {opt}
              {done && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
              {done && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
            </button>
          );
        })}
      </div>
      {done && <div style={{ marginTop: '0.7rem', padding: '0.6rem 0.85rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--ink-2)' }}>{ans === q.a ? '✅ ' : '💡 '}{q.fb}</div>}
    </div>
  );
}

function ReadingLesson({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<'pre' | 'read' | 'questions' | 'done'>('pre');
  const [preAnswers, setPreAnswers] = useState<Record<number, number>>({});
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [showRomaja, setShowRomaja] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [openAns, setOpenAns] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tokens = tokenizeKorean(t.text);
  const allDone = t.mcq.every((_, i) => answers[i] !== undefined);
  const score = t.mcq.filter((q, i) => answers[i] === q.a).length;

  function handleWord(clean: string, idx: number) {
    if (!clean) return;
    setActiveWord(t.vocab[clean] ?? null);
    setActiveIdx(idx);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Todos los textos</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>
          Texto {t.id} / 5 — {t.title}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          📝 {t.words} palabras · {t.grammar}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {(['pre', 'read', 'questions', 'done'] as const).map((p, i) => {
          const labels = ['Pre-lectura', 'Lectura', 'Preguntas', 'Resultado'];
          const current = phase === p;
          const past = (['pre', 'read', 'questions', 'done'] as const).indexOf(p) < (['pre', 'read', 'questions', 'done'] as const).indexOf(phase);
          return (
            <div key={p} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '100%', height: 4, borderRadius: 2, background: current ? COLOR : past ? `${COLOR}66` : 'var(--line-soft)' }} />
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', color: current ? COLOR : 'var(--muted)', fontWeight: current ? 800 : 400 }}>{labels[i]}</span>
            </div>
          );
        })}
      </div>

      {phase === 'pre' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Antes de leer — activa tu conocimiento</p>
          <p style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Piensa un momento antes de leer. No hay respuestas correctas o incorrectas — solo activa tu mente sobre el tema: <strong style={{ color: 'var(--ink)' }}>{t.topic}</strong>.
          </p>
          {t.preQ.map((pq, i) => (
            <div key={i} style={{ marginBottom: '1.25rem' }}>
              <p style={{ margin: '0 0 0.65rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.96rem' }}>{i + 1}. {pq.q}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pq.opts.map((opt, oi) => (
                  <button key={oi} onClick={() => setPreAnswers(p => ({ ...p, [i]: oi }))}
                    className={preAnswers[i] === oi ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                    style={{ fontSize: '0.84rem' }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-sm" style={{ marginTop: '0.5rem' }} onClick={() => setPhase('read')}>
            준비됐어요 — ir al texto →
          </button>
        </div>
      )}

      {phase === 'read' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            <span className="ink-line" />{t.title} ({t.titleEs}) — toca cualquier palabra para ver su traducción
          </p>
          <div style={{ marginBottom: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: 8, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>
            <em style={{ color: COLOR, fontStyle: 'italic' }}>{t.titleRomaja}</em> — {t.titleEs}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <button onClick={() => setShowRomaja(r => !r)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem' }}>
              {showRomaja ? '🙈 Ocultar romanización' : '👁 Ver romanización'}
            </button>
          </div>
          {showRomaja && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(83,74,183,0.05)', border: '1px solid rgba(83,74,183,0.15)', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.8, fontStyle: 'italic' }}>
              {t.textRomaja}
            </div>
          )}
          <div style={{ lineHeight: 2.1, fontSize: '1.05rem', color: 'var(--ink)', position: 'relative', marginBottom: '1.25rem' }}>
            {tokens.map((tk, i) => {
              if (tk.isSpace) return <span key={i}>{tk.raw}</span>;
              if (tk.isPunct) return <span key={i}>{tk.raw}</span>;
              const hasTrans = !!t.vocab[tk.clean];
              const isActive = activeIdx === i;
              return (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <button onClick={() => handleWord(tk.clean, i)} style={{
                    background: isActive ? 'rgba(83,74,183,0.12)' : hasTrans ? 'rgba(83,74,183,0.06)' : 'transparent',
                    border: isActive ? `1.5px solid ${COLOR}` : hasTrans ? `1px dashed rgba(83,74,183,0.3)` : 'none',
                    borderRadius: 6, padding: '0 3px', cursor: hasTrans ? 'pointer' : 'default',
                    fontSize: 'inherit', fontFamily: 'inherit',
                    color: isActive ? COLOR : 'inherit', fontWeight: isActive ? 700 : 'inherit', transition: 'all 0.15s',
                  }}>{tk.raw}</button>
                  {isActive && (
                    <span ref={tooltipRef} style={{
                      position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                      background: activeWord ? '#2d1f6e' : '#6f7691', color: '#fff', borderRadius: 8,
                      padding: '0.28rem 0.6rem', fontSize: '0.76rem', fontWeight: 600, whiteSpace: 'nowrap',
                      zIndex: 10, boxShadow: '0 4px 16px rgba(83,74,183,0.25)', marginTop: 4,
                    }}>
                      {activeWord ?? '(partícula / conectivo)'}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--line-soft)' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('questions'); setActiveWord(null); setActiveIdx(null); }}>
              다 읽었어요 → Responder preguntas
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setActiveWord(null); setActiveIdx(null); }}>
              Ocultar tooltip
            </button>
            <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem', marginLeft: 'auto' }} onClick={() => setPhase('pre')}>
              ← Volver a pre-lectura
            </button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('read')}>← Volver al texto</button>
          {t.mcq.map((q, qi) => (
            <MCQItem key={qi} q={q} qi={qi} answers={answers} onAnswer={(qi, oi) => {
              if (answers[qi] !== undefined) return;
              setAnswers(p => ({ ...p, [qi]: oi }));
            }} />
          ))}
          <div className="wl-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>쓰기 자유 (Producción libre)</div>
            <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{t.openQ}</p>
            <p style={{ margin: '0 0 0.85rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>💡 {t.production}</p>
            <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={4}
              placeholder="한국어로 써 보세요... (coreano o romanización)"
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          {allDone && (
            <button className="btn btn-sm" onClick={() => setPhase('done')}>결과 보기 →</button>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🏆' : score >= 4 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{score} / {t.mcq.length} correctas</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
            {score === t.mcq.length ? '완벽! 텍스트를 완전히 이해했어요.' : score >= 4 ? '잘 했어요! 틀린 문제를 다시 확인하세요.' : '텍스트로 돌아가서 다시 읽어 보세요.'}
          </p>
          {openAns && (
            <div style={{ padding: '1rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: '1.25rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>내 쓰기 자유</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{openAns}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('read'); setAnswers({}); setOpenAns(''); }}>다시 시도</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Elegir otro texto</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaCoreanoA2() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/coreano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A2</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📖 읽기</span>
          </div>
          <ReadingLesson t={TEXTS[selected]} onBack={() => setSelected(null)} />
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 읽기</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />읽기 · Coreano A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lectura A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>
          5 textos progresivos en Hangul (80-120 palabras) con romanización. Cada texto tiene pre-lectura, vocabulario interactivo, 6 preguntas y producción libre.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map((t, i) => (
            <button key={t.id} onClick={() => setSelected(i)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem',
                border: `1.5px solid ${COLOR}22`, borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(83,74,183,0.04) 0%, transparent 100%)',
                transition: 'box-shadow 0.18s, border-color 0.18s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(83,74,183,0.12)`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>
                  {t.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.18rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem' }}>{t.title}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>({t.titleRomaja} — {t.titleEs})</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {t.words} palabras · {t.topic} · {t.grammar} · {t.mcq.length} preguntas
                  </p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '1.75rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: 'rgba(83,74,183,0.06)', border: '1px solid rgba(83,74,183,0.15)', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Cómo usar:</strong> Toca las palabras subrayadas para ver su traducción al español. Activa la romanización si necesitas ayuda con la pronunciación. Luego responde las 6 preguntas de vocabulario, comprensión y gramática.
        </div>
      </div>
    </section>
  );
}
