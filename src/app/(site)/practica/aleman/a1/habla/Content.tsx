import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id:1, phrase:'Hallo!', phonetic:'[HA-lo]', es:'¡Hola!', note:'"Hallo" se usa en contextos informales. Para formal: "Guten Tag" [GOO-ten TAHK] (buenos días/tardes). "Guten Morgen" = buenos días (mañana). La "H" siempre se aspira fuerte en alemán.', category:'Begrüßung' },
  { id:2, phrase:'Ich heiße ___.', phonetic:'[ich HY-se]', es:'Me llamo ___.',  note:'"Ich" suena [ich] con la "ch" gutural suave. "Heiße" viene de "heißen" (llamarse). El "ß" (Eszett) suena como "ss". Alternativa: "Mein Name ist ___." [myn NAH-me ist]', category:'Vorstellung' },
  { id:3, phrase:'Wie geht es Ihnen?', phonetic:'[vee GAYT es EE-nen]', es:'¿Cómo está usted? (formal)', note:'"Wie geht es Ihnen?" es formal. Informal: "Wie geht\'s?" [vee GAYTS]. La "W" alemana suena como "V" en español. "Ihnen" lleva mayúscula porque es formal.', category:'Begrüßung' },
  { id:4, phrase:'Wie geht\'s?', phonetic:'[vee GAYTS]', es:'¿Cómo estás? (informal)', note:'Contracción de "Wie geht es dir?". La "W" = [v]. Respuesta típica: "Gut, danke!" [goot DAHN-ke] o "Es geht." [es GAYT] (más o menos).', category:'Begrüßung' },
  { id:5, phrase:'Freut mich!', phonetic:'[froyt mich]', es:'¡Mucho gusto!', note:'"Freut mich" = me alegra (conocerte). La "eu" suena como [oy]. "Ch" después de vocal anterior es el "ch" palatal suave, diferente al "ch" posterior de "Bach".', category:'Vorstellung' },
  { id:6, phrase:'Danke schön!', phonetic:'[DAHN-ke shern]', es:'¡Muchas gracias!', note:'"Danke" solo = gracias. "Danke schön" = muchas gracias. "Schön" [shern] — la "ö" es una vocal redondeada sin equivalente en español: labios como para "o" pero intentando decir "e".', category:'Höflichkeit' },
  { id:7, phrase:'Bitte!', phonetic:'[BI-te]', es:'¡De nada! / ¡Por favor!', note:'"Bitte" es multifuncional: de nada (respuesta a danke), por favor (petición) y ¿cómo? (no entendí). La doble "t" se pronuncia más fuerte que en español.', category:'Höflichkeit' },
  { id:8, phrase:'Ich verstehe nicht.', phonetic:'[ich fer-SHTAY-e nicht]', es:'No entiendo.',  note:'"Verstehe" [fer-SHTAY-e] — "V" suena como "F". "Nicht" [nicht] — "ch" gutural después de "i". Alternativa más corta: "Verstehe ich nicht" o simplemente "Nicht verstanden."', category:'Hilfe' },
  { id:9, phrase:'Können Sie das wiederholen?', phonetic:'[KER-nen zee das VEE-der-ho-len]', es:'¿Puede repetirlo?',  note:'Formal (Sie). Informal: "Kannst du das wiederholen?" La "K" siempre es oclusiva (nunca suena "kh"). "Ö" en "Können" = vocal redondeada anterior.', category:'Hilfe' },
  { id:10, phrase:'Wo ist die Toilette?', phonetic:'[vo ist dee toy-LET-e]', es:'¿Dónde está el baño?', note:'"Wo" [vo] — W=V. "Toilette" [toy-LET-e] viene del francés. Alternativa: "Wo ist das WC?" [vay-TSAY]. En Alemania los baños públicos se llaman "die Toilette" o "das WC".', category:'Überleben' },
  { id:11, phrase:'Was kostet das?', phonetic:'[vas KOS-tet das]', es:'¿Cuánto cuesta esto?', note:'"Was" [vas] — W=V. "Kostet" — el verbo "kosten" (costar). Alternativa: "Wie viel kostet das?" [vee feel] = ¿cuánto vale? La "W" y la "V" son el error más común para hispanohablantes.', category:'Überleben' },
  { id:12, phrase:'Ich brauche Hilfe.', phonetic:'[ich BROW-che HIL-fe]', es:'Necesito ayuda.', note:'"Brauche" [BROW-che] — "au" = diptongo [ow]. "Hilfe" — la "H" se aspira. Si hay urgencia: "Hilfe!" solo es el equivalente a "¡Auxilio!". "Ich brauche" = I need (cognado con inglés "need"... casi).', category:'Überleben' },
  { id:13, phrase:'Entschuldigung!', phonetic:'[ent-SHOOL-di-gung]', es:'¡Disculpe! / ¡Perdón!', note:'Es larga pero se usa mucho. Para simplificar: "Entschuldige!" [ent-SHOOL-di-ge] (informal) o "Sorry!" (aceptado en contextos jóvenes). La "digung" final es átona.', category:'Höflichkeit' },
  { id:14, phrase:'Wie spät ist es?', phonetic:'[vee shpayt ist es]', es:'¿Qué hora es?',  note:'"Spät" [shpayt] = tarde. "ä" = vocal abierta tipo "e" larga. La "sp" al inicio de sílaba suena [shp] en alemán. Respuesta: "Es ist drei Uhr." [es ist dry oor] = Son las tres.', category:'Überleben' },
  { id:15, phrase:'Tschüss!', phonetic:'[CHÜS]', es:'¡Adiós! (informal)', note:'"Tschüss" — la "Ü" es otra vocal redondeada: labios como para "u" pero intentando decir "i". Formal: "Auf Wiedersehen!" [owf VEE-der-zayn] = hasta la vista. Entre amigos: "Tschüss!" es perfectamente natural.', category:'Verabschiedung' },
];

const CATEGORIES = ['Alle', 'Begrüßung', 'Vorstellung', 'Höflichkeit', 'Hilfe', 'Überleben', 'Verabschiedung'];
const CAT_ES: Record<string,string> = { 'Alle':'Todos', 'Begrüßung':'Saludos', 'Vorstellung':'Presentación', 'Höflichkeit':'Cortesía', 'Hilfe':'Ayuda', 'Überleben':'Supervivencia', 'Verabschiedung':'Despedidas' };

export default function HablaAlemanA1() {
  return (
    <SpeakingPractice
      hubHref="/practica/aleman/a1"
      hubLabel="🇩🇪 Deutsch A1"
      eyebrow="Sprechen · Deutsch A1"
      title="Überlebenssätze A1"
      lead="15 frases esenciales con guía fonética y notas para hispanohablantes."
      categories={CATEGORIES.slice(1)}
      categoryLabel={CAT_ES}
      noteHeading="Aussprachehinweis"
      doneLabel="Gelernt"
      todoLabel="Geschafft"
      completionTitle="Ausgezeichnet! Alle 15 Sätze beherrscht."
      completionBody="Jetzt in echten Gesprächen benutzen — übe mit David oder Zhanna."
      phrases={PHRASES.map((p) => ({
          id: p.id,
          phrase: p.phrase,
          phonetic: p.phonetic,
          es: p.es,
          note: p.note,
          category: p.category,
      }))}
      tip={
        <>
          🔑 <strong>Claves de pronunciación alemana:</strong> W=V, V=F, "ch" gutural, "ö/ü" vocales redondeadas, "ei"=[ai], "ie"=[ee], "eu/äu"=[oy]. Los sustantivos siempre con mayúscula.
        </>
      }
    />
  )
}
