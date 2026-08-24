import type { MCQQuestion } from '../../types'
import type { SatItemMeta } from '../module-types'

/** Expression of Ideas · Set 3 M2 estándar · q23–q27. Claves reservadas: D, A, C, B, D. */
export const items: MCQQuestion[] = [
  {
    id: 'q23', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Museum exhibition videos can include open or closed captions.\n• Open captions remain visible on the screen.\n• Closed captions can be switched on or off by the visitor.\n• Captions translate spoken narration and other meaningful audio into visible text.\n• Reading captions and viewing the images can occur at the same time.\n• Captions provide access to audio information for visitors who are deaf or hard of hearing.',
    text: 'The student wants to explain the accessibility function of captions in museum videos. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['Museum videos may use open captions that stay visible or closed captions that visitors can switch on and off.', 'Museums can add captions to exhibition videos along with several other services offered to different groups of visitors.', 'Open and closed captions differ in whether the text remains visible, although both formats can appear in exhibition videos.', 'Captions render audio as text, letting deaf and hard-of-hearing visitors follow narration while viewing the images.'],
    answer: 3,
  },
  {
    id: 'q24', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Hemp batt is a bio-based insulation made from plant fibers.\n• A research project measured the thermal performance of hemp fibers from multiple suppliers.\n• The project used a heat, air, and moisture chamber to compare wall assemblies containing hemp batt with assemblies containing fiberglass batt.\n• Researchers also modeled moisture durability in code-compliant walls across climate zones.\n• Future work included characterizing fire performance for code requirements.\n• The project did not report that hemp batt was already suitable for every wall or climate.',
    text: 'The student wants to summarize the project’s scope without claiming that the research established more than the notes support. Which choice most effectively accomplishes this goal?',
    options: ['Researchers tested plant-fiber and conventional batts in complete walls, modeled damp durability by region, and deferred fire analysis.', 'Because hemp batt is plant based, the project established that it is more durable than every commercial insulation across all wall types and climate zones.', 'The project measured fibers from several suppliers but did not test wall assemblies or examine the effects of heat and moisture.', 'Fire testing showed that hemp batt already met all code requirements, so no further performance characterization was planned.'],
    answer: 0,
  },
  {
    id: 'q25', type: 'mcq', part: 1,
    stimulus: 'While researching a topic, a student has taken the following notes:\n\n• Early nineteenth-century US lighthouses used lamps with metallic reflectors.\n• One installation arranged multiple burners and reflectors around a fixed frame.\n• Reflectors redirected some light but required cleaning when soot accumulated.\n• Augustin-Jean Fresnel completed a different lighthouse lens design in 1822.\n• A Fresnel lens surrounds one lamp with specially cut glass prisms.\n• The prisms refract and concentrate light into a stronger beam.\n• US lighthouses began adopting Fresnel lenses decades later.',
    text: 'The student wants to compare how the two designs directed light rather than emphasize when they were adopted. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    options: ['US lighthouses used metallic reflectors before they began adopting Fresnel lenses several decades after 1822.', 'Both designs placed many oil burners inside specially cut glass prisms to create a stronger beam.', 'Reflector systems redirected light with metal surfaces, whereas Fresnel lenses used glass prisms to refract and concentrate light.', 'Because soot accumulated on reflectors, every US lighthouse replaced its lighting system immediately after Fresnel completed his design.'],
    answer: 2,
  },
  {
    id: 'q26', type: 'mcq', part: 1,
    stimulus: 'Researchers built a whole-cell bacterial sensor by linking an arsenite-responsive regulatory circuit to a gene for green fluorescent protein. In the presence of arsenite, the circuit activates expression of the reporter gene. ______ cells exposed to arsenite emitted green fluorescence, whereas unexposed control cells remained at background levels.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['For instance,', 'Accordingly,', 'Meanwhile,', 'Nevertheless,'],
    answer: 1,
  },
  {
    id: 'q27', type: 'mcq', part: 1,
    stimulus: 'Poet Leila Nwosu drafted two endings for a fictional monologue about a traveler standing outside a familiar house. The first ending stops before the traveler decides whether to knock, preserving uncertainty about a reunion. ______ the second ending has the traveler open the door and call a name, committing the speaker to the encounter and giving the poem a more resolved tone.',
    text: 'Which choice completes the text with the most logical transition?',
    options: ['For example,', 'Consequently,', 'Similarly,', 'By contrast,'],
    answer: 3,
  },
]

