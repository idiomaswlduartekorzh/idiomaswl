import Link from 'next/link'
import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase {
  id: number;
  phrase: string;
  translit: string;
  phonetic: string;
  es: string;
  context: string;
  category: string;
  note: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: 'По моему мнению, следовало бы…', translit: 'Po moyemu mneniyu, sledovalo by…', phonetic: 'pa MAYemu mNEniiyu, SLEdavala by…', es: 'En mi opinión, habría que…', context: 'Dar una opinión con recomendación', category: 'Opiniones', note: '"По моему мнению" = en mi opinión. "Следовало бы" = habría que (condicional pasado).' },
  { id: 2, phrase: 'Я полностью согласен/согласна с вами.', translit: 'Ya polnostyu soglasen/soglasna s vami.', phonetic: 'ya POLnastyu saGLAsen/saGLAsna s VAmi.', es: 'Estoy completamente de acuerdo con usted.', context: 'Mostrar acuerdo formal', category: 'Acuerdo/Desacuerdo', note: '"Согласен" (masc.) / "согласна" (fem.). "С вами" = con usted (formal).' },
  { id: 3, phrase: 'Я не уверен/уверена, что это лучшее решение.', translit: 'Ya ne uveren/uverena, chto eto luchsheye resheniye.', phonetic: 'ya ne uVEren/uVErena, shto EHta LUCHshiye riSHEniye.', es: 'No estoy seguro/a de que esa sea la mejor solución.', context: 'Expresar dudas con matiz', category: 'Opiniones', note: '"Уверен" (masc.) / "уверена" (fem.). "Что" introduce cláusula subordinada.' },
  { id: 4, phrase: 'Не могли бы вы объяснить, что вы имеете в виду?', translit: 'Ne mogli by vy ob"yasnit\', chto vy imeyte v vidu?', phonetic: 'ne magLI by vy ab"yasSNIT\', shto vy iMEYete v viDU?', es: '¿Podría explicarme qué quiere decir con eso?', context: 'Pedir aclaración formalmente', category: 'Clarificación', note: '"Не могли бы" = ¿no podría? Condicional de cortesía muy frecuente.' },
  { id: 5, phrase: 'Если я правильно понял/поняла, вы предлагаете…', translit: 'Yesli ya pravil\'no ponyal/ponyala, vy predlagayete…', phonetic: 'YEsli ya PRAVil\'na paNYAL/paNYAla, vy pridlaGAyete…', es: 'Si lo he entendido bien, usted está proponiendo…', context: 'Verificar comprensión', category: 'Clarificación', note: '"Понял" (masc.) / "поняла" (fem.). Permite reformular y confirmar.' },
  { id: 6, phrase: 'Мне интересно, нельзя ли рассмотреть другой подход.', translit: 'Mne interesno, nel\'zya li rassmatret\' drugoy podkhod.', phonetic: 'mne intiRESna, niL\'ZYA li rassMOtrit\' druGOY PODkhod.', es: 'Me pregunto si no sería posible considerar otro enfoque.', context: 'Sugerir alternativas con tacto', category: 'Sugerencias', note: '"Нельзя ли" = ¿no se podría? Forma muy diplomática y cortés.' },
  { id: 7, phrase: 'Что касается вашего предложения, оно заслуживает внимания.', translit: 'Chto kasayetsya vashego predlozheniya, ono zasluzhivayet vnimaniya.', phonetic: 'shto kaSAyetsa VAsheva pridlaZHEniya, aNO zasLUzhivayet vniMANiya.', es: 'En cuanto a su propuesta, merece atención.', context: 'Responder sin comprometerse', category: 'Registro formal', note: '"Что касается" = en cuanto a. Estructura formal para topicalizar.' },
  { id: 8, phrase: 'Должен/должна признать, что вы правы в этом отношении.', translit: 'Dolzhen/dolzhna priznat\', chto vy pravy v etom otnoshenii.', phonetic: 'DOLzhen/DOLzhna prizNAT\', shto vy PRAvy v EHtam aTNAshenyi.', es: 'Debo admitir que tiene razón en ese aspecto.', context: 'Conceder un argumento', category: 'Acuerdo/Desacuerdo', note: '"Должен" (masc.) / "должна" (fem.). Demuestra honestidad intelectual.' },
  { id: 9, phrase: 'Тем не менее, стоит также учитывать, что…', translit: 'Tem ne meneye, stoit takzhe uchityvat\', chto…', phonetic: 'tem ne MEniye, STOit TAKzhe uCHItyvat\', shto…', es: 'Sin embargo, también vale tener en cuenta que…', context: 'Introducir un matiz o contrargumento', category: 'Frases de debate', note: '"Тем не менее" = sin embargo/no obstante. Conector formal muy frecuente.' },
  { id: 10, phrase: 'Если хорошо подумать, можно заметить, что…', translit: 'Yesli khorosho podumat\', mozhno zametit\', chto…', phonetic: 'YEsli khaROsho paDUmat\', MOZHna zaMEtit\', shto…', es: 'Si lo pensamos bien, se puede notar que…', context: 'Analizar antes de concluir', category: 'Frases de debate', note: '"Можно + infinitivo" = se puede. Impersonal muy frecuente en ruso.' },
  { id: 11, phrase: 'Позвольте мне уточнить то, что я сказал/сказала.', translit: 'Pozvol\'te mne utochnit\' to, chto ya skazal/skazala.', phonetic: 'pazVOL\'te mne uTOCHnit\' to, shto ya skaZAL/skaZAla.', es: 'Permítame precisar lo que dije.', context: 'Matizar lo que uno mismo dijo', category: 'Clarificación', note: '"Позвольте" = permítame. Forma de cortesía muy formal. "Уточнить" = precisar.' },
  { id: 12, phrase: 'Мне кажется, ситуация сложнее, чем кажется.', translit: 'Mne kazhetsya, situatsiya slozhnee, chem kazhetsya.', phonetic: 'mne KAzhitsa, situATsiya SLOZHneye, chem KAzhitsa.', es: 'Me parece que la situación es más compleja de lo que parece.', context: 'Señalar complejidad', category: 'Opiniones', note: '"Мне кажется" = me parece. Más modesto que "я думаю" (yo creo).' },
  { id: 13, phrase: 'Что вы думаете о возможности…?', translit: 'Chto vy dumayete o vozmozhnosti…?', phonetic: 'shto vy DUmayete a vazMOZHnasti…?', es: '¿Qué piensa usted acerca de la posibilidad de…?', context: 'Abrir un tema para debate', category: 'Sugerencias', note: '"О возможности + gen." = acerca de la posibilidad de. Genitivo obligatorio.' },
  { id: 14, phrase: 'В целом, я считаю, что это хорошая идея.', translit: 'V tselom, ya schitayu, chto eto khoroshaya ideya.', phonetic: 'v TSElam, ya schitAyu, shto EHta khaROshaya iDEya.', es: 'En general, considero que es una buena idea.', context: 'Dar una valoración global', category: 'Opiniones', note: '"В целом" = en general/en conjunto. "Считать" = considerar (más formal que "думать").' },
  { id: 15, phrase: 'Хочу уточнить: это не совсем то, что я имел/имела в виду.', translit: 'Khochu utochnit\': eto ne sovsem to, chto ya imel/imela v vidu.', phonetic: 'khaCHU uTOCHnit\': EHta ne savSEM to, shto ya iMEL/iMEla v viDU.', es: 'Quiero precisar: eso no es exactamente lo que quise decir.', context: 'Corregir una malinterpretación', category: 'Clarificación', note: '"Иметь в виду" = querer decir/tener en mente. Expresión muy frecuente.' },
  { id: 16, phrase: 'Честно говоря, я не думал/думала об этом аспекте.', translit: 'Chestno govorya, ya ne dumal/dumala ob etom aspekte.', phonetic: 'CHEsna gaVOrya, ya ne DUmal/DUmala ab EHtam asPEkte.', es: 'Honestamente, no había pensado en ese aspecto.', context: 'Reconocer un punto ciego', category: 'Acuerdo/Desacuerdo', note: '"Честно говоря" = honestamente/para ser sincero/a. Frase hecha.' },
  { id: 17, phrase: 'Не желая оспаривать вашу точку зрения, я полагаю, что…', translit: 'Ne zhelaya osparivat\' vashu tochku zreniya, ya polagayu, chto…', phonetic: 'ne zheLAya asPArivat\' VAshi TOCHku ZREniya, ya paLAGayu, shto…', es: 'Sin querer rebatir su punto de vista, considero que…', context: 'Presentar desacuerdo con cortesía', category: 'Frases de debate', note: '"Полагать" = considerar/suponer. Más formal que "думать".' },
  { id: 18, phrase: 'Пожалуй, было бы лучше, если бы…', translit: 'Pozhaluay, bylo by luchshe, yesli by…', phonetic: 'paZHAluy, BYla by LUCHshe, YEsli by…', es: 'Quizás sería mejor si…', context: 'Sugerir con prudencia', category: 'Sugerencias', note: '"Пожалуй" = quizás/tal vez. "Было бы лучше" = sería mejor (condicional).' },
  { id: 19, phrase: 'В конечном счёте, главное — это…', translit: 'V konechnom schyote, glavnoye — eto…', phonetic: 'v kaNECHnam SHYOte, GLAVnaye — EHta…', es: 'A fin de cuentas, lo más importante es…', context: 'Resumir o concluir un debate', category: 'Frases de debate', note: '"В конечном счёте" = a fin de cuentas, en última instancia.' },
  { id: 20, phrase: 'Согласен/согласна с вами в этом, но добавил/добавила бы…', translit: 'Soglasen/soglasna s vami v etom, no dobavil/dobavila by…', phonetic: 'saGLAsen/saGLAsna s VAmi v EHtam, no daBAvil/daBAvila by…', es: 'Le doy la razón en eso, pero añadiría que…', context: 'Acuerdo parcial con ampliación', category: 'Acuerdo/Desacuerdo', note: '"Добавить" = añadir. "Добавил бы" (masc.) / "добавила бы" (fem.) = condicional.' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Acuerdo/Desacuerdo', 'Clarificación', 'Sugerencias', 'Registro formal', 'Frases de debate'];

export default function HablaRusoB1() {
  return (
    <SpeakingPractice
      hubHref="/practica/ruso/b1"
      hubLabel="🇷🇺 Ruso B1"
      eyebrow="Говорение · Ruso B1"
      title="Expresión oral B1"
      lead="20 expresiones B1 para debates, reuniones y conversaciones formales en ruso. Incluye transliteración y pronunciación."
      categories={CATEGORIES.slice(1)}
      phrases={PHRASES.map((p) => ({
          id: p.id,
          phrase: p.phrase,
          script: p.translit,
          phonetic: p.phonetic,
          es: p.es,
          context: p.context,
          note: p.note,
          category: p.category,
      }))}
      footer={
        <>
          <strong>¿Quieres seguir practicando?</strong> Refuerza tu vocabulario en{' '}
          <Link href="/practica/ruso/b1/vocabulario">Vocabulario B1</Link>{' '}
          o practica la comprensión escrita en{' '}
          <Link href="/practica/ruso/b1/lectura">Lectura B1</Link>.
        </>
      }
    />
  )
}
