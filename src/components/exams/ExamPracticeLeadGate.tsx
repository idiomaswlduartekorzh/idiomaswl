'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { checkExamScoreAccess } from '@/lib/actions/checkExamScoreAccess';

/** Independent scored practices register a contact before mounting their scorer. */
export default function ExamPracticeLeadGate({ examSlug, mockId, examName, children }: {
  examSlug: 'ielts' | 'toefl';
  mockId: string;
  examName: string;
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    let active = true;
    checkExamScoreAccess(examSlug).then(access => {
      if (active) { setReady(access); setChecking(false); }
    }).catch(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, [examSlug]);
  if (ready) return <>{children}</>;
  if (checking) return <div className="prac-shell" role="status" style={{ minHeight: '65vh', padding: '2rem' }}>Comprobando tu registro…</div>;
  return (
    <div className="prac-shell" style={{ minHeight: '65vh' }}>
      <LeadCaptureModal
        examSlug={examSlug}
        examName={examName}
        examScore="Práctica iniciada · resultado pendiente"
        source="exam-practice-start"
        mode="before-practice"
        mockId={mockId}
        mandatory
        onClose={() => setReady(true)}
      />
    </div>
  );
}
