import type { MCQQuestion } from '../../../../types'
import type { SatItemMeta } from '../../../module-types'

/** Expression of Ideas · Set 3 M2 exigente · q23–q27. Claves: C, A, D, B, C. */
export const items: MCQQuestion[] = [
  {
    id: 'q23', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Alternative text provides a textual substitute for an image.\n• The substitute should communicate information or function important in the image’s context.\n• A photograph of a footbridge appears on a park history page and on a trail-closure alert.\n• On the history page, the bridge’s 1936 stone arches are relevant.\n• On the alert, the important information is that the bridge is closed and visitors must use the east path.\n• Alternative text does not need to list every visible detail.',
    text: 'The student wants to explain why appropriate alternative text for the same photograph can differ between the two pages. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Alternative text should list every feature visible in a photograph, including details unrelated to the page where it appears.', 'Because both pages use the same photograph, both must use identical alternative text describing only its stone arches.', 'Context matters: the history page may describe the arches; the alert should give the closure and detour.', 'The park history page should omit alternative text because the bridge photograph also appears in a trail alert.'],
    answer: 2,
  },
  {
    id: 'q24', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Several methods can recover materials from used lithium-ion batteries.\n• Hydrometallurgy dissolves battery materials and then separates selected elements from solution.\n• Direct recycling seeks to preserve and restore cathode material rather than break it into elemental feedstocks.\n• Preserving cathode structure may reduce the processing needed to make new cathodes.\n• Direct recycling is newer and remains at pilot scale in many applications.\n• Battery designs and recovered-material quality can affect which process is practical.',
    text: 'The student wants to compare the two methods while acknowledging a limitation of direct recycling. Which choice most effectively accomplishes this goal?',
    options: ['Hydrometallurgy extracts elements from solution; direct recycling retains cathode structure but remains newer and depends on cell design and output quality.', 'Direct recycling has replaced hydrometallurgy in every application because preserving cathodes always guarantees usable material at commercial scale.', 'Both methods preserve complete cathodes unchanged, although hydrometallurgy alone remains limited to pilot demonstrations.', 'Hydrometallurgy cannot recover battery materials, while direct recycling separates every element into a pure solution regardless of battery design.'],
    answer: 0,
  },
  {
    id: 'q25', type: 'mcq', part: 1,
    stimulus: 'While researching an undated letter, a student has taken the following notes:\n\n• The paper bears a watermark used by a particular mill from 1814 through 1821.\n• A watermark can help date or identify paper, but stored paper may be used after it is made.\n• The letter survives in a merchant family’s archive.\n• An inventory completed when the family transferred the archive in 1826 describes a letter with the same opening and closing lines.\n• The document could therefore have been written after the watermark first appeared but no later than the inventory.\n• Neither piece of evidence alone establishes an exact writing date.',
    text: 'The student wants to explain how the two kinds of evidence together narrow the letter’s possible date without claiming certainty. Which choice most effectively accomplishes this goal?',
    options: ['Because the watermark was used until 1821, it proves that the letter was written in that exact year.', 'The archive inventory proves that the paper was manufactured in 1826, regardless of the watermark’s documented period.', 'The watermark and inventory show only that the letter belonged to a merchant family; neither bears on when it could have been written.', 'The watermark argues against a pre-1814 date and the inventory against a post-1826 date, supporting a range rather than an exact year.'],
    answer: 3,
  },
  {
    id: 'q26', type: 'mcq', part: 1,
    stimulus: 'Specialized archival indexes can reveal connections that a broad catalog description leaves hidden. ______ a place-name index to a port authority collection enabled researchers to find letters about one harbor even though the letters were filed under several different officials’ names.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Nevertheless,', 'For example,', 'Consequently,', 'Conversely,'],
    answer: 1,
  },
  {
    id: 'q27', type: 'mcq', part: 1,
    stimulus: 'In revising a fictional poem, Dara Mensah shortened four lines and replaced their steady meter with uneven pauses. ______ she retained the image of a moth resting inside an unlit lantern, explaining in a draft note that the image anchored the speaker’s hesitation even as the surrounding rhythm changed.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['Similarly,', 'Therefore,', 'Even so,', 'For example,'],
    answer: 2,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q23', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Las notas rechazan inventariar cada detalle y piden seleccionar información pertinente al contexto.',
    B: 'Que la imagen sea idéntica no vuelve idéntica su función: historia y alerta requieren información distinta.',
    C: 'Correcta: explica el principio contextual y lo aplica a los arcos históricos y al cierre con desvío.',
    D: 'Una imagen informativa sigue necesitando sustituto textual; aparecer también en otra página no la vuelve decorativa.',
  }, fuenteHecho: 'W3C Web Accessibility Initiative, Images Tutorial: el sustituto depende del propósito, contexto y contenido: https://www.w3.org/WAI/tutorials/images/' },
  { id: 'q24', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Correcta: contrasta separación desde solución y conservación estructural, y conserva diseño y calidad como límites prácticos.',
    B: 'Las notas dicen que el reciclaje directo es más nuevo y a menudo piloto; no ha reemplazado todo proceso ni garantiza resultados.',
    C: 'La hidrometalurgia disuelve materiales en vez de preservar cátodos completos, y el límite piloto corresponde al método directo.',
    D: 'Invierte ambos procesos: la hidrometalurgia sí recupera elementos y el reciclaje directo intenta conservar estructura.',
  }, fuenteHecho: 'US Department of Energy, “EV Batteries and Recycling Fact Sheet”, comparación de hidrometalurgia y reciclaje directo: https://cleancities.energy.gov/files/u/publication_orders/publication/119/attachment/EV_Batteries_Recycling_FINAL%2012-14-22_Optimized.pdf' },
  { id: 'q25', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 3, tema: 'historia', razones: {
    A: 'Una marca usada durante varios años fecha el papel de forma aproximada y no prueba cuándo se escribió sobre él.',
    B: 'El inventario registra la presencia de la carta, no la fabricación del papel, y ocurre después del intervalo de la marca.',
    C: 'Ambas evidencias sí aportan límites: aparición de la marca para el inferior e inventario identificable para el superior.',
    D: 'Correcta: combina un límite inicial y otro final, y mantiene explícitamente que el resultado es un intervalo, no una fecha exacta.',
  }, fuenteHecho: 'Library of Congress, marcas de agua como evidencia de origen del papel y procedencia documental; carta, familia, inventario, molino y fechas son hipotéticos: https://blogs.loc.gov/law/2017/01/fabriano-paper-in-library-of-congress-collections/ y https://founders.archives.gov/documents/Adams/06-02-02-0053' },
  { id: 'q26', domain: 'EOI', tipo: 'transitions', dificultad: 1, tema: 'historia', razones: {
    A: 'Nevertheless anunciaría una contradicción, pero el índice particular confirma la utilidad general.',
    B: 'Correcta: For example introduce el caso del índice de lugares como instancia concreta de la afirmación anterior.',
    C: 'Consequently presentaría el índice como efecto causal de la afirmación general, no como prueba ilustrativa.',
    D: 'Conversely marcaría oposición, aunque el caso conserva la misma relación descrita.',
  }, fuenteHecho: 'Puerto, colección, índice y hallazgo originales.' },
  { id: 'q27', domain: 'EOI', tipo: 'transitions', dificultad: 2, tema: 'literatura', razones: {
    A: 'Similarly indicaría que conservar la imagen repite el cambio amplio de ritmo, cuando es la excepción.',
    B: 'Therefore haría de la conservación una consecuencia necesaria de alterar líneas y metro.',
    C: 'Correcta: Even so concede la revisión extensa y contrasta con el único elemento deliberadamente retenido.',
    D: 'For example presentaría la imagen conservada como ejemplo de los cambios, aunque no fue cambiada.',
  }, fuenteHecho: 'Poeta, poema, imagen y nota originales.' },
]
