'use client';

import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';

const guide: QuestGuide = {
  title: 'Grammaire Française A2 — Guía de referencia',
  body: "Los 5 pilares del francés A2: passé composé (avoir/être + pp.), imparfait (habitudes/descriptions), pronoms COD/COI, comparatif/superlatif y futur (proche vs simple).\nEn A1 usabas el présent para todo; en A2 narras el pasado con passé composé (hechos puntuales) e imparfait (contexto/hábitos), planeas el futuro y evitas repetir sustantivos con pronombres.",
  tip: "Mnemotecnia DEVTRAMPSS para verbos con ÊTRE: Devenir, Entrer, Venir, Tomber, Rester, Aller, Mourir, Partir, Sortir, S'en aller. Irréguliers futur: être→sera, avoir→aura, aller→ira, faire→fera. Comparativos irrégulares: bon→meilleur, bien→mieux, mauvais→pire.",
  tableHead: ['Tema', 'Regla clave', 'Ejemplo'],
  tableRows: [
    ['Passé composé', "avoir/être + pp. · DEVTRAMPSS → être", "Elle est allée · J'ai mangé"],
    ['Imparfait', 'radical nous + -ais/-ait/-ions/-iez/-aient', "Je parlais · Il faisait beau · j'étais"],
    ['COD / COI', 'COD: le/la/les · COI: lui/leur · position: AVANT le verbe', "Je le vois · Je lui parle"],
    ['Comparatif', 'plus/moins/aussi + adj + que · bon→meilleur', "Plus grand que · Le meilleur"],
    ['Futur', 'aller + inf. (proche) vs -rai/-ras/-ra (simple)', "Je vais partir · Je partirai"],
  ],
};

