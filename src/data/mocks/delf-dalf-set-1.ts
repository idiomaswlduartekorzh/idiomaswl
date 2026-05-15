import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-1',
  examSlug: 'delf-dalf',
  title: "DELF B1 – Épreuve 1",
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 165,
  sections: [
    // ─────────────────────────────────────────────────────────────────────────
    // Section 1 — Compréhension de l'oral – Document 1
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 1,
      title: "Compréhension de l'oral – Document 1",
      skill: 'listening',
      audioUrl: '/audio/delf/set-1-doc1.mp3',
      instructions:
        'Escucha la grabación. Lee primero las preguntas, luego escucha y responde.',
      transcript:
        "Bonjour à tous et bienvenue dans notre émission locale. Aujourd'hui, nous parlons d'un projet qui réunit des habitants du quartier Saint-Jean à Lyon. Il s'agit d'un jardin communautaire installé dans une ancienne friche industrielle. Plus de cinquante familles participent déjà à cette belle initiative. Chaque semaine, le samedi matin, les participants se retrouvent pour cultiver des légumes — tomates, courgettes, haricots — et aussi des fleurs. L'idée est venue d'une association de voisins qui voulait redonner vie à cet espace abandonné. Les bénévoles partagent les récoltes et organisent parfois des ateliers de cuisine. Pour en savoir plus ou pour rejoindre le projet, vous pouvez contacter la mairie du troisième arrondissement. C'est une initiative formidable qui renforce les liens entre voisins et qui montre que la ville peut aussi être un espace de nature et de partage.",
      questions: [
        {
          type: 'formgroup',
          id: 'p1-q1',
          part: 1,
          qRange: [1, 5],
          groupLabel:
            'Complétez la fiche de présentation du projet. Écrivez UN MOT ou un nombre par réponse.',
          title: 'Fiche du projet – Jardin communautaire',
          template:
            "Lieu du projet: jardin communautaire à {{1}}\nNombre de participants: plus de {{2}} familles\nActivité principale: culture de {{3}} et de fleurs\nJour d'ouverture: le {{4}}\nContact: mairie du {{5}} arrondissement",
          blanks: [
            { num: 1, answers: ['Lyon', 'lyon'] },
            { num: 2, answers: ['cinquante', '50'] },
            { num: 3, answers: ['légumes'] },
            { num: 4, answers: ['samedi'] },
            { num: 5, answers: ['troisième', '3e', '3ème', '3'] },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 2 — Compréhension de l'oral – Document 2
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 2,
      title: "Compréhension de l'oral – Document 2",
      skill: 'listening',
      audioUrl: '/audio/delf/set-1-doc2.mp3',
      instructions:
        'Escucha la entrevista. Responde a las preguntas eligiendo la opción correcta.',
      transcript:
        "Présentateur: Bonjour et bienvenue dans «À table!». Aujourd'hui, nous recevons Julien Marchand, chef cuisinier qui vient d'ouvrir un restaurant pas comme les autres à Bordeaux. Bonjour Julien.\n\nJulien: Bonjour, merci de m'inviter.\n\nPrésentateur: Julien, pouvez-vous nous parler de votre parcours?\n\nJulien: Bien sûr. J'ai commencé à cuisiner avec ma grand-mère dans le sud de la France quand j'avais dix ans. Ensuite, j'ai fait une formation dans une école hôtelière à Paris, et j'ai travaillé dans plusieurs restaurants étoilés pendant une dizaine d'années.\n\nPrésentateur: Et pourquoi avez-vous décidé d'ouvrir ce restaurant différent?\n\nJulien: Parce que j'en avais assez de voir la gastronomie réservée aux gens riches. Je voulais que tout le monde puisse manger des plats de qualité sans se ruiner. Dans mon restaurant, un menu complet — entrée, plat et dessert — coûte seulement douze euros.\n\nPrésentateur: C'est très peu pour un repas gastronomique! Comment est-ce possible?\n\nJulien: On travaille avec des producteurs locaux qui nous vendent leurs produits à prix réduit parce qu'ils soutiennent notre projet. On évite aussi le gaspillage alimentaire: on utilise tous les légumes, même ceux qui ne sont pas parfaits.\n\nPrésentateur: Et quels sont vos projets pour l'avenir?\n\nJulien: Je voudrais ouvrir deux autres restaurants à Lyon et à Marseille d'ici deux ans. Et pourquoi pas créer une fondation pour former des jeunes en difficulté aux métiers de la cuisine?\n\nPrésentateur: Merci beaucoup, Julien, c'est une belle initiative!",
      questions: [
        {
          type: 'mcq',
          id: 'p2-q1',
          part: 2,
          text: "Où Julien a-t-il appris à cuisiner pour la première fois?",
          options: [
            "Dans une école hôtelière à Paris",
            "Avec sa grand-mère dans le sud de la France",
            "Dans un restaurant étoilé",
            "À l'université de Bordeaux",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p2-q2',
          part: 2,
          text: "Combien d'années Julien a-t-il travaillé dans des restaurants étoilés?",
          options: [
            "Cinq ans",
            "Vingt ans",
            "Une dizaine d'années",
            "Deux ans",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2-q3',
          part: 2,
          text: "Quelle est l'idée principale du restaurant de Julien?",
          options: [
            "Proposer des repas gastronomiques à des prix accessibles à tous",
            "Vendre des produits biologiques importés",
            "Former des chefs étoilés",
            "Organiser des cours de cuisine pour enfants",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p2-q4',
          part: 2,
          text: "Quel est le prix d'un menu complet dans le restaurant de Julien?",
          options: [
            "Vingt euros",
            "Trente euros",
            "Huit euros",
            "Douze euros",
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p2-q5',
          part: 2,
          text: "Comment Julien réduit-il les coûts dans son restaurant?",
          options: [
            "Il utilise uniquement des produits surgelés",
            "Il travaille avec des producteurs locaux et évite le gaspillage",
            "Il emploie des bénévoles",
            "Il ne propose pas de dessert",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p2-q6',
          part: 2,
          text: "Quel est l'un des projets futurs de Julien?",
          options: [
            "Ouvrir un restaurant à l'étranger",
            "Écrire un livre de cuisine",
            "Créer une fondation pour former des jeunes en difficulté",
            "Participer à une émission de télévision",
          ],
          answer: 2,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 3 — Compréhension des écrits
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 3,
      title: "Compréhension des écrits",
      skill: 'reading',
      instructions:
        'Lee los textos y responde a las preguntas eligiendo la opción correcta.',
      questions: [
        // ── Texte 1 : Le slow travel ─────────────────────────────────────────
        {
          type: 'mcq',
          id: 'p3-q1',
          part: 3,
          stimulusLabel: 'Texte 1 — Article de magazine',
          stimulus:
            "Le slow travel : voyager autrement\n\nDepuis quelques années, une nouvelle tendance transforme la façon dont les gens voyagent : le slow travel, ou «voyage lent». Contrairement au tourisme classique qui cherche à visiter un maximum de destinations en un minimum de temps, le slow travel propose de prendre son temps pour découvrir un seul endroit en profondeur.\n\nLes adeptes de cette philosophie préfèrent le train ou le vélo à l'avion. Ces modes de transport permettent d'admirer les paysages et de traverser des villages que l'on ne verrait jamais depuis un avion. Un voyage Paris–Barcelone en train, par exemple, offre une vue magnifique sur les Pyrénées.\n\nLe slow travel, c'est aussi s'immerger dans la culture locale : manger dans les marchés du quartier, apprendre quelques mots de la langue, loger chez des habitants plutôt que dans un hôtel international. On revient transformé, avec des souvenirs riches et des rencontres authentiques.\n\nCette tendance répond également à une préoccupation environnementale. Le transport aérien est l'une des activités les plus polluantes, et de nombreux voyageurs choisissent maintenant de réduire leur empreinte carbone en voyageant moins vite et moins loin. Le slow travel n'est pas un sacrifice : c'est une invitation à profiter pleinement de chaque moment.",
          text: "Quelle est l'idée principale du slow travel?",
          options: [
            "Visiter le plus de pays possible en peu de temps",
            "Prendre le temps de découvrir un endroit en profondeur",
            "Voyager uniquement en avion pour gagner du temps",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3-q2',
          part: 3,
          text: "Quels moyens de transport les adeptes du slow travel préfèrent-ils?",
          options: [
            "L'avion et la voiture",
            "Le bateau et le bus",
            "Le train et le vélo",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3-q3',
          part: 3,
          text: "Pourquoi le slow travel est-il meilleur pour l'environnement?",
          options: [
            "Parce qu'il évite d'utiliser des transports très polluants comme l'avion",
            "Parce qu'on mange uniquement des produits locaux",
            "Parce qu'on reste dans des hôtels écologiques",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3-q4',
          part: 3,
          text: "Qu'est-ce que l'auteur veut dire par «s'immerger dans la culture locale»?",
          options: [
            "Visiter uniquement les musées et les monuments",
            "Participer à la vie quotidienne : marchés, langue, logement chez l'habitant",
            "Apprendre l'histoire du pays dans des livres",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3-q5',
          part: 3,
          text: "Selon l'article, le slow travel est…",
          options: [
            "Une contrainte difficile pour les voyageurs modernes",
            "Une mode passagère sans intérêt réel",
            "Une invitation à profiter pleinement de chaque moment",
          ],
          answer: 2,
        },

        // ── Texte 2 : Lettre d'une étudiante ────────────────────────────────
        {
          type: 'mcq',
          id: 'p3-q6',
          part: 3,
          stimulusLabel: 'Texte 2 — Lettre personnelle',
          stimulus:
            "Chère Lucie,\n\nJe t'écris depuis Montréal où je vis depuis maintenant huit mois. Mon année au Canada a vraiment changé ma façon de voir les choses. Avant de partir, j'avais peur de ne pas trouver ma place dans une société si différente de la mienne. Mais en réalité, les Canadiens sont très accueillants et ouverts.\n\nJ'ai appris à être plus autonome. Ici, je gère seule mon appartement, mes courses et mes finances. Ce n'est pas toujours facile, mais j'ai gagné beaucoup de confiance en moi. À l'université, les cours sont très différents : on participe activement, on débat, on propose des idées. En France, j'étais habituée à écouter le professeur sans trop intervenir.\n\nJ'ai aussi découvert à quel point le bilinguisme est important ici. Même si on parle français au Québec, l'anglais est partout et il faut jongler entre les deux langues chaque jour. Cela m'a motivée à perfectionner mon anglais.\n\nCe qui m'a le plus surprise, c'est la relation des Canadiens avec la nature. Ils font de la randonnée, du ski, du kayak… Le plein air fait partie de leur vie quotidienne. J'ai découvert le ski alpin et je suis tombée amoureuse de ce sport!\n\nÀ bientôt,\nSophie",
          text: "Sophie avait peur avant de partir au Canada.",
          options: ['Vrai', 'Faux'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3-q7',
          part: 3,
          text: "À l'université canadienne, les étudiants participent peu en classe.",
          options: ['Vrai', 'Faux'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3-q8',
          part: 3,
          text: "Au Québec, on parle uniquement anglais.",
          options: ['Vrai', 'Faux'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3-q9',
          part: 3,
          text: "Sophie a appris à gérer sa vie quotidienne de façon plus autonome.",
          options: ['Vrai', 'Faux'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3-q10',
          part: 3,
          text: "Sophie a découvert le ski alpin au Canada et elle aime ce sport.",
          options: ['Vrai', 'Faux'],
          answer: 0,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 4 — Production écrite
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 4,
      title: "Production écrite",
      skill: 'writing',
      instructions:
        'Responde a las dos tareas de escritura. Lee atentamente cada consigna antes de empezar.',
      questions: [
        {
          type: 'write',
          id: 'p4-q1',
          part: 4,
          taskNumber: 1,
          stimulusLabel: 'Document à compléter',
          stimulus:
            "Vous avez gagné un concours organisé par une école de langues française. Remplissez le formulaire d'inscription au séjour linguistique à Paris.",
          text:
            "Complétez le formulaire avec vos informations personnelles et vos préférences pour le séjour (hébergement, activités, régime alimentaire).",
          minWords: 60,
        },
        {
          type: 'write',
          id: 'p4-q2',
          part: 4,
          taskNumber: 2,
          stimulusLabel: 'Lettre ou message',
          stimulus:
            "Vous avez lu un article qui dit que les jeunes d'aujourd'hui ne lisent plus de livres papier et préfèrent les écrans. Vous n'êtes pas d'accord. Écrivez une lettre au journal pour exprimer votre point de vue. Donnez des arguments et des exemples personnels.",
          text: "Écrivez votre lettre (180 à 220 mots).",
          minWords: 180,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 5 — Production orale
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 5,
      title: "Production orale",
      skill: 'speaking',
      instructions:
        'La prueba oral se desarrolla en tres partes. Lee cada consigna con atención.',
      questions: [
        {
          type: 'speak',
          id: 'p5-q1',
          part: 5,
          partNumber: 1,
          text:
            "Présentez-vous brièvement, puis parlez d'un sujet qui vous tient à cœur: votre passion, votre culture, votre région ou un projet que vous avez réalisé.",
          followUp: [
            "Depuis quand vous intéressez-vous à ce sujet?",
            "Comment cela a-t-il changé votre vie quotidienne?",
            "Avez-vous rencontré des difficultés?",
          ],
        },
        {
          type: 'speak',
          id: 'p5-q2',
          part: 5,
          partNumber: 2,
          text:
            "Vous souhaitez organiser un voyage en France avec un(e) ami(e). Discutez ensemble: la région à visiter, le moyen de transport, le budget et les activités.",
          cueCard:
            "Points à discuter:\n• Destination: nord, sud, Paris ou région?\n• Transport: avion, train, voiture?\n• Budget: hébergement et restaurants\n• Activités: culture, nature, gastronomie?",
        },
        {
          type: 'speak',
          id: 'p5-q3',
          part: 5,
          partNumber: 3,
          text:
            "Certaines personnes pensent que le travail à distance (télétravail) est meilleur que travailler au bureau. Qu'en pensez-vous? Défendez votre point de vue.",
          followUp: [
            "Quels sont les avantages du télétravail selon vous?",
            "Quels problèmes peut-il créer?",
            "Est-ce que vous préféreriez travailler de chez vous ou au bureau?",
          ],
        },
      ],
    },
  ],
};

export default mock;
