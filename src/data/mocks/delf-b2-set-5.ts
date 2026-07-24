import type { MockExam } from './types';

// DELF B2 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/b2-5/.

const mock: MockExam = {
  id: 'b2-5',
  examSlug: 'delf-dalf',
  title: 'DELF B2 – Épreuve 5',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 150,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1 : Interview",
      instructions: "Vous allez entendre une interview. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b2-5/co-ex1.mp3',
      transcript: `Journaliste : Nous accueillons Antoine Mercier, urbaniste, qui travaille sur la place de la voiture en ville. Monsieur Mercier, faut-il vraiment bannir la voiture des centres-villes ?\nAntoine Mercier : « Bannir » est un mot trop fort. L'objectif n'est pas d'interdire, mais de rééquilibrer l'espace. Aujourd'hui, la voiture occupe la majeure partie de la voirie alors qu'elle transporte une minorité de personnes.\nJournaliste : Certains commerçants craignent pourtant de perdre leur clientèle.\nAntoine Mercier : C'est une crainte compréhensible, mais les études montrent souvent le contraire : quand une rue devient piétonne, la fréquentation augmente. Les gens s'y attardent, consomment davantage.\nJournaliste : Et ceux qui habitent loin et dépendent de leur voiture ?\nAntoine Mercier : Là est le vrai enjeu. On ne peut pas restreindre la voiture sans offrir d'alternatives crédibles : transports en commun fiables, pistes cyclables sûres. Sinon, ce sont les plus modestes qu'on pénalise. Une ville apaisée doit être une ville juste.\nJournaliste : Une transition à mener avec prudence, donc.`,
      questions: [
        { type: 'mcq', id: 'delf-b2-5-co1', part: 1, text: 'Quel est l\'objectif selon Antoine Mercier ?', options: ['interdire totalement la voiture', 'construire plus de parkings', 'rééquilibrer l\'espace, pas interdire la voiture'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-5-co2', part: 1, text: 'Que montrent souvent les études sur les rues piétonnes ?', options: ['la fréquentation augmente', 'les commerces ferment tous', 'personne n\'y vient'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-5-co3', part: 1, text: 'Quel est « le vrai enjeu » ?', options: ['supprimer les transports en commun', 'offrir des alternatives crédibles à ceux qui dépendent de la voiture', 'augmenter le prix de l\'essence'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-5-co4', part: 1, text: 'Que risque-t-on sans alternatives ?', options: ['enrichir tout le monde', 'réduire la pollution instantanément', 'pénaliser les plus modestes'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Reportage",
      instructions: "Vous allez entendre un reportage. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b2-5/co-ex2.mp3',
      transcript: `Reporter : Dans cette entreprise de la région lyonnaise, la semaine de quatre jours n'est plus une utopie, mais une réalité depuis deux ans. J'ai rencontré sa directrice, Sophie Lambert.\nSophie Lambert : Au départ, nous étions sceptiques. Travailler un jour de moins sans baisser les salaires, cela semblait risqué. Nous avons décidé de tenter l'expérience pendant six mois, pour évaluer.\nReporter : Et le bilan ?\nSophie Lambert : Bien meilleur que prévu. La productivité n'a pas baissé, au contraire. Les salariés arrivent plus reposés, plus concentrés. Le taux d'absentéisme a chuté de moitié.\nReporter : Y a-t-il eu des difficultés ?\nSophie Lambert : Bien sûr. Il a fallu réorganiser les plannings, revoir certaines réunions jugées inutiles. Ce n'est pas magique : cela demande de la rigueur. Mais je ne reviendrais en arrière pour rien au monde.\nReporter : Une expérience qui inspire aujourd'hui d'autres entreprises de la région.`,
      questions: [
        { type: 'mcq', id: 'delf-b2-5-co5', part: 2, text: 'Qu\'est-ce qui est en place depuis deux ans ?', options: ['la semaine de quatre jours', 'le télétravail total', 'la suppression des congés'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-5-co6', part: 2, text: 'Quelle était l\'attitude initiale de la directrice ?', options: ['elle refusait d\'en parler', 'elle était sceptique', 'elle était totalement convaincue'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-5-co7', part: 2, text: 'Quel a été l\'effet sur l\'absentéisme ?', options: ['il a doublé', 'il n\'a pas changé', 'il a chuté de moitié'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-5-co8', part: 2, text: 'Qu\'a-t-il fallu faire pour réussir ?', options: ['réorganiser les plannings et revoir les réunions inutiles', 'embaucher deux fois plus', 'baisser les salaires'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Texte informatif',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `Les « fermes urbaines » : cultiver la ville\n\nSur les toits, dans les parkings désaffectés ou d'anciens entrepôts, les fermes urbaines se multiplient dans les grandes villes. L'idée séduit : produire des fruits, des légumes ou des champignons au cœur même des zones densément peuplées, au plus près des consommateurs.\n\nLes avantages sont réels. Ces cultures réduisent les distances de transport, donc les émissions liées à l'acheminement des aliments. Elles offrent aussi des produits frais, récoltés à maturité, et créent du lien social : de nombreux projets associent les habitants du quartier, qui viennent jardiner ou apprendre.\n\nIl faut toutefois se garder de l'enthousiasme excessif. Les surfaces disponibles en ville restent limitées, et les fermes urbaines ne nourriront jamais une métropole entière. Certaines installations, très technologiques, consomment par ailleurs beaucoup d'énergie, ce qui réduit leur bénéfice écologique.\n\nLeur intérêt est donc moins de remplacer l'agriculture traditionnelle que de la compléter, tout en reconnectant les citadins à la production alimentaire. À ce titre, elles jouent un rôle autant pédagogique et social qu'économique.`,
      passageTitle: 'Texte : les fermes urbaines',
      questions: [
        { type: 'mcq', id: 'delf-b2-5-ce1', part: 3, text: 'Où s\'installent les fermes urbaines ?', options: ['dans les océans', 'sur les toits, parkings désaffectés, anciens entrepôts', 'uniquement à la campagne'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-5-ce2', part: 3, text: 'Quel avantage écologique est cité ?', options: ['augmenter les importations', 'consommer plus de carburant', 'réduire les distances de transport et les émissions'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-5-ce3', part: 3, text: 'Quelle limite le texte souligne-t-il ?', options: ['les surfaces en ville restent limitées', 'elles produisent trop', 'elles sont interdites'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-5-ce4', part: 3, text: 'Quel est finalement leur intérêt principal ?', options: ['faire disparaître les campagnes', 'compléter l\'agriculture et reconnecter les citadins', 'remplacer toute l\'agriculture'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Texte argumentatif',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `Les notes à l'école : évaluer ou classer ?\n\nDepuis des générations, la note chiffrée règne dans les écoles. Un devoir, une interrogation, un examen : tout se traduit par un chiffre censé mesurer objectivement le niveau de l'élève. Ce système, pourtant, est de plus en plus contesté.\n\nSes partisans y voient un repère clair et universel. La note permettrait de situer chacun, de motiver par l'effort récompensé, et de préparer les élèves à un monde compétitif où la performance est mesurée.\n\nMais ses détracteurs soulignent ses effets pervers. La note peut décourager durablement un élève en difficulté, réduire l'apprentissage à la seule recherche du bon résultat, et transformer la classe en compétition permanente. Elle dit rarement ce que l'élève doit faire pour progresser.\n\nCertaines écoles expérimentent donc l'évaluation par compétences, sans notes chiffrées, remplacées par des appréciations détaillées. Les résultats sont encourageants, même si le changement déstabilise parfois parents et enseignants. Au fond, la question n'est pas tant de noter ou non, que de savoir à quoi sert l'évaluation : classer les élèves, ou les aider à grandir ?`,
      passageTitle: 'Texte : faut-il supprimer les notes ?',
      questions: [
        { type: 'mcq', id: 'delf-b2-5-ce5', part: 4, text: 'Quel argument avancent les partisans de la note ?', options: ['elle est inutile', 'elle décourage tout le monde', 'un repère clair et universel qui motive'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-5-ce6', part: 4, text: 'Quel effet pervers soulignent les détracteurs ?', options: ['elle peut décourager durablement et créer une compétition permanente', 'elle rend tous les élèves égaux', 'elle supprime les examens'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-5-ce7', part: 4, text: 'Qu\'expérimentent certaines écoles ?', options: ['des notes plus sévères', 'l\'évaluation par compétences sans notes chiffrées', 'la suppression de l\'école'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-5-ce8', part: 4, text: 'Quelle est la vraie question posée en conclusion ?', options: ['comment noter plus vite ?', 'faut-il fermer les écoles ?', 'à quoi sert l\'évaluation : classer ou aider à grandir ?'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite : Prise de position argumentée',
      instructions: 'Rédigez un texte argumenté (environ 250 mots).',
      questions: [
        {
          type: 'write', id: 'delf-b2-5-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Lettre / article argumenté',
          stimulus: 'Le conseil de votre établissement envisage de supprimer les notes chiffrées au profit d\'une évaluation par compétences. Vous écrivez au journal de l\'école pour donner votre point de vue.',
          text: 'Rédigez un texte argumenté (environ 250 mots) : 1) présentez la problématique, 2) exposez les arguments pour et contre la suppression des notes, 3) défendez votre position avec des exemples, 4) concluez. Soignez la structure, les connecteurs et un registre soutenu.',
          minWords: 220,
        },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Production orale – Monologue suivi',
      instructions: 'Présentez et défendez votre point de vue à partir d\'un court document déclencheur.',
      questions: [
        {
          type: 'speak', id: 'delf-b2-5-po1', part: 6, partNumber: 1,
          text: 'Dégagez le problème soulevé par le document, puis présentez votre opinion de manière construite et argumentée.',
          cueCard: 'Document déclencheur : « De plus en plus de villes réduisent la place de la voiture dans leur centre. »\n\nStructure :\n• dégagez la problématique\n• présentez les enjeux (pollution, commerces, équité sociale)\n• arguments pour et contre\n• votre position argumentée\n• conclusion',
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Interaction / Débat',
      instructions: 'Défendez votre point de vue face à l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-b2-5-po2', part: 7, partNumber: 2,
          text: 'Débattez avec l\'examinateur sur la question suivante et défendez votre position en tenant compte des contre-arguments.',
          cueCard: 'Question : « La semaine de quatre jours devrait-elle se généraliser ? »\n\nPistes :\n• le bien-être et la productivité des salariés\n• les contraintes d\'organisation pour l\'entreprise\n• l\'égalité entre secteurs (tous ne peuvent pas l\'adopter)\n• votre position nuancée\n\nRedemittel (B2) : « On aurait tort de croire que… » / « Il n\'en reste pas moins que… » / « Tout bien pesé, il me semble que… »',
        },
      ],
    },
  ],
};

export default mock;
