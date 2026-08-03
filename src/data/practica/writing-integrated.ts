import { getTopicsByLevel } from '@/data/grammar/registry'

export type WritingLevel = 'a1' | 'a2' | 'b1'

export type WritingLanguage =
  | 'ingles'
  | 'frances'
  | 'portugues'
  | 'italiano'
  | 'aleman'
  | 'ruso'
  | 'japones'
  | 'coreano'

export type RequiredWritingTerm = {
  term: string
  label?: string
  kind: 'vocabulario' | 'conector' | 'adjetivo' | 'adverbio' | 'estructura'
}

export type WritingGrammarReference = {
  slug: string
  title: string
  rationale: string
}

export type IntegratedWritingExercise = {
  id: string
  sequence: number
  title: string
  genre: string
  level: WritingLevel
  language: WritingLanguage
  languageLabel: string
  languageNative: string
  backHref: string
  color: string
  readingTitle: string
  readingText: string
  readingFocus: string[]
  prompt: string
  supportPrompt?: string
  minWords: number
  requiredCount: number
  requiredTerms: RequiredWritingTerm[]
  planningQuestions: string[]
  successCriteria: string[]
  modelAnswer: string
  modelNote: string
  cefrDescriptor: string
  grammarReferences: WritingGrammarReference[]
}

type LanguageProfile = {
  label: string
  native: string
  color: string
  backBase: string
  a1: {
    title: string
    genre: string
    readingTitle: string
    readingText: string
    prompt: string
    model: string
    terms: RequiredWritingTerm[]
  }
  a2: {
    title: string
    genre: string
    readingTitle: string
    readingText: string
    prompt: string
    model: string
    terms: RequiredWritingTerm[]
  }
  b1: {
    title: string
    genre: string
    readingTitle: string
    readingText: string
    prompt: string
    model: string
    terms: RequiredWritingTerm[]
  }
}

const LEVEL_RULES: Record<WritingLevel, {
  minWords: number
  requiredCount: number
  readingFocus: string[]
  planningQuestions: string[]
  successCriteria: string[]
  modelNote: string
  cefrDescriptor: string
}> = {
  a1: {
    minWords: 35,
    requiredCount: 4,
    readingFocus: [
      'Identifica quién escribe, dónde vive y qué necesita.',
      'Copia ideas simples del texto sin usar frases demasiado avanzadas.',
      'Prepara una respuesta breve con presente, gustos y una razón simple.',
    ],
    planningQuestions: ['¿A quién respondes?', '¿Qué información debes incluir?', '¿Qué frase usarás para cerrar?'],
    successCriteria: ['4-6 oraciones cortas', 'presente simple o estructura básica del nivel', 'al menos una idea tomada del texto'],
    modelNote: 'El ejemplo usa frases cortas, vocabulario frecuente y conectores básicos del nivel A1.',
    cefrDescriptor: 'Puede escribir frases y oraciones sencillas sobre asuntos cotidianos y responder a mensajes muy breves con información personal básica.',
  },
  a2: {
    minWords: 55,
    requiredCount: 5,
    readingFocus: [
      'Distingue el problema, la petición y los detalles prácticos.',
      'Reutiliza vocabulario del texto y añade una experiencia personal breve.',
      'Conecta ideas con tiempo, contraste y razón.',
    ],
    planningQuestions: ['¿Qué pasó primero?', '¿Qué solución o respuesta darás?', '¿Qué detalle personal hace claro tu mensaje?'],
    successCriteria: ['6-8 oraciones', 'pasado o futuro básico cuando corresponda', 'conectores de secuencia, contraste y causa'],
    modelNote: 'El ejemplo sube la complejidad con pasado/futuro básico, pero evita subordinación pesada.',
    cefrDescriptor: 'Puede escribir mensajes personales sencillos y conectar frases con conectores frecuentes para describir experiencias, planes y necesidades cotidianas.',
  },
  b1: {
    minWords: 80,
    requiredCount: 6,
    readingFocus: [
      'Resume la situación antes de responder.',
      'Incluye postura, justificación y una consecuencia posible.',
      'Usa conectores para contraste, causa, consecuencia y cierre.',
    ],
    planningQuestions: ['¿Cuál es tu postura?', '¿Qué dos razones la apoyan?', '¿Qué consecuencia o recomendación final puedes proponer?'],
    successCriteria: ['un párrafo desarrollado o mensaje formal de 80+ palabras', 'opinión clara con razones', 'conectores variados sin salir del nivel B1'],
    modelNote: 'El ejemplo mantiene nivel B1: ideas conectadas, opinión clara y vocabulario útil, sin estructuras C1.',
    cefrDescriptor: 'Puede escribir textos conectados sobre temas familiares, expresar una opinión con razones y proponer soluciones prácticas con un registro adecuado.',
  },
}

