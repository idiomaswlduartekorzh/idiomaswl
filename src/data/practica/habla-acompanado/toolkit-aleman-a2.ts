import type { RoleplayToolkit } from './types.ts'

/** Gemeinsamer Werkzeugkasten für die zwanzig deutschen A2-Rollenspiele. Kein Dialogskript. */
export const TOOLKIT_ALEMAN_A2: RoleplayToolkit = {
  language: 'aleman',
  level: 'a2',
  intro:
    'Wählt einen passenden Satz und ergänzt eure eigenen Informationen. Lest die Zeilen nicht der Reihe nach: Dieser Kasten hilft euch im Gespräch, ist aber kein fertiger Dialog.',
  blocks: [
    {
      number: 1,
      title: 'Passend und höflich anfangen',
      rows: [
        { form: 'Guten Tag, hätten Sie kurz Zeit?', when: 'bei einer unbekannten Person oder in einem Servicegespräch', register: 'Sie · höflich' },
        { form: 'Entschuldigung, ich komme wegen …', when: 'um den Grund des Gesprächs direkt zu nennen', register: 'Sie · höflich' },
        { form: 'Hallo, hast du gerade kurz Zeit?', when: 'bei bekannten Kollegen, Freunden oder Nachbarn', register: 'du · alltäglich' },
        { form: 'Guten Tag, was kann ich für Sie tun?', when: 'wenn die Serviceperson das Gespräch beginnt', register: 'Service · höflich', tag: '[grants]' },
      ],
      tail: 'Prüft die Anrede auf eurer Rollenkarte. Bleibt im ganzen Gespräch bei Sie oder du/ihr.',
    },
    {
      number: 2,
      title: 'Nachfragen und richtig verstehen',
      tag: '[receives]',
      rows: [
        { form: 'Entschuldigung, könnten Sie das bitte langsamer wiederholen?', when: 'wenn eine Information zu schnell kommt', register: 'Sie · höflich' },
        { form: 'Was bedeutet … genau?', when: 'wenn ein Wort das Verständnis blockiert', register: 'Sie/du · neutral' },
        { form: 'Wenn ich Sie richtig verstanden habe, …, stimmt das?', when: 'um die wichtigste Information mit eigenen Worten zu prüfen', register: 'Sie · höflich' },
        { form: 'Meinst du … oder …?', when: 'um zwei ähnliche Möglichkeiten zu unterscheiden', register: 'du · alltäglich' },
      ],
    },
    {
      number: 3,
      title: 'Ein schwieriges Wort erklären',
      tag: '[jargon]',
      note: 'Wer ein schwieriges Wort benutzt, muss auch helfen. Wiederholt es nicht nur lauter, sondern erklärt es einfacher.',
      rows: [
        { form: 'Das heißt einfacher: …', when: 'um dieselbe Idee mit leichteren Wörtern zu sagen', register: 'Sie/du · neutral' },
        { form: 'Es geht nicht um …, sondern um …', when: 'um ein konkretes Missverständnis zu korrigieren', register: 'Sie/du · neutral' },
        { form: 'Zum Beispiel …', when: 'wenn ein kurzes Beispiel mehr als eine Definition hilft', register: 'Sie/du · neutral' },
        { form: 'Mit … meine ich …', when: 'um einen Begriff oder eine Regel zu erklären', register: 'Sie/du · neutral' },
      ],
    },
    {
      number: 4,
      title: 'Einen Grund und einen Bedarf nennen',
      rows: [
        { form: '… weil …', when: 'um einen direkten persönlichen Grund zu nennen', register: 'Sie/du · üblich' },
        { form: 'Da …, brauche ich …', when: 'um zuerst die Situation und dann den Bedarf zu nennen', register: 'Sie/du · neutral' },
        { form: 'Das Problem ist, dass …', when: 'um das wichtigste Hindernis zu erklären', register: 'Sie/du · neutral' },
        { form: 'Das ist für mich wichtig, weil …', when: 'um einen möglichen Verlust zu erklären', register: 'Sie/du · üblich' },
      ],
    },
    {
      number: 5,
      title: 'Ablehnen und eine Grenze setzen',
      tag: '[grants]',
      rows: [
        { form: 'Es tut mir leid, aber das ist nicht möglich.', when: 'um eine Option, nicht die Person, abzulehnen', register: 'Sie · höflich' },
        { form: 'Ich kann bis … gehen, aber nicht weiter.', when: 'für eine Preis-, Zeit- oder Mengengrenze', register: 'Sie/du · neutral' },
        { form: 'Im Moment kann ich … nicht.', when: 'um eine Handlung in der aktuellen Situation zu begrenzen', register: 'Sie/du · neutral' },
        { form: 'Diese Lösung passt für mich nicht, weil …', when: 'um mit einem prüfbaren Grund abzulehnen', register: 'Sie/du · neutral' },
      ],
    },
    {
      number: 6,
      title: 'Eine Bedingung oder Alternative vorschlagen',
      rows: [
        { form: 'Wenn …, können wir …', when: 'um eine Lösung an eine Information zu knüpfen', register: 'Sie/du · üblich' },
        { form: 'Eine andere Möglichkeit wäre …', when: 'um eine zweite Option zu öffnen', register: 'Sie/du · höflich' },
        { form: 'Statt … schlage ich … vor.', when: 'um eine unmögliche Option zu ersetzen', register: 'Sie/du · neutral' },
        { form: 'Wäre diese Lösung für Sie in Ordnung?', when: 'um Zustimmung zu einer Bedingung zu erfragen', register: 'Sie · höflich', tag: '[grants]' },
      ],
    },
    {
      number: 7,
      title: 'Zeit gewinnen und den nächsten Schritt planen',
      rows: [
        { form: 'Einen Moment bitte, ich prüfe das sofort.', when: 'vor dem Prüfen eines Dokuments oder einer Regel', register: 'Sie · höflich' },
        { form: 'Ich brauche ein paar Minuten, um zu entscheiden.', when: 'wenn eine sofortige Antwort nicht möglich ist', register: 'Sie/du · neutral' },
        { form: 'Ich gebe Ihnen bis … Bescheid.', when: 'für einen neuen Kontakt mit genauer Uhrzeit', register: 'Sie · höflich' },
        { form: 'Zuerst machen wir …, danach …', when: 'um zwei Schritte zeitlich zu ordnen', register: 'Sie/du · üblich' },
      ],
      tail: 'Erfindet keine Antwort. Sagt, wer was prüft, welche Information fehlt und wann die Antwort kommt.',
    },
    {
      number: 8,
      title: 'Bestätigen und das Gespräch beenden',
      rows: [
        { form: 'Gut, dann entscheiden wir uns für …', when: 'um die gewählte Option klar zu nennen', register: 'Sie/du · üblich' },
        { form: 'Nur zur Bestätigung: …, richtig?', when: 'um die Daten mit eigenen Worten zu prüfen', register: 'Sie/du · neutral' },
        { form: 'Wer macht was, und bis wann?', when: 'um Aufgabe und Frist festzuhalten', register: 'Sie/du · neutral' },
        { form: 'Vielen Dank. Dann sehen wir uns um …', when: 'um nach dem nächsten Schritt höflich zu enden', register: 'Sie · höflich' },
      ],
      tail: 'Ein einfaches „Okay“ reicht nicht. Beide Personen müssen dieselbe Option, die verantwortliche Person und die Uhrzeit nennen können.',
    },
  ],
}
