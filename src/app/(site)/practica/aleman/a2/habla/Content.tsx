import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string; formal?: string; informal?: string;
}

const PHRASES: Phrase[] = [
  {
    id: 1, phrase: 'Meiner Meinung nach, ___.',
    phonetic: '[MY-ner MY-nung nach]',
    es: 'En mi opinión, ___.',
    note: '"Meiner Meinung nach" es una expresión fija para dar opiniones. Viene seguida del verbo y luego el resto: "Meiner Meinung nach ist Deutsch schwierig." El verbo va en posición 2 porque "Meiner Meinung nach" ocupa la posición 1.',
    category: 'Meinungen',
    formal: 'Meiner Meinung nach...',
    informal: 'Ich glaube, dass... / Ich finde, dass...',
  },
  {
    id: 2, phrase: 'Ich stimme zu / Ich stimme nicht zu.',
    phonetic: '[ich SHTIM-me tsoo]',
    es: 'Estoy de acuerdo / No estoy de acuerdo.',
    note: '"Stimmen" = estar de acuerdo / coincidir. Con "zu": separable — "zu" al final. Formal: "Ich bin damit einverstanden." [IN-fer-shtan-den]. También: "Da haben Sie Recht." (usted tiene razón, formal).',
    category: 'Meinungen',
    formal: 'Ich bin damit einverstanden.',
    informal: 'Genau! / Stimmt! / Nein, das sehe ich anders.',
  },
  {
    id: 3, phrase: 'Das ist ein guter Punkt.',
    phonetic: '[das ist yn GOO-ter POONKT]',
    es: 'Ese es un buen punto.',
    note: '"Punkt" (punto) — masculino: "ein guter Punkt" (Nominativ, Adjektivendung -er después de "ein"). Muy usado en debates y discusiones. Alternativa: "Das ist interessant." / "Darüber habe ich noch nicht nachgedacht."',
    category: 'Meinungen',
  },
  {
    id: 4, phrase: 'Könnten Sie das bitte wiederholen?',
    phonetic: '[KER-nten zee das BI-te VEE-der-ho-len]',
    es: '¿Podría repetir eso, por favor?',
    note: '"Könnten" = Konjunktiv II de können — más educado que "Können". "Sie" (formal). Informal con amigos: "Kannst du das noch mal sagen?" La "V" en "wiederholen" suena como "F": [VEE-der-ho-len].',
    category: 'Verstehen',
    formal: 'Könnten Sie das bitte wiederholen?',
    informal: 'Kannst du das nochmal sagen?',
  },
  {
    id: 5, phrase: 'Was bedeutet ___?',
    phonetic: '[vas be-DOY-tet]',
    es: '¿Qué significa ___?',
    note: '"Bedeuten" = significar. La "W" suena [v]. Alternativa: "Was heißt ___ auf Deutsch?" [vas hyst] = ¿Cómo se dice ___ en alemán? Muy útil en clase o conversaciones con nativos.',
    category: 'Verstehen',
  },
  {
    id: 6, phrase: 'Ich suche ___.',
    phonetic: '[ich ZOO-che]',
    es: 'Estoy buscando ___.',
    note: '"Suchen" = buscar. "Ich suche die Bahnhofstraße." / "Ich suche ein Hotel in der Nähe." Para pedir dirección también puedes decir: "Entschuldigung, ich suche..." — siempre amable empezar con "Entschuldigung".',
    category: 'Reisen',
  },
  {
    id: 7, phrase: 'Wie komme ich zu ___?',
    phonetic: '[vee KO-me ich tsoo]',
    es: '¿Cómo llego a ___?',
    note: '"Wie komme ich zum Bahnhof?" (zum = zu + dem, para masculino/neutro). "Wie komme ich zur Post?" (zur = zu + der, para femenino). La "W" = [v]. Respuesta típica: "Gehen Sie geradeaus." / "Biegen Sie links ab."',
    category: 'Reisen',
    formal: 'Wie komme ich zum Bahnhof, bitte?',
    informal: 'Wo ist der Bahnhof?',
  },
  {
    id: 8, phrase: 'Ist das weit von hier?',
    phonetic: '[ist das vyt fon heer]',
    es: '¿Está lejos de aquí?',
    note: '"Weit" = lejos. Respuestas: "Das ist fünf Minuten zu Fuß." [tsoo FOOS] (5 min a pie) / "Das ist mit der U-Bahn besser." (mejor en metro). "Von hier" = desde aquí — von siempre lleva Dativ.',
    category: 'Reisen',
  },
  {
    id: 9, phrase: 'Ich möchte einen Tisch reservieren.',
    phonetic: '[ich MERCH-te I-nen TISH re-zer-VEER-en]',
    es: 'Quisiera reservar una mesa.',
    note: '"Möchte" = Konjunktiv II de mögen — más educado que "will". "Einen Tisch" = Akkusativ masculino (Tisch = der). "Reservieren" es un cognado con "reservar". También: "Haben Sie noch einen Tisch frei?" (¿Tienen mesa disponible?)',
    category: 'Reisen',
    formal: 'Ich möchte einen Tisch für zwei Personen reservieren.',
    informal: 'Haben Sie noch einen Tisch frei?',
  },
  {
    id: 10, phrase: 'Wann öffnet/schließt es?',
    phonetic: '[van ERF-net / SHLEEST es]',
    es: '¿Cuándo abre/cierra?',
    note: '"Öffnen" (abrir) y "schließen" (cerrar). "Öffnet" tiene la "ö" redondeada: labios en "o", sonido en "e". "Wann hat das Geschäft geöffnet?" (¿cuándo abrió?) — usa Perfekt para preguntar sobre el pasado.',
    category: 'Reisen',
  },
  {
    id: 11, phrase: 'Ich arbeite hier seit ___.',
    phonetic: '[ich AR-by-te heer zyt]',
    es: 'Trabajo aquí desde hace ___.',
    note: '"Seit" + Dativ para duración hasta el presente (Präsens en alemán, no Perfekt como en español). "Ich arbeite hier seit drei Jahren." (Llevo 3 años trabajando aquí). "Seit" lleva siempre Dativ: seit drei Jahren, seit einem Monat.',
    category: 'Beruf',
  },
  {
    id: 12, phrase: 'Zu meinen Aufgaben gehört ___.',
    phonetic: '[tsoo MY-nen OWF-ga-ben ge-HERT]',
    es: 'Entre mis tareas está ___.',
    note: '"Aufgaben" (tareas, plural) con Dativpräposition "zu" → "meinen Aufgaben" (Dativ plural). "Gehören" = pertenecer/corresponder. Muy usado en entrevistas: "Zu meinen Aufgaben gehört die Kundenbetreuung."',
    category: 'Beruf',
  },
  {
    id: 13, phrase: 'Kann ich mit dem Manager sprechen?',
    phonetic: '[kan ich mit dem MA-na-djer SHPRE-chen]',
    es: '¿Puedo hablar con el gerente?',
    note: '"Mit dem Manager" — Dativpräposition "mit" + Datilartikel "dem" (Manager = masculino). Formal: "Könnte ich bitte mit dem Verantwortlichen sprechen?" [fer-ANT-vort-li-chen]. "Sprechen" = hablar (más formal que "reden").',
    category: 'Beruf',
    formal: 'Könnte ich bitte mit dem Verantwortlichen sprechen?',
    informal: 'Kann ich kurz mit dir/Ihnen reden?',
  },
  {
    id: 14, phrase: 'Er/Sie ist größer als ___.',
    phonetic: '[er/zee ist GRERS-ser als]',
    es: 'Él/Ella es más alto/a que ___.',
    note: '"Größer" = Komparativ de "groß" (con Umlaut). La comparación: Adjektiv + -er + als. "Er ist größer als ich." Siempre "als" en comparaciones (¡nunca "wie"!). "Wie" solo para igualdad: "Er ist genauso groß wie ich."',
    category: 'Beschreibungen',
  },
  {
    id: 15, phrase: 'Er/Sie ist der/die ___-ste Person, die ich kenne.',
    phonetic: '[er/zee ist der/dee ... ste PER-zon dee ich KE-ne]',
    es: 'Él/Ella es la persona más ___ que conozco.',
    note: 'Superlativ atributivo con artículo definido: "der/die/das + Adjektiv + -ste". "Sie ist die intelligenteste Person, die ich kenne." Cláusula relativa: "die ich kenne" — verbo al final del Nebensatz. "Kenne" de "kennen" (conocer a alguien).',
    category: 'Beschreibungen',
  },
  {
    id: 16, phrase: 'Wie sieht er/sie aus?',
    phonetic: '[vee zeet er/zee ows]',
    es: '¿Cómo es él/ella físicamente?',
    note: '"Aussehen" = verbo trennbar (separable): "sieht...aus". "Wie sieht er aus?" — el Präfix "aus" va al final. Respuesta: "Er ist groß und hat braune Haare. Er sieht freundlich aus." (tiene cara amigable). "Haare" = plural de Haar.',
    category: 'Beschreibungen',
  },
  {
    id: 17, phrase: 'Früher habe ich ___.',
    phonetic: '[FRÜ-her HA-be ich]',
    es: 'Antes yo ___.',
    note: '"Früher" = antes (adverbio temporal). Con Perfekt: "Früher habe ich oft Sport gemacht." / "Früher bin ich viel gereist." La posición de "früher" al inicio de oración causa inversión: "Früher habe ich..." (no "Früher ich habe...").',
    category: 'Gesellschaft',
  },
  {
    id: 18, phrase: 'Lange nicht gesehen!',
    phonetic: '[LANG-e nicht ge-ZEY-en]',
    es: '¡Mucho tiempo sin verte!',
    note: 'Expresión coloquial para reencontrarse con alguien. Forma completa: "Ich habe dich/Sie lange nicht gesehen!" Respuestas: "Stimmt! Wie geht es dir?" / "Ja, eine Ewigkeit!" (¡una eternidad!). Muy natural en alemán cotidiano.',
    category: 'Gesellschaft',
  },
  {
    id: 19, phrase: 'Möchten Sie sich uns anschließen?',
    phonetic: '[MERCH-ten zee sich oons AN-shlee-sen]',
    es: '¿Le gustaría unirse a nosotros?',
    note: '"Anschließen" = trennbar (separable): anschließen → schließt...an. "Sich anschließen" = unirse (reflexivo). Formal con "Sie". Informal: "Willst du mitkommen?" [VIL-st doo MIT-ko-men]. "Möchten" (Konjunktiv II) hace la invitación más educada.',
    category: 'Gesellschaft',
    formal: 'Möchten Sie sich uns anschließen?',
    informal: 'Willst du mitkommen?',
  },
  {
    id: 20, phrase: 'Ich lade ein!',
    phonetic: '[ich LA-de yn]',
    es: '¡Yo invito! / ¡La cuenta corre por mi cuenta!',
    note: '"Einladen" = trennbar: lade...ein. "Ich lade dich ein" (te invito). Para pagar en restaurante: "Das geht auf mich!" [das gayt owf mich] o "Ich schmeiße eine Runde!" (invito una ronda). Muy común entre amigos.',
    category: 'Gesellschaft',
    informal: 'Das geht auf mich! / Ich schmeiße eine Runde!',
  },
];

