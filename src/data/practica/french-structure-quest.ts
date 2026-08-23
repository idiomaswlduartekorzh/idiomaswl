import { createStructureQuest, type FinalRow, type StructureSeed } from './create-structure-quest.ts'

export const FRENCH_FORMS = [
  { id: 'present', label: 'Présent', group: 'Présent' },
  { id: 'passe-compose', label: 'Passé composé', group: 'Passé' },
  { id: 'imparfait', label: 'Imparfait', group: 'Passé' },
  { id: 'plus-que-parfait', label: 'Plus-que-parfait', group: 'Passé' },
  { id: 'passe-simple', label: 'Passé simple', group: 'Passé littéraire' },
  { id: 'futur-proche', label: 'Futur proche', group: 'Futur' },
  { id: 'futur-simple', label: 'Futur simple', group: 'Futur' },
  { id: 'futur-anterieur', label: 'Futur antérieur', group: 'Futur' },
  { id: 'conditionnel-present', label: 'Conditionnel présent', group: 'Conditionnel' },
  { id: 'conditionnel-passe', label: 'Conditionnel passé', group: 'Conditionnel' },
] as const

export type FrenchFormId = (typeof FRENCH_FORMS)[number]['id']

const SEEDS: StructureSeed<FrenchFormId>[] = [
  { id: 'present', explanation: 'Le présent exprime une habitude, un fait actuel ou un horaire fixé.', examples: [
    { context: 'Chaque matin, Léa ___ le métro à huit heures.', answer: 'prend', wrong: 'prends', lemma: 'prendre', cue: 'habitude actuelle', distractors: ['a pris', 'prenait', 'prendra'] },
    { context: 'En ce moment, nous ___ chez nos cousins.', answer: 'habitons', wrong: 'habite', lemma: 'habiter', cue: 'situation actuelle', distractors: ['avons habité', 'habitions', 'habiterons'] },
    { context: 'Le musée ___ à dix heures tous les jours.', answer: 'ouvre', wrong: 'ouvriraient', lemma: 'ouvrir', cue: 'horaire habituel', distractors: ['a ouvert', 'ouvrait', 'ouvrira'] },
  ] },
  { id: 'passe-compose', explanation: 'Le passé composé présente un événement achevé et délimité, souvent lié au récit oral.', examples: [
    { context: 'Hier, nous ___ le dossier avant midi.', answer: 'avons envoyé', wrong: 'avons envoyer', lemma: 'envoyer', cue: 'action achevée hier', distractors: ['envoyions', 'avions envoyé', 'enverrons'] },
    { context: 'Camille ___ à Lyon samedi dernier.', answer: 'est arrivée', wrong: 'a arrivée', lemma: 'arriver', cue: 'déplacement achevé avec être', distractors: ['arrivait', 'était arrivée', 'arrivera'] },
    { context: 'Tu ___ ce film trois fois cette semaine.', answer: 'as vu', wrong: 'a vu', lemma: 'voir', cue: 'bilan dans une période en cours', distractors: ['voyais', 'avais vu', 'verras'] },
  ] },
  { id: 'imparfait', explanation: 'L’imparfait installe une habitude, une description ou une action en cours dans le passé.', examples: [
    { context: 'Quand j’étais enfant, je ___ souvent chez ma grand-mère.', answer: 'dormais', wrong: 'dormait', lemma: 'dormir', cue: 'habitude passée', distractors: ['ai dormi', 'avais dormi', 'dormirai'] },
    { context: 'Il ___ et les rues étaient désertes.', answer: 'pleuvait', wrong: 'a plu', lemma: 'pleuvoir', cue: 'arrière-plan descriptif', distractors: ['avait plu', 'pleuvra', 'pleut'] },
    { context: 'À neuf heures, nous ___ encore quand Paul a appelé.', answer: 'travaillions', wrong: 'avons travaillé', lemma: 'travailler', cue: 'action en cours interrompue', distractors: ['avions travaillé', 'travaillerons', 'travaillons'] },
  ] },
  { id: 'plus-que-parfait', explanation: 'Le plus-que-parfait marque un fait déjà accompli avant un autre repère passé.', examples: [
    { context: 'Quand le train est parti, nous ___ nos places.', answer: 'avions déjà trouvé', wrong: 'avons déjà trouvé', lemma: 'déjà trouver', cue: 'antériorité dans le passé', distractors: ['trouvions déjà', 'trouverons déjà', 'aurons déjà trouvé'] },
    { context: 'Elle connaissait Rome parce qu’elle y ___.', answer: 'était déjà allée', wrong: 'avait déjà allée', lemma: 'déjà aller', cue: 'expérience antérieure', distractors: ['est déjà allée', 'allait déjà', 'ira déjà'] },
    { context: 'Ils ont pu entrer car Marc ___ la porte.', answer: 'avait laissé ouverte', wrong: 'a laissé ouverte', lemma: 'laisser ouverte', cue: 'cause antérieure', distractors: ['laissait ouverte', 'laissera ouverte', 'aurait laissé ouverte'] },
  ] },
  { id: 'passe-simple', explanation: 'Le passé simple appartient surtout au récit écrit et présente des actions achevées qui font avancer l’histoire.', examples: [
    { context: 'Le héros ___ la lettre et quitta la pièce.', answer: 'lut', wrong: 'lisait', lemma: 'lire', cue: 'événement ponctuel littéraire', distractors: ['a lu', 'avait lu', 'lira'] },
    { context: 'Soudain, les portes ___ devant la foule.', answer: "s'ouvrirent", wrong: "s'ouvraient", lemma: "s'ouvrir", cue: 'rupture dans un récit écrit', distractors: ['se sont ouvertes', "s'étaient ouvertes", "s'ouvriront"] },
    { context: 'Elle ___ son manteau, puis descendit l’escalier.', answer: 'prit', wrong: 'prenait', lemma: 'prendre', cue: 'suite narrative littéraire', distractors: ['a pris', 'avait pris', 'prendra'] },
  ] },
  { id: 'futur-proche', explanation: 'Aller au présent + infinitif annonce une intention ou un événement imminent.', examples: [
    { context: 'Regarde ces nuages : il ___.', answer: 'va pleuvoir', wrong: 'va pleut', lemma: 'pleuvoir', cue: 'prédiction fondée sur un indice', distractors: ['pleuvait', 'a plu', 'pleuvrait'] },
    { context: 'Nous avons les billets ; nous ___ vendredi.', answer: 'allons partir', wrong: 'allons partis', lemma: 'partir', cue: 'projet déjà décidé', distractors: ['partions', 'sommes partis', 'partirions'] },
    { context: 'Attention, le verre ___.', answer: 'va tomber', wrong: 'va tombé', lemma: 'tomber', cue: 'événement imminent', distractors: ['tombait', 'est tombé', 'tomberait'] },
  ] },
  { id: 'futur-simple', explanation: 'Le futur simple situe une prévision, une promesse ou un fait dans l’avenir.', examples: [
    { context: 'Demain, je te ___ après la réunion.', answer: 'rappellerai', wrong: 'rappelerai', lemma: 'rappeler', cue: 'promesse future', distractors: ['rappelle', 'ai rappelé', 'rappellerais'] },
    { context: 'Selon la météo, les températures ___ lundi.', answer: 'baisseront', wrong: 'baisserons', lemma: 'baisser', cue: 'prévision future', distractors: ['baissent', 'ont baissé', 'baisseraient'] },
    { context: 'Vous ___ les résultats la semaine prochaine.', answer: 'recevrez', wrong: 'receverez', lemma: 'recevoir', cue: 'fait futur daté', distractors: ['recevez', 'avez reçu', 'recevriez'] },
  ] },
  { id: 'futur-anterieur', explanation: 'Le futur antérieur présente un fait accompli avant une limite ou un autre moment futur.', examples: [
    { context: 'D’ici vendredi, nous ___ le rapport.', answer: 'aurons terminé', wrong: 'avons terminé', lemma: 'terminer', cue: 'accomplissement avant une échéance', distractors: ['terminerons', 'avions terminé', 'aurions terminé'] },
    { context: 'Quand tu arriveras, elle ___.', answer: 'sera déjà partie', wrong: 'aura déjà partie', lemma: 'déjà partir', cue: 'antériorité par rapport à un futur', distractors: ['partira déjà', 'était déjà partie', 'serait déjà partie'] },
    { context: 'À minuit, ils ___ toutes les données.', answer: 'auront sauvegardé', wrong: 'auront sauvegarder', lemma: 'sauvegarder', cue: 'bilan futur accompli', distractors: ['sauvegarderont', 'avaient sauvegardé', 'auraient sauvegardé'] },
  ] },
  { id: 'conditionnel-present', explanation: 'Le conditionnel présent exprime une conséquence hypothétique, un souhait ou une demande atténuée.', examples: [
    { context: 'Avec plus de temps, je ___ le musée.', answer: 'visiterais', wrong: 'visiterai', lemma: 'visiter', cue: 'conséquence hypothétique', distractors: ['visite', 'ai visité', 'avais visité'] },
    { context: 'Nous ___ réserver une table, s’il vous plaît.', answer: 'voudrions', wrong: 'voulons', lemma: 'vouloir', cue: 'demande polie', distractors: ['avons voulu', 'voudrons', 'aurions voulu'] },
    { context: 'À ta place, elle ___ cette offre.', answer: 'accepterait', wrong: 'acceptera', lemma: 'accepter', cue: 'conseil hypothétique', distractors: ['accepte', 'a accepté', 'aurait accepté'] },
  ] },
  { id: 'conditionnel-passe', explanation: 'Le conditionnel passé exprime une conséquence non réalisée ou une possibilité rapportée dans le passé.', examples: [
    { context: 'Avec ton adresse, je ___ la lettre hier.', answer: "aurais envoyé", wrong: "aurait envoyé", lemma: 'envoyer', cue: 'résultat passé non réalisé', distractors: ['envoyais', 'ai envoyé', 'enverrais'] },
    { context: 'Sans la panne, ils ___ à l’heure.', answer: 'seraient arrivés', wrong: 'auraient arrivés', lemma: 'arriver', cue: 'alternative irréelle passée', distractors: ['arrivaient', 'sont arrivés', 'arriveraient'] },
    { context: 'D’après la presse, la ministre ___ sa décision lundi.', answer: 'aurait annoncé', wrong: 'annoncerait', lemma: 'annoncer', cue: 'information passée non confirmée', distractors: ['annonçait', 'a annoncé', 'annoncera'] },
  ] },
]

