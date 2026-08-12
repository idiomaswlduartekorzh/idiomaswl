/**
 * Los doce ejercicios del motor de mapas.
 *
 * POR QUÉ CAMBIARON DE MAPA
 *
 * Medido el 12 de agosto de 2026: **5 de las 12 respuestas estaban contenidas en una frase
 * modelo de la lección**, dos de ellas con el 100 % de sus palabras. La lección trabaja cinco
 * mapas —centro urbano, campus, pueblo costero, parque y centro comercial— con 25 frases
 * modelo, y el motor preguntaba sobre esos mismos cinco.
 *
 * Igual que en procesos, la corrección sale barata porque **este motor no pinta ningún
 * gráfico**: es texto. Los doce ejercicios se han mudado a mapas que la lección no trabaja
 * —un hospital, una terminal de aeropuerto, un colegio, un muelle industrial y una granja— y
 * la lección conserva sus 25 frases modelo intactas.
 *
 * CADA OPCIÓN LLEVA SU MOTIVO. Antes había una explicación para las cuatro.
 */

export type Option = { text: string; why: string }

export type MapDrill = {
  level: 1 | 2 | 3
  title: string
  prompt: string
  options: Option[]
  /** Índice tal y como está escrito; la posición de pantalla la reparte `placeOption`. */
  correct: number
}

