/** Concrete situations for every generated speaking question. Order matches the published vocabulary sets. */
const rows = (value) => value.trim().split('\n').map((line) => line.trim())
const pairs = (value) => rows(value).map((line) => {
  const [choice, claim] = line.split(' | ')
  if (!choice || !claim) throw Error(`Incomplete speaking situation: ${line}`)
  return { choice, claim }
})

export const everydaySubjects = {
  ingles: {
    a1: rows(`a person in your family
numbers you use every morning
your bedroom
your breakfast
your favorite clothes
the street where you live
your morning routine
how you feel today
your school or workplace`),
    a2: rows(`looking for a new apartment
choosing a restaurant for a friend
preparing for a job interview
fixing a phone that stopped working
planning a weekend with a friend
meeting a new classmate
returning a damaged product
catching a delayed train
changing plans because of heavy rain
making a doctor's appointment`),
    b1: rows(`a colleague repeatedly missing deadlines
your personal data being shared without permission
a friend ignoring persistent symptoms
plastic waste in your neighborhood
a trip cancelled at the last minute
a new student being left out of a group
an online course with no teacher feedback
a misunderstanding between close friends`),
  },
  frances: {
    a1: rows(`une personne de ta famille
ta couleur préférée
ton petit-déjeuner
ta chambre
les nombres que tu utilises chaque jour
une rue près de chez toi`),
    a2: rows(`prendre un train en retard
préparer un entretien d’embauche
rapporter un produit abîmé au magasin
prendre un rendez-vous médical
rencontrer un nouveau camarade
choisir un restaurant pour un ami
réparer un téléphone en panne
changer ses projets à cause de la pluie`),
    b1: rows(`un collègue qui manque souvent les délais
la diffusion de tes données personnelles sans autorisation
un ami qui ignore des symptômes persistants
les déchets plastiques dans ton quartier
un voyage annulé au dernier moment
un nouvel élève exclu d’un groupe
un cours en ligne sans retour du professeur
un malentendu entre amis proches`),
  },
  aleman: {
    a1: rows(`eine Person aus deiner Familie
Zahlen, die du jeden Morgen benutzt
dein Lieblingsessen
die Farbe deiner Kleidung
dein Zimmer
dein Morgenablauf`),
    a2: rows(`einen verspäteten Zug nehmen
ein Vorstellungsgespräch vorbereiten
ein beschädigtes Produkt zurückgeben
einen Arzttermin vereinbaren
einen neuen Mitschüler kennenlernen
ein Restaurant für einen Freund auswählen
ein kaputtes Handy reparieren
Pläne wegen starken Regens ändern`),
    b1: rows(`ein Kollege, der häufig Fristen verpasst
die Weitergabe deiner persönlichen Daten ohne Erlaubnis
ein Freund, der anhaltende Symptome ignoriert
Plastikmüll in deiner Nachbarschaft
eine Reise, die kurzfristig abgesagt wird
ein neuer Schüler, der aus einer Gruppe ausgeschlossen wird
ein Onlinekurs ohne Rückmeldung der Lehrkraft
ein Missverständnis zwischen engen Freunden`),
  },
  italiano: {
    a1: rows(`una persona della tua famiglia
il tuo colore preferito
la tua colazione
il tuo giorno preferito della settimana
come ti senti oggi
i numeri che usi ogni giorno
la tua camera
un animale che ti piace`),
    a2: rows(`prendere un treno in ritardo
preparare un colloquio di lavoro
restituire un prodotto danneggiato
prenotare una visita medica
conoscere un nuovo compagno di classe
organizzare una stanza per un ospite
riparare un telefono che non funziona
cambiare programma per la pioggia`),
    b1: rows(`un collega che non rispetta spesso le scadenze
la condivisione dei tuoi dati personali senza permesso
un amico che ignora sintomi persistenti
i rifiuti di plastica nel tuo quartiere
un viaggio annullato all’ultimo momento
un nuovo studente escluso da un gruppo
un corso online senza commenti dell’insegnante
un malinteso tra amici stretti`),
  },
  portugues: {
    a1: rows(`uma pessoa da sua família
sua cor favorita
seu café da manhã
uma rua perto da sua casa
os números que você usa todos os dias
como você se sente hoje`),
    a2: rows(`pegar um trem atrasado
preparar uma entrevista de emprego
devolver um produto com defeito
marcar uma consulta médica
conhecer um colega novo
escolher um restaurante para um amigo
consertar um celular que parou de funcionar
mudar os planos por causa da chuva`),
    b1: rows(`um colega que perde prazos repetidamente
o compartilhamento dos seus dados pessoais sem permissão
um amigo que ignora sintomas persistentes
o lixo plástico no seu bairro
uma viagem cancelada na última hora
um aluno novo excluído de um grupo
um curso online sem retorno do professor
um mal-entendido entre amigos próximos`),
  },
  ruso: {
    a1: rows(`человек из твоей семьи
твой любимый цвет
твой завтрак
твой любимый день недели
твоё самочувствие сегодня
числа, которыми ты пользуешься каждый день
твоя комната
твоя любимая одежда`),
    a2: rows(`поездка на задержавшемся поезде
подготовка к собеседованию
возврат бракованного товара
запись на приём к врачу
знакомство с новым одноклассником
подготовка комнаты для гостя
починка сломанного телефона
изменение планов из-за сильного дождя`),
    b1: rows(`коллега, который часто срывает сроки
передача твоих личных данных без разрешения
друг, который игнорирует постоянные симптомы
пластиковый мусор в твоём районе
поездка, отменённая в последнюю минуту
новый ученик, которого не принимают в группу
онлайн-курс без обратной связи от преподавателя
недоразумение между близкими друзьями`),
  },
  japones: {
    a1: rows(`家族の一人
好きな色
いつもの朝ごはん
好きな曜日
よく行く場所
毎日使う数字
自分の部屋
今日の気持ち`),
    a2: rows(`遅れた電車に乗ること
仕事の面接の準備
壊れた商品を店に返すこと
病院の予約を取ること
新しいクラスメートとの出会い
お客さんのために部屋を整えること
故障したスマートフォンの修理
大雨で予定を変えること`),
    b1: rows(`何度も締め切りを守らない同僚
許可なく共有された自分の個人情報
症状が続いているのに病院へ行かない友人
近所に増えているプラスチックごみ
直前に中止になった旅行
グループから仲間外れにされた新入生
先生からの返事がないオンライン授業
親しい友人との誤解`),
  },
  coreano: {
    a1: rows(`가족 중 한 사람
좋아하는 색
평소 먹는 아침 식사
가장 좋아하는 요일
자주 가는 장소
매일 사용하는 숫자
내 방
오늘의 기분`),
    a2: rows(`지연된 기차를 타는 일
취업 면접을 준비하는 일
고장 난 물건을 가게에 반품하는 일
병원 진료를 예약하는 일
새 반 친구를 만나는 일
손님을 위해 방을 준비하는 일
고장 난 휴대전화를 고치는 일
큰비 때문에 계획을 바꾸는 일`),
    b1: rows(`마감일을 자주 지키지 않는 동료
허락 없이 공유된 내 개인정보
계속되는 증상을 무시하는 친구
동네에 쌓이는 플라스틱 쓰레기
마지막 순간에 취소된 여행
모임에서 따돌림받는 신입생
교사의 피드백이 없는 온라인 수업
친한 친구 사이의 오해`),
  },
}

