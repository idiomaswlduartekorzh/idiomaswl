import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 13
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Arte y cultura
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-13',
  examSlug: 'icfes',
  title: 'Mock 13 · Arte y cultura',
  subtitle: 'Saber 11 · Componente de Inglés · 45 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [

    // ── PARTE 1 ── Avisos e instrucciones (preguntas 1–5) ────────────────────
    {
      part: 1,
      title: 'Parte 1 — Avisos e instrucciones',
      sectionStyle: 'notices-grid',
      exampleStimulus: 'BUS STOP\nPlease stand behind the line.\nThank you.',
      exampleText: 'Where could you see this sign?',
      exampleAnswer: 'A',
      instructions:
        'The following notices give information about different places. Read each notice carefully and answer questions 1 to 5.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PLEASE DO NOT TOUCH THE EXHIBITS\nMany items are fragile and\ncannot be repaired if damaged.\nThank you for your cooperation.',
          text: 'Where would you most likely see this notice?',
          options: [
            'In a supermarket',
            'In a museum or exhibition space',
            'In a sports stadium',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'LATE ARRIVALS WILL NOT BE ADMITTED\nUntil the interval.\nPlease arrive at least ten minutes\nbefore the performance begins.',
          text: 'What does this notice tell visitors?',
          options: [
            'The performance begins exactly on time and latecomers must wait',
            'Tickets for the interval are available at a reduced price',
            'Visitors must leave the building during the interval',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PHOTOGRAPHY IS PERMITTED\nWithout flash only.\nPlease be considerate\nof other visitors.',
          text: 'What are visitors allowed to do according to this notice?',
          options: [
            'Take photographs only in the entrance area',
            'Use flash photography in all areas of the gallery',
            'Take photographs as long as they do not use flash',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'PLEASE SWITCH OFF YOUR MOBILE PHONE\nBefore the performance.\nRinging phones disturb\nperformers and other audience members.',
          text: 'Where would you most likely see this notice?',
          options: [
            'In a concert hall or theatre',
            'At a football stadium',
            'Inside a shopping centre',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'TALKING AND MOBILE PHONES\nARE NOT PERMITTED\nIn the reading room.\nPlease keep noise to a minimum.',
          text: 'What is the main rule described in this notice?',
          options: [
            'Books must be returned to the shelves after use',
            'Visitors must register before entering the reading room',
            'Noise and phone use are not allowed in this area',
          ],
          answer: 2,
        },
      ],
    },

    // ── PARTE 2 ── Vocabulario: cuadrícula de emparejamiento (preguntas 6–10) ─
    {
      part: 2,
      title: 'Parte 2 — Vocabulario',
      sectionStyle: 'matching-grid',
      topic: 'Arts',
      exampleText: 'The group of people watching or listening to a performance or show.',
      exampleAnswer: 'audience',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'A three-dimensional work of art made by shaping or carving materials such as stone, wood, or metal.',
          options: ['canvas', 'exhibit', 'gallery', 'melody', 'portrait', 'rhythm', 'sculpture'],
          answer: 6,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'A painting, drawing, or photograph that shows a person, especially their face.',
          options: ['canvas', 'exhibit', 'gallery', 'melody', 'portrait', 'rhythm', 'sculpture'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'The main tune of a song — the sequence of musical notes you can hum or sing.',
          options: ['canvas', 'exhibit', 'gallery', 'melody', 'portrait', 'rhythm', 'sculpture'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'A room or building where works of art are displayed for the public to see.',
          options: ['canvas', 'exhibit', 'gallery', 'melody', 'portrait', 'rhythm', 'sculpture'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'A flat, white material stretched on a wooden frame, used by painters to create their work.',
          options: ['canvas', 'exhibit', 'gallery', 'melody', 'portrait', 'rhythm', 'sculpture'],
          answer: 0,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'I love going to the theatre.',
      exampleOptions: ['So do I!', 'Theatres are old.', 'I prefer cinemas.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'mcq',
          id: 'p3q1',
          part: 3,
          stimulus: 'Have you seen the new exhibition at the museum?',
          text: '',
          options: [
            'Not yet — is it worth visiting?',
            'Museums are always boring.',
            "I don't like art at all.",
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          stimulus: 'I play the guitar in a band.',
          text: '',
          options: [
            'Music is not a useful skill.',
            'I prefer the drums anyway.',
            'That sounds really cool!',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          stimulus: 'The concert tickets were very expensive.',
          text: '',
          options: [
            'Concerts are always overpriced.',
            'But it was probably worth it.',
            'I never go to concerts.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          stimulus: 'Colombian street art is internationally recognised.',
          text: '',
          options: [
            'Street art is just graffiti.',
            'I only like traditional paintings.',
            'Yes, especially the murals in Medellín.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          stimulus: 'I want to learn to paint.',
          text: '',
          options: [
            'Painting takes far too long.',
            'There are good classes at the community centre.',
            'Art is not really useful.',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 4 ── Completar el texto (preguntas 16–23) ──────────────────────
    {
      part: 4,
      title: 'Parte 4 — Completar el texto',
      sectionStyle: 'cloze-text',
      instructions:
        'Read the text below. Choose the word (A, B, C, or D) that best fits each blank (questions 16 to 23).',
      passage:
        'Colombia has a rich and varied musical (16) ___. From the Caribbean coast to the Andean highlands, every (17) ___ of the country has developed its own unique sounds and styles. Cumbia and vallenato are perhaps the most (18) ___ genres internationally, but there are dozens of other forms of (19) ___ music that reflect the country\'s African, indigenous, and European heritage. These styles are usually associated with a specific set of (20) ___, such as drums, accordions, and flutes. In many communities, music and (21) ___ go hand in hand — you cannot have one without the other. Vallenato was recognised by UNESCO as part of the world\'s intangible cultural heritage, confirming its global (22) ___. Today, young Colombians continue to mix traditional sounds with modern influences, keeping this rich (23) ___ alive for future generations.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['problem', 'music', 'history', 'language'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['colour', 'person', 'region', 'century'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['unknown', 'traditional', 'foreign', 'recognised'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['classical', 'electronic', 'traditional', 'imported'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['paintings', 'instruments', 'clothes', 'buildings'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['sport', 'cooking', 'dance', 'theatre'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['cost', 'problem', 'popularity', 'failure'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['product', 'culture', 'industry', 'economy'],
          answer: 1,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'Bogotá: A City of Culture and Festivals',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        'BOGOTÁ: A CITY OF CULTURE AND FESTIVALS\n\nBogotá, the capital of Colombia, is home to one of the most vibrant cultural scenes in Latin America. With over eight million inhabitants, the city is a place where traditional Colombian culture meets international art, music, and theatre.\n\nOne of the most celebrated events in Bogotá is the Ibero-American Theatre Festival, held every two years. It is considered one of the largest theatre festivals in the world, attracting companies from dozens of countries across Europe, the Americas, and beyond. Free and paid performances take place in theatres, parks, streets, and squares across the city for about two weeks.\n\nAnother important cultural institution is the Gold Museum, known in Spanish as the "Museo del Oro". It houses the world\'s largest collection of pre-Columbian gold pieces, offering visitors a window into the civilisations that existed in Colombia long before European arrival. The museum receives hundreds of thousands of visitors every year.\n\nBogotá was also named a UNESCO City of Books, reflecting the city\'s strong literary culture. The city hosts the Bogotá International Book Fair each year, which is one of the most important literary events in the Spanish-speaking world.\n\nDespite its rapid modernisation, Bogotá has worked hard to preserve its cultural heritage and make the arts accessible to all its residents. Entry to many public museums is free on Sundays.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'How often is the Ibero-American Theatre Festival held?',
          options: [
            'Every year',
            'Every two years',
            'Every three years',
            'Every five years',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'Where do the theatre performances take place during the festival?',
          options: [
            'Only in official theatres across the city',
            'In theatres, parks, streets, and squares throughout the city',
            'Only in public parks to ensure free access for everyone',
            'In a single large venue built especially for the event',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'What does the Gold Museum contain?',
          options: [
            'A collection of modern Colombian art and sculpture',
            'Historical documents about European exploration in Colombia',
            'The world\'s largest collection of pre-Columbian gold pieces',
            'Paintings and drawings by Colombian artists from the twentieth century',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: 'What recognition did Bogotá receive from UNESCO?',
          options: [
            'It was named a City of Music.',
            'It was named a City of Books.',
            'It was named a World Heritage Site.',
            'It was named a City of Design.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'The phrase "pre-Columbian" in paragraph 3 most likely refers to:',
          options: [
            'Art produced by Colombian artists who studied in Europe',
            'Civilisations and culture that existed before European arrival in the Americas',
            'Modern Colombian art inspired by European traditions',
            'Artworks that were imported to Colombia from other countries',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'How does Bogotá make museums accessible to all residents?',
          options: [
            'By building new museums in every neighbourhood',
            'By offering free entry to all museums every day of the week',
            'By offering free entry to many public museums on Sundays',
            'By providing free transport to all cultural events in the city',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which of the following is NOT mentioned in the text?',
          options: [
            'The Ibero-American Theatre Festival',
            'The Gold Museum',
            'The Bogotá International Book Fair',
            'The Bogotá Music Festival',
          ],
          answer: 3,
        },
      ],
    },

    // ── PARTE 6 ── Comprensión: texto largo (preguntas 31–35) ────────────────
    {
      part: 6,
      title: 'Parte 6 — Comprensión de lectura: texto largo',
      sectionStyle: 'reading',
      passageTitle: 'Street Art in Medellín: From Graffiti to Gallery',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        'STREET ART IN MEDELLÍN: FROM GRAFFITI TO GALLERY\n\nFifteen years ago, the walls of many Medellín neighbourhoods were covered in graffiti linked to gang activity. Today, those same walls are home to spectacular murals by internationally recognised artists. The transformation of Medellín\'s street art scene is one of the most remarkable cultural stories in Latin America.\n\nThe change began in earnest around 2012, when the city government launched a programme to use art as a tool for social transformation. Artists were invited to paint large-scale murals on the walls of residential buildings, particularly in areas that had previously been associated with violence and poverty. The idea was not simply to beautify the city, but to give communities a sense of ownership and pride in their surroundings.\n\nThe neighbourhood of La Candelaria and the famous hillside barrios connected by the Metro Cable became centres of this artistic movement. Local and international artists worked side by side with residents, often creating works that reflected the history and identity of the community.\n\nThe results went beyond aesthetic improvement. Studies found that areas with large mural projects experienced reductions in crime and increased community engagement. Young people who participated in the art projects reported greater feelings of belonging and self-confidence. Tourism also increased as visitors from around the world came to see what had become known as an open-air gallery.\n\nNot everyone agreed with the approach, however. Some critics argued that using art to address deep social problems was superficial — that murals could not compensate for inequality, unemployment, and lack of educational opportunity. Others questioned whether the attention from tourists had led to rising rents that were pushing original residents out of their own neighbourhoods.\n\nDespite these criticisms, the transformation of Medellín\'s street art scene is widely regarded as a model for other cities facing similar challenges. It demonstrates that culture can be a powerful force for positive change — even if it cannot solve every problem on its own.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'What was the purpose of the city government\'s art programme, according to paragraph 2?',
          options: [
            'To attract international artists to live and work in Medellín',
            'To use art as a tool for social transformation and community pride',
            'To promote tourism in the city\'s historic centre',
            'To train local artists to sell their work internationally',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'According to paragraph 4, what social effects did the mural projects have?',
          options: [
            'They increased unemployment but reduced crime.',
            'They led to higher school attendance among young people.',
            'They reduced crime and increased community engagement.',
            'They caused significant conflict between local and international artists.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: 'What criticism do some people make about using art to address social problems?',
          options: [
            'They say street art is not a real form of artistic expression.',
            'They argue that murals are too expensive to maintain over time.',
            'They feel that art cannot compensate for deep issues like inequality and unemployment.',
            'They believe international artists should not be involved in local projects.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'What concern is raised about tourism in paragraph 5?',
          options: [
            'Tourism has caused damage to many of the original murals.',
            'Increased tourism has led to rising rents that may be pushing residents out.',
            'Too many tourists are visiting the barrios and disturbing local life.',
            'Tourism revenue has not been shared fairly with local artists.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What does the author conclude about Medellín\'s street art experience?',
          options: [
            'It has completely solved all the social problems in the city.',
            'It is an inspiring model for other cities, though it has limitations.',
            'It has been largely unsuccessful due to opposition from local communities.',
            'It shows that tourism is the best solution to urban poverty.',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 7 ── Texto de opinión/argumento (preguntas 36–45) ──────────────
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      sectionStyle: 'reading',
      passageTitle: 'Is Digital Art as Valuable as Traditional Art?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        'IS DIGITAL ART AS VALUABLE AS TRADITIONAL ART?\n\nFor centuries, the definition of art was relatively straightforward. A painter applied colour to canvas. A sculptor shaped stone or metal. A photographer captured the world through a lens. But the digital revolution has challenged these definitions dramatically. Today, artists create stunning works using software, tablets, and computers — and the question of whether these works are as valuable as traditional art has become one of the most debated topics in the art world.\n\nThose who value digital art highly point to the extraordinary range of possibilities it offers. Digital tools allow artists to work with unlimited colours, correct mistakes instantly, and experiment in ways that would be physically impossible with traditional media. Furthermore, digital art can be reproduced and shared with global audiences at zero cost, democratising access to art in a way that traditional galleries never could.\n\nThe commercial success of digital art has also been undeniable. In 2021, a digital artwork by the artist Beeple sold at Christie\'s auction house for 69 million dollars — one of the highest prices ever paid for a work by a living artist. The rise of NFTs (Non-Fungible Tokens) created a new market for digital art, allowing artists to sell unique digital files and retain ownership rights.\n\nCritics of digital art, however, argue that the ease of creation reduces its artistic value. A traditional oil painting requires years of skill development, physical effort, and an understanding of materials. The time and mastery invested in a work is part of what gives it value. With digital tools, they argue, many of the technical barriers have been removed — making it possible to produce visually impressive work without deep artistic training.\n\nThere is also a question of uniqueness. A traditional painting is a singular physical object. A digital file can be copied infinitely, which some argue undermines the concept of artistic rarity that has historically underpinned the value of art.\n\nPerhaps the most honest answer is that the value of art — digital or traditional — has never been purely about technical difficulty or physical rarity. It has always been about the ideas, emotions, and experiences that a work communicates. By that measure, a digital artwork that moves, challenges, or inspires its viewer is as valuable as any oil painting hanging in a museum.',
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What question does this text explore?',
          options: [
            'Whether artists should learn traditional art before studying digital art',
            'Whether digital art has the same value as traditional art',
            'How digital technology has changed the way people visit art galleries',
            'Why traditional painting is becoming less popular among young artists',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, what advantage does digital art have for audiences?',
          options: [
            'Digital art is always more colourful and visually impressive than traditional art.',
            'Digital art can be reproduced and shared globally at no cost.',
            'Digital art is easier to understand than traditional art.',
            'Digital art is always cheaper to produce than traditional art.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: 'What was significant about the sale of Beeple\'s digital artwork in 2021?',
          options: [
            'It was the first time any artwork was sold at Christie\'s auction house.',
            'It proved that digital art was completely worthless.',
            'It sold for 69 million dollars, one of the highest prices for a living artist\'s work.',
            'It was purchased by a Colombian art museum.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'What does "democratising access to art" mean in paragraph 2?',
          options: [
            'Making art available to people in democratic countries only',
            'Requiring artists to share their work freely with everyone',
            'Making art accessible to a wider range of people, not just those near galleries',
            'Giving artists the right to vote on which works are displayed',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: 'What argument do critics make against the value of digital art in paragraph 4?',
          options: [
            'Digital art is too easy to sell and makes artists wealthy too quickly.',
            'Digital tools remove technical barriers, so the work requires less skill and mastery.',
            'Digital art cannot express human emotions as effectively as traditional art.',
            'Digital art is difficult for older people to understand and appreciate.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'What is the concern about "uniqueness" raised in paragraph 5?',
          options: [
            'All digital artworks look the same because artists use the same software.',
            'Digital files can be copied indefinitely, which may undermine the value of rarity.',
            'Digital art cannot be displayed in traditional galleries.',
            'Artists cannot prove they created a digital work because files can be changed.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: 'What does the word "underpinned" mean in paragraph 5?',
          options: [
            'completely replaced or destroyed',
            'supported or provided a basis for',
            'publicly criticised or questioned',
            'recorded or documented officially',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: 'What are NFTs used for, according to paragraph 3?',
          options: [
            'They allow artists to display their work in traditional galleries.',
            'They provide a way for digital artists to sell unique files and retain ownership rights.',
            'They give buyers the right to copy and sell digital artworks freely.',
            'They are a type of digital brush tool used to create art.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: 'According to the author\'s conclusion, what is the true measure of art\'s value?',
          options: [
            'The number of hours the artist spent creating it',
            'The price it achieves when sold at a major auction',
            'The ideas, emotions, and experiences it communicates to the viewer',
            'The physical materials used to create it',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: "Which statement BEST summarises the author's position?",
          options: [
            'Traditional art is always superior to digital art because it requires more skill.',
            'Digital art is more valuable than traditional art because it reaches more people.',
            'The value of art, whether digital or traditional, lies in what it communicates rather than how it was made.',
            'The debate between digital and traditional art cannot be resolved and should be ignored.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
