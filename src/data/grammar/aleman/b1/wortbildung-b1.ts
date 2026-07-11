import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'wortbildung-b1',
  order: '20',
  color: '#1a2ecc',
  category: 'Wortschatz',
  level: 'B1',
  title: 'Wortbildung en Alemán B1 — Formación de Palabras: Composición y Derivación',
  shortTitle: 'Wortbildung',
  metaTitle: 'Wortbildung B1 — Formación de palabras en alemán: composición, prefijos y sufijos',
  description:
    'El alemán es famoso por sus palabras compuestas. La Wortbildung (formación de palabras) incluye composición (Komposition: Hausaufgabe), derivación con prefijos (un-, miss-, ver-) y sufijos (-ung, -heit, -keit, -lich, -los). En B1 estos patrones amplían el vocabulario exponencialmente.',
  lead: 'Aprende a construir y descifrar palabras compuestas alemanas, y a usar los prefijos y sufijos más productivos del B1 para ampliar tu vocabulario de forma sistemática.',
  outcomes: [
    'Forma y analiza palabras compuestas (Komposita) con hasta tres elementos',
    'Identifica el género de los compuestos según el último componente',
    'Usa sufijos nominales -ung, -heit, -keit, -schaft, -ling para derivar sustantivos',
    'Aplica sufijos adjetivales -lich, -ig, -los, -voll, -bar correctamente',
    'Usa los prefijos ver-, be-, er-, un-, miss- para modificar verbos y adjetivos',
  ],

  guide: {
    goal: 'Ampliar vocabulario activo en B1 usando los patrones de formación de palabras más productivos del alemán.',
    model: 'das Haus + die Aufgabe → die Hausaufgabe / glück + -lich → glücklich / un- + glücklich → unglücklich',
    formula: 'Komposition: Wort1 + Wort2 → neues Wort  |  Derivation: Stamm + Suffix / Präfix + Stamm',
    decisions: [
      'En los compuestos (Komposita) el género lo determina SIEMPRE el último elemento: das Haus + die Tür → die Haustür.',
      'El primer elemento puede ser un sustantivo, adjetivo, verbo o adverbio. A veces se añade una -s- de unión: die Arbeit + s + geber → der Arbeitgeber.',
      'Sufijos nominales frecuentes: -ung (de verbos: lösen → die Lösung), -heit (de adj.: krank → die Krankheit), -keit (de adj. en -ig/-lich: glücklich → die Glücklichkeit — poco usual; pünktlich → die Pünktlichkeit), -schaft (grupo/colectivo: die Freundschaft), -ling (persona con característica: der Frühling, der Lehrling).',
      'Sufijos adjetivales: -lich (de sustantivos/verbos: natürlich, freundlich), -ig (con esa característica: fleißig, hungrig), -los (sin: arbeitslos, hoffnungslos), -voll (lleno de: wundervoll, liebevoll), -bar (posibilidad: machbar, essbar).',
      'Prefijos verbales inseparables: be- (transitivo: bezahlen), ver- (cambio/error: vergessen, verlaufen), er- (resultado: erklären, erarbeiten), miss- (negación: missverstehen, misslingen).',
      'Prefijo un- niega adjetivos y sustantivos: unglücklich, Unfall, Unordnung.',
    ],
    table: [
      ['Proceso', 'Patrón', 'Ejemplo'],
      ['Composición', 'Wort1 + Wort2', 'das Haus + die Tür → die Haustür'],
      ['Derivación -ung', 'Verb + -ung', 'erklären → die Erklärung'],
      ['Derivación -heit', 'Adj. + -heit', 'frei → die Freiheit / krank → die Krankheit'],
      ['Derivación -lich', 'N/V + -lich', 'Freund → freundlich / natur → natürlich'],
      ['Prefijo un-', 'un- + Adj./N', 'glücklich → unglücklich / Glück → Unglück'],
    ],
    mistakes: [
      '"Die Haustür" → género incorrecto como "der Haustür" ❌ → "die Haustür" ✓ — el género siempre lo determina el último elemento (die Tür).',
      '"Die Erklärungung" ❌ — no se duplica el sufijo. erklären → die Erklärung (una sola -ung).',
      '"Arbeitslosigkeit" puede parecer imposible pero es correcta: arbeit + s + los + ig + keit. Analiza capa por capa.',
    ],
  },

  seo: [
    {
      heading: '¿Por qué es tan importante la Wortbildung en alemán?',
      paragraphs: [
        'El alemán es famoso por su capacidad de crear palabras nuevas combinando palabras existentes. Una vez que conoces los patrones de formación, puedes entender y crear miles de palabras nuevas que nunca has visto. Esto es especialmente valioso en B1, donde el vocabulario activo se amplía rápidamente.',
        'La formación de palabras en alemán tiene dos grandes mecanismos: la Komposition (composición, unir palabras) y la Derivation (derivación, añadir prefijos o sufijos). Ambos son extremadamente productivos y los hablantes nativos los usan constantemente para crear neologismos o palabras específicas.',
      ],
    },
    {
      heading: 'Komposition: palabras compuestas alemanas',
      paragraphs: [
        'Los compuestos (Komposita) combinan dos o más palabras para crear un concepto nuevo: Haustür, Handtasche, Arbeitsplatz, Sonnenschutz. La regla más importante: el género del compuesto es siempre el del ÚLTIMO elemento. das Haus + die Tür → die Haustür. die Sonne + der Schirm → der Sonnenschirm.',
        'A veces entre los elementos se añade una vocal o consonante de unión (Fugenelement): -s- (Arbeitszeit, Geburtstagsparty), -e- (Hundeleine), -er- (Kinderzimmer). No sigue una regla estricta — hay que aprenderlas por uso.',
      ],
      table: [
        ['Elemento 1', 'Fugenelement', 'Elemento 2', 'Compuesto', 'Género'],
        ['das Haus', '—', 'die Tür', 'die Haustür', 'die (Tür)'],
        ['die Arbeit', '-s-', 'die Zeit', 'die Arbeitszeit', 'die (Zeit)'],
        ['der Geburtstag', '-s-', 'die Party', 'die Geburtstagsparty', 'die (Party)'],
        ['das Kind', '-er-', 'das Zimmer', 'das Kinderzimmer', 'das (Zimmer)'],
      ],
    },
    {
      heading: 'Sufijos nominales: crea sustantivos desde verbos y adjetivos',
      paragraphs: [
        'El sufijo -ung convierte verbos en sustantivos femeninos (siempre die): lösen → die Lösung, erklären → die Erklärung, üben → die Übung, öffnen → die Öffnung. El sufijo -heit crea sustantivos femeninos de adjetivos: frei → die Freiheit, krank → die Krankheit, schön → die Schönheit.',
        'El sufijo -keit se usa especialmente con adjetivos que terminan en -ig o -lich: pünktlich → die Pünktlichkeit, freundlich → die Freundlichkeit, einsam → die Einsamkeit. -schaft crea sustantivos que indican colectivos o relaciones: Freund → die Freundschaft, Gesellschaft, Mannschaft.',
      ],
      table: [
        ['Sufijo', 'Base', 'Ejemplo', 'Significado'],
        ['-ung (die)', 'Verb', 'erklären → die Erklärung', 'explicación'],
        ['-heit (die)', 'Adjektiv', 'frei → die Freiheit', 'libertad'],
        ['-keit (die)', 'Adj. en -lich/-ig', 'pünktlich → die Pünktlichkeit', 'puntualidad'],
        ['-schaft (die)', 'Nomen', 'Freund → die Freundschaft', 'amistad'],
        ['-ling (der)', 'Adj./Verb', 'lernen → der Lehrling', 'aprendiz'],
      ],
    },
    {
      heading: 'Sufijos adjetivales y prefijos más productivos',
      paragraphs: [
        'Los sufijos adjetivales más frecuentes en B1: -lich (freundlich, natürlich, jährlich), -ig (hungrig, fleißig, mutig), -los (arbeitslos, hoffnungslos, sinnlos — sin algo), -voll (wundervoll, liebevoll — lleno de), -bar (essbar, machbar, erreichbar — posibilidad pasiva).',
        'El prefijo un- niega adjetivos: glücklich → unglücklich, möglich → unmöglich, bekannt → unbekannt. El prefijo miss- indica error o fallo: missverstehen, Misserfolg, misslingen. ver- cambia el significado del verbo: kaufen → verkaufen, fahren → verfahren (perderse en coche).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Wortbildung B1: composición (género del último elemento, Fugenelemente -s-/-e-/-er-), sufijos nominales (-ung, -heit, -keit, -schaft), sufijos adjetivales (-lich, -ig, -los, -bar), prefijos (un-, ver-, miss-).',
    graphicPrompt: 'Árbol de palabras: raíz en el centro, ramas hacia compuestos (con flechas al género), ramas hacia derivados con sufijos (con género marcado) y prefijos (con signo de negación o cambio). Todo en alemán.',
    scene: [
      ['Komposition', 'das Haus + die Tür → die Haustür (género: Tür)'],
      ['Sufijo -ung', 'erklären → die Erklärung (siempre femenino)'],
      ['Sufijo -heit', 'frei → die Freiheit'],
      ['Sufijo -lich', 'Freund → freundlich'],
      ['Präfix un-', 'glücklich → unglücklich'],
    ],
    learnerModes: ['Analiza un compuesto: identifica los componentes y determina el género', 'Deriva nuevas palabras usando sufijos conocidos', 'Reconoce el significado de un prefijo para deducir el significado global'],
    practiceVerbs: ['erklären', 'öffnen', 'lösen', 'arbeiten', 'lernen'],
    reviewFocus: ['¿Cuál es el género de "die Sonnenschirm"? — No: es "der Sonnenschirm" (der Schirm)', '¿Qué sufijo convierte "frei" en sustantivo?', '¿Qué significa el prefijo -bar en "essbar"?'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        type: 'choice',
        title: 'Género de compuestos',
        tag: 'Comprensión',
        intro: 'Identifica el género correcto del compuesto según el último elemento.',
        items: [
          {
            scene: '¿Cuál es el género de "Haustür"? (das Haus + die Tür)',
            lines: [['Compuesto', '___ Haustür']],
            options: ['der', 'die', 'das'],
            answer: 'die',
            explain: 'El género lo determina el último elemento: die Tür → die Haustür.',
          },
          {
            scene: '¿Cuál es el género de "Kinderzimmer"? (das Kind + das Zimmer)',
            lines: [['Compuesto', '___ Kinderzimmer']],
            options: ['der', 'die', 'das'],
            answer: 'das',
            explain: 'das Zimmer → das Kinderzimmer. Género: neutro.',
          },
          {
            scene: '¿Cuál es el género de "Handtasche"? (die Hand + die Tasche)',
            lines: [['Compuesto', '___ Handtasche']],
            options: ['der', 'die', 'das'],
            answer: 'die',
            explain: 'die Tasche → die Handtasche. Género: femenino.',
          },
          {
            scene: '¿Cuál es el género de "Sonnenschirm"? (die Sonne + der Schirm)',
            lines: [['Compuesto', '___ Sonnenschirm']],
            options: ['der', 'die', 'das'],
            answer: 'der',
            explain: 'der Schirm → der Sonnenschirm. Aunque die Sonne es femenino, el género viene del último: der Schirm.',
          },
          {
            scene: '¿Cuál es el género de "Geburtstagskuchen"? (der Geburtstag + der Kuchen)',
            lines: [['Compuesto', '___ Geburtstagskuchen']],
            options: ['der', 'die', 'das'],
            answer: 'der',
            explain: 'der Kuchen → der Geburtstagskuchen. Nota la -s- de unión: Geburtstag-s-kuchen.',
          },
        ],
      },
      {
        id: 'level-2',
        type: 'choice',
        title: 'Sufijos y derivación',
        tag: 'Derivación',
        intro: 'Elige el sufijo correcto para formar la palabra derivada.',
        items: [
          {
            scene: '¿Cuál es el sustantivo de "erklären" con el sufijo correcto?',
            lines: [['Derivación', 'erklären → die Erklär___']],
            options: ['-heit', '-ung', '-keit', '-schaft'],
            answer: '-ung',
            explain: 'Los verbos derivan sustantivos femeninos con -ung: erklären → die Erklärung.',
          },
          {
            scene: '¿Cuál es el sustantivo de "frei" (libre) con el sufijo correcto?',
            lines: [['Derivación', 'frei → die Frei___']],
            options: ['-ung', '-keit', '-heit', '-ling'],
            answer: '-heit',
            explain: 'Los adjetivos simples derivan sustantivos con -heit: frei → die Freiheit, krank → die Krankheit.',
          },
          {
            scene: '¿Cuál es el sustantivo de "pünktlich" (puntual) con el sufijo correcto?',
            lines: [['Derivación', 'pünktlich → die Pünktlich___']],
            options: ['-heit', '-ung', '-keit', '-schaft'],
            answer: '-keit',
            explain: 'Los adjetivos en -lich derivan sustantivos con -keit: pünktlich → die Pünktlichkeit.',
          },
          {
            scene: '¿Cuál es el adjetivo para "alguien que tiene esperanza" (Hoffnung)?',
            lines: [['Derivación', 'Hoffnung → hoffn___']],
            options: ['hoffnungvoll', 'hoffnungsvoll', 'hoffnungsbar', 'hoffnunglos'],
            answer: 'hoffnungsvoll',
            explain: '-voll = lleno de. Hoffnung + s + voll = hoffnungsvoll (esperanzador).',
          },
          {
            scene: '¿Cuál es el adjetivo para "que se puede comer" (essen)?',
            lines: [['Derivación', 'essen → ess___']],
            options: ['essig', 'esslich', 'essbar', 'esslos'],
            answer: 'essbar',
            explain: '-bar = posibilidad pasiva. essen → essbar (comestible, que se puede comer).',
          },
        ],
      },
      {
        id: 'level-3',
        type: 'dual',
        title: 'Analiza y forma palabras',
        tag: 'Análisis',
        intro: 'Descompón o forma las palabras según se indica.',
        items: [
          {
            scene: 'Forma el compuesto: die Arbeit + s + der Platz',
            lines: [['Resultado', '→ ___ [[0]]']],
            blanks: [
              { answer: 'der Arbeitsplatz', explain: 'die Arbeit + -s- (Fugenelement) + der Platz → der Arbeitsplatz. Género: der (Platz).' },
            ],
          },
          {
            scene: 'Deriva el sustantivo: üben → (sufijo -ung)',
            lines: [['Resultado', '→ die [[0]]']],
            blanks: [
              { answer: 'Übung', explain: 'üben + -ung → die Übung. Nota la Umlaut: ü no cambia.' },
            ],
          },
          {
            scene: 'Deriva el adjetivo opuesto con prefijo: möglich → (prefijo un-)',
            lines: [['Resultado', '→ [[0]]']],
            blanks: [
              { answer: 'unmöglich', explain: 'un- niega adjetivos: möglich → unmöglich (imposible).' },
            ],
          },
          {
            scene: 'Forma el compuesto: die Sonne + n + die Brille',
            lines: [['Resultado', '→ ___ [[0]]']],
            blanks: [
              { answer: 'die Sonnenbrille', explain: 'die Sonne + -n- (Fugenelement) + die Brille → die Sonnenbrille. Género: die (Brille).' },
            ],
          },
          {
            scene: 'Deriva el sustantivo de "freundlich" (amable) con -keit',
            lines: [['Resultado', '→ die [[0]]']],
            blanks: [
              { answer: 'Freundlichkeit', explain: 'freundlich + -keit → die Freundlichkeit (amabilidad). Siempre femenino.' },
            ],
          },
        ],
      },
      {
        id: 'level-4',
        type: 'guidedText',
        title: 'Texto con formación de palabras',
        tag: 'Texto guiado',
        intro: 'Completa el texto eligiendo la palabra derivada o compuesta correcta.',
        scene: 'Artículo sobre el mercado laboral alemán',
        text: 'Die [[0]] in Deutschland ist derzeit sehr niedrig. Viele Menschen suchen einen guten [[1]]. Die [[2]] der Bewerber ist oft hoch, aber manchmal fehlt es an [[3]]. Eine gute [[4]] hilft, den richtigen Job zu finden. Wichtig ist auch [[5]] bei der Arbeit.',
        blanks: [
          { options: ['Arbeitslosigkeit', 'Arbeitslosig', 'Arbeitslose'], answer: 'Arbeitslosigkeit', explain: 'Arbeit + -s- + los + -ig + -keit = die Arbeitslosigkeit (desempleo).' },
          { options: ['Arbeitsplatz', 'Arbeitsplatzes', 'Arbeitsort'], answer: 'Arbeitsplatz', explain: 'Arbeit + -s- + Platz = der Arbeitsplatz (puesto de trabajo). Aquí: einen → Akk. masculino.' },
          { options: ['Qualifikation', 'Qualifizierung', 'Qualität'], answer: 'Qualifikation', explain: 'qualifizieren → die Qualifikation (cualificación). Préstamo con -tion femenino.' },
          { options: ['Erfahrung', 'Erfahrenheit', 'Erfahrungskeit'], answer: 'Erfahrung', explain: 'erfahren → die Erfahrung (experiencia). Sufijo -ung, siempre femenino.' },
          { options: ['Beratung', 'Beratheit', 'Beraten'], answer: 'Beratung', explain: 'beraten → die Beratung (asesoramiento). Sufijo -ung.' },
          { options: ['Pünktlichkeit', 'Pünktlichheit', 'Pünktlichung'], answer: 'Pünktlichkeit', explain: 'pünktlich + -keit → die Pünktlichkeit (puntualidad).' },
        ],
      },
      {
        id: 'level-5',
        type: 'freeText',
        title: 'Descifra palabras compuestas',
        tag: 'Análisis',
        intro: 'Analiza las palabras y explica su formación y significado.',
        scene: 'Análisis de Komposita',
        text: '"Handtasche": componentes [[0]], género [[1]]. "Sonnenschirm": componentes [[2]], género [[3]]. "Geburtstagsparty": componentes [[4]], Fugenelement [[5]].',
        blanks: [
          { answer: 'die Hand + die Tasche', explain: 'Handtasche = mano + bolso = bolso de mano.' },
          { answer: 'die (Tasche)', explain: 'El último elemento die Tasche determina el género: die Handtasche.' },
          { answer: 'die Sonne + der Schirm', explain: 'Sonnenschirm = sol + paraguas = sombrilla.' },
          { answer: 'der (Schirm)', explain: 'El último elemento der Schirm determina el género: der Sonnenschirm.' },
          { answer: 'der Geburtstag + die Party', explain: 'Geburtstagsparty = cumpleaños + fiesta = fiesta de cumpleaños.' },
          { answer: '-s-', explain: 'Geburtstag + -s- + Party. El Fugenelement -s- une los dos elementos.' },
        ],
      },
      {
        id: 'level-6',
        type: 'write',
        title: 'Crea y usa palabras nuevas',
        tag: 'Escritura libre',
        intro: 'Crea palabras usando los patrones de Wortbildung y úsalas en oraciones.',
        items: [
          {
            scene: 'Forma el sustantivo de "öffnen" y úsalo en una oración.',
            prompt: 'öffnen + -ung → ¿Qué sustantivo se forma? Úsalo en una oración.',
            answer: 'die Öffnung. Die Öffnung des neuen Museums war ein großes Ereignis.',
            accepted: ['Die Öffnung der Flasche war schwierig.', 'Nach der Öffnung des Shops gab es viele Kunden.'],
            explain: 'öffnen → die Öffnung (apertura). Sufijo -ung, siempre femenino.',
          },
          {
            scene: 'Forma el opuesto de "möglich" con prefijo y úsalo en una oración.',
            prompt: 'un- + möglich → ¿Qué adjetivo se forma? Escribe una oración.',
            answer: 'unmöglich. Das ist total unmöglich!',
            accepted: ['Es ist unmöglich, das in einem Tag zu schaffen.', 'Diese Aufgabe ist unmöglich.'],
            explain: 'un- + möglich → unmöglich (imposible). Prefijo negativo un-.',
          },
          {
            scene: 'Crea dos compuestos con "die Stadt" como segundo elemento y úsalos en oraciones.',
            prompt: 'Combina dos sustantivos con "Stadt" al final y escribe una oración para cada uno.',
            answer: 'die Innenstadt: Die Innenstadt von Berlin ist sehr lebendig. die Hauptstadt: Berlin ist die Hauptstadt von Deutschland.',
            accepted: ['die Altstadt: Die Altstadt ist sehr schön.', 'die Großstadt: Ich wohne in einer Großstadt.'],
            explain: 'innen + Stadt = die Innenstadt (centro urbano). Haupt + Stadt = die Hauptstadt (capital). Género: die (Stadt).',
          },
          {
            scene: 'Usa tres sufijos adjetivales distintos para describir a una persona ideal.',
            prompt: 'Escribe tres adjetivos derivados (-lich, -ig, -voll) describiendo a alguien.',
            answer: 'Eine ideale Lehrerin ist freundlich, fleißig und liebevoll.',
            accepted: ['Er ist hilfsbereit, mutig und zuverlässig.', 'Sie ist pünktlich, kreativ und wundervoll.'],
            explain: 'freundlich (-lich), fleißig (-ig), liebevoll (-voll) — tres sufijos adjetivales distintos.',
          },
        ],
      },
    ],
  },
}

export default topic
