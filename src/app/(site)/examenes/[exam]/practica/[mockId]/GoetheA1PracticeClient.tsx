'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AudioPlayer, Timer } from '@/components/exam-runner/primitives';
import { IELTSSpeakingRecorder, type IeltsSpeakingRecording } from '@/components/exam-runner/IELTSSpeakingRecorder';
import type { Exam } from '@/data/exams';
import type { FormGroupQuestion, MCQQuestion, MockExam, MockSection, SpeakQuestion, WriteQuestion } from '@/data/mocks/types';
import { GOETHE_A1_SETS_3_TO_8 } from '@/data/mocks/goethe-a1-sets-3-8-content';
import { formatGoetheModule } from '@/lib/goethe/scoring';
import type { GoetheResultStatus, GoetheSubmissionReceipt } from '@/lib/goethe/submission';
import GoetheSubmission from './GoetheSubmission';
import styles from './goethe-a1.module.css';

type Skill = 'listening' | 'reading' | 'writing' | 'speaking';
type Phase = 'intro' | 'exam' | 'submit' | 'results' | 'practice-results';
type DeliveryMode = 'class' | 'simulation';

const SKILLS: Array<{ id: Skill; label: string; minutes: number; points: number }> = [
  { id: 'listening', label: 'Hören', minutes: 20, points: 25 },
  { id: 'reading', label: 'Lesen', minutes: 25, points: 25 },
  { id: 'writing', label: 'Schreiben', minutes: 20, points: 25 },
  { id: 'speaking', label: 'Sprechen', minutes: 15, points: 25 },
];

type Plate = { src: string; alt: string; width: number; height: number };
type SpeakingPictureCard = { label: string; sheet?: number; column?: number; row?: number };
type ReadingExample = { question: string; options: string[]; answer: number; stimulus?: string; adCopy?: string };

const SET1_LISTENING_PLATES: Record<number, Plate> = {
  1: { src: '/images/goethe/a1-1/hoeren-teil1-01-jacke.png', alt: 'Drei Bildoptionen: blaue Jacke zu 18,90, 28,90 oder 38,90 Euro', width: 2172, height: 724 },
  2: { src: '/images/goethe/a1-1/hoeren-teil1-02-uhrzeit.png', alt: 'Drei Uhrzeiten: 16:30, 16:45 und 17:15 Uhr', width: 2036, height: 772 },
  3: { src: '/images/goethe/a1-1/hoeren-teil1-03-essen.png', alt: 'Drei Bildoptionen: Tomatensuppe, Salat und Käsebrot', width: 2172, height: 724 },
  4: { src: '/images/goethe/a1-1/hoeren-teil1-04-flaschen.png', alt: 'Drei Bildoptionen mit zwei, vier und zehn Wasserflaschen', width: 2172, height: 724 },
  5: { src: '/images/goethe/a1-1/hoeren-teil1-05-bibliothek.png', alt: 'Drei Etagenoptionen für die Kinderbücher: erster, zweiter oder dritter Stock', width: 2036, height: 772 },
  6: { src: '/images/goethe/a1-1/hoeren-teil1-06-reise.png', alt: 'Drei Reisedauern: zwei Nächte, drei Nächte oder eine Woche', width: 2036, height: 772 },
};

const SET1_LISTENING_EXAMPLE_PLATES: Record<number, Plate> = {
  1: {
    src: '/images/goethe/a1-1/hoeren-teil1-00-beispiel-uhrzeit.png',
    alt: 'Beispiel mit drei Bildoptionen: heute um 9 Uhr, heute um 10 Uhr und morgen um 9 Uhr',
    width: 2167,
    height: 725,
  },
};

const SET1_READING_AD_PLATES: Record<number, Plate> = {
  6: { src: '/images/goethe/a1-1/lesen-teil2-06-fahrrad.png', alt: 'Anzeigen A und B: Fahrradgeschäft mit Werkstatt und geführte Fahrradtour durch die Stadt', width: 1536, height: 1024 },
  7: { src: '/images/goethe/a1-1/lesen-teil2-07-deutschkurs.png', alt: 'Anzeigen A und B: Deutschkurs für Erwachsene und Buchhandlung mit Lernbüchern', width: 1536, height: 1024 },
  8: { src: '/images/goethe/a1-1/lesen-teil2-08-fruehstueck.png', alt: 'Anzeigen A und B: Gästezimmer mit Frühstück und Frühstücksbuffet im Restaurant', width: 1536, height: 1024 },
  9: { src: '/images/goethe/a1-1/lesen-teil2-09-tickets.png', alt: 'Anzeigen A und B: Theater- und Konzertkasse und Reisebüro für Zug, Flug und Hotel', width: 1536, height: 1024 },
  10: { src: '/images/goethe/a1-1/lesen-teil2-10-apotheke.png', alt: 'Anzeigen A und B: Arztpraxis am Tag und geöffnete Apotheke in der Nacht', width: 1536, height: 1024 },
};

const SET1_READING_EXAMPLE_PLATES: Record<number, Plate> = {
  5: { src: '/images/goethe/a1-1/lesen-teil2-00-beispiel-wetter.png', alt: 'Beispielanzeigen A und B: Open-Air-Konzert im Regen und Wetterinformation für Deutschland', width: 1536, height: 1024 },
};

const SET2_LISTENING_EXAMPLE_PLATES: Record<number, Plate> = {
  1: { src: '/images/goethe/a1-2/hoeren-teil1-00-beispiel-buslinie.png', alt: 'Drei Bildoptionen mit einem roten, einem blauen und einem gelben Stadtbus', width: 2172, height: 724 },
};

const SET2_LISTENING_PLATES: Record<number, Plate> = {
  1: { src: '/images/goethe/a1-2/hoeren-teil1-01-rucksack.png', alt: 'Drei rote Rucksäcke mit den Preisen 24,90, 34,90 und 44,90 Euro', width: 2172, height: 724 },
  2: { src: '/images/goethe/a1-2/hoeren-teil1-02-uhrzeit.png', alt: 'Drei Bahnhofsuhren zeigen 8:15, 8:30 und 8:45 Uhr', width: 2172, height: 724 },
  3: { src: '/images/goethe/a1-2/hoeren-teil1-03-getraenk.png', alt: 'Drei Getränke: Kaffee, Orangensaft und Tee', width: 2172, height: 724 },
  4: { src: '/images/goethe/a1-2/hoeren-teil1-04-postkarten.png', alt: 'Drei Gruppen mit drei, fünf und acht Postkarten', width: 2172, height: 724 },
  5: { src: '/images/goethe/a1-2/hoeren-teil1-05-apotheke.png', alt: 'Die Apotheke liegt im Erdgeschoss, im ersten oder im zweiten Stock', width: 2172, height: 724 },
  6: { src: '/images/goethe/a1-2/hoeren-teil1-06-flughafen.png', alt: 'Drei Möglichkeiten zum Flughafen: Bus, Zug und Taxi', width: 2172, height: 724 },
};

