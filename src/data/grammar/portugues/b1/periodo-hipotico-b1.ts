import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'periodo-hipotico-b1',
  order: '16',
  color: '#166534',
  category: 'Estructura gramatical',
  level: 'B1',
  title: 'Período Hipotético en Portugués B1',
  shortTitle: 'Período Hipotético',
  metaTitle: 'Período Hipotético Portugués B1 — Condicionales y Estructuras "Si" Complexas',
  description:
    'El período hipotético (oración condicional con "se") expresa situaciones hipotéticas, probables o contrarias a la realidad. En portugués hay tres tipos: período condicional de la realidad (si + presente/futuro), de la probabilidad (si + pretérito imperfecto + condicional) y de la irrealidad (si + pretérito imperfecto de subjuntivo + condicional + pluscuamperfecto). Fundamental para B1.',
  lead: 'Domina períodos hipotéticos: condicionales de realidad, probabilidad e irrealidad.',
  outcomes: [
    'Forma períodos hipotéticos de realidad (si + presente/futuro)',
    'Forma períodos de probabilidad (si + imperfecto + condicional)',
    'Forma períodos de irrealidad (si + imperfecto de subjuntivo + condicional)',
    'Usa "se" condicional vs "se" en indicativo (¿si llueve? vs si lloviera)',
  ],

  guide: {
    goal: 'Expresar situaciones hipotéticas, condiciones y consecuencias lógicas.',
    model: 'Se chover, não vou sair. / Se chovesse, não iria sair. / Se tivesse chovido, não teria saído.',
    formula: '1) Se + presente/futuro → futuro/imperativo (realidad) | 2) Se + pretérito imperfecto → condicional (probabilidad) | 3) Se + imperfecto subjuntivo → condicional (irrealidad)',
    decisions: [
      'Tipo 1 (realidad): se chover → não vou sair (si llueve → no salgo)',
      'Tipo 2 (probabilidad): se chovesse → não iria sair (si lloviera → no iría)',
      'Tipo 3 (irrealidad): se tivesse chovido → não teria saído (si hubiera llovido → no habría salido)',
      '"Se" interrogativo (¿si?, ¿y si?) vs "se" condicional (suponiendo que)',
      'Orden flexible: "Se chover, não vou" o "Não vou se chover" (ambos correctos)',
      'En discurso indirecto: cambios de verbo requieren ajuste de modo',
    ],
    table: [
      ['Tipo', 'Si + (prótasis)', 'Resultado (apódosis)', 'Significado'],
      ['Realidad', 'se + presente/futuro', 'futuro/presente/imperativo', 'Hecho probable o general'],
      ['Probabilidad', 'se + imperfecto indicativo', 'condicional', 'Menos probable, hipotético'],
      ['Irrealidad', 'se + imperfecto subjuntivo', 'condicional compuesto', 'Contrario a la realidad'],
    ],
    mistakes: [
      '"Se chove, não vou" ✓ (realidad) vs "Se chovesse, não vou" ❌ (modo incorrecto, debería ser "não iria").',
      '"Se eu seria rico..." ❌ (condicional en prótasis no existe en portugués) → "Se eu fosse rico..." ✓.',
      '"Se tivera chovido" ✓ (arcaico pluscuamperfecto subjuntivo) es menos común que "Se tivesse chovido" ✓.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el período hipotético en portugués?',
      paragraphs: [
        'El período hipotético (también llamado oración condicional) expresa una condición ("si...") y su consecuencia ("entonces..."). En portugués, la estructura depende de la realidad del supuesto: ¿es probable? ¿es imaginario? ¿es imposible porque ya pasó?',
        'Esta distinción es crucial para sonar natural y correcto en portugués, especialmente en el CELPE-Bras donde se evalúa la precisión gramatical.',
      ],
    },
    {
      heading: 'Primer tipo: período condicional de la realidad',
      paragraphs: [
        'Expresa hechos probables o hábitos generales. Estructura: si + presente → presente/futuro/imperativo. Ejemplos: "Se chover, não vou sair" (Si llueve, no salgo). "Se você estudar, passará no exame" (Si estudias, pasarás el examen).',
        'El "si" aquí es casi un "cuando" porque es bastante probable. En portugués europeo es muy frecuente; en brasileño también, pero se usa más "if you study" (si + presente).',
      ],
    },
    {
      heading: 'Segundo tipo: período condicional de la probabilidad',
      paragraphs: [
        'Expresa situaciones menos probables o imaginarias. Estructura: si + imperfecto indicativo → condicional. Ejemplo: "Se eu tivesse dinheiro, viajaria para o Brasil" (Si tuviera dinero, viajaría a Brasil).',
        'IMPORTANTE: En portugués es imperfecto indicativo (teria, viajaria) NO imperfecto subjuntivo (tivesse). El subjuntivo se usa en otros contextos, no aquí. Confusión común para estudiantes.',
      ],
    },
    {
      heading: 'Tercer tipo: período condicional de la irrealidad (pasado)',
      paragraphs: [
        'Expresa situaciones contrarias a la realidad en el pasado. Estructura: si + imperfecto subjuntivo → condicional compuesto. Ejemplo: "Se eu tivesse estudado, teria passado no exame" (Si hubiera estudiado, habría pasado el examen).',
        'Aquí SÍ aparece imperfecto subjuntivo (tivesse, estudasse) porque la condición es sobre el pasado. El condicional compuesto (teria passado) expresa la consecuencia contrafáctica.',
      ],
    },
    {
      heading: '"Se" condicional vs interrogativo',
      paragraphs: [
        'Se condicional introduce una hipótesis: "Se eu fosse rico..." (Si fuera rico...). Se interrogativo expresa duda: "Será que ele vem?" (¿Vendrá? = "¿Si él viene?", en oralidad). El segundo es raro en escrita formal.',
        'Otro "se" es reflexivo: "Ele se vê no espelho" (Él se ve en el espejo). Claridad: contexto siempre define cuál es.',
      ],
    },
    {
      heading: 'Orden de claúsulas: flexible en portugués',
      paragraphs: [
        'Puedes decir "Se chover, não vou" (si llueve, no voy) o "Não vou se chover" (no voy si llueve). Ambos correctos. El primero es más enfático en la condición; el segundo fluye más naturalmente.',
        'En textos académicos del CELPE-Bras, el orden si-consecuencia suele preferirse por claridad estructural.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Período hipotético: 3 tipos según realidad de la condición.',
    graphicPrompt: 'Tabla: Tipo 1 (probable), Tipo 2 (imaginario), Tipo 3 (imposible/pasado) con ejemplos.',
    scene: [
      ['Se chover, não vou sair.', 'Si llueve, no salgo.'],
      ['Se você estudasse, passaria no exame.', 'Si estudiaras, pasarías el examen.'],
      ['Se tivesse dinheiro, viajaria para Brasil.', 'Si tuviera dinero, viajaría a Brasil.'],
      ['Se eu tivesse estudado, teria passado.', 'Si hubiera estudiado, habría pasado.'],
      ['Se ela chegasse a tempo, poderíamos sair.', 'Si ella llegara a tiempo, podríamos salir.'],
      ['Se houvesse mais tempo, exploraria mais.', 'Si hubiera más tiempo, exploraría más.'],
      ['Se tivéssemos ido, teríamos visto o pôr do sol.', 'Si hubiéramos ido, habríamos visto la puesta de sol.'],
      ['Se você quiser ajuda, estarei aqui.', 'Si quieres ayuda, estaré aquí.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['realidad', 'probabilidad', 'irrealidad', 'modo correcto'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica el tipo de hipótesis',
        tag: 'Múltipla escolha',
        intro: 'Selecciona la forma correcta según el tipo de período.',
        type: 'choice',
        items: [
          {
            scene: 'Tipo 1: Realidad',
            lines: [['', 'Se chover amanhã, eu ___ em casa.']],
            options: ['ficarei', 'ficaria', 'ficasse', 'fico'],
            answer: 'ficarei',
            explain: 'Realidad/futuro: futuro do presente (ficarei).',
          },
          {
            scene: 'Tipo 2: Probabilidad',
            lines: [['', 'Se você estudasse mais, ___ aprovado.']],
            options: ['passa', 'passasse', 'passaria', 'passarei'],
            answer: 'passaria',
            explain: 'Probabilidad: condicional (passaria).',
          },
          {
            scene: 'Tipo 3: Irrealidad',
            lines: [['', 'Se eu tivesse chegado a tempo, ___ a reunião.']],
            options: ['atendo', 'atenderia', 'teria atendido', 'atenderia'],
            answer: 'teria atendido',
            explain: 'Irrealidad/pasado: condicional compuesto (teria atendido).',
          },
          {
            scene: 'Realidad: orden flexible',
            lines: [['', 'Não ___ se não estudar.']],
            options: ['passo', 'passaria', 'passarei', 'passe'],
            answer: 'passarei',
            explain: 'Futuro en apódosis: passarei.',
          },
          {
            scene: 'Probabilidad: imperfecto indicativo',
            lines: [['', 'Se você ___ rico, viajaría muito.']],
            options: ['fosse', 'era', 'é', 'será'],
            answer: 'fosse',
            explain: 'Probabilidad: imperfecto indicativo (fosse).',
          },
          {
            scene: 'Tipo 3: Imperfecto subjuntivo',
            lines: [['', 'Se eles ___ vindo, teria sido melhor.']],
            options: ['tiveram', 'tivessem', 'tinham', 'virão'],
            answer: 'tivessem',
            explain: 'Irrealidad/pasado: imperfecto subjuntivo (tivessem).',
          },
          {
            scene: 'Condicional reflexivo',
            lines: [['', 'Se você me escutasse, ___ o quanto te amo.']],
            options: ['sabes', 'souberia', 'saberia', 'souberas'],
            answer: 'saberia',
            explain: 'Probabilidad: condicional (saberia).',
          },
          {
            scene: 'Realidad con imperativo',
            lines: [['', 'Se tiver tempo, ___ os livros.']],
            options: ['traz', 'trarei', 'traria', 'trouxe'],
            answer: 'traz',
            explain: 'Imperativo en apódosis de realidad: traz.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Empareja condición con consecuencia',
        tag: '2 decisiones',
        intro: 'Completa períodos hipotéticos con prótasis y apódosis.',
        type: 'dual',
        items: [
          {
            scene: 'Tipo 1 vs Tipo 2',
            lines: [['', "Se [[0]] (chover) amanhã, não vou. Se [[1]] (chover) agora, não iria."]],
            blanks: [
              { options: ['chove', 'chover', 'chovesse'], answer: 'chover', explain: 'Realidad futuro: chover.' },
              { options: ['chover', 'chovesse', 'chove'], answer: 'chovesse', explain: 'Probabilidad: chovesse.' },
            ],
          },
          {
            scene: 'Tipo 2 vs Tipo 3',
            lines: [['', "Se eu [[0]] (tivesse) tempo, viajaria. Se eu [[1]] (tivesse) ido, teria visto."]],
            blanks: [
              { options: ['tenho', 'tivesse', 'teria'], answer: 'tivesse', explain: 'Probabilidad presente-imaginario: tivesse.' },
              { options: ['tivesse', 'teria', 'tinha'], answer: 'tivesse', explain: 'Irrealidad pasado: tivesse.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Construcción de períodos completos',
        tag: 'Texto guiado',
        intro: 'Completa un texto con períodos hipotéticos.',
        type: 'guidedText',
        scene: 'Narrativa con múltiples hipótesis.',
        text: 'Se eu [[0]] (ser) fluente em português agora, [[1]] (poder) trabalhar no Brasil. Se eu [[2]] (tivesse) começado a estudar mais cedo, [[3]] (estar) no nível avançado. Se [[4]] (continuar) estudando, [[5]] (alcançar) meus objetivos em um ano.',
        blanks: [
          { options: ['fosse', 'sou', 'seria'], answer: 'fosse', explain: 'Probabilidad: fosse.' },
          { options: ['poderei', 'poderia', 'possa'], answer: 'poderia', explain: 'Apódosis de probabilidad: poderia.' },
          { options: ['tivesse', 'tinha', 'teria'], answer: 'tivesse', explain: 'Irrealidad: tivesse.' },
          { options: ['estaria', 'estarei', 'estou'], answer: 'estaria', explain: 'Apódosis de irrealidad: estaria.' },
          { options: ['continuar', 'continuo', 'continuarei'], answer: 'continuar', explain: 'Futuro realidad con infinitivo: continuar.' },
          { options: ['alcanço', 'alcançarei', 'alcançaria'], answer: 'alcançarei', explain: 'Futuro en apódosis: alcançarei.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escritura de supuestos',
        tag: 'Texto libre',
        intro: 'Escribe períodos hipotéticos sobre situaciones reales e imaginarias.',
        type: 'freeText',
        scene: 'Especulaciones sobre cambios de vida.',
        text: '1. Se eu [[0]] (tener) un millón de dólares, [[1]] (viajar). 2. Se yo [[2]] (hubiera llegado) a tiempo, [[3]] (poder) ayudarte. 3. Si [[4]] (llueve), [[5]] (no salir).',
        blanks: [
          { answer: 'tivesse', accepted: ['tivesse'], explain: 'Probabilidad: tivesse.' },
          { answer: 'viajaria', accepted: ['viajaria'], explain: 'Condicional: viajaria.' },
          { answer: 'tivesse chegado', accepted: ['tivesse chegado'], explain: 'Irrealidad/pasado: tivesse chegado.' },
          { answer: 'teria podido', accepted: ['teria podido', 'teria podido'], explain: 'Condicional compuesto: teria podido.' },
          { answer: 'chover', accepted: ['chover'], explain: 'Futuro/realidad: chover.' },
          { answer: 'não vou sair', accepted: ['não vou sair', 'não sairei'], explain: 'Apódosis realidad: não vou sair ou não sairei.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción de argumentos',
        tag: 'Producción',
        intro: 'Escribe un párrafo con múltiples períodos hipotéticos.',
        type: 'write',
        items: [
          {
            scene: 'Especulación personal',
            prompt: 'Escribe: si tuvieras otro trabajo, si tuvieras vivido en Brasil, y si llueve mañana. Usa los 3 tipos de períodos.',
            answer: 'Se eu tivesse outro trabalho, seria mais feliz. Se tivesse vivido no Brasil, falaria português perfeitamente. Se chover amanhã, não vou à praia.',
            accepted: ['tivesse', 'fosse', 'chover', 'condicional', 'futuro'],
            explain: 'Tres tipos: probabilidad, irrealidad, realidad.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de modos en períodos',
        tag: 'Análise',
        intro: 'Explica por qué se usa cada modo en un período hipotético.',
        type: 'write',
        items: [
          {
            scene: 'Justificación modal',
            prompt: '¿Por qué en "Se chovesse, não iria" usamos imperfecto indicativo "chovesse" y condicional "não iria", no subjuntivo?',
            answer: 'En portugués, el "se" de probabilidad usa imperfecto indicativo (no subjuntivo). El condicional expresa la consecuencia imaginaria. Es una particularidad del portugués, diferente del español.',
            accepted: ['indicativo', 'condicional', 'probabilidad', 'característico'],
            explain: 'Portguês usa indicativo para "se" de probabilidad; español usa subjuntivo. Diferencia importante.',
          },
        ],
      },
    ],
  },
}

export default topic
