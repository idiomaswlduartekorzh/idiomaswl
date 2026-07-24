import type { MockExam } from './types';

// DELF A2 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/a2-5/.

const mock: MockExam = {
  id: 'a2-5',
  examSlug: 'delf-dalf',
  title: 'DELF A2 – Épreuve 5',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1 : Messages",
      instructions: "Vous allez entendre plusieurs courts documents. Choisissez la bonne réponse. Chaque document est écouté deux fois.",
      audioUrl: '/audio/delf/a2-5/co-ex1.mp3',
      transcript: `Message 1 — Bonjour, c'est votre pharmacie. Votre médicament est arrivé. Vous pouvez venir le chercher aujourd'hui avant 19 heures.\n\nMessage 2 — Salut, c'est Emma. La réunion de demain est annulée. On la reporte à lundi prochain, même heure.\n\nMessage 3 — Annonce à l'aéroport : les passagers du vol pour Rome sont priés de se présenter porte 15.\n\nMessage 4 — Bonjour, ici le restaurant Le Jardin. Votre réservation de samedi soir pour quatre personnes est confirmée.`,
      questions: [
        { type: 'mcq', id: 'delf-a2-5-co1', part: 1, text: 'Avant quelle heure chercher le médicament ?', options: ['17 heures', '19 heures', '21 heures'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-5-co2', part: 1, text: 'La réunion est reportée à :', options: ['jamais', 'demain', 'lundi prochain'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-5-co3', part: 1, text: 'Les passagers pour Rome vont à la porte :', options: ['15', '50', '5'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-5-co4', part: 1, text: 'La réservation au restaurant est pour :', options: ['deux personnes', 'quatre personnes', 'six personnes'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Dialogue",
      instructions: "Vous allez entendre un dialogue. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/a2-5/co-ex2.mp3',
      transcript: `Vendeur : Bonjour, je peux vous aider ?\nCliente : Oui, je cherche un cadeau pour mon mari. Il aime beaucoup cuisiner.\nVendeur : Alors, peut-être quelque chose pour la cuisine ? Nous avons ce livre de recettes ou ce joli set de couteaux.\nCliente : Le livre me plaît. Il coûte combien ?\nVendeur : 25 euros. Le set de couteaux, lui, coûte 60 euros.\nCliente : Je prends le livre. Vous pouvez faire un paquet cadeau ?\nVendeur : Bien sûr, c'est gratuit. Un instant, s'il vous plaît.`,
      questions: [
        { type: 'mcq', id: 'delf-a2-5-co5', part: 2, text: 'La cliente cherche un cadeau pour :', options: ['sa mère', 'son mari', 'sa fille'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-5-co6', part: 2, text: 'Son mari aime :', options: ['cuisiner', 'lire', 'le sport'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-5-co7', part: 2, text: 'La cliente achète :', options: ['le set de couteaux', 'le livre de recettes', 'rien'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-5-co8', part: 2, text: 'Le paquet cadeau est :', options: ['indisponible', 'payant', 'gratuit'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Un article',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `Un « café réparation » ouvre dans le quartier\n\nUn grille-pain cassé, une lampe qui ne marche plus, un vélo avec un problème ? Au lieu de tout jeter, on peut maintenant venir au nouveau « café réparation ». Là-bas, des bénévoles aident à réparer les objets, et c'est gratuit. Il faut seulement payer les pièces de rechange neuves.\n\nL'idée vient des Pays-Bas et devient populaire en France. « Nous voulons montrer qu'on peut réparer beaucoup de choses au lieu d'en acheter de nouvelles. C'est bon pour le porte-monnaie et pour l'environnement », explique l'organisatrice. Le café réparation est ouvert un samedi sur deux, de 14 h à 17 h. On y sert aussi du café et des gâteaux.`,
      passageTitle: 'Article : café réparation',
      questions: [
        { type: 'mcq', id: 'delf-a2-5-ce1', part: 3, text: 'La réparation est :', options: ['très chère', 'impossible', 'gratuite, sauf les pièces neuves'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-5-ce2', part: 3, text: 'Le café est ouvert :', options: ['tous les jours', 'un samedi sur deux', 'seulement le dimanche'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-5-ce3', part: 3, text: 'Réparer est bon pour :', options: ['rien', 'le porte-monnaie et l\'environnement', 'seulement les magasins'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Petites annonces',
      instructions: 'Lisez les situations et les annonces. Choisissez la bonne annonce.',
      passage: `Annonce A — Cours de natation pour enfants dès 5 ans. Le samedi matin à la piscine. Petits groupes, moniteurs diplômés.\n\nAnnonce B — Chambre à louer dans une colocation étudiante : 15 m², meublée, à partir du mois prochain. 350 euros charges comprises.\n\nAnnonce C — Permanence gratuite d'aide aux devoirs pour les collégiens, chaque mercredi après-midi à la médiathèque.\n\nAnnonce D — Vends landau et lit de bébé, très bon état. 90 euros les deux. Contactez-moi.`,
      passageTitle: 'Petites annonces',
      questions: [
        { type: 'mcq', id: 'delf-a2-5-ce4', part: 4, text: 'Vous êtes étudiant et cherchez une chambre. Quelle annonce ?', options: ['Annonce D', 'Annonce A', 'Annonce B', 'Annonce C'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-5-ce5', part: 4, text: 'Votre enfant a besoin d\'aide pour ses devoirs. Quelle annonce ?', options: ['Annonce C', 'Annonce D', 'Annonce A', 'Annonce B'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-5-ce6', part: 4, text: 'Vous voulez inscrire votre enfant à la natation. Quelle annonce ?', options: ['Annonce B', 'Annonce C', 'Annonce D', 'Annonce A'], answer: 3 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite – Exercice 1 : Décrire une expérience',
      instructions: 'Écrivez un court texte sur une expérience personnelle (environ 60 mots).',
      questions: [
        {
          type: 'write', id: 'delf-a2-5-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Décrire une journée spéciale',
          stimulus: 'Vous racontez une journée spéciale (un anniversaire, une visite, un événement) à un ami français.',
          text: 'Écrivez un court texte (environ 60 mots) : racontez une journée spéciale (quand, où, avec qui, ce qui s\'est passé) et donnez votre opinion. Utilisez le passé composé.',
          minWords: 60,
        },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Production écrite – Exercice 2 : Un courriel',
      instructions: 'Écrivez un courriel (environ 60 mots).',
      questions: [
        {
          type: 'write', id: 'delf-a2-5-pe2', part: 6, taskNumber: 2,
          stimulusLabel: 'Courriel de réclamation',
          stimulus: 'Situation : Vous avez acheté un objet sur Internet, mais il est arrivé cassé. Écrivez un courriel au magasin.',
          text: 'Écrivez un courriel (environ 60 mots) : 1) expliquez le problème (objet cassé), 2) demandez une solution (remboursement ou échange), 3) demandez une réponse rapide. Avec salutation et formule de politesse.',
          minWords: 60,
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 1 : Entretien dirigé',
      instructions: "Répondez aux questions de l'examinateur sur vous-même.",
      questions: [
        {
          type: 'speak', id: 'delf-a2-5-po1', part: 7, partNumber: 1,
          text: 'Parlez de vous : votre journée type, votre travail ou vos études, vos loisirs, votre ville et vos projets.',
          cueCard: 'Thèmes possibles :\n• votre journée type\n• votre travail / vos études\n• vos loisirs\n• votre ville\n• vos projets futurs',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 2 : Monologue suivi',
      instructions: 'Parlez d\'un sujet de façon continue.',
      questions: [
        {
          type: 'speak', id: 'delf-a2-5-po2', part: 8, partNumber: 2,
          text: 'Choisissez un sujet et parlez-en pendant environ 2 minutes.',
          cueCard: 'Sujet : « Le travail / les études »\nParlez de :\n• ce que vous faites (travail ou études)\n• ce que vous aimez / n\'aimez pas\n• une journée typique\n• vos collègues ou camarades\n• vos projets professionnels',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Production orale – Partie 3 : Exercice en interaction',
      instructions: 'Jouez une scène avec l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-a2-5-po3', part: 9, partNumber: 3,
          text: 'Vous organisez une fête surprise pour un ami avec un autre ami. Discutez et mettez-vous d\'accord.',
          cueCard: 'Situation : organiser une fête surprise.\nÀ discuter :\n• quand et où\n• qui inviter\n• la nourriture et les boissons\n• un cadeau\n• comment garder le secret\n\nExemple : « On pourrait faire la fête chez moi vendredi soir ? »',
        },
      ],
    },
  ],
};

export default mock;
