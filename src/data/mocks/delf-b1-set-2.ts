import type { MockExam } from './types';

// Source: DELF B1 Tout Public – Sujet démo 02 (France Éducation International)
const mock: MockExam = {
  id: 'set-2',
  examSlug: 'delf-dalf',
  title: 'DELF B1 – Épreuve officielle (Sujet démo 02)',
  subtitle: "Compréhension de l'oral · Compréhension des écrits · Production écrite · Production orale",
  timeMinutes: 115,
  sections: [
    // ─────────────────────────────────────────────────────────────────────────
    // Section 1 — Compréhension de l'oral · Exercice 1
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 1,
      title: "Compréhension de l'oral – Exercice 1",
      skill: 'listening',
      audioUrl: '/audio/delf/set-2-doc1.mp3',
      instructions: "Vous écoutez une conversation. Lisez les questions. Écoutez le document (2 écoutes) puis répondez.",
      questions: [
        {
          type: 'mcq',
          id: 'co-ex1-q1',
          part: 1,
          stimulusLabel: "Exercice 1 — Conversation",
          text: "Qu'est-ce que Célia va fêter ?",
          options: ["Son diplôme.", "Son mariage.", "Son anniversaire."],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'co-ex1-q2',
          part: 1,
          text: "Il y aura seulement quelques amis à la fête parce que…",
          options: [
            "la maison est petite.",
            "beaucoup ne sont pas disponibles.",
            "Célia veut avoir le temps de discuter avec chacun.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'co-ex1-q3',
          part: 1,
          text: "Lilian va arriver un peu plus tard parce qu'il…",
          options: [
            "va manger chez ses parents.",
            "doit s'occuper de ses enfants.",
            "travaille une partie du week-end.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'co-ex1-q4',
          part: 1,
          text: "Lilian accepte de venir à la fête parce qu'il…",
          options: [
            "adore la montagne.",
            "est très proche de Célia.",
            "souhaite découvrir la région.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'co-ex1-q5',
          part: 1,
          text: "Le repas de la fête sera préparé par…",
          options: ["Célia.", "tout le monde.", "un restaurateur."],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co-ex1-q6',
          part: 1,
          text: "Pour sa fête, Célia espère…",
          options: [
            "qu'il fera beau.",
            "qu'elle aura un beau cadeau.",
            "que tous ses amis viendront.",
          ],
          answer: 0,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 2 — Compréhension de l'oral · Exercice 2
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 2,
      title: "Compréhension de l'oral – Exercice 2",
      skill: 'listening',
      audioUrl: '/audio/delf/set-2-doc2.mp3',
      instructions: "Vous écoutez la radio. Lisez les questions. Écoutez le document (2 écoutes) puis répondez.",
      questions: [
        {
          type: 'mcq',
          id: 'co-ex2-q1',
          part: 2,
          stimulusLabel: "Exercice 2 — Radio : Un regard pour toi",
          text: "Grâce à Un regard pour toi, les personnes malvoyantes peuvent acheter leurs vêtements…",
          options: [
            "accompagnées par un bénévole.",
            "dans des magasins spécialisés.",
            "sur le site internet de l'association.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'co-ex2-q2',
          part: 2,
          text: "Hayette trouve que les employés des magasins sont trop…",
          options: ["curieux.", "occupés.", "désagréables."],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co-ex2-q3',
          part: 2,
          text: "Grâce à l'association, Hayette…",
          options: [
            "a de nouveaux amis.",
            "s'habille de manière différente.",
            "dépense moins d'argent pour s'habiller.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co-ex2-q4',
          part: 2,
          text: "Les collègues d'Hayette…",
          options: [
            "lui donnent des conseils.",
            "sont surpris par sa façon de s'habiller.",
            "veulent savoir où elle trouve ses vêtements.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'co-ex2-q5',
          part: 2,
          text: "Pour les malvoyants, les vêtements permettent de…",
          options: [
            "développer la confiance en soi.",
            "s'intégrer professionnellement.",
            "discuter de la mode avec leurs amis.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'co-ex2-q6',
          part: 2,
          text: "Quel appel lance Hayette ?",
          options: [
            "Elle a besoin de personnes pour l'aider.",
            "Elle invite les malvoyants à la contacter.",
            "Elle recherche un local pour l'association.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co-ex2-q7',
          part: 2,
          text: "Quand ils entrent dans l'association, les bénévoles doivent…",
          options: [
            "assister à une présentation de la responsable.",
            "participer à une réunion avec d'autres membres.",
            "avoir un rendez-vous téléphonique avec un malvoyant.",
          ],
          answer: 2,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 3 — Compréhension de l'oral · Exercice 3
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 3,
      title: "Compréhension de l'oral – Exercice 3",
      skill: 'listening',
      audioUrl: '/audio/delf/set-2-doc3.mp3',
      instructions: "Vous écoutez la radio. Lisez les questions. Écoutez le document (2 écoutes) puis répondez.",
      questions: [
        {
          type: 'mcq',
          id: 'co-ex3-q1',
          part: 3,
          stimulusLabel: "Exercice 3 — Radio : Baluchon",
          text: "La société Baluchon…",
          options: [
            "apporte des repas dans les entreprises.",
            "propose des cours de cuisine aux salariés.",
            "livre des produits dans les restaurations collectives.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'co-ex3-q2',
          part: 3,
          text: "Selon François Dechy, le temps que les gens prennent pour manger…",
          options: ["diminue.", "est stable.", "augmente."],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'co-ex3-q3',
          part: 3,
          text: "Selon François Dechy, le moment du déjeuner est important pour…",
          options: [
            "mieux travailler.",
            "rester en bonne santé.",
            "rencontrer ses collègues.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'co-ex3-q4',
          part: 3,
          text: "François Dechy veut proposer un service…",
          options: ["rapide.", "biologique.", "bon marché."],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'co-ex3-q5',
          part: 3,
          text: "François Dechy travaille avec…",
          options: [
            "de jeunes étudiants.",
            "des personnes en difficulté.",
            "des diplômés de la restauration.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'co-ex3-q6',
          part: 3,
          text: "Baluchon est une entreprise qui propose aussi…",
          options: [
            "des formations professionnalisantes.",
            "des rencontres avec de grands cuisiniers.",
            "des cours de lecture et de mathématiques.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'co-ex3-q7',
          part: 3,
          text: "Quel est l'avantage de la cuisine prêtée par la mairie ? Elle est…",
          options: ["bien située.", "très grande.", "toute équipée."],
          answer: 2,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 4 — Compréhension des écrits
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 4,
      title: "Compréhension des écrits",
      skill: 'reading',
      instructions: "Répondez aux questionnaires de compréhension portant sur les documents écrits.",
      questions: [
        // ── Exercice 1 – Restaurants à Lyon (OUI/NON) ────────────────────────
        {
          type: 'mcq',
          id: 'ce-ex1-q1',
          part: 4,
          stimulusLabel: "Exercice 1 — Vous organisez un repas d'affaires à Lyon. Critères : cuisine régionale, menus sans viande ni poisson, endroit calme, service de qualité.",
          stimulus:
            "Au Balcon\nCuisine classique à base de produits régionaux. Menu « tout légumes » apprécié. Cadre tranquille, idéal pour repas d'affaires. Les serveurs sont mal organisés.\n\nLe Bonheur dans l'assiette\nSpécialités de la région lyonnaise. Pas de plats sans viande. Ambiance animée, un peu trop bruyante. Serveurs sympas et très attentionnés.\n\nLe Lyon exotique\nSaucisson lyonnais + plats brésiliens. Légumes colorés disponibles. Bruyant surtout en fin de semaine. Serveurs souriants mais peu efficaces.\n\nLe Piano\nMeilleures recettes lyonnaises, produits frais du marché. Pas de plats de légumes à la carte. Petit salon calme pour réunions privées. Service très professionnel.",
          text: "AU BALCON — Cuisine régionale de Lyon ?",
          options: ["OUI", "NON"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q2',
          part: 4,
          text: "AU BALCON — Menu sans viande ni poisson ?",
          options: ["OUI", "NON"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q3',
          part: 4,
          text: "AU BALCON — Endroit calme ?",
          options: ["OUI", "NON"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q4',
          part: 4,
          text: "AU BALCON — Service de qualité ?",
          options: ["OUI", "NON"],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q5',
          part: 4,
          text: "LE BONHEUR DANS L'ASSIETTE — Cuisine régionale de Lyon ?",
          options: ["OUI", "NON"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q6',
          part: 4,
          text: "LE BONHEUR DANS L'ASSIETTE — Menu sans viande ni poisson ?",
          options: ["OUI", "NON"],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q7',
          part: 4,
          text: "LE BONHEUR DANS L'ASSIETTE — Endroit calme ?",
          options: ["OUI", "NON"],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q8',
          part: 4,
          text: "LE BONHEUR DANS L'ASSIETTE — Service de qualité ?",
          options: ["OUI", "NON"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q9',
          part: 4,
          text: "LE LYON EXOTIQUE — Cuisine régionale de Lyon ?",
          options: ["OUI", "NON"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q10',
          part: 4,
          text: "LE LYON EXOTIQUE — Menu sans viande ni poisson ?",
          options: ["OUI", "NON"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q11',
          part: 4,
          text: "LE LYON EXOTIQUE — Endroit calme ?",
          options: ["OUI", "NON"],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q12',
          part: 4,
          text: "LE LYON EXOTIQUE — Service de qualité ?",
          options: ["OUI", "NON"],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q13',
          part: 4,
          text: "LE PIANO — Cuisine régionale de Lyon ?",
          options: ["OUI", "NON"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q14',
          part: 4,
          text: "LE PIANO — Menu sans viande ni poisson ?",
          options: ["OUI", "NON"],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q15',
          part: 4,
          text: "LE PIANO — Endroit calme ?",
          options: ["OUI", "NON"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex1-q16',
          part: 4,
          text: "LE PIANO — Service de qualité ?",
          options: ["OUI", "NON"],
          answer: 0,
        },

        // ── Exercice 2 – Bilinguisme ─────────────────────────────────────────
        {
          type: 'mcq',
          id: 'ce-ex2-q1',
          part: 4,
          stimulusLabel: "Exercice 2 — Article : Parler deux langues est-il un atout ou un handicap pour les enfants ?",
          stimulus:
            "En France, un enfant sur cinq naît dans un foyer bilingue. « À 24 mois, les enfants connaissent une cinquantaine de mots. Pour les enfants bilingues, ces mots sont partagés entre les deux langues. Quand on étudie le vocabulaire des enfants bilingues et monolingues à trois ans, on trouve le même nombre de mots, en moyenne. » — Barbara Abdelilah-Bauer, linguiste.\n\nJohanna, irlandaise vivant à Nantes : « En France, si je parle anglais à mon fils Mathias, il me répond plutôt en français. Ce n'est qu'en Irlande, au bout de quelques semaines, qu'il fait des phrases en anglais. Lorsqu'il m'arrive de me fâcher contre mon fils, j'utilise spontanément ma langue maternelle. »\n\nIbsen, danois : « Je leur apprends des chansons en danois et elles regardent aussi des dessins animés en danois. Mais dans leur vie quotidienne, à l'école ou avec leurs copains, c'est le français qui l'emporte. Ce n'est vraiment pas simple de transmettre sa langue lorsqu'on n'est pas dans son pays d'origine ! »\n\nBarbara Abdelilah-Bauer : « Certains pensent qu'un enfant élevé dans deux langues réussit moins bien à l'école. » Ce qui est faux. « On voit souvent la capacité à parler anglais comme une force, mais pas forcément d'autres langues. Je reçois des couples franco-espagnols qui n'ont qu'une envie : que leur enfant apprenne l'anglais. »",
          text: "Selon Barbara Abdelilah-Bauer, vers 3 ans, les enfants bilingues…",
          options: [
            "ont tendance à mélanger les deux langues.",
            "apprennent plus rapidement des mots dans les deux langues.",
            "possèdent autant de vocabulaire que les enfants monolingues.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'ce-ex2-q2',
          part: 4,
          text: "En Irlande, le fils de Johanna a besoin de temps pour communiquer en anglais avec sa famille.",
          options: ["Vrai", "Faux"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex2-q3',
          part: 4,
          text: "Johanna parle plus naturellement l'anglais quand elle est en colère contre son fils.",
          options: ["Vrai", "Faux"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex2-q4',
          part: 4,
          text: "Les filles d'Ibsen utilisent le danois quand elles…",
          options: [
            "discutent en famille.",
            "jouent avec leurs amis.",
            "chantent avec leur père.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'ce-ex2-q5',
          part: 4,
          text: "Au quotidien, il est facile et naturel pour Ibsen de parler danois à ses filles.",
          options: ["Vrai", "Faux"],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce-ex2-q6',
          part: 4,
          text: "Certaines personnes pensent que les enfants bilingues…",
          options: [
            "apprennent moins vite à l'école.",
            "ont de moins bons résultats à l'école.",
            "communiquent moins facilement à l'école.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce-ex2-q7',
          part: 4,
          text: "Barbara Abdelilah-Bauer regrette que…",
          options: [
            "l'enseignement des langues soit peu varié.",
            "la société donne trop d'importance à l'anglais.",
            "les enfants bilingues soient aussi peu accompagnés.",
          ],
          answer: 1,
        },

        // ── Exercice 3 – Locations saisonnières ──────────────────────────────
        {
          type: 'mcq',
          id: 'ce-ex3-q1',
          part: 4,
          stimulusLabel: "Exercice 3 — Article : L'impact des locations saisonnières sur l'immobilier",
          stimulus:
            "Les touristes séjournent de plus en plus dans des appartements loués sur des sites internet. Laurent Lopez, directeur d'hôtel : « notre chiffre d'affaire baisse de 10 % chaque année depuis 3 ans. » À Barcelone, le quartier historique se vide de ses habitants : 15 624 résidents aujourd'hui contre 27 470 en 2006.\n\nYolande, habitante de Paris : « Les arrivées et départs à n'importe quelle heure, les fêtes toute la nuit, les groupes de touristes dans le hall… Un voisin voulait absolument un ascenseur pour attirer les touristes. Ça nous a coûté de l'argent. J'ai été me plaindre à la mairie mais ça n'a servi à rien ! »\n\nLe marché rapporte en moyenne 350 € supplémentaires par mois pour les propriétaires à Amsterdam. Paris et Londres ont décidé de limiter la durée de location. Les sites internet affirment que les problèmes de logement existaient déjà avant leur arrivée.\n\nLes habitants des quartiers historiques voient leurs rues se vider de leurs magasins de quartier. Maintenant, les rues se remplissent de restaurants chics, de boutiques de souvenirs et de valises à roulettes.",
          text: "En Europe, les réservations dans les hôtels ont fortement augmenté.",
          options: ["Vrai", "Faux"],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce-ex3-q2',
          part: 4,
          text: "À Barcelone, les habitants quittent le centre-ville car les logements sont trop…",
          options: ["chers.", "petits.", "bruyants."],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex3-q3',
          part: 4,
          text: "Yolande trouve que les locations saisonnières…",
          options: [
            "donnent une mauvaise image de la ville.",
            "ne lui rapportent pas suffisamment d'argent.",
            "provoquent trop de passage dans son immeuble.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'ce-ex3-q4',
          part: 4,
          text: "Pour quelle raison Yolande est-elle en colère ? Parce que…",
          options: [
            "les touristes ne la saluent pas.",
            "les dépenses de l'immeuble ont augmenté.",
            "la mairie autorise trop de locations saisonnières.",
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'ce-ex3-q5',
          part: 4,
          text: "D'après les sites internet de locations saisonnières, les difficultés à se loger en centre-ville ne sont pas nouvelles.",
          options: ["Vrai", "Faux"],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'ce-ex3-q6',
          part: 4,
          text: "Les habitants des centres-villes regrettent…",
          options: [
            "l'absence de solidarité des voisins.",
            "le manque d'éducation des touristes.",
            "la disparition des commerces de proximité.",
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'ce-ex3-q7',
          part: 4,
          text: "En séjournant dans les centres-villes, les touristes ont accès à une vie de quartier traditionnelle.",
          options: ["Vrai", "Faux"],
          answer: 1,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 5 — Production écrite
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 5,
      title: "Production écrite",
      skill: 'writing',
      instructions: "Répondez au mail de votre amie française Louisa. Donnez votre opinion en utilisant des exemples d'expériences diverses. Minimum 160 mots.",
      questions: [
        {
          type: 'write',
          id: 'pe-q1',
          part: 5,
          taskNumber: 1,
          stimulusLabel: "Mail de Louisa, amie française",
          stimulus:
            "De : louisa.martin@courriel.fr\nObjet : Ton avis sur les réseaux sociaux\n\nSalut !\n\nDans mon cours, on vient de débattre sur les réseaux sociaux. Certains pensent qu'ils sont très utiles pour rester en contact et partager des informations. D'autres pensent qu'ils prennent trop de place dans notre vie.\n\nEt toi, qu'est-ce que tu penses des réseaux sociaux ? Tu les utilises souvent ? Est-ce qu'ils t'ont aidé ou créé des problèmes dans ta vie ?\n\nJ'attends ta réponse !\nLouisa",
          text: "Répondez au mail de Louisa. Donnez votre opinion sur les réseaux sociaux avec des exemples personnels. (160 mots minimum)",
          minWords: 160,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Section 6 — Production orale
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 6,
      title: "Production orale",
      skill: 'speaking',
      instructions: "L'épreuve se déroule en trois parties. Durée totale : 15 min environ (préparation : 10 min pour la 3e partie seulement).",
      questions: [
        {
          type: 'speak',
          id: 'po-q1',
          part: 6,
          partNumber: 1,
          text: "Entretien dirigé — Présentez-vous, parlez de votre famille, de vos études ou de votre travail, de vos activités et de vos projets.",
          followUp: [
            "Où habitez-vous ? Depuis combien de temps ?",
            "Qu'est-ce que vous faites dans la vie ?",
            "Qu'est-ce que vous aimez faire pendant votre temps libre ?",
            "Pourquoi apprenez-vous le français ?",
          ],
        },
        {
          type: 'speak',
          id: 'po-q2',
          part: 6,
          partNumber: 2,
          text: "Exercice en interaction — Vous souhaitez vous inscrire à un programme d'échange culturel en France. Vous téléphonez au bureau d'information pour obtenir des détails.",
          cueCard:
            "Points à discuter :\n• Durée et dates du programme\n• Logement proposé\n• Activités culturelles incluses\n• Coût et modalités d'inscription\n• Niveau de français requis",
        },
        {
          type: 'speak',
          id: 'po-q3',
          part: 6,
          partNumber: 3,
          text: "Expression d'un point de vue — Lisez le document, puis présentez votre point de vue de façon claire et organisée.",
          cueCard:
            "Document déclencheur :\n\n« De plus en plus de personnes choisissent de travailler en indépendant plutôt que d'être salariées dans une entreprise. Cette tendance offre plus de liberté mais aussi plus d'instabilité financière. Certains experts pensent que dans 10 ans, la majorité des travailleurs sera indépendante. »\n\n→ Qu'est-ce que vous pensez du travail indépendant ? Quels sont ses avantages et ses inconvénients ?",
          followUp: [
            "Vous-même, préférez-vous travailler de manière indépendante ou être salarié(e) ?",
            "Pensez-vous que le travail indépendant est adapté à tous les secteurs professionnels ?",
            "Comment la société devrait-elle soutenir les travailleurs indépendants ?",
          ],
        },
      ],
    },
  ],
};

export default mock;
