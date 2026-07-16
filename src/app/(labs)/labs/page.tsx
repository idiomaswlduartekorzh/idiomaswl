import Link from 'next/link';
import { isConfigured } from '@/lib/labs/config';

const tools = [
  {
    href:  '/labs/writing',
    name:  'Evaluador de IELTS Writing',
    desc:  'Ensayo → band por los 4 criterios + errores localizados. Gemini Flash free tier.',
    cost:  '$0 — 1.500/día gratis',
    ready: isConfigured('gemini'),
    envVar:'GEMINI_API_KEY',
  },
  {
    href:  '/labs/speaking',
    name:  'Evaluador de pronunciación',
    desc:  'Audio → precisión por fonema. Azure Pronunciation Assessment.',
    cost:  '$0 hasta 5 h/mes · luego ~$0,02/grabación',
    ready: isConfigured('azureSpeech'),
    envVar:'AZURE_SPEECH_KEY',
  },
];

export default function LabsIndex() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Labs</h1>
      <p className="mt-3 max-w-2xl text-white/60">
        Herramientas en validación. Nada de esto está enlazado desde idiomaswl.com ni
        aparece en Google. Si el modelo funciona aquí, se inyecta al sitio.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold group-hover:text-blue-300">{t.name}</h2>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] ${
                  t.ready
                    ? 'bg-emerald-400/10 text-emerald-300'
                    : 'bg-white/10 text-white/50'
                }`}
              >
                {t.ready ? 'listo' : 'falta key'}
              </span>
            </div>
            <p className="mt-2 text-sm text-white/55">{t.desc}</p>
            <p className="mt-3 text-xs text-white/40">{t.cost}</p>
            {!t.ready && (
              <p className="mt-2 text-xs text-amber-400/70">
                Define {t.envVar} en .env.local
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
