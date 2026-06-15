'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = '#7c3aed';

interface FQ { s: string; opts: string[]; a: number; fb: string; }
interface TQ { prompt: string; s: string; opts: string[]; a: number; fb: string; }
interface EQ { s: string; q: string; opts: string[]; a: number; fb: string; }
interface Topic {
  id: string; title: string; icon: string;
  rule: string; tip: string;
  table: { headers: string[]; rows: string[][] };
  a1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'passe_compose',
    title: "Passé composé : avoir et être",
    icon: '⏰',
    rule: "Le passé composé = AVOIR ou ÊTRE + participe passé. Verbes avec ÊTRE : aller, venir, partir, arriver, entrer, sortir, naître, mourir, rester, tomber + tous les verbes pronominaux (se lever, se coucher). Avec ÊTRE, le participe s'accorde en genre et en nombre avec le sujet.",
    tip: "Astuce DEVTRAMPSS : Devenir, Entrer, Venir, Tomber, Rester, Aller, Mourir, Partir, Sortir, S'en aller — tous avec ÊTRE. Avec AVOIR, le participe ne s'accorde pas (sauf si un COD est placé avant le verbe).",
    table: {
      headers: ['Sujet', "avec AVOIR (manger)", "avec ÊTRE (aller)"],
      rows: [
        ['je', "j'ai mangé", "je suis allé(e)"],
        ['tu', "tu as mangé", "tu es allé(e)"],
        ['il/elle', "il a mangé / elle a mangé", "il est allé / elle est allée"],
        ['nous', "nous avons mangé", "nous sommes allé(e)s"],
        ['vous', "vous avez mangé", "vous êtes allé(e)(s)"],
        ['ils/elles', "ils ont mangé", "ils sont allés / elles sont allées"],
      ]
    },
    a1note: "En A1, tu utilisais le présent : \"Je mange une pizza.\" (maintenant). En A2, le passé composé décrit ce qui s'est passé et est terminé : \"Hier soir, j'ai mangé une pizza.\" Présent = maintenant/habitude ; passé composé = événement terminé dans le passé.",
    examples: [
      "Ce matin, je suis allé(e) au marché et j'ai acheté des légumes frais. (aller → être ; acheter → avoir)",
      "Elle est arrivée en retard parce qu'elle a raté le bus. (arriver → être ; rater → avoir)",
      "Ils se sont rencontrés à Paris et sont tombés amoureux. (pronominal → être ; tomber → être)",
    ],
    fills: [
      { s: "Elle ___ allée au cinéma hier soir.", opts: ["est", "a", "sont", "ont"], a: 0, fb: "Aller = verbe de mouvement → auxiliaire ÊTRE. Accord féminin singulier : allée (pas allé)." },
      { s: "Nous ___ mangé une excellente raclette.", opts: ["avons", "sommes", "avez", "êtes"], a: 0, fb: "Manger = verbe ordinaire → auxiliaire AVOIR → nous AVONS mangé. Pas d'accord du participe avec avoir." },
      { s: "Ils ___ partis sans dire au revoir.", opts: ["sont", "ont", "avons", "avez"], a: 0, fb: "Partir = verbe de mouvement → ÊTRE. Accord masculin pluriel : partis." },
      { s: "Tu ___ reçu mon message ?", opts: ["as", "es", "a", "est"], a: 0, fb: "Recevoir = verbe transitif → AVOIR → tu AS reçu. Pas d'accord du participe." },
      { s: "Marie et Julie ___ venues nous voir ce week-end.", opts: ["sont", "ont", "avons", "avez"], a: 0, fb: "Venir → ÊTRE. Accord féminin pluriel : venues (deux femmes)." },
    ],
    transforms: [
      { prompt: "Mets au passé composé :", s: "Je mange une pizza ce soir. (hier soir)", opts: ["Hier soir, j'ai mangé une pizza.", "Hier soir, je suis mangé une pizza.", "Hier soir, j'ai mangée une pizza.", "Hier soir, j'étais mangé une pizza."], a: 0, fb: "Manger → avoir + mangé. Pas d'accord avec 'je' : mangé (pas mangée). 'Hier soir' = passé composé, pas imparfait." },
      { prompt: "Mets à la forme négative :", s: "Elle est venue à la fête.", opts: ["Elle n'est pas venue à la fête.", "Elle n'a pas venue à la fête.", "Elle est ne venue pas à la fête.", "Elle n'était pas venue à la fête."], a: 0, fb: "Négation au passé composé : ne + auxiliaire + pas + participe. \"Elle n'est PAS venue.\" L'accord reste : venue." },
      { prompt: "Transforme en question par inversion :", s: "Vous avez visité le musée.", opts: ["Avez-vous visité le musée ?", "Vous avez visité le musée ?", "Est-ce que avez-vous visité le musée ?", "Avez-vous visiter le musée ?"], a: 0, fb: "Question par inversion : auxiliaire + tiret + sujet + participe. \"Avez-vous visité ?\" — le participe reste invariable ici (pas de COD avant)." },
    ],
    errors: [
      { s: "Il a allé au supermarché hier.", q: "Quelle est l'erreur ?", opts: ["'a' doit être 'est' (aller → être)", "'hier' doit être 'aujourd'hui'", "'allé' doit être 'allée'", "Pas d'erreur"], a: 0, fb: "ALLER → auxiliaire ÊTRE, pas AVOIR. La phrase correcte : \"Il EST allé au supermarché hier.\"" },
      { s: "Elles sont mangées au restaurant.", q: "Quelle est l'erreur ?", opts: ["'sont' doit être 'ont' (manger → avoir)", "'mangées' doit être 'mangé'", "'restaurant' doit être 'restaurants'", "Pas d'erreur"], a: 0, fb: "MANGER → auxiliaire AVOIR, pas ÊTRE. Donc : \"Elles ONT mangé au restaurant.\" (pas d'accord avec avoir sans COD avant)." },
    ],
    production: "Raconte ta journée d'hier en 3-4 phrases. Utilise au moins 3 verbes au passé composé. Essaie de mélanger avoir et être si possible.",
  },
  {
    id: 'imparfait',
    title: "L'imparfait : habitudes et descriptions",
    icon: '🔄',
    rule: "L'imparfait = radical du présent NOUS + -ais/-ais/-ait/-ions/-iez/-aient. Usages : (1) habitude passée (quand j'étais enfant, je jouais), (2) description de contexte passé (il faisait beau, la maison était grande), (3) action en cours interrompue par le passé composé.",
    tip: "Formation facile : prends le présent de 'nous' (nous mangeons), enlève -ons, ajoute les terminaisons : -ais, -ais, -ait, -ions, -iez, -aient. Exception : être → j'étais (radical irrégulier ét-).",
    table: {
      headers: ['Pronom', 'parler', 'finir', 'être'],
      rows: [
        ['je', 'je parlais', 'je finissais', "j'étais"],
        ['tu', 'tu parlais', 'tu finissais', 'tu étais'],
        ['il/elle', 'il/elle parlait', 'il/elle finissait', 'il/elle était'],
        ['nous', 'nous parlions', 'nous finissions', 'nous étions'],
        ['vous', 'vous parliez', 'vous finissiez', 'vous étiez'],
        ['ils/elles', 'ils/elles parlaient', 'ils/elles finissaient', 'ils/elles étaient'],
      ]
    },
    a1note: "En A1, tu décrivais le présent : \"J'aime le sport / Je fais du vélo le week-end.\" En A2, l'imparfait exprime ces mêmes routines dans le passé : \"Quand j'étais enfant, j'aimais le sport.\" Le changement clé : c'était avant, ce n'est plus le cas maintenant.",
    examples: [
      "Quand j'étais petit, je jouais au foot avec mes amis tous les mercredis. (habitude passée répétée)",
      "Il pleuvait et les rues étaient désertes quand nous sommes sortis. (imparfait de contexte + passé composé = action)",
      "Elle lisait tranquillement quand le téléphone a sonné. (imparfait interrompu par passé composé — schéma classique A2)",
    ],
    fills: [
      { s: "Quand j'___ enfant, j'adorais les glaces.", opts: ["étais", "suis", "ai été", "serai"], a: 0, fb: "'Quand j'étais enfant' = contexte habituel passé → imparfait. Étais = imparfait de être (radical irrégulier ét-)." },
      { s: "Il ___ dehors et les gens couraient pour s'abriter.", opts: ["pleuvait", "a plu", "pleuvoir", "plut"], a: 0, fb: "Pleuvait = imparfait pour décrire le temps / contexte. Description de situation → imparfait, pas passé composé." },
      { s: "Tous les étés, nous ___ en vacances à la mer.", opts: ["allions", "sommes allés", "allons", "irons"], a: 0, fb: "Allions = imparfait pour habitude passée régulière ('tous les étés' = répétition). Nous allIONS." },
      { s: "Elle ___ son livre quand je suis entré.", opts: ["lisait", "a lu", "lit", "lira"], a: 0, fb: "Lisait = action en cours (imparfait) interrompue par 'suis entré' (passé composé). Schéma imparfait + passé composé." },
      { s: "La maison ___ grande et très lumineuse.", opts: ["était", "a été", "est", "sera"], a: 0, fb: "Était = imparfait pour description d'état passé. On décrit comment c'était → imparfait, pas passé composé." },
    ],
    transforms: [
      { prompt: "Transforme en habitude passée (imparfait) :", s: "Le dimanche, je mange avec mes grands-parents. (autrefois)", opts: ["Autrefois, le dimanche, je mangeais avec mes grands-parents.", "Autrefois, le dimanche, j'ai mangé avec mes grands-parents.", "Autrefois, le dimanche, je mange avec mes grands-parents.", "Autrefois, le dimanche, je mangèrent avec mes grands-parents."], a: 0, fb: "Manger → nous mangeons → mang- → je mangEAIS. Habitude passée = imparfait. 'J'ai mangé' serait une action ponctuelle unique." },
      { prompt: "Identifie le bon temps pour chaque verbe :", s: "Quand elle [entrer] dans la salle, tout le monde [parler].", opts: ["est entrée / parlait", "entrait / a parlé", "est entrée / a parlé", "entrait / parlait"], a: 0, fb: "Schéma : passé composé (action ponctuelle interruptrice) + imparfait (action en cours). 'Est entrée' (ponctuel) / 'parlait' (en cours)." },
      { prompt: "Mets les deux verbes à l'imparfait :", s: "Je travaille beaucoup et je rentre tard. (à cette époque-là)", opts: ["À cette époque-là, je travaillais beaucoup et je rentrais tard.", "À cette époque-là, j'ai travaillé beaucoup et je suis rentré tard.", "À cette époque-là, je travaillais beaucoup et j'ai rentré tard.", "À cette époque-là, je travaillerai beaucoup et je rentrerai tard."], a: 0, fb: "Les deux verbes décrivent une habitude passée → tous les deux à l'imparfait : travaillais, rentrais." },
    ],
    errors: [
      { s: "Quand j'avais 10 ans, j'ai joué au foot tous les jours.", q: "Quelle est l'erreur ?", opts: ["'j'ai joué' doit être 'je jouais' (habitude = imparfait)", "'j'avais' doit être 'j'ai eu'", "'au foot' doit être 'du foot'", "Pas d'erreur"], a: 0, fb: "'Tous les jours' = répétition habituelle → imparfait. Correcte : \"Quand j'avais 10 ans, je jouais au foot tous les jours.\"" },
      { s: "Il faisait chaud et nous décidions d'aller à la plage.", q: "Quelle est l'erreur ?", opts: ["'décidions' doit être 'avons décidé' (décision ponctuelle = passé composé)", "'faisait' doit être 'a fait'", "'aller' doit être 'allé'", "Pas d'erreur"], a: 0, fb: "'Décider d'aller à la plage' = décision ponctuelle → passé composé : \"nous avons décidé\". Le contexte (il faisait chaud) reste à l'imparfait." },
    ],
    production: "Décris comment tu vivais quand tu étais plus jeune (4-5 phrases). Où habitais-tu ? Que faisais-tu le week-end ? Avec qui jouais-tu ? Utilise au moins 4 verbes à l'imparfait.",
  },
  {
    id: 'pronoms_cod_coi',
    title: 'Pronoms COD et COI',
    icon: '🔗',
    rule: "COD (Complément d'Objet Direct) = répond à qui/quoi sans préposition. COI (Complément d'Objet Indirect) = répond à à qui / à quoi. Pronoms COD : me, te, le/la/l', nous, vous, les. Pronoms COI : me, te, lui, nous, vous, leur. Position : AVANT le verbe conjugué (ou avant l'auxiliaire au passé composé).",
    tip: "Test rapide : 'Je vois Paul' → je vois QUI ? = Paul = COD → 'Je le vois.' / 'Je parle à Marie' → je parle À QUI ? = Marie = COI → 'Je lui parle.' La différence clé : COI a lui/leur (pas le/la/les).",
    table: {
      headers: ['Personne', 'COD (qui/quoi ?)', 'COI (à qui ?)'],
      rows: [
        ['1sg', "me (m')", "me (m')"],
        ['2sg', "te (t')", "te (t')"],
        ['3sg masc', "le (l')", 'lui'],
        ['3sg fém', "la (l')", 'lui'],
        ['1pl', 'nous', 'nous'],
        ['2pl', 'vous', 'vous'],
        ['3pl', 'les', 'leur'],
      ]
    },
    a1note: "En A1, tu répétais le nom : \"J'aime le chocolat. Le chocolat est délicieux.\" En A2, tu remplaces avec des pronoms pour éviter la répétition : \"J'aime le chocolat. Je le mange souvent.\" C'est plus naturel et c'est ce que font tous les francophones natifs.",
    examples: [
      "Tu as appelé ta mère ? Oui, je l'ai appelée ce matin. (l' = la = COD féminin ; accord du participe avec avoir + COD avant)",
      "Il parle souvent à ses collègues ? Oui, il leur parle tous les jours. (leur = COI pluriel de 3e personne)",
      "Elle m'a dit la vérité. Je ne te mens pas. (me → m' ; te = COI de 2e personne singulier)",
    ],
    fills: [
      { s: "Tu vois souvent Paul ? Oui, je ___ vois tous les jours.", opts: ["le", "lui", "la", "leur"], a: 0, fb: "'Voir quelqu'un' = COD (je vois QUI ? → Paul) → pronom COD masculin singulier : LE." },
      { s: "Tu parles à Marie ? Oui, je ___ parle souvent.", opts: ["lui", "le", "la", "leur"], a: 0, fb: "'Parler à quelqu'un' = COI (je parle À QUI ? → Marie) → pronom COI : LUI." },
      { s: "Il a regardé les films ? Oui, il ___ a regardés.", opts: ["les", "leur", "le", "lui"], a: 0, fb: "COD pluriel : les films → LES. Au passé composé avec avoir, accord avec le COD placé avant : regardés (masculin pluriel)." },
      { s: "Elle vous a envoyé un message ? Oui, elle ___ a envoyé un message.", opts: ["nous", "leur", "les", "lui"], a: 0, fb: "'Envoyer à nous' = COI 1ère personne pluriel → NOUS. \"Elle nous a envoyé un message.\"" },
      { s: "Ils téléphonent à leurs parents chaque semaine. Ils ___ téléphonent chaque semaine.", opts: ["leur", "les", "lui", "le"], a: 0, fb: "'Téléphoner à leurs parents' = COI (téléphoner À QUI ?) → LEUR (pronom COI pluriel de 3e personne)." },
    ],
    transforms: [
      { prompt: "Remplace le groupe nominal par un pronom COD :", s: "Je regarde la télévision chaque soir.", opts: ["Je la regarde chaque soir.", "Je le regarde chaque soir.", "Je lui regarde chaque soir.", "Je les regarde chaque soir."], a: 0, fb: "La télévision = féminin COD → LA. Position : avant le verbe → 'Je LA regarde chaque soir.'" },
      { prompt: "Remplace par un pronom COI :", s: "Elle écrit souvent à ses amis.", opts: ["Elle leur écrit souvent.", "Elle les écrit souvent.", "Elle lui écrit souvent.", "Elle leur écrit souvent à eux."], a: 0, fb: "'Écrire à ses amis' → COI pluriel → LEUR. Position avant le verbe : 'Elle LEUR écrit souvent.'" },
      { prompt: "Remplace et accorde le participe si nécessaire :", s: "Il a acheté les fleurs pour sa mère. (les fleurs = COD, avant le verbe)", opts: ["Il les a achetées pour sa mère.", "Il les a acheté pour sa mère.", "Il leur a achetées pour sa mère.", "Il a les achetées pour sa mère."], a: 0, fb: "COD féminin pluriel (les fleurs) placé avant avoir → accord du participe : achetéES. 'Il LES a achetéES pour sa mère.'" },
    ],
    errors: [
      { s: "Je parle à Sophie tous les jours. Je la parle tous les jours.", q: "Quelle est l'erreur ?", opts: ["'la' doit être 'lui' (parler à = COI → lui)", "'la' doit être 'les'", "'parle' doit être 'ai parlé'", "Pas d'erreur"], a: 0, fb: "'Parler À Sophie' = COI → pronom LUI, pas LA. Correcte : 'Je LUI parle tous les jours.'" },
      { s: "Tu as vu les enfants ? Oui, je les ai vu.", q: "Quelle est l'erreur ?", opts: ["'vu' doit être 'vus' (accord COD masculin pluriel avant avoir)", "'les' doit être 'leur'", "'ai' doit être 'suis'", "Pas d'erreur"], a: 0, fb: "COD pluriel masculin (les) placé avant avoir → accord du participe : 'je les ai VUS.' Règle : COD avant avoir = accord obligatoire." },
    ],
    production: "Réponds aux 3 questions suivantes en utilisant des pronoms COD ou COI à la place des noms soulignés : Tu aimes les films d'action ? Tu écris des messages à tes amis ? Tu vois tes parents souvent ? (3 phrases minimum avec pronoms)",
  },
  {
    id: 'comparatif_superlatif',
    title: 'Comparatif et superlatif',
    icon: '⚖️',
    rule: "Comparatif : plus/moins/aussi + adjectif + que. Superlatif : le/la/les + plus/moins + adjectif (+ de + groupe). Irréguliers : bon → meilleur (comp.) → le meilleur (sup.) ; bien → mieux → le mieux ; mauvais → pire → le pire.",
    tip: "Piège fréquent : 'plus bon' n'existe PAS → toujours 'meilleur'. 'Plus bien' n'existe PAS → toujours 'mieux'. Au superlatif, l'article s'accorde avec le nom : 'le film le plus long' mais 'la ville la plus belle' (article répété après le nom).",
    table: {
      headers: ['Forme', 'Adjectif régulier (grand)', 'bon', 'mauvais', 'bien (adverbe)'],
      rows: [
        ['Comparatif +', 'plus grand(e) que', 'meilleur(e) que', 'pire que', 'mieux que'],
        ['Comparatif -', 'moins grand(e) que', 'moins bon(ne) que', 'moins mauvais que', 'moins bien que'],
        ['Comparatif =', 'aussi grand(e) que', 'aussi bon(ne) que', 'aussi mauvais que', 'aussi bien que'],
        ['Superlatif +', 'le/la/les plus grand(e)(s)', 'le/la meilleur(e)', 'le/la pire', 'le mieux'],
        ['Superlatif -', 'le/la/les moins grand(e)(s)', '—', '—', 'le moins bien'],
      ]
    },
    a1note: "En A1, tu décrivais avec des adjectifs simples : 'Paris est belle. Rome est belle aussi.' En A2, tu compares : 'Paris est aussi belle que Rome, mais Rome est plus historique.' Tu passes de la description simple à l'analyse comparative avec nuances.",
    examples: [
      "Le TGV est plus rapide que le train régional, mais moins cher que l'avion. (double comparatif en une phrase)",
      "C'est la meilleure boulangerie du quartier — leurs croissants sont incomparables ! (superlatif irrégulier de bon)",
      "Elle parle mieux l'espagnol que l'anglais, mais c'est le français qu'elle maîtrise le mieux. (mieux = comparatif et superlatif de bien)",
    ],
    fills: [
      { s: "Le cinéma est ___ intéressant ___ la télévision, selon moi.", opts: ["plus / que", "plus / de", "le plus / que", "aussi / de"], a: 0, fb: "Comparatif de supériorité : PLUS + adjectif + QUE. 'Le cinéma est PLUS intéressant QUE la télévision.'" },
      { s: "C'est le ___ restaurant de toute la ville !", opts: ["meilleur", "plus bon", "mieux", "bon"], a: 0, fb: "Superlatif de 'bon' = LE MEILLEUR (irrégulier). 'Le plus bon' n'existe pas en français standard." },
      { s: "Elle chante ___ que sa sœur — tout le monde préfère sa voix.", opts: ["mieux", "meilleure", "plus bien", "la mieux"], a: 0, fb: "Comparatif de 'bien' = MIEUX (irrégulier). 'Plus bien' n'existe pas. Contexte adverbial (comment elle chante) → mieux." },
      { s: "Ce livre est ___ difficile ___ tu le penses.", opts: ["moins / que", "moins / de", "le moins / que", "aussi / de"], a: 0, fb: "Comparatif d'infériorité : MOINS + adjectif + QUE. 'Ce livre est MOINS difficile QUE tu le penses.'" },
      { s: "Paris est ___ ville ___ visitée de France.", opts: ["la / la plus", "le / le plus", "la / plus", "une / la plus"], a: 0, fb: "Superlatif féminin : LA ville LA PLUS + adjectif. Le nom 'ville' est féminin → 'la ville la plus visitée.' Double article." },
    ],
    transforms: [
      { prompt: "Forme une comparaison de supériorité :", s: "Lyon est grand. Bordeaux est moins grand. (comparer)", opts: ["Lyon est plus grand que Bordeaux.", "Lyon est le plus grand de Bordeaux.", "Lyon est plus grande que Bordeaux.", "Lyon est aussi grand que Bordeaux."], a: 0, fb: "Comparatif de supériorité : PLUS + adjectif + QUE. 'Lyon est PLUS grand QUE Bordeaux.' (adjectif masculin car Lyon)." },
      { prompt: "Utilise le superlatif (tous les films de l'année) :", s: "C'est un bon film. (le meilleur de l'année)", opts: ["C'est le meilleur film de l'année.", "C'est le plus bon film de l'année.", "C'est le meilleur film qu'il est de l'année.", "C'est le film plus bon de l'année."], a: 0, fb: "Superlatif de 'bon' = LE MEILLEUR. Jamais 'le plus bon'. Structure : LE + MEILLEUR + nom + DE + groupe." },
      { prompt: "Transforme en comparatif d'égalité :", s: "Marie est intelligente. Sophie est intelligente aussi.", opts: ["Marie est aussi intelligente que Sophie.", "Marie est autant intelligente que Sophie.", "Marie est si intelligente que Sophie.", "Marie est aussi intelligente de Sophie."], a: 0, fb: "Comparatif d'égalité : AUSSI + adjectif + QUE. 'Marie est AUSSI intelligente QUE Sophie.' Toujours 'que', jamais 'de' après le comparatif." },
    ],
    errors: [
      { s: "C'est le plus bon gâteau que j'ai jamais mangé !", q: "Quelle est l'erreur ?", opts: ["'le plus bon' doit être 'le meilleur' (superlatif irrégulier)", "'que' doit être 'qui'", "'jamais' doit être 'toujours'", "Pas d'erreur"], a: 0, fb: "Bon → superlatif = LE MEILLEUR (irrégulier). 'Le plus bon' n'existe pas. Correcte : 'C'est LE MEILLEUR gâteau que j'ai jamais mangé !'" },
      { s: "Il travaille plus bien que son collègue.", q: "Quelle est l'erreur ?", opts: ["'plus bien' doit être 'mieux' (comparatif irrégulier de bien)", "'plus' doit être 'moins'", "'collègue' doit être 'collègues'", "Pas d'erreur"], a: 0, fb: "Bien → comparatif = MIEUX (irrégulier). 'Plus bien' n'existe pas. Correcte : 'Il travaille MIEUX que son collègue.'" },
    ],
    production: "Compare deux villes, deux films ou deux personnages que tu connais. Écris 4-5 phrases avec : 1 comparatif de supériorité, 1 d'infériorité, 1 d'égalité et 1 superlatif.",
  },
  {
    id: 'futur_proche_futur_simple',
    title: 'Futur proche vs futur simple',
    icon: '🚀',
    rule: "Futur proche (aller + infinitif) : action certaine, planifiée, imminente. Futur simple (-rai/-ras/-ra/-rons/-rez/-ront) : événement lointain, prédiction, promesse formelle. À l'oral quotidien, le futur proche domine même pour des événements futurs lointains.",
    tip: "Règle pratique : si c'est concret et prévu (tu as les billets, le rendez-vous est fixé) → futur proche. Si c'est une prédiction vague, un rêve ou une promesse solennelle → futur simple. Verbes irréguliers au futur simple : être→sera, avoir→aura, aller→ira, faire→fera, venir→viendra, pouvoir→pourra, vouloir→voudra.",
    table: {
      headers: ['', 'Futur proche (aller + inf.)', 'Futur simple'],
      rows: [
        ['je', "je vais partir", "je partirai"],
        ['tu', "tu vas partir", "tu partiras"],
        ['il/elle', "il/elle va partir", "il/elle partira"],
        ['nous', "nous allons partir", "nous partirons"],
        ['vous', "vous allez partir", "vous partirez"],
        ['ils/elles', "ils/elles vont partir", "ils/elles partiront"],
      ]
    },
    a1note: "En A1, tu exprimais des intentions avec 'je veux + infinitif' : 'Je veux voyager.' En A2, tu planifies avec le futur proche : 'Je vais voyager en Italie cet été.' (plan concret) ou tu fais des prédictions avec le futur simple : 'Dans 10 ans, les voitures seront toutes électriques.' (prédiction générale).",
    examples: [
      "Je vais appeler le médecin demain matin — j'ai pris rendez-vous à 9h. (futur proche : plan concret déjà organisé)",
      "Dans cent ans, les humains vivront peut-être sur d'autres planètes. (futur simple : prédiction lointaine et incertaine)",
      "Attention ! Tu vas tomber ! (futur proche imminent : danger visible maintenant → pas de futur simple ici)",
    ],
    fills: [
      { s: "Dépêche-toi ! Le film ___ commencer dans deux minutes !", opts: ["va", "va à", "ira", "sera"], a: 0, fb: "Futur proche = aller + infinitif. 'Va commencer' (il/elle/ça va) = action imminente et certaine. Jamais 'va à commencer'." },
      { s: "Dans vingt ans, la technologie ___ complètement différente.", opts: ["sera", "va être", "est", "a été"], a: 0, fb: "Prédiction lointaine et incertaine → futur simple : 'SERA'. 'Dans 20 ans' + doute = futur simple plus naturel que 'va être'." },
      { s: "Nous ___ déménager le mois prochain. On a déjà signé le bail !", opts: ["allons", "irons", "sommes allés", "serons"], a: 0, fb: "Bail signé = plan concret et certain → futur proche : 'ALLONS déménager'. Futur simple possible mais moins naturel pour un plan aussi concret." },
      { s: "Si tu travailles bien, tu ___ réussir ton examen.", opts: ["vas", "iras", "seras", "pourras"], a: 0, fb: "'Tu vas réussir' = futur proche pour une conséquence probable et certaine. 'Pouvoir' est aussi possible mais la structure futur proche est plus naturelle ici." },
      { s: "Je vous ___ que cela ne se reproduira plus jamais.", opts: ["vais promettre", "promets", "promettrai", "promettrais"], a: 2, fb: "Promesse formelle et solennelle → futur simple : 'PROMETTRAI'. Le futur simple donne un caractère solennel aux promesses et engagements formels." },
    ],
    transforms: [
      { prompt: "Transforme en futur proche (plan concret) :", s: "Ils partent en vacances demain. (ils ont tout préparé)", opts: ["Ils vont partir en vacances demain.", "Ils iront en vacances demain.", "Ils veulent partir en vacances demain.", "Ils partiraient en vacances demain."], a: 0, fb: "Futur proche = aller + infinitif. 'Ils VONT partir.' Le plan est concret (tout préparé) → futur proche." },
      { prompt: "Transforme en futur simple (prédiction générale) :", s: "Dans 50 ans, les robots vont faire tout le travail.", opts: ["Dans 50 ans, les robots feront tout le travail.", "Dans 50 ans, les robots vont faire tout le travail.", "Dans 50 ans, les robots font tout le travail.", "Dans 50 ans, les robots feraient tout le travail."], a: 0, fb: "Prédiction pour l'avenir lointain + incertitude → futur simple : 'FERONT'. Transformation de 'vont faire' → 'feront' (radical fer- + ront)." },
      { prompt: "Choisis le futur approprié (danger immédiat) :", s: "Attention ! Tu ___ tomber ! (danger visible maintenant)", opts: ["vas", "iras", "tomberas", "vas à"], a: 0, fb: "Danger visible et immédiat → futur proche : 'Tu VAS tomber !' Jamais 'va à tomber'. C'est le futur proche d'avertissement immédiat." },
    ],
    errors: [
      { s: "Je vais à voyager en Espagne cet été.", q: "Quelle est l'erreur ?", opts: ["'vais à voyager' doit être 'vais voyager' (aller + infinitif direct, sans à)", "'cet été' doit être 'cette été'", "'en' doit être 'à'", "Pas d'erreur"], a: 0, fb: "Futur proche = aller + INFINITIF (sans préposition 'à'). 'Je VAIS voyager en Espagne cet été.' Jamais 'vais à voyager'." },
      { s: "Je vais appeler à mon père ce soir.", q: "Quelle est l'erreur ?", opts: ["'appeler à' doit être 'appeler' (appeler quelqu'un = pas de à)", "'vais' doit être 'suis allé'", "'ce soir' doit être 'ce matin'", "Pas d'erreur"], a: 0, fb: "En français, 'appeler quelqu'un' est transitif direct (COD, pas COI). On dit 'J'appelle mon père' (pas 'à mon père'). 'Je vais appeler mon père ce soir.'" },
    ],
    production: "Parle de tes projets et de tes prédictions en 4-5 phrases : 2 phrases avec le futur proche (plans concrets et certains) et 2-3 phrases avec le futur simple (rêves, prédictions, promesses). Justifie brièvement ton choix de temps.",
  },
];

