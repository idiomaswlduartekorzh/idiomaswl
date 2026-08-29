export type ListeningUi = {
  stages: string[]
  exercises: string
  completed: string
  block: string
  audioPreparing: string
  episode: string
  of: string
  prepare: string
  keywords: string
  keywordHelp: string
  ready: string
  firstListen: string
  firstHelp: string
  secondListen: string
  detailHelp: string
  discover: string
  discoverHelp: string
  showTranslation: string
  hideTranslation: string
  guided: string
  guidedHelp: string
  checkLearning: string
  consolidate: string
  consolidateHelp: string
  close: string
  readyToMove: string
  listenAgain: string
  remember: string
  markComplete: string
  nextAudio: string
  continue: string
  correct: string
  tryAgain: string
  audioError: string
  pause: string
  play: string
  resume: string
  rewind: string
  audioPosition: string
  speed: string
}

const english: ListeningUi = {
  stages: ['Get ready', 'Main idea', 'Details', 'Read', 'Listen with text', 'Check', 'Finish'],
  exercises: 'Listening exercises', completed: 'completed', block: 'Part', audioPreparing: 'Audio coming soon', episode: 'Episode', of: 'of',
  prepare: 'Get ready to listen', keywords: 'Words to help you listen', keywordHelp: 'Listen to the words. You do not need to know every word.', ready: 'I am ready to listen',
  firstListen: 'First listen · main idea', firstHelp: 'Listen. Find the topic, not every word.', secondListen: 'Second listen · details', detailHelp: 'Now find key information.',
  discover: 'Read the text', discoverHelp: 'Connect the sound and the words.', showTranslation: 'Show help in Spanish', hideTranslation: 'Hide Spanish help',
  guided: 'Listen with the text', guidedHelp: 'Follow the text while you listen.', checkLearning: 'Check my learning', consolidate: 'Check', consolidateHelp: 'Answer without the text.',
  close: 'Finish', readyToMove: 'Ready for the next episode', listenAgain: 'Listen one more time', remember: 'Remember', markComplete: 'Mark as complete', nextAudio: 'Next episode →', continue: 'Continue', correct: 'Correct.', tryAgain: 'Try again.',
  audioError: 'This audio cannot play. Refresh the page. If it still does not work, please tell us.', pause: 'Pause', play: 'Listen', resume: 'Continue listening', rewind: 'Go back five seconds', audioPosition: 'Audio position', speed: 'Playback speed',
}

const german: ListeningUi = {
  ...english, stages: ['Vorbereiten', 'Hauptidee', 'Details', 'Lesen', 'Mit Text hören', 'Prüfen', 'Ende'], exercises: 'Hörübung', completed: 'fertig', block: 'Teil', audioPreparing: 'Audio kommt bald', episode: 'Übung', of: 'von',
  prepare: 'Bereit zum Hören', keywords: 'Wörter zum Hören', keywordHelp: 'Höre die Wörter. Du musst nicht jedes Wort kennen.', ready: 'Ich bin bereit', firstListen: 'Erstes Hören · Hauptidee', firstHelp: 'Höre zu. Finde das Thema.', secondListen: 'Zweites Hören · Details', detailHelp: 'Finde wichtige Informationen.', discover: 'Text lesen', discoverHelp: 'Höre und lies.', showTranslation: 'Spanische Hilfe zeigen', hideTranslation: 'Spanische Hilfe ausblenden', guided: 'Mit Text hören', guidedHelp: 'Lies mit und höre.', checkLearning: 'Prüfen', consolidate: 'Prüfen', consolidateHelp: 'Antworte ohne Text.', close: 'Ende', readyToMove: 'Bereit für die nächste Übung', listenAgain: 'Höre noch einmal', remember: 'Merken', markComplete: 'Als fertig markieren', nextAudio: 'Nächste Übung →', continue: 'Weiter', correct: 'Richtig.', tryAgain: 'Noch einmal.', audioError: 'Dieses Audio kann nicht geladen werden. Bitte lade die Seite neu.', pause: 'Pause', play: 'Hören', resume: 'Weiterhören', rewind: 'Fünf Sekunden zurück', audioPosition: 'Audio-Position', speed: 'Geschwindigkeit',
}

