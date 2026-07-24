import type { MockExam } from './types';

// DELF A1 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/a1-4/.

const mock: MockExam = {
  id: 'a1-4',
  examSlug: 'delf-dalf',
  title: 'DELF A1 – Épreuve 4',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 80,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1",
      instructions: "Vous allez entendre de courts dialogues. Choisissez la bonne réponse. Chaque document est écouté deux fois.",
      audioUrl: '/audio/delf/a1-4/co-ex1.mp3',
      transcript: `Dialogue 1 — Femme : Quel jour sommes-nous aujourd'hui ? Homme : Nous sommes mercredi.\n\nDialogue 2 — Serveur : Que désirez-vous manger ? Client : Une pizza avec une salade, s'il vous plaît.\n\nDialogue 3 — Homme : Combien coûte le billet ? Femme : Il coûte trois euros vingt.\n\nDialogue 4 — Enfant : Où est la gare ? Femme : Là, à droite, à côté de l'hôtel.`,
      questions: [
        { type: 'mcq', id: 'delf-a1-4-co1', part: 1, text: 'Quel jour sommes-nous ?', options: ['Lundi', 'Mercredi', 'Vendredi'], answer: 1 },
        { type: 'mcq', id: 'delf-a1-4-co2', part: 1, text: 'Que veut manger le client ?', options: ['un poisson', 'une soupe', 'une pizza avec une salade'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-4-co3', part: 1, text: 'Combien coûte le billet ?', options: ['3,20 €', '3,00 €', '2,30 €'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-4-co4', part: 1, text: 'Où est la gare ?', options: ["à côté de l'hôtel", 'à côté de la banque', 'à côté de l\'école'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Annonces",
      instructions: "Vous allez entendre des annonces. Choisissez la bonne réponse. Chaque annonce est écoutée deux fois.",
      audioUrl: '/audio/delf/a1-4/co-ex2.mp3',
      transcript: `Annonce 1 — Mesdames et messieurs, le prochain arrêt est la gare centrale. Merci de descendre ici.\n\nAnnonce 2 — Chers clients, aujourd'hui, le poisson frais est en promotion, directement au rayon poissonnerie.\n\nAnnonce 3 — Bonjour. Le cours de français pour avancés est annulé aujourd'hui. Le professeur est malade.`,
      questions: [
        { type: 'mcq', id: 'delf-a1-4-co5', part: 2, text: "Le prochain arrêt est :", options: ['la gare centrale', 'l\'aéroport', 'le centre-ville'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-4-co6', part: 2, text: "Qu'est-ce qui est en promotion ?", options: ['le pain', 'les légumes', 'le poisson frais'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-4-co7', part: 2, text: 'Le cours de français est :', options: ['annulé', 'plus tard', 'à l\'heure'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Un courriel',
      instructions: 'Lisez le courriel et répondez aux questions.',
      passage: `De : Paula\nÀ : Nina\nObjet : Ta nouvelle maison\n\nSalut Nina,\n\nFélicitations pour ta nouvelle maison ! Je voudrais te rendre visite. Le week-end prochain, ça te va ? J'arrive samedi en train et je reste jusqu'à dimanche. Tu peux venir me chercher à la gare ? Mon train arrive à 11 heures. Je suis très contente !\n\nBises,\nPaula`,
      passageTitle: 'Courriel de Paula',
      questions: [
        { type: 'mcq', id: 'delf-a1-4-ce1', part: 3, text: 'Paula veut :', options: ['acheter une maison', 'rendre visite à Nina', 'déménager'], answer: 1 },
        { type: 'mcq', id: 'delf-a1-4-ce2', part: 3, text: 'Paula arrive :', options: ['en avion', 'en voiture', 'en train'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-4-ce3', part: 3, text: 'Le train arrive à :', options: ['12 heures', '10 heures', '11 heures'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Des annonces',
      instructions: 'Lisez les annonces et répondez aux questions.',
      passage: `Annonce A — Docteur Lange, pédiatre : consultations du lundi au vendredi, 8 h – 12 h. Aussi sans rendez-vous.\n\nAnnonce B — Fleuriste Rose : jolis bouquets pour toutes les occasions. Livraison à domicile aussi.\n\nAnnonce C — Café des langues : chaque vendredi soir, parlez français autour d'un café et d'un gâteau. Gratuit !`,
      passageTitle: 'Annonces',
      questions: [
        { type: 'mcq', id: 'delf-a1-4-ce4', part: 4, text: 'Votre enfant est malade. Quelle annonce ?', options: ['Annonce A', 'Annonce B', 'Annonce C'], answer: 0 },
        { type: 'mcq', id: 'delf-a1-4-ce5', part: 4, text: 'Vous voulez acheter des fleurs. Quelle annonce ?', options: ['Annonce C', 'Annonce A', 'Annonce B'], answer: 2 },
        { type: 'mcq', id: 'delf-a1-4-ce6', part: 4, text: 'Vous voulez pratiquer le français gratuitement. Quelle annonce ?', options: ['Annonce B', 'Annonce C', 'Annonce A'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite – Exercice 1 : Remplir une fiche',
      instructions: 'Votre amie Fatima veut une carte de bibliothèque. Écrivez les informations en phrases.',
      questions: [
        {
          type: 'write', id: 'delf-a1-4-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Formulaire de bibliothèque',
          stimulus: 'Informations sur Fatima :\n• Nom : Fatima Yılmaz\n• Nationalité : turque, habite à Nice\n• Âge : 19 ans\n• Profession : lycéenne\n• Souhaite : lire beaucoup de livres, aussi en français',
          text: 'Écrivez 5 phrases courtes avec les informations sur Fatima (nom, nationalité, ville, âge, profession, souhait).',
          minWords: 20,
        },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Production écrite – Exercice 2 : Un message',
      instructions: 'Écrivez un court message.',
      questions: [
        {
          type: 'write', id: 'delf-a1-4-pe2', part: 6, taskNumber: 2,
          stimulusLabel: 'Message à une collègue',
          stimulus: 'Situation : C\'est votre anniversaire demain et vous voulez inviter votre collègue Sarah à dîner. Écrivez-lui un message.',
          text: 'Écrivez à Sarah : 1) l\'occasion (anniversaire), 2) l\'invitation (dîner), 3) où et quand. 3-4 phrases avec salutation. (environ 30 mots)',
          minWords: 30,
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 1 : Entretien dirigé',
      instructions: 'Présentez-vous et parlez de vous.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-4-po1', part: 7, partNumber: 1,
          text: 'Présentez-vous : nom, âge, nationalité, ville, langues, profession et loisir. Épelez votre nom et donnez votre numéro de téléphone.',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 2 : Échange d\'informations',
      instructions: 'Posez des questions à partir des mots sur les cartes.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-4-po2', part: 8, partNumber: 2,
          text: 'Posez une question pour chaque mot et répondez aux questions de votre partenaire.',
          cueCard: 'Thème : les voyages\nMots :\n• Vacances\n• Train ou voiture ?\n• Où ?\n• Combien de temps ?\n• Avec qui ?\n\nExemple : « Où vas-tu en vacances ? »',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Production orale – Partie 3 : Dialogue simulé',
      instructions: 'Jouez une petite scène avec l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-a1-4-po3', part: 9, partNumber: 3,
          text: 'Vous êtes à la boutique de vêtements. Demandez un vêtement, la taille et la couleur, demandez le prix et payez.',
          cueCard: 'Situation : dans une boutique de vêtements.\nÀ faire :\n• saluer\n• demander un vêtement (un pull, une veste…)\n• dire la taille et la couleur\n• demander le prix et payer\n\nExemple : « Bonjour, je cherche un pull bleu, taille M. »',
        },
      ],
    },
  ],
};

export default mock;
