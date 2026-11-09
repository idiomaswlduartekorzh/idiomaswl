/** Twenty authored, concrete A1 questions per language, in the order of its published vocabulary sets. */
const rows = (value) => value.trim().split('\n').map((line) => line.trim())

export const a1Questions = {
  ingles: rows(`Who is one person in your family? What is their name?
What time do you wake up, and what time do you eat breakfast?
What is in your bedroom? Name two things.
What do you eat and drink for breakfast?
What clothes are you wearing today? What color are they?
What places can you see on the street where you live?
What do you do first when you wake up?
How do you feel today, and why?
What do you do at school or at work each day?
What do you like doing with someone in your family?
What time do you start school or work? What time do you finish?
Which object in your bedroom do you use every day?
What do you eat for breakfast on a busy day?
What clothes do you choose when it is cold?
Where do you go near your home to buy food?
What time do you wake up on a weekend?
What do you do when you feel tired?
Who do you see at school or at work?
What food does someone in your family like?
What time do you leave home in the morning?`),
  frances: rows(`Qui est une personne de ta famille ? Comment s’appelle-t-elle ?
Quelle est ta couleur préférée ? Où la vois-tu chez toi ?
Que manges-tu et que bois-tu au petit-déjeuner ?
Qu’y a-t-il dans ta chambre ? Nomme deux objets.
À quelle heure te lèves-tu ? À quelle heure manges-tu ?
Quels lieux vois-tu dans une rue près de chez toi ?
Que fais-tu avec une personne de ta famille le week-end ?
De quelle couleur sont tes vêtements aujourd’hui ?
À quelle heure prends-tu ton petit-déjeuner ?
Quel objet utilises-tu chaque jour dans ta chambre ?
Quel numéro vois-tu souvent dans ta journée ? Où le vois-tu ?
Où vas-tu dans ton quartier pour acheter à manger ?
Qui prépare le repas chez toi ? Que prépare cette personne ?
Quelle couleur choisis-tu pour un nouveau vêtement ?
Que bois-tu au petit-déjeuner quand tu es pressé ?
Où ranges-tu tes vêtements dans ta chambre ?
À quelle heure vas-tu à l’école ou au travail ?
Où est le magasin le plus proche de chez toi ?
Qui habite avec toi dans ta famille ?
Quel objet de ta couleur préférée as-tu ?`),
  aleman: rows(`Wer gehört zu deiner Familie? Wie heißt diese Person?
Wann stehst du morgens auf? Nenne die Uhrzeit.
Was ist dein Lieblingsessen? Wann isst du es?
Welche Farbe hat deine Kleidung heute?
Welche zwei Dinge stehen in deinem Zimmer?
Was machst du als Erstes am Morgen?
Was machst du gern mit einer Person aus deiner Familie?
Um wie viel Uhr frühstückst du normalerweise?
Was trinkst du zu deinem Lieblingsessen?
Welche Farbe wählst du für ein neues T-Shirt?
Welchen Gegenstand in deinem Zimmer benutzt du jeden Tag?
Was machst du nach dem Frühstück?
Wen aus deiner Familie siehst du heute?
Welche Zahl steht auf deiner Haustür?
Wer bereitet dein Lieblingsessen zu?
Welche Farbe trägst du an einem kalten Tag gern?
Wo bewahrst du deine Kleidung in deinem Zimmer auf?
Was machst du am Wochenende morgens?
Was isst eine Person aus deiner Familie gern?
Um wie viel Uhr gehst du morgens zur Schule oder zur Arbeit?`),
  italiano: rows(`Chi è una persona della tua famiglia? Come si chiama?
Qual è il tuo colore preferito? Dove lo vedi a casa?
Che cosa mangi e bevi a colazione?
Qual è il tuo giorno preferito della settimana? Che cosa fai quel giorno?
Come ti senti oggi? Perché?
A che ora ti svegli? A che ora fai colazione?
Quali due oggetti ci sono nella tua camera?
Quale animale ti piace? Di che colore è?
Che cosa ti piace fare con una persona della tua famiglia?
Quale vestito hai del tuo colore preferito?
Che cosa mangi a colazione il lunedì?
Che cosa fai nel tuo giorno preferito con un amico?
Che cosa fai quando sei stanco?
Quale numero vedi spesso durante la giornata? Dove?
Quale oggetto usi ogni giorno nella tua camera?
Dove puoi vedere l’animale che ti piace?
Chi prepara un pasto nella tua famiglia?
Quale oggetto del tuo colore preferito hai in casa?
A che ora fai colazione nel fine settimana?
Con chi passi il tuo giorno preferito della settimana?`),
  portugues: rows(`Quem é uma pessoa da sua família? Qual é o nome dela?
Qual é sua cor favorita? Onde você a vê em casa?
O que você come e bebe no café da manhã?
Que lugares existem em uma rua perto da sua casa?
A que horas você acorda e toma café da manhã?
Como você se sente hoje? Por quê?
O que você gosta de fazer com alguém da sua família?
Que roupa você tem na sua cor favorita?
Você toma café da manhã em casa ou fora?
Onde você compra comida perto da sua casa?
Qual número você vê todos os dias? Onde?
O que você faz quando se sente cansado?
Quem prepara uma refeição na sua família?
Que objeto da sua cor favorita você tem em casa?
A que horas você toma café da manhã no fim de semana?
Onde fica uma loja perto da sua casa?
Que horas você olha no relógio antes de sair de casa?
Com quem você conversa quando está feliz?
Quem mora com você na sua família?
Qual é a cor da sua roupa hoje?`),
  ruso: rows(`Кто есть в твоей семье? Как зовут этого человека?
Какой твой любимый цвет? Где ты видишь его дома?
Что ты ешь и пьёшь на завтрак?
Какой твой любимый день недели? Что ты делаешь в этот день?
Как ты себя чувствуешь сегодня? Почему?
Во сколько ты просыпаешься и завтракаешь?
Какие две вещи есть в твоей комнате?
Какая твоя любимая одежда? Какого она цвета?
Что тебе нравится делать с кем-то из семьи?
Какая вещь у тебя есть любимого цвета?
Что ты ешь на завтрак в понедельник?
С кем ты проводишь свой любимый день недели?
Что ты делаешь, когда устаёшь?
Какое число ты видишь каждый день? Где?
Какой вещью в своей комнате ты пользуешься каждый день?
Что ты надеваешь зимой?
Кто живёт с тобой из твоей семьи?
Какого цвета твоя одежда сегодня?
Во сколько ты завтракаешь в выходной?
Что ты делаешь в свой любимый день недели?`),
  japones: rows(`家族の中で、だれとよく話しますか。その人の名前は何ですか。
好きな色は何色ですか。家の中でその色の物はありますか。
朝ごはんに何を食べて、何を飲みますか。
いちばん好きな曜日は何曜日ですか。その日に何をしますか。
よく行く場所はどこですか。そこで何をしますか。
朝、何時に起きますか。何時に朝ごはんを食べますか。
自分の部屋には何がありますか。二つ言ってください。
今日はどんな気持ちですか。どうしてですか。
家族の人と週末に何をしますか。
好きな色の服を持っていますか。どんな服ですか。
月曜日の朝は、何を食べますか。
好きな曜日には、だれと会いますか。
よく行く場所には、どうやって行きますか。
毎日見る数字は何ですか。どこで見ますか。
部屋で毎日使う物は何ですか。
疲れたとき、何をしますか。
家族の中で、だれといっしょに住んでいますか。
今着ている服は何色ですか。
週末は何時に朝ごはんを食べますか。
好きな曜日には、どこへ行きますか。`),
  coreano: rows(`가족 중 누구와 자주 이야기하나요? 그 사람의 이름은 무엇인가요?
가장 좋아하는 색은 무엇인가요? 집에 그 색의 물건이 있나요?
아침에 무엇을 먹고 마시나요?
가장 좋아하는 요일은 언제인가요? 그날 무엇을 하나요?
자주 가는 곳은 어디인가요? 그곳에서 무엇을 하나요?
아침에 몇 시에 일어나고 식사하나요?
내 방에는 무엇이 있나요? 두 가지 말해 보세요.
오늘 기분이 어때요? 왜 그런가요?
주말에 가족과 무엇을 하나요?
좋아하는 색의 옷이 있나요? 어떤 옷인가요?
월요일 아침에는 무엇을 먹나요?
가장 좋아하는 요일에 누구를 만나나요?
자주 가는 곳에는 어떻게 가나요?
매일 보는 숫자는 무엇인가요? 어디에서 보나요?
방에서 매일 사용하는 물건은 무엇인가요?
피곤할 때 무엇을 하나요?
가족 중 누구와 함께 살고 있나요?
오늘 입은 옷은 무슨 색인가요?
주말에는 몇 시에 아침을 먹나요?
가장 좋아하는 요일에는 어디에 가나요?`),
}

