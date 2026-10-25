import { createSupplementalTopic } from '../create-supplemental-topic'

export const inversionEmphasis = createSupplementalTopic({
  slug: 'inversion-emphasis-c1', order: '01', color: '#C8102E', category: 'Emphasis', level: 'C1',
  title: 'Inversion for emphasis en inglés C1', shortTitle: 'Inversion for emphasis', metaTitle: 'Inversion for emphasis C1: reglas, ejercicios y PDF',
  description: 'Invierte auxiliar y sujeto después de expresiones negativas o restrictivas para crear énfasis formal: Never have I seen, Only then did we understand.',
  lead: 'La inversión enfática cambia el orden porque una expresión negativa ocupa la primera posición; el auxiliar aparece antes del sujeto.',
  outcomes: ['Reconocer los activadores de inversión.', 'Elegir el auxiliar según tiempo y verbo.', 'Usar only, not until y no sooner con precisión.'],
  guide: { goal: 'Crear énfasis formal sin perder el control del tiempo verbal.', model: 'Rarely have we encountered such resistance.', formula: 'negative/restrictive opener + auxiliary + subject + main verb', decisions: ['Identifica el elemento adelantado.', 'Elige el auxiliar del tiempo original.', 'Invierte auxiliar y sujeto.', 'Mantén el verbo principal en la forma que exige el auxiliar.'], table: [['Inicio', 'Patrón', 'Ejemplo'], ['Never/Rarely', 'aux + subject', 'Never have I seen...'], ['Only then/after', 'aux + subject', 'Only then did we realise...'], ['Not until', 'aux + subject', 'Not until Friday did they reply.'], ['No sooner', 'had + subject + participle', 'No sooner had we left than...']], mistakes: ['Invertir cuando only modifica el sujeto.', 'Olvidar do/does/did en tiempos simples.', 'Usar than con hardly o when con no sooner.'] },
  seo: [
    { heading: 'La inversión nace del inicio de la oración', paragraphs: ['Never, rarely, seldom, hardly, little y expresiones con only activan inversión cuando se colocan al principio y tienen alcance negativo o restrictivo.', 'La versión neutra sigue siendo correcta; la invertida añade énfasis y registro formal.'] },
    { heading: 'Only y not until', paragraphs: ['Only after the audit did we understand the scale adelanta la condición temporal y obliga a invertir la cláusula principal. Not until the data arrived could we decide funciona de la misma manera.'], table: [['Neutra', 'Enfática'], ['We understood only after the audit.', 'Only after the audit did we understand.'], ['We could decide only when the data arrived.', 'Only when the data arrived could we decide.']] },
    { heading: 'Pares correlativos', paragraphs: ['No sooner...than y hardly/scarcely...when describen dos acciones muy próximas. La primera suele usar past perfect invertido.'] },
  ],
  visual: { mode: 'word-order', teacherLens: 'El activador ocupa el primer lugar y empuja el auxiliar delante del sujeto.', graphicPrompt: 'Activador → auxiliar → sujeto → verbo principal.', scene: [['Never', 'have I seen'], ['Only then', 'did we understand'], ['Not until Friday', 'could they decide'], ['No sooner', 'had we left than...']], learnerModes: ['visual: orden', 'analítico: auxiliar', 'retórico: énfasis'], practiceVerbs: ['Detecta', 'Invierte', 'Contrasta', 'Completa', 'Corrige', 'Redacta'], reviewFocus: ['activador', 'auxiliar', 'sujeto', 'registro'] },
  practice: {
    choice: [
      { scene: 'Experiencia', prompt: 'Never ___ such a convincing argument.', options: ['have I heard', 'I have heard', 'did I heard', 'heard I'], answer: 'have I heard', explain: 'Present perfect invertido.' },
      { scene: 'Comprensión', prompt: 'Only then ___ the consequences.', options: ['did we understand', 'we understood', 'had we understand', 'we did understood'], answer: 'did we understand', explain: 'Past simple requiere did + base.' },
      { scene: 'Respuesta', prompt: 'Not until Monday ___ to our request.', options: ['did they reply', 'they replied', 'had they replied', 'they did replied'], answer: 'did they reply', explain: 'Not until al inicio activa inversión.' },
      { scene: 'Salida', prompt: 'No sooner ___ the building than the alarm rang.', options: ['had we left', 'we had left', 'did we left', 'have we left'], answer: 'had we left', explain: 'No sooner + past perfect + than.' },
      { scene: 'Conocimiento', prompt: 'Little ___ how much the decision would cost.', options: ['did he know', 'he knew', 'had he knew', 'he did knew'], answer: 'did he know', explain: 'Little con sentido negativo activa inversión.' },
      { scene: 'Condición', prompt: 'Only by working together ___ the deadline.', options: ['can we meet', 'we can meet', 'do we can meet', 'we meet can'], answer: 'can we meet', explain: 'El modal se invierte directamente.' },
    ],
    dual: [
      { scene: 'Crisis', prompt: 'Rarely [[0]] such pressure, and never [[1]] so quickly.', blanks: [{ options: ['have we faced', 'we have faced', 'did we faced'], answer: 'have we faced', explain: 'Rarely + present perfect invertido.' }, { options: ['have we responded', 'we responded', 'did we responded'], answer: 'have we responded', explain: 'Never + auxiliar + sujeto.' }] },
      { scene: 'Investigación', prompt: 'Only after the second test [[0]] the flaw. Not until then [[1]] the model be corrected.', blanks: [{ options: ['did they find', 'they found', 'had they find'], answer: 'did they find', explain: 'Past simple invertido.' }, { options: ['could', 'it could', 'did'], answer: 'could', explain: 'Modal antes del sujeto.' }] },
      { scene: 'Presentación', prompt: 'Hardly [[0]] speaking when the screen failed, and only later [[1]] the cause.', blanks: [{ options: ['had she begun', 'she had begun', 'did she began'], answer: 'had she begun', explain: 'Hardly + past perfect + when.' }, { options: ['did we discover', 'we discovered', 'had we discover'], answer: 'did we discover', explain: 'Only later + inversión.' }] },
    ],
    guided: { scene: 'Una negociación difícil', text: 'Rarely [[0]] a meeting begun so badly. Not only [[1]] the sides disagree on price, but they also rejected the timetable. Only after a private discussion [[2]] they identify common ground. No sooner [[3]] they reached a tentative deal than a new problem emerged. Only then [[4]] everyone how fragile the agreement was.', blanks: [{ options: ['had', 'did', 'has'], answer: 'had', explain: 'Past perfect invertido.' }, { options: ['did', 'had', 'were'], answer: 'did', explain: 'Not only + past simple.' }, { options: ['did', 'had', 'were'], answer: 'did', explain: 'Only after + did.' }, { options: ['had', 'did', 'have'], answer: 'had', explain: 'No sooner + past perfect.' }, { options: ['did', 'had', 'was'], answer: 'did', explain: 'Only then + did.' }] },
    free: { scene: 'Reordena con énfasis', text: 'I had never seen the sea so calm. → Never [[0]]. We understood the issue only after the call. → Only after the call [[1]]. They did not announce the result until noon. → Not until noon [[2]]. We had barely sat down when the lights went out. → Barely [[3]]. You can solve it only with accurate data. → Only with accurate data [[4]].', blanks: [{ answer: 'had I seen the sea so calm', explain: 'Past perfect invertido.' }, { answer: 'did we understand the issue', explain: 'Did + base.' }, { answer: 'did they announce the result', explain: 'Not until + inversión.' }, { answer: 'had we sat down when the lights went out', explain: 'Barely + past perfect + when.' }, { answer: 'can you solve it', explain: 'Modal invertido.' }] },
    write: [
      { scene: 'Never', prompt: 'Reescribe con Never: I have never encountered this problem.', answer: 'Never have I encountered this problem.', accepted: ['never have i encountered'], explain: 'Auxiliar antes del sujeto.' },
      { scene: 'Only after', prompt: 'Reescribe: We realised the risk only after launch.', answer: 'Only after launch did we realise the risk.', accepted: ['only after launch did we realise'], explain: 'Did + base.' },
      { scene: 'No sooner', prompt: 'Une: We signed. The client requested changes immediately.', answer: 'No sooner had we signed than the client requested changes.', accepted: ['no sooner had we signed than'], explain: 'Par correlativo.' },
      { scene: 'Corrección', prompt: 'Corrige: Rarely we see such precision.', answer: 'Rarely do we see such precision.', accepted: ['rarely do we see'], explain: 'Present simple necesita do.' },
    ],
    mission: [
      { scene: 'Discurso', prompt: 'Escribe una apertura enfática con dos inversiones distintas.', answer: 'Never have we faced a greater challenge. Only by acting now can we solve it.', accepted: ['never have', 'only by'], explain: 'Énfasis controlado.' },
      { scene: 'Relato', prompt: 'Narra dos acciones inmediatas con hardly o no sooner.', answer: 'Hardly had I closed the door when the phone rang.', accepted: ['hardly had', 'when'], explain: 'Secuencia inmediata.' },
      { scene: 'Edición', prompt: 'Convierte una frase neutra en enfática y explica el efecto.', answer: 'Only then did I understand the warning; the inversion highlights the delayed realisation.', accepted: ['only then did'], explain: 'Forma y propósito.' },
    ],
  },
})

