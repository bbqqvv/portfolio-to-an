export function HeroSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Greeting skeleton */}
      <div className="h-6 w-48 bg-pink-200/50 dark:bg-slate-700/50 rounded" />
      
      {/* Name skeleton */}
      <div className="space-y-3">
        <div className="h-16 w-80 bg-gradient-to-r from-pink-200/50 to-purple-200/50 dark:from-slate-700/50 dark:to-slate-600/50 rounded" />
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full max-w-2xl bg-gray-200/50 dark:bg-slate-700/50 rounded" />
        <div className="h-4 w-3/4 bg-gray-200/50 dark:bg-slate-700/50 rounded" />
        <div className="h-4 w-1/2 bg-gray-200/50 dark:bg-slate-700/50 rounded" />
      </div>
      
      {/* Social links skeleton */}
      <div className="flex gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 w-20 bg-white/30 dark:bg-slate-800/30 rounded-full" />
        ))}
      </div>
    </div>
  )
}
