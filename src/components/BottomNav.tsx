import React from 'react'
import type { TabKey } from '../lib/types'
import { hapticSelect } from '../lib/telegram'

const TABS: { key: TabKey; label: string; emoji: string }[] = [
  { key: 'home', label: 'Bosh sahifa', emoji: '🏠' },
  { key: 'catalog', label: 'Katalog', emoji: '🛍️' },
  { key: 'favorites', label: 'Sevimli', emoji: '❤️' },
  { key: 'cart', label: 'Savat', emoji: '🛒' },
  { key: 'profile', label: 'Profil', emoji: '👤' },
]

export function BottomNav({
  active, onChange, cartCount, favoriteCount,
}: {
  active: TabKey
  onChange: (tab: TabKey) => void
  cartCount: number
  favoriteCount: number
}) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-line/80 bg-surface/90 backdrop-blur-xl"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      <div className="flex justify-between px-1">
        {TABS.map((tab) => {
          const isActive = tab.key === active
          const badge = tab.key === 'cart' ? cartCount : tab.key === 'favorites' ? favoriteCount : 0
          return (
            <button
              key={tab.key}
              onClick={() => {
                hapticSelect()
                onChange(tab.key)
              }}
              className="relative flex flex-1 flex-col items-center gap-1 py-2.5"
            >
              <span
                className={`relative flex h-7 w-9 items-center justify-center rounded-2xl text-[18px] transition-all duration-300 ease-premium ${
                  isActive ? 'scale-105 bg-accent/15' : 'scale-100 opacity-45'
                }`}
              >
                {tab.emoji}
                {badge > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-pill bg-accent px-1 text-[9.5px] font-bold text-white shadow-lg">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </span>
              <span className={`text-[10.5px] transition-colors ${isActive ? 'font-semibold text-ink' : 'text-faint'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
