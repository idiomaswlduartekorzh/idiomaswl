import type { GoetheA2GoldenSet } from './goethe-a2-golden-types';

const choice = (
  id: string,
  prompt: string,
  options: [string, string, string],
  answer: 0 | 1 | 2,
  rationale: string,
  distractorRationales: [string, string, string],
  visualAsset?: string,
  visualAlt?: string,
) => ({
  id,
  prompt,
  options,
  answer,
  rationale,
  distractorRationales,
  ...(visualAsset ? { visualAsset, visualAlt } : {}),
});

export const GOETHE_A2_GOLDEN_SET_1 = {
  schemaVersion: 1,
  id: 'a2-1',
  status: 'AUDIO_BLOCKED',
  title: 'Goethe-Zertifikat A2 · Referenzmock 1',
  authorship: {
    owner: 'WeLearn',
    original: true,
    officialSourcesUsedForArchitectureOnly: true,
  },
  levelProfile: {
    audience: 'adults-16-plus',
    register: 'everyday-personal-and-semi-official',
    targetLevel: 'A2',
    grammarEnvelope: [
      'Präsens, Perfekt und häufiges Präteritum von sein/haben',
      'Modalverben und trennbare Verben',
      'weil, dass, wenn und einfache Relativbezüge',
      'Komparativ, Zeit- und Ortsangaben',
      'höfliche Bitten, Vorschläge und einfache Begründungen',
    ],
    lexicalDomains: [
      'Nachbarschaft und freiwillige Arbeit',
      'Bibliothek und städtische Dienstleistungen',
      'Reparatur, Werkzeug und Nachhaltigkeit',
      'Termine, Wege, Einkaufen und Freizeit',
    ],
  },
  reading: {
    minutes: 30,
    parts: [
      {
        part: 1,
        family: 'continuous-media-text',
        title: 'Alte Dinge bekommen ein zweites Leben',
        text: `Seit acht Monaten gibt es im Leipziger Osten den Reparatur-Treff „Zweite Chance“. Jeden Dienstagabend und an jedem ersten Samstag im Monat kommen Menschen mit kaputten Lampen, kleinen Möbeln oder Küchengeräten dorthin. Zwölf Freiwillige helfen ihnen, den Fehler zu finden. Sie reparieren die Sachen aber nicht allein: Die Besitzerinnen und Besitzer sollen mitarbeiten und dabei etwas lernen.

Der Besuch ist kostenlos. Nur neue Teile, zum Beispiel ein Kabel oder ein Schalter, muss man bezahlen. Werkzeug ist genug da. Wer ein großes Gerät mitbringt, soll sich vorher per E-Mail anmelden. So kann das Team prüfen, ob am Termin eine passende Fachperson Zeit hat.

Im letzten Monat wurden 73 Dinge repariert. Besonders oft kamen Kaffeemaschinen und Stühle. Projektleiterin Nele Baumann freut sich: „Viele Gäste bleiben nach der Reparatur noch auf einen Tee. Aus einer praktischen Idee ist ein Treffpunkt für das Viertel geworden.“ Ab Herbst möchte das Team einmal im Monat auch andere Stadtteile besuchen.`,
        items: [
          choice('g-a2-1-r1-1', 'Was ist im Reparatur-Treff wichtig?', ['Die Gäste lernen beim Reparieren mit.', 'Das Team verkauft neue Geräte.', 'Nur Fachleute dürfen Werkzeug benutzen.'], 0, 'Im ersten Absatz steht ausdrücklich, dass die Besitzer mitarbeiten und etwas lernen sollen.', ['Richtig: Mitarbeit und Lernen sind das zentrale Prinzip.', 'Falsch: Es werden keine neuen Geräte verkauft.', 'Falsch: Werkzeug und Hilfe sind für die Gäste da.']),
          choice('g-a2-1-r1-2', 'Was kostet der Besuch?', ['Jeder Termin kostet fünf Euro.', 'Man bezahlt nur benötigte Ersatzteile.', 'Mitglieder besuchen den Treff kostenlos.'], 1, 'Der Besuch ist kostenlos; bezahlt werden nur neue Teile.', ['Falsch: Für den Termin selbst gibt es keinen Preis.', 'Richtig: Kosten entstehen nur für neue Teile.', 'Falsch: Eine Mitgliedschaft wird nicht erwähnt.']),
          choice('g-a2-1-r1-3', 'Wann soll man vorher schreiben?', ['Wenn man am Dienstag kommt.', 'Wenn man kein eigenes Werkzeug hat.', 'Wenn man ein großes Gerät mitbringt.'], 2, 'Große Geräte müssen vorab per E-Mail angemeldet werden.', ['Falsch: Dienstagstermine brauchen nicht grundsätzlich eine Anmeldung.', 'Falsch: Werkzeug ist vorhanden.', 'Richtig: So kann eine passende Fachperson eingeplant werden.']),
          choice('g-a2-1-r1-4', 'Was gefällt Nele Baumann besonders?', ['Kaffeemaschinen sind leicht zu reparieren.', 'Im letzten Monat kamen zwölf neue Helfer.', 'Die Gäste treffen dort auch andere Menschen.'], 2, 'Sie beschreibt den Treff als Treffpunkt für das Viertel.', ['Falsch: Der Text nennt nur die Häufigkeit der Geräte.', 'Falsch: Zwölf ist die Gesamtzahl der Freiwilligen.', 'Richtig: Viele bleiben noch auf einen Tee.']),
          choice('g-a2-1-r1-5', 'Was plant das Team ab Herbst?', ['Jeden Samstag zu öffnen.', 'Auch in anderen Vierteln Termine anzubieten.', 'Einen Laden für gebrauchte Möbel zu eröffnen.'], 1, 'Der letzte Satz kündigt monatliche Besuche in anderen Stadtteilen an.', ['Falsch: Es bleibt beim ersten Samstag im Monat.', 'Richtig: Das Angebot soll mobil in andere Viertel gehen.', 'Falsch: Ein Möbelgeschäft ist nicht geplant.']),
        ],
      },
      {
        part: 2,
        family: 'directory-program-board',
        title: 'Stadtbibliothek Halle · Wo finden Sie was?',
        text: `STADTBIBLIOTHEK HALLE · HAUS AM MARKT

ERDGESCHOSS
Information · Ausweis und Anmeldung · Rückgabeautomat · Abholung bestellter Medien · Café Lesepause

1. OBERGESCHOSS
Romane · Reiseführer · Zeitungen und Zeitschriften · ruhiger Leseraum

2. OBERGESCHOSS
Filme und Musik · Computerplätze · Drucken und Kopieren · Beratung „Digital im Alltag“ (Mi 15–18 Uhr)

3. OBERGESCHOSS
Kinder- und Familienbibliothek · Vorlesen (Di 16 Uhr) · Lernplätze für Gruppen

UNTERGESCHOSS · MACHBAR
Werkzeug ausleihen · Nähmaschinen · offene Werkstatt (Sa 10–14 Uhr) · Reparaturkurse

HEUTE, DONNERSTAG
17:00 Uhr · Reisefotos besser machen · 2. OG
18:30 Uhr · Lesung mit Dana Riedel · 1. OG

Hinweis: Sonntags ist das Haus geschlossen. Der Rückgabeautomat außen neben dem Haupteingang ist immer erreichbar.`,
        items: [
          choice('g-a2-1-r2-1', 'Sie möchten einen bestellten Reiseführer abholen. Wohin gehen Sie?', ['ins Erdgeschoss', 'ins 1. Obergeschoss', 'ins Untergeschoss'], 0, 'Bestellte Medien werden im Erdgeschoss abgeholt.', ['Richtig: Dort steht „Abholung bestellter Medien“.', 'Falsch: Dort findet man Reiseführer, holt Bestellungen aber nicht ab.', 'Falsch: Im Untergeschoss ist die Werkstatt.']),
          choice('g-a2-1-r2-2', 'Sie brauchen Hilfe beim Ausdrucken eines Formulars. Wohin gehen Sie?', ['ins 1. Obergeschoss', 'ins 2. Obergeschoss', 'ins 3. Obergeschoss'], 1, 'Computer, Drucken und Kopieren befinden sich im 2. Obergeschoss.', ['Falsch: Das 1. OG ist vor allem für Bücher und Zeitungen.', 'Richtig: Dort gibt es Drucker und Computerberatung.', 'Falsch: Das 3. OG ist die Kinder- und Familienbibliothek.']),
          choice('g-a2-1-r2-3', 'Sie möchten heute Abend eine Autorin hören. Wann beginnt die Veranstaltung?', ['um 15 Uhr', 'um 17 Uhr', 'um 18:30 Uhr'], 2, 'Die Lesung mit Dana Riedel beginnt um 18:30 Uhr.', ['Falsch: 15 Uhr gehört zur Mittwochsberatung.', 'Falsch: Um 17 Uhr beginnt der Fototermin.', 'Richtig: 18:30 Uhr ist die Lesung.']),
          choice('g-a2-1-r2-4', 'Sie wollen eine Nähmaschine benutzen. Wo ist das möglich?', ['in der Machbar', 'im Leseraum', 'in der Familienbibliothek'], 0, 'Nähmaschinen stehen in der Machbar im Untergeschoss.', ['Richtig: Die Machbar bietet Nähmaschinen und Werkzeug.', 'Falsch: Der Leseraum ist zum ruhigen Lesen.', 'Falsch: Die Familienbibliothek liegt im 3. OG.']),
          choice('g-a2-1-r2-5', 'Sie möchten am Sonntag Bücher zurückgeben. Was können Sie tun?', ['bis 14 Uhr in die Werkstatt gehen', 'am Haupteingang klingeln', 'den Automaten außen benutzen'], 2, 'Der äußere Rückgabeautomat ist immer erreichbar.', ['Falsch: Das Haus ist sonntags geschlossen.', 'Falsch: Ein Klingeldienst wird nicht angeboten.', 'Richtig: Der Automat liegt außen und ist jederzeit nutzbar.']),
        ],
      },
      {
        part: 3,
        family: 'correspondence',
        title: 'E-Mail an das Werkstatt-Team',
        text: `Betreff: Unser Aktionstag am Samstag

Liebe Helferinnen und Helfer,

vielen Dank, dass ihr beim Aktionstag „Mach dein Viertel schöner“ dabei seid. Wegen des Wetters arbeiten wir nicht wie geplant auf dem Hof, sondern im Nachbarschaftshaus in der Lindenstraße 18. Wir beginnen erst um 10 Uhr; ab 9:30 Uhr könnt ihr Material abholen.

Am Vormittag bauen wir zwei Regale und reparieren Fahrräder. Nach der Mittagspause streichen wir die Schilder für den Garten. Bitte bringt alte Kleidung und, wenn möglich, Arbeitshandschuhe mit. Werkzeug haben wir genug. Für Suppe und Getränke sorgen wir, aber einen Becher sollte jede Person selbst mitbringen.

Wer nur am Vormittag helfen kann, schreibt mir bitte bis Donnerstag. Am Freitagabend sende ich dann den endgültigen Arbeitsplan.

Viele Grüße
Miriam`,
        items: [
          choice('g-a2-1-r3-1', 'Warum findet der Aktionstag im Nachbarschaftshaus statt?', ['Der Hof ist zu klein.', 'Es fehlen Helfer.', 'Das Wetter ist wahrscheinlich schlecht.'], 2, 'Der Ort wurde wegen des Wetters geändert.', ['Falsch: Zur Größe des Hofs steht nichts.', 'Falsch: Miriam dankt den vorhandenen Helfern.', 'Richtig: „Wegen des Wetters“ erklärt den Wechsel.']),
          choice('g-a2-1-r3-2', 'Ab wann kann man Material bekommen?', ['ab 9:30 Uhr', 'ab 10 Uhr', 'nach der Mittagspause'], 0, 'Material kann eine halbe Stunde vor Beginn abgeholt werden.', ['Richtig: Die Ausgabe startet um 9:30 Uhr.', 'Falsch: Um 10 Uhr beginnt die Arbeit.', 'Falsch: Dann werden Schilder gestrichen.']),
          choice('g-a2-1-r3-3', 'Was macht die Gruppe am Nachmittag?', ['Sie repariert Fahrräder.', 'Sie bemalt Schilder.', 'Sie baut Regale.'], 1, 'Nach der Mittagspause werden die Gartenschilder gestrichen.', ['Falsch: Fahrräder sind am Vormittag dran.', 'Richtig: „streichen wir die Schilder“.', 'Falsch: Auch die Regale gehören zum Vormittag.']),
          choice('g-a2-1-r3-4', 'Was sollen alle selbst mitbringen?', ['einen Becher', 'Werkzeug', 'eine Suppe'], 0, 'Jede Person soll einen eigenen Becher mitbringen.', ['Richtig: Das wird ausdrücklich verlangt.', 'Falsch: Werkzeug ist genug vorhanden.', 'Falsch: Suppe und Getränke werden organisiert.']),
          choice('g-a2-1-r3-5', 'Wer soll Miriam bis Donnerstag schreiben?', ['Wer Handschuhe braucht.', 'Wer nur vor der Pause Zeit hat.', 'Wer den Arbeitsplan machen möchte.'], 1, 'Nur Vormittagshelfer sollen sich bis Donnerstag melden.', ['Falsch: Handschuhe sind nur nach Möglichkeit mitzubringen.', 'Richtig: Das ist die Bedingung für die Nachricht.', 'Falsch: Miriam verschickt den Plan selbst.']),
        ],
      },
      {
        part: 4,
        family: 'needs-to-six-ads',
        title: 'Kurse und Hilfe im Viertel',
        example: {
          profile: '0 · Elena sucht einen Kurs, in dem sie am Freitagabend ein altes Hemd ändern kann.',
          answer: 'B',
        },
        profiles: [
          { id: 'g-a2-1-r4-1', text: '1 · Jonas braucht für einen Abend eine Bohrmaschine, möchte aber keine kaufen.', answer: 'C', rationale: 'C verleiht Werkzeug auch tageweise.' },
          { id: 'g-a2-1-r4-2', text: '2 · Samira hat noch nie genäht und möchte lernen, wie man kleine Löcher repariert.', answer: 'A', rationale: 'A ist ausdrücklich ein Anfängerkurs für kleine Reparaturen.' },
          { id: 'g-a2-1-r4-3', text: '3 · Herr Yilmaz möchte seinen kaputten Toaster am Samstag mit Hilfe selbst reparieren.', answer: 'F', rationale: 'F ist samstags geöffnet und unterstützt Selbstreparaturen an Kleingeräten.' },
          { id: 'g-a2-1-r4-4', text: '4 · Klara sucht sonntags Hilfe beim Restaurieren eines alten Holzschranks.', answer: 'X', rationale: 'Keine Anzeige bietet sonntags Möbelrestaurierung an.' },
          { id: 'g-a2-1-r4-5', text: '5 · Ben möchte mit seiner achtjährigen Tochter lernen, wie man ein Fahrrad kontrolliert.', answer: 'D', rationale: 'D ist ein Eltern-Kind-Kurs für Fahrräder ab sieben Jahren.' },
        ],
        adverts: [
          { letter: 'A', heading: 'NÄHEN VON ANFANG AN', text: 'Kleine Löcher schließen, Knöpfe annähen, Hosen kürzen. Für Personen ohne Vorkenntnisse. Dienstag 18–20 Uhr.' },
          { letter: 'B', heading: 'AUS ALT MACH NEU', text: 'Freitag 19 Uhr: Bringen Sie ein Kleidungsstück mit. Wir ändern Form oder Größe. Grundkenntnisse an der Nähmaschine nötig.' },
          { letter: 'C', heading: 'WERKZEUG-KISTE', text: 'Bohrmaschine, Schleifgerät oder Leiter günstig ausleihen – für einen Tag oder eine Woche. Abholung Mo–Fr bis 19 Uhr.' },
          { letter: 'D', heading: 'FAHRRAD-CHECK FÜR FAMILIEN', text: 'Eltern und Kinder ab 7 lernen gemeinsam: Bremsen prüfen, Licht testen, Reifen wechseln. Samstag 10 Uhr.' },
          { letter: 'E', heading: 'MÖBEL-TAXI', text: 'Wir transportieren Schränke und Tische in Halle und Umgebung. Montag bis Samstag. Keine Reparaturen.' },
          { letter: 'F', heading: 'REPARIEREN STATT WEGWERFEN', text: 'Kaputte Lampe, Toaster oder Radio? Samstags 11–15 Uhr zeigen Freiwillige, wie Sie Ihr Kleingerät selbst reparieren.' },
        ],
      },
    ],
  },
  listening: {
    minutesApprox: 30,
    masterTrack: {
      status: 'script-ready-audio-blocked',
      path: '/audio/goethe/a2-1/goethe-a2-1-master.mp3',
      targetMinutes: [22, 25],
      includesTransferWindow: true,
    },
    parts: [
      {
        part: 1,
        family: 'five-short-public-or-private-messages',
        plays: 2,
        items: [
          { ...choice('g-a2-1-h1-1', 'Bis wann kann Frau Campos das Buch abholen?', ['bis Mittwochabend', 'bis Donnerstagabend', 'bis Freitagmittag'], 1, 'Die Reservierung bleibt bis Donnerstagabend liegen.', ['Falsch: Mittwoch ist nur der Tag der Nachricht.', 'Richtig: Donnerstagabend ist die Frist.', 'Falsch: Freitag wird nicht genannt.']), turns: [{ speaker: 'Bibliothek', text: 'Guten Tag, Frau Campos, hier ist die Stadtbibliothek. Ihr bestelltes Buch ist da. Wir legen es bis Donnerstagabend für Sie zurück. Am Mittwoch schließen wir schon um sechzehn Uhr. Bitte bringen Sie Ihren Bibliotheksausweis mit.' }] },
          { ...choice('g-a2-1-h1-2', 'Wo fährt die Straßenbahn 7 heute ab?', ['am Markt', 'am Hauptbahnhof', 'in der Kleinen Steinstraße'], 2, 'Die Ersatzhaltestelle liegt in der Kleinen Steinstraße.', ['Falsch: Am Markt hält die Bahn heute nicht.', 'Falsch: Dorthin fährt sie, startet aber nicht dort.', 'Richtig: Dort befindet sich die Ersatzhaltestelle.']), turns: [{ speaker: 'Ansage', text: 'Achtung, Fahrgäste der Linie sieben Richtung Hauptbahnhof. Wegen Bauarbeiten kann die Haltestelle Markt heute nicht benutzt werden. Bitte steigen Sie an der Ersatzhaltestelle in der Kleinen Steinstraße ein.' }] },
          { ...choice('g-a2-1-h1-3', 'Warum ist die Lampe noch nicht fertig?', ['Ein Ersatzteil fehlt.', 'Die Werkstatt ist geschlossen.', 'Herr Novak hat nicht bezahlt.'], 0, 'Der passende Schalter kommt erst morgen.', ['Richtig: Ein fehlender Schalter verzögert die Reparatur.', 'Falsch: Die Werkstatt arbeitet und ruft an.', 'Falsch: Eine Zahlung wird nicht erwähnt.']), turns: [{ speaker: 'Werkstatt', text: 'Hallo Herr Novak, hier ist die Werkstatt Lichtblick. Ihre Lampe funktioniert fast wieder, aber der passende Schalter kommt leider erst morgen. Sie können die Lampe deshalb am Freitag ab vierzehn Uhr abholen.' }] },
          { ...choice('g-a2-1-h1-4', 'Wo beginnt der Vortrag?', ['im Raum 2', 'im Café', 'im großen Saal'], 0, 'Der Vortrag wurde in Raum 2 verlegt.', ['Richtig: Raum 2 ist der neue Ort.', 'Falsch: Im Café findet der Vortrag nicht statt.', 'Falsch: Der große Saal wird heute gestrichen.']), turns: [{ speaker: 'Hausansage', text: 'Liebe Besucherinnen und Besucher, der Vortrag „Weniger Müll im Alltag“ beginnt um achtzehn Uhr nicht im großen Saal, sondern in Raum zwei. Der Saal wird heute noch gestrichen. Das Café bleibt wie gewohnt geöffnet.' }] },
          { ...choice('g-a2-1-h1-5', 'Was sollen die Teilnehmenden morgen mitbringen?', ['etwas zu trinken', 'einen Regenschirm', 'feste Schuhe'], 2, 'Wegen des nassen Bodens werden feste Schuhe empfohlen.', ['Falsch: Getränke werden organisiert.', 'Falsch: Die Tour findet nicht draußen statt.', 'Richtig: Der Boden in der alten Fabrik ist teilweise nass.']), turns: [{ speaker: 'Mailbox', text: 'Hallo zusammen, unsere Führung durch die alte Fabrik findet morgen statt, auch wenn es regnet, denn wir sind meistens drinnen. Der Boden ist an einigen Stellen nass. Zieht bitte feste Schuhe an. Getränke gibt es vor Ort.' }] },
        ],
      },
      {
        part: 2,
        family: 'one-continuous-conversation',
        plays: 1,
        visualAsset: '/images/goethe/a2-1/hoeren-teil2-orte.svg',
        visualAlt: 'Neun einfache schwarz-weiße Zeichnungen: Café, Bäckerei, Markt, Fahrradwerkstatt, Park, Straßenbahnhaltestelle, Apotheke, Bibliothek und Post.',
        options: [
          { letter: 'A', label: 'Café' }, { letter: 'B', label: 'Bäckerei' }, { letter: 'C', label: 'Markt' },
          { letter: 'D', label: 'Fahrradwerkstatt' }, { letter: 'E', label: 'Park' }, { letter: 'F', label: 'Straßenbahnhaltestelle' },
          { letter: 'G', label: 'Apotheke' }, { letter: 'H', label: 'Bibliothek' }, { letter: 'I', label: 'Post' },
        ],
        turns: [
          { speaker: 'Anna', text: 'Also, Yusuf, wir haben am Samstag viel vor. Wo treffen wir uns?' },
          { speaker: 'Yusuf', text: 'Am besten zuerst vor der Bäckerei. Ich hole dort um neun das Brot für unser Frühstück ab.' },
          { speaker: 'Anna', text: 'Gut. Danach muss ich die Bücher zurückbringen. Die Bibliothek öffnet um halb zehn.' },
          { speaker: 'Yusuf', text: 'Und mein Fahrrad? Die Werkstatt wartet auf mich. Sie ist gleich hinter der Bibliothek.' },
          { speaker: 'Anna', text: 'Dann gehen wir dorthin. Die Reparatur dauert ungefähr eine Stunde. In der Zeit können wir im Café gegenüber frühstücken.' },
          { speaker: 'Yusuf', text: 'Prima. Auf den Markt müssen wir heute nicht. Mia kauft schon Gemüse für das Fest.' },
          { speaker: 'Anna', text: 'Nach dem Frühstück holen wir das Fahrrad ab und fahren zum Park. Dort bauen die anderen schon die Tische auf.' },
          { speaker: 'Yusuf', text: 'Bei Regen treffen sich alle aber an der Straßenbahnhaltestelle, richtig?' },
          { speaker: 'Anna', text: 'Ja. Die Vorhersage ist gut, also fahren wir direkt zum Park.' },
        ],
        items: [
          { id: 'g-a2-1-h2-1', prompt: 'Wo treffen sich Anna und Yusuf zuerst?', answer: 'B', rationale: 'Yusuf schlägt die Bäckerei als ersten Treffpunkt vor.' },
          { id: 'g-a2-1-h2-2', prompt: 'Wohin gehen sie danach?', answer: 'H', rationale: 'Anna muss anschließend Bücher in der Bibliothek zurückbringen.' },
          { id: 'g-a2-1-h2-3', prompt: 'Wohin bringen sie das Fahrrad?', answer: 'D', rationale: 'Die Fahrradwerkstatt liegt hinter der Bibliothek.' },
          { id: 'g-a2-1-h2-4', prompt: 'Wo warten sie während der Reparatur?', answer: 'A', rationale: 'Sie frühstücken im Café gegenüber.' },
          { id: 'g-a2-1-h2-5', prompt: 'Wo helfen sie später beim Fest?', answer: 'E', rationale: 'Sie fahren zum Park und bauen dort Tische auf.' },
        ],
      },
      {
        part: 3,
        family: 'five-short-conversations',
        plays: 1,
        items: [
          { ...choice('g-a2-1-h3-1', 'Was leiht die Frau aus?', ['eine Bohrmaschine', 'eine Leiter', 'eine Nähmaschine'], 1, 'Die Leiter wird bis Montag gebraucht.', ['Falsch: Die Bohrmaschine hat sie schon.', 'Richtig: Sie entscheidet sich für die Leiter.', 'Falsch: Eine Nähmaschine kommt nicht vor.'], '/images/goethe/a2-1/hoeren-teil3-1.svg', 'Drei lineare Zeichnungen: Bohrmaschine, Leiter und Nähmaschine.'), turns: [{ speaker: 'Mann', text: 'Brauchen Sie die Bohrmaschine oder die Leiter?' }, { speaker: 'Frau', text: 'Die Bohrmaschine habe ich schon. Aber die Leiter brauche ich bis Montag.' }] },
          { ...choice('g-a2-1-h3-2', 'Wann kommt der Techniker?', ['um 9:30 Uhr', 'um 10:00 Uhr', 'um 10:30 Uhr'], 2, 'Der Techniker verspätet sich um eine halbe Stunde.', ['Falsch: 9:30 Uhr wird nicht genannt.', 'Falsch: Das war der ursprüngliche Termin.', 'Richtig: Er kommt eine halbe Stunde später.'], '/images/goethe/a2-1/hoeren-teil3-2.svg', 'Drei einfache Uhren mit den Zeiten 9:30, 10:00 und 10:30.'), turns: [{ speaker: 'Frau', text: 'Unser Termin war doch um zehn. Wo bleiben Sie?' }, { speaker: 'Mann', text: 'Entschuldigung, der Bus steht im Stau. Ich bin in dreißig Minuten bei Ihnen.' }] },
          { ...choice('g-a2-1-h3-3', 'Welches Schild sucht der Mann?', ['Fahrräder hier abstellen', 'Eingang geschlossen', 'Bitte leise sprechen'], 0, 'Er braucht ein Schild für die Fahrradstellplätze.', ['Richtig: Es soll zeigen, wo Fahrräder stehen dürfen.', 'Falsch: Der Eingang bleibt offen.', 'Falsch: Lärm wird nicht erwähnt.'], '/images/goethe/a2-1/hoeren-teil3-3.svg', 'Drei Hinweisschilder: Fahrradstellplatz, geschlossener Eingang und Ruhezeichen.'), turns: [{ speaker: 'Mann', text: 'Haben wir noch ein Schild für die Fahrräder?' }, { speaker: 'Frau', text: 'Du meinst das Schild, das zeigt, wo man sie abstellen darf? Es liegt im Schrank.' }] },
          { ...choice('g-a2-1-h3-4', 'Wie fährt das Paar nach Hause?', ['mit dem Fahrrad', 'mit der Straßenbahn', 'mit dem Taxi'], 1, 'Wegen des Regens nehmen beide die Straßenbahn.', ['Falsch: Die Fahrräder bleiben im Park.', 'Richtig: Die Straßenbahn ist ihre Entscheidung.', 'Falsch: Das Taxi ist ihnen zu teuer.'], '/images/goethe/a2-1/hoeren-teil3-4.svg', 'Drei lineare Verkehrssymbole: Fahrrad, Straßenbahn und Taxi.'), turns: [{ speaker: 'Frau', text: 'Es regnet stark. Wollen wir die Fahrräder hier lassen und ein Taxi nehmen?' }, { speaker: 'Mann', text: 'Das ist zu teuer. Die Straßenbahn kommt in fünf Minuten.' }] },
          { ...choice('g-a2-1-h3-5', 'Was kauft die Kundin?', ['zwei kleine Dosen Farbe', 'eine große Dose Farbe', 'eine große und eine kleine Dose'], 2, 'Sie nimmt je eine Dose in zwei Größen.', ['Falsch: Sie braucht auch eine große Dose.', 'Falsch: Für die Schilder braucht sie zusätzlich eine kleine.', 'Richtig: Eine große weiße und eine kleine grüne Dose.'], '/images/goethe/a2-1/hoeren-teil3-5.svg', 'Drei Gruppen von Farbdosen: zwei kleine, eine große sowie eine große mit einer kleinen.'), turns: [{ speaker: 'Verkäufer', text: 'Wie viel Farbe brauchen Sie?' }, { speaker: 'Kundin', text: 'Für die Wand eine große Dose Weiß. Und für die Schilder noch eine kleine Dose Grün.' }] },
        ],
      },
      {
        part: 4,
        family: 'radio-interview',
        plays: 2,
        turns: [
          { speaker: 'Moderatorin', text: 'Heute sprechen wir mit David Kern vom Werkraum Süd. Herr Kern, wie ist die Idee entstanden?' },
          { speaker: 'David', text: 'Vor drei Jahren wollten einige Nachbarn einen Raum teilen, weil in ihren Wohnungen kein Platz für Werkzeuge war. Die Stadt gab uns dann eine alte Garage.' },
          { speaker: 'Moderatorin', text: 'Wer kann den Werkraum benutzen?' },
          { speaker: 'David', text: 'Alle Erwachsenen aus dem Viertel. Jugendliche ab vierzehn dürfen mit einer erwachsenen Person kommen. Man muss keinen Jahresbeitrag zahlen. Für manche Maschinen kostet eine Stunde zwei Euro.' },
          { speaker: 'Moderatorin', text: 'Was machen die Menschen dort?' },
          { speaker: 'David', text: 'Viele reparieren Fahrräder oder kleine Möbel. Donnerstags gibt es Hilfe von erfahrenen Freiwilligen. Sie zeigen die Arbeit, übernehmen sie aber nicht komplett.' },
          { speaker: 'Moderatorin', text: 'Gibt es auch Kurse?' },
          { speaker: 'David', text: 'Ja, zweimal im Monat. Im letzten Kurs haben wir Regale gebaut. Im nächsten lernen die Teilnehmenden, wie man elektrische Geräte sicher prüft. Dafür muss man sich online anmelden.' },
          { speaker: 'Moderatorin', text: 'Was wünschen Sie sich für die Zukunft?' },
          { speaker: 'David', text: 'Mehr Öffnungszeiten wären schön, aber zuerst brauchen wir weitere Freiwillige. Deshalb organisieren wir im Oktober einen Informationstag.' },
        ],
        items: [
          { id: 'g-a2-1-h4-1', statement: 'Der Werkraum befindet sich in einer früheren Garage.', answer: true, rationale: 'Die Stadt stellte der Gruppe eine alte Garage zur Verfügung.' },
          { id: 'g-a2-1-h4-2', statement: 'Alle Nutzerinnen und Nutzer müssen jedes Jahr bezahlen.', answer: false, rationale: 'Es gibt keinen Jahresbeitrag; nur manche Maschinen kosten pro Stunde.' },
          { id: 'g-a2-1-h4-3', statement: 'Am Donnerstag bekommt man Hilfe beim Reparieren.', answer: true, rationale: 'Donnerstags unterstützen erfahrene Freiwillige.' },
          { id: 'g-a2-1-h4-4', statement: 'Der nächste Kurs ist ohne Anmeldung.', answer: false, rationale: 'Für den Kurs zur Geräteprüfung ist eine Online-Anmeldung nötig.' },
          { id: 'g-a2-1-h4-5', statement: 'Der Werkraum sucht zusätzliche Freiwillige.', answer: true, rationale: 'Mehr Helfer werden vor längeren Öffnungszeiten benötigt.' },
        ],
      },
    ],
  },
  writing: {
    minutes: 30,
    tasks: [
      {
        part: 1,
        family: 'personal-message',
        situation: 'Sie wollten Mara heute ihre Bohrmaschine zurückbringen. Beim Benutzen ist sie kaputtgegangen. Schreiben Sie Mara eine Nachricht.',
        functions: ['Entschuldigen Sie sich.', 'Erklären Sie kurz, was passiert ist.', 'Machen Sie einen Vorschlag für die Reparatur.'],
        minWords: 20,
        maxWords: 30,
        modelAnswer: 'Hallo Mara, es tut mir leid: Deine Bohrmaschine ist heute plötzlich kaputtgegangen. Ich bringe sie morgen zur Werkstatt und bezahle natürlich die Reparatur. Liebe Grüße, Alex',
      },
      {
        part: 2,
        family: 'semi-official-email',
        situation: 'Die Stadtbibliothek sucht Freiwillige für ihre offene Werkstatt. Sie interessieren sich dafür. Schreiben Sie eine E-Mail.',
        addressee: 'Frau Lorenz, Stadtbibliothek Halle',
        functions: ['Schreiben Sie, warum Sie helfen möchten.', 'Sagen Sie, wann Sie Zeit haben.', 'Fragen Sie, ob es vorher eine Einführung gibt.'],
        minWords: 30,
        maxWords: 40,
        modelAnswer: 'Sehr geehrte Frau Lorenz, ich repariere gern Fahrräder und möchte Menschen im Viertel helfen. Samstags habe ich ab 10 Uhr Zeit. Gibt es vor dem ersten Termin eine Einführung? Mit freundlichen Grüßen, Karim Haddad',
      },
    ],
  },
  speaking: {
    pairMinutes: 15,
    preparationMinutes: 0,
    tasks: [
      {
        part: 1,
        family: 'personal-information-exchange',
        candidateA: ['WOHNUNG?', 'ARBEITSWEG?', 'WOCHENENDE?', 'KOCHEN?'],
        candidateB: ['NACHBARSCHAFT?', 'EINKAUFEN?', 'FREUNDE?', 'SPORT?'],
        examples: ['Wie ist Ihre Wohnung?', 'Wie fahren Sie normalerweise zur Arbeit?', 'Was machen Sie gern am Wochenende?'],
      },
      {
        part: 2,
        family: 'guided-personal-monologue',
        prompt: 'Was machen Sie gern selbst?',
        cues: ['Was?', 'Wann und wo?', 'Mit wem?', 'Warum gern?'],
        followUps: ['Was möchten Sie noch lernen?', 'Wer hat Ihnen das gezeigt?'],
      },
      {
        part: 3,
        family: 'pair-planning-negotiation',
        situation: 'Sie möchten gemeinsam die offene Werkstatt der Bibliothek besuchen. Finden Sie einen Termin von mindestens 90 Minuten, an dem beide Zeit haben. Die Werkstatt ist Dienstag bis Freitag von 14 bis 20 Uhr geöffnet.',
        candidateAAsset: '/images/goethe/a2-1/sprechen-teil3-a.svg',
        candidateBAsset: '/images/goethe/a2-1/sprechen-teil3-b.svg',
        candidateAAlt: 'Terminkarte A: Dienstag 14 bis 16 Arzt, Mittwoch 16 bis 18 Arbeit, Donnerstag frei ab 17 Uhr, Freitag 14 bis 17 Sprachkurs.',
        candidateBAlt: 'Terminkarte B: Dienstag Arbeit bis 18 Uhr, Mittwoch frei 14 bis 16 Uhr, Donnerstag Sport 15 bis 17 Uhr, Freitag frei ab 16:30 Uhr.',
        requiredOutcome: 'Donnerstag 17:00–18:30 Uhr oder Freitag 17:00–18:30 Uhr sind mögliche gemeinsame Termine; beide müssen Vorschläge machen, reagieren und sich einigen.',
      },
    ],
  },
  scoring: {
    reading: { rawMaximum: 20, multiplier: 1.25, resultMaximum: 25 },
    listening: { rawMaximum: 20, multiplier: 1.25, resultMaximum: 25 },
    writing: {
      rawMaximum: 20,
      multiplier: 1.25,
      resultMaximum: 25,
      rubric: {
        bands: ['A', 'B', 'C', 'D', 'E'],
        pointsPerCriterion: [5, 3.5, 2, 0.5, 0],
        criteriaPerTask: ['task-fulfilment-and-register', 'language-range-and-control'],
        zeroRule: 'If task fulfilment receives E, the complete task receives 0 points.',
      },
    },
    speaking: {
      resultMaximum: 25,
      rubric: {
        bands: ['A', 'B', 'C', 'D', 'E'],
        part1PointsPerCriterion: [2, 1.5, 1, 0.5, 0],
        part2PointsPerCriterion: [4, 3, 2, 1, 0],
        part3PointsPerCriterion: [4, 3, 2, 1, 0],
        pronunciationPoints: [5, 3.5, 2, 0.5, 0],
        taskCriteria: ['language-function', 'interaction', 'register'],
        languageCriteria: ['range', 'control'],
        pronunciationCriteria: ['intonation', 'word-stress', 'individual-sounds'],
        zeroRule: 'If task fulfilment receives E, the complete task receives 0 points.',
      },
    },
    pass: { totalMinimum: 60, writtenMinimum: 45, writtenMaximum: 75, oralMinimum: 15, oralMaximum: 25 },
  },
  media: {
    style: 'functional-exam-editorial',
    photography: 'none',
    assets: [
      { id: 'h2-places', path: '/images/goethe/a2-1/hoeren-teil2-orte.svg', purpose: 'nine-option listening board', alt: 'Neun einfache schwarz-weiße Ortszeichnungen.' },
      { id: 'h3-tools', path: '/images/goethe/a2-1/hoeren-teil3-1.svg', purpose: 'three-option listening illustration', alt: 'Bohrmaschine, Leiter und Nähmaschine.' },
      { id: 'h3-times', path: '/images/goethe/a2-1/hoeren-teil3-2.svg', purpose: 'three-option listening illustration', alt: 'Uhren mit 9:30, 10:00 und 10:30.' },
      { id: 'h3-signs', path: '/images/goethe/a2-1/hoeren-teil3-3.svg', purpose: 'three-option listening illustration', alt: 'Drei Hinweisschilder.' },
      { id: 'h3-transport', path: '/images/goethe/a2-1/hoeren-teil3-4.svg', purpose: 'three-option listening illustration', alt: 'Fahrrad, Straßenbahn und Taxi.' },
      { id: 'h3-paint', path: '/images/goethe/a2-1/hoeren-teil3-5.svg', purpose: 'three-option listening illustration', alt: 'Drei Kombinationen von Farbdosen.' },
      { id: 's3-a', path: '/images/goethe/a2-1/sprechen-teil3-a.svg', purpose: 'candidate A constraint card', alt: 'Wochenplan der Kandidatin oder des Kandidaten A.' },
      { id: 's3-b', path: '/images/goethe/a2-1/sprechen-teil3-b.svg', purpose: 'candidate B constraint card', alt: 'Wochenplan der Kandidatin oder des Kandidaten B.' },
    ],
  },
} satisfies GoetheA2GoldenSet;

export default GOETHE_A2_GOLDEN_SET_1;
