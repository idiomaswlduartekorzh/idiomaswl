export type IeltsGuidedBand55AuthoredSample = {
  setId: `set-${number}`;
  answer: string;
  taskResponseNote: string;
  cohesionMarkers?: readonly string[];
  cohesionNote: string;
  repeatedTerm?: string;
  lexicalNote: string;
  grammarEvidence?: readonly string[];
};

/**
 * Independently authored intermediate responses. The limitations are spread
 * across all four Writing criteria and are intentionally uneven by set; they
 * are not advanced essays with a fixed number of errors added afterwards.
 */
export const IELTS_GUIDED_WRITING_55_AUTHORED_SAMPLES: readonly IeltsGuidedBand55AuthoredSample[] = [
  {
    setId: 'set-2',
    answer: `Environmental problems are discussed every day, and it is easy for one person to feel too small to help. Some people say only governments and big companies can make a real change. Other people say individual actions are important. I think both are needed, although governments have the larger responsibility.

On the one hand, many problems are much bigger than a household. A family can separate plastic, but they cannot control the smoke from factories or decide how electricity is produced. Also, greener choices are not always available. In my town the buses finish early, so many workers uses a car even if they prefer not to. Governments can make rules for industry and can spend money on clean transport. These decisions has an effect on millions of people at the same time.

On the other hand, people still make many choices in a normal week. They buy food, use water and decide how much they throw away. If many people avoids single-use bags, shops will notice and offer another type. People can also vote, join a local cleaning activity or complain when a company pollutes a river. These actions are smaller, but they show what the public wants. I know a neighbourhood where people asked for recycling bins and the council finally installed them.

In conclusion, individuals cannot solve climate change or pollution alone. Large organisations control the most important systems and therefore they must act first. However, people should not use this as a reason to do nothing, because many small actions and public pressure can support the larger changes.`,
    taskResponseNote: 'Discute ambas posturas y mantiene la responsabilidad institucional como opinión, pero el ejemplo del barrio se afirma sin explorar su alcance.',
    cohesionMarkers: ['On the one hand', 'On the other hand', 'In conclusion'],
    cohesionNote: 'Organiza el contraste con una fórmula muy visible y enlaza varias ideas mediante “Also”.',
    repeatedTerm: 'people',
    lexicalNote: 'El léxico comunica el tema, pero repite “people” y usa expresiones amplias como “make a real change”.',
    grammarEvidence: ['many workers uses', 'These decisions has', 'many people avoids'],
  },
  {
    setId: 'set-3',
    answer: `International tourism brings visitors and money to many places, but it also creates difficult problems. I disagree that the problems are always bigger than the benefits. In my view, tourism is positive when a town controls the number of visitors and uses some of the income for local needs.

The clearest benefit is that tourism gives work to people in hotels, restaurants, transport and small shops. This is especially useful in a coastal town where there may not be many other jobs. Visitors also pay to enter museums or natural parks, and this money can help to protect them. For example, a local guide can earn money while explaining the history of an area. This is good for the guide and it can make tourists respect the place more.

However, too many tourists causes crowding and higher prices. Owners may rent homes to visitors because they can charge more, which make it harder for local families to find an apartment. Beaches and old streets can become full of rubbish, and local people sometimes feel that their town is no longer for them. These problems are serious, but they mostly happen when there is no planning.

These problems do not require tourism to stop. Authorities can limit new hotels, control holiday rentals and charge a visitor tax. The tax can pay for rubbish collection and public transport in the busy season. They can also limit entry to a fragile beach. I think these simple rules are more realistic than stopping tourism, because many families depend on it. Overall, tourism has disadvantages, especially for housing and the environment, but its jobs and income are valuable. I do not believe it creates more problems in every case.`,
    taskResponseNote: 'Sostiene un desacuerdo claro y considera beneficios y daños, aunque supone que la regulación funcionará sin analizar sus costes.',
    cohesionMarkers: ['The clearest benefit', 'However', 'These problems', 'Overall'],
    cohesionNote: 'La progresión es comprensible, aunque “These problems” resume una lista amplia y el cierre queda unido al párrafo de medidas.',
    repeatedTerm: 'tourism',
    lexicalNote: 'Usa vocabulario suficiente sobre turismo, pero repite “tourism” y recurre a “good” y “problems” con poca precisión.',
    grammarEvidence: ['too many tourists causes', 'which make it harder'],
  },
  {
    setId: 'set-4',
    answer: `Traffic jams waste time and make the air worse in many cities. Some people believe the best answer is free public transport. I partly disagree. Free buses and trains could help some passengers, but congestion also depends on service quality and on how many journeys happen at the same time.

A free service can persuade a person who is worried about cost to leave the car at home. It also helps students and workers with low salaries. However, a free bus is not attractive if it arrive late, takes a very long route or stops before a night worker finishes. The city may also lose ticket money, so there is less money for new buses. In this situation the system becomes free but more crowded, and drivers do not change.

A different response is to reduce the morning rush without paying for every ticket. Employers can let some staff start earlier or work from home for one or two days. Schools in the same district could begin at slightly different times. Delivery trucks can enter the centre after the busiest hour. These ideas do not remove cars completely, but they spread journeys across the day. For example, if a large office changes its starting time, hundreds of workers does not arrive on the same road at eight o'clock. Public transport still needs investment: bus lanes, reliable timetables and safe stations may influence drivers more than a zero price. Reduced fares could then be offered to people who need them instead of to every passenger.

For these reasons, free public transport is fair and can reduce some car journeys, but it is not the best single solution. Better services and different working, school and delivery times deal more directly with the reasons that roads are crowded.`,
    taskResponseNote: 'Evalúa la gratuidad y propone gestionar las horas punta, aunque apenas considera cómo coordinar los horarios entre instituciones.',
    cohesionMarkers: ['However', 'A different response', 'For example', 'For these reasons'],
    cohesionNote: 'La progresión cambia de tarifa a gestión horaria, pero el segundo párrafo reúne demasiadas medidas y el ejemplo de la oficina domina la explicación.',
    repeatedTerm: 'free',
    lexicalNote: 'El vocabulario de transporte es funcional; “free”, “money” y “time” se repiten en lugar de usar alternativas más exactas.',
    grammarEvidence: ['if it arrive late', 'hundreds of workers does not arrive'],
  },
  {
    setId: 'set-5',
    answer: `More people are living in a home by themselves instead of with relatives or a partner. This arrangement can suit some people, but I think the trend is mainly negative because a city needs more housing and more support services for the same population.

Firstly, there are practical reasons for a one-person home. A nurse who works at night may need a quiet place during the day, while an older person might want a small flat without stairs. Living alone also give a person control of meals, visitors and daily routines. This does not mean they dislike their family. They may visit relatives often and still prefer a separate address.

However, many small households use more space and equipment. Four adults in one home share a kitchen, heating and appliances, but four separate flats needs four sets of these things. This can increase energy use and demand for apartments. When a city already has a housing shortage, rents rise for families as well as for people who lives alone. This wider effect is more important than whether one resident enjoys privacy.

Secondly, some help that happened inside a family home must be provided in another way. A relative can notice illness, cook a meal or help with shopping. A person in a separate flat may need a council visitor or a community activity. These services are useful, but local services cannot always reach every neighbourhood.

In conclusion, a one-person home can be the right choice at one stage of life. Nevertheless, the growth of this arrangement puts pressure on housing, energy and care services. Cities should build compact flats with shared gardens or common rooms, but overall I see the trend as negative for society.`,
    taskResponseNote: 'Evalúa el desarrollo desde vivienda, energía y cuidados y no repite el ángulo de autonomía de Set 1, aunque generaliza el coste social.',
    cohesionMarkers: ['Firstly', 'However', 'Secondly', 'In conclusion'],
    cohesionNote: 'Cada párrafo cumple una función reconocible, pero la enumeración es rígida y “These services” tiene una referencia amplia.',
    repeatedTerm: 'home',
    lexicalNote: 'Repite “home” y “services”; algunas expresiones, como “provided in another way”, son comprensibles pero imprecisas.',
    grammarEvidence: ['Living alone also give', 'four separate flats needs', 'people who lives alone'],
  },
  {
    setId: 'set-6',
    answer: `Phones and computers are now used for school, games and communication. Some people want parents to limit children's screen time, while others believe children should use technology freely. I think parents should set limits, but the rules should depend on what the child is doing on the screen.

Digital freedom has a clear benefit: children needs digital skills for education and later work. They can research a school topic, practise a language or create a video. A child who lives far from friends can also speak to them online. If parents ban devices almost completely, children may not learn how to use technology responsibly. They could also have problems when homework requires an online platform.

The difficulty is that unlimited screen time can replace sleep, exercise and conversation. Many games and social media apps is designed to keep the user watching, so a young child may find it difficult to stop. There are also risks such as bullying and unsuitable videos. For example, a child who takes a phone to bed might continue scrolling for hours and then be tired at school. This example shows why adults cannot leave every decision to children.

My preferred answer is a few simple rules. Meals and bedrooms can be device-free, and entertainment can stop after a certain time. Educational work should have more flexibility than endless short videos. Parents should explain the reason for each rule and follow similar habits themselves. Overall, technology is useful and children should not be separated from modern life. Reasonable limits are still necessary for health and safety, with the aim of teaching control slowly rather than allowing everything or banning everything.`,
    taskResponseNote: 'Discute ambas posturas y propone límites por actividad, pero no desarrolla cómo deben cambiar las reglas según la edad.',
    cohesionMarkers: ['Digital freedom has a clear benefit', 'The difficulty is that', 'My preferred answer', 'Overall'],
    cohesionNote: 'El contraste se entiende, pero los encabezados oracionales anuncian cada función y el cierre se comprime dentro de la propuesta parental.',
    repeatedTerm: 'children',
    lexicalNote: 'El vocabulario es suficiente, con repetición de “children”, “rules” y “technology” y expresiones generales como “problems”.',
    grammarEvidence: ['children needs', 'apps is designed'],
  },
  {
    setId: 'set-7',
    answer: `Some people believe every child should learn a foreign language at school, while others prefer more time for subjects such as mathematics or science. I agree that a language should be compulsory, although schools should keep the programme practical and not take too many hours from other lessons.

Firstly, learning another language let children communicate with more people. It can help them when they travel, study abroad or apply for certain jobs. Starting at school is useful because not every family can pay for private classes. If the subject is optional, children from richer homes may receive this opportunity while other children does not. A common programme is therefore fairer.

Secondly, languages can teach more than words. Students compare different ways of expressing an idea and learn something about another culture. This may make them more patient when a classmate speaks differently. However, these benefits only happen when lessons involve speaking and real situations. Memorising long vocabulary lists for an exam often make students dislike the subject and they forget the words quickly.

The concern about other subjects is understandable. Schools have limited time, and some pupils need extra support in reading or mathematics. For this reason, I would require one foreign language but not several. Two or three good lessons each week is enough in many schools, especially if teachers use projects that connect with geography or history.

In conclusion, foreign-language study should be compulsory because it gives useful skills and equal access to an opportunity. Nevertheless, the course should be limited, practical and taught well, so it supports education instead of becoming another heavy exam subject.`,
    taskResponseNote: 'Defiende la obligatoriedad y reconoce la presión curricular, aunque la afirmación sobre dos o tres clases queda poco justificada.',
    cohesionMarkers: ['Firstly', 'Secondly', 'However', 'For this reason', 'In conclusion'],
    cohesionNote: 'Ordena las razones de forma clara pero muy enumerativa, con conectores repetidos al inicio de párrafos.',
    repeatedTerm: 'language',
    lexicalNote: 'El léxico educativo es adecuado, pero repite “language”, “subject” y “school” y emplea “good lessons” de forma poco precisa.',
    grammarEvidence: ['learning another language let', 'other children does not', 'often make students', 'lessons each week is enough'],
  },
  {
    setId: 'set-8',
    answer: `Musicians, painters and writers need money while they create their work. Some people think governments should support them, but other people say artists must find private funding. I believe limited public support is useful, especially for work that has cultural value but is not likely to make a large profit.

The argument against grants is simple. Public money is needed for hospitals, schools and other important services, and taxpayers may not want to pay for a performance which they never see. Artists can sell tickets or paintings, and businesses can sponsor popular events. Private funding also encourages artists to think about an audience. If nobody is interested in the work, it may not be reasonable to continue paying for it every year.

Yet the market does not support every valuable type of art. A community theatre or a poet in a minority language may have a small audience, although their work preserves local stories. Young artists also need time to develop before they can earn enough money. Without some help, only people with rich families could take this risk. A small grant can pay for materials or a public performance and give the artist a first chance.

My own view is that governments should offer grants through an independent group, not choose art because politicians like it. The amount and purpose should be public, and support should normally last for a fixed period. Artists could also be asked to give a workshop or make some work available to the community. They should seek income from audiences and companies when possible, but private money alone will ignore less profitable cultural work. Fair and limited government funding can protect this work without taking an unreasonable amount from essential services.`,
    taskResponseNote: 'Cubre las dos fuentes de financiación y propone subvenciones limitadas, aunque no examina el posible sesgo del comité independiente.',
    cohesionMarkers: ['The argument against grants', 'Yet the market', 'My own view'],
    cohesionNote: 'La respuesta usa tres bloques de extensión desigual; “this work” y “it” recuperan ideas amplias sin mucha precisión.',
    repeatedTerm: 'artists',
    lexicalNote: 'Repite “artists”, “work” y “support”; el rango basta para comunicar, pero no distingue bien entre formas de financiación.',
  },
  {
    setId: 'set-9',
    answer: `Zoos attract many families, but there is disagreement about keeping wild animals in captivity. Some people say zoos protect species and educate visitors, while others think the practice is cruel. I believe traditional zoos should be replaced, although some conservation centres may still need to keep animals.

Firstly, a zoo can support breeding programmes for a species that is close to extinction. It may also pay for research and protection in the wild. Visitors, especially children, can see an animal directly and might care more about its future. For example, seeing a large cat can be more memorable than looking at one picture in a book. These benefits is real when the organisation has trained staff and a serious conservation plan.

However, many animals have a very small space compared with their natural territory. A cage cannot provide the hunting, movement or social life which some species needs. Animals may repeat the same movement because they are stressed. Education is also limited if visitors only watch a bored animal for a few minutes and then buys a snack. In this case the zoo is mainly entertainment.

Secondly, conservation centres should keep only animals that cannot return to the wild or are part of a necessary breeding programme. They should use large natural areas and explain the purpose of every animal kept there. Common species that are healthy in the wild do not need to be displayed in city cages.

In conclusion, zoos can contribute to conservation, but this does not justify keeping any animal for public amusement. The usual city zoo is a negative practice and should close or change into a genuine rescue and conservation centre.`,
    taskResponseNote: 'Discute conservación y bienestar y fija una condición clara, pero trata la educación del público con un solo ejemplo simple.',
    cohesionMarkers: ['Firstly', 'However', 'Secondly', 'In conclusion'],
    cohesionNote: 'La progresión es clara y mecánica; “In this case” resume sin precisar qué tipos de zoológico incluye.',
    repeatedTerm: 'animal',
    lexicalNote: 'Maneja vocabulario pertinente, pero repite “animal”, “zoo” y “conservation” con flexibilidad limitada.',
    grammarEvidence: ['These benefits is real', 'some species needs', 'visitors only watch a bored animal for a few minutes and then buys a snack'],
  },
  {
    setId: 'set-10',
    answer: `Many people leave rural areas and move to cities, and this is likely to continue. The main causes are better jobs, education and services in urban areas. The movement can improve a person's opportunities, but it also creates pressure in cities and weakens some villages. Young adults often cannot find suitable work near their home. Farming may offer uncertain income, while a city has factories, offices and a larger number of customers. Universities and specialist hospitals are also usually located in cities. Once some family members move, they tell others about jobs and provide a place to stay, so the movement becomes easier.

The effect on cities is mixed. New residents can fill jobs and start businesses, which is positive. However, housing and transport may not grow fast enough. Rents increases, roads become crowded and schools receive more students than they planned for. Some migrants accept unsafe housing or informal work because they need income quickly. City authorities then has to provide services to a population that changed faster than expected.

The countryside experiences a different effect. Rural areas lose working-age residents, an older population remains, and local shops or schools may close because there are fewer customers and children. Families can send money back, which helps, but money does not replace workers or community leaders. This effect can make the next young person more likely to leave.

Overall, people move mainly because important opportunities are concentrated in cities. The trend can bring personal progress and useful workers to urban economies, but it also produces crowded services and rural decline. Governments should create regional colleges and jobs, although this may only slow the movement rather than stop it.`,
    taskResponseNote: 'Responde causas y efectos en ambos espacios, pero la recomendación regional aparece tarde y sin explicar cómo funcionaría.',
    cohesionMarkers: ['However', 'The countryside experiences', 'This effect', 'Overall'],
    cohesionNote: 'La apertura mezcla tesis y causas en un bloque largo; “The effect/This effect” deja referentes amplios entre ciudad y campo.',
    repeatedTerm: 'cities',
    lexicalNote: 'El vocabulario es claro, pero repite “cities”, “move” y “jobs” y usa términos amplios como “important opportunities”.',
    grammarEvidence: ['Rents increases', 'City authorities then has'],
  },
  {
    setId: 'set-11',
    answer: `Rapid urban growth has brought dirty air, hot neighbourhoods and fewer natural areas. City governments can make urban life better by protecting green space, improving buildings and providing ordinary public services. These actions may not look impressive, but they affect people every day.

Firstly, cities need more trees and surfaces that can absorb rain. Street trees provides shade and make walking more comfortable during hot weather. Small parks, planted roofs and restored streams can also cool an area. When every empty space is covered by concrete, heavy rain moves quickly into drains and can cause flooding. For this reason, new building projects should include trees and some open ground, especially in poorer neighbourhoods which often has less shade.

Secondly, old homes waste energy and can be unhealthy. Better insulation keep rooms cooler in summer and warmer in winter. The city could give financial help to low-income owners, while landlords should meet a minimum standard. This would reduce electricity use and household bills. However, the policy could be expensive, and I am not sure how quickly every building could be improved.

Finally, a liveable city needs reliable rubbish collection, clean public toilets and safe pavements. People cannot enjoy a new central park if rubbish stays for days near their home or a wheelchair cannot move along the street. These basic services are sometimes ignored because they are not exciting projects.

The practical result is that city governments should focus on shade, rainwater, efficient homes and dependable local services. Together these measures can reduce environmental problems and make neighbourhoods healthier, although they will require steady spending over many years.`,
    taskResponseNote: 'Propone medidas de resiliencia, edificios y servicios cotidianos, pero reconoce el coste sin resolver cómo priorizar la inversión.',
    cohesionMarkers: ['Firstly', 'Secondly', 'However', 'Finally', 'The practical result'],
    cohesionNote: 'Agrupa medidas con una lista muy explícita y usa “These actions/These basic services” como referencias generales.',
    repeatedTerm: 'city',
    lexicalNote: 'Usa vocabulario urbano suficiente, pero repite “city”, “services” y “buildings” y califica proyectos como “exciting” sin precisión.',
    grammarEvidence: ['Street trees provides', 'neighbourhoods which often has', 'Better insulation keep'],
  },
  {
    setId: 'set-12',
    answer: `Social media is part of daily life, particularly for young people. It makes communication and information easier, but it also creates problems with privacy, false information and mental health. I believe the disadvantages are slightly greater, although this depends on how a person uses the platforms.

On the positive side, people can stay in contact with relatives who live far away and join groups about work, study or hobbies. A small business can show products without paying for a shop in a busy street. Young people also receive news quickly and can hear experiences that are not shown on traditional television. For somebody who feels alone in their local area, an online community may be helpful.

On the negative side, the information is not always reliable. A dramatic false story often spread faster than a careful correction. Platforms also collects information about users and shows advertising based on their behaviour. Many young people compare their normal life with edited photos, which can make them feel unsuccessful. In addition, notifications interrupt study and sleep. These problems can happen slowly, so the user do not always notice the change.

However, the advantages are not enough to ignore these risks. Schools should teach students how to check a source, and platforms should make privacy settings simple. Families can keep phones away from meals and bedrooms. These measures help, but companies still earn money when people stays online for a long time.

In conclusion, social media offers useful communication and access to information. Nevertheless, misinformation, data collection and pressure on attention make the overall effect more negative for society, especially for younger users.`,
    taskResponseNote: 'Realiza un balance y sostiene que las desventajas pesan algo más, pero no compara directamente la importancia de cada beneficio y daño.',
    cohesionMarkers: ['On the positive side', 'On the negative side', 'However', 'In conclusion'],
    cohesionNote: 'La organización es fácil de seguir, aunque se basa en etiquetas opuestas y “These problems/These measures” poco específicas.',
    repeatedTerm: 'people',
    lexicalNote: 'El rango permite explicar riesgos digitales, pero repite “people”, “information” y “platforms” y usa “helpful” de forma general.',
    grammarEvidence: ['story often spread', 'Platforms also collects', 'the user do not', 'people stays online'],
  },
  {
    setId: 'set-13',
    answer: `Immigration affects employment, public services and culture in a receiving country. Some people believe the effects are mainly positive, while others worry about costs and social tension. I think immigration is generally positive if the government plans for population growth and helps newcomers enter work and community life.

Economic benefits are the stronger part of this case. Migrants often fill jobs where employers cannot find enough workers. They pay taxes, buy goods and sometimes create new businesses. A country with an ageing population may also need younger workers to support services. Immigration brings languages, food and ideas, which can make a city more interesting. For example, a migrant-owned shop can employ local residents as well as relatives.

Pressure appears when a fast increase in population put strain on housing, schools and hospitals. Local people may believe newcomers receive help before them, even when the real problem is that services were already weak. Language difficulties can create misunderstanding, and some employers may pay migrants less. If the government does not respond, tension grows between groups who actually face similar problems.

These negative effects can be reduced. Authorities should plan housing and school places using realistic population figures. Language classes and recognition of overseas qualifications help migrants work at their proper level. Rules against exploitation are important for both migrant and local workers. Communities can also organise events, although one festival will not solve deeper disagreements. On balance, immigration brings economic and social benefits, but these benefits are not automatic. With investment and fair labour rules, the positive effects are likely to be greater than the difficulties.`,
    taskResponseNote: 'Discute beneficios y preocupaciones y añade condiciones, aunque el ejemplo comercial es pequeño frente a las afirmaciones nacionales.',
    cohesionMarkers: ['Economic benefits', 'Pressure appears', 'These negative effects', 'On balance'],
    cohesionNote: 'Los bloques tienen títulos oracionales claros, pero el cierre queda absorbido por una lista extensa de respuestas públicas.',
    repeatedTerm: 'migrants',
    lexicalNote: 'El vocabulario sobre empleo e integración es adecuado, con repetición de “migrants”, “workers” y “services”.',
    grammarEvidence: ['increase in population put strain'],
  },
  {
    setId: 'set-14',
    answer: `Artificial intelligence is now used in decisions about jobs, loans and medical treatment. This can be positive because a computer can examine a large amount of information quickly. However, I only support this development when people can understand and challenge an important decision.

Firstly, AI can find patterns that a person may miss. In a hospital, a system can compare an image with many previous cases and warn a doctor about a possible disease. It can also apply the same first check to every job application instead of becoming tired. This may make decisions faster and more consistent. Still, the final result is not automatically fair just because a computer produced it.

Secondly, an AI system learn from past information. If that information contains unfair treatment, the system may repeat it. A rejected applicant might receive only a number and no useful explanation. This is serious because a loan or a job affects a person's whole life. Medical information also need strong protection, since people does not choose to share private details with every company.

Governments should require testing before these systems are used. Companies must record what information was considered and provide a human appeal. An independent organisation should check whether different groups receive very different results. AI should advise a trained professional in high-risk cases, not make the final decision by itself. I think this rule is especially important in medicine, but the exact boundary can be difficult.

In conclusion, AI decision-making can improve speed and sometimes accuracy, so it is a positive development with conditions. Clear explanations, privacy protection, regular testing and a real human appeal are necessary safeguards.`,
    taskResponseNote: 'Responde la evaluación y propone salvaguardas concretas, aunque deja poco definido qué decisiones cuentan como alto riesgo.',
    cohesionMarkers: ['Firstly', 'Still', 'Secondly', 'In conclusion'],
    cohesionNote: 'La secuencia beneficio–riesgo–regla es clara, pero los marcadores enumerativos y “This is serious” simplifican la progresión.',
    repeatedTerm: 'decision',
    lexicalNote: 'Usa vocabulario funcional de IA, pero repite “decision/system/information” y emplea “whole life” con poca precisión académica.',
    grammarEvidence: ['an AI system learn', 'Medical information also need', 'people does not choose'],
  },
  {
    setId: 'set-15',
    answer: `The world produces enough food, but hunger and poor nutrition continue. This happens because food is not always available where it is needed and because many families cannot afford it. Conflict and weak farming systems make the problem worse. Both immediate help and longer-term support are required.

One reason is affordability. Having food in the world market does not mean a poor household can buy it. Prices can rise after a bad harvest, while wages stay the same. Some villages also lack safe roads or storage, so crops are damaged before reaching customers. Farmers may grow only one crop and become vulnerable to drought. These problems show that the total amount of food is only one part of the issue.

Conflict creates another barrier. War forces farmers from their land and block deliveries. Aid organisations may have food nearby but cannot enter an unsafe area. Climate change is another cause because rainfall becomes less predictable. Children and pregnant women suffer especially when the available diet has calories but not enough vitamins. This can affect health and learning for many years.

Governments should support school meals, cash payments and emergency nutrition when families are in danger. At the same time, farmers need irrigation, storage, credit and advice about different crops. International organisations can fund these projects and protect access for aid. Reducing waste in rich countries is useful, but it will not feed a family who has no money or lives inside a conflict. Overall, hunger remains because poverty, transport, conflict and farming risks prevent food from reaching people fairly. Emergency assistance saves lives, while stronger local agriculture and social support can reduce the problem in the future.`,
    taskResponseNote: 'Relaciona causas y respuestas en dos plazos, aunque agrupa muchas soluciones sin explicar cuál debería recibir prioridad.',
    cohesionMarkers: ['One reason', 'Conflict creates another barrier', 'At the same time', 'Overall'],
    cohesionNote: 'La progresión de causa a respuesta se entiende, aunque la solución y el cierre comparten un párrafo cargado de listados.',
    repeatedTerm: 'food',
    lexicalNote: 'El léxico de alimentación es suficiente, con repetición de “food”, “families” y “support” y algunas categorías amplias.',
    grammarEvidence: ['War forces farmers from their land and block deliveries'],
  },
  {
    setId: 'set-16',
    answer: `Governments and companies are investing more in wind and solar power. This has important advantages because renewable energy can reduce pollution and dependence on imported fuels. However, the change from fossil fuels also creates technical and social problems that need planning.

Firstly, wind and sunlight do not produce smoke while electricity is generated. A country can also use its own natural resources instead of buying gas from abroad. New solar and wind projects creates jobs in construction and maintenance. As the technology becomes common, the price may fall. These benefits make renewable power attractive for both the environment and the economy.

However, the sun does not shine at night and the wind is not constant. Electricity systems needs storage, stronger cables and other sources that can respond quickly. These improvements are expensive. A solar farm also uses land, and local residents may oppose large turbines near their homes. Therefore, renewable projects are not completely free from environmental or community concerns.

Secondly, workers in coal, oil and gas industries may lose stable jobs. Telling them that green jobs will appear is not enough if those jobs is in another region or requires different skills. Governments should offer training and invest in affected towns before mines or plants close. This part is sometimes forgotten when leaders announce a national target.

In conclusion, renewable investment brings cleaner air, more energy security and new industries. The main challenges are unreliable supply, network costs and the effect on workers and regions. These difficulties can be managed, but the transition should happen in stages rather than through sudden closures.`,
    taskResponseNote: 'Cubre ventajas y retos técnicos y laborales, aunque la oposición local se menciona y se abandona sin evaluación.',
    cohesionMarkers: ['Firstly', 'However', 'Therefore', 'Secondly', 'In conclusion'],
    cohesionNote: 'La respuesta avanza por bloques previsibles y usa “These benefits/These improvements/These difficulties” repetidamente.',
    repeatedTerm: 'renewable',
    lexicalNote: 'El vocabulario energético es comprensible, pero repite “renewable”, “jobs” y “projects” y usa “unreliable supply” de forma general.',
    grammarEvidence: ['projects creates jobs', 'Electricity systems needs', 'those jobs is in another region or requires different skills'],
  },
  {
    setId: 'set-17',
    answer: `Governments sometimes use behavioural science to influence choices, for example by making pension saving automatic or placing healthy food where it is easy to see. I think this can be acceptable, but only when the purpose is public, people can refuse and the government checks the results.

One acceptable example is pension saving. A small change in how a choice is presented can help people do something they already want to do. Many workers intend to save but forget to complete a form. Automatic enrolment makes saving the normal option while still allowing them to leave. A reminder about a tax deadline can also prevent a fine. These methods are cheaper than a large campaign and do not normally remove choice.

The concern is that the same knowledge can manipulate citizens. A message may hide important information or make one option look frightening. People do not always know that their behaviour is being studied. There is also a question about who decides what is best. A default that helps most people may cause difficulty for a small group, and this group might be ignored because the average result looks good.

For this reason, governments should publish the aim, method and evidence for each programme. People must have an easy way to choose another option. An independent body should check whether the policy harms one group and whether a less controlling method could work. I would not allow hidden techniques for political support, although the difference between information and influence is sometimes unclear. Behavioural policies are acceptable when they are transparent, easy to refuse and used for a clear public benefit. Without these limits, they risk becoming manipulation rather than helpful guidance.`,
    taskResponseNote: 'Establece condiciones de aceptabilidad y reconoce riesgos, pero deja sin resolver la frontera que él mismo identifica entre informar e influir.',
    cohesionMarkers: ['One acceptable example', 'The concern is that', 'For this reason', 'Without these limits'],
    cohesionNote: 'La respuesta parte de un caso antes de generalizar; “this group/these limits” conserva referentes amplios y el cierre no tiene párrafo propio.',
    repeatedTerm: 'people',
    lexicalNote: 'Maneja vocabulario relevante, con repetición de “people”, “choice” y “government” y uso general de “small change”.',
    grammarEvidence: ['the purpose is public, people can refuse'],
  },
  {
    setId: 'set-18',
    answer: `Gene editing may allow doctors to treat inherited diseases, but it could also be used to choose characteristics in future children. I think the medical benefits can be greater than the risks if treatment is limited to serious disease and controlled by international rules.

Firstly, some genetic illnesses are caused by one faulty gene and currently have no cure. Correcting that gene could prevent a child from suffering throughout life. It may also reduce the emotional and financial pressure on a family. Research on cells can help scientists understand disease even before a safe treatment exist. These are strong reasons to continue careful medical research.

However, changing an embryo is different because the change may pass to later generations. A mistake would affect a person who could not agree to the procedure. Scientists also does not understand every interaction between genes. A change intended to prevent one condition might create another problem. In addition, wealthy parents may try to choose height or appearance, which could increase inequality and treat children like products.

Secondly, countries should permit tightly controlled research and treatment for severe diseases, but not enhancement for ordinary preferences. Independent ethics groups must review trials, and patients needs clear information about uncertainty. Because one country's decision can affect research elsewhere, international standards are important. Still, countries may disagree about what counts as a serious disease.

In conclusion, gene editing has the potential to remove terrible inherited conditions, so banning it would lose a major benefit. Nevertheless, changes to embryos and non-medical enhancement create serious risks. The benefits outweigh the dangers only under strict testing, public oversight and a narrow medical purpose.`,
    taskResponseNote: 'Sopesa tratamiento y mejora genética y fija límites, aunque reconoce sin resolver el desacuerdo sobre qué enfermedad es suficientemente grave.',
    cohesionMarkers: ['Firstly', 'However', 'In addition', 'Secondly', 'Still', 'In conclusion'],
    cohesionNote: 'La progresión es clara, pero depende de conectores visibles y añade el argumento de desigualdad con poca integración.',
    repeatedTerm: 'disease',
    lexicalNote: 'El vocabulario genético es suficiente, aunque repite “gene”, “disease” y “change” y usa “terrible” de manera poco académica.',
    grammarEvidence: ['before a safe treatment exist', 'Scientists also does not understand', 'patients needs clear information'],
  },
  {
    setId: 'set-19',
    answer: `Online shopping has changed how people buy almost every type of product. It offers convenience and choice, but it also affects local shops, workers and the environment. I believe the advantages are slightly greater, as long as online companies follow fair tax, labour and delivery rules.

Convenience is the clearest advantage. A customer can compare prices and find an unusual product without travelling to several shops. This is particularly helpful for a person with limited mobility or somebody who lives far from a town. A small producer can also sell to customers in other regions without renting many stores. These advantages saves time and can make some products cheaper.

However, local shops provide jobs and give a town centre activity. When many of them close, residents lose places where they meet other people as well as places to buy things. Warehouse and delivery workers may face strong pressure to complete orders quickly. Fast shipping also creates packaging and repeated van journeys. A customer sees a low price, but some of these other costs are hidden.

Regulation could make the balance fairer. Online and physical businesses should pay taxes under similar rules. Delivery companies should protect workers and combine parcels when possible. Customers could pay more for urgent delivery, while collection points reduce failed journeys. Local councils can help empty shops become cafés, services or homes, but this does not replace every lost business. Overall, online shopping gives useful access, selection and lower prices. Its harms are serious, especially for workers and town centres, but I think the advantages slightly outweigh the disadvantages for society, not by a large amount.`,
    taskResponseNote: 'Realiza el balance social y lo condiciona a regulación, aunque no demuestra cuánto compensan las medidas a los comercios perdidos.',
    cohesionMarkers: ['Convenience is the clearest advantage', 'However', 'Regulation could', 'Overall'],
    cohesionNote: 'La progresión es lógica, aunque la respuesta regulatoria y el cierre quedan juntos y “these other costs” tiene un referente amplio.',
    repeatedTerm: 'shops',
    lexicalNote: 'El vocabulario comercial comunica bien, pero repite “shops”, “delivery” y “rules” y usa “give a town centre activity” de forma imprecisa.',
    grammarEvidence: ['These advantages saves'],
  },
  {
    setId: 'set-20',
    answer: `Private cars contribute to dirty air, traffic and carbon emissions. Governments should make other forms of travel practical and then make unnecessary driving less attractive. One measure will not work for every journey, so cities need several actions together.

Firstly, buses and trains must be reliable, safe and available outside the city centre. A bus that waits in the same traffic as cars do not give drivers a reason to change. Dedicated lanes and simple tickets can improve the service. Routes also needs to run at night for shift workers. Without this, a policy may only help office workers who travel at normal times.

Secondly, walking and cycling should feel safe. Continuous pavements, protected cycle lanes and secure bicycle parking makes short journeys easier without a car. Schools can close nearby streets at arrival time. These changes are useful, but they are less suitable for a person carrying heavy equipment or travelling a long distance, so public transport is still necessary.

After alternatives improve, cities can charge more for parking and introduce congestion or low-emission zones. The money should return to transport services in poorer areas. Authorities should also manage delivery traffic through shared collection centres and quieter delivery times. However, charges introduced before alternatives would punish residents who have no real choice.

Finally, planning can place homes, shops and schools closer together, although changing a city in this way takes many years.

In conclusion, reliable transport, safe walking and cycling, fair driving charges, better freight planning and shorter distances can reduce car dependence. The policies should be introduced in that order so sustainable travel becomes possible before driving becomes more expensive.`,
    taskResponseNote: 'Propone un paquete secuenciado y considera excepciones, pero el cambio de uso del suelo aparece apenas desarrollado al final.',
    cohesionMarkers: ['Firstly', 'Secondly', 'After', 'However', 'Finally', 'In conclusion'],
    cohesionNote: 'Agrupa medidas con una lista explícita y el párrafo de planificación queda desequilibrado frente a los anteriores.',
    repeatedTerm: 'transport',
    lexicalNote: 'El vocabulario de movilidad es adecuado, con repetición de “transport”, “driving” y “alternatives” y alguna formulación general.',
    grammarEvidence: ['A bus that waits in the same traffic as cars do not give', 'Routes also needs', 'pavements, protected cycle lanes and secure bicycle parking makes'],
  },
] as const;
