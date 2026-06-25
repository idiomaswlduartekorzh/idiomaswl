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
  b1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'subjonctif',
    title: 'Subjonctif présent',
    icon: '🌀',
    rule: "Le subjonctif est utilisé après des expressions d'obligation (il faut que), de volonté (vouloir que, désirer que), d'émotion (être content que, avoir peur que), de doute (douter que) et certaines conjonctions (bien que, pour que, à moins que). Formation : radical de la 3e personne du pluriel (ils parlent → parl-) + terminaisons : -e, -es, -e, -ions, -iez, -ent.",
    tip: "Verbes irréguliers clés: être → sois/soit/soient ; avoir → aie/ait/aient ; aller → aille/ailles/aillent ; faire → fasse/fasses/fassent ; pouvoir → puisse ; savoir → sache ; venir → vienne.",
    table: {
      headers: ['Pronom', 'parler', 'finir', 'être', 'avoir'],
      rows: [
        ['que je', 'parle', 'finisse', 'sois', 'aie'],
        ['que tu', 'parles', 'finisses', 'sois', 'aies'],
        ['qu\'il/elle', 'parle', 'finisse', 'soit', 'ait'],
        ['que nous', 'parlions', 'finissions', 'soyons', 'ayons'],
        ['que vous', 'parliez', 'finissiez', 'soyez', 'ayez'],
        ['qu\'ils/elles', 'parlent', 'finissent', 'soient', 'aient'],
      ]
    },
    b1note: "En A2, tu utilisais l'indicatif avec 'je veux que'. En B1, tu dois utiliser le subjonctif : 'Je veux qu'il VIENNE' (pas 'viendra'). Le subjonctif exprime la subjectivité — volonté, émotion, doute — par opposition à l'indicatif qui exprime des faits objectifs.",
    examples: [
      "Il faut que tu finisses tes devoirs avant de sortir. (obligation → il faut que + subjonctif)",
      "Je suis content que vous soyez là. (émotion → être content que + subjonctif de être)",
      "Bien qu'il fasse froid, elle sort sans manteau. (concession → bien que + subjonctif de faire)",
    ],
    fills: [
      { s: "Il faut que tu ___ (finir) tes devoirs.", opts: ["finisses", "finis", "finiras", "as fini"], a: 0, fb: "Il faut que → subjonctif obligatoire. 'Finir' → radical finiss- (de ils finissent) → tu finisses." },
      { s: "Je veux qu'il ___ (venir) à la réunion.", opts: ["vienne", "vient", "viendra", "est venu"], a: 0, fb: "Vouloir que → subjonctif. 'Venir' irrégulier : que je vienne, tu viennes, il vienne, ils viennent." },
      { s: "Bien qu'elle ___ (être) fatiguée, elle continue à travailler.", opts: ["soit", "est", "était", "sera"], a: 0, fb: "Bien que → subjonctif. 'Être' → que je sois, tu sois, il soit. 'Soit' est la 3e personne du subjonctif." },
      { s: "Je suis content que vous ___ (pouvoir) venir.", opts: ["puissiez", "pouvez", "pouvez", "pourrez"], a: 0, fb: "Être content que → subjonctif. 'Pouvoir' irrégulier : que je puisse, tu puisses, il puisse, vous puissiez." },
      { s: "Il est important que nous ___ (avoir) un plan.", opts: ["ayons", "avons", "aurons", "avions"], a: 0, fb: "Il est important que → subjonctif. 'Avoir' irrégulier : que j'aie, tu aies, il ait, nous ayons." },
    ],
    transforms: [
      { prompt: "Transforme avec 'il faut que' + subjonctif :", s: "Tu dois parler à ton professeur.", opts: ["Il faut que tu parles à ton professeur.", "Il faut que tu parles au ton professeur.", "Il faut que tu parlais à ton professeur.", "Il faut tu parles à ton professeur."], a: 0, fb: "'Il faut que' + subjonctif. 'Parler' régulier → radical parl- → tu parles. Ne pas oublier 'que' entre 'il faut' et le sujet." },
      { prompt: "Transforme à l'indicatif → subjonctif après 'je doute que' :", s: "Il comprend la situation.", opts: ["Je doute qu'il comprenne la situation.", "Je doute qu'il comprend la situation.", "Je doute qu'il comprenait la situation.", "Je doute qu'il comprendra la situation."], a: 0, fb: "Douter que → subjonctif. 'Comprendre' → radical comprenn- (de ils comprennent) → il comprenne." },
      { prompt: "Relie avec 'pour que' + subjonctif :", s: "Je t'explique. / Tu comprends.", opts: ["Je t'explique pour que tu comprennes.", "Je t'explique pour que tu comprends.", "Je t'explique pour tu comprennes.", "Je t'explique afin que tu comprendras."], a: 0, fb: "'Pour que' → subjonctif. 'Comprendre' → tu comprennes. 'Pour que' (sans que) + infinitif si même sujet, mais ici sujets différents → pour que + subjonctif." },
    ],
    errors: [
      { s: "Il veut que je viens chez lui demain.", q: "Quelle est l'erreur ?", opts: ["'viens' doit être 'vienne' (vouloir que → subjonctif)", "'veut' doit être 'voudrait'", "'chez lui' doit être 'chez le'", "Pas d'erreur"], a: 0, fb: "Vouloir que → subjonctif. 'Venir' irrégulier : que je VIENNE (pas 'viens'). Correcte : 'Il veut que je VIENNE chez lui demain.'" },
      { s: "Bien qu'il est tard, continuons à travailler.", q: "Quelle est l'erreur ?", opts: ["'est' doit être 'soit' (bien que → subjonctif de être)", "'tard' doit être 'tarder'", "'continuons' doit être 'continue'", "Pas d'erreur"], a: 0, fb: "Bien que → subjonctif obligatoire. 'Être' → que je sois, il SOIT. Correcte : 'Bien qu'il SOIT tard, continuons à travailler.'" },
    ],
    production: "Écris 4 phrases en utilisant le subjonctif : 1) avec 'il faut que', 2) avec 'je veux que', 3) avec 'bien que', 4) avec 'pour que'. Utilise des verbes différents (être, avoir, faire, venir, aller).",
  },
  {
    id: 'conditionnel',
    title: 'Conditionnel présent',
    icon: '🎭',
    rule: "Le conditionnel présent = radical du futur simple + terminaisons de l'imparfait (-ais, -ais, -ait, -ions, -iez, -aient). Usages : (1) politesse (Je voudrais un café), (2) hypothèse (Si j'avais de l'argent, je voyagerais), (3) information non confirmée (Le premier ministre serait malade), (4) souhait (J'aimerais visiter le Japon).",
    tip: "Radicaux irréguliers au futur/conditionnel : être → ser- ; avoir → aur- ; aller → ir- ; faire → fer- ; vouloir → voudr- ; pouvoir → pourr- ; savoir → saur- ; venir → viendr-. Les terminaisons sont toujours régulières : -ais, -ais, -ait, -ions, -iez, -aient.",
    table: {
      headers: ['Pronom', 'voyager (régulier)', 'être (irrégulier)', 'pouvoir (irrégulier)'],
      rows: [
        ['je', 'voyagerais', 'serais', 'pourrais'],
        ['tu', 'voyagerais', 'serais', 'pourrais'],
        ['il/elle', 'voyagerait', 'serait', 'pourrait'],
        ['nous', 'voyagerions', 'serions', 'pourrions'],
        ['vous', 'voyageriez', 'seriez', 'pourriez'],
        ['ils/elles', 'voyageraient', 'seraient', 'pourraient'],
      ]
    },
    b1note: "En A2, tu utilisais 'je voudrais' comme formule isolée. En B1, tu comprends la structure complète du conditionnel et tu sais l'utiliser dans des hypothèses (Si + imparfait → conditionnel), dans le registre journalistique (information au conditionnel = non confirmée) et dans les souhaits complexes.",
    examples: [
      "Pourriez-vous m'aider, s'il vous plaît ? (politesse formelle → conditionnel de pouvoir)",
      "Si j'avais plus de temps, je lirais davantage. (hypothèse irréelle — Si + imparfait → conditionnel)",
      "Selon les médias, le président démissionnerait demain. (information non confirmée — conditionnel journalistique)",
    ],
    fills: [
      { s: "Si j'avais le temps, je ___ (voyager) plus souvent.", opts: ["voyagerais", "voyagerai", "voyageais", "voyage"], a: 0, fb: "Structure hypothétique : Si + imparfait → conditionnel. 'Voyager' → voyager- + -ais = voyagerais." },
      { s: "___ -vous m'expliquer ce problème ? (pouvoir — politesse)", opts: ["Pourriez", "Pouvez", "Pourrez", "Puissiez"], a: 0, fb: "Politesse formelle → conditionnel. 'Pouvoir' irrégulier : radical pourr- + terminaison -iez = pourriez. Inversion pour la question." },
      { s: "Elle ___ (aimer) vivre à Paris un jour.", opts: ["aimerait", "aimera", "aimait", "aime"], a: 0, fb: "Souhait/désir → conditionnel. 'Aimer' régulier → aimer- + -ait = aimerait." },
      { s: "Selon les sources, il ___ (être) impliqué dans le scandale.", opts: ["serait", "est", "sera", "était"], a: 0, fb: "Information non confirmée (style journalistique) → conditionnel. 'Être' irrégulier : radical ser- + -ait = serait." },
      { s: "Nous ___ (devoir) partir avant minuit.", opts: ["devrions", "devions", "devrons", "dûmes"], a: 0, fb: "Conseil/obligation polie → conditionnel. 'Devoir' irrégulier : radical devr- + -ions = devrions." },
    ],
    transforms: [
      { prompt: "Transforme la demande directe en demande polie (conditionnel) :", s: "Je veux un verre d'eau.", opts: ["Je voudrais un verre d'eau.", "Je voulais un verre d'eau.", "Je voudrai un verre d'eau.", "Je voudraii un verre d'eau."], a: 0, fb: "'Vouloir' au conditionnel : radical voudr- + -ais = voudrais. Transforme 'je veux' (présent direct) → 'je voudrais' (conditionnel poli)." },
      { prompt: "Complète la phrase hypothétique :", s: "Si elle étudiait plus, elle ___ (réussir) ses examens.", opts: ["réussirait", "réussira", "réussirait-elle", "réussissait"], a: 0, fb: "Si + imparfait → conditionnel. 'Réussir' → réussir- + -ait = réussirait. Ne jamais mettre le conditionnel dans la proposition avec 'si'." },
      { prompt: "Reformule en style journalistique (conditionnel de doute) :", s: "Le gouvernement va augmenter les impôts. (selon les sources)", opts: ["Selon les sources, le gouvernement augmenterait les impôts.", "Selon les sources, le gouvernement augmentait les impôts.", "Selon les sources, le gouvernement va augmenter les impôts.", "Selon les sources, le gouvernement augmentera les impôts."], a: 0, fb: "Information non confirmée → conditionnel. 'Augmenter' → augmenter- + -ait = augmenterait. C'est le conditionnel journalistique qui indique l'incertitude." },
    ],
    errors: [
      { s: "Si tu aurais de la chance, tu gagnerais.", q: "Quelle est l'erreur ?", opts: ["'aurais' doit être 'avais' (Si + imparfait, jamais conditionnel)", "'gagnerais' doit être 'gagneras'", "'de la' doit être 'du'", "Pas d'erreur"], a: 0, fb: "Règle absolue : JAMAIS de conditionnel dans la proposition introduite par 'si'. Toujours Si + IMPARFAIT → conditionnel. Correcte : 'Si tu AVAIS de la chance, tu gagnerais.'" },
      { s: "Je voudrais que tu viendrais me voir.", q: "Quelle est l'erreur ?", opts: ["'viendrais' doit être 'viennes' (vouloir que → subjonctif, pas conditionnel)", "'voudrais' doit être 'veux'", "'me voir' doit être 'me voir-ais'", "Pas d'erreur"], a: 0, fb: "Vouloir que → subjonctif, jamais conditionnel. Correcte : 'Je voudrais que tu VIENNES me voir.' Le conditionnel 'voudrais' est correct pour la politesse, mais après 'que', il faut le subjonctif." },
    ],
    production: "Écris 4-5 phrases sur ce que tu ferais si tu avais une semaine de vacances illimitées et de l'argent sans limite. Utilise le conditionnel : je ferais, j'irais, je visiterais, je mangerais, je rencontrerais...",
  },
  {
    id: 'pronoms_relatifs',
    title: 'Pronoms relatifs : qui, que, dont, où',
    icon: '🔗',
    rule: "QUI = sujet de la relative (remplace un sujet). QUE/QU' = complément d'objet direct (remplace un COD). DONT = complément introduit par DE (avoir besoin de, parler de, être fier de). OÙ = complément de lieu ou de temps. Ces pronoms permettent de relier deux phrases en une seule proposition relative.",
    tip: "Test rapide : QUI (sujet — fait l'action) → 'L'homme qui parle est mon ami.' / QUE (COD — reçoit l'action) → 'Le livre que je lis est fascinant.' / DONT (après de) → 'Le film dont je parle est récent.' / OÙ (lieu/temps) → 'La ville où je vis est belle.' / 'Le jour où je suis né...'",
    table: {
      headers: ['Pronom', 'Fonction', 'Exemple'],
      rows: [
        ['qui', 'sujet', "L'homme qui parle est directeur."],
        ['que/qu\'', 'COD', "Le film que j'ai vu est excellent."],
        ['dont', 'complément de de', "C'est le livre dont j'avais besoin."],
        ['où', 'lieu / temps', "La ville où je travaille est Lyon."],
      ]
    },
    b1note: "En A2, tu construisais des phrases courtes: 'Je lis un livre. Le livre est intéressant.' En B1, tu relies ces phrases: 'Le livre que je lis est intéressant.' Maîtriser les pronoms relatifs transforme ton français de basique en fluide et naturel.",
    examples: [
      "La personne qui a appelé ce matin est ma collègue. (qui = sujet de 'a appelé')",
      "Le rapport que tu as envoyé contient des erreurs. (que = COD de 'as envoyé' — accord du participe)",
      "C'est le projet dont nous avons discuté hier. (dont = 'nous avons discuté DE ce projet')",
    ],
    fills: [
      { s: "La personne ___ a téléphoné est ta sœur.", opts: ["qui", "que", "dont", "où"], a: 0, fb: "'Qui' remplace le sujet (la personne fait l'action de téléphoner). Test: 'La personne [suj.] a téléphoné' → QUI." },
      { s: "Le roman ___ j'ai lu est magnifique.", opts: ["que", "qui", "dont", "où"], a: 0, fb: "'Que' remplace le COD (j'ai lu QUOI ? → le roman). Test: 'j'ai lu [COD] le roman' → QUE. Au passé avec avoir, le participe s'accorde: lu(e)." },
      { s: "C'est le quartier ___ j'habitais enfant.", opts: ["où", "que", "qui", "dont"], a: 0, fb: "'Où' remplace un lieu (j'habitais DANS ce quartier). Test: complément de lieu → OÙ." },
      { s: "Le médicament ___ il a besoin n'est pas disponible.", opts: ["dont", "que", "qui", "où"], a: 0, fb: "'Dont' remplace le complément introduit par DE (avoir besoin DE). Test: 'avoir besoin de...' → DONT." },
      { s: "La ville ___ je suis né est au bord de la mer.", opts: ["où", "que", "qui", "dont"], a: 0, fb: "'Où' peut remplacer un lieu de naissance. 'Je suis né DANS cette ville' → OÙ." },
    ],
    transforms: [
      { prompt: "Relie les deux phrases avec 'que' :", s: "J'ai regardé un documentaire. Le documentaire était fascinant.", opts: ["Le documentaire que j'ai regardé était fascinant.", "Le documentaire qui j'ai regardé était fascinant.", "Le documentaire dont j'ai regardé était fascinant.", "Le documentaire j'ai regardé était fascinant."], a: 0, fb: "'J'ai regardé QUOI ? → le documentaire = COD → QUE. 'Le documentaire QUE j'ai regardé était fascinant.' Avec avoir, le participe s'accorde avec le COD avant: regardé (masc. sing., pas de changement)." },
      { prompt: "Relie avec 'dont' :", s: "Je parle d'un projet. Le projet est innovant.", opts: ["Le projet dont je parle est innovant.", "Le projet que je parle est innovant.", "Le projet qui je parle est innovant.", "Le projet de je parle est innovant."], a: 0, fb: "'Parler DE...' → le projet remplace un complément en 'de' → DONT. 'Le projet DONT je parle est innovant.'" },
      { prompt: "Relie avec le bon pronom relatif :", s: "C'est un restaurant. Nous mangeons souvent dans ce restaurant.", opts: ["C'est un restaurant où nous mangeons souvent.", "C'est un restaurant que nous mangeons souvent.", "C'est un restaurant qui nous mangeons souvent.", "C'est un restaurant dont nous mangeons souvent."], a: 0, fb: "'Manger DANS ce restaurant' → lieu → OÙ. 'C'est un restaurant OÙ nous mangeons souvent.'" },
    ],
    errors: [
      { s: "La femme dont travaille ici est ma directrice.", q: "Quelle est l'erreur ?", opts: ["'dont' doit être 'qui' (sujet de travaille)", "'dont' doit être 'que'", "'ici' doit être 'là'", "Pas d'erreur"], a: 0, fb: "'Travaille' est le verbe de la relative — sa femme est le SUJET → QUI. 'La femme QUI travaille ici est ma directrice.' DONT s'utilise avec des verbes suivis de DE." },
      { s: "Le film que j'ai parlé était ennuyeux.", q: "Quelle est l'erreur ?", opts: ["'que' doit être 'dont' (parler de → dont)", "'que' doit être 'qui'", "'ennuyeux' doit être 'ennuyeuse'", "Pas d'erreur"], a: 0, fb: "'Parler DE quelque chose' → DONT. 'Le film DONT j'ai parlé était ennuyeux.' QUE remplace le COD (sans préposition), DONT remplace le complément avec DE." },
    ],
    production: "Décris ta ville idéale ou un lieu qui te tient à cœur. Écris 4-5 phrases en utilisant : au moins 1 fois 'qui', 1 fois 'que', 1 fois 'dont' et 1 fois 'où'.",
  },
  {
    id: 'plus_que_parfait',
    title: 'Plus-que-parfait',
    icon: '⏮️',
    rule: "Le plus-que-parfait exprime une action passée ANTÉRIEURE à une autre action passée. Formation : imparfait de AVOIR ou ÊTRE + participe passé. Usages : (1) antériorité (Il avait déjà mangé quand je suis arrivé), (2) dans le discours indirect pour rapporter un passé (Elle a dit qu'elle était partie), (3) dans les hypothèses passées (Si j'avais su...).",
    tip: "Règle d'or : Le PQP exprime TOUJOURS quelque chose qui s'est passé AVANT un autre moment du passé. 'Quand tu as appelé, j'avais déjà mangé' = tu as appelé (passé composé) et avant ça, j'avais mangé (PQP = encore plus loin dans le passé).",
    table: {
      headers: ['Pronom', 'PQP avec avoir (manger)', 'PQP avec être (partir)'],
      rows: [
        ['j\'', "j'avais mangé", "j'étais parti(e)"],
        ['tu', "tu avais mangé", "tu étais parti(e)"],
        ['il/elle', "il/elle avait mangé", "il était parti / elle était partie"],
        ['nous', "nous avions mangé", "nous étions parti(e)s"],
        ['vous', "vous aviez mangé", "vous étiez parti(e)(s)"],
        ['ils/elles', "ils/elles avaient mangé", "ils étaient partis / elles étaient parties"],
      ]
    },
    b1note: "En A2, tu utilisais le passé composé pour toutes les actions passées. En B1, tu maîtrises la chronologie : PQP pour ce qui s'est passé EN PREMIER, puis passé composé pour ce qui s'est passé ENSUITE. Cette nuance rend ton français bien plus précis et naturel.",
    examples: [
      "Quand je suis arrivé à la gare, le train était déjà parti. (PQP = le train est parti AVANT mon arrivée)",
      "Elle m'a dit qu'elle avait fini son travail. (discours indirect : le travail était fini AVANT qu'elle le dise)",
      "Si j'avais étudié plus, j'aurais réussi l'examen. (hypothèse passée irréelle — Si + PQP → conditionnel passé)",
    ],
    fills: [
      { s: "Quand tu as appelé, j'___ (déjà / manger).", opts: ["avais déjà mangé", "ai déjà mangé", "avais déjà mange", "étais déjà mangé"], a: 0, fb: "Antériorité : 'avais mangé' (PQP) = action terminée AVANT 'as appelé' (passé composé). Manger → auxiliaire AVOIR → avais mangé." },
      { s: "Elle ___ (partir) avant notre arrivée.", opts: ["était partie", "est partie", "avait parti", "partait"], a: 0, fb: "Partir → auxiliaire ÊTRE → était partie. Accord féminin singulier : partie. PQP indique que le départ a eu lieu AVANT notre arrivée." },
      { s: "Il a raconté qu'il ___ (vivre) en France pendant 5 ans.", opts: ["avait vécu", "a vécu", "vivait", "aurait vécu"], a: 0, fb: "Discours indirect : l'action de vivre en France est antérieure au moment où il raconte → PQP. 'Vivre' → avait vécu." },
      { s: "Nous ___ (ne jamais voir) la mer avant ce voyage.", opts: ["n'avions jamais vu", "n'avons jamais vu", "ne voyions jamais", "n'aurions jamais vu"], a: 0, fb: "PQP négatif : n'avions jamais vu. L'action de voir la mer n'avait PAS eu lieu avant le voyage. Négation : n'avions + jamais + participe." },
      { s: "Les invités ___ (arriver) quand nous avons commencé à préparer.", opts: ["étaient arrivés", "sont arrivés", "avaient arrivé", "arrivaient"], a: 0, fb: "Les invités sont arrivés AVANT qu'on commence à préparer → PQP. 'Arriver' → être → étaient arrivés. Accord masculin pluriel." },
    ],
    transforms: [
      { prompt: "Mets en ordre chronologique avec le PQP :", s: "Il a mangé. Ensuite, il est sorti. (réécrire en une phrase)", opts: ["Quand il est sorti, il avait déjà mangé.", "Quand il est sorti, il a déjà mangé.", "Quand il était sorti, il avait déjà mangé.", "Il est sorti et il a mangé."], a: 0, fb: "Manger AVANT sortir → PQP pour manger. 'Quand il est sorti (passé composé), il avait déjà mangé (PQP — action antérieure).' L'adverbe 'déjà' renforce l'antériorité." },
      { prompt: "Transforme en discours indirect avec PQP :", s: "Marie : 'J'ai visité Paris.' (Elle a dit que...)", opts: ["Elle a dit qu'elle avait visité Paris.", "Elle a dit qu'elle a visité Paris.", "Elle a dit qu'elle visitait Paris.", "Elle a dit qu'elle allait visiter Paris."], a: 0, fb: "Discours indirect : passé composé → PQP dans les propositions introduites par 'il a dit que, elle a dit que'. 'J'ai visité' → 'elle avait visité'." },
      { prompt: "Forme une hypothèse passée avec Si + PQP :", s: "Je n'ai pas vu l'annonce. Je n'ai pas postulé. (Si j'avais vu...)", opts: ["Si j'avais vu l'annonce, j'aurais postulé.", "Si j'avais vu l'annonce, j'aurais postulé-je.", "Si je voyais l'annonce, j'aurais postulé.", "Si j'avais vu l'annonce, je postulais."], a: 0, fb: "Hypothèse passée irréelle : Si + PQP → conditionnel passé. 'Si j'AVAIS VU (PQP) → j'AURAIS POSTULÉ (conditionnel passé). C'est une hypothèse qui ne s'est pas réalisée dans le passé." },
    ],
    errors: [
      { s: "Quand elle est arrivée, il a déjà parti.", q: "Quelle est l'erreur ?", opts: ["'a déjà parti' doit être 'était déjà parti' (PQP pour l'antériorité)", "'est arrivée' doit être 'arrivait'", "'Quand' doit être 'Lorsque'", "Pas d'erreur"], a: 0, fb: "Le départ est antérieur à l'arrivée → PQP. 'Partir' → être → ÉTAIT parti. 'Il ÉTAIT déjà parti' quand elle est arrivée." },
      { s: "Si j'aurais su, je t'aurais appelé.", q: "Quelle est l'erreur ?", opts: ["'aurais su' doit être 'avais su' (Si + PQP, jamais conditionnel)", "'aurais appelé' doit être 'avais appelé'", "'Si' doit être 'Quand'", "Pas d'erreur"], a: 0, fb: "Règle absolue : JAMAIS de conditionnel après 'si'. Hypothèse passée : Si + PQP → conditionnel passé. Correcte : 'Si j'AVAIS su (PQP), je t'aurais appelé (conditionnel passé).'" },
    ],
    production: "Raconte un moment où tu es arrivé(e) quelque part et quelque chose s'était déjà passé. Utilise le PQP au moins 2 fois et le passé composé. Exemple : 'Quand je suis entré(e) dans la salle, la conférence avait déjà commencé...'",
  },
  {
    id: 'discours_indirect',
    title: 'Discours indirect',
    icon: '💬',
    rule: "Le discours indirect rapporte les paroles de quelqu'un sans guillemets. Changements obligatoires : (1) pronoms et possessifs (je → il/elle), (2) temps verbaux si le verbe introducteur est au passé : présent → imparfait, passé composé → PQP, futur → conditionnel, (3) expressions de temps (maintenant → alors, demain → le lendemain). Pour les questions : si/est-ce que pour les questions oui/non ; mot interrogatif pour les autres.",
    tip: "Structures clés : il dit QUE + indicatif (déclaration) / il demande SI + indicatif (question oui/non) / il demande + mot interrogatif + ordre normal (question directe → discours indirect avec mot interrogatif sans inversion).",
    table: {
      headers: ['Discours direct', 'Discours indirect (passé)', 'Changement'],
      rows: [
        ['"Je mange."', 'Il a dit qu\'il mangeait.', 'présent → imparfait'],
        ['"J\'ai mangé."', 'Il a dit qu\'il avait mangé.', 'passé composé → PQP'],
        ['"Je mangerai."', 'Il a dit qu\'il mangerait.', 'futur → conditionnel'],
        ['"Est-ce que tu viens ?"', 'Il a demandé si tu venais.', 'question → si + ind.'],
        ['"Où es-tu ?"', 'Il a demandé où j\'étais.', 'mot interr. + ordre normal'],
      ]
    },
    b1note: "En A2, tu citais directement les paroles avec guillemets. En B1, tu maîtrises le discours indirect — une compétence essentielle pour résumer des conversations, des articles et des réunions. C'est indispensable pour le DELF B1.",
    examples: [
      "Il m'a dit qu'il viendrait demain. (direct: 'Je viendrai demain' → conditionnel au discours indirect passé)",
      "Elle a demandé si j'avais compris la leçon. (direct: 'Est-ce que tu as compris la leçon ?')",
      "Le directeur a annoncé que la réunion aurait lieu le lendemain. (direct: 'La réunion aura lieu demain.')",
    ],
    fills: [
      { s: "Elle a dit qu'elle ___ (être) fatiguée.", opts: ["était", "est", "sera", "avait été"], a: 0, fb: "Discours indirect au passé : présent → imparfait. 'Je SUIS fatiguée' → 'Elle a dit qu'elle ÉTAIT fatiguée.'" },
      { s: "Il m'a demandé ___ je voulais du café.", opts: ["si", "que", "est-ce que", "quand"], a: 0, fb: "Question fermée (oui/non) au discours indirect → 'SI'. 'Est-ce que tu veux du café ?' → 'Il m'a demandé SI je voulais du café.'" },
      { s: "Le prof a expliqué ___ nous devions étudier pour l'examen.", opts: ["que", "si", "quoi", "pourquoi que"], a: 0, fb: "Déclaration au discours indirect → 'QUE'. 'Vous devez étudier' → 'Le prof a expliqué QUE nous devions étudier.'" },
      { s: "Elle a demandé où ___ (habiter — tu) .", opts: ["tu habitais", "tu habites", "habitais-tu", "tu habiteras"], a: 0, fb: "Question avec mot interrogatif 'où' → ordre normal (pas d'inversion). Passé → imparfait. 'Où habites-tu ?' → 'Elle a demandé où TU HABITAIS.'" },
      { s: "Il a annoncé qu'il ___ (partir) le lendemain.", opts: ["partirait", "partira", "partait", "est parti"], a: 0, fb: "Futur → conditionnel au discours indirect passé. 'Je partirai demain' → 'il a annoncé qu'il PARTIRAIT le lendemain.' Note: 'demain' → 'le lendemain'." },
    ],
    transforms: [
      { prompt: "Transforme en discours indirect (verbe introducteur au passé) :", s: "Marie : 'Je suis très heureuse ici.'", opts: ["Marie a dit qu'elle était très heureuse là.", "Marie a dit qu'elle est très heureuse ici.", "Marie a dit qu'elle serait très heureuse là.", "Marie a dit que je suis très heureuse ici."], a: 0, fb: "Présent → imparfait ; 'ici' → 'là' (changement déictique). Pronom 'je' → 'elle'. Marie a dit QU'ELLE ÉTAIT très heureuse LÀ." },
      { prompt: "Transforme la question en discours indirect :", s: "Thomas : 'Est-ce que vous avez terminé le rapport ?'", opts: ["Thomas a demandé si nous avions terminé le rapport.", "Thomas a demandé si vous avez terminé le rapport.", "Thomas a demandé est-ce que nous avions terminé le rapport.", "Thomas a demandé que nous avions terminé le rapport."], a: 0, fb: "Question oui/non → 'si'. Passé composé → PQP (avez terminé → avions terminé). 'vous' → 'nous' (changement de personne). Thomas a demandé SI NOUS AVIONS terminé le rapport." },
      { prompt: "Transforme la question avec mot interrogatif :", s: "La secrétaire : 'Pourquoi êtes-vous en retard ?'", opts: ["La secrétaire a demandé pourquoi nous étions en retard.", "La secrétaire a demandé pourquoi est-ce que nous étions en retard.", "La secrétaire a demandé pourquoi nous serions en retard.", "La secrétaire a demandé que nous étions en retard."], a: 0, fb: "'Pourquoi' → garde le mot interrogatif, ordre normal (pas d'inversion). Présent → imparfait. 'êtes' → 'étions'. La secrétaire a demandé POURQUOI NOUS ÉTIONS en retard." },
    ],
    errors: [
      { s: "Il a dit que je suis fatigué.", q: "Quelle est l'erreur ?", opts: ["'suis' doit être 'était' (présent → imparfait au discours indirect passé)", "'que' doit être 'si'", "'fatigué' doit être 'fatiguée'", "Pas d'erreur"], a: 0, fb: "Discours indirect passé : présent → imparfait. 'Je SUIS fatigué' → 'Il a dit qu'il ÉTAIT fatigué.' Correcte : 'Il a dit qu'il ÉTAIT fatigué.'" },
      { s: "Elle a demandé est-ce que tu avais mangé.", q: "Quelle est l'erreur ?", opts: ["'est-ce que' ne s'utilise pas au discours indirect — utiliser 'si'", "'avais mangé' doit être 'mangeais'", "'Elle' doit être 'Il'", "Pas d'erreur"], a: 0, fb: "Au discours indirect, 'est-ce que' est remplacé par 'si'. Correcte : 'Elle a demandé SI tu avais mangé.' 'Est-ce que' et l'inversion disparaissent au discours indirect." },
    ],
    production: "Résume une conversation imaginaire. Imagine que tu as parlé avec un ami/une amie. Rapporte 4-5 de ses paroles en discours indirect. Utilise : il/elle a dit que..., il/elle a demandé si..., il/elle a expliqué que..., il/elle a annoncé que...",
  },
];

