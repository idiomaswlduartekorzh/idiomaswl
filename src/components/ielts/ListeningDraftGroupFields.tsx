// Composition leaf for a client-owned draft. Its callback must be created below the RSC boundary.
import type { IeltsListeningDraftControlDescriptor } from '../../lib/ielts/listening-draft-control-descriptor';
import MatchingDraftFields from './MatchingDraftFields';
import NoteCompletionDraftFields from './NoteCompletionDraftFields';

export interface ListeningDraftGroupFieldsProps {
  descriptor: IeltsListeningDraftControlDescriptor;
  responses: Readonly<Record<string, string>>;
  disabled?: boolean;
  showErrors?: boolean;
  onAnswer: (number: number, value: string) => void;
}

export default function ListeningDraftGroupFields({
  descriptor, responses, disabled = false, showErrors = false, onAnswer,
}: ListeningDraftGroupFieldsProps) {
  if (descriptor.type === 'matching') {
    return (
      <MatchingDraftFields
        spec={descriptor.inputSpec}
        prompts={descriptor.prompts}
        responses={responses}
        disabled={disabled}
        showErrors={showErrors}
        onAnswer={onAnswer}
      />
    );
  }
  if (descriptor.type === 'note-completion') {
    return (
      <NoteCompletionDraftFields
        spec={descriptor.inputSpec}
        notes={descriptor.notes}
        responses={responses}
        disabled={disabled}
        showErrors={showErrors}
        onAnswer={onAnswer}
      />
    );
  }
  throw new Error('Unsupported IELTS Listening draft control descriptor.');
}
