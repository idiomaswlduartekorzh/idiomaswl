import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  JsonLd,
  KidsBreadcrumbs,
  KidsCta,
  KidsFaq,
  SectionHeading,
  kidsWhatsApp,
  type FaqItem,
} from '@/components/kids/KidsShared';
import { localBusinessNode } from '@/components/hub/localBusiness';
import ChessMoveHarness from '@/components/kids/ChessMoveHarness';
import DocumentLanguage from '@/components/spanish/DocumentLanguage';
import styles from '../kids.module.css';

const CANONICAL = 'https://www.idiomaswl.com/kids/ingles-ajedrez';
const TITLE = 'Chess Lessons for Kids in Bucaramanga | WeLearn';
const DESCRIPTION =
  'Children ages 8–12 learn chess basics, solve puzzles, and play guided games in English in Bucaramanga or online.';
const SHARE_IMAGE = {
  url: '/images/kids/kids-ajedrez-docente.jpg',
  width: 1536,
  height: 1024,
  alt: 'Illustration of children learning chess with a teacher',
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'chess for kids in Bucaramanga',
    'chess in English for kids',
    'chess lessons for children',
    'beginner chess for kids',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    locale: 'en_US',
    images: [SHARE_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [SHARE_IMAGE] },
};

const faqs: FaqItem[] = [
  {
    question: 'What ages are the chess lessons for?',
    answer:
      'The program is designed for children ages 8–12. Before enrollment, we review their age, chess experience, and English level to check whether the available session is a good fit.',
  },
  {
    question: 'Can my child start as a beginner?',
    answer:
      'Yes. Beginners start with the board, the pieces, taking turns, and basic moves. Children who already play can tackle harder puzzles and explain their plans in English.',
  },
  {
    question: 'How much English does my child need?',
    answer:
      'Children can start with a few words. The board helps them connect an instruction to a piece or a move. They build from single words to short sentences at their own pace.',
  },
  {
    question: 'What is the focus of the lessons?',
    answer:
      'Children learn chess fundamentals and practice English through puzzles and guided games. The focus is on following instructions, choosing a move, and explaining why they played it.',
  },
  {
    question: 'What do children learn beyond the names of the pieces?',
    answer:
      'They practice following instructions, describing positions, taking turns, and explaining simple choices. They also learn to study a position and compare possible moves.',
  },
  {
    question: 'Will they play full games?',
    answer:
      'Depending on the group’s level and time, children may play mini-games, solve prepared positions, or play a guided game. Short puzzles help them focus on one chess idea and a few useful phrases at a time.',
  },
  {
    question: 'Are lessons in person or online?',
    answer:
      'WeLearn offers in-person lessons in Bucaramanga and online learning. We confirm the format, materials, and platform for each session before enrollment.',
  },
  {
    question: 'How do you measure progress?',
    answer:
      'We look at what children can do on the board. They follow instructions, name pieces and squares, play legal moves, spot threats, and explain their choices with language support.',
  },
  {
    question: 'How can I find dates, times, and prices?',
    answer:
      'Parents and guardians can message us on WhatsApp with their child’s age, chess and English experience, and preferred lesson format. We’ll share the current details.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    localBusinessNode(
      'Language lessons in Bucaramanga and online, including English through chess for children.',
    ),
    {
      '@type': 'Service',
      '@id': `${CANONICAL}#service`,
      name: 'Chess lessons for kids with English practice',
      description:
        'Children ages 8–12 practice English as they learn the pieces, solve puzzles, and explain decisions in guided chess games.',
      provider: { '@id': 'https://www.idiomaswl.com/#localbusiness' },
      serviceType: 'Chess lessons for children',
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student',
        audienceType: 'Children ages 8–12',
      },
      areaServed: [
        { '@type': 'City', name: 'Bucaramanga' },
        { '@type': 'Country', name: 'Colombia' },
      ],
      inLanguage: ['es-CO', 'en'],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Kids', item: 'https://www.idiomaswl.com/kids' },
        { '@type': 'ListItem', position: 3, name: 'Chess for kids', item: CANONICAL },
      ],
    },
  ],
};