export default function GramaticaFrancesA2() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [fillAns, setFillAns] = useState<Record<number, number>>({});
  const [transAns, setTransAns] = useState<Record<number, number>>({});
  const [errAns, setErrAns] = useState<Record<number, number>>({});
  const [prodText, setProdText] = useState('');
  const [prodDone, setProdDone] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const t = TOPICS[topicIdx];

  function reset() {
    setFillAns({}); setTransAns({}); setErrAns({});
    setProdText(''); setProdDone(false); setShowResult(false);
  }

  function bs(done: boolean, ok: boolean, sel: boolean) {
    if (!done) return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--ink)' };
    if (ok) return { background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', color: '#059669' };
    if (sel) return { background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: '#dc2626' };
    return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
  }

  const allFill = t.fills.every((_, i) => fillAns[i] !== undefined);
  const allTrans = t.transforms.every((_, i) => transAns[i] !== undefined);
  const allErr = t.errors.every((_, i) => errAns[i] !== undefined);
  const allMCQ = allFill && allTrans && allErr;
  const correct = t.fills.filter((q, i) => fillAns[i] === q.a).length
    + t.transforms.filter((q, i) => transAns[i] === q.a).length
    + t.errors.filter((q, i) => errAns[i] === q.a).length;
  const total = t.fills.length + t.transforms.length + t.errors.length;

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/frances" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 Francés</Link>
          <span>/</span>
          <Link href="/practica/frances/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>A2</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>Grammaire</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.3rem' }}><span className="ink-line" />Francés A2</p>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.4rem', color: 'var(--ink)' }}>
          Grammaire A2 — 5 thèmes essentiels
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 2rem', lineHeight: 1.6, maxWidth: 560 }}>
          Passé composé, imparfait, pronoms COD/COI, comparatif et futur. Explication visuelle + exercices progressifs.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {TOPICS.map((tp, i) => (
            <button key={tp.id} onClick={() => { setTopicIdx(i); reset(); }}
              style={{ padding: '0.45rem 0.9rem', borderRadius: 20, fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                background: topicIdx === i ? C : 'var(--bg-2)',
                border: `1.5px solid ${topicIdx === i ? C : 'var(--line-soft)'}`,
                color: topicIdx === i ? '#fff' : 'var(--muted)' }}>
              {tp.icon} {tp.title}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.4rem', borderRadius: 14, background: `${C}08`, border: `1.5px solid ${C}22`, marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
            <h2 style={{ margin: 0, fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)' }}>{t.title}</h2>
          </div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>{t.rule}</p>
          <div style={{ fontSize: '0.82rem', color: C, padding: '0.4rem 0.7rem', borderRadius: 8, background: `${C}10`, border: `1px solid ${C}30`, marginBottom: '0.9rem', lineHeight: 1.6 }}>
            💡 {t.tip}
          </div>
          <div style={{ overflowX: 'auto', marginBottom: '0.85rem' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 400, fontSize: '0.84rem' }}>
              <thead>
                <tr>{t.table.headers.map((h, hi) => (
                  <th key={hi} style={{ padding: '0.4rem 0.7rem', background: `${C}15`, border: '1px solid var(--line-soft)', fontWeight: 800, color: C, textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {t.table.rows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '0.4rem 0.7rem', border: '1px solid var(--line-soft)', color: 'var(--ink)', lineHeight: 1.45, background: ri % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)' }}>{cell}</td>
                  ))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', padding: '0.5rem 0.75rem', borderRadius: 8, background: 'rgba(0,0,0,0.04)', borderLeft: '3px solid var(--muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
            📌 <strong style={{ color: 'var(--ink)' }}>vs A1 :</strong> {t.a1note}
          </div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Exemples en contexte réel</div>
          {t.examples.map((ex, ei) => (
            <p key={ei} style={{ margin: '0 0 0.3rem', fontSize: '0.84rem', color: 'var(--ink)', lineHeight: 1.6, borderLeft: '2px solid var(--line-soft)', paddingLeft: '0.6rem' }}>
              &ldquo;{ex}&rdquo;
            </p>
          ))}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>📝</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Complète les phrases</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.fills.filter((_, i) => fillAns[i] !== undefined).length}/{t.fills.length}
            </span>
          </div>
          {t.fills.map((q, qi) => {
            const ans = fillAns[qi]; const done = ans !== undefined;
            const parts = q.s.split('___');
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <p style={{ margin: '0 0 0.7rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {qi + 1}.{' '}
                  {parts.map((part, pi) => (
                    <span key={pi}>{part}{pi < parts.length - 1 && (
                      <span style={{ display: 'inline-block', minWidth: 72, borderBottom: `2px solid ${C}`, margin: '0 3px', textAlign: 'center', verticalAlign: 'bottom' }}>
                        {done && <span style={{ fontSize: '0.85rem', fontWeight: 800, color: ans === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                      </span>
                    )}</span>
                  ))}
                </p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setFillAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.9rem', borderRadius: 7, fontSize: '0.88rem', fontWeight: 700, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Correct. ' : `✗ Réponse : "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔄</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Transforme les phrases</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.transforms.filter((_, i) => transAns[i] !== undefined).length}/{t.transforms.length}
            </span>
          </div>
          {t.transforms.map((q, qi) => {
            const ans = transAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔄 {q.prompt}</div>
                <p style={{ margin: '0 0 0.7rem', fontSize: '0.92rem', color: 'var(--ink)', fontStyle: 'italic', borderLeft: '3px solid var(--line-soft)', paddingLeft: '0.5rem', fontWeight: 600 }}>
                  &ldquo;{q.s}&rdquo;
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setTransAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.5rem 0.9rem', borderRadius: 8, fontSize: '0.87rem', ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.12s', lineHeight: 1.45 }}>
                        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', opacity: 0.6, marginRight: '0.4rem' }}>{['A', 'B', 'C', 'D'][oi]}.</span>
                        {opt}{done && oi === q.a && ' ✓'}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ ' : `✗ Correcte : "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔍</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Détecte l'erreur</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.errors.filter((_, i) => errAns[i] !== undefined).length}/{t.errors.length}
            </span>
          </div>
          {t.errors.map((q, qi) => {
            const ans = errAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔍 Trouve l'erreur</div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: '#dc2626', fontSize: '0.93rem', fontFamily: 'var(--mono)', borderLeft: '3px solid #dc2626', paddingLeft: '0.5rem', lineHeight: 1.5 }}>{q.s}</p>
                <p style={{ margin: '0 0 0.65rem', fontSize: '0.83rem', color: 'var(--muted)' }}>{q.q}</p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setErrAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.85rem', borderRadius: 7, fontSize: '0.85rem', fontWeight: 600, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Correct. ' : `✗ Réponse : "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>✍️</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Production libre</span>
          </div>
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.2)', marginBottom: '0.85rem' }}>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>{t.production}</p>
          </div>
          {!allMCQ && (
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>
              🔒 Complète tous les exercices ci-dessus pour débloquer la production libre.
            </p>
          )}
          {allMCQ && !prodDone && (
            <>
              <textarea value={prodText} onChange={e => setProdText(e.target.value)} rows={5}
                placeholder="Écris ta réponse ici..."
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.92rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  {prodText.trim() ? prodText.trim().split(/\s+/).length : 0} mots
                </span>
                <button className="btn btn-sm"
                  onClick={() => { if (prodText.trim().split(/\s+/).filter(Boolean).length >= 10) setProdDone(true); }}
                  disabled={prodText.trim().split(/\s+/).filter(Boolean).length < 10}
                  style={{ background: '#059669', borderColor: '#059669', opacity: prodText.trim().split(/\s+/).filter(Boolean).length >= 10 ? 1 : 0.5 }}>
                  Terminer →
                </button>
              </div>
            </>
          )}
          {prodDone && (
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.25)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Ta production</div>
              <p style={{ margin: '0 0 0.7rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{prodText}</p>
              <button className="btn btn-ghost btn-sm" onClick={() => { setProdText(''); setProdDone(false); }} style={{ fontSize: '0.78rem' }}>Modifier</button>
            </div>
          )}
        </div>

        {allMCQ && prodDone && !showResult && (
          <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background: C, borderColor: C, marginBottom: '1rem' }}>
            Voir le résultat →
          </button>
        )}

        {showResult && (
          <div style={{ padding: '1.75rem', borderRadius: 18, border: `2px solid ${C}33`, background: `${C}06`, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {correct === total ? '🏆' : correct >= Math.ceil(total * 0.7) ? '⭐' : '📖'}
            </div>
            <h2 style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)', fontSize: '1.3rem' }}>
              {correct} / {total} exercices corrects
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
              {correct === total
                ? 'Parfait ! Tu maîtrises ce thème A2.'
                : correct >= Math.ceil(total * 0.7)
                ? 'Très bien ! Revois les exercices marqués ✗.'
                : "Relis l'explication et réessaie."}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: C, borderColor: C }}>Réessayer</button>
              {topicIdx < TOPICS.length - 1 && (
                <button className="btn btn-ghost btn-sm" onClick={() => { setTopicIdx(topicIdx + 1); reset(); }}>
                  Thème suivant →
                </button>
              )}
              <Link href="/practica/frances/a2" className="btn btn-ghost btn-sm">Retour à A2</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
