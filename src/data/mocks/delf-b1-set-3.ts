import type { MockExam } from './types';

// DELF B1 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/b1-3/.
// (set-1 et set-2 legacy existent déjà pour le niveau B1 ; ceci ajoute des sujets B1 supplémentaires.)

const mock: MockExam = {
  id: 'b1-3',
  examSlug: 'delf-dalf',
  title: 'DELF B1 – Épreuve 3',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 120,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1",
      instructions: "Vous allez entendre un document. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b1-3/co-ex1.mp3',
      transcript: `Journaliste : Aujourd'hui, nous parlons du bénévolat avec Sophie Marchand, qui coordonne une association d'aide aux personnes âgées. Sophie, en quoi consiste votre travail ?\nSophie : Nos bénévoles rendent visite à des personnes âgées qui vivent seules. Ils discutent, font les courses, accompagnent aux rendez-vous médicaux. Le plus important, c'est de rompre la solitude.\nJournaliste : Est-il facile de trouver des bénévoles ?\nSophie : Pas toujours. Beaucoup de gens veulent aider mais manquent de temps. C'est pourquoi nous proposons des engagements flexibles, même deux heures par semaine, c'est déjà précieux.\nJournaliste : Que diriez-vous à quelqu'un qui hésite ?\nSophie : Que le bénévolat apporte autant à celui qui aide qu'à celui qui reçoit. On rencontre des personnes formidables et on se sent utile. Il ne faut pas hésiter à essayer.`,
      questions: [
        { type: 'mcq', id: 'delf-b1-3-co1', part: 1, text: 'Que font les bénévoles de l\'association ?', options: ['ils rendent visite à des personnes âgées seules', 'ils enseignent le français', 'ils construisent des maisons'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-3-co2', part: 1, text: 'Quel est le but principal ?', options: ['gagner de l\'argent', 'rompre la solitude', 'faire du sport'], answer: 1 },
        { type: 'mcq', id: 'delf-b1-3-co3', part: 1, text: 'Pourquoi est-il difficile de trouver des bénévoles ?', options: ['c\'est trop cher', 'ils manquent de temps', 'personne ne veut aider'], answer: 1 },
        { type: 'mcq', id: 'delf-b1-3-co4', part: 1, text: 'Selon Sophie, le bénévolat apporte :', options: ['autant à celui qui aide qu\'à celui qui reçoit', 'rien de particulier', 'seulement à celui qui reçoit'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2",
      instructions: "Vous allez entendre un second document. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b1-3/co-ex2.mp3',
      transcript: `Présentatrice : Chers auditeurs, aujourd'hui, parlons du télétravail avec la psychologue du travail Claire Dubois. Claire, le télétravail est-il une bonne chose ?\nClaire : Cela dépend. Beaucoup apprécient de ne plus perdre de temps dans les transports et d'être plus flexibles. Mais il y a aussi des inconvénients.\nPrésentatrice : Lesquels ?\nClaire : Certaines personnes se sentent isolées, car le contact avec les collègues manque. D'autres ont du mal à séparer le travail de la vie privée. Elles travaillent trop et ne font pas de vraies pauses.\nPrésentatrice : Que conseillez-vous ?\nClaire : Il faut une structure claire : un espace de travail fixe, des horaires précis et surtout de vraies pauses. Le contact avec les collègues, par appel vidéo par exemple, est aussi très important.\nPrésentatrice : Donc le télétravail ne convient pas à tout le monde ?\nClaire : Exactement. Souvent, le mieux est un modèle mixte : parfois à la maison, parfois au bureau.`,
      questions: [
        { type: 'mcq', id: 'delf-b1-3-co5', part: 2, text: 'Un avantage du télétravail est :', options: ['ne plus perdre de temps dans les transports', 'gagner plus d\'argent', 'travailler plus'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-3-co6', part: 2, text: 'Un inconvénient mentionné est :', options: ['trop de pauses', 'trop de collègues', 'le sentiment d\'isolement'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-3-co7', part: 2, text: 'Claire conseille :', options: ['d\'avoir des horaires précis et de vraies pauses', 'de travailler la nuit', 'de ne jamais faire de pauses'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-3-co8', part: 2, text: 'Selon Claire, le mieux est souvent :', options: ['toujours au bureau', 'un modèle mixte', 'toujours à la maison'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Article de presse',
      instructions: 'Lisez l\'article et répondez aux questions.',
      passage: `Vers des villes avec moins de voitures\n\nDe plus en plus de villes françaises veulent réduire le nombre de voitures dans leur centre. L'objectif est d'avoir un air plus propre, moins de bruit et plus d'espace pour les habitants. Dans certaines villes, des rues sont désormais réservées aux bus, aux vélos et aux piétons.\n\nLes réactions sont partagées. De nombreux habitants et commerçants apprécient les rues plus calmes, les nouveaux cafés et les espaces verts. Ils trouvent le centre-ville plus agréable. D'autres, surtout les personnes qui dépendent de leur voiture, critiquent ces nouvelles règles. Les artisans se plaignent de mal pouvoir transporter leurs outils, et les personnes âgées trouvent les trajets plus difficiles.\n\nLes experts soulignent que ces changements demandent du temps. Selon eux, il faut avant tout de bons transports en commun, pour que personne ne soit désavantagé. Des études venues d'autres villes européennes montrent qu'après quelques années, la majorité des habitants sont satisfaits des centres sans voitures — à condition qu'il existe de bonnes alternatives.`,
      passageTitle: 'Article : villes avec moins de voitures',
      questions: [
        { type: 'mcq', id: 'delf-b1-3-ce1', part: 3, text: 'Pourquoi les villes veulent-elles moins de voitures ?', options: ['parce qu\'il y a trop peu de voitures', 'pour économiser de l\'argent', 'pour un air plus propre et plus d\'espace'], answer: 2 },
        { type: 'mcq', id: 'delf-b1-3-ce2', part: 3, text: 'Qui critique surtout ces règles ?', options: ['les personnes qui dépendent de leur voiture', 'les enfants', 'les touristes'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-3-ce3', part: 3, text: 'Selon les experts, qu\'est-ce qui est essentiel ?', options: ['de bons transports en commun', 'plus de parkings', 'des amendes plus élevées'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-3-ce4', part: 3, text: 'Que montrent les études d\'autres villes ?', options: ['les centres sans voitures ne marchent jamais', 'les habitants sont toujours mécontents', 'après quelques années, la majorité est satisfaite s\'il y a de bonnes alternatives'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Document pratique',
      instructions: 'Lisez le courriel et répondez aux questions.',
      passage: `De : École de langues Bonjour\nÀ : Madame Chen\nObjet : Votre inscription\n\nBonjour Madame Chen,\n\nMerci de votre intérêt pour notre cours de français B1. Le cours a lieu les lundis et mercredis de 18 h à 20 h et commence le 5 septembre. Le prix pour l'ensemble du cours (12 semaines) est de 240 euros. Les livres ne sont pas inclus et coûtent environ 30 euros.\n\nSi vous souhaitez vous inscrire, veuillez remplir le formulaire sur notre site Internet. Une réduction de 10 % est possible si vous vous inscrivez avant le 20 août. Pour toute question, n'hésitez pas à m'appeler.\n\nCordialement,\nMarie Vidal, École de langues Bonjour`,
      passageTitle: 'Courriel de l\'école de langues',
      questions: [
        { type: 'mcq', id: 'delf-b1-3-ce5', part: 4, text: 'Le cours a lieu :', options: ['les lundis et mercredis', 'seulement le week-end', 'tous les jours'], answer: 0 },
        { type: 'mcq', id: 'delf-b1-3-ce6', part: 4, text: 'Les livres :', options: ['sont inclus dans le prix', 'ne sont pas inclus et coûtent environ 30 euros', 'sont gratuits'], answer: 1 },
        { type: 'mcq', id: 'delf-b1-3-ce7', part: 4, text: 'Comment obtenir une réduction de 10 % ?', options: ['acheter les livres', 's\'inscrire avant le 20 août', 'venir en personne'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite : Essai / Prise de position',
      instructions: 'Donnez votre opinion sur un sujet (environ 160 mots).',
      questions: [
        {
          type: 'write', id: 'delf-b1-3-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Essai',
          stimulus: 'Sur un forum, on débat : « Faut-il interdire les voitures dans les centres-villes ? » Vous participez au débat et donnez votre avis.',
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
          type: 'speak', id: 'delf-b1-3-po1', part: 6, partNumber: 1,
          text: 'Présentez-vous et parlez de vous : votre parcours, vos centres d\'intérêt, vos projets et vos motivations pour apprendre le français.',
          cueCard: 'Thèmes :\n• votre parcours (études, travail)\n• vos centres d\'intérêt\n• pourquoi vous apprenez le français\n• vos projets futurs',
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Partie 2 : Monologue suivi',
      instructions: 'Exprimez votre opinion sur un sujet à partir d\'un document déclencheur.',
      questions: [
        {
          type: 'speak', id: 'delf-b1-3-po2', part: 7, partNumber: 2,
          text: 'Réagissez au sujet suivant et donnez votre point de vue de manière structurée (environ 3 minutes).',
          cueCard: 'Sujet : « Le télétravail : une chance ou un problème ? »\nPistes :\n• présentez le sujet\n• avantages du télétravail\n• inconvénients possibles\n• votre opinion personnelle\n• conclusion',
        },
      ],
    },
    {
      part: 8, skill: 'speaking', title: 'Production orale – Partie 3 : Exercice en interaction',
      instructions: 'Discutez avec l\'examinateur pour trouver une solution commune.',
      questions: [
        {
          type: 'speak', id: 'delf-b1-3-po3', part: 8, partNumber: 3,
          text: 'Votre collègue quitte l\'entreprise. Vous organisez un pot de départ avec un autre collègue. Discutez et mettez-vous d\'accord.',
          cueCard: 'Situation : organiser un pot de départ.\nÀ discuter :\n• quand et où\n• qui inviter\n• nourriture et boissons\n• un cadeau commun\n• répartition des tâches\n\nRedemittel : « Je propose que… » / « Tu ne crois pas qu\'il vaudrait mieux… ? » / « On pourrait se mettre d\'accord sur… »',
        },
      ],
    },
  ],
};

export default mock;