const FINAL_ROWS: FinalRow<FrenchFormId>[] = [
  { formId: 'present', lemma: 'diriger', before: 'Aujourd’hui, Nora ', after: ' une petite galerie. ', answer: 'dirige' },
  { formId: 'passe-compose', lemma: 'recevoir', before: 'Ce matin, elle ', after: ' une œuvre rare. ', answer: 'a reçu' },
  { formId: 'imparfait', lemma: 'chercher', before: 'Depuis des mois, elle ', after: ' cette toile parce qu’un collectionneur la lui avait décrite. ', answer: 'cherchait' },
  { formId: 'plus-que-parfait', lemma: 'voir', before: 'Il l’', after: ' à Prague avant de disparaître. ', answer: 'avait vue' },
  { formId: 'passe-simple', lemma: 'comprendre', before: 'Dans son carnet, Nora lut une date et ', after: ' enfin le message. ', answer: 'comprit' },
  { formId: 'futur-proche', lemma: 'examiner', before: 'Elle ', after: ' la signature avec une experte. ', answer: 'va examiner' },
  { formId: 'futur-simple', lemma: 'publier', before: 'Ensuite, la galerie ', after: ' les résultats. ', answer: 'publiera' },
  { formId: 'futur-anterieur', lemma: 'identifier', before: 'D’ici vendredi, l’équipe ', after: ' le propriétaire. ', answer: 'aura identifié' },
  { formId: 'conditionnel-present', lemma: 'exposer', before: 'Si tout était légal, Nora ', after: ' la toile en septembre. ', answer: 'exposerait' },
  { formId: 'conditionnel-passe', lemma: 'refuser', before: 'Sans les documents, elle ', after: ' la livraison.', answer: 'aurait refusé' },
]