export default function GramaticaFrancesB1() {
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
          <Link href="/practica/frances/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>B1</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>Grammaire</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.3rem' }}><span className="ink-line" />Francés B1</p>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.4rem', color: 'var(--ink)' }}>
          Grammaire B1 — 5 thèmes essentiels
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 2rem', lineHeight: 1.6, maxWidth: 560 }}>
          Subjonctif, conditionnel, pronoms relatifs, plus-que-parfait et discours indirect. Explications claires + exercices progressifs.
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
            📌 <strong style={{ color: 'var(--ink)' }}>vs A2 :</strong> {t.b1note}
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
                      <span style={{ display: 'inline-block', minWidth: 80, borderBottom: `2px solid ${C}`, margin: '0 3px', textAlign: 'center', verticalAlign: 'bottom' }}>
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
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Détecte l&apos;erreur</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.errors.filter((_, i) => errAns[i] !== undefined).length}/{t.errors.length}
            </span>
          </div>
          {t.errors.map((q, qi) => {
            const ans = errAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔍 Trouve l&apos;erreur</div>
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
              🔒 Complète todos los ejercicios para desbloquear la producción libre.
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
                ? 'Parfait ! Tu maîtrises ce thème B1.'
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
              <Link href="/practica/frances/b1" className="btn btn-ghost btn-sm">Retour à B1</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
