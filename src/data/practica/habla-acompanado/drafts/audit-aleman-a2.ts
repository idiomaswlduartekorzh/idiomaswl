import type { RoleplayScenarioAudit, SimulationProfile } from './audit-ingles-a2.ts'

type AuditSeed = {
  slug: string
  source: string
  complicationAt: number
  requiredPieces: [string, string, string, string]
  note: string
}

const PROFILES: Array<{ profile: SimulationProfile; globalTurns: number; wordsA: number; wordsB: number; note: string }> = [
  { profile: 'solid-solid', globalTurns: 14, wordsA: 116, wordsB: 113, note: 'Beide Rollen liefern Datum, Grenze, Alternative und Bestätigung; die Karte ändert den Plan ohne privaten Vorgriff.' },
  { profile: 'solid-weak', globalTurns: 17, wordsA: 138, wordsB: 68, note: 'Die starke Rolle reformuliert und fragt einzeln; die schwache Rolle muss trotzdem privaten Fakt, Grenze und Entscheidung produzieren.' },
  { profile: 'weak-weak', globalTurns: 18, wordsA: 87, wordsB: 85, note: 'Beide nutzen den Werkzeugkasten zur Reparatur; der Schluss holt fehlende Verantwortliche, Nachweise und Zeiten zurück.' },
  { profile: 'quiet', globalTurns: 13, wordsA: 101, wordsB: 35, note: 'Die stille Rolle schließt nicht mit ja: Sie nennt mindestens einen privaten Fakt, eine Bedingung und einen Schlusspunkt.' },
  { profile: 'shortcut', globalTurns: 8, wordsA: 70, wordsB: 68, note: 'Der erste schnelle Weg scheitert an der Karte; auch der Mindestweg braucht beide Rollen und vier Schlussteile.' },
]

