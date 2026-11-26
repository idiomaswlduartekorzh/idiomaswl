'use server';

import { listeningSamples, type ListeningSample } from './listening-samples';

type SampleReview = {
  answer: string;
  accepted: string[];
  transcript: string;
  reasoning: string;
  recover?: Record<string, string>;
  overLimit?: string;
};

const reviews: Record<ListeningSample['part'], SampleReview> = {
  1: {
    answer: 'They are interested in becoming a member.',
    accepted: ['They are interested in becoming a member.'],
    transcript: 'Receptionist: “Yes, members receive a twenty percent discount, bringing it to just over nineteen pounds.” Caller: “I’m not a member yet. Is it easy to join?”',
    reasoning: 'The price is for members. “Yet” tells you the caller is outside that group today. Asking how easy it is to join shows interest. You would need to hear a commitment such as “Sign me up” to say they have joined.',
    recover: {
      'They already qualify for the members’ rate.': 'You picked up the offer. Stay with the reply for another two seconds. The caller says “I’m not a member yet,” so the price the receptionist quoted has a condition they do not currently meet.',
      'They have decided to join today.': 'The word “join” is there. Listen to its intonation in “Is it easy to join?” The caller is asking for information and can still decide either way.',
    },
  },
  2: {
    answer: 'left',
    accepted: ['left'],
    transcript: '“Next, the Student Support Centre. This is located in the Fleming Building, just to the left of the main gate as you come in.”',
    reasoning: '“As you come in” gives you the direction of travel. Face into the campus and place the building on the side the guide names. The sentence already supplies “on your”, leaving room for the direction alone.',
    recover: {
      right: 'You would have the building on your right if you turned around to leave. Play the last four words again. The guide is describing what you see on the way in.',
    },
    overLimit: 'Read your entry after “on your”. A phrase such as “on the left” would repeat part of the printed sentence and use three words. The single direction completes it.',
  },
  3: {
    answer: 'The section on solar power.',
    accepted: ['The section on solar power.'],
    transcript: 'Student: “Hi Tom. Have you had a chance to look at the feedback from Professor Jenkins on our renewable energy project?” Tom: “Yes, overall I thought it was quite positive. She liked the section on solar power, but said we need to develop our argument about wind energy more.”',
    reasoning: 'Tom gives his own overall impression first. Then “she liked” introduces the tutor’s view and attaches it to solar power. After “but”, the speaker moves on to what the students need to develop. Pair each judgement with its subject as you listen.',
    recover: {
      'The section on wind energy.': 'Wind energy is the last topic you hear, which makes it easy to remember. Replay from “she liked” and pause at “but”. The praise is complete before Tom starts talking about wind.',
      'Both sections equally.': '“Overall I thought it was quite positive” is Tom’s impression of the feedback. The question asks specifically what his tutor liked. Listen for the change from “I” to “she”.',
    },
  },
  4: {
    answer: 'underwater nurseries',
    accepted: ['underwater nurseries', 'nurseries'],
    transcript: '“Marine protected areas restrict human activities in key reef zones. Coral gardening programmes grow coral fragments in underwater nurseries and then transplant them onto damaged reefs.”',
    reasoning: 'Follow “grow” to the first place and “then transplant” to the second. The fragments start in underwater nurseries and reach the damaged reefs later. “Nurseries” also completes the note on its own. The plural ending belongs to the recorded word.',
    recover: {
      'damaged reefs': 'You heard both words correctly. “Then transplant them onto” puts the reefs at the end of the process. Go back to the place that follows “grow coral fragments in”.',
      reefs: 'The reefs are the destination. Listen for the place immediately before “and then”. That is where the fragments grow first.',
      nursery: 'You found the right place. Listen to the ending of “nurseries” and read your answer in “grow in _____”. The recording uses the plural here.',
      'underwater nursery': 'You located the correct detail. The lecturer says “nurseries” in the plural. Keep that ending when you transfer the phrase into the note.',
    },
    overLimit: 'The note already has “in”. Adding it again to “underwater nurseries” uses three words and repeats the preposition. Count what you enter in the gap.',
  },
};

export async function checkListeningSample(part: number, entry: string) {
  const sample = listeningSamples.find(item => item.part === part);
  if (!sample || typeof entry !== 'string' || entry.length > 160) return null;
  const clean = entry.trim();
  if (!clean || (sample.options && !sample.options.includes(clean))) return null;
  const review = reviews[sample.part];
  const answer = sample.options ? clean : clean.toLowerCase().replace(/[.,!?]+$/, '').replace(/\s+/g, ' ');
  if (!answer) return null;
  const correct = review.accepted.includes(answer);
  const overLimit = sample.maxWords !== undefined && answer.split(' ').length > sample.maxWords;
  let reasoning = review.reasoning;
  if (overLimit && review.overLimit) reasoning = review.overLimit;
  else if (review.recover && Object.hasOwn(review.recover, answer)) reasoning = review.recover[answer];
  return {
    correct,
    answer: review.answer,
    transcript: review.transcript,
    reasoning,
  };
}
