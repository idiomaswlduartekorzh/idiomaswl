import type { MockExam } from './types';

// DELF A1 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/a1-2/.

const mock: MockExam = {
  id: 'a1-2',
  examSlug: 'delf-dalf',
  title: 'DELF A1 – Épreuve 2',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 80,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1",
      instructions: "Vous allez entendre de courts dialogues. Choisissez la bonne réponse. Chaque document est écouté deux fois.",
      audioUrl: '/audio/delf/a1-2/co-ex1.mp3',
      transcript: `Dialogue 1 — Homme : Où est la poste, s'il vous plaît ? Femme : Continuez tout droit, puis la première rue à gauche.\n\nDialogue 2 — Enfant : Combien coûte la glace ? Vendeur : Une boule, c'est un euro cinquante.\n\nDialogue 3 — Femme : De quelle couleur est ta nouvelle voiture ? Homme : Elle est bleue.\n\nDialogue 4 — Serveur : Combien de personnes pour le déjeuner ? Client : Nous sommes cinq, avec les enfants.`,
      questions: [
        { type: 'mcq', id: 'delf-a1-2-co1', part: 1, text: 'Pour aller à la poste :', options: ['tout droit, première rue à gauche', 'tout droit, première rue à droite', 'deuxième rue à gauche'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-2-co2', part: 1, text: 'Combien coûte une boule de glace ?', options: ['2,00 €', '1,00 €', '1,50 €'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-2-co3', part: 1, text: 'De quelle couleur est la voiture ?', options: ['Verte', 'Bleue', 'Rouge'], answer: 1 },
        { type: 'mcq', id: 'delf-a1-2-co4', part: 1, text: 'Combien de personnes pour le déjeuner ?', options: ['Trois', 'Cinq', 'Deux'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Annonces",
      instructions: "Vous allez entendre des annonces. Choisissez la bonne réponse. Chaque annonce est écoutée deux fois.",
      audioUrl: '/audio/delf/a1-2/co-ex2.mp3',
      transcript: `Annonce 1 — Chers voyageurs, le bus de la ligne 12 a aujourd'hui dix minutes de retard.\n\nAnnonce 2 — Attention dans le supermarché : aujourd'hui, les fraises sont en promotion, seulement deux euros.\n\nAnnonce 3 — Bonjour. La piscine est fermée aujourd'hui pour réparation.`,
      questions: [
        { type: 'mcq', id: 'delf-a1-2-co5', part: 2, text: 'Le bus de la ligne 12 :', options: ['ouverte le soir', "est à l'heure", 'a dix minutes de retard', 'ne passe pas'], answer: 1 },
        { type: 'mcq', id: 'delf-a1-2-co6', part: 2, text: 'Les fraises coûtent :', options: ['2 euros', '3 euros', '1 euro'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-2-co7', part: 2, text: 'La piscine est :', options: ['fermée aujourd\'hui', 'ouverte'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Un courriel',
      instructions: 'Lisez le courriel et répondez aux questions.',
      passage: `De : Thomas\nÀ : Sarah\nObjet : Piscine\n\nSalut Sarah,\n\nMerci pour ton message ! Oui, je viens avec plaisir à la piscine. Mais dimanche, je ne peux pas, je vais chez ma grand-mère. On peut y aller samedi ? Je suis libre à 14 heures. Amène ton frère aussi. Il va faire beau.\n\nÀ samedi !\nThomas`,
      passageTitle: 'Courriel de Thomas',
      questions: [
        { type: 'mcq', id: 'delf-a1-2-ce1', part: 3, text: 'Thomas veut aller :', options: ['à la piscine', 'au restaurant', 'au cinéma'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-2-ce2', part: 3, text: 'Quand Thomas n\'est-il pas libre ?', options: ['Samedi', 'Dimanche', 'Vendredi'], answer: 1 },
        { type: 'mcq', id: 'delf-a1-2-ce3', part: 3, text: 'À quelle heure Thomas est-il libre samedi ?', options: ['16 h', '12 h', '14 h'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Des annonces',
      instructions: 'Lisez les annonces et répondez aux questions.',
      passage: `Annonce A — Auto-école Martin : permis rapide et pas cher. Théorie en ligne, pratique avec des moniteurs sympas.\n\nAnnonce B — Boulangerie du Coin : pain frais et gâteaux. Ouverte tous les jours à partir de 6 h.\n\nAnnonce C — Bibliothèque du centre : livres, magazines et Internet. Du lundi au vendredi, 10 h – 19 h. Carte gratuite.`,
      passageTitle: 'Annonces',
      questions: [
        { type: 'mcq', id: 'delf-a1-2-ce4', part: 4, text: 'Vous voulez lire un livre. Quelle annonce ?', options: ['Annonce B', 'Annonce C', 'Annonce A'], answer: 1 },
        { type: 'mcq', id: 'delf-a1-2-ce5', part: 4, text: 'Vous voulez passer le permis. Quelle annonce ?', options: ['Annonce A', 'Annonce B', 'Annonce C'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-2-ce6', part: 4, text: 'Vous voulez acheter du pain frais. Quelle annonce ?', options: ['Annonce C', 'Annonce A', 'Annonce B'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite – Exercice 1 : Remplir une fiche',
      instructions: 'Votre amie Yuki veut s\'inscrire dans une salle de sport. Écrivez les informations en phrases.',
      questions: [
        {
          type: 'write', id: 'delf-a1-2-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Fiche d\'inscription',
          stimulus: 'Informations sur Yuki :\n• Nom : Yuki Tanaka\n• Nationalité : japonaise, habite à Paris\n• Âge : 28 ans\n• Profession : médecin\n• Souhaite : s\'entraîner trois fois par semaine, le soir',
          text: 'Écrivez 5 phrases courtes avec les informations sur Yuki (nom, nationalité, ville, âge, profession, souhait).',
          minWords: 20,
        },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Production écrite – Exercice 2 : Un message',
      instructions: 'Écrivez un court message.',
      questions: [
        {
          type: 'write', id: 'delf-a1-2-pe2', part: 6, taskNumber: 2,
          stimulusLabel: 'Invitation à un ami',
          stimulus: 'Situation : Vous voulez jouer au football avec votre ami Ben ce week-end. Écrivez-lui un message.',
          text: 'Écrivez à Ben : 1) une proposition (jouer au foot samedi), 2) où et quand, 3) une demande de réponse. Écrivez 3-4 phrases avec une salutation. (environ 30 mots)',
          minWords: 30,
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 1 : Entretien dirigé',
      instructions: 'Présentez-vous et parlez de vous.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-2-po1', part: 7, partNumber: 1,
          text: 'Présentez-vous : nom, âge, nationalité, ville, langues, profession et loisir. Épelez votre nom et donnez votre numéro de téléphone.',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 2 : Échange d\'informations',
      instructions: 'Posez des questions à partir des mots sur les cartes.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-2-po2', part: 8, partNumber: 2,
          text: 'Posez une question pour chaque mot et répondez aux questions de votre partenaire.',
          cueCard: 'Thème : les loisirs\nMots :\n• Sport\n• Week-end\n• Musique\n• Combien de fois ?\n• Avec qui ?\n\nExemple : « Qu\'est-ce que tu fais le week-end ? »',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Production orale – Partie 3 : Dialogue simulé',
      instructions: 'Jouez une petite scène avec l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-2-po3', part: 9, partNumber: 3,
          text: 'Vous êtes au café. Commandez à boire et à manger, demandez le prix et payez. Utilisez des formules de politesse.',
          cueCard: 'Situation : au café.\nÀ faire :\n• saluer\n• commander une boisson et quelque chose à manger\n• demander le prix\n• payer et remercier\n\nExemple : « Bonjour, je voudrais un café et un croissant, s\'il vous plaît. »',
        },
      ],
    },
  ],
};

export default mock;
