import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'indirekte-rede-b1',
  order: '18',
  color: '#1a2ecc',
  category: 'Satzstruktur',
  level: 'B1',
  title: 'Indirekte Rede en Alemán B1 — Discurso Indirecto con dass y Konjunktiv I',
  shortTitle: 'Indirekte Rede',
  metaTitle: 'Indirekte Rede B1 — Estilo indirecto alemán con dass, Konjunktiv I y II',
  description:
    'La indirekte Rede (estilo indirecto) se usa para reproducir lo que alguien dijo sin citar sus palabras exactas. En nivel B1 se usa principalmente con dass + Indikativ o Konjunktiv I, o con Konjunktiv II para mayor distancia.',
  lead: 'Aprende a reportar lo que alguien dijo en alemán: con dass + verbo al final, o con Konjunktiv I (sea/habe) para mayor precisión periodística.',
  outcomes: [
    'Construye el estilo indirecto con dass y el verbo al final del subordinado',
    'Transforma el tiempo verbal al pasar del directo al indirecto',
    'Usa Konjunktiv I (er sei, er habe) para el estilo indirecto formal/periodístico',
    'Adapta los pronombres personales en el paso al estilo indirecto',
    'Distingue cuándo usar Konjunktiv I vs. Konjunktiv II en el estilo indirecto',
  ],

  guide: {
    goal: 'Reportar declaraciones, preguntas y peticiones de otras personas en alemán de forma natural y precisa.',
    model: 'Er sagt, dass er müde sei. / Sie hat gesagt, dass sie morgen komme.',
    formula: 'Hauptsatz + dass + … + Verb(Konj.I/Indikativ)  |  oder: Hauptsatz + Infinitiv-Konj.I',
    decisions: [
      'Para introducir el estilo indirecto se usan verbos como: sagen, erzählen, berichten, erklären, meinen, fragen, antworten.',
      'La forma más común en B1 hablado: sujeto + sagt/sagte, dass + … + verbo al final (Indikativ). Ej: Er sagt, dass er morgen kommt.',
      'Para mayor distancia o formalidad (prensa, textos académicos): se usa Konjunktiv I. Ej: Er sagt, er komme morgen. / Sie habe das nicht gewusst.',
      'Konjunktiv I de sein: ich sei, du sei(e)st, er/sie/es sei, wir seien, ihr seiet, sie seien.',
      'Konjunktiv I de haben: ich habe, du habest, er/sie/es habe, wir haben, ihr habet, sie haben.',
      'Konjunktiv I de regulares: como el infinitivo en todas las personas excepto 3.ª sing. queda igual que el Indikativ en muchos verbos; entonces se usa Konjunktiv II para evitar ambigüedad.',
      'Los pronombres personales cambian: directo "Ich bin müde" → indirecto "Er sagt, dass er müde sei".',
      'Para preguntas indirectas: ob (si) para preguntas sí/no; pronombre interrogativo + subordinada para las demás. Ej: Er fragt, ob sie kommt. / Sie fragt, wo er wohnt.',
    ],
    table: [
      ['Tipo / Directo', 'Indirecto con dass + Indikativ', 'Indirecto con Konjunktiv I'],
      ['Afirmación: "Ich bin müde."', 'Er sagt, dass er müde ist.', 'Er sagt, er sei müde.'],
      ['Pasado: "Ich habe gearbeitet."', 'Er sagt, dass er gearbeitet hat.', 'Er sagt, er habe gearbeitet.'],
      ['Pregunta sí/no: "Kommst du?"', 'Er fragt, ob sie kommt.', 'Er fragt, ob sie komme.'],
      ['Pregunta info: "Wo wohnst du?"', 'Er fragt, wo sie wohnt.', 'Er fragt, wo sie wohne.'],
    ],
    mistakes: [
      '"Er sagt, dass er bin müde" ❌ → "Er sagt, dass er müde ist" ✓ — en el dass-Satz el verbo va al FINAL.',
      '"Er fragt, ob kommst du" ❌ → "Er fragt, ob du kommst" ✓ — en la pregunta indirecta el orden es sujeto + verbo al final.',
      'Olvidar cambiar el pronombre: "Er sagt, dass ich müde bin" ❌ (si el hablante es él) → "Er sagt, dass er müde sei" ✓.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es la indirekte Rede en alemán?',
      paragraphs: [
        'La indirekte Rede (discurso indirecto o estilo indirecto) es la manera de reportar lo que alguien dijo sin usar sus palabras exactas entre comillas. En vez de citar literalmente, transformamos la oración para indicar que alguien lo afirmó.',
        'Directo (direkte Rede): Maria sagt: "Ich bin krank." (María dice: "Estoy enferma.") → Indirecto: Maria sagt, dass sie krank ist. / Maria sagt, sie sei krank. En B1 necesitas manejar esta transformación para narraciones, informes y conversaciones cotidianas.',
      ],
    },
    {
      heading: 'La estructura con dass: la forma más usada en B1',
      paragraphs: [
        'La forma más frecuente en el alemán hablado de nivel B1 es: verbo introductor (sagt, erzählt, meint) + dass + sujeto + … + verbo al FINAL. La oración con dass es un Nebensatz, por eso el verbo va al final.',
        'Ejemplos: "Er sagt, dass er morgen arbeitet." / "Sie hat erklärt, dass das Projekt fertig ist." / "Ich habe gehört, dass du heiraten willst." En el habla informal también es posible omitir el dass y mantener el orden de la oración principal: "Er sagt, er kommt morgen."',
      ],
      table: [
        ['Directo', 'Indirecto con dass'],
        ['"Ich lerne Deutsch."', 'Sie sagt, dass sie Deutsch lernt.'],
        ['"Das Essen ist fertig."', 'Er sagt, dass das Essen fertig ist.'],
        ['"Wir haben gewonnen!"', 'Sie sagen, dass sie gewonnen haben.'],
        ['"Ich war krank."', 'Er erklärt, dass er krank war.'],
      ],
    },
    {
      heading: 'El Konjunktiv I en el estilo indirecto',
      paragraphs: [
        'En alemán formal (prensa, literatura, noticias) se usa el Konjunktiv I para el estilo indirecto. Se forma a partir del infinitivo añadiendo las terminaciones: -e, -est, -e, -en, -et, -en. Las más importantes son er/sie sei (sein), er/sie habe (haben), er/sie komme (kommen).',
        'Si el Konjunktiv I coincide con el Indikativ (lo que pasa con muchos verbos en 1.ª persona), se usa Konjunktiv II para mantener la distancia: "Sie sagten, sie kämen" (en vez de "sie kommen" que es Indikativ = ambiguo). En B1 lo más importante es reconocer las formas de sein y haben en Konjunktiv I.',
      ],
      table: [
        ['Verbo', 'Indikativ 3.ª sing.', 'Konjunktiv I 3.ª sing.', 'Ejemplo indirecto'],
        ['sein', 'ist', 'sei', 'Er sagt, er sei müde.'],
        ['haben', 'hat', 'habe', 'Sie sagt, sie habe Zeit.'],
        ['kommen', 'kommt', 'komme', 'Er sagt, er komme morgen.'],
        ['arbeiten', 'arbeitet', 'arbeite', 'Sie sagt, sie arbeite viel.'],
      ],
    },
    {
      heading: 'Preguntas y peticiones en el estilo indirecto',
      paragraphs: [
        'Para reportar preguntas se usa: preguntas de sí/no → ob + oración con verbo al final. Preguntas con palabra interrogativa → W-Wort + oración con verbo al final. "Kommst du?" → Er fragt, ob ich komme. "Wo wohnst du?" → Er fragt, wo ich wohne.',
        'Para reportar peticiones o ruegos (imperativo directo) se usan verbos como bitten, auffordern + zu + Infinitiv, o dass + sollen. "Komm bitte!" → Er bittet mich zu kommen. / Er sagt, ich solle kommen.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Indirekte Rede B1: dass + Nebensatz (verbo al final), Konjunktiv I (sei/habe/komme), cambio de pronombres, ob para preguntas sí/no, W-Wort para preguntas info.',
    graphicPrompt: 'Dos burbujas de diálogo: una con cita directa (comillas) y otra con la transformación al estilo indirecto. Flechas muestran los cambios: pronombre, verbo, conector (dass/ob).',
    scene: [
      ['Direkt', '"Ich bin sehr müde." — sagt Thomas'],
      ['Indirekt', 'Thomas sagt, dass er sehr müde sei.'],
      ['Direkt', '"Hast du Zeit?" — fragt Anna'],
      ['Indirekt', 'Anna fragt, ob ich Zeit habe.'],
      ['Direkt', '"Wir haben das Projekt fertiggestellt." — berichten sie'],
      ['Indirekt', 'Sie berichten, dass sie das Projekt fertiggestellt haben.'],
    ],
    learnerModes: ['Identifica el verbo introductor y el tipo de oración (afirmación/pregunta/petición)', 'Transforma el pronombre y el tiempo verbal', 'Decide entre dass + Indikativ vs. Konjunktiv I según el registro'],
    reviewFocus: ['¿El verbo va al final en la oración con dass?', '¿Qué conector se usa para preguntas sí/no?', '¿Cuál es el Konjunktiv I de sein en 3.ª persona?'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        type: 'choice',
        title: 'Reconoce el estilo indirecto',
        tag: 'Comprensión',
        intro: 'Elige la versión correcta del estilo indirecto para cada cita.',
        items: [
          {
            scene: 'Thomas dice: "Ich bin krank." ¿Cuál es la forma correcta en estilo indirecto?',
            lines: [['Direkt', 'Thomas sagt: "Ich bin krank."']],
            options: [
              'Thomas sagt, dass ich krank bin.',
              'Thomas sagt, dass er krank ist.',
              'Thomas sagt, dass er krank sein.',
              'Thomas sagt, ob er krank ist.',
            ],
            answer: 'Thomas sagt, dass er krank ist.',
            explain: 'El pronombre cambia de "ich" a "er". En dass-Satz el verbo "ist" va al final.',
          },
          {
            scene: 'Anna fragt: "Hast du Zeit?" ¿Cuál es la forma correcta en estilo indirecto?',
            lines: [['Direkt', 'Anna fragt: "Hast du Zeit?"']],
            options: [
              'Anna fragt, dass du Zeit hast.',
              'Anna fragt, ob du Zeit hast.',
              'Anna fragt, ob du Zeit haben.',
              'Anna fragt, wo du Zeit hast.',
            ],
            answer: 'Anna fragt, ob du Zeit hast.',
            explain: 'Pregunta sí/no → ob + sujeto + … + verbo al final. "ob" = "si".',
          },
          {
            scene: 'El jefe dice: "Wir haben das Projekt beendet." ¿Cuál es la forma correcta?',
            lines: [['Direkt', 'Der Chef sagt: "Wir haben das Projekt beendet."']],
            options: [
              'Der Chef sagt, dass wir das Projekt beendet hat.',
              'Der Chef sagt, dass sie das Projekt beendet haben.',
              'Der Chef sagt, ob sie das Projekt beendet haben.',
              'Der Chef sagt, dass wir das Projekt beendet sind.',
            ],
            answer: 'Der Chef sagt, dass sie das Projekt beendet haben.',
            explain: '"Wir" del directo se convierte en "sie" al hablar de ellos. "haben" al final (Perfekt → haben + Partizip II).',
          },
          {
            scene: '¿Cuál es la forma correcta del Konjunktiv I de sein para 3.ª persona singular?',
            lines: [['Contexto', 'Er sagt, er ___ müde.']],
            options: ['ist', 'war', 'sei', 'wäre'],
            answer: 'sei',
            explain: 'Konjunktiv I de sein: 3.ª sing. → sei. (ich sei, er/sie/es sei, wir seien).',
          },
          {
            scene: 'Petra fragt: "Wo wohnst du?" ¿Cómo se reporta esta pregunta?',
            lines: [['Direkt', 'Petra fragt: "Wo wohnst du?"']],
            options: [
              'Petra fragt, ob du wohnst.',
              'Petra fragt, wo du wohnst.',
              'Petra fragt, dass du wohnst.',
              'Petra fragt, wo wohnst du.',
            ],
            answer: 'Petra fragt, wo du wohnst.',
            explain: 'Pregunta con W-Wort → W-Wort + sujeto + verbo al final. No se usa ob.',
          },
        ],
      },
      {
        id: 'level-2',
        type: 'choice',
        title: 'Transformación de pronombres y tiempos',
        tag: 'Gramática',
        intro: 'Elige la transformación correcta al pasar al estilo indirecto.',
        items: [
          {
            scene: 'Directo: "Ich habe gestern gearbeitet." (lo dice María) → ¿Cómo queda en indirecto?',
            lines: [['Contexto', 'María sagt, dass sie gestern ___ ___.']],
            options: ['habe gearbeitet', 'hat gearbeitet', 'arbeite', 'gearbeitet hat'],
            answer: 'gearbeitet hat',
            explain: 'En dass-Satz el verbo auxiliar va al FINAL: ... dass sie gestern gearbeitet hat. (Perfekt: Partizip II + hat al final).',
          },
          {
            scene: 'Directo: "Wir kommen morgen." (lo dicen ellos) → ¿Qué pronombre se usa en el indirecto?',
            lines: [['Contexto', 'Sie sagen, dass ___ morgen kommen.']],
            options: ['wir', 'sie', 'ihr', 'es'],
            answer: 'sie',
            explain: 'Si el narrador no forma parte del grupo, "wir" se convierte en "sie" en el indirecto.',
          },
          {
            scene: 'Directo: "Ich werde das machen." → En Konjunktiv I (3.ª persona sing.)',
            lines: [['Indirecto', 'Er sagt, er ___ das machen.']],
            options: ['wird', 'würde', 'werde', 'werden'],
            answer: 'werde',
            explain: 'werden → Konjunktiv I 3.ª sing.: werde. Er sagt, er werde das machen.',
          },
          {
            scene: '¿Con qué conector se introduce una petición indirecta "Er bittet mich, dass..."?',
            lines: [['Directo', '"Komm bitte morgen!" — er bittet mich.']],
            options: [
              'Er bittet, dass ich morgen kommt.',
              'Er bittet mich, morgen zu kommen.',
              'Er bittet ob ich morgen komme.',
              'Er bittet, dass ich morgen kommen.',
            ],
            answer: 'Er bittet mich, morgen zu kommen.',
            explain: 'bitten + Akkusativ + zu + Infinitiv. "Er bittet mich, morgen zu kommen." es la forma más natural para peticiones.',
          },
          {
            scene: 'Directo: "Haben Sie das Formular ausgefüllt?" (pregunta sí/no) → Indirecto',
            lines: [['Contexto', 'Sie fragt, ___ ich das Formular ausgefüllt habe.']],
            options: ['ob', 'dass', 'wo', 'weil'],
            answer: 'ob',
            explain: 'Pregunta sí/no → ob. "Sie fragt, ob ich das Formular ausgefüllt habe."',
          },
        ],
      },
      {
        id: 'level-3',
        type: 'dual',
        title: 'Transforma al estilo indirecto',
        tag: 'Producción',
        intro: 'Completa el estilo indirecto con los elementos correctos.',
        items: [
          {
            scene: 'Directo: "Ich bin sehr glücklich." (lo dice Ana)',
            lines: [['Indirecto', 'Ana sagt, dass sie sehr glücklich [[0]].']],
            blanks: [
              { answer: 'ist', accepted: ['sei'], explain: 'ist (Indikativ informal) o sei (Konjunktiv I formal). Ambas son correctas.' },
            ],
          },
          {
            scene: 'Directo: "Kommst du zur Party?" (pregunta Luisa)',
            lines: [['Indirecto', 'Luisa fragt, [[0]] du zur Party kommst.']],
            blanks: [
              { answer: 'ob', explain: 'Pregunta sí/no → ob + sujeto + verbo al final.' },
            ],
          },
          {
            scene: 'Directo: "Wir haben viel gelernt." (dicen los estudiantes)',
            lines: [['Indirecto', 'Die Studenten sagen, dass sie viel gelernt [[0]].']],
            blanks: [
              { answer: 'haben', explain: 'Perfekt en dass-Satz: Partizip II + haben/sein al final.' },
            ],
          },
          {
            scene: 'Directo: "Wo ist das Büro?" (pregunta el cliente)',
            lines: [['Indirecto', 'Der Kunde fragt, [[0]] das Büro [[1]].']],
            blanks: [
              { answer: 'wo', explain: 'Pregunta con W-Wort → W-Wort directo en el indirecto.' },
              { answer: 'ist', accepted: ['sei'], explain: 'ist o sei. Verbo al final del Nebensatz.' },
            ],
          },
          {
            scene: 'Directo: "Ich werde morgen nicht arbeiten." (lo dice él)',
            lines: [['Indirecto (Konjunktiv I)', 'Er sagt, er [[0]] morgen nicht arbeiten.']],
            blanks: [
              { answer: 'werde', explain: 'werden → Konjunktiv I 3.ª sing.: werde. (werden, du werdest, er werde...)' },
            ],
          },
        ],
      },
      {
        id: 'level-4',
        type: 'guidedText',
        title: 'Reportaje periodístico',
        tag: 'Texto guiado',
        intro: 'Completa este breve reportaje usando el estilo indirecto con Konjunktiv I.',
        scene: 'Artículo de periódico: declaraciones del alcalde',
        text: 'Der Bürgermeister erklärte gestern, die Stadt [[0]] viele neue Arbeitsplätze. Er betonte, das Budget [[1]] ausreichend. Außerdem sagte er, die Bauarbeiten [[2]] nächsten Monat. Auf die Frage der Journalisten, [[3]] weitere Steuererhöhungen geplant [[4]], antwortete er, das [[5]] nicht der Fall.',
        blanks: [
          { options: ['habe', 'hat', 'haben'], answer: 'habe', explain: 'haben → Konjunktiv I 3.ª sing.: habe. (Die Stadt habe viele Arbeitsplätze.)' },
          { options: ['sei', 'ist', 'wäre'], answer: 'sei', explain: 'sein → Konjunktiv I 3.ª sing.: sei. (Das Budget sei ausreichend.)' },
          { options: ['beginnen', 'beginne', 'begännen'], answer: 'beginne', explain: 'beginnen → Konjunktiv I 3.ª sing.: beginne. (Die Bauarbeiten beginne nächsten Monat.)' },
          { options: ['ob', 'dass', 'weil'], answer: 'ob', explain: 'Pregunta sí/no → ob.' },
          { options: ['sein', 'seien', 'sind'], answer: 'seien', explain: 'sein → Konjunktiv I 3.ª pl. (Steuererhöhungen = plural): seien.' },
          { options: ['ist', 'sei', 'wäre'], answer: 'sei', explain: 'sein → Konjunktiv I 3.ª sing.: sei. (Das sei nicht der Fall.)' },
        ],
      },
      {
        id: 'level-5',
        type: 'freeText',
        title: 'Análisis del estilo indirecto',
        tag: 'Análisis',
        intro: 'Lee la oración y responde las preguntas sobre su estructura.',
        scene: 'Análisis gramatical del estilo indirecto',
        text: 'Oración: "Der Arzt sagt, der Patient solle mehr schlafen und er habe zu viel Stress." — ¿Qué modo verbal usa "solle"? [[0]]. ¿Qué modo usa "habe"? [[1]]. ¿Qué significa "solle" aquí? [[2]]. ¿Cuál sería la cita directa? [[3]].',
        blanks: [
          { answer: 'Konjunktiv I', explain: 'sollen → Konjunktiv I 3.ª sing.: solle. (sollen, du sollest, er solle...)' },
          { answer: 'Konjunktiv I', explain: 'haben → Konjunktiv I 3.ª sing.: habe. Indica reporte indirecto.' },
          { answer: 'El paciente debería dormir más (recomendación reportada)', explain: '"solle" reporta una recomendación: el médico dijo que el paciente debe dormir más.' },
          { answer: '"Sie sollen mehr schlafen und Sie haben zu viel Stress."', explain: 'La cita directa usaría Sie (formal) y los verbos en Indikativ/Imperativ.' },
        ],
      },
      {
        id: 'level-6',
        type: 'write',
        title: 'Reporta declaraciones',
        tag: 'Escritura libre',
        intro: 'Transforma las citas directas al estilo indirecto de forma completa.',
        items: [
          {
            scene: 'Tu amigo dice: "Ich habe gestern einen neuen Job gefunden."',
            prompt: 'Transforma esta cita al estilo indirecto con dass.',
            answer: 'Mein Freund sagt, dass er gestern einen neuen Job gefunden hat.',
            accepted: ['Er sagt, er habe gestern einen neuen Job gefunden.', 'Mein Freund erzählt, dass er einen neuen Job gefunden hat.'],
            explain: '"ich" → "er", verbo auxiliar "hat" al final del dass-Satz: ...gefunden hat.',
          },
          {
            scene: 'La profesora pregunta: "Habt ihr die Hausaufgaben gemacht?"',
            prompt: 'Transforma al estilo indirecto (pregunta sí/no).',
            answer: 'Die Lehrerin fragt, ob wir die Hausaufgaben gemacht haben.',
            accepted: ['Sie fragt, ob ihr die Hausaufgaben gemacht habt.'],
            explain: 'Pregunta sí/no → ob. "habt" cambia a "haben" si el narrador es parte del grupo (wir), o "habt" si no.',
          },
          {
            scene: 'El periódico reporta: Der Präsident sagt: "Wir werden die Steuern nicht erhöhen."',
            prompt: 'Transforma al estilo periodístico con Konjunktiv I.',
            answer: 'Der Präsident sagt, sie werden die Steuern nicht erhöhen.',
            accepted: ['Der Präsident sagt, man werde die Steuern nicht erhöhen.', 'Der Präsident erklärt, sie würden die Steuern nicht erhöhen.'],
            explain: 'werden → Konjunktiv I 3.ª pl.: werden (coincide con Indikativ, por eso en la práctica se usa würden o se deja igual con contexto claro).',
          },
          {
            scene: 'Tu colega te pide: "Schick mir bitte die Präsentation!"',
            prompt: 'Reporta esta petición usando bitten + zu + Infinitiv.',
            answer: 'Mein Kollege bittet mich, ihm die Präsentation zu schicken.',
            accepted: ['Er bittet mich, die Präsentation zu schicken.', 'Er sagt, ich solle ihm die Präsentation schicken.'],
            explain: 'Petición con bitten + Akk + zu + Infinitiv. O alternativa: sollen en Konjunktiv I.',
          },
        ],
      },
    ],
  },
}

export default topic
