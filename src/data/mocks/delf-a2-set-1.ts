import type { MockExam } from './types';

// DELF A2 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/a2-1/.

const mock: MockExam = {
  id: 'a2-1',
  examSlug: 'delf-dalf',
  title: 'DELF A2 – Épreuve 1',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1 : Messages",
      instructions: "Vous allez entendre plusieurs courts documents. Choisissez la bonne réponse. Chaque document est écouté deux fois.",
      audioUrl: '/audio/delf/a2-1/co-ex1.mp3',
      transcript: `Message 1 — Bonjour, c'est le cabinet du docteur Renaud. Votre rendez-vous de jeudi est déplacé à vendredi, à la même heure, 15 heures.\n\nMessage 2 — Salut, c'est Léa. On se retrouve finalement à 20 heures devant le cinéma, pas à 19 heures. À ce soir !\n\nMessage 3 — Annonce en gare : le train à destination de Bordeaux partira avec un retard de quinze minutes.\n\nMessage 4 — Bonjour, ici la médiathèque. Le livre que vous avez réservé est disponible. Vous pouvez venir le chercher avant samedi.`,
      questions: [
        { type: 'mcq', id: 'delf-a2-1-co1', part: 1, text: 'Le rendez-vous chez le médecin est déplacé à :', options: ['samedi', 'jeudi', 'vendredi'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-1-co2', part: 1, text: 'Léa propose de se retrouver à :', options: ['20 heures', '18 heures', '19 heures'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-1-co3', part: 1, text: 'Le train pour Bordeaux a un retard de :', options: ['5 minutes', '15 minutes', '30 minutes'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-1-co4', part: 1, text: 'Que doit faire la personne à la médiathèque ?', options: ['payer une amende', 'rendre un livre', 'venir chercher un livre avant samedi'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Dialogue",
      instructions: "Vous allez entendre un dialogue. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/a2-1/co-ex2.mp3',
      transcript: `Vendeuse : Bonjour, je peux vous aider ?\nClient : Oui, je cherche un manteau pour l'hiver, quelque chose de chaud.\nVendeuse : Quelle taille faites-vous ?\nClient : Du 42. Et je préfère une couleur foncée, noir ou bleu marine.\nVendeuse : J'ai ce manteau noir en taille 42. Il coûte 89 euros.\nClient : Il me plaît. Je peux l'essayer ?\nVendeuse : Bien sûr, la cabine est au fond à droite.\nClient : ... Il me va bien, je le prends. Je peux payer par carte ?\nVendeuse : Oui, bien sûr.`,
      questions: [
        { type: 'mcq', id: 'delf-a2-1-co5', part: 2, text: 'Le client cherche :', options: ['un pull d\'été', 'des chaussures', 'un manteau d\'hiver'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-1-co6', part: 2, text: 'Quelle couleur préfère le client ?', options: ['une couleur claire', 'une couleur foncée', 'du rouge'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-1-co7', part: 2, text: 'Le manteau coûte :', options: ['99 euros', '79 euros', '89 euros'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-1-co8', part: 2, text: 'Le client paie :', options: ['par carte', 'par chèque', 'en espèces'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Un article',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `Un nouveau système de vélos en libre-service\n\nDepuis le mois dernier, notre ville propose un nouveau système de vélos en libre-service. À plus de cinquante stations, on peut prendre un vélo et le rendre à n'importe quelle autre station. L'utilisation est simple : on télécharge une application sur son téléphone, on s'inscrit et on scanne un code sur le vélo.\n\nLa première demi-heure est gratuite, ensuite chaque heure coûte un euro. Les étudiants et les personnes âgées bénéficient d'une réduction. La ville espère que beaucoup de gens laisseront leur voiture et prendront le vélo. C'est bon pour l'environnement et pour la santé.`,
      passageTitle: 'Article : vélos en libre-service',
      questions: [
        { type: 'mcq', id: 'delf-a2-1-ce1', part: 3, text: 'Comment utilise-t-on le service ?', options: ['on téléphone à la mairie', 'on télécharge une application et on scanne un code', 'on achète un ticket'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-1-ce2', part: 3, text: 'La première demi-heure est :', options: ['à deux euros', 'gratuite', 'à un euro'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-1-ce3', part: 3, text: 'Qui bénéficie d\'une réduction ?', options: ['les étudiants et les personnes âgées', 'les enfants seulement', 'les touristes'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Petites annonces',
      instructions: 'Lisez les situations et les annonces. Choisissez la bonne annonce.',
      passage: `Annonce A — Cherche personne pour aider au déménagement samedi. Porter des cartons et des meubles. Bonne rémunération.\n\nAnnonce B — Cours de français A2/B1 : petits groupes, professeurs expérimentés, préparation aux examens. Début la semaine prochaine.\n\nAnnonce C — Garde d'animaux : je m'occupe de votre chien ou chat pendant vos vacances. Sérieuse et attentionnée.\n\nAnnonce D — Vends meubles d'occasion : canapé, table et chaises en bon état. À venir chercher.`,
      passageTitle: 'Petites annonces',
      questions: [
        { type: 'mcq', id: 'delf-a2-1-ce4', part: 4, text: 'Vous partez en vacances et avez un chat. Quelle annonce ?', options: ['Annonce D', 'Annonce A', 'Annonce B', 'Annonce C'], answer: 3 },
        { type: 'mcq', id: 'delf-a2-1-ce5', part: 4, text: 'Vous voulez préparer un examen de français. Quelle annonce ?', options: ['Annonce C', 'Annonce D', 'Annonce A', 'Annonce B'], answer: 3 },
        { type: 'mcq', id: 'delf-a2-1-ce6', part: 4, text: 'Vous cherchez un petit travail pour samedi. Quelle annonce ?', options: ['Annonce B', 'Annonce C', 'Annonce D', 'Annonce A'], answer: 3 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite – Exercice 1 : Décrire une expérience',
      instructions: 'Écrivez un court texte sur une expérience personnelle (environ 60 mots).',
      questions: [
        {
          type: 'write', id: 'delf-a2-1-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Décrire un week-end',
          stimulus: 'Vous racontez votre dernier week-end à un ami français.',
          text: 'Écrivez un court texte (environ 60 mots) : racontez ce que vous avez fait le week-end dernier (où, avec qui, quelles activités) et donnez votre opinion. Utilisez le passé composé.',
          minWords: 60,
        },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Production écrite – Exercice 2 : Un courriel',
      instructions: 'Écrivez un courriel (environ 60 mots).',
      questions: [
        {
          type: 'write', id: 'delf-a2-1-pe2', part: 6, taskNumber: 2,
          stimulusLabel: 'Courriel à un ami',
          stimulus: 'Situation : Un ami vous a invité à une fête samedi, mais vous ne pouvez pas venir. Répondez-lui.',
          text: 'Écrivez un courriel (environ 60 mots) : 1) remerciez pour l\'invitation, 2) refusez en donnant une raison, 3) proposez de vous voir un autre jour. Avec salutation et formule de politesse.',
          minWords: 60,
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 1 : Entretien dirigé',
      instructions: "Répondez aux questions de l'examinateur sur vous-même.",
      questions: [
        {
          type: 'speak', id: 'delf-a2-1-po1', part: 7, partNumber: 1,
          text: 'Parlez de vous : votre famille, votre travail ou vos études, vos loisirs, votre journée habituelle et vos projets.',
          cueCard: 'Thèmes possibles :\n• votre famille\n• votre travail / vos études\n• vos loisirs\n• votre routine\n• vos projets pour le futur',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 2 : Monologue suivi',
      instructions: 'Parlez d\'un sujet de façon continue.',
      questions: [
        {
          type: 'speak', id: 'delf-a2-1-po2', part: 8, partNumber: 2,
          text: 'Choisissez un sujet et parlez-en pendant environ 2 minutes.',
          cueCard: 'Sujet : « Ma ville »\nParlez de :\n• où vous habitez\n• comment est votre ville\n• ce que vous aimez / n\'aimez pas\n• ce qu\'on peut y faire\n• si vous voulez y rester',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Production orale – Partie 3 : Exercice en interaction',
      instructions: 'Jouez une scène avec l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-a2-1-po3', part: 9, partNumber: 3,
          text: 'Vous voulez organiser une sortie au restaurant avec un ami. Discutez et mettez-vous d\'accord.',
          cueCard: 'Situation : organiser une sortie au restaurant.\nÀ discuter :\n• quel jour et à quelle heure\n• quel type de restaurant\n• où se retrouver\n• qui invite d\'autres amis\n\nExemple : « On pourrait aller au restaurant italien samedi soir ? »',
        },
      ],
    },
  ],
};

export default mock;
