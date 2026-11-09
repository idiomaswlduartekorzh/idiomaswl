/** Editorial prompts and discourse moves for advanced improvised speaking. */
export const advancedModeNamesEs = {
  b2: ['Pros y contras', 'Un conflicto', 'Lo que viene'],
  c1: ['Los supuestos', 'Dos perspectivas', 'Efectos imprevistos'],
  c2: ['La premisa oculta', 'Dos lecturas', 'Una conclusión matizada'],
}
export const advancedModeNames = {
  ingles: { b2: ['Pros and cons', 'A conflict', 'The next decade'], c1: ['Assumptions', 'Two perspectives', 'Unintended effects'], c2: ['A hidden premise', 'Two interpretations', 'A nuanced conclusion'] },
  frances: { b2: ['Pour et contre', 'Un conflit', 'La décennie à venir'], c1: ['Les présupposés', 'Deux perspectives', 'Les effets imprévus'], c2: ['Une prémisse cachée', 'Deux lectures', 'Une conclusion nuancée'] },
  aleman: { b2: ['Vor- und Nachteile', 'Ein Konflikt', 'Das nächste Jahrzehnt'], c1: ['Annahmen', 'Zwei Sichtweisen', 'Unbeabsichtigte Folgen'], c2: ['Eine verborgene Prämisse', 'Zwei Deutungen', 'Ein differenziertes Fazit'] },
  italiano: { b2: ['Pro e contro', 'Un conflitto', 'Il prossimo decennio'], c1: ['I presupposti', 'Due prospettive', 'Effetti imprevisti'], c2: ['Una premessa nascosta', 'Due letture', 'Una conclusione sfumata'] },
  portugues: { b2: ['Prós e contras', 'Um conflito', 'A próxima década'], c1: ['Os pressupostos', 'Duas perspectivas', 'Efeitos imprevistos'], c2: ['Uma premissa oculta', 'Duas leituras', 'Uma conclusão ponderada'] },
  ruso: { b2: ['За и против', 'Конфликт', 'Следующее десятилетие'], c1: ['Предположения', 'Две позиции', 'Неожиданные последствия'], c2: ['Скрытая предпосылка', 'Две интерпретации', 'Взвешенный вывод'] },
  japones: { b2: ['長所と短所', '対立', 'これからの十年'], c1: ['前提', '二つの視点', '予期しない影響'], c2: ['隠れた前提', '二つの解釈', '慎重な結論'] },
  coreano: { b2: ['장점과 단점', '갈등', '앞으로의 10년'], c1: ['전제', '두 관점', '예상 밖의 결과'], c2: ['숨은 전제', '두 해석', '섬세한 결론'] },
}

export const advancedFocus = {
  b2: { es: 'Sostén una opinión con un ejemplo y un contraste.', en: 'Support an opinion with an example and a contrast.', fr: 'Appuie ton avis sur un exemple et un contraste.', de: 'Begründe deine Meinung mit einem Beispiel und einem Gegensatz.', it: 'Sostieni la tua opinione con un esempio e un contrasto.', pt: 'Defenda sua opinião com um exemplo e um contraste.', ru: 'Подкрепи своё мнение примером и противопоставлением.', ja: '例と対比を使って意見を述べてください。', ko: '예시와 대비를 들어 의견을 뒷받침해 보세요.' },
  c1: { es: 'Examina un supuesto, concede un matiz y explica una consecuencia.', en: 'Examine an assumption, concede a nuance, and explain a consequence.', fr: 'Examine un présupposé, apporte une nuance et explique une conséquence.', de: 'Prüfe eine Annahme, räume eine Nuance ein und erkläre eine Folge.', it: 'Esamina un presupposto, ammetti una sfumatura e spiega una conseguenza.', pt: 'Examine um pressuposto, reconheça uma nuance e explique uma consequência.', ru: 'Рассмотри предположение, признай нюанс и объясни последствие.', ja: '前提を検討し、別の側面を認め、結果を説明してください。', ko: '전제를 검토하고 다른 면도 인정한 뒤 결과를 설명해 보세요.' },
  c2: { es: 'Cuestiona una premisa, integra una objeción fuerte y formula una conclusión precisa.', en: 'Challenge a premise, incorporate a strong objection, and reach a precise conclusion.', fr: 'Remets en cause une prémisse, intègre une objection forte et formule une conclusion précise.', de: 'Hinterfrage eine Prämisse, berücksichtige einen starken Einwand und formuliere ein genaues Fazit.', it: 'Metti in discussione una premessa, affronta una forte obiezione e formula una conclusione precisa.', pt: 'Questione uma premissa, incorpore uma forte objeção e formule uma conclusão precisa.', ru: 'Оспорь предпосылку, учти сильное возражение и сформулируй точный вывод.', ja: '前提を問い直し、強い反論を踏まえて、正確な結論を述べてください。', ko: '전제에 의문을 제기하고 강한 반론을 반영해 정확한 결론을 내리세요.' },
}

