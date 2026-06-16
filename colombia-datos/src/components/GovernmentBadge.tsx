import { Government } from '@/types';

interface Props {
  government: Government;
  size?: 'sm' | 'md' | 'lg';
  showYears?: boolean;
}

const sizeMap = {
  sm: {
    wrapper: 'px-2 py-1 gap-2',
    border: 'w-0.5',
    name: 'text-xs font-semibold',
    sub: 'text-[10px]',
  },
  md: {
    wrapper: 'px-3 py-1.5 gap-2.5',
    border: 'w-[3px]',
    name: 'text-sm font-semibold',
    sub: 'text-xs',
  },
  lg: {
    wrapper: 'px-4 py-2.5 gap-3',
    border: 'w-1',
    name: 'text-base font-bold',
    sub: 'text-sm',
  },
};

export default function GovernmentBadge({
  government,
  size = 'md',
  showYears = true,
}: Props) {
  const s = sizeMap[size];

  return (
    <div
      className={`inline-flex items-stretch rounded-lg glass-card overflow-hidden ${s.wrapper}`}
    >
      <span
        className={`${s.border} self-stretch rounded-full mr-0.5`}
        style={{ background: government.color, minWidth: s.border === 'w-0.5' ? 2 : s.border === 'w-[3px]' ? 3 : 4 }}
      />
      <div className="flex flex-col justify-center min-w-0">
        <span className={`${s.name} text-slate-100 leading-tight truncate`}>
          {government.president}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`${s.sub} text-slate-400 truncate`}>
            {government.party}
          </span>
          {showYears && (
            <>
              <span className={`${s.sub} text-slate-600`}>·</span>
              <span
                className={`${s.sub} font-medium`}
                style={{ color: government.colorLight ?? government.color }}
              >
                {government.startYear}–{government.endYear}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
