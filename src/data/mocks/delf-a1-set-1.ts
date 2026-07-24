import type { MockExam } from './types';

// DELF A1 — formato oficial CIEP / France Éducation international.
// Épreuves: Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale.
// Conteúdo ORIGINAL WeLearn no formato oficial. Áudio sob /audio/delf/a1-1/ — ver checklist de mídia.

const mock: MockExam = {
  id: 'a1-1',
  examSlug: 'delf-dalf',
  title: 'DELF A1 – Épreuve 1',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 80,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1",
      instructions: "Vous allez entendre de courts dialogues. Choisissez la bonne réponse. Chaque document est écouté deux fois.",
      audioUrl: '/audio/delf/a1-1/co-ex1.mp3',
      transcript: `Dialogue 1 — Femme : Bonjour, je voudrais un café, s'il vous plaît. Serveur : Voilà, madame. Ça fait deux euros.\n\nDialogue 2 — Homme : Excusez-moi, où est la gare ? Passante : Vous allez tout droit, puis vous tournez à droite.\n\nDialogue 3 — Enfant : Maman, quelle heure est-il ? Mère : Il est huit heures et quart. Dépêche-toi pour l'école !\n\nDialogue 4 — Vendeuse : Vous désirez ? Client : Un kilo de pommes, s'il vous plaît.`,
      questions: [
        { type: 'mcq', id: 'delf-a1-1-co1', part: 1, text: 'Combien coûte le café ?', options: ['2 euros', '3 euros', '1 euro'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-1-co2', part: 1, text: 'Pour aller à la gare, il faut :', options: ['prendre le bus', 'tourner à gauche', 'aller tout droit puis à droite'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-1-co3', part: 1, text: 'Quelle heure est-il ?', options: ['8 h 45', '9 h 00', '8 h 15'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-1-co4', part: 1, text: 'Que veut acheter le client ?', options: ['un kilo de poires', 'un kilo de pommes', 'un kilo de bananes'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Annonces",
      instructions: "Vous allez entendre des annonces. Choisissez la bonne réponse. Chaque annonce est écoutée deux fois.",
      audioUrl: '/audio/delf/a1-1/co-ex2.mp3',
      transcript: `Annonce 1 — Attention, mesdames et messieurs. Le train pour Lyon part de la voie 5, et non de la voie 3.\n\nannonce 2 — Chers clients, le magasin ferme dans dix minutes. Merci de vous diriger vers les caisses.\n\nAnnonce 3 — Bonjour. Le cours de français de lundi commence à 18 heures, salle numéro 12.`,
      questions: [
        { type: 'mcq', id: 'delf-a1-1-co5', part: 2, text: 'De quelle voie part le train pour Lyon ?', options: ['Voie 7', 'Voie 3', 'Voie 5'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-1-co6', part: 2, text: 'Le magasin ferme dans :', options: ['une heure', 'cinq minutes', 'dix minutes'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-1-co7', part: 2, text: 'À quelle heure commence le cours de français ?', options: ['16 h', '18 h', '20 h'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Un courriel',
      instructions: 'Lisez le courriel et répondez aux questions.',
      passage: `De : Camille\nÀ : Léa\nObjet : Anniversaire\n\nSalut Léa,\n\nSamedi, c'est mon anniversaire et j'organise une petite fête chez moi. Ça commence à 19 heures. Marc et Julie viennent aussi. Ne prends pas de gâteau, je le prépare moi-même. Tu peux venir ? Réponds-moi avant vendredi.\n\nBisous,\nCamille`,
      passageTitle: 'Courriel de Camille',
      questions: [
        { type: 'mcq', id: 'delf-a1-1-ce1', part: 3, text: "Quand est l'anniversaire de Camille ?", options: ['Dimanche', 'Vendredi', 'Samedi'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-1-ce2', part: 3, text: 'La fête commence à :', options: ['17 heures', '20 heures', '19 heures'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-1-ce3', part: 3, text: 'Que demande Camille à Léa ?', options: ["d'apporter un gâteau", 'de répondre avant vendredi', 'de venir à 17 h'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Des annonces',
      instructions: 'Lisez les annonces et répondez aux questions.',
      passage: `Annonce A — École de langues Paris : cours de français pour débutants. Du lundi au vendredi, le soir. Inscription en ligne.\n\nAnnonce B — Restaurant Le Bistro : menu du midi à 12 euros. Soupe et salade fraîches tous les jours.\n\nAnnonce C — Salle de sport Forme : ouverte tous les jours de 6 h à 23 h. Première semaine gratuite !`,
      passageTitle: 'Annonces',
      questions: [
        { type: 'mcq', id: 'delf-a1-1-ce4', part: 4, text: 'Vous voulez apprendre le français. Quelle annonce ?', options: ['Annonce A', 'Annonce B', 'Annonce C'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-1-ce5', part: 4, text: 'Vous voulez déjeuner pour pas cher. Quelle annonce ?', options: ['Annonce A', 'Annonce B', 'Annonce C'], answer: 1 },
        { type: 'mcq', id: 'delf-a1-1-ce6', part: 4, text: 'Vous voulez faire du sport. Quelle annonce ?', options: ['Annonce A', 'Annonce B', 'Annonce C'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite – Exercice 1 : Remplir une fiche',
      instructions: 'Votre ami Karim veut s\'inscrire à un cours de français. Écrivez les informations en phrases.',
      questions: [
        {
          type: 'write', id: 'delf-a1-1-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Fiche d\'inscription',
          stimulus: 'Informations sur Karim :\n• Nom : Karim Benali\n• Nationalité : marocaine, habite à Lyon\n• Âge : 22 ans\n• Profession : étudiant\n• Souhaite : un cours de français pour débutants, le soir',
          text: 'Écrivez 5 phrases courtes avec les informations sur Karim (nom, nationalité, ville, âge, profession et souhait). Exemple : « Il s\'appelle Karim Benali. »',
          minWords: 20,
        },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Production écrite – Exercice 2 : Un message',
      instructions: 'Écrivez un court message.',
      questions: [
        {
          type: 'write', id: 'delf-a1-1-pe2', part: 6, taskNumber: 2,
          stimulusLabel: 'Message à une amie',
          stimulus: 'Situation : Vous êtes malade et vous ne pouvez pas aller au cours de français aujourd\'hui. Écrivez un message à votre amie Sophie.',
          text: 'Écrivez à Sophie : 1) la raison (vous êtes malade), 2) une demande (pouvez-vous envoyer les devoirs ?), 3) un remerciement. Écrivez 3-4 phrases avec une salutation. (environ 30 mots)',
          minWords: 30,
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 1 : Entretien dirigé',
      instructions: 'Présentez-vous et parlez de vous.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-1-po1', part: 7, partNumber: 1,
          text: 'Présentez-vous : nom, âge, nationalité, ville, langues, profession et loisir. Épelez votre nom et donnez votre numéro de téléphone.',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 2 : Échange d\'informations',
      instructions: 'Posez des questions à partir des mots sur les cartes.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-1-po2', part: 8, partNumber: 2,
          text: 'Posez une question pour chaque mot et répondez aux questions de votre partenaire.',
          cueCard: 'Thème : les courses / le quotidien\nMots :\n• Supermarché\n• Pain\n• Combien ?\n• Où ?\n• Heures d\'ouverture\n\nExemple : « Qu\'est-ce que tu achètes au supermarché ? »',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Production orale – Partie 3 : Dialogue simulé',
      instructions: 'Jouez une petite scène avec l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-1-po3', part: 9, partNumber: 3,
          text: 'Vous êtes dans une boulangerie. Demandez des produits, demandez le prix et payez. Utilisez des formules de politesse.',
          cueCard: 'Situation : à la boulangerie.\nÀ faire :\n• saluer\n• demander deux ou trois produits (pain, croissants…)\n• demander le prix\n• payer et remercier\n\nExemple : « Bonjour, je voudrais deux croissants, s\'il vous plaît. »',
        },
      ],
    },
  ],
};

export default mock;
