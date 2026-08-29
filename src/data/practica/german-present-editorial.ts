import {
  createGermanEditorialPack,
  type GermanEditorialErrorSeed,
  type GermanEditorialFinalSeed,
  type GermanEditorialGapSeed,
  type GermanEditorialMicroSeed,
  type GermanEditorialSequenceSeed,
} from './german-editorial-builder.ts'

const micro: GermanEditorialMicroSeed[] = [
  { title: 'Der erste Bus', cue: 'einen festen Fahrplan', segments: ['Der erste Bus ', ' werktags um 5:40 Uhr ab.'], verb: 'abfahren', answers: ['fährt ab'], distractors: ['ist abgefahren', 'fuhr ab', 'wird abfahren'] },
  { title: 'Im Übergangsquartier', cue: 'eine gegenwärtige Situation', segments: ['Während der Renovierung ', ' wir bei unseren Nachbarn.'], verb: 'wohnen', answers: ['wohnen'], distractors: ['haben gewohnt', 'wohnten', 'werden wohnen'] },
  { title: 'Der Wasserkreislauf', cue: 'eine allgemeine Tatsache', segments: ['Bei Wärme ', ' Wasser schneller.'], verb: 'verdunsten', answers: ['verdunstet'], distractors: ['ist verdunstet', 'verdunstete', 'wird verdunsten'] },
  { title: 'Der Mittwochsmarkt', cue: 'eine regelmäßige Gewohnheit', segments: ['Jeden Mittwoch ', ' Aylin frisches Brot auf dem Markt.'], verb: 'kaufen', answers: ['kauft'], distractors: ['hat gekauft', 'kaufte', 'wird kaufen'] },
  { title: 'Die Bibliotheksregel', cue: 'eine geltende Regel', segments: ['Die Bibliothek ', ' Getränke nur im Foyer.'], verb: 'erlauben', answers: ['erlaubt'], distractors: ['hat erlaubt', 'erlaubte', 'wird erlauben'] },
  { title: 'Der Küstenzug', cue: 'eine planmäßige Verbindung', segments: ['Der Regionalzug ', ' in zwölf Küstenorten.'], verb: 'halten', answers: ['hält'], distractors: ['hat gehalten', 'hielt', 'wird halten'] },
  { title: 'Aktuelle Zuständigkeit', cue: 'eine Aufgabe im aktuellen Monat', segments: ['Diesen Monat ', ' du die Frühschicht.'], verb: 'übernehmen', answers: ['übernimmst'], distractors: ['hast übernommen', 'übernahmst', 'wirst übernehmen'] },
  { title: 'Der Solarsensor', cue: 'eine dauerhafte Funktionsweise', segments: ['Dieser Sensor ', ' Licht in elektrische Energie um.'], verb: 'umwandeln', answers: ['wandelt um'], distractors: ['hat umgewandelt', 'wandelte um', 'wird umwandeln'] },
  { title: 'Sonntag bei Oma', cue: 'eine familiäre Gewohnheit', segments: ['Meine Cousins ', ' sonntags bei ihrer Großmutter zu Mittag.'], verb: 'essen', answers: ['essen'], distractors: ['haben gegessen', 'aßen', 'werden essen'] },
  { title: 'Semesterbeginn', cue: 'einen offiziellen Kalendertermin', segments: ['Das Wintersemester ', ' am 7. Oktober.'], verb: 'beginnen', answers: ['beginnt'], distractors: ['hat begonnen', 'begann', 'wird beginnen'] },
]

