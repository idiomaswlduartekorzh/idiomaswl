import type { EpisodeSection } from '@/components/practica/EpisodeNotes';

export const GOETHE_B1_GERMAN_PODCAST = {
  id: 'goethe-zertifikat-b1-18-richtige-antworten',
  title: 'Goethe-Zertifikat B1: Mit 18 richtigen Antworten durch Lesen oder Hören',
  description: 'Eine deutschsprachige Orientierung zum Goethe-Zertifikat B1: Aufbau und Zeiten der vier Module, die genaue Bedeutung von 18 richtigen Antworten in Lesen oder Hören und ein Lernzyklus, der Fehler in gezieltes Training übersetzt.',
  duration: '21:07',
  audioSrc: '/audio/goethe/strategy-map/goethe-zertifikat-b1-18-richtige-antworten.mp3?v=20260831',
  locale: 'de',
  outcomes: [
    'die vier B1-Module und ihre Prüfungszeiten unterscheiden;',
    'erklären, warum 18 richtige Antworten nur in Lesen oder Hören 60 Punkte ergeben;',
    'Lesen und Hören mit Belegen, Paraphrasen und einer Fehleranalyse trainieren;',
    'einen Modelltest in einen fokussierten Trainings- und Kontrollzyklus verwandeln.',
  ],
  editorialTitle: 'Quellengeprüfte und gekürzte Fassung',
  editorialBody: 'Geprüft am 31. August 2026 anhand der offiziellen B1-Durchführungsbestimmungen des Goethe-Instituts. Für diese Veröffentlichung wurden ungenaue Aussagen zu C2 und TestDaF, eine unbelegte psychologische Erklärung, eine zu breite Darstellung der Drittbewertung und missverständliche Formulierungen zu „18 Punkten“ sowie zur B1-Wortliste entfernt. Die Schwelle von 18 richtigen Antworten gilt ausschließlich für Lesen oder Hören im Goethe-Zertifikat B1.',
} as const;