export const cleftSentences = createSupplementalTopic({
  slug: 'cleft-sentences-c1', order: '02', color: '#7C3AED', category: 'Information structure', level: 'C1',
  title: 'Cleft sentences en inglés C1', shortTitle: 'Cleft sentences', metaTitle: 'Cleft sentences C1: it-clefts, what-clefts y ejercicios',
  description: 'Divide una idea en dos cláusulas para controlar el foco: It was Maya who found the error; What we need is more time.',
  lead: 'Las cleft sentences no añaden información nueva: reorganizan la oración para indicar exactamente qué dato debe recibir el énfasis.',
  outcomes: ['Construir it-clefts y what-clefts.', 'Mover el foco entre persona, objeto, tiempo y lugar.', 'Evitar concordancia y referencias ambiguas.'],
  guide: { goal: 'Controlar qué información presenta el hablante como contraste o foco.', model: 'Maya found the error. → It was Maya who found the error.', formula: 'it + be + focus + relative clause | what-clause + be + focus', decisions: ['Elige el elemento que quieres enfatizar.', 'Usa it-cleft para contraste específico.', 'Usa what-cleft para destacar una acción o necesidad.', 'Comprueba la concordancia con el foco.'], table: [['Tipo', 'Estructura', 'Ejemplo'], ['it-cleft', 'It + be + foco + relative', 'It was Ana who called.'], ['what-cleft', 'What + clause + be + foco', 'What I need is a break.'], ['all-cleft', 'All + clause + be + foco', 'All we need is time.']], mistakes: ['Repetir un pronombre dentro de la relativa.', 'Usar what cuando el foco ya es una persona específica.', 'Forzar una cleft cuando no existe contraste real.'] },
  seo: [
    { heading: 'It-clefts para corregir o contrastar', paragraphs: ['It was Thursday that we met puede corregir la idea de que fue otro día. El foco aparece entre be y la cláusula relativa.'] },
    { heading: 'What-clefts para presentar necesidades y resultados', paragraphs: ['What the team needs is clearer guidance prepara al lector para la información nueva después de be. Esta forma es común en explicaciones, reuniones y ensayos.'], table: [['Neutra', 'Cleft'], ['We need a decision.', 'What we need is a decision.'], ['Ana solved the issue.', 'It was Ana who solved the issue.']] },
    { heading: 'Foco y naturalidad', paragraphs: ['Una cleft funciona cuando responde a una pregunta implícita: quién, qué, cuándo, dónde o cuál es la necesidad. Sin ese contraste puede sonar pesada.'] },
  ],
  visual: { mode: 'focus-frame', teacherLens: 'Un marco desplaza el foco a persona, tiempo, lugar o resultado sin cambiar el hecho básico.', graphicPrompt: 'Oración neutra → marco de foco → información destacada.', scene: [['Maya found the error.', 'It was Maya who...'], ['We need clarity.', 'What we need is...'], ['We met on Friday.', 'It was on Friday that...']], learnerModes: ['visual: foco', 'retórico: contraste', 'escritura: cohesión'], practiceVerbs: ['Enfoca', 'Transforma', 'Contrasta', 'Completa', 'Corrige', 'Reformula'], reviewFocus: ['it-cleft', 'what-cleft', 'foco', 'concordancia'] },
  practice: {
    choice: [
      { scene: 'Responsable', prompt: '___ Daniel who approved the final version.', options: ['It was', 'What was', 'There was', 'That was what'], answer: 'It was', explain: 'It-cleft para una persona.' },
      { scene: 'Necesidad', prompt: '___ more reliable evidence.', options: ['What we need is', 'It we need that', 'What do we need is', 'It is need'], answer: 'What we need is', explain: 'What-cleft para destacar la necesidad.' },
      { scene: 'Fecha', prompt: 'It was in May ___ the policy changed.', options: ['that', 'what', 'where it', 'which it'], answer: 'that', explain: 'Cláusula relativa de una it-cleft.' },
      { scene: 'Objetivo', prompt: 'All I wanted ___ a clear answer.', options: ['was', 'were', 'it was', 'that'], answer: 'was', explain: 'All-cleft con foco singular.' },
      { scene: 'Acción', prompt: 'What surprised me most ___ her calm response.', options: ['was', 'were', 'did', 'it'], answer: 'was', explain: 'La what-clause funciona como sujeto.' },
      { scene: 'Lugar', prompt: 'It was at the station ___ we first met.', options: ['that', 'what', 'which it', 'where did'], answer: 'that', explain: 'It-cleft de lugar.' },
    ],
    dual: [
      { scene: 'Proyecto', prompt: 'It [[0]] the budget that caused the delay; what we lacked [[1]] enough staff.', blanks: [{ options: ['was', 'were', 'did'], answer: 'was', explain: 'Foco singular.' }, { options: ['was', 'were', 'it was'], answer: 'was', explain: 'What-clause + be.' }] },
      { scene: 'Corrección', prompt: 'It [[0]] not the manager but her assistant who called. What they wanted [[1]] an immediate reply.', blanks: [{ options: ['was', 'were', 'did'], answer: 'was', explain: 'It-cleft.' }, { options: ['was', 'were', 'that'], answer: 'was', explain: 'Foco singular.' }] },
      { scene: 'Tiempo', prompt: 'It [[0]] only after midnight that the server recovered. All we could do [[1]] wait.', blanks: [{ options: ['was', 'were', 'had'], answer: 'was', explain: 'Foco temporal.' }, { options: ['was', 'were', 'did'], answer: 'was', explain: 'All-cleft.' }] },
    ],
    guided: { scene: 'Revisión de un proyecto', text: 'It [[0]] the final test that revealed the fault. What the engineers had overlooked [[1]] a minor connection. It [[2]] Priya who noticed the pattern, but what solved the problem [[3]] a complete restart. All the client wanted [[4]] a reliable explanation.', blanks: [{ options: ['was', 'were', 'did'], answer: 'was', explain: 'It-cleft.' }, { options: ['was', 'were', 'it'], answer: 'was', explain: 'Foco singular.' }, { options: ['was', 'were', 'did'], answer: 'was', explain: 'Persona singular.' }, { options: ['was', 'were', 'did'], answer: 'was', explain: 'Resultado singular.' }, { options: ['was', 'were', 'that'], answer: 'was', explain: 'All-cleft.' }] },
    free: { scene: 'Cambia el foco', text: 'Lena found the key. (Lena) → [[0]]. We need a practical solution. → [[1]]. The error occurred during upload. (during upload) → [[2]]. I only asked for honesty. → [[3]]. The lack of data worried us. → [[4]].', blanks: [{ answer: 'It was Lena who found the key', explain: 'Foco en persona.' }, { answer: 'What we need is a practical solution', explain: 'Foco en necesidad.' }, { answer: 'It was during upload that the error occurred', explain: 'Foco temporal.' }, { answer: 'All I asked for was honesty', accepted: ['What I asked for was honesty'], explain: 'Foco en resultado.' }, { answer: 'What worried us was the lack of data', explain: 'Foco en causa.' }] },
    write: [
      { scene: 'Persona', prompt: 'Enfatiza a Sam: Sam changed the schedule.', answer: 'It was Sam who changed the schedule.', accepted: ['it was sam who'], explain: 'It-cleft.' },
      { scene: 'Necesidad', prompt: 'Enfatiza la necesidad: We need more time.', answer: 'What we need is more time.', accepted: ['what we need is'], explain: 'What-cleft.' },
      { scene: 'Lugar', prompt: 'Enfatiza el lugar: We met in Bogotá.', answer: 'It was in Bogotá that we met.', accepted: ['it was in bogotá that', 'it was in bogota that'], explain: 'Foco de lugar.' },
      { scene: 'Corrección', prompt: 'Corrige: It was Ana who she sent the file.', answer: 'It was Ana who sent the file.', accepted: ['ana who sent'], explain: 'No se repite el pronombre.' },
    ],
    mission: [
      { scene: 'Presentación', prompt: 'Abre una recomendación con una what-cleft.', answer: 'What we recommend is a gradual rollout.', accepted: ['what we recommend is'], explain: 'Foco en recomendación.' },
      { scene: 'Contraste', prompt: 'Corrige una suposición con una it-cleft negativa.', answer: 'It was not the price that changed; it was the delivery date.', accepted: ['it was not', 'it was'], explain: 'Contraste explícito.' },
      { scene: 'Párrafo', prompt: 'Usa dos tipos de cleft sin repetir el mismo foco.', answer: 'What the team needs is direction. It was the new manager who finally provided it.', accepted: ['what', 'it was'], explain: 'Cohesión y variedad.' },
    ],
  },
})

