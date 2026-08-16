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
  { id: 1, phrase: 'À mon avis, il faudrait que…', es: 'En mi opinión, habría que…', context: 'Dar una opinión con recomendación', category: 'Opiniones', note: 'Seguido de subjuntivo. Más formal que "je pense que".' },
  { id: 2, phrase: 'Je suis tout à fait d\'accord avec vous.', es: 'Estoy totalmente de acuerdo con usted.', context: 'Mostrar acuerdo formal', category: 'Acuerdo/Desacuerdo', note: 'Usar "toi" en lugar de "vous" en contexto informal.' },
  { id: 3, phrase: 'Je ne suis pas sûr(e) que ce soit la meilleure solution.', es: 'No estoy seguro/a de que esa sea la mejor solución.', context: 'Expresar dudas con matiz', category: 'Opiniones', note: 'Subjonctif después de "sûr(e) que" en negativo.' },
  { id: 4, phrase: 'Pourriez-vous m\'expliquer ce que vous voulez dire par là ?', es: '¿Podría explicarme qué quiere decir con eso?', context: 'Pedir aclaración formalmente', category: 'Clarificación', note: 'Conditionnel de politesse. Muy útil en contextos profesionales.' },
  { id: 5, phrase: 'Si j\'ai bien compris, vous suggérez que…', es: 'Si lo he entendido bien, usted sugiere que…', context: 'Verificar comprensión', category: 'Clarificación', note: 'Permite confirmar y reformular lo que el otro dijo.' },
  { id: 6, phrase: 'Je me demande si on ne pourrait pas envisager une autre approche.', es: 'Me pregunto si no podríamos contemplar otro enfoque.', context: 'Sugerir alternativas con tacto', category: 'Sugerencias', note: 'Muy diplomático, evita imponer una opinión directamente.' },
  { id: 7, phrase: 'En ce qui concerne votre proposition, elle mérite réflexion.', es: 'En cuanto a su propuesta, merece reflexión.', context: 'Responder sin comprometerse', category: 'Registro formal', note: '"En ce qui concerne" = "en cuanto a". Estructura muy francesa.' },
  { id: 8, phrase: 'Je dois admettre que vous avez raison sur ce point.', es: 'Debo admitir que tiene razón en ese punto.', context: 'Conceder un argumento', category: 'Acuerdo/Desacuerdo', note: 'Demuestra honestidad intelectual en un debate.' },
  { id: 9, phrase: 'Cela dit, il faut également tenir compte de…', es: 'Dicho esto, también hay que tener en cuenta…', context: 'Introducir un matiz o contrargumento', category: 'Frases de debate', note: '"Cela dit" = "dicho esto". Conector muy útil en debates.' },
  { id: 10, phrase: 'Si on réfléchit bien, on se rend compte que…', es: 'Si lo pensamos bien, nos damos cuenta de que…', context: 'Analizar antes de concluir', category: 'Frases de debate', note: 'Invita al interlocutor a reflexionar junto contigo.' },
  { id: 11, phrase: 'Permettez-moi de nuancer ce que j\'ai dit.', es: 'Permítame matizar lo que dije.', context: 'Corregir o ampliar una idea propia', category: 'Clarificación', note: '"Nuancer" = matizar. Palabra clave en debates franceses.' },
  { id: 12, phrase: 'Il me semble que la situation est plus complexe que ça.', es: 'Me parece que la situación es más compleja que eso.', context: 'Señalar complejidad', category: 'Opiniones', note: '"Il me semble que" es más modesto que "je pense que".' },
  { id: 13, phrase: 'Que pensez-vous de la possibilité de… ?', es: '¿Qué piensa usted de la posibilidad de…?', context: 'Abrir un tema para debate', category: 'Sugerencias', note: 'Fórmula diplomática para introducir ideas sin imponerlas.' },
  { id: 14, phrase: 'Dans l\'ensemble, je pense que c\'est une bonne idée.', es: 'En general, creo que es una buena idea.', context: 'Dar una valoración global', category: 'Opiniones', note: '"Dans l\'ensemble" = en general/en conjunto.' },
  { id: 15, phrase: 'Je tiens à préciser que ce n\'est pas exactement ce que j\'ai voulu dire.', es: 'Quiero aclarar que no es exactamente lo que quise decir.', context: 'Corregir una malinterpretación', category: 'Clarificación', note: '"Je tiens à" = quiero/me importa. Expresión de énfasis.' },
  { id: 16, phrase: 'Pour être honnête, je n\'avais pas envisagé cet aspect.', es: 'Para ser honesto, no había considerado ese aspecto.', context: 'Reconocer un punto ciego', category: 'Acuerdo/Desacuerdo', note: 'Muestra apertura mental y honestidad.' },
  { id: 17, phrase: 'Sans vouloir contredire votre point de vue, je pense que…', es: 'Sin querer contradecir su punto de vista, creo que…', context: 'Presentar desacuerdo con cortesía', category: 'Frases de debate', note: 'Muy diplomático. Ideal para situaciones formales.' },
  { id: 18, phrase: 'Il serait peut-être préférable de…', es: 'Quizás sería preferible…', context: 'Sugerir con prudencia', category: 'Sugerencias', note: 'Conditionnel + "peut-être" lo hace muy suave y no impositivo.' },
  { id: 19, phrase: 'En fin de compte, ce qui compte c\'est…', es: 'A fin de cuentas, lo que importa es…', context: 'Resumir o concluir un debate', category: 'Frases de debate', note: '"En fin de compte" = a fin de cuentas, al final.' },
  { id: 20, phrase: 'Je vous rejoins sur ce point, mais j\'ajouterais que…', es: 'Le doy la razón en ese punto, pero añadiría que…', context: 'Acuerdo parcial con ampliación', category: 'Acuerdo/Desacuerdo', note: '"Je vous rejoins" = me uno a usted/le doy la razón.' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Acuerdo/Desacuerdo', 'Clarificación', 'Sugerencias', 'Registro formal', 'Frases de debate'];

export default function HablaFrancesB1() {
  return (
    <SpeakingPractice
      hubHref="/practica/frances/b1"
      hubLabel="🇫🇷 Francés B1"
      eyebrow="Expression orale · Francés B1"
      title="Expresión oral B1"
      lead="20 expresiones B1 para debates, reuniones y conversaciones formales en francés. Practica cada una en voz alta."
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
          <Link href="/practica/frances/b1/vocabulario">Vocabulario B1</Link>{' '}
          o practica la comprensión escrita en{' '}
          <Link href="/practica/frances/b1/lectura">Lectura B1</Link>.
        </>
      }
    />
  )
}
