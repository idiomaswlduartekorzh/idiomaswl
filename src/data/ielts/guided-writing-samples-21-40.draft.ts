import type { IeltsGuidedWritingReference } from './guided-mock.ts';
import type { MockExam } from '../mocks/types.ts';
import set21 from '../mocks/ielts-set-21.ts';
import set22 from '../mocks/ielts-set-22.ts';
import set23 from '../mocks/ielts-set-23.ts';
import set24 from '../mocks/ielts-set-24.ts';
import set25 from '../mocks/ielts-set-25.ts';
import set26 from '../mocks/ielts-set-26.ts';
import set27 from '../mocks/ielts-set-27.ts';
import set28 from '../mocks/ielts-set-28.ts';
import set29 from '../mocks/ielts-set-29.ts';
import set30 from '../mocks/ielts-set-30.ts';
import set31 from '../mocks/ielts-set-31.ts';
import set32 from '../mocks/ielts-set-32.ts';
import set33 from '../mocks/ielts-set-33.ts';
import set34 from '../mocks/ielts-set-34.ts';
import set35 from '../mocks/ielts-set-35.ts';
import set36 from '../mocks/ielts-set-36.ts';
import set37 from '../mocks/ielts-set-37.ts';
import set38 from '../mocks/ielts-set-38.ts';
import set39 from '../mocks/ielts-set-39.ts';
import set40 from '../mocks/ielts-set-40.ts';

type Band = '5.5' | '9.0';
type Criterion = readonly [string, string];
type DraftSample = {
  answer: string;
  verdict: string;
  criteria: readonly [Criterion, Criterion, Criterion, Criterion];
};

const MOCKS: Record<number, MockExam> = {
  21: set21, 22: set22, 23: set23, 24: set24, 25: set25,
  26: set26, 27: set27, 28: set28, 29: set29, 30: set30,
  31: set31, 32: set32, 33: set33, 34: set34, 35: set35,
  36: set36, 37: set37, 38: set38, 39: set39, 40: set40,
};

const NOTICE: Record<Band, readonly string[]> = {
  '5.5': [
    'postura visible y respuesta suficiente, aunque algunas ideas quedan generales',
    'organización comprensible con enlaces a veces mecánicos',
    'mezcla de estructuras seguras con errores naturales que no bloquean el mensaje',
  ],
  '9.0': [
    'respuesta completa, matizada y totalmente vinculada a la pregunta',
    'argumentos desarrollados con precisión y ejemplos funcionales',
    'control lingüístico amplio, flexible y natural',
  ],
};

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function task2Prompt(mock: MockExam) {
  const task = mock.sections
    .flatMap(section => section.questions)
    .find(question => question.type === 'write' && question.taskNumber === 2);
  if (!task || task.type !== 'write') throw new Error(`Missing canonical Writing Task 2 for ${mock.id}`);
  const stimulus = task.stimulus.trim();
  const text = task.text.trim();
  return stimulus === text ? stimulus : `${stimulus}\n\n${text}`.trim();
}

function sample(band: Band, draft: DraftSample): IeltsGuidedWritingReference['samples'][Band] {
  return {
    label: `Referencia pedagógica aproximada · Banda ${band === '9.0' ? '9' : '5.5'}`,
    transcript: draft.answer,
    answer: draft.answer,
    wordCount: wordCount(draft.answer),
    verdict: draft.verdict,
    criteria: draft.criteria,
    notice: NOTICE[band],
  };
}

function reference(setNumber: number, lower: DraftSample, advanced: DraftSample): IeltsGuidedWritingReference {
  return {
    prompt: task2Prompt(MOCKS[setNumber]),
    samples: { '5.5': sample('5.5', lower), '9.0': sample('9.0', advanced) },
  };
}

/**
 * Author-only pedagogical drafts for Sets 21–40.
 *
 * These references are deliberately not connected to the runtime. They remain
 * DRAFTED/SELF_CHECKED and require fresh independent editorial review before
 * any release or approval decision.
 */
