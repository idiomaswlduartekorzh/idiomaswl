import type { MockExam } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// ICFES Saber 11 · Componente de Inglés — Mock 15
// Nivel: A2–B1  ·  45 preguntas  ·  60 minutos
// Tema: Redes sociales y comunicación
// ─────────────────────────────────────────────────────────────────────────────
const mock: MockExam = {
  id: 'mock-15',
  examSlug: 'icfes',
  title: 'Mock 15 · Redes sociales y comunicación',
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
            'INTERNET ACCESS POLICY\nUse of social media for personal purposes is limited to 30 minutes per session.\nPlease respect other users.',
          text: 'Where would you most likely see this notice?',
          options: [
            'In a hospital waiting room',
            'At an internet café',
            'On a public bus',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'CYBERBULLYING POLICY\nAny student found bullying others online will face immediate suspension.\nReport all incidents to a teacher.',
          text: 'What is the purpose of this notice?',
          options: [
            'To encourage students to use social media more safely',
            'To warn students about the consequences of online bullying',
            'To advertise a new school internet policy',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'UNCOLLECTED PACKAGES\nPackages must be collected within 14 days of arrival.\nItems not collected will be returned to sender.',
          text: 'Where would you most likely see this notice?',
          options: [
            'At a post office or parcel collection centre',
            'In a supermarket',
            'At a train station',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'FREE WI-FI AVAILABLE\nPlease use the internet responsibly.\nDo not share your login details with others.',
          text: 'What does this notice tell users to do?',
          options: [
            'Pay for internet access at the counter',
            'Use the internet with care and keep their details private',
            'Bring their own device to connect to the internet',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          stimulusStyle: 'notice',
          stimulus:
            'WORKPLACE COMMUNICATIONS POLICY\nPersonal phone calls should be made outside working hours.\nThank you for your cooperation.',
          text: 'What is the main message of this notice?',
          options: [
            'Employees should not bring personal phones to work',
            'Personal calls should not be made during work time',
            'The company provides phones for all employees',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 2 ── Vocabulario: cuadrícula de emparejamiento (preguntas 6–10) ─
    {
      part: 2,
      title: 'Parte 2 — Vocabulario',
      sectionStyle: 'matching-grid',
      topic: 'Communication',
      exampleText: 'The name a person chooses to identify themselves on a website or app.',
      exampleAnswer: 'username',
      instructions:
        'Read descriptions 6 to 10. Which word from column (A – G) matches each description? Mark the correct letter. There are TWO extra words you will not need.',
      questions: [
        {
          type: 'mcq',
          id: 'p2q1',
          part: 2,
          text: 'A person who regularly reads or watches someone\'s content on a social media platform.',
          options: ['broadcast', 'caption', 'comment', 'follower', 'hashtag', 'message', 'profile'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p2q2',
          part: 2,
          text: 'A word or phrase beginning with the symbol # used to tag and categorise content online.',
          options: ['broadcast', 'caption', 'comment', 'follower', 'hashtag', 'message', 'profile'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'p2q3',
          part: 2,
          text: 'A short description or text placed below a photo or video to explain what it shows.',
          options: ['broadcast', 'caption', 'comment', 'follower', 'hashtag', 'message', 'profile'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p2q4',
          part: 2,
          text: 'A written response left below a post or photo to share an opinion or reaction.',
          options: ['broadcast', 'caption', 'comment', 'follower', 'hashtag', 'message', 'profile'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p2q5',
          part: 2,
          text: 'A personal page on a social network that shows a user\'s photo, information, and posts.',
          options: ['broadcast', 'caption', 'comment', 'follower', 'hashtag', 'message', 'profile'],
          answer: 6,
        },
      ],
    },

    // ── PARTE 3 ── Diálogos (preguntas 11–15) ────────────────────────────────
    {
      part: 3,
      title: 'Parte 3 — Diálogos',
      sectionStyle: 'dialogs-grid',
      exampleStimulus: 'I just posted a new photo.',
      exampleOptions: ['Did you get any likes?', 'I deleted my account.', 'Photos are boring.'],
      exampleAnswer: 'A',
      instructions:
        'Complete las cinco conversaciones. En las preguntas 11 – 15, marque A, B ó C en su hoja de respuestas.',
      questions: [
        {
          type: 'dialog',
          id: 'p3q1',
          part: 3,
          stimulus: 'Someone left a very rude comment on my post.',
          text: '',
          options: [
            'You can report or block that person.',
            'You should ignore all your comments.',
            'Delete your account immediately.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q2',
          part: 3,
          stimulus: 'I have over five thousand followers now!',
          text: '',
          options: [
            "Followers don't really matter.",
            'How did you grow your account so quickly?',
            'I have many more than that.',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p3q3',
          part: 3,
          stimulus: 'I spend hours scrolling through videos every night.',
          text: '',
          options: [
            'Videos are very educational.',
            'Night is the best time to relax.',
            'You should set a time limit for yourself.',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p3q4',
          part: 3,
          stimulus: 'My photo got a thousand likes.',
          text: '',
          options: [
            "That's impressive!",
            'Likes are completely meaningless.',
            'I always get more than that.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p3q5',
          part: 3,
          stimulus: "I don't have any social media accounts.",
          text: '',
          options: [
            'Social media is very dangerous.',
            "That's quite unusual nowadays.",
            'You are very lucky then.',
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
        "Colombia has millions of active social media (16) ___, making it one of the most connected countries in Latin America. People use these platforms to produce and discover (17) ___ on a wide range of topics, from entertainment and sport to news and education. The most (18) ___ platform among young Colombians is one that allows them to create and watch short (21) ___. Many users access their favourite (19) ___ several times a (22) ___, spending hours scrolling through posts and stories. One of the most common activities is to (20) ___ funny or interesting content with friends and family. Social media has also become a powerful (23) ___ for small businesses, which use it to advertise their products and reach new customers.",
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          text: 'Choose the best word for blank (16).',
          options: ['accounts', 'users', 'members', 'followers'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          text: 'Choose the best word for blank (17).',
          options: ['messages', 'comments', 'content', 'profiles'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          text: 'Choose the best word for blank (18).',
          options: ['familiar', 'popular', 'recent', 'useful'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          text: 'Choose the best word for blank (19).',
          options: ['website', 'platform', 'device', 'channel'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          text: 'Choose the best word for blank (20).',
          options: ['send', 'upload', 'share', 'post'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          text: 'Choose the best word for blank (21).',
          options: ['images', 'videos', 'articles', 'stories'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          text: 'Choose the best word for blank (22).',
          options: ['hour', 'week', 'daily', 'day'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          text: 'Choose the best word for blank (23).',
          options: ['tool', 'network', 'system', 'service'],
          answer: 0,
        },
      ],
    },

    // ── PARTE 5 ── Comprensión: texto corto (preguntas 24–30) ────────────────
    {
      part: 5,
      title: 'Parte 5 — Comprensión de lectura: texto corto',
      sectionStyle: 'reading',
      passageTitle: 'Cyberbullying: A Growing Problem for Teenagers',
      instructions:
        'Read the text and answer questions 24 to 30. Choose the best option (A, B, C, or D).',
      passage:
        "CYBERBULLYING: A GROWING PROBLEM FOR TEENAGERS\n\nCyberbullying — the use of technology to threaten, insult, or embarrass others — has become one of the most serious challenges facing young people today. Unlike traditional bullying, which happens face to face, cyberbullying can occur at any time of day or night, and its effects can spread rapidly to a wide audience.\n\nStudies suggest that around one in three teenagers has experienced some form of online harassment. Common forms include sending cruel messages, sharing embarrassing photos without permission, or posting false information about someone. Victims often feel helpless because even if they block one person, the content may have already been shared widely.\n\nThe consequences for victims can be severe. Many young people who experience cyberbullying report feeling anxious, depressed, or isolated. Some begin to avoid going to school or participating in social activities. In the most serious cases, cyberbullying has been linked to self-harm.\n\nExperts recommend several strategies to address the problem. Schools should educate students about responsible online behaviour from an early age. Parents should keep an open dialogue with their children about what they experience online. Platforms and technology companies have a responsibility to provide clear tools for reporting harmful content and to respond quickly when a complaint is made.\n\nCombating cyberbullying is a shared responsibility that requires effort from students, families, schools, and technology companies alike.",
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          text: 'What is cyberbullying?',
          options: [
            'Physical violence between students at school',
            'The use of technology to harm, insult, or embarrass others',
            'Stealing someone\'s phone or personal device',
            'Sending too many messages to the same person',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          text: 'How is cyberbullying different from traditional bullying?',
          options: [
            'It only affects children under twelve.',
            'It always involves physical contact.',
            'It can happen at any time and reach a wide audience quickly.',
            'It is less serious than face-to-face bullying.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          text: 'According to the text, which of the following is a common form of cyberbullying?',
          options: [
            'Sending someone too many invitations to events',
            'Sharing embarrassing photos of someone without permission',
            'Liking too many of someone\'s posts',
            'Following someone on multiple platforms',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          text: "The word 'isolated' in paragraph 3 most likely means:",
          options: [
            'angry and ready to fight back',
            'feeling alone and cut off from others',
            'confused about what is happening',
            'bored and uninterested in school',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          text: 'Why do victims sometimes feel helpless when they block someone?',
          options: [
            'Because blocking someone does not delete messages from their phone.',
            'Because the harmful content may already have been shared with many people.',
            'Because blocked people can create new accounts immediately.',
            'Because school rules do not allow students to block classmates.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          text: 'What role does the text say technology companies should play?',
          options: [
            'They should ban teenagers from using their platforms.',
            'They should provide reporting tools and respond quickly to complaints.',
            'They should work directly with schools to teach safe internet use.',
            'They should monitor all messages sent between teenagers.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          text: 'Which of the following is NOT mentioned as a strategy to address cyberbullying?',
          options: [
            'Educating students about responsible online behaviour',
            'Parents talking openly with their children about online experiences',
            'Removing all social media platforms',
            'Technology companies responding quickly to reports of harmful content',
          ],
          answer: 2,
        },
      ],
    },

    // ── PARTE 6 ── Comprensión: texto largo (preguntas 31–35) ────────────────
    {
      part: 6,
      title: 'Parte 6 — Comprensión de lectura: texto largo',
      sectionStyle: 'reading',
      passageTitle: 'Social Media and Political Participation',
      instructions:
        'Read the text and answer questions 31 to 35. Some questions require you to infer information from the text. Choose the best option (A, B, C, or D).',
      passage:
        "SOCIAL MEDIA AND POLITICAL PARTICIPATION\n\nIn recent years, social media platforms have transformed the way citizens engage with politics. In Colombia and across Latin America, a growing number of people — especially young people — are using platforms to discuss political ideas, follow election campaigns, and organise collective action. This shift has raised important questions about both the opportunities and the risks of digital political participation.\n\nOne of the most significant benefits is accessibility. In the past, participating in public debate required access to traditional media, such as newspapers or television, which were controlled by a small number of organisations. Today, any citizen with a smartphone can share their opinion, respond to a politician's statement, or participate in a digital campaign. Social media has also been used to organise large-scale protests, such as those seen in Colombia in 2019 and 2021, where millions of citizens took to the streets in response to calls spread online.\n\nHowever, critics point to serious risks. The spread of misinformation — false or misleading content shared rapidly online — is one of the greatest threats to democratic health. During election periods, false stories about candidates can influence how people vote, and many users struggle to distinguish reliable information from fabricated content.\n\nAlgorithms, which determine what content users see, also tend to show people posts that confirm what they already believe. This creates 'echo chambers' — online environments where people only encounter viewpoints they agree with. Over time, this can deepen political divisions and make constructive dialogue more difficult.\n\nExperts argue that social media itself is not the problem; rather, it is a powerful tool whose impact depends on how it is used. Investing in media literacy education — teaching young people to evaluate sources critically and recognise misinformation — is widely seen as an essential step in ensuring that digital participation strengthens rather than weakens democracy.",
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          text: 'What is one important benefit of social media for political participation mentioned in the text?',
          options: [
            'It allows politicians to earn more votes during elections.',
            'It makes it easier for any citizen to participate in public debate.',
            'It replaces the need for newspapers and television completely.',
            'It guarantees that correct information reaches all citizens.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          text: 'What does the text say about the 2019 and 2021 protests in Colombia?',
          options: [
            'They were organised by political parties using television advertising.',
            'They were small events that received little public attention.',
            'They were large-scale actions that were organised through social media.',
            'They were the result of government campaigns on digital platforms.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          text: "The term 'echo chambers' in paragraph 4 most likely refers to:",
          options: [
            'rooms designed for listening to political speeches.',
            'online spaces where people only see content that matches their existing views.',
            'social media platforms that block political content.',
            'places where political debates are recorded and broadcast.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          text: 'Why is misinformation a risk during elections according to the text?',
          options: [
            'It causes governments to spend more money on campaigns.',
            'False stories about candidates can influence how people vote.',
            'It prevents candidates from sharing their ideas on social media.',
            'It makes elections more expensive to organise.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          text: 'What solution do experts recommend to improve digital political participation?',
          options: [
            'Banning political content from all social media platforms.',
            'Teaching citizens to identify and evaluate information critically.',
            'Giving governments control over social media algorithms.',
            'Limiting social media use to adults over the age of 25.',
          ],
          answer: 1,
        },
      ],
    },

    // ── PARTE 7 ── Texto de opinión (preguntas 36–45) ────────────────────────
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      sectionStyle: 'reading',
      passageTitle: 'Should Social Media Age Limits Be Raised to 18?',
      instructions:
        'Read the text and answer questions 36 to 45. Choose the best option (A, B, C, or D).',
      passage:
        "SHOULD SOCIAL MEDIA AGE LIMITS BE RAISED TO 18?\n\nMost major social media platforms currently require users to be at least 13 years old. However, research into the effects of social media on the mental health and development of young people has led some governments, parents, and experts to ask whether this limit is too low. Should the minimum age to use social media be raised to 18?\n\nThose who support raising the age limit argue that teenagers' brains are still developing, and that prolonged exposure to social media can damage their self-esteem, disrupt their sleep, and increase anxiety and depression. Studies have found particularly strong links between heavy social media use and poor mental health outcomes among girls aged 12 to 16. Supporters of stricter limits say that, just as society protects young people from other harmful environments — such as gambling or alcohol — it should also protect them online.\n\nOpponents of the idea argue that social media also has genuine benefits for teenagers. Many young people use platforms to connect with friends, explore their identity, access educational content, and engage with causes they care about. Banning teenagers from these spaces does not prepare them for life in a digital world; it simply removes their access to it. Critics also note that age limits are notoriously difficult to enforce online, as young people can easily create accounts using false details.\n\nA more moderate position holds that the problem is not age limits themselves, but the design of the platforms. Features such as endless scrolling, notifications, and algorithms designed to maximise engagement are deliberately engineered to make social media addictive — for users of all ages. Reform should therefore focus on regulating these features, not on restricting access by age.\n\nUltimately, protecting young people online requires a combination of approaches: better platform design, meaningful age verification systems, digital literacy education, and open communication between parents and children. Raising the age limit to 18 may seem like a simple solution, but the reality is considerably more complex.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          text: 'What is the main question this text discusses?',
          options: [
            'Why social media companies do not verify users\' ages',
            'Whether the minimum age for social media should be raised to 18',
            'How social media affects adults over the age of 18',
            'Why teenagers prefer social media to other forms of communication',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          text: 'According to paragraph 2, which group is most negatively affected by heavy social media use?',
          options: [
            'Boys aged 14 to 18',
            'Girls aged 12 to 16',
            'Children under the age of 10',
            'Adults who work in technology',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          text: "The word 'prolonged' in paragraph 2 most likely means:",
          options: [
            'harmful and damaging',
            'unexpected and sudden',
            'lasting for a long time',
            'limited to certain groups',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          text: 'What argument do opponents of raising the age limit make in paragraph 3?',
          options: [
            'Social media companies earn less money when teenagers are banned.',
            'Social media has real benefits for teenagers and prepares them for digital life.',
            'Young people should be allowed to make their own decisions.',
            'Parents, not governments, should control their children\'s online access.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          text: "The phrase 'notoriously difficult to enforce' in paragraph 3 most likely means:",
          options: [
            'very expensive for governments to apply',
            'widely known to be hard to put into practice',
            'impossible to discuss in public',
            'rarely mentioned in scientific research',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          text: 'What does the moderate position in paragraph 4 say should be reformed?',
          options: [
            'The age limits set by governments',
            'The harmful design features built into platforms',
            'The way schools teach students about social media',
            'The number of accounts a person can create online',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          text: "The word 'addictive' in paragraph 4 most likely means:",
          options: [
            'educational and informative',
            'designed to be shared widely',
            'very difficult to stop using',
            'expensive to access regularly',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q8',
          part: 7,
          text: "What is the author's conclusion in the final paragraph?",
          options: [
            'Raising the age limit to 18 is the best solution to protect young people.',
            'Governments should shut down social media platforms immediately.',
            'Protecting young people requires a combination of different approaches.',
            'Parents are solely responsible for their children\'s online safety.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q9',
          part: 7,
          text: 'Which of the following BEST describes how the text is organised?',
          options: [
            'It presents a single argument supported by statistics and studies.',
            'It describes the history of social media from its invention to today.',
            'It presents supporting arguments, opposing arguments, and a middle view before concluding.',
            'It explains why social media is dangerous and calls for an immediate ban.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q10',
          part: 7,
          text: 'Which statement would the author most likely agree with?',
          options: [
            'Simply raising the age limit to 18 would fully solve the problem of social media harm.',
            'Social media should be banned for everyone, not just teenagers.',
            'Addressing social media harm requires multiple strategies working together.',
            'Teenagers should have complete freedom to use social media without restrictions.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
