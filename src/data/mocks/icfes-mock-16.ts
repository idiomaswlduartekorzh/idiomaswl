import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-16',
  examSlug: 'icfes',
  title: 'Mock 16 · Cultura e identidad',
  subtitle: 'Saber 11 · Componente de Inglés · 55 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [
    {
      part: 1,
      title: 'Parte 1 — Vocabulario: relacionar palabras',
      instructions: 'Match each definition with the word that best fits it.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          text: 'The traditions, customs, monuments, and values that are passed down through generations and form part of a community\'s identity.',
          options: [
            'Heritage',
            'Folklore',
            'Mythology',
            'Tradition',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'The quality of including many different types of people, ideas, or cultural backgrounds in a group or society.',
          options: ['Uniformity', 'Diversity', 'Conformity', 'Exclusivity'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'Relating to people who are the original inhabitants of a land, before colonization or outside settlement.',
          options: ['Colonial', 'Nomadic', 'Indigenous', 'Peripheral'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'A fixed, oversimplified idea or image about a particular group of people, often based on assumptions rather than facts.',
          options: ['Prejudice', 'Assumption', 'Bias', 'Stereotype'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'Belonging to or relating to the present time; modern in style or approach.',
          options: [
            'Archaic',
            'Contemporary',
            'Classical',
            'Traditional',
          ],
          answer: 1,
        },
      ],
    },
    {
      part: 2,
      title: 'Parte 2 — Diálogos',
      instructions: 'Read each dialogue and choose the best response to complete it.',
      questions: [
        {
          type: 'dialog',
          id: 'p2q1',
          part: 2,
          stimulus: 'Tourist: "I\'m visiting Colombia for the first time. What cultural experience would you most recommend?"\nLocal guide: _______',
          text: 'What is the most helpful and informative response from the guide?',
          options: [
            '"I\'d suggest visiting a traditional market and attending a local festival — you\'ll see the real character of the country."',
            '"Colombia is mostly known for its exports."',
            '"You should visit the same places as all other tourists."',
            '"Colombia doesn\'t really have a distinctive cultural identity yet."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Student A: "Did you know that many indigenous languages in Colombia are at risk of disappearing?"\nStudent B: _______',
          text: 'What is the most engaged and thoughtful response from Student B?',
          options: [
            '"That\'s expected — people always adopt more useful languages."',
            '"Indigenous languages are too difficult to learn anyway."',
            '"Most people prefer to speak Spanish, so it\'s not a big issue."',
            '"I hadn\'t thought about that. Why is language loss considered such a serious problem?"',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Interviewer: "You grew up abroad but returned to your home country as an adult. How did that affect your sense of identity?"\nInterviewee: "It was complex. I felt like I didn\'t fully belong anywhere."\nInterviewer: _______',
          text: 'What does the interviewer say next?',
          options: [
            '"That sounds like a normal experience for young people."',
            '"So do you regret moving back?"',
            '"That resonates with what many people in similar situations describe — a feeling of being between two worlds."',
            '"You should have stayed abroad if it was more comfortable."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Museum curator: "This collection focuses on Afro-Colombian artistic traditions. Many of these objects date back over three centuries."\nVisitor: _______',
          text: 'What is the most thoughtful visitor response?',
          options: [
            '"I prefer modern art — these objects look quite plain."',
            '"These must have been very expensive to collect."',
            '"It\'s remarkable how much cultural knowledge is preserved in everyday objects."',
            '"Are there any photographs from that period I could look at instead?"',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Friend A: "I heard you\'re taking a course in your grandparents\' native language. How\'s it going?"\nFriend B: "It\'s harder than I expected, but it feels important to me."\nFriend A: _______',
          text: 'What does Friend A say next?',
          options: [
            '"Why bother? You already speak Spanish and English."',
            '"Language learning is only practical if it helps your career."',
            '"You\'ll probably give up before you finish."',
            '"That\'s really meaningful — it\'s a way of staying connected to your roots."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Teacher: "For your project, choose a cultural tradition from Colombia and explain its historical origins."\nStudent: "Can I focus on the Carnaval de Barranquilla?"\nTeacher: _______',
          text: 'What does the teacher say?',
          options: [
            '"Yes, that\'s an excellent choice. It\'s a rich tradition with African, Indigenous, and European influences."',
            '"That\'s not a serious cultural event — choose something more academic."',
            '"I\'d prefer you to choose something less well-known."',
            '"The Carnaval is too complex a topic for a school project."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Journalist: "Some people argue that globalization is erasing local cultures. Do you agree?"\nExpert: _______',
          text: 'What is the most analytically balanced response from the expert?',
          options: [
            '"Yes, globalization will eventually make all cultures identical."',
            '"It\'s more nuanced than that — globalization can both threaten and, in some cases, revitalize cultural practices."',
            '"No, cultures never change regardless of outside influences."',
            '"Local cultures don\'t need protection — they can take care of themselves."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Parent: "Your sister wants to move to another country for work. I\'m worried she\'ll lose her culture."\nTeenager: _______',
          text: 'What is the most reassuring and reasonable response?',
          options: [
            '"She\'ll probably forget everything about home within a year."',
            '"She shouldn\'t go — it\'s too dangerous to live abroad."',
            '"Culture isn\'t that important — she should focus on her career."',
            '"Living abroad doesn\'t mean losing your identity — many people maintain strong cultural ties even from a distance."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Conference host: "Our next speaker will present research on how young people construct cultural identity in multicultural cities."\nResearcher: "Thank you. I\'d like to begin by challenging the idea that identity is fixed."\nHost: _______',
          text: 'What does the host say?',
          options: [
            '"Please keep your presentation under five minutes."',
            '"That\'s a controversial claim — most people believe identity never changes."',
            '"Fascinating — could you start by defining what you mean by \'fixed identity\'?"',
            '"We prefer to avoid debates about identity at this conference."',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 3,
      title: 'Parte 3 — Texto con espacios',
      instructions: 'Read the passage and choose the word or phrase that best fits each numbered blank.',
      questions: [
        {
          type: 'mcq',
          id: 'p3q1',
          part: 3,
          stimulus: `Globalization and Local Cultures: A Complex Relationship

Globalization has (1) nearly every aspect of modern life, from the food we eat to the music we hear on our phones. While many people celebrate the exchange of ideas and products across borders, others worry that local cultures are (2) at risk of disappearing under the weight of dominant global trends.

One of the most (3) changes brought by globalization is the spread of the English language. In many countries, English has become essential for economic participation — yet its dominance can come (4) the cost of regional languages, some of which are spoken by only a few thousand people. (5) a language disappears, an entire way of understanding the world disappears with it.

At the same time, globalization does not always destroy local culture. In some cases, it has given small communities a platform (6) they never had before. Artists and musicians from remote regions can now reach international audiences through streaming services and social media. Traditional crafts that might (7) died out in isolation have found new markets globally.

The key issue, (8), is power. When cultural exchange happens between communities of unequal economic and political influence, the weaker culture is always more vulnerable. Protecting cultural diversity requires deliberate effort — through education, policy, and community commitment — (9) simply hoping that traditions will survive on their own is rarely enough.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (1).',
          options: ['avoided', 'affected', 'rejected', 'isolated'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          stimulus: `Globalization and Local Cultures: A Complex Relationship

Globalization has (1) nearly every aspect of modern life, from the food we eat to the music we hear on our phones. While many people celebrate the exchange of ideas and products across borders, others worry that local cultures are (2) at risk of disappearing under the weight of dominant global trends.

One of the most (3) changes brought by globalization is the spread of the English language. In many countries, English has become essential for economic participation — yet its dominance can come (4) the cost of regional languages, some of which are spoken by only a few thousand people. (5) a language disappears, an entire way of understanding the world disappears with it.

At the same time, globalization does not always destroy local culture. In some cases, it has given small communities a platform (6) they never had before. Artists and musicians from remote regions can now reach international audiences through streaming services and social media. Traditional crafts that might (7) died out in isolation have found new markets globally.

The key issue, (8), is power. When cultural exchange happens between communities of unequal economic and political influence, the weaker culture is always more vulnerable. Protecting cultural diversity requires deliberate effort — through education, policy, and community commitment — (9) simply hoping that traditions will survive on their own is rarely enough.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (2).',
          options: ['increasingly', 'gradually less', 'rarely', 'no longer'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          stimulus: `Globalization and Local Cultures: A Complex Relationship

Globalization has (1) nearly every aspect of modern life, from the food we eat to the music we hear on our phones. While many people celebrate the exchange of ideas and products across borders, others worry that local cultures are (2) at risk of disappearing under the weight of dominant global trends.

One of the most (3) changes brought by globalization is the spread of the English language. In many countries, English has become essential for economic participation — yet its dominance can come (4) the cost of regional languages, some of which are spoken by only a few thousand people. (5) a language disappears, an entire way of understanding the world disappears with it.

At the same time, globalization does not always destroy local culture. In some cases, it has given small communities a platform (6) they never had before. Artists and musicians from remote regions can now reach international audiences through streaming services and social media. Traditional crafts that might (7) died out in isolation have found new markets globally.

The key issue, (8), is power. When cultural exchange happens between communities of unequal economic and political influence, the weaker culture is always more vulnerable. Protecting cultural diversity requires deliberate effort — through education, policy, and community commitment — (9) simply hoping that traditions will survive on their own is rarely enough.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (3).',
          options: [
            'controversial',
            'beneficial',
            'insignificant',
            'predictable',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          stimulus: `Globalization and Local Cultures: A Complex Relationship

Globalization has (1) nearly every aspect of modern life, from the food we eat to the music we hear on our phones. While many people celebrate the exchange of ideas and products across borders, others worry that local cultures are (2) at risk of disappearing under the weight of dominant global trends.

One of the most (3) changes brought by globalization is the spread of the English language. In many countries, English has become essential for economic participation — yet its dominance can come (4) the cost of regional languages, some of which are spoken by only a few thousand people. (5) a language disappears, an entire way of understanding the world disappears with it.

At the same time, globalization does not always destroy local culture. In some cases, it has given small communities a platform (6) they never had before. Artists and musicians from remote regions can now reach international audiences through streaming services and social media. Traditional crafts that might (7) died out in isolation have found new markets globally.

The key issue, (8), is power. When cultural exchange happens between communities of unequal economic and political influence, the weaker culture is always more vulnerable. Protecting cultural diversity requires deliberate effort — through education, policy, and community commitment — (9) simply hoping that traditions will survive on their own is rarely enough.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (4).',
          options: [
            'from',
            'by',
            'at',
            'with',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          stimulus: `Globalization and Local Cultures: A Complex Relationship

Globalization has (1) nearly every aspect of modern life, from the food we eat to the music we hear on our phones. While many people celebrate the exchange of ideas and products across borders, others worry that local cultures are (2) at risk of disappearing under the weight of dominant global trends.

One of the most (3) changes brought by globalization is the spread of the English language. In many countries, English has become essential for economic participation — yet its dominance can come (4) the cost of regional languages, some of which are spoken by only a few thousand people. (5) a language disappears, an entire way of understanding the world disappears with it.

At the same time, globalization does not always destroy local culture. In some cases, it has given small communities a platform (6) they never had before. Artists and musicians from remote regions can now reach international audiences through streaming services and social media. Traditional crafts that might (7) died out in isolation have found new markets globally.

The key issue, (8), is power. When cultural exchange happens between communities of unequal economic and political influence, the weaker culture is always more vulnerable. Protecting cultural diversity requires deliberate effort — through education, policy, and community commitment — (9) simply hoping that traditions will survive on their own is rarely enough.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (5).',
          options: [
            'Although',
            'When',
            'Unless',
            'Provided that',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          stimulus: `Globalization and Local Cultures: A Complex Relationship

Globalization has (1) nearly every aspect of modern life, from the food we eat to the music we hear on our phones. While many people celebrate the exchange of ideas and products across borders, others worry that local cultures are (2) at risk of disappearing under the weight of dominant global trends.

One of the most (3) changes brought by globalization is the spread of the English language. In many countries, English has become essential for economic participation — yet its dominance can come (4) the cost of regional languages, some of which are spoken by only a few thousand people. (5) a language disappears, an entire way of understanding the world disappears with it.

At the same time, globalization does not always destroy local culture. In some cases, it has given small communities a platform (6) they never had before. Artists and musicians from remote regions can now reach international audiences through streaming services and social media. Traditional crafts that might (7) died out in isolation have found new markets globally.

The key issue, (8), is power. When cultural exchange happens between communities of unequal economic and political influence, the weaker culture is always more vulnerable. Protecting cultural diversity requires deliberate effort — through education, policy, and community commitment — (9) simply hoping that traditions will survive on their own is rarely enough.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (6).',
          options: [
            'who',
            'that',
            'where',
            'what',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          stimulus: `Globalization and Local Cultures: A Complex Relationship

Globalization has (1) nearly every aspect of modern life, from the food we eat to the music we hear on our phones. While many people celebrate the exchange of ideas and products across borders, others worry that local cultures are (2) at risk of disappearing under the weight of dominant global trends.

One of the most (3) changes brought by globalization is the spread of the English language. In many countries, English has become essential for economic participation — yet its dominance can come (4) the cost of regional languages, some of which are spoken by only a few thousand people. (5) a language disappears, an entire way of understanding the world disappears with it.

At the same time, globalization does not always destroy local culture. In some cases, it has given small communities a platform (6) they never had before. Artists and musicians from remote regions can now reach international audiences through streaming services and social media. Traditional crafts that might (7) died out in isolation have found new markets globally.

The key issue, (8), is power. When cultural exchange happens between communities of unequal economic and political influence, the weaker culture is always more vulnerable. Protecting cultural diversity requires deliberate effort — through education, policy, and community commitment — (9) simply hoping that traditions will survive on their own is rarely enough.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (7).',
          options: [
            'had',
            'have',
            'be',
            'having',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          stimulus: `Globalization and Local Cultures: A Complex Relationship

Globalization has (1) nearly every aspect of modern life, from the food we eat to the music we hear on our phones. While many people celebrate the exchange of ideas and products across borders, others worry that local cultures are (2) at risk of disappearing under the weight of dominant global trends.

One of the most (3) changes brought by globalization is the spread of the English language. In many countries, English has become essential for economic participation — yet its dominance can come (4) the cost of regional languages, some of which are spoken by only a few thousand people. (5) a language disappears, an entire way of understanding the world disappears with it.

At the same time, globalization does not always destroy local culture. In some cases, it has given small communities a platform (6) they never had before. Artists and musicians from remote regions can now reach international audiences through streaming services and social media. Traditional crafts that might (7) died out in isolation have found new markets globally.

The key issue, (8), is power. When cultural exchange happens between communities of unequal economic and political influence, the weaker culture is always more vulnerable. Protecting cultural diversity requires deliberate effort — through education, policy, and community commitment — (9) simply hoping that traditions will survive on their own is rarely enough.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (8).',
          options: [
            'in contrast',
            'as a result',
            'furthermore',
            'however',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          stimulus: `Globalization and Local Cultures: A Complex Relationship

Globalization has (1) nearly every aspect of modern life, from the food we eat to the music we hear on our phones. While many people celebrate the exchange of ideas and products across borders, others worry that local cultures are (2) at risk of disappearing under the weight of dominant global trends.

One of the most (3) changes brought by globalization is the spread of the English language. In many countries, English has become essential for economic participation — yet its dominance can come (4) the cost of regional languages, some of which are spoken by only a few thousand people. (5) a language disappears, an entire way of understanding the world disappears with it.

At the same time, globalization does not always destroy local culture. In some cases, it has given small communities a platform (6) they never had before. Artists and musicians from remote regions can now reach international audiences through streaming services and social media. Traditional crafts that might (7) died out in isolation have found new markets globally.

The key issue, (8), is power. When cultural exchange happens between communities of unequal economic and political influence, the weaker culture is always more vulnerable. Protecting cultural diversity requires deliberate effort — through education, policy, and community commitment — (9) simply hoping that traditions will survive on their own is rarely enough.`,
          stimulusLabel: 'Read the passage and complete each blank.',
          text: 'Choose the best option for blank (9).',
          options: [
            'unless',
            'although',
            'whereas',
            'because',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 4,
      title: 'Parte 4 — Avisos y anuncios',
      instructions: 'Read each notice carefully and answer the questions that follow.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          stimulus: `MUSEO NACIONAL DE COLOMBIA
— VISITOR NOTICE —
Permanent collection: Open Tuesday–Sunday, 9:00 AM – 5:00 PM
Temporary exhibition "Raíces": Open until April 30
Entry fees: Adults $12,000 COP · Students and seniors $6,000 COP · Children under 6 FREE
Free admission every first Sunday of the month for all visitors
Photography allowed in permanent collection (no flash)
Photography strictly prohibited in temporary exhibitions
Backpacks must be stored in free lockers at the entrance`,
          stimulusLabel: 'Read the museum notice.',
          text: 'When is admission free for all visitors?',
          options: [
            'On the first Sunday of each month.',
            'Every Sunday of the month.',
            'Every Tuesday morning.',
            'Only for children under six years old.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: `MUSEO NACIONAL DE COLOMBIA
— VISITOR NOTICE —
Permanent collection: Open Tuesday–Sunday, 9:00 AM – 5:00 PM
Temporary exhibition "Raíces": Open until April 30
Entry fees: Adults $12,000 COP · Students and seniors $6,000 COP · Children under 6 FREE
Free admission every first Sunday of the month for all visitors
Photography allowed in permanent collection (no flash)
Photography strictly prohibited in temporary exhibitions
Backpacks must be stored in free lockers at the entrance`,
          stimulusLabel: 'Read the museum notice.',
          text: 'Which rule about photography is stated in the notice?',
          options: [
            'Photography is not allowed anywhere in the museum.',
            'Visitors must pay an extra fee to take photographs.',
            'Photography without flash is permitted in the permanent collection but is prohibited in temporary exhibitions.',
            'Photography is only allowed with a professional camera.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: `FESTIVAL CULTURAL IBEROAMERICANO — CARTAGENA
Annual celebration of music, dance, literature, and visual arts
Dates: March 14–21 | Venues across the historic city center
Events include:
- Open-air concerts at Plaza de los Coches (free entry)
- International film screenings (tickets required)
- Author readings and literary talks (limited seating — register online)
- Artisan market featuring crafts from 12 countries
Volunteer opportunities available — apply by March 1 at festivalibero.co`,
          stimulusLabel: 'Read the festival announcement.',
          text: 'What type of event requires advance online registration?',
          options: [
            'Author readings and literary talks.',
            'Open-air concerts in the plaza.',
            'The artisan market.',
            'International film screenings.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: `FESTIVAL CULTURAL IBEROAMERICANO — CARTAGENA
Annual celebration of music, dance, literature, and visual arts
Dates: March 14–21 | Venues across the historic city center
Events include:
- Open-air concerts at Plaza de los Coches (free entry)
- International film screenings (tickets required)
- Author readings and literary talks (limited seating — register online)
- Artisan market featuring crafts from 12 countries
Volunteer opportunities available — apply by March 1 at festivalibero.co`,
          stimulusLabel: 'Read the festival announcement.',
          text: 'Which statement about the festival is NOT accurate according to the notice?',
          options: [
            'The festival takes place over eight days.',
            'Volunteer positions are available for interested applicants.',
            'Crafts from twelve countries are featured in the artisan market.',
            'All festival events are free and open to the public.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: `GALERÍA ARTE CONTEMPORÁNEO — BOGOTÁ
VISITOR POLICY
- No food or drink inside the gallery at any time
- Artworks may not be touched under any circumstances
- Children under 12 must be accompanied by an adult at all times
- Guided tours: Fridays and Saturdays at 11:00 AM (book in advance)
- All sales inquiries must be directed to reception — staff on the floor cannot discuss prices
- The gallery reserves the right to refuse entry to visitors who do not comply with these rules`,
          stimulusLabel: 'Read the gallery policy notice.',
          text: 'What must visitors do if they want to inquire about purchasing an artwork?',
          options: [
            'Speak directly to any staff member on the floor.',
            'Direct all inquiries to the gallery reception.',
            'Fill in an online form on the gallery\'s website.',
            'Contact the artist directly after the exhibition.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: `GALERÍA ARTE CONTEMPORÁNEO — BOGOTÁ
VISITOR POLICY
- No food or drink inside the gallery at any time
- Artworks may not be touched under any circumstances
- Children under 12 must be accompanied by an adult at all times
- Guided tours: Fridays and Saturdays at 11:00 AM (book in advance)
- All sales inquiries must be directed to reception — staff on the floor cannot discuss prices
- The gallery reserves the right to refuse entry to visitors who do not comply with these rules`,
          stimulusLabel: 'Read the gallery policy notice.',
          text: 'What can the gallery do if a visitor does not follow the rules?',
          options: [
            'Ask the visitor to pay a fine.',
            'Call the police to remove the visitor.',
            'Escort the visitor to a restricted area.',
            'Deny the visitor entry to the gallery.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: `INSTITUTO CERVANTES — BOGOTÁ
SPANISH & CULTURE COURSES FOR NON-NATIVE SPEAKERS
Start dates: First Monday of each month
Levels: A1 to C2 (placement test required)
Class formats: In-person (Mon–Wed–Fri) or online (flexible schedule)
Duration: 8 weeks per level
Includes: Course materials, access to digital library, cultural events
Special offer: Enroll before the 20th and receive 15% off
For more information: bogota@cervantes.es | Tel: (601) 555-0190`,
          stimulusLabel: 'Read the language course flyer.',
          text: 'What must new students do before being placed in a class level?',
          options: [
            'Attend a free introductory class.',
            'Take a placement test.',
            'Submit a written application and two references.',
            'Provide proof of previous language study.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: `INSTITUTO CERVANTES — BOGOTÁ
SPANISH & CULTURE COURSES FOR NON-NATIVE SPEAKERS
Start dates: First Monday of each month
Levels: A1 to C2 (placement test required)
Class formats: In-person (Mon–Wed–Fri) or online (flexible schedule)
Duration: 8 weeks per level
Includes: Course materials, access to digital library, cultural events
Special offer: Enroll before the 20th and receive 15% off
For more information: bogota@cervantes.es | Tel: (601) 555-0190`,
          stimulusLabel: 'Read the language course flyer.',
          text: 'What discount is available and under what condition?',
          options: [
            'A 15% discount for students who enroll before the 20th of the month.',
            'A 20% discount for students who enroll in two levels at once.',
            'A 10% discount for students who refer a friend.',
            'A 15% discount for students who choose the online format.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: `INSTITUTO CERVANTES — BOGOTÁ
SPANISH & CULTURE COURSES FOR NON-NATIVE SPEAKERS
Start dates: First Monday of each month
Levels: A1 to C2 (placement test required)
Class formats: In-person (Mon–Wed–Fri) or online (flexible schedule)
Duration: 8 weeks per level
Includes: Course materials, access to digital library, cultural events
Special offer: Enroll before the 20th and receive 15% off
For more information: bogota@cervantes.es | Tel: (601) 555-0190`,
          stimulusLabel: 'Read the language course flyer.',
          text: 'Which of the following is included in the course enrollment?',
          options: [
            'A certificate of international accreditation.',
            'Free accommodation near the institute.',
            'Access to a digital library and cultural events.',
            'A private language tutor for individual sessions.',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 5,
      title: 'Parte 5 — Texto corto',
      instructions: 'Read the article and answer the questions that follow.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          stimulus: `The Resurgence of Indigenous Languages

Across Latin America, hundreds of indigenous languages are classified as endangered — spoken by aging populations in shrinking communities, with few young speakers to carry them forward. Yet a quiet but significant movement is pushing back against this trend. From Mexico's Zapotec communities to the Amazon basin in Colombia and Brazil, indigenous language revitalization programs are gaining momentum, driven by a mixture of cultural pride, academic support, and digital innovation.

In Colombia, the government has formally recognized 68 indigenous languages and committed to incorporating them into the national education system. Under the Ethnoeducation policy, indigenous communities can teach their languages as part of the school curriculum, ensuring that children grow up with access to both Spanish and their ancestral tongue. The results have been promising in some regions — communities that once expected their languages to vanish within a generation are now reporting stable or even growing numbers of young speakers.

Technology is also playing a growing role. Several indigenous communities have collaborated with universities to create digital dictionaries, grammar guides, and audio archives of oral traditions. Social media, often blamed for cultural homogenization, has in this case become an unexpected ally: young speakers use platforms like Instagram and TikTok to share content in their native languages, reaching audiences far beyond their geographic communities.

Linguists argue that the loss of any language is not merely a cultural loss but a cognitive one: each language encodes unique ways of categorizing reality, expressing relationships, and understanding the natural world. When a language dies, this knowledge disappears permanently. Revitalization efforts, imperfect and slow as they often are, represent an attempt to preserve not just words, but entire ways of being human.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main topic of this article?',
          options: [
            'Efforts to revive and preserve indigenous languages that are at risk of disappearing.',
            'The decline of Spanish in Latin American indigenous communities.',
            'Government opposition to indigenous language programs in schools.',
            'The role of digital technology in replacing traditional forms of communication.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: `The Resurgence of Indigenous Languages

Across Latin America, hundreds of indigenous languages are classified as endangered — spoken by aging populations in shrinking communities, with few young speakers to carry them forward. Yet a quiet but significant movement is pushing back against this trend. From Mexico's Zapotec communities to the Amazon basin in Colombia and Brazil, indigenous language revitalization programs are gaining momentum, driven by a mixture of cultural pride, academic support, and digital innovation.

In Colombia, the government has formally recognized 68 indigenous languages and committed to incorporating them into the national education system. Under the Ethnoeducation policy, indigenous communities can teach their languages as part of the school curriculum, ensuring that children grow up with access to both Spanish and their ancestral tongue. The results have been promising in some regions — communities that once expected their languages to vanish within a generation are now reporting stable or even growing numbers of young speakers.

Technology is also playing a growing role. Several indigenous communities have collaborated with universities to create digital dictionaries, grammar guides, and audio archives of oral traditions. Social media, often blamed for cultural homogenization, has in this case become an unexpected ally: young speakers use platforms like Instagram and TikTok to share content in their native languages, reaching audiences far beyond their geographic communities.

Linguists argue that the loss of any language is not merely a cultural loss but a cognitive one: each language encodes unique ways of categorizing reality, expressing relationships, and understanding the natural world. When a language dies, this knowledge disappears permanently. Revitalization efforts, imperfect and slow as they often are, represent an attempt to preserve not just words, but entire ways of being human.`,
          stimulusLabel: 'Read the article.',
          text: 'How many indigenous languages has the Colombian government officially recognized?',
          options: [
            '12',
            '45',
            '102',
            '68',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: `The Resurgence of Indigenous Languages

Across Latin America, hundreds of indigenous languages are classified as endangered — spoken by aging populations in shrinking communities, with few young speakers to carry them forward. Yet a quiet but significant movement is pushing back against this trend. From Mexico's Zapotec communities to the Amazon basin in Colombia and Brazil, indigenous language revitalization programs are gaining momentum, driven by a mixture of cultural pride, academic support, and digital innovation.

In Colombia, the government has formally recognized 68 indigenous languages and committed to incorporating them into the national education system. Under the Ethnoeducation policy, indigenous communities can teach their languages as part of the school curriculum, ensuring that children grow up with access to both Spanish and their ancestral tongue. The results have been promising in some regions — communities that once expected their languages to vanish within a generation are now reporting stable or even growing numbers of young speakers.

Technology is also playing a growing role. Several indigenous communities have collaborated with universities to create digital dictionaries, grammar guides, and audio archives of oral traditions. Social media, often blamed for cultural homogenization, has in this case become an unexpected ally: young speakers use platforms like Instagram and TikTok to share content in their native languages, reaching audiences far beyond their geographic communities.

Linguists argue that the loss of any language is not merely a cultural loss but a cognitive one: each language encodes unique ways of categorizing reality, expressing relationships, and understanding the natural world. When a language dies, this knowledge disappears permanently. Revitalization efforts, imperfect and slow as they often are, represent an attempt to preserve not just words, but entire ways of being human.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "revitalization" in the article most closely means:',
          options: [
            'The process of completely replacing one language with another.',
            'A movement that breathes new life into something that was weakening or disappearing.',
            'The formal documentation of dying languages for academic research.',
            'The legal protection of minority languages through government legislation.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: `The Resurgence of Indigenous Languages

Across Latin America, hundreds of indigenous languages are classified as endangered — spoken by aging populations in shrinking communities, with few young speakers to carry them forward. Yet a quiet but significant movement is pushing back against this trend. From Mexico's Zapotec communities to the Amazon basin in Colombia and Brazil, indigenous language revitalization programs are gaining momentum, driven by a mixture of cultural pride, academic support, and digital innovation.

In Colombia, the government has formally recognized 68 indigenous languages and committed to incorporating them into the national education system. Under the Ethnoeducation policy, indigenous communities can teach their languages as part of the school curriculum, ensuring that children grow up with access to both Spanish and their ancestral tongue. The results have been promising in some regions — communities that once expected their languages to vanish within a generation are now reporting stable or even growing numbers of young speakers.

Technology is also playing a growing role. Several indigenous communities have collaborated with universities to create digital dictionaries, grammar guides, and audio archives of oral traditions. Social media, often blamed for cultural homogenization, has in this case become an unexpected ally: young speakers use platforms like Instagram and TikTok to share content in their native languages, reaching audiences far beyond their geographic communities.

Linguists argue that the loss of any language is not merely a cultural loss but a cognitive one: each language encodes unique ways of categorizing reality, expressing relationships, and understanding the natural world. When a language dies, this knowledge disappears permanently. Revitalization efforts, imperfect and slow as they often are, represent an attempt to preserve not just words, but entire ways of being human.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the article, how are young people using social media in relation to indigenous languages?',
          options: [
            'They are using it to campaign against the Ethnoeducation policy.',
            'They are translating indigenous languages into Spanish for broader access.',
            'They are sharing content in their native languages to reach wider audiences.',
            'They are using it exclusively to document dying oral traditions for archives.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: `The Resurgence of Indigenous Languages

Across Latin America, hundreds of indigenous languages are classified as endangered — spoken by aging populations in shrinking communities, with few young speakers to carry them forward. Yet a quiet but significant movement is pushing back against this trend. From Mexico's Zapotec communities to the Amazon basin in Colombia and Brazil, indigenous language revitalization programs are gaining momentum, driven by a mixture of cultural pride, academic support, and digital innovation.

In Colombia, the government has formally recognized 68 indigenous languages and committed to incorporating them into the national education system. Under the Ethnoeducation policy, indigenous communities can teach their languages as part of the school curriculum, ensuring that children grow up with access to both Spanish and their ancestral tongue. The results have been promising in some regions — communities that once expected their languages to vanish within a generation are now reporting stable or even growing numbers of young speakers.

Technology is also playing a growing role. Several indigenous communities have collaborated with universities to create digital dictionaries, grammar guides, and audio archives of oral traditions. Social media, often blamed for cultural homogenization, has in this case become an unexpected ally: young speakers use platforms like Instagram and TikTok to share content in their native languages, reaching audiences far beyond their geographic communities.

Linguists argue that the loss of any language is not merely a cultural loss but a cognitive one: each language encodes unique ways of categorizing reality, expressing relationships, and understanding the natural world. When a language dies, this knowledge disappears permanently. Revitalization efforts, imperfect and slow as they often are, represent an attempt to preserve not just words, but entire ways of being human.`,
          stimulusLabel: 'Read the article.',
          text: 'According to linguists cited in the article, what is lost when a language disappears?',
          options: [
            'Only the spoken words and vocabulary of that community.',
            'Unique ways of perceiving and understanding reality that cannot be recovered.',
            'The ability of community members to communicate with the outside world.',
            'The possibility of teaching indigenous languages in national school systems.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: `The Resurgence of Indigenous Languages

Across Latin America, hundreds of indigenous languages are classified as endangered — spoken by aging populations in shrinking communities, with few young speakers to carry them forward. Yet a quiet but significant movement is pushing back against this trend. From Mexico's Zapotec communities to the Amazon basin in Colombia and Brazil, indigenous language revitalization programs are gaining momentum, driven by a mixture of cultural pride, academic support, and digital innovation.

In Colombia, the government has formally recognized 68 indigenous languages and committed to incorporating them into the national education system. Under the Ethnoeducation policy, indigenous communities can teach their languages as part of the school curriculum, ensuring that children grow up with access to both Spanish and their ancestral tongue. The results have been promising in some regions — communities that once expected their languages to vanish within a generation are now reporting stable or even growing numbers of young speakers.

Technology is also playing a growing role. Several indigenous communities have collaborated with universities to create digital dictionaries, grammar guides, and audio archives of oral traditions. Social media, often blamed for cultural homogenization, has in this case become an unexpected ally: young speakers use platforms like Instagram and TikTok to share content in their native languages, reaching audiences far beyond their geographic communities.

Linguists argue that the loss of any language is not merely a cultural loss but a cognitive one: each language encodes unique ways of categorizing reality, expressing relationships, and understanding the natural world. When a language dies, this knowledge disappears permanently. Revitalization efforts, imperfect and slow as they often are, represent an attempt to preserve not just words, but entire ways of being human.`,
          stimulusLabel: 'Read the article.',
          text: 'The article describes social media as an "unexpected ally" in language revitalization. Why is it "unexpected"?',
          options: [
            'Because social media companies have historically refused to support minority languages.',
            'Because young people rarely use social media to talk about cultural topics.',
            'Because social media is typically associated with cultural homogenization, not with preserving diversity.',
            'Because linguists had previously proven that social media accelerates language loss.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: `The Resurgence of Indigenous Languages

Across Latin America, hundreds of indigenous languages are classified as endangered — spoken by aging populations in shrinking communities, with few young speakers to carry them forward. Yet a quiet but significant movement is pushing back against this trend. From Mexico's Zapotec communities to the Amazon basin in Colombia and Brazil, indigenous language revitalization programs are gaining momentum, driven by a mixture of cultural pride, academic support, and digital innovation.

In Colombia, the government has formally recognized 68 indigenous languages and committed to incorporating them into the national education system. Under the Ethnoeducation policy, indigenous communities can teach their languages as part of the school curriculum, ensuring that children grow up with access to both Spanish and their ancestral tongue. The results have been promising in some regions — communities that once expected their languages to vanish within a generation are now reporting stable or even growing numbers of young speakers.

Technology is also playing a growing role. Several indigenous communities have collaborated with universities to create digital dictionaries, grammar guides, and audio archives of oral traditions. Social media, often blamed for cultural homogenization, has in this case become an unexpected ally: young speakers use platforms like Instagram and TikTok to share content in their native languages, reaching audiences far beyond their geographic communities.

Linguists argue that the loss of any language is not merely a cultural loss but a cognitive one: each language encodes unique ways of categorizing reality, expressing relationships, and understanding the natural world. When a language dies, this knowledge disappears permanently. Revitalization efforts, imperfect and slow as they often are, represent an attempt to preserve not just words, but entire ways of being human.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about the Ethnoeducation policy based on the results described in the article?',
          options: [
            'It has shown positive outcomes in some regions, suggesting the approach has merit even if not universally applied.',
            'It has been completely unsuccessful because most indigenous languages are still declining.',
            'It has been applied equally and with identical results across all regions of Colombia.',
            'It has replaced Spanish as the main language of instruction in all indigenous communities.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: `The Resurgence of Indigenous Languages

Across Latin America, hundreds of indigenous languages are classified as endangered — spoken by aging populations in shrinking communities, with few young speakers to carry them forward. Yet a quiet but significant movement is pushing back against this trend. From Mexico's Zapotec communities to the Amazon basin in Colombia and Brazil, indigenous language revitalization programs are gaining momentum, driven by a mixture of cultural pride, academic support, and digital innovation.

In Colombia, the government has formally recognized 68 indigenous languages and committed to incorporating them into the national education system. Under the Ethnoeducation policy, indigenous communities can teach their languages as part of the school curriculum, ensuring that children grow up with access to both Spanish and their ancestral tongue. The results have been promising in some regions — communities that once expected their languages to vanish within a generation are now reporting stable or even growing numbers of young speakers.

Technology is also playing a growing role. Several indigenous communities have collaborated with universities to create digital dictionaries, grammar guides, and audio archives of oral traditions. Social media, often blamed for cultural homogenization, has in this case become an unexpected ally: young speakers use platforms like Instagram and TikTok to share content in their native languages, reaching audiences far beyond their geographic communities.

Linguists argue that the loss of any language is not merely a cultural loss but a cognitive one: each language encodes unique ways of categorizing reality, expressing relationships, and understanding the natural world. When a language dies, this knowledge disappears permanently. Revitalization efforts, imperfect and slow as they often are, represent an attempt to preserve not just words, but entire ways of being human.`,
          stimulusLabel: 'Read the article.',
          text: 'What have indigenous communities created in collaboration with universities?',
          options: [
            'Bilingual teacher training programs for urban schools.',
            'A unified writing system for all 68 recognized languages.',
            'A network of community radio stations broadcasting in indigenous languages.',
            'Digital dictionaries, grammar guides, and oral tradition audio archives.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: `The Resurgence of Indigenous Languages

Across Latin America, hundreds of indigenous languages are classified as endangered — spoken by aging populations in shrinking communities, with few young speakers to carry them forward. Yet a quiet but significant movement is pushing back against this trend. From Mexico's Zapotec communities to the Amazon basin in Colombia and Brazil, indigenous language revitalization programs are gaining momentum, driven by a mixture of cultural pride, academic support, and digital innovation.

In Colombia, the government has formally recognized 68 indigenous languages and committed to incorporating them into the national education system. Under the Ethnoeducation policy, indigenous communities can teach their languages as part of the school curriculum, ensuring that children grow up with access to both Spanish and their ancestral tongue. The results have been promising in some regions — communities that once expected their languages to vanish within a generation are now reporting stable or even growing numbers of young speakers.

Technology is also playing a growing role. Several indigenous communities have collaborated with universities to create digital dictionaries, grammar guides, and audio archives of oral traditions. Social media, often blamed for cultural homogenization, has in this case become an unexpected ally: young speakers use platforms like Instagram and TikTok to share content in their native languages, reaching audiences far beyond their geographic communities.

Linguists argue that the loss of any language is not merely a cultural loss but a cognitive one: each language encodes unique ways of categorizing reality, expressing relationships, and understanding the natural world. When a language dies, this knowledge disappears permanently. Revitalization efforts, imperfect and slow as they often are, represent an attempt to preserve not just words, but entire ways of being human.`,
          stimulusLabel: 'Read the article.',
          text: 'What drives the language revitalization movement according to the first paragraph?',
          options: [
            'Government mandates, international funding, and court decisions.',
            'Academic research, tourism initiatives, and private investment.',
            'Cultural pride, academic support, and digital innovation.',
            'Youth activism, religious institutions, and public broadcasting.',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 6,
      title: 'Parte 6 — Texto largo: inferencia',
      instructions: 'Read the article carefully and answer the questions using inference and context.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          stimulus: `Should Traditional Customs Change Over Time?

The question of whether traditional customs should adapt, evolve, or be preserved intact touches one of the most fundamental tensions in human culture: the desire to honor the past against the necessity of living in the present. It is a question without a simple answer, because it depends entirely on what the tradition is, who it affects, and what purpose it serves.

Some traditions carry profound meaning and reinforce a community's sense of shared identity. Language, music, food, ceremony, and storytelling connect living people to their ancestors and give communities a sense of continuity across time. These traditions deserve protection not because they are old, but because they fulfill real human needs: belonging, memory, and collective meaning. To dismiss them as irrelevant simply because they are ancient would be a kind of cultural arrogance.

Yet traditions are not neutral. Some customs — particularly those that restrict individual freedom, enforce hierarchies, or exclude certain groups — deserve scrutiny. A practice justified solely by the fact that it has always existed is not automatically worth preserving. Traditions are human constructs, and like all human constructs, they are capable of both serving people well and causing harm. The longevity of a practice is not evidence of its ethical value.

The difficulty lies in determining who has the authority to decide which traditions should change. In many cases, communities themselves drive this evolution — not through external pressure, but through internal renegotiation. Women in traditional societies have often led the reform of customs that limited their participation in public life. Young people in indigenous communities choose which aspects of their heritage to carry forward and which to set aside. This internal change is qualitatively different from change imposed by outside forces, which tends to provoke resistance and be experienced as cultural erasure.

What is needed is not a simple answer — "preserve everything" or "discard the past" — but a framework of respectful, ongoing dialogue: within communities, between generations, and across cultures. Traditions that serve human dignity should be celebrated; those that diminish it should be open to reform. The measure of a living culture is not how unchanged it remains, but how wisely it evolves.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the central argument of this article?',
          options: [
            'All traditional customs should be completely preserved because they form the basis of cultural identity.',
            'Traditions should be evaluated based on whether they serve human dignity, with harmful ones open to reform and valuable ones protected.',
            'External organizations should decide which traditions are worth keeping and which should be abolished.',
            'Traditional customs are always more valuable than modern practices and should never be abandoned.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: `Should Traditional Customs Change Over Time?

The question of whether traditional customs should adapt, evolve, or be preserved intact touches one of the most fundamental tensions in human culture: the desire to honor the past against the necessity of living in the present. It is a question without a simple answer, because it depends entirely on what the tradition is, who it affects, and what purpose it serves.

Some traditions carry profound meaning and reinforce a community's sense of shared identity. Language, music, food, ceremony, and storytelling connect living people to their ancestors and give communities a sense of continuity across time. These traditions deserve protection not because they are old, but because they fulfill real human needs: belonging, memory, and collective meaning. To dismiss them as irrelevant simply because they are ancient would be a kind of cultural arrogance.

Yet traditions are not neutral. Some customs — particularly those that restrict individual freedom, enforce hierarchies, or exclude certain groups — deserve scrutiny. A practice justified solely by the fact that it has always existed is not automatically worth preserving. Traditions are human constructs, and like all human constructs, they are capable of both serving people well and causing harm. The longevity of a practice is not evidence of its ethical value.

The difficulty lies in determining who has the authority to decide which traditions should change. In many cases, communities themselves drive this evolution — not through external pressure, but through internal renegotiation. Women in traditional societies have often led the reform of customs that limited their participation in public life. Young people in indigenous communities choose which aspects of their heritage to carry forward and which to set aside. This internal change is qualitatively different from change imposed by outside forces, which tends to provoke resistance and be experienced as cultural erasure.

What is needed is not a simple answer — "preserve everything" or "discard the past" — but a framework of respectful, ongoing dialogue: within communities, between generations, and across cultures. Traditions that serve human dignity should be celebrated; those that diminish it should be open to reform. The measure of a living culture is not how unchanged it remains, but how wisely it evolves.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the second paragraph, why do valuable traditions deserve protection?',
          options: [
            'Because they are ancient and have survived for centuries.',
            'Because government policy requires institutions to preserve cultural heritage.',
            'Because abandoning them would offend the communities that created them.',
            'Because they fulfill genuine human needs such as belonging, memory, and shared meaning.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: `Should Traditional Customs Change Over Time?

The question of whether traditional customs should adapt, evolve, or be preserved intact touches one of the most fundamental tensions in human culture: the desire to honor the past against the necessity of living in the present. It is a question without a simple answer, because it depends entirely on what the tradition is, who it affects, and what purpose it serves.

Some traditions carry profound meaning and reinforce a community's sense of shared identity. Language, music, food, ceremony, and storytelling connect living people to their ancestors and give communities a sense of continuity across time. These traditions deserve protection not because they are old, but because they fulfill real human needs: belonging, memory, and collective meaning. To dismiss them as irrelevant simply because they are ancient would be a kind of cultural arrogance.

Yet traditions are not neutral. Some customs — particularly those that restrict individual freedom, enforce hierarchies, or exclude certain groups — deserve scrutiny. A practice justified solely by the fact that it has always existed is not automatically worth preserving. Traditions are human constructs, and like all human constructs, they are capable of both serving people well and causing harm. The longevity of a practice is not evidence of its ethical value.

The difficulty lies in determining who has the authority to decide which traditions should change. In many cases, communities themselves drive this evolution — not through external pressure, but through internal renegotiation. Women in traditional societies have often led the reform of customs that limited their participation in public life. Young people in indigenous communities choose which aspects of their heritage to carry forward and which to set aside. This internal change is qualitatively different from change imposed by outside forces, which tends to provoke resistance and be experienced as cultural erasure.

What is needed is not a simple answer — "preserve everything" or "discard the past" — but a framework of respectful, ongoing dialogue: within communities, between generations, and across cultures. Traditions that serve human dignity should be celebrated; those that diminish it should be open to reform. The measure of a living culture is not how unchanged it remains, but how wisely it evolves.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the phrase "cultural arrogance" imply in the context of the second paragraph?',
          options: [
            'A belief that one\'s own modern culture is superior and that ancient practices are automatically inferior.',
            'The tendency of indigenous communities to resist all forms of modernization.',
            'An overconfident attitude held by academics who study cultural traditions.',
            'The pride that communities take in their long-standing traditions.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: `Should Traditional Customs Change Over Time?

The question of whether traditional customs should adapt, evolve, or be preserved intact touches one of the most fundamental tensions in human culture: the desire to honor the past against the necessity of living in the present. It is a question without a simple answer, because it depends entirely on what the tradition is, who it affects, and what purpose it serves.

Some traditions carry profound meaning and reinforce a community's sense of shared identity. Language, music, food, ceremony, and storytelling connect living people to their ancestors and give communities a sense of continuity across time. These traditions deserve protection not because they are old, but because they fulfill real human needs: belonging, memory, and collective meaning. To dismiss them as irrelevant simply because they are ancient would be a kind of cultural arrogance.

Yet traditions are not neutral. Some customs — particularly those that restrict individual freedom, enforce hierarchies, or exclude certain groups — deserve scrutiny. A practice justified solely by the fact that it has always existed is not automatically worth preserving. Traditions are human constructs, and like all human constructs, they are capable of both serving people well and causing harm. The longevity of a practice is not evidence of its ethical value.

The difficulty lies in determining who has the authority to decide which traditions should change. In many cases, communities themselves drive this evolution — not through external pressure, but through internal renegotiation. Women in traditional societies have often led the reform of customs that limited their participation in public life. Young people in indigenous communities choose which aspects of their heritage to carry forward and which to set aside. This internal change is qualitatively different from change imposed by outside forces, which tends to provoke resistance and be experienced as cultural erasure.

What is needed is not a simple answer — "preserve everything" or "discard the past" — but a framework of respectful, ongoing dialogue: within communities, between generations, and across cultures. Traditions that serve human dignity should be celebrated; those that diminish it should be open to reform. The measure of a living culture is not how unchanged it remains, but how wisely it evolves.`,
          stimulusLabel: 'Read the article.',
          text: 'Why does the author consider internally driven change different from externally imposed change?',
          options: [
            'Because internal change is always slower and less effective than external pressure.',
            'Because external change is always more ethical since it comes from objective observers.',
            'Because internal change happens only in democratic societies with free institutions.',
            'Because internal change allows communities to maintain full control over how their culture evolves, while external change tends to feel like erasure.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: `Should Traditional Customs Change Over Time?

The question of whether traditional customs should adapt, evolve, or be preserved intact touches one of the most fundamental tensions in human culture: the desire to honor the past against the necessity of living in the present. It is a question without a simple answer, because it depends entirely on what the tradition is, who it affects, and what purpose it serves.

Some traditions carry profound meaning and reinforce a community's sense of shared identity. Language, music, food, ceremony, and storytelling connect living people to their ancestors and give communities a sense of continuity across time. These traditions deserve protection not because they are old, but because they fulfill real human needs: belonging, memory, and collective meaning. To dismiss them as irrelevant simply because they are ancient would be a kind of cultural arrogance.

Yet traditions are not neutral. Some customs — particularly those that restrict individual freedom, enforce hierarchies, or exclude certain groups — deserve scrutiny. A practice justified solely by the fact that it has always existed is not automatically worth preserving. Traditions are human constructs, and like all human constructs, they are capable of both serving people well and causing harm. The longevity of a practice is not evidence of its ethical value.

The difficulty lies in determining who has the authority to decide which traditions should change. In many cases, communities themselves drive this evolution — not through external pressure, but through internal renegotiation. Women in traditional societies have often led the reform of customs that limited their participation in public life. Young people in indigenous communities choose which aspects of their heritage to carry forward and which to set aside. This internal change is qualitatively different from change imposed by outside forces, which tends to provoke resistance and be experienced as cultural erasure.

What is needed is not a simple answer — "preserve everything" or "discard the past" — but a framework of respectful, ongoing dialogue: within communities, between generations, and across cultures. Traditions that serve human dignity should be celebrated; those that diminish it should be open to reform. The measure of a living culture is not how unchanged it remains, but how wisely it evolves.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "scrutiny" in the third paragraph most closely means:',
          options: [
            'Careful and critical examination.',
            'Celebration and promotion.',
            'Legal protection under international law.',
            'Rapid and decisive elimination.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: `Should Traditional Customs Change Over Time?

The question of whether traditional customs should adapt, evolve, or be preserved intact touches one of the most fundamental tensions in human culture: the desire to honor the past against the necessity of living in the present. It is a question without a simple answer, because it depends entirely on what the tradition is, who it affects, and what purpose it serves.

Some traditions carry profound meaning and reinforce a community's sense of shared identity. Language, music, food, ceremony, and storytelling connect living people to their ancestors and give communities a sense of continuity across time. These traditions deserve protection not because they are old, but because they fulfill real human needs: belonging, memory, and collective meaning. To dismiss them as irrelevant simply because they are ancient would be a kind of cultural arrogance.

Yet traditions are not neutral. Some customs — particularly those that restrict individual freedom, enforce hierarchies, or exclude certain groups — deserve scrutiny. A practice justified solely by the fact that it has always existed is not automatically worth preserving. Traditions are human constructs, and like all human constructs, they are capable of both serving people well and causing harm. The longevity of a practice is not evidence of its ethical value.

The difficulty lies in determining who has the authority to decide which traditions should change. In many cases, communities themselves drive this evolution — not through external pressure, but through internal renegotiation. Women in traditional societies have often led the reform of customs that limited their participation in public life. Young people in indigenous communities choose which aspects of their heritage to carry forward and which to set aside. This internal change is qualitatively different from change imposed by outside forces, which tends to provoke resistance and be experienced as cultural erasure.

What is needed is not a simple answer — "preserve everything" or "discard the past" — but a framework of respectful, ongoing dialogue: within communities, between generations, and across cultures. Traditions that serve human dignity should be celebrated; those that diminish it should be open to reform. The measure of a living culture is not how unchanged it remains, but how wisely it evolves.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the author suggest is the true measure of a living culture?',
          options: [
            'How many of its traditions it preserves without modification.',
            'How successfully it resists foreign influences and globalization.',
            'How wisely it evolves rather than how unchanged it remains.',
            'How many people in the world are aware of and respect its customs.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: `Should Traditional Customs Change Over Time?

The question of whether traditional customs should adapt, evolve, or be preserved intact touches one of the most fundamental tensions in human culture: the desire to honor the past against the necessity of living in the present. It is a question without a simple answer, because it depends entirely on what the tradition is, who it affects, and what purpose it serves.

Some traditions carry profound meaning and reinforce a community's sense of shared identity. Language, music, food, ceremony, and storytelling connect living people to their ancestors and give communities a sense of continuity across time. These traditions deserve protection not because they are old, but because they fulfill real human needs: belonging, memory, and collective meaning. To dismiss them as irrelevant simply because they are ancient would be a kind of cultural arrogance.

Yet traditions are not neutral. Some customs — particularly those that restrict individual freedom, enforce hierarchies, or exclude certain groups — deserve scrutiny. A practice justified solely by the fact that it has always existed is not automatically worth preserving. Traditions are human constructs, and like all human constructs, they are capable of both serving people well and causing harm. The longevity of a practice is not evidence of its ethical value.

The difficulty lies in determining who has the authority to decide which traditions should change. In many cases, communities themselves drive this evolution — not through external pressure, but through internal renegotiation. Women in traditional societies have often led the reform of customs that limited their participation in public life. Young people in indigenous communities choose which aspects of their heritage to carry forward and which to set aside. This internal change is qualitatively different from change imposed by outside forces, which tends to provoke resistance and be experienced as cultural erasure.

What is needed is not a simple answer — "preserve everything" or "discard the past" — but a framework of respectful, ongoing dialogue: within communities, between generations, and across cultures. Traditions that serve human dignity should be celebrated; those that diminish it should be open to reform. The measure of a living culture is not how unchanged it remains, but how wisely it evolves.`,
          stimulusLabel: 'Read the article.',
          text: 'With which of the following statements would the author most likely DISAGREE?',
          options: [
            'Communities should have primary authority over how their own traditions evolve.',
            'A tradition practiced for hundreds of years should be automatically considered ethical.',
            'Some traditions that once had meaning may become harmful over time.',
            'Dialogue between generations is important for healthy cultural evolution.',
          ],
          answer: 1,
        },
      ],
    },
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      instructions: "Read the opinion text and answer the questions about the author's argument.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          stimulus: `Is Social Media Destroying Cultural Identity?

We live in an era of unprecedented connectivity. A teenager in Bogotá can watch the same trends, listen to the same music, wear the same brands, and follow the same celebrities as a teenager in Seoul or Berlin. On the surface, this seems like a triumph of global exchange. I believe it is, in many respects, a quiet catastrophe.

Social media platforms are not neutral distributors of culture. They are designed and operated by a small number of corporations based primarily in the United States, and their algorithms favor content that generates engagement. What generates engagement tends to be fast, visually striking, and emotionally immediate — categories in which mass-market Western pop culture has an enormous structural advantage. The result is not cultural exchange but cultural displacement: local content struggles to compete, and communities slowly lose the habit of producing and consuming their own cultural forms.

The argument that this is simply consumer choice misses the point. Choice implies alternatives presented on equal terms. But when an algorithm systematically deprioritizes content in Wayuunaiki or Emberá over content in English, the playing field is not level. The user who ends up consuming mainly global content is not making a free choice — they are responding to a system that has already narrowed their options.

The consequences are not abstract. When young people feel that their local language, music, and customs are less prestigious than global alternatives, they internalize that judgment. Cultural self-deprecation follows: the assumption that being local means being lesser. This erosion of cultural confidence is one of the most damaging and least discussed effects of the attention economy.

None of this means rejecting technology or romanticizing isolation. It means demanding that platforms be held accountable for the cultural environments they create. It means investing in local content creation. And it means recognizing that cultural identity is not a luxury — it is a foundation for self-respect, community, and the kind of genuine diversity that makes humanity richer.`,
          stimulusLabel: 'Read the opinion article.',
          text: "What is the author's central claim in this article?",
          options: [
            'Social media, through algorithmic bias favoring dominant cultures, is threatening local cultural identities.',
            'Social media should be banned in all non-English-speaking countries.',
            'Social media platforms actively promote cultural diversity by making all content equally visible.',
            'Teenagers in different countries have always consumed the same cultural products.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: `Is Social Media Destroying Cultural Identity?

We live in an era of unprecedented connectivity. A teenager in Bogotá can watch the same trends, listen to the same music, wear the same brands, and follow the same celebrities as a teenager in Seoul or Berlin. On the surface, this seems like a triumph of global exchange. I believe it is, in many respects, a quiet catastrophe.

Social media platforms are not neutral distributors of culture. They are designed and operated by a small number of corporations based primarily in the United States, and their algorithms favor content that generates engagement. What generates engagement tends to be fast, visually striking, and emotionally immediate — categories in which mass-market Western pop culture has an enormous structural advantage. The result is not cultural exchange but cultural displacement: local content struggles to compete, and communities slowly lose the habit of producing and consuming their own cultural forms.

The argument that this is simply consumer choice misses the point. Choice implies alternatives presented on equal terms. But when an algorithm systematically deprioritizes content in Wayuunaiki or Emberá over content in English, the playing field is not level. The user who ends up consuming mainly global content is not making a free choice — they are responding to a system that has already narrowed their options.

The consequences are not abstract. When young people feel that their local language, music, and customs are less prestigious than global alternatives, they internalize that judgment. Cultural self-deprecation follows: the assumption that being local means being lesser. This erosion of cultural confidence is one of the most damaging and least discussed effects of the attention economy.

None of this means rejecting technology or romanticizing isolation. It means demanding that platforms be held accountable for the cultural environments they create. It means investing in local content creation. And it means recognizing that cultural identity is not a luxury — it is a foundation for self-respect, community, and the kind of genuine diversity that makes humanity richer.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'According to the author, why is the "consumer choice" argument flawed?',
          options: [
            'Because consumers in developing countries do not have access to reliable internet.',
            'Because choice requires equal alternatives, but algorithms already narrow users\' options by favoring certain types of content.',
            'Because young people are not mature enough to make genuine cultural choices.',
            'Because most users are unaware that they are consuming cultural content when they use social media.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: `Is Social Media Destroying Cultural Identity?

We live in an era of unprecedented connectivity. A teenager in Bogotá can watch the same trends, listen to the same music, wear the same brands, and follow the same celebrities as a teenager in Seoul or Berlin. On the surface, this seems like a triumph of global exchange. I believe it is, in many respects, a quiet catastrophe.

Social media platforms are not neutral distributors of culture. They are designed and operated by a small number of corporations based primarily in the United States, and their algorithms favor content that generates engagement. What generates engagement tends to be fast, visually striking, and emotionally immediate — categories in which mass-market Western pop culture has an enormous structural advantage. The result is not cultural exchange but cultural displacement: local content struggles to compete, and communities slowly lose the habit of producing and consuming their own cultural forms.

The argument that this is simply consumer choice misses the point. Choice implies alternatives presented on equal terms. But when an algorithm systematically deprioritizes content in Wayuunaiki or Emberá over content in English, the playing field is not level. The user who ends up consuming mainly global content is not making a free choice — they are responding to a system that has already narrowed their options.

The consequences are not abstract. When young people feel that their local language, music, and customs are less prestigious than global alternatives, they internalize that judgment. Cultural self-deprecation follows: the assumption that being local means being lesser. This erosion of cultural confidence is one of the most damaging and least discussed effects of the attention economy.

None of this means rejecting technology or romanticizing isolation. It means demanding that platforms be held accountable for the cultural environments they create. It means investing in local content creation. And it means recognizing that cultural identity is not a luxury — it is a foundation for self-respect, community, and the kind of genuine diversity that makes humanity richer.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the author mean by "cultural displacement" in the second paragraph?',
          options: [
            'The migration of cultural communities from their home regions to urban centers.',
            'The process by which governments relocate indigenous communities to protect them.',
            'The decision of artists to move abroad in search of better cultural opportunities.',
            'The situation in which local cultural forms are pushed aside by dominant global content that has a structural advantage.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: `Is Social Media Destroying Cultural Identity?

We live in an era of unprecedented connectivity. A teenager in Bogotá can watch the same trends, listen to the same music, wear the same brands, and follow the same celebrities as a teenager in Seoul or Berlin. On the surface, this seems like a triumph of global exchange. I believe it is, in many respects, a quiet catastrophe.

Social media platforms are not neutral distributors of culture. They are designed and operated by a small number of corporations based primarily in the United States, and their algorithms favor content that generates engagement. What generates engagement tends to be fast, visually striking, and emotionally immediate — categories in which mass-market Western pop culture has an enormous structural advantage. The result is not cultural exchange but cultural displacement: local content struggles to compete, and communities slowly lose the habit of producing and consuming their own cultural forms.

The argument that this is simply consumer choice misses the point. Choice implies alternatives presented on equal terms. But when an algorithm systematically deprioritizes content in Wayuunaiki or Emberá over content in English, the playing field is not level. The user who ends up consuming mainly global content is not making a free choice — they are responding to a system that has already narrowed their options.

The consequences are not abstract. When young people feel that their local language, music, and customs are less prestigious than global alternatives, they internalize that judgment. Cultural self-deprecation follows: the assumption that being local means being lesser. This erosion of cultural confidence is one of the most damaging and least discussed effects of the attention economy.

None of this means rejecting technology or romanticizing isolation. It means demanding that platforms be held accountable for the cultural environments they create. It means investing in local content creation. And it means recognizing that cultural identity is not a luxury — it is a foundation for self-respect, community, and the kind of genuine diversity that makes humanity richer.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'According to the fourth paragraph, what is "cultural self-deprecation"?',
          options: [
            'The habit of making jokes about one\'s own cultural traditions in online content.',
            'A process in which governments deliberately undermine minority cultural practices.',
            'The internalized belief that one\'s local culture is inferior to dominant global alternatives.',
            'A marketing strategy used by local artists to appeal to international audiences.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: `Is Social Media Destroying Cultural Identity?

We live in an era of unprecedented connectivity. A teenager in Bogotá can watch the same trends, listen to the same music, wear the same brands, and follow the same celebrities as a teenager in Seoul or Berlin. On the surface, this seems like a triumph of global exchange. I believe it is, in many respects, a quiet catastrophe.

Social media platforms are not neutral distributors of culture. They are designed and operated by a small number of corporations based primarily in the United States, and their algorithms favor content that generates engagement. What generates engagement tends to be fast, visually striking, and emotionally immediate — categories in which mass-market Western pop culture has an enormous structural advantage. The result is not cultural exchange but cultural displacement: local content struggles to compete, and communities slowly lose the habit of producing and consuming their own cultural forms.

The argument that this is simply consumer choice misses the point. Choice implies alternatives presented on equal terms. But when an algorithm systematically deprioritizes content in Wayuunaiki or Emberá over content in English, the playing field is not level. The user who ends up consuming mainly global content is not making a free choice — they are responding to a system that has already narrowed their options.

The consequences are not abstract. When young people feel that their local language, music, and customs are less prestigious than global alternatives, they internalize that judgment. Cultural self-deprecation follows: the assumption that being local means being lesser. This erosion of cultural confidence is one of the most damaging and least discussed effects of the attention economy.

None of this means rejecting technology or romanticizing isolation. It means demanding that platforms be held accountable for the cultural environments they create. It means investing in local content creation. And it means recognizing that cultural identity is not a luxury — it is a foundation for self-respect, community, and the kind of genuine diversity that makes humanity richer.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What solutions does the author propose in the final paragraph?',
          options: [
            'Banning social media platforms until they prove they are culturally neutral.',
            'Holding platforms accountable, investing in local content creation, and recognizing cultural identity as essential.',
            'Encouraging users to boycott Western content and only consume local media.',
            'Creating a global cultural council to decide which content algorithms should promote.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: `Is Social Media Destroying Cultural Identity?

We live in an era of unprecedented connectivity. A teenager in Bogotá can watch the same trends, listen to the same music, wear the same brands, and follow the same celebrities as a teenager in Seoul or Berlin. On the surface, this seems like a triumph of global exchange. I believe it is, in many respects, a quiet catastrophe.

Social media platforms are not neutral distributors of culture. They are designed and operated by a small number of corporations based primarily in the United States, and their algorithms favor content that generates engagement. What generates engagement tends to be fast, visually striking, and emotionally immediate — categories in which mass-market Western pop culture has an enormous structural advantage. The result is not cultural exchange but cultural displacement: local content struggles to compete, and communities slowly lose the habit of producing and consuming their own cultural forms.

The argument that this is simply consumer choice misses the point. Choice implies alternatives presented on equal terms. But when an algorithm systematically deprioritizes content in Wayuunaiki or Emberá over content in English, the playing field is not level. The user who ends up consuming mainly global content is not making a free choice — they are responding to a system that has already narrowed their options.

The consequences are not abstract. When young people feel that their local language, music, and customs are less prestigious than global alternatives, they internalize that judgment. Cultural self-deprecation follows: the assumption that being local means being lesser. This erosion of cultural confidence is one of the most damaging and least discussed effects of the attention economy.

None of this means rejecting technology or romanticizing isolation. It means demanding that platforms be held accountable for the cultural environments they create. It means investing in local content creation. And it means recognizing that cultural identity is not a luxury — it is a foundation for self-respect, community, and the kind of genuine diversity that makes humanity richer.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The author describes global cultural connectivity as a "quiet catastrophe." What makes it "quiet"?',
          options: [
            'Because it happens without violence, making it easy to overlook despite its serious consequences.',
            'Because it only affects isolated rural communities that rarely interact with mainstream society.',
            'Because social media platforms have successfully hidden it from public awareness.',
            'Because the governments responsible for it refuse to discuss the issue openly.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: `Is Social Media Destroying Cultural Identity?

We live in an era of unprecedented connectivity. A teenager in Bogotá can watch the same trends, listen to the same music, wear the same brands, and follow the same celebrities as a teenager in Seoul or Berlin. On the surface, this seems like a triumph of global exchange. I believe it is, in many respects, a quiet catastrophe.

Social media platforms are not neutral distributors of culture. They are designed and operated by a small number of corporations based primarily in the United States, and their algorithms favor content that generates engagement. What generates engagement tends to be fast, visually striking, and emotionally immediate — categories in which mass-market Western pop culture has an enormous structural advantage. The result is not cultural exchange but cultural displacement: local content struggles to compete, and communities slowly lose the habit of producing and consuming their own cultural forms.

The argument that this is simply consumer choice misses the point. Choice implies alternatives presented on equal terms. But when an algorithm systematically deprioritizes content in Wayuunaiki or Emberá over content in English, the playing field is not level. The user who ends up consuming mainly global content is not making a free choice — they are responding to a system that has already narrowed their options.

The consequences are not abstract. When young people feel that their local language, music, and customs are less prestigious than global alternatives, they internalize that judgment. Cultural self-deprecation follows: the assumption that being local means being lesser. This erosion of cultural confidence is one of the most damaging and least discussed effects of the attention economy.

None of this means rejecting technology or romanticizing isolation. It means demanding that platforms be held accountable for the cultural environments they create. It means investing in local content creation. And it means recognizing that cultural identity is not a luxury — it is a foundation for self-respect, community, and the kind of genuine diversity that makes humanity richer.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'With which of the following statements would the author most likely AGREE?',
          options: [
            'Cultural identity is a secondary concern compared to economic development.',
            'Global cultural uniformity is inevitable and communities should accept it.',
            'A world with thriving local cultures is richer than one where a single culture dominates.',
            'Social media algorithms have the same impact on all cultures regardless of language.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
