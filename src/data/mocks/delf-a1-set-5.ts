import type { MockExam } from './types';

// DELF A1 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/a1-5/.

const mock: MockExam = {
  id: 'a1-5',
  examSlug: 'delf-dalf',
  title: 'DELF A1 – Épreuve 5',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 80,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1",
      instructions: "Vous allez entendre de courts dialogues. Choisissez la bonne réponse. Chaque document est écouté deux fois.",
      audioUrl: '/audio/delf/a1-5/co-ex1.mp3',
      transcript: `Dialogue 1 — Femme : Quel temps fait-il aujourd'hui ? Homme : Il pleut et il fait froid.\n\nDialogue 2 — Vendeur : Quelle pointure faites-vous ? Cliente : Du trente-huit, s'il vous plaît.\n\nDialogue 3 — Enfant : Quand papa rentre-t-il ? Mère : À six heures ce soir.\n\nDialogue 4 — Homme : Où travailles-tu ? Femme : Dans un hôpital, je suis infirmière.`,
      questions: [
        { type: 'mcq', id: 'delf-a1-5-co1', part: 1, text: 'Quel temps fait-il ?', options: ['il fait beau', 'il pleut et il fait froid', 'il neige'], answer: 1 },
        { type: 'mcq', id: 'delf-a1-5-co2', part: 1, text: 'Quelle pointure fait la cliente ?', options: ['40', '36', '38'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-5-co3', part: 1, text: 'Papa rentre à :', options: ['6 heures du matin', '8 heures', '6 heures du soir'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-5-co4', part: 1, text: 'Où travaille la femme ?', options: ['dans une école', 'dans un hôpital', 'dans un bureau'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Annonces",
      instructions: "Vous allez entendre des annonces. Choisissez la bonne réponse. Chaque annonce est écoutée deux fois.",
      audioUrl: '/audio/delf/a1-5/co-ex2.mp3',
      transcript: `Annonce 1 — Chers voyageurs, à cause de travaux, le tramway ligne 3 ne circule pas aujourd'hui. Prenez le bus.\n\nAnnonce 2 — Attention : un enfant cherche sa maman. Merci de venir à l'accueil au rez-de-chaussée.\n\nAnnonce 3 — Bonjour. La banque est aujourd'hui ouverte seulement jusqu'à 13 heures.`,
      questions: [
        { type: 'mcq', id: 'delf-a1-5-co5', part: 2, text: 'Le tramway ligne 3 :', options: ['est en retard', 'circule normalement', 'ne circule pas'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-5-co6', part: 2, text: 'Un enfant cherche :', options: ['son chien', 'son sac', 'sa maman'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-5-co7', part: 2, text: 'La banque ferme aujourd\'hui à :', options: ['13 heures', '17 heures', '18 heures'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Un courriel',
      instructions: 'Lisez le courriel et répondez aux questions.',
      passage: `De : Antonio\nÀ : Monsieur Wagner\nObjet : Barbecue de samedi\n\nBonjour Monsieur Wagner,\n\nMerci pour l'invitation au barbecue de samedi. Je viens avec plaisir ! Est-ce que je peux apporter quelque chose ? Une salade ou des boissons ? Dites-moi. Je viens aussi avec ma femme. Nous sommes très contents.\n\nCordialement,\nAntonio Rossi`,
      passageTitle: 'Courriel d\'Antonio',
      questions: [
        { type: 'mcq', id: 'delf-a1-5-ce1', part: 3, text: 'Antonio va au barbecue :', options: ['peut-être', 'oui, avec plaisir', 'non'], answer: 1 },
        { type: 'mcq', id: 'delf-a1-5-ce2', part: 3, text: 'Le barbecue est :', options: ['samedi', 'vendredi', 'dimanche'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-5-ce3', part: 3, text: 'Antonio vient :', options: ['seul', 'avec sa femme', 'avec ses enfants'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Des annonces',
      instructions: 'Lisez les annonces et répondez aux questions.',
      passage: `Annonce A — Cours de cuisine « Miam ! » : apprenez à cuisiner des plats français. Le samedi 15 h – 18 h. Ingrédients inclus.\n\nAnnonce B — Pressing Éclair : nous lavons et repassons vos vêtements. Prêt en 24 heures.\n\nAnnonce C — Cinéma pour enfants le dimanche : films pour toute la famille. Début 10 h. Entrée 4 euros.`,
      passageTitle: 'Annonces',
      questions: [
        { type: 'mcq', id: 'delf-a1-5-ce4', part: 4, text: 'Vous voulez apprendre à cuisiner. Quelle annonce ?', options: ['Annonce C', 'Annonce A', 'Annonce B'], answer: 1 },
        { type: 'mcq', id: 'delf-a1-5-ce5', part: 4, text: 'Votre chemise est sale. Quelle annonce ?', options: ['Annonce B', 'Annonce C', 'Annonce A'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-5-ce6', part: 4, text: 'Vous voulez voir un film avec vos enfants. Quelle annonce ?', options: ['Annonce A', 'Annonce B', 'Annonce C'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite – Exercice 1 : Remplir une fiche',
      instructions: 'Votre ami Wei veut une carte de club de sport. Écrivez les informations en phrases.',
      questions: [
        {
          type: 'write', id: 'delf-a1-5-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Formulaire de club de sport',
          stimulus: 'Informations sur Wei :\n• Nom : Wei Chen\n• Nationalité : chinoise, habite à Toulouse\n• Âge : 26 ans\n• Profession : ingénieur\n• Souhaite : jouer au tennis de table, deux fois par semaine',
          text: 'Écrivez 5 phrases courtes avec les informations sur Wei (nom, nationalité, ville, âge, profession, souhait).',
          minWords: 20,
        },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Production écrite – Exercice 2 : Un message',
      instructions: 'Écrivez un court message.',
      questions: [
        {
          type: 'write', id: 'delf-a1-5-pe2', part: 6, taskNumber: 2,
          stimulusLabel: 'Message au propriétaire',
          stimulus: 'Situation : Dans votre appartement, le chauffage ne marche pas. Écrivez un message à votre propriétaire, Monsieur Klein.',
          text: 'Écrivez à Monsieur Klein : 1) le problème (le chauffage ne marche pas), 2) une demande (réparer, s\'il vous plaît), 3) quand vous êtes chez vous. 3-4 phrases avec salutation. (environ 30 mots)',
          minWords: 30,
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 1 : Entretien dirigé',
      instructions: 'Présentez-vous et parlez de vous.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-5-po1', part: 7, partNumber: 1,
          text: 'Présentez-vous : nom, âge, nationalité, ville, langues, profession et loisir. Épelez votre nom et donnez votre numéro de téléphone.',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 2 : Échange d\'informations',
      instructions: 'Posez des questions à partir des mots sur les cartes.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-5-po2', part: 8, partNumber: 2,
          text: 'Posez une question pour chaque mot et répondez aux questions de votre partenaire.',
          cueCard: 'Thème : le logement\nMots :\n• Appartement ou maison ?\n• Chambres\n• Ville ou campagne ?\n• Loyer\n• Depuis quand ?\n\nExemple : « Tu habites dans un appartement ou dans une maison ? »',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Production orale – Partie 3 : Dialogue simulé',
      instructions: 'Jouez une petite scène avec l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-5-po3', part: 9, partNumber: 3,
          text: 'Vous êtes à la gare. Achetez un billet de train, demandez l\'heure et le prix, et payez. Utilisez des formules de politesse.',
          cueCard: 'Situation : au guichet de la gare.\nÀ faire :\n• saluer\n• demander un billet (destination, aller simple ou aller-retour)\n• demander l\'heure du train et le prix\n• payer et remercier\n\nExemple : « Bonjour, je voudrais un billet pour Lyon, s\'il vous plaît. »',
        },
      ],
    },
  ],
};

export default mock;