const long: GermanEditorialGapSeed[] = [
  { title: 'Morgen in der Bäckerei', instruction: 'Ergänze diesen zusammenhängenden Arbeitsablauf.', segments: ['Jeden Morgen ', ' Ines um sechs Uhr die Rollläden. Ihr Bruder ', ' die Öfen, während die Bäckerin die erste Lieferung ', '.'], entries: [['öffnen', ['öffnet']], ['prüfen', ['prüft']], ['annehmen', ['annimmt']]] },
  { title: 'Die Frühschicht im Gesundheitszentrum', instruction: 'Ergänze diesen zusammenhängenden Arbeitsablauf.', segments: ['Vor acht Uhr ', ' die Ärztin ihre Termine. Danach ', ' die Sekretärin den Empfang, und der erste Patient ', ' wenige Minuten später.'], entries: [['prüfen', ['prüft']], ['öffnen', ['öffnet']], ['kommen', ['kommt']]] },
  { title: 'Der Museumsrundgang', instruction: 'Ergänze diesen öffentlichen Zeitplan.', segments: ['Das Museum ', ' um zehn Uhr. Eine Führerin ', ' um halb elf die erste Gruppe, und das Café ', ' ab zwölf Uhr Mittagessen an.'], entries: [['öffnen', ['öffnet']], ['empfangen', ['empfängt']], ['bieten', ['bietet']]] },
  { title: 'Die Sechs-Uhr-Nachrichten', instruction: 'Ergänze diese Redaktionsroutine.', segments: ['Der Produzent ', ' um fünf Uhr die Themen. Die Redakteurin ', ' jeden Namen, und der Moderator ', ' um sechs Uhr die Meldungen vor.'], entries: [['auswählen', ['wählt aus']], ['überprüfen', ['überprüft']], ['vorlesen', ['liest vor']]] },
  { title: 'Das automatische Gewächshaus', instruction: 'Ergänze die Funktionsbeschreibung.', segments: ['Ein Sensor ', ' jede Minute die Temperatur. Bei zu großer Hitze ', ' ein Ventilator automatisch, und die Gärtnerin ', ' eine Warnung.'], entries: [['messen', ['misst']], ['starten', ['startet']], ['erhalten', ['erhält']]] },
  { title: 'Das Samstagstraining', instruction: 'Ergänze diese Sportroutine.', segments: ['Die Mannschaft ', ' sich samstags um neun Uhr. Die Trainerin ', ' das Aufwärmen, danach ', ' die Spieler kurze Pässe.'], entries: [['treffen', ['trifft']], ['leiten', ['leitet']], ['üben', ['üben']]] },
  { title: 'Die Sortieranlage', instruction: 'Ergänze diesen technischen Prozess.', segments: ['Ein Förderband ', ' den Abfall nach vorn. Ein Magnet ', ' den Stahl heraus, und zwei Fachkräfte ', ' den Rest von Hand.'], entries: [['transportieren', ['transportiert']], ['ziehen', ['zieht']], ['sortieren', ['sortieren']]] },
  { title: 'Abends in der Buchhandlung', instruction: 'Ergänze diese Schlussroutine.', segments: ['Um neunzehn Uhr ', ' die Kassiererin die letzte Durchsage. Die Kunden ', ' ihre Einkäufe, danach ', ' die Leiterin die Türen.'], entries: [['machen', ['macht']], ['beenden', ['beenden']], ['schließen', ['schließt']]] },
  { title: 'Das Inselschiff', instruction: 'Ergänze diese regelmäßige Route.', segments: ['Das Schiff ', ' die Insel um sechs Uhr. Es ', ' in zwei kleinen Häfen und ', ' das Festland vor neun Uhr.'], entries: [['verlassen', ['verlässt']], ['halten', ['hält']], ['erreichen', ['erreicht']]] },
  { title: 'Eine Ausleihe', instruction: 'Ergänze dieses übliche Verfahren.', segments: ['Der Besucher ', ' einen Titel im Katalog. Er ', ' seinen Ausweis am Schalter, und die Bibliothekarin ', ' das Rückgabedatum.'], entries: [['suchen', ['sucht']], ['zeigen', ['zeigt']], ['nennen', ['nennt']]] },
]

