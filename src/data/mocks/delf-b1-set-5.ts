import type { MockExam } from './types';

// DELF B1 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/b1-5/.

const mock: MockExam = {
  id: 'b1-5',
  examSlug: 'delf-dalf',
  title: 'DELF B1 – Épreuve 5',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 120,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1",
      instructions: "Vous allez entendre un document. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b1-5/co-ex1.mp3',
      transcript: `Journaliste : Nous recevons Nadia, professeure qui a lancé un club de lecture dans son collège. Nadia, pourquoi ce projet ?\nNadia : Je remarquais que mes élèves lisaient de moins en moins. Je voulais leur redonner le goût de la lecture, mais sans obligation, sans note.\nJournaliste : Comment fonctionne le club ?\nNadia : On se retrouve une fois par semaine, le midi. Chacun peut proposer un livre, une bande dessinée, ce qu'il aime. On en discute librement, autour d'un thé.\nJournaliste : Et les résultats ?\nNadia : Impressionnants. Des élèves qui ne lisaient jamais se sont mis à dévorer des livres. Certains disent même que c'est devenu leur moment préféré de la semaine.\nJournaliste : La clé, c'était donc la liberté ?\nNadia : Exactement. Quand on force, on dégoûte. Quand on laisse choisir, on donne envie.`,
      questions: [
        { type: 'mcq', id: 'delf-b1-5-co1', part: 1, text: 'Pourquoi Nadia a-t-elle lancé le club ?', options: ['elle avait trop de temps libre', 'le directeur l\'a obligée', 'les élèves lisaient de moins en moins'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-5-co2', part: 1, text: 'Comment fonctionne le club ?', options: ['on lit un livre imposé', 'chacun propose ce qu\'il aime, sans note', 'on passe des examens'], answer: 1 },
        { type: 'mcq', id: 'delf-b1-5-co3', part: 1, text: 'Quels sont les résultats ?', options: ['les élèves détestent le club', 'aucun changement', 'des élèves qui ne lisaient jamais se sont mis à lire'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-5-co4', part: 1, text: 'Selon Nadia, quelle est la clé ?', options: ['la note', 'l\'obligation', 'la liberté de choisir'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2",
      instructions: "Vous allez entendre un second document. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b1-5/co-ex2.mp3',
      transcript: `Présentatrice : Aujourd'hui, nous parlons de la gestion du temps avec le coach Antoine Mercier. Antoine, beaucoup se plaignent de manquer de temps.\nAntoine : Oui, mais souvent, le problème n'est pas le temps lui-même, c'est la façon dont on l'utilise.\nPrésentatrice : Quelle est l'erreur la plus courante ?\nAntoine : Vouloir tout faire en même temps. Les études montrent que faire plusieurs choses à la fois nous rend en réalité plus lents et moins efficaces. Il vaut mieux se concentrer sur une seule tâche.\nPrésentatrice : Un autre conseil ?\nAntoine : Fixer des priorités. Chaque matin, je me demande : quelles sont les deux ou trois choses vraiment importantes aujourd'hui ? Si je les fais, la journée est réussie.\nPrésentatrice : Et les pauses ?\nAntoine : Essentielles. Sans pause, on devient fatigué et inefficace. Il faut planifier non seulement le travail, mais aussi le repos.\nPrésentatrice : Merci pour ces conseils précieux.`,
      questions: [
        { type: 'mcq', id: 'delf-b1-5-co5', part: 2, text: 'Selon Antoine, le vrai problème est :', options: ['la façon dont on utilise le temps', 'le manque de temps', 'trop de vacances'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-5-co6', part: 2, text: 'Que montrent les études sur le fait de tout faire en même temps ?', options: ['ça n\'a aucun effet', 'ça rend plus efficace', 'ça rend plus lent et moins efficace'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-5-co7', part: 2, text: 'Que conseille Antoine chaque matin ?', options: ['dormir plus', 'travailler sans pause', 'fixer des priorités'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-5-co8', part: 2, text: 'Que dit-il des pauses ?', options: ['elles sont inutiles', 'elles sont essentielles', 'il faut les éviter'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Article de presse',
      instructions: 'Lisez l\'article et répondez aux questions.',
      passage: `Le retour du train de nuit\n\nPendant des années, les trains de nuit ont presque disparu en Europe, remplacés par l'avion et les trains à grande vitesse. Mais aujourd'hui, ils font leur grand retour. De nouvelles lignes relient à nouveau de grandes villes européennes pendant la nuit.\n\nPlusieurs raisons expliquent ce retour. D'abord, la préoccupation pour l'environnement : le train pollue beaucoup moins que l'avion. Voyager de nuit permet aussi de gagner du temps, puisqu'on dort pendant le trajet et qu'on arrive le matin, reposé et en plein centre-ville, sans passer par un aéroport lointain.\n\nBien sûr, tout n'est pas parfait. Les billets peuvent être chers, et le confort varie selon les compagnies. Certains voyageurs regrettent le manque de lignes. Mais la tendance est claire : de plus en plus de personnes, surtout des jeunes soucieux du climat, choisissent le train de nuit. Pour beaucoup, c'est aussi une façon plus lente et plus agréable de voyager, loin du stress des aéroports.`,
      passageTitle: 'Article : le train de nuit',
      questions: [
        { type: 'mcq', id: 'delf-b1-5-ce1', part: 3, text: 'Que s\'est-il passé avec les trains de nuit ?', options: ['ils n\'ont jamais existé', 'ils ont totalement disparu pour toujours', 'ils font leur retour aujourd\'hui'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-5-ce2', part: 3, text: 'Une raison de ce retour est :', options: ['le prix très bas', 'la disparition des avions', 'la préoccupation pour l\'environnement'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-5-ce3', part: 3, text: 'Quel inconvénient est mentionné ?', options: ['les billets peuvent être chers', 'les trains sont trop rapides', 'il n\'y a pas de gares'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-5-ce4', part: 3, text: 'Qui choisit surtout le train de nuit ?', options: ['personne', 'les jeunes soucieux du climat', 'seulement les personnes âgées'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Document pratique',
      instructions: 'Lisez le courriel et répondez aux questions.',
      passage: `De : Médiathèque municipale\nÀ : Abonnés\nObjet : Nouveaux horaires et services\n\nChers abonnés,\n\nÀ partir du 1er octobre, la médiathèque sera ouverte plus longtemps : du mardi au samedi, de 10 h à 19 h (au lieu de 18 h). Le lundi reste fermé.\n\nNous lançons également un nouveau service : le prêt de tablettes numériques, gratuit pour les abonnés, pour une durée de trois semaines. De plus, chaque premier mercredi du mois, un atelier gratuit d'aide à l'utilisation d'Internet sera proposé aux personnes qui le souhaitent, sur inscription à l'accueil.\n\nPour profiter de ces services, votre carte d'abonné doit être à jour. En cas de question, notre équipe est à votre disposition.\n\nBien à vous,\nL'équipe de la médiathèque`,
      passageTitle: 'Courriel de la médiathèque',
      questions: [
        { type: 'mcq', id: 'delf-b1-5-ce5', part: 4, text: 'Jusqu\'à quelle heure la médiathèque sera-t-elle ouverte ?', options: ['19 h', '20 h', '18 h'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-5-ce6', part: 4, text: 'Quel nouveau service est proposé ?', options: ['le prêt de tablettes numériques', 'un café', 'un cinéma'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-5-ce7', part: 4, text: 'Que faut-il pour l\'atelier Internet ?', options: ['apporter son ordinateur', 's\'inscrire à l\'accueil', 'payer 10 euros'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite : Essai / Prise de position',
      instructions: 'Donnez votre opinion sur un sujet (environ 160 mots).',
      questions: [
        {
          type: 'write', id: 'delf-b1-5-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Essai',
          stimulus: 'Sur un forum, on débat : « Vaut-il mieux voyager lentement (train, vélo) ou rapidement (avion) ? » Vous participez au débat et donnez votre avis.',
          text: 'Écrivez un texte cohérent (environ 160 mots) : 1) présentez le sujet, 2) donnez votre opinion, 3) apportez au moins deux arguments avec des exemples, 4) concluez. Utilisez des connecteurs logiques.',
          minWords: 160,
        },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Production orale – Partie 1 : Entretien dirigé',
      instructions: "Présentez-vous et répondez aux questions de l'examinateur.",
      questions: [
        {
          type: 'speak', id: 'delf-b1-5-po1', part: 6, partNumber: 1,
          text: 'Présentez-vous et parlez de vous : vos voyages, vos loisirs, votre rapport à la lecture et vos projets.',
          cueCard: 'Thèmes :\n• vos voyages\n• vos loisirs\n• aimez-vous lire ?\n• vos projets futurs',
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 2 : Monologue suivi',
      instructions: 'Exprimez votre opinion sur un sujet.',
      questions: [
        {
          type: 'speak', id: 'delf-b1-5-po2', part: 7, partNumber: 2,
          text: 'Réagissez au sujet suivant et donnez votre point de vue de manière structurée (environ 3 minutes).',
          cueCard: 'Sujet : « Faut-il encourager la lecture chez les jeunes ? »\nPistes :\n• présentez le sujet\n• pourquoi les jeunes lisent moins\n• les bienfaits de la lecture\n• comment donner le goût de lire\n• conclusion',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 3 : Exercice en interaction',
      instructions: 'Discutez avec l\'examinateur pour trouver une solution commune.',
      questions: [
        {
          type: 'speak', id: 'delf-b1-5-po3', part: 8, partNumber: 3,
          text: 'Vous voulez organiser un voyage en groupe pour votre classe de français. Discutez avec un camarade et mettez-vous d\'accord.',
          cueCard: 'Situation : organiser un voyage de classe.\nÀ discuter :\n• la destination\n• le moyen de transport (train, bus, avion ?)\n• la durée et les dates\n• le budget\n• les activités sur place\n\nRedemittel : « Je pense qu\'il serait mieux de… » / « Oui, mais le problème, c\'est que… » / « On est d\'accord pour… »',
        },
      ],
    },
  ],
};

export default mock;
