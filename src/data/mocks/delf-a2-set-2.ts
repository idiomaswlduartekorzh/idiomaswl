import type { MockExam } from './types';

// DELF A2 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/a2-2/.

const mock: MockExam = {
  id: 'a2-2',
  examSlug: 'delf-dalf',
  title: 'DELF A2 – Épreuve 2',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 100,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1 : Messages",
      instructions: "Vous allez entendre plusieurs courts documents. Choisissez la bonne réponse. Chaque document est écouté deux fois.",
      audioUrl: '/audio/delf/a2-2/co-ex1.mp3',
      transcript: `Message 1 — Bonjour, c'est le garage Auto Plus. Votre voiture est prête. Vous pouvez venir la chercher à partir de demain matin.\n\nMessage 2 — Salut, c'est Marc. Le match de foot n'est pas samedi mais dimanche, à 15 heures. N'oublie pas tes chaussures !\n\nMessage 3 — Annonce météo : ce week-end, le temps sera beau et ensoleillé, avec des températures autour de 25 degrés.\n\nMessage 4 — Bonjour, ici l'école de votre fils. Il est un peu malade, pouvez-vous venir le chercher ?`,
      questions: [
        { type: 'mcq', id: 'delf-a2-2-co1', part: 1, text: 'Quand la voiture est-elle prête ?', options: ['aujourd\'hui', 'à partir de demain matin', 'la semaine prochaine'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-2-co2', part: 1, text: 'Le match de foot est :', options: ['dimanche à 17 h', 'samedi', 'dimanche à 15 h'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-2-co3', part: 1, text: 'Ce week-end, le temps sera :', options: ['beau et ensoleillé', 'froid', 'pluvieux'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-2-co4', part: 1, text: 'Pourquoi l\'école appelle-t-elle ?', options: ['le fils est malade', 'le fils a une bonne note', 'c\'est les vacances'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Dialogue",
      instructions: "Vous allez entendre un dialogue. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/a2-2/co-ex2.mp3',
      transcript: `Réceptionniste : Hôtel du Parc, bonjour.\nClient : Bonjour, je voudrais réserver une chambre pour deux nuits.\nRéceptionniste : Très bien. Pour quelles dates ?\nClient : Du 10 au 12 mai. Une chambre simple, s'il vous plaît.\nRéceptionniste : Un instant... Oui, nous avons une chambre simple. C'est 70 euros par nuit, petit-déjeuner compris.\nClient : Il y a une connexion Internet dans la chambre ?\nRéceptionniste : Oui, le wifi est gratuit. Nous avons aussi un parking, mais il coûte 8 euros par jour.\nClient : Je n'ai pas besoin de parking, je viens en train. Je prends la chambre.\nRéceptionniste : Parfait. C'est à quel nom ?\nClient : Au nom de Girard, Thomas Girard.`,
      questions: [
        { type: 'mcq', id: 'delf-a2-2-co5', part: 2, text: 'Le client veut une chambre :', options: ['familiale', 'double', 'simple'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-2-co6', part: 2, text: 'La chambre coûte par nuit :', options: ['70 euros', '80 euros', '60 euros'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-2-co7', part: 2, text: 'Le wifi est :', options: ['gratuit', 'payant', 'indisponible'], answer: 0 },
        { type: 'mcq', id: 'delf-a2-2-co8', part: 2, text: 'Le client a-t-il besoin d\'un parking ?', options: ['il ne sait pas', 'oui', 'non, il vient en train'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Un article',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `Un café pas comme les autres\n\nDans le centre-ville, un café original vient d'ouvrir. Il s'appelle « Entre les pages » et il mélange café et livres. À chaque table, il y a des étagères pleines de livres que les clients peuvent lire gratuitement. On peut aussi acheter un livre ou apporter un livre à échanger.\n\nLa propriétaire, Madame Leroy, a eu cette idée pendant la pandémie. « Beaucoup de gens se sentaient seuls. Je voulais créer un endroit où on peut lire tranquillement mais aussi être avec d'autres personnes », dit-elle. Le café est ouvert du mardi au dimanche. Le lundi, c'est fermé. Les lectures du vendredi soir ont beaucoup de succès.`,
      passageTitle: 'Article : un café avec des livres',
      questions: [
        { type: 'mcq', id: 'delf-a2-2-ce1', part: 3, text: 'Dans ce café, les clients peuvent :', options: ['seulement acheter des livres', 'emprunter des DVD', 'lire des livres gratuitement'], answer: 2 },
        { type: 'mcq', id: 'delf-a2-2-ce2', part: 3, text: 'Le café est fermé :', options: ['le dimanche', 'le lundi', 'le samedi'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-2-ce3', part: 3, text: 'Que se passe-t-il le vendredi soir ?', options: ['des repas gratuits', 'des concerts', 'des lectures'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Petites annonces',
      instructions: 'Lisez les situations et les annonces. Choisissez la bonne annonce.',
      passage: `Annonce A — Cours de soutien en maths et physique. Étudiant expérimenté aide les élèves. 15 euros de l'heure, aussi en ligne.\n\nAnnonce B — Appartement à louer : 2 pièces, cuisine, salle de bain, 60 m². Centre-ville, libre tout de suite. 800 euros charges comprises.\n\nAnnonce C — Cours de yoga pour débutants : mardi et jeudi à 19 h. Première séance gratuite. Apportez une tenue confortable.\n\nAnnonce D — Brocante dimanche sur la place du marché. De 8 h à 16 h. Vêtements, livres, jouets et plus.`,
      passageTitle: 'Petites annonces',
      questions: [
        { type: 'mcq', id: 'delf-a2-2-ce4', part: 4, text: 'Votre fils a des difficultés en mathématiques. Quelle annonce ?', options: ['Annonce B', 'Annonce C', 'Annonce D', 'Annonce A'], answer: 3 },
        { type: 'mcq', id: 'delf-a2-2-ce5', part: 4, text: 'Vous cherchez un appartement. Quelle annonce ?', options: ['Annonce A', 'Annonce B', 'Annonce C', 'Annonce D'], answer: 1 },
        { type: 'mcq', id: 'delf-a2-2-ce6', part: 4, text: 'Vous voulez acheter des objets d\'occasion. Quelle annonce ?', options: ['Annonce D', 'Annonce A', 'Annonce B', 'Annonce C'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite – Exercice 1 : Décrire une expérience',
      instructions: 'Écrivez un court texte sur une expérience personnelle (environ 60 mots).',
      questions: [
        {
          type: 'write', id: 'delf-a2-2-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Décrire des vacances',
          stimulus: 'Vous racontez vos dernières vacances à un ami français.',
          text: 'Écrivez un court texte (environ 60 mots) : racontez vos dernières vacances (où, avec qui, activités, temps) et donnez votre opinion. Utilisez le passé composé.',
          minWords: 60,
        },
      ],
    },
    {
      part: 6, skill: 'writing', title: 'Production écrite – Exercice 2 : Un courriel',
      instructions: 'Écrivez un courriel (environ 60 mots).',
      questions: [
        {
          type: 'write', id: 'delf-a2-2-pe2', part: 6, taskNumber: 2,
          stimulusLabel: 'Courriel à un collègue',
          stimulus: 'Situation : Un collègue vous invite à dîner chez lui vendredi. Répondez à son invitation.',
          text: 'Écrivez un courriel (environ 60 mots) : 1) remerciez pour l\'invitation, 2) acceptez (ou refusez avec une raison), 3) posez une question (par exemple : faut-il apporter quelque chose ?). Avec salutation et formule de politesse.',
          minWords: 60,
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 1 : Entretien dirigé',
      instructions: "Répondez aux questions de l'examinateur sur vous-même.",
      questions: [
        {
          type: 'speak', id: 'delf-a2-2-po1', part: 7, partNumber: 1,
          text: 'Parlez de vous : vos goûts, votre travail ou vos études, votre ville, vos amis et vos projets.',
          cueCard: 'Thèmes possibles :\n• vos goûts (musique, sport, cuisine)\n• votre travail / vos études\n• votre ville\n• vos amis\n• vos projets',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 2 : Monologue suivi',
      instructions: 'Parlez d\'un sujet de façon continue.',
      questions: [
        {
          type: 'speak', id: 'delf-a2-2-po2', part: 8, partNumber: 2,
          text: 'Choisissez un sujet et parlez-en pendant environ 2 minutes.',
          cueCard: 'Sujet : « Mes loisirs »\nParlez de :\n• ce que vous aimez faire pendant votre temps libre\n• seul ou avec d\'autres ?\n• à quelle fréquence\n• ce que vous voudriez essayer\n• pourquoi les loisirs sont importants',
        },
      ],
    },
    {
      part: 9, skill: 'speaking', title: 'Production orale – Partie 3 : Exercice en interaction',
      instructions: 'Jouez une scène avec l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-a2-2-po3', part: 9, partNumber: 3,
          text: 'Vous voulez organiser un voyage d\'un week-end avec un ami. Discutez et mettez-vous d\'accord.',
          cueCard: 'Situation : organiser un week-end.\nÀ discuter :\n• quelle destination\n• quand partir\n• comment y aller (train, voiture)\n• où dormir\n• le budget\n\nExemple : « Et si on allait à la mer le week-end prochain ? »',
        },
      ],
    },
  ],
};

export default mock;
