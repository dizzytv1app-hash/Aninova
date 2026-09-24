import React from 'react'

export function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-surface">
      <div className="skeleton aspect-[3/4] w-full" />
      <div className="flex flex-col gap-2 p-3">
        <div className="skeleton h-3 w-4/5 rounded-full" />
        <div className="skeleton h-3 w-2/5 rounded-full" />
        <div className="mt-1 flex items-center justify-between">
          <div className="skeleton h-4 w-16 rounded-full" />
          <div className="skeleton h-7 w-7 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonRow({ count = 4 }: { count?: number }) {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-[42vw] min-w-[150px] max-w-[180px] flex-shrink-0">
          <SkeletonCard />
        </div>
      ))}
    </div>
  )
}

export function SkeletonBanner() {
  return <div className="skeleton mx-4 mb-6 h-36 rounded-card" />
}

export function SkeletonLine({ className = '' }: { className?: string }) {
  return <div className={`skeleton rounded-full ${className}`} />
}

export function SkeletonCartRow() {
  return (
    <div className="flex gap-3 rounded-card border border-line bg-surface p-3">
      <div className="skeleton h-20 w-20 flex-shrink-0 rounded-2xl" />
      <div className="flex flex-1 flex-col justify-between py-0.5">
        <div className="skeleton h-3 w-3/4 rounded-full" />
        <div className="skeleton h-3 w-1/3 rounded-full" />
        <div className="skeleton h-4 w-1/2 rounded-full" />
      </div>
    </div>
  )
}
