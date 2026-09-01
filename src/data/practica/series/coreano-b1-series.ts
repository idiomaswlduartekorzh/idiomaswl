import type { A1ListeningEpisode, A1ListeningSeries, EpisodeAudit, Question } from './schema'

/**
 * Temporada 3 del reparto coreano. Sigue a `coreano-a1-series.ts` («노란 우산의 주인») y a
 * `coreano-a2-series.ts` («별 카페의 손편지»): mismos personajes, dos años después.
 * El esquema editorial vive en schema.ts y no se toca; `SeriesLevel` ya admite 'B1', así que
 * la serie y los veinte `audit` declaran 'B1', como exige el validador.
 *
 * ROMANIZACIÓN: Romanización Revisada que transcribe la PRONUNCIACIÓN, no la ortografía,
 * con el mismo criterio único que A1 y A2 ante ㅎ —la aspiración se funde: 축하해요 →
 * chukahaeyo, 못 해요 → motaeyo, 좋다고 → jotago—, con asimilación nasal (닫는 → danneun,
 * 어렵네요 → eoryeomneyo), lateral (살리려고 → salliryeogo) y enlace de coda con vocal
 * (편지를 → pyeonjireul). El guion solo aparecería para desambiguar sílaba.
 *
 * CURRÍCULO B1, dos elementos nuevos como máximo por episodio:
 * -게 되다 y 반말 entre los tres amigos (1), -기 때문에 y -(으)ㄴ/는 것 같아요 (2),
 * -다고 하다 y -아/어야 되다 (3), -(으)려고 y -(으)면서 (4), -(으)ㄹ 텐데 (5),
 * 피동 frecuente —들리다·보이다·쓰이다·열리다— (6), 사동 frecuente —알리다·보여 주다·
 * 먹이다— (7). Del 8 al 20 no entra nada nuevo: se recombina lo anterior.
 *
 * REGISTRO (estable en los veinte episodios): 소피아, 지호 y 별 tienen la misma edad y
 * acuerdan 반말 en escena en el episodio 1 —지호 y 별 ya lo usaban entre ellos desde A2 ep. 13—;
 * desde ahí los tres se tutean SIEMPRE entre ellos y nunca con nadie más. Con 유나, 미나,
 * 김 선생님, 문구점 주인 y 편집장 hablan en 해요체, y añaden -(으)시- cuando el sujeto es la
 * persona mayor (들으셨어요?, 쓰셨어요?, 앉으세요). 김 선생님, 문구점 주인 y 편집장 les
 * responden en 해요체. Nadie usa 합니다체 salvo las fórmulas fijas 감사합니다 / 죄송합니다.
 *
 * BIBLIA DE CONTINUIDAD heredada (no se contradice aquí): el café se llama 별 카페; el
 * 편지함 es la caja de madera que 지호 aportó y 별 pintó con diez estrellas grandes (A2 ep. 19);
 * la primera carta de 소피아 decía «잘하고 있어요» y llevaba una estrella (A2 ep. 1 y 20);
 * 유나 llegó sola a Seúl y recibió su carta dentro de un libro, de manos de un cliente del
 * café (A2 ep. 18) —hace tres años allí, cinco aquí—; el papel con estrella solo se vende en
 * la papelería de al lado de la academia, que cierra los miércoles (A2 ep. 3 y 5); 미나 es la
 * tía de 별 y dueña de 콩이; 별 vive en el 407 de 한빛 아파트 y adora los pasteles.
 *
 * CIFRAS PROPIAS DE ESTA TEMPORADA (comprobadas episodio a episodio, en este orden):
 * han pasado dos años y los tres amigos tienen veintitrés; el alquiler pasa a ser el doble y
 * el contrato vence a finales de agosto; al contar las cartas hay trescientas veintidós; el
 * reportaje sale un miércoles y la avalancha llega el fin de semana siguiente; la carta que
 * recibió 유나 es de hace cinco años; el local vacío está al lado de la papelería y cuesta la
 * mitad; la mudanza es el 25 de agosto y el episodio 18 ocurre una semana antes.
 */

type Spec = [string, string, string, string, string]
const question = ([prompt, correct, wrong1, wrong2, feedback]: Spec): Question => {
  const answer = [...prompt].reduce((sum, char) => sum + char.codePointAt(0)!, 0) % 3
  const options = [wrong1, wrong2]
  options.splice(answer, 0, correct)
  return { prompt, options, answer, feedback }
}

type Draft = Omit<A1ListeningEpisode, 'ttsScript' | 'gist' | 'details' | 'consolidation' | 'audit'> & {
  gist: Spec
  details: [Spec, Spec, Spec]
  consolidation: Spec
  audit: Omit<EpisodeAudit, 'level' | 'estimatedDuration' | 'grammarUsed' | 'newVocabulary'>
}

const ep = (draft: Draft): A1ListeningEpisode => ({
  ...draft,
  ttsScript: draft.turns.map((turn) => turn.target).join(' '),
  gist: question(draft.gist),
  details: draft.details.map(question) as [Question, Question, Question],
  consolidation: question(draft.consolidation),
  audit: {
    level: 'B1',
    grammarUsed: draft.grammar,
    newVocabulary: draft.keywords.map((word) => word.target),
    estimatedDuration: draft.duration,
    ...draft.audit,
  },
})