const CATEGORIES = ['Alle', 'Meinungen', 'Verstehen', 'Reisen', 'Beruf', 'Beschreibungen', 'Gesellschaft'];
const CAT_ES: Record<string, string> = {
  'Alle': 'Todas',
  'Meinungen': 'Opiniones',
  'Verstehen': 'Comprensión',
  'Reisen': 'Viajes',
  'Beruf': 'Trabajo',
  'Beschreibungen': 'Descripciones',
  'Gesellschaft': 'Social',
};

export default function HablaAlemanA2() {
  return (
    <SpeakingPractice
      hubHref="/practica/aleman/a2"
      hubLabel="🇩🇪 Deutsch A2"
      eyebrow="Sprechen · Deutsch A2"
      title="Redemittel A2"
      lead="20 expresiones clave A2 con fonética, notas gramaticales y variantes formal/informal."
      categories={CATEGORIES.slice(1)}
      categoryLabel={CAT_ES}
      noteHeading="Aussprache & Grammatik"
      doneLabel="Gelernt"
      todoLabel="Geschafft"
      completionTitle="Ausgezeichnet! Alle 20 Redemittel beherrscht."
      completionBody="Jetzt in echten Gesprächen benutzen — übe mit David oder Zhanna."
      phrases={PHRASES.map((p) => ({
          id: p.id,
          phrase: p.phrase,
          phonetic: p.phonetic,
          es: p.es,
          note: p.note,
          category: p.category,
          formal: p.formal,
          informal: p.informal,
      }))}
      tip={
        <>
          🔑 <strong>Sie vs. du:</strong> En alemán formal (trabajo, desconocidos) siempre usa <strong>Sie</strong> (mayúscula). Con amigos, familia y niños: <strong>du</strong>. Cambiar de Sie a du se llama &quot;duzen&quot; — solo cuando ambas partes lo proponen.
        </>
      }
    />
  )
}
