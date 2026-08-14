import 'server-only';

import { TOEFL_READING_SET1 } from '@/data/toefl/reading-set-1';
import { TOEFL_READING_SET1_SCORING } from '@/server/toefl/reading-set-1';
import {
  TOEFL_READING_SETS_2_TO_5,
  type ToeflReadingExpansionObject,
} from '@/data/toefl/reading-sets-2-5';
import type { ToeflReadingScoringItem } from '@/lib/toefl/reading-contract';

const ANSWER_KEY: Readonly<Record<string, readonly string[]>> = {
  'item:t2-r-ap1-v2': ['item:t2-r-ap1-v2:option-b'],
  'item:t2-r-ap2-v2': ['item:t2-r-ap2-v2:option-c'],
  'item:t2-r-ap3-v2': ['item:t2-r-ap3-v2:option-d'],
  'item:t2-r-ap4-v2': ['item:t2-r-ap4-v2:option-a'],
  'item:t2-r-ap5-v2': ['item:t2-r-ap5-v2:option-b'],
  'item:t2-r-ap6-supplementary': ['item:t2-r-ap6-supplementary:option-a', 'item:t2-r-ap6-supplementary:option-c'],
  'item:t3-r-ap1-v2': ['item:t3-r-ap1-v2:option-d'],
  'item:t3-r-ap2-v2': ['item:t3-r-ap2-v2:option-a'],
  'item:t3-r-ap3-v2': ['item:t3-r-ap3-v2:option-b'],
  'item:t3-r-ap4-v2': ['item:t3-r-ap4-v2:option-c'],
  'item:t3-r-ap5-v2': ['item:t3-r-ap5-v2:option-d'],
  'item:t3-r-ap6-supplementary': ['item:t3-r-ap6-supplementary:option-a', 'item:t3-r-ap6-supplementary:option-c'],
  'item:t4-r-ap1-v2': ['item:t4-r-ap1-v2:option-c'],
  'item:t4-r-ap2-v2': ['item:t4-r-ap2-v2:option-d'],
  'item:t4-r-ap3-v2': ['item:t4-r-ap3-v2:option-a'],
  'item:t4-r-ap4-v2': ['item:t4-r-ap4-v2:option-b'],
  'item:t4-r-ap5-v2': ['item:t4-r-ap5-v2:option-c'],
  'item:t4-r-ap6-supplementary': ['item:t4-r-ap6-supplementary:option-a', 'item:t4-r-ap6-supplementary:option-c'],
  'item:t5-r-ap1-v2': ['item:t5-r-ap1-v2:option-b'],
  'item:t5-r-ap2-v2': ['item:t5-r-ap2-v2:option-c'],
  'item:t5-r-ap3-v2': ['item:t5-r-ap3-v2:option-d'],
  'item:t5-r-ap4-v2': ['item:t5-r-ap4-v2:option-a'],
  'item:t5-r-ap5-v2': ['item:t5-r-ap5-v2:option-b'],
  'item:t5-r-ap6-supplementary': ['item:t5-r-ap6-supplementary:option-b', 'item:t5-r-ap6-supplementary:option-c'],
};

function scoringFor(object: ToeflReadingExpansionObject) {
  return {
    scoringVersion: object.scoringVersion,
    disclosure: object.disclosure,
    items: object.academic.items.map<ToeflReadingScoringItem>((item) => ({
      itemId: item.id,
      responseKind: item.type === 'single-select' ? 'selected_option_id' : 'selected_option_ids',
      optionIds: item.options.map((candidate) => candidate.id),
      correctOptionIds: [...(ANSWER_KEY[item.id] ?? [])],
      selectCount: item.type === 'single-select' ? 1 : item.selectCount,
      maxRawPoints: 1,
    })),
  };
}

export const TOEFL_READING_SCORING_BY_OBJECT_ID = Object.fromEntries([
  [TOEFL_READING_SET1.objectId, TOEFL_READING_SET1_SCORING],
  ...TOEFL_READING_SETS_2_TO_5.map((object) => [object.objectId, scoringFor(object)]),
]) as Readonly<Record<string, {
  scoringVersion: string;
  disclosure: string;
  items: ToeflReadingScoringItem[];
}>>;