/** Spanish support is shown for Russian, Japanese and Korean only. */
const a1QuestionsEsEastern = rows(`¿Con quién de tu familia hablas a menudo? ¿Cómo se llama?
¿Cuál es tu color favorito? ¿Tienes algo de ese color en casa?
¿Qué comes y bebes en el desayuno?
¿Cuál es tu día favorito de la semana? ¿Qué haces ese día?
¿Cuál es un lugar que visitas a menudo? ¿Qué haces allí?
¿A qué hora te levantas y desayunas?
¿Qué dos cosas hay en tu habitación?
¿Cómo te sientes hoy? ¿Por qué?
¿Qué haces con alguien de tu familia el fin de semana?
¿Tienes ropa de tu color favorito? ¿Qué prenda es?
¿Qué desayunas el lunes?
¿A quién ves en tu día favorito de la semana?
¿Cómo llegas a un lugar que visitas a menudo?
¿Qué número ves todos los días? ¿Dónde?
¿Qué objeto de tu habitación usas cada día?
¿Qué haces cuando estás cansado?
¿Con quién de tu familia vives?
¿De qué color es la ropa que llevas hoy?
¿A qué hora desayunas el fin de semana?
¿A dónde vas en tu día favorito de la semana?`)

export const a1QuestionsEs = {
  ruso: rows(`¿Quién forma parte de tu familia? ¿Cómo se llama?
¿Cuál es tu color favorito? ¿Dónde lo ves en casa?
¿Qué comes y bebes en el desayuno?
¿Cuál es tu día favorito de la semana? ¿Qué haces ese día?
¿Cómo te sientes hoy? ¿Por qué?
¿A qué hora te levantas y desayunas?
¿Qué dos cosas hay en tu habitación?
¿Cuál es tu ropa favorita? ¿De qué color es?
¿Qué te gusta hacer con alguien de tu familia?
¿Qué objeto tienes de tu color favorito?
¿Qué desayunas el lunes?
¿Con quién pasas tu día favorito de la semana?
¿Qué haces cuando estás cansado?
¿Qué número ves todos los días? ¿Dónde?
¿Qué objeto de tu habitación usas cada día?
¿Qué te pones en invierno?
¿Con quién de tu familia vives?
¿De qué color es la ropa que llevas hoy?
¿A qué hora desayunas un día libre?
¿Qué haces en tu día favorito de la semana?`),
  japones: a1QuestionsEsEastern,
  coreano: a1QuestionsEsEastern,
}
