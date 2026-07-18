import { IELTSReportPreviewClient } from './IELTSReportPreviewClient';

export const metadata = {
  title: 'Preview: Reporte de Writing IELTS',
  robots: { index: false },
};

export default function IELTSReportPreviewPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Preview: Panel de reporte IELTS Writing</h1>
      <p className="text-sm text-white/50 mb-8">
        Monta IELTSWritingReportPanel directo, contra el set-1 real, sin pasar por Reading/
        Listening. Mismo componente que ya está conectado en /examenes/ielts/practica/set-1.
      </p>
      <IELTSReportPreviewClient />
    </div>
  );
}
