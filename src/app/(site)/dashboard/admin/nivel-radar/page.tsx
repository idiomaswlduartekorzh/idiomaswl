import Link from 'next/link';

import { requireAdmin } from '@/lib/auth/require-admin.server';
import type { DiagnosticWritingReviewView } from '@/lib/diagnostic/admin-review';
import { ENGLISH_DIAGNOSTIC_WRITING_BANK } from '@/server/diagnostic/bank';
import { DIAGNOSTIC_WRITING_RUBRIC_VERSION } from '@/server/diagnostic/writing-automation';
import { getDiagnosticWritingProviderReadiness } from '@/server/diagnostic/writing-provider';
import { screenDiagnosticWritingResponse } from '@/server/diagnostic/writing';
import { loadDiagnosticWritingReviewQueue } from '@/server/diagnostic/repository.server';
import DiagnosticWritingReviewClient from './DiagnosticWritingReviewClient';
import DiagnosticPilotHealthClient from './DiagnosticPilotHealthClient';
import PilotEnrollmentAdminClient from './PilotEnrollmentAdminClient';

export const dynamic = 'force-dynamic';

export default async function DiagnosticWritingReviewPage() {
  const admin = await requireAdmin();
  const providerReadiness = getDiagnosticWritingProviderReadiness();
  const configuredPilotConsentVersion = process.env.DIAGNOSTIC_PILOT_CONSENT_VERSION?.trim() ?? '';
  const pilotConsentVersion = configuredPilotConsentVersion.length >= 3
    && configuredPilotConsentVersion.length <= 160
    ? configuredPilotConsentVersion : null;
  let error = '';
  let items: DiagnosticWritingReviewView[] = [];
  try {
    const rows = await loadDiagnosticWritingReviewQueue();
    items = rows.flatMap(row => {
      const prompt = ENGLISH_DIAGNOSTIC_WRITING_BANK.find(record =>
        record.publicPrompt.id === row.promptId
        && record.publicPrompt.contentVersion === row.promptContentVersion)?.publicPrompt;
      if (!prompt) return [];
      const adjudication = row.status === 'adjudication';
      const reviewed = row.status === 'human-review';
      return [{
        attemptId: row.attemptId,
        attemptVersion: row.attemptVersion,
        routeId: row.routeId,
        status: row.status,
        createdAt: row.createdAt,
        prompt: {
          id: prompt.id, contentVersion: prompt.contentVersion, title: prompt.title,
          situation: prompt.situation, instructions: [...prompt.instructions],
          levelCandidate: prompt.levelCandidate,
        },
        responseText: row.responseText,
        responseSha256: row.responseSha256,
        wordCount: row.wordCount,
        responseScreening: screenDiagnosticWritingResponse(prompt, row.responseText),
        rubricVersion: DIAGNOSTIC_WRITING_RUBRIC_VERSION,
        ...(adjudication || reviewed ? {
          ...(row.automatedEvaluation ? { automated: row.automatedEvaluation } : {}),
          human: row.humanEvaluation ?? undefined,
        } : {}),
      }];
    });
  } catch {
    error = 'La cola diagnóstica no está disponible. Verifica que las migraciones estén aplicadas.';
  }
  return (
    <main style={{ minHeight: '100vh', background: '#f5f0eb', padding: '24px clamp(16px, 4vw, 48px)', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Link href="/dashboard/admin" style={{ color: '#8f461f', fontSize: 13, fontWeight: 700 }}>← Panel administrativo</Link>
        <h1 style={{ margin: '18px 0 4px', fontSize: 'clamp(26px, 4vw, 42px)' }}>Operación · Nivel Radar</h1>
        <p style={{ margin: '0 0 20px', color: '#6b7280', maxWidth: 820 }}>
          Administra la cohorte cerrada del piloto y la revisión académica de escritura sin exponer el banco ni datos adicionales del participante.
        </p>
        <PilotEnrollmentAdminClient consentVersion={pilotConsentVersion} />
        <DiagnosticPilotHealthClient />
        <h2 style={{ margin: '0 0 6px', fontSize: 24 }}>Revisión de escritura</h2>
        <p style={{ margin: '0 0 20px', color: '#6b7280', maxWidth: 820 }}>
          La primera revisión es ciega frente al modelo. Una discrepancia material o una decisión de revisar pasa a otra identidad para adjudicación. Sin autorización externa, el caso conserva una ruta completamente humana.
        </p>
        <section aria-labelledby="writing-automation-status" style={{ marginBottom: 20, border: `1px solid ${providerReadiness.ready ? '#86efac' : '#f5c26b'}`, background: providerReadiness.ready ? '#f0fdf4' : '#fffbeb', borderRadius: 12, padding: 14 }}>
          <h2 id="writing-automation-status" style={{ margin: '0 0 6px', fontSize: 16 }}>
            Transporte automático: {providerReadiness.ready ? 'configurado' : 'bloqueado'}
          </h2>
          <p style={{ margin: 0, color: '#4b5563', fontSize: 13 }}>
            {providerReadiness.ready
              ? `Proveedor ${providerReadiness.provider} y modelo fijado. Cada intento todavía exige consentimiento externo persistido antes de enviar su texto.`
              : `No se enviará ninguna respuesta. Bloqueos: ${providerReadiness.blockers.join(', ')}.`}
          </p>
        </section>
        {error
          ? <div role="alert" style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 12, padding: 14 }}>{error}</div>
          : <DiagnosticWritingReviewClient items={items} currentReviewerId={admin.id} />}
      </div>
    </main>
  );
}
