import Link from 'next/link'
import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase {
  id: number;
  phrase: string;
  es: string;
  context: string;
  category: string;
  note: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: 'Meiner Meinung nach sollte man…', es: 'En mi opinión, uno debería…', context: 'Dar una opinión con recomendación', category: 'Opiniones', note: '"Meiner Meinung nach" va al inicio y cambia el orden de sujeto y verbo.' },
  { id: 2, phrase: 'Da stimme ich Ihnen vollkommen zu.', es: 'Estoy completamente de acuerdo con usted.', context: 'Mostrar acuerdo formal', category: 'Acuerdo/Desacuerdo', note: 'Usar "dir" en lugar de "Ihnen" en contexto informal (du-Form).' },
  { id: 3, phrase: 'Ich bin mir nicht sicher, ob das die beste Lösung ist.', es: 'No estoy seguro/a de que esa sea la mejor solución.', context: 'Expresar dudas con matiz', category: 'Opiniones', note: '"Ob" introduce una cláusula subordinada (verbo al final).' },
  { id: 4, phrase: 'Könnten Sie mir erklären, was Sie damit meinen?', es: '¿Podría explicarme qué quiere decir con eso?', context: 'Pedir aclaración formalmente', category: 'Clarificación', note: 'Konjunktiv II de "können". Muy cortés y frecuente en reuniones.' },
  { id: 5, phrase: 'Wenn ich Sie richtig verstanden habe, schlagen Sie vor, dass…', es: 'Si le he entendido bien, propone usted que…', context: 'Verificar comprensión', category: 'Clarificación', note: 'Estructura con "wenn" seguida de Konjunktiv II para reformular.' },
  { id: 6, phrase: 'Wäre es nicht sinnvoller, einen anderen Ansatz zu wählen?', es: '¿No sería más sensato elegir otro enfoque?', context: 'Sugerir alternativas con tacto', category: 'Sugerencias', note: 'Konjunktiv II de "sein" + Infinitiv con "zu". Forma muy diplomática.' },
  { id: 7, phrase: 'Was Ihren Vorschlag betrifft, halte ich ihn für bedenkenswert.', es: 'En cuanto a su propuesta, la considero digna de reflexión.', context: 'Responder sin comprometerse', category: 'Registro formal', note: '"Was … betrifft" = en cuanto a. Construcción topicalizadora formal.' },
  { id: 8, phrase: 'Ich muss zugeben, dass Sie in diesem Punkt Recht haben.', es: 'Debo admitir que tiene razón en ese punto.', context: 'Conceder un argumento', category: 'Acuerdo/Desacuerdo', note: '"Zugeben" = admitir, reconocer. Verbo separable: gibt…zu.' },
  { id: 9, phrase: 'Gleichwohl sollte man auch bedenken, dass…', es: 'Sin embargo, también habría que considerar que…', context: 'Introducir un matiz o contrargumento', category: 'Frases de debate', note: '"Gleichwohl" = sin embargo/no obstante. Conector formal y elegante.' },
  { id: 10, phrase: 'Wenn man genau darüber nachdenkt, stellt man fest, dass…', es: 'Si uno reflexiona bien, se da cuenta de que…', context: 'Analizar antes de concluir', category: 'Frases de debate', note: '"Man" = uno (impersonal). Muy alemán usar "man" en lugar de "ich".' },
  { id: 11, phrase: 'Erlauben Sie mir, das etwas zu präzisieren.', es: 'Permítame precisar un poco eso.', context: 'Matizar lo que uno mismo dijo', category: 'Clarificación', note: '"Präzisieren" = precisar/matizar. Registro formal y profesional.' },
  { id: 12, phrase: 'Mir scheint, die Lage ist komplizierter als gedacht.', es: 'Me parece que la situación es más complicada de lo que se pensaba.', context: 'Señalar complejidad', category: 'Opiniones', note: '"Mir scheint" = me parece. Más modesto y formal que "Ich denke".' },
  { id: 13, phrase: 'Was denken Sie über die Möglichkeit, dass…?', es: '¿Qué piensa usted sobre la posibilidad de que…?', context: 'Abrir un tema para debate', category: 'Sugerencias', note: 'Cláusula con "dass" y verbo al final. Fórmula abierta y diplomática.' },
  { id: 14, phrase: 'Insgesamt finde ich, dass es sich um eine gute Idee handelt.', es: 'En general, creo que se trata de una buena idea.', context: 'Dar una valoración global', category: 'Opiniones', note: '"Es handelt sich um" = se trata de. Expresión formal muy frecuente.' },
  { id: 15, phrase: 'Ich möchte betonen, dass das nicht genau meinte, was ich sagen wollte.', es: 'Quiero enfatizar que eso no es exactamente lo que quise decir.', context: 'Corregir una malinterpretación', category: 'Clarificación', note: '"Betonen" = enfatizar/subrayar. Konjunktiv II "wollte" en cláusula relativa.' },
  { id: 16, phrase: 'Ehrlich gesagt hatte ich diesen Aspekt nicht berücksichtigt.', es: 'Sinceramente, no había considerado ese aspecto.', context: 'Reconocer un punto ciego', category: 'Acuerdo/Desacuerdo', note: '"Ehrlich gesagt" = sinceramente/honestamente. Frase hecha muy usada.' },
  { id: 17, phrase: 'Ohne Ihren Standpunkt in Frage stellen zu wollen, denke ich…', es: 'Sin querer cuestionar su punto de vista, creo que…', context: 'Presentar desacuerdo con cortesía', category: 'Frases de debate', note: 'Infinitiv con "zu" + modalidad. Estructura muy formal y respetuosa.' },
  { id: 18, phrase: 'Es wäre vielleicht besser, wenn wir…', es: 'Quizás sería mejor si nosotros…', context: 'Sugerir con prudencia', category: 'Sugerencias', note: 'Konjunktiv II "wäre" + "wenn"-Satz. Forma suave de sugerir.' },
  { id: 19, phrase: 'Letzten Endes kommt es darauf an, dass…', es: 'A fin de cuentas, lo que importa es que…', context: 'Resumir o concluir un debate', category: 'Frases de debate', note: '"Letzten Endes" = a fin de cuentas, en definitiva.' },
  { id: 20, phrase: 'Ich stimme Ihnen in diesem Punkt zu, würde aber hinzufügen, dass…', es: 'Le doy la razón en ese punto, pero añadiría que…', context: 'Acuerdo parcial con ampliación', category: 'Acuerdo/Desacuerdo', note: 'Konjunktiv II "würde" para la parte de ampliación. Muy elegante.' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Acuerdo/Desacuerdo', 'Clarificación', 'Sugerencias', 'Registro formal', 'Frases de debate'];

export default function HablaAlemanB1() {
  return (
    <SpeakingPractice
      hubHref="/practica/aleman/b1"
      hubLabel="🇩🇪 Alemán B1"
      eyebrow="Mündlicher Ausdruck · Alemán B1"
      title="Expresión oral B1"
      lead="20 expresiones B1 para debates, reuniones y conversaciones formales en alemán. Practica cada una en voz alta."
      categories={CATEGORIES.slice(1)}
      phrases={PHRASES.map((p) => ({
          id: p.id,
          phrase: p.phrase,
          es: p.es,
          context: p.context,
          note: p.note,
          category: p.category,
      }))}
      footer={
        <>
          <strong>¿Quieres seguir practicando?</strong> Refuerza tu vocabulario en{' '}
          <Link href="/practica/aleman/b1/vocabulario">Vocabulario B1</Link>{' '}
          o practica la comprensión escrita en{' '}
          <Link href="/practica/aleman/b1/lectura">Lectura B1</Link>.
        </>
      }
    />
  )
}
