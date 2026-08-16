import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: "Hello! How are you?", phonetic: "[HEH-loh · haw ar yoo]", es: "¡Hola! ¿Cómo estás?", note: "Sonido de 'How' — no es 'jao', sino la 'h' suave inglesa: [haw].", category: "Saludos" },
  { id: 2, phrase: "My name is ___.", phonetic: "[mai neym iz ___]", es: "Me llamo ___.", note: `"Name" rima con "game". La 'a' de "name" es [ei] (diptongo), no 'a' española.`, category: "Presentación" },
  { id: 3, phrase: "I'm from Colombia.", phonetic: "[aim from koh-LOM-bia]", es: "Soy de Colombia.", note: `"I'm" = contracción de "I am". El apóstrofe no se omite en escritura formal.`, category: "Presentación" },
  { id: 4, phrase: "Nice to meet you.", phonetic: "[nais tuh meet yoo]", es: "Mucho gusto.", note: `"Meet" tiene doble vocal — la 'ee' se pronuncia como la 'i' larga española: [miit].`, category: "Presentación" },
  { id: 5, phrase: "Thank you very much.", phonetic: "[thænk yoo VER-ee mutch]", es: "Muchas gracias.", note: `"Thank" empieza con la 'th' interdental [θ]. Pon la lengua entre los dientes.`, category: "Cortesía" },
  { id: 6, phrase: "You're welcome.", phonetic: "[yor WEL-kum]", es: "De nada.", note: `Respuesta estándar a "Thank you". No digas "no problem" en registro formal.`, category: "Cortesía" },
  { id: 7, phrase: "I don't understand.", phonetic: "[ai dohnt un-der-STÆND]", es: "No entiendo.", note: `"Don't" = do + not contraído. La 't' final de "don't" a menudo suena muy suave.`, category: "Ayuda" },
  { id: 8, phrase: "Can you repeat that?", phonetic: "[kæn yoo rih-PEET thæt]", es: "¿Puede repetir eso?", note: `El 'a' de "can" es la vocal abierta [æ], como cuando el médico dice "ahhh".`, category: "Ayuda" },
  { id: 9, phrase: "Where is the bathroom?", phonetic: "[wer iz thuh BÆTH-room]", es: "¿Dónde está el baño?", note: `"Bathroom" = [BÆTH-room]. La 'th' es interdental sorda [θ], no 'd' ni 'z'.`, category: "Supervivencia" },
  { id: 10, phrase: "How much does it cost?", phonetic: "[haw mutch duz it kost]", es: "¿Cuánto cuesta?", note: `"Cost" tiene la vocal [ɒ], como en español "lo". No confundir con "coast" (costa).`, category: "Supervivencia" },
  { id: 11, phrase: "I need help, please.", phonetic: "[ai need help pleez]", es: "Necesito ayuda, por favor.", note: `"Please" — la 'ea' suena como 'i' larga: [i:]. Nota el tono amable al final.`, category: "Supervivencia" },
  { id: 12, phrase: "Excuse me.", phonetic: "[ik-SKYOOZ mee]", es: "Disculpe / Con permiso.", note: `Usa "Excuse me" para pedir paso o llamar la atención. "Sorry" es para disculpas.`, category: "Cortesía" },
  { id: 13, phrase: "I'm sorry.", phonetic: "[aim SOR-ee]", es: "Lo siento.", note: `"Sorry" tiene la 'o' de "for" [ɒ]. Úsalo para pedir disculpas, no para dar condolencias.`, category: "Cortesía" },
  { id: 14, phrase: "What time is it?", phonetic: "[wut taim iz it]", es: "¿Qué hora es?", note: `"Time" — la 'i' es larga [ai], rima con "mine". No digas "what time it is?" (es pregunta directa).`, category: "Supervivencia" },
  { id: 15, phrase: "See you later!", phonetic: "[see yoo LAY-ter]", es: "¡Hasta luego!", note: `"Later" — el 'a' es [ei]: [LAY-ter]. Se usa en contextos informales. "Goodbye" es más formal.`, category: "Despedidas" },
];

const CATEGORIES = ['Todos', 'Saludos', 'Presentación', 'Cortesía', 'Ayuda', 'Supervivencia', 'Despedidas'];

export default function HablaInglesA1() {
  return (
    <SpeakingPractice
      hubHref="/practica/ingles/a1"
      hubLabel="🇬🇧 Inglés A1"
      eyebrow="Speaking · Inglés A1"
      title="Expresión oral A1"
      lead="15 frases esenciales con pronunciación detallada y notas para hispanohablantes. Practica en voz alta y marca las que dominas."
      categories={CATEGORIES.slice(1)}
      noteHeading="Nota de pronunciación"
      doneLabel="Dominada"
      todoLabel="Lo logré"
      completionTitle="¡Completaste las 15 frases!"
      completionBody="Ahora úsalas en conversación real — aplícalas en tu próxima clase con David o Zhanna."
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
          🎯 <strong>Cómo practicar:</strong> Lee la pronunciación en silencio → dilo en voz alta 3 veces → si lo lograste bien, marca ✓. Si aún no, deja sin marcar y vuelve después.
        </>
      }
    />
  )
}
