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

Der Treff gehört zu einem Verein und wird von der Stadt unterstützt. Die Gäste sind zwischen 16 und 82 Jahre alt. Bevor die Arbeit beginnt, untersucht eine freiwillige Person das Gerät gemeinsam mit dem Gast. Bei gefährlichen Schäden, etwa an sehr alten Elektrogeräten, empfiehlt das Team eine Fachwerkstatt. Eine Garantie für eine erfolgreiche Reparatur kann der Verein deshalb nicht geben.

Im letzten Monat wurden 73 Dinge repariert. Besonders oft kamen Kaffeemaschinen und Stühle. Projektleiterin Nele Baumann freut sich: „Viele Gäste bleiben nach der Reparatur noch auf einen Tee. Aus einer praktischen Idee ist ein Treffpunkt für das Viertel geworden.“ Ab Herbst möchte das Team einmal im Monat auch andere Stadtteile besuchen.`,
        example: choice('g-a2-1-r1-0', 'Worum geht es in dem Artikel?', ['um einen Treff zum gemeinsamen Reparieren', 'um einen neuen Laden für Küchengeräte', 'um eine Ausbildung für Handwerker'], 0, 'Der Artikel berichtet über einen Treff, in dem Gäste zusammen mit Freiwilligen Dinge reparieren.', ['Richtig: Das ist das Hauptthema des gesamten Textes.', 'Falsch: Neue Geräte werden dort nicht verkauft.', 'Falsch: Es handelt sich nicht um eine Berufsausbildung.']),
        items: [
          choice('g-a2-1-r1-1', 'Was ist im Reparatur-Treff wichtig?', ['Die Gäste lernen beim Reparieren mit.', 'Das Team verkauft neue Geräte.', 'Nur Fachleute dürfen Werkzeug benutzen.'], 0, 'Im ersten Absatz steht ausdrücklich, dass die Besitzer mitarbeiten und etwas lernen sollen.', ['Richtig: Mitarbeit und Lernen sind das zentrale Prinzip.', 'Falsch: Es werden keine neuen Geräte verkauft.', 'Falsch: Werkzeug und Hilfe sind für die Gäste da.']),
          choice('g-a2-1-r1-2', 'Was kostet der Besuch?', ['Jeder Termin kostet fünf Euro.', 'Man bezahlt nur benötigte Ersatzteile.', 'Mitglieder besuchen den Treff kostenlos.'], 1, 'Der Besuch ist kostenlos; bezahlt werden nur neue Teile.', ['Falsch: Für den Termin selbst gibt es keinen Preis.', 'Richtig: Kosten entstehen nur für neue Teile.', 'Falsch: Eine Mitgliedschaft wird nicht erwähnt.']),
          choice('g-a2-1-r1-3', 'Was empfiehlt das Team bei einem gefährlichen Schaden?', ['Allein weiterzuarbeiten.', 'Das Gerät sofort zu verkaufen.', 'Eine Fachwerkstatt zu besuchen.'], 2, 'Bei gefährlichen Schäden verweist der Treff an eine Fachwerkstatt.', ['Falsch: Gefährliche Reparaturen sollen nicht allein fortgesetzt werden.', 'Falsch: Von einem Verkauf ist nicht die Rede.', 'Richtig: Für solche Schäden wird professionelle Hilfe empfohlen.']),
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

SERVICE IM 2. OBERGESCHOSS
Scannen kostenlos · Ausdrucke gegen Gebühr · Hilfe bei Online-Formularen jeden Mittwoch ohne Anmeldung

3. OBERGESCHOSS
Kinder- und Familienbibliothek · Vorlesen (Di 16 Uhr) · Lernplätze für Gruppen

UNTERGESCHOSS · MACHBAR
Werkzeug ausleihen · Nähmaschinen · offene Werkstatt (Sa 10–14 Uhr) · Reparaturkurse

HEUTE, DONNERSTAG
17:00 Uhr · Reisefotos besser machen · 2. OG
18:30 Uhr · Lesung mit Dana Riedel · 1. OG

Hinweis: Sonntags ist das Haus geschlossen. Der Rückgabeautomat außen neben dem Haupteingang ist immer erreichbar.`,
        example: choice('g-a2-1-r2-0', 'Sie möchten einen Bibliotheksausweis beantragen. Wohin gehen Sie?', ['ins Erdgeschoss', 'ins 2. Obergeschoss', 'in einen anderen Stock'], 0, 'Ausweis und Anmeldung befinden sich im Erdgeschoss.', ['Richtig: Dort werden Ausweise ausgestellt.', 'Falsch: Dort sind Computer und digitale Beratung.', 'Falsch: Das Erdgeschoss ist als richtige Lösung genannt.']),
        items: [
          choice('g-a2-1-r2-1', 'Sie möchten einen bestellten Reiseführer abholen. Wohin gehen Sie?', ['ins Erdgeschoss', 'ins 1. Obergeschoss', 'in einen anderen Stock'], 0, 'Bestellte Medien werden im Erdgeschoss abgeholt.', ['Richtig: Dort steht „Abholung bestellter Medien“.', 'Falsch: Dort findet man Reiseführer, holt Bestellungen aber nicht ab.', 'Falsch: Das Erdgeschoss ist als richtige Lösung genannt.']),
          choice('g-a2-1-r2-2', 'Sie brauchen Hilfe beim Ausdrucken eines Formulars. Wohin gehen Sie?', ['ins 1. Obergeschoss', 'ins 2. Obergeschoss', 'in einen anderen Stock'], 1, 'Computer, Drucken und Kopieren befinden sich im 2. Obergeschoss.', ['Falsch: Das 1. OG ist vor allem für Bücher und Zeitungen.', 'Richtig: Dort gibt es Drucker und Hilfe bei Online-Formularen.', 'Falsch: Das 2. Obergeschoss ist als richtige Lösung genannt.']),
          choice('g-a2-1-r2-3', 'Sie möchten heute Abend eine Autorin hören. Wohin gehen Sie?', ['ins Erdgeschoss', 'ins 2. Obergeschoss', 'in einen anderen Stock'], 2, 'Die Lesung mit Dana Riedel findet im 1. Obergeschoss statt.', ['Falsch: Dort werden bestellte Medien abgeholt.', 'Falsch: Dort beginnt um 17 Uhr der Fototermin.', 'Richtig: Das 1. Obergeschoss ist keiner der beiden genannten Stockwerke.']),
          choice('g-a2-1-r2-4', 'Sie wollen eine Nähmaschine benutzen. Wohin gehen Sie?', ['in die Machbar', 'ins 1. Obergeschoss', 'in einen anderen Stock'], 0, 'Nähmaschinen stehen in der Machbar im Untergeschoss.', ['Richtig: Die Machbar bietet Nähmaschinen und Werkzeug.', 'Falsch: Das 1. Obergeschoss ist für Bücher und Zeitungen.', 'Falsch: Die Machbar ist als richtige Lösung bereits genannt.']),
          choice('g-a2-1-r2-5', 'Sie möchten am Sonntag Bücher zurückgeben. Wohin gehen Sie?', ['ins Untergeschoss', 'ins Erdgeschoss', 'an einen anderen Ort'], 2, 'Der äußere Rückgabeautomat neben dem Haupteingang ist immer erreichbar.', ['Falsch: Das Haus und die Werkstatt sind sonntags geschlossen.', 'Falsch: Auch das Erdgeschoss ist sonntags geschlossen.', 'Richtig: Der Automat steht außerhalb des Hauses.']),
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

Um 12:30 Uhr essen wir gemeinsam. Danach teilen wir uns wieder in kleine Gruppen auf. Wer Erfahrung mit Holz hat, kann zusätzlich zwei Pflanzkästen fertigbauen. Die Fahrradgruppe arbeitet bis 14 Uhr; später brauchen wir den Raum für die Schilder. Gegen 16 Uhr räumen wir zusammen auf.

Das Nachbarschaftshaus erreicht ihr vom Bahnhof mit Bus 4. Steigt an der Haltestelle „Lindenplatz“ aus und benutzt bitte den Seiteneingang im Hof. Fahrräder könnt ihr dort sicher abstellen. Kinder dürfen mitkommen, wenn eine erwachsene Person bei ihnen bleibt.

Falls ihr eigenes Material für die Pflanzkästen habt, gebt mir bitte ebenfalls bis Donnerstag Bescheid. Wir brauchen besonders kleine Holzbretter und wetterfeste Farbe. Fotos vom Aktionstag veröffentlichen wir später auf der Internetseite des Vereins. Wer nicht fotografiert werden möchte, kann das morgens direkt bei der Anmeldung im Eingangsbereich vor Beginn der Arbeit sagen.

Wer nur am Vormittag helfen kann, schreibt mir bitte bis Donnerstag. Am Freitagabend sende ich dann den endgültigen Arbeitsplan.

Viele Grüße
Miriam`,
        items: [
          choice('g-a2-1-r3-1', 'Warum findet der Aktionstag im Nachbarschaftshaus statt?', ['Der Hof ist zu klein.', 'Es fehlen Helfer.', 'Das Wetter ist wahrscheinlich schlecht.'], 2, 'Der Ort wurde wegen des Wetters geändert.', ['Falsch: Zur Größe des Hofs steht nichts.', 'Falsch: Miriam dankt den vorhandenen Helfern.', 'Richtig: „Wegen des Wetters“ erklärt den Wechsel.']),
          choice('g-a2-1-r3-2', 'Wie kommt man vom Bahnhof zum Nachbarschaftshaus?', ['mit dem Bus 4', 'mit der Straßenbahn 18', 'zu Fuß durch den Garten'], 0, 'Vom Bahnhof fährt Bus 4 bis zur Haltestelle Lindenplatz.', ['Richtig: Diese Verbindung wird in der E-Mail genannt.', 'Falsch: Eine Straßenbahn 18 wird nicht erwähnt.', 'Falsch: Der Garten ist kein Weg vom Bahnhof.']),
          choice('g-a2-1-r3-3', 'Was macht die Gruppe am Nachmittag?', ['Sie repariert Fahrräder.', 'Sie bemalt Schilder.', 'Sie baut Regale.'], 1, 'Nach der Mittagspause werden die Gartenschilder gestrichen.', ['Falsch: Fahrräder sind am Vormittag dran.', 'Richtig: „streichen wir die Schilder“.', 'Falsch: Auch die Regale gehören zum Vormittag.']),
          choice('g-a2-1-r3-4', 'Was soll man tun, wenn man nicht auf Fotos sein möchte?', ['Morgens bei der Anmeldung Bescheid sagen.', 'Den Aktionstag schon am Donnerstag absagen.', 'Den ganzen Tag im Garten arbeiten.'], 0, 'Der Wunsch soll morgens bei der Anmeldung mitgeteilt werden.', ['Richtig: So kann der Verein den Wunsch berücksichtigen.', 'Falsch: Eine Absage ist dafür nicht nötig.', 'Falsch: Die Gruppe arbeitet wegen des Wetters im Haus.']),
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
          { letter: 'A', heading: 'NÄHEN VON ANFANG AN', text: 'Kleine Löcher schließen, Knöpfe annähen, Hosen kürzen: In diesem Kurs üben Sie alle Schritte langsam und gemeinsam. Für Personen ohne Vorkenntnisse. Dienstag 18–20 Uhr, Material inklusive.' },
          { letter: 'B', heading: 'AUS ALT MACH NEU', text: 'Freitag 19 Uhr: Bringen Sie ein Kleidungsstück mit, das nicht mehr passt. Wir ändern Form oder Größe und sammeln kreative Ideen. Grundkenntnisse an der Nähmaschine sind nötig.' },
          { letter: 'C', heading: 'WERKZEUG-KISTE', text: 'Bohrmaschine, Schleifgerät oder Leiter günstig ausleihen – für einen Tag oder eine ganze Woche. Reservierung online oder telefonisch. Abholung Montag bis Freitag bis 19 Uhr. Beratung ist immer kostenlos.' },
          { letter: 'D', heading: 'FAHRRAD-CHECK FÜR FAMILIEN', text: 'Eltern und Kinder ab 7 Jahren lernen gemeinsam: Bremsen prüfen, Licht testen und einen Reifen wechseln. Eigenes Fahrrad und passende Kleidung bitte ebenfalls mitbringen. Samstag 10–12 Uhr.' },
          { letter: 'E', heading: 'MÖBEL-TAXI', text: 'Wir transportieren Schränke, Tische und andere große Möbel in Halle und Umgebung. Termine Montag bis Samstag nach Vereinbarung. Achtung: Wir bieten nur sicheren Transport, aber selbst keine Reparaturen an.' },
          { letter: 'F', heading: 'REPARIEREN STATT WEGWERFEN', text: 'Kaputte Lampe, Toaster oder Radio? Samstags von 11 bis 15 Uhr zeigen Freiwillige, wie Sie Ihr Kleingerät selbst reparieren. Ersatzteile können auch direkt im Haus gekauft werden.' },
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
          { ...choice('g-a2-1-h1-1', 'Bis wann kann Frau Campos das Buch abholen?', ['bis Mittwochabend', 'bis Donnerstagabend', 'bis Freitagmittag'], 1, 'Die Reservierung bleibt bis Donnerstagabend liegen.', ['Falsch: Mittwoch ist nur ein verkürzter Öffnungstag.', 'Richtig: Donnerstagabend ist die Frist.', 'Falsch: Freitag ist zu spät.']), turns: [{ speaker: 'Bibliothek', text: 'Guten Tag, Frau Campos, hier ist die Stadtbibliothek. Ihr bestelltes Buch über Stadtgärten ist heute angekommen. Wir legen es bis Donnerstagabend für Sie zurück. Am Mittwoch schließen wir wegen einer Veranstaltung schon um sechzehn Uhr. Donnerstag haben wir wie gewöhnlich bis neunzehn Uhr geöffnet. Bitte bringen Sie zur Abholung Ihren Bibliotheksausweis mit.' }] },
          { ...choice('g-a2-1-h1-2', 'Wo fährt die Straßenbahn 7 heute ab?', ['am Markt', 'am Hauptbahnhof', 'in der Kleinen Steinstraße'], 2, 'Die Ersatzhaltestelle liegt in der Kleinen Steinstraße.', ['Falsch: Am Markt hält die Bahn heute nicht.', 'Falsch: Der Hauptbahnhof ist die Fahrtrichtung.', 'Richtig: Dort befindet sich die Ersatzhaltestelle.']), turns: [{ speaker: 'Ansage', text: 'Achtung, Fahrgäste der Linie sieben Richtung Hauptbahnhof. Wegen Bauarbeiten kann die Haltestelle Markt heute nicht benutzt werden. Die Bahnen fahren aber nach dem normalen Fahrplan. Bitte gehen Sie ungefähr zweihundert Meter weiter und steigen Sie an der Ersatzhaltestelle in der Kleinen Steinstraße ein. Morgen früh halten die Bahnen wieder am Markt.' }] },
          { ...choice('g-a2-1-h1-3', 'Warum ist die Lampe noch nicht fertig?', ['Ein Ersatzteil fehlt.', 'Die Werkstatt ist geschlossen.', 'Herr Novak hat nicht bezahlt.'], 0, 'Der passende Schalter kommt erst morgen.', ['Richtig: Ein fehlender Schalter verzögert die Reparatur.', 'Falsch: Die Werkstatt arbeitet und ruft an.', 'Falsch: Eine Zahlung wird nicht als Problem genannt.']), turns: [{ speaker: 'Werkstatt', text: 'Hallo Herr Novak, hier ist die Werkstatt Lichtblick. Wir haben Ihre alte Stehlampe geprüft. Das Kabel ist schon neu und die Lampe funktioniert fast wieder. Leider passt keiner unserer Schalter; das richtige Ersatzteil kommt erst morgen. Deshalb ist die Abholung heute noch nicht möglich. Sie können die Lampe am Freitag ab vierzehn Uhr abholen und dann auch bezahlen.' }] },
          { ...choice('g-a2-1-h1-4', 'Wo beginnt der Vortrag?', ['im Raum 2', 'im Café', 'im großen Saal'], 0, 'Der Vortrag wurde in Raum 2 verlegt.', ['Richtig: Raum 2 ist der neue Ort.', 'Falsch: Das Café bleibt nur regulär geöffnet.', 'Falsch: Der große Saal wird heute gestrichen.']), turns: [{ speaker: 'Hausansage', text: 'Liebe Besucherinnen und Besucher, noch eine Änderung im heutigen Programm: Der Vortrag „Weniger Müll im Alltag“ beginnt wie angekündigt um achtzehn Uhr, aber nicht im großen Saal, sondern in Raum zwei im ersten Stock. Der Saal wird heute noch gestrichen. Nach dem Vortrag können Sie gern im Café weiterdiskutieren; es bleibt bis zwanzig Uhr geöffnet.' }] },
          { ...choice('g-a2-1-h1-5', 'Was sollen die Teilnehmenden morgen mitbringen?', ['etwas zu trinken', 'einen Regenschirm', 'feste Schuhe'], 2, 'Wegen des nassen Bodens werden feste Schuhe empfohlen.', ['Falsch: Getränke werden organisiert.', 'Falsch: Die Gruppe ist fast immer im Gebäude.', 'Richtig: Der Boden in der alten Fabrik ist teilweise nass.']), turns: [{ speaker: 'Mailbox', text: 'Hallo zusammen, hier ist Nora vom Geschichtsverein. Unsere Führung durch die alte Fabrik findet morgen statt, auch wenn es regnet, denn wir sind fast die ganze Zeit im Gebäude. Der Boden ist an einigen Stellen uneben und nass. Zieht deshalb bitte feste Schuhe an. Getränke gibt es vor Ort, und Jacken können wir am Eingang einschließen. Wir treffen uns um zehn Uhr am Haupttor.' }] },
        ],
      },
      {
        part: 2,
        family: 'one-continuous-conversation',
        plays: 1,
        visualAsset: '/images/goethe/a2-1/hoeren-teil2-orte-final.jpg',
        visualAlt: 'Neun redaktionelle Illustrationen: Café, Bäckerei, Markt, Fahrradwerkstatt, Park, Straßenbahnhaltestelle, Apotheke, Bibliothek und Post.',
        leadQuestion: 'Wo sind Anna und Yusuf am Samstag?',
        options: [
          { letter: 'A', label: 'Café' }, { letter: 'B', label: 'Bäckerei' }, { letter: 'C', label: 'Markt' },
          { letter: 'D', label: 'Fahrradwerkstatt' }, { letter: 'E', label: 'Park' }, { letter: 'F', label: 'Straßenbahnhaltestelle' },
          { letter: 'G', label: 'Apotheke' }, { letter: 'H', label: 'Bibliothek' }, { letter: 'I', label: 'Post' },
        ],
        turns: [
          { speaker: 'Anna', text: 'Also, Yusuf, wir haben am Samstag viel vor. Lass uns den Vormittag noch einmal planen. Wo treffen wir uns?' },
          { speaker: 'Yusuf', text: 'Ich muss zuerst ein Paket für meine Schwester wegbringen. Treffen wir uns um Viertel vor neun vor der Post?' },
          { speaker: 'Anna', text: 'Gut, ich warte draußen auf dich. Danach brauchen wir Brot für das Frühstück mit den anderen.' },
          { speaker: 'Yusuf', text: 'Dann gehen wir um neun zur Bäckerei am Marktplatz. Ich habe dort gestern schon zwei große Brote bestellt.' },
          { speaker: 'Anna', text: 'Prima. Um halb zehn öffnet die Bibliothek. Ich muss drei Bücher zurückbringen, weil ich nächste Woche nicht in der Stadt bin.' },
          { speaker: 'Yusuf', text: 'Das passt. Sie liegt ja direkt auf unserem Weg. Und um zehn wartet die Fahrradwerkstatt auf mich. Mein Hinterrad ist schon wieder kaputt.' },
          { speaker: 'Anna', text: 'Wie lange dauert die Reparatur? Wir müssen doch später beim Nachbarschaftsfest helfen.' },
          { speaker: 'Yusuf', text: 'Der Mechaniker braucht ungefähr eine Stunde. Währenddessen können wir im Café gegenüber frühstücken. Dort ist es morgens meistens noch ruhig.' },
          { speaker: 'Anna', text: 'Einverstanden. Auf den Markt müssen wir übrigens nicht. Mia kauft dort schon das Gemüse und bringt es direkt zum Fest.' },
          { speaker: 'Yusuf', text: 'Dann holen wir das Fahrrad gegen halb zwölf wieder ab und fahren zusammen in den Park. Die anderen stellen dort schon Tische und Bänke auf.' },
          { speaker: 'Anna', text: 'Und wenn es regnet? In der Nachricht stand etwas von der Straßenbahnhaltestelle.' },
          { speaker: 'Yusuf', text: 'Nur bei starkem Regen treffen sich alle dort und fahren gemeinsam ins Gemeindehaus. Aber die Vorhersage ist gut, also bleibt es beim Park.' },
        ],
        example: { number: 0, stageLabel: '8:45 Uhr', answer: 'I', rationale: 'Vor dem ersten Termin bringt Yusuf ein Paket zur Post.' },
        items: [
          { id: 'g-a2-1-h2-1', number: 6, stageLabel: '9:00 Uhr', answer: 'B', rationale: 'Um neun holen sie das bestellte Brot in der Bäckerei ab.' },
          { id: 'g-a2-1-h2-2', number: 7, stageLabel: '9:30 Uhr', answer: 'H', rationale: 'Um halb zehn bringt Anna Bücher in die Bibliothek zurück.' },
          { id: 'g-a2-1-h2-3', number: 8, stageLabel: '10:00 Uhr', answer: 'D', rationale: 'Um zehn gibt Yusuf sein Fahrrad in der Werkstatt ab.' },
          { id: 'g-a2-1-h2-4', number: 9, stageLabel: '10:15 Uhr', answer: 'A', rationale: 'Während der Reparatur frühstücken beide im Café.' },
          { id: 'g-a2-1-h2-5', number: 10, stageLabel: '11:30 Uhr', answer: 'E', rationale: 'Nach der Abholung fahren sie zum Fest im Park.' },
        ],
      },
      {
        part: 3,
        family: 'five-short-conversations',
        plays: 1,
        items: [
          { ...choice('g-a2-1-h3-1', 'Was leiht die Frau aus?', ['eine Bohrmaschine', 'eine Leiter', 'eine Nähmaschine'], 1, 'Die Leiter wird bis Montag gebraucht.', ['Falsch: Die Bohrmaschine hat sie schon.', 'Richtig: Sie entscheidet sich für die Leiter.', 'Falsch: Die Nähmaschine war nur ihre erste Idee.'], '/images/goethe/a2-1/hoeren-teil3-1-final.jpg', 'Drei redaktionelle Illustrationen: Bohrmaschine, Leiter und Nähmaschine.'), turns: [{ speaker: 'Mann', text: 'Guten Tag. Sie haben online eine Bohrmaschine und eine Leiter reserviert. Brauchen Sie beides?' }, { speaker: 'Frau', text: 'Nein, die Bohrmaschine habe ich inzwischen von meinem Nachbarn bekommen. Eine Nähmaschine wollte ich zuerst auch reservieren, aber die brauche ich doch nicht.' }, { speaker: 'Mann', text: 'Dann gebe ich Ihnen nur die Leiter. Wann bringen Sie sie zurück?' }, { speaker: 'Frau', text: 'Am Montagmorgen, gleich nach der Arbeit. Das ist für mich praktisch.' }] },
          { ...choice('g-a2-1-h3-2', 'Wann kommt der Techniker?', ['um 9:30 Uhr', 'um 10:00 Uhr', 'um 10:30 Uhr'], 2, 'Der Techniker verspätet sich um eine halbe Stunde.', ['Falsch: 9:30 Uhr war die Zeit eines anderen Termins.', 'Falsch: Das war der ursprüngliche Termin.', 'Richtig: Er kommt eine halbe Stunde später.'], '/images/goethe/a2-1/hoeren-teil3-2-final.svg', 'Drei präzise analoge Uhren: A zeigt 9:30 Uhr, B zeigt 10:00 Uhr und C zeigt 10:30 Uhr.'), turns: [{ speaker: 'Frau', text: 'Guten Morgen, unser Termin war doch um zehn. Es ist jetzt schon fünf nach zehn. Wo bleiben Sie?' }, { speaker: 'Mann', text: 'Entschuldigung, der Bus steht im Stau. Der Termin davor um halb zehn hat außerdem länger gedauert. Ich brauche von hier noch ungefähr fünfundzwanzig Minuten.' }, { speaker: 'Frau', text: 'Gut, dann rechne ich um halb elf mit Ihnen. Ich bin zu Hause. Bitte klingeln Sie bei Baumann.' }] },
          { ...choice('g-a2-1-h3-3', 'Welches Schild sucht der Mann?', ['Fahrräder hier abstellen', 'Eingang geschlossen', 'Bitte leise sprechen'], 0, 'Er braucht ein Schild für die Fahrradstellplätze.', ['Richtig: Es soll zeigen, wo Fahrräder stehen dürfen.', 'Falsch: Der Eingang bleibt offen.', 'Falsch: Das Ruhezeichen hängt bereits im Leseraum.'], '/images/goethe/a2-1/hoeren-teil3-3-final.jpg', 'Drei Hinweisschilder: Fahrradstellplatz, geschlossener Eingang und Ruhezeichen.'), turns: [{ speaker: 'Mann', text: 'Haben wir noch das Schild für die Fahrräder? Vor dem Eingang stehen heute schon wieder fünf Räder im Weg.' }, { speaker: 'Frau', text: 'Du meinst das Schild, das zeigt, wo man sie abstellen darf? Es liegt hinten im Schrank.' }, { speaker: 'Mann', text: 'Genau das. Das Schild „Bitte leise sprechen“ hängt ja schon im Leseraum. Und den Eingang müssen wir heute nicht schließen. Ich hole es.' }] },
          { ...choice('g-a2-1-h3-4', 'Wie fährt das Paar nach Hause?', ['mit dem Fahrrad', 'mit der Straßenbahn', 'mit dem Taxi'], 1, 'Wegen des Regens nehmen beide die Straßenbahn.', ['Falsch: Die Fahrräder bleiben im Park.', 'Richtig: Die Straßenbahn ist ihre Entscheidung.', 'Falsch: Das Taxi ist ihnen zu teuer.'], '/images/goethe/a2-1/hoeren-teil3-4-final.jpg', 'Drei redaktionelle Illustrationen: Fahrrad, Straßenbahn und Taxi.'), turns: [{ speaker: 'Frau', text: 'Es regnet plötzlich sehr stark. Wollen wir die Fahrräder hier im Park lassen und ein Taxi nach Hause nehmen?' }, { speaker: 'Mann', text: 'Ein Taxi ist mir zu teuer. Laut Fahrplan kommt die nächste Straßenbahn in fünf Minuten. Die Haltestelle ist gleich hinter dem Café.' }, { speaker: 'Frau', text: 'Einverstanden. Das machen wir. Morgen holen wir die Fahrräder ab, wenn das Wetter besser ist.' }] },
          { ...choice('g-a2-1-h3-5', 'Was kauft die Kundin?', ['zwei kleine Dosen Farbe', 'eine große Dose Farbe', 'eine große und eine kleine Dose'], 2, 'Sie nimmt je eine Dose in zwei Größen.', ['Falsch: Für die Wand braucht sie eine große Dose.', 'Falsch: Für die Schilder braucht sie zusätzlich eine kleine.', 'Richtig: Eine große weiße und eine kleine grüne Dose.'], '/images/goethe/a2-1/hoeren-teil3-5-final.jpg', 'Drei Gruppen von Farbdosen: zwei kleine, eine große sowie eine große mit einer kleinen.'), turns: [{ speaker: 'Verkäufer', text: 'Guten Tag. Wie viel Farbe brauchen Sie? Die kleinen Dosen sind heute günstiger.' }, { speaker: 'Kundin', text: 'Für die ganze Wand reicht eine kleine Dose bestimmt nicht. Ich nehme eine große Dose Weiß.' }, { speaker: 'Verkäufer', text: 'Sonst noch etwas? Vielleicht dieselbe Größe in Grün?' }, { speaker: 'Kundin', text: 'Nein, für die Gartenschilder brauche ich nur wenig Grün. Da genügt eine kleine Dose. Dann nehme ich beide.' }] },
        ],
      },
      {
        part: 4,
        family: 'radio-interview',
        plays: 2,
        turns: [
          { speaker: 'Moderatorin', text: 'Heute sprechen wir mit David Kern vom Werkraum Süd. Herr Kern, wie ist die Idee entstanden?' },
          { speaker: 'David', text: 'Vor drei Jahren wollten einige Nachbarn einen Raum teilen, weil in ihren Wohnungen kein Platz für Werkzeuge war. Die Stadt gab uns dann eine alte Garage.' },
          { speaker: 'Moderatorin', text: 'War es schwierig, aus der Garage eine Werkstatt zu machen?' },
          { speaker: 'David', text: 'Am Anfang schon. Viele Menschen aus dem Viertel haben am Wochenende geholfen. Nach vier Monaten konnten wir eröffnen. Heute kommen im Jahr ungefähr achthundert Besucherinnen und Besucher.' },
          { speaker: 'Moderatorin', text: 'Wer kann den Werkraum benutzen?' },
          { speaker: 'David', text: 'Alle Erwachsenen aus dem Viertel. Jugendliche ab vierzehn dürfen mit einer erwachsenen Person kommen. Man muss keinen Jahresbeitrag zahlen. Für manche Maschinen kostet eine Stunde zwei Euro.' },
          { speaker: 'Moderatorin', text: 'Was machen die Menschen dort?' },
          { speaker: 'David', text: 'Viele reparieren Fahrräder oder kleine Möbel. Andere bauen etwas Neues, zum Beispiel eine Lampe oder ein Regal. Donnerstags gibt es Hilfe von erfahrenen Freiwilligen. Sie zeigen die Arbeit, übernehmen sie aber nicht komplett. So lernen die Gäste, beim nächsten Mal selbstständig zu arbeiten.' },
          { speaker: 'Moderatorin', text: 'Gibt es auch Kurse?' },
          { speaker: 'David', text: 'Ja, zweimal im Monat. Im letzten Kurs haben wir Regale gebaut. Im nächsten lernen die Teilnehmenden, wie man elektrische Geräte sicher prüft. Dafür muss man sich online anmelden.' },
          { speaker: 'Moderatorin', text: 'Was wünschen Sie sich für die Zukunft?' },
          { speaker: 'David', text: 'Mehr Öffnungszeiten wären schön, aber zuerst brauchen wir weitere Freiwillige. Deshalb organisieren wir im Oktober einen Informationstag.' },
        ],
        example: { statement: 'Den Werkraum gibt es seit drei Jahren.', answer: true, rationale: 'David erklärt, dass die Idee vor drei Jahren entstand.' },
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
        cards: ['WOHNUNG?', 'ARBEITSWEG?', 'WOCHENENDE?', 'KOCHEN?'],
        examples: ['Wie ist Ihre Wohnung?', 'Wie fahren Sie normalerweise zur Arbeit?', 'Was machen Sie gern am Wochenende?'],
      },
      {
        part: 2,
        family: 'guided-personal-monologue',
        candidateA: {
          prompt: 'Was machen Sie gern selbst?',
          cues: ['Was?', 'Wann und wo?', 'Mit wem?', 'Warum gern?'],
          followUps: ['Was möchten Sie noch lernen?', 'Wer hat Ihnen das gezeigt?'],
        },
        candidateB: {
          prompt: 'Wie nutzen Sie Angebote in Ihrer Stadt?',
          cues: ['Welches Angebot?', 'Wie oft?', 'Mit wem?', 'Warum nützlich?'],
          followUps: ['Welches Angebot fehlt in Ihrer Stadt?', 'Wo informieren Sie sich darüber?'],
        },
      },
      {
        part: 3,
        family: 'pair-planning-negotiation',
        situation: 'Die Stadtbibliothek öffnet ihre Werkstatt am Samstag von 10 bis 20 Uhr. Sie möchten gemeinsam hingehen. Finden Sie einen Termin von mindestens 90 Minuten, an dem beide Zeit haben.',
        candidateAAsset: '/images/goethe/a2-1/sprechen-teil3-a.svg',
        candidateBAsset: '/images/goethe/a2-1/sprechen-teil3-b.svg',
        candidateAAlt: 'Terminkarte A für Samstag von 7 bis 21 Uhr: 8 bis 10 Frühstück, 10 bis 12 Arzttermin, 15 bis 16 Sprachkurs und 19 bis 21 Abendessen.',
        candidateBAlt: 'Terminkarte B für Samstag von 7 bis 21 Uhr: 9 bis 12:30 Arbeit, 12:30 bis 14 Fahrrad abholen und 17:30 bis 19 Einkauf.',
        requiredOutcome: 'Samstag 16:00–17:30 Uhr ist der einzige gemeinsame Termin von mindestens 90 Minuten innerhalb der Öffnungszeit; beide müssen Vorschläge machen, reagieren und sich einigen.',
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
      { id: 'h2-places', path: '/images/goethe/a2-1/hoeren-teil2-orte-final.jpg', purpose: 'nine-option listening board', alt: 'Neun redaktionelle Illustrationen von Alltagssituationen.' },
      { id: 'h3-tools', path: '/images/goethe/a2-1/hoeren-teil3-1-final.jpg', purpose: 'three-option listening illustration', alt: 'Bohrmaschine, Leiter und Nähmaschine.' },
      { id: 'h3-times', path: '/images/goethe/a2-1/hoeren-teil3-2-final.svg', purpose: 'precise three-option listening clock illustration', alt: 'Drei analoge Uhren mit 9:30, 10:00 und 10:30 Uhr.' },
      { id: 'h3-signs', path: '/images/goethe/a2-1/hoeren-teil3-3-final.jpg', purpose: 'three-option listening illustration', alt: 'Drei Hinweisschilder.' },
      { id: 'h3-transport', path: '/images/goethe/a2-1/hoeren-teil3-4-final.jpg', purpose: 'three-option listening illustration', alt: 'Fahrrad, Straßenbahn und Taxi.' },
      { id: 'h3-paint', path: '/images/goethe/a2-1/hoeren-teil3-5-final.jpg', purpose: 'three-option listening illustration', alt: 'Drei Kombinationen von Farbdosen.' },
      { id: 's3-a', path: '/images/goethe/a2-1/sprechen-teil3-a.svg', purpose: 'candidate A constraint card', alt: 'Wochenplan der Kandidatin oder des Kandidaten A.' },
      { id: 's3-b', path: '/images/goethe/a2-1/sprechen-teil3-b.svg', purpose: 'candidate B constraint card', alt: 'Wochenplan der Kandidatin oder des Kandidaten B.' },
    ],
  },
} satisfies GoetheA2GoldenSet;

export default GOETHE_A2_GOLDEN_SET_1;
