import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'stare-gerundio',
  order: '16',
  color: '#009246',
  category: 'Verbi',
  level: 'A1',
  title: 'Stare + gerundio: acciones en progreso en italiano A1',
  shortTitle: 'Stare + gerundio',
  metaTitle: 'Stare + gerundio italiano A1 — sto studiando, sta mangiando, stiamo parlando',
  description:
    'La construcción stare + gerundio expresa una acción que ocurre AHORA MISMO, en este preciso momento. Equivale al español "estar + -ando/-iendo". Sto studiando = Estoy estudiando. El gerundio de verbos -are termina en -ando; los verbos -ere e -ire terminan en -endo.',
  lead: 'Para decir "estoy haciendo algo ahora mismo" en italiano, usa stare conjugado + gerundio. Sto mangiando = Estoy comiendo. Sta studiando = Está estudiando.',
  outcomes: [
    'Conjugar stare en presente para todas las personas',
    'Formar el gerundio de verbos -are (-ando) y -ere/-ire (-endo)',
    'Usar stare + gerundio para acciones en curso',
  ],
  guide: {
    goal: 'Expresar acciones que ocurren en este momento con stare + gerundio.',
    model: '[stare conjugado] + [verbo raíz + -ando / -endo]',
    formula: 'sto/stai/sta/stiamo/state/stanno + gerundio',
    decisions: [
      '¿La acción pasa AHORA MISMO? → stare + gerundio (Sto mangiando — Estoy comiendo)',
      '¿Es verbo -are? → gerundio = raíz + -ando (parlare → parl + ando = parlando)',
      '¿Es verbo -ere o -ire? → gerundio = raíz + -endo (scrivere → scriv + endo = scrivendo)',
      '¿Hablas de hábitos o rutinas? → usa el presente simple (Mangio ogni giorno, no Sto mangiando)',
    ],
    table: [
      ['Pronombre', 'stare', 'Ejemplo completo'],
      ['io', 'sto', 'Sto studiando (Estoy estudiando)'],
      ['tu', 'stai', 'Stai mangiando (Estás comiendo)'],
      ['lui/lei', 'sta', 'Sta dormendo (Está durmiendo)'],
      ['noi', 'stiamo', 'Stiamo lavorando (Estamos trabajando)'],
      ['voi', 'state', 'State parlando (Estáis hablando)'],
      ['loro', 'stanno', 'Stanno scrivendo (Están escribiendo)'],
    ],
    mistakes: [
      'Stare ≠ essere: Sto bene usa essere (non stare) per stati permanenti. Stare + gerundio es solo para acciones en curso.',
      'Gerundio -are SIEMPRE -ando: parlare → parlando, non "parlendo". Solo -ere/-ire usan -endo.',
      'Gerundio irregular: fare → facendo (non fando), dire → dicendo (non direndo), bere → bevendo.',
      'No tiene relación con "estar" en todos los contextos del español: "Estoy en casa" = Sono a casa (non Sto a casa).',
    ],
  },
  seo: [
    {
      heading: '¿Qué es stare + gerundio en italiano y cuándo se usa?',
      paragraphs: [
        'Stare + gerundio es la forma progresiva del italiano. Se usa exclusivamente para acciones que están ocurriendo en este momento: Sto studiando = Estoy estudiando (ahora mismo). Para hábitos y rutinas se usa el presente simple: Studio ogni giorno = Estudio cada día.',
        'El gerundio italiano es más sencillo que el español. Los verbos -are forman -ando sin excepción (parlare → parlando, lavorare → lavorando). Los verbos -ere e -ire forman -endo (scrivere → scrivendo, dormire → dormendo).',
      ],
      table: [
        ['Tipo', 'Infinitivo', 'Gerundio'],
        ['-are', 'parlare (hablar)', 'parlando'],
        ['-are', 'mangiare (comer)', 'mangiando'],
        ['-ere', 'scrivere (escribir)', 'scrivendo'],
        ['-ire', 'dormire (dormir)', 'dormendo'],
        ['Irreg.', 'fare (hacer)', 'facendo'],
        ['Irreg.', 'dire (decir)', 'dicendo'],
      ],
    },
    {
      heading: 'Stare vs. essere: diferencia crucial para hispanohablantes',
      paragraphs: [
        'Los hispanohablantes tienden a sobreextender "stare" porque en español "estar" se usa en muchos contextos. En italiano, stare + gerundio es específico para acciones en progreso. Para ubicación y estados se usa essere: Sono in casa (Estoy en casa), non Sto in casa.',
        'La regla práctica: si puedes reemplazar "estoy" por "estoy en este momento haciendo algo", usa stare + gerundio. Si no, usa essere: Sono stanco (Estoy cansado), Sono a Roma (Estoy en Roma).',
      ],
    },
    {
      heading: 'Gerundios irregulares más importantes en A1',
      paragraphs: [
        'Tres verbos comunes tienen gerundios irregulares que debes memorizar: fare → facendo (haciendo), dire → dicendo (diciendo), bere → bevendo (bebiendo). Estos siguen la raíz histórica del verbo, no el infinitivo moderno.',
        'Sto facendo i compiti = Estoy haciendo los deberes. Sta dicendo la verità = Está diciendo la verdad. Stiamo bevendo caffè = Estamos bebiendo café.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'Hispanic learners confuse stare+gerundio with essere for location and state. Drill the contrast: Sto mangiando (action now) vs Sono a casa (location/state).',
    graphicPrompt:
      'Split illustration: left side clock showing NOW with person studying (Sto studiando), right side calendar with daily routine (Studio ogni giorno). Green Italian theme.',
    scene: [
      ['io', 'Sto lavorando (Sto lavorándo) — Estoy trabajando'],
      ['tu', 'Stai mangiando (Stai mangiándo) — Estás comiendo'],
      ['lui/lei', 'Sta dormendo (Sta dormèndo) — Está durmiendo'],
      ['noi', 'Stiamo studiando (Stiámo studiándo) — Estamos estudiando'],
      ['voi', 'State parlando (Státe parlándo) — Estáis hablando'],
      ['loro', 'Stanno scrivendo (Stánno scrivèndo) — Están escribiendo'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['parlare', 'mangiare', 'scrivere', 'dormire', 'fare', 'lavorare'],
    reviewFocus: ['stare conjugado', 'gerundio -ando vs -endo', 'irregolari: facendo, dicendo, bevendo'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Riconoscimento del progressivo',
        tag: 'Opción múltiple',
        intro: 'Identifica la forma correcta de stare + gerundio.',
        type: 'choice',
        items: [
          { scene: 'Gerundio -are', lines: [['', '¿Cómo se forma el gerundio de "parlare" (hablar)?']], options: ['parlendo', 'parlando', 'parliente', 'parliente'], answer: 'parlando', explain: 'parlare → raíz parl- + -ando = parlando. Verbos -are siempre hacen -ando.' },
          { scene: 'Gerundio -ere', lines: [['', '¿Cómo se forma el gerundio de "scrivere" (escribir)?']], options: ['scrivando', 'scriviendo', 'scrivendo', 'scrivente'], answer: 'scrivendo', explain: 'scrivere → raíz scriv- + -endo = scrivendo. Verbos -ere hacen -endo.' },
          { scene: 'Stare conjugado', lines: [['', '"Él está comiendo ahora": lui ___ mangiando.']], options: ['è', 'sta', 'stai', 'stiamo'], answer: 'sta', explain: 'Lui sta mangiando. lui/lei → sta. Tercera persona singular de stare.' },
          { scene: 'Nosotros', lines: [['', '"Estamos trabajando ahora": noi ___ lavorando.']], options: ['"stiamo"', 'state', 'stanno', 'sto'], answer: '"stiamo"', explain: 'Noi stiamo lavorando. noi → stiamo. No confundas state (voi) con stiamo (noi).' },
          { scene: 'Gerundio irregular', lines: [['', '¿Cuál es el gerundio de "fare" (hacer)?']], options: ['farendo', 'facendo', 'fando', 'fazendo'], answer: 'facendo', explain: 'fare → facendo. Irregular: usa la raíz histórica fac-, no far-. Sto facendo = Estoy haciendo.' },
          { scene: 'Stare vs essere', lines: [['', '"Estoy en casa": Io ___ a casa.']], options: ['sto', 'sono', 'stiamo', 'ho'], answer: 'sono', explain: 'Io sono a casa. La ubicación usa ESSERE, no stare. Sto a casa es incorrecto.' },
          { scene: 'Voi', lines: [['', '"Estáis hablando": voi ___ parlando.']], options: ['stanno', 'state', 'stiamo', 'stai'], answer: 'state', explain: 'Voi state parlando. voi → state.' },
          { scene: 'Gerundio -ire', lines: [['', '¿Cuál es el gerundio de "dormire" (dormir)?']], options: ['dormando', 'dormando', 'dormendo', 'dormiente'], answer: 'dormendo', explain: 'dormire → raíz dorm- + -endo = dormendo. Verbos -ire hacen -endo.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Stare + gerundio — due spazi',
        tag: '2 espacios',
        intro: 'Completa con stare conjugado y el gerundio correcto.',
        type: 'dual',
        items: [
          { scene: 'Io — studiar', lines: [['', '"Estoy estudiando ahora": io [[0]] [[1]].']], blanks: [{ options: ['sto', 'sono', 'stai', 'stiamo'], answer: 'sto', explain: 'io → sto (primera persona singular de stare).' }, { options: ['studiare', 'studiando', 'studiando', 'studio'], answer: 'studiando', explain: 'studiare → studiando. Verbo -are → gerundio -ando.' }] },
          { scene: 'Lui — scrivere', lines: [['', '"Él está escribiendo": lui [[0]] [[1]].']], blanks: [{ options: ['sta', 'stai', 'stanno', 'sto'], answer: 'sta', explain: 'lui → sta. Tercera persona singular de stare.' }, { options: ['scrivere', 'scrivendo', 'scrivando', 'scrivo'], answer: 'scrivendo', explain: 'scrivere → scrivendo. Verbo -ere → gerundio -endo.' }] },
          { scene: 'Loro — fare', lines: [['', '"Están haciendo los deberes": loro [[0]] i compiti [[1]].']], blanks: [{ options: ['stanno', 'state', 'stai', 'stiamo'], answer: 'stanno', explain: 'loro → stanno. Tercera persona plural de stare.' }, { options: ['facendo', 'farendo', 'fando', 'fare'], answer: 'facendo', explain: 'fare → facendo. Gerundio irregular: raíz fac-, no far-.' }] },
          { scene: 'Noi — mangiare', lines: [['', '"Estamos comiendo pizza": noi [[0]] pizza [[1]].']], blanks: [{ options: ['stiamo', 'stanno', 'state', 'stai'], answer: 'stiamo', explain: 'noi → stiamo. Primera persona plural de stare.' }, { options: ['mangiando', 'mangiare', 'mangio', 'mangiando'], answer: 'mangiando', explain: 'mangiare → mangiando. Verbo -are → gerundio -ando.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Testo guidato — progressivo in azione',
        tag: 'Opciones',
        intro: 'Elige la forma correcta para cada espacio.',
        type: 'guidedText',
        scene: 'Una tarde en la academia WeLearn',
        text: 'Sono le tre del pomeriggio. Io sto [[0]] italiano. (Estoy estudiando italiano.) David sta [[1]] una lezione. (David está dando una clase.) Zhanna e Lina [[2]] lavorando insieme. (Zhanna y Lina están trabajando juntas.) Tu stai [[3]] un caffè? (¿Tú estás bebiendo un café?) Voi state [[4]] la grammatica? (¿Vosotros estáis practicando la gramática?)',
        blanks: [
          { options: ['studiare', 'studiando', 'studio', 'studiendo'], answer: 'studiando', explain: 'studiare → studiando. Sto studiando = Estoy estudiando.' },
          { options: ['dare', 'dando', 'dendo', 'diando'], answer: 'dando', explain: 'dare → dando. Verbo -are irregular común: dare → dando.' },
          { options: ['sono', 'stanno', 'state', 'stiamo'], answer: 'stanno', explain: 'loro (Zhanna e Lina) → stanno. Tercera persona plural de stare.' },
          { options: ['bere', 'bevendo', 'bibendo', 'bendo'], answer: 'bevendo', explain: 'bere → bevendo. Gerundio irregular: raíz bev-, no ber-. Stai bevendo = Estás bebiendo.' },
          { options: ['praticando', 'praticendo', 'praticando', 'pratichi'], answer: 'praticando', explain: 'praticare → praticando. Verbo -are → gerundio -ando.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Testo libero — scrivi il gerundio',
        tag: 'Sin opciones',
        intro: 'Escribe la forma de stare + gerundio sin opciones.',
        type: 'freeText',
        scene: 'Describiendo acciones en curso',
        text: '1. "Estoy escuchando música": Io [[0]] musica. 2. "Ella está leyendo un libro": Lei sta [[1]] un libro. 3. "Estamos comiendo": Noi [[2]] mangiando. 4. "Ellos están haciendo ejercicio": Loro stanno [[3]] esercizio. 5. "¿Estás durmiendo?": Tu stai [[4]]?',
        blanks: [
          { answer: 'sto ascoltando', accepted: ['sto ascoltando', 'ascoltando'], explain: 'ascoltare → ascoltando. Io sto ascoltando = Estoy escuchando.' },
          { answer: 'leggendo', accepted: ['leggendo'], explain: 'leggere → leggendo. Verbo -ere → gerundio -endo.' },
          { answer: 'stiamo', accepted: ['stiamo'], explain: 'noi → stiamo. Noi stiamo mangiando = Estamos comiendo.' },
          { answer: 'facendo', accepted: ['facendo'], explain: 'fare → facendo. Gerundio irregular. Stanno facendo esercizio.' },
          { answer: 'dormendo', accepted: ['dormendo'], explain: 'dormire → dormendo. Tu stai dormendo? = ¿Estás durmiendo?' },
        ],
      },
      {
        id: 'level-5',
        title: 'Produzione scritta',
        tag: 'Producción',
        intro: 'Construye frases completas con stare + gerundio.',
        type: 'write',
        items: [
          { scene: 'Describir acción presente', prompt: 'Traduce al italiano: "Ahora mismo David está explicando la gramática a los estudiantes." (spiegare = explicar, la grammatica = la gramática, agli studenti = a los estudiantes)', answer: 'Adesso David sta spiegando la grammatica agli studenti', accepted: ['sta spiegando'], explain: 'David → sta (terza persona). spiegare → spiegando (-are → -ando). Adesso = ahora mismo.' },
          { scene: 'Forma plural', prompt: 'Traduce al italiano: "Los estudiantes están practicando italiano." (gli studenti = los estudiantes, praticare = practicar)', answer: 'Gli studenti stanno praticando italiano', accepted: ['stanno praticando'], explain: 'Gli studenti → stanno (loro). praticare → praticando (-are → -ando).' },
          { scene: 'Gerundio irregular', prompt: 'Traduce al italiano: "¿Qué estás haciendo ahora?" (cosa = qué, adesso = ahora)', answer: 'Cosa stai facendo adesso?', accepted: ['stai facendo'], explain: 'fare → facendo (irregular). Cosa stai facendo? = ¿Qué estás haciendo?' },
          { scene: 'Noi', prompt: 'Traduce al italiano: "Estamos aprendiendo italiano en WeLearn." (imparare = aprender, WeLearn = WeLearn)', answer: "Stiamo imparando l'italiano a WeLearn", accepted: ['stiamo imparando'], explain: "noi → stiamo. imparare → imparando. L'italiano = el italiano (artículo elide)." },
        ],
      },
      {
        id: 'level-6',
        title: 'Missione comunicativa',
        tag: 'Producción',
        intro: 'Usa stare + gerundio para describir tu momento actual.',
        type: 'write',
        items: [
          { scene: 'Describe tu momento', prompt: 'Scrivi 3 frasi su cosa stai facendo adesso (ora). Usa io, un amico/a, e voi. Vocabolario: studiare, lavorare, mangiare, scrivere, leggere, guardare (la tv), ascoltare.', answer: 'Sto studiando italiano. La mia amica sta lavorando. Stiamo guardando la tv.', accepted: ['sto', 'sta', 'stiamo', 'state', 'stanno'], explain: 'Usa stare + gerundio para describir acciones en este momento.' },
          { scene: 'Contraste presente vs progresivo', prompt: 'Scrivi una frase con il presente semplice (abitudine) e una con stare + gerundio (adesso). Usa "studiare".', answer: 'Studio italiano ogni giorno. Adesso sto studiando la grammatica.', accepted: ['studio', 'sto studiando'], explain: 'Studio ogni giorno = hábito (presente simple). Sto studiando adesso = acción en curso (stare + gerundio).' },
        ],
      },
    ],
  },
}

export default topic
