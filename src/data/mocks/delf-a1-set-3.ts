import type { MockExam } from './types';

// DELF A1 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/a1-3/.

const mock: MockExam = {
  id: 'a1-3',
  examSlug: 'delf-dalf',
  title: 'DELF A1 – Épreuve 3',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 80,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1",
      instructions: "Vous allez entendre de courts dialogues. Choisissez la bonne réponse. Chaque document est écouté deux fois.",
      audioUrl: '/audio/delf/a1-3/co-ex1.mp3',
      transcript: `Dialogue 1 — Homme : À quelle heure ouvre la pharmacie ? Femme : À huit heures et demie le matin.\n\nDialogue 2 — Femme : Comment vas-tu au travail ? Homme : À vélo, ça prend seulement dix minutes.\n\nDialogue 3 — Enfant : Où sont mes chaussures ? Père : Elles sont sous le lit.\n\nDialogue 4 — Vendeuse : Vous désirez autre chose ? Client : Oui, un kilo de pommes, s'il vous plaît.`,
      questions: [
        { type: 'mcq', id: 'delf-a1-3-co1', part: 1, text: 'La pharmacie ouvre à :', options: ['9 h 30', '8 h 00', '8 h 30'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-3-co2', part: 1, text: "L'homme va au travail :", options: ['en bus', 'en voiture', 'à vélo'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-3-co3', part: 1, text: 'Où sont les chaussures ?', options: ['près de la porte', 'sous le lit', 'dans l\'armoire'], answer: 1 },
        { type: 'mcq', id: 'delf-a1-3-co4', part: 1, text: 'Que veut acheter le client ?', options: ['des pommes', 'des bananes', 'des poires'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Annonces",
      instructions: "Vous allez entendre des annonces. Choisissez la bonne réponse. Chaque annonce est écoutée deux fois.",
      audioUrl: '/audio/delf/a1-3/co-ex2.mp3',
      transcript: `Annonce 1 — Chers clients, le petit-déjeuner est servi de 7 h à 10 h au restaurant, au premier étage.\n\nAnnonce 2 — Attention : l'ascenseur est en panne aujourd'hui. Merci de prendre l'escalier.\n\nAnnonce 3 — Bonjour, ici le capitaine. Nous atterrissons à Paris dans vingt minutes.`,
      questions: [
        { type: 'mcq', id: 'delf-a1-3-co5', part: 2, text: 'Le petit-déjeuner est servi :', options: ['au premier étage', 'au rez-de-chaussée', 'au deuxième étage'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-3-co6', part: 2, text: "L'ascenseur :", options: ['est réservé', 'fonctionne', 'est en panne'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-3-co7', part: 2, text: "L'avion atterrit à :", options: ['Paris', 'Nice', 'Lyon'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Un courriel',
      instructions: 'Lisez le courriel et répondez aux questions.',
      passage: `De : Amir\nÀ : Madame Berger\nObjet : Cours de lundi\n\nBonjour Madame Berger,\n\nJe ne peux pas venir au cours de français lundi. J'ai un rendez-vous chez le médecin à 10 heures. Pouvez-vous m'envoyer les devoirs par courriel ? Je reviens mercredi.\n\nMerci beaucoup,\nAmir Hassan`,
      passageTitle: 'Courriel d\'Amir',
      questions: [
        { type: 'mcq', id: 'delf-a1-3-ce1', part: 3, text: 'Amir ne peut pas venir :', options: ['lundi', 'mardi', 'mercredi'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-3-ce2', part: 3, text: 'Amir a un rendez-vous :', options: ['au travail', 'chez le coiffeur', 'chez le médecin'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-3-ce3', part: 3, text: 'Que demande Amir ?', options: ['un autre professeur', 'de changer d\'heure', 'les devoirs par courriel'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Des annonces',
      instructions: 'Lisez les annonces et répondez aux questions.',
      passage: `Annonce A — École de danse Rythme : salsa, tango et plus. Cours pour débutants tous les mardis à 19 h.\n\nAnnonce B — Cabinet dentaire Dr Été : nouveaux patients bienvenus. Rendez-vous aussi le samedi.\n\nAnnonce C — Café du Lac : café, gâteaux et glaces. Belle vue sur le lac. Ouvert tous les jours 10 h – 20 h.`,
      passageTitle: 'Annonces',
      questions: [
        { type: 'mcq', id: 'delf-a1-3-ce4', part: 4, text: 'Vous voulez apprendre à danser. Quelle annonce ?', options: ['Annonce A', 'Annonce B', 'Annonce C'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-3-ce5', part: 4, text: 'Vous avez mal aux dents. Quelle annonce ?', options: ['Annonce C', 'Annonce A', 'Annonce B'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-3-ce6', part: 4, text: 'Vous voulez un café avec une belle vue. Quelle annonce ?', options: ['Annonce B', 'Annonce C', 'Annonce A'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite – Exercice 1 : Remplir une fiche',
      instructions: 'Votre ami Carlos veut ouvrir un compte en banque. Écrivez les informations en phrases.',
      questions: [
        {
          type: 'write', id: 'delf-a1-3-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Formulaire de banque',
          stimulus: 'Informations sur Carlos :\n• Nom : Carlos Mendes\n• Nationalité : portugaise, habite à Marseille\n• Âge : 31 ans\n• Profession : cuisinier\n• Souhaite : un nouveau compte, avec une carte bancaire',
          text: 'Écrivez 5 phrases courtes avec les informations sur Carlos (nom, nationalité, ville, âge, profession, souhait).',
          minWords: 20,
        },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Production écrite – Exercice 2 : Un message',
      instructions: 'Écrivez un court message.',
      questions: [
        {
          type: 'write', id: 'delf-a1-3-pe2', part: 6, taskNumber: 2,
          stimulusLabel: 'Message à un voisin',
          stimulus: 'Situation : Vous partez une semaine en vacances. Votre voisin Monsieur Petit doit arroser vos plantes. Écrivez-lui un message.',
          text: 'Écrivez à Monsieur Petit : 1) la raison (vous partez en vacances), 2) une demande (arroser les plantes), 3) un remerciement. 3-4 phrases avec salutation. (environ 30 mots)',
          minWords: 30,
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 1 : Entretien dirigé',
      instructions: 'Présentez-vous et parlez de vous.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-3-po1', part: 7, partNumber: 1,
          text: 'Présentez-vous : nom, âge, nationalité, ville, langues, profession et loisir. Épelez votre nom et donnez votre numéro de téléphone.',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 2 : Échange d\'informations',
      instructions: 'Posez des questions à partir des mots sur les cartes.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-3-po2', part: 8, partNumber: 2,
          text: 'Posez une question pour chaque mot et répondez aux questions de votre partenaire.',
          cueCard: 'Thème : la nourriture\nMots :\n• Petit-déjeuner\n• Boisson\n• Restaurant\n• Aimer quoi ?\n• Quand ?\n\nExemple : « Qu\'est-ce que tu manges au petit-déjeuner ? »',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Production orale – Partie 3 : Dialogue simulé',
      instructions: 'Jouez une petite scène avec l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-3-po3', part: 9, partNumber: 3,
          text: 'Vous êtes au marché. Achetez des fruits et légumes, demandez le prix et payez. Utilisez des formules de politesse.',
          cueCard: 'Situation : au marché.\nÀ faire :\n• saluer\n• demander deux ou trois produits (pommes, tomates…)\n• demander le prix\n• payer et remercier\n\nExemple : « Bonjour, je voudrais un kilo de tomates, s\'il vous plaît. »',
        },
      ],
    },
  ],
};

export default mock;
