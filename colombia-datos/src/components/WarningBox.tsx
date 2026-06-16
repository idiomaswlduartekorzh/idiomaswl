import { ReactNode } from 'react';
import { AlertTriangle, Info, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  type: 'warning' | 'info' | 'danger' | 'success';
  title: string;
  children: ReactNode;
}

const config = {
  warning: {
    border: 'border-l-yellow-400',
    bg: 'bg-yellow-400/5',
    icon: AlertTriangle,
    iconColor: 'text-yellow-400',
    titleColor: 'text-yellow-300',
  },
  info: {
    border: 'border-l-blue-400',
    bg: 'bg-blue-400/5',
    icon: Info,
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-300',
  },
  danger: {
    border: 'border-l-red-500',
    bg: 'bg-red-500/5',
    icon: AlertCircle,
    iconColor: 'text-red-400',
    titleColor: 'text-red-300',
  },
  success: {
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-500/5',
    icon: CheckCircle2,
    iconColor: 'text-emerald-400',
    titleColor: 'text-emerald-300',
  },
};

export default function WarningBox({ type, title, children }: Props) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <div
      className={`rounded-r-lg border-l-4 px-4 py-3 ${c.border} ${c.bg} flex gap-3`}
    >
      <Icon size={18} className={`shrink-0 mt-0.5 ${c.iconColor}`} />
      <div className="min-w-0">
        <p className={`text-sm font-semibold ${c.titleColor} mb-1`}>{title}</p>
        <div className="text-sm text-slate-400 leading-relaxed [&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </div>
    </div>
  );
}
