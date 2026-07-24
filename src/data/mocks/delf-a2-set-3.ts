import type { MockExam } from './types';

// DELF A2 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/a2-3/.

const mock: MockExam = {
  id: 'a2-3',
  examSlug: 'delf-dalf',
  title: 'DELF A2 – Épreuve 3',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1 : Messages",
      instructions: "Vous allez entendre plusieurs courts documents. Choisissez la bonne réponse. Chaque document est écouté deux fois.",
      audioUrl: '/audio/delf/a2-3/co-ex1.mp3',
      transcript: `Message 1 — Bonjour, c'est la mairie. Votre dossier est complet. Vous pouvez venir chercher votre carte lundi prochain.\n\nMessage 2 — Salut, c'est Julie. On change de restaurant : on va au « Petit Sud » au lieu du « Grand Café ». Rendez-vous à 20 h.\n\nMessage 3 — Annonce dans le magasin : chers clients, une réduction de 30 % sur tous les manteaux ce week-end seulement.\n\nMessage 4 — Bonjour, ici le dentiste. Votre rendez-vous de mardi est confirmé pour 14 heures.`,
      questions: [
        { type: 'mcq', id: 'delf-a2-3-co1', part: 1, text: 'Quand peut-on chercher la carte à la mairie ?', options: ['lundi prochain', 'mardi', 'aujourd\'hui'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-3-co2', part: 1, text: 'Dans quel restaurant vont-ils finalement ?', options: ['le Grand Café', 'le Petit Sud', 'chez Julie'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-3-co3', part: 1, text: 'La réduction est de :', options: ['50 %', '20 %', '30 %'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-3-co4', part: 1, text: 'Le rendez-vous chez le dentiste est à :', options: ['14 h', '16 h', '12 h'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Dialogue",
      instructions: "Vous allez entendre un dialogue. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/a2-3/co-ex2.mp3',
      transcript: `Médecin : Bonjour, Monsieur Petit. Qu'est-ce qui ne va pas ?\nPatient : Bonjour, docteur. Depuis trois jours, j'ai mal à la tête et je suis très fatigué.\nMédecin : Avez-vous de la fièvre ?\nPatient : Oui, hier soir j'avais 38,5 degrés.\nMédecin : Vous dormez bien ?\nPatient : Pas très bien, j'ai beaucoup de stress au travail en ce moment.\nMédecin : C'est sans doute un rhume, mais le stress n'aide pas. Je vous prescris un médicament. Prenez-le trois fois par jour. Et reposez-vous deux jours à la maison.\nPatient : Merci, docteur.`,
      questions: [
        { type: 'mcq', id: 'delf-a2-3-co5', part: 2, text: 'Depuis combien de temps le patient est-il malade ?', options: ['un jour', 'trois jours', 'une semaine'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-3-co6', part: 2, text: 'Le patient a :', options: ['mal aux jambes', 'mal au ventre', 'mal à la tête et de la fièvre'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-3-co7', part: 2, text: 'Combien de fois par jour prendre le médicament ?', options: ['deux fois', 'trois fois', 'une fois'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-3-co8', part: 2, text: 'Le médecin conseille de :', options: ['travailler plus', 'se reposer deux jours', 'faire du sport'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Un article',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `Des jardins partagés dans la ville\n\nDe plus en plus de villes créent des jardins partagés. Ce sont des espaces où les habitants d'un quartier peuvent cultiver des légumes et des fleurs ensemble. Chaque personne ou famille s'occupe d'un petit morceau de terrain, mais tout le monde partage les outils et l'eau.\n\nCes jardins ont beaucoup d'avantages. Ils permettent de manger des légumes frais, de passer du temps dehors et de rencontrer ses voisins. Pour beaucoup de gens qui vivent en appartement, c'est une chance d'avoir un espace vert. Les enfants apprennent aussi d'où viennent les aliments. Pour participer, il suffit souvent de s'inscrire auprès de l'association du quartier.`,
      passageTitle: 'Article : jardins partagés',
      questions: [
        { type: 'mcq', id: 'delf-a2-3-ce1', part: 3, text: 'Dans un jardin partagé, les habitants :', options: ['vendent des voitures', 'cultivent des légumes et des fleurs ensemble', 'font du sport'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-3-ce2', part: 3, text: 'Qu\'est-ce que tout le monde partage ?', options: ['les outils et l\'eau', 'l\'argent', 'la nourriture'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-3-ce3', part: 3, text: 'Pour participer, il faut :', options: ['payer 100 euros', 's\'inscrire auprès de l\'association', 'habiter une maison'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Petites annonces',
      instructions: 'Lisez les situations et les annonces. Choisissez la bonne annonce.',
      passage: `Annonce A — Cherche baby-sitter pour deux enfants (4 et 6 ans), deux après-midi par semaine.\n\nAnnonce B — Vélo à vendre : vélo de ville en bon état, peu utilisé. 120 euros. À voir.\n\nAnnonce C — Cours d'informatique pour seniors : apprenez à utiliser Internet, les courriels et les appels vidéo. Petits groupes.\n\nAnnonce D — Restaurant cherche serveur/serveuse pour le week-end. Expérience non nécessaire, on vous forme.`,
      passageTitle: 'Petites annonces',
      questions: [
        { type: 'mcq', id: 'delf-a2-3-ce4', part: 4, text: 'Vous cherchez un petit travail le week-end. Quelle annonce ?', options: ['Annonce D', 'Annonce A', 'Annonce B', 'Annonce C'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-3-ce5', part: 4, text: 'Votre grand-mère veut apprendre l\'ordinateur. Quelle annonce ?', options: ['Annonce C', 'Annonce D', 'Annonce A', 'Annonce B'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-3-ce6', part: 4, text: 'Vous cherchez un vélo pas cher. Quelle annonce ?', options: ['Annonce B', 'Annonce C', 'Annonce D', 'Annonce A'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite – Exercice 1 : Décrire une expérience',
      instructions: 'Écrivez un court texte sur une expérience personnelle (environ 60 mots).',
      questions: [
        {
          type: 'write', id: 'delf-a2-3-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Décrire une fête',
          stimulus: 'Vous racontez une fête à laquelle vous avez participé récemment.',
          text: 'Écrivez un court texte (environ 60 mots) : racontez une fête récente (quelle occasion, où, avec qui, ce que vous avez fait) et donnez votre opinion. Utilisez le passé composé.',
          minWords: 60,
        },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Production écrite – Exercice 2 : Un courriel',
      instructions: 'Écrivez un courriel (environ 60 mots).',
      questions: [
        {
          type: 'write', id: 'delf-a2-3-pe2', part: 6, taskNumber: 2,
          stimulusLabel: 'Courriel à une amie',
          stimulus: 'Situation : Vous êtes malade et vous ne pouvez pas aller à un cours de sport avec votre amie demain. Écrivez-lui.',
          text: 'Écrivez un courriel (environ 60 mots) : 1) annulez, 2) donnez la raison (vous êtes malade), 3) proposez de vous voir la semaine prochaine. Avec salutation et formule de politesse.',
          minWords: 60,
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 1 : Entretien dirigé',
      instructions: "Répondez aux questions de l'examinateur sur vous-même.",
      questions: [
        {
          type: 'speak', id: 'delf-a2-3-po1', part: 7, partNumber: 1,
          text: 'Parlez de vous : votre alimentation, votre santé, vos habitudes, votre logement et vos projets.',
          cueCard: 'Thèmes possibles :\n• ce que vous aimez manger\n• le sport et la santé\n• vos habitudes quotidiennes\n• votre logement\n• vos projets',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 2 : Monologue suivi',
      instructions: 'Parlez d\'un sujet de façon continue.',
      questions: [
        {
          type: 'speak', id: 'delf-a2-3-po2', part: 8, partNumber: 2,
          text: 'Choisissez un sujet et parlez-en pendant environ 2 minutes.',
          cueCard: 'Sujet : « La nourriture »\nParlez de :\n• ce que vous aimez / n\'aimez pas manger\n• si vous cuisinez\n• un plat typique de votre pays\n• manger au restaurant ou à la maison\n• bien manger, est-ce important ?',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Production orale – Partie 3 : Exercice en interaction',
      instructions: 'Jouez une scène avec l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-a2-3-po3', part: 9, partNumber: 3,
          text: 'Vous voulez faire du sport avec un ami. Discutez des possibilités et mettez-vous d\'accord.',
          cueCard: 'Situation : choisir une activité sportive.\nÀ discuter :\n• quel sport (foot, natation, vélo…)\n• quel jour et à quelle heure\n• où (parc, salle de sport)\n• le matériel nécessaire\n\nExemple : « Ça te dit d\'aller courir dimanche matin ? »',
        },
      ],
    },
  ],
};

export default mock;
