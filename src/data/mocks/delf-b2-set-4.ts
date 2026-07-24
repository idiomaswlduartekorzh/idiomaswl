import type { MockExam } from './types';

// DELF B2 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/b2-4/.

const mock: MockExam = {
  id: 'b2-4',
  examSlug: 'delf-dalf',
  title: 'DELF B2 – Épreuve 4',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 150,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1 : Interview",
      instructions: "Vous allez entendre une interview. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b2-4/co-ex1.mp3',
      transcript: `Journaliste : Nous recevons l'économiste Claire Dumont, spécialiste de la consommation. Madame Dumont, le minimalisme est-il une vraie tendance ou un simple effet de mode ?\nClaire Dumont : Les deux, en réalité. Il y a une prise de conscience sincère chez beaucoup de gens, fatigués d'accumuler des objets. Mais il ne faut pas être naïf : le minimalisme est aussi devenu un marché, avec ses produits « épurés » vendus très cher.\nJournaliste : N'est-ce pas contradictoire ?\nClaire Dumont : Tout à fait, et c'est là le paradoxe. On peut consommer du minimalisme comme on consomme autre chose. Le véritable enjeu n'est pas d'acheter des objets « minimalistes », mais de questionner nos besoins réels.\nJournaliste : Le minimalisme serait donc réservé aux plus aisés ?\nClaire Dumont : C'est une critique fréquente et en partie juste. Choisir de posséder peu est plus facile quand on a déjà tout. Mais l'idée de fond — consommer moins et mieux — me semble pertinente pour tous, à condition de ne pas la transformer en nouvelle injonction culpabilisante.\nJournaliste : Un regard critique et nuancé, merci.`,
      questions: [
        { type: 'mcq', id: 'delf-b2-4-co1', part: 1, text: 'Selon Claire Dumont, le minimalisme est :', options: ['sans aucun intérêt', 'à la fois une vraie tendance et un effet de mode / marché', 'seulement un mensonge'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-4-co2', part: 1, text: 'Quel paradoxe souligne-t-elle ?', options: ['le minimalisme coûte toujours zéro euro', 'personne n\'achète rien', 'on peut consommer du minimalisme comme autre chose'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-4-co3', part: 1, text: 'Quelle critique est jugée « en partie juste » ?', options: ['le minimalisme est plus facile pour les personnes aisées', 'le minimalisme est illégal', 'personne ne s\'y intéresse'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-4-co4', part: 1, text: 'Quelle idée de fond juge-t-elle pertinente ?', options: ['ne jamais rien acheter', 'consommer moins et mieux', 'acheter toujours plus'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Reportage",
      instructions: "Vous allez entendre un reportage. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b2-4/co-ex2.mp3',
      transcript: `Reporter : Dans ce village de montagne, une école risquait de fermer faute d'élèves. Aujourd'hui, elle revit grâce à un projet original. J'ai rencontré la directrice, Madame Roy.\nMadame Roy : Il y a cinq ans, nous n'avions plus que huit élèves. La fermeture semblait inévitable. Alors, avec la mairie, nous avons décidé d'attirer de nouvelles familles en proposant quelque chose d'unique : une école tournée vers la nature.\nReporter : Concrètement, qu'est-ce que cela change ?\nMadame Roy : Une grande partie des cours se déroule dehors, dans la forêt, au jardin. Les enfants apprennent les sciences en observant, les mathématiques en mesurant. Le programme officiel est respecté, mais autrement.\nReporter : Et les résultats ?\nMadame Roy : Des familles sont venues s'installer exprès pour cette école. Nous avons aujourd'hui trente-cinq élèves. Mais le plus important, ce ne sont pas les chiffres : c'est de voir des enfants curieux, épanouis, qui aiment venir à l'école.\nReporter : Un pari réussi qui a redonné vie à tout un village.`,
      questions: [
        { type: 'mcq', id: 'delf-b2-4-co5', part: 2, text: 'Quel était le problème initial de l\'école ?', options: ['elle était trop grande', 'elle coûtait trop cher aux parents', 'elle risquait de fermer faute d\'élèves'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-4-co6', part: 2, text: 'Quelle solution originale a été choisie ?', options: ['une école tournée vers la nature', 'fermer l\'école', 'supprimer les cours de sciences'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-4-co7', part: 2, text: 'Le programme officiel est-il respecté ?', options: ['il n\'y a plus de programme', 'oui, mais enseigné autrement', 'non, il est abandonné'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-4-co8', part: 2, text: 'Qu\'est-ce qui compte le plus pour la directrice ?', options: ['seulement le nombre d\'élèves', 'l\'argent gagné', 'voir des enfants curieux et épanouis'], answer: 2 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Texte informatif',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `Le bénévolat : entre générosité et limites\n\nLe bénévolat est souvent présenté comme un pilier de la société. Sans les millions de personnes qui donnent gratuitement de leur temps, une grande partie des activités associatives, sportives et culturelles n'existerait tout simplement pas. Pourtant, ce système, aussi précieux soit-il, mérite un regard critique.\n\nLe problème surgit lorsque l'État se repose sur le bénévolat pour assurer des missions qui relèvent en principe de sa responsabilité. Certaines collectivités, faute de moyens, comptent sur des volontaires pour combler des manques. Résultat : des bénévoles se voient confier des tâches de plus en plus exigeantes, autrefois réservées à des professionnels, souvent sans formation adéquate ni protection.\n\nS'ajoute le risque d'épuisement. Une personne très engagée finit parfois par se sentir responsable de tout et à ne plus savoir dire « non ». L'idéalisme du début se transforme alors en fatigue, voire en frustration.\n\nLes spécialistes plaident donc pour des limites claires : le bénévolat doit rester un complément librement choisi, et non un substitut à la responsabilité publique. C'est à cette condition seulement qu'un signe de solidarité ne se transforme pas en exploitation silencieuse.`,
      passageTitle: 'Texte : les limites du bénévolat',
      questions: [
        { type: 'mcq', id: 'delf-b2-4-ce1', part: 3, text: 'Pourquoi le bénévolat est-il « un pilier de la société » ?', options: ['sans lui, beaucoup d\'activités n\'existeraient pas', 'parce qu\'il rapporte de l\'argent', 'parce qu\'il est obligatoire'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-4-ce2', part: 3, text: 'Quel problème surgit selon le texte ?', options: ['les associations sont trop riches', 'l\'État se repose sur le bénévolat pour ses propres missions', 'il y a trop de bénévoles payés'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-4-ce3', part: 3, text: 'Quel risque personnel est mentionné ?', options: ['gagner trop d\'argent', 'devenir célèbre', 'l\'épuisement des personnes très engagées'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-4-ce4', part: 3, text: 'Que plaident les spécialistes ?', options: ['le bénévolat doit rester un complément librement choisi', 'il faut supprimer le bénévolat', 'l\'État ne doit rien faire'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Texte argumentatif',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `Faut-il rendre le vote obligatoire ?\n\nDans plusieurs démocraties, le taux d'abstention aux élections atteint des niveaux préoccupants. Face à ce constat, une idée revient régulièrement : rendre le vote obligatoire, comme c'est déjà le cas dans certains pays. La proposition, séduisante en apparence, mérite qu'on l'examine de près.\n\nLes défenseurs de cette mesure avancent qu'elle renforcerait la légitimité des élus, élus alors par une large majorité de citoyens, et non par une minorité mobilisée. Elle inciterait aussi les gens à s'informer davantage sur les enjeux politiques.\n\nLes opposants, en revanche, y voient une atteinte à la liberté. Voter, disent-ils, est un droit, non un devoir que l'on pourrait imposer sous peine de sanction. Ils soulignent en outre qu'obliger des citoyens désintéressés à voter ne produirait que des bulletins mal réfléchis, voire des votes blancs par contrainte.\n\nLe débat renvoie finalement à une question plus profonde : l'abstention est-elle un problème à corriger par la loi, ou le symptôme d'un malaise démocratique qu'aucune obligation ne saurait guérir ? Beaucoup estiment que redonner confiance aux citoyens serait plus efficace que de les contraindre. Forcer à voter ne suffit pas à faire renaître l'envie d'y croire.`,
      passageTitle: 'Texte : le vote obligatoire',
      questions: [
        { type: 'mcq', id: 'delf-b2-4-ce5', part: 4, text: 'Quel constat motive l\'idée du vote obligatoire ?', options: ['l\'absence d\'élections', 'un taux d\'abstention préoccupant', 'trop de votants'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-4-ce6', part: 4, text: 'Quel argument avancent les défenseurs ?', options: ['cela supprimerait les élections', 'cela coûterait moins cher', 'cela renforcerait la légitimité des élus'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-4-ce7', part: 4, text: 'Quelle crainte expriment les opposants ?', options: ['une atteinte à la liberté et des votes mal réfléchis', 'trop de participation', 'des élus trop compétents'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-4-ce8', part: 4, text: 'À quelle question plus profonde renvoie le débat ?', options: ['comment gagner de l\'argent en votant ?', 'l\'abstention est-elle un problème à corriger par la loi ou le symptôme d\'un malaise ?', 'faut-il supprimer la démocratie ?'], answer: 1 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite : Prise de position argumentée',
      instructions: 'Rédigez un texte argumenté (environ 250 mots).',
      questions: [
        {
          type: 'write', id: 'delf-b2-4-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Lettre / article argumenté',
          stimulus: 'Un journal lance un débat : « Faut-il rendre le vote obligatoire pour lutter contre l\'abstention ? » Vous rédigez une contribution pour donner votre point de vue.',
          text: 'Rédigez un texte argumenté (environ 250 mots) : 1) présentez la problématique, 2) exposez les arguments pour et contre, 3) défendez votre position avec des exemples, 4) concluez. Soignez la structure, les connecteurs et un registre soutenu.',
          minWords: 220,
        },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Production orale – Monologue suivi',
      instructions: 'Présentez et défendez votre point de vue à partir d\'un court document déclencheur.',
      questions: [
        {
          type: 'speak', id: 'delf-b2-4-po1', part: 6, partNumber: 1,
          text: 'Dégagez le problème soulevé par le document, puis présentez votre opinion de manière construite et argumentée.',
          cueCard: 'Document déclencheur : « De plus en plus de collectivités comptent sur les bénévoles pour assurer des services publics. »\n\nStructure :\n• dégagez la problématique\n• présentez les enjeux (solidarité, responsabilité de l\'État, épuisement)\n• arguments pour et contre\n• votre position argumentée\n• conclusion',
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Interaction / Débat',
      instructions: 'Défendez votre point de vue face à l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-b2-4-po2', part: 7, partNumber: 2,
          text: 'Débattez avec l\'examinateur sur la question suivante et défendez votre position en tenant compte des contre-arguments.',
          cueCard: 'Question : « Le minimalisme est-il une solution réelle ou une simple mode ? »\n\nPistes :\n• la prise de conscience écologique\n• le paradoxe du « marché minimaliste »\n• l\'accès inégal selon les moyens\n• votre position nuancée\n\nRedemittel (B2) : « Il serait réducteur de… » / « Cela étant dit… » / « Au fond, la vraie question est de savoir si… »',
        },
      ],
    },
  ],
};

export default mock;