export const KOREAN_B1_SERIES: A1ListeningSeries = {
  language: '한국어',
  locale: 'ko-KR',
  level: 'B1',
  seriesTitle: '별 카페의 마지막 여름',
  seriesTitleEs: 'El último verano del Café Estrella',
  premise: '편지함을 만든 지 이 년, 소피아는 잡지사에서 번역을 하고 지호는 신문사에서 사진을 찍는다. 그런데 건물 주인이 월세를 두 배로 올리면서 별 카페가 팔월에 문을 닫게 된다. 지호는 기사를 써서 카페를 살리려고 하지만, 유나는 편지함이 구경거리가 되는 것을 원하지 않는다. 신문에 유나의 얼굴이 실리는 날, 세 친구의 우정과 오 년 전의 편지 한 장이 같이 시험을 받는다.',
  characters: [
    { name: '소피아', role: '동네 잡지사에서 번역을 하는 콜롬비아 사람, 서울 오 년 차', voiceProfile: '젊은 여성, 또렷하고 따뜻한 표준 한국어' },
    { name: '지호', role: '동네 신문사의 사진 기자, 여전히 스스로 탐정이라고 부른다', voiceProfile: '젊은 남성, 밝고 장난스러운 표준 한국어' },
    { name: '유나', role: '별 카페의 사장, 편지함을 처음 시작한 사람', voiceProfile: '젊은 여성, 친절하지만 이번 시즌에는 지친 목소리' },
    { name: '별', role: '디자인을 공부하는 대학생, 케이크를 아주 좋아한다', voiceProfile: '젊은 남성, 차분하고 또렷한 표준 한국어' },
    { name: '미나', role: '별의 이모, 강아지 콩이의 주인', voiceProfile: '성인 여성, 따뜻하고 조금 빠른 말투' },
    { name: '김 선생님', role: '한국어 선생님, 지금도 같은 학원에서 가르친다', voiceProfile: '성인 여성, 느리고 정확한 교실 발음' },
    { name: '문구점 주인', role: '학원 옆 문구점 주인, 별 그림 편지지를 파는 유일한 가게', voiceProfile: '중년 여성, 느긋하고 정이 많은 말투' },
    { name: '편집장', role: '동네 신문사의 편집장, 지호의 상사', voiceProfile: '성인 남성, 빠르고 사무적인 말투' },
  ],
  episodes: [
    ep({
      id: 'ko-b1-01-i-nyeon-hu', order: 1, title: '이 년 후', titleEs: 'Dos años después', duration: 52,
      characters: ['지호', '소피아', '별'], location: '별 카페', objective: '-게 되다로 바뀐 상황을 알아듣고, 반말로 바뀌는 순간을 구별한다.',
      grammar: ['-게 되다', '반말 (친구 사이, 장면 안에서 합의)'],
      keywords: [{ target: '졸업', es: 'graduación' }, { target: '잡지사', es: 'editorial de revista' }, { target: '기자', es: 'reportero' }, { target: '편지함', es: 'buzón de cartas' }, { target: '사장', es: 'dueño del negocio' }, { target: '표정', es: 'expresión de la cara' }],
      storyFunction: '이 년이 지난 세 사람의 새 생활을 보여 주고, 반말 합의로 시즌의 말투를 정한다.',
      turns: [
        { speaker: '지호', target: '소피아 씨, 진짜 오랜만이에요! 대학교를 졸업하고 어떻게 지냈어요?', es: 'Sofía, ¡cuánto tiempo! ¿Qué has hecho desde que te graduaste?', romanization: 'Sopia ssi, jinjja oraenmanieyo! Daehakgyoreul joreopago eotteoke jinaesseoyo?' },
        { speaker: '소피아', target: '저는 이번 달부터 동네 잡지사에서 번역을 하게 됐어요.', es: 'Desde este mes he acabado traduciendo en una revista del barrio.', romanization: 'Jeoneun ibeon dalbuteo dongne japjisaeseo beonyeogeul hage dwaesseoyo.' },
        { speaker: '별', target: '축하해요! 지호는 그 잡지사 옆 신문사에서 사진 기자가 됐어요.', es: '¡Felicidades! Jiho acabó de reportero gráfico en el periódico de al lado de esa revista.', romanization: 'Chukahaeyo! Jihoneun geu japjisa yeop sinmunsaeseo sajin gijaga dwaesseoyo.' },
        { speaker: '지호', target: '우리 이제 세 명 다 스물세 살이니까 말을 놓는 게 어때요?', es: 'Ya tenemos los tres veintitrés años, así que ¿qué tal si nos tuteamos?', romanization: 'Uri ije se myeong da seumulse sarinikka mareul nonneun ge eottaeyo?' },
        { speaker: '소피아', target: '좋아. 그럼 오늘부터 편하게 말할게. 조금 어색하지만 재미있어.', es: 'Vale. Entonces desde hoy os hablo con confianza. Es un poco raro, pero divertido.', romanization: 'Joa. Geureom oneulbuteo pyeonhage malhalge. Jogeum eosaekajiman jaemiisseo.' },
        { speaker: '별', target: '우리가 만든 편지함은 아직도 저기에 있어. 이 년 동안 삼백 장이 넘었어.', es: 'El buzón que hicimos sigue ahí. En dos años se han pasado de trescientas cartas.', romanization: 'Uriga mandeun pyeonjihameun ajikdo jeogie isseo. I nyeon dongan sambaek jangi neomeosseo.' },
        { speaker: '소피아', target: '정말? 유나 씨도 계속 별 카페에서 일하고 있어?', es: '¿De verdad? ¿Y Yuna sigue trabajando en el Café Estrella?', romanization: 'Jeongmal? Yuna ssido gyesok Byeol Kapeeseo ilhago isseo?' },
        { speaker: '지호', target: '응, 작년부터 유나 씨가 카페 사장이 됐어. 그런데 요즘 표정이 어두워.', es: 'Sí, desde el año pasado Yuna es la dueña del café. Pero últimamente tiene mala cara.', romanization: 'Eung, jangnyeonbuteo Yuna ssiga kape sajangi dwaesseo. Geureonde yojeum pyojeongi eoduwo.' },
      ],
      gist: ['오랜만에 다시 만난 세 사람에게 어떤 변화가 있었나요?', '소피아는 번역을 하고 지호는 사진 기자가 되며, 세 사람은 말을 놓아요', '소피아는 스페인어를 가르치고 지호는 카페에서 계속 일해요', '두 사람은 일을 그만두고 별 카페의 두 번째 가게를 열어요', '지호가 먼저 말을 놓자고 제안하고, 그때부터 세 사람이 반말을 써요.'],
      details: [
        ['소피아는 지금 어떤 일을 하나요?', '동네 잡지사에서 번역을 해요', '학원에서 스페인어를 가르쳐요', '별 카페에서 손님을 맞아요', '소피아는 동네 잡지사에서 번역을 하게 됐다고 말해요.'],
        ['편지함에는 편지가 얼마나 모였나요?', '이 년 동안 삼백 장이 넘게 모였어요', '모두 스물세 장이 모였어요', '정확히 오십 장이 모였어요', '별은 이 년 동안 편지가 삼백 장이 넘었다고 알려 줘요.'],
        ['지호는 유나의 근황을 어떻게 설명하나요?', '작년부터 카페 사장이 되었다고 해요', '일 년 전에 카페를 떠났다고 해요', '최근에 다른 도시로 이사했다고 해요', '지호는 유나가 작년부터 카페 사장이 됐다고 말해요.'],
      ],
      consolidation: ['문장을 완성하세요: 저는 이번 달부터 동네 잡지사에서 번역을 ___.', '하게 됐어요', '하고 싶었어요', '한 것 같아요', '-게 되다는 상황이 바뀌어 새로운 일을 하게 된 결과를 나타내요.'],
      audit: { possibleDifficulties: ['los dos primeros turnos son 해요체 y el registro cambia a mitad de episodio', '-게 됐어요 frente al simple pasado -았/었어요'], continuity: 'Arranca dos años después del final de A2. El buzón que el grupo construyó en el episodio 19 de A2 sigue en el café y ya acumula más de trescientas cartas; Yuna ha pasado de empleada a dueña.', pronunciationRisks: ['졸업하고', '작년부터'], recommendedChanges: ['El cambio a banmal debe oírse a partir del quinto turno, no antes: los cuatro primeros siguen en 해요체.'] },
    }),
    ep({
      id: 'ko-b1-02-wolsega-du-bae', order: 2, title: '월세가 두 배예요', titleEs: 'El alquiler es el doble', duration: 54,
      characters: ['소피아', '유나', '지호'], location: '별 카페', objective: '-기 때문에로 원인을, -(으)ㄴ/는 것 같아요로 추측을 구별해서 듣는다.',
      grammar: ['-기 때문에', '-(으)ㄴ/는 것 같아요'],
      keywords: [{ target: '월세', es: 'alquiler mensual' }, { target: '두 배', es: 'el doble' }, { target: '건물 주인', es: 'dueño del edificio' }, { target: '계약', es: 'contrato' }, { target: '걱정', es: 'preocupación' }, { target: '편지함', es: 'buzón de cartas' }],
      storyFunction: '카페가 사라질 기한을 정하고 시즌의 갈등을 연다.',
      turns: [
        { speaker: '소피아', target: '유나 씨, 오랜만이에요. 그런데 카페 분위기가 예전하고 좀 다른 것 같아요.', es: 'Yuna, cuánto tiempo. Pero el ambiente del café parece un poco distinto al de antes.', romanization: 'Yuna ssi, oraenmanieyo. Geureonde kape bunwigiga yejeonhago jom dareun geot gatayo.' },
        { speaker: '유나', target: '소피아 씨, 반가워요. 사실 지난주에 건물 주인한테서 전화가 왔어요.', es: 'Sofía, qué alegría. La verdad es que la semana pasada me llamó el dueño del edificio.', romanization: 'Sopia ssi, bangawoyo. Sasil jinanjue geonmul juinhanteseo jeonhwaga wasseoyo.' },
        { speaker: '지호', target: '무슨 전화였어요? 아까부터 유나 씨 표정이 계속 안 좋아요.', es: '¿Qué llamada? Desde hace rato tienes mala cara.', romanization: 'Museun jeonhwayeosseoyo? Akkabuteo Yuna ssi pyojeongi gyesok an joayo.' },
        { speaker: '유나', target: '다음 달부터 월세가 두 배가 되기 때문에 저는 계약을 다시 못 해요.', es: 'Como desde el mes que viene el alquiler es el doble, no puedo renovar el contrato.', romanization: 'Daeum dalbuteo wolsega du baega doegi ttaemune jeoneun gyeyageul dasi motaeyo.' },
        { speaker: '소피아', target: '두 배요? 그럼 이 카페가 두 달 뒤에 문을 닫는 거예요?', es: '¿El doble? ¿Entonces este café cierra dentro de dos meses?', romanization: 'Du baeyo? Geureom i kapega du dal dwie muneul danneun geoyeyo?' },
        { speaker: '유나', target: '네. 팔월 말까지 짐을 다 빼기로 했어요. 그래서 요즘 잠이 안 와요.', es: 'Sí. Quedé en vaciarlo todo para finales de agosto. Por eso últimamente no duermo.', romanization: 'Ne. Parwol malkkaji jimeul da ppaegiro haesseoyo. Geuraeseo yojeum jami an wayo.' },
        { speaker: '지호', target: '그럼 이 편지함은 어떻게 돼요? 동네 사람들이 정말 슬퍼할 것 같아요.', es: '¿Y qué pasa con el buzón? Creo que la gente del barrio se va a poner muy triste.', romanization: 'Geureom i pyeonjihameun eotteoke dwaeyo? Dongne saramdeuri jeongmal seulpeohal geot gatayo.' },
        { speaker: '유나', target: '저도 그것 때문에 제일 걱정이에요. 편지함은 이 카페의 마음이니까요.', es: 'Eso es justo lo que más me preocupa. El buzón es el corazón de este café.', romanization: 'Jeodo geugeot ttaemune jeil geokjeongieyo. Pyeonjihameun i kapeui maeuminikkayo.' },
      ],
      gist: ['유나는 카페에 관해 어떤 소식을 전하나요?', '월세가 두 배가 되어 카페 문을 닫아야 해요', '더 큰 가게를 새로 열 계획이에요', '공부를 시작하려고 카페 일을 그만둬요', '유나는 월세가 두 배가 되기 때문에 계약을 다시 못 한다고 말해요.'],
      details: [
        ['월세는 얼마나 오르나요?', '지금 월세의 두 배가 돼요', '해마다 조금씩만 올라요', '오르지 않고 오히려 내려요', '유나가 다음 달부터 월세가 두 배가 된다고 설명해요.'],
        ['유나는 언제까지 가게를 비워야 하나요?', '팔월 말까지 비워야 해요', '칠월 말까지 비워야 해요', '올해 연말까지 비워야 해요', '유나는 팔월 말까지 짐을 다 빼기로 했다고 말해요.'],
        ['유나가 가장 걱정하는 것은 무엇인가요?', '카페에 있는 편지함이에요', '가게의 낡은 탁자와 의자예요', '새로운 직장을 구하는 일이에요', '유나는 편지함을 가리키며 그것 때문에 제일 걱정이라고 말해요.'],
      ],
      consolidation: ['문장을 완성하세요: 다음 달부터 월세가 두 배가 ___ 계약을 다시 못 해요.', '되기 때문에', '되지만', '되면', '-기 때문에는 실제 원인을 나타내요. 되지만은 대조를, 되면은 조건을 나타내요.'],
      audit: { possibleDifficulties: ['-기 때문에 y -(으)ㄴ/는 것 같아요 alternan en turnos seguidos', '못 해요 se pronuncia con la aspiración fundida: motaeyo'], continuity: 'La primera visita de Sofía al café después de dos años trae la noticia que abre el arco: el local que en A2 acogió el buzón tiene fecha de cierre.', pronunciationRisks: ['월세가', '팔월 말까지'], recommendedChanges: ['Yuna debe sonar cansada, no dramática: el peso está en la fecha, no en la voz.'] },
    }),
    ep({
      id: 'ko-b1-03-omgyeoya-doendago-haeyo', order: 3, title: '가게를 옮겨야 된대요', titleEs: 'Dicen que hay que mudar la tienda', duration: 63,
      characters: ['김 선생님', '소피아', '별'], location: '한국어 학원 앞', objective: '-다고 하다로 남의 말을 옮기고 -아/어야 되다로 의무를 표현하는 것을 듣는다.',
      grammar: ['-다고 하다 (인용)', '-아/어야 되다'],
      keywords: [{ target: '소식', es: 'noticia' }, { target: '옮겨야', es: 'hay que mudar' }, { target: '방법', es: 'manera, solución' }, { target: '부탁', es: 'favor' }, { target: '시간', es: 'tiempo' }, { target: '학원', es: 'academia' }],
      storyFunction: '김 선생님을 사건에 들여놓고, 유나가 도움을 원하지 않는다는 사실을 처음 알린다.',
      turns: [
        { speaker: '김 선생님', target: '소피아 씨, 별 씨! 졸업한 뒤에 얼굴 보기가 정말 어렵네요.', es: '¡Sofía, Byeol! Después de la graduación cuesta muchísimo verles la cara.', romanization: 'Sopia ssi, Byeol ssi! Joreopan dwie eolgul bogiga jeongmal eoryeomneyo.' },
        { speaker: '소피아', target: '선생님, 죄송해요. 요즘 회사 일 때문에 계속 바빴어요.', es: 'Profesora, lo siento. Últimamente he estado ocupadísima con el trabajo.', romanization: 'Seonsaengnim, joesonghaeyo. Yojeum hoesa il ttaemune gyesok bappasseoyo.' },
        { speaker: '별', target: '선생님, 혹시 별 카페 소식 들으셨어요? 유나 씨가 가게를 옮겨야 된다고 해요.', es: 'Profesora, ¿ha oído lo del Café Estrella? Dice Yuna que tiene que mudar el local.', romanization: 'Seonsaengnim, hoksi Byeol Kape sosik deureusyeosseoyo? Yuna ssiga gagereul omgyeoya doendago haeyo.' },
        { speaker: '김 선생님', target: '네, 저도 들었어요. 건물 주인이 월세를 많이 올렸다고 들었어요.', es: 'Sí, yo también lo he oído. Me dijeron que el dueño del edificio subió mucho el alquiler.', romanization: 'Ne, jeodo deureosseoyo. Geonmul juini wolsereul mani ollyeotdago deureosseoyo.' },
        { speaker: '소피아', target: '그래서 우리가 팔월 전에 새 가게를 찾아야 돼요. 시간이 별로 없어요.', es: 'Por eso tenemos que encontrar un local nuevo antes de agosto. Queda poco tiempo.', romanization: 'Geuraeseo uriga parwol jeone sae gagereul chajaya dwaeyo. Sigani byeollo eopseoyo.' },
        { speaker: '김 선생님', target: '학원 학생들도 그 편지함을 좋아하니까 저도 꼭 돕고 싶어요.', es: 'A los alumnos de la academia también les gusta ese buzón, así que quiero ayudar sí o sí.', romanization: 'Hagwon haksaengdeuldo geu pyeonjihameul joahanikka jeodo kkok dopgo sipeoyo.' },
        { speaker: '별', target: '감사합니다. 그런데 유나 씨는 아무한테도 부탁하고 싶지 않다고 했어요.', es: 'Gracias. Pero Yuna dijo que no quiere pedirle ayuda a nadie.', romanization: 'Gamsahamnida. Geureonde Yuna ssineun amuhantedo butakago sipji antago haesseoyo.' },
        { speaker: '김 선생님', target: '그럼 우리가 먼저 방법을 찾아야 돼요. 다음 주에 다시 이야기해요.', es: 'Entonces tenemos que buscar una solución nosotros primero. Hablamos otra vez la semana que viene.', romanization: 'Geureom uriga meonjeo bangbeobeul chajaya dwaeyo. Daeum jue dasi iyagihaeyo.' },
      ],
      gist: ['세 사람은 학원 앞에서 무엇을 하기로 하나요?', '팔월 전에 먼저 해결 방법을 찾기로 해요', '유나에게 필요한 돈을 부탁하기로 해요', '가능한 한 빨리 편지함을 닫기로 해요', '김 선생님은 자신들이 먼저 방법을 찾아야 한다고 말해요.'],
      details: [
        ['별은 김 선생님에게 어떤 소식을 전하나요?', '유나가 가게를 옮겨야 한다는 소식이에요', '유나가 이미 새 가게를 찾았다는 소식이에요', '카페가 지난주에 문을 닫았다는 소식이에요', '별은 유나가 가게를 옮겨야 된다고 전해요.'],
        ['김 선생님은 이미 무엇을 들었나요?', '건물 주인이 월세를 많이 올렸다는 이야기예요', '다른 사람에게 카페가 팔렸다는 이야기예요', '한국어 학원도 곧 문을 닫는다는 이야기예요', '김 선생님은 건물 주인이 월세를 많이 올렸다고 들었다고 말해요.'],
        ['유나는 도움을 부탁하는 것에 대해 뭐라고 했나요?', '아무에게도 부탁하고 싶지 않다고 했어요', '김 선생님의 도움만 받겠다고 했어요', '동네 사람들에게 이미 부탁했다고 했어요', '별은 유나가 아무한테도 부탁하고 싶지 않다고 했다고 전해요.'],
      ],
      consolidation: ['문장을 완성하세요: 그래서 우리가 팔월 전에 새 가게를 ___.', '찾아야 돼요', '찾고 있어요', '찾은 것 같아요', '-아/어야 되다는 꼭 해야 하는 일을 나타내요. 다른 두 표현은 현재 상황이나 추측을 나타내요.'],
      audit: { possibleDifficulties: ['-다고 해요 y -다고 들었어요 en boca de dos personajes distintos', 'a la profesora se le pregunta con honorífico: 들으셨어요?'], continuity: 'Traslada al aula la noticia del episodio 2 y añade el obstáculo que moverá toda la temporada: Yuna no quiere que nadie la ayude.', pronunciationRisks: ['어렵네요', '옮겨야'], recommendedChanges: ['«팔월 전에» es tiempo, no lugar: la pausa va después de 팔월 전에, nunca dentro.'] },
    }),
    ep({
      id: 'ko-b1-04-gisareul-sseuryeogo', order: 4, title: '기사를 쓰려고 해요', titleEs: 'Quiero escribir un reportaje', duration: 44,
      characters: ['지호', '편집장', '소피아'], location: '동네 신문사 사무실', objective: '-(으)려고로 의도를, -(으)면서로 동시 동작을 알아듣는다.',
      grammar: ['-(으)려고', '-(으)면서'],
      keywords: [{ target: '기사', es: 'reportaje' }, { target: '편집장', es: 'jefe de redacción' }, { target: '사진', es: 'foto' }, { target: '살리려고', es: 'para salvar' }, { target: '직접', es: 'en persona' }, { target: '조용히', es: 'en silencio' }],
      storyFunction: '지호의 선의가 회사의 조건과 부딪히면서 나중의 오해가 될 씨앗을 심는다.',
      turns: [
        { speaker: '지호', target: '편집장님, 저는 동네 카페에 대한 기사를 하나 쓰려고 해요.', es: 'Jefe, quiero escribir un reportaje sobre un café del barrio.', romanization: 'Pyeonjipjangnim, jeoneun dongne kapee daehan gisareul hana sseuryeogo haeyo.' },
        { speaker: '편집장', target: '무슨 카페예요? 요즘 문 닫는 가게 이야기는 너무 많아요.', es: '¿Qué café? Últimamente hay demasiadas historias de negocios que cierran.', romanization: 'Museun kapeyeyo? Yojeum mun danneun gage iyagineun neomu manayo.' },
        { speaker: '지호', target: '그 카페에는 손님들이 서로 손편지를 넣는 편지함이 있어요.', es: 'En ese café hay un buzón donde los clientes se dejan cartas a mano unos a otros.', romanization: 'Geu kapeeneun sonnimdeuri seoro sonpyeonjireul neonneun pyeonjihami isseoyo.' },
        { speaker: '편집장', target: '재미있네요. 그런데 사진하고 주인 이름이 없으면 기사가 안 나가요.', es: 'Interesante. Pero sin foto y sin el nombre de la dueña el reportaje no sale.', romanization: 'Jaemiinneyo. Geureonde sajinhago juin ireumi eopseumyeon gisaga an nagayo.' },
        { speaker: '지호', target: '유나 씨는 조용히 살면서 편지만 쓰고 싶어 해요. 이름은 좀 어려워요.', es: 'Yuna quiere vivir tranquila y solo escribir cartas. Lo del nombre es complicado.', romanization: 'Yuna ssineun joyonghi salmyeonseo pyeonjiman sseugo sipeo haeyo. Ireumeun jom eoryeowoyo.' },
        { speaker: '편집장', target: '그럼 이름은 빼고 사진만 넣어요. 카페를 살리려고 쓰는 기사예요.', es: 'Pues quita el nombre y pon solo la foto. Es un reportaje para salvar el café.', romanization: 'Geureom ireumeun ppaego sajinman neoeoyo. Kapereul salliryeogo sseuneun gisayeyo.' },
        { speaker: '소피아', target: '지호야, 나는 유나 씨한테 먼저 물어보는 게 좋다고 생각해.', es: 'Jiho, yo creo que es mejor preguntarle antes a Yuna.', romanization: 'Jihoya, naneun Yuna ssihante meonjeo mureoboneun ge jotago saenggakae.' },
        { speaker: '지호', target: '알겠어. 오늘 저녁에 카페에 가면서 유나 씨한테 직접 물어볼게.', es: 'Vale. Esta tarde, de camino al café, se lo pregunto en persona.', romanization: 'Algesseo. Oneul jeonyeoge kapee gamyeonseo Yuna ssihante jikjeop mureobolge.' },
      ],
      gist: ['신문사에서는 기사에 대해 어떤 결정을 하나요?', '이름은 빼고 사진을 넣어 기사를 내기로 해요', '이 기사는 신문에 내지 않기로 해요', '소피아가 직접 기사를 쓰기로 해요', '편집장은 이름을 빼고 사진만 넣자고 정리해요.'],
      details: [
        ['편집장이 처음에 말한 기사 조건은 무엇인가요?', '사진과 카페 주인의 이름이 있어야 해요', '기사의 길이가 아주 짧아야 해요', '소피아가 기사에 서명해야 해요', '편집장은 사진하고 주인 이름이 없으면 기사가 안 나간다고 말해요.'],
        ['지호의 말에 따르면 유나는 무엇을 원하나요?', '조용히 살면서 편지만 쓰고 싶어 해요', '신문에 자신의 얼굴을 보여 주고 싶어 해요', '가능한 한 빨리 카페를 팔고 싶어 해요', '지호는 유나가 조용히 살면서 편지만 쓰고 싶어 한다고 설명해요.'],
        ['소피아는 지호에게 무엇을 권하나요?', '먼저 유나에게 직접 물어보라고 해요', '알리지 말고 바로 기사를 내라고 해요', '먼저 김 선생님과 이야기하라고 해요', '소피아는 지호가 유나에게 먼저 물어보는 게 좋다고 말해요.'],
      ],
      consolidation: ['문장을 완성하세요: 유나 씨는 조용히 ___ 편지만 쓰고 싶어 해요.', '살면서', '살아서', '살면', '-(으)면서는 같은 사람이 동시에 하는 두 행동을 연결해요. 여기서는 조용히 사는 것과 편지를 쓰는 것이에요.'],
      audit: { possibleDifficulties: ['-(으)려고 de intención frente a -(으)러 de finalidad de movimiento', 'Sofía habla en banmal a Jiho y en 해요체 al resto, dentro de la misma escena'], continuity: 'Es la primera consecuencia práctica del plazo del episodio 2 y de la negativa de Yuna que Byeol contó en el 3.', pronunciationRisks: ['편집장님', '살리려고'], recommendedChanges: ['El turno de Sofía es banmal dirigido solo a Jiho: la voz no debe subir a 해요체 aunque el jefe esté delante.'] },
    }),
    ep({
      id: 'ko-b1-05-eopseojil-tende', order: 5, title: '없어질 텐데요', titleEs: 'Pero desaparecerá', duration: 49,
      characters: ['지호', '유나', '별'], location: '별 카페', objective: '-(으)ㄹ 텐데로 추측과 반대 의견을 함께 알아듣는다.',
      grammar: ['-(으)ㄹ 텐데', '-(으)ㄴ/는 것 같아요'],
      keywords: [{ target: '의미', es: 'sentido' }, { target: '구경', es: 'curioseo' }, { target: '조건', es: 'condición' }, { target: '약속', es: 'promesa' }, { target: '얼굴', es: 'cara' }, { target: '사진', es: 'foto' }],
      storyFunction: '두 입장을 정면으로 부딪히게 하고, 뒤에 깨질 약속을 명확한 조건으로 남긴다.',
      turns: [
        { speaker: '지호', target: '유나 씨, 우리 신문에 편지함 기사를 실으면 손님이 많이 올 텐데 어때요?', es: 'Yuna, si sacamos el buzón en nuestro periódico vendría mucha gente, ¿qué te parece?', romanization: 'Yuna ssi, uri sinmune pyeonjiham gisareul sireumyeon sonnimi mani ol tende eottaeyo?' },
        { speaker: '유나', target: '손님은 많아질 거예요. 그렇지만 편지함의 의미가 없어질 텐데요.', es: 'Clientes vendrán más, sí. Pero entonces el buzón perdería su sentido.', romanization: 'Sonnimeun manajil geoyeyo. Geureochiman pyeonjihamui uimiga eopseojil tendeyo.' },
        { speaker: '별', target: '하지만 이대로 두면 팔월에 카페가 없어질 텐데요. 그것도 슬퍼요.', es: 'Pero si lo dejamos así, en agosto desaparece el café. Eso también es triste.', romanization: 'Hajiman idaero dumyeon parwore kapega eopseojil tendeyo. Geugeotdo seulpeoyo.' },
        { speaker: '유나', target: '저도 알아요. 하지만 사람들이 구경하러 오는 건 정말 싫어요.', es: 'Ya lo sé. Pero que la gente venga a curiosear no me gusta nada.', romanization: 'Jeodo arayo. Hajiman saramdeuri gugyeonghareo oneun geon jeongmal sireoyo.' },
        { speaker: '지호', target: '그럼 조건을 하나 정해요. 유나 씨가 원하지 않는 건 안 쓸게요.', es: 'Entonces pongamos una condición. No escribiré nada que tú no quieras.', romanization: 'Geureom jogeoneul hana jeonghaeyo. Yuna ssiga wonhaji anneun geon an sseulgeyo.' },
        { speaker: '유나', target: '그럼 편지함 사진만 찍어요. 제 얼굴하고 이름은 넣지 마세요.', es: 'Entonces saca solo fotos del buzón. Mi cara y mi nombre no los pongas.', romanization: 'Geureom pyeonjiham sajinman jjigeoyo. Je eolgulhago ireumeun neochi maseyo.' },
        { speaker: '지호', target: '약속할게요. 편집장님한테도 오늘 분명히 말씀드릴게요. 걱정 마세요.', es: 'Te lo prometo. Hoy mismo se lo digo claramente también al jefe. No te preocupes.', romanization: 'Yaksokalgeyo. Pyeonjipjangnimhantedo oneul bunmyeonghi malsseumdeurilgeyo. Geokjeong maseyo.' },
        { speaker: '유나', target: '지호 씨를 믿어요. 그런데 마음이 조금 무거운 것 같아요.', es: 'Confío en ti. Pero siento el corazón un poco pesado.', romanization: 'Jiho ssireul mideoyo. Geureonde maeumi jogeum mugeoun geot gatayo.' },
      ],
      gist: ['지호와 유나는 기사에 대해 어떻게 약속하나요?', '편지함 사진만 싣고 얼굴과 이름은 빼기로 해요', '카페에 관한 기사를 전혀 내지 않기로 해요', '유나의 긴 인터뷰와 사진을 함께 싣기로 해요', '유나는 편지함 사진만 찍고 자신의 얼굴과 이름은 넣지 말라고 해요.'],
      details: [
        ['유나는 기사가 나오면 무엇이 달라질까 봐 걱정하나요?', '편지함이 가진 의미가 없어질까 봐 걱정해요', '아무도 신문을 읽지 않을까 봐 걱정해요', '건물 주인이 월세를 더 올릴까 봐 걱정해요', '유나는 편지함의 의미가 없어질 것 같아 걱정해요.'],
        ['별은 왜 기사가 필요하다고 생각하나요?', '그대로 두면 팔월에 카페가 없어질 수 있어서예요', '신문사가 카페에 많은 돈을 줄 수 있어서예요', '편지함에 더 이상 자리가 남지 않아서예요', '별은 이대로 두면 팔월에 카페가 없어질 수 있다고 말해요.'],
        ['지호는 유나에게 무엇을 약속하나요?', '유나가 원하지 않는 내용은 쓰지 않겠다고 해요', '사진 없이 짧은 기사만 쓰겠다고 해요', '신문사 일을 바로 그만두겠다고 해요', '지호는 유나가 원하지 않는 내용은 쓰지 않겠다고 약속해요.'],
      ],
      consolidation: ['문장을 완성하세요: 이대로 두면 팔월에 카페가 ___.', '없어질 텐데요', '없어졌어요', '없어질까요', '-(으)ㄹ 텐데는 일어날 가능성이 큰 일을 예상하면서 상대의 반응이나 다른 의견을 기다릴 때 써요.'],
      audit: { possibleDifficulties: ['-(으)ㄹ 텐데 aparece tres veces con sujetos y intenciones distintas', 'la negación de deseo 원하지 않는 건 delante de sustantivo'], continuity: 'Jiho cumple lo que prometió a Sofía en el episodio 4: pregunta antes. La condición que Yuna pone aquí es exactamente la que el periódico romperá en el episodio 8.', pronunciationRisks: ['실으면', '넣지 마세요'], recommendedChanges: ['El sexto turno es el pacto del que depende toda la temporada: leerlo despacio y sin música de fondo.'] },
    }),
    ep({
      id: 'ko-b1-06-pyeonjihameul-yeoreoyo', order: 6, title: '편지함을 열어요', titleEs: 'Abrimos el buzón', duration: 54,
      characters: ['소피아', '유나', '별'], location: '별 카페', objective: '피동 표현으로 «저절로 일어나는 일»을 알아듣는다.',
      grammar: ['피동 (들리다·보이다·쓰이다·열리다)', '-기 때문에'],
      keywords: [{ target: '뚜껑', es: 'tapa' }, { target: '들려요', es: 'se oye' }, { target: '보여요', es: 'se ve' }, { target: '쓰여 있어요', es: 'está escrito' }, { target: '종이', es: 'papel' }, { target: '지키고 싶어요', es: 'quiero proteger' }],
      storyFunction: '이사 전에 편지를 세면서 편지함의 무게를 숫자로 보여 주고 유나의 오 년 전 편지를 다시 꺼낸다.',
      turns: [
        { speaker: '소피아', target: '유나 씨, 오늘은 편지함을 열고 편지를 다 세어 봐요.', es: 'Yuna, hoy abramos el buzón y contemos todas las cartas.', romanization: 'Yuna ssi, oneureun pyeonjihameul yeolgo pyeonjireul da seeo bwayo.' },
        { speaker: '유나', target: '좋아요. 뚜껑이 오래됐기 때문에 잘 안 열려요. 천천히 열어요.', es: 'Vale. Como la tapa es vieja, no se abre bien. Ábrela despacio.', romanization: 'Joayo. Ttukkeongi oraedwaetgi ttaemune jal an yeollyeoyo. Cheoncheonhi yeoreoyo.' },
        { speaker: '별', target: '안에서 종이 소리가 들려요. 편지가 정말 많이 들어 있어요.', es: 'Dentro se oye ruido de papel. Hay muchísimas cartas metidas.', romanization: 'Aneseo jongi soriga deullyeoyo. Pyeonjiga jeongmal mani deureo isseoyo.' },
        { speaker: '소피아', target: '이 편지에는 이름이 안 쓰여 있어요. 별 그림만 그려져 있어요.', es: 'En esta carta no está escrito ningún nombre. Solo hay dibujada una estrella.', romanization: 'I pyeonjieneun ireumi an sseuyeo isseoyo. Byeol geurimman geuryeojyeo isseoyo.' },
        { speaker: '유나', target: '오 년 전에 제가 받은 편지도 그랬어요. 아직도 가지고 있어요.', es: 'La carta que recibí yo hace cinco años era igual. Todavía la guardo.', romanization: 'O nyeon jeone jega badeun pyeonjido geuraesseoyo. Ajikdo gajigo isseoyo.' },
        { speaker: '별', target: '여기 글씨가 잘 안 보여요. 종이가 오래돼서 색이 변했어요.', es: 'Aquí la letra casi no se ve. El papel es viejo y ha cambiado de color.', romanization: 'Yeogi geulssiga jal an boyeoyo. Jongiga oraedwaeseo saegi byeonhaesseoyo.' },
        { speaker: '소피아', target: '모두 삼백스물두 장이에요. 이 편지들 때문에 카페를 꼭 지키고 싶어요.', es: 'Son trescientas veintidós en total. Por estas cartas quiero salvar el café sea como sea.', romanization: 'Modu sambaekseumuldu jangieyo. I pyeonjideul ttaemune kapereul kkok jikigo sipeoyo.' },
        { speaker: '유나', target: '저도 그래요. 그런데 편지는 제 것이 아니기 때문에 함부로 못 보여 줘요.', es: 'Yo también. Pero como las cartas no son mías, no puedo enseñarlas a la ligera.', romanization: 'Jeodo geuraeyo. Geureonde pyeonjineun je geosi anigi ttaemune hamburo mot boyeo jwoyo.' },
      ],
      gist: ['¿Qué hacen en el café?', 'Abren el buzón y cuentan todas las cartas', 'Tiran las cartas viejas', 'Escriben una carta entre los tres', 'Sofía propone 편지함을 열고 편지를 다 세어 봐요.'],
      details: [
        ['¿Por qué cuesta abrir la tapa?', 'Porque es vieja', 'Porque está cerrada con llave', 'Porque está llena de cartas', 'Yuna dice 뚜껑이 오래됐기 때문에 잘 안 열려요.'],
        ['¿Cuántas cartas hay en total?', 'Trescientas veintidós', 'Doscientas dos', 'Treinta y dos', 'Sofía dice 모두 삼백스물두 장이에요.'],
        ['¿Qué dice Yuna sobre enseñar las cartas?', 'Que no son suyas y no puede enseñarlas a la ligera', 'Que las va a publicar en el periódico', 'Que las quemará antes de mudarse', 'Dice 제 것이 아니기 때문에 함부로 못 보여 줘요.'],
      ],
      consolidation: ['Completa: 안에서 종이 소리가 ___.', '들려요', '들어요', '들었어요', '들리다 es la forma pasiva: el sonido llega solo. 들어요 sería «lo escucho» a propósito.'],
      audit: { possibleDifficulties: ['cuatro pasivas seguidas: 열려요, 들려요, 쓰여 있어요, 보여요', 'la construcción -아/어 있다 con pasiva: 그려져 있어요'], continuity: 'Las trescientas y pico cartas que Byeol mencionó de oído en el episodio 1 se cuentan aquí una a una: 322. La carta de Yuna es la que le dejó un cliente dentro de un libro, ahora hace cinco años.', pronunciationRisks: ['삼백스물두', '그려져 있어요'], recommendedChanges: ['Marcar una pausa real antes de 삼백스물두 장이에요: es respuesta de una pregunta de detalle.'] },
    }),
    ep({
      id: 'ko-b1-07-dongnee-allyeoyo', order: 7, title: '동네에 알려요', titleEs: 'Avisamos al barrio', duration: 55,
      characters: ['미나', '소피아', '별'], location: '한빛 아파트 앞', objective: '사동 표현으로 «남이 하게 만드는 일»을 알아듣는다.',
      grammar: ['사동 (알리다·보여 주다·먹이다)', '-다고 하다'],
      keywords: [{ target: '이모', es: 'tía' }, { target: '먹이고', es: 'dando de comer' }, { target: '알려 줬어요', es: 'me lo contó' }, { target: '보여 주고', es: 'mostrando' }, { target: '알릴게요', es: 'lo avisaré' }, { target: '포스터', es: 'cartel' }],
      storyFunction: '동네 어른들을 사건에 합류시키고 기사에 대한 기대를 부풀린다.',
      turns: [
        { speaker: '미나', target: '소피아 씨, 오랜만이에요! 지금 콩이한테 밥을 먹이고 있었어요.', es: '¡Sofía, cuánto tiempo! Justo le estaba dando de comer a Kong.', romanization: 'Sopia ssi, oraenmanieyo! Jigeum Kongihante babeul meogigo isseosseoyo.' },
        { speaker: '소피아', target: '콩이가 정말 커졌네요. 미나 씨, 별 카페 소식 들으셨어요?', es: 'Kong ha crecido muchísimo. Mina, ¿ha oído lo del Café Estrella?', romanization: 'Kongiga jeongmal keojyeonneyo. Mina ssi, Byeol Kape sosik deureusyeosseoyo?' },
        { speaker: '미나', target: '네, 별이 어제 저한테 다 알려 줬어요. 정말 마음이 아파요.', es: 'Sí, Byeol me lo contó todo ayer. Me duele de verdad.', romanization: 'Ne, Byeori eoje jeohante da allyeo jwosseoyo. Jeongmal maeumi apayo.' },
        { speaker: '별', target: '이모, 지호가 신문에 기사를 쓴다고 했어요. 그러면 사람들이 알게 될 거예요.', es: 'Tía, Jiho dijo que va a escribir un reportaje en el periódico. Así la gente se enterará.', romanization: 'Imo, Jihoga sinmune gisareul sseundago haesseoyo. Geureomyeon saramdeuri alge doel geoyeyo.' },
        { speaker: '미나', target: '그런데 유나 씨는 조용히 하고 싶다고 하지 않았어요?', es: 'Pero ¿no había dicho Yuna que quería llevarlo en silencio?', romanization: 'Geureonde Yuna ssineun joyonghi hago sipdago haji anasseoyo?' },
        { speaker: '소피아', target: '맞아요. 그래서 지호가 편지함만 보여 주고 얼굴은 안 보여 준다고 했어요.', es: 'Exacto. Por eso Jiho dijo que mostrará solo el buzón y no la cara de Yuna.', romanization: 'Majayo. Geuraeseo Jihoga pyeonjihamman boyeo jugo eolgureun an boyeo jundago haesseoyo.' },
        { speaker: '미나', target: '그럼 저는 동네 아주머니들한테 이 소식을 알릴게요. 다들 도와줄 거예요.', es: 'Entonces yo aviso a las señoras del barrio. Seguro que todas ayudan.', romanization: 'Geureom jeoneun dongne ajumeonideulhante i sosigeul allilgeyo. Dadeul dowajul geoyeyo.' },
        { speaker: '별', target: '이모, 고마워요. 저는 오늘 밤에 포스터를 만들고 내일 학교에 붙일게요.', es: 'Gracias, tía. Yo hago esta noche un cartel y mañana lo pego en la facultad.', romanization: 'Imo, gomawoyo. Jeoneun oneul bame poseuteoreul mandeulgo naeil hakgyoe buchilgeyo.' },
      ],
      gist: ['¿Cómo se reparten el trabajo?', 'Mina avisa a las vecinas y Byeol hace un cartel', 'Mina compra el local nuevo', 'Byeol escribe el reportaje', 'Mina dice 아주머니들한테 알릴게요 y Byeol 포스터를 만들고… 붙일게요.'],
      details: [
        ['¿Qué estaba haciendo Mina?', 'Dándole de comer a Kong', 'Paseando por el barrio', 'Limpiando el buzón', 'Dice 콩이한테 밥을 먹이고 있었어요.'],
        ['¿Qué dijo Jiho que mostraría en el reportaje?', 'Solo el buzón, no la cara de Yuna', 'La cara de Yuna y el buzón', 'Las cartas una por una', 'Sofía dice 편지함만 보여 주고 얼굴은 안 보여 준다고 했어요.'],
        ['¿Qué hará Byeol esta noche?', 'Un cartel para pegarlo mañana en la facultad', 'Una carta para el buzón', 'Una foto del café', 'Dice 포스터를 만들고 내일 학교에 붙일게요.'],
      ],
      consolidation: ['Completa: 별이 어제 저한테 다 ___.', '알려 줬어요', '알았어요', '알고 있었어요', '알리다 es el causativo de 알다: hacer que el otro lo sepa. 알았어요 sería «lo supe yo».'],
      audit: { possibleDifficulties: ['causativos 먹이다, 알리다, 보여 주다 en un mismo audio', 'a Mina, adulta, se le pregunta con honorífico: 들으셨어요?'], continuity: 'Recoge el acuerdo del episodio 5 —solo el buzón, ni cara ni nombre— y lo repite en boca de Sofía, para que el estudiante tenga fresca la promesa cuando se rompa.', pronunciationRisks: ['먹이고', '커졌네요'], recommendedChanges: ['Byeol llama 이모 a Mina y le habla en 해요체: mantener esa combinación, es la del reparto desde A1.'] },
    }),
    ep({
      id: 'ko-b1-08-gisaga-sillyeosseo', order: 8, title: '기사가 실렸어', titleEs: 'Salió el reportaje', duration: 47,
      characters: ['별', '소피아', '지호'], location: '별 카페 앞', objective: '피동으로 «누가 했는지 말하지 않는 문장»을 알아듣는다.',
      grammar: ['피동 (실리다·쓰이다)', '-다고 하다', '반말'],
      keywords: [{ target: '실렸어', es: 'salió publicado' }, { target: '제목', es: 'titular' }, { target: '신문', es: 'periódico' }, { target: '인터넷', es: 'internet' }, { target: '약속', es: 'promesa' }, { target: '큰일', es: 'un problema serio' }],
      storyFunction: '약속이 깨지는 순간을 보여 주고, 지호의 책임과 실제 책임을 갈라놓는다.',
      turns: [
        { speaker: '별', target: '소피아야, 오늘 수요일 신문에 지호 기사가 실렸어. 여기 봐.', es: 'Sofía, en el periódico del miércoles ha salido el reportaje de Jiho. Mira aquí.', romanization: 'Sopiaya, oneul suyoil sinmune Jiho gisaga sillyeosseo. Yeogi bwa.' },
        { speaker: '소피아', target: '어디? 「동네의 작은 편지함」... 제목은 정말 좋다.', es: '¿Dónde? «El pequeño buzón del barrio»… El titular está muy bien.', romanization: 'Eodi? "Dongneui jageun pyeonjiham"... jemogeun jeongmal jota.' },
        { speaker: '별', target: '그런데 사진을 봐. 유나 씨 얼굴이 크게 나왔어. 이름도 쓰여 있어.', es: 'Pero mira la foto. Sale la cara de Yuna en grande. Y también está escrito su nombre.', romanization: 'Geureonde sajineul bwa. Yuna ssi eolguri keuge nawasseo. Ireumdo sseuyeo isseo.' },
        { speaker: '소피아', target: '지호는 얼굴을 안 넣는다고 분명히 약속했어. 그런데 왜 이렇게 됐어?', es: 'Jiho prometió claramente que no pondría la cara. ¿Y cómo ha acabado así?', romanization: 'Jihoneun eolgureul an neonneundago bunmyeonghi yaksokaesseo. Geureonde wae ireoke dwaesseo?' },
        { speaker: '지호', target: '나도 방금 신문을 봤어. 내 사진이 아니야. 나는 편지함만 찍었어.', es: 'Yo también acabo de ver el periódico. Esa foto no es mía. Yo solo fotografié el buzón.', romanization: 'Nado banggeum sinmuneul bwasseo. Nae sajini aniya. Naneun pyeonjihamman jjigeosseo.' },
        { speaker: '별', target: '그럼 이 사진은 어디에서 나왔어? 누가 신문에 넣었어?', es: 'Entonces ¿de dónde salió esta foto? ¿Quién la metió en el periódico?', romanization: 'Geureom i sajineun eodieseo nawasseo? Nuga sinmune neoeosseo?' },
        { speaker: '지호', target: '편집장님이 인터넷에서 찾았다고 해. 나한테는 아무 말도 안 했어.', es: 'Dice el jefe que la encontró en internet. A mí no me dijo nada.', romanization: 'Pyeonjipjangnimi inteoneseseo chajatdago hae. Nahanteneun amu maldo an haesseo.' },
        { speaker: '소피아', target: '유나 씨가 이 신문을 보면 우리를 못 믿게 될 텐데 정말 큰일이야.', es: 'Si Yuna ve este periódico dejará de confiar en nosotros. Esto es serio.', romanization: 'Yuna ssiga i sinmuneul bomyeon urireul mot mitge doel tende jeongmal keunniriya.' },
      ],
      gist: ['¿Qué ha pasado con el reportaje?', 'Salió publicado con la cara y el nombre de Yuna', 'Salió sin foto ninguna', 'No llegó a publicarse', 'Byeol dice 유나 씨 얼굴이 크게 나왔어. 이름도 쓰여 있어.'],
      details: [
        ['¿Qué día del periódico es?', 'El del miércoles', 'El del domingo', 'El del sábado', 'Byeol dice 오늘 수요일 신문에.'],
        ['¿Qué dice Jiho de la foto?', 'Que no es suya: él solo fotografió el buzón', 'Que la hizo él pero sin querer', 'Que se la dio Yuna', 'Dice 내 사진이 아니야. 나는 편지함만 찍었어.'],
        ['¿De dónde salió la foto, según Jiho?', 'El jefe dice que la encontró en internet', 'De la pared del café', 'De un álbum de Mina', 'Dice 편집장님이 인터넷에서 찾았다고 해.'],
      ],
      consolidation: ['Completa: 오늘 수요일 신문에 지호 기사가 ___.', '실렸어', '실었어', '실을 거야', '실리다 es la pasiva de 싣다: el reportaje «fue publicado», sin decir por quién.'],
      audit: { possibleDifficulties: ['pasiva 실렸어 frente a activa 실었어, que solo cambian una sílaba', 'todo el episodio es banmal entre los tres amigos'], continuity: 'Rompe exactamente la condición que Yuna puso en el episodio 5 y que Sofía repitió en el 7. El estudiante ya sabe que la promesa existía; aquí solo comprueba cómo se rompe.', pronunciationRisks: ['실렸어', '큰일이야'], recommendedChanges: ['El titular entre 「」 se lee como texto impreso, más plano que el resto del turno.'] },
    }),
    ep({
      id: 'ko-b1-09-hwaga-nasseoyo', order: 9, title: '책임은 지호 씨한테 있어요', titleEs: 'La responsabilidad es tuya', duration: 50,
      characters: ['유나', '지호', '소피아'], location: '별 카페', objective: '-아/어야 되다의 과거로 «했어야 하는 일»을 알아듣는다.',
      grammar: ['-아/어야 되다 (과거)', '-(으)ㄹ 텐데'],
      keywords: [{ target: '책임', es: 'responsabilidad' }, { target: '확인해야', es: 'tenía que comprobar' }, { target: '유명해지고', es: 'hacerse famosa' }, { target: '화가', es: 'enfado' }, { target: '전화', es: 'llamadas' }, { target: '죄송해요', es: 'lo siento' }],
      storyFunction: '오해를 오해로 남겨 두고, 우정을 시즌에서 가장 낮은 지점으로 내린다.',
      turns: [
        { speaker: '유나', target: '지호 씨, 이 사진은 제가 넣지 말라고 부탁한 사진이에요.', es: 'Jiho, esta foto es justo la que te pedí que no pusieras.', romanization: 'Jiho ssi, i sajineun jega neochi mallago butakan sajinieyo.' },
        { speaker: '지호', target: '유나 씨, 그 사진은 제가 찍지 않았어요. 정말 죄송해요.', es: 'Yuna, esa foto no la hice yo. Lo siento de verdad.', romanization: 'Yuna ssi, geu sajineun jega jjikji anasseoyo. Jeongmal joesonghaeyo.' },
        { speaker: '유나', target: '어제부터 모르는 사람들이 계속 전화를 해요. 저는 유명해지고 싶지 않았어요.', es: 'Desde ayer me llaman constantemente desconocidos. Yo no quería hacerme famosa.', romanization: 'Eojebuteo moreuneun saramdeuri gyesok jeonhwareul haeyo. Jeoneun yumyeonghaejigo sipji anasseoyo.' },
        { speaker: '소피아', target: '유나 씨, 지호는 정말 몰랐어요. 편집장님이 사진을 넣었다고 해요.', es: 'Yuna, Jiho de verdad no lo sabía. Dicen que la foto la puso el jefe de redacción.', romanization: 'Yuna ssi, Jihoneun jeongmal mollasseoyo. Pyeonjipjangnimi sajineul neoeotdago haeyo.' },
        { speaker: '유나', target: '그래도 기사는 지호 씨 이름으로 나갔어요. 책임은 지호 씨한테 있어요.', es: 'Aun así el reportaje salió con tu nombre. La responsabilidad es tuya.', romanization: 'Geuraedo gisaneun Jiho ssi ireumeuro nagasseoyo. Chaegimeun Jiho ssihante isseoyo.' },
        { speaker: '지호', target: '맞아요. 제가 먼저 확인해야 됐어요. 내일 회사에서 다시 이야기할게요.', es: 'Tienes razón. Yo tenía que haberlo comprobado antes. Mañana lo hablo otra vez en la oficina.', romanization: 'Majayo. Jega meonjeo hwaginhaeya dwaesseoyo. Naeil hoesaeseo dasi iyagihalgeyo.' },
        { speaker: '유나', target: '오늘은 그만해요. 지금 이야기하면 서로 더 화가 날 텐데요.', es: 'Hoy déjalo. Si hablamos ahora, nos vamos a enfadar más los dos.', romanization: 'Oneureun geumanhaeyo. Jigeum iyagihamyeon seoro deo hwaga nal tendeyo.' },
        { speaker: '소피아', target: '알겠어요. 그럼 우리는 조용히 기다려야 될 것 같아요.', es: 'De acuerdo. Entonces creo que tenemos que esperar en silencio.', romanization: 'Algesseoyo. Geureom urineun joyonghi gidaryeoya doel geot gatayo.' },
      ],
      gist: ['¿Cómo reacciona Yuna?', 'Le echa a Jiho la responsabilidad y corta la conversación', 'Acepta la disculpa enseguida', 'Le pide a Jiho otro reportaje', 'Dice 책임은 지호 씨한테 있어요 y 오늘은 그만해요.'],
      details: [
        ['¿Qué le está pasando a Yuna desde ayer?', 'La llaman sin parar desconocidos', 'No entra ningún cliente', 'Le han subido otra vez el alquiler', 'Dice 모르는 사람들이 계속 전화를 해요.'],
        ['¿Qué explica Sofía?', 'Que la foto la puso el jefe de redacción', 'Que la foto la sacó Byeol', 'Que Jiho lo hizo a propósito', 'Dice 편집장님이 사진을 넣었다고 해요.'],
        ['¿Por qué quiere Yuna dejarlo por hoy?', 'Porque hablando ahora se enfadarían más', 'Porque tiene mucho trabajo', 'Porque llega un cliente', 'Dice 지금 이야기하면 서로 더 화가 날 텐데요.'],
      ],
      consolidation: ['¿Qué frase dijo Jiho?', '제가 먼저 확인해야 됐어요', '제가 먼저 확인해야 돼요', '제가 먼저 확인하고 있어요', 'El pasado 확인해야 됐어요 admite la obligación que no cumplió; en presente sería una promesa.'],
      audit: { possibleDifficulties: ['-아/어야 됐어요 en pasado: obligación incumplida', 'la orden indirecta negativa 넣지 말라고 부탁한'], continuity: 'Es la respuesta de Yuna al periódico del episodio 8; ella todavía no sabe lo que Jiho descubrirá en el 10, y por eso el malentendido sigue en pie.', pronunciationRisks: ['찍지 않았어요', '유명해지고'], recommendedChanges: ['Yuna no grita: habla bajo y rápido. El enfado se marca con la velocidad, no con el volumen.'] },
    }),
    ep({
      id: 'ko-b1-10-jeongjeong-gisa', order: 10, title: '정정 기사', titleEs: 'La rectificación', duration: 47,
      characters: ['지호', '편집장', '소피아'], location: '동네 신문사 사무실', objective: '-(으)려고의 의도와 -게 되다의 결과를 대조해서 듣는다.',
      grammar: ['-(으)려고', '-게 되다', '-기 때문에'],
      keywords: [{ target: '문제', es: 'problema' }, { target: '상처', es: 'herida' }, { target: '정정', es: 'rectificación' }, { target: '팔렸어요', es: 'se vendió' }, { target: '사과', es: 'disculpa' }, { target: '서둘러야', es: 'hay que darse prisa' }],
      storyFunction: '독자의 눈에는 지호의 무죄를 확정하고, 인물들에게는 남은 한 달을 알린다.',
      turns: [
        { speaker: '지호', target: '편집장님, 저는 사진을 넣지 않았어요. 왜 유나 씨 얼굴이 나갔어요?', es: 'Jefe, yo no puse la foto. ¿Por qué salió la cara de Yuna?', romanization: 'Pyeonjipjangnim, jeoneun sajineul neochi anasseoyo. Wae Yuna ssi eolguri nagasseoyo?' },
        { speaker: '편집장', target: '카페 인터넷 사진이니까 문제가 없어요. 기사도 아주 잘 나갔어요.', es: 'Es una foto de internet del café, así que no hay problema. Además el reportaje salió muy bien.', romanization: 'Kape inteonet sajininikka munjega eopseoyo. Gisado aju jal nagasseoyo.' },
        { speaker: '지호', target: '저는 그 카페를 도우려고 기사를 썼어요. 그런데 주인이 상처를 받게 됐어요.', es: 'Yo escribí el reportaje para ayudar a ese café. Y ha acabado hiriendo a su dueña.', romanization: 'Jeoneun geu kapereul douryeogo gisareul sseosseoyo. Geureonde juini sangcheoreul batge dwaesseoyo.' },
        { speaker: '편집장', target: '이번 주 신문이 평소보다 두 배로 팔렸어요. 사람들이 그 카페를 알게 됐어요.', es: 'Esta semana el periódico se vendió el doble que de costumbre. La gente ha conocido ese café.', romanization: 'Ibeon ju sinmuni pyeongsoboda du baero pallyeosseoyo. Saramdeuri geu kapereul alge dwaesseoyo.' },
        { speaker: '지호', target: '그건 알아요. 하지만 약속을 지키려고 조건까지 정했어요.', es: 'Eso ya lo sé. Pero yo puse condiciones justamente para cumplir mi promesa.', romanization: 'Geugeon arayo. Hajiman yaksogeul jikiryeogo jogeonkkaji jeonghaesseoyo.' },
        { speaker: '편집장', target: '알겠어요. 그럼 다음 주에 짧은 정정 기사를 내요. 사진은 빼요.', es: 'Entiendo. Pues saca la semana que viene una rectificación corta. La foto, fuera.', romanization: 'Algesseoyo. Geureom daeum jue jjalbeun jeongjeong gisareul naeyo. Sajineun ppaeyo.' },
        { speaker: '소피아', target: '지호야, 카페는 이제 한 달밖에 안 남았어. 우리도 서둘러야 돼.', es: 'Jiho, al café solo le queda un mes. Nosotros también tenemos que darnos prisa.', romanization: 'Jihoya, kapeneun ije han dalbakke an namasseo. Urido seodulleoya dwae.' },
        { speaker: '지호', target: '응. 정정 기사가 나오면 유나 씨한테 다시 사과하러 갈게.', es: 'Sí. Cuando salga la rectificación iré otra vez a disculparme con Yuna.', romanization: 'Eung. Jeongjeong gisaga naomyeon Yuna ssihante dasi sagwahareo galge.' },
      ],
      gist: ['¿Qué consigue Jiho en la redacción?', 'Que la semana siguiente salga una rectificación sin foto', 'Que retiren el periódico', 'Que le den el puesto de jefe', 'El jefe dice 짧은 정정 기사를 내요. 사진은 빼요.'],
      details: [
        ['¿Cómo justifica el jefe la foto?', 'Dice que era una foto de internet del café', 'Dice que se la dio Yuna', 'Dice que la hizo él mismo', 'Dice 카페 인터넷 사진이니까 문제가 없어요.'],
        ['¿Cuánto se vendió el periódico esta semana?', 'El doble que de costumbre', 'La mitad', 'Igual que siempre', 'Dice 평소보다 두 배로 팔렸어요.'],
        ['¿Cuánto le queda al café?', 'Un mes', 'Dos meses', 'Una semana', 'Sofía dice 카페는 이제 한 달밖에 안 남았어.'],
      ],
      consolidation: ['Completa: 저는 그 카페를 ___ 기사를 썼어요.', '도우려고', '도와서', '도우면', '-(으)려고 da la intención con la que se hace algo; 돕다 pierde la ㅂ delante de la vocal.'],
      audit: { possibleDifficulties: ['-(으)려고 (intención) y -게 되다 (resultado no buscado) en el mismo turno', 'Sofía tutea a Jiho delante del jefe, y al jefe no le habla'], continuity: 'Explica ante el lector lo que Yuna todavía no sabe en el episodio 9, y fija la cuenta atrás: de los dos meses del episodio 2 queda uno.', pronunciationRisks: ['팔렸어요', '한 달밖에'], recommendedChanges: ['El jefe habla rápido y sin pausas: su prisa es lo que hace verosímil el error del episodio 8.'] },
    }),
    ep({
      id: 'ko-b1-11-sonnimi-neomu-manayo', order: 11, title: '손님이 너무 많아요', titleEs: 'Hay demasiada gente', duration: 49,
      characters: ['유나', '미나', '별'], location: '별 카페', objective: '-(으)면서로 동시 동작을, 사동으로 «못 하게 하다»를 알아듣는다.',
      grammar: ['-(으)면서', '사동 (-게 하다)', '-아/어야 되다'],
      keywords: [{ target: '줄', es: 'fila' }, { target: '뚜껑', es: 'tapa' }, { target: '부서졌어요', es: 'se rompió' }, { target: '구경거리', es: 'atracción para curiosos' }, { target: '설명', es: 'explicación' }, { target: '만지지', es: 'tocar' }],
      storyFunction: '유나가 두려워하던 일을 실제로 일어나게 해서 편지함을 닫는 결정을 정당화한다.',
      turns: [
        { speaker: '유나', target: '미나 씨, 오늘 아침부터 사람들이 줄을 서면서 사진을 찍고 있어요.', es: 'Mina, desde esta mañana la gente hace cola mientras saca fotos.', romanization: 'Mina ssi, oneul achimbuteo saramdeuri jureul seomyeonseo sajineul jjikgo isseoyo.' },
        { speaker: '미나', target: '밖에 스무 명쯤 기다리고 있어요. 제가 커피를 나를게요. 유나 씨는 좀 쉬어요.', es: 'Fuera esperan unas veinte personas. Yo llevo los cafés. Tú descansa un poco.', romanization: 'Bakke seumu myeongjjeum gidarigo isseoyo. Jega keopireul nareulgeyo. Yuna ssineun jom swieoyo.' },
        { speaker: '별', target: '큰일이에요. 어떤 손님이 편지를 세 장이나 가지고 갔어요.', es: 'Esto es grave. Un cliente se ha llevado nada menos que tres cartas.', romanization: 'Keunnirieyo. Eotteon sonnimi pyeonjireul se jangina gajigo gasseoyo.' },
        { speaker: '유나', target: '그 편지는 다른 사람한테 쓴 편지예요. 마음이 정말 아파요.', es: 'Esas cartas están escritas para otras personas. Me duele de verdad.', romanization: 'Geu pyeonjineun dareun saramhante sseun pyeonjiyeyo. Maeumi jeongmal apayo.' },
        { speaker: '미나', target: '아이들한테 편지를 만지지 못하게 해야 될 것 같아요.', es: 'Creo que hay que impedir que los niños toquen las cartas.', romanization: 'Aideulhante pyeonjireul manjiji motage haeya doel geot gatayo.' },
        { speaker: '별', target: '아까 어떤 아이가 뚜껑 위에 올라갔어요. 그래서 나무가 부서졌어요.', es: 'Antes un niño se subió encima de la tapa. Y la madera se rompió.', romanization: 'Akka eotteon aiga ttukkeong wie ollagasseoyo. Geuraeseo namuga buseojyeosseoyo.' },
        { speaker: '유나', target: '이제 그만해야 돼요. 오늘부터 편지함을 닫을게요. 이건 구경거리가 아니에요.', es: 'Hay que parar ya. Desde hoy cierro el buzón. Esto no es una atracción.', romanization: 'Ije geumanhaeya dwaeyo. Oneulbuteo pyeonjihameul dadeulgeyo. Igeon gugyeonggeoriga anieyo.' },
        { speaker: '미나', target: '유나 씨, 잠깐 앉으세요. 제가 손님들한테 조용히 설명할게요.', es: 'Yuna, siéntate un momento. Yo se lo explico a la gente con calma.', romanization: 'Yuna ssi, jamkkan anjeuseyo. Jega sonnimdeulhante joyonghi seolmyeonghalgeyo.' },
      ],
      gist: ['¿Qué decide Yuna este fin de semana?', 'Cerrar el buzón porque se ha vuelto una atracción', 'Contratar a más personal', 'Vender el café ese mismo día', 'Dice 오늘부터 편지함을 닫을게요. 이건 구경거리가 아니에요.'],
      details: [
        ['¿Cuánta gente espera fuera?', 'Unas veinte personas', 'Unas tres', 'Nadie', 'Mina dice 밖에 스무 명쯤 기다리고 있어요.'],
        ['¿Qué se llevó un cliente?', 'Tres cartas', 'La tapa del buzón', 'Una taza', 'Byeol dice 편지를 세 장이나 가지고 갔어요.'],
        ['¿Por qué se rompió la madera?', 'Porque un niño se subió encima de la tapa', 'Porque la mojó la lluvia', 'Porque Mina la dejó caer', 'Dice 어떤 아이가 뚜껑 위에 올라갔어요. 그래서 나무가 부서졌어요.'],
      ],
      consolidation: ['Completa: 사람들이 줄을 ___ 사진을 찍고 있어요.', '서면서', '서니까', '서지만', '-(으)면서 marca dos acciones a la vez del mismo sujeto: hacer cola y fotografiar.'],
      audit: { possibleDifficulties: ['사동 con -게 하다 en forma negativa: 만지지 못하게 해야 될 것 같아요', '세 장이나 con el matiz de «nada menos que»'], continuity: 'Es la consecuencia directa del reportaje del episodio 8 y de lo que Yuna había previsto en el 5: la gente viene a curiosear. La tapa que ya costaba abrir en el episodio 6 acaba rota.', pronunciationRisks: ['부서졌어요', '구경거리가'], recommendedChanges: ['Fondo con murmullo de gente en los cuatro primeros turnos, más bajo que las voces.'] },
    }),
    ep({
      id: 'ko-b1-12-dangbungan-swimnida', order: 12, title: '당분간 쉽니다', titleEs: 'Cerrado por un tiempo', duration: 60,
      characters: ['별', '소피아', '김 선생님'], location: '별 카페 앞', objective: '-기 때문에로 감정의 원인을 알아듣는다.',
      grammar: ['-기 때문에', '-(으)ㄴ/는 것 같아요', '피동'],
      keywords: [{ target: '당분간', es: 'por un tiempo' }, { target: '잘못', es: 'culpa' }, { target: '무섭기', es: 'tener miedo' }, { target: '사라져요', es: 'desaparece' }, { target: '문구점', es: 'papelería' }, { target: '아주머니', es: 'señora' }],
      storyFunction: '유나의 동기를 설명하고, 문구점 주인이라는 새 실마리를 자연스럽게 놓는다.',
      turns: [
        { speaker: '별', target: '선생님, 편지함 위에 「당분간 쉽니다」라고 쓰여 있어요. 어제 유나 씨가 붙였어요.', es: 'Profesora, encima del buzón está escrito «Cerrado por un tiempo». Lo pegó ayer Yuna.', romanization: 'Seonsaengnim, pyeonjiham wie "dangbungan swimnida"rago sseuyeo isseoyo. Eoje Yuna ssiga buchyeosseoyo.' },
        { speaker: '소피아', target: '저 때문에 편지함이 닫힌 것 같아요. 제가 그때 더 세게 말려야 됐어요.', es: 'Creo que el buzón se ha cerrado por mi culpa. Tenía que haber insistido más entonces.', romanization: 'Jeo ttaemune pyeonjihami dachin geot gatayo. Jega geuttae deo sege mallyeoya dwaesseoyo.' },
        { speaker: '김 선생님', target: '소피아 씨 잘못이 아니에요. 유나 씨는 무섭기 때문에 문을 닫은 거예요.', es: 'No es culpa tuya. Yuna lo ha cerrado porque tiene miedo.', romanization: 'Sopia ssi jalmosi anieyo. Yuna ssineun museopgi ttaemune muneul dadeun geoyeyo.' },
        { speaker: '별', target: '손님은 오히려 많아졌어요. 그런데 왜 무서워해요?', es: 'Al contrario, ahora hay más clientes. ¿Y por qué tiene miedo?', romanization: 'Sonnimeun ohiryeo manajyeosseoyo. Geureonde wae museowohaeyo?' },
        { speaker: '김 선생님', target: '편지는 조용한 마음이기 때문에 사람이 많아지면 사라져요.', es: 'Como una carta es un gesto silencioso, cuando llega mucha gente desaparece.', romanization: 'Pyeonjineun joyonghan maeumigi ttaemune sarami manajimyeon sarajyeoyo.' },
        { speaker: '소피아', target: '저도 요즘 그런 생각이 들어요. 우리가 너무 서두른 것 같아요.', es: 'Yo también lo pienso últimamente. Creo que nos precipitamos.', romanization: 'Jeodo yojeum geureon saenggagi deureoyo. Uriga neomu seodureun geot gatayo.' },
        { speaker: '별', target: '그런데 어제 문구점 아주머니가 카페에 오셨어요. 편지함을 한참 보셨어요.', es: 'Por cierto, ayer vino al café la señora de la papelería. Se quedó mirando el buzón un buen rato.', romanization: 'Geureonde eoje mungujeom ajumeoniga kapee osyeosseoyo. Pyeonjihameul hancham bosyeosseoyo.' },
        { speaker: '김 선생님', target: '그 아주머니는 오래전부터 그 편지지를 파는 분이에요. 한번 찾아가 보세요.', es: 'Esa señora lleva mucho tiempo vendiendo ese papel de carta. Vayan a verla.', romanization: 'Geu ajumeonineun oraejeonbuteo geu pyeonjijireul paneun bunieyo. Hanbeon chajaga boseyo.' },
      ],
      gist: ['¿Qué explica la profesora?', 'Que Yuna cerró el buzón por miedo, no por enfado', 'Que Yuna se enfadó con Sofía', 'Que el buzón se cerró por orden del dueño del edificio', 'Dice 유나 씨는 무섭기 때문에 문을 닫은 거예요.'],
      details: [
        ['¿Qué está escrito encima del buzón?', '«Cerrado por un tiempo»', '«Se venden cartas»', '«Abierto los jueves»', 'Byeol lee 「당분간 쉽니다」라고 쓰여 있어요.'],
        ['¿Qué dice la profesora sobre las cartas?', 'Que son un gesto silencioso y desaparecen con el gentío', 'Que hay que publicarlas en un libro', 'Que ya no le interesan a nadie', 'Dice 편지는 조용한 마음이기 때문에 사람이 많아지면 사라져요.'],
        ['¿Quién fue ayer al café?', 'La señora de la papelería', 'El jefe de redacción', 'El dueño del edificio', 'Byeol dice 문구점 아주머니가 카페에 오셨어요.'],
      ],
      consolidation: ['Completa: 유나 씨는 ___ 문을 닫은 거예요.', '무섭기 때문에', '무서우면', '무섭지만', '-기 때문에 da la causa; 무서우면 pondría una condición y 무섭지만 un contraste.'],
      audit: { possibleDifficulties: ['-기 때문에 con adjetivo (무섭기) y con nombre + 이다 (마음이기)', 'la pasiva 닫히다 frente al activo 닫다 en turnos seguidos'], continuity: 'Recoge la decisión que Yuna tomó en el episodio 11 y devuelve la investigación a la papelería de A2, cuya dueña vuelve a aparecer después de dos años.', pronunciationRisks: ['닫힌', '무섭기'], recommendedChanges: ['El cartel 「당분간 쉽니다」 está escrito en 합니다체 porque es un aviso impreso: leerlo con voz de texto, no de diálogo.'] },
    }),
    ep({
      id: 'ko-b1-13-sinmun-daesin-ballo', order: 13, title: '신문 대신 발로', titleEs: 'A pie, en vez de en el periódico', duration: 46,
      characters: ['지호', '소피아', '별'], location: '별 카페 앞 계단', objective: '반말로 이어지는 토론에서 서로 다른 의견을 구별한다.',
      grammar: ['반말', '-다고 하다', '-(으)려고'],
      keywords: [{ target: '연락했어', es: 'se puso en contacto' }, { target: '현실', es: 'la realidad' }, { target: '망친', es: 'estropeado' }, { target: '빈 가게', es: 'local vacío' }, { target: '부동산', es: 'inmobiliaria' }, { target: '대신', es: 'en vez de' }],
      storyFunction: '세 친구의 의견을 정면으로 부딪히게 하고, 시즌의 방향을 언론에서 발품으로 바꾼다.',
      turns: [
        { speaker: '지호', target: '정정 기사가 나온 뒤에 어떤 사람이 도와주고 싶다고 연락했어.', es: 'Después de salir la rectificación, alguien se puso en contacto diciendo que quiere ayudar.', romanization: 'Jeongjeong gisaga naon dwie eotteon sarami dowajugo sipdago yeollakaesseo.' },
        { speaker: '소피아', target: '나는 이제 신문 이야기는 그만하고 싶어. 유나 씨가 더 힘들어져.', es: 'Yo ya no quiero saber nada del periódico. Yuna lo está pasando peor.', romanization: 'Naneun ije sinmun iyagineun geumanhago sipeo. Yuna ssiga deo himdeureojyeo.' },
        { speaker: '지호', target: '그렇지만 돈이 없으면 새 가게도 못 구해. 이건 현실이야.', es: 'Pero sin dinero tampoco conseguimos un local nuevo. Esto es la realidad.', romanization: 'Geureochiman doni eopseumyeon sae gagedo mot guhae. Igeon hyeonsiriya.' },
        { speaker: '별', target: '둘 다 맞아. 그런데 유나 씨한테 먼저 물어보는 게 맞다고 생각해.', es: 'Los dos tenéis razón. Pero yo creo que lo correcto es preguntarle antes a Yuna.', romanization: 'Dul da maja. Geureonde Yuna ssihante meonjeo mureoboneun ge matdago saenggakae.' },
        { speaker: '소피아', target: '지호야, 너는 카페를 살리려고 했지만 유나 씨는 조용한 카페를 원해.', es: 'Jiho, tú querías salvar el café, pero Yuna quiere un café tranquilo.', romanization: 'Jihoya, neoneun kapereul salliryeogo haetjiman Yuna ssineun joyonghan kapereul wonhae.' },
        { speaker: '지호', target: '알아. 나도 그날부터 잠이 안 와. 내가 다 망친 것 같아.', es: 'Lo sé. Desde ese día no duermo. Siento que lo he estropeado todo.', romanization: 'Ara. Nado geunalbuteo jami an wa. Naega da mangchin geot gata.' },
        { speaker: '별', target: '그럼 신문 대신 발로 뛰자. 빈 가게를 같이 찾아보자.', es: 'Pues movámonos a pie en vez de en el periódico. Busquemos juntos un local vacío.', romanization: 'Geureom sinmun daesin ballo ttwija. Bin gagereul gachi chajaboja.' },
        { speaker: '소피아', target: '좋아. 내일 아침에 동네 부동산부터 세 군데 가 보자.', es: 'Vale. Mañana por la mañana empezamos por tres inmobiliarias del barrio.', romanization: 'Joa. Naeil achime dongne budongsanbuteo se gunde ga boja.' },
      ],
      gist: ['¿En qué quedan los tres amigos?', 'En dejar la prensa y buscar ellos mismos un local', 'En pedir más reportajes al periódico', 'En dejar que el café cierre', 'Byeol dice 신문 대신 발로 뛰자 y Sofía propone las inmobiliarias.'],
      details: [
        ['¿Qué pasó tras la rectificación?', 'Alguien se ofreció a ayudar', 'Nadie llamó al periódico', 'El café recibió una multa', 'Jiho dice 어떤 사람이 도와주고 싶다고 연락했어.'],
        ['¿Qué argumento da Jiho para seguir?', 'Que sin dinero no consiguen local nuevo', 'Que el jefe se lo ha ordenado', 'Que quiere ser famoso', 'Dice 돈이 없으면 새 가게도 못 구해. 이건 현실이야.'],
        ['¿Qué proponen hacer mañana?', 'Ir a tres inmobiliarias del barrio', 'Volver a hablar con el jefe', 'Abrir otra vez el buzón', 'Sofía dice 동네 부동산부터 세 군데 가 보자.'],
      ],
      consolidation: ['¿Qué frase oíste?', '유나 씨한테 먼저 물어보는 게 맞다고 생각해', '유나 씨한테 먼저 물어보는 게 맞다고 생각해요', '유나 씨한테 먼저 물어보는 게 맞다고 생각합니다', 'Entre ellos tres solo hay banmal desde el episodio 1: no aparece ninguna forma en -요.'],
      audit: { possibleDifficulties: ['episodio entero en banmal, con propositivos -자 (뛰자, 찾아보자, 가 보자)', 'tres opiniones distintas sin que ninguna sea la equivocada'], continuity: 'Encadena la rectificación del episodio 10 con el consejo de la profesora del 12, y decide el método que la segunda mitad de la temporada va a seguir.', pronunciationRisks: ['연락했어', '찾아보자'], recommendedChanges: ['Que las tres voces se solapen ligeramente en los turnos 2 y 3: es una discusión, no una ronda ordenada.'] },
    }),
    ep({
      id: 'ko-b1-14-mungujeom-ajumeoni', order: 14, title: '문구점 아주머니', titleEs: 'La señora de la papelería', duration: 58,
      characters: ['소피아', '문구점 주인', '별'], location: '문구점', objective: '피동 팔리다와 -기 때문에로 설명을 알아듣는다.',
      grammar: ['피동 (팔리다)', '-기 때문에', '-(으)시- 높임'],
      keywords: [{ target: '팔려요', es: 'se vende' }, { target: '편지지', es: 'papel de carta' }, { target: '금방', es: 'enseguida' }, { target: '빈 가게', es: 'local vacío' }, { target: '반', es: 'la mitad' }, { target: '옛날', es: 'antaño' }],
      storyFunction: '해결의 열쇠를 쥔 인물을 다시 무대에 올리고, 새 가게라는 출구를 처음 보여 준다.',
      turns: [
        { speaker: '소피아', target: '아주머니, 오랜만이에요. 이 편지지가 아직도 여기에서만 팔려요?', es: 'Señora, cuánto tiempo. ¿Este papel de carta se sigue vendiendo solo aquí?', romanization: 'Ajumeoni, oraenmanieyo. I pyeonjijiga ajikdo yeogieseoman pallyeoyo?' },
        { speaker: '문구점 주인', target: '그럼요. 이 별 그림 편지지는 서울에서 우리 가게에만 있어요.', es: 'Pues claro. Este papel con la estrella, en Seúl solo está en mi tienda.', romanization: 'Geureomnyo. I byeol geurim pyeonjijineun Seoureseo uri gageeman isseoyo.' },
        { speaker: '별', target: '아주머니, 신문 보셨어요? 별 카페 편지함이 크게 실렸어요.', es: 'Señora, ¿vio el periódico? El buzón del Café Estrella salió a lo grande.', romanization: 'Ajumeoni, sinmun bosyeosseoyo? Byeol Kape pyeonjihami keuge sillyeosseoyo.' },
        { speaker: '문구점 주인', target: '봤어요. 사진 속 편지지가 우리 가게 것이기 때문에 금방 알았어요.', es: 'Lo vi. Como el papel de la foto es de mi tienda, lo reconocí enseguida.', romanization: 'Bwasseoyo. Sajin sok pyeonjijiga uri gage geosigi ttaemune geumbang arasseoyo.' },
        { speaker: '소피아', target: '사실 그 카페가 팔월에 문을 닫아요. 새 가게를 찾고 있어요.', es: 'La verdad es que ese café cierra en agosto. Estamos buscando un local nuevo.', romanization: 'Sasil geu kapega parwore muneul dadayo. Sae gagereul chatgo isseoyo.' },
        { speaker: '문구점 주인', target: '어머, 그럼 우리 가게 옆 빈 가게를 한번 보세요. 월세도 반이에요.', es: 'Ay, pues echen un vistazo al local vacío de al lado. El alquiler es la mitad.', romanization: 'Eomeo, geureom uri gage yeop bin gagereul hanbeon boseyo. Wolsedo banieyo.' },
        { speaker: '별', target: '정말요? 그런데 아주머니는 왜 저희를 이렇게 도와주세요?', es: '¿De verdad? Pero ¿por qué nos ayuda usted tanto?', romanization: 'Jeongmaryo? Geureonde ajumeonineun wae jeohuireul ireoke dowajuseyo?' },
        { speaker: '문구점 주인', target: '저도 옛날에 편지를 많이 썼어요. 그 이야기는 길기 때문에 다음에 해 줄게요.', es: 'Yo también escribí muchas cartas hace años. Esa historia es larga, se la cuento otro día.', romanization: 'Jeodo yennare pyeonjireul mani sseosseoyo. Geu iyagineun gilgi ttaemune daeume hae julgeyo.' },
      ],
      gist: ['¿Qué ofrece la señora de la papelería?', 'Que vayan a ver el local vacío de al lado, con la mitad de alquiler', 'Que les regale papel de carta', 'Que compre ella el café', 'Dice 우리 가게 옆 빈 가게를 한번 보세요. 월세도 반이에요.'],
      details: [
        ['¿Dónde se vende ese papel de carta?', 'Solo en su tienda, en todo Seúl', 'En todas las papelerías del barrio', 'Ya no se vende en ninguna parte', 'Dice 서울에서 우리 가게에만 있어요.'],
        ['¿Cómo reconoció ella el reportaje?', 'Porque el papel de la foto era de su tienda', 'Porque salía su propia foto', 'Porque se lo contó la profesora', 'Dice 사진 속 편지지가 우리 가게 것이기 때문에 금방 알았어요.'],
        ['¿Qué deja a medias la señora?', 'La historia de las cartas que escribió hace años', 'El precio del local vacío', 'El nombre del dueño del edificio', 'Dice 그 이야기는 길기 때문에 다음에 해 줄게요.'],
      ],
      consolidation: ['Completa: 이 편지지가 아직도 여기에서만 ___?', '팔려요', '팔아요', '팔았어요', '팔리다 es la pasiva de 팔다: «se vende», sin decir quién lo vende.'],
      audit: { possibleDifficulties: ['pasiva 팔려요 frente a activa 팔아요, muy próximas en sonido', 'a la señora se le habla con -(으)시-: 보셨어요?, 도와주세요?'], continuity: 'Recupera a la dueña de la papelería de A2 —la única que vende el papel con estrella— y planta la salida material del conflicto: el local vacío de al lado.', pronunciationRisks: ['팔려요', '그럼요'], recommendedChanges: ['El último turno debe cortarse con naturalidad, como quien deja una historia para otro día: es el gancho del episodio 15.'] },
    }),
    ep({
      id: 'ko-b1-15-o-nyeon-jeon-geu-sonnim', order: 15, title: '오 년 전 그 손님', titleEs: 'Aquella clienta de hace cinco años', duration: 52,
      characters: ['문구점 주인', '소피아', '지호'], location: '문구점', objective: '-(으)려고와 -아/어야 되다로 남의 사연을 따라간다.',
      grammar: ['-(으)려고', '-아/어야 되다', '-다고 하다'],
      keywords: [{ target: '겨울', es: 'invierno' }, { target: '직원', es: 'empleada' }, { target: '위로해', es: 'consolar' }, { target: '짧게', es: 'brevemente' }, { target: '사이', es: 'entre (las páginas)' }, { target: '사장', es: 'dueña del negocio' }],
      storyFunction: '시즌의 비밀을 풀고, 유나가 오 년 동안 자신에게 편지를 준 사람의 가게에서 종이를 사 왔다는 사실을 드러낸다.',
      turns: [
        { speaker: '문구점 주인', target: '어제 못 한 이야기를 해 줄게요. 여기 좀 앉으세요.', es: 'Les cuento la historia que quedó a medias ayer. Siéntense aquí.', romanization: 'Eoje motan iyagireul hae julgeyo. Yeogi jom anjeuseyo.' },
        { speaker: '소피아', target: '감사합니다. 저희도 어제부터 그 이야기가 정말 궁금했어요.', es: 'Gracias. Desde ayer nos moríamos de curiosidad.', romanization: 'Gamsahamnida. Jeohuido eojebuteo geu iyagiga jeongmal gunggeumhaesseoyo.' },
        { speaker: '문구점 주인', target: '오 년 전 겨울에 저는 별 카페에 자주 갔어요. 커피가 아주 맛있었어요.', es: 'Hace cinco años, en invierno, yo iba mucho al Café Estrella. El café estaba buenísimo.', romanization: 'O nyeon jeon gyeoure jeoneun Byeol Kapee jaju gasseoyo. Keopiga aju masisseosseoyo.' },
        { speaker: '문구점 주인', target: '어느 날 새 직원이 책을 읽으면서 울고 있었어요.', es: 'Un día, una empleada nueva estaba leyendo un libro y llorando.', romanization: 'Eoneu nal sae jigwoni chaegeul ilgeumyeonseo ulgo isseosseoyo.' },
        { speaker: '지호', target: '그래서 아주머니가 그 사람한테 편지를 쓰셨어요?', es: '¿Y entonces usted le escribió una carta a esa persona?', romanization: 'Geuraeseo ajumeoniga geu saramhante pyeonjireul sseusyeosseoyo?' },
        { speaker: '문구점 주인', target: '네. 위로해 주려고 우리 가게 편지지에 짧게 썼어요. 그리고 책 사이에 넣었어요.', es: 'Sí. Para consolarla escribí unas líneas en papel de mi tienda. Y la metí entre las páginas del libro.', romanization: 'Ne. Wirohae juryeogo uri gage pyeonjijie jjalge sseosseoyo. Geurigo chaek saie neoeosseoyo.' },
        { speaker: '소피아', target: '아주머니, 그 직원 이름을 아세요? 저희는 꼭 알아야 돼요.', es: 'Señora, ¿sabe cómo se llamaba esa empleada? Necesitamos saberlo.', romanization: 'Ajumeoni, geu jigwon ireumeul aseyo? Jeohuineun kkok araya dwaeyo.' },
        { speaker: '문구점 주인', target: '이름은 안 물어봤어요. 그런데 그 사람이 지금 그 카페 사장이라고 들었어요.', es: 'No le pregunté el nombre. Pero me dijeron que ahora esa persona es la dueña del café.', romanization: 'Ireumeun an mureobwasseoyo. Geureonde geu sarami jigeum geu kape sajangirago deureosseoyo.' },
      ],
      gist: ['¿Qué revela la señora?', 'Que fue ella quien escribió la carta que recibió Yuna', 'Que ella inventó el buzón del café', 'Que trabajó en el café hace cinco años', 'Cuenta que metió la carta 책 사이에 y que aquella empleada es hoy la dueña.'],
      details: [
        ['¿Cuándo ocurrió aquello?', 'Hace cinco años, en invierno', 'Hace dos años, en verano', 'El invierno pasado', 'Dice 오 년 전 겨울에.'],
        ['¿Qué hacía la empleada aquel día?', 'Leía un libro y lloraba', 'Servía cafés sin hablar', 'Escribía una carta', 'Dice 새 직원이 책을 읽으면서 울고 있었어요.'],
        ['¿Por qué escribió aquella carta?', 'Para consolarla', 'Para venderle papel', 'Para pedirle disculpas', 'Dice 위로해 주려고… 짧게 썼어요.'],
      ],
      consolidation: ['Completa: ___ 우리 가게 편지지에 짧게 썼어요.', '위로해 주려고', '위로해 줘서', '위로해 주면', '-(으)려고 expresa la intención con la que se hizo algo: escribió «para consolarla».'],
      audit: { possibleDifficulties: ['relato largo en boca de un solo personaje, con dos turnos seguidos', 'la cita indirecta con nombre: 사장이라고 들었어요'], continuity: 'Cierra el hueco que A2 dejó abierto en el episodio 18: Yuna contó que un cliente le metió una carta en el libro, pero nunca supo quién. Era la misma mujer que desde entonces le vende el papel con estrella.', pronunciationRisks: ['읽으면서', '사장이라고'], recommendedChanges: ['La señora habla despacio y sin dramatismo: la revelación la hace el contenido, no el tono.'] },
    }),
    ep({
      id: 'ko-b1-16-simhage-malhaesseoyo', order: 16, title: '제가 너무 심하게 말했어요', titleEs: 'Te hablé demasiado duro', duration: 52,
      characters: ['소피아', '유나', '지호'], location: '별 카페', objective: '-게 되다와 인용으로 화해의 과정을 알아듣는다.',
      grammar: ['-게 되다', '-다고 하다', '-(으)ㄹ 텐데'],
      keywords: [{ target: '미안하다고', es: 'que lo sentía' }, { target: '놀라운', es: 'sorprendente' }, { target: '아주머니라고', es: 'que era la señora' }, { target: '심하게', es: 'con dureza' }, { target: '파셨어요', es: 'lo vendía' }, { target: '겨울', es: 'invierno' }],
      storyFunction: '오해를 풀고, 두 사람의 화해와 유나의 감사를 같은 장면에 놓는다.',
      turns: [
        { speaker: '소피아', target: '유나 씨, 오늘은 꼭 드릴 이야기가 있어서 왔어요.', es: 'Yuna, hoy hemos venido porque tenemos algo importante que contarte.', romanization: 'Yuna ssi, oneureun kkok deuril iyagiga isseoseo wasseoyo.' },
        { speaker: '유나', target: '앉으세요. 사실 저도 두 사람한테 미안하다고 말하고 싶었어요.', es: 'Sentaos. La verdad es que yo también quería deciros que lo sentía.', romanization: 'Anjeuseyo. Sasil jeodo du saramhante mianhadago malhago sipeosseoyo.' },
        { speaker: '지호', target: '아니에요. 제 기사 때문에 유나 씨가 힘들게 됐어요. 정말 죄송해요.', es: 'Qué va. Por mi reportaje lo has pasado mal. Lo siento de verdad.', romanization: 'Anieyo. Je gisa ttaemune Yuna ssiga himdeulge dwaesseoyo. Jeongmal joesonghaeyo.' },
        { speaker: '소피아', target: '그런데 어제 문구점 아주머니한테서 놀라운 이야기를 들었어요.', es: 'Pero ayer oímos algo sorprendente de boca de la señora de la papelería.', romanization: 'Geureonde eoje mungujeom ajumeonihanteseo nollaun iyagireul deureosseoyo.' },
        { speaker: '지호', target: '오 년 전 겨울에 우는 직원한테 편지를 쓴 사람이 그 아주머니라고 해요.', es: 'Dice que quien escribió la carta a aquella empleada que lloraba, hace cinco inviernos, fue ella.', romanization: 'O nyeon jeon gyeoure uneun jigwonhante pyeonjireul sseun sarami geu ajumeonirago haeyo.' },
        { speaker: '유나', target: '네? 그럼 오 년 동안 제가 그 편지지를 산 가게가...', es: '¿Cómo? Entonces la tienda donde llevo cinco años comprando ese papel…', romanization: 'Ne? Geureom o nyeon dongan jega geu pyeonjijireul san gagega...' },
        { speaker: '소피아', target: '네, 같은 가게예요. 아주머니는 유나 씨 이름도 모르실 텐데 계속 편지지를 파셨어요.', es: 'Sí, la misma. Ella ni siquiera sabrá tu nombre y te ha estado vendiendo el papel todo este tiempo.', romanization: 'Ne, gateun gageyeyo. Ajumeonineun Yuna ssi ireumdo moreusil tende gyesok pyeonjijireul pasyeosseoyo.' },
        { speaker: '유나', target: '지호 씨, 제가 너무 심하게 말했어요. 지금 같이 문구점에 가 줄래요?', es: 'Jiho, te hablé demasiado duro. ¿Vienes conmigo ahora a la papelería?', romanization: 'Jiho ssi, jega neomu simhage malhaesseoyo. Jigeum gachi mungujeome ga jullaeyo?' },
      ],
      gist: ['¿Cómo termina la conversación?', 'Yuna se disculpa con Jiho y quiere ir a ver a la señora', 'Yuna despide a Jiho para siempre', 'Deciden publicar otro reportaje', 'Dice 제가 너무 심하게 말했어요 y propone 같이 문구점에 가 줄래요?'],
      details: [
        ['¿Qué quería decirles Yuna a ellos?', 'Que lo sentía', 'Que cerraba el café antes', 'Que se mudaba de ciudad', 'Dice 저도 두 사람한테 미안하다고 말하고 싶었어요.'],
        ['¿Qué descubre Yuna sobre la papelería?', 'Que es la misma tienda de la mujer que le escribió', 'Que ya no vende ese papel', 'Que la va a comprar el dueño del edificio', 'Dice 오 년 동안 제가 그 편지지를 산 가게가… y Sofía confirma 같은 가게예요.'],
        ['¿Qué dice Sofía sobre el nombre de Yuna?', 'Que la señora seguramente ni lo sabe', 'Que lo apuntó en un cuaderno', 'Que se lo preguntó al periódico', 'Dice 유나 씨 이름도 모르실 텐데.'],
      ],
      consolidation: ['Completa: 제 기사 때문에 유나 씨가 ___.', '힘들게 됐어요', '힘들어야 돼요', '힘든 것 같아요', '-게 되다 nombra el resultado al que se llegó sin buscarlo; las otras dos serían obligación y suposición.'],
      audit: { possibleDifficulties: ['la frase de Yuna queda cortada a propósito en el sexto turno', '-(으)시- dentro de -(으)ㄹ 텐데: 모르실 텐데'], continuity: 'Une la revelación del episodio 15 con el enfado del 9 y lo deshace: el malentendido se aclara sin que nadie tenga que mentir. La caja seguirá cerrada hasta el episodio 19.', pronunciationRisks: ['아주머니라고', '모르실 텐데'], recommendedChanges: ['El sexto turno acaba en suspensión, no en pregunta: la entonación debe quedar en el aire.'] },
    }),
    ep({
      id: 'ko-b1-17-bin-gagereul-bogo', order: 17, title: '빈 가게를 보러 갔어요', titleEs: 'Fuimos a ver el local vacío', duration: 49,
      characters: ['문구점 주인', '유나', '별'], location: '문구점 옆 빈 가게', objective: '사동 -게 해 주다와 -(으)면서로 계획을 알아듣는다.',
      grammar: ['사동 (-게 해 주다)', '-(으)면서', '-(으)ㄹ 텐데'],
      keywords: [{ target: '창문', es: 'ventana' }, { target: '햇빛', es: 'luz del sol' }, { target: '부엌', es: 'cocina' }, { target: '창고', es: 'almacén' }, { target: '고치면서', es: 'mientras lo arreglo' }, { target: '이사할게요', es: 'me mudaré' }],
      storyFunction: '해결을 물리적으로 확정하고, 이사 날짜를 시즌의 마지막 시계로 세운다.',
      turns: [
        { speaker: '문구점 주인', target: '여기가 그 빈 가게예요. 삼 년 동안 아무도 안 썼어요.', es: 'Este es el local vacío. Lleva tres años sin que lo use nadie.', romanization: 'Yeogiga geu bin gageyeyo. Sam nyeon dongan amudo an sseosseoyo.' },
        { speaker: '유나', target: '창문이 크네요. 아침에 햇빛이 잘 들어올 텐데 정말 마음에 들어요.', es: 'Qué ventanales. Por la mañana entrará mucha luz; me gusta mucho.', romanization: 'Changmuni keuneyo. Achime haetbichi jal deureool tende jeongmal maeume deureoyo.' },
        { speaker: '별', target: '그런데 부엌이 좀 작아요. 커피 기계를 어디에 놓을까요?', es: 'Pero la cocina es pequeña. ¿Dónde ponemos la máquina de café?', romanization: 'Geureonde bueoki jom jagayo. Keopi gigyereul eodie noeulkkayo?' },
        { speaker: '문구점 주인', target: '우리 가게 창고를 쓰게 해 줄게요. 물건을 거기에 넣으세요.', es: 'Les dejaré usar el almacén de mi tienda. Metan ahí las cosas.', romanization: 'Uri gage changgoreul sseuge hae julgeyo. Mulgeoneul geogie neoeuseyo.' },
        { speaker: '유나', target: '아주머니, 정말 감사합니다. 월세가 반이니까 저도 다시 시작할 수 있어요.', es: 'Señora, muchísimas gracias. Con la mitad de alquiler yo también puedo empezar de nuevo.', romanization: 'Ajumeoni, jeongmal gamsahamnida. Wolsega baninikka jeodo dasi sijakal su isseoyo.' },
        { speaker: '별', target: '저는 편지함을 고치면서 별 그림도 다시 그릴게요.', es: 'Yo, mientras arreglo el buzón, repintaré también las estrellas.', romanization: 'Jeoneun pyeonjihameul gochimyeonseo byeol geurimdo dasi geurilgeyo.' },
        { speaker: '문구점 주인', target: '부서진 뚜껑은 우리 아저씨가 고쳐 줄 거예요. 나무를 잘 다뤄요.', es: 'La tapa rota me la arregla mi marido. Se le da bien la madera.', romanization: 'Buseojin ttukkeongeun uri ajeossiga gochyeo jul geoyeyo. Namureul jal darwoyo.' },
        { speaker: '유나', target: '그럼 팔월 이십오 일에 이사할게요. 모두한테 제가 직접 알릴게요.', es: 'Entonces me mudo el 25 de agosto. Yo misma aviso a todo el mundo.', romanization: 'Geureom parwol isibo ire isahalgeyo. Moduhante jega jikjeop allilgeyo.' },
      ],
      gist: ['¿Qué se decide en el local vacío?', 'Que Yuna se muda allí el 25 de agosto', 'Que el local es demasiado pequeño', 'Que la papelería se muda al café', 'Yuna dice 팔월 이십오 일에 이사할게요.'],
      details: [
        ['¿Qué le gusta a Yuna del local?', 'Que entra mucha luz por la mañana', 'Que la cocina es enorme', 'Que tiene almacén propio', 'Dice 아침에 햇빛이 잘 들어올 텐데 정말 마음에 들어요.'],
        ['¿Qué les ofrece la señora?', 'Dejarles usar el almacén de su tienda', 'Pagarles el primer mes', 'Regalarles una máquina de café', 'Dice 우리 가게 창고를 쓰게 해 줄게요.'],
        ['¿Quién va a arreglar la tapa rota?', 'El marido de la señora', 'Byeol solo', 'Un carpintero del periódico', 'Dice 부서진 뚜껑은 우리 아저씨가 고쳐 줄 거예요.'],
      ],
      consolidation: ['Completa: 우리 가게 창고를 ___.', '쓰게 해 줄게요', '쓰고 싶어요', '썼어요', '-게 해 주다 es dejar que otro haga algo: «se lo dejaré usar».'],
      audit: { possibleDifficulties: ['-게 해 주다 con sujeto distinto del que actúa', 'la fecha 팔월 이십오 일, con tres numerales seguidos'], continuity: 'Convierte en decisión la oferta que la señora hizo en el episodio 14. La tapa que se rompió en el 11 encuentra aquí quien la arregle, y Byeol recupera las estrellas que pintó en A2.', pronunciationRisks: ['햇빛이', '부엌이'], recommendedChanges: ['Separar bien 팔월 / 이십오 / 일에: la fecha es respuesta de una pregunta de detalle.'] },
    }),
    ep({
      id: 'ko-b1-18-iljuil-namasseoyo', order: 18, title: '일주일 남았어요', titleEs: 'Queda una semana', duration: 46,
      characters: ['김 선생님', '미나', '소피아', '지호', '유나'], location: '별 카페', objective: '-기 때문에와 -아/어야 되다로 준비 작업의 순서를 알아듣는다.',
      grammar: ['-기 때문에', '-아/어야 되다', '-(으)ㄹ 텐데'],
      keywords: [{ target: '일주일', es: 'una semana' }, { target: '정리해야', es: 'hay que recoger' }, { target: '김밥', es: 'gimbap' }, { target: '상자', es: 'caja' }, { target: '젖으면', es: 'si se mojan' }, { target: '남겨야', es: 'hay que dejar constancia' }],
      storyFunction: '동네 전체가 모이는 장면으로 갈등을 닫고, 지호의 변화를 행동으로 보여 준다.',
      turns: [
        { speaker: '김 선생님', target: '이사가 일주일 남았기 때문에 오늘 다 정리해야 돼요.', es: 'Como falta una semana para la mudanza, hoy hay que recogerlo todo.', romanization: 'Isaga iljuil namatgi ttaemune oneul da jeongnihaeya dwaeyo.' },
        { speaker: '미나', target: '학생들이 배고플 텐데 제가 김밥을 좀 만들어 왔어요.', es: 'Los estudiantes tendrán hambre, así que he traído gimbap.', romanization: 'Haksaengdeuri baegopeul tende jega gimbabeul jom mandeureo wasseoyo.' },
        { speaker: '소피아', target: '감사합니다. 편지 삼백스물두 장은 상자 다섯 개에 나눠서 넣었어요.', es: 'Gracias. Las trescientas veintidós cartas las he repartido en cinco cajas.', romanization: 'Gamsahamnida. Pyeonji sambaekseumuldu jangeun sangja daseot gaee nanwoseo neoeosseoyo.' },
        { speaker: '김 선생님', target: '편지가 젖으면 안 되니까 상자를 위에 놓아야 돼요.', es: 'Las cartas no se pueden mojar, así que hay que poner las cajas arriba.', romanization: 'Pyeonjiga jeojeumyeon an doenikka sangjareul wie noaya dwaeyo.' },
        { speaker: '지호', target: '유나 씨, 오늘 사진을 찍어도 돼요? 이번에는 먼저 물어봐야 돼요.', es: 'Yuna, ¿puedo hacer fotos hoy? Esta vez tengo que preguntar antes.', romanization: 'Yuna ssi, oneul sajineul jjigeodo dwaeyo? Ibeoneneun meonjeo mureobwaya dwaeyo.' },
        { speaker: '유나', target: '찍으세요. 이제는 지호 씨 사진을 저도 보고 싶어요.', es: 'Hazlas. Ahora yo también quiero ver tus fotos.', romanization: 'Jjigeuseyo. Ijeneun Jiho ssi sajineul jeodo bogo sipeoyo.' },
        { speaker: '미나', target: '마지막 손님이 오셨어요. 콩이도 인사하러 같이 왔어요.', es: 'Ha llegado el último cliente. Y Kong ha venido a despedirse también.', romanization: 'Majimak sonnimi osyeosseoyo. Kongido insahareo gachi wasseoyo.' },
        { speaker: '소피아', target: '이 벽에도 별 그림이 있어요. 저것도 사진으로 남겨야 돼요.', es: 'En esta pared también hay una estrella pintada. De eso también hay que dejar foto.', romanization: 'I byeogedo byeol geurimi isseoyo. Jeogeotdo sajineuro namgyeoya dwaeyo.' },
      ],
      gist: ['¿Qué se hace en el café este día?', 'Recogerlo todo una semana antes de la mudanza', 'Celebrar la reapertura', 'Repartir las cartas entre los vecinos', 'La profesora dice 이사가 일주일 남았기 때문에 오늘 다 정리해야 돼요.'],
      details: [
        ['¿Cómo se han guardado las cartas?', 'Repartidas en cinco cajas', 'Todas en una bolsa', 'En el almacén de la papelería', 'Sofía dice 상자 다섯 개에 나눠서 넣었어요.'],
        ['¿Por qué hay que poner las cajas arriba?', 'Para que las cartas no se mojen', 'Porque pesan poco', 'Para que quepan más cosas', 'La profesora dice 편지가 젖으면 안 되니까.'],
        ['¿Qué hace Jiho distinto esta vez?', 'Pide permiso antes de fotografiar', 'Fotografía sin avisar', 'No lleva cámara', 'Dice 사진을 찍어도 돼요? 이번에는 먼저 물어봐야 돼요.'],
      ],
      consolidation: ['Completa: 이사가 일주일 ___ 오늘 다 정리해야 돼요.', '남았기 때문에', '남았지만', '남으면', '-기 때문에 da la causa del trabajo de hoy; 남았지만 opondría y 남으면 condicionaría.'],
      audit: { possibleDifficulties: ['tres obligaciones seguidas en -아/어야 되다 con sujetos distintos', 'la cifra 삼백스물두 장 vuelve del episodio 6 y debe coincidir'], continuity: 'Las 322 cartas contadas en el episodio 6 se empaquetan aquí sin cambiar de número, y Jiho hace por fin lo que no hizo en el episodio 8: pedir permiso antes de fotografiar.', pronunciationRisks: ['정리해야', '젖으면'], recommendedChanges: ['Ambiente de cajas y cinta adhesiva de fondo, siempre por debajo de las voces.'] },
    }),
    ep({
      id: 'ko-b1-19-isahaneun-nal', order: 19, title: '이사하는 날', titleEs: 'El día de la mudanza', duration: 47,
      characters: ['지호', '별', '소피아', '유나', '미나'], location: '새 가게 앞', objective: '피동과 -게 되다로 마무리되는 변화를 알아듣는다.',
      grammar: ['피동 (고쳐지다)', '-게 되다', '-(으)면서'],
      keywords: [{ target: '뚜껑', es: 'tapa' }, { target: '고쳐졌어', es: 'quedó arreglada' }, { target: '열두 개', es: 'doce' }, { target: '첫 편지', es: 'primera carta' }, { target: '글씨', es: 'letra' }, { target: '무거워', es: 'pesa' }],
      storyFunction: '편지함을 새 가게에 들이고, 오 년 전의 글씨를 유나 앞에 다시 놓는다.',
      turns: [
        { speaker: '지호', target: '편지함이 드디어 새 가게 안으로 들어왔어. 생각보다 훨씬 무거워.', es: 'Por fin el buzón está dentro del local nuevo. Pesa mucho más de lo que parecía.', romanization: 'Pyeonjihami deudieo sae gage aneuro deureowasseo. Saenggakboda hwolssin mugeowo.' },
        { speaker: '별', target: '뚜껑은 다 고쳐졌어. 별도 열 개에서 열두 개가 됐어.', es: 'La tapa ya quedó arreglada. Y las estrellas pasaron de diez a doce.', romanization: 'Ttukkeongeun da gochyeojyeosseo. Byeoldo yeol gaeeseo yeoldu gaega dwaesseo.' },
        { speaker: '소피아', target: '별 두 개를 왜 더 그렸어? 무슨 뜻이 있어?', es: '¿Por qué pintaste dos estrellas más? ¿Significan algo?', romanization: 'Byeol du gaereul wae deo geuryeosseo? Museun tteusi isseo?' },
        { speaker: '별', target: '이 년 전 답장 끝에 별이 두 개 있었어. 그걸 기억하면서 그렸어.', es: 'Hace dos años, al final de aquella respuesta había dos estrellas. Las pinté acordándome de eso.', romanization: 'I nyeon jeon dapjang kkeute byeori du gae isseosseo. Geugeol gieokamyeonseo geuryeosseo.' },
        { speaker: '유나', target: '별 씨, 고마워요. 이 편지함을 다시 열게 돼서 정말 기뻐요.', es: 'Byeol, gracias. Me hace muy feliz poder volver a abrir este buzón.', romanization: 'Byeol ssi, gomawoyo. I pyeonjihameul dasi yeolge dwaeseo jeongmal gippeoyo.' },
        { speaker: '미나', target: '문구점 아주머니가 첫 편지를 벌써 넣으셨어요. 저기 보세요.', es: 'La señora de la papelería ya ha metido la primera carta. Mirad allí.', romanization: 'Mungujeom ajumeoniga cheot pyeonjireul beolsseo neoeusyeosseoyo. Jeogi boseyo.' },
        { speaker: '유나', target: '아주머니 글씨예요. 오 년 만에 이 글씨를 다시 보게 됐어요.', es: 'Es su letra. Después de cinco años vuelvo a verla.', romanization: 'Ajumeoni geulssiyeyo. O nyeon mane i geulssireul dasi boge dwaesseoyo.' },
        { speaker: '지호', target: '유나 씨, 오늘 사진은 편지함만 찍을게요. 이번에는 약속을 꼭 지킬게요.', es: 'Yuna, hoy fotografío solo el buzón. Esta vez cumplo la promesa.', romanization: 'Yuna ssi, oneul sajineun pyeonjihamman jjigeulgeyo. Ibeoneneun yaksogeul kkok jikilgeyo.' },
      ],
      gist: ['¿Qué pasa el día de la mudanza?', 'El buzón entra restaurado y recibe su primera carta', 'El buzón se rompe del todo', 'Deciden dejar el buzón en el local viejo', 'Byeol dice 뚜껑은 다 고쳐졌어 y Mina 첫 편지를 벌써 넣으셨어요.'],
      details: [
        ['¿Cuántas estrellas tiene ahora el buzón?', 'Doce', 'Diez', 'Dos', 'Byeol dice 열 개에서 열두 개가 됐어.'],
        ['¿Por qué añadió dos estrellas?', 'Porque la respuesta de hace dos años acababa con dos estrellas', 'Porque son dos amigos', 'Porque quedaban dos huecos', 'Dice 이 년 전 답장 끝에 별이 두 개 있었어.'],
        ['¿Quién metió la primera carta del buzón nuevo?', 'La señora de la papelería', 'La profesora', 'Sofía', 'Mina dice 문구점 아주머니가 첫 편지를 벌써 넣으셨어요.'],
      ],
      consolidation: ['Completa: 뚜껑은 다 ___.', '고쳐졌어', '고쳤어', '고칠 거야', '고쳐지다 es la pasiva: la tapa «quedó arreglada», sin nombrar a quien la arregló.'],
      audit: { possibleDifficulties: ['pasiva 고쳐졌어 frente a activa 고쳤어', 'banmal entre los tres amigos y 해요체 hacia Yuna y Mina dentro de la misma escena'], continuity: 'Las diez estrellas que Byeol pintó en A2 ep. 19 pasan a doce por las dos que cerraban la carta de respuesta de A2 ep. 17; la letra que Yuna reconoce es la del episodio 15 de esta temporada.', pronunciationRisks: ['고쳐졌어', '넣으셨어요'], recommendedChanges: ['Byeol tutea a Sofía y trata de 씨 a Yuna en turnos consecutivos: el casting debe mantener las dos alturas.'] },
    }),
    ep({
      id: 'ko-b1-20-sae-byeol-kapeui-pyeonjiham', order: 20, title: '새 별 카페의 편지함', titleEs: 'El buzón del nuevo Café Estrella', duration: 53,
      characters: ['유나', '김 선생님', '문구점 주인', '소피아', '별', '미나'], location: '새 별 카페', objective: 'B1의 인용, 원인, 결과, 피동을 한 장면에서 통합한다.',
      grammar: ['B1 종합 복습', '-게 되다', '-기 때문에', '피동'],
      keywords: [{ target: '여덟 장', es: 'ocho cartas' }, { target: '놀랐어요', es: 'me sorprendí' }, { target: '남게 됐어요', es: 'acabé quedándome' }, { target: '벽', es: 'pared' }, { target: '걸었어요', es: 'colgué' }, { target: '시작해요', es: 'empezamos' }],
      storyFunction: '오 년의 이야기를 한 문장으로 묶고, 편지함을 다시 여는 장면으로 시즌을 닫는다.',
      turns: [
        { speaker: '유나', target: '오늘 새 별 카페가 문을 열어요. 모두 와 주셔서 정말 감사합니다.', es: 'Hoy abre el nuevo Café Estrella. Muchísimas gracias a todos por venir.', romanization: 'Oneul sae Byeol Kapega muneul yeoreoyo. Modu wa jusyeoseo jeongmal gamsahamnida.' },
        { speaker: '김 선생님', target: '학원 학생들도 편지를 여덟 장이나 써서 가지고 왔어요.', es: 'Los alumnos de la academia han traído nada menos que ocho cartas escritas.', romanization: 'Hagwon haksaengdeuldo pyeonjireul yeodeol jangina sseoseo gajigo wasseoyo.' },
        { speaker: '문구점 주인', target: '유나 씨가 오 년 전 제 편지를 아직 가지고 있다고 들었어요. 정말 놀랐어요.', es: 'Me han dicho que todavía guardas mi carta de hace cinco años. Me sorprendió mucho.', romanization: 'Yuna ssiga o nyeon jeon je pyeonjireul ajik gajigo itdago deureosseoyo. Jeongmal nollasseoyo.' },
        { speaker: '유나', target: '네. 그때 아주머니 편지 때문에 저는 서울에 남게 됐어요.', es: 'Sí. Por aquella carta suya acabé quedándome en Seúl.', romanization: 'Ne. Geuttae ajumeoni pyeonji ttaemune jeoneun Seoure namge dwaesseoyo.' },
        { speaker: '소피아', target: '저도 그래요. 첫 편지에 「잘하고 있어요」라고 쓰여 있었어요.', es: 'A mí me pasa igual. En mi primera carta estaba escrito «Lo estás haciendo bien».', romanization: 'Jeodo geuraeyo. Cheot pyeonjie "jalhago isseoyo"rago sseuyeo isseosseoyo.' },
        { speaker: '별', target: '벽에 지호 사진을 걸었어요. 편지함만 나왔지만 아주 멋있어요.', es: 'He colgado en la pared la foto de Jiho. Solo sale el buzón, pero queda genial.', romanization: 'Byeoge Jiho sajineul georeosseoyo. Pyeonjihamman nawatjiman aju meosisseoyo.' },
        { speaker: '미나', target: '콩이도 편지를 한 장 물고 왔어요. 다들 웃었어요.', es: 'Kong ha traído hasta una carta en la boca. Todos nos hemos reído.', romanization: 'Kongido pyeonjireul han jang mulgo wasseoyo. Dadeul useosseoyo.' },
        { speaker: '유나', target: '자, 이제 편지함을 다시 열어요. 오늘부터 조용히, 그리고 천천히 시작해요.', es: 'Venga, abramos otra vez el buzón. Desde hoy empezamos en silencio y despacio.', romanization: 'Ja, ije pyeonjihameul dasi yeoreoyo. Oneulbuteo joyonghi, geurigo cheoncheonhi sijakaeyo.' },
      ],
      gist: ['¿Cómo termina la temporada?', 'El buzón se reabre en el local nuevo, en silencio y despacio', 'El café cierra definitivamente', 'Yuna vende el buzón a un museo', 'El último turno es 이제 편지함을 다시 열어요. 조용히, 그리고 천천히 시작해요.'],
      details: [
        ['¿Cuántas cartas traen los alumnos de la academia?', 'Ocho', 'Dos', 'Veintitrés', 'La profesora dice 편지를 여덟 장이나 써서 가지고 왔어요.'],
        ['¿Qué sorprendió a la señora de la papelería?', 'Que Yuna aún guarde su carta de hace cinco años', 'Que el café haya cambiado de sitio', 'Que Yuna no la recordara', 'Dice 오 년 전 제 편지를 아직 가지고 있다고 들었어요. 정말 놀랐어요.'],
        ['¿Qué hay colgado en la pared?', 'La foto de Jiho, solo del buzón', 'El primer cartel de Byeol', 'La página del periódico con la cara de Yuna', 'Byeol dice 벽에 지호 사진을 걸었어요. 편지함만 나왔지만 아주 멋있어요.'],
      ],
      consolidation: ['Completa: 그때 아주머니 편지 ___ 저는 서울에 남게 됐어요.', '때문에', '대신에', '전에', 'Yuna nombra la causa: 편지 때문에. Las otras dos darían un sustituto o un momento anterior.'],
      audit: { possibleDifficulties: ['seis voces en ocho turnos, todas en 해요체 porque hay tres adultos delante', 'repaso sin gramática nueva: la dificultad está en la velocidad de los cambios de hablante'], continuity: 'Cierra el arco de las tres temporadas: la frase «잘하고 있어요» de la primera carta de A2 vuelve textual, la foto que causó el conflicto se sustituye por la que respeta el pacto, y la carta que Yuna dijo guardar todavía en el episodio 6 llega por fin a oídos de quien la escribió. Byeol y Sofía no se tutean aquí: hablan para toda la sala, con la profesora y la señora de la papelería delante.', pronunciationRisks: ['있다고 들었어요', '여덟 장이나'], recommendedChanges: ['Dejar una pausa clara antes del último turno de Yuna: es la frase que cierra la serie.'] },
    }),
  ],
}