const profiles: Record<WritingLanguage, LanguageProfile> = {
  ingles: {
    label: 'Inglés',
    native: 'English',
    color: '#059669',
    backBase: '/practica/ingles',
    a1: {
      title: 'Reply to a New Classmate',
      genre: 'mensaje corto',
      readingTitle: 'A message from Sam',
      readingText: 'Hi! My name is Sam. I am new in the English class. I live near the school with my sister. I like music and small cafes, but I do not know the city very well. After class, I want to visit a quiet place and meet one friendly student.',
      prompt: 'Write a short reply to Sam. Say hello, introduce yourself, say where you live, mention one place you like, and invite Sam after class.',
      model: 'Hi Sam! My name is Laura. I am in your English class too. I live near the park with my family. I like music and I know a quiet cafe near the school. We can go after class and drink coffee. Welcome to the class!',
      terms: [
        { term: 'my name is', kind: 'estructura' },
        { term: 'I live', kind: 'estructura' },
        { term: 'near', kind: 'vocabulario' },
        { term: 'quiet', kind: 'adjetivo' },
        { term: 'and', kind: 'conector' },
        { term: 'but', kind: 'conector' },
      ],
    },
    a2: {
      title: 'Answer a Weekend Invitation',
      genre: 'mensaje personal',
      readingTitle: 'Maya changed the plan',
      readingText: 'Hi! I wanted to visit the museum on Saturday, but it is closed in the morning. We can go in the afternoon, or we can meet at the library first and have lunch nearby. Last time, the cafe next to the library was cheap and comfortable.',
      prompt: 'Reply to Maya. Explain what option you prefer, mention one past experience, and suggest a clear time and place to meet.',
      model: 'Hi Maya! I prefer to meet at the library first because it is easy to find. Last time, I had lunch in the cafe next to the library, and the food was cheap but good. After lunch, we can go to the museum together. Let us meet at one o clock near the main door.',
      terms: [
        { term: 'I prefer', kind: 'estructura' },
        { term: 'because', kind: 'conector' },
        { term: 'last time', kind: 'adverbio' },
        { term: 'cheap', kind: 'adjetivo' },
        { term: 'comfortable', kind: 'adjetivo' },
        { term: 'after', kind: 'conector' },
        { term: 'together', kind: 'adverbio' },
      ],
    },
    b1: {
      title: 'Respond to a School Notice',
      genre: 'respuesta argumentada',
      readingTitle: 'A notice about phone-free Fridays',
      readingText: 'The language school is considering phone-free Fridays. Students would put phones away during breaks so they can speak more in the target language. Some students support the idea because it may increase conversation. Others worry that phones are useful for dictionaries, family messages and transport apps.',
      prompt: 'Write a response to the school. Summarize the idea, give your opinion, include one advantage and one concern, and propose a practical compromise.',
      model: 'I think phone-free Fridays could be useful if the rule is flexible. The main advantage is that students would speak more during breaks instead of checking social media. However, phones are also important for dictionaries, transport and urgent family messages. For this reason, I would suggest a compromise: students can use phones for learning tools, but not for entertainment during short breaks. This would encourage conversation without creating unnecessary problems.',
      terms: [
        { term: 'I think', kind: 'estructura' },
        { term: 'advantage', kind: 'vocabulario' },
        { term: 'however', kind: 'conector' },
        { term: 'for this reason', kind: 'conector' },
        { term: 'suggest', kind: 'vocabulario' },
        { term: 'compromise', kind: 'vocabulario' },
        { term: 'without', kind: 'conector' },
        { term: 'useful', kind: 'adjetivo' },
      ],
    },
  },
  frances: {
    label: 'Francés',
    native: 'Français',
    color: '#2563eb',
    backBase: '/practica/frances',
    a1: {
      title: 'Répondre à une camarade',
      genre: 'message court',
      readingTitle: 'Un message de Camille',
      readingText: "Bonjour ! Je m'appelle Camille. Je suis nouvelle dans la classe. J'habite près de l'école avec ma soeur. J'aime la musique et les petits cafés, mais je ne connais pas bien la ville.",
      prompt: 'Responde a Camille en francés. Preséntate, di dónde vives, menciona un lugar que te gusta e invítala después de clase.',
      model: "Bonjour Camille ! Je m'appelle Ana. Je suis dans ta classe de français. J'habite près du parc avec ma famille. J'aime la musique et je connais un café calme près de l'école. On peut y aller après la classe.",
      terms: [
        { term: "je m'appelle", kind: 'estructura' },
        { term: "j'habite", kind: 'estructura' },
        { term: 'près de', kind: 'vocabulario' },
        { term: 'calme', kind: 'adjetivo' },
        { term: 'et', kind: 'conector' },
        { term: 'mais', kind: 'conector' },
      ],
    },
    a2: {
      title: 'Répondre à une invitation',
      genre: 'message personnel',
      readingTitle: 'Le plan de samedi',
      readingText: "Salut ! Je voulais visiter le musée samedi matin, mais il est fermé. On peut y aller l'après-midi, ou bien se retrouver d'abord à la bibliothèque et déjeuner près de là. La dernière fois, le café était bon marché et confortable.",
      prompt: "Réponds au message. Explique quelle option tu préfères, mentionne une expérience passée et propose une heure et un lieu.",
      model: "Salut ! Je préfère retrouver à la bibliothèque d'abord parce que c'est facile. La dernière fois, j'ai déjeuné dans le café près de la bibliothèque, et c'était bon marché mais très agréable. Après le déjeuner, on peut aller au musée ensemble. Retrouvons-nous à treize heures devant la porte principale.",
      terms: [
        { term: 'je préfère', kind: 'estructura' },
        { term: 'parce que', kind: 'conector' },
        { term: 'la dernière fois', kind: 'adverbio' },
        { term: 'bon marché', kind: 'adjetivo' },
        { term: 'confortable', kind: 'adjetivo' },
        { term: 'après', kind: 'conector' },
        { term: 'ensemble', kind: 'adverbio' },
      ],
    },
    b1: {
      title: "Réagir à une règle de l'école",
      genre: 'réponse argumentée',
      readingTitle: 'Vendredi sans téléphone',
      readingText: "L'école de langues pense créer un vendredi sans téléphone. Pendant les pauses, les étudiants rangeraient leur portable pour parler davantage dans la langue étudiée. Certains aiment l'idée, car elle peut encourager la conversation. D'autres pensent que le téléphone reste utile pour le dictionnaire, la famille et les transports.",
      prompt: "Écris une réponse à l'école. Résume l'idée, donne ton avis, présente un avantage, une inquiétude et un compromis pratique.",
      model: "Je pense que le vendredi sans téléphone peut être utile si la règle reste flexible. Le principal avantage est que les étudiants parleraient davantage pendant les pauses au lieu de regarder les réseaux sociaux. Cependant, le téléphone est aussi nécessaire pour le dictionnaire, les transports ou les messages urgents. Pour cette raison, je proposerais un compromis : utiliser le téléphone pour apprendre, mais éviter le divertissement pendant les pauses.",
      terms: [
        { term: 'je pense', kind: 'estructura' },
        { term: 'avantage', kind: 'vocabulario' },
        { term: 'cependant', kind: 'conector' },
        { term: 'pour cette raison', kind: 'conector' },
        { term: 'proposerais', kind: 'estructura' },
        { term: 'compromis', kind: 'vocabulario' },
        { term: 'utile', kind: 'adjetivo' },
        { term: 'au lieu de', kind: 'conector' },
      ],
    },
  },
  portugues: {
    label: 'Portugués',
    native: 'Português',
    color: '#16a34a',
    backBase: '/practica/portugues',
    a1: {
      title: 'Responder a uma colega nova',
      genre: 'mensagem curta',
      readingTitle: 'Mensagem da Luana',
      readingText: 'Oi! Eu me chamo Luana. Sou nova na turma. Moro perto da escola com minha irmã. Gosto de música e de cafés pequenos, mas não conheço bem a cidade.',
      prompt: 'Responda à Luana em português. Apresente-se, diga onde você mora, mencione um lugar de que gosta e faça um convite depois da aula.',
      model: 'Oi, Luana! Eu me chamo Sofia. Sou da sua turma de português. Moro perto do parque com minha família. Gosto de música e conheço um café tranquilo perto da escola. Podemos ir depois da aula.',
      terms: [
        { term: 'eu me chamo', kind: 'estructura' },
        { term: 'moro', kind: 'estructura' },
        { term: 'perto de', kind: 'vocabulario' },
        { term: 'tranquilo', kind: 'adjetivo' },
        { term: 'e', kind: 'conector' },
        { term: 'mas', kind: 'conector' },
      ],
    },
    a2: {
      title: 'Responder a um convite',
      genre: 'mensagem pessoal',
      readingTitle: 'O plano de sábado',
      readingText: 'Oi! Eu queria visitar o museu no sábado de manhã, mas ele está fechado. Podemos ir à tarde, ou encontrar-nos primeiro na biblioteca e almoçar por perto. Da última vez, o café ao lado era barato e confortável.',
      prompt: 'Responda à mensagem. Explique qual opção você prefere, mencione uma experiência passada e proponha hora e lugar.',
      model: 'Oi! Eu prefiro encontrar-nos primeiro na biblioteca porque é fácil chegar lá. Da última vez, almocei no café ao lado, e a comida era barata mas boa. Depois do almoço, podemos ir ao museu juntos. Vamos nos encontrar à uma hora na porta principal.',
      terms: [
        { term: 'eu prefiro', kind: 'estructura' },
        { term: 'porque', kind: 'conector' },
        { term: 'da última vez', kind: 'adverbio' },
        { term: 'barato', kind: 'adjetivo' },
        { term: 'confortável', kind: 'adjetivo' },
        { term: 'depois', kind: 'conector' },
        { term: 'juntos', kind: 'adverbio' },
      ],
    },
    b1: {
      title: 'Responder a um comunicado',
      genre: 'resposta argumentada',
      readingTitle: 'Sextas-feiras sem celular',
      readingText: 'A escola de idiomas pensa criar sextas-feiras sem celular. Durante os intervalos, os alunos guardariam o telefone para conversar mais no idioma estudado. Alguns apoiam a ideia porque ela pode aumentar a conversação. Outros se preocupam porque o celular é útil para dicionários, família e transporte.',
      prompt: 'Escreva uma resposta para a escola. Resuma a ideia, dê sua opinião, inclua uma vantagem, uma preocupação e proponha um compromisso prático.',
      model: 'Eu acho que sextas-feiras sem celular podem ser úteis se a regra for flexível. A principal vantagem é que os alunos conversariam mais durante os intervalos, em vez de olhar redes sociais. No entanto, o celular também é necessário para dicionários, transporte e mensagens urgentes da família. Por esse motivo, eu sugeriria um compromisso: usar o celular para aprender, mas evitar entretenimento nas pausas.',
      terms: [
        { term: 'eu acho', kind: 'estructura' },
        { term: 'vantagem', kind: 'vocabulario' },
        { term: 'no entanto', kind: 'conector' },
        { term: 'por esse motivo', kind: 'conector' },
        { term: 'sugeriria', kind: 'estructura' },
        { term: 'compromisso', kind: 'vocabulario' },
        { term: 'útil', kind: 'adjetivo' },
        { term: 'em vez de', kind: 'conector' },
      ],
    },
  },
  italiano: {
    label: 'Italiano',
    native: 'Italiano',
    color: '#0f9f6e',
    backBase: '/practica/italiano',
    a1: {
      title: 'Rispondere a una compagna nuova',
      genre: 'messaggio breve',
      readingTitle: 'Un messaggio di Giulia',
      readingText: 'Ciao! Mi chiamo Giulia. Sono nuova nella classe. Abito vicino alla scuola con mia sorella. Mi piace la musica e mi piacciono i piccoli bar, ma non conosco bene la città.',
      prompt: 'Rispondi a Giulia in italiano. Presentati, di dove abiti, menziona un posto che ti piace e invitala dopo la lezione.',
      model: 'Ciao Giulia! Mi chiamo Elena. Sono nella tua classe di italiano. Abito vicino al parco con la mia famiglia. Mi piace la musica e conosco un bar tranquillo vicino alla scuola. Possiamo andarci dopo la lezione.',
      terms: [
        { term: 'mi chiamo', kind: 'estructura' },
        { term: 'abito', kind: 'estructura' },
        { term: 'vicino', kind: 'vocabulario' },
        { term: 'tranquillo', kind: 'adjetivo' },
        { term: 'e', kind: 'conector' },
        { term: 'ma', kind: 'conector' },
      ],
    },
    a2: {
      title: 'Rispondere a un invito',
      genre: 'messaggio personale',
      readingTitle: 'Il piano di sabato',
      readingText: 'Ciao! Volevo visitare il museo sabato mattina, ma è chiuso. Possiamo andarci nel pomeriggio, oppure incontrarci prima in biblioteca e pranzare lì vicino. L altra volta, il bar vicino alla biblioteca era economico e comodo.',
      prompt: 'Rispondi al messaggio. Spiega quale opzione preferisci, menziona una esperienza passata e proponi un ora e un luogo.',
      model: 'Ciao! Preferisco incontrarci prima in biblioteca perché è facile da trovare. L altra volta ho pranzato nel bar vicino alla biblioteca, ed era economico ma buono. Dopo pranzo possiamo andare al museo insieme. Incontriamoci all una davanti alla porta principale.',
      terms: [
        { term: 'preferisco', kind: 'estructura' },
        { term: 'perché', kind: 'conector' },
        { term: 'l altra volta', kind: 'adverbio' },
        { term: 'economico', kind: 'adjetivo' },
        { term: 'comodo', kind: 'adjetivo' },
        { term: 'dopo', kind: 'conector' },
        { term: 'insieme', kind: 'adverbio' },
      ],
    },
    b1: {
      title: 'Rispondere a un avviso',
      genre: 'risposta argomentata',
      readingTitle: 'Venerdì senza telefono',
      readingText: 'La scuola di lingue sta pensando a un venerdì senza telefono. Durante le pause, gli studenti metterebbero via il cellulare per parlare di più nella lingua studiata. Alcuni sostengono l idea perché può aumentare la conversazione. Altri sono preoccupati perché il cellulare è utile per dizionari, famiglia e trasporti.',
      prompt: 'Scrivi una risposta alla scuola. Riassumi l idea, dai la tua opinione, includi un vantaggio, una preoccupazione e proponi un compromesso pratico.',
      model: 'Penso che un venerdì senza telefono possa essere utile se la regola resta flessibile. Il vantaggio principale è che gli studenti parlerebbero di più durante le pause invece di guardare i social. Tuttavia, il cellulare è anche necessario per dizionari, trasporti e messaggi urgenti della famiglia. Per questo motivo, proporrei un compromesso: usare il telefono per imparare, ma evitare l intrattenimento durante le pause.',
      terms: [
        { term: 'penso che', kind: 'estructura' },
        { term: 'vantaggio', kind: 'vocabulario' },
        { term: 'tuttavia', kind: 'conector' },
        { term: 'per questo motivo', kind: 'conector' },
        { term: 'proporrei', kind: 'estructura' },
        { term: 'compromesso', kind: 'vocabulario' },
        { term: 'utile', kind: 'adjetivo' },
        { term: 'invece di', kind: 'conector' },
      ],
    },
  },
  aleman: {
    label: 'Alemán',
    native: 'Deutsch',
    color: '#d97706',
    backBase: '/practica/aleman',
    a1: {
      title: 'Einer neuen Person antworten',
      genre: 'kurze Nachricht',
      readingTitle: 'Eine Nachricht von Lukas',
      readingText: 'Hallo! Ich heiße Lukas. Ich bin neu im Deutschkurs. Ich wohne in der Nähe von der Schule mit meiner Schwester. Ich mag Musik und kleine Cafés, aber ich kenne die Stadt nicht gut.',
      prompt: 'Antworte Lukas auf Deutsch. Stell dich vor, sag wo du wohnst, nenne einen Ort, den du magst, und lade ihn nach dem Kurs ein.',
      model: 'Hallo Lukas! Ich heiße Anna. Ich bin auch im Deutschkurs. Ich wohne in der Nähe vom Park mit meiner Familie. Ich mag Musik und kenne ein ruhiges Café neben der Schule. Wir können nach dem Kurs dorthin gehen.',
      terms: [
        { term: 'ich heiße', kind: 'estructura' },
        { term: 'ich wohne', kind: 'estructura' },
        { term: 'in der nähe', kind: 'vocabulario' },
        { term: 'ruhig', kind: 'adjetivo' },
        { term: 'und', kind: 'conector' },
        { term: 'aber', kind: 'conector' },
      ],
    },
    a2: {
      title: 'Auf eine Einladung antworten',
      genre: 'persönliche Nachricht',
      readingTitle: 'Der Plan für Samstag',
      readingText: 'Hallo! Ich wollte am Samstagmorgen das Museum besuchen, aber es ist geschlossen. Wir können am Nachmittag gehen, oder wir treffen uns zuerst in der Bibliothek und essen in der Nähe zu Mittag. Letztes Mal war das Café neben der Bibliothek billig und gemütlich.',
      prompt: 'Antworte auf die Nachricht. Erkläre, welche Option du bevorzugst, erwähne eine vergangene Erfahrung und schlage Uhrzeit und Ort vor.',
      model: 'Hallo! Ich bevorzuge die Bibliothek zuerst, weil sie leicht zu finden ist. Letztes Mal habe ich im Café neben der Bibliothek gegessen, und es war billig aber gut. Nach dem Mittagessen können wir zusammen ins Museum gehen. Treffen wir uns um ein Uhr vor dem Haupteingang.',
      terms: [
        { term: 'ich bevorzuge', kind: 'estructura' },
        { term: 'weil', kind: 'conector' },
        { term: 'letztes mal', kind: 'adverbio' },
        { term: 'billig', kind: 'adjetivo' },
        { term: 'gemütlich', kind: 'adjetivo' },
        { term: 'nach', kind: 'conector' },
        { term: 'zusammen', kind: 'adverbio' },
      ],
    },
    b1: {
      title: 'Auf eine Schulmitteilung reagieren',
      genre: 'begründete Antwort',
      readingTitle: 'Freitag ohne Handy',
      readingText: 'Die Sprachschule überlegt, einen Freitag ohne Handy einzuführen. In den Pausen würden die Lernenden ihre Handys weglegen, damit sie mehr in der Zielsprache sprechen. Einige unterstützen die Idee, weil sie Gespräche fördern kann. Andere machen sich Sorgen, weil Handys für Wörterbücher, Familie und Verkehr nützlich sind.',
      prompt: 'Schreib eine Antwort an die Schule. Fasse die Idee zusammen, gib deine Meinung, nenne einen Vorteil, eine Sorge und einen praktischen Kompromiss.',
      model: 'Ich denke, ein Freitag ohne Handy könnte nützlich sein, wenn die Regel flexibel bleibt. Der wichtigste Vorteil ist, dass die Lernenden in den Pausen mehr sprechen würden, statt soziale Medien zu nutzen. Allerdings sind Handys auch wichtig für Wörterbücher, Verkehr und dringende Familiennachrichten. Aus diesem Grund würde ich einen Kompromiss vorschlagen: Handys für Lernhilfen erlauben, aber Unterhaltung in den Pausen vermeiden.',
      terms: [
        { term: 'ich denke', kind: 'estructura' },
        { term: 'vorteil', kind: 'vocabulario' },
        { term: 'allerdings', kind: 'conector' },
        { term: 'aus diesem grund', kind: 'conector' },
        { term: 'vorschlagen', kind: 'vocabulario' },
        { term: 'kompromiss', kind: 'vocabulario' },
        { term: 'nützlich', kind: 'adjetivo' },
        { term: 'statt', kind: 'conector' },
      ],
    },
  },
  ruso: {
    label: 'Ruso',
    native: 'Русский',
    color: '#7c3aed',
    backBase: '/practica/ruso',
    a1: {
      title: 'Ответ новому студенту',
      genre: 'короткое сообщение',
      readingTitle: 'Сообщение от Анны',
      readingText: 'Привет! Меня зовут Анна. Я новая студентка. Я живу рядом со школой с сестрой. Я люблю музыку и маленькие кафе, но плохо знаю город.',
      prompt: 'Ответь Анне по-русски. Представься, скажи где ты живешь, назови место, которое тебе нравится, и пригласи ее после урока.',
      model: 'Привет, Анна! Меня зовут София. Я тоже студентка в этой группе. Я живу рядом с парком с моей семьей. Я люблю музыку и знаю тихое кафе рядом со школой. Мы можем пойти туда после урока.',
      terms: [
        { term: 'меня зовут', kind: 'estructura' },
        { term: 'я живу', kind: 'estructura' },
        { term: 'рядом', kind: 'vocabulario' },
        { term: 'тихое', kind: 'adjetivo' },
        { term: 'и', kind: 'conector' },
        { term: 'но', kind: 'conector' },
      ],
    },
    a2: {
      title: 'Ответ на приглашение',
      genre: 'личное сообщение',
      readingTitle: 'План на субботу',
      readingText: 'Привет! Я хотел посетить музей в субботу утром, но он закрыт. Мы можем пойти днем или сначала встретиться в библиотеке и пообедать рядом. В прошлый раз кафе около библиотеки было недорогим и удобным.',
      prompt: 'Ответь на сообщение. Объясни, какой вариант ты предпочитаешь, упомяни прошлый опыт и предложи время и место.',
      model: 'Привет! Я предпочитаю сначала встретиться в библиотеке, потому что ее легко найти. В прошлый раз я обедал в кафе около библиотеки, и там было недорого, но вкусно. После обеда мы можем вместе пойти в музей. Давай встретимся в час у главного входа.',
      terms: [
        { term: 'я предпочитаю', kind: 'estructura' },
        { term: 'потому что', kind: 'conector' },
        { term: 'в прошлый раз', kind: 'adverbio' },
        { term: 'недорого', kind: 'adverbio' },
        { term: 'удобным', kind: 'adjetivo' },
        { term: 'после', kind: 'conector' },
        { term: 'вместе', kind: 'adverbio' },
      ],
    },
    b1: {
      title: 'Ответ на объявление школы',
      genre: 'аргументированный ответ',
      readingTitle: 'Пятница без телефона',
      readingText: 'Языковая школа думает ввести пятницу без телефонов. Во время перерывов студенты будут убирать телефоны, чтобы больше говорить на изучаемом языке. Некоторые поддерживают идею, потому что она может развивать разговорную практику. Другие волнуются, потому что телефон полезен для словаря, семьи и транспорта.',
      prompt: 'Напиши ответ школе. Кратко опиши идею, дай свое мнение, назови одно преимущество, одну проблему и предложи практический компромисс.',
      model: 'Я думаю, что пятница без телефона может быть полезной, если правило будет гибким. Главное преимущество в том, что студенты будут больше говорить во время перерывов, вместо того чтобы смотреть социальные сети. Однако телефон также нужен для словаря, транспорта и срочных семейных сообщений. По этой причине я бы предложил компромисс: разрешить телефон для учебы, но ограничить развлечения во время перерывов.',
      terms: [
        { term: 'я думаю', kind: 'estructura' },
        { term: 'преимущество', kind: 'vocabulario' },
        { term: 'однако', kind: 'conector' },
        { term: 'по этой причине', kind: 'conector' },
        { term: 'предложил', kind: 'vocabulario' },
        { term: 'компромисс', kind: 'vocabulario' },
        { term: 'полезной', kind: 'adjetivo' },
        { term: 'вместо', kind: 'conector' },
      ],
    },
  },
  japones: {
    label: 'Japonés',
    native: '日本語',
    color: '#e11d48',
    backBase: '/practica/japones',
    a1: {
      title: '新しいクラスメートに返事',
      genre: '短いメッセージ',
      readingTitle: 'サムさんのメッセージ',
      readingText: 'こんにちは。サムです。日本語のクラスの新しい学生です。学校の近くに住んでいます。音楽と小さいカフェが好きです。でも、この町をよく知りません。',
      prompt: 'サムさんに日本語で返事を書きましょう。自己紹介、住んでいる場所、好きな場所、授業の後の誘いを入れてください。',
      model: 'こんにちは、サムさん。わたしはユミです。日本語のクラスの学生です。公園の近くに住んでいます。音楽が好きです。そして学校の近くに静かなカフェがあります。授業の後で一緒に行きましょう。',
      terms: [
        { term: 'わたしは', kind: 'estructura' },
        { term: '住んでいます', kind: 'estructura' },
        { term: '近く', kind: 'vocabulario' },
        { term: '静かな', kind: 'adjetivo' },
        { term: 'そして', kind: 'conector' },
        { term: 'でも', kind: 'conector' },
      ],
    },
    a2: {
      title: '招待に返事する',
      genre: '個人的なメッセージ',
      readingTitle: '土曜日の予定',
      readingText: 'こんにちは。土曜日の朝に博物館へ行きたかったですが、閉まっています。午後に行くこともできます。または、先に図書館で会って、近くで昼ご飯を食べてもいいです。前回、図書館の隣のカフェは安くて便利でした。',
      prompt: 'メッセージに返事を書きましょう。どちらがいいか、前の経験、会う時間と場所を書いてください。',
      model: 'こんにちは。私は先に図書館で会うほうがいいです。なぜなら分かりやすい場所だからです。前回、図書館の隣のカフェで昼ご飯を食べました。安かったですが、おいしかったです。昼ご飯の後で、一緒に博物館へ行きましょう。一時に正面入口で会いましょう。',
      terms: [
        { term: 'ほうがいい', kind: 'estructura' },
        { term: 'なぜなら', kind: 'conector' },
        { term: '前回', kind: 'adverbio' },
        { term: '安かった', kind: 'adjetivo' },
        { term: '便利', kind: 'adjetivo' },
        { term: '後で', kind: 'conector' },
        { term: '一緒に', kind: 'adverbio' },
      ],
    },
    b1: {
      title: '学校のお知らせに意見を書く',
      genre: '意見文',
      readingTitle: 'スマホなしの金曜日',
      readingText: '語学学校は、スマホなしの金曜日を考えています。休み時間に学生はスマホをしまって、勉強している言語でより多く話します。この考えに賛成する人もいます。会話が増えるからです。一方で、辞書、家族への連絡、交通アプリにスマホが必要だと心配する人もいます。',
      prompt: '学校に返事を書きましょう。考えを短くまとめ、あなたの意見、利点、心配な点、実用的な妥協案を書いてください。',
      model: '私は、ルールが柔軟なら、スマホなしの金曜日は役に立つと思います。主な利点は、学生が休み時間にSNSを見る代わりに、もっと会話をすることです。しかし、スマホは辞書、交通、家族への急な連絡にも必要です。そのため、妥協案として、学習のためのスマホ使用は許可し、休み時間の娯楽だけを減らすことを提案します。',
      terms: [
        { term: 'と思います', kind: 'estructura' },
        { term: '利点', kind: 'vocabulario' },
        { term: 'しかし', kind: 'conector' },
        { term: 'そのため', kind: 'conector' },
        { term: '提案します', kind: 'vocabulario' },
        { term: '妥協案', kind: 'vocabulario' },
        { term: '役に立つ', kind: 'adjetivo' },
        { term: '代わりに', kind: 'conector' },
      ],
    },
  },
  coreano: {
    label: 'Coreano',
    native: '한국어',
    color: '#0ea5e9',
    backBase: '/practica/coreano',
    a1: {
      title: '새 친구에게 답장하기',
      genre: '짧은 메시지',
      readingTitle: '민지의 메시지',
      readingText: '안녕하세요. 저는 민지예요. 한국어 반에 새로 왔어요. 학교 근처에 살아요. 음악하고 작은 카페를 좋아해요. 그런데 이 동네를 잘 몰라요.',
      prompt: '민지에게 한국어로 답장하세요. 자기소개, 사는 곳, 좋아하는 장소, 수업 후 초대를 넣으세요.',
      model: '안녕하세요, 민지 씨. 저는 수아예요. 저도 한국어 반 학생이에요. 공원 근처에 살아요. 음악을 좋아하고 학교 근처에 조용한 카페를 알아요. 수업 후에 같이 가요.',
      terms: [
        { term: '저는', kind: 'estructura' },
        { term: '살아요', kind: 'estructura' },
        { term: '근처', kind: 'vocabulario' },
        { term: '조용한', kind: 'adjetivo' },
        { term: '하고', kind: 'conector' },
        { term: '그런데', kind: 'conector' },
      ],
    },
    a2: {
      title: '초대에 답장하기',
      genre: '개인 메시지',
      readingTitle: '토요일 계획',
      readingText: '안녕하세요. 토요일 아침에 박물관에 가고 싶었지만 문을 닫아요. 오후에 갈 수 있어요. 아니면 먼저 도서관에서 만나고 근처에서 점심을 먹을 수 있어요. 지난번에 도서관 옆 카페는 싸고 편했어요.',
      prompt: '메시지에 답장하세요. 어떤 선택을 더 좋아하는지, 지난 경험, 만날 시간과 장소를 쓰세요.',
      model: '안녕하세요. 저는 먼저 도서관에서 만나는 것이 더 좋아요. 왜냐하면 찾기 쉬운 곳이기 때문이에요. 지난번에 도서관 옆 카페에서 점심을 먹었고 음식이 쌌지만 맛있었어요. 점심 후에 같이 박물관에 가요. 한 시에 정문 앞에서 만나요.',
      terms: [
        { term: '더 좋아요', kind: 'estructura' },
        { term: '왜냐하면', kind: 'conector' },
        { term: '지난번에', kind: 'adverbio' },
        { term: '쌌지만', kind: 'adjetivo' },
        { term: '편했어요', kind: 'adjetivo' },
        { term: '후에', kind: 'conector' },
        { term: '같이', kind: 'adverbio' },
      ],
    },
    b1: {
      title: '학교 공지에 의견 쓰기',
      genre: '의견 답변',
      readingTitle: '휴대폰 없는 금요일',
      readingText: '어학원은 휴대폰 없는 금요일을 만들려고 합니다. 쉬는 시간에 학생들은 휴대폰을 넣어 두고 배우는 언어로 더 많이 이야기합니다. 어떤 학생들은 대화가 늘 수 있어서 이 생각을 지지합니다. 다른 학생들은 사전, 가족 연락, 교통 앱 때문에 휴대폰이 필요하다고 걱정합니다.',
      prompt: '학교에 답변을 쓰세요. 내용을 요약하고, 의견, 장점, 걱정, 현실적인 절충안을 포함하세요.',
      model: '저는 규칙이 유연하다면 휴대폰 없는 금요일이 유용할 수 있다고 생각합니다. 가장 큰 장점은 학생들이 쉬는 시간에 소셜 미디어를 보는 대신 더 많이 말할 수 있다는 것입니다. 하지만 휴대폰은 사전, 교통, 긴급한 가족 연락에도 필요합니다. 그래서 저는 절충안을 제안합니다. 학습 도구로 사용하는 것은 허용하고, 쉬는 시간의 오락 사용만 줄이면 좋겠습니다.',
      terms: [
        { term: '생각합니다', kind: 'estructura' },
        { term: '장점', kind: 'vocabulario' },
        { term: '하지만', kind: 'conector' },
        { term: '그래서', kind: 'conector' },
        { term: '제안합니다', kind: 'vocabulario' },
        { term: '절충안', kind: 'vocabulario' },
        { term: '유용', kind: 'adjetivo' },
        { term: '대신', kind: 'conector' },
      ],
    },
  },
}