const french: ListeningUi = {
  ...english, stages: ['Préparer', 'Idée générale', 'Détails', 'Lire', 'Écouter avec le texte', 'Vérifier', 'Fin'], exercises: 'Exercices d’écoute', completed: 'terminés', block: 'Partie', audioPreparing: 'Audio bientôt disponible', episode: 'Épisode', of: 'sur', prepare: 'Prépare-toi à écouter', keywords: 'Mots pour t’aider', keywordHelp: 'Écoute les mots. Tu ne dois pas comprendre tous les mots.', ready: 'Je suis prêt(e)', firstListen: 'Première écoute · idée générale', firstHelp: 'Écoute. Trouve le sujet.', secondListen: 'Deuxième écoute · détails', detailHelp: 'Trouve les informations importantes.', discover: 'Lire le texte', discoverHelp: 'Écoute et lis.', showTranslation: 'Voir l’aide en espagnol', hideTranslation: 'Cacher l’aide en espagnol', guided: 'Écouter avec le texte', guidedHelp: 'Lis pendant que tu écoutes.', checkLearning: 'Vérifier', consolidate: 'Vérifier', consolidateHelp: 'Réponds sans le texte.', close: 'Fin', readyToMove: 'Prêt(e) pour l’épisode suivant', listenAgain: 'Écoute encore une fois', remember: 'À retenir', markComplete: 'Marquer comme terminé', nextAudio: 'Épisode suivant →', continue: 'Continuer', correct: 'Correct.', tryAgain: 'Essaie encore.', audioError: 'Cet audio ne peut pas être chargé. Actualise la page.', pause: 'Pause', play: 'Écouter', resume: 'Continuer', rewind: 'Revenir de cinq secondes', audioPosition: 'Position de l’audio', speed: 'Vitesse de lecture',
}

const italian: ListeningUi = {
  ...english, stages: ['Preparati', 'Idea principale', 'Dettagli', 'Leggi', 'Ascolta con il testo', 'Controlla', 'Fine'], exercises: 'Esercizi di ascolto', completed: 'completati', block: 'Parte', audioPreparing: 'Audio in arrivo', episode: 'Episodio', of: 'di', prepare: 'Preparati ad ascoltare', keywords: 'Parole per aiutarti', keywordHelp: 'Ascolta le parole. Non devi capire ogni parola.', ready: 'Sono pronto/a', firstListen: 'Primo ascolto · idea principale', firstHelp: 'Ascolta. Trova il tema.', secondListen: 'Secondo ascolto · dettagli', detailHelp: 'Trova le informazioni importanti.', discover: 'Leggi il testo', discoverHelp: 'Ascolta e leggi.', showTranslation: 'Mostra aiuto in spagnolo', hideTranslation: 'Nascondi aiuto in spagnolo', guided: 'Ascolta con il testo', guidedHelp: 'Leggi mentre ascolti.', checkLearning: 'Controlla', consolidate: 'Controlla', consolidateHelp: 'Rispondi senza il testo.', close: 'Fine', readyToMove: 'Pronto/a per il prossimo episodio', listenAgain: 'Ascolta ancora', remember: 'Ricorda', markComplete: 'Segna come completato', nextAudio: 'Prossimo episodio →', continue: 'Continua', correct: 'Corretto.', tryAgain: 'Riprova.', audioError: 'Questo audio non può essere caricato. Aggiorna la pagina.', pause: 'Pausa', play: 'Ascolta', resume: 'Continua ad ascoltare', rewind: 'Indietro di cinque secondi', audioPosition: 'Posizione audio', speed: 'Velocità',
}

const portuguese: ListeningUi = {
  ...english, stages: ['Preparar', 'Ideia principal', 'Detalhes', 'Ler', 'Ouvir com texto', 'Verificar', 'Fim'], exercises: 'Exercícios de compreensão oral', completed: 'concluídos', block: 'Parte', audioPreparing: 'Áudio em breve', episode: 'Episódio', of: 'de', prepare: 'Prepare-se para ouvir', keywords: 'Palavras para ajudar', keywordHelp: 'Ouça as palavras. Você não precisa entender todas.', ready: 'Estou pronto/a', firstListen: 'Primeira escuta · ideia principal', firstHelp: 'Ouça. Encontre o tema.', secondListen: 'Segunda escuta · detalhes', detailHelp: 'Encontre as informações importantes.', discover: 'Ler o texto', discoverHelp: 'Ouça e leia.', showTranslation: 'Ver ajuda em espanhol', hideTranslation: 'Ocultar ajuda em espanhol', guided: 'Ouvir com texto', guidedHelp: 'Leia enquanto ouve.', checkLearning: 'Verificar', consolidate: 'Verificar', consolidateHelp: 'Responda sem o texto.', close: 'Fim', readyToMove: 'Pronto/a para o próximo episódio', listenAgain: 'Ouça mais uma vez', remember: 'Lembre-se', markComplete: 'Marcar como concluído', nextAudio: 'Próximo episódio →', continue: 'Continuar', correct: 'Correto.', tryAgain: 'Tente de novo.', audioError: 'Não foi possível carregar este áudio. Atualize a página.', pause: 'Pausar', play: 'Ouvir', resume: 'Continuar ouvindo', rewind: 'Voltar cinco segundos', audioPosition: 'Posição do áudio', speed: 'Velocidade',
}

