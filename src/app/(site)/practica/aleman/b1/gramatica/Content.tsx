'use client';

import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';

const guide: QuestGuide = {
  title: 'Gramática Alemán B1 — Guía de referencia',
  body: 'Los 5 temas del B1: Konjunktiv II (wäre/hätte/würde + Inf. para condiciones irreales y consejos), Relativsätze (der/die/das/dem/den según género y caso), Passiv Präsens (werden + Partizip II), Konjunktionen temporales (als vs. wenn, nachdem, während, bevor, seitdem) e Indirekte Rede (Konjunktiv I).\nProgresión desde A2: ya conoces el Perfekt, el Dativ y los verbos separables. En B1 introduces construcciones complejas: hipótesis (Konjunktiv II), oraciones de relativo con todos los casos y la voz pasiva.',
  tip: 'Konjunktiv II: NUNCA digas "würde sein" ni "würde haben" — usa las formas fuertes: wäre (sein), hätte (haben). Relativsatz: el género del pronombre relativo = género del sustantivo antecedente; el caso = función gramatical dentro de la oración relativa. Als vs. wenn: "als" sólo para eventos únicos en el pasado.',
  tableHead: ['Tema', 'Forma clave', 'Ejemplo'],
  tableRows: [
    ['Konjunktiv II', 'wäre · hätte · könnte · würde + Inf.', 'Wenn ich Zeit hätte, würde ich reisen.'],
    ['Relativsatz', 'der/die/das (Nom.) · den (Akk.M) · dem/der (Dat.)', 'der Mann, dem ich geholfen habe'],
    ['Passiv', 'werden + Partizip II', 'Das Auto wird repariert. · Die Briefe werden sortiert.'],
    ['Temporal Konj.', 'als (único/pasado) · wenn (repetido/futuro) · nachdem · während · bevor · seitdem', 'Als ich jung war · Wenn es regnet'],
    ['Indirekte Rede', 'Konj. I: komme/sei/habe · ob (J/N) · W-Wort', 'Er sagt, er komme. Sie fragt, ob...'],
  ],
};

