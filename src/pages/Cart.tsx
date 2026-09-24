import React, { useEffect, useState } from 'react'
import type { CartItem } from '../lib/types'
import { imageUrl, api } from '../lib/api'
import { formatSom } from '../lib/categories'
import { EmptyState } from '../components/EmptyState'
import { SkeletonCartRow } from '../components/Skeleton'
import { setMainButton, hideMainButton, hapticImpact } from '../lib/telegram'

export function Cart({
  cart, total, loading, onUpdateQuantity, onRemove, onOrderPlaced, onBrowse,
}: {
  cart: CartItem[]
  total: number
  loading: boolean
  onUpdateQuantity: (itemId: number, quantity: number) => void
  onRemove: (itemId: number) => void
  onOrderPlaced: () => void
  onBrowse: () => void
}) {
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    if (placing || cart.length === 0) return
    setPlacing(true)
    setError(null)
    try {
      await api.checkout()
      hapticImpact('medium')
      onOrderPlaced()
    } catch (e: any) {
      setError("Buyurtamani yaratib bo'lmadi. Birozdan so'ng qayta urinib ko'ring.")
    } finally {
      setPlacing(false)
    }
  }

  useEffect(() => {
    if (cart.length === 0) {
      hideMainButton()
      return
    }
    setMainButton(`Buyurtma berish — ${formatSom(total)}`, handleCheckout)
    return () => hideMainButton()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, total, placing])

  return (
    <div className="pb-4" style={{ paddingTop: 'calc(var(--safe-top) + 18px)' }}>
      <div className="mb-5 px-4">
        <h1 className="font-display text-[21px] font-bold text-ink">🛒 Savat</h1>
        {!loading && cart.length > 0 && <p className="mt-1 text-[13px] text-muted">{cart.length} ta mahsulot</p>}
      </div>

      {loading && (
        <div className="flex flex-col gap-3 px-4">
          <SkeletonCartRow />
          <SkeletonCartRow />
        </div>
      )}

      {!loading && cart.length === 0 && (
        <EmptyState emoji="🛒" title="Savat bo'sh" subtitle="Katalogdan yoqqan mahsulotlarni qo'shing" actionLabel="Katalogga o'tish" onAction={onBrowse} />
      )}

      {!loading && cart.length > 0 && (
        <div className="stagger flex flex-col gap-3 px-4">
          {cart.map((item) => {
            const img = imageUrl(item.product.image_file_id)
            const price = item.product.price * (1 - item.product.discount_percent / 100)
            return (
              <div key={item.id} className="flex gap-3 rounded-card border border-line bg-surface p-2.5 shadow-soft transition-all duration-300">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-surface2">
                  {img ? (
                    <img src={img} alt={item.product.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl">👕</div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between py-0.5">
                  <div>
                    <p className="line-clamp-1 text-[13px] font-medium text-ink">{item.product.name}</p>
                    <p className="mt-0.5 text-[11.5px] text-muted">
                      {[item.size, item.color].filter(Boolean).join(' · ') || 'Standart'}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[14px] font-semibold text-ink">{formatSom(price * item.quantity)}</span>
                    <div className="flex items-center gap-2.5 rounded-pill bg-surface2 px-1.5 py-1">
                      <button
                        onClick={() => (item.quantity <= 1 ? onRemove(item.id) : onUpdateQuantity(item.id, item.quantity - 1))}
                        className="pressable flex h-6 w-6 items-center justify-center rounded-full bg-surface3 text-[13px] text-ink"
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-[13px] text-ink">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="pressable flex h-6 w-6 items-center justify-center rounded-full bg-surface3 text-[13px] text-ink"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="pressable self-start pl-1 text-[13px] text-faint">
                  ✕
                </button>
              </div>
            )
          })}

          <div className="mt-2 flex items-center justify-between rounded-card border border-line bg-surface px-4 py-4 shadow-soft">
            <span className="text-[13px] text-muted">Jami to'lov</span>
            <span className="font-display text-[18px] font-bold text-ink">{formatSom(total)}</span>
          </div>

          {error && <p className="text-center text-[13px] text-danger">{error}</p>}

          {/* Telegram MainButton ishlamasa (masalan oddiy brauzerda) ishlaydigan zaxira tugma */}
          <button
            onClick={handleCheckout}
            disabled={placing}
            className="pressable mb-4 w-full rounded-pill bg-accent py-4 text-[15px] font-semibold text-white shadow-glow disabled:opacity-50"
          >
            {placing ? 'Yuborilmoqda...' : `Buyurtma berish — ${formatSom(total)}`}
          </button>
        </div>
      )}
    </div>
  )
}