export const meta: SatItemMeta[] = [
  { id: 'q23', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 1, tema: 'humanidades', razones: {
    A: 'Distingue los dos formatos, pero no explica cómo el texto visible cumple una función de acceso.',
    B: 'Menciona servicios de forma genérica y añade otros grupos sin explicar la función específica de los subtítulos.',
    C: 'Compara visibilidad de formatos, no cómo los subtítulos permiten acceder a la narración mientras se ven las imágenes.',
    D: 'Correcta: une conversión de audio a texto, audiencia beneficiada y uso simultáneo con las imágenes.',
  }, fuenteHecho: 'Smithsonian, accesibilidad para visitantes y subtítulos en medios de exposiciones: https://www.si.edu/visit/accessibility' },
  { id: 'q24', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 2, tema: 'ciencia', razones: {
    A: 'Correcta: resume comparación de ensamblajes y modelado de humedad, y conserva el límite de que el fuego era trabajo futuro.',
    B: 'Ser de origen vegetal no demuestra superioridad universal; las notas estudian desempeño bajo construcciones y climas distintos.',
    C: 'Contradice la prueba de ensamblajes en cámara de calor, aire y humedad.',
    D: 'Las pruebas de fuego estaban previstas para el futuro, por lo que no podían haber demostrado cumplimiento total.',
  }, fuenteHecho: 'US Department of Energy y ORNL, caracterización de aislamiento de cáñamo y estudios HAM: https://www.energy.gov/sites/default/files/2023-05/bto-peer-2023-hempitecture-ornl.pdf' },
  { id: 'q25', domain: 'EOI', tipo: 'rhetorical-synthesis', dificultad: 3, tema: 'historia', razones: {
    A: 'Presenta la cronología que el objetivo pide no enfatizar y omite la diferencia de funcionamiento.',
    B: 'Los reflectores usaban varios quemadores y superficies metálicas; los prismas rodeaban una sola lámpara en el diseño Fresnel.',
    C: 'Correcta: contrasta directamente reflexión metálica con refracción y concentración mediante prismas de vidrio.',
    D: 'Las notas dicen que la adopción estadounidense ocurrió décadas después, no inmediatamente ni en todos los faros a la vez.',
  }, fuenteHecho: 'National Park Service, reflectores Lewis y funcionamiento de lentes Fresnel: https://www.nps.gov/slbe/learn/historyculture/lighthousehistory.htm' },
  { id: 'q26', domain: 'EOI', tipo: 'transitions', dificultad: 1, tema: 'ciencia', razones: {
    A: 'For instance introduciría un ejemplo intercambiable, pero la observación es el resultado previsto por el mecanismo anterior.',
    B: 'Correcta: Accordingly marca que la fluorescencia observada se sigue de la activación del gen reportero por arsenito.',
    C: 'Meanwhile solo simultaneidad y no expresa la relación causal entre el circuito y la señal.',
    D: 'Nevertheless marcaría contradicción, aunque el resultado concuerda con el diseño descrito.',
  }, fuenteHecho: 'Zhang et al., whole-cell biosensor de arsénico con GFP; redacción original: https://pmc.ncbi.nlm.nih.gov/articles/PMC9488089/' },
  { id: 'q27', domain: 'EOI', tipo: 'transitions', dificultad: 2, tema: 'literatura', razones: {
    A: 'For example presentaría la segunda versión como ejemplo de la primera, aunque toman decisiones opuestas.',
    B: 'Consequently indicaría que abrir la puerta es consecuencia de dejar la decisión sin resolver.',
    C: 'Similarly anunciaría semejanza de efecto, pero los tonos son incierto y resuelto.',
    D: 'Correcta: By contrast marca la oposición entre detenerse antes de decidir y comprometer al hablante con el encuentro.',
  }, fuenteHecho: 'Poeta, monólogo y dos finales inventados.' },
]