/** Spanish support is visible only for Russian, Japanese and Korean. */
export const everydaySubjectsEs = {
  ruso: {
    a1: rows(`una persona de tu familia|tu color favorito|tu desayuno|tu día favorito de la semana|cómo te sientes hoy|los números que usas cada día|tu habitación|tu ropa favorita`.replaceAll('|', '\n')),
    a2: rows(`tomar un tren con retraso|preparar una entrevista de trabajo|devolver un producto defectuoso|pedir una cita médica|conocer a un compañero nuevo|preparar una habitación para un invitado|arreglar un teléfono dañado|cambiar planes por una lluvia fuerte`.replaceAll('|', '\n')),
    b1: rows(`un colega que incumple los plazos|la divulgación de tus datos sin permiso|un amigo que ignora síntomas persistentes|los residuos plásticos del barrio|un viaje cancelado a última hora|un alumno nuevo excluido del grupo|un curso virtual sin comentarios del profesor|un malentendido entre amigos cercanos`.replaceAll('|', '\n')),
  },
  japones: {
    a1: rows(`una persona de tu familia|tu color favorito|tu desayuno habitual|tu día favorito de la semana|un lugar que visitas a menudo|los números que usas cada día|tu habitación|cómo te sientes hoy`.replaceAll('|', '\n')),
    a2: rows(`tomar un tren con retraso|preparar una entrevista de trabajo|devolver un producto dañado|pedir una cita médica|conocer a un compañero nuevo|preparar una habitación para un invitado|arreglar un teléfono dañado|cambiar planes por una lluvia fuerte`.replaceAll('|', '\n')),
    b1: rows(`un colega que incumple los plazos|la divulgación de tus datos sin permiso|un amigo que ignora síntomas persistentes|los residuos plásticos del barrio|un viaje cancelado a última hora|un alumno nuevo excluido del grupo|un curso virtual sin comentarios del profesor|un malentendido entre amigos cercanos`.replaceAll('|', '\n')),
  },
  coreano: {
    a1: rows(`una persona de tu familia|tu color favorito|tu desayuno habitual|tu día favorito de la semana|un lugar que visitas a menudo|los números que usas cada día|tu habitación|cómo te sientes hoy`.replaceAll('|', '\n')),
    a2: rows(`tomar un tren con retraso|preparar una entrevista de trabajo|devolver un producto dañado|pedir una cita médica|conocer a un compañero nuevo|preparar una habitación para un invitado|arreglar un teléfono dañado|cambiar planes por una lluvia fuerte`.replaceAll('|', '\n')),
    b1: rows(`un colega que incumple los plazos|la divulgación de tus datos sin permiso|un amigo que ignora síntomas persistentes|los residuos plásticos del barrio|un viaje cancelado a última hora|un alumno nuevo excluido del grupo|un curso virtual sin comentarios del profesor|un malentendido entre amigos cercanos`.replaceAll('|', '\n')),
  },
}

