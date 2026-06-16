import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Colombia en Datos — Comparador de Gobiernos',
  description:
    'Plataforma de análisis objetivo de los gobiernos de Colombia basada en datos oficiales verificables. Economía, seguridad, pobreza, narcotráfico, ambiente e infancia.',
  keywords: 'Colombia datos gobiernos Petro Duque Santos Uribe indicadores comparador presidencial',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#080d1a] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
