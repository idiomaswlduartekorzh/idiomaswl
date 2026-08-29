import {
  createFrenchEditorialPack,
  type FrenchEditorialErrorSeed,
  type FrenchEditorialFinalSeed,
  type FrenchEditorialGapSeed,
  type FrenchEditorialMicroSeed,
  type FrenchEditorialSequenceSeed,
} from './french-editorial-builder.ts'

const micro: FrenchEditorialMicroSeed[] = [
  { title: 'La lettre non envoyée', cue: 'un résultat passé non réalisé', segments: ['Avec ton adresse, j’', ' la lettre hier, mais je ne l’avais pas.'], verb: 'envoyer', answers: ['aurais envoyé'], distractors: ['envoyais', 'ai envoyé', 'enverrais'] },
  { title: 'L’arrivée empêchée', cue: 'une alternative irréelle passée', segments: ['Sans la panne, elles ', ' à l’heure, mais leur train est resté bloqué.'], verb: 'arriver', answers: ['seraient arrivées'], distractors: ['arrivaient', 'sont arrivées', 'arriveraient'] },
  { title: 'L’annonce non confirmée', cue: 'une information passée rapportée avec réserve', segments: ['D’après la presse, sans confirmation officielle, la ministre ', ' sa décision lundi.'], verb: 'annoncer', answers: ['aurait annoncé'], distractors: ['annonçait', 'a annoncé', 'annoncerait'] },
  { title: 'Le train manqué', cue: 'une conséquence passée contraire aux faits', segments: ['Si tu étais parti plus tôt, tu ', ' le train, mais tu es arrivé après son départ.'], verb: 'prendre', answers: ['aurais pris'], distractors: ['prenais', 'as pris', 'prendrais'] },
  { title: 'La randonnée annulée', cue: 'un projet passé impossible', segments: ['Avec une meilleure météo, nous ', ' jusqu’au sommet, mais l’orage nous a arrêtés.'], verb: 'monter', answers: ['serions montés', 'serions montées'], distractors: ['montions', 'sommes montés', 'monterions'] },
  { title: 'Le rapport incomplet', cue: 'un résultat passé non accompli', segments: ['Avec les données manquantes, elle ', ' le rapport hier, mais personne ne les lui a envoyées.'], verb: 'finir', answers: ['aurait fini'], distractors: ['finissait', 'a fini', 'finirait'] },
  { title: 'Le transfert supposé', cue: 'une information passée non vérifiée', segments: ['Selon une source anonyme, sans preuve publiée, le joueur ', ' un accord vendredi.'], verb: 'signer', answers: ['aurait signé'], distractors: ['signait', 'a signé', 'signerait'] },
  { title: 'La sortie évitée', cue: 'une conséquence passée irréelle avec être', segments: ['Sans l’alarme, les enfants ', ' seuls, mais la gardienne les a retenus.'], verb: 'sortir', answers: ['seraient sortis'], distractors: ['sortaient', 'sont sortis', 'sortiraient'] },
  { title: 'L’erreur évitable', cue: 'un reproche sur un passé non réalisé', segments: ['Avec une relecture, vous ', ' cette erreur, mais le texte est parti sans contrôle.'], verb: 'éviter', answers: ['auriez évité'], distractors: ['évitiez', 'avez évité', 'éviteriez'] },
  { title: 'La découverte présumée', cue: 'une découverte passée rapportée avec prudence', segments: ['D’après le journal local, sans rapport public, des plongeurs ', ' l’épave mardi.'], verb: 'retrouver', answers: ['auraient retrouvé'], distractors: ['retrouvaient', 'ont retrouvé', 'retrouveraient'] },
]