const SET2_READING_AD_PLATES: Record<number, Plate> = {
  6: { src: '/images/goethe/a1-2/lesen-teil2-06-feierraum.png', alt: 'Anzeige A zeigt eine ruhige Ferienwohnung, Anzeige B einen Raum für eine große Geburtstagsfeier', width: 1536, height: 1024 },
  7: { src: '/images/goethe/a1-2/lesen-teil2-07-flughafen.png', alt: 'Anzeige A zeigt einen frühen Flughafenbus, Anzeige B ein Parkhaus am Flughafen', width: 1536, height: 1024 },
  8: { src: '/images/goethe/a1-2/lesen-teil2-08-deutschkurs.png', alt: 'Anzeige A zeigt Lernbücher, Anzeige B einen Deutschkurs am Abend', width: 1536, height: 1024 },
  9: { src: '/images/goethe/a1-2/lesen-teil2-09-reise.png', alt: 'Anzeige A zeigt eine Buchung von Zug und Hotel, Anzeige B eine Kulturkasse', width: 1536, height: 1024 },
  10: { src: '/images/goethe/a1-2/lesen-teil2-10-hund.png', alt: 'Anzeige A zeigt eine Tierarztpraxis, Anzeige B eine Hundebetreuung', width: 1536, height: 1024 },
};

const SET2_READING_EXAMPLE_PLATES: Record<number, Plate> = {
  5: { src: '/images/goethe/a1-2/lesen-teil2-00-beispiel-wetter.png', alt: 'Beispielanzeigen A und B: Wetterinformation für Österreich und ein Open-Air-Konzert', width: 1536, height: 1024 },
};

const SET1_SPEAKING_PICTURE_CARDS: SpeakingPictureCard[] = [
  { label: 'Wasser', sheet: 1, column: 0, row: 0 },
  { label: 'Fenster', sheet: 1, column: 1, row: 0 },
  { label: 'Bleistift', sheet: 1, column: 2, row: 0 },
  { label: 'Stuhl', sheet: 1, column: 0, row: 1 },
  { label: 'Apfel', sheet: 1, column: 1, row: 1 },
  { label: 'Uhr', sheet: 1, column: 2, row: 1 },
  { label: 'nicht rauchen', sheet: 2, column: 0, row: 0 },
  { label: 'Radio', sheet: 2, column: 1, row: 0 },
  { label: 'Buch', sheet: 2, column: 2, row: 0 },
  { label: 'Tasche', sheet: 2, column: 0, row: 1 },
  { label: 'Löffel', sheet: 2, column: 1, row: 1 },
  { label: 'Tür', sheet: 2, column: 2, row: 1 },
];

const SET2_SPEAKING_PICTURE_CARDS: SpeakingPictureCard[] = [
  { label: 'Salz', sheet: 1, column: 0, row: 0 }, { label: 'Glas', sheet: 1, column: 1, row: 0 },
  { label: 'Schlüssel', sheet: 1, column: 2, row: 0 }, { label: 'Lampe', sheet: 1, column: 0, row: 1 },
  { label: 'Teller', sheet: 1, column: 1, row: 1 }, { label: 'Jacke', sheet: 1, column: 2, row: 1 },
  { label: 'Fenster', sheet: 2, column: 0, row: 0 }, { label: 'Handy', sheet: 2, column: 1, row: 0 },
  { label: 'Fahrkarte', sheet: 2, column: 2, row: 0 }, { label: 'Kamera', sheet: 2, column: 0, row: 1 },
  { label: 'Tür', sheet: 2, column: 1, row: 1 }, { label: 'Taxi', sheet: 2, column: 2, row: 1 },
];

const LISTENING_EXAMPLES: Record<string, Record<number, { question: string; options: string[]; answer: number; note: string }>> = {
  'a1-1': {
    1: { question: 'Wann kommt der Mann heute?', options: ['9 Uhr', '10 Uhr', 'morgen um 9 Uhr'], answer: 1, note: 'Das Beispiel hören Sie zweimal.' },
    2: { question: 'Das Café schließt heute um 18 Uhr.', options: ['Richtig', 'Falsch'], answer: 0, note: 'Das Beispiel hören Sie einmal.' },
  },
  'a1-2': {
    1: { question: 'Welche Buslinie fährt zum Zentrum?', options: ['Linie 2', 'Linie 12', 'Linie 20'], answer: 1, note: 'Das Beispiel hören Sie zweimal.' },
    2: { question: 'Der Markt öffnet heute um neun Uhr.', options: ['Richtig', 'Falsch'], answer: 0, note: 'Das Beispiel hören Sie einmal.' },
  },
};

const READING_EXAMPLES: Record<string, Record<number, ReadingExample>> = {
  'a1-1': {
    4: { question: 'Nora schreibt Luis eine persönliche Nachricht.', options: ['Richtig', 'Falsch'], answer: 0 },
    5: {
      question: 'Wo finden Sie Informationen über das Wetter in Deutschland?',
      options: ['A', 'B'],
      answer: 1,
      stimulus: 'Sie möchten wissen: Regnet es morgen in Deutschland?',
      adCopy: 'A — Sommerbühne: Open-Air-Konzert am Samstagabend. Bei Regen findet das Konzert in der Stadthalle statt.\n\nB — DeutschlandWetter: Wetter für ganz Deutschland. Temperaturen, Regen und Sonne für heute und morgen.',
    },
    6: { question: 'Hier muss man leise sein.', options: ['Richtig', 'Falsch'], answer: 0, stimulus: 'BIBLIOTHEK · Bitte leise sprechen.' },
  },
  'a1-2': {
    4: { question: 'Lea schreibt Karim eine persönliche Nachricht.', options: ['Richtig', 'Falsch'], answer: 0 },
    5: {
      question: 'Wo finden Sie Informationen über das Wetter in Österreich?',
      options: ['A', 'B'],
      answer: 0,
      stimulus: 'Sie planen einen Ausflug und möchten wissen: Regnet es morgen?',
      adCopy: 'A — AlpenWetter: Wetter für Österreich. Temperaturen, Regen und Sonne für heute und morgen.\n\nB — Stadtklang: Open-Air-Konzert am Samstag. Bei Regen findet das Konzert in der Stadthalle statt.',
    },
    6: { question: 'Hier darf man heute nicht parken.', options: ['Richtig', 'Falsch'], answer: 0, stimulus: 'PARKPLATZ HEUTE GESCHLOSSEN.' },
  },
};

