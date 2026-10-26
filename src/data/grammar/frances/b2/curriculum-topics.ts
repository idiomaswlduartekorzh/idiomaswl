import { createFrenchAdvancedCurriculumTopic as topic, pattern as p, type FrenchAdvancedCurriculumSpec } from '../advanced-curriculum-factory.ts'

const base = (value: Omit<FrenchAdvancedCurriculumSpec, 'level' | 'color'>, index: number): FrenchAdvancedCurriculumSpec => ({
  ...value,
  level: 'B2',
  color: ['#E7374F', '#18347A', '#7C3AED', '#0F766E', '#B45309'][index % 5],
})

const specs: Array<Omit<FrenchAdvancedCurriculumSpec, 'level' | 'color'>> = [
  {
    slug: 'temps-du-recit-b2', order: '01', category: 'Temps et aspect', shortTitle: 'Les temps du récit',
    description: "Coordonnez le passé composé, l'imparfait et le plus-que-parfait pour distinguer événements, arrière-plan et antériorité.", purpose: "organiser la chronologie et le point de vue d'un récit au passé", register: 'récits, comptes rendus, biographies et anecdotes',
    formula: 'plus-que-parfait = antérieur | imparfait = arrière-plan | passé composé = événement', model: "La salle était vide parce que les invités étaient déjà partis.",
    patterns: [
      p('Premier plan', 'passé composé', "La lumière s'est éteinte et le public a applaudi.", "une suite d'événements achevés qui fait avancer le récit", 'La lumière est coupée; le public réagit ensuite.', "s'est éteinte", "N'employez pas l'imparfait pour une suite d'actions ponctuelles achevées."),
      p('Arrière-plan', 'imparfait', "Les invités discutaient quand l'alarme a sonné.", "une action en cours autour d'un événement bref", "La discussion était en cours au moment de l'alarme.", 'discutaient', "N'employez pas le passé composé pour une action de fond non bornée."),
      p('Antériorité', 'plus-que-parfait', "La salle était vide parce que les invités étaient déjà partis.", "un événement accompli avant le repère passé", "Les invités sont partis avant le constat de la salle vide.", 'étaient déjà partis', "N'accumulez pas le plus-que-parfait lorsque l'ordre antérieur est déjà établi."),
    ],
  },
  {
    slug: 'futur-anterieur-b2', order: '02', category: 'Temps et aspect', shortTitle: 'Le futur antérieur',
    description: "Situez un accomplissement avant un repère futur et exprimez une supposition portant sur un fait passé.", purpose: "distinguer accomplissement futur, bilan et hypothèse rétrospective", register: 'planification, prévisions, bilans et supposition',
    formula: 'auxiliaire au futur + participe passé | quand + futur antérieur, futur simple', model: "Quand nous aurons terminé l'audit, nous publierons le rapport.",
    patterns: [
      p('Accomplissement', 'futur antérieur + avant/d’ici', "D'ici vendredi, nous aurons terminé l'audit.", "un résultat achevé avant une échéance future", "L'audit sera fini avant vendredi.", 'aurons terminé', "Ne remplacez pas le futur antérieur par le futur simple si l'antériorité est essentielle."),
      p('Séquence future', 'quand + futur antérieur, futur simple', "Quand nous aurons terminé l'audit, nous publierons le rapport.", "une première action future achevée avant la suivante", "La fin de l'audit précédera la publication.", 'aurons terminé', "N'employez pas le présent après quand lorsque les deux actions sont explicitement futures."),
      p('Supposition passée', 'futur antérieur de supposition', "Elle aura oublié notre rendez-vous.", "une explication probable d'un fait passé", "Il est probable qu'elle ait oublié le rendez-vous.", 'aura oublié', "Ne présentez pas cette forme comme une certitude chronologique."),
    ],
  },
  {
    slug: 'conditionnel-passe-b2', order: '03', category: 'Hypothèse et modalité', shortTitle: 'Le conditionnel passé',
    description: "Exprimez une conséquence irréelle dans le passé, un regret ou une information non confirmée.", purpose: "séparer contrefactualité, reproche atténué et distance journalistique", register: 'réflexion, critique, presse et hypothèse',
    formula: 'auxiliaire au conditionnel + participe passé', model: "Avec plus de temps, nous aurions vérifié chaque dossier.",
    patterns: [
      p('Conséquence irréelle', 'conditionnel passé', "Avec plus de temps, nous aurions vérifié chaque dossier.", "une conséquence passée qui ne s'est pas réalisée", "Le temps a manqué et tous les dossiers n'ont pas été vérifiés.", 'aurions vérifié', "N'employez pas le conditionnel présent pour une conséquence achevée dans le passé."),
      p('Regret ou reproche', 'aurais dû / aurais pu + infinitif', "Tu aurais dû prévenir l'équipe plus tôt.", "un devoir non accompli évalué après coup", "Tu n'as pas prévenu l'équipe assez tôt.", 'aurais dû prévenir', "Ne confondez pas aurais dû et devais: le premier évalue le résultat après coup."),
      p('Information rapportée', 'conditionnel passé journalistique', "Le ministre aurait quitté la réunion avant le vote.", "une information passée présentée comme non confirmée", "Selon certaines sources, le départ aurait eu lieu avant le vote.", 'aurait quitté', "Ne faites pas passer le conditionnel journalistique pour une preuve de fausseté."),
    ],
  },
  {
    slug: 'hypotheses-si-b2', order: '04', category: 'Hypothèse et modalité', shortTitle: 'Les hypothèses avec si',
    description: "Combinez imparfait, plus-que-parfait et conditionnel pour construire des hypothèses présentes, passées et mixtes.", purpose: "représenter le degré d'irréalité et le lien temporel entre condition et conséquence", register: 'argumentation, conseil, regret et projection',
    formula: 'si + imparfait, conditionnel présent | si + plus-que-parfait, conditionnel passé', model: "Si nous avions anticipé la panne, le service fonctionnerait encore.",
    patterns: [
      p('Irréel présent', 'si + imparfait, conditionnel présent', "Si j'avais plus de temps, je suivrais cette formation.", "une situation présente imaginée comme différente", "Je manque actuellement de temps.", "Si j'avais", "N'employez pas le conditionnel directement après si dans ce modèle."),
      p('Irréel passé', 'si + plus-que-parfait, conditionnel passé', "Si vous aviez confirmé, nous aurions réservé la salle.", "une condition passée non réalisée et son résultat imaginaire", "La confirmation n'est pas arrivée et la salle n'a pas été réservée.", 'aviez confirmé', "N'utilisez pas le passé composé dans la proposition en si d'une hypothèse irréelle passée."),
      p('Hypothèse mixte', 'si + plus-que-parfait, conditionnel présent', "Si nous avions anticipé la panne, le service fonctionnerait encore.", "une cause passée irréelle avec une conséquence actuelle", "La panne n'a pas été anticipée et le service ne fonctionne plus.", 'fonctionnerait encore', "Vérifiez que les deux repères temporels sont réellement différents."),
    ],
  },
  {
    slug: 'subjonctif-present-b2', order: '05', category: 'Modes et point de vue', shortTitle: 'Le subjonctif présent avancé',
    description: "Employez le subjonctif après volonté, nécessité, émotion, doute et certaines conjonctions.", purpose: "présenter une proposition comme visée, évaluée ou non validée", register: 'recommandation, appréciation, débat et communication formelle',
    formula: 'déclencheur + que + sujet + subjonctif', model: "Il est essentiel que chaque candidat puisse répondre.",
    patterns: [
      p('Nécessité', 'il faut / il est essentiel que + subjonctif', "Il est essentiel que chaque candidat puisse répondre.", "une action présentée comme nécessaire", "Chaque candidat doit pouvoir répondre.", 'puisse répondre', "Ne gardez pas l'indicatif après un déclencheur explicite de nécessité."),
      p('Émotion', 'être ravi / regretter que + subjonctif', "Nous sommes ravis que le projet avance si vite.", "une réaction affective à une situation", "L'avancement rapide provoque notre satisfaction.", 'avance', "Ne supposez pas que le subjonctif rend automatiquement le fait irréel."),
      p('Doute', 'douter / ne pas croire que + subjonctif', "Je ne crois pas que cette mesure suffise.", "une proposition dont la validité est mise en doute", "Je doute que la mesure soit suffisante.", 'suffise', "Après je crois que affirmatif, l'indicatif reste normalement attendu."),
    ],
  },
  {
    slug: 'subjonctif-passe-b2', order: '06', category: 'Modes et point de vue', shortTitle: 'Le subjonctif passé',
    description: "Marquez qu'un fait évalué au subjonctif est accompli avant le repère de la principale.", purpose: "combiner modalité et antériorité sans perdre l'accord du participe", register: 'jugement, émotion, doute et bilan',
    formula: 'avoir/être au subjonctif + participe passé', model: "Je regrette que nous ayons pris cette décision trop vite.",
    patterns: [
      p('Regret accompli', 'regretter que + subjonctif passé', "Je regrette que nous ayons pris cette décision trop vite.", "une réaction actuelle à un fait déjà accompli", "La décision a été prise et je la regrette maintenant.", 'ayons pris', "N'employez pas le subjonctif présent si l'accomplissement antérieur est central."),
      p('Doute rétrospectif', 'douter que + subjonctif passé', "Elle doute que le message soit arrivé à temps.", "un doute portant sur un résultat passé", "L'arrivée du message reste incertaine.", 'soit arrivé', "Respectez l'accord avec être dans le subjonctif passé."),
      p('Concession accomplie', 'bien que + subjonctif passé', "Bien qu'il ait relu le contrat, une erreur subsiste.", "un fait antérieur concédé sans annuler le résultat principal", "Il a relu le contrat, mais une erreur subsiste.", 'ait relu', "N'employez pas malgré que dans le français soigné."),
    ],
  },
  {
    slug: 'indicatif-ou-subjonctif-b2', order: '07', category: 'Modes et point de vue', shortTitle: 'Indicatif ou subjonctif',
    description: "Choisissez le mode selon que la proposition est assertée, recherchée, contestée ou évaluée.", purpose: "faire varier la validation du contenu plutôt que mémoriser une liste mécanique", register: 'argumentation, description et interaction nuancée',
    formula: 'fait validé = indicatif | visée, doute ou évaluation = subjonctif', model: "Je cherche un dossier qui contienne toutes les pièces.",
    patterns: [
      p('Référent identifié', 'relative + indicatif', "Je connais un dossier qui contient toutes les pièces.", "un référent existant et identifié", "Le dossier existe et son contenu est connu.", 'qui contient', "N'employez pas le subjonctif si l'existence du référent est affirmée sans réserve."),
      p('Référent recherché', 'relative + subjonctif', "Je cherche un dossier qui contienne toutes les pièces.", "un référent souhaité dont l'existence n'est pas validée", "Le dossier conforme est recherché mais pas encore identifié.", 'qui contienne', "Ne présentez pas ce subjonctif comme une simple variante stylistique."),
      p('Constat ou jugement', "constater que + indicatif | regretter que + subjonctif", "Je constate que le délai augmente, mais je regrette qu'il devienne critique.", "un fait asserté suivi d'une évaluation affective", "L'augmentation est constatée et son évolution est regrettée.", 'je regrette', "Repérez le statut de chaque proposition avant de choisir le mode."),
    ],
  },
  {
    slug: 'infinitif-passe-b2', order: '08', category: 'Modes et point de vue', shortTitle: "L'infinitif passé",
    description: "Exprimez l'antériorité avec après, sans, pour ou une appréciation lorsque le sujet reste le même.", purpose: "alléger la subordination tout en maintenant le rapport d'antériorité", register: 'récit, consigne, bilan et style administratif',
    formula: 'avoir/être à l’infinitif + participe passé', model: "Après avoir vérifié les chiffres, elle a envoyé le rapport.",
    patterns: [
      p('Antériorité explicite', 'après + infinitif passé', "Après avoir vérifié les chiffres, elle a envoyé le rapport.", "une action achevée par le même sujet avant la principale", "Elle a d'abord vérifié, puis elle a envoyé.", 'Après avoir vérifié', "N'employez pas cette réduction si le sujet implicite diffère de celui de la principale."),
      p('Action non réalisée', 'sans + infinitif passé', "Il est parti sans avoir répondu à nos questions.", "une action antérieure attendue mais non accomplie", "Il est parti et n'a pas répondu auparavant.", 'sans avoir répondu', "Ne remplacez pas sans avoir répondu par sans répondre si l'antériorité est importante."),
      p('Évaluation rétrospective', 'être + adjectif + de + infinitif passé', "Nous sommes heureux d'avoir accepté cette proposition.", "une appréciation actuelle d'un choix déjà accompli", "L'acceptation passée nous satisfait aujourd'hui.", "d'avoir accepté", "Vérifiez l'élision de de devant avoir ou être."),
    ],
  },
  {
    slug: 'gerondif-participe-adjectif-b2', order: '09', category: 'Formes non personnelles', shortTitle: 'Gérondif, participe présent et adjectif verbal',
    description: "Distinguez en + participe présent, participe présent autonome et adjectif verbal accordé.", purpose: "exprimer simultanéité, cause ou caractérisation avec la bonne forme", register: 'description, narration, consigne et écrit formel',
    formula: 'en + -ant | participe présent invariable | adjectif verbal accordé', model: "En analysant les données, nous avons découvert un facteur surprenant.",
    patterns: [
      p('Simultanéité', 'en + participe présent', "En analysant les données, nous avons découvert une anomalie.", "deux actions accomplies par le même sujet", "Nous analysions les données et nous avons alors découvert l'anomalie.", 'En analysant', "Le sujet implicite du gérondif doit normalement être celui de la principale."),
      p('Circonstance détachée', 'participe présent invariable', "Les délais augmentant, le comité a modifié le calendrier.", "une cause ou circonstance formulée de manière condensée", "Comme les délais augmentaient, le comité a réagi.", 'augmentant', "N'accordez jamais le participe présent employé comme verbe."),
      p('Qualité', 'adjectif verbal accordé', "Nous avons reçu des propositions convaincantes.", "une propriété stable attribuée à un nom", "Les propositions ont la qualité de convaincre.", 'convaincantes', "Vérifiez les différences d'orthographe entre participe présent et adjectif verbal."),
    ],
  },
  {
    slug: 'accord-participe-avoir-b2', order: '10', category: 'Accords avancés', shortTitle: 'Accord du participe passé avec avoir',
    description: "Accordez le participe avec le complément direct placé avant et distinguez les cas sans accord.", purpose: "identifier la fonction et la position du complément avant d'appliquer l'accord", register: 'écrit soigné, récit, correspondance et examen',
    formula: 'COD avant avoir = accord | COD après ou COI = pas d’accord', model: "Les analyses que nous avons publiées ont été relues.",
    patterns: [
      p('COD antéposé', 'COD + que + avoir + participe accordé', "Les analyses que nous avons publiées ont été relues.", "un complément direct féminin pluriel placé avant", "Nous avons publié les analyses.", 'publiées', "Ne cherchez pas le sujet: l'accord avec avoir dépend ici du COD antéposé."),
      p('COD postposé', 'avoir + participe invariable + COD', "Nous avons publié plusieurs analyses.", "un complément direct placé après le participe", "Plusieurs analyses ont été publiées par nous.", 'avons publié', "N'accordez pas le participe avec un COD placé après."),
      p('Complément indirect', 'pronom COI + avoir + participe invariable', "Les personnes à qui nous avons parlé sont disponibles.", "un complément introduit par à, sans incidence sur l'accord", "Nous avons parlé à ces personnes.", 'avons parlé', "Le pronom relatif qui ne signale pas automatiquement un COD."),
    ],
  },
  {
    slug: 'verbes-pronominaux-accord-b2', order: '11', category: 'Accords avancés', shortTitle: 'Accord des verbes pronominaux',
    description: "Analysez la fonction de se pour accorder ou non le participe des verbes pronominaux.", purpose: "distinguer pronom direct, indirect et verbe essentiellement pronominal", register: 'récit, correspondance et écrit contrôlé',
    formula: 'se = COD avant -> accord | se = COI -> pas d’accord', model: "Elles se sont envoyé les documents puis se sont excusées.",
    patterns: [
      p('Pronom direct', 'se COD + être + participe accordé', "Elles se sont rencontrées hier.", "des sujets féminins qui rencontrent directement l'une l'autre", "Elles ont rencontré chacune l'autre.", 'rencontrées', "Ne supprimez pas l'accord lorsque se est le COD antéposé."),
      p('Pronom indirect', 'se COI + être + participe invariable', "Elles se sont envoyé les documents.", "des destinataires exprimés par se devant un COD postposé", "Elles ont envoyé les documents l'une à l'autre.", 'envoyé', "N'accordez pas envoyé avec se lorsqu'on envoie quelque chose à quelqu'un."),
      p('Essentiellement pronominal', 'être + participe accordé au sujet', "Elles se sont souvenues de la consigne.", "un verbe qui s'emploie lexicalement avec se", "Elles ont gardé la consigne en mémoire.", 'souvenues', "Vérifiez le régime lexical plutôt que d'appliquer une règle unique à tous les verbes pronominaux."),
    ],
  },
  {
    slug: 'voix-passive-avancee-b2', order: '12', category: 'Voix et agent', shortTitle: 'La voix passive avancée',
    description: "Construisez le passif à différents temps et choisissez d'exprimer ou non l'agent.", purpose: "mettre au premier plan le processus, le résultat ou le participant affecté", register: 'presse, rapports, procédures et description scientifique',
    formula: 'être au temps requis + participe passé + par/de', model: "Le protocole a été validé par trois laboratoires.",
    patterns: [
      p('Processus en cours', 'être en train de / passif au temps requis', "Le bâtiment est actuellement inspecté par des experts.", "un processus passif situé dans le présent", "Des experts inspectent actuellement le bâtiment.", 'est actuellement inspecté', "N'oubliez pas l'accord du participe avec le sujet passif."),
      p('Résultat accompli', 'passé composé passif', "Le protocole a été validé par trois laboratoires.", "un résultat achevé dont le patient est le thème", "Trois laboratoires ont validé le protocole.", 'a été validé', "Ne confondez pas a été validé et avait été validé."),
      p('Agent omis', 'passif sans complément d’agent', "Les candidatures seront examinées en juin.", "une procédure où l'agent est évident ou secondaire", "Le comité examinera les candidatures en juin.", 'seront examinées', "N'ajoutez pas un complément d'agent s'il n'apporte aucune information utile."),
    ],
  },
  {
    slug: 'factitif-faire-laisser-b2', order: '13', category: 'Voix et agent', shortTitle: 'Faire et laisser suivis de l’infinitif',
    description: "Exprimez la causation, le service organisé et la permission avec faire ou laisser suivi d'un infinitif.", purpose: "distinguer l'instigateur, l'agent réel et le participant affecté", register: 'services, organisation, récit et interaction',
    formula: 'faire/laisser + infinitif + agent éventuel', model: "Nous avons fait vérifier le contrat par une juriste.",
    patterns: [
      p('Service organisé', 'faire + infinitif + objet', "Nous avons fait vérifier le contrat par une juriste.", "une action confiée à un autre agent", "Une juriste a vérifié le contrat pour nous.", 'fait vérifier', "Le participe fait reste invariable devant un infinitif."),
      p('Causation personnelle', 'faire + infinitif + agent', "Cette annonce a fait réagir les habitants.", "un événement qui provoque la réaction d'un agent", "Les habitants ont réagi à cause de l'annonce.", 'fait réagir', "Ne placez pas de devant l'infinitif après faire."),
      p('Permission', 'laisser + infinitif', "La responsable nous a laissé consulter le dossier.", "une action rendue possible par permission", "La responsable a permis la consultation du dossier.", 'laissé consulter', "Distinguez laisser faire et faire faire: permission et causation ne sont pas identiques."),
    ],
  },
  {
    slug: 'discours-indirect-passe-b2', order: '14', category: 'Discours rapporté', shortTitle: 'Le discours indirect au passé',
    description: "Transposez temps, personnes et repères lorsque le verbe introducteur est au passé.", purpose: "rapporter fidèlement un énoncé depuis un nouveau point de vue temporel", register: 'récit, compte rendu, entretien et procès-verbal',
    formula: 'présent -> imparfait | passé composé -> plus-que-parfait | futur -> conditionnel', model: "Elle a expliqué qu'elle terminerait le lendemain.",
    patterns: [
      p('Simultanéité passée', 'présent direct -> imparfait', "Il a dit qu'il travaillait à distance.", "un état simultané au moment passé de la parole", "Il a dit : « Je travaille à distance. »", "qu'il travaillait", "Ne transposez pas automatiquement si l'information reste générale et que le contexte maintient le présent."),
      p('Antériorité rapportée', 'passé composé -> plus-que-parfait', "Elle a précisé qu'elle avait envoyé le dossier.", "une action antérieure au verbe introducteur passé", "Elle a dit : « J'ai envoyé le dossier. »", 'avait envoyé', "N'oubliez pas de déplacer aussi les pronoms et les repères temporels."),
      p('Postériorité rapportée', 'futur -> conditionnel présent', "Elle a expliqué qu'elle terminerait le lendemain.", "un événement futur vu depuis un repère passé", "Elle a dit : « Je terminerai demain. »", 'terminerait le lendemain', "Ne conservez pas demain si le repère de narration a changé."),
    ],
  },
  {
    slug: 'interrogation-indirecte-b2', order: '15', category: 'Discours rapporté', shortTitle: 'L’interrogation indirecte',
    description: "Transformez questions totales et partielles sans inversion ni point d'interrogation interne.", purpose: "intégrer une demande d'information dans une phrase complexe", register: 'courriel formel, entretien, compte rendu et demande polie',
    formula: 'demander si | demander + mot interrogatif + sujet + verbe', model: "Elle demande pourquoi le délai a été prolongé.",
    patterns: [
      p('Question totale', 'demander si + ordre déclaratif', "Il veut savoir si la réunion est maintenue.", "une question appelant oui ou non", "Il demande : « La réunion est-elle maintenue ? »", 'si la réunion est maintenue', "N'employez pas est-ce que dans l'interrogation indirecte."),
      p('Question partielle', 'mot interrogatif + sujet + verbe', "Elle demande pourquoi le délai a été prolongé.", "une demande portant sur une information précise", "Elle demande : « Pourquoi le délai a-t-il été prolongé ? »", 'pourquoi le délai a été prolongé', "Supprimez l'inversion sujet-verbe dans la subordonnée."),
      p('Ce qui / ce que', 'demander ce qui / ce que', "Nous ignorons ce qui a provoqué la panne.", "une interrogation sur un sujet ou un objet non nommé", "Nous demandons quelle chose a provoqué la panne.", 'ce qui a provoqué', "Choisissez ce qui pour le sujet et ce que pour le complément direct."),
    ],
  },
  {
    slug: 'pronoms-relatifs-composes-b2', order: '16', category: 'Relatives et référence', shortTitle: 'Les pronoms relatifs composés',
    description: "Employez lequel et ses formes contractées après une préposition pour préciser le lien avec l'antécédent.", purpose: "maintenir une référence claire dans des relatives prépositionnelles", register: 'description, écrit formel et argumentation',
    formula: 'préposition + lequel/laquelle/lesquels/lesquelles | auquel/duquel', model: "Le projet auquel nous participons entre dans sa dernière phase.",
    patterns: [
      p('Préposition simple', 'préposition + lequel', "La salle dans laquelle nous travaillons est lumineuse.", "un lien spatial ou abstrait introduit par une préposition", "Nous travaillons dans cette salle.", 'dans laquelle', "Accordez lequel en genre et en nombre avec l'antécédent."),
      p('Contraction avec à', 'à + lequel -> auquel', "Le projet auquel nous participons entre dans sa dernière phase.", "un complément construit avec à", "Nous participons à ce projet.", 'auquel', "N'écrivez pas à lequel au masculin singulier."),
      p('Contraction avec de', 'de + lequel -> duquel', "Le bâtiment près duquel ils habitent sera rénové.", "un groupe prépositionnel terminé par de", "Ils habitent près de ce bâtiment.", 'près duquel', "Après une locution comme près de, utilisez duquel plutôt que dont."),
    ],
  },
  {
    slug: 'ce-qui-ce-que-ce-dont-b2', order: '17', category: 'Relatives et référence', shortTitle: 'Ce qui, ce que et ce dont',
    description: "Reprenez une idée entière ou un antécédent indéfini selon la fonction dans la relative.", purpose: "référer à un contenu non nominalisé sans perdre sa fonction syntaxique", register: 'explication, commentaire et synthèse',
    formula: 'ce qui = sujet | ce que = COD | ce dont = complément de', model: "Ce dont nous avons besoin, c'est d'une méthode plus claire.",
    patterns: [
      p('Sujet indéfini', 'ce qui + verbe', "Ce qui m'inquiète, c'est le manque de temps.", "un élément non nommé qui est sujet du verbe", "Le manque de temps m'inquiète.", "Ce qui m'inquiète", "Ne remplacez pas ce qui par ce que devant un verbe sans sujet exprimé."),
      p('Objet indéfini', 'ce que + sujet + verbe', "Je comprends ce que vous proposez.", "un contenu non nommé qui est objet direct", "Je comprends votre proposition.", 'ce que vous proposez', "N'employez pas ce qui lorsque la subordonnée possède déjà son sujet."),
      p('Complément de', 'ce dont + sujet + verbe', "Ce dont nous avons besoin, c'est d'une méthode plus claire.", "un contenu repris par un verbe ou nom construit avec de", "Nous avons besoin d'une méthode plus claire.", 'Ce dont', "Ne répétez pas de après ce dont."),
    ],
  },
  {
    slug: 'double-pronominalisation-b2', order: '18', category: 'Pronoms', shortTitle: 'La double pronominalisation',
    description: "Placez deux pronoms compléments dans l'ordre requis à l'indicatif, à l'infinitif et à l'impératif.", purpose: "éviter les répétitions tout en conservant destinataire et objet", register: 'conversation, correspondance et consigne',
    formula: 'me/te/se/nous/vous + le/la/les + lui/leur + y + en', model: "Je le leur ai expliqué avant la réunion.",
    patterns: [
      p('Déclaratif', 'sujet + pronoms + verbe', "Je le leur ai expliqué avant la réunion.", "un objet direct repris avant un destinataire", "J'ai expliqué le problème aux responsables.", 'le leur ai expliqué', "Respectez l'ordre des pronoms; ne copiez pas l'ordre des groupes nominaux."),
      p('Infinitif', 'verbe conjugué + pronoms + infinitif', "Nous allons la lui envoyer demain.", "deux compléments rattachés à l'infinitif", "Nous allons envoyer la réponse à Léa.", 'la lui envoyer', "Placez les pronoms devant l'infinitif dont ils dépendent."),
      p('Impératif affirmatif', 'verbe-le-lui / verbe-m’en', "Donnez-le-lui avant midi.", "un ordre affirmatif avec pronoms postposés", "Donnez le dossier à la directrice.", 'Donnez-le-lui', "À l'impératif affirmatif, l'ordre et les traits d'union changent."),
    ],
  },
  {
    slug: 'pronoms-y-en-avances-b2', order: '19', category: 'Pronoms', shortTitle: 'Y et en avancés',
    description: "Reprenez lieux, compléments en à ou de, quantités et propositions avec y ou en.", purpose: "maintenir la cohésion sans créer de référence vague", register: 'conversation, argumentation et récit',
    formula: 'y = à/dans + chose | en = de + chose ou quantité', model: "Cette réforme, nous y réfléchissons et nous en parlerons demain.",
    patterns: [
      p('Complément en à', 'y + verbe', "Cette réforme, nous y réfléchissons depuis longtemps.", "un complément de chose introduit par à", "Nous réfléchissons à cette réforme.", 'nous y réfléchissons', "Pour une personne, préférez généralement un pronom tonique après à."),
      p('Complément en de', 'en + verbe', "Le rapport est prêt; nous en parlerons demain.", "un complément de chose introduit par de", "Nous parlerons du rapport demain.", 'nous en parlerons', "Évitez en lorsque l'antécédent n'est pas récupérable."),
      p('Quantité', 'en + verbe + quantité', "Des propositions, nous en avons reçu une dizaine.", "un nom quantifié repris par en", "Nous avons reçu une dizaine de propositions.", 'en avons reçu', "Conservez l'expression de quantité après le verbe."),
    ],
  },
  {
    slug: 'mise-en-relief-b2', order: '20', category: 'Structure de l’information', shortTitle: 'La mise en relief',
    description: "Focalisez un constituant avec c'est... qui/que, ce qui... c'est ou une dislocation contrôlée.", purpose: "rendre visible l'information contrastive ou la conclusion importante", register: 'oral soigné, présentation, explication et argumentation',
    formula: "c'est + focus + qui/que | ce qui/que + proposition, c'est + focus", model: "Ce qui compte, c'est la cohérence de l'ensemble.",
    patterns: [
      p('Focus sujet', "c'est + groupe + qui", "C'est la cohérence qui garantit la clarté.", "le sujet opposé à d'autres candidats possibles", "La cohérence garantit la clarté.", "C'est la cohérence qui", "Choisissez qui lorsque le groupe focalisé est sujet du verbe suivant."),
      p('Focus complément', "c'est + groupe + que", "C'est ce point que le rapport doit clarifier.", "un complément direct placé sous contraste", "Le rapport doit clarifier ce point.", "C'est ce point que", "N'employez pas qui si le constituant focalisé est complément direct."),
      p('Pseudo-clivée', "ce qui + proposition, c'est + focus", "Ce qui compte, c'est la cohérence de l'ensemble.", "une conclusion ou valeur présentée comme information nouvelle", "La cohérence de l'ensemble est l'élément important.", "Ce qui compte", "Évitez de multiplier les clivées lorsque le contraste n'est pas pertinent."),
    ],
  },
  {
    slug: 'nominalisation-b2', order: '21', category: 'Style nominal', shortTitle: 'La nominalisation',
    description: "Transformez actions et qualités en groupes nominaux pour condenser ou réorganiser l'information.", purpose: "construire un style plus dense sans effacer l'agent ni la chronologie", register: 'presse, rapports, écrits académiques et administratifs',
    formula: 'verbe/adjectif -> nom + complément de/par', model: "La réduction des délais par l'équipe a amélioré le service.",
    patterns: [
      p('Action nominalisée', 'verbe -> nom + de', "La réduction des délais a amélioré le service.", "un processus transformé en objet de discours", "L'équipe a réduit les délais et le service s'est amélioré.", 'La réduction', "Ne rendez pas la phrase opaque en supprimant tous les participants."),
      p('Agent explicite', 'nom + par + agent', "La validation du protocole par le comité est attendue.", "l'agent maintenu dans une construction nominale", "On attend que le comité valide le protocole.", 'par le comité', "Distinguez le complément d'agent en par du complément de contenu en de."),
      p('Qualité nominalisée', 'adjectif -> nom', "La disponibilité des données facilite la comparaison.", "une propriété traitée comme thème abstrait", "Le fait que les données soient disponibles facilite la comparaison.", 'La disponibilité', "Vérifiez la dérivation lexicale; toutes les nominalisations ne sont pas régulières."),
    ],
  },
  {
    slug: 'cause-consequence-b2', order: '22', category: 'Relations logiques', shortTitle: 'Cause et conséquence',
    description: "Hiérarchisez causes, justifications et résultats avec puisque, étant donné que, de sorte que et par conséquent.", purpose: "rendre explicite la direction logique et le statut de l'information", register: 'argumentation, explication, rapport et débat',
    formula: 'cause + connecteur causal | conséquence + connecteur résultatif', model: "Étant donné que les données manquent, l'analyse reste provisoire.",
    patterns: [
      p('Cause connue', 'puisque + proposition', "Puisque le budget est voté, les travaux peuvent commencer.", "une cause présentée comme déjà partagée", "Le budget voté permet le début des travaux.", 'Puisque', "N'utilisez pas puisque pour annoncer une cause totalement nouvelle sans contexte."),
      p('Cadre causal', 'étant donné que + proposition', "Étant donné que les données manquent, l'analyse reste provisoire.", "un fait posé comme base du raisonnement", "Le manque de données oblige à rester provisoire.", 'Étant donné que', "Accordez donné dans étant donné que seulement selon l'analyse et le registre retenus; la locution est souvent figée."),
      p('Conséquence', 'de sorte que / par conséquent', "Le serveur a été isolé, de sorte que la propagation a cessé.", "un résultat découlant de la proposition précédente", "L'isolement du serveur a arrêté la propagation.", 'de sorte que', "Distinguez le résultat constaté de sorte que du but de sorte que suivi du subjonctif."),
    ],
  },
  {
    slug: 'opposition-concession-b2', order: '23', category: 'Relations logiques', shortTitle: 'Opposition et concession',
    description: "Construisez un contraste ou concédez un fait avec alors que, tandis que, bien que, malgré et pourtant.", purpose: "indiquer si deux faits s'opposent ou si l'un ne bloque pas l'autre", register: 'débat, essai, comparaison et commentaire',
    formula: 'bien que + subjonctif | malgré + nom | pourtant + proposition', model: "Bien que la solution soit coûteuse, elle reste la plus fiable.",
    patterns: [
      p('Concession verbale', 'bien que + subjonctif', "Bien que la solution soit coûteuse, elle reste la plus fiable.", "un obstacle reconnu mais insuffisant pour changer la conclusion", "La solution est coûteuse, mais elle reste fiable.", 'Bien que', "N'employez pas l'indicatif après bien que dans le français soigné."),
      p('Concession nominale', 'malgré + nom', "Malgré son coût, la solution a été retenue.", "un obstacle exprimé par un groupe nominal", "La solution a été retenue bien qu'elle coûte cher.", 'Malgré son coût', "Ne faites pas suivre malgré d'une proposition finie."),
      p('Contre-attente', 'proposition; pourtant, proposition', "Les preuves semblaient solides; pourtant, le juge a demandé une nouvelle expertise.", "un résultat contraire à l'attente créée", "Le juge a demandé une expertise malgré la solidité apparente des preuves.", 'pourtant', "Ponctuez pourtant selon son statut d'adverbe connecteur."),
    ],
  },
  {
    slug: 'but-condition-restriction-b2', order: '24', category: 'Relations logiques', shortTitle: 'But, condition et restriction',
    description: "Reliez intention, condition nécessaire et limite avec afin que, à condition que, pourvu que et à moins que.", purpose: "distinguer objectif, exigence et exception dans un raisonnement", register: 'consigne, règlement, projet et négociation',
    formula: 'afin que / à condition que / pourvu que / à moins que + subjonctif', model: "Nous partagerons le document à condition que chacun respecte la confidentialité.",
    patterns: [
      p('But', 'afin que + subjonctif', "Le guide a été simplifié afin que chacun puisse l'utiliser.", "l'objectif visé par une action", "La simplification doit rendre le guide accessible.", 'afin que', "Lorsque le sujet est le même, préférez afin de suivi de l'infinitif."),
      p('Condition nécessaire', 'à condition que + subjonctif', "Nous partagerons le document à condition que chacun respecte la confidentialité.", "une exigence indispensable à l'accord", "Le partage dépend du respect de la confidentialité.", 'à condition que', "N'employez pas l'indicatif après à condition que."),
      p('Exception', 'à moins que + subjonctif', "La réunion aura lieu à moins qu'un incident ne survienne.", "la seule circonstance qui empêcherait le résultat", "La réunion aura lieu sauf en cas d'incident.", "à moins qu'", "Le ne explétif ne transforme pas la proposition en négation."),
    ],
  },
  {
    slug: 'connecteurs-argumentation-b2', order: '25', category: 'Cohésion', shortTitle: 'Les connecteurs de l’argumentation',
    description: "Organisez addition, contraste, reformulation et conclusion avec des connecteurs correctement ponctués.", purpose: "guider le lecteur dans le développement d'un raisonnement", register: 'essai, présentation, synthèse et rapport',
    formula: 'connecteur de phrase + ponctuation | conjonction dans la structure', model: "La méthode est efficace; néanmoins, elle exige un suivi régulier.",
    patterns: [
      p('Addition', 'de plus / en outre + proposition', "Le dispositif réduit les coûts; en outre, il améliore la traçabilité.", "un argument supplémentaire qui renforce la thèse", "Le dispositif présente deux avantages complémentaires.", 'en outre', "N'ajoutez pas un connecteur d'addition si la seconde phrase ne fait que répéter la première."),
      p('Nuance', 'néanmoins / toutefois + proposition', "La méthode est efficace; néanmoins, elle exige un suivi régulier.", "une limite qui n'annule pas le premier constat", "La méthode est efficace mais exigeante.", 'néanmoins', "Ne reliez pas deux phrases autonomes par une simple virgule avant néanmoins."),
      p('Reformulation', "autrement dit / en d'autres termes", "Le calendrier est figé; autrement dit, aucun report n'est possible.", "une clarification de l'implication précédente", "Un calendrier figé exclut tout report.", 'autrement dit', "N'introduisez pas une idée nouvelle sans lien sous couvert de reformulation."),
    ],
  },
  {
    slug: 'negation-complexe-b2', order: '26', category: 'Portée et détermination', shortTitle: 'La négation complexe',
    description: "Maîtrisez ne... que, ne... plus, ne... jamais, ni... ni et la portée de la négation.", purpose: "exprimer restriction, cessation, exclusion et négation coordonnée", register: 'conversation, écrit argumentatif et description précise',
    formula: 'ne + verbe + marque négative/restrictive', model: "Cette mesure ne concerne que les nouveaux dossiers.",
    patterns: [
      p('Restriction', 'ne... que', "Cette mesure ne concerne que les nouveaux dossiers.", "une limitation équivalente à seulement", "Cette mesure concerne seulement les nouveaux dossiers.", 'ne concerne que', "Ne traitez pas ne... que comme une négation totale."),
      p('Cessation', 'ne... plus', "Le service ne traite plus les demandes papier.", "une situation vraie auparavant mais terminée", "Le traitement papier a cessé.", 'ne traite plus', "Placez plus selon le temps verbal et distinguez sa prononciation positive ou négative."),
      p('Double exclusion', 'ne... ni... ni', "Le contrat ne prévoit ni délai supplémentaire ni remboursement.", "deux éléments exclus dans la même portée", "Le contrat exclut le délai et le remboursement.", 'ni délai supplémentaire ni remboursement', "Évitez de mélanger pas avec ni... ni dans une structure standard."),
    ],
  },
  {
    slug: 'determinants-indefinis-b2', order: '27', category: 'Portée et détermination', shortTitle: 'Déterminants et pronoms indéfinis',
    description: "Distinguez chaque, chacun, tout, tous, plusieurs, aucun et n'importe quel selon la distribution et la portée.", purpose: "quantifier ou distribuer les référents avec un accord cohérent", register: 'règlement, description, rapport et conversation',
    formula: 'déterminant + nom | pronom autonome + accord verbal', model: "Chaque participant recevra un code, mais chacun devra l'activer.",
    patterns: [
      p('Distribution nominale', 'chaque + nom singulier', "Chaque participant recevra un code personnel.", "une distribution individuelle dans un ensemble", "Tous recevront individuellement un code.", 'Chaque participant', "N'employez pas chaque avec un nom pluriel."),
      p('Pronom distributif', 'chacun/chacune + verbe singulier', "Chacun devra activer son code.", "chaque membre repris sans nom exprimé", "Chaque participant devra agir.", 'Chacun devra', "Accordez normalement le verbe au singulier avec chacun."),
      p('Choix libre', "n'importe quel + nom", "Vous pouvez choisir n'importe quel créneau disponible.", "une option indifférenciée dans l'ensemble", "Tous les créneaux disponibles conviennent au choix.", "n'importe quel", "Accordez quel avec le nom qui suit."),
    ],
  },
  {
    slug: 'prepositions-regies-b2', order: '28', category: 'Régime des mots', shortTitle: 'Les prépositions régies',
    description: "Mémorisez les prépositions exigées par certains verbes, adjectifs et noms au lieu de traduire directement.", purpose: "construire des régimes lexicaux fiables avec infinitif ou groupe nominal", register: 'communication professionnelle, essai et interaction',
    formula: 'verbe/adjectif/nom + à/de/par/pour + complément', model: "Elle tient à participer à la prochaine réunion.",
    patterns: [
      p('Verbe + à', 'tenir à / parvenir à + infinitif', "Elle tient à participer à la prochaine réunion.", "un verbe qui sélectionne la préposition à", "Sa participation à la réunion lui importe.", 'tient à participer', "Ne supprimez pas la préposition imposée par le verbe."),
      p('Verbe + de', 'éviter de / accepter de + infinitif', "Nous avons évité de répéter la même erreur.", "un infinitif introduit par de selon le verbe", "Nous n'avons pas répété l'erreur.", "évité de répéter", "Ne choisissez pas à ou de par traduction depuis l'espagnol."),
      p('Adjectif + préposition', 'responsable de / favorable à', "Le comité est favorable à une révision du texte.", "un adjectif relié à son complément par une préposition fixe", "Le comité soutient la révision.", 'favorable à', "Vérifiez le régime de chaque adjectif dans un dictionnaire monolingue."),
    ],
  },
  {
    slug: 'comparaison-nuancee-b2', order: '29', category: 'Comparaison et description', shortTitle: 'La comparaison nuancée',
    description: "Modulez l'écart avec nettement, légèrement, de plus en plus, autant que et d'autant plus que.", purpose: "décrire précisément l'intensité et la relation entre deux évolutions", register: 'commentaire de données, rapport, évaluation et débat',
    formula: 'adverbe + comparatif | plus... plus... | d’autant plus que', model: "La seconde méthode est nettement plus rapide, mais presque aussi précise.",
    patterns: [
      p('Écart modulé', 'nettement/légèrement + plus/moins', "La seconde méthode est nettement plus rapide.", "un écart dont l'ampleur est explicitée", "La seconde méthode dépasse largement la première en vitesse.", 'nettement plus rapide', "N'employez pas très directement devant un comparatif."),
      p('Évolution corrélée', 'plus... plus...', "Plus le délai s'allonge, plus le coût augmente.", "deux évolutions qui progressent ensemble", "Le coût augmente à mesure que le délai s'allonge.", "Plus le délai", "Conservez la structure parallèle dans les deux segments."),
      p('Renforcement causal', "d'autant plus... que", "Cette solution est d'autant plus utile qu'elle reste peu coûteuse.", "un jugement renforcé par une raison supplémentaire", "Son faible coût renforce l'utilité de la solution.", "d'autant plus utile", "Ne confondez pas ce tour avec une simple comparaison quantitative."),
    ],
  },
  {
    slug: 'position-adjectif-sens-b2', order: '30', category: 'Comparaison et description', shortTitle: 'La place de l’adjectif et le sens',
    description: "Interprétez les changements de sens produits par la position de certains adjectifs avant ou après le nom.", purpose: "distinguer évaluation subjective, classement et sens lexical", register: 'description, presse, littérature et conversation',
    formula: 'adjectif avant le nom = valeur évaluative fréquente | après = valeur descriptive fréquente', model: "Un grand homme n'est pas nécessairement un homme grand.",
    patterns: [
      p('Valeur évaluative', 'adjectif avant le nom', "C'est un grand homme de science.", "une importance ou qualité évaluée plutôt qu'une dimension", "Cet homme de science est remarquable.", 'un grand homme', "Ne déduisez pas automatiquement une taille physique de grand placé avant le nom."),
      p('Valeur descriptive', 'adjectif après le nom', "Un homme grand attend devant la porte.", "une propriété descriptive de taille", "L'homme qui attend est de grande taille.", 'Un homme grand', "La place postnominale ne produit pas toujours un sens purement objectif."),
      p('Opposition lexicalisée', 'ancien/propre/pauvre + position', "Mon ancien collègue habite dans une maison ancienne.", "deux sens liés à la position du même adjectif", "Il n'est plus mon collègue et sa maison est vieille.", 'ancien collègue', "Apprenez les oppositions lexicalisées plutôt qu'une règle de position absolue."),
    ],
  },
]

export const b2CurriculumTopics = specs.map((spec, index) => topic(base(spec, index)))