export const advancedSituations = {
  ingles: pairs(`allowing employees to work remotely four days a week | remote work always improves productivity
letting AI grade students' essays | AI grades writing more fairly than teachers do
replacing routine doctor visits with video consultations | video consultations offer the same quality of care as in-person visits
replacing city buses with electric buses | electric buses always reduce a city's total environmental impact
limiting daily visitors to famous landmarks | visitor limits benefit both residents and local businesses
giving every adult a basic income | a basic income makes people less willing to work
replacing homework with group projects | group projects teach more than individual homework
using dating apps to seek a long-term partner | having more matches leads to stronger relationships`),
  frances: pairs(`permettre aux salariés de travailler à distance quatre jours par semaine | le télétravail améliore toujours la productivité
confier la correction des rédactions scolaires à une IA | une IA corrige les rédactions plus équitablement qu'un professeur
remplacer les consultations médicales courantes par des consultations vidéo | les consultations vidéo offrent la même qualité de soins qu'une visite en cabinet
remplacer les bus urbains par des bus électriques | les bus électriques réduisent toujours l'impact environnemental total d'une ville
limiter le nombre de visiteurs quotidiens dans les sites célèbres | ces limites profitent à la fois aux habitants et aux commerces locaux
verser un revenu de base à chaque adulte | un revenu de base décourage nécessairement le travail
remplacer les devoirs par des projets de groupe | les projets de groupe apprennent davantage que les devoirs individuels
utiliser des applications de rencontre pour chercher une relation durable | un plus grand nombre de rencontres mène à des relations plus solides`),
  aleman: pairs(`Beschäftigten vier Tage pro Woche Homeoffice erlauben | Homeoffice steigert immer die Produktivität
Schüleraufsätze von KI bewerten lassen | KI bewertet Aufsätze gerechter als Lehrkräfte
regelmäßige Arztbesuche durch Videosprechstunden ersetzen | Videosprechstunden bieten dieselbe Behandlungsqualität wie persönliche Termine
Stadtbusse durch Elektrobusse ersetzen | Elektrobusse verringern immer die gesamte Umweltbelastung einer Stadt
die täglichen Besucherzahlen berühmter Sehenswürdigkeiten begrenzen | solche Grenzen nützen sowohl Anwohnern als auch lokalen Geschäften
allen Erwachsenen ein Grundeinkommen zahlen | ein Grundeinkommen macht Menschen weniger arbeitsbereit
Hausaufgaben durch Gruppenprojekte ersetzen | Gruppenprojekte vermitteln mehr als individuelle Hausaufgaben
Dating-Apps für die Suche nach einer festen Beziehung nutzen | mehr Kontakte führen zu stabileren Beziehungen`),
  italiano: pairs(`permettere ai dipendenti di lavorare da casa quattro giorni alla settimana | il lavoro da remoto aumenta sempre la produttività
affidare a un'IA la valutazione dei temi degli studenti | un'IA valuta i temi in modo più equo degli insegnanti
sostituire le visite mediche ordinarie con videoconsulti | i videoconsulti offrono la stessa qualità delle visite di persona
sostituire gli autobus urbani con autobus elettrici | gli autobus elettrici riducono sempre l'impatto ambientale totale di una città
limitare i visitatori giornalieri dei luoghi famosi | i limiti favoriscono sia i residenti sia le attività locali
garantire un reddito di base a ogni adulto | un reddito di base riduce sempre la voglia di lavorare
sostituire i compiti con progetti di gruppo | i progetti di gruppo insegnano più dei compiti individuali
usare le app di incontri per cercare una relazione stabile | più incontri portano a relazioni più solide`),
  portugues: pairs(`permitir que os funcionários trabalhem de casa quatro dias por semana | o trabalho remoto sempre aumenta a produtividade
deixar uma IA corrigir as redações dos estudantes | uma IA corrige redações com mais justiça do que os professores
trocar consultas médicas de rotina por videochamadas | consultas por vídeo oferecem a mesma qualidade de atendimento que as presenciais
substituir ônibus urbanos por ônibus elétricos | ônibus elétricos sempre reduzem o impacto ambiental total de uma cidade
limitar o número diário de visitantes em pontos turísticos famosos | os limites beneficiam moradores e comerciantes locais
oferecer uma renda básica a todos os adultos | uma renda básica sempre diminui a vontade de trabalhar
trocar a lição de casa por projetos em grupo | projetos em grupo ensinam mais do que tarefas individuais
usar aplicativos de namoro para buscar um relacionamento duradouro | mais encontros levam a relacionamentos mais fortes`),
  ruso: pairs(`разрешить сотрудникам работать из дома четыре дня в неделю | удалённая работа всегда повышает производительность
поручить ИИ оценивать школьные сочинения | ИИ оценивает сочинения справедливее учителей
заменить обычные визиты к врачу видеоконсультациями | видеоконсультации обеспечивают такое же качество помощи, как личный приём
заменить городские автобусы электробусами | электробусы всегда уменьшают общий вред городской среде
ограничить число посетителей известных достопримечательностей | ограничения выгодны и жителям, и местному бизнесу
выплачивать каждому взрослому базовый доход | базовый доход неизбежно снижает желание работать
заменить домашние задания групповыми проектами | групповые проекты учат лучше индивидуальных заданий
искать постоянного партнёра через приложения для знакомств | больше знакомств ведёт к более прочным отношениям`),
  japones: pairs(`従業員が週に四日間在宅勤務できるようにすること | 在宅勤務は必ず生産性を高める
生徒の作文をAIに採点させること | AIは教師より公平に作文を採点する
通常の診察をオンライン診療に置き換えること | オンライン診療でも対面診療と同じ質の医療を受けられる
市内のバスを電気バスに替えること | 電気バスは都市全体の環境負荷を必ず減らす
有名な観光地の一日当たりの訪問者数を制限すること | 訪問者数の制限は住民と地元の店の両方に利益をもたらす
すべての成人にベーシックインカムを支給すること | ベーシックインカムを受け取ると働く意欲が必ず下がる
宿題をグループ課題に置き換えること | グループ課題のほうが個人の宿題より多く学べる
長期的な交際相手を探すためにマッチングアプリを使うこと | 出会いの数が増えれば関係はより長続きする`),
  coreano: pairs(`직원에게 일주일에 나흘간 재택근무를 허용하는 것 | 재택근무는 항상 생산성을 높인다
학생의 글을 AI가 채점하게 하는 것 | AI는 교사보다 글을 더 공정하게 채점한다
일반 진료를 화상 진료로 대체하는 것 | 화상 진료는 대면 진료와 같은 수준의 치료를 제공한다
시내버스를 전기버스로 교체하는 것 | 전기버스는 도시 전체의 환경 부담을 항상 줄인다
유명 관광지의 하루 방문객 수를 제한하는 것 | 방문객 제한은 주민과 지역 상인 모두에게 도움이 된다
모든 성인에게 기본소득을 지급하는 것 | 기본소득은 일할 의욕을 반드시 떨어뜨린다
숙제를 모둠 과제로 대체하는 것 | 모둠 과제는 개인 숙제보다 더 많은 것을 가르친다
장기적인 관계를 위해 데이팅 앱을 사용하는 것 | 만남이 많을수록 관계가 더 오래 지속된다`),
}

