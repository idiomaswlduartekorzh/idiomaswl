import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase { id: number; phrase: string; phonetic: string; es: string; note: string; category: string; }

const PHRASES: Phrase[] = [
  { id: 1, phrase: 'Ciao! Come stai?', phonetic: '[CHAO · KO-me STAI]', es: '¡Hola! ¿Cómo estás?', note: '"Ciao" es informal. Para contextos formales usa "Buongiorno" (buenos días) o "Buonasera" (buenas tardes/noches).', category: 'Saludos' },
  { id: 2, phrase: 'Mi chiamo Marco.', phonetic: '[mi KYA-mo MAR-ko]', es: 'Me llamo Marco.', note: '"Mi chiamo" = me llamo (literalmente "me llaman"). Equivale al español "me llamo". NO digas "Io sono Marco" para presentarte formalmente.', category: 'Presentación' },
  { id: 3, phrase: 'Sono di Colombia.', phonetic: '[SO-no di ko-LOM-bja]', es: 'Soy de Colombia.', note: '"Sono di" + ciudad/país. La "i" de "di" es corta. Para ciudades usa "di": sono di Bogotá. Para países también: sono di Colombia.', category: 'Presentación' },
  { id: 4, phrase: 'Piacere di conoscerti!', phonetic: '[pja-CHE-re di ko-NO-sher-ti]', es: '¡Mucho gusto (en conocerte)!', note: '"Piacere" es la forma rápida informal. La versión completa es "Molto piacere di conoscerti". La "c" antes de "e/i" suena [ch] como en "chico".', category: 'Presentación' },
  { id: 5, phrase: 'Grazie mille!', phonetic: '[GRAT-tsje MIL-le]', es: '¡Muchas gracias!', note: '"Grazie" = gracias. "Mille" = mil. "Grazie mille" literalmente "gracias mil". La "z" italiana suena [ts] como en "pizza".', category: 'Cortesía' },
  { id: 6, phrase: 'Prego!', phonetic: '[PRE-go]', es: '¡De nada! / ¡Adelante! / ¿Cómo no?', note: '"Prego" es polivalente: respuesta a grazie (de nada), invitar a pasar (adelante), o "sí diga" en el teléfono. Contexto es clave.', category: 'Cortesía' },
  { id: 7, phrase: 'Non capisco.', phonetic: '[non ka-PIS-ko]', es: 'No entiendo.', note: '"Capisco" viene da "capire" (tipo -isc-). Pronuncia la "c" antes de "i" como [ch]: [ka-PIS-ko]. Para pedir más lentitud: "Può parlare più lentamente?"', category: 'Ayuda' },
  { id: 8, phrase: 'Può ripetere, per favore?', phonetic: '[pwò ri-PE-te-re per fa-VO-re]', es: '¿Puede repetir, por favor?', note: '"Può" = puede (usted formal). La "u" con acento es breve. "Per favore" = por favor. Alternativa informal: "Puoi ripetere?"', category: 'Ayuda' },
  { id: 9, phrase: 'Dov\'è il bagno?', phonetic: '[do-VE il BAN-yo]', es: '¿Dónde está el baño?', note: '"Dov\'è" = "dove è" contraído. La "gn" italiana suena [ny] como la "ñ" española: bagno = [BAN-nyo]. ¡Muy parecido al español "baño"!', category: 'Supervivencia' },
  { id: 10, phrase: 'Quanto costa?', phonetic: '[KWAN-to KOS-ta]', es: '¿Cuánto cuesta?', note: '"Quanto" = cuánto. "Costa" de "costare" = costar. Exactamente igual que en español en estructura y significado. Fácil de recordar.', category: 'Supervivencia' },
  { id: 11, phrase: 'Ho bisogno di aiuto.', phonetic: '[o bi-ZON-yo di a-YU-to]', es: 'Necesito ayuda.', note: '"Ho bisogno di" = tengo necesidad de = necesito. La "h" es muda. "Aiuto" = ayuda (cognado). Pronuncia: [o bi-ZON-yo di a-YU-to].', category: 'Supervivencia' },
  { id: 12, phrase: 'Arrivederci!', phonetic: '[ar-ri-ve-DER-chi]', es: '¡Hasta luego!', note: '"Arrivederci" = hasta volvernos a ver (a + rivedere + ci). Informal: "Ciao!" o "A presto!" (hasta pronto). La "c" antes de "i" suena [ch].', category: 'Despedidas' },
  { id: 13, phrase: 'Come si dice ___ in italiano?', phonetic: '[KO-me si DI-che ... in i-ta-LYA-no]', es: '¿Cómo se dice ___ en italiano?', note: '"Come si dice" = ¿cómo se dice? Sujeto impersonal "si". Ejemplo: "Come si dice \'gracias\' in italiano?" → "Grazie!" Indispensable para aprender vocabulario en contexto.', category: 'Ayuda' },
  { id: 14, phrase: 'Può parlare più lentamente?', phonetic: '[pwò par-LA-re pyu len-ta-MEN-te]', es: '¿Puede hablar más despacio?', note: '"Può" = puede (Lei formal). "Parlare" = hablar. "Più lentamente" = más lentamente. Alternativa informal: "Parla più piano?" (piano = despacio/suave). Muy útil con hablantes nativos rápidos.', category: 'Ayuda' },
  { id: 15, phrase: 'Sto bene, grazie!', phonetic: '[sto BE-ne GRAT-tsje]', es: '¡Estoy bien, gracias!', note: '"Sto bene" usa STARE, no essere. Regla: para estados temporales → stare. "Come stai?" → "Sto bene!" "Come sta?" (formal) → "Sto benissimo!" (muy bien) o "Non sto bene" (no estoy bien).', category: 'Saludos' },
  { id: 16, phrase: 'Ho fame / Ho sete.', phonetic: '[o FA-me] / [o SE-te]', es: 'Tengo hambre / Tengo sed.', note: '"Avere fame/sete" = tener hambre/sed. En italiano las sensaciones físicas usan AVERE (tener): ho fame, ho sete, ho sonno (sueño), ho freddo (frío), ho caldo (calor), ho paura (miedo).', category: 'Supervivencia' },
  { id: 17, phrase: 'Mi dispiace.', phonetic: '[mi dis-PYA-che]', es: 'Lo siento / Me arrepiento.', note: '"Mi dispiace" = literalmente "me duele/pesa". Scusa/Scusi = disculpa (para chocar, interrumpir). Mi dispiace = lo siento (para condolencias o errores graves). La "c" antes de "e" suena [ch].', category: 'Cortesía' },
  { id: 18, phrase: 'Va bene!', phonetic: '[va BE-ne]', es: '¡Está bien! / ¡De acuerdo!', note: '"Va bene" = lit. "va bien". Equivale a "OK", "de acuerdo", "está bien". "Va benissimo!" = perfectísimo. Pregunta: "Va bene così?" (¿Así está bien?) Respuesta: "Sì, va benissimo!"', category: 'Cortesía' },
  { id: 19, phrase: 'A che ora...?', phonetic: '[a ke O-ra]', es: '¿A qué hora...?', note: '"A che ora" = a qué hora. Ejemplo: "A che ora chiude il museo?" (¿A qué hora cierra el museo?). "A che ora ci vediamo?" (¿A qué hora nos vemos?). Para decir la hora: "Sono le tre" (Son las tres).', category: 'Supervivencia' },
  { id: 20, phrase: 'Vorrei un caffè, per favore.', phonetic: '[vor-REI un kaf-FE per fa-VO-re]', es: 'Quisiera un café, por favor.', note: '"Vorrei" = quisiera (condicional de volere). Es más educado que "voglio" (quiero). Úsalo en bares, restaurantes y tiendas. "Vorrei un cornetto e un cappuccino" (quisiera un croissant y un capuchino).', category: 'Supervivencia' },
];

const CATEGORIES = ['Todos', 'Saludos', 'Presentación', 'Cortesía', 'Ayuda', 'Supervivencia', 'Despedidas'];

export default function HablaItalianoA1() {
  return (
    <SpeakingPractice
      hubHref="/practica/italiano/a1"
      hubLabel="🇮🇹 Italiano A1"
      eyebrow="Espressione orale · Italiano A1"
      title="Frasi di sopravvivenza"
      lead="20 frases esenciales con pronunciación detallada y notas para hispanohablantes. Practica en voz alta y marca las que dominas."
      categories={CATEGORIES.slice(1)}
      completionTitle="Bravissimo/a! Hai praticato tutte le frasi."
      completionBody="Ora sei pronto per una conversazione A1 in italiano."
      phrases={PHRASES.map((p) => ({
          id: p.id,
          phrase: p.phrase,
          phonetic: p.phonetic,
          es: p.es,
          note: p.note,
          category: p.category,
      }))}
    />
  )
}
