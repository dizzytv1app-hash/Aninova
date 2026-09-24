import React, { useEffect, useState } from 'react'
import { getTelegramUser } from '../lib/telegram'
import { OrderHistory } from './OrderHistory'
import { Guide } from './Guide'

type SubView = 'main' | 'orders' | 'guide'

export function Profile({ onOpenFavorites, onReopenOnboarding }: { onOpenFavorites: () => void; onReopenOnboarding: () => void }) {
  const [subView, setSubView] = useState<SubView>('main')
  const [tgUser, setTgUser] = useState<any>(null)

  useEffect(() => {
    setTgUser(getTelegramUser())
  }, [])

  if (subView === 'orders') return <OrderHistory onBack={() => setSubView('main')} />
  if (subView === 'guide') return <Guide onBack={() => setSubView('main')} />

  const name = tgUser?.first_name || 'Mehmon'
  const username = tgUser?.username ? `@${tgUser.username}` : null

  const items: { icon: string; label: string; hint: string; onClick: () => void }[] = [
    { icon: '📦', label: 'Buyurtmalarim', hint: 'Tarix va holat', onClick: () => setSubView('orders') },
    { icon: '❤️', label: 'Sevimlilar', hint: 'Saqlangan mahsulotlar', onClick: onOpenFavorites },
    { icon: '📖', label: "Qo'llanma", hint: 'Ilovadan foydalanish', onClick: () => setSubView('guide') },
    { icon: 'ℹ️', label: 'Ilova haqida', hint: 'Tanishtiruvni qayta ko\'rish', onClick: onReopenOnboarding },
  ]

  return (
    <div className="animate-fadeIn pb-4" style={{ paddingTop: 'calc(var(--safe-top) + 18px)' }}>
      <div className="mx-4 mb-6 flex items-center gap-3.5 rounded-card border border-line bg-gradient-to-br from-surface to-surface2 p-4 shadow-soft">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-[#9B6CFF] text-2xl font-bold text-white shadow-glow">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-display text-[17px] font-semibold text-ink">{name}</p>
          {username && <p className="text-[13px] text-muted">{username}</p>}
          <span className="mt-1 inline-block rounded-pill bg-accent2/15 px-2.5 py-0.5 text-[10.5px] font-semibold text-accent2">
            Dizzy Shop mijozi
          </span>
        </div>
      </div>

      <div className="mx-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="pressable flex items-center gap-3.5 rounded-card border border-line bg-surface px-4 py-3.5 text-left shadow-soft transition-colors active:bg-surface2"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl2 bg-surface2 text-[18px]">
              {item.icon}
            </span>
            <span className="flex-1">
              <span className="block text-[14px] font-medium text-ink">{item.label}</span>
              <span className="block text-[12px] text-muted">{item.hint}</span>
            </span>
            <span className="text-[15px] text-faint">›</span>
          </button>
        ))}
      </div>

      <p className="mt-7 px-4 text-center text-[12px] text-faint">
        Muammo bo'lsa botda <span className="text-muted">/help</span> buyrug'idan foydalaning
      </p>
    </div>
  )
}
