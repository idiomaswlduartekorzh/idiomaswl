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
  { id: 1, phrase: 'Na minha opinião, seria necessário que…', es: 'En mi opinión, sería necesario que…', context: 'Dar una opinión con recomendación', category: 'Opiniones', note: 'Seguido de subjuntivo. Más formal que "eu acho que". Forma B1 essencial.' },
  { id: 2, phrase: 'Concordo completamente com o senhor / a senhora.', es: 'Estoy completamente de acuerdo con usted.', context: 'Mostrar acuerdo formal', category: 'Acuerdo/Desacuerdo', note: 'Usar "com você" en contexto informal. "O senhor/a senhora" es el tratamiento formal.' },
  { id: 3, phrase: 'Não tenho certeza de que essa seja a melhor solução.', es: 'No estoy seguro/a de que esa sea la mejor solución.', context: 'Expresar dudas con matiz', category: 'Opiniones', note: 'Subjuntivo ("seja") depois de "ter certeza de que" en negativo.' },
  { id: 4, phrase: 'O senhor poderia me explicar o que quis dizer com isso?', es: '¿Podría explicarme qué quiso decir con eso?', context: 'Pedir aclaración formalmente', category: 'Clarificación', note: 'Condicional de cortesia. Fórmula muito usada em ambientes profissionais.' },
  { id: 5, phrase: 'Se eu entendi bem, o senhor está sugerindo que…', es: 'Si lo entendí bien, usted está sugiriendo que…', context: 'Verificar comprensión', category: 'Clarificación', note: 'Permite reformular e confirmar o que o interlocutor disse.' },
  { id: 6, phrase: 'Pergunto-me se não seria possível considerar uma outra abordagem.', es: 'Me pregunto si no sería posible considerar otro enfoque.', context: 'Sugerir alternativas con tacto', category: 'Sugerencias', note: 'Muy diplomático. Propone la idea sin imponerla.' },
  { id: 7, phrase: 'No que diz respeito à sua proposta, ela merece reflexão.', es: 'En cuanto a su propuesta, merece reflexión.', context: 'Responder sin comprometerse', category: 'Registro formal', note: '"No que diz respeito a" = en cuanto a. Construcción muy formal.' },
  { id: 8, phrase: 'Devo admitir que o senhor tem razão nesse ponto.', es: 'Debo admitir que tiene razón en ese punto.', context: 'Conceder un argumento', category: 'Acuerdo/Desacuerdo', note: 'Demuestra honestidad intelectual y apertura en el debate.' },
  { id: 9, phrase: 'Dito isso, também precisamos levar em conta que…', es: 'Dicho esto, también debemos tener en cuenta que…', context: 'Introducir un matiz o contrargumento', category: 'Frases de debate', note: '"Dito isso" = dicho esto. Conector muito útil em debates formais.' },
  { id: 10, phrase: 'Se refletirmos bem, percebemos que…', es: 'Si reflexionamos bien, nos damos cuenta de que…', context: 'Analizar antes de concluir', category: 'Frases de debate', note: 'Convida o interlocutor a raciocinar junto antes de concluir.' },
  { id: 11, phrase: 'Permita-me esclarecer o que disse.', es: 'Permítame aclarar lo que dije.', context: 'Matizar lo que uno mismo dijo', category: 'Clarificación', note: 'Imperativo de cortesia com "me". "Esclarecer" = aclarar.' },
  { id: 12, phrase: 'Parece-me que a situação é mais complexa do que isso.', es: 'Me parece que la situación es más compleja que eso.', context: 'Señalar complejidad', category: 'Opiniones', note: '"Parece-me" = me parece. Mais modesto que "eu acho". Coloca o verbo antes.' },
  { id: 13, phrase: 'O que o senhor acha da possibilidade de…?', es: '¿Qué piensa usted de la posibilidad de…?', context: 'Abrir un tema para debate', category: 'Sugerencias', note: 'Fórmula aberta para propor ideias sem as impor.' },
  { id: 14, phrase: 'De modo geral, acho que é uma boa ideia.', es: 'En general, creo que es una buena idea.', context: 'Dar una valoración global', category: 'Opiniones', note: '"De modo geral" = em geral/no geral. Útil para resumir.' },
  { id: 15, phrase: 'Quero deixar claro que não foi exatamente isso que quis dizer.', es: 'Quiero dejar claro que no fue exactamente lo que quise decir.', context: 'Corregir una malinterpretación', category: 'Clarificación', note: '"Deixar claro" = dejar claro. Expresión muy directa y frecuente.' },
  { id: 16, phrase: 'Para ser honesto/a, não tinha considerado esse aspecto.', es: 'Para ser honesto/a, no había considerado ese aspecto.', context: 'Reconocer un punto ciego', category: 'Acuerdo/Desacuerdo', note: 'Mostra abertura mental e honestidade no debate.' },
  { id: 17, phrase: 'Sem querer contradizer seu ponto de vista, acredito que…', es: 'Sin querer contradecir su punto de vista, creo que…', context: 'Presentar desacuerdo con cortesía', category: 'Frases de debate', note: 'Fórmula muito diplomática. Ideal para debates acadêmicos.' },
  { id: 18, phrase: 'Talvez fosse preferível…', es: 'Quizás sería preferible…', context: 'Sugerir con prudencia', category: 'Sugerencias', note: 'Imperfeito do subjuntivo "fosse" para hipótese cortês. Forma B1.' },
  { id: 19, phrase: 'No fim das contas, o que importa é…', es: 'A fin de cuentas, lo que importa es…', context: 'Resumir o concluir un debate', category: 'Frases de debate', note: '"No fim das contas" = a fin de cuentas/al final del día.' },
  { id: 20, phrase: 'Concordo com o senhor nesse ponto, mas acrescentaria que…', es: 'Le doy la razón en ese punto, pero añadiría que…', context: 'Acuerdo parcial con ampliación', category: 'Acuerdo/Desacuerdo', note: '"Acrescentar" = añadir/agregar. Condicional "acrescentaria" para ampliar.' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Acuerdo/Desacuerdo', 'Clarificación', 'Sugerencias', 'Registro formal', 'Frases de debate'];

export default function HablaPortuguesB1() {
  return (
    <SpeakingPractice
      hubHref="/practica/portugues/b1"
      hubLabel="🇧🇷 Portugués B1"
      eyebrow="Produção oral · Portugués B1"
      title="Expresión oral B1"
      lead="20 expresiones B1 para debates, reuniones y conversaciones formales en portugués brasileño. Practica cada una en voz alta."
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
          <Link href="/practica/portugues/b1/vocabulario">Vocabulario B1</Link>{' '}
          o practica la comprensión escrita en{' '}
          <Link href="/practica/portugues/b1/lectura">Lectura B1</Link>.
        </>
      }
    />
  )
}