function mediaFor(mockId: string) {
  if (mockId === 'a1-1') return {
    listening: SET1_LISTENING_PLATES,
    listeningExamples: SET1_LISTENING_EXAMPLE_PLATES,
    readingAds: SET1_READING_AD_PLATES,
    readingExamples: SET1_READING_EXAMPLE_PLATES,
  };
  if (mockId === 'a1-2') return { listening: SET2_LISTENING_PLATES, listeningExamples: SET2_LISTENING_EXAMPLE_PLATES, readingAds: SET2_READING_AD_PLATES, readingExamples: SET2_READING_EXAMPLE_PLATES } as {
    listening: Record<number, Plate>; listeningExamples: Record<number, Plate>;
    readingAds: Record<number, Plate>; readingExamples: Record<number, Plate>;
  };
  const number = Number(mockId.split('-').at(-1));
  const content = GOETHE_A1_SETS_3_TO_8[number];
  const plate = (src: string, alt: string, width: number, height: number): Plate => ({ src, alt, width, height });
  return {
    listening: Object.fromEntries(content.listening1.map((item, index) => [index + 1, plate(`/images/goethe/${mockId}/hoeren-teil1-${String(index + 1).padStart(2, '0')}.png`, `Drei Bildoptionen für Aufgabe ${index + 1}: ${item.options.join(', ')}`, 2172, 724)])),
    listeningExamples: { 1: plate(`/images/goethe/${mockId}/hoeren-teil1-00.png`, `Beispiel mit drei Bildoptionen: ${content.listeningExample.options.join(', ')}`, 2172, 724) },
    readingAds: Object.fromEntries(content.readingAds.map((item, index) => [index + 6, plate(`/images/goethe/${mockId}/lesen-teil2-${String(index + 6).padStart(2, '0')}.png`, `Anzeigen A und B für: ${item.situation}`, 1536, 1024)])),
    readingExamples: { 5: plate(`/images/goethe/${mockId}/lesen-teil2-00.png`, 'Beispielanzeigen A und B zur Wetterinformation', 1536, 1024) },
  };
}

function listeningExamplesFor(mockId: string) {
  const existing = LISTENING_EXAMPLES[mockId];
  if (existing) return existing;
  const content = GOETHE_A1_SETS_3_TO_8[Number(mockId.split('-').at(-1))];
  return {
    1: { question: content.listeningExample.question, options: content.listeningExample.options, answer: content.listeningExample.answer, note: 'Das Beispiel hören Sie zweimal.' },
    2: { question: 'Das Informationsbüro öffnet heute um neun Uhr.', options: ['Richtig', 'Falsch'], answer: 0, note: 'Das Beispiel hören Sie einmal.' },
  };
}

function readingExamplesFor(mockId: string): Record<number, ReadingExample> {
  return READING_EXAMPLES[mockId] ?? {
    4: { question: 'Text A ist eine persönliche Nachricht.', options: ['Richtig', 'Falsch'], answer: 0 },
    5: { question: 'Wo finden Sie Informationen über das Wetter?', options: ['A', 'B'], answer: 0, stimulus: 'Sie möchten wissen: Regnet es morgen?', adCopy: 'A — Wetterblick: Wetter, Temperaturen und Regen für heute und morgen in ganz Deutschland.\n\nB — Konzertgarten: Musik am Samstagabend. Bei Regen findet das Konzert im Saal statt.' },
    6: { question: 'Hier muss man warten.', options: ['Richtig', 'Falsch'], answer: 0, stimulus: 'BITTE HIER WARTEN.' },
  };
}

function normalise(value: string) {
  return value.trim().toLocaleLowerCase('de-DE').replace(/[.,;:!?]+$/g, '').replace(/\s+/g, ' ');
}

