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
  { id: 1, phrase: 'A mio avviso, sarebbe necessario che…', es: 'En mi opinión, sería necesario que…', context: 'Dar una opinión con recomendación', category: 'Opiniones', note: 'Seguido de congiuntivo. "A mio avviso" = en mi opinión (formal).' },
  { id: 2, phrase: 'Sono completamente d\'accordo con lei.', es: 'Estoy completamente de acuerdo con usted.', context: 'Mostrar acuerdo formal', category: 'Acuerdo/Desacuerdo', note: 'Usar "con te" en lugar de "con lei" en contexto informal.' },
  { id: 3, phrase: 'Non sono sicuro/a che questa sia la soluzione migliore.', es: 'No estoy seguro/a de que esa sea la mejor solución.', context: 'Expresar dudas con matiz', category: 'Opiniones', note: 'Congiuntivo ("sia") después de "sicuro/a che" en negativo.' },
  { id: 4, phrase: 'Potrebbe spiegarmi cosa intende dire con questo?', es: '¿Podría explicarme qué quiere decir con eso?', context: 'Pedir aclaración formalmente', category: 'Clarificación', note: 'Condizionale di cortesia. Frequente in contesti professionali.' },
  { id: 5, phrase: 'Se ho capito bene, lei sta suggerendo che…', es: 'Si lo he entendido bien, usted está sugiriendo que…', context: 'Verificar comprensión', category: 'Clarificación', note: 'Permite reformular y confirmar el mensaje del interlocutor.' },
  { id: 6, phrase: 'Mi chiedo se non sarebbe possibile considerare un altro approccio.', es: 'Me pregunto si no sería posible considerar otro enfoque.', context: 'Sugerir alternativas con tacto', category: 'Sugerencias', note: 'Muy diplomático; no impone la idea sino que la propone con duda.' },
  { id: 7, phrase: 'Per quanto riguarda la sua proposta, merita una riflessione.', es: 'En cuanto a su propuesta, merece reflexión.', context: 'Responder sin comprometerse', category: 'Registro formal', note: '"Per quanto riguarda" = en cuanto a/por lo que respecta a.' },
  { id: 8, phrase: 'Devo ammettere che ha ragione su questo punto.', es: 'Debo admitir que tiene razón en ese punto.', context: 'Conceder un argumento', category: 'Acuerdo/Desacuerdo', note: 'Demuestra apertura y honestidad intelectual en un debate.' },
  { id: 9, phrase: 'Detto questo, bisogna anche considerare che…', es: 'Dicho esto, también hay que considerar que…', context: 'Introducir un matiz o contrargumento', category: 'Frases de debate', note: '"Detto questo" = dicho esto. Conector muy frecuente en debate formal.' },
  { id: 10, phrase: 'Se ci pensiamo bene, ci rendiamo conto che…', es: 'Si lo pensamos bien, nos damos cuenta de que…', context: 'Analizar antes de concluir', category: 'Frases de debate', note: 'Invita a reflexionar conjuntamente antes de llegar a una conclusión.' },
  { id: 11, phrase: 'Mi permetta di precisare quanto ho detto.', es: 'Permítame precisar lo que he dicho.', context: 'Matizar lo que uno mismo dijo', category: 'Clarificación', note: '"Precisare" = precisar, matizar. Forma imperativa di cortesia con "mi".' },
  { id: 12, phrase: 'Mi sembra che la situazione sia più complessa di così.', es: 'Me parece que la situación es más compleja que eso.', context: 'Señalar complejidad', category: 'Opiniones', note: 'Congiuntivo ("sia") dopo "mi sembra che". Tono moderato e riflessivo.' },
  { id: 13, phrase: 'Cosa pensa della possibilità di…?', es: '¿Qué piensa usted de la posibilidad de…?', context: 'Abrir un tema para debate', category: 'Sugerencias', note: 'Fórmula abierta para proponer ideas sin imponerlas.' },
  { id: 14, phrase: 'Nel complesso, penso che sia una buona idea.', es: 'En general, creo que es una buena idea.', context: 'Dar una valoración global', category: 'Opiniones', note: '"Nel complesso" = en general/en conjunto. Útil para resumir.' },
  { id: 15, phrase: 'Tengo a precisare che non è esattamente quello che volevo dire.', es: 'Quiero aclarar que no es exactamente lo que quise decir.', context: 'Corregir una malinterpretación', category: 'Clarificación', note: '"Tenere a" = tener interés en/querer especialmente.' },
  { id: 16, phrase: 'Per essere onesto/a, non avevo considerato questo aspetto.', es: 'Para ser honesto/a, no había considerado ese aspecto.', context: 'Reconocer un punto ciego', category: 'Acuerdo/Desacuerdo', note: 'Muestra apertura mental y honestidad en el debate.' },
  { id: 17, phrase: 'Senza voler contraddire il suo punto di vista, credo che…', es: 'Sin querer contradecir su punto de vista, creo que…', context: 'Presentar desacuerdo con cortesía', category: 'Frases de debate', note: 'Muy diplomático. Ideal para debates académicos o profesionales.' },
  { id: 18, phrase: 'Forse sarebbe preferibile…', es: 'Quizás sería preferible…', context: 'Sugerir con prudencia', category: 'Sugerencias', note: 'Condizionale + "forse" lo hace muy suave y no impositivo.' },
  { id: 19, phrase: 'In definitiva, ciò che conta è…', es: 'En definitiva, lo que importa es…', context: 'Resumir o concluir un debate', category: 'Frases de debate', note: '"In definitiva" = en definitiva, al fin y al cabo.' },
  { id: 20, phrase: 'Concordo con lei su questo punto, ma aggiungerei che…', es: 'Le doy la razón en ese punto, pero añadiría que…', context: 'Acuerdo parcial con ampliación', category: 'Acuerdo/Desacuerdo', note: '"Concordare con" = estar de acuerdo con. Condizionale "aggiungerei" para la ampliación.' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Acuerdo/Desacuerdo', 'Clarificación', 'Sugerencias', 'Registro formal', 'Frases de debate'];

export default function HablaItalianoB1() {
  return (
    <SpeakingPractice
      hubHref="/practica/italiano/b1"
      hubLabel="🇮🇹 Italiano B1"
      eyebrow="Produzione orale · Italiano B1"
      title="Expresión oral B1"
      lead="20 expresiones B1 para debates, reuniones y conversaciones formales en italiano. Practica cada una en voz alta."
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
          <Link href="/practica/italiano/b1/vocabulario">Vocabulario B1</Link>{' '}
          o practica la comprensión escrita en{' '}
          <Link href="/practica/italiano/b1/lectura">Lectura B1</Link>.
        </>
      }
    />
  )
}
