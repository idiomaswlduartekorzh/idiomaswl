import type { MockExam } from './types';
import { normalizeIcfesMock } from './normalize-icfes-mock';
import { withToefl2026ReadingModule2 } from './toefl-fixed-form';
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
import icfesMock21 from './icfes-mock-21';
import icfesMock22 from './icfes-mock-22';
import icfesMock23 from './icfes-mock-23';
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
import toeflSet3 from './toefl-set-3';
import toeflSet4 from './toefl-set-4';
import toeflSet5 from './toefl-set-5';
import toeflSet6 from './toefl-set-6';
import toeflSet7 from './toefl-set-7';
import toeflSet8 from './toefl-set-8';
import toeflSet9 from './toefl-set-9';
import toeflSet10 from './toefl-set-10';
import toeflSet11 from './toefl-set-11';
import toeflSet12 from './toefl-set-12';
import toeflSet13 from './toefl-set-13';
import toeflSet14 from './toefl-set-14';
import toeflSet15 from './toefl-set-15';
import toeflSet16 from './toefl-set-16';
import toeflSet17 from './toefl-set-17';
import toeflSet18 from './toefl-set-18';
import toeflSet19 from './toefl-set-19';
import toeflSet20 from './toefl-set-20';
import cilsCeliSet1 from './cils-celi-set-1';
import cilsCeliA2Set1 from './cils-celi-a2-set-1';
import cilsCeliA2Set2 from './cils-celi-a2-set-2';
import cilsCeliA2Set3 from './cils-celi-a2-set-3';
import cilsCeliA2Set4 from './cils-celi-a2-set-4';
import cilsCeliA2Set5 from './cils-celi-a2-set-5';
import cilsCeliB1Set2 from './cils-celi-b1-set-2';
import cilsCeliB1Set3 from './cils-celi-b1-set-3';
import cilsCeliB1Set4 from './cils-celi-b1-set-4';
import cilsCeliB1Set5 from './cils-celi-b1-set-5';
import cilsCeliB2Set1 from './cils-celi-b2-set-1';
import cilsCeliB2Set2 from './cils-celi-b2-set-2';
import cilsCeliB2Set3 from './cils-celi-b2-set-3';
import cilsCeliB2Set4 from './cils-celi-b2-set-4';
import cilsCeliB2Set5 from './cils-celi-b2-set-5';
import cilsCeliC1Set1 from './cils-celi-c1-set-1';
import cilsCeliC1Set2 from './cils-celi-c1-set-2';
import cilsCeliC1Set3 from './cils-celi-c1-set-3';
import cilsCeliC1Set4 from './cils-celi-c1-set-4';
import cilsCeliC1Set5 from './cils-celi-c1-set-5';
import delfDalfSet1 from './delf-dalf-set-1';
import delfDalfSet2 from './delf-b1-set-2';
import delfB2Set1 from './delf-b2-set-1';
import delfA1Set1 from './delf-a1-set-1';
import delfA1Set2 from './delf-a1-set-2';
import delfA1Set3 from './delf-a1-set-3';
import delfA1Set4 from './delf-a1-set-4';
import delfA1Set5 from './delf-a1-set-5';
import delfA2Set1 from './delf-a2-set-1';
import delfA2Set2 from './delf-a2-set-2';
import delfA2Set3 from './delf-a2-set-3';
import delfA2Set4 from './delf-a2-set-4';
import delfA2Set5 from './delf-a2-set-5';
import delfB1Set3 from './delf-b1-set-3';
import delfB1Set4 from './delf-b1-set-4';
import delfB1Set5 from './delf-b1-set-5';
import delfB2Set2 from './delf-b2-set-2';
import delfB2Set3 from './delf-b2-set-3';
import delfB2Set4 from './delf-b2-set-4';
import delfB2Set5 from './delf-b2-set-5';
import goetheSet1 from './goethe-set-1';
import goetheA1Set1 from './goethe-a1-set-1';
import goetheA1Set2 from './goethe-a1-set-2';
import goetheA1Set3 from './goethe-a1-set-3';
import goetheA1Set4 from './goethe-a1-set-4';
import goetheA1Set5 from './goethe-a1-set-5';
import goetheA2Set1 from './goethe-a2-set-1';
import goetheA2Set2 from './goethe-a2-set-2';
import goetheA2Set3 from './goethe-a2-set-3';
import goetheA2Set4 from './goethe-a2-set-4';
import goetheA2Set5 from './goethe-a2-set-5';
import goetheB1Set2 from './goethe-b1-set-2';
import goetheB1Set3 from './goethe-b1-set-3';
import goetheB1Set4 from './goethe-b1-set-4';
import goetheB1Set5 from './goethe-b1-set-5';
import goetheB2Set1 from './goethe-b2-set-1';
import goetheB2Set2 from './goethe-b2-set-2';
import goetheB2Set3 from './goethe-b2-set-3';
import goetheB2Set4 from './goethe-b2-set-4';
import goetheB2Set5 from './goethe-b2-set-5';
import goetheC1Set1 from './goethe-c1-set-1';
import goetheC1Set2 from './goethe-c1-set-2';
import goetheC1Set3 from './goethe-c1-set-3';
import goetheC1Set4 from './goethe-c1-set-4';
import goetheC1Set5 from './goethe-c1-set-5';
import celpeBrasSet1 from './celpe-bras-set-1';
import celpeBrasSet2 from './celpe-bras-set-2';
import celpeBrasSet3 from './celpe-bras-set-3';
import celpeBrasSet4 from './celpe-bras-set-4';
import celpeBrasSet5 from './celpe-bras-set-5';
import celpeBrasSet6 from './celpe-bras-set-6';
import celpeBrasSet7 from './celpe-bras-set-7';
import celpeBrasSet8 from './celpe-bras-set-8';
import celpeBrasSet9 from './celpe-bras-set-9';
import celpeBrasSet10 from './celpe-bras-set-10';
import celpeBrasSet11 from './celpe-bras-set-11';
import celpeBrasSet12 from './celpe-bras-set-12';
import celpeBrasSet13 from './celpe-bras-set-13';
import celpeBrasSet14 from './celpe-bras-set-14';
import celpeBrasSet15 from './celpe-bras-set-15';
import celpeBrasSet16 from './celpe-bras-set-16';
import celpeBrasSet17 from './celpe-bras-set-17';
import celpeBrasSet18 from './celpe-bras-set-18';
import celpeBrasSet19 from './celpe-bras-set-19';
import celpeBrasSet20 from './celpe-bras-set-20';
import topikSet1 from './topik-set-1';
import topikSet2 from './topik-set-2';
import topikSet3 from './topik-set-3';
import topikSet4 from './topik-set-4';
import topikSet5 from './topik-set-5';
import topikSet6 from './topik-set-6';
import topikSet7 from './topik-set-7';
import topikSet8 from './topik-set-8';
import topikSet9 from './topik-set-9';
import topikSet10 from './topik-set-10';
import cambridgeB2Set1 from './cambridge-b2-set-1';
import {
  cambridgeB2Set2,
  cambridgeB2Set3,
  cambridgeB2Set4,
  cambridgeB2Set5,
  cambridgeB2Set6,
  cambridgeB2Set7,
  cambridgeB2Set8,
  cambridgeB2Set9,
  cambridgeB2Set10,
} from './cambridge-b2-original-sets';

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
  'icfes:mock-21': icfesMock21,
  'icfes:mock-22': icfesMock22,
  'icfes:mock-23': icfesMock23,
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
  'toefl:set-1': withToefl2026ReadingModule2(toeflSet1),
  'toefl:set-2': withToefl2026ReadingModule2(toeflSet2),
  'toefl:set-3': withToefl2026ReadingModule2(toeflSet3),
  'toefl:set-4': withToefl2026ReadingModule2(toeflSet4),
  'toefl:set-5': withToefl2026ReadingModule2(toeflSet5),
  'toefl:set-6': withToefl2026ReadingModule2(toeflSet6),
  'toefl:set-7': withToefl2026ReadingModule2(toeflSet7),
  'toefl:set-8': withToefl2026ReadingModule2(toeflSet8),
  'toefl:set-9': withToefl2026ReadingModule2(toeflSet9),
  'toefl:set-10': withToefl2026ReadingModule2(toeflSet10),
  'toefl:set-11': withToefl2026ReadingModule2(toeflSet11),
  'toefl:set-12': withToefl2026ReadingModule2(toeflSet12),
  'toefl:set-13': withToefl2026ReadingModule2(toeflSet13),
  'toefl:set-14': withToefl2026ReadingModule2(toeflSet14),
  'toefl:set-15': withToefl2026ReadingModule2(toeflSet15),
  'toefl:set-16': withToefl2026ReadingModule2(toeflSet16),
  'toefl:set-17': withToefl2026ReadingModule2(toeflSet17),
  'toefl:set-18': withToefl2026ReadingModule2(toeflSet18),
  'toefl:set-19': withToefl2026ReadingModule2(toeflSet19),
  'toefl:set-20': withToefl2026ReadingModule2(toeflSet20),
  'cils-celi:set-1': cilsCeliSet1,
  'cils-celi:a2-1': cilsCeliA2Set1,
  'cils-celi:a2-2': cilsCeliA2Set2,
  'cils-celi:a2-3': cilsCeliA2Set3,
  'cils-celi:a2-4': cilsCeliA2Set4,
  'cils-celi:a2-5': cilsCeliA2Set5,
  'cils-celi:b1-2': cilsCeliB1Set2,
  'cils-celi:b1-3': cilsCeliB1Set3,
  'cils-celi:b1-4': cilsCeliB1Set4,
  'cils-celi:b1-5': cilsCeliB1Set5,
  'cils-celi:cils-b2-1': cilsCeliB2Set1,
  'cils-celi:cils-b2-2': cilsCeliB2Set2,
  'cils-celi:cils-b2-3': cilsCeliB2Set3,
  'cils-celi:cils-b2-4': cilsCeliB2Set4,
  'cils-celi:cils-b2-5': cilsCeliB2Set5,
  'cils-celi:cils-c1-1': cilsCeliC1Set1,
  'cils-celi:cils-c1-2': cilsCeliC1Set2,
  'cils-celi:cils-c1-3': cilsCeliC1Set3,
  'cils-celi:cils-c1-4': cilsCeliC1Set4,
  'cils-celi:cils-c1-5': cilsCeliC1Set5,
  'delf-dalf:set-1':    delfDalfSet1,
  'delf-dalf:set-2':    delfDalfSet2,
  'delf-dalf:b2-set-1': delfB2Set1,
  'delf-dalf:a1-1': delfA1Set1,
  'delf-dalf:a1-2': delfA1Set2,
  'delf-dalf:a1-3': delfA1Set3,
  'delf-dalf:a1-4': delfA1Set4,
  'delf-dalf:a1-5': delfA1Set5,
  'delf-dalf:a2-1': delfA2Set1,
  'delf-dalf:a2-2': delfA2Set2,
  'delf-dalf:a2-3': delfA2Set3,
  'delf-dalf:a2-4': delfA2Set4,
  'delf-dalf:a2-5': delfA2Set5,
  'delf-dalf:b1-3': delfB1Set3,
  'delf-dalf:b1-4': delfB1Set4,
  'delf-dalf:b1-5': delfB1Set5,
  'delf-dalf:b2-2': delfB2Set2,
  'delf-dalf:b2-3': delfB2Set3,
  'delf-dalf:b2-4': delfB2Set4,
  'delf-dalf:b2-5': delfB2Set5,
  'goethe:set-1': goetheSet1,
  'goethe:a1-1': goetheA1Set1,
  'goethe:a1-2': goetheA1Set2,
  'goethe:a1-3': goetheA1Set3,
  'goethe:a1-4': goetheA1Set4,
  'goethe:a1-5': goetheA1Set5,
  'goethe:a2-1': goetheA2Set1,
  'goethe:a2-2': goetheA2Set2,
  'goethe:a2-3': goetheA2Set3,
  'goethe:a2-4': goetheA2Set4,
  'goethe:a2-5': goetheA2Set5,
  'goethe:b1-2': goetheB1Set2,
  'goethe:b1-3': goetheB1Set3,
  'goethe:b1-4': goetheB1Set4,
  'goethe:b1-5': goetheB1Set5,
  'goethe:b2-1': goetheB2Set1,
  'goethe:b2-2': goetheB2Set2,
  'goethe:b2-3': goetheB2Set3,
  'goethe:b2-4': goetheB2Set4,
  'goethe:b2-5': goetheB2Set5,
  'goethe:c1-1': goetheC1Set1,
  'goethe:c1-2': goetheC1Set2,
  'goethe:c1-3': goetheC1Set3,
  'goethe:c1-4': goetheC1Set4,
  'goethe:c1-5': goetheC1Set5,
  'celpe-bras:set-1': celpeBrasSet1,
  'celpe-bras:set-2': celpeBrasSet2,
  'celpe-bras:set-3': celpeBrasSet3,
  'celpe-bras:set-4': celpeBrasSet4,
  'celpe-bras:set-5': celpeBrasSet5,
  'celpe-bras:set-6': celpeBrasSet6,
  'celpe-bras:set-7': celpeBrasSet7,
  'celpe-bras:set-8': celpeBrasSet8,
  'celpe-bras:set-9': celpeBrasSet9,
  'celpe-bras:set-10': celpeBrasSet10,
  'celpe-bras:set-11': celpeBrasSet11,
  'celpe-bras:set-12': celpeBrasSet12,
  'celpe-bras:set-13': celpeBrasSet13,
  'celpe-bras:set-14': celpeBrasSet14,
  'celpe-bras:set-15': celpeBrasSet15,
  'celpe-bras:set-16': celpeBrasSet16,
  'celpe-bras:set-17': celpeBrasSet17,
  'celpe-bras:set-18': celpeBrasSet18,
  'celpe-bras:set-19': celpeBrasSet19,
  'celpe-bras:set-20': celpeBrasSet20,
  // ── TOPIK ─────────────────────────────────────────────────────────────────
  'topik:set-1': topikSet1,
  'topik:set-2': topikSet2,
  'topik:set-3': topikSet3,
  'topik:set-4': topikSet4,
  'topik:set-5': topikSet5,
  'topik:set-6': topikSet6,
  'topik:set-7': topikSet7,
  'topik:set-8': topikSet8,
  'topik:set-9': topikSet9,
  'topik:set-10': topikSet10,
  'cambridge-b2:set-1': cambridgeB2Set1,
  'cambridge-b2:set-2': cambridgeB2Set2,
  'cambridge-b2:set-3': cambridgeB2Set3,
  'cambridge-b2:set-4': cambridgeB2Set4,
  'cambridge-b2:set-5': cambridgeB2Set5,
  'cambridge-b2:set-6': cambridgeB2Set6,
  'cambridge-b2:set-7': cambridgeB2Set7,
  'cambridge-b2:set-8': cambridgeB2Set8,
  'cambridge-b2:set-9': cambridgeB2Set9,
  'cambridge-b2:set-10': cambridgeB2Set10,
};

export function getMock(examSlug: string, mockId: string): MockExam | null {
  const mock = MOCK_REGISTRY[`${examSlug}:${mockId}`] ?? null;
  if (!mock) return null;

  return examSlug === 'icfes' && mockId.startsWith('mock-')
    ? normalizeIcfesMock(mock)
    : mock;
}

export type { MockExam } from './types';