const long: FrenchEditorialGapSeed[] = [
  { title: 'Le voyage empêché', instruction: 'Complète les conséquences passées qui ne se sont pas réalisées.', segments: ['Sans la grève, nous ', ' vendredi. Léa ', ' le train de midi et ses amis l’', ' à la gare, mais aucun train n’a circulé.'], entries: [['partir', ['serions partis', 'serions parties']], ['prendre', ['aurait pris']], ['attendre', ['auraient attendue']]] },
  { title: 'Le projet sans financement', instruction: 'Complète ce bilan contrafactuel.', segments: ['Avec le financement demandé, l’association ', ' le local. Elle ', ' trois salariés et cinquante familles ', ' le service, mais la subvention a été refusée.'], entries: [['rénover', ['aurait rénové']], ['embaucher', ['aurait embauché']], ['utiliser', ['auraient utilisé']]] },
  { title: 'La course sous la pluie', instruction: 'Complète ces résultats passés irréels.', segments: ['Sans l’orage, les coureuses ', ' la course. Nora ', ' son record et l’équipe ', ' le trophée, mais l’épreuve a été annulée.'], entries: [['terminer', ['auraient terminé']], ['battre', ['aurait battu']], ['gagner', ['aurait gagné']]] },
  { title: 'Le dîner manqué', instruction: 'Complète cette autre version du passé.', segments: ['Avec ton message, je ', ' plus tôt. Nous ', ' une table et vous nous ', ' au restaurant, mais le message n’est jamais arrivé.'], entries: [['venir', ['serais venu', 'serais venue']], ['réserver', ['aurions réservé']], ['retrouver', ['auriez retrouvés', 'auriez retrouvées']]] },
  { title: 'La panne évitable', instruction: 'Complète les conséquences non réalisées.', segments: ['Avec une inspection lundi, le technicien ', ' le câble. Il l’', ' avant la rupture et l’usine ', ' sans interruption, mais le contrôle a été reporté.'], entries: [['repérer', ['aurait repéré']], ['remplacer', ['aurait remplacé']], ['fonctionner', ['aurait fonctionné']]] },
  { title: 'Le sauvetage impossible', instruction: 'Complète cette hypothèse passée.', segments: ['Avec un bateau plus rapide, les secours ', ' avant la nuit. Ils ', ' la zone entière et les marins ', ' au port, mais la mer était impraticable.'], entries: [['arriver', ['seraient arrivés']], ['explorer', ['auraient exploré']], ['revenir', ['seraient revenus']]] },
  { title: 'La publication supposée', instruction: 'Complète ces informations non confirmées.', segments: ['Selon plusieurs blogs, sans communiqué officiel, la chercheuse ', ' l’étude jeudi. Son équipe ', ' les données et une revue étrangère ', ' l’article.'], entries: [['publier', ['aurait publié']], ['partager', ['aurait partagé']], ['accepter', ['aurait accepté']]] },
  { title: 'La maison non achetée', instruction: 'Complète ce passé alternatif.', segments: ['Avec un prêt moins cher, nous ', ' la maison. Nous ', ' la toiture et les enfants ', ' dans ce quartier, mais la banque a refusé.'], entries: [['acheter', ['aurions acheté']], ['réparer', ['aurions réparé']], ['grandir', ['auraient grandi']]] },
  { title: 'Le spectacle annulé', instruction: 'Complète les événements qui auraient pu avoir lieu.', segments: ['Sans la panne électrique, le rideau ', ' à vingt heures. Les acteurs ', ' la pièce et le public ', ' jusqu’à la fin, mais la salle est restée fermée.'], entries: [['se lever', ['se serait levé']], ['jouer', ['auraient joué']], ['rester', ['serait resté']]] },
  { title: 'L’expédition présumée', instruction: 'Complète ce récit rapporté sans preuve publique.', segments: ['D’après un témoin, sans confirmation des autorités, l’équipe ', ' le camp mardi. Elle ', ' le col mercredi et deux membres ', ' au village jeudi.'], entries: [['quitter', ['aurait quitté']], ['atteindre', ['aurait atteint']], ['revenir', ['seraient revenus']]] },
]