const russian: ListeningUi = { ...english, stages: ['Подготовка', 'Главная мысль', 'Детали', 'Текст', 'С текстом', 'Проверка', 'Конец'], exercises: 'Упражнения на аудирование', completed: 'готово', block: 'Часть', audioPreparing: 'Аудио скоро будет', episode: 'Упражнение', of: 'из', prepare: 'Подготовьтесь к аудированию', keywords: 'Полезные слова', keywordHelp: 'Послушайте слова. Не нужно понимать каждое слово.', ready: 'Я готов/готова', firstListen: 'Первое аудирование · главная мысль', firstHelp: 'Слушайте. Найдите тему.', secondListen: 'Второе аудирование · детали', detailHelp: 'Найдите важную информацию.', discover: 'Прочитать текст', discoverHelp: 'Слушайте и читайте.', showTranslation: 'Показать помощь на испанском', hideTranslation: 'Скрыть помощь на испанском', guided: 'Слушать с текстом', guidedHelp: 'Читайте и слушайте.', checkLearning: 'Проверить', consolidate: 'Проверить', consolidateHelp: 'Ответьте без текста.', close: 'Конец', readyToMove: 'Готово к следующему упражнению', listenAgain: 'Послушайте ещё раз', remember: 'Запомните', markComplete: 'Отметить как готовое', nextAudio: 'Следующее упражнение →', continue: 'Продолжить', correct: 'Верно.', tryAgain: 'Попробуйте ещё раз.', audioError: 'Не удалось загрузить аудио. Обновите страницу.', pause: 'Пауза', play: 'Слушать', resume: 'Продолжить', rewind: 'Назад на пять секунд', audioPosition: 'Позиция аудио', speed: 'Скорость', }

const korean: ListeningUi = { ...english, stages: ['준비', '전체 내용', '자세히', '글 읽기', '글과 함께 듣기', '확인', '마침'], exercises: '듣기 연습', completed: '완료', block: '부분', audioPreparing: '오디오 준비 중', episode: '문제', of: '중', prepare: '듣기 준비', keywords: '듣기에 도움 되는 단어', keywordHelp: '단어를 들어 보세요. 모든 단어를 알 필요는 없어요.', ready: '들을 준비가 됐어요', firstListen: '첫 번째 듣기 · 전체 내용', firstHelp: '들어 보세요. 주제를 찾으세요.', secondListen: '두 번째 듣기 · 자세히', detailHelp: '중요한 정보를 찾으세요.', discover: '글 읽기', discoverHelp: '듣고 읽으세요.', showTranslation: '스페인어 도움 보기', hideTranslation: '스페인어 도움 숨기기', guided: '글과 함께 듣기', guidedHelp: '듣는 동안 읽으세요.', checkLearning: '확인하기', consolidate: '확인하기', consolidateHelp: '글을 보지 않고 답하세요.', close: '마침', readyToMove: '다음 문제 준비 완료', listenAgain: '다시 듣기', remember: '기억하기', markComplete: '완료 표시', nextAudio: '다음 문제 →', continue: '계속', correct: '맞아요.', tryAgain: '다시 해 보세요.', audioError: '오디오를 불러올 수 없어요. 페이지를 새로 고침하세요.', pause: '일시 정지', play: '듣기', resume: '계속 듣기', rewind: '5초 뒤로', audioPosition: '오디오 위치', speed: '재생 속도', }

const japanese: ListeningUi = { ...english, stages: ['準備', '全体', '詳しく', '読む', '文と聞く', '確認', '終わり'], exercises: '聞く練習', completed: '完了', block: 'パート', audioPreparing: '音声準備中', episode: '問題', of: '中', prepare: '聞く準備', keywords: '聞くための言葉', keywordHelp: '言葉を聞きましょう。全部の言葉を知る必要はありません。', ready: '聞く準備ができました', firstListen: '一回目 · 全体', firstHelp: '聞いてください。テーマを見つけましょう。', secondListen: '二回目 · 詳しく', detailHelp: '大切な情報を見つけましょう。', discover: '文を読む', discoverHelp: '聞いて、読んでください。', showTranslation: 'スペイン語のヒントを見る', hideTranslation: 'スペイン語のヒントを隠す', guided: '文と聞く', guidedHelp: '聞きながら読んでください。', checkLearning: '確認する', consolidate: '確認する', consolidateHelp: '文を見ないで答えてください。', close: '終わり', readyToMove: '次の問題の準備ができました', listenAgain: 'もう一度聞く', remember: '覚えましょう', markComplete: '完了にする', nextAudio: '次の問題へ →', continue: '続ける', correct: '正解です。', tryAgain: 'もう一度。', audioError: '音声を読み込めません。ページを更新してください。', pause: '一時停止', play: '聞く', resume: '続けて聞く', rewind: '5秒戻る', audioPosition: '音声の位置', speed: '再生速度', }

export function listeningUi(speechLang: string): ListeningUi {
  const language = speechLang.split('-')[0]
  return ({ de: german, fr: french, it: italian, pt: portuguese, ru: russian, ko: korean, ja: japanese, en: english } as Record<string, ListeningUi>)[language] ?? english
}
