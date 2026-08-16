import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase {
  id: number; phrase: string; es: string;
  context: string; category: string; note: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: "I strongly believe that...", es: "Creo firmemente que...", context: "Para dar una opinión sólida en un debate o discusión formal.", category: "Opiniones", note: '"Strongly believe" intensifica tu opinión. Alternativas: "I firmly believe" / "I am convinced that". Más fuerte que "I think".' },
  { id: 2, phrase: "In my opinion, the main issue is...", es: "En mi opinión, el problema principal es...", context: "Para introducir tu punto de vista sobre un tema complejo.", category: "Opiniones", note: '"Main issue" = problema principal. Puedes sustituirlo: "the key challenge", "the central concern". Muy útil en IELTS Speaking Part 3.' },
  { id: 3, phrase: "From my point of view,...", es: "Desde mi punto de vista,...", context: "Para presentar una perspectiva personal con matiz.", category: "Opiniones", note: 'Más sofisticado que "In my opinion". Enfatiza que es tu perspectiva individual, no un hecho. Sigue con una oración de argumento.' },
  { id: 4, phrase: "There is no doubt that...", es: "No cabe duda de que...", context: "Para afirmar algo que consideras muy evidente o innegable.", category: "Opiniones", note: '"There is no doubt that" expresa certeza absoluta. Úsalo para hechos bien establecidos. "There is little doubt that" = hay poca duda.' },
  { id: 5, phrase: "It seems to me that...", es: "Me parece que... / Tengo la impresión de que...", context: "Para dar una opinión más tentativa o reflexiva.", category: "Opiniones", note: 'Más suave que "I believe". Útil cuando presentas una idea que necesita más análisis: "It seems to me that social media has changed the way we communicate."' },
  { id: 6, phrase: "I see your point, but I would argue that...", es: "Entiendo tu punto, pero yo diría que...", context: "Para reconocer el argumento ajeno y presentar el tuyo de manera educada.", category: "Acuerdo/Desacuerdo", note: '"I see your point" valida al otro. "I would argue that" introduce tu contra-argumento. Combina empatía con asertividad.' },
  { id: 7, phrase: "I completely agree with you on that.", es: "Estoy completamente de acuerdo contigo en eso.", context: "Para mostrar acuerdo total con un punto específico.", category: "Acuerdo/Desacuerdo", note: 'Añade "because" para explicar: "I completely agree... because the evidence shows..." Simple pero efectivo en debates.' },
  { id: 8, phrase: "I'm afraid I have to disagree.", es: "Me temo que tengo que estar en desacuerdo.", context: "Para expresar desacuerdo de manera educada y formal.", category: "Acuerdo/Desacuerdo", note: '"I\'m afraid" suaviza el desacuerdo. Más formal que "I disagree." Sigue siempre con tu argumento para no parecer solo negativo.' },
  { id: 9, phrase: "That's an interesting point, although...", es: "Es un punto interesante, aunque...", context: "Para reconocer una idea y añadir un matiz o limitación.", category: "Acuerdo/Desacuerdo", note: '"Although" introduce la limitación. "That\'s an interesting point, although I think the data suggests otherwise." Muy útil en IELTS y debates académicos.' },
  { id: 10, phrase: "Could you elaborate on that?", es: "¿Podría elaborar sobre eso? / ¿Puedes explicarlo mejor?", context: "Para pedir más detalles o una explicación más profunda.", category: "Clarificación", note: '"Elaborate" = explicar con más detalle. Alternativa informal: "Can you explain more?" / "What do you mean by...?" Muestra interés activo.' },
  { id: 11, phrase: "I'm not sure I follow you. Could you clarify?", es: "No estoy seguro/a de seguirte. ¿Podrías aclarar?", context: "Para pedir aclaración cuando no has entendido algo.", category: "Clarificación", note: '"I don\'t follow" es natural e idiomático. "Could you clarify?" es educado. Evita decir "I don\'t understand" — es muy directo. ' },
  { id: 12, phrase: "What exactly do you mean by...?", es: "¿Qué quieres decir exactamente con...?", context: "Para pedir la definición o intención específica de un término.", category: "Clarificación", note: 'Muy útil cuando alguien usa un término ambiguo. "What exactly do you mean by \'sustainable\' in this context?" Demuestra pensamiento crítico.' },
  { id: 13, phrase: "What if we tried a different approach?", es: "¿Y si intentáramos un enfoque diferente?", context: "Para sugerir una alternativa de forma colaborativa.", category: "Sugerencias", note: '"What if..." es la estructura suave para sugerir. Equivale al Spanish "¿Y si...?" No impone, invita. Ideal en reuniones y trabajo en equipo.' },
  { id: 14, phrase: "I would suggest that we...", es: "Sugeriría que nosotros...", context: "Para hacer una recomendación formal en un contexto profesional.", category: "Sugerencias", note: '"I would suggest that" + present subjunctive (we do) or that + subject + present. "I would suggest we consider other options." Muy formal.' },
  { id: 15, phrase: "Have you considered...?", es: "¿Has considerado...? / ¿Han considerado...?", context: "Para proponer una idea o solución alternativa.", category: "Sugerencias", note: '"Have you considered + -ing?" Suave y colaborativo. "Have you considered working from home?" Implica que tal vez no lo han pensado.' },
  { id: 16, phrase: "I would like to bring to your attention...", es: "Me gustaría llamar su atención sobre...", context: "Para introducir un punto importante en un contexto formal o profesional.", category: "Registro formal", note: 'Frase muy formal usada en reuniones, correos o presentaciones. Equivale a "I want to highlight..." pero más elevado en registro.' },
  { id: 17, phrase: "I am writing to request / inform you that...", es: "Le escribo para solicitar / informarle que...", context: "Para comenzar un correo o comunicación formal.", category: "Registro formal", note: '"I am writing to + infinitive" es la apertura estándar de correos formales en inglés B1+. Evita empezar con "I want to tell you...".' },
  { id: 18, phrase: "I would appreciate it if you could...", es: "Le agradecería que pudiera...", context: "Para hacer una petición formal y educada.", category: "Registro formal", note: '"I would appreciate it if you could + verb base" es el nivel más formal de petición. "I would appreciate it if you could review my application."' },
  { id: 19, phrase: "On the one hand... On the other hand...", es: "Por un lado... Por otro lado...", context: "Para presentar dos perspectivas contrastadas en un debate o texto.", category: "Frases de debate", note: 'Estructura esencial para IELTS Writing Task 2 y Speaking Part 3. Muestra que puedes ver los dos lados de un argumento.' },
  { id: 20, phrase: "All things considered, I think...", es: "Considerando todo, creo que...", context: "Para dar una conclusión tras analizar varios aspectos.", category: "Frases de debate", note: '"All things considered" resume un análisis. Alternativas: "On balance..." / "Taking everything into account..." Cierra un argumento con madurez.' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Acuerdo/Desacuerdo', 'Clarificación', 'Sugerencias', 'Registro formal', 'Frases de debate'];

export default function HablaInglesB1() {
  return (
    <SpeakingPractice
      hubHref="/practica/ingles/b1"
      hubLabel="🇬🇧 Inglés B1"
      eyebrow="Speaking · Inglés B1"
      title="Expresión oral B1"
      lead="20 frases esenciales para debates, opiniones y registros formal e informal. Practica en voz alta y marca las que dominas."
      categories={CATEGORIES.slice(1)}
      noteHeading="Nota de uso y variantes"
      doneLabel="Dominada"
      todoLabel="Lo logré"
      completionTitle="¡Completaste las 20 frases B1!"
      completionBody="Ahora úsalas en conversación real — aplícalas en tu próxima clase con David o Zhanna."
      phrases={PHRASES.map((p) => ({
          id: p.id,
          phrase: p.phrase,
          es: p.es,
          context: p.context,
          note: p.note,
          category: p.category,
      }))}
      tip={
        <>
          🎯 <strong>Cómo practicar:</strong> Lee la frase en silencio → dila en voz alta 3 veces en un contexto real → expande la nota para entender el uso → marca ✓ cuando la dominas.
        </>
      }
    />
  )
}