const errors: FrenchEditorialErrorSeed[] = [
  { title: 'Le voyage qui n’a pas eu lieu', pieces: [['Sans la grève, nous ', 'serait partis'], [' vendredi. Léa ', 'aurait pris'], [' le train et ses amis l’', 'auraient attendue']], after: ', mais aucun train n’a circulé.', wrong: 0, answers: ['serions partis'], reason: 'Le sujet « nous » exige « serions partis ».' },
  { title: 'Le projet refusé', pieces: [['L’association ', 'aurait rénové'], [' le local, ', 'aurait embauché'], [' trois salariés et les familles ', 'aurait utilisé']], after: ' le service.', wrong: 2, answers: ['auraient utilisé'], reason: 'Le sujet pluriel « les familles » exige « auraient utilisé ».' },
  { title: 'La course annulée', pieces: [['Les coureuses ', 'auraient terminé'], [' la course. Nora ', 'aurait battu'], [' son record et l’équipe ', 'auront gagné']], after: ' le trophée.', wrong: 2, answers: ['aurait gagné'], reason: 'Le résultat est irréel et le sujet collectif est singulier.' },
  { title: 'Le message de Claire jamais reçu', pieces: [['Moi, Claire, je ', 'serais venu'], [' plus tôt. Nous ', 'aurions réservé'], [' une table et vous nous ', 'auriez retrouvés']], after: ' au restaurant.', wrong: 0, answers: ['serais venue'], reason: 'Le prénom Claire rend visible un référent féminin ; avec être, le participe s’accorde.' },
  { title: 'Le contrôle reporté', pieces: [['Le technicien ', 'aurait repéré'], [' le câble, l’', 'aurait remplacer'], [' et l’usine ', 'aurait fonctionné']], after: ' normalement.', wrong: 1, answers: ['aurait remplacé'], reason: 'Le conditionnel passé exige le participe « remplacé ».' },
  { title: 'La mer impraticable', pieces: [['Les secours ', 'auraient arrivé'], [' avant la nuit, ', 'auraient exploré'], [' la zone et les marins ', 'seraient revenus']], after: '.', wrong: 0, answers: ['seraient arrivés'], reason: '« Arriver » se construit avec être et s’accorde au pluriel.' },
  { title: 'La publication non confirmée', pieces: [['La chercheuse ', 'aurait publié'], [' l’étude. Son équipe ', 'aurait partagé'], [' les données et une revue ', 'auraient accepté']], after: ' l’article.', wrong: 2, answers: ['aurait accepté'], reason: 'Le sujet singulier « une revue » exige « aurait accepté ».' },
  { title: 'Le prêt refusé', pieces: [['Nous ', 'aurions acheté'], [' la maison, ', 'aurions réparé'], [' la toiture et les enfants ', 'aurait grandi']], after: ' ici.', wrong: 2, answers: ['auraient grandi'], reason: 'Le sujet pluriel « les enfants » exige « auraient grandi ».' },
  { title: 'Le spectacle annulé', pieces: [['Le rideau ', 'se serait levé'], [' à huit heures. Les acteurs ', 'auraient joués'], [' et le public ', 'serait resté']], after: '.', wrong: 1, answers: ['auraient joué'], reason: 'Avec avoir et sans objet antéposé, « joué » ne s’accorde pas avec le sujet.' },
  { title: 'L’expédition supposée', pieces: [['L’équipe ', 'aurait quitté'], [' le camp, ', 'aurait atteinte'], [' le col et deux membres ', 'seraient revenus']], after: '.', wrong: 1, answers: ['aurait atteint'], reason: 'Avec avoir et sans objet antéposé, le participe reste « atteint ».' },
]