const errors: GermanEditorialErrorSeed[] = [
  { title: 'Der erste Dienst', pieces: [['Jeden Morgen ', 'öffnen'], [' Ines die Rollläden. Ihr Bruder ', 'prüft'], [' die Öfen, und die Bäckerin ', 'füllt']], after: ' die Auslage.', wrong: 0, answers: ['öffnet'], reason: 'Zum Singular „Ines“ gehört „öffnet“.' },
  { title: 'Am Empfang', pieces: [['Die Ärztin ', 'prüft'], [' die Liste. Die Sekretärin ', 'öffnen'], [' den Empfang, und die Patienten ', 'warten']], after: ' im Flur.', wrong: 1, answers: ['öffnet'], reason: 'Zum Singular „die Sekretärin“ gehört „öffnet“.' },
  { title: 'Die erste Führung', pieces: [['Das Museum ', 'öffnen'], [' um zehn Uhr. Die Führerin ', 'begrüßt'], [' die Gruppe, und die Gäste ', 'folgen']], after: ' ihr nach oben.', wrong: 0, answers: ['öffnet'], reason: 'Zum Singular „das Museum“ gehört „öffnet“.' },
  { title: 'Maliks Arbeitsweg', pieces: [['Malik ', 'verlassen'], [' um sieben Uhr die Wohnung. Er ', 'trifft'], [' Zoe im Park, und beide ', 'fahren']], after: ' gemeinsam weiter.', wrong: 0, answers: ['verlässt'], reason: 'Zum Singular „Malik“ gehört „verlässt“.' },
  { title: 'Die Lokalnachrichten', pieces: [['Der Produzent ', 'wählen aus'], [' die Themen. Die Redakteurin ', 'prüft'], [' die Fakten, und der Moderator ', 'liest vor']], after: ' die Meldungen.', wrong: 0, answers: ['wählt aus'], reason: 'Das finite Verb stimmt mit „der Produzent“ überein; der Verbzusatz bleibt am Satzende.' },
  { title: 'Die Gewächshaussteuerung', pieces: [['Der Sensor ', 'misst'], [' die Wärme. Der Ventilator ', 'startet'], [', und zwei Fenster ', 'öffnet sich']], after: ' im Dach.', wrong: 2, answers: ['öffnen sich'], reason: 'Das Pluralsubjekt „zwei Fenster“ verlangt „öffnen sich“.' },
  { title: 'Samstag im Stadion', pieces: [['Die Mannschaft ', 'trifft'], [' sich um neun Uhr. Die Trainerin ', 'leiten'], [' das Aufwärmen, und die Spieler ', 'laufen']], after: ' um den Platz.', wrong: 1, answers: ['leitet'], reason: 'Zum Singular „die Trainerin“ gehört „leitet“.' },
  { title: 'Im Sortierzentrum', pieces: [['Das Band ', 'transportiert'], [' den Abfall. Ein Magnet ', 'ziehen'], [' den Stahl heraus, und die Fachkräfte ', 'sortieren']], after: ' den Rest.', wrong: 1, answers: ['zieht'], reason: 'Zum Singular „ein Magnet“ gehört „zieht“.' },
  { title: 'Feierabend', pieces: [['Die Kassiererin ', 'macht'], [' eine Durchsage. Die Kunden ', 'beendet'], [' ihre Einkäufe, und die Leiterin ', 'schließt']], after: ' die Türen.', wrong: 1, answers: ['beenden'], reason: 'Das Pluralsubjekt „die Kunden“ verlangt „beenden“.' },
  { title: 'Ein ausgeliehener Roman', pieces: [['Der Besucher ', 'sucht'], [' einen Titel. Er ', 'zeigt'], [' seinen Ausweis, und die Bibliothekarinnen ', 'nennt']], after: ' das Rückgabedatum.', wrong: 2, answers: ['nennen'], reason: 'Das Pluralsubjekt „die Bibliothekarinnen“ verlangt „nennen“.' },
]