function wordCount(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function officialPartNumber(part: number) {
  return part <= 3 ? part : part <= 6 ? part - 3 : part <= 8 ? part - 6 : part - 8;
}

function moduleSections(mock: MockExam, skill: Skill) {
  return mock.sections.filter(section => section.skill === skill);
}

function objectiveQuestions(mock: MockExam, skill: 'listening' | 'reading') {
  return moduleSections(mock, skill).flatMap(section => section.questions.filter(question => question.type === 'mcq') as MCQQuestion[]);
}

function itemNumber(question: MCQQuestion) {
  return Number(question.id.match(/(\d+)$/)?.[1] ?? 0);
}

function formattedOption(question: MCQQuestion, index: number) {
  const letter = String.fromCharCode(65 + index);
  return question.options[index] === letter ? letter : `${letter} · ${question.options[index]}`;
}

function ReadingAdPair({ plate, stimulus }: { plate: Plate; stimulus: string }) {
  const adverts = stimulus.split('\n\n').map((block, index) => {
    const match = block.trim().match(/^([AB])\s+—\s+([^:]+):\s*([\s\S]*)$/);
    return {
      letter: match?.[1] ?? String.fromCharCode(65 + index),
      title: match?.[2] ?? 'Anzeige',
      body: match?.[3] ?? block.trim(),
    };
  });

  return (
    <div className={styles.readingAdGrid} aria-label={plate.alt}>
      {adverts.map((advert, index) => (
        <article key={`${advert.letter}-${advert.title}`} className={styles.readingAdCard}>
          <div className={styles.readingAdChrome}>
            <span>{advert.letter}</span>
            <i>Anzeige · Internetseite</i>
          </div>
          <div className={styles.readingAdThumb} aria-hidden="true">
            <Image
              src={plate.src}
              alt=""
              width={plate.width}
              height={plate.height}
              sizes="(max-width: 720px) 100vw, 360px"
              style={{ left: index === 0 ? '0' : '-100%' }}
            />
          </div>
          <div className={styles.readingAdCopy}>
            <strong>{advert.title}</strong>
            <p>{advert.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ObjectiveItem({ question, number, value, onChange, showResult, visualPlate, readingAdPlate, renderReadingAdCards, hideContextLabel }: {
  question: MCQQuestion;
  number: number;
  value?: number;
  onChange: (value: number) => void;
  showResult?: boolean;
  visualPlate?: Plate;
  readingAdPlate?: Plate;
  renderReadingAdCards?: boolean;
  hideContextLabel?: boolean;
}) {
  return (
    <fieldset className={styles.question}>
      <legend><span className={styles.questionNumber}>{number}</span>{question.text}</legend>
      {visualPlate && <Image className={styles.answerPlate} src={visualPlate.src} alt={visualPlate.alt} width={visualPlate.width} height={visualPlate.height} sizes="(max-width: 720px) 100vw, 900px" />}
      {question.stimulusLabel && !hideContextLabel && <p className={styles.contextLabel}>{question.stimulusLabel}</p>}
      {readingAdPlate && question.stimulus && renderReadingAdCards && <ReadingAdPair plate={readingAdPlate} stimulus={question.stimulus} />}
      {readingAdPlate && !renderReadingAdCards && <Image className={styles.readingAdPlate} src={readingAdPlate.src} alt={readingAdPlate.alt} width={readingAdPlate.width} height={readingAdPlate.height} sizes="(max-width: 720px) 100vw, 900px" />}
      {question.stimulus && readingAdPlate && !renderReadingAdCards && <p className={styles.srOnly}>{question.stimulus}</p>}
      {question.stimulus && !readingAdPlate && (
        <div className={question.stimulusStyle === 'sign' ? styles.sign : styles.adPair}>
          {question.stimulus.split('\n\n').map((block, index) => <div key={index}>{block}</div>)}
        </div>
      )}
      <div className={`${styles.options} ${visualPlate ? styles.visualOptions : ''}`}>
        {question.options.map((option, index) => {
          const correct = showResult && index === question.answer;
          const wrong = showResult && value === index && index !== question.answer;
          return (
            <label key={option} className={`${styles.option} ${value === index ? styles.selected : ''} ${correct ? styles.correct : ''} ${wrong ? styles.wrong : ''}`}>
              <input
                type="radio"
                name={question.id}
                checked={value === index}
                onChange={() => onChange(index)}
                disabled={showResult}
              />
              <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function ResolvedExample({ question, options, answer, note, stimulus, adCopy, visualPlate }: {
  question: string;
  options: string[];
  answer: number;
  note?: string;
  stimulus?: string;
  adCopy?: string;
  visualPlate?: { src: string; alt: string; width: number; height: number };
}) {
  return (
    <aside className={styles.example} aria-label="Beispielaufgabe">
      <div className={styles.exampleLabel}>Beispiel · gelöst</div>
      <p className={styles.exampleQuestion}><span className={styles.questionNumber}>0</span>{question}</p>
      {stimulus && <p className={styles.exampleStimulus}>{stimulus}</p>}
      {visualPlate && adCopy ? <ReadingAdPair plate={visualPlate} stimulus={adCopy} /> : visualPlate && <Image className={`${styles.examplePlate} ${visualPlate.width / visualPlate.height > 2 ? styles.examplePlateWide : ''}`} src={visualPlate.src} alt={visualPlate.alt} width={visualPlate.width} height={visualPlate.height} sizes="(max-width: 720px) 100vw, 680px" />}
      <div className={styles.exampleOptions}>
        {options.map((option, index) => (
          <label key={option} className={`${styles.option} ${index === answer ? styles.exampleCorrect : ''}`}>
            <input type="radio" checked={index === answer} readOnly disabled />
            <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
            <span>{option}</span>
          </label>
        ))}
      </div>
      {note && <small>{note}</small>}
    </aside>
  );
}

function SectionShell({ section, children }: { section: MockSection; children: React.ReactNode }) {
  const officialPart = officialPartNumber(section.part);
  return (
    <section className={styles.section} aria-labelledby={`goethe-section-${section.part}`}>
      <header className={styles.sectionHeader}>
        <span>Teil {officialPart}</span>
        <h2 id={`goethe-section-${section.part}`}>{section.title.replace(/^.*?:\s*/, '')}</h2>
        <p>{section.instructions}</p>
      </header>
      {children}
    </section>
  );
}

function ListeningModule({ mock, answers, setAnswer, mode, playedParts, setPlayedParts, showResult }: {
  mock: MockExam;
  answers: Record<string, number>;
  setAnswer: (id: string, answer: number) => void;
  mode: DeliveryMode;
  playedParts: Set<number>;
  setPlayedParts: (next: Set<number>) => void;
  showResult?: boolean;
}) {
  const media = mediaFor(mock.id);
  const examples = listeningExamplesFor(mock.id);
  return <>{moduleSections(mock, 'listening').map(section => (
    <SectionShell key={section.part} section={section}>
      {section.audioUrl && !showResult && (
        <div className={styles.audioCard}>
          <div>
            <strong>Audio Teil {section.part}</strong>
            <span>{section.part === 2 ? '1 reproducción · señal acústica' : '2 reproducciones · señal entre escuchas'}</span>
          </div>
          <AudioPlayer
            src={section.audioUrl}
            label={`Hören Teil ${section.part}`}
            replayable={mode === 'class'}
            alreadyPlayed={mode === 'simulation' && playedParts.has(section.part)}
            onPlaybackStart={() => setPlayedParts(new Set([...playedParts, section.part]))}
          />
        </div>
      )}
      {!section.audioUrl && !showResult && (
        <div className={styles.audioCard}>
          <div><strong>Audio Teil {section.part}</strong><span>Guion listo · producción y control de calidad pendientes</span></div>
        </div>
      )}
      {examples[section.part] && (
        <ResolvedExample {...examples[section.part]} visualPlate={media.listeningExamples[section.part]} />
      )}
      <div className={styles.questionList}>
        {(section.questions.filter(question => question.type === 'mcq') as MCQQuestion[]).map(question => <ObjectiveItem key={question.id} question={question} number={itemNumber(question)} value={answers[question.id]} onChange={value => setAnswer(question.id, value)} showResult={showResult} visualPlate={section.part === 1 ? media.listening[itemNumber(question)] : undefined} />)}
      </div>
    </SectionShell>
  ))}</>;
}

function ReadingModule({ mock, answers, setAnswer, showResult }: {
  mock: MockExam;
  answers: Record<string, number>;
  setAnswer: (id: string, answer: number) => void;
  showResult?: boolean;
}) {
  const media = mediaFor(mock.id);
  const examples = readingExamplesFor(mock.id);
  return <>{moduleSections(mock, 'reading').map(section => {
    const questions = section.questions.filter(question => question.type === 'mcq') as MCQQuestion[];
    if (section.part === 4 && section.passage) {
      const documents = section.passage.split('\n\nTEXT B').map((document, index) => ({
        label: index === 0 ? 'Text A' : 'Text B',
        body: index === 0 ? document.replace(/^TEXT A[^\n]*\n\n/, '') : document.replace(/^\s*—[^\n]*\n\n/, ''),
      }));
      return (
        <SectionShell key={section.part} section={section}>
          <div className={styles.readingSequence}>
            {documents.map((document, index) => (
              <section key={document.label} className={styles.readingBlock} aria-labelledby={`reading-document-${index}`}>
                <article className={styles.message}>
                  <span id={`reading-document-${index}`}>{document.label}</span>
                  <pre>{document.body}</pre>
                </article>
                {index === 0 && examples[section.part] && <ResolvedExample {...examples[section.part]} />}
                <div className={styles.questionList}>
                  {questions.filter(question => question.stimulusLabel === document.label).map(question => <ObjectiveItem key={question.id} question={question} number={itemNumber(question)} value={answers[question.id]} onChange={value => setAnswer(question.id, value)} showResult={showResult} hideContextLabel />)}
                </div>
              </section>
            ))}
          </div>
        </SectionShell>
      );
    }
    return (
      <SectionShell key={section.part} section={section}>
        {examples[section.part] && <ResolvedExample {...examples[section.part]} visualPlate={media.readingExamples[section.part]} />}
        <div className={styles.questionList}>
          {questions.map(question => <ObjectiveItem key={question.id} question={question} number={itemNumber(question)} value={answers[question.id]} onChange={value => setAnswer(question.id, value)} showResult={showResult} readingAdPlate={section.part === 5 ? media.readingAds[itemNumber(question)] : undefined} renderReadingAdCards={/^a1-[1-7]$/.test(mock.id)} />)}
        </div>
      </SectionShell>
    );
  })}</>;
}

function GoetheForm({ question, values, onChange, showResult }: {
  question: FormGroupQuestion;
  values: Record<number, string>;
  onChange: (number: number, value: string) => void;
  showResult?: boolean;
}) {
  const lines = question.template.split('\n');
  const [exampleLabel, exampleValue = ''] = (question.example ?? '').split(/:\s*/, 2);
  return (
    <div className={styles.formTask}>
      <div className={styles.formSource}><strong>Situation</strong><p>{question.groupLabel}</p></div>
      <div className={styles.paperForm}>
        <h3>{question.title}</h3>
        <div className={`${styles.formStaticRow} ${styles.formExample}`}><span>{exampleLabel}</span><strong>{exampleValue}</strong><em>0 · Beispiel</em></div>
        {lines.map(line => {
          const match = line.match(/^(.+?):\s*(.*?)\{\{(\d+)\}\}(.*)$/);
          if (!match) {
            const [label, ...valueParts] = line.split(':');
            return <div key={line} className={styles.formStaticRow}><span>{label}</span><strong>{valueParts.join(':').trim()}</strong></div>;
          }
          const number = Number(match[3]);
          const blank = question.blanks.find(item => item.num === number);
          const correct = showResult && blank?.answers.some(answer => normalise(answer) === normalise(values[number] ?? ''));
          return (
            <label key={number} className={styles.formRow}>
              <span>{match[1]}</span>
              <span className={styles.blankNumber}>{number}</span>
              <span className={styles.formInputValue}>{match[2] && <b>{match[2]}</b>}<input value={values[number] ?? ''} onChange={event => onChange(number, event.target.value)} disabled={showResult} className={correct ? styles.inputCorrect : ''} />{match[4] && <b>{match[4]}</b>}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function WritingModule({ mock, formValues, onFormChange, textValue, onTextChange, showResult }: {
  mock: MockExam;
  formValues: Record<number, string>;
  onFormChange: (number: number, value: string) => void;
  textValue: string;
  onTextChange: (value: string) => void;
  showResult?: boolean;
}) {
  return <>{moduleSections(mock, 'writing').map(section => {
    const form = section.questions.find(question => question.type === 'formgroup') as FormGroupQuestion | undefined;
    const writing = section.questions.find(question => question.type === 'write') as WriteQuestion | undefined;
    return (
      <SectionShell key={section.part} section={section}>
        {form && <GoetheForm question={form} values={formValues} onChange={onFormChange} showResult={showResult} />}
        {writing && (
          <div className={styles.writingTask}>
            <div className={styles.writingPrompt}>
              <strong>{writing.stimulusLabel}</strong>
              <p>{writing.stimulus}</p>
              <pre>{writing.text}</pre>
            </div>
            <label htmlFor={writing.id}>Ihre Nachricht</label>
            <textarea id={writing.id} value={textValue} onChange={event => onTextChange(event.target.value)} disabled={showResult} rows={9} />
            <p className={`${styles.wordCount} ${wordCount(textValue) >= 30 ? styles.wordCountReady : ''}`}>{wordCount(textValue)} Wörter · Ziel: circa 30</p>
          </div>
        )}
      </SectionShell>
    );
  })}</>;
}

function cardGroups(question: SpeakQuestion) {
  return (question.cueCard ?? '').split('\n\n').map(group => {
    const [title, cards = ''] = group.split('\n');
    return { title, cards: cards.split(' · ') };
  });
}

function shuffleIndices(length: number) {
  const indices = Array.from({ length }, (_, index) => index);
  for (let index = indices.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [indices[index], indices[swapIndex]] = [indices[swapIndex], indices[index]];
  }
  return indices;
}

function SpeakingCardDeck({ part, groups, mode, mockId, currentIndex, order, onIndexChange, onOrderChange }: {
  part: number;
  groups: Array<{ title: string; cards: string[] }>;
  mode: DeliveryMode;
  mockId: string;
  currentIndex: number;
  order: number[];
  onIndexChange: (index: number) => void;
  onOrderChange: (order: number[]) => void;
}) {
  const wordCards = groups.flatMap(group => group.cards.map(label => ({ kind: 'word' as const, label, theme: group.title })));
  const configuredPictures = GOETHE_A1_SETS_3_TO_8[Number(mockId.split('-').at(-1))]?.speaking3
    .flatMap((group, groupIndex) => group.map((label, index) => ({ label, sheet: groupIndex + 1, column: index % 3, row: Math.floor(index / 3) })));
  const pictureCardSource = mockId === 'a1-1' ? SET1_SPEAKING_PICTURE_CARDS : mockId === 'a1-2' ? SET2_SPEAKING_PICTURE_CARDS : configuredPictures;
  const pictureCards = pictureCardSource.map(card => ({ kind: 'picture' as const, ...card }));
  const cards = part === 11 ? pictureCards : wordCards;
  const orderedCards = order.length === cards.length ? order.map(index => cards[index]) : cards;
  const current = currentIndex >= 0 ? orderedCards[currentIndex] : undefined;
  const finished = currentIndex === cards.length - 1;

  return (
    <div className={styles.cardDeck} aria-label={`Verdeckter Kartenstapel für Sprechen Teil ${part - 8}`}>
      <div className={styles.cardStage} aria-live="polite">
        {!current && <div className={styles.coveredCard}><span>?</span><strong>Karte verdeckt</strong></div>}
        {current?.kind === 'word' && <div className={styles.currentWordCard}><span>{current.theme}</span><strong>{current.label}</strong></div>}
        {current?.kind === 'picture' && (
          <div className={styles.currentPictureCard} aria-label={`Bildkarte: ${current.label}`}>
            {current.sheet !== undefined ? <Image
              src={`/images/goethe/${mockId}/sprechen-teil3-karten-0${current.sheet}.png`}
              alt={`Bildkarte: ${current.label}`}
              width={1536}
              height={1024}
              sizes="(max-width: 720px) 80vw, 420px"
              style={{ width: '300%', height: '200%', maxWidth: 'none', left: `-${(current.column ?? 0) * 100}%`, top: `-${(current.row ?? 0) * 100}%` }}
            /> : <strong>{current.label}</strong>}
          </div>
        )}
      </div>
      <div className={styles.deckControls}>
        <p>{current ? `Karte ${currentIndex + 1} von ${cards.length}` : `${cards.length} Karten · einzeln aufdecken`}</p>
        {!finished && <button type="button" className={styles.primary} onClick={() => { if (currentIndex < 0 && order.length !== cards.length) onOrderChange(shuffleIndices(cards.length)); onIndexChange(currentIndex + 1); }}>{current ? 'Nächste Karte' : 'Karte ziehen'}</button>}
        {finished && mode === 'class' && <button type="button" className={styles.secondary} onClick={() => { onIndexChange(-1); onOrderChange([]); }}>Stapel neu mischen</button>}
        {finished && mode === 'simulation' && <span>Stapel beendet</span>}
      </div>
    </div>
  );
}

function SpeakingModule({ mock, recordings, onRecording, mode, cardProgress, cardOrders, onCardProgress, onCardOrder }: {
  mock: MockExam;
  recordings: Record<string, IeltsSpeakingRecording | undefined>;
  onRecording: (id: string, recording: IeltsSpeakingRecording | undefined) => void;
  mode: DeliveryMode;
  cardProgress: Record<number, number>;
  cardOrders: Record<number, number[]>;
  onCardProgress: (part: number, index: number) => void;
  onCardOrder: (part: number, order: number[]) => void;
}) {
  return <>{moduleSections(mock, 'speaking').map(section => {
    const question = section.questions[0] as SpeakQuestion;
    const groups = cardGroups(question);
    return (
      <SectionShell key={section.part} section={section}>
        <div className={styles.speakingTask}>
          <pre className={styles.speakingPrompt}>{question.text}</pre>
          {question.cueCard && <SpeakingCardDeck part={section.part} groups={groups} mode={mode} mockId={mock.id} currentIndex={cardProgress[section.part] ?? -1} order={cardOrders[section.part] ?? []} onIndexChange={index => onCardProgress(section.part, index)} onOrderChange={order => onCardOrder(section.part, order)} />}
          <div className={styles.recorder}>
            <p>Grabación privada para la evaluación final</p>
            <IELTSSpeakingRecorder questionId={question.id} recording={recordings[question.id]} maxSeconds={section.part === 9 ? 180 : 300} onChange={recording => onRecording(question.id, recording)} />
          </div>
        </div>
      </SectionShell>
    );
  })}</>;
}

function transcriptEvidence(section: MockSection, number: number) {
  const marker = `Nummer ${number}\n`;
  const block = section.transcript?.split(/\n\n/).find(item => item.startsWith(marker));
  return block?.slice(marker.length).trim();
}

function ObjectiveReview({ mock, skill, answers, showListeningEvidence = false }: {
  mock: MockExam;
  skill: 'listening' | 'reading';
  answers: Record<string, number>;
  showListeningEvidence?: boolean;
}) {
  return (
    <section className={styles.reviewGroup} aria-labelledby={`review-${skill}`}>
      <header className={styles.reviewGroupHeader}>
        <div><span>Automatische Korrektur</span><h3 id={`review-${skill}`}>{skill === 'listening' ? 'Hören' : 'Lesen'}</h3></div>
        <strong>{objectiveQuestions(mock, skill).filter(question => answers[question.id] === question.answer).length}/15</strong>
      </header>
      <div className={styles.reviewItems}>
        {moduleSections(mock, skill).flatMap(section => (section.questions.filter(question => question.type === 'mcq') as MCQQuestion[]).map(question => {
          const selected = answers[question.id];
          const answered = selected !== undefined;
          const correct = selected === question.answer;
          const number = itemNumber(question);
          const listeningEvidence = skill === 'listening' && showListeningEvidence ? transcriptEvidence(section, number) : undefined;
          return (
            <article key={question.id} className={`${styles.reviewItem} ${correct ? styles.reviewItemCorrect : styles.reviewItemWrong}`}>
              <div className={styles.reviewItemTop}>
                <span className={styles.reviewNumber}>{number}</span>
                <span>Teil {officialPartNumber(section.part)}</span>
                <strong>{correct ? 'Richtig · 1 Punkt' : answered ? 'Falsch · 0 Punkte' : 'Offen · 0 Punkte'}</strong>
              </div>
              <p>{question.text}</p>
              <dl className={styles.answerComparison}>
                <div><dt>Ihre Antwort</dt><dd>{selected === undefined ? 'Keine Antwort' : formattedOption(question, selected)}</dd></div>
                <div><dt>Richtige Antwort</dt><dd>{formattedOption(question, question.answer)}</dd></div>
              </dl>
              {skill === 'reading' && question.stimulus && <details className={styles.reviewEvidence}><summary>Textbeleg</summary><pre>{question.stimulus}</pre></details>}
              {listeningEvidence && <details className={styles.reviewEvidence}><summary>Audio-Beleg · transcripción</summary><pre>{listeningEvidence}</pre></details>}
            </article>
          );
        }))}
      </div>
    </section>
  );
}

function FormReview({ question, values }: { question: FormGroupQuestion; values: Record<number, string> }) {
  const correctCount = question.blanks.filter(blank => blank.answers.some(answer => normalise(answer) === normalise(values[blank.num] ?? ''))).length;
  return (
    <section className={styles.reviewGroup} aria-labelledby="review-form">
      <header className={styles.reviewGroupHeader}>
        <div><span>Automatische Korrektur</span><h3 id="review-form">Schreiben · Teil 1</h3></div>
        <strong>{correctCount}/5</strong>
      </header>
      <div className={styles.reviewItems}>
        {question.blanks.map(blank => {
          const value = values[blank.num] ?? '';
          const correct = blank.answers.some(answer => normalise(answer) === normalise(value));
          return (
            <article key={blank.num} className={`${styles.reviewItem} ${correct ? styles.reviewItemCorrect : styles.reviewItemWrong}`}>
              <div className={styles.reviewItemTop}>
                <span className={styles.reviewNumber}>{blank.num}</span>
                <span>Formular</span>
                <strong>{correct ? 'Richtig · 1 Punkt' : 'Falsch · 0 Punkte'}</strong>
              </div>
              <dl className={styles.answerComparison}>
                <div><dt>Ihre Antwort</dt><dd>{value || 'Keine Antwort'}</dd></div>
                <div><dt>Akzeptierte Antwort</dt><dd>{blank.answers[0]}</dd></div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function GoetheA1PracticeClient({ exam, mock, practiceSkill }: { exam: Exam; mock: MockExam; practiceSkill?: Skill }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const mode: DeliveryMode = practiceSkill ? 'class' : 'simulation';
  const [activeSkill, setActiveSkill] = useState<Skill>(practiceSkill ?? 'listening');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [formValues, setFormValues] = useState<Record<number, string>>({});
  const [writing, setWriting] = useState('');
  const [recordings, setRecordings] = useState<Record<string, IeltsSpeakingRecording | undefined>>({});
  const [playedParts, setPlayedParts] = useState(new Set<number>());
  const [receipt, setReceipt] = useState<GoetheSubmissionReceipt | null>(null);
  const [resultStatus, setResultStatus] = useState<GoetheResultStatus | null>(null);
  const [speakingCardProgress, setSpeakingCardProgress] = useState<Record<number, number>>({});
  const [speakingCardOrders, setSpeakingCardOrders] = useState<Record<number, number[]>>({});
  const submissionReady = /^a1-[1-7]$/.test(mock.id);
  const setNumber = mock.id.split('-').at(-1) ?? '1';

  const listeningQuestions = useMemo(() => objectiveQuestions(mock, 'listening'), [mock]);
  const readingQuestions = useMemo(() => objectiveQuestions(mock, 'reading'), [mock]);
  const correctFor = (questions: MCQQuestion[]) => questions.filter(question => answers[question.id] === question.answer).length;
  const listeningCorrect = correctFor(listeningQuestions);
  const readingCorrect = correctFor(readingQuestions);
  const formQuestion = moduleSections(mock, 'writing').flatMap(section => section.questions).find(question => question.type === 'formgroup') as FormGroupQuestion;
  const formCorrect = formQuestion.blanks.filter(blank => blank.answers.some(answer => normalise(answer) === normalise(formValues[blank.num] ?? ''))).length;
  const writingRaw = formCorrect;
  const scaled = {
    listening: formatGoetheModule(listeningCorrect),
    reading: formatGoetheModule(readingCorrect),
    writing: formatGoetheModule(writingRaw),
  };
  const rawTotal = receipt?.automatic.automaticRaw ?? (listeningCorrect + readingCorrect + formCorrect);
  const totalScore = resultStatus?.status === 'reviewed' ? resultStatus.totalScore ?? 0 : receipt?.automatic.automaticScaled ?? 0;
  const objectiveAnswered = [...listeningQuestions, ...readingQuestions].filter(question => answers[question.id] !== undefined).length;
  const listeningMissing = listeningQuestions.filter(question => answers[question.id] === undefined).length;
  const readingMissing = readingQuestions.filter(question => answers[question.id] === undefined).length;
  const formMissing = formQuestion.blanks.filter(blank => !formValues[blank.num]?.trim()).length;
  const visibleSkills = practiceSkill ? SKILLS.filter(skill => skill.id === practiceSkill) : SKILLS;
  const activeSkillIndex = visibleSkills.findIndex(skill => skill.id === activeSkill);
  const activeSkillMeta = visibleSkills[activeSkillIndex];
  const nextSkill = visibleSkills[activeSkillIndex + 1];

  useEffect(() => {
    if (phase !== 'results' || !receipt || resultStatus?.status === 'reviewed') return
    let cancelled = false
    async function refreshResult() {
      try {
        const response = await fetch(`/api/goethe/${encodeURIComponent(mock.id)}/submissions?submissionId=${encodeURIComponent(receipt!.submissionId)}&token=${encodeURIComponent(receipt!.completionToken)}`)
        if (!response.ok) return
        const next = await response.json() as GoetheResultStatus
        if (!cancelled && next.ok) setResultStatus(next)
      } catch {}
    }
    void refreshResult()
    const interval = window.setInterval(refreshResult, 15_000)
    return () => { cancelled = true; window.clearInterval(interval) }
  }, [mock.id, phase, receipt, resultStatus?.status]);

  function advanceExam() {
    if (practiceSkill) {
      setPhase('practice-results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!nextSkill) {
      setPhase('submit');
    } else {
      setActiveSkill(nextSkill.id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function restart() {
    setPhase('intro'); setActiveSkill(practiceSkill ?? 'listening'); setAnswers({}); setFormValues({}); setWriting(''); setRecordings({}); setPlayedParts(new Set()); setReceipt(null); setResultStatus(null); setSpeakingCardProgress({}); setSpeakingCardOrders({});
  }

  return (
    <div className={styles.root}>
      <div className={styles.screen}>
        {phase === 'intro' && (
          <main className={styles.intro}>
            <div className={styles.introCard}>
              <div className={styles.brand}><span>WELEARN</span><span>DEUTSCH A1</span></div>
              <p className={styles.eyebrow}>Goethe-Zertifikat A1 · {practiceSkill ? 'Übungsmodus' : 'Prüfungssimulation'}</p>
              <h1>{mock.title}{practiceSkill ? ` · ${activeSkillMeta.label}` : ''}</h1>
              <p className={styles.lead}>{practiceSkill ? `Práctica independiente de ${activeSkillMeta.label}, con la estructura y el tiempo del módulo A1.` : 'Simulacro completo con las cuatro destrezas, 80 minutos y resultado sobre 100 puntos.'}</p>
              <div className={styles.introStats}>{practiceSkill ? <><div><strong>1</strong><span>Fertigkeit</span></div><div><strong>{activeSkillMeta.minutes}</strong><span>Minuten</span></div><div><strong>{activeSkillMeta.points}</strong><span>Punkte</span></div></> : <><div><strong>4</strong><span>Prüfungsteile</span></div><div><strong>60</strong><span>Rohpunkte</span></div><div><strong>60</strong><span>zum Bestehen</span></div></>}</div>
              <div className={styles.moduleGrid}>{visibleSkills.map(skill => <article key={skill.id}><div><strong>{skill.label}</strong><small>{skill.minutes} Minuten</small></div><span>{skill.points} P.</span></article>)}</div>
              <div className={styles.introNotice}><strong>Antes de empezar</strong><p>{practiceSkill ? 'En práctica puedes repetir el audio y recibir retroalimentación al terminar este módulo.' : 'El audio solo puede iniciarse una vez por parte. Las repeticiones reglamentarias ya están incluidas dentro de cada pista.'}</p></div>
              <div className={styles.introActions}><button className={styles.primary} onClick={() => setPhase('exam')}>{practiceSkill ? 'Empezar práctica' : 'Empezar examen'}</button></div>
              <p className={styles.disclaimer}>Contenido original de WeLearn alineado con la arquitectura pública A1. No es un examen oficial ni está afiliado al Goethe-Institut.</p>
              <Link className={styles.backLink} href={practiceSkill ? '/practica/goethe' : `/examenes/${exam.slug}`}>← Volver a Goethe</Link>
            </div>
          </main>
        )}

        {phase === 'exam' && (
          <>
            <header className={styles.topbar}>
              <div><span>WELEARN · A1</span><strong>{practiceSkill ? `Práctica ${activeSkillMeta.label}` : `Simulacro ${setNumber}`}</strong></div>
              <div className={styles.topbarStatus}><span>Bloque {activeSkillIndex + 1} de {visibleSkills.length}{practiceSkill ? '' : ` · ${objectiveAnswered}/30 objetivas`}</span><Timer totalSecs={(practiceSkill ? activeSkillMeta.minutes : 80) * 60} onExpire={() => setPhase(practiceSkill ? 'practice-results' : 'submit')} /></div>
            </header>
            <ol className={styles.tabs} aria-label="Progreso del examen">{visibleSkills.map((skill, index) => <li key={skill.id} className={index < activeSkillIndex ? styles.tabComplete : activeSkill === skill.id ? styles.tabActive : styles.tabPending} aria-current={activeSkill === skill.id ? 'step' : undefined}><span><b>{index + 1}</b>{skill.label}</span><small>{index < activeSkillIndex ? 'Cerrado' : activeSkill === skill.id ? 'En curso' : `${skill.minutes} min`}</small></li>)}</ol>
            <main className={styles.exam}>
              <>
                  {activeSkill === 'listening' && <ListeningModule mock={mock} answers={answers} setAnswer={(id, answer) => setAnswers(previous => ({ ...previous, [id]: answer }))} mode={mode} playedParts={playedParts} setPlayedParts={setPlayedParts} />}
                  {activeSkill === 'reading' && <ReadingModule mock={mock} answers={answers} setAnswer={(id, answer) => setAnswers(previous => ({ ...previous, [id]: answer }))} />}
                  {activeSkill === 'writing' && <WritingModule mock={mock} formValues={formValues} onFormChange={(number, value) => setFormValues(previous => ({ ...previous, [number]: value }))} textValue={writing} onTextChange={setWriting} />}
                  {activeSkill === 'speaking' && <SpeakingModule mock={mock} recordings={recordings} onRecording={(id, recording) => setRecordings(previous => ({ ...previous, [id]: recording }))} mode={mode} cardProgress={speakingCardProgress} cardOrders={speakingCardOrders} onCardProgress={(part, index) => setSpeakingCardProgress(previous => ({ ...previous, [part]: index }))} onCardOrder={(part, order) => setSpeakingCardOrders(previous => ({ ...previous, [part]: order }))} />}
                  <div className={styles.examFooter}>
                    <div><span>Bloque {activeSkillIndex + 1} de {visibleSkills.length}</span><strong>{activeSkillMeta.label}</strong><small>{practiceSkill ? 'Al terminar verás la retroalimentación de este módulo.' : 'Al continuar, este bloque queda cerrado.'}</small></div>
                    <button className={styles.primary} onClick={advanceExam}>{nextSkill ? `Cerrar ${activeSkillMeta.label} y continuar a ${nextSkill.label}` : practiceSkill ? 'Terminar práctica' : 'Finalizar examen'}</button>
                  </div>
              </>
            </main>
          </>
        )}

        {phase === 'submit' && (
          <main className={styles.results}>
            <header className={styles.resultsHeader}><Link href={`/examenes/${exam.slug}`}>WELEARN · DEUTSCH A1</Link><span>Prüfung abgeben</span></header>
            <GoetheSubmission
              mockId={mock.id}
              answers={answers}
              formValues={formValues}
              writing={writing}
              cardOrders={speakingCardOrders}
              recordings={recordings}
              objectiveMissing={listeningMissing + readingMissing}
              formMissing={formMissing}
              onBack={() => { setPhase('exam'); setActiveSkill('speaking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onSuccess={nextReceipt => { setReceipt(nextReceipt); setResultStatus(null); setPhase('results'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          </main>
        )}

        {phase === 'results' && (
          <main className={styles.results}>
            <header className={styles.resultsHeader}><Link href={`/examenes/${exam.slug}`}>WELEARN · DEUTSCH A1</Link><span>Ergebnisbericht</span></header>
            <div className={styles.resultHero}>
              <p>{resultStatus?.status === 'reviewed' ? 'Gesamtergebnis' : 'Bestätigtes Zwischenergebnis'}</p>
              <div><strong>{totalScore}</strong><span>/ 100 Punkte</span></div>
              {resultStatus?.status === 'reviewed' ? <b className={(resultStatus.totalScore ?? 0) >= 60 ? styles.pass : styles.fail}>{resultStatus.totalLabel}</b> : <small>Este es el puntaje automático confirmado. Schreiben Teil 2 y Sprechen están pendientes de revisión administrativa.</small>}
              <em>{resultStatus?.status === 'reviewed' ? 'Rúbrica cerrada · actualización automática confirmada' : `${rawTotal}/60 Rohpunkte confirmados · Faktor 1,66 · resultado final pendiente`}</em>
            </div>
            <div className={styles.scoreGrid}>
              <article><span>Hören</span><strong>{scaled.listening}</strong><small>{listeningCorrect}/15 Rohpunkte · max. 25 P.</small></article>
              <article><span>Lesen</span><strong>{scaled.reading}</strong><small>{readingCorrect}/15 Rohpunkte · max. 25 P.</small></article>
              <article><span>Schreiben</span><strong>{resultStatus?.status === 'reviewed' ? resultStatus.skills.find(skill => skill.skill === 'Schreiben')?.label.split('·').pop()?.trim() ?? 'Listo' : `${scaled.writing}+`}</strong><small>{resultStatus?.status === 'reviewed' ? resultStatus.skills.find(skill => skill.skill === 'Schreiben')?.label : `${formCorrect}/5 confirmados · Teil 2 pendiente`}</small></article>
              <article><span>Sprechen</span><strong>{resultStatus?.status === 'reviewed' ? resultStatus.skills.find(skill => skill.skill === 'Sprechen')?.label.split('·').pop()?.trim() ?? 'Listo' : '—'}</strong><small>{resultStatus?.status === 'reviewed' ? resultStatus.skills.find(skill => skill.skill === 'Sprechen')?.label : '3 audios enviados · revisión pendiente'}</small></article>
            </div>

            <section className={styles.resultNotice}><strong>Entrega recibida</strong><p>Identificador: <code>{receipt?.submissionId}</code>. El administrador puede ver cada respuesta, el texto y los audios privados para cerrar la rúbrica y el resultado Goethe sobre 100.</p></section>
            {resultStatus?.status === 'reviewed' && resultStatus.feedback && <section className={styles.resultFeedback}><strong>Feedback del revisor</strong><p>{resultStatus.feedback}</p></section>}

            <section className={styles.review} aria-labelledby="answer-review-title">
              <header><p>Antwort für Antwort</p><h2 id="answer-review-title">Revisión detallada</h2><span>Cada respuesta muestra el punto obtenido, la opción marcada y la solución correcta.</span></header>
              <ObjectiveReview mock={mock} skill="listening" answers={answers} />
              <ObjectiveReview mock={mock} skill="reading" answers={answers} />
              <FormReview question={formQuestion} values={formValues} />
            </section>
            <div className={styles.introActions}><button className={styles.primary} onClick={restart}>Intentar de nuevo</button></div>
          </main>
        )}

        {phase === 'practice-results' && practiceSkill && (
          <main className={styles.results}>
            <header className={styles.resultsHeader}><Link href="/practica/goethe">WELEARN · DEUTSCH A1</Link><span>Übung abgeschlossen</span></header>
            <div className={styles.resultHero}>
              <p>Práctica independiente · {activeSkillMeta.label}</p>
              {(practiceSkill === 'listening' || practiceSkill === 'reading') ? <div><strong>{practiceSkill === 'listening' ? listeningCorrect : readingCorrect}</strong><span>/ 15 Rohpunkte</span></div> : <div><strong>✓</strong><span>Módulo terminado</span></div>}
              <em>{practiceSkill === 'listening' ? `${scaled.listening}/25 puntos de módulo` : practiceSkill === 'reading' ? `${scaled.reading}/25 puntos de módulo` : practiceSkill === 'writing' ? `${formCorrect}/5 respuestas del formulario correctas · texto abierto para revisión guiada` : `${Object.values(recordings).filter(Boolean).length}/3 grabaciones realizadas`}</em>
            </div>
            <section className={styles.review} aria-labelledby="practice-review-title">
              <header><p>Modo guiado</p><h2 id="practice-review-title">Retroalimentación del módulo</h2><span>Esta revisión pertenece a la zona de práctica y no genera un resultado oficial del simulacro completo.</span></header>
              {practiceSkill === 'listening' && <ObjectiveReview mock={mock} skill="listening" answers={answers} showListeningEvidence />}
              {practiceSkill === 'reading' && <ObjectiveReview mock={mock} skill="reading" answers={answers} />}
              {practiceSkill === 'writing' && <FormReview question={formQuestion} values={formValues} />}
              {practiceSkill === 'speaking' && <section className={styles.resultNotice}><strong>Práctica oral guardada en esta sesión</strong><p>Escucha tus grabaciones antes de repetir el módulo. La evaluación con rúbrica y profesor permanece en el simulacro completo.</p></section>}
            </section>
            <div className={styles.introActions}><button className={styles.primary} onClick={restart}>Practicar de nuevo</button><Link className={styles.secondary} href="/practica/goethe">Elegir otra destreza</Link></div>
          </main>
        )}
      </div>
    </div>
  );
}