export const advancedSituationsEs = pairs(`permitir que los empleados trabajen desde casa cuatro días por semana | el trabajo remoto siempre aumenta la productividad
dejar que una IA califique las redacciones escolares | la IA califica las redacciones con más justicia que los docentes
sustituir las consultas médicas rutinarias por videollamadas | una videollamada ofrece la misma calidad de atención que una consulta presencial
sustituir los buses urbanos por buses eléctricos | los buses eléctricos siempre reducen el impacto ambiental total de una ciudad
limitar la cantidad diaria de visitantes en lugares turísticos famosos | los límites benefician tanto a los residentes como a los negocios locales
dar un ingreso básico a todas las personas adultas | el ingreso básico necesariamente reduce las ganas de trabajar
sustituir las tareas por proyectos en grupo | los proyectos en grupo enseñan más que las tareas individuales
usar aplicaciones de citas para buscar una relación estable | tener más citas produce relaciones más sólidas`)

const fill = (template, context) => template.replaceAll('{subject}', context.subject ?? '').replaceAll('{choice}', context.choice ?? '').replaceAll('{claim}', context.claim ?? '')

export const questionFrames = {
  ingles: {
    a1: ['Think about {subject}. What two simple details can you give?', 'What do you like or dislike about {subject}? Give one reason.', 'Give an everyday example related to {subject}. When does it come up?', 'How would you describe {subject} to a friend?'],
    a2: ['Tell a short story about {subject}. What happened?', 'Imagine this situation: {subject}. What would you do first?', 'Imagine this situation: {subject}. Name two ways to respond. Which would you choose?'],
    b1: ['How would you deal with {subject}, and why?', 'Why might people disagree about {subject}? What is your view?', 'What concrete change could help with {subject}, and who would benefit?'],
    b2: ['Consider this decision: {choice}. What are its main advantages and disadvantages?', 'Two people disagree about {choice}. What might each say, and how would you resolve their disagreement?', 'If {choice} became common, how might its effects change over the next decade?'],
    c1: ['Consider the claim: {claim}. Which assumption supports it, and how could you test that assumption?', 'How would you reconcile the views of people who support and oppose {choice}?', 'If {choice} became widespread, what unintended consequence could follow?'],
    c2: ['Consider the claim: {claim}. Identify a hidden premise and challenge it with a counterexample.', 'Name one plausible finding about {choice}. How could two groups interpret that same finding differently?', 'A critic says {choice} causes more harm than good. What nuanced conclusion would answer that objection?'],
  },
  frances: {
    a1: ['Voici ton sujet : {subject}. Quels deux détails simples peux-tu donner ?', 'Voici ton sujet : {subject}. Qu’aimes-tu ou n’aimes-tu pas ? Donne une raison.', 'Voici ton sujet : {subject}. Quand ou où en vois-tu un exemple ?', 'Voici ton sujet : {subject}. Comment en parlerais-tu à un ami ?'],
    a2: ['Voici une situation : {subject}. Raconte une courte histoire. Que s’est-il passé ?', 'Voici une situation : {subject}. Si elle se présentait demain, que ferais-tu d’abord ?', 'Voici une situation : {subject}. Propose deux façons de réagir. Laquelle choisirais-tu ?'],
    b1: ['Voici un problème : {subject}. Comment réagirais-tu et pourquoi ?', 'Voici un problème : {subject}. Pourquoi les avis pourraient-ils diverger ? Quel est le tien ?', 'Voici un problème : {subject}. Quel changement concret aiderait, et à qui profiterait-il ?'],
    b2: ['Examine ce choix : {choice}. Quels en sont les principaux avantages et inconvénients ?', 'Deux personnes ne sont pas d’accord sur ce choix : {choice}. Que dirait chacune et comment réglerais-tu leur désaccord ?', 'Si ce choix devenait courant — {choice} — comment ses effets pourraient-ils évoluer dans dix ans ?'],
    c1: ['Examine cette affirmation : {claim}. Sur quelle hypothèse repose-t-elle et comment pourrais-tu la vérifier ?', 'Comment concilierais-tu les avis de ceux qui approuvent et de ceux qui refusent ce choix : {choice} ?', 'Si ce choix se généralisait — {choice} — quelle conséquence imprévue pourrait apparaître ?'],
    c2: ['Examine cette affirmation : {claim}. Trouve un présupposé caché et conteste-le par un contre-exemple.', 'Imagine un résultat d’étude plausible sur ce choix : {choice}. Comment deux groupes pourraient-ils l’interpréter différemment ?', 'Une critique affirme que ce choix ferait plus de mal que de bien : {choice}. Quelle conclusion nuancée lui répondrait ?'],
  },
  aleman: {
    a1: ['Dein Thema lautet: {subject}. Welche zwei einfachen Details kannst du nennen?', 'Dein Thema lautet: {subject}. Was gefällt dir daran oder was nicht? Nenne einen Grund.', 'Dein Thema lautet: {subject}. Wann oder wo begegnet es dir? Nenne ein Beispiel.', 'Dein Thema lautet: {subject}. Wie würdest du es einem Freund beschreiben?'],
    a2: ['Stell dir folgende Situation vor: {subject}. Erzähl eine kurze Geschichte. Was ist passiert?', 'Stell dir folgende Situation vor: {subject}. Was würdest du morgen zuerst tun?', 'Stell dir folgende Situation vor: {subject}. Nenne zwei Möglichkeiten. Welche wählst du?'],
    b1: ['Betrachte dieses Problem: {subject}. Wie würdest du reagieren und warum?', 'Betrachte dieses Problem: {subject}. Warum könnten Menschen verschiedener Meinung sein?', 'Betrachte dieses Problem: {subject}. Welche konkrete Änderung würde helfen und wem?'],
    b2: ['Betrachte diese Entscheidung: {choice}. Welche Vor- und Nachteile hat sie?', 'Zwei Personen streiten über diese Entscheidung: {choice}. Was könnte jede sagen und wie würdest du vermitteln?', 'Wenn diese Entscheidung üblich würde — {choice} — wie könnten sich ihre Folgen in zehn Jahren verändern?'],
    c1: ['Prüfe diese Behauptung: {claim}. Welche Annahme steckt dahinter und wie könntest du sie überprüfen?', 'Wie würdest du die Ansichten von Befürwortern und Gegnern dieser Entscheidung miteinander vereinbaren: {choice}?', 'Wenn diese Entscheidung weit verbreitet wäre — {choice} — welche unbeabsichtigte Folge könnte entstehen?'],
    c2: ['Prüfe diese Behauptung: {claim}. Finde eine verborgene Prämisse und widerlege sie mit einem Gegenbeispiel.', 'Nenne ein mögliches Studienergebnis zu dieser Entscheidung: {choice}. Wie könnten zwei Gruppen dasselbe Ergebnis verschieden deuten?', 'Ein Kritiker meint, diese Entscheidung richte mehr Schaden als Nutzen an: {choice}. Welches differenzierte Fazit entgegnest du?'],
  },
  italiano: {
    a1: ['Pensa a {subject}. Quali due dettagli semplici puoi dire?', 'Che cosa ti piace o non ti piace di {subject}? Dai una ragione.', 'Quando o dove incontri {subject}? Fai un esempio.', 'Come descriveresti {subject} a un amico?'],
    a2: ['Immagina questa situazione: {subject}. Racconta una breve storia. Che cosa è successo?', 'Immagina questa situazione: {subject}. Che cosa faresti per prima cosa?', 'Immagina questa situazione: {subject}. Proponi due modi di reagire. Quale sceglieresti?'],
    b1: ['Come affronteresti {subject} e perché?', 'Perché si potrebbe non essere d’accordo su {subject}? Qual è la tua opinione?', 'Quale cambiamento concreto aiuterebbe nel caso di {subject} e chi ne trarrebbe beneficio?'],
    b2: ['Considera questa scelta: {choice}. Quali sono i principali vantaggi e svantaggi?', 'Due persone non sono d’accordo su questa scelta: {choice}. Che cosa direbbe ciascuna e come risolveresti il conflitto?', 'Se questa scelta diventasse comune — {choice} — come potrebbero cambiare i suoi effetti nei prossimi dieci anni?'],
    c1: ['Considera questa affermazione: {claim}. Su quale presupposto si basa e come potresti verificarlo?', 'Come concilieresti le opinioni di chi sostiene e di chi rifiuta questa scelta: {choice}?', 'Se questa scelta si diffondesse — {choice} — quale conseguenza imprevista potrebbe emergere?'],
    c2: ['Considera questa affermazione: {claim}. Individua una premessa nascosta e contestala con un controesempio.', 'Immagina un possibile risultato di uno studio su questa scelta: {choice}. Come potrebbero due gruppi interpretarlo in modo opposto?', 'Un critico dice che questa scelta fa più male che bene: {choice}. Quale conclusione sfumata risponderebbe all’obiezione?'],
  },
  portugues: {
    a1: ['Pense em {subject}. Que dois detalhes simples você pode dizer?', 'Do que você gosta ou não gosta em {subject}? Dê um motivo.', 'Quando ou onde você encontra {subject}? Dê um exemplo.', 'Como você descreveria {subject} para um amigo?'],
    a2: ['Imagine esta situação: {subject}. Conte uma história curta. O que aconteceu?', 'Imagine esta situação: {subject}. O que você faria primeiro?', 'Imagine esta situação: {subject}. Cite duas formas de reagir. Qual escolheria?'],
    b1: ['Como você lidaria com {subject} e por quê?', 'Por que as pessoas poderiam discordar sobre {subject}? Qual é sua opinião?', 'Que mudança concreta ajudaria no caso de {subject} e quem se beneficiaria?'],
    b2: ['Considere esta decisão: {choice}. Quais são suas principais vantagens e desvantagens?', 'Duas pessoas discordam desta decisão: {choice}. O que cada uma diria e como você resolveria o conflito?', 'Se esta decisão se tornasse comum — {choice} — como seus efeitos poderiam mudar na próxima década?'],
    c1: ['Considere esta afirmação: {claim}. Que pressuposto a sustenta e como você poderia testá-lo?', 'Como você conciliaria as opiniões de quem apoia e de quem rejeita esta decisão: {choice}?', 'Se esta decisão se espalhasse — {choice} — que consequência imprevista poderia surgir?'],
    c2: ['Considere esta afirmação: {claim}. Identifique uma premissa oculta e questione-a com um contraexemplo.', 'Imagine um resultado plausível de um estudo sobre esta decisão: {choice}. Como dois grupos poderiam interpretá-lo de formas opostas?', 'Um crítico diz que esta decisão causa mais mal do que bem: {choice}. Que conclusão ponderada responderia à objeção?'],
  },
  ruso: {
    a1: ['Твоя тема: {subject}. Назови два простых факта.', 'Твоя тема: {subject}. Что тебе нравится или не нравится? Назови причину.', 'Твоя тема: {subject}. Когда или где ты с этим сталкиваешься? Приведи пример.', 'Твоя тема: {subject}. Как бы ты рассказал об этом другу?'],
    a2: ['Представь ситуацию: {subject}. Расскажи короткую историю. Что произошло?', 'Представь ситуацию: {subject}. Что ты сделаешь сначала, если это случится завтра?', 'Представь ситуацию: {subject}. Назови два способа справиться. Какой выберешь?'],
    b1: ['Рассмотри проблему: {subject}. Как бы ты поступил и почему?', 'Рассмотри проблему: {subject}. Почему мнения могут различаться? Что думаешь ты?', 'Рассмотри проблему: {subject}. Какое конкретное изменение помогло бы и кому?'],
    b2: ['Рассмотри это решение: {choice}. Каковы его главные преимущества и недостатки?', 'Два человека спорят о таком решении: {choice}. Что мог бы сказать каждый и как ты помог бы им договориться?', 'Если такое решение станет обычным — {choice} — как его последствия могут измениться через десять лет?'],
    c1: ['Рассмотри это утверждение: {claim}. На каком предположении оно основано и как его проверить?', 'Как бы ты согласовал позиции сторонников и противников такого решения: {choice}?', 'Если такое решение станет массовым — {choice} — какое непредвиденное последствие возможно?'],
    c2: ['Рассмотри это утверждение: {claim}. Найди скрытую предпосылку и оспорь её с помощью контрпримера.', 'Представь возможный результат исследования такого решения: {choice}. Как две группы могли бы трактовать его противоположным образом?', 'Критик говорит, что такое решение принесёт больше вреда, чем пользы: {choice}. Какой взвешенный вывод ты предложишь?'],
  },
  japones: {
    a1: ['{subject}について、簡単なことを二つ言ってください。', '{subject}の好きなところ、または好きではないところは何ですか。理由を一つ言ってください。', '{subject}について、身近な例を一つ挙げてください。', '友達に{subject}をどう説明しますか。'],
    a2: ['次の場面について短い話をしてください。{subject}。何がありましたか。', '次の場面を想像してください。{subject}。まず何をしますか。', '次の場面を想像してください。{subject}。対応を二つ考え、どちらかを選んでください。'],
    b1: ['{subject}にどう対応しますか。その理由は何ですか。', '{subject}について意見が分かれるのはなぜですか。あなたはどう考えますか。', '{subject}に役立つ具体的な改善策は何ですか。誰のためになりますか。'],
    b2: ['次の選択を考えてください。{choice}。主な利点と欠点は何ですか。', '二人が次の選択をめぐって対立しています。{choice}。それぞれの主張と解決策を述べてください。', '次の選択が一般的になったら、十年後の影響はどう変わりますか。{choice}。'],
    c1: ['次の主張を考えてください。{claim}。その根拠となる前提は何ですか。どう確かめますか。', '次の選択に賛成する人と反対する人の意見を、どう調整しますか。{choice}。', '次の選択が広まった場合、予想外の結果は何ですか。{choice}。'],
    c2: ['次の主張を考えてください。{claim}。隠れた前提を一つ挙げ、反例で問い直してください。', '次の選択について、あり得る調査結果を一つ考えてください。{choice}。同じ結果を二つの立場からどう解釈しますか。', '批判者は次の選択には利益より害が多いと言います。{choice}。その反論を踏まえ、慎重な結論を述べてください。'],
  },
  coreano: {
    a1: ['주제: {subject}. 간단한 사실 두 가지를 말해 보세요.', '주제: {subject}. 좋아하거나 싫어하는 점은 무엇인가요? 이유를 하나 말해 보세요.', '주제: {subject}. 일상에서 볼 수 있는 예를 하나 들어 보세요.', '주제: {subject}. 친구에게 어떻게 설명하겠어요?'],
    a2: ['다음 상황에 관한 짧은 이야기를 해 보세요. {subject}. 무슨 일이 있었나요?', '다음 상황을 상상해 보세요. {subject}. 무엇부터 하겠어요?', '다음 상황을 상상해 보세요. {subject}. 대처 방법 두 가지를 말하고 하나를 골라 보세요.'],
    b1: ['다음 문제를 생각해 보세요. {subject}. 어떻게 대처하겠어요? 이유도 말해 보세요.', '다음 문제를 생각해 보세요. {subject}. 사람들이 왜 의견이 다를까요? 자신의 생각을 말해 보세요.', '다음 문제를 생각해 보세요. {subject}. 어떤 구체적인 변화가 누구에게 도움이 될까요?'],
    b2: ['다음 선택을 생각해 보세요. {choice}. 주요 장점과 단점은 무엇인가요?', '두 사람이 다음 선택을 두고 다툽니다. {choice}. 각자의 주장과 해결 방법을 말해 보세요.', '다음 선택이 흔해진다면 10년 뒤 영향은 어떻게 달라질까요? {choice}.'],
    c1: ['다음 주장을 살펴보세요. {claim}. 어떤 전제가 숨어 있으며 어떻게 확인할 수 있을까요?', '다음 선택에 찬성하는 사람과 반대하는 사람의 견해를 어떻게 조율하겠어요? {choice}.', '다음 선택이 널리 퍼진다면 어떤 예상 밖의 결과가 생길까요? {choice}.'],
    c2: ['다음 주장을 살펴보세요. {claim}. 숨은 전제를 하나 찾아 반례로 검토해 보세요.', '다음 선택에 관한 연구 결과를 하나 상상해 보세요. {choice}. 같은 결과를 두 집단이 어떻게 다르게 해석할까요?', '비판자는 다음 선택의 해가 이익보다 크다고 말합니다. {choice}. 그 반론을 고려해 신중한 결론을 말해 보세요.'],
  },
  es: {
    a1: ['Piensa en {subject}. ¿Qué dos detalles sencillos puedes decir?', '¿Qué te gusta o disgusta de {subject}? Da una razón.', '¿Cuándo o dónde encuentras {subject}? Da un ejemplo.', '¿Cómo describirías {subject} a un amigo?'],
    a2: ['Imagina esta situación: {subject}. Cuenta una historia breve. ¿Qué pasó?', 'Imagina esta situación: {subject}. ¿Qué harías primero?', 'Imagina esta situación: {subject}. Propón dos formas de reaccionar. ¿Cuál elegirías?'],
    b1: ['Considera este problema: {subject}. ¿Cómo actuarías y por qué?', 'Considera este problema: {subject}. ¿Por qué podrían discrepar las personas? ¿Qué opinas tú?', 'Considera este problema: {subject}. ¿Qué cambio concreto ayudaría y a quién beneficiaría?'],
    b2: ['Considera esta decisión: {choice}. ¿Cuáles son sus principales ventajas y desventajas?', 'Dos personas discrepan sobre esta decisión: {choice}. ¿Qué diría cada una y cómo resolverías el desacuerdo?', 'Si esta decisión se volviera habitual —{choice}—, ¿cómo cambiarían sus efectos en diez años?'],
    c1: ['Considera esta afirmación: {claim}. ¿Qué supuesto la sostiene y cómo lo comprobarías?', '¿Cómo conciliarías a quienes apoyan y rechazan esta decisión: {choice}?', 'Si esta decisión se extendiera —{choice}—, ¿qué consecuencia imprevista podría surgir?'],
    c2: ['Considera esta afirmación: {claim}. Identifica una premisa oculta y cuestiónala con un contraejemplo.', 'Imagina un resultado plausible de un estudio sobre esta decisión: {choice}. ¿Cómo podrían interpretarlo de forma opuesta dos grupos?', 'Un crítico sostiene que esta decisión hace más daño que bien: {choice}. ¿Qué conclusión matizada respondería a esa objeción?'],
  },
}

export function concreteQuestion(language, level, setIndex, mode, spanish = false) {
  const locale = spanish ? 'es' : language
  const frame = questionFrames[locale]?.[level]?.[mode]
  if (!frame) throw Error(`Missing question frame: ${locale}/${level}/${mode}`)
  if (['b2', 'c1', 'c2'].includes(level)) {
    const situation = (spanish ? advancedSituationsEs : advancedSituations[language])?.[setIndex]
    if (!situation) throw Error(`Missing advanced situation: ${language}/${setIndex}`)
    return fill(frame, situation)
  }
  const subject = spanish
    ? everydaySubjectsEs[language]?.[level]?.[setIndex]
    : everydaySubjects[language]?.[level]?.[setIndex]
  if (!subject) throw Error(`Missing speaking subject: ${language}/${level}/${setIndex}`)
  return fill(frame, { subject })
}
