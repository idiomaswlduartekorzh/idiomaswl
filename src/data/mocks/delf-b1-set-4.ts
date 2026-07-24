import type { MockExam } from './types';

// DELF B1 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/b1-4/.

const mock: MockExam = {
  id: 'b1-4',
  examSlug: 'delf-dalf',
  title: 'DELF B1 – Épreuve 4',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 120,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1",
      instructions: "Vous allez entendre un document. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b1-4/co-ex1.mp3',
      transcript: `Journaliste : Nous recevons Julien Faure, qui a créé un potager partagé dans son quartier. Julien, comment est né ce projet ?\nJulien : Il y avait un terrain abandonné, plein de déchets. Au lieu de me plaindre, j'ai réuni quelques voisins et j'ai proposé d'en faire un jardin.\nJournaliste : Les gens ont accepté tout de suite ?\nJulien : Pas vraiment. Au début, beaucoup pensaient que ça ne marcherait pas. Mais peu à peu, quand ils ont vu les premiers légumes pousser, ils sont venus. Aujourd'hui, plus de quarante familles s'occupent du jardin.\nJournaliste : Et que faites-vous de la récolte ?\nJulien : Chaque famille prend ce dont elle a besoin, et le surplus est donné à une crèche voisine. Nous organisons aussi des ateliers gratuits de compostage pour les écoles.\nJournaliste : Un beau projet qui nourrit le corps et le lien social.`,
      questions: [
        { type: 'mcq', id: 'delf-b1-4-co1', part: 1, text: 'Qu\'y avait-il avant le jardin ?', options: ['un terrain abandonné plein de déchets', 'une école', 'un parking'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-4-co2', part: 1, text: 'Au début, les voisins :', options: ['pensaient que ça ne marcherait pas', 'étaient tout de suite enthousiastes', 'ont refusé de participer'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-4-co3', part: 1, text: 'Que fait-on du surplus de la récolte ?', options: ['on le vend cher', 'on le jette', 'on le donne à une crèche voisine'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-4-co4', part: 1, text: 'Que propose aussi le jardin ?', options: ['des cours de sport', 'des concerts', 'des ateliers de compostage pour les écoles'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2",
      instructions: "Vous allez entendre un second document. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b1-4/co-ex2.mp3',
      transcript: `Présentatrice : Aujourd'hui, nous parlons du sommeil avec le docteur Legrand. Docteur, le sommeil est-il si important ?\nDocteur : Absolument. Pendant le sommeil, le cerveau ne se repose pas seulement : il traite les informations de la journée et consolide la mémoire. Mal dormir affecte la concentration et l'humeur.\nPrésentatrice : Beaucoup pensent qu'on peut rattraper le sommeil le week-end.\nDocteur : C'est un mythe. On ne rattrape pas vraiment le sommeil perdu. Le plus important, c'est la régularité : se coucher et se lever à des heures fixes.\nPrésentatrice : Que conseillez-vous d'autre ?\nDocteur : Éviter les écrans avant de dormir, car la lumière bleue perturbe l'endormissement. Et surtout, ne pas considérer le sommeil comme du temps perdu : c'est la base d'une vie saine.\nPrésentatrice : Un conseil précieux, merci docteur.`,
      questions: [
        { type: 'mcq', id: 'delf-b1-4-co5', part: 2, text: 'Pendant le sommeil, le cerveau :', options: ['ne fait rien', 'traite les informations et consolide la mémoire', 'se met en danger'], answer: 1 },
        { type: 'mcq', id: 'delf-b1-4-co6', part: 2, text: 'Peut-on rattraper le sommeil le week-end ?', options: ['seulement en été', 'oui, facilement', 'non, c\'est un mythe'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-4-co7', part: 2, text: 'Qu\'est-ce qui est le plus important selon le docteur ?', options: ['dormir le jour', 'boire du café', 'la régularité'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-4-co8', part: 2, text: 'Que faut-il éviter avant de dormir ?', options: ['manger un fruit', 'les écrans', 'lire un livre'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Article de presse',
      instructions: 'Lisez l\'article et répondez aux questions.',
      passage: `La seconde main a le vent en poupe\n\nAcheter des vêtements, des meubles ou des appareils d'occasion n'est plus vu comme un signe de pauvreté. Pour beaucoup de Français, et surtout pour les jeunes, c'est devenu un choix assumé, voire une fierté. Grâce à des applications et à des boutiques spécialisées, acheter et vendre d'occasion est plus facile que jamais.\n\nLes raisons sont variées. Certains veulent faire des économies ; d'autres recherchent des pièces uniques qu'on ne trouve plus dans le commerce. Mais pour de nombreux jeunes, c'est surtout la protection de l'environnement qui compte. En effet, fabriquer des produits neufs consomme beaucoup de ressources et d'énergie. Acheter d'occasion permet donc de réduire ce gaspillage.\n\nLes experts voient là une tendance positive, mais mettent en garde : certaines personnes achètent tellement d'occasion qu'elles finissent par posséder trop. Ce qui est vraiment durable, ce n'est pas d'acheter beaucoup — neuf ou d'occasion — mais de consommer moins et de façon réfléchie. Le meilleur achat, disent-ils en souriant, est souvent celui qu'on ne fait pas.`,
      passageTitle: 'Article : la seconde main',
      questions: [
        { type: 'mcq', id: 'delf-b1-4-ce1', part: 3, text: 'Comment était perçu l\'achat d\'occasion autrefois ?', options: ['comme illégal', 'comme un signe de richesse', 'comme un signe de pauvreté'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-4-ce2', part: 3, text: 'Pour beaucoup de jeunes, la raison principale est :', options: ['la mode', 'la facilité', 'la protection de l\'environnement'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-4-ce3', part: 3, text: 'Contre quoi les experts mettent-ils en garde ?', options: ['acheter trop, même d\'occasion', 'ne jamais acheter', 'acheter uniquement du neuf'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-4-ce4', part: 3, text: 'Qu\'est-ce qui est vraiment durable selon les experts ?', options: ['jeter les vieux objets', 'acheter beaucoup', 'consommer moins et de façon réfléchie'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Document pratique',
      instructions: 'Lisez le courriel et répondez aux questions.',
      passage: `De : Association sportive du quartier\nÀ : Membres\nObjet : Fête de fin de saison\n\nChers membres,\n\nComme chaque année, nous organisons notre fête de fin de saison le samedi 24 juin, à partir de 12 h, au parc des Sports. Au programme : tournoi amical, repas partagé et remise des récompenses aux jeunes.\n\nChaque famille est invitée à apporter un plat à partager (salé ou sucré). Les boissons seront fournies par l'association. En cas de mauvais temps, la fête aura lieu dans la salle municipale. Merci de confirmer votre présence avant le 18 juin en répondant à ce courriel, en précisant le nombre de personnes.\n\nSportivement,\nLe bureau de l'association`,
      passageTitle: 'Courriel de l\'association',
      questions: [
        { type: 'mcq', id: 'delf-b1-4-ce5', part: 4, text: 'Quand a lieu la fête ?', options: ['le 24 juin à partir de 12 h', 'le 24 juin le soir', 'le 18 juin'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-4-ce6', part: 4, text: 'Que doit apporter chaque famille ?', options: ['un plat à partager', 'des boissons', 'de l\'argent'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-4-ce7', part: 4, text: 'Que faire avant le 18 juin ?', options: ['apporter un cadeau', 'payer une cotisation', 'confirmer sa présence par courriel'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite : Essai / Prise de position',
      instructions: 'Donnez votre opinion sur un sujet (environ 160 mots).',
      questions: [
        {
          type: 'write', id: 'delf-b1-4-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Essai',
          stimulus: 'Sur un forum, on débat : « Acheter d\'occasion est-il vraiment une bonne solution pour l\'environnement ? » Vous participez au débat et donnez votre avis.',
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
          type: 'speak', id: 'delf-b1-4-po1', part: 6, partNumber: 1,
          text: 'Présentez-vous et parlez de vous : votre quotidien, vos habitudes de consommation, vos valeurs et vos projets.',
          cueCard: 'Thèmes :\n• votre quotidien\n• vos habitudes de consommation\n• ce qui est important pour vous\n• vos projets',
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 2 : Monologue suivi',
      instructions: 'Exprimez votre opinion sur un sujet.',
      questions: [
        {
          type: 'speak', id: 'delf-b1-4-po2', part: 7, partNumber: 2,
          text: 'Réagissez au sujet suivant et donnez votre point de vue de manière structurée (environ 3 minutes).',
          cueCard: 'Sujet : « L\'importance du sommeil dans la vie moderne »\nPistes :\n• présentez le sujet\n• pourquoi le sommeil est important\n• ce qui empêche de bien dormir aujourd\'hui\n• vos conseils / votre expérience\n• conclusion',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 3 : Exercice en interaction',
      instructions: 'Discutez avec l\'examinateur pour trouver une solution commune.',
      questions: [
        {
          type: 'speak', id: 'delf-b1-4-po3', part: 8, partNumber: 3,
          text: 'Vous voulez organiser une action pour l\'environnement dans votre quartier avec un ami. Discutez et mettez-vous d\'accord.',
          cueCard: 'Situation : une action pour l\'environnement.\nÀ discuter :\n• quelle action (ramassage de déchets, plantation, troc…)\n• quand et où\n• comment informer les habitants\n• le matériel nécessaire\n\nRedemittel : « Et si on… ? » / « Je ne suis pas sûr que… » / « On pourrait finalement… »',
        },
      ],
    },
  ],
};

export default mock;
