import React, { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { SkeletonLine } from '../components/Skeleton'

export function Guide({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.content('guide').then((c) => setText(c.value)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="animate-fadeIn pb-4" style={{ paddingTop: 'calc(var(--safe-top) + 18px)' }}>
      <div className="mb-5 flex items-center gap-3 px-4">
        <button onClick={onBack} className="pressable flex h-9 w-9 items-center justify-center rounded-full bg-surface text-[16px] text-ink">
          ←
        </button>
        <h1 className="font-display text-[18px] font-bold text-ink">📖 Qo'llanma</h1>
      </div>
      {loading ? (
        <div className="flex flex-col gap-2.5 px-4">
          <SkeletonLine className="h-3 w-full" />
          <SkeletonLine className="h-3 w-5/6" />
          <SkeletonLine className="h-3 w-4/6" />
          <SkeletonLine className="h-3 w-full" />
          <SkeletonLine className="h-3 w-3/6" />
        </div>
      ) : (
        <div className="mx-4 rounded-card border border-line bg-surface p-4 shadow-soft">
          <p className="whitespace-pre-line text-[14px] leading-[1.7] text-ink/90">{text}</p>
        </div>
      )}
    </div>
  )
}
