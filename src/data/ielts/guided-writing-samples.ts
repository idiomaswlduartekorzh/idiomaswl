import type { IeltsGuidedWritingReference } from './guided-mock.ts';
import { IELTS_GUIDED_WRITING_55_AUTHORED_SAMPLES } from './guided-writing-band-55.ts';
import { IELTS_GUIDED_WRITING_DRAFTS_21_40 } from './guided-writing-samples-21-40.draft.ts';

type BandProfile = '5.5' | '9.0';

const PROFILE_COPY: Record<BandProfile, {
  label: string;
  notice: readonly string[];
}> = {
  '5.5': {
    label: 'Referencia pedagógica aproximada · Banda 5.5',
    notice: ['postura visible', 'desarrollo suficiente pero general', 'errores y repeticiones que no bloquean el mensaje'],
  },
  '9.0': {
    label: 'Referencia pedagógica aproximada · Banda 9',
    notice: ['respuesta completa y matizada', 'argumentos desarrollados con precisión', 'control lingüístico amplio y natural'],
  },
};

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function band55(
  setId: (typeof IELTS_GUIDED_WRITING_55_AUTHORED_SAMPLES)[number]['setId'],
): IeltsGuidedWritingReference['samples']['5.5'] {
  const authored = IELTS_GUIDED_WRITING_55_AUTHORED_SAMPLES.find(candidate => candidate.setId === setId);
  if (!authored) throw new Error(`Missing authored IELTS Writing 5.5 sample for ${setId}`);
  const grammarEvidence = authored.grammarEvidence ?? [];
  const grammarNote = grammarEvidence.length
    ? `El mensaje se entiende, pero al ampliar las oraciones pierde control en ${grammarEvidence.map(value => `“${value}”`).join(', ')}.`
    : 'Mantiene una precisión razonable porque se apoya sobre todo en patrones simples y seguros; el rango complejo es limitado.';
  return {
    label: PROFILE_COPY['5.5'].label,
    transcript: authored.answer,
    answer: authored.answer,
    wordCount: wordCount(authored.answer),
    verdict: authored.taskResponseNote,
    criteria: [
      ['Task Response', authored.taskResponseNote],
      ['Coherence & Cohesion', authored.cohesionNote],
      ['Lexical Resource', authored.lexicalNote],
      ['Grammatical Range & Accuracy', grammarNote],
    ],
    notice: PROFILE_COPY['5.5'].notice,
  };
}

function advancedSample(
  answer: string,
  verdict: string,
  criteria: IeltsGuidedWritingReference['samples']['9.0']['criteria'],
): IeltsGuidedWritingReference['samples']['9.0'] {
  const normalizedCriteria = criteria.map(([criterion, observation]) => [
        criterion === 'Grammar' ? 'Grammatical Range & Accuracy' : criterion,
        observation,
      ] as const);
  return {
    label: PROFILE_COPY['9.0'].label,
    transcript: answer,
    answer,
    wordCount: wordCount(answer),
    verdict,
    criteria: normalizedCriteria,
    notice: PROFILE_COPY['9.0'].notice,
  };
}

