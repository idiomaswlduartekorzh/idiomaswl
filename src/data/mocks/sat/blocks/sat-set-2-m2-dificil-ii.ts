import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

export const items: MCQQuestion[] = [
  {
    id: 'q09', type: 'mcq', part: 1,
    stimulus: 'A scientific model is not a miniature copy of everything in nature. A model of a river may include slope, channel width, and rainfall while leaving out every individual stone. Those omissions are not necessarily flaws. By simplifying, the model lets researchers isolate relationships that would be difficult to see in the full river. Its value depends on whether the selected features are appropriate for the question being asked.',
    text: 'Which choice best states the main idea of the text?',
    options: ['A model can be useful because it selects features relevant to a question rather than reproducing every detail.', 'River models fail when they omit stones that influence the movement of water.', 'The most accurate scientific model is always the one containing the largest number of variables.', 'Researchers use simplified models only when direct observation of every natural feature under real conditions is completely impossible.'],
    answer: 0,
  },
  {
    id: 'q10', type: 'mcq', part: 1,
    stimulus: 'Researchers studying a songbird found that city males began singing earlier before sunrise than rural males. Artificial light seemed an obvious explanation, but the pattern remained when birds were housed under identical darkness. City birds also had higher daytime metabolic rates, and individuals with the highest rates began singing earliest. The researchers propose that urban food and temperature conditions may shift daily energy use, indirectly changing the timing of song.',
    text: 'Which choice best states the main idea of the text?',
    options: ['Artificial night lighting permanently increases the daytime metabolic rate of every urban bird across all seasons and housing conditions.', 'Rural birds sing later because darkness prevents them from finding enough food before sunrise.', 'Earlier urban song may be linked to altered energy use rather than directly to exposure to artificial light.', 'City temperature and food conditions cause all songbird species to sing before sunrise.'],
    answer: 2,
  },
  {
    id: 'q11', type: 'mcq', part: 1,
    stimulus: 'The committee expected Asha to defend her proposal immediately. Instead, she asked each critic to name the single assumption that troubled them most. She wrote the answers in four columns and noticed that three objections depended on the same estimate of future enrollment. “Then that is the number we test first,” she said, closing the rest of her slides. The meeting shifted from four competing arguments to one calculation everyone could inspect.',
    text: 'Which quotation best supports the claim that Asha turns broad criticism into a specific question the group can evaluate?',
    options: ['“The committee expected Asha to defend her proposal immediately.”', '“three objections depended on the same estimate of future enrollment”', '“She wrote the answers in four columns”', '“closing the rest of her slides”'],
    answer: 1,
  },
  {
    id: 'q12', type: 'mcq', part: 1,
    stimulus: 'Linguist Noor Patel argues that a change in coastal place names reflects regular trade with inland communities rather than a single migration. In the oldest records, inland-derived names appear only at major ports. Over the next century, related names occur gradually along minor coves between those ports. Patel reasons that repeated contact would produce this spreading pattern, whereas one migration would more likely introduce the names across the coast within a shorter interval.',
    text: 'Which finding, if true, would most strongly support Patel\'s argument?',
    options: ['Several major ports had two different names in the oldest surviving records.', 'Some inland communities used coastal products in ceremonies during the period studied.', 'The oldest coastal names came from a language no longer spoken in either region.', 'Dated shipping records show inland traders visiting minor coves in the same sequence that the related names first appear.'],
    answer: 3,
  },
  {
    id: 'q13', type: 'mcq', part: 1,
    stimulus: 'A materials team tested how adding plant fibers affected clay tiles. Each value is an average from ten tiles.\n\nPlant fiber in mixture | Cracking force | Water absorbed\n0% | 510 N | 8%\n2% | 570 N | 10%\n4% | 615 N | 14%\n6% | 590 N | 19%\n\nThe team seeks a mixture that increases resistance to cracking without maximizing water absorption.',
    text: 'Which choice best supports selecting the 4% mixture rather than the 6% mixture?',
    options: ['The 4% mixture resisted 25 more newtons while absorbing five percentage points less water than the 6% mixture.', 'The 6% mixture absorbed more than twice as much water as the mixture containing no fiber.', 'Both mixtures containing at least 4% fiber resisted more force than the 2% mixture.', 'The 4% mixture absorbed six percentage points more water than the mixture containing no fiber.'],
    answer: 0,
  },
  {
    id: 'q14', type: 'mcq', part: 1,
    stimulus: 'At the pottery workshop, visitors praised the bowls with perfectly even rims. Mateo kept one uneven bowl behind his wheel. Its left side rose slightly higher because the clay had slipped under his hand, but a painted line followed the rise so naturally that the imbalance looked intentional. Before teaching beginners, Mateo placed that bowl where they could see it. He never explained the mistake unless someone asked why the line climbed.',
    text: 'Which conclusion is best supported by the text?',
    options: ['Mateo believes beginners should discard any bowl that does not have an even rim.', 'Visitors prefer uneven bowls once they learn how difficult pottery can be.', 'Mateo uses the bowl to show that an error can become part of a considered design.', 'Mateo hides the bowl because the painted line makes its defect more noticeable.'],
    answer: 2,
  },
  {
    id: 'q15', type: 'mcq', part: 1,
    stimulus: 'A team monitored two populations of the same mountain plant. At the lower site, snow melted three weeks earlier, flowering began sooner, and bees visited frequently during the first flowering days. At the higher site, later flowering coincided with fewer bees, yet a larger share of visited flowers produced seed. Pollen tests showed that high-site bees carried pollen from fewer plant species than low-site bees did.',
    text: 'Which conclusion is best supported by the text?',
    options: ['Earlier snowmelt always causes a larger proportion of flowers to produce seed.', 'The greater seed production per visit at the high site may be related to bees carrying less pollen from other species.', 'High-site plants flower later because bees visit them less frequently.', 'Low-site bees carry fewer kinds of pollen because more flowers are available there.'],
    answer: 1,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q09', domain: 'II', tipo: 'central-ideas-details', dificultad: 1, tema: 'ciencia', razones: {
    A: 'Correcta: la selección y la simplificación permiten aislar relaciones pertinentes a una pregunta.', B: 'Las piedras son ejemplo de un detalle que puede omitirse.', C: 'Más variables no garantizan adecuación al objetivo.', D: 'El texto no limita los modelos a situaciones imposibles de observar.' }, fuenteHecho: 'Explicación epistemológica original.' },
  { id: 'q10', domain: 'II', tipo: 'central-ideas-details', dificultad: 3, tema: 'ciencia', razones: {
    A: 'La diferencia persiste sin luz y no se demuestra permanencia ni universalidad.', B: 'No se midió búsqueda de alimento antes del amanecer.', C: 'Correcta: el metabolismo se asocia con el horario incluso bajo oscuridad idéntica.', D: 'La propuesta es tentativa y se refiere a la población estudiada.' }, fuenteHecho: 'Ave, alojamiento y resultados inventados.' },
  { id: 'q11', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 2, tema: 'humanidades', razones: {
    A: 'Solo establece la expectativa inicial del comité.', B: 'Correcta: identifica una estimación común que convierte tres objeciones en una prueba concreta.', C: 'Organizar respuestas ayuda, pero no revela el punto evaluable compartido.', D: 'Cerrar diapositivas muestra cambio de estrategia sin nombrar qué van a probar.' }, fuenteHecho: 'Reunión y propuesta inventadas.' },
  { id: 'q12', domain: 'II', tipo: 'command-of-evidence-textual', dificultad: 3, tema: 'historia', razones: {
    A: 'La duplicidad de nombres no distingue comercio de migración.', B: 'El uso de productos sugiere contacto, pero no conecta su secuencia con los topónimos.', C: 'La desaparición lingüística no informa el mecanismo de difusión.', D: 'Correcta: las visitas documentadas siguen el mismo avance gradual que predice la explicación comercial.' }, fuenteHecho: 'Lingüista, costas, registros y patrón inventados.' },
  { id: 'q13', domain: 'II', tipo: 'command-of-evidence-quantitative', dificultad: 3, tema: 'ciencia', razones: {
    A: 'Correcta: combina mejor resistencia y menor absorción al comparar directamente 4% con 6%.', B: 'Compara 6% con el control, no con la alternativa solicitada.', C: 'Es cierto pero no separa 4% de 6%.', D: 'Compara absorción con el control y omite la resistencia y el 6%.' }, fuenteHecho: 'Materiales, mezclas y datos inventados.' },
  { id: 'q14', domain: 'II', tipo: 'inferences', dificultad: 2, tema: 'literatura', razones: {
    A: 'Conserva y exhibe un cuenco irregular.', B: 'No se describe un cambio en el gusto de visitantes.', C: 'Correcta: alinea la pintura con el desnivel y usa el objeto al enseñar.', D: 'Lo coloca a la vista de principiantes, no escondido.' }, fuenteHecho: 'Ficción original.' },
  { id: 'q15', domain: 'II', tipo: 'inferences', dificultad: 3, tema: 'ciencia', razones: {
    A: 'El sitio bajo florece antes pero tiene menor producción por flor visitada.', B: 'Correcta: menos polen ajeno coincide con mayor éxito por visita y ofrece una relación plausible.', C: 'El texto no establece que las visitas determinen el inicio floral.', D: 'Invierte el dato: las abejas del sitio bajo llevan polen de más especies.' }, fuenteHecho: 'Planta, sitios y resultados inventados.' },
]
