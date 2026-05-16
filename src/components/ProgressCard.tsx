interface ProgressCardProps {
  title: string;
  variant: "purple" | "blue";
  currentBadge: string;
  nextBadge: string;
  daysRemaining: number;
  totalDays: number;
  progress: number;
  remainingFormatted?: string;
  totalFormatted?: string;
}

export const ProgressCard = ({
  title,
  variant,
  currentBadge,
  nextBadge,
  daysRemaining,
  totalDays,
  progress,
  remainingFormatted,
  totalFormatted,
}: ProgressCardProps) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 relative overflow-hidden group/card">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

      <div className="relative z-10">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-2">
          {title}
        </p>

        <div className="flex items-center gap-2 mb-2.5">
          <div className="relative shrink-0">
            <img
              src={currentBadge}
              alt={title}
              className="w-7 h-7 object-contain drop-shadow-sm"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          <div className="flex-1 flex items-center gap-1.5">
            <div className="flex-1 h-px bg-white/10" />
            <svg className="w-2.5 h-2.5 text-white/20 shrink-0" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="relative shrink-0">
            <img
              src={nextBadge}
              alt="próximo"
              className="w-5 h-5 object-contain opacity-30"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </div>

        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-1.5">
          <div
            className="h-full rounded-full transition-all duration-700 relative bg-gradient-to-r from-white/60 via-white to-white/60"
            style={{ width: `${clampedProgress}%`, boxShadow: '0 0 8px 2px rgba(255,255,255,0.45)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse rounded-full" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[10px] text-white/30">
            {remainingFormatted ?? `${daysRemaining}d`} restantes
          </span>
          <span className="text-[10px] text-white/20">
            {totalFormatted ?? `${totalDays}d`}
          </span>
        </div>
      </div>
    </div>
  );
};