export default function KidsChessPage() {
  return (
    <div className={styles.page} lang="en">
      <DocumentLanguage lang="en" />
      <JsonLd data={jsonLd} />

      <aside className={styles.seasonBanner} aria-label="School break sessions">
        <div className={styles.seasonInner}>
          <span className={styles.seasonDot} aria-hidden="true" />
          School break, October 5–9 · Ask about available chess sessions
        </div>
      </aside>

      <section className={styles.hero}>
        <KidsBreadcrumbs
          lang="en"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Kids', href: '/kids' },
            { label: 'Chess for kids' },
          ]}
        />
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>WeLearn Kids · Chess in English</p>
            <h1>Chess lessons for kids in Bucaramanga with English practice</h1>
            <p className={styles.heroLead}>
              Children ages 8–12 learn how the pieces move, solve puzzles, and use English to explain their moves.
              Lessons are available in Bucaramanga or online, depending on the session.
            </p>
            <ul className={styles.heroProof}>
              <li>Beginners welcome</li>
              <li>Ages 8–12</li>
              <li>Guided games</li>
              <li>Bucaramanga and online</li>
            </ul>
            <div className={styles.ctaActions}>
              <a
                className={styles.primaryButton}
                href={kidsWhatsApp('Hello, I’m a parent or guardian interested in Chess in English for my child, age ___. Our preferred lesson format is ___.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask about the next session
              </a>
              <a className={styles.secondaryButton} href="/kids/ingles-ajedrez/practica">
                Practice chess
              </a>
            </div>
          </div>
          <div>
            <div className={styles.imageFrame}>
              <Image
                src="/images/kids/kids-ajedrez-docente.jpg"
                alt="Illustration of children studying a chess position with their teacher"
                fill
                priority
                sizes="(max-width: 980px) 100vw, 48vw"
              />
            </div>
            <p className={styles.imageCaption}>Illustration of a guided chess activity.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <SectionHeading
              eyebrow="How the lessons work"
              title="Learn chess and practice English on the board"
            />
            <div className={styles.note}>
              <strong>What children can work toward</strong>
              <p>Play a guided position or game and talk about their moves using English that fits their level.</p>
            </div>
          </div>
          <div className={styles.prose}>
            <p>
              Children start with the board and the pieces. They practice legal moves, spot threats, and solve short
              puzzles before playing guided games. Beginners can start from the basics.
            </p>
            <p>
              The board gives children something to point to and do. They put words such as <em>king</em>,
              {' '}<em>move</em>, <em>capture</em>, <em>safe</em>, and <em>check</em> into action as they play.
            </p>
            <p>
              A child learns to follow an instruction, choose an option, and give a simple reason. They might
              start with “knight” or “to e4” and build up to “I move my knight because…”
            </p>
            <p>
              The goal is to understand instructions and speak with confidence while learning the basics of chess.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`} id="ruta">
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Learning path"
            title="Five steps from naming the pieces to explaining a move"
            lead="We can group these steps based on a child’s experience, the session length, and the lesson format."
          />
          <div className={`${styles.stepsGrid} ${styles.darkCards}`}>
            {[
              ['01', 'Meet the board', 'Find the ranks, files, and squares, and learn which way the board faces.'],
              ['02', 'Meet the pieces', 'Name the pieces and practice how each one moves.'],
              ['03', 'Spot the idea', 'Find captures, threats, defenses, and safe squares in short puzzles.'],
              ['04', 'Play the position', 'Take turns and play legal moves in a guided position.'],
              ['05', 'Explain the move', 'Use a sample sentence to say what you moved, where it went, and why.'],
            ].map(([number, title, text]) => (
              <article className={styles.stepCard} key={number}>
                <span className={styles.stepNumber}>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ChessMoveHarness />

      <section className={styles.section}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Sample challenge"
            title="Find a way to get your king out of check"
            lead="A short position gives children one idea to focus on as they listen, move, and explain."
          />
          <div className={styles.cardGrid}>
            <article className={styles.card}>
              <span className={styles.cardIcon}>1</span>
              <h3>Look</h3>
              <p>“Your king is in check.” Find your king and the piece attacking it.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>2</span>
              <h3>Choose</h3>
              <p>See if you can move the king, block the attack, or capture the attacking piece.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>3</span>
              <h3>Explain</h3>
              <p>“I move the king because this square is safe.” Point to your move and say why it works.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="English on the board"
            title="Words and phrases to use while you play"
            lead="Children start by naming pieces and moves, then build up to describing positions and explaining choices."
          />
          <div className={styles.languageGrid}>
            <article className={styles.languageCard}>
              <h3>Pieces</h3>
              <p>
                <code>king</code><code>queen</code><code>rook</code><code>bishop</code><code>knight</code><code>pawn</code>
              </p>
            </article>
            <article className={styles.languageCard}>
              <h3>Actions</h3>
              <p>
                <code>move</code><code>capture</code><code>protect</code><code>attack</code><code>block</code><code>check</code>
              </p>
            </article>
            <article className={styles.languageCard}>
              <h3>Position</h3>
              <p>
                <code>left</code><code>right</code><code>forward</code><code>back</code><code>next to</code><code>diagonal</code>
              </p>
            </article>
            <article className={styles.languageCard}>
              <h3>During the game</h3>
              <p>
                <code>Your turn</code><code>My move</code><code>Is it safe?</code><code>I choose…</code><code>Good game</code>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Tracking progress"
            title="What children learn to recognize, do, and explain"
            lead="Small changes in how a child plays and speaks show what they’re learning."
          />
          <div className={styles.cardGrid}>
            <article className={styles.card}>
              <span className={styles.cardIcon}>A</span>
              <h3>Recognize</h3>
              <p>Recognize a piece, a square, or a basic instruction during play.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>B</span>
              <h3>Decide</h3>
              <p>Spot a threat and choose a legal move from options suited to your level.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>C</span>
              <h3>Explain</h3>
              <p>Describe your move and give a short reason with help from the teacher or a sample phrase.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <SectionHeading
              eyebrow="Learning from mistakes"
              title="Take a moment to think, try a move, and try again"
            />
            <div className={styles.note}>
              <strong>What progress looks like</strong>
              <p>Finding an option, correcting a move, and explaining an idea all count as progress.</p>
            </div>
          </div>
          <div className={styles.prose}>
            <h3>Step-by-step challenges</h3>
            <p>
              Beginners can use smaller boards, prepared positions, and one-move challenges before playing a full game.
            </p>
            <h3>Taking turns and playing fairly</h3>
            <p>
              Children practice waiting, listening, trying a correction, and ending with “good game.” Playing
              together gives them a chance to learn from each other.
            </p>
            <h3>English at a comfortable pace</h3>
            <p>
              Children can use cards, example phrases, gestures, and the board to join in. They build more precise
              English as they become comfortable with each position.
            </p>
            <h3>Information for families</h3>
            <p>
              A parent or guardian handles enrollment. Before lessons start, we confirm the format, materials,
              dates, length, price, and any support or accessibility needs.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Common questions"
            title="What to know about Chess in English"
          />
          <KidsFaq items={faqs} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Coding for kids"
            title="Learn English by building a video game"
            lead="If your child enjoys designing characters and building things, explore the WeLearn Kids coding program."
          />
          <Link className={styles.secondaryButton} href="/kids/ingles-programacion-videojuegos">
            Explore English and coding
          </Link>
        </div>
      </section>

      <KidsCta
        lang="en"
        title="Interested in Chess in English for your child?"
        text="Tell us their age, English and chess experience, and your preferred format. We’ll share the details for the available session."
        message="Hello, I’m a parent or guardian interested in Chess in English for my child, age ___. Their English and chess experience is ___. Our preferred lesson format is ___."
      />
    </div>
  );
}
