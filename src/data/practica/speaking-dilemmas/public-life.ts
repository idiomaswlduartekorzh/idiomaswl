import type { SpeakingDilemma } from './types'

export const PUBLIC_LIFE_DILEMMAS: readonly SpeakingDilemma[] = [
  {
    slug: 'city-centre-access',
    title: 'A car-free city centre?',
    prompt: 'Your town has funding to redesign its main shopping street. Should it give the street almost entirely to pedestrians, or keep a low-speed lane for buses and authorised vehicles?',
    options: [
      { label: 'A pedestrian street', description: 'Allow deliveries before shops open and provide pick-up points at both ends. Use the rest of the street for walking, seating and outdoor stalls.' },
      { label: 'A limited-access lane', description: 'Keep buses and authorised vehicles on one lane. Widen the pavements with the space that remains.' },
    ],
    conditionalPrompt: 'Identify who relies on door-to-door access and what would make an access trial convincing.',
    vocabulary: {
      nouns: [
        ['footfall', 'the number of people visiting or passing a place', 'The new market increased Saturday footfall.'],
        ['through traffic', 'vehicles passing through an area on their way elsewhere', 'Through traffic takes the ring road.'],
        ['kerbside access', 'being able to stop a vehicle beside the pavement', 'Some passengers need kerbside access.'],
        ['trade-off', 'a gain that comes with a sacrifice', 'There is a trade-off between seating and road space.'],
      ],
      phrasalVerbs: [
        ['carve out space', 'find or create room for something', 'The council carved out space for benches.'],
        ['phase in a change', 'introduce a change gradually', 'The city phased in new delivery hours.'],
        ['factor in a need', 'include a need in your calculations or plans', 'The plan factors in evening deliveries.'],
        ['fall back on a route', 'use a route when the preferred one fails', 'Drivers can fall back on the ring road.'],
      ],
      adjectives: [
        ['pedestrian-friendly', 'designed to make walking easy and safe', 'The crossing makes the area more pedestrian-friendly.'],
        ['viable', 'able to work in practice', 'Early deliveries are viable for several shops.'],
        ['disproportionate', 'too large in relation to what caused it', 'The small saving came at a disproportionate cost.'],
        ['exempt', 'excused from a rule', 'Emergency vehicles remain exempt.'],
      ],
      connectors: [
        ['On balance, …', 'give a judgement after considering both sides', 'On balance, I’d widen the pavements.'],
        ['That said, …', 'qualify the point you just made', 'That said, some people still need a lift.'],
        ['To the extent that …', 'specify the condition or degree of a claim', 'To the extent that loading works, shops can adapt.'],
        ['Conversely, …', 'introduce a contrasting possibility', 'Conversely, buses could stop on the main street.'],
      ],
    },
    models: {
      a: [
        'I’d go for a **pedestrian-friendly** street. At the moment, people largely pass through it. If we **carve out space** for seats and stalls, some will stay longer, which matters more to shops than the amount of **through traffic**.',
        '**That said**, I’d still provide a staffed pick-up point at each end. I’d ask wheelchair users to test the route between those points and the shops. A hundred metres can be an easy walk for one person and a real barrier for another.',
        '**On balance**, I’d choose A if the loading hours are **viable** and the trial shows people can still reach the services they need. I’d track **footfall** on ordinary weekdays as well as market days.',
      ],
      b: [
        'I’d keep the lane. Removing **through traffic** already gives the street a lot more room. I’d use that space for wider pavements while keeping doors within reach for passengers who depend on **kerbside access**.',
        '**That said**, I can see how a bus lane could dominate a narrow street. I’d **factor in** the space buses need to pass and keep all private vehicles out unless they’re **exempt**. Bus frequency and speed would matter as much as the lane itself.',
        '**On balance**, the **trade-off** is worth it if the bus brings people to the centre who can’t comfortably arrive another way. If the lane barely gets used, we can give the space back to pedestrians.',
      ],
      conditional: [
        'I’d **phase in** the change by trying a pedestrian street on Saturdays. We could measure **footfall** and walk the whole route with people who rely on door-to-door transport. A good Saturday alone wouldn’t tell us enough about weekday deliveries.',
        '**Conversely**, if travel to the pharmacy or the bus interchange became much harder, I’d keep a **viable** lane for authorised trips. A few reports from shopkeepers might flag a problem, though I’d want to check how often it happens.',
        '**On balance**, I’d choose A if the new access points serve most users without imposing a **disproportionate** burden on others. I’d choose B if a lane makes the difference between getting there and staying home.',
      ],
    },
  },
  {
    slug: 'heatwave-investment',
    title: 'Shade trees or cooling centres?',
    prompt: 'A town expects hotter summers and has one heat-adaptation grant. Should it invest in street trees that will mature over several years, or open staffed cooling centres for the next three summers?',
    options: [
      { label: 'Street trees', description: 'Plant large-canopy species along exposed walking routes and fund early maintenance. Shade will build gradually as the trees grow.' },
      { label: 'Cooling centres', description: 'Extend opening hours at three cooled public buildings. Residents can use them during heat alerts, although travel there may still be hot.' },
    ],
    conditionalPrompt: 'Decide what risk would justify immediate relief and what would make investment in shade reliable.',
    vocabulary: {
      nouns: [
        ['canopy cover', 'the area shaded or covered by tree crowns', 'Canopy cover is sparse along the bus route.'],
        ['uptake', 'the rate at which people use an offer or service', 'Uptake rose when the centre opened later.'],
        ['exposure', 'being subjected to something potentially harmful', 'A shaded stop reduces heat exposure.'],
        ['maintenance backlog', 'necessary upkeep that has accumulated unfinished', 'A maintenance backlog delayed tree care.'],
      ],
      phrasalVerbs: [
        ['roll out a service', 'introduce a service across places or groups', 'They rolled out a weekend service.'],
        ['tide someone over', 'help someone through a temporary difficulty', 'The grant tided the centre over until autumn.'],
        ['set aside funds', 'reserve money for a particular purpose', 'Set aside funds for summer watering.'],
        ['scale up a scheme', 'increase the size or reach of a scheme', 'The town scaled up the shade scheme.'],
      ],
      adjectives: [
        ['cumulative', 'increasing as effects build up over time', 'The benefits of shade are cumulative.'],
        ['heat-resilient', 'able to function or survive in high heat', 'The nursery selected heat-resilient trees.'],
        ['interim', 'temporary until a longer-term solution exists', 'A shaded tent was an interim measure.'],
        ['underserved', 'receiving fewer services than needed', 'The eastern district is underserved.'],
      ],
      connectors: [
        ['In the short term, …', 'focus on the immediate future', 'In the short term, opening hours matter most.'],
        ['Over time, …', 'show a gradual change', 'Over time, the trees will cast more shade.'],
        ['Even if …', 'show that a point holds despite a condition', 'Even if it rains today, summer watering is needed.'],
        ['With that in mind, …', 'base a decision on the previous point', 'With that in mind, I’d check the bus timetable.'],
      ],
    },
    models: {
      a: [
        'I’d plant the trees. People can’t always rearrange their lives around an alert. A better route to the shops or a bus stop reduces daily **exposure** even for residents who would never visit a public building to cool down.',
        '**In the short term**, centres can **tide people over**, and that has value. My concern is that their reach ends at the door. I’d start with the most exposed routes and **set aside funds** for watering. A **maintenance backlog** could wipe out much of the benefit.',
        '**Over time**, the **cumulative** gains would justify the wait, provided the town chooses **heat-resilient** species and publishes a realistic maintenance plan. That makes the trees my preferred use of this particular grant.',
      ],
      b: [
        'I’d open the centres. The first hot spell could arrive before trees offer any useful shade. An **interim** service has a clear purpose when residents need somewhere cool for several hours today.',
        '**Even if** the town can plant healthy trees, developing **canopy cover** will take years. I’d **roll out** longer hours at the sites people already use and check whether the town’s most **underserved** areas have a practical way to reach them. A building that is close on a map may feel distant in the heat.',
        '**With that in mind**, I’d judge the plan by **uptake** during alerts and by who is still missing out. If a centre attracts mainly those with other options, I’d revise its opening hours or location.',
      ],
      conditional: [
        'My choice depends on where **exposure** happens. If people have no cool room at home and the centres are easy to reach, I’d **roll out** an **interim** service. I’d want to know who actually comes during the hottest part of the day.',
        '**Over time**, trees can help far more people along routes everyone uses. I’d favour them if residents already have a fallback during alerts and the town can **set aside funds** to keep the trees alive past the first summer.',
        '**With that in mind**, I’d compare centre **uptake** with a map of low **canopy cover**. Broad daily gaps in shade point toward planting. A concentrated group facing dangerous heat this year points toward opening centres first.',
      ],
    },
  },
  {
    slug: 'affordable-housing-mix',
    title: 'More small flats or fewer family homes?',
    prompt: 'A housing provider can use one grant to convert offices into forty small flats or build twenty larger family homes near schools. Both schemes would charge below-market rents. Which should come first?',
    options: [
      { label: 'Small converted flats', description: 'Use an empty building near transit and get more households into homes sooner. The layout would suit one or two adults.' },
      { label: 'Family homes', description: 'Build homes with enough bedrooms for larger households. Completion will take longer and fewer households will benefit at first.' },
    ],
    conditionalPrompt: 'Identify the housing need the waiting list may conceal and decide how you would compare the two schemes.',
    vocabulary: {
      nouns: [
        ['turnaround', 'the time needed to complete and deliver something', 'A conversion offered a shorter turnaround.'],
        ['overcrowding', 'too many people living in too little space', 'The survey revealed severe overcrowding.'],
        ['tenure', 'the arrangement under which someone occupies a home', 'Secure tenure lets families plan ahead.'],
        ['vacancy', 'a home or space available because nobody occupies it', 'There was one vacancy in the building.'],
      ],
      phrasalVerbs: [
        ['fit out a building', 'equip the inside for a particular use', 'They fitted out the old office as flats.'],
        ['free up a home', 'make a home available for somebody else', 'Moving out freed up a family home.'],
        ['double up', 'share a space that would normally be separate', 'Two households doubled up to save rent.'],
        ['hold out for a home', 'wait until a preferred home becomes available', 'They held out for a place near school.'],
      ],
      adjectives: [
        ['self-contained', 'having its own facilities without sharing them', 'The flat is fully self-contained.'],
        ['prohibitive', 'so costly or difficult that it prevents action', 'The cost of moving proved prohibitive.'],
        ['adaptable', 'able to be changed for different needs', 'An adaptable layout can serve different households.'],
        ['cramped', 'too small to be comfortable', 'Four people shared a cramped flat.'],
      ],
      connectors: [
        ['At face value, …', 'describe what appears true on first inspection', 'At face value, forty homes looks better.'],
        ['By the same token, …', 'apply the same reasoning to another case', 'By the same token, a longer tenancy deserves weight.'],
        ['On the other hand, …', 'consider the other side of a trade-off', 'On the other hand, the conversion is faster.'],
        ['Ultimately, …', 'state the deciding consideration', 'Ultimately, the size of each household matters.'],
      ],
    },
    models: {
      a: [
        'I’d fund the conversion. The quicker **turnaround** matters to someone who is paying for a room they can barely afford. Forty **self-contained** flats would give more people a place of their own, and I’d want the provider to offer secure **tenure** from the start.',
        '**On the other hand**, forty units won’t help a family that needs three bedrooms. One benefit worth checking is whether some single tenants in underoccupied homes would move, which could **free up** larger places for families.',
        '**Ultimately**, I’d choose A because it produces usable homes sooner. I’d check that the building can be **fitted out** with good daylight and ventilation before treating every proposed flat as a genuine gain.',
      ],
      b: [
        'I’d build the family homes. **At face value**, forty beats twenty, yet a unit count tells you very little about the number of people housed. A family living in **cramped** conditions may have waited years for a home of the right size.',
        'The case for building is stronger if several families are having to **double up** and moving privately would be **prohibitive**. A home near school can also make a long tenancy workable when time and travel already eat into the budget.',
        '**Ultimately**, I’d prioritise the project that addresses the most persistent **overcrowding**. I’d keep the office conversion on the list for the next grant because shorter lead times still matter.',
      ],
      conditional: [
        'I’d look beyond the headline numbers. If **vacancy** is especially low for small flats and people are stuck in shared housing, I’d **fit out** the office quickly. A **self-contained** place would be a substantial improvement.',
        '**By the same token**, if families are consistently having to **hold out for** homes near schools, a unit count would understate the value of larger ones. I’d compare the typical wait for each household size and look for signs of **overcrowding**.',
        '**Ultimately**, A makes sense when speed would relieve the largest unmet need. B makes sense when the people waiting longest have no realistic substitutes. I’d give extra weight to homes with **adaptable** layouts either way.',
      ],
    },
  },
  {
    slug: 'heritage-site-access',
    title: 'A ballot or paid time slots?',
    prompt: 'A fragile heritage site can admit only a fixed number of visitors each day. Should it allocate free places by ballot or charge for bookable time slots and use the revenue for conservation?',
    options: [
      { label: 'A free ballot', description: 'Randomly allocate places among applicants, with some spaces held back for same-week requests. People can enter more than once during the season.' },
      { label: 'Paid time slots', description: 'Let visitors reserve a specific slot for a fee. Offer free slots to local schools and use the remaining revenue for repairs.' },
    ],
    conditionalPrompt: 'Decide how to balance fair access, reliable bookings and the need to care for the site.',
    vocabulary: {
      nouns: [
        ['carrying capacity', 'the number a place can support without significant damage', 'The path is at its carrying capacity.'],
        ['no-show', 'someone who reserves a place and does not come', 'A reminder cut the number of no-shows.'],
        ['price barrier', 'a cost that prevents access', 'Even a small fee can be a price barrier.'],
        ['wear and tear', 'gradual damage from ordinary use', 'The old steps show years of wear and tear.'],
      ],
      phrasalVerbs: [
        ['book up', 'become fully reserved', 'Holiday slots book up quickly.'],
        ['price people out', 'make access too expensive for people', 'High fees could price families out.'],
        ['set aside places', 'reserve places for a particular use', 'They set aside places for local schools.'],
        ['open up access', 'make it easier for more people to participate', 'Short-notice slots open up access for locals.'],
      ],
      adjectives: [
        ['oversubscribed', 'having more applicants than available places', 'The first ballot was oversubscribed.'],
        ['regressive', 'placing a heavier relative burden on people with less money', 'A flat fee can be regressive.'],
        ['time-sensitive', 'depending on timing or requiring prompt action', 'A trip with train bookings is time-sensitive.'],
        ['predictable', 'able to be planned for in advance', 'Timed tickets make demand more predictable.'],
      ],
      connectors: [
        ['In principle, …', 'state a general idea before practical limits', 'In principle, anyone can enter the ballot.'],
        ['In practice, …', 'describe how something works in real life', 'In practice, most slots go before noon.'],
        ['To guard against that, …', 'introduce a safeguard against a risk', 'To guard against that, the site sends a reminder.'],
        ['Provided that …', 'specify a requirement that must be met', 'Provided that slots remain available, visitors can plan ahead.'],
      ],
    },
    models: {
      a: [
        'I’d take the free ballot. The **carrying capacity** creates scarcity either way. Charging for a place adds a **price barrier** on top of that, which could be especially **regressive** for households paying for several tickets.',
        '**In practice**, a free ticket can increase **no-shows**, and a ballot makes travel planning harder. **To guard against that**, I’d ask winners to confirm the day before, then **open up** any unclaimed spaces to people on a waiting list.',
        'It would still be an **oversubscribed** site. The ballot makes that scarcity easier to defend because the allocation is transparent. I’d ask the town for a separate repairs budget so access and conservation don’t have to depend on the same fee.',
      ],
      b: [
        'I’d charge a modest fee for timed visits. Visitors with **time-sensitive** travel plans need a slot they can count on. And if the price contributes to repairing **wear and tear**, it connects the cost of visiting with caring for the place.',
        '**In principle**, I’d **set aside places** for schools and people who need a waiver. **In practice**, those places need to cover weekends as well as unpopular hours. That’s what would stop us from **pricing people out** while saying access is open.',
        'I’d support B **provided that** the conservation revenue and the free allocation are published. That would give the site a more **predictable** stream of funds and give the public a way to see what it is paying for.',
      ],
      conditional: [
        'I’d decide after seeing who gets excluded under each system. If paid slots **book up** early and a **price barrier** keeps local households away, I’d favour the ballot, even if it proves **oversubscribed**.',
        'A ballot can also exclude people who can’t rearrange their travel. **In practice**, if confirmed bookings matter and repairs lack stable funding, I’d accept fees **provided that** free slots are genuinely usable.',
        'I’d **set aside places** for a six-week test of both systems. The deciding figures would be **no-shows**, who actually visits and how much goes to conservation. Staying within **carrying capacity** is a condition of both, so it can’t settle the choice on its own.',
      ],
    },
  },
  {
    slug: 'wildlife-conservation',
    title: 'Connect habitats or protect one wetland?',
    prompt: 'A conservation trust can fund either a habitat corridor linking two small reserves or extra protection for one intact wetland. Which would make better use of a five-year grant?',
    options: [
      { label: 'Connect the reserves', description: 'Work with landowners to create hedges and strips of habitat between the reserves. Benefits depend on animals using the route and on landowners maintaining it.' },
      { label: 'Protect the wetland', description: 'Secure the wetland’s boundary and restore damaged edges. The money would concentrate on species already living in one place.' },
    ],
    conditionalPrompt: 'Explain what would count as evidence of movement or an urgent threat to the wetland.',
    vocabulary: {
      nouns: [
        ['fragmentation', 'the breaking up of a larger habitat into smaller pieces', 'A new road increased habitat fragmentation.'],
        ['refuge', 'a place that provides shelter or protection', 'The wetland is a refuge for migrating birds.'],
        ['bottleneck', 'a restricted point that limits movement or progress', 'The bridge is a bottleneck for wildlife.'],
        ['stewardship', 'long-term responsibility for looking after something', 'The lease rewards careful land stewardship.'],
      ],
      phrasalVerbs: [
        ['link up reserves', 'join separate reserves so they connect', 'Hedges link up two small reserves.'],
        ['fence off a site', 'use fencing to limit access to a site', 'Workers fenced off the damaged bank.'],
        ['die out', 'cease to exist locally or altogether', 'Without suitable habitat, the local population may die out.'],
        ['build in safeguards', 'include protections in the original design', 'The agreement builds in safeguards for both sites.'],
      ],
      adjectives: [
        ['interconnected', 'linked to each other', 'The reserve is part of an interconnected network.'],
        ['intact', 'still whole and in good condition', 'Much of the wetland remains intact.'],
        ['site-specific', 'designed for the needs of one particular place', 'The wetland needs site-specific work.'],
        ['irreversible', 'impossible to undo', 'Some habitat loss would be irreversible.'],
      ],
      connectors: [
        ['For one thing, …', 'introduce one key reason among several', 'For one thing, the road blocks movement.'],
        ['The caveat is that …', 'identify a limit on the point just made', 'The caveat is that the route is untested.'],
        ['That being the case, …', 'draw a conclusion from an established condition', 'That being the case, I’d prioritise the reserve.'],
        ['Equally, …', 'give a second point comparable weight', 'Equally, the wetland shelters rare species.'],
      ],
    },
    models: {
      a: [
        'I’d try to **link up** the reserves. **Fragmentation** means that protecting two separate patches can still leave each one isolated. An **interconnected** network would give animals more room to move when conditions change.',
        '**The caveat is that** a line on a map isn’t a working corridor. I’d check the most likely **bottleneck**, then **build in safeguards** for land **stewardship**. Otherwise, one gap could undo the work on either side.',
        'I’d back A if observations suggest animals already try to cross the area. The wetland matters too, and I’d want a separate plan for routine upkeep. This particular grant gives the trust a chance to change the way the two reserves function together.',
      ],
      b: [
        'I’d protect the wetland. **For one thing**, it’s an **intact** habitat that already acts as a **refuge**. We can point to the area it serves now, while the corridor will depend on several agreements and on how animals respond.',
        'If damage at the edge becomes **irreversible**, a future grant may come too late. I’d **fence off** sensitive sections only where evidence supports it and use **site-specific** restoration for the banks. Protecting the boundary is a means of keeping the habitat functioning.',
        '**Equally**, the corridor could help in the longer term. I’d keep talking to landowners and test where crossings happen. For this grant, I’d choose the wetland because the loss we can prevent is the better-evidenced one.',
      ],
      conditional: [
        'I’d ask which loss could be **irreversible** within five years. If a species could **die out** locally because the wetland is deteriorating, that **refuge** comes first. A **site-specific** survey would matter more to me than the appeal of either idea on paper.',
        '**Equally**, if the wetland is stable and the two reserves are separated by a clear **bottleneck**, I’d try to **link them up**. That option looks stronger if wildlife already attempts the crossing.',
        '**That being the case**, I’d choose B for a documented threat to the wetland and A for a crossing problem we can realistically fix. I’d ask for the same monitoring effort either way so we learn whether the grant worked.',
      ],
    },
  },
  {
    slug: 'library-access',
    title: 'Renovate the library or take it on the road?',
    prompt: 'A district has funding for one library project. Should it renovate the main branch as a larger study and meeting space, or send a mobile library to neighbourhoods far from the branch?',
    options: [
      { label: 'Renovate the main branch', description: 'Add accessible desks, quiet rooms and reliable internet at the busiest branch. People still need to travel to one location.' },
      { label: 'Run a mobile library', description: 'Send books and basic services to several neighbourhoods on a published timetable. The vehicle can carry only a limited stock and offers no quiet study room.' },
    ],
    conditionalPrompt: 'Identify whether the main problem is reaching a service or finding a space to work once you get there.',
    vocabulary: {
      nouns: [
        ['catchment area', 'the area from which a service draws its users', 'The branch has a wide catchment area.'],
        ['outreach', 'efforts to contact people a service does not usually reach', 'Outreach brought new families to the library.'],
        ['footprint', 'the physical area a building or service occupies', 'The renovation keeps the same footprint.'],
        ['continuity', 'reliable provision without interruptions', 'Weekly visits would give borrowers continuity.'],
      ],
      phrasalVerbs: [
        ['reach out to residents', 'make contact with residents to involve them', 'Librarians reached out to new residents.'],
        ['stock up on books', 'obtain a supply of books for future use', 'The driver stocked up on children’s books.'],
        ['branch out', 'start offering something beyond your usual activities', 'The library branched out into homework clubs.'],
        ['drop in', 'visit briefly without an appointment', 'Students can drop in after school.'],
      ],
      adjectives: [
        ['outlying', 'situated far from the centre', 'The route covers outlying villages.'],
        ['underused', 'used less than its capacity or value suggests', 'The top floor is underused.'],
        ['multi-purpose', 'designed to serve several functions', 'A multi-purpose room hosts talks and lessons.'],
        ['year-round', 'available throughout the whole year', 'The service needs year-round funding.'],
      ],
      connectors: [
        ['To begin with, …', 'introduce the first reason', 'To begin with, travel takes an hour.'],
        ['For all its benefits, …', 'acknowledge advantages before raising a concern', 'For all its benefits, the van has limited space.'],
        ['On a practical level, …', 'shift from the idea to how it would work', 'On a practical level, timetables matter.'],
        ['As long as …', 'specify a condition that must remain true', 'As long as stops are regular, borrowers can plan.'],
      ],
    },
    models: {
      a: [
        'I’d renovate the branch. A library is one of the few places where people can **drop in** and spend an afternoon without buying anything. An **underused** floor could become a **multi-purpose** space for study, internet access and small community meetings.',
        '**For all its benefits**, a mobile library can’t offer the same **continuity** for a student who needs somewhere to work every day. And if we build within the existing **footprint**, the project could offer more public space without acquiring another site.',
        '**On a practical level**, I’d make sure evening hours and the route from the bus stop are part of the plan. If the branch is hard to reach, the renovation may help its regulars without helping enough of the district.',
      ],
      b: [
        'I’d start with the mobile library. **To begin with**, the **catchment area** is large, and people in **outlying** neighbourhoods may spend longer travelling than they do choosing a book. That’s an **outreach** problem a larger branch won’t solve.',
        'Library staff could **reach out to residents** through schools and community halls. It can **stock up on books** based on requests, so it needn’t carry the whole collection. A dependable stop matters more than an impressive launch.',
        '**As long as** the council plans for **year-round** running costs, I’d take B. I’d judge it by whether new users become regular borrowers, rather than how many people turn up for the first visit.',
      ],
      conditional: [
        'I’d look at who isn’t using the service and why. If learners need quiet rooms every day, I’d improve the branch and let them **drop in** outside school hours. A **multi-purpose** floor would serve more than one group.',
        '**On a practical level**, an empty room near the centre does nothing for someone living in an **outlying** neighbourhood without a direct bus. I’d choose the mobile service if an **outreach** trial shows those users can keep coming to a regular stop.',
        '**For all its benefits**, either project could end up serving people who already have the easiest access. I’d make the choice based on repeated visits from the intended users and the **continuity** the district can actually fund.',
      ],
    },
  },
  {
    slug: 'household-energy-grants',
    title: 'Insulate homes or replace old appliances?',
    prompt: 'A district has money to cut energy bills for households on low incomes. Should it offer fewer grants for home insulation or smaller grants that let more households replace inefficient appliances?',
    options: [
      { label: 'Home insulation grants', description: 'Improve draughty homes with the highest heating needs. Assessments and installation take time, and some tenants need their landlord’s permission.' },
      { label: 'Appliance grants', description: 'Replace inefficient fridges and other heavily used appliances. Work can start quickly, although savings depend on which appliance is replaced.' },
    ],
    conditionalPrompt: 'Explain what would count as a meaningful saving, and how the policy should treat renters.',
    vocabulary: {
      nouns: [
        ['upfront cost', 'money needed before the benefits begin', 'The upfront cost puts the work out of reach.'],
        ['heat loss', 'warmth escaping from a building or room', 'A roof survey found substantial heat loss.'],
        ['split incentive', 'a situation where the payer and beneficiary are different', 'A split incentive can delay work in rented homes.'],
        ['payback period', 'time needed for savings to match the original cost', 'The grant shortens the payback period.'],
      ],
      phrasalVerbs: [
        ['seal off a gap', 'close a gap completely to stop air passing', 'The installer sealed off a gap near the door.'],
        ['swap out an appliance', 'replace an appliance with another one', 'They swapped out the oldest fridge.'],
        ['cut back on use', 'reduce how much something is used', 'The new fridge helps cut back on energy use.'],
        ['add up', 'combine to produce a significant total', 'Small monthly savings add up.'],
      ],
      adjectives: [
        ['cost-effective', 'giving a good result for the money spent', 'Roof insulation can be cost-effective.'],
        ['draughty', 'letting cold air flow through gaps', 'The hallway is unusually draughty.'],
        ['long-lasting', 'continuing to work or have an effect for a long time', 'The upgrade creates a long-lasting benefit.'],
        ['eligible', 'meeting the conditions to receive something', 'Renters are eligible for the grant.'],
      ],
      connectors: [
        ['In the first instance, …', 'say what should happen first', 'In the first instance, check the building.'],
        ['For that reason, …', 'link a choice to the reason just given', 'For that reason, I’d start with repairs.'],
        ['Assuming that …', 'state what you are taking as given', 'Assuming that the landlord agrees, work can start.'],
        ['Even then, …', 'show a limit that remains after a condition is met', 'Even then, the household may need help with the bill.'],
      ],
    },
    models: {
      a: [
        'I’d insulate the homes where **heat loss** is greatest. If rooms are **draughty**, residents are paying to heat air that escapes. **Sealing off** gaps and improving insulation can make a room more comfortable as well as lowering demand.',
        '**In the first instance**, I’d check for a **split incentive**. Tenants shouldn’t have to pay an **upfront cost** for work that improves somebody else’s asset. The grant needs an agreement with the landlord so the tenant can benefit while they live there.',
        '**For that reason**, I’d start with the worst-performing homes whose owners agree to the work. A **long-lasting** improvement can justify helping fewer households at first, especially where minor appliance savings wouldn’t change whether people can afford to stay warm.',
      ],
      b: [
        'I’d start with appliances. If the district can **swap out** a failing fridge within days, a household can benefit straight away. Those savings can **add up** across many homes and don’t depend on securing permission to alter the property.',
        '**Even then**, I wouldn’t replace a working appliance just because it looks old. I’d look at its measured consumption and the likely **payback period**. Otherwise a quick scheme could spend money on changes that aren’t particularly **cost-effective**.',
        '**For that reason**, I’d make the highest-use appliances **eligible** first and include renters directly. Insulation deserves its own longer programme because a **split incentive** can make it hard to deliver within a short grant window.',
      ],
      conditional: [
        'I’d compare the buildings and the appliances first. **Assuming that** the homes lose heat quickly and the landlord agrees, insulation is the better **long-lasting** investment. A survey should show where we can **seal off** gaps or improve the envelope.',
        'Where the **split incentive** blocks work, or heating demand is already low, smaller grants to **swap out** inefficient equipment may reach more people. I’d estimate the **payback period** from what households actually use.',
        '**For that reason**, I’d treat the two options as proposals competing on savings, comfort and access. A wins for the coldest homes where work can go ahead. B wins when a **cost-effective** appliance change can help renters promptly.',
      ],
    },
  },
]
