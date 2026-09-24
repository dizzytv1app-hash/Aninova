import React from 'react'

export function EmptyState({
  emoji, title, subtitle, actionLabel, onAction,
}: {
  emoji: string
  title: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="animate-fadeInUp flex flex-col items-center justify-center gap-3 px-8 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-surface2 to-surface3 text-4xl shadow-soft">
        {emoji}
      </div>
      <div className="space-y-1">
        <p className="font-display text-[16px] font-semibold text-ink">{title}</p>
        {subtitle && <p className="text-[13px] leading-relaxed text-muted">{subtitle}</p>}
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="pressable mt-2 rounded-pill bg-accent px-5 py-2.5 text-[13px] font-semibold text-white shadow-glow"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