const sequences: FrenchEditorialSequenceSeed[] = [
  { events: ['Nous serions partis vendredi', 'Léa aurait pris le train', 'Ses amis l’auraient attendue'], target: 0 },
  { events: ['L’association aurait rénové le local', 'Elle aurait embauché trois salariés', 'Les familles auraient utilisé le service'], target: 1 },
  { events: ['Les coureuses auraient terminé', 'Nora aurait battu son record', 'L’équipe aurait gagné le trophée'], target: 2 },
  { events: ['Je serais venue plus tôt', 'Nous aurions réservé une table', 'Vous nous auriez retrouvés'], target: 0 },
  { events: ['Le technicien aurait repéré le câble', 'Il l’aurait remplacé', 'L’usine aurait fonctionné'], target: 1 },
  { events: ['Les secours seraient arrivés', 'Ils auraient exploré la zone', 'Les marins seraient revenus'], target: 2 },
  { events: ['La chercheuse aurait publié l’étude', 'Son équipe aurait partagé les données', 'Une revue aurait accepté l’article'], target: 0 },
  { events: ['Nous aurions acheté la maison', 'Nous aurions réparé la toiture', 'Les enfants auraient grandi ici'], target: 1 },
  { events: ['Le rideau se serait levé', 'Les acteurs auraient joué', 'Le public serait resté'], target: 2 },
  { events: ['L’équipe aurait quitté le camp', 'Elle aurait atteint le col', 'Deux membres seraient revenus'], target: 0 },
]

const final: FrenchEditorialFinalSeed[] = [
  { before: 'Avec le bon code, j’', after: ' le document hier, mais je ne l’avais pas.', answer: 'aurais ouvert', distractors: ['ouvrais', 'ai ouvert', 'ouvrirais'] },
  { before: 'Sans le brouillard, les avions ', after: ' à l’heure, mais la piste est restée fermée.', answer: 'seraient partis', distractors: ['partaient', 'sont partis', 'partiraient'] },
  { before: 'Selon la presse, sans annonce officielle, le groupe ', after: ' son contrat lundi.', answer: 'aurait signé', distractors: ['signait', 'a signé', 'signerait'] },
  { before: 'Si nous avions réservé, nous ', after: ' près de la scène, mais tout était complet.', answer: 'aurions dîné', distractors: ['dînions', 'avons dîné', 'dînerions'] },
  { before: 'Avec votre aide, elle ', after: ' avant minuit, mais elle est restée bloquée.', answer: 'serait rentrée', distractors: ['rentrait', 'est rentrée', 'rentrerait'] },
  { before: 'Sans cette erreur, tu ', after: ' le concours, mais le dossier a été rejeté.', answer: 'aurais réussi', distractors: ['réussissais', 'as réussi', 'réussirais'] },
  { before: 'D’après un témoin, sans rapport public, les chercheurs ', after: ' le site mardi.', answer: 'auraient quitté', distractors: ['quittaient', 'ont quitté', 'quitteraient'] },
  { before: 'Avec un billet valide, vous, Paul et Marc, ', after: ' dans la salle, mais l’accès vous a été refusé.', answer: 'seriez entrés', distractors: ['entriez', 'êtes entrés', 'entreriez'] },
  { before: 'Si le serveur avait répondu, nous ', after: ' la commande hier.', answer: 'aurions confirmé', distractors: ['confirmions', 'avons confirmé', 'confirmerions'] },
  { before: 'Selon le journal, sans preuve indépendante, la toile ', after: ' en Suisse.', answer: 'aurait reparu', distractors: ['reparaissait', 'a reparu', 'reparaîtrait'] },
]

export const FRENCH_CONDITIONNEL_PASSE_EDITORIAL = createFrenchEditorialPack({
  slug: 'conditionnel-passe',
  form: 'conditionnel-passe',
  focus: 'Conditionnel passé',
  rule: 'Le conditionnel passé exprime une conséquence passée non réalisée ou, avec une source explicitement réservée, une information passée non confirmée.',
  micro,
  long,
  errors,
  sequences,
  final,
})