const split = (value) => value.split('|')
export const advancedTermGlosses = {
  b2: split('sin embargo|en cambio|a pesar de ello|como resultado|siempre que|mientras que|hasta cierto punto|además|a largo plazo|por ejemplo'),
  c1: split('se podría argumentar|en términos generales|no obstante|aunque|a la luz de|considerándolo todo|dicho de otro modo|desde una perspectiva más amplia|un ejemplo claro|bajo ciertas circunstancias'),
  c2: split('sea como fuere|por la misma razón|sin perjuicio de lo anterior|a primera vista|a todos los efectos|sin ambigüedad|un arma de doble filo|el meollo de la cuestión|en última instancia|con la perspectiva del tiempo'),
}
export const advancedTerms = {
  ingles: {
    b2: split('nevertheless|by contrast|despite that|as a result|provided that|whereas|to some extent|furthermore|in the long run|for instance'),
    c1: split('arguably|by and large|notwithstanding|albeit|in light of|all things considered|to put it differently|from a broader perspective|a case in point|under certain circumstances'),
    c2: split('be that as it may|by the same token|notwithstanding the foregoing|at face value|to all intents and purposes|in no uncertain terms|a double-edged sword|the crux of the matter|in the final analysis|with hindsight'),
  },
  frances: {
    b2: split('néanmoins|en revanche|malgré cela|par conséquent|à condition que|tandis que|dans une certaine mesure|de plus|à long terme|par exemple'),
    c1: split('on pourrait soutenir que|dans l’ensemble|cela étant|bien que|à la lumière de|tout bien considéré|autrement dit|dans une perspective plus large|un exemple révélateur|dans certaines circonstances'),
    c2: split('quoi qu’il en soit|dans le même ordre d’idées|sans préjudice de ce qui précède|à première vue|à toutes fins utiles|sans aucune ambiguïté|une arme à double tranchant|le cœur du problème|en dernière analyse|avec le recul'),
  },
  aleman: {
    b2: split('dennoch|im Gegensatz dazu|trotzdem|infolgedessen|vorausgesetzt, dass|während|bis zu einem gewissen Grad|außerdem|langfristig|beispielsweise'),
    c1: split('man könnte argumentieren, dass|im Großen und Ganzen|nichtsdestotrotz|wenn auch|im Lichte von|alles in allem|anders ausgedrückt|aus einer breiteren Perspektive|ein anschauliches Beispiel|unter bestimmten Umständen'),
    c2: split('wie dem auch sei|aus demselben Grund|ungeachtet des Vorstehenden|auf den ersten Blick|für alle praktischen Zwecke|unmissverständlich|ein zweischneidiges Schwert|der Kern der Sache|letztlich|im Rückblick'),
  },
  italiano: {
    b2: split('tuttavia|al contrario|nonostante ciò|di conseguenza|a condizione che|mentre|in una certa misura|inoltre|a lungo termine|per esempio'),
    c1: split('si potrebbe sostenere che|nel complesso|ciononostante|sebbene|alla luce di|tutto sommato|in altre parole|da una prospettiva più ampia|un caso emblematico|in determinate circostanze'),
    c2: split('comunque sia|per lo stesso motivo|fermo restando quanto detto|a prima vista|a tutti gli effetti|senza mezzi termini|un’arma a doppio taglio|il nocciolo della questione|in ultima analisi|col senno di poi'),
  },
  portugues: {
    b2: split('no entanto|em contrapartida|apesar disso|como resultado|desde que|enquanto|até certo ponto|além disso|a longo prazo|por exemplo'),
    c1: split('pode-se argumentar que|de modo geral|não obstante|embora|à luz de|considerando tudo|em outras palavras|de uma perspectiva mais ampla|um exemplo revelador|em certas circunstâncias'),
    c2: split('seja como for|pela mesma razão|sem prejuízo do exposto|à primeira vista|para todos os efeitos|sem margem para dúvidas|uma faca de dois gumes|o cerne da questão|em última análise|em retrospectiva'),
  },
  ruso: {
    b2: split('тем не менее|напротив|несмотря на это|в результате|при условии, что|тогда как|в некоторой степени|кроме того|в долгосрочной перспективе|например'),
    c1: split('можно утверждать, что|в целом|невзирая на это|хотя и|в свете|учитывая всё|иными словами|с более широкой точки зрения|показательный пример|при определённых обстоятельствах'),
    c2: split('как бы то ни было|по той же причине|не умаляя сказанного|на первый взгляд|во всех практических смыслах|совершенно недвусмысленно|палка о двух концах|суть вопроса|в конечном счёте|задним числом'),
  },
  japones: {
    b2: split('それにもかかわらず|それに対して|それでも|その結果|という条件で|一方で|ある程度|さらに|長期的には|例えば'),
    c1: split('と言えるかもしれない|概して|それでもなお|とはいえ|を踏まえると|全体を考慮すると|言い換えれば|より広い視点から見れば|その好例が|一定の条件下では'),
    c2: split('いずれにせよ|同じ理由で|以上を踏まえても|一見すると|実質的には|明確に言えば|諸刃の剣|問題の核心|最終的な分析では|振り返ってみると'),
  },
  coreano: {
    b2: split('그럼에도 불구하고|반면에|그런데도|그 결과|라는 조건에서|한편|어느 정도|게다가|장기적으로|예를 들어'),
    c1: split('라고 주장할 수 있다|대체로|그렇기는 하지만|비록 그렇더라도|에 비추어 보면|모든 것을 고려하면|다시 말하면|더 넓은 관점에서 보면|그 대표적인 예가|특정한 상황에서는'),
    c2: split('그렇다 하더라도|같은 맥락에서|앞서 말한 바를 전제로 해도|겉으로 보기에는|실질적으로는|명확히 말해서|양날의 검|문제의 핵심|결국에는|돌이켜 보면'),
  },
}
export const advancedCategory = {
  b2: { es: 'Conector', en: 'Linking phrase', fr: 'Connecteur', de: 'Verknüpfung', it: 'Connettivo', pt: 'Conector', ru: 'Связка', ja: '接続表現', ko: '연결 표현' },
  c1: { es: 'Matiz', en: 'Nuance', fr: 'Nuance', de: 'Nuance', it: 'Sfumatura', pt: 'Nuance', ru: 'Нюанс', ja: 'ニュアンス', ko: '뉘앙스' },
  c2: { es: 'Recurso retórico', en: 'Rhetorical move', fr: 'Procédé rhétorique', de: 'Rhetorisches Mittel', it: 'Risorsa retorica', pt: 'Recurso retórico', ru: 'Риторический приём', ja: '修辞表現', ko: '수사적 표현' },
}