export const IELTS_GUIDED_WRITING_DRAFTS_21_40: Record<`set-${number}`, IeltsGuidedWritingReference> = {
  'set-21': reference(21, {
    answer: `Portable devices are now part of daily life, but many of them still need a different cable. Some people want the law to make every manufacturer use one common wired connector. I mostly agree because this would reduce waste and make charging easier, although companies should have some freedom when a genuinely new technology appears.

The first advantage is convenience. A family may own several phones, headphones and small speakers, and it is frustrating when each product needs its own plug. Travellers also forget or lose cables. With one connector, people could borrow a charger at work, in a hotel or from a friend. It would also help schools and offices because they would not need to keep a box of many cable types.

There is also an environmental reason. When a person replaces a device, the old cable often stays in a drawer or goes in the rubbish. If the new device accepted the same connector, the customer could continue using the cable and perhaps buy the product without another one. Millions of small cables contains plastic and metal, so using fewer of them can make a real difference over time.

However, a strict rule can cause a problem if it never changes. A future connector may charge faster or be safer. Manufacturers should be allowed to introduce it after showing clear benefits, rather than changing plugs mainly to control accessories. The rule should therefore include a regular technical review and a transition period.

Overall, I support a common connector because ordinary users gain more than they lose. It makes devices simpler to share and reduces unnecessary electronic waste. Nevertheless, the standard must be updated when strong evidence shows that a better system is ready.`,
    verdict: 'Mantiene un acuerdo claro y añade una excepción tecnológica pertinente, aunque desarrolla el impacto ambiental de forma bastante general.',
    criteria: [
      ['Task Response', 'Responde al grado de acuerdo, presenta dos beneficios y limita la obligación cuando exista una mejora demostrable.'],
      ['Coherence & Cohesion', 'La secuencia de conveniencia, ambiente y excepción es clara, pero varios enlaces siguen una estructura predecible.'],
      ['Lexical Resource', 'Usa vocabulario suficiente sobre conectores y residuos, aunque repite “connector”, “cable” y “device” con frecuencia.'],
      ['Grammatical Range & Accuracy', 'Combina oraciones simples y complejas comprensibles; “Millions of small cables contains” muestra un error natural de concordancia.'],
    ],
  }, {
    answer: `Requiring portable electronics to share a wired charging connector would restrict one small aspect of product design, yet it would correct a much larger coordination failure. I strongly support such a requirement, provided that the standard is technologically neutral, periodically reviewed and open to justified exemptions.

Compatibility creates value that no manufacturer can deliver alone. A connector becomes more useful as more devices accept it: households can reuse chargers, public venues can provide reliable charging points, and repair shops need fewer replacement parts. Individual firms, however, may prefer proprietary plugs because accessory sales and customer dependence generate revenue. Regulation can align those private incentives with the public benefit of interoperability. The gain is not merely avoiding irritation; a common interface improves access when a traveller, hospital patient or emergency worker must power a device using whatever cable is available.

The environmental case is equally important. Bundling a new cable with every product consumes metals, plastics, packaging and transport capacity. Although each unit is small, rapid replacement cycles turn duplication into a significant waste stream. A stable connector allows consumers to retain functioning chargers and enables retailers to sell devices without unwanted accessories. It also makes collection and refurbishment simpler because components are more interchangeable.

Critics rightly warn that freezing a physical standard could delay innovation. That risk is best addressed through governance rather than abandonment of the policy. An independent technical body should define performance and safety requirements, review them on a predictable timetable and permit an alternative only when a manufacturer demonstrates a material benefit that cannot be achieved within the common interface. A transition period would protect existing users from sudden obsolescence.

In conclusion, mandatory compatibility is justified because network benefits and waste reduction exceed the modest loss of design freedom. The regulation should not prescribe one plug forever; it should establish a transparent process through which a shared standard can evolve without allowing minor proprietary changes to recreate the original problem.`,
    verdict: 'La respuesta identifica el fallo de coordinación, evalúa la objeción sobre innovación y propone una gobernanza proporcionada del estándar.',
    criteria: [
      ['Task Response', 'Sostiene un acuerdo inequívoco, desarrolla beneficios sistémicos y responde de manera matizada al riesgo de bloquear innovación.'],
      ['Coherence & Cohesion', 'Cada párrafo cumple una función argumental distinta y la progresión desde interoperabilidad hasta gobernanza resulta orgánica.'],
      ['Lexical Resource', 'Emplea con precisión expresiones como “coordination failure”, “interoperability”, “replacement cycles” y “sudden obsolescence”.'],
      ['Grammatical Range & Accuracy', 'Controla cláusulas concesivas, relativas y condicionales con puntuación segura y sin errores perceptibles.'],
    ],
  }),

  'set-22': reference(22, {
    answer: `Coastlines are attractive places for walking, but parts of them pass beside privately owned land. Some people believe everyone should have a protected right to use these routes, while owners want to decide who enters. I think public access should normally be protected, but it needs clear limits for safety, privacy and nature protection.

Landowners have understandable concerns. A path may go near a home, farm animals or dangerous cliffs. Large numbers of walkers can leave gates open, drop rubbish or damage crops. The owner may then pay for repairs even though the visitors brought no income. In some places, nesting birds or weak sand dunes also needs a quiet period. It would be unfair if an access law ignored all of these local conditions.

On the other hand, the coast is a limited national resource. If every adjoining owner could close a section, a continuous walk would become impossible and beautiful areas would be available mainly to people who can buy property there. Walking routes support physical health and local tourism, and they let citizens understand the landscape. A protected route can also make access more predictable because visitors know exactly where they may go instead of wandering across fields.

The best solution is a defined coastal path rather than an unlimited right to enter any private land. Authorities can choose a safe line, provide signs and bins, and move the route temporarily during erosion or breeding seasons. Walkers should follow rules about dogs, gates and waste. Where a path creates a serious cost, the owner could receive practical help.

In conclusion, owners should not be able to block the coast simply because they prefer exclusivity. Public access brings wide benefits, but the right should apply to a managed path and should respect genuine safety, environmental and privacy needs.`,
    verdict: 'Discute ambas posiciones y formula una solución de acceso gestionado, aunque la propuesta de compensación queda mencionada sin explicar su aplicación.',
    criteria: [
      ['Task Response', 'Aborda derechos públicos y cargas privadas, y sostiene una opinión clara a favor de una ruta protegida con excepciones.'],
      ['Coherence & Cohesion', 'El contraste está bien ordenado y conduce a una propuesta, aunque “On the other hand” hace visible la estructura.'],
      ['Lexical Resource', 'Maneja vocabulario adecuado sobre propiedad y costa, con alguna repetición de “access”, “path” y “owner”.'],
      ['Grammatical Range & Accuracy', 'La comunicación es estable pese al error de concordancia en “dunes also needs” y a un rango complejo moderado.'],
    ],
  }, {
    answer: `A coastline is both a physical boundary adjoining particular properties and a landscape whose cultural and recreational value is shared widely. Landowners should therefore retain control over ordinary entry to their land, but that control should be subject to a carefully designed public right of passage along the coast. In my view, neither unrestricted roaming nor unilateral closure is defensible.

The case for private discretion rests on responsibility. Owners manage livestock, fragile habitats, working machinery and buildings close to the shore. They may bear legal and financial consequences when visitors are injured or cause damage. A route immediately beside a house can also intrude on a level of privacy that citizens reasonably expect. If access is imposed without resources for fencing, maintenance or waste collection, the public effectively transfers its recreational costs to a small group of individuals.

Yet allowing each owner to close the adjoining shore creates a collective-action problem. A single barrier can break a long-distance route, concentrate walkers on unsafe roads and reserve exceptional scenery for those able to purchase coastal property. Continuous paths support inexpensive exercise, public understanding of erosion and wildlife, and small businesses in settlements that walkers pass through. They also reduce trespass by replacing uncertain custom with a legible corridor.

A statutory right should consequently be specific rather than absolute. Public authorities ought to map and maintain a defined corridor, consult owners on its alignment, and accept liability for infrastructure under their control. Temporary diversions should be available for severe erosion, agricultural operations or breeding seasons, while permanent exclusion should require evidence that mitigation is impracticable. Visitors, in turn, must observe enforceable rules concerning dogs, litter, fire and gates. Compensation should address exceptional, measurable losses rather than become a routine payment for the existence of a path.

In conclusion, private ownership warrants protection but not an automatic veto over access to an interconnected national landscape. A managed coastal corridor distributes benefits broadly while recognising concrete local risks. This balanced entitlement is more legitimate and workable than either unrestricted public entry or fragmented access dependent on individual permission.`,
    verdict: 'La respuesta reconcilia propiedad, responsabilidad y continuidad territorial mediante un derecho específico con salvaguardas verificables.',
    criteria: [
      ['Task Response', 'Examina plenamente ambas posturas, establece límites operativos y mantiene una opinión consistente durante toda la respuesta.'],
      ['Coherence & Cohesion', 'La progresión de principios a diseño institucional es precisa, con referencias claras y transiciones no mecánicas.'],
      ['Lexical Resource', 'Usa léxico flexible y exacto como “unilateral closure”, “collective-action problem”, “legible corridor” y “automatic veto”.'],
      ['Grammatical Range & Accuracy', 'Presenta estructuras complejas variadas y bien puntuadas, con control completo de concordancia y subordinación.'],
    ],
  }),

  'set-23': reference(23, {
    answer: `Research paid mainly by the public should usually be available without a price. I agree with this view because citizens have already supported the work through taxes and because open findings can help other researchers. However, publication should not reveal personal, confidential or security-sensitive information.

The strongest reason is fairness. A university may receive public money to investigate air pollution, education or a new medical treatment. If the final report is placed behind an expensive subscription, many teachers, patients and small organisations cannot read it. They paid indirectly for the project but must pay again for the result. Free access makes the benefit of public spending more visible and can improve trust.

Open results can also speed up knowledge. Researchers in another country can compare the findings with their own work instead of repeating the same study. A local authority can use a transport report, while a charity can adapt an evaluated programme. It is true that journals and digital archives costs money to operate, but this cost can be included in the original research budget rather than charged to every reader.

There are some limits. A published report should remove names and details that could identify participants. Projects connected to national security may need a delay or a shorter public version. Researchers should also receive reasonable time to check their analysis before release. These exceptions need clear reasons, because a broad word such as confidential could be used to hide inconvenient findings.

Overall, public funding creates a strong duty to share published results. Open access gives taxpayers a return and lets knowledge travel further. With careful protection of privacy and security, free availability should be the normal rule and restrictions should be the exception.`,
    verdict: 'Responde con un acuerdo firme y reconoce excepciones relevantes, aunque la explicación del coste editorial y de los retrasos es limitada.',
    criteria: [
      ['Task Response', 'Desarrolla justicia, difusión y límites de privacidad, y mantiene la apertura como regla general.'],
      ['Coherence & Cohesion', 'Los párrafos avanzan de financiación a uso y excepciones; la conclusión resume sin añadir una idea nueva.'],
      ['Lexical Resource', 'El vocabulario es adecuado, aunque repite “public”, “results” y “cost” y usa algunas formulaciones generales.'],
      ['Grammatical Range & Accuracy', 'Las estructuras son claras; “journals and digital archives costs” evidencia una concordancia imperfecta sin afectar el sentido.'],
    ],
  }, {
    answer: `When the public finances research, it is not merely purchasing a private service for a laboratory; it is investing in knowledge expected to create public value. I therefore strongly agree that published findings and reports should be freely accessible, while accepting narrowly defined safeguards for privacy, confidentiality and security.

Open publication fulfils two obligations. First, it provides accountability. Citizens, journalists and legislators can examine whether a project addressed its stated question and whether conclusions justify subsequent policy. A paywall that excludes everyone without an institutional subscription weakens that scrutiny. Second, access increases the return on public investment. Researchers can test, combine or challenge earlier findings; clinicians and teachers can apply relevant conclusions; and smaller firms or community organisations can innovate without purchasing access to work they have already helped fund.

Publishers and repositories incur genuine costs, but charging readers is not the only sustainable model. Funding agencies can require an open version and treat editing, preservation and accessible formatting as project expenses. Shared public repositories can reduce duplication, while limited publication grants can support disciplines with modest budgets. Such arrangements make the cost transparent rather than concealing it in subscriptions that institutions purchase repeatedly.

Openness must nevertheless be governed carefully. The question excludes personal, confidential and security-sensitive data, yet even a report can expose participants through rare characteristics or small locations. Researchers should conduct disclosure-risk checks, redact only what is necessary and explain any restriction. Security concerns may justify delayed or partial publication, but the decision should be reviewed independently and revisited at a stated date. Commercial partnerships should not convert a public grant into indefinite secrecy either; intellectual-property delays must be proportionate and declared in advance.

In conclusion, free access should be the default because it strengthens accountability, accelerates cumulative inquiry and distributes the benefits of taxation. Exceptions are legitimate when publication itself would cause a specific harm, not when institutions merely prefer control. A rule combining open reports with documented, time-limited restrictions best respects both public investment and responsible research practice.`,
    verdict: 'La respuesta convierte la financiación pública en obligaciones de rendición de cuentas y reutilización, y diseña excepciones estrechas y revisables.',
    criteria: [
      ['Task Response', 'Responde íntegramente al alcance definido, evalúa costes y riesgos, y sostiene una postura matizada con mecanismos concretos.'],
      ['Coherence & Cohesion', 'La argumentación progresa de principios a financiación y salvaguardas mediante conexiones conceptuales precisas.'],
      ['Lexical Resource', 'Emplea de forma natural “institutional subscription”, “disclosure-risk checks”, “time-limited restrictions” y “cumulative inquiry”.'],
      ['Grammatical Range & Accuracy', 'El control de incisos, paralelismos y cláusulas condicionales es amplio y prácticamente impecable.'],
    ],
  }),

  'set-24': reference(24, {
    answer: `Schools organise holidays in different ways. Some people want to shorten the long summer break and place the same holiday weeks across the year, while others prefer one long break. I support a more even calendar because it can reduce learning loss and give families regular rest, although a useful summer period should remain.

A long holiday has clear benefits. Children can travel, visit relatives or join activities that need several weeks. Teachers also have time for training and preparation. Some parents work in seasonal tourism or farming, and a long summer period fits family life. If the break becomes very short, these opportunities may disappear and schools might feel that the year never has a real ending.

However, many pupils forget important skills during a very long break. At the start of the new year, teachers often spend time reviewing material instead of moving forward. This problem can be greater for children whose families cannot pay for books, camps or educational trips. Shorter breaks after each term gives everyone time to rest before tiredness becomes serious, and they may reduce the difference between families.

There are practical difficulties. Working parents need childcare during every break, and frequent holidays can be harder to organise. Schools should publish dates early, and community centres could offer affordable programmes. I would keep a summer holiday of about five weeks but move the remaining time to autumn, winter and spring.

In conclusion, the long summer holiday offers valuable experiences, so it should not disappear. Nevertheless, a balanced calendar uses the unchanged teaching time more effectively and gives children several periods to recover. For these reasons, I prefer a shorter summer break with the same total holiday distributed more evenly.`,
    verdict: 'Considera ambos calendarios y propone un reparto concreto, aunque trata la pérdida de aprendizaje como general y no examina diferencias por edad.',
    criteria: [
      ['Task Response', 'Discute ambas opiniones bajo el supuesto de tiempo lectivo constante y ofrece una posición claramente delimitada.'],
      ['Coherence & Cohesion', 'La respuesta avanza de ventajas a problemas y aplicación, aunque el patrón de contraste es bastante visible.'],
      ['Lexical Resource', 'Usa léxico funcional sobre calendario y aprendizaje, con repetición de “break”, “holiday” y “time”.'],
      ['Grammatical Range & Accuracy', 'La mayoría de estructuras son seguras; “Shorter breaks after each term gives” presenta un error de concordancia localizado.'],
    ],
  }, {
    answer: `Because the proposal preserves annual teaching time, the real question is not how much education children receive but how periods of study and recovery should be sequenced. I favour distributing holidays more evenly, while retaining a summer interval long enough for extended family and enrichment activities.

Supporters of the traditional calendar value possibilities that short pauses cannot provide. Families may travel considerable distances to visit relatives, adolescents can take sustained summer courses or temporary work, and teachers can complete substantial professional development. A long interval also marks a psychologically clear transition between academic years. Compressing it excessively could create a fragmented calendar in which childcare arrangements recur frequently and neither pupils nor staff experience a genuine reset.

The educational costs of a prolonged interruption are nevertheless uneven. Pupils with books, travel and structured programmes may continue learning, whereas others return having lost fluency in recently acquired skills. Schools then devote early weeks to revision, reducing the effective value of the unchanged teaching allocation. More regular breaks can also interrupt the accumulation of fatigue. A pupil who rests after eight or nine demanding weeks may engage more consistently than one expected to continue until exhaustion and then compensate with a very long summer.

Implementation matters. A balanced model might preserve five or six summer weeks and redistribute the remainder around terms, rather than replacing summer with numerous brief closures. Authorities should coordinate dates across neighbouring schools, announce calendars well ahead and fund accessible holiday provision for working families. They should also evaluate attendance, wellbeing and learning retention across age groups instead of assuming that one pattern benefits every pupil equally.

In conclusion, the long summer holiday serves social and developmental purposes, but its present length can magnify unequal learning opportunities and force substantial review. A moderately shorter summer combined with purposeful term breaks offers a better rhythm of concentration and recovery. Since total instruction remains constant, this approach reorganises time rather than diminishing education.`,
    verdict: 'La respuesta distingue cantidad y secuencia del tiempo educativo, reconoce funciones sociales del verano y condiciona la reforma a apoyo y evaluación.',
    criteria: [
      ['Task Response', 'Examina plenamente ambos modelos, respeta el supuesto del enunciado y presenta una recomendación matizada y aplicable.'],
      ['Coherence & Cohesion', 'Las ideas se encadenan desde el principio organizativo hasta los efectos distributivos y la implementación sin enlaces forzados.'],
      ['Lexical Resource', 'El léxico es preciso y variado: “prolonged interruption”, “effective value”, “accumulation of fatigue” y “purposeful term breaks”.'],
      ['Grammatical Range & Accuracy', 'Utiliza con control concesiones, comparaciones y subordinadas extensas, manteniendo claridad y exactitud.'],
    ],
  }),

  'set-25': reference(25, {
    answer: `New apartment buildings often contain many homes but very little space where neighbours can meet. Some people think every new building should include a shared indoor room. I generally agree because these rooms can reduce isolation and support practical activities, but the rule should depend on the size of the building and include a plan for costs.

A common room gives residents a place for meetings, children's activities or a quiet community event. This is especially useful in a city where flats are small and the weather may make an outdoor courtyard unusable. New residents can meet each other, which can make it easier to share information or help an older neighbour. The room can also be used when the lift is repaired, a local service visits or residents need to discuss security.

However, a room does not automatically create a community. If it is badly designed or controlled by complicated booking rules, it may stay empty. Residents still pays for cleaning, heating and repairs through monthly fees. In a small building with only six apartments, the cost and lost floor space may be too high. Developers could also provide a cheap room only to satisfy the law while using attractive images to sell the building.

For this reason, the requirement should apply mainly to medium and large developments. The room needs natural light, accessible entry, toilets nearby and clear rules decided with residents. Plans should explain the expected service charge before buyers sign a contract. Authorities could allow two small neighbouring buildings to share one facility when that is more practical.

Overall, shared indoor rooms are a useful part of dense housing, but they must be usable and affordable. A flexible requirement based on building size would provide social space without creating an unreasonable cost for every small project.`,
    verdict: 'Mantiene un acuerdo condicionado y distingue provisión de uso real, aunque el beneficio social se apoya en ejemplos hipotéticos poco desarrollados.',
    criteria: [
      ['Task Response', 'Responde al grado de acuerdo, reconoce costes y propone un umbral flexible para que la obligación sea proporcionada.'],
      ['Coherence & Cohesion', 'La progresión de beneficio, límite y diseño es fácil de seguir, aunque “For this reason” resume varias objeciones a la vez.'],
      ['Lexical Resource', 'Utiliza vocabulario adecuado sobre vivienda y gestión, pero repite “room”, “building” y “residents”.'],
      ['Grammatical Range & Accuracy', 'El mensaje permanece claro; “Residents still pays” aporta un error natural y el rango complejo es moderado.'],
    ],
  }, {
    answer: `In high-density housing, private apartments cannot meet every social and practical need. Requiring new developments to include a shared indoor room is therefore sensible for buildings above a defined scale, but a universal rule without standards for usability, governance and affordability would produce token spaces rather than functioning amenities.

The strongest argument for provision is spatial equity. Residents in compact flats may lack room for an association meeting, a children's indoor activity or a visit from a community health service. A shared facility distributes access to space that would be inefficient to reproduce in every dwelling. It can also support informal contact. Architecture cannot manufacture friendship, but repeated low-pressure encounters make it easier for neighbours to exchange information, organise assistance during an emergency and resolve common problems before they escalate.

Compulsion nevertheless creates costs. Construction area devoted to a common room cannot be sold as an apartment, while cleaning, insurance and energy become continuing service charges. These burdens may be disproportionate in a small block. Poor governance can also make an ostensibly public room inaccessible: restrictive booking, noise disputes or domination by a small group may exclude the residents whose fees sustain it. A developer could meet a vague requirement with a windowless leftover space that looks convincing only in marketing material.

Regulation should consequently specify outcomes rather than merely square metres. Larger buildings should provide an accessible, naturally lit and acoustically managed room with transparent operating costs. Residents need a democratic process for setting hours and resolving conflicts. Authorities might accept an equivalent shared facility across adjoining developments where it offers better quality, and they should exempt very small schemes when the per-home burden is excessive.

In conclusion, shared indoor rooms can make dense housing more adaptable and socially resilient, so a qualified mandate is justified. Its success depends on thresholds, design quality and resident control. A requirement that addresses those conditions would create useful common infrastructure; one concerned only with the presence of a room would add cost without guaranteeing value.`,
    verdict: 'La respuesta transforma una obligación física en un estándar de resultados y equilibra equidad espacial, costes y gobernanza residente.',
    criteria: [
      ['Task Response', 'Ofrece una posición precisa, analiza beneficios y riesgos y desarrolla condiciones regulatorias directamente vinculadas al enunciado.'],
      ['Coherence & Cohesion', 'La estructura conduce de la justificación al riesgo de cumplimiento simbólico y después a una solución proporcionada.'],
      ['Lexical Resource', 'Emplea con flexibilidad “spatial equity”, “low-pressure encounters”, “continuing service charges” y “qualified mandate”.'],
      ['Grammatical Range & Accuracy', 'La sintaxis compleja y la puntuación se mantienen controladas y naturales en toda la respuesta.'],
    ],
  }),

  'set-26': reference(26, {
    answer: `Crowded city centres need regular deliveries, but vans and lorries can block narrow streets. Some people want most deliveries to happen at night, while residents prefer daytime work because of noise. I think cities should use both periods, with quiet goods delivered at night and the noisiest work kept for daytime.

Night delivery can improve traffic. A lorry that stops outside a supermarket at nine in the morning may occupy a bus lane and force cars to move around it. At midnight the same road is almost empty, so the driver can finish faster and use less fuel. Shops also receive fresh products before they open. This can make streets safer for cyclists and pedestrians during the busiest hours.

However, unloading is not silent. Metal cages, reversing alarms and bottles can wake people who live above shops. Even a short interruption is serious when it happens several nights every week. Drivers may also feel tired during night shifts, and a dark service entrance can create safety risks. These disadvantages are not solved simply because traffic is lower.

A mixed policy is more reasonable. Soft packages, laundry and sealed food boxes could arrive at night using electric vehicles and rubber-wheeled equipment. Bottles, construction materials and other noisy loads should come during a daytime window outside the morning and evening peaks. Councils can measure noise and fine companies that ignore agreed routes or hours. Residents should have one contact point for repeated complaints.

In conclusion, moving every delivery to night would transfer a public traffic problem into private bedrooms. Daytime delivery alone also keeps unnecessary vehicles in crowded streets. Carefully separating quiet and noisy loads offers a better balance between efficient commerce and residents' need for sleep.`,
    verdict: 'Discute las dos franjas y propone una política mixta relevante, aunque supone que la clasificación de cargas será fácil de controlar.',
    criteria: [
      ['Task Response', 'Aborda congestión y ruido, expresa una opinión clara y ofrece una solución diferenciada por tipo de carga.'],
      ['Coherence & Cohesion', 'La comparación es ordenada y desemboca en una propuesta, pero algunos enlaces son previsibles.'],
      ['Lexical Resource', 'El vocabulario es apropiado para logística urbana, aunque repite “delivery”, “night” y “noise”.'],
      ['Grammatical Range & Accuracy', 'Usa condicionales y relativas con precisión razonable; el rango sigue siendo más seguro que flexible.'],
    ],
  }, {
    answer: `Delivery restrictions inevitably distribute inconvenience: daytime operations occupy scarce road capacity, whereas night operations expose residents to sound when they are most vulnerable to disturbance. I would not give either period automatic priority. Cities should permit quiet night logistics while reserving acoustically disruptive loads for tightly managed off-peak daytime windows.

The case for night delivery is operationally strong. Freight vehicles moving through uncongested streets complete routes more quickly, spend less time idling and are less likely to obstruct buses or cyclists. Retailers can replenish stock before opening, and kerb space used for customers during the day can serve logistics overnight. Consolidating deliveries at peripheral hubs and transferring goods to smaller electric vehicles could amplify these gains.

Nevertheless, average noise limits often conceal the harm caused by sudden events. A reversing alarm, dropped metal cage or crate of bottles may remain within an hourly threshold yet still wake hundreds of residents. Repeated sleep interruption has health and productivity consequences, and lower traffic can tempt drivers to travel faster. Night work also shifts social costs onto employees whose schedules become harder to reconcile with family life.

Regulation should therefore classify operations by their actual disturbance. Parcels, textiles and other quiet loads could use certified electric vehicles, rubberised equipment and designated internal bays at night. Glass, construction supplies and refuse-like handling should occur between commuter peaks during the day. Permits ought to specify routes, equipment and maximum impulsive noise, with sensor evidence and a responsive complaints process. Businesses that invest in consolidation or sound-proof loading areas could receive broader windows, while repeated breaches would remove night access.

In conclusion, the objective is not to make streets empty by making homes uninhabitable. A performance-based timetable can capture the congestion benefits of nocturnal logistics without treating every delivery as equally quiet. Combining vehicle standards, load classification and enforceable local permits is more equitable than a blanket preference for either night or day.`,
    verdict: 'La respuesta identifica que cada horario distribuye costes distintos y construye una regulación basada en el nivel real de perturbación.',
    criteria: [
      ['Task Response', 'Examina plenamente ambas posturas y desarrolla una política concreta que mantiene la opinión central.'],
      ['Coherence & Cohesion', 'La progresión desde eficiencia hasta externalidades y control regulatorio es lógica y fluida.'],
      ['Lexical Resource', 'Usa léxico preciso como “road capacity”, “impulsive noise”, “peripheral hubs” y “performance-based timetable”.'],
      ['Grammatical Range & Accuracy', 'Maneja estructuras concesivas y cadenas de condiciones con control completo y puntuación clara.'],
    ],
  }),

  'set-27': reference(27, {
    answer: `Online civil court hearings became common when people could not always attend a court building. Some argue that they should remain the normal choice whenever technology is available. I partly disagree. Simple procedural hearings can stay online, but cases involving important testimony or vulnerable participants should usually be heard in person.

The main benefit of an online hearing is access. A person may live far from the court, have limited mobility or lose a day's income by travelling. Lawyers and experts also save time, which may reduce legal costs. A short meeting about dates or documents does not need a formal room, and an online system can help courts deal with delays more quickly.

However, having a phone or computer does not mean that participation is equal. One person may have a private office and fast internet, while another uses a shared room and an old phone. A broken connection can make an answer look uncertain. It is also harder for a judge to notice that someone is confused, being influenced by another person, or unable to see a document. These problems matter when credibility is central to the decision.

Courts should therefore decide by hearing type, not only by whether technology exists. Scheduling sessions and uncontested applications can normally be online. A party should be able to request an in-person hearing when access, disability, interpretation, safety or disputed oral evidence creates a real concern. Courts can also provide private booths and technical help for people without suitable equipment.

In conclusion, online hearings are a useful permanent tool, but they should not become an automatic rule for most civil cases. Efficiency is valuable only when both sides can participate fully and the judge can examine the evidence fairly.`,
    verdict: 'Presenta una postura parcial bien delimitada y distingue tipos de audiencia, aunque no explora cuánto retraso puede causar la opción presencial.',
    criteria: [
      ['Task Response', 'Responde al grado de acuerdo, explica acceso y justicia procesal y propone criterios relevantes para elegir el formato.'],
      ['Coherence & Cohesion', 'Los párrafos se conectan con claridad, aunque la progresión beneficio-problema-solución es convencional.'],
      ['Lexical Resource', 'Usa vocabulario suficiente sobre tribunales y acceso, con cierta repetición de “hearing”, “online” y “person”.'],
      ['Grammatical Range & Accuracy', 'La precisión es estable y las subordinadas son comprensibles, aunque el repertorio complejo resulta limitado.'],
    ],
  }, {
    answer: `The availability of video technology does not by itself establish that an online hearing is procedurally fair. Digital civil hearings should remain an important default for routine matters, but I disagree that most hearings should continue online whenever the necessary equipment exists. The appropriate format depends on what the court must decide and whether every participant can engage on equal terms.

Remote proceedings can substantially improve access. Travel, waiting time and accommodation impose disproportionate costs on people living far from a courthouse, those with mobility limitations and parties in low-value disputes. Lawyers and expert witnesses can attend shorter sessions efficiently, allowing courts to schedule procedural directions more rapidly. For uncontested applications, document management or case planning, physical presence often adds ceremony rather than useful evidence.

Yet technological availability is a weak measure of effective participation. A stable connection, private room, adequate screen and confidence with digital documents are separate requirements. Unequal conditions can affect how testimony appears: delay may resemble hesitation, poor audio can obscure nuance, and a participant sharing a home may be unable to discuss sensitive facts freely. Where credibility, coercion or complex oral evidence is disputed, judges also need the richest practicable environment for observing and managing the exchange. Remote access may protect some vulnerable people, but isolate others from immediate support.

Courts should adopt a rebuttable presumption rather than a universal rule. Administrative and uncontested hearings could begin online, with clear notice and technical assistance. Either party should be able to request an in-person or hybrid format by identifying a concrete barrier or evidential need, and the judge should give reasons for the decision. Publicly available private booths, interpreters and accessible platforms would prevent the choice from depending on personal wealth.

In conclusion, online hearings can make civil justice faster and less expensive, but efficiency is not equivalent to fairness. A function-based policy preserves digital convenience while recognising that some decisions require physical presence. Technology should expand the court's options, not quietly narrow a party's ability to be heard.`,
    verdict: 'La respuesta distingue disponibilidad tecnológica de participación efectiva y diseña una presunción revisable según función y barreras.',
    criteria: [
      ['Task Response', 'Evalúa de forma completa acceso, evidencia y equidad, y sostiene una posición matizada con un mecanismo procesal claro.'],
      ['Coherence & Cohesion', 'El argumento avanza desde utilidad hasta límites y diseño institucional con cohesión conceptual fuerte.'],
      ['Lexical Resource', 'Emplea con precisión “procedurally fair”, “rebuttable presumption”, “evidential need” y “function-based policy”.'],
      ['Grammatical Range & Accuracy', 'La sintaxis compleja, los incisos y los paralelismos se controlan con naturalidad y exactitud.'],
    ],
  }),

  'set-28': reference(28, {
    answer: `Automatic renewal is common for music, software, gyms and many other subscriptions. Businesses use it because payments continue regularly, while customers use it because they do not need to sign up again. I believe fresh confirmation should be required for some renewals, especially after a trial or a major change, but not before every monthly payment.

For a company, automatic renewal gives predictable income and reduces the cost of asking existing users to return. It may also help planning because managers know approximately how many customers will remain. Customers benefit when a service is used continuously. A person does not want cloud storage, security software or a transport pass to stop suddenly because they forgot a date.

The problem is that people can forget a subscription which they no longer use. A low introductory price may become much higher, or a free trial can turn into a paid year. Long terms and difficult cancellation pages makes this more unfair. Businesses then earn money from inattention rather than from a service that the customer actively values.

Requiring confirmation before every payment would create too many messages and could interrupt essential services. A better rule is to send a clear reminder before renewal, showing the new price, period and cancellation link. Fresh confirmation should be necessary after a free trial, before an annual contract, or when the price rises significantly. Monthly subscriptions at an unchanged price could continue until cancellation.

In conclusion, both sides use automatic renewal because it is convenient and predictable. It should not become a trap. Targeted confirmation for high-risk changes, combined with simple reminders and cancellation, protects customers without removing the convenience they chose.`,
    verdict: 'Responde las dos preguntas y propone confirmación selectiva, aunque no define con precisión qué aumento de precio sería significativo.',
    criteria: [
      ['Task Response', 'Explica por qué ambas partes usan la renovación y responde directamente si debe exigirse una nueva confirmación.'],
      ['Coherence & Cohesion', 'La secuencia de motivos, riesgo y regla alternativa es clara, con un cierre que recupera la tesis.'],
      ['Lexical Resource', 'El vocabulario es adecuado para contratos de consumo, aunque repite “renewal”, “confirmation” y “service”.'],
      ['Grammatical Range & Accuracy', 'El mensaje es preciso pese al error en “pages makes”; predominan estructuras seguras y bien controladas.'],
    ],
  }, {
    answer: `Automatic renewal solves a genuine coordination problem: many services are valuable precisely because they continue without interruption, while repeated purchasing decisions create friction for both seller and customer. Nevertheless, continuity can be exploited when firms rely on forgetfulness. Businesses should not need fresh consent before every routine renewal, but confirmation should be mandatory at moments when the customer's original decision no longer provides meaningful authority.

Firms favour renewal because recurring revenue is predictable, lowers acquisition costs and supports investment in servers, staff or content. Customers gain convenience and avoid losing cloud backups, professional software or insurance-like protection through an overlooked deadline. For an actively used monthly service at an unchanged price, another approval request may add no useful information. Frequent prompts can even train users to click mechanically, weakening rather than strengthening consent.

The arrangement becomes problematic when important terms change or when non-use is part of the business model. A free trial that converts into an annual fee, a substantial price increase, or a contract renewed for a long fixed period imposes a commitment different from the one the user may remember. Obscure notices and multi-stage cancellation then turn inertia into a source of profit. The informational imbalance is greatest where a company can observe inactivity but continues charging silently.

Regulation should match consent requirements to risk. Every renewal notice should state the amount, billing period and one-step cancellation route in a standard format. Explicit reconfirmation should be required after trials, before long annual renewals, following material price or service changes, and perhaps after a sustained period of verified non-use. Ordinary monthly continuation could remain automatic, provided cancellation is no harder than subscription and reminders are delivered through the customer's chosen channel.

In conclusion, automatic renewal benefits both sides when it preserves a relationship the customer still recognises. Universal reconfirmation would create noise and interruption, whereas no reconfirmation rewards strategic opacity. Event-triggered consent, transparent reminders and symmetrical cancellation preserve legitimate convenience while preventing inertia from substituting for agreement.`,
    verdict: 'La respuesta diferencia continuidad legítima e inercia explotada y formula un modelo de consentimiento activado por cambios de riesgo.',
    criteria: [
      ['Task Response', 'Contesta plenamente motivos y regulación, evalúa la propuesta universal y ofrece una alternativa proporcionada.'],
      ['Coherence & Cohesion', 'La distinción conceptual se mantiene de principio a fin y organiza ejemplos y medidas sin repetición estructural.'],
      ['Lexical Resource', 'Usa con exactitud “recurring revenue”, “informational imbalance”, “strategic opacity” y “event-triggered consent”.'],
      ['Grammatical Range & Accuracy', 'Las cláusulas extensas y los contrastes se controlan con precisión, variedad y puntuación segura.'],
    ],
  }),

  'set-29': reference(29, {
    answer: `Job advertisements often describe duties but do not say how much the work pays. I agree that employers should normally publish a salary range because applicants can make better decisions and unfair differences may become easier to notice. However, the law should allow a genuine range instead of demanding one exact figure.

The clearest benefit is saving time. A worker may prepare an application, attend interviews and complete a test before learning that the salary is too low. The employer also spends time on a candidate who will reject the offer. A published range lets both sides decide earlier. It is especially helpful for people who cannot easily ask about money or who do not know the usual pay in a new industry.

Transparency may also reduce unfairness. If salaries are secret, two people doing similar work can receive very different offers because one negotiated more confidently. A range gives a common starting point and makes a very low offer more difficult. It does not remove negotiation, since experience and qualifications can still decide where the person sits inside the range.

Some employers argue that pay depends on the final candidate or that competitors will see private information. These concerns are reasonable, but a range can be wide enough to include junior and experienced applicants. The advertisement should explain which skills lead to the upper end. Companies must not publish an unrealistically large range only to satisfy the law.

In conclusion, salary ranges make recruitment more honest and efficient. Employers keep flexibility, but applicants receive information before investing time. A legal requirement with rules against false or meaningless ranges would improve the job market.`,
    verdict: 'Sostiene el acuerdo con argumentos relevantes de eficiencia y equidad, aunque el efecto sobre brechas salariales se presenta de forma simplificada.',
    criteria: [
      ['Task Response', 'Responde al grado de acuerdo, trata objeciones empresariales y añade una condición contra rangos engañosos.'],
      ['Coherence & Cohesion', 'La organización es clara y cada párrafo tiene un propósito, aunque el patrón enumerativo es reconocible.'],
      ['Lexical Resource', 'Maneja léxico suficiente sobre contratación, pero repite “range”, “employer”, “salary” y “time”.'],
      ['Grammatical Range & Accuracy', 'La redacción mantiene buena precisión con estructuras relativamente seguras y poca experimentación sintáctica.'],
    ],
  }, {
    answer: `A salary range does not eliminate negotiation, but it changes the point from which negotiation begins. I strongly support requiring ranges in job advertisements because early pay information reduces wasted search, weakens information asymmetry and makes compensation practices easier to scrutinise. The obligation must, however, require a good-faith range linked to the advertised role.

Recruitment is costly for both parties. Applicants tailor documents, arrange childcare, travel and complete assessments, while employers screen and interview candidates. Discovering only at the final stage that expectations are incompatible wastes those investments. A range allows workers to compare opportunities before applying and enables firms to attract people whose expectations broadly fit the budget. This is particularly valuable to career changers and candidates without informal access to industry salary knowledge.

Disclosure also supports fairness. When the employer alone knows the budget and colleagues' pay, compensation can depend excessively on prior salary or confidence in bargaining. Published boundaries establish a reference point and may expose patterns in which similar roles are valued differently. Individual experience can still justify placement within the range, but the firm must explain why it departs from the advertised level rather than inventing a figure after meeting the candidate.

Poorly designed regulation could become cosmetic. A range stretching from entry-level to executive pay conveys nothing, and a company might advertise a high ceiling that it never intends to offer. Enforcement should therefore require the minimum and maximum that the employer genuinely expects to pay at publication, alongside the principal factors affecting placement. Regulators could examine repeated outcomes far below advertised midpoints. Limited exceptions may be appropriate for genuinely commission-dominated roles, but variable compensation should itself be described.

In conclusion, salary transparency preserves substantial managerial flexibility while giving applicants essential information at the correct time. Its value lies not in fixing every wage but in making the bargaining environment more symmetrical and accountable. A credible-range requirement would improve efficiency and fairness without preventing rewards for experience or scarce skills.`,
    verdict: 'La respuesta trata el rango como corrección de asimetría informativa y anticipa mecanismos de cumplimiento para evitar transparencia cosmética.',
    criteria: [
      ['Task Response', 'Desarrolla plenamente beneficios, objeciones y salvaguardas, manteniendo una postura firme y matizada.'],
      ['Coherence & Cohesion', 'La progresión desde costes de búsqueda hasta equidad y fiscalización produce un argumento integrado.'],
      ['Lexical Resource', 'Emplea con precisión “information asymmetry”, “good-faith range”, “advertised midpoints” y “bargaining environment”.'],
      ['Grammatical Range & Accuracy', 'Muestra control sostenido de estructuras complejas, modificadores y relaciones causales sin errores perceptibles.'],
    ],
  }),

  'set-30': reference(30, {
    answer: `Universities want graduates to understand society as well as their academic subject. Some people therefore support a compulsory supervised community-service placement. Others say service should remain optional because students have different needs. I think universities should offer and encourage placements, but a single compulsory rule would be unfair unless many flexible alternatives are available.

Supporters are right that practical service can teach lessons that a classroom cannot. A student helping at a food project, museum or environmental group learns to work with people from different backgrounds. Supervision can connect the experience to communication, ethics and teamwork. Community organisations may also receive useful help, and students who would never volunteer can discover a long-term interest.

However, compulsory service is not equally easy for everyone. Some students already work long hours, care for relatives or manage a disability. An unpaid placement may require transport and reduce paid working time. International students may face language or legal limits. If the university ignores these differences, a programme intended to build responsibility becomes another cost for those with fewer resources.

There is also a danger that organisations receive short-term students who do not want to be there. Training them uses staff time, and calling required work volunteering is not accurate. Universities should instead create a choice of paid or credit-bearing projects, including remote research, campus service and recognition of existing community responsibilities. Financial support and accessible supervision are essential.

In conclusion, community placements can be a valuable part of university education, but compulsion is only fair when students have real choices and no financial penalty. I prefer a broad graduation requirement that can be met through several forms of supervised public contribution rather than one standard unpaid placement.`,
    verdict: 'Discute valor educativo y desigualdad y propone una obligación flexible, aunque la diferencia entre servicio y aprendizaje académico queda algo difusa.',
    criteria: [
      ['Task Response', 'Aborda ambas posturas, expresa una opinión condicionada y propone alternativas para estudiantes con circunstancias distintas.'],
      ['Coherence & Cohesion', 'La respuesta avanza de beneficios a barreras y rediseño; algunos párrafos dependen de enumeraciones.'],
      ['Lexical Resource', 'Usa vocabulario adecuado sobre universidad y servicio, con cierta repetición de “placement”, “students” y “service”.'],
      ['Grammatical Range & Accuracy', 'La sintaxis es generalmente precisa y comprensible, con variedad suficiente pero no especialmente amplia.'],
    ],
  }, {
    answer: `A supervised community placement can connect university learning with public life, yet compulsory service is defensible only if the institution accepts responsibility for access, educational quality and the burden placed on host organisations. I support a flexible graduation requirement rather than a single unpaid placement imposed identically on every student.

Well-designed placements offer distinctive learning. Students encounter people, constraints and forms of knowledge absent from seminars, then use supervision to reflect on communication, ethics and institutional power. An engineering student might help an accessibility group evaluate public spaces, while a history student could organise an archive. Such work can challenge assumptions and demonstrate that professional expertise carries social obligations. A requirement also prevents participation from becoming an advantage enjoyed mainly by students with spare time and existing networks.

Compulsion, however, can reproduce inequality. Students supporting children, working substantial hours or managing health conditions cannot simply donate fixed weekly periods. Travel and unpaid time impose costs, and some hosts lack capacity to train a rapid succession of temporary participants. A reluctant student assigned to sensitive work may offer little benefit and could disrupt relationships with service users. Calling this arrangement volunteering also obscures the fact that it is assessed labour required for a degree.

Universities should define educational and public outcomes while permitting multiple routes: an in-person placement, a paid civic internship, remote research for a community organisation, a team project on campus, or recognition of suitable existing service. Institutions must fund travel, provide disability adjustments, train supervisors and allow exemptions where no fair arrangement exists. Host organisations should co-design tasks and be free to decline students rather than functioning as inexpensive teaching sites.

In conclusion, community engagement merits a place in higher education because it can deepen both competence and civic awareness. Its legitimacy depends on flexibility and reciprocity. A supported, credit-bearing requirement with several equivalent pathways is preferable to optional provision that reaches few students or a rigid placement that penalises those already carrying heavy responsibilities.`,
    verdict: 'La respuesta defiende una exigencia flexible y recíproca, integrando aprendizaje, desigualdad y capacidad de las organizaciones anfitrionas.',
    criteria: [
      ['Task Response', 'Evalúa por completo ambas posiciones y desarrolla condiciones concretas que sostienen la opinión central.'],
      ['Coherence & Cohesion', 'La argumentación progresa con naturalidad desde valor educativo hasta legitimidad y diseño de alternativas.'],
      ['Lexical Resource', 'Usa de forma exacta “institutional power”, “assessed labour”, “co-design tasks” y “equivalent pathways”.'],
      ['Grammatical Range & Accuracy', 'Controla estructuras complejas, enumeraciones y contrastes con gran precisión y fluidez.'],
    ],
  }),

  'set-31': reference(31, {
    answer: `Large digital advertising screens are becoming common in city streets. Limiting them has advantages because streets can look calmer and drivers may be less distracted, but the policy also reduces income and useful public messages. I believe the advantages are greater if cities allow a small number of screens in suitable places.

The first benefit is visual quality. A bright moving image can dominate a square and make historic buildings difficult to appreciate. Several screens together create a place that feels commercial at all hours. Strict limits can protect the character of a neighbourhood and reduce light entering nearby homes at night. They may also improve road safety because drivers have fewer changing images competing for attention.

On the negative side, screens provide advertising income to building owners and the city. Local businesses can change a message quickly without printing new posters. The same equipment can show transport disruption, severe weather warnings or emergency instructions. If all large screens are banned, authorities lose a flexible communication tool and some companies may move advertising money away from the city centre.

The disadvantages can be reduced without accepting unlimited displays. Cities can ban screens beside complex junctions and protected buildings, control brightness and movement, and require them to switch off late at night. A limited screen in a transport station is less harmful than a wall-sized display facing apartments. Public messages could receive a fixed share of display time.

In conclusion, strict limits are better than allowing digital advertising to spread without control. They protect safety, sleep and the appearance of public space. Because carefully located screens still have practical uses, regulation should control number, size and operation rather than create a complete ban.`,
    verdict: 'Cubre ventajas y desventajas y establece una posición proporcional, aunque afirma el riesgo vial sin desarrollar la calidad de esa evidencia.',
    criteria: [
      ['Task Response', 'Responde ambos componentes, compara los efectos y concluye que las ventajas superan las pérdidas bajo una regulación selectiva.'],
      ['Coherence & Cohesion', 'La estructura es muy clara, aunque depende de señales explícitas como “The first benefit” y “On the negative side”.'],
      ['Lexical Resource', 'Usa léxico funcional sobre espacio urbano y pantallas, con repetición frecuente de “screens”, “city” y “messages”.'],
      ['Grammatical Range & Accuracy', 'Mantiene una precisión razonable mediante estructuras seguras y algunas cláusulas complejas bien formadas.'],
    ],
  }, {
    answer: `Large digital advertising screens transform more than the commercial appearance of a street: they alter attention, night-time light and the balance between private messaging and shared space. Strict limits entail economic and communicative costs, but I believe their advantages outweigh the disadvantages when rules distinguish sensitive settings from locations where screens serve a legitimate function.

Limits can protect both safety and civic character. Rapid movement, intense contrast and frequent image changes compete for drivers' attention near crossings and junctions. Even where collision evidence is uncertain, authorities routinely manage avoidable visual demands in complex traffic environments. Screens also operate after the businesses they advertise have closed, projecting commercial light into homes and making historic squares feel permanently branded. Brightness caps and numerical restrictions restore some control to residents who cannot simply opt out of the display.

The disadvantages are real. Digital panels support advertising, installation and maintenance jobs, generate rent for property owners and allow small firms to update campaigns without physical printing. They can also carry emergency warnings or transport information. Restrictive rules may shift revenue to online platforms while leaving city authorities with enforcement costs, and an absolute ban would discard useful infrastructure in stations or entertainment districts designed for high visual activity.

These costs argue for zoning, not regulatory surrender. Screens should be prohibited near hazardous junctions, residences and protected architecture, while permitted under size, luminance and animation standards in selected commercial areas. Automatic dimming, overnight shutdown and independent measurement would make limits enforceable. A condition reserving capacity for verified public information could preserve emergency utility without allowing that occasional function to justify continuous advertising everywhere.

In conclusion, cities are entitled to govern how private messages occupy common visual space. Although limits reduce some income and flexibility, they protect attention, sleep and place identity at a scale individual residents cannot negotiate. The advantages outweigh the losses when regulation is location-specific, measurable and short of a total prohibition.`,
    verdict: 'La respuesta conceptualiza la atención y el paisaje como bienes comunes, evalúa costes económicos y justifica una zonificación medible.',
    criteria: [
      ['Task Response', 'Desarrolla ventajas, desventajas y comparación final con una postura clara y condiciones regulatorias precisas.'],
      ['Coherence & Cohesion', 'La tesis sobre espacio compartido organiza todo el ensayo y las concesiones se integran sin romper la progresión.'],
      ['Lexical Resource', 'Emplea con naturalidad “avoidable visual demands”, “permanently branded”, “luminance” y “regulatory surrender”.'],
      ['Grammatical Range & Accuracy', 'Utiliza estructuras complejas y modificadores densos con control completo y gran legibilidad.'],
    ],
  }),

  'set-32': reference(32, {
    answer: `Public research is increasingly asked to share methods and data, not only final reports. People request this because they want to check results and use information again. I think open release should normally be required, but personal, confidential and dangerous data needs protection.

One reason for openness is trust. A published conclusion may influence health, education or environmental policy. If other researchers can see how information was collected and analysed, they can find mistakes or confirm the result. Clear methods also help students learn how a study was done instead of accepting an important claim only because a famous institution produced it.

Shared data can also save money. Another team may answer a new question with an existing dataset, so public funds do not pay for the same collection twice. Researchers can combine results from different places and examine patterns that one small project cannot show. It is true that preparing files and explanations takes time, but this work should be planned and funded from the beginning.

Open release cannot mean putting every file on the internet. Health or interview data may identify a person even after names are removed. Information about endangered species or security systems could be misused. Researchers should explain these risks and share a safer version, controlled access or detailed summary when full publication is not possible. The restriction should be reviewed rather than continuing forever without a reason.

In conclusion, methods and underlying data should normally be available because verification and reuse increase the value of public research. Mandatory openness needs exceptions, but these should protect a specific harm. Lack of time or a wish to keep an advantage should not be enough to prevent sharing.`,
    verdict: 'Responde por qué se pide apertura y apoya una regla obligatoria con excepciones, aunque la viabilidad de acceso controlado queda poco detallada.',
    criteria: [
      ['Task Response', 'Atiende las dos preguntas y desarrolla verificación, reutilización y riesgos específicos con una posición constante.'],
      ['Coherence & Cohesion', 'Las ideas siguen una secuencia comprensible; varios párrafos comienzan con fórmulas funcionales pero poco variadas.'],
      ['Lexical Resource', 'El vocabulario comunica bien el tema, aunque “open”, “share”, “data” y “research” se repiten con frecuencia.'],
      ['Grammatical Range & Accuracy', 'La mayor parte de la respuesta es precisa; “data needs protection” muestra concordancia discutible sin bloquear el mensaje.'],
    ],
  }, {
    answer: `Demands for open methods and data reflect a shift in what counts as a credible research contribution. A published conclusion is no longer considered sufficient when policy or further inquiry depends on how that conclusion was produced. Open release should normally be mandatory for publicly funded work, but the obligation must incorporate privacy, security, intellectual-property and stewardship constraints.

Transparency allows scrutiny. Detailed protocols, code and analytical decisions enable other researchers to detect errors, assess whether a method fits the stated question and attempt replication. This matters particularly when findings guide clinical practice or public expenditure. Openness also increases efficiency: a well-documented dataset can support questions beyond the original grant, facilitate comparisons across countries and reduce unnecessary collection from participants who have already contributed time or sensitive information.

The pressure has grown because digital tools make sharing technically feasible and because several prominent results have proved difficult to reproduce. Funders and citizens consequently expect evidence that public money created a durable resource rather than a single article. However, useful release is not costless. Files require cleaning, metadata, stable formats and long-term preservation. A mandate without funding may produce an unusable data dump that satisfies compliance while offering little scientific value.

Nor is unrestricted publication always responsible. Rare medical characteristics can reveal identity after obvious details are removed; ecological coordinates can expose threatened species; commercial partners may hold legitimate rights in jointly developed materials. Projects should therefore prepare data-management plans, obtain appropriate participant consent and use tiered access where necessary. Any exemption should identify the harm, specify what can still be shared and include a review date. Independent repositories, rather than individual researchers, should administer controlled access.

In conclusion, mandatory openness should be the default because it supports verification, cumulative discovery and accountability. Yet openness is a practice of responsible stewardship, not simply uploading files. Funding preparation, documenting exceptions and providing secure access mechanisms would make the requirement both scientifically useful and ethically defensible.`,
    verdict: 'La respuesta vincula apertura con credibilidad y reutilización, y distingue publicación indiscriminada de una custodia responsable y financiada.',
    criteria: [
      ['Task Response', 'Responde íntegramente causas y obligatoriedad, evalúa costes y formula excepciones gobernadas con precisión.'],
      ['Coherence & Cohesion', 'El argumento avanza desde escrutinio hasta capacidad técnica, costes y ética mediante una línea conceptual sostenida.'],
      ['Lexical Resource', 'Usa léxico especializado pero natural: “replication”, “stable formats”, “data-management plans” y “tiered access”.'],
      ['Grammatical Range & Accuracy', 'Las estructuras complejas, negativas y contrastivas mantienen exactitud y claridad constantes.'],
    ],
  }),

  'set-33': reference(33, {
    answer: `University students normally concentrate on one main subject, but some people want them to take at least one course outside it. I agree with this requirement because it can widen their thinking and provide useful skills, although the outside course should be chosen freely and should not delay graduation.

Modern problems do not fit inside one department. A computer student may need to understand ethics, while a business student can benefit from environmental science. One outside course will not make a person an expert, but it can introduce different questions and methods. It may also help students communicate with colleagues who have another professional background.

There is a personal benefit as well. Some students choose a degree at a young age without knowing all their interests. A course in art, history or statistics may reveal an ability they did not expect. Even when it does not change their career, studying something different can improve curiosity and make university more than narrow job training.

However, the rule can create pressure in degrees with many compulsory classes. Nursing or engineering students may already have a full timetable, and an extra course costs money in some systems. Universities should count the outside subject within the existing credit total, not add another semester. Students should have a broad list and academic advice, because forcing everyone into the same general class would reduce the main advantage of choice.

In conclusion, requiring one course outside the principal field is a small and reasonable part of a degree. It can develop flexibility and expose students to another way of thinking. The policy is beneficial as long as it replaces an elective, offers real choice and does not increase the time or cost of study.`,
    verdict: 'Mantiene un acuerdo condicionado y desarrolla amplitud y descubrimiento personal, aunque los beneficios profesionales se presentan de forma general.',
    criteria: [
      ['Task Response', 'Responde al grado de acuerdo, reconoce límites de programas intensivos y establece condiciones para una obligación razonable.'],
      ['Coherence & Cohesion', 'La secuencia de beneficios y condiciones es clara, aunque utiliza una estructura de párrafos bastante regular.'],
      ['Lexical Resource', 'Usa léxico adecuado sobre educación superior, con repetición visible de “course”, “students” y “outside”.'],
      ['Grammatical Range & Accuracy', 'Combina oraciones complejas y simples con precisión suficiente y pocos riesgos formales.'],
    ],
  }, {
    answer: `Specialisation gives a degree depth, but excessive curricular isolation can leave graduates unable to recognise the assumptions of their own discipline. I support requiring at least one course outside a student's principal field, provided that it counts within the existing degree and offers meaningful choice rather than a token survey class.

The intellectual case is strong. Public problems such as climate adaptation, automated decision-making and ageing populations involve technical, social and ethical dimensions simultaneously. Exposure to another discipline teaches students that evidence is selected and interpreted differently across fields. An engineer studying public policy may better understand implementation constraints, while a historian learning statistics may evaluate quantitative claims more critically. The objective is not instant interdisciplinary expertise, but informed humility and the ability to collaborate across professional boundaries.

Breadth can also help students test an identity chosen before they fully understood university study. A linguistics, design or economics course may reveal an unexpected aptitude or provide a technique useful within the main subject. Even when no direct vocational connection emerges, encountering another intellectual tradition counters the idea that higher education is solely narrow occupational preparation.

The requirement can nevertheless become burdensome. Highly regulated programmes already contain extensive clinical or technical components, and adding credits would increase cost or displace essential practice. Choice may be illusory if timetables clash or only generic courses accept outside students. Universities should therefore embed the requirement within current credit totals, publish a sufficiently diverse catalogue and permit approved interdisciplinary modules to qualify. Advisers should help students choose a course that genuinely challenges rather than duplicates their principal field.

In conclusion, one external course is a modest safeguard against intellectual confinement. Its value lies in contrast: students encounter unfamiliar methods and reconsider what their own field takes for granted. When integrated without extending the degree, the requirement strengthens specialised education instead of weakening it.`,
    verdict: 'La respuesta presenta la amplitud como contraste metodológico, anticipa cargas curriculares y define una implementación que protege la especialización.',
    criteria: [
      ['Task Response', 'Desarrolla una postura plenamente clara, evalúa objeciones y explica cómo la política puede incorporarse sin ampliar el grado.'],
      ['Coherence & Cohesion', 'Cada párrafo amplía la tesis sobre contraste disciplinar y la concesión conduce naturalmente a las condiciones.'],
      ['Lexical Resource', 'Emplea con flexibilidad “curricular isolation”, “implementation constraints”, “informed humility” e “intellectual confinement”.'],
      ['Grammatical Range & Accuracy', 'Controla con precisión cláusulas complejas y relaciones concesivas, manteniendo un estilo natural.'],
    ],
  }),

  'set-34': reference(34, {
    answer: `Empty shops and offices can remain unused for years while a city needs homes and active streets. Some people want owners to pay a charge when a property is vacant for a long time. I mostly agree because a charge can encourage use, but owners should not be punished when repair or legal problems are outside their control.

Long-term vacancy harms more than the owner. A row of closed shops makes a street feel unsafe and gives customers fewer reasons to visit the businesses that remain. Empty offices can also become damaged and require public services. Meanwhile, land in a central area is scarce. If an owner waits only for prices to rise, the wider community receives no benefit from a well-located building.

A charge changes this calculation. Keeping a property empty would have a cost, so the owner may lower the rent, sell it or convert it to another permitted use. The money collected could support improvements to the street or help small businesses. Public records of vacant properties would also show where planning or demand problems are concentrated.

However, not every empty building is being held for profit. A shop may need major safety work, an inheritance may be disputed, or a planning application may take many months. A new business can also fail to find a tenant during a weak economy. The charge should begin only after a reasonable period and exemptions should require evidence. It should rise gradually instead of creating a sudden large bill.

In conclusion, owners have rights over their buildings, but central vacancy imposes costs on neighbours and the city. A carefully designed charge can bring property back into use without treating every delay as deliberate neglect.`,
    verdict: 'Apoya la medida con una excepción razonable y explica incentivos, aunque no analiza el posible traslado del coste a futuros inquilinos.',
    criteria: [
      ['Task Response', 'Responde al grado de acuerdo, desarrolla el daño urbano y establece un periodo y excepciones para evitar injusticias.'],
      ['Coherence & Cohesion', 'La secuencia problema-incentivo-excepción es fácil de seguir, aunque algunos enlaces son muy explícitos.'],
      ['Lexical Resource', 'El vocabulario es suficiente para propiedad y ciudad, con repetición de “empty”, “owner”, “charge” y “property”.'],
      ['Grammatical Range & Accuracy', 'La redacción es mayormente precisa y combina distintos tipos de oración sin errores que dificulten la lectura.'],
    ],
  }, {
    answer: `Persistent vacancy in a busy city centre is not a purely private matter. It weakens surrounding trade, wastes infrastructure and can encourage physical decline. I support charging owners of shops or offices left unused for an extended period, but the policy must distinguish speculative withholding from genuine barriers to occupation.

Vacant premises create external costs. Continuous closed frontages reduce pedestrian activity and make neighbouring businesses less attractive, while neglected structures may require inspection, security or emergency intervention. Central land benefits from transport, utilities and public investment regardless of whether the owner contributes to street life. Where a viable building is deliberately withheld in anticipation of higher prices, the community effectively subsidises a private strategy.

A graduated charge can alter that incentive. Owners may accept a realistic rent, sell to someone prepared to renovate, or seek permission for a temporary or alternative use. Revenue could support façade improvements, meanwhile-use schemes or advice for independent tenants. More importantly, a vacancy register would reveal whether inactivity reflects individual behaviour or wider failures such as obsolete layouts and slow planning decisions.

The measure could backfire if liability begins too quickly. Major repairs, probate disputes, environmental remediation and delayed permits may make occupation impossible despite active effort. Weak local demand can also leave responsible owners without a tenant. A fair system should allow an initial period, require evidence of marketing and necessary work, and grant time-limited exemptions subject to review. Rates should increase with duration and building condition. Authorities must also monitor whether costs are simply added to rents after reoccupation.

In conclusion, long-term vacancy consumes the advantages of a central location without reciprocating its public investment. A carefully evidenced, escalating charge is justified because it targets avoidable inactivity while preserving relief for genuine obstacles. Combined with faster planning and support for adaptation, it can encourage use rather than merely raise revenue from decline.`,
    verdict: 'La respuesta fundamenta el cargo en costes externos, diferencia retención especulativa de obstáculos reales y añade medidas complementarias.',
    criteria: [
      ['Task Response', 'Evalúa beneficios, riesgos y diseño del cargo con una postura consistente y condiciones directamente aplicables.'],
      ['Coherence & Cohesion', 'La lógica de externalidad, incentivo y salvaguarda produce una progresión sólida y no repetitiva.'],
      ['Lexical Resource', 'Utiliza con precisión “closed frontages”, “speculative withholding”, “meanwhile-use schemes” y “probate disputes”.'],
      ['Grammatical Range & Accuracy', 'Las relaciones causales y condicionales se expresan mediante estructuras variadas y completamente controladas.'],
    ],
  }),

  'set-35': reference(35, {
    answer: `Reaching the final stage of recruitment takes considerable time, but unsuccessful applicants often receive only a short rejection. I agree that employers should give written feedback to finalists because it shows respect and can improve future applications. The feedback can be brief and should focus on the selection criteria.

Applicants who complete several interviews or a practical task have made a large effort. A useful explanation tells them whether they needed stronger experience, a clearer example or a different technical skill. Without it, they may repeat the same weakness in another interview. Written comments are also easier to remember than a quick telephone call and give every finalist a similar record.

The rule can improve employers as well. Recruiters must connect a decision to published criteria instead of relying on a general feeling. This may reveal unclear job descriptions or inconsistent scoring. A respectful rejection also protects the organisation's reputation because candidates may apply again or speak to other people about the process.

There are risks. Detailed feedback takes time and a poorly worded comment could create an argument. Employers cannot provide a long career consultation to every applicant, and they should not reveal private information about the successful candidate. A standard note with two strengths, one main gap and the relevant criterion would be enough. Comments must be factual and reviewed before sending.

In conclusion, finalists deserve more than an unexplained message after a demanding process. A legal requirement for concise, criterion-based feedback would help candidates and make recruitment more accountable without placing an unreasonable burden on employers.`,
    verdict: 'Sostiene el acuerdo y limita la carga mediante feedback breve y basado en criterios, aunque no trata situaciones de litigio con suficiente detalle.',
    criteria: [
      ['Task Response', 'Responde directamente, desarrolla beneficios para ambas partes y propone un alcance viable para la obligación.'],
      ['Coherence & Cohesion', 'Los párrafos están claramente delimitados y la propuesta surge de las objeciones, aunque la estructura es predecible.'],
      ['Lexical Resource', 'Usa vocabulario funcional sobre selección y comentarios, con repetición de “feedback”, “candidate” y “criterion”.'],
      ['Grammatical Range & Accuracy', 'La precisión es buena y las oraciones complejas son comprensibles, aunque predominan patrones relativamente seguros.'],
    ],
  }, {
    answer: `A candidate who reaches the final stage has supplied far more than a résumé: they may have completed interviews, assessments and unpaid preparation. Employers should therefore provide written feedback to every unsuccessful finalist. The duty should be concise and criterion-based, not an obligation to produce extensive coaching or disclose comparative personal information.

Feedback gives applicants a usable return on their investment. A generic rejection leaves them unable to distinguish between a missing qualification, an unconvincing example and a marginal difference among strong candidates. Specific comments can guide future preparation and reduce the discouragement caused by repeated opaque decisions. Written form also promotes consistency because candidates receive a record rather than relying on hurried telephone conversations.

The requirement can improve recruitment itself. Knowing that a decision must be explained encourages interviewers to define criteria before meeting candidates and document evidence consistently. It becomes harder to justify a vague impression that may conceal affinity bias or shifting expectations. Clear explanations can also protect an employer's reputation and preserve relationships with capable people who might suit a later vacancy.

There are legitimate concerns about workload, confidentiality and disputes. Feedback should not identify the successful candidate, rank finalists publicly or speculate about personality. A short template could state demonstrated strengths, the decisive gap and the criterion on which the decision rested, with an optional route for correcting factual errors rather than debating judgment. The obligation should apply only after the genuinely final stage, when the candidate pool is small, and employers should retain notes for a defined period.

In conclusion, concise written feedback is a proportionate exchange for the effort requested from finalists. It supports learning, disciplines organisational decision-making and makes rejection less arbitrary. Carefully limiting content and recipients addresses legal and administrative risks without returning to unexplained outcomes.`,
    verdict: 'La respuesta presenta el feedback como reciprocidad y disciplina decisoria, y acota contenido, destinatarios y mecanismo de corrección.',
    criteria: [
      ['Task Response', 'Desarrolla una postura firme, considera riesgos y ofrece un modelo proporcionado directamente vinculado a la etapa final.'],
      ['Coherence & Cohesion', 'La idea de intercambio proporcional integra beneficios individuales y organizativos y conduce a límites coherentes.'],
      ['Lexical Resource', 'Emplea con naturalidad “usable return”, “opaque decisions”, “affinity bias” y “decisive gap”.'],
      ['Grammatical Range & Accuracy', 'Mantiene control completo sobre estructuras complejas, incisos y enumeraciones sin pérdida de claridad.'],
    ],
  }),

  'set-36': reference(36, {
    answer: `Blood donation saves lives, and hospitals sometimes struggle to keep enough supplies. Some people suggest paying financial rewards to attract more donors. I disagree with direct cash payments because they may weaken trust and encourage people to hide health risks. Governments should remove the costs of donating and offer recognition instead.

Supporters of rewards have a simple argument. Giving blood takes time, can feel uncomfortable and may require travel. A payment could persuade a person who has never donated to make an appointment. It might be especially useful during a shortage, and regular rewards could make the supply more predictable.

However, money changes the meaning of the decision. A person who urgently needs cash may not mention recent illness or risky behaviour, even when screening questions are clear. Tests reduce danger but do not remove every early infection. Payment may also make existing voluntary donors feel that their contribution is now a business transaction. If they stop, the system could become more expensive without gaining many safe donations.

There are better ways to reduce barriers. Employers can give paid time to attend a donation centre, and governments can refund transport or provide mobile clinics. These are not profits; they prevent donors from losing money. Reminder systems, convenient appointments and public thanks can encourage regular participation. During a shortage, authorities should explain exactly which blood groups are needed rather than offer a higher price.

In conclusion, financial rewards might increase appointments quickly, but they create risks to honesty, trust and long-term voluntary supply. Governments should make donation easy and cost-free while keeping the act voluntary and unpaid.`,
    verdict: 'Mantiene un desacuerdo claro y distingue compensación de pago, aunque el efecto desmotivador sobre donantes voluntarios queda supuesto.',
    criteria: [
      ['Task Response', 'Responde al grado de acuerdo, reconoce el atractivo de los incentivos y desarrolla alternativas vinculadas a las barreras.'],
      ['Coherence & Cohesion', 'La progresión de argumento favorable a riesgo y alternativa es clara, aunque sigue un patrón muy visible.'],
      ['Lexical Resource', 'Usa vocabulario adecuado sobre donación y seguridad, con repetición de “payment”, “reward”, “donor” y “money”.'],
      ['Grammatical Range & Accuracy', 'Las estructuras son generalmente precisas y suficientemente variadas, sin errores que dificulten el significado.'],
    ],
  }, {
    answer: `A shortage of donated blood is urgent, but urgency does not make every incentive wise. I oppose financial rewards tied to the act of donation because they can distort disclosure, undermine the voluntary norm and shift recruitment toward people under economic pressure. Governments should instead reimburse genuine costs and invest in convenience, communication and retention.

Cash appears attractive because it assigns value to time and discomfort. It may increase first-time appointments and provide a direct lever during seasonal shortages. Yet the people most responsive to a modest payment are likely to be those for whom the sum matters most. That creates an ethical concern and a safety concern: a financially stressed donor may feel pressure to minimise disqualifying information. Laboratory screening is essential but cannot identify every infection immediately after exposure, so honest histories remain important.

Payment can also crowd out civic motivation. Existing donors may perceive that a shared public contribution has become a market exchange, while budgets begin purchasing units rather than building durable donor relationships. Once payments are established, reducing them may cause supply to fall. Moreover, a general reward does not necessarily recruit the blood groups, locations or repeat donors most needed by the system.

Policy should distinguish compensation from profit. Reimbursing transport, providing childcare and guaranteeing paid leave remove barriers without making blood a commodity. Mobile clinics, extended hours and reliable appointment systems reduce the time cost. Authorities can use targeted reminders, explain current needs transparently and recognise milestones without attaching cash to each unit. Any non-cash benefit should be evaluated for its effect on donor mix, truthful screening and repeat participation.

In conclusion, governments should spend more on donors, but not by buying their blood. Removing practical losses and respecting volunteers is safer and more sustainable than a reward that may concentrate risk among those least able to refuse it.`,
    verdict: 'La respuesta separa reembolso y beneficio, evalúa selección y motivación y propone una estrategia sostenible de retención.',
    criteria: [
      ['Task Response', 'Examina el incentivo, sus riesgos y alternativas con una posición inequívoca y plenamente desarrollada.'],
      ['Coherence & Cohesion', 'La distinción entre pago y eliminación de barreras organiza el ensayo y conecta todos los párrafos.'],
      ['Lexical Resource', 'Utiliza de forma precisa “distort disclosure”, “crowd out civic motivation”, “donor mix” y “repeat participation”.'],
      ['Grammatical Range & Accuracy', 'La sintaxis compleja y los contrastes se manejan con control sostenido y gran claridad.'],
    ],
  }),

  'set-37': reference(37, {
    answer: `Clean drinking water is a basic need, but restaurants and cafés are private businesses. Some people think they should give free water to anyone, including non-customers. I partly agree. Larger businesses in busy public areas should normally provide tap water, but very small cafés need practical limits.

The main argument is health. A person may be walking in hot weather, taking medicine or caring for a child and need a small amount of water quickly. Requiring a purchase can exclude someone with no money or no need for food. Free tap water can also reduce plastic waste because people refill a bottle instead of buying another one.

For a business, each glass seems cheap, but there are other costs. Staff must stop serving customers, wash cups and manage queues. A tiny café with one worker and limited space may have many people entering only for water or a toilet. If a rule has no limits, the owner carries a public-service responsibility without support. Bottled water should not have to be free because packaging and transport have a clear cost.

A reasonable rule would cover safe tap water in a customer's own container, or a simple reusable cup where this is available. Businesses could refuse when the water supply is interrupted, when a crowd creates a safety problem, or when the request is clearly excessive. Cities should also install public fountains so cafés are not the only source.

In conclusion, access to a modest amount of tap water is more important than the very small cost for most restaurants. The duty should be simple and limited, with exemptions for genuine practical difficulty and wider investment in public refill points.`,
    verdict: 'Sostiene un acuerdo parcial con límites operativos, aunque el criterio de tamaño empresarial no queda definido ni justificado con precisión.',
    criteria: [
      ['Task Response', 'Responde al grado de acuerdo, desarrolla salud, residuos y carga privada y propone una obligación limitada.'],
      ['Coherence & Cohesion', 'La secuencia de necesidad, coste y solución es clara, aunque algunos ejemplos se acumulan en listas.'],
      ['Lexical Resource', 'El léxico es suficiente y pertinente, con repetición de “water”, “business”, “free” y “cost”.'],
      ['Grammatical Range & Accuracy', 'La mayoría de oraciones son precisas y bien controladas; el rango complejo es adecuado pero no amplio.'],
    ],
  }, {
    answer: `A request for a glass of water places a trivial material cost on most restaurants, yet refusing it can impose a serious cost on someone who is dehydrated or unable to purchase anything. I support a duty to provide a reasonable quantity of safe tap water, including to non-customers, while recognising narrow exemptions and the need for public fountains.

The public-interest case combines health and waste reduction. Heat, medication, pregnancy or unexpected illness can make immediate hydration important. Conditioning access on a purchase turns a basic need into a test of money and commercial participation. Refill access also reduces demand for single-use bottles, an environmental benefit that extends beyond the person making the request. Food businesses already possess sinks, potable supplies and routines for handling drinking vessels, so the marginal burden is usually low.

Nevertheless, premises differ. A one-person kiosk cannot absorb an unlimited queue without delaying paying customers, and washing reusable cups consumes labour and water. Staff may face disorder if the rule is interpreted as a right to enter restricted areas or remain indefinitely. Businesses should not be required to give away packaged water, whose container, storage and transport carry real costs.

The obligation should therefore be modest and specific: a reasonable refill of tap water during opening hours, preferably into the requester's clean container, with a basic reusable cup where practicable. Temporary refusal should be allowed for contamination, supply interruption, immediate safety problems or clearly abusive quantities. Authorities should publish simple guidance rather than force staff to judge personal need. They must also install and maintain public refill points so commercial premises serve as a safety net, not the primary water network.

In conclusion, a limited tap-water duty is proportionate because the benefit in health, dignity and reduced plastic substantially exceeds the ordinary cost. Clear boundaries protect small operators while preventing a basic resource from being withheld solely because a person has not bought something.`,
    verdict: 'La respuesta fundamenta la obligación en proporcionalidad, distingue agua de red y envasada y distribuye responsabilidad entre comercios y ciudad.',
    criteria: [
      ['Task Response', 'Desarrolla una postura firme, aborda las cargas empresariales y especifica excepciones y alcance de forma completa.'],
      ['Coherence & Cohesion', 'La noción de obligación limitada integra los beneficios, objeciones y diseño regulatorio sin contradicciones.'],
      ['Lexical Resource', 'Emplea con precisión “commercial participation”, “marginal burden”, “abusive quantities” y “safety net”.'],
      ['Grammatical Range & Accuracy', 'Mantiene control completo de cláusulas relativas, concesivas y condicionales con puntuación natural.'],
    ],
  }),

  'set-38': reference(38, {
    answer: `A four-day week can mean doing the same weekly hours in longer days, not working fewer hours. Some employees value the extra day away from work, while others prefer five shorter days. I think workers should be allowed to choose four days when the role and service needs make it possible.

The clearest benefit is a full free day. An employee can attend an appointment, care for family or complete household tasks without using annual leave. Travelling to work four times instead of five also saves money and time. Some people may concentrate better because they have a longer weekend and fewer separate starts to the working week.

However, longer days can be tiring. After nine or ten hours, a person may make more mistakes or have little energy for children in the evening. The schedule is difficult for jobs involving physical effort or constant attention. It can also create childcare problems because nurseries may close before the employee finishes. Customers may still need service on five days, so a whole team cannot always take the same day off.

For these reasons, the arrangement should be voluntary and reviewed. Employers can stagger free days so the organisation remains open, and they should check safety, workload and customer response. Workers must be able to return to five days without losing career opportunities. Overtime should not quietly turn the longer days into even more excessive hours.

In conclusion, a compressed week offers valuable flexibility but is not suitable for every person or job. Allowing it where practical is better than making it either compulsory or impossible. Real choice and monitoring are necessary for the benefit to be fair.`,
    verdict: 'Discute ambas opciones y apoya elección condicionada, aunque la relación entre fatiga, productividad y tipo de trabajo queda general.',
    criteria: [
      ['Task Response', 'Aborda beneficios y desventajas, ofrece una opinión clara y añade condiciones sobre voluntariedad y continuidad del servicio.'],
      ['Coherence & Cohesion', 'La progresión es comprensible y el párrafo de implementación responde a las objeciones, aunque los enlaces son convencionales.'],
      ['Lexical Resource', 'Usa vocabulario apropiado sobre jornada y flexibilidad, con repetición de “days”, “work”, “longer” y “employee”.'],
      ['Grammatical Range & Accuracy', 'La redacción es precisa y variada en un nivel suficiente, pero se apoya principalmente en patrones seguros.'],
    ],
  }, {
    answer: `Compressing unchanged weekly hours into four days exchanges daily intensity for an additional day of autonomy. Neither schedule is universally superior. Employees should be permitted to request a four-day pattern where safety and service continuity allow it, while retaining a genuine option to remain on five days.

The compressed schedule can reduce commuting and create a predictable block for care, appointments, study or rest. Unlike occasional remote work, the free day is visible and can be planned. Some organisations may benefit from longer opening hours across staggered teams, and fewer daily handovers can support concentrated project work. Recruitment may also improve when employees value schedule control more than a modest salary difference.

The same arrangement can intensify inequality and fatigue. Ten-hour shifts are demanding in clinical, physical or safety-critical roles, and concentration may deteriorate late in the day. Parents can face childcare hours that do not match the extended shift, while workers with disabilities or long commutes may find the pattern exhausting. If meetings and messages continue on the nominal day off, compression becomes unpaid availability rather than flexibility. Customers also lose access if every employee takes the same closure day.

Permission should therefore operate through a transparent request process. Employers may refuse for evidenced operational reasons, not managerial preference, and should consider staggered rest days before rejecting the model. Trials should measure errors, absence, overtime, customer coverage and employee wellbeing. Participation must be reversible, with equal access to promotion and training for both schedules. Existing limits on breaks and maximum daily hours remain essential.

In conclusion, the strongest advantage of a compressed week is control over time, whereas its principal risk is transferring work strain into longer days. Allowing rather than imposing the pattern preserves that benefit. A monitored, reversible choice can broaden flexibility without pretending that every role or household experiences ten-hour shifts in the same way.`,
    verdict: 'La respuesta distingue autonomía de reducción de horas y diseña un derecho de solicitud reversible basado en evidencia operativa.',
    criteria: [
      ['Task Response', 'Examina plenamente ambas jornadas y presenta una opinión matizada con salvaguardas concretas sobre acceso y fatiga.'],
      ['Coherence & Cohesion', 'El contraste entre autonomía e intensidad organiza de forma coherente beneficios, riesgos y aplicación.'],
      ['Lexical Resource', 'Usa con flexibilidad “daily intensity”, “staggered teams”, “nominal day off” y “evidenced operational reasons”.'],
      ['Grammatical Range & Accuracy', 'Controla estructuras subordinadas y paralelas complejas sin errores perceptibles y con gran claridad.'],
    ],
  }),

  'set-39': reference(39, {
    answer: `Museums often explain an object or event through one clear story. Some people believe they should also show unresolved evidence and competing interpretations. I agree because uncertainty is part of history and science, but exhibitions must guide visitors instead of presenting a confusing list of opinions.

A single account is easy to follow, especially for children or people with little previous knowledge. Labels have limited space, and visitors may only spend a few minutes in each room. If every disagreement is included, the main facts can disappear. Museums also have a responsibility not to give an unsupported claim the same status as strong evidence.

However, one confident story can hide how knowledge is produced. Archaeologists may disagree about the use of an object, or historical sources may describe the same event from different positions. Showing this helps visitors understand that interpretation depends on evidence. It can also include communities whose experiences were ignored in older displays and prevent the museum from appearing to possess a final answer.

The solution is to organise uncertainty clearly. A label can state what most specialists agree on, identify the evidence, and then explain one or two serious alternatives. Different colours or questions can separate fact from interpretation. Digital displays may offer more detail for visitors who want it. Museums should explain why one view is stronger rather than treating every claim equally.

In conclusion, unresolved evidence belongs in museums because honest learning includes limits and debate. A clear account is still necessary, but it should be presented as the best current explanation, not an unquestionable truth.`,
    verdict: 'Apoya la pluralidad con una jerarquía de evidencia, aunque el tratamiento de voces comunitarias queda mencionado y no desarrollado.',
    criteria: [
      ['Task Response', 'Responde al grado de acuerdo, reconoce el valor de claridad y propone cómo presentar alternativas sin falsa equivalencia.'],
      ['Coherence & Cohesion', 'El ensayo avanza de la objeción a la justificación y al diseño de exposición con una secuencia clara.'],
      ['Lexical Resource', 'El vocabulario es adecuado para museos y evidencia, aunque repite “evidence”, “view”, “account” y “interpretation”.'],
      ['Grammatical Range & Accuracy', 'La comunicación se mantiene precisa con variedad suficiente y estructuras complejas generalmente seguras.'],
    ],
  }, {
    answer: `Museums do not merely store objects; they frame relationships between evidence and public memory. I agree that they should present unresolved evidence and credible competing interpretations rather than convert every subject into one seamless account. Clarity remains essential, but clarity should describe the state of knowledge, including its limits.

One authoritative narrative offers practical advantages. Visitors have limited time, labels cannot reproduce scholarly literature, and novices need orientation before confronting disagreement. Museums must also avoid false balance: a well-supported conclusion should not be displayed as equivalent to speculation simply because both exist. An exhibition consisting only of open questions can leave visitors uncertain about even the evidence specialists broadly accept.

Nevertheless, suppressing serious uncertainty misrepresents how knowledge develops. An artefact may permit several functions; archival records may reflect the interests of those powerful enough to create them; scientific reconstructions may change when new methods appear. Presenting these tensions teaches visitors to distinguish observation from inference. It can also reveal why communities interpret collections differently and why an older institutional label may no longer be adequate.

Good design can preserve hierarchy without pretending to finality. Exhibitions should first identify agreed evidence and its provenance, then state the leading interpretation and the reasons supporting it. Credible alternatives can be introduced alongside the evidence they explain better or worse. Visual layers, concise questions and optional digital material allow visitors to choose depth. Curators should specify whether disagreement arises from missing data, different values or incompatible methods, and update displays when the evidential balance changes.

In conclusion, a museum earns trust not by sounding certain about everything but by showing how responsible conclusions are reached. Presenting unresolved evidence makes interpretation visible and invites informed judgment. When alternatives are weighted rather than merely listed, intellectual honesty strengthens rather than undermines a clear public account.`,
    verdict: 'La respuesta defiende incertidumbre jerarquizada, diferencia observación e inferencia y propone recursos expositivos que evitan falsa equivalencia.',
    criteria: [
      ['Task Response', 'Explora plenamente la tensión entre claridad y pluralidad y mantiene una postura precisa con soluciones aplicables.'],
      ['Coherence & Cohesion', 'La tesis sobre confianza y estado del conocimiento conecta de forma orgánica cada etapa del argumento.'],
      ['Lexical Resource', 'Emplea con precisión “public memory”, “false balance”, “observation from inference” y “evidential balance”.'],
      ['Grammatical Range & Accuracy', 'La variedad sintáctica es amplia y se controla con puntuación precisa y natural durante todo el ensayo.'],
    ],
  }),

  'set-40': reference(40, {
    answer: `New city-centre buildings usually use the ground floor for shops, cafés or offices. Some people propose reserving part of it for non-commercial community use. This can create useful local space but also reduces rent and may produce empty rooms. I support a modest requirement in large developments.

The main advantage is access. Community groups often cannot afford central rent, even though residents need places for meetings, advice, children's activities or quiet study. Ground-floor space is visible and easier to enter for people with mobility difficulties. It can bring life to a street at times when shops are closed and help new residents meet people outside their building.

There are disadvantages. A developer loses commercial income and may add the cost to apartments or other rents. A community room also needs cleaning, insurance and management. If no local group has the capacity to run it, the space can stay locked while a useful shop is prevented from opening. Arguments may develop about which group receives the best times.

The policy should therefore be flexible. It could apply only above a certain building size and allow a small percentage rather than a fixed large room. Developers should consult local organisations before construction and provide an accessible basic finish. A trust or residents' board can manage bookings, while temporary commercial use could be allowed if the community space remains unused for a long period.

In conclusion, reserving some ground-floor area can make development serve more than property owners and customers. The advantages outweigh the disadvantages when the requirement is limited, based on local demand and supported by a clear management plan.`,
    verdict: 'Explica beneficios y costes y ofrece una opinión condicionada, aunque el mecanismo de financiación continua del espacio queda incompleto.',
    criteria: [
      ['Task Response', 'Responde ventajas, desventajas y opinión, y propone límites relacionados con escala, demanda y gestión.'],
      ['Coherence & Cohesion', 'La progresión es lógica y fácil de seguir, aunque el texto utiliza una estructura de problema y solución bastante regular.'],
      ['Lexical Resource', 'Maneja vocabulario funcional sobre desarrollo y comunidad, con repetición de “space”, “community”, “building” y “use”.'],
      ['Grammatical Range & Accuracy', 'La sintaxis es estable y suficientemente variada, con precisión alta dentro de patrones relativamente seguros.'],
    ],
  }, {
    answer: `Ground floors determine how private development meets the public street. Reserving a proportion for non-commercial community use can secure accessible social infrastructure where land values would otherwise exclude it. I support the proposal for substantial city-centre projects, provided that local demand, long-term management and financial responsibility are established before construction.

The principal advantage is locational equity. Advice services, neighbourhood associations, youth activities and informal study spaces benefit from visible, step-free premises near transport, yet these groups rarely compete with retail rents. A protected unit can keep civic activity within a district as property values rise. It may also diversify street life: people enter for purposes other than consumption, and evening or weekend use can animate frontages when offices are closed.

The costs are not negligible. Foregone rent may reduce project viability or be transferred to housing and commercial tenants. A room without funding for staff, maintenance and insurance can become a locked symbolic concession. Demand also changes over time, while a rigid planning condition may preserve an unsuitable layout. Allocation can favour the most organised groups rather than residents with the greatest need, creating conflict over access.

Policy should therefore require a community-use plan, not merely floor area. Above a development threshold, the builder could provide a modest accessible unit, an endowment or discounted lease, and evidence of consultation with local organisations. An independent community trust should publish booking and allocation rules. Periodic review could permit another non-commercial use, or carefully limited temporary letting, when the original model fails, while protecting the asset from permanent conversion to ordinary retail.

In conclusion, reserving ground-floor space can return part of the value created by a central location to the wider community. Its advantages outweigh the opportunity cost only when provision is usable, funded and accountable. A flexible but protected community asset would strengthen city-centre development more effectively than either an inflexible empty room or reliance on the commercial market alone.`,
    verdict: 'La respuesta concibe la reserva como infraestructura social, evalúa costes de oportunidad y propone gobernanza y revisión sin perder protección.',
    criteria: [
      ['Task Response', 'Desarrolla completamente ventajas, desventajas y opinión y vincula la postura a condiciones verificables.'],
      ['Coherence & Cohesion', 'La noción de encuentro entre desarrollo privado y calle pública organiza el argumento de principio a fin.'],
      ['Lexical Resource', 'Usa léxico exacto y flexible como “locational equity”, “animate frontages”, “symbolic concession” y “opportunity cost”.'],
      ['Grammatical Range & Accuracy', 'Mantiene un control sofisticado de estructuras concesivas, nominalización y subordinación sin errores perceptibles.'],
    ],
  }),
};
