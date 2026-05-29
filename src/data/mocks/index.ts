import type { MockExam } from './types';
import icfesMock01 from './icfes-mock-01';
import icfesMock02 from './icfes-mock-02';
import icfesMock03 from './icfes-mock-03';
import icfesMock04 from './icfes-mock-04';
import icfesMock05 from './icfes-mock-05';
import icfesMock06 from './icfes-mock-06';
import icfesMock07 from './icfes-mock-07';
import icfesMock08 from './icfes-mock-08';
import icfesMock09 from './icfes-mock-09';
import icfesMock10 from './icfes-mock-10';
import icfesMock11 from './icfes-mock-11';
import icfesMock12 from './icfes-mock-12';
import icfesMock13 from './icfes-mock-13';
import icfesMock14 from './icfes-mock-14';
import icfesMock15 from './icfes-mock-15';
import icfesMock16 from './icfes-mock-16';
import icfesMock17 from './icfes-mock-17';
import icfesMock18 from './icfes-mock-18';
import icfesMock19 from './icfes-mock-19';
import icfesMock20 from './icfes-mock-20';
import ieltsSet1 from './ielts-set-1';
import ieltsSet2 from './ielts-set-2';
import ieltsSet3 from './ielts-set-3';
import ieltsSet4 from './ielts-set-4';
import ieltsSet5 from './ielts-set-5';
import ieltsSet6 from './ielts-set-6';
import ieltsSet7 from './ielts-set-7';
import ieltsSet8 from './ielts-set-8';
import ieltsSet9 from './ielts-set-9';
import ieltsSet10 from './ielts-set-10';
import ieltsSet11 from './ielts-set-11';
import ieltsSet12 from './ielts-set-12';
import ieltsSet13 from './ielts-set-13';
import ieltsSet14 from './ielts-set-14';
import ieltsSet15 from './ielts-set-15';
import ieltsSet16 from './ielts-set-16';
import ieltsSet17 from './ielts-set-17';
import ieltsSet18 from './ielts-set-18';
import ieltsSet19 from './ielts-set-19';
import ieltsSet20 from './ielts-set-20';
import toeflSet1 from './toefl-set-1';
import toeflSet2 from './toefl-set-2';
import cilsCeliSet1 from './cils-celi-set-1';
import delfDalfSet1 from './delf-dalf-set-1';
import goetheSet1 from './goethe-set-1';
import celpeBrasSet1 from './celpe-bras-set-1';
import topikSet1 from './topik-set-1';

const MOCK_REGISTRY: Record<string, MockExam> = {
  // ── ICFES mocks 1–10 (original) ───────────────────────────────────────────
  'icfes:mock-01': icfesMock01,
  'icfes:mock-02': icfesMock02,
  'icfes:mock-03': icfesMock03,
  'icfes:mock-04': icfesMock04,
  'icfes:mock-05': icfesMock05,
  'icfes:mock-06': icfesMock06,
  'icfes:mock-07': icfesMock07,
  'icfes:mock-08': icfesMock08,
  'icfes:mock-09': icfesMock09,
  'icfes:mock-10': icfesMock10,
  // ── ICFES mocks 11–20 (A2-B1 difficulty, randomised answers) ─────────────
  'icfes:mock-11': icfesMock11,
  'icfes:mock-12': icfesMock12,
  'icfes:mock-13': icfesMock13,
  'icfes:mock-14': icfesMock14,
  'icfes:mock-15': icfesMock15,
  'icfes:mock-16': icfesMock16,
  'icfes:mock-17': icfesMock17,
  'icfes:mock-18': icfesMock18,
  'icfes:mock-19': icfesMock19,
  'icfes:mock-20': icfesMock20,
  // ── IELTS Academic sets 1–20 ──────────────────────────────────────────────
  'ielts:set-1':  ieltsSet1,
  'ielts:set-2':  ieltsSet2,
  'ielts:set-3':  ieltsSet3,
  'ielts:set-4':  ieltsSet4,
  'ielts:set-5':  ieltsSet5,
  'ielts:set-6':  ieltsSet6,
  'ielts:set-7':  ieltsSet7,
  'ielts:set-8':  ieltsSet8,
  'ielts:set-9':  ieltsSet9,
  'ielts:set-10': ieltsSet10,
  'ielts:set-11': ieltsSet11,
  'ielts:set-12': ieltsSet12,
  'ielts:set-13': ieltsSet13,
  'ielts:set-14': ieltsSet14,
  'ielts:set-15': ieltsSet15,
  'ielts:set-16': ieltsSet16,
  'ielts:set-17': ieltsSet17,
  'ielts:set-18': ieltsSet18,
  'ielts:set-19': ieltsSet19,
  'ielts:set-20': ieltsSet20,
  // ── Other exams ───────────────────────────────────────────────────────────
  'toefl:set-1': toeflSet1,
  'toefl:set-2': toeflSet2,
  'cils-celi:set-1': cilsCeliSet1,
  'delf-dalf:set-1': delfDalfSet1,
  'goethe:set-1': goetheSet1,
  'celpe-bras:set-1': celpeBrasSet1,
  // ── TOPIK ─────────────────────────────────────────────────────────────────
  'topik:set-1': topikSet1,
};

export function getMock(examSlug: string, mockId: string): MockExam | null {
  return MOCK_REGISTRY[`${examSlug}:${mockId}`] ?? null;
}

export type { MockExam } from './types';