export const MAP_DRILLS: MapDrill[] = [
  // ── Level 1 · reportar el cambio visible ───────────────────────────────────
  {
    level: 1, title: 'Level 1 · Report the visible change',
    prompt: 'On a hospital site, an old ward building in the east becomes a car park. Which sentence reports the change?',
    correct: 0,
    options: [
      { text: 'The ward building in the eastern part of the site was demolished and replaced by a car park.', why: 'Correct. Original feature, new feature and location, with no reason and no opinion attached.' },
      { text: 'The ward building was demolished because the hospital needed somewhere for staff to park.', why: 'A map shows what changed, never why. The moment you write “because”, you have left the visual.' },
      { text: 'The new car park made the hospital considerably easier for visitors to reach by car.', why: 'Convenience is not drawn on a map. This judges the change instead of describing it.' },
      { text: 'The ward building in the eastern part of the site was moved across to the western side.', why: 'Nothing was moved: it was replaced. Relocating a feature that was demolished misreports the map.' },
    ],
  },
  {
    level: 1, title: 'Level 1 · Choose precise map language',
    prompt: 'A single-runway airport gains a second runway alongside the first. Which sentence uses map language accurately?',
    correct: 0,
    options: [
      { text: 'A second runway was constructed parallel to the existing one on the northern side.', why: 'Correct. “Constructed” for something new, plus a spatial relationship the map actually shows.' },
      { text: 'The runway rose steadily across the period covered by the two airport maps shown.', why: '“Rose steadily” is line-graph language. Maps have no quantities to rise or fall.' },
      { text: 'A second runway was built because passenger numbers had grown over those years.', why: 'Passenger numbers are not on a map, so the reason for the second runway is invented.' },
      { text: 'The original runway was widened into a second runway on the northern side of the site.', why: 'Widening one runway and building another are different changes. Only one of them is drawn.' },
    ],
  },
  {
    level: 1, title: 'Level 1 · Name the location precisely',
    prompt: 'A school playground is replaced by a science block in the south-western corner. Which phrase names the location?',
    correct: 0,
    options: [
      { text: 'in the south-western corner of the school grounds', why: 'Correct. Compass direction plus the area it belongs to: the reader can find it on the map.' },
      { text: 'at some point during the second stage of the work', why: 'That is process language. A map has places, not stages in a sequence.' },
      { text: 'at a considerably higher proportion than before', why: 'Proportions belong to pie charts. There is nothing to take a share of on a map.' },
      { text: 'between the year 2000 and the year 2020 overall', why: 'A period, not a place. It answers when, and the question asked where.' },
    ],
  },
  {
    level: 1, title: 'Level 1 · Describe a change without adding a reason',
    prompt: 'An industrial dock becomes a row of apartment blocks. Which verb phrase describes the change and nothing more?',
    correct: 0,
    options: [
      { text: 'was redeveloped as a row of apartment blocks', why: 'Correct. It reports the transformation the two maps show, and stops there.' },
      { text: 'became popular because the city wanted more housing', why: 'Popularity and intention are both invisible on a map. Two inventions in one phrase.' },
      { text: 'increased sharply into a row of apartment blocks', why: '“Increased sharply” describes a line on a graph, not a building replacing another.' },
      { text: 'was similar to a row of apartment blocks in 2020', why: 'Similarity is not change. The dock did not resemble the flats: it was replaced by them.' },
    ],
  },

  // ── Level 2 · agrupar y resumir ────────────────────────────────────────────
  {
    level: 2, title: 'Level 2 · Choose the overview',
    prompt: 'A hospital site gains a new wing, a car park and a wider access road, while the main entrance stays. Which overview works?',
    correct: 0,
    options: [
      { text: 'Overall, the site was expanded and its access improved, although the main entrance remained where it was.', why: 'Correct. It groups the additions, notes what survived, and quotes no individual feature.' },
      { text: 'Overall, the new wing stands immediately to the north of the widened access road on the site.', why: 'A precise location is Body 1 detail. In the overview it narrows the summary to one building.' },
      { text: 'Overall, the number of patients treated at the hospital doubled across the period shown.', why: 'Maps show places, not people. There is no patient figure anywhere on them.' },
      { text: 'Overall, the redevelopment of the hospital site was a considerable success for the city.', why: 'Success is a judgement. The maps show what was built, not whether it worked.' },
    ],
  },
  {
    level: 2, title: 'Level 2 · Group the changes',
    prompt: 'An airport gains a runway in the north, a terminal in the north, and a rail link and car park in the south. How should the response be organised?',
    correct: 0,
    options: [
      { text: 'Group the northern additions in one paragraph and the southern transport links in the other.', why: 'Correct. Two areas, two paragraphs: the reader can follow the map instead of jumping around it.' },
      { text: 'Describe every labelled feature in clockwise order, even the ones that did not change at all.', why: 'Clockwise is the map’s layout, not its meaning, and unchanged features do not need a sentence each.' },
      { text: 'Write one paragraph about what improved and another about what got worse for passengers.', why: 'Better and worse are judgements. The maps record what is there, not how it feels to use.' },
      { text: 'Cover only the new terminal, since it is by far the largest of the new structures shown.', why: 'Size does not decide relevance. Three other changes would go unreported.' },
    ],
  },
  {
    level: 2, title: 'Level 2 · Choose a Body 1 focus',
    prompt: 'A school gains a science block and a sports hall in the south, plus a car park and a new gate in the north. Which Body 1 focus is logical?',
    correct: 0,
    options: [
      { text: 'The southern half: the playground gave way to a science block and the field to a sports hall.', why: 'Correct. One area, both of its changes, leaving the northern half with something to say.' },
      { text: 'Every single building on the site, listed one by one from the northern boundary down to the southern one.', why: 'Listing the whole map in Body 1 leaves Body 2 repeating it. The point of two paragraphs is to split.' },
      { text: 'How the students feel about studying in the new science block and sports hall.', why: 'Opinions are not on a map, and nobody was asked. This describes a survey that does not exist.' },
      { text: 'Predictions about how the school grounds are likely to look in twenty years’ time.', why: 'The maps stop at the later year. Task 1 never goes beyond what is drawn.' },
    ],
  },
  {
    level: 2, title: 'Level 2 · Report a retained feature',
    prompt: 'The chapel at the centre of the hospital site appears unchanged on both maps. Which sentence reports that?',
    correct: 0,
    options: [
      { text: 'The chapel at the centre of the site remained in place throughout the period.', why: 'Correct. “Remained in place” is the standard way to report a feature that survives unchanged.' },
      { text: 'The chapel at the centre of the site was replaced by a chapel of the same size.', why: 'Replaced by itself is a contradiction. If nothing changed, nothing was replaced.' },
      { text: 'The chapel at the centre of the site increased steadily across the whole period.', why: 'Buildings do not increase. This is graph language applied to a place.' },
      { text: 'The chapel at the centre of the site was more successful than the new buildings.', why: 'Success cannot be read off a map, and an unchanged feature is not competing with anything.' },
    ],
  },

  // ── Level 3 · sintetizar con precisión ─────────────────────────────────────
  {
    level: 3, title: 'Level 3 · Produce a complete overview',
    prompt: 'A farm becomes a suburb: fields become housing, a barn becomes a school and a track becomes a paved road.',
    correct: 0,
    options: [
      { text: 'Overall, the area was transformed from farmland into a residential suburb with its own services and roads.', why: 'Correct. It names the change of character, which is what an overview of a map is for.' },
      { text: 'Overall, the barn in the eastern corner of the farm was converted into a primary school.', why: 'One change, precisely located. That is the first sentence of Body 1, not the overview.' },
      { text: 'Overall, the population of the area rose sharply once the new houses had been completed.', why: 'Houses are on the map; people are not. There is no population figure to report.' },
      { text: 'Overall, the farmland was worth far more to the owners once it had been built on.', why: 'Land value appears nowhere. The maps show what stands where, and nothing about money.' },
    ],
  },
  {
    level: 3, title: 'Level 3 · Combine location, change and contrast',
    prompt: 'On the dock, warehouses in the west became apartments while the eastern quay became a marina. Which sentence combines both?',
    correct: 0,
    options: [
      { text: 'The warehouses in the west were converted into apartments, while the eastern quay became a marina.', why: 'Correct. Two supported changes, each with its location, joined by a connector that contrasts them.' },
      { text: 'The warehouses were converted into apartments so that the marina would attract more visitors.', why: 'The purpose links two changes that the maps simply show side by side. Nothing connects them.' },
      { text: 'The marina in the east was built on the site of the warehouses that stood in the west.', why: 'The two sites have been merged. The warehouses became apartments; the quay became the marina.' },
      { text: 'The warehouses in the west were extended into a larger set of warehouses for storage.', why: 'They were replaced, not extended. Extension and replacement are different changes.' },
    ],
  },
  {
    level: 3, title: 'Level 3 · Avoid turning the map into a list',
    prompt: 'The school gained a science block, a sports hall, a car park and a new gate. Which sentence avoids a list?',
    correct: 0,
    options: [
      { text: 'The southern half gained teaching and sports facilities, whereas the northern half was given better vehicle access.', why: 'Correct. Four changes become two functional groups, each tied to an area of the map.' },
      { text: 'There was a playground. There was a field. There was a fence. There was a gate on the road.', why: 'Four sentences of identical shape and not one change reported. This is the list in its purest form.' },
      { text: 'The school changed a great deal because the local council increased its education budget.', why: 'A budget is not on the map, and one clause cannot stand in for four separate changes.' },
      { text: 'The map has four corners, and something different was built in each one of them.', why: 'Describing the frame instead of the content. Corners are not a way of grouping changes.' },
    ],
  },
  {
    level: 3, title: 'Level 3 · Open a response with no dates',
    prompt: 'Two airport maps are labelled only “before” and “after”, with no years given. Which opening is accurate?',
    correct: 0,
    options: [
      { text: 'The maps compare the layout of an airport before and after an extension was carried out.', why: 'Correct. With no years on the maps, “before and after” is the only framing the visual supports.' },
      { text: 'The maps show the percentage of flights handled by the airport over a twenty-year period.', why: 'Two inventions at once: a percentage that is not there and a period the maps do not give.' },
      { text: 'The maps prove that the extension of the airport was a financially sound investment.', why: 'A map cannot prove anything about money. It shows where things are.' },
      { text: 'The maps explain why the airport authority decided to build a second runway there.', why: 'Maps show what, never why. The reason for the decision is nowhere on them.' },
    ],
  },
]
