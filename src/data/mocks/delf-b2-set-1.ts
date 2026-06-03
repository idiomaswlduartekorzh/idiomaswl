import type { MockExam } from './types';

// Source: DELF B2 Tout Public – Sujet démo 02 (France Éducation International)
// Answers verified against official corrigé.
const mock: MockExam = {
  id: 'b2-set-1',
  examSlug: 'delf-dalf',
  title: 'DELF B2 – Épreuve officielle (Sujet démo 02)',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 150,
  sections: [
    // ─────────────────────────────────────────────────────────────────────────
    // Section 1 — CO Exercice 1 · Sport du matin / rythme sommeil
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 1,
      title: "Compréhension de l'oral – Exercice 1",
      skill: 'listening',
      audioUrl: '/audio/delf/b2-set-1-doc1.mp3',
      instructions:
        "Vous allez écouter 2 fois un document. Vous écoutez une émission à la radio. Lisez les questions, écoutez le document puis répondez. Cochez (X) la bonne réponse.",
      questions: [
        {
          type: 'mcq',
          id: 'co1-q1',
          part: 1,
          stimulusLabel: 'Exercice 1 — Émission radio : sport matinal et rythme de vie',
          text: "D'après le journaliste, on trouve souvent sur les réseaux sociaux des articles sur…",
          options: [
            "l'intérêt de la course à pied.",
            "les avantages du sport matinal.",
            "le style de vie des sportifs professionnels.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co1-q2',
          part: 1,
          text: "Selon le document, il est…",
          options: [
            "bénéfique de modifier notre rythme de sommeil.",
            "dangereux de modifier notre rythme de sommeil.",
            "impossible de modifier notre rythme de sommeil.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co1-q3',
          part: 1,
          text: "Quel rythme de vie adoptent les sportifs professionnels ?",
          options: [
            "Ils se lèvent très tôt.",
            "Ils dorment beaucoup.",
            "Ils font une sieste l'après-midi.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co1-q4',
          part: 1,
          text: "D'après le journaliste, les personnes qui se couchent tard sont plus…",
          options: [
            "actives le soir.",
            "fatiguées le soir.",
            "détendues le soir.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'co1-q5',
          part: 1,
          text: "Il est socialement bien vu de se lever tôt car cela permettrait d'être plus…",
          options: [
            "efficace.",
            "ponctuel.",
            "en forme.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'co1-q6',
          part: 1,
          text: "Faire du sport le matin est considéré comme un luxe car…",
          options: [
            "tous les emplois ne le permettent pas.",
            "la vie de famille est parfois contraignante.",
            "on ne peut pas toujours en faire près de chez soi.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'co1-q7',
          part: 1,
          text: "La pratique du sport en fin de journée est avantageuse car elle permet…",
          options: [
            "d'être de meilleure humeur.",
            "de s'endormir plus facilement.",
            "de mieux se concentrer le lendemain.",
          ],
          answer: 1,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 2 — CO Exercice 2 · Flex office / hôtels de travail
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 2,
      title: "Compréhension de l'oral – Exercice 2",
      skill: 'listening',
      audioUrl: '/audio/delf/b2-set-1-doc2.mp3',
      instructions:
        "Vous allez écouter 2 fois un document. Vous écoutez une émission à la radio. Lisez les questions. Écoutez le document puis répondez.",
      questions: [
        {
          type: 'mcq',
          id: 'co2-q1',
          part: 2,
          stimulusLabel: 'Exercice 2 — Émission radio : flex office et hôtels de travail',
          text: "L'entreprise américaine Google a lancé l'idée d'une nouvelle…",
          options: [
            "forme de réunion au travail.",
            "manière d'utiliser les bureaux.",
            "organisation du travail à distance.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co2-q2',
          part: 2,
          text: "Dans l'entreprise Sanofi, la nouvelle organisation concerne…",
          options: [
            "uniquement les chefs.",
            "les chefs et les employés.",
            "uniquement les employés.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co2-q3',
          part: 2,
          text: "Quel est l'objectif principal de cette organisation ?",
          options: [
            "Limiter les retards et l'absentéisme.",
            "Améliorer l'utilisation des espaces de travail.",
            "Créer des salles de réunion supplémentaires.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co2-q4',
          part: 2,
          text: "Du fait de cette organisation, les employés…",
          options: [
            "rentrent parfois travailler chez eux.",
            "louent des espaces pour travailler tranquillement.",
            "organisent leurs rendez-vous à l'extérieur de l'entreprise.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'co2-q5',
          part: 2,
          text: "Chez les employés, cette organisation peut…",
          options: [
            "entraîner des conflits.",
            "être source de fatigue.",
            "diminuer la productivité.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'co2-q6',
          part: 2,
          text: "Comment les employés les plus âgés réagissent-ils à ce système ?",
          options: [
            "Ils protestent et refusent de l'adopter.",
            "Ils s'adaptent même si ça ne leur plaît pas.",
            "Ils s'inquiètent pour leur avenir professionnel.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'co2-q7',
          part: 2,
          text: "La journaliste estime que les hôtels de travail…",
          options: [
            "facilitent la mise en place du travail à distance.",
            "renforcent les capacités d'adaptation des salariés.",
            "favorisent la confusion entre vie privée et vie professionnelle.",
          ],
          answer: 2,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 3 — CO Exercice 3 · 3 documents courts (1 écoute)
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 3,
      title: "Compréhension de l'oral – Exercice 3",
      skill: 'listening',
      audioUrl: '/audio/delf/b2-set-1-doc3.mp3',
      instructions:
        "Vous allez écouter 1 fois 3 documents courts. Pour chaque document, lisez les questions avant d'écouter, puis répondez.",
      questions: [
        {
          type: 'mcq',
          id: 'co3-q1',
          part: 3,
          stimulusLabel: "Document 1 — Presse jeunesse",
          text: "Qu'est-ce qu'on constate dans l'évolution de la presse jeunesse actuellement ?",
          options: [
            "Il y a plus de titres pour tous les âges.",
            "Il y a plus de magazines de divertissement.",
            "Il y a plus d'importance donnée à l'information.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'co3-q2',
          part: 3,
          text: "Selon Elsa Maudet, les nouveaux types de magazine vont… chez les jeunes.",
          options: [
            "encourager l'écriture.",
            "promouvoir la lecture.",
            "favoriser la réflexion sur l'actualité.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'co3-q3',
          part: 3,
          stimulusLabel: "Document 2 — Jeux de société",
          text: "Pour l'intervenant, les jeux de société permettent d'être…",
          options: [
            "plus efficace au travail.",
            "plus proche des autres.",
            "plus calme au quotidien.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co3-q4',
          part: 3,
          text: "D'après l'intervenant, chez les plus jeunes, les jeux de société favorisent principalement…",
          options: [
            "leur intégration sociale.",
            "leur sensation de bien-être.",
            "leur capacité de raisonnement.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'co3-q5',
          part: 3,
          stimulusLabel: "Document 3 — Robots émotionnels",
          text: "Selon l'intervenante, un robot émotionnel est capable…",
          options: [
            "d'interpréter les émotions.",
            "de provoquer des émotions.",
            "de manifester des émotions.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co3-q6',
          part: 3,
          text: "Dans quel domaine les robots sont-ils bénéfiques pour les enfants ?",
          options: [
            "La mobilité.",
            "L'apprentissage.",
            "La communication.",
          ],
          answer: 1,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 4 — CE Exercice 1 · Téléphone portable au collège
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 4,
      title: "Compréhension des écrits – Exercice 1",
      skill: 'reading',
      instructions:
        "Lisez l'article puis répondez aux questions en cochant la bonne réponse.",
      questions: [
        {
          type: 'mcq',
          id: 'ce1-q1',
          part: 4,
          stimulusLabel: "Exercice 1 — Article : L'interdiction du téléphone portable au collège",
          stimulus:
            "Selon une étude, les élèves qui fréquentent des écoles où le téléphone est interdit ont de meilleurs résultats que les autres. Le ministre de l'éducation nationale a souhaité durcir l'interdiction des téléphones portables au collège, mais en pratique, elle n'est pas suffisamment appliquée car aucune sanction n'est prévue.\n\nLysiane Gervais (SNPDEN-Unsa) : « Dans 97 % des collèges, l'utilisation du portable est interdite. Une interdiction totale est impossible à gérer. »\n\nLes parents donnent des téléphones à leurs enfants pour pouvoir les joindre après la classe. Il y aurait autant de parents favorables à l'interdiction qu'à son autorisation.\n\nCatherine Nave-Bekhti (Sgen-CFDT) : « Ajouter de l'interdiction à l'interdiction ne dit pas comment on règle le problème. Tous les collèges ne sont pas équipés de casiers. Certains enseignants développent un usage pédagogique du numérique. On aurait préféré une réflexion collective. »\n\nJean-Thomas Giovannoni, professeur d'anglais : « Le véritable problème c'est ce qui se passe à la maison. Il faut que les parents apprennent à leurs enfants à garder une distance avec les écrans. »",
          text: "Une enquête montre que l'usage du téléphone portable à l'école a des conséquences négatives sur… des jeunes.",
          options: [
            "la concentration",
            "le niveau scolaire",
            "les relations sociales",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce1-q2',
          part: 4,
          text: "Selon Lysiane Gervais, dans l'intérêt des jeunes, il faudrait… le téléphone à l'école.",
          options: [
            "autoriser pleinement",
            "tolérer sous conditions",
            "interdire complètement",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce1-q3',
          part: 4,
          text: "Les parents seraient… l'utilisation du téléphone par les élèves à l'école.",
          options: [
            "très opposés à",
            "plutôt partagés sur",
            "globalement favorables à",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce1-q4',
          part: 4,
          text: "Pour Catherine Nave-Bekhti, interdire le portable à l'école est difficile par manque…",
          options: [
            "de personnel.",
            "de volonté politique.",
            "de moyens matériels.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'ce1-q5',
          part: 4,
          text: "Selon Catherine Nave-Bekhti, interdire le portable à l'école…",
          options: [
            "serait un obstacle aux libertés individuelles.",
            "priverait les élèves d'une éducation aux usages d'Internet.",
            "empêcherait les élèves de développer des relations sociales.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce1-q6',
          part: 4,
          text: "Pour Catherine Nave-Bekhti, la question du numérique à l'école est…",
          options: [
            "peu discutée.",
            "déjà dépassée.",
            "trop médiatisée.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce1-q7',
          part: 4,
          text: "Pour Jean-Thomas Giovannoni, la question de l'usage du téléphone chez les jeunes relève principalement de la responsabilité…",
          options: [
            "de l'école.",
            "de la famille.",
            "des jeunes eux-mêmes.",
          ],
          answer: 1,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 5 — CE Exercice 2 · Aller au travail à vélo
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 5,
      title: "Compréhension des écrits – Exercice 2",
      skill: 'reading',
      instructions: "Lisez l'article puis répondez aux questions.",
      questions: [
        {
          type: 'mcq',
          id: 'ce2-q1',
          part: 5,
          stimulusLabel: "Exercice 2 — Article : Aller au travail à vélo ?",
          stimulus:
            "Un grand plan vélo a été annoncé pour développer ce mode de transport, notamment grâce à « l'indemnité kilométrique » : ce dispositif autorise l'employeur à dédommager ses salariés se rendant au travail à vélo (environ 0,25 € par kilomètre).\n\nOlivier Schneider (FUB) : « L'indemnité n'est pas un privilège pour les cyclistes, mais une façon de mettre le vélo sur un pied d'égalité avec les autres modes de transport. L'employeur a déjà obligation de prendre en charge la moitié de l'abonnement aux transports en commun. »\n\nLe problème : cette indemnité n'est pas obligatoire et moins de 1 % des actifs français travaillent pour une structure qui la propose. Là où elle est appliquée, elle entraîne une augmentation de la part prise par le vélo de 125 % après un an.\n\nUn député note que 75 % des déplacements domicile-travail font moins de 5 km et 70 % de ces trajets sont faits en voiture. Pourtant, sur cette distance, le vélo est le mode de transport le plus performant en milieu urbain.\n\nUne étude montre que les cyclistes demandent d'abord plus de sécurité et des stationnements vélo. « Il faudra construire de nouvelles infrastructures, mais ça prendra du temps. »",
          text: "L'indemnité kilométrique pour le vélo est financée par…",
          options: [
            "les mairies.",
            "les entreprises.",
            "le gouvernement.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce2-q2',
          part: 5,
          text: "Pour Olivier Schneider, l'indemnité offerte aux usagers du vélo va… autres modes de transport.",
          options: [
            "réduire considérablement l'utilisation des",
            "donner au vélo une place comparable aux",
            "rendre le vélo plus avantageux financièrement que les",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce2-q3',
          part: 5,
          text: "D'après le texte, l'indemnité kilométrique pour le vélo est encore peu pratiquée car elle est…",
          options: [
            "facultative.",
            "peu connue.",
            "mal financée.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce2-q4',
          part: 5,
          text: "Dans les entreprises qui la mettent en place, l'indemnité kilométrique pour le vélo a des effets…",
          options: [
            "positifs.",
            "modérés.",
            "décevants.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce2-q5',
          part: 5,
          text: "Le moyen de transport le plus efficace pour se rendre au travail en ville serait actuellement…",
          options: [
            "le vélo.",
            "la voiture.",
            "les transports en commun.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce2-q6',
          part: 5,
          text: "Selon le député, l'usage du vélo permettrait aux employés d'être…",
          options: [
            "plus ponctuels.",
            "plus productifs.",
            "plus coopératifs.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce2-q7',
          part: 5,
          text: "Selon Olivier Schneider, les cyclistes attendent aujourd'hui…",
          options: [
            "de nouvelles règles de circulation.",
            "des aides financières plus importantes.",
            "des installations plus adaptées aux vélos.",
          ],
          answer: 2,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 6 — CE Exercice 3 · Adaptations de livres au cinéma (Luc/Sacha/Marjorie)
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 6,
      title: "Compréhension des écrits – Exercice 3",
      skill: 'reading',
      instructions:
        "Vous lisez l'opinion de trois personnes sur un forum dont le sujet est « Adaptations de livres au cinéma : pour ou contre ? ». Pour chaque affirmation, associez la bonne personne (Luc, Sacha ou Marjorie).",
      questions: [
        {
          type: 'mcq',
          id: 'ce3-q1',
          part: 6,
          stimulusLabel: "Exercice 3 — Forum : adaptations cinématographiques",
          stimulus:
            "Luc : « Lorsqu'un cinéaste adapte un livre, il donne sa propre vision. Cela peut être très réducteur, mais peut aussi ouvrir d'autres réflexions. L'adaptation peut donner envie de lire le livre. Moi, je lis des livres que j'ai découverts à travers des films. »\n\nSacha : « Il faut accepter que des passages du livre soient coupés ou modifiés, car l'écriture et l'adaptation cinématographique sont des travaux différents. Que faut-il juger : un film par rapport au livre, ou tout simplement le film pour ce qu'il est ? Je préfère des changements plutôt qu'un simple copier-coller sans originalité. »\n\nMarjorie : « Je n'aime pas trop quand un livre que j'ai adoré se retrouve au cinéma. J'ai l'impression de perdre le monde imaginaire que je me suis créé. Une adaptation a beaucoup plus de chances de nous décevoir. Rien ne vaut un bon livre ! »",
          text: "Il est injuste de comparer un roman à son adaptation cinématographique.",
          options: ["Luc", "Sacha", "Marjorie"],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce3-q2',
          part: 6,
          text: "Les films adaptés de romans peuvent encourager les gens à lire.",
          options: ["Luc", "Sacha", "Marjorie"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce3-q3',
          part: 6,
          text: "Un cinéaste qui adapte un livre doit forcément prendre de la distance par rapport au livre.",
          options: ["Luc", "Sacha", "Marjorie"],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce3-q4',
          part: 6,
          text: "Il est plus plaisant de lire un roman que de voir son adaptation cinématographique.",
          options: ["Luc", "Sacha", "Marjorie"],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'ce3-q5',
          part: 6,
          text: "Les films adaptés de romans sont l'interprétation personnelle des cinéastes.",
          options: ["Luc", "Sacha", "Marjorie"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce3-q6',
          part: 6,
          text: "Les adaptations cinématographiques détruisent l'image fictive donnée par les œuvres littéraires.",
          options: ["Luc", "Sacha", "Marjorie"],
          answer: 2,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 7 — Production écrite · Lettre formelle au maire
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 7,
      title: "Production écrite",
      skill: 'writing',
      instructions:
        "Lisez attentivement la consigne. Vous disposez de 1 heure pour réaliser cette tâche.",
      questions: [
        {
          type: 'write',
          id: 'pe-q1',
          part: 7,
          taskNumber: 1,
          stimulusLabel: "Lettre formelle — zone piétonne",
          stimulus:
            "Vous vivez en France dans une zone piétonne du centre-ville. Le maire de votre ville a décidé d'ouvrir certaines des rues de cette zone à la circulation des autobus pendant la journée. Comme représentant(e) de votre immeuble, vous écrivez une lettre au maire pour contester cette décision en justifiant votre point de vue.",
          text: "Écrivez votre lettre au maire (250 mots minimum). Utilisez un registre formel. Présentez au moins trois arguments contre cette décision et proposez une alternative.",
          minWords: 250,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 8 — Production orale · Présentation + défense d'un point de vue
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 8,
      title: "Production orale",
      skill: 'speaking',
      instructions:
        "Vous disposez de 30 minutes de préparation, puis 20 minutes d'épreuve. Présentez et défendez votre point de vue à partir du document déclencheur ci-dessous.",
      questions: [
        {
          type: 'speak',
          id: 'po-q1',
          part: 8,
          partNumber: 1,
          text: "Production orale — Présentation et défense d'un point de vue",
          cueCard:
            "Document déclencheur :\n\n« De plus en plus d'entreprises adoptent le télétravail à temps plein. Certains y voient une révolution du monde du travail, d'autres craignent l'isolement des employés et la perte du lien social en entreprise. »\n\nConsigne :\n1. Dégagez le problème soulevé par le document\n2. Présentez votre point de vue de manière argumentée\n3. Défendez votre position face aux questions de l'examinateur\n\nDurée : 20 minutes (préparation : 30 minutes)",
          followUp: [
            "Pensez-vous que le télétravail peut remplacer complètement le travail en présentiel ?",
            "Quels types de travailleurs seraient les plus affectés par le télétravail permanent ?",
            "Comment les entreprises peuvent-elles maintenir la cohésion d'équipe à distance ?",
            "Quels sont les risques du télétravail sur la santé mentale des employés ?",
            "La question du télétravail est-elle différente selon les secteurs professionnels ?",
          ],
        },
      ],
    },
  ],
};

export default mock;
