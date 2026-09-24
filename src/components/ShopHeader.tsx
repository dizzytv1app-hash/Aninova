import React, { useState } from 'react'

export function ShopHeader({
  search, onSearchChange, onSearchSubmit, subtitle,
}: {
  search: string
  onSearchChange: (v: string) => void
  onSearchSubmit: () => void
  subtitle?: string
}) {
  const [focused, setFocused] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-bg/95 px-4 pb-3 backdrop-blur-md" style={{ paddingTop: 'calc(var(--safe-top) + 14px)' }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[21px] font-bold leading-none tracking-tight text-ink">
            Dizzy <span className="text-accent">Shop</span>
          </h1>
          {subtitle && <p className="mt-1 text-[12px] text-muted">{subtitle}</p>}
        </div>
      </div>

      <div
        className={`mt-3.5 flex items-center gap-2 rounded-pill border bg-surface px-4 py-3 transition-all duration-200 ${
          focused ? 'border-accent shadow-glow' : 'border-line'
        }`}
      >
        <span className={`text-[15px] transition-colors ${focused ? 'text-accent' : 'text-muted'}`}>⌕</span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
          placeholder="Mahsulot qidirish..."
          className="w-full bg-transparent text-[14px] text-ink placeholder:text-faint focus:outline-none"
        />
        {search && (
          <button onClick={() => onSearchChange('')} className="text-[12px] text-faint">
            ✕
          </button>
        )}
      </div>
    </header>
  )
}