export const hedgingStance = createSupplementalTopic({
  slug: 'hedging-stance-c1', order: '03', color: '#0369A1', category: 'Academic grammar', level: 'C1',
  title: 'Hedging and stance en inglés C1', shortTitle: 'Hedging and stance', metaTitle: 'Hedging and stance C1: lenguaje académico y ejercicios',
  description: 'Ajusta la fuerza de una afirmación con modales, adverbios, reporting verbs y estructuras impersonales sin volverla vaga.',
  lead: 'Hedging no significa dudar de todo: significa calibrar una afirmación para que la evidencia y el grado de certeza coincidan.',
  outcomes: ['Distinguir afirmación, probabilidad y cautela.', 'Elegir recursos de hedging según la evidencia.', 'Evitar tanto la sobreafirmación como la vaguedad.'],
  guide: { goal: 'Calibrar el grado de certeza y mostrar una postura responsable.', model: 'The findings appear to suggest a modest improvement.', formula: 'modal/adverb/reporting verb + calibrated claim', decisions: ['Evalúa la calidad de la evidencia.', 'Decide cuánto compromiso asumes.', 'Elige un recurso de hedging, no una cadena innecesaria.', 'Conserva una afirmación concreta y verificable.'], table: [['Fuerza', 'Recursos', 'Ejemplo'], ['alta', 'clearly, demonstrates', 'The data clearly demonstrate...'], ['media', 'likely, appears to', 'The change is likely to...'], ['cauta', 'may, tends to, suggests', 'The evidence may suggest...']], mistakes: ['Acumular may possibly perhaps.', 'Usar proves cuando la evidencia solo sugiere.', 'Volver la frase tan cauta que deja de afirmar algo.'] },
  seo: [
    { heading: 'La certeza debe seguir a la evidencia', paragraphs: ['Un estudio pequeño may suggest; varias mediciones coherentes strongly indicate. El verbo y el modal comunican tanto el resultado como la confianza que merece.'] },
    { heading: 'Cuatro familias de recursos', paragraphs: ['Los modales may y might, los adverbios probably y apparently, los verbos appear y seem, y los reporting verbs suggest e indicate permiten modular la postura.'], table: [['Recurso', 'Ejemplo'], ['modal', 'This may affect demand.'], ['adverbio', 'This is probably temporary.'], ['verbo', 'The pattern appears to persist.'], ['reporte', 'The results suggest that...']] },
    { heading: 'Precisión antes que timidez', paragraphs: ['Una buena frase cauta sigue diciendo quién observó qué, bajo qué condiciones y con qué limitación. Hedging responsable aumenta la precisión.'] },
  ],
  visual: { mode: 'certainty-meter', teacherLens: 'Una escala conecta la fuerza de la evidencia con la fuerza exacta de la afirmación.', graphicPrompt: 'Evidencia débil, media y fuerte → postura calibrada.', scene: [['may suggest', 'evidencia limitada'], ['is likely to', 'probabilidad razonable'], ['strongly indicates', 'evidencia consistente']], learnerModes: ['visual: escala', 'académico: evidencia', 'retórico: postura'], practiceVerbs: ['Calibra', 'Matiza', 'Compara', 'Reescribe', 'Justifica', 'Edita'], reviewFocus: ['certeza', 'evidencia', 'modal', 'reporting verb'] },
  practice: {
    choice: [
      { scene: 'Estudio piloto', prompt: 'A small pilot study ___ that the method may help.', options: ['suggests', 'proves', 'guarantees', 'confirms beyond doubt'], answer: 'suggests', explain: 'Un piloto apoya una conclusión cauta.' },
      { scene: 'Pronóstico', prompt: 'Demand is ___ to remain stable next quarter.', options: ['likely', 'proved', 'certainly maybe', 'tending that'], answer: 'likely', explain: 'Be likely to expresa probabilidad.' },
      { scene: 'Patrón', prompt: 'The pattern ___ to be temporary.', options: ['appears', 'proves', 'must certainly', 'is seeming that'], answer: 'appears', explain: 'Appear to calibra la afirmación.' },
      { scene: 'Limitación', prompt: 'These results ___ not apply to every age group.', options: ['may', 'prove', 'are certain', 'demonstrate to'], answer: 'may', explain: 'Posibilidad limitada.' },
      { scene: 'Tendencia', prompt: 'Remote workers ___ report higher autonomy.', options: ['tend to', 'must always', 'prove to', 'are guaranteed to'], answer: 'tend to', explain: 'Generalización moderada.' },
      { scene: 'Evidencia sólida', prompt: 'Multiple trials ___ indicate a consistent effect.', options: ['strongly', 'possibly perhaps', 'weakly may', 'seem maybe to'], answer: 'strongly', explain: 'La evidencia amplia permite mayor fuerza.' },
    ],
    dual: [
      { scene: 'Informe', prompt: 'The decline [[0]] to be slowing, but it [[1]] continue for another month.', blanks: [{ options: ['appears', 'proves', 'guarantees'], answer: 'appears', explain: 'Observación cauta.' }, { options: ['may', 'proves', 'certainly maybe'], answer: 'may', explain: 'Posibilidad futura.' }] },
      { scene: 'Encuesta', prompt: 'The responses [[0]] that users value speed; however, the sample [[1]] be representative.', blanks: [{ options: ['suggest', 'prove', 'guarantee'], answer: 'suggest', explain: 'Inferencia moderada.' }, { options: ['may not', 'must not always', 'proves not'], answer: 'may not', explain: 'Limitación.' }] },
      { scene: 'Revisión', prompt: 'The evidence [[0]] supports the first claim, while the second [[1]] less certain.', blanks: [{ options: ['strongly', 'perhaps may', 'tends to maybe'], answer: 'strongly', explain: 'Apoyo sólido.' }, { options: ['appears', 'proves', 'demonstrates'], answer: 'appears', explain: 'Cautela en la segunda.' }] },
    ],
    guided: { scene: 'Resumen de investigación', text: 'The initial findings [[0]] that shorter meetings improve focus. The effect [[1]] to be stronger in small teams, although it [[2]] depend on task type. Participants [[3]] to report less fatigue. Because the sample was limited, the results [[4]] be interpreted cautiously.', blanks: [{ options: ['suggest', 'prove', 'guarantee'], answer: 'suggest', explain: 'Hallazgo inicial.' }, { options: ['appears', 'proves', 'is certain'], answer: 'appears', explain: 'Patrón observado.' }, { options: ['may', 'proves', 'will certainly'], answer: 'may', explain: 'Dependencia posible.' }, { options: ['tended', 'guaranteed', 'proved'], answer: 'tended', explain: 'Tendencia de reporte.' }, { options: ['should', 'prove to', 'guarantee'], answer: 'should', explain: 'Recomendación de cautela.' }] },
    free: { scene: 'Reduce la sobreafirmación', text: 'This study proves the policy works. → This study [[0]] the policy may work. All users prefer the new design. → Users [[1]] prefer the new design. The change will increase sales. → The change [[2]] increase sales. The explanation is correct. → The explanation [[3]] correct. The effect applies everywhere. → The effect [[4]] apply in every context.', blanks: [{ answer: 'suggests that', explain: 'Reduce de prueba a indicio.' }, { answer: 'tend to', accepted: ['appear to'], explain: 'Generalización moderada.' }, { answer: 'is likely to', accepted: ['may'], explain: 'Probabilidad.' }, { answer: 'appears to be', accepted: ['seems to be'], explain: 'Postura cauta.' }, { answer: 'may not', accepted: ['might not'], explain: 'Limitación.' }] },
    write: [
      { scene: 'Edición', prompt: 'Matiza: The intervention solves the problem.', answer: 'The intervention appears to reduce the problem.', accepted: ['appears to', 'may', 'seems to'], explain: 'Ajusta fuerza y verbo.' },
      { scene: 'Probabilidad', prompt: 'Expresa que probablemente los precios se mantendrán estables.', answer: 'Prices are likely to remain stable.', accepted: ['likely to remain'], explain: 'Be likely to.' },
      { scene: 'Limitación', prompt: 'Di que los resultados quizá no se generalicen.', answer: 'The results may not be generalisable.', accepted: ['may not', 'might not'], explain: 'Cautela explícita.' },
      { scene: 'Corrección', prompt: 'Corrige la acumulación: This may possibly perhaps affect demand.', answer: 'This may affect demand.', accepted: ['may affect'], explain: 'Un recurso basta.' },
    ],
    mission: [
      { scene: 'Resumen', prompt: 'Escribe una conclusión con evidencia, postura y limitación.', answer: 'The data suggest a modest improvement, although the small sample may limit generalisation.', accepted: ['suggest', 'may'], explain: 'Postura equilibrada.' },
      { scene: 'Comparación', prompt: 'Formula una afirmación fuerte y otra cauta sobre el mismo dato.', answer: 'The data clearly show a decline in May; they may also suggest a longer-term trend.', accepted: ['clearly', 'may'], explain: 'Diferencia observación e inferencia.' },
      { scene: 'Auditoría', prompt: 'Revisa una afirmación absoluta y explica por qué la matizas.', answer: 'Users tend to prefer the new design; tend to is appropriate because the survey was not universal.', accepted: ['tend to'], explain: 'Decisión justificada.' },
    ],
  },
})

