import type { MockExam } from './types';

// DELF B2 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/b2-3/.

const mock: MockExam = {
  id: 'b2-3',
  examSlug: 'delf-dalf',
  title: 'DELF B2 – Épreuve 3',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 150,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1 : Interview",
      instructions: "Vous allez entendre une interview. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b2-3/co-ex1.mp3',
      transcript: `Journaliste : Nous recevons le neuroscientifique Paul Rivière, auteur d'un livre sur l'attention. Monsieur Rivière, notre capacité de concentration est-elle vraiment en train de diminuer ?\nPaul Rivière : C'est une idée répandue, mais il faut la nuancer. Ce n'est pas notre cerveau qui a changé en vingt ans, c'est notre environnement. Nous sommes sollicités en permanence par des notifications, des messages, des sources de distraction.\nJournaliste : Le problème viendrait donc de la technologie ?\nPaul Rivière : En partie. Mais accuser uniquement la technologie serait trop simple. Le vrai enjeu, c'est notre rapport à elle. Nous avons pris l'habitude de céder à chaque interruption, et le cerveau, très adaptable, s'est habitué à cette fragmentation.\nJournaliste : Peut-on inverser la tendance ?\nPaul Rivière : Absolument. La concentration se travaille comme un muscle. En s'imposant des périodes sans écran, en pratiquant des activités qui exigent une attention soutenue — la lecture, par exemple —, on réentraîne cette capacité. Ce n'est pas une fatalité.\nJournaliste : Un message optimiste, merci Monsieur Rivière.`,
      questions: [
        { type: 'mcq', id: 'delf-b2-3-co1', part: 1, text: 'Selon Paul Rivière, qu\'est-ce qui a changé en vingt ans ?', options: ['notre cerveau', 'notre environnement', 'rien du tout'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-3-co2', part: 1, text: 'Peut-on accuser uniquement la technologie ?', options: ['la technologie n\'a aucun rôle', 'non, le vrai enjeu est notre rapport à elle', 'oui, elle est seule responsable'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-3-co3', part: 1, text: 'À quoi le cerveau s\'est-il habitué ?', options: ['à ne plus fonctionner', 'à dormir davantage', 'à la fragmentation de l\'attention'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-3-co4', part: 1, text: 'Comment réentraîner la concentration ?', options: ['en cédant à chaque interruption', 'par des périodes sans écran et des activités exigeant une attention soutenue', 'c\'est impossible'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Reportage",
      instructions: "Vous allez entendre un reportage. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b2-3/co-ex2.mp3',
      transcript: `Reporter : Dans cette petite ville, une monnaie locale a vu le jour il y a trois ans. J'ai rencontré Sylvie, à l'origine du projet.\nSylvie : Notre monnaie, la « graine », ne remplace pas l'euro : elle circule en parallèle, uniquement chez les commerçants et producteurs locaux qui adhèrent au réseau.\nReporter : Quel est l'intérêt ?\nSylvie : L'objectif est de garder l'argent dans l'économie locale. Quand vous payez en graines, vous ne pouvez dépenser cette somme que chez d'autres commerçants du réseau. L'argent tourne donc dans la région au lieu de partir ailleurs.\nReporter : Cela fonctionne-t-il vraiment ?\nSylvie : Plus de cent commerces l'acceptent aujourd'hui, et des milliers d'habitants l'utilisent. Ce n'est pas une révolution économique, je reste lucide. Mais cela crée du lien, une prise de conscience. Les gens réfléchissent davantage à l'origine de ce qu'ils achètent.\nReporter : Une expérience qui, au-delà de l'argent, change les habitudes de consommation.`,
      questions: [
        { type: 'mcq', id: 'delf-b2-3-co5', part: 2, text: 'La monnaie locale « la graine » :', options: ['n\'est acceptée nulle part', 'remplace complètement l\'euro', 'circule en parallèle, chez les commerçants locaux du réseau'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-3-co6', part: 2, text: 'Quel est l\'objectif principal ?', options: ['enrichir les banques', 'remplacer les commerçants', 'garder l\'argent dans l\'économie locale'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-3-co7', part: 2, text: 'Comment Sylvie juge-t-elle le succès du projet ?', options: ['comme une révolution économique', 'de façon lucide : cela crée surtout du lien et une prise de conscience', 'comme un échec total'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-3-co8', part: 2, text: 'Quel effet le reporter souligne-t-il ?', options: ['cela fait fermer les commerces', 'cela change les habitudes de consommation', 'cela n\'a aucun effet'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Texte informatif',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `Le « droit à la déconnexion » : un progrès social ?\n\nAvec la généralisation des smartphones et du travail à distance, la frontière entre vie professionnelle et vie privée s'est brouillée. Un courriel du patron à 22 heures, un message le week-end : autant de sollicitations qui, sans l'exiger explicitement, créent un sentiment d'obligation permanente. Pour répondre à ce phénomène, la notion de « droit à la déconnexion » a émergé.\n\nCe droit vise à garantir aux salariés la possibilité de ne pas être joignables en dehors de leurs horaires de travail, sans crainte de sanction. Plusieurs pays et entreprises ont adopté des mesures en ce sens : certaines coupent même les serveurs de messagerie le soir.\n\nLes partisans y voient une avancée nécessaire pour la santé mentale et l'équilibre de vie. Les critiques, eux, soulignent la difficulté de faire appliquer de telles règles, notamment dans les métiers où une certaine flexibilité est attendue. D'autres craignent que ces mesures ne restent purement symboliques si la culture d'entreprise ne change pas en profondeur.\n\nAu-delà des textes de loi, l'enjeu véritable est donc culturel : il s'agit de reconnaître que le repos n'est pas un luxe, mais une condition de la performance durable et du bien-être. Un salarié épuisé n'est ni plus productif ni plus heureux.`,
      passageTitle: 'Texte : le droit à la déconnexion',
      questions: [
        { type: 'mcq', id: 'delf-b2-3-ce1', part: 3, text: 'Que vise le « droit à la déconnexion » ?', options: ['obliger à répondre le soir', 'supprimer les vacances', 'garantir de ne pas être joignable hors des horaires de travail'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-3-ce2', part: 3, text: 'Que voient les partisans dans ce droit ?', options: ['une avancée pour la santé mentale et l\'équilibre de vie', 'une perte de temps', 'un danger'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-3-ce3', part: 3, text: 'Que craignent certains critiques ?', options: ['qu\'il y ait trop de lois', 'que les mesures restent symboliques si la culture ne change pas', 'que les salariés travaillent trop peu'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-3-ce4', part: 3, text: 'Quel est, selon le texte, l\'enjeu véritable ?', options: ['purement technique', 'financier uniquement', 'culturel : reconnaître que le repos est une condition de la performance durable'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Texte argumentatif',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `Les écrans à l'école : outil ou obstacle ?\n\nFaut-il équiper massivement les écoles de tablettes et d'ordinateurs ? La question divise enseignants, parents et chercheurs. Les partisans avancent que le numérique rend les cours plus vivants, permet un apprentissage individualisé et prépare les élèves à un monde où les compétences numériques sont indispensables.\n\nLes détracteurs, cependant, ne manquent pas d'arguments. Plusieurs études suggèrent que l'écriture manuscrite favorise la mémorisation, tandis que la saisie au clavier conduirait à un apprentissage plus superficiel. Ils redoutent aussi les distractions : rien n'empêche un élève de jouer ou de naviguer sur les réseaux pendant le cours. Enfin, toutes les familles ne disposant pas du même équipement à la maison, la généralisation du numérique risque d'accentuer les inégalités existantes.\n\nLa plupart des experts s'accordent finalement sur un point : ce n'est pas la technologie en soi qui compte, mais l'usage qu'on en fait. Une tablette ne remplacera jamais un bon enseignant. Le numérique a du sens là où il approfondit réellement l'apprentissage, et non là où il ne sert qu'à paraître moderne. La sagesse consiste sans doute à intégrer ces outils avec discernement, sans en faire ni un tabou ni une fin en soi.`,
      passageTitle: 'Texte : les écrans à l\'école',
      questions: [
        { type: 'mcq', id: 'delf-b2-3-ce5', part: 4, text: 'Quel argument avancent les partisans du numérique à l\'école ?', options: ['il permet un apprentissage individualisé', 'il coûte moins cher que les livres', 'il rend les enseignants inutiles'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-3-ce6', part: 4, text: 'Que suggèrent plusieurs études, selon les détracteurs ?', options: ['les écrans n\'ont aucun effet', 'l\'écriture manuscrite favorise la mémorisation', 'le clavier améliore toujours l\'apprentissage'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-3-ce7', part: 4, text: 'Quel risque social est mentionné ?', options: ['rendre les élèves trop riches', 'supprimer les écoles', 'accentuer les inégalités entre les familles'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-3-ce8', part: 4, text: 'Sur quel point les experts s\'accordent-ils ?', options: ['ce qui compte, c\'est l\'usage qu\'on fait de la technologie', 'il faut interdire tout écran', 'la tablette remplace l\'enseignant'], answer: 0 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite : Prise de position argumentée',
      instructions: 'Rédigez un texte argumenté (environ 250 mots).',
      questions: [
        {
          type: 'write', id: 'delf-b2-3-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Lettre / article argumenté',
          stimulus: 'L\'école de vos enfants (ou une école que vous connaissez) envisage de remplacer tous les manuels papier par des tablettes. Vous écrivez au conseil de l\'école pour donner votre point de vue.',
          text: 'Rédigez un texte argumenté (environ 250 mots) : 1) présentez le sujet, 2) exposez les avantages et les inconvénients, 3) défendez clairement votre position avec des exemples, 4) concluez. Soignez la structure, les connecteurs et un registre soutenu.',
          minWords: 220,
        },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Production orale – Monologue suivi',
      instructions: 'Présentez et défendez votre point de vue à partir d\'un court document déclencheur.',
      questions: [
        {
          type: 'speak', id: 'delf-b2-3-po1', part: 6, partNumber: 1,
          text: 'Dégagez le problème soulevé par le document, puis présentez votre opinion de manière construite et argumentée.',
          cueCard: 'Document déclencheur : « De plus en plus d\'entreprises instaurent un droit à la déconnexion pour protéger leurs salariés. »\n\nStructure :\n• dégagez la problématique\n• présentez les enjeux (santé, productivité, culture d\'entreprise)\n• arguments pour et contre\n• votre position argumentée\n• conclusion',
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Interaction / Débat',
      instructions: 'Défendez votre point de vue face à l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-b2-3-po2', part: 7, partNumber: 2,
          text: 'Débattez avec l\'examinateur sur la question suivante et défendez votre position en tenant compte des contre-arguments.',
          cueCard: 'Question : « Les écrans ont-ils leur place à l\'école ? »\n\nPistes :\n• avantages pédagogiques\n• risques (distraction, superficialité, inégalités)\n• le rôle de l\'enseignant\n• votre position nuancée\n\nRedemittel (B2) : « Certes…, mais… » / « On aurait tort de croire que… » / « En définitive, tout est question de mesure. »',
        },
      ],
    },
  ],
};

export default mock;