const sequences: GermanEditorialSequenceSeed[] = [
  { events: ['Ines öffnet die Rollläden', 'Ihr Bruder prüft die Öfen', 'Die Bäckerin füllt die Auslage'], target: 0 },
  { events: ['Die Ärztin prüft die Liste', 'Die Sekretärin öffnet den Empfang', 'Der erste Patient kommt'], target: 1 },
  { events: ['Das Museum öffnet', 'Die Führerin begrüßt die Gruppe', 'Das Café bietet Mittagessen an'], target: 2 },
  { events: ['Malik verlässt seine Wohnung', 'Er trifft Zoe im Park', 'Beide erreichen das Büro'], target: 0 },
  { events: ['Der Produzent wählt die Themen aus', 'Die Redakteurin prüft die Fakten', 'Der Moderator liest die Meldungen vor'], target: 1 },
  { events: ['Der Sensor misst die Wärme', 'Der Ventilator startet', 'Die Gärtnerin erhält eine Warnung'], target: 2 },
  { events: ['Die Mannschaft trifft sich', 'Die Trainerin leitet das Aufwärmen', 'Die Spieler üben kurze Pässe'], target: 0 },
  { events: ['Das Band transportiert den Abfall', 'Der Magnet zieht den Stahl heraus', 'Die Fachkräfte sortieren den Rest'], target: 1 },
  { events: ['Die Kassiererin macht eine Durchsage', 'Die Kunden beenden ihre Einkäufe', 'Die Leiterin schließt die Türen'], target: 2 },
  { events: ['Der Besucher sucht einen Titel', 'Er zeigt seinen Ausweis', 'Die Bibliothekarin nennt das Rückgabedatum'], target: 0 },
]

const final: GermanEditorialFinalSeed[] = [
  { before: 'Jeden Montag ', after: ' die Leiterin vor der Öffnung den Bestand.', answer: 'zählt', distractors: ['hat gezählt', 'zählte', 'wird zählen'] },
  { before: 'Die Flughafenbahn ', after: ' alle fünfzehn Minuten.', answer: 'fährt', distractors: ['ist gefahren', 'fuhr', 'wird fahren'] },
  { before: 'Die Software ', after: ' nach jeder Änderung eine Sicherungskopie.', answer: 'erstellt', distractors: ['hat erstellt', 'erstellte', 'wird erstellen'] },
  { before: 'Meine Nachbarn ', after: ' samstags ihren Marktstand.', answer: 'betreiben', distractors: ['haben betrieben', 'betrieben', 'werden betreiben'] },
  { before: 'Der Mond ', after: ' das Licht der Sonne.', answer: 'reflektiert', distractors: ['hat reflektiert', 'reflektierte', 'wird reflektieren'] },
  { before: 'Diese Tür ', after: ' sich, sobald die Anzeige grün wird.', answer: 'entriegelt', distractors: ['hat entriegelt', 'entriegelte', 'wird entriegeln'] },
  { before: 'Der Küstenweg ', after: ' am alten Leuchtturm.', answer: 'endet', distractors: ['hat geendet', 'endete', 'wird enden'] },
  { before: 'Unser Chor ', after: ' donnerstags im Gemeindesaal.', answer: 'probt', distractors: ['hat geprobt', 'probte', 'wird proben'] },
  { before: 'Zwei Techniker ', after: ' den Generator einmal im Monat.', answer: 'testen', distractors: ['haben getestet', 'testeten', 'werden testen'] },
  { before: 'Die Winterausstellung ', after: ' am ersten Montag im Dezember.', answer: 'öffnet', distractors: ['hat geöffnet', 'öffnete', 'wird öffnen'] },
]

export const GERMAN_PRESENT_EDITORIAL = createGermanEditorialPack({
  slug: 'praesens', form: 'praesens', focus: 'Präsens',
  rule: 'Das Präsens bezeichnet Gewohnheiten, geltende Regeln, allgemeine Tatsachen und offiziell festgelegte Termine; ein trennbarer Verbzusatz gehört zur vollständigen Antwort.',
  micro, long, errors, sequences, final,
})