export const nominalisation = createSupplementalTopic({
  slug: 'nominalisation-c1', order: '04', color: '#047857', category: 'Formal style', level: 'C1',
  title: 'Nominalisation en inglés C1', shortTitle: 'Nominalisation', metaTitle: 'Nominalisation C1: estilo académico, ejercicios y PDF',
  description: 'Convierte procesos y cualidades en grupos nominales para condensar información y variar el foco en textos formales.',
  lead: 'Nominalizar puede dar cohesión y densidad al texto, pero usar demasiados sustantivos abstractos oculta quién hace qué.',
  outcomes: ['Transformar verbos y adjetivos en sustantivos.', 'Elegir cuándo nominalizar y cuándo conservar un verbo.', 'Controlar preposiciones y agentes en estilo formal.'],
  guide: { goal: 'Condensar procesos en grupos nominales sin sacrificar claridad.', model: 'The committee rejected the proposal. → The committee’s rejection of the proposal...', formula: 'verb/adjective → noun phrase + of/by', decisions: ['Identifica el proceso central.', 'Forma el sustantivo correcto.', 'Añade of para el objeto y by para el agente si hacen falta.', 'Comprueba que la frase siga indicando responsabilidad.'], table: [['Base', 'Nombre', 'Ejemplo'], ['decide', 'decision', 'the decision to postpone'], ['analyse', 'analysis', 'an analysis of the data'], ['available', 'availability', 'the availability of funds'], ['fail', 'failure', 'the failure to respond']], mistakes: ['Inventar una terminación no existente.', 'Apilar varios sustantivos sin preposiciones.', 'Eliminar al agente cuando es importante para la rendición de cuentas.'] },
  seo: [
    { heading: 'Qué cambia con la nominalización', paragraphs: ['La acción deja de ser el verbo principal y pasa a ocupar un grupo nominal. Esto permite conectarla con another factor, led to o resulted in y construir cadenas de razonamiento.'] },
    { heading: 'Objeto, agente y complemento', paragraphs: ['The analysis of the data by the team conserva tanto el objeto como el agente. No todos deben aparecer, pero la omisión debe ser deliberada.'], table: [['Elemento', 'Marcador'], ['objeto analizado', 'of'], ['agente', 'by'], ['acción posterior', 'to-infinitive']] },
    { heading: 'Claridad antes que densidad', paragraphs: ['The implementation of the improvement of the system resulta pesada. A veces es mejor escribir We improved and implemented the system. El registro formal no exige convertir cada verbo en sustantivo.'] },
  ],
  visual: { mode: 'transformation', teacherLens: 'La acción verbal se empaqueta como sustantivo y reorganiza objeto, agente y consecuencia.', graphicPrompt: 'Verbo claro → grupo nominal → conexión formal.', scene: [['decide', 'decision'], ['analyse', 'analysis'], ['fail', 'failure'], ['available', 'availability']], learnerModes: ['visual: transformación', 'morfología: familias', 'escritura: densidad'], practiceVerbs: ['Transforma', 'Desempaqueta', 'Conecta', 'Completa', 'Edita', 'Aclara'], reviewFocus: ['sustantivo', 'of', 'by', 'claridad'] },
  practice: {
    choice: [
      { scene: 'Decisión', prompt: 'The committee’s ___ to postpone surprised everyone.', options: ['decision', 'deciding', 'decisiveness to', 'decide'], answer: 'decision', explain: 'Nombre de decide.' },
      { scene: 'Análisis', prompt: 'A detailed ___ of the results was published.', options: ['analysis', 'analyse', 'analysation', 'analysing of'], answer: 'analysis', explain: 'Nombre irregular de analyse.' },
      { scene: 'Disponibilidad', prompt: 'The ___ of funding remains uncertain.', options: ['availability', 'available', 'availableness', 'avail'], answer: 'availability', explain: 'Nombre de available.' },
      { scene: 'Fracaso', prompt: 'Their ___ to report the error caused delays.', options: ['failure', 'failing of', 'fail', 'failed'], answer: 'failure', explain: 'Failure + to-infinitive.' },
      { scene: 'Implementación', prompt: 'The ___ of the policy took six months.', options: ['implementation', 'implement', 'implementingness', 'implemented'], answer: 'implementation', explain: 'Sustantivo formal correcto.' },
      { scene: 'Responsabilidad', prompt: 'The investigation ___ the regulator began yesterday.', options: ['by', 'of', 'to', 'for doing'], answer: 'by', explain: 'By introduce al agente.' },
    ],
    dual: [
      { scene: 'Informe', prompt: 'The [[0]] of the data by the team led to the [[1]] of a new pattern.', blanks: [{ options: ['analysis', 'analyse', 'analysingness'], answer: 'analysis', explain: 'Proceso nominalizado.' }, { options: ['identification', 'identify', 'identity'], answer: 'identification', explain: 'Resultado nominal.' }] },
      { scene: 'Proyecto', prompt: 'The [[0]] to extend the deadline followed the client’s [[1]] of the first proposal.', blanks: [{ options: ['decision', 'decide', 'deciding of'], answer: 'decision', explain: 'Decision + to.' }, { options: ['rejection', 'reject', 'rejectingness'], answer: 'rejection', explain: 'Rejection of.' }] },
      { scene: 'Mercado', prompt: 'A rapid [[0]] in demand forced the [[1]] of production.', blanks: [{ options: ['increase', 'increasingly', 'increased'], answer: 'increase', explain: 'Increase funciona como nombre.' }, { options: ['expansion', 'expand', 'expansive'], answer: 'expansion', explain: 'Nombre de expand.' }] },
    ],
    guided: { scene: 'Resumen ejecutivo', text: 'The board’s [[0]] to enter the market followed a careful [[1]] of demand. The [[2]] of local partners reduced risk, while the [[3]] of a clear timetable created uncertainty. Final [[4]] of the plan is expected in June.', blanks: [{ options: ['decision', 'decide', 'decidingness'], answer: 'decision', explain: 'Decisión.' }, { options: ['analysis', 'analyse', 'analytical'], answer: 'analysis', explain: 'Análisis.' }, { options: ['availability', 'available', 'avail'], answer: 'availability', explain: 'Disponibilidad.' }, { options: ['absence', 'absent', 'absentee'], answer: 'absence', explain: 'Ausencia.' }, { options: ['approval', 'approve', 'approving'], answer: 'approval', explain: 'Aprobación.' }] },
    free: { scene: 'Nominaliza', text: 'The team decided to delay. → The team’s [[0]]. The regulator investigated the incident. → The [[1]] by the regulator. Funds were not available. → The [[2]]. The supplier failed to deliver. → The supplier’s [[3]]. Users responded positively. → The positive [[4]].', blanks: [{ answer: 'decision to delay', explain: 'Decision + to.' }, { answer: 'investigation of the incident', explain: 'Objeto con of.' }, { answer: 'lack of availability of funds', accepted: ['unavailability of funds'], explain: 'Cualidad nominalizada.' }, { answer: 'failure to deliver', explain: 'Failure + to.' }, { answer: 'response from users', accepted: ['user response'], explain: 'Response.' }] },
    write: [
      { scene: 'Transformación', prompt: 'Nominaliza: The company expanded rapidly.', answer: 'The company’s rapid expansion...', accepted: ['rapid expansion'], explain: 'Adjetivo + nombre.' },
      { scene: 'Agente', prompt: 'Nominaliza sin ocultar al agente: The agency approved the plan.', answer: 'The approval of the plan by the agency...', accepted: ['approval of the plan by the agency'], explain: 'Of + objeto; by + agente.' },
      { scene: 'Desempaquetar', prompt: 'Haz más clara: The implementation of the revision of the procedure occurred.', answer: 'The team revised and implemented the procedure.', accepted: ['revised', 'implemented'], explain: 'Recupera verbos y agente.' },
      { scene: 'Corrección', prompt: 'Corrige: the analyse of the data.', answer: 'the analysis of the data', accepted: ['analysis of the data'], explain: 'Analysis es el sustantivo.' },
    ],
    mission: [
      { scene: 'Resumen', prompt: 'Escribe dos frases: una nominalizada y otra verbal para comparar claridad.', answer: 'The rapid expansion of the service created pressure. The service expanded rapidly, so demand increased.', accepted: ['expansion', 'expanded'], explain: 'Control de estilo.' },
      { scene: 'Responsabilidad', prompt: 'Redacta una frase formal que conserve al agente.', answer: 'The cancellation of the contract by the supplier caused significant losses.', accepted: ['by the supplier'], explain: 'Responsabilidad visible.' },
      { scene: 'Edición', prompt: 'Detecta una cadena nominal pesada y reescríbela con verbos.', answer: 'Instead of the completion of the evaluation of the system, write: We evaluated the system and completed the review.', accepted: ['evaluated', 'completed'], explain: 'Claridad antes que densidad.' },
    ],
  },
})