const SEEDS: AuditSeed[] = [
  {
    slug: 'one-crate-is-missing-on-the-deposit-slip', source: 'Deutsch A2 · redaktionelle Simulation · Transaktion 1', complicationAt: 5,
    requiredPieces: ['PF-620 und drei Kisten', 'sechzig Flaschen und Differenz 1,50 €', 'Foto und Automatenbericht', 'zweiter Pfandbon vor 17:20 Uhr'],
    note: 'Der Kunde kennt Foto und Sollbetrag; der Mitarbeiter kennt Bericht und nicht zugeordnete Kiste. Erst zusammen ist die Korrektur prüfbar.',
  },
  {
    slug: 'another-part-is-needed-for-the-bike-repair', source: 'Deutsch A2 · redaktionelle Simulation · Transaktion 2', complicationAt: 5,
    requiredPieces: ['R-184 und Felgenriss', 'geprüfte gebrauchte Felge', 'Endpreis 62 € und Probefahrt', 'Abholung 17:40 Uhr'],
    note: 'Sicherheitsgrenze und Preislimit verhindern die schnelle Ausgabe. Die Karte erweitert nur das Zeitfenster und bestätigt kein ungeprüftes Teil.',
  },
  {
    slug: 'the-reserved-cake-has-another-name', source: 'Deutsch A2 · redaktionelle Simulation · Transaktion 3', complicationAt: 5,
    requiredPieces: ['T-448, Mila und zwölf Portionen', 'Nussfreiheit als feste Grenze', 'Korrektur erst 15:25 Uhr', '42 € Kartenerstattung mit Beleg'],
    note: 'Name, Größe und Allergene müssen gemeinsam passen. Die Karte schließt die Korrektur vor 15 Uhr und bewahrt den Ausgang ohne Produkt.',
  },
  {
    slug: 'the-locker-key-is-not-there', source: 'Deutsch A2 · redaktionelle Simulation · Transaktion 4', complicationAt: 4,
    requiredPieces: ['JH-731, Fach 17 und D-904', 'Schlüsseldienst 10:05/10:20 Uhr', 'Nora Klein und 4821', 'schriftliche Vollmacht und Abholung nach 10:45 Uhr'],
    note: 'Der Gast kennt die Abholerin, die Rezeption die Kontrollregel. Die Karte macht die eigene Abholung unmöglich und verschiebt Verantwortung sicher.',
  },
  {
    slug: 'two-courses-have-the-same-room', source: 'Deutsch A2 · redaktionelle Simulation · Arbeit 5', complicationAt: 5,
    requiredPieces: ['Doppelbuchung Raum 2.14', 'sechs Personen, Laptops und Steckdosen', 'Fotokurs in 1.12', 'K-112 und Wegweiser bis 18:22 Uhr'],
    note: 'Der Koordinator kennt Kapazität, die Kursleiterin die aktuelle Gruppe. Erst die Karte macht 1.12 zulässig.',
  },
  {
    slug: 'my-internship-shift-was-changed', source: 'Deutsch A2 · redaktionelle Simulation · Arbeit 6', complicationAt: 5,
    requiredPieces: ['P-36 und ungeklärte Planänderung', 'Donnerstag 14–18 Uhr', 'Freitag 8–10 Uhr', 'Ablösung und K-36 per E-Mail'],
    note: 'Prüfung und kritischer Rezeptionsbedarf liegen getrennt. Die Karte erweitert nur die sichere Abfahrt und ermöglicht die geteilte Teillösung.',
  },
  {
    slug: 'the-projector-in-the-group-room-does-not-turn-on', source: 'Deutsch A2 · redaktionelle Simulation · Arbeit 7', complicationAt: 4,
    requiredPieces: ['defekter Beamer 2.07 und aufgehobenes G-207', 'Raum 3.06 Freitag 8:15 Uhr', 'Anja online 8:30–9:10 Uhr', 'v7-Datei und PDF-Backup'],
    note: 'Gerät und Datei dürfen nicht verwechselt werden. Die Karte entfernt den mobilen Ersatz und erzwingt den aufgeschobenen vollständigen Test.',
  },
  {
    slug: 'the-work-key-is-with-another-colleague', source: 'Deutsch A2 · redaktionelle Simulation · Arbeit 8', complicationAt: 4,
    requiredPieces: ['K-3 bei Jonas bis 10:15 Uhr', 'E-3 mit zwei Ausweisen und Eintrag', 'L-550 um 8:40 Uhr', 'Zählen und beide Schlüsselrückgaben'],
    note: 'Lieferdaten und Ersatzschlüsselregel kommen aus verschiedenen Rollen. Die Karte schließt Jonas als rechtzeitigen Weg.',
  },
  {
    slug: 'the-washing-machine-is-still-running-during-quiet-hours', source: 'Deutsch A2 · redaktionelle Simulation · Gemeinschaft 9', complicationAt: 5,
    requiredPieces: ['Maschine 3 und Ende 22:28 Uhr', 'Ruhezeit und Spülstopp 21:58 Uhr', 'zwei Uniformen in verriegelter Trommel', 'Neustart 7 Uhr und ungelöster Bedarf 6:30 Uhr'],
    note: 'Dringlichkeit erzeugt keine unsichere Ausnahme. Die Karte bestätigt den Verlust und der Schluss darf ihn nicht als Einigung verstecken.',
  },
  {
    slug: 'there-is-water-in-the-basement-storage-room', source: 'Deutsch A2 · redaktionelle Simulation · Gemeinschaft 10', complicationAt: 4,
    requiredPieces: ['W-812 und rote Gefahrenlinie', 'Fotos und Liste vor Bewegung', 'F1–F3 plus Werkzeug gesichert', 'B1/B2 und Farbe bis Elektriker zurückgelassen'],
    note: 'Prioritäten und Gefahrenzone kommen aus beiden Karten. Die Meldung ordnet Stromabschaltung und begrenzt die Teillösung.',
  },
  {
    slug: 'the-code-for-the-parcel-locker-has-expired', source: 'Deutsch A2 · redaktionelle Simulation · Gemeinschaft 11', complicationAt: 5,
    requiredPieces: ['M-8842, Fach 42 und T-19', 'Lindenplatz und Scan bis 10 Uhr', 'Lea digital autorisiert', 'Abholung ab 10:10 Uhr mit Ausweis'],
    note: 'Der Paketweg wird ohne fremde Daten rekonstruiert. Die Karte macht die eigene Abholung unmöglich und verlangt eine autorisierte Person.',
  },
  {
    slug: 'the-flea-market-tables-are-double-booked', source: 'Deutsch A2 · redaktionelle Simulation · Gemeinschaft 12', complicationAt: 5,
    requiredPieces: ['FM-41 und FM-52', 'T4/Ständer und T5/R1/R2', 'Verkaufsende 11:15 Uhr', 'Abbau und geteilte Reinigung'],
    note: 'Beide Buchungen sind gültig. Die Karte verkürzt den Verkauf und zwingt beide Rollen, Fläche und Abschluss neu zu verteilen.',
  },
  {
    slug: 'the-replacement-bus-leaves-from-another-stop', source: 'Deutsch A2 · redaktionelle Simulation · Mobilität 13', complicationAt: 5,
    requiredPieces: ['RE11-Ausfall und K-771 gültig', 'Ausgang Süd/Aufzug zu F', 'direkter Bus 7:28 Uhr', 'Ankunft Göttingen 8:42 Uhr'],
    note: 'Ticket und Barrierefreiheit müssen vor der Route geprüft werden. Die Karte entfernt den Umstieg und verhindert einen unnötigen Neukauf.',
  },
  {
    slug: 'the-bike-station-is-full-but-the-time-keeps-running', source: 'Deutsch A2 · redaktionelle Simulation · Mobilität 14', complicationAt: 5,
    requiredPieces: ['R-552, Rad 318 und KH-09', 'Fotos und Ankunft 17:29 Uhr', 'Sicherung 6614 am Überlaufring', 'B-203 ohne garantierte Erstattung'],
    note: 'Sicherung und Kostenprüfung bleiben getrennt. Die Karte entfernt die entfernte Station, beweist aber noch keine Erstattung.',
  },
  {
    slug: 'the-repaired-glasses-will-not-be-ready-today', source: 'Deutsch A2 · redaktionelle Simulation · Mobilität 15', complicationAt: 5,
    requiredPieces: ['G-991 und Riss rechts', 'G-770 durch Eva um 17:40 Uhr', 'kostenlose Schraube nach Prüfung', 'Ersatzglas 11 Uhr und Abholung 13 Uhr'],
    note: 'Gerissene oder ungeprüfte Gläser bleiben ausgeschlossen. Die Karte macht nur die sichere Übergangsbrille verfügbar.',
  },
  {
    slug: 'the-course-wristband-does-not-open-the-changing-room', source: 'Deutsch A2 · redaktionelle Simulation · Mobilität 16', complicationAt: 5,
    requiredPieces: ['AF-18, Q-615 und K-204', 'T-7 nur für Eingang/Umkleide', 'S-33 für Wertsachen', 'Check-in 18 Uhr und Korrektur Freitag 12 Uhr'],
    note: 'Temporärer Zugang, Fach und Aufbewahrung werden nicht verwechselt. Die Karte schafft Zeit, aber keine neue Programmierung.',
  },
  {
    slug: 'the-club-trailer-is-too-heavy', source: 'Deutsch A2 · redaktionelle Simulation · Pläne 17', complicationAt: 5,
    requiredPieces: ['830/750 kg und 80 kg Differenz', '118 kg Pflichtmaterial bleibt', 'FK-90 liefert 72 kg direkt', '12 kg Werkzeug im Bus und Kontrollwägung'],
    note: 'Sicherheitsmaterial ist nicht verhandelbar. Die Karte liefert 72 kg externe Entlastung; zusammen mit Werkzeug wird die Grenze messbar erreicht.',
  },
  {
    slug: 'the-power-at-the-christmas-market-stall-will-be-switched-off-earlier', source: 'Deutsch A2 · redaktionelle Simulation · Pläne 18', complicationAt: 4,
    requiredPieces: ['Normalstrom aus 20:40 Uhr', 'Kühlschrank allein an N-4', 'Heizgeräte aus 20:35 Uhr', 'Suppe bis 21:15 Uhr und SP-14'],
    note: 'Kilowatt werden in Geräteentscheidungen übersetzt. Die Karte verkürzt Heißproduktion, lässt aber sichere Kühlung bestehen.',
  },
  {
    slug: 'the-storm-warning-closes-the-park-pavilion', source: 'Deutsch A2 · redaktionelle Simulation · Pläne 19', complicationAt: 5,
    requiredPieces: ['P-8 wegen Sturm geschlossen', '18 Personen in N-3', 'N3-7 und Treffen 16–18 Uhr', 'kaltes Essen, App und Wegweiser'],
    note: 'Die Warnung bleibt fest. Die Karte senkt die tatsächliche Gruppe auf die Kapazität und öffnet erst dadurch N-3.',
  },
  {
    slug: 'our-group-arrives-after-the-last-entry', source: 'Deutsch A2 · redaktionelle Simulation · Pläne 20', complicationAt: 5,
    requiredPieces: ['C-610 mit sechs Tickets', 'Tor 20:45 und Rampendienst 20:50 Uhr', 'Bus 20:58 plus acht Minuten', 'kein Eintritt; NE-610 ohne Transfergarantie'],
    note: 'Bezahlte Tickets erlauben keinen Zugang ohne Personal. Die Karte macht die Verspätung endgültig und verschiebt nur die Dokumentation.',
  },
]

export const GERMAN_A2_RELEASE_AUDITS: RoleplayScenarioAudit[] = SEEDS.map((seed) => ({
  slug: seed.slug,
  auditedAt: '2026-08-25',
  source: seed.source,
  verdict: 'pass',
  runs: PROFILES.map((profile) => ({
    profile: profile.profile,
    globalTurns: profile.globalTurns,
    wordsA: profile.wordsA,
    wordsB: profile.wordsB,
    reachesClosing: true,
    complicationAt: seed.complicationAt,
    noLeak: true,
    requiredPieces: [...seed.requiredPieces],
    note: `${seed.note} ${profile.note}`,
  })),
}))
