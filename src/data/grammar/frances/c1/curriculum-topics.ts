import { createFrenchAdvancedCurriculumTopic as topic, pattern as p, type FrenchAdvancedCurriculumSpec } from '../advanced-curriculum-factory.ts'

type Seed = Omit<FrenchAdvancedCurriculumSpec, 'level' | 'color' | 'patterns'> & {
  patterns: [Parameters<typeof p>, Parameters<typeof p>, Parameters<typeof p>]
}

const colors = ['#18347A', '#E7374F', '#6D28D9', '#0F766E', '#A16207']
const seed = (value: Seed, index: number): FrenchAdvancedCurriculumSpec => ({
  ...value,
  level: 'C1',
  color: colors[index % colors.length],
  patterns: value.patterns.map((entry) => p(...entry)) as FrenchAdvancedCurriculumSpec['patterns'],
})

const specs: Seed[] = [
  {
    slug: 'valeurs-avancees-indicatif-c1', order: '01', category: 'Temps et aspect', shortTitle: "Les valeurs avancées de l’indicatif",
    description: "Interprétez un même temps selon le repère, l'aspect et l'effet discursif plutôt que comme une simple date.", purpose: "distinguer événement, état, commentaire et vérité générale", register: 'récits, analyses et prises de position',
    formula: 'temps grammatical + repère + aspect + effet discursif', model: "Je quittais le bureau quand elle m'a appelé.",
    patterns: [
      ['Présent narratif', 'présent dans un récit passé', "En 1989, le mur tombe et l'Europe change.", 'une scène historique rendue immédiate', "La chute du mur a transformé l'Europe.", 'le mur tombe', "Maintenez un repérage clair afin que le présent narratif ne ressemble pas à une erreur."],
      ['Imparfait perspectif', 'imparfait + événement interrompu', "Je quittais le bureau quand elle m'a appelé.", 'une action envisagée de l’intérieur au moment de l’interruption', "Mon départ était en cours lors de son appel.", 'Je quittais', "Ne remplacez pas systématiquement l'imparfait par le passé composé pour une action bornée par le contexte."],
      ['Futur de bilan', 'futur simple rétrospectif', "Cette décision marquera durablement le secteur.", 'une interprétation prospective présentée comme bilan', "La décision aura un effet durable.", 'marquera durablement', "Signalez le point de vue qui autorise ce futur de commentaire."],
    ],
  },
  {
    slug: 'passe-simple-imparfait-narration-c1', order: '02', category: 'Temps et aspect', shortTitle: 'Passé simple et imparfait narratifs',
    description: "Articulez événements de premier plan et arrière-plan dans une narration écrite soutenue.", purpose: "construire une progression narrative nette et cohérente", register: 'littérature, récit historique et biographie',
    formula: 'imparfait = cadre | passé simple = borne et progression', model: "La foule attendait; soudain, la porte s'ouvrit.",
    patterns: [
      ['Cadre', 'imparfait descriptif', "La foule attendait dans un silence tendu.", 'un arrière-plan non borné', "L'attente silencieuse formait le cadre.", 'attendait', "N'utilisez pas le passé simple pour une description durable sans borne."],
      ['Rupture', 'passé simple ponctuel', "Soudain, la porte s'ouvrit.", 'un événement qui fait avancer le récit', "L'ouverture de la porte rompit l'attente.", "s'ouvrit", "Le passé simple appartient surtout à l'écrit soutenu contemporain."],
      ['Enchaînement', 'suite de passés simples', "Elle entra, salua l'assemblée et prit la parole.", 'une série d’actions achevées', "Ses trois actions se succédèrent.", 'Elle entra', "Évitez une alternance arbitraire avec le passé composé dans une même voix narrative."],
    ],
  },
  {
    slug: 'passe-anterieur-c1', order: '03', category: 'Temps et aspect', shortTitle: 'Le passé antérieur',
    description: "Exprimez l'accomplissement immédiatement antérieur à un événement au passé simple.", purpose: "ordonner deux événements dans une narration soutenue", register: 'récit littéraire et historique',
    formula: 'quand/dès que/aussitôt que + passé antérieur, passé simple', model: "Dès qu'il eut signé, il quitta la salle.",
    patterns: [
      ['Antériorité immédiate', 'dès que + passé antérieur', "Dès qu'il eut signé, il quitta la salle.", 'un accomplissement juste avant l’événement principal', "Il signa avant de partir.", 'eut signé', "Associez normalement le passé antérieur à un repère au passé simple."],
      ['Borne accomplie', 'lorsque + passé antérieur', "Lorsqu'elle eut terminé, le public applaudit.", 'la fin d’un procès qui déclenche la suite', "La fin de son intervention déclencha les applaudissements.", 'eut terminé', "Ne l'employez pas comme simple variante du plus-que-parfait sans effet narratif."],
      ['Séquence soutenue', 'à peine + passé antérieur + que', "À peine eurent-ils franchi le seuil que l'alarme retentit.", 'une succession presque instantanée', "L'alarme retentit immédiatement après leur entrée.", 'eurent-ils franchi', "Respectez l'inversion après à peine dans ce tour soutenu."],
    ],
  },
  {
    slug: 'futur-dans-le-passe-c1', order: '04', category: 'Temps et aspect', shortTitle: 'Le futur dans le passé',
    description: "Situez une action postérieure à un repère passé, accomplie ou encore en projet.", purpose: "maintenir le point de vue temporel d’un récit rapporté", register: 'récit, biographie et discours rapporté',
    formula: 'repère passé + conditionnel présent/passé', model: "Elle ignorait alors que ce choix transformerait sa carrière.",
    patterns: [
      ['Postériorité', 'conditionnel présent', "Elle ignorait que ce choix transformerait sa carrière.", 'un avenir envisagé depuis le passé', "La transformation était future au moment de son choix.", 'transformerait', "Ne lisez pas automatiquement le conditionnel comme une hypothèse."],
      ['Accomplissement futur', 'conditionnel passé', "Il annonça qu'il aurait achevé l'étude avant juin.", 'un résultat futur déjà accompli avant une autre borne passée', "L'achèvement devait précéder juin.", 'aurait achevé', "Distinguez ce repérage de l'information non confirmée."],
      ['Destin rétrospectif', 'devoir à l’imparfait + infinitif', "Cette rencontre devait changer leur vie.", 'un avenir connu par le narrateur rétrospectif', "La rencontre changea ensuite leur vie.", 'devait changer', "Le tour peut exprimer le destin ou un projet non réalisé; le contexte tranche."],
    ],
  },
  {
    slug: 'concordance-discours-rapporte-c1', order: '05', category: 'Discours rapporté', shortTitle: 'La concordance du discours rapporté',
    description: "Transposez temps, personnes, modalités et déictiques sans perdre la portée de l'énoncé initial.", purpose: "rapporter une parole avec fidélité et cohérence énonciative", register: 'presse, compte rendu et narration',
    formula: 'repère introducteur + transposition temporelle + transposition déictique', model: "Elle a précisé qu'elle reviendrait le surlendemain.",
    patterns: [
      ['Postériorité', 'futur direct → conditionnel', "Elle a précisé qu'elle reviendrait le surlendemain.", 'une promesse future vue depuis le passé', "Elle a dit: « Je reviendrai après-demain. »", 'reviendrait le surlendemain', "Transposez aussi le repère temporel, pas seulement le verbe."],
      ['Modalité maintenue', 'devoir/pouvoir transposés', "Il a reconnu qu'il aurait dû prévenir plus tôt.", 'un jugement rétrospectif attribué au locuteur', "Il a dit: « J'aurais dû prévenir. »", 'aurait dû prévenir', "Préservez la source du jugement et son degré d'engagement."],
      ['Vérité encore valable', 'présent maintenu', "La chercheuse a rappelé que l'eau bout à cent degrés.", 'une vérité générale non limitée au moment passé', "Elle a rappelé une propriété toujours valable.", "l'eau bout", "La concordance n'impose pas l'imparfait lorsqu'une vérité générale reste valide."],
    ],
  },
  {
    slug: 'conditionnel-modal-journalistique-c1', order: '06', category: 'Modalité', shortTitle: 'Le conditionnel modal et journalistique',
    description: "Distinguez politesse, atténuation, conjecture et information attribuée à une source.", purpose: "calibrer l'engagement du locuteur envers une proposition", register: 'presse, négociation et communication institutionnelle',
    formula: 'conditionnel + source ou cadre modal explicite', model: "Selon plusieurs témoins, le convoi aurait quitté la ville.",
    patterns: [
      ['Information non confirmée', 'conditionnel + source', "Selon plusieurs témoins, le convoi aurait quitté la ville.", 'une information attribuée mais non validée', "Des témoins rapportent un départ possible.", 'aurait quitté', "Le conditionnel journalistique ne signifie pas que l'information est fausse."],
      ['Atténuation', 'conditionnel de conseil', "Vous pourriez préciser la méthode employée.", 'une recommandation moins directive', "Il serait utile de préciser la méthode.", 'pourriez préciser', "Vérifiez que l'atténuation ne rende pas la demande ambiguë."],
      ['Conjecture', 'conditionnel + interprétation', "Cette différence s'expliquerait par un biais de sélection.", 'une hypothèse explicative prudente', "Un biais de sélection pourrait expliquer l'écart.", "s'expliquerait", "Ajoutez les données ou la source qui justifient la conjecture."],
    ],
  },
  {
    slug: 'contrefactualite-conditionnel-passe-c1', order: '07', category: 'Hypothèse et modalité', shortTitle: 'La contrefactualité élaborée',
    description: "Combinez conditions explicites, implicites et mixtes pour raisonner sur ce qui ne s'est pas produit.", purpose: "évaluer des scénarios alternatifs dans plusieurs repères temporels", register: 'analyse, débat et retour d’expérience',
    formula: 'condition irréelle + conséquence au conditionnel présent/passé', model: "Sans cette intervention, la crise se serait aggravée.",
    patterns: [
      ['Condition implicite', 'sans + nom, conditionnel passé', "Sans cette intervention, la crise se serait aggravée.", 'une cause irréelle reconstruite sans si', "Si personne n'était intervenu, la crise aurait empiré.", 'se serait aggravée', "Rendez récupérable la condition implicite."],
      ['Conséquence actuelle', 'si + plus-que-parfait, conditionnel présent', "Si nous avions diversifié, nous serions moins vulnérables aujourd'hui.", 'un passé irréel qui explique un état présent', "La non-diversification crée la vulnérabilité actuelle.", 'serions moins vulnérables', "Vérifiez que le mélange des temps correspond bien à deux repères."],
      ['Inférence rétrospective', 'conditionnel passé + autrement', "Il aurait échoué; autrement, il aurait déjà publié les résultats.", 'une conclusion tirée d’un résultat absent', "L'absence de publication suggère l'échec.", 'aurait déjà publié', "Présentez cette inférence comme hypothèse, non comme preuve."],
    ],
  },
  {
    slug: 'subjonctif-relatives-c1', order: '08', category: 'Modes', shortTitle: 'Le subjonctif dans les relatives',
    description: "Choisissez le subjonctif lorsque l'antécédent est recherché, nié, indéfini ou évalué.", purpose: "présenter un référent comme visé plutôt que validé", register: 'description précise, recherche et argumentation',
    formula: 'antécédent non validé + qui/que/dont + subjonctif', model: "Nous cherchons une solution qui puisse être déployée rapidement.",
    patterns: [
      ['Recherche', 'chercher + antécédent indéfini + subjonctif', "Nous cherchons une solution qui puisse être déployée rapidement.", 'un référent souhaité mais non identifié', "Aucune solution précise n'est encore choisie.", 'qui puisse', "L'indicatif devient possible si le référent existe et est identifié."],
      ['Négation d’existence', 'ne connaître aucun + subjonctif', "Je ne connais personne qui sache résoudre ce problème.", 'l’absence de référent validé', "Aucune personne connue ne possède cette compétence.", 'qui sache', "Ne déclenchez pas le subjonctif si la négation ne porte pas sur l'existence."],
      ['Évaluation', 'le seul + relative au subjonctif', "C'est le seul modèle qui réponde à toutes les contraintes.", 'un référent distingué par une appréciation', "Un seul modèle satisfait les contraintes.", 'qui réponde', "L'indicatif reste possible quand le fait est affirmé sans valeur subjective."],
    ],
  },
  {
    slug: 'subjonctif-superlatif-indefini-c1', order: '09', category: 'Modes', shortTitle: 'Le subjonctif après superlatif et indéfini',
    description: "Exprimez une appréciation ou une limite d'expérience après un superlatif ou un indéfini.", purpose: "distinguer constat factuel et évaluation subjective", register: 'critique, récit d’expérience et appréciation',
    formula: 'superlatif/indéfini + relative + subjonctif', model: "C'est l'analyse la plus claire que j'aie lue.",
    patterns: [
      ['Superlatif évaluatif', 'le plus + adjectif + que + subjonctif', "C'est l'analyse la plus claire que j'aie lue.", 'une appréciation dans l’expérience du locuteur', "Aucune analyse lue ne me paraît plus claire.", "j'aie lue", "Accordez le participe passé avec le complément placé avant si nécessaire."],
      ['Indéfini restrictif', 'quelque chose qui + subjonctif', "Proposez quelque chose qui puisse convaincre le comité.", 'un objet souhaité mais non identifié', "La proposition reste à trouver.", 'qui puisse', "L'indicatif convient si quelque chose renvoie à un objet déjà identifié."],
      ['Premier ou dernier', 'le premier qui + subjonctif', "Ce sera le premier dispositif qui garantisse ce niveau de sécurité.", 'une singularité évaluée ou anticipée', "Aucun dispositif antérieur n'a garanti ce niveau.", 'qui garantisse', "Le mode dépend du point de vue, pas du seul ordinal."],
    ],
  },
  {
    slug: 'subjonctif-passe-relations-temporelles-c1', order: '10', category: 'Modes', shortTitle: 'Le subjonctif passé et les relations temporelles',
    description: "Coordonnez accomplissement, attente et antériorité dans une proposition au subjonctif.", purpose: "placer précisément un fait évalué par rapport à la principale", register: 'jugement, émotion et argumentation',
    formula: 'déclencheur + que + auxiliaire au subjonctif + participe passé', model: "Je doute qu'ils aient terminé avant midi.",
    patterns: [
      ['Antériorité', 'douter que + subjonctif passé', "Je doute qu'ils aient terminé avant midi.", 'un accomplissement antérieur mis en doute', "La fin avant midi me paraît incertaine.", 'aient terminé', "N'employez pas le subjonctif présent si l'accomplissement antérieur est central."],
      ['Évaluation rétrospective', 'regretter que + subjonctif passé', "Nous regrettons que la décision ait été annoncée si tard.", 'une réaction actuelle à un fait accompli', "L'annonce tardive provoque notre regret.", 'ait été annoncée', "Conservez la voix passive si le patient est le thème."],
      ['Accomplissement futur', 'attendre que + subjonctif passé', "Nous partirons après que chacun aura signé, mais pas avant que tous aient confirmé.", 'un fait attendu comme accompli avant la borne', "Toutes les confirmations doivent précéder le départ.", 'aient confirmé', "Après que appelle normalement l'indicatif; avant que appelle le subjonctif."],
    ],
  },
  {
    slug: 'propositions-infinitives-controle-sujet-c1', order: '11', category: 'Subordination', shortTitle: 'Les propositions infinitives et le contrôle du sujet',
    description: "Identifiez qui accomplit l'action infinitive et choisissez entre infinitif, de + infinitif ou que + verbe.", purpose: "éviter les sujets flottants dans les phrases condensées", register: 'écrit académique, consigne et synthèse',
    formula: 'verbe matrice + sujet contrôleur + infinitif', model: "Le comité demande aux équipes de documenter chaque étape.",
    patterns: [
      ['Contrôle par le sujet', 'sujet + promettre de + infinitif', "Les équipes promettent de documenter chaque étape.", 'le sujet principal comme agent de l’infinitif', "Les équipes promettent qu'elles documenteront tout.", 'promettent de documenter', "Vérifiez que le sujet principal peut logiquement réaliser l'action."],
      ['Contrôle par l’objet', 'demander à quelqu’un de + infinitif', "Le comité demande aux équipes de documenter chaque étape.", 'le complément comme agent de l’infinitif', "Le comité exige que les équipes documentent tout.", 'aux équipes de documenter', "Ne supprimez pas le complément si l'agent deviendrait ambigu."],
      ['Sujet propre', 'voir + groupe nominal + infinitif', "Nous avons vu la situation évoluer rapidement.", 'un infinitif avec son propre sujet exprimé', "Nous avons constaté que la situation évoluait.", 'la situation évoluer', "Distinguez l'infinitive de la construction causative."],
    ],
  },
  {
    slug: 'propositions-participiales-detachees-c1', order: '12', category: 'Subordination', shortTitle: 'Les propositions participiales détachées',
    description: "Condensez une relation temporelle, causale ou concessive tout en rendant le sujet récupérable.", purpose: "densifier le discours sans créer de participe mal rattaché", register: 'presse, essai et prose soutenue',
    formula: 'groupe nominal + participe présent/passé, proposition principale', model: "Les données ayant été vérifiées, l'équipe publia le rapport.",
    patterns: [
      ['Cause accomplie', 'sujet + ayant été + participe passé', "Les données ayant été vérifiées, l'équipe publia le rapport.", 'une cause achevée avant l’action principale', "Comme les données avaient été vérifiées, le rapport fut publié.", 'ayant été vérifiées', "Le sujet du participe doit être explicite ou sans ambiguïté."],
      ['Simultanéité', 'participe présent détaché', "Connaissant les risques, elle renforça le protocole.", 'une circonstance simultanée liée au sujet principal', "Parce qu'elle connaissait les risques, elle agit.", 'Connaissant', "Le sujet sous-entendu doit être celui de la principale."],
      ['État résultant', 'participe passé détaché', "Épuisée par les négociations, la délégation demanda une pause.", 'un état antérieur qui motive l’action', "La délégation, qui était épuisée, demanda une pause.", 'Épuisée', "Accordez le participe avec le nom auquel il se rapporte."],
    ],
  },
  {
    slug: 'gerondif-relations-semantiques-c1', order: '13', category: 'Subordination', shortTitle: 'Le gérondif et ses relations sémantiques',
    description: "Interprétez le gérondif comme simultanéité, moyen, cause, condition ou concession selon le contexte.", purpose: "condenser une relation sans la rendre indécidable", register: 'explication, récit et argumentation',
    formula: 'en + participe présent + contexte relationnel', model: "En reformulant la consigne, vous réduirez les erreurs.",
    patterns: [
      ['Moyen', 'en + participe présent', "En reformulant la consigne, vous réduirez les erreurs.", 'le moyen permettant le résultat', "La reformulation réduira les erreurs.", 'En reformulant', "Le sujet du gérondif doit normalement coïncider avec celui de la principale."],
      ['Concession', 'tout en + participe présent', "Tout en reconnaissant les progrès, le rapport souligne les risques.", 'deux orientations maintenues malgré leur tension', "Le rapport reconnaît les progrès mais souligne les risques.", 'Tout en reconnaissant', "Tout en ne crée pas toujours une concession; vérifiez le contraste."],
      ['Condition', 'en + participe présent + futur/conditionnel', "En diversifiant les sources, nous gagnerions en fiabilité.", 'une condition implicite', "Si nous diversifiions, la fiabilité augmenterait.", 'En diversifiant', "Gardez le conditionnel si la conséquence reste hypothétique."],
    ],
  },
  {
    slug: 'relatives-prepositionnelles-complexes-c1', order: '14', category: 'Relatives et référence', shortTitle: 'Les relatives prépositionnelles complexes',
    description: "Choisissez une locution prépositionnelle et un relatif composé compatibles avec l'antécédent.", purpose: "préciser les relations spatiales, logiques et institutionnelles", register: 'écrit formel, droit et analyse',
    formula: 'locution prépositionnelle + lequel/laquelle/lesquels/lesquelles', model: "Le cadre au sein duquel l'étude a été menée reste valable.",
    patterns: [
      ['Cadre', 'au sein duquel', "Le cadre au sein duquel l'étude a été menée reste valable.", 'l’environnement abstrait de l’action', "L'étude a été menée dans ce cadre.", 'au sein duquel', "Accordez lequel avec l'antécédent, non avec le nom de la locution."],
      ['Référence', 'à l’égard duquel', "Le principe à l'égard duquel des réserves subsistent sera réexaminé.", 'l’objet d’une attitude ou d’un jugement', "Des réserves subsistent à l'égard de ce principe.", "à l'égard duquel", "N'employez pas dont lorsque la préposition de appartient à une locution complexe."],
      ['Proximité', 'à proximité de laquelle', "La station à proximité de laquelle ils habitent va fermer.", 'une relation spatiale précise', "Ils habitent à proximité de cette station.", 'à proximité de laquelle', "Conservez toute la locution prépositionnelle avant le relatif."],
    ],
  },
  {
    slug: 'dont-ou-lequel-choix-fin-c1', order: '15', category: 'Relatives et référence', shortTitle: 'Dont, où et lequel : choix fin',
    description: "Sélectionnez le relatif selon la fonction exacte, le régime et la lisibilité de la référence.", purpose: "éviter les doublons prépositionnels et les antécédents ambigus", register: 'écrit formel et argumentation',
    formula: 'dont = de simple | où = lieu/temps | préposition + lequel', model: "La période au cours de laquelle le marché a changé fut brève.",
    patterns: [
      ['Complément en de', 'dont', "Voici l'étude dont nous contestons les conclusions.", 'un complément construit directement avec de', "Nous contestons les conclusions de cette étude.", 'dont nous contestons', "Ne répétez pas de dans la relative introduite par dont."],
      ['Repère temporel', 'où', "Le jour où la réforme entra en vigueur, les usages changèrent.", 'un repère de temps traité comme cadre', "Les usages changèrent ce jour-là.", 'Le jour où', "Où peut reprendre un temps, pas seulement un lieu."],
      ['Locution en de', 'au cours duquel', "Le débat au cours duquel la mesure fut adoptée reste controversé.", 'un lien construit par une locution complète', "La mesure fut adoptée au cours de ce débat.", 'au cours duquel', "Après au cours de, préférez duquel à dont."],
    ],
  },
  {
    slug: 'causatives-permissives-c1', order: '16', category: 'Voix et agent', shortTitle: 'Les constructions causatives et permissives',
    description: "Distribuez instigateur, agent et patient avec faire, laisser, se faire et se laisser.", purpose: "exprimer causation, délégation, permission ou événement subi", register: 'récit, services et analyse des responsabilités',
    formula: 'faire/laisser + infinitif + agent/patient', model: "La direction a fait réviser le protocole par un cabinet externe.",
    patterns: [
      ['Délégation', 'faire + infinitif + par', "La direction a fait réviser le protocole par un cabinet externe.", 'une action organisée par l’instigateur', "Un cabinet a révisé le protocole à la demande de la direction.", 'fait réviser', "Le participe fait reste invariable devant un infinitif."],
      ['Permission', 'laisser + infinitif', "La responsable les a laissés consulter les archives.", 'une action autorisée', "La responsable a permis leur consultation.", 'laissés consulter', "L'accord de laissé devant infinitif dépend de la norme éditoriale retenue; restez cohérent."],
      ['Événement subi', 'se faire + infinitif', "Le candidat s'est fait interrompre à plusieurs reprises.", 'un patient affecté par l’action d’autrui', "Plusieurs personnes ont interrompu le candidat.", "s'est fait interrompre", "Ne confondez pas se faire causatif et un réfléchi ordinaire."],
    ],
  },
  {
    slug: 'passif-on-impersonnel-c1', order: '17', category: 'Voix et agent', shortTitle: 'Le passif et le pronom on',
    description: "Choisissez entre passif, on indéfini et actif selon le thème, l'agent et le registre.", purpose: "gérer la responsabilité et la progression thématique", register: 'presse, science, administration et conversation',
    formula: 'patient sujet au passif | on + actif | agent explicite si pertinent', model: "Les résultats ont été confirmés, mais on ignore encore leur cause.",
    patterns: [
      ['Patient thématique', 'être + participe passé', "Les résultats ont été confirmés par deux laboratoires.", 'le résultat comme point de départ', "Deux laboratoires ont confirmé les résultats.", 'ont été confirmés', "N'utilisez pas le passif si l'agent constitue l'information nouvelle essentielle."],
      ['Agent indéfini', 'on + verbe actif', "On ignore encore la cause de l'écart.", 'une collectivité ou un agent non spécifié', "La cause reste inconnue.", 'On ignore', "Déterminez si on inclut le locuteur ou renvoie à un groupe extérieur."],
      ['Procédure impersonnelle', 'il a été décidé de', "Il a été décidé de prolonger l'étude.", 'une décision institutionnelle sans agent nommé', "Les responsables ont décidé de prolonger l'étude.", 'Il a été décidé', "L'effacement de l'agent peut masquer la responsabilité; employez-le consciemment."],
    ],
  },
  {
    slug: 'se-faire-se-laisser-infinitif-c1', order: '18', category: 'Voix et agent', shortTitle: 'Se faire et se laisser suivis de l’infinitif',
    description: "Distinguez action organisée, événement subi et absence de résistance selon le contexte.", purpose: "préciser le rôle du sujet dans une construction causative pronominale", register: 'récit, presse et conversation soignée',
    formula: 'sujet + se faire/se laisser + infinitif', model: "Elle s'est fait expliquer la procédure avant de signer.",
    patterns: [
      ['Service demandé', 'se faire + infinitif', "Elle s'est fait expliquer la procédure avant de signer.", 'une action obtenue au bénéfice du sujet', "Elle a demandé qu'on lui explique la procédure.", "s'est fait expliquer", "Fait reste invariable devant l'infinitif."],
      ['Événement subi', 'se faire + infinitif', "Il s'est fait refuser l'accès malgré son invitation.", 'un événement négatif subi par le sujet', "On lui a refusé l'accès.", "s'est fait refuser", "Le contexte distingue le service organisé de l'événement subi."],
      ['Non-résistance', 'se laisser + infinitif', "Elle s'est laissé convaincre par les nouvelles données.", 'une action acceptée ou non empêchée', "Les données l'ont convaincue et elle n'a pas résisté.", "s'est laissé convaincre", "Vérifiez l'accord de laissé selon la norme suivie et la construction."],
    ],
  },
  {
    slug: 'nominalisation-style-verbal-c1', order: '19', category: 'Style et densité', shortTitle: 'Nominalisation et style verbal',
    description: "Alternez structures nominales et verbales pour régler densité, agentivité et fluidité.", purpose: "condensez sans rendre le raisonnement opaque", register: 'rapports, presse et écrits académiques',
    formula: 'verbe ↔ nom d’action + compléments', model: "L'équipe a révisé le protocole après l'évaluation des risques.",
    patterns: [
      ['Densité nominale', 'nom d’action + de/par', "L'évaluation des risques par l'équipe a précédé la révision.", 'plusieurs relations condensées dans le groupe nominal', "L'équipe a évalué les risques puis révisé le texte.", "L'évaluation", "N'empilez pas les compléments au point de rendre l'agent indécidable."],
      ['Clarté verbale', 'sujet + verbe + complément', "L'équipe a évalué les risques avant de réviser le protocole.", 'les agents et la chronologie rendus explicites', "L'évaluation a précédé la révision.", "L'équipe a évalué", "Le style verbal n'est pas moins formel s'il rend l'action plus claire."],
      ['Progression mixte', 'nom thème + verbe rhème', "Cette évaluation a permis à l'équipe de cibler la révision.", 'un nom qui reprend le contexte puis un verbe qui avance', "L'évaluation devient le thème de la phrase suivante.", 'Cette évaluation', "Réservez le démonstratif à une reprise clairement identifiable."],
    ],
  },
  {
    slug: 'groupe-nominal-complexe-c1', order: '20', category: 'Style et densité', shortTitle: 'Le groupe nominal complexe',
    description: "Organisez détermination, adjectifs, compléments, appositions et relatives autour d'un noyau lisible.", purpose: "hiérarchiser une information dense sans ambiguïté", register: 'écrit académique, juridique et journalistique',
    formula: 'déterminant + expansions antérieures + nom noyau + expansions postérieures', model: "La nouvelle procédure européenne de contrôle adoptée en juin entre en vigueur.",
    patterns: [
      ['Noyau et compléments', 'nom + de + nom + relative', "La procédure de contrôle que le Parlement a adoptée entre en vigueur.", 'un noyau précisé par deux expansions', "Le Parlement a adopté une procédure de contrôle.", 'La procédure de contrôle', "Identifiez le nom noyau avant d'ajouter de nouvelles expansions."],
      ['Participe épithète', 'nom + participe passé + complément', "La procédure adoptée en juin entre en vigueur.", 'une relative réduite qui précise le nom', "La procédure qui a été adoptée en juin entre en vigueur.", 'adoptée en juin', "Rendez évident le rattachement du participe."],
      ['Apposition', 'nom, groupe nominal, verbe', "La procédure, élément central de la réforme, entre en vigueur.", 'une caractérisation secondaire détachée', "La procédure est centrale dans la réforme.", 'élément central', "Les virgules indiquent que l'apposition n'identifie pas le référent mais le commente."],
    ],
  },
  {
    slug: 'emphase-dislocation-c1', order: '21', category: 'Structure de l’information', shortTitle: 'L’emphase et la dislocation',
    description: "Déplacez un constituant et reprenez-le par un pronom pour installer thème, contraste ou commentaire.", purpose: "adapter la phrase à la progression de l'information", register: 'oral soigné, presse et argumentation',
    formula: 'groupe détaché, reprise pronominale + proposition', model: "Cette hypothèse, personne ne l'a encore vérifiée.",
    patterns: [
      ['Thème à gauche', 'groupe, pronom + verbe', "Cette hypothèse, personne ne l'a encore vérifiée.", 'un référent posé comme thème avant le commentaire', "Personne n'a encore vérifié cette hypothèse.", "Cette hypothèse, personne ne l'a", "La reprise pronominale est obligatoire dans une vraie dislocation."],
      ['Rappel à droite', 'proposition + pronom, groupe', "Personne ne l'a vérifiée, cette hypothèse.", 'un référent rappelé ou clarifié après la proposition', "Cette hypothèse n'a été vérifiée par personne.", 'cette hypothèse', "La dislocation à droite porte souvent une valeur orale; contrôlez le registre."],
      ['Contraste clivé', "c'est + focus + qui/que", "C'est la méthode qu'il faut revoir, pas les données.", 'un contraste exclusif sur un constituant', "Il faut revoir la méthode plutôt que les données.", "C'est la méthode qu'il faut", "Choisissez qui pour le sujet et que pour le complément."],
    ],
  },
  {
    slug: 'constructions-detachees-segmentation-c1', order: '22', category: 'Structure de l’information', shortTitle: 'Les constructions détachées',
    description: "Employez apposition, adjectif détaché et segment incident pour commenter sans casser la syntaxe.", purpose: "ajouter un cadrage secondaire clairement rattaché", register: 'prose soutenue, portrait et commentaire',
    formula: 'segment détaché, proposition principale | proposition, incident, suite', model: "Prudente, la chercheuse refusa de conclure trop vite.",
    patterns: [
      ['Adjectif détaché', 'adjectif, sujet + verbe', "Prudente, la chercheuse refusa de conclure trop vite.", 'une propriété du sujet qui motive son action', "Parce qu'elle était prudente, elle attendit.", 'Prudente', "Accordez l'adjectif et placez-le près du référent."],
      ['Apposition explicative', 'nom, apposition, verbe', "Le directeur, seul responsable du projet, présenta le bilan.", 'une précision non restrictive', "Le directeur, qui était seul responsable, présenta le bilan.", 'seul responsable', "Encadrez l'apposition explicative par la ponctuation appropriée."],
      ['Incident', 'proposition, semble-t-il, suite', "Cette solution, semble-t-il, réduit les coûts.", 'un commentaire du locuteur sur son assertion', "Il semble que cette solution réduise les coûts.", 'semble-t-il', "L'incise ne doit pas rompre un groupe syntaxique indivisible."],
    ],
  },
  {
    slug: 'anaphore-demonstrative-c1', order: '23', category: 'Cohésion et référence', shortTitle: 'L’anaphore démonstrative',
    description: "Reprenez un référent ou une proposition avec celui-ci, cette dernière, ce point ou cela.", purpose: "enchaîner les phrases sans référence vague", register: 'synthèse, rapport et argumentation',
    formula: 'référent antérieur + démonstratif qualifié', model: "Deux options restent possibles; la seconde paraît plus robuste.",
    patterns: [
      ['Contraste ordinal', 'le premier/la seconde', "Deux options restent possibles; la seconde paraît plus robuste.", 'un élément repéré dans une série', "L'option numéro deux est plus robuste.", 'la seconde', "Assurez-vous que l'ordre des référents est immédiatement récupérable."],
      ['Reprise qualifiée', 'ce/cette + nom classifiant', "Le délai a doublé. Cette évolution fragilise le calendrier.", 'un fait antérieur recatégorisé', "Le doublement du délai fragilise le calendrier.", 'Cette évolution', "Le nom choisi doit interpréter fidèlement la proposition reprise."],
      ['Reprise neutre', 'cela + verbe', "Les résultats divergent; cela exige une vérification.", 'une proposition entière reprise comme sujet', "La divergence exige une vérification.", 'cela exige', "Évitez cela si plusieurs faits antérieurs peuvent servir d'antécédent."],
    ],
  },
  {
    slug: 'substitution-ellipse-c1', order: '24', category: 'Cohésion et référence', shortTitle: 'La substitution et l’ellipse',
    description: "Supprimez ou remplacez ce qui est récupérable sans créer de rupture de sens.", purpose: "alléger le texte tout en maintenant parallélisme et référence", register: 'dialogue, comparaison et prose analytique',
    formula: 'forme pleine initiale + substitution/ellipse contrôlée', model: "Certains approuvent la réforme; d'autres, non.",
    patterns: [
      ['Ellipse verbale', 'sujet, complément sans verbe répété', "Paul défend le projet; Léa, son financement.", 'deux prédications parallèles avec verbe partagé', "Paul défend le projet et Léa défend son financement.", 'Léa, son financement', "Gardez une structure suffisamment parallèle pour reconstruire le verbe."],
      ['Substitution pronominale', 'celui/celle + complément', "La méthode actuelle est moins fiable que celle du laboratoire.", 'un nom repris avec un complément distinctif', "La méthode du laboratoire est plus fiable.", 'celle du laboratoire', "Celui ne peut normalement pas rester sans expansion dans cet emploi."],
      ['Réponse elliptique', 'adverbe ou groupe bref', "Certains approuvent la réforme; d'autres, non.", 'une polarité reconstruite à partir du contexte', "D'autres n'approuvent pas la réforme.", "d'autres, non", "La ponctuation doit rendre visible l'élément omis."],
    ],
  },
  {
    slug: 'concession-paradoxe-c1', order: '25', category: 'Relations logiques', shortTitle: 'La concession et le paradoxe',
    description: "Articulez fait admis, attente et conclusion contraire avec des formes de force différente.", purpose: "construire une argumentation qui intègre les objections", register: 'essai, débat et analyse critique',
    formula: 'concession reconnue + conclusion maintenue', model: "Si solide que soit l'hypothèse, elle doit encore être testée.",
    patterns: [
      ['Concession intensive', 'si + adjectif + que + subjonctif', "Si solide que soit l'hypothèse, elle doit encore être testée.", 'une qualité admise mais insuffisante', "Même très solide, l'hypothèse doit être testée.", 'Si solide que soit', "Respectez l'inversion du sujet dans ce tour soutenu."],
      ['Concession indéfinie', 'quel que + être au subjonctif', "Quelle que soit l'issue, le protocole restera public.", 'toutes les issues possibles sans exception', "L'issue ne changera pas la publicité du protocole.", 'Quelle que soit', "Accordez quel avec le nom auquel il renvoie."],
      ['Paradoxe', 'alors même que + indicatif', "Le soutien diminue alors même que les résultats progressent.", 'une coexistence contraire à l’attente', "Les progrès n'empêchent pas la baisse du soutien.", 'alors même que', "Expliquez l'attente implicite qui rend la relation paradoxale."],
    ],
  },
  {
    slug: 'hypothese-sans-si-c1', order: '26', category: 'Hypothèse et modalité', shortTitle: 'L’hypothèse sans si',
    description: "Exprimez une condition avec inversion, groupe prépositionnel, participe ou coordination.", purpose: "varier l’architecture conditionnelle selon le registre", register: 'argumentation, presse et prose soutenue',
    formula: 'condition implicite ou inversée + conséquence conditionnelle', model: "Aurait-il refusé, le résultat aurait été identique.",
    patterns: [
      ['Inversion soutenue', 'auxiliaire au conditionnel + sujet', "Aurait-il refusé, le résultat aurait été identique.", 'une condition passée irréelle sans si', "S'il avait refusé, rien n'aurait changé.", 'Aurait-il refusé', "Réservez cette inversion à un registre soutenu."],
      ['Groupe prépositionnel', 'avec/sans + nom', "Avec davantage de données, l'analyse serait plus solide.", 'une condition condensée dans un groupe nominal', "Si nous avions plus de données, l'analyse serait meilleure.", 'Avec davantage de données', "Le groupe doit permettre de reconstruire une condition non ambiguë."],
      ['Coordination conditionnelle', 'impératif + et + futur', "Ajoutez une source et l'argument gagnera en force.", 'une action présentée comme condition suffisante', "Si vous ajoutez une source, l'argument sera plus fort.", "l'argument gagnera", "Cette coordination peut sonner injonctive; adaptez-la au destinataire."],
    ],
  },
  {
    slug: 'connecteurs-logiques-avances-c1', order: '27', category: 'Cohésion', shortTitle: 'Les connecteurs logiques avancés',
    description: "Choisissez un connecteur selon la relation exacte, sa portée et sa position dans le paragraphe.", purpose: "rendre le raisonnement explicite sans surcharger le texte", register: 'essai, synthèse et présentation experte',
    formula: 'relation logique + connecteur + ponctuation + portée', model: "Les données sont limitées; pour autant, l'hypothèse reste plausible.",
    patterns: [
      ['Concession argumentative', 'pour autant', "Les données sont limitées; pour autant, l'hypothèse reste plausible.", 'une conclusion maintenue malgré une réserve', "La limite des données n'annule pas la plausibilité.", 'pour autant', "Pour autant ne signifie pas simplement donc."],
      ['Conséquence déduite', 'dès lors', "La source n'est pas vérifiable; dès lors, elle ne peut fonder la conclusion.", 'une conséquence présentée comme nécessaire', "L'absence de vérification exclut la source.", 'dès lors', "N'employez pas dès lors pour une simple succession temporelle si la relation est logique."],
      ['Restriction', 'du moins', "La réforme fonctionne, du moins dans les grandes villes.", 'une limitation de la portée de l’assertion', "Le succès est confirmé seulement dans certaines zones.", 'du moins', "Placez la restriction près de l'élément dont elle limite la portée."],
    ],
  },
  {
    slug: 'modalisation-attenuation-c1', order: '28', category: 'Modalité', shortTitle: 'La modalisation et l’atténuation',
    description: "Dosez certitude, probabilité, obligation et distance à l'aide de verbes, adverbes et tournures impersonnelles.", purpose: "calibrer une affirmation selon la force des preuves", register: 'écrit académique, expertise et diplomatie',
    formula: 'marqueur modal + proposition + source ou limite', model: "Il semble raisonnable de considérer ce résultat comme provisoire.",
    patterns: [
      ['Prudence impersonnelle', 'il semble + adjectif + de', "Il semble raisonnable de considérer ce résultat comme provisoire.", 'une conclusion prudente sans effacement total du jugement', "Nous considérons prudemment le résultat comme provisoire.", 'Il semble raisonnable', "La tournure impersonnelle ne dispense pas de justifier l'évaluation."],
      ['Probabilité graduée', 'sans doute/probablement + verbe', "Cette variation tient probablement au mode de collecte.", 'une explication jugée probable mais non certaine', "Le mode de collecte est une cause plausible.", 'probablement', "Choisissez un adverbe compatible avec le niveau réel de preuve."],
      ['Atténuation lexicale', 'tendre à / paraître + infinitif', "Les résultats tendent à confirmer l'hypothèse.", 'une orientation régulière sans conclusion absolue', "Les résultats soutiennent partiellement l'hypothèse.", 'tendent à confirmer', "N'utilisez pas tendre à pour masquer une conclusion déjà certaine."],
    ],
  },
  {
    slug: 'discours-indirect-libre-c1', order: '29', category: 'Discours rapporté', shortTitle: 'Le discours indirect libre',
    description: "Reconnaissez la voix d'un personnage intégrée au récit sans verbe introducteur ni subordination.", purpose: "faire coexister voix narrative et point de vue rapporté", register: 'littérature, chronique et narration créative',
    formula: 'temps du récit + déictiques/expressivité du personnage', model: "Il regarda l'horloge. Était-il déjà si tard ?",
    patterns: [
      ['Question intérieure', 'interrogation sans introducteur', "Il regarda l'horloge. Était-il déjà si tard ?", 'une pensée du personnage dans la voix narrative', "Il se demanda s'il était déjà si tard.", 'Était-il déjà', "Le contexte doit permettre d'identifier clairement la source de la question."],
      ['Exclamation rapportée', 'exclamation autonome au temps du récit', "Elle relut la lettre. Quelle injustice on lui infligeait !", 'une réaction affective intégrée au récit', "Elle pensa qu'on lui infligeait une injustice.", 'Quelle injustice', "Conservez les repères personnels compatibles avec le point de vue choisi."],
      ['Futur dans le passé', 'conditionnel + déictique proche', "Demain, elle partirait enfin; plus rien ne la retenait.", 'le projet du personnage vu depuis le récit', "Elle pensait qu'elle partirait le lendemain.", 'elle partirait enfin', "Le déictique peut appartenir au personnage; rendez ce déplacement interprétable."],
    ],
  },
  {
    slug: 'ponctuation-syntaxe-c1', order: '30', category: 'Contrôle éditorial', shortTitle: 'Ponctuation et syntaxe complexe',
    description: "Employez virgule, point-virgule, deux-points et tirets pour rendre visibles les relations syntaxiques.", purpose: "organiser une phrase complexe sans faux raccord ni ambiguïté", register: 'tout écrit élaboré',
    formula: 'unité syntaxique + signe adapté + relation explicite', model: "Une difficulté subsiste : les données ne couvrent pas toute la période.",
    patterns: [
      ['Explication', 'proposition : explication', "Une difficulté subsiste : les données ne couvrent pas toute la période.", 'une seconde unité qui explicite la première', "La couverture incomplète constitue la difficulté.", 'subsiste : les données', "N'utilisez les deux-points que si la seconde unité développe réellement la première."],
      ['Opposition liée', 'proposition ; connecteur, proposition', "La méthode est robuste; toutefois, son coût reste élevé.", 'deux propositions autonomes fortement liées', "La robustesse n'annule pas le coût.", '; toutefois,', "Une virgule seule ne suffit pas entre deux propositions indépendantes."],
      ['Incise', 'proposition — commentaire — suite', "Cette option — la plus prudente à ce stade — sera réévaluée.", 'un commentaire détaché mais intégré', "L'option la plus prudente sera réévaluée.", '— la plus prudente', "Fermez l'incise avec le même signe et ne séparez pas les constituants essentiels."],
    ],
  },
]

export const c1CurriculumTopics = specs.map((value, index) => topic(seed(value, index)))
