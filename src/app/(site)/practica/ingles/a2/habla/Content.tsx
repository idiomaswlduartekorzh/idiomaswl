import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: "In my opinion, ___.", phonetic: "[in mai uh-PIN-yun]", es: "En mi opinión, ___.", note: '"In my opinion" es neutral. Formal: "In my view" / "I would argue that". Informal: "I think" / "If you ask me".', category: "Opiniones" },
  { id: 2, phrase: "I agree / I disagree.", phonetic: "[ai uh-GREE / ai dis-uh-GREE]", es: "Estoy de acuerdo / No estoy de acuerdo.", note: 'Formal: "I concur" / "I beg to differ". Suaviza el desacuerdo: "I see your point, but I disagree because..."', category: "Opiniones" },
  { id: 3, phrase: "That's a good point.", phonetic: "[thæts uh gud point]", es: "Es un buen punto / Tienes razón en eso.", note: 'Úsalo para reconocer el argumento de alguien antes de dar el tuyo. Continúa con "however" o "but I also think...".', category: "Opiniones" },
  { id: 4, phrase: "Could you say that again more slowly?", phonetic: "[kud yoo say thæt uh-GEN mor SLOH-lee]", es: "¿Podría repetir eso más despacio?", note: 'Siempre útil en conversaciones reales. Alternativa: "Sorry, I didn\'t catch that." Formal: "I beg your pardon?"', category: "Comprensión" },
  { id: 5, phrase: "What does ___ mean?", phonetic: "[wut duz ___ meen]", es: "¿Qué significa ___?", note: 'Pedir significado es una estrategia de comunicación. También: "How do you spell ___?" / "Can you give me an example?"', category: "Comprensión" },
  { id: 6, phrase: "I'm looking for ___.", phonetic: "[aim LUK-ing for ___]", es: "Estoy buscando ___.", note: 'Esencial para compras y orientación. "I\'m looking for the exit/a pharmacy/a hotel." La \'oo\' en "looking" es corta [ʊ], no la larga [uː] de "food".', category: "Viajes" },
  { id: 7, phrase: "How do I get to ___?", phonetic: "[haw doo ai get tuh ___]", es: "¿Cómo llego a ___?", note: '"Get to" = llegar a. No digas "How do I go to?" El \'to\' al final se reduce a [tuh].', category: "Viajes" },
  { id: 8, phrase: "Is it far from here?", phonetic: "[iz it far frum heer]", es: "¿Está lejos de aquí?", note: 'En respuesta: "It\'s about 10 minutes on foot" / "Take the number 5 bus". "Far" vs "far away" — ambas son comunes.', category: "Viajes" },
  { id: 9, phrase: "I'd like to make a reservation.", phonetic: "[aid lyk tuh mayk uh rez-er-VAY-shun]", es: "Me gustaría hacer una reserva.", note: '"I\'d like" es la forma educada. Nunca digas "I want a reservation" en contextos formales. Se usa en hoteles, restaurantes, clínicas.', category: "Viajes" },
  { id: 10, phrase: "What time does it open/close?", phonetic: "[wut taim duz it OH-pun/KLOHZ]", es: "¿A qué hora abre/cierra?", note: '"Open" y "close" son los verbos; "opened" y "closed" describen el estado. "It opens at 9" vs "It IS open".', category: "Viajes" },
  { id: 11, phrase: "I've been working here for ___.", phonetic: "[ayv bin WER-king heer for ___]", es: "Llevo ___ trabajando aquí.", note: '"I\'ve been working" = present perfect continuous. "For 3 years" / "Since 2020". Clave: "for" + período / "since" + fecha.', category: "Trabajo" },
  { id: 12, phrase: "My responsibilities include ___.", phonetic: "[mai ree-spon-suh-BIL-uh-teez in-KLOOD ___]", es: "Mis responsabilidades incluyen ___.", note: 'Lenguaje profesional formal. Alternativa: "I\'m in charge of ___" / "I deal with ___".', category: "Trabajo" },
  { id: 13, phrase: "Could I speak to the manager, please?", phonetic: "[kud ai speek tuh thuh MÆN-uh-jer pleez]", es: "¿Podría hablar con el gerente, por favor?", note: '"Could I" es más educado que "Can I". Úsalo cuando hay un problema o queja. Formal: "I would like to speak with..."', category: "Trabajo" },
  { id: 14, phrase: "I'm taller/shorter than ___.", phonetic: "[aim TAW-ler/SHOR-ter thæn ___]", es: "Soy más alto/bajo que ___.", note: 'Comparativos para descripciones físicas. También: "She has longer hair than me" / "He looks younger than his age."', category: "Descripción" },
  { id: 15, phrase: "She/He is the most ___ person I know.", phonetic: "[shee/hee iz thuh mohst ___ PER-sun ai noh]", es: "Ella/Él es la persona más ___ que conozco.", note: 'Estructura superlativa: the most + adjetivo. "The most generous/creative/hardworking person I know."', category: "Descripción" },
  { id: 16, phrase: "What does he/she look like?", phonetic: "[wut duz hee/shee luk lyk]", es: "¿Cómo es físicamente?", note: '"Look like" = apariencia física. "What is he like?" = personalidad. ¡Dos preguntas muy diferentes!', category: "Descripción" },
  { id: 17, phrase: "I used to ___.", phonetic: "[ai yoozd tuh ___]", es: "Antes yo ___ (pero ya no).", note: '"Used to" expresa hábitos del pasado que ya no existen. "I used to live in Medellín" / "I didn\'t use to exercise."', category: "Social" },
  { id: 18, phrase: "I haven't seen you in ages!", phonetic: "[ai HÆV-unt seen yoo in AY-jez]", es: "¡No te había visto en mucho tiempo!", note: '"Ages" = muy largo tiempo (informal). Formal: "I haven\'t seen you for a long time." Continúa con: "How have you been?"', category: "Social" },
  { id: 19, phrase: "Would you like to join us?", phonetic: "[wud yoo lyk tuh joyn us]", es: "¿Te gustaría unirte a nosotros?", note: 'Invitación educada. Informal: "Do you want to come with us?" / "Why don\'t you join us?"', category: "Social" },
  { id: 20, phrase: "I'll get the bill.", phonetic: "[ayl get thuh bil]", es: "Yo pago la cuenta.", note: '"Get the bill" = pedir la cuenta. "Split the bill" = dividir la cuenta. "It\'s on me" = yo invito.', category: "Social" },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Descripción', 'Trabajo', 'Viajes', 'Social', 'Comprensión'];

export default function HablaInglesA2() {
  return (
    <SpeakingPractice
      hubHref="/practica/ingles/a2"
      hubLabel="🇬🇧 Inglés A2"
      sectionHref="/practica/ingles/a2/habla"
      sectionLabel="Expresión oral"
      currentLabel="Habla solo"
      eyebrow="Speaking · Inglés A2"
      title="Expresión oral A2"
      lead="20 frases esenciales con pronunciación, contexto situacional y variantes formal/informal. Practica en voz alta y marca las que dominas."
      categories={CATEGORIES.slice(1)}
      noteHeading="Nota de pronunciación y uso"
      doneLabel="Dominada"
      todoLabel="Lo logré"
      completionTitle="¡Completaste las 20 frases!"
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