const IELTS_GUIDED_WRITING_RELEASED_BY_SET = {
  'set-2': {
    prompt: 'Some people think that environmental problems are too big for individuals to solve. Others believe that individuals can make a significant difference. Discuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
    samples: {
      '5.5': band55('set-2'),
      '9.0': advancedSample(
        `The scale of climate change, biodiversity loss and ocean pollution can make personal environmentalism appear almost symbolic. Although only governments and major industries can alter infrastructure and regulate production at the necessary scale, individual behaviour remains consequential because citizens influence both markets and political priorities.

Those who minimise the individual role make a persuasive point about structural constraints. A commuter cannot choose a low-carbon journey if a city has neither reliable public transport nor safe cycling routes. Similarly, carefully sorting household waste achieves little where municipalities dump recyclable material in landfill. National authorities can price carbon, protect ecosystems and fund clean energy, while corporations determine the materials, supply chains and durability of most goods. Assigning primary responsibility to consumers can therefore become a convenient way for powerful institutions to avoid reform.

Yet this does not render private action irrelevant. Repeated across a population, modest decisions change aggregate demand: lower meat consumption, reduced energy use and preference for repairable products can reshape what firms offer. More importantly, environmental citizenship extends beyond shopping. Individuals vote, organise community campaigns, challenge misleading corporate claims and make ambitious policies politically feasible. The rapid normalisation of reusable containers in many cities, for instance, resulted from a combination of consumer pressure and regulation rather than either force acting independently.

The most productive view is thus to treat personal and institutional action as mutually reinforcing. Governments should create conditions in which sustainable behaviour is affordable and convenient, while citizens should use those opportunities and demand continued improvement. Personal virtue cannot substitute for enforceable emissions standards, but regulation will remain weak if voters resist every change to transport, diets or energy prices.

In conclusion, individuals cannot independently resolve environmental crises whose causes are embedded in global systems. Nevertheless, their collective choices and civic participation help determine whether governments and businesses undertake the required transformation. Significant progress depends not on selecting one responsible actor, but on aligning all three.`,
        'La respuesta distingue responsabilidad estructural, conducta privada y acción cívica, y las integra en una postura plenamente desarrollada.',
        [
          ['Task Response', 'Responde todos los elementos, evalúa los límites de cada postura y sostiene una conclusión matizada.'],
          ['Coherence & Cohesion', 'Cada párrafo cumple una función clara y la progresión argumental es natural.'],
          ['Lexical Resource', 'Usa léxico preciso y flexible, como “structural constraints”, “aggregate demand” y “mutually reinforcing”.'],
          ['Grammar', 'Presenta estructuras complejas variadas y puntuación segura sin errores perceptibles.'],
        ],
      ),
    },
  },
  'set-3': {
    prompt: 'Many people believe that international tourism causes more problems than benefits. To what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
    samples: {
      '5.5': band55('set-3'),
      '9.0': advancedSample(
        `International tourism is often blamed for congested historic centres, environmental degradation and the conversion of homes into short-term accommodation. These harms are substantial, but I disagree that they inherently outweigh tourism's benefits. The balance depends less on travel itself than on how destinations regulate visitor numbers and distribute the resulting income.

Poorly managed tourism can indeed erode the qualities that attract visitors. In a small coastal community, intensive hotel construction may exhaust water supplies, displace fishing livelihoods and leave residents with seasonal, insecure work. In major cities, holiday rentals can remove housing from the long-term market and turn central districts into commercial stages. Moreover, aviation emissions mean that even a responsibly run destination participates in a carbon-intensive industry. Such costs cannot be dismissed merely because visitors spend money.

Nevertheless, tourism can finance opportunities that would otherwise be unavailable. It supports employment across hospitality, transport, conservation and the arts, often in regions with limited alternatives. Entrance fees can fund the maintenance of archaeological sites and wildlife reserves, while international interest may strengthen the political case for preserving them. Cultural contact also has value: sustained, respectful encounters can complicate stereotypes in ways that online information rarely achieves.

The decisive issue is governance. Authorities can cap access to ecologically fragile sites, license short-term rentals, levy accommodation taxes and direct revenue towards public services and habitat restoration. Requiring local ownership or procurement prevents earnings from flowing almost entirely to overseas operators. At the same time, investment in rail and longer stays can reduce the environmental cost per visit.

In conclusion, unregulated mass tourism may impose costs that exceed its gains in particular destinations. It does not follow, however, that international tourism is generally harmful. When communities control its scale and retain a fair share of its value, tourism can sustain livelihoods, conservation and meaningful cultural exchange.`,
        'La tesis responde con precisión al grado de acuerdo y convierte la regulación y la distribución del valor en el eje evaluativo.',
        [
          ['Task Response', 'Examina beneficios y daños, establece condiciones y mantiene una posición plenamente clara.'],
          ['Coherence & Cohesion', 'La progresión de impacto a beneficio y luego a gobernanza produce una respuesta cohesionada.'],
          ['Lexical Resource', 'El vocabulario es específico y natural: “short-term accommodation”, “seasonal, insecure work”, “local procurement”.'],
          ['Grammar', 'Controla cláusulas complejas, contrastes y condicionales con alta precisión.'],
        ],
      ),
    },
  },
  'set-4': {
    prompt: 'The best way to solve traffic congestion in cities is to provide free public transport. To what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    samples: {
      '5.5': band55('set-4'),
      '9.0': advancedSample(
        `Eliminating fares appears to offer an elegant remedy for urban congestion: make the alternative cheaper and motorists will abandon their cars. I disagree that this is the best solution. Fare-free transport can improve access and attract some drivers, but frequency, coverage and the relative inconvenience of driving have a far greater influence on travel behaviour.

Free services produce genuine social benefits. Transport costs consume a disproportionate share of low-income households' budgets, so removing them expands access to employment and education. Where fares are already the principal barrier, patronage may rise and a portion of car journeys may disappear. Yet much of the increase often comes from people who previously walked or cycled, or from existing passengers travelling more frequently. Congestion changes little if motorists still perceive driving as faster, safer or more reliable.

Service quality therefore deserves priority. Dedicated bus lanes, integrated timetables and frequent late-night services make public transport competitive with private cars. Expanding capacity before stimulating demand also prevents overcrowding from degrading the experience. Such improvements require sustained funding; abolishing fare revenue for every passenger, including affluent users, may leave less money for precisely the network expansion that would persuade drivers to switch.

Cities should also target the timing rather than merely the mode of travel. Flexible working hours, remote-work days and staggered school schedules can flatten the morning peak, while timed delivery windows keep freight vehicles away from the busiest periods. These policies address congestion directly without promising that a zero fare will alter journeys that passengers cannot reschedule.

In conclusion, fare-free public transport is a worthwhile equity policy and one useful component of congestion strategy. It is not, however, the most effective standalone intervention. A reliable network, targeted affordability and charges that reflect the true cost of driving are more likely to change behaviour at the scale required.`,
        'La respuesta evalúa directamente la afirmación de “mejor solución” y diferencia con precisión acceso, demanda y cambio modal.',
        [
          ['Task Response', 'Sostiene un desacuerdo claro y compara la gratuidad con alternativas más eficaces.'],
          ['Coherence & Cohesion', 'La argumentación avanza desde equidad hasta eficacia y política integrada sin saltos.'],
          ['Lexical Resource', 'Emplea expresiones presentes en la respuesta como “patronage”, “staggered school schedules” y “timed delivery windows”.'],
          ['Grammar', 'La sintaxis compleja es natural, precisa y variada.'],
        ],
      ),
    },
  },
  'set-5': {
    prompt: 'In many countries, increasing numbers of people are choosing to live alone rather than with family or a partner.\n\nIs this a positive or negative development? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-5'),
      '9.0': advancedSample(
        `Debate about solo living often centres on personal freedom or loneliness. I consider the trend negative overall for a different reason: when household size falls without population falling, societies must provide more dwellings, infrastructure and formal care to support the same number of people.

There are legitimate reasons to maintain one-person homes. A separated parent, a shift worker and an older person with limited mobility require different kinds of space; compelling them to share would neither guarantee companionship nor respect their circumstances. Moreover, living alone describes an address, not a social life. A resident may be deeply connected to relatives and neighbours while someone in a crowded household remains isolated. Any judgment should therefore preserve individual choice rather than moralise about family arrangements.

The aggregate effects are nevertheless substantial. Dividing four adults between four units rather than one multiplies kitchens, appliances and heated living areas. It also intensifies competition for scarce urban land and can encourage developers to replace family-sized housing with more profitable studios. These pressures reach beyond solo residents: larger households face higher rents and longer journeys when suitable homes disappear. Thus a private preference produces collective costs even when each decision is entirely reasonable.

Demographic change also shifts care from households to institutions. Relatives living together often share routine tasks, notice sudden illness and provide informal childcare or elder support. Separate addresses do not eliminate those relationships, but distance makes daily assistance harder. Municipal health visits, emergency-response systems and accessible community venues can fill the gap, although they require stable funding and careful targeting.

Policy should accommodate the trend while limiting its resource burden. Planning rules can encourage compact, adaptable units within mixed-size developments rather than isolated towers of studios. Shared gardens, laundries and guest rooms preserve privacy while reducing duplicated space, and voluntary neighbourhood check-ins can support vulnerable residents without surveillance.

In conclusion, solo living can be the right arrangement for an individual, yet its rapid expansion is negative at societal scale because it increases housing, energy and care requirements. The appropriate response is not to restrict choice, but to redesign homes and services around smaller households.`,
        'La respuesta separa la libertad individual del efecto agregado sobre vivienda, energía y cuidados, y sostiene ese ángulo hasta la conclusión.',
        [
          ['Task Response', 'Evalúa el desarrollo con una tesis clara, reconoce la elección personal y explica costes colectivos concretos.'],
          ['Coherence & Cohesion', 'Progresa de casos individuales a vivienda, cuidados y diseño público mediante enlaces naturales.'],
          ['Lexical Resource', 'Usa vocabulario preciso: “aggregate effects”, “duplicated space”, “mixed-size developments”.'],
          ['Grammar', 'Mantiene control completo de estructuras complejas y relaciones concesivas.'],
        ],
      ),
    },
  },
  'set-6': {
    prompt: 'Some people think that parents should limit the amount of screen time their children have, while others believe that technology is an important part of modern life and children should be free to use it as much as they wish.\n\nDiscuss both views and give your own opinion.',
    samples: {
      '5.5': band55('set-6'),
      '9.0': advancedSample(
        `Because digital devices mediate education, friendship and entertainment, treating all screen exposure as harmful is increasingly unrealistic. Nevertheless, allowing children unrestricted use ignores both developmental vulnerabilities and the commercial design of many platforms. Parents should therefore impose purposeful, age-sensitive boundaries while progressively teaching children to regulate themselves.

Advocates of freedom rightly observe that competence develops through use. Online research, collaborative documents, programming and digital art can turn a screen into a tool for inquiry and creation. Social platforms may also sustain meaningful friendships, particularly for children with disabilities or those living in isolated communities. A rigid hourly cap that equates a video call with compulsive scrolling is consequently crude. Excessive parental surveillance can further prevent adolescents from developing privacy and independent judgement.

Yet children are not simply choosing among neutral tools. Games and social feeds employ notifications, variable rewards and endless content to prolong attention, while younger users have limited capacity to recognise manipulation. Unrestricted access can displace sleep, physical activity and unstructured play, all of which are essential to development. It also exposes children to harassment, misinformation and inappropriate material before they possess the experience to respond safely.

Effective limits should focus on context and habit rather than a single number. Device-free meals and bedrooms protect conversation and sleep; parental controls can restrict unsuitable content; and adults can model the restraint they expect. Educational or creative work deserves more flexibility than passive consumption. As children mature, negotiated rules and discussion of persuasive design should gradually replace direct control, making self-regulation the eventual goal.

In conclusion, technology is indispensable, but importance does not justify unlimited access. Sensible boundaries protect health and safety without denying digital opportunity. The strongest approach is neither prohibition nor freedom without conditions, but guidance that evolves until young people can manage attention, risk and responsibility for themselves.`,
        'La respuesta redefine “tiempo de pantalla” según propósito y edad, y reconcilia protección con autonomía progresiva.',
        [
          ['Task Response', 'Aborda plenamente ambas posturas y formula una posición matizada y aplicable.'],
          ['Coherence & Cohesion', 'La progresión conceptual es fluida y cada párrafo amplía el anterior.'],
          ['Lexical Resource', 'Usa léxico específico y preciso: “developmental vulnerabilities”, “variable rewards”, “self-regulation”.'],
          ['Grammar', 'La variedad de estructuras y la puntuación mantienen precisión constante.'],
        ],
      ),
    },
  },
  'set-7': {
    prompt: 'Some people believe that learning a foreign language should be compulsory for all school children. Others argue that it is more important for children to focus on other subjects.\n\nTo what extent do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-7'),
      '9.0': advancedSample(
        `Making a foreign language compulsory can appear difficult to justify when schools already struggle to secure literacy, numeracy and scientific understanding. I nevertheless strongly support the requirement. Language education expands practical opportunity and intercultural competence, and its broader cognitive demands complement rather than compete with other core subjects when provision is well designed.

The practical case is compelling. Employment, research and higher education increasingly cross national boundaries, yet access to these networks is unevenly distributed among families. If language study is optional, affluent children can obtain private tuition while others are excluded from the same mobility. Universal provision gives every pupil at least the foundation from which fluency may later develop. Early, sustained exposure is especially valuable because pronunciation and confidence are harder to establish through a short course begun in adulthood.

Language learning also challenges pupils to recognise that meaning can be organised differently. Comparing grammatical systems, negotiating ambiguity and encountering unfamiliar social conventions foster attention and intellectual flexibility. More importantly, direct access to another community's words can replace a simplified image of foreign cultures with curiosity and humility. These outcomes strengthen citizenship in multilingual societies.

Compulsion alone, however, does not guarantee value. Years spent copying vocabulary for examinations can produce neither communication nor enthusiasm. Schools should prioritise conversation, stories and purposeful projects, while offering several languages relevant to their communities. Pupils with acute learning needs may require adapted goals, but exemption should be exceptional; otherwise those already disadvantaged lose access to a powerful resource.

In conclusion, concentrating exclusively on supposedly utilitarian subjects would define education too narrowly. A compulsory foreign language equips children for international opportunities while developing forms of cultural and cognitive understanding that other subjects cannot replicate. The appropriate response to timetable pressure is high-quality, inclusive teaching, not removal of the entitlement.`,
        'La respuesta convierte obligatoriedad, equidad y calidad pedagógica en una línea argumental integrada y convincente.',
        [
          ['Task Response', 'Mantiene un acuerdo firme, responde a la objeción y establece condiciones de implementación.'],
          ['Coherence & Cohesion', 'La progresión de utilidad a equidad y ciudadanía es clara y orgánica.'],
          ['Lexical Resource', 'El vocabulario es preciso y flexible: “universal provision”, “negotiate ambiguity”, “adapted goals”.'],
          ['Grammar', 'Las estructuras complejas se emplean con control y naturalidad.'],
        ],
      ),
    },
  },
  'set-8': {
    prompt: 'Some people think that governments should provide financial assistance to artists such as musicians, painters, and poets, while others believe that artists should seek funding from other sources.\n\nDiscuss both views and give your own opinion.',
    samples: {
      '5.5': band55('set-8'),
      '9.0': advancedSample(
        `Whether art merits public subsidy depends on what societies expect culture to provide. Those who regard artistic work as an ordinary commodity reasonably prefer audiences and sponsors to determine what survives. I argue, however, that selective public funding is essential because markets systematically undervalue cultural benefits that cannot be captured through ticket sales.

The case for private finance rests on accountability. An artist supported by purchases, subscriptions or philanthropy must persuade someone that the work is worth producing. This protects taxpayers from financing projects they neither chose nor use, and it reduces political influence over creative expression. Commercial income can also give artists independence from grant committees. Given urgent demands on health and education budgets, indiscriminate subsidies would be difficult to defend.

Yet market popularity is an incomplete measure of public value. A community archive, an emerging playwright or the restoration of a regional musical tradition may benefit future generations without attracting a mass audience today. Free performances and public art also make cultural participation available regardless of income. Moreover, innovation is uncertain: work now regarded as significant may initially be too unfamiliar to secure corporate sponsorship, whose purpose is usually publicity rather than experimentation.

Governments should therefore correct this market failure without becoming artistic judges. Arm's-length councils with rotating, diverse panels can award time-limited grants against published criteria. Funding decisions, conflicts of interest and project outcomes should be transparent. Priority should go to access, preservation and experimentation, while established commercial acts continue to rely primarily on audiences and investors. A mixed model also prevents either state preference or consumer fashion from dominating culture.

In conclusion, private funding appropriately rewards popular work and disciplines spending, but it cannot sustain every form of artistic value. Carefully governed public assistance is justified where benefits are widely shared, emerge slowly or would otherwise be inaccessible.`,
        'La respuesta identifica el valor público no capturado por el mercado y propone un mecanismo que protege independencia y rendición de cuentas.',
        [
          ['Task Response', 'Evalúa ambas fuentes y construye una posición con límites institucionales claros.'],
          ['Coherence & Cohesion', 'La relación entre problema, contrapeso y solución mixta está plenamente controlada.'],
          ['Lexical Resource', 'Emplea léxico preciso como “public subsidy”, “market failure” y “arm’s-length councils”.'],
          ['Grammar', 'La complejidad sintáctica es flexible y exacta.'],
        ],
      ),
    },
  },
  'set-9': {
    prompt: 'Some people argue that zoos serve an important role in wildlife conservation and education. Others believe that keeping animals in captivity is unethical and unnecessary.\n\nDiscuss both views and give your own opinion.',
    samples: {
      '5.5': band55('set-9'),
      '9.0': advancedSample(
        `The ethical case against zoos is powerful: confinement for human recreation cannot be justified merely by claiming that visitors learn something. Nevertheless, I do not regard every form of managed captivity as unnecessary. Institutions that meet stringent welfare standards and pursue demonstrable conservation goals can retain a limited role, whereas collections maintained primarily for display should be phased out.

Modern zoos cite captive breeding, research and education as public benefits. For a species whose habitat has collapsed or whose remaining population is dangerously small, coordinated breeding may preserve genetic diversity until reintroduction becomes possible. Veterinary knowledge developed in such settings can assist wild populations, and direct encounters may motivate some visitors to support conservation. These outcomes, however, are possibilities rather than automatic consequences of exhibiting animals.

Captivity imposes costs that many facilities cannot overcome. Wide-ranging predators, migratory species and socially complex mammals may be unable to perform essential behaviours even in attractive enclosures. Repetitive movement and abnormal aggression reveal that physical health alone is an inadequate measure of welfare. Educational claims are also weak if displays detach animals from ecological threats or encourage spectators to treat them as entertainment. High-quality films can often convey behaviour and habitat more accurately.

The burden of proof should consequently lie with each institution. Keeping a species should require an independently reviewed conservation plan, appropriate space and social conditions, transparent welfare data and a credible link to habitat protection. Rescue centres may provide lifelong care for animals that cannot be released, but breeding common species simply to maintain attendance is indefensible. Funding should increasingly support reserves and community-led protection in natural habitats.

In conclusion, captivity is not made ethical by the label “zoo”. Most display-led collections should close or transform. A smaller network of accountable conservation and rescue institutions may remain justified where its measurable contribution to a species clearly outweighs the unavoidable restriction placed on individual animals.`,
        'La respuesta aplica una carga de prueba explícita y evalúa beneficios institucionales frente al bienestar de animales individuales.',
        [
          ['Task Response', 'Considera plenamente las dos posturas y formula un criterio de aceptación preciso.'],
          ['Coherence & Cohesion', 'La progresión desde beneficios alegados hasta condiciones probatorias es rigurosa.'],
          ['Lexical Resource', 'Usa léxico especializado con naturalidad: “managed captivity”, “genetic diversity”, “display-led collections”.'],
          ['Grammar', 'Controla estructuras densas y concesivas sin perder claridad.'],
        ],
      ),
    },
  },
  'set-10': {
    prompt: 'In many countries, people are moving away from rural areas and into cities. This trend is likely to continue in the future.\n\nWhat are the main causes of this trend? What are its effects on both urban and rural areas? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-10'),
      '9.0': advancedSample(
        `Rural-to-urban migration is driven less by an inherent preference for city life than by the concentration of opportunity and public investment. It can raise productivity and expand individual choices, but when movement outpaces planning it strains urban systems while weakening the communities migrants leave behind.

Employment is the principal force. Mechanised agriculture requires fewer workers, whereas expanding service, manufacturing and knowledge sectors cluster in cities where firms can share infrastructure and skilled labour. Universities, specialist healthcare and reliable digital connections reinforce this pull. Rural decline then becomes self-perpetuating: as residents leave, businesses and services lose customers, making departure still more attractive to those who remain. Family networks in destination cities further reduce the risk of moving.

Urban areas benefit from a larger workforce, entrepreneurial activity and a broader tax base. Density can also make transport and public services more efficient. The difficulty is timing. Housing supply, water systems and transit rarely expand as quickly as population, producing inflated rents, informal settlements and severe congestion. Competition for insecure entry-level work can leave recent arrivals economically marginal despite the apparent abundance of opportunity.

For rural regions, migration may bring remittances and reduce pressure on fragmented farmland. Yet the selective loss of young and educated adults accelerates ageing, deprives enterprises of successors and makes schools or clinics increasingly costly to operate. Cultural practices tied to working landscapes can disappear as well. National economies thus risk developing one congested centre alongside extensive areas of avoidable decline.

Policy should neither prevent mobility nor assume it is inevitable. Investment in regional universities, digital infrastructure, transport links and value-added agriculture can allow people to choose rural life without sacrificing prospects. Simultaneously, cities need anticipatory housing and transit plans.

In conclusion, unequal geography of opportunity is the primary cause of urban migration. Its effects can be productive, but unmanaged concentration transfers social and infrastructural costs to both destinations and places of origin.`,
        'La respuesta explica mecanismos acumulativos y consecuencias diferenciadas, no solo listas de causas y efectos.',
        [
          ['Task Response', 'Aborda integralmente causas y efectos urbanos y rurales con análisis causal sostenido.'],
          ['Coherence & Cohesion', 'La progresión es precisa y las conexiones entre salida rural y presión urbana son naturales.'],
          ['Lexical Resource', 'Utiliza expresiones exactas como “self-perpetuating”, “selective loss” y “anticipatory planning”.'],
          ['Grammar', 'Las estructuras complejas y la puntuación se controlan de forma consistente.'],
        ],
      ),
    },
  },
  'set-11': {
    prompt: 'Many cities around the world are experiencing the effects of rapid urbanisation, including traffic congestion, air pollution, and lack of green space.\n\nWhat measures can city governments take to make urban areas more sustainable and liveable? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-11'),
      '9.0': advancedSample(
        `A liveable city is not simply one with cleaner technology; it is one in which housing, mobility and public space allow residents to meet daily needs without excessive cost, pollution or travel. Municipal governments should therefore coordinate land use and transport, rather than treating congestion, emissions and lost greenery as separate problems.

The highest priority is climatic resilience at neighbourhood level. A connected canopy of street trees and pocket parks reduces dangerous heat, while permeable surfaces, rain gardens and restored waterways slow storm runoff. These measures should be concentrated first in districts with little shade and high health vulnerability, rather than around prestige projects in city centres. Publicly reported temperature and flood-risk maps can make that allocation accountable.

Buildings form the second layer. Retrofitting insulation, ventilation and passive shading reduces energy demand and protects residents during heat waves; minimum standards for rental properties prevent landlords from transferring inefficient buildings' costs to tenants. New development should reuse serviced land and include affordable homes, so environmental improvement does not simply displace lower-income households to the urban edge.

Liveability also depends on mundane public systems. Reliable waste collection, clean public toilets, accessible clinics and well-maintained pavements shape health more directly than a flagship eco-district. Municipal procurement can electrify service fleets and require low-carbon construction materials, using the city's purchasing power to reduce emissions across suppliers.

Finally, governments should publish local targets for air quality, journey times, housing costs and park access, enabling residents to judge progress.

In conclusion, sustainable urbanisation requires a protective network of green infrastructure, efficient affordable buildings and dependable local services. Measuring access and resilience by neighbourhood makes environmental improvement an everyday public good rather than a showcase available only to affluent districts.`,
        'La respuesta diferencia el Set 11 mediante resiliencia climática, edificios y servicios de barrio, en lugar de convertirlo en otro ensayo de transporte.',
        [
          ['Task Response', 'Propone medidas específicas, explica mecanismos y atiende la equidad.'],
          ['Coherence & Cohesion', 'La respuesta está unificada por capas de acción: espacio público, edificios y sistemas municipales.'],
          ['Lexical Resource', 'Usa vocabulario exacto: “climatic resilience”, “passive shading”, “municipal procurement”.'],
          ['Grammar', 'Mantiene un rango amplio con alta precisión y claridad.'],
        ],
      ),
    },
  },
  'set-12': {
    prompt: 'Social media platforms have become a major part of daily life for people of all ages, but particularly for young people.\n\nDo the advantages of social media outweigh the disadvantages? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-12'),
      '9.0': advancedSample(
        `Social media has lowered the cost of communication, publishing and collective organisation to an extraordinary degree. Yet for young users in particular, these advantages are delivered through systems designed to capture attention and extract personal data. On balance, I believe the present disadvantages outweigh the benefits, although that judgement concerns the dominant business model rather than social connection itself.

The benefits are substantial. Migrants can maintain everyday contact with distant families, marginalised young people can find supportive peers, and small organisations can reach audiences once accessible only through expensive media. During a local emergency, a school or authority can distribute timely information and residents can coordinate assistance. Social platforms also allow citizens to document events that traditional news organisations overlook.

However, the same mechanisms that maximise reach reward emotional and sensational material. Recommendation systems learn that outrage, fear and idealised images retain attention, then repeatedly supply them. Adolescents, whose identities and habits are still developing, face relentless social comparison and public measures of approval. Harassment no longer ends at the school gate, while compulsive checking displaces sleep and sustained concentration.

The information environment creates a broader social cost. False claims can circulate widely before verification, and personalised feeds can create an illusion that a narrow view is universally shared. Meanwhile, detailed behavioural profiles are assembled from users who cannot meaningfully evaluate future uses of their data. Individual self-control is an inadequate remedy when platforms deliberately test how to overcome it.

These harms are not inevitable. Age-appropriate design, limits on behavioural advertising, independent access for researchers and user control over recommendation systems could preserve connection while changing incentives.

In conclusion, social media's communicative power is real, but its current attention-driven architecture imposes heavier costs on wellbeing, privacy and public knowledge. Until regulation aligns platform success with users' interests, the disadvantages outweigh the advantages.`,
        'La respuesta diferencia la tecnología de su modelo de negocio y evalúa el balance mediante mecanismos concretos.',
        [
          ['Task Response', 'Responde directamente al balance, reconoce beneficios sólidos y justifica por qué pesan menos.'],
          ['Coherence & Cohesion', 'La línea desde diseño comercial hasta efectos individuales y sociales es consistente.'],
          ['Lexical Resource', 'Usa vocabulario preciso: “collective organisation”, “recommendation systems”, “behavioural profiles”.'],
          ['Grammar', 'La sintaxis variada sostiene matices y relaciones causales con precisión.'],
        ],
      ),
    },
  },
  'set-13': {
    prompt: 'Some people argue that immigration has a largely positive effect on the economies and societies of the countries that receive migrants. Others feel that the negative effects outweigh the positive ones.\n\nDiscuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-13'),
      '9.0': advancedSample(
        `Debate about immigration often treats national gain and social pressure as mutually exclusive. In reality, migration can expand productive capacity and cultural life while also exposing failures in housing, labour regulation and integration. I regard its overall effect as positive, provided receiving governments distribute the costs of adjustment rather than leaving them to particular neighbourhoods and low-paid workers.

Economically, migrants do more than fill vacancies. They create firms, contribute taxes and connect businesses to international markets. In ageing societies, working-age arrivals can slow the decline in the ratio between taxpayers and retirees. Socially, new languages, institutions and artistic traditions broaden a country's cultural resources. Migrants themselves are not interchangeable, but the combination of varied skills and perspectives can improve innovation and public life.

The opposing concerns should nevertheless be taken seriously. Rapid population growth can intensify shortages of homes, school places and medical appointments. Employers may exploit vulnerable newcomers to suppress wages in poorly regulated sectors, while communities experiencing fast change may feel ignored. Language barriers and residential segregation can limit everyday contact, allowing misinformation and distrust to flourish. These burdens are real even when national economic statistics remain favourable.

They are not, however, sufficient reasons to reject immigration. Governments can link admission planning to local investment, enforce equal pay, provide early language tuition and recognise overseas qualifications promptly. Funding should follow population changes so that municipalities receiving newcomers can expand services. Civic institutions, sports clubs and schools can create sustained contact, which is more effective than symbolic campaigns about tolerance.

In conclusion, immigration's benefits do not arise automatically, and averages can conceal concentrated disruption. Nonetheless, the labour, enterprise and cultural exchange migrants contribute outweigh the manageable costs. The decisive variable is whether public policy equips communities to absorb change fairly, not whether newcomers arrive at all.`,
        'La respuesta distingue beneficios nacionales y costes locales, y hace depender su juicio de una distribución política justa.',
        [
          ['Task Response', 'Evalúa las dos posturas con matiz, reconoce costes reales y defiende una conclusión inequívoca.'],
          ['Coherence & Cohesion', 'Las ideas se relacionan mediante una progresión causa–distribución–respuesta pública.'],
          ['Lexical Resource', 'El léxico es preciso: “productive capacity”, “residential segregation”, “concentrated disruption”.'],
          ['Grammar', 'El control de estructuras concesivas y condicionales es completo.'],
        ],
      ),
    },
  },
  'set-14': {
    prompt: 'Artificial intelligence is increasingly being used to make decisions that significantly affect people\'s lives, such as in hiring, loan applications, and medical diagnosis.\n\nDo you think this is a positive development? What safeguards, if any, should be put in place? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-14'),
      '9.0': advancedSample(
        `Artificial intelligence can detect patterns across more cases than any individual professional and can expose inconsistent human judgement. Its use in consequential decisions is therefore potentially positive, but only if it remains an accountable aid rather than an unchallengeable authority. Without enforceable safeguards, efficiency may merely automate discrimination at scale.

The benefits vary by context. In medicine, a system can flag subtle features in an image and offer clinicians a valuable second opinion. In lending, well-designed models may assess applicants overlooked by crude rules or personal prejudice. Automated screening can also free professionals from repetitive comparison. Consistency, however, should not be confused with fairness: an algorithm can apply the same biased relationship perfectly to every case.

Historical data encode earlier decisions and unequal social conditions. A hiring model may learn that a proxy such as postcode predicts past success, indirectly disadvantaging particular communities. Complex systems can also make it impossible for affected people to understand or contest an outcome. In clinical settings, performance measured on one population may deteriorate sharply for another. The scale and apparent objectivity of AI make such errors especially dangerous.

Safeguards must begin before deployment. Independent evaluation should test accuracy and unequal error rates across relevant groups using current, representative data. Organisations should publish the system's purpose, limitations and accountable owner. Individuals need a meaningful explanation, access to the data used about them and a timely appeal to a qualified human empowered to reverse the result. Continuous monitoring should trigger suspension when performance drifts. Some uses, such as fully automated denial of urgent treatment, should simply be prohibited.

In conclusion, AI can improve evidence available to decision-makers and reduce certain human inconsistencies. It is positive only under a governance model that preserves human responsibility, transparency and redress. Speed is valuable, but never sufficient justification for an opaque decision about someone's livelihood, health or rights.`,
        'La respuesta distingue consistencia de equidad y convierte cada riesgo en una salvaguarda verificable.',
        [
          ['Task Response', 'Responde por completo, evalúa condiciones y propone un marco de protección específico.'],
          ['Coherence & Cohesion', 'La relación entre ventajas, fallos y controles es rigurosa y fluida.'],
          ['Lexical Resource', 'Emplea términos precisos: “proxy”, “unequal error rates”, “performance drifts”, “redress”.'],
          ['Grammar', 'La complejidad gramatical sirve al argumento sin afectar la claridad.'],
        ],
      ),
    },
  },
  'set-15': {
    prompt: 'Hunger and malnutrition remain serious global problems despite the fact that the world produces more than enough food for everyone.\n\nWhy does this problem persist, and what can be done to address it? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-15'),
      '9.0': advancedSample(
        `The coexistence of global food abundance and persistent malnutrition is not a paradox of production; it is a failure of access, resilience and political priority. People go hungry when they lack the income or power to obtain nutritious food, and crises turn that chronic insecurity into catastrophe.

Poverty is the central mechanism. Grain can be present in national warehouses while households cannot afford rising market prices. Small farmers may simultaneously produce food and remain malnourished because they lack secure land, credit, storage and bargaining power. Weak roads and cold chains cause losses between farm and market, whereas commercial standards and household behaviour generate waste elsewhere. Malnutrition is also qualitative: cheap calories do not ensure the protein and micronutrients required for healthy development.

Conflict magnifies every weakness by displacing farmers, blocking trade and making aid politically negotiable. Climate change adds repeated droughts, floods and heat to systems already dependent on a narrow range of crops. Short-term food shipments are indispensable during such emergencies, but poorly designed imports can depress local prices and undermine the producers needed for recovery.

Policy must therefore operate on two timescales. Immediately, cash transfers, maternal nutrition, school meals and treatment for acute malnutrition protect lives and human development. Structurally, governments should secure land rights, rural finance, irrigation, storage and transport, while supporting diverse crops suited to local conditions. Social protection that expands automatically after a failed harvest can prevent families from selling productive assets. International actors should defend humanitarian access, finance climate adaptation and purchase food locally where markets function. Measures to reduce waste can increase efficiency, although they cannot substitute for redistributing purchasing power.

In conclusion, hunger persists because adequate supply does not guarantee entitlement to food. Combining reliable incomes and nutrition services with resilient local production is more effective than treating each crisis as an isolated shortage.`,
        'La respuesta explica la diferencia entre disponibilidad y acceso, y coordina intervenciones inmediatas y estructurales.',
        [
          ['Task Response', 'Analiza mecanismos causales y ofrece soluciones alineadas a corto y largo plazo.'],
          ['Coherence & Cohesion', 'Las ideas progresan desde acceso hasta crisis y respuesta sin fragmentación.'],
          ['Lexical Resource', 'Usa léxico específico: “chronic insecurity”, “cold chains”, “automatic social protection”.'],
          ['Grammar', 'La variedad y precisión gramatical son sostenidas.'],
        ],
      ),
    },
  },
  'set-16': {
    prompt: 'Governments and businesses are increasingly investing in renewable energy sources such as wind and solar power.\n\nWhat are the advantages of this trend, and what challenges does the transition away from fossil fuels present? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-16'),
      '9.0': advancedSample(
        `The acceleration of renewable investment offers more than lower carbon emissions: it can reduce exposure to volatile fuel markets, improve urban air quality and establish industries that will underpin future energy systems. The transition nevertheless requires a redesign of infrastructure and a deliberate response to the workers and communities whose livelihoods are tied to fossil fuels.

Wind and solar power generate electricity without the continuous combustion responsible for greenhouse gases and damaging particulates. Because their underlying resources are domestic and free, a diversified renewable system can protect countries from imported fuel shocks and geopolitical disruption. Technological learning also lowers costs as deployment expands, while manufacturing, construction and maintenance create employment. Distributed solar can bring electricity to remote areas without waiting for a national grid extension.

Intermittency is the most visible technical challenge. Supply varies with weather and time, whereas demand does not. High shares of renewable generation therefore require transmission across regions, flexible demand, storage and complementary sources. These investments are substantial, and planning delays can become as restrictive as engineering limits. Renewable infrastructure also needs land and minerals; careless extraction or siting can transfer environmental harm to rural and Indigenous communities.

The social transition is equally important. A new solar project may create many temporary construction roles but fewer permanent jobs than a mine it replaces. Workers cannot necessarily relocate or convert specialised experience through a short course. Governments should commit long-term funds to regional diversification, income protection and training linked to actual vacancies. Efficiency upgrades and targeted bill support can prevent low-income households from bearing disproportionate costs.

In conclusion, renewable energy delivers decisive environmental, economic and security advantages, so the direction of change is desirable. Success should not be measured by installed capacity alone. Modern grids, responsible supply chains and a credible just-transition programme are necessary to ensure that cleaner energy is also reliable and socially legitimate.`,
        'La respuesta evalúa beneficios sistémicos y separa con claridad retos técnicos, ambientales y distributivos.',
        [
          ['Task Response', 'Aborda plenamente ventajas y desafíos y propone respuestas proporcionales.'],
          ['Coherence & Cohesion', 'La progresión desde beneficios hasta sistema y justicia laboral es consistente.'],
          ['Lexical Resource', 'Usa con precisión “volatile fuel markets”, “intermittency”, “distributed solar” y “just transition”.'],
          ['Grammar', 'Mantiene estructuras variadas y complejas con precisión completa.'],
        ],
      ),
    },
  },
  'set-17': {
    prompt: 'Governments are increasingly using insights from psychology and behavioural science to influence citizens\' decisions—for example, by changing how choices are presented or setting certain options as defaults.\n\nIs this an acceptable approach, or does it raise ethical concerns? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-17'),
      '9.0': advancedSample(
        `Behavioural policy occupies an ambiguous space between assistance and manipulation. Designing a form so that the beneficial option is easier can help citizens overcome distraction, yet the same knowledge can obscure alternatives and exploit predictable biases. I consider the approach acceptable only when purposes are publicly defensible, influence is transparent and refusal remains genuinely effortless.

Choice architecture is unavoidable: placing one option first or selecting a default will influence behaviour whether officials intend it or not. Deliberate design can therefore improve an existing environment. Automatic enrolment in retirement saving, with a clear opt-out, helps workers who value future security but postpone paperwork. Timely reminders can increase vaccination attendance or tax compliance without fines. Such measures preserve formal choice and may be cheaper and less coercive than mandates.

Formal choice, however, is not sufficient. Citizens may never notice a default, may infer that government knows what is individually best, or may face friction when attempting to leave. Officials can selectively frame evidence to secure compliance with a politically convenient policy. Interventions may also treat symptoms of structural failure: encouraging healthier purchases means little where nutritious food is unaffordable. Because behavioural effects differ across groups, an average improvement can conceal harm to vulnerable people.

Legitimacy requires several safeguards. Governments should disclose the intervention, objective, evidence and responsible body in accessible language. Opting out must be as easy as accepting, and no essential service should depend on the preferred choice. Independent pre-registration and evaluation can prevent agencies from publicising only favourable outcomes. Legislatures or ethics panels should scrutinise high-impact interventions, while citizens should have channels to challenge them.

In conclusion, behavioural insight is neither inherently benign nor uniquely sinister. Used transparently to help people fulfil widely shared intentions, it is acceptable. Used covertly to bypass disagreement, it undermines autonomy. Ethical legitimacy rests on contestability, proportionality and genuine freedom to choose otherwise.`,
        'La respuesta reconoce que toda arquitectura influye y define un umbral ético basado en transparencia, facilidad de salida y escrutinio.',
        [
          ['Task Response', 'Ofrece una evaluación matizada, ejemplos pertinentes y salvaguardas directamente ligadas a los riesgos.'],
          ['Coherence & Cohesion', 'La distinción entre elección formal y autonomía real estructura todo el argumento.'],
          ['Lexical Resource', 'Emplea léxico sofisticado con precisión: “choice architecture”, “friction”, “contestability”, “proportionality”.'],
          ['Grammar', 'Controla relaciones concesivas y condicionales complejas con naturalidad.'],
        ],
      ),
    },
  },
  'set-18': {
    prompt: 'Genetic technologies such as CRISPR gene editing offer the potential to cure inherited diseases, but also raise ethical concerns about how these technologies might be used in the future.\n\nDo the potential benefits of genetic engineering outweigh the risks? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-18'),
      '9.0': advancedSample(
        `Genetic engineering encompasses interventions with radically different ethical profiles. Editing a patient's blood cells to treat a lethal disorder is not equivalent to altering an embryo whose descendants will inherit the change. I therefore believe the benefits outweigh the risks for tightly regulated therapeutic uses, but not for heritable enhancement under present scientific and social conditions.

For some single-gene diseases, editing could address the cause rather than repeatedly managing symptoms. A successful one-time therapy might free patients from lifelong pain and reduce burdens on families and health systems. The research required also deepens understanding of gene function and can generate treatments that do not themselves involve editing. Refusing all development would preserve serious, preventable suffering.

The risks are nonetheless exceptional. An unintended molecular change may emerge only years later, while editing embryos makes that error transmissible to people who never consented. Even technically accurate intervention raises questions about purpose. The boundary between preventing disease and selecting preferred traits is contested, and market access could allow wealthy families to purchase biological advantages. Pressure to remove conditions associated with disability might also narrow social acceptance of human variation.

Governance should follow the level of irreversibility. Somatic therapies, which affect only the treated patient, should undergo rigorous trials, long-term monitoring and transparent reporting of failures as well as successes. Access provisions should accompany public research so benefits do not remain luxury goods. Clinical heritable editing should remain prohibited unless a broad international process establishes compelling medical need, reliable safety and legitimate public consent. Commercial enhancement deserves a clear ban, not merely professional guidance.

In conclusion, genetic engineering's capacity to relieve severe disease justifies continued therapeutic research and cautious clinical use. That benefit does not grant permission to redesign future generations. A graduated framework based on consent, necessity and reversibility allows society to pursue cures without pretending that every technically possible edit is ethically acceptable.`,
        'La respuesta evita un balance único para toda la tecnología y evalúa usos según consentimiento, necesidad e irreversibilidad.',
        [
          ['Task Response', 'Responde al balance con una distinción central y desarrolla salvaguardas consistentes.'],
          ['Coherence & Cohesion', 'El contraste entre edición somática y heredable organiza la respuesta con gran claridad.'],
          ['Lexical Resource', 'El léxico es preciso y natural: “heritable enhancement”, “molecular change”, “irreversibility”.'],
          ['Grammar', 'Presenta alta variedad sintáctica y control completo.'],
        ],
      ),
    },
  },
  'set-19': {
    prompt: 'The development of e-commerce and online shopping has had significant effects on traditional businesses and communities.\n\nDo the advantages of online shopping outweigh the disadvantages for society as a whole? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-19'),
      '9.0': advancedSample(
        `E-commerce has made vast inventories, price comparison and home delivery routine, expanding access particularly for rural residents and people with limited mobility. These gains are significant, but they are accompanied by concentrated market power, precarious logistics work and weakened town centres. I judge the advantages to outweigh the disadvantages narrowly, and only where regulation makes platforms bear their full social costs.

Online retail reduces the time and geographical barriers involved in purchasing. Consumers can locate specialised goods, compare sellers and obtain essentials without a difficult journey. Small manufacturers can reach national markets without maintaining multiple premises, while digital stock systems may match supply and demand efficiently. Competition can lower prices and expose poor service through visible reviews.

The same scale generates harmful asymmetries. Dominant platforms can use seller data to compete against the businesses they host, while shifting profits away from communities where sales occur. Independent shops that provide employment, informal social contact and distinctive streets struggle against firms whose tax and property costs differ. The apparent convenience of rapid delivery also relies on warehouses and couriers operating under intense time pressure. Multiple delivery attempts, packaging and high return rates create environmental costs absent from the displayed price.

These disadvantages are not inherent to ordering remotely. Competition authorities can restrict self-preferencing and acquisitions that entrench dominance. Tax rules should apply consistently across physical and digital retailers, and employment standards must protect logistics workers. Consolidated delivery points, reusable packaging and pricing that reflects urgent shipping can reduce emissions. Meanwhile, local governments can support adaptable town centres combining retail with housing, services and cultural activity.

In conclusion, online shopping produces genuine social value through accessibility, selection and efficiency. Its advantages exceed the harms only marginally because current convenience often transfers costs to workers, communities and the environment. Effective competition, labour and environmental rules are what make the positive balance defensible.`,
        'La respuesta sopesa acceso y eficiencia frente a poder de mercado y costes externalizados, con una conclusión condicionada.',
        [
          ['Task Response', 'Realiza un balance explícito y desarrolla impactos sociales más allá del consumidor.'],
          ['Coherence & Cohesion', 'La argumentación avanza de beneficios a asimetrías y respuestas regulatorias.'],
          ['Lexical Resource', 'Usa léxico preciso: “market power”, “self-preferencing”, “logistics workers”, “displayed price”.'],
          ['Grammar', 'Las estructuras complejas son flexibles y exactas.'],
        ],
      ),
    },
  },
  'set-20': {
    prompt: 'Private car use contributes significantly to air pollution, traffic congestion, and greenhouse gas emissions in cities around the world.\n\nWhat measures should governments and city authorities take to reduce reliance on private cars and encourage the use of more sustainable transport? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    samples: {
      '5.5': band55('set-20'),
      '9.0': advancedSample(
        `Car dependence is produced by urban systems, not simply by irresponsible drivers. If housing is distant from employment and alternatives are slow or unsafe, appeals to sustainable behaviour will fail. Authorities must therefore combine high-quality transport and compact planning with pricing that reflects the costs cars impose.

The immediate priority is a connected network of reliable alternatives. Frequent buses need dedicated lanes and priority at junctions; rail and bus timetables should integrate with a single affordable fare. Protected cycle routes and generous pavements must form continuous networks rather than isolated showcase projects. Coverage matters as much as speed: shift workers and peripheral communities require safe services beyond conventional commuting hours. Shared bicycles and mobility hubs can solve the final part of a journey.

Once credible alternatives exist, cities can manage demand. Congestion charging, limited parking and low-emission zones make scarce road space and pollution visible in the price of driving. Revenue should be legally directed to public transport and rebates for residents with disabilities or unavoidable journeys. Phased introduction is crucial, since charging people before providing an alternative would be regressive and politically fragile.

Land use determines whether progress lasts. Allowing mixed-income housing near transport, and permitting shops, schools and workplaces within neighbourhoods, shortens journeys and enables walking. Conversely, low-density expansion at the urban edge locks households into car ownership for decades. Freight consolidation centres and timed deliveries can reduce commercial traffic without impeding essential goods.

Governments should publish outcomes such as journey reliability, roadside air quality and access by income group, adjusting policy when burdens are uneven.

In conclusion, sustainable mobility requires both attraction and restraint. Excellent alternatives make change possible; road pricing and parking reform make it rational; compact development makes it permanent. Implemented in that order and with explicit equity protections, these measures can reduce private-car reliance without restricting access to work and public life.`,
        'La respuesta trata la dependencia del automóvil como resultado sistémico y secuencia las medidas según viabilidad y equidad.',
        [
          ['Task Response', 'Propone un conjunto completo, explica mecanismos y atiende condiciones distributivas.'],
          ['Coherence & Cohesion', 'La estructura “hacer posible, racional y permanente” integra toda la propuesta.'],
          ['Lexical Resource', 'El vocabulario es exacto: “mobility hubs”, “manage demand”, “regressive”, “freight consolidation”.'],
          ['Grammar', 'La gramática compleja es precisa y contribuye a la argumentación.'],
        ],
      ),
    },
  },
} satisfies Partial<Record<string, IeltsGuidedWritingReference>>;

/**
 * References for staged Sets 21–40 are intentionally authored but unreleased.
 * Eligibility remains controlled independently by ielts-guided-eligibility.json.
 */
export const IELTS_GUIDED_WRITING_BY_SET = {
  ...IELTS_GUIDED_WRITING_RELEASED_BY_SET,
  ...IELTS_GUIDED_WRITING_DRAFTS_21_40,
} satisfies Partial<Record<string, IeltsGuidedWritingReference>>;