const levels: QuestLevel[] = [
  {
    type: 'choice',
    icon: '⏰',
    title: 'Passé composé — avoir ou être',
    desc: "Passé composé = AVOIR ou ÊTRE + participe passé. Verbes avec ÊTRE : aller, venir, partir, arriver, entrer, sortir, naître, mourir + pronominaux. Avec ÊTRE, le participe s'accorde en genre et en nombre.",
    items: [
      { text: "Elle ___ allée au cinéma hier soir.", opts: ["est", "a", "sont", "ont"], ans: "est", hint: "Aller → ÊTRE. Accord féminin singulier : allée." },
      { text: "Nous ___ mangé une excellente raclette.", opts: ["avons", "sommes", "avez", "êtes"], ans: "avons", hint: "Manger → AVOIR. Pas d'accord du participe avec avoir." },
      { text: "Ils ___ partis sans dire au revoir.", opts: ["sont", "ont", "avons", "avez"], ans: "sont", hint: "Partir → ÊTRE. Accord masculin pluriel : partis." },
      { text: "Tu ___ reçu mon message ?", opts: ["as", "es", "a", "est"], ans: "as", hint: "Recevoir → AVOIR → tu AS reçu. Pas d'accord." },
      { text: "Marie et Julie ___ venues nous voir.", opts: ["sont", "ont", "avons", "avez"], ans: "sont", hint: "Venir → ÊTRE. Accord féminin pluriel : venues." },
      { text: "Mets au passé composé : Je mange une pizza. (hier soir)", opts: ["Hier soir, j'ai mangé une pizza.", "Hier soir, je suis mangé une pizza.", "Hier soir, j'ai mangée une pizza.", "Hier soir, j'étais mangé une pizza."], ans: "Hier soir, j'ai mangé une pizza.", hint: "Manger → avoir + mangé (invariable). 'Hier soir' = passé composé." },
      { text: "Mets à la forme négative : Elle est venue à la fête.", opts: ["Elle n'est pas venue à la fête.", "Elle n'a pas venue à la fête.", "Elle est ne venue pas à la fête.", "Elle n'était pas venue à la fête."], ans: "Elle n'est pas venue à la fête.", hint: "Négation : ne + auxiliaire + pas + participe. L'accord reste : venue." },
      { text: "Transforme en question par inversion : Vous avez visité le musée.", opts: ["Avez-vous visité le musée ?", "Vous avez visité le musée ?", "Est-ce que avez-vous visité le musée ?", "Avez-vous visiter le musée ?"], ans: "Avez-vous visité le musée ?", hint: "Inversion : auxiliaire + tiret + sujet + participe passé." },
      { text: "Trouve l'erreur : Il a allé au supermarché hier.", opts: ["'a' doit être 'est' (aller → être)", "'hier' doit être 'aujourd'hui'", "'allé' doit être 'allée'", "Pas d'erreur"], ans: "'a' doit être 'est' (aller → être)", hint: "ALLER → ÊTRE, jamais avoir. Correcte : 'Il EST allé.'" },
      { text: "Trouve l'erreur : Elles sont mangées au restaurant.", opts: ["'sont' doit être 'ont' (manger → avoir)", "'mangées' doit être 'mangé'", "'restaurant' doit être 'restaurants'", "Pas d'erreur"], ans: "'sont' doit être 'ont' (manger → avoir)", hint: "MANGER → AVOIR. 'Elles ONT mangé au restaurant.'" },
    ],
  },
  {
    type: 'choice',
    icon: '🔄',
    title: "L'imparfait — habitudes et descriptions",
    desc: "Imparfait = radical nous présent + -ais/-ais/-ait/-ions/-iez/-aient. Usages : (1) habitude passée répétée, (2) description de contexte, (3) action en cours interrompue par le passé composé.",
    items: [
      { text: "Quand j'___ enfant, j'adorais les glaces.", opts: ["étais", "suis", "ai été", "serai"], ans: "étais", hint: "'Quand j'étais enfant' = contexte habituel → imparfait. Radical irrégulier : ét-." },
      { text: "Il ___ dehors et les gens couraient pour s'abriter.", opts: ["pleuvait", "a plu", "pleuvoir", "plut"], ans: "pleuvait", hint: "Description du temps/contexte → imparfait." },
      { text: "Tous les étés, nous ___ en vacances à la mer.", opts: ["allions", "sommes allés", "allons", "irons"], ans: "allions", hint: "Habitude passée régulière ('tous les étés') → imparfait : allIONS." },
      { text: "Elle ___ son livre quand je suis entré.", opts: ["lisait", "a lu", "lit", "lira"], ans: "lisait", hint: "Action en cours (imparfait) interrompue par passé composé." },
      { text: "La maison ___ grande et très lumineuse.", opts: ["était", "a été", "est", "sera"], ans: "était", hint: "Description d'état passé → imparfait." },
      { text: "Transforme en habitude passée : Le dimanche, je mange avec mes grands-parents. (autrefois)", opts: ["Autrefois, le dimanche, je mangeais avec mes grands-parents.", "Autrefois, le dimanche, j'ai mangé avec mes grands-parents.", "Autrefois, le dimanche, je mange avec mes grands-parents.", "Autrefois, le dimanche, je mangèrent avec mes grands-parents."], ans: "Autrefois, le dimanche, je mangeais avec mes grands-parents.", hint: "Habitude passée = imparfait : mang- + ais = mangeais." },
      { text: "Quand elle [entrer] dans la salle, tout le monde [parler]. Choisir :", opts: ["est entrée / parlait", "entrait / a parlé", "est entrée / a parlé", "entrait / parlait"], ans: "est entrée / parlait", hint: "Passé composé (ponctuel interrupteur) + imparfait (en cours)." },
      { text: "Mets les deux verbes à l'imparfait : Je travaille beaucoup et je rentre tard. (à cette époque-là)", opts: ["À cette époque-là, je travaillais beaucoup et je rentrais tard.", "À cette époque-là, j'ai travaillé beaucoup et je suis rentré tard.", "À cette époque-là, je travaillais beaucoup et j'ai rentré tard.", "À cette époque-là, je travaillerai beaucoup et je rentrerai tard."], ans: "À cette époque-là, je travaillais beaucoup et je rentrais tard.", hint: "Habitude passée → tous les deux à l'imparfait." },
      { text: "Trouve l'erreur : Quand j'avais 10 ans, j'ai joué au foot tous les jours.", opts: ["'j'ai joué' doit être 'je jouais' (habitude = imparfait)", "'j'avais' doit être 'j'ai eu'", "'au foot' doit être 'du foot'", "Pas d'erreur"], ans: "'j'ai joué' doit être 'je jouais' (habitude = imparfait)", hint: "'Tous les jours' = répétition → imparfait : je jouais." },
      { text: "Trouve l'erreur : Il faisait chaud et nous décidions d'aller à la plage.", opts: ["'décidions' doit être 'avons décidé' (décision ponctuelle = passé composé)", "'faisait' doit être 'a fait'", "'aller' doit être 'allé'", "Pas d'erreur"], ans: "'décidions' doit être 'avons décidé' (décision ponctuelle = passé composé)", hint: "Décision ponctuelle → passé composé : avons décidé." },
    ],
  },
  {
    type: 'choice',
    icon: '🔗',
    title: 'Pronoms COD et COI',
    desc: "COD (qui/quoi ?) → me/te/le/la/nous/vous/les. COI (à qui ?) → me/te/lui/nous/vous/leur. Position : AVANT le verbe conjugué (ou avant l'auxiliaire au passé composé).",
    items: [
      { text: "Tu vois souvent Paul ? Oui, je ___ vois tous les jours.", opts: ["le", "lui", "la", "leur"], ans: "le", hint: "'Voir QUI ?' = COD masculin singulier → LE." },
      { text: "Tu parles à Marie ? Oui, je ___ parle souvent.", opts: ["lui", "le", "la", "leur"], ans: "lui", hint: "'Parler À QUI ?' = COI → LUI." },
      { text: "Il a regardé les films ? Oui, il ___ a regardés.", opts: ["les", "leur", "le", "lui"], ans: "les", hint: "COD pluriel (les films) → LES. Accord : regardés." },
      { text: "Elle vous a envoyé un message ? Oui, elle ___ a envoyé un message.", opts: ["nous", "leur", "les", "lui"], ans: "nous", hint: "'Envoyer à nous' = COI 1ère pl. → NOUS." },
      { text: "Ils téléphonent à leurs parents chaque semaine. Ils ___ téléphonent chaque semaine.", opts: ["leur", "les", "lui", "le"], ans: "leur", hint: "'Téléphoner À leurs parents' = COI pl. → LEUR." },
      { text: "Remplace COD : Je regarde la télévision chaque soir.", opts: ["Je la regarde chaque soir.", "Je le regarde chaque soir.", "Je lui regarde chaque soir.", "Je les regarde chaque soir."], ans: "Je la regarde chaque soir.", hint: "La télévision = féminin COD → LA. Position avant le verbe." },
      { text: "Remplace COI : Elle écrit souvent à ses amis.", opts: ["Elle leur écrit souvent.", "Elle les écrit souvent.", "Elle lui écrit souvent.", "Elle leur écrit souvent à eux."], ans: "Elle leur écrit souvent.", hint: "'Écrire à ses amis' = COI pl. → LEUR." },
      { text: "Remplace et accorde le participe : Il a acheté les fleurs pour sa mère.", opts: ["Il les a achetées pour sa mère.", "Il les a acheté pour sa mère.", "Il leur a achetées pour sa mère.", "Il a les achetées pour sa mère."], ans: "Il les a achetées pour sa mère.", hint: "COD féminin pluriel avant avoir → accord : achetéES." },
      { text: "Trouve l'erreur : Je parle à Sophie tous les jours. Je la parle tous les jours.", opts: ["'la' doit être 'lui' (parler à = COI → lui)", "'la' doit être 'les'", "'parle' doit être 'ai parlé'", "Pas d'erreur"], ans: "'la' doit être 'lui' (parler à = COI → lui)", hint: "'Parler À Sophie' = COI → LUI, pas LA." },
      { text: "Trouve l'erreur : Tu as vu les enfants ? Oui, je les ai vu.", opts: ["'vu' doit être 'vus' (accord COD masculin pluriel avant avoir)", "'les' doit être 'leur'", "'ai' doit être 'suis'", "Pas d'erreur"], ans: "'vu' doit être 'vus' (accord COD masculin pluriel avant avoir)", hint: "COD pl. masc. avant avoir → accord : 'je les ai VUS.'" },
    ],
  },
  {
    type: 'choice',
    icon: '⚖️',
    title: 'Comparatif et superlatif',
    desc: "Comparatif : plus/moins/aussi + adjectif + que. Superlatif : le/la/les + plus/moins + adjectif. Irréguliers : bon→meilleur, bien→mieux, mauvais→pire.",
    items: [
      { text: "Le cinéma est ___ intéressant ___ la télévision.", opts: ["plus / que", "plus / de", "le plus / que", "aussi / de"], ans: "plus / que", hint: "Comparatif de supériorité : PLUS + adj + QUE." },
      { text: "C'est le ___ restaurant de toute la ville !", opts: ["meilleur", "plus bon", "mieux", "bon"], ans: "meilleur", hint: "Superlatif de 'bon' = LE MEILLEUR (irrégulier). Jamais 'le plus bon'." },
      { text: "Elle chante ___ que sa sœur.", opts: ["mieux", "meilleure", "plus bien", "la mieux"], ans: "mieux", hint: "Comparatif de 'bien' = MIEUX (irrégulier). 'Plus bien' n'existe pas." },
      { text: "Ce livre est ___ difficile ___ tu le penses.", opts: ["moins / que", "moins / de", "le moins / que", "aussi / de"], ans: "moins / que", hint: "Comparatif d'infériorité : MOINS + adj + QUE." },
      { text: "Paris est ___ ville ___ visitée de France.", opts: ["la / la plus", "le / le plus", "la / plus", "une / la plus"], ans: "la / la plus", hint: "Superlatif féminin : LA ville LA PLUS + adjectif." },
      { text: "Forme une comparaison de supériorité : Lyon est grand. Bordeaux est moins grand.", opts: ["Lyon est plus grand que Bordeaux.", "Lyon est le plus grand de Bordeaux.", "Lyon est plus grande que Bordeaux.", "Lyon est aussi grand que Bordeaux."], ans: "Lyon est plus grand que Bordeaux.", hint: "PLUS + adj + QUE. Adjectif masculin car Lyon." },
      { text: "Utilise le superlatif : C'est un bon film. (le meilleur de l'année)", opts: ["C'est le meilleur film de l'année.", "C'est le plus bon film de l'année.", "C'est le meilleur film qu'il est de l'année.", "C'est le film plus bon de l'année."], ans: "C'est le meilleur film de l'année.", hint: "Superlatif de 'bon' = LE MEILLEUR + nom + DE + groupe." },
      { text: "Transforme en comparatif d'égalité : Marie est intelligente. Sophie est intelligente aussi.", opts: ["Marie est aussi intelligente que Sophie.", "Marie est autant intelligente que Sophie.", "Marie est si intelligente que Sophie.", "Marie est aussi intelligente de Sophie."], ans: "Marie est aussi intelligente que Sophie.", hint: "Égalité : AUSSI + adj + QUE. Toujours 'que', jamais 'de'." },
      { text: "Trouve l'erreur : C'est le plus bon gâteau que j'ai jamais mangé !", opts: ["'le plus bon' doit être 'le meilleur' (superlatif irrégulier)", "'que' doit être 'qui'", "'jamais' doit être 'toujours'", "Pas d'erreur"], ans: "'le plus bon' doit être 'le meilleur' (superlatif irrégulier)", hint: "Bon → superlatif = LE MEILLEUR. Jamais 'le plus bon'." },
      { text: "Trouve l'erreur : Il travaille plus bien que son collègue.", opts: ["'plus bien' doit être 'mieux' (comparatif irrégulier de bien)", "'plus' doit être 'moins'", "'collègue' doit être 'collègues'", "Pas d'erreur"], ans: "'plus bien' doit être 'mieux' (comparatif irrégulier de bien)", hint: "Bien → comparatif = MIEUX. Correcte : 'Il travaille MIEUX que son collègue.'" },
    ],
  },
  {
    type: 'choice',
    icon: '🚀',
    title: 'Futur proche vs futur simple',
    desc: "Futur proche (aller + infinitif) : action certaine, planifiée, imminente. Futur simple (-rai/-ras/-ra/-rons/-rez/-ront) : prédiction lointaine, promesse formelle. Irréguliers : être→sera, avoir→aura, aller→ira, faire→fera.",
    items: [
      { text: "Dépêche-toi ! Le film ___ commencer dans deux minutes !", opts: ["va", "va à", "ira", "sera"], ans: "va", hint: "Futur proche = aller + infinitif. Action imminente et certaine." },
      { text: "Dans vingt ans, la technologie ___ complètement différente.", opts: ["sera", "va être", "est", "a été"], ans: "sera", hint: "Prédiction lointaine et incertaine → futur simple : SERA." },
      { text: "Nous ___ déménager le mois prochain. On a déjà signé le bail !", opts: ["allons", "irons", "sommes allés", "serons"], ans: "allons", hint: "Plan concret (bail signé) → futur proche : ALLONS déménager." },
      { text: "Si tu travailles bien, tu ___ réussir ton examen.", opts: ["vas", "iras", "seras", "pourras"], ans: "vas", hint: "Conséquence probable et certaine → futur proche : tu VAS réussir." },
      { text: "Je vous ___ que cela ne se reproduira plus jamais.", opts: ["vais promettre", "promets", "promettrai", "promettrais"], ans: "promettrai", hint: "Promesse formelle et solennelle → futur simple : PROMETTRAI." },
      { text: "Transforme en futur proche : Ils partent en vacances demain. (tout préparé)", opts: ["Ils vont partir en vacances demain.", "Ils iront en vacances demain.", "Ils veulent partir en vacances demain.", "Ils partiraient en vacances demain."], ans: "Ils vont partir en vacances demain.", hint: "Plan concret → futur proche : vont + infinitif." },
      { text: "Transforme en futur simple : Dans 50 ans, les robots vont faire tout le travail.", opts: ["Dans 50 ans, les robots feront tout le travail.", "Dans 50 ans, les robots vont faire tout le travail.", "Dans 50 ans, les robots font tout le travail.", "Dans 50 ans, les robots feraient tout le travail."], ans: "Dans 50 ans, les robots feront tout le travail.", hint: "Prédiction lointaine → futur simple : FERONT (faire → fer-)." },
      { text: "Danger immédiat — Attention ! Tu ___ tomber !", opts: ["vas", "iras", "tomberas", "vas à"], ans: "vas", hint: "Danger visible et immédiat → futur proche : Tu VAS tomber !" },
      { text: "Trouve l'erreur : Je vais à voyager en Espagne cet été.", opts: ["'vais à voyager' doit être 'vais voyager' (aller + infinitif direct, sans à)", "'cet été' doit être 'cette été'", "'en' doit être 'à'", "Pas d'erreur"], ans: "'vais à voyager' doit être 'vais voyager' (aller + infinitif direct, sans à)", hint: "Futur proche = aller + INFINITIF (sans 'à')." },
      { text: "Trouve l'erreur : Je vais appeler à mon père ce soir.", opts: ["'appeler à' doit être 'appeler' (appeler quelqu'un = COD direct, pas de à)", "'vais' doit être 'suis allé'", "'ce soir' doit être 'ce matin'", "Pas d'erreur"], ans: "'appeler à' doit être 'appeler' (appeler quelqu'un = COD direct, pas de à)", hint: "'Appeler quelqu'un' = transitif direct. 'Je vais appeler mon père.'" },
    ],
  },
  {
    type: 'sprint',
    icon: '⚡',
    title: 'Sprint — tous les thèmes!',
    desc: 'Mix des 5 thèmes A2. Écris vite!',
    inputWidth: 90,
    items: [
      { text: "Elle ___ allée au cinéma hier soir. (auxiliaire d'aller)", ans: "est", hint: "aller → être: elle est" },
      { text: "Nous ___ mangé une excellente raclette. (auxiliaire de manger)", ans: "avons", hint: "manger → avoir: nous avons" },
      { text: "Quand j'___ enfant, j'adorais les glaces. (imparfait d'être)", ans: "étais", hint: "être: j'étais" },
      { text: "Tous les étés, nous ___ en vacances à la mer. (imparfait d'aller)", ans: "allions", hint: "aller: nous allIONS" },
      { text: "Tu vois souvent Paul ? Oui, je ___ vois tous les jours.", ans: "le", hint: "voir QUI? COD masc. → le" },
      { text: "Tu parles à Marie ? Oui, je ___ parle souvent.", ans: "lui", hint: "parler À QUI? COI → lui" },
      { text: "Le cinéma est ___ intéressant que la télévision. (supériorité)", ans: "plus", hint: "comparatif de supériorité → plus" },
      { text: "C'est le ___ restaurant de toute la ville ! (superlatif de bon)", ans: "meilleur", hint: "superlatif de bon → meilleur" },
      { text: "Dépêche-toi ! Le film ___ commencer dans deux minutes ! (imminent)", ans: "va", hint: "futur proche imminent → va" },
      { text: "Dans vingt ans, la technologie ___ complètement différente. (prédiction)", ans: "sera", hint: "prédiction lointaine → futur simple: sera" },
    ],
  },
];

export default function GramaticaFrancesA2() {
  return (
    <QuestEngine
      color="#003189"
      flag="🇫🇷"
      storageKey="quest-fr-a2-grammatik"
      guide={guide}
      levels={levels}
      backHref="/practica/frances/a2"
      backLabel="Français A2"
      title="Grammaire A2"
      subtitle="Français A2 — Grammaire"
    />
  );
}