export const GOETHE_B1_GERMAN_NOTES: EpisodeSection[] = [
  {
    heading: 'Goethe-Zertifikat ist eine Prüfungsfamilie',
    body: [
      'Die Goethe-Zertifikate reichen von A1 bis C2. Aufgaben, Länge, Bewertung und Verwendungszweck verändern sich mit dem Niveau. Deshalb darf eine Regel aus B1 nicht automatisch auf A2, B2, C1 oder C2 übertragen werden.',
      'Kläre vor der Anmeldung, welches Zertifikat die zuständige Hochschule, Behörde oder der Arbeitgeber verlangt. Nutze danach ausschließlich die Modelltests und Durchführungsbestimmungen deines konkreten Niveaus.',
    ],
  },
  {
    heading: 'Die vier Module im Goethe-Zertifikat B1',
    body: [
      'B1 besteht aus Lesen, Hören, Schreiben und Sprechen. Lesen dauert 65 Minuten, Hören ungefähr 40 Minuten, Schreiben 60 Minuten und Sprechen in der Regel ungefähr 15 Minuten bei einer Paarprüfung. Für Sprechen gibt es Vorbereitungszeit.',
      'Die vier Module können gemeinsam oder einzeln abgelegt werden. Ein nicht bestandenes Modul kann erneut abgelegt werden; Termine, Fristen und organisatorische Bedingungen legt das jeweilige Prüfungszentrum im Rahmen der Prüfungsordnung fest.',
    ],
  },
  {
    heading: 'Was die Zahl 18 tatsächlich bedeutet',
    body: [
      'In B1-Lesen und B1-Hören gibt es jeweils 30 bewertete Items. Die Rohpunkte werden auf eine Skala von 100 umgerechnet. Laut offizieller Umrechnungstabelle ergeben 18 richtige Antworten 60 Punkte und damit genau die Bestehensgrenze des jeweiligen Moduls.',
      'Es geht also nicht um 18 Punkte und nicht um 18 richtige Antworten in der gesamten Prüfung. Die Aussage gilt getrennt für Lesen und Hören. Schreiben und Sprechen werden mit veröffentlichten Kriterien bewertet und folgen keiner 30-Item-Umrechnung.',
    ],
  },
  {
    heading: 'Lesen: Beleg vor Bauchgefühl',
    body: [
      'Bestimme zuerst, welche Entscheidung die Aufgabe verlangt. Suche anschließend nach der Textstelle, die deine Antwort trägt, und achte auf Paraphrasen: In der richtigen Option stehen häufig andere Wörter als im Text, aber dieselbe Bedeutung.',
      'Distraktoren greifen oft ein sichtbares Wort auf, verändern jedoch Negation, Umfang, Zeitpunkt oder Absicht. Markiere den Beleg und frage dich bei jeder falschen Antwort, ob Wortschatz, Satzstruktur, Schlussfolgerung, Aufgabenverständnis oder Zeitdruck die Ursache war.',
    ],
  },
  {
    heading: 'Hören: Optionen vergleichen und Signale verfolgen',
    body: [
      'Nutze die Zeit vor dem Audio, um Unterschiede zwischen den Optionen zu erkennen. Höre dann gezielt auf Sprecher, Ort, Absicht, Zahlen, Negationen, Korrekturen und Meinungswechsel. Ein bekanntes Wort allein beweist keine Antwort.',
      'Nach der Aufgabe reicht es nicht, nur die Lösung zu sehen. Höre die entscheidende Stelle erneut, notiere das überhörte Signal und trainiere genau dieses Muster mit neuem Material. So wird aus einem Fehler eine übertragbare Hörentscheidung.',
    ],
  },
  {
    heading: 'Schreiben und Sprechen werden kriterial bewertet',
    body: [
      'Bei Schreiben und Sprechen beurteilen zwei qualifizierte Personen die Leistung. Für Schreiben sieht die B1-Regelung eine dritte Bewertung nur in einem besonderen Fall vor: Eine Bewertung liegt unter 60, die andere darüber und auch der errechnete Mittelwert bleibt unter 60.',
      'Für die Vorbereitung zählt die veröffentlichte Bewertungsmatrix. Trainiere Aufgabenerfüllung, Organisation, sprachliche Mittel und Verständlichkeit beziehungsweise Interaktion entsprechend dem Modul, statt auf eine allgemeine subjektive Eindrucksnote zu hoffen.',
    ],
  },
  {
    heading: 'Modelltests messen — die Analyse verbessert',
    body: [
      'Ein kompletter Modelltest zeigt deinen aktuellen Stand, beseitigt aber nicht automatisch die Ursache eines Fehlers. Teile das Ergebnis nach Modulen und Fehlertypen auf. Wähle anschließend eine einzige prioritäre Schwäche und trainiere sie in kurzen, kontrollierten Blöcken.',
      'Die B1-Wortliste hilft als Orientierung über den erwarteten Wortschatz. Sie ist keine abgeschlossene Liste aller Prüfungswörter und kein Verzeichnis, das vollständig aktiv auswendig gelernt werden muss. Ergänze sie durch Wortfamilien, Kollokationen und Paraphrasen aus echten Aufgaben.',
    ],
  },
  {
    heading: 'Ein wiederholbarer Lernzyklus',
    body: [
      'Arbeite in der Reihenfolge Diagnostizieren → Fehler klassifizieren → Teilfertigkeit trainieren → mit neuer Aufgabe prüfen → unter Zeitdruck übertragen. Vergleiche nicht nur Punktzahlen, sondern auch Bearbeitungszeit und Fehlerursachen.',
      'WeLearn ist eine unabhängige Lernplattform und nicht mit dem Goethe-Institut verbunden. Verbindliche Angaben zu Anmeldung, Terminen, Preisen, Prüfungsorten und aktuellen Regeln findest du beim Goethe-Institut und beim autorisierten Prüfungszentrum.',
    ],
    bullets: [
      'Offiziellen Modelltest des exakten Niveaus wählen.',
      'Jedes Modul getrennt auswerten.',
      'Zu jeder falschen Antwort den Beleg und die Ursache notieren.',
      'Nur die wichtigste Schwäche gezielt trainieren.',
      'Mit unbekanntem Material erneut messen.',
    ],
  },
];
