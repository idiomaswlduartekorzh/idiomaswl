import type { IeltsListeningDraftInputSpec } from './listening-draft-input-contract';

/** Minimal serializable payload for the interactive client-owned control tree. */
export type IeltsListeningDraftControlDescriptor =
  | {
      type: 'matching';
      inputSpec: Extract<IeltsListeningDraftInputSpec, { type: 'matching' }>;
      prompts: readonly string[];
    }
  | {
      type: 'note-completion';
      inputSpec: Extract<IeltsListeningDraftInputSpec, { type: 'note-completion' }>;
      notes: readonly { before: string; after: string }[];
    };