const levels: QuestLevel[] = [
  {
    type: 'choice',
    icon: '💭',
    title: 'Konjunktiv II — Irreales und Wünsche',
    desc: 'Konjunktiv II expresa irrealidad, deseos y peticiones corteses. Formación: würde + Infinitiv (general) O formas fuertes: wäre (sein), hätte (haben), könnte (können), müsste (müssen). Wenn-Satz: "Wenn ich Zeit hätte, würde ich reisen." Consejo: "An deiner Stelle würde ich..."',
    items: [
      { text: 'Wenn ich mehr Geld ___, ___ ich eine Weltreise machen.', opts: ['hätte / würde', 'habe / werde', 'hatte / würde', 'hätte / werde'], ans: 'hätte / würde', hint: "Irrealer Bedingungssatz: wenn + Konj. II (hätte) + Hauptsatz mit würde + Infinitiv." },
      { text: 'An deiner Stelle ___ ich den Chef persönlich ansprechen.', opts: ['würde', 'werde', 'bin', 'hätte'], ans: 'würde', hint: "'An deiner Stelle' (en tu lugar) + Konjunktiv II. 'Ich WÜRDE ansprechen.'" },
      { text: 'Es ___ schön, wenn wir mehr Zeit zusammen hätten.', opts: ['wäre', 'war', 'ist', 'würde'], ans: 'wäre', hint: "'Es wäre schön, wenn...' — deseo. 'wäre' = Konj. II de 'sein'." },
      { text: 'Ohne deinen Rat ___ ich diesen Fehler ___.', opts: ['hätte / gemacht', 'hatte / gemacht', 'würde / machen', 'habe / gemacht'], ans: 'hätte / gemacht', hint: "Konjunktiv II Perfekt: hätte + Partizip II. 'HÄTTE ich... GEMACHT' (condicional pasado)." },
      { text: 'Wenn du früher aufstehen ___, ___ du den Zug nicht verpassen.', opts: ['würdest / würdest', 'wärst / würdest', 'würdest / wärst', 'wärst / wärst'], ans: 'würdest / würdest', hint: "Verbos regulares → würde-Form en ambas partes. 'WÜRDEST du... WÜRDEST du...'" },
      { text: 'Irrealer Bedingungssatz — Ich lerne mehr. Dann spreche ich besser Deutsch.', opts: ['Wenn ich mehr lernen würde, würde ich besser Deutsch sprechen.', 'Wenn ich mehr lerne, spreche ich besser Deutsch.', 'Wenn ich mehr lernte, spräche ich besser Deutsch.', 'Wenn ich mehr lernen würde, spreche ich besser Deutsch.'], ans: 'Wenn ich mehr lernen würde, würde ich besser Deutsch sprechen.', hint: 'Irrealer Bedingungssatz: wenn + Konj. II (würde lernen) + Konj. II (würde sprechen).' },
      { text: "Ratschlag mit 'An deiner Stelle' — Ich würde mehr schlafen.", opts: ['An deiner Stelle würde ich mehr schlafen.', 'An deiner Stelle ich würde mehr schlafen.', 'An ihrer Stelle würde ich mehr schlafen.', 'An deiner Stelle werde ich mehr schlafen.'], ans: 'An deiner Stelle würde ich mehr schlafen.', hint: "'An deiner Stelle' = Pos. 1 → Verb (würde) an Pos. 2, Subjekt (ich) después." },
      { text: 'Wunsch formulieren — Ich habe kein Auto. (Konj. II)', opts: ['Ich hätte gerne ein Auto.', 'Ich würde gerne ein Auto haben.', 'Ich hatte gerne ein Auto.', 'Ich hätte gern ein Auto gehabt.'], ans: 'Ich hätte gerne ein Auto.', hint: "Wunsch Gegenwart: 'hätte gerne' = Konj. II von haben. 'Ich HÄTTE gerne ein Auto.'" },
      { text: 'Fehler finden: "Wenn ich mehr Geld würde haben, würde ich reisen." — Was ist falsch?', opts: ["'würde haben' muss 'hätte' sein (haben → hätte im Konj. II)", "'reisen' muss am Ende stehen", "'mehr' muss 'viele' heißen", 'Kein Fehler'], ans: "'würde haben' muss 'hätte' sein (haben → hätte im Konj. II)", hint: "Con 'haben' SIEMPRE la forma fuerte: 'hätte' (nunca 'würde haben'). Richtig: '...Geld HÄTTE...'" },
      { text: 'Fehler finden: "Ich würde sein glücklicher, wenn ich mehr Freizeit hätte." — Was ist falsch?', opts: ["'würde sein' muss 'wäre' sein (sein → wäre im Konj. II)", "'glücklicher' muss 'glücklich' sein", "'hätte' muss 'habe' sein", 'Kein Fehler'], ans: "'würde sein' muss 'wäre' sein (sein → wäre im Konj. II)", hint: "Sein en Konjunktiv II = 'wäre' (NUNCA 'würde sein'). Richtig: 'Ich WÄRE glücklicher...'" },
    ],
  },
  {
    type: 'choice',
    icon: '🔗',
    title: 'Relativsätze — alle Kasus',
    desc: 'El Relativsatz describe un sustantivo. El pronombre relativo concuerda en género/número con el antecedente y en caso con su función en la oración relativa. Nominativo: der/die/das/die. Akkusativ: den/die/das/die. Dativ: dem/der/dem/denen. Verbo al final del Relativsatz.',
    items: [
      { text: 'Das ist der Film, ___ ich letzte Woche gesehen habe.', opts: ['den', 'der', 'dem', 'das'], ans: 'den', hint: 'Film = Maskulin. En la relativa: objeto (Akkusativ) → Maskulin Akk. = den.' },
      { text: 'Die Frau, ___ wir gestern geholfen haben, ist Ärztin.', opts: ['der', 'die', 'den', 'dem'], ans: 'der', hint: "Frau = Feminin. 'helfen' verlangt Dativ. Feminin Dativ = der." },
      { text: 'Das Haus, ___ wir kaufen möchten, kostet sehr viel.', opts: ['das', 'den', 'die', 'dem'], ans: 'das', hint: 'Haus = Neutrum. Objeto (Akkusativ). Neutrum Akk. = das.' },
      { text: 'Die Kinder, ___ die Lehrerin unterrichtet, sind sehr fleißig.', opts: ['die', 'der', 'den', 'denen'], ans: 'die', hint: "Kinder = Plural. Objeto (Akkusativ). Plural Akk. = die (igual que Nominativ)." },
      { text: 'Der Kollege, ___ ich täglich zusammenarbeite, ist sehr kompetent.', opts: ['mit dem', 'mit der', 'mit den', 'mit denen'], ans: 'mit dem', hint: "'Mit' = Dativpräposition. Kollege = Maskulin → Dativ = dem. Präposition + Rel.pronomen." },
      { text: 'Relativsatz bilden — Das ist das Restaurant. Wir haben dort gegessen.', opts: ['Das ist das Restaurant, in dem wir gegessen haben.', 'Das ist das Restaurant, das wir gegessen haben.', 'Das ist das Restaurant wo wir gegessen haben.', 'Das ist das Restaurant, dem wir gegessen haben.'], ans: 'Das ist das Restaurant, in dem wir gegessen haben.', hint: "Restaurant + Ort → Präp. 'in' + Dativ. Restaurant = Neutrum → Dativ = dem. '...IN DEM wir gegessen haben.'" },
      { text: 'Relativsatz Dativ — Ich habe einem Mann geholfen. Der Mann ist Lehrer.', opts: ['Der Mann, dem ich geholfen habe, ist Lehrer.', 'Der Mann, den ich geholfen habe, ist Lehrer.', 'Der Mann, der ich geholfen habe, ist Lehrer.', 'Der Mann, dem ich helfe, ist Lehrer.'], ans: 'Der Mann, dem ich geholfen habe, ist Lehrer.', hint: "'helfen' + Dativ. Mann = Maskulin → Dativ = dem. '...Mann, DEM ich geholfen habe...'" },
      { text: 'Relativsatz Akkusativ — Ich suche einen Job. Der Job macht Spaß.', opts: ['Ich suche einen Job, der Spaß macht und gut bezahlt ist.', 'Ich suche einen Job, den Spaß macht und gut bezahlt ist.', 'Ich suche einen Job, dem Spaß macht und gut bezahlt wird.', 'Ich suche einen Job, was Spaß macht und gut bezahlt ist.'], ans: 'Ich suche einen Job, der Spaß macht und gut bezahlt ist.', hint: "Job = Maskulin. En la relativa, 'Job' es sujeto (Nominativ) → der. 'Job, DER Spaß macht...'" },
      { text: 'Fehler finden: "Das ist die Frau, den ich in Paris getroffen habe." — Was ist falsch?', opts: ["'den' muss 'die' sein (Frau = Feminin, Akkusativ = die)", "'getroffen' muss 'treffen' heißen", "'Paris' muss mit Artikel stehen", 'Kein Fehler'], ans: "'den' muss 'die' sein (Frau = Feminin, Akkusativ = die)", hint: "Frau = Feminin. Akkusativ Feminin = 'die' (no 'den' = Maskulin-Akkusativ)." },
      { text: 'Fehler finden: "Ich mag die Menschen, denen sind immer ehrlich." — Was ist falsch?', opts: ["'denen' muss 'die' sein — Nominativ Plural im Relativsatz = die", "'denen' ist korrekt", "'ehrlich' muss 'ehrliche' heißen", 'Kein Fehler'], ans: "'denen' muss 'die' sein — Nominativ Plural im Relativsatz = die", hint: "'Menschen' = Plural. Sujeto en la relativa → Nominativ Plural = 'die'. 'denen' = Dativ Plural." },
    ],
  },
  {
    type: 'choice',
    icon: '🔄',
    title: 'Passiv Präsens — werden + Partizip II',
    desc: 'Passiv Präsens = werden (conjugado) + Partizip II. El sujeto del activo se vuelve "von + Dativ" (opcional). El objeto del activo se vuelve sujeto en el pasivo. Énfasis en la acción, no en el agente. Frecuente en alemán para reglas, instrucciones y procesos.',
    items: [
      { text: 'Das Paket ___ morgen ___.', opts: ['wird / geliefert', 'ist / geliefert', 'werde / geliefert', 'wird / liefern'], ans: 'wird / geliefert', hint: "Passiv Präsens = werden + Partizip II. 'Das Paket WIRD morgen GELIEFERT.' (liefern → geliefert)." },
      { text: 'In dieser Schule ___ Englisch und Französisch ___.', opts: ['werden / unterrichtet', 'wird / unterrichtet', 'werden / unterrichten', 'wird / unterrichten'], ans: 'werden / unterrichtet', hint: "Subjekt = 'Englisch und Französisch' = Plural → werden. Partizip II = unterrichtet." },
      { text: 'Der Bericht ___ von der Sekretärin ___.', opts: ['wird / geschrieben', 'ist / geschrieben', 'wird / schreiben', 'wirst / geschrieben'], ans: 'wird / geschrieben', hint: "Passiv: werden + Partizip II. Agente con 'von + Dativ'. 'Der Bericht WIRD ... GESCHRIEBEN.'" },
      { text: 'Die Tür ___ täglich um 18 Uhr ___.', opts: ['wird / geschlossen', 'wird / schließen', 'ist / geschlossen', 'werde / geschlossen'], ans: 'wird / geschlossen', hint: "'die Tür' = Singular → wird. schließen → geschlossen. 'Die Tür WIRD ... GESCHLOSSEN.'" },
      { text: 'Diese Produkte ___ in vielen Ländern ___.', opts: ['werden / verkauft', 'wird / verkauft', 'werden / verkaufen', 'werden / geverkauft'], ans: 'werden / verkauft', hint: "Produkte = Plural → werden. verkaufen → verkauft (sin ge- con prefijo ver-)." },
      { text: 'Aktiv → Passiv — Der Mechaniker repariert das Auto.', opts: ['Das Auto wird vom Mechaniker repariert.', 'Das Auto ist vom Mechaniker repariert.', 'Das Auto wird den Mechaniker repariert.', 'Das Auto werde vom Mechaniker repariert.'], ans: 'Das Auto wird vom Mechaniker repariert.', hint: "Objeto (das Auto) → sujeto. Sujeto (der Mechaniker) → 'vom Mechaniker' (von + Dativ). 'WIRD ... REPARIERT.'" },
      { text: 'Passiv → Aktiv — Die Straße wird gerade von der Stadt gebaut.', opts: ['Die Stadt baut gerade die Straße.', 'Die Straße baut gerade die Stadt.', 'Die Stadt wird gerade die Straße bauen.', 'Von der Stadt baut die Straße gerade.'], ans: 'Die Stadt baut gerade die Straße.', hint: "'von der Stadt' → sujeto en activo. 'die Straße' → objeto en activo. 'Die Stadt BAUT die Straße.'" },
      { text: 'Passiv ohne Agens — Man spricht in Österreich Deutsch.', opts: ['In Österreich wird Deutsch gesprochen.', 'In Österreich ist Deutsch gesprochen.', 'Deutsch wird in Österreich sprechen.', 'In Österreich spricht Deutsch.'], ans: 'In Österreich wird Deutsch gesprochen.', hint: "'Man' + Aktiv → Passiv sin agente. 'Deutsch' (objeto) → sujeto. 'WIRD ... GESPROCHEN.' (sprechen → gesprochen, irregular)." },
      { text: 'Fehler finden: "Das Essen wird von dem Koch kocht." — Was ist falsch?', opts: ["'kocht' muss 'gekocht' sein — Passiv braucht Partizip II", "'von dem Koch' muss 'vom Koch' sein", "'Das Essen' muss am Ende stehen", 'Kein Fehler'], ans: "'kocht' muss 'gekocht' sein — Passiv braucht Partizip II", hint: "Passiv = werden + PARTIZIP II. kochen → gekocht. Richtig: '...vom Koch GEKOCHT.'" },
      { text: 'Fehler finden: "Die Briefe wird täglich sortiert." — Was ist falsch?', opts: ["'wird' muss 'werden' sein (Briefe = Plural)", "'sortiert' muss 'sortieren' sein", "'täglich' muss 'jeden Tag' heißen", 'Kein Fehler'], ans: "'wird' muss 'werden' sein (Briefe = Plural)", hint: "Passiv: werden concuerda con el sujeto. 'Die Briefe' = Plural → WERDEN. Richtig: 'Die Briefe WERDEN täglich sortiert.'" },
    ],
  },
  {
    type: 'choice',
    icon: '⏰',
    title: 'Temporale Konjunktionen',
    desc: 'Als (cuando — único, pasado) vs. wenn (cuando — repetido, o futuro). Nachdem (después de que; Zeitversatz: nachdem + Perfekt/Plusq. → Präsens/Prät.). Bevor (antes de que). Während (mientras — simultáneo). Seitdem (desde que — hasta ahora). En todos: verbo al final del Nebensatz.',
    items: [
      { text: '_____ ich klein war, wollte ich Astronaut werden.', opts: ['Als', 'Wenn', 'Nachdem', 'Bevor'], ans: 'Als', hint: "'Als' = situación única en el pasado. 'Als ich klein war' = toda la infancia (no repetido)." },
      { text: '_____ es regnet, nehme ich immer einen Regenschirm mit.', opts: ['Wenn', 'Als', 'Nachdem', 'Seitdem'], ans: 'Wenn', hint: "'Wenn' = acción repetida ('immer'). 'WENN es regnet, nehme ich immer...' (reacción habitual)." },
      { text: '_____ er sein Studium abgeschlossen hatte, fand er sofort einen Job.', opts: ['Nachdem', 'Bevor', 'Als', 'Seitdem'], ans: 'Nachdem', hint: "'Nachdem' = secuencia temporal. 'NACHDEM er ... abgeschlossen HATTE (Plusquamperfekt), fand er (Prät.)'" },
      { text: '_____ sie schläft, lese ich Bücher.', opts: ['Während', 'Als', 'Bevor', 'Nachdem'], ans: 'Während', hint: "'Während' = simultaneidad. 'WÄHREND sie schläft, lese ich.' (las dos acciones ocurren a la vez)." },
      { text: '_____ ich Deutsch lerne, fühle ich mich selbstsicherer.', opts: ['Seitdem', 'Bevor', 'Als', 'Während'], ans: 'Seitdem', hint: "'Seitdem' = desde un punto en el pasado hasta ahora (acción continua). 'SEITDEM ich Deutsch lerne...'" },
      { text: 'Konjunktion wählen — Er kommt nach Hause. Dann isst er. (nacheinander, Vergangenheit)', opts: ['Nachdem er nach Hause gekommen war, aß er.', 'Als er nach Hause gekommen war, aß er.', 'Bevor er nach Hause kam, aß er.', 'Während er nach Hause kam, aß er.'], ans: 'Nachdem er nach Hause gekommen war, aß er.', hint: "'Nachdem' = secuencia. Zeitversatz: 'NACHDEM er ... GEKOMMEN WAR (Plusq.), aß er (Prät.).'" },
      { text: "Satz mit 'bevor' bilden — Ich lerne die Vokabeln. Dann mache ich die Prüfung.", opts: ['Bevor ich die Prüfung mache, lerne ich die Vokabeln.', 'Bevor ich die Vokabeln lerne, mache ich die Prüfung.', 'Als ich die Vokabeln lernte, machte ich die Prüfung.', 'Nachdem ich die Vokabeln lerne, mache ich die Prüfung.'], ans: 'Bevor ich die Prüfung mache, lerne ich die Vokabeln.', hint: "'Bevor' = antes de que. Primero: Vokabeln, después: Prüfung. El verbo va al final del Bevor-Satz." },
      { text: "'als' oder 'wenn' — Ich war nervös. (nur bei meiner ersten Prüfung)", opts: ['Als ich meine erste Prüfung hatte, war ich nervös.', 'Wenn ich meine erste Prüfung hatte, war ich nervös.', 'Seitdem ich meine erste Prüfung hatte, war ich nervös.', 'Nachdem ich meine erste Prüfung hatte, war ich nervös.'], ans: 'Als ich meine erste Prüfung hatte, war ich nervös.', hint: "'Als' = evento único en el pasado (la primera prueba = solo una vez). 'Wenn' sería para CADA prueba." },
      { text: 'Fehler finden: "Als es regnet, nehme ich immer einen Schirm." — Was ist falsch?', opts: ["'Als' muss 'Wenn' sein — wiederholte Handlung (immer) braucht 'wenn'", "'regnet' muss 'regnete' heißen", "'nehme ich' muss am Ende stehen", 'Kein Fehler'], ans: "'Als' muss 'Wenn' sein — wiederholte Handlung (immer) braucht 'wenn'", hint: "'Immer' = repetición → 'wenn'. 'Als' solo para evento único. Richtig: 'WENN es regnet...'" },
      { text: 'Fehler finden: "Bevor ich das Haus verlasse, ich überprüfe den Schlüssel." — Was ist falsch?', opts: ["Wortstellung im Hauptsatz: 'überprüfe ich' (Inversion nach Nebensatz)", "'verlasse' muss am Ende stehen", "'Bevor' muss 'Wenn' heißen", 'Kein Fehler'], ans: "Wortstellung im Hauptsatz: 'überprüfe ich' (Inversion nach Nebensatz)", hint: "Después del Nebensatz viene inversión en el Hauptsatz: Verb + Subjekt. Richtig: '...verlasse, ÜBERPRÜFE ICH...'" },
    ],
  },
  {
    type: 'choice',
    icon: '💬',
    title: 'Indirekte Rede — Konjunktiv I',
    desc: 'Indirekte Rede = reportar lo que alguien dijo. Konjunktiv I (formal/prensa): er sagt, er komme/sei/habe. Konjunktiv II cuando Konj.I = Indikativ. Pregunta indirecta sí/no: "ob". Pregunta indirecta con W-Wort: el W-Wort permanece. Verbo al final de la oración indirecta.',
    items: [
      { text: 'Er sagt, er ___ morgen nicht kommen.', opts: ['könne', 'kann', 'konnte', 'würde können'], ans: 'könne', hint: "Indirekte Rede, Konjunktiv I: können → 'könne' (3ª Pers. Sing.). 'Er sagt, er KÖNNE nicht kommen.'" },
      { text: 'Sie fragt, ___ ich Zeit ___.', opts: ['ob / hätte', 'dass / habe', 'ob / habe', 'wenn / hätte'], ans: 'ob / hätte', hint: "Pregunta indirecta J/N: 'ob' + Konjunktiv. 'Hast du Zeit?' → 'ob ich Zeit HÄTTE.' (Konj.II porque 'habe' = Indikativ)." },
      { text: 'Der Zeuge berichtete, er ___ den Mann in der Bank ___.', opts: ['habe / gesehen', 'hat / gesehen', 'hätte / gesehen', 'sei / gesehen'], ans: 'habe / gesehen', hint: "Indirekte Rede Perfekt: Konjunktiv I de haben = 'habe' + Partizip II. 'Er HABE den Mann GESEHEN.'" },
      { text: 'Sie erklärt, das Problem ___ sehr kompliziert.', opts: ['sei', 'ist', 'wäre', 'sind'], ans: 'sei', hint: "Konjunktiv I de 'sein': 3ª Pers. Sing. = 'sei'. 'Das Problem SEI kompliziert.' (no 'ist' = Indikativ)." },
      { text: 'Er fragt, ___ ich ihm helfen ___.', opts: ['ob / könne', 'ob / kann', 'dass / könne', 'wenn / kann'], ans: 'ob / könne', hint: "Pregunta indirecta J/N: 'ob' + verbo al final. Konjunktiv I de können = 'könne'. 'OB ich ihm helfen KÖNNE.'" },
      { text: 'Indirekte Rede (Konjunktiv I) — Maria sagt: "Ich lerne täglich Deutsch."', opts: ['Maria sagt, sie lerne täglich Deutsch.', 'Maria sagt, sie lernt täglich Deutsch.', 'Maria sagt, dass sie täglich Deutsch lernt.', 'Maria sagt, sie würde täglich Deutsch lernen.'], ans: 'Maria sagt, sie lerne täglich Deutsch.', hint: "Konjunktiv I: lernen → lerne (3ª pers.: sie lerne). Sin 'dass' es elegante y correcto." },
      { text: 'Indirekte J/N-Frage — Er fragt: "Hast du das Buch gelesen?"', opts: ['Er fragt, ob ich das Buch gelesen habe.', 'Er fragt, dass ich das Buch gelesen habe.', 'Er fragt, ob ich das Buch gelesen hat.', 'Er fragt ob ich das Buch gelesen habe.'], ans: 'Er fragt, ob ich das Buch gelesen habe.', hint: "Pregunta indirecta J/N: 'ob' + Sujeto + ... + Verb al final. Konjunktiv I: 'habe'. Coma antes de 'ob'." },
      { text: 'Indirekte W-Frage — Sie fragt: "Warum bist du nicht gekommen?"', opts: ['Sie fragt, warum ich nicht gekommen sei.', 'Sie fragt, warum bin ich nicht gekommen.', 'Sie fragt, dass ich warum nicht gekommen sei.', 'Sie fragt ob warum ich nicht gekommen sei.'], ans: 'Sie fragt, warum ich nicht gekommen sei.', hint: "Pregunta-W indirecta: W-Wort + Sujeto + ... + Verb al final. Konjunktiv I Perfekt: 'sei gekommen'." },
      { text: 'Fehler finden: "Er sagt, dass er morgen kommt." — formelle indirekte Rede', opts: ["'kommt' muss 'komme' sein (Konjunktiv I für formelle indirekte Rede)", "'morgen' muss am Ende stehen", "'dass' muss 'ob' heißen", 'Kein Fehler — umgangssprachlich akzeptabel'], ans: "'kommt' muss 'komme' sein (Konjunktiv I für formelle indirekte Rede)", hint: "En estilo formal (prensa, informes) se usa Konjunktiv I: 'komme'. Richtig: '...er morgen KOMME.'" },
      { text: 'Fehler finden: "Er berichtet, er ist gestern dort gewesen." — Was ist falsch?', opts: ["'ist' muss 'sei' sein (Konjunktiv I von sein = sei)", "'gestern' muss am Ende stehen", "'berichtet' muss 'berichtete' heißen", 'Kein Fehler'], ans: "'ist' muss 'sei' sein (Konjunktiv I von sein = sei)", hint: "Indirekte Rede Perfekt con sein: Konjunktiv I = 'sei'. 'Er berichtet, er SEI gestern dort gewesen.'" },
    ],
  },
  {
    type: 'sprint',
    icon: '⚡',
    title: 'Sprint — alle B1-Themen!',
    desc: 'Mix de los 5 temas B1. Schreibe ohne zu zögern.',
    inputWidth: 85,
    items: [
      { text: 'Wenn ich mehr Zeit ___, würde ich reisen. (haben, Konj. II)', ans: 'hätte', hint: 'haben → hätte (forma fuerte)' },
      { text: 'An deiner Stelle ___ ich mehr Sport treiben.', ans: 'würde', hint: 'An deiner Stelle + würde + Infinitiv' },
      { text: 'Das ist der Film, ___ ich gesehen habe. (Maskulin, Akk.)', ans: 'den', hint: 'Maskulin Akkusativ → den' },
      { text: 'Die Frau, ___ ich geholfen habe, ist Ärztin. (Feminin, Dat.)', ans: 'der', hint: 'Feminin Dativ → der (helfen + Dativ)' },
      { text: 'Das Paket ___ morgen geliefert. (Passiv Sing.)', ans: 'wird', hint: 'Passiv Sing. → wird + Partizip II' },
      { text: 'Die Briefe ___ täglich sortiert. (Passiv Plural)', ans: 'werden', hint: 'Passiv Plural → werden + Partizip II' },
      { text: '___ ich klein war, wollte ich Astronaut werden. (único, pasado)', ans: 'Als', hint: 'Evento único en el pasado → Als' },
      { text: '___ es regnet, nehme ich immer einen Schirm. (repetido)', ans: 'Wenn', hint: 'Acción repetida (immer) → Wenn' },
      { text: 'Er sagt, er ___ morgen nicht kommen. (können, Konj. I)', ans: 'könne', hint: 'können → Konjunktiv I = könne' },
      { text: 'Sie erklärt, das Problem ___ sehr kompliziert. (sein, Konj. I)', ans: 'sei', hint: 'sein → Konjunktiv I = sei' },
    ],
  },
];

export default function GramaticaAlemanB1() {
  return (
    <QuestEngine
      color="#dd0000"
      flag="🇩🇪"
      storageKey="quest-de-b1-grammatik"
      guide={guide}
      levels={levels}
      backHref="/practica/aleman/b1"
      backLabel="Deutsch B1"
      title="Grammatik B1"
      subtitle="Alemán B1 — Gramática"
    />
  );
}
