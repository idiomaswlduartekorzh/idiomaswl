import type { MockExam } from './types';

// DELF B2 — formato oficial CIEP. Conteúdo ORIGINAL WeLearn. Áudio sob /audio/delf/b2-2/.

const mock: MockExam = {
  id: 'b2-2',
  examSlug: 'delf-dalf',
  title: 'DELF B2 – Épreuve 2',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 150,
  sections: [
    {
      part: 1, skill: 'listening', title: "Compréhension de l'oral – Exercice 1 : Interview",
      instructions: "Vous allez entendre une interview. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b2-2/co-ex1.mp3',
      transcript: `Journaliste : Nous recevons la sociologue Hélène Barbier, spécialiste des nouvelles formes de travail. Madame Barbier, le télétravail va-t-il devenir la norme ?\nHélène Barbier : Il faut être prudent avec les prédictions. Ce qui est certain, c'est que le rapport au travail a changé durablement. Beaucoup de salariés ne veulent plus revenir à un modèle « tout présentiel ».\nJournaliste : Quels sont les principaux avantages selon vos études ?\nHélène Barbier : La flexibilité et la suppression des temps de transport arrivent en tête. Mais attention, ces avantages ne bénéficient pas à tous de la même manière. Un cadre dans un grand appartement ne vit pas le télétravail comme une personne dans un logement exigu.\nJournaliste : Vous soulignez donc une inégalité.\nHélène Barbier : Exactement. On a tendance à présenter le télétravail comme un progrès universel, alors qu'il creuse parfois les écarts. C'est pourquoi je plaide pour des modèles hybrides, négociés au cas par cas, plutôt que pour une solution imposée à tous.\nJournaliste : Un regard nuancé, merci Madame Barbier.`,
      questions: [
        { type: 'mcq', id: 'delf-b2-2-co1', part: 1, text: 'Que dit la sociologue sur l\'avenir du télétravail ?', options: ['il faut être prudent, mais le rapport au travail a changé durablement', 'il va disparaître', 'il deviendra sûrement la norme partout'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-2-co2', part: 1, text: 'Quels avantages arrivent en tête de ses études ?', options: ['la flexibilité et la suppression des transports', 'le salaire et les vacances', 'les collègues'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-2-co3', part: 1, text: 'Quelle critique formule-t-elle ?', options: ['le télétravail est illégal', 'le télétravail creuse parfois les inégalités', 'le télétravail est parfait pour tous'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-2-co4', part: 1, text: 'Que défend-elle ?', options: ['des modèles hybrides négociés au cas par cas', 'la suppression du travail', 'le tout présentiel'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'listening', title: "Compréhension de l'oral – Exercice 2 : Reportage",
      instructions: "Vous allez entendre un reportage. Choisissez la bonne réponse. Le document est écouté deux fois.",
      audioUrl: '/audio/delf/b2-2/co-ex2.mp3',
      transcript: `Reporter : Dans notre ville, une initiative fait parler d'elle : les « frigos solidaires ». Il s'agit de réfrigérateurs installés dans la rue, où chacun peut déposer de la nourriture ou en prendre gratuitement. J'ai rencontré Marc, l'un des initiateurs.\nMarc : L'idée est simple : lutter à la fois contre le gaspillage alimentaire et contre la précarité. Les commerçants et les particuliers déposent des produits encore bons dont ils n'ont pas besoin, et les personnes qui en ont besoin se servent, sans avoir à se justifier.\nReporter : Il n'y a pas de dérives ?\nMarc : Bien sûr, il faut des règles d'hygiène strictes. On ne dépose pas de plats déjà entamés ni de viande crue. Une association vérifie régulièrement le contenu. Mais globalement, ça fonctionne remarquablement bien, grâce à la confiance et au respect.\nReporter : Et l'accueil des habitants ?\nMarc : Très positif. Ce qui me touche le plus, c'est que ces frigos créent du lien. Des gens qui ne se seraient jamais parlé échangent, s'entraident. Au fond, on ne partage pas seulement de la nourriture, mais aussi de la dignité.`,
      questions: [
        { type: 'mcq', id: 'delf-b2-2-co5', part: 2, text: 'Quel est le double objectif des « frigos solidaires » ?', options: ['lutter contre le gaspillage et la précarité', 'vendre de la nourriture', 'décorer la rue'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-2-co6', part: 2, text: 'Comment évite-t-on les dérives ?', options: ['on ferme les frigos', 'il n\'y a aucune règle', 'des règles d\'hygiène strictes et des vérifications régulières'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-2-co7', part: 2, text: 'Que doivent faire les personnes qui prennent de la nourriture ?', options: ['payer', 'rien, elles se servent librement', 'se justifier'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-2-co8', part: 2, text: 'Qu\'est-ce qui touche le plus Marc ?', options: ['que ces frigos créent du lien social', 'que ça rapporte de l\'argent', 'que personne ne participe'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'reading', title: 'Compréhension des écrits – Exercice 1 : Texte informatif',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `L'intelligence artificielle bouleverse le monde du travail\n\nLes outils d'intelligence artificielle (IA) capables de rédiger des textes, de créer des images ou d'analyser des données transforment de nombreux métiers à une vitesse impressionnante. L'inquiétude de beaucoup de salariés est compréhensible : la machine va-t-elle me remplacer ?\n\nCertes, certaines tâches, surtout répétitives, seront automatisées. Mais l'histoire nous enseigne que le progrès technologique détruit rarement des emplois sans en créer de nouveaux. Lorsque les premiers ordinateurs sont apparus, beaucoup craignaient un chômage de masse ; or, des secteurs entiers, inexistants auparavant, ont vu le jour.\n\nL'essentiel réside dans la façon dont la société et les individus s'adaptent au changement. Ceux qui acceptent de se former et d'acquérir de nouvelles compétences ont de bonnes chances. Les compétences les plus recherchées sont d'ailleurs celles que les machines imitent difficilement : la créativité, l'esprit critique, l'empathie et la capacité à collaborer.\n\nLes experts appellent donc les systèmes éducatifs à mettre davantage l'accent sur ces aptitudes. Bien utilisée, l'IA devrait assister l'humain plutôt que le remplacer — être un outil, non un concurrent. Le véritable enjeu n'est pas de lutter contre la technologie, mais d'apprendre à travailler avec elle.`,
      passageTitle: 'Texte : IA et travail',
      questions: [
        { type: 'mcq', id: 'delf-b2-2-ce1', part: 3, text: 'Quelle est l\'inquiétude des salariés ?', options: ['ne pas avoir d\'ordinateur', 'être remplacés par la machine', 'gagner trop d\'argent'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-2-ce2', part: 3, text: 'Que nous enseigne l\'histoire selon le texte ?', options: ['le progrès crée aussi de nouveaux emplois', 'rien ne change', 'le progrès détruit seulement des emplois'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-2-ce3', part: 3, text: 'Quelles compétences sont les plus recherchées ?', options: ['la créativité, l\'esprit critique, l\'empathie', 'seulement des compétences techniques', 'taper vite'], answer: 0 },
        { type: 'mcq', id: 'delf-b2-2-ce4', part: 3, text: 'Comment l\'IA devrait-elle être utilisée ?', options: ['pas du tout', 'comme un remplaçant de l\'humain', 'comme un outil qui assiste l\'humain'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'reading', title: 'Compréhension des écrits – Exercice 2 : Texte argumentatif',
      instructions: 'Lisez le texte et répondez aux questions.',
      passage: `Faut-il limiter le tourisme dans les villes ?\n\nVenise, Barcelone, Amsterdam : ces villes accueillent chaque année des millions de visiteurs. Pour l'économie locale, le tourisme est d'abord une bénédiction : il crée des emplois et rapporte des revenus qui permettent, entre autres, d'entretenir le patrimoine.\n\nMais le revers de la médaille devient de plus en plus visible. Dans les centres des villes les plus courues, les loyers explosent, au point que les habitants ne peuvent plus se loger. Les commerces traditionnels cèdent la place aux boutiques de souvenirs, et les rues sont si bondées que la qualité de vie des résidents se dégrade. Certains parlent déjà de « sur-tourisme » : un état où un afflux excessif de visiteurs détruit précisément ce qu'ils venaient admirer.\n\nFace à cela, plusieurs villes réagissent : limitation du nombre de nuitées, taxe de séjour, interdiction de nouveaux logements touristiques. Les experts soulignent toutefois qu'il n'existe pas de solution simple. L'objectif devrait être un tourisme durable, qui concilie les intérêts des visiteurs et ceux des habitants. Car une ville où plus personne ne peut vivre finit par perdre le charme même qui la rendait attirante.`,
      passageTitle: 'Texte : le sur-tourisme',
      questions: [
        { type: 'mcq', id: 'delf-b2-2-ce5', part: 4, text: 'En quoi le tourisme est-il « d\'abord une bénédiction » ?', options: ['il fait baisser les loyers', 'il vide les villes', 'il crée des emplois et des revenus'], answer: 2 },
        { type: 'mcq', id: 'delf-b2-2-ce6', part: 4, text: 'Que signifie le « sur-tourisme » ?', options: ['trop peu de visiteurs', 'un afflux excessif qui détruit ce qu\'on venait admirer', 'un tourisme de luxe'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-2-ce7', part: 4, text: 'Comment certaines villes réagissent-elles ?', options: ['en fermant les hôtels aux habitants', 'en limitant les nuitées et avec une taxe de séjour', 'en accueillant encore plus de touristes'], answer: 1 },
        { type: 'mcq', id: 'delf-b2-2-ce8', part: 4, text: 'Quel devrait être l\'objectif selon les experts ?', options: ['interdire tout tourisme', 'ignorer le problème', 'un tourisme durable conciliant visiteurs et habitants'], answer: 2 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Production écrite : Prise de position argumentée',
      instructions: 'Rédigez un texte argumenté (environ 250 mots).',
      questions: [
        {
          type: 'write', id: 'delf-b2-2-pe1', part: 5, taskNumber: 1,
          stimulusLabel: 'Lettre / article argumenté',
          stimulus: 'Le maire de votre ville envisage de limiter fortement le nombre de touristes dans le centre-ville. Vous écrivez une lettre au journal local pour donner votre point de vue sur cette mesure.',
          text: 'Rédigez un texte argumenté (environ 250 mots) : 1) présentez le sujet et le contexte, 2) exposez les arguments pour et/ou contre, 3) défendez clairement votre position avec des exemples, 4) concluez. Soignez la structure, les connecteurs logiques et un registre soutenu.',
          minWords: 220,
        },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Production orale – Monologue suivi',
      instructions: 'Présentez et défendez votre point de vue à partir d\'un court document déclencheur.',
      questions: [
        {
          type: 'speak', id: 'delf-b2-2-po1', part: 6, partNumber: 1,
          text: 'Dégagez le problème soulevé par le document, puis présentez votre opinion de manière construite et argumentée (environ 5 minutes de préparation, puis exposé).',
          cueCard: 'Document déclencheur : « De plus en plus de villes limitent le tourisme dans leur centre pour protéger les habitants. »\n\nStructure de l\'exposé :\n• dégagez le problème / la thématique\n• présentez les enjeux (économie, qualité de vie, patrimoine)\n• exposez les arguments pour et contre\n• défendez votre point de vue avec des exemples\n• concluez',
        },
      ],
    },
    {
      part: 7, skill: 'speaking', title: 'Production orale – Interaction / Débat',
      instructions: 'Défendez votre point de vue face à l\'examinateur.',
      questions: [
        {
          type: 'speak', id: 'delf-b2-2-po2', part: 7, partNumber: 2,
          text: 'Débattez avec l\'examinateur sur la question suivante et défendez votre position en tenant compte des contre-arguments.',
          cueCard: 'Question : « L\'intelligence artificielle représente-t-elle une menace ou une chance pour l\'emploi ? »\n\nPistes :\n• menaces (automatisation, disparition de certains métiers)\n• opportunités (nouveaux métiers, gains de productivité)\n• le rôle de la formation\n• votre position nuancée\n\nRedemittel (B2) : « On pourrait objecter que… » / « Il n\'en demeure pas moins que… » / « Tout dépend, en réalité, de… »',
        },
      ],
    },
  ],
};

export default mock;
