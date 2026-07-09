export function StatsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-graphite rounded-2xl border border-mist p-5 animate-pulse">
          <div className="h-3 w-20 bg-white/5 rounded-full mb-3" />
          <div className="h-8 w-12 bg-white/10 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="bg-graphite rounded-2xl border border-mist p-5 animate-pulse">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 bg-white/5 rounded-full" />
              <div className="h-3 w-64 bg-white/5 rounded-full" />
              <div className="h-3 w-32 bg-white/5 rounded-full" />
            </div>
            <div className="h-8 w-20 bg-white/5 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-graphite rounded-2xl border border-mist p-5 animate-pulse">
          <div className="h-5 w-32 bg-white/5 rounded-full mb-3" />
          <div className="h-3 w-full bg-white/5 rounded-full mb-2" />
          <div className="h-3 w-3/4 bg-white/5 rounded-full" />
        </div>
      ))}
    </div>
  );
}
