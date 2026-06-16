import { ComparabilityLevel } from '@/types';

interface Props {
  level: ComparabilityLevel;
  showLabel?: boolean;
}

const config: Record<
  ComparabilityLevel,
  { label: string; dot: string; text: string; bg: string; border: string }
> = {
  alta: {
    label: 'Comparabilidad alta',
    dot: 'bg-emerald-500',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
  },
  media: {
    label: 'Comparabilidad media',
    dot: 'bg-yellow-400',
    text: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/30',
  },
  baja: {
    label: 'Comparabilidad baja',
    dot: 'bg-orange-500',
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
  },
  'no-comparable': {
    label: 'No comparable',
    dot: 'bg-red-500',
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
  },
};

export default function MethodologyBadge({ level, showLabel = true }: Props) {
  const c = config[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${c.bg} ${c.border} ${c.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      {showLabel && c.label}
    </span>
  );
}