export const FRENCH_STRUCTURE_QUEST = createStructureQuest({
  id: 'french-structure-quest', storageKey: 'wl-french-structure-quest-v1', forms: FRENCH_FORMS,
  presets: [
    { label: 'Passé', ids: FRENCH_FORMS.filter((form) => form.group.startsWith('Passé')).map((form) => form.id) },
    { label: 'Futur', ids: FRENCH_FORMS.filter((form) => form.group === 'Futur').map((form) => form.id) },
    { label: 'Conditionnel', ids: FRENCH_FORMS.filter((form) => form.group === 'Conditionnel').map((form) => form.id) },
  ],
  seeds: SEEDS, finalRows: FINAL_ROWS,
  copy: {
    languageName: 'Francés', languageCode: 'fr', eyebrow: 'Quiz de temps et structures · A2–B2',
    title: 'Le laboratoire du récit', lead: 'Elige las formas que quieres contrastar y trabaja desde la identificación hasta una narración completa.',
    range: '10 formas', selectedLabel: 'formas seleccionadas', selectorTitle: '¿Qué formas del francés quieres practicar?',
    selectorLead: 'Incluye el passé simple como forma literaria: no se presenta como equivalente del pasado oral.',
    configuredEyebrow: 'Parcours personnalisé', levelsTitle: 'Seis niveles con corrección diferida',
    levelsLead: 'La solución aparece únicamente al terminar el nivel activo.', mapLabels: ['Avant', 'Passé', 'Maintenant', 'Avenir'],
    reviewLinks: [
      { href: '/practica/frances/a1/gramatica', label: 'Repasar gramática A1' },
      { href: '/practica/frances/a2/gramatica', label: 'Profundizar en A2' },
      { href: '/herramientas/quizes', label: 'Ver más quizes' },
    ],
  },
  text: { finalTitle: 'Le dossier de la galerie', finalExplanation: 'El expediente separa relato oral, trasfondo, anterioridad, registro literario, proyección y escenarios hipotéticos.' },
})
