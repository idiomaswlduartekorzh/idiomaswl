import type { IeltsListeningPublicGroup } from '../../src/lib/ielts/listening-practice-contract';
import type { IeltsListeningPrivateDraftGroupDescriptor } from '../../src/lib/ielts/listening-private-draft-adapter.server';
import type { IeltsListeningDraftControlDescriptor } from '../../src/lib/ielts/listening-draft-control-descriptor';

declare const privateDescriptor: IeltsListeningPrivateDraftGroupDescriptor;
declare const privateSingleChoice: Extract<IeltsListeningDraftControlDescriptor, { type: 'single-choice' }>;

// These negative assertions become unused directives if the public DTO is widened early.
// @ts-expect-error Matching remains private until an atomic promotion changes every gate.
const publicMatchingType: IeltsListeningPublicGroup['type'] = 'matching';
// @ts-expect-error Note completion remains private until an atomic promotion changes every gate.
const publicNotesType: IeltsListeningPublicGroup['type'] = 'note-completion';
// @ts-expect-error Private-stage matching/notes cannot enter the public group union.
const publicGroup: IeltsListeningPublicGroup = privateDescriptor;
// @ts-expect-error Private control descriptors include inputSpec instead of a public group contract.
const publicSingleChoice: IeltsListeningPublicGroup = privateSingleChoice;

void [publicMatchingType, publicNotesType, publicGroup, publicSingleChoice];