// The four longer passages and their original answer identities remain outside the
// learner payload as reversible editorial sources.
export const TOEFL_READING_SETS_2_TO_5_LEGACY_SOURCES = [
  {
    id: 'source:t2-r-ap-mirrors-v1',
    passage: `Few objects in daily life seem as simple as a mirror, yet the story of how humans learned to make good mirrors is a surprisingly long and revealing one. For most of history, seeing a clear reflection of oneself was a rare experience. Early humans could glimpse themselves only in still water or in polished stones, and these reflections were dim and distorted.

The first manufactured mirrors, made thousands of years ago, were sheets of polished metal such as bronze, copper, or silver. These could produce a recognizable reflection, but they had serious drawbacks: the images were dark, the metal tarnished and needed constant polishing, and large mirrors were extremely expensive. For much of human history, therefore, a good mirror was a luxury owned only by the wealthy.

The breakthrough came with glass. Glassmakers discovered that a thin layer of reflective metal applied to the back of a sheet of glass produced a far brighter and clearer image than polished metal alone, while the glass protected the metal from tarnishing. In the sixteenth century, Venetian craftsmen perfected a method using a coating of tin and mercury, and Venice became famous—and rich—for its mirrors. These were still costly, and the process was dangerous, since mercury is highly toxic. But the quality was unprecedented.

The true democratization of the mirror came in the nineteenth century, when a German chemist developed a process for coating glass with a thin layer of silver using relatively safe chemicals. This method was cheaper, safer, and produced excellent mirrors that could be manufactured on a large scale. For the first time, ordinary people could own a clear mirror. Historians have noted that the spread of affordable mirrors may have subtly changed human self-perception: when people could easily and regularly see themselves as others see them, it likely affected everything from fashion to the very sense of individual identity. A humble object, it turns out, quietly reshaped how humans understand themselves.`,
    items: [{ id: 't2-r-ap1', answer: 1 }, { id: 't2-r-ap2', answer: 2 }, { id: 't2-r-ap3', answer: 3 }, { id: 't2-r-ap4', answer: 0 }, { id: 't2-r-ap5', answer: 1 }, { id: 't2-r-ap6', answers: ['A', 'C'] }],
  },
  {
    id: 'source:t3-r-ap-echolocation-v1',
    passage: `Among the many remarkable abilities of the animal kingdom, few are as striking as echolocation—the use of sound to "see" the world. Animals that echolocate, most famously bats and dolphins, emit sounds and then listen to the echoes that bounce back from objects around them. From these echoes, they construct a detailed picture of their surroundings, allowing them to navigate and hunt even in complete darkness or murky water.

The basic principle is elegant. An echolocating animal produces a sound—often a high-pitched click or call—that travels outward until it strikes an object and reflects back. By measuring the time it takes for the echo to return, the animal can judge how far away the object is: a quick echo means a nearby object, a delayed echo a distant one. The direction of the returning sound reveals the object's location, and subtle features of the echo can reveal an object's size, shape, and even texture.

What is astonishing is the precision this system can achieve. Bats hunting insects can detect a target as fine as a human hair in total darkness, adjusting their flight in a fraction of a second. Dolphins can use echolocation to distinguish between objects of slightly different materials, and even to detect fish hidden beneath the sand of the seafloor. To process this flood of acoustic information, these animals have highly specialized brains, and much of their neural machinery is devoted to interpreting sound.

Echolocation is a beautiful example of "convergent evolution"—the process by which unrelated species independently evolve similar solutions to similar problems. Bats and dolphins are not closely related; one is a flying mammal and the other lives in the sea. Yet both faced the challenge of sensing their environment where vision fails, and both arrived at strikingly similar solutions. Studying these systems has also inspired human technology: sonar, used by ships and submarines, and even navigation aids for people who are blind, draw on the same fundamental principle that evolution discovered long before us.`,
    items: [{ id: 't3-r-ap1', answer: 3 }, { id: 't3-r-ap2', answer: 0 }, { id: 't3-r-ap3', answer: 1 }, { id: 't3-r-ap4', answer: 2 }, { id: 't3-r-ap5', answer: 3 }, { id: 't3-r-ap6', answers: ['A', 'C'] }],
  },
  {
    id: 'source:t4-r-ap-circadian-v1',
    passage: `The idea of a "biological clock" is more than a metaphor. Nearly every living thing—from bacteria to plants to humans—has an internal timekeeping system that governs the rhythm of its daily life. In humans and other animals, this system is known as the circadian rhythm, from Latin words meaning "about a day." It controls when we feel sleepy or alert, when body temperature rises and falls, and the timing of many hormones, all on a cycle lasting roughly twenty-four hours.

What is remarkable is that this clock is internal. Even if a person is placed in a room with no windows, clocks, or any cue about the time of day, their body continues to follow an approximately twenty-four-hour cycle. The rhythm is generated by the body itself, driven by a small cluster of cells in the brain that acts as a master clock, coordinating the timing of organs throughout the body.

Yet the internal clock is not perfectly accurate; left to itself, it tends to drift, running slightly longer or shorter than twenty-four hours. This is where the environment comes in. The clock is reset each day, mainly by light. Bright light in the morning, detected by the eyes, signals to the master clock that the day has begun, keeping the body's rhythm aligned with the outside world. This is why light exposure has such a powerful effect on sleep, and why staring at bright screens late at night can disrupt it—the light tricks the clock into thinking it is still daytime.

Understanding circadian rhythms has practical importance. Jet lag, for instance, is simply the discomfort of an internal clock that is out of step with a new time zone. Shift workers, whose schedules force them to be awake at night, often suffer health effects linked to a disrupted clock. Researchers have even found that the timing of meals and medicines can affect how the body responds to them. Far from being a vague notion, then, the biological clock is a precise and powerful system—one that we ignore at our own cost.`,
    items: [{ id: 't4-r-ap1', answer: 2 }, { id: 't4-r-ap2', answer: 3 }, { id: 't4-r-ap3', answer: 0 }, { id: 't4-r-ap4', answer: 1 }, { id: 't4-r-ap5', answer: 2 }, { id: 't4-r-ap6', answers: ['A', 'C'] }],
  },
  {
    id: 'source:t5-r-ap-horses-v1',
    passage: `The domestication of the horse transformed human societies more profoundly than almost any other animal. While dogs were domesticated far earlier, horses offered something different: a dramatic extension of human mobility and physical power. Archaeological evidence suggests that horses were first domesticated on the grasslands of Central Asia around 3500 BCE, initially raised for their meat and milk before their potential for transport was recognized.

The key evidence for early domestication comes from several sources. Changes in horse tooth wear indicate the use of bits, the metal or bone mouthpieces used to control a ridden animal. Settlement sites show a sudden increase in horse bones relative to other animals, suggesting managed herds rather than occasional hunting. Perhaps most tellingly, the geographic spread of certain horse-related vocabulary across ancient languages tracks closely with the movement of peoples who are thought to have relied on horses.

Once horses could be ridden and, later, harnessed to wheeled vehicles, the consequences rippled across every domain of life. Herders could manage far larger territories. Trade goods moved faster and over greater distances. Most dramatically, mounted warriors gained a decisive military advantage over foot soldiers, reshaping the balance of power between societies. Some historians argue that the spread of entire language families across Eurasia was accelerated by populations whose mobility depended on the horse.

Yet the relationship was not simply one of human mastery. Horses required pasture, water, and care, tying their owners to particular patterns of movement and settlement. In this sense, domestication was a mutual adaptation: humans shaped horses through selective breeding, and horses, in turn, shaped the rhythms of human life.`,
    items: [{ id: 't5-r-ap1', answer: 1 }, { id: 't5-r-ap2', answer: 2 }, { id: 't5-r-ap3', answer: 3 }, { id: 't5-r-ap4', answer: 0 }, { id: 't5-r-ap5', answer: 1 }, { id: 't5-r-ap6', answers: ['B', 'C'] }],
  },
] as const;
