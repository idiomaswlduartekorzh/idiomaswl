import type { MockExam } from './types';

// DELF A2 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/a2-4/.

const mock: MockExam = {
  id: 'a2-4',
  examSlug: 'delf-dalf',
  title: 'DELF A2 – Épreuve 4',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1 : Messages",
      instructions: "Vous allez entendre plusieurs courts documents. Choisissez la bonne réponse. Chaque document est écouté deux fois.",
      audioUrl: '/audio/delf/a2-4/co-ex1.mp3',
      transcript: `Message 1 — Bonjour, c'est la bibliothèque. Le livre que vous avez emprunté est en retard. Merci de le rapporter cette semaine.\n\nMessage 2 — Salut, c'est Paul. Je passe te prendre demain à 9 heures en voiture. Attends-moi devant chez toi.\n\nMessage 3 — Annonce en gare : le train pour Marseille partira de la voie 8 et non de la voie 6.\n\nMessage 4 — Bonjour, ici l'agence de voyages. Vos billets d'avion sont prêts. Vous pouvez les récupérer vendredi.`,
      questions: [
        { type: 'mcq', id: 'delf-a2-4-co1', part: 1, text: 'Que doit faire la personne pour la bibliothèque ?', options: ['payer un abonnement', 'emprunter un livre', 'rapporter un livre en retard'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-4-co2', part: 1, text: 'Paul passe prendre la personne à :', options: ['9 heures', '10 heures', '8 heures'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-4-co3', part: 1, text: 'Le train pour Marseille part de la voie :', options: ['6', '8', '10'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-4-co4', part: 1, text: 'Quand récupérer les billets d\'avion ?', options: ['aujourd\'hui', 'jeudi', 'vendredi'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Dialogue",
      instructions: "Vous allez entendre un dialogue. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/a2-4/co-ex2.mp3',
      transcript: `Employée : Agence Soleil Voyages, bonjour.\nCliente : Bonjour, je voudrais réserver un voyage en Espagne pour deux personnes.\nEmployée : Avec plaisir. Pour quand ?\nCliente : Pendant les vacances d'été, en juillet, pour une semaine.\nEmployée : Vous voulez un hôtel près de la plage ?\nCliente : Oui, ce serait bien. Mais pas trop cher. Notre budget est d'environ 1000 euros pour deux.\nEmployée : J'ai un bel hôtel au bord de la mer, avec petit-déjeuner. Pour une semaine, c'est 900 euros pour deux, sans le vol.\nCliente : Et avec le vol ?\nEmployée : Avec le vol, ce serait 1300 euros. C'est un peu au-dessus de votre budget.\nCliente : Hmm, c'est trop cher. Vous avez quelque chose de moins cher ?\nEmployée : Oui, je regarde d'autres offres.`,
      questions: [
        { type: 'mcq', id: 'delf-a2-4-co5', part: 2, text: 'La cliente veut voyager :', options: ['en Italie', 'au Portugal', 'en Espagne'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-4-co6', part: 2, text: 'Elle veut voyager en :', options: ['hiver', 'juillet', 'automne'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-4-co7', part: 2, text: 'L\'hôtel avec le vol coûte :', options: ['1000 euros', '900 euros', '1300 euros'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-4-co8', part: 2, text: 'Pour la cliente, le voyage avec le vol est :', options: ['trop cher', 'gratuit', 'parfait'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Un article',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `Le retour des marchés de producteurs\n\nMalgré les grands supermarchés, les marchés de producteurs sont de plus en plus populaires en France. Sur ces marchés, on achète directement aux agriculteurs des fruits, des légumes, du fromage ou de la viande. Les produits sont souvent plus frais et de meilleure qualité.\n\nBeaucoup de gens aiment aussi le contact humain. On connaît le vendeur, on discute, on demande des conseils pour cuisiner. En achetant directement au producteur, on soutient les agriculteurs de la région et on garde l'argent dans l'économie locale. De plus, il y a moins d'emballages plastique. Ces marchés ont généralement lieu une ou deux fois par semaine, souvent le matin sur la place principale.`,
      passageTitle: 'Article : marchés de producteurs',
      questions: [
        { type: 'mcq', id: 'delf-a2-4-ce1', part: 3, text: 'Sur ces marchés, on achète :', options: ['directement aux agriculteurs', 'seulement des vêtements', 'uniquement en ligne'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-4-ce2', part: 3, text: 'Un avantage cité est :', options: ['moins de choix', 'des produits plus frais', 'des prix très élevés'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-4-ce3', part: 3, text: 'Ces marchés ont lieu :', options: ['une ou deux fois par semaine', 'une fois par an', 'tous les jours'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Petites annonces',
      instructions: 'Lisez les situations et les annonces. Choisissez la bonne annonce.',
      passage: `Annonce A — Cours de guitare pour débutants et confirmés. Professeur patient, horaires flexibles. Première leçon gratuite.\n\nAnnonce B — Cherche colocataire pour un bel appartement. Chambre de 15 m², lumineuse, quartier calme. 400 euros charges comprises.\n\nAnnonce C — Conseils juridiques gratuits pour les locataires : chaque jeudi de 16 h à 18 h à la maison de quartier. Sans rendez-vous.\n\nAnnonce D — Vends poussette, presque neuve, très bon état. 80 euros. À venir chercher.`,
      passageTitle: 'Petites annonces',
      questions: [
        { type: 'mcq', id: 'delf-a2-4-ce4', part: 4, text: 'Vous êtes étudiant et cherchez une chambre. Quelle annonce ?', options: ['Annonce B', 'Annonce C', 'Annonce D', 'Annonce A'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-4-ce5', part: 4, text: 'Vous avez un problème avec votre propriétaire. Quelle annonce ?', options: ['Annonce A', 'Annonce B', 'Annonce C', 'Annonce D'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-4-ce6', part: 4, text: 'Vous voulez apprendre un instrument de musique. Quelle annonce ?', options: ['Annonce D', 'Annonce A', 'Annonce B', 'Annonce C'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite – Exercice 1 : Décrire une expérience',
      instructions: 'Écrivez un court texte sur une expérience personnelle (environ 60 mots).',
      questions: [
        {
          type: 'write', id: 'delf-a2-4-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Décrire une sortie',
          stimulus: 'Vous racontez une sortie récente (au cinéma, au restaurant, à un concert…) à un ami français.',
          text: 'Écrivez un court texte (environ 60 mots) : racontez une sortie récente (où, avec qui, ce que vous avez fait) et donnez votre opinion. Utilisez le passé composé.',
          minWords: 60,
        },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Production écrite – Exercice 2 : Un courriel',
      instructions: 'Écrivez un courriel (environ 60 mots).',
      questions: [
        {
          type: 'write', id: 'delf-a2-4-pe2', part: 6, taskNumber: 2,
          stimulusLabel: 'Courriel à un ami',
          stimulus: 'Situation : Vous avez deux billets pour un concert samedi et vous voulez inviter un ami. Écrivez-lui.',
          text: 'Écrivez un courriel (environ 60 mots) : 1) invitez votre ami au concert (samedi), 2) donnez l\'heure et le lieu, 3) demandez une réponse rapide. Avec salutation et formule de politesse.',
          minWords: 60,
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 1 : Entretien dirigé',
      instructions: "Répondez aux questions de l'examinateur sur vous-même.",
      questions: [
        {
          type: 'speak', id: 'delf-a2-4-po1', part: 7, partNumber: 1,
          text: 'Parlez de vous : vos études ou votre travail, vos passions, votre famille, vos voyages et vos projets.',
          cueCard: 'Thèmes possibles :\n• vos études / votre travail\n• vos passions\n• votre famille\n• un voyage que vous avez fait\n• vos projets',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 2 : Monologue suivi',
      instructions: 'Parlez d\'un sujet de façon continue.',
      questions: [
        {
          type: 'speak', id: 'delf-a2-4-po2', part: 8, partNumber: 2,
          text: 'Choisissez un sujet et parlez-en pendant environ 2 minutes.',
          cueCard: 'Sujet : « Les voyages »\nParlez de :\n• aimez-vous voyager ? où ?\n• avec qui voyagez-vous ?\n• mer, montagne ou ville ?\n• un voyage inoubliable\n• où voulez-vous aller un jour ?',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Production orale – Partie 3 : Exercice en interaction',
      instructions: 'Jouez une scène avec l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-a2-4-po3', part: 9, partNumber: 3,
          text: 'Vous voulez aller au cinéma avec un ami. Discutez du film, de l\'heure et du lieu, et mettez-vous d\'accord.',
          cueCard: 'Situation : aller au cinéma.\nÀ discuter :\n• quel film\n• quel jour et à quelle heure\n• quel cinéma\n• comment y aller\n• manger quelque chose avant ou après ?\n\nExemple : « On pourrait aller voir le nouveau film samedi soir ? »',
        },
      ],
    },
  ],
};

export default mock;
