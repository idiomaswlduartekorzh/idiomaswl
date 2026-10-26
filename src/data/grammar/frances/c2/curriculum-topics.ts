import { createFrenchAdvancedCurriculumTopic as topic, pattern as p, type FrenchAdvancedCurriculumSpec } from '../advanced-curriculum-factory.ts'

type Seed = Omit<FrenchAdvancedCurriculumSpec, 'level' | 'color' | 'patterns'> & {
  patterns: [Parameters<typeof p>, Parameters<typeof p>, Parameters<typeof p>]
}

const colors = ['#111827', '#18347A', '#9F1239', '#5B21B6', '#115E59']
const seed = (value: Seed, index: number): FrenchAdvancedCurriculumSpec => ({
  ...value,
  level: 'C2',
  color: colors[index % colors.length],
  patterns: value.patterns.map((entry) => p(...entry)) as FrenchAdvancedCurriculumSpec['patterns'],
})

const specs: Seed[] = [
  {
    slug: 'point-de-vue-temporel-aspectuel-c2', order: '01', category: 'Temps et aspect', shortTitle: 'Le point de vue temporel et aspectuel',
    description: "Manipulez repère, borne, durée et point de vue pour présenter un même procès comme événement, état ou développement.", purpose: "contrôler la manière dont le lecteur entre dans la chronologie", register: 'analyse experte, récit et commentaire',
    formula: 'repère + aspect lexical + aspect grammatical + focalisation', model: "Depuis une heure, il écrivait encore lorsque la décision tomba.",
    patterns: [
      ['Vision interne', 'imparfait + procès en cours', "Depuis une heure, il écrivait encore lorsque la décision tomba.", 'un procès observé avant sa borne finale', "Son écriture était en cours au moment de la décision.", 'il écrivait encore', "Ne déduisez pas de l'imparfait que le procès n'a jamais été achevé."],
      ['Vision globale', 'passé composé/passé simple borné', "Il rédigea le rapport en une heure.", 'un procès saisi comme totalité achevée', "La rédaction complète dura une heure.", 'rédigea le rapport', "Le complément en une heure impose une lecture bornée."],
      ['État résultant', 'présent + participe/adjectif résultatif', "Le rapport est désormais rédigé et peut circuler.", 'le résultat actuel d’un procès antérieur', "La rédaction antérieure rend la circulation possible.", 'est désormais rédigé', "Distinguez le passif événementiel de l'état résultant grâce au contexte."],
    ],
  },
  {
    slug: 'systeme-temps-litteraires-c2', order: '02', category: 'Temps et aspect', shortTitle: 'Le système des temps littéraires',
    description: "Coordonnez passé simple, imparfait, plus-que-parfait, passé antérieur et conditionnel dans une narration soutenue.", purpose: "maintenir une architecture temporelle stable sur plusieurs plans", register: 'littérature, histoire et pastiche',
    formula: 'cadre imparfait + événements passé simple + antériorité + futur du passé', model: "Quand il eut relu la lettre qu'elle avait laissée, il comprit qu'il partirait.",
    patterns: [
      ['Double antériorité', 'plus-que-parfait + passé antérieur', "Quand il eut relu la lettre qu'elle avait laissée, il comprit.", 'deux profondeurs antérieures hiérarchisées', "Elle laissa la lettre; il la relut; il comprit.", "eut relu", "Attribuez à chaque temps un repère distinct plutôt que de les varier pour le style."],
      ['Progression', 'passé simple + imparfait de cadre', "La pluie tombait lorsqu'il franchit le portail et disparut.", 'un cadre continu traversé par des événements bornés', "La pluie formait le décor de son entrée et de sa disparition.", 'franchit le portail', "Gardez l'imparfait pour le cadre, non pour chaque étape principale."],
      ['Postériorité', 'conditionnel depuis un repère passé', "Il comprit qu'il partirait avant l'aube.", 'un avenir interne au monde raconté', "Son départ était futur au moment de sa compréhension.", "qu'il partirait", "Ne confondez pas cette valeur temporelle avec une réserve énonciative."],
    ],
  },
  {
    slug: 'subjonctif-imparfait-c2', order: '03', category: 'Modes et registre', shortTitle: 'Le subjonctif imparfait',
    description: "Reconnaissez et produisez le subjonctif imparfait dans la concordance littéraire et certains effets stylistiques.", purpose: "adapter le mode à une narration soutenue sans archaïsme gratuit", register: 'littérature, histoire et style recherché',
    formula: 'principale au passé + que + subjonctif imparfait', model: "Il fallait qu'elle prît une décision avant l'aube.",
    patterns: [
      ['Concordance classique', 'fallait que + subjonctif imparfait', "Il fallait qu'elle prît une décision avant l'aube.", 'une obligation simultanée dans un récit au passé', "Il fallait qu'elle prenne une décision.", "qu'elle prît", "Dans l'usage contemporain, le subjonctif présent reste souvent naturel; choisissez selon le registre."],
      ['Volonté passée', 'voulut que + subjonctif imparfait', "Le directeur voulut que chacun répondît par écrit.", 'une volonté inscrite dans une narration soutenue', "Le directeur exigea une réponse écrite de tous.", 'répondît', "Vérifiez les formes, notamment celles qui ressemblent au passé simple."],
      ['Concession littéraire', 'bien que + subjonctif imparfait', "Bien qu'il fût tard, nul ne songea à partir.", 'un obstacle admis dans un style littéraire', "Malgré l'heure tardive, personne ne partit.", "qu'il fût", "N'accumulez pas les marques archaïsantes sans cohérence globale."],
    ],
  },
  {
    slug: 'plus-que-parfait-subjonctif-conditionnel-deuxieme-forme-c2', order: '04', category: 'Modes et registre', shortTitle: 'Le plus-que-parfait du subjonctif',
    description: "Interprétez l'antériorité modale et la deuxième forme du conditionnel passé dans les textes soutenus.", purpose: "lire et produire des relations irréelles dans un système littéraire", register: 'littérature, discours historique et pastiche',
    formula: 'auxiliaire au subjonctif imparfait + participe passé', model: "S'il eût su, il n'eût pas accepté.",
    patterns: [
      ['Antériorité modale', 'que + plus-que-parfait du subjonctif', "Elle regrettait qu'il fût parti sans prévenir.", 'un fait accompli antérieur évalué depuis le passé', "Elle regrettait qu'il soit parti.", "qu'il fût parti", "Distinguez fût avec accent du passé simple fut."],
      ['Conditionnel passé II', "si + plus-que-parfait, eût + participe", "S'il avait su, il n'eût pas accepté.", 'une conséquence irréelle dans un registre littéraire', "S'il avait su, il n'aurait pas accepté.", "n'eût pas accepté", "La deuxième forme appartient surtout à l'écrit littéraire."],
      ['Double forme littéraire', "si + eût + participe, eût + participe", "S'il eût su, il eût refusé.", 'une contrefactualité entièrement stylisée', "S'il avait su, il aurait refusé.", "S'il eût su", "Évitez cette double construction hors d'un projet stylistique explicite."],
    ],
  },
  {
    slug: 'systeme-irreel-contrefactuel-c2', order: '05', category: 'Hypothèse et modalité', shortTitle: 'Le système irréel et contrefactuel',
    description: "Combinez présupposition, condition implicite et temporalité mixte pour évaluer des mondes alternatifs.", purpose: "rendre explicite ce qui est tenu pour contraire aux faits", register: 'raisonnement, expertise et débat',
    formula: 'base factuelle + scénario alternatif + conséquence évaluée', model: "Eût-on retenu cette option, le coût serait aujourd'hui moindre.",
    patterns: [
      ['Inversion irréelle', 'eût-on + participe', "Eût-on retenu cette option, le coût serait aujourd'hui moindre.", 'une cause passée irréelle et un résultat présent', "Si cette option avait été retenue, le coût serait moindre.", 'Eût-on retenu', "Le mélange des repères doit correspondre à un effet encore actuel."],
      ['Condition minimale', 'il aurait suffi de + infinitif', "Il aurait suffi de vérifier la source pour éviter l'erreur.", 'une condition non réalisée présentée comme suffisante', "La vérification aurait empêché l'erreur.", 'Il aurait suffi', "Ne présentez pas comme suffisante une condition qui ne l'est pas démontrée."],
      ['Sans quoi', 'assertion; sans quoi + conditionnel', "Le serveur devait être isolé, sans quoi la panne se serait propagée.", 'une conséquence irréelle évitée par la mesure précédente', "Sans isolement, la panne aurait progressé.", 'sans quoi', "L'antécédent de quoi doit être la proposition précédente entière."],
    ],
  },
  {
    slug: 'conditionnel-evidentiel-c2', order: '06', category: 'Modalité', shortTitle: 'Le conditionnel évidentiel',
    description: "Attribuez une information, une inférence ou une rumeur en réglant précisément la distance énonciative.", purpose: "séparer source, plausibilité et responsabilité du locuteur", register: 'presse, expertise et synthèse critique',
    formula: 'source + conditionnel + statut de confirmation', model: "D'après les premiers relevés, la faille se serait produite avant minuit.",
    patterns: [
      ['Source rapportée', "d'après + source, conditionnel passé", "D'après les premiers relevés, la faille se serait produite avant minuit.", 'une information attribuée à des données provisoires', "Les premiers relevés suggèrent une faille antérieure à minuit.", 'se serait produite', "N'effacez pas la source dont dépend la réserve."],
      ['Rumeur distinguée', 'conditionnel + attribution explicite', "Le groupe envisagerait, selon la presse, une fusion.", 'un projet rapporté mais non confirmé', "La presse évoque un projet de fusion.", 'envisagerait', "Le conditionnel seul ne remplace pas une attribution rigoureuse."],
      ['Inférence', 'conditionnel explicatif', "La baisse s'expliquerait par un changement de méthode.", 'une cause inférée à partir d’indices', "Le changement de méthode constitue une explication plausible.", "s'expliquerait", "Différenciez hypothèse de l'analyste et parole d'une source."],
    ],
  },
  {
    slug: 'choix-mode-nuance-c2', order: '07', category: 'Modes et registre', shortTitle: 'Le choix du mode et la nuance',
    description: "Exploitez l'opposition indicatif-subjonctif-conditionnel pour modifier validation, visée et distance.", purpose: "exprimer une position énonciative sans ambiguïté", register: 'argumentation experte et prose littéraire',
    formula: 'déclencheur + mode = statut donné à la proposition', model: "Je cherche un argument qui convainque, non un argument qui convainc déjà.",
    patterns: [
      ['Référent validé', 'relative à l’indicatif', "Je relis l'argument qui convainc le comité.", 'un argument identifié par un fait présenté comme réel', "Cet argument convainc effectivement le comité.", 'qui convainc', "L'indicatif engage le locuteur sur la validation du fait."],
      ['Référent visé', 'relative au subjonctif', "Je cherche un argument qui convainque le comité.", 'un argument souhaité mais non identifié', "L'argument capable de convaincre reste à trouver.", 'qui convainque', "Le subjonctif ne nie pas l'existence; il la laisse non validée."],
      ['Référent hypothétique', 'relative au conditionnel', "Un argument qui convaincrait le comité devrait être étayé.", 'une propriété envisagée dans un scénario', "Tout argument susceptible de convaincre aurait besoin de preuves.", 'qui convaincrait', "Rendez visible la condition implicite qui autorise le conditionnel."],
    ],
  },
  {
    slug: 'infinitif-passe-sujet-implicite-c2', order: '08', category: 'Subordination', shortTitle: 'L’infinitif passé et le sujet implicite',
    description: "Contrôlez l'agent et l'antériorité dans des infinitives actives, passives et pronominales.", purpose: "condenser une relation temporelle sans sujet flottant", register: 'écrit soutenu, synthèse et récit',
    formula: 'après/avant de + infinitif passé + contrôleur identifiable', model: "Après avoir été vérifiées, les données ont été publiées.",
    patterns: [
      ['Sujet partagé', 'après avoir + participe', "Après avoir vérifié les données, l'équipe les a publiées.", 'le sujet principal comme agent des deux actions', "L'équipe a vérifié puis publié les données.", 'Après avoir vérifié', "Le sujet sous-entendu de l'infinitif doit être l'équipe."],
      ['Infinitif passif', 'après avoir été + participe', "Après avoir été vérifiées, les données ont été publiées.", 'le sujet principal comme patient de l’action antérieure', "Après leur vérification, les données ont été publiées.", 'avoir été vérifiées', "Accordez le participe et maintenez les données comme sujet logique."],
      ['Antériorité pronominale', "après s'être + participe", "Après s'être concertés, les experts ont rendu leur avis.", 'une action pronominale achevée par le même groupe', "Les experts se sont concertés puis ont rendu leur avis.", "s'être concertés", "Appliquez l'accord propre au verbe pronominal."],
    ],
  },
  {
    slug: 'participiales-haute-densite-c2', order: '09', category: 'Subordination', shortTitle: 'Les participiales à forte densité',
    description: "Enchâssez plusieurs circonstances participiales tout en préservant la hiérarchie des agents.", purpose: "densifier sans produire de rattachement fautif", register: 'presse, droit et prose académique',
    formula: 'sujet propre + participe + compléments, principale', model: "Les contrôles ayant été renforcés, les incidents ayant diminué, le dispositif fut maintenu.",
    patterns: [
      ['Cause autonome', 'groupe nominal + ayant + participe', "Les contrôles ayant été renforcés, les incidents ont diminué.", 'une cause avec son propre sujet', "Parce que les contrôles ont été renforcés, les incidents ont diminué.", 'Les contrôles ayant été renforcés', "Ne rattachez pas renforcés au sujet incidents."],
      ['Circonstances coordonnées', 'deux participiales + principale', "Les contrôles ayant été renforcés et les incidents ayant diminué, le dispositif fut maintenu.", 'deux conditions convergentes avant la décision', "Le renforcement et la baisse ont justifié le maintien.", 'les incidents ayant diminué', "Parallélisez les deux sujets et leurs participes."],
      ['Réserve détachée', 'tout bien considéré', "Tout bien considéré, le dispositif demeure préférable.", 'un bilan global présenté comme cadre', "Après examen de tous les éléments, ce choix reste meilleur.", 'Tout bien considéré', "Employez les formules figées sans leur attribuer un agent impossible."],
    ],
  },
  {
    slug: 'passif-effacement-agent-c2', order: '10', category: 'Voix et responsabilité', shortTitle: 'Le passif et l’effacement de l’agent',
    description: "Évaluez les effets rhétoriques du passif, du nominal et de l'impersonnel sur l'attribution de responsabilité.", purpose: "choisir consciemment ce que la phrase rend visible ou masque", register: 'administration, science, presse et critique',
    formula: 'patient thématique + agent explicite, implicite ou effacé', model: "Des erreurs ont été commises; le rapport ne précise pas par qui.",
    patterns: [
      ['Agent effacé', 'passif sans par', "Des erreurs ont été commises pendant l'audit.", 'le résultat mis en avant sans responsable nommé', "Quelqu'un a commis des erreurs.", 'ont été commises', "Si la responsabilité est pertinente, l'effacement doit être justifié."],
      ['Agent réintroduit', 'passif + par', "Les données ont été modifiées par l'équipe externe.", 'le patient comme thème et l’agent comme information nouvelle', "L'équipe externe a modifié les données.", "par l'équipe externe", "Préférez l'actif si l'agent doit devenir le thème du passage suivant."],
      ['Nominalisation opaque', 'nom d’action sans agent', "La modification des données a retardé l'audit.", 'l’action transformée en événement sans attribution', "Les données ont été modifiées et l'audit a pris du retard.", 'La modification des données', "Réintroduisez l'agent lorsqu'il conditionne l'interprétation éthique ou causale."],
    ],
  },
  {
    slug: 'enchassement-complexe-c2', order: '11', category: 'Architecture syntaxique', shortTitle: 'L’enchâssement complexe',
    description: "Hiérarchisez complétives, relatives et circonstancielles imbriquées sans perdre le fil principal.", purpose: "construire une phrase longue mais navigable", register: 'écrit académique, droit et essai',
    formula: 'matrice + subordonnée 1 + subordonnée 2 avec frontières visibles', model: "L'étude montre que les mesures que le comité a retenues réduisent les risques.",
    patterns: [
      ['Complétive avec relative', 'montrer que + nom + relative + verbe', "L'étude montre que les mesures que le comité a retenues réduisent les risques.", 'une proposition objet contenant un nom précisé', "Le comité a retenu des mesures; l'étude montre leur efficacité.", 'que les mesures que', "Repérez les deux que et leur fonction différente."],
      ['Relative avec complétive', 'nom + dont + croire que', "L'hypothèse dont nous croyons qu'elle explique l'écart doit être testée.", 'une source référentielle contenant un jugement', "Nous croyons que cette hypothèse explique l'écart.", 'dont nous croyons', "Évitez dont si aucun élément interne n'est construit avec de."],
      ['Circonstancielle enchâssée', 'bien que + croire que + indicatif', "Bien qu'il pense que la méthode fonctionne, il demande un test.", 'une concession portant sur une croyance, non directement sur le fait', "Sa croyance n'empêche pas sa demande de test.", 'Bien qu\'il pense', "Le subjonctif porte sur pense; la complétive conserve le mode requis par croire affirmatif."],
    ],
  },
  {
    slug: 'relatives-ambiguite-rattachement-c2', order: '12', category: 'Relatives et référence', shortTitle: 'Les relatives et l’ambiguïté de rattachement',
    description: "Détectez puis réparez les relatives dont l'antécédent ou la portée peuvent être interprétés de deux façons.", purpose: "garantir une référence univoque dans les groupes nominaux complexes", register: 'édition, droit et communication experte',
    formula: 'antécédent adjacent + accord + sens compatible', model: "Nous avons interrogé la responsable du service, laquelle a confirmé la date.",
    patterns: [
      ['Antécédent humain', 'laquelle après virgule', "Nous avons interrogé la responsable du service, laquelle a confirmé la date.", 'la responsable clairement reprise', "La responsable a confirmé la date.", 'laquelle a confirmé', "La forme du relatif doit exclure service comme antécédent."],
      ['Réécriture explicite', 'nouvelle phrase avec nom repris', "Nous avons examiné le plan du bâtiment. Ce plan doit être révisé.", 'une ambiguïté supprimée par répétition contrôlée', "Le plan du bâtiment doit être révisé.", 'Ce plan', "Une répétition claire vaut mieux qu'un pronom ambigu."],
      ['Relative restrictive', 'nom immédiatement suivi de qui', "Seules les données qui ont été vérifiées seront publiées.", 'un sous-ensemble défini par la relative', "Les données non vérifiées seront exclues.", 'qui ont été vérifiées', "La suppression de la relative change ici l'ensemble référé."],
    ],
  },
  {
    slug: 'nominalisation-metaphore-grammaticale-c2', order: '13', category: 'Style et densité', shortTitle: 'La nominalisation et la métaphore grammaticale',
    description: "Transformez processus et jugements en objets de discours, puis évaluez le coût en agentivité et lisibilité.", purpose: "adapter la densité informationnelle au genre", register: 'science, institution et critique',
    formula: 'proposition dynamique ↔ groupe nominal abstrait', model: "La non-reconduction du dispositif a suscité une contestation.",
    patterns: [
      ['Processus réifié', 'nom d’action + complément', "La non-reconduction du dispositif a suscité une contestation.", 'une décision traitée comme objet abstrait', "Le dispositif n'a pas été reconduit, ce qui a provoqué une contestation.", 'La non-reconduction', "Dépliez la nominalisation si elle cache qui a décidé."],
      ['Jugement nominalisé', 'adjectif → nom abstrait', "La fragilité de l'argument tient à sa source unique.", 'une propriété devenue thème analytique', "L'argument est fragile parce qu'il repose sur une source.", 'La fragilité', "Le nom abstrait doit ajouter une fonction textuelle, non seulement alourdir."],
      ['Dépliage verbal', 'agent + verbe + conséquence', "Le comité n'a pas reconduit le dispositif, et cette décision a été contestée.", 'l’agent et la séquence rendus explicites', "La non-reconduction a suscité une contestation.", "Le comité n'a pas reconduit", "Choisissez la version verbale quand l'attribution est essentielle."],
    ],
  },
  {
    slug: 'apposition-parenthese-c2', order: '14', category: 'Architecture syntaxique', shortTitle: 'L’apposition et la parenthèse',
    description: "Insérez définition, commentaire ou réserve avec un degré de détachement maîtrisé.", purpose: "ajouter une voix secondaire sans brouiller la proposition centrale", register: 'essai, presse et prose littéraire',
    formula: 'noyau + virgules/tirets/parenthèses + commentaire', model: "Le protocole — solution provisoire, rappelons-le — sera révisé.",
    patterns: [
      ['Apposition intégrée', 'nom, groupe nominal, verbe', "Le protocole, solution provisoire, sera révisé.", 'une identification secondaire neutre', "Le protocole est provisoire et sera révisé.", 'solution provisoire', "L'apposition doit partager le même référent que le nom."],
      ['Incise énonciative', 'tirets + proposition incidente', "Le protocole — solution provisoire, rappelons-le — sera révisé.", 'un commentaire adressé au lecteur', "Rappelons que le protocole est provisoire.", 'rappelons-le', "Fermez l'incise et vérifiez que la phrase principale reste grammaticale sans elle."],
      ['Parenthèse documentaire', 'parenthèses + précision', "Le protocole (adopté en 2024) sera révisé.", 'une information accessoire à faible intégration', "Le protocole adopté en 2024 sera révisé.", '(adopté en 2024)', "N'enfermez pas entre parenthèses une condition nécessaire à l'identification."],
    ],
  },
  {
    slug: 'theme-rheme-progression-c2', order: '15', category: 'Structure de l’information', shortTitle: 'Thème, rhème et progression',
    description: "Organisez l'information connue et nouvelle pour construire une progression constante, linéaire ou dérivée.", purpose: "guider le lecteur à l'échelle du paragraphe", register: 'tout discours élaboré',
    formula: 'thème récupérable + rhème nouveau → thème suivant', model: "L'étude révèle un biais. Ce biais affecte surtout le second groupe.",
    patterns: [
      ['Progression linéaire', 'rhème 1 → thème 2', "L'étude révèle un biais. Ce biais affecte surtout le second groupe.", 'l’information nouvelle reprise comme départ suivant', "Le biais découvert affecte le second groupe.", 'Ce biais', "Le démonstratif doit reprendre un référent unique."],
      ['Thème constant', 'même thème + prédicats successifs', "Le protocole réduit les erreurs. Il simplifie aussi la vérification.", 'un même objet développé sur plusieurs phrases', "Deux propriétés du protocole sont présentées.", 'Il simplifie aussi', "Variez la reprise sans introduire un nouveau référent ambigu."],
      ['Thèmes dérivés', 'hyperthème + sous-thèmes', "Le dispositif comporte deux volets. La formation vise les équipes; l'audit concerne les procédures.", 'des sous-thèmes issus d’un cadre commun', "Les deux volets du dispositif sont détaillés.", 'La formation', "Annoncez l'hyperthème avant d'ouvrir les branches."],
    ],
  },
  {
    slug: 'clivees-pseudo-clivees-c2', order: '16', category: 'Structure de l’information', shortTitle: 'Les clivées et pseudo-clivées',
    description: "Réglez focus, présupposition et contraste grâce aux structures clivées et pseudo-clivées.", purpose: "placer précisément la nouveauté informationnelle", register: 'oral expert, argumentation et prose travaillée',
    formula: "c'est X qui/que | ce qui/que X, c'est Y", model: "Ce qui fragilise l'étude, c'est moins sa taille que son échantillonnage.",
    patterns: [
      ['Clivée corrective', "c'est X qui/que, pas Y", "C'est l'échantillonnage qui pose problème, pas la taille.", 'une correction contrastive du focus', "Le problème vient de l'échantillonnage.", "C'est l'échantillonnage qui", "Le contenu hors focus est présenté comme présupposé; vérifiez qu'il est partagé."],
      ['Pseudo-clivée', "ce qui + proposition, c'est + focus", "Ce qui fragilise l'étude, c'est son échantillonnage.", 'un focus final préparé par une variable ouverte', "Son échantillonnage fragilise l'étude.", "c'est son échantillonnage", "Accordez la copule selon la norme et le type de focus."],
      ['Contraste scalaire', "c'est moins X que Y", "Ce qui compte, c'est moins la vitesse que la fiabilité.", 'une hiérarchie entre deux critères', "La fiabilité compte davantage que la vitesse.", "moins la vitesse que", "La structure n'annule pas forcément X; elle le subordonne à Y."],
    ],
  },
  {
    slug: 'dislocation-gauche-droite-c2', order: '17', category: 'Structure de l’information', shortTitle: 'La dislocation à gauche et à droite',
    description: "Exploitez les dislocations pour introduire un thème, réparer une référence ou créer un effet de voix.", purpose: "maîtriser la segmentation entre oralité et prose stylisée", register: 'conversation, littérature et discours public',
    formula: 'segment détaché + reprise pronominale | pronom + segment final', model: "Ce résultat, il faut encore l'interpréter.",
    patterns: [
      ['Cadre thématique', 'groupe à gauche, pronom', "Ce résultat, il faut encore l'interpréter.", 'un objet posé avant le commentaire', "Il faut encore interpréter ce résultat.", "Ce résultat, il faut", "La reprise l' doit correspondre à la fonction de l'objet détaché."],
      ['Rappel final', 'pronom + groupe à droite', "Il faudra la revoir, cette conclusion.", 'un référent précisé après coup', "Cette conclusion devra être revue.", 'cette conclusion', "Contrôlez l'effet oral de la dislocation à droite."],
      ['Thème sans fonction', 'quant à + groupe', "Quant à la seconde hypothèse, les données restent insuffisantes.", 'un domaine thématique sans reprise syntaxique obligatoire', "Les données de la seconde hypothèse sont insuffisantes.", 'Quant à la seconde hypothèse', "Quant à n'attribue pas automatiquement une fonction au groupe dans la proposition."],
    ],
  },
  {
    slug: 'inversion-syntaxique-c2', order: '18', category: 'Architecture syntaxique', shortTitle: 'L’inversion syntaxique',
    description: "Employez inversion interrogative, narrative, locative ou conditionnelle en fonction du registre et du focus.", purpose: "produire un ordre marqué sans sacrifier la lisibilité", register: 'prose soutenue, presse et discours',
    formula: 'élément initial marqué + verbe + sujet', model: "À peine la séance avait-elle commencé qu'un incident survint.",
    patterns: [
      ['Inversion après adverbe', 'à peine + auxiliaire-sujet', "À peine la séance avait-elle commencé qu'un incident survint.", 'une succession immédiate avec focus initial', "Un incident survint presque dès le début.", 'avait-elle commencé', "Ajoutez le pronom de reprise si le sujet nominal précède le verbe."],
      ['Inversion locative', 'complément de lieu + verbe + sujet nominal', "Au fond de la salle se tenait un observateur silencieux.", 'une apparition organisée depuis le cadre spatial', "Un observateur se tenait au fond de la salle.", 'se tenait un observateur', "Cette inversion accepte mieux un sujet nominal qu'un pronom."],
      ['Inversion conditionnelle', 'auxiliaire-sujet + conséquence', "Aurait-il insisté, la réponse aurait été la même.", 'une condition irréelle au registre soutenu', "S'il avait insisté, rien n'aurait changé.", 'Aurait-il insisté', "Ne cumulez pas si et l'inversion conditionnelle."],
    ],
  },
  {
    slug: 'anaphore-cataphore-c2', order: '19', category: 'Cohésion et référence', shortTitle: 'L’anaphore et la cataphore',
    description: "Construisez des reprises vers l'arrière ou des annonces vers l'avant dont le référent reste univoque.", purpose: "orchestrer attente, continuité et interprétation", register: 'essai, récit et discours public',
    formula: 'expression référentielle ↔ antécédent ou postcédent identifiable', model: "Une chose demeure certaine : les données doivent être vérifiées.",
    patterns: [
      ['Anaphore résomptive', 'ce constat/cette évolution', "Les écarts diminuent depuis juin. Cette évolution reste fragile.", 'une proposition antérieure recatégorisée', "La diminution récente reste fragile.", 'Cette évolution', "Le nom résomptif doit refléter le sens, non l'altérer."],
      ['Cataphore explicative', 'nom général : contenu annoncé', "Une chose demeure certaine : les données doivent être vérifiées.", 'un référent vague précisé après les deux-points', "La vérification des données est certaine.", 'Une chose demeure certaine', "Le segment annoncé doit remplir la place ouverte par le nom général."],
      ['Cataphore pronominale', 'le voici : contenu', "Le principal risque, le voici : confondre corrélation et causalité.", 'un focus retardé puis révélé', "Le principal risque est la confusion entre deux relations.", 'le voici', "Réservez ce dispositif à un effet rhétorique assumé."],
    ],
  },
  {
    slug: 'ellipse-substitution-c2', order: '20', category: 'Cohésion et référence', shortTitle: 'L’ellipse et la substitution avancées',
    description: "Évaluez jusqu'où un élément peut être omis ou remplacé sans affaiblir le parallélisme.", purpose: "obtenir concision, rythme et contraste contrôlés", register: 'essai, dialogue et littérature',
    formula: 'structure source + élément récupérable omis ou substitué', model: "Les uns réclamaient un audit; les autres, une médiation.",
    patterns: [
      ['Gapping', 'sujet + complément sans verbe', "Les uns réclamaient un audit; les autres, une médiation.", 'un verbe partagé entre deux membres parallèles', "Les autres réclamaient une médiation.", 'les autres, une médiation', "L'ordre des compléments doit permettre de reconstruire sans hésitation."],
      ['Substitution propositionnelle', 'le faire / en faire autant', "L'équipe a publié ses données; le laboratoire devrait en faire autant.", 'une action complète reprise sans répétition', "Le laboratoire devrait aussi publier ses données.", 'en faire autant', "Vérifiez que les participants et compléments transposés restent compatibles."],
      ['Ellipse comparative', 'plus que prévu/attendu', "La révision a pris plus de temps que prévu.", 'une proposition évaluative réduite', "La révision a dépassé le temps qu'on avait prévu.", 'que prévu', "L'accord du participe elliptique dépend du terme sous-entendu."],
    ],
  },
  {
    slug: 'parallelisme-chiasme-c2', order: '21', category: 'Rhétorique syntaxique', shortTitle: 'Le parallélisme et le chiasme',
    description: "Construisez symétrie ou croisement syntaxique pour clarifier une opposition et produire un effet mémorable.", purpose: "mettre la forme au service d'une relation argumentative", register: 'discours, essai et littérature',
    formula: 'A-B / A-B = parallélisme | A-B / B-A = chiasme', model: "Il faut apprendre pour comprendre et comprendre pour agir.",
    patterns: [
      ['Parallélisme', 'même structure répétée', "Nous devons vérifier les sources, comparer les données et expliciter les limites.", 'trois actions présentées au même niveau', "Trois obligations méthodologiques sont coordonnées.", 'vérifier les sources', "Parallélisez les catégories grammaticales de chaque membre."],
      ['Chiasme', 'A-B puis B-A', "Il faut apprendre pour comprendre et comprendre pour agir.", 'une progression en miroir', "L'apprentissage mène à la compréhension, puis à l'action.", 'comprendre et comprendre', "Le croisement doit éclairer le sens, non servir d'ornement vide."],
      ['Antithèse parallèle', 'non X mais Y / non Y mais X', "La méthode n'est pas complexe parce qu'elle est précise; elle est précise parce qu'elle distingue les cas.", 'une relation causale corrigée par symétrie', "La précision vient des distinctions, non de la complexité.", 'elle est précise parce', "Vérifiez que les deux membres portent réellement sur les mêmes termes."],
    ],
  },
  {
    slug: 'coordination-asymetrie-c2', order: '22', category: 'Architecture syntaxique', shortTitle: 'La coordination et l’asymétrie',
    description: "Coordonnez des unités de statut compatible ou exploitez consciemment une asymétrie interprétable.", purpose: "éviter les zeugmes fautifs et construire des raccourcis maîtrisés", register: 'édition, humour et prose travaillée',
    formula: 'coordonnants + fonctions compatibles ou asymétrie motivée', model: "Elle a quitté la réunion et, avec elle, toute possibilité d'accord.",
    patterns: [
      ['Coordination symétrique', 'deux groupes de même fonction', "Le rapport décrit les causes et évalue leurs conséquences.", 'deux prédicats partageant le même sujet', "Le rapport accomplit deux opérations parallèles.", 'décrit les causes et évalue', "Chaque verbe doit accepter ses propres compléments."],
      ['Asymétrie expressive', 'coordination avec ellipse interprétable', "Elle a quitté la réunion et, avec elle, toute possibilité d'accord.", 'un départ concret coordonné à sa conséquence abstraite', "Son départ a supprimé la possibilité d'accord.", 'et, avec elle,', "Réservez l'asymétrie aux contextes où le lien rhétorique est évident."],
      ['Zeugme à réparer', 'répétition du verbe nécessaire', "Il a pris la parole puis a pris connaissance du rapport.", 'deux emplois lexicaux distingués par répétition', "Il s'est exprimé puis a lu le rapport.", 'puis a pris', "Ne coordonnez pas sous un seul verbe des sens incompatibles sans effet voulu."],
    ],
  },
  {
    slug: 'concession-condition-composees-c2', order: '23', category: 'Relations logiques', shortTitle: 'La concession et la condition composées',
    description: "Combinez plusieurs réserves ou conditions en conservant leur portée et leur hiérarchie.", purpose: "raisonner sur des contraintes imbriquées sans perdre la conclusion", register: 'droit, négociation et analyse',
    formula: 'cadre conditionnel + concession interne + conséquence', model: "À supposer même que les coûts baissent, encore faudrait-il que la qualité se maintienne.",
    patterns: [
      ['Hypothèse concédée', 'à supposer même que + subjonctif', "À supposer même que les coûts baissent, le délai resterait excessif.", 'une hypothèse accordée sans modifier la conclusion', "Même si les coûts baissaient, le délai poserait problème.", 'À supposer même que', "Le subjonctif présente l'hypothèse comme envisagée, non validée."],
      ['Condition supplémentaire', 'encore faudrait-il que + subjonctif', "Les coûts pourraient baisser; encore faudrait-il que la qualité se maintienne.", 'une exigence additionnelle décisive', "La baisse ne suffit pas sans maintien de la qualité.", 'encore faudrait-il que', "L'inversion et le conditionnel construisent ici une réserve argumentative."],
      ['Concession corrélative', 'pour autant que + subjonctif', "La réforme est acceptable, pour autant qu'elle protège les plus fragiles.", 'une acceptation limitée par une condition', "La protection des plus fragiles conditionne l'accord.", "pour autant qu'elle protège", "Distinguez pour autant que conditionnel de pour autant concessif entre propositions."],
    ],
  },
  {
    slug: 'comparaison-gradation-c2', order: '24', category: 'Comparaison et quantité', shortTitle: 'La comparaison et la gradation',
    description: "Exprimez proportion, corrélation, intensification et limite avec des structures complexes.", purpose: "mesurer précisément une différence ou une évolution", register: 'analyse de données, critique et description',
    formula: 'comparatif + modificateur + terme et domaine comparés', model: "Plus les critères se précisent, d'autant moins l'arbitraire est possible.",
    patterns: [
      ['Corrélation', 'plus... plus/moins...', "Plus les critères se précisent, moins l'arbitraire est possible.", 'deux variations liées en sens inverse', "La précision réduit l'arbitraire.", 'Plus les critères', "Maintenez le parallélisme des deux segments."],
      ['Renforcement motivé', "d'autant plus... que", "Cette prudence est d'autant plus nécessaire que les données sont rares.", 'un degré renforcé par une cause', "La rareté des données renforce la nécessité de prudence.", "d'autant plus nécessaire", "Le second membre doit expliquer le renforcement."],
      ['Limite scalaire', 'tout au plus / à peine', "Le résultat constitue tout au plus un indice, à peine une preuve.", 'un classement bas sur une échelle probante', "Le résultat ne dépasse pas le statut d'indice.", 'tout au plus', "Choisissez l'échelle implicite que le lecteur peut reconstruire."],
    ],
  },
  {
    slug: 'portee-negation-c2', order: '25', category: 'Négation et portée', shortTitle: 'La portée de la négation',
    description: "Distinguez négation de phrase, de constituant, restrictive et métalinguistique.", purpose: "indiquer exactement ce qui est refusé, limité ou corrigé", register: 'argumentation, droit et analyse critique',
    formula: 'position de ne...pas/que + constituant focalisé', model: "Je ne conteste pas les données, mais l'interprétation qu'on en donne.",
    patterns: [
      ['Négation de constituant', 'ne... pas X, mais Y', "Je ne conteste pas les données, mais l'interprétation qu'on en donne.", 'la correction d’un seul constituant', "Les données sont admises; leur lecture est contestée.", 'pas les données', "Le contraste doit rendre claire la portée étroite de pas."],
      ['Restriction', 'ne... que', "L'étude ne porte que sur les adultes.", 'une limitation du domaine, non une absence', "L'étude porte uniquement sur les adultes.", 'ne porte que', "Ne que est restrictif et n'exprime pas une négation totale."],
      ['Négation métalinguistique', 'non pas X mais Y', "Il n'est pas peu probable; il est presque certain.", 'le rejet d’une formulation plutôt que du fait', "La probabilité est corrigée vers un degré supérieur.", "n'est pas peu probable", "Évitez les doubles négations si l'effet de correction n'est pas utile."],
    ],
  },
  {
    slug: 'determination-reference-c2', order: '26', category: 'Détermination et référence', shortTitle: 'La détermination et la référence',
    description: "Choisissez article, démonstratif, indéfini ou absence de déterminant selon accessibilité et type de référence.", purpose: "construire des référents nouveaux, repris, génériques ou contrastifs", register: 'tout discours élaboré',
    formula: 'statut référentiel + déterminant + nom + expansion éventuelle', model: "Une hypothèse a émergé; cette hypothèse doit maintenant être testée.",
    patterns: [
      ['Introduction', 'article indéfini', "Une hypothèse a émergé au cours de l'analyse.", 'un nouveau référent introduit dans le discours', "L'analyse a fait apparaître une hypothèse.", 'Une hypothèse', "L'indéfini n'implique pas que le référent soit inconnu du locuteur."],
      ['Reprise', 'démonstratif + nom', "Cette hypothèse doit maintenant être testée.", 'le référent précédent rendu accessible', "L'hypothèse introduite doit être testée.", 'Cette hypothèse', "Le démonstratif doit avoir un antécédent clair ou une valeur déictique visible."],
      ['Générique', 'article défini + classe', "Le doute méthodique protège l'analyse contre les conclusions hâtives.", 'une propriété attribuée à une notion générale', "Douter méthodiquement protège toute analyse.", 'Le doute méthodique', "Distinguez lecture générique et référent particulier déjà connu."],
    ],
  },
  {
    slug: 'prepositions-nuance-semantique-c2', order: '27', category: 'Régime et relation', shortTitle: 'Les prépositions et la nuance sémantique',
    description: "Comparez des prépositions proches dont le choix modifie point de vue, cause, agent ou domaine.", purpose: "sélectionner la relation conceptuelle exacte", register: 'écrit expert et traduction avancée',
    formula: 'terme régissant + préposition + relation sémantique', model: "La décision a été prise au regard des risques, non sous leur effet immédiat.",
    patterns: [
      ['Critère', 'au regard de', "La décision a été prise au regard des risques identifiés.", 'les risques comme critère d’évaluation', "La décision tient compte des risques.", 'au regard des risques', "Ne confondez pas au regard de avec à cause de."],
      ['Point de vue', 'du point de vue de', "Du point de vue juridique, la clause reste contestable.", 'un domaine qui cadre l’évaluation', "Juridiquement, la clause est contestable.", 'Du point de vue juridique', "Le groupe ne doit pas être interprété comme une source humaine s'il désigne un domaine."],
      ['Cause déclenchante', 'sous l’effet de', "Le matériau se dilate sous l'effet de la chaleur.", 'une force causale qui agit directement', "La chaleur provoque la dilatation.", "sous l'effet de", "Réservez le tour aux causes conçues comme forces agissantes."],
    ],
  },
  {
    slug: 'variation-registre-c2', order: '28', category: 'Registre et variation', shortTitle: 'La variation de registre',
    description: "Transposez une même relation du familier au neutre ou au soutenu sans changer le contenu propositionnel.", purpose: "adapter syntaxe, lexique et densité au genre et au destinataire", register: 'interaction, rédaction et médiation',
    formula: 'même sens + choix syntaxiques et lexicaux adaptés', model: "Faute d'éléments suffisants, il convient de différer la décision.",
    patterns: [
      ['Neutre', 'parce que / devoir + infinitif', "Nous devons reporter la décision parce que les données manquent.", 'une formulation explicite et accessible', "Le manque de données impose un report.", 'Nous devons reporter', "Le neutre n'est pas relâché; il privilégie la transparence."],
      ['Soutenu', 'faute de + nom, il convient de', "Faute d'éléments suffisants, il convient de différer la décision.", 'une formulation institutionnelle condensée', "Les données insuffisantes justifient le report.", "il convient de différer", "N'accumulez pas les tours impersonnels si la responsabilité doit être nommée."],
      ['Familier contrôlé', 'on + expression courante', "On n'a pas assez d'éléments, alors mieux vaut attendre.", 'une décision formulée dans l’interaction courante', "Il vaut mieux attendre faute de données.", 'mieux vaut attendre', "Réservez cette version aux situations où la proximité avec le destinataire est appropriée."],
    ],
  },
  {
    slug: 'reformulation-ambiguite-c2', order: '29', category: 'Contrôle éditorial', shortTitle: 'La reformulation et l’ambiguïté',
    description: "Diagnostiquez ambiguïtés lexicales, référentielles, structurelles et de portée, puis réécrivez sans appauvrir.", purpose: "garantir une interprétation précise dans les textes à enjeu", register: 'édition, droit, science et communication publique',
    formula: 'diagnostic de l’ambiguïté → explicitation minimale → contrôle du sens', model: "Le comité a refusé la proposition après son examen par les experts.",
    patterns: [
      ['Agent explicité', 'nom d’action + par + agent', "Le comité a refusé la proposition après son examen par les experts.", 'les experts comme agents de l’examen', "Les experts ont examiné la proposition, puis le comité l'a refusée.", 'par les experts', "Si son peut reprendre plusieurs noms, nommez l'objet et l'agent."],
      ['Portée clarifiée', 'placer seulement près du focus', "Le comité a seulement reporté le vote; il ne l'a pas annulé.", 'le report, et non un autre acte, comme focus restrictif', "Seul l'acte de reporter est affirmé.", 'a seulement reporté', "Déplacez seulement pour tester les lectures possibles."],
      ['Attachement réparé', 'deux phrases ou relative déplacée', "Nous avons interrogé la responsable. Elle portait le dossier rouge.", 'le référent humain rendu univoque', "La responsable au dossier rouge a été interrogée.", 'Elle portait', "Scindez la phrase si le déplacement d'une relative ne suffit pas."],
    ],
  },
  {
    slug: 'ponctuation-rythme-discours-c2', order: '30', category: 'Contrôle éditorial', shortTitle: 'La ponctuation, le rythme et le discours',
    description: "Réglez longueur, souffle et hiérarchie grâce aux signes de ponctuation sans substituer le rythme à la syntaxe.", purpose: "faire coïncider architecture logique et expérience de lecture", register: 'essai, discours et prose littéraire',
    formula: 'unité syntaxique + relation logique + cadence choisie', model: "Une certitude demeure — fragile, mais décisive : il faut vérifier.",
    patterns: [
      ['Deux-points conclusif', 'cadre : conclusion', "Tout converge vers une exigence : il faut vérifier les sources.", 'une conclusion annoncée par le premier segment', "La convergence impose la vérification.", ': il faut vérifier', "La relation doit être explicative ou conclusive, non simplement successive."],
      ['Tiret de relance', 'proposition — segment focal', "Une certitude demeure — fragile, mais décisive.", 'une précision finale mise en relief', "Une certitude fragile mais décisive demeure.", '— fragile, mais décisive', "Le tiret crée une rupture plus forte que la virgule; utilisez-la comme effet de sens."],
      ['Point-virgule structurant', 'proposition ; proposition parallèle', "Les données décrivent le passé; les scénarios explorent l'avenir.", 'deux unités autonomes mises en parallèle', "Données et scénarios portent sur deux temps différents.", '; les scénarios', "Le point-virgule relie des unités proches sans les subordonner."],
    ],
  },
]

export const c2CurriculumTopics = specs.map((value, index) => topic(seed(value, index)))
