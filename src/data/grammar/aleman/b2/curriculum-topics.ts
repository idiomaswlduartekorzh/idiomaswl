import { createGermanAdvancedCurriculumTopic as topic, pattern as p, type GermanAdvancedCurriculumSpec } from '../advanced-curriculum-factory.ts'

const specs: GermanAdvancedCurriculumSpec[] = [
  {
    slug: 'erzaehlzeiten-b2', order: '01', level: 'B2', category: 'Zeit und Aspekt', color: '#E0A400', shortTitle: 'Erzählzeiten: Präteritum, Perfekt und Plusquamperfekt',
    description: 'Koordinieren Sie Erzählzeit, Vorzeitigkeit und mündlichen Rückblick, ohne die zeitliche Perspektive zu verlieren.', purpose: 'Ereignisfolge, Hintergrund und Vorzeitigkeit eindeutig zu ordnen', register: 'Erzählungen, Berichte, Biografien und Rückblicke', formula: 'Plusquamperfekt = vorzeitig | Präteritum = Erzählachse | Perfekt = Gegenwartsbezug', model: 'Als der Zug einfuhr, hatte sie bereits eine Stunde gewartet.',
    patterns: [
      p('Erzählachse', 'Präteritum des Vollverbs', 'Der Zug hielt plötzlich vor dem Tunnel.', 'ein abgeschlossenes Ereignis in einer schriftlichen Erzählung', 'hielt', 'Verwenden Sie in einer formellen Erzählung nicht wahllos Perfekt und Präteritum.'),
      p('Vorzeitigkeit', 'hatte/war + Partizip II', 'Als der Zug einfuhr, hatte sie bereits eine Stunde gewartet.', 'ein Ereignis vor einem anderen vergangenen Zeitpunkt', 'hatte', 'Setzen Sie das Plusquamperfekt nur ein, wenn ein früherer Bezugspunkt erkennbar ist.'),
      p('Mündlicher Rückblick', 'haben/sein + Partizip II', 'Gestern habe ich den letzten Zug verpasst.', 'einen abgeschlossenen Vorgang mit Bezug zur Gesprächssituation', 'habe', 'Das Perfekt ersetzt nicht automatisch jede schriftliche Erzählzeit.'),
    ],
  },
  {
    slug: 'futur-vermutung-b2', order: '02', level: 'B2', category: 'Zeit und Aspekt', color: '#E0A400', shortTitle: 'Futur I und Futur II als Vermutung',
    description: 'Unterscheiden Sie Zukunftsplanung, gegenwärtige Vermutung und vermutete Abgeschlossenheit.', purpose: 'Zeitbezug und Grad der Wahrscheinlichkeit präzise zu markieren', register: 'Prognosen, Nachrichten, Gespräche und formelle Einschätzungen', formula: 'wird + Infinitiv | wird + Partizip II + haben/sein', model: 'Sie wird den Bericht inzwischen abgeschickt haben.',
    patterns: [
      p('Zukunft', 'werden + Infinitiv', 'Wir werden die Ergebnisse morgen veröffentlichen.', 'eine zukünftige Handlung ausdrücklich anzukündigen', 'werden', 'Verwenden Sie das Futur nicht, wenn ein eindeutiges Zeitadverb das Präsens natürlicher macht.'),
      p('Vermutung über die Gegenwart', 'werden + Infinitiv + wohl', 'Er wird jetzt wohl im Büro sein.', 'eine plausible Annahme über die Gegenwart auszudrücken', 'wohl', 'Verwechseln Sie eine Vermutung nicht mit einer sicheren Zukunftsaussage.'),
      p('Vermutung über Vergangenes', 'werden + Partizip II + haben/sein', 'Sie wird den Bericht inzwischen abgeschickt haben.', 'eine vermutlich bereits abgeschlossene Handlung zu markieren', 'abgeschickt', 'Im Futur II steht der Hilfsinfinitiv am Ende.'),
    ],
  },
  {
    slug: 'passiv-zeiten-b2', order: '03', level: 'B2', category: 'Genus Verbi', color: '#D29A00', shortTitle: 'Vorgangspassiv in allen Zeiten',
    description: 'Rücken Sie den Vorgang in den Vordergrund und halten Sie Tempus und Handlungsträger kontrollierbar.', purpose: 'Prozesse unabhängig vom Handelnden zeitlich genau darzustellen', register: 'Sachtexte, Nachrichten, Anleitungen und wissenschaftliche Berichte', formula: 'werden im Tempus + Partizip II | Perfekt: ist + Partizip II + worden', model: 'Die Daten sind gestern ausgewertet worden.',
    patterns: [
      p('Präsenspassiv', 'wird/werden + Partizip II', 'Die Proben werden im Labor untersucht.', 'einen laufenden Prozess hervorzuheben', 'werden', 'Verwechseln Sie werden als Passivhilfsverb nicht mit dem Futur.'),
      p('Präteritumpassiv', 'wurde/wurden + Partizip II', 'Die Proben wurden am Montag untersucht.', 'einen abgeschlossenen Vorgang im Bericht zu benennen', 'wurden', 'Passen Sie wurde oder wurden an das neue Subjekt an.'),
      p('Perfektpassiv', 'ist/sind + Partizip II + worden', 'Die Daten sind gestern ausgewertet worden.', 'das Ergebnis eines abgeschlossenen Vorgangs zu berichten', 'worden', 'Im Perfektpassiv heißt es worden, nicht geworden.'),
    ],
  },
  {
    slug: 'zustandspassiv-b2', order: '04', level: 'B2', category: 'Genus Verbi', color: '#D29A00', shortTitle: 'Zustandspassiv und Vorgangspassiv',
    description: 'Trennen Sie den resultierenden Zustand vom Prozess, der zu diesem Zustand geführt hat.', purpose: 'zwischen Handlung und Ergebniszustand eindeutig zu unterscheiden', register: 'Beschreibungen, Protokolle, Alltag und technische Dokumentation', formula: 'Vorgang: werden + Partizip II | Zustand: sein + Partizip II', model: 'Die Tür ist seit acht Uhr geschlossen.',
    patterns: [
      p('Vorgang', 'werden + Partizip II', 'Die Tür wird um acht Uhr geschlossen.', 'den Ablauf einer Handlung zu betonen', 'wird', 'Ein Vorgangspassiv bezeichnet nicht automatisch einen dauernden Zustand.'),
      p('Zustand', 'sein + Partizip II', 'Die Tür ist seit acht Uhr geschlossen.', 'das Ergebnis nach einer Handlung zu beschreiben', 'ist', 'Prüfen Sie, ob wirklich ein Resultat und nicht der Vorgang gemeint ist.'),
      p('Vergangener Zustand', 'war + Partizip II', 'Der Eingang war während der Sitzung gesperrt.', 'einen Zustand in einem vergangenen Zeitraum zu verorten', 'war', 'Das Präteritum von sein trägt hier die Zeitinformation.'),
    ],
  },
  {
    slug: 'passiversatzformen-b2', order: '05', level: 'B2', category: 'Genus Verbi', color: '#D29A00', shortTitle: 'Passiversatzformen',
    description: 'Variieren Sie passive Perspektiven mit man, sich lassen und sein plus zu, ohne Modalität zu verlieren.', purpose: 'Möglichkeit, Notwendigkeit und unpersönliche Handlung natürlich auszudrücken', register: 'Anleitungen, Verwaltungssprache, Bewertungen und Alltagskommunikation', formula: 'man + Aktiv | sich lassen + Infinitiv | sein + zu + Infinitiv', model: 'Das Problem lässt sich ohne Zusatzkosten lösen.',
    patterns: [
      p('Unpersönliches Aktiv', 'man + finites Verb', 'Man überprüft die Anträge innerhalb einer Woche.', 'den Handelnden allgemein zu lassen', 'Man', 'Man verlangt ein Verb in der dritten Person Singular.'),
      p('Möglichkeit', 'sich lassen + Infinitiv', 'Das Problem lässt sich ohne Zusatzkosten lösen.', 'eine passive Möglichkeit auszudrücken', 'lässt', 'Vergessen Sie das Reflexivpronomen sich nicht.'),
      p('Notwendigkeit', 'sein + zu + Infinitiv', 'Die Frist ist unbedingt einzuhalten.', 'eine verbindliche Notwendigkeit zu formulieren', 'einzuhalten', 'Die Konstruktion kann je nach Kontext Möglichkeit oder Pflicht bedeuten.'),
    ],
  },
  {
    slug: 'konjunktiv-ii-vergangenheit-b2', order: '06', level: 'B2', category: 'Modus und Haltung', color: '#C58F00', shortTitle: 'Konjunktiv II der Vergangenheit',
    description: 'Formulieren Sie irreale Rückblicke, Bedauern und nicht eingetretene Alternativen.', purpose: 'kontrafaktische Vergangenheit und ihre Folgen differenziert auszudrücken', register: 'Reflexion, Beratung, Erzählung und argumentatives Schreiben', formula: 'hätte/wäre + Partizip II | hätte + Infinitiv + Modalinfinitiv', model: 'Wenn wir früher gestartet wären, hätten wir den Zug erreicht.',
    patterns: [
      p('Irreale Bedingung', 'wenn + Plusquamperfekt Konjunktiv II', 'Wenn wir früher gestartet wären, hätten wir den Zug erreicht.', 'eine nicht erfüllte Bedingung und ihre Folge zu verbinden', 'wären', 'Beide Teilsätze müssen denselben kontrafaktischen Zeitrahmen behalten.'),
      p('Bedauern', 'hätte/wäre + doch + Partizip II', 'Hätte ich doch genauer zugehört!', 'ein starkes Bedauern über Vergangenes auszudrücken', 'doch', 'Die Verb-Erst-Stellung verstärkt den Ausruf, ersetzt aber nicht die Konjunktivform.'),
      p('Modalverb in der Vergangenheit', 'hätte + Infinitiv + Modalinfinitiv', 'Du hättest früher anrufen sollen.', 'eine nachträgliche Empfehlung oder Kritik zu äußern', 'sollen', 'Nach Modalverben steht der Ersatzinfinitiv statt des Partizips.'),
    ],
  },
  {
    slug: 'irreale-vergleiche-b2', order: '07', level: 'B2', category: 'Modus und Haltung', color: '#C58F00', shortTitle: 'Irreale Vergleiche mit als ob',
    description: 'Markieren Sie scheinbare oder bewusst unwirkliche Vergleiche mit kontrolliertem Zeitbezug.', purpose: 'Eindruck und Wirklichkeit voneinander abzugrenzen', register: 'Beschreibungen, Bewertungen, literarische Texte und Gespräche', formula: 'als ob + Konjunktiv II am Ende | als + Verb im Konjunktiv II', model: 'Er spricht, als ob er alles genau wüsste.',
    patterns: [
      p('Gegenwärtiger Eindruck', 'als ob + Konjunktiv II', 'Er spricht, als ob er alles genau wüsste.', 'einen unwirklichen Eindruck in der Gegenwart zu markieren', 'wüsste', 'Nach als ob steht das finite Verb am Satzende.'),
      p('Vergangener Eindruck', 'als ob + Konjunktiv II Vergangenheit', 'Sie sah aus, als ob sie nicht geschlafen hätte.', 'einen scheinbaren vergangenen Grund anzudeuten', 'hätte', 'Achten Sie auf hätte oder wäre plus Partizip II.'),
      p('Verkürzte Form', 'als + Konjunktivverb + Subjekt', 'Er tut so, als kenne er die Antwort.', 'einen formellen irrealen Vergleich knapp zu formulieren', 'kenne', 'Nach als ohne ob folgt häufig Verb-Erst-Stellung.'),
    ],
  },
  {
    slug: 'indirekte-rede-konjunktiv-i-b2', order: '08', level: 'B2', category: 'Modus und Haltung', color: '#C58F00', shortTitle: 'Indirekte Rede mit Konjunktiv I',
    description: 'Geben Sie fremde Aussagen wieder und halten Sie Distanz zur Wahrheit der Aussage.', purpose: 'Quelle, Person und zeitlichen Bezug in berichteter Rede zu sichern', register: 'Presse, Protokolle, Berichte und formelle Zusammenfassungen', formula: 'Einleitungsverb + Konjunktiv I | Ersatz: Konjunktiv II', model: 'Die Sprecherin erklärte, die Verhandlungen seien abgeschlossen.',
    patterns: [
      p('Aussage wiedergeben', 'Konjunktiv I Präsens', 'Die Sprecherin erklärt, die Verhandlungen seien abgeschlossen.', 'eine fremde Aussage distanziert wiederzugeben', 'seien', 'Der Konjunktiv I signalisiert Wiedergabe, nicht automatisch Zweifel.'),
      p('Vorzeitigkeit', 'Konjunktiv I Perfekt', 'Er sagte, er habe die Unterlagen bereits geschickt.', 'eine frühere Handlung in der indirekten Rede zu markieren', 'habe', 'Übernehmen Sie nicht einfach das Tempus der direkten Rede.'),
      p('Ersatzform', 'Konjunktiv II bei Formgleichheit', 'Sie sagten, sie hätten keine weiteren Fragen.', 'Mehrdeutigkeit zwischen Indikativ und Konjunktiv zu vermeiden', 'hätten', 'Nutzen Sie den Konjunktiv II nur, wenn der Konjunktiv I nicht eindeutig ist.'),
    ],
  },
  {
    slug: 'modalverben-subjektiv-b2', order: '09', level: 'B2', category: 'Modus und Haltung', color: '#C58F00', shortTitle: 'Subjektive Bedeutung der Modalverben',
    description: 'Nutzen Sie müssen, dürfen, können und sollen zur Einschätzung von Wahrscheinlichkeit und Quelle.', purpose: 'Sicherheit, Vermutung und fremde Behauptung abgestuft auszudrücken', register: 'Analyse, Presse, Diskussion und wissenschaftsnahe Texte', formula: 'Modalverb + Infinitiv | Vergangenheit: Modalverb + Partizip II + haben/sein', model: 'Die Ursache dürfte inzwischen gefunden worden sein.',
    patterns: [
      p('Hohe Sicherheit', 'müssen + Infinitiv', 'Er muss die Nachricht übersehen haben.', 'eine sehr wahrscheinliche Schlussfolgerung auszudrücken', 'muss', 'Müssen bezeichnet hier keine Pflicht.'),
      p('Vorsichtige Vermutung', 'dürfte + Infinitiv', 'Die Ursache dürfte inzwischen gefunden worden sein.', 'eine wahrscheinliche, aber vorsichtige Einschätzung zu geben', 'dürfte', 'Dürfte ist in dieser Funktion kein Erlaubnisverb.'),
      p('Fremde Behauptung', 'sollen + Infinitiv', 'Der Zeuge soll den Ort früh verlassen haben.', 'eine nicht bestätigte Information einer Quelle zuzuordnen', 'soll', 'Sollen markiert Hörensagen und keine moralische Empfehlung.'),
    ],
  },
  {
    slug: 'infinitivsaetze-zu-b2', order: '10', level: 'B2', category: 'Satzbau', color: '#B98300', shortTitle: 'Infinitivsätze mit zu',
    description: 'Verdichten Sie Ergänzungssätze, wenn das implizite Subjekt eindeutig kontrolliert wird.', purpose: 'Wiederholungen zu vermeiden und komplexe Aussagen kompakt zu verbinden', register: 'formelle Korrespondenz, Planung, Beratung und Sachtexte', formula: 'Bezugswort + zu + Infinitiv | trennbar: Präfix + zu + Stamm', model: 'Sie versprach, den Bericht bis Freitag abzugeben.',
    patterns: [
      p('Subjektkontrolle', 'Komma + zu-Infinitiv', 'Sie versprach, den Bericht bis Freitag abzugeben.', 'eine Handlung desselben Subjekts kompakt anzuschließen', 'abzugeben', 'Der Infinitivsatz braucht einen eindeutigen logischen Handlungsträger.'),
      p('Unpersönliche Bewertung', 'es ist + Adjektiv + zu-Infinitiv', 'Es ist wichtig, alle Quellen zu prüfen.', 'eine allgemeine Bewertung mit einer Handlung zu verbinden', 'zu prüfen', 'Setzen Sie das Komma bei angekündigtem Infinitivsatz.'),
      p('Nomen als Bezug', 'Nomen + haben + zu-Infinitiv', 'Wir haben die Absicht, das Verfahren zu vereinfachen.', 'eine Absicht oder einen Plan nominal anzukündigen', 'zu vereinfachen', 'Wählen Sie ein Bezugsnomen, das inhaltlich zum Infinitiv passt.'),
    ],
  },
  {
    slug: 'um-ohne-anstatt-zu-b2', order: '11', level: 'B2', category: 'Satzbau', color: '#B98300', shortTitle: 'um, ohne und anstatt zu',
    description: 'Verbinden Sie Ziel, fehlende Begleithandlung und Alternative in verdichteten Infinitivgruppen.', purpose: 'finale und modale Beziehungen ohne unnötigen Nebensatz auszudrücken', register: 'Anleitungen, Argumentation, Berichte und Alltag', formula: 'um/ohne/anstatt + Ergänzungen + zu + Infinitiv', model: 'Sie überprüfte die Zahlen erneut, um Fehler zu vermeiden.',
    patterns: [
      p('Zweck', 'um ... zu + Infinitiv', 'Sie überprüfte die Zahlen erneut, um Fehler zu vermeiden.', 'das Ziel einer Handlung auszudrücken', 'um', 'Um zu verlangt in der Regel dasselbe logische Subjekt wie der Hauptsatz.'),
      p('Fehlende Begleithandlung', 'ohne ... zu + Infinitiv', 'Er unterschrieb, ohne den Vertrag vollständig zu lesen.', 'eine nicht ausgeführte Begleithandlung zu markieren', 'ohne', 'Verwechseln Sie ohne zu nicht mit einer Bedingung.'),
      p('Alternative', 'anstatt ... zu + Infinitiv', 'Anstatt zu antworten, wechselte sie das Thema.', 'eine nicht gewählte Alternative gegenüberzustellen', 'Anstatt', 'Nach anstatt zu muss die alternative Handlung grammatisch parallel sein.'),
    ],
  },
  {
    slug: 'partizipialkonstruktionen-b2', order: '12', level: 'B2', category: 'Satzbau', color: '#B98300', shortTitle: 'Partizipialkonstruktionen',
    description: 'Verdichten Sie gleichzeitige, abgeschlossene oder charakterisierende Informationen mit Partizipien.', purpose: 'Nebenaussagen kompakt und stilistisch kontrolliert einzubetten', register: 'Presse, Literatur, Präsentationen und formelle Beschreibungen', formula: 'Partizip I = gleichzeitig/aktiv | Partizip II = abgeschlossen/passiv', model: 'Von den Ergebnissen überrascht, änderte das Team seinen Plan.',
    patterns: [
      p('Gleichzeitigkeit', 'Partizip I + Ergänzungen', 'Lächelnd betrat sie den Konferenzraum.', 'eine gleichzeitig ablaufende Handlung zu verdichten', 'Lächelnd', 'Das implizite Subjekt muss mit dem Subjekt des Hauptsatzes übereinstimmen.'),
      p('Abgeschlossenheit', 'Partizip II + Ergänzungen', 'Von den Ergebnissen überrascht, änderte das Team seinen Plan.', 'einen vorausgehenden oder passiven Umstand einzubetten', 'überrascht', 'Ein Partizip II kann aktivisch oder passivisch wirken; prüfen Sie den Kontext.'),
      p('Erweitertes Attribut', 'Artikel + Erweiterung + Partizip + Nomen', 'Die gestern veröffentlichten Zahlen bestätigen den Trend.', 'eine Relativsatzinformation als Attribut zu verdichten', 'veröffentlichten', 'Das Partizip erhält die Adjektivendung des Nomens.'),
    ],
  },
  {
    slug: 'relativsaetze-erweitert-b2', order: '13', level: 'B2', category: 'Satzbau', color: '#B98300', shortTitle: 'Erweiterte Relativsätze',
    description: 'Verknüpfen Sie Bezugswort, Kasus und Präposition auch in komplexen Relativsatzstrukturen.', purpose: 'Referenten präzise zu bestimmen und Wiederholungen zu vermeiden', register: 'Beschreibungen, akademische Texte, Berichte und Argumentation', formula: 'Bezugswort bestimmt Genus/Numerus | Verb bestimmt Kasus | Präposition vor Relativpronomen', model: 'Das ist die Kollegin, mit der ich das Projekt geleitet habe.',
    patterns: [
      p('Präpositionale Ergänzung', 'Präposition + Relativpronomen', 'Das ist die Kollegin, mit der ich das Projekt geleitet habe.', 'eine vom Verb verlangte Präposition zu erhalten', 'mit der', 'Wählen Sie den Kasus nach der Präposition, nicht nach dem Bezugswort.'),
      p('Genitivattribut', 'dessen/deren + Nomen', 'Wir besuchten ein Institut, dessen Bibliothek weltweit bekannt ist.', 'Besitz oder Zugehörigkeit im Relativsatz auszudrücken', 'dessen', 'Dessen und deren werden nicht dekliniert.'),
      p('Relativsatz mit eingeschobener Ergänzung', 'Relativpronomen + Mittelfeld + Verb', 'Der Vorschlag, den wir nach langer Debatte angenommen haben, gilt ab sofort.', 'zusätzliche Informationen klar einzubetten', 'den', 'Das Relativpronomen steht nahe am Beginn, das finite Verb am Ende.'),
    ],
  },
  {
    slug: 'wer-was-wo-relativ-b2', order: '14', level: 'B2', category: 'Satzbau', color: '#B98300', shortTitle: 'wer, was und wo als Relativformen',
    description: 'Beziehen Sie sich auf unbestimmte Personen, ganze Aussagen, Superlative und Orte.', purpose: 'freie und weiterführende Relativsätze passend zu verankern', register: 'Argumentation, Erzählung, Beschreibung und formelle Kommunikation', formula: 'wer = Person | was = Ganzes/Indefinitum | wo = Ort', model: 'Wer regelmäßig übt, macht schneller Fortschritte.',
    patterns: [
      p('Freier Personenbezug', 'wer ..., der ...', 'Wer regelmäßig übt, macht schneller Fortschritte.', 'eine allgemeine Personengruppe ohne Bezugsnomen zu erfassen', 'Wer', 'Kasus in Relativ- und Hauptsatz können verschieden sein.'),
      p('Bezug auf eine Aussage', 'was nach Komma', 'Er lehnte das Angebot ab, was alle überraschte.', 'einen ganzen vorherigen Sachverhalt zu kommentieren', 'was', 'Nach einem konkreten Nomen verwenden Sie normalerweise der, die oder das.'),
      p('Ortsbezug', 'wo + Nebensatz', 'Die Stadt, wo sie aufgewachsen ist, liegt am Meer.', 'einen Ort alltagssprachlich wiederaufzunehmen', 'wo', 'In formellen Texten ist in der oft präziser als wo.'),
    ],
  },
  {
    slug: 'adjektivdeklination-erweitert-b2', order: '15', level: 'B2', category: 'Nominalgruppe', color: '#A97800', shortTitle: 'Erweiterte Adjektivdeklination',
    description: 'Steuern Sie Adjektivendungen nach Nullartikel, Pronomen, Mengenangabe und komplexer Nominalgruppe.', purpose: 'Kasus, Genus und Determination in dichten Nominalgruppen sichtbar zu machen', register: 'Beschreibungen, Berichte, akademische Texte und formelle Schreiben', formula: 'stark ohne Artikelsignal | schwach nach vollem Signal | gemischt nach lückenhaftem Signal', model: 'Mehrere unerwartete technische Probleme verzögerten den Start.',
    patterns: [
      p('Nullartikel', 'starke Adjektivendung', 'Frisches regionales Gemüse wird täglich geliefert.', 'Kasus und Genus ohne Artikel sichtbar zu machen', 'Frisches', 'Ohne Artikel muss das Adjektiv die grammatische Information tragen.'),
      p('Mengenangabe', 'Mengenwort + dekliniertes Adjektiv', 'Mehrere unerwartete technische Probleme verzögerten den Start.', 'eine unbestimmte Mehrzahl genauer zu beschreiben', 'unerwartete', 'Nach mehrere steht im Plural meist die starke Endung.'),
      p('Indefinitpronomen', 'etwas/nichts + substantiviertes Adjektiv', 'Wir brauchen etwas Verlässliches.', 'eine unbestimmte Eigenschaft zu substantivieren', 'Verlässliches', 'Substantivierte Adjektive werden großgeschrieben und dekliniert.'),
    ],
  },
  {
    slug: 'nominalisierung-b2', order: '16', level: 'B2', category: 'Nominalgruppe', color: '#A97800', shortTitle: 'Nominalisierung von Verben und Adjektiven',
    description: 'Überführen Sie Handlungen und Eigenschaften in Nominalgruppen und kontrollieren Sie Ergänzungen.', purpose: 'Information kompakt zu bündeln und den Textstil gezielt zu verändern', register: 'Verwaltung, Wissenschaft, Presse und formelle Berichte', formula: 'Verb/Adjektiv → Nomen | Ergänzungen werden Attribute oder Präpositionalgruppen', model: 'Die sorgfältige Auswertung der Daten dauerte mehrere Wochen.',
    patterns: [
      p('Verbalabstraktum', 'Verb → Nomen auf -ung', 'Die sorgfältige Auswertung der Daten dauerte mehrere Wochen.', 'einen Prozess als Gegenstand des Satzes darzustellen', 'Auswertung', 'Übernehmen Sie die Ergänzungen nicht ungeprüft aus dem Verbalsatz.'),
      p('Substantivierter Infinitiv', 'das + Infinitiv', 'Das regelmäßige Lesen erweitert den Wortschatz.', 'eine Tätigkeit allgemein zu benennen', 'Lesen', 'Substantivierte Infinitive werden großgeschrieben und sind Neutrum.'),
      p('Substantiviertes Adjektiv', 'Artikel/Pronomen + Adjektivendung', 'Die Verantwortlichen prüfen den Vorfall.', 'Personen über eine relevante Eigenschaft zu bezeichnen', 'Verantwortlichen', 'Die Endung richtet sich nach Artikel, Kasus und Numerus.'),
    ],
  },
  {
    slug: 'n-deklination-b2', order: '17', level: 'B2', category: 'Nominalgruppe', color: '#A97800', shortTitle: 'N-Deklination und besondere Nomen',
    description: 'Deklinieren Sie schwache maskuline Nomen und Sonderformen in komplexen Sätzen korrekt.', purpose: 'Kasusmarkierung bei Personen- und Sachbezeichnungen zuverlässig zu erhalten', register: 'Alltag, Nachrichten, akademische Texte und formelle Korrespondenz', formula: 'Nominativ Singular ohne -n | Akkusativ/Dativ/Genitiv Singular meist -n/-en', model: 'Die Aussage des Zeugen widersprach dem Bericht.',
    patterns: [
      p('Akkusativ', 'den + Nomen auf -n/-en', 'Die Polizei befragte den Zeugen erneut.', 'ein schwaches maskulines Nomen als Objekt zu markieren', 'Zeugen', 'Lassen Sie bei schwachen Nomen die Endung im Akkusativ nicht weg.'),
      p('Dativ', 'dem + Nomen auf -n/-en', 'Die Beamtin sprach mit dem Kollegen.', 'den Dativ eines schwachen Nomens zu bilden', 'Kollegen', 'Der Artikel allein ersetzt die Nomenendung nicht.'),
      p('Genitiv', 'des + Nomen auf -n/-en', 'Die Aussage des Zeugen widersprach dem Bericht.', 'Zugehörigkeit mit einem schwachen Nomen auszudrücken', 'des Zeugen', 'Schwache Nomen erhalten im Genitiv kein zusätzliches -s.'),
    ],
  },
  {
    slug: 'genitiv-praepositionen-b2', order: '18', level: 'B2', category: 'Nominalgruppe', color: '#A97800', shortTitle: 'Genitiv und Genitivpräpositionen',
    description: 'Verwenden Sie den Genitiv für Zugehörigkeit und nach formellen Präpositionen mit sicherer Endung.', purpose: 'Beziehungen in formellen Nominalgruppen präzise zu kennzeichnen', register: 'Berichte, Recht, Verwaltung, Presse und akademische Texte', formula: 'trotz/während/wegen/innerhalb + Genitiv | maskulin/neutrum: -s/-es', model: 'Trotz des starken Regens fand die Veranstaltung statt.',
    patterns: [
      p('Grund oder Gegengrund', 'wegen/trotz + Genitiv', 'Trotz des starken Regens fand die Veranstaltung statt.', 'einen Gegengrund formell auszudrücken', 'des starken Regens', 'In formellen Texten verlangt trotz den Genitiv.'),
      p('Zeitlicher Rahmen', 'während + Genitiv', 'Während der gesamten Sitzung blieb das Thema offen.', 'einen Zeitraum als Rahmen zu setzen', 'Während', 'Verwechseln Sie die Präposition während nicht mit der Konjunktion während.'),
      p('Räumliche oder abstrakte Grenze', 'innerhalb/außerhalb + Genitiv', 'Innerhalb eines Monats wird eine Entscheidung erwartet.', 'eine Grenze oder Frist zu markieren', 'eines Monats', 'Achten Sie auf die Genitivendung des Artikels und des Nomens.'),
    ],
  },
  {
    slug: 'verben-praepositionen-da-wo-b2', order: '19', level: 'B2', category: 'Rektion und Verknüpfung', color: '#986B00', shortTitle: 'Verben mit Präpositionen und da-/wo-Komposita',
    description: 'Halten Sie Verbpräpositionen stabil und ersetzen Sie Sachbezüge durch da- oder wo-Komposita.', purpose: 'präpositionale Ergänzungen kohärent wiederaufzunehmen und zu erfragen', register: 'Gespräche, Korrespondenz, Interviews und Sachtexte', formula: 'Verb + Präposition + Kasus | Sache: da(r)+Präposition | Frage: wo(r)+Präposition', model: 'Wir rechnen damit, dass die Nachfrage weiter steigt.',
    patterns: [
      p('Sachbezug', 'da(r) + Präposition', 'Wir rechnen damit, dass die Nachfrage weiter steigt.', 'eine präpositionale Sache oder einen Folgesatz aufzunehmen', 'damit', 'Bei Personen verwenden Sie Präposition plus Pronomen, nicht da-Kompositum.'),
      p('Frage nach einer Sache', 'wo(r) + Präposition', 'Worüber haben die Delegierten gesprochen?', 'nach einer präpositionalen Sache zu fragen', 'Worüber', 'Setzen Sie r ein, wenn die Präposition mit einem Vokal beginnt.'),
      p('Personenbezug', 'Präposition + Personalpronomen', 'Wir können uns auf sie verlassen.', 'eine Person als präpositionale Ergänzung zu markieren', 'auf sie', 'Ersetzen Sie Personen nicht durch darauf oder damit.'),
    ],
  },
  {
    slug: 'temporalsaetze-b2', order: '20', level: 'B2', category: 'Rektion und Verknüpfung', color: '#986B00', shortTitle: 'Temporalsätze und Zeitrelationen',
    description: 'Ordnen Sie Gleichzeitigkeit, Vorzeitigkeit und Nachzeitigkeit mit passenden Konnektoren.', purpose: 'zeitliche Beziehungen zwischen Handlungen eindeutig zu modellieren', register: 'Erzählungen, Anleitungen, Berichte und Planungen', formula: 'während/solange = gleichzeitig | nachdem = vorher | bevor = nachher', model: 'Nachdem sie die Daten geprüft hatte, veröffentlichte sie den Bericht.',
    patterns: [
      p('Gleichzeitigkeit', 'während + Nebensatz', 'Während sie telefonierte, öffnete sie die Datei.', 'zwei parallele Vorgänge zu verbinden', 'Während', 'Während kann zeitlich oder adversativ sein; der Kontext entscheidet.'),
      p('Vorzeitigkeit', 'nachdem + Plusquamperfekt/Perfekt', 'Nachdem sie die Daten geprüft hatte, veröffentlichte sie den Bericht.', 'eine frühere Handlung vor der Haupthandlung zu markieren', 'Nachdem', 'Halten Sie die Zeitenfolge zwischen Neben- und Hauptsatz plausibel.'),
      p('Nachzeitigkeit', 'bevor + Nebensatz', 'Bevor der Vertrag gilt, müssen beide Seiten unterschreiben.', 'eine spätere Handlung als Grenze zu setzen', 'Bevor', 'Bevor und nachdem beschreiben entgegengesetzte Blickrichtungen.'),
    ],
  },
  {
    slug: 'kausal-konsekutiv-b2', order: '21', level: 'B2', category: 'Rektion und Verknüpfung', color: '#986B00', shortTitle: 'Kausale und konsekutive Beziehungen',
    description: 'Trennen Sie Ursache, Begründung und Folge mit Konjunktion, Adverb oder Präposition.', purpose: 'Argumentationsketten logisch und syntaktisch abwechslungsreich aufzubauen', register: 'Argumentation, Berichte, Präsentationen und akademische Texte', formula: 'weil/da = Ursache | deshalb/daher = Folge | sodass = Konsequenz', model: 'Die Nachfrage stieg stark, sodass zusätzliche Stellen geschaffen wurden.',
    patterns: [
      p('Ursache im Nebensatz', 'weil/da + Verb am Ende', 'Da die Nachfrage stieg, erweiterte das Unternehmen sein Team.', 'einen Grund als Nebensatz einzubetten', 'Da', 'Nach da oder weil steht das finite Verb am Ende.'),
      p('Folge im Hauptsatz', 'deshalb/daher + Verb-Zweit', 'Die Nachfrage stieg; deshalb erweiterte das Unternehmen sein Team.', 'eine Folgerung als neuen Hauptsatz zu präsentieren', 'deshalb', 'Deshalb besetzt Position eins; das finite Verb bleibt an zweiter Stelle.'),
      p('Konsequenz', 'sodass + Verb am Ende', 'Die Nachfrage stieg stark, sodass zusätzliche Stellen geschaffen wurden.', 'eine direkte Folge der vorigen Aussage auszudrücken', 'sodass', 'Sodass nennt die Folge, nicht den ursprünglichen Grund.'),
    ],
  },
  {
    slug: 'konzessiv-adversativ-b2', order: '22', level: 'B2', category: 'Rektion und Verknüpfung', color: '#986B00', shortTitle: 'Konzessive und adversative Beziehungen',
    description: 'Unterscheiden Sie unerwarteten Gegengrund von neutralem Gegensatz und Korrektur.', purpose: 'Kontraste nach logischer Stärke und Textfunktion zu staffeln', register: 'Debatten, Essays, Berichte und formelle Gespräche', formula: 'obwohl = Gegengrund | trotzdem = unerwartete Folge | während/hingegen = Gegensatz', model: 'Obwohl die Frist knapp war, wurde der Bericht rechtzeitig fertig.',
    patterns: [
      p('Gegengrund', 'obwohl + Verb am Ende', 'Obwohl die Frist knapp war, wurde der Bericht rechtzeitig fertig.', 'eine Erwartung zu nennen, die nicht eintritt', 'Obwohl', 'Obwohl und trotzdem dürfen nicht dieselbe Satzposition doppelt besetzen.'),
      p('Unerwartete Folge', 'trotzdem + Verb-Zweit', 'Die Frist war knapp; trotzdem wurde der Bericht rechtzeitig fertig.', 'die tatsächliche Folge gegen eine Erwartung zu setzen', 'trotzdem', 'Nach trotzdem folgt unmittelbar das finite Verb.'),
      p('Neutraler Gegensatz', 'während/hingegen', 'Der erste Entwurf ist knapp, während der zweite viele Details enthält.', 'zwei Eigenschaften sachlich gegenüberzustellen', 'während', 'Prüfen Sie, ob während zeitlich oder adversativ gemeint ist.'),
    ],
  },
  {
    slug: 'konditional-final-b2', order: '23', level: 'B2', category: 'Rektion und Verknüpfung', color: '#986B00', shortTitle: 'Konditionale und finale Beziehungen',
    description: 'Formulieren Sie Bedingungen und Ziele mit Nebensatz, Präposition oder Infinitivgruppe.', purpose: 'Voraussetzung und Absicht strukturell klar voneinander zu trennen', register: 'Planung, Verhandlung, Anleitung und Argumentation', formula: 'wenn/falls = Bedingung | sofern = formell | damit/um zu = Ziel', model: 'Sofern alle Unterlagen vorliegen, kann der Antrag geprüft werden.',
    patterns: [
      p('Reale Bedingung', 'falls/wenn + Verb am Ende', 'Falls Rückfragen entstehen, melden Sie sich bitte sofort.', 'eine mögliche Voraussetzung zu nennen', 'Falls', 'Falls markiert eine Möglichkeit und keine zeitliche Wiederholung.'),
      p('Formelle Einschränkung', 'sofern + Verb am Ende', 'Sofern alle Unterlagen vorliegen, kann der Antrag geprüft werden.', 'eine formelle Voraussetzung zu setzen', 'Sofern', 'Sofern passt nicht zu jeder lockeren Alltagssituation.'),
      p('Ziel mit verschiedenem Subjekt', 'damit + Nebensatz', 'Wir senden eine Erinnerung, damit niemand die Frist übersieht.', 'ein Ziel mit eigenem Subjekt auszudrücken', 'damit', 'Bei identischem Subjekt ist um zu meist kompakter.'),
    ],
  },
  {
    slug: 'zweiteilige-konnektoren-b2', order: '24', level: 'B2', category: 'Rektion und Verknüpfung', color: '#986B00', shortTitle: 'Zweiteilige Konnektoren',
    description: 'Verbinden Sie Alternativen, Ergänzungen und proportionale Entwicklungen mit parallelem Satzbau.', purpose: 'mehrteilige Beziehungen rhythmisch und logisch ausgewogen darzustellen', register: 'Präsentationen, Argumentation, Vergleiche und formelle Texte', formula: 'nicht nur ... sondern auch | entweder ... oder | je ... desto', model: 'Je genauer wir planen, desto geringer ist das Risiko.',
    patterns: [
      p('Ergänzende Steigerung', 'nicht nur ... sondern auch', 'Die Maßnahme spart nicht nur Zeit, sondern senkt auch die Kosten.', 'eine zweite Information verstärkend hinzuzufügen', 'nicht nur', 'Halten Sie die Satzteile nach beiden Elementen grammatisch parallel.'),
      p('Alternative', 'entweder ... oder', 'Entweder verlängern wir die Frist, oder wir reduzieren den Umfang.', 'zwei ausschließende Möglichkeiten gegenüberzustellen', 'Entweder', 'Beide Alternativen sollten dieselbe syntaktische Ebene haben.'),
      p('Proportionale Entwicklung', 'je + Komparativ, desto + Komparativ', 'Je genauer wir planen, desto geringer ist das Risiko.', 'zwei sich gemeinsam verändernde Größen zu verknüpfen', 'desto', 'Im je-Satz steht das Verb am Ende, im desto-Satz an zweiter Stelle.'),
    ],
  },
  {
    slug: 'wortstellung-mittelfeld-b2', order: '25', level: 'B2', category: 'Informationsstruktur', color: '#875E00', shortTitle: 'Wortstellung im Mittelfeld',
    description: 'Ordnen Sie Pronomen, Angaben und Ergänzungen nach Informationswert, Bindung und Neutralität.', purpose: 'lange Haupt- und Nebensätze natürlich und verständlich zu strukturieren', register: 'alle fortgeschrittenen mündlichen und schriftlichen Textsorten', formula: 'Pronomen vor Nomen | Tendenz: temporal - kausal - modal - lokal | bekannt vor neu', model: 'Wir haben es der neuen Kollegin gestern ausführlich erklärt.',
    patterns: [
      p('Pronomenfolge', 'Akkusativpronomen vor Dativnomen', 'Wir haben es der neuen Kollegin gestern erklärt.', 'kurze pronominale Information früh zu platzieren', 'es', 'Die neutrale Reihenfolge ändert sich bei zwei Personalpronomen.'),
      p('Angabenfolge', 'temporal - kausal - modal - lokal', 'Das Team arbeitete gestern wegen der Frist sehr konzentriert im Büro.', 'mehrere Angaben neutral zu ordnen', 'gestern', 'Die TeKaMoLo-Regel ist eine Tendenz und kein starres Gesetz.'),
      p('Informationsgewicht', 'bekannt vor neu', 'Wir haben der Kundin die neue Lösung vorgestellt.', 'neue oder betonte Information später zu setzen', 'die neue Lösung', 'Kontext und Betonung können die neutrale Reihenfolge verändern.'),
    ],
  },
  {
    slug: 'negation-skopus-b2', order: '26', level: 'B2', category: 'Informationsstruktur', color: '#875E00', shortTitle: 'Negation und Skopus',
    description: 'Positionieren Sie nicht so, dass genau der beabsichtigte Satzteil oder die gesamte Aussage negiert wird.', purpose: 'Missverständnisse über Reichweite und Kontrast der Negation zu vermeiden', register: 'Diskussion, Korrektur, formelle Schreiben und Analyse', formula: 'kein negiert Nomen | nicht vor dem fokussierten Element | Satznegation spät im Mittelfeld', model: 'Wir verschieben die Sitzung nicht wegen des Wetters.',
    patterns: [
      p('Nominalnegation', 'kein + dekliniertes Nomen', 'Es liegt noch keine endgültige Entscheidung vor.', 'das Vorhandensein eines Nomens zu negieren', 'keine', 'Kein ersetzt nicht, wenn ein bestimmter Artikel oder Pronomenbezug vorliegt.'),
      p('Kontrastnegation', 'nicht direkt vor dem Fokus', 'Wir treffen uns nicht am Montag, sondern am Dienstag.', 'genau ein Element zu korrigieren', 'nicht am Montag', 'Die Stellung von nicht bestimmt den kontrastierten Teil.'),
      p('Mehrdeutiger Skopus', 'nicht + Präpositionalgruppe', 'Wir verschieben die Sitzung nicht wegen des Wetters.', 'einen Grund zu negieren, nicht zwingend die Handlung', 'nicht wegen', 'Prüfen Sie, ob nur der Grund oder die gesamte Aussage negiert werden soll.'),
    ],
  },
  {
    slug: 'vergleichssaetze-b2', order: '27', level: 'B2', category: 'Informationsstruktur', color: '#875E00', shortTitle: 'Vergleichssätze mit je, desto und als',
    description: 'Formulieren Sie proportionale Veränderungen, reale Unterschiede und hypothetische Vergleiche.', purpose: 'Vergleichsbeziehungen nach Realität und Dynamik zu differenzieren', register: 'Analysen, Bewertungen, Statistiken und Gespräche', formula: 'je ..., desto ... | Komparativ + als | als ob + Konjunktiv II', model: 'Je länger die Verhandlungen dauern, desto höher werden die Kosten.',
    patterns: [
      p('Proportionaler Vergleich', 'je + Komparativ, desto + Komparativ', 'Je länger die Verhandlungen dauern, desto höher werden die Kosten.', 'eine parallele Entwicklung auszudrücken', 'Je', 'Beachten Sie die unterschiedliche Verbposition in beiden Teilsätzen.'),
      p('Ungleichheit', 'Komparativ + als', 'Die zweite Lösung ist deutlich günstiger als die erste.', 'zwei Größen mit einem Unterschied zu vergleichen', 'günstiger als', 'Nach einem Komparativ verwenden Sie als, nicht wie.'),
      p('Irrealer Vergleich', 'als ob + Konjunktiv II', 'Er argumentiert, als ob die Entscheidung bereits feststünde.', 'einen scheinbaren, nicht bestätigten Vergleich zu markieren', 'als ob', 'Der Konjunktiv macht die Distanz zur Wirklichkeit sichtbar.'),
    ],
  },
  {
    slug: 'erweiterte-attribute-b2', order: '28', level: 'B2', category: 'Informationsstruktur', color: '#875E00', shortTitle: 'Erweiterte Partizipialattribute',
    description: 'Verdichten Sie Relativsätze zu erweiterten Attributen und bewahren Sie dabei Kasus und Bezugslogik.', purpose: 'komplexe Nominalgruppen präzise zu lesen und zu formulieren', register: 'Presse, Wissenschaft, Verwaltung und technische Texte', formula: 'Artikel + Erweiterungen + Partizip mit Adjektivendung + Nomen', model: 'Die von der Kommission gestern veröffentlichten Empfehlungen gelten sofort.',
    patterns: [
      p('Partizip-II-Attribut', 'von-Ergänzung + Partizip II + Endung', 'Die von der Kommission veröffentlichten Empfehlungen gelten sofort.', 'eine passive Relativsatzinformation zu verdichten', 'veröffentlichten', 'Das Partizip erhält eine Adjektivendung und steht direkt vor dem Nomen.'),
      p('Partizip-I-Attribut', 'Ergänzungen + Partizip I + Endung', 'Die seit Jahren steigenden Kosten belasten den Haushalt.', 'einen andauernden aktiven Prozess als Attribut auszudrücken', 'steigenden', 'Partizip I beschreibt meist Gleichzeitigkeit und aktive Bedeutung.'),
      p('Modaler Attributersatz', 'zu + Partizip-I-Form', 'Die noch zu klärenden Fragen stehen auf der Tagesordnung.', 'Notwendigkeit innerhalb einer Nominalgruppe zu markieren', 'zu klärenden', 'Die Form zu klärend wird wie ein Adjektiv dekliniert.'),
    ],
  },
  {
    slug: 'wortbildung-b2', order: '29', level: 'B2', category: 'Wortbildung und Text', color: '#765200', shortTitle: 'Wortbildung mit Präfixen und Suffixen',
    description: 'Erschließen und bilden Sie Verben, Nomen und Adjektive über produktive Wortbausteine.', purpose: 'Bedeutungsnuancen zu erkennen und den Wortschatz systematisch zu erweitern', register: 'Sachtexte, Medien, Studium, Beruf und Alltag', formula: 'Stamm + Präfix/Suffix | Wortart und Valenz mitprüfen', model: 'Die Umsetzbarkeit des Vorschlags muss sorgfältig geprüft werden.',
    patterns: [
      p('Adjektivische Möglichkeit', 'Verbstamm + -bar', 'Die Ergebnisse sind unmittelbar vergleichbar.', 'Möglichkeit oder Eignung als Eigenschaft auszudrücken', 'vergleichbar', 'Nicht jedes Verb bildet ein gebräuchliches Adjektiv auf -bar.'),
      p('Abstraktes Nomen', 'Adjektiv + -keit/-heit', 'Die Zuverlässigkeit des Systems wurde bestätigt.', 'eine Eigenschaft als abstrakten Begriff zu benennen', 'Zuverlässigkeit', 'Prüfen Sie das Genus: Nomen auf -keit und -heit sind feminin.'),
      p('Verbpräfix', 'Präfix + Verbstamm', 'Die Behörde überarbeitet das Verfahren grundlegend.', 'die Richtung oder Art einer Handlung zu verändern', 'überarbeitet', 'Trennbarkeit und Betonung hängen vom Präfix ab.'),
    ],
  },
  {
    slug: 'kommasetzung-satzgefuege-b2', order: '30', level: 'B2', category: 'Wortbildung und Text', color: '#765200', shortTitle: 'Kommasetzung im komplexen Satz',
    description: 'Gliedern Sie Nebensätze, Infinitivgruppen, Appositionen und Aufzählungen leserfreundlich.', purpose: 'grammatische Grenzen sichtbar zu machen und Fehlbezüge zu verhindern', register: 'alle schriftlichen Textsorten auf fortgeschrittenem Niveau', formula: 'Nebensatz abtrennen | angekündigte Infinitivgruppe abtrennen | Einschub paarig markieren', model: 'Der Bericht, den wir gestern erhalten haben, enthält neue Daten.',
    patterns: [
      p('Relativsatz', 'Komma + Relativsatz + Komma', 'Der Bericht, den wir gestern erhalten haben, enthält neue Daten.', 'einen eingeschobenen Relativsatz zu begrenzen', 'den wir', 'Ein eingeschobener Relativsatz braucht zwei Kommas.'),
      p('Infinitivgruppe', 'Komma bei Ankündigung oder um/ohne/anstatt', 'Sie fasste den Entschluss, das Angebot abzulehnen.', 'eine angekündigte Infinitivgruppe abzugrenzen', 'abzulehnen', 'Bei einem Bezugsnomen ist das Komma obligatorisch.'),
      p('Apposition', 'Komma + erläuternder Einschub + Komma', 'Frau Keller, die Leiterin des Projekts, eröffnet die Sitzung.', 'eine zusätzliche Benennung einzuschieben', 'die Leiterin', 'Eine enge, notwendige Apposition wird nicht immer durch Kommas getrennt.'),
    ],
  },
]

export default specs.map(topic)
