import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: 'Na minha opinião, ___.', phonetic: '[nah MEE-nyah oh-pee-NYOWNG]', es: 'En mi opinión, ___.',
    note: '"Na minha opinião" = en mi opinión. Alternativas: "Para mim" [pa-rah MING] = para mí; "Eu acho que" [ew AH-shoo keh] = yo creo que. "Acho" es muy usado en el habla cotidiana brasileña.', category: 'Opiniões' },
  { id: 2, phrase: 'Concordo / Não concordo.', phonetic: '[kon-KOR-doo / nowng kon-KOR-doo]', es: 'Estoy de acuerdo / No estoy de acuerdo.',
    note: '"Concordo" = estoy de acuerdo. "Discordo" [dis-KOR-doo] = discrepo. En el habla coloquial: "Tô de acordo" [toh dji ah-KOR-doo]. La "ão" final de "não" suena nasal [ɑ̃w̃].', category: 'Opiniões' },
  { id: 3, phrase: 'Que bom ponto!', phonetic: '[keh bong PON-too]', es: '¡Qué buen punto!',
    note: '"Que bom ponto!" = ¡Qué buen punto! Alternativas: "Boa observação!" [BOH-ah ob-ser-vah-SOWNG] = ¡Buena observación! "Faz sentido" [fahz sen-TCHEE-doo] = tiene sentido.', category: 'Opiniões' },
  { id: 4, phrase: 'Pode repetir mais devagar?', phonetic: '[POH-djeh heh-peh-TCHEER mais deh-vah-GAR]', es: '¿Puede repetir más despacio?',
    note: '"Devagar" [deh-vah-GAR] = despacio/lento. "Pode" suena [POH-djeh] con la "d" suavizada antes de "e". Alternativa: "Pode falar mais lentamente?" [mais len-tah-MEN-tchi].', category: 'Compreensão' },
  { id: 5, phrase: 'O que ___ quer dizer?', phonetic: '[oo keh ___ ker dee-ZER]', es: '¿Qué significa ___?',
    note: '"Quer dizer" = quiere decir/significa. Alternativa: "O que significa ___?" [oo keh sig-nee-FEE-kah]. "Quer" aquí no es "querer" sino "significar" — falso cognado para hispanohablantes.', category: 'Compreensão' },
  { id: 6, phrase: 'Estou procurando ___.', phonetic: '[es-TOH pro-koo-RAN-doo]', es: 'Estoy buscando ___.',
    note: '"Procurar" [pro-koo-RAR] = buscar. Ejemplo: "Estou procurando o hotel Central". Alternativa: "Estou à procura de ___" [es-TOH ah pro-KOO-rah dji] — más formal.', category: 'Viagens' },
  { id: 7, phrase: 'Como chego a ___?', phonetic: '[KOH-moo SHEH-goo ah]', es: '¿Cómo llego a ___?',
    note: '"Chego" = llego (1ª persona de chegar). El "h" después de "c" no existe en español. La "ch" en brasileño suena como "sh" del inglés: [SHEH-goo]. Alternativa: "Como eu faço para chegar a ___?"', category: 'Viagens' },
  { id: 8, phrase: 'É longe daqui?', phonetic: '[eh LON-zheh dah-KEE]', es: '¿Está lejos de aquí?',
    note: '"Longe" [LON-zheh] = lejos. "Perto" [PER-too] = cerca. "Daqui" = de aquí (de + aqui). Respuestas: "É pertinho daqui" [es-tah per-TCHEN-yoo] = está cerquita / "Fica a 10 minutos de caminhada" = está a 10 minutos caminando.', category: 'Viagens' },
  { id: 9, phrase: 'Gostaria de fazer uma reserva.', phonetic: '[gos-tah-REE-ah dji fah-ZER OO-mah heh-ZER-vah]', es: 'Me gustaría hacer una reserva.',
    note: '"Gostaria" = condicional de "gostar" → me gustaría. Más formal que "Quero fazer". Ejemplo completo: "Gostaria de fazer uma reserva para dois adultos para sexta-feira."', category: 'Viagens' },
  { id: 10, phrase: 'A que horas abre/fecha?', phonetic: '[ah keh OH-ras AH-breh / FEH-shah]', es: '¿A qué hora abre/cierra?',
    note: '"Abre" [AH-breh] = abre. "Fecha" [FEH-shah] = cierra (¡falso cognado! "Fecha" en PT = cierra, no "fecha del calendario" — esa es "data"). "O horário de funcionamento é..." = el horario de atención es...', category: 'Viagens' },
  { id: 11, phrase: 'Trabalho aqui há ___.', phonetic: '[trah-BAH-lyoo ah-KEE ah]', es: 'Trabajo aquí hace ___.',
    note: '"Há" + tiempo = hace (expresión de duración). Ejemplo: "Trabalho aqui há dois anos" = trabajo aquí hace dos años. "Há" no tiene tilde diacrítica pero es diferente de "a" (preposición). Confusión común en el CELPE-Bras.', category: 'Trabalho' },
  { id: 12, phrase: 'Minhas responsabilidades incluem ___.', phonetic: '[MEE-nyahs hes-pon-sah-bee-lee-DAH-djees een-KLOO-eng]', es: 'Mis responsabilidades incluyen ___.',
    note: 'Frase essencial para entrevistas. Alternativa: "Sou responsável por ___" [soh hes-pon-SAH-vel por]. "Minha área de atuação é ___" = mi área de trabajo es ___. Useful for the CELPE-Bras oral exam.', category: 'Trabalho' },
  { id: 13, phrase: 'Poderia falar com o/a gerente?', phonetic: '[poh-deh-REE-ah fah-LAR kong oo zheh-REN-tchi]', es: '¿Podría hablar con el/la gerente?',
    note: '"Poderia" = condicional de "poder" → podría. Más formal y cortés que "Posso falar" (puedo hablar). "Gerente" [zheh-REN-tchi] — el "g" antes de "e" suena como "zh" (la "j" francesa).', category: 'Trabalho' },
  { id: 14, phrase: 'Ela é mais alta que ___.', phonetic: '[EH-lah eh mais AL-tah keh]', es: 'Ella es más alta que ___.',
    note: 'Comparativo de superioridade. "Mais + adjetivo + que/do que". No Brasil, "que" (sin "do") es muy común en el habla. Formalmente: "Ela é mais alta do que eu." Recuerda: "maior" (más grande) no usa "mais".', category: 'Descrição' },
  { id: 15, phrase: 'Ela/ele é a pessoa mais ___ que conheço.', phonetic: '[EH-lah eh ah peh-SOH-ah mais ___ keh ko-NYEH-soo]', es: 'Ella/él es la persona más ___ que conozco.',
    note: 'Superlativo relativo. Estrutura: o/a + mais + adjetivo + que + conheço/vi/já encontrei. Ejemplos: "É a pessoa mais inteligente que conheço" / "É o lugar mais bonito que já visitei."', category: 'Descrição' },
  { id: 16, phrase: 'Como ele/ela é fisicamente?', phonetic: '[KOH-moo EH-leh eh fee-zee-kah-MEN-tchi]', es: '¿Cómo es él/ella físicamente?',
    note: '"Fisicamente" = físicamente. Para describir: "Ela tem cabelo curto e olhos castanhos" / "Ele é alto e tem barba". Vocabulario: cabelo [kah-BEH-loo] = pelo; olhos [OH-lyoos] = ojos; barba = barba.', category: 'Descrição' },
  { id: 17, phrase: 'Antigamente, eu ___.', phonetic: '[an-tchi-gah-MEN-tchi, ew]', es: 'Antes, yo ___.',
    note: '"Antigamente" + imperfeito = antes (en el pasado). Ejemplo: "Antigamente, eu morava no interior" (Antes, vivía en el interior). Similar a "quando era criança" o "antes". El imperfeito es el tiempo natural con "antigamente".', category: 'Social' },
  { id: 18, phrase: 'Faz tempo que não nos vemos!', phonetic: '[fahz TEM-poo keh nowng nooz VEH-mooz]', es: '¡Hace tiempo que no nos vemos!',
    note: '"Faz tempo que..." = hace tiempo que... "Nos vemos" = nos vemos. Esta estructura "faz + tiempo + que + verbo" es muy común: "Faz três anos que não venho ao Brasil." Equivalente coloquial: "Quanto tempo!"', category: 'Social' },
  { id: 19, phrase: 'Você quer se juntar a nós?', phonetic: '[voh-SAY ker seh zhoon-TAR ah nohs]', es: '¿Quieres unirte a nosotros?',
    note: '"Se juntar a" = unirse a. "Juntar" [zhoon-TAR] — la "j" suena como "zh" (j francesa). Alternativa informal: "Quer vir com a gente?" [ker veer kong ah ZHEN-tchi] — "a gente" = nosotros (muy coloquial).', category: 'Social' },
  { id: 20, phrase: 'Eu pago!', phonetic: '[ew PAH-goo]', es: '¡Yo pago! / ¡Invito yo!',
    note: '"Eu pago" = yo pago / pago yo. Variantes: "Hoje é por minha conta!" [oh-ZHEH eh por MEE-nyah KON-tah] = ¡hoy es mi cuenta! "A rodada é minha" = esta ronda la pago yo. Muy común en situaciones sociales brasileñas.', category: 'Social' },
];

const CATEGORIES = ['Todos', 'Opiniões', 'Compreensão', 'Viagens', 'Trabalho', 'Descrição', 'Social'];

export default function HablaPortuguesA2() {
  return (
    <SpeakingPractice
      hubHref="/practica/portugues/a2"
      hubLabel="🇧🇷 Português A2"
      eyebrow="Expressão oral · Português A2"
      title="Expressões A2 — contexto e pronúncia"
      lead="20 expressões situacionais com fonética para hispanofalantes e notas de registro (formal vs coloquial)."
      categories={CATEGORIES.slice(1)}
      noteHeading="Nota de pronúncia e registro"
      doneLabel="Dominada"
      todoLabel="Consegui"
      completionTitle="Ótimo trabalho! Você domina as 20 expressões A2."
      completionBody="Agora use-as em conversa real — pratique com David ou Zhanna."
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
          🎯 <strong>Como praticar:</strong> Leia a fonética → diga a frase 3 vezes em voz alta → expanda a nota para entender o registro → marque ✓ quando se sentir confortável.
        </>
      }
    />
  )
}