function getGrammarReferences(language: WritingLanguage, level: WritingLevel, sequence: number): WritingGrammarReference[] {
  const topics = getTopicsByLevel(language, level)
  if (!topics.length) return []

  const primary = topics[(sequence - 1) % topics.length]
  const overflow = sequence <= topics.length ? [] : [topics[(sequence - 1) % topics.length]]

  return [primary, ...overflow].map(topic => ({
    slug: topic.slug,
    title: topic.shortTitle,
    rationale: `Aplica ${topic.shortTitle} en una respuesta comunicativa del nivel ${level.toUpperCase()}.`,
  }))
}

export function getIntegratedWritingExercise(language: WritingLanguage, level: WritingLevel, sequence = 1): IntegratedWritingExercise {
  const profile = profiles[language]
  const levelData = profile[level]
  const rules = LEVEL_RULES[level]

  return {
    id: `${language}-${level}-integrated-${sequence}`,
    sequence,
    title: levelData.title,
    genre: levelData.genre,
    level,
    language,
    languageLabel: profile.label,
    languageNative: profile.native,
    backHref: `${profile.backBase}/${level}`,
    color: profile.color,
    readingTitle: levelData.readingTitle,
    readingText: levelData.readingText,
    prompt: levelData.prompt,
    minWords: rules.minWords,
    requiredCount: rules.requiredCount,
    requiredTerms: levelData.terms,
    readingFocus: rules.readingFocus,
    planningQuestions: rules.planningQuestions,
    successCriteria: rules.successCriteria,
    modelAnswer: levelData.model,
    modelNote: rules.modelNote,
    cefrDescriptor: rules.cefrDescriptor,
    grammarReferences: getGrammarReferences(language, level, sequence),
  }
}
