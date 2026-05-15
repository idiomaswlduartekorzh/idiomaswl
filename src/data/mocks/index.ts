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
import ieltsSet1 from './ielts-set-1';
import ieltsSet2 from './ielts-set-2';
import ieltsSet3 from './ielts-set-3';
import ieltsSet4 from './ielts-set-4';
import toeflSet1 from './toefl-set-1';
import cilsCeliSet1 from './cils-celi-set-1';
import delfDalfSet1 from './delf-dalf-set-1';
import goetheSet1 from './goethe-set-1';
import celpeBrasSet1 from './celpe-bras-set-1';

const MOCK_REGISTRY: Record<string, MockExam> = {
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
  'ielts:set-1': ieltsSet1,
  'ielts:set-2': ieltsSet2,
  'ielts:set-3': ieltsSet3,
  'ielts:set-4': ieltsSet4,
  'toefl:set-1': toeflSet1,
  'cils-celi:set-1': cilsCeliSet1,
  'delf-dalf:set-1': delfDalfSet1,
  'goethe:set-1': goetheSet1,
  'celpe-bras:set-1': celpeBrasSet1,
};

export function getMock(examSlug: string, mockId: string): MockExam | null {
  return MOCK_REGISTRY[`${examSlug}:${mockId}`] ?? null;
}

export type { MockExam } from './types';
